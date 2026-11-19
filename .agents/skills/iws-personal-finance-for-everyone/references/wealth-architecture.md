# IWS Personal Finance Architecture: The 4-Layer Model

The IWS (Integrated Wellth Solutions) personal finance model establishes a clear separation between primary documents, registry metadata, calculated balances, and compiled reporting outputs.

---

## 1. The Four Architectural Layers

```text
┌─────────────────────────────────────────────────────────────────┐
│ Layer 0: Entity & Holder Domain                                  │
│ - Individuals, Family Units, Operating Businesses, Trusts       │
│ - Decoupling: Personal vs. Business liability and cash flows   │
├─────────────────────────────────────────────────────────────────┤
│ Layer 1: Account & Asset Registry                               │
│ - Bank accounts, Credit facilities, Investment portfolios        │
│ - Real estate, Retirement annuities, Private off-bank equity    │
├─────────────────────────────────────────────────────────────────┤
│ Layer 2: Wealth & Tax Series                                    │
│ - Authoritative periodic ledger entries and valuations          │
│ - Tax criteria: declared vs. applicable valuations              │
├─────────────────────────────────────────────────────────────────┤
│ Layer 3: Statement & Document Vault                             │
│ - Primary source documents (PDF, CSV, OFX, e-tax forms)         │
│ - SHA-256 deduplication and content integrity proof             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Layer Definitions in Detail

### Layer 0: Entities and Holders
- **Holder Separation**: Individuals often co-mingle personal expenses with business operations. Layer 0 enforces strict logical partitioning between:
  - Personal Holder (Natural Person)
  - Family / Household Unit
  - Business Entity / Holding Vehicle
- **Inter-entity Transfers**: Shareholder loans, director drawings, and capital injections must be treated as bilateral balance sheet adjustments rather than revenue or personal income.

### Layer 1: Account Registry
- Every account has an immutable identifier, currency code, custodian/institution, and account type:
  - `liquid`: Checking, savings, money market.
  - `investment`: Listed equities, ETFs, unit trusts, retirement annuities.
  - `property`: Primary residence, rental real estate.
  - `alternative`: Private equity holdings, venture investments, angel equity.
  - `liability`: Mortgages, vehicle asset finance, revolving credit lines.

### Layer 2: Time Series & Valuation Engine
- **Point-in-Time Valuations**: Assets without daily market tickers (e.g., private companies, property) are recorded at cost or formal valuation with effective date and citation.
- **Tax Discrepancy Tracking**: Differentiates between:
  - **Accounting / Market Value**: Fair market price for net worth calculation.
  - **Statutory / Tax Value**: Book value or acquisition cost for statutory declarations.

### Layer 3: Document Vault & Provenance
- All ledger entries must cite a primary document in the vault.
- Documents are registered with:
  - `sha256`: Unique hash ensuring non-tampering.
  - `period`: Statement start date and end date.
  - `account_id`: Associated registry account.
  - `verified_closing_balance`: Total printed on the physical document.
