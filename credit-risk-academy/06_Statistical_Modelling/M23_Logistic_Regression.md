# M23 — Logistic Regression for PD Modelling

---

## 1. Business Purpose

Logistic regression has been the dominant model for probability of default (PD) estimation in regulated banking for over 30 years. Despite the rise of machine learning, it remains the regulatory standard for IRB models because it satisfies three criteria that banks cannot sacrifice: it produces calibrated probabilities bounded in [0,1], its coefficients are directly interpretable as log-odds ratios, and it is fully transparent to regulators and credit committees.

**Why logistic regression for PD:**

A credit analyst wants to answer: *"Given this borrower's financials and characteristics, what is the probability they default in the next 12 months?"* This is a binary classification problem (default / no default). The output must be a probability — not a score, not a ranking, but a number that can be directly plugged into EL = PD × LGD × EAD.

Logistic regression delivers this naturally. A linear regression would produce predictions outside [0,1], which are meaningless as probabilities. A black-box ML model might produce better discrimination but fails the interpretability test — a regulatory model must explain *why* a borrower receives a given PD, not just what the PD is.

**Business applications:**
- **IRB PD models:** Annual 12-month PD for corporate, SME, retail obligors — used directly in RWA and capital calculations
- **IFRS 9 ECL:** 12-month PD (Stage 1) and lifetime PD term structure (Stage 2/3)
- **Credit scorecards:** Logistic regression coefficients converted to integer point scores for underwriting decisions
- **Watchlist/EWS:** Early warning models that identify deteriorating credits 6-12 months before formal default
- **Pricing:** Risk-adjusted pricing frameworks use PD directly to compute expected loss component of spread

**Regulatory grounding:** The EBA Guidelines on PD estimation (EBA/GL/2017/16) do not mandate logistic regression, but all accepted frameworks for regulatory IRB models are built on it. SR 11-7 requires that models be conceptually sound and that assumptions be documented — logistic regression satisfies this more readily than any ML alternative.

---

## 2. Accounting Concepts

**Default Definition (Basel/IFRS 9 alignment):**
The default flag used to train the model must align with the accounting definition of default. Under Basel III:
- 90 days past due (DPD) on a material obligation, OR
- Unlikeliness to pay (UTP) — analyst judgment that the obligor cannot meet obligations without realising collateral

Under IFRS 9, the same definition applies for ECL staging. A model trained on one default definition and applied under another will produce systematically biased PDs. Analysts must document the exact flag construction.

**Observation Date vs Default Date:**
For model training, each observation is a borrower at a specific point in time (e.g., December 31 each year). The default flag is whether they defaulted in the following 12 months. Predictors must be *lagged* — observable as of the observation date, not the default date. Using post-observation predictors is data leakage.

**Write-off Timing:**
Write-offs typically occur 12-36 months after the default event (after workout). The default event — not the write-off — defines the model training label.

**Going Concern Assumption:**
For non-financial corporates, PD models implicitly assume the borrower is a going concern. Distressed debt analysis requiring different approaches (e.g., structural Merton models) sits outside standard IRB logistic regression.

---

## 3. Financial Concepts

**The Five Cs of Credit — Mapped to Model Variables:**

| C | Concept | Model Variables |
|---|---------|-----------------|
| Character | Willingness to pay | Payment history, adverse events, management track record |
| Capacity | Ability to service debt | DSCR, interest coverage, operating cash flow / debt |
| Capital | Equity cushion | Leverage ratio (Debt/EBITDA, Debt/Equity), tangible net worth |
| Conditions | Economic environment | Industry sector, macro overlays |
| Collateral | Recovery protection | LTV for secured; feeds LGD, not PD |

**Financial Ratios for PD Models:**

*Leverage ratios (higher = riskier):*
```
Debt / EBITDA                   → Coverage of debt by earnings
Debt / Total Assets             → Asset encumbrance
Net Debt / Equity               → Financial gearing
```

*Coverage ratios (lower = riskier):*
```
EBITDA / Interest Expense       → Interest coverage ratio
(CFO + Interest) / Interest     → Cash interest coverage
DSCR = (EBITDA - CapEx - Tax) / Debt Service
```

*Profitability (lower = riskier):*
```
EBITDA Margin                   → Operating efficiency
Return on Assets (ROA)          → Asset utilisation
Operating Cash Flow / Revenue   → Cash conversion quality
```

*Liquidity (lower = riskier):*
```
Current Ratio = Current Assets / Current Liabilities
Quick Ratio = (Cash + Receivables) / Current Liabilities
Days Payable Outstanding        → Liquidity management quality
```

**Log-Odds — the Financial Intuition:**
Logistic regression models the log-odds of default:
```
log(PD / (1 - PD)) = β₀ + β₁X₁ + β₂X₂ + ...
```
A negative coefficient on DSCR means higher debt service coverage reduces the log-odds of default — exactly as financial intuition predicts. A one-unit increase in DSCR multiplies the odds of default by exp(β₁). This coefficient is directly auditable by credit officers.

---

## 4. Statistical Concepts

### 4.1 The Logit Function

Let Y be the binary default indicator (1 = default, 0 = no default) and X the vector of predictors. Logistic regression models:

```
P(Y=1|X) = 1 / (1 + exp(-z))    where z = β₀ + β₁X₁ + ... + βₖXₖ
```

This is the *logistic (sigmoid) function*. As z → +∞, P → 1. As z → -∞, P → 0.

The *logit* (log-odds) is the inverse:
```
logit(p) = log(p / (1-p)) = β₀ + β₁X₁ + ... + βₖXₖ
```

The logit is linear in the predictors. This is why logistic regression is a *generalised linear model* — it linearises a non-linear response via the logit link function.

### 4.2 Odds Ratio Interpretation

The odds ratio for predictor Xⱼ is exp(βⱼ). This is the multiplicative change in the odds of default for a one-unit increase in Xⱼ, holding other predictors constant.

```
Odds Ratio = exp(βⱼ)
           = P(default|Xⱼ+1) / (1-P(default|Xⱼ+1))
             ─────────────────────────────────────────
             P(default|Xⱼ)   / (1-P(default|Xⱼ))
```

Example: If β(Debt/EBITDA) = 0.15, then exp(0.15) = 1.16. A one-unit increase in Debt/EBITDA (e.g., from 3x to 4x) increases the odds of default by 16%.

### 4.3 Maximum Likelihood Estimation

Logistic regression is estimated by maximising the log-likelihood:
```
ℓ(β) = Σᵢ [yᵢ log(pᵢ) + (1-yᵢ) log(1-pᵢ)]
```

where pᵢ = P(Yᵢ=1|Xᵢ; β). There is no closed-form solution. Iteratively Reweighted Least Squares (IRLS) or gradient descent is used.

**Score equations (first-order conditions):**
```
∂ℓ/∂βⱼ = Σᵢ xᵢⱼ(yᵢ - pᵢ) = 0
```
The residuals (yᵢ - pᵢ) are uncorrelated with each predictor in the solution.

**Newton-Raphson update:**
```
β(t+1) = β(t) - H⁻¹(β(t)) × ∇ℓ(β(t))
```
where H is the Hessian (matrix of second derivatives of ℓ). IRLS reformulates this as a sequence of weighted least squares problems.

