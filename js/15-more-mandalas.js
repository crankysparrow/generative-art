const PALETTE = ['#177e89', '#084c61', '#db3a34', '#ffc857', '#323031']
const PALETTE_LIGHT = ['#4dd2e1', '#23beed', '#ea8a87', '#ffde9c']

let currentColor

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	angleMode(DEGREES)
	saveBtn = createButton('save')
	saveBtn.mousePressed(saveCanvas)
	noLoop()
}

function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight)
}

function draw() {
	strokeWeight(2)

	let m = min(width, height)
	if (width < height) {
		translate(0, (height - width) / 2)
	} else {
		translate((width - height) / 2, 0)
	}

	let size = m * 0.9
	let sides = 15
	let angle = 360 / sides

	translate(m / 2, m / 2)
	colorMode(HSL)
	currentColor = PALETTE[2]

	// justACircle(size / 1.4);
	triangles(sides, size / 3, 140, 100)
	rotate(angle / 2)
	blendMode(EXCLUSION)
	currentColor = PALETTE[4]
	triangles(sides, size * 0.28, 200, 140)
	blendMode(BLEND)

	currentColor = PALETTE_LIGHT[floor(random(0, PALETTE_LIGHT.length))]
	justACircle(size * 0.45, currentColor)

	currentColor = PALETTE[floor(random(0, PALETTE.length))]
	triangles(sides, size / 2, 30, 50)
	currentColor = PALETTE[floor(random(0, PALETTE.length))]
	triangles(sides, size / 7, 70, 120)

	// dots(angle, sides, 27, 205, 8)

	// arcs(size * 0.7, 5);

	// ellipses(5, size * 0.2, 30, 120);
}

function arcs(size, sides, length = 20) {
	let col = PALETTE[floor(random(0, PALETTE.length))]
	stroke(col)
	// strokeWeight(60);
	strokeCap(SQUARE)

	// noFill();
	let angle = 360 / sides
	let halfLength = length / 2
	push()
	rotate(90)
	// line(0, 0, 0, size / 2);
	arc(0, 0, size, size, -10, 10)
	pop()

	// push();
	// for (let i = 0; i < sides; i++) {
	// 	rotate(angle);
	// 	strokeWeight(2);
	// 	line(0, 0, 0, size / 2);
	// 	strokeWeight(10);
	// 	arc(0, 0, size, size, 0, halfLength);
	// }
	// pop();

	strokeWeight(2)
}

function ellipses(sides, position, width = 50, height = 100) {
	let col = PALETTE[floor(random(0, PALETTE.length))]
	fill(col)
	noStroke()

	let angle = 360 / sides

	push()
	for (let i = 0; i < sides; i++) {
		rotate(angle)
		ellipse(0, position, width, height)
	}
	pop()

	noFill()
}

function random_pattern(vars) {
	let options = [
		'bumps',
		'justACircle',
		'triangles',
		'triangles_two',
		'circles',
		'dots',
		'lines',
		'polygon',
	]
	let angle = 360 / vars.sides

	// if (random(0, 1) > 0.5) {
	//   let circleSize = random(0, vars.size/2);
	//   justACircle(circleSize);
	// }

	push()
	for (let i = 0; i < 10; i++) {
		let n = options[floor(random(0, options.length))]
		if (i % 2 == 0) {
			rotate(angle / 2)
		}
		switch (n) {
			case 'justACircle':
				if (i > 0) {
					break
				}
				let size = random(0, vars.size / 2)
				justACircle(size)
				break
			case 'bumps':
				let r = random(0, vars.size / 3)
				let curve = random(0, vars.size * 1.5)
				let sides = [
					vars.sides,
					vars.sides,
					vars.sides + 1,
					vars.sides + 3,
					vars.sides + 7,
				]
				let side = sides[floor(random(0, sides.length))]
				bumps(side, r, curve)
				break
			case 'triangles':
				let radius = random(0, vars.size * 0.5)
				let width = random(0, vars.size * 0.25)
				triangles(angle, vars.sides, radius, width)
				break
			case 'triangles_two':
				let triRadius = random(1, vars.size * 0.4)
				triangles_two(angle, vars.sides, triRadius)
				break
			case 'circles':
				let innerSize = random(vars.size * 0.035, vars.size * 0.6)
				let fill = false
				if (innerSize < vars.size * 0.1) {
					fill = true
				}
				circles(angle, vars.sides, vars.size, innerSize, fill)
				break
			case 'dots':
				let n = floor(random(1, 5))
				let space = random(vars.size * 0.05, vars.size * 0.1)
				dots(angle, vars.sides, space, n)
			case 'lines':
				let start = random(vars.size * 0.1, vars.size * 0.3)
				let end = random(vars.size * 0.2, vars.size * 0.5)
				lines(angle, vars.sides, start, end)
				break
			case 'polygon':
				polygon(vars.size, vars.sides)
				break
		}
	}
	pop()
}

