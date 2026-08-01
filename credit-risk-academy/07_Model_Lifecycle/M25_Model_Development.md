# M25 — Model Development

> End-to-end construction of a credit risk model in a regulated banking environment. Covers the full lifecycle from problem definition to model approval, with an emphasis on IRB (Internal Ratings-Based) PD, LGD, and EAD models.

---

## 1. Business Purpose

Credit risk models are the quantitative backbone of a bank's risk management framework. They serve multiple, sometimes competing, purposes simultaneously:

**Regulatory Capital Calculation (Basel III / CRR2)**
Under the Advanced IRB approach, banks use their own estimates of PD (Probability of Default), LGD (Loss Given Default), and EAD (Exposure at Default) to calculate Risk-Weighted Assets (RWA). The formula for corporate exposures is:

```
K = LGD × N[(1-R)^(-0.5) × G(PD) + (R/(1-R))^0.5 × G(0.999)] − PD × LGD
RWA = K × 12.5 × EAD
```

Where R (asset correlation) is prescribed by Basel, and N/G are the standard normal CDF and its inverse. A better model — one that assigns lower PD to genuinely low-risk obligors — reduces RWA and therefore capital requirements, releasing capital for lending.

**IFRS 9 Expected Credit Loss (ECL)**
Models feed directly into ECL = PD × LGD × EAD, applied across three stages:
- Stage 1: 12-month ECL for performing exposures
- Stage 2: Lifetime ECL where credit risk has increased significantly (SICR)
- Stage 3: Lifetime ECL for credit-impaired assets

IFRS 9 models require point-in-time (PIT) PD estimates, while IRB models often use through-the-cycle (TTC) PDs — a distinction that drives significant model architecture choices.

**Loan Origination and Pricing**
Credit scorecards and rating models determine whether a borrower receives credit and at what price. Risk-adjusted pricing uses: `Spread ≥ EL / (1 − EL) + CoC × RWA%`, where CoC is the cost of capital.

**Portfolio Risk Management**
Internal ratings drive Watch List management, portfolio concentration limits, and economic capital allocation. A corporate rated BB internally may warrant different covenant structuring than a BBB.

**Business Purpose Statement (Required for Model Documentation)**
Every model must have an explicit purpose statement that defines:
1. The intended use (regulatory capital / IFRS 9 / pricing / portfolio management)
2. The population in scope (e.g., "UK domiciled corporate obligors with turnover > £5m")
3. The performance metric being modelled (default within 12 months per Basel definition)
4. The granularity of output (risk grade or continuous score)
5. What the model explicitly does NOT cover (exclusions: financial institutions, sovereigns, project finance)

This matters because model performance is always relative to its stated purpose. A model built for TTC capital purposes is not appropriate for PIT ECL staging without adjustment.

---

## 2. Accounting Concepts

**Default Definition (Critical for Dataset Construction)**
Under IFRS 9 and CRR Article 178, default is triggered by:
- Unlikeliness to pay (UTP): material credit-obligated amounts unlikely to be repaid without collateral enforcement
- Past due: obligor is more than 90 days past due on a material credit obligation (180 days for retail mortgages in some jurisdictions)

Banks must maintain a consistent default definition across regulatory, accounting, and internal reporting. Inconsistency between IFRS 9 and IRB default definitions triggers regulatory scrutiny.

**Loan Classification**
- Performing: No evidence of credit deterioration
- Watch / Special Mention: Early signs of stress, monitored closely
- Non-Performing (NPA): Past due > 90 days or UTP triggered
- Written-off: Carrying amount reduced to zero; may still be pursued for recovery

**Fair Value vs. Amortised Cost**
Corporate loans are typically carried at amortised cost (not fair value), meaning credit losses are recognised only when incurred (IAS 39) or expected (IFRS 9). Model outputs determine the magnitude and timing of P&L impact through ECL provisions.

**Provision Coverage Ratio**
`Coverage = Total ECL Provisions / Total NPL Gross Carrying Amount`

A model that systematically underestimates LGD will result in insufficient coverage — a key focus of regulatory inspection.

**Effective Interest Rate (EIR)**
Under IFRS 9, ECL must be discounted to present value using the EIR of the instrument. This means LGD models must produce estimates of the time-to-recovery distribution, not just expected recovery rates.

---

## 3. Financial Concepts

**Through-the-Cycle vs. Point-in-Time PD**
- TTC PD: Long-run average default rate; stable through economic cycles; used for IRB regulatory capital
- PIT PD: Current-conditions-adjusted estimate; moves with the credit cycle; used for IFRS 9 ECL, pricing, risk appetite

Converting between them requires understanding the systematic factor loading (asset correlation R). Higher R means the gap between PIT and TTC widens in stress.

**Information Value (IV) and Weight of Evidence (WoE)**
These are the primary tools for variable selection in scorecard development:

```
WoE_i = ln(Distribution_Events_i / Distribution_Non-Events_i)
IV = Σ (Distribution_Events_i − Distribution_Non-Events_i) × WoE_i
```

IV interpretation:
- IV < 0.02: Useless predictor
- 0.02 – 0.10: Weak predictor
- 0.10 – 0.30: Medium predictor
- 0.30 – 0.50: Strong predictor
- IV > 0.50: Suspiciously strong (check for data leakage)

**Gini Coefficient (Accuracy Ratio)**
The Gini coefficient measures rank-ordering power. For a model with AUC:
`Gini = 2 × AUC − 1`

Typical targets by portfolio type:
- Corporate large: Gini > 0.50
- SME: Gini > 0.55
- Retail: Gini > 0.65

**Capital Sensitivity to Model Inputs**
Differentiating the Basel IRB formula analytically:
- dRWA/dPD is approximately 12.5 × LGD × (sensitivity factor from the normal distribution transformation)
- A 10 bps increase in PD for a BB-rated corporate pool typically increases RWA by 8–15%
- This makes model calibration a direct P&L issue, not just a technical concern

**Expected Loss (EL) Components**
`EL = PD × LGD × EAD`

In IRB, UL (Unexpected Loss) drives capital:
`UL = √(EL × (1 − PD) × LGD²) × correlation_adjustment`

The model development process must explicitly address which component (PD, LGD, EAD) each model covers and how they will be combined.

---

## 4. Statistical Concepts

**Logistic Regression (The Workhorse)**
The canonical PD model is a binary logistic regression:

```
log[p/(1-p)] = β₀ + β₁x₁ + ... + βₙxₙ
p = 1 / (1 + e^(-log-odds))
```

