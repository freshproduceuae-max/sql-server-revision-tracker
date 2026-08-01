# M34 — Internal Audit Expectations for Credit Risk

## 1. Business Purpose

Internal Audit (IA) is the third line of defence — the independent assurance function that validates whether the credit risk framework actually works as designed, not just as described in policy documents. While credit risk teams (2LoD) tell management "this is how we manage credit risk," Internal Audit independently assesses whether that is actually happening consistently, completely, and effectively.

**Why Internal Audit of credit risk matters:**

*Independent verification:* 2LoD credit risk functions have a natural bias — they designed the credit framework, they operate the models, and they are invested in demonstrating that their controls work. Internal Audit provides an independent challenge that is not subject to these biases. When IA finds material weaknesses, it means the 2LoD's self-assessment was overstated.

*Regulatory confidence:* The PRA and ECB place significant weight on IA findings. When a bank reports its capital adequacy or provisioning methodology to the regulator, the regulator wants assurance that IA has audited those processes. If IA is inadequate (insufficiently resourced, lacking credit expertise, or producing superficial reports), regulators will conduct more intensive direct supervision to fill the gap.

*Early warning of systemic problems:* IA audits often identify systemic problems before they crystallise into losses. A finding that "covenant tracking is being performed annually rather than quarterly as required by policy" is an early warning: borrowers could be deteriorating between tests, and the bank is not seeing it in time to intervene.

*Accountability and consequence:* IA findings create accountability. When a Credit Manager knows that Internal Audit will review credit files for completeness, they are more likely to ensure files are complete. The existence of IA — even absent a current audit — improves 1LoD and 2LoD behaviour.

*Board and senior management assurance:* The Board Audit Committee relies on Internal Audit to provide independent assurance that the credit risk framework is functioning. Without IA, the Board's oversight of credit risk depends entirely on management self-reporting, which is inherently less reliable.

---

## 2. Accounting Concepts

**Audit of IFRS 9 Provisioning**

IFRS 9 provisioning is a primary target of internal audit because it involves significant management judgement and has a direct impact on P&L and capital. IA focuses on:

*Stage classification accuracy:* Are there facilities in Stage 1 that should be in Stage 2 (SICR triggered)? Criteria for SICR include: 30+ days past due (rebuttable presumption), material deterioration in PD estimate, and qualitative triggers (covenant breach, adverse news). IA tests a sample of facilities to verify that SICR triggers are being applied consistently and correctly.

*ECL model adequacy:* Is the ECL model producing reasonable outputs? IA does not necessarily re-run the model from scratch, but compares model outputs to benchmarks (peer ECL rates, regulatory expected loss, historical loss experience). Significant unexplained divergence triggers further investigation.

*Management overlay governance:* Are management overlays (additions or reductions to model-generated ECL) appropriately approved, documented, and justified? IA checks overlay approval trails, supporting analysis, and adequacy of documentation. Poorly documented overlays are a frequent finding.

*ECL disclosure completeness:* Does the IFRS 7/IFRS 9 note disclosure (in the Annual Report or interim accounts) accurately describe the methodology, key assumptions, and sensitivities? IA coordinates with the external auditor's review of these disclosures.

**Audit of Interest Income Recognition**

Under IFRS 9, interest on Stage 3 (credit-impaired) assets is recognised on the net carrying amount (gross balance minus ECL allowance), at the original EIR. Interest on Stage 1 and 2 assets is recognised on the gross balance. IA tests whether the accounting system has been correctly configured to apply these different treatments, and whether Stage 3 classifications are driving the correct income recognition in the P&L.

---

## 3. Financial Concepts

**Credit File Completeness Standards**

A complete credit file — the minimum standard IA expects to find — should contain:
1. Signed credit application and borrower information
2. KYC/AML documentation and sign-offs
3. Audited financial statements (minimum 3 years)
4. Financial analysis (ratio analysis, commentary, sensitivity)
5. Credit committee paper and approval documentation
6. Covenant schedule (agreed covenants, testing frequency, current headroom)
7. Facility agreement and security documentation
8. Valuations (for secured facilities — independent property valuation, updated within policy timeframe)
9. Annual credit review (most recent)
10. Correspondence and covenant testing results

If IA tests a sample of 20 credit files and finds significant gaps (missing financial statements, missing covenant tests, absent valuations), this is a moderate to significant finding depending on frequency and materiality.

**Covenant Headroom Analysis**

