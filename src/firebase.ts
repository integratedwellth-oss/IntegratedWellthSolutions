import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByrYwESDF82C9AiZxtg77eUfNcIVGOwmQ",
  authDomain: "integratedwellthsolutions.firebaseapp.com",
  projectId: "integratedwellthsolutions",
  storageBucket: "integratedwellthsolutions.firebasestorage.app",
  messagingSenderId: "841640688054",
  appId: "1:841640688054:web:4c0ea463640ea0d26fa917",
  measurementId: "G-KR4PRVGLLG"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
