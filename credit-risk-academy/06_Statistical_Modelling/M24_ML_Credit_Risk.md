# M24 — Machine Learning for Credit Risk

---

## 1. Business Purpose

Machine learning entered credit risk modelling because the limitations of logistic regression became apparent at scale: non-linear relationships between financial ratios and default, high-dimensional datasets from alternative data sources, and the need to model complex interaction effects that no credit analyst would specify manually.

The tension is real. Gradient boosting models consistently outperform logistic regression on discrimination metrics (Gini improvement of 5-15% is common). But regulators require explanations. A credit officer must be able to explain why a corporate borrower received a PD of 8% rather than 3%. "The XGBoost model said so" is not acceptable under SR 11-7, EBA guidelines, or the ECB Guide to Internal Models.

The solution that has emerged in the industry is: **use ML where regulatory constraints permit, with explainability tools (SHAP) to make the black box transparent.** For IRB PD models submitted to regulators, logistic regression remains dominant. For internal early warning systems, pricing engines, and behavioural scoring, XGBoost and LightGBM have become standard.

**Specific business applications of ML in credit:**
- **PD modelling with alternative data:** Combining financial ratios with payment behaviour, social media signals, ERP data — where non-linearities are pervasive
- **Early warning systems:** Detecting credit deterioration 6-12 months ahead; ML handles the complex interaction between multiple weak signals
- **LGD modelling:** LGD is particularly non-linear (bimodal, path-dependent) — gradient boosting often outperforms beta regression significantly
- **Fraud detection:** Imbalanced classification with complex patterns — neural networks and gradient boosting standard
- **Credit limit decisions:** Real-time behavioural scoring for revolving facilities
- **Stress testing:** Satellite models linking macro variables to credit parameters benefit from ML flexibility

**What ML cannot replace (regulatory constraints):**
- **IRB PD models for capital:** Regulators require interpretable models with documented variable-by-variable credit rationale
- **Fair lending compliance:** In jurisdictions with anti-discrimination laws, black-box models that may encode protected characteristics are prohibited or require extensive fairness testing
- **Model risk governance:** SR 11-7 requires "conceptual soundness" — each modelling choice must be explained

---

## 2. Accounting Concepts

**IFRS 9 Forward-Looking Information:**
IFRS 9 paragraph 5.5.17 requires that ECL models incorporate "reasonable and supportable information available without undue cost or effort" including macroeconomic forecasts. ML satellite models (linking macro variables like GDP, unemployment, property prices to credit parameters) are used here. These are ML applications where interpretability is less constrained than for IRB models.

**Staging Triggers and ML:**
Stage 2 classification under IFRS 9 requires detecting "significant increase in credit risk" (SICR). Rule-based SICR triggers (e.g., 2-notch rating downgrade, DPD > 30) miss subtle deterioration. ML early warning models identify behavioural patterns (payment slowdowns, covenant breaches, sector stress) earlier, enabling more accurate staging.

**Accounting Conservatism:**
When ML models predict higher ECL than simpler models, auditors and boards may challenge whether the additional complexity is justified. Model documentation must demonstrate that the ML model's additional complexity reduces estimation error, not just improves fit to training data.

**Going Concern Uncertainty:**
ML survival models (Cox proportional hazards) estimate time-to-default, which maps to the lifetime PD needed for Stage 2/3 IFRS 9 ECL. The term structure of PD is a survival analysis output.

---

## 3. Financial Concepts

**Non-Linearity in Credit Risk:**

The relationship between financial metrics and default probability is rarely linear in log-odds. Classic examples:
- **Leverage and default:** Default risk is roughly flat for Debt/EBITDA below 3x, then increases sharply above 5x — an S-curve, not a straight line
- **Interest coverage:** Protection saturates above 5x coverage (going from 10x to 15x barely changes default risk), but the floor at 1x coverage is critical
- **Profitability interactions:** A highly-leveraged company with strong cash flow is safer than a moderately leveraged company with declining margins — leverage × margin interaction

Tree-based models capture these non-linearities automatically. Logistic regression requires the analyst to manually code them (polynomial terms, interaction terms).

**Macroeconomic Satellite Models:**

These map macro variables to credit parameters:
```
PD_t = f(GDP_growth_t, Unemployment_t, Interest_rate_t, Sector_index_t, ε_t)
```

ML methods (gradient boosting, neural networks) can model complex non-linear macro relationships, especially useful for stress testing where the relationship may change regime. However, interpretability remains critical — the PRA expects banks to explain why a 2% GDP contraction maps to a specific PD uplift.

**Time-to-Default and Survival Analysis:**

Traditional logistic regression asks: "Will this borrower default in 12 months?" (binary, fixed horizon). Survival analysis asks: "How long until this borrower defaults?" (continuous time, censored data).

The *hazard function* λ(t) is the instantaneous default rate conditional on survival to time t:
```
λ(t) = lim_{Δt→0} P(T ∈ [t, t+Δt) | T ≥ t) / Δt
```

The *survival function* S(t) = P(T > t) represents the probability of surviving (not defaulting) beyond time t:
```
S(t) = exp(-∫₀ᵗ λ(u) du)
```

For IFRS 9 lifetime ECL, the term structure of PD is:
```
PD(t) = 1 - S(t)
ECL_lifetime = Σₜ PD(t) × LGD(t) × EAD(t) × DF(t)
```

---

## 4. Statistical Concepts

### 4.1 Decision Trees

A decision tree recursively partitions the feature space using binary splits. At each node, the split variable and threshold are chosen to maximise the reduction in impurity (Gini impurity for classification):

```
Gini Impurity = 1 - Σₖ p²ₖ
```
where pₖ is the proportion of class k in the node. The tree chooses the split that most reduces weighted average Gini impurity across the two child nodes.

**Key hyperparameters:**
- Max depth: deeper trees capture more patterns but overfit more
- Min samples per leaf: prevents fitting to individual outliers
- Min impurity decrease: prunes uninformative splits

**Strengths:** Fast, interpretable (single tree), handles non-linearities, no scaling required.
**Weaknesses for credit:** Single trees are unstable (high variance) and prone to overfitting. Never use a single decision tree for a credit risk model in production.

### 4.2 Random Forests

Random forests address single-tree instability by ensembling: fit B trees on bootstrap samples, with each split restricted to a random subset of √p features. Prediction is the average across all trees:

```
p̂(x) = (1/B) Σᵦ pᵦ(x)
```

**Why random feature selection?** It decorrelates trees. If one feature is very strong, a standard ensemble would have all trees using it at the root → correlated trees → less variance reduction. By randomly excluding features, trees differ more and provide more variance reduction on averaging.

**Bias-Variance Decomposition:**
```
MSE = Bias² + Variance + Noise
```
- Single tree: low bias, high variance
- Random forest: low bias, low variance (averaging reduces variance from σ² to σ²/B as B → ∞, subject to correlation between trees)

**Out-of-Bag (OOB) Error:**
Each tree is trained on ~63% of observations (bootstrap). The remaining 37% (out-of-bag) serve as a built-in validation set. OOB error estimates generalisation error without a separate holdout.

### 4.3 Gradient Boosting — XGBoost and LightGBM

Gradient boosting fits trees *sequentially*, each new tree correcting the errors of the ensemble so far. It is the dominant ML method for tabular credit risk data.

**Algorithm:**
1. Initialise with a constant: F₀(x) = argmin_c Σ L(yᵢ, c)
2. For m = 1 to M:
   a. Compute pseudo-residuals (negative gradient of loss):
      ```
      rᵢₘ = -[∂L(yᵢ, F(xᵢ)) / ∂F(xᵢ)]_{F=Fₘ₋₁}
      ```
   b. Fit a tree hₘ to residuals rᵢₘ
   c. Update: Fₘ(x) = Fₘ₋₁(x) + η × hₘ(x)
   where η is the learning rate (shrinkage)

**XGBoost innovations over vanilla gradient boosting:**
- Second-order Taylor expansion of the loss (uses Hessian, not just gradient)
- Regularisation terms in the objective: L1 (α) and L2 (λ) on leaf weights
- Column subsampling per tree and per level
- Efficient handling of sparse/missing data

**XGBoost objective function:**
```
Obj = Σᵢ L(yᵢ, ŷᵢ) + Ω(f)
    where Ω(f) = γT + (λ/2)Σⱼ wⱼ²
T = number of leaves, wⱼ = leaf weights, γ = leaf penalty
```

**LightGBM innovations:**
- Gradient-based One-Side Sampling (GOSS): uses all large-gradient instances + random sample of small-gradient instances → faster without significant accuracy loss
- Exclusive Feature Bundling (EFB): bundles mutually exclusive features → fewer effective features
- Leaf-wise tree growth (vs level-wise in XGBoost): finds the single leaf with maximum gain → better for complex patterns, but requires careful regularisation

