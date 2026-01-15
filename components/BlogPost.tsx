import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Button from './Button';

const BlogPost: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Button 
          variant="outline" 
          onClick={() => window.location.hash = '#home'} 
          className="mb-8 flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Home
        </Button>

        <article className="prose lg:prose-xl">
          <h1 className="text-4xl font-bold text-brand-900 mb-6">South Africa's 2026 Tax Compliance Blueprint</h1>
          <div className="flex items-center text-gray-500 text-sm mb-8">
            <span className="bg-brand-100 text-brand-800 px-2 py-1 rounded mr-4">Tax Advisory</span>
            <span>October 15, 2025</span>
          </div>

          <img 
            src="https://picsum.photos/800/400?random=3" 
            alt="Tax documents" 
            className="w-full h-64 object-cover rounded-xl mb-8"
          />

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            As we approach 2026, the South African Revenue Service (SARS) is tightening its grip on compliance, leveraging AI-driven audits and cross-border data sharing. For business owners, the "wait and see" approach is no longer a viable strategy.
          </p>

          <h2 className="text-2xl font-bold text-brand-800 mt-8 mb-4">Key Changes to Watch</h2>
          
          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">1. Employee Tax Numbers (mandatory)</h3>
          <p className="text-gray-600 mb-4">
            SARS now requires an Income Tax reference number for every employee, regardless of income level. Failure to include this in your EMP501 reconciliation will result in immediate penalties.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">2. Digital VAT Fraud Detection</h3>
          <p className="text-gray-600 mb-4">
            Real-time VAT reporting is on the horizon. Ensure your accounting software (Xero, Sage) is fully integrated and your invoices meet the specific requirements of the VAT Act.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">3. The Wealth Tax Conversation</h3>
          <p className="text-gray-600 mb-4">
            With increased scrutiny on high-net-worth individuals, separating personal assets from business entities is crucial. We are seeing more lifestyle audits triggered by discrepancies between declared income and asset accumulation.
          </p>

          <div className="bg-brand-50 border-l-4 border-brand-500 p-6 my-8">
            <h4 className="font-bold text-brand-900 mb-2">Marcia's Tip:</h4>
            <p className="text-brand-800">
              "Compliance isn't just about avoiding fines; it's about bankability. You cannot grow or seek funding with a non-compliant status."
            </p>
          </div>

          <p className="text-gray-700 mb-8">
            At Integrated Wellth Solutions, we don't just file returns; we map out a tax strategy that aligns with your business growth. Don't wait for the letter of demand.
          </p>

          <div className="text-center mt-12">
             <Button onClick={() => window.open('https://calendly.com/integratedwellth-demo', '_blank')} size="lg">Book a Tax Compliance Review</Button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;