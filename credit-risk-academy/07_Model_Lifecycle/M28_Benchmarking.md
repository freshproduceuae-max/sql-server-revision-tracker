# M28 — Benchmarking

> Comparing a bank's internal model outputs to external references to assess plausibility. Covers PD and LGD benchmarking against agency data, Pillar 3 peer comparison, challenger models, low-default portfolio approaches, regulatory expectations, and how to present benchmarking to MRC and supervisors.

---

## 1. Business Purpose

Backtesting (M27) answers "was the model accurate historically?" Benchmarking answers a different but complementary question: "is the model's output plausible, relative to what external references suggest the risk should be?"

Benchmarking is especially important in three circumstances:

1. **Low Default Portfolios (LDP)**: When you have almost no internal defaults (sovereign, financial institutions, large corporate rated investment grade), backtesting is statistically uninformative. External benchmarks are the primary calibration check.

2. **New Models**: A newly developed model has no backtesting history. Benchmarking against external references provides an immediate plausibility check before the model accumulates its own performance record.

3. **Regulatory Submissions**: When submitting IRB models to regulators (PRA, ECB), benchmarking against published external data demonstrates that the model's outputs are in the right ballpark, even if internally derived.

**Why Regulators Care**
The ECB's benchmarking exercises (conducted under CRR Article 78) explicitly compare model outputs across banks for identical hypothetical portfolios. Banks with PDs or LGDs that diverge significantly from the central tendency of peers are asked to explain the divergence. If the explanation is insufficient, the regulator can impose capital add-ons or require model recalibration.

**Common Benchmarking Exercises**
- PD benchmarking: Internal PD by grade → Moody's/S&P historical default rates by letter rating
- LGD benchmarking: Internal LGD → Moody's Ultimate Recovery Database (URD) by seniority/collateral
- EAD benchmarking: Internal CCF → peer bank Pillar 3 disclosures
- Full ECL benchmarking: Internal ECL / RWA → Pillar 3 disclosures of comparable banks
- Regulatory benchmarking: Submission to ECB/EBA stress test; comparison to supervisor's anchor

---

## 2. Accounting Concepts

**Pillar 3 Disclosures**
Under CRR Article 431+, banks must publicly disclose quantitative and qualitative information about their credit risk models. Relevant Pillar 3 tables:
- CR6: IRB — Credit risk exposures by exposure class and PD range. Shows N, EAD, average PD, average LGD, average RWA density (RWA/EAD) by PD band.
- CR7: IRB — Effect of credit risk mitigation (CRM) on RWA.
- CR10: IRB — Specialised lending and equity exposures.

These tables allow peer benchmarking: if the average PD for "SME corporate 1-year" is 0.8% at your bank but 2.5% across peers, the bank needs an explanation.

**Moody's Annual Default Study**
Moody's publishes (annually) a *Corporate Default and Recovery Rates* study covering:
- Historical average 1-year default rates by letter rating (Aaa through C) back to 1920
- Transition matrices (probability of moving from one rating to another)
- Recovery rates by instrument seniority and collateral type

The long-run average 1-year default rates by Moody's rating are the canonical external PD benchmark:
- Aaa: ~0.0%
- Aa: ~0.02%
- A: ~0.05%
- Baa: ~0.18%
- Ba: ~1.19%
- B: ~4.36%
- Caa-C: ~14.16%
(figures vary by study vintage; 2023 study used in practice)

**S&P Global — CreditPro**
S&P publishes comparable data, typically for US corporate issuers with public ratings. For European banks, Moody's data is more commonly used as the benchmark (broader European coverage).

**Moody's Ultimate Recovery Database (URD)**
The URD contains recovery data on defaulted North American instruments:
- Recovery rate by seniority: Senior Secured (67–70%), Senior Unsecured (40–45%), Subordinated (28–32%)
- These are the canonical LGD benchmarks for large corporate exposures
- Caveat: URD covers publicly-traded debt; bank loan recovery rates are typically higher (banks have covenant protections and early-mover advantage)

---

## 3. Financial Concepts

**Rating Equivalence — Internal to External Mapping**
To benchmark internal PD against Moody's default rates, the bank must establish an equivalence between its internal grades and Moody's letter ratings.

Method 1: PD-based mapping — match internal grade PD to the Moody's grade with the nearest historical default rate.
Method 2: Name-based mapping — for rated corporates in the portfolio, compare internal grade to the Moody's/S&P letter rating. Systematic divergence reveals model bias.

**Shadow Rating**
For LDP portfolios (large investment-grade corporates), where the bank's PD model produces estimates like 0.03%, the bank can use shadow ratings:
1. Map the obligor's internal score to an equivalent external rating ("shadow" Baa, Ba, etc.)
2. Use the Moody's/S&P historical default rate for that shadow rating as the PD benchmark
3. Compare shadow-rated default rates to the model's calibrated PD

**Divergence from Benchmark — When is Deviation Acceptable?**
Reasonable explanations for divergence:
- Portfolio composition: The bank lends to a different sub-segment of issuers (e.g., lower-LTV secured vs. unsecured)
- Geography: Moody's URD is US-dominated; European recovery rates may differ
- Seniority / collateral: Banks typically have senior secured positions with covenants — better recovery than Moody's average
- Time period: Moody's data includes the Great Depression; a bank's portfolio may only reference the post-2000 period

Unacceptable explanations:
- "Our model is better" without supporting statistical evidence
- "We have always used this PD" without calibration evidence
- Cherry-picking a subset of Moody's data that supports the bank's PD

**RWA Density as a Benchmark**
RWA density = RWA / EAD, expressed as a percentage. Under Basel, for a corporate portfolio:
- Average RWA density of ~70–80% for SME
- ~50–65% for large investment-grade corporate

Banks with significantly lower density (below output floor territory) should expect regulatory scrutiny. Pillar 3 CR6 disclosures allow cross-bank comparison.

---

## 4. Statistical Concepts

**The Challenger Model as an Internal Benchmark**
A challenger model is an alternative model (different methodology, variables, or vendor) applied to the same population. The primary model's outputs are compared to the challenger's.

