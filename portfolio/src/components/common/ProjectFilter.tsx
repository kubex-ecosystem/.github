'use client';

import { motion } from 'framer-motion';
import { ProjectCategory } from '../../types';
import { projectCategories } from '../../data/projects';
import { useLanguage } from '../../context/LanguageContext';
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
  const { language } = useLanguage();
  const isPt = language === 'pt';

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-3 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {projectCategories.map((category) => {
        // Fallback para ícones não encontrados
        const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || FolderOpen;
        const isActive = activeFilter === category.id;
        const label = isPt && (category as any).labelPt ? (category as any).labelPt : category.label;

        return (
          <motion.button
            key={category.id}
            onClick={() => onFilterChange(category.id as ProjectCategory)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-widest transition-all duration-300 border ${
              isActive
                ? 'bg-primary-glow border-primary-glow text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'bg-surface/30 border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconComponent size={14} />
            <span>{label}</span>
            {category.count > 0 && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'bg-white/5 text-slate-500'
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