'use client';

import { motion } from 'framer-motion';
import { staggerContainer } from '../../lib/animations';

interface ClientPageLayoutProps {
  children: React.ReactNode;
}

export function ClientPageLayout({ children }: ClientPageLayoutProps) {
  return (
    <motion.div
      className="relative min-h-screen bg-bg-base w-full"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.div>
  );
}
