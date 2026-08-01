# Talha Ghafoor — Portfolio 🚀

> **Software Quality Assurance (SQA) Engineer · AI & Machine Learning Specialist · Full-Stack Developer**

Welcome to my interactive personal portfolio and API telemetry system! This platform showcases my technical expertise, engineering projects, quality assurance test suites, FastAPI backend database automation, and academic background.

---

## 👤 About Me

- **Degree:** Bachelor of Science in Software Engineering (2022 – 2026) — HITEC University, Taxila
- **Location:** Pakistan
- **Email:** [talhaghafoor84@gmail.com](mailto:talhaghafoor84@gmail.com)
- **GitHub:** [github.com/talha-096](https://github.com/talha-096)
- **LinkedIn:** [Talha Ghafoor](https://www.linkedin.com/in/talha-ghafoor-475aa926a/)

---

## 🏗️ Architecture Overview

The system is structured as a decoupled **React 18 + Vite Frontend** and a **FastAPI + SQLModel / Supabase PostgreSQL Backend**:

```
talha-Portfolio/
├── backend/                  # High-Performance FastAPI Backend
│   ├── app/
│   │   ├── api/              # API Routers (contact, nlp, analytics)
│   │   ├── models.py         # Data models and schemas
│   │   ├── schemas/          # Pydantic contract schemas
│   │   ├── storage.py        # Telemetry & storage management
│   │   └── services/         # Email notification & local JSON backups
│   ├── main.py               # Entrypoint & Automated Request Logging Middleware
│   └── requirements.txt      # Python dependencies
│
├── frontend/                 # React 18 + TypeScript + Vite UI
│   ├── src/
│   │   ├── components/       # UI Components, AI Playground & Console Telemetry
│   │   ├── data/             # Projects data & case studies
│   │   ├── pages/            # Home, About, Skills, Projects, Contact pages
│   │   └── App.tsx           # Route setup & automated visitor tracking
│   ├── package.json          # Node dependencies
│   └── vite.config.ts        # Vite configuration
│
├── .gitignore                # Protects secrets, .env files, & build outputs
└── README.md                 # Project documentation
```

---

## ✨ Key System Features

- **⚡ Automated Request & Telemetry Logging**:
  - Custom HTTP middleware automatically logs method, path, query strings, execution latency (ms), status codes, client IP, and user agents.
- **📩 Contact Message Handling & Email Notifications**:
  - Processes contact submissions while dispatching email alerts and local JSON backups.
- **🤖 AI Playground & Chat Prompt Telemetry**:
  - Interactive terminal chat & mental health NLP classification system. Every query, prompt, and SHAP explainability evaluation is logged.
- **📊 Visitor Traffic & Navigation Analytics**:
  - Automated frontend visitor tracker logs page navigation and user sessions.
- **🛡️ Cyber Security & Rate Limiting**:
  - Hardened with HTTP Security Headers (`X-Frame-Options`, `X-XSS-Protection`, `Strict-Transport-Security`, `nosniff`) and SlowAPI rate limiting.

---

## 🛠️ Featured Engineering Projects

### 1. 🌟 GenMark: AI-Powered Marketing Generation
- **Dual Role:** AI & Full-Stack Engineer + SQA & Automation Lead
- **Description:** Final Year Project. An advanced platform designed to streamline marketing workflows through AI-driven content generation, brand identity management, and automated project orchestration.
- **Tech Stack:** React, Vite, TypeScript, TailwindCSS, Python, FastAPI, MongoDB, AWS (ECS Fargate, Lambda, API Gateway, S3, ECR), Docker, Cypress, Postman
- **Key Features:** LLM Marketing Copy Generation, Brand Kit Context Management, Microservices Architecture, Cypress E2E Test Suites, Postman API Contract Testing.

### 2. 🛒 Full-Stack Multi-Vendor E-Commerce Platform
- **Role:** Full-Stack Developer & QA Engineer
- **Tech Stack:** Next.js 15, Hono.js, Supabase (PostgreSQL), Drizzle ORM, Stripe Webhooks, TailwindCSS
- **Key Features:** Role-based dashboards (Customer, Vendor, Admin), OTP verification gates, real-time payment/order synchronization.

### 3. 🧠 NLP Mental Health Classification System & SHAP Explainer
- **Role:** AI/ML Engineer & QA Analyst
- **Tech Stack:** Python, PyTorch, scikit-learn, RoBERTa, TF-IDF, SMOTE, SHAP
- **Key Features:** ~84% F1-Score, SMOTE class-imbalance correction, SHAP token impact explainer, regression testing verification.

---

## 🚀 Quick Start / Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/talha-096/Portfolio.git
cd Portfolio
```

### 2. Run Backend (FastAPI + Database)
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env

# Initialize DB & start backend API server
python main.py
```
*Backend API will run at `http://localhost:8000` (Docs at `http://localhost:8000/docs`).*

### 3. Run Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
*Frontend will run at `http://localhost:5173`.*

---

## 🌐 100% Free Live Deployment Guide (GitHub Student Pack)

1. **Backend Deployment (Render.com)**:
   - Create a Web Service connected to your repository.
   - Root Directory: `backend` | Build: `pip install -r requirements.txt` | Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
2. **Frontend Deployment (Vercel.com)**:
   - Import repository to Vercel.
   - Root Directory: `frontend` | Env Var: `VITE_BACKEND_URL` = `https://your-backend-api.onrender.com`
3. **Free Custom Domain Setup**:
   - Claim a free domain on **Namecheap** (`.me`) or **Name.com** (`.tech`) via [GitHub Student Developer Pack](https://education.github.com/pack).
   - Add Vercel DNS Records (`A Record @ -> 76.76.21.21`, `CNAME www -> cname.vercel-dns.com`).

---

© 2026 Talha Ghafoor. Built for high performance, reliability, & automated quality assurance.
