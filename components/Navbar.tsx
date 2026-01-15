
import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, 
  Users, 
  Calendar, 
  Target, 
  Workflow, 
  ArrowRight, 
  ShieldAlert,
  Menu,
  X,
  LogIn
} from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [activeHash, setActiveHash] = useState('#home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setActiveHash(window.location.hash || '#home');
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleScroll);
    handleScroll();
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
    <nav className="fixed top-0 w-full z-[100] px-4 md:px-8 pt-6">
      <style>{`
        .glossy-mustard {
          background: linear-gradient(to bottom, #facc15 0%, #d4af37 45%, #b8962d 100%);
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.1);
        }
        .glossy-teal {
          background: linear-gradient(to bottom, #134e4a 0%, #0d3d3a 100%);
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.2);
        }
        .tactical-red {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.5), inset 0 1px 1px rgba(255,255,255,0.3);
          border: 1px solid rgba(255,255,255,0.2);
        }
        .nav-capsule {
          background: rgba(19, 78, 74, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 15px 45px rgba(0,0,0,0.4);
        }
        .mobile-drawer {
          background: rgba(15, 23, 42, 0.98);
          backdrop-filter: blur(25px);
        }
        .burger-circle {
          background: #134e4a;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
        }
      `}</style>

      <div className="max-w-[1800px] mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Architecture (Left) */}
        <div 
          className="flex items-start gap-1 md:gap-2 cursor-pointer shrink-0" 
          onClick={() => handleLinkClick('#home')}
        >
          {/* Logo Container - Using local logo.png */}
          <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl bg-white border border-brand-900/10 overflow-hidden shadow-2xl flex-shrink-0 flex items-center justify-center p-1">
             <img 
              src="/logo.png" 
              className="w-full h-full object-contain" 
              alt="IWS" 
              onError={(e) => {
                // Fallback in case /logo.png fails
                (e.target as HTMLImageElement).src = "https://res.cloudinary.com/dka0498ns/image/upload/v1765747786/favicon_ofkkb1.png";
              }}
            />
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center overflow-hidden rounded-md font-sora font-black text-[9px] md:text-xl uppercase tracking-tighter mb-0.5 md:mb-1">
               {/* "Integrated" - Teal text on Mustard bg */}
               <div className="glossy-mustard px-2 md:px-4 py-1 md:py-1.5 text-brand-900 min-w-[65px] md:min-w-[120px] text-center">
                  INTEGRATED
               </div>
               {/* "Wellth" - Mustard text on Teal bg */}
               <div className="glossy-teal px-2 md:px-4 py-1 md:py-1.5 text-brand-gold min-w-[55px] md:min-w-[110px] text-center">
                  WELLTH
               </div>
            </div>
            <div className="text-[7px] md:text-[9px] font-black text-brand-900/90 leading-none uppercase">
              <div className="tracking-[0.01em]">TRANSFORMING LIVES THROUGH EMOTIONAL,</div>
              <div className="tracking-[0.01em]">FINANCIAL AND PERSONAL WELLNESS.</div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation (Center Capsule) - Visible only on LG and above */}
        <div className="hidden lg:flex nav-capsule p-1.5 rounded-full items-center">
           <div className="flex items-center gap-1 px-2">
              {navLinks.map((link) => (
                <button
                  key={link.hash}
                  onClick={() => handleLinkClick(link.hash)}
                  className={`
                    flex items-center gap-2.5 px-5 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300
                    ${link.isWarRoom 
                      ? 'tactical-red text-white hover:scale-105 mx-1' 
                      : link.isSpecial 
                        ? 'bg-white/10 text-brand-gold border border-brand-gold/30 mx-1' 
                        : activeHash === link.hash 
                          ? 'text-brand-gold bg-white/10' 
                          : 'text-brand-gold/60 hover:text-brand-gold'}
                  `}
                >
                  <span className={`${link.isWarRoom ? 'text-white' : 'text-brand-gold/70'}`}>
                    {link.icon}
                  </span>
                  {link.label}
                </button>
              ))}
           </div>
        </div>

        {/* Right Actions: Login + Burger Menu Toggle */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => handleLinkClick('#warroom')}
            className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-900/40 hover:text-brand-gold transition-colors flex items-center gap-2 group"
          >
            LOGIN
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Burger Menu Trigger - Visible below LG */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden w-12 h-12 rounded-full burger-circle flex items-center justify-center text-brand-gold shadow-2xl border border-white/10 hover:scale-110 active:scale-95 transition-all"
            aria-label="Toggle Menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div className={`fixed inset-0 z-[200] mobile-drawer flex flex-col transition-all duration-500 transform ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
         <div className="flex justify-between items-center px-6 pt-10 mb-10">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-white border border-brand-900/10 p-2">
                  <img src="/logo.png" className="w-full h-full object-contain" alt="IWS" />
               </div>
               <h2 className="text-white font-black text-lg tracking-tighter uppercase">COMMAND CENTER</h2>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/10">
               <X size={24} />
            </button>
         </div>

         <div className="flex flex-col px-6 gap-3 overflow-y-auto pb-20">
            {navLinks.map((link) => (
              <button
                key={link.hash}
                onClick={() => handleLinkClick(link.hash)}
                className={`
                  flex items-center justify-between w-full p-5 rounded-2xl text-left transition-all duration-300 border
                  ${link.isWarRoom 
                    ? 'tactical-red text-white border-transparent shadow-2xl' 
                    : activeHash === link.hash 
                      ? 'bg-brand-gold text-brand-900 border-transparent shadow-xl scale-105' 
                      : 'bg-white/5 text-brand-100 border-white/5'}
                `}
              >
                <div className="flex items-center gap-4">
                   <div className={`p-3 rounded-xl ${activeHash === link.hash ? 'bg-brand-900/10' : 'bg-white/10'}`}>
                      {link.icon}
                   </div>
                   <span className="text-xs font-black uppercase tracking-widest">{link.label}</span>
                </div>
                <ArrowRight size={18} className="opacity-40" />
              </button>
            ))}
            
            <button 
              onClick={() => handleLinkClick('#warroom')}
              className="mt-6 flex items-center justify-center gap-3 w-full p-6 rounded-2xl bg-white text-brand-900 font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl border border-white/20 active:scale-95 transition-transform"
            >
              <LogIn size={18} /> SECURE LOGIN
            </button>
         </div>
         
         <div className="mt-auto p-10 text-center opacity-30">
            <p className="text-[9px] font-black text-white uppercase tracking-[0.5em]">Sovereign Defense Protocol Active</p>
         </div>
      </div>
    </nav>
  );
};

export default Navbar;