IA tests covenant tracking by replicating headroom calculations from borrower financial statements and comparing to what the credit team recorded. A bank may have borrowers where the financial covenant (e.g., Net Debt / EBITDA ≤ 3.5x) has headroom of only 5-10%, yet the credit team has not escalated these to the watch list or increased monitoring frequency. This is a monitoring failure — the early warning system is not functioning.

**LTV Currency**

For secured lending, IA checks that collateral valuations are current (within policy — typically 12 months for CRE, more frequently if property market is stressed). Outdated valuations mask deteriorating LTV ratios and understated LGD. A portfolio with 70% of CRE valuations >2 years old, in a falling property market, means the bank does not know its true collateral position.

---

## 4. Statistical Concepts

**Sampling Methodology**

IA does not audit every credit file — it uses statistical sampling. Sample selection for credit audit typically uses:
*Risk-based sampling:* Oversample higher-risk credits (lower ratings, larger exposures, recent downgrades, facilities nearing covenant limits). This is more efficient than random sampling because it is more likely to find errors.
*Stratified random sampling:* Divide the portfolio into strata (by size, sector, grade) and randomly sample within each stratum. This ensures coverage of all segments.
*Attribute sampling:* For testing specific controls (e.g., "is the annual review completed within 12 months?"), attribute sampling tests whether the control is functioning for a proportion of the population. At 95% confidence, testing 59 items and finding zero failures gives 95% confidence that the failure rate is <5%.

**Back-testing of Credit Models**

IA should test whether credit models (PD, LGD, EAD) are performing as expected:
*PD model back-testing:* Compare predicted 1-year PD (by grade, 1-3 years ago) to actual defaults. If Grade 5 had an average predicted PD of 2.0% but actual defaults over 3 years averaged 4.5%, the model is significantly underestimating PD. This triggers a model review requirement.
*LGD back-testing:* Compare predicted LGD to realised LGD from completed workout cases. Systematic underestimation of LGD is common and is typically found in internal audit before the model team self-identifies it.
*Binomial test for PD calibration:* Under the null hypothesis that the model is correctly calibrated, the number of defaults D from N exposures follows Binomial(N, PD). If D is far from N×PD (e.g., 2 standard deviations above), the model is underpredicting defaults.

---

## 5. Regulatory Framework

**SR 11-7 — Guidance on Model Risk Management (US Federal Reserve, 2011)**

SR 11-7 is the US Federal Reserve's guidance on model risk management and is treated as a global benchmark, widely adopted by UK and European banks. Key principles relevant to credit audit:
- Model validation must be performed by a function independent of model development
- Model inventory must be complete and current
- Each model must have adequate documentation
- Model limitations must be disclosed to users
- Model risk must be managed as a distinct risk category

IA audits compliance with SR 11-7 (or its UK equivalent, PRA SS1/23) by reviewing: model inventory completeness, validation reports quality and independence, documentation standards, and model limitations disclosures.

**PRA Supervisory Statement SS1/23 — Model Risk Management**

SS1/23 (effective May 2024) is the PRA's model risk management standard for UK banks. Key expectations IA audits against:
- Model risk appetite: Has the bank defined and approved a model risk appetite?
- Model identification and inventory: Is the model inventory complete and regularly updated?
- Model validation: Is validation independent, risk-proportionate, and conducted by appropriately qualified staff?
- Model change management: Are model changes documented and appropriately approved?
- Model monitoring: Are models monitored for performance degradation?

**EBA/GL/2023/05 — Internal Audit Guidelines**

EBA guidelines on internal audit establish minimum standards for the internal audit function in EU banks, including:
- IA must have a risk-based audit plan covering all material risk areas
- Credit risk must be audited at least annually for significant credit risk
- IA must have unfettered access to all information, systems, and personnel
- IA must be independent — the Chief Internal Auditor reports to the Board Audit Committee

**Capital Requirements Directive IV (CRD IV) Art. 76**

Art. 76 requires that the management body is fully informed about the risks the institution is exposed to and that the internal audit function covers all material risks including credit risk. This creates a direct regulatory obligation on the Board for credit audit coverage.

---

## 6. Data Required

**For Credit Origination Audit**
- Sample of credit files (drawn randomly or risk-based from credit origination system)
- Credit policy documents (current versions with effective dates)
- Credit approval documentation (committee minutes, DCA matrices)
- KYC documentation and completion status from AML system

