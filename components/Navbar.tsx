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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setActiveHash(window.location.hash || '#home');
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleScroll);
    };
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
    <nav className={`fixed top-0 w-full z-[100] px-4 md:px-8 pt-4 transition-all duration-300 ${scrolled ? 'pb-4 bg-white/90 backdrop-blur-xl shadow-md' : 'pb-0'}`}>
      <div className="max-w-[1800px] mx-auto flex items-center justify-between gap-4">
        
        {/* === BRAND IDENTITY SECTION === */}
        <div className="flex items-center gap-3 cursor-pointer shrink-0 group" onClick={() => handleLinkClick('#home')}>
          {/* Logo Icon */}
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white border border-brand-900/10 overflow-hidden shadow-xl flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-500">
            <img src="/logo.png" className="w-full h-full object-contain" alt="IWS Tree of Life" />
          </div>
          
          {/* Text Lockup */}
          <div className="flex flex-col justify-center">
            {/* Main Title - Connected but Colored Differently */}
            <h1 className="font-sora font-black text-lg md:text-2xl tracking-tighter leading-none flex items-center">
              <span className="text-brand-900">INTEGRATED</span>
              <span className="text-brand-gold">WELLTH</span>
            </h1>
            
            {/* Tagline - Slate Grey, Wide Tracking for legibility */}
            <p className="hidden md:block text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1 border-t border-slate-200 pt-1 leading-tight max-w-xs">
              Transforming lives through emotional, financial & personal wellness.
            </p>
            {/* Mobile Short Tagline */}
            <p className="md:hidden text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
              Financial & Personal Wellness
            </p>
          </div>
        </div>

        {/* === DESKTOP NAVIGATION === */}
        <div className="hidden xl:flex bg-brand-50/80 backdrop-blur-md p-1.5 rounded-full items-center border border-brand-900/5 shadow-inner">
          {navLinks.map((link) => (
            <button
              key={link.hash}
              onClick={() => handleLinkClick(link.hash)}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300
                ${link.isWarRoom ? 'bg-brand-900 text-white hover:bg-brand-gold hover:text-brand-900 shadow-lg mx-1' : 
                  activeHash === link.hash ? 'bg-white text-brand-900 shadow-sm' : 'text-brand-900/40 hover:text-brand-900'}
              `}
            >
              {link.icon} {link.label}
            </button>
          ))}
        </div>

        {/* === RIGHT ACTIONS === */}
        <div className="flex items-center gap-4">
          <button onClick={() => handleLinkClick('#warroom')} className="hidden md:flex text-[10px] font-black uppercase tracking-widest text-brand-900 hover:text-brand-gold items-center gap-2 transition-colors">
            <LogIn size={14} /> CLIENT LOGIN
          </button>
          <button onClick={() => setIsMobileMenuOpen(true)} className="xl:hidden w-10 h-10 rounded-full bg-brand-900 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* === MOBILE DRAWER === */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-brand-900 flex flex-col animate-fadeIn">
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-white rounded-xl p-1"><img src="/logo.png" className="w-full h-full object-contain"/></div>
               <span className="text-white font-sora font-black text-lg tracking-tighter">INTEGRATED<span className="text-brand-gold">WELLTH</span></span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20">
              <X size={20} />
            </button>
          </div>
          <div className="flex flex-col px-6 py-8 gap-4 overflow-y-auto">
            {navLinks.map((link) => (
              <button
                key={link.hash}
                onClick={() => handleLinkClick(link.hash)}
                className={`flex items-center justify-between w-full p-5 rounded-2xl border transition-all ${
                  link.isWarRoom 
                  ? 'bg-brand-gold text-brand-900 border-brand-gold shadow-lg' 
                  : 'bg-white/5 border-white/5 text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  {link.icon}
                  <span className="text-xs font-black uppercase tracking-widest">{link.label}</span>
                </div>
                <ArrowRight size={16} />
              </button>
            ))}
          </div>
          <div className="mt-auto p-8 text-center border-t border-white/10">
             <p className="text-brand-gold/60 text-[10px] uppercase tracking-widest">Transforming Lives Through Wellness</p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
