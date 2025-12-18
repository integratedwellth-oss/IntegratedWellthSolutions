import React from 'react';
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const TEAM_MEMBERS = [
  {
    name: "Marcia Kgaphola",
    // Updated full qualifications
    role: "Chartered Business Accountant in Practice (CIBA), Hons Psychological Counselling, Risk and Project Management",
    bio: "Strategic visionary helping organizations navigate complex financial landscapes to achieve sustainable wealth.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766077285/Chartered_Business_Accountant_in_Practice_CIBA_Hons_Psychological_Counselling_Risk_and_Project_Management_ubcpy9.jpg",
    email: "marcia@integratedwellth.co.za"
  },
  {
    name: "Thabo",
    role: "Team Member", // Replace with actual role when ready
    bio: "Key member of the Integrated Wellth strategic implementation team.",
    // Temporary Placeholder
    image: "https://ui-avatars.com/api/?name=Thabo&background=1f2937&color=fff&size=512",
    email: "info@integratedwellth.co.za"
  },
  {
    name: "Enias",
    role: "Team Member", // Replace with actual role when ready
    bio: "Dedicated to driving operational excellence and client success.",
    // Temporary Placeholder
    image: "https://ui-avatars.com/api/?name=Enias&background=1f2937&color=fff&size=512",
    email: "info@integratedwellth.co.za"
  },
  {
    name: "Lazarus",
    role: "Team Member", // Replace with actual role when ready
    bio: "Expert support in building robust financial and business systems.",
    // Temporary Placeholder
    image: "https://ui-avatars.com/api/?name=Lazarus&background=1f2937&color=fff&size=512",
    email: "info@integratedwellth.co.za"
  }
];

export const Team = () => {
  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16 pt-10">
           <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
           <p className="text-xl text-brand-600 font-medium mb-6 uppercase tracking-wider">The Minds Behind The Mission</p>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We are a collective of strategists, financial experts, and systems thinkers dedicated to building your integrated wealth.
          </p>
        </div>

        {/* TEAM GRID - Adjusted to lg:grid-cols-4 for better balance with 4 people */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 group flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] bg-gray-200 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Email Overlay */}
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

              {/* Content Area */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  {/* Text size reduced slightly to handle long titles gracefully */}
                  <p className="text-yellow-600 font-semibold text-xs uppercase tracking-wider mt-2 leading-tight">
                    {member.role}
                  </p>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow font-sans">
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
