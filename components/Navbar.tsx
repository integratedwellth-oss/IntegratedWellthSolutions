import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Link as LinkIcon, LayoutGrid, Calendar, 
  Users, Target, Layout, ShieldAlert, Zap 
} from 'lucide-react';

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
    { name: 'THE PROTOCOL', view: 'protocol', icon: <LinkIcon size={14} /> },
    { name: 'ECOSYSTEM', view: 'services', icon: <LayoutGrid size={14} /> },
    { name: 'CALENDAR', view: 'calendar', icon: <Calendar size={14} />, isGold: true },
    { name: 'AUDIENCES', view: 'who-we-help', icon: <Users size={14} /> },
    { name: 'IDENTITY', view: 'team', icon: <Target size={14} /> },
  ];

  const LOGO_TREE = "https://res.cloudinary.com/dka0498ns/image/upload/v1772373342/Profuse_Beauty_Logo_Tree_z1nc3c.png";

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 bg-[#134e4a] border-b border-white/5 ${
      scrolled ? 'py-3' : 'py-5'
    }`}>
      <div className="max-w-[1800px] mx-auto px-4 flex items-center justify-between">
        
        {/* LEFT: BRANDING & LOGO BLOCK */}
        <div className="flex items-start gap-4">
          {/* Tree Icon */}
          <div 
            onClick={() => onNavigate('home')}
            className="w-12 h-12 bg-white rounded-lg p-1.5 border-2 border-[#d4af37] cursor-pointer shadow-xl"
          >
            <img src={LOGO_TREE} alt="IWS" className="w-full h-full object-contain" />
          </div>

          {/* Text Logo & Taglines */}
          <div className="flex flex-col gap-2">
            <div className="flex items-stretch overflow-hidden rounded-md h-8 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="bg-[#3E2723] px-3 flex items-center">
                <span className="font-black text-sm tracking-tighter text-[#14b8a6]">INTEGRATED</span>
              </div>
              <div className="bg-[#14b8a6] px-3 flex items-center">
                <span className="font-black text-sm tracking-tighter text-[#3E2723]">WELLTH</span>
              </div>
            </div>
            
            <div className="hidden xl:block">
              <p className="text-[7px] font-black text-white/60 leading-none uppercase tracking-widest mb-1">
                Transforming lives through emotional,<br/>financial and personal wellness.
              </p>
              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/5">
                <Zap size={8} className="text-[#d4af37]" />
                <span className="text-[7px] font-black text-[#d4af37] uppercase tracking-widest">
                  The SARS Safety Net is Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE: WHITE PILL NAVIGATION */}
        <div className="hidden lg:flex items-center bg-white/95 rounded-full px-2 py-1.5 shadow-2xl border border-white">
          <div className="flex items-center gap-1 px-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => onNavigate(link.view)}
                className={`flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all hover:opacity-100 ${
                  link.isGold ? 'text-[#d4af37]' : 'text-[#134e4a] opacity-70'
                }`}
              >
                {link.icon}
                {link.name}
              </button>
            ))}
          </div>
          
          <div className="w-px h-6 bg-gray-200 mx-2" />

          {/* Dashboard Entry inside Pill */}
          <button 
            onClick={() => onNavigate('my-intel')}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-100/80 rounded-full text-[10px] font-black uppercase tracking-widest text-[#134e4a] hover:bg-[#134e4a] hover:text-white transition-all shadow-inner"
          >
            <Layout size={14} /> MY DASHBOARD
          </button>
        </div>

        {/* RIGHT: WAR ROOM BUTTON */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('warroom')}
            className="hidden sm:flex items-center gap-3 px-6 py-3 bg-[#3E2723] border-2 border-[#d4af37] rounded-xl text-[#d4af37] hover:bg-[#d4af37] hover:text-[#3E2723] transition-all group shadow-xl"
          >
            <ShieldAlert size={18} className="group-hover:scale-110 transition-transform" />
            <span className="font-black text-xs uppercase tracking-[0.2em]">War Room</span>
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#134e4a] border-t border-white/5 p-8 flex flex-col gap-4 animate-fadeIn shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => { onNavigate(link.view); setIsOpen(false); }}
              className={`flex items-center gap-4 text-xl font-black uppercase tracking-tighter text-left ${
                link.isGold ? 'text-[#d4af37]' : 'text-white'
              }`}
            >
              {link.icon}
              {link.name}
            </button>
          ))}
          <div className="h-px w-full bg-white/10 my-4" />
          <button 
            onClick={() => { onNavigate('my-intel'); setIsOpen(false); }}
            className="w-full p-5 bg-white rounded-2xl text-[#134e4a] font-black uppercase tracking-widest flex items-center justify-center gap-3"
          >
            <Layout size={20} /> My Dashboard
          </button>
          <button 
            onClick={() => { onNavigate('warroom'); setIsOpen(false); }}
            className="w-full p-5 bg-[#3E2723] border-2 border-[#d4af37] rounded-2xl text-[#d4af37] font-black uppercase tracking-widest flex items-center justify-center gap-3"
          >
            <ShieldAlert size={20} /> War Room
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
