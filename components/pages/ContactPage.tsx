import React from 'react';
import Contact from '../Contact';

const ContactPage: React.FC = () => {
  return (
    <div className="pt-32 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
         <h1 className="text-5xl font-sora font-extrabold text-brand-900 uppercase tracking-tighter">
           Contact <span className="text-brand-gold italic">Us.</span>
         </h1>
      </div>
      <Contact />
    </div>
  );
};

export default ContactPage;
