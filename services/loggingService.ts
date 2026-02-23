import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const logUserActivity = async (action: string, details: string, userId: string = 'guest') => {
  try {
    await addDoc(collection(db, 'user_logs'), {
      action,
      details,
      userId,
      timestamp: serverTimestamp(),
      device: navigator.userAgent
    });
    console.log(`[LOGGED]: ${action}`);
  } catch (error) {
    console.error("Error logging activity:", error);
  }
};

export const saveAssessmentResult = async (result: any) => {
  try {
    // 1. Save to LocalStorage for instant UI update
    localStorage.setItem('iws_health_score_results', JSON.stringify(result));
    
    // 2. Save to Firestore for permanent record
    await addDoc(collection(db, 'assessments'), {
      ...result,
      timestamp: serverTimestamp()
    });

    // 3. Log the activity
    await logUserActivity('Assessment Completed', `Score: ${result.totalScore}%`);
  } catch (error) {
    console.error("Error saving assessment:", error);
  }
};
