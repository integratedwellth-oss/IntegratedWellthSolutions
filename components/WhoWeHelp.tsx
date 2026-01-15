
import React, { useState } from 'react';
import { ArrowRight, Rocket, Briefcase, Heart, User, Sparkles, ChevronDown, ChevronUp, HelpCircle, Handshake } from 'lucide-react';
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
      icon: <Rocket size={24} />,
      image: "https://res.cloudinary.com/dka0498ns/image/upload/v1765744607/Integrated_Wellth_that_support_for_startup_businesses_wtnrwq.png",
      color: 'bg-blue-50 text-blue-600',
      link: '#startups'
    },
    {
      id: 'existing-business',
      title: 'Existing Business',
      description: 'Growth, optimization, and 2026 tax compliance for established enterprises.',
      icon: <Briefcase size={24} />,
      image: "https://res.cloudinary.com/dka0498ns/image/upload/v1765745088/Integrated_Wellth_in_support_for_existing_businesses._xcicrb.png",
      color: 'bg-green-50 text-green-600',
      link: '#existing-business'
    },
    {
      id: 'npos',
      title: 'NGOs & NPOs',
      description: 'Specialized compliance, grant management, and financial oversight.',
      icon: <Heart size={24} />,
      image: "https://res.cloudinary.com/dka0498ns/image/upload/v1765745902/Integrated_Wellth_in_support_for_NGOs_NPOs_u7exko.png",
      color: 'bg-red-50 text-red-600',
      link: '#npos'
    },
    {
      id: 'individuals',
      title: 'Individuals & Teens',
      description: 'Personal wealth mapping, career guidance, and tax returns.',
      icon: <User size={24} />,
      image: "https://res.cloudinary.com/dka0498ns/image/upload/v1765746428/Integrated_Wellth_in_support_for_Individuals_Teens_Solutions._j58vsp.png",
      color: 'bg-purple-50 text-purple-600',
      link: '#individuals'
    },
    {
      id: 'wellness',
      title: 'Personal Wellness',
      description: 'Empowering individuals to master their internal world and finances.',
      icon: <Sparkles size={24} />,
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
      color: 'bg-orange-50 text-orange-600',
      link: '#wellness'
    },
    {
      id: 'accountability',
      title: 'Accountability Partner',
      description: 'Bridging the gap between strategy and action through founder support.',
      icon: <Handshake size={24} />,
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800",
      color: 'bg-brand-50 text-brand-600',
      link: '#accountability'
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
    ],
    'accountability': [
      { q: "What does an Accountability Partner actually do?", a: "We provide the bridge between your strategic vision and daily execution. Through structured check-ins, we help you manage the 'lonely journey' of entrepreneurship, focusing on resilience, clarity, and consistency." },
      { q: "Is this different from coaching?", a: "Yes. While we use coaching techniques, this is a partnership focused on keeping you accountable to your goals while protecting your mental well-being as the most valuable asset in your business." },
      { q: "Why is this a subscription?", a: "Entrepreneurship is a marathon. Single sessions provide temporary relief, but a subscription ensures you have a consistent 'safety net' and regular reset points to prevent burnout before it happens." }
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
                className="group cursor-pointer bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
              >
                <div className="h-48 relative overflow-hidden">
                   <img src={section.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={section.title} />
                   <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent" />
                   <div className="absolute bottom-4 left-6">
                      <div className={`p-3 rounded-xl ${section.color} shadow-lg backdrop-blur-md`}>
                        {section.icon}
                      </div>
                   </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h2 className="text-2xl font-black text-brand-900 mb-3 group-hover:text-brand-gold transition-colors uppercase tracking-tighter">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 mb-8 flex-grow text-base leading-relaxed">
                    {section.description}
                  </p>
                  <div className="flex items-center font-black text-xs uppercase tracking-widest text-brand-900/40 group-hover:text-brand-gold group-hover:translate-x-2 transition-all pt-6 border-t border-brand-900/5">
                    Explore Solutions <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* FAQ Section */}
        <RevealOnScroll width="100%">
          <div className="bg-gray-50 rounded-[3rem] p-8 md:p-12 mb-20 shadow-sm border border-gray-100">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-100 rounded-full text-brand-600 mb-4">
                <HelpCircle size={24} />
              </div>
              <h2 className="text-3xl font-bold text-brand-900 uppercase tracking-tight">Frequently Asked Questions</h2>
              <p className="text-gray-600 mt-2 font-medium">Select a category to find answers to common queries.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Category Tabs */}
              <div className="md:w-1/3 space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleTabChange(section.id)}
                    className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-200 flex items-center gap-4 font-black uppercase tracking-widest text-[10px] ${
                      activeFaqTab === section.id
                        ? 'bg-brand-900 text-brand-gold shadow-lg'
                        : 'bg-white text-brand-900/60 hover:bg-white/80 border border-transparent hover:border-brand-900/10'
                    }`}
                  >
                     <div className={`p-2 rounded-xl transition-colors ${activeFaqTab === section.id ? 'bg-brand-gold/10 text-brand-gold' : 'bg-brand-50 text-brand-900/30'}`}>
                        {React.cloneElement(section.icon as React.ReactElement<any>, { size: 14 })}
                     </div>
                    {section.title}
                  </button>
                ))}
              </div>

              {/* Questions Area */}
              <div className="md:w-2/3">
                <div className="bg-white rounded-[2rem] shadow-sm border border-brand-900/5 overflow-hidden min-h-[300px]">
                  {FAQS[activeFaqTab]?.map((faq, i) => (
                    <div key={i} className="border-b border-brand-900/5 last:border-0">
                      <button 
                        onClick={() => toggleFaq(i)}
                        className="w-full px-8 py-6 text-left flex justify-between items-start gap-4 hover:bg-brand-50 transition-colors group"
                      >
                        <span className={`font-bold text-lg leading-tight tracking-tight uppercase ${openFaqIndex === i ? 'text-brand-gold' : 'text-brand-900'}`}>
                          {faq.q}
                        </span>
                        <div className={`flex-shrink-0 mt-1 transition-transform duration-300 ${openFaqIndex === i ? 'rotate-180' : ''}`}>
                           {openFaqIndex === i ? <ChevronUp className="text-brand-gold" size={20} /> : <ChevronDown className="text-brand-900/20 group-hover:text-brand-900" size={20} />}
                        </div>
                      </button>
                      
                      <div 
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          openFaqIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-8 pb-8 pt-0 text-brand-900/60 leading-relaxed font-medium">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!FAQS[activeFaqTab] || FAQS[activeFaqTab].length === 0) && (
                    <div className="p-8 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">Awaiting data for this module...</div>
                  )}
                </div>
                
                <div className="mt-6 text-right">
                  <button 
                    onClick={() => window.location.hash = sections.find(s => s.id === activeFaqTab)?.link || '#contact'}
                    className="text-brand-900/40 hover:text-brand-gold font-black uppercase tracking-widest text-[10px] inline-flex items-center transition-colors"
                  >
                    View detailed {sections.find(s => s.id === activeFaqTab)?.title} protocol <ArrowRight size={14} className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
        
        <div className="mt-20 text-center bg-brand-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent)]" />
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tighter">Not sure where you fit?</h3>
          <p className="text-brand-100/60 mb-10 text-lg font-medium">Initialize our strategic assessment module to map your exact operational requirements.</p>
          <Button 
            onClick={() => window.location.hash = '#assessment'} 
            size="lg"
            className="rounded-full px-12 py-6 bg-brand-gold text-brand-900 font-black uppercase tracking-widest shadow-2xl hover:bg-white transition-all"
          >
            Start Strategic Audit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhoWeHelp;
