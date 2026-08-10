import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Lock } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Commit Engenharia e Energia",
    category: "Landing Page Institucional",
    description: "Plataforma web institucional desenvolvida para destacar os serviços de engenharia e energia solar da empresa. Foco em performance e conversão.",
    link: "https://www.commitenergia.com.br/",
    tags: ["React", "Tailwind CSS", "Vite", "SEO"],
    status: "live"
  },
  {
    id: 2,
    title: "Bi2B Consultoria",
    category: "Landing Page Institucional",
    description: "Site desenvolvido para consultoria B2B, estruturado para transmitir autoridade e facilitar o contato de leads qualificados.",
    link: "https://www.bi2bconsultoria.com.br/",
    tags: ["React", "Tailwind CSS", "Responsive Design"],
    status: "live"
  },
  {
    id: 3,
    title: "Certifica",
    category: "Sistemas Governamentais",
    description: "API REST stateless responsável por processar regras de negócio relacionadas à submissão, análise e aprovação de certificados, para a progressão de servidores da área da educação da SEDUC-TO. Atuação com manutenção do sistema, implementação de features e refatoração de código.",
    link: "https://certifica.seduc.to.gov.br/login",
    tags: ["Java", "Spring Boot", "PostgreSQL", "REST API"],
    status: "live"
  },
  {
    id: 4,
    title: "SIGPLANO",
    category: "Sistemas Governamentais",
    description: "Sistema governamental para gestão e planejamento. Informações detalhadas sobre o projeto serão adicionadas futuramente.",
    tags: ["Java", "Spring Boot", "Banco de Dados"],
    status: "coming_soon"
  },
  {
    id: 5,
    title: "Bendito Doce (Fidelidade)",
    category: "Sistema Corporativo",
    description: "Plataforma de fidelidade em desenvolvimento, focada na aplicação prática de modelagem de banco de dados avançada e arquitetura limpa.",
    tags: ["Java", "Spring Boot", "MySQL", "Docker", "React"],
    status: "coming_soon"
  }
];

const ProjectShowcase = () => {
  return (
    <section className="py-24 px-6 lg:px-12 bg-surface/30 border-t border-white/5 relative" id="projects">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Projetos & Atuação</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Uma seleção de sistemas governamentais robustos e plataformas web institucionais de alto desempenho.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass p-8 rounded-2xl flex flex-col h-full border ${project.status === 'coming_soon' ? 'border-primary/20 bg-primary/5' : 'border-white/5 hover:border-primary/40'} transition-all group`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-primary font-medium text-sm tracking-wider uppercase">
                  {project.category}
                </span>
                
                {project.status === 'live' && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="text-white/50 hover:text-primary transition-colors">
                    <ExternalLink size={20} />
                  </a>
                )}
                {project.status === 'private' && (
                  <div className="text-white/40 flex items-center gap-1 text-sm" title="Código-fonte privado/corporativo">
                    <Lock size={16} /> Privado
                  </div>
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              {project.status === 'coming_soon' ? (
                <div className="flex-1 flex flex-col items-center justify-center py-8 opacity-80">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">EM BREVE</span>
                  </div>
                  <p className="text-center text-muted mb-4">{project.description}</p>
                </div>
              ) : (
                <p className="text-muted leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>
              )}
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 rounded-md text-xs font-medium text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
