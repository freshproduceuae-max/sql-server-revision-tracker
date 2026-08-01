# M17 — Probability of Default (PD)

---

## 1. Business Purpose

Probability of Default (PD) is the cornerstone parameter of credit risk measurement. It quantifies the likelihood that a borrower will fail to meet its contractual obligations within a defined time horizon — almost always one year for regulatory capital purposes, and variable (1-year, lifetime) for IFRS 9 Expected Credit Loss (ECL) calculations.

Banks use PD for three overlapping but distinct purposes:

**Regulatory Capital (Basel III IRB):** PD feeds directly into the risk-weighted asset (RWA) formula. A corporate borrower rated BB has a higher PD than one rated AA, meaning more capital must be held. Under the Internal Ratings-Based (IRB) approach, banks must estimate PD at a grade level and demonstrate that their estimates are Through-The-Cycle (TTC) — meaning they reflect long-run average default rates, not the current point in the credit cycle.

**Loan Loss Provisioning (IFRS 9):** IFRS 9 requires Point-in-Time (PIT) PD estimates. Stage 1 exposures use 12-month PD; Stage 2 and Stage 3 exposures use lifetime PD. The PIT PD incorporates forward-looking macro overlays (GDP forecasts, unemployment rates, sector outlooks) — it moves up and down with the economic cycle.

**Credit Pricing and Relationship Management:** Relationship managers use PD to set loan spreads, negotiate covenants, and flag deteriorating credits for early review. Risk-adjusted return on capital (RAROC) models are built on PD, LGD, and EAD.

**Why this matters for a BA:** You will be asked to explain why a client's PD went up despite no change in financials. The answer almost always lies in PIT vs TTC methodology, macro overlay changes, or migration between rating grades. Understanding the mechanics lets you defend the model output to business lines and to regulators.

---

## 2. Accounting Concepts

### IFRS 9 — Three-Stage Impairment Model

IFRS 9 (effective 1 January 2018) replaced IAS 39's incurred-loss model with an expected-loss model. The staging logic drives which PD to use:

| Stage | Trigger | PD Horizon | ECL Calculation |
|-------|---------|-----------|----------------|
| Stage 1 | No significant increase in credit risk (SICR) since origination | 12-month PD | 12-month ECL |
| Stage 2 | SICR but not yet credit-impaired | Lifetime PD | Lifetime ECL |
| Stage 3 | Credit-impaired (default occurred) | Lifetime PD (often 100% for defaulted) | Lifetime ECL |

**SICR Triggers (bank-specific, but common examples):**
- 30 days past due (rebuttable presumption under IFRS 9 para 5.5.11)
- PD at reporting date has increased by more than a defined absolute or relative threshold versus PD at origination
- Internal watchlist / watch credit status
- Rating downgrade beyond a threshold (e.g., from investment grade to sub-investment grade)

### Provision Accounting Entry

When ECL increases (e.g., a performing loan moves from Stage 1 to Stage 2):

```
Dr  Impairment Loss (P&L)          £500,000
Cr  Allowance for Loan Losses (BS) £500,000
```

The allowance reduces the net carrying value of the loan on the balance sheet. PD is the primary driver of ECL volatility quarter-over-quarter.

### Day-1 Loss Under IFRS 9

For purchased or originated credit-impaired assets (POCI), the bank recognises the lifetime ECL immediately. This is particularly relevant for distressed loan acquisitions.

---

## 3. Financial Concepts

### Default Definition — Basel Art. 178

Basel III defines default (CRR Article 178) as occurring when **either or both** of:

1. **90 days past due (DPD):** The obligor is more than 90 days past due on any material credit obligation. For retail, EU regulators allow 180 days for certain mortgage portfolios.
2. **Unlikely to Pay (UTP):** The bank considers the obligor unlikely to pay its credit obligations in full without recourse to collateral. UTP indicators include: specific provision raised, distressed restructuring, credit sold at material discount, bankruptcy filing.

The 90 DPD rule provides an objective bright-line trigger. The UTP criterion is subjective and requires judgment — this is where banks differ most.

**Material Threshold:** Under EBA guidelines, past due is "material" if the absolute amount exceeds €100 (retail) or €500 (corporate) AND exceeds 1% of total on-balance-sheet exposure.

### Through-The-Cycle (TTC) vs Point-in-Time (PIT)

This distinction is critical and frequently misunderstood:

| Dimension | TTC (Basel IRB) | PIT (IFRS 9) |
|-----------|----------------|-------------|
| Time horizon | Long-run average (full economic cycle, typically 7–10 years of data) | Current conditions + forward-looking |
| Cyclicality | Low — stable across the cycle | High — rises sharply in recession |
| Purpose | Capital adequacy (avoids pro-cyclicality) | Provisioning (reflects current risk) |
| Regulatory basis | Basel III IRB (CRR Chapter 3) | IFRS 9 (IASB standard) |
| Approach | Historical observed default rates averaged across cycle | Conditional on macro scenario (GDP, rates, unemployment) |

### PD Term Structure

PD is not constant over time. For a given obligor, the conditional PD (probability of defaulting in year n, given survival to year n-1) follows a term structure that depends on credit quality:

- **Investment grade (AAA–BBB):** Low near-term PD; increases over time as more things can go wrong
- **Sub-investment grade (BB–B):** Higher near-term PD; often humped-shaped — risk concentrated in near-term
- **Distressed (CCC):** Very high near-term PD; conditional PD declines if they survive (selection effect)

**Cumulative vs Marginal PD:**
```
Cumulative PD (t) = 1 - ∏(t=1 to T) [1 - marginal_PD(t)]

Marginal PD (year 2) = Cumulative PD (year 2) - Cumulative PD (year 1)
                       ─────────────────────────────────────────────
                                1 - Cumulative PD (year 1)
```

### Migration Matrices

A migration matrix (also called a transition matrix) shows the probability of an obligor moving from rating grade i to grade j over a one-year horizon. Standard 7×7 matrices (AAA through D):

