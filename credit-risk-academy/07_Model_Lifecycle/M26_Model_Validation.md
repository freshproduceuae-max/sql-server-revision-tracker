# M26 — Model Validation

> Independent review of a credit risk model before deployment and on an ongoing basis. Covers the three pillars of model validation, quantitative test batteries, the validation report structure, findings classification, and the regulatory examination standard.

---

## 1. Business Purpose

Model validation exists because of a fundamental conflict of interest: the team that builds a model has an incentive to make it look good. The 2008 financial crisis demonstrated catastrophically that internally-validated models (particularly for structured credit products) were systematically optimistic. SR 11-7 responded by mandating that model validation be performed by a group that is independent from model development.

**What Validation Is Trying to Answer**
1. Is the conceptual approach sound — does the theory behind the model make sense?
2. Is the data used to build the model clean, appropriate, and representative?
3. Does the model perform as claimed — does it actually predict what it says it predicts?
4. Is the model being used as intended — is the scope of actual use consistent with the approval?

**Three Pillars of Model Validation (SR 11-7)**
- Pillar 1: Conceptual Soundness — theory, assumptions, methodology choice
- Pillar 2: Data Integrity — source data quality, reference dataset construction, variable definitions
- Pillar 3: Performance Testing — discriminatory power, calibration, stability

**Regulatory Capital Consequences**
For IRB models, the regulator (PRA/ECB) effectively validates the bank's validation function. If the regulator finds that validation was inadequate, consequences include:
- Scalar add-ons to model outputs (e.g., all PDs floored at a higher level)
- Withdrawal of IRB permission, reverting to Standardised Approach (higher RWA)
- Supervisory capital add-ons (Pillar 2A in the UK; Article 104 CRR in Europe)

**IFRS 9 Validation Importance**
Audit committees and external auditors rely on model validation reports when signing off ECL provisions. A poorly validated model that produces ECL below the auditor's comfort range can result in:
- Audit qualification
- Required restatement
- Personal liability for CFO/CRO

---

## 2. Accounting Concepts

**Provision Adequacy and Model Risk**
Under IAS 36 and IFRS 9, management must exercise judgment in ECL estimates. Auditors assess whether management's models are "reasonable" — meaning they must be independently validated. Inadequate validation is itself an accounting risk.

**Management Overlay and Model Uncertainty**
When validation finds that a model has material limitations, the bank must apply a management overlay (post-model adjustment) to ensure provisions are not understated. This overlay must be:
- Quantified based on validation findings
- Documented and approved by the credit risk committee
- Disclosed in the financial statement notes

**Expected Credit Loss Sensitivity**
IFRS 7 requires disclosure of ECL sensitivity to reasonably possible changes in key assumptions. The model validation team quantifies this sensitivity, which then feeds directly into financial disclosures.

**Effective Date and Going-Concern Adjustments**
Model performance is always assessed at the reporting date. A model that was validated in 2019 may be poorly calibrated in 2024 due to structural economic changes (COVID, rate environment). Ongoing validation ensures the model remains fit for purpose at each reporting date.

---

## 3. Financial Concepts

**Discriminatory Power vs. Calibration — The Critical Distinction**

These are two entirely different model attributes, and analysts often confuse them:

- **Discriminatory Power** (rank-ordering): Does the model assign higher risk scores/PDs to obligors that actually default? Measured by AUC, Gini, KS. A model can have excellent discriminatory power and terrible calibration.

- **Calibration** (accuracy of the level): Does the model's predicted PD match the observed default rate? A model that assigns PD = 2% to a grade where the observed DR is 0.5% has good discrimination but poor calibration. It over-estimates risk.

**Capital and Provision Sensitivity to Each**
- Poor discrimination → wrong capital allocation across obligors (risks are mispriced)
- Poor calibration → systematic over- or under-estimation of total capital / ECL
- Both are material: validation must test both

**Model Risk Quantification**
Model risk = the risk that a model is wrong and produces incorrect outputs. Validation quantifies model risk as:
- Model Error: Bias in predictions (calibration error)
- Model Uncertainty: Variance in predictions (stability)
- Model Scope Error: Using the model outside its intended population

Banks are required under SS1/23 and SR 11-7 to hold explicit capital against model risk (Pillar 2 capital).

---

## 4. Statistical Concepts

**AUC — Area Under the ROC Curve**

The ROC curve plots True Positive Rate vs. False Positive Rate at all possible decision thresholds.

```
AUC = P(score(default) > score(non-default))
    = probability that a randomly chosen defaulter has a higher risk score
      than a randomly chosen non-defaulter
```

- AUC = 0.50: No discriminatory power (random model)
- AUC = 1.00: Perfect discrimination
- Benchmark: AUC > 0.70 for corporate models; > 0.75 for retail

**Gini Coefficient (Accuracy Ratio)**
`Gini = 2 × AUC − 1`

Identical information to AUC, just rescaled to [−1, 1].

**Kolmogorov-Smirnov (KS) Statistic**
`KS = max|F_defaults(s) − F_non_defaults(s)|`

The maximum difference between the cumulative distribution of scores for defaults and non-defaults. KS measures the maximum separation point but ignores what happens elsewhere in the score distribution. AUC is preferred as a holistic measure.

**Binomial Test for PD Calibration**

For a grade with n obligors, predicted PD = p, and observed defaults d:

```
Under H₀: d ~ Binomial(n, p)
Test statistic: z = (d/n − p) / √(p(1−p)/n)
Reject H₀ (two-tailed, α=5%) if |z| > 1.96
```

