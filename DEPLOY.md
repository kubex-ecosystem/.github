# 🚀 Deploy Rápido para GitHub Pages

## 🎯 Uso Simples (1 comando!)

```bash
npm run deploy
```

## 🧪 Testar antes de deployar

```bash
npm run deploy -- --dry-run
```

## 🏗️ O que vai acontecer

1. ✅ **Validação completa** do ambiente e dependências
2. ✅ **Build isolado** do projeto (`npm run build`)
3. ✅ **Workspace temporário** com mktemp (zero side-effects)
4. ✅ **Arquivo ZIP** ultra-rápido (sem compressão)
5. ✅ **Deploy isolado** em ambiente temporário
6. ✅ **Push para GitHub** Pages
7. ✅ **Cleanup automático** e volta ao estado original
8. ✅ **Ambiente limpo** garantido, mesmo em caso de erro

## 🛡️ Funcionalidades Enterprise

- **🔒 Zero Side-Effects**: Seu ambiente nunca é afetado
- **⚡ Super Rápido**: ZIP sem compressão + otimizações
- **🧹 Auto-Cleanup**: Trap robusto limpa tudo automaticamente  
- **🔍 Validação Total**: Verifica tudo antes de começar
- **🏃 Dry Run**: Teste sem fazer push real
- **📊 Logs Bonitos**: Output colorido e informativo
- **🚨 Error Recovery**: Falha segura com ambiente intacto

## 🎮 Primeira vez? Configure no GitHub

1. Após o primeiro deploy, vá em: **Settings → Pages**
2. Selecione: **Deploy from branch**
3. Escolha: **gh-pages branch** + **/ (root)**
4. Salve e aguarde alguns minutos

## 🌐 Seu site estará em

`https://rafa-mori.github.io/rafa-mori/`

## 🔧 Personalização

Edite `.deployignore` para controlar o que vai no deploy:

```bash
# Exemplo: excluir arquivos grandes desnecessários
*.mp4
docs/assets/
```

---

**🎉 É isso!** Enterprise-grade deployment com a simplicidade do MkDocs!
