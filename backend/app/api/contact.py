from fastapi import APIRouter, Depends, Request, status
from sqlmodel import Session, select
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.database import get_session
from app.models import ContactMessage
from app.schemas.contact_schema import ContactCreate, ContactResponse
from app.services.email_service import send_contact_notification

limiter = Limiter(key_func=get_remote_address)
router = APIRouter(prefix="/api/contact", tags=["Contact"])


@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
def submit_contact_form(
    request: Request,
    payload: ContactCreate,
    session: Session = Depends(get_session)
):
    """
    Saves user message to Database (MS SQL Server portfolio.contact_messages),
    dispatches an email notification, and creates a local JSON backup.
    Rate limited to 5 submissions/min to prevent spam & DDoS.
    """
    client_ip = request.client.host if request.client else None

    # 1. Dispatch Email & Local JSON Backup
    is_sent = send_contact_notification(
        name=payload.name,
        email=payload.email,
        subject=payload.subject or "Portfolio Contact",
        message=payload.message
    )

    # 2. Store in Database
    db_message = ContactMessage(
        name=payload.name,
        email=payload.email,
        subject=payload.subject,
        message=payload.message,
        ip_address=client_ip,
        is_emailed=is_sent
    )

    session.add(db_message)
    session.commit()
    session.refresh(db_message)

    return db_message


@router.get("/messages", response_model=list[ContactResponse])
@limiter.limit("20/minute")
def get_all_messages(request: Request, session: Session = Depends(get_session)):
    """
    Retrieve all contact messages saved in portfolio.contact_messages.
    """
    messages = session.exec(
        select(ContactMessage).order_by(ContactMessage.created_at.desc())
    ).all()
    return messages
