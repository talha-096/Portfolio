from typing import List
from app.models import ContactMessage, NlpLog, VisitorLog, ApiRequestLog

# In-memory storage lists replacing database connections
contact_messages_store: List[ContactMessage] = []
nlp_logs_store: List[NlpLog] = []
visitor_logs_store: List[VisitorLog] = []
api_request_logs_store: List[ApiRequestLog] = []

_id_counter = 1


def get_next_id() -> int:
    global _id_counter
    curr = _id_counter
    _id_counter += 1
    return curr
