import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'frostbound',
    name: 'Frostbound',
    tagline: {
      es: 'Bajo el hielo, algo despertó.',
      en: 'Beneath the ice, something woke up.',
    },
    description: {
      es: 'Un RPG de acción hecho en Unity. El sello del Frostspire se quebró y el Frost corrompe todo lo que toca. Abre camino entre emboscadas, enfrenta a Gorvald, el Bárbaro Corrupto, y a los jefes de tres capítulos hasta llegar al Corazón del Frost. Cada pelea se gana esquivando a tiempo. Algunas no se ganan.',
      en: 'An action RPG built in Unity. The Frostspire seal has shattered and the Frost corrupts everything it touches. Cut through ambushes, face Gorvald the Corrupted Barbarian and the bosses of three chapters until you reach the Heart of the Frost. Every fight is won by dodging on time. Some aren’t won at all.',
    },
    technologies: ['Unity', 'C#', 'Blender'],
    video: '/videos/frostbound-reel.mp4',
    image: '/videos/frostbound-poster.jpg',
    accessory: {
      src: '/images/projects/xbox-controller.png',
      alt: { es: 'Compatible con control de Xbox Series', en: 'Xbox Series controller supported' },
    },
    availability: {
      es: 'Versión 1.0 para Windows, macOS y Linux',
      en: 'Version 1.0 for Windows, macOS and Linux',
    },
  },
  {
    id: 'algolab',
    name: 'AlgoLab',
    tagline: {
      es: 'Aprende POO tocando las ideas.',
      en: 'Learn OOP by touching the ideas.',
    },
    description: {
      es: 'Videojuego serio en realidad mixta para Meta Quest que enseña programación orientada a objetos: abres una puerta, armas un vehículo, reparas un robot. Cuatro niveles, de clases y objetos hasta la abstracción, con un tutor con IA que lee tus intentos.',
      en: 'A mixed-reality serious game for Meta Quest that teaches object-oriented programming: you open a door, build a vehicle, fix a robot. Four levels, from classes and objects to abstraction, with an AI tutor that reads your attempts.',
    },
    technologies: ['Meta Quest', 'XR', 'Vercel'],
    image: '/images/projects/algolab.png',
    liveUrl: 'https://algolab-navy.vercel.app/',
  },
  {
    id: 'ayc',
    name: 'A&C Soluciones en TI',
    tagline: {
      es: 'Una empresa de software, presentada en una sola página.',
      en: 'A software company, presented on a single page.',
    },
    description: {
      es: 'Landing page corporativa enfocada en presentar los servicios TI y mejorar el contacto comercial.',
      en: 'Corporate landing page focused on presenting IT services and improving lead generation.',
    },
    technologies: ['JavaScript', 'HTML', 'CSS'],
    image: '/images/projects/ayc-soluciones.png',
    liveUrl: 'https://www.aycsolucionesenti.com/',
  },
  {
    id: 'satraa',
    name: 'SATRAA',
    tagline: {
      es: 'El alcantarillado de Pasto, bajo control.',
      en: 'Pasto’s sewer network, under control.',
    },
    description: {
      es: 'Aplicación web para gestionar y supervisar los trabajos de alcantarillado de Empopasto en Pasto, Nariño.',
      en: 'Web application to manage and monitor Empopasto’s sewer maintenance work in Pasto, Nariño.',
    },
    technologies: ['Java', 'Spring Boot'],
    // Agrega aquí la captura del producto, p. ej. '/images/projects/satraa.png'
    image: undefined,
    availability: {
      es: 'Sistema interno de Empopasto',
      en: 'Internal Empopasto system',
    },
  },
  {
    id: 'motoking',
    name: 'Moto King',
    tagline: {
      es: 'En desarrollo.',
      en: 'In development.',
    },
    description: {
      es: 'Un nuevo proyecto que estoy construyendo ahora mismo. Pronto, más detalles.',
      en: 'A new project I’m building right now. More details soon.',
    },
    technologies: [],
    image: '/images/projects/motoking-logo.png',
    imageFit: 'contain',
    availability: {
      es: 'En desarrollo · repositorio privado',
      en: 'In development · private repository',
    },
  },
];
