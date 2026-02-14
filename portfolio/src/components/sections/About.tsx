'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cloud, Wrench, Award, Users, Coffee, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui';
import { skills } from '../../data/skills';
import { personalInfo } from '../../data/personal';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '../../lib/animations';
import { useLanguage } from '../../context/LanguageContext';

export function About() {
  const { t, language } = useLanguage();
  const isPt = language === 'pt';

  const skillCategories = [
    { id: 'language', label: isPt ? 'Linguagens' : 'Languages', icon: Code, color: 'text-primary-glow' },
    { id: 'framework', label: isPt ? 'Frameworks' : 'Frameworks', icon: Database, color: 'text-secondary-glow' },
    { id: 'cloud', label: isPt ? 'Nuvem & DevOps' : 'Cloud & DevOps', icon: Cloud, color: 'text-tertiary-glow' },
    { id: 'tool', label: isPt ? 'Ferramentas' : 'Tools', icon: Wrench, color: 'text-slate-400' },
    { id: 'database', label: isPt ? 'Bancos de Dados' : 'Databases', icon: Database, color: 'text-secondary-glow' },
  ];

  const stats = [
    { icon: Award, label: t('about.stats.experience'), value: `${((personalInfo.statistics || {}).yearsOfExperience || '0')}+` },
    { icon: Code, label: t('about.stats.projects'), value: `${((personalInfo.statistics || {}).projectsCompleted || '0')}+` },
    { icon: Users, label: t('about.stats.clients'), value: `${((personalInfo.statistics || {}).happyClients || '0')}+` },
    { icon: Coffee, label: t('about.stats.coffee'), value: `${((personalInfo.statistics || {}).coffeeConsumed || '0')}` },
  ];

  const services = [
    {
      icon: Code,
      title: t('about.services.frontend.title'),
      description: t('about.services.frontend.description'),
      accent: 'primary-glow'
    },
    {
      icon: Database,
      title: t('about.services.backend.title'),
      description: t('about.services.backend.description'),
      accent: 'secondary-glow'
    },
    {
      icon: Cloud,
      title: t('about.services.cloud.title'),
      description: t('about.services.cloud.description'),
      accent: 'tertiary-glow'
    },
    {
      icon: Zap,
      title: t('about.services.optimization.title'),
      description: t('about.services.optimization.description'),
      accent: 'slate-400'
    }
  ];

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const getSkillIcon = (iconName: string) => {
    return `https://skillicons.dev/icons?i=${iconName}`;
  };

  const journeyData = isPt ? personalInfo.journeyPt : personalInfo.journey;

  return (
    <motion.section
      id="about"
      className="py-24 bg-bg-base relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
            {t('about.title')}
          </h2>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto font-normal">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="text-center h-full border-white/10 bg-surface/30">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 border border-primary-glow/30 bg-primary-glow/10 rounded-xl mb-4 text-primary-glow">
                    <stat.icon size={24} />
                  </div>
                  <div className="text-3xl font-black mb-1 tracking-tight text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-slate-300">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <motion.div
            variants={slideInLeft}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 tracking-tight text-white">
              <span className="h-1 w-8 bg-primary-glow rounded-full"></span>
              {t('about.journey')}
            </h3>
            <div className="space-y-6 text-slate-200 font-normal leading-relaxed">
              {journeyData?.map((item, index) => (
                <p key={index} className="text-lg">
                  {item}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 tracking-tight text-white">
              <span className="h-1 w-8 bg-secondary-glow rounded-full"></span>
              {t('about.whatIDo')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {services.map((service, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-xl border border-white/10 bg-surface/20 group hover:border-white/20 transition-colors">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 border border-${service.accent}/30 bg-${service.accent}/10 rounded-lg flex items-center justify-center text-${service.accent}`}>
                      <service.icon size={20} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 tracking-tight text-white">
                      {service.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
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
          <h3 className="text-3xl font-black mb-12 text-center tracking-tighter">
            {t('about.techStack')}
          </h3>
          
          <div className="space-y-6">
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
                  <Card className="border-white/5 bg-surface/20">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-lg font-bold tracking-tight">
                        <Icon className={`w-5 h-5 ${category.color}`} />
                        {category.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {categorySkills.map((skill, index) => (
                          <motion.div
                            key={index}
                            className="flex flex-col items-center gap-2 p-3 rounded-lg border border-white/5 bg-surface/40 hover:border-primary-glow/30 transition-all duration-300 group"
                            whileHover={{ y: -2 }}
                          >
                            {skill.icon && (
                              <img
                                src={getSkillIcon(skill.icon)}
                                alt={skill.name}
                                className="w-8 h-8 grayscale group-hover:grayscale-0 transition-all"
                              />
                            )}
                            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 group-hover:text-slate-300 transition-colors">
                              {skill.name}
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