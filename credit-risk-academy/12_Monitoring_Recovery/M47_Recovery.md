# M47 — Recovery

## 1. Business Purpose

Recovery is the process of enforcing security and maximising cash recovery when a borrower has defaulted and restructuring is not viable. It is the final stage in the credit risk lifecycle: the borrower has been unable to meet its obligations, the restructuring options have been exhausted or rejected, and the bank must now act as a secured creditor to recover as much of its outstanding exposure as possible.

Recovery is distinct from restructuring in both its objective and its tools. Restructuring seeks to preserve the business as a going concern with modified terms. Recovery seeks to maximise cash realisation — whether by selling the business as a going concern (Administration Sale), selling individual assets (asset realisations), or enforcing specific security (mortgage enforcement, debenture enforcement, guarantee calling). The bank's role shifts from lender to creditor-in-recovery.

The business purpose of the recovery function is:

1. **Maximise cash recovery** from defaulted exposures, relative to the bank's security position and timing
2. **Minimise the gap** between the IFRS 9 provision (which represents the bank's expected loss) and the actual loss realised — and provide data to improve future LGD models
3. **Protect the bank legally** throughout the enforcement process — insolvency law is complex and procedurally demanding
4. **Manage regulatory obligations** — NPE coverage ratios under CRR2, recovery plans required by PRA
5. **Generate data for back-testing** — every recovery case provides actual LGD data that feeds back into credit risk model validation

Recovery practitioners ("workout officers") must combine commercial judgment with detailed knowledge of insolvency law. A poorly managed recovery can significantly reduce recovery proceeds through timing errors, legal missteps, or failure to preserve asset values during the enforcement process.

The recovery rate achieved on defaulted loans is the empirical complement of LGD (Loss Given Default): Recovery Rate = 1 − LGD. Historical recovery data is essential for validating and improving the LGD models used in IFRS 9 provisioning and Basel capital calculations.

## 2. Accounting Concepts

**IFRS 9 — Write-off.** IFRS 9 paragraph 5.4.4 requires that an entity directly reduces the gross carrying amount of a financial asset when the entity has no reasonable expectations of recovering the financial asset in its entirety or a portion thereof. This is called a write-off. The write-off reduces both the gross carrying amount and the associated provision simultaneously. A write-off is an accounting entry; it does not extinguish the legal debt — the bank may still pursue recovery post-write-off.

Two types of write-off:
- **Economic write-off:** The bank internally writes off the asset for accounting purposes (reducing the gross carrying amount and provision to zero or the expected recovery amount). The legal debt remains. Recovery collections post-write-off are recognised in P&L as a recovery credit.
- **Legal write-off:** The bank formally discharges the debt and releases the borrower from all obligations. This is rare and only done when there is no realistic prospect of any further recovery and the cost of pursuing the debt exceeds the expected proceeds.

**Post-write-off recovery accounting.** When cash is received after a write-off:
- The gross carrying amount is reinstated by the amount of the recovery
- The provision is simultaneously reinstated and then reversed through P&L
- Net effect: cash received → recognised in P&L as a recovery (credit to impairment line)

**IFRS 9 — Collateral impairment.** When the bank takes physical possession of collateral (e.g., a property following LPA Receiver enforcement), the asset is reclassified from the loan book to "assets held for sale" or "investment property" under IAS 40, and measured at fair value less costs to sell under IFRS 5.

**Derecognition of financial assets.** A loan is derecognised when the contractual rights to cash flows expire (write-off after no recovery) or when the bank transfers the loan (NPE disposal — sale to a distressed debt buyer). On transfer/sale, any difference between the carrying amount and the sale proceeds is recognised as a gain or loss in P&L.

**Interest suspense.** For Stage 3 (credit-impaired) assets, IFRS 9 requires that interest income be calculated on the net carrying amount (gross minus provision) rather than the gross amount. This reduces reported net interest income. Many banks also suspend interest accrual entirely on accounts where they have no reasonable expectation of collecting the interest.

**Provisions released on recovery.** When a borrower in Stage 3 repays more than the net carrying amount, the excess is a provision release (credit to the impairment line in P&L). This can create income timing differences between the provision charge (in the loss period) and the provision release (in the recovery period).

## 3. Financial Concepts

**Security realisation analysis.** The starting point of any recovery is a clear analysis of the bank's security and its estimated realisable value:

| Security Type | Expected Realisation | Timing | Key Risks |
|---|---|---|---|
| First legal charge over property | 50-80% of RICS value | 6-24 months | Market conditions, vacant possession |
| Fixed charge over plant/machinery | 20-40% of book value | 3-9 months | Specialist equipment, market depth |
| Fixed charge over debtors | 60-90% of face value | 1-6 months | Debtor quality, collection costs |
| Floating charge (stock) | 20-50% of book value | 3-6 months | Stock condition, forced sale discount |
| Personal guarantee | Highly variable | 12-36 months | Guarantor's financial position |

**Net Realisation Value (NRV).** The estimated cash recovery net of:
- Selling costs (agent fees: 1-3%, legal fees, auction fees)
- Holding costs (rates, insurance, maintenance during enforcement)
- Receiver/Administrator fees (1-5% of realisations, plus time-based fees)
- Preferential creditors (HMRC Crown Preference for 1 year of VAT, PAYE — restored under Finance Act 2020)
- Prescribed part (floating charge: up to £600,000 ring-fenced for unsecured creditors under Insolvency Act 1986 s176A)

**Realised LGD.** The actual loss realised on a defaulted exposure:
- Realised LGD = (Gross Carrying Amount − Total Cash Recovered) / Gross Carrying Amount at Default
- Total Cash Recovered includes: asset sales proceeds, guarantee payments, post-default interest collected, any reversal of expenses

**Comparison to modelled LGD.** The back-testing process compares realised LGD to the modelled LGD predicted at origination. Systematic differences indicate model bias:
- If realised LGD consistently exceeds modelled LGD → model is too optimistic → increase LGD estimates
- If realised LGD consistently falls below modelled LGD → model is too conservative → reduce LGD estimates

**Time value in recovery.** A £10m recovery today is worth more than £10m received in 3 years. Cash flows during the recovery period must be discounted at the original EIR to calculate the economic loss. Banks and regulators focus on recovery rates (unadjusted) and economic loss (time-adjusted) as separate metrics.

**Enterprise value vs liquidation value.** If the business is sold as a going concern (Administration Sale — "pre-pack" or conventional administration), the proceeds reflect enterprise value. This is typically higher than break-up/liquidation value. The bank's recovery is therefore higher if the business can be sold as a going concern, even in administration. This is why banks sometimes support Administration rather than immediate Liquidation.

## 4. Statistical Concepts

**LGD distribution.** LGD is not normally distributed — it tends to be bimodal. Many defaulted loans are fully recovered (LGD near 0%) — the borrower repays in full post-default, or security is sufficient. Others have LGDs near 100% (fully unsecured, no assets). A small proportion have intermediate LGDs. The bimodal distribution has important implications for provisioning: a portfolio of 100 small loans with expected LGD of 40% may have 30 loans with 0% LGD and 70 loans with 57% LGD, rather than 100 loans with exactly 40%.

**Recovery curve.** For a portfolio of defaulted loans, the timing of recoveries can be modelled as a recovery curve: the cumulative proportion of ultimate recovery received by time T. Recovery curves are used to:
- Forecast future cash flows from the recovery book
- Calculate the discount impact on LGD
- Estimate when provisions can be released

**Regression analysis for LGD drivers.** Statistical analysis of historical recovery data identifies which factors drive higher/lower LGD:
- Collateral type (property > stock > unsecured)
- LTV at default (lower LTV → lower LGD)
- Industry (manufacturing with tangible assets vs service businesses)
- Size of exposure (larger loans tend to have lower LGD due to scale economics in recovery)
- Time in default (longer time → higher LGD due to holding costs and value deterioration)
- Economic cycle (downturn → lower asset prices → higher LGD)

**Vintage cohort analysis for recovery.** Recovery rates are tracked by vintage (year of default). This allows the bank to assess whether recent defaults are being recovered as efficiently as historical defaults. Cohort analysis: "Of all loans that defaulted in 2020, what percentage of ultimate recovery has been collected by each subsequent year?"

**Probability of full recovery.** For highly secured loans (LTV < 50%), the probability of full recovery is high. The bank can use logistic regression on historical data to estimate P(full recovery) as a function of LTV, collateral type, and borrower characteristics. This probability feeds into the two-outcome scenario model for Stage 3 provisions.

## 5. Regulatory Framework

**Insolvency Act 1986 (IA1986).** The primary legislation governing corporate insolvency in England and Wales:
- Part II (Administration): An Administrator is appointed to pursue one of three statutory objectives: (1) rescue the company as a going concern, (2) achieve a better result than liquidation, (3) realise property to distribute to one or more secured or preferential creditors. A bank with a qualifying floating charge (QFC) may appoint an Administrator out of court.
- Part IV (Winding Up/Liquidation): The company's assets are collected and distributed. A Creditors' Voluntary Liquidation (CVL) is initiated by shareholders; a Compulsory Liquidation (CML) is ordered by the court (often on petition by a creditor).
- Part I (CVA): A Company Voluntary Arrangement is a formal agreement between a company and its unsecured creditors to pay a reduced or deferred amount. Secured creditors are not bound without consent.
- Section 176A: The Prescribed Part — floating charge holders must set aside up to £600,000 of floating charge realisations for unsecured creditors. This cap applies to floating charges created after 15 September 2003.

**Law of Property Act 1925 (LPA 1925).** Section 101 grants a mortgagee the power to appoint an LPA Receiver when the mortgage money has become due. The LPA Receiver's primary duty is to the mortgagee (the bank), not to the mortgagor (the borrower). The LPA Receiver has power to: manage the property, collect rents, insure, and sell. An LPA Receiver is different from an Insolvency Act Administrator — they act under property law, not insolvency law.

**CRR2 — NPE Coverage Ratios (Article 469a).** From 2019, banks must deduct from regulatory capital the amount by which their provisions fall short of minimum NPE coverage:
- Unsecured NPE: 100% provisioning within 3 years of default
- Secured (non-immovable property): graduated to 100% within 7 years
- Secured by immovable property: graduated to 100% within 9 years
These requirements create strong regulatory incentives for banks to actively manage and resolve NPE portfolios rather than holding them indefinitely.

**EBA/GL/2018/06 — NPE Management.** Section 6 covers NPE disposal strategies. Banks with NPE ratios above 5% are required to have an NPE Reduction Strategy covering: targets for NPE reduction, tools to be used (restructuring, write-off, disposal), governance, and monitoring. Banks must report quarterly to the EBA on NPE levels.

**Finance Act 2020 — Crown Preference.** From 1 December 2020, HMRC became a preferential creditor for certain taxes (VAT, PAYE, employee NI) in insolvency proceedings. This reduced the assets available to floating charge holders and increased expected LGDs for floating charge security.

**Pre-pack Administration.** A Pre-packaged Administration involves a sale agreement being negotiated before the appointment of an Administrator, with the sale completing immediately after appointment. This maximises business value by avoiding the uncertainty of a formal marketing process. Pre-pack Sales Statement requirements (SIP 16) require the Administrator to justify the pre-pack sale, and the bank's consent (as floating charge holder) is required for material pre-packs.

## 6. Data Required

**At point of default:**
- All facility documentation (facility agreement, security documents, guarantees)
- Outstanding exposure: principal drawn, accrued interest, fees, swap MTM, all amounts due
- Security register: all charges registered, dates, asset descriptions
- Latest security valuations (RICS for property, insurance valuations for plant)
- Details of all other creditors (other banks, trade creditors, HMRC, bondholders)
- Latest management accounts and 13-week cash flow
- Company registration details: directors, registered address, filed accounts

**From the insolvency process:**
- Administrator/Receiver appointment documents
- Statutory Information Report (SIR) / Director's Statement of Affairs
- Realisation statements (showing asset values and proceeds)
- Progress reports (6-monthly updates on the insolvency)
- Final accounts (showing total realisations and distributions)

**For recovery monitoring:**
- Receipt date and amount for each recovery cash flow
- Costs incurred (legal, agent, valuation)
- Remaining security value
- Estimated further recoveries
- Expected completion date

**For LGD back-testing:**
- Gross carrying amount at date of default
- Total cash recovered (each item with date)
- All costs of recovery
- Date of final resolution
- Realised LGD (calculated)
- Modelled LGD (at origination and at date of default)
- Variance between modelled and realised

## 7. How Analysts Actually Work

**Default declaration and acceleration.** When a default event occurs, the bank sends a formal demand letter to the borrower declaring that an Event of Default has occurred and demanding repayment of all amounts outstanding (acceleration). The letter specifies:
- The Event of Default (e.g., failure to pay, material adverse change, insolvency)
- The outstanding amount (including all fees, accrued interest, swap breakage costs)
- A cure period (if applicable — typically 5-15 business days for financial covenant breaches, immediate for payment defaults)
- The consequences of non-cure (appointment of Administrator/Receiver, enforcement of security)

**Choosing the enforcement route.** The recovery officer must decide which enforcement route maximises recovery:

1. **LPA Receiver:** Appoint over specific property. Simple, quick, avoids full Administration. Best used when the primary security is real property (commercial mortgage).

2. **Administration (out of court by QFC holder):** Gives the bank control over the process. Administrator has powers to manage the whole business and sell it as a going concern or in parts. Best for businesses with multiple assets or ongoing business value.

3. **Compulsory Liquidation (CML):** Court process, more expensive and slower. Used when the borrower is uncooperative and needs a court order, or when the assets are simple (cash, debtors) and immediate distribution is desired.

4. **Voluntary arrangement (not primarily a bank tool):** The borrower proposes a CVA to unsecured creditors. The bank as secured creditor can stand outside a CVA. Sometimes the bank supports a CVA for the unsecured debt while maintaining its own secured position.

**Pre-pack Administration.** Where the business is viable but the legal entity is not, a pre-pack sale allows the business (assets, employees, contracts) to be sold to a new vehicle (sometimes owned by the existing management — a "Phoenix") immediately on Administration. The bank consents in advance. The bank receives the sale proceeds in priority as fixed charge holder. Pre-packs preserve business value but attract controversy when the pre-pack involves related parties.

**Asset realisation process:**
1. Instruction of a Law of Property Act Receiver or Administrator
2. Receiver/Administrator takes control of assets, bank accounts, management
3. The Receiver/Administrator markets assets for sale (CBRE, JLL, specialist agents)
4. Offers are received and evaluated: best offer is accepted (subject to bank's security interest)
5. Sale completes, proceeds distributed per waterfall
6. Bank receives payment on fixed charge first, then floating charge
7. Bank records receipt, updates provision, calculates realised LGD

**Guarantee enforcement.** If the borrower fails to repay, the bank makes demand on guarantors. The guarantor demand must comply with the guarantee documentation. Key issues: is the guarantee properly executed? Is the guarantor solvent? Does the guarantor have independent legal advice (essential for enforceability of personal guarantees from directors)?

**Post-write-off collections.** After a loan is written off, the recovery team continues to pursue outstanding amounts. Post-write-off collections are common and can be material, especially for property-secured loans where the property may be sold years later at a higher value. All post-write-off collections are recorded in the recovery database and generate a credit to the P&L impairment line.

## 8. Excel Implementation

```excel
=== SHEET: Recovery_Case_Summary ===

HEADER:
Case Reference: [auto-generated]
Customer Name: [input]
Date of Default: [input]
Date of Acceleration: [input]
Insolvency Process Type: [dropdown: Admin/LPA/CVL/CML/None]
Insolvency Practitioner: [input]
Recovery Officer: [input]
Expected Completion: [input]

EXPOSURE AT DEFAULT:
  Principal Drawn:                        [from system at default date]
  Accrued Interest to Default:            [from system]
  Fees Outstanding:                       [from system]
  Swap MTM (if any):                      [from Treasury]
  Total Gross Exposure at Default (EAD):  =SUM(above)

SECURITY ANALYSIS:
                          Gross Value  Recovery Rate  Net Recovery Est.
Fixed Charge: Property    [input]      [input %]       =B×C
Fixed Charge: Plant       [input]      [input %]       =B×C
Fixed Charge: Debtors     [input]      [input %]       =B×C
Floating Charge: Stock    [input]      [input %]       =B×C
Personal Guarantee        [input]      [input %]       =B×C
  Less: Prescribed Part   [max £600K]
  Less: Preferential Creditors (HMRC): [estimate]
  Less: Admin/Receiver Costs:          [estimate %]
  Total Estimated Net Recovery:        =SUM(Net_Recovery cols) - deductions

Estimated Recovery Rate:  =Total_Recovery / EAD
Estimated LGD:            =1 - Recovery_Rate
Modelled LGD (at origination): [from system]
Variance (Estimated vs Modelled): =Estimated_LGD - Modelled_LGD

=== SHEET: Recovery_Cashflow_Tracker ===

Columns:
A: Receipt Date
B: Receipt Type [dropdown: Property Sale / Asset Sale / Debtor Collection / Guarantee / Dividend from IP]
C: Gross Receipt Amount
D: Costs Deducted
E: Net Recovery (C-D)
F: Discount Factor = 1/(1+EIR)^(YEARFRAC(Default_Date, A, 1))
G: PV of Receipt (E × F)
H: Running Total Gross Recovery
I: Running Total PV Recovery
J: Remaining Expected Recovery

Summary:
  Total Gross Recovery:          =SUM(E:E)
  Total PV Recovery:             =SUM(G:G)
  Total Costs:                   =SUM(D:D)
  Realised LGD (gross):          =(EAD - Total_Gross) / EAD
  Realised LGD (discounted):     =(EAD - Total_PV) / EAD

=== SHEET: Waterfall_Analysis ===

Total Estimated Realisations: [sum of all estimated proceeds]

Distribution waterfall:
  Step 1: Fixed Charge Proceeds
    Fixed charge security realisations:        £[input]
    Less: Receiver costs on fixed charge:      (£[input])
    Net to Fixed Charge Creditor (bank):       =Step1 realisations net of costs
    Bank Fixed Charge Claim:                   =Principal + Interest + Fees
    Surplus (if any) to floating charge:       =MAX(0, Net - Claim)
    Shortfall (unsecured claim):               =MAX(0, Claim - Net)

  Step 2: Floating Charge Proceeds
    Floating charge asset realisations:        £[input]
    Less: Admin costs (not covered by fixed):  (£[input])
    Less: Preferential Creditors (HMRC):       (£[input])
    Less: Prescribed Part (s176A):             =MIN(SUM_FC * 0.5, 600000)
    Net Floating Charge Distribution:          =Step2 net
    Bank Floating Charge Claim (if any):       [shortfall from Step 1]
    Payment to Bank:                           =MIN(Claim, Net)
    Surplus (if any):                          =MAX(0, Net - Claim)

  Step 3: Unsecured Creditors
    Prescribed Part:                           [from above]
    Surplus from Steps 1-2:                    [from above]
    Total Unsecured Pool:                      =sum
    Total Unsecured Claims:                    £[input]
    Pence-in-the-Pound:                        =Pool / Claims * 100
    Bank Unsecured Claim:                      £[input — if any]
    Bank Unsecured Distribution:               =Bank_Claim × P_in_P / 100

  TOTAL BANK RECOVERY:
    Fixed Charge:                              [from Step 1]
    Floating Charge:                           [from Step 2]
    Unsecured Distribution:                    [from Step 3]
    Guarantee Enforcement:                     [separate]
    Total Recovery:                            =SUM(all above)
    Total EAD at Default:                      [from summary sheet]
    Realised LGD:                              =(EAD - Total) / EAD

=== SHEET: LGD_Backtesting ===

For the recovery portfolio, track:
Columns: Case_Ref | Sector | Collateral_Type | LTV_at_Default | EAD | Modelled_LGD |
         Realised_LGD | Variance | Recovery_Duration_Months | Completed_Year

Summary pivot table:
  Average modelled LGD by sector and collateral type
  Average realised LGD by sector and collateral type
  Average variance (realised - modelled)
  % cases where realised > modelled (model under-estimated loss)

Chart: Scatter plot — Modelled LGD (x-axis) vs Realised LGD (y-axis)
  45-degree line = perfect calibration
  Points above line = model underestimated loss (conservative)
  Points below line = model overestimated loss (optimistic)
```

## 9. SQL Implementation

```sql
-- ============================================================
-- M47: Recovery SQL Queries
-- ============================================================

-- ------------------------------------------------------------
-- Query 1: Active Recovery Cases — Portfolio Overview
-- ------------------------------------------------------------
SELECT
    rc.case_reference,
    c.customer_name,
    c.sector_code,
    rc.default_date,
    rc.insolvency_type,
    rc.insolvency_practitioner,
    rc.recovery_officer,
    -- Exposure at default
    rc.ead_at_default,
    -- Current position
    COALESCE(SUM(cf.net_recovery), 0) AS total_collected_to_date,
    rc.ead_at_default - COALESCE(SUM(cf.net_recovery), 0) AS remaining_exposure,
    s.ecl_provision AS current_provision,
    -- Progress
    rc.estimated_total_recovery,
    ROUND(COALESCE(SUM(cf.net_recovery), 0) / NULLIF(rc.estimated_total_recovery, 0) * 100, 1)
        AS recovery_progress_pct,
    rc.estimated_completion_date,
    DATEDIFF(MONTH, rc.default_date, GETDATE()) AS months_in_recovery,
    -- LGD metrics
    ROUND((rc.ead_at_default - rc.estimated_total_recovery) / NULLIF(rc.ead_at_default, 0) * 100, 1)
        AS estimated_lgd_pct,
    rc.modelled_lgd_at_default * 100 AS modelled_lgd_pct,
    ROUND(
        (rc.ead_at_default - rc.estimated_total_recovery) / NULLIF(rc.ead_at_default, 0)
        - rc.modelled_lgd_at_default, 4
    ) * 100 AS lgd_variance_pct
FROM RecoveryCases rc
JOIN Customers c ON rc.customer_id = c.customer_id
JOIN IFRS9Staging s ON rc.facility_id = s.facility_id
    AND s.staging_date = EOMONTH(GETDATE(), -1)
LEFT JOIN CashflowReceipts cf ON rc.case_id = cf.case_id
WHERE rc.case_status = 'ACTIVE'
GROUP BY
    rc.case_reference, c.customer_name, c.sector_code,
    rc.default_date, rc.insolvency_type, rc.insolvency_practitioner,
    rc.recovery_officer, rc.ead_at_default, s.ecl_provision,
    rc.estimated_total_recovery, rc.estimated_completion_date,
    rc.modelled_lgd_at_default
ORDER BY rc.ead_at_default DESC;


-- ------------------------------------------------------------
-- Query 2: Recovery Cashflow Waterfall — Individual Case
-- Shows all receipts with cumulative totals and PV discounting
-- ------------------------------------------------------------
DECLARE @case_id INT = 789;
DECLARE @original_eir DECIMAL(6,4) = 0.0450;
DECLARE @default_date DATE = '2023-06-30';

SELECT
    cf.receipt_date,
    cf.receipt_type,
    cf.gross_receipt,
    cf.costs_deducted,
    cf.net_recovery,
    -- Discount factor = 1/(1+EIR)^years_from_default
    POWER(1 + @original_eir,
        -CAST(DATEDIFF(DAY, @default_date, cf.receipt_date) AS FLOAT) / 365.25
    ) AS discount_factor,
    -- PV of receipt
    cf.net_recovery * POWER(1 + @original_eir,
        -CAST(DATEDIFF(DAY, @default_date, cf.receipt_date) AS FLOAT) / 365.25
    ) AS pv_recovery,
    -- Running totals
    SUM(cf.net_recovery) OVER (
        PARTITION BY cf.case_id ORDER BY cf.receipt_date
    ) AS cumulative_gross_recovery,
    SUM(cf.net_recovery * POWER(1 + @original_eir,
        -CAST(DATEDIFF(DAY, @default_date, cf.receipt_date) AS FLOAT) / 365.25
    )) OVER (
        PARTITION BY cf.case_id ORDER BY cf.receipt_date
    ) AS cumulative_pv_recovery
FROM CashflowReceipts cf
WHERE cf.case_id = @case_id
ORDER BY cf.receipt_date;


-- ------------------------------------------------------------
-- Query 3: Realised LGD vs Modelled LGD — Back-testing
-- Closed cases only; compares modelled to realised LGD
-- ------------------------------------------------------------
SELECT
    rc.case_reference,
    c.sector_code,
    rc.collateral_type,
    ROUND(rc.ltv_at_default * 100, 1) AS ltv_at_default_pct,
    rc.ead_at_default,
    -- Realised LGD (gross, undiscounted)
    ROUND(
        (rc.ead_at_default - SUM(cf.net_recovery)) / rc.ead_at_default * 100, 1
    ) AS realised_lgd_gross_pct,
    -- Realised LGD (discounted)
    ROUND(
        (rc.ead_at_default - SUM(
            cf.net_recovery * POWER(
                1 + rc.original_eir,
                -CAST(DATEDIFF(DAY, rc.default_date, cf.receipt_date) AS FLOAT) / 365.25
            )
        )) / rc.ead_at_default * 100, 1
    ) AS realised_lgd_discounted_pct,
    -- Modelled LGD
    ROUND(rc.modelled_lgd_at_origination * 100, 1) AS modelled_lgd_origination_pct,
    ROUND(rc.modelled_lgd_at_default * 100, 1) AS modelled_lgd_at_default_pct,
    -- Variances
    ROUND(
        (rc.ead_at_default - SUM(cf.net_recovery)) / rc.ead_at_default * 100
        - rc.modelled_lgd_at_default * 100, 1
    ) AS lgd_variance_vs_default_model,
    -- Recovery duration
    DATEDIFF(MONTH, rc.default_date, rc.close_date) AS recovery_duration_months,
    rc.close_date,
    YEAR(rc.close_date) AS close_year
FROM RecoveryCases rc
JOIN Customers c ON rc.customer_id = c.customer_id
LEFT JOIN CashflowReceipts cf ON rc.case_id = cf.case_id
WHERE rc.case_status = 'CLOSED'
    AND rc.close_date >= DATEADD(YEAR, -7, GETDATE())
GROUP BY
    rc.case_reference, c.sector_code, rc.collateral_type,
    rc.ltv_at_default, rc.ead_at_default,
    rc.modelled_lgd_at_origination, rc.modelled_lgd_at_default,
    rc.original_eir, rc.default_date, rc.close_date
ORDER BY rc.close_date DESC;


-- ------------------------------------------------------------
-- Query 4: LGD Back-test Summary — By Sector and Collateral Type
-- Used for model validation reporting
-- ------------------------------------------------------------
WITH RealisedLGD AS (
    SELECT
        rc.case_id,
        c.sector_code,
        rc.collateral_type,
        rc.ead_at_default,
        rc.modelled_lgd_at_default,
        DATEDIFF(MONTH, rc.default_date, rc.close_date) AS duration_months,
        (rc.ead_at_default - SUM(cf.net_recovery)) / rc.ead_at_default
            AS realised_lgd
    FROM RecoveryCases rc
    JOIN Customers c ON rc.customer_id = c.customer_id
    LEFT JOIN CashflowReceipts cf ON rc.case_id = cf.case_id
    WHERE rc.case_status = 'CLOSED'
        AND rc.close_date >= DATEADD(YEAR, -7, GETDATE())
    GROUP BY
        rc.case_id, c.sector_code, rc.collateral_type,
        rc.ead_at_default, rc.modelled_lgd_at_default,
        rc.default_date, rc.close_date
)
SELECT
    sector_code,
    collateral_type,
    COUNT(*) AS n_cases,
    -- Exposure-weighted modelled LGD
    ROUND(SUM(ead_at_default * modelled_lgd_at_default)
          / SUM(ead_at_default) * 100, 1) AS wtd_avg_modelled_lgd_pct,
    -- Exposure-weighted realised LGD
    ROUND(SUM(ead_at_default * realised_lgd)
          / SUM(ead_at_default) * 100, 1) AS wtd_avg_realised_lgd_pct,
    -- Variance (positive = model underestimated loss)
    ROUND(SUM(ead_at_default * (realised_lgd - modelled_lgd_at_default))
          / SUM(ead_at_default) * 100, 1) AS lgd_variance_pct,
    -- % of cases where realised > modelled (under-prediction rate)
    ROUND(100.0 * SUM(CASE WHEN realised_lgd > modelled_lgd_at_default THEN 1 ELSE 0 END)
          / COUNT(*), 1) AS under_prediction_rate_pct,
    AVG(duration_months) AS avg_duration_months,
    -- Recovery rate (= 1 - LGD)
    ROUND(100 - SUM(ead_at_default * realised_lgd)
          / SUM(ead_at_default) * 100, 1) AS avg_recovery_rate_pct
FROM RealisedLGD
GROUP BY sector_code, collateral_type
HAVING COUNT(*) >= 5  -- only show groups with sufficient sample
ORDER BY sector_code, collateral_type;


-- ------------------------------------------------------------
-- Query 5: Update recovery provision — receipt processing
-- Called when cash is received in a recovery case
-- ------------------------------------------------------------
DECLARE @case_id INT = 789;
DECLARE @facility_id INT = 12345;
DECLARE @receipt_date DATE = '2025-03-15';
DECLARE @gross_receipt DECIMAL(18,2) = 3500000.00;
DECLARE @costs DECIMAL(18,2) = 175000.00;  -- 5% selling costs
DECLARE @receipt_type NVARCHAR(50) = 'PROPERTY_SALE';
DECLARE @net_receipt DECIMAL(18,2) = @gross_receipt - @costs;

BEGIN TRANSACTION;

-- 1. Record the receipt
INSERT INTO CashflowReceipts (
    case_id, facility_id, receipt_date, receipt_type,
    gross_receipt, costs_deducted, net_recovery, recorded_by, created_date
)
VALUES (
    @case_id, @facility_id, @receipt_date, @receipt_type,
    @gross_receipt, @costs, @net_receipt, SYSTEM_USER, GETDATE()
);

-- 2. Update the remaining estimated recovery
UPDATE RecoveryCases
SET estimated_total_recovery = estimated_total_recovery  -- recalculate elsewhere
    -- The provision will be recalculated by finance based on new cash receipt
WHERE case_id = @case_id;

-- 3. Flag for provision review
INSERT INTO ProvisionReviewQueue (
    facility_id, review_trigger, trigger_date, trigger_detail
)
VALUES (
    @facility_id,
    'RECOVERY_RECEIPT',
    GETDATE(),
    CONCAT('Cash receipt of £', FORMAT(@net_receipt, 'N0'),
           ' received on ', @receipt_date,
           '. Provision review required.')
);

COMMIT TRANSACTION;

PRINT 'Receipt recorded. Provision review queued for facility ' + CAST(@facility_id AS NVARCHAR);


-- ------------------------------------------------------------
-- Query 6: Write-off processing
-- Economic write-off — reduces gross carrying amount and provision
-- ------------------------------------------------------------
DECLARE @write_off_facility_id INT = 12345;
DECLARE @write_off_amount DECIMAL(18,2) = 14500000.00;  -- portion being written off
DECLARE @write_off_date DATE = '2025-06-30';
DECLARE @write_off_reason NVARCHAR(500) =
    'Economic write-off: no reasonable expectation of recovery beyond
     £4.0m estimated security realisation. Legal debt preserved.';

BEGIN TRANSACTION;

-- Update the facility carrying amount
UPDATE Facilities
SET drawn_balance = drawn_balance - @write_off_amount,
    written_off_amount = ISNULL(written_off_amount, 0) + @write_off_amount,
    last_updated = GETDATE()
WHERE facility_id = @write_off_facility_id;

-- Reduce provision by write-off amount (provision was set to cover the write-off)
UPDATE IFRS9Staging
SET ecl_provision = GREATEST(0, ecl_provision - @write_off_amount),
    last_updated = GETDATE()
WHERE facility_id = @write_off_facility_id
    AND staging_date = EOMONTH(@write_off_date, 0);

-- Log the write-off
INSERT INTO WriteOffRegister (
    facility_id, write_off_date, write_off_amount,
    write_off_type, write_off_reason, approved_by, created_date
)
VALUES (
    @write_off_facility_id, @write_off_date, @write_off_amount,
    'ECONOMIC', @write_off_reason, SYSTEM_USER, GETDATE()
);

COMMIT TRANSACTION;
```

## 10. Python Implementation

```python
"""
M47: Recovery — Python Implementation
Covers: recovery tracking, realised LGD calculation,
LGD back-testing, waterfall analysis, provision management
"""

import pandas as pd
import numpy as np
import pyodbc
from dataclasses import dataclass, field
from typing import List, Optional, Dict
from datetime import date
from enum import Enum
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches


# ============================================================
# 1. DATA CLASSES
# ============================================================

class InsolvencyType(Enum):
    ADMINISTRATION = "ADMINISTRATION"
    LPA_RECEIVERSHIP = "LPA_RECEIVERSHIP"
    CVL = "CREDITORS_VOL_LIQUIDATION"
    CML = "COMPULSORY_LIQUIDATION"
    CVA = "COMPANY_VOLUNTARY_ARRANGEMENT"
    NONE = "NO_FORMAL_PROCESS"


@dataclass
class SecurityItem:
    description: str
    gross_value: float
    recovery_rate: float
    charge_type: str  # FIXED or FLOATING
    estimated_timeline_months: int

    @property
    def estimated_net_recovery(self) -> float:
        return self.gross_value * self.recovery_rate


@dataclass
class RecoveryReceipt:
    receipt_date: date
    receipt_type: str
    gross_amount: float
    costs: float

    @property
    def net_amount(self) -> float:
        return self.gross_amount - self.costs

    def pv(self, default_date: date, discount_rate: float) -> float:
        years = (self.receipt_date - default_date).days / 365.25
        return self.net_amount / ((1 + discount_rate) ** years)


# ============================================================
# 2. WATERFALL ANALYSIS
# ============================================================

class RecoveryWaterfall:
    """
    Calculates the distribution of recovery proceeds through
    the UK creditor priority waterfall.
    """

    def __init__(
        self,
        fixed_charge_proceeds: float,
        floating_charge_proceeds: float,
        admin_costs: float,
        preferential_creditors: float,  # HMRC, employee wages
        bank_fixed_charge_claim: float,
        bank_floating_charge_claim: float,
        bank_unsecured_claim: float,
        other_unsecured_creditors: float,
        insolvency_type: InsolvencyType = InsolvencyType.ADMINISTRATION
    ):
        self.fc_proceeds = fixed_charge_proceeds
        self.flc_proceeds = floating_charge_proceeds
        self.admin_costs = admin_costs
        self.preferential = preferential_creditors
        self.bank_fc_claim = bank_fixed_charge_claim
        self.bank_flc_claim = bank_floating_charge_claim
        self.bank_unsec_claim = bank_unsecured_claim
        self.other_unsec = other_unsecured_creditors

    @property
    def prescribed_part(self) -> float:
        """
        IA 1986 s176A: 50% of floating charge proceeds up to £10,000,
        then 20% of remainder, capped at £600,000.
        """
        if self.flc_proceeds <= 0:
            return 0
        part = min(self.flc_proceeds, 10_000) * 0.5
        if self.flc_proceeds > 10_000:
            part += min(self.flc_proceeds - 10_000, 2_940_000) * 0.2
        return min(part, 600_000)

    def calculate(self) -> dict:
        """Run the waterfall calculation."""
        results = {}

        # Step 1: Fixed charge
        net_fc = self.fc_proceeds  # no admin costs deducted from fixed charge proceeds
        bank_fc_recovery = min(self.bank_fc_claim, net_fc)
        fc_surplus = max(0, net_fc - bank_fc_recovery)
        bank_fc_shortfall = max(0, self.bank_fc_claim - bank_fc_recovery)

        results['fixed_charge'] = {
            'gross_proceeds': self.fc_proceeds,
            'bank_recovery': bank_fc_recovery,
            'bank_shortfall_to_floating': bank_fc_shortfall,
            'surplus_to_floating': fc_surplus
        }

        # Step 2: Floating charge
        flc_available = (
            self.flc_proceeds
            + fc_surplus
            - self.admin_costs
            - self.preferential
            - self.prescribed_part
        )
        flc_available = max(0, flc_available)

        bank_flc_claim_total = self.bank_flc_claim + bank_fc_shortfall
        bank_flc_recovery = min(bank_flc_claim_total, flc_available)
        flc_surplus = max(0, flc_available - bank_flc_recovery)
        bank_flc_shortfall_total = max(0, bank_flc_claim_total - bank_flc_recovery)

        results['floating_charge'] = {
            'gross_proceeds': self.flc_proceeds + fc_surplus,
            'less_admin_costs': self.admin_costs,
            'less_preferential': self.preferential,
            'less_prescribed_part': self.prescribed_part,
            'net_available': flc_available,
            'bank_recovery': bank_flc_recovery,
            'bank_shortfall_to_unsecured': bank_flc_shortfall_total,
            'surplus_to_unsecured': flc_surplus
        }

        # Step 3: Unsecured
        unsecured_pool = self.prescribed_part + flc_surplus
        total_unsecured_claims = (
            self.bank_unsec_claim
            + bank_flc_shortfall_total
            + self.other_unsec
        )
        pence_in_pound = (
            min(unsecured_pool / total_unsecured_claims, 1.0)
            if total_unsecured_claims > 0 else 0
        )
        bank_unsec_recovery = (
            (self.bank_unsec_claim + bank_flc_shortfall_total) * pence_in_pound
        )

        results['unsecured'] = {
            'pool': unsecured_pool,
            'total_claims': total_unsecured_claims,
            'pence_in_pound': round(pence_in_pound * 100, 1),
            'bank_recovery': bank_unsec_recovery,
            'other_creditor_recovery': self.other_unsec * pence_in_pound
        }

        # Total bank recovery
        total_bank = bank_fc_recovery + bank_flc_recovery + bank_unsec_recovery
        total_claim = self.bank_fc_claim + self.bank_flc_claim + self.bank_unsec_claim
        results['summary'] = {
            'total_bank_claim': total_claim,
            'total_bank_recovery': total_bank,
            'bank_lgd': max(0, 1 - total_bank / total_claim) if total_claim > 0 else 0,
            'bank_recovery_rate': min(1.0, total_bank / total_claim) if total_claim > 0 else 0
        }

        return results

    def print_waterfall(self):
        """Print formatted waterfall analysis."""
        r = self.calculate()
        print("=" * 60)
        print("RECOVERY WATERFALL ANALYSIS")
        print("=" * 60)
        print(f"\nSTEP 1: FIXED CHARGE")
        print(f"  Gross proceeds:              £{r['fixed_charge']['gross_proceeds']:>12,.0f}")
        print(f"  Bank recovery:               £{r['fixed_charge']['bank_recovery']:>12,.0f}")
        print(f"  Shortfall to floating:       £{r['fixed_charge']['bank_shortfall_to_floating']:>12,.0f}")

        print(f"\nSTEP 2: FLOATING CHARGE")
        print(f"  Gross proceeds + FC surplus: £{r['floating_charge']['gross_proceeds']:>12,.0f}")
        print(f"  Less: Admin costs:          (£{r['floating_charge']['less_admin_costs']:>11,.0f})")
        print(f"  Less: Preferential creds:   (£{r['floating_charge']['less_preferential']:>11,.0f})")
        print(f"  Less: Prescribed Part:      (£{r['floating_charge']['less_prescribed_part']:>11,.0f})")
        print(f"  Net available:               £{r['floating_charge']['net_available']:>12,.0f}")
        print(f"  Bank recovery:               £{r['floating_charge']['bank_recovery']:>12,.0f}")

        print(f"\nSTEP 3: UNSECURED")
        print(f"  Pool (Prescribed Part + surplus): £{r['unsecured']['pool']:>8,.0f}")
        print(f"  Total unsecured claims:      £{r['unsecured']['total_claims']:>12,.0f}")
        print(f"  Pence in the pound:          {r['unsecured']['pence_in_pound']:>12.1f}p")
        print(f"  Bank unsecured recovery:     £{r['unsecured']['bank_recovery']:>12,.0f}")

        print(f"\nSUMMARY")
        print(f"  Total bank claim:            £{r['summary']['total_bank_claim']:>12,.0f}")
        print(f"  Total bank recovery:         £{r['summary']['total_bank_recovery']:>12,.0f}")
        print(f"  Bank recovery rate:          {r['summary']['bank_recovery_rate']:>12.1%}")
        print(f"  Bank LGD:                    {r['summary']['bank_lgd']:>12.1%}")
        print("=" * 60)


# ============================================================
# 3. LGD BACK-TESTING
# ============================================================

class LGDBacktester:
    """
    Compares modelled LGD to realised LGD for completed recovery cases.
    Identifies model bias and calibration issues.
    """

    def __init__(self, completed_cases_df: pd.DataFrame):
        """
        Parameters:
        - completed_cases_df: DataFrame with columns:
            case_id, sector, collateral_type, ltv_at_default,
            ead_at_default, modelled_lgd, realised_lgd,
            recovery_duration_months, close_year
        """
        self.df = completed_cases_df.copy()
        self._calculate_variances()

    def _calculate_variances(self):
        self.df['lgd_variance'] = (
            self.df['realised_lgd'] - self.df['modelled_lgd']
        )
        self.df['is_under_predicted'] = (
            self.df['realised_lgd'] > self.df['modelled_lgd']
        )
        self.df['recovery_rate_realised'] = 1 - self.df['realised_lgd']
        self.df['recovery_rate_modelled'] = 1 - self.df['modelled_lgd']

    def summary_statistics(self) -> dict:
        """Overall back-test summary statistics."""
        ead_total = self.df['ead_at_default'].sum()

        def wtd_avg(col):
            return np.average(
                self.df[col],
                weights=self.df['ead_at_default']
            )

        return {
            'n_cases': len(self.df),
            'total_ead': ead_total,
            'wtd_avg_modelled_lgd': wtd_avg('modelled_lgd'),
            'wtd_avg_realised_lgd': wtd_avg('realised_lgd'),
            'wtd_avg_lgd_variance': wtd_avg('lgd_variance'),
            'under_prediction_rate': self.df['is_under_predicted'].mean(),
            'mean_duration_months': self.df['recovery_duration_months'].mean(),
            'median_lgd_variance': self.df['lgd_variance'].median()
        }

    def segment_analysis(self, groupby_cols: list) -> pd.DataFrame:
        """Segment back-test results by specified columns."""
        grouped = self.df.groupby(groupby_cols).apply(
            lambda g: pd.Series({
                'n_cases': len(g),
                'total_ead': g['ead_at_default'].sum(),
                'wtd_modelled_lgd': np.average(
                    g['modelled_lgd'], weights=g['ead_at_default']
                ),
                'wtd_realised_lgd': np.average(
                    g['realised_lgd'], weights=g['ead_at_default']
                ),
                'lgd_variance': np.average(
                    g['lgd_variance'], weights=g['ead_at_default']
                ),
                'under_pred_rate': g['is_under_predicted'].mean(),
                'avg_duration_months': g['recovery_duration_months'].mean()
            })
        ).reset_index()
        return grouped.sort_values('wtd_realised_lgd', ascending=False)

    def plot_calibration(self):
        """Scatter plot: modelled vs realised LGD."""
        fig, axes = plt.subplots(1, 2, figsize=(14, 6))

        # Scatter plot
        ax = axes[0]
        ax.scatter(
            self.df['modelled_lgd'],
            self.df['realised_lgd'],
            alpha=0.6,
            s=self.df['ead_at_default'] / self.df['ead_at_default'].max() * 200,
            c=self.df['lgd_variance'],
            cmap='RdYlGn_r'
        )
        ax.plot([0, 1], [0, 1], 'k--', label='Perfect calibration')
        ax.set_xlabel('Modelled LGD', fontsize=12)
        ax.set_ylabel('Realised LGD', fontsize=12)
        ax.set_title('LGD Back-test: Modelled vs Realised', fontsize=13)
        ax.legend()
        ax.grid(True, alpha=0.3)

        # Variance distribution
        ax2 = axes[1]
        ax2.hist(
            self.df['lgd_variance'],
            bins=30, color='steelblue', edgecolor='white', alpha=0.8
        )
        ax2.axvline(0, color='black', linewidth=2, label='Zero variance')
        ax2.axvline(
            self.df['lgd_variance'].mean(),
            color='red', linewidth=2, linestyle='--',
            label=f'Mean: {self.df["lgd_variance"].mean():.1%}'
        )
        ax2.set_xlabel('LGD Variance (Realised − Modelled)', fontsize=12)
        ax2.set_ylabel('Count', fontsize=12)
        ax2.set_title('Distribution of LGD Variance', fontsize=13)
        ax2.legend()
        ax2.grid(True, alpha=0.3)

        plt.suptitle('LGD Model Back-Testing Results', fontsize=15, fontweight='bold')
        plt.tight_layout()
        plt.show()


# ============================================================
# 4. RECOVERY CURVE ANALYSIS
# ============================================================

def plot_recovery_curves(
    recovery_data: pd.DataFrame,
    group_col: str = 'collateral_type'
) -> pd.DataFrame:
    """
    Plot cumulative recovery curves by group.
    Shows what % of ultimate recovery is collected by each month.

    Parameters:
    - recovery_data: DataFrame with columns:
        case_id, group_col, months_from_default, cumulative_recovery_pct
    """
    fig, ax = plt.subplots(figsize=(12, 7))
    colors = plt.cm.Set1(np.linspace(0, 1, recovery_data[group_col].nunique()))

    summary = []
    for (group, group_df), color in zip(
        recovery_data.groupby(group_col), colors
    ):
        curve = group_df.groupby('months_from_default')[
            'cumulative_recovery_pct'
        ].mean()
        ax.plot(
            curve.index, curve.values,
            '-o', label=group, color=color, linewidth=2, markersize=4
        )

        # Find month when 80% of ultimate recovery is achieved
        months_to_80pct = curve[curve >= 80].index.min() if any(curve >= 80) else None
        summary.append({
            'group': group,
            'avg_recovery_12m': curve.get(12, np.nan),
            'avg_recovery_24m': curve.get(24, np.nan),
            'months_to_80pct': months_to_80pct
        })

    ax.axhline(80, color='grey', linestyle='--', alpha=0.7, label='80% recovery level')
    ax.set_xlabel('Months from Default', fontsize=12)
    ax.set_ylabel('Cumulative Recovery (% of Ultimate)', fontsize=12)
    ax.set_title('Recovery Curves by Collateral Type', fontsize=14, fontweight='bold')
    ax.legend(loc='lower right')
    ax.grid(True, alpha=0.3)
    ax.set_xlim(0, 60)
    ax.set_ylim(0, 105)
    plt.tight_layout()
    plt.show()

    return pd.DataFrame(summary)


# ============================================================
# 5. WRITE-OFF ANALYSIS
# ============================================================

def calculate_write_off_amount(
    gross_carrying_amount: float,
    expected_recovery_pv: float,
    current_provision: float,
    safety_margin_pct: float = 0.10
) -> dict:
    """
    Calculate the appropriate economic write-off amount.

    Write-off amount = gross carrying amount − expected recovery
    (with a safety margin retained as provision for residual uncertainty)
    """
    net_book_value = gross_carrying_amount - current_provision
    required_provision = gross_carrying_amount - expected_recovery_pv
    provision_gap = required_provision - current_provision

    # Write off the amount beyond expected recovery plus safety margin
    write_off_threshold = expected_recovery_pv * (1 + safety_margin_pct)
    write_off_amount = max(0, gross_carrying_amount - write_off_threshold)

    # Provision required post-write-off
    remaining_carrying_amount = gross_carrying_amount - write_off_amount
    provision_post_write_off = max(0, remaining_carrying_amount - expected_recovery_pv)

    return {
        'gross_carrying_amount': gross_carrying_amount,
        'current_provision': current_provision,
        'net_book_value': net_book_value,
        'expected_recovery_pv': expected_recovery_pv,
        'required_provision': required_provision,
        'provision_gap': provision_gap,
        'recommended_write_off_amount': write_off_amount,
        'remaining_carrying_post_write_off': remaining_carrying_amount,
        'provision_post_write_off': provision_post_write_off,
        'net_p_l_impact': provision_gap  # additional charge to P&L before write-off
    }


if __name__ == '__main__':
    # Waterfall example
    waterfall = RecoveryWaterfall(
        fixed_charge_proceeds=8_500_000,
        floating_charge_proceeds=4_200_000,
        admin_costs=650_000,
        preferential_creditors=280_000,
        bank_fixed_charge_claim=10_000_000,
        bank_floating_charge_claim=8_500_000,
        bank_unsecured_claim=0,
        other_unsecured_creditors=3_200_000
    )
    waterfall.print_waterfall()

    # Write-off analysis
    wo = calculate_write_off_amount(
        gross_carrying_amount=18_500_000,
        expected_recovery_pv=4_150_000,
        current_provision=14_200_000
    )
    print("\nWRITE-OFF ANALYSIS:")
    for k, v in wo.items():
        print(f"  {k:<40}: £{v:>12,.0f}")
```

## 11. Interview Questions

**Q1: What is the difference between an LPA Receiver and an Administrator?**
A: An LPA Receiver is appointed under Section 101 of the Law of Property Act 1925. Their primary duty is to the appointing mortgagee (the bank). They typically act over specific real property, have power to collect rents, manage the property, and sell it. They do not manage the whole business. An Administrator is appointed under the Insolvency Act 1986 by either the court or (in the case of a bank with a qualifying floating charge) the bank. The Administrator's primary objective is statutory — to rescue the company, achieve a better result than liquidation, or realise assets. They have powers over the whole company and its assets. An Administrator's duty is to all creditors, not just the appointing bank.

**Q2: What is the Prescribed Part and why does it matter to the bank?**
A: Under Section 176A of the Insolvency Act 1986, where floating charge realisations are made available to a floating charge holder, the Administrator must ring-fence a portion (the "Prescribed Part") for unsecured creditors. The formula: 50% of the first £10,000, plus 20% of the remainder, capped at £600,000. This directly reduces the proceeds available to the bank as floating charge holder. For floating charge-heavy recoveries, the bank must account for the Prescribed Part in its recovery projections.

**Q3: What is the difference between an economic write-off and a legal write-off?**
A: An economic write-off (or "accounting write-off") reduces the gross carrying amount and the associated provision to zero (or to the expected residual recovery amount) on the balance sheet. The legal debt is NOT extinguished — the bank can still pursue recovery and any cash collected post-write-off is credited to P&L. A legal write-off formally releases the borrower from all obligations and extinguishes the legal debt. Legal write-offs are rare: banks maintain the legal right to recover even after economic write-off, because conditions can change (e.g., a guarantor comes into money years later, a property recovers value).

**Q4: What is a pre-pack Administration and what are the bank's interests in it?**
A: A pre-pack Administration involves the Administrator conducting a marketing and sale process for the business before appointment, then completing the sale immediately on appointment (to avoid the uncertainty and value destruction of a public Administration). The bank's interests: (a) as floating charge holder, the bank must consent to a material pre-pack sale; (b) a pre-pack maximises business value (going concern premium), which improves bank recovery; (c) the bank must ensure the SIP 16 statement (the Administrator's justification for the pre-pack) adequately documents that the price achieved is the best available; (d) pre-packs to related parties (e.g., existing management) attract regulatory scrutiny and require particularly robust justification.

**Q5: How does LGD back-testing improve credit risk management?**
A: LGD back-testing compares modelled LGD (predicted at origination) to realised LGD (actual outcome). Systematic biases in modelled LGD lead to under- or over-provisioning. If realised LGD consistently exceeds modelled LGD for, say, floating charge security over stock, the bank should increase its LGD estimate for this security type. This improves the accuracy of IFRS 9 provisions, reduces surprise losses, and provides better data for Basel IRB capital calculations. Regulatory requirements (PRA SS3/19) mandate regular back-testing of internal LGD models. Back-testing data is also valuable for pricing new loans: if actual LGD in a sector is 60% but modelled LGD was 40%, the bank may have been under-charging for credit risk.

## 12. Common Mistakes

**Mistake 1: Failing to register security correctly.** A fixed charge must be registered at Companies House within 21 days. A property mortgage must be registered at HM Land Registry. Failure to register can make the security void against a liquidator or Administrator. Legal teams must audit the security position at the first sign of distress.

**Mistake 2: Overestimating security realisable values.** RICS valuations assume a proper marketing period and willing buyer. Forced sale values are typically 20-40% below RICS Red Book values for property, and far lower for plant and equipment. Recovery models that use RICS values without a forced sale discount overstate expected recovery and understate provisions.

**Mistake 3: Ignoring preferential creditors and the prescribed part.** Banks sometimes build recovery models that ignore HMRC's Crown Preference and the prescribed part. Both reduce the net proceeds available to the bank as floating charge holder. The Finance Act 2020 significantly increased HMRC's preferential claim (reinstating Crown Preference for VAT, PAYE, and employee NI). This was not reflected in LGD models built before 2020.

**Mistake 4: Not pursuing personal guarantees.** Personal guarantees from directors/shareholders are security and should be actively pursued. Banks sometimes fail to call guarantees promptly, allow the limitation period to expire (6 years), or fail to properly serve demand. Guarantee enforcement should be a parallel track, not an afterthought.

**Mistake 5: Failing to document the LGD back-test data.** Recovery case data must be captured in a structured format to support LGD model back-testing. Banks that maintain poor recovery records find it impossible to validate LGD models, which becomes a regulatory finding.

**Mistake 6: Continuing to accrue interest on Stage 3 assets at the gross rate.** Under IFRS 9, interest on Stage 3 assets must be calculated on the net carrying amount. Banks that continue to accrue at the gross rate are overstating interest income and potentially breaching IFRS 9.

## 13. Case Studies

**Case Study 1: Pre-pack Administration — Engineering Component Manufacturer**

A bank had a £14m floating charge debenture over a specialist aerospace components manufacturer (200 employees, £22m turnover). The company was loss-making for 3 consecutive years and the bank's restructuring efforts failed. The IBR identified: the underlying business (key customer relationships, precision manufacturing capability, NADCAP certification) had going concern value of approximately £18m to a trade buyer, but the legal entity had liabilities of £32m (including pension deficit and HMRC arrears). The bank approved a pre-pack Administration: the business was sold to a US aerospace group for £17.5m, with the transaction completing 2 hours after the Administrator's appointment. Bank recovery: £13.8m (98.6% of outstanding balance). Without the pre-pack, a conventional Administration with uncertainty around customer contract continuity would have realised an estimated £9-11m.

**Case Study 2: LGD Model Under-Prediction — Retail Portfolio**

A bank's internal LGD model predicted 35% LGD for unsecured retail lending backed by personal guarantees. The model was calibrated on 2010-2019 data. Following the post-COVID insolvency wave of 2020-2022, the bank back-tested 45 completed recovery cases. Average realised LGD was 58% — 23 percentage points above modelled. Analysis revealed: (a) the Covid period reduced asset values (stocks, equipment) significantly below historical; (b) HMRC's reinstated Crown Preference absorbed a larger share of floating charge proceeds than modelled; (c) personal guarantee enforcement was hampered by guarantors' personal insolvencies. The bank increased its retail sector LGD estimate to 55%, requiring £12m of additional provisioning across the performing portfolio.

## 14. Iterative Reinforcement

**Exercise 1: Waterfall analysis.** Use the Python `RecoveryWaterfall` class. Input realistic security values for a commercial property borrower with £15m outstanding. Vary the property valuation from £20m to £10m (simulating a market downturn). What is the bank's recovery at each valuation? What is the implied LGD?

**Exercise 2: LGD back-testing.** Construct a synthetic dataset of 50 completed recovery cases with varied collateral types and sectors. Run the `LGDBacktester` class. Identify which collateral types show the largest variance from the model. What model calibration changes would you recommend?

**Exercise 3: Pre-pack vs conventional.** For a business with: going concern value £12m, asset break-up value £7m, bank claim £13m, HMRC preferential £400,000, Admin costs 5% of realisations. Calculate bank recovery under (a) pre-pack at going concern value, (b) conventional admin realising 85% of going concern value, (c) immediate liquidation at break-up value. Which is best for the bank?

**Exercise 4: Write-off calculation.** A defaulted loan has: GCA £10m, provision £6m, expected recovery PV £3.2m. Using the `calculate_write_off_amount` function with a 10% safety margin, calculate: the appropriate write-off amount, the remaining carrying amount, the provision required post-write-off, and the net P&L impact.

**Exercise 5: Recovery curve.** Plot a recovery curve for a property-backed portfolio using the `plot_recovery_curves` function. Assume cumulative recoveries at 6, 12, 18, 24, 36, 48 months. What proportion of ultimate recovery is typically received within 24 months?

## 15. Source Material

**Legislation:**
- Insolvency Act 1986 (as amended) — Administration (Schedule B1), Liquidation (Part IV), CVA (Part I), s176A Prescribed Part
- Law of Property Act 1925 — ss101-107: LPA Receiver powers
- Companies Act 2006, Part 26A — Restructuring Plan
- Finance Act 2020 — reinstatement of Crown Preference (HMRC)
- Corporate Insolvency and Governance Act 2020 — Moratorium, Restructuring Plan
- Enterprise Act 2002 — abolition of administrative receivership for floating charges created post-September 2003

**Regulatory:**
- EBA/GL/2018/06: Management of NPE — Section 6 (disposal and write-off)
- CRR2 Article 469a: NPE coverage requirements
- IFRS 9 paragraphs 5.4.4 (write-off) and B5.5.37-B5.5.40 (credit-impaired)
- PRA SS3/19: Credit risk — LGD model requirements
- EBA Guidelines on Definition of Default (EBA/GL/2016/07)

**Practitioner references:**
- Cork, Sir Kenneth: "The Cork Report" (1982) — foundational review of UK insolvency law
- Totty, P.: "Corporate Insolvency Law" (Sweet & Maxwell) — Administration, LPA Receiver
- Statement of Insolvency Practice 16 (SIP 16): Pre-packaged Sales in Administration
- R3 Association of Business Recovery Professionals: "Pre-pack Pool" guidance
- HMRC guidance: "When HMRC is a preferential creditor in insolvency" (gov.uk)

**Academic:**
- Davydenko, S., Franks, J. (2008): "Do Bankruptcy Codes Matter?" — comparative LGD analysis
- Franks, J., Sussman, O. (2005): "Financial Distress and Bank Restructuring of SMEs", Review of Finance
- Moody's: "Ultimate Recovery Database" — empirical LGD statistics

**Case law:**
- Re Nortel GmbH [2013] UKSC 52 — Administrator's expenses priority
- Re Lehman Brothers International (Europe) [2012] — complex security enforcement
- Re Virgin Active Holdings [2021] EWHC 1246 — Restructuring Plan and cross-class cram-down
- Buchler v Talbot [2004] UKHL 9 — order of priority: Administration expenses
