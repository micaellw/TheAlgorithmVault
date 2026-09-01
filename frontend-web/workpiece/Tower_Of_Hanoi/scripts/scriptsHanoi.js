class OperationHanoi{
   constructor(){
    this.moveCount = 0;
    this.isSolving = false;
    this.totalDisks = 3;
    this.polesDisks = [[], [], []];
    this.colors = ['#58a6ff', '#3fb950', '#d29922', '#bc8cff', '#f85149', '#ff7b72', '#ffa657'];

    this.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
   }

    initTowers() {
        this.totalDisks = parseInt(document.getElementById('hanoi-disk-input').value);
        this.polesDisks.forEach(p => p.length = 0);
        for (let i = this.totalDisks; i > 0; i--) {
            this.polesDisks[0].push(i);
        }
        
        this.moveCount = 0;
        document.getElementById('current-moves').innerText = "0";
        document.getElementById('min-moves').innerText = Math.pow(2, this.totalDisks) - 1;
        ui.clearHanoiLog();
        this.renderTowers();
        ui.updateMonitor("New game started with " + this.totalDisks + " disks");
    }

    renderTowers() {
        this.polesDisks.forEach((disks, pIdx) => {
            const poleElem = document.getElementById(`pole-${pIdx}`);
            poleElem.querySelectorAll('.hanoi-disk').forEach(n => n.remove());

            disks.forEach((size, index) => {
                const disk = document.createElement('div');
                disk.className = 'hanoi-disk';
                disk.id = `disk-${size}`;
                disk.draggable = !this.isSolving && (index === disks.length - 1); // Only top disk is draggable
                disk.style.width = `${40 + (size * 25)}px`;
                disk.style.backgroundColor = this.colors[size - 1];
                disk.innerText = size;
                
                disk.ondragstart = (e) => {
                    e.dataTransfer.setData("diskSize", size);
                    e.dataTransfer.setData("fromPole", pIdx);
                };
                
                poleElem.appendChild(disk);
            });
        });
    }

    handleNextStep() {
    if (this.isSolving) return;
    if (this.polesDisks[2].length === this.totalDisks) return;

    const nextMove = value.getNextOptimalMove(this.totalDisks, 2);
    if (nextMove) {
        ui.executeMove(nextMove.from, nextMove.to, "AI Step");
    }
}

    getNextOptimalMove(n, target) {
        if (n === 0) return null;

        let currentPole = this.polesDisks.findIndex(p => p.includes(n));
        if (currentPole === target) {
            return value.getNextOptimalMove(n - 1, target);
        } else {
            const aux = 3 - currentPole - target;
        
            const subMove = value.getNextOptimalMove(n - 1, aux);
            if (subMove) return subMove;
            return { from: currentPole, to: target };
        }
    }

    async moveStack(n, target) {
        if (n === 0) return;

        let currentPole = -1;
        for (let i = 0; i < 3; i++) {
            if (this.polesDisks[i].includes(n)) {
                currentPole = i;
                break;
            }
        }

        if (currentPole === target) {

            await value.moveStack(n - 1, target);
        } else {

            const aux = 3 - currentPole - target;
            await value.moveStack(n - 1, aux);

            if (!this.isSolving) return; 

            ui.executeMove(currentPole, target, "AI");
            await this.sleep(600);

            await value.moveStack(n - 1, target);
        }
    }

    // --- AI Solve Logic (Arbitrary State) ---

    async startAutoSolve() {
        if (this.isSolving) return;

    this.isSolving = true;
    // ปิดปุ่มควบคุมระหว่างที่ AI กำลังรัน
    document.getElementById('hanoi-start-btn').disabled = true;
    document.getElementById('hanoi-disk-input').disabled = true;
    document.getElementById('hanoi-step-btn').disabled = true;

    ui.updateMonitor("AI กำลังวิเคราะห์เส้นทางที่ดีที่สุด...");

    await value.moveStack(this.totalDisks, 2);

    if (this.isSolving) {
        document.getElementById('hanoi-status-text').innerText = "🏁 AI แก้โจทย์สำเร็จแล้ว!";
        this.isSolving = false;
        document.getElementById('hanoi-start-btn').disabled = false;
        document.getElementById('hanoi-step-btn').disabled = false;
        document.getElementById('hanoi-disk-input').disabled = false;
        value.renderTowers();
    }
    }

}

