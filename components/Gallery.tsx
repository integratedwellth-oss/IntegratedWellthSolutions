import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Using reliable Unsplash images to ensure gallery is never blank
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
    <section id="gallery" className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-900 font-sora">Wellth In Action</h2>
          <p className="text-gray-600">Workshops, strategy sessions, and community impact.</p>
        </div>
        
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
            pagination={{ clickable: true }}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev',
            }}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 30 },
              1024: { slidesPerView: 2.2, spaceBetween: 40 },
            }}
            className="!pb-12 h-[500px]" // Fixed height to prevent collapse
          >
            {IMAGES.map((img, idx) => (
              <SwiperSlide key={idx} className="transition-transform duration-300 transform h-full">
                {({ isActive }) => (
                  <div className={`
                    relative rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-500 h-full w-full
                    ${isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-60'}
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
                      <h3 className="text-3xl font-black text-white mb-2 font-sora uppercase">{img.title}</h3>
                      <p className="text-brand-gold font-bold tracking-widest text-sm">{img.description}</p>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          
          <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-4 rounded-full shadow-lg text-brand-900 hover:bg-brand-900 hover:text-white transition-all">
            <ArrowLeft size={24} />
          </button>
          <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-4 rounded-full shadow-lg text-brand-900 hover:bg-brand-900 hover:text-white transition-all">
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
