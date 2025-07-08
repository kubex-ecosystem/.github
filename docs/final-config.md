# 🚀 Guia Completo de Setup e Deploy

## 📋 Checklist de Setup

### 1. Instalação Inicial

```bash
# Clonar ou criar o projeto
npx create-next-app@latest rafa-mori-portfolio --typescript --tailwind --eslint --app

# Navegar para o diretório
cd rafa-mori-portfolio

# Instalar dependências
npm install framer-motion @emailjs/browser lucide-react clsx tailwind-merge

# Copiar arquivos fornecidos para estrutura correta
# (todos os arquivos TypeScript/React fornecidos nos artefatos anteriores)
```

### 2. Configuração de Ambiente

#### Arquivo .env.local

```bash
# EmailJS - Obter em https://www.emailjs.com/
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Site Info
NEXT_PUBLIC_SITE_URL=https://rafa-mori.dev
NEXT_PUBLIC_SITE_NAME="Rafa Mori - Full Cycle Developer"
```

#### Configuração do EmailJS

1. **Criar conta no EmailJS**: <https://www.emailjs.com/>
2. **Criar Service** (Gmail/Outlook/etc)
3. **Criar Template**:

```html
<!-- EmailJS Template HTML -->
<div>
  <h2>Nova mensagem do portfólio</h2>
  <p><strong>Nome:</strong> {{from_name}}</p>
  <p><strong>Email:</strong> {{from_email}}</p>
  <p><strong>Assunto:</strong> {{subject}}</p>
  <p><strong>Mensagem:</strong></p>
  <p>{{message}}</p>
</div>
```

### 3. Estrutura de Imagens

```plaintext
public/
├── images/
│   ├── profile.png                 # Sua foto de perfil
│   ├── og-image.jpg               # Open Graph image (1200x630)
│   └── projects/                  # Screenshots dos projetos
│       ├── ecommerce-hero.jpg
│       ├── taskapp-hero.jpg
│       ├── devops-hero.jpg
│       ├── chat-hero.jpg
│       ├── dashboard-hero.jpg
│       └── api-gateway-hero.jpg
├── icons/
│   └── favicon.ico
└── robots.txt
```

### 4. Personalização dos Dados

#### src/data/projects.ts

```typescript
// Substitua pelos seus projetos reais
export const projects: Project[] = [
  {
    id: 1,
    title: "Seu Projeto Real",
    description: "Descrição do seu projeto...",
    category: "fullstack",
    technologies: ["React", "Node.js", "PostgreSQL"],
    image: "/images/projects/seu-projeto.jpg",
    github: "https://github.com/faelmori/seu-projeto",
    demo: "https://seu-projeto.vercel.app",
    featured: true,
    status: "completed"
  },
  // ... mais projetos
];
```

#### src/data/personal.ts

```typescript
// Atualizar com suas informações
export const personalInfo: PersonalInfo = {
  name: "Seu Nome",
  title: "Seu Título",
  bio: "Sua bio personalizada...",
  location: "Sua Cidade, País",
  email: "seu@email.com",
  social: {
    github: "https://github.com/seu-usuario",
    linkedin: "https://linkedin.com/in/seu-perfil",
    twitter: "https://twitter.com/seu-usuario"
  }
};
```

## 🎨 Customização Visual

### Cores Personalizadas (tailwind.config.js)

```javascript
theme: {
  extend: {
    colors: {
      // Suas cores de marca
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',  // Azul principal
        600: '#2563eb',
        700: '#1d4ed8',
      },
      secondary: {
        500: '#8b5cf6',  // Roxo secundário
        600: '#7c3aed',
      }
    }
  }
}
```

### CSS Customizado (src/styles/components.css)

```css
/* Animações personalizadas */
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Efeito glass morphism */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.dark .glass-card {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

## 🚀 Deploy

### 1. Deploy na Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Para domínio personalizado
vercel --prod
```

#### Configuração Vercel (vercel.json)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "nextjs",
  "functions": {},
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2. Deploy na Netlify

```bash
# Build local
npm run build

# Fazer upload da pasta 'dist' no Netlify
# ou conectar repositório GitHub
```

#### Configuração Netlify (_redirects)

```plaintext
/*    /index.html   200
```

### 3. Deploy no GitHub Pages

```bash
# Instalar gh-pages
npm install --save-dev gh-pages

# Adicionar ao package.json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Deploy
npm run deploy
```

## 🔍 SEO e Performance

### Meta Tags (src/app/layout.tsx)

```typescript
export const metadata: Metadata = {
  title: 'Seu Nome - Full Cycle Developer',
  description: 'Sua descrição profissional otimizada para SEO...',
  keywords: 'suas, palavras, chave, relevantes',
  authors: [{ name: 'Seu Nome', url: 'https://seu-site.com' }],
  // ... outras configurações
};
```

