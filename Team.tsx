import React from 'react';
import { motion } from "framer-motion";
import { Mail, Target, Compass, Heart } from "lucide-react";

// 1. TEAM DATA
const TEAM = [
  {
    name: "Marcia Kgaphola",
    role: "Founder & Principal Consultant",
    bio: "Strategic visionary helping organizations navigate complex financial landscapes to achieve sustainable wealth.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766077285/Chartered_Business_Accountant_in_Practice_CIBA_Hons_Psychological_Counselling_Risk_and_Project_Management_ubcpy9.jpg",
    email: "marcia@integratedwellth.co.za"
  },
  {
    name: "Senior Consultant",
    role: "Strategic Analysis Lead",
    bio: "Expert in operational efficiency and systems thinking, ensuring our strategies are executable.",
    image: "https://ui-avatars.com/api/?name=Senior+Consultant&background=f3f4f6&color=1f2937&size=512",
    email: "info@integratedwellth.co.za"
  },
  {
    name: "Client Success",
    role: "Head of Partnerships",
    bio: "Dedicated to building long-term value networks and ensuring client success at every touchpoint.",
    image: "https://ui-avatars.com/api/?name=Client+Success&background=f3f4f6&color=1f2937&size=512",
    email: "info@integratedwellth.co.za"
  }
];

// 2. COMPONENT DEFINITION
const Team = () => {
  return (
    <div className="pt-20">
      
      {/* --- SECTION 1: THE TEAM --- */}
      <section id="team" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
             <p className="text-xl text-brand-600 font-medium mb-6 uppercase tracking-wider">The Minds Behind The Mission</p>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We are a collective of strategists, financial experts, and systems thinkers dedicated to building your integrated wealth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 justify-center">
            {TEAM.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 group flex flex-col"
              >
                <div className="relative aspect-[3/4] bg-gray-200 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {member.email && (
                      <a 
                        href={`mailto:${member.email}`} 
                        className="p-3 bg-white rounded-full text-gray-900 hover:bg-yellow-500 hover:text-white transition-colors transform hover:scale-110"
                      >
                        <Mail size={22} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-yellow-600 font-semibold text-sm uppercase tracking-wider mt-1">{member.role}</p>
                  </div>
                  <p className="text-gray-600 leading-relaxed flex-grow font-sans">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: VISION, MISSION & VALUES --- */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">The Foundation</h2>
            <p className="text-gray-600 mt-4">Why we do what we do.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading holistic empowerment partner in Africa, driving financial confidence, emotional resilience, and professional excellence.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6">
                <Compass size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to empower clients — from teens to entrepreneurs — with integrated solutions that blend financial management and emotional intelligence.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-600 leading-relaxed">
                Integrated Wellth Solutions values integrity, empathy, and collaboration. We partner with clients to co-create solutions that align with their goals.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// 3. EXPORT DEFAULT (This prevents the crash)
export default Team;
