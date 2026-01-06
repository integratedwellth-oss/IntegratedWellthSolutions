import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';
import { CONTACT_INFO } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openCalendly = () => {
    // @ts-ignore
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({ url: CONTACT_INFO.calendlyUrl });
    } else {
      window.open(CONTACT_INFO.calendlyUrl, '_blank');
    }
    setIsOpen(false);
  };

  const handleRouteClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  const navLinkClass = (path: string) => `
    relative px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-full
    ${location.pathname === path 
      ? 'bg-brand-gold text-brand-900 shadow-inner' 
      : 'text-white/70 hover:text-white hover:bg-white/5'}
  `;

  return (
    <div className="fixed w-full z-[100] flex justify-center px-4 md:px-0 pointer-events-none pt-6">
      {/* Floating Pill Container */}
      <nav className={`
        pointer-events-auto flex items-center justify-between transition-all duration-500 ease-in-out
        bg-brand-900/70 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)]
        ${isScrolled ? 'w-[95%] md:w-[85%] lg:w-[75%] px-6 py-2' : 'w-full md:w-[90%] lg:w-[85%] px-8 py-4'}
      `}>
        
        {/* Logo Section */}
        <div 
          className="flex-shrink-0 flex items-center cursor-pointer group" 
          onClick={() => handleRouteClick('/')}
        >
          <img 
            src="https://res.cloudinary.com/dka0498ns/image/upload/v1765049634/Integrated_Wellth_Solutions_Logo_bodmyc.png" 
            alt="IWS Logo" 
            className={`transition-all duration-500 object-contain ${isScrolled ? 'h-10' : 'h-12'}`}
          />
        </div>
        
        {/* Desktop Links (Bento-style modules) */}
        <div className="hidden lg:flex items-center gap-1">
          <button onClick={() => handleRouteClick('/home')} className={navLinkClass('/home')}>Home</button>
          <button onClick={() => handleRouteClick('/who-we-help')} className={navLinkClass('/who-we-help')}>Solutions</button>
          <button onClick={() => handleRouteClick('/team')} className={navLinkClass('/team')}>Team</button>
          <button onClick={() => handleRouteClick('/services')} className={navLinkClass('/services')}>Services</button>
          <button onClick={() => handleRouteClick('/workshops')} className={navLinkClass('/workshops')}>Workshops</button>
          <button onClick={() => handleRouteClick('/blog')} className={navLinkClass('/blog')}>Insights</button>
          <button onClick={() => handleRouteClick('/contact')} className={navLinkClass('/contact')}>Contact</button>
        </div>

        {/* Action Section */}
        <div className="flex items-center gap-4">
          <Button 
            onClick={openCalendly} 
            variant="primary" 
            className="hidden sm:flex items-center gap-2 rounded-full px-6 py-2.5 bg-brand-gold text-brand-900 font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-lg"
          >
            <Calendar size={14} />
            Protocol Access
          </Button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Matching Glassmorphic Aesthetic */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-[90] bg-brand-900/95 backdrop-blur-2xl flex flex-col justify-center items-center space-y-8 animate-fadeIn pointer-events-auto">
          <button onClick={() => handleRouteClick('/home')} className="text-3xl font-black uppercase text-brand-gold tracking-tighter italic">Home</button>
          <button onClick={() => handleRouteClick('/who-we-help')} className="text-3xl font-black uppercase text-white tracking-tighter">Solutions</button>
          <button onClick={() => handleRouteClick('/team')} className="text-3xl font-black uppercase text-white tracking-tighter">Team</button>
          <button onClick={() => handleRouteClick('/services')} className="text-3xl font-black uppercase text-white tracking-tighter">Services</button>
          <button onClick={() => handleRouteClick('/workshops')} className="text-3xl font-black uppercase text-white tracking-tighter">Workshops</button>
          <button onClick={() => handleRouteClick('/contact')} className="text-3xl font-black uppercase text-white tracking-tighter">Contact</button>
          
          <div className="pt-8">
            <Button onClick={openCalendly} size="lg" className="rounded-full px-12 py-5 bg-brand-gold text-brand-900 font-black">
              Book Protocol Session
            </Button>
          </div>
          
          <button onClick={() => setIsOpen(false)} className="absolute top-10 right-10 text-white hover:rotate-90 transition-transform">
            <X size={40} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
