import React from 'react';
import EventHighlight from '../EventHighlight';
import NewsTicker from '../NewsTicker';

const WorkshopPage: React.FC = () => {
  return (
    <div className="pt-20 bg-white min-h-screen">
      <NewsTicker />
      <div className="py-12">
        <EventHighlight />
      </div>
      <div className="max-w-4xl mx-auto px-4 text-center pb-20">
        <h2 className="text-3xl font-bold text-brand-900 mb-6 font-sora">Gain The Clarity Your Business Deserves</h2>
        <p className="text-lg text-gray-600">
          Our workshops are designed for founders who are experts in their craft but need a stronger grip on the numbers driving their success.
        </p>
      </div>
    </div>
  );
};

export default WorkshopPage;
