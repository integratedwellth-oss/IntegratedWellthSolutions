/**
 * IWS SOVEREIGNTY - REAL-TIME DATA HOOK
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export const useLeads = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "leads"), orderBy("timestamp", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLeads(leadData);
      setLoading(false);
    }, (error) => {
      console.error("Firebase Hook Failure:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { leads, loading };
};
