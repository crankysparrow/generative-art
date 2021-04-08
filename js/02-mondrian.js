// Create a new canvas to the browser size
// feb 2021

function setup() {
    createCanvas(windowWidth, windowHeight);
    moveLeft = true;
    
    yy1 = 0.4;
    yy2 = 0.6;
    yy3 = 0.8;
    
    yy01 = 0.07;
    yy02 = yy2 + 0.08;
    
    xx1 = 0.25;
    xx2 = 0.9;
    xx3 = 0.125;
    xx4 = 0.75;
    
    x1 = width * xx1;
    x2 = width * xx2;
    x3 = width * xx3;
    x4 = width * xx4;
    
    y1 = height * yy1;
    y2 = height * yy2;
    y3 = height * yy3;
    y01 = height * yy01;
    y02 = height * yy02;  
    
  }
  
  // On window resize, update the canvas size
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    x2 = width * xx2;
    x3 = width * xx3;
    x4 = width * xx4;
    
    y2 = height * yy2;
    y3 = height * yy3;
    y01 = height * yy01;
    y02 = height * yy02;
  
  }
  
  
  // Render loop that draws shapes with p5
  function draw() {
    
    y1 = mouseY;
    y2 = y1 + ((height - y1) * 0.3);
    y3 = y2 + ((height - y1) * 0.3);
    y02 = y2 + (height * 0.05);
    x1 = mouseX / 2;
    x3 = mouseX / 4;
    x2 = (((width - mouseX) / 4) * 3) + mouseX;
    x4 = mouseX + ((width - mouseX) / 2);
  
    
    background(255); 
  
    
    noStroke();
    // red 
    fill(204, 43, 48);
    rect(x1, 0, width - x1, y1);
    
    // blue
    fill(44, 98, 160);
    rect(x4, y3, width - x4, height);
    
    // yellow
    fill(255, 215, 112);
    rect(0, y2, x3, height - y2);
    
    // black top
    fill(0);
    rect(0, 0, x1, y01);
    // black small 
    rect(0, y2, x3, y02 - y2);
    // rect(0, 350, 50, 40);
  
    stroke(0);
    strokeCap(SQUARE);
    strokeWeight(10);
  
    // vertical 
    line(x1, 0, x1, height);
    line(x4, y3, x4, height);
    line(x2, y1, x2, y3);
    line(x3, y2, x3, height);
    
    // horizontal
    line(x1, y1, width, y1);
    line(0, y2, width, y2);
    line(x1, y3, width, y3);
    
  }