'use client';

import { motion } from 'framer-motion';
import { Brain, Camera, Code, FileText, Github, Play } from 'lucide-react';
import { useState } from 'react';
import GeminiImageDemo from '../../../components/projects/GeminiImageDemo';

export default function GeminiImagePage() {
  const [showDemo, setShowDemo] = useState(false);

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "IA do Google Gemini",
      description: "Utiliza o modelo Gemini Vision para análise avançada de imagens"
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Processamento Inteligente",
      description: "Extrai informações estruturadas de produtos em imagens"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Parse Avançado",
      description: "Converte descrições livres em dados estruturados JSON"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "API RESTful",
      description: "Interface simples e intuitiva para integração"
    }
  ];

  const techStack = [
    { name: "Google Gemini Vision", color: "bg-blue-500" },
    { name: "Node.js", color: "bg-green-500" },
    { name: "Express.js", color: "bg-gray-700" },
    { name: "React", color: "bg-cyan-500" },
    { name: "Multer", color: "bg-orange-500" },
    { name: "Joi Validation", color: "bg-purple-500" }
  ];

  if (showDemo) {
    return <GeminiImageDemo />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-8"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🤖 Gemini Image Processor
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-6">
            Processador de imagens inteligente que utiliza o Google Gemini Vision para extrair
            informações estruturadas de produtos. Desenvolvido como desafio técnico para vaga de emprego.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowDemo(true)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Demo Interativo
            </button>

            <a
              href="https://github.com/kubex-ecosystem/gemini-image-processor"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-emerald-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
            >
              <div className="text-emerald-400 mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-gray-700 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">🛠️ Stack Tecnológica</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => (
              <motion.span
                key={tech.name}
                className={`px-4 py-2 ${tech.color} text-white rounded-full font-medium text-sm`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.3 }}
              >
                {tech.name}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Project Details */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          {/* About */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">📖 Sobre o Projeto</h3>
            <div className="space-y-3 text-gray-300">
              <p>
                O Gemini Image Processor foi desenvolvido como um desafio técnico para uma vaga de emprego.
                O objetivo era criar uma solução que processasse imagens de produtos e extraísse informações estruturadas.
              </p>
              <p>
                O maior desafio foi desenvolver um parser robusto capaz de interpretar as respostas variadas
                do modelo Gemini e convertê-las em dados estruturados consistentes.
              </p>
              <p>
                A aplicação demonstra integração com APIs de IA generativa e técnicas avançadas de
                processamento de linguagem natural.
              </p>
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">🔧 Detalhes Técnicos</h3>
            <div className="space-y-3 text-gray-300">
              <div>
                <strong className="text-white">IA:</strong> Google Gemini Vision API
              </div>
              <div>
                <strong className="text-white">Backend:</strong> Node.js com Express
              </div>
              <div>
                <strong className="text-white">Upload:</strong> Multer para processamento de arquivos
              </div>
              <div>
                <strong className="text-white">Validação:</strong> Joi para validação de dados
              </div>
              <div>
                <strong className="text-white">Frontend:</strong> React com interface moderna
              </div>
              <div>
                <strong className="text-white">Deploy:</strong> Preparado para containerização
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
