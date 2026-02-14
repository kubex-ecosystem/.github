import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-bold tracking-tight transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-primary-glow text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-primary-glow/50',
      secondary: 'bg-surface border border-white/10 text-slate-300 hover:bg-surface-hover hover:border-white/20',
      outline: 'border border-white/10 text-slate-400 hover:border-white/20 hover:bg-white/5 hover:text-slate-200',
      ghost: 'text-slate-500 hover:text-slate-200 hover:bg-white/5',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs font-mono uppercase tracking-widest',
      md: 'px-6 py-3 text-sm font-mono uppercase tracking-widest',
      lg: 'px-8 py-4 text-base font-mono uppercase tracking-[0.2em]',
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };