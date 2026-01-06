import React from 'react';
import { Calculator, Brain, UserCheck, Briefcase, ShieldCheck, ArrowRight } from 'lucide-react';
import Button from '../Button';
import RevealOnScroll from '../RevealOnScroll';

const ServicesPage: React.FC = () => {
  const pillars = [
    { title: "Financial Expertise", icon: <Calculator size={40} />, desc: "Tax planning, accounting, and wealth strategy integration to ensure your business is bankable and scalable." },
    { title: "Psychological Wellness", icon: <Brain size={40} />, desc: "Addressing the behavioral aspects of money and business leadership to prevent burnout and decision fatigue." },
    { title: "Personal Development", icon: <UserCheck size={40} />, desc: "Career guidance and personal wealth mapping for individuals and teens looking to secure their financial future." },
    { title: "Organizational Consulting", icon: <Briefcase size={40} />, desc: "Strategic planning and structural efficiency improvements to identify and clear operational bottlenecks." },
    { title: "Compliance & Training", icon: <ShieldCheck size={40} />, desc: "Ensuring regulatory adherence with SARS and governance bodies while preparing your systems for 2026 changes." }
  ];

  return (
    <div className="animate-fadeIn bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-brand-900 pt-40 pb-24 px-6 md:px-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/5 -skew-x-12 translate-x-20"></div>
        <RevealOnScroll>
          <h1 className="text-5xl md:text-8xl font-sora font-extrabold tracking-tighter text-white leading-none mb-8">
            The <span className="text-brand-gold italic">5-Pillar</span><br/>Framework.
          </h1>
          <p className="text-2xl text-white/60 max-w-3xl font-medium leading-relaxed">
            A holistic consulting methodology merging technical financial precision with deep behavioral psychology.
          </p>
        </RevealOnScroll>
      </div>

      {/* Pillars Grid */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <RevealOnScroll key={i} delay={i * 0.1}>
              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group h-full flex flex-col">
                <div className="w-20 h-20 bg-brand-50 text-brand-900 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-brand-900 group-hover:text-brand-gold transition-colors duration-500 shadow-inner">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-black text-brand-900 mb-4 uppercase tracking-tighter">{pillar.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed mb-8 flex-grow">{pillar.desc}</p>
                <div className="flex items-center text-brand-900 font-black uppercase text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-32 px-6">
        <div className="max-w-5xl mx-auto bg-brand-gold rounded-[4rem] p-12 md:p-20 text-center shadow-[0_50px_100px_rgba(212,175,55,0.3)]">
          <h2 className="text-4xl md:text-6xl font-sora font-extrabold text-brand-900 tracking-tighter mb-8">
            Ready to Bridge the <br className="hidden md:block"/> IQ + EQ Gap?
          </h2>
          <Button 
            onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')}
            className="bg-brand-900 text-white rounded-full px-12 py-6 text-lg font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
          >
            Schedule Strategic Audit
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
