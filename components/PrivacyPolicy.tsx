import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Button from './Button';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Button 
          variant="outline" 
          onClick={() => window.location.hash = '#home'} 
          className="mb-8 flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Home
        </Button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">1. Introduction</h2>
            <p>Integrated Wellth Solutions ("we", "us") is committed to protecting your personal information in accordance with the Protection of Personal Information Act (POPIA) and GDPR where applicable.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">2. Information We Collect</h2>
            <p>We may collect:</p>
            <ul className="list-disc ml-5 mt-2">
              <li>Contact details (Name, Email, Phone) via forms and Calendly.</li>
              <li>Business financial details provided during consultations.</li>
              <li>Usage data via cookies to improve website performance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">3. How We Use Your Information</h2>
            <p>Your data is used to:</p>
            <ul className="list-disc ml-5 mt-2">
              <li>Provide requested consulting services.</li>
              <li>Communicate regarding appointments and workshops.</li>
              <li>Comply with SARS and other legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">4. Your Rights</h2>
            <p>You have the right to request access to, correction of, or deletion of your personal data. Contact our Information Officer at info@integratedwellth.co.za.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;