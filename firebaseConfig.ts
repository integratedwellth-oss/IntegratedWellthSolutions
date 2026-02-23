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

// Initialize variables with null/undefined for TypeScript safety
let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;
let analytics: any = null;

try {
  // Check if we have the minimum required keys before trying to initialize
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    
    if (app) {
      db = getFirestore(app);
      auth = getAuth(app);
      
      if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
        analytics = getAnalytics(app);
      }
    }
  } else {
    console.warn("Firebase configuration is missing keys. Running in offline mode.");
  }
} catch (error) {
  console.error("Firebase Initialization Error:", error);
}

// Export with the exact names used by other files
export { app, db, auth, analytics };
export default app;
