# M13 — Internal Risk Ratings (IRR)

> **Academy Track:** Commercial & Corporate Credit Risk | Module 13 of 20
> **Prerequisite Modules:** M09–M12 (Credit Decision series), M01–M08 (Financial Analysis)
> **Estimated Study Time:** 10–12 hours

---

## 1. Business Purpose

An Internal Risk Rating (IRR) is a bank's quantitative assessment of the credit quality of every borrower to whom it has, or is considering, a credit exposure. It is a single grade on a master rating scale that summarises the analyst's comprehensive assessment of the probability that the borrower will default on its obligations within a defined time horizon (typically one year).

**Why IRRs are fundamental to credit risk management:**

The IRR is not a tick-box exercise. It is the cornerstone of virtually every downstream risk management activity:

1. **Pricing:** The credit margin on a loan is calibrated against the borrower's risk grade. Higher risk → higher margin to compensate for higher expected loss and capital cost.

2. **Credit appetite:** The bank's Risk Appetite Statement specifies the maximum percentage of the portfolio that may be at each risk grade. Rating a borrower accurately ensures the portfolio remains within appetite.

3. **Provisioning (IFRS 9):** The borrower's current rating and any deterioration in rating drives the staging decision (Stage 1, 2, or 3) and the ECL calculation (EL = PD × LGD × EAD).

4. **Capital (Basel IRB):** Under the Internal Ratings-Based (IRB) Approach, the bank uses its own PD estimates (derived from the rating) to calculate Risk-Weighted Assets. Accurate ratings mean accurate capital allocation.

5. **Portfolio management:** Aggregate rating distributions show whether the portfolio is improving or deteriorating over time. Rating migration matrices track the movement of borrowers between grades, which drives loss forecasting.

6. **Early warning:** A rating downgrade is an early warning signal — it triggers enhanced monitoring, watchlist classification, and potentially provisioning.

**The rating horizon:**

Most bank IRRs assess a 12-month ("point-in-time") PD. Some banks also assign a "through-the-cycle" (TTC) rating that attempts to abstract from the current phase of the credit cycle. TTC ratings are more stable across cycles and are preferred for capital planning and pricing.

---

## 2. Accounting Concepts

**How accounting data feeds into the rating:**

The IRR is primarily driven by financial analysis. The financial ratios used in the rating scorecard are derived from the borrower's financial statements. This means the quality and reliability of the accounts directly affects the quality of the rating.

**Accounting quality assessment — what the rater must check:**

**Audit opinion:** An unqualified (clean) audit opinion provides reasonable assurance that the accounts are free from material misstatement. A qualified opinion, emphasis of matter, or going concern note materially reduces confidence in the financial data and should trigger an automatic minimum floor on the rating (i.e., the rating cannot be above a certain grade if there is a going concern note).

**Revenue recognition quality:** Does the company recognise revenue aggressively? Construction companies using percentage-of-completion, software companies capitalising implementation costs as revenue, or companies front-loading subscription revenues may show higher reported revenues and profits than their cash flows support.

**Depreciation policies:** Companies that use unrealistically long asset lives understate depreciation, inflating profits. Comparison to sector peers is essential. A logistics company depreciating trucks over 15 years when the industry norm is 8–10 years is inflating EBITDA relative to maintenance capex requirements.

**Pension deficits (IAS 19):** For UK and European companies with defined benefit pension schemes, the pension deficit is a real liability that should be included in the net debt calculation for rating purposes. Pension deficits can be material and are often missed by analysts who focus only on bank debt.

**Off-balance-sheet liabilities:** Operating lease commitments (pre-IFRS 16), purchase commitments, finance receivables sold with recourse. These represent real economic obligations that the rating must capture.

---

## 3. Financial Concepts

**The two-dimensional rating framework:**

Most bank IRR systems combine two scores:

**Financial Risk Score (quantitative):**
Derived from financial ratios applied to historical and projected financial data. Typically includes:
- Leverage (Net Debt / EBITDA)
- Interest cover (EBITDA / Net Interest)
- Cash flow adequacy (FCF / Debt Service)
- Liquidity (Current Ratio, Quick Ratio)
- Profitability (EBITDA margin, Return on Assets)
- Capital structure (Debt / Equity, Equity Ratio)
- Size (Revenue or Total Assets — larger companies are generally lower risk)

**Business Risk Score (qualitative):**
Assessed by the analyst based on qualitative factors:
- Industry risk: cyclicality, structural growth/decline, regulatory risk
- Competitive position: market share, pricing power, barriers to entry
- Management quality: track record, depth of management team, succession
- Ownership: listed, private, family-owned, PE-backed (each has different implications)
- Country risk: for cross-border exposures
- Customer/supplier concentration
- ESG factors (increasingly weighted in rating frameworks)

**Combining the two scores:**

Different banks use different combination methodologies:
```
Composite Score = (Financial Risk Score × Weight_F) + (Business Risk Score × Weight_B)

Common weighting: 50% financial, 50% business
Some banks: 60% financial, 40% business for investment grade
            40% financial, 60% qualitative for start-ups / pre-profitability
```

**Override mechanism:**

The composite score produces a "model grade" but the analyst can override this within defined limits (typically ±1 notch). Overrides must be documented and justified. Systematic override patterns are a risk — an analyst who always overrides model grades upward is distorting the rating system.

---

## 4. Statistical Concepts

**Probability of Default (PD):**

Each rating grade maps to a PD range. PD is expressed either as a percentage (e.g., 0.15%) or in basis points (e.g., 15 bps). It represents the probability that the borrower defaults within the next 12 months.

**The master rating scale:**

```
Grade | Description        | PD Range (bps) | S&P Equiv | Moody's Equiv
------|--------------------|----------------|-----------|---------------
  1   | Minimal risk       | 1–3            | AAA–AA+   | Aaa–Aa1
  2   | Excellent          | 3–6            | AA–AA-    | Aa2–Aa3
  3   | Very good          | 6–12           | A+–A      | A1–A2
  4   | Good               | 12–20          | A-–BBB+   | A3–Baa1
  5   | Acceptable         | 20–40          | BBB       | Baa2–Baa3
  6   | Satisfactory       | 40–90          | BBB-–BB+  | Ba1
  7   | Below average      | 90–200         | BB–BB-    | Ba2–Ba3
  8   | Weak               | 200–500        | B+–B      | B1–B2
  9   | Very weak          | 500–1500       | B-–CCC+   | B3–Caa1
 10   | Near/in default    | >1500          | CCC–D     | Caa2–C
```

*Note: This is an illustrative scale. Each bank has its own proprietary scale with slightly different ranges.*

**Calibration — ensuring the PDs are accurate:**

A bank's PD estimates must be validated against actual default experience. The calibration test asks: "Of all borrowers we rated Grade 7 last year, what percentage actually defaulted within 12 months?" If the predicted PD was 1.5% but the actual default rate was 0.5%, the model is over-predicting risk (conservative). If actual default rate was 3%, the model is under-predicting risk (dangerous).

