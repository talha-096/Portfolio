from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import DateTime
from sqlmodel import SQLModel, Field


def utc_now() -> datetime:
    # Timezone-aware, and datetime.utcnow() is deprecated from Python 3.12.
    return datetime.now(timezone.utc)


# The columns are declared timezone-aware so SQLModel's create_all() produces
# the same TIMESTAMPTZ type that setup_supabase.py creates. Previously one path
# made TIMESTAMPTZ and the other TIMESTAMP WITHOUT TIME ZONE.
def _created_at_field() -> Field:
    return Field(default_factory=utc_now, sa_type=DateTime(timezone=True), index=True)


class ContactMessage(SQLModel, table=True):
    __tablename__ = "contact_messages"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    subject: Optional[str] = None
    message: str
    ip_address: Optional[str] = None
    is_emailed: bool = Field(default=False)
    is_read: bool = Field(default=False)
    created_at: datetime = _created_at_field()


class NlpLog(SQLModel, table=True):
    __tablename__ = "nlp_logs"

    id: Optional[int] = Field(default=None, primary_key=True)
    input_text: str
    predicted_label: str
    confidence_score: float
    ip_address: Optional[str] = None
    created_at: datetime = _created_at_field()


class VisitorLog(SQLModel, table=True):
    __tablename__ = "visitor_logs"

    id: Optional[int] = Field(default=None, primary_key=True)
    page_visited: str
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    referrer: Optional[str] = None
    created_at: datetime = _created_at_field()


class ApiRequestLog(SQLModel, table=True):
    __tablename__ = "api_request_logs"

    id: Optional[int] = Field(default=None, primary_key=True)
    method: str
    path: str
    query_params: Optional[str] = None
    status_code: int
    execution_time_ms: float
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    created_at: datetime = _created_at_field()
