import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyCqkjyN8etq3GcoJjdr9SyPewMCMtZRKdg",
  authDomain: "integratedwellth-a288f.firebaseapp.com",
  projectId: "integratedwellth-a288f",
  storageBucket: "integratedwellth-a288f.firebasestorage.app",
  messagingSenderId: "271338433506",
  appId: "1:271338433506:web:2419f6f94af41fd691a7bb",
  measurementId: "G-R6CYBXMR5C"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, db, auth, googleProvider };