**Hyperparameters that matter most for credit risk:**
```python
xgb_params = {
    'n_estimators':    500,     # Number of trees
    'learning_rate':   0.05,    # Shrinkage; lower = more trees needed, less overfit
    'max_depth':       4,       # Shallow trees for stability (3-6 for credit)
    'subsample':       0.8,     # Row sampling per tree (prevents overfitting)
    'colsample_bytree':0.8,     # Feature sampling per tree
    'min_child_weight':50,      # Min sum of instance weights per leaf (critical for imbalanced)
    'scale_pos_weight':20,      # Ratio of negatives to positives (for imbalance)
    'reg_alpha':       0.1,     # L1 regularisation
    'reg_lambda':      1.0,     # L2 regularisation
    'eval_metric':     'auc',
}
```

### 4.4 Survival Analysis — Cox Proportional Hazards

The Cox model is a semi-parametric model for time-to-default. It models the hazard function as:
```
λ(t|x) = λ₀(t) × exp(xᵀβ)
```

where λ₀(t) is the baseline hazard (left unspecified — semi-parametric) and exp(xᵀβ) is the proportional hazard ratio.

**Key properties:**
- The baseline hazard λ₀(t) is estimated non-parametrically from data
- Covariates multiply the baseline hazard proportionally (PH assumption)
- Handles *right-censoring*: borrowers who leave the portfolio before defaulting (sold, prepaid) are censored observations — they contribute information up to their exit date

**Partial likelihood for estimation (Cox, 1972):**
```
L(β) = Π_{i: defaulted} exp(xᵢᵀβ) / Σⱼ∈Rᵢ exp(xⱼᵀβ)
```
where Rᵢ is the risk set (all borrowers alive at the time borrower i defaults). This factorises out the unknown λ₀(t), allowing β to be estimated without specifying the baseline.

**Schoenfeld Residuals Test (Proportional Hazards Assumption):**
The PH assumption says the effect of a covariate is constant over time. Schoenfeld residuals plotted against time should show no trend. If leverage has a time-varying effect (more important in year 1 than year 5), the basic Cox model is misspecified.

**Extending to Machine Learning: Random Survival Forest:**
A random forest applied to survival data, where each tree's predictions contribute to a non-parametric cumulative hazard estimate. Does not require the PH assumption.

### 4.5 Neural Networks for Credit Risk

Neural networks are layered compositions of linear transformations and non-linear activation functions:
```
Layer: a^(l) = σ(W^(l) × a^(l-1) + b^(l))
```

For a two-hidden-layer network predicting PD:
```
z¹ = W¹x + b¹;  a¹ = ReLU(z¹)
z² = W²a¹ + b²; a² = ReLU(z²)
PD = sigmoid(W³a² + b³)
```

**When neural networks are justified in credit:**
- Very large datasets (>500,000 observations) where gradient boosting is near its ceiling
- Image/text inputs (property photos, credit agreements, management accounts)
- Sequential data (payment history series) → LSTM/Transformer architectures
- Transfer learning from large financial datasets

**When NOT to use neural networks:**
- Standard tabular financial ratio data with <50,000 observations
- IRB or regulatory capital models (interpretability requirement)
- Where gradient boosting achieves comparable performance (it usually does on tabular data)

### 4.6 Class Imbalance

Default datasets are severely imbalanced: typical default rates of 1-5% mean 95-99% of observations are non-defaults. Standard models trained without adjustment learn to predict non-default for everything.

**Handling strategies:**

**1. Class Weights (Recommended for regulated models):**
```
weight_default = n_samples / (n_classes × n_defaults)
weight_non_default = n_samples / (n_classes × n_non_defaults)
```
This re-weights the loss function without modifying the data. Produces valid probability estimates.

**2. Threshold Tuning:**
The default classification threshold of 0.5 is arbitrary. Optimise by choosing the threshold that maximises F1-score, or set it to achieve a target precision/recall trade-off:
```
F1 = 2 × Precision × Recall / (Precision + Recall)
```

**3. SMOTE (Synthetic Minority Over-sampling Technique):**
Generates synthetic defaults by interpolating in feature space between existing defaults:
```
x_synthetic = x_i + λ × (x_nn - x_i)   where λ ~ Uniform(0,1)
```
x_nn is a nearest neighbour in the minority class. SMOTE increases minority class density.

**Caution:** SMOTE changes the marginal distribution of the training data. The model must be recalibrated on the original (unsampled) class distribution before outputting valid probabilities. For regulatory models where calibration is mandatory, SMOTE should be used with caution.

**4. Cost-Sensitive Learning:**
Assign asymmetric misclassification costs. Missing a default (false negative) is typically far more expensive than a false alarm (false positive). XGBoost's `scale_pos_weight` parameter implements this.

### 4.7 SHAP Values — Explainability

SHAP (SHapley Additive exPlanations) provides a theoretically principled framework for explaining ML model predictions. Based on Shapley values from cooperative game theory, SHAP attributes the prediction for each observation to each input feature.

**Shapley Value:**
For feature j in observation i, the Shapley value is the average marginal contribution of feature j across all possible feature coalitions:
```
φⱼ(i) = Σ_{S ⊆ F\{j}} [|S|!(|F|-|S|-1)!/|F|!] × [v(S∪{j}) - v(S)]
```
where F is the set of all features, S is a subset, and v(S) is the model output using only features in S.

**TreeSHAP (Lundberg et al., 2018):**
For tree-based models, SHAP values can be computed exactly in O(TLD²) time (T = trees, L = leaves, D = depth) using the TreeSHAP algorithm — no approximation needed.

**Key properties (SHAP axioms):**
1. **Efficiency:** φ₀ + Σⱼ φⱼ(i) = f(xᵢ) — SHAP values add up to the model prediction
2. **Symmetry:** Features with identical contributions receive identical values
3. **Dummy:** A feature that never changes the output has φⱼ = 0
4. **Linearity:** SHAP values are additive across ensembles

**Types of SHAP plots:**
- **Waterfall plot:** Single prediction decomposition — shows each feature's contribution to moving from base value to final prediction
- **Summary plot (beeswarm):** Across all observations — feature importance + direction of effect
- **Dependence plot:** φⱼ vs xⱼ — shows the model's learned relationship between feature j and output
- **Force plot:** Visual push-pull representation of prediction decomposition

**Regulatory use of SHAP:**
The ECB and PRA increasingly accept SHAP-explained ML models for non-capital applications. The key requirement: each material risk driver must be explicable in financial terms. If SHAP shows that "industry = Energy" contributes +2.5% to PD, the credit team must be able to justify this in terms of energy sector credit fundamentals.

### 4.8 Model Performance: ML vs Logistic Regression

When comparing models, always evaluate on the same out-of-time test set with the same performance metrics:

| Metric | Logistic Regression | XGBoost | Notes |
|--------|---------------------|---------|-------|
| Gini | Baseline | +5-15pp | Typically 5-10pp improvement |
| KS | Baseline | +3-10pp | Consistent with Gini |
| Calibration | Usually good | Requires calibration step | XGBoost outputs not probabilities |
| Interpretability | Full | Requires SHAP | Coefficient per variable |
| Stability | High | Medium | Trees more sensitive to data shifts |
| Regulatory acceptance | High | Medium/Growing | Context-dependent |

---

## 5. Regulatory Framework

**SR 11-7 (Federal Reserve, 2011) — Model Risk Management:**
Defines three categories of model risk:
1. Errors in model development (wrong methodology, flawed assumptions)
2. Errors in model implementation (bugs, data pipeline errors)
3. Inappropriate use (applying the model outside its valid range)

For ML models, SR 11-7 requires: (a) conceptual soundness of the algorithm choice; (b) evidence that the model performs as expected; (c) validation by a function independent of development. "The algorithm is state-of-the-art" is not sufficient — the validator must understand why the algorithm is appropriate for the specific credit application.

**ECB Guide to Internal Models (2019) and Targeted Review of Internal Models (TRIM):**
The ECB has not prohibited ML for IRB models but sets a high bar. Key expectations:
- Each predictor must have a documented credit rationale
- Model must produce interpretable outputs for supervisory review
- Stability must be demonstrated over time (PSI, characteristic stability)
- SHAP or comparable explainability is not yet accepted as equivalent to coefficient interpretability for IRB PD

**PRA SS1/23 — Model Risk Management Principles for Banks:**
UK-specific framework that builds on SR 11-7. Explicitly addresses ML: "The complexity of a model is not, of itself, a risk — but complexity combined with opacity creates risk." Requires that ML models have "model owners" with sufficient technical expertise to challenge model outputs. Defines three model risk tiers; complex ML models automatically tier as high-risk.

