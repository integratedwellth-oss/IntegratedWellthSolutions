export const QUESTIONS = [
  { 
    category: "Financial Hygiene & Record-Keeping", 
    question: "Do you maintain strictly separated bank accounts and formal bookkeeping records (avoiding the R7,030 average compliance penalty trap)?", 
    options: [
      { text: "Yes, strictly separated with cloud bookkeeping", score: 4 }, 
      { text: "Mostly, but receipts & records are sporadic", score: 2 }, 
      { text: "No, mixing personal/business or manual records", score: 0 }
    ] 
  },
  { 
    category: "Management & Cash Flow Discipline", 
    question: "How do you manage cash flow and management accounts in your organisation?", 
    options: [
      { text: "Monthly management reviews and 12-month forecasts", score: 4 }, 
      { text: "Quarterly check-ins or year-end scrambles", score: 2 }, 
      { text: "Day-to-day cash blindness with no forecasting", score: 0 }
    ] 
  },
  { 
    category: "Tax Compliance & SARS AI Readiness", 
    question: "Are your SARS submissions (Provisional Tax, VAT, PAYE/EMP501) fully up to date and aligned with AI data matching?", 
    options: [
      { text: "Yes, 100% compliant with automated tracking", score: 4 }, 
      { text: "Generally up to date, but unsure of eFiling anomaly risks", score: 2 }, 
      { text: "No, facing backlogs or provisional tax confusion", score: 0 }
    ] 
  },
  { 
    category: "Governance & Statutory Framework", 
    question: "Are your CIPC Annual Returns, NPO Directorate reports, or King V/IV governance frameworks active?", 
    options: [
      { text: "Fully current and compliant with structured oversight", score: 4 }, 
      { text: "Basic compliance, but lacking formal board/audit minutes", score: 2 }, 
      { text: "At risk of deregistration or operating without formal controls", score: 0 }
    ] 
  },
  { 
    category: "NGO / NPO Fund Accounting (If Applicable)", 
    question: "How is restricted grant funding or donor reporting managed?", 
    options: [
      { text: "Dedicated fund accounting system tracking every Rand", score: 4 }, 
      { text: "Spreadsheets tracking major donor requirements", score: 2 }, 
      { text: "Ad-hoc tracking with high risk of grant commingling", score: 0 }
    ] 
  },
  { 
    category: "Strategic Architecture & Protection", 
    question: "Does your corporate structure include holding companies, asset protection, and formal internal controls?", 
    options: [
      { text: "Yes, fully structured for asset protection and scale", score: 4 }, 
      { text: "Standard PTY / NPO structure without layered protection", score: 2 }, 
      { text: "No formal structure or risk mitigation in place", score: 0 }
    ] 
  },
  { 
    category: "Founder Wellbeing & Mental Resilience", 
    question: "How does compliance stress impact your leadership focus and wellbeing?", 
    options: [
      { text: "Low stress; systems and advisors handle the load", score: 4 }, 
      { text: "Moderate anxiety around tax deadlines and cash flow", score: 2 }, 
      { text: "High burnout; compliance anxiety is draining my leadership", score: 0 }
    ] 
  }
];
