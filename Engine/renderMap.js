let Forest;
let tileSet;
let mapLayers = []; // the array that holds the numbers for each tile in the tileset placed on the map
let mapDisplay; // initializes the renderMap class

class renderMap {

    parseMapData(mapArr, cols, tileSize, tileDisplay) {
        this.map = mapArr;
        this.cols = cols;
        this.tileSize = tileSize;
        this.tileSet = tileDisplay;
        this.desX;
        this.desY;
        let x = 0;
        let y = 0;
        let offsetX = Character.CharacterPosX - width / 2;
        let offsetY = Character.CharacterPosY - height / 2;
        let maxRenderAmt = floor(this.cols * this.tileSize) / width;

        //Determine whether or not to let the map scroll 

        if (Character.CharacterPosX <= width / 2) {
            x = 0;
        }
        if (Character.CharacterPosX >= width / 2 && Character.CharacterPosX <= (this.cols * this.tileSize) - width/2) {
            x = 0 - offsetX;
        }
        if (Character.CharacterPosX >= (this.cols * this.tileSize) - width/2) {
            x =  - ((this.cols * this.tileSize) - width);
        }
        if (Character.CharacterPosY <= height / 2) {
            y = 0;
        }
        if (Character.CharacterPosY >= height / 2 && Character.CharacterPosY <= (this.cols * this.tileSize) - height/2) {
            y = 0 - offsetY;
        }
        if (Character.CharacterPosY >= (this.cols * this.tileSize) - height/2) {
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

}
