# M19 — Exposure at Default (EAD)

---

## 1. Business Purpose

Exposure at Default (EAD) is the expected amount outstanding on a credit facility at the moment of default. The Expected Loss formula:

```
ECL = PD × LGD × EAD
```

requires EAD because borrowers do not always default with the same balance that appears on today's balance sheet. This is particularly important for revolving facilities, undrawn commitments, trade finance, and off-balance-sheet items.

**Why EAD is not simply the current balance:**

For a term loan, this is approximately true — the borrower cannot draw more than the original amount. But for a £50M revolving credit facility with only £20M currently drawn, the question is: how much will be drawn at the moment of default? Empirical evidence consistently shows that distressed borrowers draw down their revolving facilities as creditworthiness deteriorates — they use available credit to fund operations when other funding sources dry up. This is the "flight to liquidity" effect. At default, the actual drawn balance tends to be significantly higher than the average utilisation over the facility's life.

**Business uses of EAD:**

1. **Regulatory capital (Basel IRB and SA):** RWA = f(PD, LGD, EAD, Maturity). EAD affects capital linearly.
2. **IFRS 9 ECL calculation:** Particularly for Stage 2/3 lifetime ECL, where the expected drawn balance must be projected month-by-month across the remaining life of the facility.
3. **Credit limit setting:** Understanding EAD helps risk managers set credit limits that reflect real economic exposure, not just current utilisation.
4. **Large exposure monitoring:** CRR Article 395 limits exposures to 25% of Tier 1 capital. The "exposure" measured is EAD.

---

## 2. Accounting Concepts

### On-Balance-Sheet vs Off-Balance-Sheet

**On-balance-sheet assets** (drawn loans, bonds): EAD = carrying amount + accrued interest. Relatively straightforward.

**Off-balance-sheet commitments** (undrawn revolvers, guarantees, letters of credit): these represent contingent liabilities. Under IFRS, they are disclosed in the notes (commitment disclosures) but not on the face of the balance sheet until drawn. However, for ECL purposes under IFRS 9, off-balance-sheet commitments are included in ECL calculations if they are within the scope of IFRS 9 (e.g., loan commitments where the bank cannot withdraw unconditionally).

**Loan Commitment Accounting (IFRS 9 para 2.1(g)):**
Loan commitments at below-market interest rate are measured at fair value. Other loan commitments (floating rate, at-market) use the ECL model.

```
Balance Sheet Entry for ECL on Undrawn Commitments:
Dr  Impairment Loss (P&L)
Cr  Provisions for Off-Balance-Sheet Commitments (Liability)
```

Note: this provision is a liability (not netted against an asset) because the underlying commitment has not yet been drawn.

### Amortised Cost and EAD

For a term loan measured at amortised cost, EAD at any future date t equals the projected outstanding balance under the amortisation schedule:

```
EAD(t) = Outstanding_Balance(0) * (1+EIR)^t - Σ[Payment_n * (1+EIR)^(t-n)]
```

For variable-rate loans, the EIR is approximated using forward rates from the yield curve.

### Revolving Credit Facility — Financial Statement Presentation

```
Balance Sheet: Cash Drawn   £30,000,000  [Asset — loans and receivables]
Notes:         Committed but Undrawn: £20,000,000  [Off-balance-sheet]
ECL Provision: Held against drawn balance (Stage 1/2/3)
               + ECL provision on undrawn (separate liability)
```

---

## 3. Financial Concepts

### EAD for Different Facility Types

**1. Term Loan (fully drawn at inception)**
```
EAD = Outstanding Balance + Accrued Interest
    = Original Drawdown * Remaining Principal Factor
```
For a £10M bullet loan, EAD = £10M (no amortisation). For an amortising loan:
```
EAD at time t = P * [(1+r)^n - (1+r)^t] / [(1+r)^n - 1]
```
where P = original principal, r = periodic rate, n = total periods, t = elapsed periods.

**2. Revolving Credit Facility (RCF)**
```
EAD = Drawn + CCF × Undrawn_Committed

For £50M RCF with £30M drawn, CCF = 75%:
EAD = £30M + 75% × £20M = £30M + £15M = £45M
```
The CCF of 75% reflects the expectation that the borrower will draw £15M of the remaining £20M before defaulting.

**3. Guarantees and Contingent Liabilities**
```
EAD = Guarantee_Amount × CCF
```
For a financial guarantee where the bank guarantees another party's debt, CCF = 100% (direct credit substitute). The full guarantee amount converts to credit exposure.

**4. Trade Finance — Documentary Letters of Credit (LC)**
```
EAD = LC_Amount × CCF
```
LCs are contingent on documentary compliance. Under Basel SA, import LCs (short-term, self-liquidating) carry CCF = 20%. Under IRB, banks estimate own CCF — typically lower given the self-liquidating nature of trade transactions.

**5. Derivatives (ISDA Master Agreement)**
For derivatives, the credit equivalent exposure is:
```
EAD_derivative = max(0, Mark-to-Market_Value) + Potential_Future_Exposure (PFE)
               = Replacement_Cost + Add-On
```
Under Basel SA-CCR (Standardised Approach for Counterparty Credit Risk):
```
EAD = α × (RC + PFE_aggregate)
where α = 1.4
RC = Replacement Cost (max(V - C, 0) for unmargined)
V = fair value of derivative portfolio
C = collateral posted
PFE = Add-On based on notional × supervisory factor × maturity factor
```

### The EAD / CCF Relationship

For off-balance-sheet items, EAD is expressed through the Credit Conversion Factor:

```
EAD = Drawn + CCF × (Limit - Drawn) = Drawn + CCF × Undrawn

Rearranging: CCF = (EAD - Drawn) / Undrawn

If EAD = £45M, Drawn = £30M, Undrawn = £20M:
CCF = (£45M - £30M) / £20M = 75%
```

CCF is what needs to be estimated (from historical data or regulator prescription). EAD is the output.

**Flight to Liquidity Effect:**
Empirical studies (Jimenez et al., 2009; Sufi, 2009) find that firms approaching distress significantly increase revolving credit drawdowns:
- On average, revolvers go from ~40% utilisation under normal conditions to 70%–85% at default
- CCF for revolvers averages 40%–80% depending on sector, obligor quality, and facility terms

