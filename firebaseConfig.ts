import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getFunctions, Functions } from "firebase/functions";

// SURGICAL FIX: Hardcode your Firebase project details here.
// These keys are public by design and are entirely safe to commit to your frontend repository.
const firebaseConfig = {
 apiKey: "REPLACE_WITH_YOUR_ACTUAL_API_KEY",
 authDomain: "REPLACE_WITH_YOUR_AUTH_DOMAIN",
 projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
 storageBucket: "REPLACE_WITH_YOUR_STORAGE_BUCKET",
 messagingSenderId: "REPLACE_WITH_YOUR_MESSAGING_SENDER_ID",
 appId: "REPLACE_WITH_YOUR_APP_ID",
 measurementId: "REPLACE_WITH_YOUR_MEASUREMENT_ID"
};

const dummyApp = { name: 'shield-active' } as unknown as FirebaseApp;
let app: FirebaseApp = dummyApp;
let db: Firestore | any = null;
let auth: Auth | any = { onAuthStateChanged: () => () => {}, currentUser: null };
let analytics: any = null;
let functionsInstance: Functions | any = null;

try {
 // We now check to ensure you have actually replaced the placeholder strings
 if (firebaseConfig.apiKey && !firebaseConfig.apiKey.includes("REPLACE")) {
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
   console.error("CRITICAL: Firebase Config is missing actual values. Please update firebaseConfig.ts");
 }
} catch (error) {
 console.error("IWS Shield: Firebase initialization paused.", error);
}

export { app, db, auth, analytics, functionsInstance as functions };
export default app;
