import React from 'react';
import NewsTicker from '../NewsTicker';
import Button from '../Button';
import AudienceNav from '../AudienceNav';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import RevealOnScroll from '../RevealOnScroll';

const NPOSolutions: React.FC = () => {
  const services = [
    { title: "Compliance and Financial Oversight", desc: "We act as your external watchdog to ensure total transparency. This includes setting up \"Checks and Balances,\" monitoring internal spending against grant requirements, and ensuring you meet all legal obligations to the Department of Social Development and SARS." },
    { title: "Capacity Assessment", desc: "We conduct deep-dive evaluations of your organization’s internal systems, governance, and human resources to identify strengths and weaknesses." },
    { title: "Capacity Building", desc: "We provide the training and structural development needed to strengthen your team’s skills and internal processes, ensuring long-term resilience." },
    { title: "Annual Work Plan Drafting", desc: "We help you translate your mission into a structured, actionable plan for the year ahead to ensure project success." },
    { title: "Financial Modelling", desc: "Create sustainable financial frameworks that balance mission-driven impact with fiscal responsibility." },
    { title: "Proposal Writing", desc: "Crafting compelling stories for donors. We write high-impact proposals that clearly articulate your social value." },
    { title: "Donor Funding and Grant Management", desc: "We manage the lifecycle of your grants, from initial application to rigorous final financial reporting." },
    { title: "Grant Budgeting and Forecasting", desc: "Align your project goals with your budget through precise forecasting that meets strict donor requirements." },
  ];

  const faqs = [
    { q: "What is the difference between an NPO and a PBO?", a: "NPO is a registration with the Department of Social Development. PBO (Public Benefit Organization) is a tax status with SARS that allows you to issue Section 18A tax certificates to donors. We help you secure both." },
    { q: "Why do we need a Capacity Assessment?", a: "Donors today want to fund organizations that are sustainable and well-run. An assessment proves to donors that you have identified your risks and have a plan to manage them." },
    { q: "How can you help us with donor reporting?", a: "Reporting is often where NPOs fail, leading to funding cuts. We act as your compliance officer, ensuring every Rand is accounted for according to the specific line items allowed by your donor contract." },
    { q: "What is an Annual Work Plan?", a: "It is your operational roadmap. It breaks down your high-level mission into specific tasks, timelines, budgets, and responsible persons for the year, ensuring your strategic goals actually happen." }
  ];

  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  return (
    <div className="pt-16 bg-white min-h-screen">
      <AudienceNav active="npos" />
      
      {/* Hero */}
      <div className="bg-brand-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">NGO & NPO Solutions</h1>
          <p className="text-xl md:text-2xl text-brand-100 max-w-3xl mx-auto">
            Specialized compliance and management for the non-profit sector.
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
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
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
          <h2 className="text-3xl font-bold text-center text-brand-900 mb-10">Common Questions from Non-Profits</h2>
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
          <h2 className="text-2xl font-bold mb-6">Secure your organization's future.</h2>
          <Button onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')} size="lg">
            Book a NPO Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NPOSolutions;