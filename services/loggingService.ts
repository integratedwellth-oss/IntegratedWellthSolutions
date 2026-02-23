import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const logUserActivity = async (action: string, details: string) => {
  console.log(`[ACTION ATTEMPT]: ${action} - ${details}`);
  
  // If database failed to load, don't crash the app
  if (!db) {
    console.warn("Database not initialized. Activity not saved to cloud.");
    return;
  }

  try {
    await addDoc(collection(db, 'user_logs'), {
      action: action,
      details: details,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      platform: 'IWS_DASHBOARD'
    });
  } catch (error) {
    console.error("Failed to sync activity to cloud:", error);
  }
};

export const saveAssessmentResult = (result: any) => {
  try {
    // Save to local storage first (Always works even without internet)
    localStorage.setItem('iws_health_score_results', JSON.stringify(result));
    
    // Attempt cloud sync
    logUserActivity(
      'Assessment Result Saved', 
      `Score: ${result.totalScore}%`
    );
  } catch (error) {
    console.error("Critical: Could not save assessment locally.");
  }
};
