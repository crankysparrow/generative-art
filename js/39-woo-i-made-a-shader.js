let vShader = `
attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;

void main() {
  vTexCoord = aTexCoord;

  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}
`

let fShader = `
precision mediump float;
varying vec2 vTexCoord;
uniform vec2 resolution;
uniform float time;
uniform float power;

float shape(float power, float sub, float x) {
	float c = 1.0 - pow(abs(x), power) - sub;
	return c;
}

float shapeTwo(float power, float sub, float x) {
	float c = pow(abs(x), power) - sub;
	return c;
}

vec3 colorAdd(vec3 col, float add, float y) {
	vec3 r = col + smoothstep(add - 0.02, add, y) - smoothstep(add, add + 0.02, y);
	return r;
}

void main() {
	vec2 st = gl_FragCoord.xy / resolution.xy;

	st *= vec2(1.0, 2.0);
	st -= vec2(1.0, 2.0);

	// helped by graphtoy.com on below function 
	// really it just makes the value go back and forth linearly... 
	// there is probably an easier way to do this 
	// f2(t) = fract(t*0.5) * -4.0 + 1.0
	// f3(t) = fract(t*0.5) * 4.0 - 3.0
	// f4(t) = max(f2(t), f3(t))

	float powr = max(fract(time * 0.5) * 4.0 - 3.0, fract(time * 0.5) * -4.0 + 1.0);
	vec3 color = vec3(0.0);

	for (float i = -1.0; i < 1.0; i += 0.1) {
		float c = shape(powr - i, 0.0, st.x);
		float c2 = shapeTwo(powr - i, 1.0, st.x);
		color = colorAdd(color, c, st.y);
		color = colorAdd(color, c2, st.y);
	}

	gl_FragColor = vec4(color, 1.0);
}
`

let shd
let t = 0
let power

function setup() {
	createCanvas(400, 400, WEBGL)
	noStroke()
	shd = createShader(vShader, fShader)
}

function draw() {
	t += 0.01

	shader(shd)
	shd.setUniform('resolution', [width, height])
	shd.setUniform('time', t)

	rect(0, 0, width, height)
}
