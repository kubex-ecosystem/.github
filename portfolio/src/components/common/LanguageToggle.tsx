'use client';

import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.div
      className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Globe className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded text-sm transition-all ${
          language === 'en'
            ? 'bg-blue-500 text-white'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('pt')}
        className={`px-3 py-1 rounded text-sm transition-all ${
          language === 'pt'
            ? 'bg-blue-500 text-white'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        PT
      </button>
    </motion.div>
  );
}