Challenger model types:
1. **Alternative methodology**: Logistic regression vs. gradient boosted trees (GBT)
2. **Vendor model**: Moody's RiskCalc or S&P CreditModel vs. internal scorecard
3. **Expert model**: Risk officer qualitative assessment converted to PD

A challenger model is not expected to be correct — it provides a second opinion. Systematic divergence (all grades 50% higher in the challenger) warrants investigation.

**Rank Correlation Between Internal and External Ratings**
For portfolios where external ratings are available (rated corporates), compute:
- Spearman rank correlation between internal grade and Moody's/S&P rating
- Expected: ρ > 0.70 for a well-functioning model
- If ρ < 0.50, the internal model is disagreeing substantially with market participants' assessment

**Kolmogorov-Smirnov Test for Distribution Comparison**
When comparing distributions of PD (internal vs. external benchmark), use:
- Two-sample KS test: Is the internal PD distribution statistically similar to the benchmark distribution?
- KS statistic > 0.20 suggests meaningful distributional difference

**Bootstrap Confidence Intervals for Moody's Default Rates**
Moody's long-run default rates are themselves estimates with uncertainty. For sound benchmarking, compute:
- 95% confidence interval around the Moody's long-run average DR (using binomial CI or bootstrap on their annual DR series)
- Check whether the bank's predicted PD lies within this interval
- A bank's PD outside Moody's CI requires explanation; within the CI, no action is necessary

**Coverage Ratio Benchmarking**
`Coverage = ECL Provision / NPL Gross Carrying Amount`
Compare to peers' disclosed coverage ratios (from Pillar 3 or annual reports). Systematic under-coverage relative to peers with similar portfolio composition is a material benchmarking finding.

---

## 5. Regulatory Framework

**CRR Article 78 — EBA / ECB Benchmarking Exercise**
Annually, the EBA (in coordination with national regulators) runs a benchmarking exercise where banks submit PD, LGD, and RWA estimates for a set of standardised hypothetical portfolios. The results are published, allowing:
- National regulators to identify outlier banks
- Banks to compare their models to the central tendency of peers
- Supervisors to calibrate supervisory expectations

Banks whose estimates fall outside the interquartile range of peers must explain their deviation. Those outside the 90th/10th percentile face potential supervisory challenge.

**EBA/GL/2017/07 — Benchmarking and LDP Requirements**
Section 5.2 (PD for LDP):
"Where the number of observed defaults is too low for statistically reliable estimates, institutions shall complement their own estimates with data from external sources, including databases of rating agencies, external credit assessment institutions, or data collected within a data pooling scheme."

This is a direct regulatory requirement for LDP portfolios to use external benchmarks.

**PRA SS1/23 — Model Plausibility**
The PRA expects banks to be able to demonstrate that model outputs are "plausible" relative to external references. An inability to benchmark is itself a model risk concern.

**ECB TRIM Findings on Benchmarking**
TRIM found that many IRB banks had:
- No formal benchmarking framework for LDP portfolios
- Benchmarking conducted informally without documentation
- No defined thresholds for "acceptable" divergence from external benchmarks
- Inability to explain deviations > 50% from Moody's long-run default rates

Post-TRIM, the ECB expects banks to have documented benchmarking policies covering: data sources, frequency, divergence thresholds, escalation process, and MRC reporting.

**Basel III Output Floor and Benchmarking**
The output floor (RWA ≥ 72.5% of SA RWA from 2025) acts as an implicit benchmark: if IRB RWA is below 72.5% of SA, it triggers automatic flooring. Banks should proactively benchmark their IRB RWA against SA RWA to anticipate output floor impacts.

---

## 6. Data Required

**External PD Benchmark Data**
- Moody's *Annual Default Study* (published annually, free executive summary; full data via subscription)
- S&P *Annual Global Corporate Default and Rating Transition Study*
- Historical time series: ideally 1983–current (covers multiple cycles)
- Moody's default rate by rating: Aaa, Aa1-3, A1-3, Baa1-3, Ba1-3, B1-3, Caa-C

**External LGD Benchmark Data**
- Moody's Ultimate Recovery Database (URD): subscription required; download defaulted instrument-level recovery rates
- S&P Global Market Intelligence: *LossStats* database
- Altman-Kuehne NYU database: public access summary statistics
- ECB/EBA common reference data: published benchmarking exercise outputs

**Peer Bank Pillar 3 Data**
For each peer bank:
- Download Pillar 3 report (annual, typically published April–May for December year-end banks)
- Extract CR6 table: EAD, average PD, average LGD, RWA density by PD band
- Coverage ratio: ECL / NPL
- IRB coverage (what % of the portfolio is on IRB vs. SA)

**Internal Data for Benchmarking**
- Internal model PD estimates by grade, with corresponding grade-level EAD
- Internal LGD estimates by collateral type and seniority
- Internal RWA and EAD by exposure class
- Internal shadow ratings (for rated obligors in the portfolio)

