let urls = [
	'https://coolors.co/7400b8-6930c3-5e60ce-5390d9-4ea8de-48bfe3-56cfe1-64dfdf-72efdd-80ffdb',
	'https://coolors.co/729ea1-b5bd89-cabe91-dfbe99-ec9192-e47284-db5375',
	'https://coolors.co/a20021-f52f57-f79d5c-f3752b-ededf4-9ee493-daf7dc',
]
let palette, circles, pane, styleIndex, paletteIndex, paneStyle, panePalette

addScript(
	'https://openprocessing-usercontent.s3.amazonaws.com/files/user159668/visual1278485/hc9621d1a1606cf12c2f98713d5bd692a/p5.pattern.js'
)

function paletteFromUrl(url) {
	return url
		.split('coolors.co/')
		.slice(1)[0]
		.split('-')
		.map((c) => '#' + c)
}
let palettes = urls.map((u) => paletteFromUrl(u))

function setup() {
	styleIndex = floor(random(patternFunctions.length))
	paletteIndex = floor(random(palettes.length))
	palette = palettes[paletteIndex]

	createCanvas(window.innerWidth, window.innerHeight)
	let controls = new Controls()
	let styleSel = controls
		.select({
			id: 'style',
			labelString: 'pattern style: ',
			options: patternFunctions,
			selected: styleIndex,
			useOptionsIndex: true,
			onChange: (e) => {
				styleIndex = e.target.value
				newCircles()
			},
		})
		.style('border-bottom', '1px solid #aeaeae')
		.style('padding-bottom', '3px')
		.style('margin-bottom', '3px')

	let pSel = controls.select({
		id: 'pselect',
		labelString: 'palette: ',
		options: palettes,
		selected: paletteIndex,
		useOptionsIndex: true,
		onChange: (e) => {
			paletteIndex = e.target.value
			palette = palettes[paletteIndex]
			newCircles()
		},
	})

	let urlInput = controls.input({
		id: 'urlinput',
		labelString:
			'<strong>custom palette: </strong>enter url from <a href="coolors.co">coolors.co</a>',
		onChange: function (e, err) {
			let v = e.target.value
			let regex = /coolors.co\/(?:[a-fA-Z0-9]{6}-){3,}/gm
			if (regex.test(v)) {
				let p = paletteFromUrl(v)
				if (p.length < 6) {
					err('palette must have at least 6 colors')
				} else {
					palette = p
					pSel.elt.querySelector('select').value = ''
					err('')
					newCircles()
				}
			} else {
				err('invalid url')
			}
		},
	})

	let btn = controls.button({ text: 'redraw', onClick: newCircles })
	let savebtn = controls.button({
		text: 'save canvas',
		onClick: (e) => {
			saveCanvas()
		},
	})

	newCircles()
	noLoop()
}

function newCircles() {
	circles = new AllTheCircles()
	redraw()
}

let resizeTimer
function windowResized() {
	if (resizeTimer) {
		clearTimeout(resizeTimer)
	}
	resizeTimer = setTimeout(() => {
		resizeCanvas(window.innerWidth, window.innerHeight, true)
		newCircles()
	}, 500)
}

window.addEventListener('keypress', (e) => {
	if (e.code == 'Space') {
		e.preventDefault()
		newCircles()
	}
})

function draw() {
	let m = min(width, height)
	let p = shuffle(palette)
	let b = p.splice(0, 1)
	background(b)

	circles.circles.forEach((c, i) => {
		c.cols = shuffle(p)
		patternFunctions[styleIndex](c, m, b)
	})
}

