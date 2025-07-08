import fs from 'fs/promises';
import { logger } from './logger.js';

/**
 * Utilitários para manipulação de imagens e dados
 */

export class ImageProcessor {
  static SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  static MAX_SIZE = 5 * 1024 * 1024; // 5MB

  /**
   * Valida se o arquivo é uma imagem suportada
   */
  static isValidImage(file) {
    return (
      file &&
      this.SUPPORTED_FORMATS.includes(file.mimetype) &&
      file.size <= this.MAX_SIZE
    );
  }

  /**
   * Converte base64 para buffer
   */
  static base64ToBuffer(base64String) {
    try {
      // Remove prefixo data URL se presente
      const base64Data = base64String.replace(/^data:image\/[a-z]+;base64,/, '');
      return Buffer.from(base64Data, 'base64');
    } catch (error) {
      throw new Error('Base64 inválido fornecido');
    }
  }

  /**
   * Detecta tipo MIME de base64
   */
  static detectMimeTypeFromBase64(base64String) {
    const match = base64String.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/);
    return match ? match[1] : null;
  }
}

export class ResponseFormatter {
  /**
   * Formata resposta de sucesso padronizada
   */
  static success(data, message = 'Operação realizada com sucesso', metadata = {}) {
    return {
      status: 'sucesso',
      mensagem: message,
      dados: data,
      ...metadata,
      processado_em: new Date().toISOString()
    };
  }

  /**
   * Formata resposta de erro padronizada
   */
  static error(message, details = null, statusCode = 500) {
    const response = {
      status: 'erro',
      mensagem: message,
      processado_em: new Date().toISOString()
    };

    if (details && process.env.NODE_ENV === 'development') {
      response.detalhes = details;
    }

    return response;
  }

  /**
   * Formata dados de produto extraído
   */
  static formatProductData(rawData) {
    return {
      nome: rawData.nome_produto || 'N/A',
      marca: rawData.marca || 'N/A',
      preco: rawData.preco || 'N/A',
      confianca: rawData.confidence || null
    };
  }
}

export class TextCleaner {
  /**
   * Remove caracteres especiais e normaliza texto
   */
  static cleanText(text) {
    if (typeof text !== 'string') return 'N/A';
    
    return text
      .trim()
      .replace(/\s+/g, ' ') // Remove espaços extras
      .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove caracteres invisíveis
      .replace(/[^\w\s\-.,R$€£¥₹]/g, '') // Mantém apenas caracteres válidos
      .trim();
  }

  /**
   * Extrai preço de texto com diferentes formatos
   */
  static extractPrice(text) {
    if (!text || typeof text !== 'string') return 'N/A';
    
    // Padrões comuns de preço
    const pricePatterns = [
      /R\$\s*(\d+(?:[.,]\d{2})?)/i, // R$ 29,90 ou R$ 29.90
      /(\d+(?:[.,]\d{2})?)\s*reais?/i, // 29,90 reais
      /€\s*(\d+(?:[.,]\d{2})?)/i, // € 29,90
      /\$\s*(\d+(?:[.,]\d{2})?)/i, // $ 29.90
      /(\d+(?:[.,]\d{2})?)/, // 29,90 (genérico)
    ];

    for (const pattern of pricePatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[0];
      }
    }

    return text.includes('N/A') ? 'N/A' : this.cleanText(text);
  }

  /**
   * Normaliza nome do produto
   */
  static normalizeBrandName(brand) {
    if (!brand || typeof brand !== 'string') return 'N/A';
    
    const cleaned = this.cleanText(brand);
    
    // Capitaliza primeira letra de cada palavra
    return cleaned
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

export class FileUtils {
  /**
   * Salva buffer como arquivo temporário
   */
  static async saveBufferToTemp(buffer, filename) {
    try {
      const tempPath = `./temp/${Date.now()}_${filename}`;
      await fs.mkdir('./temp', { recursive: true });
      await fs.writeFile(tempPath, buffer);
      return tempPath;
    } catch (error) {
      logger.error('Erro ao salvar arquivo temporário:', error);
      throw error;
    }
  }

  /**
   * Remove arquivo temporário
   */
  static async removeTemp(filePath) {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      logger.warn('Erro ao remover arquivo temporário:', error);
    }
  }
}

export class RetryUtils {
  /**
   * Executa função com retry em caso de falha
   */
  static async retry(fn, maxAttempts = 3, delay = 1000) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        logger.warn(`Tentativa ${attempt} falhou:`, error.message);
        
        if (attempt < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, delay * attempt));
        }
      }
    }
    
    throw lastError;
  }
}
