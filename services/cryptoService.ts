/**
 * Client-side encryption for localStorage
 * Uses AES-GCM with a key derived from userId + pepper
 *
 * SECURITY NOTE: This prevents casual inspection and mitigates XSS data exfiltration.
 * A determined attacker with source access + user session can still decrypt.
 */

const PEPPER = 'iws-local-pepper-v1-2026';

const getKey = async (password: string): Promise<CryptoKey> => {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('iws-fixed-salt'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
};

export const encryptData = async (data: unknown, userId: string): Promise<string> => {
  const key = await getKey(userId + PEPPER);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(JSON.stringify(data))
  );
  const result = {
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(encrypted))
  };
  return btoa(JSON.stringify(result));
};

export const decryptData = async (ciphertext: string, userId: string): Promise<unknown | null> => {
  try {
    const key = await getKey(userId + PEPPER);
    const parsed = JSON.parse(atob(ciphertext));
    const iv = new Uint8Array(parsed.iv);
    const data = new Uint8Array(parsed.data);
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    return JSON.parse(new TextDecoder().decode(decrypted));
  } catch {
    return null;
  }
};
