'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderIcon, 
  DocumentIcon, 
  ArrowDownTrayIcon, 
  EyeIcon,
  CodeBracketIcon,
  ChartBarIcon,
  PlayIcon 
} from '@heroicons/react/24/outline';

interface ProjectFile {
  path: string;
  content: string;
  size: number;
  lines: number;
}

interface ProjectStats {
  totalFiles: number;
  totalMarkers: number;
  totalBytes: number;
  errors: Array<{ line: number; message: string }>;
}

interface ProjectExtractorProps {
  projectFile: string;
  projectName: string;
  description?: string;
}

export default function ProjectExtractor({ projectFile, projectName, description }: ProjectExtractorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [projectData, setProjectData] = useState<{
    stats: ProjectStats;
    files: ProjectFile[];
  } | null>(null);
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [extractionMode, setExtractionMode] = useState<'preview' | 'download'>('preview');

  const extractProject = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/extract-project?project=${projectFile}`);
      const data = await response.json();
      
      if (data.success) {
        setProjectData(data);
        setSelectedFile(data.files[0] || null);
      } else {
        console.error('Extraction failed:', data.error);
      }
    } catch (error) {
      console.error('Error extracting project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadProject = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/extract-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectFile, format: 'zip' })
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${projectName}.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const isFolder = filename.includes('/') && !filename.split('/').pop()?.includes('.');
    
    if (isFolder) return <FolderIcon className="w-4 h-4 text-blue-500" />;
    if (['js', 'ts', 'jsx', 'tsx'].includes(ext || '')) return <CodeBracketIcon className="w-4 h-4 text-yellow-500" />;
    return <DocumentIcon className="w-4 h-4 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  const buildFileTree = (files: ProjectFile[]) => {
    const tree: any = {};
    
    files.forEach(file => {
      const parts = file.path.split('/');
      let current = tree;
      
      parts.forEach((part, index) => {
        if (!current[part]) {
          current[part] = index === parts.length - 1 ? file : {};
        }
        current = current[part];
      });
    });
    
    return tree;
  };

  const renderFileTree = (tree: any, level = 0): React.ReactElement[] => {
    return Object.entries(tree).map(([name, value]: [string, any]) => {
      const isFile = value.path;
      const key = `${level}-${name}`;
      
      return (
        <motion.div
          key={key}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: level * 0.1 }}
          className={`ml-${level * 4}`}
        >
          <div
            className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
              selectedFile?.path === value.path ? 'bg-blue-100 dark:bg-blue-900' : ''
            }`}
            onClick={() => isFile && setSelectedFile(value)}
          >
            {getFileIcon(name)}
            <span className="text-sm">{name}</span>
            {isFile && (
              <span className="text-xs text-gray-500 ml-auto">
                {formatFileSize(value.size)}
              </span>
            )}
          </div>
          {!isFile && renderFileTree(value, level + 1)}
        </motion.div>
      );
    });
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">{projectName}</h3>
            {description && <p className="text-sm opacity-90">{description}</p>}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowStats(!showStats)}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              title="Ver Estatísticas"
            >
              <ChartBarIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Panel */}
      <AnimatePresence>
        {showStats && projectData && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gray-50 dark:bg-gray-800 p-4 border-b"
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{projectData.stats.totalFiles}</div>
                <div className="text-sm text-gray-600">Arquivos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{formatFileSize(projectData.stats.totalBytes)}</div>
                <div className="text-sm text-gray-600">Tamanho</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{projectData.stats.totalMarkers}</div>
                <div className="text-sm text-gray-600">Marcadores</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="p-4 border-b bg-gray-50 dark:bg-gray-800">
        <div className="flex gap-2 flex-wrap">
          {!projectData ? (
            <button
              onClick={extractProject}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <PlayIcon className="w-4 h-4" />
              )}
              {isLoading ? 'Extraindo...' : 'Extrair Projeto'}
            </button>
          ) : (
            <>
              <button
                onClick={() => setExtractionMode('preview')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  extractionMode === 'preview' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <EyeIcon className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={downloadProject}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <ArrowDownTrayIcon className="w-4 h-4" />
                )}
                Download ZIP
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      {projectData && (
        <div className="grid grid-cols-1 md:grid-cols-3 h-96">
          {/* File Tree */}
          <div className="border-r bg-gray-50 dark:bg-gray-800 overflow-y-auto">
            <div className="p-3 border-b bg-gray-100 dark:bg-gray-700">
              <h4 className="font-semibold text-sm">Estrutura do Projeto</h4>
            </div>
            <div className="p-2">
              {renderFileTree(buildFileTree(projectData.files))}
            </div>
          </div>

          {/* File Content */}
          <div className="col-span-2 flex flex-col">
            {selectedFile ? (
              <>
                <div className="p-3 border-b bg-gray-100 dark:bg-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getFileIcon(selectedFile.path)}
                    <span className="font-mono text-sm">{selectedFile.path}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {selectedFile.lines} linhas • {formatFileSize(selectedFile.size)}
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <pre className="p-4 text-xs font-mono bg-gray-900 text-gray-100 h-full overflow-auto">
                    <code>{selectedFile.content}</code>
                  </pre>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <DocumentIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Selecione um arquivo para visualizar</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
