# M44 — Covenant Tracking

## 1. Business Purpose

Financial covenants are contractual controls embedded in loan agreements that give the bank the right to declare an event of default, demand repayment, or require renegotiation if the borrower's financial condition deteriorates below agreed thresholds. Covenant tracking — the ongoing operational process of measuring compliance with these thresholds — is one of the most important risk management tools in commercial lending.

The purpose of covenants is not primarily to trigger default. Their purpose is to give the bank an early contractual conversation right before the borrower has actually defaulted on a payment. A DSCR covenant of 1.20x breached at 1.10x means the borrower is still servicing its debt — but the bank now has the legal right to sit at the table and discuss the trajectory. Without the covenant, the bank might not discover the deterioration until a payment is missed, at which point recovery prospects are materially worse.

Covenant tracking serves several commercial and regulatory purposes:

1. **Risk detection:** Headroom erosion before a breach provides advance warning of deteriorating credit quality.
2. **Contractual protection:** Tracking confirms whether the bank's legal protections are intact.
3. **IFRS 9 trigger:** A covenant breach, or a waiver request in anticipation of breach, is typically a SICR trigger and causes a move to Stage 2.
4. **Portfolio management information:** Aggregate headroom across the portfolio indicates systemic stress during downturns.
5. **Regulatory compliance:** PRA and EBA require banks to monitor and report on covenant compliance for material exposures.
6. **Pricing and terms management:** Tight headroom (< 10% of covenant threshold) at the annual review may justify covenant tightening or pricing uplift.

Banks that fail to track covenants rigorously find themselves without contractual leverage at precisely the moment they need it most.

## 2. Accounting Concepts

**The covenant calculation base.** Financial covenants typically reference accounting definitions that are agreed in the facility agreement. These definitions matter enormously and must be read with care:

- **EBITDA** may be defined as statutory EBITDA with specific adjustments: adding back non-recurring items, excluding exceptional charges, including/excluding IFRS 16 lease costs, adding/subtracting proforma adjustments for acquisitions or disposals. The defined EBITDA for covenant purposes (sometimes called "Adjusted EBITDA" or "Consolidated EBITDA") may differ significantly from the reported EBITDA in the accounts.
- **Net Debt** under a facility agreement may exclude or include: IFRS 16 lease liabilities, shareholder loans, contingent liabilities, hedging marks-to-market, cash restricted by law. A borrower who appears highly leveraged on a statutory basis may have a lower leverage ratio for covenant purposes if shareholder loans are subordinated and excluded.
- **Finance Charges** for ICR purposes may be calculated on a cash basis (actual interest paid) rather than an accruals basis.

Understanding these definitional adjustments is essential. An analyst must reconcile from statutory accounts to covenant-defined metrics before calculating compliance.

**Management accounts vs audited accounts.** Most covenants are tested against quarterly management accounts rather than annual audited accounts. Management accounts are not subject to external audit and may contain errors or management adjustments. Banks must be alert to this. Some facility agreements require management accounts to be prepared "on a basis consistent with the most recently delivered audited financial statements" and may require the auditors to confirm the basis if required.

**Covenant cure provisions.** Many facility agreements include equity cure rights — the borrower's shareholders may inject equity within a defined cure period (typically 10-15 business days after a breach is identified) to remedy a financial covenant breach. The injected cash increases EBITDA (or reduces Net Debt) for covenant purposes. Banks must track whether a cure right has been exercised and whether the cure is within the permitted limits (usually no more than 2 cures in any 4-quarter rolling period).

**Frozen GAAP vs floating GAAP.** Older facility agreements (pre-2018) may include a frozen GAAP provision, meaning that covenant calculations are performed using the accounting standards in force at the date of the agreement, regardless of subsequent changes. This prevents a change in accounting standards (like IFRS 16, which increased lease liabilities on balance sheet) from inadvertently triggering a covenant breach.

## 3. Financial Concepts

**Leverage covenant.** The most common financial covenant. Net Debt / EBITDA ≤ X.xx times (maximum). Example: Net Leverage must not exceed 3.50x tested quarterly on a last-twelve-months (LTM) basis.

**Interest Coverage covenant.** EBITDA / Net Finance Charges ≥ X.xx times (minimum). Example: ICR must not be less than 3.00x.

**DSCR covenant.** Used in project finance and real estate. (Net Operating Income or EBITDA) / (Interest + Scheduled Principal) ≥ X.xx times. This is a cash-based measure and more conservative than ICR.

**LTV covenant.** For real estate-backed loans. Outstanding Loan Balance / Market Value of Security ≤ XX%. Example: LTV must not exceed 65%. This covenant is tested annually (or more frequently if values move materially) and requires a formal property valuation.

**Minimum liquidity covenant.** Cash and available committed facilities ≥ £X million. Used in distressed situations or for borrowers in capital-intensive businesses. Ensures the borrower maintains a minimum liquidity buffer.

**Headroom calculation.** Headroom is the difference between the actual metric and the covenant threshold, expressed as a percentage of the threshold:
- For maximum covenants (leverage): Headroom % = (Covenant Level − Actual Level) / Covenant Level × 100
- For minimum covenants (DSCR, ICR): Headroom % = (Actual Level − Covenant Level) / Covenant Level × 100
- A negative headroom % indicates a covenant breach.

**Covenant step-downs.** Many covenants tighten over time to reflect the expectation that leverage will reduce as debt is repaid and EBITDA grows. A borrower might have a leverage covenant of 4.00x in Year 1, 3.50x in Year 2, 3.00x in Year 3. The covenant step-down schedule must be tracked and updated in the monitoring system at each test date.

**Proforma adjustments in covenant calculations.** If the borrower has made an acquisition since the last full-year accounts, the EBITDA used for covenant calculation may include a proforma contribution from the acquisition for the full year even if it was only owned for part of the period. Banks must scrutinise proforma adjustments carefully — they are a common source of aggressive EBITDA inflation.

**Annualisation of quarterly metrics.** When testing against quarterly management accounts, metrics must be calculated on an LTM (last twelve months) basis. This requires rolling the current quarter's data with the three prior quarters. An analyst must ensure all four quarters are captured and that there is no double-counting or gap.

## 4. Statistical Concepts

**Headroom distribution across the portfolio.** Risk managers should track the distribution of covenant headroom across the portfolio, not just individual breaches. A portfolio where 30% of obligors have leverage headroom < 10% is at risk of widespread covenant breaches in a moderate economic downturn, even if no individual breach has occurred.

**Sensitivity analysis on covenant headroom.** Given a plausible downside scenario (e.g., EBITDA falls 15% and debt increases by £5m due to RCF draw), what percentage of borrowers would breach their leverage covenant? This is a standard portfolio stress test calculation.

**Regression to mean.** Financial metrics that are close to but not yet breaching a covenant may exhibit mean reversion if the deterioration was driven by a one-off event. Analysts should assess whether poor quarterly numbers reflect a trend or a temporary dip, and apply judgment accordingly.