### 4.4 Model Performance Metrics

**ROC-AUC (Area Under the Receiver Operating Characteristic Curve):**

The ROC curve plots True Positive Rate (sensitivity) vs False Positive Rate (1-specificity) at all classification thresholds. AUC measures the probability that a randomly chosen defaulter receives a higher predicted PD than a randomly chosen non-defaulter.
```
AUC = P(PD_defaulter > PD_non-defaulter)
```
AUC = 0.5 → no discrimination (random). AUC = 1.0 → perfect discrimination.
For credit models: AUC < 0.65 is poor; 0.65-0.75 acceptable; > 0.75 strong.

**Gini Coefficient:**
```
Gini = 2 × AUC - 1
```
Gini ranges from 0 (random) to 1 (perfect). Equivalent to the area between the Lorenz curve and the diagonal. Industry benchmarks:
- Retail PD models: Gini 50-75%
- Corporate PD models: Gini 40-65% (fewer obligors, less data)
- Low-default portfolios: Gini 30-50% (data limitation)

**Kolmogorov-Smirnov (KS) Statistic:**
```
KS = max_t |F_defaulters(t) - F_non-defaulters(t)|
```
The maximum separation between the cumulative distribution functions of predicted PDs for defaulters and non-defaulters. KS > 40% is considered acceptable for retail models.

**Brier Score:**
```
BS = (1/n) × Σ (pᵢ - yᵢ)²
```
Measures calibration AND discrimination jointly. Lower is better. A perfect model scores 0. The null model (always predicts the base rate) scores p × (1-p). Decomposed into:
```
BS = Reliability - Resolution + Uncertainty
```
where Reliability measures calibration error and Resolution measures discrimination.

**Lift and Capture Rate:**
- *Capture rate at top decile:* What fraction of all defaults fall in the riskiest 10% of predicted PDs? A good model captures 30-50% of defaults in the top decile.
- *Lift:* Capture_rate / 10% = 3x-5x lift typical for retail models.

### 4.5 Calibration

Discrimination (AUC/Gini) and calibration are separate properties. A model can rank borrowers perfectly but systematically overestimate or underestimate PDs. For regulatory models, calibration is mandatory — the predicted PD must be the actual probability of default.

**Reliability Diagram:**
Divide predictions into deciles. For each decile, plot mean predicted PD vs observed default rate. Perfect calibration lies on the 45° diagonal.

**Platt Scaling:**
Recalibrate an uncalibrated model by fitting a second logistic regression:
```
P_calibrated = sigmoid(a × log_odds_raw + b)
```
Parameters a and b are estimated on a held-out calibration set.

**Long-Run Adjustment (Basel TTC):**
IRB PD models require through-the-cycle (TTC) calibration. Pit-to-TTC adjustment:
```
PD_TTC = PD_PIT × (LRA / Mean_PD_development_sample)
```
where LRA is the long-run average default rate over a full cycle (minimum 7 years).

### 4.6 Multicollinearity Diagnostics

Multicollinearity does not bias coefficients but inflates standard errors, making statistical inference unreliable. Two correlated predictors may both appear insignificant individually while the pair is jointly significant.

**Variance Inflation Factor:**
```
VIF_j = 1 / (1 - R²_j)
```
where R²_j is obtained by regressing variable j on all other predictors. Guidelines:
- VIF < 5: Acceptable
- VIF 5-10: Investigate; consider removing one variable
- VIF > 10: Severe multicollinearity; one variable must be removed

**Condition Number:**
```
κ = sqrt(λ_max / λ_min)
```
Eigenvalues of X'X. κ > 30 indicates severe multicollinearity.

### 4.7 Train/Test Split and Cross-Validation

**Temporal split (preferred for credit):**
- Development sample: earliest years (e.g., 2008-2019)
- Out-of-time (OOT) validation: most recent years (e.g., 2020-2023)
- Do NOT use random splits — credit data is serially correlated; random splits create look-ahead bias

**K-Fold Cross-Validation:**
Useful when data is scarce. Split into k folds; train on k-1, validate on 1; rotate. Use stratified folds to maintain default rate balance.

**Events Per Variable (EPV):**
Rule of thumb: minimum 10 defaults per predictor variable included in the model. A model with 8 predictors needs ≥ 80 defaults in the development sample. Below EPV of 5, coefficients are unreliable.

---

## 5. Regulatory Framework

**EBA/GL/2017/16 — PD Estimation Requirements:**
- Use a long-run average default rate (LRADR) as PD floor
- Minimum 5 years historical data for retail; 7 years for corporate (or from IRB approval)
- Downturn adjustment: PDs must reflect stressed economic conditions
- Data representativeness: development data must reflect future application population
- PD floors: 0.03% for senior secured; 0.05% for retail; 0.10% for other

**SR 11-7 Requirements for PD Models:**
- Conceptual soundness: each variable must have a credit-theoretic justification
- Data integrity: automated and manual checks on training data
- Outcome analysis: back-testing against realised default rates (minimum 3 years post-deployment)
- Sensitivity analysis: how much does the PD change if each input changes by ±10%?
- Stress testing: model performance under adverse economic scenarios

**BCBS 239 (Principles for Effective Risk Data Aggregation):**
Requires that risk data supporting models (including PD models) be accurate, complete, timely, and adaptable. This standard applies to all G-SIBs and many domestic systemically important banks.

**ECB Guide to Internal Models (2019):**
Specifies that the ECB expects banks to demonstrate the representativeness of their development data and the stability of model performance over time. Multi-year performance tables are required in Internal Model Investigation (IMI) submissions.

**Scorecard Conversion — Regulatory Acceptance:**
Regulators accept scorecard format when the mapping from score to PD is monotone and documented. Points-to-PD tables must be recalibrated at least annually.

---

## 6. Data Required

**Minimum dataset for a corporate PD model:**

| Field | Source | Notes |
|-------|--------|-------|
| Default flag | Internal workout / credit system | Must follow Basel definition precisely |
| Observation date | Credit system | Year-end snapshot preferred |
| Financial ratios | Financial spreading | Audited financials preferred; gap-fill policy needed |
| Facility data | Loan management system | Obligor-level aggregation required |
| Industry code | NACE/SIC | For segmentation |
| Country/geography | Credit system | For macro overlay |
| Collateral type | Collateral management | Feeds LGD, but may inform PD |
| Credit bureau score | External bureau | For SME/retail; freshness requirement (< 90 days) |

**Data quality requirements:**
- Default flag completeness: ≥ 95% of the portfolio in each observation year
- Financial data availability: ≥ 80% of obligors with at least one annual period of financials
- Winsorisation policy: ratios capped at 1st/99th percentile to limit outlier influence
- Missing value threshold: variables with > 30% missing excluded from initial screening

**Sample size guidance:**
- Minimum defaults: 300-500 for a stable logistic regression (more for segmented models)
- Minimum non-defaults: 5x-10x defaults (imbalanced data requires handling)
- Development/validation split: 70/30 or 60/20/20 (dev/validation/OOT)

---

## 7. How Analysts Actually Work

**Step-by-step model development workflow:**

1. **Data extraction:** Pull all obligors with observation dates from the last 7+ years. Extract financial ratios, facility data, and default flags. Typically done in SQL against the credit risk data warehouse.

