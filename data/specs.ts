import type { SpecItem, SpecRow } from '@/types';

const same = (text: string) => ({ es: text, en: text });
const tech = (name: string, file: string, mono = false): SpecItem => ({ label: same(name), icon: `/images/tech/${file}.svg`, mono });

/** Lenguajes: solo aparecen en la cinta de logos, no como fila de la lista. */
export const languages: SpecItem[] = [
  tech('TypeScript', 'typescript'),
  tech('JavaScript', 'javascript'),
  tech('Java', 'openjdk'),
  tech('Python', 'python'),
  tech('HTML', 'html5'),
  tech('CSS', 'css3'),
];

export const specs: SpecRow[] = [
  {
    id: 'frameworks',
    label: { es: 'Frameworks', en: 'Frameworks' },
    items: [
      tech('React', 'react'),
      tech('Next.js', 'nextdotjs', true),
      tech('Spring Boot', 'springboot'),
      tech('Tailwind CSS', 'tailwindcss'),
      tech('React Native', 'react'),
      tech('Expo', 'expo', true),
      tech('Flutter', 'flutter'),
    ],
  },
  {
    id: 'tools',
    label: { es: 'Herramientas y nube', en: 'Tools and cloud' },
    items: [
      tech('AWS', 'aws', true),
      tech('Google Cloud', 'google-cloud'),
      tech('Docker', 'docker'),
      tech('Kubernetes', 'kubernetes'),
      tech('RabbitMQ', 'rabbitmq'),
      tech('Git', 'git'),
      tech('Linux', 'linux', true),
    ],
  },
  {
    id: 'data',
    label: { es: 'Datos', en: 'Data' },
    items: [tech('PostgreSQL', 'postgresql'), tech('Redis', 'redis'), tech('Supabase', 'supabase')],
  },
  {
    id: 'quality',
    label: { es: 'Calidad', en: 'Quality' },
    items: [
      { label: { es: 'Pruebas manuales y automatizadas', en: 'Manual and automated testing' } },
      { label: { es: 'Análisis funcional y de requerimientos', en: 'Functional and requirement analysis' } },
      { label: { es: 'Documentación técnica', en: 'Technical documentation' } },
    ],
  },
  {
    id: 'workflow',
    label: { es: 'Forma de trabajo', en: 'Way of working' },
    items: [{ label: same('SCRUM') }, { label: { es: 'Código limpio y trazable', en: 'Clean, traceable code' } }],
  },
  {
    id: 'spoken',
    label: { es: 'Idiomas', en: 'Spoken languages' },
    items: [
      { label: { es: 'Español, nativo', en: 'Spanish, native' } },
      { label: { es: 'Inglés, B2', en: 'English, B2' } },
    ],
  },
];