**Bootstrapping covenant tests.** For complex covenant structures with multiple interlocking tests, a Monte Carlo simulation can show the probability of at least one covenant breach given a range of EBITDA and debt outcomes.

**Time series of headroom.** Plotting headroom over time for an individual borrower reveals trends that point-in-time data conceals. A borrower whose leverage headroom was 40% two years ago, 25% a year ago, and 10% today is on a clear deteriorating trajectory even though it has not yet breached.

## 5. Regulatory Framework

**EBA/GL/2020/06 — Loan Origination and Monitoring.** Section 7.2 specifically addresses covenant monitoring:
- Financial institutions must set up robust monitoring systems for financial covenants
- Institutions should determine the frequency of financial covenant testing based on the risk profile of the borrower
- The monitoring should include tracking of covenant headroom
- Institutions should have documented procedures for handling technical breaches and waivers

**IFRS 9 — Forbearance and SICR.** A waiver of a covenant breach is classified as forbearance under IFRS 9. Forborne exposures are automatically classified as Stage 2 (at minimum) regardless of whether credit risk has technically increased relative to origination. This staging must be maintained for a probation period (typically 12 months after the waiver period ends and conditions are restored). IFRS 9 paragraph B5.5.25 provides the indicators of SICR, including "a significant increase in the credit spread of the borrower's debt" and "covenant waivers or modifications."

**FCA CONC rules.** For consumer lending, the FCA's Consumer Credit sourcebook governs forbearance expectations. This module focuses on commercial lending, where these rules do not apply, but banks with both consumer and commercial books must maintain clean separation.

**PRA CP27/20 and SS2/21 — IRB approach.** Covenant tracking data feeds the bank's internal default database. Under the Basel II/III IRB approach, an obligor is in default if the bank considers it unlikely to pay. A covenant breach and subsequent waiver may or may not meet the 'unlikely to pay' definition, but the analysis must be documented.

**LMA (Loan Market Association) Standard Terms.** The LMA Leveraged Finance facility agreement is the market standard template for leveraged lending in Europe. It contains detailed financial covenant definitions, testing mechanics, cure provisions, and waiver procedures. Analysts working on leveraged deals must be familiar with LMA standard covenant definitions.

## 6. Data Required

**From the facility agreement:**
- Covenant definitions (including all adjustments to financial metrics)
- Covenant thresholds and step-down schedule
- Testing frequency (quarterly, semi-annual, annual)
- Testing date (specific date or X days after quarter end)
- Compliance certificate requirements (who delivers, what information)
- Cure rights and their conditions
- Remedies available on breach (demand repayment, margin step-up, additional security)
- Waiver provisions (what majority of lenders is required to grant a waiver)