### Worked Example: £50M RCF

```
Facility Details:
  Committed amount:   £50,000,000
  Current drawn:      £30,000,000
  Current undrawn:    £20,000,000
  Utilisation rate:   60%
  Obligor rating:     BB (sub-investment grade)
  Remaining tenor:    2 years

EAD Calculation (3 approaches):

1. Simple (regulatory SA, CCF = 50% for ≥1yr original maturity):
   EAD = £30M + 50% × £20M = £40M

2. IRB (CCF = 75%, estimated from historical data):
   EAD = £30M + 75% × £20M = £45M

3. IFRS 9 Lifetime (for Stage 2):
   Year 1 expected EAD: £30M + 75% × £20M = £45M
   Year 2 expected EAD: projected balance at year 2 end, accounting for expected
   repayments and further drawdowns (complex — see Python model)

Capital Implications (PD = 1.5%, LGD = 60%):
  Expected Loss (SA):  1.5% × 60% × £40M = £360,000
  Expected Loss (IRB): 1.5% × 60% × £45M = £405,000
  Difference: £45,000 — attributable to CCF assumption alone
```

### EAD for IFRS 9 Lifetime ECL

For Stage 2 and Stage 3 exposures, ECL must be calculated over the remaining life:

```
Lifetime ECL = Σ [PD(t) × LGD × EAD(t) × Discount_Factor(t)]
               t=1 to T

where:
EAD(t) = expected outstanding balance at time t
PD(t)  = conditional PD in period t (given survival to t-1)
T      = remaining contractual life (or behavioural life for revolvers)
```

For revolvers without a fixed maturity, "behavioural life" is typically estimated based on the average time the facility has been open and renewal patterns. IFRS 9 para B5.5.40 allows banks to estimate the maximum contractual period (which for revolvers may be treated as the next cancellation date or the typical renewal cycle).

---

## 4. Statistical Concepts

### CCF Estimation Methods

**Method 1: Fixed-Horizon Cohort (FHCA)**
```
CCF = [EAD_at_default - Drawn_at_reference_date] / Undrawn_at_reference_date

Using reference date 12 months before default:
CCF_i = (EAD_i - Drawn_{i,-12m}) / Undrawn_{i,-12m}
```
Average across all observations = estimated CCF. The 12-month reference horizon matches the capital model (1-year PD).

**Method 2: Variable-Horizon Cohort (VHCA)**
Similar but uses multiple reference horizons and then averages.

**Method 3: Momentum Approach**
Models the drawdown velocity — how quickly does utilisation increase as the credit deteriorates?

### EAD Distribution

Unlike PD (probability) and LGD (fraction), EAD is an amount (£). But for off-balance-sheet items, CCF is bounded [0%, 100%+]:
- CCF can exceed 100% if additional fees or interest accrued between reference date and default increase EAD above the original limit
- CCF can be negative (theoretically) if the borrower repays the revolver before defaulting — but most banks floor CCF at 0

EBA guidelines suggest CCF should not be floored at 0 but should reflect the distribution including possible zero or low conversion cases.

### Regulatory vs Economic CCF

| | Regulatory SA CCF | Economic (Empirical) CCF |
|--|------------------|-----------------------|
| Source | CRR Article 111 | Internal historical data |
| Purpose | Capital calculation (conservative) | ECL, pricing |
| Unconditionally cancellable | 10% (CRR3) / 0% (old SA) | Variable |
| Committed ≥ 1yr | 40% (CRR3) | Often 50%–75% |
| Guarantees / DCS | 100% | ~100% |

---

## 5. Regulatory Framework

### Basel SA — Credit Conversion Factors (CRR Art. 111, CRR3)

**Current CRR (pre-CRR3):**

| Instrument | SA CCF |
|-----------|--------|
| Unconditionally cancellable commitments | 0% |
| Committed facilities with original maturity < 1yr | 20% |
| Committed facilities with original maturity ≥ 1yr | 50% |
| Note issuance facilities / revolving underwriting | 50% |
| Trade finance — short-term self-liquidating | 20% |
| Direct credit substitutes (financial guarantees) | 100% |
| Forward purchases, forward deposits | 100% |

**CRR3 Revised SA CCF (from Jan 2025):**

| Instrument | CRR3 CCF |
|-----------|---------|
| Unconditionally cancellable (retail) | 10% |
| Unconditionally cancellable (corporate) | 10% |
| Committed, original maturity ≤ 1yr | 40% |
| Committed, original maturity > 1yr | 40% |
| Trade letters of credit (import) | 20% |
| Shipping guarantees | 50% |
| Direct credit substitutes | 100% |

Key CRR3 change: the 20%/50% split by maturity is replaced by a flat 40% for most commitments. Unconditionally cancellable facilities move from 0% to 10% — a significant change for retail banks with credit card portfolios and overdrafts.

### Basel IRB — Own Estimates of EAD (CRR Art. 166–168)

Under AIRB, banks estimate CCF from internal historical data:
- Minimum 7 years of observation data
- CCF estimated at transaction level (commitment amount, product type, obligor grade)
- EAD floor under CRR Art. 166(8): EAD must be no less than current drawn amount
- Under Basel III finalisation: additional EAD input floors based on SA EAD × 50% for most exposures

### IFRS 9 EAD Requirements

EBA/GL/2017/16:
- EAD must include drawn balances, accrued interest, and a proportion of undrawn commitments
- For revolvers: lifetime EAD profile should reflect expected drawdown patterns over the life of the facility
- "Reasonable and supportable" projections of future drawdowns required
- For Stage 2/3 lifetime ECL: monthly (or at minimum annual) EAD profile across remaining life

---

## 6. Data Required

