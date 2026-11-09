'use client';

import { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { ChevronLink, PillLink } from './ui';
import { profile } from '@/data/profile';
import MilkyWay from './MilkyWay';

export default function Contact() {
  const { language } = useLanguage();
  const [copied, setCopied] = useState<'idle' | 'done' | 'error'>('idle');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied('done');
    } catch {
      setCopied('error');
    }
    window.setTimeout(() => setCopied('idle'), 2400);
  };

  const copyLabel = {
    idle: language === 'es' ? 'Copiar correo' : 'Copy email',
    done: language === 'es' ? 'Copiado' : 'Copied',
    error: language === 'es' ? 'No se pudo copiar' : 'Couldn’t copy',
  }[copied];

  return (
    <section id="contacto" className="scene relative overflow-hidden bg-stage pb-48 pt-28 text-center md:pb-64 md:pt-40">
      {/* La misma galaxia del inicio, más tenue y asomando por debajo del contenido. */}
      <MilkyWay
        density={0.6}
        backdrop={false}
        splash
        className="pointer-events-none absolute inset-x-0 bottom-[-30%] h-[78%] [mask-image:radial-gradient(85%_75%_at_50%_55%,#000_55%,transparent)]"
      />
      <div className="relative mx-auto max-w-[1024px] px-6 md:px-[22px]">
        <h2 className="headline-rise text-[clamp(56px,9vw,96px)] font-semibold leading-[1] tracking-[-0.04em] text-ink-light">
          {language === 'es' ? 'Hablemos.' : 'Let’s talk.'}
        </h2>
        <p className="mx-auto mt-5 max-w-[36ch] text-[clamp(19px,2vw,24px)] leading-[1.35] text-body-dark">
          {language === 'es'
            ? '¿Un proyecto, una vacante o una pregunta? Escríbeme y te respondo.'
            : 'A project, a role or a question? Write to me and I’ll get back to you.'}
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="mt-12 inline-block break-all text-[clamp(24px,4.2vw,48px)] font-semibold tracking-[-0.025em] text-link-dark hover:underline"
        >
          {profile.email}
        </a>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <PillLink href={`mailto:${profile.email}`}>{language === 'es' ? 'Enviar correo' : 'Send email'}</PillLink>
          <button
            type="button"
            onClick={copyEmail}
            aria-live="polite"
            className="rounded-full border border-ghost-edge px-[22px] py-[10px] text-[17px] text-ink-light transition-colors hover:border-mute-light hover:bg-ink-light/[0.04]"
          >
            {copyLabel}
          </button>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[17px]">
          <ChevronLink href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-link-dark">
            LinkedIn
          </ChevronLink>
          <ChevronLink href={profile.github} target="_blank" rel="noopener noreferrer" className="text-link-dark">
            GitHub
          </ChevronLink>
          <ChevronLink href={profile.cv} download className="text-link-dark">
            {language === 'es' ? 'Descargar CV' : 'Download CV'}
          </ChevronLink>
        </div>
      </div>
    </section>
  );
}