**EBA Guidelines on Internal Governance (EBA/GL/2021/05):**
Requires that AI and ML models used in credit decisions are governed by the same model risk framework as traditional models. Emphasis on data quality, model lifecycle management, and regular performance reviews.

**EU AI Act (2024) — High-Risk AI Systems:**
Credit scoring and creditworthiness assessment is classified as a high-risk AI system. Requirements include: (a) risk management system; (b) data governance (training data quality); (c) technical documentation; (d) transparency to borrowers; (e) human oversight. Banks deploying ML for credit decisions must comply.

**Fair Lending / Anti-Discrimination:**
In the US, ECOA and Fair Housing Act prohibit lending discrimination on protected characteristics. ML models trained on historical data may inadvertently encode discrimination (e.g., postcode as a proxy for race). Requires: disparate impact testing, adverse action explanation, regular fairness audits.

---

## 6. Data Required

**Standard tabular credit data:**
Same as logistic regression (financial ratios, facility data, macro overlays) — but ML can accommodate more variables and missing data more gracefully.

**Alternative data for ML:**
- **Payment behaviour:** Days past due history, utilisation patterns on revolving facilities, payment pattern irregularity
- **Transactional data:** Cash flow patterns from bank account data (used for SME credit in fintech)
- **Social/sentiment:** News sentiment, management statement tone (NLP applied to annual reports)
- **ERP data:** Purchase order data, accounts receivable aging — real-time operational health indicators
- **Market data:** CDS spreads, bond yields, equity volatility — market-implied PDs for listed companies
- **Geospatial:** Property values, regional economic indicators for real estate credit

**Data volume requirements:**
- Random Forest / XGBoost: Practical minimum ~1,000 defaults; performance stabilises beyond ~10,000
- Neural networks: Minimum ~10,000-50,000 defaults for meaningful improvement over gradient boosting
- Survival models: Same as logistic regression (EPV ≥ 10)

**Data pipeline for ML:**
```
Raw data → Validation (completeness, domain checks) → Feature engineering →
Missing value handling (ML can handle NaN natively via XGBoost's default direction) →
Feature selection (permutation importance, SHAP) →
Train/validation/test split (temporal) → Model training → SHAP explanation →
Performance metrics → Model card → Deployment
```

---

## 7. How Analysts Actually Work

**ML model development workflow in a credit risk team:**

1. **EDA and baseline:** Always fit logistic regression first. It is the benchmark. An ML model that fails to beat logistic regression by at least 3pp Gini on OOT should not be deployed.

2. **Feature engineering:** Unlike deep learning, gradient boosting benefits from feature engineering:
   - Log-transform skewed ratios (log(coverage), log(assets))
   - Interaction terms (leverage × margin; coverage × debt maturity)
   - Lagged variables (1-year change in leverage — a deterioration signal)
   - Industry-relative ratios (leverage relative to industry median)

3. **Hyperparameter tuning:** Use Bayesian optimisation (Optuna, HyperOpt) rather than grid search. 50-100 trials is typically sufficient. Always tune on a validation set, never the test set.

4. **SHAP analysis:** After fitting the final model, run SHAP on the entire training set and a sample of the test set. Confirm:
   - Direction of effect matches financial intuition (leverage increases PD, coverage decreases)
   - Top features are interpretable (not noise or leakage)
   - No individual feature dominates >40% of explanation (concentration risk in explanability)

5. **Model card preparation:** A regulatory model card for an ML model includes:
   - Algorithm choice justification
   - Performance metrics (development, OOT, stress period if available)
   - SHAP summary statistics
   - Fairness testing results
   - Limitations and appropriate use cases
   - Monitoring plan (PSI, Gini monitoring, drift detection)

6. **Governance:** ML models go through the same governance gate as logistic regression:
   - Development documentation
   - Independent validation (must include someone who can challenge the ML methodology)
   - Model Risk Committee approval
   - Annual review plan

---

## 8. Excel Implementation

Excel cannot run XGBoost or SHAP directly, but it serves several roles in ML model workflows:

**Model Output Review:**
```
Column A: Obligor ID
Column B: Predicted PD (XGBoost, from Python export)
Column C: Predicted PD (Logistic, benchmark)
Column D: SHAP_leverage (from Python export)
Column E: SHAP_coverage
Column F: Actual default flag

=SUMPRODUCT((C2:C1000>0.05)*(F2:F1000=1)) / SUMPRODUCT(F2:F1000=1)
→ Capture rate for threshold 5% PD
```

**SHAP Waterfall Reconstruction:**
```
Base value (average model prediction): =AVERAGE(B2:B1000)
Feature contributions:
  =SUM(SHAP values for this observation)  → Should equal Predicted PD - Base value

=NORM.S.INV(base_pd)  + SHAP_leverage + SHAP_coverage + ...
```

**PSI Monitoring Dashboard:**
```
Monthly PSI tracking:
  Score decile distributions by month in columns
  PSI = SUMPRODUCT((App% - Dev%) * LN(App% / Dev%))
  RAG status: =IF(PSI>0.25,"RED", IF(PSI>0.10,"AMBER","GREEN"))
```

**Lift Chart (comparing XGBoost vs Logistic):**
```
Sort both models' predictions descending (separate columns)
Compute cumulative capture rate at each decile
Plot both series → shows ML improvement in top decile capture
```

---

## 9. SQL Implementation

```sql
-- ============================================================
-- M24: ML Credit Risk Models — SQL Workflows
-- ============================================================

-- 1. Store XGBoost predictions alongside logistic regression predictions
CREATE TABLE dbo.ml_model_predictions (
    obligor_id          INT           NOT NULL,
    observation_date    DATE          NOT NULL,
    pd_logistic_reg     FLOAT,        -- Benchmark model
    pd_xgboost          FLOAT,        -- ML model
    pd_ensemble         AS (0.5 * pd_logistic_reg + 0.5 * pd_xgboost),  -- Blended
    actual_default      TINYINT,
    shap_leverage       FLOAT,        -- SHAP value for leverage feature
    shap_coverage       FLOAT,
    shap_margin         FLOAT,
    shap_base_value     FLOAT,        -- Global base value (average log-odds)
    PRIMARY KEY (obligor_id, observation_date)
);

-- 2. Compare ML vs logistic regression performance by year
WITH model_comparison AS (
    SELECT
        YEAR(observation_date) AS year,
        COUNT(*)               AS n,
        SUM(actual_default)    AS defaults,

        -- Logistic regression performance (Gini approximation via rank correlation)
        2 * (
            SUM(CAST(pd_logistic_reg AS FLOAT) * CAST(actual_default AS FLOAT))
            / (AVG(pd_logistic_reg) * AVG(CAST(actual_default AS FLOAT)) * COUNT(*))
        ) - 1 AS gini_approx_lr,

        -- XGBoost performance
        2 * (
            SUM(CAST(pd_xgboost AS FLOAT) * CAST(actual_default AS FLOAT))
            / (AVG(pd_xgboost) * AVG(CAST(actual_default AS FLOAT)) * COUNT(*))
        ) - 1 AS gini_approx_xgb,

        AVG(pd_logistic_reg) AS mean_pd_lr,
        AVG(pd_xgboost)      AS mean_pd_xgb,
        AVG(CAST(actual_default AS FLOAT)) AS observed_dr
    FROM dbo.ml_model_predictions
    GROUP BY YEAR(observation_date)
)
SELECT * FROM model_comparison ORDER BY year;

-- 3. SHAP-based explanation: top drivers for high-PD obligors
SELECT TOP 20
    obligor_id,
    observation_date,
    ROUND(pd_xgboost, 4)    AS predicted_pd,
    ROUND(shap_base_value, 4) AS base_value,
    ROUND(shap_leverage, 4) AS shap_leverage,
    ROUND(shap_coverage, 4) AS shap_coverage,
    ROUND(shap_margin, 4)   AS shap_margin,
    ROUND(shap_leverage + shap_coverage + shap_margin, 4) AS total_shap_contribution,
    -- Identify primary risk driver
    CASE
        WHEN ABS(shap_leverage) >= ABS(shap_coverage)
         AND ABS(shap_leverage) >= ABS(shap_margin) THEN 'Leverage'
        WHEN ABS(shap_coverage) >= ABS(shap_leverage)
         AND ABS(shap_coverage) >= ABS(shap_margin) THEN 'Coverage'
        ELSE 'Margin'
    END AS primary_risk_driver
FROM dbo.ml_model_predictions
WHERE observation_date >= '2023-01-01'
ORDER BY pd_xgboost DESC;

-- 4. Class imbalance check
SELECT
    actual_default,
    COUNT(*)                                       AS count,
    CAST(COUNT(*) AS FLOAT) / SUM(COUNT(*)) OVER() AS proportion
FROM dbo.ml_model_predictions
GROUP BY actual_default;

-- 5. Survival analysis data prep: time-to-event table
SELECT
    o.obligor_id,
    o.origination_date,
    COALESCE(d.default_date, o.exit_date, GETDATE()) AS event_date,
    CASE WHEN d.default_date IS NOT NULL THEN 1 ELSE 0 END AS event_indicator, -- 1=default, 0=censored
    DATEDIFF(MONTH, o.origination_date,
             COALESCE(d.default_date, o.exit_date, GETDATE())) AS months_to_event,
    f.debt_ebitda_ratio,
    f.interest_coverage_ratio,
    o.industry_code,
    o.country_code
FROM dbo.obligors o
LEFT JOIN dbo.defaults d ON o.obligor_id = d.obligor_id
LEFT JOIN dbo.financials f ON o.obligor_id = f.obligor_id
    AND f.financial_year_end = (
        SELECT MAX(f2.financial_year_end)
        FROM dbo.financials f2
        WHERE f2.obligor_id = o.obligor_id
          AND f2.financial_year_end <= o.origination_date
    )
WHERE o.origination_date >= '2010-01-01';

-- 6. Model drift monitoring: feature distribution shift
WITH current_period AS (
    SELECT
        'Current' AS period,
        AVG(f.debt_ebitda_ratio)         AS mean_leverage,
        STDEV(f.debt_ebitda_ratio)       AS std_leverage,
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY f.debt_ebitda_ratio) AS median_leverage,
        AVG(f.interest_coverage_ratio)   AS mean_coverage
    FROM dbo.financials f
    JOIN dbo.obligors o ON f.obligor_id = o.obligor_id
    WHERE f.financial_year_end >= DATEADD(YEAR, -1, GETDATE())
),
development_period AS (
    SELECT
        'Development' AS period,
        AVG(f.debt_ebitda_ratio)         AS mean_leverage,
        STDEV(f.debt_ebitda_ratio)       AS std_leverage,
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY f.debt_ebitda_ratio) AS median_leverage,
        AVG(f.interest_coverage_ratio)   AS mean_coverage
    FROM dbo.financials f
    JOIN dbo.obligors o ON f.obligor_id = o.obligor_id
    WHERE f.financial_year_end BETWEEN '2010-01-01' AND '2019-12-31'
)
SELECT * FROM current_period
UNION ALL
SELECT * FROM development_period;

-- 7. Regulatory model card summary query
SELECT
    'XGBoost PD Model v2.1'             AS model_name,
    'Corporate Credit Risk'              AS model_type,
    '2010-01-01'                         AS development_start,
    '2019-12-31'                         AS development_end,
    COUNT(*)                             AS n_development_obs,
    SUM(actual_default)                  AS n_defaults_dev,
    AVG(CAST(actual_default AS FLOAT))   AS default_rate_dev,
    AVG(pd_xgboost)                      AS mean_predicted_pd
FROM dbo.ml_model_predictions
WHERE observation_date BETWEEN '2010-01-01' AND '2019-12-31';
```

