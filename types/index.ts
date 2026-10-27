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
