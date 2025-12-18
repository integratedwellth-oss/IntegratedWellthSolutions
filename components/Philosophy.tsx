import React from 'react';
import CountUp from './CountUp';
import RevealOnScroll from './RevealOnScroll';

const Philosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* LEFT COLUMN: IMAGE */}
          <div className="md:w-1/2">
            <RevealOnScroll>
              <div className="relative">
                <img 
                  src="https://res.cloudinary.com/dka0498ns/image/upload/v1765057729/Founder_Marcia_Kgaphola_agebxi.jpg" 
                  alt="Marcia Kgaphola" 
                  className="rounded-2xl shadow-2xl z-10 relative object-cover w-full h-auto"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-400 rounded-full z-0 opacity-20 hidden md:block"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-500 rounded-full z-0 opacity-20 hidden md:block"></div>
              </div>
            </RevealOnScroll>
          </div>

          {/* RIGHT COLUMN: CONTENT */}
          <div className="md:w-1/2">
            <RevealOnScroll delay={0.2}>
              <h2 className="text-sm font-bold text-brand-600 uppercase tracking-wider mb-2">The Founder</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">Marcia Kgaphola</h3>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.3}>
              <p className="text-lg text-gray-600 mb-6 font-light italic pl-4 border-l-4 border-yellow-400">
                "Financial success is not just about the numbers on a spreadsheet. It is about the behavior, mindset, and emotional intelligence behind those numbers."
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.4}>
              {/* Origin Story */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                As a Chartered Business Accountant, Marcia noticed a recurring pattern: excellent businesses failing not due to lack of skill, but due to poor financial habits and compliance oversight.
              </p>
              
              {/* NEW BLENDED TEXT STARTS HERE */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                Integrated Wellth Solutions was born to bridge that gap. We offer comprehensive personal and professional growth support, integrating <strong>financial, emotional, and empowerment services</strong> for diverse clients—from entrepreneurs to teens.
              </p>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Our team delivers tailored solutions encompassing financial planning, accounting, organizational development, and digital marketing. By <strong>leveraging AI and local insights</strong>, we simplify complex processes to unlock your potential and create a future of financial stability and professional excellence.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.5}>
              <div className="grid grid-cols-2 gap-4 text-center mt-8">
                <div className="bg-brand-50 p-4 rounded-lg">
                  <div className="font-bold text-3xl text-brand-700">
                    <CountUp end={10} suffix="+" />
                  </div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="bg-brand-50 p-4 rounded-lg">
                  <div className="font-bold text-3xl text-brand-700">
                    <CountUp end={100} suffix="%" />
                  </div>
                  <div className="text-sm text-gray-600">Compliance Rate</div>
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
