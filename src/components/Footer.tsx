import React from 'react';
import { Target, Mail, MapPin, Phone, Linkedin, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-brand-900 text-white pt-20 pb-10 px-6 border-t border-brand-gold/20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
        
        {/* BRAND */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <img 
              src="https://res.cloudinary.com/dka0498ns/image/upload/v1765049634/Integrated_Wellth_Solutions_Logo_bodmyc.png" 
              alt="IWS Logo" 
              className="h-10 object-contain brightness-0 invert" 
            />
          </div>
          <p className="text-brand-50/60 leading-relaxed max-w-sm">
            Bridging the gap between Technical IQ and Behavioral EQ. 
            We engineer legacies that survive the founder.
          </p>
        </div>

        {/* NAVIGATION */}
        <div>
          <h4 className="font-bold text-brand-gold uppercase tracking-widest text-xs mb-6">Navigation</h4>
          <div className="flex flex-col gap-4 text-sm text-brand-50/70">
            <button onClick={() => navigate('/')} className="text-left hover:text-white transition-colors">Base</button>
            <button onClick={() => navigate('/services')} className="text-left hover:text-white transition-colors">Services</button>
            <button onClick={() => navigate('/who-we-help')} className="text-left hover:text-white transition-colors">Solutions</button>
            <button onClick={() => navigate('/war-room')} className="text-left hover:text-red-400 transition-colors text-red-300">The War Room</button>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="font-bold text-brand-gold uppercase tracking-widest text-xs mb-6">Comms</h4>
          <div className="flex flex-col gap-4 text-sm text-brand-50/70">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-brand-gold" />
              <span>enquiries@integratedwellth.co.za</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-brand-gold" />
              <span>+27 74 494 0771</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-brand-gold mt-1" />
              <span>Munyaka Lifestyle Estate, Waterfall City</span>
            </div>
          </div>
        </div>

      </div>

      {/* COPYRIGHT BAR */}
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-50/40 uppercase tracking-widest font-bold">
        <div>© 2026 Integrated Wellth Solutions.</div>
        <div className="flex items-center gap-6">
          <button onClick={() => window.open('https://linkedin.com', '_blank')} className="hover:text-white"><Linkedin size={16} /></button>
          <button onClick={() => navigate('/command')} className="hover:text-emerald-500 transition-colors flex items-center gap-2">
            <Lock size={12} /> Command
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
