import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { encryptData, decryptData } from './cryptoService';
import { getAuth } from 'firebase/auth';

// ─── Simple hash function for anonymization ───
const hashString = async (str: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 16);
};

const hasConsent = (): boolean => {
  return localStorage.getItem('iws_analytics_consent') === 'granted';
};

export const logUserActivity = async (action: string, details: string) => {
  console.log(`[LOG ATTEMPT]: ${action} - ${details}`);

  if (!db) {
    console.warn("Cloud logging unavailable: Firestore is not initialized.");
    return;
  }

  // ─── SECURITY FIX: Only log if user has given explicit consent ───
  if (!hasConsent()) {
    return;
  }

  try {
    // ─── SECURITY FIX: Anonymize sensitive data ───
    const userAgentHash = await hashString(navigator.userAgent);

    await addDoc(collection(db, 'user_logs'), {
      action,
      details,
      timestamp: serverTimestamp(),
      userAgentHash,        // Hashed fingerprint, not raw
      urlPath: window.location.pathname, // Only path, no query/hash
      platform: 'IWS_DASHBOARD_WEB'
    });
  } catch (error) {
    console.error("Cloud logging failed:", error);
  }
};

export const saveAssessmentResult = async (result: unknown) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.warn("Cannot encrypt assessment: no authenticated user.");
      return;
    }

    // ─── SECURITY FIX: Encrypt localStorage backup ───
    const encrypted = await encryptData(result, user.uid);
    localStorage.setItem('iws_health_score_results', encrypted);

    logUserActivity(
      'Assessment Saved',
      `Total Score: ${(result as any)?.totalScore || 'N/A'}%`
    );
  } catch (error) {
    console.error("Critical: Could not save to browser storage.", error);
  }
};

export const getAssessmentResult = async (): Promise<unknown | null> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return null;

    const encrypted = localStorage.getItem('iws_health_score_results');
    if (!encrypted) return null;
    return await decryptData(encrypted, user.uid);
  } catch {
    return null;
  }
};