Calibration is assessed using:
- **Brier Score:** Mean squared error between predicted PD and actual default indicator
- **Hosmer-Lemeshow test:** Statistical test for calibration across quantiles
- **Traffic light approach:** Binomial test of whether observed defaults are consistent with predicted PD at a confidence level

**Discriminatory power (ranking ability):**

Even if a model is well-calibrated, it must also be able to rank defaulters above non-defaulters (i.e., defaulters should have higher predicted PDs than non-defaulters).

Measured by:
- **Gini Coefficient / Accuracy Ratio:** 0 = no discriminatory power, 1 = perfect power. A good corporate model should have Gini > 0.60.
- **Area Under the ROC Curve (AUROC):** AUROC = 0.5 + Gini/2. Target AUROC > 0.80.

```python
# Conceptual ROC curve for a rating model
from sklearn.metrics import roc_curve, roc_auc_score

# defaulted: 1 = defaulted, 0 = not defaulted
# pd_predicted: model's predicted PD for each borrower

fpr, tpr, thresholds = roc_curve(defaulted, pd_predicted)
auc = roc_auc_score(defaulted, pd_predicted)
gini = 2 * auc - 1
```

**Rating migration matrices:**

A migration matrix tracks how borrowers' ratings change from one year to the next. Rows = starting grade, columns = ending grade:

```
             Grade at End of Year
             1      2      3      4      5      6      7      8      9     10(D)
Grade  1 [99.1%   0.7%   0.2%   0.0%   0.0%   0.0%   0.0%   0.0%   0.0%   0.0%]
Start  5 [ 0.0%   0.1%   0.5%   2.0%  88.5%   5.5%   2.2%   0.7%   0.3%   0.2%]
       7 [ 0.0%   0.0%   0.1%   0.2%   0.8%   5.4%  78.0%   9.5%   4.2%   1.8%]
      10 [ 0.0%   0.0%   0.0%   0.0%   0.0%   0.0%   0.0%   0.0%   0.0% 100.0%]
```

The diagonal represents "no change" — most borrowers stay at the same grade year-on-year. High off-diagonal concentrations, especially downward (toward higher grade numbers = worse credit), signal credit quality deterioration.

---

## 5. Regulatory Framework

**Basel II/III — Credit Risk Internal Ratings-Based (IRB) Approach:**

The IRB approach allows banks to use their own PD estimates (Foundation IRB) or own PD + LGD + EAD estimates (Advanced IRB) to calculate risk-weighted assets. This is the regulatory basis for the entire IRR system.

**Key Basel requirements for IRB:**

- **Article 169 CRR:** Each obligor must have a rating grade. The rating must be assigned or reviewed at least annually.
- **Article 170 CRR:** Rating criteria must cover all factors relevant to PD estimation. The model must use financial and non-financial (qualitative) information.
- **Article 171 CRR:** Human overrides are permitted but must be documented with clear rationale.
- **Article 174 CRR:** Banks must have a historical PD calibration based on at least 5 years of default data (7 years for LGD/EAD).
- **Article 185 CRR:** Model validation must be independent of model development (separation of duties).

**PRA Supervisory Statement SS11/13 (UK):**

Sets out the PRA's expectations for IRB model governance, including:
- Model validation frequency (at least annually)
- Benchmarking of PD estimates against external data sources
- Senior management oversight of model performance
- Restrictions on model overlays and overrides

**IFRS 9 — Staging and PD:**

IFRS 9 requires:
- Stage 1: 12-month ECL = PD_12M × LGD × EAD
- Stage 2 (SICR): Lifetime ECL = Σ (Conditional_PD_t × LGD × EAD × Discount_Factor_t) for each year of facility life
- The bank's IRR PD estimates are the primary input to the ECL model
- A rating downgrade of ≥ 2 notches (illustrative; each bank sets its own rule) typically triggers a Stage 2 assessment

**EBA Guidelines on IRB approach:**

EBA/GL/2017/03: Guidelines on PD estimation, LGD estimation and treatment of defaulted exposures — the definitive technical standard for IRB model development and validation.

---

## 6. Data Required

**Data for financial risk scoring:**

| Ratio/Metric | Source | Notes |
|-------------|--------|-------|
| Net Debt / EBITDA | Audited accounts, management accounts | Primary leverage indicator |
| EBITDA / Interest | Audited accounts | Coverage; use cash interest, not accounting interest |
| FCF / Debt Service | Audited accounts + capital expenditure schedule | Tighter than EBITDA coverage |
| Current Ratio | Audited accounts | Short-term liquidity |
| EBITDA Margin % | Audited accounts | Profitability and pricing power |
| Revenue (size) | Audited accounts | Larger = lower PD empirically |
| Revenue growth trend | 3–5 years audited accounts | Momentum |
| Equity Ratio | Audited accounts | Capital structure resilience |
| Pension deficit (off-balance-sheet) | Accounts notes (IAS 19) | Must be added to net debt |

**Data for business risk scoring:**

| Factor | Source | Assessment Approach |
|--------|--------|-------------------|
| Industry risk rating | Internal industry watch list / sector team | Pre-assigned scores by sector |
| Market position | Management interview, sector research | Qualitative assessment against defined criteria |
| Management quality | Management meetings, track record analysis | Qualitative; biographies, prior experience |
| Ownership structure | Legal due diligence, Companies House | Rating implications by ownership type |
| Country risk | External country risk ratings (Euler Hermes, Coface, Oxford Economics) | Pre-assigned score by country |
| Customer concentration | Sales analysis from management accounts | % revenue from top 3/5 customers |
| ESG factors | CDP disclosure, company sustainability report, MSCI ESG rating | Increasingly formal scoring |

---

## 7. How Analysts Actually Work

**The rating workflow:**

**Step 1 — Financial data extraction**
The analyst extracts 3–5 years of audited financial data and most recent management accounts into the rating model (scorecard). For a first rating, this involves manually keying or uploading data from the accounts. For a review, it involves updating the model with the new period's data.

**Step 2 — Ratio calculation**
The model auto-calculates the key ratios. The analyst checks these for reasonableness: "Does a leverage ratio of 1.2x look right for a company that took on £40m of acquisition debt last year?" If not, there may be a data entry error.

**Step 3 — Financial risk score derivation**
Each ratio is mapped to a score using the bank's internal scorecard. Each ratio falls into a band (e.g., Net Leverage < 1.0x = 5 points, 1.0x–2.0x = 4 points, 2.0x–3.0x = 3 points, etc.). The weighted sum of ratio scores produces the Financial Risk Score.

**Step 4 — Business risk assessment**
The analyst completes the qualitative assessment section of the scorecard, answering structured questions about industry risk, management, market position, etc. Each answer maps to a score. This requires real analytical judgement — it cannot be automated.

