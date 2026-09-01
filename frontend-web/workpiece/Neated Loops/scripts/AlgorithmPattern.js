 class Generation {
    constructor(){

        this.steps = [];
        this.currentIdx = -1;
        this.size = 3;
        this.gridState = []; 
        this.prevActive = null;
    }
    
    render(step) {
        const gridView = document.getElementById('grid-view');
        document.getElementById('row-val').innerText = step.i;
        document.getElementById('col-val').innerText = step.j;

        if (this.currentIdx === 0) {
            gridView.innerHTML = '';
            gridView.style.gridTemplateColumns = `repeat(${this.size}, 40px)`;
            this.gridState = Array(this.size * this.size).fill(null);

            for (let i = 0; i < this.size * this.size; i++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                gridView.appendChild(cell);
            }
        }

        const currentCellIdx = (step.i * this.size) + step.j;
        this.gridState[currentCellIdx] = step.isStar ? 'star' : 'space';

        const cells = gridView.children;
            
        if (this.prevActive !== null) {
            cells[this.prevActive].classList.remove('active');
        }
            
        const currentCell = cells[currentCellIdx];
        currentCell.classList.add('active');
        this.prevActive = currentCellIdx;

        currentCell.classList.remove('star', 'space');

        if (step.isStar) {
            cells[currentCellIdx].classList.add('star');
            currentCell.textContent = '*';
        } else {
            cells[currentCellIdx].classList.add('space');
            currentCell.textContent = ' ';
        }
    }
    
    startGeneration() {
        const pattern = document.getElementById('pattern-select').value;
        this.size = parseInt(document.getElementById('grid-size').value);
            
        setLocked(true);
        this.steps = [];
        let logicDisplay = "";
            
    const evennum = ['square', 'hollowSquare' ,'checkerboard']    
            
    if(this.size > 9){
        alert('กรุณากรอกเลขเลขคี่ที่ไม่เกิน 9');
        usererror();
        return;                       
    }
    else if(this.size%2 !== 0 || evennum.includes(pattern)){

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                let isStar = false;
                let mid = Math.floor(this.size / 2);
                switch(pattern) {
                    case 'square': 
                        isStar = true; 
                        logicDisplay = "true";
                        break;
                    case 'hollowSquare': // สี่เหลี่ยมโปร่ง (เอาแค่ขอบ)
                        isStar = (i === 0 || i === this.size - 1 || j === 0 || j === this.size - 1);
                        logicDisplay = "i == 0 || i == size-1 || j == 0 || j == size-1";
                        break;
                    case 'triangle': //สามเหลี่ยมชิดซ้าย
                        isStar = (j <= i); 
                        logicDisplay = "j <= i";
                        break;
                    case 'rightTriangle': // สามเหลี่ยมชิดขวา
                        isStar = (j >= this.size - 1 - i);
                        logicDisplay = "j >= (size - 1) - i";
                        break;
                    case 'pyramid': // พีระมิด (แนะนำให้ใช้ size เป็นเลขคี่)
                        isStar = (j >= mid - i && j <= mid + i && i <= mid);
                        logicDisplay = "j >= mid-i && j <= mid+i && i <= mid";
                        break;
                    case 'diamond': //ข้าวหลามตัด
                        isStar = (Math.abs(i - mid) + Math.abs(j - mid) <= mid);
                        logicDisplay = "|i - mid| + |j - mid| <= mid";
                        break;
                    case 'hollowDiamond': // ข้าวหลามตัดแบบโปร่ง
                        isStar = (Math.abs(i - mid) + Math.abs(j - mid) === mid);
                        logicDisplay = "|i - mid| + |j - mid| === mid";
                        break;
                    case 'checkerboard': // ตารางหมากรุก
                        isStar = ((i + j) % 2 === 0);
                        logicDisplay = "(i + j) % 2 === 0";
                        break;
                    case 'cross': //กากบาท
                        isStar = (Math.abs(j - mid) === Math.abs(i - mid)); 
                        logicDisplay = "|j - mid| === |i - mid|";
                        break;
                    case 'plus': // เครื่องหมายบวก (ตัดกลาง)
                        isStar = (i === mid || j === mid);
                        logicDisplay = "i === mid || j === mid";
                        break;
                    case 'invPyramid': // พีระมิดกลับหัว
                        isStar = (j >= i && j <= (this.size - 1) - i);
                        logicDisplay = "j >= i && j <= (size-1)-i";
                        break;
                    case 'hollowInvPyramid': // พีระมิดกลับหัวแบบโปร่ง 
                        isStar = (i === 0 || j === i || j === (this.size - 1) - i) && (j >= i && j <= (this.size - 1) - i);
                        logicDisplay = "(i === 0 || j === i || j === (size-1)-i) && (j >= i && j <= (size - 1) - i)";
                        break;
                    case 'sandglass': // นาฬิกาทราย (ทึบ)
                        isStar = Math.abs(j - mid) <= Math.abs(i - mid);
                        logicDisplay = "|j - mid| <= |i - mid|";
                        break;

                    case 'hollowSandglass': // นาฬิกาทราย (โปร่ง)
                    isStar = (Math.abs(j - mid) === Math.abs(i - mid) || i === 0 || i === this.size - 1);
                    logicDisplay = "(|j - mid| === |i - mid|) || (i === 0) || (i === this.size - 1)";
                    break;                   
                    }
                    
                this.steps.push({
                    i: i, j: j, isStar: isStar,
                    msg: `ตรวจสอบแถว ${i} หลัก ${j}: ${isStar ? 'ตรงเงื่อนไข (พิมพ์ *)' : 'ไม่ตรงเงื่อนไข (เว้นว่าง)'}`,
                    logic: logicDisplay
                });
            }
        }
        this.currentIdx = 0;
        document.getElementById('next-btn').disabled = false;
        return applyStep();

    }
    else{
        alert('กรุณากรอกเลข คี่ เพื่อแพทเทิร์นที่สมบูรณ์')
    }   
    usererror()
}

}

