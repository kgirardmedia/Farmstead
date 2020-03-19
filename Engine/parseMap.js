let Forest;
let tileSet;
let mapLayers = []; // the array that holds the numbers for each tile in the tileset placed on the map
let parse; // initializes the parseMap class

class parseMap {
    constructor() {

    }
    parseMapData(mapArr, cols, tileSize, tileDisplay) {
        this.map = mapArr;
        this.cols = cols;
        this.tileSize = tileSize;
        this.tileSet = tileDisplay;
        this.desX;
        this.desY;
        let x = 0;
        let y = 0;
        let offsetX = p1.vectorPos.x - width / 2;
        let offsetY = p1.vectorPos.y - height / 2;

        //Determine whether or not to let the map scroll 

        if (p1.vectorPos.x <= width / 2) {
            x = 0;
        }
        if (p1.vectorPos.x >= width / 2 && p1.vectorPos.x <= (this.cols * this.tileSize) - width/2) {
            x = 0 - offsetX;
        }
        if (p1.vectorPos.x >= (this.cols * this.tileSize) - width/2) {
            x =  - ((this.cols * this.tileSize) - width);
        }
        if (p1.vectorPos.y <= height / 2) {
            y = 0;
        }
        if (p1.vectorPos.y >= height / 2 && p1.vectorPos.y <= (this.cols * this.tileSize) - height/2) {
            y = 0 - offsetY;
        }
        if (p1.vectorPos.y >= (this.cols * this.tileSize) - height/2) {
            y =  - ((this.cols * this.tileSize) - height);
        }

        //Parse map data and prepare to draw tiles

        for (let i = mapLayers[0].length - 1; i > -1; i--) {
            let value = this.map[i] - 1;
            this.sourceX = (value % this.tileSize) * this.tileSize;
            this.sourceY = floor(value / this.tileSize) * this.tileSize;
            this.desX = (i % this.cols) * this.tileSize;
            this.desY = floor(i / this.cols) * this.tileSize;

        // if the tile that needs to be drawn is on screen, the tile is drawn
        
            if (this.desX + x >= -(this.tileSize) && this.desX + x <= width && this.desY + y >= -(this.tileSize) && this.desY + y <= height){
            image(this.tileSet, this.desX + x, this.desY + y, this.tileSize, this.tileSize, this.sourceX, this.sourceY, this.tileSize, this.tileSize);
            }
    
        }
    }

    parseHitboxData(mapArr, cols, tileSize, tileDisplay) {
        this.hmap = mapArr;
        this.hcols = cols;
        this.htileSize = tileSize;
        this.htileSet = tileDisplay;
        this.hdesX;
        this.hdesY;
        let x = 0;
        let y = 0;
        let offsetX = p1.vectorPos.x - width / 2;
        let offsetY = p1.vectorPos.y - height / 2;

        if (p1.vectorPos.x <= width / 2) {
            x = 0;
        }
        if (p1.vectorPos.x >= width / 2 && p1.vectorPos.x <= (this.cols * this.tileSize) - width/2) {
            x = 0 - offsetX;
        }
        if (p1.vectorPos.x >= (this.hcols * this.htileSize) - width/2) {
            x =  - ((this.hcols * this.htileSize) - width);
        }
        if (p1.vectorPos.y <= height / 2) {
            y = 0;
        }
        if (p1.vectorPos.y >= height / 2 && p1.vectorPos.y <= (this.hcols * this.htileSize) - height/2) {
            y = 0 - offsetY;
        }
        if (p1.vectorPos.y >= (this.hcols * this.htileSize) - height/2) {
            y =  - ((this.hcols * this.htileSize) - height);
        }

        for (let i = mapLayers[7].length - 1; i > -1; i--) {
            let value = this.hmap[i] - 1;
            this.hdesX = (i % this.hcols) * this.htileSize;
            this.hdesY = floor(i / this.hcols) * this.htileSize;
            if (this.hdesX + x >= -(this.htileSize) && this.hdesX + x <= width && this.hdesY + y >= -(this.htileSize) && this.hdesY + y <= height && value > 0){
                stroke(255);
                strokeWeight(2);
                fill(150);
                p1.vectorPos = p1HitboxChecker(p1.vectorPos, this.hdesX, this.hdesY, this.tileSize, this.tileSize);
                // rect(this.hdesX + x, this.hdesY + y, this.htileSize, this.htileSize);

                // //Left of box collision
                // if (p1.vectorPos.x > (this.hdesX - this.tileSize) && 
                // p1.vectorPos.x < (this.hdesX - this.tileSize) + 10 && 
                // p1.vectorPos.y > (this.hdesY - this.tileSize) - (p1.vectorPos.sz % this.tileSize) + 1 && 
                // p1.vectorPos.y < this.hdesY + (this.tileSize - p1.vectorPos.sz/2) - 6  && value > 0) {

                //     p1.vectorPos.x = (this.hdesX) - p1.vectorPos.sz + (p1.vectorPos.sz % this.tileSize);
                // }

                // //Right of box collision
                // if (p1.vectorPos.x > (this.hdesX) + this.tileSize - 15 &&
                // p1.vectorPos.x < (this.hdesX + this.tileSize) - 10 &&
                // p1.vectorPos.y > (this.hdesY - this.tileSize) - (p1.vectorPos.sz % this.tileSize) + 1 &&
                // p1.vectorPos.y < this.hdesY + (this.tileSize - p1.vectorPos.sz/2) - 6  && value > 0) {
                //     p1.vectorPos.x = (this.hdesX) + this.tileSize - 10;
                // }
                // //Top of box collision
                // if (p1.vectorPos.x > (this.hdesX - this.tileSize) + 1 && 
                // p1.vectorPos.x < (this.hdesX + this.tileSize) - 11  && 
                // p1.vectorPos.y > (this.hdesY - this.tileSize) - 7 && 
                // p1.vectorPos.y < this.hdesY  - this.tileSize - 2 && value > 0) {
                //     p1.vectorPos.y = this.hdesY - this.tileSize - 7;
                // }

                // //Bottom of box collision
                // if (p1.vectorPos.x > (this.hdesX - this.tileSize) + 1 && 
                // p1.vectorPos.x < (this.hdesX + this.tileSize) - 11 &&
                // p1.vectorPos.y > this.hdesY + (this.tileSize - 30) && 
                // p1.vectorPos.y < this.hdesY + (this.tileSize - 25) && value > 0) {
                //     p1.vectorPos.y = this.hdesY + (this.tileSize - 25);
                // }                
                }                
        }
    }

}
