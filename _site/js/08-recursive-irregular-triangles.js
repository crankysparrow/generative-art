// march 2021
// inspiration: https://tylerxhobbs.com/essays/2017/aesthetically-pleasing-triangle-subdivision

const W = window.innerWidth - 40;
const H = window.innerHeight - 100;
const N = 10;

const red = [[330,355],[78,88],[60,70]];
const yellow = [[38,50],[80,90],[80,90]];
const gray = [[190,210], [30,35],[60,65]];
const realGray = [[0,0],[0,0],[0,100]];
const TONES = [gray,gray,red];

function setup() {
  BLENDS = [OVERLAY];  
  createCanvas(W,H);

  resetBtn = createButton('redraw');
  resetBtn.mousePressed(redrawBtn);

  saveBtn = createButton('save');
  saveBtn.mousePressed(saveCanvas);
  noLoop();
}

function redrawBtn() {
  erase();
  rect(0, 0, width, height);
  noErase();
  redraw();
}

function draw() {
  // blendMode(BLEND);
  // background(255);
  noStroke();
  colorMode(HSB);
  

  recursiveTriangles({
                      p:{x: 0, y: 0},
                      a: {x: W*2, y: 0},
                      b: {x: 0, y:H*2} }, N,0);
  
}

function recursiveTriangles(tri,n,c) {

  let tone = TONES[Math.floor(random(0,TONES.length))];

  let blend = BLENDS[Math.floor(random(0,BLENDS.length))];
  blendMode(blend);
  
  fill(random(tone[0][0],tone[0][1]), random(tone[1][0],tone[1][1]),  random(tone[2][0],tone[2][1]));
  
  drawTriangle(tri);
  if (n < 1 || c > N*2) return;
  
  let range = Math.abs(tri.a.x-tri.b.x);
  let adjustedRange = range * 0.5;
  
  let x = random(adjustedRange) + Math.min(tri.a.x,tri.b.x) + range*0.25;
  let y;
  
  let slope = (tri.a.y-tri.b.y) / (tri.a.x-tri.b.x);

  if (slope == 0) {
    y = tri.a.y;
  } else if (slope == Infinity || slope == -Infinity) {
    let rangeY = Math.abs(tri.a.y-tri.b.y);
    let adjustedRangeY = rangeY * 0.5;
    y = random(adjustedRangeY) + Math.min(tri.a.y,tri.b.y) + rangeY*0.25;
  } else {
    y = slope * (x-tri.a.x) + tri.a.y;
  }
  
  let newN = randomGaussian(n-1,2);
  let newN2 = randomGaussian(n-2,2);
  if (newN > N) newN = N;
  if (newN2 > N) newN = N;
  recursiveTriangles({p: {x,y}, a: tri.p, b: tri.a}, newN, c+1);
  recursiveTriangles({p: {x,y}, a: tri.p, b: tri.b}, newN2, c+1);
}

function drawTriangle({p,a,b}) {
  
  triangle(p.x,p.y,a.x,a.y,b.x,b.y);
}

// document.querySelector('#save-btn').addEventListener('click', function() {
//   // var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  
//   saveCanvas('triangles');
// })

// document.querySelector('#redraw-btn').addEventListener('click', function() {
//   reset();
// })