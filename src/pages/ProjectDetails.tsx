import { ArrowLeft, ExternalLink, X, Calendar } from "lucide-react";
import { useState } from "react";
import { AnimatedTestimonials } from "@/components/blocks/animated-testimonials";
import { useParams, Link, Navigate } from "react-router-dom";
import { projects } from "@/data/projects";

export default function ProjectDetails() {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const project = projects.find(p => p.slug === slug);
  const nextProject = projects.find(p => p.id === ((project?.id || 0) % projects.length) + 1);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-20">
      {/* Navbar / Botão de Retorno */}
      <nav className="container mx-auto px-4 sm:px-6 py-6 md:py-8">
        <Link to="/#projects" className="inline-flex items-center text-gray-400 hover:text-purple-400 transition-colors group text-sm md:text-base">
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:-translate-x-1 transition-transform"/>
          Voltar para o Portfólio
        </Link>
      </nav>

      {/* Hero do Projeto */}
      <header className="container mx-auto px-4 sm:px-6 pt-6 pb-12 md:pt-10 md:pb-16 border-b border-white/5">
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-start gap-4 mb-4 md:mb-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-bold tracking-wider">
                {tag}
              </span>
            ))}
          </div>
          {project.role && (
            <span 
              className={`self-start px-4 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-wider uppercase whitespace-nowrap cursor-default shadow-sm ${
                project.role === "Frontend" ? "bg-green-500/20 text-green-400 border border-green-500/30 shadow-green-500/10" :
                project.role === "Backend" ? "bg-orange-500/20 text-orange-400 border border-orange-500/30 shadow-orange-500/10" :
                "bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-amber-500/10"
              }`}
            >
              Atuação: {project.role}
            </span>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4">{project.title}</h1>
        
        {project.period && (
          <div className="flex items-center text-gray-400 mb-6 md:mb-8 text-sm md:text-base font-medium">
            <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2 text-purple-400" />
            <span>Período: {project.period}</span>
          </div>
        )}

        <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed mb-6 md:mb-8">
          {project.description}
        </p>
        
        {project.link && project.status === "live" && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm md:text-base">
            Acessar Projeto <ExternalLink className="w-4 h-4 ml-2"/>
          </a>
        )}
      </header>

      {/* Galeria e Descrição */}
      <main className="container mx-auto px-4 sm:px-6 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="space-y-6 md:space-y-8 text-gray-300 leading-relaxed text-base md:text-lg">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">O Problema</h2>
            <p>{project.problem}</p>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">A Solução e Intuito</h2>
            <p>{project.solution}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.gallery.map((img, i) => {
            const isSingle = project.gallery.length === 1;
            const isLastAndOdd = project.gallery.length % 2 !== 0 && i === project.gallery.length - 1;
            
            return (
              <img 
                key={i} 
                onClick={() => setSelectedImage(img)}
                src={img} 
                className={`${isSingle || isLastAndOdd ? 'sm:col-span-2 h-auto max-h-[250px] sm:max-h-[500px]' : 'col-span-1 h-56 sm:h-64'} w-full object-cover rounded-xl border border-white/10 cursor-pointer hover:opacity-80 transition-opacity`} 
                alt={`Tela ${i + 1} - ${project.title}`} 
                loading="lazy" 
              />
            );
          })}
        </div>
      </main>

      {/* Seção de Avaliação / Amostras */}
      {project.testimonials && project.testimonials.length > 0 && (
        <div className="container mx-auto border-t border-white/5 pt-10">
          <AnimatedTestimonials 
            title="Avaliações do Projeto"
            subtitle="Veja o impacto e o feedback de quem utiliza esta solução no dia a dia."
            badgeText="Aprovado por Clientes"
            testimonials={project.testimonials}
          />
        </div>
      )}

      {/* Footer / Links */}
      <footer className="container mx-auto px-4 sm:px-6 py-8 md:py-12 mt-8 md:mt-12 border-t border-white/5 flex flex-col-reverse md:flex-row justify-between items-center gap-6 md:gap-0">
        <p className="text-gray-500 text-sm md:text-base text-center md:text-left">© 2026 Rafael Menezes. Todos os direitos reservados.</p>
        {nextProject && (
          <div className="flex gap-6">
            <Link to={`/projetos/${nextProject.slug}`} className="text-purple-400 hover:text-purple-300 font-medium text-sm md:text-base text-center">
              Próximo Projeto: {nextProject.title} &rarr;
            </Link>
          </div>
        )}
      </footer>

      {/* Modal de Imagem */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          <img 
            src={selectedImage} 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl ring-1 ring-white/10" 
            alt="Imagem Expandida" 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
}