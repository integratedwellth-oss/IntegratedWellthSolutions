import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import Input from './Input';

export default function TriageForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await addDoc(collection(db, 'leads'), {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        createdAt: serverTimestamp(),
      });
      setSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (sent) return <div className="text-brand-gold font-black uppercase tracking-widest text-center py-10">Data Transmitted Successfully</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input label="Full Name" name="name" required />
      <Input label="Email Address" name="email" type="email" required />
      <Input label="Contact Number" name="phone" type="tel" />
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-brand-gold text-black font-black uppercase py-4 rounded-2xl text-xs hover:bg-white transition-colors disabled:opacity-50"
      >
        {loading ? 'Transmitting...' : 'Request Structural Audit'}
      </button>
    </form>
  );
}
