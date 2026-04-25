import React, { useState, useEffect } from 'react';
import { LayoutGrid, Users, Calendar, Target, Workflow, ArrowRight, Menu, X, Layout, ShieldAlert, Shield } from 'lucide-react';
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
    { label: 'CALENDAR', hash: '#compliance-calendar', icon: <Calendar size={14} /> },
    { label: 'AUDIENCES', hash: '#who-we-help', icon: <Users size={14} /> },
    { label: 'IDENTITY', hash: '#team', icon: <Target size={14} /> },
    { label: 'WAR ROOM', hash: '#warroom', icon: <ShieldAlert size={14} /> }
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] px-4 pt-4 transition-all duration-300`}>
      <div className={`absolute inset-0 bg-brand-900/90 backdrop-blur-xl shadow-2xl transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-80'}`}></div>
      <div className="flex items-center justify-between relative z-10 py-2">
        {/* LOGO AREA - Minimal for Mobile */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleLinkClick('#home')}>
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center font-black text-brand-900">IWS</div>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-white bg-white/10 rounded-lg">
          <Menu size={24} />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-brand-900 flex flex-col p-6 animate-fadeIn">
          <div className="flex justify-end mb-10">
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2"><X size={32}/></button>
          </div>
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <button key={link.hash} onClick={() => handleLinkClick(link.hash)} className="text-white text-2xl font-black uppercase tracking-widest flex items-center gap-4">
                {link.icon} {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
