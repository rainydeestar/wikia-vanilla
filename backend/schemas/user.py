from pydantic import BaseModel, EmailStr, Field, ConfigDict
import uuid
from datetime import datetime

from models import UserStatus


class UserRegister(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    display_name: str = Field(min_length=1, max_length=100)


class UserRegisterResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    email: EmailStr
    display_name: str
    status: UserStatus
    created_at: datetime