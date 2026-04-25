import React, { useState, useEffect } from 'react';
import { LayoutGrid, Users, Calendar, Target, Workflow, Menu, X, ShieldAlert, Layout } from 'lucide-react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

interface NavbarProps { onNavigate: (view: string) => void; }

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [activeHash, setActiveHash] = useState('#home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => setIsLoggedIn(!!user));
    setActiveHash(window.location.hash || '#home');
    return () => unsubAuth();
  }, []);

  const handleLinkClick = (hash: string) => {
    window.location.hash = hash;
    onNavigate(hash.replace('#', ''));
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'PROTOCOL', hash: '#protocol' },
    { label: 'ECOSYSTEM', hash: '#services' },
    { label: 'CALENDAR', hash: '#compliance-calendar' },
    { label: 'TEAM', hash: '#team' }
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] px-4 md:px-8 py-6 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleLinkClick('#home')}>
          <div className="w-10 h-10 bg-brand-900 rounded-lg" />
          <div className="flex font-black text-sm tracking-tighter">
            <span className="text-brand-900">INTEGRATED</span>
            <span className="text-brand-gold">WELLTH</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <button key={link.hash} onClick={() => handleLinkClick(link.hash)} className="text-[10px] font-black uppercase tracking-widest text-brand-900 hover:text-brand-gold">{link.label}</button>
          ))}
          <button onClick={() => handleLinkClick('#warroom')} className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700">
            <ShieldAlert size={14} /> WAR ROOM
          </button>
        </div>

        {/* Mobile Burger */}
        <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-brand-900">
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-brand-900 p-8 flex flex-col gap-8">
          <button onClick={() => setIsMobileMenuOpen(false)} className="self-end text-white"><X size={32}/></button>
          {navLinks.map(link => (
            <button key={link.hash} onClick={() => handleLinkClick(link.hash)} className="text-white text-3xl font-black uppercase text-left">{link.label}</button>
          ))}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
