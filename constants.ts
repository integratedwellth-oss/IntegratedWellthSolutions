import React from 'react';
import { PILLARS } from '../constants'; 
import { CheckCircle2, Zap, Shield, TrendingUp } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const Services: React.FC = () => {
  // Mapping icons to the pillar index for a high-end visual protocol
  const icons = [<Shield size={32} />, <Zap size={32} />, <TrendingUp size={32} />];

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-sora font-extrabold text-brand-900 tracking-tighter uppercase">
              Strategic <span className="text-brand-gold italic">Pillars.</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
              Integrated solutions designed to navigate technical debt and behavioral isolation.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-8">
          {PILLARS.map((pillar, idx) => (
            <RevealOnScroll key={idx} delay={idx * 0.2}>
              <div className="group p-10 bg-gray-50 rounded-[3rem] border border-gray-100 hover:border-brand-gold hover:bg-white hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                <div className="w-16 h-16 bg-brand-900 text-brand-gold rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  {icons[idx]}
                </div>
                
                <h3 className="text-2xl font-black text-brand-900 mb-4 uppercase tracking-tighter italic">
                  {pillar.title}
                </h3>
                
                <p className="text-gray-600 mb-8 font-medium leading-relaxed flex-grow">
                  {pillar.description}
                </p>
                
                <ul className="space-y-4 pt-6 border-t border-gray-200">
                  {pillar.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-3 text-[10px] font-black text-brand-900 uppercase tracking-widest">
                      <CheckCircle2 size={16} className="text-brand-gold shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
      
      {/* Decorative background protocol */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default Services;
