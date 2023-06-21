let seed = 1
let m
let circle1, circle2
let p

function setup() {
	m = min(window.innerWidth, window.innerHeight)
	createCanvas(window.innerWidth, window.innerHeight)

	circle1 = new LinesCircle(m * 0.7, 0)
	circle2 = new LinesCircle(m * 0.5, 0.7)

	p = createP('')

	// noLoop()
}

function draw() {
	background(0)
	translate(width / 2, height / 2)
	strokeWeight(2)
	stroke(255, 50)

	let w = mouseX / width
	let h = mouseY / width

	circle1.noiseOffset = w
	circle2.noiseOffset = h
	circle1.rotate = (w * PI) / 2

	circle1.drawShape()
	circle2.drawShape()

	// let circle1 = new LinesCircle(m * 0.7, 0).drawShape()
	// let circle2 = new LinesCircle(m * 0.5, 0.7).drawShape()
}

class LinesCircle {
	constructor(magScale, noiseOffset) {
		this.magScale = magScale
		this.mag = this.magScale
		this.noiseOffset = noiseOffset
		this.a = 0
		this.rotate = 0

		this.inc = TWO_PI / 299
		this.drawing = true
	}

	drawLine(a) {
		// this.mag = this.mag + map(noise(this.noiseFactor), 0, 1, -1, 1)
		let noiseFactor = abs(sin(a * 2)) + this.noiseOffset
		// without different offsets, multiple patterns will look the same,
		// they'll just be scaled larger or smaller depending on magnitude

		let mValue = noise(noiseFactor)
		this.mag = mValue * this.magScale

		let v = p5.Vector.fromAngle(a, this.mag)
		line(0, 0, v.x, v.y)

		// this.a += this.inc
	}

	drawShape() {
		strokeWeight(2)
		stroke(255, 50)

		push()
		rotate(this.rotate)
		let a = 0
		while (a < TWO_PI) {
			this.drawLine(a)
			a += this.inc
		}
		pop()
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
