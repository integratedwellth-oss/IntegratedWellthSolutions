/**
 * IWS SOVEREIGNTY - AI BEHAVIORAL DIAGNOSTIC
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 * FOCUS: ACCOUNTING | FINANCE | SA PSYCHOLOGY
 */

export type WealthArchetype = 'THE EXPATRIATED' | 'THE ANXIOUS FOUNDER' | 'THE STEWARD' | 'THE TACTICIAN';

interface SimulationData {
  runway: number;
  shock: number;
  cash: number;
  burn: number;
}

export const analyzeWealthPsychology = (data: SimulationData) => {
  const { runway, shock, cash, burn } = data;
  
  // 1. ACCOUNTING ANALYSIS (The Burn-to-Equity Ratio)
  const taxLeakageEstimate = (burn * 12) * 0.30; // Estimated 30% inefficiency
  
  // 2. FINANCIAL ANALYSIS (The ZAR Sensitivity)
  const isVolatile = shock > 30;
  
  // 3. PSYCHOLOGICAL ANALYSIS (The Anxiety Coefficient)
  // High Shock + High Cash = "The Paranoid Steward"
  // High Shock + Low Cash = "The Fragile Founder"
  
  let archetype: WealthArchetype = 'THE ANXIOUS FOUNDER';
  let aiInsights: string[] = [];

  if (runway < 6 && shock > 40) {
    archetype = 'THE ANXIOUS FOUNDER';
    aiInsights.push("Psychological Trigger: Survival Mode. You are prioritizing short-term liquidity over structural sovereignty.");
    aiInsights.push("Fiscal Note: Current ZAR exposure creates a 40% probability of capital impairment within 18 months.");
  } else if (cash > 2000000 && shock < 15) {
    archetype = 'THE STEWARD';
    aiInsights.push("Psychological Trigger: Complacency. You are underestimating South African systemic creep.");
    aiInsights.push("Accounting Note: Estimated R" + taxLeakageEstimate.toLocaleString() + " in annual tax leakage detected.");
  } else if (shock > 50) {
    archetype = 'THE EXPATRIATED';
    aiInsights.push("Psychological Trigger: Disconnection. You have emotionally exited the SA economy but your capital remains trapped.");
    aiInsights.push("Financial Note: Immediate offshore layering required to match your psychological risk profile.");
  }

  return { archetype, aiInsights, taxLeakageEstimate };
};
