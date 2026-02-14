'use client';

import {
  CodeBracketIcon,
  DocumentTextIcon,
  HomeIcon,
  RocketLaunchIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AICodePlayground from '../../components/AICodePlayground';
import ProjectExtractor from '../../components/ProjectExtractor';
import WasmPowerDemo from '../../components/WasmPowerDemo';

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
      'Go': 'border-tertiary-glow/30 bg-tertiary-glow/10 text-tertiary-glow',
      'Multiple': 'border-primary-glow/30 bg-primary-glow/10 text-primary-glow',
      'JavaScript': 'border-secondary-glow/30 bg-secondary-glow/10 text-secondary-glow',
      'TypeScript': 'border-tertiary-glow/30 bg-tertiary-glow/10 text-tertiary-glow'
    };
    return colors[language] || 'border-slate-700 bg-slate-800/50 text-slate-400';
  };

  useEffect(() => {
    const mockProjects: ProjectFile[] = [
      {
        name: 'lookatni-gdbase.latx',
        displayName: 'GDBase - Database System',
        description: 'Sistema completo de banco de dados desenvolvido em Go com funcionalidades avançadas',
        language: 'Go',
        framework: 'Gin + GORM'
      },
      {
        name: 'lookatni-gobe.latx',
        displayName: 'Gobe - Web Framework', 
        description: 'Framework web minimalista e eficiente desenvolvido em Go',
        language: 'Go',
        framework: 'Pure Go'
      },
      {
        name: 'lookatni-xtui.latx',
        displayName: 'XTUI - UI Framework',
        description: 'Framework de interface de usuário para aplicações core/terminais/CLI, com conexão em DB, extração de dados e mais',
        language: 'Go',
        framework: 'Pure Go'
      },
      {
        name: 'lookatni-gocrafter.latx',
        displayName: 'GoCrafter - Project Generator',
        description: 'Ferramenta completa para gerar projetos Go com templates predefinidos e scaffolding automático',
        language: 'Go',
        framework: 'Cobra CLI'
      },
      {
        name: 'lookatni-goforge.latx',
        displayName: 'GoForge - Build System',
        description: 'Sistema de build e deployment para aplicações Go com pipelines automatizados',
        language: 'Go',
        framework: 'Pure Go'
      },
      {
        name: 'lookatni-logz.latx',
        displayName: 'Logz - Logging System',
        description: 'Sistema de logging estruturado e centralizado para aplicações distribuídas',
        language: 'Go',
        framework: 'Pure Go'
      },
      {
        name: 'lookatni-goSetup.latx',
        displayName: 'GoSetup - Environment Manager',
        description: 'Gerenciador de ambiente e configuração para projetos Go',
        language: 'Go',
        framework: 'Pure Go'
      },
      {
        name: 'lookatni-mini_games.latx',
        displayName: 'Mini Games Collection',
        description: 'Coleção de mini jogos desenvolvidos em JavaScript com Canvas API',
        language: 'JavaScript',
        framework: 'Vanilla JS'
      }
    ];
    
    setTimeout(() => {
      setProjects(mockProjects);
      setSelectedProject(mockProjects[0]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-bg-base text-slate-300">
      {/* Top Navigation Bar */}
      <header className="bg-surface/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="flex items-center space-x-2 text-slate-300 hover:text-primary-glow transition-colors"
              >
                <HomeIcon className="h-5 w-5" />
                <span className="text-sm font-mono uppercase tracking-widest">Portfólio</span>
              </Link>
              <div className="h-6 w-px bg-white/10" />
              <h1 className="text-lg font-black tracking-tighter bg-gradient-to-r from-primary-glow to-tertiary-glow bg-clip-text text-transparent">
                LookAtni Showcase
              </h1>
            </div>

            <nav className="flex items-center space-x-2">
              {[
                { id: 'projects', label: 'Projetos', icon: DocumentTextIcon, accent: 'primary-glow' },
                { id: 'playground', label: 'AI Playground', icon: SparklesIcon, accent: 'secondary-glow' },
                { id: 'wasm', label: 'WASM Power', icon: RocketLaunchIcon, accent: 'tertiary-glow' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-[10px] font-mono uppercase tracking-widest transition-all ${
                    activeTab === tab.id
                      ? `bg-${tab.accent}/10 border border-${tab.accent}/20 text-${tab.accent} shadow-lg shadow-${tab.accent}/5`
                      : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none"></div>

        {activeTab === 'projects' ? (
          <div className="space-y-12 relative">
            {/* Section Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-4xl font-black mb-4 tracking-tighter">
                🚀 Projetos Extraíveis
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                Cada projeto abaixo é um arquivo real com marcadores invisíveis. 
                Clique em qualquer um para explorar a estrutura completa e baixar o código!
              </p>
            </motion.div>

            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-surface/30 border border-white/5 rounded-xl h-96"></div>
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
                    className="bg-surface/20 rounded-xl border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-300"
                  >
                    <ProjectExtractor
                      projectFile={project.name}
                      projectName={project.displayName}
                      description={project.description}
                    />
                    
                    {/* Project Meta Info */}
                    <div className="p-4 border-t border-white/5 bg-surface/40">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded border text-[10px] font-mono uppercase tracking-widest ${getLanguageColor(project.language)}`}>
                            {project.language}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                            {project.framework}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-slate-600">
                          <CodeBracketIcon className="w-3 h-3" />
                          Extraível
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Features Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-surface/30 border border-white/5 rounded-2xl p-12 text-center"
            >
              <h3 className="text-3xl font-black mb-6 tracking-tighter">
                🌟 Demonstrações Interativas Next-Gen
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                {[
                  { icon: '🚀', title: 'Extração Real-Time', desc: 'Veja estruturas completas de projetos sendo extraídas ao vivo' },
                  { icon: '📦', title: 'Download Instantâneo', desc: 'Baixe projetos completos em ZIP com um único clique' },
                  { icon: '🔍', title: 'Exploração Deep', desc: 'Navegue por arquivos, veja conteúdo e estatísticas detalhadas' }
                ].map((feature, i) => (
                  <div key={i} className="space-y-3 p-6 rounded-xl bg-surface/20 border border-white/5">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h4 className="font-bold text-white tracking-tight">{feature.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      {feature.desc}
                    </p>
                  </div>
                ))}
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
      <footer className="border-t border-white/5 mt-24 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-slate-400 font-light">
            Feito com ❤️ por <Link href="/" className="text-primary-glow hover:text-primary-glow/80 font-bold transition-colors">Rafa Mori</Link>
          </p>
          <div className="flex items-center justify-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-600">
            <span>Powered by LookAtni File Markers</span>
            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
            <span>2026 Edition</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
