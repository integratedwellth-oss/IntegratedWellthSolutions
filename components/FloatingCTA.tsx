import React, { useState, useEffect } from 'react';
import { Users, ArrowRight } from 'lucide-react';

const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={() => window.location.hash = '#accountability'}
      // HOVER LOGIC: w-14 by default, w-64 on hover. overflow-hidden hides the text until expanded.
      className="fixed bottom-32 right-6 z-[400] flex items-center bg-brand-gold text-brand-900 h-14 w-14 hover:w-72 rounded-full shadow-[0_20px_50px_rgba(212,175,55,0.4)] transition-all duration-500 ease-in-out overflow-hidden group border-2 border-white/20"
    >
      {/* Icon (Always Visible) */}
      <div className="min-w-[56px] h-14 flex items-center justify-center shrink-0">
        <Users size={24} />
      </div>

      {/* Text (Visible only on expand) */}
      <div className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pr-6 text-left">
        <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1 opacity-60">Founder Access</p>
        <p className="font-sora font-extrabold text-sm leading-none">
          The "Lonely Journey" Ends Here
        </p>
      </div>

      <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
        <ArrowRight size={18} />
      </div>
    </button>
  );
};

export default FloatingCTA;
