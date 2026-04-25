import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldAlert } from 'lucide-react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { NAV_LINKS } from '../constants';

interface NavbarProps { onNavigate: (view: string) => void; }

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [activeHash, setActiveHash] = useState('#home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => setIsLoggedIn(!!user));
    setActiveHash(window.location.hash || '#home');
    
    const handleHashChange = () => setActiveHash(window.location.hash || '#home');
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      unsubAuth();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const LOGO_URL = 'https://res.cloudinary.com/dka0498ns/image/upload/v1765747786/favicon_ofkkb1.png';

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between">

          <a href="#home" className="flex items-center gap-3 cursor-pointer shrink-0">
            <div className="w-10 h-10 bg-white border-2 border-brand-900 rounded-lg flex items-center justify-center p-1">
              <img src={LOGO_URL} alt="IWS Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex font-black text-sm tracking-tighter">
              <span className="text-brand-900">INTEGRATED</span>
              <span className="text-brand-gold ml-1">WELLTH</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.hash}
                href={link.hash}
                className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                  activeHash === link.hash ? 'text-brand-gold' : 'text-brand-900 hover:text-brand-gold'
                }`}
              >
                {link.label}
              </a>
            ))}

            <a
              href="#services"
              className="flex items-center gap-2 bg-brand-gold text-brand-900 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-900 hover:text-white transition-colors"
            >
              Book a Service
            </a>

            <div className="relative group">
              <a
                href="#warroom"
                className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-colors"
              >
                <ShieldAlert size={14} /> WAR ROOM
              </a>
              <div className="absolute top-full mt-3 right-0 bg-brand-900 text-white text-[10px] px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold shadow-xl">
                3-question business risk audit · 2 mins
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-brand-900 touch-manipulation"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

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
            {NAV_LINKS.map((link) => (
              <a
                key={link.hash}
                href={link.hash}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-3xl font-black uppercase text-left tracking-tight transition-colors touch-manipulation flex items-center gap-4 ${
                  activeHash === link.hash ? 'text-brand-gold' : 'text-white hover:text-brand-gold'
                }`}
              >
                {activeHash === link.hash && <div className="w-2 h-2 bg-brand-gold rounded-full" />}
                {link.label}
              </a>
            ))}

            <div className="border-t border-white/10 my-4"></div>

            <a
              href="#services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center bg-brand-gold text-brand-900 px-6 py-4 rounded-xl text-sm font-black uppercase tracking-widest hover:opacity-90 transition-opacity touch-manipulation"
            >
              Book a Service
            </a>

            <a
              href="#warroom"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-3 bg-red-600 text-white px-6 py-4 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-red-700 transition-colors touch-manipulation"
            >
              <ShieldAlert size={18} /> WAR ROOM
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
