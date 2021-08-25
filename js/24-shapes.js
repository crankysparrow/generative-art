function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	angleMode(DEGREES)
}

function draw() {
	// stroke('#fff')
	blendMode(BLEND)
	background(0)

	fill('#fff')
	blendMode(BLEND)

	recursiveShape(5, width / 2, height / 2, height / 3, 0)
}

function recursiveShape(n, x, y, size, angle) {
	blendMode(DIFFERENCE)

	let top = y - size
	let bottom = y + size
	let left = x - size / 2
	let right = x + size / 2

	push()
	translate(x, y)
	rotate(angle)
	triangle(0, 0, -size / 2, -size, size / 2, -size)
	triangle(0, 0, -size / 2, size, size / 2, size)
	pop()

	n = n - 1
	if (n <= 0) return

	recursiveShape(n, left - size / 4, bottom - size / 2, size / 2, 0)
	recursiveShape(n, right + size / 4, bottom - size / 2, size / 2, 0)
	recursiveShape(n, left - size / 4, top + size / 2, size / 2, 0)
	// recursiveShape(n, right, top, size / 2, 0)
}

function myShape(x, y, size, angle) {
	push()
	translate(x, y)
	rotate(angle)
	let offset = size / 2
	triangle(0, 0, -offset, size, 0 + offset, size)
	triangle(0, 0, -offset, -size, 0 + offset, -size)
	pop()
}

function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight)
}
