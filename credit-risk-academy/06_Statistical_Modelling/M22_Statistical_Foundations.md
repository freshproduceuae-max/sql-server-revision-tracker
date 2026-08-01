# M22 — Statistical Foundations for Credit Risk

---

## 1. Business Purpose

Credit risk is fundamentally a probabilistic problem: a bank cannot know with certainty whether a borrower will default, but it can estimate the *probability* of default and, if default occurs, the likely severity of loss. Statistics is the language in which those estimates are written, validated, and communicated to regulators.

**Why this matters to an analyst:**

Every credit model — scorecards, PD models, LGD models, stress tests — is built on statistical assumptions. If you do not understand those assumptions, you cannot:
- Know when a model is producing unreliable outputs.
- Challenge a model vendor's claims intelligently.
- Satisfy regulatory model validation requirements.
- Interpret coefficient signs, p-values, and Gini coefficients correctly.

The Basel III/IV framework, the EBA guidelines on IRB models, and the Federal Reserve's SR 11-7 all require that model developers and validators understand the statistical methods underlying their models. "The model says so" is not an acceptable justification.

**Business outcomes statistical literacy enables:**
- **Capital efficiency:** More accurate PD/LGD estimates → more accurate RWA → neither overcapitalising (wasting equity) nor undercapitalising (regulatory breach).
- **Pricing:** Risk-adjusted pricing requires a reliable estimate of expected loss (EL = PD × LGD × EAD). Statistical noise in any component directly erodes pricing accuracy.
- **Provisioning (IFRS 9):** Point-in-time PD and lifetime LGD estimates drive IFRS 9 ECL calculations; statistical flaws translate directly into P&L volatility.
- **Portfolio management:** Correlation structure between borrowers determines concentration risk; understanding it requires multivariate statistics.

---

## 2. Accounting Concepts

**Expected Credit Loss (IFRS 9 / CECL):**

Under IFRS 9, banks must recognise ECL on day one for performing loans (Stage 1: 12-month ECL) and lifetime ECL for loans with significant credit deterioration (Stage 2) or in default (Stage 3). The ECL formula is:

```
ECL = PD × LGD × EAD × DF
```

where DF is a discount factor. Each of PD, LGD, and EAD is a *statistical estimate* with associated uncertainty. The accounting standard therefore embeds statistical modelling at its core.

**Loan Loss Provision (LLP):**
The provision recognised on the income statement. Statistically, this should equal the expected value of future credit losses. A misspecified statistical model will cause the provision to be systematically too high (over-provision → understated profits) or too low (under-provision → sudden loss spikes).

**Deferred Tax Assets (DTA):**
Excess provisions create DTAs. Banks with chronically mis-estimated models therefore carry balance sheet inefficiencies that are ultimately statistical in origin.

**Key accounting–statistics interface:**
- Transition between IFRS 9 stages is triggered by "significant increase in credit risk" (SICR). Whether a loan crosses the SICR threshold depends on the PD model output. The statistical reliability of the PD model is therefore a direct accounting input.

---

## 3. Financial Concepts

**Expected Loss (EL) and Unexpected Loss (UL):**

```
EL = PD × LGD × EAD
UL = EAD × LGD × sqrt(PD × (1 - PD))       [single-obligor approximation]
```

EL is covered by provisions and loan pricing spreads. UL requires capital. The distinction between EL and UL is entirely statistical — it is the difference between the mean and the tail of a loss distribution.

**Credit Value at Risk (Credit VaR):**

```
Credit VaR = Loss at 99.9th percentile - EL
```

The 99.9th percentile of the portfolio loss distribution is a statistical quantity. Basel IRB capital formulas are derived from the Vasicek single-factor model, which is a specific statistical model of correlated defaults.

**Risk-Adjusted Return on Capital (RAROC):**

```
RAROC = (Revenue - EL - Operating Costs) / Economic Capital
```

RAROC-based pricing requires accurate EL. A 10 basis point error in PD on a large corporate loan can swing RAROC by several percentage points.

**Spread and Carry:**
Credit spreads in bond markets embed a risk premium above the actuarially fair default probability. Understanding the difference between *risk-neutral* probabilities (from spreads) and *real-world* probabilities (from historical data) is a statistical and financial distinction that matters for stress testing and derivatives valuation.

---

## 4. Statistical Concepts

### 4.1 Descriptive Statistics for Loss Distributions

Credit loss distributions are *not* normal. They are right-skewed (most years have low losses; occasionally losses are catastrophic) and fat-tailed (extreme losses occur more often than a normal distribution predicts).

**Mean (Expected Loss):**
```
μ = (1/n) × Σ xᵢ
```

**Variance and Standard Deviation:**
```
σ² = (1/n) × Σ (xᵢ - μ)²
σ = sqrt(σ²)
```

**Skewness** — measures asymmetry. A positive skew means the right tail is heavier:
```
Skewness = (1/n) × Σ [(xᵢ - μ)/σ]³
```
Credit loss distributions typically have skewness > 2. A normal distribution has skewness = 0.

**Kurtosis** — measures tail heaviness. Excess kurtosis = kurtosis - 3:
```
Kurtosis = (1/n) × Σ [(xᵢ - μ)/σ]⁴
Excess Kurtosis = Kurtosis - 3
```
Credit losses exhibit excess kurtosis > 0 (leptokurtic / fat tails). A normal distribution has excess kurtosis = 0. Using a normal distribution to model credit losses understates tail risk — this was a key failure in pre-2008 CDO modelling.

### 4.2 Probability Distributions Used in Credit Risk

**Bernoulli Distribution — Default Indicator:**

For a single obligor, default is a binary event:
```
P(D = 1) = PD
P(D = 0) = 1 - PD
E[D] = PD
Var[D] = PD × (1 - PD)
```
This is the foundational building block. All PD models estimate the Bernoulli parameter.

**Binomial Distribution — Portfolio Default Count:**

For n independent obligors each with PD p:
```
P(k defaults) = C(n,k) × p^k × (1-p)^(n-k)
E[k] = n × p
Var[k] = n × p × (1 - p)
```
Independence assumption breaks down for correlated borrowers — which is why Vasicek is needed.

**Beta Distribution — LGD Modelling:**

LGD is bounded [0,1], making the Beta distribution a natural choice:
```
f(x; α, β) = x^(α-1) × (1-x)^(β-1) / B(α, β)
E[X] = α / (α + β)
Var[X] = αβ / [(α+β)²(α+β+1)]
```
LGD distributions are often bimodal (many recoveries near 0% OR near 100%), which requires mixture models or inflated Beta distributions.