Assumptions:
- Binary outcome (default = 1, non-default = 0)
- Independence of observations (problematic with correlated defaults)
- No perfect multicollinearity
- Linearity of log-odds in continuous predictors (or use WoE transformation)

**Variable Selection Methods**
1. Univariate screening: IV > 0.10 threshold
2. Correlation screening: |r| < 0.70 between retained variables
3. Stepwise selection (AIC/BIC): Automated but risks overfitting
4. Regularisation (LASSO): Penalises large coefficients, handles multicollinearity
5. Business plausibility: Direction of coefficient must make economic sense

**Sample Splitting**
- Development sample: Typically 60–70% of observations, used for model estimation
- Holdout / Out-of-Time (OOT) sample: 30–40%, reserved for performance assessment
- Out-of-Time is preferred over random split: models often perform artificially well on random holdout due to temporal autocorrelation

**Observation Date and Performance Window**
- Observation date (T₀): The date at which predictor variables are measured
- Performance window: The period [T₀, T₀+12m] over which the default flag is set
- Critical: There must be no information from the performance window in the predictor set (data leakage)

**Dealing with Class Imbalance**
Default rates in corporate portfolios are typically 0.5%–3%, creating severe class imbalance. Techniques:
- Oversampling (SMOTE for tabular credit data)
- Cost-sensitive learning (weight defaulters more heavily)
- Threshold calibration (operating point selection based on business cost)
- Note: Model performance metrics (AUC, Gini) are relatively robust to imbalance; calibration is not

**Reference Dataset Construction**
```
Reference Dataset = {
  All obligors active at any observation date T₀,
  with predictor variables measured as of T₀,
  with default flag = 1 if defaulted in (T₀, T₀+12m],
  with at least one full performance window before data extraction date
}
```

Multiple observation dates per obligor (vintage pooling) increases sample size but requires clustering corrections in standard errors.

---

## 5. Regulatory Framework

**SR 11-7: Supervisory Guidance on Model Risk Management (Federal Reserve / OCC, 2011)**
The foundational US regulatory framework. Key requirements:
- Models must have a clear purpose statement and documented assumptions
- Model development must be separate from model validation (independence)
- All models must go through MRC approval before use
- Ongoing monitoring is required post-deployment
- Model risk must be explicitly managed and reported to the Board

Three model risk management pillars per SR 11-7:
1. Sound model development, implementation, and use
2. Effective model validation
3. Strong governance, policies, and controls

**EBA Guidelines on Internal Models (2019, EBA/GL/2017/07)**
European equivalent. Key provisions:
- Chapter 5: PD estimation — requires at least 5 years of historical data (7 years preferred)
- Chapter 7: LGD estimation — requires complete workout data; cure rates must be observed
- Chapter 8: EAD — CCF estimation requires 5 years of data; conservative estimates when data is limited
- Article 180 CRR: Minimum 1-year average observed default rate as long-run average PD

**ECB TRIM (Targeted Review of Internal Models)**
2017–2019 supervisory exercise reviewing internal models across European banks. Key findings relevant to model development:
- Banks commonly under-estimated default definitions (too narrow)
- Data quality issues in reference datasets
- Insufficient margin of conservatism for data limitations
- Default identification triggered inconsistently

**PRA SS1/23: Model Risk Management Principles (2023)**
UK regulatory statement of expectations. Five principles:
1. Model identification and model risk classification
2. Governance and ownership
3. Model development and implementation
4. Model validation
5. Model risk mitigants

**Basel III Output Floor (CRR3 / FRTB)**
From 2025+, IRB RWA cannot fall below 72.5% of Standardised Approach RWA. This creates a new constraint: developing models that are accurate may still not be usable if they imply RWA below the output floor. Development teams must now run parallel SA calculations.

---

## 6. Data Required

**Obligor-Level Data (Financial Statement Data)**
- Revenue/Turnover: Segmentation, size buckets
- EBITDA: Debt service coverage
- Total Debt / Net Debt: Leverage metrics
- Total Assets: Balance sheet size
- Tangible Net Worth: Capital adequacy
- Cash and Equivalents: Liquidity
- Interest Expense: Coverage ratios
- Source: Internal lending system (booked financials), Dun & Bradstreet, Bureau van Dijk Orbis

**Computed Financial Ratios (Key Predictors)**
- Debt/EBITDA: < 3x (investment grade), 3-5x (sub-investment grade), > 5x (distressed)
- Interest Coverage Ratio (ICR): EBIT / Interest Expense; < 1.5x is stress signal
- Current Ratio: Current Assets / Current Liabilities; < 1.0x is liquidity risk
- Debt/Total Assets: Leverage ratio
- EBITDA Margin: Operating efficiency

**Account / Facility Data**
- Utilisation rate at observation date: EAD predictor
- Days Past Due (DPD): Default trigger; also early warning predictor
- Limit and outstanding balance
- Facility type (revolving / term)
- Maturity date and original tenor

**Behavioural Data**
- Internal payment history
- External bureau tradeline data
- Number of credit inquiries (can signal distress)
- Industry-level default rates (macro conditioning variable)

**Default and Recovery Data**
- Default date (per Basel definition)
- Resolution date (for LGD calculation)
- Cash flows received post-default (interest accrued, principal repaid, recovery from collateral)
- Collateral value at default and at realisation date
- Direct workout costs (legal, administrative)

**Data Quality Dimensions**
- Completeness: % of records with non-null values for each variable
- Accuracy: Financial ratios computed from source documents vs. system
- Timeliness: Lag between financial statement date and system update
- Consistency: Same obligor across different systems (CRM, risk system, GL)
- Target: >95% completeness for Tier 1 predictors; document and treat missing data

---

## 7. How Analysts Actually Work

**Phase 1: Problem Definition (Weeks 1–2)**

The model developer begins with a scoping meeting with the business:
- Which portfolio segments will the model cover?
- What is the current model and why is it being replaced?
- Are there regulatory constraints (IRB, IFRS 9)?
- What is the target approval timeline?

The output is a Model Purpose Statement (MPS) — a 1–2 page document that frames everything that follows. Without a clear MPS, models get built for the wrong problem.

**Phase 2: Data Sourcing and Quality Assessment (Weeks 3–6)**

The analyst writes data extraction queries (SQL) to pull:
1. The population of obligors active between [data start] and [snapshot date − 12 months]
2. Financial statement data for each obligor at each observation date
3. Default events with dates
4. Recovery cash flows for defaulted accounts

