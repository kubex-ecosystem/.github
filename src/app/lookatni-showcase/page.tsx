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
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            LookAtni Showcase - Em Construção
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Layout com navegação superior implementado com sucesso!
          </p>
        </div>
      </div>
    </div>
  );
}
