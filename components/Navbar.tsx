import React, { useState, useEffect } from 'react';
import {
  LayoutGrid, Users, Calendar, Target, Workflow, ArrowRight, ShieldAlert, Menu, X, LogIn
} from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [activeHash, setActiveHash] = useState('#home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setActiveHash(window.location.hash || '#home');
    window.addEventListener('hashchange', handleScroll);
    return () => window.removeEventListener('hashchange', handleScroll);
  }, []);

  const handleLinkClick = (hash: string) => {
    window.location.hash = hash;
    onNavigate(hash.replace('#', ''));
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'THE PROTOCOL', hash: '#protocol', icon: <Workflow size={14} /> },
    { label: 'ECOSYSTEM', hash: '#services', icon: <LayoutGrid size={14} /> },
    { label: 'AUDIENCES', hash: '#who-we-help', icon: <Users size={14} /> },
    { label: 'IDENTITY', hash: '#team', icon: <Target size={14} /> },
    { label: 'WAR ROOM', hash: '#warroom', icon: <ShieldAlert size={14} />, isWarRoom: true },
    { label: 'SUMMITS', hash: '#workshops', icon: <Calendar size={14} />, isSpecial: true },
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] px-4 md:px-8 pt-6">
      <div className="max-w-[1800px] mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo Area */}
        <div className="flex items-start gap-2 cursor-pointer shrink-0" onClick={() => handleLinkClick('#home')}>
          <div className="w-12 h-12 rounded-xl bg-white border border-brand-900/10 overflow-hidden shadow-2xl flex items-center justify-center p-1">
            <img src="/logo.png" className="w-full h-full object-contain" alt="IWS" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center overflow-hidden rounded-md font-black text-[10px] md:text-xs uppercase tracking-tighter mb-1">
              <div className="bg-brand-gold px-3 py-1 text-brand-900">INTEGRATED</div>
              <div className="bg-brand-900 px-3 py-1 text-brand-gold">WELLTH</div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <div className="hidden lg:flex bg-brand-900/90 backdrop-blur-md p-1.5 rounded-full items-center border border-white/10 shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.hash}
              onClick={() => handleLinkClick(link.hash)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300
                ${link.isWarRoom ? 'bg-red-600 text-white hover:bg-red-700 mx-1' : 
                  activeHash === link.hash ? 'bg-white/10 text-brand-gold' : 'text-brand-100/60 hover:text-brand-gold'}
              `}
            >
              {link.icon} {link.label}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button onClick={() => handleLinkClick('#warroom')} className="hidden md:flex text-[10px] font-black uppercase tracking-widest text-brand-900 hover:text-brand-gold items-center gap-2">
            LOGIN <ArrowRight size={14} />
          </button>
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden w-12 h-12 rounded-full bg-brand-900 text-brand-gold flex items-center justify-center shadow-xl">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Fixed Positioning) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-slate-900 flex flex-col animate-fadeIn">
          <div className="flex justify-between items-center p-6">
            <h2 className="text-white font-black text-lg tracking-tighter uppercase">COMMAND CENTER</h2>
            <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center">
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col px-6 gap-4 overflow-y-auto pb-20">
            {navLinks.map((link) => (
              <button
                key={link.hash}
                onClick={() => handleLinkClick(link.hash)}
                className="flex items-center justify-between w-full p-6 rounded-2xl bg-white/5 border border-white/5 text-white hover:bg-brand-gold hover:text-brand-900 transition-all"
              >
                <div className="flex items-center gap-4">
                  {link.icon}
                  <span className="text-xs font-black uppercase tracking-widest">{link.label}</span>
                </div>
                <ArrowRight size={18} />
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
