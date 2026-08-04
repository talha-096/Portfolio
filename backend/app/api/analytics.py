from typing import Optional

from fastapi import APIRouter, Depends, Query, Request, status
from pydantic import BaseModel, Field
from sqlmodel import Session, select, func

from app.database import get_session
from app.models import VisitorLog, ApiRequestLog, ContactMessage, NlpLog
from app.security import limiter, require_admin_key
from app.storage import (
    visitor_logs_store,
    api_request_logs_store,
    contact_messages_store,
    nlp_logs_store,
    store_append,
)

router = APIRouter(prefix="/api/analytics", tags=["Analytics & Visitor Automation"])


class VisitorPayload(BaseModel):
    page_visited: str = Field(min_length=1, max_length=255)
    referrer: Optional[str] = Field(default=None, max_length=1000)


@router.post("/visitor", status_code=status.HTTP_201_CREATED)
@limiter.limit("30/minute")
def log_visitor(
    request: Request,
    payload: VisitorPayload,
    session: Session = Depends(get_session)
):
    """
    Automated page visit logger that records user navigation into Supabase visitor_logs.
    """
    log_entry = VisitorLog(
        page_visited=payload.page_visited,
        ip_address=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent"),
        referrer=payload.referrer
    )

    if session:
        try:
            session.add(log_entry)
            session.commit()
            session.refresh(log_entry)
            return {"status": "logged", "id": log_entry.id, "page": log_entry.page_visited}
        except Exception as err:
            print(f"Notice logging visitor in DB: {err}")
            session.rollback()
            session.expunge(log_entry)

    store_append(visitor_logs_store, log_entry)
    return {"status": "logged", "id": log_entry.id, "page": log_entry.page_visited}


@router.get("/requests", dependencies=[Depends(require_admin_key)])
@limiter.limit("20/minute")
def get_request_logs(
    request: Request,
    limit: int = Query(default=50, ge=1, le=200),
    session: Session = Depends(get_session)
):
    """
    Retrieves stored API request logs. Requires the X-API-Key header: rows
    include client IP addresses and user agents.
    """
    if session:
        try:
            return session.exec(
                select(ApiRequestLog).order_by(ApiRequestLog.created_at.desc()).limit(limit)
            ).all()
        except Exception as err:
            print(f"Notice getting request logs: {err}")
            session.rollback()
    return api_request_logs_store[:limit]


@router.get("/visitors", dependencies=[Depends(require_admin_key)])
@limiter.limit("20/minute")
def get_visitor_logs(
    request: Request,
    limit: int = Query(default=50, ge=1, le=200),
    session: Session = Depends(get_session)
):
    """
    Retrieves stored visitor navigation logs. Requires the X-API-Key header:
    rows include client IP addresses and user agents.
    """
    if session:
        try:
            return session.exec(
                select(VisitorLog).order_by(VisitorLog.created_at.desc()).limit(limit)
            ).all()
        except Exception as err:
            print(f"Notice getting visitor logs: {err}")
            session.rollback()
    return visitor_logs_store[:limit]


@router.get("/summary")
@limiter.limit("20/minute")
def get_analytics_summary(
    request: Request,
    session: Session = Depends(get_session)
):
    """
    Returns aggregate counts only, so this one stays public.
    """
    if session:
        try:
            return {
                "status": "active",
                "database": "Supabase PostgreSQL",
                "telemetry": {
                    "total_contact_messages": session.exec(select(func.count(ContactMessage.id))).one(),
                    "total_nlp_ai_logs": session.exec(select(func.count(NlpLog.id))).one(),
                    "total_visitor_logs": session.exec(select(func.count(VisitorLog.id))).one(),
                    "total_api_request_logs": session.exec(select(func.count(ApiRequestLog.id))).one(),
                }
            }
        except Exception as err:
            print(f"Notice generating DB summary: {err}")
            session.rollback()

    return {
        "status": "active",
        "database": "Fallback Storage Mode",
        "telemetry": {
            "total_contact_messages": len(contact_messages_store),
            "total_nlp_ai_logs": len(nlp_logs_store),
            "total_visitor_logs": len(visitor_logs_store),
            "total_api_request_logs": len(api_request_logs_store),
        }
    }
