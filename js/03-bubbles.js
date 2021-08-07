function setup() {
    createCanvas(windowWidth, windowHeight);
    position = createVector(0, 0);
    velocity = createVector(1, 1);
  
    
    small = new Circle(50, 0.5, 6, '#028090', BLEND);
    big = new Circle(200, 0.3, 3, 25, ADD);
    middle = new Circle(100, 0.4, 10, '#1D1128', OVERLAY);
    
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
  
  
  // Render loop that draws shapes with p5
  function draw() {
    
    blendMode(BLEND);
    background('#114B5F');
    noStroke();
    fill(0);
    
  
    small.update();
    big.update();
    middle.update();
  }
  
  class Circle {
    constructor(r, scale, limit, fill, blend) {
      this.vel = createVector(0, 0);
      this.xPos = true;
      this.yPos = true;
      this.loc = createVector(10, 10);
      this.upperRadiusLimit = r * 1.5;
      this.lowerRadiusLimit = r * 0.5;
      this.r = r;
      this.scale = scale;
      this.limit = limit;
      this.fill = fill;
      this.rUp = true;
      this.blend = blend;
    }
    
    update() {
      
      blendMode(this.blend);    
      fill(this.fill);
      circle(this.loc.x, this.loc.y, this.r);
      
      let mouse = createVector(mouseX, mouseY);
      let mouseVector = mouse.sub(this.loc);
      mouseVector.normalize();
      mouseVector.mult(this.scale);
      
      this.vel.add(mouseVector);
      this.vel.limit(this.limit);
      this.loc.add(this.vel);
      
  //     if (this.xPos) {
  //       this.loc.x += this.vel.x;
  //     } else {
  //       this.loc.x -= this.vel.x;
  //     }
      
  //     if (this.yPos) {
  //       this.loc.y += this.vel.y;
  //     } else {
  //       this.loc.y -= this.vel.y;
  //     }
      
  //     if (this.loc.x > width || this.loc.x < 0) {
  //       this.xPos = !this.xPos;
  //     }
      
  //     if (this.loc.y > height || this.loc.y < 0) {
  //       this.yPos = !this.yPos;
  //     }
      
      if (this.rUp) {
        this.r += noise(mouseX);          
      } else {
        this.r -= noise(mouseX);
      }
      
      if (this.r > this.upperRadiusLimit) {
        this.rUp = false;
      } else if (this.r < this.lowerRadiusLimit) {
        this.rUp = true;
      }    
    }
  }