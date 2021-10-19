let url = 'https://coolors.co/e3d3e4-6320ee-2ec4b6-e71d36-ff9f1c-5c0029'
let palette = paletteFromUrl(url)
let shapes = []
let m
let stepsN = 5
let shapeSize
let step
let controls
let pane
let maxControl

let settings = {}

function paletteFromUrl(url) {
	return url
		.split('coolors.co/')
		.slice(1)[0]
		.split('-')
		.map((c) => '#' + c)
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	rectMode(CENTER)
	noLoop()

	m = min(width, height) * 0.8
	step = m / stepsN
	shapeSize = sqrt(2 * sq(step)) / 2

	setColors()
	setUpVars({})

	makePane()

	// setGUI()
}

function makePane() {
	pane = new Tweakpane.Pane()

	pane.addInput(settings, 'baseRepeats', { min: 3, max: 7, step: 1 }).on('change', function (e) {
		setUpVars({ baseRepeats: e.value })
		redraw()
	})

	pane.addInput(settings, 'sclStep', { min: 0.2, max: 0.5, step: 0.01 }).on('change', (e) => {
		setUpVars({ sclStep: e.value })
		redraw()
	})

	maxControl = pane.addInput(settings, 'maxRepeats', { min: 3, max: 15, step: 1 }).on('change', (e) => {
		setUpVars({ maxRepeats: e.value })
		redraw()
	})

	pane.addInput(settings, 'crowdedness', { min: 0.1, max: 1, step: 0.01 }).on('change', (e) => {
		setUpVars({ crowdedness: e.value })
		redraw()
	})

	settings.randomize = randomize
	let btnRandomize = pane.addButton({
		title: 'Randomize',
	})
	btnRandomize.on('click', (e) => {
		settings.randomize()
		pane.refresh()
	})

	let btnRedraw = pane
		.addButton({
			title: 'Redraw with current settings',
		})
		.on('click', () => {
			redraw()
		})

	let btnNewColors = pane.addButton({ title: 'New Colors' }).on('click', newColors)
}

function setGUI() {
	controls = new dat.GUI({ name: 'settings' })
	controls.add(settings, 'baseRepeats', 3, 7, 1).onChange((val) => {
		setUpVars({ baseRepeats: val })
		redraw()
		setControls()
	})
	controls.add(settings, 'sclStep', 0.2, 0.5, 0.01).onChange((val) => {
		setUpVars({ sclStep: val })
		redraw()
		setControls()
	})
	controls.add(settings, 'crowdedness', 0, 1, 0.01).onChange((val) => {
		setUpVars({ crowdedness: val })
		redraw()
		setControls()
	})
	controls.add(settings, 'maxRepeats', settings.baseRepeats, settings.baseRepeats + 8, 1).onChange((val) => {
		setUpVars({ maxRepeats: val })
		redraw()
		setControls()
	})

	settings.randomize = randomize
	controls.add(settings, 'randomize')

	settings.redrawWithCurrent = redrawWithCurrent
	controls.add(settings, 'redrawWithCurrent')

	settings.newColors = newColors
	controls.add(settings, 'newColors')
}

function randomize() {
	setColors()
	settings.baseRepeats = floor(random(3, 7))
	settings.sclStep = random(0.2, 0.5)
	settings.maxRepeats = settings.baseRepeats + floor(random(1, 10))
	settings.crowdedness = random(0.1, 1)

	redraw()
	// setControls()
}

function setUpVars(stuff) {
	settings.baseRepeats = stuff.baseRepeats ?? settings.baseRepeats ?? floor(random(3, 7))
	settings.sclStep = stuff.sclStep ?? settings.sclStep ?? random(0.2, 0.5)
	settings.maxRepeats = stuff.maxRepeats ?? settings.maxRepeats ?? settings.baseRepeats + floor(random(1, 10))
	settings.crowdedness = stuff.crowdedness ?? settings.crowdedness ?? random(0.1, 1)
}

function redrawWithCurrent() {
	redraw()
}

function setColors() {
	palette = shuffle(palette)
	background(palette[0])
}

function newColors() {
	setColors()
	drawShapes()
}

function draw() {
	background(palette[0])

	shapes = makeShapes()

	noStroke()
	translate((width - m) / 2, (height - m) / 2)
	translate(step / 2, step / 2)

	drawShapes()
}

function drawShapes() {
	resetScales()
	for (let i = 0; i < settings.maxRepeats; i++) {
		for (shape of shapes) {
			if (shape.scl >= 0) {
				doAShape(shape)
				shape.col = (shape.col + 1) % (palette.length - 1)
				shape.scl -= settings.sclStep
			}
		}
	}
}

function resetScales() {
	for (shape of shapes) {
		shape.scl = shape.numRepeats * settings.sclStep
	}
}

function setControls() {
	for (c of controls.__controllers) {
		c.updateDisplay()
	}
}

function makeShapes() {
	let x = 0
	let y = 0
	let shapes = []

	while (x < m) {
		while (y < m) {
			let col = 1
			let angle = random([PI / 4, PI / -4, PI / 2, 0])
			let smallSideFactor = random([1, 0.8, 0.9, 0.7])

			let borderRadius = random(m * 0.01, m * 0.1)
			let numRepeats = floor(random(settings.baseRepeats, settings.maxRepeats + 1))
			let scl = 0.05 + numRepeats * settings.sclStep

			let drawThis = random() < settings.crowdedness

			shapes.push({ x, y, smallSideFactor, angle, col, borderRadius, numRepeats, scl, drawThis })
			y += step
		}
		y = 0
		x += step
	}

	return shapes
}

function doAShape({ x, y, smallSideFactor, angle, scl = 1, col, borderRadius = 10, drawThis = true }) {
	if (!drawThis) return
	fill(palette[col + 1])
	noStroke()

	let smallSide = smallSideFactor * shapeSize
	let distSmall = sqrt(sq(smallSide) / 2)
	let distLarge = step - distSmall
	let largeSide = sqrt(2 * sq(distLarge))

	push()
	translate(x, y)
	rotate(angle)
	scale(scl)
	rect(0, 0, smallSide, largeSide, borderRadius)
	pop()
}
