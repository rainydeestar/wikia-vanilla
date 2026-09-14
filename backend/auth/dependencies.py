import uuid

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt import PyJWTError
from sqlalchemy.orm import Session
from sqlalchemy import select

from database import get_db
from models import User, UserStatus
from auth import decode_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decode_access_token(token)
        user_id = uuid.UUID(payload["sub"])
    except (PyJWTError, ValueError, TypeError, KeyError):
        raise credentials_exception

    user = db.scalar(
        select(User).where(User.id == user_id)
    )

    if user is None:
        raise credentials_exception

    return user

def require_approved(current_user: User = Depends(get_current_user)) -> User:
    if current_user.status == UserStatus.REJECTED:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Account application was rejected"
)
    if current_user.status != UserStatus.APPROVED:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Account is pending approval"
)
    return current_user

def require_admin(current_user: User = Depends(get_current_user)) -> User:
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required",
        )
    return current_user