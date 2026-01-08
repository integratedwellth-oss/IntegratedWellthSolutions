import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();

// 1. SETUP THE POSTMAN (Nodemailer)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "enquiries@integratedwellth.co.za",
    pass: "YOUR_GMAIL_APP_PASSWORD", // You MUST generate an App Password in Gmail settings
  },
});

// 2. THE TRIGGER: Runs every time a new lead is created
export const sendStrategicRoadmap = functions.firestore
  .document("leads/{leadId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    if (!data) return;

    const { email, name, enterprise, score, resultType } = data;

    const mailOptions = {
      from: '"Integrated Wellth Solutions" <enquiries@integratedwellth.co.za>',
      to: email,
      subject: `Sovereign Roadmap: ${enterprise}`,
      html: `
        <div style="font-family: sans-serif; color: #1a1a1a;">
          <h1 style="color: #1a365d;">Protocol Initialized: ${name}</h1>
          <p>Your Strategic Triage for <strong>${enterprise}</strong> is now complete.</p>
          
          <div style="padding: 30px; background: #f8fafc; border-left: 5px solid #d4af37; margin: 20px 0;">
            <h2 style="margin: 0;">Intelligence Tier: ${resultType}</h2>
            <p style="font-weight: bold;">Final Score: ${score}/48</p>
          </div>

          <p>This roadmap marks the end of your "Lonely Journey." Our advisors are reviewing your Technical Debt profile.</p>
          <p><strong>Next Step:</strong> Prepare for a discovery call to discuss the 2026 SARS AI transition.</p>
          
          <hr style="border: 0; border-top: 1px solid #eee; margin: 40px 0;">
          <p style="font-size: 12px; color: #666;">Integrated Wellth Solutions | Munyaka Lifestyle Estate, Pretoria</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return console.log(`Roadmap successfully deployed to ${email}`);
    } catch (error) {
      return console.error("Critical Mail Protocol Failure:", error);
    }
  });
