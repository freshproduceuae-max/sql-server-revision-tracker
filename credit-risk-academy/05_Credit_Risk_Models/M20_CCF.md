# M20 — Credit Conversion Factors (CCF)

---

## 1. Business Purpose

The Credit Conversion Factor (CCF) is the bridge between an off-balance-sheet commitment and its credit equivalent exposure. Banks have two types of credit exposure:

- **On-balance-sheet:** Drawn loans, bonds held, overdrafts drawn — measured directly on the balance sheet at carrying amount.
- **Off-balance-sheet:** Undrawn revolving credit facilities, guarantees, letters of credit, standby facilities — these are commitments that may crystallise into balance-sheet exposures in the future.

The CCF converts off-balance-sheet amounts into a "credit equivalent" that can be treated the same way as an on-balance-sheet exposure for risk-weighting, large exposure, and ECL purposes:

```
Credit Equivalent Exposure = CCF × Nominal Off-Balance-Sheet Amount

Full EAD = Drawn Balance + CCF × Undrawn Committed Amount
```

**Why CCF matters:**

For a bank with a £10Bn committed corporate revolving credit portfolio, if the average utilisation is 50%, there is £5Bn drawn (on balance sheet, fully captured) and £5Bn undrawn (off balance sheet). Under a 0% CCF (old SA for cancellable facilities), the undrawn contributes zero to capital and ECL. Under a 50% CCF, it contributes £2.5Bn. Under 100%, it contributes £5Bn. The capital and provisioning impact of CCF assumptions across large portfolios is in the hundreds of millions.

**CCF also matters because:**
1. It is a direct input to EAD, the third component of ECL = PD × LGD × EAD
2. Under CRR3 (Basel III finalisation), the CCF methodology is being materially revised
3. For trade finance, incorrect CCF application has been a consistent Basel compliance issue
4. AIRB banks that estimate own CCF have significant opportunities to reduce capital versus SA but bear the model risk

---

## 2. Accounting Concepts

### Off-Balance-Sheet Disclosure Requirements

Under IFRS, off-balance-sheet commitments are disclosed in the notes to the financial statements under IAS 37 (provisions and contingencies) and the credit risk disclosures required by IFRS 7:

```
Example disclosure (Annual Report):
"Loan commitments — corporate revolving credit facilities:   £8.5Bn
 Guarantees and letters of credit:                           £1.2Bn
 Total contingent liabilities:                               £9.7Bn"
```

The CCF determines what fraction of this £9.7Bn flows through to the capital and ECL calculations. Analysts reviewing bank financial statements should look at the undrawn-to-drawn ratio and CCF assumptions to understand true economic exposure.

### When Off-Balance-Sheet Becomes On-Balance-Sheet

The accounting entry when a borrower draws on a committed revolving facility:

```
Dr  Loans and Receivables (Asset)                £10,000,000
Cr  Cash / Interbank Account                     £10,000,000
```

Simultaneously, the off-balance-sheet commitment notation is reduced. For IFRS 9 ECL:
- The 12-month ECL on the undrawn portion (Stage 1) is recognised as a liability
- When drawn, the ECL provision moves from liability to the loan loss allowance (contra-asset)

### Guarantee Accounting

When a bank issues a financial guarantee:

**At inception:** IFRS 9 (and formerly IAS 39) requires financial guarantees to be measured at fair value initially. Typically:
```
Dr  Guarantee fee receivable (asset)             £X
Cr  Financial guarantee liability (liability)    £X
```

**If guarantee is called:** The bank pays the beneficiary and recognises a financial asset (the recourse claim against the guaranteed party):
```
Dr  Recourse Claim (Asset)                       £Y
Cr  Cash (guarantor pays beneficiary)            £Y
```

The CCF of 100% for financial guarantees reflects the fact that when called, the full guarantee amount converts to a balance-sheet exposure.

---

## 3. Financial Concepts

### SA CCF Values — CRR (Pre-CRR3) vs CRR3

**Pre-CRR3 CCF Table (CRR Art. 111, still applicable until CRR3 phase-in):**

