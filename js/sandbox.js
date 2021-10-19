let url = 'https://coolors.co/e3d3e4-6320ee-2ec4b6-e71d36-ff9f1c-5c0029'
let palette = paletteFromUrl(url)

let p1, p2, pS, pE, m

function easeOutSine(x) {
	return Math.sin((x * Math.PI) / 2)
}

function paletteFromUrl(url) {
	return url
		.split('coolors.co/')
		.slice(1)[0]
		.split('-')
		.map((c) => '#' + c)
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)

	m = min(width, height)

	pS = createVector(m * 0.1, m * 0.9)
	p1 = createVector(m * 0.8, m * -0.5)
	p2 = createVector(m * 0.8, m * 1.4)
	pE = createVector(m * 0.7, m * 0.1)

	makePane()
}

function draw() {
	background(0)
	stroke(255, 100)
	noFill()

	translate((width-m)/2, (height-m)/2)

	// strokeWeight(5)
	// point( p1.x, p1.y)
	// point( p2.x, p2.y )

	strokeWeight(2)
	for (let i = 0; i < 105; i++) {
		let adjust = i * 2

		bezier(
			pS.x + i, pS.y + i,
			p1.x - adjust, p1.y - adjust,
			p2.x - adjust, p2.y + adjust,
			pE.x - i, pE.y - i
		)
	}
}

function makePane() {
	pane = new Tweakpane.Pane()

	let p1Folder = pane.addFolder({
		title: 'p1'
	})
	let p2Folder = pane.addFolder({
		title: 'p2'
	})
	let pSFolder = pane.addFolder({ title: 'pS' })
	let pEFolder = pane.addFolder({ title: 'pE' })

	p1Folder.addInput(p1, 'x', { min: m * -0.5, max: m * 1.5, step: 1 })
	p1Folder.addInput(p1, 'y', { min: m * -0.5, max: m * 1.5, step: 1 })
	p2Folder.addInput(p2, 'x', { min: m * -0.5, max: m * 1.5, step: 1 })
	p2Folder.addInput(p2, 'y', { min: m * -0.5, max: m * 1.5, step: 1 })
	pSFolder.addInput(pS, 'x', { min: m * -0.5, max: m * 1.5, step: 1 })
	pSFolder.addInput(pS, 'y', { min: m * -0.5, max: m * 1.5, step: 1 })
	pEFolder.addInput(pE, 'x', { min: m * -0.5, max: m * 1.5, step: 1 })
	pEFolder.addInput(pE, 'y', { min: m * -0.5, max: m * 1.5, step: 1 })

}