**For Rated Corporates Sub-Portfolio**
- Obligor name
- Internal grade
- External rating (Moody's/S&P) — obtained from Bloomberg, FactSet, or rating agency databases
- EAD
- This sub-portfolio is used for the internal/external rating concordance test

---

## 7. How Analysts Actually Work

**Step 1: Establish the Mapping Framework (Month 1)**

The analyst begins by building the Grade-to-Rating equivalence table:
1. Pull all internally-rated obligors that also have external ratings (Moody's/S&P)
2. For each obligor: internal grade (1–10) and external rating (Aaa through C)
3. Compute median internal grade by external rating category
4. Build the mapping: Grade 1–2 = Aaa/Aa, Grade 3–4 = A, Grade 5–6 = Baa, etc.
5. Validate: the mapping should be monotonic (higher internal grade = lower external rating)

This mapping is the foundation for all subsequent benchmarking.

**Step 2: PD Benchmarking (Month 1–2)**

1. Compute the bank's long-run average PD by internal grade (using all years of data)
2. Map each grade to its equivalent Moody's letter rating
3. Extract Moody's long-run average 1-year default rate for each equivalent rating
4. Build comparison table: Internal PD vs. Moody's DR vs. 95% CI around Moody's DR
5. Identify where internal PD lies: above CI (conservative), within CI (acceptable), below CI (potentially aggressive)
6. Document each material divergence with an explanation

**Step 3: LGD Benchmarking (Month 2–3)**

1. Segment the bank's portfolio by collateral type and seniority
2. Compute internal average LGD by segment
3. Extract equivalent Moody's URD statistics (average recovery rate → LGD = 1 − recovery)
4. Adjust for systematic differences (European vs. US; bank loan vs. bond; LTV differences)
5. Build comparison table with documented explanation for each deviation

**Step 4: Pillar 3 Peer Comparison (Month 3)**

1. Download CR6 tables from 5–10 peer banks (same geography, similar business model)
2. Standardise the PD banding (different banks use different PD breakpoints)
3. Compute weighted average PD and LGD for equivalent PD bands
4. Compare RWA density (RWA/EAD) across peers
5. Identify the bank's position in the peer distribution (quartile)
6. Flag where the bank is in the bottom quartile (lowest capital for equivalent risk exposure)

**Step 5: Challenger Model Analysis (Month 2–3)**

1. Run Moody's RiskCalc (or equivalent) on the same population as the internal model
2. Compute RiskCalc PD for each obligor
3. Compare: correlation between internal PD and RiskCalc PD
4. Grade distribution: does the internal model concentrate obligors in different grades than RiskCalc?
5. Default discrimination: which model has better AUC on a common test sample?

**Step 6: Benchmarking Report (Month 4)**

The benchmarking report is 30–50 pages covering all five steps above. Presented to MRC with:
- Summary heat map of findings
- Material deviations listed with explanation and management action
- Comparison to prior year (has the divergence increased or decreased?)
- Regulatory context (where applicable: ECB benchmarking exercise results)

---

## 8. Excel Implementation

**Grade-to-Rating Mapping Table**

```
Sheet: Rating_Equivalence
Column A: Internal_Grade (1-10)
Column B: PD_Lower_%
Column C: PD_Upper_%
Column D: Central_PD_%
Column E: Equivalent_Moodys_Rating
Column F: Equivalent_SP_Rating
Column G: Moodys_LR_DR_%    (from Moody's Annual Study)
Column H: SP_LR_DR_%         (from S&P Annual Study)
Column I: Internal_PD_Divergence = D - G   (positive = conservative)
Column J: Divergence_Pct = (D - G) / G * 100
Column K: Traffic_Light = IF(ABS(J)>50%, "RED", IF(ABS(J)>25%, "YELLOW", "GREEN"))

Chart: Grouped bar chart — Internal PD (blue) vs Moody's DR (grey) by grade
Add 95% CI error bars for Moody's DR using STDEV of annual DR series
```

**Pillar 3 Peer Comparison Table**

```
Sheet: Pillar3_Peers
Column A: Bank_Name
Column B: Country
Column C: Reporting_Date
Column D: Exposure_Class (Corp / SME / Retail)
Column E: PD_Band (0-0.5% / 0.5-2% / 2-10% / 10%+)
Column F: EAD_bn
Column G: Avg_PD_%
Column H: Avg_LGD_%
Column I: Avg_Maturity_Yrs
Column J: RWA_bn
Column K: RWA_Density = J/F

Pivot table: Median RWA_Density by Bank × PD_Band
Scatter chart: RWA_Density (Y) vs Avg_PD (X) per bank
Add reference line for your bank
Quartile ranking formula:
= QUARTILE(RWA_Density_range, 1) → bottom quartile flag
```

**LGD Benchmark Comparison**

```
Sheet: LGD_Benchmark
Column A: Segment (e.g., "Senior Secured — Real Estate")
Column B: N_Exposures_Internal
Column C: Internal_LGD_%
Column D: Moodys_URD_Recovery_%
Column E: Moodys_URD_LGD_Equiv = 1 - D
Column F: Internal_vs_External = C - E
Column G: Adjustment_Basis (explanation of systematic difference)
Column H: Adjusted_Benchmark_LGD (after applying documented adjustments)
Column I: Residual_Gap = C - H
Column J: Assessment = IF(ABS(I) > 15%, "Material — Investigate", 
                         IF(ABS(I) > 10%, "Monitor", "Acceptable"))
```

---

## 9. SQL Implementation

```sql
-- ============================================================
-- M28: BENCHMARKING SUITE
-- ============================================================

-- Step 1: Internal model output summary by grade
-- (Foundation for all benchmarking comparisons)
CREATE TABLE #InternalModelSummary AS
SELECT
    r.risk_grade,
    COUNT(DISTINCT r.obligor_id)                        AS n_obligors,
    SUM(f.ead)                                          AS total_ead,
    AVG(r.predicted_pd)                                 AS avg_pd,
    AVG(r.predicted_lgd)                                AS avg_lgd,
    AVG(r.predicted_lgd * r.predicted_pd)               AS avg_el_rate,
    SUM(f.rwa)                                          AS total_rwa,
    SUM(f.rwa) * 1.0 / NULLIF(SUM(f.ead), 0)          AS rwa_density
FROM dbo.RatingHistory r
JOIN dbo.FacilityRWA f ON f.obligor_id = r.obligor_id
    AND f.snapshot_date = r.rating_date
WHERE r.rating_date = '2023-12-31'
GROUP BY r.risk_grade;

-- Step 2: Grade-to-Moody's mapping for rated obligors
-- (Uses sub-portfolio of obligors with external ratings)
WITH RatedObligors AS (
    SELECT
        r.obligor_id,
        r.risk_grade,
        r.predicted_pd,
        ext.moodys_rating,
        ext.sp_rating,
        ext.rating_date AS external_rating_date
    FROM dbo.RatingHistory r
    JOIN dbo.ExternalRatings ext
        ON ext.obligor_id = r.obligor_id
        AND DATEDIFF(MONTH, r.rating_date, ext.rating_date) BETWEEN -3 AND 0
    WHERE r.rating_date = '2023-12-31'
      AND ext.moodys_rating IS NOT NULL
),
MappingStats AS (
    SELECT
        risk_grade,
        COUNT(*)                                        AS n_rated_obligors,
        AVG(predicted_pd)                               AS avg_internal_pd,
        -- Most common Moody's rating (modal rating)
        (
            SELECT TOP 1 moodys_rating
            FROM RatedObligors r2
            WHERE r2.risk_grade = ro.risk_grade
            GROUP BY moodys_rating
            ORDER BY COUNT(*) DESC
        )                                               AS modal_moodys_rating,
        -- Median internal PD vs external
        PERCENTILE_CONT(0.50) WITHIN GROUP
            (ORDER BY predicted_pd)                     AS median_internal_pd
    FROM RatedObligors ro
    GROUP BY risk_grade
)
SELECT
    ms.*,
    -- Join to external benchmark table (pre-loaded from Moody's Annual Study)
    mb.long_run_avg_dr                                  AS moodys_lr_dr,
    mb.lr_dr_95ci_lower,
    mb.lr_dr_95ci_upper,
    ms.avg_internal_pd - mb.long_run_avg_dr             AS pd_divergence_abs,
    (ms.avg_internal_pd - mb.long_run_avg_dr)
    / NULLIF(mb.long_run_avg_dr, 0) * 100              AS pd_divergence_pct,
    CASE
        WHEN ms.avg_internal_pd < mb.lr_dr_95ci_lower
        THEN 'BELOW CI — potentially aggressive calibration'
        WHEN ms.avg_internal_pd > mb.lr_dr_95ci_upper
        THEN 'ABOVE CI — conservative; may be excessive'
        ELSE 'WITHIN CI — acceptable'
    END AS benchmark_assessment
FROM MappingStats ms
JOIN dbo.MoodysDefaultRatesBenchmark mb
    ON mb.moodys_rating = ms.modal_moodys_rating
ORDER BY risk_grade;

-- Step 3: Pillar 3 peer comparison — RWA density by PD band
-- (Load peer data from manually compiled Pillar 3 extract)
WITH InternalBands AS (
    SELECT
        CASE
            WHEN avg_pd < 0.005 THEN '1. 0-0.5%'
            WHEN avg_pd < 0.02  THEN '2. 0.5-2%'
            WHEN avg_pd < 0.10  THEN '3. 2-10%'
            ELSE '4. 10%+'
        END AS pd_band,
        SUM(total_ead)          AS internal_ead,
        AVG(avg_pd)             AS internal_avg_pd,
        AVG(avg_lgd)            AS internal_avg_lgd,
        SUM(total_rwa)          AS internal_rwa,
        SUM(total_rwa) * 1.0 / NULLIF(SUM(total_ead), 0) AS internal_rwa_density
    FROM #InternalModelSummary
    GROUP BY
        CASE
            WHEN avg_pd < 0.005 THEN '1. 0-0.5%'
            WHEN avg_pd < 0.02  THEN '2. 0.5-2%'
            WHEN avg_pd < 0.10  THEN '3. 2-10%'
            ELSE '4. 10%+'
        END
),
PeerBenchmark AS (
    SELECT
        pd_band,
        COUNT(DISTINCT bank_name)                   AS n_peers,
        MIN(rwa_density)                            AS peer_rwa_density_min,
        PERCENTILE_CONT(0.25)
            WITHIN GROUP (ORDER BY rwa_density)    AS peer_rwa_density_p25,
        PERCENTILE_CONT(0.50)
            WITHIN GROUP (ORDER BY rwa_density)    AS peer_rwa_density_median,
        PERCENTILE_CONT(0.75)
            WITHIN GROUP (ORDER BY rwa_density)    AS peer_rwa_density_p75,
        MAX(rwa_density)                            AS peer_rwa_density_max
    FROM dbo.Pillar3PeerData
    WHERE reporting_date = '2023-12-31'
      AND exposure_class = 'CORPORATE'
    GROUP BY pd_band
)
SELECT
    ib.pd_band,
    ROUND(ib.internal_rwa_density, 4)              AS our_rwa_density,
    ROUND(pb.peer_rwa_density_p25, 4)              AS peer_p25,
    ROUND(pb.peer_rwa_density_median, 4)           AS peer_median,
    ROUND(pb.peer_rwa_density_p75, 4)              AS peer_p75,
    -- Quartile position
    CASE
        WHEN ib.internal_rwa_density < pb.peer_rwa_density_p25
        THEN 'BOTTOM QUARTILE — significantly below peers'
        WHEN ib.internal_rwa_density < pb.peer_rwa_density_median
        THEN 'BELOW MEDIAN'
        WHEN ib.internal_rwa_density < pb.peer_rwa_density_p75
        THEN 'ABOVE MEDIAN'
        ELSE 'TOP QUARTILE'
    END AS peer_position,
    pb.n_peers
FROM InternalBands ib
JOIN PeerBenchmark pb ON pb.pd_band = ib.pd_band
ORDER BY ib.pd_band;

-- Step 4: Internal vs Challenger model comparison (e.g., Moody's RiskCalc)
WITH ModelComparison AS (
    SELECT
        o.obligor_id,
        r.risk_grade                    AS internal_grade,
        r.predicted_pd                  AS internal_pd,
        ch.challenger_pd                AS challenger_pd,
        ch.challenger_grade             AS challenger_grade,
        d.default_flag                  AS actual_default,
        -- Divergence metrics
        r.predicted_pd - ch.challenger_pd AS pd_difference,
        ABS(r.predicted_pd - ch.challenger_pd) AS abs_pd_difference,
        CASE
            WHEN r.predicted_pd > ch.challenger_pd * 1.5 THEN 'INTERNAL MUCH HIGHER'
            WHEN r.predicted_pd > ch.challenger_pd * 1.1 THEN 'INTERNAL HIGHER'
            WHEN r.predicted_pd < ch.challenger_pd * 0.67 THEN 'INTERNAL MUCH LOWER'
            WHEN r.predicted_pd < ch.challenger_pd * 0.90 THEN 'INTERNAL LOWER'
            ELSE 'BROADLY CONSISTENT'
        END AS divergence_category
    FROM dbo.Obligors o
    JOIN dbo.RatingHistory r
        ON r.obligor_id = o.obligor_id AND r.rating_date = '2023-12-31'
    JOIN dbo.ChallengerModelOutputs ch
        ON ch.obligor_id = o.obligor_id AND ch.model_date = '2023-12-31'
    LEFT JOIN dbo.DefaultIndicators d
        ON d.obligor_id = o.obligor_id AND d.obs_date = '2023-12-31'
)
SELECT
    divergence_category,
    COUNT(*)                                AS n_obligors,
    AVG(internal_pd)                        AS avg_internal_pd,
    AVG(challenger_pd)                      AS avg_challenger_pd,
    AVG(internal_pd - challenger_pd)        AS avg_pd_diff,
    SUM(CAST(actual_default AS INT)) * 1.0
        / NULLIF(COUNT(*), 0)              AS observed_dr
FROM ModelComparison
GROUP BY divergence_category
ORDER BY divergence_category;
```

---

## 10. Python Implementation

```python
# ============================================================
# M28: BENCHMARKING SUITE — PYTHON IMPLEMENTATION
# ============================================================
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from scipy import stats
from sklearn.metrics import roc_auc_score
import warnings
warnings.filterwarnings('ignore')

# ============================================================
# Moody's / S&P External Default Rate Reference Data
# (Long-run averages from Moody's Annual Default Study)
# ============================================================
MOODYS_LR_DEFAULT_RATES = {
    'Aaa': {'lr_dr': 0.0000, 'ci_lo': 0.0000, 'ci_hi': 0.0002},
    'Aa':  {'lr_dr': 0.0002, 'ci_lo': 0.0001, 'ci_hi': 0.0005},
    'A':   {'lr_dr': 0.0005, 'ci_lo': 0.0003, 'ci_hi': 0.0009},
    'Baa': {'lr_dr': 0.0018, 'ci_lo': 0.0012, 'ci_hi': 0.0027},
    'Ba':  {'lr_dr': 0.0119, 'ci_lo': 0.0090, 'ci_hi': 0.0156},
    'B':   {'lr_dr': 0.0436, 'ci_lo': 0.0380, 'ci_hi': 0.0498},
    'Caa': {'lr_dr': 0.1416, 'ci_lo': 0.1280, 'ci_hi': 0.1563},
}

MOODYS_LGD_BENCHMARKS = {
    'Senior Secured — First Lien':       {'recovery_rate': 0.700, 'lgd': 0.300, 'std': 0.32},
    'Senior Secured — Second Lien':      {'recovery_rate': 0.550, 'lgd': 0.450, 'std': 0.35},
    'Senior Unsecured':                  {'recovery_rate': 0.405, 'lgd': 0.595, 'std': 0.36},
    'Senior Subordinated':               {'recovery_rate': 0.330, 'lgd': 0.670, 'std': 0.37},
    'Subordinated':                      {'recovery_rate': 0.280, 'lgd': 0.720, 'std': 0.38},
    'Junior Subordinated':               {'recovery_rate': 0.150, 'lgd': 0.850, 'std': 0.30},
}

# ============================================================
# PD BENCHMARKING
# ============================================================
class PD_Benchmarker:
    """
    Compare internal model PD estimates to external benchmarks.
    """

    def __init__(self, grade_mapping: dict):
        """
        Parameters
        ----------
        grade_mapping : dict mapping internal_grade -> moodys_rating
            e.g., {1: 'Aaa', 2: 'Aa', 3: 'A', 4: 'Baa', ...}
        """
        self.grade_mapping = grade_mapping

    def benchmark_pd(self, internal_summary: pd.DataFrame) -> pd.DataFrame:
        """
        Compare internal PD to Moody's long-run default rates.

        Parameters
        ----------
        internal_summary : DataFrame with columns:
            grade, avg_pd, n_obligors, total_ead
        """
        results = []
        for _, row in internal_summary.iterrows():
            grade = row['grade']
            internal_pd = row['avg_pd']
            moodys_rating = self.grade_mapping.get(grade)

            if moodys_rating and moodys_rating in MOODYS_LR_DEFAULT_RATES:
                ext = MOODYS_LR_DEFAULT_RATES[moodys_rating]
                lr_dr = ext['lr_dr']
                ci_lo = ext['ci_lo']
                ci_hi = ext['ci_hi']

                if lr_dr > 0:
                    divergence_pct = (internal_pd - lr_dr) / lr_dr * 100
                else:
                    divergence_pct = np.nan

                if internal_pd < ci_lo:
                    assessment = 'BELOW CI — Potentially aggressive'
                    colour = '#e74c3c'
                elif internal_pd > ci_hi:
                    assessment = 'ABOVE CI — Conservative'
                    colour = '#3498db'
                else:
                    assessment = 'Within CI — Acceptable'
                    colour = '#2ecc71'
            else:
                lr_dr = ci_lo = ci_hi = divergence_pct = np.nan
                assessment = 'No mapping'
                colour = '#95a5a6'

            results.append({
                'Grade': grade,
                'N_Obligors': row.get('n_obligors', np.nan),
                'Internal_PD_%': round(internal_pd * 100, 3),
                'Moody_Rating': moodys_rating,
                'Moodys_LR_DR_%': round(lr_dr * 100, 3) if not np.isnan(lr_dr) else np.nan,
                'Moodys_95CI_Lo_%': round(ci_lo * 100, 3) if not np.isnan(ci_lo) else np.nan,
                'Moodys_95CI_Hi_%': round(ci_hi * 100, 3) if not np.isnan(ci_hi) else np.nan,
                'Divergence_%': round(divergence_pct, 1) if not np.isnan(divergence_pct) else np.nan,
                'Assessment': assessment,
                '_colour': colour
            })

        df = pd.DataFrame(results)
        return df

    def plot_pd_benchmark(self, benchmark_df: pd.DataFrame,
                           title: str = 'PD Benchmark — Internal vs Moody\'s') -> None:
        """Visualise PD benchmark comparison."""
        df = benchmark_df.copy().dropna(subset=['Moodys_LR_DR_%'])
        x = np.arange(len(df))

        fig, ax = plt.subplots(figsize=(12, 6))

        # Internal PD bars
        bars = ax.bar(x - 0.2, df['Internal_PD_%'], 0.35,
                       label='Internal Model PD', color='#3498db', alpha=0.8)

        # Moody's DR bars
        bars2 = ax.bar(x + 0.2, df['Moodys_LR_DR_%'], 0.35,
                        label="Moody's LR Default Rate", color='#95a5a6', alpha=0.8)

        # 95% CI error bars on Moody's
        ci_lo = df['Moodys_95CI_Lo_%'].values
        ci_hi = df['Moodys_95CI_Hi_%'].values
        moodys_vals = df['Moodys_LR_DR_%'].values
        ax.errorbar(x + 0.2, moodys_vals,
                     yerr=[moodys_vals - ci_lo, ci_hi - moodys_vals],
                     fmt='none', color='black', capsize=4, linewidth=1.5,
                     label="Moody's 95% CI")

        # Colour bars by assessment
        for i, (bar, colour) in enumerate(zip(bars, df['_colour'])):
            bar.set_edgecolor(colour)
            bar.set_linewidth(2.5)

        ax.set_xticks(x)
        ax.set_xticklabels([f"G{g}\n({r})" for g, r in
                             zip(df['Grade'], df['Moody_Rating'])],
                            fontsize=9)
        ax.set_ylabel('Default Rate / PD (%)', fontsize=12)
        ax.set_title(title, fontsize=14)
        ax.legend(fontsize=10)
        ax.grid(axis='y', alpha=0.3)

        # Annotation for flagged grades
        for i, (_, row) in enumerate(df.iterrows()):
            if 'aggressive' in row['Assessment'].lower():
                ax.annotate('!', xy=(x[i] - 0.2, row['Internal_PD_%']),
                             fontsize=14, color='red', ha='center', va='bottom')

        plt.tight_layout()
        plt.savefig('pd_benchmark.png', dpi=150, bbox_inches='tight')
        plt.show()


# ============================================================
# LGD BENCHMARKING
# ============================================================
class LGD_Benchmarker:
    """Compare internal LGD estimates to Moody's URD benchmarks."""

    def benchmark_lgd(self, internal_lgd_by_segment: dict,
                       adjustments: dict = None) -> pd.DataFrame:
        """
        Parameters
        ----------
        internal_lgd_by_segment : dict mapping segment_name -> internal_lgd
        adjustments : dict mapping segment_name -> adjustment_factor
            (e.g., bank loans typically have better recovery than bonds → +0.10)
        """
        if adjustments is None:
            adjustments = {}

        results = []
        for segment, internal_lgd in internal_lgd_by_segment.items():
            if segment in MOODYS_LGD_BENCHMARKS:
                ext = MOODYS_LGD_BENCHMARKS[segment]
                external_lgd = ext['lgd']
                # Apply documented adjustment
                adj = adjustments.get(segment, 0)
                adjusted_benchmark = max(0, external_lgd - adj)

                divergence = internal_lgd - adjusted_benchmark

                if abs(divergence) > 0.15:
                    assessment = 'MATERIAL DIVERGENCE — Investigation required'
                elif abs(divergence) > 0.10:
                    assessment = 'MODERATE DIVERGENCE — Monitor'
                else:
                    assessment = 'WITHIN TOLERANCE — Acceptable'

                results.append({
                    'Segment': segment,
                    'Internal_LGD': round(internal_lgd, 4),
                    'Moodys_URD_LGD': round(external_lgd, 4),
                    'Documented_Adjustment': round(adj, 4),
                    'Adjusted_Benchmark_LGD': round(adjusted_benchmark, 4),
                    'Divergence': round(divergence, 4),
                    'Divergence_%': round(divergence / adjusted_benchmark * 100, 1)
                        if adjusted_benchmark > 0 else np.nan,
                    'Assessment': assessment,
                    'Direction': ('INTERNAL LOWER — may understate losses'
                                  if divergence < -0.10 else
                                  'INTERNAL HIGHER — conservative'
                                  if divergence > 0.10 else 'Reasonable')
                })

        return pd.DataFrame(results)


# ============================================================
# CHALLENGER MODEL COMPARISON
# ============================================================
class ChallengerModelComparison:
    """
    Compare internal model to a challenger model.
    Assesses correlation, grade migration, and discriminatory power.
    """

    def __init__(self, internal_pd: np.ndarray, challenger_pd: np.ndarray,
                 default_flag: np.ndarray):
        self.internal = np.asarray(internal_pd)
        self.challenger = np.asarray(challenger_pd)
        self.defaults = np.asarray(default_flag)

    def correlation_analysis(self) -> dict:
        """Compute correlation metrics between models."""
        pearson_r, pearson_p = stats.pearsonr(
            np.log(self.internal + 1e-6),
            np.log(self.challenger + 1e-6)
        )
        spearman_r, spearman_p = stats.spearmanr(self.internal, self.challenger)

        return {
            'pearson_r_log_pd': round(pearson_r, 4),
            'pearson_p': round(pearson_p, 6),
            'spearman_r': round(spearman_r, 4),
            'spearman_p': round(spearman_p, 6),
            'mean_internal_pd': round(np.mean(self.internal), 5),
            'mean_challenger_pd': round(np.mean(self.challenger), 5),
            'pct_internal_higher': round(np.mean(self.internal > self.challenger), 4),
        }

    def discriminatory_power_comparison(self) -> dict:
        """Compare AUC of internal vs challenger model."""
        if self.defaults.sum() < 10:
            return {'error': 'Insufficient defaults for AUC comparison'}

        auc_internal = roc_auc_score(self.defaults, self.internal)
        auc_challenger = roc_auc_score(self.defaults, self.challenger)

        return {
            'AUC_internal': round(auc_internal, 4),
            'Gini_internal': round(2 * auc_internal - 1, 4),
            'AUC_challenger': round(auc_challenger, 4),
            'Gini_challenger': round(2 * auc_challenger - 1, 4),
            'Preferred_model': 'INTERNAL' if auc_internal >= auc_challenger else 'CHALLENGER',
            'AUC_difference': round(auc_internal - auc_challenger, 4)
        }

    def plot_challenger_scatter(self) -> None:
        """Scatter plot of internal vs challenger PD (log scale)."""
        fig, ax = plt.subplots(figsize=(8, 8))

        # Colour by default outcome
        colours = np.where(self.defaults == 1, '#e74c3c', '#3498db')
        alpha = np.where(self.defaults == 1, 0.8, 0.3)

        for i in range(len(self.internal)):
            ax.scatter(self.challenger[i] * 100, self.internal[i] * 100,
                        c=colours[i], alpha=alpha[i], s=15)

        # 45-degree line (perfect agreement)
        lim = max(np.max(self.internal), np.max(self.challenger)) * 100 * 1.05
        ax.plot([0, lim], [0, lim], 'k--', linewidth=1, label='Perfect agreement')

        ax.set_xscale('log')
        ax.set_yscale('log')
        ax.set_xlabel('Challenger Model PD (%)', fontsize=12)
        ax.set_ylabel('Internal Model PD (%)', fontsize=12)
        ax.set_title('Internal vs Challenger Model PD Comparison', fontsize=14)

        # Legend
        default_patch = mpatches.Patch(color='#e74c3c', label='Defaulted')
        non_default_patch = mpatches.Patch(color='#3498db', alpha=0.5, label='Non-defaulted')
        ax.legend(handles=[default_patch, non_default_patch])
        ax.grid(alpha=0.3)

        plt.tight_layout()
        plt.savefig('challenger_comparison.png', dpi=150, bbox_inches='tight')
        plt.show()


# ============================================================
# PILLAR 3 PEER BENCHMARKING
# ============================================================
class Pillar3Benchmarker:
    """
    Load and analyse Pillar 3 peer disclosures.
    Compare RWA density, average PD, average LGD across peers.
    """

    def __init__(self, peer_data: pd.DataFrame, bank_name: str = 'Our Bank'):
        """
        peer_data: DataFrame with columns:
            bank_name, pd_band, ead, avg_pd, avg_lgd, rwa_density
        """
        self.peer_data = peer_data
        self.bank_name = bank_name

    def rwa_density_comparison(self) -> pd.DataFrame:
        """Compare RWA density to peer quartiles by PD band."""
        our_data = self.peer_data[self.peer_data['bank_name'] == self.bank_name]
        peers = self.peer_data[self.peer_data['bank_name'] != self.bank_name]

        peer_stats = peers.groupby('pd_band')['rwa_density'].agg(
            peer_min='min',
            peer_p25=lambda x: np.percentile(x, 25),
            peer_median='median',
            peer_p75=lambda x: np.percentile(x, 75),
            peer_max='max',
            n_peers='count'
        ).reset_index()

        result = our_data[['pd_band', 'rwa_density']].rename(
            columns={'rwa_density': 'our_rwa_density'}
        ).merge(peer_stats, on='pd_band', how='left')

        def quartile_pos(row):
            if row['our_rwa_density'] < row['peer_p25']:
                return 'BOTTOM QUARTILE'
            elif row['our_rwa_density'] < row['peer_median']:
                return 'LOWER HALF'
            elif row['our_rwa_density'] < row['peer_p75']:
                return 'UPPER HALF'
            else:
                return 'TOP QUARTILE'

        result['peer_position'] = result.apply(quartile_pos, axis=1)
        return result

    def generate_benchmarking_heatmap(self) -> None:
        """Generate heat map of peer positions across PD bands."""
        comparison = self.rwa_density_comparison()

        colour_map = {
            'BOTTOM QUARTILE': '#e74c3c',
            'LOWER HALF': '#f39c12',
            'UPPER HALF': '#2ecc71',
            'TOP QUARTILE': '#27ae60'
        }

        fig, ax = plt.subplots(figsize=(10, 4))
        for i, (_, row) in enumerate(comparison.iterrows()):
            colour = colour_map.get(row['peer_position'], '#95a5a6')
            ax.barh(0, 1, left=i, color=colour, alpha=0.8,
                     edgecolor='white', linewidth=2)
            ax.text(i + 0.5, 0, f"Band {row['pd_band']}\n{row['peer_position']}\n"
                                   f"RWA:{row['our_rwa_density']:.1%}",
                    ha='center', va='center', fontsize=9, color='white', fontweight='bold')

        ax.set_xlim(0, len(comparison))
        ax.set_yticks([])
        ax.set_xticks([])
        ax.set_title('Pillar 3 Peer Comparison — RWA Density Position by PD Band',
                      fontsize=12)
        plt.tight_layout()
        plt.savefig('pillar3_heatmap.png', dpi=150, bbox_inches='tight')
        plt.show()
```

---

## 11. Interview Questions

**Junior/Mid Level**

1. **What is the difference between backtesting and benchmarking?**
   Backtesting compares a model's past predictions to actual outcomes (internal data). Benchmarking compares model outputs to external references (Moody's/S&P rates, peer bank disclosures) to assess plausibility. Backtesting requires historical outcome data; benchmarking does not. For LDP portfolios with no internal defaults, benchmarking is the primary validation tool.

2. **What is the Moody's Annual Default Study and how is it used in PD benchmarking?**
   Moody's publishes historical 1-year and multi-year default rates by letter rating (Aaa through C), going back to 1920. These long-run average default rates serve as external calibration benchmarks: a bank's Grade 5 (mapped to Ba equivalent) should have a PD reasonably consistent with Moody's long-run Ba default rate of ~1.2%. Significant divergence without explanation raises regulatory and audit concerns.

3. **Your bank's senior secured LGD model produces 25%. Moody's URD shows 30% for senior secured. Is this a finding?**
   Possibly not. Bank loans are typically senior secured with tighter covenants and priority claim relative to bonds in the Moody's URD. The bank should document this structural difference as a documented adjustment. If the adjusted benchmark is, say, 25% (after a 5% adjustment for bank loan advantage), and the internal estimate is also 25%, the divergence is explained. If the internal estimate is 15% (still below even after adjustment), that is a finding.

**Senior Level**

4. **Describe the EBA/ECB benchmarking exercise and how a bank should prepare for it.**
   Under CRR Article 78, the EBA annually publishes a benchmarking report comparing IRB bank outputs for standardised hypothetical portfolios. Banks submit PD, LGD, and EAD estimates for the prescribed portfolio to their national regulator. Results are compared across the EU banking system. Banks outside the interquartile range receive supervisory inquiry. Preparation: (a) run the hypothetical portfolio through your internal models; (b) benchmark the outputs against prior-year published distributions; (c) prepare documentation for any outlier grades; (d) ensure model scope covers the required exposure classes.

5. **A peer bank's Pillar 3 shows RWA density of 82% for BB-rated corporate exposures. Your bank shows 54%. The model head argues this reflects better credit quality. How do you assess this?**
   Legitimate explanations: (a) better credit quality (lower PD within the BB band), (b) lower LGD (better collateralised), (c) shorter maturity M (maturity adjustment reduces capital), (d) different definition of "BB-rated" (different internal grade mapping). Investigation: compare average PD, average LGD, and average M for the BB band at both banks (if disclosed). If PD, LGD, and M are similar but RWA density is 28pp lower, the RWA formula inputs must differ — investigate the EAD calculation (CRM, netting) or the correlation assumption. A 28pp RWA density gap with no compositional explanation is a material finding.

---

## 12. Common Mistakes

1. **Mapping Internal Grades to External Ratings by Name Rather Than by PD Level**: Calling Grade 5 "BB equivalent" because it sounds right, rather than matching PD levels, introduces systematic mapping errors. The mapping should be based on quantitative PD matching, validated against the rated-obligor sub-portfolio.

2. **Using Moody's Data Without Adjusting for Systemic Differences**: Moody's default rate series includes the Great Depression (1930s) and multiple deep recessions. A bank benchmarking against the full 100-year series may be comparing against a very different economic regime. Best practice: use both the full long-run series and a post-1980 series.

3. **Treating Benchmark Divergence as Always a Problem**: If the bank lends primarily to senior secured positions with strict covenants, lower LGD than unsecured bond benchmarks is expected and appropriate. Divergence must be explained, not eliminated — and sometimes the internal model is correctly capturing a portfolio characteristic that the benchmark does not.

4. **Not Documenting the Benchmarking Methodology**: If the benchmarking approach is ad hoc and undocumented, a validator or regulator cannot assess whether it is appropriate. The benchmarking methodology — data sources, mapping approach, divergence thresholds, escalation criteria — must be documented in policy.

5. **Using Outdated Benchmark Data**: Moody's and S&P publish annual updates. Using a 2015 study in a 2024 review misses important default cycle data. Benchmarking should always reference the most recently published annual study.

---

## 13. Case Studies

**Case Study 1: The ECB Benchmarking Outlier**

During the EBA/ECB 2022 benchmarking exercise, a mid-sized European bank submitted PD estimates for the hypothetical large corporate portfolio that were 60% below the 25th percentile of peers for the Ba-equivalent grade. The ECB's supervisory team wrote to the bank requesting explanation. The bank's initial response ("our credit selection is better") was not accepted without supporting evidence. Upon investigation, the bank discovered that its internal grade mapping was flawed: its Grade 4 (which it had mapped to Ba) actually corresponded to a Baa2 portfolio based on obligor-level PD comparison to Moody's ratings. Correcting the mapping brought PDs to within the peer range. Capital requirements increased by approximately 8%.

**Case Study 2: The Useful Challenger**

A UK bank's internal PD model gave a Gini of 0.62 on development. A challenger model (Moody's RiskCalc) gave a Gini of 0.58 on the same sample. Validators initially concluded the internal model was better. However, deeper analysis of the 2020 out-of-time period showed internal Gini of 0.48 vs. challenger Gini of 0.54. The challenger performed better in stress conditions because it included a macroeconomic input that the internal model lacked. The validation recommendation: adopt the internal model for normal conditions pricing but overlay a macroeconomic adjustment derived from the challenger for IFRS 9 stage assessment.

