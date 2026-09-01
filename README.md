# 🏛️ The Algorithm Vault

> **Interactive Data Structures & Algorithms Visualizer**  
> เว็บแอปพลิเคชันจำลองการทำงานของโครงสร้างข้อมูลและอัลกอริทึมแบบ Interactive พัฒนาขึ้นเป็นโปรเจกต์ฝึกหัดทำเว็บช่วงแรก ๆ โดยนำหัวข้อและตรรกะที่ได้เรียนรู้จากวิชา Data Structures & Algorithms มาแปลงเป็นภาพเคลื่อนไหว (Visual Simulation) เพื่อช่วยให้เข้าใจขั้นตอนการทำงานได้ง่ายและชัดเจนยิ่งขึ้น

---

## 🎯 จุดประสงค์ของโปรเจกต์ (Motivation)

- **ทำความเข้าใจผ่านภาพ (Algorithm Visualization):** เปลี่ยนตรรกะและทฤษฎีในห้องเรียนให้กลายเป็นแอนิเมชันที่มองเห็นขั้นตอนการประมวลผล (Step-by-step)
- **ฝึกฝนการพัฒนาเว็บพื้นฐาน (Core Web Skills):** พัฒนาด้วย **HTML5, Vanilla CSS3, และ Vanilla JavaScript (ES6 Modules)** โดยไม่ใช้ Framework สำเร็จรูป เพื่อฝึกการจัดการ DOM, Event Driven และ OOP
- **เชื่อมโยงทฤษฎีสู่การปฏิบัติจริง (Theory to Practice):** ฝึกเขียนโครงสร้างข้อมูลและอัลกอริทึมจริง เช่น Min-Heap, Shunting-Yard, Linked List, Stack และ Recursion

---

## 📌 สถานะการพัฒนาและการใช้งาน (Project Status & Scope)

> [!NOTE]
> โปรเจกต์นี้เป็น **โครงงานเพื่อการศึกษาและฝึกหัดพัฒนาเว็บ (Learning Project & Portfolio)** สำหรับทดลองรันในเครื่อง (Local Environment) **ยังไม่มีการเปิดใช้งานบน Production หรือ Public Server จริง**

- ✅ **ส่วนที่ทำงานได้สมบูรณ์ (Fully Functional - Client-side):**
  - **โมดูลจำลองทั้ง 6 โมดูลบน Frontend:** สามารถเปิดรันผ่านเว็บเบราว์เซอร์และใช้งานตรรกะคำนวณ แอนิเมชัน รวมถึง Interactive Controls ทั้งหมดได้ 100% โดยไม่ต้องเปิด Backend
  - **การเก็บข้อมูลในเครื่อง:** ใช้ `localStorage` ในการบันทึกประวัติการคำนวณและสถิติการทดลองบนเบราว์เซอร์ของผู้ใช้
- 🧪 **ส่วนทดลองพัฒนาเสริม (Experimental Prototype - Local Only):**
  - **Backend API (`backend-api/`):** พัฒนาขึ้นเพื่อฝึกการออกแบบ REST API, ระบบจัดการสมาชิก (Auth) และการเชื่อมต่อฐานข้อมูล PostgreSQL ผ่าน SQLAlchemy โดยยังเป็นเพียง Prototype ที่ยังไม่ได้ใช้งาน เท่านั้น

---

## 🧩 รายการโมดูลและอัลกอริทึม (Modules)

