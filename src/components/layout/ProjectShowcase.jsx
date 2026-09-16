import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FeatureCarousel } from '../ui/animated-feature-carousel';
import { getProjects } from '@/data/projects';
import { useI18n } from '../../lib/i18n-context';

const ProjectShowcase = () => {
  const { t, locale } = useI18n();

  const items = useMemo(
    () =>
      getProjects(locale).map((project) => ({
        id: project.slug,
        // Rótulo curto para a navegação: "Commit Engenharia e Energia" → "Commit Engenharia"
        name: project.title.replace(/\s*\(.*\)$/, '').replace(/\s+(e|and)\s+.*$/, ''),
        eyebrow: project.category,
        title: project.title,
        description: project.description,
        href: `/projetos/${project.slug}`,
        images: [project.image, ...project.gallery.filter((src) => src !== project.image)].slice(0, 2),
        tags: project.tags,
        badge:
          project.status === 'live'
            ? { label: t.showcase.badges.live, tone: 'live' }
            : { label: t.showcase.badges.comingSoon, tone: 'soon' },
      })),
    [locale, t]
  );

  return (
    <section className="py-24 px-6 lg:px-12 bg-surface/30 border-t border-muted/10 relative overflow-hidden" id="projects">
      {/* Brilho de fundo sutil na cor primária */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[480px] w-[min(900px,100%)] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="container mx-auto max-w-7xl relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">{t.showcase.title}</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            {t.showcase.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <FeatureCarousel items={items} labels={t.showcase.carousel} />
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
