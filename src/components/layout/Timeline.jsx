import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Server } from 'lucide-react';

const timelineData = [
  {
    id: 1,
    title: "Desenvolvedor Backend",
    company: "Governo do Estado do Tocantins",
    period: "Março 2026 - Presente",
    description: "Foco em regras de negócio, desenvolvimento de features, correção de bugs, gerenciamento de banco de dados, APIs Rest, JWT e documentação. Atuação nos sistemas Certifica e SIGPLANO.",
    icon: <Server size={20} className="text-white" />
  },
  {
    id: 2,
    title: "Estudante de Sistemas para Internet",
    company: "IFTO",
    period: "Setembro 2024 - Presente",
    description: "Aprofundamento acadêmico e técnico em desenvolvimento web, arquitetura e engenharia de software.",
    icon: <GraduationCap size={20} className="text-white" />
  },
  {
    id: 3,
    title: "Assistente Administrativo",
    company: "C.E.M. Tiradentes",
    period: "Agosto 2023 - Fevereiro 2026",
    description: "Foco em gestão de bases de dados e análise, criando a base analítica de TI da instituição.",
    icon: <Briefcase size={20} className="text-white" />
  }
];

const Timeline = () => {
  return (
    <section className="py-24 px-6 lg:px-12 bg-background relative" id="timeline">
      <div className="container mx-auto max-w-4xl relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Evolução Profissional</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            A jornada desde a gestão de bases de dados até o desenvolvimento Backend corporativo.
          </p>
        </div>

        <div className="relative border-l border-white/10 ml-6 md:ml-12 space-y-12 pb-8">
          {timelineData.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline dot */}
              <div className="absolute -left-5 top-1 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)] border-4 border-background">
                {item.icon}
              </div>

              <div className="glass p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-colors group">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                  {item.period}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <h4 className="text-lg text-white/70 mb-4 font-medium">
                  {item.company}
                </h4>
                <p className="text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