| Data Element | Description | Source | Key Quality Issue |
|-------------|------------|--------|------------------|
| FACILITY_ID | Unique facility identifier | Core banking | Must link to commitment and drawn |
| LIMIT | Total committed amount | Core banking | Cancelled vs suspended limits |
| DRAWN_BALANCE | Current amount outstanding | Core banking | Include accrued interest |
| UNDRAWN_BALANCE | Limit - Drawn | Derived | Must reflect effective availability |
| DEFAULT_FLAG | 0/1 per Basel Art. 178 | Credit events DB | Consistent with PD model |
| DEFAULT_DATE | Date of default | Credit events DB | Needed for CCF reference period |
| DRAWN_AT_REFERENCE | Drawn balance at reference date (12m before default) | Historical snapshots | Requires point-in-time history |
| PRODUCT_TYPE | RCF / term / guarantee / LC / overdraft | Core banking | CCF differs by product |
| ORIGINAL_MATURITY | Original tenor of facility | Contract data | Split of <1yr vs ≥1yr |
| CANCELLABILITY | Unconditional / conditional | Legal terms | Determines CCF category |
| OBLIGOR_GRADE | Internal rating at reference date | Rating system | Allows segmentation by PD band |

---

## 7. How Analysts Actually Work

**Step 1 — Identify defaults.** Pull all defaulted facilities from the credit events database, filtered to AIRB-eligible portfolio and observation window.

**Step 2 — Calculate CCF for each defaulted facility.** Go back 12 months from each default date in the facility utilisation history. Record the drawn balance and available undrawn at that reference point. CCF = (EAD_at_default - Drawn_12m_before) / Undrawn_12m_before. Cap at [0,1] or allow slightly above 1 for cases with fees/interest.

**Step 3 — Segment.** Group CCF observations by product type (RCF, overdraft, LC, guarantee), original maturity band, and obligor rating grade at reference date. Average within segment.

**Step 4 — Apply CCF floors.** Even if historical data shows CCF = 30% for sub-investment grade revolvers, regulatory floors may apply. Under the IRB EAD floor (Basel III finalisation), EAD must be at least 50% of the SA EAD for most instruments.

**Step 5 — IFRS 9 EAD profile.** For lifetime ECL, build a monthly forward-looking EAD schedule: the drawn balance declines for term loans (amortisation), evolves according to expected drawdown patterns for revolvers. This is the most analytically complex part — revolvers have no fixed drawdown schedule.

**Practical frustrations:**
- Point-in-time historical data is often unavailable (many banks only store current positions, not historical snapshots)
- Facility renegotiations between reference date and default create ambiguity in CCF
- Overdrafts and informal lines are often excluded from CCF datasets because the "limit" is undefined
- For IFRS 9 Stage 2 revolvers, modelling behavioural life requires assumptions about renewal that business lines dispute

---

## 8. Excel Implementation

### EAD Calculation — RCF

```excel
Sheet: "EAD_Calculator"

A: Parameter          B: Value
Committed Limit:      £50,000,000
Current Drawn:        £30,000,000
Undrawn Available:    =B2-B3   →   £20,000,000
CCF (IRB estimate):   75%
CCF Source:           AIRB internal model
EAD:                  =B3 + B5*B4   →   £45,000,000
Utilisation at EAD:   =B7/B2   →   90%

Capital impact (Pillar 1):
PD:                   1.50%
LGD:                  60%
EL = PD*LGD*EAD:      =B10*B11*B7  →  £405,000
```

### Term Loan EAD Projection (Amortising)

```excel
Sheet: "Term_Loan_EAD"
Columns: Month | Outstanding | EAD(=Outstanding) | Monthly_Payment

B2: Original Balance = £10,000,000
C2: Annual Rate = 6.5%
D2: Monthly Rate = =C2/12
E2: Term (months) = 60

Monthly payment (annuity formula):
=B2 * D2 / (1 - (1+D2)^(-E2))   →  £195,661 per month

Outstanding in month t:
=B2*(1+D2)^A3 - PMT*(((1+D2)^A3-1)/D2)
(Or use Excel's built-in: =PV(D2, E2-A3, -PMT))

EAD at month t = Outstanding(t)   [for term loans, straightforward]
```

### IFRS 9 Lifetime EAD — Simple RCF Model

```excel
Sheet: "Lifetime_EAD"
Assumption: RCF utilisaton increases linearly from 60% at t=0 to 90% at default horizon

Month (A) | Expected_Util (B) | Facility_Limit (C) | EAD (D)
0         | 60%               | £50,000,000         | £30,000,000
6         | 65%               | £50,000,000         | £32,500,000
12        | 70%               | £50,000,000         | £35,000,000
18        | 75%               | £50,000,000         | £37,500,000
24        | 80%               | £50,000,000         | £40,000,000

Formula for Utilisation: =0.60 + (0.20 * A2 / 24)   [linear interpolation to 80% by month 24]
EAD: =B2 * C2

Lifetime ECL:
=SUMPRODUCT(marginal_pd_range, LGD, EAD_range, discount_factors)
```

---

## 9. SQL Implementation