2. **Data cleaning:** Cap outliers (winsorise at 1st/99th percentile). Handle missing values (median imputation for numeric; "unknown" category for categorical). Document every decision.

3. **Univariate analysis:** Run IV/WoE on all candidate variables. Keep variables with IV between 0.02 and 0.50. Plot WoE trends to confirm monotonicity (key regulatory requirement).

4. **Correlation screening:** Remove variables with |Spearman ρ| > 0.70 with another variable (keep the one with higher IV).

5. **Binning and WoE transformation:** Convert all continuous variables to WoE values using the binning determined in step 3. This linearises the relationship with log-odds (logistic regression assumes linearity in log-odds).

6. **Stepwise selection:** Use forward stepwise selection guided by AIC/BIC, not just p-values. Ensure each variable retained has a credit-theoretic justification. Check VIF < 5 at each step.

7. **Coefficient review:** Signs must accord with financial theory (negative on coverage; positive on leverage). If a sign is wrong, investigate — do not just exclude the variable.

8. **Performance assessment:** Compute Gini, KS, AUC on development AND holdout AND OOT samples. Prepare decile table (predicted vs observed default rate by decile).

9. **Calibration:** Fit reliability diagram. Apply TTC adjustment. Test Hosmer-Lemeshow.

10. **Scorecard conversion:** Map WoE scores to integer points. Assign points-to-PD table.

11. **Documentation:** Write model documentation (typically 80-150 pages). Submit for model validation review.

**Population Stability Index monitoring post-deployment:**
Run PSI monthly on model inputs. Set thresholds: PSI > 0.10 → yellow flag; PSI > 0.25 → model review.

---

## 8. Excel Implementation

**Scorecard Construction:**

```
Step 1: WoE Binning Table
  Column A: Bin (e.g., leverage < 2, 2-3, 3-5, 5-7, >7)
  Column B: Default count
  Column C: Non-default count
  Column D: % Events = B/(SUM(B))
  Column E: % Non-Events = C/(SUM(C))
  Column F: WoE = LN(D/E)
  Column G: IV component = (D-E)*F

Step 2: Scorecard Points
  Points = Offset + Factor × WoE
  where Factor = PDO / ln(2)   [PDO = Points to Double Odds]
  and Offset and Factor are calibrated so that:
    - Score 600 → odds of 1:1 (50/50)
    - Score increases by PDO (e.g. 20 points) → odds halve
```

**Decile Table (standard regulatory output):**
```
=COUNTIFS(score_range, ">="&decile_floor, score_range, "<"&decile_ceil, default_col, 1)
  → Defaults in each decile
=COUNTIFS(score_range, ">="&decile_floor, score_range, "<"&decile_ceil)
  → Total in each decile
Observed DR = Defaults / Total
Predicted PD = AVERAGEIFS(pd_col, score_range, ">="&decile_floor, score_range, "<"&decile_ceil)
```

**Gini Calculation:**
```
Sort by predicted PD descending.
Compute cumulative % of population and cumulative % of defaults.
Lorenz curve area under step function.
Gini = 2 × (Lorenz area - 0.5) = 2 × AUC - 1

=SUMPRODUCT((cum_defaults(i)+cum_defaults(i-1))/2 × (cum_pop(i)-cum_pop(i-1))) × 2 - 1
```

**KS Statistic:**
```
=MAX(ABS(cum_pct_defaults_column - cum_pct_non_defaults_column))
```

**Hosmer-Lemeshow Test:**
```
For each decile g:
  Og = observed defaults
  Eg = ng × p̄g   [ng = count in decile, p̄g = mean predicted PD]
  HL_component = (Og - Eg)^2 / (Eg × (1-p̄g))
HL_total = SUM(HL_components)
p-value = 1 - CHISQ.DIST(HL_total, n_groups-2, TRUE)
[Fail to reject H0 at 5% → model is calibrated]
```

---

## 9. SQL Implementation

