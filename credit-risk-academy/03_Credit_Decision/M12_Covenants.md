# M12 — Covenants

> **Academy Track:** Commercial & Corporate Credit Risk | Module 12 of 20
> **Prerequisite Modules:** M09–M11 (Credit Memo, Facility Structuring, Security)
> **Estimated Study Time:** 8–10 hours

---

## 1. Business Purpose

Covenants are contractual obligations embedded in the facility agreement that govern the borrower's behaviour during the life of the loan. They serve as the bank's ongoing monitoring mechanism — a set of tripwires that alert the bank when the borrower's credit quality is deteriorating, ideally before it deteriorates to the point of default.

**The fundamental purpose of covenants:**

1. **Early warning:** Covenants are designed to trigger before the borrower actually cannot pay. A leverage covenant breach at 4.2x does not mean the borrower has defaulted — it means something has changed materially, and the bank now has the right to engage.

2. **Negotiating lever:** When a covenant is breached, the borrower must either remedy the breach or obtain a waiver from the bank. This gives the bank significant leverage to renegotiate terms, demand additional security, accelerate repayment, or require management changes.

3. **Behavioural constraint:** The knowledge that certain actions will trigger a covenant breach constrains management behaviour. A leverage covenant prevents the company from borrowing excessively. An asset disposal restriction prevents stripping of assets.

4. **Information flow:** Information covenants ensure the bank receives regular, reliable financial data throughout the life of the facility. Without them, the bank would only learn of deterioration when the borrower missed a payment — far too late.

**What covenants cannot do:**

Covenants cannot prevent a borrower from defaulting. A borrower that is determined to deceive its lenders can do so — a financial covenant can be manipulated through EBITDA adjustments, non-recurring items, or timing of transactions. Covenants are most effective as part of a broader monitoring regime (regular management meetings, site visits, sector monitoring).

**The covenant package — four types:**

| Covenant Type | Purpose | Example |
|--------------|---------|---------|
| Financial | Quantitative thresholds tied to financial ratios | Interest cover ≥ 3.0x |
| Information | Require borrower to deliver financial data | Audited accounts within 120 days of year end |
| Positive (Affirmative) | Require borrower to do something | Maintain adequate insurance |
| Negative (Restrictive) | Prohibit borrower from doing something | No additional financial indebtedness without consent |

---

## 2. Accounting Concepts

**Covenant definitions are drafted against accounting standards — and the accounting standard matters:**

**The EBITDA definition problem:**

EBITDA is not a defined accounting term under IFRS or US GAAP. Every facility agreement must define EBITDA precisely. A typical definition:

```
"EBITDA" means, for any Relevant Period, the consolidated profit of the Group 
before taking into account:
(a) Finance Charges;
(b) Tax;
(c) Depreciation;
(d) Amortisation;
adjusted to:
(i) exclude any non-recurring items;
(ii) exclude any non-cash items;
(iii) include the EBITDA contribution of any acquired business for the full period 
     (on an annualised basis);
(iv) exclude IFRS 16 lease depreciation charges.
```

Each of these adjustments is a potential battleground during a covenant breach. What constitutes a "non-recurring item"? Can the borrower classify a restructuring charge as non-recurring to avoid a breach? The analyst must understand these definitions and challenge management's interpretation when necessary.

**IFRS 16 and covenant calculation:**

IFRS 16 (effective 2019) moved operating leases onto the balance sheet. This creates issues for covenants:
- Pre-IFRS 16: Rent expense reduces EBITDA (because EBITDA is pre-interest, pre-tax, pre-D&A, but after operating lease charges)
- Post-IFRS 16: Operating lease charge disappears; instead, depreciation on right-of-use asset and interest on lease liability appear. EBITDA increases (the operating lease charge is replaced by D&A below EBITDA line), but Net Debt also increases (by the lease liability).

Most credit agreements now include an "IFRS 16 carve-out" specifying which basis to use for covenant calculations. Failure to include this caused many technical covenant debates post-2019.

**Accounting policy changes:**

If the borrower changes accounting policies (e.g., changes depreciation assumptions, changes revenue recognition, adopts a new accounting standard), the covenant calculations may shift. Well-drafted covenants include a "frozen GAAP" or "agreed accounting principles" provision specifying that covenants are calculated consistently with the accounting policies in place at the date of signing.

---

## 3. Financial Concepts

**The four key financial covenants:**

**1. Leverage (Net Debt / EBITDA)**

```
Covenant: Net Leverage shall not exceed X.Xx at each Test Date

Typical ranges by credit quality:
- Investment grade (BBB): ≤ 2.5x–3.0x
- Sub-investment grade (BB): ≤ 3.5x–4.5x
- Leveraged buyout (B): ≤ 5.0x–6.5x

Calculation:
Net Leverage = (Total Financial Indebtedness - Unrestricted Cash) 
               / LTM Adjusted EBITDA

"Financial Indebtedness" typically includes:
- Bank loans and overdrafts
- Bonds
- Finance leases (and sometimes IFRS 16 lease liabilities)
- Deferred consideration on acquisitions
- Certain inter-company loans

"Unrestricted Cash" is cash available to the group — not trapped in subsidiaries 
subject to restricted transfer agreements
```

**2. Interest Cover (EBITDA / Net Finance Charges)**

```
Covenant: Interest Cover shall not be less than X.Xx at each Test Date

Typical ranges:
- Investment grade: ≥ 4.0x–6.0x
- Sub-investment grade: ≥ 2.5x–3.5x
- Highly leveraged: ≥ 1.5x–2.0x

Calculation:
Interest Cover = LTM Adjusted EBITDA / LTM Net Finance Charges

"Net Finance Charges" typically includes:
- Interest on drawn facilities
- Less: interest income on deposits
- Commitment fees on undrawn facilities
- Amortisation of arrangement fees (sometimes)
- IFRS 16 lease interest (sometimes excluded)
```

**3. Cash Cover / Cash Flow Cover**