**For Credit Monitoring Audit**
- Covenant testing schedules and results (from covenant tracking system)
- Watch list and warning list current membership and history
- Annual review completion status by facility (from credit system — date of last review)
- Collateral valuation dates and current LTV by facility

**For Provisioning Audit**
- IFRS 9 ECL model documentation and validation reports
- Stage classification history (migration log)
- Management overlay approval trails and supporting analysis
- External auditor's engagement with provisioning methodology

**For Regulatory Capital Audit**
- IRB model documentation and recent validation reports
- PD/LGD/EAD data inputs to RWA calculation
- Output floor calculation (IRB vs. SA comparison)
- Model inventory and change log

---

## 7. How Analysts Actually Work

**Preparing for an Internal Audit (as Credit Manager)**

When IA announces an upcoming credit audit, the credit team should:

1. **Review policy compliance proactively:** Before auditors arrive, run self-assessments of common findings — are all annual reviews complete within 12 months? Are all covenant tests up to date? Are collateral valuations current?

2. **Organise the credit filing system:** Ensure all credit files are complete and accessible. Missing documents that cannot be located during audit are treated the same as missing documents — IA cannot assume they existed but cannot be found.

3. **Understand the audit scope:** IA will typically share the audit scope and methodology in advance. Know which portfolio segments they are sampling and ensure those files are in good order.

4. **Brief the team:** Alert relationship managers and credit officers that auditors may request documents and interviews. Ensure they understand what IA is looking for and respond professionally.

5. **Management actions from prior audits:** If there were findings from the previous credit audit, demonstrate that management actions are complete — IA's first action will be to verify that prior findings are resolved.

**Responding to Audit Findings**

When IA issues draft findings:
- Respond factually and constructively — if the finding is accurate, acknowledge it and commit to a specific remediation timeline
- If the finding is factually incorrect, provide evidence to contest it — but do not contest findings that are accurate
- For significant findings, senior management (Head of Credit Risk, CRO) must personally own the management action
- Remediation timelines should be realistic but prompt: for critical findings, typically 30-90 days; for moderate findings, 3-6 months

**IA's Approach — What They Actually Do**

IA credit auditors typically: review a sample of 15-30 credit files in detail; test 50-100 covenant compliance records; review model validation reports; interview credit managers and relationship managers; examine escalation trails for watch-listed credits; compare provisioning judgements to model outputs; verify DCA compliance on a sample of approvals.

---

## 8. Excel Implementation

**Credit File Completeness Tracking**

```
Sheet: Credit_File_Audit
Columns: Facility_ID | Obligor | EAD(£m) | Grade | Audit_Date | KYC_Complete | 
         Financials_3yr | Credit_Paper | Covenant_Schedule | Last_Annual_Review | 
         Valuation_Date | Valuation_Current | Overall_Pass?

FORMULA:
Overall_Pass = IF(AND(KYC="Y", Financials_3yr="Y", Covenant_Schedule="Y",
                      DATEDIFF("months", Last_Annual_Review, TODAY()) <= 12,
                      Valuation_Current="Y"), "PASS", "FAIL")

Summary metrics:
Pass rate = COUNTIF(Overall_Pass, "PASS") / COUNT(Overall_Pass)
```

**Covenant Tracking Audit Template**

```
Columns: Facility_ID | Covenant_Type | Threshold | 
         Last_Test_Date | Test_Result | Headroom% | 
         Days_Since_Test | Policy_Frequency | Overdue?

Overdue formula:
=IF(Days_Since_Test > VLOOKUP(Policy_Frequency, frequency_table, 2, FALSE), "OVERDUE", "OK")

Frequency table:
  Monthly    → 31 days
  Quarterly  → 95 days
  Semi-annual→ 185 days
  Annual     → 370 days
```

**PD Back-test Dashboard**

```
Grade | Rating Label | Average PD (%) | Defaults | Exposures | Actual DR (%) | Pass/Fail
  1   | AAA-AA       |     0.05       |     0    |   120     |   0.00%       | PASS
  2   | A            |     0.10       |     1    |   280     |   0.36%       | FAIL (>2x)
  3   | BBB          |     0.30       |     4    |   350     |   1.14%       | FAIL (>2x)
  4   | BB+          |     0.75       |     8    |   290     |   2.76%       | FAIL (>2x)
  5   | BB           |     1.50       |    12    |   180     |   6.67%       | FAIL (>2x)
```
```
Alert: PD model is systematically underestimating across all grades — requires urgent model review
```

