import urllib.request
import json

# Test Contact API
print("--- 1. Testing Contact API ---")
contact_data = json.dumps({
    "name": "Talha Ghafoor",
    "email": "talhaghafoor84@gmail.com",
    "subject": "Portfolio Backend Verification",
    "message": "Backend testing successful: SQL Server storage + Gmail notification active!"
}).encode("utf-8")

req = urllib.request.Request(
    "http://localhost:8000/api/contact",
    data=contact_data,
    headers={"Content-Type": "application/json"},
    method="POST"
)

try:
    resp = urllib.request.urlopen(req)
    res = json.loads(resp.read())
    print("Contact API Response:", json.dumps(res, indent=2))
except Exception as e:
    print("Contact API Error:", e)

# Test NLP Chat API
print("\n--- 3. Testing AI Chat Playground API ---")
chat_data = json.dumps({
    "prompt": "What Cypress and SQA test suites have you automated?"
}).encode("utf-8")

req_chat = urllib.request.Request(
    "http://localhost:8000/api/nlp/chat",
    data=chat_data,
    headers={"Content-Type": "application/json"},
    method="POST"
)

try:
    resp_chat = urllib.request.urlopen(req_chat)
    res_chat = json.loads(resp_chat.read())
    print("Chat API Response:", json.dumps(res_chat, indent=2))
except Exception as e:
    print("Chat API Error:", e)

# Test Visitor Log API
print("\n--- 4. Testing Visitor Analytics API ---")
visitor_data = json.dumps({
    "page_visited": "/projects",
    "referrer": "http://localhost:5173"
}).encode("utf-8")

req_visitor = urllib.request.Request(
    "http://localhost:8000/api/analytics/visitor",
    data=visitor_data,
    headers={"Content-Type": "application/json"},
    method="POST"
)

try:
    resp_visitor = urllib.request.urlopen(req_visitor)
    res_visitor = json.loads(resp_visitor.read())
    print("Visitor API Response:", json.dumps(res_visitor, indent=2))
except Exception as e:
    print("Visitor API Error:", e)

# Test Database Summary API
print("\n--- 5. Testing Database Summary & Telemetry API ---")
req_summary = urllib.request.Request("http://localhost:8000/api/analytics/summary", method="GET")

try:
    resp_summary = urllib.request.urlopen(req_summary)
    res_summary = json.loads(resp_summary.read())
    print("Database Summary Response:", json.dumps(res_summary, indent=2))
except Exception as e:
    print("Database Summary Error:", e)

