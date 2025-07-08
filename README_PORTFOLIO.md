# 🎨 Rafa Mori Portfolio

Portfólio pessoal desenvolvido com Next.js 15, React 19 e Tailwind CSS, integrando demonstrações interativas de 3 projetos pessoais.

## 🚀 Projetos Integrados

Este portfólio inclui demonstrações funcionais dos seguintes projetos:

### 1. 🎮 Mini Games Canvas

- **Localização**: `/projects/mini-games`
- **Tecnologia**: HTML5 Canvas + JavaScript puro
- **Jogos**: Pong, Snake, Tic-Tac-Toe
- **Status**: ✅ Totalmente funcional

### 2. ⚡ Grompt

- **Localização**: `/projects/grompt`
- **Tecnologia**: React integrado ao Next.js
- **Funcionalidade**: Gerador de prompts profissionais para IA
- **Status**: ✅ Demo interativo (sem backend Go)

### 3. 🤖 Gemini Image Processor

- **Localização**: `/projects/gemini-image`
- **Tecnologia**: React com interface mock
- **Funcionalidade**: Simulação de análise de imagens com IA
- **Status**: ✅ Demo com dados simulados

## 🛠️ Tecnologias Utilizadas

### Core

- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca de interface de usuário
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Framework de estilos

### Bibliotecas Adicionais

- **Framer Motion** - Animações
- **Lucide React** - Ícones
- **React Toastify** - Notificações
- **CodeMirror** - Editor de código
- **i18next** - Internacionalização

## 🚀 Como Executar

### Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

### Build de Produção

```bash
# Build para produção
npm run build

# O resultado estará em /out (configurado para GitHub Pages)
```

## 🎯 Arquitetura da Integração

### Estratégia Adotada

Em vez de executar os projetos como aplicações separadas (que causaria conflitos de porta e incompatibilidade com GitHub Pages), foi adotada a estratégia de:

1. **Extração da lógica React**: Componentes puros sem dependências externas
2. **Integração de dependências**: Unificação no package.json principal
3. **Demonstrações funcionais**: Interfaces que mostram a funcionalidade real
4. **Assets estáticos**: Mini games mantidos como HTML/CSS/JS puro

### Benefícios

- ✅ **Sem conflitos de porta**: Tudo roda no mesmo servidor Next.js
- ✅ **GitHub Pages compatível**: Build estático sem backends
- ✅ **Performance otimizada**: Bundle único e otimizado
- ✅ **Manutenção simplificada**: Uma única base de código
- ✅ **SEO amigável**: Roteamento Next.js nativo

## 📝 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run start        # Servir build local
npm run lint         # Verificar código
npm run serve:static # Servir pasta out/
```

---

**Desenvolvido com ❤️ por [Rafael Mori](https://github.com/rafa-mori)**
