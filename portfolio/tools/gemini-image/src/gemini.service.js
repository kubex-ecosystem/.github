import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { logger } from './logger.js';

dotenv.config();

class GeminiService {
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY não encontrada nas variáveis de ambiente');
    }
    
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  /**
   * Converte arquivo para formato compatível com Gemini
   */
  convertFileToGeminiFormat(buffer, mimeType) {
    return {
      inlineData: {
        data: buffer.toString('base64'),
        mimeType: mimeType
      }
    };
  }

  /**
   * Cria prompt otimizado para extração de dados de produtos (produto único)
   */
  createProductExtractionPrompt() {
    return `
Analise cuidadosamente a imagem do produto fornecida e extraia as seguintes informações:

1. Nome do produto (nome específico do item, não descrição genérica)
2. Marca do produto (fabricante ou marca comercial)
3. Preço do produto (valor monetário visível na imagem)

INSTRUÇÕES IMPORTANTES:
- Retorne APENAS um objeto JSON válido, sem texto adicional
- Use exatamente estas chaves: "nome_produto", "marca", "preco"
- Se alguma informação não estiver visível, use "N/A"
- Para preços, inclua a moeda se visível (ex: "R$ 29,90")
- Seja preciso e conciso nas informações extraídas

Formato de resposta obrigatório:
{
  "nome_produto": "[nome específico do produto]",
  "marca": "[marca do produto]",
  "preco": "[preço com moeda se disponível]"
}`;
  }

  /**
   * Cria prompt otimizado para extração de múltiplos produtos (catálogos)
   */
  createCatalogExtractionPrompt() {
    return `
Analise cuidadosamente esta imagem que pode conter MÚLTIPLOS PRODUTOS (como um catálogo, panfleto, ou prateleira de supermercado).

IDENTIFIQUE TODOS OS PRODUTOS VISÍVEIS e extraia para cada um:
1. Nome do produto (específico, não categoria genérica)
2. Marca do produto (fabricante ou marca comercial)
3. Preço do produto (valor monetário completo)

INSTRUÇÕES CRÍTICAS:
- Se houver APENAS 1 produto, retorne um array com 1 item
- Se houver MÚLTIPLOS produtos, retorne um array com todos
- NUNCA misture informações de produtos diferentes
- Para cada produto, se alguma info não estiver visível, use "N/A"
- Mantenha os preços exatos com moeda (ex: "R$ 4,99", "€ 12,50")
- Seja meticuloso: um produto por item do array

FORMATO DE RESPOSTA OBRIGATÓRIO (ARRAY JSON):
[
  {
    "nome_produto": "[nome específico do produto 1]",
    "marca": "[marca do produto 1]", 
    "preco": "[preço com moeda do produto 1]"
  },
  {
    "nome_produto": "[nome específico do produto 2]",
    "marca": "[marca do produto 2]",
    "preco": "[preço com moeda do produto 2]"
  }
]

IMPORTANTE: Retorne APENAS o array JSON, sem texto adicional antes ou depois.`;
  }

  /**
   * Extrai informações do produto usando Gemini
   */
  async extractProductInfo(imageBuffer, mimeType) {
    try {
      logger.info('Iniciando extração de informações do produto com Gemini');
      
      const imageData = this.convertFileToGeminiFormat(imageBuffer, mimeType);
      const prompt = this.createProductExtractionPrompt();

      const result = await this.model.generateContent([prompt, imageData]);
      const response = await result.response;
      const text = response.text();

      logger.info('Resposta bruta do Gemini recebida');
      logger.debug('Resposta do Gemini:', { text });

      return this.parseGeminiResponse(text);
    } catch (error) {
      logger.error('Erro ao extrair informações do produto:', error);
      throw new Error(`Falha na extração com Gemini: ${error.message}`);
    }
  }

  /**
   * Extrai informações de múltiplos produtos usando Gemini (para catálogos)
   */
  async extractCatalogInfo(imageBuffer, mimeType) {
    try {
      logger.info('Iniciando extração de catálogo com múltiplos produtos');
      
      const imageData = this.convertFileToGeminiFormat(imageBuffer, mimeType);
      const prompt = this.createCatalogExtractionPrompt();

      const result = await this.model.generateContent([prompt, imageData]);
      const response = await result.response;
      const text = response.text();

      logger.info('Resposta bruta do Gemini para catálogo recebida');
      logger.debug('Resposta do Gemini (catálogo):', { text });

      return this.parseCatalogResponse(text);
    } catch (error) {
      logger.error('Erro ao extrair informações do catálogo:', error);
      throw new Error(`Falha na extração de catálogo com Gemini: ${error.message}`);
    }
  }

  /**
   * Método alternativo com prompt mais específico para casos difíceis
   */
  async extractProductInfoDetailed(imageBuffer, mimeType) {
    try {
      const imageData = this.convertFileToGeminiFormat(imageBuffer, mimeType);
      
      const detailedPrompt = `
Você é um especialista em análise de produtos. Examine esta imagem cuidadosamente e identifique:

1. NOME DO PRODUTO: O nome específico do item (não categoria genérica)
2. MARCA: O fabricante ou marca comercial
3. PREÇO: Qualquer valor monetário visível

Procure por:
- Texto em embalagens, etiquetas, rótulos
- Logos e marcas comerciais
- Etiquetas de preço, códigos de barras com valores
- Informações em displays ou placas

Retorne APENAS este formato JSON (sem explicações):
{
  "nome_produto": "nome específico encontrado ou N/A",
  "marca": "marca identificada ou N/A", 
  "preco": "valor com moeda se encontrado ou N/A"
}`;

      const result = await this.model.generateContent([detailedPrompt, imageData]);
      const response = await result.response;
      const text = response.text();

      return this.parseGeminiResponse(text);
    } catch (error) {
      logger.error('Erro na extração detalhada:', error);
      throw error;
    }
  }

  /**
   * Método alternativo com prompt mais específico para catálogos difíceis
   */
  async extractCatalogInfoDetailed(imageBuffer, mimeType) {
    try {
      const imageData = this.convertFileToGeminiFormat(imageBuffer, mimeType);
      
      const detailedCatalogPrompt = `
Você é um especialista em análise de catálogos e materiais promocionais. Examine esta imagem meticulosamente.

IDENTIFIQUE TODOS OS PRODUTOS DISTINTOS visíveis na imagem:
- Produtos em prateleiras
- Itens em panfletos/catálogos
- Produtos em displays
- Ofertas promocionais
- Qualquer item com preço visível

Para CADA PRODUTO INDIVIDUAL, extraia:
1. NOME ESPECÍFICO (não categoria genérica)
2. MARCA (fabricante/marca comercial)
3. PREÇO EXATO (valor monetário completo)

INSTRUÇÕES DETALHADAS:
- Examine cada canto da imagem
- NÃO agrupe produtos similares
- CADA produto = 1 item no array
- Se vir "Kit" ou "Combo", trate como 1 produto
- Preços devem incluir moeda e centavos
- Se marca não estiver clara, use "N/A"
- Se preço não estiver visível, use "N/A"

RESPOSTA OBRIGATÓRIA (ARRAY JSON):
[
  {
    "nome_produto": "[nome exato do produto]",
    "marca": "[marca identificada ou N/A]",
    "preco": "[preço completo com moeda ou N/A]"
  }
]

CRÍTICO: Retorne apenas o array JSON, sem explicações.`;

      const result = await this.model.generateContent([detailedCatalogPrompt, imageData]);
      const response = await result.response;
      const text = response.text();

      return this.parseCatalogResponse(text);
    } catch (error) {
      logger.error('Erro na extração detalhada de catálogo:', error);
      throw error;
    }
  }

  /**
   * Processa e valida a resposta do Gemini com estratégias múltiplas
   */
  parseGeminiResponse(rawResponse) {
    try {
      logger.debug('Processando resposta bruta do Gemini:', { rawResponse });
      
      // Estratégia 1: Limpar e tentar parse direto
      let cleanedResponse = this.cleanResponseText(rawResponse);
      
      // Estratégia 2: Tentar parse direto
      try {
        const parsed = JSON.parse(cleanedResponse);
        if (this.isValidProductData(parsed)) {
          return this.validateAndNormalizeData(parsed);
        }
      } catch (directParseError) {
        logger.debug('Parse direto falhou, tentando estratégias alternativas');
      }
      
      // Estratégia 3: Buscar padrões JSON no texto
      const extractedData = this.extractJSONFromText(cleanedResponse);
      if (extractedData) {
        return this.validateAndNormalizeData(extractedData);
      }
      
      // Estratégia 4: Extração baseada em padrões de texto
      const textBasedData = this.extractDataFromNaturalText(cleanedResponse);
      if (textBasedData) {
        return this.validateAndNormalizeData(textBasedData);
      }
      
      // Se chegou aqui, não conseguiu extrair dados válidos
      throw new Error('Não foi possível extrair informações válidas da resposta do Gemini');
      
    } catch (error) {
      logger.error('Erro ao processar resposta do Gemini:', error);
      throw new Error(`Falha ao processar resposta: ${error.message}`);
    }
  }

  /**
   * Processa resposta do Gemini para múltiplos produtos
   */
  parseCatalogResponse(rawResponse) {
    try {
      logger.debug('Processando resposta de catálogo do Gemini:', { rawResponse });
      
      // Estratégia 1: Limpar e tentar parse direto como array
      let cleanedResponse = this.cleanResponseText(rawResponse);
      logger.debug('Resposta limpa:', { cleanedResponse });
      
      // Estratégia 2: Tentar parse direto como array
      try {
        const parsed = JSON.parse(cleanedResponse);
        logger.debug('Parse direto realizado:', { 
          parsed, 
          type: typeof parsed,
          isArray: Array.isArray(parsed),
          keys: parsed ? Object.keys(parsed) : null
        });
        
        if (Array.isArray(parsed)) {
          return this.validateAndNormalizeCatalogData(parsed);
        } else if (this.isValidProductData(parsed)) {
          // Se retornou um objeto único, transformar em array
          logger.info('Objeto único detectado, convertendo para array');
          return this.validateAndNormalizeCatalogData([parsed]);
        } else if (typeof parsed === 'object' && parsed !== null) {
          // Tentar tratar como objeto com chaves numéricas
          logger.info('Objeto com possíveis chaves numéricas detectado');
          return this.validateAndNormalizeCatalogData(parsed);
        }
      } catch (directParseError) {
        logger.debug('Parse direto de array falhou, tentando estratégias alternativas', { error: directParseError.message });
      }
      
      // Estratégia 3: Buscar array JSON no texto
      const extractedArray = this.extractArrayFromText(cleanedResponse);
      if (extractedArray) {
        logger.debug('Array extraído do texto:', extractedArray);
        return this.validateAndNormalizeCatalogData(extractedArray);
      }
      
      // Estratégia 4: Buscar objetos individuais e criar array
      const individualObjects = this.extractMultipleObjectsFromText(cleanedResponse);
      if (individualObjects && individualObjects.length > 0) {
        logger.debug('Objetos individuais encontrados:', individualObjects);
        return this.validateAndNormalizeCatalogData(individualObjects);
      }
      
      // Estratégia 5: Fallback para extração de texto natural múltiplo
      const textBasedProducts = this.extractMultipleProductsFromNaturalText(cleanedResponse);
      if (textBasedProducts && textBasedProducts.length > 0) {
        logger.debug('Produtos extraídos via texto natural:', textBasedProducts);
        return this.validateAndNormalizeCatalogData(textBasedProducts);
      }
      
      // Se chegou aqui, tentar pelo menos um produto
      logger.warn('Todas as estratégias falharam, tentando parse como produto único');
      const singleProduct = this.parseGeminiResponse(rawResponse);
      return [singleProduct];
      
    } catch (error) {
      logger.error('Erro ao processar resposta de catálogo do Gemini:', error);
      throw new Error(`Falha ao processar resposta de catálogo: ${error.message}`);
    }
  }

  /**
   * Limpa o texto da resposta removendo marcadores e formatação
   */
  cleanResponseText(text) {
    return text
      .trim()
      // Remove marcadores de código
      .replace(/```json\s*/gi, '')
      .replace(/```\s*$/g, '')
      .replace(/^```\s*/g, '')
      // Remove quebras de linha desnecessárias
      .replace(/\n\s*\n/g, '\n')
      .replace(/^\s*\n/, '')
      .replace(/\n\s*$/, '')
      // Remove caracteres invisíveis
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .trim();
  }

  /**
   * Extrai JSON usando múltiplos padrões
   */
  extractJSONFromText(text) {
    const jsonPatterns = [
      // Padrão básico para objetos JSON
      /\{[^{}]*"nome_produto"[^{}]*\}/g,
      /\{[^{}]*"nome"[^{}]*\}/g,
      // Padrão mais permissivo
      /\{[\s\S]*?\}/g,
      // Padrão para JSON em múltiplas linhas
      /\{[\s\S]*?"nome[^"]*"[\s\S]*?"marca"[\s\S]*?"preco"[\s\S]*?\}/gi
    ];

    for (const pattern of jsonPatterns) {
      const matches = text.match(pattern);
      if (matches && matches.length > 0) {
        for (const match of matches) {
          try {
            const parsed = JSON.parse(match);
            if (this.isValidProductData(parsed)) {
              logger.debug('JSON extraído com sucesso usando padrão:', { pattern: pattern.source, match });
              return parsed;
            }
          } catch (parseError) {
            logger.debug('Falha ao parsear match:', { match, error: parseError.message });
            continue;
          }
        }
      }
    }
    
    return null;
  }

  /**
   * Extrai dados baseado em padrões de texto natural
   */
  extractDataFromNaturalText(text) {
    logger.debug('Tentando extração baseada em texto natural');
    
    const result = {
      nome_produto: 'N/A',
      marca: 'N/A',
      preco: 'N/A'
    };

    // Padrões para extrair nome do produto
    const nomePatterns = [
      /(?:nome|produto|item):\s*([^\n,]+)/gi,
      /(?:produto|nome)[\s\-:]+([^\n,]+)/gi,
      /^([^,\n]+)(?:,|\n|$)/m // Primeira linha como nome
    ];

    // Padrões para extrair marca
    const marcaPatterns = [
      /(?:marca|fabricante|brand):\s*([^\n,]+)/gi,
      /(?:marca|brand)[\s\-:]+([^\n,]+)/gi
    ];

    // Padrões para extrair preço
    const precoPatterns = [
      /(?:preço|preco|price|valor):\s*([^\n,]+)/gi,
      /(?:R\$|€|\$)\s*[\d.,]+/gi,
      /[\d.,]+\s*(?:reais?|euros?|dollars?)/gi
    ];

    // Tentar extrair cada campo
    for (const pattern of nomePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        result.nome_produto = match[1].trim();
        break;
      }
    }

    for (const pattern of marcaPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        result.marca = match[1].trim();
        break;
      }
    }

    for (const pattern of precoPatterns) {
      const match = text.match(pattern);
      if (match) {
        result.preco = match[0].trim();
        break;
      }
    }

    // Verificar se pelo menos um campo foi encontrado
    const hasValidData = Object.values(result).some(value => value !== 'N/A');
    
    if (hasValidData) {
      logger.debug('Dados extraídos via texto natural:', result);
      return result;
    }

    return null;
  }

  /**
   * Valida se os dados extraídos têm a estrutura esperada
   */
  isValidProductData(data) {
    return (
      typeof data === 'object' &&
      data !== null &&
      ('nome_produto' in data || 'nome' in data) &&
      ('marca' in data) &&
      ('preco' in data)
    );
  }

  /**
   * Normaliza e valida os dados extraídos
   */
  validateAndNormalizeData(data) {
    const normalized = {
      nome_produto: data.nome_produto || data.nome || 'N/A',
      marca: data.marca || 'N/A',
      preco: data.preco || data.preço || 'N/A'
    };

    // Limpa dados vazios ou inválidos
    Object.keys(normalized).forEach(key => {
      if (typeof normalized[key] === 'string') {
        normalized[key] = normalized[key].trim();
        if (normalized[key] === '' || normalized[key].toLowerCase() === 'null') {
          normalized[key] = 'N/A';
        }
      }
    });

    logger.info('Dados normalizados extraídos:', normalized);
    return normalized;
  }

  /**
   * Extrai array JSON do texto
   */
  extractArrayFromText(text) {
    const arrayPatterns = [
      // Array com produtos completos
      /\[[\s\S]*?\{[\s\S]*?"nome_produto"[\s\S]*?\}[\s\S]*?\]/g,
      // Array mais permissivo
      /\[[\s\S]*?\]/g
    ];

    for (const pattern of arrayPatterns) {
      const matches = text.match(pattern);
      if (matches && matches.length > 0) {
        for (const match of matches) {
          try {
            const parsed = JSON.parse(match);
            if (Array.isArray(parsed) && parsed.length > 0) {
              // Verificar se pelo menos um item é um produto válido
              const hasValidProducts = parsed.some(item => this.isValidProductData(item));
              if (hasValidProducts) {
                logger.debug('Array JSON extraído com sucesso:', { match, parsed });
                return parsed;
              }
            }
          } catch (parseError) {
            logger.debug('Falha ao parsear array match:', { match, error: parseError.message });
            continue;
          }
        }
      }
    }
    
    return null;
  }

  /**
   * Extrai múltiplos objetos JSON individuais do texto
   */
  extractMultipleObjectsFromText(text) {
    const objects = [];
    
    // Padrões para encontrar objetos individuais
    const objectPatterns = [
      /\{[^{}]*"nome_produto"[^{}]*\}/g,
      /\{[^{}]*"nome"[^{}]*\}/g
    ];

    for (const pattern of objectPatterns) {
      const matches = text.match(pattern);
      if (matches && matches.length > 0) {
        for (const match of matches) {
          try {
            const parsed = JSON.parse(match);
            if (this.isValidProductData(parsed)) {
              objects.push(parsed);
            }
          } catch (parseError) {
            logger.debug('Falha ao parsear objeto individual:', { match, error: parseError.message });
            continue;
          }
        }
      }
    }
    
    return objects.length > 0 ? objects : null;
  }

  /**
   * Extrai múltiplos produtos baseado em padrões de texto natural
   */
  extractMultipleProductsFromNaturalText(text) {
    logger.debug('Tentando extração de múltiplos produtos via texto natural');
    
    const products = [];
    
    // Dividir texto em seções que podem representar produtos diferentes
    const sections = this.splitTextIntoProductSections(text);
    
    for (const section of sections) {
      const productData = this.extractDataFromNaturalText(section);
      if (productData) {
        products.push(productData);
      }
    }
    
    return products.length > 0 ? products : null;
  }

  /**
   * Divide texto em seções que podem representar produtos diferentes
   */
  splitTextIntoProductSections(text) {
    // Padrões para identificar separadores entre produtos
    const separators = [
      /\n\s*\n/g,          // Linhas vazias
      /\d+\.\s/g,          // Numeração (1. 2. 3.)
      /produto\s*\d+/gi,   // "Produto 1", "Produto 2"
      /item\s*\d+/gi,      // "Item 1", "Item 2"
      /[-=]{3,}/g          // Linhas com traços
    ];
    
    let sections = [text];
    
    // Aplicar cada separador
    for (const separator of separators) {
      const newSections = [];
      for (const section of sections) {
        const parts = section.split(separator);
        newSections.push(...parts.filter(part => part.trim().length > 10));
      }
      if (newSections.length > sections.length) {
        sections = newSections;
      }
    }
    
    return sections.filter(section => section.trim().length > 5);
  }

  /**
   * Valida e normaliza dados de catálogo (array de produtos)
   */
  validateAndNormalizeCatalogData(products) {
    logger.debug('validateAndNormalizeCatalogData - Input recebido:', { 
      products, 
      type: typeof products,
      isArray: Array.isArray(products),
      keys: products ? Object.keys(products) : null
    });

    // Se não é array, tentar converter objeto com chaves numéricas para array
    if (!Array.isArray(products)) {
      if (typeof products === 'object' && products !== null) {
        // Verificar se é um objeto com chaves numéricas (0, 1, 2, etc.)
        const keys = Object.keys(products);
        const isNumericKeys = keys.every(key => /^\d+$/.test(key));
        
        if (isNumericKeys && keys.length > 0) {
          logger.info('Convertendo objeto com chaves numéricas para array');
          // Converter para array mantendo a ordem
          const arrayFromObject = keys
            .sort((a, b) => parseInt(a) - parseInt(b)) // Ordenar numericamente
            .map(key => products[key]);
          
          logger.debug('Objeto convertido para array:', arrayFromObject);
          return this.validateAndNormalizeCatalogData(arrayFromObject);
        }
      }
      
      throw new Error('Dados de catálogo devem ser um array ou objeto com chaves numéricas');
    }

    const normalizedProducts = products
      .filter(product => product && typeof product === 'object')
      .map(product => this.validateAndNormalizeData(product))
      .filter(product => {
        // Remove produtos completamente vazios (todos campos N/A)
        const values = Object.values(product);
        return !values.every(value => value === 'N/A');
      });

    if (normalizedProducts.length === 0) {
      throw new Error('Nenhum produto válido encontrado no catálogo');
    }

    logger.info(`Catálogo processado: ${normalizedProducts.length} produtos encontrados`, normalizedProducts);
    
    // Garantir que sempre retornamos um array verdadeiro
    const finalArray = Array.from(normalizedProducts);
    logger.debug('Array final retornado:', { 
      result: finalArray,
      isArray: Array.isArray(finalArray),
      length: finalArray.length
    });
    
    return finalArray;
  }
}

export default new GeminiService();
