import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const Testimonials: React.FC = () => {
  const isLoopable = TESTIMONIALS.length > 2;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-50/50 -z-10 rounded-l-[100px]"></div>

      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll width="100%">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-brand-900 uppercase tracking-tighter mb-4">
              Real Success Stories
            </h2>
            <p className="text-xl text-brand-900/60 font-medium">
              Results from businesses we have transformed through clarity.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll width="100%">
          <div className="relative group px-4">
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={40}
              slidesPerView={1}
              loop={isLoopable}
              autoplay={{
                delay: 5000,
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
                768: {
                  slidesPerView: Math.min(TESTIMONIALS.length, 2),
                  spaceBetween: 40,
                }
              }}
              className="!pb-20"
            >
              {TESTIMONIALS.map((t, i) => (
                <SwiperSlide key={i} className="h-auto pb-4">
                  {/* FORCED DARK BACKGROUND FOR VISIBILITY */}
                  <div className="bg-brand-900 p-10 rounded-[2.5rem] border border-white/10 flex flex-col h-full shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                    
                    {/* Decorative Quote Icon */}
                    <div className="absolute top-8 right-8 opacity-10">
                      <Quote size={80} className="text-white" />
                    </div>

                    <div className="flex gap-1 mb-6">
                       {[1,2,3,4,5].map(s => <Star key={s} size={16} className="fill-brand-gold text-brand-gold" />)}
                    </div>

                    <p className="text-white text-lg leading-relaxed font-medium mb-10 flex-grow relative z-10">
                      "{t.quote}"
                    </p>

                    <div className="flex items-center mt-auto pt-8 border-t border-white/10">
                      <div className="w-14 h-14 rounded-2xl bg-brand-gold text-brand-900 flex items-center justify-center font-black text-2xl mr-5 flex-shrink-0 shadow-lg">
                        {t.name[0]}
                      </div>
                      <div>
                        <div className="font-black text-white uppercase tracking-wide text-lg">{t.name}</div>
                        <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">{t.role}</div>
                        <span className="inline-block bg-white/10 px-2 py-1 rounded text-[10px] font-black text-brand-gold uppercase tracking-widest">
                          {t.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Controls */}
            <button className="test-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl border border-brand-900/10 p-4 rounded-full text-brand-900 hover:bg-brand-gold transition-all hidden md:flex -ml-6 hover:scale-110">
              <ChevronLeft size={24} />
            </button>
            <button className="test-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl border border-brand-900/10 p-4 rounded-full text-brand-900 hover:bg-brand-gold transition-all hidden md:flex -mr-6 hover:scale-110">
              <ChevronRight size={24} />
            </button>

            <div className="swiper-pagination-testimonials flex justify-center mt-8 w-full absolute bottom-0"></div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Testimonials;
