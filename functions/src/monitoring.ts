import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";

if (!admin.apps.length) admin.initializeApp();
const db = admin.firestore();

const sendMetaMessage = async (toNumber: string, text: string): Promise<void> => {
  const WHATSAPP_TOKEN = (process.env.WHATSAPP_TOKEN || "").trim();
  const PHONE_NUMBER_ID = (process.env.PHONE_NUMBER_ID || "").trim();
  if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) return;

  // ─── SECURITY FIX: Validate phone number format before sending ───
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  if (!phoneRegex.test(toNumber)) {
    console.warn("Invalid phone number format, message not sent:", toNumber);
    return;
  }

  try {
    await fetch(`https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${WHATSAPP_TOKEN}`
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: toNumber,
        type: "text",
        text: { body: text }
      })
    });
  } catch (error) {
    console.error("Failed to send Meta message:", error);
  }
};

export const weeklySecurityAudit = onSchedule({
  schedule: "0 9 * * 1",
  region: "us-central1",
}, async () => {
  const now = admin.firestore.Timestamp.now();
  const oneWeekAgo = new Date(now.toDate().getTime() - 7 * 24 * 60 * 60 * 1000);
  const adminPhone = (process.env.ADMIN_PHONE_NUMBER || "").trim();

  let report = "🔐 *IWS Weekly Security Audit*\n";
  report += `📅 ${now.toDate().toLocaleDateString()}\n\n`;

  try {
    const auditSnapshot = await db.collection("ai_audit_logs")
      .where("timestamp", ">=", admin.firestore.Timestamp.fromDate(oneWeekAgo))
      .get();
    report += `🤖 *AI Chat Requests:* ${auditSnapshot.size}\n`;
    if (auditSnapshot.size > 500) report += `⚠️ HIGH: Unusual spike!\n`;
  } catch (e) {
    report += `🤖 *AI Chat Requests:* Error\n`;
  }

  try {
    const rateSnapshot = await db.collection("rate_limits")
      .where("count", ">=", 30)
      .get();
    if (rateSnapshot.empty) {
      report += `🚦 *Rate Limit Hits:* None ✅\n`;
    } else {
      report += `🚦 *Rate Limit Hits:* ${rateSnapshot.size} user(s)\n`;
      rateSnapshot.docs.slice(0, 3).forEach(doc => {
        report += ` - ${doc.id}: ${doc.data().count} req\n`;
      });
    }
  } catch (e) {
    report += `🚦 *Rate Limit Hits:* Error\n`;
  }

  try {
    const logSnapshot = await db.collection("user_logs")
      .where("timestamp", ">=", admin.firestore.Timestamp.fromDate(oneWeekAgo))
      .where("action", "==", "DASHBOARD_ACCESS")
      .get();
    const adminEmails = [
      "enquiries@integratedwellth.co.za",
      "marcia@integratedwellth.co.za"
    ];
    let unauthorized = 0;
    logSnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.email && !adminEmails.includes(data.email)) unauthorized++;
    });
    if (unauthorized === 0) {
      report += `🔑 *Dashboard Access:* Only admins ✅\n`;
    } else {
      report += `🚨 *Dashboard Access:* ${unauthorized} unauthorized!\n`;
    }
  } catch (e) {
    report += `🔑 *Dashboard Access:* Error\n`;
  }

  report += `\n✅ Audit complete.`;
  if (adminPhone) {
    await sendMetaMessage(adminPhone, report);
    console.log("Report sent.");
  } else {
    console.log("ADMIN_PHONE_NUMBER not set.", report);
  }
});
