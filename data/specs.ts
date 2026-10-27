import type { SpecRow } from '@/types';

const same = (text: string) => ({ es: text, en: text });
const tech = (name: string, file: string) => ({ label: same(name), icon: `/images/tech/${file}.svg` });

export const specs: SpecRow[] = [
  {
    id: 'languages',
    label: { es: 'Lenguajes', en: 'Languages' },
    items: [
      tech('TypeScript', 'typescript'),
      tech('JavaScript', 'javascript'),
      tech('Java', 'openjdk'),
      tech('Python', 'python'),
      tech('HTML', 'html5'),
      tech('CSS', 'css3'),
    ],
  },
  {
    id: 'frameworks',
    label: { es: 'Frameworks', en: 'Frameworks' },
    items: [tech('React', 'react'), tech('Next.js', 'nextdotjs'), tech('Spring Boot', 'springboot'), tech('Tailwind CSS', 'tailwindcss')],
  },
  {
    id: 'tools',
    label: { es: 'Herramientas y nube', en: 'Tools and cloud' },
    items: [tech('Git', 'git'), tech('Google Cloud', 'google-cloud'), { label: { es: 'Linux (en curso)', en: 'Linux (in progress)' }, icon: '/images/tech/linux.svg' }],
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
