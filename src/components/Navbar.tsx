import React from 'react';
import { Shield, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-[#05070a]/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="text-[#C5A059]" size={24} />
          <span className="text-white font-black uppercase tracking-tighter text-xl">IWS Sovereignty</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          <a href="/" className="hover:text-[#C5A059] transition-colors">Intelligence</a>
          <a href="/war-room" className="hover:text-[#C5A059] transition-colors">War Room</a>
          <a href="/contact" className="hover:text-[#C5A059] transition-colors">Contact</a>
        </div>
        <Menu className="text-white md:hidden" size={20} />
      </div>
    </nav>
  );
}
