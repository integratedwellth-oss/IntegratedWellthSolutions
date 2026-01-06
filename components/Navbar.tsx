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
    window.open(CONTACT_INFO.calendlyUrl, '_blank');
    setIsOpen(false);
  };

  const handleRouteClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  // DOUBLED FONT SIZE: Changed from text-[10px] to text-lg
  const navLinkClass = (path: string) => `
    relative px-6 py-3 text-lg font-black uppercase tracking-tight transition-all duration-300 rounded-full
    ${location.pathname === path 
      ? 'bg-brand-gold text-brand-900 shadow-xl scale-105' 
      : 'text-white/80 hover:text-white hover:bg-white/10'}
  `;

  return (
    <div className="fixed w-full z-[100] flex justify-center px-4 md:px-0 pointer-events-none pt-8">
      <nav className={`
        pointer-events-auto flex items-center justify-between transition-all duration-500 ease-in-out
        bg-brand-900/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.4)]
        ${isScrolled ? 'w-[98%] md:w-[92%] lg:w-[85%] px-8 py-3' : 'w-full md:w-[95%] lg:w-[90%] px-10 py-6'}
      `}>
        
        <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => handleRouteClick('/')}>
          <img 
            src="https://res.cloudinary.com/dka0498ns/image/upload/v1765049634/Integrated_Wellth_Solutions_Logo_bodmyc.png" 
            alt="IWS Logo" 
            className={`transition-all duration-500 object-contain ${isScrolled ? 'h-12' : 'h-16'}`}
          />
        </div>
        
        <div className="hidden xl:flex items-center gap-2">
          <button onClick={() => handleRouteClick('/home')} className={navLinkClass('/home')}>Home</button>
          <button onClick={() => handleRouteClick('/who-we-help')} className={navLinkClass('/who-we-help')}>Solutions</button>
          <button onClick={() => handleRouteClick('/team')} className={navLinkClass('/team')}>Team</button>
          <button onClick={() => handleRouteClick('/services')} className={navLinkClass('/services')}>Services</button>
          <button onClick={() => handleRouteClick('/workshops')} className={navLinkClass('/workshops')}>Workshops</button>
          <button onClick={() => handleRouteClick('/blog')} className={navLinkClass('/blog')}>Insights</button>
          <button onClick={() => handleRouteClick('/contact')} className={navLinkClass('/contact')}>Contact</button>
        </div>

        <div className="flex items-center gap-6">
          <Button 
            onClick={openCalendly} 
            className="hidden md:flex items-center gap-3 rounded-full px-8 py-4 bg-brand-gold text-brand-900 font-black uppercase text-sm tracking-tighter hover:scale-110 transition-all shadow-2xl"
          >
            <Calendar size={20} />
            Protocol Access
          </Button>

          <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden text-white p-3 hover:bg-white/10 rounded-full transition-colors">
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="xl:hidden fixed inset-0 z-[90] bg-brand-900/98 backdrop-blur-3xl flex flex-col justify-center items-center space-y-10 animate-fadeIn pointer-events-auto">
          <button onClick={() => handleRouteClick('/home')} className="text-4xl font-black uppercase text-brand-gold italic">Home</button>
          <button onClick={() => handleRouteClick('/who-we-help')} className="text-4xl font-black uppercase text-white">Solutions</button>
          <button onClick={() => handleRouteClick('/team')} className="text-4xl font-black uppercase text-white">Team</button>
          <button onClick={() => handleRouteClick('/services')} className="text-4xl font-black uppercase text-white">Services</button>
          <button onClick={() => handleRouteClick('/contact')} className="text-4xl font-black uppercase text-white">Contact</button>
          <Button onClick={openCalendly} size="lg" className="rounded-full px-16 py-6 bg-brand-gold text-brand-900 font-black text-xl">Book Protocol Session</Button>
          <button onClick={() => setIsOpen(false)} className="absolute top-12 right-12 text-white"><X size={48} /></button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
