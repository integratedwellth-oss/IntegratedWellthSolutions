import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 

// Your NEW working US-based configuration
const firebaseConfig = {
  apiKey: "AIzaSyByrYwESDF82C9AiZxtg77eUfNcIVGOwmQ",
  authDomain: "integratedwellthsolutions.firebaseapp.com",
  projectId: "integratedwellthsolutions",
  storageBucket: "integratedwellthsolutions.firebasestorage.app",
  messagingSenderId: "841640688054",
  appId: "1:841640688054:web:4c0ea463640ea0d26fa917",
  measurementId: "G-KR4PRVGLLG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, db, auth, googleProvider };
