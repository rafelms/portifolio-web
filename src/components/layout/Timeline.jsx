import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Server } from 'lucide-react';
import RadialOrbitalTimeline from '../ui/radial-orbital-timeline';
import { useI18n } from '../../lib/i18n-context';

// Os ícones não ficam no dicionário de tradução; são mapeados pelo id do item
const ICONS = {
  backend: Server,
  ifto: GraduationCap,
  assistente: Briefcase,
};

const Timeline = () => {
  const { t } = useI18n();

  const items = useMemo(
    () =>
      t.timeline.items.map((item) => ({
        id: item.id,
        label: item.label,
        title: item.title,
        subtitle: item.company,
        date: item.period,
        content: item.description,
        icon: ICONS[item.id] ?? Briefcase,
        status: item.status,
      })),
    [t]
  );

  return (
    <section className="py-24 px-6 lg:px-12 bg-background relative overflow-hidden" id="timeline">
      <div className="container mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.timeline.title}</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            {t.timeline.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <RadialOrbitalTimeline items={items} labels={t.timeline.orbit} />
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