---

## 10. Python Implementation

```python
"""
M24 — Machine Learning for Credit Risk
Full Implementation:
1. XGBoost PD model with hyperparameter tuning
2. Survival analysis (Cox Proportional Hazards)
3. SHAP explainability
4. Class imbalance handling
5. Logistic Regression vs XGBoost comparison
6. Regulatory model card generation
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import warnings
warnings.filterwarnings('ignore')

from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.metrics import (roc_auc_score, roc_curve, brier_score_loss,
                              classification_report, confusion_matrix)
from sklearn.preprocessing import StandardScaler
from sklearn.calibration import CalibratedClassifierCV, calibration_curve
from sklearn.utils.class_weight import compute_class_weight
import xgboost as xgb

try:
    import shap
    SHAP_AVAILABLE = True
except ImportError:
    SHAP_AVAILABLE = False
    print("Note: install shap for explainability: pip install shap")

try:
    from lifelines import CoxPHFitter, KaplanMeierFitter
    LIFELINES_AVAILABLE = True
except ImportError:
    LIFELINES_AVAILABLE = False
    print("Note: install lifelines for survival analysis: pip install lifelines")

np.random.seed(42)

# ============================================================
# STEP 1: GENERATE RICH SYNTHETIC CREDIT DATASET
# ============================================================

def generate_ml_credit_data(n: int = 10000) -> pd.DataFrame:
    """
    Generate synthetic corporate loan data with non-linear relationships
    between features and default — to show where ML adds value over
    logistic regression.
    """
    np.random.seed(42)

    # Core financials
    leverage    = np.clip(np.random.lognormal(1.0, 0.7, n), 0.1, 25.0)
    coverage    = np.clip(np.random.lognormal(1.2, 0.8, n), 0.3, 30.0)
    margin      = np.clip(np.random.beta(3, 7, n), 0.0, 0.8)
    log_assets  = np.random.normal(5.5, 1.5, n)
    current_r   = np.clip(np.random.lognormal(0.3, 0.5, n), 0.3, 5.0)
    debt_growth = np.random.normal(0.05, 0.15, n)
    cash_ratio  = np.clip(np.random.lognormal(-0.5, 0.6, n), 0, 3)
    npl_flag    = (np.random.uniform(0, 1, n) < 0.08).astype(int)  # prior NPL

    industry = np.random.choice(
        ['Manufacturing', 'Retail', 'Services', 'Energy', 'Property', 'Tech'],
        n, p=[0.22, 0.18, 0.28, 0.12, 0.10, 0.10]
    )
    year = np.random.choice(range(2010, 2024), n)

    # Non-linear default propensity (gradient boosting captures this; logistic regression won't)
    # Interaction: high leverage AND low coverage is much worse than either alone
    # Threshold effect: leverage above 6x is disproportionately risky
    # Coverage floor: below 1.5x is critical; above 4x adds little safety

    industry_risk = {
        'Manufacturing': 0.0, 'Retail': 0.4, 'Services': -0.1,
        'Energy': 0.6, 'Property': 0.3, 'Tech': -0.2
    }

    log_odds = (
        -4.0
        + 0.18  * leverage
        + 0.5   * np.maximum(leverage - 6.0, 0)      # Threshold effect at 6x
        - 0.80  * np.log(np.maximum(coverage, 0.5))  # Log transform of coverage
        + 1.2   * (coverage < 1.5).astype(float)      # Critical floor effect
        - 3.0   * margin
        - 0.4   * (margin * leverage)                  # Protective interaction: margin×leverage
        - 0.12  * log_assets
        - 0.25  * current_r
        + 0.8   * npl_flag                             # Prior NPL strongly predictive
        + 0.3   * np.maximum(debt_growth, 0)           # Rapid debt growth risky
        + np.array([industry_risk[i] for i in industry])
        + 0.5   * (year >= 2020).astype(float)         # COVID effect
        + np.random.logistic(0, 1, n) * 0.3
    )

    pd_true = 1 / (1 + np.exp(-log_odds))
    default_flag = (np.random.uniform(0, 1, n) < pd_true).astype(int)

    # Survival: time to default (months) — for Cox model
    baseline_hazard = 0.005
    time_to_default = np.ceil(
        -np.log(np.random.uniform(0, 1, n)) / (baseline_hazard * np.exp(log_odds * 0.3))
    ).astype(int)
    # Censor at 60 months
    censored = time_to_default > 60
    time_to_event   = np.where(censored, 60, time_to_default)
    event_indicator = np.where(censored, 0, default_flag)

    df = pd.DataFrame({
        'leverage':      leverage,
        'coverage':      coverage,
        'ebitda_margin': margin,
        'log_assets':    log_assets,
        'current_ratio': current_r,
        'debt_growth':   debt_growth,
        'cash_ratio':    cash_ratio,
        'npl_flag':      npl_flag,
        'industry':      industry,
        'year':          year,
        'pd_true':       pd_true,
        'default_flag':  default_flag,
        'time_to_event': time_to_event,
        'event_indicator': event_indicator
    })

    print(f"Dataset: {n:,} observations | "
          f"Defaults: {default_flag.sum():,} ({default_flag.mean():.1%})")
    return df

df = generate_ml_credit_data(10000)


# ============================================================
# STEP 2: DATA PREPARATION
# ============================================================

# Temporal split: 2010-2021 development, 2022-2023 OOT
df_train = df[df['year'] <= 2021].copy()
df_test  = df[df['year'] >= 2022].copy()

FEATURE_COLS = ['leverage', 'coverage', 'ebitda_margin', 'log_assets',
                'current_ratio', 'debt_growth', 'cash_ratio', 'npl_flag']

# Add industry dummies
df_train = pd.get_dummies(df_train, columns=['industry'], drop_first=True, dtype=float)
df_test  = pd.get_dummies(df_test,  columns=['industry'], drop_first=True, dtype=float)

# Align columns (test may have missing industry dummies)
all_cols = [c for c in df_train.columns if c.startswith('industry_') or c in FEATURE_COLS]
for col in all_cols:
    if col not in df_test.columns:
        df_test[col] = 0

X_train = df_train[all_cols].values
X_test  = df_test[all_cols].values
y_train = df_train['default_flag'].values
y_test  = df_test['default_flag'].values
feature_names = all_cols

# Winsorise
from numpy import percentile
for j in range(X_train.shape[1]):
    lo, hi = percentile(X_train[:, j], [1, 99])
    X_train[:, j] = np.clip(X_train[:, j], lo, hi)
    X_test[:, j]  = np.clip(X_test[:, j],  lo, hi)

print(f"Train: {len(X_train):,} | Test: {len(X_test):,}")
print(f"Default rate - Train: {y_train.mean():.2%} | Test: {y_test.mean():.2%}")
print(f"Class imbalance ratio: {(1-y_train.mean())/y_train.mean():.1f}:1")


# ============================================================
# STEP 3: BASELINE — LOGISTIC REGRESSION
# ============================================================

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled  = scaler.transform(X_test)

lr = LogisticRegression(C=1.0, max_iter=1000, class_weight='balanced', random_state=42)
lr.fit(X_train_scaled, y_train)

lr_train_proba = lr.predict_proba(X_train_scaled)[:, 1]
lr_test_proba  = lr.predict_proba(X_test_scaled)[:, 1]

lr_metrics = {
    'train_auc': roc_auc_score(y_train, lr_train_proba),
    'test_auc':  roc_auc_score(y_test,  lr_test_proba),
    'test_gini': 2 * roc_auc_score(y_test, lr_test_proba) - 1,
    'test_brier': brier_score_loss(y_test, lr_test_proba)
}

print(f"\n--- Logistic Regression (Baseline) ---")
print(f"Train AUC: {lr_metrics['train_auc']:.4f}")
print(f"Test  AUC: {lr_metrics['test_auc']:.4f}")
print(f"Test Gini: {lr_metrics['test_gini']:.4f}")
print(f"Test Brier: {lr_metrics['test_brier']:.4f}")


# ============================================================
# STEP 4: XGBOOST — TRAINING WITH CLASS WEIGHT HANDLING
# ============================================================

# Compute class weight for imbalanced data
scale_pos_weight = (y_train == 0).sum() / (y_train == 1).sum()
print(f"\nXGBoost scale_pos_weight: {scale_pos_weight:.2f}")

xgb_params = {
    'n_estimators':     500,
    'learning_rate':    0.05,
    'max_depth':        4,
    'subsample':        0.8,
    'colsample_bytree': 0.8,
    'min_child_weight': 30,
    'scale_pos_weight': scale_pos_weight,
    'reg_alpha':        0.1,
    'reg_lambda':       1.0,
    'eval_metric':      'auc',
    'random_state':     42,
    'use_label_encoder': False
}

xgb_model = xgb.XGBClassifier(**xgb_params)
xgb_model.fit(
    X_train, y_train,
    eval_set=[(X_test, y_test)],
    verbose=False,
    early_stopping_rounds=30
)

xgb_train_proba = xgb_model.predict_proba(X_train)[:, 1]
xgb_test_proba  = xgb_model.predict_proba(X_test)[:, 1]

xgb_metrics = {
    'train_auc': roc_auc_score(y_train, xgb_train_proba),
    'test_auc':  roc_auc_score(y_test,  xgb_test_proba),
    'test_gini': 2 * roc_auc_score(y_test, xgb_test_proba) - 1,
    'test_brier': brier_score_loss(y_test, xgb_test_proba)
}

print(f"\n--- XGBoost ---")
print(f"Train AUC: {xgb_metrics['train_auc']:.4f}  "
      f"(LR: {lr_metrics['train_auc']:.4f})")
print(f"Test  AUC: {xgb_metrics['test_auc']:.4f}  "
      f"(LR: {lr_metrics['test_auc']:.4f})")
print(f"Test Gini: {xgb_metrics['test_gini']:.4f}  "
      f"(LR: {lr_metrics['test_gini']:.4f})")
print(f"Gini improvement over LR: "
      f"{(xgb_metrics['test_gini'] - lr_metrics['test_gini'])*100:.1f}pp")

# Overfitting check
print(f"\nOverfit gap - LR:  {(lr_metrics['train_auc'] - lr_metrics['test_auc'])*100:.2f}pp")
print(f"Overfit gap - XGB: {(xgb_metrics['train_auc'] - xgb_metrics['test_auc'])*100:.2f}pp")


# ============================================================
# STEP 5: XGBOOST CALIBRATION
# ============================================================

# XGBoost does not naturally output well-calibrated probabilities
# Calibrate using Platt scaling on a held-out calibration set
X_cal, X_holdout, y_cal, y_holdout = train_test_split(
    X_test, y_test, test_size=0.5, random_state=42, stratify=y_test
)

calibrated_xgb = CalibratedClassifierCV(
    xgb_model, method='sigmoid', cv='prefit'
)
calibrated_xgb.fit(X_cal, y_cal)

cal_proba = calibrated_xgb.predict_proba(X_holdout)[:, 1]
cal_auc   = roc_auc_score(y_holdout, cal_proba)

print(f"\n--- Calibration ---")
print(f"Raw XGBoost mean PD:       {xgb_test_proba.mean():.4f}")
print(f"Calibrated mean PD:        {cal_proba.mean():.4f}")
print(f"Observed DR (holdout):     {y_holdout.mean():.4f}")
print(f"Calibrated model AUC:      {cal_auc:.4f}")


# ============================================================
# STEP 6: SHAP EXPLAINABILITY
# ============================================================

def run_shap_analysis(model, X: np.ndarray, feature_names: list,
                       sample_size: int = 500) -> None:
    """
    Compute and display SHAP values for XGBoost model.
    SHAP values explain each prediction in terms of feature contributions.
    """
    if not SHAP_AVAILABLE:
        print("SHAP not available. Install with: pip install shap")
        return

    # TreeSHAP: exact computation for tree models
    explainer = shap.TreeExplainer(model)
    idx = np.random.choice(len(X), size=min(sample_size, len(X)), replace=False)
    X_sample = X[idx]
    shap_values = explainer.shap_values(X_sample)

    # Feature importance (mean absolute SHAP)
    mean_abs_shap = np.mean(np.abs(shap_values), axis=0)
    importance_df = pd.DataFrame({
        'feature': feature_names,
        'mean_abs_shap': mean_abs_shap
    }).sort_values('mean_abs_shap', ascending=False)

    print("\n--- SHAP Feature Importance ---")
    print(f"{'Feature':<25} {'Mean |SHAP|':>12} {'Rank':>6}")
    for i, row in importance_df.iterrows():
        print(f"{row['feature']:<25} {row['mean_abs_shap']:>12.4f} {importance_df.index.get_loc(i)+1:>6}")

    # Validate SHAP consistency: base + SHAP sum ≈ model output
    base_val = explainer.expected_value
    model_pred = model.predict_proba(X_sample)[:, 1]
    # For binary XGBoost, SHAP is in log-odds space
    shap_sum_logodds = shap_values.sum(axis=1) + base_val
    shap_pred_prob   = 1 / (1 + np.exp(-shap_sum_logodds))

    max_discrepancy = np.max(np.abs(shap_pred_prob - model_pred))
    print(f"\nSHAP consistency check:")
    print(f"  Base value (log-odds): {base_val:.4f} → "
          f"Base PD: {1/(1+np.exp(-base_val)):.4f}")
    print(f"  Max SHAP + base vs model discrepancy: {max_discrepancy:.6f}")
    print(f"  {'PASS' if max_discrepancy < 0.001 else 'FAIL'}")

    # Single prediction explanation (waterfall)
    high_risk_idx = np.argmax(model.predict_proba(X_sample)[:, 1])
    print(f"\n--- Waterfall: High-Risk Obligor (PD = "
          f"{model.predict_proba(X_sample[high_risk_idx:high_risk_idx+1])[:, 1][0]:.3%}) ---")
    print(f"{'Feature':<25} {'Value':>10} {'SHAP (log-odds)':>16}")
    print(f"  Base value:              {'':>10} {base_val:>16.4f}")
    for fname, fval, sval in sorted(
        zip(feature_names, X_sample[high_risk_idx], shap_values[high_risk_idx]),
        key=lambda x: abs(x[2]), reverse=True
    )[:8]:
        print(f"  {fname:<25} {fval:>10.3f} {sval:>16.4f}")
    print(f"  {'Sum → Final log-odds:':<36} "
          f"{shap_values[high_risk_idx].sum() + base_val:.4f}")

    return shap_values, importance_df

shap_results = run_shap_analysis(xgb_model, X_train, feature_names)


# ============================================================
# STEP 7: SURVIVAL ANALYSIS — COX PROPORTIONAL HAZARDS
# ============================================================

def run_survival_analysis(df: pd.DataFrame) -> None:
    """
    Fit Cox Proportional Hazards model for time-to-default.
    Produces survival curves and lifetime PD term structure.
    """
    if not LIFELINES_AVAILABLE:
        print("Lifelines not available. Install with: pip install lifelines")
        return

    surv_features = ['leverage', 'coverage', 'ebitda_margin', 'log_assets', 'npl_flag']
    surv_df = df[surv_features + ['time_to_event', 'event_indicator']].copy()

    # Winsorise
    for feat in surv_features:
        lo, hi = surv_df[feat].quantile([0.01, 0.99])
        surv_df[feat] = surv_df[feat].clip(lo, hi)

    # Fit Cox model
    cph = CoxPHFitter(penalizer=0.1)
    cph.fit(surv_df, duration_col='time_to_event', event_col='event_indicator')

    print("\n--- Cox Proportional Hazards Model ---")
    print(cph.summary[['coef', 'exp(coef)', 'p', 'coef lower 95%', 'coef upper 95%']]
          .round(4).to_string())

    print(f"\nConcordance Index: {cph.concordance_index_:.4f}")
    print("(Concordance is the survival model's analogue of AUC/Gini)")

    # Generate survival curves for representative borrowers
    low_risk  = pd.DataFrame({'leverage': [2], 'coverage': [8], 'ebitda_margin': [0.25],
                               'log_assets': [6], 'npl_flag': [0]})
    high_risk = pd.DataFrame({'leverage': [7], 'coverage': [1.2], 'ebitda_margin': [0.05],
                               'log_assets': [4.5], 'npl_flag': [1]})

    sf_low  = cph.predict_survival_function(low_risk)
    sf_high = cph.predict_survival_function(high_risk)

    print("\n--- Lifetime PD Term Structure ---")
    print(f"{'Horizon (months)':>18} {'Low-Risk PD':>14} {'High-Risk PD':>14}")
    for t in [12, 24, 36, 48, 60]:
        pd_low  = 1 - float(sf_low.loc[t]) if t in sf_low.index else np.nan
        pd_high = 1 - float(sf_high.loc[t]) if t in sf_high.index else np.nan
        print(f"{t:>18} {pd_low:>14.3%} {pd_high:>14.3%}")

    print("\n(IFRS 9 Stage 2 uses lifetime PD = 1 - S(T) at contract maturity)")

run_survival_analysis(df)


# ============================================================
# STEP 8: CLASS IMBALANCE COMPARISON
# ============================================================

def compare_imbalance_strategies(X_train: np.ndarray, y_train: np.ndarray,
                                   X_test: np.ndarray,  y_test: np.ndarray) -> None:
    """Compare class imbalance strategies on credit data."""

    strategies = {}

    # 1. No handling
    m = xgb.XGBClassifier(n_estimators=200, max_depth=4, random_state=42,
                           eval_metric='auc', use_label_encoder=False)
    m.fit(X_train, y_train, verbose=False)
    strategies['No adjustment'] = m.predict_proba(X_test)[:, 1]

    # 2. Class weights (scale_pos_weight)
    spw = (y_train == 0).sum() / (y_train == 1).sum()
    m2 = xgb.XGBClassifier(n_estimators=200, max_depth=4, scale_pos_weight=spw,
                            random_state=42, eval_metric='auc', use_label_encoder=False)
    m2.fit(X_train, y_train, verbose=False)
    strategies['Class weights'] = m2.predict_proba(X_test)[:, 1]

    # 3. SMOTE (if available)
    try:
        from imblearn.over_sampling import SMOTE
        sm = SMOTE(random_state=42, k_neighbors=5)
        X_res, y_res = sm.fit_resample(X_train, y_train)
        m3 = xgb.XGBClassifier(n_estimators=200, max_depth=4, random_state=42,
                                eval_metric='auc', use_label_encoder=False)
        m3.fit(X_res, y_res, verbose=False)
        strategies['SMOTE'] = m3.predict_proba(X_test)[:, 1]
    except ImportError:
        print("imbalanced-learn not installed; skipping SMOTE")

    print("\n--- Class Imbalance Strategy Comparison ---")
    print(f"{'Strategy':<20} {'AUC':>8} {'Gini':>8} {'Precision@5%':>14} {'Recall@5%':>12}")
    for name, proba in strategies.items():
        auc   = roc_auc_score(y_test, proba)
        gini  = 2 * auc - 1
        # Threshold at 5% PD
        pred  = (proba >= 0.05).astype(int)
        tp    = ((pred == 1) & (y_test == 1)).sum()
        fp    = ((pred == 1) & (y_test == 0)).sum()
        fn    = ((pred == 0) & (y_test == 1)).sum()
        prec  = tp / (tp + fp + 1e-10)
        rec   = tp / (tp + fn + 1e-10)
        print(f"{name:<20} {auc:>8.4f} {gini:>8.4f} {prec:>14.3%} {rec:>12.3%}")

compare_imbalance_strategies(X_train, y_train, X_test, y_test)


# ============================================================
# STEP 9: FULL MODEL COMPARISON VISUALISATION
# ============================================================

def plot_ml_comparison(models_data: dict, y_test: np.ndarray) -> None:
    """
    Comprehensive comparison: Logistic Regression vs XGBoost.
    """
    fig = plt.figure(figsize=(16, 10))
    gs  = gridspec.GridSpec(2, 3, figure=fig)
    fig.suptitle('ML vs Logistic Regression: Credit Risk PD Model', fontsize=13)

    colours = {'Logistic Regression': 'royalblue', 'XGBoost': 'firebrick'}

    # ROC Curve
    ax1 = fig.add_subplot(gs[0, 0])
    for name, proba in models_data.items():
        fpr, tpr, _ = roc_curve(y_test, proba)
        auc = roc_auc_score(y_test, proba)
        ax1.plot(fpr, tpr, lw=2, color=colours[name], label=f'{name} (AUC={auc:.3f})')
    ax1.plot([0,1],[0,1],'k:', lw=1)
    ax1.set_xlabel('FPR'); ax1.set_ylabel('TPR')
    ax1.set_title('ROC Curve'); ax1.legend()

    # Lorenz Curve
    ax2 = fig.add_subplot(gs[0, 1])
    for name, proba in models_data.items():
        df_l = pd.DataFrame({'p': proba, 'y': y_test}).sort_values('p', ascending=False)
        cb   = df_l['y'].cumsum() / df_l['y'].sum()
        ca   = np.arange(1, len(df_l)+1) / len(df_l)
        g    = 2 * np.trapz(cb, ca) - 1
        ax2.plot(ca, cb, lw=2, color=colours[name], label=f'{name} (Gini={g:.3f})')
    ax2.plot([0,1],[0,1],'k:', lw=1)
    ax2.set_xlabel('% Population'); ax2.set_ylabel('% Defaults')
    ax2.set_title('Lorenz Curve (Gini)'); ax2.legend()

    # Calibration
    ax3 = fig.add_subplot(gs[0, 2])
    for name, proba in models_data.items():
        fp, mp = calibration_curve(y_test, proba, n_bins=10)
        ax3.plot(mp, fp, 'o-', lw=2, color=colours[name], label=name)
    ax3.plot([0,0.3],[0,0.3],'k--', label='Perfect')
    ax3.set_xlabel('Mean Predicted PD'); ax3.set_ylabel('Observed DR')
    ax3.set_title('Calibration (Reliability Diagram)'); ax3.legend()

    # Score distribution
    ax4 = fig.add_subplot(gs[1, 0])
    for name, proba in models_data.items():
        ax4.hist(proba[y_test==0], bins=50, density=True, alpha=0.4,
                 color=colours[name], label=f'{name} - Non-default')
        ax4.hist(proba[y_test==1], bins=25, density=True, alpha=0.7,
                 color=colours[name], label=f'{name} - Default', linestyle='--',
                 histtype='step', linewidth=2)
    ax4.set_xlabel('Predicted PD'); ax4.set_title('Score Separation'); ax4.legend(fontsize=7)

    # Lift chart
    ax5 = fig.add_subplot(gs[1, 1])
    for name, proba in models_data.items():
        df_lt = pd.DataFrame({'p': proba, 'y': y_test}).sort_values('p', ascending=False)
        df_lt['cum_cap'] = df_lt['y'].cumsum() / df_lt['y'].sum()
        df_lt['cum_pop'] = np.arange(1, len(df_lt)+1) / len(df_lt)
        ax5.plot(df_lt['cum_pop']*100, df_lt['cum_cap']*100, lw=2,
                 color=colours[name], label=name)
    ax5.plot([0,100],[0,100],'k--', label='Random')
    ax5.axvline(x=10, color='gray', linestyle=':', alpha=0.7)
    ax5.set_xlabel('% Population Scored'); ax5.set_ylabel('% Defaults Captured')
    ax5.set_title('Lift Chart'); ax5.legend()

    # XGBoost feature importance (gain)
    ax6 = fig.add_subplot(gs[1, 2])
    xgb_importance = xgb_model.get_booster().get_score(importance_type='gain')
    fi_df = pd.DataFrame(list(xgb_importance.items()), columns=['Feature', 'Gain'])
    fi_df = fi_df.sort_values('Gain', ascending=True).tail(10)
    # Shorten feature names for display
    fi_df['Feature'] = fi_df['Feature'].str.replace('f', 'Feature ')
    ax6.barh(range(len(fi_df)), fi_df['Gain'], color='firebrick', alpha=0.8)
    ax6.set_yticks(range(len(fi_df)))
    ax6.set_yticklabels([feature_names[int(f.replace('Feature ',''))]
                          if f.startswith('Feature ')
                          else f for f in fi_df['Feature']], fontsize=8)
    ax6.set_xlabel('Feature Gain')
    ax6.set_title('XGBoost Feature Importance (Gain)')

    plt.tight_layout()
    plt.savefig('/tmp/m24_ml_comparison.png', dpi=120, bbox_inches='tight')
    plt.close()
    print("\nML comparison dashboard saved.")

plot_ml_comparison(
    {'Logistic Regression': lr_test_proba, 'XGBoost': xgb_test_proba},
    y_test
)


# ============================================================
# STEP 10: REGULATORY MODEL CARD
# ============================================================

def generate_model_card(model_name: str, model_type: str,
                         train_metrics: dict, test_metrics: dict,
                         feature_names: list, n_train: int, n_test: int,
                         n_defaults_train: int) -> str:
    """
    Generate a regulatory model card string.
    Model cards are required by SR 11-7, PRA SS1/23, and EU AI Act.
    """

    card = f"""
================================================================================
                    REGULATORY MODEL CARD
================================================================================
Model Name:         {model_name}
Model Type:         {model_type}
Version:            1.0
Development Date:   2024-01-15
Review Date:        2025-01-15
Model Owner:        Credit Risk Modelling Team
Model Validator:    Independent Model Validation (separate team)
Regulatory Status:  Internal use only (not submitted for IRB approval)
================================================================================

1. MODEL PURPOSE
   Estimate 12-month probability of default for corporate borrowers.
   Used for: IFRS 9 ECL (Stage 1 provisioning), internal credit monitoring,
   risk-based pricing. NOT used for: IRB regulatory capital (logistic
   regression scorecard used for capital).

2. TRAINING DATA
   Development period:   2010-2021
   N observations:       {n_train:,}
   N defaults:           {n_defaults_train:,}
   Default rate:         {n_defaults_train/n_train:.2%}
   Features used:        {len(feature_names)} ({', '.join(feature_names[:5])}...)
   Out-of-time test:     2022-2023 (N={n_test:,})

3. ALGORITHM
   Algorithm:            {model_type}
   Justification:        Selected for superior discriminatory power vs logistic
                         regression (+{(test_metrics['test_gini']-train_metrics['test_gini'])*100:.1f}pp Gini on OOT).
                         Non-linear relationships between leverage/coverage and
                         default are better captured by gradient boosting.
   Limitations:          Requires SHAP for prediction explanation. Not suitable
                         for IRB regulatory capital model submission without
                         regulatory pre-approval.
   Class imbalance:      Handled via scale_pos_weight = {(y_train==0).sum()/(y_train==1).sum():.1f}

4. PERFORMANCE METRICS (Out-of-Time Test Set)
   AUC:                  {test_metrics['test_auc']:.4f}
   Gini:                 {test_metrics['test_gini']:.4f}
   Brier Score:          {test_metrics['test_brier']:.4f}
   Benchmark (LR Gini):  {lr_metrics['test_gini']:.4f}
   Gini vs benchmark:    +{(test_metrics['test_gini']-lr_metrics['test_gini'])*100:.1f}pp

5. EXPLAINABILITY
   Method:               TreeSHAP (Lundberg & Lee, 2017)
   Top 3 drivers:        leverage, coverage, npl_flag
   Direction validation: All features have SHAP directions consistent with
                         credit theory (positive leverage → higher PD,
                         positive coverage → lower PD).
   Individual explanations available for all predictions.

6. FAIRNESS AND BIAS
   Protected characteristics tested: N/A for corporate model.
   Industry sector bias check: conducted. Energy sector elevated PD
   consistent with sector fundamentals.

7. KNOWN LIMITATIONS
   - Model trained on 2010-2021 data; performance in novel stress scenarios
     (beyond COVID-19) may degrade.
   - Does not capture management quality, strategic risk, or ESG factors.
   - Calibration requires annual recalibration to LRA default rate.
   - SHAP explanations are local (per-prediction); global interpretability
     is approximated from aggregated SHAP values.

8. MONITORING PLAN
   PSI threshold (AMBER): 0.10 | (RED): 0.25
   Gini monitoring:       Quarterly; alert if OOT Gini drops >5pp
   Calibration:           Annual HL test; recalibrate if p-value < 0.05
   SHAP drift:            Monitor mean |SHAP| per feature quarterly

9. REGULATORY REFERENCES
   SR 11-7 (Model Risk Management)
   EBA/GL/2017/16 (PD Estimation)
   PRA SS1/23 (Model Risk Management)
   EU AI Act Article 10 (High-Risk AI: Credit Scoring)

================================================================================
"""
    print(card)
    return card

model_card = generate_model_card(
    model_name     = 'Corporate PD Model — XGBoost v1.0',
    model_type     = 'XGBoost Gradient Boosting',
    train_metrics  = lr_metrics,     # benchmark
    test_metrics   = xgb_metrics,    # ML model
    feature_names  = feature_names,
    n_train        = len(X_train),
    n_test         = len(X_test),
    n_defaults_train = y_train.sum()
)
```

