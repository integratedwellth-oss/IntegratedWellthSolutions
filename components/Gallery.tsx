import React from 'react';
// Re-import Swiper modules for carousel functionality
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

// RESTORED FULL IMAGE LIST (9 images)
const IMAGES = [
  {
    url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765644818/Accountability_Partnership._SMMEs_review_session._egzihs.jpg",
    title: "Accountability Review",
    description: "Deep dive strategy sessions for SMME resilience."
  },
  {
    url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321879/Integrated_Wellth_-_Women_empowerment_tahf5l.jpg",
    title: "Women Empowerment",
    description: "Inspiring growth and leadership."
  },
  {
    url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321879/Integrated_Wellth_Business_Lunch_raaj59.jpg",
    title: "Business Networking",
    description: "Connecting strategy over business lunch."
  },
  {
    url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321879/Integrated_Wellth_War_room_mfqafl.jpg",
    title: "The War Room Session",
    description: "High-fidelity strategic simulation."
  },
  {
    url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321879/Integrated_Wellth_with_HEIR_pdqsye.jpg",
    title: "Partnering with HEIR",
    description: "Collaborative success stories."
  },
  {
    url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321879/Integrated_Wellth_kids_Miss_Tembisa_oizqwt.jpg",
    title: "Community Outreach",
    description: "Supporting the next generation of entrepreneurs."
  },
  {
    url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321878/Integrated_Wellth_Financial_Literacy._nscht7.jpg",
    title: "Financial Literacy",
    description: "Education for sustainable wealth."
  },
  {
    url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321878/Integrated_Wellth_Financial_Literacy_sessions_gkvdll.jpg",
    title: "Group Sessions",
    description: "Interactive learning environments."
  },
  {
    url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321878/Integrated_Wellth_Miss_Tembisa_lqlxbd.jpg",
    title: "Miss Tembisa",
    description: "Celebrating local excellence and partnership."
  }
];

const Gallery: React.FC = () => {
  return (
    // BROWN BACKGROUND
    <section id="gallery" className="py-24" style={{ backgroundColor: "#3E2723" }}>
      <div className="max-w-[1600px] mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white font-sora tracking-tighter mb-2">WELLTH IN ACTION</h2>
            <p className="text-brand-gold/80 mt-4 text-lg font-medium">Workshops, strategy sessions, and community impact.</p>
          </div>
        </RevealOnScroll>
        
        {/* CAROUSEL CONTAINER */}
        <div className="relative group">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            slidesPerView={1.2}
            centeredSlides={true}
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true, el: '.swiper-pagination-gallery' }}
            navigation={{
              nextEl: '.custom-next-gallery',
              prevEl: '.custom-prev-gallery',
            }}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 30 },
              1024: { slidesPerView: 2.5, spaceBetween: 40 }, // Show 2.5 slides for context
            }}
            className="!pb-16 h-[500px]"
          >
            {IMAGES.map((img, idx) => (
              <SwiperSlide key={idx} className="h-full">
                {({ isActive }) => (
                  <div className={`
                    relative rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-500 h-full w-full
                    ${isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-70'}
                  `}>
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`
                      absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/20 to-transparent
                      flex flex-col justify-end p-8
                      transition-opacity duration-300
                      ${isActive ? 'opacity-100' : 'opacity-0'}
                    `}>
                      <h3 className="text-2xl font-black text-white mb-1 font-sora uppercase leading-none">{img.title}</h3>
                      <p className="text-brand-gold text-xs font-bold tracking-widest mb-4 opacity-100">{img.description}</p>
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md border border-white/20">
                         <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation Buttons (Hidden by default, shown on hover/desktop) */}
          <button className="custom-prev-gallery absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-4 rounded-full text-brand-900 hover:bg-brand-gold transition-all opacity-0 group-hover:opacity-100">
            <ArrowLeft size={24} />
          </button>
          <button className="custom-next-gallery absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-4 rounded-full text-brand-900 hover:bg-brand-gold transition-all opacity-0 group-hover:opacity-100">
            <ArrowRight size={24} />
          </button>

          <div className="swiper-pagination-gallery flex justify-center mt-8 w-full absolute bottom-0"></div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