function justACircle(size, col) {
	if (col) {
		fill(col)
	} else {
		fill(PALETTE[floor(random(0, PALETTE.length))])
	}
	noStroke()
	circle(0, 0, size)
}

function bumps(sides, r, curveSize) {
	let angle = 360 / sides

	let width = 2 * r * tan(180 / sides)
	let col = PALETTE[floor(random(0, PALETTE.length))]
	// noFill();
	stroke(col)
	fill(col)

	push()
	for (let i = 0; i < sides; i++) {
		rotate(angle)
		curve(
			-width,
			curveSize,
			-width / 2,
			-r,
			width / 2,
			-r,
			width,
			curveSize
		)
	}
	pop()
}

function triangles(sides, radius, width = 5, height = 20) {
	let width2 = width / 2
	let angle = 360 / sides
	// let col = PALETTE[floor(random(0, PALETTE.length))];
	noStroke()
	fill(currentColor)
	push()
	for (let i = 1; i <= sides; i++) {
		rotate(angle)
		triangle(-width2, radius, width2, radius, 0, radius + height)
	}
	pop()
}

function circles(angle, sides, outerSize, innerSize, fillColor = false) {
	let col = PALETTE[floor(random(0, PALETTE.length))]
	if (fillColor) {
		fill(col)
		noStroke()
	} else {
		noFill()
		stroke(col)
	}
	push()
	rotate(angle / 2)
	for (let i = 0; i < sides; i++) {
		rotate(angle)
		circle(0, outerSize / 2 - innerSize / 2, innerSize)
	}
	pop()
}

function dots(angle, sides, space, start = 100, n = 4, size = 10) {
	noStroke()
	let col = PALETTE[floor(random(0, PALETTE.length))]
	fill(col)

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

function lines(angle, sides, start, end) {
	noFill()
	let col = PALETTE[floor(random(0, PALETTE.length))]
	stroke(col)

	push()
	for (let i = 0; i < sides; i++) {
		line(0, start, 0, end)
		rotate(angle)
	}
	pop()
}

function reference(size, sides, angle) {
	noFill()
	let col = PALETTE[floor(random(0, PALETTE.length))]
	stroke(col)
	strokeWeight(1)

	circle(0, 0, size)

	push()
	rotate(angle)
	for (let i = 0; i < sides; i++) {
		line(0, 0, 0, size / 2)
		rotate(angle)
	}
	pop()
}

function polygon(size, sides) {
	noFill()
	let angle = 360 / sides
	let col = PALETTE[floor(random(0, PALETTE.length))]
	stroke(col)
	strokeWeight(2)
	let x = 0
	let y = size / 2
	for (let i = 1; i <= sides; i++) {
		let new_x = sin(angle * i) * (size / 2)
		let new_y = cos(angle * i) * (size / 2)
		line(x, y, new_x, new_y)
		x = new_x
		y = new_y
	}
}
