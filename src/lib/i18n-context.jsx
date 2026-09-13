import React, { createContext, useContext, useState, useEffect } from 'react';
import { pt } from '../locales/pt';
import { en } from '../locales/en';

const I18nContext = createContext(undefined);

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState('pt');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedLocale = localStorage.getItem('locale');
    if (storedLocale && (storedLocale === 'pt' || storedLocale === 'en')) {
      setLocaleState(storedLocale);
    }
  }, []);

  const setLocale = (newLocale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const t = locale === 'en' ? en : pt;

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: mounted ? t : pt }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
