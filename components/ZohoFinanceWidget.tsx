import React, { useState } from 'react';
import { 
  FileText, Calculator, Receipt, CreditCard, 
  ExternalLink, CheckCircle2, Lock, ArrowRight, Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ZOHO_APPS = [
  {
    id: 'invoice',
    name: 'Zoho Invoice',
    desc: 'Invoicing & Estimates',
    icon: <FileText size={24} />,
    color: '#134e4a',
    link: 'https://invoice.zoho.com/portal/',
    features: ['Client Portal', 'Online Payments', 'Estimates']
  },
  {
    id: 'books',
    name: 'Zoho Books',
    desc: 'Accounting & VAT',
    icon: <Calculator size={24} />,
    color: '#d4af37',
    link: 'https://books.zoho.com/portal/',
    features: ['Bank Feeds', 'Tax Compliance', 'Audit Trails']
  },
  {
    id: 'inventory',
    name: 'Zoho Inventory',
    desc: 'Stock Management',
    icon: <Package size={24} />,
    color: '#3E2723',
    link: 'https://inventory.zoho.com/portal/',
    features: ['Stock Tracking', 'Order Management', 'Warehousing']
  },
  {
    id: 'expense',
    name: 'Zoho Expense',
    desc: 'Reimbursements',
    icon: <Receipt size={24} />,
    color: '#0d9488',
    link: 'https://expense.zoho.com/portal/',
    features: ['Receipt Scanning', 'Mileage', 'Approvals']
  }
];

const ZohoFinanceWidget: React.FC = () => {
  const [activeApp, setActiveApp] = useState('invoice');

  return (
    <div className="bg-[#f0fdfa] rounded-[2.5rem] p-8 border border-[#134e4a]/10 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 relative z-10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-[#134e4a] text-white rounded-full text-[10px] font-black uppercase tracking-widest">
              Financial Core
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-[#134e4a] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              System Active
            </span>
          </div>
          <h2 className="text-3xl font-black text-[#134e4a] uppercase tracking-tighter">
            Finance OS
          </h2>
          <p className="text-[#134e4a]/60 text-sm font-bold uppercase tracking-widest mt-1">
            Integrated Finance Suite
          </p>
        </div>
        
        <button 
          onClick={() => window.open('https://invoice.zoho.com/portal/integratedwellth', '_blank')}
          className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-sm border border-[#134e4a]/10 hover:bg-[#134e4a] hover:text-white transition-all text-xs font-bold uppercase tracking-wider group"
        >
          <Lock size={14} className="text-[#d4af37]" /> 
          Client Portal Access
          <ExternalLink size={14} className="opacity-50 group-hover:opacity-100" />
        </button>
      </div>

      {/* App Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 relative z-10">
        {ZOHO_APPS.map((app) => (
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

      {/* Active App Details Panel */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={activeApp}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-white rounded-2xl p-6 border border-[#134e4a]/5 shadow-sm relative z-10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="w-full">
              <h4 className="text-lg font-black text-[#134e4a] uppercase tracking-tight mb-4 flex items-center gap-2">
                {ZOHO_APPS.find(a => a.id === activeApp)?.name} Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ZOHO_APPS.find(a => a.id === activeApp)?.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-[#64748b] bg-gray-50 p-2 rounded-lg">
                    <CheckCircle2 size={14} className="text-[#d4af37]" />
                    {feat}
                  </div>
                ))}
              </div>
            </div>
            <a 
              href={ZOHO_APPS.find(a => a.id === activeApp)?.link}
              target="_blank"
              rel="noreferrer"
              className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#3E2723] text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#d4af37] hover:text-[#3E2723] transition-colors shadow-lg whitespace-nowrap"
            >
              Launch Dashboard <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 pt-4 border-t border-[#134e4a]/5 text-center">
        <p className="text-[10px] text-[#134e4a]/40 uppercase tracking-widest font-bold">
          Secure Financial Data Protocol • End-to-End Encryption
        </p>
      </div>
    </div>
  );
};

export default ZohoFinanceWidget;