| Off-Balance-Sheet Item | Pre-CRR3 CCF |
|-----------------------|------------|
| Commitments that can be unconditionally cancelled at any time | 0% |
| Commitments with original maturity ≤ 1 year | 20% |
| Commitments with original maturity > 1 year | 50% |
| Note issuance / revolving underwriting facilities | 50% |
| Short-term self-liquidating trade LCs (import) | 20% |
| Trade finance involving physical goods | 20% |
| Performance bonds, bid bonds, warranties | 50% |
| Shipping guarantees, customs bonds | 50% |
| Financial guarantees, standby LCs (financial) | 100% |
| Acceptances (banker's acceptances) | 100% |
| Assets sold with recourse | 100% |
| Forward asset purchases | 100% |
| Partly paid shares and securities | 100% |

**CRR3 Revised CCF Table (from January 2025, EU):**

| Off-Balance-Sheet Item | CRR3 CCF |
|-----------------------|--------|
| Unconditionally cancellable commitments (all types) | **10%** |
| Commitments (original maturity ≤ 1yr, other than unconditionally cancellable) | **40%** |
| Commitments (original maturity > 1yr) | **40%** |
| Short-term self-liquidating trade LCs (import) | 20% |
| Performance and other transaction-related contingencies | 50% |
| Trade-related contingencies (e.g., documentary credits secured by underlying) | 20% |
| Shipping guarantees | 50% |
| Financial guarantees | 100% |
| Revolving underwriting facilities (RUFs)/Note issuance | 50% |
| Irrevocable standby LCs as financial guarantee substitute | 100% |
| Forward purchases of assets | 100% |

**Key changes in CRR3:**
1. Unconditionally cancellable: 0% → 10% (largest impact for retail card/overdraft banks)
2. <1yr commitments: 20% → 40% (increase for short-term committed facilities)
3. Flat 40% replaces 20%/50% split by maturity for general commitments

### Trade Finance CCFs — Detailed Breakdown

Trade finance is a specialised area where CCF is particularly important. The ICC and WTO have lobbied for low CCFs to support trade financing. The Basel Committee published a trade finance addendum.

| Trade Finance Instrument | Pre-CRR3 CCF | CRR3 CCF | Rationale |
|-------------------------|------------|--------|----------|
| Import documentary LC (short-term, self-liquidating) | 20% | 20% | Short tenor, goods as implicit collateral |
| Confirmed import LC | 20% | 20% | Self-liquidating |
| Export LC (bank to bank) | 20% | 20% | Performance-linked, self-liquidating |
| Standby LC (financial guarantee substitute) | 100% | 100% | Acts as guarantee |
| Standby LC (performance) | 50% | 50% | Conditional on non-performance |
| Bank guarantees (bid bond) | 50% | 50% | Conditional on non-performance |
| Bank guarantees (financial) | 100% | 100% | Unconditional obligation |
| Trade credit insurance | 0% | 0% | Insurance, not bank obligation |
| Factoring with recourse | 100% | 100% | Credit substitute |
| Factoring without recourse | 0% | 0% | Risk transferred |

### Guarantee CCFs — Specific Cases

| Guarantee Type | CCF | Economic Logic |
|---------------|-----|---------------|
| Financial guarantee (direct credit substitute) | 100% | Unconditional payment obligation on default |
| Performance guarantee | 50% | Conditional — counterparty must fail to perform |
| Advance payment guarantee | 50% | Conditional on non-delivery |
| Shipping guarantee | 50% | Conditional on cargo loss |
| Customs duty guarantee | 50% | Conditional on regulatory trigger |
| Warranty bonds | 50% | Conditional on defect claim |
| Intra-group guarantees (affiliates) | 100% | Same as financial guarantee |

### CCF Under IRB — Own Estimates

Under AIRB, banks may estimate CCF from internal historical data instead of using SA values. Key requirements (CRR Art. 166–168):

```
Own CCF Estimate Requirements:
1. Based on historical average CCF (FHCA method, 12-month reference period)
2. Separately estimated by product type, maturity, obligor grade
3. Minimum 7 years of historical data
4. Downturn adjustment: CCF tends to rise during economic stress as borrowers draw more
5. EAD floor: EAD ≥ current outstanding balance (CCF cannot produce EAD below drawn)
6. Basel III finalisation: EAD input floor = 50% of SA EAD for most instruments
```

**CCF Segmentation for IRB:**

| Segment | Empirical CCF Estimate |
|---------|----------------------|
| Investment grade (BBB+) revolvers | 35%–50% |
| Sub-investment grade (BB) revolvers | 55%–70% |
| Near-default (B/CCC) revolvers | 70%–90% |
| Overdrafts (retail) | 50%–80% |
| Corporate term-out facilities | 80%–100% (no real headroom) |
| Irrevocable committed lines | 60%–80% |

---

## 4. Statistical Concepts

### CCF Estimation Methods

**Fixed-Horizon Cohort Approach (FHCA) — The Standard Method**

```
CCF_i = (EAD_i - Drawn_{i,t-12m}) / Undrawn_{i,t-12m}

where t = default date, t-12m = 12 months before default
```

Average CCF per segment = simple average of individual CCF_i values.

**Variable-Horizon Cohort Approach (VHCA)**

Uses multiple reference horizons (3m, 6m, 12m, 18m before default) and averages. Produces a more stable estimate by using more data points per defaulted facility.

**Momentum Approach**

Models the drawdown path dynamically. Instead of a single 12-month reference point, the change in utilisation is modelled as a function of the changing credit quality:
```
ΔUtil_t = f(rating_t, rating_{t-1}, days_past_due_t, macro_factors)
```
More data-intensive but captures real-time deterioration dynamics better.

### Statistical Properties of CCF Estimates

CCF is bounded [0, 1+] and has a non-standard distribution:
- Large mass at 0% (obligors that drew down nothing additional before default)
- Moderate mass at 100%+ (obligors that fully drew the facility)
- Bimodal in many portfolios

Beta regression or truncated normal models are appropriate for CCF modelling. OLS regression gives unbiased point estimates but inappropriate confidence intervals given the bounded support.

### Confidence Intervals for CCF

Given sparse defaults, CCF estimates have wide confidence intervals:

```
Standard Error of Mean CCF = σ_CCF / √n

95% CI: mean_CCF ± 1.96 * (σ_CCF / √n)

With n=50 defaults and σ_CCF=0.25:
95% CI width = ±1.96 * (0.25/√50) = ±0.069 (±6.9 percentage points)
```

EBA guidance recommends using a conservative (upper bound) estimate when sample sizes are small.

### Backtesting CCF Estimates

Annual backtesting: compare the average CCF observed in the prior 12-month period against the model CCF estimate:

```
Backtest Ratio = Estimated_CCF / Observed_CCF

Acceptable range: 0.80x – 1.20x (within ±20% of observed)
Below 0.80x: model is over-optimistic (underestimates drawdown)
Above 1.20x: model is over-conservative (capital overestimate)
```

---

## 5. Regulatory Framework

### CRR Art. 111 — SA CCF (Current and CRR3)

Article 111 provides the standard CCF table for SA banks. CRR3 revises this table effective January 2025 (phase-in by January 2033 in some jurisdictions for legacy portfolios).

### CRR Art. 166 — EAD Under IRB

Art. 166(8): For commitments, EAD may be estimated using own CCF. Art. 166(10): EAD must be no less than the current outstanding balance (absolute floor).

### Basel III Finalisation — EAD Input Floors

Under the output floor mechanism, AIRB banks must calculate a "floored EAD" using SA CCF values × 72.5% floor on final RWA. The effective EAD floor for most off-balance-sheet items = 50% × SA EAD.

Example:
```
SA EAD for £100M committed revolver (£60M drawn, £40M undrawn, SA CCF=40%):
SA EAD = £60M + 40% × £40M = £76M

AIRB EAD (own CCF = 60%):
AIRB EAD = £60M + 60% × £40M = £84M

AIRB EAD is above 50% SA EAD floor (50% × £76M = £38M) — no flooring needed
in this case. The floor becomes binding only when own CCF << SA CCF.
```

### EBA Guidelines on CCF (EBA/GL/2017/16)

Section 6 covers EAD and CCF requirements in detail:
- Para 129: CCF must be estimated based on the observed relationship between EAD at default and drawn at reference date
- Para 130: The reference date is 12 months before default (or other horizon if justified)
- Para 131: Observations where undrawn = 0 must be excluded (CCF is undefined)
- Para 132: CCF estimates must cover economic downturn conditions
- Para 133: Minimum 7 years of observation data for AIRB

### Trade Finance — Basel Trade Finance Addendum

The Basel Committee acknowledges that standard CCFs overstate the risk of trade finance instruments because:
- Trade finance is short-term (60–180 days on average)
- Self-liquidating: repaid from the proceeds of the underlying trade transaction
- Well-collateralised: underlying goods, shipping documents, and receivables
- Historically very low default rates (ICC Trade Register data)

The 20% CCF for short-term self-liquidating trade LCs was retained in both CRR and CRR3 as a concession to these characteristics.

---

## 6. Data Required

| Data Element | Description | Source | Key Issues |
|-------------|------------|--------|-----------|
| INSTRUMENT_TYPE | LC / guarantee / RCF / overdraft etc. | Contract system | Must map to CCF category |
| NOMINAL_AMOUNT | Face value of the commitment | Contract system | Gross, not risk-weighted |
| ORIGINAL_MATURITY | Tenor at inception | Contract system | Determines SA CCF bucket (pre-CRR3) |
| CANCELLABILITY | Unconditional / conditional | Legal review | Determines 0%/10% bucket |
| DRAWN_BALANCE | Amount currently drawn | Core banking | For EAD = Drawn + CCF × Undrawn |
| AVAILABLE_UNDRAWN | Nominal - Drawn | Derived | After netting any restrictions |
| DEFAULT_DATE | For CCF backtesting / IRB estimation | Credit events | Per Art. 178 definition |
| DRAWN_AT_REFERENCE | Historical drawn balance at reference date | Data warehouse | Requires point-in-time history |
| TRADE_DOCUMENTATION | Invoice, bill of lading, LC terms | Trade ops system | Confirms self-liquidating status |
| OBLIGOR_GRADE | Internal rating | Rating system | For IRB CCF segmentation |

### Common Data Quality Issues

1. **No point-in-time balance history:** Many banks cannot reconstruct the drawn balance at exactly 12 months before default. They must use the closest available snapshot, which introduces measurement error.
2. **Limit changes:** If the committed limit was reduced between the reference date and default, the denominator (undrawn) changes — making CCF calculation ambiguous.
3. **Multiple facilities to same obligor:** CCF should be calculated per facility, not per obligor. Facilities to the same obligor may have different CCFs (e.g., a fully-drawn term-out RCF vs a partially-drawn general purpose revolver).

---

## 7. How Analysts Actually Work

**Step 1 — Classify every off-balance-sheet commitment.** Pull the full commitment register from the core banking system. Assign each instrument to a CCF category based on product type, cancellability, and original maturity. This classification feeds the regulatory capital and ECL engines.

**Step 2 — Compute credit equivalent exposure.** For each instrument: CEE = CCF × Nominal Undrawn. Sum across all instruments for total off-balance-sheet credit equivalent exposure. This feeds into large exposure calculations, sector concentration reports, and ECL models.

**Step 3 — For AIRB: estimate CCF from internal data.** Extract the CCF cohort dataset (defaulted revolvers, reference date drawn/undrawn, EAD at default). Calculate CCF per facility. Segment by product type, maturity, grade. Average within each segment. Apply downturn adjustment. Document and back-test.

**Step 4 — Apply Basel floors.** Check that AIRB CCF estimates produce EAD no less than 50% of SA EAD. Flag any segment where own estimate is below this floor and escalate to risk management.

**Step 5 — Regular backtesting.** Quarterly, compare the average CCF observed over the prior four quarters against the model estimate for each segment. Report to model risk governance committee. Trigger model review if backtest ratio falls outside 0.80x–1.20x range.

**Practical frustrations:**
- Cancellability determination requires legal team input — the line between "unconditionally cancellable" and "conditionally cancellable" is commercially sensitive and legally contested
- Trade finance CCF classification requires understanding of underlying trade documentation — a BA without trade finance background needs education here
- The 10% CCF on unconditionally cancellable facilities under CRR3 requires reclassifying thousands of products and updating capital systems

---

## 8. Excel Implementation

### CCF Lookup Table and Capital Calculator

```excel
Sheet: "CCF_Lookup"

Reference table: CRR3 CCF values
A: INSTRUMENT_TYPE       B: PRE_CRR3_CCF   C: CRR3_CCF
Unconditionally cancellable  0%              10%
Committed <1yr orig mat      20%             40%
Committed >=1yr orig mat     50%             40%
Import doc LC (ST/SL)        20%             20%
Performance guarantee        50%             50%
Financial guarantee          100%            100%
Standby LC (financial)       100%            100%

Sheet: "Portfolio"
Columns: A: Facility_ID | B: Instrument_Type | C: Nominal (£M) | D: Drawn (£M)
         E: Undrawn=C-D | F: CCF (VLOOKUP) | G: Credit_Equiv=F*E | H: EAD=D+G

Row 2: RCF-001 | Committed >=1yr | 50 | 30 | =C2-D2 | =VLOOKUP(B2,CCF_Lookup,3,0) | =F2*E2 | =D2+G2
Row 3: LC-001  | Import doc LC   | 10 | 0  | =C3-D3 | =VLOOKUP(B3,CCF_Lookup,3,0) | =F3*E3 | =D3+G3
Row 4: GUA-001 | Financial guar  | 25 | 0  | =C4-D4 | =VLOOKUP(B4,CCF_Lookup,3,0) | =F4*E4 | =D4+G4

Total EAD (on + off BS): =SUM(H:H)
Total off-BS credit equivalent: =SUM(G:G)
Total on-BS: =SUM(D:D)

Capital Impact (at 75% RW, 8% Tier 1 requirement):
RWA: =SUM(H:H) * 0.75
Capital: =RWA * 0.08
```

### Pre-CRR3 vs CRR3 Impact Analysis

```excel
Sheet: "CRR3_Impact"

For each instrument:
Pre-CRR3 EAD: =Drawn + VLOOKUP(Type, pre_ccf_table, 2, 0) * Undrawn
CRR3 EAD:     =Drawn + VLOOKUP(Type, crr3_ccf_table, 2, 0) * Undrawn
Delta EAD:    =CRR3_EAD - Pre_CRR3_EAD
Delta RWA:    =Delta_EAD * Risk_Weight
Delta Capital:=Delta_RWA * Capital_Ratio

Portfolio Total Delta Capital: =SUM(Delta_Capital_column)
```

### IRB CCF Estimation (Cohort Data)

```excel
Sheet: "CCF_Estimation"
Columns: Facility_ID | Drawn_at_Reference | Undrawn_at_Reference | EAD_at_Default | Raw_CCF | Capped_CCF

Raw_CCF:   =(EAD_at_Default - Drawn_at_Reference) / Undrawn_at_Reference
Capped_CCF: =IF(Undrawn_at_Reference=0, "EXCLUDE", MAX(0, MIN(1.5, Raw_CCF)))

Average CCF by grade:
IG:     =AVERAGEIF(grade_col,"IG",capped_ccf_col)
SubIG:  =AVERAGEIF(grade_col,"SubIG",capped_ccf_col)

Backtest ratio (comparing estimated vs observed last year):
=estimated_ccf / observed_ccf
Traffic light: =IF(ratio<0.8,"RED",IF(ratio>1.2,"AMBER","GREEN"))
```

---

## 9. SQL Implementation

```sql
-- ============================================================
-- M20: CCF CLASSIFICATION AND CREDIT EQUIVALENT EXPOSURE
-- ============================================================

-- Step 1: Assign CRR3 CCF to each off-balance-sheet instrument
WITH instrument_ccf AS (
    SELECT
        f.FACILITY_ID,
        f.OBLIGOR_ID,
        f.INSTRUMENT_TYPE,
        f.ORIGINAL_MATURITY_MONTHS,
        f.CANCELLABILITY,
        f.COMMITTED_AMOUNT,
        fb.DRAWN_BALANCE,
        GREATEST(0, f.COMMITTED_AMOUNT - fb.DRAWN_BALANCE)   AS undrawn,
        -- Assign Pre-CRR3 CCF
        CASE
            WHEN f.CANCELLABILITY = 'UNCONDITIONAL'                    THEN 0.00
            WHEN f.INSTRUMENT_TYPE IN ('FINANCIAL_GUARANTEE',
                 'STANDBY_LC_FINANCIAL','ACCEPTANCE','FORWARD_PURCHASE') THEN 1.00
            WHEN f.INSTRUMENT_TYPE IN ('PERFORMANCE_GUARANTEE',
                 'SHIPPING_GUARANTEE','CUSTOMS_BOND','WARRANTY_BOND')   THEN 0.50
            WHEN f.INSTRUMENT_TYPE IN ('IMPORT_LC','EXPORT_LC')
                 AND f.ORIGINAL_MATURITY_MONTHS <= 12                  THEN 0.20
            WHEN f.ORIGINAL_MATURITY_MONTHS < 12                       THEN 0.20
            ELSE 0.50
        END                                                    AS ccf_pre_crr3,
        -- Assign CRR3 CCF
        CASE
            WHEN f.CANCELLABILITY = 'UNCONDITIONAL'                    THEN 0.10
            WHEN f.INSTRUMENT_TYPE IN ('FINANCIAL_GUARANTEE',
                 'STANDBY_LC_FINANCIAL','ACCEPTANCE','FORWARD_PURCHASE') THEN 1.00
            WHEN f.INSTRUMENT_TYPE IN ('PERFORMANCE_GUARANTEE',
                 'SHIPPING_GUARANTEE','CUSTOMS_BOND','WARRANTY_BOND')   THEN 0.50
            WHEN f.INSTRUMENT_TYPE IN ('IMPORT_LC','EXPORT_LC')
                 AND f.ORIGINAL_MATURITY_MONTHS <= 12                  THEN 0.20
            ELSE 0.40  -- Flat 40% for all committed, conditional facilities
        END                                                    AS ccf_crr3
    FROM facilities f
    INNER JOIN facility_balances fb
        ON f.FACILITY_ID = fb.FACILITY_ID
       AND fb.BALANCE_DATE = CAST(GETDATE() AS DATE)
    WHERE f.FACILITY_TYPE = 'OFF_BALANCE_SHEET'
      AND f.STATUS = 'ACTIVE'
),

-- Step 2: Calculate EAD under both frameworks
ead_comparison AS (
    SELECT
        FACILITY_ID,
        OBLIGOR_ID,
        INSTRUMENT_TYPE,
        CANCELLABILITY,
        COMMITTED_AMOUNT,
        DRAWN_BALANCE,
        undrawn,
        ccf_pre_crr3,
        ccf_crr3,
        -- Pre-CRR3 EAD
        DRAWN_BALANCE + ccf_pre_crr3 * undrawn              AS ead_pre_crr3,
        -- CRR3 EAD
        DRAWN_BALANCE + ccf_crr3 * undrawn                  AS ead_crr3,
        -- Delta
        (ccf_crr3 - ccf_pre_crr3) * undrawn                AS ead_delta,
        -- RWA impact (assume 75% corporate risk weight)
        (ccf_crr3 - ccf_pre_crr3) * undrawn * 0.75         AS rwa_delta
    FROM instrument_ccf
)

SELECT
    INSTRUMENT_TYPE,
    CANCELLABILITY,
    COUNT(*)                            AS n_facilities,
    SUM(COMMITTED_AMOUNT)/1e6           AS total_committed_Mm,
    SUM(DRAWN_BALANCE)/1e6              AS total_drawn_Mm,
    SUM(undrawn)/1e6                    AS total_undrawn_Mm,
    AVG(ccf_pre_crr3) * 100            AS avg_ccf_pre_crr3_pct,
    AVG(ccf_crr3) * 100                AS avg_ccf_crr3_pct,
    SUM(ead_pre_crr3)/1e6              AS total_ead_pre_crr3_Mm,
    SUM(ead_crr3)/1e6                  AS total_ead_crr3_Mm,
    SUM(ead_delta)/1e6                 AS total_ead_increase_Mm,
    SUM(rwa_delta)/1e6                 AS total_rwa_increase_Mm,
    SUM(rwa_delta) * 0.15 / 1e6       AS tier1_capital_impact_Mm  -- 15% T1 ratio
FROM ead_comparison
GROUP BY INSTRUMENT_TYPE, CANCELLABILITY
ORDER BY SUM(rwa_delta) DESC;

-- ============================================================
-- IRB CCF ESTIMATION QUERY (from historical default data)
-- ============================================================
WITH ccf_observations AS (
    SELECT
        ce.FACILITY_ID,
        ce.DEFAULT_DATE,
        f.INSTRUMENT_TYPE,
        f.ORIGINAL_MATURITY_MONTHS,
        -- Grade at 12-month reference date
        rh.RATING_GRADE                                     AS grade_at_ref,
        -- Balances at reference date (12m before default)
        fb_ref.DRAWN_BALANCE                               AS drawn_ref,
        GREATEST(0, f.COMMITTED_AMOUNT - fb_ref.DRAWN_BALANCE) AS undrawn_ref,
        -- EAD at default
        fb_def.DRAWN_BALANCE + fb_def.ACCRUED_INTEREST     AS ead_at_default,
        -- Raw CCF
        CASE
            WHEN GREATEST(0, f.COMMITTED_AMOUNT - fb_ref.DRAWN_BALANCE) = 0
                THEN NULL  -- Exclude fully drawn at reference
            ELSE CAST(
                (fb_def.DRAWN_BALANCE + fb_def.ACCRUED_INTEREST - fb_ref.DRAWN_BALANCE)
                AS FLOAT)
                / GREATEST(0, f.COMMITTED_AMOUNT - fb_ref.DRAWN_BALANCE)
        END                                                AS raw_ccf
    FROM credit_events ce
    INNER JOIN facilities f
        ON ce.FACILITY_ID = f.FACILITY_ID
       AND f.INSTRUMENT_TYPE IN ('REVOLVING_CREDIT','OVERDRAFT')
    INNER JOIN facility_balances fb_ref
        ON ce.FACILITY_ID = fb_ref.FACILITY_ID
       AND fb_ref.BALANCE_DATE = (
           SELECT TOP 1 b.BALANCE_DATE
           FROM facility_balances b
           WHERE b.FACILITY_ID = ce.FACILITY_ID
             AND b.BALANCE_DATE <= DATEADD(MONTH, -12, ce.DEFAULT_DATE)
           ORDER BY b.BALANCE_DATE DESC
       )
    INNER JOIN facility_balances fb_def
        ON ce.FACILITY_ID = fb_def.FACILITY_ID
       AND fb_def.BALANCE_DATE = ce.DEFAULT_DATE
    LEFT JOIN ratings_history rh
        ON ce.OBLIGOR_ID = rh.OBLIGOR_ID
       AND rh.RATING_DATE = (
           SELECT TOP 1 r.RATING_DATE
           FROM ratings_history r
           WHERE r.OBLIGOR_ID = ce.OBLIGOR_ID
             AND r.RATING_DATE <= DATEADD(MONTH, -12, ce.DEFAULT_DATE)
           ORDER BY r.RATING_DATE DESC
       )
    WHERE ce.DEFAULT_DATE >= '2015-01-01'
      AND ce.EVENT_TYPE IN ('DEFAULT_90DPD','DEFAULT_UTP')
),

ccf_capped AS (
    SELECT
        *,
        -- Cap at [0, 1.5] and exclude negative
        CASE
            WHEN raw_ccf IS NULL THEN NULL
            WHEN raw_ccf < 0 THEN 0.0
            ELSE LEAST(1.50, raw_ccf)
        END AS ccf_capped
    FROM ccf_observations
    WHERE raw_ccf IS NOT NULL
),

-- Segment averages for IRB use
ccf_segments AS (
    SELECT
        INSTRUMENT_TYPE,
        grade_at_ref,
        COUNT(*)                                            AS n_obs,
        AVG(ccf_capped)                                    AS airb_ccf,
        STDEV(ccf_capped)                                  AS ccf_std,
        -- Downturn: defaults in 2008–2009 or 2020
        AVG(CASE
            WHEN DEFAULT_DATE BETWEEN '2008-01-01' AND '2009-12-31'
              OR DEFAULT_DATE BETWEEN '2020-01-01' AND '2020-09-30'
            THEN ccf_capped END)                           AS downturn_ccf,
        -- Compare to CRR3 SA CCF (40%)
        CASE WHEN AVG(ccf_capped) > 0.40
             THEN 'ABOVE_SA' ELSE 'BELOW_SA' END           AS vs_crr3_sa
    FROM ccf_capped
    GROUP BY INSTRUMENT_TYPE, grade_at_ref
    HAVING COUNT(*) >= 15
)

SELECT
    INSTRUMENT_TYPE,
    grade_at_ref,
    n_obs,
    ROUND(airb_ccf * 100, 2)        AS airb_ccf_pct,
    ROUND(ccf_std * 100, 2)         AS ccf_std_pct,
    ROUND(COALESCE(downturn_ccf, airb_ccf) * 100, 2)  AS regulatory_ccf_pct,
    vs_crr3_sa,
    -- Basel III finalisation floor check: AIRB EAD >= 50% of SA EAD
    -- For undrawn: AIRB CCF must be >= 50% * SA CCF = 50% * 40% = 20%
    CASE WHEN airb_ccf < 0.20 THEN 'FLOOR_BINDING' ELSE 'ABOVE_FLOOR' END
                                    AS floor_status
FROM ccf_segments
ORDER BY INSTRUMENT_TYPE, grade_at_ref;
```

---

## 10. Python Implementation

```python
"""
M20_CCF_Model.py
Credit Conversion Factors — Classification, Estimation, Impact Analysis
"""

import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import cross_val_predict, KFold
from sklearn.metrics import mean_absolute_error
import warnings
warnings.filterwarnings('ignore')

# ============================================================
# 1. CCF LOOKUP TABLES (PRE-CRR3 AND CRR3)
# ============================================================

# Pre-CRR3 CCF values (CRR Art. 111)
CCF_PRE_CRR3 = {
    ('UNCONDITIONAL', None): 0.00,
    ('CONDITIONAL', 'FINANCIAL_GUARANTEE'): 1.00,
    ('CONDITIONAL', 'STANDBY_LC_FINANCIAL'): 1.00,
    ('CONDITIONAL', 'ACCEPTANCE'): 1.00,
    ('CONDITIONAL', 'FORWARD_PURCHASE'): 1.00,
    ('CONDITIONAL', 'PERFORMANCE_GUARANTEE'): 0.50,
    ('CONDITIONAL', 'SHIPPING_GUARANTEE'): 0.50,
    ('CONDITIONAL', 'IMPORT_LC'): 0.20,
    ('CONDITIONAL', 'EXPORT_LC'): 0.20,
    ('CONDITIONAL', 'COMMITTED_LT1YR'): 0.20,
    ('CONDITIONAL', 'COMMITTED_GE1YR'): 0.50,
    ('CONDITIONAL', 'RUF_NIF'): 0.50,
}

# CRR3 CCF values
CCF_CRR3 = {
    ('UNCONDITIONAL', None): 0.10,
    ('CONDITIONAL', 'FINANCIAL_GUARANTEE'): 1.00,
    ('CONDITIONAL', 'STANDBY_LC_FINANCIAL'): 1.00,
    ('CONDITIONAL', 'ACCEPTANCE'): 1.00,
    ('CONDITIONAL', 'FORWARD_PURCHASE'): 1.00,
    ('CONDITIONAL', 'PERFORMANCE_GUARANTEE'): 0.50,
    ('CONDITIONAL', 'SHIPPING_GUARANTEE'): 0.50,
    ('CONDITIONAL', 'IMPORT_LC'): 0.20,
    ('CONDITIONAL', 'EXPORT_LC'): 0.20,
    ('CONDITIONAL', 'COMMITTED_LT1YR'): 0.40,   # Up from 20%
    ('CONDITIONAL', 'COMMITTED_GE1YR'): 0.40,   # Down from 50%
    ('CONDITIONAL', 'RUF_NIF'): 0.50,
}


def get_ccf(cancellability: str, instrument_type: str,
             original_maturity_months: int, regime: str = 'CRR3') -> float:
    """Look up CCF for a given instrument under specified regulatory regime."""
    table = CCF_CRR3 if regime == 'CRR3' else CCF_PRE_CRR3

    if cancellability == 'UNCONDITIONAL':
        return table.get(('UNCONDITIONAL', None), 0.10 if regime == 'CRR3' else 0.0)

    # Map generic committed facilities by maturity
    if instrument_type in ('REVOLVING_CREDIT', 'COMMITTED_LINE', 'OVERDRAFT'):
        if regime == 'CRR3':
            inst_key = 'COMMITTED_GE1YR'  # Flat 40%
        else:
            inst_key = 'COMMITTED_LT1YR' if original_maturity_months < 12 else 'COMMITTED_GE1YR'
        return table.get(('CONDITIONAL', inst_key),
                         0.40 if regime == 'CRR3' else
                         (0.20 if original_maturity_months < 12 else 0.50))

    return table.get(('CONDITIONAL', instrument_type), 0.50)


# ============================================================
# 2. PORTFOLIO IMPACT ANALYSIS: PRE-CRR3 VS CRR3
# ============================================================

np.random.seed(42)
n_facilities = 5000

# Simulate a bank's off-balance-sheet commitment portfolio
portfolio = pd.DataFrame({
    'facility_id': range(n_facilities),
    'instrument_type': np.random.choice(
        ['REVOLVING_CREDIT', 'COMMITTED_LINE', 'FINANCIAL_GUARANTEE',
         'PERFORMANCE_GUARANTEE', 'IMPORT_LC', 'OVERDRAFT'],
        size=n_facilities,
        p=[0.35, 0.20, 0.15, 0.10, 0.10, 0.10]
    ),
    'cancellability': np.random.choice(
        ['UNCONDITIONAL', 'CONDITIONAL'], size=n_facilities, p=[0.25, 0.75]
    ),
    'original_maturity_months': np.random.choice(
        [6, 12, 24, 36, 60], size=n_facilities, p=[0.10, 0.20, 0.30, 0.25, 0.15]
    ),
    'committed_amount': np.random.lognormal(mean=15, sigma=1.5, size=n_facilities),
})

# Drawn portion (average 55% utilisation)
portfolio['utilisation'] = np.random.beta(a=4, b=3, size=n_facilities).clip(0.0, 0.98)
portfolio['drawn'] = portfolio['committed_amount'] * portfolio['utilisation']
portfolio['undrawn'] = portfolio['committed_amount'] - portfolio['drawn']

# Lookup CCF and calculate EAD
portfolio['ccf_pre_crr3'] = portfolio.apply(
    lambda r: get_ccf(r['cancellability'], r['instrument_type'],
                       r['original_maturity_months'], 'PRE_CRR3'), axis=1
)
portfolio['ccf_crr3'] = portfolio.apply(
    lambda r: get_ccf(r['cancellability'], r['instrument_type'],
                       r['original_maturity_months'], 'CRR3'), axis=1
)

portfolio['ead_pre_crr3'] = portfolio['drawn'] + portfolio['ccf_pre_crr3'] * portfolio['undrawn']
portfolio['ead_crr3'] = portfolio['drawn'] + portfolio['ccf_crr3'] * portfolio['undrawn']
portfolio['ead_delta'] = portfolio['ead_crr3'] - portfolio['ead_pre_crr3']

# Risk weight (simplified: 75% for retail/SME, 100% for corporate)
portfolio['risk_weight'] = 0.75
portfolio['rwa_delta'] = portfolio['ead_delta'] * portfolio['risk_weight']
portfolio['capital_delta'] = portfolio['rwa_delta'] * 0.15  # 15% Tier 1 ratio

# Summary by instrument type
summary = portfolio.groupby(['instrument_type', 'cancellability']).agg(
    count=('facility_id', 'count'),
    total_committed_Mm=('committed_amount', lambda x: x.sum() / 1e6),
    total_undrawn_Mm=('undrawn', lambda x: x.sum() / 1e6),
    avg_ccf_pre=('ccf_pre_crr3', 'mean'),
    avg_ccf_crr3=('ccf_crr3', 'mean'),
    total_ead_delta_Mm=('ead_delta', lambda x: x.sum() / 1e6),
    total_rwa_delta_Mm=('rwa_delta', lambda x: x.sum() / 1e6),
    total_capital_delta_Mm=('capital_delta', lambda x: x.sum() / 1e6),
).round(2)

print("CRR3 Impact by Instrument Type:")
print(summary.to_string())
print(f"\nTotal Portfolio:")
print(f"  Total Committed:     £{portfolio['committed_amount'].sum()/1e9:.2f}Bn")
print(f"  Total EAD (pre):     £{portfolio['ead_pre_crr3'].sum()/1e9:.2f}Bn")
print(f"  Total EAD (CRR3):    £{portfolio['ead_crr3'].sum()/1e9:.2f}Bn")
print(f"  EAD Increase:        £{portfolio['ead_delta'].sum()/1e9:.2f}Bn")
print(f"  RWA Increase:        £{portfolio['rwa_delta'].sum()/1e9:.2f}Bn")
print(f"  Capital Impact:      £{portfolio['capital_delta'].sum()/1e6:.0f}M")

# ============================================================
# 3. CCF ESTIMATION FOR AIRB (FIXED-HORIZON COHORT)
# ============================================================

np.random.seed(123)
n_defaults = 600

# Synthetic defaulted revolving facilities
defaults = pd.DataFrame({
    'facility_id': range(n_defaults),
    'grade_at_ref': np.random.choice(['IG','BB','B','CCC'], n_defaults,
                                       p=[0.15, 0.35, 0.35, 0.15]),
    'utilisation_at_ref': np.random.beta(3, 2, n_defaults).clip(0.05, 0.95),
    'committed_limit': np.random.lognormal(15, 1.2, n_defaults),
    'product': np.random.choice(['RCF','OVERDRAFT'], n_defaults, p=[0.65, 0.35]),
    'downturn_period': np.random.binomial(1, 0.18, n_defaults),
})

defaults['drawn_at_ref'] = defaults['utilisation_at_ref'] * defaults['committed_limit']
defaults['undrawn_at_ref'] = defaults['committed_limit'] - defaults['drawn_at_ref']

# Simulate EAD at default (higher for worse grades, lower for high utilisation)
grade_ccf_true = {'IG': 0.35, 'BB': 0.55, 'B': 0.68, 'CCC': 0.82}
downturn_uplift = 0.12  # 12 pp higher CCF in downturns

true_ccf = (
    defaults['grade_at_ref'].map(grade_ccf_true)
    - 0.30 * defaults['utilisation_at_ref']  # High util → less remaining headroom
    + downturn_uplift * defaults['downturn_period']
    + np.random.normal(0, 0.15, n_defaults)
).clip(0.0, 1.5)

defaults['ead_at_default'] = defaults['drawn_at_ref'] + true_ccf * defaults['undrawn_at_ref']
defaults['raw_ccf'] = (defaults['ead_at_default'] - defaults['drawn_at_ref']) / defaults['undrawn_at_ref']
defaults['ccf_capped'] = defaults['raw_ccf'].clip(0.0, 1.5)

print("\nAIRB CCF Estimation by Grade:")
print(f"{'Grade':>6} {'N':>6} {'Avg CCF':>10} {'Downturn CCF':>14} {'Reg CCF':>10} {'CRR3 SA':>10}")
for grade in ['IG','BB','B','CCC']:
    subset = defaults[defaults['grade_at_ref'] == grade]
    avg_ccf = subset['ccf_capped'].mean()
    dt_ccf = subset[subset['downturn_period']==1]['ccf_capped'].mean()
    reg_ccf = max(avg_ccf, dt_ccf) if not np.isnan(dt_ccf) else avg_ccf
    print(f"{grade:>6} {len(subset):>6} {avg_ccf*100:>9.1f}% {dt_ccf*100:>13.1f}% "
          f"{reg_ccf*100:>9.1f}% {'40.0%':>10}")

# ============================================================
# 4. BACKTESTING CCF ESTIMATES
# ============================================================

def backtest_ccf(estimated_ccf: float, observed_ccf: float,
                  n_obs: int, confidence: float = 0.95) -> dict:
    """
    Backtest an estimated CCF against observed data.
    Returns backtest ratio, confidence interval, and traffic light.
    """
    ratio = estimated_ccf / observed_ccf if observed_ccf > 0 else np.inf
    # Standard error of observed mean
    # We don't have std here — use assumed sigma from dataset
    se = 0.20 / np.sqrt(n_obs)  # Approximate
    z = 1.96 if confidence == 0.95 else 1.645
    ci_lower = observed_ccf - z * se
    ci_upper = observed_ccf + z * se

    if ratio < 0.80:
        traffic_light = 'RED — Model underestimates drawdown'
    elif ratio > 1.20:
        traffic_light = 'AMBER — Model overestimates drawdown'
    else:
        traffic_light = 'GREEN — Within acceptable range'

    return {
        'estimated_ccf': estimated_ccf,
        'observed_ccf': observed_ccf,
        'backtest_ratio': ratio,
        'ci_lower': ci_lower,
        'ci_upper': ci_upper,
        'traffic_light': traffic_light,
        'n_obs': n_obs
    }


print("\nCCF Backtest Report:")
backtest_examples = [
    ('RCF / BB grade', 0.58, 0.61, 45),
    ('RCF / B grade', 0.72, 0.59, 32),  # Model overestimates
    ('Overdraft / IG', 0.38, 0.51, 28),  # Model underestimates
]

for segment, est, obs, n in backtest_examples:
    result = backtest_ccf(est, obs, n)
    print(f"\n  Segment: {segment}")
    print(f"    Estimated CCF: {result['estimated_ccf']*100:.1f}%")
    print(f"    Observed CCF:  {result['observed_ccf']*100:.1f}%")
    print(f"    Ratio:         {result['backtest_ratio']:.3f}x")
    print(f"    Status:        {result['traffic_light']}")

# ============================================================
# 5. TRADE FINANCE CCF CLASSIFICATION
# ============================================================

trade_finance_instruments = pd.DataFrame({
    'instrument': [
        'Import LC (sight, 90 days)',
        'Import LC (usance, 180 days)',
        'Export LC confirmation',
        'Standby LC (financial)',
        'Standby LC (performance)',
        'Bid bond (performance guarantee)',
        'Advance payment guarantee',
        'Shipping guarantee',
        'Customs duty bond',
        'Factoring with recourse',
        'Factoring without recourse',
        'Trade credit insurance',
    ],
    'classification': [
        'IMPORT_LC', 'IMPORT_LC', 'EXPORT_LC',
        'STANDBY_LC_FINANCIAL', 'PERFORMANCE_GUARANTEE',
        'PERFORMANCE_GUARANTEE', 'PERFORMANCE_GUARANTEE',
        'SHIPPING_GUARANTEE', 'PERFORMANCE_GUARANTEE',
        'FINANCIAL_GUARANTEE', 'NONE', 'NONE',
    ],
    'cancellability': ['CONDITIONAL'] * 10 + ['N/A', 'N/A'],
    'orig_maturity': [3, 6, 3, 12, 12, 6, 6, 3, 12, 12, 12, 12],
    'pre_crr3_ccf': [0.20, 0.20, 0.20, 1.00, 0.50, 0.50, 0.50, 0.50, 0.50, 1.00, 0.00, 0.00],
    'crr3_ccf': [0.20, 0.20, 0.20, 1.00, 0.50, 0.50, 0.50, 0.50, 0.50, 1.00, 0.00, 0.00],
    'change': ['None'] * 3 + ['None'] * 7 + ['None', 'None'],
})

print("\nTrade Finance CCF Classification Table:")
print(trade_finance_instruments[['instrument','pre_crr3_ccf','crr3_ccf','change']].to_string(index=False))
```

---

## 11. Interview Questions

**Q1: What does the CCF of 0% for unconditionally cancellable facilities mean, and why has CRR3 changed it to 10%?**

*Answer:* A 0% CCF meant the bank applied zero credit risk weight to undrawn unconditionally cancellable facilities — the logic being that if the bank can cancel the facility at any time without notice, there is no credit risk. CRR3 revised this to 10% for several reasons: (1) In practice, cancelling a facility instantaneously before a borrower draws is operationally difficult — there is a processing lag. (2) The bank may face legal or reputational risk from cancelling a facility of an obligor that has not yet defaulted. (3) Regulatory concerns about the original 0% being used to game capital requirements. The 10% CCF reflects a more realistic assessment of residual drawdown risk even for legally cancellable facilities.

**Q2: A bank issues a £25M standby letter of credit (SBLC) as a performance guarantee (not financial). What is the CCF and the credit equivalent exposure?**

*Answer:* Performance guarantees carry a 50% CCF under both pre-CRR3 and CRR3. The credit equivalent exposure = 50% × £25M = £12.5M. This is treated as an on-balance-sheet exposure for capital purposes — risk-weighted at the obligor's applicable risk weight. If the underlying obligor is a BB corporate at 100% risk weight: RWA = £12.5M × 100% = £12.5M. Capital = £12.5M × 8% = £1M. Compare this to a financial guarantee (100% CCF): CEE = £25M, RWA = £25M, Capital = £2M. The CCF difference halves the capital requirement.

**Q3: What is the Fixed-Horizon Cohort Approach (FHCA) for estimating CCF under AIRB?**

*Answer:* FHCA takes each defaulted revolving facility and measures (a) the drawn balance 12 months before default and (b) the EAD at actual default. CCF = (EAD_at_default - Drawn_at_reference) / Undrawn_at_reference. For example: a facility with £20M drawn at reference, £10M undrawn, and £27M EAD at default gives CCF = (£27M - £20M) / £10M = 70%. This is calculated for each defaulted facility and then averaged within segments (product type, grade). The 12-month reference period aligns with the 1-year PD horizon.

**Q4: Why might a bank's own AIRB CCF estimate for a BB-rated revolver (say 65%) differ from the SA CCF (40%)? Is this a problem?**

*Answer:* The AIRB estimate of 65% reflects the bank's actual empirical experience: BB-rated obligors approaching default drew heavily on their revolving facilities — on average drawing 65% of available headroom in the 12 months before default. The SA 40% CCF is a regulatory approximation designed to be conservative for most portfolios. For portfolios where borrowers are particularly aggressive drawers before default (e.g., leveraged finance, certain sectors), the empirical CCF will exceed the SA value. This is not a problem per se — AIRB banks use their own estimate precisely because it is more accurate. However, under Basel III finalisation, the EAD output floor means that even if AIRB EAD is higher than SA EAD (because CCF is higher), the floor is still relevant as it constrains AIRB EAD to be no less than 50% of SA EAD.

**Q5: For trade finance, why is the CCF on import documentary LCs set at 20% rather than 50%?**

*Answer:* Import documentary LCs are self-liquidating: they are created specifically to finance a single trade transaction and are repaid from the proceeds of that transaction (typically 30–180 days). The underlying goods themselves provide implicit collateral (the bank controls the shipping documents and can take delivery of goods if the applicant defaults). Historical data from the ICC Trade Register shows default rates on trade LCs are extremely low (often below 0.01%), and recoveries are high. These characteristics justify a lower CCF — the conversion from contingent to direct exposure is both less likely and more recoverable than for general corporate commitments.

---

## 12. Common Mistakes

**Mistake 1 — Applying CCF to the total committed amount instead of only the undrawn portion.**
CCF applies to the undrawn (off-balance-sheet) portion only. EAD = Drawn + CCF × Undrawn. The drawn portion is already on balance sheet at 100%. Applying CCF to the total committed amount massively overstates EAD.

**Mistake 2 — Classifying a conditional cancellation clause as unconditional.**
Some facility agreements include cancellation clauses triggered by a "material adverse change" (MAC) clause or covenant breach. These are conditional cancellation rights, not unconditional. Applying the 0%/10% CCF for unconditional cancellation is incorrect. A true unconditional cancellable facility allows the bank to cancel at any time, for any reason, without notice and without restriction. Legal review is required.

**Mistake 3 — Not updating CCF model after CRR3 implementation.**
Banks that failed to update their capital systems for CRR3 CCF changes (effective January 2025) face regulatory non-compliance. The key changes (0% → 10% for unconditionally cancellable, 20% → 40% for short-term committed) require system configuration changes, not just model changes.

**Mistake 4 — Using the same CCF for guarantees regardless of conditionality.**
Financial guarantees (unconditional payment obligations) carry 100% CCF. Performance guarantees (conditional on non-performance of a contractual obligation) carry 50% CCF. Misclassifying a financial guarantee as a performance guarantee understates EAD by 50%.

**Mistake 5 — Ignoring CCF in IFRS 9 Stage 2 lifetime ECL for revolvers.**
For a revolving credit facility in Stage 2, the lifetime ECL must be calculated using projected EAD across all future periods. Banks that use only the current drawn balance (not EAD including CCF-adjusted undrawn) significantly understate Stage 2 provisions. The undrawn portion is often larger than the drawn portion, and for deteriorating credits, the CCF is high.

**Mistake 6 — Treating all trade finance as 20% CCF.**
Only short-term (≤ 1 year), self-liquidating trade LCs qualify for 20% CCF. Other trade-related instruments may attract higher CCFs: standby LCs as financial guarantees = 100%; performance bonds = 50%. Lumping all trade finance into 20% understates capital for the non-LC instruments.

---

## 13. Case Studies

### Case Study A: Lehman Brothers — Undrawn Commitments as Tail Risk (2008)

In the months before Lehman's bankruptcy filing (September 2008), counterparties with committed credit facilities from Lehman-related entities attempted to draw on those facilities. Simultaneously, corporate borrowers with committed facilities at other banks (including those unwilling to provide liquidity to Lehman) began drawing on their backup lines as short-term funding markets seized. This simultaneous drawdown across the financial system illustrated that CCF is not an individual borrower phenomenon — it is correlated. In a systemic crisis, many borrowers increase drawings simultaneously, creating system-wide CCF realisation. This motivated Basel's decision to maintain meaningful CCFs even for unconditionally cancellable facilities.

### Case Study B: CRR3 Impact Analysis at a UK Retail Bank

A major UK bank with £15Bn in unconditionally cancellable credit card and overdraft commitments models the CRR3 impact:
- Pre-CRR3: £15Bn × 0% CCF = £0 credit equivalent
- CRR3: £15Bn × 10% CCF = £1.5Bn credit equivalent
- Retail risk weight (75%): RWA = £1.125Bn
- At 15% Tier 1 ratio: Capital impact = £169M

Additionally, £8Bn in committed corporate lines (original maturity < 1 year) changes from 20% → 40%:
- Delta EAD = (40% - 20%) × £8Bn × 50% average undrawn = £800M
- Corporate risk weight (100%): RWA delta = £800M
- Capital delta = £120M

Total incremental capital from CCF changes alone: approximately £290M — a material impact requiring early planning and capital management actions.

### Case Study C: AIRB CCF Model for a Trade Finance Portfolio

A European bank seeks AIRB approval for its trade finance portfolio. Challenges encountered:
1. Historical data shows only 12 defaults over 10 years in the trade LC portfolio — too few for statistically robust CCF estimation
2. Bank cannot separate "self-liquidating" LCs from other trade instruments in the default database — legacy data quality issue
3. Regulatory supervisor requires the bank to demonstrate that its 15% CCF estimate for trade LCs (below the 20% SA floor) is supported by data
4. Resolution: bank supplements internal data with ICC Trade Register data, uses an expert-judgment overlay of 20% CCF for trade LCs (equal to SA), and reserves the right to develop own estimates once data quality improves
5. Lesson: CCF model development requires not just statistical capability but also legal documentation, product classification, and regulatory engagement

---

## 14. Iterative Reinforcement

### Week 1 Exercises

1. Build a CCF classification spreadsheet for 15 different instrument types (include RCFs, guarantees, LCs, overdrafts, performance bonds). Classify each under both pre-CRR3 and CRR3. Calculate the EAD difference for a £100M nominal amount at 50% undrawn.

2. For a portfolio of 5 facilities (RCF £50M/£30M drawn, guarantee £20M, import LC £10M, standby LC £15M, overdraft £8M/£3M drawn), calculate total portfolio EAD under (a) pre-CRR3 SA, (b) CRR3 SA, and (c) AIRB with own CCF of 60%/80%/20%/100%/70%.

3. Implement the FHCA CCF estimation in Python using the synthetic dataset. Segment by grade. Compare your estimates to the CRR3 SA floor of 40%. Which segments are above/below?

### Week 2 Exercises

4. A bank has 100 defaulted revolving facilities. 20 were already fully drawn (0% undrawn) at the reference date. How should you handle these? Exclude them from the CCF dataset? Use CCF = 100%? What is the EBA guidance?

5. Calculate the capital impact of moving from AIRB CCF (own estimate 45%) to SA CRR3 CCF (40%) for a £5Bn revolving credit portfolio with average 60% utilisation. Is AIRB always better for capital purposes?

6. Design a CCF backtesting framework in Excel. For each segment, calculate the backtest ratio, apply the 0.8x–1.2x traffic light, and identify which segments require model review.

### Self-Test Questions

- What is the CRR3 CCF for a conditionally cancellable revolving credit facility with original maturity of 18 months? How does this differ from the pre-CRR3 CCF?
- A bank issues a standby LC as financial guarantee substitute for £30M. What is the credit equivalent exposure and the RWA (assuming 100% risk weight)?
- Under AIRB, what is the minimum data observation period for CCF estimation? What floor applies to AIRB EAD under Basel III finalisation?
- Explain why a flight-to-liquidity effect means CCF in downturns is higher than in normal periods.

---

## 15. Source Material

**Primary Regulatory Documents**
- Basel Committee on Banking Supervision, *Basel II: International Convergence of Capital Measurement and Capital Standards* (June 2006) — Annex 1: CCF tables
- Basel Committee, *Basel III: Finalising Post-Crisis Reforms* (December 2017) — Section on SA credit conversion factors
- European Parliament, *Capital Requirements Regulation (CRR), EU 575/2013* — Articles 111, 166–168 (CCF and EAD)
- European Parliament, *CRR3 (EU 2024/1623)* — Revised CCF tables (effective January 2025)
- EBA, *EBA/GL/2017/16* — Paragraphs 129–133 (CCF estimation for AIRB)
- EBA Report on Credit Conversion Factors in the Standardised Approach (EBA/Op/2016/09)

**Trade Finance Specific**
- Basel Committee, *Treatment of Trade Finance under the Basel Capital Framework* (October 2011)
- ICC Banking Commission, *ICC Trade Register Report* (annual) — historical default rates for trade finance instruments
- WTO/BCBS, *Trade Finance and the G20* (2011) — documentation of low default rates in trade LCs

**Academic Papers**
- Osborne, M., Fuertes, A.M., & Milne, A. (2012). "Capital and Profitability in Banking: Evidence from the United States and Europe." Working Paper, Bank for International Settlements
- Sufi, A. (2009). "Bank Lines of Credit in Corporate Finance." *Review of Financial Studies*, 22(3)

**Books**
- Bluhm, C., Overbeck, L., & Wagner, C. (2010). *Introduction to Credit Risk Modeling* (2nd Ed.). CRC Press — Chapter 4 (Off-balance-sheet exposures)
- Basel Committee on Banking Supervision. *An Explanatory Note on the Basel II IRB Risk Weight Functions*. BIS, 2005
