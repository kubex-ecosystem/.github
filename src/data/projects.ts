import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "Timecraft AI",
    description: "Complete e-commerce solution with payment integration, inventory management, and admin dashboard.",
    longDescription: "A full-featured e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, payment processing with Stripe, order management, and comprehensive admin dashboard with analytics.",
    category: "fullstack",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "Redis", "Docker"],
    image: "https://github.com/rafa-mori/timecraft/blob/7aba053e5d6d6b6f29bf43674995f63907aa7a9c/docs/assets/timecraft_banner_c.png",
    images: [],
    github: "https://github.com/rafa-mori/timecraft",
    featured: true,
    status: "completed"
  },
  {
    id: 2,
    title: "GoBE",
    description: "A modular backend developed in Go, focused on security, automation, and flexibility.",
    longDescription: "GoBE is a modular backend framework designed for building secure and scalable applications. It features a plugin architecture, built-in security measures, and supports various databases. The framework is designed to be flexible and easy to extend, making it suitable for a wide range of applications.",
    category: "backend",
    technologies: ["Go", "Redis", "PostgreSQL", "JWT", "Docker", "Consul"],
    image: "",
    github: "https://github.com/rafa-mori/gobe",
    featured: true,
    status: "completed"
  },

];

export const projectCategories = [
  { id: 'all', label: 'All Projects', count: projects.length },
  { id: 'frontend', label: 'Frontend', count: projects.filter(p => p.category === 'frontend').length },
  { id: 'fullstack', label: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length },
  { id: 'mobile', label: 'Mobile', count: projects.filter(p => p.category === 'mobile').length },
  { id: 'backend', label: 'Backend', count: projects.filter(p => p.category === 'backend').length },
  { id: 'devops', label: 'DevOps', count: projects.filter(p => p.category === 'devops').length },
];

export const projectTechnologies = Array.from(
  new Set(projects.flatMap(p => p.technologies))
).map(tech => ({
  id: tech.toLowerCase(),
  label: tech,
  count: projects.filter(p => p.technologies.includes(tech)).length
}));

