import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll width="100%">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-900">Success Stories</h2>
            <p className="text-gray-600">Real results from businesses we have transformed.</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll width="100%">
          <div className="relative group px-4 md:px-8">
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
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
                  slidesPerView: 2,
                  spaceBetween: 30,
                }
              }}
              className="!pb-16"
            >
              {TESTIMONIALS.map((t, i) => (
                <SwiperSlide key={i} className="h-auto pb-2">
                  <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow duration-300 mx-1">
                    <Quote className="text-brand-200 w-10 h-10 mb-4" />
                    <p className="text-gray-700 italic mb-6 flex-grow text-lg leading-relaxed">"{t.quote}"</p>
                    <div className="flex items-center mt-auto border-t border-gray-200 pt-4">
                      <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
                          {t.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-brand-900">{t.name}</div>
                        <div className="text-sm font-medium text-gray-600">{t.role}</div>
                        <div className="text-xs text-brand-500 uppercase mt-0.5 tracking-wide font-bold">{t.type}</div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="test-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-gray-100 p-3 rounded-full text-brand-900 hover:bg-brand-600 hover:text-white transition-all duration-300 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 -ml-4 lg:-ml-6">
                <ChevronLeft size={24} />
            </button>
            <button className="test-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-gray-100 p-3 rounded-full text-brand-900 hover:bg-brand-600 hover:text-white transition-all duration-300 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 -mr-4 lg:-mr-6">
                <ChevronRight size={24} />
            </button>
            
            {/* Custom Pagination Container */}
            <div className="swiper-pagination-testimonials flex justify-center mt-2 w-full absolute bottom-0"></div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Testimonials;