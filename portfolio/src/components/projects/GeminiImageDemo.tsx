'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image, Brain, Camera, Zap, FileText, Star, Download, Copy, RotateCcw } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AnalysisResult {
  product: {
    name: string;
    category: string;
    description: string;
    features: string[];
    colors: string[];
    materials: string[];
    brand?: string;
    price_range?: string;
    condition?: string;
    confidence: number;
  };
  technical_specs?: {
    dimensions?: string;
    weight?: string;
    power?: string;
    connectivity?: string[];
  };
  marketing_insights?: {
    target_audience: string;
    selling_points: string[];
    competitive_advantages: string[];
  };
}

const mockResults: AnalysisResult[] = [
  {
    product: {
      name: "Smartphone Galaxy Pro",
      category: "Eletrônicos",
      description: "Smartphone premium com tela AMOLED de 6.7 polegadas, câmera tripla de 108MP e processador de última geração",
      features: ["Tela AMOLED 6.7\"", "Câmera 108MP", "5G", "Carregamento rápido 65W", "Resistente à água IP68"],
      colors: ["Preto", "Azul", "Dourado"],
      materials: ["Alumínio", "Vidro"],
      brand: "Galaxy",
      price_range: "R$ 2.500 - R$ 3.000",
      condition: "Novo",
      confidence: 0.95
    },
    technical_specs: {
      dimensions: "164.2 x 75.6 x 8.8 mm",
      weight: "195g",
      power: "Bateria 4500mAh",
      connectivity: ["5G", "Wi-Fi 6", "Bluetooth 5.2", "NFC"]
    },
    marketing_insights: {
      target_audience: "Profissionais e entusiastas de tecnologia",
      selling_points: ["Câmera profissional", "Performance excepcional", "Design premium"],
      competitive_advantages: ["Melhor custo-benefício", "Suporte técnico nacional", "Atualizações por 4 anos"]
    }
  },
  {
    product: {
      name: "Tênis Esportivo Running Pro",
      category: "Calçados",
      description: "Tênis para corrida com tecnologia de amortecimento avançado, solado antiderrapante e material respirável",
      features: ["Amortecimento Air Tech", "Solado antiderrapante", "Material respirável", "Palmilha removível"],
      colors: ["Branco/Azul", "Preto/Vermelho", "Cinza"],
      materials: ["Mesh", "EVA", "Borracha"],
      brand: "RunTech",
      price_range: "R$ 300 - R$ 450",
      condition: "Novo",
      confidence: 0.92
    },
    technical_specs: {
      weight: "280g (tamanho 42)",
      dimensions: "Numeração 38-45"
    },
    marketing_insights: {
      target_audience: "Corredores amadores e profissionais",
      selling_points: ["Conforto superior", "Durabilidade comprovada", "Tecnologia exclusiva"],
      competitive_advantages: ["Preço competitivo", "Garantia estendida", "Aprovado por atletas"]
    }
  }
];

