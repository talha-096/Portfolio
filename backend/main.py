import uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from sqlmodel import Session

import time
from app.database import init_db, engine
from app.models import ApiRequestLog
from app.storage import api_request_logs_store, get_next_id
from app.api import contact, nlp, analytics

limiter = Limiter(key_func=get_remote_address)


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
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 2. Cyber Security Headers & Automated Request Supabase Database Logging Middleware
@app.middleware("http")
async def add_cyber_security_headers_and_db_logging(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    execution_time = (time.time() - start_time) * 1000

    # Add Cyber Security Headers
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"

    # Save request & message telemetry in Supabase Database (skip docs & static noise)
    if not request.url.path.startswith(("/docs", "/openapi.json", "/favicon.ico", "/redoc")):
        client_ip = request.client.host if request.client else None
        user_agent = request.headers.get("user-agent")
        query_str = str(request.query_params) if request.query_params else None

        log_entry = ApiRequestLog(
            method=request.method,
            path=request.url.path,
            query_params=query_str,
            status_code=response.status_code,
            execution_time_ms=round(execution_time, 2),
            ip_address=client_ip,
            user_agent=user_agent
        )

        if engine:
            try:
                with Session(engine) as session:
                    session.add(log_entry)
                    session.commit()
            except Exception as err:
                print(f"Notice logging DB request: {err}")
                log_entry.id = get_next_id()
                api_request_logs_store.insert(0, log_entry)
        else:
            log_entry.id = get_next_id()
            api_request_logs_store.insert(0, log_entry)

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
        "database": "Supabase PostgreSQL",
        "docs": "/docs"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
