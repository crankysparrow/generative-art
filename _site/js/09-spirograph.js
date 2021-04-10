var n = 0;
let base_angle = 0,
    inner_angle = 0,
    outer_angle = 0;
let base_inc, base_r, 
    inner_base_x, inner_base_y, 
    innerCircle, inner_inc, inner_r, inner_x, inner_y,
    outer_base_x, outer_base_y,
    outerCircle, outer_inc, outer_r, outer_x, outer_y;

function setupSpirograph() {
  base_inc = 0.1;
  base_r = min(width, height)/2;
  centerX = width / 2;
  centerY = height / 2;   
  
  // noStroke();
  // fill('#f28f3b');
  // circle(centerX, centerY, base_r);

  inner_r = base_r * innerCircle.innerCircleRatio;
  outer_r = base_r * outerCircle.outerCircleRatio; 

  // speed of 2nd circle rotation = base_inc - (outerRadius/innerRadius/ 100)
  inner_inc = base_inc - (base_r / inner_r) * base_inc;
  outer_inc = base_inc - (base_r / outer_r) * base_inc;

  inner_base_x = cos(base_angle) * (base_r - inner_r) / 2 + centerX;
  inner_base_y = sin(base_angle) * (base_r - inner_r) / 2 + centerY;
  inner_x = cos(inner_angle) * (inner_r - innerCircle.innerCircleOffset)/2 + inner_base_x;
  inner_y = sin(inner_angle) * (inner_r - innerCircle.innerCircleOffset)/2 + inner_base_y;  

  outer_base_x = cos(base_angle) * (base_r + outer_r) / 2 + centerX;
  outer_base_y = sin(base_angle) * (base_r + outer_r)/2 + centerY;
  outer_x = cos(outer_angle) * (outer_r - outerCircle.outerCircleOffset)/2 + outer_base_x;
  outer_y = sin(outer_angle) * (outer_r - outerCircle.outerCircleOffset)/2 + outer_base_y;
  // background(0);
}


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  innerCircle = new InnerCircle();
  let innerGui = new dat.GUI();
  innerGui.add(innerCircle, 'innerCircleRatio', 0, 1, 0.05).onChange(() => {
    inner_r = base_r * innerCircle.innerCircleRatio;
    inner_inc = base_inc - (base_r / inner_r) * base_inc;
  });
  innerGui.add(innerCircle, 'innerCircleOffset', 0, 100);
  innerGui.add(innerCircle, 'showInnerCircle');

  outerCircle = new OuterCircle();
  let outerGui = new dat.GUI();
  outerGui.add(outerCircle, 'outerCircleRatio', 0, 2, 0.05).onChange(() => {
    outer_r = base_r * outerCircle.outerCircleRatio; 
    outer_inc = base_inc - (base_r / outer_r) * base_inc;
  });
  outerGui.add(outerCircle, 'outerCircleOffset', -100, 100);
  outerGui.add(outerCircle, 'showOuterCircle');

  setupSpirograph();

  resetBtn = createButton('reset');
  resetBtn.position(20, 20);
  resetBtn.mousePressed(resetSpirograph);

  stopBtn = createButton('pause');
  stopBtn.position(20, 60);
  stopBtn.mousePressed(noLoop);

  playBtn = createButton('play');
  playBtn.position(20, 100);
  playBtn.mousePressed(loop);
}

function resetSpirograph() {
  noStroke();
  fill(255);
  rect(0, 0, width, height);
  // fill('#f28f3b');
  // circle(centerX, centerY, base_r);
  // noFill();
}

function InnerCircle() {
  this.innerCircleRatio = 0.45; 
  this.innerCircleOffset = 70;
  this.showInnerCircle = false;
}

function OuterCircle() {
  this.outerCircleRatio = 0.35;
  this.outerCircleOffset = 0;
  this.showOuterCircle = false;
}

function windowResized () { 
  resizeCanvas(windowWidth, windowHeight);
}

