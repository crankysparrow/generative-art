// https://thecodingtrain.com/learning/nature-of-code/2.5-gravitational-attraction.html

class Mover {
	constructor(x, y, m) {
		this.pos = createVector(x, y)
		this.lastPos = this.pos.copy()
		this.vel = p5.Vector.random2D()
		this.acc = createVector(0, 0)
		this.mass = m
		this.r = sqrt(this.mass)

		this.red = 0
		this.blue = 0
	}

	applyForce(force) {
		// force = mass * acceleration
		// acc = force / mass
		let f = p5.Vector.div(force, this.mass)
		this.acc.add(f)
	}

	update() {
		this.vel.add(this.acc)
		this.pos.add(this.vel)
		this.acc.set(0, 0)
	}

	show() {
		fill(255, 100)

		// this.blue = this.vel.y

		stroke(this.red, 50, this.blue, 10)
		// ellipse(this.pos.x, this.pos.y, this.r * 2)
		// strokeWeight(2)
		// stroke(255, 20)
		line(this.lastPos.x, this.lastPos.y, this.pos.x, this.pos.y)
		point(this.pos.x, this.pos.y)
		this.lastPos = this.pos.copy()

		this.red = 0
		this.blue = 0
	}

	doGravity(attractor) {
		let force = p5.Vector.sub(attractor.pos, this.pos)
		force.normalize()
		let distanceSq = constrain(force.magSq(), 100, 1000)
		let G = 5

		this.red += map(force.x, -1, 1, 0, 255)
		this.blue += map(force.y, -1, 1, 0, 255)

		let strength = (G * (this.mass * attractor.mass)) / distanceSq
		force.setMag(strength)
		this.applyForce(force)
	}
}

class Attractor {
	constructor(x, y, m) {
		this.pos = createVector(x, y)
		this.lastPos = this.pos
		this.mass = m
		this.r = sqrt(this.mass) * 2
	}

	show() {
		// fill(255, 10)
		// ellipse(this.pos.x, this.pos.y, 3)
		createDiv().position(this.pos.x, this.pos.y).style('background: white; width: 3px; height: 3px;')
	}

	attract(mover, log) {
		let force = p5.Vector.sub(this.pos, mover.pos)
		force.normalize()
		let distanceSq = constrain(force.magSq(), 100, 1000)
		let G = 1

		let strength = (G * (this.mass * mover.mass)) / distanceSq
		if (log) {
			console.log({ distanceSq, strength, velX: mover.vel.x, velY: mover.vel.y })
		}
		force.setMag(strength)
		mover.applyForce(force)
	}
}

let mover
let a1, a2, a3
let log = false

let movers = []
let count = 50

let saveBtn

function setup() {
	createCanvas(600, 600)

	saveBtn = createButton('save')
	saveBtn.mousePressed(saveCanvas)

	mover = new Mover(width / 2, height / 2, 100)
	a1 = new Attractor(random(width), random(height), 50)
	a2 = new Attractor(random(width), random(height), 100)
	a3 = new Attractor(random(width), random(height), 100)

	// a1.show()
	// a2.show()

	background(0)

	for (let i = 0; i < count; i++) {
		movers.push(new Mover(random(width), random(height), 10))
	}

	noStroke()
}

function draw() {
	movers.forEach((mover) => {
		mover.update()
		mover.show()

		mover.doGravity(a1)
		mover.doGravity(a2)

		// a1.attract(mover)
		// a2.attract(mover)
	})

	// a1.show()
	// a2.show()
}
