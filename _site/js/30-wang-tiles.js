let s = 100
let twentyFive = s * 0.25
let fifty = s * 0.5
let bg
let fg
let tileMap

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	angleMode(DEGREES)
	noLoop()
}

function draw() {
	bg = color(random(255), random(255), random(255))
	fg = color(random(255), random(255), random(255))
	noStroke()
	strokeCap(SQUARE)

	// tileAlgorithm()
	anotherOne()

	// for (let i = 0; i < 8; i++) {
	// 	tiles[i](i * 120, 10)
	// }
	// for (let i = 0; i < 8; i++) {
	// 	tiles[i + 8](i * 120, 120)
	// }
}

function anotherOne() {
	tileMap = []

	let w = width / s
	let h = height / s
	// prettier-ignore
	// let possibilities = 	[ 0, 1, 2,  3,  4,   5,   6,   7,   8,    9,    10,   11,   12,   13,   14,   15 ],
	// 	possibilitiesBits = [ 0, 1, 10, 11, 100, 101, 110, 111, 1000, 1001, 1010, 1011, 1100, 1101, 1110, 1111 ]

	for (let yi = 0; yi < h; yi += 1) {
		tileMap[yi] = []

		for (let xi = 0; xi < w; xi += 1) {
			let possibilities = [ 0, 1, 2,  3,  4,   5,   6,   7,   8,    9,    10,   11,   12,   13,   14,   15 ]

			let left = tileMap[yi][xi - 1]
			let top = tileMap[yi - 1]?.[xi]

			if (left !== undefined) {
				left = (left & 2) > 0
				possibilities = possibilities.filter((n) => {
					if (left) {
						return (n & 8) > 0
					} else {
						return (n & 8) == 0
					}
				})	
			}
			if (top !== undefined) {
				top = (top & 4) > 0
				possibilities = possibilities.filter((n) => {
					if ( top ) {
						return (n & 1) > 0
					} else {
						return (n & 1) == 0
					}
				})
			}
			tileMap[yi][xi] = random(possibilities)
			tiles[tileMap[yi][xi]](xi * s, yi * s)
		}
	}

	// for (let y = 0; y < tileMap.length; y++) {
	// 	for (let x = 0; x < tileMap[y].length; x++) {
	// 		stroke(0)
	// 		noFill()
	// 		rect(x * s, y * s, s, s)
	// 		tiles[tileMap[y][x]](x * s, y * s)
	// 	}
	// }
}

function tileAlgorithm() {
	let tileMap = []

	for (let y = 0, i = 0; y <= height; y += s, i++) {
		tileMap.push([])
		for (let x = 0; x <= width; x += s) {
			tileMap[i].push(random([0, 1]))
		}
	}

	for (let y = 0; y < tileMap.length; y++) {
		for (let x = 0; x < tileMap[y].length; x++) {
			if (tileMap[y][x] == 0) {
				tiles[0](x * s, y * s)
				continue
			}
			let n = 0
			if (tileMap[y - 1]?.[x] == 1) {
				n += 1
			}
			if (tileMap[y][x + 1] && tileMap[y][x + 1] == 1) {
				n += 2
			}
			if (tileMap[y + 1]?.[x] && tileMap[y + 1][x] == 1) {
				n += 4
			}
			if (tileMap[y]?.[x - 1] && tileMap[y][x - 1] == 1) {
				n += 8
			}
			tiles[n](x * s, y * s)
		}
	}
}

function tileEnd(x, y, r) {
	push()

	if (r == 90) {
		translate(x + s, y)
		rotate(r)
	} else if (r == 180) {
		translate(x + s, y + s)
		rotate(180)
	} else if (r == -90) {
		translate(x, y + s)
		rotate(r)
	} else {
		translate(x, y)
	}
	fill(bg)
	rect(0, 0, s, s)

	fill(fg)
	arc(fifty, 0, twentyFive, fifty, 0, 180)

	pop()
}

function oneArc(x, y, r) {
	push()
	if (r == 90) {
		translate(x + s, y)
		rotate(r)
	} else if (r == 180) {
		translate(x + s, y + s)
		rotate(180)
	} else if (r == -90) {
		translate(x, y + s)
		rotate(r)
	} else {
		translate(x, y)
	}

	fill(bg)
	rect(0, 0, s, s)

	stroke(fg)
	noFill()
	strokeWeight(twentyFive)
	arc(0, 0, s, s, 0, 90)

	pop()
}

function tileLine(x, y, r) {
	push()
	if (r == 90) {
		translate(x + s, y)
		rotate(r)
	} else if (r == 180) {
		translate(x + s, y + s)
		rotate(180)
	} else if (r == -90) {
		translate(x, y + s)
		rotate(r)
	} else {
		translate(x, y)
	}

	fill(bg)
	rect(0, 0, s, s)

	stroke(fg)
	noFill()
	strokeWeight(twentyFive)
	line(fifty, 0, fifty, s)

	pop()
}

function twoArcs(x, y, r) {
	push()
	if (r == 90) {
		translate(x + s, y)
		rotate(r)
	} else if (r == 180) {
		translate(x + s, y + s)
		rotate(180)
	} else if (r == -90) {
		translate(x, y + s)
		rotate(r)
	} else {
		translate(x, y)
	}

	fill(bg)
	rect(0, 0, s, s)

	stroke(fg)
	noFill()
	strokeWeight(twentyFive)
	arc(0, 0, s, s, 0, 90)
	arc(0, s, s, s, 270, 360)

	pop()
}