This tests whether the observed default rate in a grade is statistically consistent with the predicted PD.

**Chi-Square Test for Overall Calibration**

Across all K grades:
```
χ² = Σₖ (dₖ − nₖ × PDₖ)² / (nₖ × PDₖ × (1 − PDₖ))
degrees of freedom = K − 1
```

**Normal Test for Calibration (Basel Annex 10a)**

For a portfolio with n obligors, p = average predicted PD, d = observed defaults:
```
z = (d/n − p) / √(p(1−p)/n + σ²)
```

Where σ² is the variance from systematic default correlation. Basel prescribes this formula explicitly. The correlation adjustment prevents the test from being over-powered (rejecting calibration that is actually fine due to credit cycle effects).

**PSI — Population Stability Index**

Measures whether the distribution of model inputs (or scores) has shifted between development and monitoring period.

```
PSI = Σᵢ (Actual%ᵢ − Expected%ᵢ) × ln(Actual%ᵢ / Expected%ᵢ)
```

Where Expected = development sample distribution; Actual = current monitoring period.

PSI Interpretation:
- PSI < 0.10: No significant shift — stable population
- PSI 0.10 – 0.25: Moderate shift — investigate
- PSI > 0.25: Significant population shift — model may need recalibration or rebuild

**CSI — Characteristic Stability Index**

Same formula as PSI but applied to individual input variables. CSI > 0.25 on a key predictor warrants investigation of whether that variable has changed in definition, availability, or the population being scored.

---

## 5. Regulatory Framework

**SR 11-7 Validation Requirements**
- Validation must be performed by qualified staff with appropriate skills and tools
- Validation must be independent from development (separate reporting line)
- Ongoing monitoring is required — not just pre-deployment validation
- Effective challenge must be documented
- Findings must be tracked and resolved

**EBA Guidelines on Internal Model Validation (EBA/GL/2017/07, Chapter 9)**
- Validation scope: PD estimation, LGD estimation, EAD/CCF estimation
- Data integrity checks required on reference dataset
- Out-of-sample and out-of-time testing required
- Calibration testing: binomial test, chi-square test, normal test
- Stability testing: PSI required annually
- Benchmark comparison required (internal or external challenger)

**ECB TRIM — Targeted Review of Internal Models (2017–2019)**
TRIM was the ECB's systematic review of IRB models across European banks. Key validation-related findings:
- Many banks had weak documentation of validation methodology
- Calibration testing was often too lenient (wrong significance levels)
- PSI thresholds were inconsistently applied
- Validation function independence was sometimes compromised (validators reporting to same CRO as developers)

**PRA SS1/23 — Validation Independence**
The PRA explicitly requires that the validation function:
- Has a separate budget and headcount from model development
- Reports independently (not through the same CRO line as development)
- Has the authority to escalate findings to the Board Audit/Risk Committee
- Is not evaluated on metrics that incentivise approving models

**Basel Annex 10a — Backtesting and Validation Standards**
Prescribed statistical tests for PD calibration, including the traffic light approach. Banks using IRB must demonstrate ongoing validation through annual reports submitted to their regulator.

---

## 6. Data Required

**For Discriminatory Power Testing**
- Model scores or log-odds at observation date
- Default flag for the performance window following each observation date
- Minimum sample: 200+ defaults in the test sample for reliable AUC estimation
- For out-of-time testing: scores and outcomes from periods not used in development

**For Calibration Testing**
- Predicted PD per obligor (or per risk grade)
- Observed default indicator over the 12-month horizon
- Risk grade assignment at observation date
- Long-run average default rate by grade (the "calibration target")
- Number of years of data by grade (for confidence interval construction)

**For PSI Calculation**
- Score distribution from the development sample (the "expected" benchmark)
- Score distribution from the current monitoring period (the "actual")
- Both distributions should have the same number of buckets (typically 10 decile bands)

**For Conceptual Soundness Review**
- Model Technical Document (MTD)
- Variable construction specifications
- Variable selection analysis with IV values and sign rationale
- Model estimation output (coefficients, standard errors, p-values)
- Data lineage documentation (from source system to model input)

**Validation Data Independence Requirements**
A critical but often violated requirement: the data used for validation performance testing must not overlap with the data used for model development. Validators must obtain data directly from source systems, not from the developer's model dataset.

---

## 7. How Analysts Actually Work

**The Validation Workflow**

A model validation project typically runs 6–12 weeks for a Tier 1 model (regulatory capital / IFRS 9 ECL). The validation team works through three phases:

**Phase 1: Document Review and Conceptual Soundness (Weeks 1–3)**

Validators read the MTD and build a "concept map" — a structured assessment of every methodological claim. For each claim:
- What is the theoretical basis?
- Are the assumptions stated and plausible?
- Are there alternative approaches? If the developer chose this approach, is the rationale documented?
- Are there known limitations?

Common conceptual findings:
- Missing discussion of TTC vs. PIT PD approach
- Assumption of independence across obligors in calibration testing (ignores default correlation)
- Variable selection relying entirely on statistical metrics without economic rationale
- Observation date selection biased toward benign credit periods

**Phase 2: Data Integrity Reproduction (Weeks 2–5)**

Validators independently reproduce the reference dataset from source systems. They are looking for:
- Can they replicate the developer's default flag? If not, the definition is ambiguous
- Do the financial ratios they compute from raw data match the developer's figures?
- Are the observation date logic and performance window correctly implemented?
- Is there evidence of data leakage (are any variables post-observation-date information)?

