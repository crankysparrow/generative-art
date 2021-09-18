// https://p5js.org/examples/interaction-follow-2.html
let len

let pointOne, pointTwo
let points = []
let n = 10

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)

	let midX = width / 2
	let midY = height / 2
	len = min(width, height) * 0.06
	strokeWeight(10)
	stroke(255, 100)

	let i = 0
	while (i < n) {
		points.push(createVector(midX, midY))
		i++
	}

	background(0)
}

function draw() {
	// background(0, 0, 0, 30)

	for (let i = 0; i < points.length; i++) {
		if (i === 0) {
			if (mouseX && mouseY) {
				moveSegment(mouseX, mouseY, i)
			} else {
				moveSegment(width / 2, height / 2, 0)
			}
		} else {
			moveSegment(points[i - 1].x, points[i - 1].y, i)
		}
	}
}

function mousePressed() {
	background(0)
}

function moveSegment(xin, yin, i) {
	let d1x = xin - points[i].x
	let d1y = yin - points[i].y
	let angle = atan2(d1y, d1x)

	points[i].x = xin - cos(angle) * len
	points[i].y = yin - sin(angle) * len

	// stroke(255, 0, 255, 100)
	// strokeWeight(14)
	// point(xin, yin)

	stroke(255, 100 * (i % 3), 100 * ((i - 1) % 3), 10)
	line(xin, yin, points[i].x, points[i].y)
}