**From the borrower:**
- Quarterly management accounts (P&L, balance sheet, cash flow)
- Quarterly compliance certificate (borrower's own covenant calculations)
- Board resolution confirming no event of default (for major facilities)
- Any additional financial information specified in the agreement

**From internal systems:**
- Current loan balance and interest payable
- Facility limit and drawn amount
- RCF utilisation
- Payment history
- Prior covenant test results and headroom trend
- Last waiver or amendment date

**From external sources:**
- Property valuations (RICS Red Book) — for LTV covenants
- Interest rate data — for floating rate cost of debt calculations
- Exchange rate data — for multi-currency facilities (where covenants are tested in a base currency)

## 7. How Analysts Actually Work

**Step 1: Receive compliance certificate.** On or before the due date specified in the facility agreement (typically 45 days after quarter end), the borrower delivers a compliance certificate. This is a standard-form document signed by two authorised officers (typically the CFO and CEO) confirming that, as at the test date, all covenants are met and no event of default exists. The certificate includes the borrower's own calculations.

**Step 2: Receive management accounts.** The compliance certificate is delivered alongside the quarterly management accounts. In some facilities, the certificate references specific line items from the accounts that make up each covenant metric.

**Step 3: Independent calculation.** The analyst independently calculates every covenant metric from the management accounts, following the definitions in the facility agreement. This may require:
- Building or updating a covenant calculation model in Excel
- Tracking LTM figures by rolling four quarters of data
- Applying definitional adjustments (e.g., adding back non-recurring items)
- Converting from management accounting basis to covenant-defined basis

**Step 4: Reconcile.** Compare the analyst's independent calculation to the borrower's certificate. Material differences must be investigated and resolved with the borrower. Small differences often arise from rounding or definitional ambiguity; large differences are a red flag.

**Step 5: Calculate headroom.** Calculate headroom for each covenant as a percentage of the threshold. Update the covenant tracking system.

**Step 6: RAG status and escalation.** Apply the bank's RAG framework:
- Green: headroom > 15%
- Amber: headroom 5–15%
- Red: headroom < 5% or breach

Any Red or Amber status requires immediate notification to the RM and credit officer.

**Step 7: Update credit system.** Record the test date, all metric values, headroom percentages, and RAG status in the credit monitoring system. This feeds into the IFRS 9 staging assessment and portfolio reporting.

**Step 8: Breach or near-breach escalation.** If a breach has occurred or headroom is below 5%, a formal escalation memo is prepared and presented to credit committee. The credit officer meets with the RM and legal counsel to discuss options: waiver, amendment, acceleration.

**The waiver process:** When a borrower breaches a covenant:
1. The borrower must formally notify the bank of the breach (obligation under the facility agreement)
2. The bank's legal team prepares a waiver letter specifying: the breached covenant, the test date, the actual metric, the covenant threshold, the scope of the waiver (one-off or rolling), and any conditions precedent to the waiver taking effect
3. For syndicated facilities, a majority lender vote is required (typically 66.67% or 75% of commitments)
4. Conditions to waiver may include: margin step-up, additional reporting, injection of additional equity, security top-up, appointment of turnaround adviser
5. The waiver is documented and filed in the credit system
6. IFRS 9 staging must be reviewed: a waiver is a SICR indicator

## 8. Excel Implementation

```excel
=== SHEET: Covenant_Dashboard ===

HEADER SECTION:
Borrower Name: [cell reference to master sheet]
Facility Reference: [cell reference]
Testing Frequency: Quarterly
Most Recent Test Date: [date picker or manual]
Next Test Date: =EDATE(B_MostRecentTest, 3)  [3 months]
Days Until Next Test: =DAYS(B_NextTest, TODAY())
Analyst: [manual]
Date Prepared: =TODAY()

=== COVENANT 1: NET LEVERAGE ===

  Row 10: Covenant Definition: Net Debt / EBITDA ≤ [threshold]
  Row 11: Covenant Step-down Schedule:
    Year 1 (to [date]): 4.00x
    Year 2 (to [date]): 3.50x
    Year 3 onwards:     3.00x

  Current applicable threshold: =IF(TODAY()<DATE_Y1,"4.00",IF(TODAY()<DATE_Y2,"3.50","3.00"))
  [Store as named range: Threshold_Leverage]

  LTM EBITDA Build:
    Row 20: Q1 EBITDA (from Q1 mgmt accounts):   [manual input]
    Row 21: Q2 EBITDA (from Q2 mgmt accounts):   [manual input]
    Row 22: Q3 EBITDA (from Q3 mgmt accounts):   [manual input]
    Row 23: Q4 EBITDA (from Q4 mgmt accounts):   [manual input]
    Row 24: Subtotal Statutory EBITDA:            =SUM(B20:B23)
    Row 25: Add: Non-recurring charges (per cert):[manual input]
    Row 26: Less: Non-recurring income:           [manual input]
    Row 27: Add: Proforma EBITDA from acquisitions:[manual input]
    Row 28: Adjusted EBITDA (Covenant Basis):     =B24+B25-B26+B27

  Net Debt Build:
    Row 35: Senior Debt — this bank:              [from system]
    Row 36: Senior Debt — other banks:            [manual]
    Row 37: Finance leases (IFRS 16):             [from accounts]
    Row 38: Gross Debt:                           =SUM(B35:B37)
    Row 39: Less: Unrestricted Cash:              [from accounts]
    Row 40: Net Debt (Covenant Basis):            =B38-B39

  Calculation:
    Row 45: Net Leverage (Actual):               =B40/B28
    Row 46: Net Leverage Covenant:               =Threshold_Leverage
    Row 47: Headroom (turns):                    =B46-B45
    Row 48: Headroom (%):                        =(B46-B45)/B46*100
    Row 49: RAG Status:                          =IF(B45>B46,"BREACH",IF(B48<5,"RED",IF(B48<15,"AMBER","GREEN")))
    Row 50: Borrower Certificate Figure:         [manual input]
    Row 51: Difference to Bank Calculation:      =B45-B50
    Row 52: Reconciliation Note:                 [manual]

=== COVENANT 2: INTEREST COVER ===

  ICR Definition: EBITDA / Net Finance Charges ≥ [threshold]
  Threshold: 3.00x [adjust per agreement]

  Row 60: LTM Net Finance Charges (cash basis):  [from accounts]
  Row 61: Adjusted for one-off items:            [manual]
  Row 62: Net Finance Charges (Covenant Basis):  =B60+B61

  Row 65: ICR (Actual):                         =B28/B62
  Row 66: ICR Covenant:                         3.00
  Row 67: Headroom (x):                         =B65-B66
  Row 68: Headroom (%):                         =(B65-B66)/B66*100
  Row 69: RAG Status:                           =IF(B65<B66,"BREACH",IF(B68<5,"RED",IF(B68<15,"AMBER","GREEN")))

=== COVENANT 3: DSCR (if applicable) ===

  Row 80: Net Operating Cash Flow (LTM):         [from cash flow statement]
  Row 81: Less: Capex (maintenance only):        [from accounts]
  Row 82: Free Cash Flow for DS:                 =B80-B81
  Row 83: Total Debt Service (interest + principal): [from amortisation schedule]
  Row 84: DSCR (Actual):                        =B82/B83
  Row 85: DSCR Covenant:                        1.20
  Row 86: Headroom (x):                         =B84-B85
  Row 87: Headroom (%):                         =(B84-B85)/B85*100
  Row 88: RAG Status:                           =IF(B84<B85,"BREACH",IF(B87<5,"RED",IF(B87<15,"AMBER","GREEN")))

=== SUMMARY RAG TABLE ===

  Row 95: Covenant | Actual | Threshold | Headroom % | Status
  Row 96: Net Leverage | =B45 | =B46 | =B48 | =B49
  Row 97: ICR | =B65 | =B66 | =B68 | =B69
  Row 98: DSCR | =B84 | =B85 | =B87 | =B88

  Conditional formatting:
    Rule 1: If cell = "BREACH" → Red fill (#FF0000), White bold font
    Rule 2: If cell = "RED"    → Orange fill (#FFC000)
    Rule 3: If cell = "AMBER"  → Yellow fill (#FFFF00)
    Rule 4: If cell = "GREEN"  → Green fill (#00B050)

=== SHEET: Headroom_Trend ===

  Columns: Test Date | Leverage Actual | Leverage Threshold | Leverage Headroom% | ICR Actual | ICR Threshold | ICR Headroom%
  One row per quarterly test date (historical data)

  Chart: Dual-axis line chart
    Primary axis: Headroom % (lines for each covenant)
    Secondary axis: none needed
    Red horizontal line at 0% (covenant threshold)
    Amber band: 0–15%
    Add data labels at most recent quarter

  Formula for chart data source:
    =IFERROR(VLOOKUP(A[date],Historical_Tests,4,0),"")

=== SHEET: Waiver_Log ===

  Columns:
  A: Waiver Reference
  B: Date of Breach
  C: Test Date
  D: Covenant Breached
  E: Actual Level
  F: Covenant Level
  G: Magnitude of Breach
  H: Waiver Requested Date
  I: Waiver Granted Date
  J: Waiver Expiry Date
  K: Conditions of Waiver
  L: Margin Step-up Applied (Y/N)
  M: IFRS 9 Stage at Date of Waiver
  N: Additional Security Required (Y/N)
  O: Current Status (Active/Expired/Replaced)

=== AUTOMATED ALERT (VBA) ===

Sub CheckCovenantAlerts()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("Covenant_Dashboard")

    Dim leverage_rag As String
    Dim icr_rag As String
    leverage_rag = ws.Range("B49").Value
    icr_rag = ws.Range("B69").Value

    If leverage_rag = "BREACH" Or icr_rag = "BREACH" Then
        MsgBox "COVENANT BREACH DETECTED — ESCALATE IMMEDIATELY", _
               vbCritical, "COVENANT ALERT"
    ElseIf leverage_rag = "RED" Or icr_rag = "RED" Then
        MsgBox "Covenant headroom critically low — notify credit officer", _
               vbExclamation, "COVENANT WARNING"
    End If
End Sub
```

## 9. SQL Implementation

```sql
-- ============================================================
-- M44: Covenant Tracking SQL Queries
-- ============================================================

-- ------------------------------------------------------------
-- Table structure (for reference)
-- ------------------------------------------------------------
/*
CovenantDefinitions:
  covenant_id, facility_id, covenant_type, covenant_name,
  threshold_type (MAX/MIN), current_threshold, step_down_schedule (JSON),
  test_frequency, definition_notes

CovenantTests:
  test_id, covenant_id, facility_id, test_date,
  actual_value, threshold_value, headroom_pct,
  rag_status, borrower_cert_value, reconciliation_note,
  analyst_id, approved_by, created_date

CovenantWaivers:
  waiver_id, covenant_id, facility_id, breach_date,
  waiver_granted_date, waiver_expiry_date, conditions_text,
  margin_step_up_bps, additional_security_required,
  ifrs9_stage_at_waiver, waiver_status
*/

-- ------------------------------------------------------------
-- Query 1: Current Covenant Status — All Active Facilities
-- ------------------------------------------------------------
WITH LatestTests AS (
    SELECT
        ct.facility_id,
        ct.covenant_id,
        ct.test_date,
        ct.actual_value,
        ct.threshold_value,
        ct.headroom_pct,
        ct.rag_status,
        ROW_NUMBER() OVER (
            PARTITION BY ct.facility_id, ct.covenant_id
            ORDER BY ct.test_date DESC
        ) AS rn
    FROM CovenantTests ct
)
SELECT
    f.facility_reference,
    c.customer_name,
    c.sector_code,
    cd.covenant_name,
    cd.covenant_type,
    lt.test_date AS last_test_date,
    lt.actual_value,
    lt.threshold_value,
    lt.headroom_pct,
    lt.rag_status,
    DATEADD(MONTH, 3, lt.test_date) AS next_test_due,
    DATEDIFF(DAY, GETDATE(), DATEADD(MONTH, 3, lt.test_date)) AS days_to_next_test,
    rm.rm_name,
    f.drawn_balance
FROM LatestTests lt
JOIN CovenantDefinitions cd ON lt.covenant_id = cd.covenant_id
JOIN Facilities f ON lt.facility_id = f.facility_id
JOIN Customers c ON f.customer_id = c.customer_id
JOIN RelationshipManagers rm ON f.rm_id = rm.rm_id
WHERE lt.rn = 1
    AND f.facility_status = 'ACTIVE'
ORDER BY
    CASE lt.rag_status
        WHEN 'BREACH' THEN 1
        WHEN 'RED'    THEN 2
        WHEN 'AMBER'  THEN 3
        ELSE 4
    END,
    lt.headroom_pct ASC;


-- ------------------------------------------------------------
-- Query 2: Headroom Trend — Trailing 8 Quarters
-- For a specific facility (parameterised)
-- ------------------------------------------------------------
DECLARE @facility_id INT = 12345;

SELECT
    cd.covenant_name,
    ct.test_date,
    DATEPART(YEAR, ct.test_date) AS test_year,
    DATEPART(QUARTER, ct.test_date) AS test_quarter,
    ct.actual_value,
    ct.threshold_value,
    ct.headroom_pct,
    ct.rag_status,
    -- Quarter-over-quarter change in headroom
    ct.headroom_pct - LAG(ct.headroom_pct, 1) OVER (
        PARTITION BY ct.covenant_id
        ORDER BY ct.test_date
    ) AS headroom_change_qoq
FROM CovenantTests ct
JOIN CovenantDefinitions cd ON ct.covenant_id = cd.covenant_id
WHERE ct.facility_id = @facility_id
    AND ct.test_date >= DATEADD(MONTH, -24, GETDATE())
ORDER BY cd.covenant_name, ct.test_date DESC;


-- ------------------------------------------------------------
-- Query 3: Breaches and Waivers in Last 12 Months
-- ------------------------------------------------------------
SELECT
    f.facility_reference,
    c.customer_name,
    cd.covenant_name,
    ct.test_date AS breach_date,
    ct.actual_value,
    ct.threshold_value,
    ABS(ct.headroom_pct) AS breach_magnitude_pct,
    cw.waiver_granted_date,
    cw.waiver_expiry_date,
    cw.margin_step_up_bps,
    cw.conditions_text,
    cw.ifrs9_stage_at_waiver,
    s.ifrs9_stage AS current_stage,  -- has it worsened since waiver?
    CASE
        WHEN cw.waiver_expiry_date < GETDATE() THEN 'EXPIRED'
        WHEN cw.waiver_granted_date IS NULL THEN 'PENDING'
        ELSE 'ACTIVE'
    END AS waiver_status
FROM CovenantTests ct
JOIN CovenantDefinitions cd ON ct.covenant_id = cd.covenant_id
JOIN Facilities f ON ct.facility_id = f.facility_id
JOIN Customers c ON f.customer_id = c.customer_id
LEFT JOIN CovenantWaivers cw ON ct.facility_id = cw.facility_id
    AND ct.covenant_id = cw.covenant_id
    AND ABS(DATEDIFF(DAY, ct.test_date, cw.breach_date)) <= 30
LEFT JOIN IFRS9Staging s ON ct.facility_id = s.facility_id
    AND s.staging_date = EOMONTH(GETDATE(), -1)
WHERE ct.rag_status = 'BREACH'
    AND ct.test_date >= DATEADD(MONTH, -12, GETDATE())
ORDER BY ct.test_date DESC;


-- ------------------------------------------------------------
-- Query 4: Portfolio Headroom Distribution
-- Risk management summary — what % of portfolio is at risk?
-- ------------------------------------------------------------
WITH LatestHeadroom AS (
    SELECT
        ct.facility_id,
        cd.covenant_type,
        ct.headroom_pct,
        ct.rag_status,
        ROW_NUMBER() OVER (
            PARTITION BY ct.facility_id, ct.covenant_id
            ORDER BY ct.test_date DESC
        ) AS rn
    FROM CovenantTests ct
    JOIN CovenantDefinitions cd ON ct.covenant_id = cd.covenant_id
),
MinHeadroom AS (
    -- Take the worst covenant headroom per facility
    SELECT
        facility_id,
        MIN(headroom_pct) AS min_headroom_pct,
        MAX(CASE WHEN rag_status = 'BREACH' THEN 1 ELSE 0 END) AS has_breach,
        MAX(CASE WHEN rag_status = 'RED'    THEN 1 ELSE 0 END) AS has_red,
        MAX(CASE WHEN rag_status = 'AMBER'  THEN 1 ELSE 0 END) AS has_amber
    FROM LatestHeadroom
    WHERE rn = 1
    GROUP BY facility_id
)
SELECT
    COUNT(*) AS total_facilities,
    SUM(has_breach) AS facilities_in_breach,
    SUM(has_red) AS facilities_red,
    SUM(has_amber) AS facilities_amber,
    SUM(CASE WHEN min_headroom_pct >= 15 THEN 1 ELSE 0 END) AS facilities_green,
    -- Exposure-weighted analysis
    SUM(f.drawn_balance) AS total_exposure,
    SUM(CASE WHEN mh.has_breach = 1 THEN f.drawn_balance ELSE 0 END) AS exposure_in_breach,
    SUM(CASE WHEN mh.has_red = 1 THEN f.drawn_balance ELSE 0 END) AS exposure_red,
    ROUND(
        100.0 * SUM(CASE WHEN mh.has_breach = 1 THEN f.drawn_balance ELSE 0 END)
        / NULLIF(SUM(f.drawn_balance), 0), 1
    ) AS pct_exposure_in_breach
FROM MinHeadroom mh
JOIN Facilities f ON mh.facility_id = f.facility_id
WHERE f.facility_status = 'ACTIVE';


-- ------------------------------------------------------------
-- Query 5: Upcoming Covenant Tests — Next 60 Days
-- Workflow management for analysts
-- ------------------------------------------------------------
WITH LastTest AS (
    SELECT
        facility_id,
        covenant_id,
        MAX(test_date) AS last_test_date
    FROM CovenantTests
    GROUP BY facility_id, covenant_id
)
SELECT
    f.facility_reference,
    c.customer_name,
    cd.covenant_name,
    lt.last_test_date,
    CASE cd.test_frequency
        WHEN 'QUARTERLY'   THEN DATEADD(MONTH, 3, lt.last_test_date)
        WHEN 'SEMI_ANNUAL' THEN DATEADD(MONTH, 6, lt.last_test_date)
        WHEN 'ANNUAL'      THEN DATEADD(MONTH, 12, lt.last_test_date)
    END AS next_test_due,
    DATEDIFF(DAY, GETDATE(),
        CASE cd.test_frequency
            WHEN 'QUARTERLY'   THEN DATEADD(MONTH, 3, lt.last_test_date)
            WHEN 'SEMI_ANNUAL' THEN DATEADD(MONTH, 6, lt.last_test_date)
            WHEN 'ANNUAL'      THEN DATEADD(MONTH, 12, lt.last_test_date)
        END
    ) AS days_until_due,
    -- Also flag if accounts haven't been received yet
    CASE
        WHEN ad.received_date IS NULL THEN 'ACCOUNTS NOT RECEIVED'
        ELSE 'ACCOUNTS RECEIVED'
    END AS accounts_status,
    rm.rm_name,
    r.risk_grade
FROM LastTest lt
JOIN CovenantDefinitions cd ON lt.covenant_id = cd.covenant_id
JOIN Facilities f ON lt.facility_id = f.facility_id
JOIN Customers c ON f.customer_id = c.customer_id
JOIN RelationshipManagers rm ON f.rm_id = rm.rm_id
JOIN RiskRatings r ON f.facility_id = r.facility_id AND r.effective_to IS NULL
LEFT JOIN AccountingDeadlines ad ON f.facility_id = ad.facility_id
    AND ad.period_end >= DATEADD(MONTH, -3, GETDATE())
WHERE CASE cd.test_frequency
    WHEN 'QUARTERLY'   THEN DATEADD(MONTH, 3, lt.last_test_date)
    WHEN 'SEMI_ANNUAL' THEN DATEADD(MONTH, 6, lt.last_test_date)
    WHEN 'ANNUAL'      THEN DATEADD(MONTH, 12, lt.last_test_date)
END BETWEEN GETDATE() AND DATEADD(DAY, 60, GETDATE())
ORDER BY days_until_due ASC;


-- ------------------------------------------------------------
-- Query 6: Insert new covenant test result
-- Called after analyst completes their independent calculation
-- ------------------------------------------------------------
INSERT INTO CovenantTests (
    covenant_id,
    facility_id,
    test_date,
    actual_value,
    threshold_value,
    headroom_pct,
    rag_status,
    borrower_cert_value,
    reconciliation_note,
    analyst_id,
    created_date
)
VALUES (
    @covenant_id,
    @facility_id,
    @test_date,
    @actual_value,
    @threshold_value,
    (@threshold_value - @actual_value) / @threshold_value * 100,  -- for MAX covenants
    CASE
        WHEN @actual_value > @threshold_value THEN 'BREACH'
        WHEN (@threshold_value - @actual_value) / @threshold_value * 100 < 5  THEN 'RED'
        WHEN (@threshold_value - @actual_value) / @threshold_value * 100 < 15 THEN 'AMBER'
        ELSE 'GREEN'
    END,
    @borrower_cert_value,
    @reconciliation_note,
    @analyst_id,
    GETDATE()
);
```

## 10. Python Implementation

```python
"""
M44: Covenant Tracking — Python Implementation
Covers: covenant calculation, headroom trending,
waiver management, IFRS 9 staging integration
"""

import pandas as pd
import numpy as np
import pyodbc
from dataclasses import dataclass, field
from typing import List, Optional, Dict
from datetime import date, timedelta
from enum import Enum
import matplotlib.pyplot as plt
import matplotlib.patches as patches


# ============================================================
# 1. DATA CLASSES
# ============================================================

class CovenantType(Enum):
    LEVERAGE = "NET_LEVERAGE"
    ICR = "INTEREST_COVER"
    DSCR = "DSCR"
    LTV = "LTV"
    MIN_LIQUIDITY = "MIN_LIQUIDITY"


class ThresholdDirection(Enum):
    MAX = "MAX"   # actual must be below threshold (e.g., leverage)
    MIN = "MIN"   # actual must be above threshold (e.g., ICR)


@dataclass
class CovenantDefinition:
    covenant_id: int
    facility_id: int
    covenant_type: CovenantType
    covenant_name: str
    threshold_direction: ThresholdDirection
    current_threshold: float
    test_frequency_months: int
    step_down_schedule: List[tuple] = field(default_factory=list)
    # step_down_schedule: list of (effective_date, threshold) tuples
    definition_notes: str = ""

    def get_applicable_threshold(self, test_date: date) -> float:
        """Return the applicable threshold for a given test date."""
        if not self.step_down_schedule:
            return self.current_threshold
        applicable = self.current_threshold
        for step_date, step_threshold in sorted(
            self.step_down_schedule, key=lambda x: x[0]
        ):
            if test_date >= step_date:
                applicable = step_threshold
        return applicable


@dataclass
class CovenantTestResult:
    covenant_id: int
    facility_id: int
    test_date: date
    actual_value: float
    threshold_value: float
    borrower_cert_value: Optional[float] = None
    reconciliation_note: str = ""

    @property
    def headroom_absolute(self) -> float:
        """Signed headroom. Negative = breach."""
        return self.threshold_value - self.actual_value

    @property
    def headroom_pct(self) -> float:
        """Headroom as % of threshold. Negative = breach."""
        if self.threshold_value == 0:
            return 0.0
        return self.headroom_absolute / self.threshold_value * 100

    @property
    def is_breach(self) -> bool:
        return self.headroom_absolute < 0

    @property
    def rag_status(self) -> str:
        if self.is_breach:
            return 'BREACH'
        if self.headroom_pct < 5:
            return 'RED'
        if self.headroom_pct < 15:
            return 'AMBER'
        return 'GREEN'

    @property
    def cert_discrepancy(self) -> Optional[float]:
        if self.borrower_cert_value is None:
            return None
        return abs(self.actual_value - self.borrower_cert_value)


# ============================================================
# 2. COVENANT CALCULATOR
# ============================================================

class CovenantCalculator:
    """
    Performs covenant calculations from raw financial data.
    Applies definitional adjustments per facility agreement.
    """

    def __init__(self, facility_id: int, covenant_definitions: dict):
        self.facility_id = facility_id
        self.definitions = covenant_definitions

    def calculate_adjusted_ebitda(
        self,
        statutory_ebitda: float,
        non_recurring_charges: float = 0.0,
        non_recurring_income: float = 0.0,
        proforma_ebitda: float = 0.0,
        ifrs16_lease_costs: float = 0.0,
        ifrs16_add_back: bool = True
    ) -> float:
        """
        Calculate covenant-adjusted EBITDA.

        Parameters:
        - statutory_ebitda: EBITDA as reported in accounts
        - non_recurring_charges: restructuring, litigation, etc. (add back)
        - non_recurring_income: gain on disposal, etc. (deduct)
        - proforma_ebitda: from acquisitions/disposals (add/subtract)
        - ifrs16_lease_costs: IFRS 16 depreciation of right-of-use assets
        - ifrs16_add_back: if True, add back IFRS 16 lease costs (frozen GAAP)
        """
        adjusted = statutory_ebitda
        adjusted += non_recurring_charges  # add back exceptional charges
        adjusted -= non_recurring_income   # remove non-recurring gains
        adjusted += proforma_ebitda        # proforma for M&A activity
        if ifrs16_add_back:
            adjusted += ifrs16_lease_costs  # frozen GAAP: pre-IFRS 16 basis
        return adjusted

    def calculate_net_debt(
        self,
        senior_debt_this_bank: float,
        senior_debt_other: float,
        finance_leases: float,
        cash: float,
        restricted_cash: float = 0.0,
        shareholder_loans: float = 0.0,
        include_shareholder_loans: bool = False,
        include_ifrs16_leases: bool = False
    ) -> float:
        """
        Calculate covenant-defined Net Debt.

        Note: per facility agreement definition, shareholder loans and
        IFRS 16 leases may be included or excluded.
        """
        gross_debt = senior_debt_this_bank + senior_debt_other
        if include_ifrs16_leases:
            gross_debt += finance_leases
        if include_shareholder_loans:
            gross_debt += shareholder_loans
        net_debt = gross_debt - (cash - restricted_cash)
        return max(net_debt, 0)  # Net Debt cannot be negative for covenant

    def calculate_leverage(
        self, net_debt: float, adj_ebitda: float
    ) -> float:
        """Net Debt / EBITDA ratio."""
        if adj_ebitda <= 0:
            return float('inf')
        return net_debt / adj_ebitda

    def calculate_icr(
        self, adj_ebitda: float, net_finance_charges: float
    ) -> float:
        """EBITDA / Net Finance Charges ratio."""
        if net_finance_charges <= 0:
            return float('inf')
        return adj_ebitda / net_finance_charges

    def calculate_dscr(
        self,
        net_operating_cash_flow: float,
        maintenance_capex: float,
        total_debt_service: float
    ) -> float:
        """(NOC - Maintenance Capex) / Debt Service."""
        free_cash_flow = net_operating_cash_flow - maintenance_capex
        if total_debt_service <= 0:
            return float('inf')
        return free_cash_flow / total_debt_service

    def calculate_ltv(
        self, outstanding_balance: float, current_valuation: float
    ) -> float:
        """Loan outstanding / Property value."""
        if current_valuation <= 0:
            return float('inf')
        return outstanding_balance / current_valuation * 100  # as %


# ============================================================
# 3. HEADROOM TREND ANALYSER
# ============================================================

class HeadroomTrendAnalyser:
    """
    Analyses trends in covenant headroom over time.
    Provides forward-looking headroom projections.
    """

    def __init__(self, test_results: List[CovenantTestResult]):
        self.results = sorted(test_results, key=lambda x: x.test_date)
        self.df = self._to_dataframe()

    def _to_dataframe(self) -> pd.DataFrame:
        if not self.results:
            return pd.DataFrame()
        return pd.DataFrame([{
            'test_date': r.test_date,
            'actual_value': r.actual_value,
            'threshold': r.threshold_value,
            'headroom_pct': r.headroom_pct,
            'rag_status': r.rag_status,
            'is_breach': r.is_breach
        } for r in self.results])

    def trend_direction(self, n_periods: int = 4) -> str:
        """
        Assess whether headroom is improving or deteriorating.
        Uses last n_periods test results.
        """
        if len(self.df) < 2:
            return 'INSUFFICIENT_DATA'
        recent = self.df.tail(n_periods)['headroom_pct'].values
        slope = np.polyfit(range(len(recent)), recent, 1)[0]
        if slope > 2.0:
            return 'IMPROVING'
        if slope < -2.0:
            return 'DETERIORATING'
        return 'STABLE'

    def quarters_to_breach(self, quarterly_deterioration: float) -> Optional[int]:
        """
        Estimate how many quarters until breach, given a constant
        rate of headroom erosion (e.g., 3% per quarter).
        """
        if self.df.empty:
            return None
        current_headroom = self.df['headroom_pct'].iloc[-1]
        if current_headroom <= 0:
            return 0
        if quarterly_deterioration <= 0:
            return None  # not deteriorating
        return int(np.ceil(current_headroom / quarterly_deterioration))

    def plot_headroom_trend(
        self,
        covenant_name: str,
        customer_name: str,
        save_path: Optional[str] = None
    ):
        """Plot headroom trend with RAG banding."""
        if self.df.empty:
            print("No data to plot.")
            return

        fig, ax = plt.subplots(figsize=(12, 6))

        # Colour bands
        ax.axhspan(-100, 0, alpha=0.3, color='red', label='Breach zone')
        ax.axhspan(0, 5, alpha=0.3, color='orange', label='Critical (<5%)')
        ax.axhspan(5, 15, alpha=0.2, color='yellow', label='Warning (5-15%)')

        # Plot headroom
        ax.plot(
            self.df['test_date'],
            self.df['headroom_pct'],
            'b-o',
            linewidth=2,
            markersize=8,
            label='Headroom %'
        )

        # Highlight breaches
        breaches = self.df[self.df['is_breach']]
        if not breaches.empty:
            ax.scatter(
                breaches['test_date'],
                breaches['headroom_pct'],
                color='red', s=150, zorder=5, label='Breach', marker='X'
            )

        # Trend line
        if len(self.df) >= 3:
            x_num = np.arange(len(self.df))
            coeffs = np.polyfit(x_num, self.df['headroom_pct'], 1)
            trend_line = np.poly1d(coeffs)(x_num)
            ax.plot(
                self.df['test_date'], trend_line,
                'r--', alpha=0.7, label=f'Trend (slope: {coeffs[0]:.1f}%/qtr)'
            )

        ax.axhline(y=0, color='red', linewidth=2, linestyle='-')
        ax.set_title(
            f'{customer_name} — {covenant_name} Headroom Trend',
            fontsize=14, fontweight='bold'
        )
        ax.set_xlabel('Test Date')
        ax.set_ylabel('Headroom (%)')
        ax.legend(loc='upper right')
        ax.grid(True, alpha=0.3)

        plt.tight_layout()
        if save_path:
            plt.savefig(save_path, dpi=150, bbox_inches='tight')
        plt.show()


# ============================================================
# 4. IFRS 9 STAGING INTEGRATION
# ============================================================

def assess_sicr_from_covenant(
    test_result: CovenantTestResult,
    prior_stage: int,
    waiver_requested: bool,
    days_since_waiver: Optional[int] = None
) -> dict:
    """
    Assess IFRS 9 SICR implications of a covenant test result.

    Returns dict with staging recommendation and rationale.
    """
    rationale = []
    recommended_stage = prior_stage

    # Covenant breach is a definitive SICR indicator
    if test_result.is_breach:
        rationale.append(
            f"Covenant breach: {test_result.actual_value:.2f}x "
            f"vs threshold {test_result.threshold_value:.2f}x"
        )
        recommended_stage = max(recommended_stage, 2)

    # Waiver request is a SICR indicator even before formal breach
    if waiver_requested:
        rationale.append("Waiver requested: per IFRS 9 B5.5.25, "
                         "covenant waiver is SICR indicator")
        recommended_stage = max(recommended_stage, 2)

    # Low headroom is a quantitative SICR indicator
    if 0 < test_result.headroom_pct < 5:
        rationale.append(
            f"Critically low headroom: {test_result.headroom_pct:.1f}%"
        )
        recommended_stage = max(recommended_stage, 2)

    # Probation period after waiver expires
    if days_since_waiver is not None and days_since_waiver < 365:
        rationale.append(
            f"Within 12-month probation period post-waiver "
            f"({days_since_waiver} days elapsed)"
        )
        recommended_stage = max(recommended_stage, 2)

    # No SICR indicators
    if not rationale:
        rationale.append(f"Headroom {test_result.headroom_pct:.1f}% — "
                         f"no SICR indicators identified")

    return {
        'prior_stage': prior_stage,
        'recommended_stage': recommended_stage,
        'stage_change': recommended_stage != prior_stage,
        'rationale': '; '.join(rationale),
        'test_date': test_result.test_date,
        'assessment_date': date.today()
    }


# ============================================================
# 5. PORTFOLIO COVENANT SUMMARY REPORT
# ============================================================

def generate_covenant_summary_report(
    conn: pyodbc.Connection,
    output_path: str = None
) -> pd.DataFrame:
    """
    Generate portfolio-wide covenant summary report.
    Returns DataFrame with one row per facility, showing worst covenant.
    """
    query = """
    WITH LatestTests AS (
        SELECT
            ct.facility_id,
            cd.covenant_name,
            ct.actual_value,
            ct.threshold_value,
            ct.headroom_pct,
            ct.rag_status,
            ct.test_date,
            ROW_NUMBER() OVER (
                PARTITION BY ct.facility_id, ct.covenant_id
                ORDER BY ct.test_date DESC
            ) AS rn
        FROM CovenantTests ct
        JOIN CovenantDefinitions cd ON ct.covenant_id = cd.covenant_id
    ),
    WorstCovenant AS (
        SELECT
            facility_id,
            MIN(headroom_pct) AS worst_headroom_pct,
            MAX(CASE WHEN rag_status='BREACH' THEN 1 ELSE 0 END) AS in_breach
        FROM LatestTests
        WHERE rn = 1
        GROUP BY facility_id
    )
    SELECT
        f.facility_reference,
        c.customer_name,
        wc.worst_headroom_pct,
        wc.in_breach,
        CASE wc.in_breach
            WHEN 1 THEN 'BREACH'
            WHEN 0 THEN
                CASE
                    WHEN wc.worst_headroom_pct < 5  THEN 'RED'
                    WHEN wc.worst_headroom_pct < 15 THEN 'AMBER'
                    ELSE 'GREEN'
                END
        END AS worst_rag,
        f.drawn_balance,
        r.risk_grade
    FROM WorstCovenant wc
    JOIN Facilities f ON wc.facility_id = f.facility_id
    JOIN Customers c ON f.customer_id = c.customer_id
    JOIN RiskRatings r ON f.facility_id = r.facility_id
        AND r.effective_to IS NULL
    WHERE f.facility_status = 'ACTIVE'
    ORDER BY wc.worst_headroom_pct ASC
    """
    df = pd.read_sql(query, conn)
    print(f"\nCOVENANT PORTFOLIO SUMMARY — {date.today()}")
    print(f"Total facilities: {len(df)}")
    print(f"Breaches: {df['in_breach'].sum()}")
    print(f"Red (< 5% headroom): {(df['worst_rag'] == 'RED').sum()}")
    print(f"Amber (5-15%): {(df['worst_rag'] == 'AMBER').sum()}")
    print(f"Green (>15%): {(df['worst_rag'] == 'GREEN').sum()}")
    return df
```

## 11. Interview Questions

**Q1: What is the difference between a technical breach and a payment default?**
A: A technical breach (also called a "financial covenant breach" or "event of default — financial covenant") occurs when a financial metric fails a covenant test but the borrower has not missed any cash payments. The borrower is still making interest and principal payments on time. A payment default occurs when the borrower fails to pay interest or principal when due. A technical breach is recoverable — through a waiver — without the borrower being in true financial distress. A payment default is far more serious and is almost always an indicator of severe financial distress.

**Q2: Walk me through the waiver process when a covenant is breached.**
A: When a breach is identified: (1) the borrower formally notifies the bank (required under the facility agreement); (2) the credit officer assesses the severity and trajectory; (3) legal counsel prepares a waiver letter specifying the breached covenant, test date, actual metric, and scope of waiver; (4) for syndicated facilities, a lender vote is required (typically 66.67% or 75% by commitments); (5) conditions may be attached (margin step-up, additional reporting, equity cure); (6) IFRS 9 staging must be reviewed — the waiver is a SICR indicator and the facility should move to Stage 2 if not already there; (7) the waiver is documented and filed; (8) enhanced monitoring is applied for the waiver period.

**Q3: How does IFRS 16 affect covenant calculations?**
A: IFRS 16 (effective January 2019) capitalised operating leases onto the balance sheet, creating right-of-use assets and lease liabilities. This increased Net Debt (by the lease liability) and increased EBITDA (by adding back the operating lease expense previously below the EBITDA line, replacing it with depreciation and interest). For leverage covenants, the IFRS 16 impact on EBITDA and Net Debt may partially offset, but it depends on the definitions in the facility agreement. Many facility agreements from before 2018 contain "frozen GAAP" provisions that allow covenant calculations to be performed as if IFRS 16 had not been adopted. Analysts must check the agreement definition carefully.

**Q4: What is an equity cure and what are its limits?**
A: An equity cure is a provision in a facility agreement allowing the borrower's shareholders to inject equity into the business within a defined period after a covenant breach, with the injected cash counting as EBITDA (or reducing Net Debt) for covenant calculation purposes. This allows a covenant breach to be remedied without a formal waiver. Typical limits: (a) no more than 2 equity cures in any rolling 4-quarter period; (b) the equity cure right cannot be used in consecutive quarters; (c) the injected amount cannot be withdrawn from the business during a restricted period; (d) the cure amount cannot be used to pay dividends or distributions.

**Q5: How would you assess whether a borrower's compliance certificate is reliable?**
A: First, independently recalculate every covenant metric from the underlying management accounts. Second, check whether the management accounts themselves are internally consistent (profit + depreciation ≈ operating cash flow; opening + net movement ≈ closing balance sheet). Third, compare to prior periods: a sudden improvement in EBITDA with no apparent business reason should be investigated. Fourth, check whether adjustments claimed in the compliance certificate are permitted under the facility agreement definitions. Fifth, for any material variance between the certificate and the bank's calculation, request a detailed reconciliation from the borrower's finance team.

## 12. Common Mistakes

**Mistake 1: Using reported EBITDA instead of covenant-adjusted EBITDA.** Facility agreements define EBITDA with specific add-backs and exclusions. Using the statutory figure directly will give the wrong answer and may show a false breach or false headroom.

**Mistake 2: Forgetting the covenant step-down.** A borrower with 15% leverage headroom at a 4.00x covenant will have only 7% headroom when the covenant steps down to 3.75x, even if their actual leverage hasn't moved. Analysts who use a static threshold in their models fail to capture this.

**Mistake 3: Calculating leverage on a point-in-time debt balance.** EBITDA is a flow measure (12-month period) but Net Debt is a stock measure (at a point in time). Using year-end Net Debt when debt was unusually low due to seasonality will understate leverage. Some agreements use average Net Debt or test at the covenant test date specifically to avoid this.

**Mistake 4: Failing to update the IFRS 9 stage after a waiver.** A covenant waiver is one of the most obvious SICR triggers. Banks that grant a waiver without reviewing IFRS 9 staging are underprovisioning.

**Mistake 5: Accepting the borrower's proforma EBITDA adjustments without scrutiny.** Proforma adjustments for acquisitions are a common source of EBITDA inflation. Borrowers may claim full-year contributions from businesses acquired late in the year, using unrealistic synergy estimates. Banks should apply a haircut to management's proforma EBITDA.

**Mistake 6: Not tracking the probation period after waiver expiry.** Under IFRS 9, an exposure that has been forborne (waived) must remain in Stage 2 for a minimum 12-month probation period after the forbearance expires and conditions are normalised. Banks sometimes prematurely upgrade to Stage 1 when the waiver period ends.

## 13. Case Studies

**Case Study 1: The Frozen GAAP Dispute**

A UK mid-market lender had a £25m term loan to a distribution business, with a leverage covenant of 3.00x. The facility agreement was signed in 2016 (pre-IFRS 16). The borrower adopted IFRS 16 in 2019, adding £8m of lease liabilities to its balance sheet. The lender's model showed a leverage ratio of 3.40x — a covenant breach. The borrower's compliance certificate showed 2.85x and cited the frozen GAAP clause. Resolution: the legal team confirmed the agreement contained a frozen GAAP provision. The pre-IFRS 16 leverage was calculated at 2.72x. No breach. Lesson: always read the facility agreement definitions before calculating. The GAAP basis matters enormously.

**Case Study 2: Consecutive Equity Cures — Hidden Credit Problem**

A leisure operator used equity cures in Q1 2023 and Q3 2023 to remedy leverage covenant breaches. Both cures were within the 2-in-4 quarters limit. The credit analyst flagged the pattern to the credit officer and recommended an out-of-cycle review. The review revealed that EBITDA had structurally declined due to the post-COVID consumer spending normalisation, and that the equity injections were masking an unsustainable leverage position. The facility was transferred to the Restructuring team. The company subsequently entered Administration in 2024. Lesson: pattern of equity cures is itself a red flag warranting enhanced monitoring, even where each individual cure is contractually permitted.

## 14. Iterative Reinforcement

**Exercise 1: Covenant calculation from accounts.** Take a set of management accounts (create a realistic test case or use public company data). Apply 5 specific definitional adjustments. Calculate leverage, ICR, and DSCR. Compare to a hypothetical compliance certificate with different figures. Reconcile any differences.

**Exercise 2: Step-down schedule modelling.** Build a spreadsheet that applies a 4-year covenant step-down schedule. Calculate headroom at each quarterly test date using a projected EBITDA and debt repayment schedule.

**Exercise 3: Breach scenario analysis.** Given a base case where leverage is 2.85x against a 3.00x covenant, stress EBITDA down 10%, 20%, 30%. At what level of EBITDA stress does the covenant breach? What is the equity cure amount needed at each stress level?

**Exercise 4: Waiver letter drafting.** Draft a simplified waiver letter for a covenant breach. Include: parties, date, breached covenant, test date, magnitude, scope of waiver, expiry date, conditions, IFRS 9 staging note.

**Exercise 5: Portfolio stress test.** Take 20 hypothetical facilities with varying leverage headrooms. Apply a 15% EBITDA stress. Which facilities breach? What is the total exposure in breach? What is the incremental provision?

## 15. Source Material

**Primary legal and regulatory references:**
- Loan Market Association (LMA): Leveraged Finance Facility Agreement — financial covenant definitions and compliance certificate provisions
- LMA: Guide to Leveraged Finance Covenants (2019)
- IFRS 9 Financial Instruments — paragraphs 5.5.17–5.5.22 (forbearance and SICR)
- EBA Guidelines on the definition of default (EBA/GL/2016/07) — interaction with covenant breaches
- EBA/GL/2020/06 Loan Origination and Monitoring — Section 7.2

**Accounting and valuation:**
- IFRS 16 Leases (IASB, 2016) — impact on EBITDA and leverage metrics
- ICAEW Technical Release: IFRS 16 and Bank Covenants (Tech 02/19)
- RICS Valuation — Global Standards (the "Red Book") — property covenant LTV basis

**Books and articles:**
- Fight, A.: "Credit Risk Management" — Chapter 8: Covenant Monitoring
- Vernimmen, P.: "Corporate Finance" — Chapter on bank covenants
- Practicallaw.com: "Financial Covenants in Leveraged Finance Transactions"
- Risk.net: "Covenant Headroom Erosion in the Leveraged Loan Market" (2022)
- Moody's Analytics: "Covenant Quality Monitor" — quarterly publication tracking covenant tightening trends

**Case law:**
- Standish v The Royal Bank of Scotland [2019] — covenant enforcement dispute
- Relevant UK insolvency cases on acceleration and enforcement of financial covenants
