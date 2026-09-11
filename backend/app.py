from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import Base, engine, get_db
from models import Ping

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default dev server
    allow_methods=["*"],
    allow_headers=["*"],
)

# Creates the pings table if it doesn't exist yet. Fine for this
# throwaway check; a real project would use Alembic migrations instead.
Base.metadata.create_all(bind=engine)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/db-check")
def db_check(db: Session = Depends(get_db)):
    """Writes one row, then reads it back, to prove the DB connection works."""
    row = Ping()
    db.add(row)
    db.commit()
    db.refresh(row)

    count = db.query(Ping).count()
    return {"inserted_id": row.id, "message": row.message, "total_rows": count}