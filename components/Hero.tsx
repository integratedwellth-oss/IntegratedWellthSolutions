import React from 'react';
import Button from './Button';
import { ArrowRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const Hero: React.FC = () => {
  return (
    <div className="relative pt-20">
      <div className="relative bg-brand-900 h-[600px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dka0498ns/image/upload/v1765644818/Accountability_Partnership._SMMEs_review_session._egzihs.jpg" 
            alt="Accountability Partnership Review Session" 
            className="w-full h-full object-cover opacity-30 animate-pulse-slow" 
            style={{ animationDuration: '10s' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 to-brand-900/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-white">
            <RevealOnScroll>
              <div className="mb-6 inline-block bg-yellow-500/20 border border-yellow-500/50 rounded-full px-4 py-1.5 backdrop-blur-sm">
                <span className="text-yellow-400 font-semibold text-sm tracking-wide uppercase">Strategic Consultancy</span>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.2}>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Where you are going matters more than where you have been.
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={0.4}>
              <p className="text-xl text-gray-200 mb-8 font-light">
                Transforming lives through emotional, financial, and personal wellness. We combine IQ and EQ for holistic business success.
              </p>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" size="lg" onClick={() => window.location.hash = '#assessment'}>
                  Check Financial Health
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10" onClick={() => window.location.hash = '#services'}>
                  Explore Services <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* Dynamic Banner */}
        <div className="absolute bottom-0 w-full bg-yellow-500/90 backdrop-blur-md py-3 px-4 cursor-pointer hover:bg-yellow-500 transition-colors" onClick={() => window.location.hash = '#upcoming-event'}>
          <div className="max-w-7xl mx-auto flex justify-between items-center text-brand-900 font-bold">
            <div className="flex items-center gap-2">
              <span className="bg-brand-900 text-white px-2 py-0.5 rounded text-xs uppercase">Upcoming</span>
              <span className="hidden sm:inline">Financial Clarity Workshop - Feb 28, 2026</span>
              <span className="sm:hidden">Financial Clarity Workshop</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              Register Now <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;