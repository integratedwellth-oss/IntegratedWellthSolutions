/**
 * Client-side field encryption for sensitive Firestore writes.
 * Provides defense-in-depth: even if Firestore rules are misconfigured,
 * sensitive fields are encrypted at rest.
 *
 * Uses AES-GCM with a key derived from a collection-specific pepper + user UID.
 * Note: This is NOT a substitute for proper access controls. The server-side
 * trigger encryption (functions/src/triggers.ts) provides stronger protection.
 */

const COLLECTION_PEPPERS: Record<string, string> = {
  assessments: 'iws-assess-pepper-2026',
  war_room_leads: 'iws-leads-pepper-2026',
  workshop_registrations: 'iws-reg-pepper-2026',
};

const getKey = async (pepper: string, userId: string): Promise<CryptoKey> => {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(userId + pepper),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('iws-field-salt'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
};

const encryptField = async (plaintext: string, key: CryptoKey): Promise<string> => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(plaintext)
  );
  const result = { iv: Array.from(iv), data: Array.from(new Uint8Array(encrypted)) };
  return btoa(JSON.stringify(result));
};

const decryptField = async (ciphertext: string, key: CryptoKey): Promise<string> => {
  try {
    const parsed = JSON.parse(atob(ciphertext));
    const iv = new Uint8Array(parsed.iv);
    const data = new Uint8Array(parsed.data);
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    return new TextDecoder().decode(decrypted);
  } catch {
    return ciphertext; // Return as-is if not encrypted
  }
};

/**
 * Encrypt specified fields in a document before writing to Firestore.
 */
export const encryptDocumentForWrite = async (
  collection: string,
  doc: Record<string, unknown>,
  userId: string,
  fields: string[]
): Promise<Record<string, unknown>> => {
  const pepper = COLLECTION_PEPPERS[collection];
  if (!pepper) return doc;

  const key = await getKey(pepper, userId);
  const result = { ...doc };
  const encryptedFields: string[] = [];

  for (const field of fields) {
    const value = result[field];
    if (typeof value === 'string' && value.length > 0) {
      result[field] = await encryptField(value, key);
      encryptedFields.push(field);
    }
  }

  if (encryptedFields.length > 0) {
    result.__clientEncrypted = true;
    result.__clientEncryptedFields = encryptedFields;
  }

  return result;
};

/**
 * Decrypt specified fields in a document after reading from Firestore.
 */
export const decryptDocumentAfterRead = async (
  collection: string,
  doc: Record<string, unknown>,
  userId: string,
  fields?: string[]
): Promise<Record<string, unknown>> => {
  const pepper = COLLECTION_PEPPERS[collection];
  if (!pepper) return doc;

  const key = await getKey(pepper, userId);
  const result = { ...doc };
  const fieldsToDecrypt =
    fields ||
    (Array.isArray(doc.__clientEncryptedFields)
      ? (doc.__clientEncryptedFields as string[])
      : []);

  for (const field of fieldsToDecrypt) {
    const value = result[field];
    if (typeof value === 'string') {
      result[field] = await decryptField(value, key);
    }
  }

  return result;
};

/**
 * Sensitive fields per collection. Use these with encryptDocumentForWrite.
 */
export const SENSITIVE_FIELDS: Record<string, string[]> = {
  assessments: ['responses', 'notes', 'psychologicalProfile'],
  war_room_leads: ['email', 'whatsapp', 'intelligence_report_raw'],
  workshop_registrations: ['cellphone', 'email', 'proofOfPaymentUrl'],
};
