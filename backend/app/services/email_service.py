import os
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

OWNER_EMAIL = os.getenv("OWNER_EMAIL", "talhaghafoor84@gmail.com")
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")


def send_contact_notification(name: str, email: str, subject: str, message: str) -> bool:
    """
    1. Saves local JSON copy to backend/data/messages/ (portfolio folder)
    2. Sends email notification to owner if SMTP is configured
    """
    # 1. Save local backup file in backend/data/messages/ (the portfolio folder)
    try:
        os.makedirs("./data/messages", exist_ok=True)
        filename = f"./data/messages/msg_{datetime.utcnow().strftime('%Y%m%d_%H%M%S_%f')}.json"
        with open(filename, "w", encoding="utf-8") as f:
            json.dump({
                "name": name,
                "email": email,
                "subject": subject,
                "message": message,
                "timestamp": datetime.utcnow().isoformat()
            }, f, indent=2)
        print(f"Local backup saved to {filename}")
    except Exception as e:
        print(f"Failed to write local JSON backup: {e}")

    # 2. Send Email if credentials present
    if not SMTP_USER or not SMTP_PASSWORD:
        print("SMTP credentials not set in .env. Skipping live email delivery.")
        return False

    try:
        msg = MIMEMultipart()
        msg["From"] = SMTP_USER
        msg["To"] = OWNER_EMAIL
        msg["Reply-To"] = email
        msg["Subject"] = f"[Portfolio] {subject} - from {name}"

        body = f"""
New Contact Form Submission received on your Portfolio Website:

Name: {name}
Email: {email}
Subject: {subject}
Date: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}

Message:
----------------------------------------
{message}
----------------------------------------

Reply directly to this email to respond to {name} at {email}.
        """
        msg.attach(MIMEText(body, "plain"))

        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(msg)
        server.quit()
        print(f"Notification email sent to {OWNER_EMAIL}")
        return True
    except Exception as e:
        print(f"Failed to send notification email: {e}")
        return False
