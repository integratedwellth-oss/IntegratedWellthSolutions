import React, { useState, useEffect } from 'react';
import { Users, ArrowRight } from 'lucide-react';

const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show after user scrolls past the hero to keep the initial landing clean
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const navigateToAccountability = () => {
    window.location.hash = '#accountability';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={navigateToAccountability}
      className="fixed bottom-32 right-6 md:bottom-12 md:right-10 z-[400] flex items-center gap-4 bg-brand-gold text-brand-900 pl-5 pr-8 py-5 rounded-full shadow-[0_25px_60px_rgba(212,175,55,0.4)] hover:bg-brand-900 hover:text-white hover:scale-110 transition-all duration-500 group animate-fadeIn border-2 border-white/20 active:scale-95"
    >
      <div className="w-12 h-12 bg-brand-900/10 group-hover:bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md transition-colors">
        <Users size={24} />
      </div>
      <div className="text-left">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] opacity-60 leading-none mb-1 group-hover:text-brand-gold transition-colors">Founders</p>
        <p className="font-sora font-extrabold text-sm md:text-lg leading-none whitespace-nowrap">
          The "Lonely Journey" Ends Here
        </p>
      </div>
      <ArrowRight size={22} className="ml-2 group-hover:translate-x-2 transition-transform" />
    </button>
  );
};

export default FloatingCTA;