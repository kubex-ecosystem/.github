# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm ci --only=production

# Copia o código da aplicação
COPY src/ ./src/
COPY public/ ./public/

# Cria diretório de logs
RUN mkdir -p logs

# Cria usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S gemini -u 1001

# Define o usuário
USER gemini

# Expõe a porta da aplicação
EXPOSE 3000

# Define variáveis de ambiente padrão
ENV NODE_ENV=production
ENV PORT=3000

# Comando para iniciar a aplicação
CMD ["node", "src/server.js"]
