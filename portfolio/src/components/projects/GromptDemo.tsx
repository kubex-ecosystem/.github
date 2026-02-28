'use client';

import 'react-toastify/dist/ReactToastify.css';

interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  category: string;
}

const promptTemplates: PromptTemplate[] = [
  {
    id: 'code-review',
    name: 'Code Review Expert',
    description: 'Analisa código e fornece feedback detalhado',
    category: 'development',
    template: `You are an expert code reviewer with extensive experience in software development. 

Your task is to review the following code and provide comprehensive feedback:

**Code to Review:**
[PASTE_CODE_HERE]

**Please analyze:**
1. Code quality and best practices
2. Potential bugs or security issues
3. Performance considerations
4. Readability and maintainability
5. Suggestions for improvement

**Format your response as:**
- **Overall Assessment:** [Brief summary]
- **Strengths:** [What the code does well]
- **Issues Found:** [Problems identified]
- **Recommendations:** [Specific improvements]
- **Code Suggestions:** [Better implementations if needed]

Be constructive, specific, and explain your reasoning for each point.`
  },
  {
    id: 'business-analyst',
    name: 'Business Strategy Analyst',
    description: 'Analisa estratégias de negócio e mercado',
    category: 'business',
    template: `You are a senior business strategy analyst with expertise in market analysis, competitive intelligence, and strategic planning.

**Analysis Request:**
[DESCRIBE_BUSINESS_SCENARIO_HERE]

**Please provide analysis on:**
1. Market opportunity assessment
2. Competitive landscape
3. SWOT analysis
4. Risk factors
5. Strategic recommendations

**Deliverables:**
- **Executive Summary:** [Key findings in 2-3 sentences]
- **Market Analysis:** [Size, trends, opportunities]
- **Competitive Analysis:** [Key players, positioning]
- **SWOT Matrix:** [Strengths, Weaknesses, Opportunities, Threats]
- **Strategic Recommendations:** [3-5 actionable recommendations]
- **Implementation Timeline:** [Phased approach]

Use data-driven insights and industry best practices to support your analysis.`
  },
  {
    id: 'creative-writer',
    name: 'Creative Content Writer',
    description: 'Cria conteúdo criativo e envolvente',
    category: 'content',
    template: `You are a creative content writer with a talent for storytelling, brand voice development, and audience engagement.

**Content Brief:**
- **Topic:** [CONTENT_TOPIC_HERE]
- **Target Audience:** [AUDIENCE_DESCRIPTION]
- **Tone:** [PROFESSIONAL/CASUAL/HUMOROUS/INSPIRING]
- **Content Type:** [BLOG POST/SOCIAL MEDIA/EMAIL/ARTICLE]
- **Word Count:** [TARGET_LENGTH]

**Requirements:**
1. Compelling headline that grabs attention
2. Engaging introduction that hooks the reader
3. Well-structured body with clear sections
4. Strong call-to-action
5. SEO-friendly approach

**Deliverables:**
- **Headlines:** [3-5 headline options]
- **Content:** [Full content piece]
- **Key Messages:** [Main takeaways]
- **CTA Suggestions:** [Call-to-action options]
- **Social Media Snippets:** [Shareable excerpts]

Make it engaging, valuable, and perfectly aligned with the brand voice.`
  }
];

const categories = [
  { id: 'all', name: 'Todos', icon: '🔗' },
  { id: 'development', name: 'Desenvolvimento', icon: '💻' },
  { id: 'business', name: 'Negócios', icon: '📊' },
  { id: 'content', name: 'Conteúdo', icon: '✍️' },
  { id: 'analysis', name: 'Análise', icon: '🔍' }
];

// export default function GromptDemo() {
//   const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [customPrompt, setCustomPrompt] = useState('');
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [generatedPrompt, setGeneratedPrompt] = useState('');
//   const [variables, setVariables] = useState<Record<string, string>>({});

//   const filteredTemplates = selectedCategory === 'all' 
//     ? promptTemplates 
//     : promptTemplates.filter(t => t.category === selectedCategory);

//   const extractVariables = (template: string) => {
//     const matches = template.match(/\[([A-Z_]+)\]/g);
//     if (!matches) return {};
    
//     const vars: Record<string, string> = {};
//     matches.forEach(match => {
//       const varName = match.slice(1, -1);
//       vars[varName] = '';
//     });
//     return vars;
//   };

//   const generatePrompt = () => {
//     if (!selectedTemplate) return;
    
//     setIsGenerating(true);
    
//     setTimeout(() => {
//       let result = selectedTemplate.template;
      
//       // Replace variables with user input
//       Object.entries(variables).forEach(([key, value]) => {
//         result = result.replace(new RegExp(`\\[${key}\\]`, 'g'), value || `[${key}]`);
//       });
      
//       setGeneratedPrompt(result);
//       setIsGenerating(false);
//       toast.success('Prompt gerado com sucesso!');
//     }, 1500);
//   };

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text);
//     toast.success('Prompt copiado para área de transferência!');
//   };

//   const downloadPrompt = (text: string) => {
//     const blob = new Blob([text], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `grompt-${selectedTemplate?.id || 'custom'}-${Date.now()}.txt`;
//     a.click();
//     URL.revokeObjectURL(url);
//     toast.success('Prompt baixado com sucesso!');
//   };

