import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Zap } from 'lucide-react';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 flex justify-center px-6">
      <div className="nav-capsule">
        <Link to="/" className="flex items-center mr-4 group">
           <div className="bg-white p-1.5 rounded-lg shadow-sm group-hover:rotate-12 transition-transform">
             <Zap size={18} className="text-[#1a4d4d]" />
           </div>
        </Link>
        
        <div className="hidden lg:flex items-center gap-4">
          <Link to="/" className={`nav-link ${pathname === '/' ? 'nav-link-active' : ''}`}>Base</Link>
          <Link to="/team" className={`nav-link ${pathname === '/team' ? 'nav-link-active' : ''}`}>The Architects</Link>
          <Link to="/war-room" className={`nav-link ${pathname === '/war-room' ? 'nav-link-active' : ''}`}>Analysis</Link>
        </div>

        <Link to="/war-room" className="btn-war-room">
          <Shield size={14} /> War Room
        </Link>
      </div>
    </nav>
  );
}