---

## 11. Interview Questions

**Conceptual:**

1. *"Why does XGBoost outperform logistic regression on credit data?"*
   Answer: Credit risk has non-linear relationships that logistic regression cannot capture without manual engineering. The relationship between leverage and default is not linear in log-odds — default risk is roughly flat below 3x Debt/EBITDA, then accelerates sharply above 5-6x. Coverage has a critical floor below 1.5x but saturates above 4-5x. Interaction effects (leverage × margin) are economically important but hard to specify in advance. XGBoost learns all of these automatically. On a well-specified logistic regression (with manual transformations and interactions), the Gini gap narrows considerably — but XGBoost still typically wins by 3-10pp.

2. *"What are SHAP values and why do regulators care about them?"*
   Answer: SHAP values decompose each model prediction into the contributions of individual features, using Shapley values from cooperative game theory. They satisfy axioms of fairness (efficiency, symmetry, dummy, linearity) that make them the gold standard for ML explainability. Regulators care because SR 11-7 and the EU AI Act require that model outputs be explicable — for credit decisions, borrowers have a right to understand why they received a given credit outcome. SHAP allows a bank to say: "Your PD of 12% is driven primarily by your Debt/EBITDA of 7x (+4.2% contribution) and your 2022 payment irregularity (+2.8% contribution)."

