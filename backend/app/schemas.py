from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Literal, Optional
from datetime import datetime

class RegisterIn(BaseModel):
    full_name: str = Field(min_length=3, max_length=128)
    username: str = Field(min_length=3, max_length=64)
    email: EmailStr
    password: str = Field(min_length=8)
    role: Literal["user", "admin"] = "user"

class LoginIn(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    full_name: str
    username: str
    email: EmailStr
    role: str
    created_at: datetime

class LoginOut(BaseModel):
    message: str
    token: str
    role: str
    username: str

class MessageOut(BaseModel):
    message: str

ProjectStatus = Literal["planned", "active", "on_hold", "completed", "archived"]

class ProjectCreateIn(BaseModel):
    name: str = Field(min_length=1, max_length=128)
    description: Optional[str] = None
    status: ProjectStatus = "active"

class ProjectUpdateIn(BaseModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=128)
    description: Optional[str] = None
    status: Optional[ProjectStatus] = None

class ProjectOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    description: Optional[str]
    status: ProjectStatus
    owner_id: int
    created_at: datetime
    updated_at: datetime

TaskStatus = Literal["todo", "in_progress", "in_review", "done"]

class TaskCreateIn(BaseModel):
    title: str = Field(min_length=1, max_length=128)
    description: Optional[str] = None
    status: TaskStatus = "todo"
    points: int = Field(ge=1, le=100)
    project_id: int

class TaskUpdateIn(BaseModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=128)
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    points: Optional[int] = Field(default=None, ge=1, le=100)
    project_id: Optional[int] = None

class TaskOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str
    description: Optional[str]
    status: TaskStatus
    points: int
    owner_id: int
    project_id: int
    created_at: datetime
    updated_at: datetime