```sql
-- ============================================================
-- M19: EAD / CCF ESTIMATION FROM HISTORICAL DEFAULT DATA
-- ============================================================

-- Step 1: Identify all defaulted revolving facilities
WITH defaulted_facilities AS (
    SELECT
        ce.FACILITY_ID,
        ce.OBLIGOR_ID,
        ce.DEFAULT_DATE,
        f.PRODUCT_TYPE,
        f.COMMITTED_LIMIT,
        f.ORIGINAL_MATURITY_MONTHS,
        f.CANCELLABILITY,
        -- EAD = drawn at default date + accrued interest
        fb_def.DRAWN_BALANCE + fb_def.ACCRUED_INTEREST     AS ead_at_default,
        -- Reference point: 12 months before default
        DATEADD(MONTH, -12, ce.DEFAULT_DATE)               AS reference_date
    FROM credit_events ce
    INNER JOIN facilities f
        ON ce.FACILITY_ID = f.FACILITY_ID
    INNER JOIN facility_balances fb_def
        ON ce.FACILITY_ID = fb_def.FACILITY_ID
       AND fb_def.BALANCE_DATE = ce.DEFAULT_DATE
    WHERE ce.EVENT_TYPE IN ('DEFAULT_90DPD','DEFAULT_UTP')
      AND f.PRODUCT_TYPE IN ('REVOLVING_CREDIT','OVERDRAFT','COMMITTED_LINE')
      AND ce.DEFAULT_DATE >= '2012-01-01'
),

-- Step 2: Get balances at 12-month reference date
reference_balances AS (
    SELECT
        df.FACILITY_ID,
        df.DEFAULT_DATE,
        df.ead_at_default,
        df.COMMITTED_LIMIT,
        df.PRODUCT_TYPE,
        df.ORIGINAL_MATURITY_MONTHS,
        df.CANCELLABILITY,
        fb_ref.DRAWN_BALANCE                               AS drawn_at_reference,
        fb_ref.AVAILABLE_UNDRAWN                           AS undrawn_at_reference,
        -- CCF calculation (% of undrawn that converted to EAD)
        CASE
            WHEN fb_ref.AVAILABLE_UNDRAWN = 0 THEN NULL  -- Already fully drawn; CCF undefined
            ELSE (df.ead_at_default - fb_ref.DRAWN_BALANCE)
                 / NULLIF(fb_ref.AVAILABLE_UNDRAWN, 0)
        END                                                AS raw_ccf,
        -- Utilisation at reference date
        CAST(fb_ref.DRAWN_BALANCE AS FLOAT)
            / NULLIF(df.COMMITTED_LIMIT, 0)               AS utilisation_at_ref,
        -- Obligor rating at reference date
        rh.RATING_GRADE                                    AS grade_at_reference
    FROM defaulted_facilities df
    LEFT JOIN facility_balances fb_ref
        ON df.FACILITY_ID = fb_ref.FACILITY_ID
       AND fb_ref.BALANCE_DATE = (
           -- Closest available snapshot to the reference date
           SELECT TOP 1 fb2.BALANCE_DATE
           FROM facility_balances fb2
           WHERE fb2.FACILITY_ID = df.FACILITY_ID
             AND fb2.BALANCE_DATE <= df.reference_date
           ORDER BY fb2.BALANCE_DATE DESC
       )
    LEFT JOIN ratings_history rh
        ON df.OBLIGOR_ID = rh.OBLIGOR_ID
       AND rh.RATING_DATE <= df.reference_date
       AND rh.RATING_DATE > DATEADD(MONTH, -3, df.reference_date)
),

-- Step 3: Apply CCF floor and cap, then segment
ccf_capped AS (
    SELECT
        FACILITY_ID,
        DEFAULT_DATE,
        PRODUCT_TYPE,
        ORIGINAL_MATURITY_MONTHS,
        CANCELLABILITY,
        grade_at_reference,
        ead_at_default,
        drawn_at_reference,
        undrawn_at_reference,
        utilisation_at_ref,
        -- Floor at 0, allow up to 150% (fees/interest can exceed original undrawn)
        GREATEST(0.0, LEAST(1.50, raw_ccf))               AS ccf,
        CASE
            WHEN raw_ccf IS NULL THEN 'EXCLUDED_FULLY_DRAWN'
            WHEN raw_ccf < 0 THEN 'EXCLUDED_NEGATIVE_CCF'
            ELSE 'INCLUDED'
        END                                                AS inclusion_flag
    FROM reference_balances
),

-- Step 4: CCF averages by segment
ccf_segments AS (
    SELECT
        PRODUCT_TYPE,
        CASE
            WHEN ORIGINAL_MATURITY_MONTHS < 12 THEN 'LESS_THAN_1YR'
            ELSE '1YR_OR_MORE'
        END                                                AS maturity_band,
        grade_at_reference,
        COUNT(*)                                           AS n_observations,
        AVG(ccf)                                           AS avg_ccf,
        STDEV(ccf)                                         AS std_ccf,
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY ccf)  AS median_ccf,
        AVG(utilisation_at_ref)                            AS avg_util_at_ref
    FROM ccf_capped
    WHERE inclusion_flag = 'INCLUDED'
    GROUP BY
        PRODUCT_TYPE,
        CASE WHEN ORIGINAL_MATURITY_MONTHS < 12 THEN 'LESS_THAN_1YR' ELSE '1YR_OR_MORE' END,
        grade_at_reference
    HAVING COUNT(*) >= 20  -- Minimum observations for reliable estimate
)

SELECT
    PRODUCT_TYPE,
    maturity_band,
    grade_at_reference,
    n_observations,
    ROUND(avg_ccf * 100, 2)         AS avg_ccf_pct,
    ROUND(std_ccf * 100, 2)         AS std_ccf_pct,
    ROUND(median_ccf * 100, 2)      AS median_ccf_pct,
    ROUND(avg_util_at_ref * 100, 2) AS avg_util_at_ref_pct,
    -- Regulatory SA CCF (CRR3) for comparison
    CASE maturity_band
        WHEN 'LESS_THAN_1YR' THEN 40.0
        ELSE 40.0
    END                             AS sa_ccf_crr3_pct,
    -- Flag if internal estimate is below regulatory floor
    CASE
        WHEN avg_ccf < 0.40 THEN 'BELOW_SA_FLOOR'
        ELSE 'ABOVE_SA'
    END                             AS vs_sa_flag
FROM ccf_segments
ORDER BY PRODUCT_TYPE, maturity_band, grade_at_reference;

-- ============================================================
-- IFRS 9: LIFETIME EAD PROFILE FOR STAGE 2 RCFs
-- ============================================================
WITH facility_params AS (
    SELECT
        f.FACILITY_ID,
        f.COMMITTED_LIMIT,
        fb.DRAWN_BALANCE                                     AS current_drawn,
        f.COMMITTED_LIMIT - fb.DRAWN_BALANCE                AS current_undrawn,
        CAST(fb.DRAWN_BALANCE AS FLOAT)
            / NULLIF(f.COMMITTED_LIMIT, 0)                  AS current_util,
        f.REMAINING_MONTHS_TO_MATURITY,
        s.STAGE
    FROM facilities f
    INNER JOIN facility_balances fb
        ON f.FACILITY_ID = fb.FACILITY_ID
       AND fb.BALANCE_DATE = CAST(GETDATE() AS DATE)
    INNER JOIN staging_assignments s
        ON f.FACILITY_ID = s.FACILITY_ID
    WHERE f.PRODUCT_TYPE = 'REVOLVING_CREDIT'
      AND s.STAGE = 2
),

-- Generate monthly EAD projection using linear drawdown model
-- (assumes utilisation increases linearly to 80% expected at default)
month_series AS (
    SELECT 0 AS month_num UNION ALL
    SELECT month_num + 1 FROM month_series WHERE month_num < 60
),

lifetime_ead AS (
    SELECT
        fp.FACILITY_ID,
        ms.month_num,
        fp.COMMITTED_LIMIT,
        -- Expected utilisation: blend from current to 80% at maturity
        fp.current_util + (0.80 - fp.current_util)
            * CAST(ms.month_num AS FLOAT)
            / NULLIF(fp.REMAINING_MONTHS_TO_MATURITY, 0)    AS expected_util,
        -- EAD = expected utilisation * committed limit
        fp.COMMITTED_LIMIT
            * (fp.current_util + (0.80 - fp.current_util)
               * CAST(ms.month_num AS FLOAT)
               / NULLIF(fp.REMAINING_MONTHS_TO_MATURITY, 0)) AS ead_t
    FROM facility_params fp
    CROSS JOIN month_series ms
    WHERE ms.month_num <= fp.REMAINING_MONTHS_TO_MATURITY
)

SELECT
    FACILITY_ID,
    month_num,
    ROUND(expected_util * 100, 2)   AS expected_util_pct,
    ROUND(ead_t, 0)                 AS ead_amount
FROM lifetime_ead
ORDER BY FACILITY_ID, month_num
OPTION (MAXRECURSION 60);
```

