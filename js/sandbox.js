let shapes = []
let cellSize = 200
let m
let p
let url = 'https://coolors.co/98cf02-6d56f0-2d57f1-eebb01-f82b02-f45e01'
let palette

function paletteFromUrl(url) {
	return url
		.split('coolors.co/')
		.slice(1)[0]
		.split('-')
		.map((c) => '#' + c)
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	rectMode(CENTER)
	strokeCap(SQUARE)

	m = floor(min(width, height) / cellSize) * cellSize
	palette = paletteFromUrl(url)

	for (let y = cellSize / 2; y < m; y += cellSize) {
		for (let x = cellSize / 2; x < m; x += cellSize) {
			shapes.push(new Shape(x, y, 100, 60))
		}
	}
}

function draw() {
	background(0)
	translate((width - m) / 2, (height - m) / 2)

	for (let i = 0; i < shapes.length; i++) {
		stroke(255)
		noFill()
		strokeWeight(1)
		rect(shapes[i].center.x, shapes[i].center.y, cellSize, cellSize)

		noStroke()
		shapes[i].update()
		shapes[i].show()
	}
}

class Shape {
	constructor(x, y, w, h) {
		this.center = createVector(x, y)
		this.w = w
		this.h = h
		this.col = color(random(palette))

		this.xMin = this.center.x - cellSize / 2 + (width - m) / 2
		this.xMax = this.center.x + cellSize / 2 + (width - m) / 2
		this.yMin = this.center.y - cellSize / 2 + (height - m) / 2
		this.yMax = this.center.y + cellSize / 2 + (height - m) / 2

		this.quarters = [
			createVector(this.center.x - cellSize / 4, this.center.y - cellSize / 4),
			createVector(this.center.x + cellSize / 4, this.center.y - cellSize / 4),
			createVector(this.center.x - cellSize / 4, this.center.y + cellSize / 4),
			createVector(this.center.x + cellSize / 4, this.center.y + cellSize / 4),
		]

		this.angle = 0
		this.angleVel = 0

		this.arcs = []
		this.lines = []
		this.littleLines = []

		this.translateXDir = random() > 0.5 ? -1 : 1
		this.translateYDir = random() > 0.5 ? -1 : 1

		this.mouse = false

		let possibleLines = [
			// { vec: createVector(x - cellSize * 0.125, y), angle: 0 },
			// { vec: createVector(x + cellSize * 0.125, y), angle: 0 },
			// { vec: createVector(x, y + cellSize * 0.125), angle: PI / 2 },
			// { vec: createVector(x, y - cellSize * 0.125), angle: PI / 2 },
			{ vec: createVector(this.center.x, this.center.y - cellSize * 0.25), angle: PI / 2 },
			{ vec: createVector(this.center.x, this.center.y + cellSize * 0.25), angle: PI / 2 },
			{ vec: createVector(this.center.x - cellSize * 0.25, this.center.y), angle: 0 },
			{ vec: createVector(this.center.x + cellSize * 0.25, this.center.y), angle: 0 },
		]
		let line = random(possibleLines)
		this.lines.push(new Line(line.vec, cellSize, line.angle))

		for (let i = 0; i < 4; i++) {
			let r = random(0, 1)

			this.arcs.push(new Arc(this.quarters[i], cellSize / 2, random([0, PI * 0.5, PI, PI * 1.5])))

			if (r >= 0.5) {
				// this.arcs.push(new Arc(this.quarters[i], random([40, 60, 70]), random([0, PI * 0.5, PI, PI * 1.5])))
				this.arcs.push(new Arc(this.quarters[i], cellSize / 2, random([0, PI * 0.5, PI, PI * 1.5])))
			}
			if (r >= 0.4) {
				this.littleLines.push(new Line(this.quarters[i], cellSize * 0.3, random([-PI / 4, PI / 8, PI / 4])))
			}
		}
	}

	mouseIsOver() {
		if (mouseX === 0) {
			return false
		}
		if (mouseX > this.xMin && mouseX < this.xMax && mouseY > this.yMin && mouseY < this.yMax) {
			return true
		}
	}

	update() {
		if (this.mouseIsOver()) {
			this.angleVel = min(this.angleVel + 0.002, 0.1)
			this.mouse = true
		} else if (this.angleVel > 0) {
			this.mouse = false
			this.angleVel -= 0.0001
		} else {
			this.mouse = false
			this.angleVel = 0
		}

		this.angle += this.angleVel
	}

	//prettier-ignore
	show() {
		noStroke()


		push()
			translate(this.center)
			if ( this.mouse ) {
				fill(255, 255, 255, 200)
			} else {
				// fill(0,0,0,255)
			}
			rect(0, 0, cellSize, cellSize)
			push()
				scale(1 + this.angleVel * 5)
				this.col.setAlpha(map(this.angleVel, 0, 0.2, 200, 255))
				translate( cellSize * this.angleVel * this.translateXDir, cellSize * this.angleVel * this.translateYDir)
				fill(this.col)
				rect(0, 0, this.w, this.h)
			pop()
		pop()

		for (let i = 0; i < this.arcs.length; i++) {
			this.arcs[i].show()
		}
		for (let i = 0; i < this.lines.length; i++) {
			this.lines[i].show()
		}
		for (let i = 0; i < this.littleLines.length; i++) {
			this.littleLines[i].angle += this.angleVel * (i+1) * 0.2 * this.littleLines[i].angleDir
			this.littleLines[i].show()
		}

	}
}

class Line {
	constructor(center, h, angle) {
		this.center = center
		this.height = h
		this.angle = angle
		this.col = random(palette)
		this.angleDir = random() < 0.5 ? -1 : 1
	}

	show() {
		push()
		noStroke()
		fill(this.col)
		translate(this.center)
		rotate(this.angle)
		rect(0, 0, 10, this.height)
		pop()
	}
}

class Arc {
	constructor(center, size, angle) {
		this.center = center
		this.size = size
		this.angle = angle ?? random(0, TAU)
		this.circ = random([PI / 2, PI])
		this.col = random(palette)
	}

	show() {
		stroke(this.col)
		strokeWeight(5)
		noFill()
		push()
		translate(this.center)
		rotate(this.angle)
		arc(0, 0, this.size, this.size, 0, this.circ)
		pop()
	}
}
