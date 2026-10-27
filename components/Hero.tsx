'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from './LanguageProvider';
import { ChevronLink, PillLink, Chevron } from './ui';
import { profile } from '@/data/profile';
import type { Localized } from '@/types';

const keynoteWords: Localized[] = [
  { es: 'Calidad.', en: 'Quality.' },
  { es: 'Documentación.', en: 'Documentation.' },
  { es: 'La nube.', en: 'The cloud.' },
];

interface Star {
  x: number; // posición normalizada -1..1 desde el centro
  y: number;
  z: number; // profundidad 0.15..1 (1 = cerca)
  size: number;
  phase: number;
  tint: string;
  px: number; // última posición dibujada, para las estelas
  py: number;
}

interface Pulse {
  x: number;
  y: number;
  start: number;
}

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smooth = (edge0: number, edge1: number, value: number) => {
  const t = clamp((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

const TINTS = ['255,255,255', '214,228,255', '255,236,214', '196,214,255'];

export default function Hero() {
  const { language, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const galaxyRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const galaxy = galaxyRef.current;
    if (!section || !canvas || !galaxy) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars: Star[] = [];
    const pulses: Pulse[] = [];
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, inside: false, strength: 0 };
    let visible = true;
    let frame = 0;
    const born = performance.now();

    const seedStars = () => {
      const count = Math.round(clamp((width * height) / 1700, 260, 1100));
      stars = Array.from({ length: count }, () => {
        const z = 0.15 + Math.pow(Math.random(), 2.2) * 0.85;
        return {
          x: Math.random() * 2 - 1,
          y: Math.random() * 2 - 1,
          z,
          size: 0.35 + z * 1.25 + (Math.random() < 0.04 ? 0.9 : 0),
          phase: Math.random() * Math.PI * 2,
          tint: TINTS[Math.floor(Math.random() * TINTS.length)],
          px: NaN,
          py: NaN,
        };
      });
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedStars();
    };

    const progress = () => {
      const rect = section.getBoundingClientRect();
      const runway = rect.height - window.innerHeight;
      return runway > 0 ? clamp(-rect.top / runway) : 0;
    };

    const draw = (now: number) => {
      const p = reduceMotion ? 0 : progress();
      const intro = reduceMotion ? 1 : smooth(0, 1600, now - born);

      // Puntero suavizado: la galaxia y las estrellas siguen al cursor con inercia.
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      pointer.strength += ((pointer.inside ? 1 : 0) - pointer.strength) * 0.06;
      const nx = width ? pointer.x / width - 0.5 : 0;
      const ny = height ? pointer.y / height - 0.5 : 0;

      // Galaxia: apertura de keynote, paralaje y zoom hacia el núcleo con el scroll.
      // La imagen original es pequeña: el zoom va acompañado de desenfoque y oscurecimiento,
      // como una profundidad de campo, para que nunca se vea pixelada.
      const scale = 1.12 - 0.12 * intro + p * 1.15;
      const rotate = p * 9 + nx * 1.5;
      const shiftX = -nx * 22 * (1 - p);
      const shiftY = -ny * 16 * (1 - p);
      const depth = smooth(0.08, 0.5, p);
      galaxy.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0) scale(${scale}) rotate(${rotate}deg)`;
      galaxy.style.filter = depth > 0.01 ? `blur(${depth * 7}px) brightness(${1 - depth * 0.5})` : 'none';
      galaxy.style.opacity = String(intro * (1 - smooth(0.7, 1, p) * 0.5));

      if (introRef.current) {
        const fade = 1 - smooth(0.04, 0.24, p);
        introRef.current.style.opacity = String(fade);
        introRef.current.style.transform = `translate3d(0, ${-p * 120}px, 0)`;
        introRef.current.style.visibility = fade < 0.01 ? 'hidden' : 'visible';
      }
      if (hintRef.current) hintRef.current.style.opacity = String((1 - smooth(0.01, 0.08, p)) * intro);
      if (shadeRef.current) shadeRef.current.style.opacity = String(smooth(0.6, 0.95, p) * 0.7);

      wordRefs.current.forEach((word, index) => {
        if (!word) return;
        const start = 0.28 + index * 0.14;
        const appear = smooth(start, start + 0.1, p);
        // Las palabras se quedan hasta que termina el escenario fijo y se van con él.
        const leave = smooth(0.93, 1, p);
        word.style.opacity = String(appear * (1 - leave));
        word.style.transform = `translate3d(0, ${(1 - appear) * 36 - leave * 24}px, 0)`;
        word.style.filter = `blur(${(1 - appear) * 10}px)`;
      });

      // Campo de estrellas: se abre como un salto al hiperespacio al hacer scroll.
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height * 0.46;
      const spread = Math.max(width, height) * 0.62;
      const warp = 1 + p * p * 5;
      const lensRadius = Math.min(220, Math.max(width, height) * 0.16);
      const elapsed = now / 1000;

      for (let i = pulses.length - 1; i >= 0; i -= 1) {
        if (now - pulses[i].start > 1600) pulses.splice(i, 1);
      }

      for (const star of stars) {
        let sx = cx + star.x * spread * (0.6 + star.z * 0.4) * warp + nx * -60 * star.z;
        let sy = cy + star.y * spread * (0.6 + star.z * 0.4) * warp + ny * -40 * star.z;
        let glow = 0;

        // Lente gravitacional alrededor del cursor.
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

        // Ondas creadas con un clic.
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

        if (sx < -20 || sx > width + 20 || sy < -20 || sy > height + 20) {
          star.px = NaN;
          continue;
        }

        const twinkle = 0.65 + 0.35 * Math.sin(elapsed * (0.6 + star.z * 1.4) + star.phase);
        const alpha = clamp((0.25 + star.z * 0.75) * twinkle * intro + glow * 0.8);
        const size = star.size * (1 + glow * 0.9) * (1 + p * 0.6);

        if (!Number.isNaN(star.px) && p > 0.02) {
          const streak = Math.hypot(sx - star.px, sy - star.py);
          if (streak > 1.2) {
            ctx.strokeStyle = `rgba(${star.tint},${alpha * 0.55})`;
            ctx.lineWidth = size;
            ctx.beginPath();
            ctx.moveTo(star.px, star.py);
            ctx.lineTo(sx, sy);
            ctx.stroke();
          }
        }

        ctx.fillStyle = `rgba(${star.tint},${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
        star.px = sx;
        star.py = sy;
      }

      for (const pulse of pulses) {
        const age = (now - pulse.start) / 1600;
        const front = age * Math.max(width, height) * 0.75;
        ctx.strokeStyle = `rgba(190,215,255,${(1 - age) * 0.22})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, front, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

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
      if ((event.target as HTMLElement).closest('a,button')) return;
      const { x, y } = toLocal(event);
      pulses.push({ x, y, start: performance.now() });
      if (pulses.length > 4) pulses.shift();
    };

    resize();
    pointer.x = pointer.tx = width / 2;
    pointer.y = pointer.ty = height / 2;

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibility.observe(section);

    const stage = canvas.parentElement as HTMLElement;
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerleave', onLeave);
    stage.addEventListener('pointerdown', onDown);

    if (reduceMotion) {
      draw(performance.now());
    } else {
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
      stage.removeEventListener('pointerdown', onDown);
    };
  }, []);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      aria-label={language === 'es' ? 'Inicio' : 'Home'}
      className="relative h-[100svh] bg-stage motion-safe:h-[230svh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0 touch-pan-y select-none">
          <div ref={galaxyRef} className="absolute inset-0 will-change-transform [transform-origin:50%_46%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/andromeda.webp"
              alt=""
              draggable={false}
              fetchPriority="high"
              className="absolute left-1/2 top-[46%] w-[max(100vw,182svh)] max-w-none -translate-x-1/2 -translate-y-1/2 [mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_86%,transparent)] portrait:w-[235vw]"
            />
          </div>

          <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full mix-blend-screen" />

          {/* Viñeta para que el texto se lea sobre la imagen. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_42%,transparent_35%,rgba(0,0,0,0.55)_70%,#000_100%)]"
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black via-black/70 to-transparent" />
          <div ref={shadeRef} aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black opacity-0" />
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
          <p className="text-center text-[clamp(44px,8.4vw,96px)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink-light" aria-hidden="true">
            {keynoteWords.map((word, index) => (
              <span
                key={word.es}
                ref={(element) => {
                  wordRefs.current[index] = element;
                }}
                className="block opacity-0 will-change-transform"
              >
                {t(word)}
              </span>
            ))}
          </p>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 pb-[max(72px,12svh)]">
          <div ref={introRef} className="mx-auto max-w-[1024px] px-6 md:px-[22px]">
            <h1 className="animate-[hero-in_1.2s_var(--ease-keynote)_0.25s_both] text-[clamp(48px,8.6vw,96px)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink-light">
              {profile.name}.
            </h1>
            <p className="mt-4 max-w-[30ch] animate-[hero-in_1.2s_var(--ease-keynote)_0.4s_both] text-[clamp(21px,2.3vw,28px)] font-medium leading-[1.2] tracking-[-0.01em] text-[#c7c7cc]">
              {language === 'es' ? 'Ingeniero de software.' : 'Software engineer.'}
            </p>
            <div className="pointer-events-auto mt-8 flex animate-[hero-in_1.2s_var(--ease-keynote)_0.55s_both] flex-wrap items-center gap-x-8 gap-y-4">
              <PillLink href={profile.cv} download>
                {language === 'es' ? 'Descargar CV' : 'Download CV'}
              </PillLink>
              <ChevronLink href="#proyectos" className="text-[17px] text-link-dark">
                {language === 'es' ? 'Ver proyectos' : 'See projects'}
              </ChevronLink>
            </div>
          </div>
        </div>

        <p
          ref={hintRef}
          className="pointer-events-none absolute inset-x-0 bottom-6 hidden items-center justify-center gap-2 text-[12px] text-mute-dark md:flex"
        >
          {language === 'es' ? 'Mueve el cursor sobre el cielo. Haz clic para crear una onda.' : 'Move across the sky. Click to send a ripple.'}
          <Chevron direction="down" className="ml-1" />
        </p>
      </div>
    </section>
  );
}
