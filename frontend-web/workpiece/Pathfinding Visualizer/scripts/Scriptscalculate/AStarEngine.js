// AStarEngine.js
import { MinHeap } from './MinHeap.js';

export class AStarEngine {
    constructor(rows, cols, startKey, endKey, wallSet) {
        this.rows = rows;   
        this.cols = cols;
        this.startKey = startKey;
        this.endKey = endKey;
        this.wallSet = wallSet;
    }

    getHeuristic(nodeKey) {
        const [r1, c1] = nodeKey.split('-').map(Number);
        const [r2, c2] = this.endKey.split('-').map(Number);
        
        const dx = Math.abs(r1 - r2);
        const dy = Math.abs(c1 - c2);

        return (dx + dy) + (Math.SQRT2 - 2) * Math.min(dx, dy);
    }

    solve() {
        const gScore = {};
        const previousNodes = {};
        const visitedNodesOrder = [];
        const pq = new MinHeap();

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                gScore[`${r}-${c}`] = Infinity;
            }
        }

        gScore[this.startKey] = 0;
        
        pq.push({ 
            key: this.startKey, 
            distance: this.getHeuristic(this.startKey) 
        });

        const visited = new Set();

        while (pq.size() > 0) {
            const { key: currentNodeKey } = pq.pop();

            if (visited.has(currentNodeKey)) continue;
            visited.add(currentNodeKey);
            
            if (currentNodeKey === this.endKey) break;
            
            if (currentNodeKey !== this.startKey) {
                visitedNodesOrder.push(currentNodeKey);
            }

            const neighbors = this.getNeighbors(currentNodeKey);
            for (const neighbor of neighbors) {

                const tentativeGScore = gScore[currentNodeKey] + neighbor.weight;

                if (tentativeGScore < gScore[neighbor.key]) {
                    gScore[neighbor.key] = tentativeGScore;
                    previousNodes[neighbor.key] = currentNodeKey;
                    
                    const fScore = tentativeGScore + this.getHeuristic(neighbor.key);
                    pq.push({ key: neighbor.key, distance: fScore });
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