# Exemplo de Uso da API Gemini Image Processor

Este documento mostra exemplos práticos de como usar a API para extrair informações de produtos.

## 🌐 Usando via Frontend Web

1. Acesse <http://localhost:3000>
2. Clique na área de upload ou arraste uma imagem
3. Clique em "Processar Imagem"
4. Veja os resultados na tela

## 📡 Usando via cURL

### Exemplo básico

```bash
curl -X POST \
  -F "image=@produto.jpg" \
  http://localhost:3000/api/extract-product
```

### Com análise detalhada

```bash
curl -X POST \
  -F "image=@produto.jpg" \
  "http://localhost:3000/api/extract-product?detailed=true"
```

### Resposta esperada

```json
{
  "status": "sucesso",
  "mensagem": "Informações do produto extraídas com sucesso",
  "dados": {
    "nome": "iPhone 15 Pro",
    "marca": "Apple",
    "preco": "R$ 8.299,00"
  },
  "processado_em": "2025-01-05T15:30:45.123Z"
}
```

## 🐍 Usando via Python

```python
import requests

def extrair_produto(caminho_imagem, detalhado=False):
    url = "http://localhost:3000/api/extract-product"
    
    if detalhado:
        url += "?detailed=true"
    
    with open(caminho_imagem, 'rb') as f:
        files = {'image': f}
        response = requests.post(url, files=files)
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Erro: {response.status_code} - {response.text}")

# Uso
resultado = extrair_produto("produto.jpg")
print(f"Nome: {resultado['dados']['nome']}")
print(f"Marca: {resultado['dados']['marca']}")
print(f"Preço: {resultado['dados']['preco']}")
```

## 🟨 Usando via JavaScript/Node.js

```javascript
import FormData from 'form-data';
import fs from 'fs';
import fetch from 'node-fetch';

async function extrairProduto(caminhoImagem, detalhado = false) {
  const formData = new FormData();
  formData.append('image', fs.createReadStream(caminhoImagem));
  
  const url = `http://localhost:3000/api/extract-product${detalhado ? '?detailed=true' : ''}`;
  
  const response = await fetch(url, {
    method: 'POST',
    body: formData
  });
  
  if (!response.ok) {
    throw new Error(`Erro: ${response.status} - ${await response.text()}`);
  }
  
  return await response.json();
}

// Uso
try {
  const resultado = await extrairProduto('produto.jpg');
  console.log('Nome:', resultado.dados.nome);
  console.log('Marca:', resultado.dados.marca);
  console.log('Preço:', resultado.dados.preco);
} catch (error) {
  console.error('Erro:', error.message);
}
```

## 🆕 NOVO: Processamento de Múltiplos Produtos (Catálogos)

A partir da versão 2.0, a API suporta extração de múltiplos produtos de uma única imagem, ideal para:

### ✅ Tipos de imagem suportados para catálogos:
- Panfletos de supermercado
- Catálogos promocionais  
- Prateleiras com vários produtos
- Displays de lojas
- Folhetos com ofertas
- Páginas de e-commerce

## 📡 Novos Endpoints para Catálogos

### `POST /api/extract-catalog`

Endpoint dedicado para extração de múltiplos produtos.

**Parâmetros:**
- `image` (file): Arquivo de imagem (máx. 5MB)
- `detailed` (query, optional): boolean para análise mais detalhada

### `POST /api/extract-product?catalog=true`

Endpoint unificado com modo catálogo ativado.

**Parâmetros:**
- `image` (file): Arquivo de imagem (máx. 5MB)
- `catalog=true` (query): ativa modo catálogo
- `detailed` (query, optional): boolean para análise mais detalhada

### Resposta para catálogos:

```json
{
  "status": "sucesso",
  "mensagem": "3 produto(s) extraído(s) com sucesso",
  "dados": {
    "produtos": [
      {
        "nome": "Arroz Integral 1kg",
        "marca": "Tio João",
        "preco": "R$ 4,99"
      },
      {
        "nome": "Feijão Preto 500g", 
        "marca": "Camil",
        "preco": "R$ 3,49"
      },
      {
        "nome": "Óleo de Soja 900ml",
        "marca": "Soya",
        "preco": "R$ 5,99"
      }
    ],
    "total_produtos": 3
  },
  "processado_em": "2025-01-05T15:30:45.123Z"
}
```

## 🧪 Exemplos de Uso para Catálogos

### Via cURL

```bash
# Extração de catálogo básica
curl -X POST -F "image=@catalogo-supermercado.jpg" \
  http://localhost:3000/api/extract-catalog