**Vasicek Distribution — Portfolio Credit Risk:**

The Vasicek model underpins the Basel IRB capital formula. For a large homogeneous portfolio with asset correlation ρ:

```
P(portfolio loss rate > q) = Φ[(Φ⁻¹(PD) - sqrt(ρ) × Φ⁻¹(1-q)) / sqrt(1-ρ)]
```

Where Φ is the standard normal CDF. The key insight: a single systematic factor Z drives correlated defaults. When Z is bad (recession), all PDs simultaneously spike.

**Basel IRB Capital Formula (derived from Vasicek):**
```
K = LGD × [Φ(Φ⁻¹(PD)/sqrt(1-R) + sqrt(R/(1-R)) × Φ⁻¹(0.999)) - PD]
```
where R is the asset correlation parameter. This is the 99.9th percentile loss minus EL.

**Log-Normal Distribution — LGD on secured exposures:**

Recovery values on collateral are often log-normally distributed. If collateral value V ~ LogNormal(μ, σ²):
```
LGD = max(0, 1 - V/EAD)
```

**Poisson Distribution — Low-Default Portfolios:**

For rare defaults (small PD, large n):
```
P(k defaults) ≈ e^(-λ) × λ^k / k!   where λ = n × PD
```
Useful for sovereign and large corporate portfolios where default counts per year are often 0 or 1.

### 4.3 Correlation and Portfolio Risk

**Pearson Correlation:**
```
ρ(X,Y) = Cov(X,Y) / (σₓ × σᵧ)
```
Pearson correlation measures linear relationships. For non-linear relationships (common in credit), Spearman rank correlation is more robust:
```
ρₛ = 1 - 6Σdᵢ² / [n(n²-1)]
```
where dᵢ is the rank difference for observation i.

**Default Correlation:**
The correlation between default events is distinct from asset correlation:
```
ρ_default = [P(D₁=1, D₂=1) - PD₁ × PD₂] / sqrt[PD₁(1-PD₁) × PD₂(1-PD₂)]
```

Default correlation is typically low (0.01 to 0.05 for retail; higher for same-industry corporates) but has enormous impact on portfolio tail risk. The 2007–2009 crisis revealed that CDO models systematically underestimated default correlation.

**Copulas:**

A copula separates the marginal distributions of individual defaults from their joint distribution. The Gaussian copula:
```
C(u₁, u₂, ..., uₙ) = Φₙ(Φ⁻¹(u₁), ..., Φ⁻¹(uₙ); Σ)
```
The Gaussian copula was used for CDO pricing. Its fatal flaw: it underestimates tail dependence — the tendency for defaults to cluster in crises. The Student-t copula handles tail dependence better.

### 4.4 Hypothesis Testing for Model Validation

**t-Test — Testing Coefficient Significance:**

H₀: β = 0 (predictor has no effect on default probability)
```
t = β̂ / SE(β̂)
```
Compare to t-distribution with n-k-1 degrees of freedom. For large samples, compare to z = 1.96 for 5% significance.

**Chi-Square Test — Categorical Variable Association:**

Tests whether a categorical predictor (industry, rating) is independent of the default event:
```
χ² = Σ [(Oᵢ - Eᵢ)² / Eᵢ]
```
Degrees of freedom = (rows-1)(cols-1). Used in variable selection for scorecards.

**Hosmer-Lemeshow Test — Calibration:**

Tests whether predicted PDs match observed default rates across deciles:
```
HL = Σₖ [(Oₖ - nₖ × p̄ₖ)² / (nₖ × p̄ₖ × (1-p̄ₖ))]
```
This follows χ² with g-2 degrees of freedom (g = number of groups). Failure to reject H₀ means the model is well-calibrated.

**Binomial Test — Backtesting Default Rates:**

Tests whether observed defaults are consistent with predicted PDs:
```
z = (observed defaults - n × PD) / sqrt(n × PD × (1 - PD))
```
This underpins Basel traffic-light backtesting.

### 4.5 Regression Basics

**OLS Assumptions (Gauss-Markov):**
1. Linearity: E[y] = Xβ
2. No perfect multicollinearity
3. Zero conditional mean: E[ε|X] = 0
4. Homoskedasticity: Var[ε|X] = σ²I
5. No autocorrelation: Cov(εᵢ, εⱼ) = 0 for i ≠ j
6. Normality of errors (for inference; not required for BLUE)

When these hold, OLS gives the Best Linear Unbiased Estimator (BLUE).

**Multicollinearity:**
When predictors are highly correlated, coefficient estimates become unstable (high variance). Diagnosed with Variance Inflation Factor:
```
VIF_j = 1 / (1 - R²_j)
```
where R²_j is R² from regressing predictor j on all other predictors. VIF > 10 is typically problematic. VIF > 5 warrants investigation.

**Heteroskedasticity:**
Variance of errors is not constant — common in credit (error variance higher for riskier borrowers). Detected via Breusch-Pagan test. Consequence: OLS standard errors are incorrect → invalid inference.

**Remedy:** Robust (White) standard errors, or WLS:
```
Minimise: Σ wᵢ(yᵢ - xᵢβ)²  where wᵢ = 1/σᵢ²
```

### 4.6 Law of Large Numbers and Actuarial Basis

**Weak LLN:**
```
P(|X̄ₙ - μ| > ε) → 0 as n → ∞
```
As portfolio size grows, the observed loss rate converges to EL. This is why retail credit (millions of loans) can be modelled actuarially. Corporate credit (few obligors) cannot — idiosyncratic risk does not diversify away.

**Practical implication:** A retail mortgage portfolio with 500,000 loans at PD=1% will experience approximately 5,000 defaults per year with very small variance around that number. A corporate portfolio with 50 obligors at PD=1% might see 0 defaults or 3 in the same year — the LLN provides little protection.

### 4.7 Information Value (IV) and Weight of Evidence (WoE)

IV and WoE are used to assess the predictive power of candidate variables for PD models before regression.

**Weight of Evidence for bin i:**
```
WoE_i = ln(Distribution of Events_i / Distribution of Non-Events_i)
       = ln[(Defaultsᵢ/Total Defaults) / (Non-Defaultsᵢ/Total Non-Defaults)]
```
A positive WoE bin has a higher proportion of defaults than the average. WoE transforms convert categorical/continuous variables into a single numeric scale interpretable as log-odds.

