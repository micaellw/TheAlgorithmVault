// GridController.js
export class GridController {
    constructor(rows, cols, containerElement) {
        this.rows = rows;
        this.cols = cols;

        this.historyLog = JSON.parse(localStorage.getItem('pathfinding_history')) || [];
        this.container =  containerElement;
        this.stopSignal = false;         
        this.startNode = null;
        this.endNode = null;
        this.wallSet = new Set();      
        this.currentMode = 'WALL';      
        this.isAnimating = false;                         
        this.container.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
        this.nodeMap = new Map();  


    }

    setMode(mode) {
        this.currentMode = mode;
    }

    resetData(){
        this.stopSignal = false;
        this.isAnimating = false;
        this.wallSet.clear();
        this.startNode = null;
        this.endNode = null;
        this.currentMode = 'WALL';
    }

    resetRoute(){
        this.isAnimating = false;
    }

    clearAnimations() {
        const nodes = this.container.querySelectorAll('.node');
        nodes.forEach(node => node.classList.remove('visited', 'path'));
    }


    handleNodeInteraction(node, isDrag = false) {
        if (this.isAnimating) return;
        const key = `${node.dataset.row}-${node.dataset.col}`;

        if (this.currentMode === 'START' || this.currentMode === 'END') {
            this.clearAnimations();

        }

        if (this.currentMode === 'START' && !isDrag) {
            if (this.startNode) this.startNode.classList.remove('start');
            node.classList.add('start');
            node.classList.remove('wall');
            this.wallSet.delete(key);
            this.startNode = node;
        } else if (this.currentMode === 'END' && !isDrag) {
            if (this.endNode) this.endNode.classList.remove('end');
            node.classList.add('end');
            node.classList.remove('wall');
            this.wallSet.delete(key);
            this.endNode = node;
        } else if (this.currentMode === 'WALL') {
            if (node.classList.contains('start') || node.classList.contains('end')) return;
            node.classList.toggle('wall');
            if (node.classList.contains('wall')) this.wallSet.add(key);
            else this.wallSet.delete(key);
            }
    }
    
}