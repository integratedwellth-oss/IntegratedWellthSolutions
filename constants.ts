import { Pillar, Audience, Testimonial, QuizQuestion } from './types';

export const COMPANY_CONTEXT = `
You are the "Wellth Advisor", an AI assistant for Integrated Wellth Solutions.
Founder: Marcia Kgaphola (Chartered Business Accountant).
Tagline: "Transforming lives through emotional, financial and personal wellness."
Location: Pretoria, South Africa.
Focus: 2026 Tax Compliance, Business Strategy, Holistic Wellness (EQ + IQ).
Services: Financial Expertise, Psychological Wellness, Personal Development, Organizational Consulting, Compliance.
Tone: Professional, empathetic, strategic, and encouraging.
Current Date: ${new Date().toLocaleDateString()}.
Do not give specific legal or tax advice, but guide them to book a consultation for specifics.

EVENT ALERT:
If users ask about learning accounting, financial literacy, or workshops, YOU MUST mention the upcoming "Financial Clarity For Non-Financial Business Owners" workshop.
Date: February 28, 2026.
Location: Munyaka Lifestyle Estate.
Details: A transformative workshop designed to demystify bookkeeping, 2026 tax compliance, and strategic planning for business owners.
`;

export const PILLARS: Pillar[] = [
  {
    title: "Financial Expertise",
    description: "Tax planning, accounting, and wealth strategy integration.",
    iconName: "Calculator"
  },
  {
    title: "Psychological Wellness",
    description: "Addressing the behavioral aspects of money and business leadership.",
    iconName: "Brain"
  },
  {
    title: "Personal Development",
    description: "Career guidance and personal wealth mapping for individuals and teens.",
    iconName: "UserCheck"
  },
  {
    title: "Organizational Consulting",
    description: "Strategic planning and structural efficiency for businesses.",
    iconName: "Briefcase"
  },
  {
    title: "Compliance & Training",
    description: "Ensuring regulatory adherence with SARS and governance bodies.",
    iconName: "ShieldCheck"
  }
];

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
    id: 1,
    category: "Business Reflection: Clarity & Direction",
    question: "How clear and intentional is your business direction for the next 12–24 months?",
    options: [
      { text: "I have no clear goals or documented direction", score: 1 },
      { text: "I have ideas but nothing written or tracked", score: 2 },
      { text: "I have a plan but struggle with execution", score: 3 },
      { text: "I have a clear strategy with milestones", score: 4 }
    ]
  },
  {
    id: 2,
    category: "Financial Reset: Control & Insight",
    question: "How confident are you in understanding and managing your business finances?",
    options: [
      { text: "I don’t consistently track my finances", score: 1 },
      { text: "I record income and expenses but don’t analyse them", score: 2 },
      { text: "I review reports occasionally", score: 3 },
      { text: "I use budgets, cash flow & reports to decide", score: 4 }
    ]
  },
  {
    id: 3,
    category: "Risk & Compliance Readiness",
    question: "How compliant and risk-aware is your business?",
    options: [
      { text: "I’m unsure of my compliance status", score: 1 },
      { text: "I’m registered but behind on requirements", score: 2 },
      { text: "I’m compliant but reactive", score: 3 },
      { text: "I’m compliant with systems and controls", score: 4 }
    ]
  },
  {
    id: 4,
    category: "Capacity & Wellbeing Check",
    question: "How well do your systems support growth without burnout?",
    options: [
      { text: "Everything depends on me", score: 1 },
      { text: "I have some systems but feel stretched", score: 2 },
      { text: "Systems exist but need improvement", score: 3 },
      { text: "Systems, delegation & balance are in place", score: 4 }
    ]
  }
];

export const CONTACT_INFO = {
  phone: "+27 81 235 5910",
  email: "enquiries@integratedwellth.co.za",
  address: "Fred Messenger Ave, Pretoria, South Africa",
  calendlyUrl: "https://calendly.com/enquiries-integratedwellth/30min"
};