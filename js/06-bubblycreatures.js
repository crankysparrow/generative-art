// march 2021

let pos = [];
const cols = ['#ff0000', '#00ff00', '#0000ff'];


function setup () {
  createCanvas(window.innerWidth, window.innerHeight);
  currentX = width/2
  currentY = height/2
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){

  blendMode(BLEND);
  background(0,9);
  
  fill(255); 
  noStroke();

  
  for (let i = 0; i <=15; i++) {
    fill(cols[i%3]);
    if (!pos[i]) {
      let lastX = random(width);
      let lastY = random(height);
      pos[i] = [lastX, lastY, lastX, lastY ];
    } else { 
      pos[i] = circleCreature(pos[i], i);
    }
  }

} 

function circleCreature(position, i) {
  let newY = noise(mouseY + position[3]) * height;
  let newX = noise(mouseX + position[2]) * width;

  // let noiseY = (noise(nY+i) * variance) - (variance/2)
  // let noiseX = (noise(nX+i) * variance) - (variance/2)
  // let newX = mouseX + (random(1, -1) * noiseX )
  // let newY = mouseY + (random(1,-1) * noiseY)

  let x = lerp(position[0], newX, 0.07);
  let y = lerp(position[1], newY, 0.07);
  blendMode(SCREEN);
  circle(x, y, 90);
  // return [x,y, position[2] + random(-0.5, 0.5), position[3] + random(-0.5, 0.5)];
  return [x,y,position[2], position[3]];
  // return [x, y]
}
