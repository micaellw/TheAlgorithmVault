import {StackUI , LinkedUI } from './swicth.js'

function switch_linkedlistAndstack(){

const select_List_AND_Stack = document.querySelectorAll('.Data-Structure-Lab') ;
const LinkedList_OR_Stack = document.querySelectorAll('.Data-Structure');

    if (LinkedList_OR_Stack[0]) LinkedList_OR_Stack[0].classList.add('active');
    if (select_List_AND_Stack[0]) select_List_AND_Stack[0].classList.add('selected');
    select_List_AND_Stack.forEach((btn,index) =>{
        
         btn.addEventListener('click', () => {
            LinkedList_OR_Stack.forEach(content => content.classList.remove('active'));
           
            if (LinkedList_OR_Stack[index]) {
            LinkedList_OR_Stack[index].classList.add('active');
            }
        select_List_AND_Stack.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        
        });


    });

}

function button(){
    document.getElementById('add-btn-Linked-List').addEventListener('click' ,() => {
        addFirst();
    });
    document.getElementById('del-btn-Linked-List').addEventListener('click' ,() => {
        startDelete();
    });
    document.getElementById('next-btn-Linked-List').addEventListener('click' ,() => {
        nextStep();
    });
    document.getElementById('reset-btn-Linked-List').addEventListener('click' ,() => {
        resetList();
    });


    document.getElementById('push-btn').addEventListener('click' ,() => {
        startPush();
    });
    document.getElementById('pop-btn').addEventListener('click' ,() => {
        startPop();
    });
    document.getElementById('stack-next-btn').addEventListener('click' ,() => {
        nextStackStep();
    });
    document.getElementById('stack-reset-btn').addEventListener('click' ,() => {
        resetStack();
    });
}



const S = new StackUI();
const L = new LinkedUI();

function startPush() {
    const inputEl = document.getElementById('stack-input');
    const val = parseInt(inputEl.value);
    
    if (isNaN(val)) return alert("กรุณากรอกตัวเลข");
    if (S.Data.length >= S.MAX_STACK_SIZE) return alert("Stack Overflow!");

    S.setStackLocked(true);
    S.Steps = [];
    S.Steps.push({ msg: `ตรวจสอบเงื่อนไข Overflow (Size: ${S.Data.length}/${S.MAX_STACK_SIZE})`, list: [...S.Data] });
    S.Steps.push({ msg: `เตรียมข้อมูล [${val}] วางบนตำแหน่ง Top ใหม่`, list: [...S.Data], highlight: -1 });
    
    let newList = [...S.Data, val];
    S.Steps.push({ msg: `Push [${val}] สำเร็จ! Pointer 'top' เลื่อนขึ้น`, list: newList, highlight: newList.length - 1 });

    S.startStackAnimation();
}

function startPop() {
    if (S.Data.length === 0) return alert("Stack Underflow!");

    S.setStackLocked(true);
    S.Steps = [];
    S.Steps.push({ msg: `ตรวจสอบข้อมูลบนสุด (Top) คือ [${S.Data[S.Data.length-1]}]`, target: S.Data.length - 1, list: [...S.Data] });
    
    let newList = [...S.Data];
    const removed = newList.pop();
    S.Steps.push({ msg: `ดึงข้อมูล [${removed}] ออกจากกอง stack`, target: -1, list: [...newList] });
    S.Steps.push({ msg: `Pop สำเร็จ! Pointer 'top' ลดระดับลง`, highlight: newList.length - 1, list: [...newList] });

    S.startStackAnimation();
}

function nextStackStep() {
    const nextBtn = document.getElementById('stack-next-btn');
    if (S.CurrentIdx < S.Steps.length - 1) {
        S.CurrentIdx++;
        S.applyStackStep()
    } else {
        S.Data = S.Steps[S.CurrentIdx].list;
        if (nextBtn) nextBtn.disabled = true;
        document.getElementById('stack-algo-status').innerText = "อัลกอริทึมทำงานเสร็จสิ้น";
        document.getElementById('stack-input').value = '';
        S.setStackLocked(false);
    }
}

