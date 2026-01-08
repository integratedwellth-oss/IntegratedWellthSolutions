import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();

// Configure your email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "enquiries@integratedwellth.co.za",
    pass: "YOUR_APP_PASSWORD", // Use a Gmail App Password, not your login password
  },
});

export const sendStrategicRoadmap = functions.firestore
  .document("leads/{leadId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const { email, name, enterprise, score, resultType } = data;

    const mailOptions = {
      from: '"Integrated Wellth Solutions" <enquiries@integratedwellth.co.za>',
      to: email,
      subject: `Strategic Roadmap: ${enterprise}`,
      html: `
        <h1>Protocol Initialized: ${name}</h1>
        <p>Your Financial Health Assessment for <strong>${enterprise}</strong> is complete.</p>
        <div style="padding: 20px; background: #f4f4f4; border-radius: 10px;">
          <h2>Intelligence Tier: ${resultType}</h2>
          <p>Scoring: ${score}/48</p>
        </div>
        <p>Our advisors are reviewing your technical debt profile. We will contact you shortly to discuss your path through the 2026 Watershed.</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Roadmap sent to ${email}`);
    } catch (error) {
      console.error("Email Protocol Failure:", error);
    }
  });
