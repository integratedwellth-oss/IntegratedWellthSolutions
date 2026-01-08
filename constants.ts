/**
 * GLOBAL CONSTANTS PROTOCOL
 */

export const CONTACT_INFO = {
  email: "enquiries@integratedwellth.co.za",
  phone: "+27 74 494 0771",
  address: "Munyaka Lifestyle Estate, Pretoria, SA",
  calendlyUrl: "https://calendly.com/enquiries-integratedwellth/30min",
  quicketUrl: "https://www.quicket.co.za/events/352598-financial-clarity-for-non-financial-business-owners/#/",
  whatsapp: "https://wa.me/27744940771"
};

// REQUIRED BY: src/components/Services.tsx
export const PILLARS = [
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

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Who We Help', path: '/who-we-help' },
  { name: 'Team', path: '/team' },
  { name: 'Services', path: '/services' },
  { name: 'Workshops', path: '/workshops' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
];

export interface QuizQuestion {
  question: string;
  options: { text: string; score: number }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "How would you describe your relationship with your business numbers?",
    options: [
      { text: "I have real-time clarity and use data for strategy.", score: 10 },
      { text: "I check my bank balance but avoid reports.", score: 5 },
      { text: "I only look at numbers during a crisis.", score: 0 }
    ]
  },
  // Add other questions as defined in previous steps...
];
