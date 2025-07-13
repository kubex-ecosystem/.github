import React, { useState, useEffect } from 'react';
import { Settings, Key, Wand2, Copy, Download, X, Lightbulb, Code, Briefcase, FileText, BarChart } from 'lucide-react';

const promptTemplates = [
  {
    id: 'code-review',
    name: 'Code Review Expert',
    description: 'Analisa código e fornece feedback detalhado',
    category: 'Desenvolvimento',
    template: 'Analise este código {linguagem} e forneça feedback sobre: performance, segurança, legibilidade e melhores práticas.\n\nCódigo:\n{codigo}\n\nFoco especial em: {foco_analise}',
    variables: ['linguagem', 'codigo', 'foco_analise']
  },
  {
    id: 'business-strategy',
    name: 'Business Strategy Analyst',
    description: 'Analisa estratégias de negócio e mercado',
    category: 'Negócios',
    template: 'Desenvolva uma análise estratégica para {empresa} no setor {setor}. Inclua análise de mercado, concorrência, oportunidades e riscos. Período de análise: {periodo}',
    variables: ['empresa', 'setor', 'periodo']
  },
  {
    id: 'content-writer',
    name: 'Creative Content Writer',
    description: 'Cria conteúdo criativo e envolvente',
    category: 'Conteúdo',
    template: 'Crie um conteúdo {tipo_conteudo} sobre {topico} para {publico_alvo}. Tom: {tom}. Objetivo: {objetivo}. Tamanho aproximado: {tamanho}',
    variables: ['tipo_conteudo', 'topico', 'publico_alvo', 'tom', 'objetivo', 'tamanho']
  },
  {
    id: 'data-analyst',
    name: 'Data Analysis Expert',
    description: 'Analisa dados e gera insights',
    category: 'Análise',
    template: 'Analise os seguintes dados sobre {dataset_contexto}:\n\n{dados}\n\nForneca insights sobre: tendências, padrões, anomalias e recomendações estratégicas.',
    variables: ['dataset_contexto', 'dados']
  },
  {
    id: 'product-manager',
    name: 'Product Manager Pro',
    description: 'Estratégias de produto e roadmap',
    category: 'Negócios',
    template: 'Como Product Manager, desenvolva uma estratégia para {produto} considerando {contexto_mercado}. Inclua roadmap, métricas de sucesso e análise competitiva.',
    variables: ['produto', 'contexto_mercado']
  },
  {
    id: 'tech-writer',
    name: 'Technical Documentation',
    description: 'Documentação técnica clara e precisa',
    category: 'Desenvolvimento',
    template: 'Crie documentação técnica para {funcionalidade}. Stack: {tecnologias}. Inclua: setup, uso, exemplos práticos e troubleshooting.',
    variables: ['funcionalidade', 'tecnologias']
  }
];

const categories = [
  { id: 'all', name: 'Todos', icon: Wand2 },
  { id: 'Desenvolvimento', name: 'Desenvolvimento', icon: Code },
  { id: 'Negócios', name: 'Negócios', icon: Briefcase },
  { id: 'Conteúdo', name: 'Conteúdo', icon: FileText },
  { id: 'Análise', name: 'Análise', icon: BarChart }
];