```
                   Year-End Rating
            AAA    AA     A    BBB    BB     B    CCC     D
AAA       89.62%  7.68%  0.57% 0.08% 0.04% 0.00% 0.00% 0.01%
AA         0.58% 88.37%  7.82% 0.68% 0.11% 0.08% 0.02% 0.06%
A          0.07%  2.12% 88.48% 5.47% 0.82% 0.21% 0.03% 0.06%
BBB        0.02%  0.19%  4.64%86.48% 5.58% 0.85% 0.17% 0.28%
BB         0.03%  0.07%  0.49%  5.88%75.74%8.39% 1.36% 1.11%
B          0.00%  0.07%  0.24%  0.45%  5.62%73.09%4.94% 5.50%
CCC/CC     0.00%  0.00%  0.42%  0.70%  1.60%11.10%51.23%27.82%
```
*Source: S&P Global Ratings (approximate long-run averages)*

Multi-year cumulative PD is derived by matrix multiplication: **M^t** where M is the one-year migration matrix and t is the horizon in years.

### The Merton Structural Model

Merton (1974) models a firm's equity as a call option on its assets:

```
V_E = V_A * N(d1) - D * e^(-rT) * N(d2)

where:
  d1 = [ln(V_A/D) + (r + σ_A²/2) * T] / (σ_A * √T)
  d2 = d1 - σ_A * √T

  V_E = market value of equity
  V_A = market value of assets (unobservable, estimated iteratively)
  D   = face value of debt (default boundary)
  σ_A = asset volatility
  r   = risk-free rate
  T   = time horizon
  N() = standard normal CDF
```

**Distance to Default (DD):**
```
DD = (V_A - D) / (V_A * σ_A)
   = [ln(V_A/D) + (μ - σ_A²/2) * T] / (σ_A * √T)
```

A larger DD means the firm is further from default. Moody's KMV translates DD into EDF (Expected Default Frequency) using an empirical mapping of DD values to observed historical default rates — a critical non-Merton step.

---

## 4. Statistical Concepts

### Logistic Regression for PD

The standard approach for retail and corporate scorecard PD:

```
logit(PD) = ln(PD / (1 - PD)) = β₀ + β₁X₁ + β₂X₂ + ... + βₖXₖ

PD = 1 / (1 + e^(-[β₀ + β₁X₁ + ... + βₖXₖ]))
```

The log-odds (logit) is a linear function of the predictor variables. The inverse logit (sigmoid function) maps back to a probability in [0,1].

### Model Performance Metrics

**ROC Curve and AUC (Area Under Curve):**
The ROC curve plots True Positive Rate (sensitivity) against False Positive Rate (1-specificity) at every possible score threshold. AUC = 0.5 → random model; AUC = 1.0 → perfect model. For corporate credit models, AUC > 0.75 is generally acceptable; > 0.80 is good.

**Gini Coefficient:**
```
Gini = 2 * AUC - 1
```
Ranges from 0 (random) to 1 (perfect). Often reported as a percentage. A Gini of 60% means the model ranks risk twice as well as random.

**Kolmogorov-Smirnov (KS) Statistic:**
```
KS = max|F_defaults(score) - F_non-defaults(score)|
```
The maximum separation between the cumulative distribution of defaulters and non-defaulters. Higher KS = better discrimination.

**Hosmer-Lemeshow Test for Calibration:**
```
H = Σ (O_j - E_j)² / (E_j * (1 - E_j/n_j))
```
Tests whether observed default rates match predicted PDs across deciles. Significant p-value (< 0.05) indicates miscalibration.

**Information Value (IV):**
```
IV = Σ (% Defaults_i - % Non-defaults_i) * ln(% Defaults_i / % Non-defaults_i)
```
Used in scorecard development to select predictive variables. IV < 0.02: unpredictive; 0.02–0.1: weak; 0.1–0.3: medium; > 0.3: strong.

### Cross-Validation for PD Models

K-fold cross-validation is standard. Stratified folds preserve the default rate in each fold (important given the low default rate problem — defaults are typically 0.5%–5% of corporate portfolios):

```python
from sklearn.model_selection import StratifiedKFold
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
```

### Low Default Portfolios (LDP)

Corporate credit portfolios often have very few defaults. Statistical estimation becomes unreliable. EBA guidelines on LDP (GL/2005/09) require banks to:
- Use conservative estimation (upper confidence bound of the mean)
- Blend internal and external (agency rating) data
- Apply PD floors (minimum PD = 0.03% for corporate under AIRB; Basel III finalisation sets 0.05%)

---

## 5. Regulatory Framework

### Basel III IRB — PD Requirements (CRR Art. 160–163)

- PD must be estimated per rating grade or pool
- Minimum observation period: 5 years (7 years for AIRB)
- TTC long-run average one-year default rate
- PD floors: **0.03%** (current AIRB, some jurisdictions); **0.05%** (Basel III finalisation effective Jan 2025 in EU)
- For specialised lending and equity: higher floors apply
- Annual review and back-testing required
- Model changes above materiality threshold require regulator notification

### Basel III Finalisation (CRR3 / Basel IV)

Published December 2017, EU implementation (CRR3) from January 2025:
- Output floor: RWA from IRB must be ≥ 72.5% of Standardised Approach RWA
- This limits the capital benefit from internal PD models
- PD floor for corporates under AIRB: raised to **0.05%**
- Foundation IRB (FIRB): PD estimated internally; LGD and CCF set by regulator

### IFRS 9 — PD Requirements (IFRS 9 para 5.5.17)

- Unbiased, probability-weighted PD incorporating reasonable and supportable forward-looking information
- PIT estimates, adjusted for macro scenarios (at minimum: base, upside, downside)
- Probability-weighted across scenarios (not just base case)
- For Stage 2/3: lifetime PD profile (monthly or quarterly nodes)

### EBA Guidelines

