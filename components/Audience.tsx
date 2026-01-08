import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AUDIENCES } from '../constants';
import { Audience as AudienceType } from '../types';
import { CheckCircle, ArrowRight, Users } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import Button from './Button';

const Audience: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="who-we-help" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16 space-y-4">
            <div className="flex items-center justify-center gap-2 text-brand-gold font-black uppercase tracking-[0.3em] text-[10px]">
              <Users size={16} />
              <span>Strategic Partnerships</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-sora font-extrabold text-brand-900 tracking-tighter uppercase">
              Who We <span className="text-brand-gold italic">Help.</span>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-8">
          {AUDIENCES.map((item: AudienceType, idx: number) => (
            <RevealOnScroll key={idx} delay={idx * 0.2}>
              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col group">
                <h3 className="text-2xl font-black text-brand-900 mb-6 uppercase tracking-tighter italic group-hover:text-brand-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-8 font-medium leading-relaxed flex-grow">
                  {item.description}
                </p>
                <div className="pt-6 border-t border-gray-100">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(item.path)}
                    className="w-full flex items-center justify-between group-hover:bg-brand-900 group-hover:text-white transition-all"
                  >
                    Explore Protocol <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Audience;
