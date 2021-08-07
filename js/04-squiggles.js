// feb 2021
// inspiration https://levelup.gitconnected.com/generative-art-3-fundamental-concepts-to-get-you-started-44205dae167b

const STEP = 30;
const VARIANCE_FACTOR = 85;
const NOISE_STEP = 1;
const tones = [
  [[65, 75], [60, 100], [50, 100]],
  [[50, 58], [70, 90], [80, 100]]
];

function setup(){
  createCanvas(windowWidth, windowHeight);

  colorMode(HSB, 100)

  let div = createDiv('inspiration: <a href="https://levelup.gitconnected.com/generative-art-3-fundamental-concepts-to-get-you-started-44205dae167b" target="_blank">3 fundamental generative art concepts</a>')
  div.position(10, 20)
  div.style('width', '300px')
  div.style('background-color', 'white')
  noLoop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  redraw()
}

function randomColor(tones) {
  let tone = tones[Math.floor(random(tones.length))];
  let c = color(random(tone[0][0], tone[0][1]), random(tone[1][0], tone[1][1]), random(tone[2][0], tone[2][1]));
  return c
}

class Squiggles {
  constructor() {
    this.stepX = 20 // distance between points on each squiggle
    this.stepY = 50 // distance in px between squiggly lines
    this.varianceFactor = 75 // controls the max possible height of the squiggles at their most squiggly
    this.exponent = 2 // controls how how much the squiggles flatten out on each end

    this.lines = []
    this.squiggleWidth = min(width * 0.8, 800)

    this.xStart = 0
    this.xEnd = width

    this.calculateStartEndX()
    this.makeLines()
    this.drawLines()
  }

  calculateStartEndX() {
    let howManySteps = Math.floor(this.squiggleWidth / this.stepX)
    this.squiggleWidth = howManySteps * this.stepX

    let whiteSpace = width - this.squiggleWidth
    this.xStart = whiteSpace / 2
    this.xEnd = width - (whiteSpace / 2)
  }

  makeLines() {
    for (let i = this.varianceFactor + 20; i < height - 20; i += this.stepY ) {
      this.lines.push(this.makeSingleLine(i))
    }
  }

  makeSingleLine(y) {
    let line = []
    line.push({ x: this.xStart, y: y })
    for (let j = this.xStart + this.stepX; j < this.xEnd; j += this.stepX) {
      let distanceToCenter = Math.abs(j - this.xStart - this.squiggleWidth/2)
      let distancePercent = 1 - (distanceToCenter/(this.squiggleWidth/2))
      let variance = this.varianceFactor * pow(distancePercent, this.exponent)

      let shapeHeight = max(random() * variance, 6 * distancePercent)
      line.push({ x: j, y: y - shapeHeight })
    }
    line.push({ x: this.xEnd, y: y })
    return line
  }

  drawLines() {
    this.lines.forEach((line, i) => {
      let c = randomColor(tones)
      fill(c)
      stroke(c)

      beginShape()
        curveVertex(line[0].x, line[0].y)
        line.forEach((point, i) => {
          curveVertex(point.x, point.y)
        })
        curveVertex(line[line.length-1].x, line[line.length-1].y)
      endShape()
    })
  }
}

function draw() {
  background(random(65, 75), 10, 100);

  noFill()
  strokeWeight(3)
  let squiggles = new Squiggles()

}

