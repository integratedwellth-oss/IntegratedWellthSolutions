import React, { useState } from 'react';
import { X, ArrowRight, Download, CheckCircle2, ShieldCheck, Sparkles, Lock, FileCheck } from 'lucide-react';
import { downloadFounderChecklistPDF } from '../services/exportService';
import { submitLeadMagnet } from '../services/leadMagnetService';
import { CONTACT_INFO } from '../constants';

interface EventPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventPopup: React.FC<EventPopupProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName) return;

    setIsSubmitting(true);
    await submitLeadMagnet({
      fullName,
      email,
      businessName,
      source: 'lead_magnet_popup'
    });

    // Trigger instant PDF download
    downloadFounderChecklistPDF(fullName);

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleGoToChecklistPage = () => {
    onClose();
    window.location.hash = '#checklist';
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 bg-brand-900/90 backdrop-blur-xl animate-fadeIn">
      {/* Background click overlay */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative bg-white rounded-[2rem] md:rounded-[2.5rem] w-full max-w-4xl flex flex-col md:flex-row overflow-hidden shadow-2xl z-10 border border-brand-gold/30">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2.5 bg-slate-100/90 hover:bg-brand-900 hover:text-white rounded-full transition-all text-brand-900 shadow-md"
          aria-label="Close popup"
        >
          <X size={20} />
        </button>

        {/* Visual / Left Side - Authoritative Accounting Editorial */}
        <div className="md:w-5/12 bg-gradient-to-br from-brand-900 via-teal-950 to-brand-900 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden text-white border-b md:border-b-0 md:border-r border-brand-gold/20">
          
          {/* Subtle background radial lighting */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-[10px] font-black uppercase tracking-widest mb-4">
              <ShieldCheck size={13} className="text-brand-gold" />
              CIBA & SARS Practice Framework
            </div>

            <h3 className="text-xl md:text-2xl font-sora font-extrabold text-white tracking-tight leading-snug mb-3">
              The Founder’s <br/>
              <span className="text-brand-gold">Financial Self-Care</span> <br/>
              Checklist
            </h3>

            <p className="text-brand-100/80 text-xs font-medium leading-relaxed mb-6">
              5 strategic steps to bridge founder mental well-being with audit-ready books & IFRS for SMEs compliance.
            </p>

            {/* Checklist Cover Preview Card */}
            <div className="relative group rounded-xl overflow-hidden shadow-2xl border-2 border-brand-gold/40 max-w-[200px] mx-auto bg-slate-900/60 transition-transform duration-500 hover:scale-105">
              <img 
                src="/lead_magnet_cover.jpg" 
                alt="The Founder's Financial Self-Care Checklist Cover" 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  // Fallback preview styling if image not served
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="p-3 bg-brand-900/95 border-t border-brand-gold/20 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold">5-Step Protocol</p>
                <p className="text-[9px] text-white/70">Marcia Kgaphola, Founder</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-brand-100/60 font-semibold uppercase tracking-wider">
            <span>IFRS for SMEs</span>
            <span>•</span>
            <span>Audit-Ready</span>
            <span>•</span>
            <span>Zero Anxiety</span>
          </div>
        </div>

        {/* Content / Right Side - High Conversion Lead Capture */}
        <div className="md:w-7/12 p-6 md:p-10 flex flex-col justify-center bg-white">
          
          {!isSuccess ? (
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-black uppercase tracking-widest mb-4">
                <Sparkles size={13} className="text-emerald-600" />
                Free Executive Resource
              </div>

              <h2 className="text-2xl md:text-3xl font-sora font-extrabold text-brand-900 mb-3 tracking-tight leading-tight">
                Stop Messy Books From Stealing Your <span className="text-brand-gold">Peace Of Mind.</span>
              </h2>

              <p className="text-slate-600 text-xs md:text-sm mb-6 leading-relaxed">
                In South Africa, messy bookkeeping and delayed compliance kill tenders and funding. Download our 5-step psychological & accounting self-care protocol today.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-brand-900 mb-1">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sipho Ndlovu" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-brand-900 text-sm font-medium focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-brand-900 mb-1">
                    Business / Work Email <span className="text-rose-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sipho@company.co.za" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-brand-900 text-sm font-medium focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">
                    Company / Entity Name <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input 
                    type="text" 
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Apex Holdings (Pty) Ltd" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-brand-900 text-sm font-medium focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-brand-900 hover:bg-brand-gold hover:text-brand-900 text-white font-black uppercase tracking-widest text-xs py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-75"
                >
                  <Download size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                  {isSubmitting ? 'Generating Secure PDF...' : 'Download The 5-Step Checklist (PDF)'}
                </button>
              </form>

              <div className="mt-4 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <Lock size={12} className="text-slate-400" />
                  POPIA Compliant • Zero Spam
                </span>
                <button
                  type="button"
                  onClick={handleGoToChecklistPage}
                  className="text-brand-900 font-bold hover:text-brand-gold underline uppercase tracking-wider"
                >
                  Explore Interactive Guide →
                </button>
              </div>
            </div>
          ) : (
            /* Success State */
            <div className="text-center py-4 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-5 border-2 border-emerald-300">
                <CheckCircle2 size={36} />
              </div>

              <h3 className="text-2xl font-sora font-extrabold text-brand-900 mb-2">
                Checklist Downloaded!
              </h3>
              
              <p className="text-slate-600 text-xs md:text-sm max-w-md mx-auto mb-6 leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Your copy of <em>The Founder’s Financial Self-Care Checklist</em> has downloaded directly to your device.
              </p>

              <div className="bg-brand-50 rounded-2xl p-5 border border-brand-900/10 mb-6 text-left space-y-2.5">
                <p className="text-xs font-black uppercase tracking-wider text-brand-900 flex items-center gap-2">
                  <FileCheck size={16} className="text-brand-gold" />
                  What to do next:
                </p>
                <ul className="text-xs text-slate-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>Review the <strong>5 Psychology & Action Steps</strong> with your leadership team.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>Run the 60-second interactive compliance check on our portal.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleGoToChecklistPage}
                  className="flex-1 bg-brand-900 text-white font-black uppercase tracking-widest text-xs py-3.5 px-4 rounded-xl hover:bg-brand-gold hover:text-brand-900 transition-all flex items-center justify-center gap-2"
                >
                  Open Interactive Guide <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => window.open(CONTACT_INFO.calendlyUrl, '_blank')}
                  className="flex-1 bg-brand-gold text-brand-900 font-black uppercase tracking-widest text-xs py-3.5 px-4 rounded-xl hover:bg-white hover:border hover:border-brand-gold transition-all flex items-center justify-center gap-2"
                >
                  Book Marcia Directly
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default EventPopup;
