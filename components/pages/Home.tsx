import React from 'react';
import Hero from '../Hero';
import TrustedBy from '../TrustedBy';
import Services from '../Services';
import NewsTicker from '../NewsTicker';
import StrategicJourney from '../StrategicJourney';
import Testimonials from '../Testimonials';
import Gallery from '../Gallery';
import RevealOnScroll from '../RevealOnScroll';
import Button from '../Button';
import { Sparkles, HeartHandshake, ArrowRight } from 'lucide-react';

interface HomeProps {
  onOpenAssessment: () => void;
}

const Home: React.FC<HomeProps> = ({ onOpenAssessment }) => {
  return (
    <div className="bg-white">
      <Hero />
      <TrustedBy />
      <NewsTicker />
      
      <div id="services-anchor">
        <Services />
      </div>

      <div id="protocol">
        <StrategicJourney />
      </div>

      {/* Strategic CTA Section */}
      <section className="py-32 bg-brand-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_#d4af37_1px,_transparent_1px)] bg-[length:40px_40px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-12">
              <HeartHandshake size={18} className="text-brand-gold" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">Sovereign Accountability</span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-sora font-extrabold text-white tracking-tighter leading-[0.9] mb-12">
              THE "LONELY <br/> JOURNEY" <span className="text-brand-gold italic">ENDS HERE.</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
               <Button 
                onClick={onOpenAssessment}
                size="lg"
                className="rounded-full px-16 py-8 text-xl bg-brand-gold text-brand-900 font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl"
               >
                 Enter Sovereignty
               </Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <Testimonials />
      <Gallery />
      
      {/* Final Institutional CTA */}
      <section className="py-40 bg-white relative flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(#134e4a 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
        
        <RevealOnScroll>
          <div className="space-y-12">
            <div className="flex justify-center mb-10">
              <div className="w-24 h-24 bg-brand-900 rounded-[2rem] flex items-center justify-center shadow-2xl animate-float">
                <Sparkles className="text-brand-gold" size={40} />
              </div>
            </div>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-sora font-black text-brand-900 tracking-tighter leading-[0.8]">
              LEGACY <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-900 via-brand-700 to-brand-gold italic">SECURED.</span>
            </h2>
            <div className="flex justify-center pt-12">
              <Button
                onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')}
                size="lg"
                className="rounded-full px-16 py-8 text-xl font-black bg-brand-900 shadow-2xl hover:bg-brand-gold hover:text-brand-900 transition-all border border-white/10 hover:scale-105"
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
