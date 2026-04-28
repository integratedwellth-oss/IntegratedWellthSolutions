import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Debug log: Check if keys are actually arriving
console.log("Config Check:", { 
  hasKey: !!firebaseConfig.apiKey, 
  project: firebaseConfig.projectId 
});

let app, db, auth, functions;

if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "undefined") {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
  db = getFirestore(app);
  auth = getAuth(app);
  functions = getFunctions(app, 'us-central1');
} else {
  console.error("CRITICAL: Firebase Env Variables are undefined. Check GitHub Secrets mapping.");
}

export { app, db, auth, functions };
