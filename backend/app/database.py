import os
from sqlmodel import create_engine, SQLModel, Session
from sqlalchemy import text
from dotenv import load_dotenv

load_dotenv()

# MS SQL Server connection string for local instance .\SQLEXPRESS
# Uses portfolio_db database with 'portfolio' schema for all tables
DATABASE_URL = os.getenv("DATABASE_URL", "")

PRIMARY_DATABASE_URL = DATABASE_URL or r"mssql+pyodbc:///?odbc_connect=Driver={ODBC Driver 17 for SQL Server};Server=.\SQLEXPRESS;Database=portfolio_db;Trusted_Connection=yes;TrustServerCertificate=yes"
FALLBACK_DATABASE_URL = os.getenv("FALLBACK_DATABASE_URL", "sqlite:///./data/portfolio.db")

engine = None
using_mssql = False

if DATABASE_URL.startswith("sqlite"):
    print("Using SQLite database mode...")
    os.makedirs("./data", exist_ok=True)
    engine = create_engine(
        DATABASE_URL,
        echo=False,
        connect_args={"check_same_thread": False},
        pool_pre_ping=True
    )
    using_mssql = False
else:
    try:
        print("Connecting to MS SQL Server instance (.\\SQLEXPRESS)...")
        test_engine = create_engine(
            PRIMARY_DATABASE_URL,
            echo=False,
            pool_size=20,
            max_overflow=10,
            pool_recycle=3600,
            pool_pre_ping=True
        )
        with test_engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        print("SUCCESS: Connected to MS SQL Server (portfolio_db, schema: portfolio)!")
        engine = test_engine
        using_mssql = True
    except Exception as err:
        print(f"MS SQL Server connection notice: {err}. Using SQLite fallback.")
        os.makedirs("./data", exist_ok=True)
        engine = create_engine(
            FALLBACK_DATABASE_URL,
            echo=False,
            connect_args={"check_same_thread": False},
            pool_pre_ping=True
        )
        using_mssql = False



def init_db():
    from app.models import ContactMessage, NlpLog, VisitorLog, ApiRequestLog  # noqa: F401
    if not using_mssql:
        # Only create tables via SQLModel for SQLite fallback.
        # For MS SQL Server, tables were created by setup SQL scripts.
        SQLModel.metadata.create_all(engine)
        print("Database tables initialized via SQLite fallback.")
    else:
        # Also ensure tables exist in MS SQL Server if created dynamically
        SQLModel.metadata.create_all(engine)
        print("MS SQL Server tables initialized / verified in portfolio schema.")


def get_session():
    with Session(engine) as session:
        yield session