**Step 5 — Composite score and model grade**
The model combines Financial Risk Score and Business Risk Score to produce a composite score, which maps to the model-implied rating grade.

**Step 6 — Override assessment**
The analyst considers whether the model grade appropriately captures all risks. Reasons to override downward (make the rating worse than the model suggests):
- The model does not capture material off-balance-sheet risks
- There are going concern or fraud indicators
- The business is in structural decline that historical ratios don't yet reflect
- There is a binary event risk (major litigation, regulatory action) not captured by historical financials

Reasons to override upward (make the rating better than the model suggests):
- The model is penalising a temporary, explainable financial deterioration
- Strong parental support not captured in the standalone model
- Excellent liquidity or asset coverage not reflected in the ratios

**Step 7 — Rating committee / peer review**
For material exposures (above a threshold, e.g., >£5m), the rating must be reviewed by a second analyst or a rating committee. This prevents individual bias.

**Step 8 — Documentation**
The rating rationale must be documented: what the model said, whether there was an override and why, and any key risk factors that drove the assessment. This documentation is the audit trail for regulators and for future reference.

**Common rating challenges:**

*Cyclical industries:* A metal manufacturer will have very different ratios at peak vs. trough of the commodity cycle. A point-in-time rating based on current ratios may be misleading. The analyst must assess through-the-cycle performance and apply a "cyclicality adjustment" if the borrower is at a cyclical peak.

*Acquisitive companies:* A company that has made acquisitions will have goodwill and integration risk not captured by historical ratios. The analyst must consider: How was the acquisition financed? Has it been integrated successfully? Is goodwill adequately supported?

*Start-up or early-stage companies:* No historical financial data. The rating must rely much more heavily on business risk factors, management assessment, and market analysis. Financial risk models are largely inapplicable.

---

## 8. Excel Implementation

```excel
==============================================================
SHEET: Financial_Risk_Scorecard
==============================================================
-- Illustrative scorecard for a corporate borrower

-- Column structure: Metric | Value | Score_Band_Description | Score (1-5)
-- Score 5 = best (lowest risk), Score 1 = worst (highest risk)

-- Section 1: Leverage (Weight: 30%)
A10: "Net Leverage (Net Debt / EBITDA)"
B10: [linked from financials sheet]     -- e.g., 2.8x
C10: =IFS(B10<1.0, "< 1.0x",
          B10<2.0, "1.0x - 2.0x",
          B10<3.0, "2.0x - 3.0x",
          B10<4.0, "3.0x - 4.0x",
          B10<5.0, "4.0x - 5.0x",
          TRUE,    "> 5.0x")
D10: =IFS(B10<1.0, 5,
          B10<2.0, 4,
          B10<3.0, 3,
          B10<4.0, 2,
          B10<5.0, 1,
          TRUE,    0)           -- 0 = triggers floor on composite grade

-- Section 2: Coverage (Weight: 25%)
A15: "Interest Cover (EBITDA / Net Interest)"
B15: [linked from financials]
D15: =IFS(B15>6.0, 5,
          B15>4.0, 4,
          B15>3.0, 3,
          B15>2.0, 2,
          B15>1.0, 1,
          TRUE,    0)

-- Section 3: Cash Flow (Weight: 20%)
A20: "FCF / Debt Service"
B20: [linked from financials]
D20: =IFS(B20>1.50, 5, B20>1.25, 4, B20>1.00, 3, B20>0.75, 2, B20>0.50, 1, TRUE, 0)

-- Section 4: Liquidity (Weight: 10%)
A25: "Current Ratio"
B25: [linked from balance sheet]
D25: =IFS(B25>2.0, 5, B25>1.5, 4, B25>1.0, 3, B25>0.75, 2, TRUE, 1)

-- Section 5: Profitability (Weight: 10%)
A30: "EBITDA Margin %"
B30: [linked from financials]
D30: =IFS(B30>20%, 5, B30>15%, 4, B30>10%, 3, B30>5%, 2, B30>0%, 1, TRUE, 0)

-- Section 6: Size (Weight: 5%)
A35: "Revenue (£m)"
B35: [linked from financials]
D35: =IFS(B35>500, 5, B35>100, 4, B35>25, 3, B35>5, 2, TRUE, 1)

-- Financial Risk Score (weighted average)
B45: "Financial Risk Score (max 5.0)"
C45: =SUMPRODUCT(D10:D35, {0.30, 0.25, 0.20, 0.10, 0.10, 0.05})

-- Financial Risk Grade (maps score to grade number)
B46: "Financial Risk Grade (1-10)"
C46: =CHOOSE(MATCH(C45, {0,1,2,3,4,5}, 1), 10, 9, 7, 5, 3, 1)
     -- Maps score 0-1→Grade10, 1-2→Grade9, 2-3→Grade7, 3-4→Grade5, 4-5→Grade3, 5→Grade1


==============================================================
SHEET: Business_Risk_Scorecard
==============================================================
-- Qualitative assessment — analyst fills in the "Score" column

Row | Factor                    | Weight | Score (1-5) | Comments
 10 | Industry Risk             | 25%    | [analyst]   | 1=Declining/Cyclical, 5=Stable/Growing
 15 | Competitive Position      | 20%    | [analyst]   | 1=Weak, 5=Market Leader
 20 | Management Quality        | 20%    | [analyst]   | 1=Inexperienced, 5=Excellent track record
 25 | Ownership/Governance      | 15%    | [analyst]   | 1=Opaque, 5=Listed with strong governance
 30 | Customer Concentration    | 10%    | [analyst]   | 1=>50% from 1 customer, 5=Diversified
 35 | Country Risk              | 5%     | [analyst]   | Linked to sovereign rating lookup
 40 | ESG Risk                  | 5%     | [analyst]   | 1=High ESG risk exposure, 5=Sector leader

B50: "Business Risk Score (max 5.0)"
C50: =SUMPRODUCT(D10:D40, {0.25, 0.20, 0.20, 0.15, 0.10, 0.05, 0.05})


==============================================================
SHEET: Composite_Rating
==============================================================
-- Combines financial and business risk scores

B5:  Financial_Weight           = 50%
B6:  Business_Weight            = 50%

B10: Financial_Risk_Score       = Financial_Risk_Scorecard!C45
B11: Business_Risk_Score        = Business_Risk_Scorecard!C50
B12: Composite_Score            = B10 * B5 + B11 * B6

-- Model-implied grade (from composite score):
B15: Model_Grade                = VLOOKUP(B12, grade_lookup_table, 2, TRUE)
     -- grade_lookup_table: Score Bands → Grade Numbers

-- Override section:
B20: Override_Applied           = [dropdown: YES/NO]
B21: Override_Direction         = [dropdown: UPGRADE/DOWNGRADE]
B22: Override_Notches           = [1 or 2 — typically capped at ±2]
B23: Override_Rationale         = [free text — mandatory if YES]
B24: Override_Approved_By       = [user ID]

-- Final grade:
B28: Final_Grade                = IF(B20="YES",
                                    B15 + IF(B21="DOWNGRADE", B22, -B22),
                                    B15)
B29: Final_PD_BPS               = VLOOKUP(B28, grade_pd_table, 2, FALSE)
B30: PD_Description             = VLOOKUP(B28, grade_pd_table, 3, FALSE)
B31: S_P_Equivalent             = VLOOKUP(B28, grade_pd_table, 4, FALSE)
```

