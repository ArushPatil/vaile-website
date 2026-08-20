/* ================================================================
   VAILE — Native WebGL2 MoltenMetal Shader
   Ported from React Bits (DavidHDev) for vanilla Vite
   ================================================================ */

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
};

const colorModeToFloat = (mode) => (mode === 'ember' ? 1 : mode === 'frost' ? 2 : 0);

const vertexShaderSource = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uScale;
uniform float uDetail;
uniform float uGlow;
uniform float uCoreSize;
uniform float uSwirl;
uniform float uFold;
uniform float uBlackPoint;
uniform float uBrightness;
uniform float uColorMode;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform bool uEnableMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  float time = iTime * uSpeed;
  vec2 p = uScale * ((gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y) - 0.5;

  vec2 drift = vec2(0.0);
  if (uEnableMouse) {
    drift = (uMouse - 0.5) * uMouseStrength * 2.0;
  }
  p += drift;

  vec2 i = p;
  float c = 0.0;
  float r = length(p + vec2(sin(time), sin(time * 0.3 + 5.0)) * 0.5);
  float d = length(p);
  float rot = d + time + p.x * uSwirl;

  float cosRot = cos(rot);
  mat2 warp = mat2(cos(rot - sin(time / 5.0)), sin(rot), -sin(cosRot - time), cosRot) * uFold;
  float glowCore = uGlow * uCoreSize;

  for (float n = 0.0; n < 8.0; n++) {
    if (n >= uDetail) break;
    p *= warp;
    float t = r - time / (n + 3.0);
    i -= p + vec2(cos(t - i.x - r) + sin(t + i.y), sin(t - i.y) + cos(t + i.x) + r);
    c += glowCore / length(vec2(sin(i.x + t), cos(i.y + t)));
  }

  c /= 6.0;

  float intensity = max(c - uBlackPoint, 0.0) * uBrightness;
  float g = clamp(intensity, 0.0, 1.0);

  float mid = 0.5;
  if (uColorMode > 1.5) {
    mid = 0.65;
  } else if (uColorMode > 0.5) {
    mid = 0.35;
  }

  vec3 col = mix(uColor1, uColor2, smoothstep(0.0, mid, g));
  col = mix(col, uColor3, smoothstep(mid, 1.0, g));

  float a = g;
  if (uGrain > 0.5) {
    float gr = hash(gl_FragCoord.xy + iTime);
    a += (gr - 0.5) * uGrainIntensity;
  }
  a = clamp(a, 0.0, 1.0) * uOpacity;
  fragColor = vec4(col * a, a);
}
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export function initMoltenMetal(canvas, options = {}) {
  if (!canvas) return null;

  const gl = canvas.getContext('webgl2', { alpha: true, antialias: true, premultipliedAlpha: false });
  if (!gl) {
    console.warn('WebGL2 not supported for MoltenMetal');
    return null;
  }

  const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = createProgram(gl, vs, fs);

  // Full-screen triangle buffer
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -1, -1,
       3, -1,
      -1,  3,
    ]),
    gl.STATIC_DRAW
  );

  const positionLocation = gl.getAttribLocation(program, 'position');
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  // Uniform locations
  const uniforms = {
    iResolution: gl.getUniformLocation(program, 'iResolution'),
    iTime: gl.getUniformLocation(program, 'iTime'),
    uSpeed: gl.getUniformLocation(program, 'uSpeed'),
    uScale: gl.getUniformLocation(program, 'uScale'),
    uDetail: gl.getUniformLocation(program, 'uDetail'),
    uGlow: gl.getUniformLocation(program, 'uGlow'),
    uCoreSize: gl.getUniformLocation(program, 'uCoreSize'),
    uSwirl: gl.getUniformLocation(program, 'uSwirl'),
    uFold: gl.getUniformLocation(program, 'uFold'),
    uBlackPoint: gl.getUniformLocation(program, 'uBlackPoint'),
    uBrightness: gl.getUniformLocation(program, 'uBrightness'),
    uColorMode: gl.getUniformLocation(program, 'uColorMode'),
    uGrain: gl.getUniformLocation(program, 'uGrain'),
    uGrainIntensity: gl.getUniformLocation(program, 'uGrainIntensity'),
    uOpacity: gl.getUniformLocation(program, 'uOpacity'),
    uMouse: gl.getUniformLocation(program, 'uMouse'),
    uMouseStrength: gl.getUniformLocation(program, 'uMouseStrength'),
    uEnableMouse: gl.getUniformLocation(program, 'uEnableMouse'),
    uColor1: gl.getUniformLocation(program, 'uColor1'),
    uColor2: gl.getUniformLocation(program, 'uColor2'),
    uColor3: gl.getUniformLocation(program, 'uColor3'),
  };

  // Config parameters exactly matching user's React Bits setup
  const config = {
    color1: options.color1 || '#9085b9',
    color2: options.color2 || '#75a596',
    color3: options.color3 || '#FFFFFF',
    colorMode: options.colorMode || 'molten',
    speed: options.speed ?? 0.35,
    scale: options.scale ?? 4,
    detail: options.detail ?? 3,
    glow: options.glow ?? 1.6,
    coreSize: options.coreSize ?? 0.1,
    swirl: options.swirl ?? 1,
    fold: options.fold ?? -0.2,
    blackPoint: options.blackPoint ?? 0.05,
    brightness: options.brightness ?? 1.3,
    opacity: options.opacity ?? 1,
    grain: options.grain ?? true,
    grainIntensity: options.grainIntensity ?? 0.05,
    mouseInteraction: options.mouseInteraction ?? false,
    mouseStrength: options.mouseStrength ?? 0.3,
  };

  let mouse = [0.5, 0.5];
  let targetMouse = [0.5, 0.5];

  if (config.mouseInteraction) {
    window.addEventListener('mousemove', (e) => {
      targetMouse[0] = e.clientX / window.innerWidth;
      targetMouse[1] = 1.0 - e.clientY / window.innerHeight;
    });
  }

  function resize() {
    // Optimization for mobile: cap DPR at 1.5 to guarantee 60fps on high-res mobile displays
    const isMobile = window.innerWidth <= 768;
    const dpr = isMobile ? Math.min(window.devicePixelRatio || 1, 1.5) : Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || canvas.parentElement?.clientHeight || window.innerHeight;
    
    if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
  }

  resize();
  window.addEventListener('resize', resize);

  let animationFrameId = null;
  let isVisible = true;
  const startTime = performance.now();

  function render() {
    if (!isVisible) return;
    resize();
    const currentTime = (performance.now() - startTime) * 0.001;

    gl.useProgram(program);
    gl.bindVertexArray(vao);

    gl.uniform2f(uniforms.iResolution, canvas.width, canvas.height);
    gl.uniform1f(uniforms.iTime, currentTime);
    gl.uniform1f(uniforms.uSpeed, config.speed);
    gl.uniform1f(uniforms.uScale, config.scale);
    gl.uniform1f(uniforms.uDetail, config.detail);
    gl.uniform1f(uniforms.uGlow, config.glow);
    gl.uniform1f(uniforms.uCoreSize, config.coreSize);
    gl.uniform1f(uniforms.uSwirl, config.swirl);
    gl.uniform1f(uniforms.uFold, config.fold);
    gl.uniform1f(uniforms.uBlackPoint, config.blackPoint);
    gl.uniform1f(uniforms.uBrightness, config.brightness);
    gl.uniform1f(uniforms.uColorMode, colorModeToFloat(config.colorMode));
    gl.uniform1f(uniforms.uGrain, config.grain ? 1.0 : 0.0);
    gl.uniform1f(uniforms.uGrainIntensity, config.grainIntensity);
    gl.uniform1f(uniforms.uOpacity, config.opacity);

    mouse[0] += (targetMouse[0] - mouse[0]) * 0.05;
    mouse[1] += (targetMouse[1] - mouse[1]) * 0.05;
    gl.uniform2f(uniforms.uMouse, mouse[0], mouse[1]);
    gl.uniform1f(uniforms.uMouseStrength, config.mouseStrength);
    gl.uniform1i(uniforms.uEnableMouse, config.mouseInteraction ? 1 : 0);

    const c1 = hexToRgb(config.color1);
    const c2 = hexToRgb(config.color2);
    const c3 = hexToRgb(config.color3);
    gl.uniform3f(uniforms.uColor1, c1[0], c1[1], c1[2]);
    gl.uniform3f(uniforms.uColor2, c2[0], c2[1], c2[2]);
    gl.uniform3f(uniforms.uColor3, c3[0], c3[1], c3[2]);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    animationFrameId = requestAnimationFrame(render);
  }

  // IntersectionObserver: automatically pauses WebGL render loop when out of viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isVisible) {
            isVisible = true;
            animationFrameId = requestAnimationFrame(render);
          }
        } else {
          isVisible = false;
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        }
      });
    },
    { rootMargin: '100px 0px 100px 0px' }
  );

  observer.observe(canvas.parentElement || canvas);
  animationFrameId = requestAnimationFrame(render);

  return {
    destroy() {
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    },
  };
}
