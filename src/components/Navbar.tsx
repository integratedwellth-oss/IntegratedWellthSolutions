import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldAlert } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navTo = (path: string) => {
    navigate(path);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 top-6 flex justify-center pointer-events-none px-4">
      <div className={`
        pointer-events-auto transition-all duration-500 ease-out
        ${scrolled ? 'py-2 px-6 bg-brand-900/95' : 'py-4 px-8 bg-brand-900/85'}
        backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
        rounded-full flex justify-between items-center gap-4 lg:gap-8
        max-w-7xl w-auto
      `}>
        
        {/* LOGO */}
        <div onClick={() => navTo('/')} className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
          <img 
            src="https://res.cloudinary.com/dka0498ns/image/upload/v1765049634/Integrated_Wellth_Solutions_Logo_bodmyc.png" 
            alt="IWS Logo" 
            className={`${scrolled ? 'h-8' : 'h-10'} w-auto object-contain transition-all duration-300`}
          />
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex items-center gap-1">
          {[
            { name: 'Base', path: '/' },
            { name: 'About', path: '/founder' }, // NEW
            { name: 'Solutions', path: '/who-we-help' },
            { name: 'Services', path: '/services' },
            { name: 'Intelligence', path: '/blog' }, // NEW (Blogs)
            { name: 'Gallery', path: '/gallery' },
            { name: 'Contact', path: '/contact' },
          ].map((link) => (
            <button
              key={link.name}
              onClick={() => navTo(link.path)}
              className={`
                px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300
                font-inter
                ${isActive(link.path) 
                  ? 'bg-white text-brand-900 shadow-lg' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'}
              `}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* WAR ROOM BUTTON */}
        <div className="hidden lg:block">
          <button 
            onClick={() => navTo('/war-room')} 
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 transition-all duration-300"
          >
            <ShieldAlert size={14} /> War Room
          </button>
        </div>

        {/* MOBILE TRIGGER */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white p-2">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="fixed inset-0 bg-brand-900/98 backdrop-blur-3xl z-40 flex flex-col items-center justify-center gap-6 pointer-events-auto animate-in fade-in duration-200">
          <button onClick={() => navTo('/')} className="text-2xl font-bold text-white font-sora">Base</button>
          <button onClick={() => navTo('/founder')} className="text-2xl font-bold text-white font-sora">About Founder</button>
          <button onClick={() => navTo('/who-we-help')} className="text-2xl font-bold text-white font-sora">Solutions</button>
          <button onClick={() => navTo('/services')} className="text-2xl font-bold text-white font-sora">Services</button>
          <button onClick={() => navTo('/blog')} className="text-2xl font-bold text-white font-sora">Intelligence</button>
          <button onClick={() => navTo('/gallery')} className="text-2xl font-bold text-white font-sora">Gallery</button>
          <button onClick={() => navTo('/contact')} className="text-2xl font-bold text-white font-sora">Contact</button>
          <div className="w-16 h-1 bg-brand-gold/30 rounded-full my-4"></div>
          <button onClick={() => navTo('/war-room')} className="text-xl font-bold text-red-500 flex items-center gap-3 bg-red-500/10 px-6 py-3 rounded-full border border-red-500/20">
            <ShieldAlert /> War Room
          </button>
          
          <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
            <X size={32} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
