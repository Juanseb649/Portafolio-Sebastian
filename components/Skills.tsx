'use client';

import { useLanguage } from './LanguageProvider';
import { specs } from '@/data/specs';
import type { SpecItem } from '@/types';

const allTech = specs.flatMap((row) => row.items.filter((item) => item.icon));

export default function Skills() {
  const { language, t } = useLanguage();

  return (
    <section id="especificaciones" className="on-light overflow-hidden bg-paper py-24 text-ink-dark md:py-32">
      <div className="mx-auto max-w-[1024px] px-6 md:px-[22px]">
        <h2 className="text-[clamp(40px,6vw,80px)] font-semibold leading-[1.02] tracking-[-0.035em]">
          {language === 'es' ? 'Especificaciones técnicas.' : 'Tech specs.'}
          <span className="block text-mute-light">{language === 'es' ? 'Con qué construyo.' : 'What I build with.'}</span>
        </h2>
      </div>

      {/* Cinta de logos: se desplaza sola y se detiene al pasar el cursor. */}
      <div
        aria-hidden="true"
        className="group relative mt-14 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] md:mt-20"
      >
        <div className="flex w-max animate-[tech-marquee_38s_linear_infinite] gap-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...allTech, ...allTech].map((item, index) => (
            <span key={`${item.icon}-${index}`} className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[24px] bg-floor md:h-28 md:w-28">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.icon} alt="" className="h-11 w-11 md:h-12 md:w-12" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1024px] px-6 md:px-[22px]">
        <dl className="mt-14 border-t border-rule-light md:mt-20">
          {specs.map((row) => {
            const withIcons = row.items.some((item) => item.icon);
            return (
              <div key={row.id} className="grid gap-5 border-b border-rule-light py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] md:gap-10 md:py-10">
                <dt className="text-[24px] font-semibold leading-[1.15] tracking-[-0.015em]">{t(row.label)}</dt>
                <dd>
                  {withIcons ? (
                    <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                      {row.items.map((item) => (
                        <TechTile key={item.label.es} item={item} label={t(item.label)} />
                      ))}
                    </ul>
                  ) : (
                    <ul className="flex flex-col gap-3">
                      {row.items.map((item) => (
                        <li key={item.label.es} className="flex items-start gap-3 text-[21px] font-semibold leading-[1.25] tracking-[-0.01em]">
                          <svg viewBox="0 0 20 20" aria-hidden="true" className="mt-[3px] h-5 w-5 shrink-0 text-action">
                            <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.12" />
                            <path d="M6 10.4l2.6 2.6L14 7.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {t(item.label)}
                        </li>
                      ))}
                    </ul>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

function TechTile({ item, label }: { item: SpecItem; label: string }) {
  return (
    <li className="group flex flex-col items-center gap-2.5 rounded-[20px] bg-floor px-2 pb-3.5 pt-5 text-center transition-[transform,box-shadow,background-color] duration-300 ease-keynote hover:-translate-y-1 hover:bg-paper hover:shadow-[0_12px_28px_-12px_rgba(0,0,0,0.22)]">
      {item.icon && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.icon} alt="" loading="lazy" className="h-10 w-10 transition-transform duration-300 ease-keynote group-hover:scale-110" />
      )}
      <span className="text-[13px] font-medium leading-[1.25] text-[#424245]">{label}</span>
    </li>
  );
}
