import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-xs font-mono uppercase tracking-widest text-slate-500">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'flex h-11 w-full rounded-lg border border-white/10 bg-surface/30 px-4 py-2 text-sm text-white transition-all placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-glow/20 focus:border-primary-glow/40 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500/50 focus:ring-red-500/20 focus:border-red-500/40',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-[10px] font-mono uppercase tracking-tight text-red-500/80">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-xs font-mono uppercase tracking-widest text-slate-500">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'flex min-h-[120px] w-full rounded-lg border border-white/10 bg-surface/30 px-4 py-3 text-sm text-white transition-all placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-glow/20 focus:border-primary-glow/40 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500/50 focus:ring-red-500/20 focus:border-red-500/40',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-[10px] font-mono uppercase tracking-tight text-red-500/80">{error}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Input, Textarea };