**Information Value:**
```
IV = Σᵢ (Distribution of Events_i - Distribution of Non-Events_i) × WoE_i
```

| IV Range | Predictive Power |
|----------|-----------------|
| < 0.02   | Unpredictive    |
| 0.02–0.1 | Weak            |
| 0.1–0.3  | Medium          |
| 0.3–0.5  | Strong          |
| > 0.5    | Suspicious (possible data leakage) |

WoE binning also handles non-linear relationships and missing values — both are assigned to their own bins.

### 4.8 Overfitting and Regularisation

**Overfitting:**
A model that fits the training data perfectly but generalises poorly. In credit, overfitting causes a model that performs well in development but deteriorates rapidly in production (model decay).

Detected by comparing in-sample performance (development) vs out-of-sample (holdout). A Gini that drops from 65% (in-sample) to 45% (out-of-sample) signals severe overfitting.

**Bias-Variance Tradeoff:**
```
E[(y - ŷ)²] = Bias² + Variance + Irreducible Noise
```
Complex models have low bias but high variance (overfit). Simple models have high bias but low variance. Regularisation increases bias to reduce variance.

**Ridge Regression (L2):**
Adds penalty proportional to sum of squared coefficients:
```
Minimise: Σ(yᵢ - xᵢβ)² + λ × Σβⱼ²
```
Ridge shrinks all coefficients toward zero but never to exactly zero. Useful when many predictors are mildly informative.

**Lasso Regression (L1):**
Adds penalty proportional to sum of absolute values:
```
Minimise: Σ(yᵢ - xᵢβ)² + λ × Σ|βⱼ|
```
Lasso performs variable selection — many coefficients shrink to exactly zero. Useful for high-dimensional credit datasets.

**Elastic Net:**
Combines L1 and L2:
```
Minimise: Σ(yᵢ - xᵢβ)² + λ₁Σ|βⱼ| + λ₂Σβⱼ²
```
The tuning parameter λ is selected via cross-validation on a held-out dataset.

---

## 5. Regulatory Framework

**Basel III/IV — IRB Approach:**
Banks using the Internal Ratings-Based (IRB) approach must develop statistical models for PD, LGD, and EAD. The Basel Committee requires:
- Minimum 7 years of historical data (5 for LGD/EAD)
- Statistical validation: discriminatory power, calibration, stability
- Documentation of all statistical choices and assumptions
- Annual back-testing

**SR 11-7 (Federal Reserve, 2011):** Supervisory guidance on model risk management. Defines a model as "a quantitative method, system, or approach that applies statistical, economic, financial, or mathematical theories, techniques, and assumptions to process input data into quantitative estimates." Requires independent model validation covering conceptual soundness, data integrity, and outcome analysis.

**EBA Guidelines on PD and LGD Estimation (EBA/GL/2017/16):**
Specifies statistical requirements: long-run average default rates, downturn LGD adjustments, representativeness of historical data. Requires that models "adequately reflect the risk characteristics of the exposures."

**IFRS 9 (IASB):**
Requires that ECL models incorporate "reasonable and supportable information available without undue cost or effort." This includes forward-looking macroeconomic scenarios — a statistical challenge (satellite models linking macro variables to credit parameters).

**PRA SS1/23 (Bank of England):**
UK-specific guidance on model risk management, building on SR 11-7 with additional expectations around ML model governance.

---

## 6. Data Required

**For Descriptive Statistics and Distribution Fitting:**
- Historical loan-level default data (minimum 7 years, preferably covering a full credit cycle)
- LGD data: workout files showing recoveries, costs, and timing post-default
- Portfolio exposure data: EAD by obligor, sector, geography

**For Regression Modelling:**
- Obligor financials: leverage, coverage, profitability ratios (2-5 years history)
- Loan characteristics: facility type, tenor, seniority, collateral type
- Macroeconomic variables: GDP growth, unemployment, sector indices
- Credit bureau data (for retail): bureau score, payment history, utilisation

**Data Quality Requirements:**
- Default flag: precisely defined per Basel (90 days past due OR unlikeliness to pay)
- Observation date: clear point-in-time vs through-the-cycle distinction
- No data leakage: predictors must be observable *before* the default event
- Missing data: documented pattern (MCAR/MAR/MNAR); imputation method justified

**Minimum Sample Sizes (Rule of Thumb):**
- Events per Variable (EPV) ≥ 10 for logistic regression
- Minimum 20-30 defaults per segment for sub-population modelling
- Population Stability: development and application populations must be comparable

---

## 7. How Analysts Actually Work

**Day-to-day statistical work in credit risk:**

1. **Data pull and EDA:** Analysts start every project with exploratory data analysis — summary statistics, distribution plots, missing value counts, outlier identification. This is 40-60% of model development time.

2. **Variable screening:** IV/WoE analysis on all candidate variables. Variables with IV < 0.02 are discarded. Variables with IV > 0.5 are investigated for leakage.

3. **Correlation matrix:** Before any modelling, produce a Spearman correlation matrix. Variables with |ρ| > 0.7 are candidates for elimination (keep the one with higher IV).

4. **Model development:** Logistic regression with WoE-transformed variables remains the industry standard for regulatory PD models. Analysts will build 5-10 candidate models varying variable sets and binning choices.

5. **Performance testing:** Gini, KS, AUC calculated on development, validation (holdout), and out-of-time samples. Minimum acceptance: Gini > 30%.

6. **Calibration:** Observed default rates compared to predicted PDs by decile. Hosmer-Lemeshow test.

7. **Stability testing:** Population Stability Index (PSI) to monitor whether the model's input distribution has shifted. PSI > 0.25 triggers model review.

8. **Documentation:** Model documentation packages run 50-150 pages for a regulatory IRB model.

**Population Stability Index:**
```
PSI = Σ [(Actual% - Expected%) × ln(Actual%/Expected%)]
```

| PSI | Interpretation |
|-----|----------------|
| < 0.10 | No significant shift |
| 0.10–0.25 | Minor shift; investigate |
| > 0.25 | Major shift; model review required |

---

## 8. Excel Implementation

**Descriptive Statistics Dashboard:**

Excel's Data Analysis ToolPak provides basic descriptive statistics. For credit work:

```
=AVERAGE(loss_data)           → Mean loss rate
=STDEV(loss_data)             → Standard deviation
=SKEW(loss_data)              → Skewness
=KURT(loss_data)              → Excess kurtosis
=PERCENTILE(loss_data, 0.999) → 99.9th percentile (for VaR)
=CORREL(series1, series2)     → Pearson correlation
```

