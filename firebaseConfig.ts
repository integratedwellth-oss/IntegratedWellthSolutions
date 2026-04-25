import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getFunctions, Functions } from "firebase/functions";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ""
};

const dummyApp = { name: 'shield-active' } as unknown as FirebaseApp;
let app: FirebaseApp = dummyApp;
let db: Firestore | any = null;
let auth: Auth | any = { onAuthStateChanged: () => () => {}, currentUser: null };
let analytics: any = null;
let functionsInstance: Functions | any = null;

try {
  if (firebaseConfig.apiKey) {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    
    db = getFirestore(app);
    auth = getAuth(app);
    functionsInstance = getFunctions(app, 'us-central1');
    
    if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
      analytics = getAnalytics(app);
    }
  } else {
    console.warn("IWS Warning: Firebase environment variables missing. Running in UI-only mode.");
  }
} catch (error) {
  console.error("IWS Shield: Firebase initialization paused.", error);
}

export { app, db, auth, analytics, functionsInstance as functions };
export default app;
