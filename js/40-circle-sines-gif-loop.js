let urls = [
	'https://coolors.co/241e4e-960200-ce6c47-ffd046-eadaa2',
	// 'https://coolors.co/03b5aa-037971-023436-00bfb3',
	// 'https://coolors.co/241e4e-960200-fffbff-b288c0',
	'https://coolors.co/481620-cc3f0c-023436-00bfb3',
]

let palette
let pane
let m
let settings = {}
let extraModify = 0
let stretch = 0.2
let size = 500

function paletteFromUrl(url) {
	return url
		.split('coolors.co/')
		.slice(1)[0]
		.split('-')
		.map((c) => color('#' + c))
}

function setup() {
	createCanvas(size, size)
	initSettings()
	createLoop({ duration: 3, gif: false, framesPerSecond: 30 })

	setControls()
}

function draw() {
	background(settings.palette[0])

	strokeWeight(3)
	stroke(settings.palette[1])
	noFill()

	translate(size / 2, size / 2)

	extraModify = map(animLoop.progress, 0, 1, -PI, PI)
	stretch = map(sin(extraModify + PI / 2) / 3, -1, 1, -2, 2)

	for (let f = 0; f < settings.formCount; f++) {
		stroke(lerpColor(settings.palette[1], settings.palette[2], f / settings.formCount))

		beginShape()
		for (let i = -0.02; i <= TWO_PI; i += 0.01) {
			let currentRadius = settings.radius + settings.gap * f
			let len = sin(i * settings.angleModify + extraModify) * currentRadius
			let v = createVector(cos(i), sin(i))
			v = v.normalize().mult(currentRadius).add(len)
			curveVertex(v.x, v.y)
		}
		endShape()
	}
}

function initSettings() {
	settings.angleModify = floor(random(1, 8))
	settings.radius = random(size * 0.1, size * 0.2)
	settings.formCount = floor(random(0, 10))
	settings.gap = floor(random(5, 15))

	settings.palette = shuffle(paletteFromUrl(random(urls)))

	settings.newPalette = function () {
		settings.palette = shuffle(paletteFromUrl(random(urls)))
	}
}

function createForms() {
	forms = []

	for (let i = 0; i < settings.formCount; i++) {
		forms.push(new Form(m, 0, settings.angleModify, settings.stretchFactor, settings.radius + 10 * i, i * 0.3))
	}
}

class Form {
	constructor(m, angle, angleModify, stretchFactor, radius, colorStart) {
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
	}

	update() {
		// let colN = map(animLoop.progress, 0, 1, 0, TWO_PI)
		this.col = map(sin(extraModify), -1, 1, 0, 1)
		// let a = map(sin(extraModify), -1, 1, -PI, 0)
		// this.rotationAngle = sin(a)
	}

	show() {
		push()
		stroke(settings.palette[1])

		beginShape()
		for (let i = -0.02; i <= TWO_PI; i += 0.01) {
			let len = sin(i * this.angleModify + extraModify) * this.radius * stretch
			let v = createVector(cos(i), sin(i))
			v = v.normalize().mult(this.radius).add(len)
			curveVertex(v.x, v.y)
		}
		endShape()
		pop()
	}
}

function setControls() {
	pane = new Tweakpane.Pane()

	pane.addInput(settings, 'angleModify', { min: 2, max: 6, step: 1 })
	pane.addInput(settings, 'radius', { min: size * 0.02, max: size * 0.5, step: 1 })
	pane.addInput(settings, 'formCount', { min: 1, max: 30, step: 1 })
	pane.addInput(settings, 'gap', { min: 1, max: 100, step: 1 })
	pane.addButton({ title: 'new palette' }).on('click', () => {
		settings.newPalette()
	})
}
