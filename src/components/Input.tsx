import React from 'react';
import { cn } from '../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="space-y-2 w-full">
      <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">
        {label}
      </label>
      <input
        className={cn(
          "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C5A059] outline-none transition-all placeholder:text-gray-700",
          className
        )}
        {...props}
      />
    </div>
  );
}