---

## 9. SQL Implementation

```sql
-- ============================================================
-- QUERY 1: Current rating distribution across the portfolio
-- ============================================================
SELECT
    ra.risk_grade,
    -- PD range description
    grm.pd_range_description,
    grm.sp_equivalent,
    grm.pd_midpoint_bps,
    -- Portfolio metrics by grade
    COUNT(DISTINCT c.customer_id)                AS borrower_count,
    SUM(f.committed_limit) / 1e6                 AS committed_gbpm,
    SUM(f.current_drawn) / 1e6                   AS drawn_gbpm,
    SUM(f.committed_limit) / 1e6 
        / SUM(SUM(f.committed_limit)) OVER () * 100  AS pct_of_portfolio,
    -- Expected Loss contribution
    SUM(f.current_drawn * grm.pd_midpoint_bps / 10000 * f.lgd_pct) / 1e6
        AS expected_loss_gbpm
FROM risk_assessments ra
JOIN customers c ON ra.customer_id = c.customer_id
JOIN facilities f ON c.customer_id = f.customer_id
JOIN grade_reference_map grm ON ra.risk_grade = grm.grade
WHERE ra.rating_date = (
    SELECT MAX(ra2.rating_date) FROM risk_assessments ra2 
    WHERE ra2.customer_id = ra.customer_id
)
    AND f.facility_status = 'ACTIVE'
GROUP BY ra.risk_grade, grm.pd_range_description, grm.sp_equivalent, grm.pd_midpoint_bps
ORDER BY ra.risk_grade;


-- ============================================================
-- QUERY 2: Rating migration matrix (1-year migrations)
-- ============================================================
WITH migrations AS (
    SELECT
        c.customer_id,
        c.customer_name,
        ra_start.risk_grade   AS grade_start,
        ra_end.risk_grade     AS grade_end,
        ra_start.rating_date  AS start_date,
        ra_end.rating_date    AS end_date
    FROM customers c
    -- Rating at start of period (e.g., 1 Jan 2024)
    JOIN risk_assessments ra_start ON c.customer_id = ra_start.customer_id
        AND ra_start.rating_date = (
            SELECT MAX(ra.rating_date) FROM risk_assessments ra
            WHERE ra.customer_id = c.customer_id
            AND ra.rating_date <= '2024-01-01'
        )
    -- Rating at end of period (e.g., 31 Dec 2024)
    JOIN risk_assessments ra_end ON c.customer_id = ra_end.customer_id
        AND ra_end.rating_date = (
            SELECT MAX(ra.rating_date) FROM risk_assessments ra
            WHERE ra.customer_id = c.customer_id
            AND ra.rating_date <= '2024-12-31'
        )
    WHERE ra_start.rating_date IS NOT NULL
        AND ra_end.rating_date IS NOT NULL
)
-- Pivot to create migration matrix
SELECT
    grade_start AS [Starting Grade],
    COUNT(CASE WHEN grade_end = 1  THEN 1 END) AS [Grade 1],
    COUNT(CASE WHEN grade_end = 2  THEN 1 END) AS [Grade 2],
    COUNT(CASE WHEN grade_end = 3  THEN 1 END) AS [Grade 3],
    COUNT(CASE WHEN grade_end = 4  THEN 1 END) AS [Grade 4],
    COUNT(CASE WHEN grade_end = 5  THEN 1 END) AS [Grade 5],
    COUNT(CASE WHEN grade_end = 6  THEN 1 END) AS [Grade 6],
    COUNT(CASE WHEN grade_end = 7  THEN 1 END) AS [Grade 7],
    COUNT(CASE WHEN grade_end = 8  THEN 1 END) AS [Grade 8],
    COUNT(CASE WHEN grade_end = 9  THEN 1 END) AS [Grade 9],
    COUNT(CASE WHEN grade_end = 10 THEN 1 END) AS [Grade 10 (Default)],
    COUNT(*)                                    AS [Total]
FROM migrations
GROUP BY grade_start
ORDER BY grade_start;


-- ============================================================
-- QUERY 3: Override analysis — detect systematic bias
-- ============================================================
SELECT
    ra.rated_by_user_id,
    u.full_name                             AS analyst_name,
    COUNT(*)                                AS total_ratings,
    SUM(CASE WHEN ra.override_applied = 1 THEN 1 ELSE 0 END) 
        AS override_count,
    SUM(CASE WHEN ra.override_applied = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*) 
        AS override_rate_pct,
    -- Net override direction (positive = systematic upgrades, negative = downgrades)
    AVG(CASE 
        WHEN ra.override_direction = 'UPGRADE' THEN -ra.override_notches
        WHEN ra.override_direction = 'DOWNGRADE' THEN ra.override_notches
        ELSE 0 
    END) AS avg_net_override_notches,
    -- Is there a pattern of upgrading models? (risk: inflated grades)
    SUM(CASE WHEN ra.override_direction = 'UPGRADE' THEN 1 ELSE 0 END) * 100.0 
        / NULLIF(SUM(CASE WHEN ra.override_applied = 1 THEN 1 ELSE 0 END), 0) 
        AS pct_overrides_that_are_upgrades
FROM risk_assessments ra
JOIN users u ON ra.rated_by_user_id = u.user_id
WHERE ra.rating_date >= DATEADD(YEAR, -1, GETDATE())
GROUP BY ra.rated_by_user_id, u.full_name
HAVING COUNT(*) >= 10    -- Only analysts with meaningful volume
ORDER BY pct_overrides_that_are_upgrades DESC;


-- ============================================================
-- QUERY 4: IFRS 9 staging based on rating
-- ============================================================
WITH staging_logic AS (
    SELECT
        c.customer_id,
        c.customer_name,
        f.facility_id,
        f.current_drawn,
        f.committed_limit,
        -- Current rating
        ra_current.risk_grade                       AS current_grade,
        ra_current.pd_bps                           AS current_pd_bps,
        -- Origination rating
        ra_orig.risk_grade                          AS origination_grade,
        ra_orig.pd_bps                              AS origination_pd_bps,
        -- Grade deterioration since origination
        ra_current.risk_grade - ra_orig.risk_grade  AS grade_deterioration,
        -- PD multiple since origination
        CAST(ra_current.pd_bps AS FLOAT) 
            / NULLIF(ra_orig.pd_bps, 0)             AS pd_multiple,
        -- Days past due (actual payment performance)
        f.days_past_due,
        -- Watchlist flag
        c.watchlist_flag,
        c.watchlist_date
    FROM customers c
    JOIN facilities f ON c.customer_id = f.customer_id
    JOIN risk_assessments ra_current ON c.customer_id = ra_current.customer_id
        AND ra_current.rating_date = (
            SELECT MAX(r.rating_date) FROM risk_assessments r 
            WHERE r.customer_id = c.customer_id
        )
    JOIN risk_assessments ra_orig ON ra_orig.assessment_id = f.origination_rating_id
    WHERE f.facility_status = 'ACTIVE'
)
SELECT
    customer_id, customer_name, facility_id,
    current_drawn / 1e6         AS drawn_gbpm,
    current_grade, origination_grade, grade_deterioration,
    ROUND(pd_multiple, 2)       AS pd_multiple,
    days_past_due,
    watchlist_flag,
    -- IFRS 9 Staging determination
    CASE
        -- Stage 3: Credit impaired
        WHEN days_past_due > 90 THEN 'STAGE 3 - CREDIT IMPAIRED'
        WHEN current_grade >= 10 THEN 'STAGE 3 - CREDIT IMPAIRED'
        WHEN watchlist_flag = 'IMPAIRED' THEN 'STAGE 3 - CREDIT IMPAIRED'
        -- Stage 2: Significant Increase in Credit Risk
        WHEN grade_deterioration >= 3 THEN 'STAGE 2 - SICR (Grade deterioration >= 3)'
        WHEN pd_multiple >= 3.0 THEN 'STAGE 2 - SICR (PD tripled since origination)'
        WHEN current_grade >= 8 THEN 'STAGE 2 - SICR (Below investment grade watchlist)'
        WHEN days_past_due >= 30 THEN 'STAGE 2 - SICR (30+ DPD)'
        WHEN watchlist_flag = 'WATCHLIST' THEN 'STAGE 2 - SICR (Watchlist)'
        -- Stage 1: Performing
        ELSE 'STAGE 1 - PERFORMING'
    END AS ifrs9_stage,
    -- ECL basis
    CASE
        WHEN days_past_due > 90 OR current_grade >= 10 THEN '12m ECL (lifetime for Stage 3 per IAS 39 equivalent)'
        WHEN grade_deterioration >= 3 OR pd_multiple >= 3.0 
             OR current_grade >= 8 OR days_past_due >= 30 
             OR watchlist_flag IN ('WATCHLIST','IMPAIRED') 
        THEN 'LIFETIME ECL'
        ELSE '12-MONTH ECL'
    END AS ecl_basis
FROM staging_logic
ORDER BY current_grade DESC, grade_deterioration DESC;


-- ============================================================
-- QUERY 5: Model validation — calibration test
-- ============================================================
WITH predicted_vs_actual AS (
    SELECT
        ra.risk_grade,
        ra.pd_bps / 10000.0                         AS predicted_pd,
        COUNT(*)                                     AS borrower_count,
        SUM(CASE WHEN d.default_date IS NOT NULL 
                  AND d.default_date BETWEEN ra.rating_date 
                      AND DATEADD(YEAR, 1, ra.rating_date)
             THEN 1 ELSE 0 END)                     AS actual_defaults,
        SUM(CASE WHEN d.default_date IS NOT NULL 
                  AND d.default_date BETWEEN ra.rating_date 
                      AND DATEADD(YEAR, 1, ra.rating_date)
             THEN 1.0 ELSE 0 END) / COUNT(*)        AS actual_default_rate
    FROM risk_assessments ra
    LEFT JOIN defaults d ON ra.customer_id = d.customer_id
    WHERE ra.rating_date BETWEEN '2015-01-01' AND '2023-12-31'
    GROUP BY ra.risk_grade, ra.pd_bps
)
SELECT
    risk_grade,
    borrower_count,
    ROUND(predicted_pd * 10000, 1)          AS predicted_pd_bps,
    actual_defaults,
    ROUND(actual_default_rate * 10000, 1)   AS actual_default_rate_bps,
    -- Calibration error
    ROUND((actual_default_rate - predicted_pd) / predicted_pd * 100, 1)
        AS calibration_error_pct,
    -- Flag significant miscalibration
    CASE 
        WHEN ABS(actual_default_rate - predicted_pd) / predicted_pd > 0.50
        THEN 'RECALIBRATION NEEDED'
        WHEN ABS(actual_default_rate - predicted_pd) / predicted_pd > 0.25
        THEN 'MONITOR'
        ELSE 'ACCEPTABLE'
    END AS calibration_flag
FROM predicted_vs_actual
ORDER BY risk_grade;
```