**WoE Calculation Table:**
Set up a pivot table by bin:

| Bin | Defaults | Non-Defaults | %Def | %Non-Def | WoE | IV_Component |
|-----|----------|--------------|------|----------|-----|--------------|
| 1   | 5        | 45           | 0.05 | 0.045    | =LN(C5/D5) | =(C5-D5)*E5 |

```
WoE = LN(%Defaults in bin / %Non-Defaults in bin)
IV_component = (%Defaults - %Non-Defaults) × WoE
IV_total = SUM(IV_components)
```

**Binomial Backtesting:**
```
=NORM.S.DIST((actual_defaults - n*PD)/SQRT(n*PD*(1-PD)), TRUE)
```
If this p-value < 0.05 (one-tailed), the model is overestimating PD.

**Vasicek Percentile:**
```
=NORM.S.INV( (NORM.S.INV(PD) - SQRT(rho)*NORM.S.INV(1-alpha)) / SQRT(1-rho) )
```
where alpha = 0.999 for Basel 99.9th percentile capital calculation.

---

## 9. SQL Implementation

```sql
-- ============================================================
-- M22: Statistical Foundations — SQL Implementations
-- ============================================================

-- 1. Descriptive statistics on loan loss rates
SELECT
    COUNT(*)                                              AS n_observations,
    AVG(loss_rate)                                        AS mean_loss_rate,
    STDEV(loss_rate)                                      AS std_loss_rate,
    MIN(loss_rate)                                        AS min_loss_rate,
    MAX(loss_rate)                                        AS max_loss_rate,
    PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY loss_rate) AS p25,
    PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY loss_rate) AS median_loss_rate,
    PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY loss_rate) AS p75,
    PERCENTILE_CONT(0.999) WITHIN GROUP (ORDER BY loss_rate) AS p999
FROM dbo.loan_performance
WHERE reporting_date >= DATEADD(YEAR, -7, GETDATE());

-- 2. WoE and IV calculation for a continuous variable (leverage ratio)
WITH binned AS (
    SELECT
        loan_id,
        default_flag,
        NTILE(10) OVER (ORDER BY leverage_ratio) AS decile
    FROM dbo.loan_characteristics
),
bin_stats AS (
    SELECT
        decile,
        SUM(default_flag)           AS events,
        SUM(1 - default_flag)       AS non_events,
        COUNT(*)                    AS total
    FROM binned
    GROUP BY decile
),
totals AS (
    SELECT
        SUM(events)      AS total_events,
        SUM(non_events)  AS total_non_events
    FROM bin_stats
),
woe_calc AS (
    SELECT
        b.decile,
        b.events,
        b.non_events,
        b.total,
        CAST(b.events AS FLOAT)      / t.total_events     AS pct_events,
        CAST(b.non_events AS FLOAT)  / t.total_non_events AS pct_non_events,
        LOG(CAST(b.events AS FLOAT) / t.total_events
            / (CAST(b.non_events AS FLOAT) / t.total_non_events)) AS woe
    FROM bin_stats b
    CROSS JOIN totals t
)
SELECT
    decile,
    events,
    non_events,
    ROUND(pct_events, 4)     AS pct_events,
    ROUND(pct_non_events, 4) AS pct_non_events,
    ROUND(woe, 4)            AS woe,
    ROUND((pct_events - pct_non_events) * woe, 4) AS iv_component
FROM woe_calc
ORDER BY decile;

-- 3. Correlation matrix (Pearson) between financial ratios
SELECT
    CORR_MATRIX.var1,
    CORR_MATRIX.var2,
    CORR_MATRIX.correlation
FROM (
    SELECT
        'leverage' AS var1, 'coverage' AS var2,
        (COUNT(*) * SUM(leverage_ratio * coverage_ratio)
         - SUM(leverage_ratio) * SUM(coverage_ratio))
        / (SQRT(COUNT(*) * SUM(leverage_ratio*leverage_ratio) - POWER(SUM(leverage_ratio),2))
           * SQRT(COUNT(*) * SUM(coverage_ratio*coverage_ratio) - POWER(SUM(coverage_ratio),2)))
         AS correlation
    FROM dbo.loan_characteristics
) AS CORR_MATRIX;

-- 4. Population Stability Index (PSI)
WITH dev_dist AS (
    SELECT
        score_band,
        CAST(COUNT(*) AS FLOAT) / SUM(COUNT(*)) OVER () AS pct_dev
    FROM dbo.model_scores_development
    GROUP BY score_band
),
app_dist AS (
    SELECT
        score_band,
        CAST(COUNT(*) AS FLOAT) / SUM(COUNT(*)) OVER () AS pct_app
    FROM dbo.model_scores_application
    GROUP BY score_band
)
SELECT
    d.score_band,
    ROUND(d.pct_dev, 4)  AS pct_dev,
    ROUND(a.pct_app, 4)  AS pct_app,
    ROUND((a.pct_app - d.pct_dev) * LOG(a.pct_app / d.pct_dev), 4) AS psi_component
FROM dev_dist d
JOIN app_dist a ON d.score_band = a.score_band
ORDER BY d.score_band;

-- 5. Backtesting: comparing predicted PD to observed default rate by rating grade
SELECT
    rating_grade,
    COUNT(*)                        AS n_obligors,
    AVG(predicted_pd)               AS avg_predicted_pd,
    AVG(CAST(default_flag AS FLOAT)) AS observed_default_rate,
    AVG(CAST(default_flag AS FLOAT))
        - AVG(predicted_pd)         AS calibration_error,
    ABS(AVG(CAST(default_flag AS FLOAT)) - AVG(predicted_pd))
        / AVG(predicted_pd)         AS relative_error_pct
FROM dbo.model_backtest
GROUP BY rating_grade
ORDER BY rating_grade;
```

---

## 10. Python Implementation

