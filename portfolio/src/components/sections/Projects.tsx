'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Download, ExternalLink, Github, Star } from 'lucide-react';
import { useState } from 'react';
import { ProjectFilter } from '../../components/common/ProjectFilter';
import { projects } from '../../data/projects';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import { ProjectCategory } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { ProjectCard } from '../projects/ProjectCard';

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
                <ProjectCard
                  project={project}
                  isPt={isPt}
                  getStatusLabel={getStatusLabel}
                  downloadLookatniFile={downloadLookatniFile}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}