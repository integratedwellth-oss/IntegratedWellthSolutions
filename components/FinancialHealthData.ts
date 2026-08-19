export interface QuestionOption {
  text: string;
  score: number;
}

export interface Question {
  category: string;
  question: string;
  options: QuestionOption[];
}

export const BUSINESS_QUESTIONS: Question[] = [
  { 
    category: "Financial Hygiene & Record-Keeping", 
    question: "Do you maintain strictly separated bank accounts and formal bookkeeping records (avoiding the R7,030 average annual compliance cost trap)?", 
    options: [
      { text: "Strictly separated with monthly cloud bookkeeping", score: 4 }, 
      { text: "Mostly separated, but receipts & records are sporadic", score: 2 }, 
      { text: "Mixing personal/business accounts with no formal bookkeeping", score: 0 }
    ] 
  },
  { 
    category: "Management Accounting & Cash Flow", 
    question: "How frequently do you review management accounts, budgets, and cash flow forecasts?", 
    options: [
      { text: "Monthly management reviews with 12-month rolling forecasts", score: 4 }, 
      { text: "Quarterly check-ins or year-end scrambles for tax filing", score: 2 }, 
      { text: "Cash flow blindness with no budgeting discipline", score: 0 }
    ] 
  },
  { 
    category: "Tax Compliance & SARS AI Monitoring", 
    question: "Are your SARS submissions (Provisional Tax, VAT, PAYE/EMP501) up to date and aligned with real-time AI data matching?", 
    options: [
      { text: "100% compliant with automated compliance calendar tracking", score: 4 }, 
      { text: "Generally up to date, but provisional tax or VAT calculations are uncertain", score: 2 }, 
      { text: "Non-compliant with backlogs, facing penalty spirals or SARS audit triggers", score: 0 }
    ] 
  },
  { 
    category: "Corporate Governance & King V Standards", 
    question: "How is governance and CIPC statutory compliance handled in your enterprise?", 
    options: [
      { text: "Full CIPC compliance, active board oversight, and King V governance standards", score: 4 }, 
      { text: "CIPC returns current, but no formal board structure or internal controls", score: 2 }, 
      { text: "Lapsed CIPC returns, founder isolation, or operating without formal controls", score: 0 }
    ] 
  },
  { 
    category: "Financial Systems & Digital Integration", 
    question: "What accounting technology stack does your business rely on for daily operations?", 
    options: [
      { text: "Integrated cloud accounting with automated bank feeds and real-time dashboards", score: 4 }, 
      { text: "Manual Excel spreadsheets or basic desktop software", score: 2 }, 
      { text: "Paper-based receipts and unorganised manual record-keeping", score: 0 }
    ] 
  },
  { 
    category: "Strategic Architecture & Capital Readiness", 
    question: "Is your business structured for asset protection, tender eligibility, and investor due diligence?", 
    options: [
      { text: "Audit-ready structure with holding/operating separation and clear due diligence folders", score: 4 }, 
      { text: "Standard PTY Ltd but lacking asset protection or tender-ready documentation", score: 2 }, 
      { text: "Sole proprietorship or informal structure with high personal liability exposure", score: 0 }
    ] 
  },
  { 
    category: "Founder Psychology & Wellbeing", 
    question: "Do you have a dedicated strategic CBA advisor, or does compliance anxiety impact your decision-making?", 
    options: [
      { text: "Total financial clarity with dedicated CBA partner; compliance is an automated asset", score: 4 }, 
      { text: "Moderate stress around tax season and monthly payroll obligations", score: 2 }, 
      { text: "High founder burnout; compliance fear is paralyzing growth and we are on this journey alone", score: 0 }
    ] 
  }
];

export const NGO_NPO_QUESTIONS: Question[] = [
  {
    category: "Fund Accounting & Grant Management",
    question: "How do you track restricted grant funds across multiple donors (USAID, EU, UN, Foundations)?",
    options: [
      { text: "Dedicated fund accounting system tracking every Rand to specific donor intent", score: 4 },
      { text: "Spreadsheets tracking line items with risk of grant commingling", score: 2 },
      { text: "General pool bookkeeping with no grant-level restriction tracking", score: 0 }
    ]
  },
  {
    category: "Cost Allocation & Full Cost Recovery",
    question: "Do you calculate and recover true overhead costs (rent, administration, finance staff) from donor budgets?",
    options: [
      { text: "Formal cost allocation policy capturing full cost needs across all grants", score: 4 },
      { text: "Partial overhead recovery capped by arbitrary donor administration caps", score: 2 },
      { text: "No overhead allocation; indirect costs drain core operational reserves", score: 0 }
    ]
  },
  {
    category: "PBO Tax Exemption & Section 18A Receipts",
    question: "Is your Section 30 PBO tax-exempt status and Section 18A donor certificate issuing fully compliant with SARS?",
    options: [
      { text: "Fully compliant PBO status with real-time Section 18A tracking & audit trails", score: 4 },
      { text: "Approved PBO status, but Section 18A certificates or reporting are unverified", score: 2 },
      { text: "No PBO tax exemption or at risk of deregistration and loss of donor deductibility", score: 0 }
    ]
  },
  {
    category: "NPO Directorate Reporting & Proposed NPO Bill 2024",
    question: "Are your narrative & financial reports filed on time with the Department of Social Development (DSD) under the NPO Act?",
    options: [
      { text: "100% compliant with DSD NPO Directorate and prepared for NPO Bill 2024 governance standards", score: 4 },
      { text: "Registered NPO, but annual narrative or financial returns are delayed", score: 2 },
      { text: "Unsubmitted returns facing deregistration or operating without a formal constitution", score: 0 }
    ]
  },
  {
    category: "Governance, Board Oversight & Fiduciary Duty",
    question: "Does your organisation have an active governing board with financial expertise, regular AGMs, and documented minutes?",
    options: [
      { text: "Active, independent board with financial expertise, AGMs, and conflict of interest policies", score: 4 },
      { text: "Founder-dominated board or 'friends & family' board with informal oversight", score: 2 },
      { text: "No functioning board or minutes; 'one-person show' structure", score: 0 }
    ]
  },
  {
    category: "Multi-Currency Volatility & Reserve Buffers",
    question: "How do you manage foreign grant exchange fluctuations (USD/EUR/GBP to Rand) and grant payment delays in arrears?",
    options: [
      { text: "Active multi-currency cash flow management with hedging and operational reserve buffers", score: 4 },
      { text: "Ad-hoc monitoring of exchange rate shifts; occasional cash flow shocks", score: 2 },
      { text: "Constant cash flow crises when grant disbursements are delayed in arrears", score: 0 }
    ]
  },
  {
    category: "NGO Leadership Resilience & Mission Impact",
    question: "How does donor reporting pressure and compliance burden impact your leadership resilience?",
    options: [
      { text: "Low anxiety; robust financial systems free us to focus entirely on mission impact", score: 4 },
      { text: "Moderate strain balancing complex donor reporting with project delivery", score: 2 },
      { text: "Severe burnout; compliance burden is diverting critical resources from mission delivery", score: 0 }
    ]
  }
];

export const QUESTIONS = BUSINESS_QUESTIONS;