let patternFunctions = [
	(c, m, b) => {
		stripeCircle({
			x: c.x,
			y: c.y,
			d: c.d * random(0.5, 1),
			c1: c.cols[0],
			c2: c.cols[1],
			spaceMin: c.d * 0.1,
			spaceMax: c.d * 0.3,
		})
		flowerCirc({ x: c.x, y: c.y, d: c.d * random(0.5, 1), col: c.cols[1] })
		normalCircle({ x: c.x, y: c.y, d: c.d, col: c.cols[2], weight: random(m * 0.01, m * 0.05) })
		normalCircle({ x: c.x, y: c.y, d: c.d, col: c.cols[3] })
		polygon({ x: c.x, y: c.y, d: c.d, sides: random([3, 4, 5, 6, 7, 8]), col: c.cols[4] })
	},
	(c, m, b) => {
		let { x, y, d, cols } = c
		stripeCircle({
			x,
			y,
			d,
			c1: b,
			c2: cols[1],
			spaceMin: d * 0.25,
			spaceMax: d * 0.25,
			sides: random([4, 5, 6]),
		})
		flowerCirc({ x, y, d: d, col: b })
		normalCircle({ x, y, d, col: b, weight: 3 })
		let sides = random([3, 4, 5, 6, 7, 8])
		polygon({ x, y, d, sides: sides, col: cols[3] })
		polygon({ x, y, d, sides: sides, col: cols[4] })
	},
	(c, m, b) => {
		let { x, y, d, cols } = c
		stripeCircle({ x: x, y: y, d: d, c1: cols[0] })
		flowerCirc({ x, y, d, col: cols[1] })
		normalCircle({ x, y, d, col: cols[3], r: random(d), weight: random(d * 0.2) })
		polygon({ x: c.x, y: c.y, d: c.d, sides: random([3, 4, 5, 6, 7, 8]), col: c.cols[4] })
		triangles({ x, y, d, col: cols[2], sides: random([3, 4, 5, 6, 7]) })
	},
]

class AllTheCircles {
	constructor() {
		this.circles = []

		this.circleTime(0)
	}

	circleTime() {
		let m = min(width, height)
		let timesTried = 0

		while (this.circles.length == 0) {
			let c = new Circle(Math.floor(random(width)), Math.floor(random(height)), m * 0.4)
			if (!this.checkOverlap(c)) {
				this.circles.push(c)
			}
		}
		let sizeFactor = 0.3

		while (sizeFactor > 0.1) {
			let i = 0
			let w = m * sizeFactor

			// while (i < (sizeFactor > 0.2 ? 1 : sizeFactor > 0.15 ? 100 : 1000)) {
			while (i < 1000) {
				timesTried++
				let c = new Circle(Math.floor(random(width)), Math.floor(random(height)), w)
				if (this.checkOverlap(c)) {
					i++
				} else {
					this.circles.push(c)
					i = 0
				}
			}

			sizeFactor -= sizeFactor > 0.2 ? 0.05 : 0.01
		}
	}

	checkOverlap(newCircle) {
		let space = width * 0.02
		if (
			newCircle.x - newCircle.d / 2 < space ||
			newCircle.x + newCircle.d / 2 > width - space ||
			newCircle.y - newCircle.d / 2 < space ||
			newCircle.y + newCircle.d / 2 > height - space
		) {
			return true
		}
		for (let i = 0; i < this.circles.length; i++) {
			let c = this.circles[i]
			let d = dist(newCircle.x, newCircle.y, c.x, c.y)
			if (d - space < newCircle.d / 2 + c.d / 2) {
				return true
			}
		}
		return false
	}

	showTheCircles() {
		this.circles.forEach((c) => {
			c.show()
		})
	}
}

class Circle {
	constructor(x, y, d) {
		this.x = x
		this.y = y
		this.d = d
		// this.cols = shuffle(palette)
	}

	show() {
		circle(this.x, this.y, this.d)
	}
}

function pointsStripes({ x, y, d, col1, col2, space = 15, sides }) {
	patternColors([col1, col2])
	pattern(PTN.stripeCircle(space))

	sides = sides ?? random([8, 12])
	let angle = TWO_PI / sides
	let i = 0

	push()
	translate(x, y)
	rotate(random(angle))
	beginShapePattern()
	while (i <= sides) {
		let nx, ny
		if (i % 2 == 0) {
			nx = sin(angle * i) * d
			ny = cos(angle * i) * d
		} else {
			nx = sin(angle * i) * d * 0.3
			ny = cos(angle * i) * d * 0.3
		}
		vertexPattern(nx, ny)
		i++
	}
	endShapePattern()
	pop()
}

function stripeCircle({ x, y, d, c1, c2 = false, spaceMin = 20, spaceMax = 25, sides }) {
	if (!c2) {
		let c = color(c1)
		let h = floor(hue(c))
		let s = floor(saturation(c))
		let l = floor(lightness(c))
		c2 = color(`hsl(${h + 10}, ${s}%, ${l - 10}%)`)
		patternColors([c1, c2])
	} else {
		patternColors([c1, c2])
	}
	sides = sides ?? random([3, 4, 5])
	pattern(PTN.stripePolygon(sides, Math.floor(random(spaceMin, spaceMax))))
	circlePattern(x, y, d)
}

function flowerCirc({ x, y, d, col }) {
	let c2 = color(col)
	c2 = color(red(c2), green(c2), blue(c2), 200)

	patternColors([color(0, 0, 0, 0), c2])
	pattern(PTN.stripeRadial(PI / Math.floor(random(4, 7))))
	circlePattern(x, y, d + 1)
}

