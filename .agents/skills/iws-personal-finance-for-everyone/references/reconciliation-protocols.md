# IWS Reconciliation & Parse Integrity Protocols

A personal finance model is only as reliable as its reconciliation gates. IWS adopts the "Reconcile-or-Abort" invariant.

---

## 1. The Three Verification Passes

```text
[Input Document]
       │
       ▼
[Pass 1: Schema & Format Validation] ──(Fail)──► ABORT: Malformed File
       │
      (Pass)
       ▼
[Pass 2: Parse Integrity Check] ─────(Fail)──► ABORT: Internal Discrepancy
  (Sum of items == Document Printed Total)
       │
      (Pass)
       ▼
[Pass 3: Ledger Agreement Gate] ──────(Fail)──► RECONCILIATION EXCEPTION
  (Opening + Inflows - Outflows == Closing)
```

---

## 2. Invariants & Rules

### Pass 1: Schema Validation
- Validates field types, ISO-8601 dates (`YYYY-MM-DD`), numeric precision (standard 2 decimal places for currency), and valid currency codes (e.g., `ZAR`, `USD`, `EUR`, `GBP`).

### Pass 2: Parse Integrity Check (Document-Level)
- Every parsed sub-item must aggregate to the document's printed summary:
  $$\text{Closing Balance} = \text{Opening Balance} + \sum \text{Credits} - \sum \text{Debits}$$
- If the calculated total differs by more than $0.01$, the parse is flagged as corrupt or incomplete and **must not** be committed to Layer 2.

### Pass 3: Ledger Agreement Gate (Account-Level)
- The opening balance of month $T$ must strictly equal the closing balance of month $T-1$.
- Any gap indicates missing transactions or an undeclared transfer fee/adjustment.

---

## 3. Handling Gaps and Ambiguities

- **No Silent Zeroing**: Never set missing balances or transactions to `0.00`.
- **Explicit Flags**:
  - `ESTIMATED`: Value derived from linear interpolation or historical averages until official statements arrive.
  - `PENDING`: Awaiting custodian or bank statement delivery.
  - `AMBIGUOUS`: Counterparty unclear; requires human confirmation before tax categorization.
