export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  link?: string;
  tags: string[];
  image: string;
  status: "live" | "coming_soon";
  role: "Frontend" | "Backend" | "Fullstack";
  period: string;
  problem: string;
  solution: string;
  gallery: string[];
  testimonials?: {
    id: number;
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    avatar: string;
  }[];
}

const projectsPt: Project[] = [
  {
    id: 1,
    slug: "commit-engenharia",
    title: "Commit Engenharia e Energia",
    category: "Landing Page Institucional",
    description: "Plataforma web institucional desenvolvida para destacar os serviços de engenharia e energia solar da empresa. Foco em performance e conversão.",
    link: "https://www.commitenergia.com.br/",
    tags: ["React", "Tailwind CSS", "Vite", "SEO"],
    image: "/assets/projects/commit-engenharia/Commit1.png",
    status: "live",
    role: "Frontend",
    period: "02/2025 - finalizado",
    problem: "A empresa precisava de uma presença online moderna e otimizada para captar leads qualificados no setor de energia solar e engenharia, onde a concorrência exige alta velocidade de carregamento e clareza nas informações.",
    solution: "Desenvolvi uma Landing Page institucional com foco total em performance e SEO, utilizando React e Vite. A arquitetura foi pensada para maximizar a taxa de conversão através de formulários integrados e chamadas de ação claras.",
    gallery: [
      "/assets/projects/commit-engenharia/Commit1.png",
      "/assets/projects/commit-engenharia/Commit2.png",
      "/assets/projects/commit-engenharia/Commit3.png",
      "/assets/projects/commit-engenharia/Commit4.png"
    ],
    testimonials: [
      {
        id: 1,
        name: "Mikael Thiago",
        role: "Proprietário",
        company: "Commit Engenharia",
        content: "A criação dessa Landing Page foi um grande acerto para a nossa empresa. A nova plataforma melhorou significativamente a nossa apresentação digital e a forma como exibimos nossos serviços, além de se tornar uma ferramenta essencial e altamente eficiente na captação de novos leads.",
        rating: 5,
        avatar: "/assets/projects/commit-engenharia/mikael.jpg"
      }
    ]
  },
  {
    id: 2,
    slug: "bi2b-consultoria",
    title: "Bi2B Consultoria",
    category: "Landing Page Institucional",
    description: "Site desenvolvido para consultoria B2B, estruturado para transmitir autoridade e facilitar o contato de leads qualificados.",
    link: "https://www.bi2bconsultoria.com.br/",
    tags: ["React", "Tailwind CSS", "Responsive Design"],
    image: "/assets/projects/bi2b-consultoria/Bi2b1.png",
    status: "live",
    role: "Frontend",
    period: "Novembro/2025 - Maio/2026",
    problem: "A consultoria necessitava de um canal digital que refletisse a senioridade e a autoridade dos seus consultores, facilitando o agendamento de reuniões B2B.",
    solution: "Criei um site responsivo e elegante, estruturado em seções que guiam o usuário pela proposta de valor da Bi2B. O design foi cuidadosamente alinhado com a identidade visual sóbria e corporativa do cliente.",
    gallery: [
      "/assets/projects/bi2b-consultoria/Bi2b1.png",
      "/assets/projects/bi2b-consultoria/Bi2b2.png",
      "/assets/projects/bi2b-consultoria/Bi2b3.png"
    ]
  },
  {
    id: 3,
    slug: "certifica",
    title: "Certifica",
    category: "Sistemas Governamentais",
    description: "API REST stateless responsável por processar regras de negócio relacionadas à submissão, análise e aprovação de certificados, para a progressão de servidores da área da educação da SEDUC-TO.",
    link: "https://certifica.seduc.to.gov.br/login",
    tags: ["Java", "Spring Boot", "PostgreSQL", "REST API"],
    image: "/assets/projects/certifica/Certifica1.png",
    status: "live",
    role: "Backend",
    period: "Fevereiro/2026 - atualmente",
    problem: "O processo manual de validação de certificados para progressão de milhares de servidores da educação era moroso, propenso a erros e carecia de uma trilha de auditoria clara.",
    solution: "O sistema lida com alta carga e garante a integridade dos dados no PostgreSQL. Atualmente, desempenho um papel fundamental na manutenção ativa, refatoração arquitetural e escalabilidade contínua da aplicação. Atuo no estudo e implementação de novas funcionalidades, garantindo que o ciclo de vida do sistema se mantenha saudável, seguro e pronto para absorver novas demandas sem indisponibilidades.",
    gallery: [
      "/assets/projects/certifica/Certifica1.png",
      "/assets/projects/certifica/certifica-front.png"
    ]
  },
  {
    id: 4,
    slug: "sigplano",
    title: "SIGPLANO",
    category: "Sistemas Governamentais",
    description: "Sistema governamental para gestão e planejamento estratégico. Em fase de desenvolvimento ativo.",
    tags: ["Java", "Spring Boot", "Banco de Dados"],
    image: "/assets/projects/sigplano.jpg",
    status: "coming_soon",
    role: "Backend",
    period: "Maio/2026 - atualmente",
    problem: "A falta de uma ferramenta centralizada para o acompanhamento do planejamento estratégico estadual dificultava a tomada de decisão baseada em dados em tempo real.",
    solution: "Desenvolvimento ativo de uma plataforma integrada que consolida indicadores e metas governamentais em painéis intuitivos, garantindo alta disponibilidade e segurança com Spring Boot e banco de dados relacional.",
    gallery: [
      "/assets/projects/gallery/sigplano-1.jpg",
      "/assets/projects/gallery/sigplano-2.jpg",
      "/assets/projects/gallery/sigplano-3.jpg"
    ]
  },
  {
    id: 5,
    slug: "bendito-doce",
    title: "Bendito Doce (Fidelidade)",
    category: "Sistema Corporativo",
    description: "Plataforma de fidelidade em desenvolvimento, focada na aplicação prática de modelagem de banco de dados avançada e arquitetura limpa.",
    tags: ["Java", "Spring Boot", "MySQL", "Docker", "React"],
    image: "/assets/projects/bendito-doce/Bendito1.png",
    status: "coming_soon",
    role: "Fullstack",
    period: "07/2026 - atualmente",
    problem: "A falta de recorrência de clientes e a dificuldade de rastrear o histórico de compras gerava perda de engajamento a longo prazo e dificultava campanhas direcionadas.",
    solution: "Desenvolvimento de um sistema de fidelidade estruturado em arquitetura MVC. O backend em Spring Boot garante segurança e regras de negócio escaláveis, enquanto o React fornece uma interface dinâmica e atrativa (gamificação).",
    gallery: [
      "/assets/projects/bendito-doce/Bendito1.png",
      "/assets/projects/bendito-doce/Bendito2.png",
      "/assets/projects/bendito-doce/Bendito3.png",
      "/assets/projects/bendito-doce/Bendito4.png",
      "/assets/projects/bendito-doce/Bendito5.png",
      "/assets/projects/bendito-doce/Bendito6.png"
    ],
    testimonials: [
      {
        id: 1,
        name: "Geovana Justino",
        role: "Proprietária",
        company: "Bendito Doce",
        content: "Tínhamos dificuldade em encontrar uma forma de sistematizar e modernizar nosso programa de recompensas para as vendas em feiras. O sistema desenvolvido foi um verdadeiro divisor de águas: ele nos ajudou a atrair mais clientela, profissionalizar nosso atendimento e aumentar significativamente a fidelização aos nossos produtos.",
        rating: 5,
        avatar: "/assets/projects/bendito-doce/geovana-justino.jpeg"
      }
    ]
  }
];

