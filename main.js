let p1;
let grid = [];
let debug = true;
let guy;
let selector;
let move;
let rows = 64;
let cols = 64;
let render;

function preload() {
  tileSet = loadImage("Tilesets/Environment/terrain_atlas.png");
  guy = loadImage("Entities/Player/Player.png");
  selector = loadImage("selector.png");
  Forest = loadJSON("Levels/Forest/forest1.json");
}

function mouseHitboxChecker(x, y, w) {
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + w) {
    return true;
  } else {
    return false;
  }
}

function p1HitboxChecker(player, x, y, w, h) {
  //Top of box collision
  if (
    player.x > x - w + 1 &&
    player.x < x + w - 11 &&
    player.y > y - h - 7 &&
    player.y < y - h - 2
  ) {
    player.y = y - h - 7;
  }
  //Bottom of box collision
  if (
    player.x > x - w + 1 &&
    player.x < x + w - 11 &&
    player.y > y + h - 30 &&
    player.y < y + h - 25
  ) {
    player.y = y + h - 25;
  }
  //Right of box collision
  if (
    player.x > x + w - 15 &&
    player.x < x + w - 10 &&
    player.y > y - h - (player.sz % h) + 1 &&
    player.y < y + (h - player.sz / 2) - 6
  ) {
    player.x = x + h - 10;
  }
  // Left of box collision
  if (
    player.x > x - w &&
    player.x < x - w + 10 &&
    player.y > y - h - (player.sz % h) + 1 &&
    player.y < y + (h - player.sz / 2) - 6
  ) {
    player.x = x - player.sz + (player.sz % h);
  }
  return player;
}

function setup() {
  frameRate(60);
  allLayers();
  createCanvas(800, 600);
  p1 = new character(450, 400, 40);
  parse = new parseMap();
  render = new renderMap();

  // collision = new Collision();

  // createGrid();

  move = new Movement();
}

function draw() {
  background(75);
  render.Background(5);
  drawGrid();
  mouseGridHover();
  p1.display();

  render.Foreground(2);
  move.characterMovement();
  render.Hitboxes();

  if (debug == true) {
    fill(255);
    stroke(0);
    text("FPS: " + frameRate().toFixed(2), 10, height - 10);
  }
}

function allLayers() {
  for (i = 0; i < Forest.layers.length; i++) {
    mapLayers[i] = Forest.layers[i].data;
  }
}

// Character --------------------------------------------------------------------------------------------------------------

class character {
  constructor(CharX, CharY, CharW) {
    this.vectorPos = {
      x: CharX,
      y: CharY,
      sp: 2,
      sz: CharW
    };
    this.spritePosX;
    this.spritePosY;
  }

  display() {
    let offsetX = this.vectorPos.x - width / 2;
    let offsetY = this.vectorPos.y - height / 2;
    this.idle;
    //   playerR = {
    //     x: Character.vectorPos.x,
    //     y: Character.vectorPos.y,
    //     w: Character.CharacterSize,
    //     h: Character.CharacterSize,
    // }

    // x and y are both moving (left top)
    if (
      this.vectorPos.x <= this.vectorPos.x - offsetX &&
      this.vectorPos.y <= this.vectorPos.y - offsetY
    ) {
      this.spritePosX = this.vectorPos.x;
      this.spritePosY = this.vectorPos.y;
    }

    // x is stopped and y is moving (middle top)
    if (
      this.vectorPos.x >= this.vectorPos.x - offsetX &&
      this.vectorPos.x <= cols * parse.tileSize - width / 2 &&
      this.vectorPos.y <= this.vectorPos.y - offsetY
    ) {
      this.spritePosX = this.vectorPos.x - offsetX;
      this.spritePosY = this.vectorPos.y;
    }

    // x and y are both moving (right top)
    if (
      this.vectorPos.x >= cols * parse.tileSize - width / 2 &&
      this.vectorPos.y <= this.vectorPos.y - offsetY
    ) {
      this.spritePosX = this.vectorPos.x - (cols * parse.tileSize - width);
      this.spritePosY = this.vectorPos.y;
      print(this.vectorPos.x);
    }

    // x is moving, y is stopped (left middle)
    if (
      this.vectorPos.x <= width / 2 &&
      this.vectorPos.y >= this.vectorPos.y - offsetY &&
      this.vectorPos.y <= cols * parse.tileSize - height / 2
    ) {
      this.spritePosX = this.vectorPos.x;
      this.spritePosY = this.vectorPos.y - offsetY;
    }

    // x and y are both stopped (middle middle)
    if (
      this.vectorPos.x >= width / 2 &&
      this.vectorPos.x <= cols * parse.tileSize - width / 2 &&
      this.vectorPos.y >= this.vectorPos.y - offsetY
    ) {
      this.spritePosX = this.vectorPos.x - offsetX;
      this.spritePosY = this.vectorPos.y - offsetY;
    }

    // x is moving and y is stopped (right middle)
    if (
      this.vectorPos.x >= cols * parse.tileSize - width / 2 &&
      this.vectorPos.y >= this.vectorPos.y - offsetY &&
      this.vectorPos.y <= cols * parse.tileSize - height / 2
    ) {
      this.spritePosX = this.vectorPos.x - (cols * parse.tileSize - width);
      this.spritePosY = this.vectorPos.y - offsetY;
    }

    // x and y are both moving (left bottom)
    if (
      this.vectorPos.x <= this.vectorPos.x - offsetX &&
      this.vectorPos.y >= cols * parse.tileSize - height / 2
    ) {
      this.spritePosX = this.vectorPos.x;
      this.spritePosY = this.vectorPos.y - (cols * parse.tileSize - height);
    }

    // x is stopped y is moving (middle bottom)
    if (
      this.vectorPos.x >= this.vectorPos.x - offsetX &&
      this.vectorPos.y >= cols * parse.tileSize - height / 2
    ) {
      this.spritePosX = this.vectorPos.x - offsetX;
      this.spritePosY = this.vectorPos.y - (cols * parse.tileSize - height);
    }

    // x is stopped y is moving (right bottom)
    if (
      this.vectorPos.x >= this.vectorPos.x - offsetX &&
      this.vectorPos.x >= cols * parse.tileSize - width / 2 &&
      this.vectorPos.y >= this.vectorPos.y - offsetY &&
      this.vectorPos.y >= cols * parse.tileSize - height / 2
    ) {
      this.spritePosX = this.vectorPos.x - (cols * parse.tileSize - width);
      this.spritePosY = this.vectorPos.y - (cols * parse.tileSize - height);
    }

    image(
      guy,
      this.spritePosX,
      this.spritePosY,
      this.vectorPos.sz,
      this.vectorPos.sz,
      this.idle,
      move.charDirection * 40,
      40,
      40
    );
    // rect(this.vectorPos.x, this.vectorPos.y, 1, 1);
    // noFill();
    // rect(this.vectorPos.x, this.vectorPos.y, this.CharacterSize, this.CharacterSize);
    return [this.vectorPos.x, this.vectorPos.y, this.vectorPos.sz];
  }
}

