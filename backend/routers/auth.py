from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select

from database import get_db
from models import User
from schemas import UserRegister, UserRegisterResponse, UserLogin, TokenResponse
from auth import hash_password, verify_password, create_access_token, require_approved, require_admin

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post(
    "/register",
    response_model=UserRegisterResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(payload: UserRegister, db: Session = Depends(get_db)):
    hashed = hash_password(payload.password)

    user = User(
        email=payload.email.strip().lower(),
        hashed_password=hashed,
        display_name=payload.display_name,
    )

    db.add(user)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    db.refresh(user)
    return user

@router.post(
        "/login", 
        response_model=TokenResponse)
def login(payload: UserLogin, db: Session = Depends(get_db)):
    user = db.scalar(
		select(User).where(User.email == payload.email)
    )

    _DUMMY_HASH = hash_password("not-a-real-password")

    if user is None:
        verify_password(payload.password, _DUMMY_HASH) 
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Incorrect email or password")
    if not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Incorrect email or password")

    token = create_access_token(user_id=user.id)
    return TokenResponse(access_token=token)

@router.get("/me")
def whoami(current_user: User = Depends(require_approved)):
    return {
        "id": str(current_user.id),
        "email": current_user.email,
        "status": current_user.status.value,
        "is_admin": current_user.is_admin,
    }

@router.get("/admin-check")
def admin_check(admin: User = Depends(require_admin)):
    return {"message": f"Hello admin {admin.email}"}