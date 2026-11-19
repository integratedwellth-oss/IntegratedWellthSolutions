---
name: iws-personal-finance-for-everyone
description: >-
  Personal wealth modeling, accounting precision, and behavioral finance system derived from
  Sure and Integrated Wellth Solutions (IWS). Use this skill when analyzing personal finances,
  tracking net worth, setting up provenance-first balance sheets, categorizing income and expenses,
  reconciling accounts with primary documents, managing tax positions, or decoupling founder/individual
  identity from business operations.
---

# IWS Personal Finance for Everyone

An auditable personal wealth, budgeting, and financial sovereignty system. It combines accounting precision (**Financial IQ**) with behavioral economics and founder psychology (**Founder EQ**), enabling individuals, families, and business owners to achieve financial clarity and independence.

---

## 🏛️ Core Principles

1. **Source vs. Compiled Artifact**: Financial dashboards, spreadsheets, and net worth reports are build outputs regenerated from clean source data—never edited manually.
2. **Never Invent a Datum (Provenance-First)**: Every figure links directly to a primary source document (bank statement, contract, tax filing) identified by its SHA-256 hash.
3. **Reconcile or Abort**: Mathematical integrity is verified before committing any data:
   $$\text{Closing Balance} = \text{Opening Balance} + \text{Inflows} - \text{Outflows}$$
4. **Decouple Personal & Business Identity**: Establish strict boundaries between personal household wealth and corporate cash flow to protect personal solvency.
5. **Closed Periods Are Immutable**: Once a monthly or annual period is closed and audited, its underlying records are locked.

---

## 📐 Architecture: The 4-Layer Hierarchy

For complete architectural details, see [Wealth Architecture](./references/wealth-architecture.md).

- **Layer 0 (Entities & Holders)**: Individuals, family trusts, holding vehicles, and operational businesses.
- **Layer 1 (Account Registry)**: Checking, high-yield savings, brokerage, retirement funds, real estate, and liabilities.
- **Layer 2 (Time Series & Tax Series)**: Authoritative point-in-time valuations, cash flows, and tax classifications.
- **Layer 3 (Document Vault)**: Canonical archive of statements, contracts, invoices, and statutory tax returns.

---

## 📋 The Monthly Personal Finance Runbook

Follow these sequential steps when conducting a monthly personal financial review:

### Step 1: Ingestion & Document Vaulting
1. Collect all monthly bank, credit card, investment, and loan statements.
2. Ingest documents into the local vault with SHA-256 hash generation and canonical naming:
   `YYYY-MM_{institution}_{account_id}_{document_type}.pdf`
3. Confirm that all required accounts have an associated statement for the period.

### Step 2: Extraction & Parse Integrity Check
1. Extract line items, opening balances, inflows, outflows, and closing balances.
2. Execute the **Pass 2 Parse Integrity Gate** (see [Reconciliation Protocols](./references/reconciliation-protocols.md)):
   Confirm that the calculated balance matches the document's printed summary within $\pm 0.01$. If it does not, halt and inspect parsing errors.

### Step 3: Categorization & Behavioral Tagging
Classify all transactions across three primary dimensions:
- **Operational Need**: Fixed living expenses (housing, utilities, groceries, insurance).
- **Growth & Wealth**: Debt reduction, investments, emergency buffer allocation.
- **Discretionary / Quality of Life**: Dining, entertainment, travel.

Tag founder / entrepreneur transactions to ensure no personal expenses were paid from business accounts without proper loan / drawing documentation.

### Step 4: Net Worth & Balance Sheet Compilation
1. Compute the updated net worth:
   $$\text{Net Worth} = \sum \text{Total Assets} - \sum \text{Total Liabilities}$$
2. Verify asset allocation percentages against target bands:
   - **Liquid Cash Reserves**: 3–6 months of basic living expenses.
   - **Long-Term Growth**: Listed equity, index ETFs, retirement assets.
   - **Alternative / Direct Assets**: Real estate, private business equity.
   - **Liabilities**: High-interest consumer debt, asset-backed mortgages.

### Step 5: Statutory & Tax Alignment
1. Identify interest earned, dividend income, and capital gains.
2. Cross-check provisional and annual tax exposure (e.g., SARS ITR12 / IRP6 requirements in South Africa).
3. Flag any missing tax certificates (IT3b, IT3c, s18A donations receipts).

---

## 🛡️ Anti-Patterns to Avoid

- **Co-mingling Funds**: Paying personal lifestyle expenses from company accounts.
- **Silent Zeroing**: Recording a missing asset value or loan balance as zero rather than marking it `PENDING` or `ESTIMATED`.
- **Manual Spreadsheet Tweaking**: Overwriting formulas or numbers in Excel without updating the primary ledger.
- **Untracked Director Loans**: Injecting capital into an enterprise without formal loan agreements and repayment terms.