```sql
-- ============================================================
-- M23: Logistic Regression PD Model — SQL Workflows
-- ============================================================

-- 1. Build training dataset: one row per obligor-year
CREATE TABLE dbo.pd_model_training AS
SELECT
    o.obligor_id,
    o.observation_date,
    o.industry_code,
    o.country_code,
    f.debt_ebitda_ratio,
    f.interest_coverage_ratio,
    f.ebitda_margin,
    f.current_ratio,
    f.log_total_assets,
    -- Default flag: 1 if defaulted within 12 months of observation date
    CASE WHEN d.default_date IS NOT NULL
              AND d.default_date BETWEEN o.observation_date
                                     AND DATEADD(MONTH, 12, o.observation_date)
         THEN 1 ELSE 0
    END AS default_flag_12m
FROM dbo.obligors o
LEFT JOIN dbo.financials f
    ON o.obligor_id = f.obligor_id
    AND f.financial_year_end BETWEEN DATEADD(MONTH, -6, o.observation_date)
                                 AND o.observation_date
LEFT JOIN dbo.defaults d ON o.obligor_id = d.obligor_id
WHERE o.observation_date >= '2010-01-01'
  AND o.observation_date <  '2022-01-01'
  AND o.portfolio = 'CORPORATE';

-- 2. Winsorise outliers at 1st/99th percentile
WITH percentiles AS (
    SELECT
        PERCENTILE_CONT(0.01) WITHIN GROUP (ORDER BY debt_ebitda_ratio)  AS p01_leverage,
        PERCENTILE_CONT(0.99) WITHIN GROUP (ORDER BY debt_ebitda_ratio)  AS p99_leverage,
        PERCENTILE_CONT(0.01) WITHIN GROUP (ORDER BY interest_coverage_ratio) AS p01_coverage,
        PERCENTILE_CONT(0.99) WITHIN GROUP (ORDER BY interest_coverage_ratio) AS p99_coverage
    FROM dbo.pd_model_training
)
UPDATE t
SET
    debt_ebitda_ratio = CASE
        WHEN t.debt_ebitda_ratio < p.p01_leverage THEN p.p01_leverage
        WHEN t.debt_ebitda_ratio > p.p99_leverage THEN p.p99_leverage
        ELSE t.debt_ebitda_ratio END,
    interest_coverage_ratio = CASE
        WHEN t.interest_coverage_ratio < p.p01_coverage THEN p.p01_coverage
        WHEN t.interest_coverage_ratio > p.p99_coverage THEN p.p99_coverage
        ELSE t.interest_coverage_ratio END
FROM dbo.pd_model_training t
CROSS JOIN percentiles p;

-- 3. WoE transformation: store bins and WoE values
CREATE TABLE dbo.woe_bins (
    variable_name  VARCHAR(100),
    bin_id         INT,
    bin_lower      FLOAT,
    bin_upper      FLOAT,
    woe_value      FLOAT,
    iv_component   FLOAT
);

-- Example insert from Python output (after running WoE analysis)
-- INSERT INTO dbo.woe_bins VALUES ('debt_ebitda_ratio', 1, -999, 2.0, 1.23, 0.045)...

-- 4. Apply WoE transformations
SELECT
    t.obligor_id,
    t.observation_date,
    t.default_flag_12m,
    w1.woe_value AS woe_leverage,
    w2.woe_value AS woe_coverage,
    w3.woe_value AS woe_margin
FROM dbo.pd_model_training t
JOIN dbo.woe_bins w1
    ON w1.variable_name = 'debt_ebitda_ratio'
    AND t.debt_ebitda_ratio >= w1.bin_lower
    AND t.debt_ebitda_ratio <  w1.bin_upper
JOIN dbo.woe_bins w2
    ON w2.variable_name = 'interest_coverage_ratio'
    AND t.interest_coverage_ratio >= w2.bin_lower
    AND t.interest_coverage_ratio <  w2.bin_upper
JOIN dbo.woe_bins w3
    ON w3.variable_name = 'ebitda_margin'
    AND t.ebitda_margin >= w3.bin_lower
    AND t.ebitda_margin <  w3.bin_upper;

-- 5. Store model predictions and compute performance metrics
CREATE TABLE dbo.model_predictions (
    obligor_id      INT,
    observation_date DATE,
    predicted_pd    FLOAT,
    actual_default  INT,
    decile          INT
);

-- Gini calculation from stored predictions
WITH ranked AS (
    SELECT
        predicted_pd,
        actual_default,
        ROW_NUMBER() OVER (ORDER BY predicted_pd DESC) AS rank_desc,
        COUNT(*) OVER () AS total_n,
        SUM(actual_default) OVER () AS total_defaults
    FROM dbo.model_predictions
),
cumulative AS (
    SELECT
        rank_desc,
        SUM(actual_default) OVER (ORDER BY rank_desc) AS cum_defaults,
        total_defaults,
        total_n,
        CAST(rank_desc AS FLOAT) / total_n AS cum_pct_pop
    FROM ranked
)
SELECT
    2 * SUM(
        (CAST(cum_defaults AS FLOAT) / total_defaults)
        * (1.0 / total_n)
    ) - 1 AS gini_coefficient
FROM cumulative;

-- 6. Decile performance table (regulatory standard output)
WITH deciled AS (
    SELECT
        predicted_pd,
        actual_default,
        NTILE(10) OVER (ORDER BY predicted_pd DESC) AS decile
    FROM dbo.model_predictions
)
SELECT
    decile,
    COUNT(*)                                    AS n_obligors,
    SUM(actual_default)                         AS n_defaults,
    AVG(CAST(actual_default AS FLOAT))          AS observed_dr,
    AVG(predicted_pd)                           AS avg_predicted_pd,
    MIN(predicted_pd)                           AS min_pd_in_decile,
    MAX(predicted_pd)                           AS max_pd_in_decile,
    SUM(SUM(actual_default)) OVER (ORDER BY decile)
        / NULLIF(SUM(SUM(actual_default)) OVER (), 0) AS cum_pct_defaults_captured
FROM deciled
GROUP BY decile
ORDER BY decile;

-- 7. Annual backtesting: predicted PD vs observed default rate
SELECT
    YEAR(observation_date) AS year,
    COUNT(*)               AS n_obligors,
    SUM(actual_default)    AS n_defaults,
    AVG(predicted_pd)      AS avg_predicted_pd,
    AVG(CAST(actual_default AS FLOAT)) AS observed_dr,
    AVG(CAST(actual_default AS FLOAT)) - AVG(predicted_pd) AS calibration_error_pp
FROM dbo.model_predictions
GROUP BY YEAR(observation_date)
ORDER BY YEAR(observation_date);

-- 8. PSI monitoring: compare development vs current application population
WITH dev AS (
    SELECT
        decile,
        CAST(COUNT(*) AS FLOAT) / SUM(COUNT(*)) OVER () AS pct_dev
    FROM dbo.model_predictions
    WHERE observation_date BETWEEN '2010-01-01' AND '2019-12-31'
    GROUP BY decile
),
curr AS (
    SELECT
        decile,
        CAST(COUNT(*) AS FLOAT) / SUM(COUNT(*)) OVER () AS pct_curr
    FROM dbo.model_predictions
    WHERE observation_date >= '2023-01-01'
    GROUP BY decile
)
SELECT
    d.decile,
    ROUND(d.pct_dev, 4)    AS pct_dev,
    ROUND(c.pct_curr, 4)   AS pct_curr,
    ROUND((c.pct_curr - d.pct_dev) * LOG(c.pct_curr / d.pct_dev), 4) AS psi_component,
    SUM(ROUND((c.pct_curr - d.pct_dev) * LOG(c.pct_curr / d.pct_dev), 4))
        OVER () AS total_psi
FROM dev d
JOIN curr c ON d.decile = c.decile
ORDER BY d.decile;
```

---

## 10. Python Implementation