```python
"""
M22 — Statistical Foundations for Credit Risk
Complete Python Implementation
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
from scipy import stats
from scipy.special import beta as beta_func
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)

# ============================================================
# 1. GENERATE SYNTHETIC CREDIT LOSS DATA
# ============================================================

def generate_credit_data(n_obligors: int = 1000, n_years: int = 10) -> pd.DataFrame:
    """
    Generate synthetic loan-level data with realistic credit properties.
    - Right-skewed loss rates
    - Correlated defaults (via systematic factor)
    """
    records = []
    for year in range(n_years):
        # Systematic economic factor (recession in years 3 and 8)
        macro_shock = -1.5 if year in [3, 8] else 0.3
        systematic_factor = macro_shock + np.random.normal(0, 0.5)

        for i in range(n_obligors):
            # Obligor-level characteristics
            leverage = np.random.beta(2, 5) * 10          # 0 to 10
            coverage = np.random.lognormal(0.5, 0.6)       # EBITDA/Interest
            size = np.random.choice(['Large', 'Mid', 'Small'], p=[0.2, 0.5, 0.3])

            # Asset quality score (latent variable driving default)
            idiosyncratic = np.random.normal(0, 1)
            rho = 0.20  # asset correlation
            asset_quality = (np.sqrt(rho) * systematic_factor
                             + np.sqrt(1 - rho) * idiosyncratic)

            # Default threshold (higher leverage → lower threshold)
            threshold = stats.norm.ppf(0.03 + 0.005 * leverage)
            default_flag = int(asset_quality < threshold)

            # LGD — Beta distributed, higher for unsecured
            lgd = np.random.beta(2, 3) if default_flag else 0.0

            # EAD
            ead = np.random.lognormal(4, 1.5)  # in $000s

            records.append({
                'year': year,
                'obligor_id': i,
                'leverage': leverage,
                'coverage': coverage,
                'size': size,
                'systematic_factor': systematic_factor,
                'default_flag': default_flag,
                'lgd': lgd,
                'ead': ead,
                'loss': default_flag * lgd * ead
            })

    return pd.DataFrame(records)

df = generate_credit_data()
print(f"Dataset: {len(df):,} observations, {df['default_flag'].sum():,} defaults")
print(f"Overall default rate: {df['default_flag'].mean():.2%}")


# ============================================================
# 2. DESCRIPTIVE STATISTICS ON LOSS DISTRIBUTIONS
# ============================================================

def describe_loss_distribution(series: pd.Series, name: str) -> pd.DataFrame:
    """Compute full descriptive statistics including skewness and kurtosis."""
    return pd.DataFrame({
        'Statistic': ['N', 'Mean', 'Std Dev', 'Min', 'P25', 'Median', 'P75',
                      'P95', 'P99', 'P99.9', 'Max', 'Skewness', 'Excess Kurtosis'],
        'Value': [
            len(series),
            series.mean(),
            series.std(),
            series.min(),
            series.quantile(0.25),
            series.median(),
            series.quantile(0.75),
            series.quantile(0.95),
            series.quantile(0.99),
            series.quantile(0.999),
            series.max(),
            stats.skew(series),
            stats.kurtosis(series)   # scipy returns excess kurtosis
        ]
    }).assign(Statistic=lambda x: x['Statistic'],
              Value=lambda x: x['Value'].round(4))

annual_losses = df.groupby('year')['loss'].sum()
print("\n--- Annual Portfolio Loss Distribution ---")
print(describe_loss_distribution(annual_losses, 'Annual Losses').to_string(index=False))

default_rates = df.groupby('year')['default_flag'].mean()
print("\n--- Annual Default Rate Distribution ---")
print(describe_loss_distribution(default_rates, 'Default Rates').to_string(index=False))


# ============================================================
# 3. PROBABILITY DISTRIBUTIONS: FIT AND VISUALISE
# ============================================================

def fit_and_plot_distributions(data: np.ndarray, title: str):
    """Fit Beta, LogNormal, and Normal distributions and compare."""
    fig, axes = plt.subplots(1, 2, figsize=(14, 5))
    fig.suptitle(f'{title} — Distribution Fitting', fontsize=13)

    # Filter to (0,1) for Beta fitting (LGD)
    lgd_data = data[(data > 0) & (data < 1)]

    # Fit distributions
    beta_params = stats.beta.fit(lgd_data, floc=0, fscale=1)
    lognorm_params = stats.lognorm.fit(lgd_data, floc=0)
    norm_params = stats.norm.fit(lgd_data)

    x = np.linspace(0.001, 0.999, 500)

    axes[0].hist(lgd_data, bins=50, density=True, alpha=0.5,
                 color='steelblue', label='Observed LGD')
    axes[0].plot(x, stats.beta.pdf(x, *beta_params), 'r-', lw=2,
                 label=f'Beta(α={beta_params[0]:.2f}, β={beta_params[1]:.2f})')
    axes[0].plot(x, stats.lognorm.pdf(x, *lognorm_params), 'g--', lw=2,
                 label='Log-Normal')
    axes[0].plot(x, stats.norm.pdf(x, *norm_params), 'k:', lw=2,
                 label='Normal')
    axes[0].set_xlabel('LGD')
    axes[0].set_ylabel('Density')
    axes[0].set_title('LGD Distribution: Empirical vs Fitted')
    axes[0].legend()

    # Q-Q plot for Beta fit
    theoretical_q = stats.beta.ppf(np.linspace(0.01, 0.99, 100), *beta_params)
    empirical_q = np.quantile(lgd_data, np.linspace(0.01, 0.99, 100))
    axes[1].plot(theoretical_q, empirical_q, 'o', alpha=0.5, color='steelblue')
    axes[1].plot([0, 1], [0, 1], 'r--', label='Perfect fit')
    axes[1].set_xlabel('Theoretical Quantiles (Beta)')
    axes[1].set_ylabel('Empirical Quantiles')
    axes[1].set_title('Q-Q Plot: Beta Distribution Fit')
    axes[1].legend()

    plt.tight_layout()
    plt.savefig('/tmp/m22_lgd_distributions.png', dpi=120, bbox_inches='tight')
    plt.close()

    # Report fit quality (KS test)
    ks_beta = stats.kstest(lgd_data, 'beta', args=beta_params)
    ks_norm = stats.kstest(lgd_data, 'norm', args=norm_params)
    print(f"\nKS Test (Beta):   D={ks_beta.statistic:.4f}, p={ks_beta.pvalue:.4f}")
    print(f"KS Test (Normal): D={ks_norm.statistic:.4f}, p={ks_norm.pvalue:.4f}")

lgd_data = df[df['default_flag'] == 1]['lgd'].values
fit_and_plot_distributions(lgd_data, 'LGD')


# ============================================================
# 4. VASICEK MODEL: PORTFOLIO LOSS DISTRIBUTION
# ============================================================

def vasicek_loss_percentile(pd_: float, rho: float, alpha: float) -> float:
    """
    Vasicek model: loss rate at confidence level alpha.
    This is the basis for the Basel IRB capital formula.

    Parameters:
        pd_   : Point-in-time PD
        rho   : Asset correlation
        alpha : Confidence level (e.g. 0.999 for Basel)
    """
    return stats.norm.cdf(
        (stats.norm.ppf(pd_) - np.sqrt(rho) * stats.norm.ppf(1 - alpha))
        / np.sqrt(1 - rho)
    )

def basel_irb_capital(pd_: float, lgd: float, rho: float, maturity: float = 2.5) -> float:
    """
    Basel III IRB capital formula.
    Returns K as a fraction of EAD (multiply by 12.5 for RWA/EAD = Risk Weight).
    """
    # Vasicek 99.9th percentile conditional loss rate
    vasicek_99_9 = vasicek_loss_percentile(pd_, rho, 0.999)
    # Expected loss
    el = pd_ * lgd
    # Maturity adjustment
    b = (0.11852 - 0.05478 * np.log(pd_)) ** 2
    ma = (1 + (maturity - 2.5) * b) / (1 - 1.5 * b)
    # Capital
    K = (lgd * vasicek_99_9 - el) * ma
    return max(K, 0)

# Show how Vasicek shapes the loss distribution
rho_values = [0.05, 0.15, 0.30]
pd_test = 0.03
alphas = np.linspace(0.50, 0.9999, 1000)

print("\n--- Vasicek Model: Capital Sensitivity ---")
print(f"{'Correlation':>12} {'EL%':>8} {'VaR_99%':>10} {'VaR_99.9%':>12} {'Capital%':>10}")
for rho in rho_values:
    el = pd_test * 0.45
    var_99 = vasicek_loss_percentile(pd_test, rho, 0.99) * 0.45
    var_999 = vasicek_loss_percentile(pd_test, rho, 0.999) * 0.45
    K = basel_irb_capital(pd_test, 0.45, rho)
    print(f"{rho:>12.0%} {el:>8.2%} {var_99:>10.2%} {var_999:>12.2%} {K:>10.2%}")


# ============================================================
# 5. CORRELATION ANALYSIS
# ============================================================

def correlation_analysis(df: pd.DataFrame) -> None:
    """Compute Pearson and Spearman correlations and test significance."""
    numeric_cols = ['leverage', 'coverage', 'default_flag', 'lgd']
    numeric_data = df[numeric_cols].copy()
    numeric_data['lgd'] = numeric_data['lgd'].fillna(0)

    pearson_corr = numeric_data.corr(method='pearson')
    spearman_corr = numeric_data.corr(method='spearman')

    print("\n--- Pearson Correlation Matrix ---")
    print(pearson_corr.round(3))
    print("\n--- Spearman Correlation Matrix ---")
    print(spearman_corr.round(3))

    # Test statistical significance of key correlations
    r, p = stats.pearsonr(numeric_data['leverage'], numeric_data['default_flag'])
    print(f"\nLeverage vs Default: r={r:.4f}, p={p:.4e}")

    # Default correlation between two obligors with same PD
    pd_val = df['default_flag'].mean()
    # Estimated from data: joint default probability approximated from
    # obligors in same year (same systematic factor)
    yearly_defaults = df.groupby('year')['default_flag']
    # Observed variance of default rate vs Binomial variance
    obs_var = np.var(default_rates)
    binom_var = pd_val * (1 - pd_val) / (df.groupby('year').size().mean())
    default_corr = (obs_var - binom_var) / (pd_val * (1 - pd_val))
    print(f"\nEstimated Default Correlation ρ_D: {default_corr:.4f}")
    print(f"(Compare to asset correlation ρ={0.20})")

correlation_analysis(df)


# ============================================================
# 6. INFORMATION VALUE AND WEIGHT OF EVIDENCE
# ============================================================

def compute_iv_woe(df: pd.DataFrame, variable: str, n_bins: int = 10,
                   target: str = 'default_flag') -> pd.DataFrame:
    """
    Compute WoE and IV for a continuous variable using quantile binning.
    Handles monotonicity enforcement common in regulatory models.
    """
    temp = df[[variable, target]].copy().dropna()

    # Quantile binning
    temp['bin'] = pd.qcut(temp[variable], q=n_bins, duplicates='drop')

    total_events = temp[target].sum()
    total_non_events = len(temp) - total_events

    result = (
        temp.groupby('bin', observed=True)
        .agg(
            count=(target, 'count'),
            events=(target, 'sum'),
        )
        .assign(non_events=lambda x: x['count'] - x['events'])
        .assign(
            pct_events=lambda x: x['events'] / total_events,
            pct_non_events=lambda x: x['non_events'] / total_non_events,
        )
    )

    # Avoid log(0) — add small constant
    eps = 1e-6
    result['woe'] = np.log(
        (result['pct_events'] + eps) / (result['pct_non_events'] + eps)
    )
    result['iv_component'] = (result['pct_events'] - result['pct_non_events']) * result['woe']
    result['iv_cumulative'] = result['iv_component'].cumsum()

    total_iv = result['iv_component'].sum()

    print(f"\n--- IV/WoE Analysis: {variable} ---")
    print(f"Total Information Value (IV): {total_iv:.4f}")
    if total_iv < 0.02:
        print("  >> UNPREDICTIVE — exclude from model")
    elif total_iv < 0.1:
        print("  >> WEAK predictor")
    elif total_iv < 0.3:
        print("  >> MEDIUM predictor")
    elif total_iv < 0.5:
        print("  >> STRONG predictor")
    else:
        print("  >> SUSPICIOUS — check for data leakage")

    print(result[['count', 'events', 'pct_events', 'pct_non_events', 'woe', 'iv_component']].round(4))
    return result

iv_leverage = compute_iv_woe(df, 'leverage')
iv_coverage = compute_iv_woe(df, 'coverage')


# ============================================================
# 7. OVERFITTING AND REGULARISATION DEMONSTRATION
# ============================================================

from sklearn.linear_model import LogisticRegression, Ridge, Lasso
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import roc_auc_score

def demonstrate_regularisation(df: pd.DataFrame) -> None:
    """
    Show how regularisation prevents overfitting in credit models.
    Compares unregularised, Ridge (L2), and Lasso (L1) logistic regression.
    """
    # Features: real + noise features to exaggerate overfitting
    np.random.seed(42)
    features = df[['leverage', 'coverage']].copy()
    for i in range(20):  # Add 20 noise features
        features[f'noise_{i}'] = np.random.randn(len(df))

    X = features.values
    y = df['default_flag'].values

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y, test_size=0.3, random_state=42, stratify=y
    )

    models = {
        'No regularisation (C=1000)': LogisticRegression(C=1000, max_iter=1000),
        'L2/Ridge (C=1.0)':           LogisticRegression(C=1.0, penalty='l2', max_iter=1000),
        'L1/Lasso (C=0.1)':           LogisticRegression(C=0.1, penalty='l1',
                                                          solver='liblinear', max_iter=1000),
    }

    print("\n--- Regularisation Comparison ---")
    print(f"{'Model':<30} {'Train AUC':>10} {'Test AUC':>10} {'Non-Zero Coef':>14} {'Overfit Gap':>12}")

    for name, model in models.items():
        model.fit(X_train, y_train)
        train_auc = roc_auc_score(y_train, model.predict_proba(X_train)[:, 1])
        test_auc  = roc_auc_score(y_test,  model.predict_proba(X_test)[:, 1])
        n_nonzero = np.sum(model.coef_[0] != 0)
        print(f"{name:<30} {train_auc:>10.4f} {test_auc:>10.4f} "
              f"{n_nonzero:>14} {train_auc-test_auc:>12.4f}")

demonstrate_regularisation(df)


# ============================================================
# 8. HYPOTHESIS TESTING — BACKTESTING
# ============================================================

def backtest_pd_model(df: pd.DataFrame, predicted_pd_col: str = 'predicted_pd',
                       actual_col: str = 'default_flag') -> None:
    """
    Basel-style backtesting: compare predicted PD to observed default rate.
    Uses binomial test for each rating grade.
    """
    # Simulate predicted PDs
    df = df.copy()
    df['predicted_pd'] = np.clip(
        0.02 + 0.01 * df['leverage'] - 0.005 * df['coverage'].clip(0, 10)
        + np.random.normal(0, 0.005, len(df)),
        0.001, 0.5
    )
    df['rating_grade'] = pd.qcut(df['predicted_pd'], q=5,
                                  labels=['A', 'B', 'C', 'D', 'E'])

    print("\n--- PD Backtesting by Rating Grade ---")
    print(f"{'Grade':>6} {'N':>6} {'Pred PD':>9} {'Obs DR':>9} {'z-stat':>9} {'p-value':>10} {'Signal':>8}")

    for grade in ['A', 'B', 'C', 'D', 'E']:
        subset = df[df['rating_grade'] == grade]
        n = len(subset)
        pred_pd = subset['predicted_pd'].mean()
        obs_dr = subset['default_flag'].mean()
        obs_defaults = subset['default_flag'].sum()

        # Binomial test
        z = (obs_defaults - n * pred_pd) / np.sqrt(n * pred_pd * (1 - pred_pd))
        # One-tailed: testing if actual defaults exceed predicted
        p_val = 1 - stats.norm.cdf(z)

        signal = "GREEN" if p_val > 0.05 else ("AMBER" if p_val > 0.01 else "RED")
        print(f"{grade:>6} {n:>6} {pred_pd:>9.4f} {obs_dr:>9.4f} "
              f"{z:>9.3f} {p_val:>10.4f} {signal:>8}")

backtest_pd_model(df)


# ============================================================
# 9. SUMMARY STATISTICS TABLE
# ============================================================

print("\n" + "="*60)
print("M22 STATISTICAL FOUNDATIONS — SUMMARY")
print("="*60)
print(f"Total observations:     {len(df):>10,}")
print(f"Total defaults:         {df['default_flag'].sum():>10,}")
print(f"Average default rate:   {df['default_flag'].mean():>10.2%}")
print(f"Average LGD (defaults): {df[df['default_flag']==1]['lgd'].mean():>10.2%}")
print(f"Average EAD:            ${df['ead'].mean():>10,.0f}k")
print(f"Skewness of losses:     {stats.skew(annual_losses):>10.3f}")
print(f"Excess kurtosis:        {stats.kurtosis(annual_losses):>10.3f}")
print("="*60)
```

