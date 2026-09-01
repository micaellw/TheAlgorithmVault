from sqlalchemy import Column, Integer, String, Boolean, DateTime , ForeignKey , Float
from sqlalchemy.orm import declarative_base , relationship
from sqlalchemy.sql import func
from datetime import datetime
# from .database import Base

# สร้างแม่พิมพ์
Base = declarative_base()

# สร้าง Class User (เทียบเท่าตาราง users ใน Database)
class User(Base):
    __tablename__ = "users"  # ชื่อตารางใน Database

    id = Column(Integer, primary_key=True, index=True) # ไอดีหลัก (1, 2, 3...)
    username = Column(String, unique=True, index=True) # ห้ามซ้ำ
    email = Column(String, unique=True, index=True)    # ห้ามซ้ำ
    password_hash = Column(String)                     # รหัสผ่านที่เข้ารหัสแล้ว
    is_active = Column(Boolean, default=True)          # สถานะใช้งาน
    created_at = Column(DateTime(timezone=True), server_default=func.now()) # เวลาสมัคร
    profile_image = Column(String, default="default-avatar.png")

    histories = relationship("AlgorithmHistory", back_populates="owner")
    favorites = relationship("Favorite", back_populates="owner")

class AlgorithmHistory(Base):
    __tablename__ = "algorithm_histories"

    id = Column(Integer, primary_key=True, index=True)
    algorithm_name = Column(String) # Dijkstra, A*
    grid_size = Column(Integer)     # เช่น 20 (สำหรับ 20x20)
    visited_nodes = Column(Integer) # visited-count
    path_nodes = Column(Integer)    # path-count
    efficiency = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Foreign Key เชื่อมกับ User
    user_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="histories")    

class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    page_path = Column(String)  # เก็บ Path เช่น /Pathfinding_Visualizer.html
    title = Column(String)      # ชื่อหัวข้ออัลกอริทึม
    downloaded = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="favorites")   