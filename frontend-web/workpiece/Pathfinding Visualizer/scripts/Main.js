//Main.js
import { DijkstraEngine } from './Scriptscalculate/DijkstraEngine2.js';
import { AStarEngine } from './Scriptscalculate/AStarEngine.js';
import { MazeGenerator } from './MazeGenerator.js';
import { GridController } from './GridController.js';


const Row_Col = 30;

const container = document.querySelector('.contains');
const but = document.getElementById("start-stop");
const Start = document.getElementById('startDijkstra');
const re = document.getElementById('reset');
const Clear = document.getElementById('clear-btn');
const Generate = document.getElementById('generateMaze');
const ClearHistory = document.getElementById('clear-history')

const grid = new GridController(Row_Col, Row_Col, container);
const mazeGen = new MazeGenerator(grid);

let isMouseDown = false;


function createGrid() {

    while (grid.container.firstChild) {
        grid.container.removeChild(grid.container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    for (let row = 0; row < grid.rows; row++) {
        for (let col = 0; col < grid.cols; col++) {

            const node = document.createElement('div');
            node.className = 'node';
            node.dataset.row = row;
            node.dataset.col = col;

            node.addEventListener('mousedown', () => grid.handleNodeInteraction(node));
            node.addEventListener('mouseenter', () => {
                if (isMouseDown && grid.currentMode === 'WALL') grid.handleNodeInteraction(node);
            });

            grid.nodeMap.set(`${row}-${col}`, node);
            fragment.appendChild(node);
        }
    }

    grid.container.appendChild(fragment);
}


grid.container.addEventListener('mousedown', (e) => { isMouseDown = true; e.preventDefault(); });
window.addEventListener('mouseup', () => isMouseDown = false);

but.addEventListener("click", () => {

    if (grid.currentMode === 'WALL') {

        grid.setMode('START');

        but.innerText = "โหมด: เลือกจุดเริ่มต้น";

    } else if (grid.currentMode === 'START') {

        grid.setMode('END');
        but.innerText = "โหมด: เลือกจุดสิ้นสุด";

    } else {

        grid.setMode('WALL');
        but.innerText = "โหมด: วาดกำแพง";

    }

});

Generate.addEventListener('click', () => {
    mazeGen.generate();
});

Start.addEventListener('click', startVisualization);

Clear.addEventListener('click', () => {

    if (grid.isAnimating) {

        grid.stopSignal = true;
        grid.isAnimating = false;
        Clear.innerText = "Clear Grid Now";
        return;
    }
    Clear.innerText = "Stop , Clear";

    grid.resetData()
    createGrid();
});

re.addEventListener('click', () => {
    grid.resetRoute();
    grid.clearAnimations()

});

ClearHistory.addEventListener('click', async () => {
        grid.historyLog = [];
        localStorage.setItem('pathfinding_history', JSON.stringify(grid.historyLog));
        renderHistory();
});

function saveToHistory(algoName, visitedCount, pathLength, efficiency) {
    const record = {
        id: Date.now(),
        algoName: algoName === 'astar' ? 'A*' : 'Dijkstra',
        visitedNodes: visitedCount,
        pathLength: pathLength,
        efficiency: efficiency,
        time: new Date().toLocaleTimeString()
    };

    grid.historyLog.unshift(record);
    localStorage.setItem('pathfinding_history', JSON.stringify(grid.historyLog));
    renderHistory();
}


async function startVisualization() {
    if (grid.isAnimating) return;
    if (!grid.startNode || !grid.endNode) return alert("Select Start and End first!");
    grid.stopSignal = false;
    grid.isAnimating = true;
    grid.clearAnimations()


    const pathDisplay = document.getElementById('path-count');

    const startKey = `${grid.startNode.dataset.row}-${grid.startNode.dataset.col}`;
    const endKey = `${grid.endNode.dataset.row}-${grid.endNode.dataset.col}`;
    const selectedAlgo = document.getElementById('algo-type').value;

    let dijkstra;
    let astar;

    dijkstra = new DijkstraEngine(grid.rows, grid.cols, startKey, endKey, grid.wallSet);

    astar = new AStarEngine(grid.rows, grid.cols, startKey, endKey, grid.wallSet);

    const resDijkstra = dijkstra.solve();
    const resAStar = astar.solve();

    const dCount = resDijkstra.visitedNodesOrder.length;
    const aCount = resAStar.visitedNodesOrder.length;

    const savedPercent = ((dCount - aCount) / dCount * 100).toFixed(1);

    const visitedDisplay = document.getElementById('visited-count');

    const comparisonDisplay = document.getElementById('comparison-text');

    visitedDisplay.innerText = "0";
    pathDisplay.innerText = "0";

    const result = selectedAlgo === 'astar' ? resAStar : resDijkstra;

    if (result.shortestPath.length === 0){
        comparisonDisplay.innerText = `ไม่สามารถหาเส้นทางได้`;
    }
    else if (savedPercent > 0) {
        comparisonDisplay.innerText = `A* ฉลาดกว่า Dijkstra ${savedPercent}%`;
    } else {
        comparisonDisplay.innerText = `ประสิทธิภาพใกล้เคียงกัน`;
    }

    let currentVisited = 0;
    for (const key of result.visitedNodesOrder) {

        if (grid.stopSignal) {
            grid.isAnimating = false;
            return;
        }

        currentVisited++;
        await drawNode(key, 'visited');

        visitedDisplay.innerText = currentVisited;
    }

    let currentPath = 0;
    for (const key of result.shortestPath) {

        if (grid.stopSignal) {
            grid.isAnimating = false;
            return;
        }
        currentPath++;
        await drawNode(key, 'path');

        pathDisplay.innerText = currentPath;
    }

    saveToHistory(
        selectedAlgo,
        result.visitedNodesOrder.length,
        result.shortestPath.length,
        savedPercent
    );

    grid.stopSignal = false;
    grid.isAnimating = false;
}

async function drawNode(key, type) {
    const [r, c] = key.split('-');
    const node = grid.nodeMap.get(key);

    if (!node) return;
    if (node.classList.contains('wall') ||

        node.classList.contains('start') ||

        node.classList.contains('end')) {

        return;
    }
    node.classList.add(type);
    await new Promise(res => setTimeout(res, 5));

}

createGrid();




async function renderHistory() {
const historyList = document.getElementById('history-list');
    
    historyList.innerHTML = grid.historyLog.map(item => {

        const efficiencyNum = parseFloat(item.efficiency);
        let efficiencyMsg = '';
        
        if (item.pathLength === 0){
             efficiencyMsg = `<br><small style="color: #4ade80;">❌ ไม่สามารถหาเส้นทางได้</small>`;
        }
        else if (item.algoName === 'A*' && efficiencyNum > 0) {
            efficiencyMsg = `<br><small style="color: #4ade80;">✨ ฉลาดกว่า Dijkstra ${efficiencyNum}%</small>`;
        } 

        else if (item.algoName === 'Dijkstra' && efficiencyNum > 0) {
            efficiencyMsg = `<br><small style="color: #f87171;">⚠️ ฉลาดน้อยกว่า A* ${efficiencyNum}%</small>`;
        }

        return `
            <li class="history-item" style="border-bottom: 1px solid #555; padding: 10px 0;">
                <span style="color: #4ade80;">[${item.time}]</span> 
                <span class="algo-tag" style="font-weight: bold; color: #eab308;">${item.algoName}</span>: 
                สำรวจ ${item.visitedNodes} | ทางยาว ${item.pathLength}
                ${efficiencyMsg}
            </li>
        `;
    }).join('');
// fetchAndRenderDashboard(grid.historyLog)

}

renderHistory();
let perfChart = null;
renderDashboardFromLocal(grid.historyLog);


function renderDashboardFromLocal(historyLog) {

    if (!Array.isArray(historyLog) || historyLog.length === 0) return;

    const totalRunsEl = document.getElementById('total-runs');
    const avgEffEl = document.getElementById('avg-efficiency');
    const tbody = document.getElementById('history-body');
    const chartCanvas = document.getElementById('performanceChart');

    if (!totalRunsEl || !avgEffEl || !tbody || !chartCanvas) return;

    // ===== Stat Cards =====
    totalRunsEl.innerText = historyLog.length;

    const avgEff =
        historyLog.reduce((acc, curr) =>
            acc + (parseFloat(curr.efficiency) || 0), 0
        ) / historyLog.length;

    avgEffEl.innerText = avgEff.toFixed(1) + '%';

    // ===== Chart Data (เหมือน backend version) =====
    const last10 = historyLog.slice(-10);

    const labels = last10.map((_, i) => `Run ${i + 1}`);

    const dijkstraPoints = last10
        .filter(h => h.algoName === 'Dijkstra')
        .map(h => h.visitedNodes);

    const astarPoints = last10
        .filter(h => h.algoName === 'A*')
        .map(h => h.visitedNodes);

    renderPerformanceChart(labels, dijkstraPoints, astarPoints);

    // ===== Table (format เหมือน backend เป๊ะ) =====
    tbody.innerHTML = historyLog.slice().reverse().map(item => {

        const isAStar = item.algoName === 'A*';

        return `
            <tr style="border-bottom: 1px solid #21262d;">
                <td style="padding: 12px;">
                    <span class="algo-tag" style="color: ${isAStar ? 'var(--neon-green)' : '#bc8cff'}">
                        ${item.algoName}
                    </span>
                </td>
                <td>30x30</td>
                <td style="color: var(--neon-blue);">${item.visitedNodes}</td>
                <td>${item.pathLength}</td>
                <td style="color: #eab308;">
                    ${item.efficiency ? item.efficiency + '%' : '-'}
                </td>
                <td style="color: #8b949e; font-size: 0.8rem;">
                    ${item.time}
                </td>
            </tr>
        `;

    }).join('');
}


  function renderPerformanceChart(labels, dijkstra, astar) {

    const canvas = document.getElementById('performanceChart');
    if (!canvas) return;

    if (perfChart) perfChart.destroy();

    perfChart = new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Dijkstra (Visited)',
                    data: dijkstra,
                    borderColor: '#bc8cff',
                    tension: 0.3
                },
                {
                    label: 'A* (Visited)',
                    data: astar,
                    borderColor: '#58a6ff',
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

const refreshBtn = document.getElementById('refresh-dashboard');

refreshBtn?.addEventListener('click', () => {
    renderDashboardFromLocal(grid.historyLog);
});
