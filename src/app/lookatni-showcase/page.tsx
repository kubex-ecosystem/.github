'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectExtractor from '../../components/ProjectExtractor';
import AICodePlayground from '../../components/AICodePlayground';
import WasmPowerDemo from '../../components/WasmPowerDemo';
import { 
  RocketLaunchIcon, 
  CodeBracketIcon, 
  SparklesIcon,
  DocumentTextIcon 
} from '@heroicons/react/24/outline';

interface ProjectFile {
  name: string;
  displayName: string;
  description: string;
  language: string;
  framework: string;
}

export default function LookAtniShowcase() {
  const [activeTab, setActiveTab] = useState<'projects' | 'playground' | 'wasm'>('projects');
  const [projects, setProjects] = useState<ProjectFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento dos projetos
    // Na prática, você pode fazer uma API call para listar os arquivos .txt
    const mockProjects: ProjectFile[] = [
      {
        name: 'lookatni-gdbase.txt',
        displayName: 'GDBase - Database System',
        description: 'Sistema completo de banco de dados desenvolvido em Go com funcionalidades avançadas',
        language: 'Go',
        framework: 'Gin + GORM'
      },
      {
        name: 'lookatni-gobe.txt',
        displayName: 'Gobe - Web Framework',
        description: 'Framework web minimalista e eficiente desenvolvido em Go',
        language: 'Go',
        framework: 'Pure Go'
      },
      {
        name: 'lookatni-gocrafter.txt',
        displayName: 'GoCrafter - Project Generator',
        description: 'Gerador de projetos Go com templates e configurações automáticas',
        language: 'Go',
        framework: 'CLI'
      },
      {
        name: 'lookatni-goforge.txt',
        displayName: 'GoForge - Build System',
        description: 'Sistema de build e deploy automatizado para aplicações Go',
        language: 'Go',
        framework: 'CI/CD'
      },
      {
        name: 'lookatni-logz.txt',
        displayName: 'Logz - Logging System',
        description: 'Sistema de logging estruturado e escalável',
        language: 'Go',
        framework: 'Microservices'
      },
      {
        name: 'lookatni-mini_games.txt',
        displayName: 'Mini Games Collection',
        description: 'Coleção de mini jogos desenvolvidos em diferentes linguagens',
        language: 'Multiple',
        framework: 'Game Engines'
      },
      {
        name: 'lookatni-xtui.txt',
        displayName: 'XTUI - Terminal UI',
        description: 'Interface de usuário para terminal com componentes reutilizáveis',
        language: 'Go',
        framework: 'TUI'
      }
    ];
    
    setTimeout(() => {
      setProjects(mockProjects);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      'Go': 'bg-blue-100 text-blue-800',
      'Multiple': 'bg-purple-100 text-purple-800',
      'JavaScript': 'bg-yellow-100 text-yellow-800',
      'TypeScript': 'bg-blue-100 text-blue-800'
    };
    return colors[language] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <RocketLaunchIcon className="w-10 h-10 text-blue-600" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  LookAtni File Markers
                </h1>
                <RocketLaunchIcon className="w-10 h-10 text-blue-600" />
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                O primeiro portfólio do mundo com <strong>extração interativa de projetos</strong>. 
                Explore projetos reais, extraia código AI, e veja a revolução em ação!
              </p>
            </motion.div>

            {/* Tabs */}
            <div className="mt-8 flex justify-center">
              <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
                    activeTab === 'projects'
                      ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  <DocumentTextIcon className="w-5 h-5" />
                  Projetos Interativos
                </button>
                <button
                  onClick={() => setActiveTab('playground')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
                    activeTab === 'playground'
                      ? 'bg-white dark:bg-gray-700 text-purple-600 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  <SparklesIcon className="w-5 h-5" />
                  AI Code Playground
                </button>
                <button
                  onClick={() => setActiveTab('wasm')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
                    activeTab === 'wasm'
                      ? 'bg-white dark:bg-gray-700 text-orange-600 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  <CodeBracketIcon className="w-5 h-5" />
                  🦀 WASM Power
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'projects' ? (
          <div className="space-y-8">
            {/* Projects Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  🚀 Projetos Extraíveis em Tempo Real
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Cada projeto abaixo é um arquivo real com marcadores invisíveis. 
                  Clique em qualquer um para explorar a estrutura completa e baixar o código!
                </p>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border h-96">
                        <div className="h-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-t-lg"></div>
                        <div className="p-6 space-y-4">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                          <div className="space-y-2">
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                    >
                      <ProjectExtractor
                        projectFile={project.name}
                        projectName={project.displayName}
                        description={project.description}
                      />
                      
                      {/* Project Meta Info */}
                      <div className="p-4 border-t bg-gray-50 dark:bg-gray-700/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLanguageColor(project.language)}`}>
                              {project.language}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {project.framework}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <CodeBracketIcon className="w-3 h-3" />
                            Extraível
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Features Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                🌟 Primeira Demonstração Interativa do Mundo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🚀</div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Extração em Tempo Real</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Veja estruturas completas de projetos sendo extraídas ao vivo
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📦</div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Download Instantâneo</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Baixe projetos completos em ZIP com um clique
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🔍</div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Exploração Completa</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Navegue por arquivos, veja conteúdo e estatísticas
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        ) : activeTab === 'playground' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <AICodePlayground />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <WasmPowerDemo />
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white dark:bg-gray-900 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Feito com ❤️ por <a href="https://rafa-mori.dev" className="text-blue-600 hover:text-blue-700">Rafa Mori</a>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Usando LookAtni File Markers - A revolução da organização de código
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
