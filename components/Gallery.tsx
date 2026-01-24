import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1600",
    title: "Executive Workshops",
    description: "High-impact strategy sessions for founders."
  },
  {
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1600",
    title: "Women in Leadership",
    description: "Empowering the next generation of CEOs."
  },
  {
    url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1600",
    title: "Strategic Planning",
    description: "Mapping the road to financial sovereignty."
  },
  {
    url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1600",
    title: "Community Impact",
    description: "Building wealth that builds communities."
  }
];

const Gallery: React.FC = () => {
  return (
    // CHANGED TO BROWN BACKGROUND
    <section id="gallery" className="py-24" style={{ backgroundColor: "#3E2723" }}>
      <div className="max-w-[1600px] mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white font-sora tracking-tighter">WELLTH IN ACTION</h2>
            <p className="text-brand-gold/80 mt-4 text-lg font-medium">Workshops, strategy sessions, and community impact.</p>
          </div>
        </RevealOnScroll>
        
        {/* CHANGED TO GRID FOR RELIABILITY */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {IMAGES.map((img, idx) => (
            <RevealOnScroll key={idx} delay={idx * 0.1}>
              <div className="group relative h-[400px] rounded-[2rem] overflow-hidden border-2 border-white/5 cursor-pointer">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/20 to-transparent flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl font-black text-white mb-1 font-sora uppercase leading-none">{img.title}</h3>
                  <p className="text-brand-gold text-xs font-bold tracking-widest mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{img.description}</p>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md border border-white/20">
                     <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