---

## 10. Python Implementation

```python
"""
internal_risk_rating.py
IRR scorecard engine, model validation, and IFRS 9 staging.
Provides a complete workflow from financial inputs to rating grade.
"""

import pandas as pd
import numpy as np
from dataclasses import dataclass, field
from typing import Optional
import matplotlib.pyplot as plt
from sklearn.metrics import roc_auc_score, roc_curve


# ─────────────────────────────────────────────────────────────
# MASTER RATING SCALE
# ─────────────────────────────────────────────────────────────

MASTER_SCALE = pd.DataFrame([
    {'grade': 1,  'description': 'Minimal risk',    'pd_low_bps': 1,    'pd_high_bps': 3,    'sp_equiv': 'AAA-AA+',  'moody_equiv': 'Aaa-Aa1'},
    {'grade': 2,  'description': 'Excellent',       'pd_low_bps': 3,    'pd_high_bps': 6,    'sp_equiv': 'AA-AA-',   'moody_equiv': 'Aa2-Aa3'},
    {'grade': 3,  'description': 'Very good',       'pd_low_bps': 6,    'pd_high_bps': 12,   'sp_equiv': 'A+-A',     'moody_equiv': 'A1-A2'},
    {'grade': 4,  'description': 'Good',            'pd_low_bps': 12,   'pd_high_bps': 20,   'sp_equiv': 'A--BBB+',  'moody_equiv': 'A3-Baa1'},
    {'grade': 5,  'description': 'Acceptable',      'pd_low_bps': 20,   'pd_high_bps': 40,   'sp_equiv': 'BBB',      'moody_equiv': 'Baa2-Baa3'},
    {'grade': 6,  'description': 'Satisfactory',    'pd_low_bps': 40,   'pd_high_bps': 90,   'sp_equiv': 'BBB--BB+', 'moody_equiv': 'Ba1'},
    {'grade': 7,  'description': 'Below average',   'pd_low_bps': 90,   'pd_high_bps': 200,  'sp_equiv': 'BB-BB-',   'moody_equiv': 'Ba2-Ba3'},
    {'grade': 8,  'description': 'Weak',            'pd_low_bps': 200,  'pd_high_bps': 500,  'sp_equiv': 'B+-B',     'moody_equiv': 'B1-B2'},
    {'grade': 9,  'description': 'Very weak',       'pd_low_bps': 500,  'pd_high_bps': 1500, 'sp_equiv': 'B--CCC+',  'moody_equiv': 'B3-Caa1'},
    {'grade': 10, 'description': 'Near/in default', 'pd_low_bps': 1500, 'pd_high_bps': 10000,'sp_equiv': 'CCC-D',    'moody_equiv': 'Caa2-C'},
])
MASTER_SCALE['pd_midpoint_bps'] = (MASTER_SCALE['pd_low_bps'] + MASTER_SCALE['pd_high_bps']) / 2


# ─────────────────────────────────────────────────────────────
# SCORECARD DEFINITIONS
# ─────────────────────────────────────────────────────────────

FINANCIAL_SCORECARD = [
    # (metric_name, weight, bands: [(upper_bound, score)])
    # Score 5 = best, 0 = floor trigger
    ('net_leverage',    0.30, [(1.0, 5), (2.0, 4), (3.0, 3), (4.0, 2), (5.0, 1), (999, 0)]),
    ('interest_cover',  0.25, [(1.0, 0), (2.0, 1), (3.0, 2), (4.0, 3), (6.0, 4), (999, 5)]),
    ('dscr',            0.20, [(0.75, 0), (1.0, 1), (1.25, 2), (1.50, 3), (2.0, 4), (999, 5)]),
    ('current_ratio',   0.10, [(0.75, 1), (1.0, 2), (1.5, 3), (2.0, 4), (999, 5)]),
    ('ebitda_margin',   0.10, [(0.0, 0), (0.05, 1), (0.10, 2), (0.15, 3), (0.20, 4), (999, 5)]),
    ('revenue_m',       0.05, [(5, 1), (25, 2), (100, 3), (500, 4), (9999, 5)]),
]

BUSINESS_SCORECARD_FACTORS = [
    'industry_risk', 'competitive_position', 'management_quality',
    'ownership_governance', 'customer_concentration', 'country_risk', 'esg_risk',
]

BUSINESS_WEIGHTS = {
    'industry_risk': 0.25,
    'competitive_position': 0.20,
    'management_quality': 0.20,
    'ownership_governance': 0.15,
    'customer_concentration': 0.10,
    'country_risk': 0.05,
    'esg_risk': 0.05,
}


def score_metric(value: float, bands: list) -> int:
    """Map a metric value to a score using ordered bands."""
    for upper, score in bands:
        if value <= upper:
            return score
    return bands[-1][1]


# ─────────────────────────────────────────────────────────────
# RATING ENGINE
# ─────────────────────────────────────────────────────────────

@dataclass
class FinancialInputs:
    net_leverage: float
    interest_cover: float
    dscr: float
    current_ratio: float
    ebitda_margin: float
    revenue_m: float    # Revenue in £ millions


@dataclass
class BusinessInputs:
    industry_risk: int              # 1-5
    competitive_position: int
    management_quality: int
    ownership_governance: int
    customer_concentration: int
    country_risk: int
    esg_risk: int


@dataclass
class RatingOutput:
    borrower_name: str
    financial_risk_score: float
    business_risk_score: float
    composite_score: float
    model_grade: int
    override_applied: bool = False
    override_direction: Optional[str] = None
    override_notches: int = 0
    override_rationale: str = ""
    final_grade: int = 0
    financial_weight: float = 0.50
    business_weight: float = 0.50

    def __post_init__(self):
        if self.final_grade == 0:
            if self.override_applied:
                if self.override_direction == 'DOWNGRADE':
                    self.final_grade = min(10, self.model_grade + self.override_notches)
                else:
                    self.final_grade = max(1, self.model_grade - self.override_notches)
            else:
                self.final_grade = self.model_grade

    @property
    def pd_bps(self) -> float:
        row = MASTER_SCALE[MASTER_SCALE['grade'] == self.final_grade].iloc[0]
        return row['pd_midpoint_bps']

    @property
    def pd_pct(self) -> float:
        return self.pd_bps / 10000

    @property
    def sp_equivalent(self) -> str:
        return MASTER_SCALE[MASTER_SCALE['grade'] == self.final_grade]['sp_equiv'].iloc[0]

    @property
    def description(self) -> str:
        return MASTER_SCALE[MASTER_SCALE['grade'] == self.final_grade]['description'].iloc[0]

    def print_rating_sheet(self):
        print("=" * 60)
        print(f"INTERNAL RISK RATING — {self.borrower_name}")
        print("=" * 60)
        print(f"Financial Risk Score:    {self.financial_risk_score:.2f} / 5.00")
        print(f"Business Risk Score:     {self.business_risk_score:.2f} / 5.00")
        print(f"Composite Score:         {self.composite_score:.2f} / 5.00")
        print(f"Model-Implied Grade:     {self.model_grade}")
        if self.override_applied:
            print(f"Override Applied:        YES — {self.override_direction} "
                  f"{self.override_notches} notch(es)")
            print(f"Override Rationale:      {self.override_rationale}")
        print(f"FINAL RATING GRADE:      {self.final_grade} — {self.description}")
        print(f"PD (midpoint):           {self.pd_bps:.0f} bps ({self.pd_pct*100:.3f}%)")
        print(f"S&P Equivalent:          {self.sp_equivalent}")


class RatingEngine:

    def __init__(self, financial_weight: float = 0.50, business_weight: float = 0.50):
        self.fw = financial_weight
        self.bw = business_weight

    def financial_score(self, inputs: FinancialInputs) -> float:
        total_score = 0.0
        for metric, weight, bands in FINANCIAL_SCORECARD:
            value = getattr(inputs, metric)
            score = score_metric(value, bands)
            total_score += score * weight
        return total_score

    def business_score(self, inputs: BusinessInputs) -> float:
        total = 0.0
        for factor, weight in BUSINESS_WEIGHTS.items():
            value = getattr(inputs, factor)
            total += value * weight
        return total

    def composite_score_to_grade(self, composite: float) -> int:
        """Map composite score (0-5) to a rating grade (1-10)."""
        thresholds = [(4.5, 1), (4.0, 2), (3.5, 3), (3.0, 4), (2.5, 5),
                      (2.0, 6), (1.5, 7), (1.0, 8), (0.5, 9)]
        for threshold, grade in thresholds:
            if composite >= threshold:
                return grade
        return 10

    def rate(self, borrower_name: str,
             financial: FinancialInputs,
             business: BusinessInputs,
             override_direction: Optional[str] = None,
             override_notches: int = 0,
             override_rationale: str = "") -> RatingOutput:

        fs = self.financial_score(financial)
        bs = self.business_score(business)
        composite = fs * self.fw + bs * self.bw
        model_grade = self.composite_score_to_grade(composite)

        return RatingOutput(
            borrower_name=borrower_name,
            financial_risk_score=round(fs, 3),
            business_risk_score=round(bs, 3),
            composite_score=round(composite, 3),
            model_grade=model_grade,
            override_applied=override_direction is not None,
            override_direction=override_direction,
            override_notches=override_notches,
            override_rationale=override_rationale,
            financial_weight=self.fw,
            business_weight=self.bw,
        )


# ─────────────────────────────────────────────────────────────
# MODEL VALIDATION
# ─────────────────────────────────────────────────────────────

def calculate_gini(actual_defaults: np.ndarray, predicted_pds: np.ndarray) -> float:
    """Calculate Gini coefficient for IRR model discriminatory power."""
    auroc = roc_auc_score(actual_defaults, predicted_pds)
    return 2 * auroc - 1


def plot_roc_curve(actual_defaults: np.ndarray, predicted_pds: np.ndarray,
                   model_name: str = "IRR Model", save_path: str = None):
    fpr, tpr, _ = roc_curve(actual_defaults, predicted_pds)
    auroc = roc_auc_score(actual_defaults, predicted_pds)
    gini = 2 * auroc - 1

    fig, ax = plt.subplots(figsize=(8, 7))
    ax.plot(fpr, tpr, 'b-', linewidth=2,
            label=f'{model_name} (AUROC={auroc:.3f}, Gini={gini:.3f})')
    ax.plot([0, 1], [0, 1], 'r--', linewidth=1, label='Random (AUROC=0.5)')
    ax.fill_between(fpr, tpr, alpha=0.1)
    ax.set_xlabel('False Positive Rate (1 - Specificity)')
    ax.set_ylabel('True Positive Rate (Sensitivity)')
    ax.set_title('ROC Curve — Internal Risk Rating Model Validation')
    ax.legend(loc='lower right')
    ax.grid(alpha=0.3)
    if save_path:
        plt.savefig(save_path, dpi=150)
    return fig


# ─────────────────────────────────────────────────────────────
# IFRS 9 STAGING HELPER
# ─────────────────────────────────────────────────────────────

def determine_ifrs9_stage(current_grade: int, origination_grade: int,
                           days_past_due: int, watchlist: bool,
                           pd_multiple_since_orig: float) -> dict:
    """Determine IFRS 9 stage based on rating and performance indicators."""
    stage3_triggers = [
        current_grade >= 10,
        days_past_due > 90,
        watchlist and current_grade >= 9,
    ]
    stage2_triggers = [
        current_grade - origination_grade >= 3,
        pd_multiple_since_orig >= 3.0,
        current_grade >= 8,
        days_past_due >= 30,
        watchlist,
    ]
    if any(stage3_triggers):
        stage = 3
        ecl_basis = 'LIFETIME_ECL'
        trigger = next(t for t, c in zip(
            ['Grade 10+', 'DPD > 90', 'Watchlist + Grade 9+'], stage3_triggers) if c)
    elif any(stage2_triggers):
        stage = 2
        ecl_basis = 'LIFETIME_ECL'
        trigger = next(t for t, c in zip([
            'Grade deterioration >= 3', 'PD multiplied >= 3x',
            'Grade 8+', 'DPD >= 30', 'Watchlist'], stage2_triggers) if c)
    else:
        stage = 1
        ecl_basis = '12_MONTH_ECL'
        trigger = None

    return {'stage': stage, 'ecl_basis': ecl_basis, 'trigger': trigger}


# ─────────────────────────────────────────────────────────────
# EXAMPLE USAGE
# ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    engine = RatingEngine(financial_weight=0.50, business_weight=0.50)

    financial = FinancialInputs(
        net_leverage=2.8, interest_cover=4.3, dscr=1.35,
        current_ratio=1.4, ebitda_margin=0.163, revenue_m=98,
    )
    business = BusinessInputs(
        industry_risk=4, competitive_position=3, management_quality=4,
        ownership_governance=3, customer_concentration=3,
        country_risk=5, esg_risk=3,
    )

    rating = engine.rate(
        borrower_name='Acme Manufacturing Ltd',
        financial=financial,
        business=business,
        override_direction=None,
    )
    rating.print_rating_sheet()

    print("\nIFRS 9 STAGING:")
    stage_result = determine_ifrs9_stage(
        current_grade=rating.final_grade,
        origination_grade=4,
        days_past_due=0,
        watchlist=False,
        pd_multiple_since_orig=1.5,
    )
    for k, v in stage_result.items():
        print(f"  {k}: {v}")
```

