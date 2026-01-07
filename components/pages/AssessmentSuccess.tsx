import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Calendar, ArrowRight, Zap, Mail, ShieldCheck } from 'lucide-react';
import Button from '../Button';
import RevealOnScroll from '../RevealOnScroll';
import { CONTACT_INFO } from '../../constants';

const AssessmentSuccess: React.FC<{ email?: string; businessName?: string }> = ({ 
  email = "your inbox", 
  businessName = "your business" 
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <RevealOnScroll>
          <div className="text-center space-y-8">
            {/* 1. Status Indicator */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-brand-gold/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
              <div className="relative bg-brand-900 text-brand-gold p-8 rounded-[2.5rem] shadow-2xl border border-white/10">
                <ShieldCheck size={64} strokeWidth={1.5} />
              </div>
            </div>

            {/* 2. Primary Confirmation */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 text-brand-gold font-black uppercase tracking-[0.4em] text-[10px]">
                <Zap size={16} className="animate-pulse" />
                <span>Protocol Initialized Successfully</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-sora font-extrabold text-brand-900 tracking-tighter leading-none">
                Roadmap <span className="text-brand-gold italic">Deployed.</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
                Strategic advice for <span className="text-brand-900 font-bold">{businessName}</span> has been dispatched to <span className="text-brand-gold font-bold">{email}</span>.
              </p>
            </div>

            {/* 3. High-Priority Action Modules */}
            <div className="grid md:grid-cols-2 gap-8 pt-8">
              {/* Discovery Call Card */}
              <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 hover:shadow-2xl transition-all group text-left flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 bg-brand-900 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-brand-900 transition-colors">
                    <Mail size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-900 mb-2">Resolve Isolation</h3>
                  <p className="text-gray-600 font-medium mb-8">
                    Don't navigate the 2026 Watershed alone. Initialize a free 30-minute discovery call with our "Fellow Traveler" advisors.
                  </p>
                </div>
                <Button 
                  onClick={() => window.open(CONTACT_INFO.calendlyUrl, '_blank')}
                  className="w-full rounded-full py-4 bg-brand-900 text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
                >
                  Book Discovery Call <ArrowRight size={14} />
                </Button>
              </div>

              {/* Workshop Card */}
              <div className="bg-brand-900 p-10 rounded-[3rem] shadow-2xl text-left flex flex-col justify-between h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none">
                  <Calendar size={200} className="text-white" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-brand-gold text-brand-900 rounded-2xl flex items-center justify-center mb-6">
                    <Calendar size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 italic text-brand-gold">Financial Clarity</h3>
                  <p className="text-white/70 font-medium mb-8">
                    Secure your seat for our Feb 28th workshop at Munyaka. Demystify compliance and engineering your business for scale.
                  </p>
                </div>
                <Button 
                  onClick={() => window.open('https://www.quicket.co.za/events/352598-financial-clarity-for-non-financial-business-owners/#/', '_blank')}
                  className="relative z-10 w-full rounded-full py-4 bg-brand-gold text-brand-900 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
                >
                  Register on Quicket <ArrowRight size={14} />
                </Button>
              </div>
            </div>

            {/* 4. Secondary Navigation */}
            <div className="pt-12">
              <button 
                onClick={() => navigate('/home')}
                className="text-xs font-black uppercase tracking-[0.3em] text-brand-900/40 hover:text-brand-900 transition-colors"
              >
                Return to Command Center
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default AssessmentSuccess;
