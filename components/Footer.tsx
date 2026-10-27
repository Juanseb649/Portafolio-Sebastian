'use client';

import { useLanguage } from './LanguageProvider';
import { profile } from '@/data/profile';

export default function Footer() {
  const { language } = useLanguage();
  const year = new Date().getFullYear();

  const links = [
    { href: '#sobre-mi', label: language === 'es' ? 'Sobre mí' : 'About' },
    { href: '#proyectos', label: language === 'es' ? 'Proyectos' : 'Projects' },
    { href: '#experiencia', label: language === 'es' ? 'Experiencia' : 'Experience' },
    { href: '#contacto', label: language === 'es' ? 'Contacto' : 'Contact' },
  ];

  return (
    <footer className="on-light bg-floor text-[12px] leading-[1.33] text-mute-light">
      <div className="mx-auto max-w-[1024px] px-6 py-5 md:px-[22px]">
        <p className="border-b border-rule-light pb-4">
          {language === 'es'
            ? 'Portafolio construido con Next.js, TypeScript y Tailwind CSS. Imagen de la galaxia de Andrómeda usada como fondo del inicio.'
            : 'Portfolio built with Next.js, TypeScript and Tailwind CSS. Andromeda galaxy image used as the home background.'}
        </p>
        <div className="flex flex-col gap-3 pt-4 md:flex-row md:items-center md:justify-between">
          <p>
            Copyright © {year} {profile.fullName}. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
          <ul className="flex flex-wrap gap-x-0">
            {links.map((link, index) => (
              <li key={link.href} className={index > 0 ? 'border-l border-rule-light pl-2.5 ml-2.5' : ''}>
                <a href={link.href} className="text-[#424245] hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
