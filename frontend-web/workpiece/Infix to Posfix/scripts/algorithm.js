import {saveToHistory , setLocked , render} from './UI_InPos.js'
export class calculate{

    constructor(){

        this.infixTokens = [];
        this.steps = [];
        this.currentIdx = -1;
        this.precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '%': 2, '(': 0, '^':3};

        this.lastOpStackCount = 0;
        this.lastNumStackCount = 0;

        this.historyLog = JSON.parse(localStorage.getItem('pathfinding_history')) || [];
    }

validateExpression(input, mode) {
    const trimmed = input.replace(/\s+/g, '');
    let balance = 0;
    for (let char of trimmed) {
        if (char === '(') balance++;
        if (char === ')') balance--;
        if (balance < 0) return { valid: false, msg: "❌ ผิดพลาด: วงเล็บปิดเกินมา" };
    }
    if (balance !== 0) return { valid: false, msg: "❌  ผิดพลาด: วงเล็บเปิด/ปิดไม่เท่ากัน" };
    if (/[\+\-\*\/%\^]{2,}/.test(trimmed)) return { valid: false, msg: "❌ ผิดพลาด: มีเครื่องหมายคณิตศาสตร์วางซ้อนกัน" };
    return { valid: true };
}

insertImplicitMultiplication(tokens) {
    const result = [];

    for (let i = 0; i < tokens.length; i++) {
        const current = tokens[i];
        const next = tokens[i + 1];
        result.push(current);
        if (!next) continue;

        if (
            (
                (!isNaN(current) || current === ')') &&
                (next === '(')
            ) ||
            (
                current === ')' &&
                (!isNaN(next))
            )
        ) {
            result.push('*');
        }
    }
    return result;
}

handleUnaryMinus(tokens) {
    const result = [];

    for (let i = 0; i < tokens.length; i++) {
        const current = tokens[i];
        const prev = tokens[i - 1];

        if (
            current === '-' &&
            (
                i === 0 ||
                ['+', '-', '*', '/', '%', '^', '('].includes(prev)
            )
        ) {
            if (tokens[i + 1] === '(') {
                result.push('0');
                result.push('-');
            } else {
                result.push('-' + tokens[i + 1]);
                i++; 
            }
        } else {
            result.push(current);
        }
    }

    return result;
}

isRightAssociative(op) {
    return op === '^';
}