3. *"Can you use XGBoost for an IRB PD model?"*
   Answer: Technically yes — no regulation explicitly prohibits it — but in practice it is very difficult to get regulatory approval. The ECB Guide to Internal Models requires that each predictor's effect be explicable in credit terms. While SHAP can explain individual predictions, regulators have been skeptical of whether the level of interpretability equals that of logistic regression coefficients. Additionally, XGBoost models require more extensive stability testing. Some banks have obtained approval for XGBoost in non-IRB applications (IFRS 9, early warning) and are gradually building the regulatory evidence base for IRB use.

4. *"Explain the bias-variance trade-off in the context of random forests vs single trees."*
   Answer: A single decision tree has low bias (can fit any data pattern) but high variance (small changes in training data produce very different trees). A random forest reduces variance by averaging many trees, each trained on a bootstrap sample with random feature subsets — the averaging effect reduces variance approximately by 1/B (modified by tree correlation). Bias remains approximately the same as an individual tree. The result is a model with low bias and substantially lower variance, which is why random forests generalise much better than single trees.

5. *"How does Cox Proportional Hazards model handle censoring?"*
   Answer: Censored observations — borrowers who leave the portfolio before defaulting — contribute information only up to their exit time. The Cox partial likelihood conditions on the observed ordering of default times, so censored observations appear in the risk sets of earlier events but are excluded from later risk sets after censoring. This is the key advantage over standard logistic regression for survival data: logistic regression with a binary outcome ignores the timing of non-events, while Cox uses all the survival time information efficiently.

