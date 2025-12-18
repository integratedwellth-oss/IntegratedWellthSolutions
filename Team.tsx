import React from 'react';
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

// 1. FINAL TEAM DATA
const TEAM_MEMBERS = [
  {
    name: "Marcia Kgaphola",
    role: "Chartered Business Accountant in Practice (CIBA), Hons Psychological Counselling, Risk and Project Management",
    bio: "Strategic visionary helping organizations navigate complex financial landscapes to achieve sustainable wealth.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766077285/Chartered_Business_Accountant_in_Practice_CIBA_Hons_Psychological_Counselling_Risk_and_Project_Management_ubcpy9.jpg",
    email: "marcia@integratedwellth.co.za"
  },
  {
    name: "Thabo Leslie Motsumi",
    role: "AI, Google my Business profile optimization, Search Everywhere Optimation (SEO), Automation, and Smart digital marketing",
    bio: "Digital systems architect focusing on automation and search visibility.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069617/Thabo_Leslie_Motsumi._AI_Google_my_Business_profile_optimization_Search_Everywhere_Optimation_SEO_Automation_and_Smart_digital_marketing._vncyse.png",
    email: "info@integratedwellth.co.za"
  },
  {
    name: "Enias Mafokoane",
    role: "Executive Coach",
    bio: "Dedicated to driving operational excellence, leadership development, and client success.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069615/Enias_Mafokoane._Executive_Coach_dd47qt.jpg",
    email: "info@integratedwellth.co.za"
  },
  {
    name: "Lazarus Kaseke",
    role: "CA(SA)",
    bio: "Expert financial oversight and chartered accounting specialized in robust business systems.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069615/Lazarus_Kaseke._CA_SA_sbcpnw.jpg",
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

        {/* TEAM GRID - 4 Columns for Desktop */}
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
                  {/* Role text size optimized for long titles */}
                  <p className="text-yellow-600 font-bold text-xs uppercase tracking-wider mt-2 leading-snug">
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
