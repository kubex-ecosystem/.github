# Configurações do Projeto

## Variáveis de Ambiente Obrigatórias

### GEMINI_API_KEY

Chave de API do Google Gemini AI.

**Como obter:**

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada

**Configuração:**

```bash
GEMINI_API_KEY=sua_chave_real_aqui
```

## Variáveis de Ambiente Opcionais

### PORT

Porta do servidor (padrão: 3000)

```bash
PORT=3000
```

### NODE_ENV

Ambiente de execução (development/production)

```bash
NODE_ENV=development
```

### LOG_LEVEL

Nível de log (error/warn/info/debug)

```bash
LOG_LEVEL=info
```

### MAX_FILE_SIZE

Tamanho máximo de arquivo

```bash
MAX_FILE_SIZE=5MB
```

### ALLOWED_FILE_TYPES

Tipos de arquivo permitidos

```bash
ALLOWED_FILE_TYPES=image/jpeg,image/jpg,image/png,image/webp
```

## Configurações de Produção

Para produção, adicione também:

```bash
# Segurança
NODE_ENV=production

# CORS (domínios permitidos)
ALLOWED_ORIGINS=https://seudominio.com,https://www.seudominio.com

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logs
LOG_LEVEL=warn
LOG_FILE_PATH=/var/log/gemini-image-processor.log
```
