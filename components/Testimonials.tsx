import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const Testimonials: React.FC = () => {
  // Swiper loop mode requires significantly more slides than slidesPerView
  // for smooth operation. With only 2 testimonials, we disable loop to avoid console warnings.
  const isLoopable = TESTIMONIALS.length > 2;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll width="100%">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-900 uppercase tracking-tight">Real Success Stories</h2>
            <p className="text-gray-500 font-medium">Results from businesses we have transformed through clarity.</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll width="100%">
          <div className="relative group px-4 md:px-8">
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={isLoopable}
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              pagination={{
                clickable: true,
                el: '.swiper-pagination-testimonials',
                dynamicBullets: true,
              }}
              navigation={{
                nextEl: '.test-next',
                prevEl: '.test-prev',
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: Math.min(TESTIMONIALS.length, 2),
                  spaceBetween: 30,
                }
              }}
              className="!pb-16"
            >
              {TESTIMONIALS.map((t, i) => (
                <SwiperSlide key={i} className="h-auto pb-2">
                  <div className="bg-brand-50/50 p-10 rounded-[2.5rem] border border-brand-900/5 flex flex-col h-full hover:shadow-xl transition-all duration-500 mx-1">
                    <Quote className="text-brand-gold w-10 h-10 mb-6 opacity-40" />
                    <p className="text-brand-900 italic mb-8 flex-grow text-lg leading-relaxed font-medium">"{t.quote}"</p>
                    <div className="flex items-center mt-auto pt-6 border-t border-brand-900/5">
                      <div className="w-14 h-14 rounded-2xl bg-brand-900 flex items-center justify-center text-white font-black text-2xl mr-5 flex-shrink-0 shadow-lg">
                          {t.name[0]}
                      </div>
                      <div>
                        <div className="font-black text-brand-900 uppercase tracking-tight">{t.name}</div>
                        <div className="text-xs font-bold text-brand-900/40 uppercase tracking-widest">{t.role}</div>
                        <div className="text-[10px] text-brand-gold uppercase mt-1 tracking-[0.2em] font-black">{t.type}</div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Controls */}
            <button className="test-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-2xl border border-brand-900/5 p-4 rounded-2xl text-brand-900 hover:bg-brand-900 hover:text-white transition-all duration-300 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 -ml-4">
                <ChevronLeft size={24} />
            </button>
            <button className="test-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-2xl border border-brand-900/5 p-4 rounded-2xl text-brand-900 hover:bg-brand-900 hover:text-white transition-all duration-300 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 -mr-4">
                <ChevronRight size={24} />
            </button>
            
            <div className="swiper-pagination-testimonials flex justify-center mt-2 w-full absolute bottom-0"></div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Testimonials;