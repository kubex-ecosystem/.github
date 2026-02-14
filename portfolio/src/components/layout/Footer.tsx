'use client';

import { motion } from 'framer-motion';
import { Github, Heart, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../../data/personal';
import { useLanguage } from '../../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-base border-t border-white/5 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-primary-glow to-tertiary-glow bg-clip-text text-transparent">
              Rafa Mori
            </h3>
            <p className="text-sm font-normal leading-relaxed max-w-xs text-slate-200">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
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
                  className={`text-slate-500 ${social.color} transition-colors duration-300`}
                  whileHover={{ scale: 1.1 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-bold">
              {t('nav.about')} / {t('nav.projects')}
            </h4>
            <ul className="space-y-2">
              {[
                { name: t('nav.home'), href: '#home' },
                { name: t('nav.about'), href: '#about' },
                { name: t('nav.projects'), href: '#projects' },
                { name: t('nav.contact'), href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm font-normal text-slate-300 hover:text-primary-glow transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-bold">{t('contact.getInTouch')}</h4>
            <p className="text-sm font-normal text-slate-300">
              {personalInfo.location}
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-sm font-normal text-slate-300 hover:text-secondary-glow transition-colors duration-200"
            >
              {personalInfo.email}
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-medium">
            © {currentYear} Rafael Mori. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              Made with <Heart size={10} className="text-primary-glow fill-current" />
            </span>
            <span>[ STATUS: ONLINE ]</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}