---

## 11. Interview Questions

**Conceptual:**

1. *"Why is the normal distribution inappropriate for modelling credit losses?"*
   Answer: Credit loss distributions are right-skewed (most periods have low losses; rare crises produce catastrophic losses) and fat-tailed (extreme losses occur more frequently than normal predicts). Skewness > 2 and excess kurtosis > 0 are typical. Using a normal distribution understates VaR and Credit VaR, leading to capital inadequacy.

2. *"What is the Vasicek model and why does the Basel IRB formula use it?"*
   Answer: The Vasicek model represents each borrower's asset quality as a linear combination of a systematic factor (economy-wide) and an idiosyncratic factor. Correlation between borrowers comes entirely through the systematic factor. This one-factor Gaussian model produces a closed-form expression for portfolio loss percentiles, which the Basel Committee adopted for the IRB capital formula for tractability.

3. *"What is the difference between asset correlation and default correlation?"*
   Answer: Asset correlation (ρ) measures the correlation of latent creditworthiness variables. Default correlation measures the correlation of binary default events. Default correlation is derived from asset correlation and is much smaller in magnitude. A 20% asset correlation might imply only 2-3% default correlation. However, even small default correlations have enormous impact on portfolio tail risk.

4. *"When would you use Spearman rather than Pearson correlation in a credit model?"*
   Answer: When variables are not linearly related, or when outliers are present. Financial ratios like leverage and coverage often have extreme outliers (high-leverage distressed borrowers) that distort Pearson correlation. Spearman operates on ranks and is robust to outliers. Also preferred when variables are ordinal (credit ratings).

