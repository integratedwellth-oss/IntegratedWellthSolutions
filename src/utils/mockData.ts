/**
 * IWS SOVEREIGNTY - FISCAL CONSTANTS
 * VERIFIED FOR SOUTH AFRICAN CONTEXT
 */

export const FISCAL_CONSTANTS = {
  TAX_BRACKETS: [
    { threshold: 237100, rate: 0.18 },
    { threshold: 370500, rate: 0.26 },
    { threshold: 512800, rate: 0.31 },
    { threshold: 673000, rate: 0.36 },
    { threshold: 857900, rate: 0.39 },
    { threshold: 1817000, rate: 0.41 },
    { threshold: Infinity, rate: 0.45 },
  ],
  ZAR_VOLATILITY_FACTOR: 1.2, // Coefficient for devaluation shock
  SARS_AUDIT_PROBABILITY: 0.15, // Baseline risk
  INFLATION_BASE: 0.058, // Current CPI average
};

export const MOCK_SCENARIOS = [
  {
    id: 'black-swan',
    name: 'Currency Collapse',
    description: 'ZAR devalues by 25% against USD.',
    impact: -25,
  },
  {
    id: 'sars-strike',
    name: 'Retrospective Audit',
    description: 'Unexpected SARS inquiry into offshore structures.',
    impact: -15,
  }
];
