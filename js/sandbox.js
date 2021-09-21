function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	colorMode(HSB)

	noLoop()
}

function draw() {
	let h = random(255)
	let s = random(80, 100)
	let b = random(50, 100)
	let bg = color(h, s, b)

	background(bg)

	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			stroke(h, s, b - 20, noise(x * y))
			point(x, y)
		}
	}
}
