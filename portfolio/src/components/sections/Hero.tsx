'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { personalInfo } from '../../data/personal';
import { fadeInUp, scaleIn, staggerContainer } from '../../lib/animations';
import { Button } from '../ui';

export function Hero() {
  const { t, language } = useLanguage();
  const isPt = language === 'pt';

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-bg-base overflow-hidden">
      {/* Background Elements - Spec 2.0: Subtle Tech Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-primary-glow/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-tertiary-glow/10 rounded-full blur-[120px] animate-pulse transition-delay-2000"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
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
            <div className="
              relative 
              group 
              transition-all 
              hover:scale-105 
              duration-1500
              rounded-full
            " >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-glow to-tertiary-glow rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img
                src="/profile/profile.png"
                alt={personalInfo.name}
                className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full object-cover border border-white/10 transition-all duration-500" /* grayscale hover:grayscale-0 */
              />
            </div>
          </motion.div>

          {/* Name & Title */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-9xl font-black mb-6 tracking-tighter"
            variants={fadeInUp}
          >
            <span className="bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
          </motion.h1>

          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl text-slate-100 mb-8 font-semibold tracking-tight"
            variants={fadeInUp}
          >
            <span className="text-mono text-secondary-glow mr-2">[</span>
            {isPt ? personalInfo.titlePt : personalInfo.title}
            <span className="text-mono text-secondary-glow ml-2">]</span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-slate-200 max-w-3xl mx-auto mb-12 leading-relaxed font-normal"
            variants={fadeInUp}
          >
            {isPt ? personalInfo.bioPt : personalInfo.bio}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            variants={fadeInUp}
          >
            <Button size="lg" onClick={scrollToProjects} className="group text-lg px-8 py-4 min-w-[200px] bg-primary-glow hover:bg-primary-glow/90 text-white border-none shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              {t('hero.externalLink')}
              <ExternalLink className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToContact} className="text-lg px-8 py-4 min-w-[200px] border-white/10 hover:bg-white/5 text-slate-300">
              {t('hero.contactLinkButton')}
              <Mail className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center space-x-8"
            variants={fadeInUp}
          >
            {[
              { icon: Github, href: personalInfo.social.github, color: 'hover:text-white' },
              { icon: Linkedin, href: personalInfo.social.linkedin, color: 'hover:text-tertiary-glow' },
              { icon: Mail, href: `mailto:${personalInfo.email}`, color: 'hover:text-secondary-glow' }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 text-slate-500 ${social.color} transition-all duration-300 border border-white/5 rounded-xl bg-surface/30 backdrop-blur-sm`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
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
        <div className="w-6 h-10 border border-white/10 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-primary-glow rounded-full animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  );
}
