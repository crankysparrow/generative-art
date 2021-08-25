let v = {
	version: 'normal',
	shapes: 'fill',
	redraw: () => {
		redraw()
	},
}
let corner

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	angleMode(DEGREES)

	let gui = new dat.GUI()

	gui.add(v, 'version', ['normal', 'thickLines']).onChange(() => {
		redraw()
	})
	gui.add(v, 'shapes', ['stroke', 'fill', 'mix']).onChange(() => {
		redraw()
	})
	gui.add(v, 'redraw')

	noLoop()
}

function draw() {
	corner = random([1, 2, 3, 4])
	blendMode(BLEND)
	background(0)
	fill('#fff')
	stroke('#fff')
	if (v.version == 'normal') {
		strokeWeight(5)
		strokeJoin(ROUND)
	} else {
		strokeWeight(width * 0.1)
		strokeJoin(BEVEL)
	}

	let n = floor(random(4, 7))

	recursiveShape(n, width / 2, height / 2, height / 3, 0, v.shapes)
}

function recursiveShape(n, x, y, size, angle, shapes) {
	blendMode(DIFFERENCE)

	if (shapes == 'fill') {
		fill('#fff')
		noStroke()
	} else if (shapes == 'stroke') {
		stroke('#fff')
		noFill()
	} else {
		if (random([0, 1]) == 1) {
			noFill()
		} else {
			fill('#fff')
		}
	}

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

	if (corner === 1) {
		recursiveShape(n, left - size / 4, bottom - size / 2, size / 2, 0, shapes)
		recursiveShape(n, right + size / 4, bottom - size / 2, size / 2, 0, shapes)
		recursiveShape(n, right + size / 4, top + size / 2, size / 2, 0, shapes)
	} else if (corner === 2) {
		recursiveShape(n, left - size / 4, bottom - size / 2, size / 2, 0, shapes)
		recursiveShape(n, right + size / 4, bottom - size / 2, size / 2, 0, shapes)
		recursiveShape(n, left - size / 4, top + size / 2, size / 2, 0, shapes)
	} else if (corner === 3) {
		recursiveShape(n, left - size / 4, bottom - size / 2, size / 2, 0, shapes)
		recursiveShape(n, left - size / 4, top + size / 2, size / 2, 0, shapes)
		recursiveShape(n, right + size / 4, top + size / 2, size / 2, 0, shapes)
	} else {
		recursiveShape(n, left - size / 4, top + size / 2, size / 2, 0, shapes)
		recursiveShape(n, right + size / 4, top + size / 2, size / 2, 0, shapes)
		recursiveShape(n, right + size / 4, bottom - size / 2, size / 2, 0, shapes)
	}
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
