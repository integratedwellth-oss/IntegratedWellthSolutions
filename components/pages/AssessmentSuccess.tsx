import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Calendar, Mail, ShieldCheck, Zap } from 'lucide-react';
import Button from '../Button';
import { CONTACT_INFO } from '../../constants';

const AssessmentSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve the data passed from the FinancialHealthScore component
  const { email, enterprise } = location.state || { 
    email: "your inbox", 
    enterprise: "your business" 
  };

  return (
    <div className="pt-40 pb-24 min-h-screen bg-white flex items-center px-6">
      <div className="max-w-4xl mx-auto w-full text-center space-y-12 animate-fadeIn">
        
        {/* Status Protocol */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-brand-gold/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
          <div className="relative bg-brand-900 text-brand-gold p-8 rounded-[2.5rem] shadow-2xl border border-white/10">
            <ShieldCheck size={64} strokeWidth={1.5} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 text-brand-gold font-black uppercase tracking-[0.4em] text-[10px]">
            <Zap size={16} className="animate-pulse" />
            <span>Protocol Initialized Successfully</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-sora font-extrabold text-brand-900 tracking-tighter leading-none uppercase">
            Roadmap <span className="text-brand-gold italic">Deployed.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Strategic intelligence for <span className="text-brand-900 font-bold">{enterprise}</span> has been dispatched to <span className="text-brand-gold font-bold">{email}</span>.
          </p>
        </div>

        {/* Action Grid: Moving from Triage to Mastery */}
        <div className="grid md:grid-cols-2 gap-8 pt-8">
          
          {/* Discovery Call Module */}
          <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 text-left hover:shadow-2xl transition-all group">
            <div className="w-12 h-12 bg-brand-900 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-brand-900 transition-colors">
              <Mail size={24} />
            </div>
            <h3 className="text-2xl font-bold text-brand-900 mb-2">Resolve Isolation</h3>
            <p className="text-gray-600 font-medium mb-8">
              Don't navigate the 2026 Watershed alone. Initialize a free 30-minute discovery call to map your path.
            </p>
            <Button 
              onClick={() => window.open(CONTACT_INFO.calendlyUrl, '_blank')} 
              className="w-full py-4 bg-brand-900 text-white font-black uppercase tracking-widest text-[10px]"
            >
              Book Discovery Call <ArrowRight size={14} className="ml-2" />
            </Button>
          </div>

          {/* Workshop Module */}
          <div className="bg-brand-900 p-10 rounded-[3rem] text-left text-white shadow-2xl relative overflow-hidden">
             <div className="relative z-10">
                <div className="w-12 h-12 bg-brand-gold text-brand-900 rounded-2xl flex items-center justify-center mb-6">
                  <Calendar size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-2 italic text-brand-gold">Financial Clarity</h3>
                <p className="text-white/70 font-medium mb-8">
                  Secure your seat for our Feb 28th workshop at Munyaka. Demystify compliance for scale.
                </p>
                <Button 
                  onClick={() => window.open('https://www.quicket.co.za/events/352598-financial-clarity-for-non-financial-business-owners/#/', '_blank')} 
                  className="w-full py-4 bg-brand-gold text-brand-900 font-black uppercase tracking-widest text-[10px]"
                >
                  Register on Quicket <ArrowRight size={14} className="ml-2" />
                </Button>
             </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/home')} 
          className="text-xs font-black uppercase tracking-[0.3em] text-brand-900/40 hover:text-brand-900 transition-colors pt-8"
        >
          Return to Command Center
        </button>
      </div>
    </div>
  );
};

export default AssessmentSuccess;