A Data Quality Report is produced covering completeness, accuracy checks (ratios within plausible bounds), and temporal consistency.

**Phase 3: Reference Dataset Construction (Weeks 5–8)**

This is the most technically demanding phase:
1. Define observation dates (typically 31 Dec each year, 2013–2022)
2. For each obligor × observation date: was the obligor active? Pull all predictor variables
3. Look forward 12 months: did the obligor default?
4. Merge predictors with default flag
5. Remove any predictors computed using information from the performance window

Analysts maintain a "variable construction log" documenting exactly how each variable was computed (which system, which field, which date).

**Phase 4: Univariate Analysis (Weeks 8–10)**

For each candidate variable:
1. Distribution analysis: histogram, percentiles, outlier analysis
2. Missing rate calculation
3. WoE transformation across 5–10 bins
4. IV calculation
5. Monotonicity check (does WoE move in economically intuitive direction?)
6. Fine classing → Coarse classing (merge adjacent bins with similar WoE)

Output: Variable universe scorecard (50–200 variables screened, 10–25 retained)

**Phase 5: Model Estimation (Weeks 10–14)**

1. Split development/holdout (typically 70/30 OOT split — latest 2 years in holdout)
2. Run logistic regression with stepwise selection or LASSO
3. Check coefficient signs (must be economically plausible)
4. Iterate: remove variables with wrong signs, add back alternatives, rerun
5. Calculate development performance: AUC, Gini, KS
6. Calculate holdout performance: same metrics; check for degradation > 5 Gini points

**Phase 6: Calibration (Weeks 14–16)**

Convert the score/log-odds to a PD:
1. Map scores to master scale risk grades (e.g., 1–10 or AAA–D)
2. Calculate observed default rate per grade in development sample
3. Apply long-run adjustment to account for economic cycle
4. Validate calibration: is the predicted PD within a confidence interval of observed DR?

**Phase 7: Documentation and Approval (Weeks 16–24)**

The Model Technical Document (MTD) is typically 100–200 pages covering all phases above. It is submitted to:
1. Model Risk Committee (MRC): Technical review of methodology
2. Model Risk and Approval Committee (MRAC): Governance approval
3. Regulatory notification (if IRB): Model change notification to PRA/ECB

---

## 8. Excel Implementation

**Variable Screening Spreadsheet Structure**

```
Sheet: Variable_Universe
Columns:
A: Variable_Name
B: Source_System
C: Variable_Description
D: Sample_Size
E: Missing_Rate_%
F: IV
G: Gini_Univariate
H: Sign_Check (1=Pass, 0=Fail)
I: Monotonic (Y/N)
J: Correlation_with_Retained_Vars (max)
K: Include_in_Model (Y/N/Review)
L: Notes

Conditional formatting:
- IV > 0.30: Green fill
- IV 0.10-0.30: Yellow fill
- IV < 0.10: Red fill
- Sign_Check = 0: Red font
```

**WoE Calculation Table (per variable)**

```
Sheet: WoE_[VariableName]
Columns:
A: Bin_Label (e.g., "< 1.0x", "1.0x – 1.5x", "> 1.5x")
B: N_Total
C: N_Events (Defaults)
D: N_Non_Events
E: Dist_Events = C/SUM(C)
F: Dist_Non_Events = D/SUM(D)
G: WoE = LN(E/F)
H: IV_Component = (E-F)*G
I: Sum_IV = SUM(H)

Chart: Bar chart of WoE by bin (should be monotonic for clean variable)
```

**Model Scorecard Master**

```
Sheet: Scorecard
Columns:
A: Variable_Name
B: Coefficient (from logistic regression)
C: Odds_Ratio = EXP(B)
D: Std_Error
E: Z_Stat = B/D
F: P_Value
G: Variable_Points_at_Median
H: Min_Points (at lowest observed value)
I: Max_Points (at highest observed value)

Score computation per obligor:
= SUMPRODUCT(Coefficients, [WoE_transformed variables]) + Intercept
= Converts to PD via: 1/(1+EXP(-log_odds))
```

**Grade Mapping Table**

```
Sheet: Master_Scale
A: Grade (1–10)
B: Score_Min
C: Score_Max
D: PD_Min_%
E: PD_Max_%
F: Central_PD_%
G: Observed_DR_Dev_%
H: Observed_DR_Holdout_%
I: External_Equivalent (S&P: AAA/AA/A/BBB/BB/B/CCC)
J: N_Obligors_Dev
K: N_Obligors_Holdout

Bottom row: Weighted average PD vs. weighted average observed DR
```

---

## 9. SQL Implementation