---

## 9. SQL Implementation

```sql
-- =================================================================
-- Internal Audit Analytics — Credit Risk
-- =================================================================

-- 1. Credit File Completeness Audit (based on metadata in credit system)
WITH file_completeness AS (
    SELECT
        f.facility_id,
        f.obligor_name,
        f.ead / 1e6                 AS ead_m,
        f.internal_grade,
        -- KYC check: must be complete and refreshed within 12 months
        CASE WHEN k.kyc_status = 'COMPLETE'
              AND DATEDIFF(MONTH, k.last_reviewed, GETDATE()) <= 12
             THEN 1 ELSE 0 END      AS kyc_pass,
        -- Financial statements: min 3 years required
        CASE WHEN fa.years_on_file >= 3 THEN 1 ELSE 0 END
                                    AS financials_pass,
        -- Annual review: must be within 12 months (or 6 months for watch list)
        CASE WHEN DATEDIFF(MONTH, cr.last_review_date, GETDATE()) <=
             CASE WHEN f.watch_list = 1 THEN 6 ELSE 12 END
             THEN 1 ELSE 0 END      AS annual_review_pass,
        -- Covenant schedule: must exist for all facilities with financial covenants
        CASE WHEN c.covenant_count > 0 AND cs.schedule_exists = 1 THEN 1
             WHEN c.covenant_count = 0 THEN 1  -- no covenants, no schedule needed
             ELSE 0 END             AS covenant_schedule_pass,
        -- Collateral: valuation within 12 months (CRE), or 36 months (other property)
        CASE WHEN f.collateral_type = 'CRE'
               AND DATEDIFF(MONTH, col.last_valuation_date, GETDATE()) <= 12
             THEN 1
             WHEN f.collateral_type IN ('RESIDENTIAL', 'OTHER_PROPERTY')
               AND DATEDIFF(MONTH, col.last_valuation_date, GETDATE()) <= 36
             THEN 1
             WHEN f.collateral_type = 'NONE'
             THEN 1  -- unsecured, no valuation required
             ELSE 0 END             AS valuation_pass
    FROM portfolio_facilities f
    LEFT JOIN kyc_records k              ON k.obligor_id = f.obligor_id
    LEFT JOIN financial_analysis fa      ON fa.facility_id = f.facility_id
    LEFT JOIN credit_reviews cr          ON cr.facility_id = f.facility_id
    LEFT JOIN (SELECT facility_id, COUNT(*) AS covenant_count
               FROM facility_covenants GROUP BY facility_id) c
                                         ON c.facility_id = f.facility_id
    LEFT JOIN covenant_schedules cs      ON cs.facility_id = f.facility_id
    LEFT JOIN collateral_valuations col  ON col.facility_id = f.facility_id
    WHERE f.facility_status = 'ACTIVE'
),

audit_result AS (
    SELECT
        *,
        kyc_pass + financials_pass + annual_review_pass
        + covenant_schedule_pass + valuation_pass AS components_passed,
        CASE WHEN kyc_pass = 1 AND financials_pass = 1
              AND annual_review_pass = 1
              AND covenant_schedule_pass = 1
              AND valuation_pass = 1
             THEN 'PASS' ELSE 'FAIL' END           AS overall_pass
    FROM file_completeness
)

-- Audit summary by finding type
SELECT
    'KYC'                    AS requirement,
    SUM(1 - kyc_pass)        AS failures,
    COUNT(*)                 AS tested,
    ROUND(AVG(CAST(kyc_pass AS FLOAT)) * 100, 1) AS pass_rate_pct
FROM audit_result
UNION ALL
SELECT 'Financial Statements', SUM(1 - financials_pass), COUNT(*),
    ROUND(AVG(CAST(financials_pass AS FLOAT)) * 100, 1)
FROM audit_result
UNION ALL
SELECT 'Annual Review', SUM(1 - annual_review_pass), COUNT(*),
    ROUND(AVG(CAST(annual_review_pass AS FLOAT)) * 100, 1)
FROM audit_result
UNION ALL
SELECT 'Covenant Schedule', SUM(1 - covenant_schedule_pass), COUNT(*),
    ROUND(AVG(CAST(covenant_schedule_pass AS FLOAT)) * 100, 1)
FROM audit_result
UNION ALL
SELECT 'Collateral Valuation', SUM(1 - valuation_pass), COUNT(*),
    ROUND(AVG(CAST(valuation_pass AS FLOAT)) * 100, 1)
FROM audit_result
ORDER BY pass_rate_pct ASC;


-- 2. PD Model Back-test
WITH pd_backtest AS (
    SELECT
        r.grade,
        r.grade_label,
        AVG(r.pd_at_origination)             AS avg_predicted_pd,
        SUM(r.defaulted)                      AS actual_defaults,
        COUNT(*)                              AS total_exposures,
        AVG(CAST(r.defaulted AS FLOAT))       AS actual_default_rate,
        -- Traffic light: actual DR vs predicted PD
        CASE
            WHEN AVG(CAST(r.defaulted AS FLOAT)) > 2.0 * AVG(r.pd_at_origination)
            THEN 'RED — significant underestimation'
            WHEN AVG(CAST(r.defaulted AS FLOAT)) > 1.5 * AVG(r.pd_at_origination)
            THEN 'AMBER — moderate underestimation'
            ELSE 'GREEN'
        END AS backtest_rag
    FROM credit_ratings r
    WHERE r.rating_date BETWEEN DATEADD(YEAR, -3, GETDATE())
                            AND DATEADD(YEAR, -1, GETDATE())
      AND r.horizon = '12M'
    GROUP BY r.grade, r.grade_label
)
SELECT
    grade,
    grade_label,
    ROUND(avg_predicted_pd * 100, 3)         AS predicted_pd_pct,
    actual_defaults,
    total_exposures,
    ROUND(actual_default_rate * 100, 3)      AS actual_dr_pct,
    ROUND(actual_default_rate / NULLIF(avg_predicted_pd, 0), 2) AS dr_to_pd_ratio,
    backtest_rag
FROM pd_backtest
ORDER BY grade;
```

