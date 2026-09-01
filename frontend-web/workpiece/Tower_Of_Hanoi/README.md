Tower of Hanoi – Interactive Algorithm Lab

    (ส่วนหนึ่งของโปรเจค The Algorithm Vault)

    ภาพรวมโปรเจค :
        โปรเจคนี้เป็น Web Interactive Lab สำหรับเรียนรู้และทดลองอัลกอริทึม Tower of Hanoi

    ผู้ใช้สามารถ:
        ลากจานเองเพื่อแก้โจทย์
        ให้ AI แก้โจทย์แบบอัตโนมัติ
        ดูจำนวนครั้งที่ย้ายจริง vs ค่าที่ดีที่สุด
        ดู Recursive Monitor แบบเรียลไทม์
        เรียนรู้ทฤษฎี Big-O และ Recursion

    จุดประสงค์คือทำให้ “อัลกอริทึมที่เป็นทฤษฎี” กลายเป็นสิ่งที่มองเห็นและทดลองได้จริง

    ความสามารถหลักของระบบ :
        Interactive Drag & Drop
        ผู้ใช้สามารถลากจานระหว่างเสาได้
        ระบบตรวจสอบกฎ (ห้ามวางจานใหญ่บนจานเล็ก)
        แสดงข้อความแจ้งเตือนเมื่อผิดกฎ
        AI Recursive Solver
        ระบบมี AI ที่ใช้ Recursive Algorithm ในการแก้ปัญหา

        สูตรจำนวนครั้งขั้นต่ำ:
            T(n) = 2ⁿ − 1
            ตัวอย่าง:
                3 จาน → 7 moves
                4 จาน → 15 moves
                5 จาน → 31 moves

        Recursive Monitor :
            แสดงสถานะการทำงานของ AI
            แสดงลำดับการย้ายจาน    
            แสดง Log แบบ Timestamp

    วิเคราะห์เชิงทฤษฎี :
        มีหน้าอธิบายเชิงลึกเกี่ยวกับ:
        Recurrence Relation
        Mathematical Induction
        Time Complexity → Θ(2ⁿ)
        Space Complexity → O(n)
        State Space Analysis → 3ⁿ


    โปรเจคนี้สะท้อนทักษะดังนี้ :
        เข้าใจ Recursion
        เข้าใจ Time / Space Complexity
        เข้าใจ Call Stack Behavior
        ออกแบบโครงสร้างคลาส (OOP JavaScript)
        แยกหน้าที่การทำงานของระบบ (Separation of Concern)
        เขียน Algorithm Engine แยกจาก UI

    โครงสร้างหลักแบ่งเป็น :
        OperationHanoi → Algorithm Logic
        Monitor → UI Controller
        Recursive Engine → AI Solve System

    เทคโนโลยีที่ใช้ :
        HTML5
        CSS3 (Custom Layout + Grid)
        Vanilla JavaScript (ES6)
        OOP Design Pattern
        Recursive Algorithm Implementation
        ไม่มีการใช้ Framework สำเร็จรูป
        เน้นเขียน Logic เองทั้งหมด

    Complexity Summary :
        Metric	            :        Growth
        Time Complexity	    :        Θ(2ⁿ)
        Space Complexity    :        O(n)
        State Space	        :        ≤ 3ⁿ

    จุดเด่นเชิงวิศวกรรม :
        แก้ได้จาก Arbitrary State (ไม่จำเป็นต้องเริ่มต้นจากต้นเกม)
        AI สามารถทำงานต่อจากสถานะปัจจุบัน
        แสดงผลแบบ Visual + Theoretical Analysis
        โค้ดแยก Algorithm ออกจาก Presentation Layer

    วัตถุประสงค์การเรียนรู้ :
        โปรเจคนี้สร้างขึ้นเพื่อ :
            เข้าใจ Recursion แบบเชิงลึก
            เข้าใจ Exponential Growth
            เชื่อมโยงทฤษฎีกับการ Implement จริง
            ฝึกออกแบบโครงสร้าง Algorithm

    ผู้พัฒนา :
        นักศึกษาสาขาวิศวกรรมคอมพิวเตอร์และการสื่อสาร
