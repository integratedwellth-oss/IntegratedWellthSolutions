import React from 'react';
import FinancialHealthScore from '../FinancialHealthScore';

const AssessmentPage: React.FC = () => {
  return (
    <div className="pt-40 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-sora font-extrabold text-brand-900 mb-12">
          Sovereign <span className="text-brand-gold italic">Diagnostic.</span>
        </h1>
        {/* Pass props to render as a static section */}
        <FinancialHealthScore isOpen={true} onClose={() => {}} isModal={false} />
      </div>
    </div>
  );
};

export default AssessmentPage;
