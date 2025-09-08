'use client';

import { motion } from 'framer-motion';
import { Mail, Download, ExternalLink, Github, Linkedin } from 'lucide-react';
import { Button } from '../ui';
import { personalInfo } from '../../data/personal';
import { fadeInUp, staggerContainer, scaleIn } from '../../lib/animations';
import { useLanguage } from '../../context/LanguageContext';

export function Hero() {
  const { t, language } = useLanguage();

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <motion.div
          className="text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Profile Image */}
          <motion.div
            className="flex justify-center mb-8"
            variants={scaleIn}
          >
            <div className="relative">
              <img
                src="/profile/profile.png"
                alt={personalInfo.name}
                className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-700"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20"></div>
            </div>
          </motion.div>

          {/* Name & Title */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
            variants={fadeInUp}
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
          </motion.h1>

          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl text-gray-600 dark:text-gray-300 mb-8 font-medium"
            variants={fadeInUp}
          >
            {personalInfo.title}
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed"
            variants={fadeInUp}
          >
            {personalInfo.bio}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            variants={fadeInUp}
          >
            <Button size="lg" onClick={scrollToProjects} className="group text-lg px-8 py-4 min-w-[200px]">
              {t('hero.externalLink')}
              <ExternalLink className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToContact} className="text-lg px-8 py-4 min-w-[200px]">
              {t('hero.contactLinkButton')}
              <Mail className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center space-x-8"
            variants={fadeInUp}
          >
            <motion.a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={32} />
            </motion.a>
            <motion.a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={32} />
            </motion.a>
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="p-3 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail size={32} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
}
