let topShape
let bottomShape
let inc = 50
let count = 0
let points = []
let n = 16
let xMod
let yMod
let m

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)

	colorMode(HSB, 100)

	topShape = random(height * 0.15, height * 0.25)
	bottomShape = random(height * 0.65, height * 0.85)
	xMod = width * 1.1
	yMod = height * 0.5

	m = min(width, height) * 0.8
	inc = m / n

	let i = 0
	while (i < n) {
		let x = i * inc
		let y = i % 2 == 1 ? topShape : bottomShape
		points.push(createVector(x, y))
		i++
	}
}

function draw() {
	translate((width - m) / 2, (height - m) / 2)
	background(255)

	noFill()
	stroke(255, 10)
	strokeWeight(2)
	strokeJoin(ROUND)

	count++
	if (mouseIsPressed) {
		count++
	}

	let pointsR = []
	for (let i = 0; i < points.length; i++) {
		let newV = points[i].copy()
		newV.x += noise(newV.x * 0.5, count * 0.003) * xMod - xMod / 2
		newV.y += noise(i * 0.05, count * 0.002) * yMod - yMod / 2
		pointsR.push(newV)
	}

	// fill(255, 100)
	let i = 1
	while (i < pointsR.length - 2) {
		fill(i * 5, 100, 100, 50)
		triangle(
			pointsR[i].x,
			pointsR[i].y,
			pointsR[i + 1].x,
			pointsR[i + 1].y,
			pointsR[i + 2].x,
			pointsR[i + 2].y
		)
		i += 1
	}
}
