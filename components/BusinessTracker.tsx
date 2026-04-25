import React, { useState, useEffect } from 'react';
import { Building2, Plus, Trash2, Bell, ChevronDown, ChevronUp } from 'lucide-react';

interface Business {
  id: string;
  name: string;
  fyEndMonth: number;
  entityType: 'pty' | 'cc' | 'npo' | 'sole_prop';
  vatVendor: boolean;
  employer: boolean;
}

interface Deadline {
  date: Date;
  task: string;
  risk: 'Critical' | 'High' | 'Medium';
  daysUntil: number;
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const ENTITY_LABELS: Record<string, string> = {
  pty: '(Pty) Ltd',
  cc: 'Close Corporation',
  npo: 'NPO / Section 21',
  sole_prop: 'Sole Proprietor',
};

function generateDeadlines(biz: Business, today: Date): Deadline[] {
  const deadlines: Deadline[] = [];
  const yr = today.getFullYear();

  const pushDeadline = (d: Date, task: string, risk: Deadline['risk']) => {
    const daysUntil = Math.ceil((d.getTime() - today.getTime()) / 86400000);
    if (daysUntil >= 0 && daysUntil <= 365) deadlines.push({ date: d, task, risk, daysUntil });
  };

  for (let m = 0; m < 13; m++) {
    const month = (today.getMonth() + m) % 12;
    const y = yr + Math.floor((today.getMonth() + m) / 12);
    if (biz.employer) pushDeadline(new Date(y, month, 7), 'EMP201 – PAYE / SDL / UIF', 'High');
    if (biz.vatVendor && (today.getMonth() + m) % 2 === 0) pushDeadline(new Date(y, month, 25), 'VAT 201 Submission & Payment', 'High');
  }

  if (biz.employer) {
    [new Date(yr, 4, 31), new Date(yr, 10, 30), new Date(yr + 1, 4, 31)].forEach(d => {
      pushDeadline(d, 'EMP501 Bi-Annual Reconciliation', 'Critical');
    });
  }

  [yr, yr + 1].forEach(y => {
    if (biz.entityType === 'pty' || biz.entityType === 'cc') {
      pushDeadline(new Date(y, biz.fyEndMonth, 30), 'CIPC Annual Return + Beneficial Ownership', 'Critical');
    }
    pushDeadline(new Date(y, biz.fyEndMonth - 1, 28), 'Provisional Tax IRP6 – 2nd Period', 'High');
    pushDeadline(new Date(y, (biz.fyEndMonth % 12) + 5, 28), 'Provisional Tax IRP6 – 1st Period', 'High');
    if (biz.entityType !== 'sole_prop') {
      pushDeadline(new Date(y, biz.fyEndMonth + 6, 28), 'SARS Income Tax Return (ITR14)', 'Critical');
    }
  });

  return deadlines.sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 10);
}

const DEFAULT_FORM = {
  name: '',
  fyEndMonth: 2,
  entityType: 'pty' as Business['entityType'],
  vatVendor: false,
  employer: true,
};

