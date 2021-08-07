// feb 2021
let circles

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    circles = new Circles()
    circles.makeCircles()

    let gui = new dat.GUI({ name: 'bouncy circle particles' })
    gui.width = 300
    gui.add(circles, 'upperLimitVelocity', 0, 100)
    let numController = gui.add(circles, 'numberOfCircles', 0, 500, 1)
    let noiseScaleController = gui.add(circles, 'noiseScale', 0, 1, 0.01)
    gui.add(circles, 'circleSize', 1, 100)

    numController.onChange(() => {
      circles.redoCircles()
    })
  }
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
  
  
  // Render loop that draws shapes with p5
  function draw() {
    background(255); 
    stroke(0);
    fill(0);
    
    circles.updateCircles()
  }
  
  class Circles {
    constructor() {
      this.upperLimitVelocity = 10
      this.numberOfCircles = 100
      this.noiseScale = 0.2
      this.circleSize = 30
      this.items = []
    }

    redoCircles() {
      this.items = []
      this.makeCircles()
    }

    makeCircles() {
      for (let i = 0; i < this.numberOfCircles; i++) {
        let n = i * random()
        let vel = createVector(0,0)
        let xPos = true
        let yPos = true
        let loc = createVector(random(width), random(height))
        let currentCircle = {
          vel, xPos, yPos, loc
        }
        this.items.push(currentCircle)
      }
    }

    updateCircles() {
      this.items.forEach((item, i) => {
        ellipse(item.loc.x, item.loc.y, this.circleSize, this.circleSize)

        let noiseGen = createVector(0.1 * i, 0.3 * i)
        let acceleratorX = noise(noiseGen.x) * this.noiseScale - (this.noiseScale / 2)
        let acceleratorY = noise(noiseGen.y) * this.noiseScale - (this.noiseScale / 2)
        let accelerator = createVector(acceleratorX, acceleratorY)

        item.vel.add(accelerator)
        item.vel.limit(this.upperLimitVelocity)

        if (item.xPos) {
          item.loc.x += item.vel.x
        } else {
          item.loc.x -= item.vel.x
        }

        if (item.yPos) {
          item.loc.y += item.vel.y
        } else {
          item.loc.y -= item.vel.y
        }

        if (item.loc.x > width || item.loc.x < 0) {
          item.xPos = !item.xPos
        }

        if (item.loc.y > height || item.loc.y < 0) {
          item.yPos = !item.yPos
        }
      })
    }
  }
  
  // old single circle constructor, not using this one
  class Circle {
    constructor(n) {
      this.n = n * random();
      this.vel = createVector(0, 0);
      this.xPos = true;
      this.yPos = true;
      this.loc = createVector(random(width), random(height));
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