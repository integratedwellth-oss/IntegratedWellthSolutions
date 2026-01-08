import { Pillar, Audience, Testimonial, QuizQuestion } from './types';

export const CONTACT_INFO = {
  email: "enquiries@integratedwellth.co.za",
  phone: "+27 74 494 0771",
  address: "Munyaka Lifestyle Estate, Pretoria, SA",
  calendlyUrl: "https://calendly.com/enquiries-integratedwellth/30min",
  quicketUrl: "https://www.quicket.co.za/events/352598-financial-clarity-for-non-financial-business-owners/#/",
  whatsapp: "https://wa.me/27744940771"
};

export const PILLARS: Pillar[] = [
  {
    title: "Financial Management",
    description: "Technical IQ readiness for the 2026 SARS AI era.",
    details: ["Continuous Accounting", "Tax Triage", "Audit Readiness"]
  },
  {
    title: "Emotional Intelligence",
    description: "Behavioral EQ to resolve Leadership Isolation.",
    details: ["Neural Resilience", "Decision Support", "Mindset Strategy"]
  },
  {
    title: "Digital Innovation",
    description: "Automated tech-stacks that eliminate manual debt.",
    details: ["System Integration", "Data Triangulation", "Workflow Logic"]
  }
];

// ✅ ADD THIS - The missing AUDIENCES export
export const AUDIENCES: Audience[] = [
  {
    id: "startups",
    label: "Startups",
    content: "Build a solid foundation before you scale. We help you structure for success from day one.",
    services: ["Business Registration", "Tax Clearance", "Initial Strategy"],
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1765744607/Integrated_Wellth_that_support_for_startup_businesses_wtnrwq.png"
  },
  {
    id: "business",
    label: "Existing Business",
    content: "Optimize your operations and ensure 2026 Compliance while managing growth.",
    services: ["Monthly bookkeeping", "Management Accounts", "Annual Financial Statements", "Tax Planning", "Strategic Workshops"],
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1765745275/Integrated_Wellth_in_support_for_existing_businesses._nnnmib.png"
  },
  {
    id: "npo",
    label: "NGOs / NPOs",
    content: "Navigate the complex world of PBO registration and grant management.",
    services: ["Compliance and Financial Oversight", "NPO Registration", "PBO Registration", "Grant Management", "Reporting (Accounting Officer)"],
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1765745902/Integrated_Wellth_in_support_for_NGOs_NPOs_u7exko.png"
  },
  {
    id: "individuals",
    label: "Individuals & Teens",
    content: "Plan your career and personal wealth map early for a secure future.",
    services: ["Career Guidance", "Personal Wealth Mapping", "Tax Returns"],
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1765746428/Integrated_Wellth_in_support_for_Individuals_Teens_Solutions._j58vsp.png"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Thabiso Nothana",
    role: "Executive Director, Nothana Holdings",
    quote: "Ms. Kgaphola successfully consolidated two years of complex financial data... reducing our reconciliation time by over 40%. Her management accounts provided us with actionable insights.",
    type: "Holdings & Investment"
  },
  {
    name: "Kidibone Lidovho",
    role: "Director & CEO, Bluevalley Transport",
    quote: "Marcia played a pivotal role in securing an appointment with SARS and facilitating the settlement of our outstanding VAT. We are now compliant and payments are structured.",
    type: "Logistics & Transport"
  },
  {
    name: "Johannes Setladi",
    role: "CEO, The Ludo League SA",
    quote: "Their team assisted us in developing several Business Plans and provided sound advice during critical moments. They listened, understood our challenges, and provided practical solutions.",
    type: "Sports & Recreation"
  },
  {
    name: "Makoma Nothana",
    role: "Mnoth Facility Solutions",
    quote: "Demonstrated reliability, professionalism, and efficiency in delivering financial bookkeeping and consolidations. Their commitment to timely delivery was instrumental.",
    type: "Facility Management"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "How would you describe your relationship with your business numbers?",
    options: [
      { text: "I have real-time clarity and use data for strategy.", score: 10 },
      { text: "I check my bank balance but avoid reports.", score: 5 },
      { text: "I only look at numbers during a crisis.", score: 0 }
    ]
  },
  {
    question: "What is your current SARS compliance status?",
    options: [
      { text: "Fully compliant with proactive systems.", score: 10 },
      { text: "Generally compliant but reactive.", score: 5 },
      { text: "Behind on filings or unsure of status.", score: 0 }
    ]
  },
  {
    question: "How do you handle decision fatigue and burnout?",
    options: [
      { text: "I have support systems and delegate effectively.", score: 10 },
      { text: "I push through but feel the strain.", score: 5 },
      { text: "Everything depends on me; I'm exhausted.", score: 0 }
    ]
  },
  {
    question: "How structured is your business strategy for the next 12 months?",
    options: [
      { text: "Clear roadmap with milestones and KPIs.", score: 10 },
      { text: "General direction but not documented.", score: 5 },
      { text: "Reactive; no formal plan.", score: 0 }
    ]
  }
];

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Who We Help', path: '/who-we-help' },
  { name: 'Team', path: '/team' },
  { name: 'Services', path: '/services' },
  { name: 'Workshops', path: '/workshops' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
];