```python
"""
M23 — Logistic Regression for PD Modelling
End-to-End Python Implementation:
Data preparation → WoE binning → Logistic regression →
Performance metrics → Scorecard conversion → Calibration
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split, StratifiedKFold
from sklearn.metrics import (roc_auc_score, roc_curve, brier_score_loss,
                              confusion_matrix)
from sklearn.preprocessing import StandardScaler
from sklearn.calibration import calibration_curve
from scipy import stats
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)

# ============================================================
# STEP 1: GENERATE SYNTHETIC CORPORATE LOAN DATASET
# ============================================================

def generate_corporate_data(n: int = 5000) -> pd.DataFrame:
    """
    Synthetic corporate loan dataset with realistic credit properties.
    Features: leverage, coverage, margin, size, industry.
    Default rate ~ 5% overall; higher for high-leverage, low-coverage.
    """
    np.random.seed(42)

    # Financial characteristics
    leverage   = np.random.lognormal(0.8, 0.6)     # Debt/EBITDA, 1x-10x range
    leverage   = np.clip(np.random.lognormal(0.8, 0.6, n), 0.1, 20.0)
    coverage   = np.clip(np.random.lognormal(1.5, 0.8, n), 0.5, 30.0)
    margin     = np.clip(np.random.beta(3, 7, n), 0.0, 0.8)  # EBITDA margin
    log_assets = np.random.normal(5.5, 1.2, n)  # log(Total Assets $M)
    current_r  = np.clip(np.random.lognormal(0.4, 0.4, n), 0.5, 5.0)
    industry   = np.random.choice(['Manufacturing','Retail','Services',
                                   'Energy','Property'], n,
                                  p=[0.25, 0.20, 0.30, 0.15, 0.10])
    country    = np.random.choice(['UK', 'DE', 'FR', 'ES', 'IT'], n,
                                  p=[0.40, 0.25, 0.20, 0.10, 0.05])
    year       = np.random.choice(range(2010, 2022), n)

    # Industry risk adjustment (retail and energy riskier)
    industry_adj = {
        'Manufacturing': 0.0, 'Retail': 0.3, 'Services': -0.1,
        'Energy': 0.5, 'Property': 0.2
    }

    # Latent default propensity (log-odds)
    log_odds = (
        -3.5                                         # intercept
        + 0.25  * leverage                           # higher leverage → riskier
        - 0.15  * np.log(coverage)                   # higher coverage → safer
        - 2.5   * margin                             # higher margin → safer
        - 0.15  * log_assets                         # larger companies → safer
        - 0.20  * current_r                          # higher liquidity → safer
        + np.array([industry_adj[i] for i in industry])
        + np.random.logistic(0, 1, n) * 0.5          # idiosyncratic noise
    )

    # Convert to probability
    pd_true = 1 / (1 + np.exp(-log_odds))
    default_flag = (np.random.uniform(0, 1, n) < pd_true).astype(int)

    df = pd.DataFrame({
        'obligor_id':    range(n),
        'year':          year,
        'leverage':      leverage,
        'coverage':      coverage,
        'ebitda_margin': margin,
        'log_assets':    log_assets,
        'current_ratio': current_r,
        'industry':      industry,
        'country':       country,
        'pd_true':       pd_true,
        'default_flag':  default_flag
    })

    print(f"Generated {n:,} obligors | "
          f"Defaults: {default_flag.sum():,} ({default_flag.mean():.1%})")
    return df

df = generate_corporate_data(5000)


# ============================================================
# STEP 2: DATA PREPARATION AND WINSORISATION
# ============================================================

def winsorise(series: pd.Series, lower_q: float = 0.01,
              upper_q: float = 0.99) -> pd.Series:
    """Cap values at specified percentiles."""
    lo, hi = series.quantile(lower_q), series.quantile(upper_q)
    return series.clip(lo, hi)

# Train/test split — temporal: last 2 years as holdout
df_train = df[df['year'] <= 2019].copy()
df_test  = df[df['year'] >= 2020].copy()

numeric_features = ['leverage', 'coverage', 'ebitda_margin', 'log_assets', 'current_ratio']

# Winsorise using train distribution only
winsor_bounds = {}
for feat in numeric_features:
    lo = df_train[feat].quantile(0.01)
    hi = df_train[feat].quantile(0.99)
    winsor_bounds[feat] = (lo, hi)
    df_train[feat] = df_train[feat].clip(lo, hi)
    df_test[feat]  = df_test[feat].clip(lo, hi)

print(f"Train: {len(df_train):,} obs | Test: {len(df_test):,} obs")
print(f"Train default rate: {df_train['default_flag'].mean():.2%}")
print(f"Test  default rate: {df_test['default_flag'].mean():.2%}")


# ============================================================
# STEP 3: WOE BINNING
# ============================================================

class WoEBinner:
    """
    Weight of Evidence binning for logistic regression preprocessing.
    Implements quantile binning with monotonicity option.
    """

    def __init__(self, n_bins: int = 10, min_bin_size: float = 0.05):
        self.n_bins = n_bins
        self.min_bin_size = min_bin_size
        self.bins_ = {}
        self.woe_maps_ = {}
        self.iv_scores_ = {}

    def fit(self, X: pd.DataFrame, y: pd.Series) -> 'WoEBinner':
        total_events     = y.sum()
        total_non_events = len(y) - total_events

        for col in X.columns:
            # Quantile binning
            try:
                binned = pd.qcut(X[col], q=self.n_bins, duplicates='drop')
            except ValueError:
                binned = pd.cut(X[col], bins=self.n_bins, duplicates='drop')

            temp = pd.DataFrame({'bin': binned, 'y': y})
            stats_df = (
                temp.groupby('bin', observed=True)
                .agg(events=('y', 'sum'), count=('y', 'count'))
                .assign(non_events=lambda x: x['count'] - x['events'])
            )

            eps = 0.5  # Laplace smoothing for empty bins
            stats_df['pct_events']     = (stats_df['events'] + eps) / (total_events + eps)
            stats_df['pct_non_events'] = (stats_df['non_events'] + eps) / (total_non_events + eps)
            stats_df['woe']            = np.log(stats_df['pct_events'] /
                                                 stats_df['pct_non_events'])
            stats_df['iv_comp']        = (stats_df['pct_events'] -
                                          stats_df['pct_non_events']) * stats_df['woe']

            self.bins_[col]    = stats_df.index
            self.woe_maps_[col] = stats_df['woe'].to_dict()
            self.iv_scores_[col] = stats_df['iv_comp'].sum()

        return self

    def transform(self, X: pd.DataFrame) -> pd.DataFrame:
        result = pd.DataFrame(index=X.index)
        for col in X.columns:
            try:
                binned = pd.qcut(X[col], q=self.n_bins, duplicates='drop')
            except ValueError:
                binned = pd.cut(X[col], bins=self.n_bins, duplicates='drop')
            result[f'woe_{col}'] = binned.map(self.woe_maps_[col]).fillna(0)
        return result

    def fit_transform(self, X: pd.DataFrame, y: pd.Series) -> pd.DataFrame:
        return self.fit(X, y).transform(X)

    def iv_summary(self) -> pd.DataFrame:
        iv_df = pd.DataFrame({
            'variable': list(self.iv_scores_.keys()),
            'iv': list(self.iv_scores_.values())
        }).sort_values('iv', ascending=False)
        iv_df['predictive_power'] = iv_df['iv'].apply(
            lambda x: ('Suspicious' if x > 0.5 else
                       'Strong' if x > 0.3 else
                       'Medium' if x > 0.1 else
                       'Weak' if x > 0.02 else 'Unpredictive'))
        return iv_df

# Fit WoE binner on training data
woe = WoEBinner(n_bins=10)
X_train_num = df_train[numeric_features]
X_test_num  = df_test[numeric_features]
y_train     = df_train['default_flag']
y_test      = df_test['default_flag']

X_train_woe = woe.fit_transform(X_train_num, y_train)
X_test_woe  = woe.transform(X_test_num)

print("\n--- IV Summary ---")
print(woe.iv_summary().to_string(index=False))


# ============================================================
# STEP 4: LOGISTIC REGRESSION — FIT AND DIAGNOSE
# ============================================================

def fit_logistic_with_diagnostics(X: pd.DataFrame, y: pd.Series,
                                   C: float = 1.0) -> LogisticRegression:
    """
    Fit logistic regression and print full diagnostic output.
    """
    model = LogisticRegression(C=C, max_iter=1000, random_state=42)
    model.fit(X, y)

    # Coefficient table with odds ratios
    coef_df = pd.DataFrame({
        'Variable':   X.columns,
        'Coefficient': model.coef_[0],
        'Odds Ratio':  np.exp(model.coef_[0])
    }).sort_values('Coefficient', ascending=False)

    print("\n--- Logistic Regression Coefficients ---")
    print(f"Intercept: {model.intercept_[0]:.4f}")
    print(coef_df.to_string(index=False))

    return model

# Compute VIFs
from numpy.linalg import matrix_rank
def compute_vif(X: pd.DataFrame) -> pd.DataFrame:
    """Compute Variance Inflation Factor for all variables."""
    from sklearn.linear_model import LinearRegression
    vifs = []
    for j, col in enumerate(X.columns):
        other_cols = [c for c in X.columns if c != col]
        lr = LinearRegression().fit(X[other_cols], X[col])
        r2 = lr.score(X[other_cols], X[col])
        vif = 1 / (1 - r2) if r2 < 1 else np.inf
        vifs.append({'Variable': col, 'VIF': round(vif, 2)})
    return pd.DataFrame(vifs).sort_values('VIF', ascending=False)

print("\n--- VIF Diagnostics ---")
print(compute_vif(X_train_woe).to_string(index=False))

lr_model = fit_logistic_with_diagnostics(X_train_woe, y_train)


# ============================================================
# STEP 5: MODEL PERFORMANCE METRICS
# ============================================================

def compute_performance_metrics(model, X: pd.DataFrame, y: pd.Series,
                                  sample_name: str = '') -> dict:
    """Compute all standard credit model performance metrics."""
    proba = model.predict_proba(X)[:, 1]

    # AUC and Gini
    auc  = roc_auc_score(y, proba)
    gini = 2 * auc - 1

    # KS Statistic
    fpr, tpr, thresholds = roc_curve(y, proba)
    ks = np.max(tpr - fpr)

    # Brier Score
    bs = brier_score_loss(y, proba)

    # Capture rate at top decile
    df_perf = pd.DataFrame({'proba': proba, 'y': y})
    df_perf = df_perf.sort_values('proba', ascending=False).reset_index(drop=True)
    top_decile_n = len(df_perf) // 10
    capture_top10 = df_perf.head(top_decile_n)['y'].sum() / y.sum()

    metrics = {
        'Sample': sample_name, 'AUC': auc, 'Gini': gini,
        'KS': ks, 'Brier': bs, 'Capture@Top10%': capture_top10
    }

    print(f"\n--- Performance: {sample_name} ---")
    for k, v in metrics.items():
        if k != 'Sample':
            print(f"  {k:<20}: {v:.4f}")

    return metrics

train_metrics = compute_performance_metrics(lr_model, X_train_woe, y_train, 'Development')
test_metrics  = compute_performance_metrics(lr_model, X_test_woe,  y_test,  'Out-of-Time')

# Overfitting gap assessment
gini_gap = train_metrics['Gini'] - test_metrics['Gini']
print(f"\nGini gap (Dev vs OOT): {gini_gap:.4f} "
      f"{'[ACCEPTABLE]' if gini_gap < 0.05 else '[WARNING — possible overfitting]'}")


# ============================================================
# STEP 6: CALIBRATION ANALYSIS
# ============================================================

def calibration_analysis(model, X: pd.DataFrame, y: pd.Series,
                          n_bins: int = 10) -> None:
    """Reliability diagram and Hosmer-Lemeshow test."""
    proba = model.predict_proba(X)[:, 1]

    # Reliability diagram
    fraction_pos, mean_pred = calibration_curve(y, proba, n_bins=n_bins)

    # Hosmer-Lemeshow test
    df_cal = pd.DataFrame({'proba': proba, 'y': y})
    df_cal['decile'] = pd.qcut(df_cal['proba'], q=n_bins, duplicates='drop', labels=False)
    hl_stat = 0.0
    for dec, grp in df_cal.groupby('decile'):
        o_k = grp['y'].sum()
        n_k = len(grp)
        p_k = grp['proba'].mean()
        e_k = n_k * p_k
        hl_stat += (o_k - e_k)**2 / (e_k * (1 - p_k) + 1e-10)

    df_hl = n_bins - 2  # degrees of freedom
    p_hl  = 1 - stats.chi2.cdf(hl_stat, df_hl)

    print(f"\n--- Hosmer-Lemeshow Calibration Test ---")
    print(f"  HL Statistic: {hl_stat:.4f}")
    print(f"  Degrees of Freedom: {df_hl}")
    print(f"  p-value: {p_hl:.4f}")
    print(f"  {'Model is well-calibrated (fail to reject H0)' if p_hl > 0.05 else 'Calibration FAILURE (reject H0)'}")

    # Decile table
    print(f"\n--- Decile Calibration Table ---")
    print(f"{'Decile':>7} {'N':>6} {'Obs DR':>9} {'Pred PD':>9} {'Error(pp)':>10}")
    for dec, grp in df_cal.groupby('decile'):
        obs_dr  = grp['y'].mean()
        pred_pd = grp['proba'].mean()
        n_       = len(grp)
        print(f"{dec:>7} {n_:>6} {obs_dr:>9.3%} {pred_pd:>9.3%} "
              f"{(obs_dr-pred_pd)*100:>+10.2f}pp")

calibration_analysis(lr_model, X_test_woe, y_test)


# ============================================================
# STEP 7: SCORECARD CONVERSION
# ============================================================

def convert_to_scorecard(model, woe_binner: WoEBinner,
                           target_score_at_odds_1_1: float = 600.0,
                           pdo: float = 20.0) -> pd.DataFrame:
    """
    Convert logistic regression + WoE model to integer scorecard.

    Scorecard formula:
        Score = Offset + Factor × (β₀ + Σ βⱼ × WoE_ij)
    where:
        Factor = PDO / ln(2)
        Offset = Target_score - Factor × ln(Base_odds)
                 (base odds = 1:1 for target_score = 600)
    """
    factor = pdo / np.log(2)
    base_odds_ln = 0  # ln(1) = 0 for 1:1 odds
    offset = target_score_at_odds_1_1 - factor * (model.intercept_[0] + base_odds_ln)

    scorecard_rows = []

    for feat, coef in zip(
        [c.replace('woe_', '') for c in
         [c for c in woe_binner.woe_maps_.keys()]],
        model.coef_[0]
    ):
        woe_key = feat
        if woe_key in woe_binner.woe_maps_:
            for bin_interval, woe_val in woe_binner.woe_maps_[woe_key].items():
                points = offset / len(model.coef_[0]) + factor * coef * woe_val
                scorecard_rows.append({
                    'Variable': feat,
                    'Bin': str(bin_interval),
                    'WoE': round(woe_val, 4),
                    'Coefficient': round(coef, 4),
                    'Points': round(points, 1)
                })

    scorecard = pd.DataFrame(scorecard_rows)
    print("\n--- Scorecard (sample rows) ---")
    print(scorecard.head(20).to_string(index=False))
    print(f"\nFactor (PDO={pdo}): {factor:.4f}")
    print(f"Offset:             {offset:.4f}")
    print("Higher score = LOWER risk")
    return scorecard

scorecard = convert_to_scorecard(lr_model, woe)


# ============================================================
# STEP 8: VISUALISATION — ROC, CALIBRATION, LIFT
# ============================================================

def plot_model_performance(model, X_train, y_train, X_test, y_test):
    """Comprehensive model performance dashboard."""
    fig = plt.figure(figsize=(16, 12))
    gs = gridspec.GridSpec(2, 3, figure=fig)
    fig.suptitle('PD Model Performance Dashboard', fontsize=14, fontweight='bold')

    # ROC Curve
    ax1 = fig.add_subplot(gs[0, 0])
    for X, y, label, style in [
        (X_train, y_train, 'Development', 'b-'),
        (X_test,  y_test,  'Out-of-Time', 'r--')
    ]:
        proba = model.predict_proba(X)[:, 1]
        fpr, tpr, _ = roc_curve(y, proba)
        auc = roc_auc_score(y, proba)
        ax1.plot(fpr, tpr, style, lw=2, label=f'{label} (AUC={auc:.3f})')
    ax1.plot([0,1],[0,1],'k:', lw=1)
    ax1.set_xlabel('False Positive Rate'); ax1.set_ylabel('True Positive Rate')
    ax1.set_title('ROC Curve'); ax1.legend()

    # Gini / Lorenz Curve
    ax2 = fig.add_subplot(gs[0, 1])
    for X, y, label, style in [
        (X_train, y_train, 'Development', 'b-'),
        (X_test,  y_test,  'Out-of-Time', 'r--')
    ]:
        proba = model.predict_proba(X)[:, 1]
        df_g  = pd.DataFrame({'p': proba, 'y': y}).sort_values('p', ascending=False)
        cum_bad  = df_g['y'].cumsum() / df_g['y'].sum()
        cum_all  = np.arange(1, len(df_g)+1) / len(df_g)
        gini = 2 * np.trapz(cum_bad, cum_all) - 1
        ax2.plot(cum_all, cum_bad, style, lw=2, label=f'{label} (Gini={gini:.3f})')
    ax2.plot([0,1],[0,1],'k:', lw=1)
    ax2.set_xlabel('Cumulative % Population'); ax2.set_ylabel('Cumulative % Defaults')
    ax2.set_title('Lorenz Curve (Gini)'); ax2.legend()

    # Calibration
    ax3 = fig.add_subplot(gs[0, 2])
    for X, y, label, style in [
        (X_test, y_test, 'Out-of-Time', 'rs-')
    ]:
        proba = model.predict_proba(X)[:, 1]
        frac_pos, mean_pred = calibration_curve(y, proba, n_bins=10)
        ax3.plot(mean_pred, frac_pos, style, lw=2, ms=6, label=label)
    ax3.plot([0,0.2],[0,0.2],'k--', label='Perfect calibration')
    ax3.set_xlabel('Mean Predicted PD'); ax3.set_ylabel('Observed Default Rate')
    ax3.set_title('Reliability Diagram (Calibration)'); ax3.legend()

    # Lift chart (cumulative capture)
    ax4 = fig.add_subplot(gs[1, 0])
    proba = model.predict_proba(X_test)[:, 1]
    df_lift = pd.DataFrame({'p': proba, 'y': y_test.values}).sort_values('p', ascending=False)
    df_lift['cum_captures'] = df_lift['y'].cumsum() / df_lift['y'].sum()
    df_lift['cum_pct_pop']  = np.arange(1, len(df_lift)+1) / len(df_lift)
    ax4.plot(df_lift['cum_pct_pop'] * 100, df_lift['cum_captures'] * 100, 'b-', lw=2)
    ax4.plot([0,100],[0,100],'k--', label='Random')
    ax4.axvline(x=10, color='r', linestyle=':', label='Top 10%')
    ax4.set_xlabel('Cumulative % Scored'); ax4.set_ylabel('Cumulative % Defaults Captured')
    ax4.set_title('Lift / Capture Rate Chart'); ax4.legend()

    # Predicted PD distribution by default status
    ax5 = fig.add_subplot(gs[1, 1])
    proba = model.predict_proba(X_test)[:, 1]
    ax5.hist(proba[y_test==0], bins=50, alpha=0.6, density=True,
             color='steelblue', label='Non-defaults')
    ax5.hist(proba[y_test==1], bins=30, alpha=0.6, density=True,
             color='firebrick', label='Defaults')
    ax5.set_xlabel('Predicted PD'); ax5.set_ylabel('Density')
    ax5.set_title('Score Separation'); ax5.legend()

    # Feature importance (IV)
    ax6 = fig.add_subplot(gs[1, 2])
    iv_df = woe.iv_summary()
    ax6.barh(iv_df['variable'], iv_df['iv'], color='steelblue')
    ax6.axvline(x=0.1, color='orange', linestyle='--', label='IV=0.1 (weak)')
    ax6.axvline(x=0.3, color='green',  linestyle='--', label='IV=0.3 (strong)')
    ax6.set_xlabel('Information Value (IV)')
    ax6.set_title('Variable Importance (IV)')
    ax6.legend(fontsize=8)

    plt.tight_layout()
    plt.savefig('/tmp/m23_model_performance.png', dpi=120, bbox_inches='tight')
    plt.close()
    print("\nPerformance dashboard saved.")

plot_model_performance(lr_model, X_train_woe, y_train, X_test_woe, y_test)


# ============================================================
# STEP 9: LONG-RUN CALIBRATION (TTC ADJUSTMENT)
# ============================================================

def ttc_calibration(raw_pd: np.ndarray, observed_lr: float,
                    target_lra: float) -> np.ndarray:
    """
    Scale predicted PDs to match the long-run average default rate.
    Simple linear scaling (ratio method).

    Args:
        raw_pd:       Array of model-predicted PDs (point-in-time)
        observed_lr:  Mean observed default rate in development sample
        target_lra:   Long-run average default rate (7-year cycle average)
    """
    scale_factor = target_lra / observed_lr
    ttc_pd = raw_pd * scale_factor
    # Apply floor of 0.03% (Basel minimum for senior corporate)
    ttc_pd = np.clip(ttc_pd, 0.0003, 1.0)
    return ttc_pd

observed_lra_dev  = y_train.mean()
target_lra        = 0.055   # hypothetical 7-year LRA (including GFC)
test_proba_raw    = lr_model.predict_proba(X_test_woe)[:, 1]
test_proba_ttc    = ttc_calibration(test_proba_raw, observed_lra_dev, target_lra)

print(f"\n--- TTC Calibration ---")
print(f"Development sample mean PD:  {observed_lra_dev:.3%}")
print(f"Target long-run average PD:  {target_lra:.3%}")
print(f"Scale factor:                {target_lra/observed_lra_dev:.4f}x")
print(f"Mean PD before TTC:          {test_proba_raw.mean():.3%}")
print(f"Mean PD after TTC:           {test_proba_ttc.mean():.3%}")
print(f"Observed default rate (OOT): {y_test.mean():.3%}")
```