---

## 11. Interview Questions

**Q1: Explain the difference between a point-in-time (PIT) and through-the-cycle (TTC) rating. When would you use each?**

*Expected:* PIT rating reflects current economic conditions — it will be high (good grade) in a boom and low (bad grade) in a recession, even for the same borrower. TTC rating attempts to average across the cycle and is more stable. PIT is better for current provisioning (IFRS 9) because it reflects current conditions. TTC is better for pricing and capital planning because it prevents procyclical swings in margin requirements.

**Q2: A borrower's financial risk score implies a Grade 5 (BBB equivalent), but the management team is weak and the company is in a structurally declining sector. How do you handle this?**

*Expected:* Apply a downward override (i.e., worsen the grade). Document the override with specific evidence: "Management Risk — CFO appointed 6 months ago with no relevant sector experience; two prior CFOs departed in 3 years. Industry Risk — sector revenues have declined 4% p.a. for 5 years; no evidence of structural reversal." Override is limited to ±2 notches typically. Final grade might be Grade 7 rather than Grade 5.

**Q3: What is a Gini coefficient in the context of credit rating models and what is an acceptable level?**

*Expected:* The Gini coefficient measures the model's ability to distinguish future defaulters from non-defaulters. It ranges from 0 (no ability) to 1 (perfect discrimination). It is derived from the AUROC: Gini = 2×AUROC - 1. For a corporate rating model, Gini > 0.60 is generally considered acceptable; > 0.70 is good; > 0.80 is excellent. A model with Gini < 0.40 has poor discriminatory power and should be redeveloped.

