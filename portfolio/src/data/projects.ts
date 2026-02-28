import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 7,
    title: "Mini Games Canvas",
    description: "Coleção de jogos clássicos criados com HTML5 Canvas e JavaScript puro para relaxar e exercitar lógicas de programação.",
    descriptionPt: "Coleção de jogos clássicos criados com HTML5 Canvas e JavaScript puro para relaxar e exercitar lógicas de programação.",
    longDescription: "A collection of classic mini-games (Pong, Snake, Tic-Tac-Toe) developed with HTML5 Canvas and vanilla JavaScript. The project was created to relax with lighter and fun logic, but ended up gaining robustness in implementation.",
    longDescriptionPt: "Uma coleção de mini jogos clássicos (Pong, Snake, Tic-Tac-Toe) desenvolvida com HTML5 Canvas e JavaScript vanilla. O projeto foi criado para descansar a cabeça com lógicas mais leves e divertidas, mas acabou ganhando robustez na implementação.",
    category: "frontend",
    technologies: ["HTML5", "CSS3", "JavaScript", "Canvas", "Game Development"],
    image: "https://raw.githubusercontent.com/kubex-ecosystem/mini-games/refs/heads/main/docs/assets/top_banner.png",
    images: [],
    github: "https://github.com/kubex-ecosystem/mini-games",
    demo: "/projects/mini-games",
    lookatniFile: "lookatni-mini_games.latx",
    status: "completed"
  },
  {
    id: 6,
    title: "GoForge",
    description: "CLI tool for Go development, focused on productivity and simplicity.",
    descriptionPt: "Ferramenta CLI para desenvolvimento em Go, focada em produtividade e simplicidade.",
    longDescription: "GoForge is a command-line tool (CLI) designed to simplify the Go development process. With a developer-centric approach, GoForge offers a smoother build and deployment experience, allowing you to focus on what really matters: writing code.",
    longDescriptionPt: "GoForge é uma ferramenta de linha de comando (CLI) projetada para simplificar o processo de desenvolvimento em Go. Com uma abordagem centrada no desenvolvedor, o GoForge oferece uma experiência de construção e implantação mais suave, permitindo que você se concentre no que realmente importa: escrever código.",
    category: "devtools",
    technologies: ["Go", "CLI", "Docker", "Git", "Makefile", "Cobra"],
    image: "https://raw.githubusercontent.com/kubex-ecosystem/goforge/refs/heads/main/docs/assets/top_banner_m_a.png",
    github: "https://github.com/kubex-ecosystem/goforge",
    lookatniFile: "lookatni-goforge.latx",
    status: "completed"
  },
  {
    id: 1,
    title: "Timecraft AI",
    description: "Complete e-commerce solution with payment integration, inventory management, and admin dashboard.",
    descriptionPt: "Solução completa de e-commerce com integração de pagamento, gerenciamento de estoque e painel administrativo.",
    longDescription: "A full-featured e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, payment processing with Stripe, order management, and comprehensive admin dashboard with analytics.",
    longDescriptionPt: "Uma plataforma de e-commerce completa construída com React, Node.js e PostgreSQL. Os recursos incluem autenticação de usuário, catálogo de produtos, carrinho de compras, processamento de pagamentos com Stripe, gerenciamento de pedidos e painel administrativo abrangente com análises.",
    category: "fullstack",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "Redis", "Docker"],
    image: "https://raw.githubusercontent.com/kubex-ecosystem/timecraft/refs/heads/main/docs/assets/timecraft_banner_c.png",
    images: [],
    github: "https://github.com/kubex-ecosystem/timecraft",
    status: "in-progress",
    lookatniFile: "lookatni-timecraft.latx"
  },
  {
    id: 2,
    title: "GoBE",
    description: "A modular backend developed in Go, focused on security, automation, and flexibility.",
    descriptionPt: "Um backend modular desenvolvido em Go, focado em segurança, automação e flexibilidade.",
    longDescription: "GoBE is a modular backend framework designed for building secure and scalable applications. It features a plugin architecture, built-in security measures, and supports various databases. The framework is designed to be flexible and easy to extend, making it suitable for a wide range of applications.",
    longDescriptionPt: "GoBE é um framework de backend modular projetado para construir aplicações seguras e escaláveis. Possui uma arquitetura de plugins, medidas de segurança integradas e suporte a vários bancos de dados. O framework foi projetado para ser flexível e fácil de estender.",
    category: "backend",
    technologies: ["Go", "Redis", "PostgreSQL", "JWT", "Docker", "Consul"],
    image: "https://raw.githubusercontent.com/kubex-ecosystem/gobe/refs/heads/main/docs/assets/top_banner.png",
    images: [],
    github: "https://github.com/kubex-ecosystem/gobe",
    lookatniFile: "lookatni-gobe.latx",
    status: "in-progress"
  },
  {
    id: 3,
    title: "GDBase",
    description: "A Go-based database management system with a focus on performance and simplicity.",
    descriptionPt: "Um sistema de gerenciamento de banco de dados baseado em Go com foco em desempenho e simplicidade.",
    longDescription: "GDBase is a lightweight database management system written in Go. It is designed to be simple to use while providing high performance for data storage and retrieval. The system supports basic CRUD operations and is ideal for small to medium-sized applications.",
    longDescriptionPt: "GDBase é um sistema de gerenciamento de banco de dados leve escrito em Go. Foi projetado para ser simples de usar, proporcionando alto desempenho para armazenamento e recuperação de dados.",
    category: "backend",
    technologies: ["Go", "SQLite", "JSON", "Docker"],
    image: "https://raw.githubusercontent.com/kubex-ecosystem/gdbase/refs/heads/main/docs/assets/top_banner.png",
    images: [],
    github: "https://github.com/kubex-ecosystem/gdbase",
    lookatniFile: "lookatni-gdbase.latx",
    status: "in-progress"
  },
  {
    id: 4,
    title: "Grompt",
    description: "Professional prompt generator for AI models. React frontend embedded in Go binary.",
    descriptionPt: "Gerador de prompts profissionais para modelos de IA. Frontend React embarcado em binário Go.",
    longDescription: "Grompt is an innovative tool that combines React's flexibility with Go's portability. The frontend is statically compiled and embedded directly into the Go binary, allowing the application to be distributed as a single executable file.",
    longDescriptionPt: "O Grompt é uma ferramenta inovadora que combina a flexibilidade do React com a portabilidade do Go. O frontend é compilado estaticamente e embarcado diretamente no binário Go, permitindo distribuir a aplicação como um único arquivo executável.",
    category: "fullstack",
    technologies: ["React", "Go", "JavaScript", "HTML5", "CSS3", "i18next"],
    image: "https://raw.githubusercontent.com/kubex-ecosystem/grompt/refs/heads/main/docs/assets/top_banner.png",
    images: [],
    github: "https://github.com/kubex-ecosystem/grompt",
    demo: "/projects/grompt",
    lookatniFile: "lookatni-grompt.latx",
    status: "completed"
  },
  {
    id: 5,
    title: "Gemini Image Processor",
    description: "Intelligent image processor using Google Gemini Vision to extract structured information.",
    descriptionPt: "Processador de imagens inteligente utilizando Google Gemini Vision para extrair informações estruturadas.",
    longDescription: "Developed as a technical challenge, this project uses the Google Gemini Vision API to process product images and extract structured information. The biggest challenge was creating a robust parser capable of interpreting the varied responses from the Gemini model.",
    longDescriptionPt: "Desenvolvido como desafio técnico, este projeto utiliza o Google Gemini Vision API para processar imagens de produtos e extrair informações estruturadas. O maior desafio foi criar um parser robusto capaz de interpretar as respostas variadas do modelo Gemini.",
    category: "frontend",
    technologies: ["React", "Node.js", "Express", "Google Gemini", "Multer", "Joi"],
    image: "https://raw.githubusercontent.com/kubex-ecosystem/gemini-image-processor/refs/heads/main/docs/assets/top_banner.png",
    images: [],
    github: "https://github.com/kubex-ecosystem/gemini-image-processor",
    demo: "/projects/gemini-image",
    lookatniFile: "lookatni-gemini-images.latx",
    status: "completed"
  },
  {
    id: 8,
    title: "xTUI",
    description: "A UI library for CLI applications, focusing on simplicity and flexibility.",
    descriptionPt: "Uma biblioteca de interface de usuário para aplicações CLI, com foco em simplicidade e flexibilidade.",
    longDescription: "xTUI is a user interface library for command-line applications (CLI) that allows you to create rich and interactive interfaces. With a simple and flexible API, xTUI makes it easy to build modern and responsive CLI applications.",
    longDescriptionPt: "xTUI é uma biblioteca de interface de usuário para aplicações de linha de comando (CLI) que permite criar interfaces ricas e interativas. Com uma API simples e flexível, xTUI facilita a construção de aplicações CLI modernas e responsivas.",
    category: "devtools",
    technologies: ["Go", "CLI", "TUI", "Cobra", "Gocui"],
    image: "https://raw.githubusercontent.com/kubex-ecosystem/xtui/refs/heads/main/docs/assets/top_banner.png",
    images: [],
    github: "https://github.com/kubex-ecosystem/xtui",
    lookatniFile: "lookatni-xtui.latx",
    status: "completed"
  }

];

