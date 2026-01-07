import React from 'react';
import FinancialHealthScore from '../FinancialHealthScore';

const AssessmentPage: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-sora font-extrabold text-brand-900 tracking-tighter mb-4">
            Financial Health <span className="text-brand-gold italic">Diagnostic.</span>
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Measure your readiness for the 2026 SARS AI transition.
          </p>
        </div>
        
        {/* Render the core tool as a standard section, not a modal */}
        <FinancialHealthScore isOpen={true} onClose={() => {}} isModal={false} />
      </div>
    </div>
  );
};

export default AssessmentPage;
