const cols = ['#f5dc23', '#ed225d', '#1c1c1c']
let tile

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	imageMode(CENTER)
	angleMode(DEGREES)
	noLoop()
}

function draw() {
	let s = 50
	let bigS = s * 3

	let bigTile = createGraphics(bigS, bigS)

	let tile = createGraphics(s, s)
	tile.fill(0)
	tile.rect(0, 0, s, s)

	bigTile.fill('#f0f')
	bigTile.rect(0, 0, bigS, bigS)
	bigTile.imageMode(CENTER)
	bigTile.angleMode(DEGREES)

	// inner tiles
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			makeTile(i * s, j * s, s, bigTile)
		}
	}

	// outer tiles
	for (let xx = 0; xx < 2; xx++) {
		for (let yy = 0; yy < 2; yy++) {
			push()
			translate(xx * bigS + bigS / 2, yy * bigS + bigS / 2)
			image(bigTile, 0, 0)
			pop()
		}
	}
}

function makeTile(x, y, s, bigTile) {
	bigTile.push()
	bigTile.translate(x + s / 2, y + s / 2)
	bigTile.rotate(random([0, 90, 180, 270]))

	tile = createGraphics(s, s)

	tile.background(0)
	tile.noStroke()
	tile.fill(cols[1])
	tile.triangle(0, 0, s, 0, 0, s)

	bigTile.image(tile, 0, 0)

	bigTile.pop()
}

function mousePressed() {
	redraw()
}