```
Covenant: Cash Flow Cover shall not be less than X.Xx

Calculation:
Cash Flow Cover = (EBITDA - Tax - Capex - Change in Working Capital) 
                  / Debt Service

This is a tighter measure than interest cover because it includes:
- Cash tax (not deferred/accounting tax)
- Maintenance capex
- Working capital movements
A company with strong EBITDA but heavy capex requirements may fail this test
even while passing the interest cover test
```

**4. Minimum EBITDA / Revenue (Absolute floor)**

```
Covenant: Consolidated EBITDA shall not be less than £Xm

Useful when leverage and coverage ratios might be distorted (e.g., 
a start-up or a business with unusual capital structure). Provides an 
absolute floor on financial performance.
```

**Covenant headroom analysis:**

```
Headroom = Actual Ratio - Covenant Threshold (for coverage ratios)
Headroom = Covenant Threshold - Actual Ratio (for leverage ratios)
Headroom % = Headroom / Covenant Threshold

Example:
Actual Interest Cover: 4.2x
Covenant: ≥ 3.0x
Headroom: 1.2x
Headroom %: 40%

EBITDA Sensitivity (at what EBITDA would the covenant be breached?):
Breach EBITDA = 3.0 × Net Finance Charges
If Net Finance Charges = £3m: Breach EBITDA = £9m
Current EBITDA: £12.6m
EBITDA can decline £3.6m (29%) before breach
```

---

## 4. Statistical Concepts

**Covenant as an early warning indicator:**

The value of a covenant depends on how much "distance to default" it provides. If the covenant threshold is set too close to current performance, it will trigger frequently on minor volatility. If set too far from current performance, it provides no early warning — the borrower can deteriorate significantly before triggering.

**Optimal covenant tightness:**

Research by Demiroglu and James (2010) shows that covenant tightness is negatively correlated with borrower credit quality — riskier borrowers get tighter covenants. This makes sense: tighter covenants on a riskier borrower provide the bank with more early warning leverage when it needs it most.

**Covenant headroom distribution:**

For a portfolio of loans, the distribution of headroom provides a view of credit quality:
- Narrowly distributed around high headroom: healthy portfolio
- Long tail of low headroom: concentrated risk of covenant breaches in stress
- Covenant headroom should be stress-tested as part of the ICAAP (Internal Capital Adequacy Assessment Process)

**Covenant breach and default correlation:**

A covenant breach does not equal a default (it is a separate contractual event — a "technical default" or "event of default" depending on how it is drafted). Studies show that a proportion of covenant breaches are cured through:
- Waiver (bank agrees to waive the breach without changing terms)
- Amendment (terms are renegotiated — "amend and extend")
- Partial repayment (borrower reduces debt to cure leverage breach)
- Equity injection (sponsor puts in more equity in a leveraged deal)

Approximately 30–40% of covenant breaches in the European leveraged loan market are cured without loss to the bank. The covenant is valuable not because it always leads to recovery, but because it triggers engagement before total loss is certain.

---

## 5. Regulatory Framework

**EBA Guidelines on Loan Origination and Monitoring (EBA/GL/2020/06):**

Section 7 (Monitoring) explicitly requires banks to:
- Monitor adherence to covenants throughout the life of facilities
- Establish systems to detect covenant breaches promptly
- Escalate covenant breaches through appropriate governance channels
- Document covenant waivers and amendments, with credit authority approval

**PRA/FCA — COBS and MCOB:**

For lending to smaller businesses that may have characteristics of consumers, certain FCA conduct requirements may apply to how covenant breaches are handled — the bank must not enforce in an unreasonable or disproportionate manner.

**IFRS 9 — Covenant breach and staging:**

A covenant breach may constitute a "significant increase in credit risk" (SICR) under IFRS 9, triggering a Stage 1 to Stage 2 migration (from 12-month ECL to lifetime ECL). Banks must have clear policies on when a covenant breach triggers SICR assessment. In practice:
- A waived breach without material credit concern: may not trigger SICR
- A repeated breach: likely triggers SICR
- A breach combined with deteriorating financial performance: triggers SICR
- A breach on a facility already showing other warning signs: likely triggers Stage 3 assessment

**Basel III — Forbearance:**

The EBA's definition of forbearance (Implementing Technical Standard on Supervisory Reporting) may apply when a bank modifies terms (including covenant waivers) in response to financial difficulty. A forborne facility attracts specific disclosure requirements and may require additional provisioning.

---

## 6. Data Required

**Covenant monitoring data pipeline:**

| Data Point | Source | Frequency | Used For |
|-----------|--------|-----------|---------|
| Audited financial statements | Borrower → RM → Credit | Annual | Annual financial covenant test; year-end ratios |
| Management accounts | Borrower → RM → Credit | Monthly or quarterly | Intra-year covenant estimation; early warning |
| Compliance certificate | Borrower's CFO | Each test date | Formal assertion by borrower that covenants are met |
| Auditor's covenant calculation | External auditor | Annual (for audited test) | Independent verification |
| Bank's own covenant calculation | Credit analyst | Each test date | Reconciliation vs borrower's certificate |
| Prior waiver documentation | Credit file | On breach | Context for current breach assessment |
| Sector data | External (Bloomberg, sector databases) | Quarterly | Benchmark headroom vs peers |

**Covenant calculation workbook inputs:**

The analyst maintains a covenant calculation workbook for each borrower that requires:
- Exact definitions as per the facility agreement
- Historical financial data for trailing 12-month (LTM) calculations
- Permitted adjustments (non-recurring items, acquisition EBITDA add-backs)
- Documentation of each adjustment with rationale (for audit trail)

---

## 7. How Analysts Actually Work

**The covenant testing cycle:**

**Step 1 — Receive compliance certificate and management accounts**
The borrower's CFO delivers a compliance certificate at each test date (typically quarterly or semi-annually for financial covenants). This certificate states: "We confirm that, as at [test date], the following financial covenants are [met / not met]:" with the supporting calculation.

**Step 2 — Independent verification**
The analyst never relies solely on the borrower's certificate. They independently recalculate each ratio from the management accounts, using the definitions in the facility agreement. Any discrepancy must be investigated.

