const size = 500
let middle
let count = 20
let arcs = []
let n = 0.1
let lenStep = 0.01

let step = size / count

let palette = getColors('https://coolors.co/ffc857-e9724c-c5283d-255f85')
let bg = '#481d24'

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	middle = createVector(width / 2, height / 2)

	for (let i = step; i < size; i += step) {
		let arcLength = random(0.01, PI * 1.95)
		let arcStart = random(0, PI * 2)
		arcs.push({
			size: i,
			start: arcStart,
			current: arcStart,
			len: arcLength,
			speed: random(0.1, 0.2) * random([-1, 1]),
			up: true,
			lenStep: random(0.0001, 0.01),
			col: random(palette),
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
		if (arcObj.up) {
			arcObj.len += arcObj.lenStep
			arcObj.start -= arcObj.lenStep
			if (arcObj.len > PI * 1.99) arcObj.up = false
		} else {
			arcObj.len -= arcObj.lenStep
			arcObj.start += arcObj.lenStep
			if (arcObj.len < 0.1) arcObj.up = true
		}
		drawArc(arcObj)
	})
}

function mouseClicked() {
	redraw()
}

function drawArc(arcObj) {
	let { size, start, len, col, current } = arcObj

	stroke(col)

	arc(middle.x, middle.y, size, size, current, current + len)
}

function getColors(url) {
	return url.match(/[a-f0-9]{6}/gm).map((x) => '#' + x)
}
