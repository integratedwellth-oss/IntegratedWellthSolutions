import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const logUserActivity = async (action: string, details: string) => {
  console.log(`[LOG ATTEMPT]: ${action} - ${details}`);
  
  // Safety check: Don't run if Firestore (db) failed to initialize
  if (!db) {
    console.warn("Cloud logging unavailable: Firestore is not initialized.");
    return;
  }

  try {
    await addDoc(collection(db, 'user_logs'), {
      action,
      details,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      platform: 'IWS_DASHBOARD_WEB'
    });
  } catch (error) {
    console.error("Cloud logging failed:", error);
  }
};

export const saveAssessmentResult = (result: any) => {
  try {
    // Local storage is our primary 'no-blackout' backup
    localStorage.setItem('iws_health_score_results', JSON.stringify(result));
    
    // Attempt to notify admin
    logUserActivity(
      'Assessment Saved', 
      `Total Score: ${result.totalScore}%`
    );
  } catch (error) {
    console.error("Critical: Could not save to browser storage.");
  }
};
