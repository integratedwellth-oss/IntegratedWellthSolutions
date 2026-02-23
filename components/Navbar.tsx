import React, { useState, useEffect } from 'react';
import {
  LayoutGrid, Users, Calendar, Target, Workflow, ArrowRight, ShieldAlert, Menu, X, LogIn, Layout
} from 'lucide-react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

interface NavbarProps {
  onNavigate: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [activeHash, setActiveHash] = useState('#home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setActiveHash(window.location.hash || '#home');
      setScrolled(window.scrollY > 20);
    };
    const unsubAuth = onAuthStateChanged(auth, (user) => {
        setIsLoggedIn(!!user);
    });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleScroll);
      unsubAuth();
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
    { label: 'SUMMITS', hash: '#summit', icon: <Calendar size={14} />, isSpecial: true },
  ];

  const LOGO_URL = "https://res.cloudinary.com/dka0498ns/image/upload/v1765747786/favicon_ofkkb1.png";

  return (
    <nav className={`fixed top-0 w-full z-[100] px-4 md:px-6 pt-4 transition-all duration-300 ${scrolled ? 'pb-4' : 'pb-0'}`}>
      <div className={`absolute inset-0 transition-opacity duration-300 ${scrolled ? 'bg-brand-900/90 backdrop-blur-xl shadow-2xl' : 'opacity-0'}`}></div>

      <div className="max-w-[1800px] mx-auto flex items-center justify-between relative z-10">
        
        <div className="flex items-start gap-3 cursor-pointer shrink-0 group" onClick={() => handleLinkClick('#home')}>
          <div className="w-12 h-12 rounded-xl bg-white border-2 border-brand-brown overflow-hidden shadow-lg flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-500">
            <img src={LOGO_URL} className="w-full h-full object-contain" alt="IWS" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center font-sora font-black text-lg md:text-xl tracking-tighter leading-none shadow-xl">
              <div className="bg-brand-brown text-[#14b8a6] px-3 py-2 rounded-l-lg">INTEGRATED</div>
              <div className="bg-[#14b8a6] text-brand-brown px-3 py-2 rounded-r-lg">WELLTH</div>
            </div>
            <div className="mt-2 pl-1 border-l-2 border-brand-gold uppercase text-[7px] md:text-[8px] font-bold text-slate-300 tracking-widest leading-relaxed">
                TRANSFORMING LIVES THROUGH EMOTIONAL,<br />FINANCIAL AND PERSONAL WELLNESS.
            </div>
          </div>
        </div>

        <div className="hidden xl:flex bg-white/95 backdrop-blur-md px-2 py-2 rounded-full items-center border border-white/20 shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.hash}
              onClick={() => handleLinkClick(link.hash)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeHash === link.hash ? 'bg-brand-brown text-white' : 'text-brand-900 hover:bg-brand-50'}`}
            >
              {link.icon} {link.label}
            </button>
          ))}
          {/* CLIENT PORTAL BUTTON */}
          <button 
             onClick={() => handleLinkClick('#my-intel')}
             className={`ml-1 flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeHash === '#my-intel' ? 'bg-brand-gold text-brand-900' : 'bg-brand-900/5 text-brand-900 hover:bg-brand-900 hover:text-white'}`}
          >
             <Layout size={14}/> {isLoggedIn ? 'My Dashboard' : 'Client Portal'}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleLinkClick('#warroom')}
            className="flex items-center gap-2 bg-brand-brown text-brand-gold border-2 border-brand-gold px-4 py-3 rounded-xl shadow-lg hover:bg-brand-gold hover:text-brand-brown transition-all"
          >
            <ShieldAlert size={18} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">WAR ROOM</span>
            <span className="text-[10px] font-black uppercase tracking-widest md:hidden">WAR</span>
          </button>

          <button onClick={() => setIsMobileMenuOpen(true)} className="xl:hidden w-12 h-12 rounded-xl bg-white/10 text-white border border-white/10 flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-brand-900 flex flex-col animate-fadeIn">
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <div className="flex items-center gap-2">
               <div className="bg-brand-brown text-[#14b8a6] px-2 py-1 font-black text-sm rounded">INTEGRATED</div>
               <div className="bg-white text-brand-brown px-2 py-1 font-black text-sm rounded">WELLTH</div>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center"><X size={20} /></button>
          </div>
          <div className="flex flex-col px-6 py-8 gap-4 overflow-y-auto">
            {navLinks.map((link) => (
              <button key={link.hash} onClick={() => handleLinkClick(link.hash)} className="flex items-center justify-between w-full p-5 rounded-2xl bg-white/5 text-white hover:bg-brand-gold hover:text-brand-900 transition-all font-black uppercase text-xs">
                <div className="flex items-center gap-4">{link.icon}<span>{link.label}</span></div><ArrowRight size={16} />
              </button>
            ))}
            <button onClick={() => handleLinkClick('#my-intel')} className="flex items-center justify-between w-full p-5 rounded-2xl bg-brand-gold text-brand-900 font-black uppercase text-xs"><div className="flex items-center gap-4"><Layout size={18}/><span>My Dashboard</span></div><ArrowRight size={16}/></button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
