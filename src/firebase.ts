/**
 * IWS SOVEREIGNTY ENGINE - FIREBASE CORE
 * VERIFIED AGAINST PROJECT: integratedwellthsolutions
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyByrYwESDF82C9AiZxtg77eUfNcIVGOwmQ",
  authDomain: "integratedwellthsolutions.firebaseapp.com",
  projectId: "integratedwellthsolutions",
  storageBucket: "integratedwellthsolutions.firebasestorage.app",
  messagingSenderId: "841640688054",
  appId: "1:841640688054:web:4c0ea463640ea0d26fa917",
  measurementId: "G-KR4PRVGLLG"
};

// Singleton pattern to prevent re-initialization crashes during Hot Module Replacement (HMR)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firestore for lead collection
export const db = getFirestore(app);

// Analytics is wrapped in a promise check because it fails in some private browsers/environments
export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export default app;
