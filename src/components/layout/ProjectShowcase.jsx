import React from 'react';
import { motion } from 'framer-motion';
import { BentoCard } from '../ui/bento';
import { projects } from '@/data/projects';

const ProjectShowcase = () => {
  return (
    <section className="py-24 px-6 lg:px-12 bg-surface/30 border-t border-white/5 relative" id="projects">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Projetos & Atuação</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Uma seleção de sistemas governamentais robustos e plataformas web institucionais de alto desempenho.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Row 1 — Commit (2 cols) + Bi2B (1 col) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0 }}
            className="lg:col-span-2"
          >
            <BentoCard
              className="h-full"
              eyebrow={
                <span className="flex items-center gap-2">
                  {projects[0].category}
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                </span>
              }
              title={projects[0].title}
              description={projects[0].description}
              graphic={
                <img
                  src={projects[0].image}
                  alt={projects[0].title}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              }
              fade={["bottom"]}
              href={`/projetos/${projects[0].slug}`}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <BentoCard
              className="h-full"
              eyebrow={
                <span className="flex items-center gap-2">
                  {projects[1].category}
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                </span>
              }
              title={projects[1].title}
              description={projects[1].description}
              graphic={
                <img
                  src={projects[1].image}
                  alt={projects[1].title}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              }
              fade={["bottom"]}
              href={`/projetos/${projects[1].slug}`}
            />
          </motion.div>

          {/* Row 2 — Certifica (1 col) + SIGPLANO (2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <BentoCard
              className="h-full"
              eyebrow={
                <span className="flex items-center gap-2">
                  {projects[2].category}
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                </span>
              }
              title={projects[2].title}
              description={projects[2].description}
              graphic={
                <img
                  src={projects[2].image}
                  alt={projects[2].title}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              }
              fade={["bottom"]}
              href={`/projetos/${projects[2].slug}`}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <BentoCard
              className="h-full"
              eyebrow={
                <span className="flex items-center gap-2">
                  {projects[3].category}
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                    Em Breve
                  </span>
                </span>
              }
              title={projects[3].title}
              description={projects[3].description}
              graphic={
                <img
                  src={projects[3].image}
                  alt={projects[3].title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              }
              fade={["bottom"]}
              href={`/projetos/${projects[3].slug}`}
            />
          </motion.div>

          {/* Row 3 — Bendito Doce (full width) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <BentoCard
              className="h-full"
              eyebrow={
                <span className="flex items-center gap-2">
                  {projects[4].category}
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                    Em Breve
                  </span>
                </span>
              }
              title={projects[4].title}
              description={projects[4].description}
              graphic={
                <img
                  src={projects[4].image}
                  alt={projects[4].title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              }
              fade={["bottom"]}
              href={`/projetos/${projects[4].slug}`}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
