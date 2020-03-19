let Forest;
let tileSet;
let mapLayers = []; // the array that holds the numbers for each tile in the tileset placed on the map
let parse; // initializes the parseMap class

class parseMap {
  constructor() {}
  parseMapData(mapArr, cols, tileSize, tileDisplay) {
    this.map = mapArr;
    this.cols = cols;
    this.tileSize = tileSize;
    this.tileSet = tileDisplay;
    this.desX;
    this.desY;

    //Parse map data and prepare to draw tiles

    for (let i = mapLayers[0].length - 1; i > -1; i--) {
      let value = this.map[i] - 1;
      this.sourceX = (value % this.tileSize) * this.tileSize;
      this.sourceY = floor(value / this.tileSize) * this.tileSize;
      this.desX = (i % this.cols) * this.tileSize;
      this.desY = floor(i / this.cols) * this.tileSize;

      // if the tile that needs to be drawn is on screen, the tile is drawn

      if (this.desX + scroll.x >= -this.tileSize && this.desX + scroll.x <= width && this.desY + scroll.y >= -this.tileSize && this.desY + scroll.y <= height) {
        image(this.tileSet, this.desX + scroll.x, this.desY + scroll.y, this.tileSize, this.tileSize, this.sourceX, this.sourceY, this.tileSize, this.tileSize);
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

    for (let i = mapLayers[7].length - 1; i > -1; i--) {
      let value = this.hmap[i] - 1;
      this.hdesX = (i % this.hcols) * this.htileSize;
      this.hdesY = floor(i / this.hcols) * this.htileSize;
      if (
        this.hdesX + scroll.x >= -this.htileSize &&
        this.hdesX + scroll.x <= width &&
        this.hdesY + scroll.y >= -this.htileSize &&
        this.hdesY + scroll.y <= height &&
        value > 0
      ) {
        stroke(255);
        strokeWeight(2);
        fill(150);
        p1HitboxChecker(p1.vectorPos, this.hdesX, this.hdesY, this.tileSize, this.tileSize);
      }
    }
  }
}
