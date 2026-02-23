import React, { useState } from 'react';
import { 
  FileText, Calculator, Receipt, Package, 
  ArrowRight, CheckCircle2, ShieldCheck, Loader2, Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// API URL (Replace with your actual deployed function URL later)
// For local testing use: http://127.0.0.1:5001/your-project/us-central1/createInvoice
const CREATE_INVOICE_URL = "https://us-central1-integratedwellthsolutions.cloudfunctions.net/createInvoice"; 

const IWS_APPS = [
  {
    id: 'invoice',
    name: 'IWS Invoice',
    desc: 'Billing & Estimates',
    icon: <FileText size={24} />,
    color: '#134e4a',
    features: ['Create Invoices', 'Accept Payments', 'Client Statements']
  },
  {
    id: 'books',
    name: 'IWS Books',
    desc: 'Ledger & Tax',
    icon: <Calculator size={24} />,
    color: '#d4af37',
    features: ['View General Ledger', 'Tax Compliance Status', 'Audit Trails']
  },
  {
    id: 'inventory',
    name: 'IWS Inventory',
    desc: 'Stock Control',
    icon: <Package size={24} />,
    color: '#3E2723',
    features: ['Stock Tracking', 'Order Management', 'Warehousing']
  },
  {
    id: 'expense',
    name: 'IWS Expense',
    desc: 'Reimbursements',
    icon: <Receipt size={24} />,
    color: '#0d9488',
    features: ['Scan Receipts', 'Log Mileage', 'Approve Claims']
  }
];

const ZohoFinanceWidget: React.FC = () => {
  const [activeApp, setActiveApp] = useState('invoice');
  const [mode, setMode] = useState<'view' | 'create'>('view');
  
  // Invoice Form State
  const [loading, setLoading] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({
    customerName: '',
    itemName: '',
    rate: '',
    quantity: '1'
  });

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(CREATE_INVOICE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceForm)
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert("Invoice Created Successfully inside IWS System!");
        setMode('view');
        setInvoiceForm({ customerName: '', itemName: '', rate: '', quantity: '1' });
      } else {
        alert("Error creating invoice. Please try again.");
      }
    } catch (error) {
      console.error("Invoice Error:", error);
      alert("System connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f0fdfa] rounded-[2.5rem] p-8 border border-[#134e4a]/10 relative overflow-hidden transition-all">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 relative z-10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-[#134e4a] text-white rounded-full text-[10px] font-black uppercase tracking-widest">
              Proprietary Tools
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-[#134e4a] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Active
            </span>
          </div>
          <h2 className="text-3xl font-black text-[#134e4a] uppercase tracking-tighter">
            IWS Finance OS
          </h2>
        </div>
      </div>

      {/* App Grid - Only show in 'view' mode */}
      {mode === 'view' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 relative z-10">
          {IWS_APPS.map((app) => (
            <motion.div
              key={app.id}
              whileHover={{ y: -5 }}
              onClick={() => setActiveApp(app.id)}
              className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center gap-3 ${
                activeApp === app.id 
                  ? 'bg-white border-[#d4af37] shadow-lg scale-105' 
                  : 'bg-white/50 border-transparent hover:bg-white'
              }`}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md transition-colors"
                style={{ backgroundColor: activeApp === app.id ? app.color : '#94a3b8' }}
              >
                {app.icon}
              </div>
              <div>
                <h3 className={`font-bold leading-none text-sm ${activeApp === app.id ? 'text-[#134e4a]' : 'text-gray-500'}`}>
                  {app.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Dynamic Content Panel */}
      <AnimatePresence mode='wait'>
        {mode === 'view' ? (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl p-6 border border-[#134e4a]/5 shadow-sm relative z-10"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="w-full">
                <h4 className="text-lg font-black text-[#134e4a] uppercase tracking-tight mb-4 flex items-center gap-2">
                  {IWS_APPS.find(a => a.id === activeApp)?.name} Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {IWS_APPS.find(a => a.id === activeApp)?.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-[#64748b] bg-gray-50 p-2 rounded-lg">
                      <CheckCircle2 size={14} className="text-[#d4af37]" />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* If Invoice App is selected, show Create Invoice button */}
              {activeApp === 'invoice' ? (
                <button 
                  onClick={() => setMode('create')}
                  className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#134e4a] text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#d4af37] hover:text-[#3E2723] transition-colors shadow-lg whitespace-nowrap"
                >
                  Create Invoice <ArrowRight size={14} />
                </button>
              ) : (
                <button 
                  className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gray-200 text-gray-500 rounded-xl font-bold text-xs uppercase tracking-wider cursor-not-allowed"
                >
                  View Only
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl p-8 border-2 border-[#134e4a] shadow-xl relative z-20"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-[#134e4a] uppercase tracking-tighter">New IWS Invoice</h3>
              <button onClick={() => setMode('view')} className="text-xs font-bold text-gray-400 hover:text-[#134e4a]">
                CANCEL
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Customer Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-bold text-[#134e4a] focus:ring-2 focus:ring-[#d4af37] outline-none"
                  value={invoiceForm.customerName}
                  onChange={e => setInvoiceForm({...invoiceForm, customerName: e.target.value})}
                  placeholder="e.g. Acme Corp"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Description</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-bold text-[#134e4a] focus:ring-2 focus:ring-[#d4af37] outline-none"
                    value={invoiceForm.itemName}
                    onChange={e => setInvoiceForm({...invoiceForm, itemName: e.target.value})}
                    placeholder="Consulting Services"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Rate (ZAR)</label>
                  <input 
                    type="number" 
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-bold text-[#134e4a] focus:ring-2 focus:ring-[#d4af37] outline-none"
                    value={invoiceForm.rate}
                    onChange={e => setInvoiceForm({...invoiceForm, rate: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-[#134e4a] text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#0f3d3a] transition-all flex items-center justify-center gap-2 mt-4"
              >
                {loading ? <Loader2 className="animate-spin" /> : <><Send size={16} /> Generate & Send Invoice</>}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 pt-4 border-t border-[#134e4a]/5 text-center flex justify-center items-center gap-2">
        <ShieldCheck size={12} className="text-[#134e4a]" />
        <p className="text-[10px] text-[#134e4a]/40 uppercase tracking-widest font-bold">
          Secure IWS Server Connection • Encrypted
        </p>
      </div>
    </div>
  );
};

export default ZohoFinanceWidget;
