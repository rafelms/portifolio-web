import { ArrowLeft, ExternalLink, X, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatedTestimonials } from "@/components/blocks/animated-testimonials";
import { useParams, Link, Navigate } from "react-router-dom";
import { getProjects } from "@/data/projects";
import { useI18n } from "../lib/i18n-context";

export default function ProjectDetails() {
  const { slug } = useParams();
  const { t, locale } = useI18n();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const projects = getProjects(locale);
  const index = projects.findIndex(p => p.slug === slug);
  const project = projects[index];
  const nextProject = projects.length > 1 ? projects[(index + 1) % projects.length] : undefined;

  // Fecha o modal com Esc e trava a rolagem da página enquanto ele estiver aberto
  useEffect(() => {
    if (!selectedImage) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedImage]);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Navbar / Botão de Retorno */}
      <nav className="container mx-auto px-4 sm:px-6 py-6 md:py-8 pr-44">
        <Link to="/#projects" className="inline-flex items-center text-muted hover:text-primary-light transition-colors group text-sm md:text-base">
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:-translate-x-1 transition-transform"/>
          {t.projectDetails.backToPortfolio}
        </Link>
      </nav>

      {/* Hero do Projeto */}
      <header className="container mx-auto px-4 sm:px-6 pt-6 pb-12 md:pt-10 md:pb-16 border-b border-muted/10">
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-start gap-4 mb-4 md:mb-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-primary/15 text-primary-light rounded-full text-xs font-bold tracking-wider">
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
              {t.projectDetails.role} {project.role}
            </span>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4">{project.title}</h1>
        
        {project.period && (
          <div className="flex items-center text-muted mb-6 md:mb-8 text-sm md:text-base font-medium">
            <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2 text-primary-light" />
            <span>{t.projectDetails.period} {project.period}</span>
          </div>
        )}

        <p className="text-lg md:text-xl text-muted max-w-3xl leading-relaxed mb-6 md:mb-8">
          {project.description}
        </p>
        
        {project.link && project.status === "live" && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full sm:w-auto bg-primary hover:bg-primary-hover text-on-primary px-6 py-3 rounded-lg font-medium transition-colors text-sm md:text-base">
            {t.projectDetails.accessProject} <ExternalLink className="w-4 h-4 ml-2"/>
          </a>
        )}
      </header>

      {/* Galeria e Descrição */}
      <main className="container mx-auto px-4 sm:px-6 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="space-y-6 md:space-y-8 text-text leading-relaxed text-base md:text-lg">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-text mb-3 md:mb-4">{t.projectDetails.problem}</h2>
            <p>{project.problem}</p>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-text mb-3 md:mb-4">{t.projectDetails.solution}</h2>
            <p>{project.solution}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.gallery.map((img, i) => {
            const isSingle = project.gallery.length === 1;
            const isLastAndOdd = project.gallery.length % 2 !== 0 && i === project.gallery.length - 1;
            
            return (
              <button
                key={img}
                type="button"
                onClick={() => setSelectedImage(img)}
                aria-label={`${t.projectDetails.openImage}: ${t.projectDetails.screenshot} ${i + 1}`}
                className={`${isSingle || isLastAndOdd ? 'sm:col-span-2' : 'col-span-1'} block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light`}
              >
                <img
                  src={img}
                  className={`${isSingle || isLastAndOdd ? 'h-auto max-h-[250px] sm:max-h-[500px]' : 'h-56 sm:h-64'} w-full object-cover rounded-xl border border-muted/15 hover:opacity-80 transition-opacity`}
                  alt={`${t.projectDetails.screenshot} ${i + 1} - ${project.title}`}
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      </main>

      {/* Seção de Avaliação / Amostras */}
      {project.testimonials && project.testimonials.length > 0 && (
        <div className="container mx-auto border-t border-muted/10 pt-10">
          <AnimatedTestimonials 
            title={t.projectDetails.testimonials.title}
            subtitle={t.projectDetails.testimonials.subtitle}
            badgeText={t.projectDetails.testimonials.badge}
            testimonials={project.testimonials}
          />
        </div>
      )}

      {/* Próximo projeto (o rodapé com copyright é o global, em App.jsx) */}
      {nextProject && (
        <nav className="container mx-auto px-4 sm:px-6 py-8 md:py-12 mt-8 md:mt-12 border-t border-muted/10 flex justify-center md:justify-end">
          <Link to={`/projetos/${nextProject.slug}`} className="text-primary-light hover:text-text font-medium text-sm md:text-base text-center">
            {t.projectDetails.nextProject} {nextProject.title} &rarr;
          </Link>
        </nav>
      )}

      {/* Modal de Imagem */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 md:p-8 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            autoFocus
            onClick={() => setSelectedImage(null)}
            aria-label={t.projectDetails.closeImage}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-muted hover:text-text bg-surface/70 hover:bg-surface p-2.5 rounded-full backdrop-blur-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
          <img
            src={selectedImage}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl ring-1 ring-muted/15"
            alt={project.title}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}