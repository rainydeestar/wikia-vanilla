from sqlalchemy import Column, Integer, String

from database import Base


class Ping(Base):
    """Placeholder table used only to prove the DB connection works."""

    __tablename__ = "pings"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(String, default="pong")