const stat = new Generation(); 

document.getElementById('start-btn').addEventListener("click", () => stat.startGeneration())

async function Solve(){
    const Ds = parseInt(document.getElementById('solveDelay').value);

    stat.startGeneration();
    document.getElementById('next-btn').disabled = true;

    await delay(Ds);

    while (stat.currentIdx < stat.steps.length - 1) {
        stat.currentIdx++;
        applyStep();
        await delay(Ds);
    }
    setLocked(false);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function nextStep() {
    if (stat.currentIdx < stat.steps.length - 1) {
        stat.currentIdx++;
        applyStep();
    } else {
        document.getElementById('next-btn').disabled = true;
        document.getElementById('algo-status').innerText = "🏁 วาดแพทเทิร์นเสร็จสมบูรณ์!";
        setLocked(false);
    }
}

function applyStep() {
    const step = stat.steps[stat.currentIdx];
    document.getElementById('algo-status').innerText = `STEP ${stat.currentIdx + 1}: ${step.msg}`;
    document.getElementById('logic-text').innerText = step.logic;
    stat.render(step);
}

function setLocked(locked) {
    document.getElementById('start-btn').disabled = locked;
    document.getElementById('startsolve-btn').disabled = locked;
    document.getElementById('pattern-select').disabled = locked;
    document.getElementById('grid-size').disabled = locked;
    if(locked) document.getElementById('start-btn').classList.add('active-mode');
    else document.getElementById('start-btn').classList.remove('active-mode');
}

function resetStudio() {
    stat.steps = [];
    stat.currentIdx = -1;
    stat.gridState = [];
    document.getElementById('grid-view').innerHTML = '';
    document.getElementById('row-val').innerText = '?';
    document.getElementById('col-val').innerText = '?';
    document.getElementById('logic-text').innerText = '-';
    document.getElementById('algo-status').innerText = "รอรับข้อมูลจากผู้ใช้...";
    document.getElementById('next-btn').disabled = true;
    setLocked(false);
}

function usererror(){
    stat.steps = [];
    stat.currentIdx = -1;
    stat.gridState = [];
    document.getElementById('algo-status').innerText = "รอรับข้อมูลจากผู้ใช้...";
    document.getElementById('next-btn').disabled = true;
    setLocked(false);
}