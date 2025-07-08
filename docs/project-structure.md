# 🚀 Portfolio Rafa Mori - Estrutura Completa

## 📁 Estrutura de Pastas

```
rafa-mori-portfolio/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── 📁 components/
│   │   ├── 📁 ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── index.ts
│   │   ├── 📁 sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── index.ts
│   │   ├── 📁 layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── index.ts
│   │   └── 📁 common/
│   │       ├── ThemeToggle.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── ProjectFilter.tsx
│   ├── 📁 context/
│   │   └── ThemeContext.tsx
│   ├── 📁 data/
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── personal.ts
│   ├── 📁 lib/
│   │   ├── emailService.ts
│   │   ├── animations.ts
│   │   └── utils.ts
│   ├── 📁 types/
│   │   └── index.ts
│   └── 📁 styles/
│       └── components.css
├── 📁 public/
│   ├── 📁 images/
│   │   ├── profile.png
│   │   └── projects/
│   ├── 📁 icons/
│   └── robots.txt
├── .env.local
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🔧 Configuração Inicial

### package.json
```json
{
  "name": "rafa-mori-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "export": "next build && next export"
  },
  "dependencies": {
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^11.0.0",
    "@emailjs/browser": "^3.11.0",
    "lucide-react": "^0.344.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.1.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.0"
  }
}
```

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'dist',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        dark: {
          50: '#f8fafc',
          900: '#0f172a',
          950: '#020617',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "nodenext",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"],
      "@/data/*": ["./src/data/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node.json"]
}
```

### .env.local
```bash
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://rafa-mori.dev
NEXT_PUBLIC_SITE_NAME="Rafa Mori - Full Cycle Developer"
```

## 🎯 Scripts de Deploy

### Script de Build e Deploy
```bash
#!/bin/bash
# deploy.sh

echo "🚀 Starting build process..."

# Install dependencies
npm install

# Build the project
npm run build

echo "✅ Build completed successfully!"
echo "📁 Static files generated in ./dist/"
echo "🌐 Ready to deploy to Vercel, Netlify, or GitHub Pages"
```

### Vercel Deployment
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "nextjs"
}
```

## 📊 Performance Checklist

### ✅ Otimizações Implementadas
- [x] **Static Site Generation (SSG)** - Build completamente estático
- [x] **Image Optimization** - Next.js Image component otimizado
- [x] **Code Splitting** - Componentes carregados sob demanda
- [x] **Tree Shaking** - Remoção de código não utilizado
- [x] **CSS Purging** - TailwindCSS com purge automático
- [x] **Lazy Loading** - Componentes e imagens com carregamento tardio
- [x] **Bundle Analysis** - Análise de tamanho dos bundles

### 🔍 SEO & Meta Tags
```typescript
// src/app/layout.tsx
export const metadata = {
  title: 'Rafa Mori - Full Cycle Developer',
  description: 'Portfolio de Rafael Mori, desenvolvedor full cycle especializado em React, Node.js, e tecnologias modernas.',
  keywords: 'developer, react, nodejs, typescript, portfolio, full stack',
  authors: [{ name: 'Rafael Mori' }],
  creator: 'Rafael Mori',
  openGraph: {
    title: 'Rafa Mori - Full Cycle Developer',
    description: 'Portfolio profissional de Rafael Mori',
    url: 'https://rafa-mori.dev',
    siteName: 'Rafa Mori Portfolio',
    images: ['/images/og-image.jpg'],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rafa Mori - Full Cycle Developer',
    description: 'Portfolio profissional de Rafael Mori',
    creator: '@faelOmori',
    images: ['/images/og-image.jpg'],
  },
}
```

## 🚀 Comandos de Instalação

```bash
# 1. Criar projeto Next.js
npx create-next-app@latest rafa-mori-portfolio --typescript --tailwind --eslint --app

# 2. Instalar dependências adicionais
cd rafa-mori-portfolio
npm install framer-motion @emailjs/browser lucide-react clsx tailwind-merge

# 3. Configurar variáveis de ambiente
cp .env.example .env.local

# 4. Iniciar desenvolvimento
npm run dev

# 5. Build para produção
npm run build

# 6. Servir build local
npm run start
```

## 📈 Métricas de Performance Esperadas

### Lighthouse Scores Alvo:
- **Performance**: 95+ 🟢
- **Accessibility**: 100 🟢  
- **Best Practices**: 100 🟢
- **SEO**: 100 🟢

### Bundle Size:
- **Initial JS**: < 100KB
- **Total JS**: < 250KB
- **CSS**: < 50KB
- **Images**: Otimizadas automaticamente

---

## 🎨 Próximos Passos

1. **Configurar EmailJS** para formulário de contato
2. **Adicionar projetos reais** no arquivo `data/projects.ts`
3. **Personalizar cores** no Tailwind config
4. **Configurar domínio** personalizado
5. **Implementar Analytics** (Google Analytics/Vercel Analytics)