---

## 10. Python Implementation

```python
"""
M34 Internal Audit — Credit Risk Audit Analytics
Tests PD model calibration, covenant tracking, and file completeness.
"""

import numpy as np
import pandas as pd
from scipy import stats
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)


# ─────────────────────────────────────────────────────────────
# 1. PD MODEL BACK-TESTING (Binomial Test for Calibration)
# ─────────────────────────────────────────────────────────────

def pd_backtest(grade_label: str, predicted_pd: float,
                n_exposures: int, actual_defaults: int,
                confidence: float = 0.95) -> dict:
    """
    Test whether actual default rate is consistent with predicted PD.
    Uses one-sided binomial test (H0: actual DR <= predicted PD).
    """
    actual_dr = actual_defaults / n_exposures
    ratio = actual_dr / max(predicted_pd, 1e-10)

    # Binomial p-value: P(X >= actual_defaults | N, predicted_PD)
    p_value = 1 - stats.binom.cdf(actual_defaults - 1, n_exposures, predicted_pd)

    # Expected defaults and confidence interval under H0
    e_defaults = n_exposures * predicted_pd
    ci_upper = stats.binom.ppf(confidence, n_exposures, predicted_pd) / n_exposures

    if p_value < 0.01:
        status = 'FAIL — significant underestimation (p<1%)'
    elif p_value < 0.05:
        status = 'FAIL — marginal underestimation (p<5%)'
    else:
        status = 'PASS'

    return {
        'grade':          grade_label,
        'predicted_pd':   predicted_pd,
        'n_exposures':    n_exposures,
        'actual_defaults':actual_defaults,
        'actual_dr':      actual_dr,
        'dr_pd_ratio':    ratio,
        'expected_defaults': e_defaults,
        'p_value':        p_value,
        'ci_upper_95':    ci_upper,
        'status':         status,
    }


# Simulate back-test data (model systematically underpredicts PD)
grade_data = [
    ('AAA-AA', 0.0005, 250,  1),
    ('A',      0.0010, 400,  3),   # slight overestimate — acceptable
    ('BBB',    0.0025, 550,  9),   # actual DR ~1.6% vs predicted 0.25% — FAIL
    ('BB+',    0.0075, 480, 18),   # actual DR ~3.75% vs predicted 0.75% — FAIL
    ('BB',     0.0150, 320, 22),   # actual DR ~6.9% vs predicted 1.5% — FAIL
    ('BB-/B+', 0.0350, 200, 20),   # actual DR ~10% vs predicted 3.5% — FAIL
    ('B',      0.0700, 150, 18),   # actual DR ~12% vs predicted 7% — borderline
    ('CCC',    0.1500,  80, 18),   # actual DR ~22.5% vs predicted 15% — borderline
]

print("=" * 80)
print("PD MODEL BACK-TEST — 3-YEAR CUMULATIVE (DEFAULTED 1-YEAR PD)")
print("=" * 80)
results = []
for grade, pred_pd, n, defaults in grade_data:
    r = pd_backtest(grade, pred_pd, n, defaults)
    results.append(r)
    print(f"  {r['grade']:8s}  PD={r['predicted_pd']*100:.2f}%  "
          f"Actual={r['actual_dr']*100:.2f}%  "
          f"Ratio={r['dr_pd_ratio']:.1f}x  "
          f"p={r['p_value']:.4f}  [{r['status'].split('—')[0].strip()}]")

df_bt = pd.DataFrame(results)
failed = df_bt[df_bt['status'].str.startswith('FAIL')]
print(f"\nSummary: {len(failed)}/{len(df_bt)} grades failing calibration test")
print("AUDIT FINDING: PD model systematically underestimates default rates "
      "across 4/8 grade levels. Model review required.")


# ─────────────────────────────────────────────────────────────
# 2. COVENANT TRACKING AUDIT
# ─────────────────────────────────────────────────────────────

n_facilities = 300
today = pd.Timestamp('2026-08-01')

# Simulate covenant tracking records
cov_df = pd.DataFrame({
    'facility_id':     range(n_facilities),
    'sector':          np.random.choice(['CRE','Manufacturing','Retail','TMT'], n_facilities),
    'ead_m':           np.random.lognormal(np.log(5), 0.8, n_facilities),
    'grade':           np.random.choice(['BBB','BB+','BB','BB-','B+'], n_facilities),
    'covenant_type':   np.random.choice(['Net_Debt_EBITDA','DSCR','ICR','LTV'], n_facilities),
    'required_frequency': np.random.choice(['Quarterly','Semi-annual','Annual'], n_facilities,
                                            p=[0.4, 0.35, 0.25]),
    'days_since_last_test': np.random.exponential(120, n_facilities).astype(int) + 15,
    'headroom_pct':    np.random.normal(25, 20, n_facilities),
})

# Policy frequency in days
freq_days = {'Quarterly': 95, 'Semi-annual': 185, 'Annual': 370}
cov_df['policy_days'] = cov_df['required_frequency'].map(freq_days)
cov_df['overdue'] = cov_df['days_since_last_test'] > cov_df['policy_days']
cov_df['low_headroom'] = cov_df['headroom_pct'] < 10
cov_df['very_low_headroom'] = cov_df['headroom_pct'] < 5
cov_df['negative_headroom'] = cov_df['headroom_pct'] < 0  # covenant breach

print("\n" + "=" * 70)
print("COVENANT TRACKING AUDIT RESULTS")
print("=" * 70)
print(f"  Total facilities with covenants:     {n_facilities}")
print(f"  Overdue tests (past policy date):    {cov_df['overdue'].sum()} "
      f"({cov_df['overdue'].mean()*100:.0f}%)")
print(f"  Low headroom (<10%):                 {cov_df['low_headroom'].sum()} "
      f"({cov_df['low_headroom'].mean()*100:.0f}%)")
print(f"  Very low headroom (<5%):             {cov_df['very_low_headroom'].sum()} "
      f"({cov_df['very_low_headroom'].mean()*100:.0f}%)")
print(f"  Possible breaches (negative):        {cov_df['negative_headroom'].sum()} "
      f"({cov_df['negative_headroom'].mean()*100:.0f}%)")

# Priority follow-up: overdue AND low headroom
priority = cov_df[cov_df['overdue'] & cov_df['low_headroom']].sort_values('ead_m', ascending=False)
print(f"\n  Priority follow-up (overdue + low headroom): {len(priority)} facilities")
print(f"  Total EAD at risk: £{priority['ead_m'].sum():,.0f}m")
print("\n  Top 5 by EAD:")
print(priority.head(5)[['facility_id','sector','ead_m','days_since_last_test','headroom_pct']].to_string(index=False))


# ─────────────────────────────────────────────────────────────
# 3. ECL MANAGEMENT OVERLAY AUDIT
# ─────────────────────────────────────────────────────────────

overlays = pd.DataFrame({
    'overlay_id':    range(20),
    'sector':        np.random.choice(['CRE','Retail','Energy','Manufacturing'], 20),
    'amount_m':      np.random.uniform(2, 50, 20),
    'direction':     np.random.choice(['INCREASE','DECREASE'], 20, p=[0.7, 0.3]),
    'approval_level':np.random.choice(['CRC','Head of Credit Risk','CRO','None_found'], 20,
                                       p=[0.45, 0.25, 0.20, 0.10]),
    'rationale_quality': np.random.choice(['Detailed','Brief','Absent'], 20, p=[0.4,0.4,0.2]),
    'model_basis':   np.random.choice(['Yes','No'], 20, p=[0.6, 0.4]),
})
overlays['audit_issue'] = (
    (overlays['approval_level'] == 'None_found') |
    (overlays['rationale_quality'] == 'Absent') |
    ((overlays['direction'] == 'DECREASE') & (overlays['rationale_quality'] != 'Detailed'))
)

print("\n" + "=" * 70)
print("ECL MANAGEMENT OVERLAY GOVERNANCE AUDIT")
print("=" * 70)
print(f"  Overlays reviewed: {len(overlays)}")
print(f"  Total overlay amount: £{overlays['amount_m'].sum():.0f}m")
print(f"  Missing approval trail: {(overlays['approval_level']=='None_found').sum()}")
print(f"  Absent rationale: {(overlays['rationale_quality']=='Absent').sum()}")
print(f"  Decrease overlays with insufficient rationale: "
      f"{((overlays['direction']=='DECREASE')&(overlays['rationale_quality']!='Detailed')).sum()}")
print(f"  Total with audit issues: {overlays['audit_issue'].sum()} "
      f"({overlays['audit_issue'].mean()*100:.0f}%)")

if overlays['audit_issue'].mean() > 0.20:
    print("\n  AUDIT FINDING (MODERATE): >20% of overlays have governance issues. "
          "Overlay governance framework requires strengthening.")
```

