# 🏯 Towers of Hanoi (Interactive Recursion Lab)

> **โมดูลในโปรเจกต์:** [The Algorithm Vault](../../README.md)

ระบบจำลองปัญหาคณิตศาสตร์ระดับคลาสสิก **"หอคอยฮานอย (Tower of Hanoi)"** เพื่อศึกษาแนวคิดของฟังก์ชันเรียกซ้ำ (Recursion), Call Stack และการเติบโตแบบทวีคูณ (Exponential Growth) ผ่าน Interactive Simulation

---

## 🎯 ฟีเจอร์หลัก (Features)

### 1. โหมดเล่นด้วยตัวเอง (Interactive Manual Mode)
- ผู้ใช้สามารถลากและวางจาน (Drag & Drop) หรือคลิกเลือกย้ายจานระหว่างเสา 3 ต้น
- มีระบบตรวจสอบกฎตามกติกาจริง (ห้ามวางจานที่มีขนาดใหญ่กว่าทับบนจานที่เล็กกว่า)
- นับจำนวนครั้งที่ผู้ใช้ย้ายจริง เปรียบเทียบกับจำนวนครั้งขั้นต่ำตามทฤษฎี

### 2. AI Recursive Auto-Solver
- ระบบแก้ปัญหาอัตโนมัติด้วยอัลกอริทึม Divide and Conquer Recursion
- คำนวณจำนวนครั้งที่ย้ายน้อยที่สุดตามสูตร:
  $$T(n) = 2^n - 1$$
  *(เช่น 3 จาน = 7 ครั้ง, 4 จาน = 15 ครั้ง, 5 จาน = 31 ครั้ง)*
- รองรับการแก้ปัญหาต่อจาก **Arbitrary State** (เริ่มให้อัตโนมัติจากสถานะที่ผู้ใช้จัดจานค้างไว้ได้)

### 3. Real-time Recursive Monitor
- แสดงสถิติการย้ายจานแบบเรียลไทม์
- มีกล่องบันทึก Log ลำดับขั้นตอนการเคลื่อนย้ายจาน

---

## ⏱️ ความซับซ้อนของการทำงาน (Complexity)

| มิติ | ค่า Complexity | คำอธิบาย |
| :--- | :---: | :--- |
| **Time Complexity** | $\Theta(2^n)$ | จำนวนขั้นตอนการย้ายเพิ่มขึ้นเป็น 2 เท่าตามจำนวนจาน $n$ |
| **Space Complexity** | $O(n)$ | ลึกสุดตามขนาดของ Call Stack เท่ากับจำนวนจาน $n$ |
| **State Space** | $\le 3^n$ | จำนวนรูปแบบการจัดวางจานที่เป็นไปได้ทั้งหมดบนเสา 3 ต้น |

---

## 📁 โครงสร้างไฟล์ (File Structure)

```text
Tower_Of_Hanoi/
├── TowerOfHanoi.html                      # หน้าเว็บหลักของโมดูล
├── scripts/
│   └── scriptsHanoi.js                    # จัดการ Game State, Drag & Drop และ Recursive AI Solver
├── styles/
│   └── TowerOfHanoi.css                   # สไตล์ Dark Theme, เสา และจานแอนิเมชัน
└── README.md                              # เอกสารประจำโมดูล
```

---

## 💡 สิ่งที่ได้เรียนรู้จากโมดูลนี้
- การทำความเข้าใจพฤติกรรมของ Call Stack และฟังก์ชันเรียกซ้ำ (Recursion)
- การสร้าง Interactive Drag-and-drop และ Animation โดยใช้ Vanilla JavaScript
- การแก้ปัญหาต่อจากสถานะปัจจุบัน (Arbitrary State Solver)