This phase often reveals significant discrepancies — a validator computing a different default count by 5% from the developer using the same source data indicates a documentation failure.

**Phase 3: Independent Performance Testing (Weeks 4–10)**

Validators run their own test battery on independently constructed test data:
1. Discriminatory power: AUC, Gini, KS
2. Calibration: binomial test per grade, chi-square overall
3. Stability: PSI on input variables, CSI on key characteristics
4. Benchmarking: compare to alternative model or external reference (covered in M28)

The validator documents all findings and assigns severity ratings.

**Phase 4: Validation Report and MRC (Weeks 10–12)**

The validation report is submitted to the Model Risk Committee. The validator must be prepared to defend every finding under "effective challenge" — developers will contest findings, provide alternative analysis, and argue that limitations are immaterial. Validators who cannot defend their findings in MRC are ineffective.

---

## 8. Excel Implementation

**AUC / Gini Calculation (Manual)**

```
Sheet: ROC_Calculation
Assume model scores sorted descending (highest risk score first)

Column A: Obligor_ID
Column B: Score (descending sort)
Column C: Default_Flag (1/0)
Column D: Cumulative_Defaults = CUMSUM(C) / TOTAL_DEFAULTS
Column E: Cumulative_Population = ROW()/TOTAL_ROWS

AUC = SUMPRODUCT calculation across the step function:
Each step: width = 1/n_total, height = avg TPR at that step
AUC ≈ (1/n_total) × SUMPRODUCT(D[2:n], (E[2:n]-E[1:n-1]))

Gini = 2 × AUC - 1

Chart: XY scatter of Column E vs Column D → ROC curve
Add diagonal reference line (random model)
```

**Binomial Test Per Grade**

```
Sheet: Calibration_Test
Column A: Grade (1-10)
Column B: N_Obligors
Column C: N_Defaults (observed)
Column D: PD_Predicted (%)
Column E: Expected_Defaults = B × D/100
Column F: Observed_DR = C/B
Column G: Std_Error = SQRT(D/100 × (1-D/100) / B)
Column H: Z_Stat = (F - D/100) / G
Column I: P_Value = 2 × (1 - NORM.DIST(ABS(H), 0, 1, TRUE))
Column J: Result = IF(I < 0.05, "FAIL (calibration rejected)", "PASS")
Column K: Traffic_Light = IF(I < 0.01, "RED", IF(I < 0.05, "YELLOW", "GREEN"))

Conditional formatting:
RED fill where K = "RED"
YELLOW fill where K = "YELLOW"
GREEN fill where K = "GREEN"
```

**PSI Calculation**

```
Sheet: PSI_Stability
Row header: 10 score decile bands (Band 1 = lowest risk, Band 10 = highest)

Column B: Expected_% (from development sample distribution)
Column C: Actual_% (from current monitoring period)
Column D: Ratio = C/B
Column E: Ln_Ratio = LN(D)
Column F: PSI_Component = (C-B) × E
Cell F12: Total PSI = SUM(F2:F11)
Cell F13: Status = IF(F12<0.10, "Stable", IF(F12<0.25, "Monitor", "SIGNIFICANT SHIFT"))

Bar chart: Side-by-side bars of Expected% vs Actual% per band
Highlight bands with largest contribution to PSI
```

---

## 9. SQL Implementation