**Step 3 — Compare with headroom model**
The analyst's covenant model (built at time of credit approval) should have forecast the covenant ratio for this test date. Does the actual ratio match the forecast? If there is a significant divergence, why? This is often the first signal of unexpected deterioration.

**Step 4 — Update the forward-looking headroom analysis**
Project the ratios forward based on current trading. Is the borrower on track to meet next test date's covenant? What is the risk of a future breach?

**Step 5 — Escalate if concerned**
If headroom is narrowing materially, the analyst should flag this as a "watchlist" case, even before a technical breach occurs. This pre-breach engagement is far more valuable than waiting for the breach to happen.

**What happens when a covenant is breached:**

1. **Breach identified** — by analyst's independent calculation, not relying on borrower disclosure
2. **Borrower notified** — formal written notification that an Event of Default (or Potential Event of Default) has occurred
3. **Standstill period** — the facility agreement may provide a cure period (typically 10–20 business days) during which the borrower can remedy
4. **Waiver application** — if the borrower cannot cure, they apply for a waiver; this goes to Credit Committee with a full credit review
5. **Waiver terms** — if approved, the waiver sets out: the period of waiver, any conditions (e.g., borrower must provide an action plan, must hire a financial adviser, must not pay dividends during the waiver period), and any fee charged by the bank
6. **Ongoing monitoring** — increased monitoring during the waiver period; often monthly management accounts required instead of quarterly

**Negotiating covenant sets — the analyst's role:**

When a new facility is being structured, the analyst recommends the covenant package. Key decisions:
- **Which covenants?** — Leverage + interest cover is standard for most corporate loans; cash cover for asset-heavy businesses; LTV for property; minimum revenue for pre-profitability businesses
- **What thresholds?** — Set to provide meaningful headroom over current/projected performance (typically 20–30% headroom at origination) while being tight enough to provide early warning
- **What test frequency?** — Quarterly for leveraged/higher-risk; semi-annual for investment grade; annual for very low-risk or well-secured
- **What cure mechanisms?** — Equity cure (sponsor/shareholder can inject equity to cure a breach) is standard in leveraged transactions; less common in investment grade

---

## 8. Excel Implementation

```excel
==============================================================
SHEET: Covenant_Definitions
==============================================================
-- Store the exact covenant definitions from the facility agreement
-- This is the reference document for all calculations

Column A: Covenant_Name          (e.g., "Net Leverage")
Column B: Metric_Numerator       (e.g., "Net Financial Indebtedness")
Column C: Metric_Denominator     (e.g., "Adjusted EBITDA LTM")
Column D: Threshold_Type         (MAX or MIN)
Column E: Threshold_Value        (e.g., 3.5)
Column F: Test_Frequency         (QUARTERLY, SEMI-ANNUAL, ANNUAL)
Column G: Test_Date_1            (first test date)
Column H: EBITDA_Adjustments     (list of permitted adjustments)
Column I: Debt_Definition        (specific items included/excluded)
Column J: Cure_Mechanism         (EQUITY_CURE, NONE)
Column K: Cure_Period_Days       (e.g., 20)


==============================================================
SHEET: LTM_Calculator
==============================================================
-- Trailing 12-month calculation using rolling 4-quarter data

-- Input: quarterly P&L and balance sheet data
-- Row structure (columns = Q1 to Q8 historical, then projections)

-- LTM EBITDA = Sum of last 4 quarters' EBITDA
LTM_EBITDA = SUM(E_Q1_EBITDA : E_Q4_EBITDA)

-- For mid-year test using annual accounts + management accounts:
-- If annual accounts cover 12 months ending Dec, and test date is June:
LTM_EBITDA = Annual_EBITDA - H1_Prior_EBITDA + H1_Current_EBITDA

-- Adjustment tracking (one row per permitted adjustment):
Row 40: Non_Recurring_Charge_1   Description | Amount | Supporting_Evidence
Row 41: Non_Recurring_Charge_2   ...
Row 50: Total_Adjustments        = SUM(Row40:Row49)
Row 51: Adjusted_EBITDA          = LTM_EBITDA + Total_Adjustments

-- Financial indebtedness build:
Row 60: Bank_Loans               = [from balance sheet]
Row 61: Bond_Debt                = [from balance sheet]
Row 62: Finance_Lease_Liabilities = [from balance sheet]
Row 63: IFRS16_Lease_Liabilities = [from balance sheet; include or exclude per definition]
Row 64: Deferred_Consideration   = [from balance sheet notes]
Row 65: Intercompany_Debt        = [from group structure notes]
Row 66: Total_Gross_Debt         = SUM(Row60:Row65)
Row 67: Unrestricted_Cash        = [from balance sheet; exclude restricted cash]
Row 68: Net_Financial_Indebtedness = Row66 - Row67


==============================================================
SHEET: Covenant_Dashboard
==============================================================
-- Live summary of covenant status across all test dates

-- Net Leverage test:
B5:  Net_Leverage_Actual         = LTM_Calculator!Row68 / LTM_Calculator!Row51
B6:  Net_Leverage_Covenant       = Covenant_Definitions!E[row for leverage]
B7:  Net_Leverage_Headroom       = B6 - B5
B8:  Headroom_Pct                = B7 / B6
B9:  PASS_FAIL                   = IF(B5 <= B6, "PASS", "BREACH")
B10: Traffic_Light               = IF(B8 > 0.20, "GREEN",
                                   IF(B8 > 0.10, "AMBER", "RED"))

-- Interest Cover test:
C5:  ICR_Actual                  = LTM_Calculator!Row51 / Interest_Charges
C6:  ICR_Covenant                = Covenant_Definitions!E[ICR row]
C7:  ICR_Headroom                = C5 - C6
C8:  Headroom_Pct                = C7 / C6
C9:  PASS_FAIL                   = IF(C5 >= C6, "PASS", "BREACH")
C10: Traffic_Light               = IF(C8 > 0.20, "GREEN", ...)

-- Conditional formatting on Traffic_Light cells:
-- GREEN = cell fill #92D050
-- AMBER = cell fill #FFFF00
-- RED   = cell fill #FF0000

-- Headroom Sensitivity Table:
-- Shows how much EBITDA can decline before each covenant is breached
Row 30: EBITDA_to_Breach_Leverage  = (Net_Debt / Cov_Leverage) [i.e., EBITDA implied by covenant at current debt]
Row 31: EBITDA_Decline_to_Breach   = (Actual_EBITDA - EBITDA_to_Breach_Leverage) / Actual_EBITDA


==============================================================
SHEET: Waiver_Log
==============================================================
-- Audit trail of all covenant breaches and waivers

Column A: Breach_Date
Column B: Covenant_Name
Column C: Covenant_Threshold
Column D: Actual_Value_at_Breach
Column E: Breach_Severity_Pct     (how far outside covenant)
Column F: Waiver_Date
Column G: Waiver_Expiry_Date
Column H: Waiver_Conditions
Column I: Credit_Authority_Approver
Column J: Fee_Charged
Column K: Breach_Resolved_Date
Column L: Resolution_Method       (CURE, WAIVER, AMENDMENT, REPAYMENT, ACCELERATED)
```

