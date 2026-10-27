'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { profile } from '@/data/profile';
import type { Localized } from '@/types';

const links: { id: string; label: Localized }[] = [
  { id: 'sobre-mi', label: { es: 'Sobre mí', en: 'About' } },
  { id: 'proyectos', label: { es: 'Proyectos', en: 'Projects' } },
  { id: 'testimonios', label: { es: 'Testimonios', en: 'Testimonials' } },
  { id: 'experiencia', label: { es: 'Experiencia', en: 'Experience' } },
  { id: 'especificaciones', label: { es: 'Especificaciones', en: 'Specs' } },
  { id: 'contacto', label: { es: 'Contacto', en: 'Contact' } },
];

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    const sections = links.map((link) => document.getElementById(link.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const languageToggle = (
    <div role="group" aria-label={language === 'es' ? 'Idioma' : 'Language'} className="flex items-center text-[12px]">
      {(['es', 'en'] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          aria-pressed={language === code}
          className={`px-1.5 py-1 uppercase tracking-wide transition-colors ${
            language === code ? 'text-ink-light' : 'text-mute-dark hover:text-ink-light'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label={language === 'es' ? 'Principal' : 'Main'}
        className="relative z-10 h-11 border-b border-white/[0.06] bg-black/75 backdrop-blur-xl backdrop-saturate-[1.8]"
      >
        <div className="mx-auto flex h-full max-w-[1024px] items-center justify-between px-4 md:px-[22px]">
          <a href="#inicio" className="text-[14px] font-semibold tracking-[-0.01em] text-ink-light" onClick={() => setOpen(false)}>
            {profile.name}
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={`text-[12px] transition-colors duration-200 ${
                    active === link.id ? 'text-ink-light' : 'text-[#d2d2d7]/80 hover:text-ink-light'
                  }`}
                >
                  {t(link.label)}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {languageToggle}
            <a
              href={profile.cv}
              download
              className="hidden rounded-full bg-action px-[11px] py-[3px] text-[12px] text-white transition-colors hover:bg-action-hover sm:inline-flex"
            >
              {language === 'es' ? 'Descargar CV' : 'Download CV'}
            </a>
            <button
              type="button"
              className="relative -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
              aria-label={open ? (language === 'es' ? 'Cerrar menú' : 'Close menu') : language === 'es' ? 'Abrir menú' : 'Open menu'}
              aria-expanded={open}
              aria-controls="menu-movil"
              onClick={() => setOpen((value) => !value)}
            >
              <span
                className={`absolute h-[1.5px] w-[17px] rounded-full bg-ink-light transition-transform duration-300 ease-keynote ${
                  open ? 'rotate-45' : '-translate-y-[3.5px]'
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-[17px] rounded-full bg-ink-light transition-transform duration-300 ease-keynote ${
                  open ? '-rotate-45' : 'translate-y-[3.5px]'
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      <div
        id="menu-movil"
        className={`fixed inset-0 bg-black/95 backdrop-blur-xl transition-[opacity,visibility] duration-300 md:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <ul className="px-10 pt-20">
          {links.map((link, index) => (
            <li
              key={link.id}
              style={{ transitionDelay: open ? `${80 + index * 35}ms` : '0ms' }}
              className={`transition-[opacity,transform] duration-500 ease-keynote ${
                open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
              }`}
            >
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className="block py-2 text-[28px] font-semibold tracking-[-0.015em] text-ink-light"
              >
                {t(link.label)}
              </a>
            </li>
          ))}
          <li
            style={{ transitionDelay: open ? `${80 + links.length * 35}ms` : '0ms' }}
            className={`pt-6 transition-[opacity,transform] duration-500 ease-keynote ${
              open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
            }`}
          >
            <a href={profile.cv} download className="text-[17px] text-link-dark">
              {language === 'es' ? 'Descargar CV' : 'Download CV'}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
