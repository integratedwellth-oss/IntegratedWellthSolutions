import React from 'react';
import Hero from '../Hero';
import TrustedBy from '../TrustedBy';
import Services from '../Services';
import RevealOnScroll from '../RevealOnScroll';
import Button from '../Button';
import NewsTicker from '../NewsTicker';
import { ArrowUpRight, Sparkles, Target, ChevronRight, HeartHandshake } from 'lucide-react';
import StrategicJourney from '../StrategicJourney';
import WarRoom from '../WarRoom';
import Testimonials from '../Testimonials';
import Gallery from '../Gallery';
import { CONTACT_INFO } from '../../constants';

interface HomeProps {
  onOpenAssessment: () => void;
}

const Home: React.FC<HomeProps> = ({ onOpenAssessment }) => {
  return (
    <div className="space-y-0 bg-white">
      <Hero />
      <TrustedBy />
      <NewsTicker />

      {/* Primary Solutions Ecosystem */}
      <div id="services"> {/* ID ADDED HERE */}
        <Services />
      </div>

      <div id="protocol"> {/* ID ADDED HERE */}
        <StrategicJourney />
      </div>

      {/* Dramatic Transition: The Lonely Journey Entrance */}
      <section className="py-40 bg-brand-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-12 text-brand-gold">
                <HeartHandshake size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Sovereign Accountability</span>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <h2 className="text-6xl md:text-[9rem] font-sora font-extrabold text-white tracking-tighter leading-[0.8] mb-12">
                THE "LONELY <br/> JOURNEY" <span className="text-brand-gold italic">ENDS HERE.</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  onClick={() => window.location.hash = '#accountability'}
                  size="lg" 
                  className="rounded-full px-16 py-8 text-xl bg-brand-gold text-brand-900 font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl"
                >
                  Enter Sovereignty
                </Button>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Firm Logic & Audit Section */}
      <div id="warroom"> {/* ID ADDED HERE */}
        <WarRoom />
      </div>

      <Testimonials />
      <Gallery />
      
      {/* Final Institutional Call */}
      <section className="py-60 bg-white relative flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#134e4a 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>
        
        <RevealOnScroll>
          <div className="space-y-12">
            <div className="flex justify-center mb-10">
              <div className="w-24 h-24 bg-brand-900 rounded-[2rem] flex items-center justify-center shadow-2xl animate-float">
                <Sparkles className="text-brand-gold" size={40} />
              </div>
            </div>
            <h2 className="text-8xl md:text-[14rem] font-sora font-black text-brand-900 tracking-tighter leading-[0.75]">
              LEGACY <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-900 via-brand-700 to-brand-gold italic">SECURED.</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 pt-12">
              <Button 
                onClick={() => window.open(CONTACT_INFO.calendlyUrl, '_blank')}
                size="lg"
                className="rounded-[2.5rem] px-20 py-10 text-3xl font-black bg-brand-900 shadow-[0_40px_100px_rgba(19,78,74,0.4)] hover:bg-brand-gold hover:text-brand-900 transition-all border border-white/10 hover:scale-105"
              >
                CONSULT LEADERSHIP
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
};

export default Home;
