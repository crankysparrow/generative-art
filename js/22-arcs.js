const step = 20

let size
let middle
let arcs = []
let lenStep = 0.01

let palette = getColors('https://coolors.co/ffc857-e9724c-c5283d-255f85')
let bg = '#481d24'

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	size = min(width, height) - 100
	middle = createVector(width / 2, height / 2)

	for (let i = step; i < size; i += step) {
		arcs.push({
			size: i,
			start: random(0, PI * 2),
			current: this.start,
			len: random(0.01, PI * 1.95),
			speed: random(0.1, 0.2) * random([-1, 1]),
			up: true,
			lenStep: random(0.0001, 0.01),
			col: random(palette),
			alpha: 1.0,
		})
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
	middle = createVector(width / 2, height / 2)
}

function draw() {
	background(bg)
	strokeWeight(6)
	noFill()
	arcs.forEach((arcObj, i) => {
		arcObj.current = arcObj.start + (arcObj.speed * millis()) / 1000
		arcObj.len += arcObj.lenStep

		// opacity is zero when the arc is a full circle (PI * 2)
		// y = sin(x-PI/2) + 1 in grapher app for a visualization !
		arcA = sin(arcObj.len - PI / 2) + 1
		arcObj.alpha = arcA * 255

		drawArc(arcObj)
	})
}

function drawArc(arcObj) {
	let { size, start, len, col, current, alpha } = arcObj

	let arcCol = color(col)
	arcCol.setAlpha(alpha)
	stroke(arcCol)
	arc(middle.x, middle.y, size, size, current, current + len)
}

function getColors(url) {
	return url.match(/[a-f0-9]{6}/gm).map((x) => '#' + x)
}
