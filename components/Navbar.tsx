import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import Button from './Button';
import { CONTACT_INFO } from '../constants';

interface NavbarProps {
  onNavigate: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const navLinkClass = "text-gray-700 hover:text-brand-600 cursor-pointer transition-colors font-medium";

  const handleLinkClick = (hash: string) => {
    window.location.hash = hash;
    onNavigate(hash.replace('#', ''));
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleLinkClick('#home')}>
            <img 
              src="https://res.cloudinary.com/dka0498ns/image/upload/v1765049634/Integrated_Wellth_Solutions_Logo_bodmyc.png" 
              alt="Integrated Wellth Solutions" 
              className="h-12 w-auto object-contain"
            />
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleLinkClick('#home')} className={navLinkClass}>Home</button>
            <button onClick={() => handleLinkClick('#who-we-help')} className={navLinkClass}>Who We Help</button>
            <button onClick={() => handleLinkClick('#philosophy')} className={navLinkClass}>Philosophy</button>
            <button onClick={() => handleLinkClick('#services')} className={navLinkClass}>Services</button>
            <button onClick={() => handleLinkClick('#upcoming-event')} className={navLinkClass}>Workshops</button>
            <button onClick={() => handleLinkClick('#blog')} className={navLinkClass}>Blog</button>
            <button onClick={() => handleLinkClick('#contact')} className={navLinkClass}>Contact</button>
            <Button onClick={openCalendly} variant="primary" className="flex items-center gap-2">
              <Calendar size={18} />
              Book Consultation
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-brand-600 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            <button onClick={() => handleLinkClick('#home')} className="block px-3 py-2 text-left text-gray-700 hover:bg-brand-50 rounded-md">Home</button>
            <button onClick={() => handleLinkClick('#who-we-help')} className="block px-3 py-2 text-left text-gray-700 hover:bg-brand-50 rounded-md">Who We Help</button>
            <button onClick={() => handleLinkClick('#philosophy')} className="block px-3 py-2 text-left text-gray-700 hover:bg-brand-50 rounded-md">Philosophy</button>
            <button onClick={() => handleLinkClick('#services')} className="block px-3 py-2 text-left text-gray-700 hover:bg-brand-50 rounded-md">Services</button>
            <button onClick={() => handleLinkClick('#upcoming-event')} className="block px-3 py-2 text-left text-gray-700 hover:bg-brand-50 rounded-md">Workshops</button>
            <button onClick={() => handleLinkClick('#blog')} className="block px-3 py-2 text-left text-gray-700 hover:bg-brand-50 rounded-md">Blog</button>
            <button onClick={() => handleLinkClick('#contact')} className="block px-3 py-2 text-left text-gray-700 hover:bg-brand-50 rounded-md">Contact</button>
            <div className="pt-2">
              <Button onClick={openCalendly} className="w-full justify-center">Book Consultation</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;