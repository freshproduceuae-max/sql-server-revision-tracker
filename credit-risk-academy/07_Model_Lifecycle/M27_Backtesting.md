# M27 — Backtesting

> Testing whether a model's predictions matched historical outcomes. Covers PD, LGD, and EAD backtesting, the Basel traffic light framework, statistical tests, low-default portfolio challenges, and regulatory expectations for backtesting documentation.

---

## 1. Business Purpose

Backtesting is the retrospective test of whether a model's predictions were accurate. It answers the question: "Looking back over the last 12 months (or longer), did the model predict what actually happened?"

**Why Backtesting Is Mandatory**
1. **Regulatory requirement**: Basel II/III and CRR Article 185 require annual backtesting of IRB PD models. Similar requirements apply under IFRS 9 (IAS 8 requirement to revise estimates when new information is available).
2. **Model Risk Management**: SR 11-7 requires ongoing monitoring of model performance. Backtesting is the primary mechanism for detecting model deterioration.
3. **Capital Adequacy**: A PD model that systematically under-predicts default rates will produce insufficient capital. Backtesting catches this before it becomes a prudential problem.
4. **Provision Accuracy**: An LGD model that overestimates recovery rates will produce insufficient IFRS 9 ECL provisions, requiring sudden large provision top-ups when actual recoveries disappoint.

**Backtesting vs. Benchmarking — A Critical Distinction**

This distinction matters in regulatory conversations and validation reports:

| Dimension | Backtesting | Benchmarking |
|-----------|-------------|--------------|
| Reference | Model's own past predictions vs. actual outcomes | Model outputs vs. external reference (agency rates, peer banks) |
| Question | "Was the model accurate?" | "Is the model plausible?" |
| Data needed | Historical predictions + actual outcomes | External rate tables or competitor disclosures |
| Use case | Detecting calibration drift, model failure | Detecting structural bias; LDP validation |
| SR 11-7 / Basel term | Backtesting | Benchmarking |

Both are required. Backtesting is the primary performance test; benchmarking provides context (covered in M28).

**What Gets Backtested**

In an IRB bank, three parameters require annual backtesting:
- PD: Predicted 12-month default probability vs. observed 12-month default rate
- LGD: Predicted loss given default vs. realised LGD on completed workouts
- EAD/CCF: Predicted credit conversion factor vs. realised CCF on facilities that defaulted

In IFRS 9, backtesting applies to:
- PD estimates across stages
- LGD (recovery rates and timing)
- Forward-looking macro assumptions (were the scenarios used appropriate?)

---

## 2. Accounting Concepts

**Realised LGD Calculation**
Under IFRS 9 and IRB, LGD is calculated on defaulted exposures that have resolved (the workout is complete):

```
Realised LGD = 1 − Recovery Rate
Recovery Rate = NPV of All Cash Flows After Default / EAD at Default
NPV uses EIR as discount rate (IFRS 9) or contractual rate (Basel IRB)
```

Components of realised LGD:
- Cash recoveries received (principal, interest, collateral realisation proceeds)
- Less: Direct workout costs (legal fees, valuation costs, administrator fees)
- Discounted to the default date at the effective interest rate

**The Cure Rate Problem**
Many "defaults" cure — the obligor pays down arrears or restructures, and the account returns to performing status. Under IFRS 9, a cured account may exit Stage 3. Under Basel, a cured account can be treated as a non-default after a probation period (typically 12 months).

For LGD backtesting:
- Cured cases contribute a 0% loss (recovery = 100% of EAD)
- Including or excluding cures has a material impact on observed LGD
- The backtesting methodology must specify how cures are treated, consistently with how the LGD model was built

**Write-off Policy and its Effect on Observed LGD**
Banks vary in their write-off policies. A bank that writes off accounts early (low carrying value) will show a high realised LGD immediately but may collect more cash post-write-off. A bank that writes off late shows low LGD initially but the timing of cash flows affects NPV. For backtesting, the consistent definition is: LGD = NPV of losses from default date, regardless of write-off timing.

**CCF for Undrawn Commitments**
EAD for revolving facilities = Outstanding Balance + CCF × Undrawn Commitment
Realised CCF = (EAD at Default − Drawn Amount at Observation) / Undrawn Amount at Observation

For IFRS 9, EAD must reflect expected future drawdowns over the remaining lifetime (for Stage 2/3 lifetime ECL).

---

## 3. Financial Concepts

**Long-Run Average Default Rate (LRADR)**
The IRB calibration target is the long-run average PD, intended to be stable through the economic cycle (TTC). Basel requires:
- Minimum 5 years of data for PD calibration (7 years preferred)
- The LRADR must reflect a complete economic cycle (peak and trough)

Backtesting compares the model's predicted PD for each grade to the grade's realised default rate. The key question: is the realised DR statistically consistent with the predicted PD, accounting for sampling uncertainty?

**The Conservatism Principle**
Under Basel CRR Article 179, PD estimates must include a margin of conservatism (MoC) to account for:
- Expected estimation errors
- The impact of data limitations
- Future uncertainty in credit conditions

The MoC means that well-calibrated IRB PDs will typically be *above* the realised default rate in normal periods. Backtesting that finds PD consistently below realised DR suggests insufficient MoC; consistently above suggests excessive conservatism (which inflates capital unnecessarily).

**LGD Downturn Adjustment**
IRB LGD must reflect "downturn" conditions (CRR Article 181): the LGD estimate should represent expected losses during a severe economic downturn, not average-cycle conditions. This means IRB LGDs will typically be higher than average realised LGDs. Backtesting must explicitly compare:
- Downturn LGD (IRB estimate) vs. LRADR LGD (long-run average realised)
- If the bank experienced a downturn in the backtesting window, compare to that period specifically

**Capital Sensitivity to Backtesting Failures**
If backtesting reveals systematic under-prediction:
- PRA may impose a scalar multiplier on PD estimates (e.g., all PDs × 1.5) under Article 177 CRR
- Or require immediate recalibration
- Or impose Pillar 2A capital add-on

A 50% increase in all corporate PDs could increase IRB RWA by 30–50%, with direct P&L impact.

---

## 4. Statistical Concepts

**The Basel Traffic Light Framework (Annex 10a)**
Basel prescribes a traffic light system for PD backtesting based on the number of exceptions (observed defaults exceeding predicted). For a portfolio-level test with n obligors and predicted PD p:

