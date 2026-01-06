import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';
import { CONTACT_INFO } from '../constants';

interface NavbarProps {
  onNavigate?: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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

  const navLinkClass = (path: string) => `
    text-sm font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer
    ${location.pathname === path 
      ? 'text-brand-gold border-b-2 border-brand-gold pb-1' 
      : 'text-gray-700 hover:text-brand-900'}
  `;

  const handleRouteClick = (path: string) => {
    navigate(path);
    if (onNavigate) onNavigate(path.replace('/', ''));
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-white shadow-xl py-3' : 'bg-white/80 backdrop-blur-md py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => handleRouteClick('/')}>
            <img 
              src="https://res.cloudinary.com/dka0498ns/image/upload/v1765049634/Integrated_Wellth_Solutions_Logo_bodmyc.png" 
              alt="IWS Logo" 
              className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* Desktop Desktop Links - Multi-page Ready */}
          <div className="hidden lg:flex items-center space-x-10">
            <button onClick={() => handleRouteClick('/home')} className={navLinkClass('/home')}>Home</button>
            <button onClick={() => handleRouteClick('/who-we-help')} className={navLinkClass('/who-we-help')}>Solutions</button>
            <button onClick={() => handleRouteClick('/team')} className={navLinkClass('/team')}>Our Team</button>
            <button onClick={() => handleRouteClick('/services')} className={navLinkClass('/services')}>Services</button>
            <button onClick={() => handleRouteClick('/workshops')} className={navLinkClass('/workshops')}>Workshops</button>
            <button onClick={() => handleRouteClick('/blog')} className={navLinkClass('/blog')}>Insights</button>
            <button onClick={() => handleRouteClick('/contact')} className={navLinkClass('/contact')}>Contact</button>
            
            <Button 
              onClick={openCalendly} 
              variant="primary" 
              className="flex items-center gap-2 rounded-full px-6 py-3 bg-brand-900 text-white hover:bg-brand-gold hover:text-brand-900 transition-all shadow-lg"
            >
              <Calendar size={16} />
              <span className="text-xs font-black uppercase">Direct Access</span>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-brand-900 p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Multi-page Ready */}
      {isOpen && (
        <div className="lg:hidden bg-white fixed inset-0 z-[90] flex flex-col justify-center items-center space-y-8 animate-fadeIn">
          <button onClick={() => handleRouteClick('/home')} className="text-2xl font-black uppercase text-brand-900">Home</button>
          <button onClick={() => handleRouteClick('/who-we-help')} className="text-2xl font-black uppercase text-brand-900">Solutions</button>
          <button onClick={() => handleRouteClick('/team')} className="text-2xl font-black uppercase text-brand-900">Our Team</button>
          <button onClick={() => handleRouteClick('/services')} className="text-2xl font-black uppercase text-brand-900">Services</button>
          <button onClick={() => handleRouteClick('/workshops')} className="text-2xl font-black uppercase text-brand-900">Workshops</button>
          <button onClick={() => handleRouteClick('/contact')} className="text-2xl font-black uppercase text-brand-900">Contact</button>
          
          <div className="pt-8">
            <Button onClick={openCalendly} size="lg" className="rounded-full px-12 py-5 bg-brand-gold text-brand-900 font-black">
              Book Consultation
            </Button>
          </div>
          
          <button onClick={() => setIsOpen(false)} className="absolute top-10 right-10 text-brand-900">
            <X size={40} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
