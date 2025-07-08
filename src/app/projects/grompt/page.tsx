'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Zap, Cpu, Globe, Code, Play } from 'lucide-react';
import GromptDemo from '../../../components/projects/GromptDemo';

export default function GromptPage() {
  const [showDemo, setShowDemo] = useState(false);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Prompts Profissionais",
      description: "Gere prompts otimizados para Claude, ChatGPT e outros modelos de IA"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Embarcado em Go",
      description: "Frontend React compilado estaticamente dentro de um binário Go"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Interface Moderna",
      description: "UI responsiva e intuitiva criada com React"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Open Source",
      description: "Código aberto e disponível para a comunidade"
    }
  ];

  const techStack = [
    { name: "React 19", color: "bg-blue-500" },
    { name: "Go (Golang)", color: "bg-cyan-500" },
    { name: "JavaScript", color: "bg-yellow-500" },
    { name: "HTML5/CSS3", color: "bg-orange-500" },
    { name: "i18next", color: "bg-green-500" },
    { name: "Lucide Icons", color: "bg-purple-500" }
  ];

  if (showDemo) {
    return <GromptDemo />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
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
            ⚡ Grompt
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-6">
            Gerador de prompts profissionais para modelos de IA. Frontend React embarcado 
            em binário Go, proporcionando uma aplicação completa e portável.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowDemo(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Demo Interativo
            </button>
            
            <a
              href="https://github.com/rafa-mori/grompt"
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
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
            >
              <div className="text-blue-400 mb-3">{feature.icon}</div>
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
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">🛠️ Stack Tecnológica</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => (
              <motion.span
                key={tech.name}
                className={`px-4 py-2 ${tech.color} text-white rounded-full font-medium text-sm`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
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
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {/* About */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">📖 Sobre o Projeto</h3>
            <div className="space-y-3 text-gray-300">
              <p>
                O Grompt é uma ferramenta inovadora que combina a flexibilidade do React 
                com a portabilidade do Go. O frontend é compilado estaticamente e embarcado 
                diretamente no binário Go.
              </p>
              <p>
                Esta arquitetura única permite distribuir a aplicação como um único arquivo 
                executável, sem necessidade de Node.js ou dependências externas.
              </p>
              <p>
                O projeto foi desenvolvido para gerar prompts otimizados para diferentes 
                modelos de IA, facilitando o trabalho de prompt engineering.
              </p>
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">🔧 Detalhes Técnicos</h3>
            <div className="space-y-3 text-gray-300">
              <div>
                <strong className="text-white">Frontend:</strong> React com react-scripts
              </div>
              <div>
                <strong className="text-white">Backend:</strong> Go (Golang) com servidor HTTP embarcado
              </div>
              <div>
                <strong className="text-white">Build:</strong> React build estático compilado no Go
              </div>
              <div>
                <strong className="text-white">Distribuição:</strong> Binário único e portável
              </div>
              <div>
                <strong className="text-white">Internacionalização:</strong> Suporte a múltiplos idiomas
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
