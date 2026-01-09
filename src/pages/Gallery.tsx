import React from 'react';

const Gallery = () => {
  const images = [
    { 
      url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321879/Integrated_Wellth_War_room_mfqafl.jpg", 
      caption: "The War Room Strategy Session" 
    },
    { 
      url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321879/Integrated_Wellth_-_Women_empowerment_tahf5l.jpg", 
      caption: "Women Empowerment Initiative" 
    },
    { 
      url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321879/Integrated_Wellth_Business_Lunch_raaj59.jpg", 
      caption: "Executive Business Lunch" 
    },
    { 
      url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321879/Integrated_Wellth_with_HEIR_pdqsye.jpg", 
      caption: "IWS with HEIR" 
    },
    { 
      url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321879/Integrated_Wellth_kids_Miss_Tembisa_oizqwt.jpg", 
      caption: "Miss Tembisa Community Support" 
    },
    { 
      url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321878/Integrated_Wellth_Financial_Literacy._nscht7.jpg", 
      caption: "Financial Literacy Training" 
    },
    { 
      url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321878/Integrated_Wellth_Financial_Literacy_sessions_gkvdll.jpg", 
      caption: "Classroom Sessions" 
    },
    { 
      url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765644818/Accountability_Partnership._SMMEs_review_session._egzihs.jpg", 
      caption: "SMME Accountability Review" 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-40 pb-20 px-6 font-inter">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-brand-900 tracking-tight mb-6 font-sora">
            Operational <span className="text-brand-gold">Theater.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            Visual intelligence from our workshops, strategy sessions, and community engagements.
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
