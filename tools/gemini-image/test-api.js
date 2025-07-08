#!/usr/bin/env node

/**
 * Script de teste para a API Gemini Image Processor
 * 
 * Uso:
 * node test-api.js <caminho-para-imagem>
 * 
 * Exemplo:
 * node test-api.js ./exemplo-produto.jpg
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_BASE_URL = process.env.API_URL || 'http://localhost:3000/api';

async function testAPI() {
  console.log('🧪 Testando API Gemini Image Processor\n');
  
  // 1. Testar saúde da API
  console.log('1️⃣ Verificando saúde da API...');
  try {
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    
    if (healthResponse.ok) {
      console.log('✅ API está funcionando');
      console.log(`   Status: ${healthData.status}`);
      console.log(`   Timestamp: ${healthData.timestamp}\n`);
    } else {
      console.log('❌ API não está funcionando corretamente');
      return;
    }
  } catch (error) {
    console.log('❌ Erro ao conectar com a API');
    console.log(`   Erro: ${error.message}`);
    console.log(`   Verifique se a API está rodando em ${API_BASE_URL}\n`);
    return;
  }

  // 2. Testar com imagem se fornecida
  const imagePath = process.argv[2];
  
  if (!imagePath) {
    console.log('ℹ️  Para testar com uma imagem, forneça o caminho:');
    console.log('   node test-api.js ./caminho/para/sua/imagem.jpg\n');
    
    // Listar arquivos de exemplo se existirem
    const exampleDir = join(__dirname, 'examples');
    if (fs.existsSync(exampleDir)) {
      console.log('📁 Imagens de exemplo encontradas:');
      const files = fs.readdirSync(exampleDir).filter(f => 
        f.toLowerCase().match(/\.(jpg|jpeg|png|webp)$/)
      );
      files.forEach(file => console.log(`   ${join(exampleDir, file)}`));
    }
    return;
  }

  // Verificar se o arquivo existe
  if (!fs.existsSync(imagePath)) {
    console.log(`❌ Arquivo não encontrado: ${imagePath}`);
    return;
  }

  console.log(`2️⃣ Testando extração de produto com: ${imagePath}`);
  
  try {
    // Preparar FormData
    const imageBuffer = fs.readFileSync(imagePath);
    const formData = new FormData();
    
    // Detectar tipo MIME
    const ext = imagePath.toLowerCase().split('.').pop();
    const mimeTypes = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg', 
      'png': 'image/png',
      'webp': 'image/webp'
    };
    const mimeType = mimeTypes[ext] || 'image/jpeg';
    
    const blob = new Blob([imageBuffer], { type: mimeType });
    formData.append('image', blob, imagePath.split('/').pop());

    console.log(`   📤 Enviando imagem (${(imageBuffer.length / 1024).toFixed(1)} KB)...`);
    
    // Fazer requisição
    const startTime = Date.now();
    const response = await fetch(`${API_BASE_URL}/extract-product`, {
      method: 'POST',
      body: formData
    });
    
    const duration = Date.now() - startTime;
    const data = await response.json();
    
    console.log(`   ⏱️  Tempo de resposta: ${duration}ms\n`);
    
    if (response.ok && data.status === 'sucesso') {
      console.log('✅ Extração realizada com sucesso!');
      console.log('📋 Resultados:');
      console.log(`   📦 Nome: ${data.dados.nome}`);
      console.log(`   🏷️  Marca: ${data.dados.marca}`);
      console.log(`   💰 Preço: ${data.dados.preco}`);
      console.log(`   🕐 Processado em: ${data.processado_em}\n`);
      
      // Testar também com análise detalhada
      console.log('3️⃣ Testando com análise detalhada...');
      
      const detailedResponse = await fetch(`${API_BASE_URL}/extract-product?detailed=true`, {
        method: 'POST',
        body: formData
      });
      
      const detailedData = await detailedResponse.json();
      
      if (detailedResponse.ok && detailedData.status === 'sucesso') {
        console.log('✅ Análise detalhada concluída!');
        console.log('📋 Resultados detalhados:');
        console.log(`   📦 Nome: ${detailedData.dados.nome}`);
        console.log(`   🏷️  Marca: ${detailedData.dados.marca}`);
        console.log(`   💰 Preço: ${detailedData.dados.preco}\n`);
      } else {
        console.log('⚠️  Análise detalhada falhou');
        console.log(`   Erro: ${detailedData.mensagem}\n`);
      }
      
    } else {
      console.log('❌ Falha na extração');
      console.log(`   Status: ${data.status}`);
      console.log(`   Erro: ${data.mensagem}`);
      if (data.detalhes) {
        console.log(`   Detalhes: ${data.detalhes}`);
      }
    }
    
  } catch (error) {
    console.log('❌ Erro durante o teste');
    console.log(`   Erro: ${error.message}`);
  }

  // 3. Testar modo catálogo se solicitado
  const testCatalog = process.argv.includes('--catalog');
  
  if (imagePath && testCatalog) {
    console.log(`3️⃣ Testando modo catálogo com: ${imagePath}`);
    
    try {
      const imageBuffer = fs.readFileSync(imagePath);
      const formData = new FormData();
      
      const ext = imagePath.toLowerCase().split('.').pop();
      const mimeTypes = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg', 
        'png': 'image/png',
        'webp': 'image/webp'
      };
      const mimeType = mimeTypes[ext] || 'image/jpeg';
      
      const blob = new Blob([imageBuffer], { type: mimeType });
      formData.append('image', blob, imagePath.split('/').pop());

      console.log(`   📤 Enviando para extração de catálogo...`);
      
      const startTime = Date.now();
      const response = await fetch(`${API_BASE_URL}/extract-catalog`, {
        method: 'POST',
        body: formData
      });
      
      const duration = Date.now() - startTime;
      const data = await response.json();
      
      console.log(`   ⏱️  Tempo de resposta: ${duration}ms\n`);
      
      if (response.ok && data.status === 'sucesso') {
        console.log('✅ Extração de catálogo realizada com sucesso!');
        console.log(`📊 Total de produtos encontrados: ${data.dados.total_produtos}`);
        console.log('🛒 Produtos extraídos:');
        
        data.dados.produtos.forEach((produto, index) => {
          console.log(`   ${index + 1}. 📦 ${produto.nome} | 🏷️ ${produto.marca} | 💰 ${produto.preco}`);
        });
        
        console.log(`   🕐 Processado em: ${data.processado_em}\n`);
        
      } else {
        console.log('❌ Falha na extração de catálogo');
        console.log(`   Status: ${data.status}`);
        console.log(`   Erro: ${data.mensagem}`);
      }
      
    } catch (error) {
      console.log('❌ Erro durante o teste de catálogo');
      console.log(`   Erro: ${error.message}`);
    }
  }
}

// Executar testes
testAPI().catch(console.error);
