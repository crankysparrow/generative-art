let vShader = `
attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;

void main() {
  vTexCoord = aTexCoord;
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  gl_Position = positionVec4;
}
`

let fShader = `
precision mediump float;
uniform vec2 resolution;
uniform float time;

float shape(float power, float x) {
	return  1.0 - pow(abs(x), power);
}

float shapeTwo(float power, float x) {
	return pow(abs(x), power) - 1.0;
}

void main() {
	vec2 st = gl_FragCoord.xy / resolution.xy;
	st *= vec2(1.0, 2.0);
	st -= vec2(1.0, 2.0);

	vec3 color = vec3(0.0, 0.0, 0.0);
	float power = max(fract(time * 0.5) * 4.0 - 3.0, fract(time * 0.5) * -4.0 + 1.0);

	for (float i = -1.0; i < 1.0; i += 0.1) {
		float c1 = shape(power - i, st.x);
		float c2 = shapeTwo(power - i, st.x);
		color += smoothstep(c1-0.02, c1, st.y) - smoothstep(c1, c1+0.02, st.y);
		color += smoothstep(c2-0.02, c2, st.y) - smoothstep(c2, c2+0.02, st.y);
	}

	gl_FragColor = vec4(color, 1.0);
}
`

let t = 0

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
