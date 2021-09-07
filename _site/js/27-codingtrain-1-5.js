let inc = 0.01

function setup() {
	createCanvas(300, 300)
	pixelDensity(1)
}

function draw() {
	let xOff = 0
	background(50, 50, 50, 255)

	noFill()
	stroke(255)
	beginShape()
	for (let x = 0; x < height; x++) {
		vertex(x, noise(x * 0.01) * height)
	}
	endShape()
}
