from pydantic import BaseModel, EmailStr
from datetime import datetime

# 1. ฟอร์มสำหรับ "รับข้อมูล" ตอนสมัคร (User กรอกแค่นี้)
class UserCreate(BaseModel):
    username: str
    email: EmailStr  # เช็ค format อีเมลให้อัตโนมัติ!
    password: str

# 2. ฟอร์มสำหรับ "ส่งข้อมูลกลับ" (เราจะไม่ส่ง password คืนไป)
class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    is_active: bool

    class Config:
        from_attributes = True # เพื่อให้ Pydantic อ่านข้อมูลจาก SQLAlchemy ได้

class HistoryCreate(BaseModel):
    algorithm_name: str
    grid_size: int
    visited_nodes: int
    path_nodes: int
    efficiency: float

class HistoryResponse(HistoryCreate):
    id: int
    created_at: datetime
    user_id: int

    class Config:
        from_attributes = True   

class FavoriteBase(BaseModel):
    page_path: str
    title: str
    downloaded: bool 

class FavoriteCreate(FavoriteBase):
    pass

class FavoriteResponse(FavoriteBase):
    id: int
    user_id: int
    class Config:
        from_attributes = True                

