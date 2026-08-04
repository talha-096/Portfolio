import secrets

from fastapi import Header, HTTPException, status
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.config import ADMIN_API_KEY

# One limiter for the whole app. Separate Limiter() instances per router each
# keep their own counters, so a client could spend the full quota on every
# router independently.
limiter = Limiter(key_func=get_remote_address)


def require_admin_key(x_api_key: str = Header(default="")) -> None:
    """
    Guards the read-back endpoints. They return contact messages, free-text NLP
    input and visitor IP addresses, none of which should be publicly readable.
    """
    if not ADMIN_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Admin access is not configured on this server.",
        )
    if not secrets.compare_digest(x_api_key, ADMIN_API_KEY):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API key.",
        )
