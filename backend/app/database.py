import os
import urllib.parse
from sqlmodel import create_engine, Session, SQLModel
from sqlalchemy import text
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "")

engine = None
using_supabase = False

if DATABASE_URL:
    try:
        print("Connecting to Supabase PostgreSQL Database...")
        engine = create_engine(
            DATABASE_URL,
            echo=False,
            pool_size=10,
            max_overflow=5,
            pool_recycle=300,
            pool_pre_ping=True,
            connect_args={"connect_timeout": 10}
        )
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        print("SUCCESS: Connected to Supabase PostgreSQL Database!")
        using_supabase = True
    except Exception as err:
        print(f"Notice: Supabase PostgreSQL direct connection error ({err}). Operating in hybrid storage mode.")
        using_supabase = False


def init_db():
    if engine and using_supabase:
        try:
            SQLModel.metadata.create_all(engine)
            print("Supabase database tables verified / synchronized.")
        except Exception as e:
            print(f"Notice during DB table sync: {e}")


def get_session():
    if engine and using_supabase:
        with Session(engine) as session:
            yield session
    else:
        yield None
