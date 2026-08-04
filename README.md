# Talha Ghafoor — Portfolio 🚀

> **Software Quality Assurance (SQA) Engineer · AI & Machine Learning Specialist · Full-Stack Developer**

Welcome to my interactive personal portfolio and API telemetry system! This platform showcases my technical expertise, engineering projects, quality assurance test suites, FastAPI backend with database automation, and academic background.

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
├── backend/                    # High-Performance FastAPI Backend
│   ├── app/
│   │   ├── api/                # API Routers (contact, nlp, analytics)
│   │   ├── schemas/            # Pydantic contract schemas
│   │   ├── services/           # Email notification & local JSON backups
│   │   ├── config.py           # Centralized env-var loader (single source of truth)
│   │   ├── security.py         # Rate limiter & admin-key guard
│   │   ├── models.py           # SQLModel data models
│   │   ├── database.py         # DB engine & session management
│   │   └── storage.py          # Telemetry & in-memory fallback storage
│   ├── main.py                 # Entrypoint & automated request-logging middleware
│   ├── setup_supabase.py       # Supabase table bootstrapper
│   ├── test_api.py             # API smoke tests
│   └── requirements.txt        # Python dependencies
│
├── frontend/                   # React 18 + TypeScript + Vite UI
│   ├── public/
│   │   └── projects/           # Project screenshots (genmark, ecommerce, keythm, nlp)
│   ├── src/
│   │   ├── components/         # 17 UI components (Hero, Skills, Projects, AI Playground, Console, etc.)
│   │   ├── pages/              # Route pages (Home, NotFound)
│   │   └── App.tsx             # Route setup & automated visitor tracking
│   ├── package.json            # Node dependencies
│   └── vite.config.ts          # Vite configuration
│
├── vercel.json                 # Vercel deployment config
├── .gitignore                  # Protects secrets, .env files, & build outputs
└── README.md                   # Project documentation (you are here)
```

---

## ✨ Key System Features

- **⚡ Automated Request & Telemetry Logging**
  Custom HTTP middleware automatically logs method, path, query strings, execution latency (ms), status codes, client IP, and user agents.

- **📩 Contact Message Handling & Email Notifications**
  Processes contact form submissions while dispatching email alerts and persisting local JSON backups.

- **🤖 AI Playground & Chat Prompt Telemetry**
  Interactive terminal chat & mental health NLP classification system. Every query, prompt, and SHAP explainability evaluation is logged.

- **📊 Visitor Traffic & Navigation Analytics**
  Automated frontend visitor tracker logs page navigation and user sessions.

- **🛡️ Centralized Security & Rate Limiting**
  - Hardened with HTTP Security Headers (`X-Frame-Options`, `X-XSS-Protection`, `Strict-Transport-Security`, `nosniff`).
  - SlowAPI rate limiting via a single shared `Limiter` instance across all routers.
  - Admin API key guard (`secrets.compare_digest`) protecting sensitive read-back endpoints.
  - Centralized `config.py` prevents env-var load-order issues across modules.

- **🎨 Premium Interactive UI**
  Glassmorphism cards, animated orbit effects, command palette, architecture visualizer, Cypress test runner demo, and image carousels for project case studies.

---

## 🛠️ Featured Engineering Projects

### 1. 🌟 GenMark: AI-Powered Marketing Platform
- **Role:** AI & Full-Stack Engineer + SQA & Automation Lead
- **Description:** Final Year Project. An advanced platform designed to streamline marketing workflows through AI-driven content generation, brand identity management, and automated project orchestration.
- **Tech Stack:** React, Vite, TypeScript, TailwindCSS, Python, Flask, FastAPI, MongoDB, AWS (ECS Fargate, Lambda, API Gateway, S3, ECR), Docker, Cypress, Postman
- **Key Features:** LLM Marketing Copy Generation, Brand Kit Context Management, Microservices Architecture, Cypress E2E Test Suites, Postman API Contract Testing.
- **Links:** [GitHub](https://github.com/talha-096/GenMark) · [Live Demo](https://gen-mark-kappa.vercel.app/)

### 2. 🛒 E-Commerce Web Application
- **Role:** Full-Stack Developer
- **Tech Stack:** PHP (Laravel 7), SQLite/MySQL, HTML5, CSS3, JavaScript, Bootstrap 4
- **Key Features:** Localized shopping in PKR, nationwide Cash on Delivery (COD) & express city shipping, product catalog with live search, discount coupons, order tracking, and comprehensive Admin Dashboard (stock management, order status, PDF invoices).
- **Links:** [GitHub](https://github.com/talha-096/Ecommerce-Project)

### 3. 🧠 NLP Mental Health Affect Classifier & SHAP Explainer
- **Role:** AI/ML Engineer & QA Analyst
- **Tech Stack:** Python, PyTorch, scikit-learn, RoBERTa, TF-IDF, SMOTE, SHAP
- **Key Features:** ~84% F1-Score, 4-class classification, SMOTE class-imbalance correction (minority recall 71% → 83%), SHAP token impact explainer, regression testing verification.
- **Links:** [GitHub](https://github.com/talha-096/NLP-Mental-Health-Classification-System)

### 4. ⌨️ Keythm – Mechanical Typing Speed App
- **Role:** Frontend Developer
- **Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Web Audio API, Base UI, Recharts, Motion
- **Key Features:** Web Audio API per-key mechanical audio synthesis, real-time WPM/accuracy tracking, interactive virtual keyboard with live highlighting, multiple test modes (Time, Words, Quotes, Zen), and 6 customizable color themes.
- **Links:** [GitHub](https://github.com/talha-096/Keythm)

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
cp .env.example .env      # Fill in your env vars

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

## ⚙️ Environment Variables

Create a `.env` file in `backend/` (see `.env.example`):

| Variable | Description |
|---|---|
| `DATABASE_URL` | Supabase / PostgreSQL connection string |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins |
| `ADMIN_API_KEY` | Secret key for admin read-back endpoints |
| `OWNER_EMAIL` | Email address for contact notifications |
| `SMTP_HOST` | SMTP server (default: `smtp.gmail.com`) |
| `SMTP_PORT` | SMTP port (default: `587`) |
| `SMTP_USER` | SMTP login username |
| `SMTP_PASSWORD` | SMTP login password / app password |
| `MAX_STORE_ENTRIES` | In-memory store size limit (default: `500`) |

---

## 🌐 Free Live Deployment Guide (GitHub Student Pack)

1. **Backend Deployment (Render.com)**:
   - Create a Web Service connected to your repository.
   - Root Directory: `backend` | Build: `pip install -r requirements.txt` | Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`

2. **Frontend Deployment (Vercel.com)**:
   - Import repository to Vercel.
   - Root Directory: `frontend` | Env Var: `VITE_BACKEND_URL` = `https://your-backend-api.onrender.com`

3. **Free Custom Domain Setup**:
   - Claim a free domain on **Namecheap** (`.me`) or **Name.com** (`.tech`) via [GitHub Student Developer Pack](https://education.github.com/pack).
   - Add Vercel DNS Records (`A Record @ → 76.76.21.21`, `CNAME www → cname.vercel-dns.com`).

---

## 📂 Tech Stack Summary

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Vanilla CSS |
| **Backend** | Python, FastAPI, SQLModel, Pydantic |
| **Database** | Supabase PostgreSQL |
| **Security** | SlowAPI Rate Limiting, Admin Key Auth, Security Headers |
| **DevOps** | Vercel (Frontend), Render (Backend), GitHub Actions |
| **Testing** | Cypress E2E, Postman API Contracts, pytest |

---

© 2026 Talha Ghafoor. Built for high performance, reliability, & automated quality assurance.
