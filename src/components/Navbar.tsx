import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-8 left-0 right-0 z-[100] flex justify-center px-6">
      <div className="nav-capsule flex items-center bg-[#1a4d4d] rounded-full px-6 py-2 shadow-2xl border border-white/10">
        <Link to="/" className="mr-6 flex items-center">
           <img src="/logo.png" alt="IWS" className="h-8 w-auto" />
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="nav-link">Base</Link>
          <Link to="/team" className="nav-link">The Architects</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <Link to="/war-room" className="ml-8 bg-[#ef4444] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform shadow-lg">
          <Shield size={14} fill="white" /> War Room
        </Link>
      </div>
    </nav>
  );
}
