# ⚙️ The Algorithm Vault – Backend API

> **โมดูลในโปรเจกต์:** [The Algorithm Vault](../README.md)

> [!NOTE]
> **สถานะการใช้งาน:** ส่วน Backend API นี้เป็น **ตัวต้นแบบทดลอง (Experimental Prototype)** ที่พัฒนาขึ้นเพื่อฝึกหัดการเขียน REST API และเชื่อมต่อกับ PostgreSQL บนเครื่องเฉพาะส่วนตัว (Localhost) เท่านั้น **ยังไม่มีการ นำไปใช้ในตัวเว็ป**

ระบบ RESTful API พัฒนาด้วย **Python (FastAPI)** และ **SQLAlchemy ORM** เชื่อมต่อกับฐานข้อมูล **PostgreSQL** เพื่อรองรับระบบสมาชิก (User Management), การจัดเก็บประวัติผลการทดลองอัลกอริทึม (Algorithm History), ระบบบันทึกรายการโปรด (Favorites) และบริการดาวน์โหลดไฟล์

---

## 🎯 ฟีเจอร์หลักของระบบ (Features)

### 1. ระบบจัดการผู้ใช้และความปลอดภัย (Authentication & User Profile)
- **สมัครสมาชิก (`/register`):** ตรวจสอบ Username/Email ซ้ำ และเข้ารหัสรหัสผ่านด้วย **Argon2** (`passlib`)
- **เข้าสู่ระบบ (`/login`):** รองรับการล็อกอินด้วย Username หรือ Email พร้อมตรวจสอบรหัสผ่าน
- **จัดการโปรไฟล์ (`/users/{user_id}`):** แก้ไข Username และอัปโหลดรูปภาพโปรไฟล์ประจำตัว (`UploadFile`)
- **Static File Serving:** ให้บริการไฟล์ภาพโปรไฟล์ผ่านพาธ `/static/profile_pics/`

### 2. ระบบบันทึกสถิติการทดลอง (Algorithm Run History)
- บันทึกสถิติการทำงานของอัลกอริทึม เช่น Pathfinding (Algorithm Name, Grid Size, Visited Nodes, Path Nodes, Efficiency %)
- ดึงประวัติการทดลองย้อนหลังเรียงตามเวลาล่าสุด (`created_at desc`)
- รองรับการล้างประวัติการทดลองทั้งหมดของผู้ใช้

### 3. ระบบรายการโปรด (Favorites System)
- บันทึกหน้าอัลกอริทึมที่สนใจ พร้อมบันทึกสถานะการดาวน์โหลดโค้ด
- ดึงรายการโปรดทั้งหมดและลบรายการโปรดที่ไม่ต้องการ

### 4. ระบบบริการดาวน์โหลดไฟล์ (Download Service)
- ให้บริการดาวน์โหลด Source Code และเอกสารผ่าน Endpoint `GET /download`

---

## 🛣️ รายการ API Endpoints

### 👤 Authentication & Users
| Method | Endpoint | รายละเอียด |
| :--- | :--- | :--- |
| `POST` | `/register` | สมัครสมาชิกใหม่ (รับ `username`, `email`, `password`) |
| `POST` | `/login` | เข้าสู่ระบบ (รับ `identifier` และ `password`) |
| `GET` | `/users` | ดึงรายชื่อสมาชิกทั้งหมด (รองรับ pagination: `skip`, `limit`) |
| `GET` | `/users/{user_name}` | ดึงข้อมูลโปรไฟล์ตาม Username |
| `PUT` | `/users/{user_id}` | แก้ไขชื่อ Username |
| `POST` | `/users/{user_id}/upload-avatar` | อัปโหลดรูปโปรไฟล์ (บันทึกเป็น `user_{id}_avatar.ext`) |

### 📊 Algorithm History
| Method | Endpoint | รายละเอียด |
| :--- | :--- | :--- |
| `POST` | `/users/{user_id}/history` | บันทึกประวัติและสถิติการทดลองอัลกอริทึม |
| `GET` | `/users/{user_id}/history` | ดึงประวัติการทดลองทั้งหมดของผู้ใช้ |
| `DELETE` | `/users/{user_id}/history/all` | ลบประวัติการทดลองทั้งหมดของผู้ใช้ |

### ⭐ Favorites
| Method | Endpoint | รายละเอียด |
| :--- | :--- | :--- |
| `POST` | `/users/{user_id}/favorites` | บันทึกหรืออัปเดตหน้าอัลกอริทึมที่ชื่นชอบ |
| `GET` | `/users/{user_id}/favorites` | ดึงรายการโปรดทั้งหมดของผู้ใช้ |
| `DELETE` | `/favorites/{fav_id}` | ลบรายการโปรดตาม ID |

### 📥 File Download
| Method | Endpoint | รายละเอียด |
| :--- | :--- | :--- |
| `GET` | `/download?file={file_name}` | ดาวน์โหลดไฟล์จากไดเรกทอรี `FileForDownload` |

---

## 📁 โครงสร้างโฟลเดอร์ (Directory Structure)

```text
backend-api/
├── application/
│   └── main.py              # Application Entry Point & API Route Handlers
├── data/
│   ├── models.py            # SQLAlchemy ORM Models (User, AlgorithmHistory, Favorite)
│   └── schemas.py           # Pydantic Schemas สำหรับ Data Validation & Serialization
├── static/
│   └── profile_pics/        # โฟลเดอร์จัดเก็บรูปภาพโปรไฟล์ผู้ใช้
├── main.py                  # Standalone File Download API
├── requirements.txt         # รายการแพ็กเกจ Dependencies
└── README.md                # เอกสารประกอบของ Backend
```

---

## 🚀 วิธีการติดตั้งและรันระบบ (How to Run)

### 1. ติดตั้ง Dependencies
เปิด Terminal ในโฟลเดอร์ `backend-api`:
```bash
# สร้างและเปิดใช้งาน Virtual Environment (ถ้ายังไม่มี)
python -m venv venv

# บน Windows PowerShell:
.\venv\Scripts\Activate.ps1

# ติดตั้ง Dependencies
pip install fastapi uvicorn sqlalchemy psycopg2-binary passlib argon2-cffi python-multipart pydantic[email]
```

### 2. กำหนดค่าการเชื่อมต่อฐานข้อมูล
ตรวจสอบการตั้งค่า `DATABASE_URL` ในไฟล์ `application/main.py`:
```python
DATABASE_URL = "postgresql://username:password@localhost:5432/database_name"
```

### 3. รันเซิร์ฟเวอร์
```bash
# รัน API หลัก (User, History, Favorites)
uvicorn application.main:app --reload --port 8000

# หรือรัน File Download Server
uvicorn main:app --reload --port 8001
```

### 4. เข้าชม Interactive API Documentation (Swagger UI)
เปิดเบราว์เซอร์ไปที่:
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`