function resetStack() {
    S.Data = S.setstart;
    S.renderStack();
    const status = document.getElementById('stack-algo-status');
    const nextBtn = document.getElementById('stack-next-btn');
    if (status) status.innerText = "รีเซ็ตข้อมูลแล้ว";
    if (nextBtn) nextBtn.disabled = true;
    S.setStackLocked(false);
}


/*
        -----------------------------------------------------------------------------------------
        ---------------------------------------LINKEDLIST----------------------------------------
        -----------------------------------------------------------------------------------------
*/
function addFirst() {
    const val = parseInt(document.getElementById('main-input').value);
    if (isNaN(val)) return alert("กรุณาใส่ตัวเลข");

    L.setControlsDisabled(true);
    L.Steps = [];
    L.Steps.push({ msg: `สร้างโหนดใหม่ค่า [${val}]`, newNode: { val: val, showArrow: false }, list: [...L.Data] });
    L.Steps.push({ msg: `เชื่อม Pointer ไปหา Head เดิม`, newNode: { val: val, showArrow: true }, list: [...L.Data] });
            
    let newList = [val, ...L.Data];
    L.Steps.push({ msg: `อัปเดต Head สำเร็จ!`, newNode: null, list: newList, highlight: 0 });

    L.startAnimation();
};

function startDelete() {
    if (L.Data.length === 0) return alert("ไม่มีข้อมูลให้ลบ");
    const target = parseInt(document.getElementById('main-input').value);
    if (isNaN(target)) return alert("กรุณาใส่ตัวเลข");

    L.setControlsDisabled(true);
    L.Steps = [];
    let tempNodes = [...L.Data];
    L.Steps.push({ msg: "เริ่มสำรวจจาก Head", highlight: 0, list: [...L.Data] });
    let found = false;

    for (let i = 0; i < L.Data.length; i++) {
        L.Steps.push({
            msg: `🔍 ตรวจสอบโหนดที่ ${i + 1}: ค่าคือ [${L.Data[i]}]`,
            highlight: i,
            list: [...L.Data]
        });

        if (L.Data[i] === target) {
            L.Steps.push({
                msg: `✅ เจอเป้าหมาย [${target}] ที่โหนดนี้!`,
                highlight: i,
                target: i,
                list: [...L.Data]
            });

            tempNodes.splice(i, 1);
            L.Steps.push({
                msg: `✂️ ทำการตัดสายการเชื่อมต่อและลบ [${target}] ออกจากลิสต์`,
                highlight: -1,
                list: [...tempNodes]
            });
            found = true;
            break;
        } else {
            L.Steps.push({
                msg: `❌ [${L.Data[i]}] ไม่ใช่เป้าหมาย... เตรียมขยับไปข้างหน้า`,
                highlight: i,
                list: [...L.Data]
            });
        }
    }

    if (!found) {
        L.Steps.push({
            msg: "❌ ค้นหาจนสุดสายแล้ว ไม่พบค่าที่ต้องการลบ",
            highlight: -1,
            list: [...L.Data]
        });
    }

    L.startAnimation();
};

function nextStep() {
    if (L.CurrentIdx < L.Steps.length - 1) {
        L.CurrentIdx++;
        L.applyStep();
    } else {
        L.Data = L.Steps[L.CurrentIdx].list;
        document.getElementById('next-btn-Linked-List').disabled = true;
        document.getElementById('algo-status-Linked-List').innerText = "อัลกอริทึมทำงานเสร็จสิ้น";

        document.getElementById('main-input').value = '';

        L.setControlsDisabled(false);
        L.render();
    }
};

function resetList() {
    L.Data = [10, 25, 40, 55];
    L.Steps = [];
    L.CurrentIdx = -1;
    L.setControlsDisabled(false);
    document.getElementById('next-btn-Linked-List').disabled = true;
    document.getElementById('algo-status-Linked-List').innerText = "รีเซ็ตข้อมูลแล้ว";
    L.render();
};

document.addEventListener('DOMContentLoaded', () => { 
    S.renderStack();
    L.render();
    switch_linkedlistAndstack();
    button();
});

