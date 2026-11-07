'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import * as THREE from 'three';

/**
 * Galaxia espiral en Three.js inspirada en la imagen de Andrómeda del hero:
 * núcleo crema, brazos que pasan por ocre y rosa violáceo hasta un azul profundo,
 * sobre un cielo azul noche.
 */

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutBack = (t: number) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);
const SPLASH_SECONDS = 2.4;

export interface MilkyWayPointer {
  /** Posición normalizada desde el centro, -0.5..0.5. */
  x: number;
  y: number;
}

interface MilkyWayProps {
  className?: string;
  /** Avance del scroll 0..1: la cámara viaja hacia el núcleo. */
  progress?: RefObject<number>;
  /** Cursor normalizado: paralaje suave de la cámara. */
  pointer?: RefObject<MilkyWayPointer>;
  /** Multiplicador de partículas (0..1) para usos secundarios más livianos. */
  density?: number;
  /** Pinta el cielo azul noche detrás de la galaxia. */
  backdrop?: boolean;
  /** Al entrar en pantalla la galaxia nace girando desde un punto (se repite al volver a entrar). */
  splash?: boolean;
}

// Paradas de color del núcleo al borde, tomadas de la imagen de referencia.
const RADIAL_STOPS: [number, THREE.Color][] = [
  [0.0, new THREE.Color('#fff6e8')],
  [0.1, new THREE.Color('#ffdcae')],
  [0.26, new THREE.Color('#eaa57e')],
  [0.46, new THREE.Color('#c88cc9')],
  [0.68, new THREE.Color('#7f9fea')],
  [1.0, new THREE.Color('#3f6fd6')],
];

const sampleRadial = (t: number, target: THREE.Color) => {
  for (let i = 1; i < RADIAL_STOPS.length; i += 1) {
    const [edge, color] = RADIAL_STOPS[i];
    if (t <= edge) {
      const [prevEdge, prevColor] = RADIAL_STOPS[i - 1];
      return target.copy(prevColor).lerp(color, (t - prevEdge) / (edge - prevEdge));
    }
  }
  return target.copy(RADIAL_STOPS[RADIAL_STOPS.length - 1][1]);
};

// Aleatorio aproximadamente gaussiano (-1..1), más denso en el centro.
const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

const POINT_VERTEX = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uScale;
  uniform float uTwinkle;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float twinkle = 1.0 - uTwinkle + uTwinkle * (0.5 + 0.5 * sin(uTime * (0.7 + aPhase) + aPhase * 6.2831));
    gl_PointSize = aSize * uScale / -mv.z;
    vColor = aColor;
    vAlpha = twinkle;
  }
`;

const POINT_FRAGMENT = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    gl_FragColor = vec4(vColor, a * vAlpha * uOpacity);
  }
`;

interface Layer {
  points: THREE.Points;
  material: THREE.ShaderMaterial;
}

function makeLayer(
  positions: Float32Array,
  colors: Float32Array,
  sizes: Float32Array,
  options: { opacity?: number; twinkle?: number; blending?: THREE.Blending } = {},
): Layer {
  const geometry = new THREE.BufferGeometry();
  const phases = new Float32Array(sizes.length);
  for (let i = 0; i < phases.length; i += 1) phases[i] = Math.random();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
  const material = new THREE.ShaderMaterial({
    vertexShader: POINT_VERTEX,
    fragmentShader: POINT_FRAGMENT,
    uniforms: {
      uTime: { value: 0 },
      uScale: { value: 1 },
      uOpacity: { value: options.opacity ?? 1 },
      uTwinkle: { value: options.twinkle ?? 0 },
    },
    transparent: true,
    depthWrite: false,
    blending: options.blending ?? THREE.AdditiveBlending,
  });
  return { points: new THREE.Points(geometry, material), material };
}

interface DiskOptions {
  count: number;
  radius: number;
  size: [number, number];
  opacity?: number;
  twinkle?: number;
  armShare?: number;
  sprinkle?: boolean;
}

