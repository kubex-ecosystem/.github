'use client';

import { motion } from 'framer-motion';
import { ProjectCategory } from '../../types';
import { projectCategories } from '../../data/projects';
import { 
  Code, 
  Database, 
  Smartphone, 
  Globe, 
  Server, 
  Wrench, 
  BarChart3, 
  Terminal, 
  Gamepad2, 
  Brain, 
  Package, 
  Star,
  FolderOpen 
} from 'lucide-react';

interface ProjectFilterProps {
  activeFilter: ProjectCategory;
  onFilterChange: (filter: ProjectCategory) => void;
}

const categoryIcons = {
  all: Globe,
  frontend: Code,
  fullstack: Database,
  mobile: Smartphone,
  backend: Server,
  devops: Wrench,
  'data-science': BarChart3,
  devtools: Terminal,
  'game-development': Gamepad2,
  'ai-ml': Brain,
  'tools-libraries': Package,
  featured: Star,
  other: FolderOpen,
};

export function ProjectFilter({ activeFilter, onFilterChange }: ProjectFilterProps) {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-4 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {projectCategories.map((category) => {
        // Fallback para ícones não encontrados
        const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || FolderOpen;
        const isActive = activeFilter === category.id;

        return (
          <motion.button
            key={category.id}
            onClick={() => onFilterChange(category.id as ProjectCategory)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconComponent size={16} />
            <span>{category.label}</span>
            {category.count > 0 && (
              <span className={`text-xs px-2 py-1 rounded-full ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {category.count}
              </span>
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}