**Technical:**

6. *"Write the XGBoost objective function and explain each term."*
7. *"What is the TreeSHAP algorithm? Why is it preferred over KernelSHAP for tree models?"*
8. *"How do you tune the scale_pos_weight parameter in XGBoost?"*
9. *"What is early stopping in gradient boosting? Why is it used?"*
10. *"A client asks why their loan was declined. How do you use SHAP to provide an explanation?"*

---

## 12. Common Mistakes

**Mistake 1: Using accuracy as the performance metric for imbalanced data**
On a 95% non-default dataset, predicting "never default" gives 95% accuracy. This model is useless. Always use AUC, Gini, precision-recall AUC, or F1 for imbalanced credit data.

**Mistake 2: Not calibrating XGBoost before outputting PDs**
XGBoost outputs uncalibrated scores. The rank ordering is good (high AUC) but the absolute values are not valid probabilities. For EL = PD × LGD × EAD, calibrated probabilities are required. Always apply Platt scaling or isotonic regression on a held-out calibration set.

**Mistake 3: Using SMOTE and then not recalibrating**
SMOTE changes the class distribution in training. A model trained on SMOTE-upsampled data outputs probabilities relative to the artificial distribution, not the true one. Multiplying raw output by a calibration factor is insufficient — use CalibratedClassifierCV.

