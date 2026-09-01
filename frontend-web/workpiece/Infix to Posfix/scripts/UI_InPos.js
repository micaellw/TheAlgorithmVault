import { calculate } from "./algorithm.js";

const calculator = new calculate();
 
const ClearHistory = document.getElementById('clear-history');
const ClearAllHistory = document.getElementById('clearall-history');

document.getElementById('full-btn-calculator').addEventListener('click', () => {
    calculator.startProcess('full')
})
document.getElementById('convert-btn-calculator').addEventListener('click', () => {
    calculator.startProcess('convert')
})
document.getElementById('next-btn-calculator').addEventListener('click', () => {
    nextStep()
})
document.getElementById('reset-btn-calculator').addEventListener('click', () => {
    resetLab()
})

renderHistory();

function showArrow(containerId, type, colorClass) {
    const container = document.getElementById(containerId).parentElement;
    const oldArrows = container.querySelectorAll('.stack-arrow');
    oldArrows.forEach(a => a.remove());

    const arrow = document.createElement('div');
    arrow.className = `stack-arrow ${type === 'push' ? 'push-arrow' : 'pop-arrow'} ${colorClass}`;
    arrow.innerHTML = type === 'push' ? '↓' : '↑';
    container.appendChild(arrow);
};

export function render(step) {
    const currentOpCount = (step.opStack || []).length;
    if (currentOpCount > calculator.lastOpStackCount) showArrow('op-stack-view', 'push', 'op-arrow-color');
    else if (currentOpCount < calculator.lastOpStackCount) showArrow('op-stack-view', 'pop', 'op-arrow-color');
    calculator.lastOpStackCount = currentOpCount;

    const currentNumCount = (step.numStack || []).length;
    if (currentNumCount > calculator.lastNumStackCount) showArrow('num-stack-view', 'push', 'num-arrow-color');
    else if (currentNumCount < calculator.lastNumStackCount) showArrow('num-stack-view', 'pop', 'num-arrow-color');
    calculator.lastNumStackCount = currentNumCount;

    document.getElementById('infix-view').innerHTML = calculator.infixTokens.map((t, i) => `
        <div class="token ${i === step.activeInfixIdx ? 'active' : ''} ${i < step.activeInfixIdx ? 'processed' : ''}">${t}</div>
    `).join('');

    const pTokens = step.postfix.trim().split(/\s+/).filter(t => t !== "");
    document.getElementById('postfix-view').innerHTML = pTokens.map((t, i) => `
        <div class="token ${i === step.activePostIdx ? 'active' : ''} ${(step.activePostIdx !== undefined && i < step.activePostIdx) ? 'processed' : ''}">${t}</div>
    `).join('');

    document.getElementById('op-stack-view').innerHTML = (step.opStack || []).map(op => `<div class="st-item op-color">${op}</div>`).join('');
    document.getElementById('num-stack-view').innerHTML = (step.numStack || []).map(n => `<div class="st-item num-color">${n}</div>`).join('');

    if (step.finalRes !== undefined) {
        document.getElementById('final-result-box').style.display = 'block';
        document.getElementById('result-view').innerText = step.finalRes;
    } else {
        document.getElementById('final-result-box').style.display = 'none';
    }
};

export function saveToHistory(mode, datainput, postfixStr, resultValue) {
    const record = {
        id: Date.now(),
        mode: mode === 'full' ? 'Full Process' : 'Convert Only', 
        datainput: datainput,                        
        postfixStr: postfixStr,                            
        numStack: resultValue, 
        time: new Date().toLocaleTimeString()              
    }
    calculator.historyLog.unshift(record); 
    if (calculator.historyLog.length > 3) calculator.historyLog.pop(); 
    localStorage.setItem('pathfinding_history', JSON.stringify(calculator.historyLog));
};

ClearHistory.addEventListener('click', () => {
    calculator.historyLog.pop();
    localStorage.setItem('pathfinding_history', JSON.stringify(calculator.historyLog));
    renderHistory();
});

ClearAllHistory.addEventListener('click', () => {
    calculator.historyLog = []; 
    localStorage.removeItem('pathfinding_history'); 
    renderHistory();
});

function renderHistory() {
    const historyList = document.getElementById('history-list');
    if(!historyList) return;
    historyList.innerHTML = calculator.historyLog.map(item => {
        let resultMsg = (item.mode === 'Full Process') ? `<br><p style="color: #eab308;"> ผลลัพธ์ที่ได้ : ${item.numStack}</p>` : `<br><p style="color:var(--neon-yellow)"> โหมดแปลง Postfix เท่านั้น (ไม่มีผลคำนวณ) เท่านั้น</p>`;
        return `
            <li class="history-item" style="border-bottom: 1px solid #333; padding: 10px 0;">
                <span style="color: #4ade80;">[${item.time}]</span> 
                <span style="font-weight: bold; color: var(--neon-blue);">${item.mode}</span><br><br>
                Infix: <span style="color: var(--neon-yellow);">${item.datainput}</span><br><br>
                Postfix: <span style="color: var(--neon-yellow);">${item.postfixStr}</span>
                ${resultMsg}
            </li>
        `;
    }).join('');
};

export function setLocked(locked) {
    document.getElementById('full-btn-calculator').disabled = locked;
    document.getElementById('convert-btn-calculator').disabled = locked;
    document.getElementById('math-input-calculator').disabled = locked;
    if(!locked) {
        document.getElementById('full-btn-calculator').classList.remove('active-mode');
        document.getElementById('convert-btn-calculator').classList.remove('active-mode');
    }
};

function nextStep() {
    if (calculator.currentIdx < calculator.steps.length - 1) {
        calculator.currentIdx++;
        calculator.applyStep();
    } else {
        document.getElementById('next-btn-calculator').disabled = true;
        const lastStep = calculator.steps[calculator.currentIdx];
        document.getElementById('algo-status-calculetor').innerText = "🏁 ภารกิจเสร็จสิ้น!";
        document.getElementById('math-input-calculator').value = ''; 
        setLocked(false);
        renderHistory(); 
    }
}


function resetLab() {
    calculator.lastOpStackCount = calculator.lastNumStackCount = 0;
    calculator.infixTokens = []; calculator.steps = []; calculator.currentIdx = -1;
    document.getElementById('infix-view').innerHTML = '';
    document.getElementById('postfix-view').innerHTML = '';
    document.getElementById('op-stack-view').innerHTML = '';
    document.getElementById('num-stack-view').innerHTML = '';
    document.getElementById('algo-status-calculetor').innerText = "ระบบถูกรีเซ็ตเรียบร้อย...";
    document.getElementById('algo-status-calculetor').style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-main');
    document.getElementById('final-result-box').style.display = 'none';
    document.getElementById('math-input-calculator').value = '';
    document.getElementById('next-btn-calculator').disabled = true; 
    setLocked(false); 
}