---

## 9. SQL Implementation

```sql
-- ============================================================
-- QUERY 1: Covenant compliance status — current test period
-- ============================================================
SELECT
    c.customer_name,
    f.facility_id,
    ct.test_date,
    ct.covenant_name,
    ct.covenant_type,
    ct.threshold_operator,           -- 'MIN' or 'MAX'
    ct.threshold_value,
    ct.actual_value,
    -- Headroom calculation (positive = comfortable)
    CASE ct.threshold_operator
        WHEN 'MIN' THEN ct.actual_value - ct.threshold_value
        WHEN 'MAX' THEN ct.threshold_value - ct.actual_value
    END AS headroom_absolute,
    CASE ct.threshold_operator
        WHEN 'MIN' THEN (ct.actual_value - ct.threshold_value) / ct.threshold_value * 100
        WHEN 'MAX' THEN (ct.threshold_value - ct.actual_value) / ct.threshold_value * 100
    END AS headroom_pct,
    ct.test_result,
    -- Traffic light status
    CASE
        WHEN ct.test_result = 'BREACH' THEN 'RED'
        WHEN ABS((CASE ct.threshold_operator
                    WHEN 'MIN' THEN (ct.actual_value - ct.threshold_value) / ct.threshold_value
                    WHEN 'MAX' THEN (ct.threshold_value - ct.actual_value) / ct.threshold_value
                 END)) < 0.10 THEN 'AMBER'
        ELSE 'GREEN'
    END AS traffic_light,
    ct.waiver_in_place,
    ct.waiver_expiry_date
FROM covenant_tests ct
JOIN facilities f ON ct.facility_id = f.facility_id
JOIN customers c ON f.customer_id = c.customer_id
WHERE ct.test_date = (
    SELECT MAX(ct2.test_date) 
    FROM covenant_tests ct2 
    WHERE ct2.facility_id = ct.facility_id
        AND ct2.covenant_name = ct.covenant_name
)
    AND f.facility_status = 'ACTIVE'
ORDER BY traffic_light DESC, headroom_pct ASC;


-- ============================================================
-- QUERY 2: Covenant headroom trend — deterioration detection
-- ============================================================
WITH headroom_trend AS (
    SELECT
        f.facility_id,
        c.customer_name,
        ct.covenant_name,
        ct.test_date,
        CASE ct.threshold_operator
            WHEN 'MIN' THEN (ct.actual_value - ct.threshold_value) / ct.threshold_value * 100
            WHEN 'MAX' THEN (ct.threshold_value - ct.actual_value) / ct.threshold_value * 100
        END AS headroom_pct,
        -- Quarter-on-quarter headroom change
        LAG(CASE ct.threshold_operator
            WHEN 'MIN' THEN (ct.actual_value - ct.threshold_value) / ct.threshold_value * 100
            WHEN 'MAX' THEN (ct.threshold_value - ct.actual_value) / ct.threshold_value * 100
        END) OVER (
            PARTITION BY f.facility_id, ct.covenant_name 
            ORDER BY ct.test_date
        ) AS prior_headroom_pct
    FROM covenant_tests ct
    JOIN facilities f ON ct.facility_id = f.facility_id
    JOIN customers c ON f.customer_id = c.customer_id
    WHERE ct.test_date >= DATEADD(YEAR, -2, GETDATE())
)
SELECT
    facility_id,
    customer_name,
    covenant_name,
    test_date,
    ROUND(headroom_pct, 1)                  AS headroom_pct,
    ROUND(headroom_pct - prior_headroom_pct, 1) AS qoq_change_pct,
    -- Flag sustained deterioration
    CASE 
        WHEN headroom_pct < prior_headroom_pct
             AND headroom_pct < 15
        THEN 'DETERIORATING - LOW HEADROOM - WATCHLIST CANDIDATE'
        WHEN headroom_pct < prior_headroom_pct
        THEN 'DETERIORATING'
        WHEN headroom_pct > prior_headroom_pct + 10
        THEN 'IMPROVING'
        ELSE 'STABLE'
    END AS trend_flag
FROM headroom_trend
WHERE prior_headroom_pct IS NOT NULL
ORDER BY headroom_pct ASC, test_date DESC;


-- ============================================================
-- QUERY 3: Waiver history and repeat breach analysis
-- ============================================================
SELECT
    c.customer_name,
    f.facility_id,
    w.covenant_name,
    COUNT(*)                            AS total_waivers,
    MIN(w.breach_date)                  AS first_breach_date,
    MAX(w.breach_date)                  AS most_recent_breach,
    AVG(w.breach_severity_pct)          AS avg_breach_severity_pct,
    MAX(w.breach_severity_pct)          AS max_breach_severity_pct,
    SUM(w.waiver_fee_charged)           AS total_waiver_fees,
    -- Flag serial breachers
    CASE 
        WHEN COUNT(*) >= 3 THEN 'SERIAL BREACHER - STRUCTURAL ISSUE'
        WHEN COUNT(*) = 2 THEN 'REPEAT BREACH - ELEVATED CONCERN'
        ELSE 'FIRST BREACH'
    END AS breach_pattern
FROM waivers w
JOIN facilities f ON w.facility_id = f.facility_id
JOIN customers c ON f.customer_id = c.customer_id
WHERE w.breach_date >= DATEADD(YEAR, -3, GETDATE())
GROUP BY c.customer_name, f.facility_id, w.covenant_name
ORDER BY total_waivers DESC, most_recent_breach DESC;


-- ============================================================
-- QUERY 4: Portfolio-level covenant headroom distribution
-- (for stress testing and ICAAP reporting)
-- ============================================================
WITH latest_leverage AS (
    SELECT
        f.facility_id,
        c.customer_id,
        c.customer_name,
        f.committed_limit,
        ct.actual_value     AS current_leverage,
        ct.threshold_value  AS leverage_covenant,
        ct.threshold_value - ct.actual_value AS leverage_headroom
    FROM covenant_tests ct
    JOIN facilities f ON ct.facility_id = f.facility_id
    JOIN customers c ON f.customer_id = c.customer_id
    WHERE ct.covenant_name = 'NET_LEVERAGE'
        AND ct.test_date = (
            SELECT MAX(ct2.test_date) FROM covenant_tests ct2 
            WHERE ct2.facility_id = ct.facility_id 
            AND ct2.covenant_name = 'NET_LEVERAGE'
        )
        AND f.facility_status = 'ACTIVE'
)
SELECT
    -- Bucket by headroom band
    CASE 
        WHEN leverage_headroom < 0            THEN '1. IN BREACH'
        WHEN leverage_headroom < 0.25         THEN '2. < 0.25x headroom (HIGH RISK)'
        WHEN leverage_headroom < 0.50         THEN '3. 0.25x–0.50x headroom (AMBER)'
        WHEN leverage_headroom < 1.00         THEN '4. 0.50x–1.00x headroom (COMFORTABLE)'
        ELSE                                       '5. > 1.00x headroom (LOW RISK)'
    END AS headroom_band,
    COUNT(*)                                AS facility_count,
    SUM(committed_limit) / 1e6             AS total_committed_gbpm,
    AVG(current_leverage)                   AS avg_current_leverage,
    AVG(leverage_covenant)                  AS avg_covenant_threshold
FROM latest_leverage
GROUP BY
    CASE 
        WHEN leverage_headroom < 0            THEN '1. IN BREACH'
        WHEN leverage_headroom < 0.25         THEN '2. < 0.25x headroom (HIGH RISK)'
        WHEN leverage_headroom < 0.50         THEN '3. 0.25x–0.50x headroom (AMBER)'
        WHEN leverage_headroom < 1.00         THEN '4. 0.50x–1.00x headroom (COMFORTABLE)'
        ELSE                                       '5. > 1.00x headroom (LOW RISK)'
    END
ORDER BY headroom_band;


-- ============================================================
-- QUERY 5: Information covenant compliance tracking
-- ============================================================
SELECT
    c.customer_name,
    f.facility_id,
    ic.covenant_name,                   -- 'ANNUAL_ACCOUNTS', 'MGMT_ACCOUNTS', etc.
    ic.required_delivery_date,
    ic.actual_delivery_date,
    DATEDIFF(DAY, ic.required_delivery_date, ic.actual_delivery_date) 
        AS days_late,
    ic.delivery_status,                 -- 'ON_TIME', 'LATE', 'NOT_RECEIVED'
    -- Flag outstanding items
    CASE
        WHEN ic.actual_delivery_date IS NULL 
             AND ic.required_delivery_date < GETDATE() 
        THEN 'OVERDUE - CHASE IMMEDIATELY'
        WHEN ic.actual_delivery_date IS NULL 
        THEN 'PENDING - DUE SOON'
        WHEN DATEDIFF(DAY, ic.required_delivery_date, ic.actual_delivery_date) > 30
        THEN 'DELIVERED LATE (> 30 DAYS)'
        ELSE 'OK'
    END AS info_covenant_flag
FROM information_covenant_tracker ic
JOIN facilities f ON ic.facility_id = f.facility_id
JOIN customers c ON f.customer_id = c.customer_id
WHERE f.facility_status = 'ACTIVE'
    AND ic.required_delivery_date >= DATEADD(YEAR, -1, GETDATE())
ORDER BY info_covenant_flag DESC, ic.required_delivery_date DESC;
```