```sql
-- ============================================================
-- M26: MODEL VALIDATION TEST SUITE
-- ============================================================

-- Step 1: Reconstruct test dataset INDEPENDENTLY
-- Validators should not use the developer's dataset directly
CREATE TABLE #ValidationDataset (
    validation_id       INT IDENTITY(1,1),
    obligor_id          VARCHAR(20),
    obs_date            DATE,
    model_score         FLOAT,       -- Score produced by the model
    predicted_pd        FLOAT,       -- Model PD output (decimal, not %)
    risk_grade          INT,         -- Grade assigned by model (1=lowest risk)
    default_flag        BIT,         -- Validator's independently verified default flag
    default_date        DATE
);

-- Step 2: Discriminatory Power Test
-- AUC approximation using concordant/discordant pair counting
WITH Pairs AS (
    SELECT
        a.validation_id AS id_a,
        b.validation_id AS id_b,
        a.model_score   AS score_a,
        b.model_score   AS score_b,
        a.default_flag  AS flag_a,
        b.default_flag  AS flag_b
    FROM #ValidationDataset a
    CROSS JOIN #ValidationDataset b
    WHERE a.default_flag = 1   -- a is a defaulter
      AND b.default_flag = 0   -- b is a non-defaulter
      AND a.validation_id <> b.validation_id
),
ConcordanceStats AS (
    SELECT
        COUNT(*)                                        AS total_pairs,
        SUM(CASE WHEN score_a > score_b THEN 1 ELSE 0 END) AS concordant,
        SUM(CASE WHEN score_a = score_b THEN 1 ELSE 0 END) AS tied,
        SUM(CASE WHEN score_a < score_b THEN 1 ELSE 0 END) AS discordant
    FROM Pairs
)
SELECT
    total_pairs,
    concordant,
    discordant,
    tied,
    CAST(concordant AS FLOAT) / total_pairs             AS concordance_rate,
    CAST(concordant AS FLOAT) / total_pairs * 2 - 1    AS gini_coefficient,
    CAST(concordant AS FLOAT) / total_pairs             AS auc_approx
FROM ConcordanceStats;

-- Note: For large datasets, use sampling or the trapezoidal approximation below

-- AUC via trapezoidal approximation (faster for large datasets)
WITH Scored AS (
    SELECT
        model_score,
        default_flag,
        ROW_NUMBER() OVER (ORDER BY model_score DESC) AS rank_desc
    FROM #ValidationDataset
),
Cumulative AS (
    SELECT
        model_score,
        default_flag,
        rank_desc,
        SUM(default_flag) OVER (ORDER BY rank_desc)         AS cum_defaults,
        SUM(1 - default_flag) OVER (ORDER BY rank_desc)     AS cum_non_defaults,
        SUM(default_flag) OVER ()                           AS total_defaults,
        SUM(1 - default_flag) OVER ()                       AS total_non_defaults
    FROM Scored
),
ROCPoints AS (
    SELECT
        CAST(cum_defaults AS FLOAT) / total_defaults         AS tpr,
        CAST(cum_non_defaults AS FLOAT) / total_non_defaults AS fpr,
        LAG(CAST(cum_defaults AS FLOAT) / total_defaults)
            OVER (ORDER BY rank_desc) AS prev_tpr,
        LAG(CAST(cum_non_defaults AS FLOAT) / total_non_defaults)
            OVER (ORDER BY rank_desc) AS prev_fpr
    FROM Cumulative
)
SELECT
    SUM((tpr + prev_tpr) / 2.0 * (fpr - prev_fpr))    AS auc_trapezoidal,
    2 * SUM((tpr + prev_tpr) / 2.0 * (fpr - prev_fpr)) - 1 AS gini
FROM ROCPoints
WHERE prev_tpr IS NOT NULL AND prev_fpr IS NOT NULL;

-- Step 3: KS Statistic
WITH Distributions AS (
    SELECT
        model_score,
        default_flag,
        NTILE(100) OVER (ORDER BY model_score) AS percentile
    FROM #ValidationDataset
),
ByPercentile AS (
    SELECT
        percentile,
        SUM(default_flag) * 1.0 / SUM(SUM(default_flag)) OVER ()           AS pct_defaults,
        SUM(1 - default_flag) * 1.0 / SUM(SUM(1 - default_flag)) OVER ()   AS pct_non_defaults
    FROM Distributions
    GROUP BY percentile
),
Cumulative AS (
    SELECT
        percentile,
        SUM(pct_defaults) OVER (ORDER BY percentile)      AS cum_pct_defaults,
        SUM(pct_non_defaults) OVER (ORDER BY percentile)  AS cum_pct_non_defaults
    FROM ByPercentile
)
SELECT
    MAX(ABS(cum_pct_defaults - cum_pct_non_defaults)) AS ks_statistic
FROM Cumulative;

-- Step 4: Calibration — Binomial Test per Grade
WITH GradeStats AS (
    SELECT
        risk_grade,
        COUNT(*)                            AS n_obligors,
        SUM(CAST(default_flag AS INT))      AS n_defaults,
        AVG(predicted_pd)                   AS avg_predicted_pd,
        CAST(SUM(CAST(default_flag AS INT)) AS FLOAT) / COUNT(*) AS observed_dr
    FROM #ValidationDataset
    GROUP BY risk_grade
),
CalibTest AS (
    SELECT
        risk_grade,
        n_obligors,
        n_defaults,
        avg_predicted_pd,
        observed_dr,
        avg_predicted_pd * n_obligors                           AS expected_defaults,
        -- Z-stat for one-sample proportion test
        (observed_dr - avg_predicted_pd)
        / NULLIF(SQRT(avg_predicted_pd * (1 - avg_predicted_pd) / n_obligors), 0)
                                                                AS z_stat
    FROM GradeStats
),
Final AS (
    SELECT
        *,
        -- Two-tailed p-value approximation
        CASE
            WHEN ABS(z_stat) > 3.29 THEN 0.001
            WHEN ABS(z_stat) > 2.58 THEN 0.010
            WHEN ABS(z_stat) > 1.96 THEN 0.050
            WHEN ABS(z_stat) > 1.65 THEN 0.100
            ELSE 0.200
        END AS approx_p_value,
        CASE
            WHEN ABS(z_stat) > 3.29 THEN 'RED — Significant miscalibration'
            WHEN ABS(z_stat) > 2.58 THEN 'AMBER — Marginal miscalibration'
            WHEN ABS(z_stat) > 1.96 THEN 'YELLOW — Monitor'
            ELSE 'GREEN — Calibration acceptable'
        END AS traffic_light,
        CASE
            WHEN observed_dr > avg_predicted_pd THEN 'UNDER-PREDICTING (underprovision risk)'
            ELSE 'OVER-PREDICTING (capital excess)'
        END AS direction
    FROM CalibTest
)
SELECT * FROM Final ORDER BY risk_grade;

-- Step 5: PSI — Population Stability Index
-- Compare score distribution: Development vs Current monitoring period
WITH DevDist AS (
    SELECT
        NTILE(10) OVER (ORDER BY model_score) AS decile,
        COUNT(*) AS dev_count
    FROM #ValidationDataset  -- Substitute development sample
    GROUP BY NTILE(10) OVER (ORDER BY model_score)
),
MonDist AS (
    SELECT
        NTILE(10) OVER (ORDER BY model_score) AS decile,
        COUNT(*) AS mon_count
    FROM #ValidationDataset  -- Substitute monitoring period sample
    GROUP BY NTILE(10) OVER (ORDER BY model_score)
),
PSICalc AS (
    SELECT
        d.decile,
        CAST(d.dev_count AS FLOAT) / SUM(d.dev_count) OVER () AS expected_pct,
        CAST(m.mon_count AS FLOAT) / SUM(m.mon_count) OVER () AS actual_pct
    FROM DevDist d
    JOIN MonDist m ON d.decile = m.decile
)
SELECT
    decile,
    ROUND(expected_pct * 100, 2)                                    AS expected_pct,
    ROUND(actual_pct * 100, 2)                                      AS actual_pct,
    ROUND((actual_pct - expected_pct) * LOG(actual_pct / expected_pct), 4)
                                                                     AS psi_component,
    SUM((actual_pct - expected_pct) * LOG(actual_pct / expected_pct))
        OVER ()                                                      AS total_psi,
    CASE
        WHEN SUM((actual_pct - expected_pct) * LOG(actual_pct / expected_pct))
             OVER () < 0.10 THEN 'STABLE'
        WHEN SUM((actual_pct - expected_pct) * LOG(actual_pct / expected_pct))
             OVER () < 0.25 THEN 'MODERATE SHIFT — MONITOR'
        ELSE 'SIGNIFICANT SHIFT — ACTION REQUIRED'
    END AS psi_status
FROM PSICalc
ORDER BY decile;
```