function allTheArcs(x, y, r) {
	push()
	if (r == 90) {
		translate(x + s, y)
		rotate(r)
	} else if (r == 180) {
		translate(x + s, y + s)
		rotate(180)
	} else if (r == -90) {
		translate(x, y + s)
		rotate(r)
	} else {
		translate(x, y)
	}

	fill(bg)
	rect(0, 0, s, s)

	stroke(fg)
	noFill()
	strokeWeight(twentyFive)
	arc(0, 0, s, s, 0, 90)
	arc(0, s, s, s, 270, 360)
	arc(s, 0, s, s, 90, 180)
	arc(s, s, s, s, 180, 270)

	pop()
}

let tiles = {
	0: function (x, y) {
		fill(bg)
		rect(x, y, s, s)
	},
	1: function (x, y) {
		tileEnd(x, y)
	},
	2: function (x, y, r) {
		tileEnd(x, y, 90)
	},
	3: function (x, y, r) {
		oneArc(x, y, 90)
	},
	4: function (x, y) {
		tileEnd(x, y, 180)
	},
	5: function (x, y) {
		tileLine(x, y)
	},
	6: function (x, y) {
		oneArc(x, y, 180)
	},
	7: function (x, y) {
		twoArcs(x, y, 180)
	},
	8: function (x, y) {
		tileEnd(x, y, -90)
	},
	9: function (x, y) {
		oneArc(x, y)
	},
	10: function (x, y) {
		tileLine(x, y, 90)
	},
	11: function (x, y) {
		twoArcs(x, y, 90)
	},
	12: function (x, y) {
		oneArc(x, y, -90)
	},
	13: function (x, y) {
		twoArcs(x, y)
	},
	14: function (x, y) {
		twoArcs(x, y, -90)
	},
	15: function (x, y) {
		allTheArcs(x, y)
	},
}

function mousePressed() {
	redraw()
}

// function tileTwo(x, y, r) {
// 	push()
// 	if (r == 90) {
// 		translate(x + s, y)
// 		rotate(r)
// 	} else if (r == 180) {
// 		translate(x + s, y + s)
// 		rotate(180)
// 	} else if (r == -90) {
// 		translate(x, y + s)
// 		rotate(r)
// 	} else {
// 		translate(x, y)
// 	}
// 	fill(0)
// 	rect(0, 0, s, s)
// 	fill(155)
// 	beginShape()

// 	vertex(thirty, 0)
// 	// bezierVertex(thirtyFive, twentyFive, thirty, twentyFive, thirty, fifty)
// 	bezierVertex(forty, twentyFive, thirty, twentyFive, thirty, fifty)
// 	bezierVertex(thirty, seventyFive, forty, seventyFive, thirty, s)
// 	vertex(seventy, s)
// 	bezierVertex(sixty, seventyFive, seventy, seventyFive, seventy, fifty)
// 	bezierVertex(seventy, twentyFive, sixty, twentyFive, seventy, 0)
// 	// vertex(thirtyFive, s)

// 	endShape()
// 	pop()
// }

// function tileThree(x, y, r) {
// 	push()
// 	if (r == 90) {
// 		translate(x + s, y)
// 		rotate(r)
// 	} else if (r == 180) {
// 		translate(x + s, y + s)
// 		rotate(180)
// 	} else if (r == -90) {
// 		translate(x, y + s)
// 		rotate(r)
// 	} else {
// 		translate(x, y)
// 	}
// 	fill(0)
// 	rect(0, 0, s, s)

// 	fill(155)
// 	beginShape()

// 	vertex(thirty, 0)
// 	bezierVertex(thirty, 0, thirty, thirty, fifty, fifty)
// 	bezierVertex(seventy, seventy, s, seventy, s, seventy)
// 	vertex(s, thirty)
// 	bezierVertex(eighty, fifteen, eighty, fifteen, seventy, 0)

// 	endShape()
// 	pop()
// }

// function tileFour(x, y, r) {
// 	push()
// 	if (r == 90) {
// 		translate(x + s, y)
// 		rotate(r)
// 	} else if (r == 180) {
// 		translate(x + s, y + s)
// 		rotate(180)
// 	} else if (r == -90) {
// 		translate(x, y + s)
// 		rotate(r)
// 	} else {
// 		translate(x, y)
// 	}
// 	fill(0)
// 	rect(0, 0, s, s)

// 	fill(155)
// 	beginShape()

// 	vertex(thirty, 0)
// 	bezierVertex(thirty, 0, thirty, thirty, fifty, fifty)
// 	bezierVertex(seventy, seventy, s, seventy, s, seventy)
// 	vertex(s, thirty)
// 	bezierVertex(eighty, fifteen, eighty, fifteen, seventy, 0)

// 	endShape()

// 	translate(s, 0)
// 	rotate(90)

// 	beginShape()
// 	vertex(thirty, 0)
// 	bezierVertex(thirty, 0, thirty, thirty, fifty, fifty)
// 	bezierVertex(seventy, seventy, s, seventy, s, seventy)
// 	vertex(s, thirty)
// 	bezierVertex(eighty, fifteen, eighty, fifteen, seventy, 0)
// 	endShape()

// 	pop()
// }

function tile(x, y, r, useRect, fg) {
	stroke(fg)
	push()
	if (r == true) {
		translate(x + s, y)
		rotate(90)
	} else {
		translate(x, y)
	}

	if (useRect) {
		rect(0, 0, s, s)
	}
	line(0, 0, s, s)
	pop()
}
