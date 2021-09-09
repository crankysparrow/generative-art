// const URL = 'https://coolors.co/011936-465362-82a3a1-9fc490-c0dfa1-840032'
const URL = 'https://coolors.co/011936-c3423f-82a3a1-ffa62b-c0dfa1-840032'
function paletteFromUrl(url) {
	return url
		.split('coolors.co/')
		.slice(1)[0]
		.split('-')
		.map((c) => '#' + c)
}

let palette = paletteFromUrl(URL)
let s = 80

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	angleMode(DEGREES)

	noLoop()
}

function draw() {
	strokeWeight(2)
	stroke(0)
	noFill()

	strokeCap(SQUARE)

	palette = shuffle(palette)
	let fg = palette[0]
	let bg = palette[1]
	background(bg)

	let tileType = random(['circles', 'lines'])

	for (let x = 0; x < width; x += s) {
		for (let y = 0; y < height; y += s) {
			if (tileType === 'lines') {
				tile(x, y, random([1, 0]), false, fg)
			} else {
				tileCircles(x, y, random([1, 0]), fg)
			}
		}
	}
}

function tile(x, y, r, useRect, fg) {
	stroke(fg)
	push()
	if (r == true) {
		translate(x + s, y)
		rotate(90)
	} else {
		translate(x, y)
	}

	if (useRect) {
		rect(0, 0, s, s)
	}
	line(0, 0, s, s)
	pop()
}

function tileCircles(x, y, r, fg) {
	push()
	if (r == true) {
		translate(x + s, y)
		rotate(90)
	} else {
		translate(x, y)
	}
	stroke(fg)
	strokeWeight(8)
	arc(0, 0, s, s, 0, 90)
	arc(s, s, s, s, 180, 270)
	pop()
}

function mousePressed() {
	redraw()
}
