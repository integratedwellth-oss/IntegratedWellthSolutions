import React from 'react';
import { ArrowRight, Bell } from 'lucide-react';

const NewsTicker: React.FC = () => {
  return (
    <div 
      className="bg-brand-gold text-brand-900 py-3 px-4 cursor-pointer hover:bg-yellow-500 transition-colors relative z-40"
      onClick={() => window.location.hash = '#upcoming-event'}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-2">
        <div className="flex items-center gap-2 font-bold animate-pulse-slow">
          <Bell size={18} className="hidden sm:block" />
          <span className="bg-brand-900 text-white px-2 py-0.5 rounded text-xs uppercase tracking-wider">Event Alert</span>
          <span className="text-sm sm:text-base">Financial Clarity For Non-Financial Business Owners - Feb 28, 2026</span>
        </div>
        <div className="flex items-center gap-1 text-sm font-bold whitespace-nowrap group">
          Register Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;