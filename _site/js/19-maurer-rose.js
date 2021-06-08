let n, numer, denom
let hueVal = 255
let prevX = 0
let prevY = 0
let currentStep = 0
let step = 100

var fr

let scale, m, d

function setup() {
	numer = 3
	denom = floor(random(9, 15))
	n = numer / denom
	d = 41

	createCanvas(window.innerWidth, window.innerHeight)

	m = min(width, height)
	scale = m * 0.45
	angleMode(DEGREES)
	colorMode(HSL, 360, 100, 100, 255)
	background(random(220, 235), 75, 51)

	// frameRate(10)
	fr = createP('')

	d = 103 + 0.01 * Math.E
	fill(0)
	text('d: ' + d, 10, 20)
	text('n: ' + numer + '/' + denom, 10, 60)

	// text('d: ', d, +' n: ' + n, 10, 20)
	noFill()
}

function draw() {
	translate(width / 2, height / 2)

	if (currentStep > 360 * 200) {
		return
	}
	currentStep = step * frameCount

	strokeWeight(1)

	for (let i = currentStep; i < currentStep + step; i += 1) {
		let k = i * d
		let r = sin(n * k)
		let x = cos(k) * r * scale
		let y = sin(k) * r * scale

		len = findLength(prevX, prevY, x, y)
		hueM = map(len, 0, m, 0, 1) * 40
		stroke(30 + hueM, 90, 50, 10)

		line(prevX, prevY, x, y)

		prevX = x
		prevY = y
	}

	fr.html(floor(frameRate()))
}

function easeInCubic(x) {
	return x * x * x
}

function easeOutCubic(x) {
	return 1 - pow(1 - x, 3)
}

function easeInCirc(x) {
	return 1 - sqrt(1 - sq(x, 2))
}

function findLength(prevX, prevY, x, y) {
	let a = x - prevX
	let b = y - prevY
	return sqrt(sq(a) + sq(b))
}
