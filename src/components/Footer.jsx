import React from 'react';
import { Linkedin, Github, Mail, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10 bg-background text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-white mb-6">Rafael Menezes de Santana</h2>
        
        <div className="flex items-center justify-center gap-6 mb-8">
          <a href="https://www.linkedin.com/in/rafael-menezes-de-santana-344802234/" target="_blank" rel="noreferrer" className="text-muted hover:text-primary transition-colors hover:-translate-y-1 transform duration-300">
            <Linkedin size={24} />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="https://github.com/rafelms" target="_blank" rel="noreferrer" className="text-muted hover:text-primary transition-colors hover:-translate-y-1 transform duration-300">
            <Github size={24} />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="mailto:menezesrafaelsantana@gmail.com" className="text-muted hover:text-primary transition-colors hover:-translate-y-1 transform duration-300" title="Gmail">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
            </svg>
            <span className="sr-only">Gmail</span>
          </a>
          <a href="#" className="text-muted hover:text-primary transition-colors hover:-translate-y-1 transform duration-300" title="Em breve">
            <Instagram size={24} />
            <span className="sr-only">Instagram</span>
          </a>
        </div>
        
        <p className="text-muted/60 text-sm">
          &copy; {new Date().getFullYear()} Rafael Menezes de Santana.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
