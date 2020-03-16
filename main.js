let Character;
let grid = [];
let debug = true;
let guy;
let selector;
let move;
let rows = 64;
let cols = 64;
let render;


function preload() {
  tileSet = loadImage('Tilesets/Environment/terrain_atlas.png');
  guy = loadImage('Entities/Player/Player.png');
  selector = loadImage('selector.png');
  Forest = loadJSON('Levels/Forest/forest1.json');
}

function mouseHitboxChecker(x, y, w) {
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + w) {
    return (true);
  } else {
    return (false);
  }
}

function characterHitboxChecker(x, y, w, h) {
  rect(x, y, w, h);
  print(x,y,w,h);
  // Left of box
  if (Character.CharacterPosX >= x &&
    Character.CharacterPosX <= x + w &&
    Character.CharacterPosY >= y &&
    Character.CharacterPosY <= y + h) {


    return (true);
  } else {
    return (false);
  }
}

function setup() {
  frameRate(60);
  allLayers();
  createCanvas(800, 600);
  parse = new parseMap();
  render = new renderMap();
  Character = new character(450, 400, 40);
  collision = new Collision();

  // createGrid();

  move = new Movement();

}

function draw() {

  background(75);
  render.Background(5);
  drawGrid();
  mouseGridHover();
  Character.display();

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

    this.CharacterPosX = CharX;
    this.CharacterPosY = CharY;
    this.Speed = 2;
    this.CharacterSize = CharW;
    this.spritePosX;
    this.spritePosY;

  }

  display() {
    let offsetX = this.CharacterPosX - width / 2;
    let offsetY = this.CharacterPosY - height / 2;
    this.idle;
    playerR = {
      x: Character.CharacterPosX,
      y: Character.CharacterPosY,
      w: Character.CharacterSize,
      h: Character.CharacterSize,
  }
    
    // x and y are both moving (left top)
    if (this.CharacterPosX <= this.CharacterPosX - offsetX && this.CharacterPosY <= this.CharacterPosY - offsetY) {
      this.spritePosX = this.CharacterPosX;
      this.spritePosY = this.CharacterPosY;
    }

    // x is stopped and y is moving (middle top)
    if (this.CharacterPosX >= this.CharacterPosX - offsetX && this.CharacterPosX <= (cols * parse.tileSize) - width/2 && this.CharacterPosY <= this.CharacterPosY - offsetY) {
      this.spritePosX = this.CharacterPosX - offsetX;
      this.spritePosY = this.CharacterPosY;
    }

    // x and y are both moving (right top)
    if (this.CharacterPosX >= (cols * parse.tileSize) - width/2 && this.CharacterPosY <= this.CharacterPosY - offsetY) {
      this.spritePosX = this.CharacterPosX - ((cols * parse.tileSize) - width);
      this.spritePosY = this.CharacterPosY;
      print(this.CharacterPosX);
    }

    // x is moving, y is stopped (left middle)
    if (this.CharacterPosX <= width / 2 && this.CharacterPosY >= this.CharacterPosY - offsetY && this.CharacterPosY <= (cols * parse.tileSize) - height/2) {
      this.spritePosX = this.CharacterPosX;
      this.spritePosY = this.CharacterPosY - offsetY;
    }

    // x and y are both stopped (middle middle)
    if (this.CharacterPosX >= width / 2 && this.CharacterPosX <= (cols * parse.tileSize) - width/2 && this.CharacterPosY >= this.CharacterPosY - offsetY) {
      this.spritePosX = this.CharacterPosX - offsetX;
      this.spritePosY = this.CharacterPosY - offsetY;
    }

    // x is moving and y is stopped (right middle)
    if (this.CharacterPosX >= (cols * parse.tileSize) - width/2 && this.CharacterPosY >= this.CharacterPosY - offsetY && this.CharacterPosY <= (cols * parse.tileSize) - height/2) {
      this.spritePosX = this.CharacterPosX - ((cols * parse.tileSize) - width);
      this.spritePosY = this.CharacterPosY - offsetY;
    }

    // x and y are both moving (left bottom)
    if (this.CharacterPosX <= this.CharacterPosX - offsetX && this.CharacterPosY >= (cols * parse.tileSize) - height/2) {
      this.spritePosX = this.CharacterPosX;
      this.spritePosY = this.CharacterPosY - ((cols * parse.tileSize) - height);
    }

    // x is stopped y is moving (middle bottom)
    if (this.CharacterPosX >= this.CharacterPosX - offsetX && this.CharacterPosY >= (cols * parse.tileSize) - height/2) {
      this.spritePosX = this.CharacterPosX - offsetX;
      this.spritePosY = this.CharacterPosY - ((cols * parse.tileSize) - height);
    }

    // x is stopped y is moving (right bottom)
    if (this.CharacterPosX >= this.CharacterPosX - offsetX && this.CharacterPosX >= (cols * parse.tileSize) - width/2 && this.CharacterPosY >= this.CharacterPosY - offsetY && this.CharacterPosY >= (cols * parse.tileSize) - height/2) {
      this.spritePosX = this.CharacterPosX - ((cols * parse.tileSize) - width);
      this.spritePosY = this.CharacterPosY - ((cols * parse.tileSize) - height);
    }

    image(guy, this.spritePosX, this.spritePosY, this.CharacterSize, this.CharacterSize, this.idle, move.charDirection * 40, 40, 40);
    // rect(this.CharacterPosX, this.CharacterPosY, 1, 1);
    // noFill();
    // rect(this.CharacterPosX, this.CharacterPosY, this.CharacterSize, this.CharacterSize);
    return [this.CharacterPosX, this.CharacterPosY, this.CharacterSize];
  }
}

