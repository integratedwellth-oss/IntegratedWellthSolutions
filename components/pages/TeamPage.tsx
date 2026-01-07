import React from 'react';
import Team from '../../Team'; 
import Philosophy from '../Philosophy';
import RevealOnScroll from '../RevealOnScroll';
import { Target, Compass, Heart } from 'lucide-react';

const TeamPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Base Team Grid */}
      <Team />

      {/* 2. Mission & Vision Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <RevealOnScroll>
              <div className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-3xl h-full border border-gray-100">
                <div className="w-16 h-16 bg-brand-900 text-brand-gold rounded-2xl flex items-center justify-center mb-6">
                  <Target size={32} />
                </div>
                <h3 className="text-2xl font-bold text-brand-900 mb-4">Vision</h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  To be the leading holistic empowerment partner in Africa, driving financial confidence and professional excellence.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-3xl h-full border border-gray-100">
                <div className="w-16 h-16 bg-brand-900 text-brand-gold rounded-2xl flex items-center justify-center mb-6">
                  <Compass size={32} />
                </div>
                <h3 className="text-2xl font-bold text-brand-900 mb-4">Mission</h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  Empowering clients with integrated solutions blending financial management, emotional intelligence, and digital innovation.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.4}>
              <div className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-3xl h-full border border-gray-100">
                <div className="w-16 h-16 bg-brand-900 text-brand-gold rounded-2xl flex items-center justify-center mb-6">
                  <Heart size={32} />
                </div>
                <h3 className="text-2xl font-bold text-brand-900 mb-4">Values</h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  We value integrity, empathy, and collaboration, co-creating solutions that align with specific financial goals.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 3. Deep-Dive Philosophy */}
      <Philosophy />
    </div>
  );
};

export default TeamPage;
