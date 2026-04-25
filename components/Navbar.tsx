import React, { useState, useEffect } from 'react';
import { LayoutGrid, Users, Calendar, Target, Workflow, ArrowRight, Menu, X, ShieldAlert } from 'lucide-react';
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
    const unsubAuth = onAuthStateChanged(auth, (user) => setIsLoggedIn(!!user));
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); unsubAuth(); };
  }, []);

  const handleLinkClick = (hash: string) => {
    window.location.hash = hash;
    onNavigate(hash.replace('#', ''));
    setIsMobileMenuOpen(false);
  };

  const LOGO_URL = "https://res.cloudinary.com/dka0498ns/image/upload/v1765747786/favicon_ofkkb1.png";

  return (
    <nav className={`fixed top-0 w-full z-[100] px-4 md:px-6 pt-4 transition-all duration-300 ${scrolled ? 'pb-4' : 'pb-0'}`}>
      <div className={`absolute inset-0 transition-opacity duration-300 ${scrolled ? 'bg-brand-900/90 backdrop-blur-xl shadow-2xl' : 'opacity-0'}`}></div>
      <div className="max-w-[1800px] mx-auto flex items-center justify-between relative z-10">
        
        {/* LOGO AREA - RESTORED */}
        <div className="flex items-start gap-3 cursor-pointer shrink-0 group" onClick={() => handleLinkClick('#home')}>
          <div className="w-12 h-12 rounded-xl bg-white border-2 border-brand-brown overflow-hidden shadow-lg flex items-center justify-center p-1">
            <img src={LOGO_URL} className="w-full h-full object-contain" alt="IWS" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center font-sora font-black text-lg md:text-xl tracking-tighter">
              <div className="bg-brand-brown text-[#14b8a6] px-3 py-2 rounded-l-lg">INTEGRATED</div>
              <div className="bg-[#14b8a6] text-brand-brown px-3 py-2 rounded-r-lg">WELLTH</div>
            </div>
          </div>
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden xl:flex items-center gap-4">
          <button onClick={() => handleLinkClick('#warroom')} className="flex items-center gap-2 bg-brand-brown text-brand-gold border-2 border-red-600 px-4 py-3 rounded-xl shadow-lg hover:bg-red-600 hover:text-white transition-all">
            <ShieldAlert size={18} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">WAR ROOM</span>
          </button>
        </div>

        {/* MOBILE BURGER */}
        <button onClick={() => setIsMobileMenuOpen(true)} className="xl:hidden w-12 h-12 rounded-xl bg-white/10 text-white border border-white/10 flex items-center justify-center">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
