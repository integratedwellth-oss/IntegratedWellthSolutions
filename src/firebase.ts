/**
 * IWS SOVEREIGNTY ENGINE - FIREBASE CORE
 * VERIFIED AGAINST PROJECT: integratedwellthsolutions
 * STATUS: PRODUCTION READY
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your verified configuration from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyByrYwESDF82C9AiZxtg77eUfNcIVGOwmQ",
  authDomain: "integratedwellthsolutions.firebaseapp.com",
  projectId: "integratedwellthsolutions",
  storageBucket: "integratedwellthsolutions.firebasestorage.app",
  messagingSenderId: "841640688054",
  appId: "1:841640688054:web:4c0ea463640ea0d26fa917",
  measurementId: "G-KR4PRVGLLG"
};

/**
 * DEFENSIVE INITIALIZATION
 * 1. Checks if an app instance already exists (prevents HMR crashes).
 * 2. Initializes the core Firebase app.
 */
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

/**
 * FIRESTORE (THE DATA VAULT)
 * Exported for use in TriageForm.tsx and Admin.tsx.
 */
export const db = getFirestore(app);

/**
 * ANALYTICS (BEHAVIORAL INSIGHTS)
 * Wrapped in a support-check to prevent "Blank Screen" crashes 
 * in private browsers or environments with ad-blockers.
 */
export const analyticsPromise = isSupported().then((yes) => {
  if (yes) {
    return getAnalytics(app);
  }
  console.warn("IWS Intelligence: Analytics not supported in this browser environment.");
  return null;
});

// Default export for the primary app instance
export default app;
