# 🧭 Pathfinding Visualizer (Dijkstra vs A* Search)

> **โมดูลในโปรเจกต์:** [The Algorithm Vault](../../README.md)

ระบบจำลองและเปรียบเทียบอัลกอริทึมการค้นหาเส้นทางที่สั้นที่สุด (Shortest Path Finding) บน 2D Grid รองรับการเดิน 8 ทิศทาง พัฒนาขึ้นเพื่อศึกษาการทำงานของ **Dijkstra's Algorithm** เปรียบเทียบกับ **A* Search** ที่มีการใช้ Heuristic ช่วยนำทาง

---

## 🎯 ฟีเจอร์หลัก (Features)

### 1. การเปรียบเทียบอัลกอริทึม
- **Dijkstra’s Algorithm:** ค้นหาเส้นทางที่สั้นที่สุดโดยขยายโหนดที่มีต้นทุนจริง $g(n)$ ต่ำสุดเสมอ
- **A* Search Algorithm:** ใช้ฟังก์ชันประเมิน $f(n) = g(n) + h(n)$ โดยใช้ **Octile Distance** เป็น Heuristic เหมาะสมกับ Grid แบบ 8 ทิศทาง ช่วยลดจำนวนโหนดที่ต้องสำรวจลงอย่างมาก

### 2. Custom Min-Heap (Priority Queue)
- พัฒนาโครงสร้างข้อมูล **Binary Min-Heap** ด้วย JavaScript ขึ้นมาเอง เพื่อใช้ดึงโหนดที่มีค่าน้อยที่สุดได้อย่างมีประสิทธิภาพ ($O(\log V)$)

### 3. ระบบแผนที่และเขาวงกต (Grid & Maze)
- รองรับการคลิกลากเพื่อวางจุดเริ่มต้น, จุดสิ้นสุด, กำแพง หรือลบสิ่งกีดขวาง
- มีระบบสร้างเขาวงกตแบบสุ่ม (Random Maze Generator)
- รองรับการเคลื่อนที่ 8 ทิศทาง พร้อมระบบป้องกันการตัดมุมทะลุกำแพง (Corner Clipping Prevention)

### 4. Performance Dashboard
- แสดงผลการเปรียบเทียบจำนวนโหนดที่สำรวจ (Nodes Visited) และความยาวเส้นทาง (Path Length)
- คำนวณเปอร์เซ็นต์ความคุ้มค่า/ประหยัดโหนดที่ A* ทำได้ดีกว่า Dijkstra
- บันทึกประวัติและแสดงแผนภูมิเปรียบเทียบด้วย Chart.js

---

## ⏱️ ความซับซ้อนของการทำงาน (Complexity)

สำหรับ Grid ขนาด $N \times N$ โดยมีจำนวนจุดยอด $|V| = N^2$ และจำนวนเส้นเชื่อม $|E| \approx 8N^2$:

| อัลกอริทึม | Time Complexity | Space Complexity | หมายเหตุ |
| :--- | :---: | :---: | :--- |
| **Dijkstra** | $O((V + E) \log V)$ | $O(V)$ | ใช้ Min-Heap ในการจัดการ Priority Queue |
| **A* Search** | $O((V + E) \log V)$ (Worst) | $O(V)$ | Average-case ขยายโหนดน้อยกว่า Dijkstra อย่างเห็นได้ชัด (~50–70%) |

---

## 📁 โครงสร้างไฟล์ (File Structure)

```text
Pathfinding Visualizer/
├── Layout_Pathfinding_Visualizer.html     # หน้าเว็บหลักของโมดูล
├── scripts/
│   ├── Main.js                            # จุดเริ่มต้นและประสานงานระบบ UI
│   ├── GridController.js                  # จัดการเหตุการณ์บนตาราง Grid และการวาดกำแพง
│   ├── MazeGenerator.js                   # อัลกอริทึมสุ่มสร้างเขาวงกต
│   └── Scriptscalculate/                  # โฟลเดอร์ Engine การคำนวณ
│       ├── DijkstraEngine2.js             # Dijkstra Pathfinding Engine
│       ├── AStarEngine.js                 # A* Pathfinding Engine
│       └── MinHeap.js                     # โครงสร้างข้อมูล Binary Min-Heap
├── styles/
│   └── Style_Pathfinding_Visualizer.css   # สไตล์ตาราง Grid, Sidebar และ แอนิเมชันสำรวจโหนด
└── README.md                              # เอกสารประจำโมดูล
```

---

## 💡 สิ่งที่ได้เรียนรู้จากโมดูลนี้
- การสร้างและใช้งาน Binary Min-Heap เพื่อเพิ่มความเร็วในการค้นหาเส้นทาง
- ความแตกต่างระหว่าง Uninformed Search (Dijkstra) กับ Informed Search (A*)
- การออกแบบ Heuristic Function ที่เป็น Admissible และ Consistent
- การแยก Algorithm Engine ออกจาก DOM Layer เพื่อให้โค้ดทดสอบและขยายต่อได้ง่าย