Visual Pattern Studio – Nested Loop Visualization

    ส่วนหนึ่งของโปรเจค: The Algorithm Vault

    ภาพรวมโปรเจค :
        Visual Pattern Studio เป็นระบบจำลองการทำงานของ Nested Loop (ลูปซ้อน)
        เพื่อสร้าง Pattern บน Grid 2 มิติ พร้อมแสดงขั้นตอนการทำงานแบบ Step-by-Step

    ผู้ใช้สามารถเลือก:
        ประเภท Pattern
        ขนาด Grid
        โหมดวาดทีละขั้น หรือวาดอัตโนมัติ

    จุดประสงค์ของโปรเจค :
        โปรเจคนี้พัฒนาเพื่อ :
            ฝึกการคิดเชิงตรรกะ (Boolean Logic)
            เข้าใจโครงสร้าง Nested Loop
            วิเคราะห์ Time Complexity O(n²)
            เข้าใจ Manhattan Distance
            ออกแบบ State Machine สำหรับ Animation

        แนวคิดหลัก :
            ทุก Pattern ถูกนิยามเป็นฟังก์ชันบูลีน:
            G(i, j) = F(i, j, n)
            โดย:
            i = แถว
            j = คอลัมน์
            n = ขนาดกริด
            Nested Loop ทำหน้าที่ evaluate F(i, j, n) สำหรับทุก cell

        Pattern ที่รองรับ :
            Square
            Hollow Square
            Triangle
            Right Triangle
            Pyramid
            Diamond
            Hollow Diamond
            Checkerboard
            X-Cross
            Plus
            Inverted Pyramid
            Sandglass (ทึบ / โปร่ง)

        โครงสร้างระบบ :
            ระบบทำงานตาม Flow นี้ :
            User Input
               ↓
            Generate Steps[]
               ↓
            Render Cell
               ↓
            Update State

            ทุก Cell จะถูกประเมินเงื่อนไขก่อนแสดงผล
            ไม่มีการ render แบบสุ่ม

        Time & Space Complexity :
            Time Complexity :
                T(n) = n²
                Outer loop = n
                Inner loop = n
                Total evaluation = n × n
                Worst-case = O(n²)

            Memory Complexity :
                ระบบใช้ :
                gridState → O(n²)
                steps[] → O(n²)
                รวม Memory = O(n²)

        ตัวอย่าง Logic :
            Diamond :
                |i - mid| + |j - mid| <= mid
                ใช้ Manhattan Distance แทน Euclidean
                เพราะคำนวณเร็วกว่าใน Grid แบบ Discrete

        โครงสร้างไฟล์ :
            Pattern_Studio.html
            AlgorithmPattern.js
            PatternStyle.css

            Logic แยกจาก UI
            ใช้ Class-based design
            ใช้ Steps Array ควบคุม Animation

        จุดเด่นเชิงวิศวกรรม :
            ใช้ Boolean Pattern Dictionary
            รองรับ Pattern ใหม่ได้ง่าย (เพิ่ม case)
            มี State Machine Animation
            แสดงค่า i, j แบบ Real-time
            แสดงเงื่อนไขที่กำลังถูก evaluate

        สิ่งที่ได้เรียนรู้ :
            Nested Loop Architecture
            Boolean Geometry Modeling
            Manhattan Distance Application
            Algorithm Visualization Design
            State Transition Modeling

        เหมาะกับ :
            วิชา Programming 1
            วิชา Algorithm
            การสอน Loop Logic
            ฝึกตรรกะเชิงคณิตศาสตร์
    
    ผู้พัฒนา :
        นักศึกษาวิศวกรรมคอมพิวเตอร์และการสื่อสาร
        
        สนใจด้าน:
            Algorithm Design
            Data Structure
            Logical System Modeling
            Software Engineering