export default function GromptDemo() {
  const [showApiModal, setShowApiModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState(promptTemplates[0]);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    claude: '',
    gemini: '',
    groq: ''
  });

  // Carrega configurações salvas
  useEffect(() => {
    const saved = localStorage.getItem('grompt-config');
    if (saved) {
      const config = JSON.parse(saved);
      setApiKeys(config.apiKeys || {});
    }
  }, []);

  const saveConfig = () => {
    localStorage.setItem('grompt-config', JSON.stringify({ apiKeys }));
    setShowApiModal(false);
  };

  const filteredTemplates = selectedCategory === 'all' 
    ? promptTemplates 
    : promptTemplates.filter(t => t.category === selectedCategory);

  const generatePrompt = () => {
    let result = selectedTemplate.template;
    Object.entries(inputs).forEach(([key, value]) => {
      result = result.replace(new RegExp(`{${key}}`, 'g'), String(value) || `[${key}]`);
    });
    setGeneratedPrompt(result);
  };

  const resetForm = () => {
    setInputs({});
    setGeneratedPrompt('');
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
  };

  const downloadPrompt = () => {
    const blob = new Blob([generatedPrompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplate.name}.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <Wand2 className="h-8 w-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Grompt Demo</h1>
        </div>
        
        <button
          onClick={() => setShowApiModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 text-white rounded-lg hover:bg-slate-700/50 transition-colors border border-slate-600/30"
        >
          <Settings className="h-4 w-4" />
          Configurações
        </button>
      </header>

      <div className="px-6 pb-6">
        <p className="text-slate-300 text-center mb-8 max-w-2xl mx-auto">
          Gerador de prompts profissionais para modelos de IA. Esta é uma versão demonstrativa 
          integrada ao portfólio - sem backend Go.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          
          {/* Sidebar Templates */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-600/20">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
                <h2 className="text-xl font-semibold text-white">Templates</h2>
              </div>

              {/* Filtros de categoria */}
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map(category => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                      {category.name}
                    </button>
                  );
                })}
              </div>

              {/* Lista de templates */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredTemplates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setSelectedTemplate(template);
                      setInputs({});
                      setGeneratedPrompt('');
                    }}
                    className={`w-full text-left p-4 rounded-lg transition-all border ${
                      selectedTemplate.id === template.id
                        ? 'bg-purple-600/20 border-purple-500/50 text-white'
                        : 'bg-slate-700/30 border-slate-600/20 text-slate-300 hover:bg-slate-600/30'
                    }`}
                  >
                    <h3 className="font-medium mb-1">{template.name}</h3>
                    <p className="text-sm opacity-75">{template.description}</p>
                  </button>
                ))}
              </div>

              <button
                onClick={resetForm}
                className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Como usar */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-600/20">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
                <h2 className="text-xl font-semibold text-white">Como usar:</h2>
              </div>
              
              <ol className="text-slate-300 space-y-2">
                <li><strong className="text-white">1. Selecione um template</strong> na barra lateral ou crie seu próprio prompt</li>
                <li><strong className="text-white">2. Preencha as variáveis</strong> com informações específicas do seu contexto</li>
                <li><strong className="text-white">3. Gere o prompt</strong> e copie para usar em Claude, ChatGPT ou outros modelos</li>
                <li><strong className="text-white">4. Baixe o prompt</strong> para salvar e reutilizar posteriormente</li>
              </ol>
            </div>

            {/* Formulário de inputs */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-600/20">
              <h3 className="text-lg font-semibold text-white mb-4">{selectedTemplate.name}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {selectedTemplate.variables.map(variable => (
                  <div key={variable}>
                    <label className="block text-sm font-medium text-slate-300 mb-2 capitalize">
                      {variable.replace(/_/g, ' ')}
                    </label>
                    <input
                      type="text"
                      value={(inputs || { [variable]: '' })[variable] || ''}
                      onChange={(e) => setInputs(prev => ({
                        ...prev,
                        [variable]: e.target.value
                      }))}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder={`Digite ${variable.replace(/_/g, ' ')}`}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={generatePrompt}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium"
              >
                Gerar Prompt
              </button>
            </div>

            {/* Resultado */}
            {generatedPrompt && (
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-600/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Prompt Gerado</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={copyPrompt}
                      className="flex items-center gap-2 px-3 py-1.5 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors border border-green-500/30"
                    >
                      <Copy className="h-4 w-4" />
                      Copiar
                    </button>
                    <button
                      onClick={downloadPrompt}
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors border border-blue-500/30"
                    >
                      <Download className="h-4 w-4" />
                      Baixar
                    </button>
                  </div>
                </div>
                
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600/20">
                  <pre className="text-slate-200 whitespace-pre-wrap text-sm leading-relaxed">
                    {generatedPrompt}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de configuração de API */}
      {showApiModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl max-w-md w-full p-6 border border-slate-600/30">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Key className="h-5 w-5" />
                Configurar API Keys
              </h2>
              <button
                type="button"
                aria-label="Fechar modal"
                name='api-modal-close'
                onClick={() => setShowApiModal(false)}
                className="p-1 hover:bg-slate-700/50 rounded text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {Object.entries(apiKeys).map(([provider, key]) => (
                <div key={provider}>
                  <label className="block text-sm font-medium text-slate-300 mb-2 capitalize">
                    {provider} API Key
                  </label>
                  <input
                    type="password"
                    value={key}
                    onChange={(e) => setApiKeys(prev => ({
                      ...prev,
                      [provider]: e.target.value
                    }))}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder={`Cole sua ${provider} API key`}
                  />
                </div>
              ))}
            </div>

            <div className="flex items-start gap-2 mt-4 p-3 bg-yellow-600/10 border border-yellow-500/20 rounded-lg">
              <Key className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-yellow-300">
                As chaves são armazenadas localmente no seu navegador e não são enviadas para servidores externos.
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowApiModal(false)}
                className="flex-1 px-4 py-2 border border-slate-600/30 rounded-lg text-slate-300 hover:bg-slate-700/30 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={saveConfig}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}