
import React from 'react';
import CountUp from './CountUp';
import RevealOnScroll from './RevealOnScroll';
import { Sparkles, Users, Target, Brain, Cpu, TrendingUp, ShieldCheck } from 'lucide-react';

const Philosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-32 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-50/30 -z-10 translate-x-1/2 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <div className="lg:w-1/2">
            <RevealOnScroll>
              <div className="relative">
                <div className="absolute -inset-4 border-2 border-brand-gold/20 rounded-[3rem] -rotate-3 z-0"></div>
                <img 
                  src="https://res.cloudinary.com/dka0498ns/image/upload/v1768022744/Marcia_Kgaphola._The_founder_of_Integrated_Wellth_Solution_giving_a_keynote_speech_at_a_women_business_conference_rr55ol.jpg" 
                  alt="Marcia Kgaphola" 
                  className="rounded-[2.5rem] shadow-2xl z-10 relative object-cover w-full aspect-[4/5] lg:aspect-auto"
                />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-900 rounded-3xl z-20 hidden lg:flex items-center justify-center p-8 shadow-2xl">
                   <div className="text-center">
                      <p className="text-brand-gold font-black text-4xl tracking-tighter">100%</p>
                      <p className="text-[8px] text-white/50 uppercase font-black tracking-widest mt-1 leading-none">Compliance <br/> Record</p>
                   </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
          
          <div className="lg:w-1/2 space-y-10">
            <RevealOnScroll delay={0.2}>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-brand-500 font-black uppercase tracking-[0.5em] text-[10px]">
                  <Target size={14} className="animate-pulse" />
                  <span>The Founder's Insight</span>
                </div>
                <h3 className="text-5xl md:text-7xl font-sora font-extrabold text-brand-900 tracking-tighter leading-none">
                  MARCIA <br/> <span className="text-brand-gold italic">KGAPHOLA.</span>
                </h3>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.3}>
              <div className="relative pl-8 border-l-4 border-brand-gold">
                <p className="text-2xl md:text-3xl text-brand-900/80 font-medium italic leading-relaxed">
                  "Financial success is not just about the numbers on a spreadsheet. It is about the <span className="text-brand-900 font-black">behavior, mindset, and emotional intelligence</span> behind those numbers."
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.4}>
              <div className="space-y-6 text-lg text-brand-900/60 leading-relaxed font-medium">
                <p>
                  As a Chartered Business Accountant, Marcia observed a recurring pattern: excellent businesses failing not due to lack of skill, but due to poor financial habits and compliance oversight.
                </p>
                <p>
                  Integrated Wellth Solutions was born to bridge this divide. We combine high-end technical IQ with neural resilience (EQ) to create a container where wealth is managed with both precision and peace.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.5}>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="bg-brand-50 p-6 rounded-3xl border border-brand-900/5 hover:border-brand-gold transition-all group">
                  <p className="text-brand-900 font-black text-4xl group-hover:text-brand-gold transition-colors"><CountUp end={10} suffix="+" /></p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-900/40 mt-1">Years Strategic Intelligence</p>
                </div>
                <div className="bg-brand-50 p-6 rounded-3xl border border-brand-900/5 hover:border-brand-gold transition-all group">
                  <p className="text-brand-900 font-black text-4xl group-hover:text-brand-gold transition-colors">IQ+EQ</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-900/40 mt-1">Integrated Framework</p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* The Multidisciplinary Powerhouse */}
        <div id="team" className="pt-32 border-t border-brand-900/10">
          <RevealOnScroll width="100%">
            <div className="text-center mb-24 space-y-4">
              <div className="inline-flex items-center gap-2 text-brand-500 font-black uppercase tracking-[0.5em] text-[10px]">
                <span className="text-brand-500"><Users size={16} /></span>
                <span>Strategic Architecture</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-sora font-extrabold text-brand-900 tracking-tighter leading-none">
                THE IWS <span className="text-brand-gold italic">ADVANTAGE.</span>
              </h2>
              <p className="text-xl text-brand-900/40 max-w-2xl mx-auto font-medium">
                Bridging technical expertise with human behavior through integrated empowerment.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* IQ Card */}
            <RevealOnScroll delay={0.1} width="100%">
              <div className="bg-white border border-brand-900/5 rounded-[3rem] p-10 shadow-xl hover:shadow-2xl transition-all h-full flex flex-col group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                  <TrendingUp size={120} className="text-brand-900" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-brand-900 text-brand-gold flex items-center justify-center mb-8 shadow-xl">
                  <ShieldCheck size={28} />
                </div>
                <h4 className="text-2xl font-black text-brand-900 mb-6 uppercase tracking-tighter">Financial <br/> Integrity (IQ)</h4>
                <p className="text-brand-900/60 leading-relaxed mb-8 flex-grow font-medium">
                  Robust accounting and strategic financial services tailored for the South African market. We ensure your business is bankable and audit-ready at all times.
                </p>
                <div className="pt-6 border-t border-brand-900/5">
                   <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold">100% Tax Compliance Rate</p>
                </div>
              </div>
            </RevealOnScroll>

            {/* AI / Innovation Card */}
            <RevealOnScroll delay={0.2} width="100%">
              <div className="bg-brand-900 text-white rounded-[3rem] p-10 shadow-2xl h-full flex flex-col group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <Cpu size={120} className="text-white" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-brand-gold text-brand-900 flex items-center justify-center mb-8 shadow-xl">
                  <Sparkles size={28} />
                </div>
                <h4 className="text-2xl font-black text-brand-gold mb-6 uppercase tracking-tighter">Innovation & <br/> AI Leverage</h4>
                <p className="text-white/70 leading-relaxed mb-8 flex-grow font-medium">
                  We leverage AI and smart automation to simplify complex financial processes, providing real-time local insights that drive proactive decision-making.
                </p>
                <div className="pt-6 border-t border-white/10">
                   <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Real-time Pulse Monitoring</p>
                </div>
              </div>
            </RevealOnScroll>

            {/* EQ Card */}
            <RevealOnScroll delay={0.3} width="100%">
              <div className="bg-white border border-brand-900/5 rounded-[3rem] p-10 shadow-xl hover:shadow-2xl transition-all h-full flex flex-col group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                  <Brain size={120} className="text-brand-900" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-brand-gold text-brand-900 flex items-center justify-center mb-8 shadow-xl">
                  <Users size={28} />
                </div>
                <h4 className="text-2xl font-black text-brand-900 mb-6 uppercase tracking-tighter">Behavioral <br/> Wellness (EQ)</h4>
                <p className="text-brand-900/60 leading-relaxed mb-8 flex-grow font-medium">
                  Addressing the underlying psychological drivers that influence financial choices. We provide a container for growth where financial clarity meets psychological safety.
                </p>
                <div className="pt-6 border-t border-brand-900/5">
                   <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Burnout Prevention Protocol</p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