/** Disco de la galaxia: dos brazos espirales muy cerrados con un bulbo central denso. */
function buildDisk({ count, radius, size, opacity = 1, twinkle = 0, armShare = 0.66, sprinkle = true }: DiskOptions): Layer {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const color = new THREE.Color();
  const branches = 2;
  const spin = 1.55;

  for (let i = 0; i < count; i += 1) {
    const r = Math.pow(Math.random(), 1.45) * radius;
    const t = r / radius;
    const inArm = Math.random() < armShare;
    const branchAngle = ((i % branches) / branches) * Math.PI * 2;
    const angle = inArm ? branchAngle + r * spin : Math.random() * Math.PI * 2;
    const scatter = inArm ? 0.25 + t * 0.9 : 0.4;
    const ox = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * scatter;
    const oz = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * scatter;
    const bulge = Math.exp(-(r * r) / 1.4);
    const oy = gauss() * (0.06 + bulge * 0.5);

    positions[i * 3] = Math.cos(angle) * r + ox;
    positions[i * 3 + 1] = oy;
    positions[i * 3 + 2] = Math.sin(angle) * r + oz;

    sampleRadial(clamp(t + gauss() * 0.07), color);
    if (sprinkle) {
      const roll = Math.random();
      if (t > 0.28 && roll < 0.03) color.set('#ff9fd4'); // regiones de formación estelar
      else if (t > 0.4 && roll < 0.07) color.set('#d6e4ff'); // estrellas jóvenes azuladas
    }
    // El bulbo se apaga un poco para que la suma aditiva no queme el núcleo.
    const gain = 0.24 + 0.76 * clamp(t * 2.2);
    colors[i * 3] = color.r * gain;
    colors[i * 3 + 1] = color.g * gain;
    colors[i * 3 + 2] = color.b * gain;
    sizes[i] = size[0] + Math.random() * (size[1] - size[0]);
  }

  return makeLayer(positions, colors, sizes, { opacity, twinkle });
}

/** Bandas de polvo: puntos oscuros con mezcla normal que dibujan las vetas marrones entre los brazos. */
function buildDust(count: number, radius: number): Layer {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const color = new THREE.Color();
  const tones = [new THREE.Color('#2b140f'), new THREE.Color('#3a1c1a'), new THREE.Color('#1c1426')];
  const spin = 1.55;

  for (let i = 0; i < count; i += 1) {
    const r = radius * (0.16 + Math.pow(Math.random(), 1.1) * 0.7);
    // Desfasadas respecto a los brazos para quedar en su borde interior.
    let angle = ((i % 2) / 2) * Math.PI * 2 + r * spin - 0.42 + gauss() * 0.3;
    // Vetas discontinuas: se descartan tramos según una onda en el ángulo.
    if (Math.sin(angle * 3.0 + r * 2.1) < -0.25) angle += 0.9 + Math.random() * 0.6;
    const scatter = 0.2 + (r / radius) * 0.5;
    positions[i * 3] = Math.cos(angle) * r + gauss() * scatter;
    positions[i * 3 + 1] = gauss() * 0.05;
    positions[i * 3 + 2] = Math.sin(angle) * r + gauss() * scatter;
    color.copy(tones[i % tones.length]);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
    sizes[i] = 3 + Math.random() * 5;
  }

  return makeLayer(positions, colors, sizes, { opacity: 0.13, blending: THREE.NormalBlending });
}

/** Cielo de fondo: estrellas en una cáscara esférica lejana, blancas, azuladas y algunas cálidas. */
function buildSky(count: number): Layer {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const tints = ['#ffffff', '#dfe8ff', '#c4d6ff', '#fff0dc'].map((hex) => new THREE.Color(hex));
  const vector = new THREE.Vector3();

  for (let i = 0; i < count; i += 1) {
    vector.randomDirection().multiplyScalar(70 + Math.random() * 50);
    // Solo el hemisferio que ve la cámara.
    if (vector.z > 10) vector.z = -vector.z;
    positions[i * 3] = vector.x;
    positions[i * 3 + 1] = vector.y;
    positions[i * 3 + 2] = vector.z - 20;
    const tint = tints[Math.floor(Math.random() * tints.length)];
    const bright = 0.45 + Math.random() * 0.55;
    colors[i * 3] = tint.r * bright;
    colors[i * 3 + 1] = tint.g * bright;
    colors[i * 3 + 2] = tint.b * bright;
    const big = Math.random();
    sizes[i] = (big < 0.012 ? 9 + Math.random() * 5 : big < 0.08 ? 4.5 + Math.random() * 2 : 2 + Math.random() * 2) * 3.2;
  }

  return makeLayer(positions, colors, sizes, { twinkle: 0.55 });
}

