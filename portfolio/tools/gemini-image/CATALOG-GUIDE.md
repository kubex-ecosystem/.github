# Guia Rápido: Modo Catálogo

## 🚀 Como usar o novo modo catálogo

### 1. Via Frontend (Mais Fácil)
- Acesse: http://localhost:3000
- Marque: "Modo catálogo (múltiplos produtos)"  
- Upload da imagem
- Veja os resultados organizados em cards

### 2. Via API Direta

**Endpoint dedicado:**
```bash
curl -X POST -F "image=@catalogo.jpg" http://localhost:3000/api/extract-catalog
```

**Endpoint unificado:**
```bash
curl -X POST -F "image=@catalogo.jpg" "http://localhost:3000/api/extract-product?catalog=true"
```

**Com análise detalhada:**
```bash
curl -X POST -F "image=@catalogo.jpg" "http://localhost:3000/api/extract-catalog?detailed=true"
```

### 3. Via Script de Teste
```bash
# Testar catálogo
node test-api.js ./catalogo.jpg --catalog

# Testar produto único  
node test-api.js ./produto.jpg
```

## 🎯 Tipos de Imagem Ideais

### ✅ Funciona bem:
- Panfletos de supermercado
- Catálogos promocionais
- Prateleiras organizadas
- Folhetos com ofertas
- Displays de produtos

### ⚠️ Pode ter limitações:
- Mais de 15 produtos
- Produtos muito pequenos
- Texto ilegível
- Qualidade muito baixa

## 📊 Formato da Resposta

```json
{
  "status": "sucesso",
  "mensagem": "X produto(s) extraído(s) com sucesso",
  "dados": {
    "produtos": [
      {
        "nome": "Nome do Produto",
        "marca": "Marca",
        "preco": "R$ XX,XX"
      }
    ],
    "total_produtos": X
  },
  "processado_em": "2025-01-05T15:30:45.123Z"
}
```

## 🔧 Parâmetros Disponíveis

- `catalog=true` - Ativa modo catálogo
- `detailed=true` - Análise mais detalhada (mais lenta)
- Ambos podem ser combinados

## 🏁 Início Rápido

1. **Configure a API**: Adicione `GEMINI_API_KEY` no `.env`
2. **Inicie o servidor**: `npm run dev`  
3. **Teste rapidamente**: Acesse http://localhost:3000
4. **Marque "Modo catálogo"** e faça upload de uma imagem com múltiplos produtos

Pronto! A API vai extrair todos os produtos automaticamente! 🎉
