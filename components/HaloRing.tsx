'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Mundo anillo en Three.js: una banda colosal con tierra, mar y nubes en su cara interior,
 * flotando junto a un gigante gaseoso. Geometría propia; no usa recursos de ningún juego.
 */

const RING_RADIUS = 3;
const RING_WIDTH = 0.3;

/** Paisaje procedural de la cara interior: mar, continentes, montañas y nubes, que da la vuelta sin costuras. */
function makeLandscapeTexture() {
  const width = 2048;
  const height = 160;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Mar profundo de base.
  const sea = ctx.createLinearGradient(0, 0, 0, height);
  sea.addColorStop(0, '#1d4f7a');
  sea.addColorStop(0.5, '#2f74a3');
  sea.addColorStop(1, '#1d4f7a');
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
      blob(x, y, 10 + rand() * size * 0.5, 6 + rand() * 18, '#c9b98b');
    }
    for (let i = 0; i < 26; i += 1) {
      const x = cx + (rand() - 0.5) * size * 2;
      const y = cy + (rand() - 0.5) * height * 0.48;
      blob(x, y, 8 + rand() * size * 0.45, 5 + rand() * 15, rand() < 0.5 ? '#4f7f3a' : '#3d6b31');
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
  ctx.globalAlpha = 0.55;
  for (let i = 0; i < 70; i += 1) {
    blob(rand() * width, rand() * height, 18 + rand() * 70, 2 + rand() * 6, '#ffffff');
  }
  ctx.globalAlpha = 1;

  // Muros laterales del anillo: franjas oscuras en los bordes de la banda.
  ctx.fillStyle = '#2a2f36';
  ctx.fillRect(0, 0, width, 7);
  ctx.fillRect(0, height - 7, width, 7);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.anisotropy = 8;
  return texture;
}

/** Casco exterior metálico con paneles, visto por la mitad cercana del anillo. */
function makeHullTexture() {
  const width = 1024;
  const height = 64;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#8d96a3';
  ctx.fillRect(0, 0, width, height);
  // Juntas entre placas y una franja central de luces.
  ctx.fillStyle = '#5d6571';
  for (let x = 0; x < width; x += 32) ctx.fillRect(x, 0, 2, height);
  ctx.fillRect(0, height * 0.32, width, 2);
  ctx.fillRect(0, height * 0.66, width, 2);
  ctx.fillStyle = '#b7c0cc';
  for (let x = 8; x < width; x += 64) ctx.fillRect(x, height * 0.45, 14, 4);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.set(4, 1);
  return texture;
}

/** Gigante gaseoso con bandas suaves en azules y lavandas. */
function makeGasGiantTexture() {
  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const bands = ['#2c3f6b', '#4c6aa0', '#7f97c6', '#a9b4d8', '#6f7fb3', '#3b4f84', '#8c9dcc', '#c2c8e6', '#5a6fa6', '#2c3f6b'];
  const step = height / bands.length;
  bands.forEach((color, index) => {
    const gradient = ctx.createLinearGradient(0, index * step, 0, (index + 1) * step);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, bands[Math.min(index + 1, bands.length - 1)]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, index * step, width, step + 1);
  });
  // Remolinos tenues para que no se vea como franjas planas.
  ctx.globalAlpha = 0.18;
  for (let i = 0; i < 60; i += 1) {
    ctx.fillStyle = i % 2 ? '#ffffff' : '#1c2a4d';
    ctx.beginPath();
    ctx.ellipse(Math.random() * width, Math.random() * height, 20 + Math.random() * 60, 2 + Math.random() * 4, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeGlowTexture(inner: string, outer: string) {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, inner);
  gradient.addColorStop(0.2, inner);
  gradient.addColorStop(1, outer);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
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
      new THREE.MeshStandardMaterial({ map: makeHullTexture(), roughness: 0.45, metalness: 0.75, side: THREE.FrontSide }),
    );
    band.add(hull);

    // Muros laterales: dos anillos planos que cierran la banda por arriba y por abajo.
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x9aa3af, roughness: 0.5, metalness: 0.7, side: THREE.DoubleSide });
    for (const y of [RING_WIDTH / 2, -RING_WIDTH / 2]) {
      const wall = new THREE.Mesh(new THREE.RingGeometry(RING_RADIUS * 0.985, RING_RADIUS * 1.012, 256), wallMaterial);
      wall.rotation.x = -Math.PI / 2;
      wall.position.y = y;
      band.add(wall);
    }

    // Gigante gaseoso detrás del anillo, y una estrella brillante a la izquierda.
    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(2.4, 64, 48),
      new THREE.MeshStandardMaterial({ map: makeGasGiantTexture(), roughness: 1, metalness: 0 }),
    );
    planet.position.set(3.4, -1.6, -9);
    planet.rotation.z = 0.28;
    scene.add(planet);

    const sun = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeGlowTexture('rgba(255,246,228,1)', 'rgba(255,214,160,0)'),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    sun.position.set(-7.5, 3.6, -14);
    sun.scale.setScalar(3.2);
    scene.add(sun);

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

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
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
      camera.position.set(look.x * 2.2, 0.4 - look.y * 1.4 + Math.sin(elapsed * 0.3) * 0.08, 13);
      camera.lookAt(0, 0, 0);
      // Gira sobre su propio eje, como un mundo que rota para tener día y noche.
      band.rotation.y = elapsed * 0.06;
      planet.rotation.y = elapsed * 0.015;
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
          (material as THREE.Material & { map?: THREE.Texture }).map?.dispose();
          material.dispose();
        });
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className={className} />;
}
