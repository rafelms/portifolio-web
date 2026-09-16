import { Instagram } from 'lucide-react';
import { SocialLinks } from '../ui/social-links';
import { useI18n } from '../../lib/i18n-context';

const LINK_CLASS = 'p-2 text-muted hover:text-primary-light transition-colors hover:-translate-y-1 transform duration-300';

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="py-12 border-t border-muted/15 bg-background text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-xl sm:text-2xl font-bold text-text mb-6 max-w-3xl mx-auto text-balance">{t.footer.title}</h2>
        
        <div className="flex items-center justify-center gap-6 mb-8">
          <SocialLinks className="contents" linkClassName={LINK_CLASS} />
          {/* Instagram ainda sem perfil público: ícone apenas ilustrativo, sem link */}
          <span className="p-2 text-muted/40 cursor-not-allowed" title="Instagram — em breve" aria-hidden="true">
            <Instagram size={24} />
          </span>
        </div>
        
        <p className="text-muted/80 text-sm">
          &copy; {new Date().getFullYear()} {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
