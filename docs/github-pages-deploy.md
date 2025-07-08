# GitHub Pages Deployment Guide

Este projeto inclui um sistema automatizado de deploy para GitHub Pages, similar ao MkDocs, que permite fazer builds locais e deployar de forma controlada.

## 🚀 Como Usar

### Método 1: Comando npm (Recomendado)

```bash
npm run deploy
```

### Método 2: Script direto

```bash
./scripts/deploy-gh-pages.sh
```

## 📋 O que o Script Faz

1. **Verifica o ambiente** - Git repository, mudanças não commitadas
2. **Faz o build local** - `npm run build`
3. **Cria/muda para branch gh-pages** - Branch dedicada para GitHub Pages
4. **Copia arquivos do build** - Move tudo de `/out` para a raiz da branch
5. **Adiciona arquivos especiais** - `.nojekyll`, `CNAME` se existir
6. **Commit e push** - Envia para o GitHub
7. **Volta para branch principal** - Restaura o estado original
8. **Limpa arquivos temporários** - Opcional, pergunta se quer limpar

## ⚙️ Configuração Inicial

### 1. Primeira execução

```bash
npm run deploy
```

### 2. Configurar no GitHub

1. Vá nas **Settings** do seu repositório
2. Navegue para **Pages**
3. Em **Source**, selecione **Deploy from a branch**
4. Escolha a branch **gh-pages** e pasta **/ (root)**
5. Clique em **Save**

### 3. (Opcional) Domínio customizado

Se você tem um domínio próprio, adicione um arquivo `CNAME` na raiz do projeto:

```bash
echo "seu-dominio.com" > CNAME
```

## 🔧 Personalização

### Configurações avançadas

Copie o arquivo de exemplo e personalize:

```bash
cp .env.deploy.example .env.local
```

Variáveis disponíveis:

- `GH_PAGES_BRANCH`: Nome da branch (padrão: gh-pages)
- `BUILD_DIR`: Diretório do build (padrão: out)
- `AUTO_CLEAN`: Auto-limpeza do build (true/false/prompt)
- `CUSTOM_DOMAIN`: Domínio personalizado
- `COMMIT_PREFIX`: Prefixo das mensagens de commit

## 🛡️ Segurança e Validações

O script inclui várias verificações:

- ✅ Verifica se está em um repositório Git
- ✅ Avisa sobre mudanças não commitadas
- ✅ Valida se o build foi bem-sucedido
- ✅ Confirma antes de operações destrutivas
- ✅ Preserva o estado original em caso de erro

## 📝 Exemplo de Workflow

```bash
# 1. Faça suas mudanças no código
git add .
git commit -m "Nova feature incrível"
git push origin main

# 2. Deploy para GitHub Pages
npm run deploy

# 3. Seu site estará disponível em alguns minutos
```

## 🔄 Comparação com MkDocs

| Recurso | MkDocs | Este Script |
|---------|--------|-------------|
| Build local | ✅ | ✅ |
| Branch separada | ✅ | ✅ |
| Auto-deploy | ✅ | ✅ |
| Limpeza automática | ✅ | ✅ |
| Domínio custom | ✅ | ✅ |
| Validações | ⚠️ | ✅ |

## 🆘 Solução de Problemas

### Build falha

```bash
# Verifique os logs de erro
npm run build

# Teste o build estático localmente
npm run serve:static
```

### Problemas de permissão

```bash
# Torne o script executável
chmod +x scripts/deploy-gh-pages.sh
```

### Conflitos de branch

```bash
# Se a branch gh-pages tiver conflitos
git checkout main
git branch -D gh-pages
npm run deploy  # Recria a branch
```

### Site não aparece

1. Verifique as configurações do GitHub Pages
2. Aguarde alguns minutos (pode demorar até 10 min)
3. Verifique se há erros no Actions do GitHub

## 🌟 Vantagens

- **Controle total**: Build local, você vê tudo acontecendo
- **Sem Actions**: Não depende de GitHub Actions
- **Flexível**: Fácil de personalizar e estender
- **Rápido**: Deploy direto, sem filas de CI/CD
- **Seguro**: Múltiplas validações e confirmações
- **Limpo**: Organiza automaticamente branches e arquivos

---

## 🛠️ Contribuindo  

Se você quiser contribuir com melhorias, correções ou novas  
funcionalidades, fique à vontade para abrir um Pull Request!

## 📝 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.