| โมดูล | อัลกอริทึม / โครงสร้างข้อมูล | รายละเอียดและฟีเจอร์หลัก | เอกสาร |
| :--- | :--- | :--- | :---: |
| 🧭 **Pathfinding Visualizer** | Dijkstra, A* Search, Min-Heap | ค้นหาเส้นทางสั้นที่สุดบน 2D Grid (8 ทิศทาง), สร้างเขาวงกต (Random Maze), และเปรียบเทียบประสิทธิภาพการสำรวจโหนด | [อ่านต่อ](frontend-web/workpiece/Pathfinding%20Visualizer/README.md) |
| 🏯 **Towers of Hanoi** | Recursion, Divide & Conquer | จำลองการย้ายจานตามสูตร $2^n - 1$ มีทั้งโหมดเล่นเอง (Drag & Drop) และโหมด AI Recursive Solver พร้อม Log การทำงาน | [อ่านต่อ](frontend-web/workpiece/Tower_Of_Hanoi/README.md) |
| 🔗 **Data Structure Lab** | Singly Linked List, Stack (LIFO) | จำลองการทำงานของ Linked List (Insert Head, Delete Value, Traversal) และ Stack (Push, Pop, Peek, Boundary Check) | [อ่านต่อ](frontend-web/workpiece/Linked%20List%20or%20Stack/README.md) |
| 🧮 **Math Expression Engine** | Shunting-Yard, Stack Machine | แปลงนิพจน์ Infix $\rightarrow$ Postfix และประเมินผลลัพธ์ทางคณิตศาสตร์แบบทีละสเต็ป พร้อมแสดงสถานะ Operator/Operand Stack | [อ่านต่อ](frontend-web/workpiece/Infix%20to%20Posfix/README.md) |
| ✨ **Visual Pattern Studio** | 2D Nested Loops ($i, j$) | จำลองการวาดรูปทรงเรขาคณิตด้วยลูปซ้อนลูป เช่น Pyramid, Diamond (Manhattan Distance) พร้อมแสดงการตรวจสอบเงื่อนไขบูลีนทีละเซลล์ | [อ่านต่อ](frontend-web/workpiece/Neated%20Loops/README.md) |
| 🔐 **Caesar Cipher & Anagram** | Modular Arithmetic, Sorting | เข้ารหัส/ถอดรหัสข้อความแบบเลื่อนตัวอักษร, ตรวจสอบคำ Anagram และบันทึกประวัติการใช้งานลงใน `localStorage` | [อ่านต่อ](frontend-web/workpiece/Caeser%20Cipher/README.md) |

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Frontend:**
  - **HTML5:** โครงสร้างหน้าเว็บและ Semantic Tags
  - **CSS3:** ออกแบบ UI แบบ Dark Theme, Grid Layout และ CSS Keyframe Animations
  - **Vanilla JavaScript (ES6+):** ควบคุมตรรกะทั้งหมด, การจัดการ State, ES Modules และ Object-Oriented Programming (OOP)
  - **Chart.js:** แสดงกราฟสถิติเปรียบเทียบประสิทธิภาพในโมดูล Pathfinding
- **Backend API (ส่วนเสริม):**
  - **Python (FastAPI) & SQLAlchemy:** สำหรับระบบ REST API จัดการข้อมูลสมาชิก, บันทึกประวัติสถิติการรันอัลกอริทึม, รายการโปรด และดาวน์โหลดไฟล์ [👉 อ่านเอกสาร Backend API](backend-api/README.md)

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
The_Algorithm_Vault/
├── frontend-web/                      # ส่วนติดต่อผู้ใช้ (Frontend Web Application)
│   ├── index.html                     # หน้าหลัก (Menu & Module Hub)
│   ├── about.html                     # หน้าอธิบายที่มาและแนวคิดของโปรเจกต์
│   ├── styles/                        # สไตล์ชีตรวม (Global Styles & Themes)
│   ├── scripts/                       # สคริปต์ควบคุมเลย์เอาต์และการนำทาง
│   ├── client/                        # ส่วน Login และ Profile
│   └── workpiece/                     # โฟลเดอร์รวม 6 โมดูลอัลกอริทึม
│       ├── Caeser Cipher/             # Caesar Cipher & Anagram Checker
│       ├── Infix to Posfix/           # Shunting-Yard & Postfix Calculator
│       ├── Linked List or Stack/      # Linked List & Stack Visualizer
│       ├── Neated Loops/              # 2D Nested Loop Pattern Studio
│       ├── Pathfinding Visualizer/    # Dijkstra & A* Pathfinding Lab
│       └── Tower_Of_Hanoi/            # Tower of Hanoi Recursive Solver
├── backend-api/                       # ระบบ Backend เสริม (FastAPI & PostgreSQL)
│   └── README.md                      # เอกสารอธิบายการทำงานและ API Endpoints
└── README.md                          # เอกสารภาพรวมของโปรเจกต์
```

---

## 🚀 วิธีการเปิดใช้งาน (How to Run)

### วิธีที่ 1: เปิดผ่าน Live Server ใน VS Code (ง่ายที่สุด)
1. เปิดโฟลเดอร์โปรเจกต์ด้วย Visual Studio Code
2. คลิกขวาที่ไฟล์ `frontend-web/index.html`
3. เลือก **"Open with Live Server"**

### วิธีที่ 2: รันผ่าน Local Web Server
```bash
# ใช้ npx serve
npx serve ./

# หรือใช้ Python HTTP Server
python -m http.server 5500
```
เปิดเบราว์เซอร์ไปที่ `http://localhost:5500/frontend-web/index.html`

---

## 👨‍💻 ผู้พัฒนา (Author)

- **ธีรภัทร บุญมามี (Teeraphat Boonmamee)**  
- นักศึกษาวิศวกรรมคอมพิวเตอร์และการสื่อสาร