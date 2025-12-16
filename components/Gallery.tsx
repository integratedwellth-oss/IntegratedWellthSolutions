import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const IMAGES = [
  {
    url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321879/Integrated_Wellth_-_Women_empowerment_tahf5l.jpg",
    title: "Women Empowerment",
    description: "Inspiring growth and leadership."
  },
  {
    url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321879/Integrated_Wellth_Business_Lunch_raaj59.jpg",
    title: "Business Networking",
    description: "Connecting minds over strategy."
  },
  {
    url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321879/Integrated_Wellth_War_room_mfqafl.jpg",
    title: "The War Room",
    description: "Deep dive strategy sessions."
  },
  {
    url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321879/Integrated_Wellth_with_HEIR_pdqsye.jpg",
    title: "Partnering with HEIR",
    description: "Collaborative success."
  },
  {
    url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321879/Integrated_Wellth_kids_Miss_Tembisa_oizqwt.jpg",
    title: "Community Outreach",
    description: "Supporting the next generation."
  },
  {
    url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321878/Integrated_Wellth_Financial_Literacy._nscht7.jpg",
    title: "Financial Literacy",
    description: "Education for sustainable wealth."
  },
  {
    url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321878/Integrated_Wellth_Miss_Tembisa_lqlxbd.jpg",
    title: "Miss Tembisa",
    description: "Celebrating local excellence."
  },
  {
    url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321878/Integrated_Wellth_Financial_Literacy_sessions_gkvdll.jpg",
    title: "Group Sessions",
    description: "Interactive learning environments."
  },
  {
    url: "https://res.cloudinary.com/dka0498ns/image/upload/v1765321877/Integrated_Wellth_Solution_Founder._Marcia_Kgaphola_t5u2ea.jpg",
    title: "Our Founder",
    description: "Marcia Kgaphola leading the way."
  }
];

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-900">Wellth In Action</h2>
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
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
            }}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev',
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 2.2, // Show slightly more context on larger screens
                spaceBetween: 40,
              },
            }}
            className="mySwiper !pb-12"
          >
            {IMAGES.map((img, idx) => (
              <SwiperSlide key={idx} className="transition-transform duration-300 transform">
                {({ isActive }) => (
                  <div className={`
                    relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-500
                    ${isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-60'}
                    h-[300px] sm:h-[400px] md:h-[500px]
                  `}>
                    <img 
                      src={img.url} 
                      alt={img.title} 
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay Content */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                      flex flex-col justify-end p-6 md:p-8
                      transition-opacity duration-300
                      ${isActive ? 'opacity-100' : 'opacity-0'}
                    `}>
                      <h3 className="text-2xl font-bold text-white mb-2">{img.title}</h3>
                      <p className="text-brand-100 font-medium">{img.description}</p>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="custom-prev absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-3 rounded-full shadow-lg text-brand-900 hover:bg-brand-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100">
            <ArrowLeft size={24} />
          </button>
          <button className="custom-next absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-3 rounded-full shadow-lg text-brand-900 hover:bg-brand-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100">
            <ArrowRight size={24} />
          </button>
          
          {/* Pagination Container */}
          <div className="swiper-pagination absolute bottom-0 !bottom-0 flex justify-center w-full z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;