from sqlmodel import create_engine, Session, SQLModel
from sqlalchemy import text

from app.config import DATABASE_URL

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
            # Supabase requires TLS; without sslmode the driver may negotiate
            # a plaintext connection and send credentials in the clear.
            connect_args={"connect_timeout": 10, "sslmode": "require"},
        )
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        print("SUCCESS: Connected to Supabase PostgreSQL Database!")
        using_supabase = True
    except Exception as err:
        print(f"Notice: Supabase PostgreSQL direct connection error ({err}). Operating in fallback storage mode.")
        # Dispose the half-built pool and drop the reference, otherwise callers
        # that only test `if engine:` will keep paying the connect timeout on
        # every single request while the database is unreachable.
        if engine is not None:
            engine.dispose()
        engine = None
        using_supabase = False


def db_ready() -> bool:
    return engine is not None and using_supabase


def init_db():
    if db_ready():
        try:
            SQLModel.metadata.create_all(engine)
            print("Supabase database tables verified / synchronized.")
        except Exception as e:
            print(f"Notice during DB table sync: {e}")


def get_session():
    if db_ready():
        with Session(engine) as session:
            yield session
    else:
        yield None
