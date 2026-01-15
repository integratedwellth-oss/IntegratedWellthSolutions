import React from 'react';
import Contact from '../Contact';
import RevealOnScroll from '../RevealOnScroll';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { CONTACT_INFO } from '../../constants';

const ContactPage: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <div className="bg-brand-50 py-24 px-4 border-b border-brand-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-900 mb-6">Connect With Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional guidance is just a message away. Our team is ready to assist you with compliance, strategy, or wellness.
          </p>
        </div>
      </div>

      <Contact />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { icon: <Mail />, title: "Email", value: CONTACT_INFO.email },
                    { icon: <Phone />, title: "Phone", value: CONTACT_INFO.phone },
                    { icon: <MapPin />, title: "Location", value: "Pretoria, South Africa" },
                    { icon: <Clock />, title: "Hours", value: "Mon - Fri: 08:00 - 17:00" }
                ].map((item, idx) => (
                    <RevealOnScroll key={idx} delay={idx * 0.1}>
                        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 text-center hover:bg-brand-50 transition-colors">
                            <div className="w-10 h-10 bg-brand-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                {item.icon}
                            </div>
                            <h3 className="font-bold text-brand-900 mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm break-words">{item.value}</p>
                        </div>
                    </RevealOnScroll>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;