import React, { useState } from 'react';
import { ArrowRight, Rocket, Briefcase, Heart, User, Sparkles, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import Button from './Button';
import RevealOnScroll from './RevealOnScroll';

const WhoWeHelp: React.FC = () => {
  const [activeFaqTab, setActiveFaqTab] = useState('startups');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const sections = [
    {
      id: 'startups',
      title: 'Startups',
      description: 'Laying a solid financial foundation for early-stage ventures.',
      icon: <Rocket size={40} />,
      color: 'bg-blue-50 text-blue-600',
      link: '#startups'
    },
    {
      id: 'existing-business',
      title: 'Existing Business',
      description: 'Growth, optimization, and 2026 tax compliance for established enterprises.',
      icon: <Briefcase size={40} />,
      color: 'bg-green-50 text-green-600',
      link: '#existing-business'
    },
    {
      id: 'npos',
      title: 'NGOs & NPOs',
      description: 'Specialized compliance, grant management, and financial oversight.',
      icon: <Heart size={40} />,
      color: 'bg-red-50 text-red-600',
      link: '#npos'
    },
    {
      id: 'individuals',
      title: 'Individuals & Teens',
      description: 'Personal wealth mapping, career guidance, and tax returns.',
      icon: <User size={40} />,
      color: 'bg-purple-50 text-purple-600',
      link: '#individuals'
    },
    {
      id: 'wellness',
      title: 'Personal Wellness & Life Coaching',
      description: 'Empowering individuals to master their internal world and day-to-day finances.',
      icon: <Sparkles size={40} />,
      color: 'bg-orange-50 text-orange-600',
      link: '#wellness'
    }
  ];

  const FAQS: Record<string, { q: string; a: string }[]> = {
    startups: [
      { q: "Why do I need 'investor-ready' books if I'm just starting?", a: "Investors need trust. Messy or non-existent financial records are the fastest way to kill a potential deal. Starting with clean books shows you are a serious, scalable entity." },
      { q: "What is a Gap Analysis?", a: "Unlike a backward-looking audit, a Gap Analysis looks forward to identify missing pieces in your strategy and operations that are preventing you from reaching your next growth milestone." },
      { q: "Can't I just use a spreadsheet for budgeting?", a: "Spreadsheets are prone to error and don't scale. Our systems provide real-time tracking and verification, ensuring you don't overspend or miss critical cash flow warning signs." }
    ],
    'existing-business': [
      { q: "Why aren't we growing despite increased sales?", a: "Growth often exposes operational inefficiencies. Our Capacity Assessment identifies hidden bottlenecks—like cash flow gaps, staff capability, or poor systems—that eat into profits." },
      { q: "Why is 2026 Compliance critical right now?", a: "SARS is implementing stricter, AI-driven monitoring. Waiting until 2026 leaves you vulnerable. We prepare your systems now so compliance becomes automatic." },
      { q: "How can you help us win more tenders?", a: "Tenders are often lost due to technical non-compliance. We ensure your documentation is perfect, compliant, and professionally structured to stand out." }
    ],
    'npos': [
      { q: "Difference between NPO and PBO?", a: "NPO is a registration with the Department of Social Development. PBO (Public Benefit Organization) is a tax status with SARS that allows you to issue Section 18A tax certificates to donors." },
      { q: "Why do we need a Capacity Assessment?", a: "Donors want to fund sustainable organizations. An assessment proves you have identified your risks and have a plan to manage them." },
      { q: "How do you help with donor reporting?", a: "Poor reporting leads to funding cuts. We act as your compliance officer, ensuring every Rand is accounted for according to the specific line items in your donor contract." }
    ],
    'individuals': [
      { q: "Do I need to file a tax return if I earn a salary?", a: "If you earn over the threshold, have multiple income streams, or receive allowances, yes. Filing can also trigger refunds for medical aid or retirement contributions." },
      { q: "When should I start planning my personal wealth?", a: "Immediately. Compound interest favors time. Starting early, even with small amounts, makes a massive difference to your long-term freedom." },
      { q: "What is Wealth Mapping?", a: "It is a strategic life plan that calculates your 'freedom number' and breaks down specific career and lifestyle steps to achieve it." }
    ],
    'wellness': [
      { q: "Why combine financial literacy with personal wellness?", a: "Financial stress is a leading cause of burnout. Addressing money habits alongside emotional resilience creates a sustainable path to overall well-being." },
      { q: "Who are Burnout Prevention workshops for?", a: "High-performing individuals, corporate teams, and entrepreneurs who feel overwhelmed or want to proactively manage stress before it impacts health." },
      { q: "What happens in a Mindfulness Session?", a: "Practical breathing and mental exercises designed to help you regain focus and calm in the middle of a busy workday." }
    ]
  };

  const handleTabChange = (id: string) => {
    setActiveFaqTab(id);
    setOpenFaqIndex(null);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-900 mb-6">Who We Help</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you are just starting out, scaling up, running a non-profit, or planning your personal future, we have tailored solutions to bridge the gap between financial compliance and strategic growth.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {sections.map((section, idx) => (
            <RevealOnScroll key={section.id} delay={idx * 0.1}>
              <div 
                onClick={() => window.location.hash = section.link}
                className="group cursor-pointer bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                <div className={`w-20 h-20 rounded-2xl ${section.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors">
                  {section.title}
                </h2>
                <p className="text-gray-600 mb-8 flex-grow text-lg">
                  {section.description}
                </p>
                <div className="flex items-center font-bold text-brand-600 group-hover:translate-x-2 transition-transform">
                  Explore Solutions <ArrowRight size={20} className="ml-2" />
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* FAQ Section */}
        <RevealOnScroll width="100%">
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-20 shadow-sm border border-gray-100">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-100 rounded-full text-brand-600 mb-4">
                <HelpCircle size={24} />
              </div>
              <h2 className="text-3xl font-bold text-brand-900">Frequently Asked Questions</h2>
              <p className="text-gray-600 mt-2">Select a category to find answers to common queries.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Category Tabs */}
              <div className="md:w-1/3 space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleTabChange(section.id)}
                    className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-200 flex items-center gap-3 font-semibold ${
                      activeFaqTab === section.id
                        ? 'bg-brand-600 text-white shadow-md'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                     <div className={`p-1 rounded-full ${activeFaqTab === section.id ? 'bg-white/20' : 'bg-gray-100'}`}>
                        {/* Clone icon with smaller size */}
                        {React.cloneElement(section.icon as React.ReactElement, { size: 16 })}
                     </div>
                    {section.title}
                  </button>
                ))}
              </div>

              {/* Questions Area */}
              <div className="md:w-2/3">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[300px]">
                  {FAQS[activeFaqTab]?.map((faq, i) => (
                    <div key={i} className="border-b border-gray-100 last:border-0">
                      <button 
                        onClick={() => toggleFaq(i)}
                        className="w-full px-6 py-5 text-left flex justify-between items-start gap-4 hover:bg-gray-50 transition-colors group"
                      >
                        <span className={`font-bold text-lg leading-tight ${openFaqIndex === i ? 'text-brand-600' : 'text-gray-800'}`}>
                          {faq.q}
                        </span>
                        <div className={`flex-shrink-0 mt-1 transition-transform duration-300 ${openFaqIndex === i ? 'rotate-180' : ''}`}>
                           {openFaqIndex === i ? <ChevronUp className="text-brand-500" size={20} /> : <ChevronDown className="text-gray-400 group-hover:text-gray-600" size={20} />}
                        </div>
                      </button>
                      
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openFaqIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!FAQS[activeFaqTab] || FAQS[activeFaqTab].length === 0) && (
                    <div className="p-8 text-center text-gray-500">No questions available for this category yet.</div>
                  )}
                </div>
                
                <div className="mt-4 text-right">
                  <button 
                    onClick={() => window.location.hash = sections.find(s => s.id === activeFaqTab)?.link || '#contact'}
                    className="text-brand-600 font-semibold text-sm hover:underline inline-flex items-center"
                  >
                    View full {sections.find(s => s.id === activeFaqTab)?.title} page <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
        
        <div className="mt-20 text-center bg-brand-50 rounded-2xl p-12">
          <h3 className="text-2xl font-bold text-brand-900 mb-4">Not sure where you fit?</h3>
          <p className="text-gray-600 mb-8">Take our quick strategic assessment to find out exactly what your business needs right now.</p>
          <Button onClick={() => window.location.hash = '#assessment'} size="lg">Take Free Assessment</Button>
        </div>
      </div>
    </div>
  );
};

export default WhoWeHelp;