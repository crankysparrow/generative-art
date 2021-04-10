// const PALETTE = ['#2a2b5f', '#393c83', '#3dc4d0', '#44d9e6'];
// const PALETTE = [ '#f73c38', '#ed884a', ];
let COL1, COL2;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    noLoop();

  saveBtn = createButton('save');
  saveBtn.mousePressed(saveCanvas);


  COL2 = color('#073861');
  COL1 = color('#89fdbb');
  colorMode(HSB);

}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  let h = hue(COL2);
  let s = saturation(COL2);
  let b = brightness(COL2);
  let newCol = color(h, s, b - 20);
  background(newCol);
  rectMode(CENTER);
  angleMode(DEGREES);

  let m = min(width, height) - 50;

  translate((width - m) / 2, (height-m)/2);
  let space = m / 40;
  let side = space;
  noFill();


  for (let x = space / 2; x < m; x += space) {
    let distanceToCenterX = abs(x - (m/2));
    push();
      translate(x, 0);
      for (let y = space / 2; y < m; y += space) {
        let distanceToCenterY = abs(y - (m/2));
        let variance = max( (m * 0.65) - (distanceToCenterX + (distanceToCenterY)), 0);
        let r = random(-1,1) * variance * 0.1;
        stroke(lerpColor(COL1, COL2, variance/(m/2) ));
        push();
          translate(0, y);
          rotate(r);
          rect(0, 0, side, side);
        pop();
      }
    pop();
  }

}