---

## 11. Interview Questions

**Conceptual:**

1. *"Why do we use logistic regression and not linear regression for PD modelling?"*
   Answer: Linear regression can produce predicted probabilities outside [0,1], which are meaningless as probabilities and cannot be used in EL = PD × LGD × EAD. Logistic regression applies the logit link function to map any real-valued linear combination to (0,1), ensuring valid probability outputs. Additionally, linear regression assumes constant variance (homoskedasticity) which is violated by binary outcomes — Bernoulli variance is p(1-p), not constant.

2. *"What is the Gini coefficient in a credit context? How is it related to AUC?"*
   Answer: Gini measures discriminatory power — how well the model separates defaulters from non-defaulters. It is the normalised area between the Lorenz curve and the diagonal: Gini = 2 × AUC − 1. AUC = 0.75 → Gini = 0.50. A model with Gini = 0 is no better than random; Gini = 1 is perfect discrimination.

3. *"A model has Gini 68% in-sample but 42% out-of-time. What do you conclude?"*
   Answer: The 26-percentage-point gap signals severe overfitting. The model has learned the idiosyncrasies of the development data rather than generalising to new observations. Remedies: reduce number of variables (EVP constraint), apply Lasso regularisation, enforce monotone WoE binning, or increase development sample size.

4. *"What is the difference between discrimination and calibration? Can a model be good at one but bad at the other?"*
   Answer: Discrimination (Gini/AUC) measures whether the model correctly ranks borrowers by riskiness. Calibration measures whether the predicted PD equals the true probability of default. A model can discriminate perfectly (rank all defaulters above all non-defaulters) but still be uncalibrated (predict 20% PD when true PD is 5%). For regulatory purposes, calibration is non-negotiable — the PD must be a valid probability.

