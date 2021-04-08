// march 2021
// working on understanding how sine function works

const colors = ['#F15946', '#E01A4F', '#F9C22E', '#53B3CB'];
var blobs = [];
const edge = 10;
const Speed = 1;
const XScale = 100;
const YScale = 2.5;
const AngleScale = 60;

function setup () {
  createCanvas(windowWidth, windowHeight);
  xScale = width/(XScale * Speed);
  yScale = height/YScale;
  inc = PI /(AngleScale * Speed);
	
  centerX = width/2;
  centerY = height/2; 
  background(0);
}

function windowResized () { 
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  noStroke();
  fill(12, 9, 13, 15);
  rect(0,0,width,height);
  
  if (mouseIsPressed) {
    for (let i = 0; i < 3; i++) {
      let x = mouseX + random(-50,50);
      let initY = mouseY + random(-10,10);
      let dirY = random(-1,1) > 0;
      let dirX = random(-1,1) > 0;
      let aInc = PI / random(50,70);
      let a = aInc * random(0,5);
      let size = floor(random(3,10));

      let blob = {
        x, y: initY,
        lastX: x + (dirX ? xScale : -xScale),
        lastY: sin(dirY ? a : -a) * yScale + initY,
        initY,
        a,aInc,        
        dirX, dirY,size,
        color: colors[floor(random(colors.length))],        
      };
      blobs.push(blob);
    }
  }

  blobs.filter((blob) => {
    stroke(blob.color);
    strokeWeight(blob.size);
    
    x = blob.dirX ? blob.x + xScale: blob.x - xScale;   
    y = sin(blob.dirY ? blob.a : -blob.a) * yScale + blob.initY;
    blob.a += blob.aInc;

    blob.x = x;
    blob.y = y;   
    line(blob.x, blob.y, blob.lastX, blob.lastY);
    
    blob.lastX = blob.x;
    blob.lastY = blob.y;
    
    if (x < -edge || x > width+edge || y < -edge || y > height+edge) {
      return -1;
    } else {
      return 1;
    }

  });
}
