import React from 'react';
import { motion } from "framer-motion";
import { Mail, Target, Compass, Heart, Linkedin } from "lucide-react";
import Philosophy from './components/Philosophy';
import RevealOnScroll from './components/RevealOnScroll';
import Button from './components/Button';

const TEAM = [
  {
    name: "Marcia Kgaphola",
    role: "Founder & Principal Consultant",
    bio: "Strategic visionary helping organizations navigate complex financial landscapes to achieve sustainable wealth.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766077285/Chartered_Business_Practice_CIBA_Hons_Psychological_Counselling_Risk_and_Project_Management_ubcpy9.jpg",
    email: "marcia@integratedwellth.co.za"
  },
  {
    name: "Thabo Leslie Motsumi",
    role: "AI & Digital Marketing Specialist",
    bio: "Expert in AI, Google My Business Profile Optimization, SEO Automation, and Smart Digital Marketing systems.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069617/Thabo_Leslie_Motsumi._Al_Google_my_Business_profile_optimization_Search_Everywhere_Optimation_SEO_Automation_and_Smart_digital_marketing._vncyse.png",
    email: "thabo@integratedwellth.co.za"
  },
  {
    name: "Enias Mafokoane",
    role: "Executive Coach",
    bio: "Driving professional excellence and leadership development through tailored executive coaching.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069615/Enias_Mafokoane._Executive_Coach_dd47qt.jpg",
    email: "info@integratedwellth.co.za"
  },
  {
    name: "Lazarus Kaseke",
    role: "Chartered Accountant (SA)",
    bio: "Ensuring financial integrity and robust governance structures for sustainable business growth.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069615/Lazarus_Kaseke._CA_SA_sbcpnw.jpg",
    email: "info@integratedwellth.co.za"
  }
];

const Team = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section id="team" className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-brand-600 font-bold uppercase tracking-widest text-sm mb-4">
              <Target size={20} />
              <span>Leadership & Vision</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Our Identity</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We are a collective of strategists, financial experts, and systems thinkers dedicated to building your integrated wealth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
            {TEAM.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 group flex flex-col"
              >
                <div className="relative aspect-[3/4] bg-gray-200 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="p-3 bg-white rounded-full text-gray-900 hover:bg-brand-gold hover:text-white transition-colors transform hover:scale-110">
                        <Mail size={20} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow text-center">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-brand-gold font-semibold text-xs uppercase tracking-wider mt-1 mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Philosophy />

      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <RevealOnScroll>
                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold text-brand-900">Get in Touch with Marcia</h2>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Looking for a strategic partner to guide your business through the complexities of the South African market? Connect directly with our founder.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-4 bg-gray-100 rounded-full text-brand-900 hover:bg-brand-900 hover:text-white transition-all">
                                <Linkedin size={24} />
                            </a>
                            <a href="mailto:enquiries@integratedwellth.co.za" className="p-4 bg-gray-100 rounded-full text-brand-900 hover:bg-brand-900 hover:text-white transition-all">
                                <Mail size={24} />
                            </a>
                        </div>
                        <Button size="lg" onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')}>
                            Schedule an Introductory Call
                        </Button>
                    </div>
                </RevealOnScroll>
                
                <RevealOnScroll delay={0.3}>
                    <div className="bg-brand-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full translate-x-10 -translate-y-10"></div>
                        <h3 className="text-2xl font-bold mb-6 text-brand-gold">Founder's Mission</h3>
                        <blockquote className="text-xl italic leading-relaxed text-brand-100">
                            "I created IWS to be the firm I wished existed when I started my journey—a place where technical compliance is handled with precision, but the founder's mind is protected with equal vigor."
                        </blockquote>
                        <div className="mt-8 font-bold text-brand-gold">— Marcia Kgaphola</div>
                    </div>
                </RevealOnScroll>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
