import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldAlert } from 'lucide-react';
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
    { label: 'TEAM', hash: '#team' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer shrink-0"
            onClick={() => handleLinkClick('#home')}
          >
            <div className="w-10 h-10 bg-brand-900 rounded-lg" />
            <div className="flex font-black text-sm tracking-tighter">
              <span className="text-brand-900">INTEGRATED</span>
              <span className="text-brand-gold">WELLTH</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.hash}
                onClick={() => handleLinkClick(link.hash)}
                className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                  activeHash === link.hash ? 'text-brand-gold' : 'text-brand-900 hover:text-brand-gold'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleLinkClick('#warroom')}
              className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-colors"
            >
              <ShieldAlert size={14} /> WAR ROOM
            </button>
          </div>

          {/* Mobile Burger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-brand-900 touch-manipulation"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay — rendered outside nav to avoid stacking/overflow issues */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-brand-900 flex flex-col p-8 overflow-y-auto">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="self-end text-white mb-8 touch-manipulation"
            aria-label="Close menu"
          >
            <X size={32} />
          </button>

          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <button
                key={link.hash}
                onClick={() => handleLinkClick(link.hash)}
                className="text-white text-3xl font-black uppercase text-left tracking-tight hover:text-brand-gold transition-colors touch-manipulation"
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => handleLinkClick('#warroom')}
              className="flex items-center gap-3 bg-red-600 text-white px-6 py-4 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-red-700 transition-colors mt-4 touch-manipulation"
            >
              <ShieldAlert size={18} /> WAR ROOM
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
