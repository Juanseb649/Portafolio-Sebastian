'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from './LanguageProvider';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const THEME_COLOR: Record<Theme, string> = { light: '#fbfbfd', dark: '#2c2c2f' };

/** Tema vigente: el elegido (atributo en <html>) o, si no hay, el del sistema. */
function currentTheme(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === 'light' || chosen === 'dark') return chosen;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => meta.setAttribute('content', THEME_COLOR[theme]));
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Sin almacenamiento (modo privado): el tema dura solo esta visita.
  }
}

/** Interruptor de modo claro / oscuro: sol y luna que se cruzan con un giro. */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { language } = useLanguage();
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(currentTheme());
    // Mientras no haya elección guardada, el botón sigue los cambios del sistema.
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = () => {
      if (!document.documentElement.dataset.theme) setTheme(currentTheme());
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const next: Theme = theme === 'light' ? 'dark' : 'light';
  const label =
    language === 'es'
      ? next === 'light'
        ? 'Cambiar a modo claro'
        : 'Cambiar a modo oscuro'
      : next === 'light'
        ? 'Switch to light mode'
        : 'Switch to dark mode';

  return (
    <button
      type="button"
      onClick={() => {
        applyTheme(next);
        setTheme(next);
      }}
      aria-label={label}
      title={label}
      className={`relative flex h-7 w-7 items-center justify-center rounded-full text-soft-dark transition-colors duration-200 hover:bg-ink-light/10 hover:text-ink-light ${className}`}
    >
      {/* Sol: visible en modo claro. */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`absolute h-[15px] w-[15px] transition-[opacity,transform] duration-500 ease-keynote ${
          theme === 'light' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
      </svg>
      {/* Luna: visible en modo oscuro. */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`absolute h-[15px] w-[15px] transition-[opacity,transform] duration-500 ease-keynote ${
          theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-50 opacity-0'
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      >
        <path d="M20.2 14.6A8.5 8.5 0 0 1 9.4 3.8a8.5 8.5 0 1 0 10.8 10.8z" />
      </svg>
    </button>
  );
}

/** Script que corre antes de pintar: aplica el tema guardado para que no parpadee al cargar. */
export const themeInitScript = `try{var t=localStorage.getItem('${STORAGE_KEY}');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}}catch(e){}`;
