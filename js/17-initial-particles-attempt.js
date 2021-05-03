let particles = []
let n = 300

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	noStroke()

	background(0)

	for (let i = 0; i < n; i++) {
		x = random(0, width)
		y = random(0, height)

		particles.push(new Particle(x, y))
	}
}

function draw() {
	// if (frameCount > 5) return
	particles.forEach((particle) => {
		particle.move()
		particle.edges()
	})
}

class Particle {
	constructor(x, y) {
		this.x = x
		this.y = y
	}

	move = function () {
		let noiseVal = noise(this.x / 150, this.y / 150)
		var angle = noiseVal * TWO_PI

		let nx = cos(angle)
		let ny = sin(angle)

		this.x = this.x + nx
		this.y = this.y + ny

		let a = map(noiseVal, 0, 1, 0, 255)
		fill(255, 255, 255, a)

		ellipse(this.x, this.y, 5, 5)
	}

	edges() {
		if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
			this.x = random(0, width)
			this.y = random(0, height)
		}
	}
}
