let urls = [
	'https://coolors.co/241e4e-960200-ce6c47-ffd046-eadaa2',
	'https://coolors.co/03b5aa-037971-023436-00bfb3',
	'https://coolors.co/241e4e-960200-fffbff-b288c0',
	'https://coolors.co/481620-cc3f0c-023436-00bfb3',
]

let palette
let gui
let forms = []

function paletteFromUrl(url) {
	return url
		.split('coolors.co/')
		.slice(1)[0]
		.split('-')
		.map((c) => '#' + c)
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)

	createForms()
}

function draw() {
	let col = palette[0]
	background(col)

	strokeWeight(3)
	noFill()

	translate(width / 2, height / 2)
	shearX((mouseX / width - 0.5) * 0.5)
	shearY((mouseY / height - 0.5) * 0.5)

	for (let i = 0; i < forms.length; i++) {
		forms[i].update()
		forms[i].show()
	}
}

function mousePressed() {
	createForms()
}

function createForms() {
	palette = paletteFromUrl(random(urls))
	palette = shuffle(palette)
	forms = []
	let m = min(width, height)

	let angleModify = floor(random(2, 6))
	let stretchFactor = random(0.5, 1)
	let radius = floor(random(m * 0.2, m * 0.3))
	let formCount = floor(random(1, 6))

	for (let i = 0; i < formCount; i++) {
		forms.push(new Form(m, 0, angleModify, stretchFactor, radius + 5 * i, 0, i * 0.3))
	}
}

function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight)
}

class Form {
	constructor(m, angle, angleModify, stretchFactor, radius, translateStart, colorStart) {
		this.angleModify = angleModify
		this.angle = angle
		this.radius = radius ? radius : floor(random(m * 0.2, m * 0.3))
		this.stretch = this.radius * stretchFactor
		this.startPIs = 0
		this.rotationAngle = 0
		this.rot = 0
		this.colorAngle = colorStart ? colorStart : 0
		this.col = 0
		this.extraModify = 0
		this.translateStart = translateStart ? translateStart : 0
	}

	update() {
		this.extraModify = sin(this.angle)
		this.startPIs = (abs(sin(this.angle)) - 1) / 2
		this.angle += 0.01

		this.rot = sin(this.rotationAngle)
		this.rotationAngle += 0.001

		this.col = sin(this.colorAngle) * 0.5 + 0.5
		this.colorAngle += 0.005
	}

	show() {
		push()
		stroke(lerpColor(color(palette[1]), color(palette[2]), this.col))
		rotate(this.rot * TWO_PI * -1)

		beginShape()
		for (let i = PI * this.startPIs - 0.02 + this.translateStart; i <= TWO_PI + this.translateStart; i += 0.01) {
			let len = sin(i * (this.angleModify + this.extraModify)) * this.stretch
			let v = createVector(cos(i), sin(i))
			v = v.normalize().mult(this.radius).add(len)
			curveVertex(v.x, v.y)
		}
		endShape()
		pop()
	}
}
