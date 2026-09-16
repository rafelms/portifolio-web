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

// A lista é repetida para preencher telas largas; cada faixa anima -100% da
// própria largura, e a segunda faixa idêntica cobre o vão, gerando o loop contínuo.
const REPEATS_PER_TRACK = 2;

function TickerTrack({ hidden = false }) {
  return (
    <ul
      className="animate-marquee motion-reduce:animate-none flex items-center shrink-0 min-w-max justify-around"
      aria-hidden={hidden || undefined}
    >
      {Array.from({ length: REPEATS_PER_TRACK }, (_, repeat) =>
        technologies.map((tech) => {
          // Só a primeira ocorrência é lida por leitores de tela
          const decorative = hidden || repeat > 0;
          return (
            <li
              key={`${repeat}-${tech.name}`}
              aria-hidden={decorative || undefined}
              className="group flex items-center gap-3 mx-6 md:mx-8 cursor-default"
            >
              <img
                src={tech.icon}
                alt=""
                loading="lazy"
                className="w-8 h-8 md:w-10 md:h-10 object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
              />
              <span className={`text-lg md:text-2xl font-bold text-muted/60 uppercase tracking-wider transition-colors duration-300 ${tech.color}`}>
                {tech.name}
              </span>
            </li>
          );
        })
      )}
    </ul>
  );
}

const TechTicker = () => (
  <div className="w-full bg-surface border-y border-muted/10 py-6 overflow-hidden flex whitespace-nowrap">
    <TickerTrack />
    <TickerTrack hidden />
  </div>
);

export default TechTicker;
