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

void main() {
	vec2 st = gl_FragCoord.xy / resolution.xy;
	st -= vec2(1.0, 1.0);

	float c = 1.0 - pow(abs(st.x), 1.5);
	vec3 color = vec3(smoothstep(c - 0.02, c, st.y) - smoothstep(c, c + 0.02, st.y));

	gl_FragColor = vec4(color, 1.0);
}
`

function setup() {
	createCanvas(400, 400, WEBGL)
	noStroke()
	shd = createShader(vShader, fShader)
}

function draw() {
	shader(shd)
	shd.setUniform('resolution', [width, height])
	rect(0, 0, width, height)
}
