
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);
    colorMode(HSB);
  
    col1 = color(171,52,93);  
    col2 = color(34,100,94);
  
    noLoop();
  
  }
  
  function windowResized() {
  
    resizeCanvas(window.innerWidth, window.innerHeight);
    background(0);
    redraw();
  
  }
  
  function draw() {
  
    strokeWeight(1);
    noFill();
  
    let side = Math.floor(min(width, height)) - 100;
    if (side % 10 > 0) {
      side -= side%10;
    }
    
    translate((width-side)/2, (height-side)/2);
    let step = side/10;
  
    let longestLine = Math.sqrt(Math.pow(side,2) + Math.pow(side,2));
    
    for (let x = step; x <= side; x += step) {
      for (let y = step; y <= side; y += step) {
        let r = (x+y)/(side*2);
        let current =  lerpColor(col1, col2, r);
        let d = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
        current.setAlpha(1-easeInSine(d/longestLine));
  
        stroke( current );
  
        line(x, 0, 0, y);
  
        // line(x,side,side,y);
      }
    }
  
    rotate(PI);
    translate(-side, -side);
      
    for (let x = step; x <= side; x += step) {
      for (let y = step; y <= side; y += step) {
        let r = (x+y)/(side*2);
        let current =  lerpColor(col1, col2, r);
        let d = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
        current.setAlpha(1-easeInSine(d/longestLine));
  
        stroke( current );
  
        line(x, 0, 0, y);
  
        // line(x,side,side,y);
      }
    }
  
    // for (let x = side-step; x >= 0; x -= step) {
    //   for (let y = side-step; y >= 0; y -= step) {
    //     let r = (x+y)/(side*2);
  
    //     let current =  lerpColor(col2, col1, r);
    //     let d = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
    //     current.setAlpha(easeInSine(d/longestLine));
    //     stroke(current);
  
    //     line(x, side, side, y);
    //   }
    // }
  
  }
  
  function makeLines() {
    let res = {}
    let lines = [];
  
    let side = Math.floor(min(width, height)) - 100;
    if (side % 10 > 0) {
      side -= side%10;
    }
    
    res.side = side;
    // translate((width-side)/2, (height-side)/2);
    let step = side/10;
  
    let longestLine = Math.sqrt(Math.pow(side,2) + Math.pow(side,2));
    
    for (let x = step; x <= side; x += step) {
      for (let y = step; y <= side; y += step) {
        let r = (x+y)/(side*2);
        let current =  lerpColor(col1, col2, r);
  
        let d = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
        current.setAlpha(1-easeInSine(d/longestLine));
  
        // stroke( current );
        lines.push({
          x1: x,
          y1: 0,
          x2: 0,
          y2: y,
          c: current
        });
  
        // line(x, 0, 0, y);
        // line(x,side,side,y);
      }
    } 
  
    res.lines = lines;
    return res;
  }
  
  
  function easeInSine(x) {
    return 1 - cos((x * PI) / 2);
  }
  