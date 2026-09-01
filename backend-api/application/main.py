from fastapi import FastAPI, Depends, HTTPException ,File, UploadFile 
from typing import List  # 👈 เพิ่มบรรทัดนี้
from sqlalchemy import create_engine ,or_ , desc
from sqlalchemy.orm import sessionmaker, Session
from passlib.context import CryptContext
from data.models import Base, User ,AlgorithmHistory , Favorite
from data.schemas import UserCreate, UserResponse , HistoryCreate, HistoryResponse ,FavoriteResponse ,FavoriteCreate # ดึง Pydantic Schema
from fastapi.middleware.cors import CORSMiddleware # ดึงของมาใช้
from pydantic import BaseModel
import os
import shutil
from fastapi.staticfiles import StaticFiles 

app = FastAPI()

origins=['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # อนุญาตทุกท่า (GET, POST, PUT, DELETE)
    allow_headers=["*"], # อนุญาตทุก Header
)

class UserLogin(BaseModel):
    identifier: str  # 👈 เปลี่ยนชื่อตัวแปรให้สื่อความหมาย (รับได้ทั้งคู่)
    password: str

# --- ตั้งค่าการเชื่อมต่อ DB ---
# รูปแบบ: postgresql://username:password@server:port/database_name
# ถ้าติดตั้งปกติ username คือ postgres
DATABASE_URL = "postgresql://postgres:31H8bd04@localhost:5432/user_db"

# สร้างตัวเชื่อมต่อ
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# --- 🔥 คำสั่งเสกตาราง (Create Tables) ---
# บรรทัดนี้จะเช็คว่ามีตารางหรือยัง? ถ้ายังไม่มี มันจะสร้างให้ทันที
Base.metadata.create_all(bind=engine)

# ---  ตั้งค่าตัวเข้ารหัสรหัสผ่าน ---
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

# --- 3. ฟังก์ชันช่วย (Dependency) ---
# หน้าที่: เปิด connection -> ให้ API ยืมไปใช้ -> ใช้เสร็จปิดให้เอง
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- 4. ฟังก์ชันเข้ารหัส ---
def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# ===========================
# 🔥 API Register (สมัครสมาชิก)
# ===========================
@app.post("/register", response_model=UserResponse) # รับเข้าเป็น UserCreate / ส่งออกเป็น UserResponse
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    
    # A. เช็คว่ามี Username นี้หรือยัง?
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    # B. เช็คว่ามี Email นี้หรือยัง?
    db_email = db.query(User).filter(User.email == user.email).first()
    if db_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    # C. สร้าง User ใหม่
    hashed_password = get_password_hash(user.password) # 🔒 เข้ารหัสก่อนเก็บ
    
    new_user = User(
        username=user.username,
        email=user.email,
        password_hash=hashed_password # เก็บตัวที่แฮชแล้ว
    )
    
    db.add(new_user)  # เพิ่มเข้า Session
    db.commit()       # บันทึกลง Database จริงๆ
    db.refresh(new_user) # ดึงข้อมูลล่าสุด (เช่น ID ที่เพิ่งสร้าง) กลับมา
    
    return new_user

# ===========================
# 🔑 API Login (เข้าสู่ระบบ)
# ===========================
@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    # 1. ค้นหา User จาก Email
    # db_user = db.query(User).filter(User.email == user.email).first()
    db_user = db.query(User).filter(
        or_(
            User.email == user.identifier, 
            User.username == user.identifier
        )
    ).first()
    
    # 2. ถ้าหาไม่เจอ หรือ รหัสผ่านไม่ตรงกัน (Verify Hash)
    if not db_user or not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=400, detail="อีเมลหรือรหัสผ่านไม่ถูกต้อง")
    
    # 3. ถ้าถูกต้อง ส่งข้อความบอกว่าผ่าน
    return {"message": "Login successful", "user_id": db_user.id, "username": db_user.username  ,"user_email": db_user.email}

# ===========================
# 📖 API Get Users (ขอดูรายชื่อสมาชิกทั้งหมด)
# ===========================
@app.get("/users", response_model=List[UserResponse]) # ส่งกลับเป็น "List" ของ UserResponse
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    # แปลว่า: ไปที่ตาราง User -> เอาข้อมูลมาทั้งหมด -> โดยเริ่มที่ skip และเอามาแค่ limit คน
    users = db.query(User).offset(skip).limit(limit).all()
    return users

@app.get("/users/{user_name}", response_model=UserResponse) 
def read_user(user_name: str, db: Session = Depends(get_db)):
    
    # 1. ค้นหาใน Database โดยเช็คที่ column 'id'
    # เทียบเท่า SQL: SELECT * FROM users WHERE id = user_id LIMIT 1;
    db_user = db.query(User).filter(User.username == user_name).first()
    
    # 2. ถ้าหาไม่เจอ (เป็น None) ให้แจ้ง Error 404
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
        
    # 3. ถ้าเจอ ก็ส่งข้อมูลกลับไป
    return db_user