```sql
-- ============================================================
-- M25: REFERENCE DATASET CONSTRUCTION
-- Credit Risk Model Development
-- ============================================================

-- Step 1: Define observation dates (annual snapshots)
CREATE TABLE #ObservationDates (
    obs_date        DATE NOT NULL,
    obs_year        INT  NOT NULL
);

INSERT INTO #ObservationDates VALUES
('2014-12-31', 2014),
('2015-12-31', 2015),
('2016-12-31', 2016),
('2017-12-31', 2017),
('2018-12-31', 2018),
('2019-12-31', 2019),
('2020-12-31', 2020),
('2021-12-31', 2021),
('2022-12-31', 2022);

-- Step 2: Active obligors at each observation date
-- (had an outstanding balance > 0 and no prior default)
WITH ActiveObligors AS (
    SELECT
        o.obs_date,
        f.obligor_id,
        f.facility_id,
        f.outstanding_balance,
        f.facility_type,
        f.limit_amount,
        f.original_maturity_date,
        f.days_past_due
    FROM #ObservationDates o
    JOIN dbo.Facilities f
        ON f.snapshot_date = o.obs_date
        AND f.outstanding_balance > 0
        AND f.facility_status = 'ACTIVE'
    -- Exclude obligors already in default at observation date
    WHERE NOT EXISTS (
        SELECT 1 FROM dbo.DefaultEvents de
        WHERE de.obligor_id = f.obligor_id
          AND de.default_date <= o.obs_date
          AND (de.cure_date IS NULL OR de.cure_date > o.obs_date)
    )
),

-- Step 3: Identify defaults in the 12-month performance window
DefaultFlags AS (
    SELECT
        a.obs_date,
        a.obligor_id,
        a.facility_id,
        CASE
            WHEN EXISTS (
                SELECT 1 FROM dbo.DefaultEvents de
                WHERE de.obligor_id = a.obligor_id
                  AND de.default_date > a.obs_date
                  AND de.default_date <= DATEADD(MONTH, 12, a.obs_date)
            ) THEN 1
            ELSE 0
        END AS default_flag,
        (
            SELECT MIN(de.default_date)
            FROM dbo.DefaultEvents de
            WHERE de.obligor_id = a.obligor_id
              AND de.default_date > a.obs_date
              AND de.default_date <= DATEADD(MONTH, 12, a.obs_date)
        ) AS default_date
    FROM ActiveObligors a
),

-- Step 4: Join financial statement data (lagged to avoid look-ahead)
-- Financial statements available with ~3 month lag
FinancialData AS (
    SELECT
        f.obligor_id,
        f.statement_date,
        f.revenue,
        f.ebitda,
        f.total_debt,
        f.net_debt,
        f.total_assets,
        f.tangible_net_worth,
        f.cash_and_equivalents,
        f.interest_expense,
        f.current_assets,
        f.current_liabilities,
        -- Computed ratios
        CASE WHEN f.ebitda > 0 THEN f.total_debt / f.ebitda ELSE NULL END
            AS debt_ebitda,
        CASE WHEN f.interest_expense > 0 THEN f.ebitda / f.interest_expense ELSE NULL END
            AS interest_coverage,
        CASE WHEN f.current_liabilities > 0 THEN f.current_assets / f.current_liabilities ELSE NULL END
            AS current_ratio,
        CASE WHEN f.total_assets > 0 THEN f.total_debt / f.total_assets ELSE NULL END
            AS leverage_ratio,
        CASE WHEN f.revenue > 0 THEN f.ebitda / f.revenue ELSE NULL END
            AS ebitda_margin,
        ROW_NUMBER() OVER (
            PARTITION BY f.obligor_id, YEAR(f.statement_date)
            ORDER BY f.statement_date DESC
        ) AS rn
    FROM dbo.FinancialStatements f
),

-- Take most recent financials available before each observation date
-- (with 3-month lag to reflect filing delays)
LatestFinancials AS (
    SELECT
        od.obs_date,
        fd.obligor_id,
        fd.debt_ebitda,
        fd.interest_coverage,
        fd.current_ratio,
        fd.leverage_ratio,
        fd.ebitda_margin,
        fd.revenue,
        fd.tangible_net_worth,
        fd.cash_and_equivalents,
        fd.statement_date AS fs_date,
        DATEDIFF(MONTH, fd.statement_date, od.obs_date) AS fs_lag_months
    FROM #ObservationDates od
    CROSS JOIN (SELECT DISTINCT obligor_id FROM dbo.FinancialStatements) o
    CROSS APPLY (
        SELECT TOP 1
            f.*
        FROM FinancialData f
        WHERE f.obligor_id = o.obligor_id
          AND f.statement_date <= DATEADD(MONTH, -3, od.obs_date)
          AND f.rn = 1
        ORDER BY f.statement_date DESC
    ) fd
)

-- Step 5: Assemble reference dataset
SELECT
    df.obs_date,
    df.obligor_id,
    df.facility_id,
    df.default_flag,
    df.default_date,

    -- Behavioural variables (from facility snapshot)
    ao.outstanding_balance,
    ao.limit_amount,
    CASE
        WHEN ao.limit_amount > 0 THEN ao.outstanding_balance / ao.limit_amount
        ELSE NULL
    END AS utilisation_rate,
    ao.days_past_due,
    ao.facility_type,

    -- Financial ratio variables
    lf.debt_ebitda,
    lf.interest_coverage,
    lf.current_ratio,
    lf.leverage_ratio,
    lf.ebitda_margin,
    lf.revenue,
    lf.tangible_net_worth,
    lf.cash_and_equivalents,
    lf.fs_date,
    lf.fs_lag_months,

    -- Data quality flags
    CASE WHEN lf.debt_ebitda IS NULL THEN 1 ELSE 0 END AS missing_debt_ebitda,
    CASE WHEN lf.interest_coverage IS NULL THEN 1 ELSE 0 END AS missing_icr,
    CASE WHEN lf.current_ratio IS NULL THEN 1 ELSE 0 END AS missing_current_ratio,

    -- Development / Holdout split flag
    CASE
        WHEN df.obs_date <= '2020-12-31' THEN 'DEVELOPMENT'
        ELSE 'HOLDOUT'
    END AS sample_flag

INTO dbo.ModelRefDataset_M25
FROM DefaultFlags df
JOIN ActiveObligors ao
    ON ao.obs_date = df.obs_date
    AND ao.obligor_id = df.obligor_id
    AND ao.facility_id = df.facility_id
LEFT JOIN LatestFinancials lf
    ON lf.obs_date = df.obs_date
    AND lf.obligor_id = df.obligor_id
-- Exclude records with financial data lagged more than 24 months
WHERE lf.fs_lag_months <= 24
   OR lf.obligor_id IS NULL; -- Keep even if no financials (to measure missing rate)

-- Step 6: Data quality summary
SELECT
    sample_flag,
    COUNT(*)                                            AS total_obligor_obs,
    SUM(default_flag)                                   AS total_defaults,
    CAST(SUM(default_flag) AS FLOAT) / COUNT(*)        AS observed_default_rate,
    AVG(CAST(missing_debt_ebitda AS FLOAT))            AS pct_missing_debt_ebitda,
    AVG(CAST(missing_icr AS FLOAT))                    AS pct_missing_icr,
    AVG(CAST(missing_current_ratio AS FLOAT))          AS pct_missing_current_ratio
FROM dbo.ModelRefDataset_M25
GROUP BY sample_flag;

-- Step 7: Variable IV calculation (for a single variable — debt_ebitda)
WITH Bucketed AS (
    SELECT
        default_flag,
        CASE
            WHEN debt_ebitda IS NULL THEN 'Missing'
            WHEN debt_ebitda < 0   THEN 'Negative (Loss-Making)'
            WHEN debt_ebitda < 2   THEN '< 2x'
            WHEN debt_ebitda < 3   THEN '2x – 3x'
            WHEN debt_ebitda < 4   THEN '3x – 4x'
            WHEN debt_ebitda < 5   THEN '4x – 5x'
            WHEN debt_ebitda < 7   THEN '5x – 7x'
            ELSE '> 7x'
        END AS bucket
    FROM dbo.ModelRefDataset_M25
    WHERE sample_flag = 'DEVELOPMENT'
),
Counts AS (
    SELECT
        bucket,
        COUNT(*)                AS n_total,
        SUM(default_flag)       AS n_events,
        COUNT(*) - SUM(default_flag) AS n_non_events
    FROM Bucketed
    GROUP BY bucket
),
Totals AS (
    SELECT
        SUM(n_events)       AS total_events,
        SUM(n_non_events)   AS total_non_events
    FROM Counts
)
SELECT
    c.bucket,
    c.n_total,
    c.n_events,
    c.n_non_events,
    CAST(c.n_events AS FLOAT) / t.total_events               AS dist_events,
    CAST(c.n_non_events AS FLOAT) / t.total_non_events       AS dist_non_events,
    LOG(
        (CAST(c.n_events AS FLOAT) / t.total_events)
        / NULLIF(CAST(c.n_non_events AS FLOAT) / t.total_non_events, 0)
    )                                                          AS woe,
    (
        CAST(c.n_events AS FLOAT) / t.total_events
        - CAST(c.n_non_events AS FLOAT) / t.total_non_events
    ) * LOG(
        (CAST(c.n_events AS FLOAT) / t.total_events)
        / NULLIF(CAST(c.n_non_events AS FLOAT) / t.total_non_events, 0)
    )                                                          AS iv_component
FROM Counts c
CROSS JOIN Totals t
ORDER BY c.bucket;
```

