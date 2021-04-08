
const PALETTE = [ '#12d292', '#65198f', '#C874D9', '#3FFCEA' ];



function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  angleMode(DEGREES);
  saveBtn = createButton('save');
  saveBtn.mousePressed(saveCanvas);

  noLoop();
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  strokeWeight(2);

  let m = min(width, height);
  if (width < height) {
    translate(0, (height - width) / 2);
  } else {
    translate((width - height) / 2, 0);
  }
  let third = m / 3;
  let size = m * 0.29;
  push();
    translate(third / 2, third / 2);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        random_pattern({
          size: size, 
          sides: floor(random(3, 15))
        });
        translate(third, 0);
      }
      translate(-third * 3, third);
    }
  pop();

  translate(third / 2, third / 2);

  // scale(1, -1);

  // pattern_one({
  //   size: size,
  //   innerSize: size * 0.48,
  //   sides: 6,
  //   angle: 360 / 6
  // })

  // translate(third, 0);
  // pattern_two({
  //   size: size,
  //   innerSize: size * 0.5,
  //   sides: 8,
  // });

  // translate(third, 0);
  // pattern_three({
  //   size: size,
  //   innerSize: (size) * 0.04,
  //   sides: 10,
  //   circlesSides: 30
  // });  

  // translate(-third * 2, third);
  // pattern_four({
  //   size: size,
  //   innerSize: size * 0.4,
  //   sides: 6,
  // });    

  // translate(third, 0);
  // random_pattern({
  //   size: size, 
  //   sides: 6`t56
  // });



}

function random_pattern(vars) {
  let options = [ 'bumps', 'justACircle', 'triangles', 'triangles_two', 'circles', 'dots', 'lines', 'polygon' ];
  let angle = 360 / vars.sides;

  // if (random(0, 1) > 0.5) {
  //   let circleSize = random(0, vars.size/2);
  //   justACircle(circleSize);
  // }

  push();
  for (let i = 0; i < 10; i++) {
    let n = options[floor(random(0, options.length))];
    if (i % 2 == 0) {
      rotate(angle/2);
    }
    switch (n) {
      case 'justACircle' : 
        if (i > 0) {
          break;
        }
        let size = random(0, vars.size/2);
        justACircle(size);
        break;
      case 'bumps' : 
        let r = random(0, vars.size/3);
        let curve = random(0, vars.size * 1.5);
        let sides = [vars.sides, vars.sides, vars.sides+1, vars.sides+3, vars.sides+7];
        let side = sides[floor(random(0, sides.length))];
        bumps(side, r, curve);
        break;
      case 'triangles' : 
        let radius = random(0, vars.size * 0.5);
        let width = random(0, vars.size * 0.25);
        triangles(angle, vars.sides, radius, width);
        break;
      case 'triangles_two' : 
        let triRadius = random(1, vars.size * 0.4);
        triangles_two(angle, vars.sides, triRadius);
        break;
      case 'circles' : 
        let innerSize = random(vars.size * 0.035, vars.size * 0.6);
        let fill = false;
        if (innerSize < vars.size * 0.1) {
          fill = true;
        }
        circles(angle, vars.sides, vars.size, innerSize, fill);
        break;
      case 'dots' : 
        let n = floor(random(1, 5));
        let space = random(vars.size * 0.05, vars.size * 0.1);
        dots(angle, vars.sides, space, n);
      case 'lines' : 
        let start = random(vars.size * 0.1, vars.size * 0.3);
        let end = random(vars.size * 0.2, vars.size * 0.5);
        lines(angle, vars.sides, start, end);
        break;
      case 'polygon' : 
        polygon(vars.size, vars.sides);
        break;
    }
  }
  pop();

}

function pattern_one(vars) {
  circles(vars.angle, vars.sides, vars.size, vars.innerSize);
  dots(vars.angle, vars.sides, vars.size / 15, 5, 7);
  polygon(vars.size, vars.sides);
}

function pattern_two(vars) {
  let angle = 360 / vars.sides;
  let circlesSides = 3;
  let circlesAngle = 360 / circlesSides; 
  circles(circlesAngle, circlesSides, vars.size, vars.innerSize);
  polygon(vars.size, vars.sides);
  justACircle(vars.size * 0.3);
  triangles(angle, vars.sides, vars.size * 0.125, vars.size * 0.2);
  let tri_radius = vars.size * 0.25;
  triangles_two(angle, vars.sides, tri_radius);
}

