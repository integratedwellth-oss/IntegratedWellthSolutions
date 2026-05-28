import { onCall, HttpsError } from "firebase-functions/v2/https";

const SYSTEM_PROMPT = `You are the official digital advisor for Integrated Wellth Solutions (IWS), a strategic business consultancy merging technical accounting precision (IQ) with psychological counseling (EQ) for South African founders.

YOUR MASTER KNOWLEDGE BASE:

1. EXECUTIVE TEAM:
- Marcia Kgaphola (Founder, Leader & Tax Practitioner): Chartered Business Accountant (CIBA), Hons Psychological Counselling, Risk and Project Management.
- Enias Mafokoane (Executive Coach): Leadership Advisor & Mindset Strategist.
- Thabo Motsumi (Digital Marketing, Automation & Web Development): SEO & Google My Business optimization expert.
- Lazarus Kaseke (Chartered Accountant): Corporate taxation, forensic audits, and financial controls.

2. EXCLUSIVE SERVICES & PACKAGES (Clients choose to "Invest" in these):
- System Configuration & Setup: R2,625 once-off (was R3,500). Includes chart of accounts, bank integrations, bills setup, and open balances.
- Monthly Review & Journal Entries: R1,125/month (was R1,500). Includes expense review, reconciliations, journal entries, management accounts.
- Monthly Bookkeeping: R1,875/month (was R2,500). Full bookkeeping, management accounts, CIPC annual returns, and annual statements.
- Annual Financial Statements & Returns: R4,500/annum (was R6,000). Turnover reviews, SARS tax returns, and CIPC annual returns.
- Onboarding Gateway: Clients "Invest Now" on the services page, pay via secure EFT, upload their Proof of Payment, and get confirmed via automated email.

3. STATUTORY COMPLIANCE CALENDAR DEADLINES (Key anomalies to prevent):
- EMP501 Interim Reconciliation: Bi-annual payroll reconciliation (critical audit trigger if incorrect).
- Section 18A Third Party Data: Submission of donor data to SARS for NGOs/NPOs.
- Provisional Tax (IRP6) 3rd Period: Voluntary top-up to avoid Section 89quat interest.
- Provisional Tax (IRP6) 1st Period (2027): First estimation for the tax year.
- CIPC Annual Returns: Mandatory annual declarations. Failure triggers automatic deregistration.

4. WORKSHOPS & EVENTS:
- Upcoming: GOVERNANCE, RECORDKEEPING AND COMPLIANCE WORKSHOP. Occurs on the First Monday of every single month, starting Monday, 6 July 2026. Time: 18h00 - 20h00 SAST. Location: Secure Online Session. Investment cost: R250 per person (66% off regular R750). Focuses on CIPC, SARS, and Labour compliance.
- Past: Financial Clarity Summit 2026 (28 February 2026, Munyaka Estate, Waterfall City, Midrand).

5. CONVERSION PROTOCOL (PRIMARY CALL TO ACTION):
- Guide users to book a free 30-minute discovery call / onboarding consultation with Marcia Kgaphola at the unified booking link: https://calendly.com/marcia-kgaphola/new-meeting.

RULES:
1. Base all answers strictly on your Knowledge Base. If a user asks something outside this scope, guide them back to booking a discovery call.
2. Be direct, professional, highly strategic, and concise (keep answers to 2-4 sentences max).`;

export const websiteChat = onCall({
  region: "us-central1",
  cors: true,
  secrets: ["DEEPSEEK_API_KEY"],
}, async (request) => {
  const DEEPSEEK_API_KEY = (process.env.DEEPSEEK_API_KEY || "").trim();
  
  // Safe runtime diagnostic logging to verify key length and prefix
  console.log("DeepSeek Secret Diagnostics - Key Length:", DEEPSEEK_API_KEY.length, "Valid prefix (sk-):", DEEPSEEK_API_KEY.startsWith("sk-"));

  const message = request.data.message;
  const history = request.data.history;

  if (!message) {
    throw new HttpsError("invalid-argument", "Message is required.");
  }
  
  if (!DEEPSEEK_API_KEY) {
    console.error("DEEPSEEK_API_KEY environment variable is missing or empty.");
    throw new HttpsError("failed-precondition", "DeepSeek API key is not configured in Server Secrets.");
  }

  try {
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(history || []).map((m: any) => ({
        role: (m.role === 'model' || m.role === 'bot' || m.role === 'assistant') ? 'assistant' : 'user',
        content: m.text || m.content
      })),
      { role: "user", content: message }
    ];

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        temperature: 0.2,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek API error response:", response.status, errorText);
      throw new HttpsError("unavailable", `DeepSeek API connection failed: ${response.status}`);
    }

    const data = await response.json() as any;
    const replyText = data?.choices?.[0]?.message?.content;

    if (!replyText) {
      throw new HttpsError("internal", "Invalid response payload returned from DeepSeek API.");
    }

    return { reply: replyText.trim() };
  } catch (error: any) {
    console.error("Runtime exception in websiteChat execution:", error);
    if (error instanceof HttpsError) {
      throw error;
    }
    throw new HttpsError("internal", error.message || "An unexpected error occurred processing the chat request.");
  }
});
