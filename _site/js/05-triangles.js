// feb 2021

const SIZE = 110;
const FACTOR = 50;

let n = 0.1
let n2 = 1.2
let n3 = 2.3
let n4 = 3.4
let n5 = 4.1
let noiseStep = 0.01

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  redraw()
}

function draw() {

  blendMode(BLEND)
  noStroke();
  let colors = ['#C5FFFD', '#0DA8AB', '#7F2178', '#B143A8'];
  background(colors[0])

  n += noiseStep
  n2 += noiseStep
  n3 += noiseStep
  n4 += noiseStep
  n5 += noiseStep
  
  let triangles = [];
  blendMode(MULTIPLY)
  fill(colors[3])
  
  let i = 0
  for (let y = SIZE/2; y <= height - SIZE*2; y+= SIZE) {
    for (let x = SIZE; x <= width - SIZE; x+= SIZE) { 

      i++
      let noiseAdd = 0

      let f = (noise( noiseAdd + n )  * FACTOR) - (FACTOR / 2);
      let g = (noise( noiseAdd + n2 ) * FACTOR) - (FACTOR / 2);
      let h = (noise( noiseAdd + n3 ) * FACTOR) - (FACTOR / 2);
      let j = (noise( noiseAdd + n2 ) * FACTOR) - (FACTOR / 2);
      let k = (noise( noiseAdd + n4 ) * FACTOR) - (FACTOR / 2);
      let l = (noise( noiseAdd + n5 ) * FACTOR) - (FACTOR / 2);

        triangle(x-SIZE/2+f, y+SIZE/2+g, x+SIZE/2+h, y+SIZE/2+j, x+k, y+SIZE*1.5+l)

    }
  }
    
  fill(colors[1])
  i = 0
  for (let y = SIZE; y <= height-SIZE*2; y+= SIZE) {
    for (let x = SIZE*1.5; x<= width - SIZE; x+= SIZE) {

      i++
      let noiseAdd = 0

      let f = (noise(noiseAdd+n) * FACTOR) - (FACTOR / 2);
      let g = (noise(noiseAdd+n2) * FACTOR) - (FACTOR / 2);
      let h = (noise(noiseAdd+n3) * FACTOR) - (FACTOR / 2);
      let j = (noise(noiseAdd+n2) * FACTOR) - (FACTOR / 2);
      let k = (noise(noiseAdd+n4) * FACTOR) - (FACTOR / 2);
      let l = (noise(noiseAdd+n5) * FACTOR) - (FACTOR/2);
      triangle(x+f, y+g, (x-SIZE/2)+h, y+SIZE+k, x+SIZE/2+j, y+SIZE+l)
    }

  }
    
    // triangles = shuffle(triangles);
    // // for (let i = 0; i < triangles.length; i++) {
    // //   fill(colors[2])
    // //   triangle(...triangles[i]);
    // }

  }