class Monitor{ 
    allowDrop(e) {
        if (value.isSolving) return;
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    }
    handleLeave(e) {
        e.currentTarget.classList.remove('drag-over');
    }

    handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        
        const diskSize = parseInt(e.dataTransfer.getData("diskSize"));
        const fromPoleIdx = parseInt(e.dataTransfer.getData("fromPole"));
        const toPoleIdx = parseInt(e.currentTarget.id.replace('pole-', ''));

        if (ui.isValidMove(diskSize, toPoleIdx)) {
            ui.executeMove(fromPoleIdx, toPoleIdx, "User");
        } else {
            document.getElementById('hanoi-status-text').innerText = "❌ ผิดกฎ! ห้ามวางจานใหญ่ทับจานเล็ก";
        }
    }

    isValidMove(diskSize, toPoleIdx) {
        const targetPole = value.polesDisks[toPoleIdx];
        if (targetPole.length === 0) return true;
        return diskSize < targetPole[targetPole.length - 1];
    }

    executeMove(from, to, actor) {
        const disk = value.polesDisks[from].pop();
        value.polesDisks[to].push(disk);
        value.moveCount++;
        document.getElementById('current-moves').innerText = value.moveCount;
        
        const msg = `${actor} ย้ายจาน ${disk} จากเสา ${from} ➜ ${to}`;
        document.getElementById('hanoi-status-text').innerText = msg;
        ui.logHistory(msg);
        value.renderTowers();

        if (value.polesDisks[2].length === value.totalDisks) {
            document.getElementById('hanoi-status-text').innerText = "🏆 ชนะแล้ว! คุณทำสำเร็จใน " + value.moveCount + " ครั้ง";
        }
    }

    logHistory(msg) {
        const list = document.getElementById('hanoi-history-list');
        const li = document.createElement('li');
        li.innerHTML = `<small style="color:var(--neon-blue)">[${new Date().toLocaleTimeString()}]</small> ${msg}`;
        list.prepend(li);
    }

     clearHanoiLog() {
        document.getElementById('hanoi-history-list').innerHTML = "";
        document.getElementById('hanoi-logic-view').innerHTML = "<div>> Log cleared...</div>";
    }

    updateMonitor(msg) {
        const view = document.getElementById('hanoi-logic-view');
        view.innerHTML += `<div>> ${msg}</div>`;
        view.scrollTop = view.scrollHeight;
    }

    resetHanoi() {
        value.isSolving = false;
        document.getElementById('hanoi-start-btn').disabled = false;
        document.getElementById('hanoi-step-btn').disabled = false;
        document.getElementById('hanoi-disk-input').disabled = false;
        document.getElementById('hanoi-status-text').innerText = "ลากจานเพื่อเริ่มเล่น หรือกด Solve เพื่อให้ AI ช่วย...";
        value.initTowers();
    }
}

// สร้างตัวแปรไว้ที่ window เพื่อให้ HTML มองเห็น
window.value = new OperationHanoi();
window.ui = new Monitor();

// สร้างฟังก์ชัน Global สำหรับ Drag & Drop (เพราะ HTML เรียกใช้ตรงๆ)
window.allowDrop = (e) => ui.allowDrop(e);
window.handleLeave = (e) => ui.handleLeave(e);
window.handleDrop = (e) => ui.handleDrop(e);

value.initTowers();  

document.getElementById("hanoi-step-btn")
    .addEventListener("click", () => value.handleNextStep());

document.getElementById("hanoi-start-btn")
    .addEventListener("click", () => value.startAutoSolve());

document.getElementById("hanoi-clear-btn")
    .addEventListener("click", () => ui.clearHanoiLog());







    

    
