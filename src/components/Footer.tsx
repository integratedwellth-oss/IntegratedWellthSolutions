import React from 'react';
import { Mail, MapPin, Phone, Linkedin, Lock, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-slate-950 text-white pt-24 pb-10 px-6 border-t border-white/5 font-inter">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 mb-20">
        
        {/* BRAND COLUMN */}
        <div className="md:col-span-5 space-y-6">
          <img 
            src="https://res.cloudinary.com/dka0498ns/image/upload/v1765049634/Integrated_Wellth_Solutions_Logo_bodmyc.png" 
            alt="IWS Logo" 
            className="h-12 object-contain brightness-0 invert" 
          />
          <p className="text-slate-400 leading-relaxed max-w-sm font-medium">
            Bridging the gap between Technical IQ and Behavioral EQ. 
            We engineer legacies that survive the founder.
          </p>
          <div className="flex gap-4 pt-4">
             <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-900 transition-all">
                <Linkedin size={18} />
             </a>
          </div>
        </div>

        {/* NAVIGATION COLUMN */}
        <div className="md:col-span-3">
          <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-8">Directory</h4>
          <div className="flex flex-col gap-4 text-sm text-slate-400 font-medium">
            <button onClick={() => navigate('/')} className="text-left hover:text-brand-gold transition-colors flex items-center gap-2 group">
              Base <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button onClick={() => navigate('/who-we-help')} className="text-left hover:text-brand-gold transition-colors flex items-center gap-2 group">
              Solutions <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button onClick={() => navigate('/services')} className="text-left hover:text-brand-gold transition-colors flex items-center gap-2 group">
              Services <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button onClick={() => navigate('/war-room')} className="text-left text-red-400 hover:text-red-300 transition-colors flex items-center gap-2 font-bold">
              The War Room
            </button>
          </div>
        </div>

        {/* CONTACT COLUMN - UPDATED ADDRESS */}
        <div className="md:col-span-4">
          <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-8">Secure Comms</h4>
          <div className="flex flex-col gap-6 text-sm text-slate-400">
            <div className="flex items-start gap-4">
              <MapPin size={20} className="text-brand-gold mt-1 flex-shrink-0" />
              <span className="leading-relaxed">574 Fred Messenger Avenue,<br/>Pretoria, South Africa</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail size={20} className="text-brand-gold flex-shrink-0" />
              <span>enquiries@integratedwellth.co.za</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone size={20} className="text-brand-gold flex-shrink-0" />
              <span>+27 74 494 0771</span>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 uppercase tracking-widest font-bold">
        <div>© 2026 Integrated Wellth Solutions. All Rights Reserved.</div>
        <button onClick={() => navigate('/command')} className="hover:text-emerald-500 transition-colors flex items-center gap-2">
          <Lock size={12} /> Command Login
        </button>
      </div>
    </footer>
  );
};

export default Footer;
