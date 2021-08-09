const coolorsPalette = 'https://coolors.co/d11f34-06d6a0-fcba04-55d6c2'
const strk = '#fff'
palette = [ '#ce1212' ]

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
    noLoop()

    // saveBtn = createButton('save')
    // saveBtn.mousePressed(saveCanvas)

    let inspiration = createDiv(`
        inspiration: <a href="http://www.veramolnar.com/blog/wp-content/uploads/1999/10/197451" target="_blank">Vera Molnar</a>
    `)
    inspiration.position(50, height + 60)
    inspiration.style('padding-bottom', '50px')
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}

function draw() {
    background(0)
    strokeWeight(1)

    let size = 250
    let step = 10
    let m = min(width, height) * 0.95

    let cols = floor(m / size)
    let gutter = size * 0.1
    let can = size * cols + gutter * (cols-1)

    translate((width - can) / 2, (height-can) / 2)

    stroke(strk)

    for (let xi = 0; xi < cols; xi++) {
        push()
            translate(size*xi + gutter*xi, 0)
            for (let iy = 0; iy < cols; iy++) {
                push()
                    translate(0, iy*size + iy*gutter)
                    drawThings(size, step)
                pop()
            }
        pop()

    }
}


function drawThings(size, step) {

    let count = (size/step) / 2
    let randomized = floor(random(1, count-1))

    for (let i = 0, cur = 0; cur < size / 2; i++, cur += step) {

        let top_l = createVector(cur, cur)
        let top_r = createVector(size-cur, cur)
        let bot_l = createVector(cur, size-cur)
        let bot_r = createVector(size-cur, size-cur)   
        let points = [ top_l, top_r, bot_l, bot_r ]     

        if (i == randomized) {
            stroke(palette[floor(random(0,palette.length-1))])
            strokeWeight(2)
            points = skewBox([ top_l, top_r, bot_l, bot_r ], 5)
        } else {
            stroke(strk)
            strokeWeight(1)
            points = skewBox([ top_l, top_r, bot_l, bot_r ], 2)
        }

        drawRect( points )
        stroke(strk)
    }
}


function drawRect( [ top_l, top_r, bot_l, bot_r ]) {
    line(top_l.x, top_l.y, top_r.x, top_r.y)  // top
    line(bot_l.x, bot_l.y, bot_r.x, bot_r.y)  // bottom
    line(top_l.x, top_l.y, bot_l.x, bot_l.y)    //left 
    line(top_r.x, top_r.y, bot_r.x, bot_r.y)    // right
}

function skewBox([top_l, top_r, bot_l, bot_r], v = 5) {
    return [ rVector(top_l, v), rVector(top_r, v), rVector(bot_l, v), rVector(bot_r, v) ]

}

// randomize a vector within v on each side
function rVector(vec, v = 5) {
    return vec.copy().add(random(-v,v), random(-v,v) )
}

function mouseClicked() {
    redraw()
}

function getColors(url) {
    return url.match(/[a-f0-9]{6}/gm).map(x => '#' + x)
}