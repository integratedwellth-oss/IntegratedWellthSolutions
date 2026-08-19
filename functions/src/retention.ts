import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";

if (!admin.apps.length) admin.initializeApp();
const db = admin.firestore();

const BATCH_SIZE = 500;

/**
 * Deletes documents older than a given number of days from a collection.
 */
const deleteOldDocuments = async (
  collectionName: string,
  days: number,
  timestampField: string = "timestamp"
): Promise<number> => {
  const cutoff = admin.firestore.Timestamp.fromDate(
    new Date(Date.now() - days * 24 * 60 * 60 * 1000)
  );

  let deleted = 0;
  let hasMore = true;

  while (hasMore) {
    const snapshot = await db
      .collection(collectionName)
      .where(timestampField, "<", cutoff)
      .limit(BATCH_SIZE)
      .get();

    if (snapshot.empty) {
      hasMore = false;
      break;
    }

    const batch = db.batch();
    for (const doc of snapshot.docs) {
      batch.delete(doc.ref);
    }
    await batch.commit();
    deleted += snapshot.size;

    // If we got a full batch, there might be more
    hasMore = snapshot.size === BATCH_SIZE;
  }

  return deleted;
};

/**
 * Daily data retention cleanup.
 * - user_logs: 90 days
 * - ai_audit_logs: 90 days
 * - rate_limits: 7 days (temporary data)
 * - whatsapp_sessions messages: 30 days
 */
export const dailyDataRetention = onSchedule({
  schedule: "0 2 * * *", // 2:00 AM daily
  region: "us-central1",
  timeZone: "Africa/Johannesburg",
}, async () => {
  console.log("[retention] Starting daily data retention cleanup...");

  try {
    const userLogsDeleted = await deleteOldDocuments("user_logs", 90);
    console.log(`[retention] Deleted ${userLogsDeleted} user_logs older than 90 days`);
  } catch (e) {
    console.error("[retention] Failed to clean user_logs:", e);
  }

  try {
    const auditLogsDeleted = await deleteOldDocuments("ai_audit_logs", 90);
    console.log(`[retention] Deleted ${auditLogsDeleted} ai_audit_logs older than 90 days`);
  } catch (e) {
    console.error("[retention] Failed to clean ai_audit_logs:", e);
  }

  try {
    const rateLimitsDeleted = await deleteOldDocuments("rate_limits", 7, "windowStart");
    console.log(`[retention] Deleted ${rateLimitsDeleted} rate_limits older than 7 days`);
  } catch (e) {
    console.error("[retention] Failed to clean rate_limits:", e);
  }

  // Clean old WhatsApp session messages (subcollection)
  try {
    const sessionCutoff = admin.firestore.Timestamp.fromDate(
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    );
    const sessionsSnap = await db.collection("whatsapp_sessions").limit(BATCH_SIZE).get();
    let whatsappDeleted = 0;

    for (const sessionDoc of sessionsSnap.docs) {
      const messagesSnap = await sessionDoc.ref
        .collection("messages")
        .where("timestamp", "<", sessionCutoff)
        .limit(BATCH_SIZE)
        .get();

      if (!messagesSnap.empty) {
        const batch = db.batch();
        for (const msg of messagesSnap.docs) {
          batch.delete(msg.ref);
        }
        await batch.commit();
        whatsappDeleted += messagesSnap.size;
      }
    }
    console.log(`[retention] Deleted ${whatsappDeleted} whatsapp session messages older than 30 days`);
  } catch (e) {
    console.error("[retention] Failed to clean whatsapp_sessions:", e);
  }

  console.log("[retention] Daily cleanup complete.");
});
