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
