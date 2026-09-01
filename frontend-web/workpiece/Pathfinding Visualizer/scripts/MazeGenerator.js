// MazeGenerator.js
export class MazeGenerator {
    constructor(gridController) {
        this.grid = gridController;
    }

    async generate() {
        if (this.grid.isAnimating) return;

        this.grid.stopSignal = false; 
        this.grid.isAnimating = true;


        this.grid.wallSet.clear();
        this.grid.clearAnimations();
        const nodes = document.querySelectorAll('.node');
       
        nodes.forEach(node => {
             node.classList.remove('wall', 'visited', 'path')
            });

        await this.addInnerWalls(true, 0, this.grid.cols - 1, 0, this.grid.rows - 1);
        
        this.grid.isAnimating = false;

    }

    async addInnerWalls(h, minX, maxX, minY, maxY) {

        if (this.grid.stopSignal) return;
        if (h) {
            if (maxX - minX < 2) return;

            let y = Math.floor(this.randomNumber(minY + 1, maxY - 1) / 2) * 2;
            await this.drawHorizontalWall(minX, maxX, y);

            await this.addInnerWalls(!h, minX, maxX, minY, y - 1);
            await this.addInnerWalls(!h, minX, maxX, y + 1, maxY);
        } else {
            if (maxY - minY < 2) return;

            let x = Math.floor(this.randomNumber(minX + 1, maxX - 1) / 2) * 2;
            await this.drawVerticalWall(minY, maxY, x);

            await this.addInnerWalls(!h, minX, x - 1, minY, maxY);
            await this.addInnerWalls(!h, x + 1, maxX, minY, maxY);
        }
    }

    async drawHorizontalWall(minX, maxX, y) {
        let hole = Math.floor(this.randomNumber(minX, maxX) / 2) * 2 + 1;
        for (let i = minX; i <= maxX; i++) {
            if (i !== hole) await this.setWall(y, i);
        }
    }

    async drawVerticalWall(minY, maxY, x) {
        let hole = Math.floor(this.randomNumber(minY, maxY) / 2) * 2 + 1;
        for (let i = minY; i <= maxY; i++) {
            if (i !== hole) await this.setWall(i, x);
        }
    }

    async setWall(r, c) {

        if (this.grid.stopSignal) return;

        const key = `${r}-${c}`;
        const node = this.grid.nodeMap.get(key);
        if (node && !node.classList.contains('start') && !node.classList.contains('end')) {
        node.classList.add('wall');
        this.grid.wallSet.add(key);
        await new Promise(res => setTimeout(res, 10));
    }
    }

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}