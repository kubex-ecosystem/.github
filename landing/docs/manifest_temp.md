# Kubex Manifesto

> **Democratizar tecnologia modular, acessível e poderosa, para qualquer pessoa rodar, integrar e escalar — do notebook antigo ao cluster enterprise — sem jaulas nem burocracia.**

---

## TL;DR

**Um comando para começar. Formatos abertos para continuar. Presets para escalar.**

* **DX primeiro**: menos fricção, mais criação.
* **Sem lock‑in**: exporte tudo, sempre.
* **Mesmo núcleo**: roda local, na borda ou no cluster — só trocam os *presets*.

---

## Princípios (não negociáveis)

1. **O mundo não precisa de mais jaulas**
   Lock‑in mata ideias. Formatos abertos, contratos claros e *export fácil* são lei.

2. **Complexidade é dívida**
   Cada clique a mais é custo. *Um comando = um resultado*.

3. **Tecnologia é ferramenta, não altar**
   Usar o que já existe (AIs, frameworks, clouds) de forma **diluída e capilarizada**: o suficiente para agregar, nunca o bastante para depender.

4. **Escalar é opcional, rodar é obrigatório**
   Se só roda em Kubernetes com 9 nós, esquece. Tem que funcionar num laptop velho.

5. **AI é para todos**
   Integração e automação sem pedir PhD: *assistentes, presets e explicabilidade*.

6. **Fazer dinheiro é saudável, mas não é o único KPI**
   Lucro é motor; impacto é mapa. Se não dá para ter ambos, o design está preguiçoso.

7. **Cada módulo é cidadão de pleno direito**
   Independente, plugável, com *capabilities* claras (CLI/HTTP/Jobs/Events) e ciclo de vida.

8. **O criador de hoje é o mantenedor de amanhã**
   Lançar implica documentar, observar e facilitar quem vier depois.

---

## Modos de operação (mesmo núcleo, experiências diferentes)

* **Community**: local-first, SQLite por padrão, certificados e senhas gerados, UX guiada, conectores populares (CSV/Sheets/ERPs simples).
* **Pro**: presets para times pequenos, OIDC, RBAC básico, métricas e backups automatizados.
* **Enterprise**: multi-tenant, HA, filas, vaulted secrets, auditoria e *policy as code*.

> Troque o *preset*; não reescreva a stack.

---

## Promessas ao usuário

* **Exportabilidade real**: leve dados e módulos com você.
* **Explain‑mode**: antes de agir, explique o que será feito e por quê.
* **Degradação graciosa**: offline‑first quando fizer sentido; retoma quando puder.
* **Observabilidade mínima sempre‑on**: logs estruturados, `/healthz` e indicadores claros.

---

## Chamado à ação

> **“WTF you doing, dude? Let’s code this damn thing and try to make the world a better place… buuut MAKING MONEY!”**

* Comece pelo wrapper universal: `kbxctl serve`.
* Publique um módulo simples (CLI ou HTTP).
* Escreva um *README* com exemplos reais.
* Abra uma issue propondo um conector útil para gente de verdade.

---

## Voz & Estilo

* Direto, pragmático, sem *enterprise‑speak*.
* Humor rápido quando ajuda, precisão técnica sempre.
* Slogans oficiais: **Code Fast. Own Everything.** · **One Command. All the Power.** · **No Lock‑in. No Excuses.**

---

## Governança mínima (v0)

* Decisões via RFC curta (template em `/.github/`), com *owner* e prazo.
* PRs passam por checklist de DX (comando de entrada, exemplos, logs).
* Releases seguem SemVer. *Breaking changes* só com migração documentada.

---

## Licença & Ética

* Licença **MIT** (núcleo e módulos essenciais).
* Extensões comerciais podem existir, **sem fechar portas**.
* Dados do usuário são do usuário. Ponto.

---

## Gratidão

Kubex existe graças a pessoas que insistem em fazer o difícil parecer simples. *Sometimes magic is just someone spending more time on something than anyone else might reasonably expect.* 🎩

---

## Versão

`Manifesto v0.1` — este documento evolui junto com o projeto. Sugira mudanças via PR.