/** Destello con halo: el núcleo de la galaxia satélite y algunas estrellas brillantes del primer plano. */
function makeFlareTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.08, 'rgba(240,246,255,0.95)');
  gradient.addColorStop(0.25, 'rgba(190,215,255,0.28)');
  gradient.addColorStop(1, 'rgba(150,190,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function buildFlares(): THREE.Group {
  const group = new THREE.Group();
  const texture = makeFlareTexture();
  const flares: [number, number, number, number][] = [
    // x, y, z, escala
    [-3.3, 1.0, 1, 1.15], // satélite brillante sobre el disco, como en la imagen
    [-5.6, 1.1, 0, 0.45],
    [6.4, 2.9, -2, 0.4],
    [-1.6, 3.7, -3, 0.35],
    [4.6, -2.6, 0, 0.32],
  ];
  for (const [x, y, z, scale] of flares) {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    sprite.position.set(x, y, z);
    sprite.scale.setScalar(scale);
    group.add(sprite);
  }
  return group;
}

/** Resplandor del núcleo: plano en el plano galáctico para que se vea elíptico como el disco. */
function buildCoreGlow(): THREE.Mesh {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,244,226,1)');
  gradient.addColorStop(0.18, 'rgba(255,222,180,0.75)');
  gradient.addColorStop(0.45, 'rgba(232,160,120,0.22)');
  gradient.addColorStop(1, 'rgba(200,120,150,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 5.2), material);
  mesh.rotation.x = -Math.PI / 2;
  return mesh;
}

/** Onda expansiva del splash: anillo luminoso en el plano galáctico. */
function buildShockwave(): THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial> {
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#bcd4ff'),
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.92, 1, 128), material);
  ring.rotation.x = -Math.PI / 2;
  ring.visible = false;
  return ring;
}

