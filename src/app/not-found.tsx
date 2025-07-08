'use client';

import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import * as UI from '../components/ui';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          404
        </motion.div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Page Not Found
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <UI.Button
            onClick={() => window.history.back()}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </UI.Button>
          
          <UI.Button
            onClick={() => window.location.href = '/'}
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </UI.Button>
        </div>
      </motion.div>
    </div>
  );
}
