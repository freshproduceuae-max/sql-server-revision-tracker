# M35 — Regulatory Examinations

## 1. Business Purpose

Regulatory examinations are formal supervisory inspections conducted by the PRA (UK), ECB/SSM (Eurozone), or other national competent authorities (NCAs) to assess whether a bank is operating safely and soundly. For credit risk, they represent the external verification of everything the bank claims about its models, processes, and capital adequacy.

**Why regulatory examinations matter:**

*Capital implications:* The most direct business consequence of a regulatory examination of credit risk is a Pillar 2A capital add-on. If the PRA finds that a bank's IRB models are insufficiently conservative (underestimating PD, underestimating LGD, or overstating recoveries), they can require: (1) immediate model fixes with higher capital estimates, (2) temporary add-ons pending fix, or (3) removal of IRB permission and reversion to standardised approach. All three increase capital requirements, reducing the bank's ability to lend or return capital to shareholders.

*Reputational consequences:* Significant regulatory findings in credit risk are sometimes disclosed in the PRA's published enforcement notices or inferred from public Pillar 3 disclosures. Banks that are found to have material weaknesses in credit risk management face reputational damage with investors, rating agencies, and counterparties.

*Operational burden:* Responding to a regulatory examination — especially an on-site inspection lasting 6-12 weeks — is resource-intensive. Credit risk teams spend significant time responding to regulator requests for information (RFIs), preparing documentation, and participating in interviews. Post-inspection remediation can consume substantial management bandwidth for 12-24 months.

*Behavioural change:* The prospect of regulatory examination drives improvements in credit risk management that would not occur otherwise. Banks invest in data quality, model validation, documentation, and governance partly because they know these will be scrutinised. This is the regulatory deterrence effect.

*Strategic planning:* Senior management and the Board must factor regulatory risk into capital planning. If a credit portfolio carries model risk that may attract Pillar 2A add-ons in the next supervisory cycle, capital plans must include a buffer for that risk.

---

## 2. Accounting Concepts

**Regulator Focus on ECL**

Regulators examine IFRS 9 provisioning as part of credit examinations because: (1) ECL directly affects reported capital (CET1 shortfall/excess calculation); (2) ECL involves the most significant management judgements in bank financial reporting; (3) inadequate provisioning can mask the true financial position and mislead investors.

Key regulatory concerns around ECL accounting:
- **Stage 2 migration:** Are banks identifying SICR accurately? Under-staging (keeping loans in Stage 1 when they should be Stage 2) understates ECL and the provision charge.
- **Scenario weights:** Are the weights assigned to adverse scenarios sufficient? Overly optimistic scenario weights (e.g., 5% weight to a severe downside) understate ECL.
- **LGD assumptions in ECL:** Are LGD inputs to ECL models based on appropriate downturn recovery data, or on recent benign period data?
- **Management overlays:** Do overlays represent genuine forward-looking assessments, or do they smooth earnings by reducing model-derived ECL?

**Joint PRA/FRC Letter on IFRS 9 (periodic)**

The PRA and FRC (Financial Reporting Council) periodically publish joint letters to CFOs of major UK banks setting out supervisory expectations for IFRS 9 application. These letters identify specific areas where they have found ECL methodology to be inadequate and set expectations for improvement. Credit risk teams should review these letters upon publication and assess their methodology against the concerns raised.

---

## 3. Financial Concepts

**SREP (Supervisory Review and Evaluation Process)**

The SREP is the annual comprehensive supervisory assessment conducted by the PRA (for UK banks) and SSM (for significant institutions in the Eurozone). It covers four elements:
1. Business model assessment (is the business model viable?)
2. Internal governance and risk management assessment
3. Risk to capital (credit risk, market risk, operational risk, IRRBB)
4. Risk to liquidity (LCR adequacy, NSFR, funding plan)

The SREP output is the Total Capital Requirement (TCR) = Pillar 1 + Pillar 2A. For credit risk, P2A adds capital for risks not in Pillar 1 (concentration risk, underestimated model parameters, etc.). Changes in P2A from year to year signal changing supervisory assessment of credit risk quality.

**Targeted Review of Internal Models (TRIM)**

TRIM (2016-2019) was the ECB's largest supervisory initiative, reviewing IRB models at 65 significant EU institutions through on-site inspections. For credit risk, TRIM focused on:
- PD estimation methodology (TTC vs PIT, data representativeness, calibration test)
- LGD estimation (downturn adjustment, incomplete workouts, collateral haircuts)
- EAD/CCF estimation (completeness, reference data quality)
- Model governance (documentation, validation, change management)
- Data quality (completeness, accuracy, appropriateness of reference datasets)

TRIM outcomes: average RWA increase of 12% for affected credit portfolios, driven by required LGD uplifts and PD adjustments. Some banks were required to switch from A-IRB to F-IRB for specific asset classes.

**Pillar 2 Add-on Setting**

