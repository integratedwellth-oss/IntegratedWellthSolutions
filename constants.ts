/**
 * GLOBAL CONSTANTS PROTOCOL
 * Centralized data for the Integrated Wellth Solutions ecosystem.
 */

// 1. Core Contact & External Integration Links
export const CONTACT_INFO = {
  email: "enquiries@integratedwellth.co.za",
  phone: "+27 74 494 0771", // Updated to match your Firebase record
  address: "Munyaka Lifestyle Estate, Pretoria, SA",
  calendlyUrl: "https://calendly.com/enquiries-integratedwellth/30min",
  quicketUrl: "https://www.quicket.co.za/events/352598-financial-clarity-for-non-financial-business-owners/#/",
  whatsapp: "https://wa.me/27744940771"
};

// 2. Navigation Architecture
export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Who We Help', path: '/who-we-help' },
  { name: 'Team', path: '/team' },
  { name: 'Services', path: '/services' },
  { name: 'Workshops', path: '/workshops' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
];

// 3. Quiz Intelligence Interfaces
export interface QuizOption {
  text: string;
  score: number;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

// 4. The Sovereign Diagnostic Question Bank
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "How would you describe your relationship with your business numbers?",
    options: [
      { text: "I have real-time clarity and use data for strategy.", score: 10 },
      { text: "I check my bank balance but avoid the detailed reports.", score: 5 },
      { text: "I only look at numbers when it's tax season or a crisis hits.", score: 0 }
    ]
  },
  {
    question: "What is your current bookkeeping and SARS compliance status?",
    options: [
      { text: "Automated tech-stack with monthly reconciliations.", score: 10 },
      { text: "Manual processes that are usually a few months behind.", score: 5 },
      { text: "Non-existent or severely outdated; I feel exposed to SARS AI flags.", score: 0 }
    ]
  },
  {
    question: "Regarding your role as a founder, how isolated do you feel in decision-making?",
    options: [
      { text: "I have a trusted board or advisors who challenge my thinking.", score: 10 },
      { text: "I have people to talk to, but the final weight is 100% on me.", score: 5 },
      { text: "Total 'Leadership Isolation'—I am navigating this journey alone.", score: 0 }
    ]
  },
  {
    question: "How ready is your business for the 2026 'SARS Data Triangulation' watershed?",
    options: [
      { text: "Fully audit-ready with clean data trails and digital integration.", score: 10 },
      { text: "Partially ready, but I have 'Technical Debt' that needs clearing.", score: 5 },
      { text: "I am unaware of these changes or I am definitely not ready.", score: 0 }
    ]
  }
];

// 5. Intelligence Tier Labels
export const TIER_LABELS = {
  OPTIMIZED: "Optimized",
  REFLECTION: "Reflection Needed",
  TRIAGE: "Critical Triage"
};
