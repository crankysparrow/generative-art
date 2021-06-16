function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}

function draw() {
    let side = min(width, height) * 0.8
    translate((width - side) / 2, (height-side) / 2)
    let step = side / 10

    let rizedSq = 3;

    for (let i = 0, cur = 0; cur < side / 2; i++, cur += step) {

        if (i == rizedSq) {
            let x1 = 0+cur + random(-10, 10)
            let x2 = side-cur + random(-10,10)
            line(x1, 0+cur, x2, 0+cur)
        } else {
            let topLeft = createVector(0+cur, 0+cur)
            let topRight = createVector(side-cur, 0+cur)
            let botLeft = createVector(0+cur, side-cur)
            let botRight = createVector(side-cur, side-cur)
            line(topLeft.x, topLeft.y, topRight.x, topRight.y)
            line(0+cur, side-cur, side-cur, side-cur) //bottom
            line(0+cur, 0+cur, 0+cur, )
            // line(0+cur, 0+cur, 0+cur, side-cur)    
        }
    }
}
