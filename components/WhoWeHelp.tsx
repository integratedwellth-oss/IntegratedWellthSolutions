import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, TrendingUp, HeartHandshake, ShieldCheck, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const AUDIENCES = [
  {
    icon: Users,
    title: "SMMEs",
    description: "Small to Medium enterprises looking to scale operations and financial systems.",
    link: "/who-we-help#smmes"
  },
  {
    icon: Briefcase,
    title: "Professionals",
    description: "Lawyers, Doctors, and Engineers needing practice management and tax efficiency.",
    link: "/who-we-help#professionals"
  },
  {
    icon: TrendingUp,
    title: "Startups",
    description: "High-growth ventures requiring rapid financial modeling and investor readiness.",
    link: "/who-we-help#startups"
  },
  {
    icon: ShieldCheck,
    title: "Non-Profits",
    description: "Organizations needing strict compliance, grant management, and auditing.",
    link: "/who-we-help#non-profits"
  },
  {
    icon: UserCheck,
    title: "Sole Proprietors",
    description: "Individual founders needing to separate personal and business finances.",
    link: "/who-we-help#sole-proprietors"
  },
  // 🔥 NEW 6TH CARD
  {
    icon: HeartHandshake,
    title: "Accountability Partner",
    description: "Founders seeking emotional resilience, mental clarity, and a confidential sounding board.",
    link: "/accountability" // Links to the new standalone page
  }
];

const WhoWeHelp = () => {
  return (
    <section id="who-we-help" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Who We Help</h2>
          <p className="text-xl text-gray-600">Tailored strategic support for every stage of business.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AUDIENCES.map((item, index) => (
            <Link to={item.link} key={index} className="block group">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all h-full"
              >
                <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center text-brand-600 mb-6 shadow-sm group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center text-brand-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <span className="ml-2">→</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelp;
