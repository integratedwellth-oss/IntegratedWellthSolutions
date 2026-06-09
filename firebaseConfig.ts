import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getFunctions, Functions } from "firebase/functions";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const dummyApp = { name: "shield-active" } as unknown as FirebaseApp;

let app: FirebaseApp = dummyApp;
let db: Firestore = null as unknown as Firestore;
let auth: Auth = { onAuthStateChanged: () => () => {}, currentUser: null } as unknown as Auth;
let storage: FirebaseStorage = null as unknown as FirebaseStorage;
let analytics: Analytics = null as unknown as Analytics;
let functionsInstance: Functions = null as unknown as Functions;

try {
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "undefined") {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
    functionsInstance = getFunctions(app, 'us-central1');
    
    if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
      analytics = getAnalytics(app);
    }
  } else {
    console.error("CRITICAL: Firebase Env Variables are undefined. Check GitHub Secrets mapping.");
  }
} catch (error) {
  console.error("IWS Shield: Firebase initialization paused.", error);
}

export { app, db, auth, storage, analytics, functionsInstance as functions };
export default app;
