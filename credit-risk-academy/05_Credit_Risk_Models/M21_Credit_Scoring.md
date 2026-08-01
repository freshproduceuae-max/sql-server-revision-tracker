# M21 — Credit Scoring Models

---

## 1. Business Purpose

Credit scoring models convert a borrower's financial and non-financial characteristics into a single quantitative score or probability estimate that ranks credit risk. They serve three purposes:

**Decision automation:** Rather than having a credit analyst review every loan application, scoring models allow rapid, consistent, and documented credit decisions. For retail and SME credit, where application volumes are in the thousands, this is a business necessity.

**Risk differentiation:** A good scoring model separates borrowers into risk buckets. This enables risk-based pricing (higher-risk borrowers pay higher spreads), selective acceptance, and targeted monitoring. Without a model, the bank either prices all borrowers the same (subsidising the risky with the safe) or relies on subjective judgment that is inconsistent and hard to audit.

**Regulatory compliance (IRB):** Under Basel IRB, banks must assign every obligor to a rating grade with an associated PD. The rating system — whether a judgmental scorecard, a statistical model, or a hybrid — must demonstrate discriminatory power, calibration, and stability. Scoring models are the engine of the IRB rating system.

**Historical context for BAs:**
- **1956:** Fair, Isaac and Company (FICO) introduces the credit score for retail credit — point-based scorecards
- **1968:** Altman publishes the Z-Score for corporate bankruptcy prediction — the first widely used quantitative credit model
- **1974:** Merton structural model — equity as option on assets, providing market-based PD
- **1990s–2000s:** Logistic regression scorecards become standard for retail credit
- **2010s–present:** Machine learning models (XGBoost, neural networks) increasingly used, but with regulatory/explainability constraints

---

## 2. Accounting Concepts

### How Scoring Feeds Impairment

The credit score (or PD derived from the score) directly determines which IFRS 9 stage a loan sits in:

| Score Range | Internal Grade | Approx PD | IFRS 9 Stage | ECL Horizon |
|-------------|---------------|----------|-------------|------------|
| 750–850 (high) | AAA–AA | < 0.10% | Stage 1 | 12-month |
| 650–750 | A–BBB | 0.10%–1.0% | Stage 1 | 12-month |
| 500–650 | BB–B | 1.0%–10% | Stage 1 or 2 (SICR) | 12-month or lifetime |
| 350–500 | CCC | 10%–40% | Stage 2 or 3 | Lifetime |
| < 350 | Default | > 40%+ | Stage 3 | Lifetime |

SICR monitoring: when a borrower's score falls below a defined threshold at origination (e.g., PD increases by more than 50% relative), the exposure moves to Stage 2. The score therefore drives P&L through its impact on stage allocation and ECL quantum.

### Scorecard Validation and Audit

Scorecards are models. Under IFRS 9 and Basel, they are subject to model risk governance:
- Models must be independently validated before use
- Assumptions must be documented and justified
- Annual performance monitoring reports must be produced
- Material model changes require regulatory notification under AIRB

For external auditors: they review scorecard documentation, validation reports, and consistency of model application to form a view on the adequacy of provisions.

---

## 3. Financial Concepts

### The Altman Z-Score (1968)

The original Z-Score was developed using discriminant analysis on US manufacturing companies (1946–1965):

```
Z = 1.2*X1 + 1.4*X2 + 3.3*X3 + 0.6*X4 + 1.0*X5

where:
X1 = Working Capital / Total Assets
     (liquidity and short-term financial health)

X2 = Retained Earnings / Total Assets
     (cumulative profitability; older, profitable firms have high X2)

X3 = EBIT / Total Assets
     (operating profitability; earnings power relative to asset base)

X4 = Market Value of Equity / Book Value of Total Liabilities
     (market-based leverage; equity cushion available to absorb losses)

X5 = Sales / Total Assets
     (asset turnover; efficiency of asset deployment)

Interpretation:
Z > 2.99:         "Safe zone" — unlikely to default
1.81 < Z < 2.99:  "Grey zone" — uncertain
Z < 1.81:         "Distress zone" — high probability of bankruptcy
```

**Altman Z' (for private companies — no market equity):**
```
Z' = 0.717*X1 + 0.847*X2 + 3.107*X3 + 0.420*X4' + 0.998*X5

X4' = Book Value of Equity / Book Value of Total Liabilities
      (replaces market-based X4)

Safe zone:    Z' > 2.90
Grey zone:    1.23 < Z' < 2.90
Distress:     Z' < 1.23
```

**Altman Z'' (for non-manufacturers, including services):**
```
Z'' = 6.56*X1 + 3.26*X2 + 6.72*X3 + 1.05*X4'

Safe zone:    Z'' > 2.60
Grey zone:    1.10 < Z'' < 2.60
Distress:     Z'' < 1.10
```

**Limitations of Z-Score:**
- Based on data from 1946–1965 US manufacturing companies — model may not translate to modern, service-sector, or non-US firms
- Uses only 5 variables — ignores many risk factors (management quality, industry dynamics, debt structure)
- Binary output (bankrupt vs non-bankrupt) — does not produce a calibrated PD
- Grey zone (1.81–2.99) is large and uninformative

### The Merton Distance-to-Default (KMV Model)

See M17 for full derivation. The key output for credit scoring:

```
Distance-to-Default = (V_A - D) / (V_A * σ_A)

where V_A = estimated asset value, D = default boundary (debt),
σ_A = asset volatility

EDF (Expected Default Frequency) = Empirical mapping: N(−DD) → historical default rate
```

The KMV approach uses equity market data (observable) to infer asset value and volatility (unobservable). Key insight: the equity market is continuously updating the DD, providing a real-time, PIT credit indicator. This is why CDS spreads and equity volatility tend to lead agency rating changes — the market incorporates new information faster than rating agencies.

### Expert Scorecards (Points-Based Systems)

Traditional scorecards used by relationship managers:

```
Sample Corporate Scorecard:

Factor                    Weight   Score(1-5)  Weighted Score
Financial Strength           25%      3            0.75
Management Quality           20%      4            0.80
Industry Risk                15%      2            0.30
Market Position              15%      3            0.45
Cash Flow Coverage           15%      4            0.60
Collateral Quality           10%      3            0.30
                                               ─────────────
Total Score (max 5):                              3.20

Score → Grade:
4.0–5.0 → AA/A
3.0–4.0 → BBB
2.0–3.0 → BB
1.0–2.0 → B/CCC
< 1.0   → D
```

Expert scorecards have the advantage of incorporating qualitative factors that financial statements cannot capture (management quality, competitive position). But they suffer from subjectivity, inconsistency across analysts, and lack of calibration to historical default rates.

### Statistical Scorecards — Logistic Regression

The standard approach for retail and increasingly for corporate credit:

```
logit(PD) = β₀ + β₁*X₁ + β₂*X₂ + ... + βₖ*Xₖ

Scorecard scaling (translating log-odds to points):
Score = Offset + Factor * logit(PD)

where:
Factor = PDO (Points to Double the Odds) / ln(2)
Offset = Score at base odds - Factor * ln(base_odds)

Common scaling: 600 points at 1:50 (default:non-default) odds, PDO = 20 points
Score = 600 - (20/ln2) * [β₀ + Σβ_i*X_i - ln(50)]
```

