'use client';

import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.div
      className="flex items-center gap-1 p-1 rounded-lg border border-white/5 bg-surface/30 backdrop-blur-sm"
      whileHover={{ scale: 1.02 }}
    >
      <div className="px-2">
        <Globe size={14} className="text-slate-500" />
      </div>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest transition-all ${
          language === 'en'
            ? 'bg-primary-glow text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]'
            : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('pt')}
        className={`px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest transition-all ${
          language === 'pt'
            ? 'bg-primary-glow text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]'
            : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
        }`}
      >
        PT
      </button>
    </motion.div>
  );
}
