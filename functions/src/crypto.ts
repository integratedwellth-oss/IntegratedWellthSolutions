import * as crypto from "crypto";

const FIELD_ENCRYPTION_KEY = (process.env.FIELD_ENCRYPTION_KEY || "").trim();

if (!FIELD_ENCRYPTION_KEY && process.env.NODE_ENV !== "test") {
  console.warn(
    "[crypto] FIELD_ENCRYPTION_KEY is not set. Sensitive data will be stored in plaintext."
  );
}

const ALGORITHM = "aes-256-gcm";
const KEY_LENGTH = 32;
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

const getKey = (): Buffer => {
  if (!FIELD_ENCRYPTION_KEY) {
    throw new Error("FIELD_ENCRYPTION_KEY is not configured");
  }
  // Derive a 32-byte key from the secret using SHA-256
  return crypto.createHash("sha256").update(FIELD_ENCRYPTION_KEY).digest();
};

/**
 * Encrypt a plaintext string. Returns base64(iv + authTag + ciphertext).
 */
export const encryptField = (plaintext: string): string => {
  if (!FIELD_ENCRYPTION_KEY) return plaintext;
  if (!plaintext) return plaintext;

  const key = getKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  // iv (16) + authTag (16) + ciphertext
  const result = Buffer.concat([iv, authTag, encrypted]);
  return result.toString("base64");
};

/**
 * Decrypt a base64 string produced by encryptField.
 */
export const decryptField = (ciphertext: string): string => {
  if (!FIELD_ENCRYPTION_KEY) return ciphertext;
  if (!ciphertext) return ciphertext;

  try {
    const key = getKey();
    const data = Buffer.from(ciphertext, "base64");

    const iv = data.subarray(0, IV_LENGTH);
    const authTag = data.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
    const encrypted = data.subarray(IV_LENGTH + AUTH_TAG_LENGTH);

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);
    return decrypted.toString("utf8");
  } catch {
    // If decryption fails, return original (handles legacy plaintext data)
    return ciphertext;
  }
};

/**
 * Encrypt specified fields in a document object.
 * Adds __encrypted: true flag and __encryptedFields array.
 */
export const encryptDocumentFields = (
  doc: Record<string, unknown>,
  fields: string[]
): Record<string, unknown> => {
  if (!FIELD_ENCRYPTION_KEY) return doc;

  const encrypted: string[] = [];
  const result = { ...doc };

  for (const field of fields) {
    const value = result[field];
    if (typeof value === "string" && value.length > 0) {
      result[field] = encryptField(value);
      encrypted.push(field);
    }
  }

  if (encrypted.length > 0) {
    result.__encrypted = true;
    result.__encryptedFields = encrypted;
  }

  return result;
};

/**
 * Decrypt specified fields in a document object.
 */
export const decryptDocumentFields = (
  doc: Record<string, unknown>,
  fields?: string[]
): Record<string, unknown> => {
  if (!FIELD_ENCRYPTION_KEY) return doc;

  const result = { ...doc };
  const fieldsToDecrypt =
    fields ||
    (Array.isArray(doc.__encryptedFields)
      ? (doc.__encryptedFields as string[])
      : []);

  for (const field of fieldsToDecrypt) {
    const value = result[field];
    if (typeof value === "string") {
      result[field] = decryptField(value);
    }
  }

  return result;
};
