import React from 'react';

const technologies = [
  { name: "Java", icon: "/tech-icons/java-svgrepo-com.svg", color: "group-hover:text-[#E76F00]" },
  { name: "Spring Boot", icon: "/tech-icons/spring-svgrepo-com.svg", color: "group-hover:text-[#6DB33F]" },
  { name: "React", icon: "/tech-icons/react-svgrepo-com.svg", color: "group-hover:text-[#61DAFB]" },
  { name: "MySQL", icon: "/tech-icons/mysql-svgrepo-com.svg", color: "group-hover:text-[#4479A1]" },
  { name: "PostgreSQL", icon: "/tech-icons/postgresql-logo-svgrepo-com.svg", color: "group-hover:text-[#336791]" },
  { name: "Git", icon: "/tech-icons/git-svgrepo-com.svg", color: "group-hover:text-[#F05032]" },
  { name: "Docker", icon: "/tech-icons/docker-svgrepo-com.svg", color: "group-hover:text-[#2496ED]" },
  { name: "CI/CD", icon: "/tech-icons/github-color-svgrepo-com.svg", color: "group-hover:text-white" },
  { name: "Tailwind CSS", icon: "/tech-icons/tailwind-svgrepo-com.svg", color: "group-hover:text-[#06B6D4]" }
];

const TechTicker = () => {
  return (
    <div className="w-full bg-surface border-y border-muted/10 py-6 overflow-hidden flex whitespace-nowrap">
      <div className="animate-marquee flex items-center shrink-0 min-w-max justify-around">
        {technologies.map((tech, index) => (
          <div 
            key={index} 
            className="group flex items-center gap-3 mx-8 cursor-default"
          >
            <img 
              src={tech.icon} 
              alt={tech.name} 
              className="w-8 h-8 md:w-10 md:h-10 object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
            />
            <span 
              className={`text-xl md:text-2xl font-bold text-muted/60 uppercase tracking-wider transition-colors duration-300 ${tech.color}`}
            >
              {tech.name}
            </span>
          </div>
        ))}
        {/* Duplicate inside the first marquee to ensure smooth scrolling */}
        {technologies.map((tech, index) => (
          <div 
            key={`dup1-${index}`} 
            className="group flex items-center gap-3 mx-8 cursor-default"
          >
            <img 
              src={tech.icon} 
              alt={tech.name} 
              className="w-8 h-8 md:w-10 md:h-10 object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
            />
            <span 
              className={`text-xl md:text-2xl font-bold text-muted/60 uppercase tracking-wider transition-colors duration-300 ${tech.color}`}
            >
              {tech.name}
            </span>
          </div>
        ))}
      </div>
      {/* Second identical block for seamless effect */}
      <div className="animate-marquee flex items-center shrink-0 min-w-max justify-around" aria-hidden="true">
        {technologies.map((tech, index) => (
          <div 
            key={`dup2-${index}`} 
            className="group flex items-center gap-3 mx-8 cursor-default"
          >
            <img 
              src={tech.icon} 
              alt={tech.name} 
              className="w-8 h-8 md:w-10 md:h-10 object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
            />
            <span 
              className={`text-xl md:text-2xl font-bold text-muted/60 uppercase tracking-wider transition-colors duration-300 ${tech.color}`}
            >
              {tech.name}
            </span>
          </div>
        ))}
        {technologies.map((tech, index) => (
          <div 
            key={`dup3-${index}`} 
            className="group flex items-center gap-3 mx-8 cursor-default"
          >
            <img 
              src={tech.icon} 
              alt={tech.name} 
              className="w-8 h-8 md:w-10 md:h-10 object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
            />
            <span 
              className={`text-xl md:text-2xl font-bold text-muted/60 uppercase tracking-wider transition-colors duration-300 ${tech.color}`}
            >
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechTicker;
