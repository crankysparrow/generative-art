function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	colorMode(HSB, 1)
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}

function draw() {
	translate(width / 2, height / 2)
	scale(1, -1)

	strokeWeight(1)
	stroke(0)
	line(width / -2, 0, width / 2, 0)
	line(0, height / -2, 0, height / 2)

	let w = width / 10
	let h = height / 10

	for (let xx = 1; xx < 10; xx++) {
		for (let yy = 1; yy < 10; yy++) {
			let point = createVector(xx * w - width / 2, yy * h - height / 2)
			let a = atan2(point.y, point.x)
			let aMapped = map(a, -PI, PI, 0, 1)
			fill(aMapped, 1, 1)
			circle(point.x, point.y, 20)
		}
	}
}