---

## 10. Python Implementation

```python
"""
covenant_monitoring.py
Covenant calculation, headroom analysis, breach detection,
and portfolio-level covenant quality assessment.
"""

import pandas as pd
import numpy as np
from dataclasses import dataclass, field
from typing import Optional
from datetime import date, timedelta
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches


# ─────────────────────────────────────────────────────────────
# COVENANT DEFINITIONS
# ─────────────────────────────────────────────────────────────

@dataclass
class CovenantDefinition:
    name: str
    metric: str                     # 'NET_LEVERAGE', 'INTEREST_COVER', etc.
    operator: str                   # 'MAX' or 'MIN'
    threshold: float
    test_frequency_months: int      # 3 = quarterly, 6 = semi-annual, 12 = annual
    cure_mechanism: str             # 'EQUITY_CURE', 'NONE'
    cure_period_days: int = 20
    ebitda_definition: str = 'ADJUSTED_LTM'  # Which EBITDA definition to use


@dataclass
class CovenantTestResult:
    test_date: date
    covenant: CovenantDefinition
    actual_value: float
    adjusted_ebitda: float
    ebitda_adjustments: dict = field(default_factory=dict)

    @property
    def headroom(self) -> float:
        if self.covenant.operator == 'MAX':
            return self.covenant.threshold - self.actual_value
        else:
            return self.actual_value - self.covenant.threshold

    @property
    def headroom_pct(self) -> float:
        return self.headroom / self.covenant.threshold if self.covenant.threshold else 0

    @property
    def passes(self) -> bool:
        if self.covenant.operator == 'MAX':
            return self.actual_value <= self.covenant.threshold
        else:
            return self.actual_value >= self.covenant.threshold

    @property
    def traffic_light(self) -> str:
        if not self.passes:
            return 'RED'
        elif self.headroom_pct < 0.10:
            return 'RED'
        elif self.headroom_pct < 0.20:
            return 'AMBER'
        return 'GREEN'

    @property
    def ebitda_decline_to_breach(self) -> Optional[float]:
        """How much can EBITDA fall before this covenant is breached?"""
        if self.covenant.metric == 'NET_LEVERAGE':
            # Leverage = Net Debt / EBITDA
            # Breach when EBITDA = Net Debt / threshold
            # Approximate: need to know net debt
            return None  # Requires net debt; computed in CovenantPackage
        elif self.covenant.metric == 'INTEREST_COVER':
            # Cover = EBITDA / Interest
            # Breach when EBITDA = threshold × interest
            # Actual / threshold = how much decline is tolerated
            if self.passes and self.actual_value > 0:
                return (1 - self.covenant.threshold / self.actual_value) * 100
        return None


# ─────────────────────────────────────────────────────────────
# COVENANT PACKAGE (all covenants for one borrower)
# ─────────────────────────────────────────────────────────────

class CovenantPackage:

    def __init__(self, borrower_name: str, facility_id: str,
                 covenants: list[CovenantDefinition]):
        self.borrower = borrower_name
        self.facility_id = facility_id
        self.covenants = covenants
        self.test_history: list[CovenantTestResult] = []

    def add_test(self, result: CovenantTestResult):
        self.test_history.append(result)

    def latest_results(self) -> list[CovenantTestResult]:
        """Get the most recent test result for each covenant."""
        seen = {}
        for r in sorted(self.test_history, key=lambda x: x.test_date, reverse=True):
            if r.covenant.name not in seen:
                seen[r.covenant.name] = r
        return list(seen.values())

    def dashboard(self) -> pd.DataFrame:
        rows = []
        for r in self.latest_results():
            rows.append({
                'Borrower': self.borrower,
                'Covenant': r.covenant.name,
                'Test Date': r.test_date,
                'Operator': r.covenant.operator,
                'Threshold': r.covenant.threshold,
                'Actual': round(r.actual_value, 2),
                'Headroom (abs)': round(r.headroom, 2),
                'Headroom (%)': f'{r.headroom_pct*100:.1f}%',
                'Status': 'PASS' if r.passes else 'BREACH',
                'Traffic Light': r.traffic_light,
            })
        return pd.DataFrame(rows)

    def headroom_trend(self, covenant_name: str) -> pd.DataFrame:
        """Trend data for a specific covenant."""
        relevant = [r for r in self.test_history 
                    if r.covenant.name == covenant_name]
        relevant.sort(key=lambda x: x.test_date)
        rows = [{
            'Date': r.test_date,
            'Actual': round(r.actual_value, 2),
            'Threshold': r.covenant.threshold,
            'Headroom': round(r.headroom, 2),
            'Headroom_Pct': round(r.headroom_pct * 100, 1),
            'Status': 'PASS' if r.passes else 'BREACH',
        } for r in relevant]
        return pd.DataFrame(rows)

    def sensitivity_analysis(self, net_debt: float, 
                              net_interest: float,
                              current_ebitda: float) -> pd.DataFrame:
        """
        Show covenant status at various EBITDA decline levels.
        """
        declines = [0.0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40]
        rows = []
        for d in declines:
            stressed_ebitda = current_ebitda * (1 - d)
            row = {
                'EBITDA Decline (%)': f'{int(d*100)}%',
                'Stressed EBITDA (£m)': round(stressed_ebitda / 1e6, 2),
            }
            for cov in self.covenants:
                if cov.metric == 'NET_LEVERAGE':
                    actual = net_debt / stressed_ebitda if stressed_ebitda else 99
                    passes = actual <= cov.threshold
                elif cov.metric == 'INTEREST_COVER':
                    actual = stressed_ebitda / net_interest if net_interest else 99
                    passes = actual >= cov.threshold
                else:
                    actual = None
                    passes = True
                row[f'{cov.name} ({cov.threshold}{("x" if cov.metric in ["NET_LEVERAGE","INTEREST_COVER"] else "")}{"max" if cov.operator=="MAX" else "min"})'] = \
                    f'{round(actual,2):.2f}x {"✓" if passes else "BREACH"}'
            rows.append(row)
        return pd.DataFrame(rows)

    def plot_headroom_trend(self, covenant_name: str, save_path: str = None):
        """Chart headroom trend for a covenant over time."""
        df = self.headroom_trend(covenant_name)
        if df.empty:
            return

        fig, ax1 = plt.subplots(figsize=(10, 5))
        
        # Plot actual vs threshold
        ax1.plot(df['Date'], df['Actual'], 'b-o', linewidth=2, label='Actual Ratio')
        ax1.axhline(y=df['Threshold'].iloc[0], color='red', linestyle='--', 
                    linewidth=2, label=f'Covenant Threshold ({df["Threshold"].iloc[0]}x)')
        
        # Shade breach zones
        for i, row in df.iterrows():
            if row['Status'] == 'BREACH':
                ax1.axvspan(row['Date'] - timedelta(days=45), 
                           row['Date'] + timedelta(days=45), 
                           alpha=0.15, color='red')

        ax1.set_title(f'{self.borrower} — {covenant_name} Trend', fontsize=12, fontweight='bold')
        ax1.set_ylabel('Ratio (x)')
        ax1.legend(loc='upper left')
        ax1.grid(alpha=0.3)
        
        # Headroom bar chart on secondary axis
        ax2 = ax1.twinx()
        colors = ['green' if h >= 0 else 'red' for h in df['Headroom']]
        ax2.bar(df['Date'], df['Headroom'], width=20, alpha=0.3, 
                color=colors, label='Headroom (x)')
        ax2.set_ylabel('Headroom (x)', color='gray')
        ax2.axhline(y=0, color='black', linewidth=0.5)

        plt.tight_layout()
        if save_path:
            plt.savefig(save_path, dpi=150)
        return fig


# ─────────────────────────────────────────────────────────────
# WAIVER WORKFLOW
# ─────────────────────────────────────────────────────────────

@dataclass
class WaiverRequest:
    breach_date: date
    covenant_name: str
    threshold: float
    actual_value: float
    borrower_explanation: str
    remediation_plan: str
    proposed_waiver_period_months: int
    analyst_recommendation: str    # 'APPROVE', 'APPROVE_WITH_CONDITIONS', 'DECLINE'
    conditions: list[str] = field(default_factory=list)
    proposed_fee_bps: int = 25

    @property
    def breach_severity_pct(self) -> float:
        return abs(self.actual_value - self.threshold) / self.threshold * 100

    def summary(self) -> str:
        lines = [
            f"WAIVER REQUEST — {self.covenant_name}",
            f"Breach Date: {self.breach_date}",
            f"Covenant Threshold: {self.threshold}x",
            f"Actual Value: {self.actual_value}x",
            f"Breach Severity: {self.breach_severity_pct:.1f}%",
            f"Borrower Explanation: {self.borrower_explanation}",
            f"Remediation Plan: {self.remediation_plan}",
            f"Requested Waiver Period: {self.proposed_waiver_period_months} months",
            f"Proposed Waiver Fee: {self.proposed_fee_bps}bps",
            f"Analyst Recommendation: {self.analyst_recommendation}",
        ]
        if self.conditions:
            lines.append("Conditions:")
            for c in self.conditions:
                lines.append(f"  - {c}")
        return "\n".join(lines)


# ─────────────────────────────────────────────────────────────
# EXAMPLE USAGE
# ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    # Define covenant package for Acme Manufacturing
    covenants = [
        CovenantDefinition('Net Leverage', 'NET_LEVERAGE', 'MAX', 3.5, 6, 'NONE'),
        CovenantDefinition('Interest Cover', 'INTEREST_COVER', 'MIN', 3.0, 6, 'NONE'),
    ]

    pkg = CovenantPackage('Acme Manufacturing Ltd', 'FAC-001', covenants)

    # Add historical test results
    test_data = [
        # (date, leverage, icr, adj_ebitda)
        (date(2023, 6, 30), 2.4, 5.6, 16.2e6),
        (date(2023, 12, 31), 2.6, 5.1, 15.8e6),
        (date(2024, 6, 30), 2.9, 4.3, 14.9e6),
        (date(2024, 12, 31), 3.3, 3.4, 13.8e6),
        (date(2025, 6, 30), 3.6, 2.9, 12.2e6),  # BREACH on both
    ]

    for dt, lev, icr, ebitda in test_data:
        pkg.add_test(CovenantTestResult(dt, covenants[0], lev, ebitda))
        pkg.add_test(CovenantTestResult(dt, covenants[1], icr, ebitda))

    print("=" * 70)
    print("COVENANT DASHBOARD — LATEST TEST DATE")
    print("=" * 70)
    print(pkg.dashboard().to_string(index=False))

    print("\n\nHEADROOM TREND — Net Leverage:")
    print(pkg.headroom_trend('Net Leverage').to_string(index=False))

    print("\n\nSENSITIVITY ANALYSIS:")
    print(pkg.sensitivity_analysis(
        net_debt=42e6, net_interest=4.2e6, current_ebitda=12.2e6
    ).to_string(index=False))

    print("\n\nWAIVER REQUEST SUMMARY:")
    waiver = WaiverRequest(
        breach_date=date(2025, 6, 30),
        covenant_name='Net Leverage',
        threshold=3.5, actual_value=3.6,
        borrower_explanation='Revenue decline in H1 2025 due to unexpected loss of key contract. '
                             'Replacement contract awarded in July 2025.',
        remediation_plan='Q3 2025 results expected to show recovery; leverage to return to '
                         'below 3.5x by December 2025 test.',
        proposed_waiver_period_months=6,
        analyst_recommendation='APPROVE_WITH_CONDITIONS',
        conditions=[
            'Monthly management accounts to be delivered within 15 days of each month end',
            'No new capital expenditure above £500k without prior bank consent',
            'No dividend payments during the waiver period',
            'CFO to present Q3 2025 trading update to the bank in October 2025',
        ],
        proposed_fee_bps=25,
    )
    print(waiver.summary())
```

