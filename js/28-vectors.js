let cnv
let mag = 70
let constraint = 100
let inc = 0.01
let noiseFactor = 0
let a

let div

let circle1
let circle2

function setup() {
	let sheet = window.document.styleSheets[0]
	sheet.insertRule(
		'main {display: flex; align-items: center; justify-content: center;}',
		sheet.cssRules.length
	)
	createCanvas(window.innerWidth * 0.7, window.innerHeight * 0.7)
	background(0)

	div = createDiv().position(window.innerWidth * 0.15, window.innerHeight * 0.88)

	noLoop()
	circle1 = new LinesCircle(width / 4, 0)
	circle2 = new LinesCircle(width / 2, 0.7)
}

function draw() {
	translate(width / 2, height / 2)
	strokeWeight(2)
	stroke(255, 50)

	circle1.drawShape()
	circle2.drawShape()

	// if (circle1.drawing) {
	// 	circle1.drawLine()
	// } else if (circle2.drawing) {
	// 	circle2.drawLine()
	// }
}

class LinesCircle {
	constructor(magScale, noiseOffset) {
		this.magScale = magScale
		this.mag = this.magScale
		this.noiseOffset = noiseOffset
		this.a = 0

		this.inc = 0.007
		this.drawing = true
	}

	drawLine() {
		// this.mag = this.mag + map(noise(this.noiseFactor), 0, 1, -1, 1)
		let noiseFactor = abs(sin(this.a * 2)) + this.noiseOffset

		let mValue = noise(noiseFactor)
		this.mag = mValue * this.magScale

		let v = p5.Vector.fromAngle(this.a, this.mag)
		line(0, 0, v.x, v.y)

		this.a += this.inc

		div.html(`noiseFactor: ${noiseFactor}<br/>mValue: ${mValue}`)
	}

	drawShape() {
		while (this.a < TWO_PI) {
			this.drawLine()
		}
	}
}

function windowResized() {
	resizeCanvas(window.innerWidth * 0.7, window.innerHeight * 0.7)
}
