import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-brand-900 mb-6">Get In Touch</h2>
            <p className="text-gray-600 mb-8">
              Ready to gain financial clarity and strategic direction? Reach out to us directly or visit our offices.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-brand-100 p-3 rounded-full mr-4 text-brand-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Visit Us</h4>
                  <p className="text-gray-600">{CONTACT_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-brand-100 p-3 rounded-full mr-4 text-brand-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email</h4>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-600 hover:text-brand-600">{CONTACT_INFO.email}</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-brand-100 p-3 rounded-full mr-4 text-brand-600">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Call</h4>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="text-gray-600 hover:text-brand-600">{CONTACT_INFO.phone}</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-brand-100 p-3 rounded-full mr-4 text-brand-600">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Hours</h4>
                  <p className="text-gray-600">Mon - Fri: 08:00 - 17:00</p>
                  <p className="text-gray-600">Sat (Workshops Only): 09:00 - 13:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3590.2307844093954!2d28.2435459!3d-25.7601955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95610000000001%3A0x0!2sFred%20Messenger%20Ave%2C%20Pretoria!5e0!3m2!1sen!2sza!4v1620000000000!5m2!1sen!2sza" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
              title="Office Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;