---

## 11. Interview Questions

**Q1: What is the difference between a financial covenant and a negative covenant? Give an example of each.**

*Expected:* Financial covenant: quantitative ratio threshold (e.g., Net Leverage ≤ 3.5x). Enforces financial performance standards. Negative covenant: prohibits an action (e.g., "the borrower shall not create any Financial Indebtedness other than Permitted Indebtedness"). Controls behaviour. A borrower can comply with both the letter and spirit of a financial covenant while violating a negative covenant — these are complementary controls.

**Q2: A borrower's interest cover has declined from 5.0x to 3.1x over 18 months. The covenant is ≥ 3.0x. It hasn't breached yet. What do you do?**

*Expected:* This is a near-miss situation requiring proactive action. The analyst should: (a) flag the borrower as "watch" in the credit system, (b) ensure monthly management accounts are being received and reviewed, (c) request a meeting with the CFO to understand the drivers of decline, (d) build a forward-looking projection to assess the risk of a future breach, (e) brief the RM and consider whether the covenant threshold should be tightened at renewal, (f) assess whether this constitutes a Significant Increase in Credit Risk under IFRS 9 (potential Stage 2 migration).

**Q3: Explain the equity cure mechanism in a leveraged loan covenant.**

*Expected:* An equity cure allows the borrower's sponsor (private equity owner) to inject fresh equity into the business to cure a covenant breach. The injected equity is typically treated as additional EBITDA (up to a set percentage, e.g., 2 times) or used to repay debt (reducing the leverage numerator). Lenders typically cap the number of equity cures (e.g., 2 per year, 4 over the life of the loan) to prevent sponsors from using them to repeatedly defer dealing with underlying performance issues.

