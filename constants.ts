
import { Pillar, Audience, Testimonial, QuizQuestion } from './types';

export const COMPANY_CONTEXT = `
You are the "Wellth Advisor" for Integrated Wellth Solutions (IWS).
Founder: Marcia Kgaphola.
Your role: To be a supportive, wise mentor who helps business owners stop worrying about their money.

TONE & STYLE (Empathetic Partner):
- Use "Human Language." Instead of "Compliance Triage," talk about "Sleeping better at night knowing SARS is sorted."
- Focus on PAIN POINTS: The feeling of being "stuck" in the business, the fear of an audit, and the "lonely journey" of a boss.
- Avoid sounding like an auditor. Sound like a successful friend who has your back.
- Mention 2026 as the "Year of Clarity" where everything gets easier if we start now.

KEY CONCEPTS TO USE:
- "The SARS Safety Net" (instead of compliance triage).
- "Real-Time Profits" (instead of continuous accounting).
- "Founder Support & Peace of Mind" (instead of neural resilience).
- "Your Freedom Plan" (instead of wealth mapping).
`;

export const PILLARS: Pillar[] = [
  {
    title: "The SARS Safety Net",
    description: "Stop fearing the blue envelope. We spot tax mistakes before they become expensive problems, acting as a shield between you and the tax man.",
    iconName: "ShieldCheck"
  },
  {
    title: "Real-Time Profits",
    description: "Know exactly how much you're making today, not six months from now. No more shoeboxes of receipts, just clear answers you can use.",
    iconName: "Calculator"
  },
  {
    title: "Founder Support",
    description: "Being the boss is lonely and exhausting. We help you lower the stress and clear the mental fog so you can actually enjoy your life again.",
    iconName: "Brain"
  },
  {
    title: "Your Freedom Plan",
    description: "A clear roadmap showing exactly how much you need to stop working one day and leave a legacy for your children.",
    iconName: "UserCheck"
  },
  {
    title: "The Growth Partner",
    description: "We don't just tell you what happened last year. We tell you what to do next to grow your business safely without burning out.",
    iconName: "Briefcase"
  }
];

