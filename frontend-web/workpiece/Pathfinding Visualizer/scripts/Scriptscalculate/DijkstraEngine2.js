//DijkstraEngine.js
import { MinHeap } from './MinHeap.js';

export class DijkstraEngine {
    constructor(rows, cols, startKey, endKey, wallSet) {
        this.rows = rows;
        this.cols = cols;
        this.startKey = startKey;
        this.endKey = endKey;
        this.wallSet = wallSet;
    }

    solve() {
        const distances = {};
        const previousNodes = {};
        const visitedNodesOrder = [];
        const pq = new MinHeap();

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                distances[`${r}-${c}`] = Infinity;
            }
        }

        distances[this.startKey] = 0;
        pq.push({ key: this.startKey, distance: 0 });

        const visited = new Set();

        while (pq.size() > 0) {
            const { key: currentNodeKey, distance: currentDist } = pq.pop();

            if (visited.has(currentNodeKey)) continue;
            visited.add(currentNodeKey);
            
            if (currentDist === Infinity) break;
            if (currentNodeKey === this.endKey) break;
            
            if (currentNodeKey !== this.startKey) {
                visitedNodesOrder.push(currentNodeKey);
            }

            const neighbors = this.getNeighbors(currentNodeKey);
            for (const neighbor of neighbors) {
                const newDist = currentDist + neighbor.weight;

                if (newDist < distances[neighbor.key]) {
                    distances[neighbor.key] = newDist;
                    previousNodes[neighbor.key] = currentNodeKey;
                    pq.push({ key: neighbor.key, distance: newDist });
                }
            }
        }

        return {
            visitedNodesOrder,
            shortestPath: this.reconstructPath(previousNodes)
        };
    }

    getClosestNode(unvisited, distances) {
        let closest = null;
        let shortestDist = Infinity;
        for (let key of unvisited) {
            if (distances[key] < shortestDist) {
                shortestDist = distances[key];
                closest = key;
            }
        }
        return closest;
    }

    getNeighbors(key) {
        const neighbors = [];
        const [r, c] = key.split('-').map(Number);

        const orthogonal = [{dr:-1, dc:0}, {dr:1, dc:0}, {dr:0, dc:-1}, {dr:0, dc:1}];
        const diagonal = [{dr:-1, dc:-1}, {dr:-1, dc:1}, {dr:1, dc:-1}, {dr:1, dc:1}];

        for (const {dr, dc} of orthogonal) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols) {
                const nKey = `${nr}-${nc}`;
                if (!this.wallSet.has(nKey)) 
                    neighbors.push({key: nKey, weight: 1});
            }
        }

        for (const {dr, dc} of diagonal) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols) {
                const nKey = `${nr}-${nc}`;
                const s1 = `${r + dr}-${c}`, s2 = `${r}-${c + dc}`;
                if (!this.wallSet.has(nKey) && !this.wallSet.has(s1) && !this.wallSet.has(s2)) {
                    neighbors.push({key: nKey, weight: 1.414});
                }
            }
        }
        return neighbors;
    }

    reconstructPath(previousNodes) {
        const path = [];
        let curr = this.endKey;
        while (previousNodes[curr]) {
            path.unshift(curr); 
            curr = previousNodes[curr];
        }
        return path;
    }
}