---

## 10. Python Implementation

```python
"""
M19_EAD_Model.py
Exposure at Default — CCF Estimation, EAD Calculation, IFRS 9 Lifetime EAD
"""

import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import KFold, cross_val_score
from sklearn.metrics import mean_absolute_error
import warnings
warnings.filterwarnings('ignore')

# ============================================================
# 1. EAD CALCULATION FUNCTIONS
# ============================================================

def ead_term_loan(original_balance: float, annual_rate: float,
                   term_months: int, elapsed_months: int,
                   bullet: bool = False) -> float:
    """Outstanding balance of a term loan at elapsed_months."""
    if bullet:
        return original_balance  # Bullet loan: full balance until maturity
    monthly_rate = annual_rate / 12
    if monthly_rate == 0:
        return original_balance * (1 - elapsed_months / term_months)
    pmt = original_balance * monthly_rate / (1 - (1 + monthly_rate) ** (-term_months))
    balance = (original_balance * (1 + monthly_rate) ** elapsed_months
               - pmt * ((1 + monthly_rate) ** elapsed_months - 1) / monthly_rate)
    return max(0.0, balance)


def ead_revolving(drawn: float, limit: float, ccf: float,
                   cap_at_limit: bool = True) -> float:
    """EAD for a revolving credit facility."""
    undrawn = max(0.0, limit - drawn)
    ead = drawn + ccf * undrawn
    if cap_at_limit:
        ead = min(ead, limit)
    return ead


def ead_derivative_sa_ccr(mtm_value: float, collateral: float,
                            notional: float, supervisory_factor: float,
                            maturity_years: float, alpha: float = 1.4) -> float:
    """
    EAD under Basel SA-CCR for a simple interest rate derivative.
    supervisory_factor: 0.005 (IR < 1yr), 0.02 (IR 1-5yr), 0.05 (IR >5yr)
    """
    # Replacement Cost (floor at 0 for unmargined)
    rc = max(0.0, mtm_value - collateral)
    # Maturity Factor
    mf = min(1.0, np.sqrt(maturity_years / 1.0))
    # Add-On (potential future exposure)
    pfe = notional * supervisory_factor * mf
    # EAD
    ead = alpha * (rc + pfe)
    return ead


# Examples
print("EAD Calculations:")
print(f"  Term loan (5yr, 6.5%, at month 24):  "
      f"£{ead_term_loan(10_000_000, 0.065, 60, 24):,.0f}")
print(f"  Revolving (£30M drawn, £50M limit, CCF=75%): "
      f"£{ead_revolving(30_000_000, 50_000_000, 0.75):,.0f}")
print(f"  IR Swap (£100M notional, 3yr, MTM=£500K, no coll): "
      f"£{ead_derivative_sa_ccr(500_000, 0, 100_000_000, 0.02, 3.0):,.0f}")

# ============================================================
# 2. CCF ESTIMATION FROM SYNTHETIC DEFAULT DATA
# ============================================================

np.random.seed(42)
n = 800  # 800 defaulted revolving facilities

# Simulate variables at 12-month reference date
data = pd.DataFrame({
    'utilisation_ref': np.random.beta(a=3, b=2, size=n).clip(0.05, 0.95),
    'committed_limit': np.random.choice(
        [1e6, 5e6, 10e6, 25e6, 50e6, 100e6], size=n,
        p=[0.20, 0.25, 0.25, 0.15, 0.10, 0.05]
    ),
    'original_maturity_months': np.random.choice([6, 12, 24, 36, 60], size=n,
                                                   p=[0.10, 0.20, 0.30, 0.25, 0.15]),
    'grade_at_ref': np.random.choice(['BBB','BB','B','CCC'], size=n,
                                       p=[0.20, 0.35, 0.30, 0.15]),
    'cyclical_industry': np.random.binomial(1, 0.35, size=n),
    'product_type': np.random.choice(['RCF','OVERDRAFT','COMMITTED_LINE'], size=n,
                                       p=[0.50, 0.30, 0.20]),
})

# Grade mapping for numerical use
grade_num = {'BBB': 0, 'BB': 1, 'B': 2, 'CCC': 3}
data['grade_num'] = data['grade_at_ref'].map(grade_num)

# True CCF model: higher grade_num (worse credit) → higher CCF (more drawdown)
# Higher utilisation at ref → lower remaining headroom → lower additional draw possible
log_ccf_true = (
    -0.5                              # Intercept
    + 0.30 * data['grade_num']        # Worse grade → higher CCF
    - 0.80 * data['utilisation_ref']  # Already drawn → less to draw
    + 0.15 * data['cyclical_industry']# Cyclical sectors draw more
    + np.random.normal(0, 0.25, n)    # Noise
)
# Map to [0,1] via sigmoid
data['ccf'] = (1 / (1 + np.exp(-log_ccf_true))).clip(0.0, 1.0)
data['undrawn_ref'] = data['committed_limit'] * (1 - data['utilisation_ref'])

print(f"\nCCF Dataset: {n} defaulted revolvers")
print(f"Average CCF: {data['ccf'].mean()*100:.1f}%")
print(f"CCF by Grade:")
print(data.groupby('grade_at_ref')['ccf'].agg(['mean','std','count'])
      .applymap(lambda x: f"{x:.3f}").to_string())

# ============================================================
# 3. CCF REGRESSION MODEL
# ============================================================

features_ccf = ['utilisation_ref', 'grade_num', 'cyclical_industry',
                  'original_maturity_months']

X = data[features_ccf]
y = data['ccf']

rf_model = RandomForestRegressor(
    n_estimators=200,
    max_depth=6,
    min_samples_leaf=15,
    random_state=42
)

kf = KFold(n_splits=5, shuffle=True, random_state=42)
oof_ccf = np.zeros(n)

for fold, (tr, val) in enumerate(kf.split(X)):
    rf_model.fit(X.iloc[tr], y.iloc[tr])
    oof_ccf[val] = rf_model.predict(X.iloc[val]).clip(0.0, 1.0)

print(f"\nCCF Model OOF MAE: {mean_absolute_error(y, oof_ccf)*100:.2f}%")

# ============================================================
# 4. IFRS 9 LIFETIME EAD FOR A REVOLVING FACILITY (STAGE 2)
# ============================================================

def lifetime_ead_profile(drawn_current: float,
                          limit: float,
                          remaining_months: int,
                          target_utilisation: float = 0.80,
                          ccf_per_month: float = 0.03) -> pd.DataFrame:
    """
    Project monthly EAD profile for an RCF in Stage 2.

    Assumption: utilisation increases gradually from current level to
    target_utilisation by the end of remaining life (linear interpolation).

    Parameters:
    -----------
    drawn_current     : Current drawn amount (£)
    limit             : Committed limit (£)
    remaining_months  : Remaining life of the facility (months)
    target_utilisation: Expected utilisation at default horizon
    ccf_per_month     : Monthly incremental CCF (additional draw per month)

    Returns:
    --------
    DataFrame with month, expected_drawn, ead
    """
    current_util = drawn_current / limit

    months = list(range(remaining_months + 1))
    expected_util = [
        min(current_util + (target_utilisation - current_util) * t / remaining_months, 1.0)
        for t in months
    ]
    expected_drawn = [u * limit for u in expected_util]
    ead = [min(d, limit) for d in expected_drawn]

    return pd.DataFrame({
        'month': months,
        'expected_utilisation': expected_util,
        'expected_drawn': expected_drawn,
        'ead': ead
    })


# Example: £50M RCF, £30M drawn (60% util), 24 months remaining, Stage 2
ead_profile = lifetime_ead_profile(
    drawn_current=30_000_000,
    limit=50_000_000,
    remaining_months=24,
    target_utilisation=0.85
)

print("\nIFRS 9 Lifetime EAD Profile (£50M RCF, £30M drawn, 24 months):")
print(f"{'Month':>6} {'Util%':>8} {'Drawn (£M)':>12} {'EAD (£M)':>12}")
for _, row in ead_profile[ead_profile['month'].isin([0,3,6,12,18,24])].iterrows():
    print(f"{int(row.month):>6} {row.expected_utilisation*100:>7.1f}% "
          f"{row.expected_drawn/1e6:>11.2f}  {row.ead/1e6:>11.2f}")

# ============================================================
# 5. LIFETIME ECL CALCULATION USING EAD PROFILE
# ============================================================

def lifetime_ecl_revolving(ead_profile: pd.DataFrame,
                             marginal_pd_monthly: float,
                             lgd: float,
                             eir: float) -> dict:
    """
    Calculate lifetime ECL for a revolving facility under IFRS 9.

    Parameters:
    -----------
    ead_profile         : DataFrame from lifetime_ead_profile()
    marginal_pd_monthly : Monthly conditional PD (given survival)
    lgd                 : LGD (assumed constant — simplification)
    eir                 : Annual EIR for discounting
    """
    monthly_eir = (1 + eir) ** (1/12) - 1
    survival = 1.0
    total_ecl = 0.0
    ecl_by_month = []

    for _, row in ead_profile.iterrows():
        t = row['month']
        if t == 0:
            ecl_by_month.append({'month': t, 'ecl': 0, 'cumulative_ecl': 0})
            continue
        # Conditional default probability in month t
        pd_t = marginal_pd_monthly
        # ECL contribution from month t
        discount = 1 / (1 + monthly_eir) ** t
        ecl_t = survival * pd_t * lgd * row['ead'] * discount
        total_ecl += ecl_t
        survival *= (1 - pd_t)  # Update survival probability
        ecl_by_month.append({'month': t, 'ecl': ecl_t, 'cumulative_ecl': total_ecl})

    return {
        'lifetime_ecl': total_ecl,
        'detail': pd.DataFrame(ecl_by_month)
    }


# Annual PD = 3.5% for a BB-rated obligor in Stage 2
# Monthly conditional PD ≈ 1 - (1 - 0.035)^(1/12)
monthly_pd = 1 - (1 - 0.035) ** (1/12)

ecl_result = lifetime_ecl_revolving(
    ead_profile=ead_profile,
    marginal_pd_monthly=monthly_pd,
    lgd=0.60,
    eir=0.065
)

print(f"\nLifetime ECL (Stage 2 RCF):")
print(f"  Annual PD (BB):       3.50%")
print(f"  LGD:                 60.00%")
print(f"  EIR:                  6.50%")
print(f"  Lifetime ECL:        £{ecl_result['lifetime_ecl']:,.0f}")
print(f"  As % of limit:        {ecl_result['lifetime_ecl']/50_000_000*100:.2f}%")

# ============================================================
# 6. SA-CCR: DERIVATIVES EAD EXAMPLES
# ============================================================

derivatives = [
    ("IR Swap, £50M, 2yr, MTM +£200K",  200_000, 0, 50_000_000, 0.02, 2.0),
    ("IR Swap, £50M, 7yr, MTM +£500K",  500_000, 0, 50_000_000, 0.05, 7.0),
    ("FX Forward, £10M, 6m, MTM -£50K", -50_000, 0, 10_000_000, 0.04, 0.5),
    ("CDS, £25M, 5yr, MTM +£100K",       100_000, 0, 25_000_000, 0.10, 5.0),
]

print("\nSA-CCR Derivative EAD Examples:")
print(f"{'Instrument':50s} {'RC (£)':>12} {'PFE (£)':>12} {'EAD (£)':>12}")
for desc, mtm, coll, notional, sf, mat in derivatives:
    rc = max(0, mtm - coll)
    mf = min(1.0, np.sqrt(mat))
    pfe = notional * sf * mf
    ead = 1.4 * (rc + pfe)
    print(f"{desc:50s} {rc:>12,.0f} {pfe:>12,.0f} {ead:>12,.0f}")
```

