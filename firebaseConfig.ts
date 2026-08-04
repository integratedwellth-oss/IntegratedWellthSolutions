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
  // Validate every field BEFORE initializing. Firebase apps with an empty
  // projectId / apiKey / appId partially initialize and crash later inside
  // getAuth() with "Cannot read properties of null (reading 'app')".
  const required = ['apiKey', 'projectId', 'appId'] as const;
  const missing = required.filter((k) => !firebaseConfig[k] || String(firebaseConfig[k]).startsWith('undefined'));
  const valid = missing.length === 0;

  if (!valid) {
    console.warn(`[IWS] Firebase config invalid (missing: ${missing.join(', ')}). Running in demo mode.`);
  } else {
    app = initializeApp(firebaseConfig);

    // App Check: only initialize when a valid reCAPTCHA key is explicitly provided.
    // An invalid key would crash the bundle at runtime.
    const recaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    if (recaptchaKey && !String(recaptchaKey).startsWith('undefined')) {
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

    const authMaybe = getAuth(app);
    if (authMaybe) {
      authInstance = authMaybe;
      dbInstance = getFirestore(app);
      storageInstance = getStorage(app);
      functionsInstance = getFunctions(app);
    } else {
      console.warn('[IWS] Firebase Auth initialization returned null. Demo mode enabled.');
    }
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
