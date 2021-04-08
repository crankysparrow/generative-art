// feb 2021

function setup() {
    createCanvas(windowWidth, windowHeight);
    loc = createVector(10, 10);
    vel = createVector(0, 0);
    noiseGen = createVector(0, 0);
    noiseStep = createVector(0.01, 0.03);
    noiseScale = 0.2;
    xPos = true;
    yPos = true;
    
    circles = [];
    for (let i = 0; i < 10; i++) {
      circles.push(new Circle(i));
    }
  }
  
  // On window resize, update the canvas size
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  
  }
  
  
  // Render loop that draws shapes with p5
  function draw() {
  
    background(255); 
    
    stroke(0);
    fill(0);
    
    noiseGen.add(noiseStep);
    
    circles.forEach((circle) => {
      circle.update();
    });
  
  }
  
  
  class Circle {
    constructor(n) {
      this.n = n * random();
      this.vel = createVector(0, 0);
      this.xPos = true;
      this.yPos = true;
      this.loc = createVector(10, 10);
      this.noiseGen = createVector(0.1 * n, 0.3 * n);
    }
    
    update() {
      
      ellipse(this.loc.x, this.loc.y, 10, 10);
      let randomX = noise(this.noiseGen.x) * noiseScale - 0.1;
      let randomY = noise(this.noiseGen.y) * noiseScale - 0.1;
      
      let randomAcc = createVector(randomX, randomY);
      
      this.vel.add(randomAcc);
      this.vel.limit(3);
      
      if (this.xPos) {
        this.loc.x += this.vel.x;
      } else {
        this.loc.x -= this.vel.x;
      }
      
      if (this.yPos) {
        this.loc.y += this.vel.y;
      } else {
        this.loc.y -= this.vel.y;
      }
      
      if (this.loc.x > width || this.loc.x < 0) {
        this.xPos = !this.xPos;
      }
      
      if (this.loc.y > height || this.loc.y < 0) {
        this.yPos = !this.yPos;
      }
    }
  }