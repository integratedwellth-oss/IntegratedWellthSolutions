import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-8 left-0 right-0 z-50 flex justify-center px-6">
      <div className="nav-capsule">
        <Link to="/" className="flex items-center mr-4">
           <div className="bg-white p-1.5 rounded-lg">
             <img src="/logo.png" alt="IWS" className="h-6 w-6 object-contain" />
           </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="nav-link">Base</Link>
          <Link to="/team" className="nav-link">Team</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <Link to="/war-room" className="btn-red ml-4">
          <Shield size={14} /> War Room
        </Link>
      </div>
    </nav>
  );
}
