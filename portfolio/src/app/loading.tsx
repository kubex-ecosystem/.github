'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LoadingSpinner />
        <p className="mt-4 text-gray-600 dark:text-gray-300">Carregando...</p>
      </motion.div>
    </div>
  );
}