export const AUDIENCES: Audience[] = [
  {
    id: "startups",
    label: "New Businesses",
    content: "Building it right from Day One. We handle the confusing paperwork and setup so you can focus on getting your first customers.",
    services: ["Proper Business Setup", "Investor-Ready Books", "Starting with Clarity"],
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1765744607/Integrated_Wellth_that_support_for_startup_businesses_wtnrwq.png"
  },
  {
    id: "existing-business",
    label: "Growing Businesses",
    content: "If your business has outgrown your old systems and it's getting messy, we help you fix the bottlenecks and prepare for the next level.",
    services: ["Fixing the Cash Flow Mess", "Winning Big Contracts", "Your 2026 Success Plan"],
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1765745275/Integrated_Wellth_in_support_for_existing_businesses._nnnmib.png"
  },
  {
    id: "npos",
    label: "Non-Profits & NGOs",
    content: "Keeping your mission clean and transparent so donors feel safe giving you more support. We handle the red tape.",
    services: ["Donor-Ready Reports", "Tax-Exempt Status", "Keeping it 100% Legal"],
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1765745902/Integrated_Wellth_in_support_for_NGOs_NPOs_u7exko.png"
  },
  {
    id: "individuals",
    label: "Families & Professionals",
    content: "Personal money maps to make sure you're earning enough to live the life you actually want, not just paying bills.",
    services: ["Tax Return Stress-Fix", "Family Wealth Maps", "Financial Peace of Mind"],
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1765746428/Integrated_Wellth_in_support_for_Individuals_Teens_Solutions._j58vsp.png"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Thabiso Nothana",
    role: "Director, Nothana Holdings",
    quote: "Marcia fixed two years of messy data in weeks. For the first time, I actually knew if I was making a profit or just keeping busy.",
    type: "Business Clarity"
  },
  {
    name: "Kidibone Lidovho",
    role: "CEO, Bluevalley Transport",
    quote: "She sorted my SARS problems once and for all. I finally sleep at night knowing my business is safe and my taxes are done right.",
    type: "Tax Peace of Mind"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Pillar 1: Structural Sovereignty
  {
    id: 1,
    category: "Structural Sovereignty",
    question: "Are your high-value assets (real estate, IP, equipment) held in the same legal entity that handles daily operational liabilities?",
    options: [
      { text: "Unified: Everything is in my name or a single operating company.", score: 1 },
      { text: "Partially Decoupled: Some personal assets are separate, but business assets are exposed to daily risk.", score: 2 },
      { text: "Structured: Assets are held in a separate holding entity with clear lease/usage agreements.", score: 3 },
      { text: "Sovereign: Personal and high-value assets are ring-fenced within a family trust or multi-tier legal architecture.", score: 4 }
    ]
  },
  {
    id: 2,
    category: "Liability Governance",
    question: "If a legal claim or creditor action hits the business today, are your personal savings, home, and family assets protected by an ironclad corporate veil?",
    options: [
      { text: "Fully Exposed: I am a Sole Proprietor or have signed unlimited personal sureties.", score: 1 },
      { text: "Vulnerable: I have an LLC but haven't maintained the 'formalities' (separate EINs, clean ledger separation).", score: 2 },
      { text: "Shielded: I have limited liability protection and specific insurance (Umbrella/D&O) to cover gaps.", score: 3 },
      { text: "Fortified: Cross-entity liability is minimized through non-recourse structures and advanced legal layering.", score: 4 }
    ]
  },
  {
    id: 3,
    category: "Data Sovereignty",
    question: "Is your sensitive financial and client data stored in a nation-blind, redundant architecture that complies with POPIA data localisation laws?",
    options: [
      { text: "Local/Physical: Data is on my laptop or a local server.", score: 1 },
      { text: "General Cloud: Data is in standard cloud storage without specific privacy-centric governance.", score: 2 },
      { text: "Compliant: Data is stored in a POPIA-compliant, encrypted vault with clear access logs.", score: 3 },
      { text: "Immune: Zero-knowledge encryption ensures data is unreadable by outsiders, even in a breach.", score: 4 }
    ]
  },
  // Pillar 2: Operational Intelligence
  {
    id: 4,
    category: "Founder-Independence",
    question: "Could your business maintain its standard level of service and 100% compliance if you were completely unreachable for 30 days?",
    options: [
      { text: "Total Collapse: I am the only one with the keys, passwords, and knowledge.", score: 1 },
      { text: "Fragile: Basic tasks continue, but all strategic and compliance decisions stall.", score: 2 },
      { text: "Managed: I have a team, but they still require my daily approval for 80% of tasks.", score: 3 },
      { text: "Autonomous: Agentic AI and documented workflows manage everything from invoicing to SARS responses.", score: 4 }
    ]
  },
  {
    id: 5,
    category: "Clean Sweep Compliance",
    question: "How do you handle regulatory shifts (SARS/CIPC) and the gathering of digital source documents (receipts/invoices)?",
    options: [
      { text: "Box of Receipts: Manual collection and 'catch-up' once a month or year.", score: 1 },
      { text: "Digital Repository: I save PDFs, but an accountant still has to manual-process them.", score: 2 },
      { text: "Proactive Monitoring: AI anomaly detection flags missing documents before I even know they are gone.", score: 3 },
      { text: "Clean Sweep: Zero-human-touch systems automatically triangulate bank data, OCR receipts, and draft SARS responses.", score: 4 }
    ]
  },
  {
    id: 6,
    category: "Continuous Accounting Intelligence",
    question: "How live is the data you use to make high-stakes business decisions?",
    options: [
      { text: "Retrospective: I only see the true picture when the tax season opens.", score: 1 },
      { text: "Monthly: I get management accounts 15 days after the month ends.", score: 2 },
      { text: "Real-Time: Dashboards are updated weekly through manual input.", score: 3 },
      { text: "Agentic: Live feeds and ML trend analysis provide 'Predictive Reassurance' daily.", score: 4 }
    ]
  },
  // Pillar 3: Psychological Resilience
  {
    id: 7,
    category: "Psychological Resilience",
    question: "When facing a critical crisis, who acts as your confidential sounding board for both your technical IQ and behavioral EQ?",
    options: [
      { text: "Lone Wolf: I carry the entire weight of the world on my shoulders.", score: 1 },
      { text: "Informal: I talk to friends or family who don't understand the business complexity.", score: 2 },
      { text: "Peer Network: I have a loose group of other founders for general advice.", score: 3 },
      { text: "Sovereign Partner: I have a dedicated accountability partner who protects my mind and my margin.", score: 4 }
    ]
  },
  {
    id: 8,
    category: "Decision Fatigue",
    question: "To what extent does the 'Mental Tax' of compliance and administrative tasks impact your creative energy for growth?",
    options: [
      { text: "Crippling: 80% of my time is spent on manual bookkeeping and 'fire-fighting'.", score: 1 },
      { text: "Significant: I know I should be visionary, but I’m too tired from the daily grind.", score: 2 },
      { text: "Balanced: I have basic systems, but still feel 'stretched' across too many roles.", score: 3 },
      { text: "Architect: My cognitive load is dedicated solely to strategic vision and legacy engineering.", score: 4 }
    ]
  },
  {
    id: 9,
    category: "Energy vs. Burnout",
    question: "How often do you experience 'Avoidance Behavior' (not logging into the bank account, ignoring emails) as a response to stress?",
    options: [
      { text: "Frequent: I avoid financial data when I suspect things are going poorly.", score: 1 },
      { text: "Occasional: I push through it, but it feels like a heavy weight.", score: 2 },
      { text: "Mindful: I recognize my warning signs and have a protocol to reset.", score: 3 },
      { text: "Resilient: I use financial data as a weapon of clarity, not a source of fear.", score: 4 }
    ]
  }
];

export const CONTACT_INFO = {
  phone: "+27 81 235 5910",
  email: "enquiries@integratedwellth.co.za",
  address: "Fred Messenger Ave, Pretoria, South Africa",
  calendlyUrl: "https://calendly.com/enquiries-integratedwellth/30min"
};
