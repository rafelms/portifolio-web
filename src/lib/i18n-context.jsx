import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { pt } from '../locales/pt';
import { en } from '../locales/en';

const DICTIONARIES = { pt, en };
const STORAGE_KEY = 'locale';

/** @typedef {{ locale: 'pt' | 'en', setLocale: (locale: string) => void, t: typeof pt }} I18nValue */

/** @type {import('react').Context<I18nValue | undefined>} */
const I18nContext = createContext(undefined);

// localStorage pode lançar erro (modo privado, cookies bloqueados)
function readStoredLocale() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored in DICTIONARIES ? stored : 'pt';
  } catch {
    return 'pt';
  }
}

export function I18nProvider({ children }) {
  // Leitura síncrona evita renderizar em PT e trocar logo em seguida
  const [locale, setLocaleState] = useState(readStoredLocale);

  useEffect(() => {
    document.documentElement.lang = locale === 'en' ? 'en' : 'pt-BR';
  }, [locale]);

  const setLocale = useCallback((newLocale) => {
    if (!(newLocale in DICTIONARIES)) return;
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      // Sem persistência; o idioma vale só para a sessão atual
    }
  }, []);

  const value = useMemo(() => ({ locale, setLocale, t: DICTIONARIES[locale] }), [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