**Q4: What is "frozen GAAP" in a covenant context?**

*Expected:* A provision in the facility agreement specifying that covenants are calculated consistently with the accounting policies in place at the signing date. This prevents borrowers from inadvertently or deliberately changing accounting policies to improve their apparent covenant compliance. Particularly important post-IFRS 16 adoption.

**Q5: A borrower requests a covenant waiver. Walk me through your analysis process before making a recommendation to credit committee.**

*Expected:* (a) Independently verify the breach from management accounts — does the breach actually exist? (b) Understand the cause — one-time issue or structural deterioration? (c) Review the history — is this a first breach or a repeat? (d) Assess the remediation plan — is it credible? (e) Forward-looking: can the borrower get back within covenant on its own in a reasonable timeframe? (f) Assess what leverage the bank has and what conditions are appropriate (fee, additional reporting, restrictions). (g) Consider whether this triggers IFRS 9 SICR assessment. (h) Draft waiver recommendation for credit committee with clear conditions.

---

## 12. Common Mistakes

**Mistake 1: Accepting the borrower's compliance certificate without independent verification**
The borrower computes the covenant ratio and declares compliance. An analyst must independently compute the ratio. Management has incentives (and sometimes pressure) to show compliance — non-recurring adjustments can be stretched.

**Mistake 2: Not following up on information covenants**
Failure to deliver management accounts on time is a signal. If the borrower is 3 weeks late with Q2 accounts, something may be wrong. Chase immediately. Information covenant breaches are often early indicators of financial problems.