This produces an integer points score (e.g., 300–850 range) where each variable contributes a number of points based on its value. The scorecard is the table that maps each variable's value to a points allocation.

---

## 4. Statistical Concepts

### Weight of Evidence (WoE) Transformation

WoE is used to bin continuous variables and encode them for logistic regression:

```
WoE_i = ln(Distribution of Goods_i / Distribution of Bads_i)

where:
Distribution of Goods_i = % Non-defaults in bin i
Distribution of Bads_i  = % Defaults in bin i

WoE > 0: bin has more non-defaults than average → protective factor
WoE < 0: bin has more defaults than average → risk factor
WoE = 0: bin is neutral
```

Example — Leverage Ratio binning:

| Bin | Leverage Range | # Non-defaults | # Defaults | Dist_Good | Dist_Bad | WoE |
|-----|---------------|----------------|-----------|----------|---------|-----|
| 1 | < 1x | 200 | 2 | 25.0% | 4.0% | ln(25/4) = 1.83 |
| 2 | 1x–3x | 350 | 10 | 43.75% | 20.0% | ln(43.75/20) = 0.78 |
| 3 | 3x–5x | 180 | 20 | 22.50% | 40.0% | ln(22.5/40) = -0.58 |
| 4 | 5x–8x | 60 | 15 | 7.50% | 30.0% | ln(7.5/30) = -1.39 |
| 5 | > 8x | 10 | 3 | 1.25% | 6.0% | ln(1.25/6) = -1.57 |
| **Total** | | **800** | **50** | **100%** | **100%** | |

### Information Value (IV)

IV quantifies how predictive each variable is:

```
IV = Σ [(% Goods_i - % Bads_i) * WoE_i]
   = Σ [(Dist_Good_i - Dist_Bad_i) * ln(Dist_Good_i / Dist_Bad_i)]

For leverage example:
IV = (0.25-0.04)*1.83 + (0.4375-0.20)*0.78 + (0.225-0.40)*(-0.58)
   + (0.075-0.30)*(-1.39) + (0.0125-0.06)*(-1.57)
   = 0.384 + 0.185 + 0.101 + 0.313 + 0.075
   = 1.058  → Very predictive (IV > 0.5)

IV Interpretation:
< 0.02:        Unpredictive — exclude
0.02 – 0.10:   Weak
0.10 – 0.30:   Medium
0.30 – 0.50:   Strong
> 0.50:        Very strong (possibly too predictive — check for data leakage)
```

### ROC Curve and AUC

```
For each score threshold t:
  TPR(t) = True Positive Rate = Defaults correctly classified as bad / Total defaults
  FPR(t) = False Positive Rate = Non-defaults incorrectly classified as bad / Total non-defaults

ROC curve: plot (FPR(t), TPR(t)) for all t from 0 to max_score
AUC = ∫TPR dFPR (area under the curve)

AUC = 0.50: Random model (diagonal line)
AUC = 1.00: Perfect model
AUC > 0.75: Acceptable for corporate credit
AUC > 0.80: Good
AUC > 0.90: Excellent (rare in real credit models)
```

### Gini Coefficient

```
Gini = 2 * AUC - 1

Ranges from 0 (random) to 1 (perfect)
Also equals: Gini = (AUC - 0.5) / 0.5 = normalised deviation from random

Gini = 60% → AUC = 0.80
Gini = 50% → AUC = 0.75
```

### KS Statistic

```
KS = max_t | F_defaults(t) - F_non-defaults(t) |

where F_defaults(t) = cumulative % of defaults with score ≤ t
      F_non-defaults(t) = cumulative % of non-defaults with score ≤ t

Interpretation: KS = 40% means that at the optimal threshold, 40% more defaults
are correctly classified relative to non-defaults.
KS > 30%: Acceptable; KS > 40%: Good; KS > 50%: Very Good
```

### Calibration vs Discrimination

A model can discriminate well (high AUC/Gini) but be poorly calibrated (predicted PD ≠ observed default rate). These are separate model properties:
- **Discrimination:** Does the model correctly rank-order obligors by risk? (AUC, Gini, KS)
- **Calibration:** Are the absolute PD values correct? (Hosmer-Lemeshow test, calibration plot)

For IRB: both are required. A model with Gini = 65% but systematically underpredicting PD will produce inadequate provisions — good discrimination is not sufficient.

---

## 5. Regulatory Framework

### Basel III IRB — Rating System Requirements (CRR Art. 170–179)

- Rating systems must have at least 7 grades for non-defaulted obligors (1 for defaulted = Grade 8)
- No single grade should have more than 30% of the portfolio
- Both borrower risk (PD) and transaction characteristics (LGD, EAD) must be captured
- Rating must be reviewed at least annually
- Override policy: overrides from model-suggested grade must be documented, limited, and monitored
- Shadow rating: for AIRB banks using models, the "shadow" mapping between model score and PD must be stable and consistent

### Model Risk Management (MRM)

EBA GL/2023/05 on model risk management requires:
- **Model inventory:** Register of all models used in risk decisions
- **Model validation:** Independent validation before model deployment
- **Ongoing monitoring:** Annual/quarterly performance metrics
- **Model risk classification:** Low/medium/high materiality based on usage and impact
- **Change management:** Material changes require re-validation and regulatory notification (for IRB models)

### SR 11-7 / SS1/23 (US/UK Guidance)

The Federal Reserve's SR 11-7 Letter (2011) and PRA's SS1/23 define model risk management expectations:
- Define "model" broadly: any quantitative method used in credit decisions
- Three lines of defence: model users, model risk management, internal audit
- Model risk appetite statement required
- Model performance thresholds and remediation triggers must be pre-defined

---

## 6. Data Required

### Scorecard Development Dataset

| Variable | Description | Expected Direction | Data Source |
|---------|------------|-------------------|------------|
| Leverage (Debt/EBITDA) | Financial leverage | Higher → higher PD | Spreading system |
| Interest Coverage (EBITDA/Interest) | Debt serviceability | Lower → higher PD | Spreading system |
| EBITDA Margin | Profitability | Lower → higher PD | Spreading system |
| Current Ratio | Liquidity | Lower → higher PD | Spreading system |
| Revenue Growth (YoY %) | Business momentum | Lower/negative → higher PD | Spreading system |
| Log(Total Assets) | Size proxy | Smaller → higher PD | Spreading system |
| Days Sales Outstanding | Receivables quality | Higher → higher PD | Spreading system |
| Debt/Equity | Book leverage | Higher → higher PD | Spreading system |
| Industry | Sector risk | Cyclical → higher PD | CRM / NAICS |
| Years in Business | Franchise age | Newer → higher PD | CRM |
| Default Flag | 0/1 per Basel Art. 178 | Target variable | Credit events DB |
| Default Date | Date of default | For time horizon | Credit events DB |

### Training/Validation/Test Split

```
Temporal split (preferred for time-series-like data):
Training:   2012–2018 data (7 years, minimum for AIRB)
Validation: 2019–2020 data (held-out for threshold-setting)
Test:       2021–2023 data (final out-of-time performance evaluation)

Never use random splits for credit data — avoids look-ahead bias.
```

### Scorecard Development Minimum Sample