**Q4: How does a rating downgrade of 3 notches affect IFRS 9 provisioning?**

*Expected:* A 3-notch downgrade (e.g., Grade 4 → Grade 7) typically constitutes a Significant Increase in Credit Risk (SICR) under IFRS 9. The facility moves from Stage 1 to Stage 2, which means the provision basis changes from 12-month ECL to lifetime ECL. This can represent a very significant increase in provision — a 5-year term loan with lifetime ECL might have a provision 4–6× higher than the same loan with 12-month ECL.

**Q5: What is model calibration and why does it matter?**

*Expected:* Calibration is the process of ensuring the model's predicted PDs match observed default rates. If Grade 7 is supposed to have PD of 150 bps but actual default experience for Grade 7 borrowers is 300 bps, the model is under-predicting risk. This would mean the bank is under-provisioning, underpricing loans, and under-capitalising. Calibration is assessed annually by the Model Validation team, which must be independent of model development (Chinese wall).

---

## 12. Common Mistakes

**Mistake 1: Rating the facility, not the borrower**
The IRR grades the borrower — the entity's probability of default. A highly secured facility should not receive a better rating grade than an unsecured facility to the same borrower. Security affects LGD; the borrower's rating (PD) is determined by their creditworthiness, not their collateral.

**Mistake 2: Ignoring the qualitative factors**
Junior analysts sometimes complete the financial scorecard rigorously but then give all business risk factors a "medium" score of 3 to avoid controversy. This defeats the purpose of the qualitative assessment. If management is genuinely weak or the industry is structurally declining, those factors must be reflected.

