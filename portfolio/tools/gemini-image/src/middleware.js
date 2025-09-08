import { logger } from './logger.js';

// Middleware de tratamento de erros
export const errorHandler = (err, req, res, next) => {
  logger.error('Erro capturado pelo middleware:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });

  // Erro de validação
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'erro',
      mensagem: 'Dados inválidos',
      detalhes: err.message
    });
  }

  // Erro de arquivo muito grande
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      status: 'erro',
      mensagem: 'Arquivo muito grande. Tamanho máximo: 5MB'
    });
  }

  // Erro de tipo de arquivo inválido
  if (err.code === 'INVALID_FILE_TYPE') {
    return res.status(400).json({
      status: 'erro',
      mensagem: 'Tipo de arquivo não suportado. Use: JPEG, PNG ou WebP'
    });
  }

  // Erro da API do Gemini
  if (err.message.includes('Gemini')) {
    return res.status(502).json({
      status: 'erro',
      mensagem: 'Erro no serviço de análise de imagem',
      detalhes: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }

  // Erro interno genérico
  return res.status(500).json({
    status: 'erro',
    mensagem: 'Erro interno do servidor',
    detalhes: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

// Middleware de logging de requisições
export const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.info('Requisição processada', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
  });

  next();
};

// Middleware de resposta padronizada para sucesso
export const successResponse = (data, message = 'Operação realizada com sucesso') => {
  return {
    status: 'sucesso',
    mensagem: message,
    dados: data,
    processado_em: new Date().toISOString()
  };
};