function drawGrid() {
  let x = 0;
  let y = 0;
  let offsetX = Character.CharacterPosX - width / 2;
  let offsetY = Character.CharacterPosY - height / 2;
  if (Character.CharacterPosX <= width / 2) {
    x = 0;
  }
  if (Character.CharacterPosX >= width / 2 && Character.CharacterPosX <= (cols * parse.tileSize) - width/2) {
    x = 0 - offsetX;
  }
  if (Character.CharacterPosX >= (cols * parse.tileSize) - width/2) {
    x =  - ((cols * parse.tileSize) - width);
  }

  if (Character.CharacterPosY >= height / 2) {
    y = 0 - offsetY;
  }
  if (Character.CharacterPosY >= height / 2 && Character.CharacterPosY <= (cols * parse.tileSize) - height/2) {
    y = 0 - offsetY;
  }
  if (Character.CharacterPosY >= (cols * parse.tileSize) - height/2) {
    y =  - ((cols * parse.tileSize) - height);
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
  let offsetX = Character.CharacterPosX - width / 2;
  let offsetY = Character.CharacterPosY - height / 2;
  if (Character.CharacterPosX <= width / 2) {
    x = 0;
  }
  if (Character.CharacterPosX >= width / 2 && Character.CharacterPosX <= (cols * parse.tileSize) - width/2) {
    x = 0 - offsetX;
  }
  if (Character.CharacterPosX >= (cols * parse.tileSize) - width/2) {
    x =  - ((cols * parse.tileSize) - width);
  }

  if (Character.CharacterPosY >= height / 2) {
    y = 0 - offsetY;
  }
  if (Character.CharacterPosY >= height / 2 && Character.CharacterPosY <= (cols * parse.tileSize) - height/2) {
    y = 0 - offsetY;
  }
  if (Character.CharacterPosY >= (cols * parse.tileSize) - height/2) {
    y =  - ((cols * parse.tileSize) - height);
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (mouseHitboxChecker(grid[i][j].cellX, grid[i][j].cellY, grid[i][j].cellW)) {
        fill(255, 100);
        image(selector, i * 32 + x, j * 32 + y, 32, 32, 0, 0, 200, 200);
      }
    }
  }
}

// function renderBackground() {
//   parse.parseMapData(mapLayers[0], 64, 32, tileSet);
//   parse.parseMapData(mapLayers[1], 64, 32, tileSet);
//   parse.parseMapData(mapLayers[2], 64, 32, tileSet);
//   parse.parseMapData(mapLayers[3], 64, 32, tileSet);
//   parse.parseMapData(mapLayers[4], 64, 32, tileSet);
// }



class renderMap {
  constructor(){
    
  }
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


