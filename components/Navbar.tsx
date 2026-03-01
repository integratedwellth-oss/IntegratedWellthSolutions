import React, { useState, useEffect } from 'react';
import { Menu, X, Link as LinkIcon, LayoutGrid, Calendar, Users, Target, Layout, ShieldAlert, Zap, Lock } from 'lucide-react';

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

  const LOGO_TREE = "https://res.cloudinary.com/dka0498ns/image/upload/v1772373342/Profuse_Beauty_Logo_Tree_z1nc3c.png";
  const TEXT_LOGO = "https://res.cloudinary.com/dka0498ns/image/upload/v1765747667/Integrated_Wellth_Solutions_Logo_bodmyc1_iiervl.png";

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 bg-[#134e4a] border-b border-white/5 ${scrolled ? 'py-2 shadow-2xl' : 'py-4'}`}>
      <div className="max-w-[1800px] mx-auto px-6 flex items-center justify-between">
        
        {/* LEFT: BRANDING BLOCK */}
        <div className="flex items-center gap-4">
          <div onClick={() => onNavigate('home')} className="w-10 h-10 bg-white rounded-lg p-1.5 border-2 border-[#d4af37] cursor-pointer">
            <img src={LOGO_TREE} alt="IWS" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-stretch overflow-hidden rounded-md h-7 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="bg-[#3E2723] px-3 flex items-center"><span className="font-black text-xs tracking-tighter text-[#14b8a6]">INTEGRATED</span></div>
              <div className="bg-[#14b8a6] px-3 flex items-center"><span className="font-black text-xs tracking-tighter text-[#3E2723]">WELLTH</span></div>
            </div>
            <p className="hidden xl:block text-[6px] font-black text-white/50 leading-none uppercase tracking-widest">
              Transforming lives through emotional, financial and personal wellness.
            </p>
          </div>
        </div>

        {/* MIDDLE: THE PILL MENU */}
        <div className="hidden lg:flex items-center bg-white/95 rounded-full px-2 py-1 shadow-2xl border border-white">
          {[
            { name: 'THE PROTOCOL', view: 'protocol', icon: <LinkIcon size={12} /> },
            { name: 'ECOSYSTEM', view: 'services', icon: <LayoutGrid size={12} /> },
            { name: 'CALENDAR', view: 'calendar', icon: <Calendar size={12} />, isGold: true },
            { name: 'AUDIENCES', view: 'who-we-help', icon: <Users size={12} /> },
            { name: 'IDENTITY', view: 'team', icon: <Target size={12} /> },
          ].map((link) => (
            <button key={link.name} onClick={() => onNavigate(link.view)} className={`flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest transition-all hover:opacity-100 ${link.isGold ? 'text-[#d4af37]' : 'text-[#134e4a] opacity-70'}`}>
              {link.icon} {link.name}
            </button>
          ))}
          <div className="w-px h-5 bg-gray-200 mx-2" />
          <button onClick={() => onNavigate('my-intel')} className="flex items-center gap-2 px-5 py-2 bg-gray-100/80 rounded-full text-[9px] font-black uppercase tracking-widest text-[#134e4a] hover:bg-[#134e4a] hover:text-white transition-all">
            <Layout size={12} /> MY DASHBOARD
          </button>
        </div>

        {/* RIGHT: WAR ROOM */}
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('warroom')} className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-[#3E2723] border border-[#d4af37] rounded-lg text-[#d4af37] hover:bg-[#d4af37] hover:text-[#3E2723] transition-all shadow-lg font-black text-[10px] uppercase tracking-widest">
            <ShieldAlert size={16} /> WAR ROOM
          </button>
          <button className="lg:hidden p-2 text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
