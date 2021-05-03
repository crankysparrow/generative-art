// var inc = 0.03
// var zInc = 0.003
// var magnitude = 0.5
var scl = 5
var zoff = 0
// var cols, rows
var particles = []
var flowfield
var buttonObj

var fr

function FlowField() {
	this.zInc = 0.003
	this.magnitude = 10
	this.inc = 0.03
	this.cols = floor(width / scl)
	this.rows = floor(height / scl)
	this.field = new Array(this.cols * this.rows)
	this.circleMultiplier = 4

	this.updateField = function () {
		zoff += this.zInc
		for (let y = 0; y < this.rows; y++) {
			for (let x = 0; x < this.cols; x++) {
				var index = x + y * this.cols
				let angle =
					noise(x * this.inc, y * this.inc, zoff) *
					TWO_PI *
					this.circleMultiplier
				var v = p5.Vector.fromAngle(angle)
				v.setMag(this.magnitude)
				this.field[index] = v
				// drawVector(v, x, y)
			}
		}
	}
}

function setup() {
	createCanvas(600, 600)
	strokeCap(SQUARE)

	flowfield = new FlowField()
	flowfield.updateField()

	let gui = new dat.GUI()
	gui.add(flowfield, 'magnitude', 0, 10)
	gui.add(flowfield, 'inc', 0, 1)
	gui.add(flowfield, 'circleMultiplier', 1, 100)
	buttonObj = {
		clear: function () {
			background(0)
		},
	}
	gui.add(buttonObj, 'clear')

	background(0)

	fr = createP('')

	for (let i = 0; i < 1000; i++) {
		particles[i] = new Particle()
	}
}

function drawVector(v, x, y) {
	stroke(0, 50)
	push()
	translate(x * scl, y * scl)
	rotate(v.heading())
	strokeWeight(1)
	line(0, 0, scl, 0)
	pop()
}

function draw() {
	flowfield.updateField()
	strokeWeight(1)
	for (let i = 0; i < particles.length; i++) {
		particles[i].follow(flowfield.field)
		particles[i].update()
		particles[i].show()
		particles[i].edges()
	}

	fr.html(floor(frameRate()))
}

function Particle() {
	this.pos = createVector(random(0, width), random(0, height))
	this.vel = createVector(0, 0)
	this.acc = createVector(0, 0)
	this.maxspeed = 3
	this.prevPos = this.pos.copy()

	this.update = function () {
		this.prevPos = this.pos.copy()
		this.vel.add(this.acc)
		this.vel.limit(this.maxspeed)
		this.pos.add(this.vel)
		this.acc.mult(0)
	}

	this.applyForce = function (force) {
		this.acc.add(force)
	}

	this.show = function () {
		stroke(255, 5)
		line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
	}

	this.updatePrevious = function () {
		this.prevPos.x = this.pos.x
		this.prevPos.y = this.pos.y
	}

	this.edges = function () {
		if (
			this.pos.x > width ||
			this.pos.x < 0 ||
			this.pos.y > height ||
			this.pos.y < 0
		) {
			this.pos = createVector(random(width), random(height))
			this.updatePrevious()
		}
		// if (this.pos.x > width) {
		// 	this.pos.x = 0
		// 	this.updatePrevious()
		// }
		// if (this.pos.x < 0) {
		// 	this.pos.x = width
		// 	this.updatePrevious()
		// }
		// if (this.pos.y > height) {
		// 	this.pos.y = 0
		// 	this.updatePrevious()
		// }
		// if (this.pos.y < 0) {
		// 	this.pos.y = height
		// 	this.updatePrevious()
		// }
	}

	this.follow = function (vectors) {
		let x = floor(this.pos.x / scl)
		let y = floor(this.pos.y / scl)
		let index = x + y * flowfield.cols
		let force = vectors[index]
		this.applyForce(force)
	}
}
