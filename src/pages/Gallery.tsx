import React from 'react';

const Gallery = () => {
  // Using placeholders. You can replace these URLs with your specific event photos later.
  const images = [
    { url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765057729/Founder_Marcia_Kgaphola_agebxi.jpg", caption: "Executive Strategy Session" },
    { url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop", caption: "Boardroom Governance" },
    { url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop", caption: "Financial IQ Workshop" },
    { url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop", caption: "Team Alignment" },
    { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop", caption: "Legacy Planning" },
    { url: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto=format&fit=crop", caption: "Digital Systems Integration" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-40 pb-20 px-6 font-inter">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-brand-900 tracking-tight mb-6 font-sora">
            Operational <span className="text-brand-gold">Theater.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            Visual intelligence from our workshops, strategy sessions, and client engagements.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((img, i) => (
            <div key={i} className="break-inside-avoid bg-white p-3 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
              <div className="relative overflow-hidden rounded-xl group">
                <img 
                  src={img.url} 
                  alt={img.caption} 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-bold font-sora uppercase tracking-wider text-sm border-l-2 border-brand-gold pl-3">
                    {img.caption}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
