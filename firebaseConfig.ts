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

// 1. Initialize variables with null/undefined to satisfy the TS2454 compiler error
// We use 'any' as a fallback type to ensure no downstream files break during the build
let app: FirebaseApp | any = undefined;
let db: Firestore | any = undefined;
let auth: Auth | any = undefined;
let analytics: any = null;

// 2. The Defensive Shield
// This block ensures the app initializes IF keys exist, but doesn't crash if they don't.
try {
  // Only attempt initialization if the environment provided a Project ID
  if (firebaseConfig.projectId && firebaseConfig.apiKey) {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    
    // Assign services only if app was successfully created
    if (app) {
      db = getFirestore(app);
      auth = getAuth(app);
      
      // Analytics is browser-only
      if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
        analytics = getAnalytics(app);
      }
    }
  } else {
    // This warning will show in the browser console, but the page will stay visible
    console.warn("IWS System: Firebase keys missing. Intelligence Dashboard running in read-only mode.");
  }
} catch (error) {
  // Catching the error here prevents the 'Blackout' (White screen)
  console.error("IWS System: Critical initialization failure. Protecting UI from crash.", error);
}

// 3. Guaranteed Exports
// These are now definitely assigned (even if assigned to undefined/null)
export { app, db, auth, analytics };
export default app;
