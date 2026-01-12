/**
 * IWS SOVEREIGNTY - RECOVERY TERMINAL (404)
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#05070a] flex items-center justify-center p-6 font-mono text-white">
      <div className="max-w-md w-full text-center space-y-8 bg-[#0a0c12] border border-white/5 p-12 rounded-3xl relative overflow-hidden">
        {/* Visual Background Decal */}
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <ShieldAlert size={120} />
        </div>

        <div className="space-y-4 relative z-10">
          <h1 className="text-6xl font-black text-brand-gold tracking-tighter">404</h1>
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white">Link Compromised</h2>
          <p className="text-[10px] text-gray-500 uppercase leading-relaxed font-bold tracking-widest">
            The requested directory is either restricted or does not exist within the IWS sovereignty framework.
          </p>
        </div>

        <div className="pt-6 relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-brand-gold transition-all"
          >
            <Home size={14} /> Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
