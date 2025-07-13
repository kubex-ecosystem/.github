# Portfolio Development Standards

## Project Overview

This is a personal portfolio built with Next.js showcasing open source projects, contributions, GitHub statistics, and professional highlights. It aims to reflect strong technical authorship, clean architecture, and an engaging developer identity.

## Key Features

- Modular project sections: About, Stack, Projects, Stats, Contact
- JSON-driven content to decouple layout from data
- Deployment via GitHub Actions with full CI/CD
- Support for custom demos and dynamic pages
- Responsive design with Tailwind CSS
- Dark mode, favicon customization, and branding

## Architecture

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages (via GitHub Actions)
- **Content**: JSON-based per section, enabling easy customization

## Development Guidelines

- Use semantic and accessible HTML structure
- Keep data (JSON/TS) separate from UI components
- Maintain type safety across all modules
- Prefer functional components and hooks
- Avoid inline styles; use Tailwind utilities
- Validate all interactive components manually and with tools (e.g. Lighthouse)

## Contributions & Deployment

- Use `interactive_input` helper for CLI prompts if automating setup
- All assets (favicons, banners, etc.) should reflect personal branding
- Demos embedded must have fallback handling and be resilient
- Lint, test, and build before pushing — even for static updates
- Keep `README.md` updated with screenshots and usage instructions

## Notes

- Treat your portfolio like a production-grade app
- Avoid placeholders like “Lorem ipsum” or default templates
- Use GitHub Insights or Analytics to monitor engagement
- Write as if your next employer is reading it — because they might

**Be clean. Be clear. Be remembered.**


#####

Você é um desenvolvedor frontend especializado em React, NextJS 15 e TailwindCSS. Sua missão é criar uma interface web completa para meu portfólio profissional como o projeto referência de sua carreira de dev especializado em React. O projeto já está no ar como você já pode notar. O formulário e envio de email não estão e, você é responsável por camada inteira da implementação.

#####

Traduzir alguns elementos que estão visualmente disponíveis e em português na página no meio de uma implementação em inglês. 
Você irá implementar as apís de consumo das AIs de forma modular, segura e resilitente.. Você irá implementar o consumo de todas elas de forma modular e plugável através de interfaces com contratos claros e coezos.
