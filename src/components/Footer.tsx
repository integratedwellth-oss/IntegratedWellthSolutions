/**
 * IWS SOVEREIGNTY - GLOBAL BASELINE (FOOTER)
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ChevronRight, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#030406] border-t border-white/5 pt-20 pb-10 px-6 font-mono">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* Column 1: Brand Identity */}
          <div className="col-span-1 md:col-span-1 space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-1.5 bg-brand-gold rounded">
                <Shield className="text-brand-900" size={16} />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white">
                IWS <span className="text-brand-gold">Sovereignty</span>
              </span>
            </Link>
            <p className="text-[10px] text-gray-500 uppercase leading-relaxed font-bold tracking-widest">
              Engineered for the 1%. Transitioning wealth from reactive to sovereign through behavioral governance.
            </p>
          </div>

          {/* Column 2: The Terminal */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">The Terminal</h4>
            <ul className="space-y-3">
              <li><Link to="/war-room" className="text-[10px] text-gray-500 hover:text-brand-gold transition-colors flex items-center gap-2 uppercase tracking-widest"> <ChevronRight size={10}/> War Room</Link></li>
              <li><Link to="/admin" className="text-[10px] text-gray-500 hover:text-brand-gold transition-colors flex items-center gap-2 uppercase tracking-widest"> <ChevronRight size={10}/> Lead Intelligence</Link></li>
              <li><Link to="/contact" className="text-[10px] text-gray-500 hover:text-brand-gold transition-colors flex items-center gap-2 uppercase tracking-widest"> <ChevronRight size={10}/> Triage Booking</Link></li>
            </ul>
          </div>

          {/* Column 3: Intelligence */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Governance</h4>
            <ul className="space-y-3">
              <li className="text-[10px] text-gray-500 uppercase tracking-widest cursor-not-allowed opacity-50">Tax Optimization (Coming Soon)</li>
              <li className="text-[10px] text-gray-500 uppercase tracking-widest cursor-not-allowed opacity-50">Asset Protection</li>
              <li className="text-[10px] text-gray-500 uppercase tracking-widest cursor-not-allowed opacity-50">Liquidity Strategy</li>
            </ul>
          </div>

          {/* Column 4: Transmission */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Transmission</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-brand-gold hover:bg-white/10 transition-all"><Linkedin size={16} /></a>
              <a href="#" className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-brand-gold hover:bg-white/10 transition-all"><Twitter size={16} /></a>
              <a href="mailto:admin@iws.com" className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-brand-gold hover:bg-white/10 transition-all"><Mail size={16} /></a>
            </div>
            <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest">Direct Link: Secure Line Active</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6">
          <p className="text-[9px] text-gray-600 uppercase tracking-[0.2em]">
            &copy; {currentYear} Integrated Wellth Solutions. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <Link to="/privacy" className="text-[9px] text-gray-600 hover:text-white uppercase tracking-widest">Privacy Protocol</Link>
            <Link to="/terms" className="text-[9px] text-gray-600 hover:text-white uppercase tracking-widest">Terms of Engagement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
