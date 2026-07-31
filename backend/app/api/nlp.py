from fastapi import APIRouter, Depends, Request
from pydantic import BaseModel
from sqlmodel import Session
from slowapi import Limiter
from slowapi.util import get_remote_address
from app.database import get_session
from app.models import NlpLog

limiter = Limiter(key_func=get_remote_address)
router = APIRouter(prefix="/api/nlp", tags=["AI & NLP Playground"])


class NlpRequest(BaseModel):
    text: str


@router.post("/analyze")
@limiter.limit("10/minute")
def analyze_affective_state(
    request: Request,
    payload: NlpRequest,
    session: Session = Depends(get_session)
):
    """
    Analyzes input text for Mental Health NLP classification & SHAP explainability.
    Saves analysis log to portfolio.nlp_logs in MS SQL Server.
    """
    client_ip = request.client.host if request.client else None
    text = payload.text.lower()

    # Calculate simulated SHAP token impact
    words = payload.text.split()
    shap_tokens = []

    anxious_score = 15
    depressed_score = 10
    normal_score = 75

    anxious_words = ["anxious", "stress", "overwhelmed", "exams", "scared", "fear", "panic"]
    depressed_words = ["hopeless", "empty", "sad", "worthless", "depressed", "lonely"]
    normal_words = ["happy", "great", "amazing", "good", "coding", "cypress", "react"]

    for word in words:
        clean_word = word.strip(",.!?").lower()
        if clean_word in anxious_words:
            anxious_score += 25
            shap_tokens.append({"word": word, "score": 0.45, "impact": "anxious"})
        elif clean_word in depressed_words:
            depressed_score += 25
            shap_tokens.append({"word": word, "score": 0.50, "impact": "depressed"})
        elif clean_word in normal_words:
            normal_score += 15
            shap_tokens.append({"word": word, "score": 0.30, "impact": "normal"})
        else:
            shap_tokens.append({"word": word, "score": 0.02, "impact": "neutral"})

    # Normalize scores
    total = anxious_score + depressed_score + normal_score
    scores = {
        "anxious": round((anxious_score / total) * 100),
        "depressed": round((depressed_score / total) * 100),
        "normal": round((normal_score / total) * 100),
        "suicidal": 0
    }

    if scores["anxious"] > 40:
        top_category = "Anxious Classification"
    elif scores["depressed"] > 40:
        top_category = "Depressed Classification"
    else:
        top_category = "Normal Affective State"

    # Save log in portfolio.nlp_logs
    log = NlpLog(
        input_text=payload.text,
        predicted_label=top_category,
        confidence_score=max(scores.values()) / 100.0,
        ip_address=client_ip
    )
    session.add(log)
    session.commit()

    return {
        "top_category": top_category,
        "scores": scores,
        "shap_tokens": shap_tokens
    }


class ChatRequest(BaseModel):
    prompt: str


@router.post("/chat")
@limiter.limit("15/minute")
def chat_ai_assistant(
    request: Request,
    payload: ChatRequest,
    session: Session = Depends(get_session)
):
    """
    Handles user interactive prompts/messages from AI Playground console,
    saves prompt & response into portfolio.nlp_logs in the database automatically.
    """
    client_ip = request.client.host if request.client else None
    query = payload.prompt.strip()

    bot_response = "Talha Ghafoor is a Software Engineer specializing in SQA, Cypress/Postman automation, PyTorch NLP models, and full-stack development with React, FastAPI, AWS, and Docker."
    q = query.lower()

    if "genmark" in q or "aws" in q:
        bot_response = "GenMark is Talha's Final Year Project: a multi-modal AI marketing platform. Talha verified its serverless AWS deployment with automated Cypress E2E tests and Postman API contract testing!"
    elif "education" in q or "degree" in q or "bs" in q or "hitec" in q:
        bot_response = "Talha completed his BS in Software Engineering (2022 - 2026) at HITEC University, specializing in SQA, AI/ML, and Web Engineering."
    elif "email" in q or "contact" in q or "gmail" in q:
        bot_response = "You can contact Talha directly at talhaghafoor84@gmail.com."
    elif "mental" in q or "nlp" in q or "shap" in q:
        bot_response = "Talha developed a 4-class Mental Health Affective Detection system fusing RoBERTa + Sentiment + Emotion features, achieving 83.83% accuracy and correcting class-imbalance via SMOTE!"
    elif "qa" in q or "test" in q or "cypress" in q:
        bot_response = "Talha excels in Software Quality Assurance — writing automated Cypress frontend suites, Postman backend API contract validation, boundary-value test suites, and regression testing!"
    elif "skills" in q or "stack" in q:
        bot_response = "Talha's core stack includes Python, Cypress, Postman, FastAPI, React, PyTorch, scikit-learn, Docker, AWS, PostgreSQL, Supabase, and Next.js."

    # Store user message and prompt in portfolio.nlp_logs table
    log = NlpLog(
        input_text=payload.prompt,
        predicted_label=f"Chat Query: {bot_response[:80]}...",
        confidence_score=0.99,
        ip_address=client_ip
    )
    session.add(log)
    session.commit()

    return {
        "reply": bot_response,
        "prompt": payload.prompt,
        "status": "saved_to_database"
    }


@router.get("/logs")
@limiter.limit("20/minute")
def get_all_nlp_logs(
    request: Request,
    session: Session = Depends(get_session)
):
    """
    Retrieve all NLP and AI playground logs from portfolio.nlp_logs database table.
    """
    from sqlmodel import select
    logs = session.exec(select(NlpLog).order_by(NlpLog.created_at.desc())).all()
    return logs