---

## 11. Interview Questions

**Q1: Why is EAD not simply the current outstanding balance for revolving facilities?**

*Answer:* The "flight to liquidity" effect means distressed borrowers systematically draw more heavily on revolving lines as their creditworthiness deteriorates. They lose access to capital markets, supplier credit tightens, and the committed bank revolving facility becomes the lender of last resort. Empirical studies show average revolving utilisation at default is 70%–85%, versus typical ongoing utilisation of 40%–60%. The Credit Conversion Factor (CCF) captures this incremental drawdown: CCF × Undrawn is the additional credit exposure the bank expects to crystallise. Ignoring CCF dramatically understates EAD for revolvers.

**Q2: Walk through the EAD calculation for a £50M RCF with £30M drawn, using a CCF of 75%.**

*Answer:* Undrawn = £50M - £30M = £20M. EAD = £30M drawn + 75% × £20M undrawn = £30M + £15M = £45M. The CCF of 75% means that of the £20M available headroom, the bank expects the borrower to draw £15M before defaulting. Total EAD = £45M, representing 90% of the committed limit. For the ECL calculation: ECL = PD × LGD × EAD = 1.5% × 60% × £45M = £405,000.

**Q3: What are the CRR3 CCF values for committed corporate facilities, and how do they differ from the previous CRR rules?**

