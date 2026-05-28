import React from 'react';
import Philosophy from '../Philosophy';
import RevealOnScroll from '../RevealOnScroll';
import { Target, Mail, ShieldCheck } from 'lucide-react';
import Button from '../Button';

const TEAM_HERO_IMAGE = "https://res.cloudinary.com/dka0498ns/image/upload/v1772709343/ai-search-optimization-speaker-happy-hunter-digital.jpg_n02szo.jpg";
const MARCIA_PORTRAIT = "https://res.cloudinary.com/dka0498ns/image/upload/v1766077285/Chartered_Business_Accountant_in_Practice_CIBA_Hons_Psychological_Counselling_Risk_and_Project_Management_ubcpy9.jpg";

const TEAM_MEMBERS = [
  {
    name: "Enias Mafokoane",
    role: "Executive Coach",
    credentials: "Leadership Advisor · Mindset Strategist",
    bio: "Driving professional excellence and leadership development through tailored executive coaching. Focusing on mindset transformation for sustainable performance.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069615/Enias_Mafokoane._Executive_Coach_dd47qt.jpg",
    email: "info@integratedwellth.co.za"
  },
  {
    name: "Thabo Motsumi",
    role: "Digital Marketing, Automation & Web Development",
    credentials: "AI Specialist · SEO Engineer · GMB Optimization Expert",
    bio: "Expert in AI-driven Google My Business profile optimization, search visibility, SEO automation, and smart digital marketing systems to scale your brand.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069617/Thabo_Leslie_Motsumi._AI_Google_my_Business_profile_optimization_Search_Everywhere_Optimation_SEO_Automation_and_Smart_digital_marketing._vncyse.png",
    email: "thabo@integratedwellth.co.za"
  },
  {
    name: "Lazarus Kaseke",
    role: "Chartered Accountant (SA)",
    credentials: "CA (SA) · Forensic Auditor · Corporate Governance Advisor",
    bio: "Specializing in corporate taxation, forensic audits, robust financial controls, and corporate governance for high-growth enterprises.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069615/Lazarus_Kaseke._CA_SA_sbcpnw.jpg",
    email: "info@integratedwellth.co.za"
  }
];

const TeamPage: React.FC = () => {
  return (
    <div className="flex flex-col bg-[#F5F5F5] font-sans text-brand-900 selection:bg-brand-gold/20 antialiased min-h-screen">
      
      {/* 1. Cinematic Hero Banner - Adjusted top-alignment to prevent head cropping */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-brand-900">
        <div className="absolute inset-0 bg-cover bg-no-repeat opacity-40 z-0" style={{ backgroundImage: `url('${TEAM_HERO_IMAGE}')`, backgroundPosition: 'center 10%' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/50 via-brand-900/85 to-brand-900 z-10" />
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 mb-2">
            <ShieldCheck size={14} className="text-[#d4af37] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Technical Command</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-sora font-black uppercase tracking-tighter text-white leading-tight">
            Our Strategic <br/> <span className="text-[#d4af37] italic">Council.</span>
          </h1>
          <p className="text-base md:text-lg text-brand-100 max-w-2xl mx-auto font-light leading-relaxed">
            A multidisciplinary firm founded on the belief that technical accounting precision and psychological resilience are inseparable.
          </p>
        </div>
      </section>

      {/* 2. Optimized Founder's Insight Section (Marcia's Bio) */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 relative">
              <RevealOnScroll>
                <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50">
                  <img src={MARCIA_PORTRAIT} alt="Marcia Kgaphola" className="w-full h-auto max-h-[550px] object-cover object-top" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-900/95 to-transparent p-8">
                    <p className="text-white font-black uppercase tracking-widest text-lg">Marcia Kgaphola</p>
                    <p className="text-[#d4af37] text-xs font-bold uppercase tracking-widest mt-1">Founder & Leader</p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7 space-y-8">
              <RevealOnScroll delay={0.2}>
                <div className="space-y-4">
                  <span className="text-brand-gold text-xs font-black uppercase tracking-[0.4em] block">The Founder's Insight</span>
                  <h2 className="text-4xl md:text-5xl font-sora font-black text-brand-900 uppercase tracking-tighter">Marcia Kgaphola</h2>
                  <p className="text-[#d4af37] font-bold text-sm uppercase tracking-wider leading-relaxed">Founder, Leader & Tax Practitioner</p>
                  <p className="text-gray-400 font-bold text-xs uppercase tracking-wide leading-relaxed">Chartered Business Accountant (CIBA) · Hons Psychological Counselling · Risk & Project Management</p>
                </div>
                <div className="text-lg md:text-xl text-brand-900/70 font-medium leading-relaxed italic border-l-4 border-[#d4af37] pl-8 py-2 mt-6">
                  "Principal architect merging financial integrity (IQ) with psychological resilience (EQ). Specializes in structural intervention, tax planning, and decoupling founder identities from operational friction."
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Executive Council Directory */}
      <section className="py-24 px-6 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-sora font-black text-brand-900 tracking-tighter uppercase">Technical Command</h2>
            <p className="text-base text-brand-900/60 font-medium mt-2">Actionable system leaders bridging accounting, coaching, and automated pipelines.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.1} width="100%">
                <div className="group relative flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-brand-900/5 hover:border-[#d4af37] transition-all duration-500 hover:shadow-2xl">
                  <div className="relative aspect-[3/4] overflow-hidden bg-brand-900/5">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <a href={`mailto:${member.email}`} className="w-12 h-12 rounded-xl bg-[#d4af37] text-brand-900 flex items-center justify-center hover:bg-white transition-colors shadow-2xl"><Mail size={20} /></a>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-brand-900 leading-tight uppercase tracking-tighter">{member.name}</h3>
                      <p className="text-[#d4af37] font-black uppercase text-[10px] tracking-widest">{member.role}</p>
                      <p className="text-gray-400 font-bold text-[9px] uppercase tracking-wide leading-relaxed">{member.credentials}</p>
                    </div>
                    <p className="text-brand-900/60 text-sm leading-relaxed border-t border-gray-100 pt-4 font-medium">{member.bio}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Onboarding Call Section */}
      <section className="py-24 bg-white border-t border-brand-900/5">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-brand-900">Work directly with Marcia</h2>
          <p className="text-brand-900/60 text-base max-w-lg mx-auto font-medium leading-relaxed">Looking for a strategic partner to guide your business through CIPC, SARS, and operational scaling complexities? Connect directly with our founder.</p>
          <Button size="lg" onClick={() => window.open('https://calendly.com/marcia-kgaphola/new-meeting', '_blank')}>Schedule an Onboarding Call</Button>
        </div>
      </section>

    </div>
  );
};

export default TeamPage;