function normalCircle({ x, y, d, col, weight = 3, r }) {
	if (!col) {
		col = palette[floor(random(palette.length))]
	}
	stroke(col)
	noFill()
	strokeWeight(weight)
	circle(x, y, r ? random(d) : d)
}

function triangles({ x, y, d, col, sides }) {
	col = col ?? palette[floor(random(palette.length))]
	sides = sides ?? 5

	let w = random(5, 15)
	let h = random(d * 0.3, d * 0.5)

	noStroke()
	fill(col)
	push()
	translate(x, y)
	let i = 0

	while (i < sides) {
		rotate(TWO_PI / sides)
		triangle(-w, d * 0.2, w, d * 0.2, 0, h)
		i++
	}
	pop()
}

function polygon({ x, y, d, sides, col, weight = 2 }) {
	noFill()
	let angle = TWO_PI / sides
	stroke(col)
	strokeWeight(weight)
	let i = 0
	push()
	translate(x, y)
	rotate(random(angle))
	let size = random(d * 0.5, d * 0.6)
	let cx = sin(0) * size
	let cy = cos(0) * size
	while (i <= sides) {
		let newx = sin(angle * i) * size
		let newy = cos(angle * i) * size
		line(cx, cy, newx, newy)
		cx = newx
		cy = newy
		i++
	}
	pop()
}

function addScript(src) {
	let s = document.createElement('script')
	s.setAttribute('src', src)
	document.body.appendChild(s)
}

class Controls {
	constructor() {
		this.container = this.buildContainer()
		this.shown = true
	}

	buildContainer() {
		let outer = createDiv()
			.position(0, 0)
			.style('background-color', 'white')
			.style('font-size', '0.8rem')
		let btn = createButton('toggle controls')
			.parent(outer)
			.style('font-size', '0.8rem')
			.style('margin', '0')
			.style('width', '250px')
			.style('line-height', '1.2rem')
			.style('padding', '0 10px')
		let c = createDiv().size(250).parent(outer).style('padding', '5px 10px')

		btn.mousePressed(() => {
			if (this.shown) {
				c.hide()
				this.shown = false
			} else {
				c.show()
				this.shown = true
			}
		})

		return c
	}

	text({ tag = 'div', content, borderTop = true }) {
		let el = createElement(tag, content).parent(this.container)
		if (borderTop) {
			el.style('border-top', '1px solid var(--border)').style('margin-top', '4px')
		}
		return el
	}

	button({ text, onClick }) {
		let c = createDiv()
			.style('margin-top', '3px')
			.style('padding-top', '3px')
			.style('border-top', '1px solid var(--border)')
			.parent(this.container)

		return createButton(text)
			.style('font-size', '0.8rem')
			.style('padding', '0 10px')
			.style('line-height', '1.2rem')
			.style('margin', '0')
			.parent(c)
			.mouseClicked(onClick)
	}

	select({ id, labelString, options, selected, useOptionsIndex, onChange, style }) {
		let selectDiv = createDiv().style('display', 'flex')
		let selectLabel = createElement('label', labelString)
			.style('margin-right', '0.5rem')
			.parent(selectDiv)
			.attribute('for', id)

		let selectEl = createSelect()
			.parent(selectDiv)
			.attribute('id', id)
			.style('height', '1.5rem')
			.style('font-size', '0.8rem')
			.style('line-height', '1rem')
		for (let i = 0; i < options.length; i++) {
			selectEl.option(useOptionsIndex ? i : options[i])
		}

		if (selected) selectEl.selected(selected)
		selectEl.changed(onChange)

		selectDiv.parent(this.container)

		return selectDiv
	}

	input({ id, labelString, onChange }) {
		let inpDiv = createDiv().parent(this.container)

		let lab = createElement('label', labelString)
			.style('display', 'block')
			.parent(inpDiv)
			.attribute('for', id)
		let inp = createInput('').parent(inpDiv).attribute('id', id)
		let errorEl = createSpan('')
			.style('color', 'red')
			.style('font-size', '0.8rem')
			.style('margin-left', '1rem')
			.parent(lab)

		function error(msg) {
			errorEl.elt.innerHTML = msg
		}

		let inputItems = {
			input: inp,
			container: inpDiv,
			error: error,
		}

		let timer
		inp.input((e) => {
			if (timer) {
				clearTimeout(timer)
			}
			timer = setTimeout(function () {
				onChange(e, error)
			}, 300)
		})

		return inputItems
	}
}
