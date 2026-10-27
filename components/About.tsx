'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { Chevron } from './ui';
import { profile } from '@/data/profile';
import type { Localized } from '@/types';

type Slide =
  | { id: string; kind: 'portrait'; title: Localized; body: Localized }
  | { id: string; kind: 'statement'; title: Localized; body: Localized }
  | { id: string; kind: 'quote'; quote: string; author: string };

const slides: Slide[] = [
  {
    id: 'hola',
    kind: 'portrait',
    title: { es: 'Hola. Soy Sebastián.', en: 'Hi. I’m Sebastián.' },
    body: {
      es: 'Ingeniero de software y desarrollador freelance. Me interesa construir productos mantenibles, documentados y con criterios claros de calidad.',
      en: 'Software engineer and freelance developer. I care about building maintainable, well-documented products with clear quality criteria.',
    },
  },
  {
    id: 'documentacion',
    kind: 'statement',
    title: { es: 'Primero, entender.', en: 'First, understand.' },
    body: {
      es: 'Documentación técnica y análisis funcional dentro de equipos ágiles. Cada entrega debe poder leerla el equipo de hoy y el de mañana.',
      en: 'Technical documentation and functional analysis inside agile teams. Every delivery should read clearly for today’s team and tomorrow’s.',
    },
  },
  {
    id: 'calidad',
    kind: 'statement',
    title: { es: 'Después, probarlo todo.', en: 'Then, test everything.' },
    body: {
      es: 'Análisis de requerimientos, pruebas manuales y automatizadas, y código limpio con trazabilidad y colaboración de verdad.',
      en: 'Requirement analysis, manual and automated testing, and clean code with real traceability and collaboration.',
    },
  },
  {
    id: 'nube',
    kind: 'statement',
    title: { es: 'Siguiente parada: la nube.', en: 'Next stop: the cloud.' },
    body: {
      es: 'Estoy fortaleciendo Linux, fundamentos de infraestructura y principios de escalabilidad para diseñar soluciones más robustas.',
      en: 'I’m strengthening Linux, infrastructure fundamentals and scalability principles to design more robust solutions.',
    },
  },
  {
    id: 'cita',
    kind: 'quote',
    quote: 'You know you’re brilliant, but maybe you’d like to understand what you did 2 weeks from now.',
    author: 'Linus Torvalds',
  },
];

const AUTOPLAY_MS = 6500;