**Mistake 3: Setting covenant thresholds too far from current performance**
A leverage covenant of 5.5x for a business currently at 2.0x provides almost no early warning value. Thresholds should be set at approximately 20–30% above (for leverage) or below (for coverage) current performance.

**Mistake 4: Not accounting for IFRS 16 in covenant calculations**
Post-2019, many borrowers have significant lease liabilities. If the covenant definition does not address IFRS 16, both parties may calculate different ratios. Always clarify the IFRS 16 treatment in writing at the time of credit approval.

**Mistake 5: Treating a covenant waiver as routine**
Repeated covenant waivers are a serious warning sign. Each waiver should trigger a full credit review, not just a rubber-stamp approval. The waiver document should be as rigorous as the original credit memo.

---

## 13. Case Studies

**Case Study A: The EBITDA Adjustment That Wasn't**

*Situation:* A technology services company had an interest cover covenant of ≥ 3.0x. At the Q3 test date, the company presented a compliance certificate showing ICR of 3.1x after adjusting for a "non-recurring restructuring charge" of £2.4m. Unadjusted ICR: 2.7x (a breach).

*The analyst's review:* The analyst checked the company's previous five years and found a restructuring charge in four of the five years. Under the facility agreement's definition of "non-recurring," a charge that occurs repeatedly every year cannot reasonably be characterised as non-recurring. The analyst disallowed the adjustment.

*Outcome:* The technical breach was confirmed. A waiver was issued with a condition that the borrower provide a restructuring plan showing how it would eliminate the recurring costs, and a step-down in the covenant threshold to ≥ 3.5x at the next two test dates.

*Lesson:* EBITDA adjustments must be scrutinised carefully. A "one-time" cost that recurs annually is not non-recurring.

---

**Case Study B: The Information Gap Before the Storm**

*Situation:* A retail group had delivered Q1 and Q2 management accounts on time. Q3 accounts were not delivered by the required date. The RM noted this but did not chase, as the group had "always been reliable."

*What happened:* Three months later, the group announced a profit warning — EBITDA was £18m for the year versus a covenant implied minimum of £22m. Leverage had breached materially. By the time the accounts were finally delivered (6 weeks late), the group had already drawn down its full RCF and was in advanced discussions with an insolvency practitioner.

*Lesson:* Late information is a red flag, not an administrative inconvenience. Every late delivery of management accounts must be chased within 5 business days and escalated if not received within 10 business days of the due date.

---

## 14. Iterative Reinforcement

**Week 1:** For three facilities in your portfolio, locate the covenant definitions in the facility agreement. Verify that the bank's covenant monitoring system is using the correct definitions.

**Week 2:** Build a covenant calculation workbook for one borrower from scratch. Use the facility agreement's definitions, not a generic template. Calculate the covenant ratio yourself and compare it to the most recent compliance certificate.

**Week 3:** For each borrower on your watchlist, calculate: (a) current headroom, (b) EBITDA decline required to breach, (c) number of test periods until next test date.

**Week 4:** Read one real covenant waiver memo in your institution. What conditions were attached? Were those conditions subsequently complied with? What happened to the borrower thereafter?

**Spaced repetition prompts:**
- What is the difference between a financial covenant and a negative covenant?
- Why is trailing 12-month EBITDA used for covenant testing rather than the most recent period's EBITDA?
- What is an equity cure and when is it appropriate to agree to one?
- Name three conditions you would typically impose when granting a waiver for an interest cover breach.

---

## 15. Source Material

**Legal:**
- Loan Market Association (LMA): Standard Form Leveraged Facility Agreement — defines all standard covenant mechanics; freely available to registered members at lma.eu.com
- LMA: "Leveraged Finance Covenants" guidance note
- Wood, P.: *The Law of Subordinated Debt* (Sweet & Maxwell) — subordination provisions in covenant packages

**Regulatory:**
- EBA/GL/2020/06: Guidelines on Loan Origination and Monitoring, Section 7 (Monitoring framework)
- EBA Implementing Technical Standard on Supervisory Reporting — Forbearance definitions
- PRA SS3/17: Internal Ratings-Based Approaches — covenant data requirements for IRB models

**Academic/practitioner research:**
- Demiroglu, C. and James, C.M.: "The Role of Private Equity Group Reputation in LBO Financing" (2010) — includes analysis of covenant tightness and credit quality
- Dichev, I. and Skinner, D.: "Large-Sample Evidence on the Debt Covenant Hypothesis" — Journal of Accounting Research (2002)
- Roberts, M. and Sufi, A.: "Renegotiation of Financial Contracts: Evidence from Private Credit Agreements" (2009)

**Practitioner guides:**
- Standard & Poor's: "A Guide to the Loan Market" (annual) — includes detailed description of typical covenant packages by credit quality
- Fried Frank Harris Shriver & Jacobson LLP: "Private Equity Loan Market Overview" — detailed analysis of covenant trends
- Deloitte: "European leveraged loan covenants review" (annual publication) — statistical data on covenant headroom and waiver rates across the European market
