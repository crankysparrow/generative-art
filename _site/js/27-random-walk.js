let x
let y
let len = 10
let i = 0
let divCount

function setup() {
	createCanvas(400, 400)

	x = width / 2
	y = height / 2

	background(51)
	stroke(255, 255, 255, 100)
	strokeWeight(2)

	let divCountOuter = createDiv('i: ')
	divCountOuter.style('display', 'flex')
	divCountOuter.position(450, 50)

	divCount = createDiv('0').parent(divCountOuter)
	divCount.style('margin-left', '10px')
	noLoop()

	let buttonsDivTop = createDiv()
	let buttonsDivBottom = createDiv()

	button10 = createButton('add 10 steps').parent(buttonsDivBottom)
	button100 = createButton('add 100 steps').parent(buttonsDivBottom)
	button1000 = createButton('add 1000 steps').parent(buttonsDivBottom)
	buttonWalk = createButton('walk').parent(buttonsDivTop)
	buttonClear = createButton('clear').parent(buttonsDivTop)

	button10.mousePressed(() => {
		randomWalk(10)
	})
	button100.mousePressed(() => {
		randomWalk(100)
	})
	button1000.mousePressed(() => {
		randomWalk(1000)
	})
	buttonClear.mousePressed(() => {
		background(51)
		x = width / 2
		y = height / 2
		i = 0
		divCount.html(i)
	})

	buttonWalk.mousePressed(() => {
		if (isLooping()) {
			noLoop()
			buttonWalk.html('walk')
		} else {
			loop()
			buttonWalk.html('stop')
		}
	})
}

function draw() {
	walkStep()
}

function randomWalk(steps) {
	for (let step = 0; step < steps; step++) {
		walkStep()
	}
}

function walkStep() {
	let r = floor(random(4))

	if (r == 0 && x < width) {
		line(x, y, x + len, y)
		x += len
	} else if (r == 1 && x > 0) {
		line(x, y, x - len, y)
		x -= len
	} else if (r == 2 && y < height) {
		line(x, y, x, y + len)
		y += len
	} else if (r == 3 && y > 0) {
		line(x, y, x, y - len)
		y -= len
	}

	divCount.html(i)

	i++
}
