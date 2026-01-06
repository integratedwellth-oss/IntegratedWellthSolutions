import React from 'react';
import Philosophy from './components/Philosophy';
import RevealOnScroll from './components/RevealOnScroll';
import { Target, Linkedin, Mail } from 'lucide-react';
import Button from './components/Button';

const Team: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      {/* Header Section */}
      <div className="bg-brand-50 py-24 px-4 border-b border-brand-100 pt-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-brand-600 font-bold uppercase tracking-widest text-sm mb-4">
            <Target size={20} />
            <span>Leadership & Vision</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-900 mb-6">Our Identity</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A multidisciplinary firm founded on the belief that financial strategy and human behavior are inseparable.
          </p>
        </div>
      </div>

      <Philosophy />

      {/* Founder Contact Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <RevealOnScroll>
                    <div className="space-y-8">
                        <h2 className="text-4xl font-serif font-bold text-brand-900">Get in Touch with Marcia</h2>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Looking for a strategic partner to guide your business through the complexities of the South African market? Connect directly with our founder.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-4 bg-gray-100 rounded-full text-brand-900 hover:bg-brand-900 hover:text-white transition-all">
                                <Linkedin size={24} />
                            </a>
                            <a href="mailto:enquiries@integratedwellth.co.za" className="p-4 bg-gray-100 rounded-full text-brand-900 hover:bg-brand-900 hover:text-white transition-all">
                                <Mail size={24} />
                            </a>
                        </div>
                        <Button size="lg" onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')}>
                            Schedule an Introductory Call
                        </Button>
                    </div>
                </RevealOnScroll>
                
                <RevealOnScroll delay={0.3}>
                    <div className="bg-brand-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full translate-x-10 -translate-y-10"></div>
                        <h3 className="text-2xl font-bold mb-6">Founder's Mission</h3>
                        <blockquote className="text-xl italic font-serif leading-relaxed text-brand-100">
                            "I created IWS to be the firm I wished existed when I started my journey—a place where technical compliance is handled with precision, but the founder's mind is protected with equal vigor."
                        </blockquote>
                        <div className="mt-8 font-bold text-yellow-500">— Marcia Kgaphola</div>
                    </div>
                </RevealOnScroll>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
