'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Mundo anillo en Three.js: una banda colosal con tierra, mar y nubes en su cara interior,
 * flotando junto a un gigante gaseoso. Geometría propia; no usa recursos de ningún juego.
 */

const RING_RADIUS = 3;
const RING_WIDTH = 0.42;

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
    camera.position.set(0, 0.6, 9.5);
    camera.lookAt(0, 0, 0);

    // Luz de una estrella lejana a la izquierda y un relleno frío muy suave.
    const sunLight = new THREE.DirectionalLight(0xfff1dc, 2.6);
    sunLight.position.set(-6, 3, 4);
    scene.add(sunLight);
    scene.add(new THREE.AmbientLight(0x6f86b8, 0.35));

    // El anillo se inclina para que se vea la cara interior del lado lejano.
    const ring = new THREE.Group();
    ring.rotation.set(1.18, 0.0, -0.32);
    scene.add(ring);

    const band = new THREE.Mesh(
      new THREE.CylinderGeometry(RING_RADIUS, RING_RADIUS, RING_WIDTH, 256, 1, true),
      new THREE.MeshStandardMaterial({ color: 0x8fa7b8, roughness: 0.75, metalness: 0.2, side: THREE.DoubleSide }),
    );
    ring.add(band);

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

    const render = () => {
      const elapsed = clock.getElapsedTime();
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