export default function About() {
  const { language, t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.5 });
    observer.observe(deck);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !inView) return;
    const timer = window.setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [playing, inView, index, go]);

  useEffect(() => {
    if (!inView) return;
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('input,textarea')) return;
      if (event.key === 'ArrowRight') {
        setPlaying(false);
        go(index + 1);
      } else if (event.key === 'ArrowLeft') {
        setPlaying(false);
        go(index - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inView, index, go]);

  const manual = (next: number) => {
    setPlaying(false);
    go(next);
  };

  return (
    <section id="sobre-mi" className="bg-stage pb-28 pt-24 md:pb-40 md:pt-32">
      <div className="mx-auto max-w-[1180px] px-4 md:px-[22px]">
        <h2 className="max-w-[1024px] px-2 text-[clamp(40px,6vw,80px)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink-light md:mx-auto md:px-0">
          {language === 'es' ? 'Sobre mí.' : 'About me.'}
          <span className="block text-mute-dark">{language === 'es' ? 'En cinco diapositivas.' : 'In five slides.'}</span>
        </h2>

        <div
          ref={deckRef}
          role="region"
          aria-roledescription={language === 'es' ? 'presentación' : 'slideshow'}
          aria-label={language === 'es' ? 'Sobre mí' : 'About me'}
          className="relative mt-12 overflow-hidden rounded-[28px] bg-graphite md:mt-16"
          onTouchStart={(event) => {
            touchStart.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return;
            const delta = event.changedTouches[0].clientX - touchStart.current;
            if (Math.abs(delta) > 48) manual(index + (delta < 0 ? 1 : -1));
            touchStart.current = null;
          }}
        >
          <div className="relative grid min-h-[min(640px,82svh)] md:aspect-[16/9] md:min-h-0">
            {slides.map((slide, slideIndex) => {
              const isActive = slideIndex === index;
              return (
                <div
                  key={slide.id}
                  role="group"
                  aria-roledescription={language === 'es' ? 'diapositiva' : 'slide'}
                  aria-label={`${slideIndex + 1} / ${slides.length}`}
                  aria-hidden={!isActive}
                  className={`col-start-1 row-start-1 flex transition-[opacity,transform,filter] duration-[900ms] ease-keynote ${
                    isActive
                      ? 'visible scale-100 opacity-100 blur-0'
                      : `invisible opacity-0 blur-[8px] ${slideIndex < index ? 'scale-[0.96]' : 'scale-[1.04]'}`
                  }`}
                >
                  <SlideBody slide={slide} t={t} />
                </div>
              );
            })}
          </div>

          <div className="absolute inset-x-0 top-0 h-[3px] bg-white/10">
            <div
              key={`${index}-${playing && inView}`}
              className="h-full origin-left bg-ink-light/70"
              style={{
                animation: playing && inView ? `deck-progress ${AUTOPLAY_MS}ms linear both` : 'none',
                transform: playing && inView ? undefined : 'scaleX(0)',
              }}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="flex h-14 items-center gap-2.5 rounded-full bg-graphite px-5">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => manual(slideIndex)}
                aria-label={`${language === 'es' ? 'Ir a la diapositiva' : 'Go to slide'} ${slideIndex + 1}`}
                aria-current={slideIndex === index ? 'true' : undefined}
                className="flex h-8 items-center"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-500 ease-keynote ${
                    slideIndex === index ? 'w-8 bg-ink-light' : 'w-2 bg-[#6e6e73] hover:bg-[#a1a1a6]'
                  }`}
                />
              </button>
            ))}
          </div>
          <DeckButton label={language === 'es' ? 'Anterior' : 'Previous'} onClick={() => manual(index - 1)}>
            <Chevron direction="left" className="h-3.5" />
          </DeckButton>
          <DeckButton label={language === 'es' ? 'Siguiente' : 'Next'} onClick={() => manual(index + 1)}>
            <Chevron className="h-3.5" />
          </DeckButton>
          <DeckButton
            label={playing ? (language === 'es' ? 'Pausar' : 'Pause') : language === 'es' ? 'Reproducir' : 'Play'}
            onClick={() => setPlaying((value) => !value)}
          >
            {playing ? (
              <svg viewBox="0 0 12 14" className="h-3.5" aria-hidden="true">
                <rect x="1" y="1" width="3.2" height="12" rx="1" fill="currentColor" />
                <rect x="7.8" y="1" width="3.2" height="12" rx="1" fill="currentColor" />
              </svg>
            ) : (
              <svg viewBox="0 0 12 14" className="h-3.5 translate-x-px" aria-hidden="true">
                <path d="M2 1.6v10.8c0 .7.8 1.1 1.4.7l8-5.4c.5-.3.5-1.1 0-1.4l-8-5.4C2.8.5 2 .9 2 1.6z" fill="currentColor" />
              </svg>
            )}
          </DeckButton>
        </div>
      </div>
    </section>
  );
}

function DeckButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-14 w-14 items-center justify-center rounded-full bg-graphite text-[#d2d2d7] transition-colors duration-200 hover:bg-graphite-2 hover:text-ink-light"
    >
      {children}
    </button>
  );
}

function SlideBody({ slide, t }: { slide: Slide; t: (text: Localized) => string }) {
  if (slide.kind === 'portrait') {
    return (
      <div className="grid w-full grid-rows-[1fr_auto] md:grid-cols-[1fr_1.1fr] md:grid-rows-1">
        <div className="relative min-h-[300px] overflow-hidden md:min-h-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profile.portrait} alt={profile.fullName} className="absolute inset-0 h-full w-full object-cover object-[50%_30%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent md:bg-gradient-to-l" />
        </div>
        <div className="flex flex-col justify-center px-8 pb-12 pt-4 md:px-14 md:py-14">
          <p className="text-[clamp(32px,4.4vw,64px)] font-semibold leading-[1.04] tracking-[-0.035em] text-ink-light">{t(slide.title)}</p>
          <p className="mt-5 max-w-[34ch] text-[clamp(17px,1.6vw,21px)] leading-[1.45] text-[#a1a1a6]">{t(slide.body)}</p>
        </div>
      </div>
    );
  }

  if (slide.kind === 'quote') {
    return (
      <figure className="flex w-full flex-col items-center justify-center px-8 py-16 text-center md:px-24">
        <blockquote className="max-w-[24ch] text-[clamp(28px,3.9vw,56px)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink-light">
          “{slide.quote}”
        </blockquote>
        <figcaption className="mt-8 text-[17px] text-mute-dark">— {slide.author}</figcaption>
      </figure>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center px-8 py-16 text-center md:px-24">
      <p className="text-[clamp(40px,6.4vw,96px)] font-semibold leading-[1] tracking-[-0.04em] text-ink-light">{t(slide.title)}</p>
      <p className="mt-6 max-w-[40ch] text-[clamp(17px,1.7vw,24px)] leading-[1.4] text-[#a1a1a6]">{t(slide.body)}</p>
    </div>
  );
}
