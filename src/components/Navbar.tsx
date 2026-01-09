import React, { useState } from 'react';
import { Menu, X, ShieldAlert } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto bg-brand-900/95 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex justify-between items-center shadow-2xl pointer-events-auto">
        
        {/* LOGO - RESTORED */}
        <div onClick={() => navTo('/')} className="flex items-center gap-2 cursor-pointer">
          <img 
            src="https://res.cloudinary.com/dka0498ns/image/upload/v1765049634/Integrated_Wellth_Solutions_Logo_bodmyc.png" 
            alt="IWS Logo" 
            className="h-10 md:h-12 object-contain"
          />
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-white/70">
          <button onClick={() => navTo('/')} className="hover:text-white transition-colors">Base</button>
          <button onClick={() => navTo('/who-we-help')} className="hover:text-white transition-colors">Solutions</button>
          <button onClick={() => navTo('/services')} className="hover:text-white transition-colors">Services</button>
          <button onClick={() => navTo('/team')} className="hover:text-white transition-colors">Team</button>
          <button onClick={() => navTo('/contact')} className="hover:text-white transition-colors">Contact</button>
          
          <button onClick={() => navTo('/war-room')} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors border border-red-500/30 px-4 py-2 rounded-full bg-red-500/10 hover:bg-red-500/20">
            <ShieldAlert size={14} /> War Room
          </button>
        </div>

        {/* MOBILE TRIGGER */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="fixed inset-0 bg-brand-900 z-40 flex flex-col items-center justify-center gap-8 pointer-events-auto animate-in slide-in-from-top-10">
          <button onClick={() => navTo('/')} className="text-2xl font-black text-white uppercase">Base</button>
          <button onClick={() => navTo('/who-we-help')} className="text-2xl font-black text-white uppercase">Solutions</button>
          <button onClick={() => navTo('/services')} className="text-2xl font-black text-white uppercase">Services</button>
          <button onClick={() => navTo('/team')} className="text-2xl font-black text-white uppercase">Team</button>
          <button onClick={() => navTo('/contact')} className="text-2xl font-black text-white uppercase">Contact</button>
          <button onClick={() => navTo('/war-room')} className="text-2xl font-black text-red-500 uppercase flex items-center gap-2"><ShieldAlert /> War Room</button>
          
          <button onClick={() => setIsOpen(false)} className="absolute top-10 right-10 text-white opacity-50">
            <X size={32} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