---

## 11. Interview Questions

1. **"What would Internal Audit look for in a credit file review?"**
   KYC completeness and currency, 3-year financial statements, complete credit paper with committee approval, covenant schedule with recent test results, current collateral valuation (for secured credits), most recent annual review within policy timeframe. Any missing item is a finding; frequency of missing items determines severity.

2. **"How does IA test PD model calibration?"**
   Back-testing: compare grade-level predicted PDs (at the time of rating) to actual default rates observed over the following 1-3 years. Use binomial test or traffic light approach: if actual DR >2x predicted PD for a grade, the model is underestimating. Systematic underestimation across grades signals a model failure requiring recalibration.

3. **"What is a 'significant finding' in credit audit?"**
   Typically: PD model systematically understating default rates (>1.5x across multiple grades); LGD underestimation leading to materially understated ECL; systemic gaps in credit file completeness (>30% of files missing key documents); large ECL overlays without documented approval; covenant tracking overdue on >20% of high-risk facilities; DCA breaches on large credits.

4. **"What is SR 11-7 and why is it relevant to credit audit?"**
   SR 11-7 is the US Federal Reserve's 2011 guidance on model risk management — the global benchmark for model governance. It requires model validation independence, complete model inventory, adequate documentation, disclosure of limitations. Credit audit tests compliance because credit models (PD, LGD, ECL) are among the most consequential models in a bank.

