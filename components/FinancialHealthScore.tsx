import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { X, ChevronRight, Activity, ShieldCheck, Lock, User, Building, Mail, Phone } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../constants';
import Button from './Button';

interface FinancialHealthScoreProps {
  isOpen: boolean;
  onClose: () => void;
  isModal?: boolean;
}

const FinancialHealthScore: React.FC<FinancialHealthScoreProps> = ({ isOpen, onClose, isModal = false }) => {
  const navigate = useNavigate(); // Initialize navigation
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ fullName: '', businessName: '', email: '', whatsapp: '' });

  if (!isOpen) return null;

  const handleOptionSelect = (optionScore: number) => {
    const newScore = score + optionScore;
    setScore(newScore);
    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setShowLeadForm(true);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulating Firebase Sync and Email Trigger
    console.log("Firebase Data Sync Initialized...");

    // After success, navigate to the Success Page with data
    navigate('/assessment-success', { 
      state: { 
        email: leadData.email, 
        businessName: leadData.businessName 
      } 
    });
  };

  // ... rest of component logic (Quiz and Lead Form rendering)
  // ... (keeping content consistent with previous versions)

  return (
    // Component markup
    <div>{/* Rendering logic here */}</div>
  );
};
