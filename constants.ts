// ===========================
// CONTACT INFORMATION
// ===========================

export const CONTACT_INFO = {
  email: "enquiries@integratedwellth.co.za",
  phone: "+27 74 494 0771",
  address: "Munyaka Lifestyle Estate, Pretoria, SA",
  calendlyUrl: "https://calendly.com/enquiries-integratedwellth/30min",
  quicketUrl: "https://www.quicket.co.za/events/352598-financial-clarity-for-non-financial-business-owners/#/",
  whatsapp: "https://wa.me/27744940771"
};

// ===========================
// TYPE DEFINITIONS
// ===========================

export interface QuizQuestion {
  question: string;
  category: string;
  options: { text: string; score: number }[];
}

export interface Pillar {
  title: string;
  description: string;
  details: string[];
}

export interface Audience {
  id: string;
  label: string;
  content: string;
  services: string[];
  image: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  type: string;
}

// ===========================
// PILLARS (Required by Services.tsx)
// ===========================

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

// ===========================
// AUDIENCES (Required by Audience.tsx)
// ===========================

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

// ===========================
// TESTIMONIALS
// ===========================

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

// ===========================
// QUIZ QUESTIONS (12 Questions)
// ===========================

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // PILLAR 1: TECHNICAL IQ
  {
    category: "Technical IQ",
    question: "Accounting Frequency: How often are your records reconciled against bank statements?",
    options: [
      { text: "Retrospective: Only at year-end or when tax is due.", score: 1 },
      { text: "Quarterly: I catch up every few months.", score: 2 },
      { text: "Monthly: I have a month-end process but it lags.", score: 3 },
      { text: "Continuous: Reconciled daily or weekly; data is live.", score: 4 }
    ]
  },
  {
    category: "Technical IQ",
    question: "The Digital Trail: Does every transaction have a digital source document attached?",
    options: [
      { text: "No: I rely on bank descriptions only.", score: 1 },
      { text: "Partially: High-value items are saved, small receipts missing.", score: 2 },
      { text: "Most: I use a scanner/app for most business transactions.", score: 3 },
      { text: "Complete: 100% of entries are audit-ready with digital proof.", score: 4 }
    ]
  },
  {
    category: "Technical IQ",
    question: "Statutory Standing: Are CIPC, Beneficial Ownership, and COIDA returns current?",
    options: [
      { text: "I am unsure of my current legal standing.", score: 1 },
      { text: "I am registered but currently behind on submissions.", score: 2 },
      { text: "I am up to date but reactive (file when notice arrives).", score: 3 },
      { text: "Proactive: All filings are submitted before deadlines.", score: 4 }
    ]
  },
  // PILLAR 2: BEHAVIORAL EQ
  {
    category: "Behavioral EQ",
    question: "Leadership Isolation: Who do you consult for a confidential 'sanity check'?",
    options: [
      { text: "No one: I carry the entire weight of decisions alone.", score: 1 },
      { text: "Friends/Family: I talk to non-experts.", score: 2 },
      { text: "Peers: I have a loose network of other owners.", score: 3 },
      { text: "Professional Partner: I have a dedicated sounding board.", score: 4 }
    ]
  },
  {
    category: "Behavioral EQ",
    question: "Relationship with Data: How do you feel when opening your financial dashboard?",
    options: [
      { text: "Avoidance: I suspect bad news and avoid checking.", score: 1 },
      { text: "Anxiety: I check frequently but feel overwhelmed.", score: 2 },
      { text: "Functional: I check to pay bills but don't use it for planning.", score: 3 },
      { text: "Empowerment: I use data as a strategic weapon.", score: 4 }
    ]
  },
  {
    category: "Behavioral EQ",
    question: "Decision Fatigue: To what extent does the admin burden impact your ability to lead?",
    options: [
      { text: "High Impact: I spend more time on 'sludge' than on growth.", score: 1 },
      { text: "Significant: It drains my energy, but I push through.", score: 2 },
      { text: "Moderate: I have some systems but still feel stretched.", score: 3 },
      { text: "Low Impact: Systems are in place; I focus on the vision.", score: 4 }
    ]
  },
  // PILLAR 3: CASH FLOW RESILIENCE
  {
    category: "Cash Flow",
    question: "Cash Buffer Days: If revenue stopped today, how long could you sustain operations?",
    options: [
      { text: "< 15 days: Survival mode.", score: 1 },
      { text: "30 - 60 days: Fragile stability.", score: 2 },
      { text: "90 days: Standard resilience.", score: 3 },
      { text: "120+ days: Strategic surplus.", score: 4 }
    ]
  },
  {
    category: "Cash Flow",
    question: "The 12-Month Horizon: Do you have a scenario-tested financial forecast?",
    options: [
      { text: "No forecast: I plan month-to-month based on balance.", score: 1 },
      { text: "Rough estimate: I have a basic target but no breakdown.", score: 2 },
      { text: "Base case: I have a plan for 'business as usual'.", score: 3 },
      { text: "Multi-scenario: I have modeled Best, Base, and Worst Case.", score: 4 }
    ]
  },
  {
    category: "Cash Flow",
    question: "Revenue Triangulation: How diversified is your income stream?",
    options: [
      { text: "High Risk: One client/contract represents > 50% revenue.", score: 1 },
      { text: "Elevated Risk: 2-3 clients represent the majority of income.", score: 2 },
      { text: "Diversified: No single entity accounts for > 20% income.", score: 3 },
      { text: "Robust: Multiple independent streams across sectors.", score: 4 }
    ]
  },
  // PILLAR 4: 2026 READINESS
  {
    category: "2026 Readiness",
    question: "Data Triangulation: Are personal lifestyle, business accounts, and EMP501 aligned?",
    options: [
      { text: "No: Discrepancies exist between income and lifestyle.", score: 1 },
      { text: "Unsure: I don't know how SARS would view my profile.", score: 2 },
      { text: "Mostly: I keep things separate but mismatches might exist.", score: 3 },
      { text: "Airtight: Systems ensure 100% data consistency.", score: 4 }
    ]
  },
  {
    category: "2026 Readiness",
    question: "Employee Compliance: Does every single employee have a valid Income Tax Reference?",
    options: [
      { text: "No/Unsure: This has not been a priority.", score: 1 },
      { text: "Working on it: I am currently collecting them manually.", score: 2 },
      { text: "Mostly: All high-earners are registered.", score: 3 },
      { text: "Complete: SARS-validated numbers for every staff member.", score: 4 }
    ]
  },
  {
    category: "2026 Readiness",
    question: "Institutional Scaling: Could the business run for 30 days if you were unavailable?",
    options: [
      { text: "No: The business stops when I stop.", score: 1 },
      { text: "Partially: Basic tasks continue, but leadership is absent.", score: 2 },
      { text: "Mostly: Most operations continue, strategy would stall.", score: 3 },
      { text: "Yes: Systems allow a 'One-Person show' to become a legacy.", score: 4 }
    ]
  }
];