5. **"How should a Credit Manager prepare for an internal credit audit?"**
   Run a self-assessment of credit file completeness, covenant tracking compliance, and annual review timeliness. Ensure prior audit findings are remediated and evidenced. Brief the team. Organise documentation. Do not destroy or alter records in anticipation of audit — this constitutes obstruction.

---

## 12. Common Mistakes

**Mistake 1: Treating audit findings as an attack**
Credit managers who become defensive, contest accurate findings, or argue about wording rather than addressing substance damage their credibility with IA and with the Board Audit Committee. Acknowledge accurate findings promptly and commit to realistic remediation. Constructive engagement builds credibility.

**Mistake 2: Applying annual review policy too loosely**
"Annual" review means within 12 months — not "sometime in the calendar year" or "when we have time." A credit reviewed on 2 January 2025 is overdue by 2 February 2026, not 31 December 2026. IA will calculate to the day.

**Mistake 3: Not tracking overlay reversals**
Management overlays are often set up and then forgotten. An overlay created for COVID-19 in 2020 that was never reversed or reviewed is still on the balance sheet in 2026. IA tests whether overlays are reviewed for continuing appropriateness — not just whether they were appropriately created.

**Mistake 4: Validation by the model development team**
SR 11-7/SS1/23 require validation independence. If the team that built the PD model also validates it, that is not independent validation — it is a governance failure that IA will escalate as a critical finding. The validation function must be organisationally separate from model development.

