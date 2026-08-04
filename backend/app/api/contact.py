from fastapi import APIRouter, Depends, Query, Request, status
from sqlmodel import Session, select

from app.database import get_session
from app.models import ContactMessage
from app.schemas.contact_schema import ContactCreate, ContactResponse
from app.security import limiter, require_admin_key
from app.services.email_service import send_contact_notification
from app.storage import contact_messages_store, store_append

router = APIRouter(prefix="/api/contact", tags=["Contact"])


@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
def submit_contact_form(
    request: Request,
    payload: ContactCreate,
    session: Session = Depends(get_session)
):
    """
    Saves user message to Supabase PostgreSQL database, dispatches an email notification,
    and creates a local JSON backup.
    """
    client_ip = request.client.host if request.client else None

    # 1. Dispatch Email & Local JSON Backup
    is_sent = send_contact_notification(
        name=payload.name,
        email=payload.email,
        subject=payload.subject or "Portfolio Contact",
        message=payload.message
    )

    db_message = ContactMessage(
        name=payload.name,
        email=payload.email,
        subject=payload.subject,
        message=payload.message,
        ip_address=client_ip,
        is_emailed=is_sent
    )

    # 2. Save in Supabase PostgreSQL database if connected
    if session:
        try:
            session.add(db_message)
            session.commit()
            session.refresh(db_message)
            return db_message
        except Exception as e:
            print(f"Notice: Supabase save fallback: {e}")
            # A failed commit leaves the session in a state where every later
            # statement raises PendingRollbackError.
            session.rollback()
            session.expunge(db_message)

    store_append(contact_messages_store, db_message)
    return db_message


@router.get(
    "/messages",
    response_model=list[ContactResponse],
    dependencies=[Depends(require_admin_key)],
)
@limiter.limit("20/minute")
def get_all_messages(
    request: Request,
    limit: int = Query(default=50, ge=1, le=200),
    session: Session = Depends(get_session),
):
    """
    Retrieve stored contact messages. Requires the X-API-Key header: the payload
    contains names, email addresses, message bodies and submitter IP addresses.
    """
    if session:
        try:
            return session.exec(
                select(ContactMessage)
                .order_by(ContactMessage.created_at.desc())
                .limit(limit)
            ).all()
        except Exception as e:
            print(f"Notice retrieving messages from DB: {e}")
            session.rollback()
    return contact_messages_store[:limit]
