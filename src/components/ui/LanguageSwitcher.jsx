import React from 'react';
import { useI18n } from '../../lib/i18n-context';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  const toggleLocale = () => {
    setLocale(locale === 'pt' ? 'en' : 'pt');
  };

  return (
    <button
      onClick={toggleLocale}
      className="fixed top-6 right-6 z-50 flex items-center justify-center w-12 h-12 bg-surface/80 backdrop-blur-md rounded-full border border-white/10 hover:border-primary/50 text-white font-bold transition-all duration-300 hover:scale-110 shadow-lg overflow-hidden"
      aria-label="Toggle language"
      title={locale === 'pt' ? 'Switch to English' : 'Mudar para Português'}
    >
      <img
        src={locale === 'pt' ? '/assets/usa.svg' : '/assets/brazil.svg'}
        alt={locale === 'pt' ? 'USA Flag' : 'Brazil Flag'}
        className="w-full h-full object-cover object-center rounded-full"
      />
    </button>

  );
}
