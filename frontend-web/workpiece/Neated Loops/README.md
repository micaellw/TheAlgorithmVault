# ✨ Visual Pattern Studio (Nested Loops Visualizer)

> **โมดูลในโปรเจกต์:** [The Algorithm Vault](../../README.md)

ระบบจำลองการทำงานของ **Nested Loops (ลูปซ้อนลูป)** เพื่อสร้างรูปทรงเรขาคณิตและลวดลายต่าง ๆ บน Grid 2 มิติ พัฒนาขึ้นเพื่อฝึกฝนการคิดเชิงตรรกะแบบบูลีน (Boolean Logic) และทำความเข้าใจพิกัดแถว-คอลัมน์ $(i, j)$ ผ่านแอนิเมชันทีละเซลล์

---

## 🎯 ฟีเจอร์หลัก (Features)

### 1. ลวดลายที่รองรับ (Supported Patterns)
- **สี่เหลี่ยม:** Square, Hollow Square
- **สามเหลี่ยมและปิรามิด:** Right Triangle, Pyramid, Inverted Pyramid
- **ทรงเพชร:** Diamond, Hollow Diamond (ใช้สูตร Manhattan Distance $|i - mid| + |j - mid| \le mid$)
- **ลวดลายอื่น ๆ:** Checkerboard (ตารางหมากรุก), X-Cross, Plus, Sandglass (นาฬิกาทรายทึบ/โปร่ง)

### 2. Step-by-Step Logic Trace
- แสดงค่าดัชนีรอบนอก ($i$) และรอบใน ($j$) แบบ Real-time
- ไฮไลต์เซลล์ที่กำลังถูกประเมิน และแสดงสูตรเงื่อนไขบูลีนที่ใช้ตัดสินใจว่าจะระบายสีหรือไม่

### 3. Interactive Controls
- ปรับขนาดของ Grid ได้อย่างยืดหยุ่น
- มีทั้งโหมดวาดอัตโนมัติ (Auto Run) และโหมดกดทีละขั้น (Step by Step) พร้อมปรับความเร็วได้

---

## ⏱️ ความซับซ้อนของการทำงาน (Complexity)

| มิติ | ค่า Complexity | คำอธิบาย |
| :--- | :---: | :--- |
| **Time Complexity** | $O(n^2)$ | ลูปแถว $n$ รอบ ซ้อนด้วยลูปคอลัมน์ $n$ รอบ มีการประเมินเงื่อนไขทั้งหมด $n \times n$ ครั้ง |
| **Space Complexity** | $O(n^2)$ | สำหรับจัดเก็บสถานะเซลล์ของ Grid และ Step Array |

---

## 📁 โครงสร้างไฟล์ (File Structure)

```text
Neated Loops/
├── Pattern_Studio.html                    # หน้าเว็บหลักของโมดูล
├── scripts/
│   └── AlgorithmPattern.js                # ตรรกะเงื่อนไขรูปทรงเรขาคณิต และการคุม Animation Grid
├── styles/
│   └── PatternStyle.css                   # สไตล์ Dark Theme และการจัดวางตาราง Grid
└── README.md                              # เอกสารประจำโมดูล
```

---

## 💡 สิ่งที่ได้เรียนรู้จากโมดูลนี้
- การแปลงเงื่อนไขทางเรขาคณิตเป็นสมการทางคณิตศาสตร์และตรรกะบูลีน
- การประยุกต์ใช้ Manhattan Distance สำหรับคำนวณรูปร่างเพชรบน Discrete Grid
- การสร้าง State Machine จำลองการเดินของลูป 2 มิติ