Math Engine Lab – Infix to Postfix & Calculator :

    ส่วนหนึ่งของโปรเจค: The Algorithm Vault

    ภาพรวมโปรเจค :
        Math Engine Lab เป็นระบบทดลองด้านอัลกอริทึมที่ใช้ Stack ในการ:
        แปลงนิพจน์คณิตศาสตร์จาก Infix → Postfix
        คำนวณผลลัพธ์จาก Postfix
        แสดงขั้นตอนการทำงานแบบ Step-by-Step
        แสดงภาพ Stack แบบ Visual
        บันทึกประวัติการคำนวณ

    ตัวอย่างที่รองรับ :
        (10+2)*5
        3+4*2/(1-5)^2
        A+B*C

    จุดประสงค์ของโปรเจค :
        โปรเจคนี้พัฒนาเพื่อฝึก :
            การออกแบบ Algorithm
            การใช้ Stack จัดการ Operator Precedence
            การจัดการ Edge Case (วงเล็บ, เครื่องหมายซ้อน, Unary minus)
            การวิเคราะห์ Time Complexity
            การออกแบบระบบแบบ Step Simulation

    ฟังก์ชันหลัก :
        Infix → Postfix Conversion
        ใช้แนวคิดของ Shunting Yard Algorithm

        ระบบจะ:
            อ่าน token ทีละตัว
            ใช้ Operator Stack ควบคุมลำดับความสำคัญ
            สร้าง Postfix Expression
            Time Complexity: O(n)
            Space Complexity: O(n)
            Postfix Evaluation

        เมื่อเลือกโหมด Full Process :
            ใช้ Operand Stack
            เจอ operator → pop 2 ค่า → คำนวณ → push กลับ
            รองรับ + - * / % ^
            Time Complexity: O(n)
            Step-by-Step Simulation

        ระบบแสดง :
            Token ที่กำลังประมวลผล
            Operator Stack
            Operand Stack
            ลูกศรแสดง Push / Pop
            สถานะอธิบายการทำงานแต่ละขั้น
            ช่วยให้เข้าใจการทำงานของ Stack ชัดเจน
            Expression Validation

        ตรวจสอบ :
            วงเล็บเปิด/ปิดสมดุล
            เครื่องหมายซ้อนกัน
            Operand ไม่เพียงพอ
            รองรับ Unary minus
            รองรับ implicit multiplication เช่น 2(3+4)

    เทคโนโลยีที่ใช้ :
        HTML5
        CSS3 (Grid Layout + Animation)
        JavaScript (ES6 Module)
        localStorage สำหรับ History Log

    โครงสร้างไฟล์ :
        calculatorlogic.html
        calculatorscriptslogic.js
        UI_InPos.js
        calculatorstyles.css

        Logic แยกจาก UI อย่างชัดเจน
        ใช้ Class-based structure
        ใช้ Module import/export

    สิ่งที่ได้เรียนรู้ :
        การออกแบบ Stack Machine
        การจัดการ State ระหว่าง Step
        การออกแบบ Execution Trace
        การแยก Logic กับ UI
        การเขียนระบบที่รองรับหลายโหมด (Convert / Full Process)

    จุดเด่นของโปรเจคนี้ :
        ไม่ใช่แค่คำนวณ แต่ “อธิบายขั้นตอน”
        มี Visualization ของ Stack
        มีระบบ History
        รองรับ Edge Case หลายแบบ
        โครงสร้างโค้ดชัดเจน (ไม่เขียนทุกอย่างในไฟล์เดียว)

    เหมาะกับ :
        ใช้เป็นสื่อสอน Data Structure (Stack)
        ใช้เป็นตัวอย่าง Algorithm Visualization
        ใช้เป็นพื้นฐาน Interpreter / Compiler ในอนาคต

    ผู้พัฒนา :
        นักศึกษาสาขาวิศวกรรมคอมพิวเตอร์และการสื่อสาร