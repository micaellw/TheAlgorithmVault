export class StackUI {

    constructor() {

        this.Data = [10, 25, 40, 55];
        this.Steps = [];
        this.CurrentIdx = -1;


        this.MAX_STACK_SIZE = 10;
        this.setstart = this.Data;
        this.tx = document.getElementById('stack-text')

        this.tx.textContent = `Stack View (Max: ${this.MAX_STACK_SIZE})`
    }

    renderStack(highlightIdx = -1, targetIdx = -1, currentStack = this.Data) {
        const view = document.getElementById('stack-view');
        if (!view) return;

        if (currentStack.length === 0) {
            view.innerHTML = '<div style="color: #444; margin-top: 50%; width: 100%; text-align: center;">Stack Empty</div>';
            return;
        }
        view.innerHTML = currentStack.map((val, idx) => `
            <div class="element ${idx === highlightIdx ? 'active' : ''} ${idx === targetIdx ? 'pop-target' : ''}">
                ${val}
            </div>
        `).join('');
    }

    startStackAnimation() {
        this.CurrentIdx = 0;
        const nextBtn = document.getElementById('stack-next-btn');
        if (nextBtn) nextBtn.disabled = false;
        this.applyStackStep();
    }

    applyStackStep() {
        const step = this.Steps[this.CurrentIdx];
        const status = document.getElementById('stack-algo-status');
        if (status) status.innerText = `Step ${this.CurrentIdx + 1}: ${step.msg}`;
        this.renderStack(step.highlight, step.target, step.list);
    }

    setStackLocked(locked) {
        const pushBtn = document.getElementById('push-btn');
        const popBtn = document.getElementById('pop-btn');
        const input = document.getElementById('stack-input');

        if (pushBtn) pushBtn.disabled = locked;
        if (popBtn) popBtn.disabled = locked;
        if (input) input.disabled = locked;

    }
}

export class LinkedUI {

    constructor() {

        this.Data = [10, 25, 40, 55];
        this.Steps = [];
        this.CurrentIdx = -1;

    }

    render(highlightIdx = -1, targetIdx = -1, currentList = this.Data, newNodeObj = null) {
        const canvas = document.getElementById('visual-canvas');

        if (currentList.length === 0 && newNodeObj === null) {
            canvas.innerHTML = `
                    <div class="empty-msg">
                        <div class="empty-icon">🕳️</div>
                        <div>คลังว่างเปล่า! กรุณาเพิ่มโหนดเพื่อเริ่มต้น</div>
                    </div>`;
            return;
        }

        let html = '';
        if (newNodeObj !== null) {
            html += `
                    <div class="node new-node active ${newNodeObj.showArrow ? '' : 'no-arrow'}">
                        ${newNodeObj.val}
                    </div>`;
        }

        html += currentList.map((val, idx) => `
                <div class="node ${idx === highlightIdx ? 'active' : ''} ${idx === targetIdx ? 'target' : ''}">
                    ${val}
                </div>
            `).join('');

        html += '<div class="node null-node">NULL</div>';
        canvas.innerHTML = html;
    };

    setControlsDisabled(disabled) {
        document.getElementById('add-btn-Linked-List').disabled = disabled;
        document.getElementById('del-btn-Linked-List').disabled = disabled;
        document.getElementById('main-input').disabled = disabled;
    };

    startAnimation() {
        this.CurrentIdx = 0;
        document.getElementById('next-btn-Linked-List').disabled = false;
        this.applyStep();
    };

    applyStep() {
        const step = this.Steps[this.CurrentIdx];
        document.getElementById('algo-status-Linked-List').innerText = `Step ${this.CurrentIdx + 1}: ${step.msg}`;
        this.render(step.highlight, step.target, step.list, step.newNode);
    };
}
