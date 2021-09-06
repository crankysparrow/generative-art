// inspiration: https://observablehq.com/@motiondesign_01/loop-ii
// creating patterns
// using noise to modify the pattern and maintain some consistency across multiple axes

let sketchSize = 0.8
let cSize = 58
let xInt = 60
let yInt = 60
let circles = []
let w, h
let n = 0.01
let hueN = 0.003
let freq = 0.01

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)

	colorMode(HSB)

	w = width * sketchSize
	h = height * sketchSize

	for (let x = 1; x < w; x += xInt) {
		for (let y = 1; y < h; y += yInt) {
			circles.push(new Circle(x, y, cSize))
		}
	}
}

function draw() {
	background('#111')

	fill('#fff')
	noStroke()

	let w = width * sketchSize
	let h = height * sketchSize

	translate((width - w) / 2, (height - h) / 2)

	circles.forEach((circ) => {
		circ.doCircle()
	})
}

function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight)
}

class Circle {
	constructor(x, y, baseSize) {
		this.x = x
		this.y = y
		this.baseSize = baseSize
	}

	doCircle() {
		let size = noise(this.x * n, this.y * n, freq * millis() * 0.02) * this.baseSize

		// let hu = noise(this.y * hueN, this.x * hueN, freq * millis() * 0.001) * 360 * 3 - 360
		// let col = color(hu, 100, 100)

		circle(this.x, this.y, size)
	}
}
