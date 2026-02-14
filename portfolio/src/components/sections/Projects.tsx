'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Download, ExternalLink, Github, Star } from 'lucide-react';
import { useState } from 'react';
import { ProjectFilter } from '../../components/common/ProjectFilter';
import { Card, CardContent } from '../../components/ui';
import { projects } from '../../data/projects';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import { ProjectCategory } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

export function Projects() {
  const { t, language } = useLanguage();
  const isPt = language === 'pt';
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const downloadLookatniFile = async (filename: string) => {
    try {
      const response = await fetch(`/projects/${filename}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error('Erro ao baixar arquivo:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao baixar arquivo:', error);
    }
  };

  const getStatusLabel = (status: string) => {
    if (isPt) {
      switch (status) {
        case 'completed': return 'Concluído';
        case 'in-progress': return 'Em Andamento';
        default: return 'Planejado';
      }
    }
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      default: return 'Planned';
    }
  };

  return (
    <section id="projects" className="py-24 bg-bg-base w-full relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
            {t('projects.title')}
          </h2>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto font-normal">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Project Filters */}
        <ProjectFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                layout
              >
                <Card className="h-full overflow-hidden group border-white/10 bg-surface/30">
                  {/* Project Image */}
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-base/90 via-bg-base/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded border font-bold ${
                        project.status === 'completed' 
                          ? 'border-secondary-glow/50 bg-secondary-glow/20 text-secondary-glow'
                          : project.status === 'in-progress'
                          ? 'border-tertiary-glow/50 bg-tertiary-glow/20 text-tertiary-glow'
                          : 'border-slate-600 bg-slate-800/80 text-slate-200'
                      }`}>
                        {getStatusLabel(project.status)}
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-1 border border-primary-glow/50 bg-primary-glow/20 text-primary-glow px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold">
                          <Star size={10} fill="currentColor" />
                          {isPt ? 'Destaque' : 'Featured'}
                        </div>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 tracking-tight text-white">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 text-sm mb-4 line-clamp-3 font-normal leading-relaxed">
                      {isPt && project.descriptionPt ? project.descriptionPt : project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 4).map((tech: unknown, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 text-[10px] font-mono border border-white/10 bg-white/5 text-slate-300 rounded transition-colors group-hover:border-primary-glow/40 font-medium"
                        >
                          {((tech || '') as string).toUpperCase()}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {project.github && (
                        <button
                          onClick={() => window.open(project.github, '_blank')}
                          className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-mono uppercase tracking-widest border border-white/10 hover:border-primary-glow/50 hover:bg-primary-glow/5 transition-all duration-300 rounded"
                        >
                          <Github size={14} />
                          {isPt ? 'Código' : 'Source'}
                        </button>
                      )}
                      {(project.demo || project.lookatniFile) && (
                        <button
                          onClick={() => project.demo ? window.open(project.demo, '_blank') : downloadLookatniFile(project.lookatniFile!)}
                          className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-mono uppercase tracking-widest bg-primary-glow hover:bg-primary-glow/90 text-white transition-all duration-300 rounded"
                        >
                          {project.demo ? <ExternalLink size={14} /> : <Download size={14} />}
                          {project.demo ? 'Live' : 'Spec'}
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}