---

## 10. Python Implementation

```python
# ============================================================
# M25: MODEL DEVELOPMENT — FULL PYTHON NOTEBOOK STRUCTURE
# ============================================================
# Cell 1: Imports and Configuration
# ============================================================
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.linear_model import LogisticRegression, Lasso
from sklearn.metrics import roc_auc_score, roc_curve
from sklearn.model_selection import StratifiedKFold
from sklearn.preprocessing import StandardScaler
from scipy import stats
import warnings
warnings.filterwarnings('ignore')

# Configuration
RANDOM_SEED = 42
DEV_CUTOFF_DATE = '2020-12-31'   # Observations <= this date go to development
HOLDOUT_START = '2021-01-01'     # Observations after this date go to holdout
MIN_IV_THRESHOLD = 0.10          # Minimum IV for variable consideration
MAX_CORRELATION = 0.70           # Maximum pairwise correlation between retained vars
TARGET = 'default_flag'

# ============================================================
# Cell 2: Load Data and Initial Quality Check
# ============================================================
def load_and_validate_data(filepath: str) -> pd.DataFrame:
    """Load reference dataset and perform initial quality checks."""
    df = pd.read_csv(filepath, parse_dates=['obs_date', 'default_date', 'fs_date'])

    print(f"Dataset shape: {df.shape}")
    print(f"\nDate range: {df['obs_date'].min()} to {df['obs_date'].max()}")
    print(f"\nDefault rate: {df[TARGET].mean():.4%}")
    print(f"\nSample split:")
    print(df['sample_flag'].value_counts())

    # Check for critical data issues
    assert df['obligor_id'].notna().all(), "Missing obligor IDs"
    assert df[TARGET].isin([0, 1]).all(), "Default flag must be binary"
    assert (df['fs_lag_months'] <= 24).all(), "Financial lag > 24 months slipped through"

    return df

# ============================================================
# Cell 3: Weight of Evidence Transformation
# ============================================================
class WoETransformer:
    """
    Computes Weight of Evidence transformations for binary classification.
    Handles continuous variables via quantile binning and categorical via grouping.
    """

    def __init__(self, n_bins: int = 10, min_bin_size: float = 0.05):
        self.n_bins = n_bins
        self.min_bin_size = min_bin_size
        self.woe_maps = {}
        self.iv_values = {}

    def _compute_woe_iv(self, df: pd.DataFrame, col: str,
                         target: str) -> tuple[pd.DataFrame, float]:
        """Compute WoE and IV for a single variable."""
        temp = df[[col, target]].copy()
        temp['bucket'] = pd.qcut(
            temp[col], q=self.n_bins,
            duplicates='drop', labels=False
        ).fillna(-1).astype(int)  # -1 for missing

        total_events = temp[target].sum()
        total_non_events = len(temp) - total_events

        grouped = temp.groupby('bucket').agg(
            n_total=(target, 'count'),
            n_events=(target, 'sum')
        ).reset_index()
        grouped['n_non_events'] = grouped['n_total'] - grouped['n_events']

        # Laplace smoothing to avoid log(0)
        grouped['dist_events'] = (grouped['n_events'] + 0.5) / (total_events + 0.5)
        grouped['dist_non_events'] = (grouped['n_non_events'] + 0.5) / (total_non_events + 0.5)
        grouped['woe'] = np.log(grouped['dist_events'] / grouped['dist_non_events'])
        grouped['iv_component'] = (grouped['dist_events'] - grouped['dist_non_events']) * grouped['woe']

        iv = grouped['iv_component'].sum()
        woe_map = grouped.set_index('bucket')['woe'].to_dict()
        return grouped, iv, woe_map

    def fit(self, df: pd.DataFrame, variables: list, target: str) -> 'WoETransformer':
        """Fit WoE transformations for all variables."""
        for col in variables:
            df_clean = df[df[col].notna()]
            if len(df_clean) < 100:
                print(f"  SKIP {col}: insufficient non-null records ({len(df_clean)})")
                continue
            try:
                grouped, iv, woe_map = self._compute_woe_iv(df_clean, col, target)
                self.woe_maps[col] = woe_map
                self.iv_values[col] = iv
            except Exception as e:
                print(f"  ERROR {col}: {e}")
        return self

    def transform(self, df: pd.DataFrame, variables: list) -> pd.DataFrame:
        """Apply WoE transformations."""
        df_out = df.copy()
        for col in variables:
            if col not in self.woe_maps:
                continue
            buckets = pd.qcut(df_out[col], q=self.n_bins,
                              duplicates='drop', labels=False).fillna(-1).astype(int)
            df_out[f'{col}_woe'] = buckets.map(self.woe_maps[col]).fillna(0)
        return df_out

    def get_iv_summary(self) -> pd.DataFrame:
        """Return IV summary sorted descending."""
        iv_df = pd.DataFrame.from_dict(
            self.iv_values, orient='index', columns=['IV']
        ).sort_values('IV', ascending=False).reset_index()
        iv_df.columns = ['Variable', 'IV']

        def classify_iv(iv):
            if iv < 0.02: return 'Useless'
            elif iv < 0.10: return 'Weak'
            elif iv < 0.30: return 'Medium'
            elif iv < 0.50: return 'Strong'
            else: return 'Suspicious (check leakage)'

        iv_df['Classification'] = iv_df['IV'].apply(classify_iv)
        return iv_df

# ============================================================
# Cell 4: Variable Selection
# ============================================================
def select_variables(df_dev: pd.DataFrame, woe_transformer: WoETransformer,
                     target: str) -> list:
    """
    Multi-stage variable selection:
    1. IV threshold filter
    2. Correlation filter (keep higher IV variable from correlated pairs)
    3. Business plausibility check (sign direction)
    """
    # Stage 1: IV filter
    iv_summary = woe_transformer.get_iv_summary()
    candidates = iv_summary[iv_summary['IV'] >= MIN_IV_THRESHOLD]['Variable'].tolist()
    print(f"Stage 1 (IV >= {MIN_IV_THRESHOLD}): {len(candidates)} variables pass")

    # Stage 2: Correlation filter
    woe_cols = [f'{v}_woe' for v in candidates if f'{v}_woe' in df_dev.columns]
    corr_matrix = df_dev[woe_cols].corr().abs()

    # Greedy selection: keep highest-IV variable, remove correlated ones
    selected_woe = []
    dropped = set()
    for col in woe_cols:
        if col in dropped:
            continue
        selected_woe.append(col)
        # Drop all columns correlated > threshold with this one
        correlated = corr_matrix[col][corr_matrix[col] > MAX_CORRELATION].index.tolist()
        correlated.remove(col)
        dropped.update(correlated)

    print(f"Stage 2 (correlation < {MAX_CORRELATION}): {len(selected_woe)} variables retained")

    # Stage 3: Logistic regression coefficient sign check
    X = df_dev[selected_woe].fillna(0)
    y = df_dev[target]

    lr = LogisticRegression(C=1e10, max_iter=500, random_state=RANDOM_SEED)
    lr.fit(X, y)

    coef_df = pd.DataFrame({
        'variable': selected_woe,
        'coefficient': lr.coef_[0]
    })

    # WoE encoding: coefficient should be positive (higher WoE = higher default risk)
    # Variables with negative coefficients after WoE encoding are suspect
    plausible = coef_df[coef_df['coefficient'] > 0]['variable'].tolist()
    print(f"Stage 3 (sign check): {len(plausible)} variables plausible")
    print(f"  Removed (wrong sign): {set(selected_woe) - set(plausible)}")

    return plausible

# ============================================================
# Cell 5: Model Estimation
# ============================================================
def estimate_model(df_dev: pd.DataFrame, selected_vars: list,
                   target: str) -> LogisticRegression:
    """
    Estimate logistic regression model with cross-validation.
    Returns fitted model and performance metrics.
    """
    X = df_dev[selected_vars].fillna(0)
    y = df_dev[target]

    # Cross-validation for robust performance estimate
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=RANDOM_SEED)
    cv_aucs = []

    for train_idx, val_idx in cv.split(X, y):
        X_train, X_val = X.iloc[train_idx], X.iloc[val_idx]
        y_train, y_val = y.iloc[train_idx], y.iloc[val_idx]

        lr = LogisticRegression(C=1.0, max_iter=500, random_state=RANDOM_SEED)
        lr.fit(X_train, y_train)
        auc = roc_auc_score(y_val, lr.predict_proba(X_val)[:, 1])
        cv_aucs.append(auc)

    print(f"5-fold CV AUC: {np.mean(cv_aucs):.4f} ± {np.std(cv_aucs):.4f}")

    # Final model on full development sample
    final_model = LogisticRegression(C=1.0, max_iter=500, random_state=RANDOM_SEED)
    final_model.fit(X, y)

    return final_model, np.mean(cv_aucs)

# ============================================================
# Cell 6: Performance Assessment (Development and Holdout)
# ============================================================
def compute_discriminatory_power(y_true: np.ndarray,
                                  y_score: np.ndarray,
                                  label: str = '') -> dict:
    """Compute AUC, Gini, KS, and Accuracy Ratio."""
    auc = roc_auc_score(y_true, y_score)
    gini = 2 * auc - 1

    # KS statistic
    fpr, tpr, thresholds = roc_curve(y_true, y_score)
    ks = np.max(tpr - fpr)

    # Accuracy Ratio (identical to Gini for binary classification)
    ar = gini

    results = {
        'Sample': label,
        'AUC': round(auc, 4),
        'Gini': round(gini, 4),
        'KS': round(ks, 4),
        'AR': round(ar, 4)
    }

    print(f"\n{label} Performance:")
    for k, v in results.items():
        if k != 'Sample':
            print(f"  {k}: {v:.4f}")

    return results

# ============================================================
# Cell 7: PD Calibration — Grade Mapping
# ============================================================
def calibrate_pd(df: pd.DataFrame, score_col: str, target: str,
                 n_grades: int = 10) -> pd.DataFrame:
    """
    Map model scores to PD grades.
    Calibration = ensuring predicted PD matches long-run observed default rate.
    """
    df = df.copy()

    # Create grade bands from score deciles
    df['grade'] = pd.qcut(df[score_col], q=n_grades,
                           labels=range(1, n_grades + 1),
                           duplicates='drop')

    calibration = df.groupby('grade').agg(
        n_obligors=(target, 'count'),
        n_defaults=(target, 'sum'),
        mean_score=(score_col, 'mean'),
        mean_pd_predicted=(score_col, lambda x: (1 / (1 + np.exp(-x))).mean())
    ).reset_index()

    calibration['observed_dr'] = calibration['n_defaults'] / calibration['n_obligors']
    calibration['pd_to_dr_ratio'] = (
        calibration['mean_pd_predicted'] / calibration['observed_dr'].replace(0, np.nan)
    )

    # Hosmer-Lemeshow test for calibration
    hl_stat = np.sum(
        (calibration['n_defaults'] - calibration['n_obligors'] * calibration['mean_pd_predicted'])**2
        / (calibration['n_obligors'] * calibration['mean_pd_predicted'] *
           (1 - calibration['mean_pd_predicted']))
    )
    hl_pvalue = 1 - stats.chi2.cdf(hl_stat, df=n_grades - 2)
    print(f"\nHosmer-Lemeshow test: χ²={hl_stat:.3f}, p={hl_pvalue:.4f}")
    print("  (p > 0.05 indicates adequate calibration)")

    return calibration

# ============================================================
# Cell 8: Model Documentation Generator
# ============================================================
def generate_model_summary(model: LogisticRegression,
                            selected_vars: list,
                            dev_perf: dict,
                            holdout_perf: dict,
                            iv_summary: pd.DataFrame) -> str:
    """Generate text summary for Model Technical Document."""
    coef_df = pd.DataFrame({
        'Variable': selected_vars,
        'Coefficient': model.coef_[0],
        'Odds_Ratio': np.exp(model.coef_[0])
    }).sort_values('Coefficient', ascending=False)

    summary = f"""
MODEL TECHNICAL DOCUMENT — SUMMARY STATISTICS
=============================================

1. FINAL MODEL VARIABLES ({len(selected_vars)} retained)
{coef_df.to_string(index=False)}

2. PERFORMANCE SUMMARY
   Development: AUC={dev_perf['AUC']:.4f}, Gini={dev_perf['Gini']:.4f}, KS={dev_perf['KS']:.4f}
   Holdout:     AUC={holdout_perf['AUC']:.4f}, Gini={holdout_perf['Gini']:.4f}, KS={holdout_perf['KS']:.4f}
   Gini Decay:  {(dev_perf['Gini'] - holdout_perf['Gini']):.4f}
   {'WARNING: Gini decay > 0.05 may indicate overfitting' if (dev_perf['Gini'] - holdout_perf['Gini']) > 0.05 else 'OK: Gini decay within acceptable range'}

3. INTERCEPT
   β₀ = {model.intercept_[0]:.4f}

4. DATA QUALITY NOTES
   - IV threshold applied: {MIN_IV_THRESHOLD}
   - Correlation filter: {MAX_CORRELATION}
   - Development cutoff: {DEV_CUTOFF_DATE}
"""
    return summary

# ============================================================
# Cell 9: Main Execution Pipeline
# ============================================================
def run_model_development_pipeline(filepath: str):
    """End-to-end model development pipeline."""

    # Load data
    df = load_and_validate_data(filepath)

    # Split
    df_dev = df[df['sample_flag'] == 'DEVELOPMENT'].copy()
    df_hold = df[df['sample_flag'] == 'HOLDOUT'].copy()
    print(f"\nDevelopment: {len(df_dev):,} obs, {df_dev[TARGET].sum()} defaults")
    print(f"Holdout: {len(df_hold):,} obs, {df_hold[TARGET].sum()} defaults")

    # Candidate variables (financial ratios and behavioural)
    candidate_vars = [
        'debt_ebitda', 'interest_coverage', 'current_ratio',
        'leverage_ratio', 'ebitda_margin', 'utilisation_rate',
        'days_past_due', 'revenue', 'tangible_net_worth'
    ]

    # WoE transformation
    woe = WoETransformer(n_bins=10)
    woe.fit(df_dev, candidate_vars, TARGET)

    print("\nIV Summary:")
    print(woe.get_iv_summary().to_string(index=False))

    df_dev = woe.transform(df_dev, candidate_vars)
    df_hold = woe.transform(df_hold, candidate_vars)

    # Variable selection
    selected = select_variables(df_dev, woe, TARGET)
    woe_selected = [f'{v}_woe' for v in
                    [v.replace('_woe', '') for v in selected] if f'{v}_woe' in selected]

    # Model estimation
    model, cv_auc = estimate_model(df_dev, selected, TARGET)

    # Performance
    X_dev = df_dev[selected].fillna(0)
    X_hold = df_hold[selected].fillna(0)

    dev_scores = model.predict_proba(X_dev)[:, 1]
    hold_scores = model.predict_proba(X_hold)[:, 1]

    dev_perf = compute_discriminatory_power(df_dev[TARGET], dev_scores, 'Development')
    hold_perf = compute_discriminatory_power(df_hold[TARGET], hold_scores, 'Holdout')

    # Calibration on development
    df_dev['log_odds'] = model.predict_log_proba(X_dev)[:, 1]
    calibration = calibrate_pd(df_dev, 'log_odds', TARGET)
    print("\nCalibration by Grade:")
    print(calibration[['grade', 'n_obligors', 'n_defaults',
                         'observed_dr', 'mean_pd_predicted']].to_string(index=False))

    # Summary
    summary = generate_model_summary(
        model, selected, dev_perf, hold_perf, woe.get_iv_summary()
    )
    print(summary)

    return model, woe, calibration, dev_perf, hold_perf

if __name__ == '__main__':
    model, woe, calibration, dev_perf, hold_perf = run_model_development_pipeline(
        'model_reference_dataset.csv'
    )
```

