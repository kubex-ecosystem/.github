# Kubex Ecosystem & Personal Brand - Visual Specification

**Versão:** 2.0 (Refactored: Minimalismo B2D / Alta Tecnologia)
**Diretriz Principal:** "Sólido, Escuro, Funcional." Menos bordas, mais respiro. O brilho vem da tecnologia, não do excesso de cores.

## 1. O Conceito (Vibe)

A identidade visual do ecossistema Kubex e do portfólio pessoal transita no **Minimalismo Dark**. Abandonamos o cyberpunk poluído e os mascotes cartunescos. Assumimos a estética de ferramentas de engenharia de software de ponta: telas escuras, tipografia impecável, geometria abstrata e glows (brilhos) sutis de neon apenas para guiar a atenção.

## 2. Paleta de Cores (The Dark Forge)

### Fundos e Superfícies (Backgrounds)

A base de tudo é o vácuo. O contraste faz o resto.

* **Base/Canvas:** `slate-950` (#020617) a `black` (#000000).
* **Cards/Superfícies:** `slate-900` (#0f172a) com opacidade. Nunca cores sólidas vibrantes.
* **Bordas (Subtis):** `slate-800` (#1e293b) ou branco com 10% de opacidade (`white/10`).

### Acentos (Glow & Neon)

Usados com extrema parcimônia. Apenas para highlights, botões primários, gradientes de texto e focos de luz isométrica nos banners.

* **Primary (Kubex Core):** Electric Purple (`purple-500` / #a855f7) para elementos de sistema, arquitetura e botões principais.
* **Secondary (Status/Data):** Emerald Green (`emerald-400` / #34d399) para sucesso, dados, terminais e status "Keep Alive".
* **Tertiary (Apoio):** Cyber Blue (`blue-500` / #3b82f6) para links e conexões secundárias.

## 3. Tipografia

A hierarquia deve separar o "humano" do "sistema".

* **Headings (Títulos/Logo):** `Inter`, `Geist` ou `Satoshi`. Pesos pesados (Bold/Black). Sem serifa, limpo, tracking (espaçamento) ligeiramente apertado para um visual premium.
* **Body (Corpo de Texto):** Mesma fonte dos Headings, mas em peso Regular/Medium. Cor cinza claro (`gray-400` ou `slate-300`) para não cansar a leitura. Branco puro (`white`) apenas para destaque.
* **Tech/System (Monospace):** `JetBrains Mono`, `Fira Code` ou `Geist Mono`. Usada **estritamente** para tags, badges, logs do "Keep Alive", trechos de código e subtítulos técnicos (ex: `[STATUS: ONLINE]`).

## 4. Banners de Projeto (A Regra da Poda)

Todos os repositórios (GNyx, Domus, GoForge, xTUI) devem seguir o mesmo template visual no portfólio e no GitHub:

1. **Fundo:** `slate-950` com uma textura quase invisível (5-10% de opacidade) de grid isométrico, noise (granulação) ou micro-circuitos.
2. **Objeto Central:** Geometria abstrata 3D (vidro fosco ou metal escuro) emitindo um "inner glow" usando a cor de acento do projeto. ZERO mascotes. ZERO printscreens crus de terminal.
3. **Texto no Banner:** Minimalista. Apenas o Nome do Projeto centralizado em fonte Bold e um badge Monospace embaixo. Deixe as descrições para o README e para o HTML do portfólio.

## 5. UI Elements no Portfólio (Next.js/Tailwind)

* **Glassmorphism Leve:** Fundo de cards e navbars devem usar `backdrop-blur-md` com fundo semi-transparente (`bg-slate-900/50`).
* **Hover Effects:** Interações não mudam radicalmente a cor. Elas adicionam um brilho (`shadow-[cor]`), um micro-movimento (`scale-105`) ou clareiam sutilmente a borda.
* **Espaçamento:** Dobro de "respiro" (padding/margin) entre as seções. O conteúdo não pode parecer espremido.
