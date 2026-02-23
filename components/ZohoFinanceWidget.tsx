import React, { useState } from 'react';
import { FileText, Calculator, Receipt, Package, ArrowRight, CheckCircle2, Loader2, Send, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CREATE_INVOICE_URL = "https://us-central1-integratedwellthsolutions.cloudfunctions.net/createInvoice"; 

const IWS_APPS = [
  { id: 'invoice', name: 'IWS Invoice', icon: <FileText size={20} />, color: '#134e4a' },
  { id: 'books', name: 'IWS Books', icon: <Calculator size={20} />, color: '#d4af37' },
  { id: 'inventory', name: 'IWS Inventory', icon: <Package size={20} />, color: '#3E2723' },
  { id: 'expense', name: 'IWS Expense', icon: <Receipt size={20} />, color: '#0d9488' }
];

const ZohoFinanceWidget: React.FC = () => {
  const [activeApp, setActiveApp] = useState('invoice');
  const [mode, setMode] = useState<'view' | 'create'>('view');
  const [loading, setLoading] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({ customerName: '', itemName: '', rate: '', quantity: '1' });

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Security Check: If keys are dummy, don't even try the fetch
      if (import.meta.env.VITE_FIREBASE_API_KEY === 'dummy') {
        throw new Error("System in Offline Mode");
      }

      const response = await fetch(CREATE_INVOICE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceForm)
      });
      
      if (!response.ok) throw new Error("Server Error");
      
      alert("Success: Invoice Processed.");
      setMode('view');
    } catch (error) {
      console.error(error);
      alert("Connection Failed: Ensure Cloud Functions are deployed and VITE keys are set in GitHub Secrets.");
    } finally {
      // CRITICAL: Ensure button is reset even on error
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f0fdfa] rounded-[2.5rem] p-8 border border-[#134e4a]/10 relative overflow-hidden">
      <div className="flex justify-between items-center mb-8 relative z-10">
        <h2 className="text-2xl font-black text-[#134e4a] uppercase tracking-tighter">IWS Finance OS</h2>
        {mode === 'create' && (
          <button onClick={() => setMode('view')} className="text-[10px] font-black text-gray-400 hover:text-red-500 uppercase tracking-widest">Cancel</button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {mode === 'view' ? (
          <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {IWS_APPS.map(app => (
                <button key={app.id} onClick={() => setActiveApp(app.id)} className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${activeApp === app.id ? 'bg-white border-[#d4af37] shadow-md' : 'bg-transparent border-transparent opacity-40'}`}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: app.color }}>{app.icon}</div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#134e4a]">{app.name}</span>
                </button>
              ))}
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#134e4a]/5 flex justify-between items-center">
               <p className="text-xs font-bold text-gray-500 uppercase">Ready for {IWS_APPS.find(a => a.id === activeApp)?.name} action.</p>
               <button onClick={() => setMode('create')} className="px-6 py-3 bg-[#134e4a] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#d4af37] transition-all">
                  Launch Dashboard
               </button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleCreateInvoice} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 bg-white p-6 rounded-2xl border-2 border-[#134e4a]">
            <input type="text" placeholder="Customer Name" required className="w-full p-3 bg-gray-50 border rounded-lg text-sm font-bold outline-none focus:border-[#d4af37]" value={invoiceForm.customerName} onChange={e => setInvoiceForm({...invoiceForm, customerName: e.target.value})} />
            <div className="flex gap-3">
              <input type="text" placeholder="Description" required className="flex-grow p-3 bg-gray-50 border rounded-lg text-sm font-bold" value={invoiceForm.itemName} onChange={e => setInvoiceForm({...invoiceForm, itemName: e.target.value})} />
              <input type="number" placeholder="Rate" required className="w-24 p-3 bg-gray-50 border rounded-lg text-sm font-bold" value={invoiceForm.rate} onChange={e => setInvoiceForm({...invoiceForm, rate: e.target.value})} />
            </div>
            <button type="submit" disabled={loading} className="w-full py-4 bg-[#134e4a] text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">
              {loading ? <Loader2 className="animate-spin" size={16} /> : <><Send size={14} /> Send IWS Invoice</>}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ZohoFinanceWidget;