---

## 11. Interview Questions

**Technical — Junior/Mid Level**

1. **What is the difference between a development sample and a holdout sample? Why is out-of-time holdout preferred over random holdout?**
   Random holdout suffers from temporal autocorrelation: obligors close in time have similar macroeconomic conditions, so the model sees essentially the same environment in both samples. Out-of-time holdout tests whether the model generalises to a different economic period — a much more stringent test.

2. **What does Information Value measure, and what is the threshold for a variable to be considered?**
   IV measures the predictive power of a variable in separating events (defaults) from non-events. It is the sum across bins of (Distribution_Events − Distribution_Non_Events) × WoE. IV > 0.10 is typically the minimum for variable consideration; IV > 0.50 is suspicious and warrants data leakage investigation.

3. **A logistic regression coefficient for Debt/EBITDA comes out negative (higher leverage = lower default probability). What do you do?**
   This is a sign violation — economically implausible. First investigate: is there a multicollinearity issue with another variable? Is the variable computed correctly? If the sign cannot be corrected, the variable must be removed from the model regardless of statistical significance.

4. **What is the observation date and performance window? Why is this distinction critical?**
   The observation date (T₀) is when predictor variables are measured. The performance window is [T₀, T₀+12m] during which the default flag is set. No information from the performance window may be used as a predictor — doing so creates data leakage, making the model appear far better than it will be in production.

