import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getFunctions, Functions } from 'firebase/functions';

// Safe, fault-tolerant Firebase initialization.
// If env vars or App Check are missing, the app still renders (demo mode)
// instead of crashing to a blank page.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;
let functionsInstance: Functions | null = null;

try {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.warn('[IWS] Firebase env vars missing - running in demo mode.');
  } else {
    app = initializeApp(firebaseConfig);

    // App Check: only attempt init if a key is configured for this origin.
    // Missing/invalid reCAPTCHA key would otherwise crash the entire bundle.
    const recaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    if (recaptchaKey) {
      import('firebase/app-check')
        .then(({ initializeAppCheck, ReCaptchaV3Provider }) => {
          try {
            initializeAppCheck(app!, {
              provider: new ReCaptchaV3Provider(recaptchaKey),
              isTokenAutoRefreshEnabled: true,
            });
          } catch (e) {
            console.warn('[IWS] App Check init failed, continuing without it.', e);
          }
        })
        .catch((e) => console.warn('[IWS] App Check module load failed.', e));
    }

    authInstance = getAuth(app);
    dbInstance = getFirestore(app);
    storageInstance = getStorage(app);
    functionsInstance = getFunctions(app);
  }
} catch (e) {
  console.error('[IWS] Firebase initialization failed. Demo mode enabled.', e);
}

export const auth = authInstance as Auth;
export const db = dbInstance as Firestore;
export const storage = storageInstance as FirebaseStorage;
export const functions = functionsInstance as Functions;
export const isDemoMode = !app;

export default app;