**Mistake 3: Not reviewing ratings on schedule**
Basel requires at least annual review. Some banks have internal policies requiring earlier review on material events (covenant breach, profit warning, senior management departure). Stale ratings are a regulatory red flag and a credit management failure.

**Mistake 4: Overriding in the wrong direction to win business**
Pressure from Relationship Managers to upgrade ratings (to make loans cheaper for clients) is a real phenomenon. The IRR must reflect the analyst's genuine assessment. Override statistics are monitored by independent validation — a pattern of systematic upgrades will be flagged.

**Mistake 5: Not adjusting for IFRS 16 in financial ratios**
Post-2019, EBITDA and Net Debt are both affected by IFRS 16. Ratios used in the scorecard must be calculated consistently — the bank must decide whether its scorecard uses pre- or post-IFRS 16 financial data and apply that consistently across all borrowers.

**Mistake 6: Anchoring to the existing grade**
When reviewing a rating, analysts sometimes anchor to the prior grade and look for reasons to confirm it rather than reassessing objectively. Each rating review should start from first principles.

---

## 13. Case Studies

**Case Study A: The Systematic Override Pattern**

*Situation:* During an annual model validation review, the validation team identified that one senior analyst had applied upward overrides (upgrades from the model) on 78% of the 42 credits they had rated over the preceding 12 months. The average upgrade was 1.4 notches. These overrides had been approved by a credit manager who was the analyst's direct manager.

*Investigation:* Most overrides lacked adequate documentation. The stated rationale was often "strong relationship history" — not a legitimate credit reason for upgrading a quantitative model output. When the validation team independently re-rated a sample of 15 credits, 11 of them should have stayed at the model grade.

*Outcome:* The 42 ratings were re-reviewed by an independent credit officer. Provisions under IFRS 9 increased by £3.2m when the correct grades were applied. The credit manager received formal censure.

*Lesson:* Override monitoring is a critical model governance control. High override rates — in either direction — must trigger independent review.

---

**Case Study B: The Cyclical Peak That Looked Like Permanent Improvement**

*Situation:* A specialist chemicals company had Net Leverage of 1.2x and Interest Cover of 9.5x in Year 3 of their review, producing a model grade of 3 (A equivalent) and a final rating of Grade 3. The analyst did not apply a cyclicality adjustment.

*What happened:* The chemicals sector had been at a pricing peak driven by post-pandemic supply shortages. By the following year, chemical prices had normalised and EBITDA had fallen 40%. Leverage moved to 2.0x and ICR to 5.6x — still fine, but the trajectory was alarming.

*If the analyst had applied a through-the-cycle view:* Using a normalised EBITDA reflecting mid-cycle margins (rather than peak margins), the model would have produced a Grade 5 rating — still investment grade, but appropriately more conservative.

*Lesson:* For cyclical industries, the analyst must estimate through-the-cycle or normalised EBITDA, not rely on peak-cycle financials. The rating rationale should explicitly address cyclicality and explain what assumptions are embedded in the grade.

---

## 14. Iterative Reinforcement

**Week 1:** Take any borrower in your portfolio and rebuild their rating from scratch using the financial scorecard approach. Calculate each ratio, apply the scoring bands, and derive the Financial Risk Score. Compare to the current system grade.

**Week 2:** Write a one-page Business Risk Assessment for the same borrower covering all six qualitative factors. Derive a Business Risk Score. What does the composite grade look like?

**Week 3:** Locate the migration matrix in your bank's most recent credit risk report. Calculate the 1-year probability of downgrade from Grade 5. What fraction of Grade 5 borrowers became Grade 7 or worse within 12 months?

**Week 4:** For a borrower you know well, apply the IFRS 9 staging logic. What is their current stage? What change in grade or behaviour would trigger a stage migration?

**Spaced repetition prompts:**
- What is the difference between PIT and TTC PD, and which does IFRS 9 prefer?
- Explain what Gini coefficient measures in a rating model. What is a good Gini for a corporate model?
- What triggers a Stage 1 → Stage 2 migration under IFRS 9, and what is the practical impact on provisions?
- Why should the same borrower receive the same rating grade regardless of whether their loan is secured or unsecured?

---

## 15. Source Material

**Regulatory:**
- Basel Committee on Banking Supervision: "International Convergence of Capital Measurement and Capital Standards" (Basel II, 2006) — Part 2, Section III (IRB Approach) — foundational document for IRB methodology
- CRR (EU) 575/2013, Part Three, Title II, Chapter 3: Internal Ratings-Based Approach — Articles 169–191
- EBA/GL/2017/03: Guidelines on PD estimation, LGD estimation and treatment of defaulted exposures — the definitive technical standard
- PRA SS11/13: Internal Ratings Based Approaches — UK supervisory expectations
- IFRS 9: Financial Instruments — Classification and Measurement / Impairment

**Validation and methodology:**
- Basel Committee: "Validation of low-default portfolios in the Basel II Framework" (Newsletter No. 6, 2005)
- Basel Committee: "Working Paper No. 14: Studies on the Validation of Internal Rating Systems" (2005)
- EBA: "Report on the benchmarking of internal models" (published annually) — comparative data on IRB models across European banks

**Academic:**
- Altman, E.I.: "Financial Ratios, Discriminant Analysis and the Prediction of Corporate Bankruptcy" (Journal of Finance, 1968) — foundational paper for quantitative credit scoring
- Altman, E.I. and Rijken, H.: "How Rating Agencies Achieve Rating Stability" (Journal of Banking & Finance, 2004) — PIT vs TTC analysis
- Engelmann, B. and Rauhmeier, R. (eds.): *The Basel II Risk Parameters* (Springer, 2nd ed., 2011) — technical reference for PD, LGD, EAD estimation and validation

**Practitioner:**
- Standard & Poor's: "Corporate Ratings Criteria" (annual) — S&P's methodology; a valuable benchmark for calibrating internal scales
- Moody's: "Rating Symbols and Definitions" — essential reference for understanding the external scale equivalences
- Risk Management Association (RMA): "Commercial Lending — A Practitioner's Guide" — US-oriented but widely applicable
- Ong, M.K.: *Internal Credit Risk Models: Capital Allocation and Performance Measurement* (Risk Books, 1999) — practical technical reference for IRB systems
