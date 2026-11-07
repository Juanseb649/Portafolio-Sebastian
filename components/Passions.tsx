'use client';

import { useLanguage } from './LanguageProvider';
import { passions } from '@/data/passions';

/** «Más allá del código»: lo que me gusta fuera de la programación y de la carrera. */
export default function Passions() {
  const { language, t } = useLanguage();

  return (
    <section id="mas-alla" className="bg-stage pb-28 pt-8 md:pb-40 md:pt-12">
      <div className="mx-auto max-w-[1180px] px-4 md:px-[22px]">
        <h2 className="headline-rise max-w-[1024px] px-2 text-[clamp(40px,6vw,80px)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink-light md:mx-auto md:px-0">
          {language === 'es' ? 'Más allá del código.' : 'Beyond the code.'}
          <span className="block text-mute-dark">
            {language === 'es' ? 'Lo que me mueve cuando cierro el editor.' : 'What drives me once the editor is closed.'}
          </span>
        </h2>

        <ul className="mt-12 grid gap-3 md:mt-16">
          {passions.map((passion) => (
            <li key={passion.id} className="rounded-[28px] bg-graphite p-8 text-ink-light">
              {t(passion.title)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