| Portfolio | Minimum Defaults | Recommended |
|---------|----------------|------------|
| Large corporate | 100 | 500+ |
| Mid-market corporate | 200 | 1,000+ |
| SME | 500 | 2,000+ |
| Retail (mortgage, unsecured) | 2,000+ | 10,000+ |

---

## 7. How Analysts Actually Work

**Step 1 — Data extraction and audit.** Pull 7+ years of obligor financial data and default events from the data warehouse. This is typically 40%–60% of the total project time. Data quality checks: are defaults coded consistently? Are financial ratios comparable across years? Missing data handling (imputation or exclusion)?

**Step 2 — Variable selection.** Calculate IV for 30–50 candidate variables. Short-list those with IV > 0.10. Check for multicollinearity (correlation matrix). Exclude variables that are not available at model scoring time (avoid data leakage — e.g., don't include "specific provision raised" as a predictor because that is determined after the credit assessment).

**Step 3 — Binning and WoE transformation.** For each selected variable, determine optimal bin boundaries (using monotonic WoE as a constraint — except for U-shaped relationships). Transform each variable to its WoE value.

**Step 4 — Logistic regression.** Fit logistic regression on WoE-transformed variables. Use L1 or L2 regularisation if sample is small. Stepwise selection or information criteria (AIC/BIC) to select final variable set (typically 8–15 variables).

**Step 5 — Scorecard scaling.** Convert logistic regression coefficients to a points-based scorecard (integer points per variable bin). Calibrate the total points to produce a PD (using the logit → PD mapping).

**Step 6 — Validation.** Out-of-time/out-of-sample validation: AUC, Gini, KS, calibration plot. Population stability index (PSI) to check that the scoring population matches the development population.

**Step 7 — Documentation and governance.** Model documentation: data sources, variable selection rationale, methodology, validation results, limitations. Independent validation team review. Risk committee approval. For IRB models: regulatory submission.

**Practical frustrations:**
- Development data often has inconsistent financial statement formats (different accounting standards across time)
- Business lines object to specific variables ("you can't penalise clients in the construction sector — that's our core market")
- Overcrowding in the grey zone — many models cluster obligors around the same score
- WoE monotonicity vs predictive power trade-offs

---

## 8. Excel Implementation

### Altman Z-Score Calculator

```excel
Sheet: "ZScore"

Company: "ABC Manufacturing Ltd"
Fiscal Year End: 31/12/2024

Balance Sheet Inputs:
Working Capital          B5: £12,500,000   (Current Assets - Current Liabilities)
Total Assets             B6: £85,000,000
Retained Earnings        B7: £18,000,000
Total Liabilities        B8: £52,000,000
Market Cap (if listed)   B9: £45,000,000   (or Book Equity if private)
Book Equity (private)   B10: £33,000,000

Income Statement:
EBIT                    B13: £9,500,000
Sales                   B14: £120,000,000

Ratios:
X1 (Working Cap/Assets): =B5/B6   →  0.147
X2 (Ret Earn/Assets):   =B7/B6   →  0.212
X3 (EBIT/Assets):       =B13/B6  →  0.112
X4 (Market Cap/TL):     =B9/B8   →  0.865   [use B10/B8 for private Z']
X5 (Sales/Assets):      =B14/B6  →  1.412

Z-Score (public):  =1.2*X1 + 1.4*X2 + 3.3*X3 + 0.6*X4 + 1.0*X5
                 = 1.2*0.147 + 1.4*0.212 + 3.3*0.112 + 0.6*0.865 + 1.0*1.412
                 = 0.177 + 0.297 + 0.370 + 0.519 + 1.412
                 = 2.775  →  "Grey Zone" (1.81–2.99)

Z'-Score (private): =0.717*X1 + 0.847*X2 + 3.107*X3 + 0.420*(B10/B8) + 0.998*X5

Classification: =IF(ZScore>2.99,"Safe",IF(ZScore>1.81,"Grey Zone","Distress"))
```

### WoE Calculation Table

```excel
Sheet: "WoE_Table"
Variable: Leverage Ratio (Debt/EBITDA)

A: Bin Label  B: Min  C: Max  D: #Non-def  E: #Default  F: Dist_Good  G: Dist_Bad  H: WoE  I: IV_Component

Row 2: "<1x"  0   1   200   2   =D2/SUM($D:$D)  =E2/SUM($E:$E)  =LN(F2/G2)  =(F2-G2)*H2
Row 3: "1-3x" 1   3   350  10   ...
...

Total IV: =SUM(I:I)   →   must be > 0.10 for variable to be selected
```

### Scorecard Points Calculator

```excel
Sheet: "Scorecard"
PDO = 20, Base Score = 600, Base Odds = 50

Factor = PDO/LN(2) = =20/LN(2) = 28.85

Variable: Leverage Ratio
  Coefficient from logistic regression: β = 0.45
  WoE for bin "3–5x":                   WoE = -0.58

  Points contribution = -Factor * β * WoE
                     = -28.85 * 0.45 * (-0.58)
                     = 7.54 → round to 8 points

Total Score = Offset + Σ(Points per variable)
  Offset = Base_Score - Factor * (β₀ + ln(base_odds))
         = 600 - 28.85 * (-5.5 + ln(50))
         = 600 - 28.85 * (-5.5 + 3.912)
         = 600 - 28.85 * (-1.588)
         = 600 + 45.8 = 645.8

Mapping Score → PD:
PD = 1/(1 + odds)
odds = base_odds * 2^((Score - Base_Score)/PDO)
     = 50 * 2^((Score - 600)/20)

For Score = 550: odds = 50 * 2^(-2.5) = 50 * 0.177 = 8.84 → PD = 1/(1+8.84) = 10.2%
For Score = 700: odds = 50 * 2^(5) = 50 * 32 = 1600 → PD = 1/(1+1600) = 0.062%
```

---

## 9. SQL Implementation

```sql
-- ============================================================
-- M21: CREDIT SCORING — VARIABLE ANALYSIS AND WOE CALCULATION
-- ============================================================

-- Step 1: Base dataset — obligors with financial data and default flag
WITH base_data AS (
    SELECT
        o.OBLIGOR_ID,
        o.DEFAULT_FLAG,
        -- Financial ratios from most recent spreading data
        s.DEBT_EBITDA                   AS leverage,
        s.EBITDA_INTEREST               AS interest_coverage,
        s.EBITDA_MARGIN,
        s.CURRENT_RATIO,
        s.REVENUE_GROWTH_YOY,
        LOG(s.TOTAL_ASSETS)             AS log_total_assets,
        o.INDUSTRY_CATEGORY,
        o.YEARS_IN_BUSINESS
    FROM obligors o
    INNER JOIN (
        -- Most recent annual financial data per obligor
        SELECT OBLIGOR_ID, DEBT_EBITDA, EBITDA_INTEREST, EBITDA_MARGIN,
               CURRENT_RATIO, REVENUE_GROWTH_YOY, TOTAL_ASSETS,
               ROW_NUMBER() OVER (PARTITION BY OBLIGOR_ID
                                  ORDER BY FISCAL_YEAR_END DESC) AS rn
        FROM financial_spreads
        WHERE FISCAL_YEAR_END <= DATEADD(YEAR, -1, GETDATE())
    ) s ON o.OBLIGOR_ID = s.OBLIGOR_ID AND s.rn = 1
    WHERE o.OBSERVATION_DATE BETWEEN '2015-01-01' AND '2023-12-31'
),

-- Step 2: Population statistics
population AS (
    SELECT
        COUNT(*)                                            AS total_n,
        SUM(DEFAULT_FLAG)                                   AS total_defaults,
        COUNT(*) - SUM(DEFAULT_FLAG)                        AS total_non_defaults
    FROM base_data
),

-- Step 3: WoE for Leverage (Debt/EBITDA) with manual bins
leverage_bins AS (
    SELECT
        CASE
            WHEN leverage < 1.0 THEN '01_<1x'
            WHEN leverage < 2.0 THEN '02_1-2x'
            WHEN leverage < 3.5 THEN '03_2-3.5x'
            WHEN leverage < 5.0 THEN '04_3.5-5x'
            WHEN leverage < 8.0 THEN '05_5-8x'
            ELSE '06_>8x'
        END                                                 AS bin_label,
        DEFAULT_FLAG
    FROM base_data
    WHERE leverage IS NOT NULL
),

leverage_woe AS (
    SELECT
        lb.bin_label,
        COUNT(*)                                            AS n_total,
        SUM(DEFAULT_FLAG)                                   AS n_defaults,
        COUNT(*) - SUM(DEFAULT_FLAG)                        AS n_non_defaults,
        -- Distribution of goods and bads
        CAST(COUNT(*) - SUM(DEFAULT_FLAG) AS FLOAT)
            / p.total_non_defaults                          AS dist_good,
        CAST(SUM(DEFAULT_FLAG) AS FLOAT)
            / p.total_defaults                              AS dist_bad,
        -- WoE = ln(dist_good / dist_bad)
        LOG(
            CAST(COUNT(*) - SUM(DEFAULT_FLAG) AS FLOAT)
                / NULLIF(p.total_non_defaults, 0)
            /
            (CAST(SUM(DEFAULT_FLAG) AS FLOAT)
                / NULLIF(p.total_defaults, 0))
        )                                                   AS woe,
        -- IV component = (dist_good - dist_bad) * WoE
        (
            CAST(COUNT(*) - SUM(DEFAULT_FLAG) AS FLOAT) / p.total_non_defaults
            - CAST(SUM(DEFAULT_FLAG) AS FLOAT) / p.total_defaults
        ) * LOG(
            (CAST(COUNT(*) - SUM(DEFAULT_FLAG) AS FLOAT) / p.total_non_defaults)
            / (CAST(SUM(DEFAULT_FLAG) AS FLOAT) / p.total_defaults)
        )                                                   AS iv_component
    FROM leverage_bins lb
    CROSS JOIN population p
    GROUP BY lb.bin_label, p.total_non_defaults, p.total_defaults
)

SELECT
    bin_label,
    n_total,
    n_defaults,
    ROUND(CAST(n_defaults AS FLOAT)/n_total * 100, 2)  AS default_rate_pct,
    ROUND(dist_good * 100, 2)                          AS dist_good_pct,
    ROUND(dist_bad * 100, 2)                           AS dist_bad_pct,
    ROUND(woe, 4)                                      AS woe,
    ROUND(iv_component, 4)                             AS iv_component
FROM leverage_woe
ORDER BY bin_label;

-- Total IV for the variable
-- SELECT SUM(iv_component) AS total_iv FROM leverage_woe → should be > 0.10

-- ============================================================
-- MODEL SCORING: Apply scorecard to current portfolio
-- ============================================================

WITH scorecard_mapping AS (
    -- Points lookup table (pre-computed from logistic regression)
    -- Format: variable_name | bin_condition | points
    SELECT 'leverage' AS var, '<1x' AS bin, 35 AS points
    UNION ALL SELECT 'leverage','1-2x', 28
    UNION ALL SELECT 'leverage','2-3.5x', 18
    UNION ALL SELECT 'leverage','3.5-5x', 8
    UNION ALL SELECT 'leverage','5-8x', -5
    UNION ALL SELECT 'leverage','>8x', -18
    UNION ALL SELECT 'interest_coverage','<1x', -20
    UNION ALL SELECT 'interest_coverage','1-2x', -8
    UNION ALL SELECT 'interest_coverage','2-4x', 5
    UNION ALL SELECT 'interest_coverage','4-8x', 18
    UNION ALL SELECT 'interest_coverage','>8x', 28
    -- ... additional variables
),

portfolio_scored AS (
    SELECT
        o.OBLIGOR_ID,
        s.DEBT_EBITDA,
        s.EBITDA_INTEREST,
        -- Assign bin for leverage
        CASE
            WHEN s.DEBT_EBITDA < 1.0 THEN '<1x'
            WHEN s.DEBT_EBITDA < 2.0 THEN '1-2x'
            WHEN s.DEBT_EBITDA < 3.5 THEN '2-3.5x'
            WHEN s.DEBT_EBITDA < 5.0 THEN '3.5-5x'
            WHEN s.DEBT_EBITDA < 8.0 THEN '5-8x'
            ELSE '>8x'
        END                                                 AS lev_bin,
        -- Assign bin for coverage
        CASE
            WHEN s.EBITDA_INTEREST < 1.0 THEN '<1x'
            WHEN s.EBITDA_INTEREST < 2.0 THEN '1-2x'
            WHEN s.EBITDA_INTEREST < 4.0 THEN '2-4x'
            WHEN s.EBITDA_INTEREST < 8.0 THEN '4-8x'
            ELSE '>8x'
        END                                                 AS cov_bin
    FROM obligors o
    JOIN financial_spreads s ON o.OBLIGOR_ID = s.OBLIGOR_ID
),

final_scores AS (
    SELECT
        ps.OBLIGOR_ID,
        600 -- base offset
        + COALESCE((SELECT points FROM scorecard_mapping
                    WHERE var='leverage' AND bin=ps.lev_bin), 0)
        + COALESCE((SELECT points FROM scorecard_mapping
                    WHERE var='interest_coverage' AND bin=ps.cov_bin), 0)
        -- + more variables...
                                                            AS total_score,
        -- Convert score to PD
        1.0 / (1.0 + 50.0 * POWER(2.0, (
            600 -- base offset
            + COALESCE((SELECT points FROM scorecard_mapping
                        WHERE var='leverage' AND bin=ps.lev_bin), 0)
            + COALESCE((SELECT points FROM scorecard_mapping
                        WHERE var='interest_coverage' AND bin=ps.cov_bin), 0)
            - 600.0) / 20.0))                              AS model_pd
    FROM portfolio_scored ps
)

SELECT
    OBLIGOR_ID,
    total_score,
    ROUND(model_pd * 100, 4)    AS model_pd_pct,
    CASE
        WHEN total_score >= 700 THEN 'A/AA'
        WHEN total_score >= 640 THEN 'BBB'
        WHEN total_score >= 580 THEN 'BB'
        WHEN total_score >= 520 THEN 'B'
        ELSE 'CCC/D'
    END                         AS implied_grade
FROM final_scores
ORDER BY total_score DESC;
```

---

## 10. Python Implementation

```python
"""
M21_Credit_Scoring.py
Full Scorecard Development Pipeline:
Data Prep → WoE/IV → Logistic Regression → Scorecard Scaling → Validation
"""

import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_predict
from sklearn.metrics import roc_auc_score, roc_curve
from sklearn.preprocessing import StandardScaler
from scipy.stats import ks_2samp
import warnings
warnings.filterwarnings('ignore')

# ============================================================
# 1. ALTMAN Z-SCORE CALCULATOR
# ============================================================

def altman_z_score(working_capital: float, total_assets: float,
                    retained_earnings: float, ebit: float,
                    equity_value: float, total_liabilities: float,
                    sales: float, model: str = 'original') -> dict:
    """
    Calculate Altman Z-Score.

    model: 'original' (public), 'prime' (private), 'double_prime' (non-manufacturer)
    equity_value: Market cap for 'original', book equity for 'prime'/'double_prime'
    """
    X1 = working_capital / total_assets
    X2 = retained_earnings / total_assets
    X3 = ebit / total_assets
    X4 = equity_value / total_liabilities
    X5 = sales / total_assets

    if model == 'original':
        Z = 1.2*X1 + 1.4*X2 + 3.3*X3 + 0.6*X4 + 1.0*X5
        zone = 'Safe' if Z > 2.99 else ('Grey Zone' if Z > 1.81 else 'Distress')
    elif model == 'prime':
        Z = 0.717*X1 + 0.847*X2 + 3.107*X3 + 0.420*X4 + 0.998*X5
        zone = 'Safe' if Z > 2.90 else ('Grey Zone' if Z > 1.23 else 'Distress')
    elif model == 'double_prime':
        Z = 6.56*X1 + 3.26*X2 + 6.72*X3 + 1.05*X4
        zone = 'Safe' if Z > 2.60 else ('Grey Zone' if Z > 1.10 else 'Distress')
    else:
        raise ValueError("model must be 'original', 'prime', or 'double_prime'")

    return {'Z': Z, 'zone': zone, 'X1': X1, 'X2': X2, 'X3': X3, 'X4': X4, 'X5': X5}


# Example company
result = altman_z_score(
    working_capital=12_500_000, total_assets=85_000_000,
    retained_earnings=18_000_000, ebit=9_500_000,
    equity_value=45_000_000, total_liabilities=52_000_000,
    sales=120_000_000, model='original'
)
print(f"Altman Z-Score: {result['Z']:.3f} → {result['zone']}")
print(f"  X1 (Working Capital/Assets): {result['X1']:.3f}")
print(f"  X2 (Retained Earnings/Assets): {result['X2']:.3f}")
print(f"  X3 (EBIT/Assets): {result['X3']:.3f}")
print(f"  X4 (Equity/Liabilities): {result['X4']:.3f}")
print(f"  X5 (Sales/Assets): {result['X5']:.3f}")

# ============================================================
# 2. SYNTHETIC DATASET FOR SCORECARD DEVELOPMENT
# ============================================================

np.random.seed(42)
n = 5000  # 5,000 corporate obligors

df = pd.DataFrame({
    'leverage':           np.random.lognormal(1.2, 0.6, n).clip(0.2, 15),
    'interest_coverage':  np.random.lognormal(1.8, 0.7, n).clip(0.2, 25),
    'ebitda_margin':      np.random.normal(0.14, 0.07, n).clip(0.01, 0.45),
    'current_ratio':      np.random.lognormal(0.4, 0.4, n).clip(0.3, 4),
    'revenue_growth':     np.random.normal(0.03, 0.15, n).clip(-0.40, 0.60),
    'log_assets':         np.random.normal(12.5, 1.8, n),
    'years_in_business':  np.random.exponential(10, n).clip(1, 50),
    'cyclical_industry':  np.random.binomial(1, 0.35, n),
})

# True default model
log_odds = (-5.8
            + 0.38 * df['leverage']
            - 0.42 * df['interest_coverage']
            - 4.5 * df['ebitda_margin']
            - 0.6 * df['current_ratio']
            - 1.2 * df['revenue_growth']
            - 0.08 * df['log_assets']
            - 0.04 * df['years_in_business']
            + 0.55 * df['cyclical_industry'])

true_pd = 1 / (1 + np.exp(-log_odds))
df['default_flag'] = np.random.binomial(1, true_pd)

print(f"\nDataset: {n} obligors, {df['default_flag'].sum()} defaults "
      f"({df['default_flag'].mean()*100:.2f}% default rate)")

# ============================================================
# 3. WoE / IV CALCULATION
# ============================================================

def calculate_woe_iv(df: pd.DataFrame, var: str, target: str,
                      bins: list) -> pd.DataFrame:
    """
    Calculate WoE and IV for a single variable with manual bins.

    bins: list of bin boundaries (right-exclusive except last)
    """
    total_good = (df[target] == 0).sum()
    total_bad = df[target].sum()

    labels = [f'Bin_{i+1}' for i in range(len(bins)-1)]
    df_temp = df[[var, target]].copy()
    df_temp['bin'] = pd.cut(df_temp[var], bins=bins, labels=labels, include_lowest=True)

    woe_table = []
    for label in labels:
        subset = df_temp[df_temp['bin'] == label]
        n_good = (subset[target] == 0).sum()
        n_bad = subset[target].sum()
        dist_good = n_good / total_good if total_good > 0 else 1e-9
        dist_bad = n_bad / total_bad if total_bad > 0 else 1e-9
        # Add small epsilon to avoid log(0)
        dist_good = max(dist_good, 1e-9)
        dist_bad = max(dist_bad, 1e-9)
        woe = np.log(dist_good / dist_bad)
        iv_comp = (dist_good - dist_bad) * woe
        woe_table.append({
            'bin': label,
            'n_total': len(subset),
            'n_good': n_good,
            'n_bad': n_bad,
            'default_rate': n_bad / max(len(subset), 1),
            'dist_good': dist_good,
            'dist_bad': dist_bad,
            'woe': woe,
            'iv_component': iv_comp,
        })

    result = pd.DataFrame(woe_table)
    result['total_iv'] = result['iv_component'].sum()
    return result


# WoE for leverage
leverage_woe = calculate_woe_iv(df, 'leverage', 'default_flag',
                                  bins=[0, 1, 2, 3.5, 5, 8, 20])
print("\nWoE Analysis — Leverage Ratio:")
print(f"Total IV: {leverage_woe['total_iv'].iloc[0]:.4f}")
print(leverage_woe[['bin','n_total','n_bad','default_rate','woe','iv_component']].to_string(index=False))

# IV for all variables
variable_bins = {
    'leverage': [0, 1, 2, 3.5, 5, 8, 20],
    'interest_coverage': [0, 1, 2, 4, 8, 30],
    'ebitda_margin': [-0.5, 0.02, 0.08, 0.15, 0.25, 0.5],
    'current_ratio': [0, 0.8, 1.2, 1.8, 2.5, 5],
    'revenue_growth': [-0.5, -0.10, 0.0, 0.05, 0.15, 0.7],
    'log_assets': [0, 11, 12, 13, 14, 20],
}

iv_summary = {}
for var, bins in variable_bins.items():
    woe_df = calculate_woe_iv(df, var, 'default_flag', bins)
    iv_summary[var] = woe_df['total_iv'].iloc[0]

print("\nInformation Value Summary:")
for var, iv in sorted(iv_summary.items(), key=lambda x: -x[1]):
    strength = ('Very Strong' if iv > 0.5 else 'Strong' if iv > 0.3 else
                'Medium' if iv > 0.1 else 'Weak' if iv > 0.02 else 'Unpredictive')
    print(f"  {var:30s}: IV = {iv:.4f}  ({strength})")

# ============================================================
# 4. LOGISTIC REGRESSION SCORECARD
# ============================================================

# Apply WoE transformation to features
def apply_woe(df: pd.DataFrame, woe_maps: dict) -> pd.DataFrame:
    """Transform variables to WoE values using precomputed WoE tables."""
    df_woe = df.copy()
    for var, woe_table in woe_maps.items():
        # Create a mapping from bin label to WoE value
        bin_to_woe = dict(zip(woe_table['bin'], woe_table['woe']))
        bins = variable_bins[var]
        labels = [f'Bin_{i+1}' for i in range(len(bins)-1)]
        df_woe[f'{var}_woe'] = pd.cut(
            df_woe[var], bins=bins, labels=labels, include_lowest=True
        ).map(bin_to_woe)
    return df_woe


# Compute WoE tables for all selected variables
woe_maps = {var: calculate_woe_iv(df, var, 'default_flag', bins)
             for var, bins in variable_bins.items()}

df_woe = apply_woe(df, woe_maps)
woe_features = [f'{var}_woe' for var in variable_bins.keys()]

X = df_woe[woe_features].fillna(0)
y = df['default_flag']

# Logistic regression (no scaling needed for WoE-transformed features)
lr = LogisticRegression(penalty='l2', C=1.0, solver='lbfgs', max_iter=500, random_state=42)

skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
oof_probs = cross_val_predict(lr, X, y, cv=skf, method='predict_proba')[:, 1]

auc = roc_auc_score(y, oof_probs)
gini = 2 * auc - 1

print(f"\nLogistic Regression Scorecard Performance:")
print(f"  AUC:  {auc:.4f}")
print(f"  Gini: {gini:.4f}")

# KS Statistic
defaults_scores = oof_probs[y == 1]
non_defaults_scores = oof_probs[y == 0]
ks_stat, _ = ks_2samp(defaults_scores, non_defaults_scores)
print(f"  KS:   {ks_stat:.4f}")

# ============================================================
# 5. SCORECARD SCALING (Points-Based)
# ============================================================

# Fit final model on full dataset
lr.fit(X, y)

# Scorecard parameters
PDO = 20       # Points to Double the Odds
BASE_SCORE = 600
BASE_ODDS = 50  # Non-default:default ratio (50:1 = ~2% default rate)

factor = PDO / np.log(2)
offset = BASE_SCORE - factor * (lr.intercept_[0] + np.log(BASE_ODDS))

print(f"\nScorecard Scaling Parameters:")
print(f"  PDO:        {PDO}")
print(f"  Base Score: {BASE_SCORE}")
print(f"  Base Odds:  {BASE_ODDS}:1")
print(f"  Factor:     {factor:.4f}")
print(f"  Offset:     {offset:.4f}")

# Points per variable per bin
print("\nPoints Allocation by Variable and Bin:")
for i, var in enumerate(variable_bins.keys()):
    coef = lr.coef_[0][i]
    woe_table = woe_maps[var]
    print(f"\n  {var} (β = {coef:.4f}):")
    print(f"  {'Bin':>8} {'WoE':>8} {'Points':>8}")
    for _, row in woe_table.iterrows():
        points = round(-factor * coef * row['woe'])
        print(f"  {row['bin']:>8} {row['woe']:>8.3f} {points:>8.0f}")

# Score-to-PD mapping table
print("\nScore to PD Mapping:")
print(f"{'Score':>6} {'Odds':>10} {'PD (%)':>10} {'Grade':>8}")
for score in [400, 450, 500, 550, 600, 650, 700, 750, 800]:
    odds = BASE_ODDS * 2 ** ((score - BASE_SCORE) / PDO)
    pd_val = 1 / (1 + odds) * 100
    if pd_val > 10:     grade = 'B/CCC'
    elif pd_val > 2.5:  grade = 'BB'
    elif pd_val > 0.5:  grade = 'BBB'
    elif pd_val > 0.1:  grade = 'A'
    else:               grade = 'AA/AAA'
    print(f"{score:>6} {odds:>10.1f} {pd_val:>9.4f}% {grade:>8}")

# ============================================================
# 6. ROC CURVE AND CALIBRATION
# ============================================================

fpr, tpr, thresholds = roc_curve(y, oof_probs)

# Calibration decile table
sorted_idx = np.argsort(oof_probs)
deciles = np.array_split(sorted_idx, 10)

print("\nCalibration Table (Hosmer-Lemeshow):")
print(f"{'Decile':>8} {'N':>6} {'Pred PD%':>10} {'Obs DR%':>10} {'Ratio':>8}")
for i, grp in enumerate(deciles):
    pred = oof_probs[grp].mean()
    obs = y.iloc[grp].mean()
    ratio = pred / obs if obs > 0 else np.inf
    flag = '*' if ratio < 0.75 or ratio > 1.33 else ''
    print(f"{i+1:>8} {len(grp):>6} {pred*100:>9.3f}% {obs*100:>9.3f}% {ratio:>7.2f}x {flag}")

# ============================================================
# 7. POPULATION STABILITY INDEX (PSI)
# ============================================================

def calculate_psi(expected_scores: np.ndarray,
                   actual_scores: np.ndarray,
                   n_bins: int = 10) -> dict:
    """
    PSI measures shift in score distribution from development to monitoring period.

    PSI < 0.10: No significant shift
    0.10–0.25:  Moderate shift — investigate
    > 0.25:     Significant shift — model re-development warranted
    """
    # Create bins based on expected distribution
    bin_edges = np.percentile(expected_scores, np.linspace(0, 100, n_bins + 1))
    bin_edges[0] = -np.inf
    bin_edges[-1] = np.inf

    expected_counts = np.histogram(expected_scores, bins=bin_edges)[0]
    actual_counts = np.histogram(actual_scores, bins=bin_edges)[0]

    # Convert to proportions
    expected_pct = np.maximum(expected_counts / len(expected_scores), 1e-9)
    actual_pct = np.maximum(actual_counts / len(actual_scores), 1e-9)

    psi_components = (actual_pct - expected_pct) * np.log(actual_pct / expected_pct)
    psi = psi_components.sum()

    return {
        'psi': psi,
        'interpretation': ('Stable' if psi < 0.10 else
                           'Moderate Shift' if psi < 0.25 else
                           'Significant Shift'),
        'bin_breakdown': pd.DataFrame({
            'expected_pct': expected_pct * 100,
            'actual_pct': actual_pct * 100,
            'psi_component': psi_components
        })
    }


# Simulate a shifted monitoring population (e.g., new business mix)
np.random.seed(99)
monitoring_df = pd.DataFrame({
    'leverage':           np.random.lognormal(1.4, 0.6, 1000).clip(0.2, 15),  # Slightly higher leverage
    'interest_coverage':  np.random.lognormal(1.6, 0.7, 1000).clip(0.2, 25),
    'ebitda_margin':      np.random.normal(0.12, 0.07, 1000).clip(0.01, 0.45),
    'current_ratio':      np.random.lognormal(0.35, 0.4, 1000).clip(0.3, 4),
    'revenue_growth':     np.random.normal(0.01, 0.15, 1000).clip(-0.40, 0.60),
    'log_assets':         np.random.normal(12.3, 1.8, 1000),
})
monitoring_woe = apply_woe(monitoring_df, woe_maps)
X_monitoring = monitoring_woe[[f'{v}_woe' for v in variable_bins.keys()]].fillna(0)
monitoring_scores = lr.predict_proba(X_monitoring)[:, 1]

psi_result = calculate_psi(oof_probs, monitoring_scores)
print(f"\nPopulation Stability Index (PSI):")
print(f"  PSI = {psi_result['psi']:.4f} → {psi_result['interpretation']}")
```

---

## 11. Interview Questions

**Q1: Walk me through the Altman Z-Score formula. What does each component measure?**

*Answer:* Z = 1.2X1 + 1.4X2 + 3.3X3 + 0.6X4 + 1.0X5. X1 (Working Capital/Total Assets) measures short-term liquidity — firms with negative working capital struggle to meet near-term obligations. X2 (Retained Earnings/Total Assets) captures cumulative profitability; high retained earnings relative to assets indicate a history of profitable operations and less reliance on debt financing. X3 (EBIT/Total Assets) measures operating earning power independent of capital structure and taxes — the single most important factor in the original model. X4 (Market Value of Equity/Total Liabilities) is the equity cushion available to absorb asset losses before insolvency — a market-based measure of solvency. X5 (Sales/Total Assets) measures asset turnover; it was included partly to reduce industry bias.

**Q2: What is Weight of Evidence (WoE) and why do we use it in scorecards?**

*Answer:* WoE = ln(% Non-defaults in bin / % Defaults in bin). It quantifies how different a particular bin of a variable is from the overall distribution of defaults vs non-defaults. Positive WoE means the bin has proportionally more non-defaults (safer); negative WoE means more defaults (riskier). WoE transformation has several advantages: (1) It converts all variables to a common scale, making logistic regression coefficients easier to interpret. (2) It handles non-linear relationships through binning. (3) Missing values can be assigned their own bin with a meaningful WoE. (4) It quantifies discriminatory power at the bin level, making it easy to explain to business users (e.g., "borrowers with leverage > 8x have a strongly negative WoE — they are 3× more likely to be defaults than non-defaults").

**Q3: A credit scorecard has AUC = 0.82 but the Hosmer-Lemeshow test is highly significant (p < 0.001). What does this mean and what do you do?**

*Answer:* AUC = 0.82 means the model has excellent rank-ordering ability — it correctly identifies which borrowers are more likely to default. However, the significant H-L test indicates that the predicted PD values are not well calibrated to observed default rates. For example, the model might assign a PD of 2% to obligors that are actually defaulting at 5%. This is a separation between discrimination (good) and calibration (poor). The fix is typically recalibration: after the model ranks obligors, fit a monotonic logistic function that maps the raw scores to a PD scale that matches observed default rates in each decile. This preserves the ranking while correcting the absolute PD estimates. For IRB purposes, both discrimination and calibration are required — calibration failures are the most common TRIM finding.

**Q4: What is the Population Stability Index (PSI) and when would you trigger a model review?**

*Answer:* PSI measures the shift in the score distribution between the model development population and a new monitoring population: PSI = Σ(Actual% - Expected%) × ln(Actual%/Expected%) across score bands. PSI < 0.10 = stable (no action needed); 0.10–0.25 = moderate shift, investigation required; > 0.25 = significant shift, model re-development likely warranted. PSI detects model drift caused by changes in the lending population (new business mix), changes in credit quality, or macroeconomic shifts. A rising PSI in a corporate scorecard during an economic downturn is expected and informative — it signals that the portfolio has moved to worse score bands, consistent with macro deterioration.

**Q5: Compare logistic regression scorecards to machine learning models (XGBoost, neural networks) for corporate credit. Why do banks still use logistic regression despite lower AUC?**

*Answer:* Machine learning models typically achieve 3%–8% higher AUC than logistic regression scorecards on the same data because they capture non-linear interactions and higher-order effects. However, banks favour logistic regression for corporate credit because: (1) **Explainability (SR 11-7/SS1/23):** Regulators require that individual credit decisions can be explained to the borrower. A logistic regression scorecard produces a clear points breakdown. XGBoost produces a black-box score. (2) **IRB compliance:** EBA guidelines require that rating models can be validated and challenged. Complex ML models are harder to validate and auditors cannot independently verify individual predictions. (3) **Overfitting risk:** Corporate default datasets are small (hundreds to low thousands of defaults). ML models need large datasets to generalise; logistic regression with regularisation is more robust. (4) **Model governance:** Changing coefficients in a logistic regression is a traceable, auditable action. Retraining an XGBoost model every quarter with updated data creates instability and governance challenges.

---

## 12. Common Mistakes

**Mistake 1 — Data leakage: including post-default information as predictors.**
A model that includes "specific provision raised" or "days past due at scoring date" as a predictor will have artificially high AUC because these variables are determined after the credit event, not before. Data leakage is the most common error in credit scorecard development. Strict temporal cutoffs are essential: all predictor variables must be observed before the default event.

**Mistake 2 — Using the full dataset for ROC/AUC without out-of-sample testing.**
An in-sample AUC of 0.90 on the training data might fall to 0.72 on out-of-time test data due to overfitting. Always use temporal out-of-time validation: train on 2012–2018, test on 2019–2021. Never report the in-sample AUC as the model's performance metric.

**Mistake 3 — Ignoring the monotonicity constraint in WoE binning.**
WoE should be monotonically increasing or decreasing across bins for most financial ratios (e.g., higher leverage → more negative WoE → higher risk). Non-monotonic WoE (e.g., a U-shape or reversal) is usually caused by binning artefacts, outliers, or insufficient data in a bin. Non-monotonic WoE produces a scorecard that penalises middle-range borrowers more than high-risk ones — counterintuitive and commercially difficult to defend.

**Mistake 4 — Using the Altman Z-Score uncritically on modern, service-sector, or non-US companies.**
The original Z-Score was calibrated on 1960s US manufacturers. X5 (Sales/Total Assets) = 1.0 for a manufacturing company is very different from a financial services firm or software company. The Z' and Z'' variants exist precisely because sector and era matter. Using the original Z-Score on a UK financial services company or a modern tech firm is methodologically inappropriate.

**Mistake 5 — Not separating discrimination from calibration.**
Banks sometimes conflate AUC (ranking quality) with calibration (accuracy of PD estimates). A model can have AUC = 0.85 but produce PDs that are systematically 3× the observed default rate. For regulatory capital, calibration matters because PD is used directly in the capital formula. For IFRS 9, miscalibrated PD leads to biased provisions. Discrimination and calibration must be evaluated separately.

**Mistake 6 — Excessive variable selection based on IV alone.**
A very high IV (> 0.5) can indicate a near-perfect predictor or a data leakage variable. If leverage ratio has IV = 1.2, it may be because the dataset was not cleaned of in-default obligors or because leverage at default is much higher than leverage at origination (in which case the variable captures the default event itself, not a predictor of it).

---

## 13. Case Studies

### Case Study A: Altman Z-Score Applied to Toys R Us (2017)

Toys R Us filed for Chapter 11 bankruptcy in September 2017. Applying the Altman Z-Score to its 2016 annual report:
- Working Capital: negative (current liabilities exceeded current assets) → X1 negative
- Retained Earnings: negative (accumulated losses from LBO) → X2 negative
- EBIT/Assets: low positive
- Market Cap: no public market cap (LBO company) → use book equity, which was near zero
- Sales/Assets: moderate

Z' Score calculation produces Z' ≈ 0.95 — well into the distress zone (< 1.23). The Z-Score predicted distress 1–2 years before bankruptcy filing. The primary driver: massive leverage from the 2005 KKR/Bain/Vornado LBO left Toys R Us with ~$5Bn of debt and near-zero book equity. Lesson: the Altman Z-Score works reasonably well for highly leveraged companies with clear financial distress signals.

### Case Study B: Scorecard Override — Barclays Credit Card (Retail, Illustrative)

A UK bank runs a logistic regression scorecard for credit card applicants. The model produces a score of 420 for a self-employed applicant with a strong income (£80K) but short employment history (2 years). The score falls below the acceptance threshold of 450. The relationship manager overrides the model and approves the credit. Policy requires documenting the override rationale. Over a 12-month monitoring period, the bank tracks override decisions and finds that the override default rate is 1.8× the model-predicted default rate — the model was correct, and the human judgment added risk. This analysis feeds the override policy: overrides above threshold require head of credit approval; below threshold requires two sign-offs. This is a standard use case for scorecard override monitoring.

### Case Study C: Full Corporate Scorecard Development — UK Mid-Market Bank

A UK bank with 2,500 mid-market corporate clients (£5M–£100M revenue) develops its first statistical scorecard (previously used expert judgment ratings):
- **Development sample:** 2,350 obligors, 38 defaults over 7 years (1.6% average default rate)
- **Variables selected (by IV):** Leverage (IV=0.82), Interest Coverage (0.71), EBITDA Margin (0.55), Current Ratio (0.38), Revenue Growth (0.22), Log Assets (0.18), Industry cyclicality (0.14). Total 7 variables.
- **Out-of-time AUC (2022–2023):** 0.77; Gini = 54%. Acceptable but not excellent.
- **Calibration:** The model systematically underpredicts PD for cyclical industries in 2020 (COVID year). An industry-specific macro overlay is added.
- **Business reaction:** Relationship managers object to some clients moving from BBB to BB (higher risk), citing relationship knowledge. Override policy limits overrides to 15% of rated portfolio per quarter.
- **Regulatory submission:** PRA approves the model for FIRB (IRB for PD, with prescribed FIRB LGD). AIRB approval deferred pending 3 more years of data.

---

## 14. Iterative Reinforcement

### Week 1 Exercises

1. Calculate the Altman Z-Score (original and Z') for three real UK-listed companies of your choice using their most recent annual reports. Are the Z-Scores consistent with their credit ratings? For any in the grey zone, identify which ratio is the primary drag.

2. Build the WoE/IV calculation in Excel for the leverage ratio variable using the bin structure in the SQL section above. Apply the IV interpretation guide. Is leverage worth including in your scorecard? What bin would you merge if n_defaults in a bin < 5?

3. Implement the Python scorecard pipeline on the synthetic dataset. Vary the PDO from 15 to 30 and observe how the score-to-PD mapping changes. At PDO=20 and base score=600, what score corresponds to a 5% PD?

### Week 2 Exercises

4. Run the Python model and apply the PSI calculation between the original development dataset and a simulated "stress" monitoring population (shift leverage mean from 3x to 5x). At what PSI value do you trigger a review? Implement the traffic light.

5. Build a simple comparison between Altman Z-Score and logistic regression on the synthetic dataset. Compute AUC for both. Which performs better? Why? What variables in the logistic regression are most important that the Z-Score misses?

6. Create a simple scorecard with 5 variables in Excel (use the points-based approach from Section 8). Score 10 hypothetical obligors and map to PD. Review whether the scorecard produces monotonically increasing risk as financial quality deteriorates.

### Self-Test Questions

- The Altman Z-Score cut-off is 1.81. A company scores 1.75. What does this mean? Would you automatically reject a loan to this company?
- What is the difference between IV and WoE? Why is IV a property of a variable but WoE is a property of a specific bin of that variable?
- AUC = 0.73 and Gini = 46%. Is this model suitable for an IRB rating system for a mid-market corporate portfolio?
- A monitoring report shows PSI = 0.18 for a retail scorecard. What are your next steps?
- Explain why logistic regression on WoE-transformed variables produces a linearly additive points-based scorecard.

---

## 15. Source Material

**Foundational Papers**
- Altman, E.I. (1968). "Financial Ratios, Discriminant Analysis and the Prediction of Corporate Bankruptcy." *Journal of Finance*, 23(4), 589–609 — the original Z-Score paper
- Altman, E.I. (2000). "Predicting Financial Distress of Companies: Revisiting the Z-Score and Zeta Models." Working Paper, NYU Stern — Z' and Z'' models
- Merton, R.C. (1974). "On the Pricing of Corporate Debt: The Risk Structure of Interest Rates." *Journal of Finance*, 29(2), 449–470
- Ohlson, J.A. (1980). "Financial Ratios and the Probabilistic Prediction of Bankruptcy." *Journal of Accounting Research*, 18(1), 109–131 — alternative to Z-Score using logistic regression
- Beaver, W.H. (1966). "Financial Ratios as Predictors of Failure." *Journal of Accounting Research*, 4(Supplement), 71–111

**Model Performance and Validation**
- Hand, D.J. (2009). "Measuring Classifier Performance: A Coherent Alternative to the Area Under the ROC Curve." *Machine Learning*, 77(1), 103–123
- Hosmer, D.W., & Lemeshow, S. (2000). *Applied Logistic Regression* (2nd Ed.). Wiley — definitive reference on calibration and H-L test

**Regulatory Documents**
- Federal Reserve Board, SR 11-7: *Guidance on Model Risk Management* (April 2011)
- Prudential Regulation Authority, SS1/23: *Model Risk Management Principles for Banks* (May 2023)
- EBA, *EBA/GL/2023/05: Guidelines on Internal Governance* — model governance requirements
- EBA, *EBA/GL/2017/16* — rating system validation (Section 8)
- Basel Committee, *Studies on the Validation of Internal Rating Systems* (Working Paper No. 14, 2005)

**Books**
- Siddiqi, N. (2017). *Intelligent Credit Scoring: Building and Implementing Better Credit Risk Scorecards* (2nd Ed.). Wiley — the practitioner's scorecard bible
- Thomas, L.C., Edelman, D.B., & Crook, J.N. (2002). *Credit Scoring and Its Applications*. SIAM — academic reference
- Anderson, R. (2007). *The Credit Scoring Toolkit*. Oxford University Press — comprehensive scorecard development guide
- McNeil, A., Frey, R., & Embrechts, P. (2015). *Quantitative Risk Management* (Rev. Ed.). Princeton University Press — Chapter 9 (credit scoring context)
