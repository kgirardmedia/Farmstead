

class Movement {
  constructor() {


  }

  characterMovement() {
    this.charDirection;
    this.MoveUp;
    this.MoveDown;
    this.MoveLeft;
    this.MoveRight;
    if (keyIsDown(keyCode = 68) || keyIsDown(RIGHT_ARROW)) {
      this.MoveRight = true;
      this.charDirection = 1;
      p1.idle = (floor(frameCount/5) % 3) * 40; 
    } else {
      this.MoveRight = false;
      p1.idle = 40;
    }
    if (keyIsDown(keyCode = 65) || keyIsDown(LEFT_ARROW)) {
      this.MoveLeft = true;
      this.charDirection = 3;
      p1.idle = (floor(frameCount/5) % 3) * 40; 
    } else {
      this.MoveLeft = false;
    }
    if (keyIsDown(keyCode = 87) || keyIsDown(UP_ARROW)) {
      this.MoveUp = true;
      this.charDirection = 2;
      p1.idle = (floor(frameCount/5) % 3) * 40; 
    } else {
      this.MoveUp = false;
    }

    if (keyIsDown(keyCode = 83) || keyIsDown(DOWN_ARROW)) {
      this.MoveDown = true;
      this.charDirection = 0;
      p1.idle = (floor(frameCount/5) % 3) * 40; 
    } else {
      this.MoveDown = false;
    }
    
    if (this.MoveUp == true) {
      p1.vectorPos.y = p1.vectorPos.y - p1.vectorPos.sp;
    }
    if (p1.vectorPos.y < 0) {
      p1.vectorPos.y = 0;
    }
    if (this.MoveDown == true) {
      p1.vectorPos.y = p1.vectorPos.y + p1.vectorPos.sp;
    }
    if (p1.vectorPos.y > (cols * 32) - p1.vectorPos.sz) {
      p1.vectorPos.y = (cols * 32) - p1.vectorPos.sz;
    }
    if (this.MoveRight == true) {
      p1.vectorPos.x = p1.vectorPos.x + p1.vectorPos.sp;
    }
    if (p1.vectorPos.x > (rows * 32) - p1.vectorPos.sz) {
      p1.vectorPos.x = (rows * 32) - p1.vectorPos.sz;
    }
    if (this.MoveLeft == true) {
      p1.vectorPos.x = p1.vectorPos.x - p1.vectorPos.sp;
    }
    if (p1.vectorPos.x < 0) {
      p1.vectorPos.x = 0;
    }

  }
}