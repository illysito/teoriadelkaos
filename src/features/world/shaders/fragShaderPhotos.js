const disp_frag_photos = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_offset;
uniform float u_mouseX;
uniform float u_mouseY;
uniform sampler2D u_img;
uniform sampler2D u_perlin;
uniform sampler2D u_bg;

varying vec2 v_texcoord;

float random(vec2 uv) {
  return fract(sin(dot(uv.xy,
      vec2(12.9898,78.233))) *
          43758.5453123);
}

vec2 aspect(vec2 uv, float image_ratio, float canvas_ratio){
  // if canvas is taller than image, stretch downwards
  // if canvas is landscape to the image, stretch across
  if(image_ratio >= canvas_ratio){
    float ratio = canvas_ratio / image_ratio;
    uv.x *= ratio;
    uv.x += (1.0 - ratio) / 2.0; 
  } else {
    float ratio = image_ratio / canvas_ratio;
    uv.y *= ratio;
    uv.y += (1.0 - ratio) / 2.0; 
  }
  return uv;
}

void main()
{

  // CREO EL VECTOR UV Y LO AJUSTO A RESOLLUCION

  vec2 uv = v_texcoord;
  //uv.x *= u_resolution.x / u_resolution.y;

  // find out the ratios
  float image_ratio = 800.0 / 1000.0;
  float canvas_ratio = u_resolution.x / u_resolution.y;

  vec2 coords = aspect(uv, image_ratio, canvas_ratio);

  float blocks = 400.0;
  float xBlocks = floor(coords.x * blocks) / blocks;
  float yBlocks = floor(coords.y * blocks) / blocks;
  vec2 blockCoords = vec2(xBlocks, yBlocks);
  
  vec2 distortionCoords = vec2(
    coords.x,
    coords.y
  );

  // NOISE

  float noise = random(uv + sin(u_time));
  float noiseFactor = 0.02;

  vec4 imgRed = texture2D(u_img, vec2(distortionCoords.x + 0.02 * u_mouseX, distortionCoords.y + 0.005 * sin(u_time)));
  imgRed.r *= 1.0;
  imgRed.g = 0.0;
  imgRed.b = 0.0;

  vec4 imgGreen = texture2D(u_img, vec2(distortionCoords.x, distortionCoords.y - 0.01 * u_mouseY));
  imgGreen.r = 0.0;
  imgGreen.g *= 1.0;
  imgGreen.b = 0.0;

  vec4 imgBlue = texture2D(u_img, vec2(distortionCoords.x - 0.012 * cos(u_time), distortionCoords.y));
  imgBlue.r = 0.0;
  imgBlue.g = 0.0;
  imgBlue.b *= 1.0;

  vec4 img = vec4(imgRed + imgGreen + imgBlue);

  img += noise * noiseFactor;

  // DISPLACEMENT WITH PERLIN

  float displacementCoef = 0.4;

  vec4 backgroundImg = texture2D(u_bg, coords);
  vec4 perlinImg = texture2D(u_perlin, coords);

  float displaceForce1 = perlinImg.r * u_offset * displacementCoef;
  vec2 uvDisplaced1 = vec2(distortionCoords.x + displaceForce1, distortionCoords.y);
  float displaceForce2 = perlinImg.r * (1.0 - u_offset) * displacementCoef;
  vec2 uvDisplaced2 = vec2(coords.x - displaceForce2, coords.y);

  vec4 displacedImgOmy = texture2D(u_img, uvDisplaced1);
  vec4 displacedBG = texture2D(u_bg, uvDisplaced2);

  vec4 finalImg = (displacedImgOmy * (1.0 - u_offset) + displacedBG * u_offset);

  gl_FragColor = 1.0 * finalImg;
}
`
export default disp_frag_photos
