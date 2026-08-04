import os
from dotenv import load_dotenv

# Loaded here, once, before any other app module reads os.getenv().
# Every module that needs env values imports from this one so the load order
# can never depend on which router happens to be imported first.
load_dotenv()


def _csv(name: str, default: str = "") -> list[str]:
    return [item.strip() for item in os.getenv(name, default).split(",") if item.strip()]


DATABASE_URL = os.getenv("DATABASE_URL", "")

# CORS: explicit origins only. "*" together with credentials lets any website
# make credentialed calls to this API, so it is not accepted here.
ALLOWED_ORIGINS = _csv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173",
)

# Shared secret guarding the endpoints that read back stored data.
ADMIN_API_KEY = os.getenv("ADMIN_API_KEY", "")

OWNER_EMAIL = os.getenv("OWNER_EMAIL", "")
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")

# Upper bound for the in-memory fallback stores so a long-running process
# with an unreachable database cannot grow without limit.
MAX_STORE_ENTRIES = int(os.getenv("MAX_STORE_ENTRIES", "500"))
