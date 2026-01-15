
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";

// Safe environment access
const env = typeof process !== 'undefined' ? process.env : {};

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID
};

let app: FirebaseApp | null = null;
let analytics: Analytics | null = null;
let db: Firestore | null = null;

// Only attempt initialization if minimum config exists to prevent immediate crashes
if (firebaseConfig.projectId && firebaseConfig.apiKey) {
  try {
    app = initializeApp(firebaseConfig);
    
    // Initialize Firestore
    if (app) {
      db = getFirestore(app);
    }
    
    // Initialize Analytics safely
    const initAnalytics = async () => {
      if (app && firebaseConfig.measurementId) {
        try {
          const supported = await isSupported();
          if (supported) {
            analytics = getAnalytics(app);
          }
        } catch (error) {
          console.debug("Analytics not initialized:", error);
        }
      }
    };
    initAnalytics();

  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
} else {
  console.warn("Firebase config missing. Some features (Lead Capture) will operate in simulated mode.");
}

export { app, analytics, db };
