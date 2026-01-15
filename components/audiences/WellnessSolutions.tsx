import React from 'react';
import NewsTicker from '../NewsTicker';
import Button from '../Button';
import AudienceNav from '../AudienceNav';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import RevealOnScroll from '../RevealOnScroll';

const WellnessSolutions: React.FC = () => {
  const services = [
    { title: "Financial Literacy & Personal Finance", desc: "We help you take control of your daily money management. This includes Debt Management, creating sustainable Personal Budgets, and understanding how to navigate banking and credit responsibly." },
    { title: "Personal Finance Workshops", desc: "Practical group sessions designed to improve financial habits, spending awareness, and the psychology of saving." },
    { title: "Burnout Prevention Workshops", desc: "Practical, science-based sessions designed to identify early warning signs of chronic stress and implement recovery strategies." },
    { title: "Mindfulness Sessions", desc: "Guided practices to improve focus, reduce anxiety, and promote emotional regulation in high-pressure environments." },
    { title: "Self-Mastery & Emotional Intelligence", desc: "High-impact coaching on Self-Esteem, Confidence Building, and EQ to drive personal and professional success." },
    { title: "Stress & Management Coaching", desc: "Behavioral strategies to manage daily triggers and maintain a healthy work-life balance." }
  ];

  const faqs = [
    { q: "Why combine financial literacy with personal wellness?", a: "Financial stress is one of the leading causes of anxiety and burnout. By addressing both your money management habits and your emotional resilience, we create a sustainable path to overall well-being." },
    { q: "Who are the Burnout Prevention workshops for?", a: "They are designed for high-performing individuals, corporate teams, and entrepreneurs who are feeling overwhelmed or want to proactively manage stress before it impacts their health." },
    { q: "What can I expect from a Mindfulness Session?", a: "Our sessions are practical and grounded, focusing on breathing techniques and mental exercises that help you regain focus and calm in the middle of a busy workday. No prior experience is needed." },
    { q: "Do you offer debt counselling?", a: "We offer debt management coaching and budgeting strategies to help you regain control. For formal debt review processes, we can refer you to specialized legal partners if needed." }
  ];

  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  return (
    <div className="pt-16 bg-white min-h-screen">
      <AudienceNav active="wellness" />
      
      {/* Hero */}
      <div className="bg-brand-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Personal Wellness & Life Coaching</h1>
          <p className="text-xl md:text-2xl text-brand-100 max-w-3xl mx-auto">
            Empowering individuals to master their internal world and day-to-day finances.
          </p>
        </div>
      </div>

      <NewsTicker />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Services List */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12 mb-20">
          {services.map((s, i) => (
            <RevealOnScroll key={i} delay={i * 0.05}>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                    <CheckCircle2 size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Q&A Section */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-center text-brand-900 mb-10">Common Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center font-bold text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  {faq.q}
                  {openFaq === i ? <ChevronUp className="text-brand-500" /> : <ChevronDown className="text-gray-400" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 py-4 text-gray-600 border-t border-gray-100 bg-gray-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Regain control of your life and finances.</h2>
          <Button onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')} size="lg">
            Book a Wellness Session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WellnessSolutions;