export default function GeminiImageDemo() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Por favor, selecione apenas arquivos de imagem');
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Arquivo muito grande. Máximo 10MB');
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setResult(null);
      setAnalysisProgress(0);
      toast.success('Imagem carregada com sucesso!');
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate analysis with progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    
    setTimeout(() => {
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      
      // Select a random mock result
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(randomResult);
      setIsAnalyzing(false);
      toast.success('Análise concluída com sucesso!');
    }, 3000);
  };

  const exportResults = () => {
    if (!result) return;
    
    const exportData = {
      analysis_timestamp: new Date().toISOString(),
      image_name: selectedFile?.name || 'unknown',
      ...result
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gemini-analysis-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Resultados exportados com sucesso!');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copiado para área de transferência!');
  };

  const clearAll = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setResult(null);
    setAnalysisProgress(0);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    toast.info('Dados limpos!');
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 p-6">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Brain className="w-12 h-12 text-emerald-400" />
            Gemini Image Demo
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Demonstração do processador de imagens com Google Gemini Vision. 
            Esta versão usa dados mock para demonstrar a funcionalidade.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-emerald-400" />
                Upload de Imagem
              </h2>
              
              {!selectedFile ? (
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300 mb-4">Selecione uma imagem de produto para análise</p>
                  <p className="text-sm text-gray-500 mb-4">Suporta: JPG, PNG, WEBP (máx. 10MB)</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors inline-block"
                  >
                    Selecionar Imagem
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full max-h-64 object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-white text-sm">{selectedFile.name}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Analisando...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          Analisar
                        </>
                      )}
                    </button>
                    <button
                      onClick={clearAll}
                      title="Limpar dados"
                      className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  {isAnalyzing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-300">
                        <span>Processando com Gemini Vision...</span>
                        <span>{Math.round(analysisProgress)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${analysisProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-gradient-to-r from-emerald-900/20 to-green-900/20 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/30">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                💡 Como funciona
              </h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>• <strong>Upload:</strong> Selecione uma imagem clara do produto</p>
                <p>• <strong>Análise:</strong> O Gemini Vision extrai informações detalhadas</p>
                <p>• <strong>Parse:</strong> Os dados são estruturados automaticamente</p>
                <p>• <strong>Export:</strong> Baixe os resultados em formato JSON</p>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-emerald-400" />
                  Resultado da Análise
                </h2>
                {result && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      Copiar
                    </button>
                    <button
                      onClick={exportResults}
                      className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      Export
                    </button>
                  </div>
                )}
              </div>
              
              {!result ? (
                <div className="text-center text-gray-400 py-12">
                  <Image className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Selecione uma imagem e clique em "Analisar" para ver os resultados</p>
                </div>
              ) : (
                <div className="space-y-6 max-h-96 overflow-y-auto">
                  {/* Product Info */}
                  <div className="bg-emerald-900/30 p-4 rounded-lg border border-emerald-700/50">
                    <h3 className="font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Produto Identificado
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Nome:</span>
                        <p className="text-white font-medium">{result.product.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Categoria:</span>
                        <p className="text-white font-medium">{result.product.category}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Confiança:</span>
                        <p className="text-white font-medium">{(result.product.confidence * 100).toFixed(1)}%</p>
                      </div>
                      {result.product.brand && (
                        <div>
                          <span className="text-gray-400">Marca:</span>
                          <p className="text-white font-medium">{result.product.brand}</p>
                        </div>
                      )}
                    </div>
                    <div className="mt-3">
                      <span className="text-gray-400">Descrição:</span>
                      <p className="text-gray-300 text-sm mt-1">{result.product.description}</p>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700/50">
                    <h3 className="font-semibold text-blue-400 mb-3">Características</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {result.product.features.map((feature, index) => (
                        <div key={index} className="text-gray-300 text-sm flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Specs */}
                  {result.technical_specs && (
                    <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-700/50">
                      <h3 className="font-semibold text-purple-400 mb-3">Especificações Técnicas</h3>
                      <div className="space-y-2">
                        {Object.entries(result.technical_specs).map(([key, value]) => (
                          <div key={key} className="text-sm">
                            <span className="text-gray-400 capitalize">{key.replace('_', ' ')}:</span>
                            <span className="text-gray-300 ml-2">
                              {Array.isArray(value) ? value.join(', ') : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Marketing Insights */}
                  {result.marketing_insights && (
                    <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-700/50">
                      <h3 className="font-semibold text-orange-400 mb-3">Insights de Marketing</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-gray-400 text-sm">Público-alvo:</span>
                          <p className="text-gray-300 text-sm">{result.marketing_insights.target_audience}</p>
                        </div>
                        <div>
                          <span className="text-gray-400 text-sm">Pontos de venda:</span>
                          <ul className="mt-1 space-y-1">
                            {result.marketing_insights.selling_points.map((point, index) => (
                              <li key={index} className="text-gray-300 text-sm flex items-center gap-2">
                                <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
