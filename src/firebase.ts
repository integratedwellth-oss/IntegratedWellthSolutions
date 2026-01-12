/**
 * IWS SOVEREIGNTY ENGINE - FIREBASE CORE
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

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const analyticsPromise = isSupported().then((yes) => {
  if (yes) return getAnalytics(app);
  return null;
});

export default app;