export default function MilkyWay({ className = '', progress, pointer, density = 1, backdrop = true, splash = false }: MilkyWayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    } catch {
      setFailed(true);
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 300);
    camera.position.set(0, 0, 20);

    // Inclinada casi de canto y subiendo hacia la derecha, como en la imagen.
    const galaxy = new THREE.Group();
    galaxy.rotation.set(0.27, 0, 0.2);
    scene.add(galaxy);

    const radius = 6;
    const layers: Layer[] = [
      // Bruma: pocos puntos grandes y tenues que dan el aspecto nebuloso del disco.
      buildDisk({ count: Math.round((small ? 3500 : 7000) * density), radius, size: [7, 16], opacity: 0.07, armShare: 0.55, sprinkle: false }),
      // Polvo entre la bruma y las estrellas para que oscurezca el brillo sin tapar los puntos.
      buildDust(Math.round((small ? 5000 : 10000) * density), radius),
      // Estrellas del disco.
      buildDisk({ count: Math.round((small ? 32000 : 64000) * density), radius, size: [0.5, 1.4], twinkle: 0.25 }),
    ];
    // El orden de dibujo respeta el de la lista (bruma, polvo, estrellas).
    layers.forEach((layer, order) => (layer.points.renderOrder = order));
    layers.forEach((layer) => galaxy.add(layer.points));
    const core = buildCoreGlow();
    galaxy.add(core);

    const sky = buildSky(Math.round((small ? 2000 : 4200) * density));
    scene.add(sky.points);
    layers.push(sky);
    const flares = buildFlares();
    scene.add(flares);
    const shockwave = buildShockwave();
    galaxy.add(shockwave);
    const baseOpacity = layers.map((layer) => layer.material.uniforms.uOpacity.value as number);
    const coreMaterial = core.material as THREE.MeshBasicMaterial;

    let width = 0;
    let height = 0;
    let baseZ = 20;
    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      const aspect = width / height;
      camera.aspect = aspect;
      // En pantallas verticales la cámara se aleja para que el disco no quede cortado del todo.
      baseZ = clamp(26 / aspect, 18, 34);
      camera.updateProjectionMatrix();
      const scale = height * renderer.getPixelRatio() * 0.062;
      layers.forEach((layer) => (layer.material.uniforms.uScale.value = scale));
    };

    let frame = 0;
    let visible = true;
    const clock = new THREE.Clock();

    const look = { x: 0, y: 0 };
    let splashStart: number | null = null;
    let splashPending = false;
    const render = () => {
      const elapsed = clock.getElapsedTime();
      if (splashPending) {
        splashStart = elapsed;
        splashPending = false;
      }
      // 0 = punto inicial, 1 = galaxia completa.
      const bloom = !splash || reduceMotion ? 1 : splashStart === null ? 0 : clamp((elapsed - splashStart) / SPLASH_SECONDS);
      const grow = easeOutBack(bloom);
      galaxy.scale.setScalar(0.04 + 0.96 * grow);
      // La onda sale del núcleo durante el primer tramo y se desvanece al llegar al borde.
      const wave = clamp(bloom / 0.6);
      shockwave.visible = splash && bloom > 0 && wave < 1;
      if (shockwave.visible) {
        shockwave.scale.setScalar((0.3 + wave * 9) / Math.max(galaxy.scale.x, 0.2));
        shockwave.material.opacity = Math.pow(1 - wave, 1.6) * 0.85;
      }
      const p = reduceMotion ? 0 : clamp(progress?.current ?? 0);
      const travel = easeInOut(p);
      const target = pointer?.current;
      look.x += ((target?.x ?? 0) - look.x) * 0.05;
      look.y += ((target?.y ?? 0) - look.y) * 0.05;

      galaxy.rotation.y = elapsed * 0.025 + travel * 0.9 - (1 - easeInOut(bloom)) * 2.6;
      // Con el scroll la cámara se acerca al núcleo y se inclina un poco sobre el disco.
      camera.position.set(look.x * 1.6 * (1 - travel), -look.y * 1.1 * (1 - travel) + travel * 1.2, baseZ * (1 - travel * 0.72));
      camera.lookAt(0, 0, 0);
      const light = splash ? clamp(bloom * 1.8) : 1;
      layers.forEach((layer, index) => {
        layer.material.uniforms.uTime.value = elapsed;
        layer.material.uniforms.uOpacity.value = baseOpacity[index] * light;
      });
      // El núcleo se enciende con un destello que se pasa un poco y se asienta.
      coreMaterial.opacity = splash ? Math.min(1.6, light * (1 + Math.sin(Math.PI * clamp(bloom / 0.5)) * 0.6)) : 1;
      renderer.render(scene, camera);
    };

    const loop = () => {
      if (visible) render();
      frame = requestAnimationFrame(loop);
    };

    resize();
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) render();
    });
    resizeObserver.observe(container);
    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!splash) return;
        if (!entry.isIntersecting) splashStart = null;
        else if (splashStart === null && entry.intersectionRatio >= 0.3) splashPending = true;
      },
      { threshold: [0, 0.3] },
    );
    visibility.observe(container);

    if (reduceMotion) render();
    else frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        mesh.geometry?.dispose();
        const material = mesh.material as THREE.Material & { map?: THREE.Texture };
        material?.map?.dispose();
        material?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [progress, pointer, density, splash]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`${backdrop ? 'bg-[radial-gradient(70%_60%_at_50%_46%,#12357a_0%,#0a2257_38%,#06133a_68%,#030a1f_100%)]' : ''} ${className}`}
    >
      {failed && (
        // Sin WebGL: se muestra la imagen original como respaldo.
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/images/andromeda.webp" alt="" className="h-full w-full object-cover" />
      )}
    </div>
  );
}