5. *"Walk me through TTC vs PIT calibration. Why does Basel require TTC?"*
   Answer: Point-in-time PDs fluctuate with the economic cycle — low in booms, high in recessions. Through-the-cycle PDs represent a long-run average that is stable across the cycle. Basel requires TTC for IRB capital to prevent procyclicality: if capital requirements spike in recessions (because PIT PDs spike), banks would cut lending precisely when the economy needs credit most. IFRS 9, by contrast, requires PIT PDs for provisioning.

**Technical:**

6. *"What is maximum likelihood estimation? Why don't we use OLS for logistic regression?"*
7. *"Explain the WoE transformation. Why does it help logistic regression?"*
8. *"How would you handle a variable with the 'right sign' but very high VIF?"*
9. *"What is the Hosmer-Lemeshow test testing? What is the null hypothesis?"*
10. *"How do you convert a logistic regression model output to a scorecard?"*

---

## 12. Common Mistakes

**Mistake 1: Using test data for threshold selection**
The classification threshold (e.g., PD > 2% → watchlist) must be set on a separate validation set, not the test set. Using test data inflates performance metrics.

**Mistake 2: Ignoring class imbalance**
If 95% of obligors do not default, a model that predicts "no default" for everyone achieves 95% accuracy. This is meaningless. Always evaluate using Gini, AUC, and KS — not accuracy. Consider class-weighted logistic regression for highly imbalanced datasets.

