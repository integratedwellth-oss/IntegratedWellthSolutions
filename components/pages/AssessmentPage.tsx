import React from 'react';
import FinancialHealthScore from '../FinancialHealthScore';
import RevealOnScroll from '../RevealOnScroll';
import { Zap } from 'lucide-react';

const AssessmentPage: React.FC = () => {
  return (
    <div className="pt-40 pb-24 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16 space-y-4">
            <div className="flex items-center justify-center gap-3 text-brand-gold font-black uppercase tracking-[0.4em] text-[10px]">
              <Zap size={16} className="animate-pulse" />
              <span>Sovereign Diagnostic Protocol</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-sora font-extrabold text-brand-900 tracking-tighter leading-none">
              Financial Health <span className="text-brand-gold italic">Diagnostic.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              Initialize your path through the 2026 Watershed. Measure your technical IQ and behavioral EQ readiness.
            </p>
          </div>
        </RevealOnScroll>

        {/* CRITICAL: Passing isOpen={true} and isModal={false} 
            Ensures the tool renders as a page section, not a hidden popup.
        */}
        <div className="relative z-10">
          <FinancialHealthScore 
            isOpen={true} 
            onClose={() => {}} 
            isModal={false} 
          />
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">
            End-to-End Encryption Enabled • POPIA Compliant Data Sync
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
