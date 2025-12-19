import React from 'react';
import { motion } from "framer-motion";
import { Mail, Target, Compass, Heart } from "lucide-react";

// 1. TEAM DATA (Fully Populated)
const TEAM = [
  {
    name: "Marcia Kgaphola",
    role: "Founder & Principal Consultant",
    bio: "Strategic visionary helping organizations navigate complex financial landscapes to achieve sustainable wealth.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766077285/Chartered_Business_Accountant_in_Practice_CIBA_Hons_Psychological_Counselling_Risk_and_Project_Management_ubcpy9.jpg",
    email: "marcia@integratedwellth.co.za"
  },
  {
    name: "Thabo Leslie Motsumi",
    role: "AI & Digital Marketing Specialist",
    bio: "Expert in AI, Google My Business Profile Optimization, SEO Automation, and Smart Digital Marketing systems.",
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

// 2. COMPONENT DEFINITION
const Team = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* --- SECTION 1: THE TEAM (4 MEMBERS) --- */}
      <section id="team" className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
             <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
             <p className="text-xl text-brand-600 font-medium mb-6 uppercase tracking-wider">The Minds Behind The Mission</p>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We are a collective of strategists, financial experts, and systems thinkers dedicated to building your integrated wealth.
            </p>
          </div>

          {/* GRID set to 4 Columns for 4 Members */}
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
                {/* Image Aspect Ratio */}
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
                        <Mail size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow text-center">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-yellow-600 font-semibold text-xs uppercase tracking-wider mt-1">{member.role}</p>
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

      {/* --- SECTION 2: VISION, MISSION & VALUES (Exact Text Provided) --- */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">The Foundation</h2>
            <p className="text-gray-600 mt-4">Why we do what we do.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* VISION */}
            <div className="flex flex-col items-center text-center p-8 bg-brand-50 rounded-2xl border border-brand-100 h-full">
              <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center text-brand-600 mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Vision Statement</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                To be the leading holistic empowerment partner in Africa, driving financial confidence, emotional resilience, and professional excellence for individuals, businesses, and communities — unlocking sustainable well-being and generational transformation.
              </p>
            </div>

            {/* MISSION */}
            <div className="flex flex-col items-center text-center p-8 bg-brand-50 rounded-2xl border border-brand-100 h-full">
              <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center text-brand-600 mb-6">
                <Compass size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mission Statement</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Our mission is to empower clients — from teens to entrepreneurs and organisations — with integrated solutions that blend financial management, emotional intelligence, professional development, and digital innovation. Through tailored coaching, expert guidance, and measurable outcomes, we simplify complexity, foster confidence, and support sustainable growth so our clients can thrive personally and professionally.
              </p>
            </div>

            {/* VALUES */}
            <div className="flex flex-col items-center text-center p-8 bg-brand-50 rounded-2xl border border-brand-100 h-full">
              <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center text-brand-600 mb-6">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Integrated Wellth Solutions values integrity, empathy, and collaboration, we partner with clients to co-create solutions that align with their goals. Whether simplifying tax compliance for SMEs, fostering inclusive workplaces through diversity training, or mentoring teens in digital literacy, Integrated Wellth Solutions is your trusted ally in achieving lasting success.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Team;
