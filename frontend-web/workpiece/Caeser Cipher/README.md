# 🔐 Caesar Cipher & Anagram Checker

> **โมดูลในโปรเจกต์:** [The Algorithm Vault](../../README.md)

เครื่องมือทดลองด้านการจัดการข้อความ (String Processing) และการคำนวณแบบคอนกรูเอนซ์ (Modular Arithmetic) พัฒนาขึ้นเพื่อฝึกการเขียนตรรกะแปลงตัวอักษร การจัดการ State และการบันทึกข้อมูลประวัติการทำงาน

---

## 🎯 ฟีเจอร์หลัก (Features)

### 1. Caesar Cipher (การเข้ารหัสซีซาร์)
- รองรับการเข้ารหัส (Encrypt) และถอดรหัส (Decrypt) ตัวอักษรภาษาอังกฤษ (A-Z, a-z)
- รองรับการเลื่อนตำแหน่ง (Shift Key) ทั้งค่าบวกและค่าลบ
- ใช้ **Modular Arithmetic** ในการหมุนเวียนตัวอักษร:
  $$\text{Encrypt}(x) = (x + k) \bmod 26$$
  $$\text{Decrypt}(x) = (x - k + 26) \bmod 26$$
- คงสภาพตัวอักษรพิมพ์เล็ก, พิมพ์ใหญ่ และอักขระพิเศษไว้ตามเดิม

### 2. Anagram Checker (ตรวจสอบคำสลับอักษร)
- ตรวจสอบว่าคำ 2 คำประกอบด้วยชุดตัวอักษรเดียวกันหรือไม่
- แปลงสตริงเป็นตัวพิมพ์เล็ก ตัดช่องว่าง และใช้การจัดเรียงตัวอักษร (String Sorting) เพื่อเปรียบเทียบ

### 3. History Log & Real-time Monitor
- บันทึกประวัติการแปลงข้อความและผลการตรวจสอบ 10 รายการล่าสุดผ่าน `localStorage`
- แสดงสถิติและผลลัพธ์การคำนวณแบบ Real-time

---

## ⏱️ ความซับซ้อนของการทำงาน (Complexity)

| ฟังก์ชัน | Time Complexity | Space Complexity | หมายเหตุ |
| :--- | :---: | :---: | :--- |
| **Caesar Cipher** | $O(n)$ | $O(n)$ | วนลูปประมวลผลทีละตัวอักษรตามความยาวข้อความ $n$ |
| **Anagram Checker** | $O(n \log n)$ | $O(n)$ | ใช้การ Sort ตัวอักษรก่อนเปรียบเทียบ |

---

## 📁 โครงสร้างไฟล์ (File Structure)

```text
Caeser Cipher/
├── CaesarCipher_And_AnagramChecker.html   # หน้าเว็บหลักของโมดูล
├── scripts/
│   └── scriptsCip.js                      # ตรรกะการเข้ารหัส, ถอดรหัส, ตรวจ Anagram และจัดการ DOM
├── styles/
│   └── CipStyle.css                       # สไตล์ Dark Theme และจัดเลย์เอาต์
└── README.md                              # เอกสารประจำโมดูล
```

---

## 💡 สิ่งที่ได้เรียนรู้จากโมดูลนี้
- การประยุกต์ใช้ Modular Arithmetic ป้องกันข้อผิดพลาด Boundary Index ของตัวอักษร
- การจัดการข้อมูลสตริงและการแปลง ASCII Character Codes ใน JavaScript
- การจัดเก็บและโหลดข้อมูลจาก Web Storage (`localStorage`)