The number of defaults d is compared to critical values from Binomial(n, p):
- GREEN zone: d is consistent with predicted PD (not statistically unusual)
- YELLOW zone: d is higher than expected but could plausibly occur by chance
- RED zone: d significantly exceeds predicted PD; model failure likely

In practice:
- GREEN: p-value > 0.05 (fail to reject H₀: model is calibrated)
- YELLOW: p-value 0.01–0.05 (potential miscalibration)
- RED: p-value < 0.01 (statistically significant miscalibration)

**Binomial Test for PD**
For grade g with n_g obligors, predicted PD p_g, observed defaults d_g:

```
H₀: d_g ~ Binomial(n_g, p_g)
Test statistic: exact binomial or normal approximation
z_g = (d_g/n_g − p_g) / √(p_g × (1 − p_g) / n_g)
One-sided p-value: P(Z > z_g)  [testing for under-prediction]
```

**Jeffreys Interval for PD Confidence Interval**
The Jeffreys interval is the Bayesian credible interval for a proportion using a Beta(0.5, 0.5) prior (Jeffreys prior). It has better coverage than the Wald interval for small n and extreme proportions.

```
For d defaults out of n obligors:
Lower bound: Beta quantile at α/2 with shape params (d + 0.5, n − d + 0.5)
Upper bound: Beta quantile at 1−α/2 with same params
```

The Jeffreys interval is recommended by Basel for low-default portfolios where d = 0 is possible (the Wald interval gives a 0% lower bound, which is uninformative).

**LGD Backtesting — t-test Approach**
For completed workout observations:

```
H₀: Mean(Realised LGD) = Predicted LGD
t = (LGD_observed − LGD_predicted) / (s / √n)
where s = sample standard deviation of realised LGD
```

However, LGD distributions are typically bimodal (many near-zero recoveries from cures; many near-100% losses on complete write-offs) — violating t-test normality. Mann-Whitney U test or bootstrap confidence intervals are preferred.

**EAD/CCF Backtesting**
For EAD/CCF, the test is:
- Compute Realised CCF = (EAD_at_default − Balance_at_obs) / Undrawn_at_obs for each defaulted facility
- Compare distribution of Realised CCF to model's Predicted CCF
- T-test or Wilcoxon signed-rank test on the difference

**The Low Default Portfolio (LDP) Problem**
For portfolios with very few defaults (sovereign, FI, large corporate), standard statistical tests have very low power. If a portfolio has n = 200 obligors and PD = 0.5%, expected defaults per year = 1. Observing 0 or 2 defaults tells you almost nothing about whether the PD is 0.3% or 1.0%.

Solutions for LDP:
1. Extend the observation period (pool multiple years)
2. Use Jeffreys interval with proper interpretation
3. Pool similar portfolios (cross-sectional pooling)
4. Use external benchmarks as the primary test (see M28)
5. Apply the conservative assumption until more data is available

---

## 5. Regulatory Framework

**Basel II Annex 10a — Backtesting Requirements**
- Annual backtesting of PD estimates
- Traffic light framework (prescribed significance levels)
- Backtesting must cover at least 1 full year; ideally 3–5 years
- Failed backtests require investigation and may trigger recalibration
- Backtesting results must be documented and submitted to the regulator

**CRR Article 185 — Validation Requirements (Backtesting)**
"Credit institutions shall have robust systems in place to validate the accuracy and consistency of rating systems, processes, and the estimation of all relevant risk parameters. A credit institution shall demonstrate to the competent authority that the internal validation process enables it to assess the performance of internal rating and risk estimation systems consistently and meaningfully."

**EBA/GL/2017/07 — Specific Backtesting Requirements**
- Section 5: PD backtesting — binomial test required; confidence intervals required for LDP
- Section 7: LGD backtesting — at least 5 years of realised LGD data; cures must be explicitly addressed
- Section 8: EAD backtesting — at least 5 years; CCF comparison required

**PRA SS1/23 — Ongoing Monitoring Triggers**
The PRA expects banks to define pre-specified triggers that automatically initiate model review when backtesting detects deterioration:
- PD trigger: ≥ 2 grades fail binomial test, or portfolio-level failure
- LGD trigger: Realised LGD exceeds predicted by > 20% for two consecutive years
- EAD trigger: Realised CCF exceeds predicted by > 15%
- Stability trigger: PSI > 0.25 (covered in M26)

**IFRS 9 Audit Committee Expectations**
External auditors require backtesting evidence that:
- Prior-year ECL estimates were reasonable
- If realised losses materially exceed/undershoot prior-year ECL, the difference is explained
- Model updates following backtesting failures are disclosed in the notes

---

## 6. Data Required

**PD Backtesting Data**
- Risk grade assignment at observation date (T₀)
- Predicted PD as of T₀ (from the model)
- Default indicator for the 12-month window [T₀, T₀+12m]
- Minimum: 3 years of historical grade assignments (5 preferred)
- Data must be captured at the time of rating, not reconstructed retroactively

