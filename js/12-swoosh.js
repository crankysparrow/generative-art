const SIZE = 500;
const SIDES = 6;
const ANGLE = 360 / SIDES;
const ANGLES = [0];
var CURRENTS = new Array(SIDES).fill(0);
var adding = true;

for (let i = 1; i < SIDES; i++) {
  ANGLES.push(ANGLES[i-1] + ANGLE);
}

const INNER_SIZE = SIZE / 2;

var rotation = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  angleMode(DEGREES);
  // noLoop();
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}



function draw() {

  blendMode(BLEND);
  background(0);

  noStroke();
  fill(255);

  blendMode(DIFFERENCE);

  translate(width/2,height/2);
  scale(1, -1);


  for (let i = 0; i < SIDES; i++) {
    push();
      CURRENTS[i] = lerp(CURRENTS[i], ANGLES[i], rotation);
      rotate(CURRENTS[i]);
      circle(0, (SIZE/2 - INNER_SIZE/2), INNER_SIZE);
    pop();
  }


  
  // push();
  //   let currentAngle = ANGLE/2;
  //   for (let i = 0; i < SIDES; i++) {
  //     oneCircle(currentAngle, rotation * i);
  //     // circle(0, (SIZE/2 - INNER_SIZE/2), INNER_SIZE);
  //     currentAngle += ANGLE;
  //   }
  // pop();

  rotation += 0.005;
  reference();

}

function oneCircle(angle, n) {
  push();
    rotate(angle + n);
    circle(0, (SIZE/2 - INNER_SIZE/2), INNER_SIZE);
  pop();

}

function reference() {
  blendMode(BLEND);
  noFill();

  stroke('blue');
  strokeWeight(1);

  circle(0, 0, SIZE);
  let ANGLE = 360 / SIDES;

  push()
    rotate(ANGLE);

    for (let i = 0; i < SIDES; i++) {
      line(0, 0, 0, SIZE/2);
      rotate(ANGLE);
    }

  pop();  
}



