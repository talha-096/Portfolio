import sys

import psycopg2

from app.config import DATABASE_URL

TABLES_SQL = """
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    ip_address VARCHAR(100),
    is_emailed BOOLEAN DEFAULT FALSE,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS nlp_logs (
    id SERIAL PRIMARY KEY,
    input_text TEXT NOT NULL,
    predicted_label VARCHAR(255) NOT NULL,
    confidence_score DOUBLE PRECISION NOT NULL,
    ip_address VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS visitor_logs (
    id SERIAL PRIMARY KEY,
    page_visited VARCHAR(255) NOT NULL,
    ip_address VARCHAR(100),
    user_agent TEXT,
    referrer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS api_request_logs (
    id SERIAL PRIMARY KEY,
    method VARCHAR(20) NOT NULL,
    path VARCHAR(255) NOT NULL,
    query_params TEXT,
    status_code INT NOT NULL,
    execution_time_ms DOUBLE PRECISION NOT NULL,
    ip_address VARCHAR(100),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Every read endpoint orders by created_at DESC.
CREATE INDEX IF NOT EXISTS ix_contact_messages_created_at ON contact_messages (created_at);
CREATE INDEX IF NOT EXISTS ix_nlp_logs_created_at ON nlp_logs (created_at);
CREATE INDEX IF NOT EXISTS ix_visitor_logs_created_at ON visitor_logs (created_at);
CREATE INDEX IF NOT EXISTS ix_api_request_logs_created_at ON api_request_logs (created_at);
"""


def setup_supabase_database() -> bool:
    # No hardcoded project/credential defaults: the connection string comes from
    # the environment or the script stops.
    if not DATABASE_URL:
        print("DATABASE_URL is not set. Copy .env.example to .env and fill it in.")
        return False

    print("Connecting to Supabase PostgreSQL database...")
    try:
        with psycopg2.connect(DATABASE_URL, connect_timeout=15, sslmode="require") as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT version();")
                version = cur.fetchone()[0]
                print(f"SUCCESS: Connected to Supabase PostgreSQL! ({version[:50]}...)")

                cur.execute(TABLES_SQL)
                conn.commit()
                print("Schema tables initialized successfully in Supabase PostgreSQL!")

                cur.execute(
                    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
                )
                print("Active tables in Supabase public schema:", [t[0] for t in cur.fetchall()])
        return True
    except Exception as err:
        print("Error setting up Supabase database:", err)
        return False


if __name__ == "__main__":
    # Non-zero exit so CI or a shell script can tell that setup failed.
    sys.exit(0 if setup_supabase_database() else 1)
