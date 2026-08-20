import { getFirebaseDb, getFirebaseAuth } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { encryptDocumentForWrite } from './secureFirestore';

export interface LeadMagnetSubmission {
  fullName: string;
  email: string;
  phone?: string;
  businessName?: string;
  source?: string;
  checklistSelfAuditScore?: number;
  selectedIssues?: string[];
}

export const submitLeadMagnet = async (submission: LeadMagnetSubmission): Promise<{ success: boolean; message: string }> => {
  try {
    // 1. Always store locally in localStorage for persistent client state
    const existing = JSON.parse(localStorage.getItem('iws_lead_submissions') || '[]');
    existing.push({ ...submission, timestamp: new Date().toISOString() });
    localStorage.setItem('iws_lead_submissions', JSON.stringify(existing));
    localStorage.setItem('iws_founder_name', submission.fullName);
    localStorage.setItem('iws_founder_email', submission.email);
    localStorage.setItem('iws_popup_seen', 'true');

    // 2. Push to Firestore if configured
    const db = getFirebaseDb();
    const auth = getFirebaseAuth();

    if (db) {
      const currentUserId = auth?.currentUser?.uid || 'anonymous-lead';
      const rawDoc = {
        fullName: submission.fullName,
        email: submission.email,
        phone: submission.phone || '',
        businessName: submission.businessName || '',
        source: submission.source || 'founders_self_care_checklist',
        checklistScore: submission.checklistSelfAuditScore ?? null,
        selectedIssues: submission.selectedIssues || [],
        createdAt: serverTimestamp(),
        status: 'new_lead',
        campaign: 'founders_financial_self_care_2026'
      };

      const encryptedDoc = await encryptDocumentForWrite(
        'war_room_leads',
        rawDoc,
        currentUserId,
        ['email', 'phone']
      );

      await addDoc(collection(db, 'war_room_leads'), encryptedDoc);
    }

    return {
      success: true,
      message: 'Checklist delivered! You can now download and review your actionable guide.'
    };
  } catch (error) {
    console.error('[IWS Lead Magnet] Submission error:', error);
    // Even if Firestore fails, return true since local capture succeeded
    return {
      success: true,
      message: 'Checklist ready for download.'
    };
  }
};
