// const cols = ['#f5dc23', '#ed225d', '#1c1c1c']
let colors = ['#5e3fcc', '#43fae5']
let innerTiles = 4
let currentMode = 'reflection'

let bigTile
let bigS

let optionsD
let radio
let btn
let sliderEl
let slider
let p
let colorBtn
let saveBtn

function setup() {
	createCanvas(windowWidth, windowHeight)

	imageMode(CENTER)
	angleMode(DEGREES)
	colorMode(HSB)
	background(colors[1])

	optionsD = createDiv().position(0, 0).style('background: white; padding: 20px 10px 10px 10px')

	radio = createRadio().parent(optionsD).style('margin-bottom: 10px;')
	radio.option('reflection')
	radio.option('rotation')
	radio.selected('rotation')

	radio.changed(() => {
		if (radio.value() === 'reflection') {
			reflectTiles(bigTile, bigS)
		} else if (radio.value() === 'rotation') {
			rotateTiles(bigTile, bigS)
		}
	})

	sliderEl = createDiv()
		.parent(optionsD)
		.style(
			'border-top: 1px solid #5C5282; border-bottom: 1px solid #5C5282; margin-bottom: 10px; padding-top: 5px'
		)
	slider = createSlider(1, 12, 4, 1).parent(sliderEl)
	slider.changed(redraw)
	p = createP('inner grid size: ' + slider.value())
		.style('margin-top: 0; margin-bottom: 5px')
		.parent(sliderEl)

	btn = createButton('redraw').parent(optionsD).style('margin: 0')
	btn.mousePressed(redraw)

	colorBtn = createButton('new colors').parent(optionsD).style('display: block; margin: 10px 0')
	colorBtn.mousePressed(() => {
		let firstHue = random(0, 360)
		let secondHue = (firstHue + 180) % 360
		let s = random(70, 100)
		let b = random(50, 100)
		colors[0] = color(firstHue, s, b)
		colors[1] = color(secondHue, s, b)
		redraw()
	})

	saveBtn = createButton('save').parent(optionsD).style('margin: 10px 0 0 0')
	saveBtn.mousePressed(saveCanvas)

	noLoop()
}

function draw() {
	innerTiles = slider.value()
	p.html('inner grid size: ' + innerTiles)

	background(colors[1])
	let m = floor(min(width, height) * 0.8)
	translate((width - m) / 2, (height - m) / 2)

	bigS = m / 2
	let s = floor(bigS / innerTiles)
	bigS = s * innerTiles

	bigTile = createGraphics(bigS, bigS)
	bigTile.background(colors[1])
	bigTile.imageMode(CENTER)
	bigTile.angleMode(DEGREES)
	bigTile.noStroke()

	// inner tiles
	for (let i = 0; i < innerTiles; i++) {
		for (let j = 0; j < innerTiles; j++) {
			makeTile(i * s, j * s, s, bigTile)
		}
	}

	if (radio.value() === 'reflection') {
		reflectTiles(bigTile, bigS)
	} else if (radio.value() === 'rotation') {
		rotateTiles(bigTile, bigS)
	}
}

function rotateTiles(bigTile, bigS) {
	let h = bigS / 2

	push()
	translate(h, h)
	image(bigTile, 0, 0)
	pop()

	push()
	translate(bigS + h, h)
	rotate(90)
	image(bigTile, 0, 0)
	pop()

	push()
	translate(h, bigS + h)
	rotate(270)
	image(bigTile, 0, 0)
	pop()

	push()
	translate(bigS + h, bigS + h)
	rotate(180)
	image(bigTile, 0, 0)
	pop()
}

function reflectTiles(bigTile, bigS) {
	let h = bigS / 2

	push()
	translate(h, h)
	image(bigTile, 0, 0)
	pop()

	push()
	translate(bigS + h, h)
	scale(-1, 1)
	image(bigTile, 0, 0)
	pop()

	push()
	translate(h, bigS + h)
	scale(1, -1)
	image(bigTile, 0, 0)
	pop()

	push()
	translate(bigS + h, bigS + h)
	scale(-1, -1)
	image(bigTile, 0, 0)
	pop()
}

function makeTile(x, y, s, bigTile) {
	bigTile.push()
	bigTile.translate(x + s / 2, y + s / 2)
	bigTile.rotate(random([0, 90, 180, 270]))

	tile = createGraphics(s, s)

	tile.noStroke()
	tile.fill(colors[0])
	tile.triangle(0, 0, s, 0, s, s)

	bigTile.image(tile, 0, 0)

	bigTile.pop()
}

function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight)
}