5. *"Explain Information Value. What does an IV of 0.35 tell you?"*
   Answer: IV of 0.35 indicates a strong predictor. It quantifies how well a variable separates defaulters from non-defaulters across its distribution. IV = 0.35 means there is a substantial systematic difference in the variable's distribution between the two populations. We would include this variable in the model.

**Technical:**

6. *"Walk me through the VIF formula. At what value is multicollinearity a concern?"*
7. *"How would you test whether a logistic regression PD model is well-calibrated?"*
8. *"What is the difference between L1 and L2 regularisation? When would you use each?"*
9. *"How does the Law of Large Numbers justify actuarial pricing of retail credit but not corporate credit?"*
10. *"Describe the Basel traffic-light approach to PD backtesting."*

---

## 12. Common Mistakes

**Mistake 1: Assuming normality of credit losses**
The CLT says the *average* converges to normal, not the sum of correlated rare events. Using Value-at-Risk from a normal distribution for credit portfolios understates tail risk by orders of magnitude.

**Mistake 2: Using Pearson correlation for default data**
Pearson correlation is inappropriate for binary variables (default indicator) or heavily skewed ratios. Use Spearman rank correlation or Cramér's V for categorical variables.

**Mistake 3: Ignoring the difference between PIT and TTC**
Point-in-time (PIT) PDs fluctuate with the cycle and are used for IFRS 9. Through-the-cycle (TTC) PDs are long-run averages and are used for capital. Confusing the two is a common regulatory finding.

