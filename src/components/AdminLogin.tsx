/**
 * IWS SOVEREIGNTY - SECURE ACCESS TERMINAL
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

import React, { useState } from 'react';
import { Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Input from './Input';
import Button from './Button';

export default function AdminLogin() {
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <form 
        onSubmit={handleLogin}
        className="max-w-sm w-full bg-[#0a0c12] border border-white/5 p-10 rounded-3xl space-y-8 shadow-2xl"
      >
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 bg-brand-gold/10 rounded-2xl border border-brand-gold/20">
              <Lock className="text-brand-gold" size={24} />
            </div>
          </div>
          <h2 className="text-xl font-black uppercase tracking-tighter text-white italic">Admin Access</h2>
          <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.3em]">Encrypted Session Required</p>
        </div>

        <Input 
          label="Access Key"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error ? "Invalid Protocol Key" : ""}
        />

        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          icon={<ShieldCheck size={16} />}
        >
          Authorize Login
        </Button>

        {error && (
          <div className="flex items-center gap-2 justify-center text-red-500 animate-shake">
            <AlertCircle size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Access Denied</span>
          </div>
        )}
      </form>
    </div>
  );
}
