const PALETTE = ['#177e89', '#084c61', '#db3a34', '#ffc857', '#323031']
const PALETTE_LIGHT = ['#4dd2e1', '#23beed', '#ea8a87', '#ffde9c']

let currentColor

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	angleMode(DEGREES)
	saveBtn = createButton('save')
	saveBtn.mousePressed(saveCanvas)
	noLoop()
	colorMode(HSB, 360, 100, 100)
}

function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight)
}

function mouseClicked() {
	redraw()
}

function draw() {
	blendMode(BLEND)
	background(color(194, 90, 24))
	strokeWeight(2)

	let m = min(width, height)
	if (width < height) {
		translate(0, (height - width) / 2)
	} else {
		translate((width - height) / 2, 0)
	}

	let size = m * 0.9
	let sides = 10
	let angle = 360 / sides

	translate(m / 2, m / 2)

	noFill()
	blendMode(OVERLAY)
	for (let i = 0; i < 8; i++) {
		let dotSize = random(0.1, 0.3)
		let sides = Math.floor(random(10, 20))
		let space
		if (dotSize < 0.14) {
			space = random(0.01, 0.05)
		} else if (dotSize < 0.2) {
			space = random(0.01, 0.1)
		} else {
			space = random(0.01, 0.15)
		}

		let start = random(0.1, 0.3)
		let n = Math.floor(random(2, 5))
	
		fill('#177e89')
		noStroke()
		dots(sides, space * size, start * size, n, dotSize * size)

	}

	blendMode(DODGE)
	for (let i = 0; i < 2; i++) {
		let dotSize = random(0.03, 0.2)
		let sides = Math.floor(random(7, 30))
		let space = random(0.01, 0.1)

		let start = random(0.05, 0.2)
		let n = Math.floor(random(2, 5))

		stroke('#177e89')

		noFill()
		dots(sides, space * size, start * size, n, dotSize * size)	
	}

}


function dots(sides, space, start = 100, n = 4, size = 10) {
	let angle = 360 / sides
	push()
	rotate(angle)
	for (let i = 0; i < sides; i++) {
		push()
		translate(0, start)
		for (let j = 0; j < n; j++) {
			circle(0, 0, size)
			translate(0, space)
		}
		pop()
		rotate(angle)
	}
	pop()
}

