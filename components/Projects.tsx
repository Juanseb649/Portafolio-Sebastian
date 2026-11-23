'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { ChevronLink, PillLink } from './ui';
import { projects } from '@/data/projects';
import type { Project } from '@/types';

export default function Projects() {
  const { language } = useLanguage();

  return (
    <section id="proyectos" className="on-light bg-floor pb-3 pt-24 text-ink-dark md:pt-32">
      <div className="mx-auto max-w-[1024px] px-6 md:px-[22px]">
        <h2 className="text-[clamp(40px,6vw,80px)] font-semibold leading-[1.02] tracking-[-0.035em]">
          {language === 'es' ? 'Proyectos.' : 'Projects.'}
          <span className="block text-mute-light">{language === 'es' ? 'Productos reales, en uso.' : 'Real products, in use.'}</span>
        </h2>
      </div>

      <div className="mt-12 flex flex-col gap-3 px-3 md:mt-16">
        {projects.map((project, index) => (
          <ProjectTile key={project.id} project={project} dark={index % 2 === 1} flip={index % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

/** Tarjeta de proyecto: texto y pantalla lado a lado desde md; el lado de la pantalla se alterna. */
function ProjectTile({ project, dark, flip }: { project: Project; dark: boolean; flip: boolean }) {
  const { language, t } = useLanguage();

  return (
    <article
      className={`overflow-hidden rounded-[28px] py-14 text-center md:py-20 md:text-left ${
        dark ? 'bg-stage text-ink-light' : 'bg-paper text-ink-dark'
      }`}
    >
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-14 md:px-12 lg:gap-20">
        <div className={flip ? 'md:order-2' : undefined}>
          <h3 className="text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-[-0.03em]">{project.name}</h3>
          <p className="mt-2 text-[clamp(21px,2.4vw,28px)] font-medium leading-[1.2] tracking-[-0.01em]">{t(project.tagline)}</p>
          <p className={`mx-auto mt-4 max-w-[52ch] text-[17px] leading-[1.47] md:mx-0 ${dark ? 'text-body-dark' : 'text-mute-light'}`}>
            {t(project.description)}
          </p>
          {project.technologies.length > 0 && (
            <p className={`mt-3 text-[14px] ${dark ? 'text-mute-dark' : 'text-mute-light'}`}>{project.technologies.join(' · ')}</p>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:justify-start">
            {project.liveUrl && (
              <PillLink href={project.liveUrl} target="_blank" rel="noopener noreferrer" size="sm" className="!px-[15px] !py-[8px] !text-[14px]">
                {language === 'es' ? 'Visitar sitio' : 'Visit site'}
              </PillLink>
            )}
            {project.githubUrl && (
              <ChevronLink
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-[17px] ${dark ? 'text-link-dark' : 'text-link-light'}`}
              >
                GitHub
              </ChevronLink>
            )}
            {!project.liveUrl && project.availability && (
              <p className={`text-[14px] ${dark ? 'text-mute-dark' : 'text-mute-light'}`}>{t(project.availability)}</p>
            )}
          </div>
        </div>

        <Display project={project} dark={dark} className={flip ? 'md:order-1' : undefined} />
      </div>
    </article>
  );
}

/** Video sin sonido en bucle: se reproduce solo mientras está en pantalla y se puede pausar. */
function Reel({ src, poster, label, fit = 'contain' }: { src: string; poster?: string; label: string; fit?: 'contain' | 'cover' }) {
  const { language } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const pausedByUser = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      pausedByUser.current = true;
      setPaused(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pausedByUser.current) video.play().catch(() => setPaused(true));
        else video.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausedByUser.current = false;
      video.play().then(() => setPaused(false)).catch(() => {});
    } else {
      pausedByUser.current = true;
      video.pause();
      setPaused(true);
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        className={`absolute inset-0 h-full w-full ${fit === 'cover' ? 'object-cover' : 'object-contain'}`}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={paused ? (language === 'es' ? 'Reproducir video' : 'Play video') : language === 'es' ? 'Pausar video' : 'Pause video'}
        className={`absolute flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition-colors hover:bg-black/75 ${
          fit === 'cover' ? 'bottom-[6%] right-[8%]' : 'bottom-3 right-3 md:bottom-4 md:right-4'
        }`}
      >
        {paused ? (
          <svg viewBox="0 0 12 14" className="ml-0.5 h-3 w-3" fill="currentColor" aria-hidden="true">
            <path d="M0 0l12 7-12 7z" />
          </svg>
        ) : (
          <svg viewBox="0 0 12 14" className="h-3 w-3" fill="currentColor" aria-hidden="true">
            <path d="M0 0h4v14H0zM8 0h4v14H8z" />
          </svg>
        )}
      </button>
    </>
  );
}

/** Pantalla con marco y pantalla 16:9; debajo, el accesorio del proyecto si lo tiene. */
function Display({ project, dark, className = '' }: { project: Project; dark: boolean; className?: string }) {
  const { language, t } = useLanguage();

  if (project.device === 'iphone') return <Phone project={project} className={className} />;

  return (
    <div className={`relative mx-auto w-full max-w-[720px] ${className}`}>
      <div
        className={`rounded-[22px] p-[8px] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.45)] md:p-[14px] ${
          dark ? 'bg-[#2c2c2e] ring-1 ring-white/10' : 'bg-[#1d1d1f]'
        }`}
      >
        <div className="relative aspect-video overflow-hidden rounded-[12px] bg-black">
          {project.video ? (
            <Reel src={project.video} poster={project.image} label={`${language === 'es' ? 'Gameplay de' : 'Gameplay from'} ${project.name}`} />
          ) : project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={`${project.imageFit === 'contain' ? (language === 'es' ? 'Logo de' : 'Logo of') : language === 'es' ? 'Captura de' : 'Screenshot of'} ${project.name}`}
              loading="lazy"
              className={`absolute inset-0 h-full w-full ${project.imageFit === 'contain' ? 'object-contain p-[9%]' : 'object-cover object-top'}`}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(90%_70%_at_50%_100%,#14284a_0%,#05070d_70%)] text-center">
              <p className="text-[clamp(40px,8vw,88px)] font-semibold tracking-[-0.04em] text-ink-light">{project.name}</p>
              <p className="mt-2 text-[14px] text-mute-dark">{project.technologies.join(' · ')}</p>
            </div>
          )}
        </div>
      </div>

      {project.accessory && (
        <figure className="mx-auto mt-8 flex w-[clamp(140px,32%,220px)] flex-col items-center md:mt-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.accessory.src}
            alt={t(project.accessory.alt)}
            loading="lazy"
            className="w-full drop-shadow-[0_14px_18px_rgba(0,0,0,0.16)]"
          />
          <div aria-hidden="true" className="-mt-1 h-3 w-[78%] rounded-[50%] bg-black/15 blur-md" />
          <figcaption className={`mt-4 text-[14px] ${dark ? 'text-mute-dark' : 'text-mute-light'}`}>{t(project.accessory.alt)}</figcaption>
        </figure>
      )}
    </div>
  );
}

/**
 * iPhone vertical (proporción de un 17 Pro): marco de titanio, botones laterales y la grabación de la app
 * en la pantalla. La isla dinámica ya viene en la grabación, así que no se dibuja encima.
 */
function Phone({ project, className = '' }: { project: Project; className?: string }) {
  const { language } = useLanguage();
  const label = `${language === 'es' ? 'Recorrido por la app' : 'Walkthrough of the app'} ${project.name}`;

  return (
    <div className={`relative mx-auto flex w-full justify-center py-4 ${className}`}>
      {/* Halo con los colores de la marca detrás del teléfono. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(560px,120%)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(226,48,72,0.32),rgba(64,170,230,0.16)_55%,transparent)] blur-2xl"
      />

      <div className="relative w-[clamp(230px,62vw,300px)] md:w-[clamp(250px,26vw,310px)]">
        {/* Botones: acción y volumen a la izquierda; encendido y Control de Cámara a la derecha. */}
        <span aria-hidden="true" className="absolute -left-[3px] top-[17%] h-[4.5%] w-[4px] rounded-l-[3px] bg-gradient-to-b from-[#8a8a90] to-[#4a4a50]" />
        <span aria-hidden="true" className="absolute -left-[3px] top-[25%] h-[8%] w-[4px] rounded-l-[3px] bg-gradient-to-b from-[#8a8a90] to-[#4a4a50]" />
        <span aria-hidden="true" className="absolute -left-[3px] top-[35%] h-[8%] w-[4px] rounded-l-[3px] bg-gradient-to-b from-[#8a8a90] to-[#4a4a50]" />
        <span aria-hidden="true" className="absolute -right-[3px] top-[27%] h-[12%] w-[4px] rounded-r-[3px] bg-gradient-to-b from-[#8a8a90] to-[#4a4a50]" />
        <span aria-hidden="true" className="absolute -right-[2px] top-[56%] h-[7%] w-[3px] rounded-r-[2px] bg-[#3a3a3f]" />

        {/* Marco de titanio. */}
        <div className="relative rounded-[18%/8.4%] bg-[linear-gradient(145deg,#9a9aa0_0%,#4b4b50_22%,#2a2a2e_50%,#56565c_78%,#a3a3a9_100%)] p-[2px] shadow-[0_50px_90px_-30px_rgba(0,0,0,0.75),0_20px_40px_-20px_rgba(0,0,0,0.5)]">
          {/* Bisel negro. */}
          <div className="rounded-[17.3%/8.05%] bg-black p-[3.6%]">
            {/* Pantalla. */}
            <div className="relative aspect-[646/1398] overflow-hidden rounded-[14.2%/6.6%] bg-black">
              {project.video ? (
                <Reel src={project.video} poster={project.image} label={label} fit="cover" />
              ) : (
                project.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.image} alt={label} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                )
              )}
              {/* Reflejo del cristal. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.03)_28%,transparent_42%)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sombra sobre el suelo. */}
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-2 left-1/2 h-6 w-[min(260px,55%)] -translate-x-1/2 rounded-[50%] bg-black/35 blur-xl" />
    </div>
  );
}
