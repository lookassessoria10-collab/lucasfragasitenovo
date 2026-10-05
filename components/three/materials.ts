import * as THREE from "three";

/**
 * Material "holográfico": fresnel (bordas acesas, miolo translúcido) com
 * mistura aditiva — o visual de raio-X elegante das peças de referência.
 * Não usa luzes nem ordenação de transparência, o que o torna barato
 * inclusive em celulares.
 */

/** Uniforms compartilhados por todos os materiais da cena. */
export const sharedUniforms = {
  uTime: { value: 0 },
  uFocus: { value: new THREE.Vector3() },
  uFocusRadius: { value: 12 },
};

const vertexShader = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vWorld;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uCore;
  uniform vec3 uHi;
  uniform float uOpacity;
  uniform float uHighlight;
  uniform float uBase;
  uniform float uPower;
  uniform float uTime;
  uniform vec3 uFocus;
  uniform float uFocusRadius;
  varying vec3 vNormalW;
  varying vec3 vWorld;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorld);
    float facing = abs(dot(normalize(vNormalW), viewDir));
    float rim = pow(1.0 - facing, uPower);
    float pulse = 0.5 + 0.5 * sin(uTime * 2.6);

    vec3 color = mix(uCore, uColor, rim);
    color = mix(color, uHi, uHighlight * (0.45 + 0.25 * pulse));

    float alpha = uBase + rim * (1.0 - uBase);
    alpha *= uOpacity * (1.0 + uHighlight * (0.15 + 0.25 * pulse));

    float d = distance(vWorld, uFocus);
    alpha *= 1.0 - smoothstep(uFocusRadius * 0.5, uFocusRadius, d);

    gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
    #include <colorspace_fragment>
    gl_FragColor.rgb *= gl_FragColor.a;
  }
`;

export type HoloOptions = {
  color: string;
  core: string;
  highlight?: string;
  base?: number;
  power?: number;
};

export function createHoloMaterial(o: HoloOptions) {
  return new THREE.ShaderMaterial({
    uniforms: {
      ...sharedUniforms,
      uColor: { value: new THREE.Color(o.color) },
      uCore: { value: new THREE.Color(o.core) },
      uHi: { value: new THREE.Color(o.highlight ?? "#E6FFFC") },
      uOpacity: { value: 1 },
      uHighlight: { value: 0 },
      uBase: { value: o.base ?? 0.05 },
      uPower: { value: o.power ?? 2.1 },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    side: THREE.DoubleSide,
    blending: THREE.CustomBlending,
    blendEquation: THREE.AddEquation,
    blendSrc: THREE.OneFactor,
    blendDst: THREE.OneFactor,
  });
}

export const palette = {
  bone: { color: "#7DF3E8", core: "#0E4D73" },
  boneDim: { color: "#3FB8D9", core: "#0B2F55" },
  tendon: { color: "#2FA8E8", core: "#0A2B57", highlight: "#5FF3E6" },
  nerve: { color: "#9BE7FF", core: "#123B66", highlight: "#D9FFFB" },
  accent: "#00E5D3",
};

/** Halo radial suave atrás do foco (billboard). */
export function createHaloMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color("#0FA3C9") },
      uOpacity: { value: 0.5 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying vec2 vUv;
      void main() {
        float d = length(vUv - 0.5) * 2.0;
        float a = pow(max(0.0, 1.0 - d), 2.4) * uOpacity;
        gl_FragColor = vec4(uColor, a);
        #include <colorspace_fragment>
        gl_FragColor.rgb *= gl_FragColor.a;
      }
    `,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.CustomBlending,
    blendEquation: THREE.AddEquation,
    blendSrc: THREE.OneFactor,
    blendDst: THREE.OneFactor,
  });
}

/** Partículas flutuantes (poeira luminosa) — reforçam profundidade sem custo relevante. */
export function createParticleMaterial(pixelRatio: number) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: sharedUniforms.uTime,
      uOpacity: { value: 1 },
      uMotion: { value: 1 },
      uSize: { value: 22 * pixelRatio },
      uColor: { value: new THREE.Color("#7FF5EA") },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform float uSize;
      uniform float uMotion;
      attribute float aSeed;
      varying float vTwinkle;
      void main() {
        vec3 p = position;
        float t = uTime * 0.18 * uMotion;
        p.y += sin(t + aSeed * 6.2831) * 0.25 * uMotion;
        p.x += cos(t * 0.7 + aSeed * 12.0) * 0.18 * uMotion;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = uSize * (0.35 + aSeed * 0.65) / -mv.z;
        vTwinkle = 0.45 + 0.55 * sin(uTime * (0.6 + aSeed) + aSeed * 30.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vTwinkle;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d) * 0.55 * vTwinkle * uOpacity;
        gl_FragColor = vec4(uColor, a);
        #include <colorspace_fragment>
        gl_FragColor.rgb *= gl_FragColor.a;
      }
    `,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.CustomBlending,
    blendEquation: THREE.AddEquation,
    blendSrc: THREE.OneFactor,
    blendDst: THREE.OneFactor,
  });
}