startProcess(mode) {
    const input = document.getElementById('math-input-calculator').value.trim();
    if (!input) return alert("กรุณากรอกนิพจน์");

    const validation = this.validateExpression(input, mode);
    if (!validation.valid) {
        document.getElementById('algo-status-calculetor').innerText = validation.msg;
        document.getElementById('algo-status-calculetor').style.color = "var(--neon-red)";
        return;
    }
    document.getElementById('algo-status-calculetor').style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-main');

    setLocked(true);
    document.getElementById(mode + '-btn-calculator').classList.add('active-mode');

    let rawTokens = input.match(/\d+|[+*^/%()-]|[A-Za-z]/g) || [];
    rawTokens = this.handleUnaryMinus(rawTokens);
    this.infixTokens = this.insertImplicitMultiplication(rawTokens);
    
    this.steps = [];
    let opStack = [];
    let numStack = [];
    let postfixStr = "";
    let datainput = this.infixTokens.join("");
            
    this.infixTokens.forEach((char, i) => {
        if (!isNaN(char) || /[A-Za-z]/.test(char)) {
            postfixStr += char + " ";
            this.steps.push({ msg: `เจอ [${char}]: ส่งไปที่ Postfix`, activeInfixIdx: i, postfix: postfixStr, opStack: [...opStack] });
        } else if (char === '(') {
            opStack.push(char);
            this.steps.push({ msg: `เจอ '(': Push ลง Stack เพื่อรอปิดวงเล็บ`, activeInfixIdx: i, postfix: postfixStr, opStack: [...opStack]});
        } else if (char === ')') {
            this.steps.push({ msg: `เจอ ')': Pop เครื่องหมายทั้งหมดจนกว่าจะเจอ '('`, activeInfixIdx: i, postfix: postfixStr, opStack: [...opStack] });
            while (opStack.length > 0 && opStack[opStack.length - 1] !== '(') {
                postfixStr += opStack.pop() + " ";   
                this.steps.push({ msg: `ย้ายเครื่องหมายออกจาก Stack ไปยัง Postfix`, activeInfixIdx: i, postfix: postfixStr, opStack: [...opStack] });
            }
            opStack.pop(); 
            this.steps.push({ msg: `เจอ '(' แล้ว: ปิดวงเล็บสำเร็จ`, activeInfixIdx: i, postfix: postfixStr, opStack: [...opStack] });
        } else {
            this.steps.push({ msg: `เจอ Operator [${char}]: ตรวจสอบลำดับความสำคัญใน Stack`, activeInfixIdx: i, postfix: postfixStr, opStack: [...opStack] });
            while ( opStack.length > 0 && ( this.precedence[opStack[opStack.length - 1]] > this.precedence[char] || ( this.precedence[opStack[opStack.length - 1]] === this.precedence[char] && !this.isRightAssociative(char) ) ) ) {
                postfixStr += opStack.pop() + " ";
                this.steps.push({ msg: `ตัวเดิมสำคัญกว่า: ย้ายออกมาก่อน`, activeInfixIdx: i, postfix: postfixStr, opStack: [...opStack] });
            }
            opStack.push(char);
            this.steps.push({ msg: `Push [${char}] ลง Stack`, activeInfixIdx: i, postfix: postfixStr, opStack: [...opStack] });
        }
    });

    while (opStack.length > 0) {
        postfixStr += opStack.pop() + " ";
        this.steps.push({ msg: `ย้ายเครื่องหมายที่เหลือลง Postfix`, activeInfixIdx: this.infixTokens.length, postfix: postfixStr, opStack: [...opStack] });
    }

    let finalRes = "N/A";
    if (mode === 'full') {
        if (/[A-Za-z]/.test(input)) {
            this.steps.push({ msg: "❌ คำนวณไม่ได้", postfix: postfixStr, opStack: [], numStack: [], finalRes: "มีตัวแปร (A-Z) อยู่ในนิพจน์" });
            finalRes = "❌ คำนวณไม่ได้";
        } else {
            let pTokens = postfixStr.trim().split(/\s+/);
            let isError = false;
            this.steps.push({ msg: `--- เริ่มขั้นตอนการคำนวณ ---`, postfix: postfixStr, opStack: [], numStack: [] });
            
            pTokens.forEach((t, i) => {
                if (isError) return;
                if (!isNaN(t)) {
                    numStack.push(Number(t));
                    this.steps.push({ msg: `เจอตัวเลข [${t}]: Push ลง Operand Stack`, activePostIdx: i, postfix: postfixStr, numStack: [...numStack] });
                } else {
                    if (numStack.length < 2) {
                        this.steps.push({ msg: `❌ คำนวณไม่ได้: ข้อมูลไม่พอ`, activePostIdx: i, postfix: postfixStr, numStack: [...numStack], finalRes: "Error" });
                        isError = true;
                        finalRes = "Error (Insufficient Operands)";
                        return;
                    }
                    let b = numStack.pop();
                    let a = numStack.pop();
                    let res;
                    switch (t) {
                        case '+': res = a + b; break;
                        case '-': res = a - b; break;
                        case '*': res = a * b; break;
                        case '/': res = a / b; break;
                        case '%': res = a % b; break;
                        case '^': res = a ** b; break;
                    }
                    this.steps.push({ msg: `คำนวณ [${a} ${t} ${b}]`, activePostIdx: i, postfix: postfixStr, numStack: [...numStack] });
                    numStack.push(res);
                    this.steps.push({ msg: `ได้ผลลัพธ์ [${res}]: Push กลับลงไป`, activePostIdx: i, postfix: postfixStr, numStack: [...numStack] });
                }
            });

            if (!isError) {
                finalRes = numStack.length === 1 ? numStack[0] : "Incomplete";
                this.steps.push({ msg: `คำนวณเสร็จสมบูรณ์!`, postfix: postfixStr, numStack: [...numStack], finalRes: finalRes, activePostIdx: pTokens.length });
            }
        }
    }

    this.currentIdx = 0;
    document.getElementById('next-btn-calculator').disabled = false;
    this.applyStep();
    saveToHistory(mode, datainput, postfixStr, finalRes);
}

applyStep() {
    const step = this.steps[this.currentIdx];
    document.getElementById('algo-status-calculetor').innerText = `Step ${this.currentIdx + 1}: ${step.msg}`;
    render(step);
}
}
