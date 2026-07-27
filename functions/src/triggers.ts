import { onDocumentCreated, onDocumentUpdated } from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";
import { encryptDocumentFields } from "./crypto";

if (!admin.apps.length) admin.initializeApp();

// ─── Fields to auto-encrypt per collection ───
const ENCRYPTED_FIELDS: Record<string, string[]> = {
  assessments: ["responses", "notes", "psychologicalProfile"],
  war_room_leads: ["email", "whatsapp", "intelligence_report_raw"],
  workshop_registrations: ["cellphone", "email", "proofOfPaymentUrl"],
};

/**
 * Auto-encrypt sensitive fields when a document is created.
 */
export const encryptOnCreate = onDocumentCreated(
  {
    document: "{collection}/{docId}",
    region: "us-central1",
  },
  async (event) => {
    const collection = event.params.collection;
    const fields = ENCRYPTED_FIELDS[collection];
    if (!fields) return;

    const snap = event.data;
    if (!snap) return;

    const data = snap.data();
    if (data.__encrypted) return; // Already encrypted

    const encrypted = encryptDocumentFields(data, fields);
    await snap.ref.update(encrypted);
    console.log(`[trigger] Encrypted ${fields.length} fields in ${collection}/${event.params.docId}`);
  }
);

/**
 * Auto-encrypt sensitive fields when a document is updated.
 * Only encrypts if the plaintext fields were modified.
 */
export const encryptOnUpdate = onDocumentUpdated(
  {
    document: "{collection}/{docId}",
    region: "us-central1",
  },
  async (event) => {
    const collection = event.params.collection;
    const fields = ENCRYPTED_FIELDS[collection];
    if (!fields) return;

    const after = event.data?.after;
    if (!after) return;

    const data = after.data();
    if (data.__encrypted) return;

    const encrypted = encryptDocumentFields(data, fields);
    await after.ref.update(encrypted);
    console.log(`[trigger] Re-encrypted fields in ${collection}/${event.params.docId}`);
  }
);