const BusinessTracker: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>(() => {
    try { return JSON.parse(localStorage.getItem('iws_businesses') || '[]'); } catch { return []; }
  });
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [form, setForm] = useState(DEFAULT_FORM);
  const today = new Date();

  useEffect(() => {
    localStorage.setItem('iws_businesses', JSON.stringify(businesses));
  }, [businesses]);

  const addBusiness = () => {
    if (!form.name.trim()) return;
    setBusinesses(prev => [...prev, { ...form, id: Date.now().toString() }]);
    setForm(DEFAULT_FORM);
    setShowForm(false);
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-brand-900 uppercase tracking-tighter">Business Compliance Tracker</h2>
          <p className="text-brand-900/60 mt-2 text-base">Each business gets a personalised calendar. Deadlines within 30 days are flagged automatically.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-brand-900 text-white px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-brand-gold hover:text-brand-900 transition-all shrink-0"
        >
          <Plus size={16} /> Add Business
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-brand-900/10 mb-8">
          <h3 className="font-black text-xl text-brand-900 mb-6 uppercase tracking-tighter">Register Business</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-brand-900/60 mb-2">Business Name</label>
              <input
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full border border-brand-900/20 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-brand-gold"
                placeholder="e.g. Happy Hunter (Pty) Ltd"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-brand-900/60 mb-2">Financial Year End Month</label>
              <select
                value={form.fyEndMonth}
                onChange={e => setForm(p => ({ ...p, fyEndMonth: Number(e.target.value) }))}
                className="w-full border border-brand-900/20 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-brand-gold bg-white"
              >
                {MONTHS.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-brand-900/60 mb-2">Entity Type</label>
              <select
                value={form.entityType}
                onChange={e => setForm(p => ({ ...p, entityType: e.target.value as Business['entityType'] }))}
                className="w-full border border-brand-900/20 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-brand-gold bg-white"
              >
                {Object.entries(ENTITY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div className="flex gap-6 items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-bold">
                <input type="checkbox" checked={form.vatVendor} onChange={e => setForm(p => ({ ...p, vatVendor: e.target.checked }))} className="w-4 h-4 accent-brand-gold" />
                VAT Vendor
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-bold">
                <input type="checkbox" checked={form.employer} onChange={e => setForm(p => ({ ...p, employer: e.target.checked }))} className="w-4 h-4 accent-brand-gold" />
                Employer (PAYE)
              </label>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={addBusiness} className="bg-brand-gold text-brand-900 px-8 py-3 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-brand-900 hover:text-white transition-all">
              Save Business
            </button>
            <button onClick={() => setShowForm(false)} className="border border-brand-900/20 px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {businesses.length === 0 && !showForm && (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-brand-900/20">
          <Building2 size={40} className="mx-auto text-brand-900/20 mb-4" />
          <p className="text-brand-900/40 font-bold">
            No businesses added yet. Click <strong className="text-brand-900/60">Add Business</strong> to start tracking.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {businesses.map(biz => {
          const deadlines = generateDeadlines(biz, today);
          const urgent = deadlines.filter(d => d.daysUntil <= 30);
          const isOpen = expanded === biz.id;

          return (
            <div key={biz.id} className="bg-white rounded-3xl shadow-md border border-brand-900/5 overflow-hidden">
              <div
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpanded(isOpen ? null : biz.id)}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center border border-brand-900/10 flex-shrink-0">
                    <Building2 size={20} className="text-brand-900" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-black text-brand-900 text-lg truncate">{biz.name}</h3>
                    <p className="text-xs text-brand-900/50 font-bold uppercase tracking-widest">
                      {ENTITY_LABELS[biz.entityType]} · FY End: {MONTHS[biz.fyEndMonth - 1]}
                    </p>
                  </div>
                  {urgent.length > 0 && (
                    <div className="hidden sm:flex items-center gap-1 bg-red-50 border border-red-200 text-red-600 px-3 py-1 rounded-full text-xs font-black flex-shrink-0">
                      <Bell size={12} /> {urgent.length} Due in 30 Days
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button
                    onClick={e => { e.stopPropagation(); setBusinesses(p => p.filter(b => b.id !== biz.id)); }}
                    className="text-brand-900/20 hover:text-red-500 transition-colors p-2"
                  >
                    <Trash2 size={16} />
                  </button>
                  {isOpen ? <ChevronUp size={20} className="text-brand-gold" /> : <ChevronDown size={20} className="text-brand-900/30" />}
                </div>
              </div>

              {isOpen && (
                <div className="border-t border-brand-900/5 divide-y divide-brand-900/5">
                  {deadlines.map((dl, i) => (
                    <div key={i} className={`flex items-center gap-4 px-6 py-4 transition-colors ${dl.daysUntil <= 30 ? 'bg-red-50/60' : 'hover:bg-gray-50'}`}>
                      <div className="w-14 h-14 bg-white rounded-2xl flex flex-col items-center justify-center border border-brand-900/10 flex-shrink-0 shadow-sm">
                        <span className="text-[10px] font-black text-brand-900 uppercase">{MONTHS[dl.date.getMonth()]}</span>
                        <span className="text-xl font-black text-brand-900 leading-none">{dl.date.getDate()}</span>
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-bold text-brand-900 text-sm">{dl.task}</p>
                        <p className="text-xs text-brand-900/50 mt-0.5">
                          {dl.daysUntil === 0 ? 'Due TODAY' : `${dl.daysUntil} day${dl.daysUntil !== 1 ? 's' : ''} away`}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-black flex-shrink-0 ${
                        dl.daysUntil <= 7 ? 'bg-red-100 text-red-700' :
                        dl.daysUntil <= 30 ? 'bg-orange-100 text-orange-700' :
                        'bg-emerald-50 text-emerald-700'
                      }`}>
                        {dl.risk}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BusinessTracker;
