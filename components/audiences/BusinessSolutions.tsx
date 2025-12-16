import React from 'react';
import NewsTicker from '../NewsTicker';
import Button from '../Button';
import AudienceNav from '../AudienceNav';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import RevealOnScroll from '../RevealOnScroll';

const BusinessSolutions: React.FC = () => {
  const services = [
    { title: "Capacity Assessment", desc: "We perform a comprehensive \"health check\" on your current operations. By evaluating your team’s skills, your technology, and your workflows, we identify exactly what is holding you back from your next level of growth." },
    { title: "Capacity Building", desc: "We help you bridge the gap between where you are and where you want to be. Through targeted training, leadership development, and system improvements, we strengthen your internal resources to handle increased market demand." },
    { title: "Business Plan Drafting", desc: "Whether for internal strategy or external funding, we craft comprehensive business plans that tell your story and prove your viability." },
    { title: "Tender Document Preparation", desc: "Increase your win rate. We handle the technical and administrative heavy lifting of preparing competitive tender submissions." },
    { title: "Proposal Writing", desc: "We draft professional, persuasive business proposals designed to win new clients and secure lucrative partnerships." },
    { title: "Google My Business Setup & SEO", desc: "Get found by local customers. We optimize your digital presence to ensure your business ranks higher in search results." },
    { title: "Investment Readiness", desc: "We prepare your financials, pitch decks, and operations to stand up to the scrutiny of private investors or venture capitalists." },
    { title: "Tailored Financial Modelling", desc: "Get custom-built models that simulate different business scenarios, helping you assess risks and opportunities before you invest." },
  ];

  const faqs = [
    { q: "Why aren't we growing despite increased sales?", a: "Growth often exposes operational inefficiencies. Our Capacity Assessment identifies the hidden bottlenecks—whether it's cash flow gaps, staff capability, or poor systems—that are eating into your profits." },
    { q: "Why is 2026 Compliance critical right now?", a: "SARS and other regulatory bodies are implementing stricter, AI-driven monitoring. Waiting until 2026 leaves you vulnerable to penalties. We prepare your systems now so compliance becomes automatic." },
    { q: "How can you help us win more tenders?", a: "Tenders are often lost due to technical non-compliance or poor presentation, not price. We ensure your documentation is perfect, compliant, and professionally structured to stand out." },
    { q: "What is Financial Modelling?", a: "It's a digital simulation of your business. Before you hire 10 new staff or buy a new truck, we plug the numbers into the model to predict exactly how that decision will affect your cash flow 6, 12, or 24 months from now." }
  ];

  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  return (
    <div className="pt-16 bg-white min-h-screen">
      <AudienceNav active="existing-business" />
      
      {/* Hero */}
      <div className="bg-brand-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Existing Business Solutions</h1>
          <p className="text-xl md:text-2xl text-brand-100 max-w-3xl mx-auto">
            Growth and optimization services for established enterprises.
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
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
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
          <h2 className="text-3xl font-bold text-center text-brand-900 mb-10">Common Questions from Business Owners</h2>
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
          <h2 className="text-2xl font-bold mb-6">Optimize your operations today.</h2>
          <Button onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')} size="lg">
            Schedule an Audit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BusinessSolutions;