const projectsEn: Project[] = [
  {
    id: 1,
    slug: "commit-engenharia",
    title: "Commit Engineering and Energy",
    category: "Institutional Landing Page",
    description: "Institutional web platform developed to highlight the company's engineering and solar energy services. Focus on performance and conversion.",
    link: "https://www.commitenergia.com.br/",
    tags: ["React", "Tailwind CSS", "Vite", "SEO"],
    image: "/assets/projects/commit-engenharia/Commit1.png",
    status: "live",
    role: "Frontend",
    period: "02/2025 - finished",
    problem: "The company needed a modern and optimized online presence to capture qualified leads in the solar energy and engineering sector, where competition requires high loading speeds and clear information.",
    solution: "I developed an institutional Landing Page with a total focus on performance and SEO, using React and Vite. The architecture was designed to maximize the conversion rate through integrated forms and clear calls to action.",
    gallery: [
      "/assets/projects/commit-engenharia/Commit1.png",
      "/assets/projects/commit-engenharia/Commit2.png",
      "/assets/projects/commit-engenharia/Commit3.png",
      "/assets/projects/commit-engenharia/Commit4.png"
    ],
    testimonials: [
      {
        id: 1,
        name: "Mikael Thiago",
        role: "Owner",
        company: "Commit Engenharia",
        content: "Creating this Landing Page was a great success for our company. The new platform significantly improved our digital presentation and how we showcase our services, in addition to becoming an essential and highly efficient tool for capturing new leads.",
        rating: 5,
        avatar: "/assets/projects/commit-engenharia/mikael.jpg"
      }
    ]
  },
  {
    id: 2,
    slug: "bi2b-consultoria",
    title: "Bi2B Consulting",
    category: "Institutional Landing Page",
    description: "Website developed for a B2B consulting firm, structured to convey authority and facilitate contact from qualified leads.",
    link: "https://www.bi2bconsultoria.com.br/",
    tags: ["React", "Tailwind CSS", "Responsive Design"],
    image: "/assets/projects/bi2b-consultoria/Bi2b1.png",
    status: "live",
    role: "Frontend",
    period: "November/2025 - May/2026",
    problem: "The consulting firm needed a digital channel that reflected the seniority and authority of its consultants, facilitating the scheduling of B2B meetings.",
    solution: "I created a responsive and elegant website, structured in sections that guide the user through Bi2B's value proposition. The design was carefully aligned with the client's sober and corporate visual identity.",
    gallery: [
      "/assets/projects/bi2b-consultoria/Bi2b1.png",
      "/assets/projects/bi2b-consultoria/Bi2b2.png",
      "/assets/projects/bi2b-consultoria/Bi2b3.png"
    ]
  },
  {
    id: 3,
    slug: "certifica",
    title: "Certifica",
    category: "Government Systems",
    description: "Stateless REST API responsible for processing business rules related to the submission, analysis, and approval of certificates for the progression of education servers at SEDUC-TO.",
    link: "https://certifica.seduc.to.gov.br/login",
    tags: ["Java", "Spring Boot", "PostgreSQL", "REST API"],
    image: "/assets/projects/certifica/Certifica1.png",
    status: "live",
    role: "Backend",
    period: "February/2026 - currently",
    problem: "The manual process of validating certificates for the progression of thousands of education servers was slow, prone to errors, and lacked a clear audit trail.",
    solution: "The system handles high loads and ensures data integrity in PostgreSQL. Currently, I play a fundamental role in the active maintenance, architectural refactoring, and continuous scalability of the application. I work on studying and implementing new features, ensuring that the system's lifecycle remains healthy, secure, and ready to absorb new demands without downtime.",
    gallery: [
      "/assets/projects/certifica/Certifica1.png",
      "/assets/projects/certifica/certifica-front.png"
    ]
  },
  {
    id: 4,
    slug: "sigplano",
    title: "SIGPLANO",
    category: "Government Systems",
    description: "Government system for management and strategic planning. Currently in active development.",
    tags: ["Java", "Spring Boot", "Database"],
    image: "/assets/projects/sigplano.jpg",
    status: "coming_soon",
    role: "Backend",
    period: "May/2026 - currently",
    problem: "The lack of a centralized tool to track state strategic planning made it difficult to make decisions based on real-time data.",
    solution: "Active development of an integrated platform that consolidates government indicators and goals into intuitive dashboards, ensuring high availability and security with Spring Boot and a relational database.",
    gallery: [
      "/assets/projects/gallery/sigplano-1.jpg",
      "/assets/projects/gallery/sigplano-2.jpg",
      "/assets/projects/gallery/sigplano-3.jpg"
    ]
  },
  {
    id: 5,
    slug: "bendito-doce",
    title: "Bendito Doce (Loyalty)",
    category: "Corporate System",
    description: "Loyalty platform under development, focused on the practical application of advanced database modeling and clean architecture.",
    tags: ["Java", "Spring Boot", "MySQL", "Docker", "React"],
    image: "/assets/projects/bendito-doce/Bendito1.png",
    status: "coming_soon",
    role: "Fullstack",
    period: "07/2026 - currently",
    problem: "The lack of customer recurrence and the difficulty in tracking purchase history caused a loss of long-term engagement and hindered targeted campaigns.",
    solution: "Development of a loyalty system structured in MVC architecture. The Spring Boot backend ensures security and scalable business rules, while React provides a dynamic and attractive interface (gamification).",
    gallery: [
      "/assets/projects/bendito-doce/Bendito1.png",
      "/assets/projects/bendito-doce/Bendito2.png",
      "/assets/projects/bendito-doce/Bendito3.png",
      "/assets/projects/bendito-doce/Bendito4.png",
      "/assets/projects/bendito-doce/Bendito5.png",
      "/assets/projects/bendito-doce/Bendito6.png"
    ],
    testimonials: [
      {
        id: 1,
        name: "Geovana Justino",
        role: "Owner",
        company: "Bendito Doce",
        content: "We struggled to find a way to systematize and modernize our rewards program for fair sales. The developed system was a real game-changer: it helped us attract more customers, professionalize our service, and significantly increase loyalty to our products.",
        rating: 5,
        avatar: "/assets/projects/bendito-doce/geovana-justino.jpeg"
      }
    ]
  }
];

export const getProjects = (locale: string) => {
  return locale === 'en' ? projectsEn : projectsPt;
};
