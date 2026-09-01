The Algorithm Vault – Pathfinding Visualizer

    Dijkstra vs A* (Interactive Algorithm Lab)

    ภาพรวมโปรเจค :
        Pathfinding Visualizer เป็นระบบจำลองและเปรียบเทียบอัลกอริทึม:
        Dijkstra’s Algorithm
        A* (A-Star Search)
        บนกราฟแบบ Grid 2 มิติ (8-direction movement)
        พร้อมแสดงผลแบบ Animation และมีระบบเก็บสถิติการรัน

    วัตถุประสงค์ :
        โปรเจคนี้พัฒนาเพื่อ:
        ศึกษา Single Source Shortest Path (SSSP)
        วิเคราะห์ Time Complexity เชิงทฤษฎี
        เปรียบเทียบ Worst-case vs Average-case
        วิเคราะห์ Effective Branching Factor
        ทดสอบ Heuristic Quality ของ A*

    แนวคิดเชิงอัลกอริทึม :
        Dijkstra
        ใช้ priority queue (MinHeap)
        เลือกโหนดที่มี g(n) ต่ำสุดเสมอ
        ไม่มี heuristic guidance
        Time Complexity:
        O((V + E) log V)
        A* Search

    ใช้สูตร:
        f(n) = g(n) + h(n)
        โดย h(n) ใช้ Octile Distance (เหมาะกับ 8-connected grid)

    คุณสมบัติ:
        Admissible
        Consistent
        คง Optimality
        Worst-case complexity เท่ากับ Dijkstra
        แต่ลด node expansion ใน average-case ได้มาก
        ผลการทดลอง (เชิงประจักษ์)

    จากการรันหลายรอบ:
        Dijkstra ขยาย ~80% ของกริด
        A* ขยาย ~25–35%
        Efficiency Gain สูงสุด ~60–70%

        ระบบคำนวณ % ความฉลาดของ A* อัตโนมัติจาก:
            ((Dijkstra - A*) / Dijkstra) * 100

    โครงสร้างระบบ :
        Architecture Overview
        UI Layer
          ↓
        GridController
          ↓
        Algorithm Engine
          ↓
        MinHeap (Priority Queue)

    โครงสร้างไฟล์หลัก :
        Layout_Pathfinding_Visualizer.html
        GridController.js
        MazeGenerator.js
        DijkstraEngine2.js
        AStarEngine.js
        MinHeap.js

    จุดเด่นทางวิศวกรรม :
        เขียน MinHeap เอง (Binary Heap)
        push() → O(log V)
        pop() → O(log V)
        รองรับ 8-direction movement
        พร้อมป้องกัน corner clipping
        ใช้ Octile Heuristic
        เหมาะกับ grid 8 ทิศทางมากกว่า Manhattan
        มีระบบ History + Dashboard
        เก็บข้อมูลใน localStorage
        แสดง Chart เปรียบเทียบด้วย Chart.js
        วิเคราะห์ Average Efficiency
        แยก Engine ออกจาก UI ชัดเจน
        Logic ไม่ผูกกับ DOM
        Time & Space Complexity

        สำหรับ Grid ขนาด N × N:
            |V| = N²
            |E| ≈ 8N²

        Time Complexity:
            O((V + E) log V) ≈ O(N² log N)

        Space Complexity:
            O(V)


    เทคโนโลยีที่ใช้ :
        JavaScript (ES6 Modules)
        HTML5 / CSS3
        Chart.js
        LocalStorage API

    สิ่งที่ได้เรียนรู้ :
        Priority Queue Implementation
        Heuristic Design
        Effective Branching Factor
        Animation State Control
        Recursive Maze Generation
        Separation of Concerns

    ผู้พัฒนา :
        นักศึกษาสาขาวิศวกรรมคอมพิวเตอร์และการสื่อสาร    