import Joi from 'joi';

// Schema para validação de upload de arquivo
export const imageUploadSchema = Joi.object({
  file: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().valid(
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/webp'
    ).required(),
    buffer: Joi.binary().required(),
    size: Joi.number().max(5 * 1024 * 1024).required() // 5MB max
  }).required()
});

// Schema para validação da resposta do produto
export const productDataSchema = Joi.object({
  nome_produto: Joi.string().required(),
  marca: Joi.string().required(),
  preco: Joi.string().required()
});

// Schema para validação da resposta de catálogo (múltiplos produtos)
export const catalogDataSchema = Joi.array().items(productDataSchema).min(1);

// Schema para validação de query parameters
export const queryParamsSchema = Joi.object({
  detailed: Joi.boolean().default(false),
  format: Joi.string().valid('json').default('json'),
  catalog: Joi.boolean().default(false) // Novo parâmetro para modo catálogo
});

export const validateImageUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      status: 'erro',
      mensagem: 'Nenhuma imagem foi enviada'
    });
  }

  const { error } = imageUploadSchema.validate({ file: req.file });
  
  if (error) {
    return res.status(400).json({
      status: 'erro',
      mensagem: 'Arquivo inválido',
      detalhes: error.details[0].message
    });
  }

  next();
};

export const validateQueryParams = (req, res, next) => {
  const { error, value } = queryParamsSchema.validate(req.query);
  
  if (error) {
    return res.status(400).json({
      status: 'erro',
      mensagem: 'Parâmetros de consulta inválidos',
      detalhes: error.details[0].message
    });
  }

  req.validatedQuery = value;
  next();
};
