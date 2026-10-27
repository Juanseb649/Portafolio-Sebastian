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
          <ProjectTile key={project.id} project={project} dark={index % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function ProjectTile({ project, dark }: { project: Project; dark: boolean }) {
  const { language, t } = useLanguage();

  return (
    <article
      className={`overflow-hidden rounded-[28px] pb-12 pt-14 text-center md:pb-20 md:pt-20 ${
        dark ? 'bg-stage text-ink-light' : 'bg-paper text-ink-dark'
      }`}
    >
      <div className="mx-auto max-w-[760px] px-6">
        <h3 className="text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-[-0.03em]">{project.name}</h3>
        <p className="mt-2 text-[clamp(21px,2.4vw,28px)] font-medium leading-[1.2] tracking-[-0.01em]">{t(project.tagline)}</p>
        <p className={`mx-auto mt-4 max-w-[52ch] text-[17px] leading-[1.47] ${dark ? 'text-[#a1a1a6]' : 'text-mute-light'}`}>
          {t(project.description)}
        </p>
        {project.technologies.length > 0 && (
          <p className={`mt-3 text-[14px] ${dark ? 'text-mute-dark' : 'text-mute-light'}`}>{project.technologies.join(' · ')}</p>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
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

      <Display project={project} dark={dark} />
    </article>
  );
}

/** Video sin sonido en bucle: se reproduce solo mientras está en pantalla y se puede pausar. */
function Reel({ src, poster, label }: { src: string; poster?: string; label: string }) {
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
        aria-label={`${language === 'es' ? 'Gameplay de' : 'Gameplay from'} ${label}`}
        className="absolute inset-0 h-full w-full object-contain"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={paused ? (language === 'es' ? 'Reproducir video' : 'Play video') : language === 'es' ? 'Pausar video' : 'Pause video'}
        className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition-colors hover:bg-black/75 md:bottom-4 md:right-4"
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

/** Pantalla completa con marco y pantalla 16:9; debajo, el accesorio del proyecto si lo tiene. */
function Display({ project, dark }: { project: Project; dark: boolean }) {
  const { language, t } = useLanguage();

  return (
    <div className="relative mx-auto mt-12 w-[min(92%,880px)] md:mt-16">
      <div
        className={`rounded-[22px] p-[8px] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.45)] md:p-[14px] ${
          dark ? 'bg-[#2c2c2e] ring-1 ring-white/10' : 'bg-[#1d1d1f]'
        }`}
      >
        <div className="relative aspect-video overflow-hidden rounded-[12px] bg-black">
          {project.video ? (
            <Reel src={project.video} poster={project.image} label={project.name} />
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
        <figure className="mx-auto mt-10 flex w-[clamp(150px,30%,260px)] flex-col items-center md:mt-14">
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
