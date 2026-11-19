import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Wallet, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  Plus, 
  Trash2, 
  Download, 
  Layers, 
  HelpCircle,
  RefreshCw,
  PieChart
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface AssetItem {
  id: string;
  name: string;
  category: 'Liquid Cash' | 'Investments' | 'Real Estate' | 'Business Equity' | 'Retirement';
  amount: number;
  sourceDoc: string;
}

interface LiabilityItem {
  id: string;
  name: string;
  category: 'Mortgage' | 'Vehicle Finance' | 'Credit Facility' | 'Personal Loan';
  amount: number;
  monthlyPayment: number;
}

const DEFAULT_ASSETS: AssetItem[] = [
  { id: '1', name: 'Emergency Liquid Reserve', category: 'Liquid Cash', amount: 85000, sourceDoc: 'FNB_Cheque_Jan2026.pdf' },
  { id: '2', name: 'Global Equity Index ETF', category: 'Investments', amount: 320000, sourceDoc: 'EasyEquities_TaxCert_2026.pdf' },
  { id: '3', name: 'Primary Residence Equity', category: 'Real Estate', amount: 1450000, sourceDoc: 'Municipal_Valuation_2025.pdf' },
  { id: '4', name: 'Retirement Annuity (SARS s11F)', category: 'Retirement', amount: 480000, sourceDoc: 'Sanlam_RA_Statement_Q4.pdf' },
  { id: '5', name: 'Off-Bank Operating Holding', category: 'Business Equity', amount: 650000, sourceDoc: 'Signed_Valuation_Report_2025.pdf' },
];

const DEFAULT_LIABILITIES: LiabilityItem[] = [
  { id: '1', name: 'Primary Residence Home Loan', category: 'Mortgage', amount: 890000, monthlyPayment: 11200 },
  { id: '2', name: 'Vehicle Asset Finance', category: 'Vehicle Finance', amount: 145000, monthlyPayment: 4800 },
  { id: '3', name: 'Revolving Credit Facility', category: 'Credit Facility', amount: 22000, monthlyPayment: 1500 },
];

const PersonalFinancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'balance-sheet' | 'decoupling' | 'reconciliation' | 'budget'>('balance-sheet');
  const [currency, setCurrency] = useState<'ZAR' | 'USD' | 'EUR'>('ZAR');

  // Asset & Liability State
  const [assets, setAssets] = useState<AssetItem[]>(DEFAULT_ASSETS);
  const [liabilities, setLiabilities] = useState<LiabilityItem[]>(DEFAULT_LIABILITIES);

  // New Asset / Liability form inputs
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetCategory, setNewAssetCategory] = useState<AssetItem['category']>('Liquid Cash');
  const [newAssetAmount, setNewAssetAmount] = useState('');
  const [newAssetDoc, setNewAssetDoc] = useState('');

  const [newLiabName, setNewLiabName] = useState('');
  const [newLiabCategory, setNewLiabCategory] = useState<LiabilityItem['category']>('Mortgage');
  const [newLiabAmount, setNewLiabAmount] = useState('');
  const [newLiabMonthly, setNewLiabMonthly] = useState('');

  // Decoupling Checklist state
  const [decouplingItems, setDecouplingItems] = useState([
    { id: '1', label: 'Formal Director Salary: Paid consistently to personal account instead of erratic drawings.', checked: true },
    { id: '2', label: 'Separation of Accounts: No personal groceries or lifestyle costs processed on business cards.', checked: true },
    { id: '3', label: 'Written Shareholder Loan Agreements: Any capital injected into business is formally recorded with terms.', checked: false },
    { id: '4', label: 'Ring-Fenced Emergency Buffer: 6 months of personal baseline expenses held in personal name.', checked: true },
    { id: '5', label: 'Personal Guarantees Audited: Clear register of all sureties signed for business leases or debt.', checked: false },
  ]);

  // Pass 2 Parse Reconciler State
  const [reconOpening, setReconOpening] = useState('85000');
  const [reconCredits, setReconCredits] = useState('42500');
  const [reconDebits, setReconDebits] = useState('31200');
  const [reconPrintedClosing, setReconPrintedClosing] = useState('96300');

  // Budget Calculator State
  const [monthlyNetIncome, setMonthlyNetIncome] = useState('65000');

  const currSymbol = currency === 'ZAR' ? 'R' : currency === 'USD' ? '$' : '€';

  // Computed Financial Metrics
  const totalAssets = useMemo(() => assets.reduce((sum, a) => sum + a.amount, 0), [assets]);
  const totalLiabilities = useMemo(() => liabilities.reduce((sum, l) => sum + l.amount, 0), [liabilities]);
  const netWorth = totalAssets - totalLiabilities;
  const totalMonthlyDebtService = useMemo(() => liabilities.reduce((sum, l) => sum + l.monthlyPayment, 0), [liabilities]);

  const liquidAssets = useMemo(() => {
    return assets.filter(a => a.category === 'Liquid Cash').reduce((sum, a) => sum + a.amount, 0);
  }, [assets]);

  const incomeNum = parseFloat(monthlyNetIncome) || 0;
  const estimatedLivingCosts = incomeNum * 0.5;
  const liquidRunwayMonths = estimatedLivingCosts > 0 ? (liquidAssets / estimatedLivingCosts).toFixed(1) : 'N/A';

  // Reconciliation Gate Logic
  const calcClosing = (parseFloat(reconOpening) || 0) + (parseFloat(reconCredits) || 0) - (parseFloat(reconDebits) || 0);
  const printedClosingNum = parseFloat(reconPrintedClosing) || 0;
  const discrepancy = Math.abs(calcClosing - printedClosingNum);
  const isReconciled = discrepancy <= 0.01;

  // Add Asset
  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetName || !newAssetAmount) return;
    const newItem: AssetItem = {
      id: Date.now().toString(),
      name: newAssetName,
      category: newAssetCategory,
      amount: parseFloat(newAssetAmount) || 0,
      sourceDoc: newAssetDoc.trim() || 'Unverified_Manual_Entry.pdf'
    };
    setAssets([...assets, newItem]);
    setNewAssetName('');
    setNewAssetAmount('');
    setNewAssetDoc('');
  };

  // Add Liability
  const handleAddLiability = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLiabName || !newLiabAmount) return;
    const newItem: LiabilityItem = {
      id: Date.now().toString(),
      name: newLiabName,
      category: newLiabCategory,
      amount: parseFloat(newLiabAmount) || 0,
      monthlyPayment: parseFloat(newLiabMonthly) || 0
    };
    setLiabilities([...liabilities, newItem]);
    setNewLiabName('');
    setNewLiabAmount('');
    setNewLiabMonthly('');
  };

  const handleToggleDecoupling = (id: string) => {
    setDecouplingItems(decouplingItems.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const decouplingScore = Math.round(
    (decouplingItems.filter(i => i.checked).length / decouplingItems.length) * 100
  );

  // PDF Export
  const exportPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(19, 78, 74); // brand-900 (#134e4a)
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('INTEGRATED WELLTH SOLUTIONS', 14, 20);
    doc.setFontSize(11);
    doc.setTextColor(212, 175, 55); // brand-gold
    doc.text('IWS Personal Finance for Everyone — Sovereign Balance Sheet', 14, 28);
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(9);
    doc.text(`Generated: ${new Date().toLocaleDateString()} | Currency: ${currency}`, 14, 34);

    // Summary Box
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Executive Net Worth Snapshot', 14, 50);

    const summaryData = [
      ['Total Documented Assets', `${currSymbol} ${totalAssets.toLocaleString()}`],
      ['Total Liabilities & Debt', `${currSymbol} ${totalLiabilities.toLocaleString()}`],
      ['Net Sovereign Wealth', `${currSymbol} ${netWorth.toLocaleString()}`],
      ['Liquid Runway Buffer', `${liquidRunwayMonths} Months`],
      ['Decoupling Sovereignty Score', `${decouplingScore}%`]
    ];

    autoTable(doc, {
      startY: 55,
      head: [['Metric', 'Value']],
      body: summaryData,
      theme: 'grid',
      headStyles: { fillColor: [19, 78, 74], textColor: [255, 255, 255] },
      styles: { fontSize: 10 }
    });

    // Assets Table
    const lastY = (doc as any).lastAutoTable.finalY + 12;
    doc.setFontSize(12);
    doc.text('Asset Registry (Provenance-Verified)', 14, lastY);

    const assetRows = assets.map(a => [
      a.name, 
      a.category, 
      `${currSymbol} ${a.amount.toLocaleString()}`,
      a.sourceDoc
    ]);

    autoTable(doc, {
      startY: lastY + 4,
      head: [['Asset', 'Classification', 'Valuation', 'Source Citation (Vault)']],
      body: assetRows,
      theme: 'striped',
      headStyles: { fillColor: [19, 78, 74], textColor: [255, 255, 255] },
      styles: { fontSize: 9 }
    });

    // Footer
    const pageCount = (doc.internal as any).getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(140, 140, 140);
      doc.text(
        'Integrated Wellth Solutions • Financial IQ + Founder EQ • Confidential Personal Record',
        14,
        290
      );
    }

    doc.save(`IWS_Personal_Wealth_Snapshot_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="pt-20 bg-gray-50 min-h-screen text-brand-900 pb-20">
      
      {/* Hero Header */}
      <div className="bg-brand-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-brand-gold">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-gold/20 text-brand-gold px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck size={14} /> Provenance-First Wealth Architecture
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              IWS Personal Finance for Everyone
            </h1>
            <p className="mt-2 text-brand-100 max-w-2xl text-base md:text-lg">
              Decouple personal life from operational chaos. Build an auditable personal balance sheet where every number is verified by source documentation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-white/10 rounded-xl p-1 border border-white/20">
              {(['ZAR', 'USD', 'EUR'] as const).map(curr => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    currency === curr ? 'bg-brand-gold text-brand-900 shadow-sm' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            <button
              onClick={exportPDF}
              className="flex items-center gap-2 bg-brand-gold text-brand-900 hover:bg-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              <Download size={14} /> Export Roadmap PDF
            </button>
          </div>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-bold text-gray-500 tracking-wider">Net Sovereign Wealth</p>
              <h3 className={`text-2xl font-black mt-1 ${netWorth >= 0 ? 'text-brand-900' : 'text-red-600'}`}>
                {currSymbol} {netWorth.toLocaleString()}
              </h3>
            </div>
            <div className="w-12 h-12 bg-teal-50 text-teal-700 rounded-xl flex items-center justify-center">
              <Wallet size={24} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-bold text-gray-500 tracking-wider">Documented Assets</p>
              <h3 className="text-2xl font-black text-brand-900 mt-1">
                {currSymbol} {totalAssets.toLocaleString()}
              </h3>
            </div>
            <div className="w-12 h-12 bg-green-50 text-green-700 rounded-xl flex items-center justify-center">
              <TrendingUp size={24} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-bold text-gray-500 tracking-wider">Total Liabilities</p>
              <h3 className="text-2xl font-black text-red-600 mt-1">
                {currSymbol} {totalLiabilities.toLocaleString()}
              </h3>
            </div>
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-bold text-gray-500 tracking-wider">Liquid Runway Buffer</p>
              <h3 className="text-2xl font-black text-brand-900 mt-1">
                {liquidRunwayMonths} <span className="text-xs font-normal text-gray-500">Months</span>
              </h3>
            </div>
            <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex border-b border-gray-200 overflow-x-auto gap-4">
          <button
            onClick={() => setActiveTab('balance-sheet')}
            className={`pb-4 px-2 text-sm font-black uppercase tracking-wider transition-colors whitespace-nowrap flex items-center gap-2 border-b-2 ${
              activeTab === 'balance-sheet'
                ? 'border-brand-900 text-brand-900'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            <Layers size={16} /> 1. Asset & Debt Registry (L1)
          </button>

          <button
            onClick={() => setActiveTab('decoupling')}
            className={`pb-4 px-2 text-sm font-black uppercase tracking-wider transition-colors whitespace-nowrap flex items-center gap-2 border-b-2 ${
              activeTab === 'decoupling'
                ? 'border-brand-900 text-brand-900'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            <ShieldCheck size={16} /> 2. Founder Decoupling (L0)
          </button>

          <button
            onClick={() => setActiveTab('reconciliation')}
            className={`pb-4 px-2 text-sm font-black uppercase tracking-wider transition-colors whitespace-nowrap flex items-center gap-2 border-b-2 ${
              activeTab === 'reconciliation'
                ? 'border-brand-900 text-brand-900'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            <RefreshCw size={16} /> 3. Reconcile-or-Abort Gate (L2/L3)
          </button>

          <button
            onClick={() => setActiveTab('budget')}
            className={`pb-4 px-2 text-sm font-black uppercase tracking-wider transition-colors whitespace-nowrap flex items-center gap-2 border-b-2 ${
              activeTab === 'budget'
                ? 'border-brand-900 text-brand-900'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            <PieChart size={16} /> 4. 3-Tier EQ Cashflow
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* TAB 1: ASSET & LIABILITY REGISTRY */}
        {activeTab === 'balance-sheet' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              
              {/* Assets Section */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-black uppercase tracking-wide">Documented Asset Holdings</h2>
                    <p className="text-xs text-gray-500">Every asset carries a primary document citation from the vault.</p>
                  </div>
                  <span className="text-sm font-bold text-green-700 bg-green-50 px-3 py-1 rounded-lg">
                    {currSymbol} {totalAssets.toLocaleString()}
                  </span>
                </div>

                <div className="divide-y divide-gray-100">
                  {assets.map((asset) => (
                    <div key={asset.id} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-sm text-gray-900 truncate">{asset.name}</p>
                          <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">
                            {asset.category}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5 truncate">
                          <FileText size={12} /> {asset.sourceDoc}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-sm text-gray-900">
                          {currSymbol} {asset.amount.toLocaleString()}
                        </span>
                        <button
                          onClick={() => setAssets(assets.filter(a => a.id !== asset.id))}
                          className="text-gray-300 hover:text-red-500 transition-colors p-1"
                          aria-label="Remove asset"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Asset Form */}
                <form onSubmit={handleAddAsset} className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-4 gap-2">
                  <input
                    type="text"
                    placeholder="Asset Name (e.g. Unit Trust)"
                    value={newAssetName}
                    onChange={e => setNewAssetName(e.target.value)}
                    className="p-2 border border-gray-200 rounded-lg text-xs"
                    required
                  />
                  <select
                    value={newAssetCategory}
                    onChange={e => setNewAssetCategory(e.target.value as AssetItem['category'])}
                    className="p-2 border border-gray-200 rounded-lg text-xs"
                  >
                    <option value="Liquid Cash">Liquid Cash</option>
                    <option value="Investments">Investments</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Business Equity">Business Equity</option>
                    <option value="Retirement">Retirement</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Value Amount"
                    value={newAssetAmount}
                    onChange={e => setNewAssetAmount(e.target.value)}
                    className="p-2 border border-gray-200 rounded-lg text-xs"
                    required
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-1 bg-brand-900 text-white rounded-lg text-xs font-bold py-2 hover:bg-brand-gold hover:text-brand-900 transition-colors"
                  >
                    <Plus size={14} /> Add Asset
                  </button>
                </form>
              </div>

              {/* Liabilities Section */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-black uppercase tracking-wide">Liabilities & Amortizations</h2>
                    <p className="text-xs text-gray-500">Contractual obligations and monthly debt service.</p>
                  </div>
                  <span className="text-sm font-bold text-red-600 bg-red-50 px-3 py-1 rounded-lg">
                    {currSymbol} {totalLiabilities.toLocaleString()}
                  </span>
                </div>

                <div className="divide-y divide-gray-100">
                  {liabilities.map((liab) => (
                    <div key={liab.id} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-sm text-gray-900 truncate">{liab.name}</p>
                          <span className="text-[10px] bg-red-50 text-red-700 px-2 py-0.5 rounded font-medium">
                            {liab.category}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Monthly Repayment: {currSymbol} {liab.monthlyPayment.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-sm text-red-600">
                          {currSymbol} {liab.amount.toLocaleString()}
                        </span>
                        <button
                          onClick={() => setLiabilities(liabilities.filter(l => l.id !== liab.id))}
                          className="text-gray-300 hover:text-red-500 transition-colors p-1"
                          aria-label="Remove liability"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Liability Form */}
                <form onSubmit={handleAddLiability} className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-4 gap-2">
                  <input
                    type="text"
                    placeholder="Liability Name"
                    value={newLiabName}
                    onChange={e => setNewLiabName(e.target.value)}
                    className="p-2 border border-gray-200 rounded-lg text-xs"
                    required
                  />
                  <select
                    value={newLiabCategory}
                    onChange={e => setNewLiabCategory(e.target.value as LiabilityItem['category'])}
                    className="p-2 border border-gray-200 rounded-lg text-xs"
                  >
                    <option value="Mortgage">Mortgage</option>
                    <option value="Vehicle Finance">Vehicle Finance</option>
                    <option value="Credit Facility">Credit Facility</option>
                    <option value="Personal Loan">Personal Loan</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Principal Amount"
                    value={newLiabAmount}
                    onChange={e => setNewLiabAmount(e.target.value)}
                    className="p-2 border border-gray-200 rounded-lg text-xs"
                    required
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-1 bg-red-600 text-white rounded-lg text-xs font-bold py-2 hover:bg-red-700 transition-colors"
                  >
                    <Plus size={14} /> Add Debt
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="text-sm font-black uppercase tracking-wider mb-4">Capital Structure Breakdown</h3>
                
                <div className="space-y-3">
                  {assets.map((asset) => {
                    const pct = totalAssets > 0 ? Math.round((asset.amount / totalAssets) * 100) : 0;
                    return (
                      <div key={asset.id}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-gray-700">{asset.name}</span>
                          <span className="font-bold text-gray-900">{pct}%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-brand-900 h-full rounded-full" style={{ width: `${pct}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                    <span>Monthly Debt Servicing</span>
                    <span className="font-bold text-gray-900">{currSymbol} {totalMonthlyDebtService.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Debt-to-Asset Ratio</span>
                    <span className="font-bold text-gray-900">
                      {totalAssets > 0 ? ((totalLiabilities / totalAssets) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-brand-900 text-white p-6 rounded-2xl shadow-sm border border-brand-900">
                <div className="flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck size={16} /> IWS Financial IQ Guardrail
                </div>
                <h4 className="font-bold text-base mb-2">The Golden Rule of Decoupling</h4>
                <p className="text-xs text-brand-100 leading-relaxed">
                  Never secure business credit facilities using your primary residence without an independent risk ring-fence. Your personal balance sheet must remain bulletproof against operational business volatility.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FOUNDER DECOUPLING CHECKLIST */}
        {activeTab === 'decoupling' && (
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
              <div>
                <h2 className="text-xl font-black uppercase tracking-wide">Founder-Identity Decoupling Index</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Evaluate whether your personal financial life is dangerously tangled with your enterprise.
                </p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-brand-900">{decouplingScore}%</span>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Sovereignty Score</p>
              </div>
            </div>

            <div className="space-y-4">
              {decouplingItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleDecoupling(item.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    item.checked 
                      ? 'bg-teal-50/50 border-teal-200 text-teal-900' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => {}}
                    className="mt-1 h-4 w-4 text-brand-900 rounded border-gray-300 focus:ring-brand-gold"
                  />
                  <div className="flex-1">
                    <p className={`text-sm ${item.checked ? 'font-bold' : 'text-gray-700'}`}>
                      {item.label}
                    </p>
                  </div>
                  {item.checked && (
                    <CheckCircle2 size={18} className="text-teal-600 shrink-0 mt-0.5" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
              <AlertTriangle className="text-amber-700 shrink-0 mt-0.5" size={20} />
              <div className="text-xs text-amber-900 leading-relaxed">
                <strong>Why this matters:</strong> In legal & tax jurisdictions (e.g. SARS in South Africa / IRS globally), unrecorded inter-company transfers or drawings can trigger deemed dividend tax penalties, secondary tax on companies, and pierce your corporate veil in insolvency proceedings.
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RECONCILE-OR-ABORT GATE */}
        {activeTab === 'reconciliation' && (
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="mb-6">
              <h2 className="text-xl font-black uppercase tracking-wide">Pass 2 Parse Integrity Gate</h2>
              <p className="text-sm text-gray-500 mt-1">
                The core principle of Sure & IWS: mathematical proof before committing any monthly financial record.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Opening Statement Balance</label>
                  <input
                    type="number"
                    value={reconOpening}
                    onChange={e => setReconOpening(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-300 rounded-lg font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Total Verified Credits (+ Inflows)</label>
                  <input
                    type="number"
                    value={reconCredits}
                    onChange={e => setReconCredits(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-300 rounded-lg font-mono text-sm text-green-700 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Total Verified Debits (- Outflows)</label>
                  <input
                    type="number"
                    value={reconDebits}
                    onChange={e => setReconDebits(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-300 rounded-lg font-mono text-sm text-red-600 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Document Printed Closing Balance</label>
                  <input
                    type="number"
                    value={reconPrintedClosing}
                    onChange={e => setReconPrintedClosing(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-300 rounded-lg font-mono text-sm font-bold"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-500">Calculated Sum (Opening + Inflows - Outflows):</p>
                  <p className="text-lg font-mono font-black text-gray-900">{currSymbol} {calcClosing.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Variance / Difference:</p>
                  <p className={`text-lg font-mono font-black ${isReconciled ? 'text-green-600' : 'text-red-600'}`}>
                    {currSymbol} {discrepancy.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Reconciliation Status Banner */}
            <div className={`p-4 rounded-xl flex items-center gap-3 border ${
              isReconciled 
                ? 'bg-green-50 border-green-200 text-green-900' 
                : 'bg-red-50 border-red-200 text-red-900'
            }`}>
              {isReconciled ? (
                <>
                  <CheckCircle2 size={24} className="text-green-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">GATE PASSED: Parse Integrity Confirmed</h4>
                    <p className="text-xs text-green-700 mt-0.5">The statement items balance mathematically to the penny. Safe to commit to the Layer 2 wealth ledger.</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertTriangle size={24} className="text-red-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">GATE BLOCKED: Reconcile or Abort</h4>
                    <p className="text-xs text-red-700 mt-0.5">Discrepancy detected. The parsed transactions do not equal the document's closing balance. Ingestion aborted to protect data integrity.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: 3-TIER EQ CASHFLOW BUDGETING */}
        {activeTab === 'budget' && (
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black uppercase tracking-wide">3-Tier Sovereign Cashflow Allocation</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Harmonizing Financial IQ (strict budgets) with Founder EQ (mental resilience and freedom).
                </p>
              </div>
              <div className="w-full sm:w-64">
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Monthly Net Take-Home</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400 font-bold text-xs">{currSymbol}</span>
                  <input
                    type="number"
                    value={monthlyNetIncome}
                    onChange={e => setMonthlyNetIncome(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm font-bold font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              
              {/* Tier 1: Essentials */}
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-600">Tier 1: Fixed Needs</span>
                  <span className="text-xs font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded">50%</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 font-mono">
                  {currSymbol} {(incomeNum * 0.5).toLocaleString()}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Shelter, groceries, healthcare, school fees, and essential transportation. If fixed costs exceed 50%, lifestyle debt risk escalates.
                </p>
              </div>

              {/* Tier 2: Wealth & Sovereignty */}
              <div className="p-6 bg-teal-50 border border-teal-200 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-teal-800">Tier 2: Sovereignty</span>
                  <span className="text-xs font-bold bg-teal-200 text-teal-900 px-2 py-0.5 rounded">30%</span>
                </div>
                <h3 className="text-2xl font-black text-teal-900 font-mono">
                  {currSymbol} {(incomeNum * 0.3).toLocaleString()}
                </h3>
                <p className="text-xs text-teal-700 mt-2 leading-relaxed">
                  Debt acceleration, ETF index accumulation, retirement contributions, and personal emergency cash reserves.
                </p>
              </div>

              {/* Tier 3: Quality of Life */}
              <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-800">Tier 3: Lifestyle EQ</span>
                  <span className="text-xs font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">20%</span>
                </div>
                <h3 className="text-2xl font-black text-amber-900 font-mono">
                  {currSymbol} {(incomeNum * 0.2).toLocaleString()}
                </h3>
                <p className="text-xs text-amber-700 mt-2 leading-relaxed">
                  Guilt-free personal spending, dining, hobbies, and wellness. Preserves mental health without jeopardizing balance sheet longevity.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PersonalFinancePage;
