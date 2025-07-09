import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "Timecraft AI",
    description: "Complete e-commerce solution with payment integration, inventory management, and admin dashboard.",
    longDescription: "A full-featured e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, payment processing with Stripe, order management, and comprehensive admin dashboard with analytics.",
    category: "fullstack",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "Redis", "Docker"],
    image: "https://raw.githubusercontent.com/rafa-mori/timecraft/refs/heads/main/docs/assets/timecraft_banner_c.png",
    images: [],
    github: "https://github.com/rafa-mori/timecraft",
    status: "in-progress"
  },
  {
    id: 2,
    title: "GoBE",
    description: "A modular backend developed in Go, focused on security, automation, and flexibility.",
    longDescription: "GoBE is a modular backend framework designed for building secure and scalable applications. It features a plugin architecture, built-in security measures, and supports various databases. The framework is designed to be flexible and easy to extend, making it suitable for a wide range of applications.",
    category: "backend",
    technologies: ["Go", "Redis", "PostgreSQL", "JWT", "Docker", "Consul"],
    image: "https://raw.githubusercontent.com/rafa-mori/gobe/refs/heads/main/docs/assets/top_banner.png",
    images: [],
    github: "https://github.com/rafa-mori/gobe",
    status: "in-progress"
  },
  {
    id: 3,
    title: "GDBase",
    description: "A Go-based database management system with a focus on performance and simplicity.",
    longDescription: "GDBase is a lightweight database management system written in Go. It is designed to be simple to use while providing high performance for data storage and retrieval. The system supports basic CRUD operations and is ideal for small to medium-sized applications.",
    category: "backend",
    technologies: ["Go", "SQLite", "JSON", "Docker"],
    image: "https://raw.githubusercontent.com/rafa-mori/gdbase/refs/heads/main/docs/assets/top_banner.png",
    images: [],
    github: "https://github.com/rafa-mori/gdbase",
    status: "in-progress"
  },
  {
    id: 4,
    title: "Grompt",
    description: "Gerador de prompts profissionais para modelos de IA. Frontend React embarcado em binário Go.",
    longDescription: "O Grompt é uma ferramenta inovadora que combina a flexibilidade do React com a portabilidade do Go. O frontend é compilado estaticamente e embarcado diretamente no binário Go, permitindo distribuir a aplicação como um único arquivo executável sem necessidade de Node.js ou dependências externas.",
    category: "fullstack",
    technologies: ["React", "Go", "JavaScript", "HTML5", "CSS3", "i18next"],
    image: "https://raw.githubusercontent.com/rafa-mori/grompt/refs/heads/main/docs/assets/top_banner.png",
    images: [],
    github: "https://github.com/rafa-mori/grompt",
    demo: "/projects/grompt",
    status: "completed"
  },
  {
    id: 5,
    title: "Gemini Image Processor",
    description: "Processador de imagens inteligente utilizando Google Gemini Vision para extrair informações estruturadas.",
    longDescription: "Desenvolvido como desafio técnico, este projeto utiliza o Google Gemini Vision API para processar imagens de produtos e extrair informações estruturadas. O maior desafio foi criar um parser robusto capaz de interpretar as respostas variadas do modelo Gemini.",
    category: "frontend",
    technologies: ["React", "Node.js", "Express", "Google Gemini", "Multer", "Joi"],
    image: "https://raw.githubusercontent.com/rafa-mori/gemini-image-processor/refs/heads/main/docs/assets/top_banner.png",
    images: [],
    github: "https://github.com/rafa-mori/gemini-image-processor",
    demo: "/projects/gemini-image",
    status: "completed"
  },
  {
    id: 6,
    title: "GoForge",
    description: "Ferramenta CLI para desenvolvimento em Go, focada em produtividade e simplicidade.",
    longDescription: "GoForge é uma ferramenta de linha de comando (CLI) projetada para simplificar o processo de desenvolvimento em Go. Com uma abordagem centrada no desenvolvedor, o GoForge oferece uma experiência de construção e implantação mais suave, permitindo que você se concentre no que realmente importa: escrever código.",
    category: "devtools",
    technologies: ["Go", "CLI", "Docker", "Git", "Makefile", "Cobra"],
    image: "https://raw.githubusercontent.com/rafa-mori/goforge/refs/heads/main/docs/assets/top_banner_m_a.png",
    github: "https://github.com/rafa-mori/goforge",
    status: "completed"
  },
  {
    id: 7,
    title: "Mini Games Canvas",
    description: "Coleção de jogos clássicos criados com HTML5 Canvas e JavaScript puro para relaxar e exercitar lógicas de programação.",
    longDescription: "Uma coleção de mini jogos clássicos (Pong, Snake, Tic-Tac-Toe) desenvolvida com HTML5 Canvas e JavaScript vanilla. O projeto foi criado para descansar a cabeça com lógicas mais leves e divertidas, mas acabou ganhando robustez na implementação.",
    category: "frontend",
    technologies: ["HTML5", "CSS3", "JavaScript", "Canvas", "Game Development"],
    image: "https://raw.githubusercontent.com/rafa-mori/mini-games/refs/heads/main/docs/assets/top_banner.png",
    images: [],
    github: "https://github.com/rafa-mori/mini-games",
    demo: "/projects/mini-games",
    status: "completed"
  }
];

export const projectCategories = [
  { id: 'all', label: 'All Projects', count: projects.length },
  { id: 'frontend', label: 'Frontend', count: projects.filter(p => p.category === 'frontend').length },
  { id: 'fullstack', label: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length },
  { id: 'mobile', label: 'Mobile', count: projects.filter(p => p.category === 'mobile').length },
  { id: 'backend', label: 'Backend', count: projects.filter(p => p.category === 'backend').length },
  { id: 'data-science', label: 'Data Science', count: projects.filter(p => p.category === 'data-science').length },
  { id: 'devtools', label: 'DevTools', count: projects.filter(p => p.category === 'devtools').length },
  { id: 'devops', label: 'DevOps', count: projects.filter(p => p.category === 'devops').length },
  { id: 'game-development', label: 'Game Development', count: projects.filter(p => p.category === 'game-development').length },
  { id: 'ai-ml', label: 'AI/ML', count: projects.filter(p => p.category === 'ai-ml').length },
  { id: 'tools-libraries', label: 'Tools/Libraries', count: projects.filter(p => p.category === 'tools-libraries').length },
  { id: 'other', label: 'Other', count: projects.filter(p => !['frontend', 'fullstack', 'mobile', 'backend', 'data-science', 'devtools', 'devops'].includes(p.category)).length },
  { id: 'featured', label: 'Featured', count: projects.filter(p => p.featured).length }
];

export const projectStatuses = [
  { id: 'all', label: 'All Statuses', count: projects.length },
  { id: 'completed', label: 'Completed', count: projects.filter(p => p.status === 'completed').length },
  { id: 'in-progress', label: 'In Progress', count: projects.filter(p => p.status === 'in-progress').length },
  { id: 'planned', label: 'Planned', count: projects.filter(p => p.status === 'planned').length },
  { id: 'archived', label: 'Archived', count: projects.filter(p => p.status === 'archived').length },
];

export const projectTechnologies = Array.from(
  new Set(projects.flatMap(p => p.technologies))
).map(tech => ({
  id: tech.toLowerCase(),
  label: tech,
  count: projects.filter(p => p.technologies.includes(tech)).length
}));

