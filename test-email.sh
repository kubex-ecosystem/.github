#!/bin/bash

echo "🧪 Testando configuração do sistema de email..."
echo ""

# Verificar se o arquivo .env.local existe
if [ ! -f ".env.local" ]; then
    echo "❌ Arquivo .env.local não encontrado!"
    echo "💡 Crie o arquivo .env.local com sua RESEND_API_KEY"
    echo ""
    echo "Exemplo:"
    echo "RESEND_API_KEY=re_xxxxxxxxxx"
    exit 1
fi

# Verificar se a RESEND_API_KEY está definida
if ! grep -q "RESEND_API_KEY" .env.local; then
    echo "❌ RESEND_API_KEY não encontrada no .env.local!"
    echo "💡 Adicione sua API key do Resend no arquivo .env.local"
    exit 1
fi

echo "✅ Arquivo .env.local encontrado"
echo "✅ RESEND_API_KEY configurada"
echo ""

# Verificar se as dependências estão instaladas
if [ ! -d "node_modules/resend" ]; then
    echo "❌ Dependência 'resend' não encontrada!"
    echo "💡 Execute: npm install"
    exit 1
fi

echo "✅ Dependência Resend instalada"
echo ""

# Iniciar o servidor de desenvolvimento
echo "🚀 Iniciando servidor de desenvolvimento..."
echo "📱 Acesse: http://localhost:3000"
echo "📧 Teste o formulário de contato na seção 'Contact'"
echo ""
echo "Para parar o servidor: Ctrl+C"
echo ""

npm run dev