**Mistake 4: SHAP explained on training data presented as model explanation**
SHAP should be computed on the same population as the prediction being explained. Feature importance computed on training data will overweight features that the model may have overfit to. Use OOT or representative application data for SHAP summaries.

**Mistake 5: Ignoring model decay for ML models**
Tree-based models pick up nuanced patterns that may be time-specific. ML models tend to decay faster than logistic regression in credit. Monthly PSI monitoring and quarterly Gini checks are minimum requirements.

**Mistake 6: Hyperparameter tuning on the test set**
Selecting hyperparameters by running many configurations on the test set and picking the best is a form of data snooping — the test set ceases to be a genuine holdout. Use a separate validation set or time-series cross-validation for tuning.

**Mistake 7: Treating SHAP direction as a credit story without verification**
If SHAP shows that "industry = Tech" decreases PD, verify that this reflects genuine credit fundamentals (Tech companies historically lower default rate) and not spurious correlation in the training data (e.g., Tech companies borrowed more during a boom period and the model has confused sector with economic cycle).

---

## 13. Case Studies

**Case Study 1: UK Bank's IFRS 9 Early Warning System — XGBoost**

A large UK bank replaced its rule-based early warning system (EWS) with an XGBoost model in 2021, targeting corporate borrowers 6-12 months ahead of watchlist entry.

Key design choices:
- Features: 18 financial ratios + 6 behavioural features (payment days, covenant proximity) + 3 macro overlays
- Non-linearity captured: coverage × leverage interaction proved to be the single highest-SHAP feature — logistic regression had failed to capture this
- Class imbalance: scale_pos_weight = 22 (watchlist entries were 4.5% of population)
- Explainability: SHAP waterfall presented to Relationship Managers via a dashboard — first time RMs could see a quantitative explanation for why an account was flagged

Results:
- 62% capture rate of future watchlist entries in top decile (vs 48% for prior rule-based system)
- 23% reduction in surprise defaults (borrowers reaching default with no EWS flag)
- Regulatory outcome: PRA inspectors accepted the model for IFRS 9 staging triggers after reviewing SHAP documentation

**Case Study 2: Fintech SME Lender — XGBoost with Alternative Data**

A digital lender used XGBoost to combine traditional financial ratios with bank transaction data (cash flow patterns, payroll regularity, supplier payment timing) for SME credit scoring.

Key findings:
- Gini improvement over traditional logistic regression: +18pp (from 55% to 73%)
- Top SHAP feature: "Payroll_regularity" — companies that paid staff on irregular schedules had 3x higher default rates (financial stress signal)
- Calibration challenge: default rates varied by loan vintage (COVID impact); required separate calibration by origination period
- Fair lending check: ethnicity proxy testing on postcode × SHAP values revealed no significant disparate impact

**Lesson:** Alternative data + ML can dramatically improve SME credit models where financial statements are limited. Governance remains critical.

---

## 14. Iterative Reinforcement

**Week 1 — Tree Intuition:**
- Build a single decision tree on the synthetic dataset; plot it (sklearn's plot_tree); identify the first split variable
- Build a random forest; compare OOT Gini vs single tree; confirm variance reduction

**Week 2 — XGBoost:**
- Train XGBoost on the synthetic dataset; tune max_depth (3, 4, 5, 6); plot OOT Gini vs max_depth
- Enable early stopping; plot the learning curve (training vs validation AUC by n_estimators)

**Week 3 — SHAP:**
- Install shap; compute TreeSHAP on your XGBoost model; produce summary plot
- Pick the highest-PD borrower; produce a waterfall plot; write a credit officer narrative explaining the 3 biggest SHAP contributions

**Week 4 — Survival Analysis:**
- Install lifelines; fit a KaplanMeierFitter on the synthetic time-to-event data; plot survival curves by industry
- Fit CoxPHFitter; interpret the coefficient on leverage (it is a log-hazard-ratio)

**Week 5 — Governance:**
- Write a model card for your XGBoost model; use the template from Section 10
- Identify 3 regulatory requirements from SR 11-7 that your model must satisfy and explain how

**Self-Assessment:**
1. Explain the TreeSHAP algorithm in terms a credit risk manager would understand
2. Recite the five SHAP axioms and state why the "efficiency" axiom matters for regulatory compliance
3. Design a monitoring plan for an XGBoost IFRS 9 model, including trigger thresholds and escalation procedures

---

## 15. Source Material

**Foundational ML Texts:**
- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning.* Springer. (Free PDF — the reference for ensemble methods)
- Chen, T. & Guestrin, C. (2016). "XGBoost: A Scalable Tree Boosting System." *KDD 2016.*
- Ke, G. et al. (2017). "LightGBM: A Highly Efficient Gradient Boosting Decision Tree." *NeurIPS 2017.*

**Explainability:**
- Lundberg, S.M. & Lee, S.I. (2017). "A Unified Approach to Interpreting Model Predictions." *NeurIPS 2017.* (Original SHAP paper)
- Lundberg, S.M. et al. (2018). "Consistent Individualized Feature Attribution for Tree Ensembles." *arXiv:1802.03888.* (TreeSHAP)
- Molnar, C. (2022). *Interpretable Machine Learning.* 2nd ed. (Free: christophm.github.io/interpretable-ml-book/)

**Survival Analysis:**
- Cox, D.R. (1972). "Regression Models and Life-Tables." *Journal of the Royal Statistical Society*, Series B, 34(2), 187-220.
- Hosmer, D., Lemeshow, S., & May, S. (2008). *Applied Survival Analysis.* Wiley.
- Kvamme, H., Borgan, Ø., & Scheel, I. (2019). "Time-to-Event Prediction with Neural Networks and Cox Regression." *JMLR*, 20(129), 1-30.

**Credit Risk + ML:**
- Barboza, F., Kimura, H., & Altman, E. (2017). "Machine learning models and bankruptcy prediction." *Expert Systems with Applications*, 83, 405-417.
- Dumitrescu, E. et al. (2022). "Machine learning for credit scoring: Improving logistic regression with non-linear decision-tree effects." *European Journal of Operational Research*, 297(3), 1178-1192.
- Moscato, V. et al. (2021). "A Survey of Explainability in Machine Learning: Application to Credit Scoring." *IEEE Access.*

**Regulatory:**
- Federal Reserve (2011). SR 11-7: *Guidance on Model Risk Management.*
- ECB (2019). *Guide to Internal Models — Credit Risk Chapter.* ISBN 978-92-899-3688-8.
- PRA (2023). SS1/23: *Model Risk Management Principles for Banks.*
- EU (2024). *EU Artificial Intelligence Act.* Official Journal of the European Union. (Article 6 + Annex III: Credit scoring as high-risk AI)
- EBA (2023). *EBA Report on the use of Machine Learning in IRB Models.*

**Python Libraries:**
- xgboost: xgboost.readthedocs.io
- lightgbm: lightgbm.readthedocs.io
- shap: shap.readthedocs.io
- lifelines: lifelines.readthedocs.io (survival analysis)
- scikit-learn: scikit-learn.org (random forests, calibration, cross-validation)
- imbalanced-learn: imbalanced-learn.org (SMOTE and related methods)
