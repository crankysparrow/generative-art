// feb 2021

const MAX_HEIGHT = window.innerHeight / 2;
const MAX_WIDTH = window.innerWidth / 3;
const SIZE = 110;
const FACTOR = 20;

// Create a new canvas to the browser size
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noLoop();
}

// On window resize, update the canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw() {
  
  noStroke();
  let colors = ['#C5FFFD', '#0DA8AB', '#7F2178', '#B143A8'];
  
  colorMode(HSB, 100);
  background(random(60, 70), 10, 100);
  
  colorMode(RGB, 255);
  let triangles = [];
  

  for (let y = SIZE; y <= height - SIZE*2; y+= SIZE) {
    for (let x = SIZE; x <= width - SIZE; x+= SIZE) { 
      let f = random() * FACTOR - (FACTOR / 2);
      let g = random() * FACTOR - (FACTOR / 2);
      let h = random() * FACTOR - (FACTOR / 2);
      let j = random() * FACTOR - (FACTOR / 2);
      let k = random() * FACTOR - (FACTOR / 2);

      triangles.push([
        x-SIZE/2+f, y+SIZE/2+g, x+SIZE/2+h, y+SIZE/2+j, x+k, y+SIZE*1.5+f
      ]);
    }
    
    for (let x = SIZE*1.5; x<= width - SIZE; x+= SIZE) {
      let f = random() * FACTOR - (FACTOR / 2);
      let g = random() * FACTOR - (FACTOR / 2);
      let h = random() * FACTOR - (FACTOR / 2);
      let j = random() * FACTOR - (FACTOR / 2);
      let k = random() * FACTOR - (FACTOR / 2);
      triangles.push([x+f, y+g, (x-SIZE/2)+h, y+SIZE+k, x+SIZE/2+j, y+SIZE+f]);
    }
    
    triangles = shuffle(triangles).reverse();
    for (let i = 0; i < triangles.length; i++) {
      if (i%3 == 0) {
        blendMode(OVERLAY);
      } else {
        blendMode(BLEND);
      }     
      let c = colors[ Math.floor(random(0, colors.length)) ];
      fill(c);         
      triangle(...triangles[i]);
    }

  }
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}