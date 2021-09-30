let tileSize = 40
let n = 10
let tiles = []
let speed = 0.015
let variation = 0.5
let xMod = 0.1
let yMod = 0.1

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	rectMode(CENTER)
}

function draw() {
	let a = tileSize * n

	translate(width / 2, height / 2)
	translate(0, sqrt(a * a + a * a) * -0.5)
	rotate(PI / 4)
	// translate(0, tileSize * n * -1)
	// translate((width - n * tileSize) / 2, (height - n * tileSize) / 2)

	background(255)
	noStroke()
	fill(0)

	// xMod = (mouseX / width) * 0.8
	// yMod = (mouseY / height) * 0.5

	for (let x = 0; x < n; x++) {
		for (let y = 0; y < n; y++) {
			let v = createVector(x, y)
			v.mult(tileSize)

			let adjust = sin(x * xMod + y * yMod + frameCount * speed)

			let sizeAdjust = map(adjust, -1, 1, 0, tileSize * variation)
			let size = tileSize + 2 - sizeAdjust

			let alphaAdjust = map(adjust, -1, 1, 0, 255)
			fill(0, 255 - alphaAdjust)

			rect(v.x, v.y, size)
		}
	}
}