---

## 10. Python Implementation

```python
# ============================================================
# M26: MODEL VALIDATION SUITE — FULL PYTHON IMPLEMENTATION
# ============================================================
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from sklearn.metrics import roc_auc_score, roc_curve
from scipy import stats
from dataclasses import dataclass, field
from typing import Optional
import warnings
warnings.filterwarnings('ignore')

# ============================================================
# Data Class for Validation Results
# ============================================================
@dataclass
class ValidationFinding:
    test_name: str
    result: float
    threshold: float
    pass_fail: str
    severity: str  # Critical / High / Medium / Low / Pass
    description: str
    recommendation: str = ""

@dataclass
class ValidationReport:
    model_name: str
    validation_date: str
    findings: list = field(default_factory=list)

    def add_finding(self, finding: ValidationFinding):
        self.findings.append(finding)

    def summary(self) -> pd.DataFrame:
        return pd.DataFrame([{
            'Test': f.test_name,
            'Result': f.result,
            'Threshold': f.threshold,
            'Pass/Fail': f.pass_fail,
            'Severity': f.severity,
            'Description': f.description[:80]
        } for f in self.findings])

    def print_report(self):
        print(f"\n{'='*70}")
        print(f"MODEL VALIDATION REPORT")
        print(f"Model: {self.model_name}")
        print(f"Validation Date: {self.validation_date}")
        print(f"{'='*70}")
        for f in self.findings:
            icon = {'Pass': '✓', 'Critical': '!!', 'High': '!',
                    'Medium': '~', 'Low': '-'}.get(f.severity, '?')
            print(f"\n[{icon}] {f.test_name} — {f.severity}")
            print(f"    Result: {f.result:.4f} | Threshold: {f.threshold}")
            print(f"    {f.description}")
            if f.recommendation:
                print(f"    REC: {f.recommendation}")

# ============================================================
# Pillar 3: Performance Testing
# ============================================================
class DiscriminatoryPowerTests:
    """
    Tests discriminatory power of a PD model.
    Implements AUC, Gini, KS, and Accuracy Ratio.
    """

    def __init__(self, y_true: np.ndarray, y_score: np.ndarray):
        self.y_true = np.asarray(y_true)
        self.y_score = np.asarray(y_score)
        self._validate_inputs()

    def _validate_inputs(self):
        assert len(self.y_true) == len(self.y_score), "Arrays must be same length"
        assert set(np.unique(self.y_true)).issubset({0, 1}), "y_true must be binary"
        assert self.y_true.sum() >= 20, f"Insufficient defaults: {self.y_true.sum()}"

    def auc(self) -> float:
        return roc_auc_score(self.y_true, self.y_score)

    def gini(self) -> float:
        return 2 * self.auc() - 1

    def ks_statistic(self) -> float:
        """KS statistic: max separation between default and non-default CDFs."""
        fpr, tpr, _ = roc_curve(self.y_true, self.y_score)
        return np.max(tpr - fpr)

    def run_all(self, report: ValidationReport, thresholds: dict = None) -> dict:
        """Run all discriminatory power tests and add findings to report."""
        if thresholds is None:
            thresholds = {'auc': 0.70, 'gini': 0.40, 'ks': 0.25}

        results = {
            'AUC': self.auc(),
            'Gini': self.gini(),
            'KS': self.ks_statistic()
        }

        for metric, value in results.items():
            threshold = thresholds.get(metric.lower(), 0)
            pass_fail = 'Pass' if value >= threshold else 'Fail'

            if pass_fail == 'Pass':
                severity = 'Pass'
            elif value >= threshold * 0.9:
                severity = 'Medium'
            elif value >= threshold * 0.8:
                severity = 'High'
            else:
                severity = 'Critical'

            report.add_finding(ValidationFinding(
                test_name=f'Discriminatory Power — {metric}',
                result=round(value, 4),
                threshold=threshold,
                pass_fail=pass_fail,
                severity=severity,
                description=f'{metric} = {value:.4f} (threshold: {threshold})',
                recommendation=f'Investigate model rebuild if {metric} < {threshold*0.85:.3f}' if pass_fail == 'Fail' else ''
            ))

        return results

    def plot_roc(self, ax=None, label: str = 'Model') -> None:
        """Plot ROC curve with confidence bands."""
        fpr, tpr, _ = roc_curve(self.y_true, self.y_score)
        auc_val = self.auc()

        if ax is None:
            fig, ax = plt.subplots(figsize=(8, 6))

        ax.plot(fpr, tpr, lw=2, label=f'{label} (AUC={auc_val:.3f})')
        ax.plot([0, 1], [0, 1], 'k--', lw=1, label='Random (AUC=0.500)')
        ax.fill_between(fpr, tpr, alpha=0.1)
        ax.set_xlabel('False Positive Rate', fontsize=12)
        ax.set_ylabel('True Positive Rate', fontsize=12)
        ax.set_title('ROC Curve — Model Validation', fontsize=14)
        ax.legend(loc='lower right')
        ax.grid(alpha=0.3)
        return ax


class CalibrationTests:
    """
    Tests calibration of PD model outputs.
    Implements binomial test, chi-square test, and Normal test (Basel Annex 10a).
    """

    def __init__(self, grades: np.ndarray, predicted_pd: np.ndarray,
                 defaults: np.ndarray, n_obligors: np.ndarray):
        """
        Parameters
        ----------
        grades : array of grade labels
        predicted_pd : array of model PD estimates per grade (decimal)
        defaults : array of observed defaults per grade
        n_obligors : array of obligor counts per grade
        """
        self.grades = np.asarray(grades)
        self.predicted_pd = np.asarray(predicted_pd, dtype=float)
        self.defaults = np.asarray(defaults, dtype=float)
        self.n_obligors = np.asarray(n_obligors, dtype=float)
        self.observed_dr = self.defaults / self.n_obligors

    def binomial_test_by_grade(self) -> pd.DataFrame:
        """
        One-sided binomial test: H₀: predicted PD = true PD.
        One-sided upper tail (testing for under-prediction / under-provisioning).
        """
        results = []
        for i, grade in enumerate(self.grades):
            n = int(self.n_obligors[i])
            k = int(self.defaults[i])
            p = self.predicted_pd[i]

            if n == 0 or p <= 0 or p >= 1:
                continue

            # Exact binomial p-value (one-tailed: P(X >= k | p))
            p_value = stats.binom.sf(k - 1, n, p)  # P(X >= k)

            # Two-tailed
            p_value_2t = min(2 * min(p_value, 1 - p_value + stats.binom.pmf(k, n, p)), 1.0)

            # Traffic light
            if p_value_2t < 0.01:
                traffic = 'RED'
            elif p_value_2t < 0.05:
                traffic = 'YELLOW'
            else:
                traffic = 'GREEN'

            results.append({
                'Grade': grade,
                'N_Obligors': n,
                'N_Defaults': k,
                'Predicted_PD': round(p, 4),
                'Observed_DR': round(k/n, 4),
                'P_Value_2T': round(p_value_2t, 4),
                'Traffic_Light': traffic,
                'Direction': 'Under-predict' if k/n > p else 'Over-predict'
            })

        return pd.DataFrame(results)

    def chi_square_test(self) -> tuple[float, float]:
        """
        Chi-square goodness of fit test across all grades.
        H₀: PD estimates are correctly calibrated.
        """
        expected = self.n_obligors * self.predicted_pd
        observed = self.defaults

        # Exclude grades with expected defaults < 5 (chi-square assumption)
        mask = expected >= 5
        chi2 = np.sum((observed[mask] - expected[mask])**2 / expected[mask])
        df = mask.sum() - 1
        p_value = 1 - stats.chi2.cdf(chi2, df)

        return chi2, p_value, df

    def normal_test_basel(self, asset_correlation: float = 0.20) -> tuple[float, float]:
        """
        Basel Annex 10a Normal Test for overall portfolio calibration.
        Accounts for systematic default correlation.

        H₀: Portfolio average PD is correctly estimated.
        """
        total_n = self.n_obligors.sum()
        total_d = self.defaults.sum()
        avg_pd = np.average(self.predicted_pd, weights=self.n_obligors)
        observed_dr = total_d / total_n

        # Variance includes both idiosyncratic and systematic components
        # Systematic variance from Basel asset correlation
        sigma2_idiosync = avg_pd * (1 - avg_pd) / total_n
        sigma2_systematic = asset_correlation**2 * avg_pd * (1 - avg_pd)  # Simplified
        sigma2_total = sigma2_idiosync + sigma2_systematic

        z = (observed_dr - avg_pd) / np.sqrt(sigma2_total)
        p_value = 2 * (1 - stats.norm.cdf(abs(z)))

        return z, p_value

    def run_all(self, report: ValidationReport) -> None:
        """Run all calibration tests and add to report."""
        # Per-grade binomial tests
        grade_results = self.binomial_test_by_grade()
        red_grades = (grade_results['Traffic_Light'] == 'RED').sum()
        yellow_grades = (grade_results['Traffic_Light'] == 'YELLOW').sum()

        sev = 'Pass' if red_grades == 0 else ('Critical' if red_grades > 2 else 'High')
        report.add_finding(ValidationFinding(
            test_name='Calibration — Binomial Test (Per Grade)',
            result=red_grades,
            threshold=0,
            pass_fail='Fail' if red_grades > 0 else 'Pass',
            severity=sev,
            description=f'{red_grades} grades RED, {yellow_grades} grades YELLOW out of {len(grade_results)}',
            recommendation='Recalibrate PD estimates for failing grades; consider MoC adjustment' if red_grades > 0 else ''
        ))

        # Portfolio chi-square
        chi2, p_val, df = self.chi_square_test()
        report.add_finding(ValidationFinding(
            test_name='Calibration — Chi-Square (Portfolio)',
            result=round(p_val, 4),
            threshold=0.05,
            pass_fail='Pass' if p_val >= 0.05 else 'Fail',
            severity='Pass' if p_val >= 0.05 else 'High',
            description=f'χ²({df})={chi2:.2f}, p={p_val:.4f}',
            recommendation='Investigate systematic bias in PD estimates' if p_val < 0.05 else ''
        ))

        # Basel Normal test
        z, p_val_n = self.normal_test_basel()
        report.add_finding(ValidationFinding(
            test_name='Calibration — Normal Test (Basel Annex 10a)',
            result=round(p_val_n, 4),
            threshold=0.05,
            pass_fail='Pass' if p_val_n >= 0.05 else 'Fail',
            severity='Pass' if p_val_n >= 0.05 else 'High',
            description=f'z={z:.3f}, p={p_val_n:.4f} (with correlation adjustment)',
            recommendation='Apply conservatism margin or recalibrate' if p_val_n < 0.05 else ''
        ))

        return grade_results


class StabilityTests:
    """Population Stability Index and Characteristic Stability Index."""

    @staticmethod
    def psi(expected: np.ndarray, actual: np.ndarray,
            n_bins: int = 10) -> float:
        """
        Compute PSI between expected (development) and actual (monitoring) distributions.
        """
        # Bin using expected distribution percentiles
        bins = np.percentile(expected, np.linspace(0, 100, n_bins + 1))
        bins[0] = -np.inf
        bins[-1] = np.inf

        exp_counts, _ = np.histogram(expected, bins=bins)
        act_counts, _ = np.histogram(actual, bins=bins)

        exp_pct = exp_counts / exp_counts.sum()
        act_pct = act_counts / act_counts.sum()

        # Avoid log(0)
        exp_pct = np.where(exp_pct == 0, 1e-6, exp_pct)
        act_pct = np.where(act_pct == 0, 1e-6, act_pct)

        psi_components = (act_pct - exp_pct) * np.log(act_pct / exp_pct)
        return psi_components.sum()

    @classmethod
    def run_psi(cls, dev_scores: np.ndarray, mon_scores: np.ndarray,
                report: ValidationReport, variable_name: str = 'Model Score') -> float:
        """Run PSI test and add finding to report."""
        psi_val = cls.psi(dev_scores, mon_scores)

        if psi_val < 0.10:
            sev, status = 'Pass', 'Stable'
        elif psi_val < 0.25:
            sev, status = 'Medium', 'Moderate shift'
        else:
            sev, status = 'High', 'Significant shift'

        report.add_finding(ValidationFinding(
            test_name=f'Stability — PSI ({variable_name})',
            result=round(psi_val, 4),
            threshold=0.25,
            pass_fail='Pass' if psi_val < 0.25 else 'Fail',
            severity=sev,
            description=f'PSI = {psi_val:.4f} — {status}',
            recommendation='Investigate population shift; consider recalibration or rebuild' if psi_val >= 0.25 else ''
        ))

        return psi_val


# ============================================================
# Complete Validation Pipeline
# ============================================================
def run_validation_suite(
    model_name: str,
    validation_date: str,
    y_true: np.ndarray,
    y_score: np.ndarray,
    grades: np.ndarray,
    predicted_pd_by_grade: np.ndarray,
    defaults_by_grade: np.ndarray,
    n_by_grade: np.ndarray,
    dev_scores: np.ndarray,
    mon_scores: np.ndarray
) -> ValidationReport:
    """
    Run the full validation test battery.
    Returns a ValidationReport with all findings.
    """
    report = ValidationReport(model_name=model_name, validation_date=validation_date)

    print(f"\nRunning validation suite for: {model_name}")
    print(f"Test sample: {len(y_true):,} observations, {y_true.sum()} defaults")

    # Pillar 3a: Discriminatory Power
    print("\n[1/3] Discriminatory Power Tests...")
    disc = DiscriminatoryPowerTests(y_true, y_score)
    disc_results = disc.run_all(report)

    # Pillar 3b: Calibration
    print("[2/3] Calibration Tests...")
    calib = CalibrationTests(grades, predicted_pd_by_grade,
                              defaults_by_grade, n_by_grade)
    grade_results = calib.run_all(report)

    # Pillar 3c: Stability
    print("[3/3] Stability Tests...")
    StabilityTests.run_psi(dev_scores, mon_scores, report, 'Model Score')

    # Print report
    report.print_report()
    print(f"\n{'='*70}")
    print(f"FINDINGS SUMMARY")
    print(report.summary().to_string(index=False))

    # Model Risk Rating
    severities = [f.severity for f in report.findings]
    if 'Critical' in severities:
        rating = 'HIGH RISK — Model should not be used without remediation'
    elif severities.count('High') >= 2:
        rating = 'ELEVATED RISK — Significant findings require remediation before next review'
    elif 'High' in severities:
        rating = 'MODERATE RISK — Findings require management attention'
    elif 'Medium' in severities:
        rating = 'LOW-MODERATE RISK — Minor findings; monitor closely'
    else:
        rating = 'LOW RISK — Model validated; continue monitoring'

    print(f"\nMODEL RISK RATING: {rating}")

    return report
```

