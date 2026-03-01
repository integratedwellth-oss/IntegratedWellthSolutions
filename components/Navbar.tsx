import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, ArrowRight, Lock, Zap } from 'lucide-react';
import Button from './Button';

interface NavbarProps {
  onNavigate: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Solutions', view: 'services' },
    { name: 'Who We Help', view: 'who-we-help' },
    { name: 'War Room', view: 'warroom' }, // RESTORED
    { name: 'Workshops', view: 'workshops' },
    { name: 'Intelligence', view: 'blog' },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${
      scrolled ? 'py-4 bg-white/90 backdrop-blur-xl shadow-2xl border-b border-gray-100' : 'py-8 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO SECTION - RESTORED ICON NEXT TO TEXT */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-12 h-12 bg-brand-900 rounded-2xl flex items-center justify-center text-brand-gold shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            <Shield size={24} fill="currentColor" className="opacity-90" />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="font-sora font-black text-2xl tracking-tighter text-brand-900 uppercase">
              INTEGRATED<span className="text-brand-gold italic">WELLTH</span>
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-brand-900/40 ml-0.5">
              Strategic Consulting
            </span>
          </div>
        </div>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => onNavigate(link.view)}
                className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 relative group ${
                  link.name === 'War Room' ? 'text-brand-gold' : 'text-brand-900/60 hover:text-brand-900'
                }`}
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>
          
          <div className="h-6 w-px bg-brand-900/10 mx-2" />
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('my-intel')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-brand-900/5 text-brand-900 font-black uppercase tracking-widest text-[9px] hover:bg-brand-900 hover:text-white hover:border-brand-900 transition-all duration-300 shadow-sm"
            >
              <Lock size={12} className="text-brand-gold" /> Client Portal
            </button>
            
            <Button 
              size="sm" 
              onClick={() => window.location.hash = '#assessment'}
              className="rounded-full bg-brand-gold text-brand-900 hover:bg-brand-900 hover:text-white px-8 py-3.5 shadow-lg group border-0"
            >
              <span className="font-black uppercase tracking-widest text-[9px]">Start Audit</span>
              <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          className="lg:hidden w-12 h-12 rounded-2xl bg-brand-900/5 flex items-center justify-center text-brand-900 transition-colors hover:bg-brand-900/10" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU - RESTORED WITH FULL DESIGN */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 p-10 flex flex-col gap-8 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => { onNavigate(link.view); setIsOpen(false); }}
              className={`text-left text-3xl font-black uppercase tracking-tighter transition-colors ${
                link.name === 'War Room' ? 'text-brand-gold' : 'text-brand-900'
              }`}
            >
              {link.name}
            </button>
          ))}
          <div className="h-px w-full bg-gray-100 my-2" />
          <div className="flex flex-col gap-4">
            <Button 
              className="w-full justify-between py-6 rounded-2xl" 
              onClick={() => { onNavigate('my-intel'); setIsOpen(false); }}
            >
               COMMAND CENTER <Lock size={18} />
            </Button>
            <Button 
              variant="secondary" 
              className="w-full justify-between py-6 rounded-2xl" 
              onClick={() => { window.location.hash = '#assessment'; setIsOpen(false); }}
            >
               EXECUTE STRATEGIC AUDIT <Zap size={18} fill="currentColor" />
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
