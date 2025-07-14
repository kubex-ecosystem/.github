'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ProjectExtractor from '../../components/ProjectExtractor';
import AICodePlayground from '../../components/AICodePlayground';
import WasmPowerDemo from '../../components/WasmPowerDemo';
import { 
  RocketLaunchIcon, 
  CodeBracketIcon, 
  SparklesIcon,
  DocumentTextIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

interface ProjectFile {
  name: string;
  displayName: string;
  description: string;
  language: string;
  framework: string;
}

export default function LookatniShowcase() {
  const [activeTab, setActiveTab] = useState<'projects' | 'playground' | 'wasm'>('projects');
  const [projects, setProjects] = useState<ProjectFile[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectFile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      'Go': 'bg-blue-100 text-blue-800',
      'Multiple': 'bg-purple-100 text-purple-800',
      'JavaScript': 'bg-yellow-100 text-yellow-800',
      'TypeScript': 'bg-blue-100 text-blue-800'
    };
    return colors[language] || 'bg-gray-100 text-gray-800';
  };

  useEffect(() => {
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
        name: 'lookatni-xtui.txt',
        displayName: 'XTUI - UI Framework',
        description: 'Framework de interface de usuário para aplicações core/terminais/CLI, com conexão em DB, extração de dados e mais',
        language: 'Go',
        framework: 'Pure Go'
      },
      {
        name: 'lookatni-gdbase.txt',
        displayName: 'GDBase - Modular: DB, Models & Services',
        description: 'Solução de gerenciamento de bancos, serviços e modelos de dados desenvolvida em Go, projetada para ser modular, escalável e automática. Permite configuração zero, mas suporta customizações avançadas via arquivos de configuração, CLI e SDK.',
        language: 'Go',
        framework: 'Gin + GORM'
      }
    ];
    
    setTimeout(() => {
      setProjects(mockProjects);
      setSelectedProject(mockProjects[0]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Top Navigation Bar */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="flex items-center space-x-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <HomeIcon className="h-5 w-5" />
                <span className="font-medium">Portfólio</span>
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                LookAtni Showcase
              </h1>
            </div>

            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setActiveTab('projects')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'projects'
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <DocumentTextIcon className="h-4 w-4" />
                <span>Projetos Interativos</span>
              </button>
              <button
                onClick={() => setActiveTab('playground')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'playground'
                    ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <SparklesIcon className="h-4 w-4" />
                <span>AI Playground</span>
              </button>
              <button
                onClick={() => setActiveTab('wasm')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'wasm'
                    ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <RocketLaunchIcon className="h-4 w-4" />
                <span>WASM Power</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
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
                🌟 Entre as Primeiras Demonstrações Interativas do Mundo
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
