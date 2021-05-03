let inc = 0.01

function setup() {
	createCanvas(400, 400)
	frameRate(10)
	noStroke()
}

function draw() {
	background(255)
	for (let y = 0; y < height; y += 5) {
		for (let x = 0; x < width; x += 5) {
			let r = noise((x / 5) * inc, (y / 5) * inc, frameCount * inc) * 255
			fill(r, r, r, 255)
			square(x, y, 5)
		}
	}
}