function pattern_three(vars) {
  let circAngle = 360 / vars.circlesSides;
  let angle = 360 / vars.sides;
  circles(circAngle, vars.circlesSides, vars.size, vars.innerSize, true);
  bumps(vars.sides, 40, 300);
  lines(angle, vars.sides, vars.size * 0.38, vars.size * 0.45);
  lines(angle, vars.sides, vars.size * 0.05, vars.size * 0.15);
  polygon(vars.size*0.9, vars.sides);
  triangles_two(angle, vars.sides, vars.size * 0.35, 4, 1.1);
}

function pattern_four(vars) {
  let angle = 360 / vars.sides;
  circles(angle, vars.sides, vars.size*0.95, vars.size*0.1);
  justACircle(vars.size/2);
  lines(angle, vars.sides, vars.size * 0.4, vars.size * 0.5);
  // triangles(angle, vars.sides, vars.size * 0.3, vars.size * 0.1);
  // dots(angle, vars.sides, vars.size / 10, 3);
  push();
    rotate(angle/4);
    triangles_two(angle, vars.sides, vars.size*0.3, 5, 1.4);
  pop();
}

function justACircle(size) {
  fill(PALETTE[floor(random(0, PALETTE.length))]);
  noStroke();
  circle(0, 0, size);
}

function bumps(sides, r, curveSize) {
  let angle = 360 / sides;

  let width = 2 * r * tan(180 / sides);
  let col = PALETTE[floor(random(0, PALETTE.length))];
  noFill();
  stroke(col);

  push();
    for (let i = 0; i < sides; i++) {
      rotate(angle);
      curve(-width, curveSize, -width/2, -r, width/2, -r, width, curveSize);
    }
  pop();
}

function triangles(angle, sides, radius, width) {
  let col = PALETTE[floor(random(0, PALETTE.length))];
  noFill();
  stroke(col);
  let x = sin(angle) * radius;
  let y = cos(angle) * radius;
  push();
    for (let i = 1; i <= sides; i++) {
      rotate(angle);
      triangle(0, width, x, y, 0, 0);
    }
  pop();
}

function triangles_two(angle, sides, radius, width = 5, heightRatio=1.5) {
  let col = PALETTE[floor(random(0, PALETTE.length))];
  noStroke();
  fill(col);
  push();
    rotate(angle/2);
    for (let i = 1; i <= sides * 2; i++) {
      rotate(angle/2);
      triangle(-width, radius, width, radius, 0, radius*heightRatio);
    }
  pop();  
}

function circles(angle, sides, outerSize, innerSize, fillColor = false) {
  let col = PALETTE[floor(random(0, PALETTE.length))];
  if (fillColor) {
    fill(col);
    noStroke();
  } else {
    noFill();
    stroke(col);
  }
  push();
    rotate(angle/2);
    for (let i = 0; i < sides; i++) {
      rotate(angle);
      circle(0, (outerSize/2 - innerSize/2), innerSize);
    }
  pop();
}

function dots(angle, sides, space, n=4, size = 10) {
  noStroke();
  let col = PALETTE[floor(random(0, PALETTE.length))];
  fill(col);

  push()
    rotate(angle);
    for (let i = 0; i < sides; i++) {
      push();
        for (let j = 0; j < n; j++) {
          translate(0,space);
          circle(0, 0, size);
        }               
      pop();
      rotate(angle);
    }
  pop();    
}

function lines(angle, sides, start, end) {
  noFill();
  let col = PALETTE[floor(random(0, PALETTE.length))];
  stroke(col);

  push();
    for (let i = 0; i < sides; i++) {
      line(0, start, 0, end);
      rotate(angle);
    }
  pop();
}

function reference(size, sides, angle) {
  noFill();
  let col = PALETTE[floor(random(0, PALETTE.length))];
  stroke(col);
  strokeWeight(1);

  circle(0, 0, size);

  push()
    rotate(angle);
    for (let i = 0; i < sides; i++) {
      line(0, 0, 0, size/2);
      rotate(angle);
    }
  pop();  
}

function polygon(size, sides) {
  noFill();
  let angle = 360 / sides;
  let col = PALETTE[floor(random(0, PALETTE.length))];
  stroke(col);
  strokeWeight(2);
  let x = 0;
  let y = size/2;
  for (let i = 1; i <= sides; i++) {
    let new_x = sin(angle * i) * (size/2);
    let new_y = cos(angle * i) * (size/2);
    line(x, y, new_x, new_y);
    x = new_x;
    y = new_y;
  }
}



