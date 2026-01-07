import React from 'react';
import Hero from '../Hero';
import TrustedBy from '../TrustedBy';
import Philosophy from '../Philosophy';
import EventHighlight from '../EventHighlight';
import Services from '../Services';
import Audience from '../Audience';
import FinancialHealthScore from '../FinancialHealthScore';
import Testimonials from '../Testimonials';
import Gallery from '../Gallery';
import Contact from '../Contact';

const Home: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <div id="home"><Hero /></div>
      <TrustedBy />
      <div id="philosophy"><Philosophy /></div>
      <div id="workshops"><EventHighlight /></div>
      <div id="services"><Services /></div>
      <div id="who-we-help"><Audience /></div>
      <div id="assessment" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase">Financial Health Diagnostic</h2>
        </div>
        <FinancialHealthScore isOpen={true} onClose={() => {}} isModal={false} />
      </div>
      <Testimonials />
      <Gallery />
      <div id="contact"><Contact /></div>
    </div>
  );
};

export default Home;
