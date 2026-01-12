/**
 * IWS SOVEREIGNTY - ATOMIC BUTTON COMPONENT
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

import React from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  fullWidth, 
  icon, 
  className, 
  ...props 
}: ButtonProps) {
  const variants = {
    primary: "bg-white text-black hover:bg-brand-gold transition-all",
    ghost: "bg-white/5 text-white border border-white/10 hover:bg-white/10",
    danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20"
  };

  return (
    <button 
      className={cn(
        "px-6 py-3.5 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98]",
        variants[variant],
        fullWidth ? "w-full" : "w-auto",
        className
      )}
      {...props}
    >
      {children}
      {icon && <span className="opacity-70">{icon}</span>}
    </button>
  );
}
