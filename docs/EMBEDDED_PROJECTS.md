# 🎯 Portfólio Rafa Mori - Projetos Integrados

Este portfólio contém uma coleção integrada de projetos que demonstram diferentes aspectos do desenvolvimento web e programação.

## 🚀 Projetos Embarcados

### 1. 🎮 Mini Games Canvas

- **Localização**: `/tools/mini_games/`
- **Tecnologia**: HTML5 Canvas + JavaScript puro
- **URL**: `/projects/mini-games`
- **Descrição**: Coleção de jogos clássicos (Pong, Snake, Tic-Tac-Toe)
- **Status**: ✅ Funcionando - arquivos estáticos copiados para `/public/tools/mini_games/`

### 2. ⚡ Grompt

- **Localização**: `/tools/grompt/`
- **Tecnologia**: React embarcado em Go
- **URL**: `/projects/grompt`
- **Build**: React compilado estaticamente
- **Status**: ✅ Funcionando - build copiado para `/public/tools/grompt/`

### 3. 🤖 Gemini Image Processor

- **Localização**: `/tools/gemini-image/`
- **Tecnologia**: React + Node.js + Google Gemini API
- **URL**: `/projects/gemini-image`
- **Descrição**: Processador de imagens com IA
- **Status**: ✅ Funcionando - interface integrada

## 🛠️ Scripts de Build

### Desenvolvimento

```bash
# Inicia o portfólio principal
npm run dev

# Desenvolve o grompt separadamente
npm run dev:grompt
```

### Produção

```bash
# Build completo (inclui todos os sub-projetos)
npm run build

# Build apenas dos tools
npm run build:tools

# Build específico do grompt
npm run build:grompt
```

## 📁 Estrutura do Projeto

```plaintext
rafa-mori/
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
└── package.json                  # Scripts de build integrados
```

## 🔧 Configurações

### Next.js

- **Output**: Export estático
- **Rewrites**: Configurados para `/tools/*`
- **Exclusões**: Diretório `tools/` excluído do build Next.js

### ESLint

- **Grompt**: ESLint desabilitado durante build para evitar conflitos
- **Principal**: Configuração Next.js padrão

### Dependências

- **Isolamento**: Cada sub-projeto mantém suas próprias dependências
- **Build**: Dependências instaladas durante o processo de build
- **Conflitos**: Resolvidos com `--legacy-peer-deps` quando necessário

## 🚦 Status dos Projetos

| Projeto | Status | Build | Demo | GitHub |
|---------|--------|-------|------|--------|
| Mini Games | ✅ Funcionando | HTML/JS/CSS | `/projects/mini-games` | ✅ |
| Grompt | ✅ Funcionando | React Build | `/projects/grompt` | ✅ |
| Gemini Image | ✅ Funcionando | Interface integrada | `/projects/gemini-image` | ✅ |

## 🔄 Processo de Integração

1. **Cópia de Arquivos**: Mini Games copiado diretamente para `/public/`
2. **Build React**: Grompt buildado e copiado para `/public/`
3. **Páginas Next.js**: Criadas páginas dedicadas para cada projeto
4. **Navegação**: Integrada na seção de projetos do portfólio
5. **Isolamento**: Cada projeto mantém sua identidade e tecnologias

## 🧪 Testando Localmente

```bash
# Clone o repositório
git clone <repo-url>

# Instale dependências
npm install

# Build todos os projetos
npm run build:tools

# Inicie o desenvolvimento
npm run dev
```

## 📝 Notas Importantes

- **Compatibilidade**: Projetos mantêm compatibilidade com suas origens
- **Open Source**: Todos os projetos são código aberto
- **Comunidade**: Desenvolvidos com carinho para a comunidade
- **Demonstração**: Funcionam como demonstração das habilidades técnicas

## 🤝 Contribuições

Cada projeto mantém sua própria licença e diretrizes de contribuição. Verifique os repositórios individuais para mais informações.

---

***Desenvolvido com ❤️ por Rafa Mori***
