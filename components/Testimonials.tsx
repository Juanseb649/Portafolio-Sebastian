'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { Chevron } from './ui';
import { testimonials } from '@/data/testimonials';

export default function Testimonials() {
  const { language, t } = useLanguage();
  const trackRef = useRef<HTMLUListElement>(null);

  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = () => {
    const track = trackRef.current;
    if (!track) return;
    setEdges({
      start: track.scrollLeft <= 4,
      end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
    });
  };

  useEffect(() => {
    updateEdges();
    window.addEventListener('resize', updateEdges);
    return () => window.removeEventListener('resize', updateEdges);
  }, []);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const item = track.querySelector('li');
    track.scrollBy({ left: direction * ((item?.clientWidth ?? 400) + 20), behavior: 'smooth' });
  };

  return (
    <section id="testimonios" className="on-light bg-floor pb-24 pt-24 text-ink-dark md:pb-32 md:pt-32">
      <div className="mx-auto max-w-[1024px] px-6 md:px-[22px] lg:max-w-[1280px]">
        <h2 className="text-[clamp(40px,6vw,80px)] font-semibold leading-[1.02] tracking-[-0.035em]">
          {language === 'es' ? 'Testimonios.' : 'Testimonials.'}
          <span className="block text-mute-light">{language === 'es' ? 'Personas con las que he trabajado.' : 'People I’ve worked with.'}</span>
        </h2>
      </div>

      <ul
        ref={trackRef}
        onScroll={updateEdges}
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-4 [scrollbar-width:none] md:mt-16 md:px-[max(22px,calc((100vw-1024px)/2+22px))] lg:mx-auto lg:grid lg:max-w-[1280px] lg:grid-cols-3 lg:overflow-visible lg:px-[22px] [&::-webkit-scrollbar]:hidden"
        aria-label={language === 'es' ? 'Testimonios' : 'Testimonials'}
      >
        {testimonials.map((item) => (
          <li
            key={item.id}
            className="relative flex w-[min(86vw,460px)] shrink-0 snap-start flex-col rounded-[28px] bg-paper p-8 md:w-[480px] md:p-10 lg:w-auto"
          >
            {(item.placeholder || item.pendingApproval) && (
              <span className="mb-6 self-start rounded-full border border-rule-light px-2.5 py-0.5 text-[12px] text-mute-light">
                {item.placeholder
                  ? language === 'es'
                    ? 'Ejemplo'
                    : 'Sample'
                  : language === 'es'
                    ? 'Pendiente de aprobación'
                    : 'Pending approval'}
              </span>
            )}
            <div className="mb-10">
              {item.logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.logo} alt="" aria-hidden="true" loading="lazy" className="mb-6 h-14 w-auto mix-blend-multiply" />
              )}
              {item.kind === 'reference' ? (
                <p className="text-[clamp(22px,2.4vw,28px)] font-semibold leading-[1.2] tracking-[-0.015em] lg:text-[22px] lg:leading-[1.3]">{t(item.quote)}</p>
              ) : (
                <blockquote className="text-[clamp(22px,2.4vw,28px)] font-semibold leading-[1.2] tracking-[-0.015em] lg:text-[22px] lg:leading-[1.3]">
                  “{t(item.quote)}”
                </blockquote>
              )}
            </div>
            <div className="mt-auto flex items-center gap-4 border-t border-rule-light pt-5">
              {item.photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.photo} alt={item.name} loading="lazy" className="h-12 w-12 shrink-0 rounded-full object-cover" />
              )}
              <div>
                <p className="text-[17px] font-semibold">{item.name}</p>
                <p className="text-[14px] text-mute-light">{t(item.role)}</p>
                {item.note && <p className="mt-1 text-[12px] leading-[1.4] text-mute-light">{t(item.note)}</p>}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-6 flex max-w-[1024px] justify-end gap-3 px-6 md:px-[22px] lg:hidden">
        {[-1, 1].map((direction) => (
          <button
            key={direction}
            type="button"
            onClick={() => scrollBy(direction as 1 | -1)}
            disabled={direction === 1 ? edges.end : edges.start}
            aria-label={direction === 1 ? (language === 'es' ? 'Siguiente' : 'Next') : language === 'es' ? 'Anterior' : 'Previous'}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e8e8ed] text-[#424245] transition-colors hover:bg-[#dcdce1] hover:text-ink-dark disabled:cursor-default disabled:bg-[#f0f0f3] disabled:text-[#c7c7cc]"
          >
            <Chevron direction={direction === 1 ? 'right' : 'left'} className="h-3" />
          </button>
        ))}
      </div>
    </section>
  );
}
