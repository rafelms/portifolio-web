import { useI18n } from '../../lib/i18n-context';

const LANGUAGES = [
  { code: 'pt', label: 'BR', flag: '/assets/brazil.svg', title: 'Português' },
  { code: 'en', label: 'EN', flag: '/assets/usa.svg', title: 'English' },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className="fixed top-6 right-6 z-50 flex items-center gap-1 p-1 rounded-xl bg-surface/40 backdrop-blur-md border border-silver/15 shadow-lg shadow-black/30"
    >
      {LANGUAGES.map(({ code, label, flag, title }) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            title={title}
            className={`flex items-center gap-2 min-h-[36px] px-3 rounded-lg text-sm font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light ${
              active
                ? 'bg-silver/20 text-text'
                : 'text-muted hover:text-text hover:bg-silver/10'
            }`}
          >
            <img
              src={flag}
              alt=""
              aria-hidden="true"
              className={`w-5 h-5 rounded-full object-cover transition-opacity duration-200 ${active ? 'opacity-100' : 'opacity-60'}`}
            />
            {label}
          </button>
        );
      })}
    </div>
  );
}
