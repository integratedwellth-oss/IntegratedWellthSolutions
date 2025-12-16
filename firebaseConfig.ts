import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// import { getAuth } from "firebase/auth"; // Uncomment if you need Login/Auth

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  // Suppress initialization errors if env vars are missing
}

let analytics = null;

// Initialize Analytics safely
// We only attempt to initialize analytics if a measurementId is present and the environment supports it.
const initAnalytics = async () => {
  // Check if app is initialized and measurementId is available
  if (app && firebaseConfig.measurementId) {
    try {
      // Check for support, catch potential promise rejections
      const supported = await isSupported().catch(() => false);
      if (supported) {
        analytics = getAnalytics(app);
      }
    } catch (error) {
      // Analytics initialization failed.
      // This is common in environments with ad-blockers or restricted networks.
      // We suppress the error to keep the console clean.
    }
  }
};

// Execute initialization
initAnalytics();

export { app, analytics };