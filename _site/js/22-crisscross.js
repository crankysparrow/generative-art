const size = 500
var x = 0
var slope = 1

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    background(255)

    // saveBtn = createButton('save')
    // saveBtn.mousePressed(saveCanvas)
}

function windowResized() {
	// resizeCanvas(windowWidth, windowHeight)
}

function draw() {

    // translate((width-size) /2, (height-size)/2)
    noFill()

    let y = x * slope
    line(x, 0, 0, y)

    slope -= 0.01
    x += 20

    if (slope<0) {
        noLoop()
    }
}



function mouseClicked() {
    redraw()
}

function getColors(url) {
    return url.match(/[a-f0-9]{6}/gm).map(x => '#' + x)
}
