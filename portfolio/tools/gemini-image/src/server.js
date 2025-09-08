import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

import apiRoutes from './routes/api.js';
import { errorHandler, requestLogger } from './middleware.js';
import { logger } from './logger.js';

// Configuração de paths para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carrega variáveis de ambiente
dotenv.config();

// Cria diretório de logs se não existir
const logsDir = join(__dirname, '..', 'logs');
if (!existsSync(logsDir)) {
  mkdirSync(logsDir, { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourfrontend.com'] // Configure com seus domínios em produção
    : true, // Permite qualquer origem em desenvolvimento
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(requestLogger);

// Middleware para adicionar headers de segurança básicos
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Servir arquivos estáticos
app.use(express.static(join(__dirname, '..', 'public')));

// Rotas da API
app.use('/api', apiRoutes);

// Rota de boas-vindas (serve o frontend ou JSON baseado no Accept header)
app.get('/', (req, res) => {
  const acceptsHtml = req.headers.accept && req.headers.accept.includes('text/html');
  
  if (acceptsHtml) {
    // Serve o frontend HTML
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  } else {
    // Serve informações da API em JSON
    res.json({
      message: 'Gemini Image Processor API',
      version: '1.0.0',
      docs: '/api/docs',
      health: '/api/health',
      frontend: '/',
      timestamp: new Date().toISOString()
    });
  }
});

// Middleware de tratamento de rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'erro',
    mensagem: 'Endpoint não encontrado',
    path: req.originalUrl
  });
});

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Validação de variáveis de ambiente essenciais
function validateEnvironment() {
  const requiredVars = ['GEMINI_API_KEY'];
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    logger.error('Variáveis de ambiente obrigatórias não encontradas:', missing);
    process.exit(1);
  }
}

// Inicialização do servidor
function startServer() {
  try {
    validateEnvironment();
    
    const server = app.listen(PORT, () => {
      logger.info(`🚀 Servidor rodando na porta ${PORT}`);
      logger.info(`📚 Documentação: http://localhost:${PORT}/api/docs`);
      logger.info(`❤️  Health check: http://localhost:${PORT}/api/health`);
      logger.info(`🖼️  Endpoint principal: http://localhost:${PORT}/api/extract-product`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM recebido, encerrando servidor...');
      server.close(() => {
        logger.info('Servidor encerrado');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      logger.info('SIGINT recebido, encerrando servidor...');
      server.close(() => {
        logger.info('Servidor encerrado');
        process.exit(0);
      });
    });

  } catch (error) {
    logger.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

startServer();

export default app;