---

## 14. Iterative Reinforcement

**Week 1**: Download Moody's free executive summary (Annual Default Study). Build the grade mapping table manually. Calculate whether your hypothetical bank's grade PDs fall within Moody's 95% CIs.

**Week 2**: Pull three peer banks' Pillar 3 CR6 tables (any major UK or European bank). Build the RWA density comparison table. Identify which PD band shows the most peer divergence.

**Week 3**: Write a 500-word benchmarking section for a model validation report. Cover: data sources, mapping approach, key findings, and recommended actions.

**Exam Questions**:
1. A bank's Grade 3 PD (mapped to Baa equivalent) is 0.04%. Moody's long-run Baa DR is 0.18% with 95% CI of [0.12%, 0.27%]. Is this a finding? What further information would you need to conclude?
2. You are benchmarking LGD for a portfolio of unsecured corporate loans. Internal average LGD = 55%. Moody's URD senior unsecured LGD = 59.5%. Is there a material divergence? What documented adjustments might explain the difference?
3. Describe the ECB benchmarking exercise under CRR Article 78, including who participates, what data is submitted, how results are used, and what happens to outlier banks.

---

## 15. Source Material

- Moody's Investors Service: *Annual Default Study: Corporate Default and Recovery Rates* (annual publication)
- S&P Global Ratings: *Annual Global Corporate Default and Rating Transition Study* (annual)
- Moody's: *Ultimate Recovery Database Methodology* (technical note)
- EBA: *Report on benchmarking of internal models* (annual, under CRR Article 78)
- ECB: *TRIM — Guide to Internal Models* (2019), Chapter on benchmarking and benchmarking exercises
- CRR Article 78: Supervisory benchmarking exercise legal basis
- EBA/GL/2017/07 (2017): Section 5.2 — Use of external data for LDP PD estimation
- Altman, E.I. & Kuehne, B. (2011). "Defaults and Returns in the High Yield Bond Market." NYU Salomon Center Working Paper
- BIS Working Paper No. 608: *How do banks' strategies influence financial cycles?* — context for cross-bank RWA comparison
- Pillar 3 reports: Available on investor relations pages of HSBC, Barclays, BNP Paribas, Deutsche Bank, Santander (freely downloadable)
