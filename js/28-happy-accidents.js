let seed = 1
let m

function setup() {
	m = min(window.innerWidth, window.innerHeight)
	createCanvas(window.innerWidth, window.innerHeight)

	noLoop()
}

function draw() {
	background(0)
	translate(width / 2, height / 2)
	strokeWeight(2)
	stroke(255, 50)

	let circle1 = new LinesCircle(m * 0.7, 0).drawShape()
	let circle2 = new LinesCircle(m * 0.5, 0.7).drawShape()
}

class LinesCircle {
	constructor(magScale, noiseOffset) {
		this.magScale = magScale
		this.mag = this.magScale
		this.noiseOffset = noiseOffset
		this.a = 0

		this.inc = TWO_PI / 600
		this.drawing = true
	}

	drawLine() {
		// this.mag = this.mag + map(noise(this.noiseFactor), 0, 1, -1, 1)
		let noiseFactor = abs(sin(this.a * 2)) + this.noiseOffset
		// without different offsets, multiple patterns will look the same,
		// they'll just be scaled larger or smaller depending on magnitude

		let mValue = noise(noiseFactor)
		this.mag = mValue * this.magScale

		let v = p5.Vector.fromAngle(this.a, this.mag)
		line(0, 0, v.x, v.y)

		this.a += this.inc
	}

	drawShape() {
		while (this.a < TWO_PI) {
			this.drawLine()
		}

		if (this.a >= TWO_PI) {
			console.log('this.a: ', this.a)
		}
	}
}

function windowResized() {
	m = min(window.innerWidth, window.innerHeight)
	resizeCanvas(window.innerWidth, window.innerHeight)
	// redraw()
}

function mousePressed() {
	seed++
	noiseSeed(seed)
	redraw()
}