export const projectCategories = [
  { id: 'all', label: 'All Projects', labelPt: 'Todos os Projetos', count: projects.length },
  { id: 'frontend', label: 'Frontend', labelPt: 'Frontend', count: projects.filter(p => p.category === 'frontend').length },
  { id: 'fullstack', label: 'Full Stack', labelPt: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length },
  { id: 'mobile', label: 'Mobile', labelPt: 'Mobile', count: projects.filter(p => p.category === 'mobile').length },
  { id: 'backend', label: 'Backend', labelPt: 'Backend', count: projects.filter(p => p.category === 'backend').length },
  { id: 'data-science', label: 'Data Science', labelPt: 'Ciência de Dados', count: projects.filter(p => p.category === 'data-science').length },
  { id: 'devtools', label: 'DevTools', labelPt: 'Ferramentas de Dev', count: projects.filter(p => p.category === 'devtools').length },
  { id: 'devops', label: 'DevOps', labelPt: 'DevOps', count: projects.filter(p => p.category === 'devops').length },
  { id: 'game-development', label: 'Game Development', labelPt: 'Desenvolvimento de Jogos', count: projects.filter(p => p.category === 'game-development').length },
  { id: 'ai-ml', label: 'AI/ML', labelPt: 'IA/ML', count: projects.filter(p => p.category === 'ai-ml').length },
  { id: 'tools-libraries', label: 'Tools/Libraries', labelPt: 'Ferramentas/Bibliotecas', count: projects.filter(p => p.technologies.length > 5).length }, // fallback
  { id: 'other', label: 'Other', labelPt: 'Outros', count: projects.filter(p => !['frontend', 'fullstack', 'mobile', 'backend', 'data-science', 'devtools', 'devops'].includes(p.category)).length },
  { id: 'featured', label: 'Featured', labelPt: 'Destaques', count: projects.filter(p => p.featured).length }
];

// export const projectStatuses = [
//   { id: 'all', label: 'All Statuses', labelPt: 'Todos os Status', count: projects.length },
//   { id: 'completed', label: 'Completed', labelPt: 'Concluído', count: projects.filter(p => p.status === 'completed').length },
//   { id: 'in-progress', label: 'In Progress', labelPt: 'Em Andamento', count: projects.filter(p => p.status === 'in-progress').length },
//   { id: 'planned', label: 'Planned', labelPt: 'Planejado', count: projects.filter(p => p.status === 'planned').length },
//   { id: 'archived', label: 'Archived', labelPt: 'Arquivado', count: projects.filter(p => p.status === 'archived').length },
// ];

// export const projectTechnologies = Array.from(
//   new Set(projects.flatMap(p => p.technologies))
// ).map(tech => ({
//   id: tech.toLowerCase(),
//   label: tech,
//   count: projects.filter(p => p.technologies.includes(tech)).length
// }));
