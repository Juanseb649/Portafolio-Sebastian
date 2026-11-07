import type { Passion } from '@/types';

// Fotos de Wikimedia Commons y NASA con licencias libres; el crédito se muestra en la sección.
export const passions: Passion[] = [
  {
    id: 'halo',
    title: { es: 'Halo: Combat Evolved.', en: 'Halo: Combat Evolved.' },
    body: {
      es: 'Mi videojuego favorito. Me encantan los juegos que construyen mundos enteros; por eso también me animé a crear el mío, Frostbound.',
      en: 'My favorite game. I love games that build entire worlds, which is why I set out to make my own, Frostbound.',
    },
    images: [
      {
        src: '/images/passions/xbox-original.webp',
        alt: { es: 'La Xbox original con su control, la consola donde se estrenó Halo', en: 'The original Xbox and its controller, the console Halo launched on' },
        author: 'Evan-Amos',
        license: 'Dominio público',
        source: 'https://commons.wikimedia.org/wiki/File:Xbox-console.jpg',
      },
    ],
    fit: 'object',
    span: 'wide',
  },
];
