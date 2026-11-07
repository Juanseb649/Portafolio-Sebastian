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
  {
    id: 'metal',
    title: { es: 'Metal, a todo volumen.', en: 'Metal, turned all the way up.' },
    body: {
      es: 'Ozzy Osbourne, Korn y Megadeth son mi lista de siempre.',
      en: 'Ozzy Osbourne, Korn and Megadeth are always on my playlist.',
    },
    images: [
      {
        src: '/images/passions/ozzy-osbourne.webp',
        alt: { es: 'Ozzy Osbourne cantando en Cardiff, 1980', en: 'Ozzy Osbourne singing in Cardiff, 1980' },
        author: 'Andrew King',
        license: 'CC BY-SA 2.0',
        source: 'https://commons.wikimedia.org/wiki/File:Ozzy_Osbourne_Cardiff_1980.jpg',
      },
      {
        src: '/images/passions/korn.webp',
        alt: { es: 'Ray Luzier, baterista de Korn, en Rock am Ring 2022', en: 'Korn drummer Ray Luzier at Rock am Ring 2022' },
        author: 'Sven Mandel',
        license: 'CC BY-SA 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:Korn_-_2022156201339_2022-06-05_Rock_am_Ring_-_Sven_-_1D_X_MK_II_-_2210_-_B70I4069.jpg',
      },
      {
        src: '/images/passions/megadeth.webp',
        alt: { es: 'Megadeth en concierto en Chile, 2010', en: 'Megadeth live in Chile, 2010' },
        author: 'Carlos Varela',
        license: 'CC BY 2.0',
        source: 'https://commons.wikimedia.org/wiki/File:Megadeth_en_Chile_2010.jpg',
      },
    ],
    span: 'wide',
  },
];
