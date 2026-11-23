'use client';

import { useEffect, useRef } from 'react';

/**
 * Campo de estrellas del inicio, sin la galaxia: titilan, se apartan del cursor como una lente
 * gravitacional y un clic manda una onda. Ocupa todo su contenedor (posición absoluta).
 * En el tema claro las estrellas pasan a tinta oscura para que se vean sobre el fondo claro.
 */

interface Star {
  x: number; // posición normalizada -1..1 desde el centro
  y: number;
  z: number; // profundidad 0.15..1 (1 = cerca)
  size: number;
  phase: number;
  tint: number; // índice en la paleta del tema
}

interface Pulse {
  x: number;
  y: number;
  start: number;
}

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const DARK_TINTS = ['255,255,255', '214,228,255', '255,236,214', '196,214,255'];
const LIGHT_TINTS = ['29,29,31', '40,56,92', '72,60,48', '52,72,120'];

export default function Starfield({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = canvas?.parentElement;
    if (!canvas || !stage) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    const pulses: Pulse[] = [];
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, inside: false, strength: 0 };
    let visible = false;
    let frame = 0;
    let light = false;

    const readScheme = () => {
      light = getComputedStyle(canvas).colorScheme.includes('light');
      if (reduceMotion) draw(performance.now());
    };

    const seedStars = () => {
      const count = Math.round(clamp((width * height) / 1900, 180, 900));
      stars = Array.from({ length: count }, () => {
        const z = 0.15 + Math.pow(Math.random(), 2.2) * 0.85;
        return {
          x: Math.random() * 2 - 1,
          y: Math.random() * 2 - 1,
          z,
          size: 0.35 + z * 1.25 + (Math.random() < 0.04 ? 0.9 : 0),
          phase: Math.random() * Math.PI * 2,
          tint: Math.floor(Math.random() * DARK_TINTS.length),
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedStars();
      if (reduceMotion) draw(performance.now());
    };

    function draw(now: number) {
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      pointer.strength += ((pointer.inside ? 1 : 0) - pointer.strength) * 0.06;
      const nx = width ? pointer.x / width - 0.5 : 0;
      const ny = height ? pointer.y / height - 0.5 : 0;

      ctx!.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const spreadX = width * 0.56;
      const spreadY = height * 0.56;
      const lensRadius = Math.min(220, Math.max(width, height) * 0.16);
      const elapsed = now / 1000;
      const tints = light ? LIGHT_TINTS : DARK_TINTS;
      const strength = light ? 0.55 : 1;

      for (let i = pulses.length - 1; i >= 0; i -= 1) {
        if (now - pulses[i].start > 1600) pulses.splice(i, 1);
      }

      for (const star of stars) {
        let sx = cx + star.x * spreadX * (0.85 + star.z * 0.15) + nx * -60 * star.z;
        let sy = cy + star.y * spreadY * (0.85 + star.z * 0.15) + ny * -40 * star.z;
        let glow = 0;

        if (pointer.strength > 0.01) {
          const dx = sx - pointer.x;
          const dy = sy - pointer.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < lensRadius) {
            const force = Math.pow(1 - dist / lensRadius, 2) * pointer.strength;
            sx += (dx / dist) * force * 46 * (0.4 + star.z);
            sy += (dy / dist) * force * 46 * (0.4 + star.z);
            glow += force * 0.9;
          }
        }

        for (const pulse of pulses) {
          const age = (now - pulse.start) / 1600;
          const front = age * Math.max(width, height) * 0.75;
          const dx = sx - pulse.x;
          const dy = sy - pulse.y;
          const dist = Math.hypot(dx, dy) || 1;
          const band = Math.max(0, 1 - Math.abs(dist - front) / 90) * (1 - age);
          if (band > 0) {
            sx += (dx / dist) * band * 30 * (0.4 + star.z);
            sy += (dy / dist) * band * 30 * (0.4 + star.z);
            glow += band;
          }
        }

        if (sx < -20 || sx > width + 20 || sy < -20 || sy > height + 20) continue;

        const twinkle = reduceMotion ? 1 : 0.65 + 0.35 * Math.sin(elapsed * (0.6 + star.z * 1.4) + star.phase);
        const alpha = clamp(((0.25 + star.z * 0.75) * twinkle + glow * 0.8) * strength);
        const size = star.size * (1 + glow * 0.9);

        ctx!.fillStyle = `rgba(${tints[star.tint]},${alpha})`;
        ctx!.beginPath();
        ctx!.arc(sx, sy, size, 0, Math.PI * 2);
        ctx!.fill();
      }

      for (const pulse of pulses) {
        const age = (now - pulse.start) / 1600;
        const front = age * Math.max(width, height) * 0.75;
        ctx!.strokeStyle = light ? `rgba(40,56,92,${(1 - age) * 0.18})` : `rgba(190,215,255,${(1 - age) * 0.22})`;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.arc(pulse.x, pulse.y, front, 0, Math.PI * 2);
        ctx!.stroke();
      }
    }

    const loop = (now: number) => {
      if (visible) draw(now);
      frame = requestAnimationFrame(loop);
    };

    const toLocal = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onMove = (event: PointerEvent) => {
      const { x, y } = toLocal(event);
      pointer.tx = x;
      pointer.ty = y;
      if (!pointer.inside) {
        pointer.x = x;
        pointer.y = y;
      }
      pointer.inside = true;
    };
    const onLeave = () => {
      pointer.inside = false;
    };
    const onDown = (event: PointerEvent) => {
      if ((event.target as HTMLElement).closest('a,button,[role="region"]')) return;
      const { x, y } = toLocal(event);
      pulses.push({ x, y, start: performance.now() });
      if (pulses.length > 4) pulses.shift();
    };

    readScheme();
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibility.observe(canvas);
    const themeObserver = new MutationObserver(readScheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const systemScheme = window.matchMedia('(prefers-color-scheme: light)');
    systemScheme.addEventListener('change', readScheme);

    if (!reduceMotion) {
      stage.addEventListener('pointermove', onMove);
      stage.addEventListener('pointerleave', onLeave);
      stage.addEventListener('pointerdown', onDown);
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
      themeObserver.disconnect();
      systemScheme.removeEventListener('change', readScheme);
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
      stage.removeEventListener('pointerdown', onDown);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
