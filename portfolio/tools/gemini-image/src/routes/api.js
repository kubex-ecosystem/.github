import express from 'express';
import multer from 'multer';
import geminiService from '../gemini.service.js';
import { validateImageUpload, validateQueryParams } from '../validation.js';
import { successResponse } from '../middleware.js';
import { logger } from '../logger.js';

const router = express.Router();

// Configuração do multer para upload de imagens
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const error = new Error('Tipo de arquivo não suportado');
      error.code = 'INVALID_FILE_TYPE';
      cb(error, false);
    }
  }
});

/**
 * POST /api/extract-product
 * Extrai informações de produto(s) de uma imagem
 */
router.post('/extract-product', 
  upload.single('image'),
  validateImageUpload,
  validateQueryParams,
  async (req, res, next) => {
    try {
      const { file } = req;
      const { detailed, catalog } = req.validatedQuery;
      
      logger.info('Iniciando extração de produto', {
        filename: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        detailed,
        catalog
      });

      let extractedData;
      
      if (catalog) {
        // Modo catálogo: múltiplos produtos
        if (detailed) {
          extractedData = await geminiService.extractCatalogInfoDetailed(
            file.buffer, 
            file.mimetype
          );
        } else {
          extractedData = await geminiService.extractCatalogInfo(
            file.buffer, 
            file.mimetype
          );
        }

        // Formatar resposta para múltiplos produtos
        const formattedProducts = extractedData.map(product => ({
          nome: product.nome_produto,
          marca: product.marca,
          preco: product.preco
        }));

        // Verificar se realmente é um array
        logger.debug('Produtos formatados para resposta:', { 
          formattedProducts,
          isArray: Array.isArray(formattedProducts),
          length: formattedProducts.length,
          type: typeof formattedProducts
        });

        const responseData = {
          produtos: formattedProducts,
          total_produtos: formattedProducts.length
        };

        logger.debug('Dados de resposta final:', { 
          responseData,
          produtosIsArray: Array.isArray(responseData.produtos)
        });

        const response = successResponse(
          responseData,
          `${formattedProducts.length} produto(s) extraído(s) com sucesso`
        );

        logger.info('Extração de catálogo concluída', { 
          total_produtos: formattedProducts.length 
        });
        
        res.json(response);

      } else {
        // Modo tradicional: produto único
        if (detailed) {
          extractedData = await geminiService.extractProductInfoDetailed(
            file.buffer, 
            file.mimetype
          );
        } else {
          extractedData = await geminiService.extractProductInfo(
            file.buffer, 
            file.mimetype
          );
        }

        const response = successResponse(
          {
            nome: extractedData.nome_produto,
            marca: extractedData.marca,
            preco: extractedData.preco
          },
          'Informações do produto extraídas com sucesso'
        );

        logger.info('Extração concluída com sucesso', { extractedData });
        res.json(response);
      }

    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/extract-catalog
 * Extrai informações de múltiplos produtos de uma imagem (catálogos, panfletos)
 */
router.post('/extract-catalog', 
  upload.single('image'),
  validateImageUpload,
  validateQueryParams,
  async (req, res, next) => {
    try {
      const { file } = req;
      const { detailed } = req.validatedQuery;
      
      logger.info('Iniciando extração de catálogo', {
        filename: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        detailed
      });

      let extractedProducts;
      
      if (detailed) {
        // Usa método mais detalhado para catálogos difíceis
        extractedProducts = await geminiService.extractCatalogInfoDetailed(
          file.buffer, 
          file.mimetype
        );
      } else {
        // Método padrão para catálogos
        extractedProducts = await geminiService.extractCatalogInfo(
          file.buffer, 
          file.mimetype
        );
      }

      // Formatar resposta para múltiplos produtos
      const formattedProducts = extractedProducts.map(product => ({
        nome: product.nome_produto,
        marca: product.marca,
        preco: product.preco
      }));

      // Verificar se realmente é um array
      logger.debug('Produtos formatados para endpoint /extract-catalog:', { 
        formattedProducts,
        isArray: Array.isArray(formattedProducts),
        length: formattedProducts.length,
        type: typeof formattedProducts
      });

      const responseData = {
        produtos: formattedProducts,
        total_produtos: formattedProducts.length
      };

      logger.debug('Dados de resposta final do /extract-catalog:', { 
        responseData,
        produtosIsArray: Array.isArray(responseData.produtos)
      });

      const response = successResponse(
        responseData,
        `${formattedProducts.length} produto(s) extraído(s) do catálogo com sucesso`
      );

      logger.info('Extração de catálogo concluída', { 
        total_produtos: formattedProducts.length,
        produtos: formattedProducts 
      });
      
      res.json(response);

    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/health
 * Endpoint de verificação de saúde da API
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'sucesso',
    mensagem: 'API funcionando corretamente',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

/**
 * GET /api/docs
 * Documentação básica da API
 */
router.get('/docs', (req, res) => {
  res.json({
    api: 'Gemini Image Processor',
    version: '2.0.0',
    endpoints: {
      'POST /api/extract-product': {
        description: 'Extrai informações de produto(s) de uma imagem',
        parameters: {
          image: 'Arquivo de imagem (JPEG, PNG, WebP) - máx 5MB',
          detailed: 'boolean - usa análise mais detalhada (opcional)',
          catalog: 'boolean - modo catálogo para múltiplos produtos (opcional)'
        },
        response_single: {
          status: 'sucesso | erro',
          mensagem: 'string',
          dados: {
            nome: 'string',
            marca: 'string', 
            preco: 'string'
          },
          processado_em: 'ISO date string'
        },
        response_catalog: {
          status: 'sucesso | erro',
          mensagem: 'string',
          dados: {
            produtos: 'array de produtos extraídos',
            total_produtos: 'number'
          },
          processado_em: 'ISO date string'
        }
      },
      'POST /api/extract-catalog': {
        description: 'Extrai informações de múltiplos produtos (catálogos, panfletos)',
        parameters: {
          image: 'Arquivo de imagem (JPEG, PNG, WebP) - máx 5MB',
          detailed: 'boolean - usa análise mais detalhada para catálogos difíceis (opcional)'
        },
        response: {
          status: 'sucesso | erro',
          mensagem: 'string',
          dados: {
            produtos: 'array de objetos com informações dos produtos extraídos',
            total_produtos: 'número total de produtos extraídos'
          },
          processado_em: 'ISO date string'
        }
      },
      'GET /api/health': {
        description: 'Verifica status da API'
      }
    },
    examples: {
      single_product: `curl -X POST -F "image=@produto.jpg" ${process.env.NODE_ENV === 'production' ? 'https://yourapi.com' : 'http://localhost:3000'}/api/extract-product`,
      catalog_mode: `curl -X POST -F "image=@catalogo.jpg" "${process.env.NODE_ENV === 'production' ? 'https://yourapi.com' : 'http://localhost:3000'}/api/extract-product?catalog=true"`,
      dedicated_catalog: `curl -X POST -F "image=@panfleto.jpg" ${process.env.NODE_ENV === 'production' ? 'https://yourapi.com' : 'http://localhost:3000'}/api/extract-catalog`,
      detailed_catalog: `curl -X POST -F "image=@supermercado.jpg" "${process.env.NODE_ENV === 'production' ? 'https://yourapi.com' : 'http://localhost:3000'}/api/extract-catalog?detailed=true"`
    }
  });
});

export default router;