The P2A add-on process works as follows:
1. PRA assesses each risk category using its SREP methodology
2. For credit risk: PRA assesses Pillar 1 adequacy (does the IRB model capture all material risk?), concentration risk add-on, model risk add-on
3. P2A = sum of undercapture in each risk category
4. P2A is set as a minimum (hard requirement) — the bank must hold P2A capital above Pillar 1 at all times
5. Banks are notified of their P2A privately (published aggregate distributions, not firm-specific, in PRA publications)

---

## 4. Statistical Concepts

**ECB On-Site Inspection Sampling**

On-site inspectors use statistical sampling to test credit file quality and model performance. Common methods:
- *Monetary unit sampling (MUS):* Probabilistic sampling proportional to EAD — larger exposures have proportionally higher probability of selection. Ensures coverage of material exposures.
- *Stratified random sampling:* Portfolio divided into strata (by sector, grade, size) and inspectors sample within each stratum. Tests both large and small exposures.
- *Judgement sampling:* Inspectors identify specific "high-risk" files to review (recently downgraded credits, credits with covenant breaches, sectoral concentrations) in addition to random sample.

**IRB Parameter Validation Statistics**

Inspectors apply specific statistical tests to assess IRB parameter calibration:

*PD Calibration — Traffic Light Approach (Basel BCBS WP 14):*
- Green: Actual default rate within normal statistical variation of predicted PD
- Yellow: Actual default rate statistically elevated above predicted PD (p < 0.05 one-sided binomial test)
- Red: Actual default rate significantly above predicted PD (p < 0.01) — model recalibration required

*LGD Back-test:*
- Compare predicted LGD to realised LGD from completed workout cases
- Test whether mean realised LGD > mean predicted LGD (t-test or Wilcoxon signed-rank test)
- Test whether LGD model underestimates in downturn periods specifically (conditional on macro environment at time of default)

*Discriminatory Power (Gini / AUC):*
- Test whether PD model ranks-orders defaults vs. non-defaults correctly
- Gini coefficient (or AUC of ROC curve) below 0.60 for corporate PD models is a concern; >0.70 is acceptable; >0.80 is strong
- Regulators also assess stability of discriminatory power over time (stability of Gini across years)

---

## 5. Regulatory Framework

**PRA Supervisory Statement SS1/23 — Model Risk Management**

SS1/23 (effective May 2024) is the PRA's key supervisory document for model risk in UK banks, directly relevant to credit model examination. Five principles:
1. Model identification and model risk classification
2. Governance and model oversight (Board-level accountability)
3. Model development and implementation
4. Independent model validation
5. Model risk mitigants (use of management overlays, model adjustments, and compensating controls where models have known weaknesses)

In credit examinations, PRA inspectors assess compliance with each principle. The most common finding is insufficient independence between model development and model validation teams.

**ECB Guide to Internal Models (2019)**

The ECB published its Guide to Internal Models following TRIM, setting out ECB expectations for IRB model governance, data quality, and parameter estimation. This is now the operational standard for SSM inspections. Key chapters:
- Chapter 3: General topics (model governance, documentation, data requirements)
- Chapter 4: Credit risk — PD (estimation, calibration, back-testing)
- Chapter 5: Credit risk — LGD and EAD
- Chapter 6: Use test (models must be used in day-to-day decisions)

**EBA Regulatory Technical Standards (RTS) on IRB**

EBA has published binding RTS on IRB model requirements:
- EBA/RTS/2016/03: Assessment methodology for IRB
- EBA/GL/2017/16: PD and LGD estimation guidelines
- EBA/GL/2020/05: Credit risk mitigation in IRB

Inspectors assess compliance against these RTS as part of TRIM follow-up reviews.

**PRA Credit Risk Supervisory Statement SS13/16**

SS13/16 covers the IRB approach to credit risk for UK firms, including expectations for: the use test (IRB must be embedded in decision-making), the experience test (minimum data history requirements), and ongoing review and validation requirements.

---

## 6. Data Required

**What Regulators Request in a Credit Examination**

*Model documentation package:*
- Model design document (MDD) for each credit model (PD, LGD, EAD)
- Model validation report (most recent independent validation)
- Model change log (all changes to models in past 3 years)
- Model performance reports (back-test results, stability analysis)
- Model inventory (complete list of all credit models, owners, last validation date)

*Data quality evidence:*
- Data lineage documentation (where does each IRB input variable come from?)
- Data quality scorecards and exception reports
- Reference dataset description (what population was used to estimate the model?)

*Governance evidence:*
- Credit committee minutes (sample from past 12 months)
- Risk appetite statement and board approval
- Delegated authority matrix
- Model risk committee minutes

*Credit file sample:*
- Credit files for examiner-selected sample (typically 20-50 files)
- Covenant tracking records
- Annual review completion evidence
- Staging evidence (Stage 1/2/3 classification justification)

---

## 7. How Analysts Actually Work

**Pre-Inspection Preparation (Credit Risk Team)**

