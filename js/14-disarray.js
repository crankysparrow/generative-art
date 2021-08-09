const URL = 'https://coolors.co/d3f3ee-5077e2-ff8a5b-331e36-7a306c-ffba0a-bc2c1a'

function paletteFromUrl(url) {
	return url.split('coolors.co/').slice(1)[0].split('-').map(c => '#' + c)
}

function setup() {
	let cnvs = createCanvas(window.innerWidth, window.innerHeight)
	noLoop()

	saveBtn = createButton('save')
	saveBtn.mousePressed(saveCanvas)
	colorMode(HSB, 360, 100, 100)
	rectMode(CENTER)

	cnvs.mousePressed(redraw)
}

function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight)
}

function choosePalette(palette) {
	let shuffled = palette.sort(() => 0.5 - Math.random())
	return shuffled.slice(0, 3).map((col) => color(col))
}

function draw() {

	noFill()
	let palette = choosePalette(paletteFromUrl(URL))
	background(palette[2])

	let size = min(width, height) - 100
	let numSquares = random(20, 40)
	let space = size / numSquares
	let side = space * random(0.8, 1)

	translate((width - size) / 2, (height - size) / 2)

	if (0.5 - Math.random() > 0) {
		styleOne(size, palette, side, space, numSquares)
	} else {
		styleTwo(size, palette, side, space, numSquares)
	}

}


function styleOne(m, palette, side, space, numSquares) {
	let cen = space * (numSquares/2)
	noFill()

	for (let x = space / 2; x < m; x += space) {
		push()
			translate(x, 0)
			for (let y = space / 2; y < m; y += space) {
				let dist = sqrt(sq(x - cen) + sq(y - cen))
				let variance = max(1 - map(dist, 0, cen, 0, 1), 0)
				let r = random(-PI/2, PI/2) * variance

				let col = palette[0]
				col.setAlpha(dist/cen)
				stroke(col)
				push()
					translate(0, y)
					rotate(r)
					rect(0, 0, side, side)
				pop()
			}
		pop()
	}
}

function styleTwo(m, palette, side, space) {

	for (let y = space / 2; y < m; y+= space) {
		let dist = m-y

		push()
			translate(0, y)
			for (let x = space / 2; x < m; x += space) {
				let col = color(palette[0])
				let variance = 1 - map(dist, 0, m, 0, 1)
				col.setAlpha(easeOutSine(1 - variance))
				stroke(col)
				let r = random(-PI/2, PI/2) * easeInSine(variance)
		
				push()
					translate(x, 0)
					rotate(r)
					rect(0, 0, side, side)
				pop()
			}
		pop()
	}

}

function easeInSine(x) {
	return 1 - cos((x * PI) / 2)
}

function easeOutSine(x) {
	return sin((x*PI) / 2)
}