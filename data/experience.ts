import type { ExperienceItem } from '@/types';

export const experience: ExperienceItem[] = [
  {
    id: 'freelance',
    kind: 'work',
    period: { es: 'Freelance', en: 'Freelance' },
    title: { es: 'Desarrollador de software', en: 'Software developer' },
    organization: 'Independiente',
    description: {
      es: 'Análisis de requerimientos, documentación técnica, pruebas manuales y automatizadas, y desarrollo para clientes en equipos SCRUM.',
      en: 'Requirement analysis, technical documentation, manual and automated testing, and development for clients in SCRUM teams.',
    },
  },
  {
    id: 'satraa',
    kind: 'work',
    period: { es: 'Proyecto', en: 'Project' },
    title: { es: 'SATRAA', en: 'SATRAA' },
    organization: 'Empopasto',
    description: {
      es: 'Aplicación web en Java y Spring Boot para gestionar los trabajos de alcantarillado de la ciudad.',
      en: 'Java and Spring Boot web application to manage the city’s sewer maintenance work.',
    },
  },
  {
    id: 'ayc',
    kind: 'work',
    period: { es: 'Proyecto', en: 'Project' },
    title: { es: 'Landing page corporativa', en: 'Corporate landing page' },
    organization: 'A&C Soluciones en TI',
    description: {
      es: 'Sitio para presentar los servicios TI de la empresa y facilitar el contacto comercial.',
      en: 'Website presenting the company’s IT services and making sales contact easier.',
    },
    logo: '/images/logos/ayc-soluciones.png',
  },
  {
    id: 'intracond IPS',
    kind: 'work',
    period: { es: 'Soporte TI y web', en: 'IT and web support' },
    title: { es: 'Mantenimiento web e infraestructura', en: 'Web maintenance and infrastructure' },
    organization: 'Intracond IPS',
    description: {
      es: 'Mantenimiento de la página web del instituto y administración de sus servidores propios y equipos de cómputo.',
      en: 'Maintained the institute’s website and managed its in-house servers and computer equipment.',
    },
    logo: '/images/logos/intracond-mark.png',
  },
  {
    id: 'incarnation-camp',
    kind: 'work',
    period: { es: '2022', en: '2022' },
    title: { es: 'Campamento de verano en EE. UU.', en: 'Summer camp in the USA' },
    organization: 'Incarnation Camp',
    description: {
      es: 'Guiar e inspirar a niños de entre 7 y 10 años a lo largo de tres sesiones de verano. Este puesto no se limitaba a la simple supervisión; se trataba de crear un entorno seguro, divertido e inclusivo donde los niños pudieran crecer, aprender y ganar confianza..',
      en: ' Guide and inspire children aged 7–10 across three summer sessions. This role wasn’t just about supervision—it was about creating a safe, fun, and inclusive environment where kids could grow, learn, and build confidence..',
    },
    logo: '/images/logos/incarnation-camp.png',
  },
  {
    id: 'ucc',
    kind: 'academic',
    period: { es: '2024 – Actualidad', en: '2024 – Present' },
    title: { es: 'Ingeniería de Software', en: 'Software Engineering' },
    organization: 'Universidad Cooperativa de Colombia',
    description: {
      es: 'Formación profesional en ingeniería de desarrollo de software.',
      en: 'Professional education in software development engineering.',
    },
    logo: '/images/logos/ucc-mark.svg',
  },
  {
    id: 'gcp',
    kind: 'academic',
    period: { es: '2025', en: '2025' },
    title: { es: 'Google Cloud Fundamentals', en: 'Google Cloud Fundamentals' },
    organization: 'Google Cloud',
    description: {
      es: 'Curso introductorio a los servicios y herramientas de Google Cloud.',
      en: 'Introductory course on Google Cloud services and tools.',
    },
    logo: '/images/logos/google-cloud-mark.svg',
  },
  {
    id: 'efset',
    kind: 'academic',
    period: { es: '2025', en: '2025' },
    title: { es: 'EF SET English Certificate · B2', en: 'EF SET English Certificate · B2' },
    organization: 'EF Education First',
    description: {
      es: 'Puntaje 54/100, nivel B2 (Upper Intermediate) según el MCER.',
      en: 'Score 54/100, B2 (Upper Intermediate) on the CEFR scale.',
    },
    logo: '/images/logos/ef.svg',
  },
];
