import threading
from typing import List

from app.config import MAX_STORE_ENTRIES
from app.models import ContactMessage, NlpLog, VisitorLog, ApiRequestLog

# In-memory fallback used only when the database is unreachable.
contact_messages_store: List[ContactMessage] = []
nlp_logs_store: List[NlpLog] = []
visitor_logs_store: List[VisitorLog] = []
api_request_logs_store: List[ApiRequestLog] = []

_id_counter = 1
_id_lock = threading.Lock()


def get_next_id() -> int:
    # Endpoints run in a threadpool, so the counter needs a lock or two
    # concurrent requests can be handed the same id.
    global _id_counter
    with _id_lock:
        curr = _id_counter
        _id_counter += 1
    return curr


def store_append(store: list, entry) -> None:
    """Prepend an entry and drop the oldest ones past the cap."""
    entry.id = get_next_id()
    store.insert(0, entry)
    if len(store) > MAX_STORE_ENTRIES:
        del store[MAX_STORE_ENTRIES:]
