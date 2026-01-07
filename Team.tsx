import React from 'react';
import { motion } from "framer-motion";
import { Mail, Target, Linkedin } from "lucide-react";
import Philosophy from './components/Philosophy';
import RevealOnScroll from './components/RevealOnScroll';
import Button from './components/Button';

const TEAM = [
  {
    name: "Marcia Kgaphola",
    role: "Founder & Principal Consultant",
    bio: "Strategic visionary helping organizations navigate complex financial landscapes to achieve sustainable wealth.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1765057729/Founder_Marcia_Kgaphola_agebxi.jpg",
    email: "marcia@integratedwellth.co.za"
  },
  {
    name: "Thabo Leslie Motsumi",
    role: "AI & Digital Marketing Specialist",
    bio: "Expert in AI, Google My Business optimization, SEO Automation, and Smart Digital Marketing systems.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069617/Thabo_Leslie_Motsumi._AI_Google_my_Business_profile_optimization_Search_Everywhere_Optimation_SEO_Automation_and_Smart_digital_marketing._vncyse.png",
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
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-brand-600 font-bold uppercase tracking-widest text-sm mb-4">
              <Target size={20} />
              <span>Leadership & Vision</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 font-sora">Our Identity</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We are a collective of strategists, financial experts, and systems thinkers dedicated to building your integrated wealth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
            {TEAM.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 group flex flex-col"
              >
                <div className="relative aspect-[3/4] bg-gray-200 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a href={`mailto:${member.email}`} className="p-3 bg-white rounded-full text-gray-900 hover:bg-brand-gold hover:text-white transition-colors transform hover:scale-110">
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-brand-gold font-semibold text-xs uppercase mt-1 mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Philosophy />
    </div>
  );
};

export default Team;
