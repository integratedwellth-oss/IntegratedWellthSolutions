import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Default Safe Exports to prevent "undefined" crashes
let app: FirebaseApp | any = {};
let db: Firestore | any = null;
let auth: Auth | any = {
  onAuthStateChanged: () => () => {}, // Mock function that does nothing
  currentUser: null
};
let analytics: any = null;

try {
  // Only initialize if we have a valid API Key
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "undefined") {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    
    db = getFirestore(app);
    auth = getAuth(app);
    
    if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
      analytics = getAnalytics(app);
    }
    console.log("IWS Intelligence: Firebase Secure Connection Established.");
  } else {
    console.warn("IWS Intelligence: Running in Protected Offline Mode (Keys Missing).");
  }
} catch (error) {
  console.error("IWS Intelligence: Critical Protocol Shield Active.", error);
}

export { app, db, auth, analytics };
export default app;
