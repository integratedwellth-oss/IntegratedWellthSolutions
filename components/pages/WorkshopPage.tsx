
import React from 'react';
import EventHighlight from '../EventHighlight';
import RevealOnScroll from '../RevealOnScroll';
import Button from '../Button';
import { Calendar, Users, MapPin, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';

const WorkshopPage: React.FC = () => {
  return (
    <div className="animate-fadeIn bg-white">
      {/* Header with tactical focus */}
      <div className="bg-brand-900 text-white pt-40 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <BookOpen size={800} className="absolute -left-40 -top-40" />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
              <ShieldCheck size={14} className="text-brand-gold" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">The Strategic Summit Hub</span>
            </div>
            <h1 className="text-6xl md:text-[9rem] font-sora font-extrabold tracking-tighter leading-[0.8] mb-12">
              WELLTH <br/> <span className="text-brand-gold italic">WORKSHOPS.</span>
            </h1>
            
            {/* Redesigned subtext area for maximum impact */}
            <div className="max-w-3xl mx-auto relative px-6 py-8 border-y border-white/10">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-900 px-4">
                  <Sparkles size={16} className="text-brand-gold" />
               </div>
               <p className="text-xl md:text-3xl text-brand-100 font-medium leading-relaxed italic tracking-tight">
                Demystifying bookkeeping, tax compliance, and strategic planning through <span className="text-white font-black">interactive, high-impact</span> group learning.
               </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <EventHighlight />

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-sora font-extrabold text-brand-900 tracking-tighter uppercase leading-none">Why attend <br/> <span className="text-brand-gold italic">an IWS event?</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: <Users size={32} />, title: "Peer Networking", desc: "Connect with like-minded SMME owners and non-profit leaders in a high-trust environment." },
              { icon: <MapPin size={32} />, title: "In-Person Clarity", desc: "Interactive environments at Munyaka Lifestyle Estate and beyond, focusing on real-world execution." },
              { icon: <ShieldCheck size={32} />, title: "Expert Guidance", desc: "Direct access to Marcia Kgaphola's decade of financial wisdom and structural IQ." }
            ].map((feature, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.1} width="100%">
                <div className="text-center p-12 bg-gray-50 rounded-[3rem] border border-brand-900/5 shadow-sm hover:shadow-2xl hover:bg-white transition-all duration-500 h-full">
                  <div className="w-16 h-16 bg-brand-900 text-brand-gold rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black text-brand-900 mb-4 uppercase tracking-tighter">{feature.title}</h3>
                  <p className="text-brand-900/60 font-medium leading-relaxed text-sm">{feature.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Call to Action */}
      <section className="py-40 bg-brand-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent)]" />
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
            <h2 className="text-5xl md:text-7xl font-sora font-black mb-8 tracking-tighter">CAN'T MAKE IT <br/> <span className="text-brand-gold italic">IN PERSON?</span></h2>
            <p className="text-xl md:text-2xl text-brand-100/60 mb-16 font-medium leading-relaxed">Inquire about our digital toolkits and remote strategy reset clinics designed for high-performing founders.</p>
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={() => window.location.hash = '#contact'}
              className="rounded-full px-16 py-8 text-xl font-black bg-brand-gold text-brand-900 hover:bg-white transition-all shadow-2xl uppercase tracking-widest"
            >
                Request Digital Access
            </Button>
        </div>
      </section>
    </div>
  );
};

export default WorkshopPage;