//   const resetAll = () => {
//     setSelectedTemplate(null);
//     setCustomPrompt('');
//     setGeneratedPrompt('');
//     setVariables({});
//     toast.info('Formulário resetado!');
//   };

//   useEffect(() => {
//     if (selectedTemplate) {
//       setVariables(extractVariables(selectedTemplate.template));
//     }
//   }, [selectedTemplate]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//       />
      
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-7xl mx-auto"
//       >
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
//             <Wand2 className="w-12 h-12 text-purple-400" />
//             Grompt Demo
//           </h1>
//           <p className="text-lg text-gray-300 max-w-3xl mx-auto">
//             Gerador de prompts profissionais para modelos de IA. Esta é uma versão demonstrativa 
//             integrada ao portfólio - sem backend Go.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Sidebar - Templates */}
//           <div className="lg:col-span-1">
//             <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 sticky top-6">
//               <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//                 <Lightbulb className="w-5 h-5 text-yellow-400" />
//                 Templates
//               </h2>
              
//               {/* Category Filter */}
//               <div className="mb-4">
//                 <div className="flex flex-wrap gap-2">
//                   {categories.map(cat => (
//                     <button
//                       key={cat.id}
//                       onClick={() => setSelectedCategory(cat.id)}
//                       className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
//                         selectedCategory === cat.id
//                           ? 'bg-purple-600 text-white'
//                           : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                       }`}
//                     >
//                       {cat.icon} {cat.name}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Templates List */}
//               <div className="space-y-3 max-h-96 overflow-y-auto">
//                 {filteredTemplates.map(template => (
//                   <motion.button
//                     key={template.id}
//                     onClick={() => setSelectedTemplate(template)}
//                     className={`w-full text-left p-4 rounded-lg border transition-all ${
//                       selectedTemplate?.id === template.id
//                         ? 'bg-purple-600/20 border-purple-500 text-white'
//                         : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700'
//                     }`}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     <div className="font-semibold mb-1">{template.name}</div>
//                     <div className="text-sm opacity-75">{template.description}</div>
//                   </motion.button>
//                 ))}
//               </div>

//               <div className="mt-4 pt-4 border-t border-gray-600">
//                 <button
//                   onClick={resetAll}
//                   className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
//                 >
//                   <RotateCcw className="w-4 h-4" />
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Template Preview & Variables */}
//             {selectedTemplate && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
//               >
//                 <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//                   <Settings className="w-5 h-5 text-blue-400" />
//                   {selectedTemplate.name}
//                 </h3>

//                 {/* Variables Input */}
//                 {Object.keys(variables).length > 0 && (
//                   <div className="mb-6">
//                     <h4 className="text-lg font-semibold text-white mb-3">Preencha as variáveis:</h4>
//                     <div className="grid gap-4">
//                       {Object.entries(variables).map(([key, value]) => (
//                         <div key={key}>
//                           <label className="block text-sm font-medium text-gray-300 mb-1">
//                             {key.replace(/_/g, ' ').toLowerCase()}
//                           </label>
//                           <textarea
//                             value={value}
//                             onChange={(e) => setVariables(prev => ({ ...prev, [key]: e.target.value }))}
//                             className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white resize-none"
//                             rows={2}
//                             placeholder={`Digite ${key.replace(/_/g, ' ').toLowerCase()}...`}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Generate Button */}
//                 <button
//                   onClick={generatePrompt}
//                   disabled={isGenerating}
//                   className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
//                 >
//                   {isGenerating ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Gerando...
//                     </>
//                   ) : (
//                     <>
//                       <Wand2 className="w-5 h-5" />
//                       Gerar Prompt
//                     </>
//                   )}
//                 </button>
//               </motion.div>
//             )}

//             {/* Generated Prompt */}
//             {generatedPrompt && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
//               >
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-xl font-bold text-white">Prompt Gerado</h3>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => copyToClipboard(generatedPrompt)}
//                       className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
//                     >
//                       <Copy className="w-4 h-4" />
//                       Copiar
//                     </button>
//                     <button
//                       onClick={() => downloadPrompt(generatedPrompt)}
//                       className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
//                     >
//                       <Download className="w-4 h-4" />
//                       Baixar
//                     </button>
//                   </div>
//                 </div>

//                 <div className="relative">
//                   <CodeMirror
//                     value={generatedPrompt}
//                     onChange={setGeneratedPrompt}
//                     extensions={[javascript()]}
//                     theme={oneDark}
//                     basicSetup={{
//                       lineNumbers: true,
//                       foldGutter: true,
//                       dropCursor: false,
//                       allowMultipleSelections: false,
//                     }}
//                     className="text-sm"
//                   />
//                 </div>
//               </motion.div>
//             )}

//             {/* Usage Instructions */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30"
//             >
//               <h3 className="text-lg font-bold text-white mb-3">💡 Como usar:</h3>
//               <div className="space-y-2 text-gray-300">
//                 <p>1. <strong>Selecione um template</strong> na barra lateral ou crie seu próprio prompt</p>
//                 <p>2. <strong>Preencha as variáveis</strong> com informações específicas do seu contexto</p>
//                 <p>3. <strong>Gere o prompt</strong> e copie para usar em Claude, ChatGPT ou outros modelos</p>
//                 <p>4. <strong>Baixe o prompt</strong> para salvar e reutilizar posteriormente</p>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
