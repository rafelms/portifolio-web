import React from 'react';

const technologies = [
  "Java", "Spring Boot", "React", "MySQL", "PostgreSQL", 
  "Git", "Docker", "CI/CD", "GitHub Actions", "Tailwind CSS",
  // Repeat for smooth infinite scroll
  "Java", "Spring Boot", "React", "MySQL", "PostgreSQL", 
  "Git", "Docker", "CI/CD", "GitHub Actions", "Tailwind CSS"
];

const TechTicker = () => {
  return (
    <div className="w-full bg-surface border-y border-white/5 py-6 overflow-hidden flex whitespace-nowrap">
      <div className="animate-marquee flex items-center shrink-0 min-w-max justify-around">
        {technologies.map((tech, index) => (
          <span 
            key={index} 
            className="mx-8 text-xl md:text-2xl font-bold text-muted/60 uppercase tracking-wider transition-colors hover:text-primary cursor-default"
          >
            {tech}
          </span>
        ))}
      </div>
      {/* Duplicate for seamless effect */}
      <div className="animate-marquee flex items-center shrink-0 min-w-max justify-around" aria-hidden="true">
        {technologies.map((tech, index) => (
          <span 
            key={`dup-${index}`} 
            className="mx-8 text-xl md:text-2xl font-bold text-muted/60 uppercase tracking-wider transition-colors hover:text-primary cursor-default"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechTicker;
