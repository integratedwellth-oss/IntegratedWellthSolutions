import React from 'react';
import Services from '../Services';
import Testimonials from '../Testimonials';

const ServicesPage: React.FC = () => {
  return (
    <div className="pt-20">
      <div className="bg-brand-900 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-sora font-extrabold mb-6 uppercase tracking-tighter">
            Our <span className="text-brand-gold italic">Services.</span>
          </h1>
          <p className="text-xl text-brand-100 max-w-3xl mx-auto font-medium italic">
            Strategic financial intelligence and cognitive resilience for the 2026 watershed.
          </p>
        </div>
      </div>
      <Services />
      <Testimonials />
    </div>
  );
};

export default ServicesPage;