# --- สร้างโฟลเดอร์เก็บรูปถ้ายังไม่มี ---
UPLOAD_DIR = "static/profile_pics"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# --- สั่งให้ FastAPI เข้าถึงไฟล์รูปภาพผ่าน URL ได้ ---
app.mount("/static", StaticFiles(directory="static"), name="static")

# 1. API อัปเดตชื่อ (Username)
@app.put("/users/{user_id}")
def update_profile(user_id: int, username: str, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # เช็คว่าชื่อซ้ำไหม
    existing_user = db.query(User).filter(User.username == username, User.id != user_id).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="มีผู้ใช้งานชื่อนี้แล้ว")
        
    db_user.username = username
    db.commit()
    db.refresh(db_user)
    # คืนข้อมูลรูปโปรไฟล์ไปด้วยเพื่อให้ Frontend อัปเดตถูก
    return {
        "username": db_user.username, 
        "profile_image": f"http://localhost:8000/static/profile_pics/{db_user.profile_image}"
    }

# 2. API อัปโหลดรูปโปรไฟล์
@app.post("/users/{user_id}/upload-avatar")
async def upload_avatar(user_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    
    # ตั้งชื่อไฟล์ใหม่ป้องกันชื่อซ้ำ: user_1_avatar.jpg
    extension = file.filename.split(".")[-1]
    filename = f"user_{user_id}_avatar.{extension}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    # บันทึกไฟล์ลง Disk
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # อัปเดตชื่อไฟล์ใน Database
    db_user.profile_image = filename
    db.commit()
    
    return {"image_url": f"http://localhost:8000/static/profile_pics/{filename}"}

# ===========================
# 📝 API Save History (บันทึกสถิติ)
# ===========================
@app.post("/users/{user_id}/history", response_model=HistoryResponse)
def create_user_history(user_id: int, history: HistoryCreate, db: Session = Depends(get_db)):
    new_history = AlgorithmHistory(**history.dict(), user_id=user_id)
    db.add(new_history)
    db.commit()
    db.refresh(new_history)
    return new_history

# ===========================
# 📊 API Get User History (ดึงประวัติของ User นั้นๆ)
# ===========================
@app.get("/users/{user_id}/history", response_model=List[HistoryResponse])
def read_user_history(user_id: int, db: Session = Depends(get_db)):
    histories = db.query(AlgorithmHistory).filter(AlgorithmHistory.user_id == user_id).order_by(desc(AlgorithmHistory.created_at)).all()
    return histories

# ===========================
# 🧹 API Clear All User History
# ===========================
@app.delete("/users/{user_id}/history/all")
def clear_all_user_history(user_id: int, db: Session = Depends(get_db)):
    # ลบทุกแถวในตาราง algorithm_histories ที่มี user_id ตรงกัน
    db.query(AlgorithmHistory).filter(AlgorithmHistory.user_id == user_id).delete()
    db.commit()
    return {"message": "ล้างประวัติทั้งหมดเรียบร้อยแล้ว"}




# ===========================
# ⭐ API Favorites (จัดการรายการโปรด)
# ===========================

# 1. บันทึกหรืออัปเดต (Toggle/Save)
@app.post("/users/{user_id}/favorites", response_model=FavoriteResponse)
def toggle_user_favorite(user_id: int, fav: FavoriteCreate, db: Session = Depends(get_db)):
    # เช็คว่าเคยบันทึกหน้านี้ไปหรือยัง
    db_fav = db.query(Favorite).filter(
        Favorite.user_id == user_id, 
        Favorite.page_path == fav.page_path
    ).first()

    if db_fav:
        # ถ้ามีแล้ว แต่อาจจะมาอัปเดตสถานะ downloaded
        db_fav.downloaded = fav.downloaded
        db.commit()
        db.refresh(db_fav)
        return db_fav
    
    # ถ้ายังไม่มีให้สร้างใหม่
    new_fav = Favorite(**fav.dict(), user_id=user_id)
    db.add(new_fav)
    db.commit()
    db.refresh(new_fav)
    return new_fav

# 2. ดึงรายการโปรดทั้งหมดของ User
@app.get("/users/{user_id}/favorites", response_model=List[FavoriteResponse])
def read_user_favorites(user_id: int, db: Session = Depends(get_db)):
    return db.query(Favorite).filter(Favorite.user_id == user_id).all()

# 3. ลบรายการโปรด
@app.delete("/favorites/{fav_id}")
def delete_favorite(fav_id: int, db: Session = Depends(get_db)):
    db_fav = db.query(Favorite).filter(Favorite.id == fav_id).first()
    if not db_fav:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(db_fav)
    db.commit()
    return {"message": "Removed from favorites"}