*Answer:* Under CRR3 (effective January 2025 in the EU), committed facilities attract a 40% CCF regardless of original maturity. This replaces the old CRR framework of 20% (< 1 year original maturity) and 50% (≥ 1 year). Crucially, unconditionally cancellable commitments that previously carried 0% CCF now attract 10% CCF under CRR3. This is a significant change for retail and SME banks with large portfolios of overdrafts and credit cards classified as unconditionally cancellable — their EAD (and therefore capital requirements) increases meaningfully.

**Q4: How does IFRS 9 Stage 2 lifetime ECL differ from Stage 1 12-month ECL in terms of EAD?**

*Answer:* Stage 1 uses a 12-month ECL: EAD is the current balance plus CCF × undrawn, with ECL calculated over a one-year horizon. Stage 2 uses lifetime ECL over the remaining contractual (or behavioural) life of the facility. For a revolving credit facility, EAD must be projected forward across every period of the remaining life — it is not a single point estimate. For a term loan, EAD declines with amortisation. For a revolver, EAD may actually increase over time if the borrower is expected to draw more as conditions deteriorate. This projection makes Stage 2 ECL for revolvers materially more complex than Stage 1.

**Q5: A bank has an unconditionally cancellable overdraft facility. Under old CRR rules it used CCF = 0%. Under CRR3 it must use 10%. Why is 0% wrong from an economic perspective?**

*Answer:* Even if a bank has the legal right to cancel a facility unconditionally, the practical ability to exercise that right in time to avoid loss is limited. A borrower approaching default may overdraw the account and default before the bank processes the cancellation. Operationally, cancellation requires board or credit committee approval, system processing, and notice to the obligor — time during which further drawdown is possible. The 10% CCF in CRR3 acknowledges this practical limitation while remaining conservative relative to the actual drawdown rates observed empirically for this product type.

---

## 12. Common Mistakes

**Mistake 1 — Using EAD = current drawn for revolvers.**
This is the most common EAD error. For a £50M RCF with £20M drawn, the correct EAD (at 75% CCF) is £42.5M. Using £20M understates EAD by more than half. Always apply CCF to undrawn on committed revolving facilities.

**Mistake 2 — Applying 0% CCF to cancellable facilities in CRR3 regime.**
Under CRR3, unconditionally cancellable facilities now carry 10% CCF. Banks that have not updated their systems to reflect CRR3 will understate EAD on this product type. This is a common compliance gap in the first year of CRR3 implementation.

**Mistake 3 — Using original maturity CCF bucket vs. remaining maturity.**
Basel SA CCF is based on original maturity (< 1yr vs ≥ 1yr), not remaining maturity. A 5-year revolving facility with 6 months remaining still falls in the ≥ 1yr bucket under old CRR rules. Under CRR3 this distinction is removed (flat 40%), but the principle of using original maturity in the old framework is frequently misapplied.

**Mistake 4 — Double-counting EAD for partially drawn guarantee.**
If a bank issues a £10M financial guarantee of which £6M has been called (the guaranteed party has defaulted), the on-balance-sheet claim is £6M (asset) and the remaining £4M guarantee exposure is off-balance-sheet. Do not apply 100% CCF to the full £10M — only to the residual off-balance-sheet £4M.

**Mistake 5 — Ignoring IFRS 9 behavioural life for revolvers.**
IFRS 9 requires ECL to be calculated over the "maximum contractual period." For revolvers this is often rolling (e.g., annual renewal). Treating all revolvers as having a 1-year life dramatically understates Stage 2 lifetime ECL. Banks must either use the next contractual cancellation date or estimate behavioural life based on historical renewal patterns.

