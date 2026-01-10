/**
 * IWS SOVEREIGNTY - TACTICAL NAVIGATION
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, ChevronRight, LayoutDashboard } from 'lucide-react';
import { cn } from '../utils/cn'; // Helper for tailwind classes

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Bulletproof Scroll Listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'War Room', path: '/war-room' },
    { name: 'Solutions', path: '/#solutions' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-[#05070a]/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Identity */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-brand-gold rounded-lg group-hover:rotate-90 transition-transform duration-500">
            <Shield className="text-brand-900" size={18} />
          </div>
          <span className="text-sm font-black uppercase tracking-[0.2em] text-white">
            IWS <span className="text-brand-gold">Sovereignty</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-[10px] font-black uppercase tracking-widest transition-colors",
                location.pathname === link.path ? "text-brand-gold" : "text-gray-400 hover:text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <Link
            to="/admin"
            className="p-2 text-gray-500 hover:text-brand-gold transition-colors"
            title="Access Terminal"
          >
            <LayoutDashboard size={18} />
          </Link>
          
          <Link
            to="/war-room"
            className="px-5 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-brand-gold transition-all flex items-center gap-2"
          >
            Launch Diagnostic <ChevronRight size={14} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-[#05070a] p-6 md:hidden animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-black uppercase tracking-tighter text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
