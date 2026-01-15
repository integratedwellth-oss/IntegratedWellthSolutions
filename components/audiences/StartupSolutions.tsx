import React from 'react';
import NewsTicker from '../NewsTicker';
import Button from '../Button';
import AudienceNav from '../AudienceNav';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import RevealOnScroll from '../RevealOnScroll';

const StartupSolutions: React.FC = () => {
  const services = [
    { title: "Due Diligence and Grant Management", desc: "We help you navigate the complexities of grant applications and ensure your business meets all the rigorous requirements of potential funders." },
    { title: "Startup Bookkeeping & Management", desc: "Keep your records investor-ready from day one with our specialized bookkeeping services tailored for early-stage ventures." },
    { title: "Financial Literacy Training", desc: "Master the numbers behind your business. We empower founders to understand their financial statements and make data-driven decisions." },
    { title: "Budgeting, Expense Tracking & Verification", desc: "Gain full control over your cash flow with systems designed to monitor every cent and verify business expenditures." },
    { title: "Financial Forecasting", desc: "Visualize your future growth. We create detailed projections to help you plan for scaling and long-term sustainability." },
    { title: "Bank Reconciliation and Reporting", desc: "Ensure your internal records always match your bank statements with our accurate monthly reconciliation and reporting." },
    { title: "Gap Analysis", desc: "We identify the \"missing pieces\" in your current business model or financial structure and provide a roadmap to bridge those gaps." },
  ];

  const faqs = [
    { q: "Why do I need 'investor-ready' books if I'm just starting?", a: "Investors need trust. Messy or non-existent financial records are the fastest way to kill a potential deal. Starting with clean books shows you are a serious, scalable entity." },
    { q: "What is the difference between a Gap Analysis and a regular audit?", a: "A regular audit looks backward at compliance. A Gap Analysis looks forward and inward, identifying what is missing in your strategy and operations that prevents you from reaching your next growth milestone." },
    { q: "Can't I just use a spreadsheet for budgeting?", a: "Spreadsheets are prone to error and don't scale. Our systems provide real-time tracking and verification, ensuring you don't overspend or miss critical cash flow warning signs." },
    { q: "How does Grant Management work?", a: "Grants often come with strict reporting conditions. We manage the entire lifecycle, ensuring funds are spent according to the contract so you remain eligible for future funding." }
  ];

  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  return (
    <div className="pt-16 bg-white min-h-screen">
      <AudienceNav active="startups" />
      
      {/* Hero */}
      <div className="bg-brand-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Startups Solutions</h1>
          <p className="text-xl md:text-2xl text-brand-100 max-w-3xl mx-auto">
            Focused on laying a solid financial foundation for startups.
          </p>
        </div>
      </div>

      <NewsTicker />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Services List */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12 mb-20">
          {services.map((s, i) => (
            <RevealOnScroll key={i} delay={i * 0.05}>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center">
                    <CheckCircle2 size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Q&A Section */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-center text-brand-900 mb-10">Common Questions from Founders</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center font-bold text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  {faq.q}
                  {openFaq === i ? <ChevronUp className="text-brand-500" /> : <ChevronDown className="text-gray-400" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 py-4 text-gray-600 border-t border-gray-100 bg-gray-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to build your foundation?</h2>
          <Button onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')} size="lg">
            Book a Strategy Session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartupSolutions;