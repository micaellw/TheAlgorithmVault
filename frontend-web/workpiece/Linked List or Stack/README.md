# 🔗 Data Structure Lab (Linked List & Stack)

> **โมดูลในโปรเจกต์:** [The Algorithm Vault](../../README.md)

ระบบจำลองและสาธิตการทำงานของโครงสร้างข้อมูลพื้นฐาน 2 ชนิด ได้แก่ **Singly Linked List** (โครงสร้างแบบพลวัต/Dynamic) และ **Stack** (โครงสร้างแบบ Last-In, First-Out) เพื่อช่วยให้เห็นภาพการจัดการหน่วยความจำ การเปลี่ยนจุดเชื่อมโยง (Pointers) และการเข้าออกของข้อมูล

---

## 🎯 ฟีเจอร์หลัก (Features)

### 1. Singly Linked List Lab
- **Insert Head (Add First):** เพิ่มโหนดใหม่ที่ตำแหน่งหน้าสุด พร้อมอัปเดต Pointer ชี้ไปยังโหนดถัดไป
- **Delete by Value:** ค้นหาโหนดตามค่าที่ระบุ และจำลองการ Unlink โหนดออกจากสายเชื่อมโยง
- **Pointer Traversal:** แอนิเมชันท่องไปยังแต่ละโหนดทีละก้าวเพื่อค้นหาตำแหน่งเป้าหมาย
- แสดงผล `NULL` เพื่อบ่งบอกจุดสิ้นสุดของลิสต์

### 2. Stack Lab (Array-based LIFO)
- **Push:** เพิ่มข้อมูลลงบนจุดสูงสุดของ Stack พร้อมขยับ `Top` pointer ขึ้น
- **Pop:** นำข้อมูลตัวล่าสุดออกจากจุดสูงสุดของ Stack พร้อมลดตำแหน่ง `Top` pointer
- **Peek:** ดูค่าที่อยู่บนสุดของ Stack โดยไม่นำข้อมูลออก
- **Boundary Checks:** ตรวจสอบเงื่อนไขข้อผิดพลาด **Stack Overflow** (เต็มความจุ) และ **Stack Underflow** (ว่างเปล่า)

### 3. Step-Driven Animation Engine
- แปลงทุกคำสั่งของผู้ใช้เป็นชุดขั้นตอน (`Steps[]`) ก่อนเริ่มเล่นแอนิเมชัน เพื่อให้ผู้ใช้สามารถดูการทำงานทีละสเต็ปได้อย่างแม่นยำ

---

## ⏱️ ความซับซ้อนของการทำงาน (Complexity)

| โครงสร้าง | การดำเนินการ | Time Complexity | Space Complexity |
| :--- | :--- | :---: | :---: |
| **Linked List** | Insert Head | $O(1)$ | $O(1)$ |
| | Delete by Value | $O(n)$ | $O(1)$ |
| | Search / Traversal | $O(n)$ | $O(1)$ |
| | Total Memory | - | $O(n)$ |
| **Stack** | Push | $O(1)$ | $O(1)$ |
| | Pop | $O(1)$ | $O(1)$ |
| | Peek | $O(1)$ | $O(1)$ |
| | Total Memory | - | $O(N_{\max})$ |

---

## 📁 โครงสร้างไฟล์ (File Structure)

```text
Linked List or Stack/
├── Linked_List_AND_Stack.html             # หน้าเว็บหลักรวม 2 Lab
├── scripts/
│   ├── StyleUI.js                         # คลาสวาด Node และจัดการ Animation ของทั้ง Linked List และ Stack
│   └── swicth.js                          # จัดการการสลับแท็บ (Tab Switching) และการรับค่าจาก Input
├── styles/
│   └── Style_Linked_List_AND_Stack.css    # สไตล์แสดงผล Node, ลูกศร Pointer และ Stack Column
└── README.md                              # เอกสารประจำโมดูล
```

---

## 💡 สิ่งที่ได้เรียนรู้จากโมดูลนี้
- ความแตกต่างระหว่างการจัดเก็บข้อมูลแบบ Pointer-based (Linked List) กับ Index-based (Stack Array)
- การสร้าง Step Engine เพื่อควบคุมสถานะของแอนิเมชันบน DOM อย่างเป็นลำดับ
- การจัดการข้อผิดพลาดและ Boundary Conditions ในโครงสร้างข้อมูล