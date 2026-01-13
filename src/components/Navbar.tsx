import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 flex justify-center px-6">
      <div className="nav-capsule backdrop-blur-md bg-[#1a4d4d]/90">
        <Link to="/" className="flex items-center mr-4">
           <div className="bg-white p-1.5 rounded-lg shadow-inner">
             <img src="/logo.png" alt="IWS" className="h-6 w-6 object-contain" />
           </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`nav-link ${pathname === '/' ? 'nav-link-active' : ''}`}>Base</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/solutions" className="nav-link">Solutions</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/team" className={`nav-link ${pathname === '/team' ? 'nav-link-active' : ''}`}>Team</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <Link to="/war-room" className="btn-war-room ml-4">
          <Shield size={14} /> War Room
        </Link>
      </div>
    </nav>
  );
}
