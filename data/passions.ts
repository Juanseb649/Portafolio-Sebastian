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
        fit: 'contain',
      },
      {
        src: '/images/passions/master-chief-cosplay.webp',
        alt: { es: 'Cosplay de Master Chief con espada de energía en PAX South 2015', en: 'Master Chief cosplay with an energy sword at PAX South 2015' },
        author: 'Daniel Benavides',
        license: 'CC BY 2.0',
        source: 'https://commons.wikimedia.org/wiki/File:PAX_South_2015_-_Master_Chief_(16175007527).jpg',
      },
    ],
    logo: {
      src: '/images/passions/halo-ce-logo.svg',
      alt: { es: 'Logo de Halo: Combat Evolved', en: 'Halo: Combat Evolved logo' },
      author: 'Microsoft Studios',
      license: 'Dominio público',
      source: 'https://commons.wikimedia.org/wiki/File:Halo-combat-evolved-logo.svg',
    },
    scene: 'halo-ring',
    span: 'full',
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
  {
    id: 'espacio',
    title: { es: 'Mirar hacia arriba.', en: 'Looking up.' },
    body: {
      es: 'Me apasionan el espacio y la astronomía: pensar en lo grande que es el universo me recuerda que siempre queda algo nuevo por descubrir.',
      en: 'Space and astronomy fascinate me: thinking about how vast the universe is reminds me there’s always something new to discover.',
    },
    images: [
      {
        src: '/images/passions/cosmic-cliffs.webp',
        alt: { es: 'Los «Acantilados Cósmicos» de la Nebulosa de Carina, vistos por el telescopio James Webb', en: 'The “Cosmic Cliffs” of the Carina Nebula, seen by the James Webb Space Telescope' },
        author: 'NASA, ESA, CSA, STScI',
        license: 'Dominio público',
        source: 'https://commons.wikimedia.org/wiki/File:%E2%80%9CCosmic_Cliffs%E2%80%9D_in_the_Carina_Nebula_(NIRCam_and_MIRI_Composite_Image).png',
      },
    ],
    span: 'wide',
  },
  {
    id: 'calistenia',
    title: { es: 'Calistenia.', en: 'Calisthenics.' },
    body: {
      es: 'Entreno con el peso de mi cuerpo. Constancia y disciplina, igual que al programar.',
      en: 'I train with my own body weight. Consistency and discipline, just like coding.',
    },
    images: [
      {
        src: '/images/passions/calisthenics.webp',
        alt: { es: 'Atletas haciendo paradas de manos en barras de street workout', en: 'Athletes doing handstands on street workout bars' },
        author: 'Marsilar',
        license: 'CC BY-SA 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:02025_0832_Street_workout_in_Bielsko-Bia%C5%82a.jpg',
        focus: '50% 78%',
      },
    ],
    span: 'tall',
  },
  {
    id: 'viajes',
    title: { es: 'Viajar e idiomas.', en: 'Travel and languages.' },
    body: {
      es: 'En 2022 pasé un verano en Connecticut trabajando en Incarnation Camp, y hoy hablo inglés con fluidez. Me encanta conocer otras culturas.',
      en: 'In 2022 I spent a summer in Connecticut working at Incarnation Camp, and today I speak English fluently. I love getting to know other cultures.',
    },
    images: [
      {
        src: '/images/passions/new-york.webp',
        alt: { es: 'Manhattan desde lo alto, con el Empire State al fondo', en: 'Manhattan from above, with the Empire State Building in the distance' },
        author: 'Sebastián Ibarra',
        license: 'Foto propia',
      },
    ],
    span: 'regular',
  },
];
