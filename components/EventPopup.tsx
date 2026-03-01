import React from 'react';
import { X, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import Button from './Button';

interface EventPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventPopup: React.FC<EventPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleAction = () => {
    onClose();
    window.location.hash = '#assessment';
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-brand-900/90 backdrop-blur-xl animate-fadeIn">
      <div className="relative bg-white rounded-[2.5rem] w-full max-w-5xl flex flex-col md:flex-row overflow-hidden shadow-2xl">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-white/20 hover:bg-brand-900 hover:text-white rounded-full transition-all text-brand-900"
        >
          <X size={24} />
        </button>

        {/* Visual Side */}
        <div className="md:w-2/5 bg-brand-900 relative flex items-center justify-center p-8 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold via-brand-900 to-brand-900"></div>
          <div className="relative z-10 text-center">
            <ShieldAlert size={80} className="text-brand-gold mx-auto mb-6 animate-pulse" />
            <h3 className="text-white font-black text-2xl uppercase tracking-widest mb-2">System Alert</h3>
            <p className="text-brand-gold/80 text-sm font-mono">NON-COMPLIANCE RISK DETECTED</p>
          </div>
        </div>

        {/* Content Side */}
        <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-widest w-fit mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
            Critical Action Required
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black text-brand-900 mb-6 uppercase tracking-tight leading-none">
            Is your entity <br/><span className="text-brand-gold">Audit-Ready?</span>
          </h2>
          
          <p className="text-brand-900/60 mb-8 font-medium leading-relaxed">
            The 2026 Regulatory Framework has shifted. Use our proprietary diagnostic tool to check your CIPC, SARS, and Governance standing in 60 seconds.
          </p>

          <ul className="space-y-3 mb-10">
            {['Risk Profile Analysis', 'Penalty Prevention Check', 'Good Standing Verification'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-bold text-brand-900">
                <CheckCircle2 size={18} className="text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>

          <Button onClick={handleAction} size="lg" className="w-full md:w-auto bg-brand-900 text-white hover:bg-brand-gold hover:text-brand-900 shadow-xl">
            Start Free Compliance Audit <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>

      </div>
    </div>
  );
};

export default EventPopup;