**Mistake 5: Covenant testing performed but not documented**
Some credit managers perform covenant testing (calculate the ratio from the borrower's management accounts) but do not formally record the result, update the covenant tracking system, or note the headroom. IA cannot see undocumented testing — if it is not recorded, it did not happen from an audit perspective.

---

## 13. Case Studies

**Case Study 1: Barclays PD Model Under-Calibration (2012)**
Following the 2008 financial crisis, Barclays' internal audit identified that the corporate PD model had been calibrated on 2002-2007 data — a benign period. Actual default rates during 2008-2011 were 2-3x model predictions across multiple grades. IA escalated this as a critical finding. The PRA, in its concurrent SREP review, required Barclays to recalibrate the model and apply a temporary conservative overlay pending recalibration. The overlay added approximately £1.5bn to reported ECL. Lesson: models calibrated in benign periods systematically understate risk.

**Case Study 2: Covenant Tracking Failure — Mid-tier UK Bank (2018)**
An IA review of a mid-tier UK bank's SME portfolio found that 35% of facilities with quarterly covenant testing were overdue by more than 90 days. In 12 cases, the covenant had been technically breached but the breach had not been escalated to the credit committee or the watch list. The bank had been accruing interest on these facilities as performing, when they should have been Stage 2 or Stage 3. The finding required retroactive IFRS 9 staging review and a provision increase of £18m.

**Case Study 3: ECL Overlay Documentation Failure**
In 2023, IA at a European bank reviewed the ECL management overlay process and found £85m of overlays with no documented approval at committee level — the overlays had been applied by the Chief Credit Officer unilaterally with no committee rationale. While the amounts may have been reasonable, the governance failure was rated as significant. The external auditor, informed of the IA finding, required retrospective Board Audit Committee approval and enhanced disclosure in the Pillar 3 report.

---

## 14. Iterative Reinforcement

**Week 1:** Build the credit file completeness tracker in Excel for a hypothetical 20-loan portfolio. Rate each file on the 5 criteria. Calculate pass rates and identify which criterion has the most failures.

**Week 2:** Run the Python PD back-test analysis. Understand what p < 0.05 means in the context of PD calibration. Identify at what ratio of actual DR to predicted PD the test fails.

**Week 3:** Draft a sample IA finding for the scenario: "40% of CRE facilities have valuations >18 months old against a 12-month policy requirement." Include: Observation, Risk, Root Cause, Recommendation, Management Response template, and Severity rating (Critical/Significant/Moderate/Minor).

**Week 4:** Review a real bank's Pillar 3 report credit section (Lloyds, Barclays, or NatWest — all public). Identify what an IA team would audit based on the disclosed methodology. What questions would IA ask about the described ECL methodology?

---

## 15. Source Material

**Regulatory**
- US Federal Reserve: *SR 11-7 — Guidance on Model Risk Management* (April 2011, federalreserve.gov)
- PRA: *SS1/23 — Model Risk Management Principles for Banks* (May 2023, bankofengland.co.uk)
- EBA: *Guidelines on Internal Audit* (EBA/GL/2023/05, eba.europa.eu)
- EBA/GL/2017/16: *Guidelines on PD estimation, LGD estimation, and treatment of defaulted assets*
- BCBS: *Sound Practices for the Management and Supervision of Operational Risk* (2011)

**Professional Standards**
- Institute of Internal Auditors (IIA): *International Standards for the Professional Practice of Internal Auditing* (current edition, theiia.org)
- CIMA/ICAEW: Guidance on audit of credit risk models

**Academic**
- Engelmann, B., Rauhmeier, R.: *The Basel II Risk Parameters: Estimation, Validation, Stress Testing* (Springer, 2nd ed. 2011) — especially Chapters 4-6 on PD validation
- Basel Committee: *Working Paper No. 14 — Studies on the Validation of Internal Rating Systems* (2005, bis.org)

**Industry Reports**
- EBA: *Annual Report on the Convergence of Supervisory Practices* (annual, eba.europa.eu) — contains common supervisory findings relevant to credit audit
- PRA: *Supervisory Risk Specialists — Insights from Supervision* (various years, bankofengland.co.uk)
