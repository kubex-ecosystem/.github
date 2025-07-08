#!/bin/bash

echo "🚀 Configurando Gemini Image Processor..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale Node.js 18+ primeiro."
    exit 1
fi

# Verificar versão do Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js versão 18+ é necessária. Versão atual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) encontrado"

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Configurar arquivo .env se não existir
if [ ! -f ".env" ]; then
    echo "⚙️ Configurando arquivo .env..."
    cp .env.example .env
    echo ""
    echo "🔑 IMPORTANTE: Configure sua GEMINI_API_KEY no arquivo .env"
    echo "   1. Abra o arquivo .env"
    echo "   2. Substitua 'your_gemini_api_key_here' pela sua chave real"
    echo "   3. Salve o arquivo"
    echo ""
    read -p "Pressione Enter após configurar a chave da API..."
fi

# Criar diretórios necessários
mkdir -p logs
mkdir -p temp

echo "🏁 Configuração concluída!"
echo ""
echo "📋 Próximos passos:"
echo "   1. Configure sua GEMINI_API_KEY no arquivo .env (se ainda não fez)"
echo "   2. Execute: npm run dev"
echo "   3. Acesse: http://localhost:3000"
echo ""
echo "🧪 Para testar a API:"
echo "   node test-api.js ./caminho/para/uma/imagem.jpg"
echo ""
echo "📚 Documentação:"
echo "   http://localhost:3000/api/docs"