**LGD Backtesting Data**
- Default date (T_D) and EAD at default
- All post-default cash flows with dates (interest, principal, collateral proceeds, net of workout costs)
- Resolution date (T_R): date the account was fully resolved (written off, settled, cured)
- Predicted LGD at time of default (the model's estimate at T_D)
- Minimum: 100 completed workouts for meaningful statistical testing
- Note: Only completed workouts can be included; open defaults are excluded from LGD backtesting

**EAD/CCF Backtesting Data**
- Undrawn commitment and utilisation at observation date T₀
- EAD at default date
- Predicted CCF at T₀
- Only facilities that subsequently defaulted are included
- Facilities must have had undrawn commitment at T₀ (facilities fully drawn contribute no CCF information)

**Data Challenges**
1. Historical rating records: Many banks did not retain point-in-time rating records; they only have current ratings. Retroactive rating reconstruction is not permitted.
2. Complete workout data: Workouts can take 5–10 years (especially real estate collateral). Short backtesting windows therefore have few completed workouts.
3. Consistent default definition: If the bank changed its default definition during the backtesting period, defaults must be reidentified under the current definition.

---

## 7. How Analysts Actually Work

**Annual PD Backtesting Cycle**

Typically run in Q1 for the prior calendar year:

1. **Data extraction**: Pull all rated obligors as of 31 Dec PY-1, their grades, and predicted PDs
2. **Default identification**: Identify which obligors defaulted in the following 12 months (31 Dec PY-1 to 31 Dec PY)
3. **Grade-level aggregation**: Count N and D per grade
4. **Statistical tests**: Binomial test per grade; chi-square overall; Jeffreys intervals for LDP grades
5. **Traffic light assignment**: GREEN/YELLOW/RED per grade
6. **Root cause analysis**: For RED grades, investigate: Is this a calibration failure? A data issue? A genuine shift in credit quality?
7. **Report production**: Backtesting report for MRC, includes year-over-year comparison

**LGD Backtesting Workflow**

LGD backtesting is more complex because it requires completed workouts:

1. Pull all accounts that defaulted in the backtesting window AND have a resolution date (workout complete)
2. Calculate realised LGD for each resolved account: NPV of cash flows from default date to resolution, discounted at EIR
3. Match to the predicted LGD estimate at the time of default
4. Aggregate by:
   - Collateral type (secured/unsecured)
   - Facility type (term loan / revolving)
   - Industry sector
5. Run t-test or Mann-Whitney test: is predicted LGD significantly different from realised?
6. Assess direction: if realised LGD > predicted LGD, the model is under-estimating losses

**Handling the "Not Enough Data" Problem**

For LDP portfolios, analysts use multi-year pooling:
- Pool all defaults from all available years into one sample
- Acknowledge that default rates vary by economic cycle (add a note on cycle position)
- Compute Jeffreys intervals rather than Wald (which fails with small d)
- Use the external benchmark as the primary calibration reference

---

## 8. Excel Implementation

**Traffic Light Backtesting Spreadsheet**

```
Sheet: PD_Backtest_[Year]

Column A: Grade (1-10)
Column B: N_Obligors (at start of period)
Column C: N_Defaults (observed in 12 months)
Column D: Observed_DR = C/B
Column E: Predicted_PD (model estimate)
Column F: Expected_Defaults = B × E
Column G: Binomial_P_Value_Upper (one-tailed, testing under-prediction)
         = 1 - BINOM.DIST(C-1, B, E, TRUE)  [P(X >= C)]
Column H: Z_Stat = (D - E) / SQRT(E*(1-E)/B)
Column I: Traffic_Light = IF(G < 0.01, "RED", IF(G < 0.05, "YELLOW", "GREEN"))
Column J: Direction = IF(D > E, "UNDER-PREDICT", "OVER-PREDICT")
Column K: Jeffreys_Lower = BETA.INV(0.025, C+0.5, B-C+0.5)
Column L: Jeffreys_Upper = BETA.INV(0.975, C+0.5, B-C+0.5)
Column M: PD_in_CI = IF(AND(E >= K, E <= L), "YES", "OUTSIDE CI")

Bottom rows:
- Portfolio total: SUM(B), SUM(C), Weighted average PD vs Observed DR
- Portfolio chi-square: Calculated as per formula in section 4
- Year-over-year Gini comparison (from separate tab)

Conditional formatting:
- RED cells in column I → Red fill
- YELLOW → Amber fill
- GREEN → Green fill
```

**Multi-Year PD Backtest Table**

```
Sheet: Multi_Year_Backtest
Rows: Grades 1-10
Columns per year: N_Obligors | N_Defaults | Obs_DR | Pred_PD | Traffic_Light

Sparkline in final column showing Observed_DR trend vs flat Predicted_PD line
Heat map: deeper red = more recent RED failures = escalating model failure
```

**LGD Backtest Summary**

```
Sheet: LGD_Backtest
Column A: Account_ID
Column B: Default_Date
Column C: EAD_at_Default
Column D: NPV_Recoveries (sum of discounted cash flows)
Column E: Direct_Workout_Costs
Column F: Realised_LGD = 1 - (D-E)/C
Column G: Predicted_LGD (at default date from model)
Column H: LGD_Difference = F - G
Column I: Abs_Difference = ABS(H)

Summary statistics:
- Average Realised LGD
- Average Predicted LGD
- T-stat for H₀: mean(H) = 0
- P-value (two-tailed)
- % of accounts where realised > predicted (one-sided view)

Histogram: Distribution of Realised LGD (should be bimodal)
Scatter: Predicted vs Realised (45-degree line = perfect calibration)
```

---

## 9. SQL Implementation

```sql
-- ============================================================
-- M27: BACKTESTING SUITE — PD, LGD, EAD
-- ============================================================

-- ============================================================
-- SECTION 1: PD BACKTESTING
-- ============================================================

-- Step 1: Gather rated population and default outcomes
WITH RatedPopulation AS (
    SELECT
        r.obligor_id,
        r.rating_date,                   -- Must be point-in-time rating date
        r.risk_grade,
        r.predicted_pd,
        DATEADD(MONTH, 12, r.rating_date) AS performance_end
    FROM dbo.RatingHistory r
    WHERE r.rating_date >= '2023-01-01'
      AND r.rating_date <= '2023-12-31'
      AND r.rating_type = 'ANNUAL_REVIEW'  -- Point-in-time, not override
),
DefaultsInWindow AS (
    SELECT
        rp.obligor_id,
        rp.risk_grade,
        rp.predicted_pd,
        rp.rating_date,
        CASE
            WHEN EXISTS (
                SELECT 1 FROM dbo.DefaultEvents de
                WHERE de.obligor_id = rp.obligor_id
                  AND de.default_date > rp.rating_date
                  AND de.default_date <= rp.performance_end
            ) THEN 1
            ELSE 0
        END AS default_flag
    FROM RatedPopulation rp
)

-- Step 2: Aggregate by grade
SELECT
    risk_grade,
    COUNT(*)                            AS n_obligors,
    SUM(default_flag)                   AS n_defaults,
    AVG(predicted_pd)                   AS avg_predicted_pd,
    CAST(SUM(default_flag) AS FLOAT)
        / COUNT(*)                      AS observed_dr,
    -- Expected defaults
    AVG(predicted_pd) * COUNT(*)        AS expected_defaults,
    -- Z-stat (normal approximation to binomial)
    (CAST(SUM(default_flag) AS FLOAT) / COUNT(*)
     - AVG(predicted_pd))
    / NULLIF(SQRT(
        AVG(predicted_pd) * (1 - AVG(predicted_pd)) / COUNT(*)
    ), 0)                               AS z_stat,
    -- Jeffreys 95% CI (approximation; exact requires Beta distribution)
    -- Lower: BETA_INV(0.025, d+0.5, n-d+0.5) — computed in application layer
    SUM(default_flag) + 0.5             AS jeffreys_a,   -- Pass to application
    COUNT(*) - SUM(default_flag) + 0.5 AS jeffreys_b
INTO #PD_Backtest_Grade
FROM DefaultsInWindow
GROUP BY risk_grade
ORDER BY risk_grade;

-- Step 3: Traffic light classification
SELECT
    *,
    CASE
        -- Approx p-value from z-stat (one-tailed upper)
        WHEN z_stat > 3.09 THEN 'RED'     -- p < 0.001
        WHEN z_stat > 2.33 THEN 'RED'     -- p < 0.010
        WHEN z_stat > 1.96 THEN 'YELLOW'  -- p < 0.025
        WHEN z_stat > 1.65 THEN 'YELLOW'  -- p < 0.050
        ELSE 'GREEN'
    END AS traffic_light,
    CASE
        WHEN observed_dr > avg_predicted_pd THEN 'UNDER-PREDICTING (model too optimistic)'
        WHEN observed_dr < avg_predicted_pd THEN 'OVER-PREDICTING (model too conservative)'
        ELSE 'CORRECTLY CALIBRATED'
    END AS calibration_direction
FROM #PD_Backtest_Grade;

-- Step 4: Portfolio-level chi-square
SELECT
    SUM(n_obligors)                     AS total_obligors,
    SUM(n_defaults)                     AS total_defaults,
    CAST(SUM(n_defaults) AS FLOAT)
        / SUM(n_obligors)               AS portfolio_observed_dr,
    SUM(n_obligors * avg_predicted_pd)
        / SUM(n_obligors)               AS portfolio_weighted_pd,
    -- Chi-square statistic
    SUM(
        POWER(n_defaults - expected_defaults, 2)
        / NULLIF(expected_defaults, 0)
    )                                   AS chi_square_stat
FROM #PD_Backtest_Grade;

-- ============================================================
-- SECTION 2: LGD BACKTESTING
-- ============================================================
WITH DefaultedAccounts AS (
    SELECT
        de.default_id,
        de.account_id,
        de.obligor_id,
        de.default_date,
        de.ead_at_default,
        de.predicted_lgd,
        de.resolution_date,
        de.resolution_type  -- CURE / SETTLED / WRITTEN_OFF / COLLATERAL_REALISED
    FROM dbo.DefaultEvents de
    WHERE de.resolution_date IS NOT NULL    -- Only completed workouts
      AND de.default_date >= '2018-01-01'   -- Minimum 5 years for LGD backtesting
),
CashFlows AS (
    SELECT
        cf.default_id,
        -- NPV of all post-default cash flows, discounted at EIR to default date
        SUM(
            cf.cash_amount
            / POWER(1 + cf.eir, DATEDIFF(DAY, da.default_date, cf.cash_date) / 365.25)
        ) AS npv_recoveries,
        SUM(cf.workout_cost) AS total_workout_costs
    FROM dbo.PostDefaultCashFlows cf
    JOIN DefaultedAccounts da ON da.default_id = cf.default_id
    WHERE cf.cash_date > da.default_date
    GROUP BY cf.default_id
),
RealisedLGD AS (
    SELECT
        da.*,
        COALESCE(cf.npv_recoveries, 0)      AS npv_recoveries,
        COALESCE(cf.total_workout_costs, 0) AS total_workout_costs,
        -- Realised LGD
        1.0 - (
            COALESCE(cf.npv_recoveries, 0) - COALESCE(cf.total_workout_costs, 0)
        ) / NULLIF(da.ead_at_default, 0)    AS realised_lgd,
        -- Recovery rate
        (COALESCE(cf.npv_recoveries, 0) - COALESCE(cf.total_workout_costs, 0))
        / NULLIF(da.ead_at_default, 0)      AS recovery_rate,
        -- Time in workout (months)
        DATEDIFF(MONTH, da.default_date, da.resolution_date) AS workout_months
    FROM DefaultedAccounts da
    LEFT JOIN CashFlows cf ON cf.default_id = da.default_id
)
SELECT
    resolution_type,
    COUNT(*)                                AS n_completed_workouts,
    AVG(predicted_lgd)                      AS avg_predicted_lgd,
    AVG(realised_lgd)                       AS avg_realised_lgd,
    AVG(realised_lgd - predicted_lgd)       AS avg_lgd_difference,
    STDEV(realised_lgd)                     AS stdev_realised_lgd,
    -- T-stat for H₀: mean difference = 0
    AVG(realised_lgd - predicted_lgd)
    / NULLIF(STDEV(realised_lgd - predicted_lgd)
             / SQRT(COUNT(*)), 0)           AS t_stat,
    AVG(workout_months)                     AS avg_workout_months,
    PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY realised_lgd) AS lgd_p25,
    PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY realised_lgd) AS lgd_median,
    PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY realised_lgd) AS lgd_p75
FROM RealisedLGD
WHERE realised_lgd BETWEEN -0.10 AND 1.50  -- Exclude extreme outliers for summary
GROUP BY resolution_type
ORDER BY resolution_type;

-- ============================================================
-- SECTION 3: EAD / CCF BACKTESTING
-- ============================================================
WITH CCFSample AS (
    SELECT
        f.facility_id,
        f.obligor_id,
        f.obs_date,                         -- Observation date = rating date
        f.outstanding_balance_at_obs,
        f.limit_at_obs,
        f.undrawn_commitment_at_obs,        -- = limit - outstanding
        f.predicted_ccf,                    -- Model CCF estimate at obs_date
        -- Match to default
        de.default_date,
        de.ead_at_default
    FROM dbo.FacilitySnapshots f
    JOIN dbo.DefaultEvents de
        ON de.account_id = f.facility_id
        AND de.default_date > f.obs_date
        AND de.default_date <= DATEADD(MONTH, 12, f.obs_date)
    WHERE f.undrawn_commitment_at_obs > 0   -- Must have undrawn commitment
      AND f.facility_type = 'REVOLVING'     -- CCF applies to revolving only
),
CCFRealised AS (
    SELECT
        *,
        -- Realised CCF = Additional drawdown / Undrawn at observation
        (ead_at_default - outstanding_balance_at_obs)
        / NULLIF(undrawn_commitment_at_obs, 0) AS realised_ccf,
        -- CCF difference
        (ead_at_default - outstanding_balance_at_obs)
        / NULLIF(undrawn_commitment_at_obs, 0)
        - predicted_ccf                     AS ccf_difference
    FROM CCFSample
)
SELECT
    COUNT(*)                            AS n_defaulted_facilities,
    AVG(predicted_ccf)                  AS avg_predicted_ccf,
    AVG(realised_ccf)                   AS avg_realised_ccf,
    AVG(ccf_difference)                 AS avg_ccf_difference,
    STDEV(ccf_difference)               AS stdev_ccf_difference,
    AVG(ccf_difference)
    / NULLIF(STDEV(ccf_difference)
             / SQRT(COUNT(*)), 0)       AS t_stat,
    -- Distribution of realised CCF
    PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY realised_ccf) AS ccf_p25,
    PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY realised_ccf) AS ccf_median,
    PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY realised_ccf) AS ccf_p75,
    PERCENTILE_CONT(0.90) WITHIN GROUP (ORDER BY realised_ccf) AS ccf_p90,
    -- Flag for directional test
    CASE
        WHEN AVG(realised_ccf) > AVG(predicted_ccf) * 1.15
        THEN 'UNDER-PREDICTING EAD — Insufficient capital for CCF risk'
        WHEN AVG(realised_ccf) < AVG(predicted_ccf) * 0.85
        THEN 'OVER-PREDICTING EAD — Excessive capital for CCF risk'
        ELSE 'WITHIN ACCEPTABLE RANGE'
    END AS calibration_status
FROM CCFRealised;
```

---

## 10. Python Implementation

```python
# ============================================================
# M27: BACKTESTING SUITE — PYTHON IMPLEMENTATION
# ============================================================
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from scipy import stats
from scipy.stats import beta as beta_dist
from dataclasses import dataclass
from typing import Optional
import warnings
warnings.filterwarnings('ignore')

# ============================================================
# PD BACKTESTING
# ============================================================
class PD_Backtester:
    """
    Annual PD backtesting suite implementing:
    - Binomial test per grade (one-sided: testing under-prediction)
    - Chi-square test (portfolio level)
    - Jeffreys confidence intervals
    - Basel traffic light classification
    - Multi-year trend analysis
    """

    def __init__(self, grades: np.ndarray, n_obligors: np.ndarray,
                 n_defaults: np.ndarray, predicted_pd: np.ndarray,
                 year: int = None):
        self.grades = np.asarray(grades)
        self.n = np.asarray(n_obligors, dtype=float)
        self.d = np.asarray(n_defaults, dtype=float)
        self.pd_pred = np.asarray(predicted_pd, dtype=float)
        self.year = year
        self.observed_dr = self.d / self.n

    def jeffreys_ci(self, d: float, n: float,
                    alpha: float = 0.05) -> tuple[float, float]:
        """
        Jeffreys prior Beta credible interval for proportion.
        Recommended for LDP where d/n is very small or d=0.
        """
        lo = beta_dist.ppf(alpha / 2, d + 0.5, n - d + 0.5)
        hi = beta_dist.ppf(1 - alpha / 2, d + 0.5, n - d + 0.5)
        return round(lo, 6), round(hi, 6)

    def binomial_p_value(self, d: float, n: float, p: float,
                          one_sided: bool = True) -> float:
        """
        P-value for observed d defaults given n obligors and predicted p.
        One-sided (upper): P(X >= d) — tests for under-prediction.
        """
        if n <= 0 or p <= 0 or p >= 1:
            return np.nan
        # P(X >= d) = 1 - P(X <= d-1)
        p_upper = 1 - stats.binom.cdf(d - 1, int(n), p)
        if one_sided:
            return p_upper
        return min(2 * min(p_upper, 1 - p_upper), 1.0)

    def traffic_light(self, p_value: float) -> str:
        if np.isnan(p_value):
            return 'N/A'
        if p_value < 0.01:
            return 'RED'
        elif p_value < 0.05:
            return 'YELLOW'
        else:
            return 'GREEN'

    def run(self) -> pd.DataFrame:
        """Run full PD backtest and return results DataFrame."""
        results = []
        for i, grade in enumerate(self.grades):
            n, d, p = self.n[i], self.d[i], self.pd_pred[i]
            obs_dr = d / n if n > 0 else np.nan
            p_val = self.binomial_p_value(d, n, p)
            ci_lo, ci_hi = self.jeffreys_ci(d, n)
            tl = self.traffic_light(p_val)

            results.append({
                'Grade': grade,
                'N_Obligors': int(n),
                'N_Defaults': int(d),
                'Observed_DR': round(obs_dr, 5) if not np.isnan(obs_dr) else np.nan,
                'Predicted_PD': round(p, 5),
                'Expected_Defaults': round(n * p, 2),
                'P_Value_1Tail': round(p_val, 4) if not np.isnan(p_val) else np.nan,
                'Jeffreys_95CI_Lo': ci_lo,
                'Jeffreys_95CI_Hi': ci_hi,
                'PD_in_CI': 'YES' if ci_lo <= p <= ci_hi else 'NO',
                'Traffic_Light': tl,
                'Direction': 'Under-pred' if obs_dr > p else 'Over-pred'
            })

        return pd.DataFrame(results)

    def chi_square_portfolio(self) -> tuple[float, float, int]:
        """Chi-square test at portfolio level."""
        expected = self.n * self.pd_pred
        mask = expected >= 5  # Only grades with sufficient expected defaults
        if mask.sum() < 2:
            return np.nan, np.nan, 0
        chi2 = np.sum((self.d[mask] - expected[mask])**2 / expected[mask])
        df = mask.sum() - 1
        p_value = 1 - stats.chi2.cdf(chi2, df)
        return chi2, p_value, df

    def plot_traffic_light(self, results_df: pd.DataFrame) -> None:
        """Visualise backtesting results with traffic light colours."""
        colour_map = {'GREEN': '#2ecc71', 'YELLOW': '#f39c12',
                      'RED': '#e74c3c', 'N/A': '#95a5a6'}

        fig, axes = plt.subplots(1, 2, figsize=(14, 5))

        # Plot 1: Observed DR vs Predicted PD by grade
        ax = axes[0]
        colours = [colour_map[tl] for tl in results_df['Traffic_Light']]
        x = np.arange(len(results_df))
        bars = ax.bar(x, results_df['Observed_DR'] * 100, color=colours,
                      alpha=0.8, label='Observed DR')
        ax.plot(x, results_df['Predicted_PD'] * 100, 'ko--',
                linewidth=2, markersize=6, label='Predicted PD')

        # Jeffreys CI
        ci_lo = results_df['Jeffreys_95CI_Lo'] * 100
        ci_hi = results_df['Jeffreys_95CI_Hi'] * 100
        ax.fill_between(x, ci_lo, ci_hi, alpha=0.15, color='blue',
                         label='95% Jeffreys CI')

        ax.set_xticks(x)
        ax.set_xticklabels([f'G{g}' for g in results_df['Grade']])
        ax.set_xlabel('Risk Grade')
        ax.set_ylabel('Default Rate (%)')
        ax.set_title(f'PD Backtest — Grade-Level Results {self.year or ""}')
        ax.legend(loc='upper left')
        ax.grid(axis='y', alpha=0.3)

        # Legend patches
        patches = [mpatches.Patch(color=c, label=l)
                   for l, c in colour_map.items() if l != 'N/A']
        ax.legend(handles=patches + ax.get_legend_handles_labels()[0][:-1],
                  loc='upper right', fontsize=8)

        # Plot 2: Traffic light summary
        ax2 = axes[1]
        counts = results_df['Traffic_Light'].value_counts()
        for label in ['GREEN', 'YELLOW', 'RED']:
            if label not in counts.index:
                counts[label] = 0

        wedges, texts, autotexts = ax2.pie(
            [counts.get('GREEN', 0), counts.get('YELLOW', 0), counts.get('RED', 0)],
            labels=['GREEN', 'YELLOW', 'RED'],
            colors=['#2ecc71', '#f39c12', '#e74c3c'],
            autopct='%1.0f%%', startangle=90
        )
        ax2.set_title('Traffic Light Distribution')

        plt.tight_layout()
        plt.savefig(f'pd_backtest_{self.year or "results"}.png', dpi=150,
                    bbox_inches='tight')
        plt.show()


# ============================================================
# LGD BACKTESTING
# ============================================================
class LGD_Backtester:
    """
    LGD backtesting on completed workout observations.
    Tests whether predicted LGD matches realised LGD.
    """

    def __init__(self, predicted_lgd: np.ndarray,
                 realised_lgd: np.ndarray,
                 resolution_types: Optional[np.ndarray] = None):
        self.pred = np.asarray(predicted_lgd, dtype=float)
        self.real = np.asarray(realised_lgd, dtype=float)
        self.res_types = resolution_types
        self.diff = self.real - self.pred
        assert len(self.pred) == len(self.real), "Arrays must be same length"

    def summary_stats(self) -> dict:
        """Compute summary statistics for LGD comparison."""
        return {
            'N_Workouts': len(self.pred),
            'Mean_Predicted_LGD': round(np.mean(self.pred), 4),
            'Mean_Realised_LGD': round(np.mean(self.real), 4),
            'Mean_Difference': round(np.mean(self.diff), 4),
            'Std_Realised_LGD': round(np.std(self.real), 4),
            'Median_Realised_LGD': round(np.median(self.real), 4),
            'P25_Realised': round(np.percentile(self.real, 25), 4),
            'P75_Realised': round(np.percentile(self.real, 75), 4),
            'Pct_Realised_GT_Predicted': round(np.mean(self.real > self.pred), 4),
        }

    def t_test(self) -> tuple[float, float]:
        """
        Paired t-test: H₀: mean(realised - predicted) = 0
        Tests for systematic LGD mis-estimation.
        """
        t_stat, p_val = stats.ttest_1samp(self.diff, 0)
        return round(t_stat, 4), round(p_val, 4)

    def mann_whitney_test(self) -> tuple[float, float]:
        """
        Mann-Whitney U test (non-parametric alternative).
        More robust for bimodal LGD distributions.
        """
        u_stat, p_val = stats.mannwhitneyu(self.real, self.pred,
                                            alternative='two-sided')
        return round(u_stat, 2), round(p_val, 4)

    def bootstrap_ci(self, n_boot: int = 5000,
                     alpha: float = 0.05) -> tuple[float, float]:
        """Bootstrap confidence interval for mean(realised LGD - predicted LGD)."""
        boot_means = np.array([
            np.mean(np.random.choice(self.diff, size=len(self.diff), replace=True))
            for _ in range(n_boot)
        ])
        lo = np.percentile(boot_means, 100 * alpha / 2)
        hi = np.percentile(boot_means, 100 * (1 - alpha / 2))
        return round(lo, 4), round(hi, 4)

    def run(self) -> dict:
        """Run full LGD backtest."""
        stats_summary = self.summary_stats()
        t_stat, t_pval = self.t_test()
        mw_stat, mw_pval = self.mann_whitney_test()
        ci_lo, ci_hi = self.bootstrap_ci()

        print("\nLGD BACKTESTING RESULTS")
        print(f"{'='*50}")
        for k, v in stats_summary.items():
            print(f"  {k}: {v}")
        print(f"\n  T-test: t={t_stat}, p={t_pval} "
              f"{'— FAIL (systematic bias)' if t_pval < 0.05 else '— PASS'}")
        print(f"  Mann-Whitney: U={mw_stat}, p={mw_pval}")
        print(f"  Bootstrap 95% CI for mean diff: [{ci_lo}, {ci_hi}]")
        print(f"  {'CI EXCLUDES ZERO — evidence of miscalibration' if ci_lo > 0 or ci_hi < 0 else 'CI INCLUDES ZERO — calibration acceptable'}")

        direction = "UNDER-PREDICTING" if np.mean(self.diff) > 0 else "OVER-PREDICTING"
        print(f"\n  Direction: {direction}")
        if direction == "UNDER-PREDICTING" and t_pval < 0.05:
            print("  ACTION REQUIRED: LGD model understates expected losses — "
                  "provisions may be insufficient")

        return {
            'summary': stats_summary, 't_stat': t_stat, 't_pval': t_pval,
            'mw_stat': mw_stat, 'mw_pval': mw_pval,
            'bootstrap_ci': (ci_lo, ci_hi)
        }


# ============================================================
# LOW DEFAULT PORTFOLIO (LDP) ANALYSIS
# ============================================================
class LDP_Analyzer:
    """
    Analysis tools for Low Default Portfolios.
    When few defaults are observed, standard tests have low power.
    """

    @staticmethod
    def jeffreys_interval_zero_defaults(n: int, alpha: float = 0.05) -> tuple[float, float]:
        """
        Jeffreys interval when d=0. Lower bound = 0; upper bound is non-trivial.
        Critical for LDP where zero defaults are common.
        """
        lo = 0.0  # With d=0, lower bound is effectively 0
        hi = beta_dist.ppf(1 - alpha / 2, 0.5, n + 0.5)
        return lo, round(hi, 6)

    @staticmethod
    def minimum_observations_for_power(pd: float, target_power: float = 0.80,
                                        alpha: float = 0.05,
                                        effect_size_ratio: float = 2.0) -> int:
        """
        Compute minimum number of obligors needed to detect
        a PD that is `effect_size_ratio` times the predicted PD
        with `target_power` power.

        Useful for telling a bank how much data they need for LDP backtesting to be meaningful.
        """
        pd_alt = pd * effect_size_ratio  # Alternative hypothesis PD
        # Normal approximation
        z_alpha = stats.norm.ppf(1 - alpha)
        z_beta = stats.norm.ppf(target_power)
        n = ((z_alpha * np.sqrt(pd * (1 - pd)) +
               z_beta * np.sqrt(pd_alt * (1 - pd_alt)))**2
             / (pd_alt - pd)**2)
        return int(np.ceil(n))

    @staticmethod
    def pooled_ldp_test(years_data: list[dict]) -> pd.DataFrame:
        """
        Pool multiple years of data for LDP PD backtesting.

        Parameters
        ----------
        years_data: list of dicts with keys: year, n, d, predicted_pd
        """
        results = []
        cumulative_n = 0
        cumulative_d = 0

        for entry in years_data:
            cumulative_n += entry['n']
            cumulative_d += entry['d']

            pooled_pd = np.mean([e['predicted_pd'] for e in years_data
                                  if e['year'] <= entry['year']])
            obs_dr = cumulative_d / cumulative_n if cumulative_n > 0 else 0

            p_val = 1 - stats.binom.cdf(cumulative_d - 1, cumulative_n, pooled_pd)
            ci_lo, ci_hi = (
                beta_dist.ppf(0.025, cumulative_d + 0.5, cumulative_n - cumulative_d + 0.5),
                beta_dist.ppf(0.975, cumulative_d + 0.5, cumulative_n - cumulative_d + 0.5)
            )

            results.append({
                'Through_Year': entry['year'],
                'Cumulative_N': cumulative_n,
                'Cumulative_D': cumulative_d,
                'Pooled_PD': round(pooled_pd, 5),
                'Observed_DR': round(obs_dr, 5),
                'P_Value_1T': round(p_val, 4),
                'CI_Lo': round(ci_lo, 5),
                'CI_Hi': round(ci_hi, 5),
                'Traffic_Light': 'RED' if p_val < 0.01 else
                                 'YELLOW' if p_val < 0.05 else 'GREEN'
            })

        return pd.DataFrame(results)


# ============================================================
# MAIN BACKTESTING RUNNER
# ============================================================
def run_annual_backtest(backtest_data: pd.DataFrame, year: int) -> dict:
    """
    Run complete annual backtesting suite for PD, LGD, and EAD.

    Parameters
    ----------
    backtest_data: DataFrame with columns:
        grade, n_obligors, n_defaults, predicted_pd,
        realised_lgd, predicted_lgd, realised_ccf, predicted_ccf
    """
    results = {}

    print(f"\n{'='*60}")
    print(f"ANNUAL BACKTESTING REPORT — {year}")
    print(f"{'='*60}")

    # PD Backtest
    grade_data = backtest_data.groupby('grade').agg(
        n_obligors=('obligor_id', 'count'),
        n_defaults=('default_flag', 'sum'),
        predicted_pd=('predicted_pd', 'mean')
    ).reset_index()

    pd_tester = PD_Backtester(
        grades=grade_data['grade'].values,
        n_obligors=grade_data['n_obligors'].values,
        n_defaults=grade_data['n_defaults'].values,
        predicted_pd=grade_data['predicted_pd'].values,
        year=year
    )
    pd_results = pd_tester.run()
    chi2, chi_pval, df = pd_tester.chi_square_portfolio()
    results['pd'] = pd_results

    print(f"\nPD BACKTEST RESULTS:")
    print(pd_results.to_string(index=False))
    print(f"\nPortfolio Chi-Square: χ²({df})={chi2:.2f}, p={chi_pval:.4f}")

    red_count = (pd_results['Traffic_Light'] == 'RED').sum()
    yellow_count = (pd_results['Traffic_Light'] == 'YELLOW').sum()
    print(f"Traffic Light: {red_count} RED, {yellow_count} YELLOW, "
          f"{len(pd_results)-red_count-yellow_count} GREEN")

    # LGD Backtest (if workout data available)
    lgd_data = backtest_data[backtest_data['workout_complete'] == 1].dropna(
        subset=['realised_lgd', 'predicted_lgd']
    )
    if len(lgd_data) >= 30:
        lgd_tester = LGD_Backtester(
            lgd_data['predicted_lgd'].values,
            lgd_data['realised_lgd'].values
        )
        results['lgd'] = lgd_tester.run()
    else:
        print(f"\nLGD Backtest: INSUFFICIENT DATA ({len(lgd_data)} completed workouts)")
        print("  Minimum 30 required; recommend pooling with prior years")

    pd_tester.plot_traffic_light(pd_results)

    return results
```

---

## 11. Interview Questions

**Junior/Mid Level**

1. **What is the difference between backtesting and validation?**
   Backtesting is a specific type of retrospective performance test: comparing the model's past predictions to actual outcomes. Validation is broader — it includes conceptual soundness, data integrity, and performance testing, of which backtesting is a component. Validation can be done before a model goes live (pre-deployment) and does not require historical outcomes. Backtesting requires actual outcomes, so it can only be done after a sufficient performance window has elapsed.

2. **What is the Jeffreys interval and why is it preferred over the Wald interval for low default portfolios?**
   The Jeffreys interval is a Bayesian credible interval for a proportion using the non-informative Jeffreys prior (Beta(0.5, 0.5)). The Wald interval uses `p ± 1.96√(p(1-p)/n)`, which gives a lower bound of 0% when zero defaults are observed — providing no useful information about the true PD. The Jeffreys interval provides a non-degenerate upper bound even when d=0, helping regulators assess whether a PD of, say, 0.1% is plausible given n=100 and zero observed defaults.

3. **A bank's Grade 7 PD model predicts 2% PD. In the backtesting window, there are 500 obligors in Grade 7 and 18 observed defaults. Is the model calibrated?**
   Expected defaults = 500 × 0.02 = 10. Observed = 18. Z-stat ≈ (18/500 − 0.02) / √(0.02 × 0.98 / 500) = (0.036 − 0.020) / 0.00626 ≈ 2.56. One-sided p-value ≈ 0.005. This falls in the RED zone (p < 0.01). The model is significantly under-predicting defaults for Grade 7.

**Senior Level**

4. **How do you backtest LGD when you have only 15 completed workouts?**
   With 15 workouts, formal statistical tests have very low power. The approach: (1) compute realised LGD statistics (mean, median, range) with wide bootstrap confidence intervals; (2) compare visually and directionally to predicted LGD; (3) benchmark to external workout data (Moody's URD) rather than relying on internal statistical tests; (4) pool with prior years' workout data to increase sample size; (5) document the limitation explicitly and apply a margin of conservatism to LGD estimates. Do not report a passing t-test as confirmation of calibration when n=15 — statistical non-significance with n=15 is uninformative.

5. **Basel requires banks to investigate the cause of red traffic light outcomes. What are the three main root causes and how do you investigate each?**
   (a) Genuine credit quality deterioration: The portfolio has experienced a cyclical or structural worsening. Investigate by checking whether macro indicators (GDP, unemployment, sector performance) deteriorated; compare to industry default rates. (b) Model calibration error: The model was mis-calibrated even at inception. Check whether the predicted PD was consistently below observed DR for multiple years. (c) Composition shift: The distribution of obligors within the grade has changed (riskier obligors have been assigned to a previously safe grade). Run CSI on the input variables for that grade.

---

## 12. Common Mistakes

1. **Reconstructing Ratings Retroactively**: Only contemporaneous (point-in-time) rating records can be used for backtesting. If a bank upgrades an obligor's rating after default (survivorship), retroactively reconstructed ratings will show artificial good performance.

2. **Including Open Workouts in LGD Backtesting**: If a default is not yet resolved, realised LGD cannot be computed. Including open workouts with assumed final LGD values introduces estimation error; only completed workouts should be included.

3. **Ignoring Cure Rate Treatment**: If the LGD model was built excluding cures (treating only non-cured defaults) but backtesting includes cures (which contribute 0% LGD), the observed average LGD will be artificially lower than the model's target. The treatment of cures must be consistent between model development and backtesting.

4. **Using Two-Sided Tests When the Risk is One-Directional**: The prudential concern is under-prediction (model too optimistic). A two-sided test at 5% is less powerful for detecting under-prediction than a one-sided test. Regulators expect one-sided testing for PD calibration.

5. **Failing to Control for Economic Cycle**: If the backtesting window covers only a benign credit period, the TTC model will appear over-conservative (PD > observed DR). This is expected and appropriate. Presenting this as "the model over-estimates risk" confuses TTC calibration with a calibration failure.

---

## 13. Case Studies

**Case Study 1: The Invisible Default**

A UK bank discovered during a PRA SREP that its backtesting was missing a category of defaults. The bank's default definition in its rating system required both the 90-DPD trigger AND credit officer judgment (UTP). However, its backtesting system only captured 90-DPD triggers — UTP-only defaults were not flagged. When the PRA required the bank to include all CRR Article 178-compliant defaults, the observed default rate for Grade 5 increased from 1.8% to 3.1%. The predicted PD was 2.0% — a near-pass became a RED. The bank had to implement a Pillar 2A capital add-on while correcting the default identification process.

**Case Study 2: The LGD Surprise**

A European bank had predicted an average LGD of 35% for its unsecured corporate portfolio. The 2020 stress period produced a realised LGD of 62% on accounts that defaulted in 2019–2020 (completed workouts available by 2023). The bank's backtesting showed a t-stat of 4.2 (p < 0.001) — highly significant under-prediction. Investigation revealed that the LGD model had been calibrated on 2010–2015 data, during which recoveries were artificially boosted by high corporate asset prices. The model had no downturn adjustment. The bank was required to revise its LGD estimates upward, increasing IFRS 9 ECL by £340m.

---

## 14. Iterative Reinforcement

**Week 1**: Hand-calculate the binomial test for a grade with n=200, d=8, p=0.02. What is the p-value? What is the traffic light? Compute the Jeffreys 95% CI.

**Week 2**: Build the multi-year pooled LGD backtesting table. Identify in which year the LGD backtest would have first flagged a problem.

**Week 3**: Write a 1-page backtesting executive summary for an MRC. Cover: methodology, results by grade (traffic lights), LGD result, key findings, and recommended actions.

**Exam Questions**:
1. A portfolio has PD = 1.0% per grade, n = 100 per grade, 10 grades, and no defaults in the current year. What do you conclude about calibration? What does the Jeffreys interval tell you?
2. Explain why backtesting a TTC PD model in a benign credit period will almost always show predicted PD > observed DR, and why this does not constitute a calibration failure.
3. You are backtesting CCF for revolving credit facilities. Average predicted CCF = 40%; average realised CCF = 67%. The t-test gives p = 0.003. What is the business impact and what action do you recommend?

---

## 15. Source Material

- Basel BCBS 128 (2006): Annex 10a — *Backtesting and validation of internal rating systems*
- CRR Article 185: *Validation of internal estimates*
- EBA/GL/2017/07 (2017): Sections 5.5, 7.5, 8.5 — Backtesting of PD, LGD, EAD
- Brown, I. (2012). "The Jeffreys Prior for Proportion and its Applications to Credit Risk." *Journal of Risk Model Validation*
- Tasche, D. (2013). "Bayesian estimation of probabilities of default for low default portfolios." *Journal of Risk Management in Financial Institutions*
- Schuermann, T. (2004). "What Do We Know About Loss Given Default?" Wharton Financial Institutions Center Working Paper
- Jankowitsch, R., Nagler, F., & Subrahmanyam, M.G. (2014). "The determinants of recovery rates in the US corporate bond market." *Journal of Financial Economics*
- PRA SS1/23 (2023): Appendix — Expected practices for ongoing model monitoring
