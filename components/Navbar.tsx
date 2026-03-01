import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, ArrowRight, Lock } from 'lucide-react';
import Button from './Button';

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
    { name: 'Solutions', view: 'services' },
    { name: 'Who We Help', view: 'who-we-help' },
    { name: 'Identity', view: 'team' },
    { name: 'Workshops', view: 'workshops' },
    { name: 'Intelligence', view: 'blog' },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${
      scrolled ? 'py-4 bg-white/80 backdrop-blur-xl shadow-lg' : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-brand-900 rounded-xl flex items-center justify-center text-brand-gold shadow-lg group-hover:scale-110 transition-transform">
            <Shield size={20} fill="currentColor" />
          </div>
          <span className="font-sora font-black text-xl tracking-tighter text-brand-900">
            INTEGRATED<span className="text-brand-gold italic">WELLTH</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => onNavigate(link.view)}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-900/60 hover:text-brand-900 transition-colors"
            >
              {link.name}
            </button>
          ))}
          
          <div className="h-4 w-px bg-brand-900/10 mx-2" />
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onNavigate('my-intel')}
            className="rounded-full border-brand-900/10 text-brand-900 hover:bg-brand-900 hover:text-white"
          >
            <Lock size={12} className="mr-2" /> Client Portal
          </Button>
          
          <Button 
            size="sm" 
            onClick={() => window.location.hash = '#assessment'}
            className="rounded-full bg-brand-gold text-brand-900 hover:bg-brand-900 hover:text-white group"
          >
            Start Audit <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2 text-brand-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 p-8 flex flex-col gap-6 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => { onNavigate(link.view); setIsOpen(false); }}
              className="text-left text-xl font-black uppercase tracking-tighter text-brand-900"
            >
              {link.name}
            </button>
          ))}
          <Button onClick={() => { onNavigate('my-intel'); setIsOpen(false); }}>
             Command Center
          </Button>
          <Button variant="secondary" onClick={() => { window.location.hash = '#assessment'; setIsOpen(false); }}>
             Execute Audit <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