---

## 11. Interview Questions

**Junior/Mid Level**

1. **What are the three pillars of model validation per SR 11-7?**
   Conceptual soundness, data integrity, and performance testing. Validators must address all three; a model that performs well statistically but has conceptually flawed assumptions can still be rated high risk.

2. **What is the difference between AUC and calibration? Give an example of a model with good AUC but poor calibration.**
   AUC measures rank-ordering — whether defaulters score higher than non-defaulters. Calibration measures whether the predicted PD level is accurate. Example: A model built on 2010–2015 data predicts PDs of 3–15% but the portfolio's actual default rate is now 0.5% — the model discriminates well (orders risks correctly) but massively over-predicts the level.

3. **What does PSI > 0.25 mean and what actions should a validator take?**
   PSI > 0.25 indicates significant population shift. The validator should: (1) investigate whether the shift is in predictors or the score, (2) run CSI on each input variable to identify which variable has shifted, (3) assess whether the model is still appropriate for the current population, (4) recommend recalibration or rebuild as appropriate.

**Senior Level**

4. **The binomial test rejects calibration for Grade 5 (z = 3.1, p = 0.002). The developer argues this is one grade out of ten and should not be a significant finding. How do you respond?**
   Grade-level rejection has capital implications. Grade 5 may represent a significant portion of the portfolio. More importantly: if the model systematically under-predicts for one grade, it may indicate a structural bias that affects other grades too. The finding should be rated as at least Medium; the severity depends on the portfolio concentration in that grade and the direction (under-prediction is more serious from a prudential perspective than over-prediction).

