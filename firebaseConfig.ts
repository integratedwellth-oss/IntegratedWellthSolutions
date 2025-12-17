// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Added this for Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqkjyN8etq3GcoJjdr9SyPewMCMtZRKdg",
  authDomain: "integratedwellth-a288f.firebaseapp.com",
  projectId: "integratedwellth-a288f",
  storageBucket: "integratedwellth-a288f.firebasestorage.app",
  messagingSenderId: "271338433506",
  appId: "1:271338433506:web:2419f6f94af41fd691a7bb",
  measurementId: "G-R6CYBXMR5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Database
const db = getFirestore(app);

// Export them so other files can use them
export { app, analytics, db };
