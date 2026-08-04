"""
Manual smoke check against a locally running server: python test_api.py

Everything is inside functions and a __main__ guard so that importing this file
(pytest collects `test_*.py` by default) does not fire live HTTP requests. The
helpers are named check_* rather than test_* for the same reason.
"""
import json
import urllib.error
import urllib.request

BASE_URL = "http://localhost:8000"


def call(path: str, payload=None, method: str = "GET"):
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    req = urllib.request.Request(
        f"{BASE_URL}{path}",
        data=data,
        headers={"Content-Type": "application/json"} if data else {},
        method=method,
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            print(f"{method} {path} -> {resp.status}")
            print(json.dumps(json.loads(resp.read()), indent=2))
    except urllib.error.HTTPError as e:
        # Without this branch a 4xx prints as a bare "HTTP Error 422" and the
        # validation detail explaining *why* is thrown away.
        print(f"{method} {path} -> {e.code}")
        print(e.read().decode("utf-8", errors="replace"))
    except Exception as e:
        print(f"{method} {path} -> failed: {e}")


def check_contact():
    print("\n--- 1. Testing Contact API ---")
    call("/api/contact", {
        "name": "Talha Ghafoor",
        "email": "talhaghafoor84@gmail.com",
        "subject": "Portfolio Backend Verification",
        "message": "Backend testing successful: storage & notification active!",
    }, "POST")


def check_chat():
    print("\n--- 2. Testing AI Chat Playground API ---")
    call("/api/nlp/chat", {"prompt": "What Cypress and SQA test suites have you automated?"}, "POST")


def check_visitor():
    print("\n--- 3. Testing Visitor Analytics API ---")
    call("/api/analytics/visitor", {"page_visited": "/projects", "referrer": "http://localhost:5173"}, "POST")


def check_summary():
    print("\n--- 4. Testing Database Summary & Telemetry API ---")
    call("/api/analytics/summary")


def check_health():
    print("\n--- 5. Testing Health Endpoint ---")
    call("/health")


if __name__ == "__main__":
    check_health()
    check_contact()
    check_chat()
    check_visitor()
    check_summary()
