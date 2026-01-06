
import React from 'react';
import Services from '../Services';
import NewsTicker from '../NewsTicker';

const ServicesPage: React.FC = () => {
  return (
    <div className="pt-20 bg-white min-h-screen">
      <div className="bg-brand-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-sora">Our Services</h1>
          <p className="text-xl text-brand-100 max-w-2xl mx-auto">
            Comprehensive solutions bridging technical financial expertise with psychological wellness.
          </p>
        </div>
      </div>
      <NewsTicker />
      <Services />
    </div>
  );
};

export default ServicesPage;