5. **Describe how you would structure an ongoing monitoring framework for a corporate IRB PD model.**
   Quarterly: PSI on model scores and key input variables; comparison of new defaults to model predictions. Annually: Full discriminatory power test (AUC, Gini, KS) on the most recent 12 months of data; full calibration test per grade; update of the traffic light status; assessment of whether any model triggers (PSI > 0.10, Gini decay > 0.05, grade failure > 2 grades) have been breached. Trigger-based: immediate review if any trigger is breached. Results reported to MRC quarterly.

---

## 12. Common Mistakes

1. **Using the Developer's Dataset for Validation**: Validators who use the model developer's dataset are not conducting an independent test. They must independently construct the test dataset from source systems.

2. **Confusing One-Sided and Two-Sided Tests**: The binomial test for PD calibration is typically two-sided when testing overall accuracy, but one-sided (upper tail) when specifically testing for under-prediction risk (which has prudential implications). The choice should be documented and consistent.

3. **Applying PSI Without Checking Score Ranges**: PSI depends on how bins are defined. Validators who use different percentile bins in development and monitoring will get misleading PSI results. The development sample percentile breakpoints must be fixed and used consistently.

4. **Treating Statistical Significance as the Only Criterion**: A z-stat of 1.94 (p = 0.053) is technically a "pass" but economically may still indicate meaningful miscalibration. Validators should report economic significance (how large is the PD gap?) alongside statistical significance.