**Technical — Senior/Director Level**

5. **How do you build a model when you have fewer than 20 historical defaults in your portfolio?**
   This is a Low Default Portfolio (LDP). Options: (a) pool data with similar portfolios or use external data; (b) use expert-based scorecards calibrated externally; (c) use shadow ratings benchmarked to agency ratings; (d) adopt a conservative floor PD per regulatory guidance. Statistical model development requires a minimum of ~300–500 defaults for meaningful estimation.

6. **SR 11-7 requires model development to be separate from model validation. How is this operationalised in your bank?**
   Typically: Model Development sits within the business line or credit risk quant team. Model Validation is an independent function (often within Model Risk Management or Internal Audit) with a separate reporting line and budget. Validators are prohibited from developing models they later validate.

7. **What is the Basel III output floor and how does it affect the value of model development?**
   From 2025, IRB RWA cannot fall below 72.5% of SA RWA. If a model is excellent and produces very low RWA, but SA RWA would be much higher, the bank is floored at 72.5% of SA. This limits the capital benefit of model development and changes the ROI calculation for investing in IRB model improvement.

---

## 12. Common Mistakes

1. **Data Leakage**: Including variables that incorporate information from the performance window (e.g., "days past due at default date" rather than "days past due at observation date"). This inflates performance metrics dramatically and creates models that fail in production.

