import React, { useState } from 'react';
import { Menu, X, ShieldAlert, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navTo = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 px-6 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto bg-brand-900/90 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex justify-between items-center shadow-2xl pointer-events-auto">
        
        {/* LOGO */}
        <div onClick={() => navTo('/')} className="flex items-center gap-2 cursor-pointer">
          <Target className="text-brand-gold" size={24} />
          <span className="font-sora font-bold text-white tracking-tighter uppercase">Integrated<span className="text-brand-gold">Wellth</span></span>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-white/70">
          <button onClick={() => navTo('/')} className="hover:text-white transition-colors">Base</button>
          <button onClick={() => navTo('/war-room')} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors border border-red-500/30 px-3 py-1 rounded-full bg-red-500/10">
            <ShieldAlert size={14} /> War Room
          </button>
        </div>

        {/* MOBILE TRIGGER */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="fixed inset-0 bg-brand-900 z-40 flex flex-col items-center justify-center gap-8 pointer-events-auto">
          <button onClick={() => navTo('/')} className="text-2xl font-black text-white uppercase">Home</button>
          <button onClick={() => navTo('/war-room')} className="text-2xl font-black text-red-500 uppercase flex items-center gap-2"><ShieldAlert /> War Room</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
