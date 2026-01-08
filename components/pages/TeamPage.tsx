import React from 'react';
import Team from '../../Team'; 
import Philosophy from '../Philosophy'; 
import RevealOnScroll from '../RevealOnScroll';
import { Target, Compass, Heart, Zap } from 'lucide-react';

const TeamPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Header Protocol */}
      <div className="pt-40 pb-20 bg-brand-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <RevealOnScroll>
            <div className="flex items-center gap-3 text-brand-gold font-black uppercase tracking-[0.4em] text-[10px] mb-6">
              <Zap size={16} className="animate-pulse" />
              <span>Sovereign Leadership Protocol</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-sora font-extrabold tracking-tighter leading-none uppercase">
              The <span className="text-brand-gold italic">Advisors.</span>
            </h1>
            <p className="mt-8 text-xl text-brand-100 max-w-2xl font-medium italic">
              Empowering founders with the Technical IQ and Behavioral EQ needed to co-create sustainable legacies.
            </p>
          </RevealOnScroll>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-gold/10 to-transparent pointer-events-none" />
      </div>

      {/* 2. Core Team Grid (References src/Team.tsx) */}
      <div className="relative z-10 -mt-10">
        <Team />
      </div>

      {/* 3. Strategic Foundations */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <RevealOnScroll>
              <div className="flex flex-col items-center text-center p-10 bg-gray-50 rounded-[3rem] border border-gray-100 h-full">
                <div className="w-16 h-16 bg-brand-900 text-brand-gold rounded-2xl flex items-center justify-center mb-8">
                  <Target size={32} />
                </div>
                <h3 className="text-2xl font-bold text-brand-900 mb-4 uppercase italic">Vision</h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  To be the leading holistic empowerment partner in Africa, driving financial confidence and professional excellence.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="flex flex-col items-center text-center p-10 bg-gray-50 rounded-[3rem] border border-gray-100 h-full">
                <div className="w-16 h-16 bg-brand-900 text-brand-gold rounded-2xl flex items-center justify-center mb-8">
                  <Compass size={32} />
                </div>
                <h3 className="text-2xl font-bold text-brand-900 mb-4 uppercase italic">Mission</h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  Empowering clients with solutions blending financial management, emotional intelligence, and digital innovation.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.4}>
              <div className="flex flex-col items-center text-center p-10 bg-gray-50 rounded-[3rem] border border-gray-100 h-full">
                <div className="w-16 h-16 bg-brand-900 text-brand-gold rounded-2xl flex items-center justify-center mb-8">
                  <Heart size={32} />
                </div>
                <h3 className="text-2xl font-bold text-brand-900 mb-4 uppercase italic">Values</h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  Integrity, empathy, and collaboration, co-creating solutions that align with specific financial goals.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 4. Deep-Dive Philosophy */}
      <Philosophy />
    </div>
  );
};

export default TeamPage;
