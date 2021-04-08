// feb 2021
// inspiration https://levelup.gitconnected.com/generative-art-3-fundamental-concepts-to-get-you-started-44205dae167b

const STEP = 20;
const VARIANCE_FACTOR = 85;
const NOISE_STEP = 1;

function setup(){
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {

  const lines = [];
  for (let i = STEP + 10; i < height - STEP; i += STEP) {
    let line = [];
    line.push({x: 0, y: i});
    
    for (let j = width / 10; j < (width/10 * 9); j += STEP) {
      let distanceToCenter = Math.abs(j - width/ 2);
      let distancePercent = 1 - (distanceToCenter / (width/ 2));
      let variance = VARIANCE_FACTOR * pow(distancePercent, 2);
      let ran = noise(NOISE_STEP * j / STEP - i) * -variance;
      line.push({ x: j, y: i + ran });
      
    }
  
    line.push({ x: width, y: i });
    lines.push(line);
  }
  
  strokeWeight(2);
  colorMode(HSB, 100);
  let tones = [
    [[65, 75], [60, 100], [50, 100]],
    [[50, 58], [70, 90], [80, 100]]
  ];
  background(random(65, 75), 10, 100);
  for (let i = Math.abs(Math.floor(VARIANCE_FACTOR / STEP - 1)); i < lines.length; i++) {
    let tone = tones[Math.floor(random(tones.length))];
    let c = color(random(tone[0][0], tone[0][1]), random(tone[1][0], tone[1][1]), random(tone[2][0], tone[2][1]));
    stroke(c);
    fill(c);
    beginShape();
    
    for (let j = 0; j < lines[i].length; j++) {
      curveVertex(lines[i][j].x, lines[i][j].y);
    }

    endShape();
  }
  

}