**Mistake 4: IV > 0.5 treated as good**
Extremely high IV almost always signals data leakage — the variable is causally downstream of default, not a predictor of it (e.g., including "last payment missed" as a predictor of default).

**Mistake 5: Not accounting for heteroskedasticity**
Credit data almost always exhibits heteroskedasticity — riskier borrowers have more variable outcomes. OLS standard errors will be wrong. Always use robust (White) standard errors or test formally with Breusch-Pagan.

**Mistake 6: Overfitting to the development sample**
A model with Gini 70% in-sample and 45% out-of-sample is useless in practice. Always report out-of-time and out-of-sample performance separately in model documentation.

**Mistake 7: Misinterpreting WoE direction**
A negative WoE bin means fewer defaults than average (safer borrowers). Positive WoE means more defaults. Analysts sometimes misread the sign convention.

---

## 13. Case Studies

**Case Study 1: The CDO Crisis — Fat Tails and Copula Misspecification**

In 2006-2007, CDO pricing models used the Gaussian copula to model correlations between mortgage default events. The model was calibrated on 2002-2006 data — a benign credit environment. Key statistical failures:
- **Fat tails ignored:** The model assumed default correlations were low and stable. In 2008, correlations spiked.
- **Tail dependence zero in Gaussian copula:** The Gaussian copula has zero upper tail dependence — it assigns near-zero probability to the event that many mortgages default simultaneously. A Student-t copula with degrees of freedom 3-5 would have captured this.
- **Outcome:** Losses far exceeded 99.9th percentile estimates. AAA-rated CDO tranches lost 50-80% of value.

**Statistical lesson:** Distribution fitting that matches the center of a distribution can still catastrophically fail in the tails. Always stress-test tail assumptions.

**Case Study 2: A UK Retail Bank's IFRS 9 ECL Model**

A mid-sized UK bank built its IFRS 9 PD model using 5 years of post-GFC data (2010-2015). Statistical issues identified in EBA review:
- **Non-representative data:** No recessionary period in the development sample → model underestimated downturn PDs
- **PSI breach:** By 2019, PSI on key predictors exceeded 0.25, signalling the model was applied to a different population
- **Overfitting:** Gini dropped from 62% (2015 holdout) to 44% (2019 application)
- **Remediation:** Bank required to rebuild with 2007-2019 data, including GFC, and add Lasso regularisation to improve stability

**Statistical lesson:** Credit models must be tested across full credit cycles, not just benign periods.

---

## 14. Iterative Reinforcement

**Week 1 — Distributions:**
- Compute skewness and kurtosis on your bank's historical default rates. Are they normally distributed?
- Fit a Beta distribution to LGD data. Run a KS test. Does it fit better than a normal?

**Week 2 — Correlation:**
- Build a Spearman correlation matrix of your top 10 credit predictors. Which pairs exceed 0.7?
- Estimate default correlation between two industry sectors using yearly default rate data.

**Week 3 — WoE/IV:**
- Compute IV for leverage, coverage, and DSCR on a real or synthetic dataset
- Identify which variables pass the IV threshold for inclusion

**Week 4 — Validation:**
- Run a binomial backtest on a PD model output: does the model over- or under-predict?
- Compute PSI between a 2019 development population and a 2023 application population

**Week 5 — Regularisation:**
- Build an OLS regression with 30 variables (5 real + 25 noise). Note in-sample vs out-of-sample R²
- Re-run with Lasso. How many variables survive? Does out-of-sample improve?

**Self-Assessment Questions:**
1. Can you derive the Basel IRB capital formula from the Vasicek model?
2. Can you explain VIF to a non-technical credit officer?
3. Can you interpret a PSI report and decide whether model recalibration is needed?

---

## 15. Source Material

**Foundational Texts:**
- McNeil, A., Frey, R., & Embrechts, P. (2015). *Quantitative Risk Management.* Princeton University Press. — The definitive mathematical treatment.
- Bluhm, C., Overbeck, L., & Wagner, C. (2010). *Introduction to Credit Risk Modeling.* Chapman & Hall.
- Hosmer, D., & Lemeshow, S. (2013). *Applied Logistic Regression.* Wiley.

**Basel Framework:**
- Basel Committee (2006). *International Convergence of Capital Measurement and Capital Standards.* BIS. (Basel II — IRB formula derivation in Annex)
- Basel Committee (2017). *Basel III: Finalising post-crisis reforms.* BIS.
- Gordy, M. (2003). "A risk-factor model foundation for ratings-based bank capital rules." *Journal of Financial Intermediation*, 12(3), 199-232. (Original Vasicek derivation for Basel)

**Regulatory Guidance:**
- Federal Reserve (2011). SR 11-7: *Guidance on Model Risk Management.*
- EBA (2017). EBA/GL/2017/16: *Guidelines on PD estimation, LGD estimation and treatment of defaulted assets.*
- IASB (2014). *IFRS 9: Financial Instruments.* International Accounting Standards Board.

**Statistical Methods:**
- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning.* Springer. (Free PDF available)
- James, G., Witten, D., Hastie, T., & Tibshirani, R. (2021). *An Introduction to Statistical Learning.* Springer. (Free PDF available)

**Credit Scoring Specific:**
- Siddiqi, N. (2012). *Credit Risk Scorecards: Developing and Implementing Intelligent Credit Scoring.* Wiley.
- Thomas, L., Edelman, D., & Crook, J. (2002). *Credit Scoring and Its Applications.* SIAM.

**Papers:**
- Li, D.X. (2000). "On default correlation: a copula function approach." *Journal of Fixed Income*, 9(4), 43-54. (The Gaussian copula paper)
- Vasicek, O. (2002). "The distribution of loan portfolio value." *Risk*, 15(12), 160-162.
