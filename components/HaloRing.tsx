'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Mundo anillo en Three.js: una banda colosal con tierra, mar y nubes en su cara interior,
 * flotando en el espacio profundo. Geometría propia; no usa recursos de ningún juego.
 */

const RING_RADIUS = 3;
const RING_WIDTH = 0.3;

/** Paisaje procedural de la cara interior: mar turquesa, tierras verde oscuro, hielo y nubes, que da la vuelta sin costuras. */
function makeLandscapeTexture() {
  const width = 2048;
  const height = 160;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Mar profundo de base.
  const sea = ctx.createLinearGradient(0, 0, 0, height);
  sea.addColorStop(0, '#2a6f8f');
  sea.addColorStop(0.5, '#5aa9c6');
  sea.addColorStop(1, '#2a6f8f');
  ctx.fillStyle = sea;
  ctx.fillRect(0, 0, width, height);

  // Dibuja cada mancha dos veces, desplazada un ancho, para que el borde empate al cerrar el anillo.
  const blob = (x: number, y: number, rx: number, ry: number, color: string) => {
    for (const offset of [0, -width, width]) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(x + offset, y, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  // Continentes: grupos de manchas verdes con bordes de arena.
  for (let c = 0; c < 9; c += 1) {
    const cx = rand() * width;
    const cy = height * (0.3 + rand() * 0.4);
    const size = 40 + rand() * 90;
    for (let i = 0; i < 26; i += 1) {
      const x = cx + (rand() - 0.5) * size * 2.2;
      const y = cy + (rand() - 0.5) * height * 0.55;
      blob(x, y, 10 + rand() * size * 0.5, 6 + rand() * 18, '#b9cfd6');
    }
    for (let i = 0; i < 26; i += 1) {
      const x = cx + (rand() - 0.5) * size * 2;
      const y = cy + (rand() - 0.5) * height * 0.48;
      blob(x, y, 8 + rand() * size * 0.45, 5 + rand() * 15, rand() < 0.5 ? '#2f5a3a' : '#24472f');
    }
    // Cordilleras con nieve.
    for (let i = 0; i < 8; i += 1) {
      const x = cx + (rand() - 0.5) * size * 1.4;
      const y = cy + (rand() - 0.5) * height * 0.3;
      blob(x, y, 4 + rand() * 12, 2 + rand() * 4, '#7a6e5a');
      blob(x, y - 1, 2 + rand() * 6, 1 + rand() * 2, '#eef2f5');
    }
  }

  // Nubes alargadas en el sentido del giro.
  ctx.globalAlpha = 0.7;
  for (let i = 0; i < 120; i += 1) {
    blob(rand() * width, rand() * height, 18 + rand() * 70, 2 + rand() * 6, '#ffffff');
  }
  ctx.globalAlpha = 1;

  // Muros laterales del anillo: franjas oscuras en los bordes de la banda.
  ctx.fillStyle = '#1b1f25';
  ctx.fillRect(0, 0, width, 7);
  ctx.fillRect(0, height - 7, width, 7);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.anisotropy = 8;
  return texture;
}

/** Casco exterior: placas de metal oscuro con juntas, y una fila de luces cian (mapa de emisión aparte). */
function makeHullTextures() {
  const width = 2048;
  const height = 64;
  const make = () => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return [canvas, canvas.getContext('2d')!] as const;
  };

  const [colorCanvas, color] = make();
  color.fillStyle = '#2b3038';
  color.fillRect(0, 0, width, height);
  color.fillStyle = '#1b1f25';
  for (let x = 0; x < width; x += 24) color.fillRect(x, 0, 2, height);
  color.fillRect(0, height * 0.22, width, 2);
  color.fillRect(0, height * 0.78, width, 2);
  color.fillStyle = '#3b424c';
  for (let x = 6; x < width; x += 48) color.fillRect(x, height * 0.3, 10, height * 0.4);

  // Luces: medias lunas cian a intervalos regulares, en el centro de la banda.
  const [glowCanvas, glow] = make();
  glow.fillStyle = '#000000';
  glow.fillRect(0, 0, width, height);
  glow.fillStyle = '#4ff0f2';
  for (let x = 16; x < width; x += 64) {
    glow.beginPath();
    glow.ellipse(x, height / 2, 7, 12, 0, -Math.PI / 2, Math.PI / 2);
    glow.fill();
  }

  const toTexture = (canvas: HTMLCanvasElement) => {
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.set(2, 1);
    return texture;
  };
  return { map: toTexture(colorCanvas), emissiveMap: toTexture(glowCanvas) };
}

export default function HaloRing({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 200);
    camera.position.set(0, 0.4, 13);
    camera.lookAt(0, 0, 0);

    // Luz de una estrella lejana a la izquierda y un relleno frío muy suave.
    const sunLight = new THREE.DirectionalLight(0xfff1dc, 2.6);
    sunLight.position.set(-5, 4, 8);
    scene.add(sunLight);
    scene.add(new THREE.AmbientLight(0x8197c4, 0.75));

    // El anillo se inclina para que se vea la cara interior del lado lejano.
    const ring = new THREE.Group();
    ring.rotation.set(0.42, 0.0, -0.36);
    scene.add(ring);

    const band = new THREE.Group();
    ring.add(band);
    // Cara interior habitable: el paisaje se ve desde dentro del cilindro (BackSide).
    const land = new THREE.Mesh(
      new THREE.CylinderGeometry(RING_RADIUS, RING_RADIUS, RING_WIDTH, 256, 1, true),
      new THREE.MeshStandardMaterial({ map: makeLandscapeTexture(), roughness: 0.9, metalness: 0, side: THREE.BackSide }),
    );
    band.add(land);

    // Casco exterior, un poco más grande para no pelear con la cara interior.
    const hull = new THREE.Mesh(
      new THREE.CylinderGeometry(RING_RADIUS * 1.012, RING_RADIUS * 1.012, RING_WIDTH, 256, 1, true),
      new THREE.MeshStandardMaterial({
        ...makeHullTextures(),
        emissive: 0xffffff,
        emissiveIntensity: 1.6,
        roughness: 0.5,
        metalness: 0.8,
        side: THREE.FrontSide,
      }),
    );
    band.add(hull);

    // Muros laterales: dos anillos planos que cierran la banda por arriba y por abajo.
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xe6d6dc, emissive: 0x3a2a30, roughness: 0.35, metalness: 0.6, side: THREE.DoubleSide });
    for (const y of [RING_WIDTH / 2, -RING_WIDTH / 2]) {
      const wall = new THREE.Mesh(new THREE.RingGeometry(RING_RADIUS * 0.985, RING_RADIUS * 1.012, 256), wallMaterial);
      wall.rotation.x = -Math.PI / 2;
      wall.position.y = y;
      band.add(wall);
    }

    // Campo de estrellas lejano.
    const starCount = 900;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i += 1) {
      starPositions[i * 3] = (Math.random() - 0.5) * 70;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 44;
      starPositions[i * 3 + 2] = -30 - Math.random() * 20;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({ color: 0xdfe8ff, size: 0.09, sizeAttenuation: true, transparent: true, opacity: 0.85, depthWrite: false }),
    );
    scene.add(stars);

    let distance = 10.5;
    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      // En vertical la cámara se aleja para que el anillo completo quepa a lo ancho.
      distance = 10.5 * Math.max(1, 1.3 / camera.aspect);
      camera.updateProjectionMatrix();
    };

    let frame = 0;
    let visible = true;
    const clock = new THREE.Clock();

    // Paralaje: la cámara sigue un poco al cursor dentro de la tarjeta.
    const look = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      look.tx = (event.clientX - rect.left) / rect.width - 0.5;
      look.ty = (event.clientY - rect.top) / rect.height - 0.5;
    };
    const onLeave = () => {
      look.tx = 0;
      look.ty = 0;
    };
    const host = container.parentElement ?? container;
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);

    const render = () => {
      const elapsed = clock.getElapsedTime();
      look.x += (look.tx - look.x) * 0.05;
      look.y += (look.ty - look.y) * 0.05;
      camera.position.set(look.x * 2.2, 0.4 - look.y * 1.4 + Math.sin(elapsed * 0.3) * 0.08, distance);
      camera.lookAt(0, 0, 0);
      // Gira sobre su propio eje, como un mundo que rota para tener día y noche.
      band.rotation.y = elapsed * 0.06;
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
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibility.observe(container);

    if (reduceMotion) render();
    else frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      resizeObserver.disconnect();
      visibility.disconnect();
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        mesh.geometry?.dispose();
        const materials = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
        materials.forEach((material) => {
          const textured = material as THREE.Material & { map?: THREE.Texture; emissiveMap?: THREE.Texture };
          textured.map?.dispose();
          textured.emissiveMap?.dispose();
          material.dispose();
        });
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className={className} />;
}
