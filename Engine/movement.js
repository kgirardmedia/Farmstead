

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
      Character.idle = (floor(frameCount/5) % 3) * 40; 
    } else {
      this.MoveRight = false;
      Character.idle = 40;
    }
    if (keyIsDown(keyCode = 65) || keyIsDown(LEFT_ARROW)) {
      this.MoveLeft = true;
      this.charDirection = 3;
      Character.idle = (floor(frameCount/5) % 3) * 40; 
    } else {
      this.MoveLeft = false;
    }
    if (keyIsDown(keyCode = 87) || keyIsDown(UP_ARROW)) {
      this.MoveUp = true;
      this.charDirection = 2;
      Character.idle = (floor(frameCount/5) % 3) * 40; 
    } else {
      this.MoveUp = false;
    }

    if (keyIsDown(keyCode = 83) || keyIsDown(DOWN_ARROW)) {
      this.MoveDown = true;
      this.charDirection = 0;
      Character.idle = (floor(frameCount/5) % 3) * 40; 
    } else {
      this.MoveDown = false;
    }
    
    if (this.MoveUp == true) {
      Character.CharacterPosY = Character.CharacterPosY - Character.Speed;
    }
    if (Character.CharacterPosY < 0) {
      Character.CharacterPosY = 0;
    }
    if (this.MoveDown == true) {
      Character.CharacterPosY = Character.CharacterPosY + Character.Speed;
    }
    if (Character.CharacterPosY > (cols * 32) - Character.CharacterSize) {
      Character.CharacterPosY = (cols * 32) - Character.CharacterSize;
    }
    if (this.MoveRight == true) {
      Character.CharacterPosX = Character.CharacterPosX + Character.Speed;
    }
    if (Character.CharacterPosX > (rows * 32) - Character.CharacterSize) {
      Character.CharacterPosX = (rows * 32) - Character.CharacterSize;
    }
    if (this.MoveLeft == true) {
      Character.CharacterPosX = Character.CharacterPosX - Character.Speed;
    }
    if (Character.CharacterPosX < 0) {
      Character.CharacterPosX = 0;
    }

  }
}