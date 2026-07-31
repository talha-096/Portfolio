from fastapi import APIRouter, Depends, Request, status
from pydantic import BaseModel
from sqlmodel import Session, select, func
from slowapi import Limiter
from slowapi.util import get_remote_address
from typing import Optional

from app.database import get_session
from app.models import VisitorLog, ApiRequestLog, ContactMessage, NlpLog

limiter = Limiter(key_func=get_remote_address)
router = APIRouter(prefix="/api/analytics", tags=["Analytics & Visitor Automation"])


class VisitorPayload(BaseModel):
    page_visited: str
    referrer: Optional[str] = None


@router.post("/visitor", status_code=status.HTTP_201_CREATED)
@limiter.limit("30/minute")
def log_visitor(
    request: Request,
    payload: VisitorPayload,
    session: Session = Depends(get_session)
):
    """
    Automated page visit logger that records user navigation into portfolio.visitor_logs.
    """
    client_ip = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")

    log_entry = VisitorLog(
        page_visited=payload.page_visited,
        ip_address=client_ip,
        user_agent=user_agent,
        referrer=payload.referrer
    )
    session.add(log_entry)
    session.commit()
    session.refresh(log_entry)

    return {"status": "logged", "id": log_entry.id, "page": log_entry.page_visited}


@router.get("/requests")
@limiter.limit("20/minute")
def get_request_logs(
    request: Request,
    limit: int = 50,
    session: Session = Depends(get_session)
):
    """
    Retrieves stored API request automation logs from portfolio.api_request_logs.
    """
    logs = session.exec(
        select(ApiRequestLog).order_by(ApiRequestLog.created_at.desc()).limit(limit)
    ).all()
    return logs


@router.get("/visitors")
@limiter.limit("20/minute")
def get_visitor_logs(
    request: Request,
    limit: int = 50,
    session: Session = Depends(get_session)
):
    """
    Retrieves stored visitor navigation logs from portfolio.visitor_logs.
    """
    logs = session.exec(
        select(VisitorLog).order_by(VisitorLog.created_at.desc()).limit(limit)
    ).all()
    return logs


@router.get("/summary")
@limiter.limit("20/minute")
def get_database_summary(
    request: Request,
    session: Session = Depends(get_session)
):
    """
    Returns automated database storage metrics for all messages, requests, NLP logs, and visitors.
    """
    total_messages = session.exec(select(func.count(ContactMessage.id))).one()
    total_nlp_logs = session.exec(select(func.count(NlpLog.id))).one()
    total_visitor_logs = session.exec(select(func.count(VisitorLog.id))).one()
    total_api_logs = session.exec(select(func.count(ApiRequestLog.id))).one()

    return {
        "status": "active",
        "database_automation": {
            "total_contact_messages": total_messages,
            "total_nlp_ai_logs": total_nlp_logs,
            "total_visitor_logs": total_visitor_logs,
            "total_api_request_logs": total_api_logs,
        }
    }