5. **Failing to Assess Out-of-Sample Performance**: Testing only on the development sample, or not obtaining a separate validation dataset, makes the performance assessment meaningless.

---

## 13. Case Studies

**Case Study 1: The Well-Validated Model That Still Failed**

A UK bank had a corporate PD model with Gini of 0.61, passing calibration tests at all grades, PSI of 0.08. The model was rated Low Risk. However, the validation team had not assessed whether the model population had changed composition: over 3 years, the bank had shifted its lending from domestic UK corporates toward cross-border European SMEs, which were not in the development sample. When defaults started clustering in the new segment at a rate 3x the model's Grade 6 PD, the bank had to take an unplanned £200m provision increase. Lesson: Stability tests on the score distribution do not detect a shift in the composition of the population if the new subsegment scores similarly to the original.

**Case Study 2: The Effective Challenge**

A validator found that a developer's AUC calculation was 0.73 on the out-of-time holdout. Re-running the test independently, the validator obtained 0.68. Investigation revealed that the developer had included 3 months of data that technically overlapped with the development period (an off-by-one error in the date filter). The 0.05 AUC difference was sufficient to reclassify the model from "Medium Performance" to "Below Threshold." This demonstrates why independent data reproduction is essential.

---

## 14. Iterative Reinforcement

**Week 1**: Calculate AUC, Gini, and KS manually on a 100-row dataset. Plot the ROC curve. Run the binomial test for a single grade.

**Week 2**: Build a full PSI table for a score distribution that has shifted. Identify which bins are driving the PSI. Write a paragraph interpretation.

**Week 3**: Review a sample MTD and write a 10-point conceptual soundness assessment. Identify at least 3 assumption failures.

**Exam Questions**:
1. A PD model has AUC = 0.75 on development but AUC = 0.58 on the out-of-time holdout. What are the three most likely explanations? What tests would you run?
2. The chi-square calibration test passes (p = 0.12) but Grade 3 has a binomial test z = 2.8. What is your finding severity and what do you recommend?
3. PSI on model scores is 0.15 but PSI on the Interest Coverage Ratio input variable is 0.32. What has likely happened and what actions should the bank take?

---

## 15. Source Material

- Federal Reserve / OCC SR 11-7 (2011): *Supervisory Guidance on Model Risk Management*
- EBA/GL/2017/07 (2017): *EBA Guidelines on PD/LGD estimation and defaulted exposures* — Chapter 9: Validation
- Basel BCBS 128 (2006): Annex 10a — Backtesting and validation statistics
- ECB Guide to Internal Models (2019): Chapter 6 — Model validation
- PRA SS1/23 (2023): Principle 4 — Model Validation
- Engelmann, B. & Rauhmeier, R. (eds., 2006). *The Basel II Risk Parameters*. Springer. — Chapters on discriminatory power and calibration
- Tasche, D. (2006). "Validation of internal rating systems and PD estimates." Working Paper, Deutsche Bundesbank
- Hosmer, D.W. & Lemeshow, S. (2000). *Applied Logistic Regression*, 2nd ed. Wiley