function drawGrid() {
  let x = 0;
  let y = 0;
  let offsetX = p1.vectorPos.x - width / 2;
  let offsetY = p1.vectorPos.y - height / 2;
  if (p1.vectorPos.x <= width / 2) {
    x = 0;
  }
  if (
    p1.vectorPos.x >= width / 2 &&
    p1.vectorPos.x <= cols * parse.tileSize - width / 2
  ) {
    x = 0 - offsetX;
  }
  if (p1.vectorPos.x >= cols * parse.tileSize - width / 2) {
    x = -(cols * parse.tileSize - width);
  }

  if (p1.vectorPos.y >= height / 2) {
    y = 0 - offsetY;
  }
  if (
    p1.vectorPos.y >= height / 2 &&
    p1.vectorPos.y <= cols * parse.tileSize - height / 2
  ) {
    y = 0 - offsetY;
  }
  if (p1.vectorPos.y >= cols * parse.tileSize - height / 2) {
    y = -(cols * parse.tileSize - height);
  }

  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      gridX = i * 32 + x;
      gridY = j * 32 + y;
      grid[i][j] = new Cells(gridX, gridY, 32);
    }
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      gridX = i * 32 + x;
      gridY = j * 32 + y;
      grid[i][j].display(gridX, gridY);
    }
  }
}

function mouseGridHover() {
  let x = 0;
  let y = 0;
  let offsetX = p1.vectorPos.x - width / 2;
  let offsetY = p1.vectorPos.y - height / 2;
  if (p1.vectorPos.x <= width / 2) {
    x = 0;
  }
  if (
    p1.vectorPos.x >= width / 2 &&
    p1.vectorPos.x <= cols * parse.tileSize - width / 2
  ) {
    x = 0 - offsetX;
  }
  if (p1.vectorPos.x >= cols * parse.tileSize - width / 2) {
    x = -(cols * parse.tileSize - width);
  }

  if (p1.vectorPos.y >= height / 2) {
    y = 0 - offsetY;
  }
  if (
    p1.vectorPos.y >= height / 2 &&
    p1.vectorPos.y <= cols * parse.tileSize - height / 2
  ) {
    y = 0 - offsetY;
  }
  if (p1.vectorPos.y >= cols * parse.tileSize - height / 2) {
    y = -(cols * parse.tileSize - height);
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (
        mouseHitboxChecker(grid[i][j].cellX, grid[i][j].cellY, grid[i][j].cellW)
      ) {
        fill(255, 100);
        image(selector, i * 32 + x, j * 32 + y, 32, 32, 0, 0, 200, 200);
      }
    }
  }
}

class renderMap {
  constructor() {}
  Background(bgLayers) {
    this.backgroundLayers = bgLayers;
    for (let i = 0; i < this.backgroundLayers; i++) {
      parse.parseMapData(mapLayers[i], 64, 32, tileSet);
    }
  }

  Foreground(fgLayers) {
    this.foregroundLayers = fgLayers;
    this.layerLength = this.backgroundLayers + this.foregroundLayers;
    for (let i = this.backgroundLayers; i < this.layerLength; i++) {
      parse.parseMapData(mapLayers[i], 64, 32, tileSet);
    }
  }

  Hitboxes() {
    parse.parseHitboxData(mapLayers[7], 64, 32, tileSet);
    // parse.parseMapData(mapLayers[7], 64, 32, tileSet);
  }
}
