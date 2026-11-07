export type Language = 'es' | 'en';

/** Texto en ambos idiomas. */
export type Localized = Record<Language, string>;

export interface Project {
  id: string;
  name: string;
  tagline: Localized;
  description: Localized;
  technologies: string[];
  /** Captura del producto en /public. Si falta, la pantalla muestra el nombre del producto. */
  image?: string;
  /** Video corto sin sonido que se reproduce en la pantalla en lugar de la captura. */
  video?: string;
  /** 'contain' para logos: la imagen se muestra completa y centrada en la pantalla. */
  imageFit?: 'cover' | 'contain';
  /** Objeto que acompaña a la pantalla (p. ej. un control). */
  accessory?: { src: string; alt: Localized };
  liveUrl?: string;
  githubUrl?: string;
  /** Nota cuando no hay enlace público (p. ej. sistema interno). */
  availability?: Localized;
}

export interface Testimonial {
  id: string;
  quote: Localized;
  name: string;
  role: Localized;
  /** Foto de la persona en /public. */
  photo?: string;
  /** Logo de la organización en /public. */
  logo?: string;
  /** 'reference': contacto de referencia descrito por Sebastián, no una cita de la persona. */
  kind?: 'quote' | 'reference';
  /** Nota visible bajo el nombre (p. ej. disponibilidad del contacto). */
  note?: Localized;
  /** true mientras el testimonio sea de ejemplo. Cámbialo a false al poner uno real. */
  placeholder: boolean;
  /** true mientras la persona no haya confirmado el texto. Cámbialo a false cuando lo apruebe. */
  pendingApproval?: boolean;
}

export interface ExperienceItem {
  id: string;
  kind: 'academic' | 'work';
  period: Localized;
  title: Localized;
  organization: string;
  description: Localized;
  /** Logo de la institución u organización en /public. */
  logo?: string;
}

export interface SpecItem {
  label: Localized;
  /** Logo de la tecnología en /public. */
  icon?: string;
}

export interface SpecRow {
  id: string;
  label: Localized;
  items: SpecItem[];
}

/** Imagen con su crédito: todas las fotos de terceros llevan autor y licencia. */
export interface CreditedImage {
  src: string;
  alt: Localized;
  author: string;
  license: string;
  /** Página de la obra en su fuente (p. ej. Wikimedia Commons). Las fotos propias no la necesitan. */
  source?: string;
  /** Punto de enfoque del recorte (CSS object-position), p. ej. '50% 80%'. */
  focus?: string;
  /** 'contain' para objetos fotografiados sobre blanco: se muestran completos sobre papel. */
  fit?: 'cover' | 'contain';
  /** Disco favorito asociado a la foto (p. ej. en el tríptico de música). */
  album?: { title: string; year: number; cover?: CreditedImage };
}

/** Una pasión fuera del código, para la sección «Más allá del código». */
export interface Passion {
  id: string;
  title: Localized;
  body: Localized;
  /** Una imagen, o varias (se muestran en tríptico). */
  images: CreditedImage[];
  /** Cómo se presenta la foto: recortada a sangre o completa sobre papel (objetos con fondo blanco). */
  fit?: 'cover' | 'object';
  /** Tamaño en la cuadrícula a partir de md. */
  span?: 'wide' | 'tall' | 'regular' | 'full';
  /** Logo que encabeza la tarjeta en lugar del título en texto (el título queda para lectores de pantalla). */
  logo?: CreditedImage;
  /** Escena 3D que acompaña la descripción. */
  scene?: 'halo-ring';
}