function draw() { 

  noFill();

  let inner_base_x = cos(base_angle) * (base_r - inner_r)/2  + centerX;
  let inner_base_y = sin(base_angle) * (base_r - inner_r)/2 + centerY;
  if (innerCircle.showInnerCircle) {
    stroke(color(88,139,139, 50));  
    strokeWeight(1);
    circle(inner_base_x, inner_base_y, inner_r);
  }

  let new_inner_x = cos(inner_angle) * (inner_r - innerCircle.innerCircleOffset)/2 + inner_base_x;
  let new_inner_y = sin(inner_angle) * (inner_r - innerCircle.innerCircleOffset)/2 + inner_base_y;
  stroke('#C8553D');
  strokeWeight(2);
  line(inner_x, inner_y, new_inner_x, new_inner_y);
  inner_x = new_inner_x;
  inner_y = new_inner_y;

  outer_base_x = cos(base_angle) * (base_r + outer_r)/2 + centerX;
  outer_base_y = sin(base_angle) * (base_r + outer_r)/2 + centerY;  
  if (outerCircle.showOuterCircle) {
    stroke(color(88,139,139, 50));  
    strokeWeight(1);
    circle(outer_base_x, outer_base_y, outer_r);
  }

  let new_outer_x = cos(outer_angle) * (outer_r - outerCircle.outerCircleOffset)/2 + outer_base_x;
  let new_outer_y = sin(outer_angle) * (outer_r - outerCircle.outerCircleOffset)/2 + outer_base_y;
  stroke('#C8553D');
  strokeWeight(2);
  line(outer_x, outer_y, new_outer_x, new_outer_y);
  outer_y = new_outer_y;
  outer_x = new_outer_x;

  base_angle += base_inc;
  inner_angle += inner_inc;    
  outer_angle += outer_inc;

}


function fixedDraw() {
  points = [];
  for (let i = 0; i < 150; i++) {

    let c1_x = cos(c1_angle) * (radius - c1_r) / 2 + centerX;
    let c1_y = sin(c1_angle) * (radius - c1_r) / 2 + centerY;
    circle(c1_x, c1_y, c1_r);
    let c2_x = cos(c2_angle) * (c1_r - 50)/2 + c1_x;
    let c2_y = sin(c2_angle) * (c1_r - 50)/2 + c1_y;
    c1_angle += c1_inc;
    c2_angle += c2_inc;    
    points.push([c2_x, c2_y]);
  }   
  stroke('#820263');

  beginShape();
  for (let i = 0; i < points.length; i++) {
    curveVertex(points[i][0], points[i][1]); 
  }

  endShape();  
}


// function setup() {
//   createCanvas(window.innerWidth, window.innerHeight);
//   c1_angle = 0;
//   c1_inc = 1;
//   // c1_r = 200;  

//   c2_angle = 0;
//   c2_inc = 3;
//   background(0);
//   let d = min(width, height);
//   let edge = d / 10;
//   let radius = d - edge * 2;
//   let centerX = width / 2;
//   let centerY = height / 2;    
//   let c1_r = radius / 2;
//   // circle(centerX, centerY, radius);

//   points = [];
//   for (let i = 0; i < 150; i++) {

//     let c1_x = cos(c1_angle) * (radius - c1_r) / 2 + centerX;
//     let c1_y = sin(c1_angle) * (radius - c1_r) / 2 + centerY;
//     // circle(c1_x, c1_y, c1_r);
//     let c2_x = cos(c2_angle) * (c1_r)/2 + c1_x;
//     let c2_y = sin(c2_angle) * (c1_r)/2 + c1_y;
//     c1_angle += c1_inc;
//     c2_angle += c2_inc;    
//     points.push([c2_x, c2_y]);
//   }  

//   // noLoop();
// }

// function windowResized () { 
//   resizeCanvas(windowWidth, windowHeight);
// }

// function draw() { 
//   // background(0);
//   noFill();
//   stroke(color(251, 139, 36, 50));  

//   // let d = min(width, height);
//   // let edge = d / 10;
//   // let radius = d - edge * 2;
//   // let centerX = width / 2;
//   // let centerY = height / 2;    
//   // circle(centerX, centerY, radius);

//   // circle(c3X, c3Y, c1_r);

//   // circle(c4X, c4Y, 10);

 
//   stroke('#820263');
//   // beginShape();
//   if (n < points.length-1) {
//     line(points[n][0], points[n][1], points[n+1][0], points[n+1][1]);
//     n++;
//     // curveVertex(points[i][0], points[i][1]); 
//   } else {
//     // endShape();
//   }



//   // for (let i = 0; i < points.length; i++) {
//   //   curveVertex(points[i][0], points[i][1]);
//   // }
//   // endShape();

// }