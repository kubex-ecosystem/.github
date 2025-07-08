# Gemini Image Processor

API para processar imagens de produtos usando Google Gemini AI e extrair informações estruturadas (nome, marca, preço).

## 🚀 Características

- ✅ Extração automática de nome, marca e preço de produtos
- ✅ Suporte a múltiplos formatos de imagem (JPEG, PNG, WebP)
- ✅ Validação robusta de entrada
- ✅ Processamento inteligente de resposta do Gemini
- ✅ Logs estruturados
- ✅ Tratamento de erros abrangente
- ✅ API RESTful com documentação

## 📋 Pré-requisitos

- Node.js 18 ou superior
- Chave de API do Google Gemini
- npm ou yarn

## 🛠️ Instalação

- Clone o repositório:

  ```bash
  git clone <repository-url>
  cd gemini-image
  ```

- Instale as dependências:

  ```bash
  npm install
  ```

- Configure as variáveis de ambiente:

  ```bash
  cp .env.example .env
  ```

Edite o arquivo `.env` e adicione sua chave da API do Gemini:

```env
GEMINI_API_KEY=sua_chave_api_aqui
PORT=3000
NODE_ENV=development
```

## 🚀 Uso

### Iniciar o servidor

```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

### Fazer requisições

**Extrair informações de produto:**

```bash
curl -X POST \
  -F "image=@caminho/para/sua/imagem.jpg" \
  http://localhost:3000/api/extract-product
```

**Com análise detalhada:**

```bash
curl -X POST \
  -F "image=@produto.jpg" \
  "http://localhost:3000/api/extract-product?detailed=true"
```

### Exemplo de resposta

```json
{
  "status": "sucesso",
  "mensagem": "Informações do produto extraídas com sucesso",
  "dados": {
    "nome": "Smartphone Galaxy S23",
    "marca": "Samsung",
    "preco": "R$ 2.499,00"
  },
  "processado_em": "2025-01-05T10:30:00.000Z"
}
```

## 📚 Endpoints da API

### `POST /api/extract-product`

Extrai informações de um produto a partir de uma imagem.

**Parâmetros:**

- `image` (file): Arquivo de imagem (máx. 5MB)
- `detailed` (query, optional): boolean para análise mais detalhada

**Resposta de sucesso (200):**

```json
{
  "status": "sucesso",
  "mensagem": "Informações do produto extraídas com sucesso", 
  "dados": {
    "nome": "string",
    "marca": "string",
    "preco": "string"
  },
  "processado_em": "ISO date"
}
```

### `GET /api/health`

Verifica o status da API.

### `GET /api/docs`

Documentação interativa da API.

## 🧪 Testando

### Testando com diferentes tipos de imagem

1. **Produtos com embalagem:** Funciona melhor com produtos que têm embalagens claras com texto visível
2. **Etiquetas de preço:** Imagens com etiquetas de preço bem definidas
3. **Produtos de marca:** Itens com logos e marcas visíveis

### Exemplos de teste

```bash
# Teste básico
curl -X POST -F "image=@produto_smartphone.jpg" http://localhost:3000/api/extract-product

# Teste com análise detalhada  
curl -X POST -F "image=@produto_notebook.jpg" "http://localhost:3000/api/extract-product?detailed=true"

# Verificar saúde da API
curl http://localhost:3000/api/health
```

## 🔧 Estrutura do Projeto

```plaintext
src/
├── server.js              # Servidor principal
├── gemini.service.js       # Integração com Gemini AI
├── validation.js           # Validações de entrada
├── middleware.js           # Middlewares customizados
├── utils.js               # Utilitários gerais
├── logger.js              # Configuração de logs
└── routes/
    └── api.js             # Rotas da API
```

## 🚨 Tratamento de Erros

A aplicação trata diversos cenários de erro:

- ❌ Arquivo não suportado
- ❌ Arquivo muito grande (>5MB)
- ❌ Falha na API do Gemini
- ❌ JSON inválido na resposta
- ❌ Erro de validação de dados

## 📊 Logs

Os logs são salvos em:

- `logs/combined.log` - Todos os logs
- `logs/error.log` - Apenas erros

Em desenvolvimento, os logs também aparecem no console.

## 🔐 Considerações de Segurança

- Validação rigorosa de tipos de arquivo
- Limite de tamanho de arquivo
- Headers de segurança HTTP
- Sanitização de dados de entrada
- Logs estruturados para auditoria

## 🚀 Deploy

### Docker (Recomendado)

```bash
# Build da imagem
docker build -t gemini-image-processor .

# Executar container
docker run -p 3000:3000 \
  -e GEMINI_API_KEY=sua_chave \
  gemini-image-processor
```

### Deploy tradicional

1. Configure as variáveis de ambiente de produção
2. Execute `npm start`
3. Configure um proxy reverso (nginx, etc.)

## 📝 Limitações Conhecidas

- Funciona melhor com imagens de alta qualidade
- Texto muito pequeno pode não ser detectado
- Produtos sem texto visível podem retornar "N/A"
- Dependente da qualidade da resposta do Gemini

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.
