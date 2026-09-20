import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';
import { SocialLinks } from '@/components/ui/social-links';
import { useI18n } from '@/lib/i18n-context';

const LINK_CLASS =
  'p-2 text-muted hover:text-primary-light transition-colors hover:-translate-y-1 transform duration-300';

export default function NotFound() {
  const { t } = useI18n();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
      {/* Glow decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-silver/5 blur-[120px]"
      />

      {/* Bloco central */}
      <div className="relative flex flex-col items-center">
        {/* Número 404 */}
        <h1 className="select-none font-extrabold text-[10rem] sm:text-[14rem] leading-none tracking-tighter text-silver/15">
          404
        </h1>

        {/* Texto principal */}
        <p className="-mt-6 max-w-md text-lg sm:text-xl text-text font-semibold text-balance">
          {t.notFound.title}
        </p>

        <p className="mt-3 max-w-sm text-sm sm:text-base text-muted text-balance">
          {t.notFound.description}
        </p>

        {/* Botão de retorno */}
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-on-primary transition-colors duration-300 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <HomeIcon className="size-4" />
          {t.notFound.goHome}
        </Link>
      </div>

      {/* Contatos */}
      <div className="relative mt-12 flex flex-col items-center gap-4">
        <p className="text-sm text-muted">{t.notFound.contact}</p>

        <div className="flex items-center gap-6">
          <SocialLinks className="contents" linkClassName={LINK_CLASS} />
        </div>
      </div>
    </main>
  );
}
