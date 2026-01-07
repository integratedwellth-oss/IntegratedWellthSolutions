import React from 'react';
import WhoWeHelp from '../WhoWeHelp';
import Audience from '../Audience';

const WhoWeHelpPage: React.FC = () => {
  return (
    <div className="pt-20">
      <div className="bg-brand-900 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-sora font-extrabold mb-6 uppercase tracking-tighter">
            Who We <span className="text-brand-gold italic">Help.</span>
          </h1>
          <p className="text-xl text-brand-100 max-w-3xl mx-auto font-medium italic">
            Tailored strategic partnerships for founders, NPOs, and individuals.
          </p>
        </div>
      </div>
      <WhoWeHelp />
      <Audience />
    </div>
  );
};

export default WhoWeHelpPage;
