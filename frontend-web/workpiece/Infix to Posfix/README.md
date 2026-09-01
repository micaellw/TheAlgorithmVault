# 🧮 Math Expression Engine (Infix to Postfix & Calculator)

> **โมดูลในโปรเจกต์:** [The Algorithm Vault](../../README.md)

ระบบจำลองการแปลงนิพจน์คณิตศาสตร์และการประเมินผลลัพธ์ด้วยโครงสร้างข้อมูล **Stack** พัฒนาขึ้นเพื่อฝึกการนำ Stack ไปใช้งานจริงในรูปแบบ Stack Machine และทำความเข้าใจลำดับความสำคัญของตัวดำเนินการ (Operator Precedence)

---

## 🎯 ฟีเจอร์หลัก (Features)

### 1. Infix to Postfix Conversion
- ประยุกต์ใช้ **Shunting-Yard Algorithm** ของ Edsger Dijkstra
- ใช้ **Operator Stack** เพื่อจัดลำดับความสำคัญของตัวดำเนินการ:
  - วงเล็บ: `( )`
  - ลำดับสูงสุด: ยกกำลัง `^`
  - ลำดับกลาง: คูณ/หาร/มอดุโล `*`, `/`, `%`
  - ลำดับล่าง: บวก/ลบ `+`, `-`
- รองรับทั้งตัวแปร (เช่น `A+B*C`) และตัวเลข

### 2. Postfix Evaluation (การคำนวณผลลัพธ์)
- ใช้ **Operand Stack** ในการคำนวณ
- เมื่อพบตัวเลขจะทำการ `push` ลง Stack และเมื่อพบตัวดำเนินการจะทำการ `pop` ตัวเลข 2 ตัวมาคำนวณแล้ว `push` ผลลัพธ์กลับเข้าไป

### 3. Step-by-Step Interactive Simulation
- แสดงขั้นตอนการประมวลผล Token ทีละตัวแบบแอนิเมชัน
- แสดงสถานะของ Stack (Visual Stack) และคำอธิบายการกระทำ (Push / Pop) ในแต่ละขั้นตอน

### 4. Expression Validation
- ตรวจสอบความสมดุลของวงเล็บเปิด-ปิด
- ดักจับข้อผิดพลาด เช่น Operator ซ้อนกัน หรือ Operand ไม่เพียงพอ

---

## ⏱️ ความซับซ้อนของการทำงาน (Complexity)

| ขั้นตอน | Time Complexity | Space Complexity | คำอธิบาย |
| :--- | :---: | :---: | :--- |
| **Infix $\rightarrow$ Postfix** | $O(n)$ | $O(n)$ | อ่านโทเค็น $n$ ตัวรอบเดียว โดยแต่ละโทเค็นเข้า/ออก Stack สูงสุด 1 ครั้ง |
| **Postfix Evaluation** | $O(n)$ | $O(n)$ | ประมวลผลโทเค็นใน Postfix Expression ด้วย Stack |

---

## 📁 โครงสร้างไฟล์ (File Structure)

```text
Infix to Posfix/
├── calculatorlogic.html                   # หน้าเว็บหลักของโมดูล
├── scripts/
│   ├── calculatorscriptslogic.js          # Engine คำนวณ Infix to Postfix และประเมินผลลัพธ์
│   ├── UI_InPos.js                        # จัดการการแสดงผล UI, แอนิเมชัน Stack และ Step Controls
│   └── algorithm.js                       # ตรรกะและโครงสร้างข้อมูลเสริม
├── styles/
│   └── calculatorstyles.css               # สไตล์ Dark Theme และการจัดวาง Stack Layout
└── README.md                              # เอกสารประจำโมดูล
```

---

## 💡 สิ่งที่ได้เรียนรู้จากโมดูลนี้
- การประยุกต์ใช้ Stack เพื่อแปลงและประเมินค่านิพจน์คณิตศาสตร์
- การออกแบบระบบจำลองขั้นตอนการทำงาน (Step Trace Engine)
- การจัดการสถาปัตยกรรมโค้ดโดยแยก Logic การคำนวณออกจาก UI Rendering