# Extração de catálogo detalhada
curl -X POST -F "image=@panfleto-ofertas.jpg" \
  "http://localhost:3000/api/extract-catalog?detailed=true"

# Usando endpoint unificado
curl -X POST -F "image=@prateleira-produtos.jpg" \
  "http://localhost:3000/api/extract-product?catalog=true"
```

### Via Frontend Web

1. Acesse http://localhost:3000
2. Marque a opção "Modo catálogo (múltiplos produtos)"
3. Faça o upload da imagem
4. Veja todos os produtos extraídos em cards organizados

### Via JavaScript/Node.js

```javascript
async function extrairCatalogo(caminhoImagem, detalhado = false) {
  const formData = new FormData();
  formData.append('image', fs.createReadStream(caminhoImagem));
  
  const url = `http://localhost:3000/api/extract-catalog${detalhado ? '?detailed=true' : ''}`;
  
  const response = await fetch(url, {
    method: 'POST',
    body: formData
  });
  
  if (!response.ok) {
    throw new Error(`Erro: ${response.status}`);
  }
  
  const resultado = await response.json();
  
  console.log(`✅ ${resultado.dados.total_produtos} produtos encontrados:`);
  resultado.dados.produtos.forEach((produto, index) => {
    console.log(`${index + 1}. ${produto.nome} - ${produto.marca} - ${produto.preco}`);
  });
  
  return resultado;
}

// Uso
await extrairCatalogo('catalogo-supermercado.jpg', true);
```

### Via Python

```python
import requests

def extrair_catalogo(caminho_imagem, detalhado=False):
    url = "http://localhost:3000/api/extract-catalog"
    
    if detalhado:
        url += "?detailed=true"
    
    with open(caminho_imagem, 'rb') as f:
        files = {'image': f}
        response = requests.post(url, files=files)
    
    if response.status_code == 200:
        resultado = response.json()
        produtos = resultado['dados']['produtos']
        
        print(f"✅ {len(produtos)} produtos encontrados:")
        for i, produto in enumerate(produtos, 1):
            print(f"{i}. {produto['nome']} - {produto['marca']} - {produto['preco']}")
        
        return resultado
    else:
        raise Exception(f"Erro: {response.status_code} - {response.text}")

# Uso
extrair_catalogo("catalogo.jpg", detalhado=True)
```

## 🔍 Tipos de Imagem que Funcionam Bem

### ✅ Melhores resultados

- Produtos com embalagens claras
- Texto bem visível e legível
- Etiquetas de preço nítidas
- Boa iluminação
- Resolução adequada (não muito baixa)

### ⚠️ Resultados variáveis

- Produtos sem embalagem
- Texto muito pequeno ou borrado
- Imagens muito escuras
- Produtos artesanais sem marca definida

### ❌ Não funcionam

- Imagens completamente borradas
- Produtos sem nenhum texto visível
- Arquivos corrompidos
- Formatos não suportados

## 🎯 Dicas para Melhores Resultados

1. **Qualidade da imagem**: Use imagens com resolução adequada (não muito baixa)

2. **Enquadramento**: Foque no produto, evitando muito ruído visual

3. **Iluminação**: Imagens bem iluminadas produzem melhores resultados

4. **Texto visível**: Certifique-se de que rótulos e etiquetas estão legíveis

5. **Formato**: JPEG e PNG geralmente produzem melhores resultados que WebP

6. **Tamanho**: Imagens entre 500KB e 2MB costumam ter bom desempenho

7. **Análise detalhada**: Use o parâmetro `detailed=true` para produtos difíceis

## 🚨 Tratamento de Erros

### Erros comuns e soluções

```json
{
  "status": "erro",
  "mensagem": "Nenhuma imagem foi enviada"
}
```

**Solução**: Inclua o campo `image` no FormData

```json
{
  "status": "erro", 
  "mensagem": "Arquivo muito grande. Tamanho máximo: 5MB"
}
```

**Solução**: Redimensione ou comprima a imagem

```json
{
  "status": "erro",
  "mensagem": "Tipo de arquivo não suportado. Use: JPEG, PNG ou WebP"
}
```

**Solução**: Converta a imagem para um formato suportado

```json
{
  "status": "erro",
  "mensagem": "Erro no serviço de análise de imagem"
}
```

**Solução**: Verifique a chave da API do Gemini e conexão com internet

## 🧪 Script de Teste Atualizado

```bash
# Testar modo catálogo
node test-api.js ./catalogo.jpg --catalog

# Testar produto único
node test-api.js ./produto.jpg

# Apenas verificar API
node test-api.js
```
