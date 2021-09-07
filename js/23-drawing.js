let x = 0,
	y = 100,
	h = 150,
	s,
	f,
	mode

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)

	rectMode(CENTER)
	background(color('hsl(200, 20%, 10%)'))
	strokeWeight(10)
	frameRate(20)

	s = color('hsl(200, 80%, 20%)')
	f = '#fff'

	blendMode(DIFFERENCE)
}

function draw() {
	stroke(s)
	fill(f)
	rect(x, y, 50, sin(frameCount * 0.5) * h)

	x += 60

	if (x > width + 50) {
		x = random(-100, 0)
		y += 200
		if (y > height + 75) {
			y = random(-50, 50)
			x = random(-50, 0)
			invertSquares()
		}
	}
}

function invertSquares() {
	let saveS = s
	s = f
	f = saveS
}

function mouseClicked(e) {
	if (!e.target.classList.contains('back')) {
		blendMode(BLEND)
		background(color('hsl(200, 20%, 10%)'))
		blendMode(DIFFERENCE)
	}
}
