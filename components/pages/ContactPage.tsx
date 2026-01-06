import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Calendar, ArrowRight } from 'lucide-react';
import Button from '../Button';
import RevealOnScroll from '../RevealOnScroll';

const ContactPage: React.FC = () => {
  const openCalendly = () => {
    window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank');
  };

  return (
    <div className="animate-fadeIn bg-white min-h-screen">
      {/* 1. Page Header */}
      <div className="bg-brand-900 pt-32 pb-20 px-6 md:px-20 text-center">
        <RevealOnScroll>
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 backdrop-blur-md mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">Secure Communications Protocol</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-sora font-extrabold tracking-tighter text-white leading-none mb-6">
            Get In <span className="italic text-brand-gold">Touch.</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-medium leading-relaxed">
            Ready to gain financial clarity and strategic direction? Reach out to our advisors directly or visit our Pretoria offices.
          </p>
        </RevealOnScroll>
      </div>

      {/* 2. Communication Modules */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Direct Call */}
          <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-brand-900 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:bg-brand-gold group-hover:text-brand-900 transition-colors">
              <Phone size={28} />
            </div>
            <h3 className="text-2xl font-bold text-brand-900 mb-2">Voice Consultation</h3>
            <p className="text-gray-600 mb-6 font-medium">Speak directly with our strategy team for immediate inquiries.</p>
            <a href="tel:+27812355910" className="text-xl font-black text-brand-900 hover:text-brand-gold transition-colors">+27 81 235 5910</a>
          </div>

          {/* Secure Email */}
          <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-brand-900 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:bg-brand-gold group-hover:text-brand-900 transition-colors">
              <Mail size={28} />
            </div>
            <h3 className="text-2xl font-bold text-brand-900 mb-2">Secure Email</h3>
            <p className="text-gray-600 mb-6 font-medium">Send detailed briefs or compliance documentation for review.</p>
            <a href="mailto:enquiries@integratedwellth.co.za" className="text-lg font-black text-brand-900 hover:text-brand-gold transition-colors break-words">enquiries@integratedwellth.co.za</a>
          </div>

          {/* Digital Access */}
          <div className="bg-brand-gold p-10 rounded-[2.5rem] shadow-2xl transition-all group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-brand-900 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                <Calendar size={28} />
              </div>
              <h3 className="text-2xl font-bold text-brand-900 mb-2">Instant Booking</h3>
              <p className="text-brand-900/70 mb-6 font-bold">Skip the queue and book a 30-minute introductory strategy call.</p>
            </div>
            <Button onClick={openCalendly} className="bg-brand-900 text-white rounded-full py-4 font-black uppercase tracking-widest text-xs w-full flex items-center justify-center gap-3">
              Schedule Now <ArrowRight size={16} />
            </Button>
          </div>
        </div>

        {/* 3. Location & Map Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-2xl">
          <div className="p-12 md:p-16 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-extrabold text-brand-900 tracking-tighter">Strategic HQ</h2>
              <div className="flex items-start gap-4 text-gray-600">
                <MapPin className="text-brand-gold flex-shrink-0 mt-1" size={24} />
                <p className="text-lg font-medium leading-relaxed">
                  Fred Messenger Ave, Munyaka Estate<br />
                  Pretoria, South Africa
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-4 text-gray-600 font-bold uppercase tracking-widest text-xs">
                <Clock className="text-brand-gold" size={18} />
                <span>Operating Hours</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                <div>
                  <p className="text-brand-900 font-bold">Mon - Fri</p>
                  <p className="text-gray-500">08:00 - 17:00</p>
                </div>
                <div>
                  <p className="text-brand-900 font-bold">Sat</p>
                  <p className="text-gray-500">Workshops Only</p>
                </div>
              </div>
            </div>
            
            <div className="pt-8">
              <button 
                onClick={() => window.open('https://wa.link/o1ezvw', '_blank')}
                className="flex items-center gap-3 text-brand-900 font-black uppercase tracking-tighter hover:text-brand-gold transition-colors"
              >
                <MessageSquare size={20} className="text-emerald-500" />
                Live WhatsApp Support Available
              </button>
            </div>
          </div>

          <div className="h-[500px] w-full bg-gray-200 grayscale contrast-125 hover:grayscale-0 transition-all duration-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3591.246414704043!2d28.2435459!3d-25.7601955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95610000000001%3A0x0!2sFred%20Messenger%20Ave%2C%20Pretoria!5e0!3m2!1sen!2sza!4v1620000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              title="IWS Pretoria Office"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
