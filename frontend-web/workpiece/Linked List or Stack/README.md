Linked List & Stack Visual Lab

    ส่วนหนึ่งของโปรเจค: The Algorithm Vault

    ภาพรวมโปรเจค :
        Linked List & Stack Visual Lab คือระบบจำลองการทำงานของโครงสร้างข้อมูล 2 ชนิด ได้แก่:
        Linked List (Dynamic Structure)
        Stack (LIFO – Last In First Out)
        โดยเน้นการแสดง “ขั้นตอนการทำงานจริง” ของอัลกอริทึมแบบ Step-by-Step พร้อม Visualization

    จุดประสงค์ของโปรเจค :
        โปรเจคนี้พัฒนาเพื่อ:
            ฝึกการออกแบบอัลกอริทึมเชิงโครงสร้าง
            เข้าใจ Memory Model (Dynamic vs Static)
            วิเคราะห์ Time & Space Complexity
            ออกแบบระบบ State-driven Animation
            จำลอง Execution Flow แบบทีละขั้น

    ส่วนที่ 1: Linked List Lab :
        ฟังก์ชันที่รองรับ :
            Add First (เพิ่ม Node ด้านหน้า)
            Delete Node by Value
            Step-by-step traversal
            Highlight Node ที่กำลังประมวลผล
            แสดง NULL termination

        สิ่งที่ระบบจำลอง :
            Pointer Traversal
            Head Update
            การตัดสายเชื่อม (unlink)
            การค้นหาแบบ O(n)

        Complexity :
            Operation	    Time Complexity
            Insert Head	        O(1)
            Delete by Value	    O(n)
            Search	            O(n)
            Space	            O(n)

    ส่วนที่ 2: Stack Lab :
        ฟังก์ชันที่รองรับ :
            Push
            Pop
            Step-by-step animation
            Overflow / Underflow detection
            แสดงตำแหน่ง Top

        สิ่งที่ระบบจำลอง :
            Stack Pointer (top)
            Array-based stack
            LIFO behavior
            Boundary checking

        Complexity :
            Operation	Time Complexity
            Push	        O(1)
            Pop	            O(1)
            Peek	        O(1)
            Space	        O(N_max)

        เทคโนโลยีที่ใช้ :
            HTML5
            CSS3 (Animation + Grid)
            JavaScript (ES6 Modules)
            Class-based UI Architecture
            State Machine Simulation

        แนวคิดการออกแบบระบบ :
            ระบบถูกออกแบบแบบ :
                User Action
                   ↓
                Generate Steps[]
                   ↓
                Render Step-by-Step
                   ↓
                Apply State

                ไม่มีการเปลี่ยน Data โดยตรง
                ทุกอย่างผ่าน “Steps Array” ก่อนเสมอ

            นี่คือแนวคิดเดียวกับ :
                Algorithm Simulation
                Debug Trace System
                Execution Modeling

    จุดเด่นเชิงวิศวกรรม :
        แยก Logic กับ UI ชัดเจน
        ใช้ Class แยก StackUI และ LinkedUI
        มี State Control ระหว่าง Animation
        รองรับ Lock Control ระหว่าง Step
        ตรวจสอบ Error Case (Overflow/Underflow)

    สิ่งที่ได้เรียนรู้จากโปรเจคนี้ :
        เข้าใจ Dynamic vs Static Memory Allocation
        เข้าใจ Pointer-based vs Index-based Structure
        เข้าใจ Cache Locality Impact (เชิงทฤษฎี)
        ออกแบบ Execution Step Engine
        คิดแบบ System Architecture ไม่ใช่แค่เขียนให้รันได้

    เหมาะกับ :
        ใช้เป็น Lab วิชา Data Structure
        ใช้สอน Linked List / Stack
        ใช้เป็นพื้นฐาน Visualization Algorithm
        ใช้เป็น Portfolio สาย Software Engineer

    ผู้พัฒนา :
        นักศึกษาวิศวกรรมคอมพิวเตอร์และการสื่อสาร