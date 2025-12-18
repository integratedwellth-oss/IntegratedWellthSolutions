import React from 'react';
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import SectionTitle from './SectionTitle';

// 1. UPDATED TEAM DATA
const TEAM = [
  {
    name: "Marcia Kgaphola",
    role: "Founder & Principal Consultant",
    bio: "Strategic visionary helping organizations navigate complex financial landscapes to achieve sustainable wealth.",
    // New Photo URL
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766077285/Chartered_Business_Accountant_in_Practice_CIBA_Hons_Psychological_Counselling_Risk_and_Project_Management_ubcpy9.jpg",
    // LinkedIn removed
    email: "marcia@integratedwellth.co.za"
  },
  // Placeholders updated to remove LinkedIn
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

const Team = () => {
  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16">
           <SectionTitle 
             title="Our Team"
             subtitle="The Minds Behind The Mission"
             className="mb-6"
           />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We are a collective of strategists, financial experts, and systems thinkers dedicated to building your integrated wealth.
          </p>
        </div>

        {/* TEAM GRID */}
        {/* Changed to grid-cols-3 and centered for better alignment if fewer than 3 items */}
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
              {/* IMAGE AREA FIXES:
                  1. Changed h-72 to aspect-[3/4] for a proper portrait container.
                  2. Added object-top so faces are prioritized if cropping occurs.
              */}
              <div className="relative aspect-[3/4] bg-gray-200 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay on Hover - ONLY MAIL ICON NOW */}
                <div className="absolute inset-0 bg-brand-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {member.email && (
                    <a 
                      href={`mailto:${member.email}`} 
                      className="p-3 bg-white rounded-full text-brand-600 hover:bg-brand-500 hover:text-white transition-colors transform hover:scale-110"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail size={22} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-brand-600 font-semibold text-sm uppercase tracking-wider mt-1">{member.role}</p>
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
  );
};

export default Team;