2. **Survivorship Bias in Reference Dataset**: Only including obligors who survived to the snapshot date means obligors who exited the book (early repayment, restructuring, default before the snapshot) are excluded. This biases the sample toward better credits.

3. **Using a Random Holdout Instead of Out-of-Time**: Models evaluated on random holdout can show excellent performance but fail in live use because they were never tested on a different economic period.

4. **Ignoring Missing Data Patterns**: Treating missing financial data as random when it is systematically related to default risk (e.g., private companies that don't file accounts are riskier). Missing indicators should be included as variables.

5. **Violating Monotonicity in WoE Transformation**: If WoE is not monotonic (e.g., medium-leverage firms have better WoE than low-leverage firms in some bins), it indicates the binning is wrong or the variable is not behaving as expected. Analysts often force monotonicity through coarse classing without investigating why.

6. **Over-reliance on Stepwise Selection**: Automated stepwise regression optimises in-sample fit and can include variables that are spuriously correlated with the outcome. Regulatory reviewers expect economic rationale for every included variable.

7. **Confusing TTC and PIT PD**: Using a TTC model for IFRS 9 Stage 2 triggers without adjusting for current macroeconomic conditions will result in SICR being triggered too slowly in downturns and too late for the bank to manage risk.

---

## 13. Case Studies

**Case Study 1: The Leaking Variable**

A European bank developed a corporate PD model achieving Gini of 0.72 on development and 0.68 on holdout — exceptional performance. Upon regulatory review, the PRA discovered one variable: "internal risk flag" — a flag set by credit officers when an account was being reviewed for potential restructuring. This flag is typically set 2–6 months before formal default — well within the performance window. The variable was a direct leak of future default status. When removed, Gini dropped to 0.51 on development. The model had to be completely rebuilt. Lesson: Validate the timing of every variable against the observation date; treat flags and overrides with particular suspicion.

**Case Study 2: The Class Imbalance Problem**

A bank had a large corporate portfolio with a 0.3% observed default rate over the development period (a benign credit cycle). The logistic regression model achieved 99.7% classification accuracy by predicting "no default" for every obligor. The AUC was 0.78, but the model assigned almost all obligors to the top three (safest) grades. Calibration to a 0.3% PD meant the model was useless for portfolio differentiation. Resolution: The team oversampled defaults 10x, re-estimated the model, then calibrated back to the long-run average DR of 1.2% using the offset correction: `adjusted_intercept = original_intercept − ln(oversample_ratio)`.

**Case Study 3: The Regulatory Rejection**

A mid-sized bank submitted an IRB model change notification for a new SME PD model to the ECB. The model used 10 variables but the technical document only explained why 7 were included. Three variables had been added during later development iterations, and the rationale was not documented. The ECB rejected the submission on grounds of insufficient documentation, not model performance. The bank had to re-submit 6 months later after documenting the economic rationale for each variable. Lesson: Document every decision during development, not after the fact.

---

## 14. Iterative Reinforcement

**Week 1 Foundation Tasks**
- Define the Model Purpose Statement for a hypothetical UK corporate PD model
- Construct a reference dataset schema (columns, data types, data sources)
- Calculate IV by hand for a 5-bin variable with given default/non-default counts
- Run the Python WoETransformer on a sample dataset and interpret the output

**Week 2 Applied Tasks**
- Given a variable universe of 30 variables, apply IV filtering, correlation screening, and sign checks — arrive at a final variable set with documented justification
- Build the full SQL reference dataset construction query for a new portfolio
- Identify three potential sources of data leakage in a given dataset description

**Week 3 Advanced Tasks**
- Estimate a logistic regression model, assess development and holdout performance, identify if Gini decay suggests overfitting, and propose remediation
- Map model scores to a 10-grade master scale and compute grade-level calibration statistics
- Write a two-page Model Purpose Statement and Variable Construction Log

**Exam-Style Questions**
1. A model shows Gini of 0.60 on development but 0.43 on out-of-time holdout. What are the three most likely causes and how would you investigate each?
2. Describe the reference dataset construction process for a UK corporate IRB PD model, including how you handle: (a) multiple observation dates per obligor, (b) obligors that defaulted and cured, (c) missing financial statement data.
3. Your logistic regression model includes Debt/EBITDA and Interest Coverage Ratio with a pairwise correlation of 0.82. Explain the approach for variable selection and the consequences of retaining both.

---

## 15. Source Material

**Primary Regulatory References**
- Federal Reserve / OCC SR 11-7: *Supervisory Guidance on Model Risk Management* (April 2011) — foundational US model risk framework
- EBA/GL/2017/07: *EBA Guidelines on PD estimation, LGD estimation and the treatment of defaulted exposures* (November 2017)
- Basel Committee BCBS 128 (June 2006): *International Convergence of Capital Measurement and Capital Standards* — Annex 5 (IRB formula), Annex 10 (validation)
- PRA SS1/23: *Model Risk Management Principles for Banks* (May 2023) — UK regulatory statement
- ECB TRIM Guide: *Guide to Internal Models* (2019) — European supervisory expectations

**Books**
- Siddiqi, N. (2006). *Credit Risk Scorecards: Developing and Implementing Intelligent Credit Scoring*. Wiley. — WoE, IV, scorecard development
- Anderson, R. (2007). *The Credit Scoring Toolkit*. Oxford University Press. — Comprehensive reference
- Thomas, L.C., Edelman, D.B., & Crook, J.N. (2002). *Credit Scoring and Its Applications*. SIAM.

**Academic Papers**
- Hosmer, D.W. & Lemeshow, S. (1980). "A goodness-of-fit test for the multiple logistic regression model." — Calibration testing
- Tibshirani, R. (1996). "Regression Shrinkage and Selection via the Lasso." *Journal of the Royal Statistical Society* — LASSO for variable selection

**Industry Resources**
- Moody's Analytics: *Expected Default Frequency (EDF) Technical Document*
- S&P Global: *CreditPro User Guide* — Historical default rate time series
- Risk.net: Model development practitioner articles
- Bank for International Settlements: Working Papers on credit risk modelling
