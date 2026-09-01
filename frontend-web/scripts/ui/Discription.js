export class Discriptions {

    Pathfinding_Visualizer() {
        return `
        <h2 style="color:var(--neon-blue); margin-bottom:15px; font-size:1.4rem;">📘 Pathfinding Visualizer — วิธีการเล่น</h2>
        <div style="display:flex; flex-direction:column; gap:14px; font-size:0.95rem; line-height:1.6;">
            <div>
                <strong>1️⃣ กำหนดตำแหน่ง:</strong> กดปุ่ม <em>“กำหนด start , stop”</em> แล้วคลิกบนตารางเพื่อวางจุดเริ่มต้น (<span style="color:var(--neon-green); font-weight:bold;">🟢 Start</span>) และจุดปลายทาง (<span style="color:var(--neon-red); font-weight:bold;">🔴 End</span>)
            </div>
            <div>
                <strong>2️⃣ สร้างสิ่งกีดขวาง:</strong> คลิกหรือลากเมาส์บนช่องว่างเพื่อสร้างกำแพง (Wall) หรือกด <em>Random Maze</em> เพื่อสุ่มเขาวงกต
            </div>
            <div>
                <strong>3️⃣ เลือกอัลกอริทึม:</strong>
                <ul style="margin:6px 0 0 20px; padding:0;">
                    <li><strong>Dijkstra:</strong> สำรวจรอบทิศทางแบบ Breadth Expansion รับประกันเส้นทางสั้นที่สุด</li>
                    <li><strong>A* (A-Star):</strong> ใช้ Heuristic นำทาง มุ่งตรงสู่เป้าหมายและสำรวจช่องน้อยกว่า</li>
                </ul>
            </div>
            <div>
                <strong>4️⃣ เริ่มการทำงาน:</strong> กด <strong>Start</strong> เพื่อดู Animation การสำรวจช่อง (<span style="color:var(--neon-blue);">🔵 Visited</span>) และเส้นทางที่ดีที่สุด (<span style="color:var(--neon-yellow);">🟡 Shortest Path</span>) พร้อมเปรียบเทียบสถิติ
            </div>
        </div>`;
    }

    TowerOfHanoi() {
        return `
        <h2 style="color:var(--neon-purple); margin-bottom:15px; font-size:1.4rem;">🏯 Tower of Hanoi — วิธีการเล่น</h2>
        <div style="display:flex; flex-direction:column; gap:14px; font-size:0.95rem; line-height:1.6;">
            <div>
                <strong>1️⃣ ตั้งค่าจำนวนจาน:</strong> กำหนดจำนวน Disk (1 – 7 ชั้น) ที่ช่องตัวเลขด้านบน
            </div>
            <div>
                <strong>2️⃣ กติกาหลัก:</strong> ย้ายจานทั้งหมดจากเสาซ้ายไปเสาขวา โดย <em>ห้ามวางจานใหญ่ทับจานเล็ก</em> และย้ายได้ครั้งละ 1 จาน
            </div>
            <div>
                <strong>3️⃣ โหมดการเล่น:</strong>
                <ul style="margin:6px 0 0 20px; padding:0;">
                    <li><strong>Manual Mode:</strong> ลากจาน (Drag & Drop) ข้ามเสาด้วยตนเอง</li>
                    <li><strong>AI Solve Mode:</strong> กด <em>Start Solve</em> ให้ AI แก้ปัญหาแบบ Recursive อัตโนมัติ หรือกด <em>Next Step</em> เพื่อดูทีละก้าว</li>
                </ul>
            </div>
            <div>
                <strong>4️⃣ เป้าหมาย:</strong> ย้ายให้สำเร็จด้วยจำนวน Move ที่น้อยที่สุดตามสูตรคณิตศาสตร์ <code>2ⁿ - 1</code>
            </div>
        </div>`;
    }

    Pattern_Studio() {
        return `
        <h2 style="color:var(--neon-yellow); margin-bottom:15px; font-size:1.4rem;">✨ Visual Pattern Studio — วิธีการเล่น</h2>
        <div style="display:flex; flex-direction:column; gap:14px; font-size:0.95rem; line-height:1.6;">
            <div>
                <strong>1️⃣ เลือกรูปแบบและขนาด:</strong> เลือก Pattern ที่ต้องการจากเมนู Dropdown และกำหนดขนาด Grid ($N \\times N$)
            </div>
            <div>
                <strong>2️⃣ โหมดการทำงาน:</strong>
                <ul style="margin:6px 0 0 20px; padding:0;">
                    <li><strong>Start Draw:</strong> วาดลวดลายทั้งหมดบนตาราง $N^2$ ช่องทันที</li>
                    <li><strong>Start Solve:</strong> จำลองการวน Nested Loop ($i, j$) ทีละช่อง พร้อมควบคุมความเร็วด้วย Delay</li>
                </ul>
            </div>
            <div>
                <strong>3️⃣ ตัวแปรและเงื่อนไข:</strong> สังเกตค่าลูปนอก ($i$) และลูปใน ($j$) พร้อมเงื่อนไข Boolean ในแถบ Dashboard ด้านขวา
            </div>
        </div>`;
    }

    LinkedListAndStack() {
        return `
        <h2 style="color:var(--neon-green); margin-bottom:15px; font-size:1.4rem;">🔗 Data Structure Lab — วิธีการเล่น</h2>
        <div style="display:flex; flex-direction:column; gap:14px; font-size:0.95rem; line-height:1.6;">
            <div>
                <strong>1️⃣ สลับโครงสร้าง:</strong> ใช้ปุ่มสลับด้านบนเพื่อเลือกระหว่าง <strong>Linked List</strong> (Dynamic Allocation) และ <strong>Stack</strong> (Static / LIFO)
            </div>
            <div>
                <strong>2️⃣ Linked List:</strong> ใส่ค่าในช่อง Input แล้วกด <em>Add First</em> (แทรกโหนดหน้า) หรือ <em>Delete</em> (ลบโหนด) เพื่อดูลำดับ Pointer ชี้ไปยังโหนดถัดไป
            </div>
            <div>
                <strong>3️⃣ Stack:</strong> ใส่ค่าแล้วกด <em>Push</em> (เพิ่มข้อมูลเข้ายอด) หรือ <em>Pop</em> (ดึงข้อมูลออกจากยอดตามหลัก Last-In First-Out)
            </div>
            <div>
                <strong>4️⃣ การเปรียบเทียบ:</strong> สังเกตความแตกต่างของการจัดการ Memory ระหว่าง Pointer Chasing กับ Contiguous Array
            </div>
        </div>`;
    }

    InfixToPostfix() {
        return `
        <h2 style="color:var(--neon-blue); margin-bottom:15px; font-size:1.4rem;">🧮 Math Expression Engine — วิธีการเล่น</h2>
        <div style="display:flex; flex-direction:column; gap:14px; font-size:0.95rem; line-height:1.6;">
            <div>
                <strong>1️⃣ ป้อนนิพจน์:</strong> พิมพ์นิพจน์คณิตศาสตร์แบบ Infix ในช่อง Input (เช่น <code>(A+B)*C</code> หรือ <code>3+5*2</code>)
            </div>
            <div>
                <strong>2️⃣ เลือกการประมวลผล:</strong>
                <ul style="margin:6px 0 0 20px; padding:0;">
                    <li><strong>Convert Only:</strong> แปลง Infix เป็น Postfix โดยใช้ Shunting-Yard Algorithm และ Operator Stack</li>
                    <li><strong>Full Process:</strong> แปลงนิพจน์และคำนวณผลลัพธ์ตัวเลขออกมาทันที</li>
                </ul>
            </div>
            <div>
                <strong>3️⃣ โหมด Step by Step:</strong> กด <strong>Next Step</strong> เพื่อสังเกตการ Push/Pop ของแต่ละ Token ลงใน Stack อย่างละเอียด
            </div>
        </div>`;
    }

    SecurityUtilityLab() {
        return `
        <h2 style="color:var(--neon-purple); margin-bottom:15px; font-size:1.4rem;">🔐 Security & Utility Tools — วิธีการเล่น</h2>
        <div style="display:flex; flex-direction:column; gap:14px; font-size:0.95rem; line-height:1.6;">
            <div>
                <strong>1️⃣ Caesar Cipher:</strong>
                <ul style="margin:6px 0 0 20px; padding:0;">
                    <li>พิมพ์ข้อความที่ต้องการ และกำหนดค่า Shift Key (1–25)</li>
                    <li>กด <strong>Encrypt</strong> เพื่อเลื่อนตำแหน่งตัวอักษรเข้ารหัส หรือกด <strong>Decrypt</strong> เพื่อถอดรหัส</li>
                </ul>
            </div>
            <div>
                <strong>2️⃣ Anagram Checker:</strong>
                <ul style="margin:6px 0 0 20px; padding:0;">
                    <li>พิมพ์คำหรือข้อความ 2 ชุดลงในช่อง Input</li>
                    <li>กด <strong>Check Anagram</strong> เพื่อตรวจสอบว่าทั้งสองคำประกอบด้วยชุดตัวอักษรเดียวกันหรือไม่ ($O(N)$)</li>
                </ul>
            </div>
            <div>
                <strong>3️⃣ History Log:</strong> ติดตามประวัติการแปลงข้อมูลและผลลัพธ์ทั้งหมดได้ที่แผง History ด้านซ้าย
            </div>
        </div>`;
    }

}