**Mistake 3: Random train/test split for time-series credit data**
Credit data is serially correlated. A 2015 observation of the same borrower who appears in 2016 will contaminate the test set if a random split is used. Always use temporal splits.

**Mistake 4: WoE-transforming the test set using test data**
WoE bin boundaries must be computed on training data only and applied to test data. Re-computing bins on test data causes leakage.

**Mistake 5: Accepting a negative coefficient without investigation**
If a variable expected to increase risk has a negative coefficient, this is a red flag. Common causes: multicollinearity (another correlated variable absorbing the effect), wrong variable definition, or data error. Do not dismiss — investigate.

**Mistake 6: Omitting monotonicity constraints**
Regulatory models require monotone WoE — within a variable, WoE should change monotonically with risk. A non-monotone WoE (risk goes up, then down, then up) is a sign of overfitting the binning.

**Mistake 7: Not testing for population stability before production**
Deploying a model without PSI monitoring means you will not detect when the population shifts. PSI should be automated and run monthly.

---

## 13. Case Studies

**Case Study 1: UK SME PD Model Rebuild (2021)**

A UK bank's SME PD model had been in production since 2015. By 2021, PSI on the leverage ratio variable exceeded 0.30 — the post-COVID SME population had fundamentally different debt structures due to CBILS lending. Key issues:
- Model was developed pre-COVID; no pandemic data in development sample
- Leverage ratios had shifted dramatically (government-guaranteed debt not captured in model numerator)
- Gini dropped from 58% (2019) to 38% (2021)
- Remediation: Emergency recalibration using 2020-2021 data; new variable for CBILS/bounce-back loan indicator; revised WoE bins for leverage

**Lesson:** Model performance should be monitored monthly on live population, not just tested at development time.

**Case Study 2: Corporate PD Model Validation Finding**

An ECB internal model investigation (IMI) identified the following in a large EU bank's corporate PD model:
- Development sample used 2012-2018 data (post-GFC recovery; no stress period)
- The bank claimed the model was TTC but used a 6-year average (2012-2018) as the long-run default rate — 1.2% per year, far below the 2009 peak of 4.5%
- Result: Model underpredicted PDs in stress scenarios; insufficient capital buffers
- ECB required: (a) rebuild with 2007-2020 data; (b) downturn adjustment per EBA GL

**Lesson:** Long-run average default rates must genuinely cover a full cycle including at least one significant stress period.

---

## 14. Iterative Reinforcement

**Week 1 — Conceptual:**
- Derive the logistic regression gradient (score function) by hand from the log-likelihood
- Prove that Gini = 2 × AUC − 1 using the definition of both curves

**Week 2 — Data Preparation:**
- Take a sample dataset; apply WoE binning manually to leverage ratio; compute IV
- Check that WoE is monotone; if not, merge non-monotone bins

**Week 3 — Model Building:**
- Build a logistic regression in Python on the synthetic dataset from Section 10
- Vary the number of WoE-transformed variables; observe Gini vs VIF trade-off

**Week 4 — Validation:**
- Produce a full decile table (predicted vs observed) on OOT sample
- Run the Hosmer-Lemeshow test; interpret the p-value

**Week 5 — Scorecard:**
- Convert a fitted logistic regression to a scorecard with PDO=20, target score=600 at 1:1 odds
- Verify that a score of 620 corresponds to odds of 0.5:1 (half the default probability)

**Self-Assessment:**
1. Recite the Gini benchmarks for retail vs corporate PD models from memory
2. Explain TTC vs PIT calibration in two minutes to a non-statistical credit officer
3. Describe three reasons why a model with high development Gini might fail in production

---

## 15. Source Material

**Foundational Texts:**
- Siddiqi, N. (2012). *Credit Risk Scorecards.* Wiley. — The practical handbook; Chapter 6 on WoE/IV is essential.
- Hosmer, D.W., Lemeshow, S., & Sturdivant, R.X. (2013). *Applied Logistic Regression.* 3rd ed. Wiley.
- Anderson, R. (2007). *The Credit Scoring Toolkit.* Oxford University Press.

**Regulatory:**
- EBA (2017). *EBA/GL/2017/16 — Guidelines on PD Estimation, LGD Estimation and Treatment of Defaulted Assets.*
- Federal Reserve (2011). *SR 11-7 — Guidance on Model Risk Management.*
- ECB (2019). *ECB Guide to Internal Models — Credit Risk Chapter.*
- Basel Committee (2005). *Studies on the Validation of Internal Rating Systems.* Working Paper No. 14.

**Statistical Methods:**
- Harrell, F.E. (2015). *Regression Modeling Strategies.* 2nd ed. Springer. — Chapters on logistic regression and calibration.
- Steyerberg, E.W. (2019). *Clinical Prediction Models.* 2nd ed. Springer. (Excellent on discrimination vs calibration.)

**Papers:**
- Engelmann, B., Hayden, E., & Tasche, D. (2003). "Measuring the Discriminative Power of Rating Systems." *Deutsche Bundesbank Discussion Paper Series 2, No. 01/2003.*
- Platt, J. (1999). "Probabilistic outputs for support vector machines and comparisons to regularized likelihood methods." *Advances in Large Margin Classifiers.*
- Hand, D.J. & Henley, W.E. (1997). "Statistical classification methods in consumer credit scoring." *Journal of the Royal Statistical Society*, Series A, 160(3), 523-541.

**Python Libraries:**
- scikit-learn (sklearn) documentation: sklearn.linear_model.LogisticRegression
- statsmodels: statsmodels.discrete.discrete_model.Logit (full statistical output including p-values)
- scorecardpy: Python implementation of WoE/IV and scorecard generation
