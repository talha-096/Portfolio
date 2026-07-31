import html
from pydantic import BaseModel, EmailStr, field_validator
from datetime import datetime
from typing import Optional


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str

    @field_validator("name", "message")
    @classmethod
    def sanitize_text(cls, value: str) -> str:
        # Sanitize HTML tags & scripts to prevent XSS / Script Injection attacks
        clean_val = value.strip()
        if not clean_val:
            raise ValueError("Field cannot be empty or blank space.")
        return html.escape(clean_val)

    @field_validator("subject")
    @classmethod
    def sanitize_subject(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value
        return html.escape(value.strip())


class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    subject: Optional[str] = None
    message: str
    is_emailed: bool
    is_read: bool = False
    created_at: datetime
    status: str = "success"
