let charDirection;

function characterMovement() {
  let MoveUp;
  let MoveDown;
  let MoveLeft;
  let MoveRight;
  if (keyIsDown((keyCode = 68)) || keyIsDown(RIGHT_ARROW)) {
    MoveRight = true;
    charDirection = 1;
    p1.idle = (floor(frameCount / 5) % 3) * 40;
  } else {
    MoveRight = false;
    p1.idle = 40;
  }
  if (keyIsDown((keyCode = 65)) || keyIsDown(LEFT_ARROW)) {
    MoveLeft = true;
    charDirection = 3;
    p1.idle = (floor(frameCount / 5) % 3) * 40;
  } else {
    MoveLeft = false;
  }
  if (keyIsDown((keyCode = 87)) || keyIsDown(UP_ARROW)) {
    MoveUp = true;
    charDirection = 2;
    p1.idle = (floor(frameCount / 5) % 3) * 40;
  } else {
    MoveUp = false;
  }

  if (keyIsDown((keyCode = 83)) || keyIsDown(DOWN_ARROW)) {
    MoveDown = true;
    charDirection = 0;
    p1.idle = (floor(frameCount / 5) % 3) * 40;
  } else {
    MoveDown = false;
  }

  if (MoveUp == true) {
    p1.vectorPos.y = p1.vectorPos.y - p1.vectorPos.sp;
  }
  if (p1.vectorPos.y < 0) {
    p1.vectorPos.y = 0;
  }
  if (MoveDown == true) {
    p1.vectorPos.y = p1.vectorPos.y + p1.vectorPos.sp;
  }
  if (p1.vectorPos.y > cols * 32 - p1.vectorPos.sz) {
    p1.vectorPos.y = cols * 32 - p1.vectorPos.sz;
  }
  if (MoveRight == true) {
    p1.vectorPos.x = p1.vectorPos.x + p1.vectorPos.sp;
  }
  if (p1.vectorPos.x > rows * 32 - p1.vectorPos.sz) {
    p1.vectorPos.x = rows * 32 - p1.vectorPos.sz;
  }
  if (MoveLeft == true) {
    p1.vectorPos.x = p1.vectorPos.x - p1.vectorPos.sp;
  }
  if (p1.vectorPos.x < 0) {
    p1.vectorPos.x = 0;
  }
}
