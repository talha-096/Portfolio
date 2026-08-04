import time
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from sqlmodel import Session
from starlette.concurrency import run_in_threadpool

from app.config import ALLOWED_ORIGINS
from app.database import init_db, engine, db_ready
from app.models import ApiRequestLog
from app.security import limiter
from app.storage import api_request_logs_store, store_append
from app.api import contact, nlp, analytics


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Initializing Supabase Database connection & schema tables...")
    try:
        init_db()
    except Exception as e:
        print(f"Notice initializing DB: {e}")
    yield
    print("Shutting down backend...")


app = FastAPI(
    title="Talha Ghafoor - Portfolio API",
    description="High-Performance, Cyber-Secured FastAPI Backend for Portfolio with Supabase Database Automation",
    version="1.0.0",
    lifespan=lifespan
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# 1. CORS Configuration
# Explicit origin list. allow_origins=["*"] combined with allow_credentials=True
# lets any site on the internet issue credentialed requests to this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "X-API-Key"],
)

SKIP_LOG_PREFIXES = ("/docs", "/openapi.json", "/favicon.ico", "/redoc")


def _persist_request_log(log_entry: ApiRequestLog) -> None:
    """Runs in a worker thread: psycopg2 is a blocking driver."""
    if db_ready():
        try:
            with Session(engine) as session:
                session.add(log_entry)
                session.commit()
            return
        except Exception as err:
            print(f"Notice logging DB request: {err}")
    store_append(api_request_logs_store, log_entry)


# 2. Cyber Security Headers & Automated Request Supabase Database Logging Middleware
@app.middleware("http")
async def add_cyber_security_headers_and_db_logging(request: Request, call_next):
    start_time = time.perf_counter()
    response = await call_next(request)
    execution_time = (time.perf_counter() - start_time) * 1000

    # Add Cyber Security Headers
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    # HSTS is meaningless (and misleading) over plain HTTP in local development.
    if request.url.scheme == "https":
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"

    # Save request & message telemetry in Supabase Database (skip docs & static noise)
    if not request.url.path.startswith(SKIP_LOG_PREFIXES):
        log_entry = ApiRequestLog(
            method=request.method,
            path=request.url.path,
            query_params=str(request.query_params) if request.query_params else None,
            status_code=response.status_code,
            execution_time_ms=round(execution_time, 2),
            ip_address=request.client.host if request.client else None,
            user_agent=request.headers.get("user-agent"),
        )
        # Off the event loop: a synchronous INSERT here stalls every other
        # in-flight request for the duration of the round trip.
        await run_in_threadpool(_persist_request_log, log_entry)

    return response


# 3. Information Leakage Prevention Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(f"Unhandled system exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal error occurred. Request logged securely."}
    )

# Register routers
app.include_router(contact.router)
app.include_router(nlp.router)
app.include_router(analytics.router)


@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Talha Ghafoor Portfolio Cyber-Secured API",
        "database": "Supabase PostgreSQL" if db_ready() else "Fallback Storage Mode",
        "docs": "/docs"
    }


@app.get("/health")
def health_check():
    return {"status": "ok", "database_connected": db_ready()}


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
