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
    // Using the official IWS Calendly link
    window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank');
    setIsOpen(false);
  };

  const handleRouteClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  // Industry Standard Font Size: text-sm (14px) with bold weights
  const navLinkClass = (path: string) => `
    relative px-5 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-full
    ${location.pathname === path 
      ? 'bg-brand-gold text-brand-900 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]' 
      : 'text-white/90 hover:text-white hover:bg-white/10'}
  `;

  return (
    <div className="fixed w-full z-[100] flex justify-center px-4 md:px-0 pointer-events-none pt-6">
      <nav className={`
        pointer-events-auto flex items-center justify-between transition-all duration-500 ease-in-out
        /* Glossy Glassmorphic Base */
        bg-gradient-to-b from-brand-900/90 to-brand-900/70 backdrop-blur-xl 
        border-t border-white/20 border-x border-white/10 border-b border-black/30
        rounded-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]
        ${isScrolled ? 'w-[95%] md:w-[85%] lg:w-[75%] px-6 py-2' : 'w-full md:w-[92%] lg:w-[85%] px-8 py-3'}
      `}>
        
        {/* Logo Section */}
        <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => handleRouteClick('/')}>
          <img 
            src="https://res.cloudinary.com/dka0498ns/image/upload/v1765049634/Integrated_Wellth_Solutions_Logo_bodmyc.png" 
            alt="IWS Logo" 
            className={`transition-all duration-500 object-contain drop-shadow-md ${isScrolled ? 'h-10' : 'h-12'}`}
          />
        </div>
        
        {/* Desktop Links (Industry Standard Scale) */}
        <div className="hidden xl:flex items-center gap-1">
          <button onClick={() => handleRouteClick('/home')} className={navLinkClass('/home')}>Home</button>
          <button onClick={() => handleRouteClick('/who-we-help')} className={navLinkClass('/who-we-help')}>Solutions</button>
          <button onClick={() => handleRouteClick('/team')} className={navLinkClass('/team')}>Team</button>
          <button onClick={() => handleRouteClick('/services')} className={navLinkClass('/services')}>Services</button>
          <button onClick={() => handleRouteClick('/workshops')} className={navLinkClass('/workshops')}>Workshops</button>
          <button onClick={() => handleRouteClick('/blog')} className={navLinkClass('/blog')}>Insights</button>
          <button onClick={() => handleRouteClick('/contact')} className={navLinkClass('/contact')}>Contact</button>
        </div>

        {/* Updated CTA Section */}
        <div className="flex items-center gap-4">
          <Button 
            onClick={openCalendly} 
            className="hidden md:flex items-center gap-2 rounded-full px-6 py-2.5 bg-brand-gold text-brand-900 font-black uppercase text-[11px] tracking-tight hover:scale-105 transition-all shadow-[0_10px_20px_rgba(212,175,55,0.3)] border-t border-white/30"
          >
            <Calendar size={14} />
            Book a free consultation
          </Button>

          <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="xl:hidden fixed inset-0 z-[90] bg-brand-900/98 backdrop-blur-3xl flex flex-col justify-center items-center space-y-8 animate-fadeIn pointer-events-auto">
          <button onClick={() => handleRouteClick('/home')} className="text-3xl font-black uppercase text-brand-gold italic">Home</button>
          <button onClick={() => handleRouteClick('/who-we-help')} className="text-3xl font-black uppercase text-white">Solutions</button>
          <button onClick={() => handleRouteClick('/team')} className="text-3xl font-black uppercase text-white">Team</button>
          <button onClick={() => handleRouteClick('/services')} className="text-3xl font-black uppercase text-white">Services</button>
          <button onClick={() => handleRouteClick('/contact')} className="text-3xl font-black uppercase text-white">Contact</button>
          
          <div className="pt-6">
            <Button onClick={openCalendly} size="lg" className="rounded-full px-10 py-5 bg-brand-gold text-brand-900 font-black text-sm uppercase tracking-widest">
              Book a free consultation
            </Button>
          </div>
          
          <button onClick={() => setIsOpen(false)} className="absolute top-10 right-10 text-white hover:rotate-90 transition-transform">
            <X size={32} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
