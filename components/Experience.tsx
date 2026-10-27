'use client';

import { useLanguage } from './LanguageProvider';
import { experience } from '@/data/experience';
import type { ExperienceItem } from '@/types';

export default function Experience() {
  const { language } = useLanguage();
  const work = experience.filter((item) => item.kind === 'work');
  const academic = experience.filter((item) => item.kind === 'academic');

  return (
    <section id="experiencia" className="bg-stage py-24 md:py-32">
      <div className="mx-auto max-w-[1024px] px-6 md:px-[22px]">
        <h2 className="text-[clamp(40px,6vw,80px)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink-light">
          {language === 'es' ? 'Experiencia.' : 'Experience.'}
          <span className="block text-mute-dark">{language === 'es' ? 'Lo que he hecho y estudiado.' : 'What I’ve built and studied.'}</span>
        </h2>

        <div className="mt-16 grid gap-16 md:mt-20 md:grid-cols-2 md:gap-14">
          <Column title={language === 'es' ? 'Laboral' : 'Work'} items={work} />
          <Column title={language === 'es' ? 'Académica' : 'Academic'} items={academic} />
        </div>
      </div>
    </section>
  );
}

function Column({ title, items }: { title: string; items: ExperienceItem[] }) {
  const { t } = useLanguage();

  return (
    <div>
      <h3 className="border-b border-rule-dark pb-4 text-[24px] font-semibold tracking-[-0.015em] text-ink-light">{title}</h3>
      <ol>
        {items.map((item) => (
          <li key={item.id} className="grid grid-cols-[56px_minmax(0,1fr)] gap-5 border-b border-rule-dark py-7">
            <OrgIcon item={item} />
            <div>
              <p className="text-[21px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink-light">{t(item.title)}</p>
              <p className="mt-0.5 text-[17px] text-[#d2d2d7]">
                {item.organization} <span className="tabular text-mute-dark">· {t(item.period)}</span>
              </p>
              <p className="mt-3 max-w-[48ch] text-[15px] leading-[1.5] text-[#a1a1a6]">{t(item.description)}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Icono de la organización: su logo sobre una baldosa blanca, o un monograma si no hay logo. */
function OrgIcon({ item }: { item: ExperienceItem }) {
  if (item.logo) {
    return (
      <span className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-paper p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.logo} alt={item.organization} loading="lazy" className="h-full w-full object-contain" />
      </span>
    );
  }

  const initials = item.organization
    .split(/\s+/)
    .filter((word) => /^[A-ZÁÉÍÓÚ&]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join('');

  return (
    <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-graphite text-[19px] font-semibold tracking-[-0.02em] text-[#d2d2d7]">
      {initials}
    </span>
  );
}
