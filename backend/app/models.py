from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional


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
    created_at: datetime = Field(default_factory=datetime.utcnow)


class NlpLog(SQLModel, table=True):
    __tablename__ = "nlp_logs"

    id: Optional[int] = Field(default=None, primary_key=True)
    input_text: str
    predicted_label: str
    confidence_score: float
    ip_address: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class VisitorLog(SQLModel, table=True):
    __tablename__ = "visitor_logs"

    id: Optional[int] = Field(default=None, primary_key=True)
    page_visited: str
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    referrer: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


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
    created_at: datetime = Field(default_factory=datetime.utcnow)
