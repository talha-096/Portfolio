import json
import smtplib
from datetime import datetime, timezone
from email.message import EmailMessage
from pathlib import Path

from app import config

# Anchored to the backend package instead of the process working directory, so
# backups do not land in a different folder depending on where uvicorn is run.
BACKUP_DIR = Path(__file__).resolve().parents[2] / "data" / "messages"

SMTP_TIMEOUT_SECONDS = 15


def _header_safe(value: str) -> str:
    """CR/LF in a header value allows SMTP header injection."""
    return value.replace("\r", " ").replace("\n", " ").strip()


def send_contact_notification(name: str, email: str, subject: str, message: str) -> bool:
    """
    1. Saves local JSON copy to backend/data/messages/
    2. Sends email notification to owner if SMTP is configured
    """
    now = datetime.now(timezone.utc)

    # 1. Save local backup file
    try:
        BACKUP_DIR.mkdir(parents=True, exist_ok=True)
        filename = BACKUP_DIR / f"msg_{now.strftime('%Y%m%d_%H%M%S_%f')}.json"
        with open(filename, "w", encoding="utf-8") as f:
            json.dump({
                "name": name,
                "email": email,
                "subject": subject,
                "message": message,
                "timestamp": now.isoformat()
            }, f, indent=2)
        print(f"Local backup saved to {filename}")
    except Exception as e:
        print(f"Failed to write local JSON backup: {e}")

    # 2. Send Email if credentials present
    # Read from config at call time rather than at import time, so the values
    # do not depend on which module triggered load_dotenv() first.
    if not config.SMTP_USER or not config.SMTP_PASSWORD:
        print("SMTP credentials not set in .env. Skipping live email delivery.")
        return False

    recipient = config.OWNER_EMAIL or config.SMTP_USER

    try:
        msg = EmailMessage()
        msg["From"] = config.SMTP_USER
        msg["To"] = recipient
        msg["Reply-To"] = _header_safe(email)
        msg["Subject"] = _header_safe(f"[Portfolio] {subject} - from {name}")
        msg.set_content(f"""New Contact Form Submission received on your Portfolio Website:

Name: {name}
Email: {email}
Subject: {subject}
Date: {now.strftime('%Y-%m-%d %H:%M:%S UTC')}

Message:
----------------------------------------
{message}
----------------------------------------

Reply directly to this email to respond to {name} at {email}.
""")

        # Without a timeout a hung SMTP server blocks a worker thread forever.
        with smtplib.SMTP(config.SMTP_HOST, config.SMTP_PORT, timeout=SMTP_TIMEOUT_SECONDS) as server:
            server.starttls()
            server.login(config.SMTP_USER, config.SMTP_PASSWORD)
            server.send_message(msg)
        print(f"Notification email sent to {recipient}")
        return True
    except Exception as e:
        print(f"Failed to send notification email: {e}")
        return False
