import React from 'react';
import NewsTicker from '../NewsTicker';
import Button from '../Button';
import AudienceNav from '../AudienceNav';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import RevealOnScroll from '../RevealOnScroll';

const IndividualSolutions: React.FC = () => {
  const services = [
    { title: "Career Guidance", desc: "Strategic advice to help you align your professional path with your personal financial goals." },
    { title: "Personal Wealth Mapping", desc: "Creating a visual roadmap of your financial future, helping you understand how today's decisions impact your long-term wealth." },
    { title: "Tax Returns (Provisional & Individual)", desc: "Expert handling of your personal taxes to ensure compliance and optimization of allowable deductions." },
    { title: "Financial Literacy for Teens", desc: "Equipping the next generation with the foundational skills of budgeting, saving, and understanding debt before they enter the workforce." },
    { title: "Retirement Planning Strategy", desc: "Analyzing your current trajectory to ensure you are building enough capital for the lifestyle you desire." },
    { title: "Debt Management Coaching", desc: "Practical strategies to reduce bad debt and improve your credit score." }
  ];

  const faqs = [
    { q: "When should I start planning my personal wealth?", a: "The best time was yesterday; the next best time is today. Compound interest works best with time, so starting early—even with small amounts—makes a massive difference." },
    { q: "Do I need to file a tax return if I earn a salary?", a: "If you earn over the threshold, have multiple income streams, or receive travel allowances, you must file. Even if not mandatory, filing can sometimes result in refunds for medical aid or retirement contributions." },
    { q: "Why teach financial literacy to teens?", a: "Most schools do not teach money management. By learning about credit, compound interest, and budgeting early, teens avoid the common debt traps that burden many young adults." },
    { q: "What is Wealth Mapping?", a: "It's more than a budget. It's a strategic life plan that calculates exactly what your financial 'freedom number' is and breaks down the steps to get there based on your career and lifestyle choices." }
  ];

  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  return (
    <div className="pt-16 bg-white min-h-screen">
      <AudienceNav active="individuals" />
      
      {/* Hero */}
      <div className="bg-brand-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Individuals & Teens</h1>
          <p className="text-xl md:text-2xl text-brand-100 max-w-3xl mx-auto">
            Plan your career and personal wealth map early for a secure future.
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
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
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
          <h2 className="text-3xl font-bold text-center text-brand-900 mb-10">Common Questions</h2>
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
          <h2 className="text-2xl font-bold mb-6">Start your journey to financial freedom.</h2>
          <Button onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')} size="lg">
            Book a Personal Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndividualSolutions;