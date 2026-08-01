# M46 — Restructuring

## 1. Business Purpose

Restructuring occurs when a borrower cannot meet its obligations as originally structured but has a viable underlying business that justifies continued bank support with modified terms. It sits between ongoing monitoring (the borrower is performing) and recovery (the borrower has definitively failed and the bank is enforcing security). Restructuring is the most operationally complex and judgment-intensive area of credit risk management.

The fundamental question in restructuring is: **does this business have sufficient long-term viability to justify the bank bearing the additional risk of modified terms?** If yes, restructuring preserves value for both the borrower and the bank. If no, recovery action (administration, liquidation) will maximise the bank's recovery. Getting this judgment wrong in either direction is expensive: restructuring a non-viable business delays the inevitable and destroys value; pursuing recovery against a viable business causes unnecessary unemployment and asset destruction.

The business purpose of the restructuring function (variously called Special Assets, Loan Management, Corporate Recovery, or Restructuring & Recovery) is to:

1. **Maximise value recovery** from distressed exposures — either by nursing the business back to health or, where that is not possible, by recovering the maximum cash from the exposure
2. **Minimise credit losses** relative to the bank's position (secured vs unsecured, position in the capital stack)
3. **Protect the bank's legal position** — ensuring security is properly perfected and enforceable
4. **Manage IFRS 9 provisioning** — working with the finance team to ensure provisions accurately reflect expected losses
5. **Exit distressed credits efficiently** — either returning to standard portfolio management or realising security

Banks with large restructuring books face significant regulatory scrutiny. The ECB's and PRA's guidance on NPE (Non-Performing Exposure) management requires banks to have active plans to reduce NPE ratios, either through restructuring to performing status, write-off, or disposal.

## 2. Accounting Concepts

**IFRS 9 forbearance classification.** A forbearance measure is a concession granted to a borrower experiencing, or about to experience, financial difficulty. Forbearance measures include:
- Covenant waivers
- Interest payment deferrals
- Principal repayment deferrals
- Maturity extensions
- Interest rate reductions
- Debt-for-equity swaps (at below fair value)
- Write-off of a portion of principal

A facility subject to forbearance must be classified as:
- **Stage 2** if the borrower is experiencing SICR but not yet credit-impaired
- **Stage 3** if the borrower is credit-impaired (defaulted under IFRS 9)

**IFRS 9 default definition.** Under IFRS 9, a financial asset is credit-impaired when one or more events that have a detrimental impact on estimated future cash flows have occurred. The IFRS 9 default definition aligns with the Basel "unlikely to pay" (UTP) standard. A restructuring event typically meets the UTP criterion because the bank would not have restructured if the borrower were able to repay on the original terms.

**Specific provision calculation.** For Stage 3 (credit-impaired) forborne exposures, the provision is calculated individually:
- Gross carrying amount minus PV of estimated future cash flows, discounted at the original EIR
- For secured lending, the future cash flow estimate is driven by the expected realisation value of security, net of costs and discounted for the expected time to realisation
- If the borrower has a rehabilitation plan, future cash flows under the plan must be probability-weighted against the liquidation scenario

**Effective Interest Rate (EIR) modification.** When a loan is restructured (maturity extended, interest rate changed), IFRS 9 requires an assessment of whether the modification is substantial. If substantial, the old loan is derecognised and a new loan is recognised at fair value. If not substantial, the modification is accounted for by adjusting the carrying amount and recognising a modification gain or loss.

**Derecognition vs modification.** IFRS 9 paragraph 3.2.3 requires derecognition when the contractual cash flows are modified such that the modification meets the "substantially different" test (10% NPV test or qualitative change in key terms). A debt-for-equity swap is generally derecognising as the contractual right to cash flows is extinguished.

**Equity instrument accounting.** In a debt-for-equity swap, the bank acquires equity. The equity is initially recognised at fair value (typically the fair value of the equity received, or the fair value of the debt forgiven if more reliable). The difference between the carrying amount of the loan and the fair value of the equity is recognised as a credit loss.

**Tax implications of debt forgiveness.** When a bank forgives debt, the borrower may have a taxable gain (debt-for-nothing income). In the UK, the Corporate Insolvency and Governance Act 2020 and the Loan Relationships rules (CTA 2009, Part 5) govern the tax treatment. Banks must be aware of the tax implications for borrowers in restructuring negotiations, as an unexpected tax liability can undermine the viability plan.

## 3. Financial Concepts

**Viability assessment.** The central financial question in restructuring is whether the business generates sufficient sustainable cash flow to service a restructured debt load. Key metrics:
- Normalised EBITDA (stripped of exceptional items and management adjustments)
- Sustainable free cash flow (EBITDA minus maintenance capex minus working capital movements minus taxes)
- Maximum sustainable debt: typically 3-5x normalised EBITDA depending on sector
- Time to repay restructured debt: sustainable cash flow should repay restructured debt within a reasonable period

**Independent Business Review (IBR).** An IBR is commissioned by the bank and conducted by a specialist firm (Big 4 Financial Advisory, Alvarez & Marsal, FTI Consulting, Kroll). The IBR provides:
- An independent assessment of the business's viability
- Normalised EBITDA (stripping management adjustments)
- 13-week cash flow forecast
- Assessment of the business's competitive position
- Identification of restructuring options
- Recovery analysis under various scenarios

The IBR is the bank's primary tool for independent validation of management's plan.

**Debt capacity analysis.** Given normalised EBITDA and a sustainable leverage ratio, what is the maximum quantum of debt the business can carry?
- Maximum Debt = Sustainable EBITDA × Appropriate Leverage Multiple
- If existing debt > Maximum Debt → some debt must be written down, converted to equity, or the business sold

**Waterfall analysis.** In restructuring, the bank must understand where it sits in the capital structure waterfall:
1. Fixed charge security (specific assets, property, specific receivables)
2. Floating charge (all assets not subject to fixed charge)
3. Preferential creditors (HMRC arrears of up to 1 year under new rules; employee wages)
4. Prescribed part (a portion of floating charge proceeds set aside for unsecured creditors)
5. Unsecured creditors
6. Equity holders

The bank as a secured lender receives priority over unsecured creditors but must still understand the value of its security relative to the outstanding loan.

**Recovery rate modelling.** In the restructuring decision, the bank compares:
- Expected NPV of restructuring (discounted cash flows under the business plan, adjusted for probability of plan success)
- Expected NPV of recovery (realisable value of security, net of costs and time, under immediate enforcement)

If restructuring NPV > recovery NPV, restructuring is commercially rational. If recovery NPV > restructuring NPV, enforcement action is better for the bank.

**Enterprise Value analysis.** For larger restructurings, the bank may commission an enterprise value opinion. This provides:
- Trading EV (DCF-based valuation of the business as a going concern)
- Distressed/forced sale EV (what a buyer would pay in a quick sale)
- Liquidation value (asset-by-asset break-up value)
- Recovery multiple for the bank under each scenario

## 4. Statistical Concepts

**LGD in restructuring.** The modelled LGD used in IFRS 9 provisioning is a through-the-cycle estimate. In a specific restructuring case, the bank must form its own best estimate of recovery, which is the specific provision input:
- Base case recovery scenario (restructuring succeeds, business repays over 5 years)
- Downside scenario (restructuring fails after 2 years, recovery action initiated)
- Severe downside (immediate enforcement today)
- Probability-weighted average of all scenarios = expected recovery

**Probability of Plan Success.** Quantifying the probability that a business's restructuring plan will succeed is inherently judgmental. Historical data on restructuring outcomes (from the bank's own portfolio and industry studies) can inform this. Studies suggest UK restructuring success rates of approximately 60-70% when an IBR is conducted and equity is injected; lower when restructuring is purely based on covenant waivers and maturity extension.

**Scenario analysis.** The specific provision calculation requires a range of scenarios. The bank should use at least 3 scenarios:
1. Base case (most likely): business plan is achieved
2. Downside: EBITDA underperforms plan by 20-30%
3. Severe downside / liquidation: enforcement scenario

Each scenario has an estimated probability of occurrence and an estimated recovery amount. The provision = gross carrying amount minus expected recovery across all scenarios.

**Vintage default curve.** Banks track the proportion of restructured exposures that subsequently default (re-default). For an IBR-backed restructuring, re-default rates of 30-40% over 5 years are typical. Without equity injection, re-default rates may reach 60%. These statistics inform the probability weights in the scenario analysis.

**Time value of money in recovery analysis.** Recovery proceeds received in Year 5 are worth less than those received in Year 1. The discount rate applied is the original EIR. A £10m recovery in Year 5, discounted at 5% EIR, has a present value of £7.8m. This is why early restructuring action (preserving value) is significantly better than delayed recovery action.

## 5. Regulatory Framework

**EBA Non-Performing Loans Guidelines (EBA/GL/2018/06).** Comprehensively covers restructuring, forbearance, and NPE management:
- Forbearance identification criteria (Section 3)
- Probation period requirements — 12-month performing probation before de-classification from forborne
- NPE exit criteria — specific conditions for reclassification from NPE to performing
- NPE reduction strategies — disposal, restructuring, write-off
- Governance of NPE portfolios — NPE committees, escalation, monitoring

**EBA NPE Guidance (EBA/GL/2018/06) — Forbearance Definition:**
A measure is a forbearance measure if:
(a) the borrower is experiencing, or about to experience, financial difficulties in meeting its financial commitments
(b) the concession would not have been granted if the borrower were not experiencing financial difficulties

**IFRS 9 — Modification Accounting (Paragraphs 5.4.3 and B5.4.6).** When a modification occurs that does not result in derecognition, the bank recalculates the gross carrying amount by discounting the modified cash flows at the original EIR and recognises a modification gain or loss in P&L.

**Capital Requirements Regulation (CRR2) — NPE treatment.** From 2019 (CRR2, Article 469a), banks are required to deduct NPE exposures against regulatory capital when provisions fall below minimum NPE coverage ratios. This creates a direct regulatory capital incentive to provision adequate forborne exposures and to reduce NPE stocks.

**UK Restructuring Plan (Part 26A Companies Act 2006, as inserted by CIGA 2020).** The Restructuring Plan allows a company to propose a restructuring plan to its creditors. Unlike a Scheme of Arrangement, a Restructuring Plan can be "crammed down" on dissenting classes if the court is satisfied that the dissenting class would be no worse off under the plan than under the next best alternative (typically administration/liquidation). Banks must understand this tool both as potential participants (when a borrower uses it) and as a potential creditor enforcement mechanism.

**Insolvency Act 1986.** Governs Administration, Liquidation, and Administrative Receivership. Banks with qualifying floating charges can appoint an Administrator. The Administrator has powers to manage and sell the business. The bank must understand its rights and obligations as the appointing floating charge holder.

## 6. Data Required

**From the borrower:**
- Monthly management accounts (P&L, balance sheet, cash flow) for last 24 months
- 13-week cash flow forecast (the cash runway is the most critical piece of information)
- Business plan for next 3-5 years, with detailed financial model
- Debtor ledger (aged, to assess quality of receivables as security)
- Creditor ledger (aged, to identify critical supplier relationships)
- Fixed asset register (for security valuation)
- Employee headcount and payroll (TUPE implications in any disposal)
- Details of all other financial creditors (banks, bondholders, trade creditors, HMRC)
- Details of all litigation and contingent liabilities
- All security documentation: charges, mortgages, guarantees
- Details of any inter-company loans or related party transactions

**From the bank's internal systems:**
- Current exposure: drawn balance, undrawn commitment, hedging marks-to-market, accrued interest
- Security details: what is registered, valuation date and amount
- Facility agreement, all amendments, and waivers
- Risk rating history
- IFRS 9 stage and current provision
- Covenant history including all breaches

**From advisers:**
- IBR report (from the bank's appointed financial adviser)
- Security valuation reports (new RICS valuation if property-secured)
- Legal opinions on security enforceability
- Insolvency practitioner's preliminary assessment (if administration being considered)
- Tax adviser's view on restructuring tax implications

**From the market/external:**
- Comparable transaction multiples (for enterprise value benchmarking)
- Industry analyst reports on sector outlook
- Competitor performance (to assess whether the company's problems are idiosyncratic or sector-wide)

## 7. How Analysts Actually Work

**Transfer to Restructuring.** When a credit is transferred from the standard portfolio to the Restructuring team, a formal handover process occurs:
1. Credit officer certifies that the transfer criteria are met (typically: covenant breach, missed payment, or DSCR < 1.0x for 2+ consecutive quarters)
2. Restructuring officer takes over as lead credit officer
3. RM relationship may be maintained for day-to-day client contact, but all credit decisions require Restructuring sign-off
4. IFRS 9 stage is reviewed: should be Stage 2 at minimum, Stage 3 if default has occurred

**Initial Triage.** On transfer, the Restructuring team performs a rapid triage:
- What is the current cash position and 13-week runway?
- What are the key value drivers (EBITDA, customers, IP, property)?
- What is the bank's security and its estimated value?
- Who are the other creditors and what are their positions?
- Is there management appetite and capacity to execute a restructuring plan?
- What are the viable restructuring options?

**Commissioning the IBR.** If the exposure warrants it (typically > £5m), the bank commissions an IBR. The bank selects the adviser, which is often agreed with the borrower (to maintain confidentiality and cooperation). The IBR typically takes 4-6 weeks and costs £150,000-£500,000 (paid by the borrower as a restructuring cost).

**Restructuring options appraisal.** The Restructuring team, guided by the IBR, considers:
1. **Do nothing:** withdraw support and allow the borrower to seek alternative financing (rarely practical at this stage)
2. **Waiver and enhanced monitoring:** if the issue is likely temporary
3. **Covenant reset:** amend covenant thresholds to reflect realistic near-term performance
4. **Maturity extension:** extend the loan term to reduce annual debt service
5. **Principal holiday:** suspend principal repayments for 12-24 months
6. **Equity injection requirement:** require shareholders to invest additional equity to reduce debt
7. **Asset disposal:** require the borrower to sell non-core assets to reduce debt
8. **Margin increase:** increase the interest margin to compensate for increased risk
9. **Debt-for-equity swap:** convert a portion of debt to equity, giving the bank a stake in the business
10. **Sell the loan:** sell the NPE loan to a specialist distressed debt buyer (Oaktree, Cerberus, etc.) in the secondary market
11. **Enforcement:** appoint Administrator/Receiver and realise security

**Restructuring negotiations.** The restructuring process involves parallel negotiations with:
- The borrower and its management team
- The borrower's financial advisers
- The borrower's equity/shareholders (who may need to inject capital)
- Other lenders in the syndicate (if syndicated)
- Other creditors (trade creditors, bondholders, HMRC)

The bank's legal team is involved throughout.

**Restructuring agreement.** When agreed, the restructuring is documented in:
- An amended and restated facility agreement (or supplemental agreement)
- A waiver and consent letter
- New security documentation (if additional security is required)
- Side letter for any informal commitments

## 8. Excel Implementation

```excel
=== SHEET: Restructuring_Summary ===

BORROWER INFORMATION:
Customer Name: [input]
Sector: [input]
Date of Transfer to Restructuring: [input]
Restructuring Officer: [input]
IBR Adviser: [input]
IBR Completion Date: [input]

EXPOSURE SUMMARY:
                              Amount (£m)
Term Loan A drawn:            [input]
RCF drawn:                    [input]
Accrued interest:             [input]
Swap mark-to-market:          [input]
Total Gross Exposure:         =SUM(above)
Security Value (latest):      [input]
Net Exposure (unsecured):     =Gross - Security
                              [minimum 0]
Current IFRS 9 Stage:         [dropdown: 1/2/3]
Current Provision:            [input]
Provision Coverage %:         =Provision/Gross_Exposure*100

=== SHEET: Scenario_Analysis ===

Row structure for 3 scenarios:

SCENARIO 1: SUCCESSFUL RESTRUCTURING (Base Case)
  Probability: 45%
  EBITDA (normalised): £5.2m
  Debt repaid over: 5 years
  Recovery amount (undiscounted): £15.0m
  Recovery timeline (years): 5
  Discount rate (original EIR): 4.50%
  Recovery PV: =B_Recovery / (1+B_EIR)^B_Years
    =15.0 / (1.045)^5 = £12.1m

SCENARIO 2: PARTIAL RESTRUCTURING FAILURE (Downside)
  Probability: 35%
  Restructuring runs 2 years then collapses
  Recovery via Administration
  Recovery amount (gross): £9.5m
  Admin costs: £0.8m
  Net recovery: £8.7m
  Recovery timeline (years): 3
  Recovery PV: =8.7 / (1.045)^3 = £7.7m

SCENARIO 3: IMMEDIATE ENFORCEMENT (Severe Downside)
  Probability: 20%
  Recovery via forced sale of security
  Gross security value: £11.0m
  Less: receiver costs (10%): £1.1m
  Less: preferential creditors: £0.3m
  Net recovery: £9.6m
  Recovery timeline (years): 1.5
  Recovery PV: =9.6 / (1.045)^1.5 = £9.0m

EXPECTED RECOVERY (Probability-Weighted PV):
  =SUM(prob × PV recovery for each scenario)
  =(0.45×12.1) + (0.35×7.7) + (0.20×9.0)
  =£9.97m

GROSS CARRYING AMOUNT: £18.5m

REQUIRED PROVISION: =Gross - Expected_Recovery
  =18.5 - 9.97 = £8.53m

CURRENT PROVISION: £3.20m

ADDITIONAL PROVISION REQUIRED: =Required - Current
  =8.53 - 3.20 = £5.33m

=== SHEET: Viability_Assessment ===

NORMALISED EBITDA:
  Statutory EBITDA (last 12 months):      £6.8m
  Less: Non-recurring income (gain on disposal): (£1.5m)
  Add: Non-recurring costs (restructuring):  £0.3m
  IBR-adjusted EBITDA:                    £5.6m
  Management upside adj. (not agreed):    £0.8m
  Bank's view of normalised EBITDA:       £5.6m

DEBT CAPACITY:
  Sector: Manufacturing
  Appropriate leverage multiple: 2.5x
  Maximum sustainable debt: =5.6 × 2.5 = £14.0m
  Current total debt: £18.5m
  Debt in excess of capacity: £4.5m
  Implication: £4.5m must be restructured (equity or write-down)

FREE CASH FLOW (for debt service):
  EBITDA (normalised): £5.6m
  Less: Maintenance Capex: (£0.8m)
  Less: Working Capital Movement: (£0.3m)
  Less: Tax (effective rate 20%): (£0.9m)
  Free Cash Flow: £3.6m

DEBT SERVICE CAPACITY:
  At restructured debt of £14.0m, 5yr term:
  Annual principal repayment: =14.0/5 = £2.8m
  Annual interest (5% on average balance): £0.7m
  Total Annual Debt Service: £3.5m
  DSCR post-restructuring: =3.6/3.5 = 1.03x
  Comment: DSCR marginal — equity injection needed

=== SHEET: 13_Week_Cash_Flow ===

Columns: Week 1 through Week 13
Rows:
  Opening Cash Balance
  Add: Customer Receipts
  Add: Other Income
  Less: Wages and Salaries
  Less: Trade Creditor Payments
  Less: HMRC (VAT, PAYE, Corporation Tax)
  Less: Rent and Utilities
  Less: Debt Service (interest only)
  Less: Other Operating
  Net Cash Movement
  Closing Cash Balance

  Minimum Weekly Balance (alert level):
  =IF(Closing_Balance < 100000, "CRITICAL", IF(Closing_Balance < 500000, "LOW", "OK"))

  Cumulative Cash Flow Chart: Line chart of closing cash balance over 13 weeks
```

## 9. SQL Implementation

```sql
-- ============================================================
-- M46: Restructuring SQL Queries
-- ============================================================

-- ------------------------------------------------------------
-- Query 1: Restructuring Portfolio Overview
-- All active restructuring cases with key metrics
-- ------------------------------------------------------------
SELECT
    f.facility_reference,
    c.customer_name,
    c.sector_code,
    r.restructuring_start_date,
    r.restructuring_officer,
    r.ibr_adviser,
    r.restructuring_type,
    r.restructuring_status,
    -- Exposure
    f.drawn_balance,
    f.accrued_interest,
    ISNULL(f.swap_mtm, 0) AS swap_mtm,
    f.drawn_balance + f.accrued_interest + ISNULL(f.swap_mtm, 0) AS total_exposure,
    -- Security
    sec.security_value_current,
    sec.security_value_date,
    f.drawn_balance - ISNULL(sec.security_value_current, 0) AS unsecured_exposure,
    -- Provision
    s.ifrs9_stage,
    s.ecl_provision,
    ROUND(s.ecl_provision / NULLIF(f.drawn_balance, 0) * 100, 1) AS provision_coverage_pct,
    -- Recovery scenarios
    sc.expected_recovery_pv,
    ROUND((f.drawn_balance - sc.expected_recovery_pv) / NULLIF(f.drawn_balance, 0) * 100, 1) AS implied_lgd_pct,
    r.next_review_date,
    DATEDIFF(DAY, r.restructuring_start_date, GETDATE()) AS days_in_restructuring
FROM RestructuringCases r
JOIN Facilities f ON r.facility_id = f.facility_id
JOIN Customers c ON f.customer_id = c.customer_id
JOIN IFRS9Staging s ON f.facility_id = s.facility_id
    AND s.staging_date = EOMONTH(GETDATE(), -1)
LEFT JOIN (
    SELECT facility_id, SUM(current_value) AS security_value_current,
           MAX(valuation_date) AS security_value_date
    FROM SecurityRegister
    WHERE is_active = 1
    GROUP BY facility_id
) sec ON f.facility_id = sec.facility_id
LEFT JOIN (
    SELECT facility_id,
           SUM(probability * recovery_pv) AS expected_recovery_pv
    FROM RecoveryScenarios
    WHERE is_current = 1
    GROUP BY facility_id
) sc ON f.facility_id = sc.facility_id
WHERE r.restructuring_status IN ('ACTIVE', 'UNDER_NEGOTIATION')
ORDER BY total_exposure DESC;


-- ------------------------------------------------------------
-- Query 2: Recovery Scenario Analysis — Provision Adequacy
-- Compares scenario-based expected recovery to current provision
-- ------------------------------------------------------------
WITH ScenarioSummary AS (
    SELECT
        facility_id,
        SUM(CASE WHEN scenario_name = 'BASE' THEN probability END) AS base_prob,
        SUM(CASE WHEN scenario_name = 'BASE' THEN recovery_pv END) AS base_recovery,
        SUM(CASE WHEN scenario_name = 'DOWNSIDE' THEN probability END) AS down_prob,
        SUM(CASE WHEN scenario_name = 'DOWNSIDE' THEN recovery_pv END) AS down_recovery,
        SUM(CASE WHEN scenario_name = 'LIQUIDATION' THEN probability END) AS liq_prob,
        SUM(CASE WHEN scenario_name = 'LIQUIDATION' THEN recovery_pv END) AS liq_recovery,
        SUM(probability * recovery_pv) AS weighted_avg_recovery
    FROM RecoveryScenarios
    WHERE is_current = 1
    GROUP BY facility_id
)
SELECT
    f.facility_reference,
    c.customer_name,
    f.drawn_balance AS gross_carrying_amount,
    ss.weighted_avg_recovery AS expected_recovery_pv,
    f.drawn_balance - ss.weighted_avg_recovery AS required_provision,
    s.ecl_provision AS current_provision,
    (f.drawn_balance - ss.weighted_avg_recovery) - s.ecl_provision AS provision_gap,
    -- Positive gap = underprovision; negative = overprovision
    CASE
        WHEN ((f.drawn_balance - ss.weighted_avg_recovery) - s.ecl_provision) > 0
        THEN 'UNDERPROVISION'
        ELSE 'ADEQUATE'
    END AS provision_status,
    -- Scenario details
    ss.base_prob, ss.base_recovery,
    ss.down_prob, ss.down_recovery,
    ss.liq_prob, ss.liq_recovery
FROM ScenarioSummary ss
JOIN Facilities f ON ss.facility_id = f.facility_id
JOIN Customers c ON f.customer_id = c.customer_id
JOIN IFRS9Staging s ON ss.facility_id = s.facility_id
    AND s.staging_date = EOMONTH(GETDATE(), -1)
ORDER BY provision_gap DESC;  -- largest underprovision first


-- ------------------------------------------------------------
-- Query 3: Forbearance Register
-- All active forborne exposures with IFRS 9 staging and probation
-- ------------------------------------------------------------
SELECT
    f.facility_reference,
    c.customer_name,
    fb.forbearance_start_date,
    fb.forbearance_type,
    fb.forbearance_end_date,
    CASE
        WHEN fb.forbearance_end_date IS NULL THEN 'ONGOING'
        WHEN fb.forbearance_end_date > GETDATE() THEN 'ACTIVE'
        WHEN DATEDIFF(MONTH, fb.forbearance_end_date, GETDATE()) < 12 THEN 'PROBATION'
        ELSE 'CONCLUDED'
    END AS forbearance_status,
    -- Probation end date (12 months after forbearance ends)
    CASE
        WHEN fb.forbearance_end_date IS NOT NULL
        THEN DATEADD(MONTH, 12, fb.forbearance_end_date)
        ELSE NULL
    END AS probation_end_date,
    s.ifrs9_stage,
    s.ecl_provision,
    f.drawn_balance,
    ROUND(s.ecl_provision / NULLIF(f.drawn_balance, 0) * 100, 1) AS coverage_pct,
    -- Flag if Stage 1 classification during forbearance (regulatory breach)
    CASE
        WHEN s.ifrs9_stage = 1 AND (
            fb.forbearance_end_date IS NULL OR
            fb.forbearance_end_date > GETDATE() OR
            DATEDIFF(MONTH, fb.forbearance_end_date, GETDATE()) < 12
        )
        THEN 'ERROR: Stage 1 during forbearance'
        ELSE 'OK'
    END AS staging_check
FROM ForbearanceMeasures fb
JOIN Facilities f ON fb.facility_id = f.facility_id
JOIN Customers c ON f.customer_id = c.customer_id
JOIN IFRS9Staging s ON fb.facility_id = s.facility_id
    AND s.staging_date = EOMONTH(GETDATE(), -1)
WHERE fb.is_active = 1
    OR (fb.forbearance_end_date IS NOT NULL
        AND DATEDIFF(MONTH, fb.forbearance_end_date, GETDATE()) < 12)
ORDER BY fb.forbearance_start_date ASC;


-- ------------------------------------------------------------
-- Query 4: Restructuring Outcomes — Historical Performance
-- Tracks post-restructuring performance for completed cases
-- ------------------------------------------------------------
SELECT
    r.restructuring_type,
    r.sector_code,
    COUNT(*) AS total_cases,
    SUM(CASE WHEN r.outcome = 'SUCCESS' THEN 1 ELSE 0 END) AS success_count,
    SUM(CASE WHEN r.outcome = 'RE_DEFAULT' THEN 1 ELSE 0 END) AS re_default_count,
    SUM(CASE WHEN r.outcome = 'WRITE_OFF' THEN 1 ELSE 0 END) AS write_off_count,
    ROUND(100.0 * SUM(CASE WHEN r.outcome = 'SUCCESS' THEN 1 ELSE 0 END)
          / COUNT(*), 1) AS success_rate_pct,
    AVG(r.realised_lgd_pct) AS avg_realised_lgd_pct,
    AVG(DATEDIFF(MONTH, r.restructuring_start_date, r.close_date))
        AS avg_duration_months,
    AVG(r.ibr_cost) AS avg_ibr_cost
FROM CompletedRestructurings r
WHERE r.close_date >= DATEADD(YEAR, -5, GETDATE())
GROUP BY r.restructuring_type, r.sector_code
ORDER BY total_cases DESC;


-- ------------------------------------------------------------
-- Query 5: Update provision after restructuring scenario review
-- ------------------------------------------------------------
DECLARE @facility_id INT = 12345;
DECLARE @new_provision DECIMAL(18,2) = 8530000.00;
DECLARE @provision_reason NVARCHAR(500) =
    'Restructuring scenario analysis: base 45%, downside 35%, liquidation 20%';
DECLARE @stage INT = 3;

BEGIN TRANSACTION;

-- Update staging
UPDATE IFRS9Staging
SET ifrs9_stage = @stage,
    ecl_provision = @new_provision,
    provision_reason = @provision_reason,
    last_updated = GETDATE(),
    last_updated_by = SYSTEM_USER
WHERE facility_id = @facility_id
    AND staging_date = EOMONTH(GETDATE(), -1);

-- Log the provision change
INSERT INTO ProvisionHistory (
    facility_id, change_date, old_provision, new_provision,
    change_reason, changed_by
)
SELECT
    @facility_id,
    GETDATE(),
    ecl_provision AS old_provision,
    @new_provision,
    @provision_reason,
    SYSTEM_USER
FROM IFRS9Staging
WHERE facility_id = @facility_id
    AND staging_date = EOMONTH(GETDATE(), -2);

COMMIT TRANSACTION;
```

## 10. Python Implementation

```python
"""
M46: Restructuring — Python Implementation
Covers: viability assessment, scenario analysis, provision calculation,
restructuring option comparison, IFRS 9 modification accounting
"""

import pandas as pd
import numpy as np
from dataclasses import dataclass, field
from typing import List, Optional, Dict
from datetime import date
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches


# ============================================================
# 1. VIABILITY ASSESSMENT
# ============================================================

@dataclass
class NormalisedEBITDA:
    """
    Calculates the bank's view of normalised EBITDA,
    independent of management's proposed adjustments.
    """
    statutory_ebitda: float
    management_add_backs: Dict[str, float] = field(default_factory=dict)
    bank_accepted_add_backs: Dict[str, float] = field(default_factory=dict)
    bank_deductions: Dict[str, float] = field(default_factory=dict)
    ibr_adjustments: Dict[str, float] = field(default_factory=dict)

    @property
    def management_adjusted_ebitda(self) -> float:
        return self.statutory_ebitda + sum(self.management_add_backs.values())

    @property
    def bank_normalised_ebitda(self) -> float:
        return (
            self.statutory_ebitda
            + sum(self.bank_accepted_add_backs.values())
            - sum(self.bank_deductions.values())
            + sum(self.ibr_adjustments.values())
        )

    @property
    def management_overstatement(self) -> float:
        return self.management_adjusted_ebitda - self.bank_normalised_ebitda

    def summary(self) -> dict:
        return {
            'statutory_ebitda': self.statutory_ebitda,
            'management_adjusted_ebitda': self.management_adjusted_ebitda,
            'bank_normalised_ebitda': self.bank_normalised_ebitda,
            'management_overstatement': self.management_overstatement,
            'overstatement_pct': (
                self.management_overstatement /
                self.management_adjusted_ebitda * 100
                if self.management_adjusted_ebitda != 0 else 0
            )
        }


@dataclass
class DebtCapacityModel:
    """
    Models the maximum sustainable debt load for a borrower.
    """
    normalised_ebitda: float
    maintenance_capex: float
    working_capital_change: float
    tax_rate: float
    existing_total_debt: float
    sector_leverage_multiple: float  # typical: 2.0x (cyclical) to 4.5x (stable)
    loan_tenor_years: int = 5
    interest_rate: float = 0.05

    @property
    def free_cash_flow(self) -> float:
        """Free cash flow available for debt service."""
        ebit = self.normalised_ebitda - self.maintenance_capex
        tax = ebit * self.tax_rate
        return (
            self.normalised_ebitda
            - self.maintenance_capex
            - self.working_capital_change
            - tax
        )

    @property
    def max_sustainable_debt(self) -> float:
        return self.normalised_ebitda * self.sector_leverage_multiple

    @property
    def debt_in_excess_of_capacity(self) -> float:
        return max(0, self.existing_total_debt - self.max_sustainable_debt)

    @property
    def annual_principal_at_max_debt(self) -> float:
        return self.max_sustainable_debt / self.loan_tenor_years

    @property
    def average_interest_at_max_debt(self) -> float:
        return self.max_sustainable_debt * 0.5 * self.interest_rate

    @property
    def annual_debt_service_at_max_debt(self) -> float:
        return self.annual_principal_at_max_debt + self.average_interest_at_max_debt

    @property
    def dscr_post_restructuring(self) -> float:
        if self.annual_debt_service_at_max_debt == 0:
            return float('inf')
        return self.free_cash_flow / self.annual_debt_service_at_max_debt

    def report(self) -> str:
        lines = [
            "=== DEBT CAPACITY ANALYSIS ===",
            f"Normalised EBITDA:          £{self.normalised_ebitda:,.1f}m",
            f"Free Cash Flow:             £{self.free_cash_flow:,.1f}m",
            f"Sector Leverage Multiple:   {self.sector_leverage_multiple:.1f}x",
            f"Max Sustainable Debt:       £{self.max_sustainable_debt:,.1f}m",
            f"Existing Total Debt:        £{self.existing_total_debt:,.1f}m",
            f"Debt to Restructure/Write:  £{self.debt_in_excess_of_capacity:,.1f}m",
            f"Post-Restructuring DSCR:    {self.dscr_post_restructuring:.2f}x",
            f"Viability:                  "
            f"{'VIABLE' if self.dscr_post_restructuring >= 1.15 else 'MARGINAL' if self.dscr_post_restructuring >= 1.05 else 'NOT VIABLE'}"
        ]
        return "\n".join(lines)


# ============================================================
# 2. RECOVERY SCENARIO ANALYSIS
# ============================================================

@dataclass
class RecoveryScenario:
    name: str
    probability: float  # must sum to 1.0 across all scenarios
    gross_recovery: float
    recovery_costs: float
    preferential_creditors: float
    years_to_recovery: float
    discount_rate: float  # original EIR

    @property
    def net_recovery(self) -> float:
        return max(0, self.gross_recovery - self.recovery_costs
                   - self.preferential_creditors)

    @property
    def recovery_pv(self) -> float:
        """Present value of net recovery, discounted at original EIR."""
        return self.net_recovery / ((1 + self.discount_rate) ** self.years_to_recovery)

    @property
    def probability_weighted_pv(self) -> float:
        return self.probability * self.recovery_pv


class ProvisionCalculator:
    """
    Calculates IFRS 9 specific provision for Stage 3 exposures.
    """

    def __init__(
        self,
        gross_carrying_amount: float,
        original_eir: float,
        scenarios: List[RecoveryScenario]
    ):
        self.gross_carrying_amount = gross_carrying_amount
        self.original_eir = original_eir
        self.scenarios = scenarios
        self._validate_scenarios()

    def _validate_scenarios(self):
        total_prob = sum(s.probability for s in self.scenarios)
        if abs(total_prob - 1.0) > 0.001:
            raise ValueError(
                f"Scenario probabilities must sum to 1.0. "
                f"Current sum: {total_prob:.3f}"
            )

    @property
    def expected_recovery_pv(self) -> float:
        return sum(s.probability_weighted_pv for s in self.scenarios)

    @property
    def required_provision(self) -> float:
        return max(0, self.gross_carrying_amount - self.expected_recovery_pv)

    @property
    def provision_coverage_pct(self) -> float:
        return self.required_provision / self.gross_carrying_amount * 100

    @property
    def implied_lgd_pct(self) -> float:
        return (1 - self.expected_recovery_pv / self.gross_carrying_amount) * 100

    def sensitivity_analysis(
        self,
        prob_adjustment: float = 0.10
    ) -> pd.DataFrame:
        """
        Sensitivity: what happens if we shift 10% probability
        from base case to liquidation scenario?
        """
        results = []
        base_case = self.scenarios[0]
        worst_case = self.scenarios[-1]

        for shift in [-0.20, -0.10, 0.0, 0.10, 0.20]:
            modified = [
                RecoveryScenario(
                    name=s.name,
                    probability=max(0, s.probability +
                                   (shift if s == worst_case else
                                    -shift if s == base_case else 0)),
                    gross_recovery=s.gross_recovery,
                    recovery_costs=s.recovery_costs,
                    preferential_creditors=s.preferential_creditors,
                    years_to_recovery=s.years_to_recovery,
                    discount_rate=s.discount_rate
                )
                for s in self.scenarios
            ]
            calc = ProvisionCalculator(
                self.gross_carrying_amount, self.original_eir, modified
            )
            results.append({
                'prob_shift': shift,
                'base_prob': modified[0].probability,
                'worst_prob': modified[-1].probability,
                'expected_recovery': calc.expected_recovery_pv,
                'required_provision': calc.required_provision,
                'coverage_pct': calc.provision_coverage_pct
            })
        return pd.DataFrame(results)

    def report(self) -> str:
        lines = [
            "=== IFRS 9 SPECIFIC PROVISION — SCENARIO ANALYSIS ===",
            f"Gross Carrying Amount:  £{self.gross_carrying_amount:,.1f}m",
            f"Original EIR:           {self.original_eir:.2%}",
            ""
        ]
        lines.append(f"{'Scenario':<20} {'Prob':>6} {'Net Rec':>10} "
                     f"{'PV':>10} {'Wtd PV':>10}")
        lines.append("-" * 60)
        for s in self.scenarios:
            lines.append(
                f"{s.name:<20} {s.probability:>5.0%}  "
                f"£{s.net_recovery:>8.1f}m  "
                f"£{s.recovery_pv:>8.1f}m  "
                f"£{s.probability_weighted_pv:>8.1f}m"
            )
        lines.append("-" * 60)
        lines.append(
            f"{'Expected Recovery PV':<20}       "
            f"{'':>10} {'':>10} £{self.expected_recovery_pv:>8.1f}m"
        )
        lines.append("")
        lines.append(
            f"Required Provision:    £{self.required_provision:,.1f}m"
        )
        lines.append(
            f"Provision Coverage:    {self.provision_coverage_pct:.1f}%"
        )
        lines.append(
            f"Implied LGD:           {self.implied_lgd_pct:.1f}%"
        )
        return "\n".join(lines)


# ============================================================
# 3. RESTRUCTURING OPTIONS COMPARISON
# ============================================================

def compare_restructuring_options(
    gross_carrying_amount: float,
    scenarios_by_option: Dict[str, List[RecoveryScenario]],
    original_eir: float,
    current_provision: float
) -> pd.DataFrame:
    """
    Compare expected recovery PV across restructuring options.
    """
    results = []
    for option_name, scenarios in scenarios_by_option.items():
        calc = ProvisionCalculator(
            gross_carrying_amount, original_eir, scenarios
        )
        results.append({
            'option': option_name,
            'expected_recovery_pv': calc.expected_recovery_pv,
            'required_provision': calc.required_provision,
            'provision_vs_current': calc.required_provision - current_provision,
            'coverage_pct': calc.provision_coverage_pct,
            'implied_lgd_pct': calc.implied_lgd_pct,
            'net_gain_vs_enforcement': (
                calc.expected_recovery_pv -
                scenarios_by_option.get(
                    'IMMEDIATE_ENFORCEMENT',
                    [RecoveryScenario('',1,0,0,0,0,original_eir)]
                )[0].recovery_pv
            ) if option_name != 'IMMEDIATE_ENFORCEMENT' else 0.0
        })

    df = pd.DataFrame(results)
    df = df.sort_values('expected_recovery_pv', ascending=False)
    print("\nRESTRUCTURING OPTIONS COMPARISON:")
    print(df.to_string(index=False))
    return df


# ============================================================
# 4. IFRS 9 MODIFICATION ANALYSIS
# ============================================================

def assess_modification(
    original_cashflows: List[tuple],  # (date, amount)
    modified_cashflows: List[tuple],  # (date, amount)
    original_eir: float,
    modification_date: date
) -> dict:
    """
    Assess whether loan modification is substantial under IFRS 9.
    Applies the 10% NPV test.

    Returns dict with: npv_original, npv_modified, discrepancy_pct,
                       is_substantial, modification_gain_loss
    """
    def pv_cashflows(cashflows, rate, base_date):
        total = 0
        for cf_date, amount in cashflows:
            days = (cf_date - base_date).days
            years = days / 365.25
            total += amount / ((1 + rate) ** years)
        return total

    npv_original = pv_cashflows(
        original_cashflows, original_eir, modification_date
    )
    npv_modified = pv_cashflows(
        modified_cashflows, original_eir, modification_date
    )
    discrepancy_pct = abs(npv_original - npv_modified) / abs(npv_original) * 100

    return {
        'npv_original_cashflows': npv_original,
        'npv_modified_cashflows': npv_modified,
        'discrepancy_pct': discrepancy_pct,
        'is_substantial': discrepancy_pct >= 10.0,
        'accounting_treatment': (
            'DERECOGNISE AND RECOGNISE NEW ASSET'
            if discrepancy_pct >= 10.0
            else 'RECORD MODIFICATION GAIN/LOSS'
        ),
        'modification_gain_loss': npv_modified - npv_original
        # Positive = gain (reduced obligation)
        # Negative = loss (increased obligation)
    }


# ============================================================
# 5. EXAMPLE USAGE
# ============================================================

if __name__ == '__main__':
    # --- Normalised EBITDA ---
    ebitda = NormalisedEBITDA(
        statutory_ebitda=6_800_000,
        management_add_backs={
            'restructuring_costs': 300_000,
            'management_incentive': 200_000,
            'synergies': 800_000  # bank does not accept this
        },
        bank_accepted_add_backs={
            'restructuring_costs': 300_000,
            'management_incentive': 200_000,
        },
        bank_deductions={
            'non_recurring_income': 1_500_000
        },
        ibr_adjustments={
            'ibr_ebitda_restatement': -200_000
        }
    )
    print(pd.Series(ebitda.summary()).to_string())

    # --- Debt Capacity ---
    capacity = DebtCapacityModel(
        normalised_ebitda=5_600_000,
        maintenance_capex=800_000,
        working_capital_change=300_000,
        tax_rate=0.20,
        existing_total_debt=18_500_000,
        sector_leverage_multiple=2.5,
        loan_tenor_years=5,
        interest_rate=0.05
    )
    print(capacity.report())

    # --- Provision Calculation ---
    scenarios = [
        RecoveryScenario(
            name='BASE_RESTRUCTURING', probability=0.45,
            gross_recovery=15_000_000, recovery_costs=0,
            preferential_creditors=0, years_to_recovery=5,
            discount_rate=0.045
        ),
        RecoveryScenario(
            name='DOWNSIDE', probability=0.35,
            gross_recovery=9_500_000, recovery_costs=800_000,
            preferential_creditors=300_000, years_to_recovery=3,
            discount_rate=0.045
        ),
        RecoveryScenario(
            name='LIQUIDATION', probability=0.20,
            gross_recovery=11_000_000, recovery_costs=1_100_000,
            preferential_creditors=300_000, years_to_recovery=1.5,
            discount_rate=0.045
        )
    ]
    calc = ProvisionCalculator(18_500_000, 0.045, scenarios)
    print(calc.report())
```

## 11. Interview Questions

**Q1: What is the difference between restructuring and recovery?**
A: Restructuring applies when the borrower has a viable business that can be rehabilitated with modified terms — the bank restructures the debt to give the business time to repair. Recovery applies when the borrower cannot repay and the business is not viable as a going concern — the bank enforces its security and realises assets to maximise recovery. The key judgment is viability: does the business generate sufficient sustainable free cash flow, with appropriate debt levels, to be commercially viable? An IBR provides an independent answer to this question.

**Q2: What is an Independent Business Review (IBR) and why does the bank commission it?**
A: An IBR is a report prepared by an independent financial adviser (typically a Big 4 firm or specialist advisory firm) that provides the bank's own assessment of the borrower's financial position, viability, and restructuring options. The bank commissions it (at the borrower's expense) because: (a) the bank cannot rely on management accounts prepared by management in a distressed situation; (b) the IBR provides a professional opinion that supports the bank's credit decision and protects the bank legally; (c) the IBR's 13-week cash flow forecast is the most reliable indicator of immediate liquidity; (d) the IBR's scenario analysis provides the basis for the IFRS 9 specific provision calculation.

**Q3: How does forbearance affect IFRS 9 staging?**
A: Any forbearance measure — however minor — requires classification as Stage 2 at minimum, and Stage 3 if the borrower is credit-impaired (defaulted). Under EBA/GL/2018/06, a forborne exposure remains classified as forborne for at least 12 months after the forbearance period ends and payments are normalised (the probation period). A bank cannot reclassify a forborne exposure to Stage 1 while the forbearance is ongoing. Failure to classify forborne exposures at Stage 2+ is one of the most common regulatory findings in NPE reviews.

**Q4: In a debt-for-equity swap, how does the bank account for the equity received?**
A: The bank derecognises the loan (or the portion converted to equity) and recognises the equity received at fair value. The difference between the carrying amount of the loan and the fair value of the equity represents a credit loss, which is recognised in P&L as an impairment charge. The equity is then classified as an equity investment under IFRS 9 (FVTOCI for strategic investments, FVTPL for non-strategic). The bank must disclose the nature and carrying amount of the equity investment. In practice, equity received in distressed debt-for-equity swaps is often valued at a significant discount to the par value of the converted debt.

**Q5: What is a 'cram-down' in the context of the UK Restructuring Plan?**
A: Under the UK Part 26A Restructuring Plan (introduced by CIGA 2020), a plan can be imposed on a dissenting class of creditors ("crammed down") if the court is satisfied that: (a) the dissenting class receives at least what they would receive in the next best alternative (typically administration/liquidation); (b) the plan has been approved by a class of creditors who would receive some payment under the plan. A cram-down allows a bank, as majority secured creditor, to force a restructuring on minority creditors (e.g., junior bondholders, trade creditors) even if they vote against it.

## 12. Common Mistakes

**Mistake 1: Accepting management's EBITDA without challenge.** Distressed management teams have strong incentives to overstate normalised EBITDA in restructuring negotiations. Common tactics: claiming synergies that have never materialised, adding back recurring costs as "non-recurring," including proforma EBITDA from acquisitions that are not performing. The bank must always perform its own normalised EBITDA calculation, ideally supported by an IBR.

**Mistake 2: Underestimating the time and cost of restructuring.** Restructurings take longer than expected and cost more than budgeted. Legal fees, IBR costs, advisory fees, and management time are all significant. A 12-month restructuring timeline can easily extend to 24 months. The provision should reflect an extended timeline and associated costs.

**Mistake 3: Failing to perfect security before a formal insolvency process.** If a security interest is not properly registered (e.g., at Companies House within 21 days) or is unenforceable, the bank loses its secured creditor status. In a restructuring situation, the bank's legal team must audit the security position immediately and take corrective action where necessary.

**Mistake 4: Delaying the forbearance classification.** Banks sometimes delay classifying a facility as forborne to avoid Stage 2/3 provisioning. This is a regulatory breach under IFRS 9 and EBA guidelines. The moment a forbearance measure is agreed, the classification must change.

**Mistake 5: Not distinguishing between company-specific and sector-wide distress.** A company in a distressed sector (e.g., department stores in 2020) may appear unviable based on recent financial performance, but the sector may recover. Conversely, a company in a strong sector with specific operational problems may appear viable based on sector comparables but may have idiosyncratic issues that make it unviable. The viability assessment must consider both dimensions.

## 13. Case Studies

**Case Study 1: Successful Debt-for-Equity Swap — Engineering Company**

A mid-market bank had a £22m term loan to a specialist engineering business. The company had lost a major government contract, causing EBITDA to fall from £6m to £2.5m. Net leverage was 8.8x against a 4.0x covenant. An IBR concluded: (a) the business had a viable core (aerospace components, with strong order book); (b) normalised EBITDA of £4.5m was achievable within 18 months; (c) the maximum sustainable debt was £11m (2.5x × £4.5m normalised EBITDA). The restructuring involved: converting £11m of debt to a 45% equity stake in the business (valued at £24.4m enterprise value per IBR); retaining £11m as term debt at a margin step-up of 100bps; requiring the founding family to inject £3m of equity. The IBR business plan was achieved within 20 months. The bank subsequently sold its 45% stake at a profit, recovering more than par on the original loan.

**Case Study 2: Restructuring Failure — Retail Chain**

A bank had £35m of loans to a 200-store retail chain. Footfall declined 40% in 2020. The bank granted covenant waivers and agreed a 12-month principal holiday. At the IBR, it was found that: normalised EBITDA was £2.1m (not the £4.5m management had claimed); 140 of 200 stores were loss-making; the lease portfolio was a material liability (£85m of future lease commitments). The business plan required store closures, landlord rent reductions, and a refinancing — all simultaneously. The probability of all three succeeding was assessed at 20%. The bank moved to enforcement, appointing an Administrator. The Administrator sold 60 profitable stores to a competitor, realising £19m for the bank. Lesson: sometimes restructuring is prolonging the inevitable. The bank should have moved to enforcement 6 months earlier.

## 14. Iterative Reinforcement

**Exercise 1:** Take a real public company that entered administration (e.g., Debenhams, Arcadia). Research the bank debt structure. Using publicly available information, construct the waterfall analysis showing estimated recovery by creditor class.

**Exercise 2:** Build the Python ProvisionCalculator for a realistic restructuring case. Vary the probabilities across 5 scenarios. Calculate the sensitivity of the provision to the probabilities. Present the results as a tornado chart.

**Exercise 3:** Read an IBR summary (these are occasionally included in court documents for Restructuring Plans). Identify: the normalised EBITDA, the key adjustments from statutory EBITDA, the debt capacity conclusion, and the recommended restructuring option.

**Exercise 4:** Model the debt-for-equity swap accounting. A £20m loan is 50% converted to equity. The fair value of 50% equity is £7m. Calculate: (a) the derecognition loss; (b) the carrying amount of the retained £10m loan; (c) the equity investment recognised.

**Exercise 5:** Compare the restructuring options in Python using the `compare_restructuring_options` function. Set up 4 scenarios: covenant waiver only, maturity extension, equity injection, immediate enforcement. Which generates the highest expected recovery PV?

## 15. Source Material

**Regulatory and legislative:**
- EBA/GL/2018/06: Management of Non-Performing and Forborne Exposures
- IFRS 9 Financial Instruments — paragraphs 3.2.3 (derecognition), 5.4.3 (modification)
- Insolvency Act 1986 — Administration and Administrative Receivership
- Companies Act 2006, Part 26A — Restructuring Plan (as inserted by CIGA 2020)
- Corporate Insolvency and Governance Act 2020
- EBA NPE Guidance: Supervisory Expectations on NPE Management (2017)

**Practitioner references:**
- Restructuring & Insolvency volume (Sweet & Maxwell/Thomson Reuters)
- Totty, P.: "Corporate Insolvency Law" — Law and Practice
- Corporate Finance Institute: "Financial Restructuring" — online course material
- Alvarez & Marsal: Distressed Investing and Corporate Restructuring publications
- FTI Consulting: Restructuring practice publications

**Academic:**
- Asquith, P., Gertner, R., Scharfstein, D. (1994): "Anatomy of Financial Distress", Quarterly Journal of Economics
- Gilson, S., John, K., Lang, L. (1990): "Troubled Debt Restructurings", Journal of Financial Economics
- James, C. (1995): "When Do Banks Take Equity in Debt Restructurings?", Review of Financial Studies

**Case law (UK):**
- Re Virgin Active Holdings [2021] EWHC 1246 — first cram-down under Part 26A Restructuring Plan
- Re Smile Telecoms Holdings [2022] — cross-class cram-down; priority of secured creditors
- Standish v RBS [2019] — financial covenant enforcement
