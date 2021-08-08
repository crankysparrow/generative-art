// march 2021
// inspiration: https://tylerxhobbs.com/essays/2017/aesthetically-pleasing-triangle-subdivision

const W = 400
const H = 400

const red = { h: [330, 355], s: [78, 88], b: [60, 70] }
const yellow = { h: [38, 50], s: [80, 90], b: [80, 90] }
const bluegray = { h: [190, 210], s: [30, 35], b:[ 60, 65] }
const gray = { h: [0,0], s: [0,0], b: [0,100] }

const tonesOptions = {
	red,
	yellow,	
	bluegray,
	gray
}

let triangles
let countSpan
let countDiv
let description
let count = 0

function setup() {
	BLENDS = [OVERLAY]
	createCanvas(W, H)

	triangles = new Triangles()
	let gui = new dat.GUI()
	gui.add(triangles, 'palette1', [ 'bluegray', 'red', 'yellow', 'gray' ]).onChange(redrawBtn)
	gui.add(triangles, 'palette2', [ 'bluegray', 'red', 'yellow', 'gray' ]).onChange(redrawBtn)
	gui.add(triangles, 'palette3', [ 'bluegray', 'red', 'yellow', 'gray' ]).onChange(redrawBtn)
	gui.add(triangles, 'n', 1, 30, 1).onChange(redrawBtn)

	resetBtn = createButton('redraw')
	resetBtn.mousePressed(redrawBtn)

	saveBtn = createButton('save')
	saveBtn.mousePressed(saveCanvas)

	countSpan = createSpan()
	countDiv = createDiv(`
		<h2>triangles drawn: <br/><span>${count}</span></h2>
	`)
	countDiv.position(420, 200)
	countDiv.width = 200
	description = createDiv(`
		<p>Dividing triangles recursively.</p>

		<p>n is the max number of recursions, though this number is modified as the function is repeated. Adjust with the controls above (though be warned that the number of triangles calculated & drawn will grow exponentially with n's increase; over 18-20 or so the script gets pretty slow)</p>

		<p>Switch between palette options using the controls. Depending on how the random functions turn out, sometimes one color will dominate. Hit the 'redraw' button to see another iteration using the same settings.</p>
	`)

	description.style('width', '500px')
	description.style('margin-left', '20px')

	noLoop()
}

function redrawBtn() {
	count = 0
	erase()
	rect(0, 0, width, height)
	noErase()
	redraw()
	
}


function draw() {
	noStroke()
	colorMode(HSB)

	triangles.makeTriangles()
	countDiv.elt.innerHTML = `<h2>triangles drawn: <br/><span>${count}</span></h2>`
}

class Triangles {
	constructor() {
		this.palette1 = 'bluegray'
		this.palette2 = 'bluegray'
		this.palette3 = 'red'
		this.n = 12
	}

	makeTriangles() {
		recursiveTriangles(
			{
				p: { x: 0, y: 0 },
				a: { x: W * 2, y: 0 },
				b: { x: 0, y: H * 2 },
			},
			this.n,
			this.n,
			0,
			[ tonesOptions[this.palette1], tonesOptions[this.palette2], tonesOptions[this.palette3] ]
		)
	}
}

function recursiveTriangles(tri, n, nLimit, c, tones) {
	let tone = tones[Math.floor(random(0, tones.length))]

	let blend = BLENDS[Math.floor(random(0, BLENDS.length))]
	blendMode(blend)

	fill(
		random(tone.h[0], tone.h[1]),
		random(tone.s[0], tone.s[1]),
		random(tone.b[0], tone.b[1])
	)

	drawTriangle(tri)
	if (c+1 > nLimit) return
	// if (n < 1 || c > nLimit) return

	let range = Math.abs(tri.a.x - tri.b.x)
	let adjustedRange = range * 0.5

	let x = random(adjustedRange) + Math.min(tri.a.x, tri.b.x) + range * 0.25
	let y

	let slope = (tri.a.y - tri.b.y) / (tri.a.x - tri.b.x)

	if (slope == 0) {
		y = tri.a.y
	} else if (slope == Infinity || slope == -Infinity) {
		let rangeY = Math.abs(tri.a.y - tri.b.y)
		let adjustedRangeY = rangeY * 0.5
		y = random(adjustedRangeY) + Math.min(tri.a.y, tri.b.y) + rangeY * 0.25
	} else {
		y = slope * (x - tri.a.x) + tri.a.y
	}


	let newN = randomGaussian(n - 1, 2)
	let newN2 = randomGaussian(n - 2, 2)
	if (newN > nLimit) newN = nLimit
	if (newN2 > nLimit) newN2 = nLimit
	if (newN > 0) {
		recursiveTriangles({ p: { x, y }, a: tri.p, b: tri.a }, newN, nLimit, c + 1, tones)
	}
	if (newN2 > 0) {
		recursiveTriangles({ p: { x, y }, a: tri.p, b: tri.b }, newN2, nLimit, c + 1, tones)
	}
}

function drawTriangle({ p, a, b }) {
	triangle(p.x, p.y, a.x, a.y, b.x, b.y)
	count++
}

// document.querySelector('#save-btn').addEventListener('click', function() {
//   // var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
//   saveCanvas('triangles');
// })

// document.querySelector('#redraw-btn').addEventListener('click', function() {
//   reset();
// })
