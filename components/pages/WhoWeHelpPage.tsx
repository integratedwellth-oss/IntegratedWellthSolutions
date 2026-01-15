import React from 'react';
import WhoWeHelp from '../WhoWeHelp';
import Audience from '../Audience';
import RevealOnScroll from '../RevealOnScroll';

const WhoWeHelpPage: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <div className="bg-brand-900 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Who We Support</h1>
          <p className="text-xl md:text-2xl text-brand-100 max-w-3xl mx-auto leading-relaxed font-light">
            Tailored strategic support for every stage of your business and personal journey.
          </p>
        </div>
      </div>

      <WhoWeHelp />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll width="100%">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-900 mb-4">The Solution Ecosystem</h2>
                    <p className="text-xl text-gray-600">Select a category below to see detailed service breakdowns.</p>
                </div>
            </RevealOnScroll>
            <Audience />
        </div>
      </section>
    </div>
  );
};

export default WhoWeHelpPage;