'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Language, Localized } from '@/types';

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  /** Devuelve el texto en el idioma activo. */
  t: (text: Localized) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = 'portfolio-language';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'es' || saved === 'en') setLanguageState(saved);
    } catch {
      // Sin almacenamiento disponible: se queda en español.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignorado: la preferencia solo vive en esta visita.
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t: (text) => text[language] }),
    [language, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage debe usarse dentro de LanguageProvider');
  return context;
}