When notified of an on-site inspection (typically 4-6 weeks' notice), the credit risk function must:

1. **Identify the inspection scope:** The ECB or PRA will indicate whether the inspection covers IRB models, credit origination quality, provisioning, or all three. Each scope requires different preparation.

2. **Assemble documentation packages:** Gather all model documentation, validation reports, governance records. Create a "documentation library" that can be shared with inspectors via secure data room. Everything must be current and readily accessible — inability to provide requested documents creates a negative impression.

3. **Conduct a dry run:** Senior credit risk managers should review the documentation as if they were the regulator. Where would inspectors find gaps? Fix them before the inspection where possible.

4. **Brief all likely interviewees:** Inspectors will interview credit officers, risk model owners, validators, and potentially relationship managers. Interviewees should know the framework well, understand the models' limitations (honesty about limitations is valued more than defensive overclaiming), and be able to explain their role clearly.

5. **Prepare a senior management briefing package:** The CRO and CFO will need to attend sessions with senior inspectors. They need a briefing pack covering: portfolio metrics, capital position, model performance, recent governance improvements.

**During the Inspection**

- **Respond to RFIs promptly:** Inspectors submit Request for Information (RFI) notices. Timely, complete responses are essential. Late or incomplete responses extend the inspection timeline and suggest disorganisation.
- **Don't over-explain or speculate:** Answer what is asked. If you do not know the answer, say so and offer to provide it in writing. Speculating or volunteering negative information unnecessarily is unhelpful.
- **Coordinate centrally:** Designate a single point of contact (typically the Credit Risk Director or Head of Model Risk) to coordinate all inspector communications. Inconsistent answers from different team members create confusion and suspicion.
- **Track all commitments:** If you commit to providing a document by a certain date, deliver it. Missed commitments are noted in the inspection report.

**Post-Inspection — Draft Report Response**

The inspection team issues a draft report with preliminary findings. The bank typically has 4-6 weeks to respond. The response should:
- Acknowledge accurate findings and commit to specific, time-bound management actions
- Contest factually incorrect findings with evidence (not simply disagree)
- Provide context without excusing failures
- Senior management sign-off (CRO, typically) demonstrates appropriate ownership

---

## 8. Excel Implementation

**Regulatory Examination Readiness Tracker**

```
Sheet: Inspection_Readiness
Sections:
  A. Model Documentation
     - PD model MDD: [Last updated: DATE] [Status: CURRENT / REQUIRES UPDATE]
     - LGD model MDD: [Last updated: DATE] [Status: CURRENT / REQUIRES UPDATE]
     - Latest validation report: [Date] [All findings actioned? Y/N]
     - Model inventory: [Complete? Y/N] [Last updated: DATE]

  B. Data Quality
     - Data lineage documented for all IRB inputs: [Y/N]
     - Last data quality scorecard: [Date] [Issues outstanding: N]

  C. Credit File Quality (self-assessment sample)
     - Annual reviews current: [X% compliant]
     - Covenant tracking current: [X% compliant]
     - KYC current: [X% compliant]

  D. Governance
     - Risk appetite board-approved: [Date]
     - Credit committee minutes: [Available for past 24 months: Y/N]
     - DCA matrix current: [Date]

RAG STATUS: Score each section Green/Amber/Red
Overall readiness: X/12 sections Green
```

**TRIM / SS1/23 Compliance Gap Analysis**

```
Principle | Requirement | Evidence Required | Status | Gap | Priority
P1 | Model inventory complete | Model inventory spreadsheet | GREEN | None | -
P2 | Board risk appetite | BAC-approved MRA framework | AMBER | Not board-approved | HIGH
P3 | Development documentation | MDD for each model | RED | LGD model MDD >3yr old | CRITICAL
P4 | Validation independence | Org chart, validation team CVs | GREEN | None | -
P5 | Risk mitigants documented | Overlay documentation | AMBER | Inconsistent process | MEDIUM
```

---

## 9. SQL Implementation

```sql
-- =================================================================
-- Regulatory Examination Support — IRB Data Quality and Model Monitoring
-- =================================================================

-- 1. Model inventory completeness (for inspection)
SELECT
    m.model_id,
    m.model_name,
    m.asset_class,
    m.model_type,           -- PD, LGD, EAD
    m.implementation_date,
    m.last_major_change,
    -- Documentation status
    d.mdd_version,
    d.mdd_last_updated,
    DATEDIFF(MONTH, d.mdd_last_updated, GETDATE())  AS mdd_age_months,
    -- Validation status
    v.last_validation_date,
    DATEDIFF(MONTH, v.last_validation_date, GETDATE()) AS months_since_validation,
    v.validation_outcome,
    v.open_findings_count,
    -- Performance monitoring
    pm.last_monitoring_report,
    pm.gini_current,
    pm.pd_ratio_current,    -- actual DR / predicted PD
    -- RAG
    CASE
        WHEN d.mdd_age_months > 24
        THEN 'RED — MDD overdue update'
        WHEN DATEDIFF(MONTH, v.last_validation_date, GETDATE()) > 12
        THEN 'RED — Validation overdue'
        WHEN v.open_findings_count > 3
        THEN 'AMBER — Multiple open findings'
        WHEN pm.pd_ratio_current > 2.0
        THEN 'RED — PD significantly underestimating'
        WHEN pm.gini_current < 0.60
        THEN 'AMBER — Low discriminatory power'
        ELSE 'GREEN'
    END AS inspection_readiness_rag
FROM model_inventory m
LEFT JOIN model_documentation d ON d.model_id = m.model_id AND d.is_current = 1
LEFT JOIN model_validations v   ON v.model_id = m.model_id
    AND v.validation_date = (SELECT MAX(validation_date) FROM model_validations
                              WHERE model_id = m.model_id)
LEFT JOIN model_performance_monitoring pm ON pm.model_id = m.model_id
    AND pm.report_date = (SELECT MAX(report_date) FROM model_performance_monitoring
                          WHERE model_id = m.model_id)
WHERE m.model_status = 'ACTIVE'
ORDER BY inspection_readiness_rag DESC, m.asset_class;


-- 2. IRB Data Quality — completeness check on IRB inputs
WITH irb_data_quality AS (
    SELECT
        f.facility_id,
        f.obligor_name,
        f.asset_class,
        -- PD data quality
        CASE WHEN f.pd IS NULL OR f.pd <= 0    THEN 'MISSING' ELSE 'OK' END AS pd_quality,
        CASE WHEN f.internal_grade IS NULL      THEN 'MISSING' ELSE 'OK' END AS grade_quality,
        CASE WHEN f.pd_rating_date IS NULL OR
                  DATEDIFF(MONTH, f.pd_rating_date, GETDATE()) > 12
             THEN 'STALE' ELSE 'OK' END                                    AS pd_currency,
        -- LGD data quality
        CASE WHEN f.lgd IS NULL OR f.lgd < 0 OR f.lgd > 1 THEN 'INVALID' ELSE 'OK' END AS lgd_quality,
        -- EAD data quality
        CASE WHEN f.ead IS NULL OR f.ead < 0   THEN 'MISSING' ELSE 'OK' END AS ead_quality,
        CASE WHEN f.ccf IS NULL AND f.undrawn_commitment > 0
             THEN 'MISSING' ELSE 'OK' END                                  AS ccf_quality,
        -- Maturity
        CASE WHEN f.effective_maturity IS NULL
              OR f.effective_maturity < 1 OR f.effective_maturity > 5
             THEN 'INVALID' ELSE 'OK' END                                  AS maturity_quality,
        -- Collateral
        CASE WHEN f.collateral_type = 'CRE' AND (
                  f.collateral_value IS NULL
               OR DATEDIFF(MONTH, f.last_valuation_date, GETDATE()) > 12)
             THEN 'STALE' ELSE 'OK' END                                    AS collateral_quality
    FROM portfolio_facilities f
    WHERE f.facility_status = 'ACTIVE'
      AND f.regulatory_approach = 'IRB'
)
SELECT
    'PD completeness'      AS check, COUNT(*) FILTER (WHERE pd_quality = 'OK') * 100.0 / COUNT(*) AS pass_pct FROM irb_data_quality
UNION ALL SELECT 'Grade completeness',   COUNT(*) FILTER (WHERE grade_quality = 'OK') * 100.0 / COUNT(*) FROM irb_data_quality
UNION ALL SELECT 'PD currency',          COUNT(*) FILTER (WHERE pd_currency = 'OK') * 100.0 / COUNT(*) FROM irb_data_quality
UNION ALL SELECT 'LGD validity',         COUNT(*) FILTER (WHERE lgd_quality = 'OK') * 100.0 / COUNT(*) FROM irb_data_quality
UNION ALL SELECT 'EAD completeness',     COUNT(*) FILTER (WHERE ead_quality = 'OK') * 100.0 / COUNT(*) FROM irb_data_quality
UNION ALL SELECT 'Maturity validity',    COUNT(*) FILTER (WHERE maturity_quality = 'OK') * 100.0 / COUNT(*) FROM irb_data_quality
UNION ALL SELECT 'Collateral currency',  COUNT(*) FILTER (WHERE collateral_quality = 'OK') * 100.0 / COUNT(*) FROM irb_data_quality
ORDER BY pass_pct ASC;


-- 3. Staging consistency — identify SICR triggers not converted to Stage 2
SELECT
    f.facility_id,
    f.obligor_name,
    f.current_stage,
    f.pd,
    f.pd_at_origination,
    f.days_past_due,
    f.covenant_breach_flag,
    f.watch_list_flag,
    -- SICR indicators
    CASE WHEN f.pd > 3 * f.pd_at_origination THEN 1 ELSE 0 END   AS pd_tripling_trigger,
    CASE WHEN f.days_past_due >= 30            THEN 1 ELSE 0 END   AS dpd_trigger,
    CASE WHEN f.covenant_breach_flag = 1       THEN 1 ELSE 0 END   AS covenant_trigger,
    CASE WHEN f.watch_list_flag = 1            THEN 1 ELSE 0 END   AS watchlist_trigger,
    -- Are any SICR triggers fired for Stage 1 exposures?
    CASE WHEN f.current_stage = 1
          AND (f.pd > 3 * f.pd_at_origination
               OR f.days_past_due >= 30
               OR f.covenant_breach_flag = 1
               OR f.watch_list_flag = 1)
         THEN 'POSSIBLE_UNDER_STAGING'
         ELSE 'OK'
    END AS staging_alert
FROM portfolio_facilities f
WHERE f.facility_status = 'ACTIVE'
  AND f.current_stage = 1
  AND (
    f.pd > 3 * f.pd_at_origination
    OR f.days_past_due >= 30
    OR f.covenant_breach_flag = 1
    OR f.watch_list_flag = 1
  )
ORDER BY f.pd DESC;
```

---

## 10. Python Implementation

```python
"""
M35 Regulatory Examinations — IRB Model Performance Analytics
Produces inspection-ready model performance reports covering
discriminatory power, calibration, and stability.
"""

import numpy as np
import pandas as pd
from scipy import stats
from sklearn.metrics import roc_auc_score, roc_curve
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)


# ─────────────────────────────────────────────────────────────
# 1. DISCRIMINATORY POWER (Gini / AUC)
# ─────────────────────────────────────────────────────────────

def compute_gini(y_true, y_score):
    """Gini coefficient = 2 × AUC − 1."""
    auc = roc_auc_score(y_true, y_score)
    return 2 * auc - 1


def gini_confidence_interval(y_true, y_score, n_bootstrap=2000, alpha=0.05):
    """Bootstrap confidence interval for Gini coefficient."""
    n = len(y_true)
    ginis = []
    for _ in range(n_bootstrap):
        idx = np.random.choice(n, n, replace=True)
        if y_true[idx].sum() > 0 and y_true[idx].sum() < n:
            g = compute_gini(y_true[idx], y_score[idx])
            ginis.append(g)
    return np.percentile(ginis, [100*alpha/2, 100*(1-alpha/2)])


# Simulate 3 years of validation data (improving model → stable Gini)
years = [2023, 2024, 2025]
gini_results = {}

for yr in years:
    n_test = 3000
    # True PD for each obligor
    true_pd = np.random.beta(1, 30, n_test)
    # Actual defaults
    defaults = np.random.binomial(1, true_pd)
    # Model score (correlated with true PD but with noise)
    noise = 0.25
    model_score = true_pd * (1 - noise) + np.random.beta(1, 15, n_test) * noise

    gini = compute_gini(defaults, model_score)
    ci   = gini_confidence_interval(defaults, model_score)
    gini_results[yr] = {'gini': gini, 'ci_lower': ci[0], 'ci_upper': ci[1],
                         'n_defaults': defaults.sum(), 'n_total': n_test}

print("=" * 65)
print("PD MODEL DISCRIMINATORY POWER — ANNUAL VALIDATION")
print("=" * 65)
print(f"{'Year':6s} {'Gini':>6s} {'95% CI':>16s} {'Defaults':>10s} {'Assessment':>20s}")
for yr, r in gini_results.items():
    assess = ('STRONG (>0.70)' if r['gini'] > 0.70 else
              'ACCEPTABLE (0.60-0.70)' if r['gini'] > 0.60 else
              'WEAK (<0.60) — regulatory concern')
    print(f"{yr:6d} {r['gini']:6.3f} [{r['ci_lower']:.3f},{r['ci_upper']:.3f}]  "
          f"{r['n_defaults']:>8d}   {assess}")


# ─────────────────────────────────────────────────────────────
# 2. CALIBRATION BACK-TEST (Traffic Light Approach — BCBS WP14)
# ─────────────────────────────────────────────────────────────

def calibration_traffic_light(grade_label, predicted_pd, n, actual_defaults):
    """
    BCBS WP14 Traffic Light approach for PD calibration.
    Returns GREEN/YELLOW/RED based on one-sided binomial test.
    """
    actual_dr = actual_defaults / n
    # One-sided p-value: P(X >= actual_defaults | N, predicted_PD)
    p_value = 1 - stats.binom.cdf(actual_defaults - 1, n, predicted_pd)
    ratio = actual_dr / max(predicted_pd, 1e-9)

    if p_value < 0.01:
        rag = 'RED'
        action = 'Model recalibration required'
    elif p_value < 0.05:
        rag = 'YELLOW'
        action = 'Investigate — monitor closely'
    else:
        rag = 'GREEN'
        action = 'No action required'

    return {
        'grade': grade_label, 'predicted_pd': predicted_pd,
        'n': n, 'actual_defaults': actual_defaults,
        'actual_dr': actual_dr, 'ratio': ratio,
        'p_value': p_value, 'rag': rag, 'action': action,
    }


# Simulate calibration data (model underestimates in lower grades)
calibration_data = [
    ('1 (AAA-A)',   0.0010, 500,   1),
    ('2 (BBB+)',    0.0025, 620,   4),
    ('3 (BBB)',     0.0050, 540,   8),
    ('4 (BBB-)',    0.0100, 480,  12),  # actual DR ~2.5% vs 1.0% — YELLOW
    ('5 (BB+)',     0.0200, 380,  24),  # actual DR ~6.3% vs 2.0% — RED
    ('6 (BB)',      0.0400, 290,  28),  # actual DR ~9.7% vs 4.0% — RED
    ('7 (BB-/B+)',  0.0800, 220,  28),  # actual DR ~12.7% vs 8.0% — YELLOW
    ('8 (B)',       0.1500, 160,  30),  # actual DR ~18.8% vs 15.0% — GREEN
]

print("\n" + "=" * 80)
print("PD CALIBRATION BACK-TEST — TRAFFIC LIGHT (BCBS WP14 METHODOLOGY)")
print("=" * 80)
cal_results = []
for item in calibration_data:
    r = calibration_traffic_light(*item)
    cal_results.append(r)
    print(f"  Grade {r['grade']:12s}  "
          f"PD={r['predicted_pd']*100:.2f}%  "
          f"ActDR={r['actual_dr']*100:.2f}%  "
          f"Ratio={r['ratio']:.1f}x  "
          f"p={r['p_value']:.4f}  [{r['rag']:6s}]  {r['action']}")

red_count = sum(1 for r in cal_results if r['rag'] == 'RED')
yellow_count = sum(1 for r in cal_results if r['rag'] == 'YELLOW')
print(f"\n  Summary: {red_count} RED, {yellow_count} YELLOW out of {len(cal_results)} grades")
if red_count >= 2:
    print("  INSPECTION RISK: Multiple RED grades suggest systematic underestimation — "
          "high probability of regulatory finding requiring model recalibration and RWA uplift.")


# ─────────────────────────────────────────────────────────────
# 3. LGD BACK-TEST
# ─────────────────────────────────────────────────────────────

# Simulate completed workout cases
n_workouts = 400
lgd_predicted = np.random.beta(5, 10, n_workouts) * 0.6 + 0.10  # centred ~0.40
# Actual LGD systematically higher (model underestimates)
lgd_actual = np.clip(lgd_predicted * np.random.lognormal(0.15, 0.3, n_workouts), 0, 1)

# t-test for H0: mean actual LGD = mean predicted LGD (one-sided: actual > predicted)
t_stat, p_two_sided = stats.ttest_rel(lgd_actual, lgd_predicted)
p_one_sided = p_two_sided / 2 if t_stat > 0 else 1 - p_two_sided / 2

print("\n" + "=" * 65)
print("LGD MODEL BACK-TEST — COMPLETED WORKOUTS")
print("=" * 65)
print(f"  Workout cases analysed: {n_workouts}")
print(f"  Mean predicted LGD:     {lgd_predicted.mean()*100:.1f}%")
print(f"  Mean actual LGD:        {lgd_actual.mean()*100:.1f}%")
print(f"  Mean difference:        {(lgd_actual - lgd_predicted).mean()*100:+.1f}pp")
print(f"  t-statistic:            {t_stat:.3f}")
print(f"  p-value (one-sided):    {p_one_sided:.4f}")
if p_one_sided < 0.01:
    print("  FINDING: LGD model significantly underestimates actual losses (p<1%)")
    print("  REGULATORY RISK: Likely finding in on-site inspection — LGD uplift required")
elif p_one_sided < 0.05:
    print("  OBSERVATION: LGD model marginally underestimates actual losses (p<5%)")
else:
    print("  PASS: LGD calibration consistent with actual losses")


# ─────────────────────────────────────────────────────────────
# 4. INSPECTION READINESS SCORECARD
# ─────────────────────────────────────────────────────────────

print("\n" + "=" * 65)
print("INSPECTION READINESS SCORECARD")
print("=" * 65)

scorecard = {
    'Model documentation (MDD current)':     ('AMBER', 'LGD MDD updated >18 months ago'),
    'Model inventory completeness':           ('GREEN',  'All 12 credit models inventoried'),
    'Validation independence':                ('GREEN',  'Dedicated validation team, separate reporting'),
    'PD calibration (back-test)':            ('RED',    '2 grades RED in traffic light test'),
    'LGD calibration (back-test)':           ('RED',    'Systematic underestimation p<1%'),
    'Discriminatory power (Gini)':           ('GREEN',  'Gini 0.71 — strong'),
    'Use test evidence':                     ('AMBER',  'Partial documentation — credit decisions reference model'),
    'Covenant tracking currency':            ('AMBER',  '15% of tests overdue'),
    'Credit file completeness (sample)':     ('GREEN',  '94% pass rate'),
    'IFRS 9 staging consistency':            ('GREEN',  'Staging review current — no systemic gaps'),
    'Overlay governance':                    ('AMBER',  'Approval trail gaps in 3 overlays'),
    'Data quality':                          ('GREEN',  'IRB inputs >98% complete'),
}

red_items   = [k for k, (s, _) in scorecard.items() if s == 'RED']
amber_items = [k for k, (s, _) in scorecard.items() if s == 'AMBER']

for area, (status, comment) in scorecard.items():
    icon = {'RED': '[RED]', 'AMBER': '[AMB]', 'GREEN': '[GRN]'}[status]
    print(f"  {icon} {area:45s} {comment}")

print(f"\n  RED: {len(red_items)}, AMBER: {len(amber_items)}, "
      f"GREEN: {len(scorecard)-len(red_items)-len(amber_items)}")
print(f"\n  OVERALL ASSESSMENT: "
      f"{'HIGH inspection risk — remediate RED items before submission' if len(red_items) >= 2 else 'Moderate risk — targeted remediation required'}")
```

---

## 11. Interview Questions

1. **"What is the SREP and what does it mean for Pillar 2 capital?"**
   SREP = Supervisory Review and Evaluation Process. Annual supervisory assessment covering business model, governance, risk to capital, and liquidity. Output = Total Capital Requirement (TCR) = P1 + P2A. P2A covers risks not in P1 (concentration, model risk, IRRBB, pension). Changes to P2A affect the bank's CET1 buffer and capacity for dividends/buybacks.

2. **"What was TRIM and what were its key findings for credit risk?"**
   Targeted Review of Internal Models (ECB, 2016-2019): 65 significant EU banks, on-site IRB model inspections. Key findings: LGD systematically underestimated (insufficient downturn adjustment, incomplete workouts); PD underestimated in lower grades; data quality deficiencies in reference datasets; validation insufficiently independent; documentation inadequate. Average RWA increase ~12%.

3. **"What is the traffic light approach to PD calibration?"**
   BCBS WP14 method: for each rating grade, test whether actual default rate is statistically consistent with predicted PD using a binomial test. GREEN: p>0.05 (no significant underestimation). YELLOW: 0.01<p≤0.05 (monitor). RED: p≤0.01 (model recalibration required). Regulators apply this test in on-site inspections.

4. **"What does PRA SS1/23 require from a model validation function?"**
   SS1/23 five principles: (1) model identification/classification, (2) governance (Board accountability), (3) development and implementation standards, (4) independent validation, (5) risk mitigants for known model weaknesses. Validation must be independent of development; model inventory must be complete; models must be monitored for performance degradation; model risk appetite must be defined.

5. **"How should a Credit Manager prepare for a PRA on-site credit inspection?"**
   Assemble all model documentation and validation reports. Run a self-assessment against SS1/23 and credit file policy. Ensure covenant tracking, annual reviews, and KYC are current. Brief all interviewees. Designate a central coordinator. Do not attempt to fix evidence retroactively — fix the underlying controls going forward and be transparent about current state.

6. **"What regulatory actions can the PRA take if it finds credit model deficiencies?"**
   Options include: (1) informal guidance (Dear CEO/CRO letter), (2) Skilled Persons Review (Section 166 review — independent expert appointed at bank's cost), (3) Formal Direction requiring model recalibration by specific date, (4) Temporary Pillar 2A add-on pending remediation, (5) Removal of IRB permission for the affected asset class (reverting to standardised approach), (6) In extreme cases, enforcement action including fines.

---

## 12. Common Mistakes

**Mistake 1: Over-claiming model accuracy to inspectors**
Inspectors are experienced and will test claims quantitatively. If the model validation report claims Gini of 0.75 but the inspector's own back-test gives 0.61, credibility is destroyed. Be transparent about model limitations — acknowledge them proactively with reference to compensating controls. Inspectors value intellectual honesty.

**Mistake 2: Documentation that post-dates the decisions**
A common finding: the model design document is dated after the model was implemented, suggesting it was written to satisfy regulators rather than to guide development. Regulators look at document creation dates and version history. Documentation must be contemporaneous.

**Mistake 3: Validation team that reports to the model development team**
SS1/23 and SR 11-7 both require validation independence. If the Head of Model Validation reports to the Head of Model Development, that is not independent. Inspectors will draw an organisational chart and challenge reporting lines.

**Mistake 4: Treating the RFI process as adversarial**
Some banks try to provide minimum information in response to RFIs. This prolongs the inspection and damages the relationship. Regulators have powers to compel information; resisting RFIs wastes time and goodwill. Provide complete, well-organised responses promptly.

**Mistake 5: Incomplete model inventory**
Banks often have "shadow models" — spreadsheets or analyst tools that feed into credit decisions but are not in the formal model inventory. Inspectors ask: "How does the pricing model work?" and discover a spreadsheet model not validated or inventoried. All tools that feed into material decisions are models and must be inventoried and validated.

---

## 13. Case Studies

**Case Study 1: ECB TRIM — Deutsche Bank IRB Models (2017-2018)**
During TRIM, the ECB's on-site inspection of Deutsche Bank's corporate IRB models identified significant underestimation of LGD for unsecured corporate exposures. The inspection found that the LGD model had been calibrated using recovery rates from 2010-2016, a period of historically high recoveries, without adequate downturn LGD adjustments as required by CRR. The ECB required LGD uplifts that, combined with other TRIM findings across the portfolio, contributed to a requirement for additional Pillar 2 capital. Deutsche Bank's 2018 Pillar 3 report acknowledged the impact of model changes required following regulatory inspections.

**Case Study 2: PRA Skilled Persons Review — UK IRB Bank (2020)**
A mid-tier UK bank's PD model for SME lending was found, in a PRA on-site credit review, to show systematic underestimation with actual default rates approximately 2.5x predicted PD across most grades. The PRA required a Section 166 Skilled Persons Review of the model development and validation process (at the bank's cost, approximately £1.5m). The review identified root causes: the reference dataset excluded defaults during the 2008 crisis (data was collected from 2010), and validation tests had not been sufficiently powered to detect calibration errors. The remediation required a full model rebuild and three-year monitoring plan, with temporary P2A uplift of approximately £200m of additional capital during the remediation period.

**Case Study 3: ECB Dear CEO Letter on IFRS 9 ECL (2022)**
Following ECB supervisory work in 2021-2022, the ECB wrote to CEOs of significant institutions identifying concerns about IFRS 9 ECL methodology, specifically: over-reliance on base scenario weightings (insufficient probability weight to adverse scenarios), SICR criteria that were too narrow (missing forward-looking triggers), and management overlays that were reducing model-derived ECL without adequate justification. Several banks subsequently revised their ECL methodologies and increased provisions in response. This illustrates how regulatory scrutiny of accounting estimates produces direct financial impact.

---

## 14. Iterative Reinforcement

**Week 1 — Regulatory Reading**
1. Read the ECB's *Guide to Internal Models* (2019), Chapter 4 (PD) — 40 pages, freely available on ecb.europa.eu
2. Read PRA SS1/23 — Model Risk Management (35 pages, bankofengland.co.uk)
3. Summarise the 5 SS1/23 principles and identify one action per principle that a credit risk team should take

**Week 2 — Technical Self-Assessment**
1. Run the Python calibration back-test on simulated data
2. Vary the "model underestimation factor" — at what level does the test move from GREEN to YELLOW to RED?
3. Build the Gini bootstrap confidence interval and understand what width of CI is acceptable

**Week 3 — Process Simulation**
1. Draft an RFI response package: suppose an inspector asks for "the most recent validation report for your corporate PD model." What documents would you include and how would you organise them?
2. Draft a 1-page "management response" to a finding: "The LGD model systematically underestimates loss rates for unsecured exposures based on our back-test of completed workouts."

**Week 4 — Exam Preparation**
1. Explain the TRIM findings and their RWA impact to a non-specialist (risk colleague in market risk)
2. Role-play: you are the Head of Credit Risk Model Development being interviewed by an ECB inspector about the calibration of your corporate PD model. What questions will they ask and what are your answers?

---

## 15. Source Material

**Regulatory Publications**
- ECB: *Guide to Internal Models* (September 2019, ecb.europa.eu) — the operational standard for SSM credit model inspections
- PRA: *Supervisory Statement SS1/23 — Model Risk Management* (May 2023, bankofengland.co.uk)
- PRA: *SS13/16 — IRB Approaches to Credit Risk* (October 2016, bankofengland.co.uk)
- EBA: *Guidelines on PD Estimation, LGD Estimation, Treatment of Defaulted Assets* (EBA/GL/2017/16)
- BCBS: *Working Paper No. 14 — Studies on the Validation of Internal Rating Systems* (2005, bis.org) — traffic light approach
- US Federal Reserve: *SR 11-7 — Guidance on Model Risk Management* (April 2011) — global model governance standard

**TRIM Documentation**
- ECB: *TRIM Project — Overview* (2017, ecb.europa.eu/banking/supervision)
- ECB: *TRIM — Targeted Review of Internal Models — Project Overview and Key Outcomes* (2021)

**Academic and Technical**
- Engelmann, B., Rauhmeier, R. (eds): *The Basel II Risk Parameters: Estimation, Validation, Stress Testing* (Springer, 2nd ed. 2011)
- Tasche, D.: *Validation of Internal Rating Systems and PD Estimates* (2006, arxiv.org/abs/physics/0606071)
- Blochwitz, S., Hohl, S., Tasche, D., Wehn, C.: *Validating Default Probabilities on Short Time Series* (Deutsche Bundesbank Discussion Paper, 2005)

**Industry Reports**
- EBA: *Report on IRB Modelling Practices* (EBA/REP/2016/06) — describes common IRB modelling practices and divergences
- EBA: *Benchmarking of Internal Approaches for Credit Risk* (annual, eba.europa.eu) — quantitative benchmarking of IRB RWA across EU banks
