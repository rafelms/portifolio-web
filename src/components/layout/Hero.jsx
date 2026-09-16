import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { ShaderBackground } from '../ui/hero-anim-1';
import { SocialLinks } from '../ui/social-links';
import { useI18n } from '../../lib/i18n-context';

const Hero = () => {
  const { t, locale } = useI18n();
  const [text, setText] = useState('');
  const fullText = t.hero.animatedText;

  // Efeito de digitação; reinicia quando o idioma (e o texto) muda
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-12">
      {/* Animated Shader Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ShaderBackground className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-12 p-6 sm:p-8 lg:p-12 rounded-3xl bg-background/35 backdrop-blur-md border border-silver/10 shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary-light font-medium tracking-wide uppercase mb-3">
              {t.hero.role}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 leading-tight">
              Rafael Santana
            </h1>
            {/* O texto completo invisível reserva a altura final (evita "pulos" quando quebra linha no mobile) */}
            <p className="grid text-xl lg:text-2xl text-muted font-light" aria-label={fullText}>
              <span className="invisible [grid-area:1/1]" aria-hidden="true">{fullText}|</span>
              <span className="[grid-area:1/1]" aria-hidden="true">
                {text}
                <span className="animate-pulse ml-1 text-primary-light">|</span>
              </span>
            </p>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed"
          >
            {t.hero.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
          >
            <a 
              href={locale === 'en' ? "/assets/resume-rafael-menezes-english.pdf" : "/assets/Currículo Profissional.pdf"} 
              download
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-on-primary font-semibold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_24px_rgba(212,212,212,0.35)]"
            >
              <span aria-hidden="true" className="absolute inset-0 w-full h-full bg-primary-hover transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100" />
              <span className="relative z-10 flex items-center gap-2">
                {t.hero.downloadCv} <Download size={20} aria-hidden="true" />
              </span>
            </a>
            
            <SocialLinks
              className="flex items-center gap-4"
              linkClassName="p-3 bg-surface rounded-full text-muted hover:text-on-primary hover:bg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light"
            />
          </motion.div>
        </div>

        {/* Profile Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative max-w-[18rem] sm:max-w-sm lg:max-w-md w-full"
        >
          <div className="relative aspect-square rounded-3xl overflow-hidden glass p-2">
            <img 
              src="/assets/rafael-foto.jpeg" 
              alt="Rafael Menezes de Santana"
              className="w-full h-full object-cover object-[75%_25%] rounded-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
