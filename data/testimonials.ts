import type { Testimonial } from '@/types';

// Las entradas con `placeholder: true` son de ejemplo: reemplázalas por citas reales
// (cliente, docente, compañero) y cambia `placeholder` a false.
// Los textos de Jarret, Jesús y Sofía también están en docs/recomendaciones.md para enviárselos.
// Si quieres mostrar que un texto aún no está confirmado, agrega `pendingApproval: true`.
export const testimonials: Testimonial[] = [
  {
    id: 'jarret-murray',
    kind: 'quote',
    quote: {
      es: 'Contraté a Sebastián en 2022 para trabajar en Incarnation Camp, en Connecticut. Fue responsable, trabaja muy bien en equipo y se adaptó rápido a un país y un idioma nuevos. Con gusto lo recomiendo.',
      en: 'I hired Sebastián in 2022 to work at Incarnation Camp in Connecticut. He was responsible, works very well with the team and adapted quickly to a new country and language. I’m glad to recommend him.',
    },

    name: 'Jarret Murray',
    role: { es: 'Incarnation Camp · Connecticut, EE. UU.', en: 'Incarnation Camp · Connecticut, USA' },
    photo: '/images/people/jarret-murray.png',
    logo: '/images/logos/incarnation-camp.png',
    note: {
      es: 'Contacto disponible bajo solicitud. Por la diferencia horaria, la respuesta puede tardar.',
      en: 'Contact available on request. Because of the time difference, replies may take a while.',
    },
    placeholder: false,
  },
  {
    id: 'jesus-alver-zuniga',
    kind: 'quote',
    quote: {
      es: 'Trabajé con Sebastián en SATRAA, la aplicación de Empopasto, y después en la landing page de A&C Soluciones en TI. Documenta con claridad, entiende bien sobre arquitectura y necesidades del cliente, cuida la calidad de lo que entrega.',
      en: 'I worked with Sebastián on SATRAA—the application for Empopasto—and later on the landing page for A&C Soluciones en TI. He documents his work clearly, has a strong grasp of architecture and client requirements, and ensures the quality of his deliverables.',
    },

    name: 'Jesús Alver Zúñiga',
    role: { es: 'Mercado Libre Colombia · A&C Soluciones en TI', en: 'Mercado Libre Colombia · A&C Soluciones en TI' },
    photo: '/images/people/jesus-alver-zuniga.png',
    logo: '/images/logos/ayc-soluciones.png',
    note: {
      es: 'Contacto disponible bajo solicitud.',
      en: 'Contact available on request.',
    },
    placeholder: false,
  },
  {
    id: 'sofia-marin-alvarez',
    kind: 'quote',
    quote: {
      es: 'Sebastián se encargó del mantenimiento de la página web de Intracond y del manejo de nuestros servidores propios y equipos de cómputo. Resolvía rápido, explicaba con claridad lo que hacía y mantuvo todo funcionando sin que tuviéramos que preocuparnos. Lo recomiendo con total confianza.',
      en: 'Sebastián handled the maintenance of Intracond’s website and the management of our in-house servers and computer equipment. He solved problems quickly, explained clearly what he was doing and kept everything running so we never had to worry about it. I recommend him with complete confidence.',
    },
    name: 'Sofía Marín Álvarez',
    role: { es: 'Gerente · Intracond IPS', en: 'Manager · Intracond IPS' },
    photo: '/images/people/sofia-marin-alvarez.png',
    logo: '/images/logos/intracond.png',
    note: {
      es: 'Contacto disponible bajo solicitud.',
      en: 'Contact available on request.',
    },
    placeholder: false,
  },

];
