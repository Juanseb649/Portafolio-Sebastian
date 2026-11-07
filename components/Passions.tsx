'use client';

import { useLanguage } from './LanguageProvider';
import { Chevron } from './ui';
import HaloRing from './HaloRing';
import ShipViewport from './ShipViewport';
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
            {passions
              .flatMap((passion) => [
                ...(passion.logo ? [passion.logo] : []),
                ...passion.images.flatMap((photo) => (photo.album?.cover ? [photo, photo.album.cover] : [photo])),
              ])
              .map((image) => (
              <li key={image.src}>
                {t(image.alt)} ·{' '}
                {image.source ? (
                  <a href={image.source} target="_blank" rel="noopener noreferrer" className="text-link-dark hover:underline">
                    {image.author}
                  </a>
                ) : (
                  image.author
                )}{' '}
                · {LICENSE_EN[image.license] && language === 'en' ? LICENSE_EN[image.license] : image.license}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}

const LICENSE_EN: Record<string, string> = { 'Dominio público': 'Public domain', 'Foto propia': 'Own photo', 'Todos los derechos reservados': 'All rights reserved' };

// Cuadrícula tipo bento: piezas anchas de 7 columnas y una alta que ocupa dos filas a la derecha.
const SPAN: Record<NonNullable<Passion['span']>, string> = {
  wide: 'md:col-span-7',
  tall: 'md:col-span-5 md:row-span-2',
  regular: 'md:col-span-5',
  full: 'md:col-span-12',
};

/** Foto a sangre con el texto sobre un degradado en la base. */
function PassionTile({ passion, t }: { passion: Passion; t: (text: Localized) => string }) {
  const [image] = passion.images;
  const area = SPAN[passion.span ?? 'regular'];

  if (passion.scene === 'halo-ring') return <HaloTile passion={passion} area={area} t={t} />;

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
            <figure key={photo.src} className="relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt={t(photo.alt)} loading="lazy" style={{ objectPosition: photo.focus }} className="h-full w-full object-cover transition-transform duration-[1200ms] ease-keynote group-hover:scale-[1.05]" />
              {photo.album && (
                // Disco favorito de cada artista, arriba de su foto.
                <figcaption className="absolute inset-x-0 top-0 flex flex-col items-start gap-2 bg-gradient-to-b from-black/80 to-transparent px-3 pb-10 pt-3 md:px-4 md:pt-4">
                  {photo.album.cover && (
                    // La portada como un disco físico sobre la foto: lleva la sombra de objeto.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photo.album.cover.src}
                      alt={t(photo.album.cover.alt)}
                      loading="lazy"
                      className="aspect-square w-[min(100%,88px)] rounded-[6px] object-cover shadow-[0_14px_28px_-10px_rgba(0,0,0,0.8)] ring-1 ring-white/10 md:w-[min(100%,112px)]"
                    />
                  )}
                  <span>
                    <span className="block text-[12px] font-semibold leading-tight text-ink-light md:text-[14px]">{photo.album.title}</span>
                    <span className="tabular block text-[12px] text-[#d2d2d7]">{photo.album.year}</span>
                  </span>
                </figcaption>
              )}
            </figure>
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

/**
 * Halo, dispuesto como una tarjeta de proyecto: texto a la izquierda (logo, descripción y la portada
 * como accesorio) y el mundo anillo en 3D ocupando el otro lado a toda altura.
 */
function HaloTile({ passion, area, t }: { passion: Passion; area: string; t: (text: Localized) => string }) {
  const [cover] = passion.images;
  return (
    <li className={`tile-rise ${area} relative isolate overflow-hidden rounded-[28px] bg-[radial-gradient(60%_85%_at_72%_50%,#0c1626_0%,#05070d_55%,#020305_100%)]`}>
      <div className="grid items-center gap-10 px-8 pt-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-14 md:px-12 md:py-16 lg:gap-20">
        <div className="text-center md:text-left">
          {passion.logo ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={passion.logo.src} alt="" className="mx-auto w-[min(100%,340px)] md:mx-0" />
              <h3 className="sr-only">{t(passion.title)}</h3>
            </>
          ) : (
            <h3 className="text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-light">{t(passion.title)}</h3>
          )}
          <p className="mx-auto mt-6 max-w-[42ch] text-[17px] leading-[1.47] text-[#a1a1a6] md:mx-0">{t(passion.body)}</p>

          {cover && (
            <figure className="mx-auto mt-10 w-[min(56%,200px)] md:mx-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cover.src}
                alt={t(cover.alt)}
                loading="lazy"
                className="w-full rounded-[10px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
              />
              <figcaption className="mt-3 text-[14px] text-mute-dark">Halo: Combat Evolved · 2001</figcaption>
            </figure>
          )}
        </div>

        {/* El mundo anillo, visto desde el ventanal de una nave. */}
        <ShipViewport className="mb-8 h-[440px] md:mb-0 md:h-[600px]">
          <HaloRing className="absolute inset-0" />
        </ShipViewport>
      </div>
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
