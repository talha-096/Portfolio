from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field, field_validator


def _clean(value: str) -> str:
    """Trim and drop control characters (keeps newlines and tabs)."""
    return "".join(ch for ch in value if ch in "\n\t" or ch.isprintable()).strip()


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    subject: Optional[str] = Field(default=None, max_length=200)
    message: str = Field(min_length=1, max_length=5000)

    @field_validator("name", "message")
    @classmethod
    def sanitize_text(cls, value: str) -> str:
        # Note: values are stored raw. HTML-escaping on the way *in* corrupts the
        # stored data (it is then escaped again when React renders it, so users
        # see "&amp;" and "&#x27;"). Escaping belongs at the point of rendering,
        # and React already does it.
        clean_val = _clean(value)
        if not clean_val:
            raise ValueError("Field cannot be empty or blank space.")
        return clean_val

    @field_validator("subject")
    @classmethod
    def sanitize_subject(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value
        # Newlines here would end up in an email Subject header, which is how
        # header-injection works; strip them rather than escaping.
        return _clean(value.replace("\r", " ").replace("\n", " ")) or None


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
