// march 2021

let pos = [];
const cols = ['#ff0000', '#00ff00', '#0000ff'];

function setup () {
  createCanvas(window.innerWidth, window.innerHeight);
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){

  blendMode(BLEND);
  background(0,9);
  
  fill(255); 
  noStroke();
  
  for (let i = 0; i <=20; i++) {
    fill(cols[i%3]);
    if (!pos[i]) {
      let lastX = random(10);
      let lastY = random(10);
      pos[i] = [0,0, lastX, lastY];
    } else { 
      pos[i] = circleCreature(pos[i]);
    }
  }

} 

function circleCreature(position) {
  // let newY = mouseY + random(position[3] * -50, 0);
  let newY = noise(mouseY + position[3]) * height;
  let newX = noise(mouseX + position[2]) * width;
  // let newX = mouseX + random(position[2] * 50, 0);
    
  let x = lerp(position[0], newX, 0.07);
  let y = lerp(position[1], newY, 0.07);
  blendMode(SCREEN);
  circle(x,y,130);
  // return [x,y, position[2] + random(-0.5, 0.5), position[3] + random(-0.5, 0.5)];
  return [x,y,position[2], position[3]];
}
