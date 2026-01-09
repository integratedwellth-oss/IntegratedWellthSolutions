import React from 'react';
import { Mail, Phone, MapPin, Clock, Calendar } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-brand-900 uppercase tracking-tighter mb-6">
            Secure <span className="text-brand-gold">Comms.</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* INFO CARD */}
          <div className="bg-brand-900 text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-6">
                <div className="bg-white/10 p-4 rounded-2xl"><MapPin className="text-brand-gold" size={24}/></div>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-sm text-brand-gold mb-1">HQ Location</h3>
                  <p className="text-lg font-medium">Munyaka Lifestyle Estate,<br/>Waterfall City, Pretoria</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-white/10 p-4 rounded-2xl"><Mail className="text-brand-gold" size={24}/></div>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-sm text-brand-gold mb-1">Digital Comms</h3>
                  <p className="text-lg font-medium">enquiries@integratedwellth.co.za</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-white/10 p-4 rounded-2xl"><Phone className="text-brand-gold" size={24}/></div>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-sm text-brand-gold mb-1">Direct Line</h3>
                  <p className="text-lg font-medium">+27 74 494 0771</p>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10">
                <button onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')} className="w-full py-4 bg-brand-gold text-brand-900 font-black uppercase tracking-widest rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2">
                  <Calendar size={18} /> Book Strategy Session
                </button>
              </div>
            </div>
          </div>

          {/* MAP PLACEHOLDER */}
          <div className="bg-gray-200 rounded-[3rem] min-h-[400px] overflow-hidden shadow-inner border border-gray-300 relative group">
             {/* You can replace this iframe with your specific Google Maps embed URL later */}
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3586.273618428805!2d28.1066!3d-26.0028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDAwJzEwLjEiUyAyOMKwMDYnMjMuOCJF!5e0!3m2!1sen!2sza!4v1631234567890!5m2!1sen!2sza" 
               width="100%" 
               height="100%" 
               style={{border:0}} 
               allowFullScreen 
               loading="lazy" 
               className="grayscale group-hover:grayscale-0 transition-all duration-700"
             ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
