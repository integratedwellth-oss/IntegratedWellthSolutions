import React from 'react';
import { PILLARS } from '../constants';
import { Calculator, Brain, UserCheck, Briefcase, ShieldCheck } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const iconMap: Record<string, React.ReactNode> = {
  Calculator: <Calculator size={32} />,
  Brain: <Brain size={32} />,
  UserCheck: <UserCheck size={32} />,
  Briefcase: <Briefcase size={32} />,
  ShieldCheck: <ShieldCheck size={32} />
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <RevealOnScroll width="100%">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4">The 5-Pillar Framework</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A holistic approach combining technical financial skills with psychological insights.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PILLARS.map((pillar, index) => (
            <RevealOnScroll key={index} delay={index * 0.1}>
              <div className="bg-gray-50 rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 group h-full">
                <div className="w-14 h-14 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  {iconMap[pillar.iconName]}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{pillar.title}</h3>
                <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;