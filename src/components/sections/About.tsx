'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cloud, Wrench, Award, Users, Coffee, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui';
import { skills } from '../../data/skills';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '../../lib/animations';

const skillCategories = [
  { id: 'language', label: 'Languages', icon: Code, color: 'from-blue-500 to-blue-600' },
  { id: 'framework', label: 'Frameworks', icon: Database, color: 'from-green-500 to-green-600' },
  { id: 'cloud', label: 'Cloud & DevOps', icon: Cloud, color: 'from-purple-500 to-purple-600' },
  { id: 'tool', label: 'Tools', icon: Wrench, color: 'from-orange-500 to-orange-600' },
  { id: 'database', label: 'Databases', icon: Database, color: 'from-red-500 to-red-600' },
];

const stats = [
  { icon: Award, label: 'Years Experience', value: '5+' },
  { icon: Code, label: 'Projects Completed', value: '50+' },
  { icon: Users, label: 'Happy Clients', value: '30+' },
  { icon: Coffee, label: 'Coffee Consumed', value: '∞' },
];

export function About() {
  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const getSkillIcon = (iconName: string) => {
    // Em um projeto real, você usaria um mapeamento de ícones
    return `https://skillicons.dev/icons?i=${iconName}`;
  };

  return (
    <motion.section
      id="about"
      className="py-20 bg-white dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Passionate developer with a love for creating efficient, scalable solutions
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="text-center h-full">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-4">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            variants={slideInLeft}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              My Journey
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                I started my journey in technology at a young age, developing a passion for 
                programming and problem-solving. Over the years, I have honed my skills in 
                various programming languages and frameworks.
              </p>
              <p>
                My expertise spans across full-stack development, cloud architecture, and 
                DevOps practices. I enjoy working on all aspects of the software development 
                lifecycle, from planning and design to deployment and maintenance.
              </p>
              <p>
                I believe in continuous learning and staying up-to-date with the latest 
                technologies. My goal is to create efficient, user-friendly applications 
                that make a positive impact.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              What I Do
            </h3>
            <div className="space-y-4">
              {[
                {
                  icon: Code,
                  title: 'Frontend Development',
                  description: 'Creating responsive, interactive user interfaces with React, Next.js, and modern CSS frameworks.'
                },
                {
                  icon: Database,
                  title: 'Backend Development',
                  description: 'Building robust APIs and server-side applications with Node.js, Python, and Go.'
                },
                {
                  icon: Cloud,
                  title: 'Cloud & DevOps',
                  description: 'Implementing scalable cloud solutions and CI/CD pipelines with AWS, Docker, and Kubernetes.'
                },
                {
                  icon: Zap,
                  title: 'Performance Optimization',
                  description: 'Optimizing applications for speed, scalability, and excellent user experience.'
                }
              ].map((service, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <service.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {service.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Technical Skills
          </h3>
          
          <div className="space-y-8">
            {skillCategories.map((category) => {
              const categorySkills = getSkillsByCategory(category.id);
              if (categorySkills.length === 0) return null;

              const Icon = category.icon;

              return (
                <motion.div
                  key={category.id}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className={`w-8 h-8 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        {category.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categorySkills.map((skill, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                            whileHover={{ scale: 1.05 }}
                          >
                            {skill.icon && (
                              <img
                                src={getSkillIcon(skill.icon)}
                                alt={skill.name}
                                className="w-6 h-6"
                              />
                            )}
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {skill.name}
                              </div>
                              <div className="flex gap-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full ${
                                      i < skill.level
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                                        : 'bg-gray-300 dark:bg-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}