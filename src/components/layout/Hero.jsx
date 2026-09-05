import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Linkedin, Github, Mail } from 'lucide-react';
import { ShaderBackground } from '../ui/hero-anim-1';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Desenvolvendo soluções em Java, Spring, React...";
  
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
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-6 lg:px-12">
      {/* Animated Shader Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ShaderBackground className="absolute inset-0" />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-primary font-medium tracking-wide uppercase mb-3">
              Desenvolvedor Fullstack
            </h2>
            <h1 className="text-5xl lg:text-7xl font-bold mb-4 leading-tight">
              Rafael Santana <br className="hidden lg:block"/>
            </h1>
            <div className="h-8 text-xl lg:text-2xl text-muted font-light">
              <span>{text}</span>
              <span className="animate-pulse ml-1 text-primary">|</span>
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted max-w-2xl mx-auto lg:mx-0 text-lg leading-relaxed"
          >
            Entusiasta em construir bases sólidas no Backend com Java e Spring Boot, além de orquestrar infraestrutura com Docker, CI/CD (GitHub Actions) e bancos de dados (PostgreSQL/MySQL). No Frontend, crio interfaces modernas e performáticas utilizando React.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
          >
            <a 
              href="/assets/Currículo Profissional.pdf" 
              download
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-semibold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]"
            >
              <div className="absolute inset-0 w-full h-full bg-primary-hover transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100" />
              <span className="relative z-10 flex items-center gap-2">
                Baixar Currículo (CV) <Download size={20} />
              </span>
            </a>
            
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/in/rafael-menezes-de-santana-344802234/" target="_blank" rel="noreferrer" className="p-3 bg-surface rounded-full text-muted hover:text-white hover:bg-primary transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com/rafelms" target="_blank" rel="noreferrer" className="p-3 bg-surface rounded-full text-muted hover:text-white hover:bg-primary transition-colors">
                <Github size={24} />
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=menezesrafaelsantana@gmail.com&su=Contato%20via%20Portf%C3%B3lio&body=Ol%C3%A1%20Rafael,%0A%0AGostaria%20de%20conversar%20sobre..." target="_blank" rel="noreferrer" className="p-3 bg-surface rounded-full text-muted hover:text-white hover:bg-primary transition-colors" title="Gmail">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Profile Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative max-w-md w-full"
        >
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 glass p-2">
            <img 
              src="/assets/rafael-foto.jpeg" 
              alt="Rafael Menezes de Santana"
              className="w-full h-full object-cover object-[75%_25%] rounded-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 border-2 border-primary/20 rounded-3xl -z-10 translate-x-4 translate-y-4" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
