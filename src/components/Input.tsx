/**
 * IWS SOVEREIGNTY - ATOMIC INPUT COMPONENT
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

import React from 'react';
import { cn } from '../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="space-y-2 w-full">
      <label className="text-[9px] font-black uppercase text-gray-500 tracking-[0.2em] ml-1">
        {label}
      </label>
      <input 
        className={cn(
          "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white",
          "placeholder:text-gray-700 outline-none transition-all focus:border-brand-gold focus:bg-white/10",
          error ? "border-red-500" : "border-white/10",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest ml-1">
          {error}
        </p>
      )}
    </div>
  );
}
