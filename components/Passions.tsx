'use client';

import { useLanguage } from './LanguageProvider';
import { Chevron } from './ui';
import { passions } from '@/data/passions';
import type { Localized, Passion } from '@/types';

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

        <ul className="mt-12 grid gap-3 md:mt-16 md:grid-flow-dense md:grid-cols-12">
          {passions.map((passion) => (
            <PassionTile key={passion.id} passion={passion} t={t} />
          ))}
        </ul>

        <details className="group/credits mx-auto mt-8 max-w-[1024px] px-2 text-[12px] leading-[1.6] text-mute-dark md:px-0">
          <summary className="cursor-pointer list-none select-none hover:text-[#d2d2d7] [&::-webkit-details-marker]:hidden">
            {language === 'es' ? 'Créditos de las imágenes' : 'Image credits'}
            <Chevron className="ml-1.5 transition-transform duration-300 group-open/credits:rotate-90" />
          </summary>
          <ul className="mt-3 space-y-1">
            {passions.flatMap((passion) => passion.images).map((image) => (
              <li key={image.src}>
                {t(image.alt)} ·{' '}
                <a href={image.source} target="_blank" rel="noopener noreferrer" className="text-link-dark hover:underline">
                  {image.author}
                </a>{' '}
                · {image.license === 'Dominio público' && language === 'en' ? 'Public domain' : image.license}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}

// Cuadrícula tipo bento: piezas anchas de 7 columnas y una alta que ocupa dos filas a la derecha.
const SPAN: Record<NonNullable<Passion['span']>, string> = {
  wide: 'md:col-span-7',
  tall: 'md:col-span-5 md:row-span-2',
  regular: 'md:col-span-5',
};

/** Foto a sangre con el texto sobre un degradado en la base. */
function PassionTile({ passion, t }: { passion: Passion; t: (text: Localized) => string }) {
  const [image] = passion.images;
  const area = SPAN[passion.span ?? 'regular'];

  if (passion.fit === 'object') {
    // Objeto fotografiado sobre blanco: se presenta completo sobre papel, como un producto.
    return (
      <li className={`group tile-rise ${area} flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[28px] bg-paper md:min-h-[460px]`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt={t(image.alt)} loading="lazy" className="mx-auto mt-10 w-[min(82%,560px)] object-contain px-6 transition-transform duration-[1200ms] ease-keynote group-hover:scale-[1.05]" />
        <PassionText passion={passion} t={t} dark />
      </li>
    );
  }

  if (passion.images.length > 1) {
    // Tríptico: una foto por artista, separadas por la misma junta de 3px que la cuadrícula.
    return (
      <li className={`group tile-rise ${area} relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[28px] bg-graphite md:min-h-[460px]`}>
        <div className="absolute inset-0 -z-10 grid grid-cols-3 gap-[3px]">
          {passion.images.map((photo) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={photo.src} src={photo.src} alt={t(photo.alt)} loading="lazy" style={{ objectPosition: photo.focus }} className="h-full w-full object-cover transition-transform duration-[1200ms] ease-keynote group-hover:scale-[1.05]" />
          ))}
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <PassionText passion={passion} t={t} />
      </li>
    );
  }

  return (
    <li className={`group tile-rise ${area} relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[28px] bg-graphite md:min-h-[460px]`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image.src} alt={t(image.alt)} loading="lazy" style={{ objectPosition: image.focus }} className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1200ms] ease-keynote group-hover:scale-[1.05]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
      <PassionText passion={passion} t={t} />
    </li>
  );
}

function PassionText({ passion, t, dark = false }: { passion: Passion; t: (text: Localized) => string; dark?: boolean }) {
  return (
    <div className="p-8 md:p-10">
      <h3 className={`text-[clamp(28px,3.2vw,40px)] font-semibold leading-[1.05] tracking-[-0.03em] ${dark ? 'text-ink-dark' : 'text-ink-light'}`}>
        {t(passion.title)}
      </h3>
      <p className={`mt-3 max-w-[42ch] text-[17px] leading-[1.47] ${dark ? 'text-mute-light' : 'text-[#d2d2d7]'}`}>{t(passion.body)}</p>
    </div>
  );
}