**Mistake 6 — Not including accrued interest in EAD.**
EAD at default should include all amounts owed at default date: principal + accrued and unpaid interest + fees. Excluding accrued interest (often 1–3 months of interest on a revolving facility) understates EAD and the corresponding ECL.

---

## 13. Case Studies

### Case Study A: Carillion (2018) — Revolving Facility Drawdown

In the months before Carillion's administration (January 2018), the company drew heavily on its revolving credit facilities. Banks providing committed facilities saw their drawn exposure increase sharply as Carillion used available liquidity to fund ongoing contracts. At the point of administration, several banks had near-fully-drawn revolvers where 6 months earlier the utilisation was 50%–60%. This real-world case perfectly illustrates the flight-to-liquidity effect and why CCF estimates matter. Banks with 50% CCF assumptions had adequate EAD (and therefore ECL) estimates; those who had not projected drawdown adequately were surprised by the EAD at default.

### Case Study B: CRR3 CCF Changes — Impact on UK Bank RWA

A large UK retail bank has £20Bn of unconditionally cancellable credit card commitments (available but undrawn credit limits). Under old CRR, CCF = 0% → EAD contribution from undrawn = £0. Under CRR3, CCF = 10% → EAD contribution = £2Bn. At a Standardised 75% risk weight for retail and assuming 8% Tier 1 ratio requirement, incremental RWA = £2Bn × 75% = £1.5Bn. Capital impact = £1.5Bn × 8% = £120M additional Tier 1 capital required. This demonstrates the tangible balance sheet impact of a CCF regulatory change.

### Case Study C: IFRS 9 Implementation — Stage 2 RCF EAD Modelling

During IFRS 9 implementation (2017–2018), a European bank identified that 15% of its corporate revolving credit portfolio was in Stage 2. For each Stage 2 RCF, a lifetime EAD profile needed to be modelled. Approach: (1) Current utilisation as starting point; (2) Estimated utilisation trajectory using the bank's empirical CCF model (higher for worse-rated credits); (3) Remaining contractual life used as the maximum horizon; (4) Monthly EAD projected forward; (5) Each monthly EAD combined with marginal PD and LGD and discounted at EIR. The lifetime ECL on these Stage 2 revolvers was 3.5× the 12-month ECL — highlighting that using Stage 1 methodology for Stage 2 exposures would have materially understated provisions.

---

## 14. Iterative Reinforcement

### Week 1 Exercises

1. Build the EAD calculator in Excel for a revolving credit facility portfolio of 10 facilities with varying drawn amounts and CCF assumptions (use 40%, 60%, 75%, 100%). Calculate total portfolio EAD under SA (40% CCF for ≥1yr) and IRB (own CCF). Which facilities show the greatest difference?

2. Implement the `lifetime_ead_profile` Python function. Change the target_utilisation to 0.95 (very high drawdown) and 0.65 (moderate drawdown). Calculate the lifetime ECL difference. How sensitive is lifetime ECL to this assumption?

3. Construct the SQL CCF estimation query on a toy dataset of 100 hypothetical defaulted revolvers (create in a temp table with random values for utilisation, limit, and CCF). Verify that facilities with 0% undrawn at reference date are correctly excluded.

### Week 2 Exercises

4. Model the CRR3 impact on your firm: if the portfolio has £5Bn in unconditionally cancellable commitments, what is the RWA impact of moving from 0% to 10% CCF? Assume Standardised Approach, corporate risk weights.

5. Extend the Python lifetime ECL model to incorporate three IFRS 9 scenarios (base: 75% util, downside: 90% util, upside: 65% util) with weights (55%, 30%, 15%). How does the probability-weighted lifetime ECL compare to the base scenario ECL?

### Self-Test Questions

- For a £100M committed revolving credit facility currently 40% drawn, what is EAD under (a) SA 40% CCF and (b) IRB 70% CCF? What is the difference in expected loss if PD = 2% and LGD = 55%?
- Why is behavioural life important for IFRS 9 Stage 2 revolving facilities? What happens if you use a 1-year horizon for a revolving facility that typically renews for 5+ years?
- Explain why CCF can exceed 100%. Under what circumstances does this happen and how should it be treated?
- What does the SA-CCR formula for derivative EAD capture that the old Current Exposure Method (CEM) did not?

---

## 15. Source Material

**Primary Regulatory Documents**
- BCBS, *The Standardised Approach for Measuring Counterparty Credit Risk Exposures (SA-CCR)* (April 2014)
- BCBS, *Basel III: Finalising Post-Crisis Reforms* (December 2017) — Section 4 (CCF for off-balance-sheet items)
- European Parliament, *Capital Requirements Regulation (CRR3)* — Articles 111–113 (CCF under SA), Article 166 (EAD under IRB)
- EBA, *EBA/GL/2017/16* — Section 6 (EAD estimation under AIRB)
- IASB, *IFRS 9 Financial Instruments* — Paragraphs B5.5.39–B5.5.42 (EAD for revolving facilities)

**Academic Papers**
- Jimenez, G., Lopez, J.A., & Saurina, J. (2009). "Empirical Analysis of Corporate Credit Lines." *Review of Financial Studies*, 22(12), 5069–5098
- Sufi, A. (2009). "Bank Lines of Credit in Corporate Finance: An Empirical Analysis." *Review of Financial Studies*, 22(3), 1057–1088
- Jacobs, M. (2010). "An Empirical Study of Exposure at Default." *Journal of Advanced Studies in Finance*, 1(1), 31–59
- Bag, P., & Jacobs, M. (2012). "Exposure at Default of Unsettled Foreign Exchange Trades." *Journal of Financial Transformation*, 33, 121–133

**Industry Publications**
- Basel Committee Working Paper No. 14 — Studies on the Validation of Internal Rating Systems
- EBA Report on the Credit Conversion Factors (CCF) (2016)
- Federal Reserve Bank of New York Staff Reports — various on revolving credit usage

**Books**
- McNeil, A., Frey, R., & Embrechts, P. (2015). *Quantitative Risk Management*. Princeton University Press — Chapter 7 (credit risk measurement)
- Gordy, M. (2003). "A Risk-Factor Model Foundation for Ratings-Based Bank Capital Rules." *Journal of Financial Intermediation*, 12(3), 199–232
