import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getFunctions, Functions } from 'firebase/functions';

// ─── Lazy, fault-tolerant Firebase initialization ─────────────────────────────
// Previous approach crashed at module load: getAuth(app) with an invalid config
// creates a "zombie" auth handle that dereferences null when used.
// Now: resources are only created on first use, and only if the config is
// fully valid. Consumers must feature-detect (e.g. `if (!getFirebaseAuth())`).
interface FirebaseHandles {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
  functions: Functions;
}

let cached: FirebaseHandles | null | 'invalid' = null;

const buildConfig = () => ({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
});

const validateConfig = (config: ReturnType<typeof buildConfig>): string[] => {
  const missing: string[] = [];
  if (!config.apiKey || config.apiKey === 'undefined') missing.push('apiKey');
  if (!config.projectId || config.projectId === 'undefined') missing.push('projectId');
  if (!config.authDomain || config.authDomain === 'undefined') missing.push('authDomain');
  if (!config.appId || config.appId === 'undefined') missing.push('appId');
  return missing;
};

const init = (): FirebaseHandles | null => {
  if (cached === 'invalid') return null;
  if (cached) return cached;

  const config = buildConfig();
  const missing = validateConfig(config);

  if (missing.length > 0) {
    console.warn(
      `[IWS] Firebase not configured (missing: ${missing.join(', ')}). Running in demo mode.`
    );
    cached = 'invalid';
    return null;
  }

  try {
    const app = initializeApp(config);

    // App Check: optional, only if a valid reCAPTCHA site key is set
    const recaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    if (recaptchaKey && recaptchaKey !== 'undefined') {
      import('firebase/app-check')
        .then(({ initializeAppCheck, ReCaptchaV3Provider }) => {
          try {
            initializeAppCheck(app, {
              provider: new ReCaptchaV3Provider(recaptchaKey),
              isTokenAutoRefreshEnabled: true,
            });
          } catch (e) {
            console.warn('[IWS] App Check init failed (non-fatal).', e);
          }
        })
        .catch((e) => console.warn('[IWS] App Check module unavailable (non-fatal).', e));
    }

    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);
    const functions = getFunctions(app);

    cached = { app, auth, db, storage, functions };
    return cached;
  } catch (e) {
    console.error('[IWS] Firebase init failed (non-fatal). Demo mode enabled.', e);
    cached = 'invalid';
    return null;
  }
};

// ─── Public lazy getters ──────────────────────────────────────────────────────
export const getFirebaseApp = (): FirebaseApp | null => init()?.app ?? null;
export const getFirebaseAuth = (): Auth | null => init()?.auth ?? null;
export const getFirebaseDb = (): Firestore | null => init()?.db ?? null;
export const getFirebaseStorage = (): FirebaseStorage | null => init()?.storage ?? null;
export const getFirebaseFunctions = (): Functions | null => init()?.functions ?? null;
export const isFirebaseEnabled = (): boolean => init() !== null;

// ─── Deprecated static exports (backward-compat, only if initialized) ─────────
// These exist so older imports don't break. Use the getters instead.
const handles = init();
export const auth = handles?.auth as Auth;
export const db = handles?.db as Firestore;
export const storage = handles?.storage as FirebaseStorage;
export const functions = handles?.functions as Functions;
export default handles?.app ?? null;
