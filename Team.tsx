import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";

// --- THE DATA SECTION ---
const TEAM = [
  {
    name: "Marcia Kgaphola",
    role: "Founder & Principal Consultant",
    bio: "Strategic visionary helping organizations navigate complex financial landscapes to achieve sustainable wealth.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069615/Marcia_Kgaphola._Founder_x8bkog.jpg",
    linkedin: "#",
    email: "mkgaphola@integratedwellth.co.za"
  },
  {
    name: "Lazarus Kaseke",
    role: "Chartered Accountant (CA SA)",
    bio: "Financial strategist ensuring rigorous compliance, tax efficiency, and solid structural foundations for client wealth.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069615/Lazarus_Kaseke._CA_SA_sbcpnw.jpg",
    linkedin: "#",
    email: ""
  },
  {
    name: "Enias Mafokoane",
    role: "Executive Leadership Coach",
    bio: "Empowering leaders to unlock potential and drive organizational culture through high-performance coaching.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069615/Enias_Mafokoane._Executive_Coach_dd47qt.jpg",
    linkedin: "#",
    email: ""
  },
  {
    name: "Thabo Leslie Motsumi",
    role: "Head of Digital & AI Systems",
    bio: "Architect of the 'Smart Marketing' systems that automate growth, SEO visibility, and digital footprint for our clients.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069617/Thabo_Leslie_Motsumi._AI_Google_my_Business_profile_optimization_Search_Everywhere_Optimation_SEO_Automation_and_Smart_digital_marketing._vncyse.png",
    linkedin: "#",
    email: ""
  }
];

// --- THE COMPONENT SECTION ---
export const Team = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      
      {/* HEADER SECTION */}
      <div className="container mx-auto px-6 mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          The Minds Behind <span className="text-yellow-600">The Mission</span>
        </motion.h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We are a collective of strategists, financial experts, and systems thinkers dedicated to building your integrated wealth.
        </p>
      </div>

      {/* TEAM GRID */}
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group"
            >
              {/* Image Area */}
              <div className="relative h-64 bg-gray-200 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a href={member.linkedin} className="p-3 bg-white rounded-full hover:bg-yellow-500 hover:text-white transition-colors">
                    <Linkedin size={20} />
                  </a>
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="p-3 bg-white rounded-full hover:bg-yellow-500 hover:text-white transition-colors">
                      <Mail size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-yellow-600 font-semibold text-xs uppercase tracking-wider h-8">{member.role}</p>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