### Performance Checklist

- ✅ **Imagens otimizadas** (WebP, tamanhos corretos)
- ✅ **Lazy loading** implementado
- ✅ **Bundle size** otimizado
- ✅ **CSS crítico** inline
- ✅ **Fontes** otimizadas (Google Fonts)

### Lighthouse Score Alvo

- **Performance**: 95+ 🟢
- **Accessibility**: 100 🟢
- **Best Practices**: 100 🟢
- **SEO**: 100 🟢

## 📊 Analytics

### Google Analytics 4

```typescript
// src/lib/gtag.ts
export const GA_TRACKING_ID = 'G-XXXXXXXXXX';

export const gtag = (...args: any[]) => {
  (window as any).gtag(...args);
};
```

### Vercel Analytics

```bash
npm install @vercel/analytics

# Em src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## 🧪 Testes

### Setup de Testes

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

### Exemplo de Teste

```typescript
// __tests__/components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  const button = screen.getByRole('button', { name: /click me/i });
  expect(button).toBeInTheDocument();
});
```

## 🔧 Scripts Úteis

### package.json scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "analyze": "cross-env ANALYZE=true next build",
    "deploy": "npm run build && npm run export"
  }
}
```

### Pre-commit Hook (package.json)

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

## 🎯 Checklist Final de Launch

### Pré-Launch

- [ ] **Dados pessoais** atualizados
- [ ] **Projetos reais** adicionados
- [ ] **Imagens** otimizadas e carregadas
- [ ] **Links** funcionando
- [ ] **Formulário de contato** testado
- [ ] **SEO** configurado
- [ ] **Analytics** configurado
- [ ] **Domínio** personalizado configurado

### Pós-Launch

- [ ] **Google Search Console** configurado
- [ ] **Sitemap** submetido
- [ ] **Social media** atualizada
- [ ] **LinkedIn** e outros perfis atualizados
- [ ] **Performance** monitorada
- [ ] **Feedback** coletado

## 🆘 Troubleshooting

### Erros Comuns

1. **EmailJS não funciona**
   - Verificar chaves no .env.local
   - Verificar configuração do template
   - Testar em ambiente de produção

2. **Imagens não carregam**
   - Verificar caminhos no /public
   - Otimizar tamanhos
   - Usar next/image

3. **Dark mode não persiste**
   - Verificar localStorage
   - Verificar SSR/hydration

4. **Performance baixa**
   - Otimizar imagens
   - Lazy loading
   - Code splitting

### Suporte

- **Next.js Docs**: <https://nextjs.org/docs>
- **Framer Motion**: <https://www.framer.com/motion/>
- **TailwindCSS**: <https://tailwindcss.com/docs>
- **EmailJS**: <https://www.emailjs.com/docs/>

---

## 🎉 Conclusão

Seu portfólio está pronto para impressionar!

**Principais funcionalidades implementadas:**

- ✅ Design moderno e responsivo
- ✅ Dark/Light mode
- ✅ Filtros de projetos interativos
- ✅ Formulário de contato funcional
- ✅ Animações suaves
- ✅ SEO otimizado
- ✅ Performance excelente
- ✅ Build estático

**Próximos passos:**

1. Personalizar com seus dados
2. Adicionar seus projetos reais
3. Fazer deploy
4. Monitorar performance
5. Iterar baseado em feedback

**Sucesso garantido!** 🚀🎯

## 🛠️ Configuração Final do Projeto

### Estrutura Final do Projeto

```plaintextrafa-mori-portfolio/
├── src/
│   ├── app/
│   │   ├── projects/
│   │   │   ├── mini-games/ 
│   │   │   │   └── page.tsx      # Página do Mini Games
│   │   │   ├── grompt/
│   │   │   │   └── page.tsx      # Página do Grompt
│   │   │   └── gemini-image/
│   │   │       └── page.tsx      # Página do Gemini Image
│   │   └── page.tsx              # Homepage principal
│   └── data/
│       └── projects.ts           # Dados dos projetos
├── tools/
│   ├── mini_games/               # Projeto original Mini Games
│   ├── grompt/                   # Projeto original Grompt (frontend)
│   └── gemini-image/             # Projeto original Gemini Image
├── public/
│   └── tools/                    # Builds e assets dos projetos
│       ├── mini_games/           # Assets copiados
│       └── grompt/               # Build do React
├── package.json                  # Scripts de build integrados
└── README.md                     # Documentação do projeto
```

### Configuração do Next.js  

```javascript
// next.config.js
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['example.com'],
  },
};

module.exports = nextConfig;

// next.config.js (com rewrites)
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['example.com'],
  },
  async rewrites() {
    return [
      {
        source: '/projects/:path*',
        destination: '/projects/:path*',
      },
    ];
  },
};

export default nextConfig;
```
