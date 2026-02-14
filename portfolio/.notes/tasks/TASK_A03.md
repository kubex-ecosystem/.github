# TASK_A03 - Refactor de Identidade: Header & Hero Dinâmico

## Contexto e Objetivo

Há um pleonasmo visual na página inicial: o nome "Rafael Mori" aparece com destaque tanto no Header (Navbar) quanto no centro do Hero.
O objetivo desta task é:

1. Transformar o Header na "âncora" do meu domínio digital.
2. Transformar o Hero numa vitrine dinâmica de **Proposta de Valor**, utilizando o Framer Motion que já está presente no projeto.

## Tarefas de Execução

### 1. Refactor do Header (Navbar)

- Localize o componente do Header/Navbar (provavelmente em `src/components/` ou dentro de `app/layout.tsx`).
- Substitua o texto de destaque "Rafael Mori" por `rafa-mori.dev` (simulando um ambiente de terminal/domínio).
- Mantenha a tipografia e o estilo definidos na Spec `.kubex/main-visual-spec.md`.

### 2. Refactor do Hero (Proposta de Valor Dinâmica)

- Localize o componente principal do Hero (geralmente em `src/app/page.tsx` ou num componente isolado de Hero).
- **Remova** o `<h1>` gigante com o texto "Rafael Mori".
- **Implemente** um novo `<h1>` usando Framer Motion (`AnimatePresence` e `motion.span` ou `motion.div`) para criar um efeito de transição suave (fade in/out + leve slide vertical) entre as seguintes frases de impacto.
- A estrutura do texto deve ser um prefixo estático seguido de um array rotativo.
  - Prefixo estático: `"Construindo "`
  - Array rotativo (troca a cada 3 ou 4 segundos):
    - `"ecossistemas escaláveis."`
    - `"ferramentas independentes."`
    - `"soluções multi-concept."`
    - `"experiências com IA."`
- Aplique a cor de destaque (Primary Neon/Purple Glow, conforme a Spec) apenas na parte do texto que rotaciona.
- Mantenha a minha foto (avatar) e o subtítulo `"Full Cycle Developer"` intactos logo abaixo desse novo título principal.

### 3

### 4. Animação e Estilo

- A transição entre as frases deve ser suave, utilizando as capacidades do Framer Motion para criar um efeito visual atraente.
- Garanta que o layout seja responsivo e que a nova estrutura do Hero mantenha a harmonia visual com o restante da página, seguindo as diretrizes de design estabelecidas na Spec.

## Restrições

- Use estritamente o `framer-motion` e o Tailwind CSS.
- Garanta que o componente do Hero seja marcado com `"use client"` no topo do arquivo, pois o Framer Motion e o `useEffect`/`setInterval` (para rotacionar o array) exigem renderização no cliente.