- **EBA/GL/2017/16:** PD estimation, LGD estimation, defaulted assets treatment
- **EBA/GL/2005/09:** Validation of internal rating systems
- **EBA/RTS/2016/03:** Assessment methodology for AIRB

---

## 6. Data Required

### Internal Data

| Data Element | Source System | Field Name (typical) | Notes |
|-------------|--------------|---------------------|-------|
| Obligor ID | Core banking | CUSTOMER_ID | Unique per legal entity |
| Rating at each period | Rating system | INTERNAL_GRADE | Point-in-time and TTC |
| Default flag | Credit risk DB | DEFAULT_FLAG | 0/1, linked to Basel def'n |
| Default date | Credit risk DB | DEFAULT_DATE | Used to compute time-to-default |
| Financials (annual) | Finance / spreading system | LEVERAGE_RATIO, EBITDA_MARGIN, etc. | As at most recent fiscal year |
| Loan balance | Core banking | OUTSTANDING_BALANCE | At each period end |
| Industry code | CRM | NAICS_CODE / SIC_CODE | For segmentation |
| Days past due | Core banking | MAX_DPD_12M | For UTP/90DPD trigger |

### External Data

- **Agency ratings** (S&P, Moody's, Fitch) mapped to internal grades for LDP calibration
- **Moody's Default Research Database:** historical corporate default rates by rating
- **Bureau van Dijk Orbis:** financial statements for unlisted corporates
- **Macro data:** GDP growth (ONS, ECB), unemployment (BLS, Eurostat), sector PMIs

### Minimum Observation Periods

| Approach | Minimum Years of Default Data |
|---------|------------------------------|
| FIRB | 5 years |
| AIRB | 7 years |
| IFRS 9 (lifetime) | Full economic cycle preferred; 5 years minimum |

---

## 7. How Analysts Actually Work

**Step 1 — Data extraction.** Pull the obligor-level default history from the credit risk data warehouse. This typically means a SQL query joining the credit events table to the ratings history table, filtered to the observation window (e.g., 2010–2023). Exclude technical defaults (where the bank caused the default through restructuring) and withdrawn ratings.

**Step 2 — Cohort construction.** Group obligors by rating grade at the start of each one-year window. Count how many default within the year. Calculate observed default rate (ODR) = defaults / obligors at start of period for each grade-year cell.

**Step 3 — Long-run average calculation.** Average the ODRs across years (simple average for TTC; weighted by number of obligors if desired). Apply the PD floor. This is the TTC PD assigned to that grade.

**Step 4 — PIT overlay (for IFRS 9).** Apply a macro satellite model: regress historical ODRs against GDP growth, unemployment rate, sector credit spreads. Use the coefficients to adjust the TTC PD given forward-looking macro forecasts.

**Step 5 — Calibration testing.** Compare predicted PD (from the model) against realised default rates. Plot on a calibration chart. If predicted > 2× observed consistently, the model is too conservative; if observed > 2× predicted, it is too optimistic.

**Step 6 — Rating committee sign-off.** Model outputs are reviewed by the Model Risk Management (MRM) function and approved by the Credit Risk Committee. Any grade-level PD change > 25 basis points (relative) typically triggers a review.

**Practical frustrations you will encounter:**
- Sparse default data at the top of the rating scale (AAA/AA) — you may have zero internal defaults. Use external data blending.
- Rating grade changes between system migrations creating data gaps.
- Business units challenging PD increases that affect their RAROC metrics.

---

## 8. Excel Implementation

### TTC PD Calculation from Cohort Data

```excel
Sheet: "PD_Cohort_Data"
Columns: Year | Grade | Obligors_SOY | Defaults | ODR

B2 = Grade (e.g., "BBB")
C2 = Obligors at start of year (e.g., 150)
D2 = Defaults during year (e.g., 1)
E2 = ODR = D2/C2  →  =D2/C2

TTC PD for grade BBB (averaging 10 years of data):
=AVERAGEIF($B$2:$B$101,"BBB",$E$2:$E$101)

With PD floor of 0.05%:
=MAX(0.0005, AVERAGEIF($B$2:$B$101,"BBB",$E$2:$E$101))
```

### Migration Matrix Construction

```excel
Sheet: "Migration"
Rows = From Grade (AAA, AA, A, BBB, BB, B, CCC, D)
Cols = To Grade (AAA, AA, A, BBB, BB, B, CCC, D)

Cell C5 (From A → To BBB): =COUNTIFS(from_grade,"A",to_grade,"BBB")/COUNTIF(from_grade,"A")
Row sum check: =SUM(C5:J5) → should equal 1.0

Colour-code cells: Green (diagonal), Yellow (1-notch), Orange (2-notch), Red (3+ notch or Default)
Conditional formatting: =AND(ROW()-4=MATCH($B5,grades,0), ...)
```

### PD Term Structure (Cumulative from Migration Matrix)

```excel
Sheet: "Term_Structure"
Year 1 PD from migration matrix (last column = Default)
Year 2 cumulative PD: =1-(1-$C2)*(1-INDEX(MMULT(M_matrix,M_matrix),ROW()-1,9))
Use MMULT() for matrix exponentiation (limited in Excel — use Python for this)
```

### Merton Distance-to-Default (Simple)

```excel
E_value = B2  (equity market cap)
Debt_face = B3
r = B4 (risk-free rate, e.g., 0.04)
sigma_E = B5 (equity volatility, annualised)
T = 1

d1 = (LN(E_value/(Debt_face*EXP(-r*T))) + (r + sigma_E^2/2)*T)/(sigma_E*SQRT(T))
=( LN(B2/(B3*EXP(-B4*B5))) + (B4 + B5^2/2)*1 ) / (B5*SQRT(1))

PD_Merton = NORM.DIST(-d2, 0, 1, TRUE)
where d2 = d1 - sigma_E*SQRT(T)
```

---

## 9. SQL Implementation

```sql
-- ============================================================
-- M17: PD COHORT ANALYSIS
-- ============================================================

-- Step 1: Build obligor-grade cohorts (annual snapshots)
WITH cohort_base AS (
    SELECT
        r.OBLIGOR_ID,
        r.RATING_GRADE,
        r.RATING_DATE,
        YEAR(r.RATING_DATE)                     AS cohort_year,
        -- Lookup whether the obligor defaulted within 12 months
        CASE
            WHEN EXISTS (
                SELECT 1
                FROM credit_events ce
                WHERE ce.OBLIGOR_ID = r.OBLIGOR_ID
                  AND ce.EVENT_TYPE IN ('DEFAULT_90DPD','DEFAULT_UTP')
                  AND ce.EVENT_DATE BETWEEN r.RATING_DATE
                                        AND DATEADD(MONTH, 12, r.RATING_DATE)
            ) THEN 1
            ELSE 0
        END                                     AS default_flag
    FROM ratings_history r
    WHERE r.RATING_DATE BETWEEN '2010-01-01' AND '2023-12-31'
      AND r.RATING_DATE = (
          -- Take the grade at the start of each calendar year
          SELECT MIN(r2.RATING_DATE)
          FROM ratings_history r2
          WHERE r2.OBLIGOR_ID = r.OBLIGOR_ID
            AND YEAR(r2.RATING_DATE) = YEAR(r.RATING_DATE)
      )
      AND r.OBLIGOR_TYPE = 'CORPORATE'
),

-- Step 2: Aggregate to grade-year ODR
grade_odr AS (
    SELECT
        cohort_year,
        RATING_GRADE,
        COUNT(*)            AS obligors_soy,
        SUM(default_flag)   AS defaults,
        CAST(SUM(default_flag) AS FLOAT)
            / NULLIF(COUNT(*), 0)  AS odr
    FROM cohort_base
    GROUP BY cohort_year, RATING_GRADE
),

-- Step 3: TTC PD = simple average of ODR across years
ttc_pd AS (
    SELECT
        RATING_GRADE,
        COUNT(DISTINCT cohort_year)     AS years_observed,
        SUM(obligors_soy)               AS total_obligors,
        SUM(defaults)                   AS total_defaults,
        AVG(odr)                        AS ttc_pd_raw,
        -- Apply Basel III PD floor of 0.05%
        GREATEST(AVG(odr), 0.0005)      AS ttc_pd_floored
    FROM grade_odr
    GROUP BY RATING_GRADE
)

SELECT
    RATING_GRADE,
    years_observed,
    total_obligors,
    total_defaults,
    ROUND(ttc_pd_raw * 100, 4)      AS ttc_pd_raw_pct,
    ROUND(ttc_pd_floored * 100, 4)  AS ttc_pd_floored_pct
FROM ttc_pd
ORDER BY
    CASE RATING_GRADE
        WHEN 'AAA' THEN 1 WHEN 'AA' THEN 2 WHEN 'A' THEN 3
        WHEN 'BBB' THEN 4 WHEN 'BB' THEN 5 WHEN 'B' THEN 6
        WHEN 'CCC' THEN 7 WHEN 'D' THEN 8 ELSE 9
    END;

-- ============================================================
-- IFRS 9 PD Term Structure: Cumulative default rates
-- ============================================================
WITH survival AS (
    SELECT
        RATING_GRADE,
        year_number,
        -- marginal_pd is the conditional PD for that year
        -- (sourced from migration matrix analysis or external tables)
        marginal_pd,
        -- Cumulative survival to this point
        EXP(SUM(LOG(1.0 - marginal_pd))
            OVER (PARTITION BY RATING_GRADE
                  ORDER BY year_number
                  ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
        ) AS survival_prob
    FROM pd_term_structure_inputs
)
SELECT
    RATING_GRADE,
    year_number,
    marginal_pd,
    survival_prob,
    1.0 - survival_prob     AS cumulative_pd
FROM survival
ORDER BY RATING_GRADE, year_number;

-- ============================================================
-- SICR Detection: Flag obligors with significant PD increase
-- ============================================================
SELECT
    r_current.OBLIGOR_ID,
    r_current.RATING_GRADE      AS current_grade,
    r_orig.RATING_GRADE         AS origination_grade,
    pd_current.ttc_pd_floored   AS pd_current,
    pd_orig.ttc_pd_floored      AS pd_origination,
    -- Absolute increase
    pd_current.ttc_pd_floored - pd_orig.ttc_pd_floored     AS pd_absolute_increase,
    -- Relative increase
    (pd_current.ttc_pd_floored - pd_orig.ttc_pd_floored)
        / NULLIF(pd_orig.ttc_pd_floored, 0)                AS pd_relative_increase,
    CASE
        WHEN pd_current.ttc_pd_floored
             > pd_orig.ttc_pd_floored * 1.5               THEN 'SICR_RELATIVE'
        WHEN pd_current.ttc_pd_floored
             - pd_orig.ttc_pd_floored > 0.02              THEN 'SICR_ABSOLUTE'
        WHEN r_current.days_past_due >= 30                 THEN 'SICR_30DPD'
        ELSE 'NO_SICR'
    END                                                     AS sicr_flag
FROM ratings_current r_current
JOIN ratings_at_origination r_orig
    ON r_current.FACILITY_ID = r_orig.FACILITY_ID
JOIN ttc_pd pd_current
    ON r_current.RATING_GRADE = pd_current.RATING_GRADE
JOIN ttc_pd pd_orig
    ON r_orig.RATING_GRADE = pd_orig.RATING_GRADE
WHERE r_current.PORTFOLIO = 'CORPORATE';
```

---

## 10. Python Implementation

```python
"""
M17_PD_Model.py
Probability of Default — Full Logistic Regression Implementation
with Cross-Validation, Calibration, and Performance Metrics
"""

import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_predict
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import roc_auc_score, roc_curve
from sklearn.calibration import calibration_curve
import matplotlib.pyplot as plt
import warnings
warnings.filterwarnings('ignore')

# ============================================================
# 1. SYNTHETIC CORPORATE CREDIT DATASET
# ============================================================

np.random.seed(42)
n = 2000  # 2,000 corporate obligors

# Simulate financial ratios (realistic corporate credit data)
data = pd.DataFrame({
    # Leverage: Total Debt / EBITDA (higher = riskier)
    'leverage_ratio': np.random.lognormal(mean=1.2, sigma=0.6, size=n).clip(0.5, 15),
    # Interest Coverage: EBITDA / Interest Expense (lower = riskier)
    'interest_coverage': np.random.lognormal(mean=2.0, sigma=0.7, size=n).clip(0.3, 20),
    # Current Ratio (liquidity)
    'current_ratio': np.random.lognormal(mean=0.4, sigma=0.4, size=n).clip(0.3, 4),
    # EBITDA Margin
    'ebitda_margin': np.random.normal(loc=0.15, scale=0.08, size=n).clip(0.01, 0.50),
    # Revenue Growth (YoY)
    'revenue_growth': np.random.normal(loc=0.03, scale=0.15, size=n).clip(-0.40, 0.60),
    # Loan-to-Value (for secured exposures)
    'ltv': np.random.beta(a=4, b=4, size=n).clip(0.10, 0.95),
    # Log of Total Assets (size)
    'log_total_assets': np.random.normal(loc=12, scale=2, size=n),
    # Industry dummy: 1 = cyclical (construction, retail, energy)
    'cyclical_industry': np.random.binomial(1, 0.35, size=n),
})

# Generate realistic default flag (logistic model with noise)
# High leverage, low coverage, low liquidity → higher default prob
log_odds_true = (
    -5.5
    + 0.35 * data['leverage_ratio']
    - 0.40 * data['interest_coverage']
    - 0.50 * data['current_ratio']
    - 4.00 * data['ebitda_margin']
    - 1.00 * data['revenue_growth']
    + 2.00 * data['ltv']
    - 0.10 * data['log_total_assets']
    + 0.60 * data['cyclical_industry']
)

true_pd = 1 / (1 + np.exp(-log_odds_true))
data['default_flag'] = np.random.binomial(1, true_pd)

print(f"Dataset: {n} obligors, {data['default_flag'].sum()} defaults "
      f"({data['default_flag'].mean()*100:.2f}% default rate)")

# ============================================================
# 2. FEATURE MATRIX
# ============================================================

features = [
    'leverage_ratio', 'interest_coverage', 'current_ratio',
    'ebitda_margin', 'revenue_growth', 'ltv',
    'log_total_assets', 'cyclical_industry'
]

X = data[features].copy()
y = data['default_flag'].copy()

# ============================================================
# 3. LOGISTIC REGRESSION WITH 5-FOLD CROSS-VALIDATION
# ============================================================

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

model = LogisticRegression(
    penalty='l2',
    C=1.0,           # Inverse of regularisation strength
    solver='lbfgs',
    max_iter=1000,
    random_state=42
)

# Stratified K-Fold (preserves default rate in each fold)
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

# Out-of-fold predicted probabilities (unbiased estimates)
oof_probs = cross_val_predict(
    model, X_scaled, y,
    cv=skf,
    method='predict_proba'
)[:, 1]

print(f"\nOut-of-fold AUC: {roc_auc_score(y, oof_probs):.4f}")
print(f"Gini:            {(2 * roc_auc_score(y, oof_probs) - 1):.4f}")

# ============================================================
# 4. KS STATISTIC
# ============================================================

defaults_scores = oof_probs[y == 1]
non_defaults_scores = oof_probs[y == 0]

# Sort and compute cumulative distributions
all_thresholds = np.sort(np.unique(oof_probs))
cum_default = np.array([
    np.mean(defaults_scores <= t) for t in all_thresholds
])
cum_non_default = np.array([
    np.mean(non_defaults_scores <= t) for t in all_thresholds
])

ks_stat = np.max(np.abs(cum_default - cum_non_default))
ks_thresh = all_thresholds[np.argmax(np.abs(cum_default - cum_non_default))]
print(f"KS Statistic:    {ks_stat:.4f} at score threshold {ks_thresh:.4f}")

# ============================================================
# 5. MODEL CALIBRATION (Hosmer-Lemeshow)
# ============================================================

# Sort by predicted PD, split into 10 deciles
n_groups = 10
sorted_idx = np.argsort(oof_probs)
groups = np.array_split(sorted_idx, n_groups)

hl_stat = 0
print("\nCalibration Table (Hosmer-Lemeshow):")
print(f"{'Decile':>8} {'N':>8} {'Pred_PD':>10} {'Obs_DR':>10} {'Pred/Obs':>10}")
print("-" * 50)

for i, grp in enumerate(groups):
    n_grp = len(grp)
    pred_pd = oof_probs[grp].mean()
    obs_dr = y.iloc[grp].mean()
    expected_defaults = pred_pd * n_grp
    observed_defaults = y.iloc[grp].sum()
    hl_stat += (observed_defaults - expected_defaults)**2 / (
        expected_defaults * (1 - pred_pd) if expected_defaults > 0 else 1
    )
    ratio = pred_pd / obs_dr if obs_dr > 0 else float('inf')
    print(f"{i+1:>8} {n_grp:>8} {pred_pd*100:>9.3f}% {obs_dr*100:>9.3f}% {ratio:>10.2f}x")

print(f"\nH-L Test Statistic: {hl_stat:.4f} (chi-sq with {n_groups-2} df)")

# ============================================================
# 6. FIT FINAL MODEL AND EXTRACT COEFFICIENTS
# ============================================================

model.fit(X_scaled, y)

coef_df = pd.DataFrame({
    'Feature': features,
    'Coefficient': model.coef_[0],
    'Odds_Ratio': np.exp(model.coef_[0]),
    'Direction': ['Increases PD' if c > 0 else 'Decreases PD'
                  for c in model.coef_[0]]
}).sort_values('Coefficient', ascending=False)

print("\nLogistic Regression Coefficients:")
print(coef_df.to_string(index=False))

# ============================================================
# 7. PD TERM STRUCTURE FROM MIGRATION MATRIX
# ============================================================

# Approximate S&P migration matrix (7 grades + Default)
grades = ['AAA','AA','A','BBB','BB','B','CCC','D']

M = np.array([
    [0.8962, 0.0768, 0.0057, 0.0008, 0.0004, 0.0000, 0.0000, 0.0001],
    [0.0058, 0.8837, 0.0782, 0.0068, 0.0011, 0.0008, 0.0002, 0.0006],
    [0.0007, 0.0212, 0.8848, 0.0547, 0.0082, 0.0021, 0.0003, 0.0006],
    [0.0002, 0.0019, 0.0464, 0.8648, 0.0558, 0.0085, 0.0017, 0.0028],
    [0.0003, 0.0007, 0.0049, 0.0588, 0.7574, 0.0839, 0.0136, 0.0111],
    [0.0000, 0.0007, 0.0024, 0.0045, 0.0562, 0.7309, 0.0494, 0.0550],
    [0.0000, 0.0000, 0.0042, 0.0070, 0.0160, 0.1110, 0.5123, 0.2782],
    [0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 1.0000],
])

# Compute cumulative PD for each grade over 5-year horizon
default_col = 7  # Last column = Default state
horizons = range(1, 6)

print("\nCumulative PD Term Structure (%):")
print(f"{'Grade':>6}", end="")
for t in horizons:
    print(f"  Year {t}", end="")
print()

M_power = M.copy()
for t in horizons:
    if t > 1:
        M_power = M_power @ M   # Matrix multiplication
    print(f"{grades[0]:>6}", end="") if t == 1 else None

results = {}
M_t = np.eye(len(grades))
for t in horizons:
    M_t = M_t @ M
    cumulative_pds = M_t[:, default_col]
    results[t] = cumulative_pds

term_df = pd.DataFrame(results, index=grades)
term_df.columns = [f'Year_{t}' for t in horizons]
print(term_df.applymap(lambda x: f"{x*100:.3f}%").to_string())

# ============================================================
# 8. MERTON DISTANCE-TO-DEFAULT
# ============================================================

from scipy.stats import norm
from scipy.optimize import fsolve

def merton_pd(E, D, r, sigma_E, T=1.0):
    """
    Estimate Merton model PD.
    E = equity market cap
    D = face value of debt
    r = risk-free rate
    sigma_E = equity volatility (annualised)
    T = horizon (years)
    """
    def equations(vars):
        V_A, sigma_A = vars
        d1 = (np.log(V_A / D) + (r + 0.5 * sigma_A**2) * T) / (sigma_A * np.sqrt(T))
        d2 = d1 - sigma_A * np.sqrt(T)
        # Merton equity value equation
        eq1 = V_A * norm.cdf(d1) - D * np.exp(-r * T) * norm.cdf(d2) - E
        # Equity volatility equation
        eq2 = (V_A / E) * norm.cdf(d1) * sigma_A - sigma_E
        return [eq1, eq2]

    # Initial guess: asset value ≈ equity + debt, asset vol ≈ equity vol * E/(E+D)
    V_A0 = E + D
    sigma_A0 = sigma_E * E / (E + D)

    try:
        V_A, sigma_A = fsolve(equations, [V_A0, sigma_A0], full_output=False)
    except Exception:
        return np.nan, np.nan, np.nan

    d1 = (np.log(V_A / D) + (r + 0.5 * sigma_A**2) * T) / (sigma_A * np.sqrt(T))
    d2 = d1 - sigma_A * np.sqrt(T)
    DD = d2  # Distance to Default
    PD_merton = norm.cdf(-d2)

    return V_A, DD, PD_merton

# Example: Firm with £500M equity, £1Bn debt, 4% risk-free, 35% equity vol
V_A, DD, PD = merton_pd(E=500e6, D=1000e6, r=0.04, sigma_E=0.35)
print(f"\nMerton Model Example:")
print(f"  Asset Value (V_A): £{V_A/1e6:.1f}M")
print(f"  Distance to Default: {DD:.3f}")
print(f"  Merton PD (1-year): {PD*100:.3f}%")

# ============================================================
# 9. PIT PD MACRO OVERLAY
# ============================================================

def apply_macro_overlay(ttc_pd, gdp_growth, unemployment_rate,
                         beta_gdp=-2.5, beta_unemp=3.0, intercept=0.0):
    """
    Simple macro overlay: adjust TTC PD using macro satellite model.
    logit(PIT_PD) = logit(TTC_PD) + beta_gdp * delta_GDP + beta_unemp * delta_UNEMP
    """
    logit_ttc = np.log(ttc_pd / (1 - ttc_pd))
    logit_pit = logit_ttc + intercept + beta_gdp * gdp_growth + beta_unemp * unemployment_rate
    pit_pd = 1 / (1 + np.exp(-logit_pit))
    return pit_pd

# IFRS 9 three-scenario weighting
scenarios = {
    'Base':     {'gdp': 0.015, 'unemp': 0.045, 'weight': 0.55},
    'Upside':   {'gdp': 0.035, 'unemp': 0.035, 'weight': 0.15},
    'Downside': {'gdp': -0.020,'unemp': 0.080, 'weight': 0.30},
}

ttc_pd_bbb = 0.0028  # Example: BBB-rated obligor TTC PD

print("\nIFRS 9 Scenario-Weighted PIT PD (BBB-rated obligor):")
weighted_pd = 0.0
for scenario, params in scenarios.items():
    pit_pd = apply_macro_overlay(
        ttc_pd_bbb,
        gdp_growth=params['gdp'],
        unemployment_rate=params['unemp']
    )
    weighted_pd += params['weight'] * pit_pd
    print(f"  {scenario:>10}: GDP={params['gdp']*100:+.1f}%, "
          f"Unemp={params['unemp']*100:.1f}%, "
          f"PIT PD={pit_pd*100:.4f}%, weight={params['weight']:.0%}")

print(f"\n  Probability-weighted PIT PD: {weighted_pd*100:.4f}%")
print(f"  TTC PD (baseline):           {ttc_pd_bbb*100:.4f}%")
print(f"  Overlay adjustment:          {(weighted_pd - ttc_pd_bbb)*100:+.4f}%")
```

---

## 11. Interview Questions

**Q1: What is the difference between TTC PD and PIT PD, and why do we need both?**

*Answer:* TTC (Through-The-Cycle) PD reflects long-run average default rates across a full economic cycle. It is relatively stable — a BBB-rated corporate might have a TTC PD of 0.28% regardless of whether we are in a recession or expansion. TTC PD is used for Basel IRB regulatory capital because it avoids pro-cyclicality: if PD shot up in recessions, capital requirements would spike exactly when banks are already under stress, amplifying the credit cycle.

PIT (Point-in-Time) PD reflects current and expected future conditions. In a severe recession, the PIT PD of a BBB obligor might be 0.80%; in a boom, it might be 0.12%. IFRS 9 requires PIT PD because provisions should reflect the actual current risk of loss — not a long-run average that ignores a looming recession.

**Q2: Walk me through how you would calculate TTC PD for the BB rating grade.**

*Answer:* Pull all BB-rated obligors at the start of each year from 2010–2023. Count how many defaulted within 12 months of each cohort start. Calculate the ODR for each year (defaults / obligors). Take the arithmetic average across years. Apply the Basel III PD floor of 0.05%. The result is the TTC PD for BB. In practice for BB, this might be around 1.0%–1.5% (referencing S&P historical data). Document the observation period, exclusions (technical defaults, withdrawn ratings), and blending with external data.

**Q3: Basel Art. 178 defines default as 90 days past due OR unlikely to pay. Can you give three examples of UTP triggers that do not involve past due payments?**

*Answer:* (1) Specific credit provision raised: the bank has judged that a material loss is probable, raising a provision signals expected credit impairment. (2) Distressed restructuring: the bank grants concessions it would not otherwise grant — e.g., covenant waivers, interest rate reductions, debt forgiveness — because the borrower cannot service debt on original terms. (3) Insolvency filing: the borrower has filed for administration, receivership, Chapter 11, or equivalent proceedings.

**Q4: A portfolio's average PIT PD in Q1 2023 was 0.45%. In Q3 2023 it jumped to 0.90%. The credit quality of obligors has not changed. What are the possible explanations?**

*Answer:* (a) Macro overlay: GDP forecasts deteriorated, or unemployment projections increased, causing the macro satellite model to increase the PIT adjustment. (b) Scenario weights changed: the probability assigned to the downside scenario increased. (c) Model recalibration: the bank recalibrated coefficients using updated data. (d) Rating migration: even if individual obligors feel the same credit quality, systematic downward migration could increase average PD. (e) SICR threshold change: more obligors moved to Stage 2 requiring lifetime PD, which is higher on average than 12-month PD.

**Q5: What is a migration matrix and how do you use it to compute 3-year cumulative PD?**

*Answer:* A migration matrix M is an n×n transition probability matrix where M[i][j] is the probability of moving from rating grade i to grade j in one year. The last row and column represent the Default state (absorbing). To compute 3-year cumulative PD, compute M³ = M × M × M. The default column of M³ gives the 3-year cumulative probability of default from each starting grade. Mathematically this uses the Markov chain property — the one-year transition probabilities applied repeatedly capture multi-step paths (A → BB → B → Default or A → Default directly, etc.).

---

## 12. Common Mistakes

**Mistake 1 — Confusing TTC and PIT in provisioning vs capital.**
Using TTC PD in IFRS 9 Stage 2 provisions is non-compliant. IFRS 9 explicitly requires forward-looking, PIT estimates. Conversely, using PIT PD for IRB regulatory capital creates pro-cyclicality and is rejected by regulators. Know which framework you are in.

**Mistake 2 — Ignoring the UTP leg of the default definition.**
Analysts sometimes code the default flag as MAX(DPD) ≥ 90 only. This misses the UTP indicators. A borrower who receives a specific provision in year 1 and then cures to current status in year 2 was in default in year 1 under UTP — that year-1 observation should contribute to the default cohort. Failing to capture UTP under-counts defaults and understates PD.

**Mistake 3 — Not applying the PD floor.**
Basel III finalisation sets a 0.05% floor for corporate AIRB. Many models produce PDs of 0.01%–0.02% for AAA/AA obligors. If floors are not applied in the capital calculation, RWA is understated. This is a common finding in ECB TRIM (Targeted Review of Internal Models) assessments.

**Mistake 4 — Rating philosophy mismatch.**
If the rating system assigns ratings on a PIT basis (i.e., ratings change with the macro cycle) but the bank then averages PDs across a cycle assuming a TTC rating, the average will be wrong. The methodology must be internally consistent: TTC ratings → TTC PD methodology; PIT ratings → PIT PD methodology.

**Mistake 5 — Ignoring cohort overlaps.**
When constructing cohorts using rolling 12-month windows (rather than calendar-year cohorts), the same obligor appears in multiple cohorts. This creates serial correlation in the default observations. Using overlapping cohorts without adjusting the standard errors leads to overconfidence in the precision of PD estimates.

**Mistake 6 — Treating the Merton PD as directly usable.**
The Merton model PD is a risk-neutral probability (using risk-free rate), not a real-world probability. For credit loss estimation, you need the real-world (physical) probability. Moody's KMV converts Merton DD to EDF using empirical mapping — they do not use the raw N(-d2) formula.

---

## 13. Case Studies

### Case Study A: RBS / NatWest Mortgage Portfolio PD Increase 2008–2009

During the 2008 financial crisis, the PIT PD of UK mortgage borrowers increased approximately 10× from pre-crisis levels. The TTC PD barely moved (since the long-run average incorporates previous downturns). This divergence validated the dual PD framework: Basel capital remained relatively stable (no cliff-edge), while IAS 39 provisions (and later IFRS 9 in retrospect) would have increased sharply. Key lesson: always understand which PD you are looking at when a business line reports "PD went up."

### Case Study B: ECB TRIM — Corporate PD Model Findings (2017–2019)

The ECB's Targeted Review of Internal Models reviewed PD models across 65 significant institutions. Common findings:
- **Rating philosophy not clearly documented:** Banks could not demonstrate whether their rating was TTC or PIT, making PD estimates uninterpretable.
- **Insufficient default data:** Several banks had fewer than 5 years of continuous data, particularly post-financial crisis when portfolio composition changed.
- **PD floors not consistently applied:** Some institutions applied floors at individual obligor level; others at grade level — creating inconsistent treatment.
- **Back-testing failures:** Many banks did not have a documented process for comparing realised default rates against PD estimates over multiple years.

### Case Study C: Building a PD Scorecard for a Mid-Market Corporate Portfolio

A UK challenger bank has 3,000 mid-market corporate clients (revenue £10M–£250M) and 7 years of data with 45 defaults (1.5% cumulative). The development process:
1. Financial ratios extracted from spreading system (EBITDA/Interest, Total Debt/EBITDA, Current Ratio, Revenue Growth)
2. Qualitative factors scored: management quality (0–5), industry risk (0–5), customer concentration (0–5)
3. WoE transformation applied to each variable to normalise distributions
4. Logistic regression with L2 regularisation (small dataset demands regularisation)
5. AUC = 0.78 on out-of-fold validation; Gini = 56% — acceptable given portfolio size
6. Calibration to external S&P/Moody's data for rating grades given internal data sparsity
7. Model approved by MRM and PRA notification submitted (material model change)

---

## 14. Iterative Reinforcement

### Week 1 Exercises

1. Download S&P's annual global corporate default study. Extract the 2015–2024 one-year default rates by rating category. Compute the TTC PD for each grade (simple average). Compare to the Basel III final PD floors. Which grades need flooring?

2. Build the 8×8 migration matrix in Excel using the data from the S&P study. Use `MMULT()` to square the matrix. Compare Year 1 Default column to Year 2 Cumulative PD. Verify the relationship: Cumulative PD (2yr) > 1-year PD.

3. Implement the Merton model in Python. Create a sensitivity analysis: holding equity at £500M and debt at £1Bn, vary equity volatility from 20% to 60%. Plot DD and PD. What equity volatility corresponds to a 1% PD? A 5% PD?

### Week 2 Exercises

4. Implement the IFRS 9 three-scenario PIT PD calculation in Python. Use GDP forecasts from the Bank of England's Monetary Policy Report. How do the three scenarios in the 2023Q4 MPR affect a BB-rated obligor's PIT PD relative to TTC?

5. Run the Python logistic regression on the synthetic dataset. Replace L2 regularisation with L1 (Lasso). Compare the number of features selected and AUC. Which features are zeroed out? Does this make economic sense?

6. Using the SQL cohort query, add a column for "withdrawn rating" and exclude them from the denominator. Explain why including withdrawn ratings in the denominator understates the ODR (survivorship bias).

### Self-Test Questions

- What is the mathematical relationship between the one-year migration matrix and two-year cumulative PD?
- A model has AUC = 0.71 and Gini = 42%. Is this acceptable for a corporate credit model? What would you do to improve it?
- Under Basel III finalisation, an AIRB bank's corporate PD estimates average 0.03%. What adjustment must they make?
- Explain why overlapping cohorts create econometric problems in PD estimation.

---

## 15. Source Material

**Primary Regulatory Documents**
- Basel Committee on Banking Supervision (BCBS), *Basel III: Finalising Post-Crisis Reforms* (December 2017) — Chapter on IRB constraints, PD floors
- European Banking Authority, *EBA/GL/2017/16: Guidelines on PD estimation, LGD estimation and the treatment of defaulted exposures* (November 2017)
- European Parliament, *Capital Requirements Regulation (CRR3)* — Articles 160–163 (PD requirements), Article 178 (Default definition)
- IASB, *IFRS 9 Financial Instruments* (2014) — Section 5.5 (Impairment), paragraphs 5.5.9–5.5.20 (SICR, PD requirements)
- EBA, *EBA/GL/2005/09: Guidelines on the Implementation, Validation and Assessment of Advanced Measurement Approaches and Internal Ratings Based Approaches* (2006)

**Academic Papers**
- Merton, R.C. (1974). "On the Pricing of Corporate Debt: The Risk Structure of Interest Rates." *Journal of Finance*, 29(2), 449–470
- Altman, E.I. (1968). "Financial Ratios, Discriminant Analysis and the Prediction of Corporate Bankruptcy." *Journal of Finance*, 23(4), 589–609
- Lando, D., & Skødeberg, T.M. (2002). "Analyzing Rating Transitions and Rating Drift with Continuous Observations." *Journal of Banking & Finance*, 26(2–3), 423–444
- Blöchlinger, A., & Leippold, M. (2006). "Economic Benefit of Powerful Credit Scoring." *Journal of Banking & Finance*, 30(3), 851–873

**Industry Publications**
- S&P Global Ratings, *Annual Global Corporate Default and Rating Transition Study* (published annually, most recent 2024)
- Moody's Analytics, *Default & Recovery Database* — Annual reports on corporate default rates
- Moody's KMV, *Modeling Default Risk* (Crosbie & Bohn, 2003) — foundational KMV methodology paper

**Books**
- McNeil, A., Frey, R., & Embrechts, P. (2015). *Quantitative Risk Management: Concepts, Techniques and Tools* (Revised Edition). Princeton University Press — Chapters 8–9
- Bluhm, C., Overbeck, L., & Wagner, C. (2010). *Introduction to Credit Risk Modeling* (2nd Edition). CRC Press — Chapters 1–4
- Siddiqi, N. (2017). *Intelligent Credit Scoring: Building and Implementing Better Credit Risk Scorecards*. Wiley — Chapter 6 (PD calibration)
