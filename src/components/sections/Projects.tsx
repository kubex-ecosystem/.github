'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Calendar, Star } from 'lucide-react';
import { ProjectCategory } from '../../types';
import { projects } from '../../data/projects';
import { ProjectFilter } from '../../components/common/ProjectFilter';
import { Card, CardContent, Button } from '../../components/ui';
import { fadeInUp, staggerContainer } from '../../lib/animations';

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of my recent work spanning various technologies and industries
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                <Card className="h-full overflow-hidden group">
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        project.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : project.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {project.status === 'completed' ? 'Completed' : project.status === 'in-progress' ? 'In Progress' : 'Planned'}
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded-full text-xs font-medium">
                          <Star size={12} fill="currentColor" />
                          Featured
                        </div>
                      </div>
                    )}

                    {/* Overlay Links */}
                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.github && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => window.open(project.github, '_blank')}
                        >
                          <Github size={16} className="mr-2" />
                          Code
                        </Button>
                      )}
                      {project.demo && (
                        <Button
                          size="sm"
                          onClick={() => window.open(project.demo, '_blank')}
                        >
                          <ExternalLink size={16} className="mr-2" />
                          Demo
                        </Button>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech: unknown, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                        >
                          {((tech || '') as string).toUpperCase()}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {project.github && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(project.github, '_blank')}
                          className="flex-1"
                        >
                          <Github size={16} className="mr-2" />
                          Code
                        </Button>
                      )}
                      {project.demo && (
                        <Button
                          size="sm"
                          onClick={() => window.open(project.demo, '_blank')}
                          className="flex-1"
                        >
                          <ExternalLink size={16} className="mr-2" />
                          Demo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Show More Button */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No projects found for this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
