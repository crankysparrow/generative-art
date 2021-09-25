let url = 'https://coolors.co/241e4e-960200-ce6c47-ffd046-eadaa2'
let gui
let rotationAngle = 0
let extraModify
let P

let formVars = {
	angleModify: 3,
	angle: 0,
	stretch: 95,
	radius: 100,
	startPIs: 0,
}

function paletteFromUrl(url) {
	return url
		.split('coolors.co/')
		.slice(1)[0]
		.split('-')
		.map((c) => '#' + c)
}

let palette = paletteFromUrl(url)

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	let m = min(width, height)

	formVars.radius = floor(random(m * 0.2, m * 0.3))
	formVars.stretch = formVars.radius * random(0.5, 1)

	formVars.angleModify = floor(random(2, 7))
	// formVars.stretch = floor(random(20, 140))
	// formVars.stretch = m * 0.1
}

function draw() {
	let col = palette[0]
	background(col)

	strokeWeight(2)
	noFill()

	extraModify = sin(formVars.angle)
	formVars.startPIs = (abs(sin(formVars.angle)) - 1) / 2
	formVars.angle += 0.01

	translate(width / 2, height / 2)

	let rot = sin(rotationAngle)
	rotate(rot * TWO_PI * -1)
	rotationAngle += 0.001
	stroke(lerpColor(color(palette[1]), color(palette[2]), rot))

	makeForm(0, 0, extraModify)
}

function makeForm(x, y, extraModify) {
	beginShape()
	for (let i = PI * formVars.startPIs - 0.02; i <= TWO_PI; i += 0.01) {
		let len = sin(i * (formVars.angleModify + extraModify)) * formVars.stretch
		let v = createVector(cos(i), sin(i))
		v = v.normalize().mult(formVars.radius).add(len)
		curveVertex(v.x, v.y)
	}
	endShape()
}

function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight)
}
