# 📧 Sistema de Email & Idiomas - Configuração

Este documento explica como configurar o sistema de envio de emails do formulário de contato usando Resend e o sistema de idiomas (PT/EN).

## 🌐 Sistema de Idiomas

### ✅ Funcionalidades Implementadas:

- ✅ **Detecção automática**: Detecta idioma do navegador (PT/EN)
- ✅ **Toggle manual**: Botão no header para alternar idiomas
- ✅ **Persistência**: Salva preferência no localStorage
- ✅ **Emails**: Emails enviados no idioma escolhido pelo usuário
- ✅ **Validações**: Mensagens de erro no idioma correto

### 🎯 Para Oportunidades Internacionais:

O sistema agora suporta **inglês por padrão** e português como opção, perfeito para:
- 🌍 Candidaturas internacionais
- 🇺🇸 Empresas americanas/europeias
- 🇧🇷 Clientes brasileiros
- 📈 Mercado global

## 🚀 Configuração do Email

### 1. Configurar Resend

1. Acesse [Resend.com](https://resend.com) e crie uma conta
2. Obtenha sua API key no dashboard
3. Configure seu domínio (opcional mas recomendado)

### 2. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# Resend API Configuration
RESEND_API_KEY=re_xxxxxxxxxx
```

### 3. Configurar Emails na API

Edite `/src/app/api/contact/route.ts` e atualize:

```typescript
// Linha ~95 - Email onde você recebe as mensagens
to: ['seu-email@gmail.com'],

// Linhas ~88 e ~120 - Domínio do remetente (opcional)
from: 'Portfolio Contact <noreply@seu-dominio.com>',
```

## 🎨 Personalização

### Adicionar Mais Idiomas

1. **Edite** `/src/lib/translations.ts`:
```typescript
export const translations = {
  en: { /* traduções em inglês */ },
  pt: { /* traduções em português */ },
  es: { /* adicionar espanhol */ },
  // ...
};
```

2. **Atualize** tipos TypeScript:
```typescript
export type Language = 'en' | 'pt' | 'es';
```

### Modificar Templates de Email

Edite `/src/app/api/contact/route.ts`:
- **Linha ~20**: Templates em inglês
- **Linha ~80**: Templates em português

## 📱 Deploy

### Vercel (Recomendado)

1. Faça push do código para GitHub
2. Conecte no Vercel
3. Adicione a variável `RESEND_API_KEY`
4. Deploy automático! 🚀

### Configuração de Domínio

Para emails profissionais:
1. Configure domínio no Resend
2. Adicione registros DNS
3. Atualize emails na API route

## 🧪 Teste

```bash
npm run dev
```

1. Acesse `http://localhost:3000`
2. **Teste o toggle de idiomas** no header
3. **Teste o formulário** em ambos idiomas
4. **Verifique emails** recebidos

## 🌟 Benefícios da Solução

### Para Mercado Internacional:
- ✅ **Inglês como padrão** (ideal para jobs internacionais)
- ✅ **Detecção automática** de idioma
- ✅ **Experiência profissional** em ambos idiomas

### Para Mercado Nacional:
- ✅ **Português disponível** com um clique
- ✅ **Emails localizados** automaticamente
- ✅ **UX familiar** para usuários brasileiros

### Flexibilidade:
- ✅ **Fácil expansão** para novos idiomas
- ✅ **Traduções centralizadas** em um arquivo
- ✅ **Manutenção simples** de conteúdo

---

**🎯 Recomendação**: Mantenha inglês como padrão para maximizar oportunidades internacionais, com português como opção conveniente para o mercado local!
