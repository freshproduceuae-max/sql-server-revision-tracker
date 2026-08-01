# M42 — Loan Booking and Operations

## 1. Business Purpose

Loan booking is the process by which a loan, once legally documented and all conditions precedent satisfied, is recorded in the bank's operational systems, made available for drawdown, and maintained throughout its life. It is the operational bridge between the credit decision process and the ongoing management of the loan.

Accurate loan booking is not merely administrative — it is a fundamental credit risk control. The loan booking record defines the bank's contractual exposure to the borrower: the approved limit (the maximum the borrower can draw), the current outstanding, the maturity date, the repayment schedule, and the risk classification (internal rating, IFRS 9 stage). An incorrectly booked loan can result in: credit limits being exceeded without detection, risk-weighted assets being miscalculated, IFRS 9 provisions being applied to the wrong amount or the wrong stage, regulatory capital being understated or overstated, and management information being misleading.

The loan operations team (also called loan servicing, credit operations, or middle office) is responsible for the physical booking of loans in the bank's systems. They work from a drawdown instruction (notice of utilisation) received from the borrower, cross-checked against the facility documentation to verify that all conditions are met. The credit team, legal team, and operations team must all sign off before a drawdown is processed.

The loan operations process is also the entry point for the bank's data architecture. Information entered at booking — obligor ID, facility type, pricing, security reference, risk rating, IFRS 9 stage — flows downstream to the general ledger, the regulatory reporting system, the IFRS 9 provisioning engine, the RWA calculation engine, and the management information system. Data quality at booking is therefore critical: errors introduced at this stage propagate through every downstream process.

Throughout the life of the loan, operations is also responsible for: processing interest and principal payments, tracking accruals, calculating and collecting fees, monitoring covenant compliance (in conjunction with the RM), processing drawdowns and repayments on revolving facilities, and managing loan maturities and renewals. Each of these activities involves both the loan management system and the bank's general ledger.

## 2. Accounting Concepts

**Initial Recognition under IFRS 9:** When a loan is booked, it is initially recognised on the balance sheet at fair value (which, for most corporate loans, equals the principal advanced, net of directly attributable transaction costs such as arrangement fees that are integral to the effective interest rate). For a drawn term loan, the initial carrying amount = amount drawn minus net origination fees. For an undrawn revolving facility, the commitment is recognised off-balance-sheet.

**Effective Interest Rate (EIR):** IFRS 9 requires loans classified as measured at amortised cost to be measured using the effective interest method. The EIR is the rate that exactly discounts estimated future cash flows (interest, fees, principal) over the expected life of the loan to the initial carrying amount. The EIR is higher than the contractual margin because it includes the amortisation of origination fees. The loan operations system must calculate and store the EIR at booking.

**Accrual Accounting for Interest:** Interest is recognised on an accruals basis — it is earned daily from the drawdown date, regardless of the payment frequency. The loan system accrues interest daily (daily_rate = EIR/365 × outstanding balance) and credits it to the income statement. On the interest payment date, the cash receipt is matched against the accrual.

**Fee Accrual:** Commitment fees on undrawn revolving credit are accrued daily over the availability period: fee_rate/365 × undrawn_amount. Arrangement fees that are integral to the EIR are not recognised upfront — they are deducted from the initial carrying amount and amortised. Non-integral fees (e.g., agency fees that relate to services provided rather than the credit) are recognised as income when earned.

**IFRS 9 ECL Provisioning:** At each reporting date (at least quarterly), the loan system interfaces with the IFRS 9 provisioning engine to calculate the expected credit loss for each facility. The ECL is recognised as a provision on the balance sheet (credit loss allowance) and charged to the income statement (impairment expense). The provisioning engine requires: the IFRS 9 stage (1, 2, or 3), the PD (12-month for Stage 1, lifetime for Stage 2/3), the LGD, and the EAD.

**Derecognition:** A loan is derecognised (removed from the balance sheet) when the contractual rights to the cash flows expire, are transferred, or are extinguished. This occurs at: scheduled maturity and repayment, early repayment/prepayment, write-off (after recovery proceedings are exhausted), or sale of the loan in the secondary market (subject to derecognition tests under IFRS 9).

## 3. Financial Concepts

**Key Data Fields in the Loan Booking Record:**

| Field | Description | Data Type |
|---|---|---|
| Obligor_ID | Unique identifier for the borrower entity | VARCHAR |
| Group_ID | Identifier for the borrower group (for group exposure aggregation) | VARCHAR |
| Facility_ID | Unique identifier for this specific facility | VARCHAR |
| Facility_Type | RCF, TL, OD, LC, etc. | ENUM |
| Approved_Limit | Maximum amount available to draw | DECIMAL |
| Currency | Currency of the facility | CHAR(3) |
| Drawdown_Date | Date of first (or current) drawdown | DATE |
| Maturity_Date | Final repayment date | DATE |
| Outstanding | Current drawn balance | DECIMAL |
| Available | Approved_Limit minus Outstanding | DECIMAL |
| Repayment_Schedule | Amortisation schedule (for TL) | SCHEDULE_REF |
| Pricing_Base | Reference rate (SONIA, SOFR, etc.) | VARCHAR |
| Margin_Pct | Credit spread above reference rate | DECIMAL |
| EIR_Pct | Effective interest rate | DECIMAL |
| Security_Reference | Link to security register | VARCHAR |
| Internal_Rating | Borrower's current internal risk rating | INT |
| Rating_Date | Date of most recent rating assignment | DATE |
| IFRS9_Stage | 1, 2, or 3 | INT |
| PD_Pct | Current 12-month PD | DECIMAL |
| LGD_Pct | Loss given default assumption | DECIMAL |
| EAD | Exposure at default (drawn + CCF × undrawn) | DECIMAL |
| ECL_Amount | Expected credit loss provision | DECIMAL |
| RWA | Risk-weighted assets | DECIMAL |
| GL_Account | General ledger account code | VARCHAR |
| Originating_RM | RM responsible for the relationship | VARCHAR |
| Status | ACTIVE, REPAID, DEFAULTED, WRITTEN_OFF | ENUM |

**Credit Management System (CMS) vs Loan Servicing System (LSS):**

The CMS is the system of record for credit risk information: internal ratings, IFRS 9 stages, ECL amounts, credit limits, covenant compliance, and credit approval history. It is owned by the credit risk function and is the master data source for risk reporting.

The Loan Servicing System (LSS) — also called the loan management system (LMS) or core banking system — is the operational system of record for transaction-level data: drawdowns, repayments, interest accruals, fee collections, and outstanding balances. It is owned by operations.

The CMS and LSS must be reconciled: the LSS holds the definitive outstanding balance; the CMS holds the definitive risk classification. For reporting purposes, these systems are joined at the Facility_ID level. Reconciliation breaks — where the LSS shows a facility exists that the CMS does not have a credit record for, or vice versa — are a data quality issue requiring urgent resolution.

**Limit Management:** The operations team monitors credit utilisation against approved limits in real time. For revolving facilities, the available amount is recalculated after every drawdown and repayment. If a drawdown request would cause the outstanding to exceed the approved limit, the operations team must reject the drawdown and notify the RM and credit team. An excess — a drawn balance exceeding the approved limit — is a policy breach requiring immediate escalation and formal approval.

**System Interfaces:**
- LSS → General Ledger: Daily interface posting interest accruals, fee accruals, cash receipts, drawdowns, and repayments to the appropriate GL accounts.
- CMS → IFRS 9 Provisioning Engine: Period-end interface passing facility data and risk parameters for ECL calculation.
- CMS → RWA Engine: Daily or monthly interface feeding the regulatory capital calculation.
- CMS → Management Information System: Periodic extract for portfolio reporting (rating distribution, exposure by sector, IFRS 9 staging, etc.).
- LSS → Regulatory Reporting System (COREP/FINREP): Exposure data for regulatory capital and financial returns submitted to the PRA.

## 4. Statistical Concepts

**Credit Conversion Factor (CCF):** For undrawn revolving credit facilities, the CCF converts the undrawn commitment into a credit equivalent for RWA purposes. Under the Basel Standardised Approach: CCF of 20% for unconditionally cancellable commitments (overdrafts), 40% for other commitments with original maturity ≤ 1 year, and 75% for commitments with original maturity > 1 year. For IRB banks, the CCF is model-estimated. Booking the correct facility type and tenor at loan booking is therefore directly relevant to regulatory capital.

**EAD (Exposure at Default):** For a term loan, EAD = outstanding amount at default. For a revolving facility, EAD = drawn amount + CCF × undrawn amount (since borrowers tend to draw down their facilities as financial stress increases). The loan booking record must correctly identify facility type, approved limit, and outstanding to enable accurate EAD calculation.

**Amortised Cost Calculation:** The carrying amount of a loan under amortised cost (IFRS 9) = initial recognition amount + interest accrued using EIR − principal repayments received − impairment losses. The LSS calculates this continuously. Any deviation between the system-calculated amortised cost and the expected amount is a data integrity flag.

**Interest Rate Sensitivity (DV01):** For interest rate risk reporting, operations captures whether the facility is floating rate (linked to SONIA/SOFR) or fixed rate. For floating rate loans, the loan system calculates the DV01 — the change in the present value of future cash flows for a 1 basis point change in interest rates. This is fed to the IRRBB (Interest Rate Risk in the Banking Book) reporting system.

## 5. Regulatory Framework

**PRA Rulebook — Credit Risk:** The PRA requires banks to have robust systems for recording and monitoring credit exposures. PS17/23 (Implementation of the Basel 3.1 standards) introduces updated capital treatment for various loan types, requiring loan booking systems to correctly classify facilities by asset class, collateral type, and borrower type for RWA calculation purposes.

**COREP (Common Reporting):** The standardised EU/UK regulatory reporting framework for capital adequacy. Banks submit COREP returns to the PRA quarterly, showing credit RWA by asset class, geographic region, and sector. The data feeding COREP comes from the loan booking system via the regulatory reporting interface. Errors in loan booking data directly affect COREP returns.

**FINREP (Financial Reporting):** FINREP returns report balance sheet and P&L information to the PRA. Loan portfolios are reported with breakdown by IFRS 9 stage, provision coverage, non-performing loan status, and sector. Again, the primary data source is the loan booking system.

**Large Exposures Framework (CRR Article 395–401):** The Large Exposures regime limits any single-name exposure to 25% of the bank's eligible capital. The operations team monitors group-level exposures (all facilities across all entities within a borrower group, aggregated via the Group_ID field in the booking record) against the Large Exposures limit. A proposed drawdown that would breach the Large Exposures limit must be blocked pending regulatory approval or reduction.

**Bank of England XBRL Reporting:** PRA-regulated banks submit regulatory returns in XBRL format. The taxonomy requires specific data fields that trace back to loan booking records: obligor identifiers, facility types, maturity bands, outstanding amounts, risk weights, and IFRS 9 stages.

**AML Transaction Monitoring:** The loan operations system interfaces with the bank's AML transaction monitoring system. Drawdown receipts and repayment sources are screened for suspicious patterns. An unusual repayment (e.g., a large cash repayment when the borrower's business is credit-based) may trigger an AML alert.

## 6. Data Required

**To book a new loan drawdown, operations requires:**

- Signed Facility Agreement (executed copy, filed in document management system)
- Evidence that all CPs are satisfied (CP checklist, signed off by legal and credit)
- Drawdown Notice (formal notice from borrower specifying amount, date, and account for credit)
- Confirmation that no Event of Default exists and repeating representations are true
- Credit approval reference number (linking the booking to the credit approval decision)
- Internal risk rating and IFRS 9 stage (from CMS, populated by credit analyst)
- PD, LGD, and CCF parameters (from credit risk function)
- RWA calculation from the risk engine
- GL account codes for posting
- Security reference number (confirming security is registered and perfected)
- RM and analyst names for ownership assignment

**For ongoing loan management, operations also maintains:**

- Repayment schedule (for term loans: each principal instalment, date, and amount)
- Interest rate reset dates (for floating rate loans, rate resets occur each SONIA period)
- Covenant test dates and results (input from RM/covenant compliance team)
- Fee collection dates and amounts
- Maturity diary (automated alerts for facilities approaching maturity)

## 7. How Analysts Actually Work

**The Drawdown Process Step-by-Step:**

1. **Drawdown Notice Received:** The borrower submits a formal drawdown notice (typically required 3 business days before the requested drawdown date for term loans; same-day or next-day for revolving facilities with shorter notice periods as specified in the Facility Agreement).

2. **CP Satisfaction Check:** Operations verifies against the CP checklist that all conditions precedent to utilisation are satisfied. For subsequent drawdowns on a revolving facility, operations verifies ongoing conditions: no Event of Default, repeating representations true, drawdown notice received within the required notice period.

3. **Limit Check:** Operations verifies that the requested drawdown amount does not cause the facility outstanding to exceed the approved limit. The Group_ID is checked to ensure no Large Exposures breach at group level.

4. **Credit Team Sign-off:** For first drawdowns and significant drawdowns (above a threshold), the credit team confirms that no credit concerns have arisen since approval that would affect the bank's willingness to advance.

5. **Legal Confirmation:** The bank's solicitors (or internal legal team) confirm that all CPs are satisfied and the security is in place and perfected.

6. **System Booking:** Operations books the drawdown in the LSS: debit the loan asset account, credit the borrower's current account (or nostro for payment to a third party). The outstanding balance is updated. EIR accrual commences from the drawdown date.

7. **CMS Update:** The credit risk system is updated to reflect the new outstanding balance, updated EAD, and (if first drawdown) activation of the IFRS 9 ECL engine for this facility.

8. **GL Posting:** The LSS posts the drawdown to the general ledger: loan receivable (asset account) is debited, funding account is credited (representing the bank advancing funds).

**Revolving Facility Management:** Revolving credits require daily monitoring of drawdown and repayment activity. The operations team processes requests within the agreed notice period, checks limits on each drawdown, and monitors the facility's availability. A facility that is persistently fully utilised is flagged to the RM and credit team as a potential early warning indicator.

**Interest Payment Processing:** On each interest payment date, the LSS generates the interest due calculation (using the EIR applied to the daily outstanding balance). The operations team sends a notice to the borrower (or debits the borrower's account directly under a direct debit mandate). Receipt of payment is matched to the accrual. If payment is not received by the due date (or within the grace period specified in the Facility Agreement), an overdue flag is raised and the credit team is notified.

**Data Quality Controls at Booking:**
- Mandatory field validation: no booking can be completed without all mandatory fields populated.
- Dual-entry verification: interest rate, maturity date, and facility amount are verified by a second operator or against an automated check against the signed Facility Agreement data.
- CMS-LSS reconciliation: daily automated reconciliation of outstanding balances between the CMS and LSS. Breaks are investigated and resolved within 24 hours.
- Rating and stage validation: the booking system cross-checks that the IFRS 9 stage is consistent with the internal rating (a Stage 1 classification with an internal rating of 9+ triggers an exception requiring credit sign-off).

## 8. Excel Implementation

```excel
' ===== LOAN AMORTISATION SCHEDULE =====
' Sheet: Amortisation

' Inputs (Row 1 = headers, Row 2 = values)
B1: Loan Amount (£m)         = 15.0
B2: Drawdown Date            = 01/07/2025
B3: Maturity Date            = 30/06/2030
B4: Margin (%)               = 2.25%
B5: SONIA Rate (%)           = 4.75%
B6: Arrangement Fee (£m)     = 0.225  ' = 1.5% of £15m
B7: EIR (%)                  [use RATE or XIRR function over cash flows]

' Quarterly amortisation schedule
' Columns: A=Period, B=Date, C=Opening Balance, D=Interest, E=Principal, F=Closing Balance
A6:  1
B6:  =B2+90   ' Approximate; use EDATE for exact
C6:  =B1-B6  ' Opening balance = loan amount minus arrangement fee
D6:  =C6*(B4+B5)/4   ' Quarterly interest
E6:  =B1/20           ' 5-year quarterly: 20 equal instalments
F6:  =C6-E6

' Subsequent periods
C7:  =F6   ' Opening = prior closing
[repeat D-F formulas]

' EIR calculation using XIRR
' Cash flows: -net_proceeds at t=0, then interest + principal at each period
' =XIRR({-14.775, 0.261, ..., 15.261}, {date0, date1, ..., date_n})

' ===== INTEREST ACCRUAL CALCULATOR =====
' Sheet: Accrual

B5: Outstanding (£m)         [from LSS feed]
B6: SONIA (daily, %)         [from reference rate feed]
B7: Margin (%)               [from booking record]
B8: All-in Rate (% pa)       =B6+B7
B9: Daily Accrual (£)        =B5*1000000*B8/100/365

' Monthly accrual
B11: Days in Month           =DAY(EOMONTH(TODAY(),0))
B12: Monthly Accrual (£)     =B9*B11

' ===== FACILITY BOOKING DATA ENTRY CHECKLIST =====
' Sheet: Booking_Checklist
' Every field validated before booking is confirmed

A2:  Obligor ID              [mandatory, must match CMS]
A3:  Group ID                [mandatory, group exposure check]
A4:  Facility ID             [system-generated, unique]
A5:  Facility Type           [validated against approved types list]
A6:  Approved Limit (£m)     [matches credit approval to 2dp]
A7:  Currency                [ISO 4217 code]
A8:  Drawdown Date           [cannot be future-dated beyond 5 days]
A9:  Maturity Date           [must be > drawdown date]
A10: Margin (%)              [matches signed FA to 4dp]
A11: Reference Rate          [validated against active rates]
A12: EIR (%)                 [system-calculated, must be > margin]
A13: Arrangement Fee (£m)    [must match FA, reduces initial carrying amt]
A14: Security Reference      [must exist in security register]
A15: Internal Rating         [must be active rating from CMS]
A16: IFRS9 Stage             [1, 2, or 3 — validated vs rating]
A17: PD (%)                  [from CMS, >0]
A18: LGD (%)                 [from CMS, between 0-100]
A19: GL Account              [validated against chart of accounts]
A20: Approval Reference      [must link to approved credit paper in CMS]

' Validation: all mandatory fields complete
=IF(COUNTA(B2:B20)=COUNTA(A2:A20),"READY TO BOOK","INCOMPLETE — "&(COUNTA(A2:A20)-COUNTA(B2:B20))&" fields missing")
```

## 9. SQL Implementation

```sql
-- ===== LOAN BOOKING RECORD — MASTER TABLE =====
-- Core booking data joined across LSS and CMS

SELECT
    lb.facility_id,
    lb.obligor_id,
    c.client_name,
    c.group_id,
    lb.facility_type,
    lb.approved_limit_m,
    lb.currency,
    lb.drawdown_date,
    lb.maturity_date,
    DATEDIFF(DAY, GETDATE(), lb.maturity_date) AS days_to_maturity,
    lb.outstanding_m,
    lb.approved_limit_m - lb.outstanding_m AS available_m,
    ROUND(lb.outstanding_m / NULLIF(lb.approved_limit_m, 0) * 100, 1) AS utilisation_pct,
    lb.margin_pct,
    lb.reference_rate,
    lb.eir_pct,
    lb.arrangement_fee_m,
    lb.security_reference,
    cr.internal_rating,
    cr.ifrs9_stage,
    cr.pd_pct,
    cr.lgd_pct,
    cr.ead_m,
    cr.ecl_amount_m,
    cr.rwa_m,
    lb.gl_account,
    lb.rm_name,
    lb.status,
    lb.booking_date,
    lb.booked_by
FROM loan_bookings lb
JOIN clients c ON lb.obligor_id = c.client_id
LEFT JOIN credit_risk_data cr ON lb.facility_id = cr.facility_id
WHERE lb.status = 'ACTIVE'
ORDER BY lb.outstanding_m DESC;

-- ===== DRAWDOWN NOTICE PROCESSING QUEUE =====
SELECT
    dn.notice_id,
    c.client_name,
    lb.facility_id,
    lb.facility_type,
    lb.approved_limit_m,
    lb.outstanding_m,
    dn.requested_amount_m,
    lb.outstanding_m + dn.requested_amount_m AS post_drawdown_balance,
    CASE
        WHEN lb.outstanding_m + dn.requested_amount_m > lb.approved_limit_m
        THEN 'EXCESS — BLOCKED'
        WHEN dn.cp_check_complete = 0 THEN 'AWAITING CP CHECK'
        WHEN dn.credit_signoff = 0 THEN 'AWAITING CREDIT SIGNOFF'
        ELSE 'READY TO PROCESS'
    END AS processing_status,
    dn.requested_drawdown_date,
    DATEDIFF(DAY, GETDATE(), dn.requested_drawdown_date) AS days_until_drawdown,
    dn.received_date
FROM drawdown_notices dn
JOIN loan_bookings lb ON dn.facility_id = lb.facility_id
JOIN clients c ON lb.obligor_id = c.client_id
WHERE dn.status = 'PENDING'
ORDER BY dn.requested_drawdown_date;

-- ===== CMS–LSS RECONCILIATION =====
-- Find discrepancies between credit system and loan servicing system
SELECT
    ISNULL(cms.facility_id, lss.facility_id) AS facility_id,
    cms.outstanding_m AS cms_outstanding,
    lss.outstanding_m AS lss_outstanding,
    cms.outstanding_m - lss.outstanding_m AS variance_m,
    CASE
        WHEN cms.facility_id IS NULL THEN 'IN LSS ONLY — NOT IN CMS'
        WHEN lss.facility_id IS NULL THEN 'IN CMS ONLY — NOT IN LSS'
        WHEN ABS(cms.outstanding_m - lss.outstanding_m) > 0.001 THEN 'BALANCE MISMATCH'
        ELSE 'OK'
    END AS reconciliation_status
FROM (
    SELECT facility_id, outstanding_m FROM credit_risk_data WHERE status = 'ACTIVE'
) cms
FULL OUTER JOIN (
    SELECT facility_id, outstanding_m FROM loan_bookings WHERE status = 'ACTIVE'
) lss ON cms.facility_id = lss.facility_id
WHERE ISNULL(cms.outstanding_m, 0) <> ISNULL(lss.outstanding_m, 0)
   OR cms.facility_id IS NULL
   OR lss.facility_id IS NULL
ORDER BY ABS(ISNULL(cms.outstanding_m, 0) - ISNULL(lss.outstanding_m, 0)) DESC;

-- ===== INTEREST ACCRUAL REPORT =====
SELECT
    lb.facility_id,
    c.client_name,
    lb.outstanding_m,
    lb.eir_pct,
    lb.outstanding_m * lb.eir_pct / 100 / 365 AS daily_accrual_m,
    lb.outstanding_m * lb.eir_pct / 100 / 12 AS monthly_accrual_estimate_m,
    lb.last_interest_payment_date,
    lb.next_interest_payment_date,
    DATEDIFF(DAY, lb.last_interest_payment_date, GETDATE()) AS days_accrued,
    lb.outstanding_m * lb.eir_pct / 100 / 365
        * DATEDIFF(DAY, lb.last_interest_payment_date, GETDATE()) AS accrued_to_date_m
FROM loan_bookings lb
JOIN clients c ON lb.obligor_id = c.client_id
WHERE lb.status = 'ACTIVE'
ORDER BY accrued_to_date_m DESC;

-- ===== MATURITY DIARY =====
SELECT
    c.client_name,
    c.rm_name,
    lb.facility_id,
    lb.facility_type,
    lb.outstanding_m,
    lb.maturity_date,
    DATEDIFF(DAY, GETDATE(), lb.maturity_date) AS days_to_maturity,
    CASE
        WHEN DATEDIFF(DAY, GETDATE(), lb.maturity_date) < 0 THEN 'OVERDUE — MATURED'
        WHEN DATEDIFF(DAY, GETDATE(), lb.maturity_date) <= 30 THEN 'MATURING THIS MONTH'
        WHEN DATEDIFF(DAY, GETDATE(), lb.maturity_date) <= 90 THEN 'MATURING IN 90 DAYS'
        WHEN DATEDIFF(DAY, GETDATE(), lb.maturity_date) <= 180 THEN 'MATURING IN 6 MONTHS'
        ELSE 'OK'
    END AS maturity_status,
    cr.internal_rating,
    CASE WHEN cr.annual_review_due < lb.maturity_date THEN 'REVIEW REQUIRED BEFORE REFINANCE'
         ELSE 'REVIEW CURRENT' END AS review_status
FROM loan_bookings lb
JOIN clients c ON lb.obligor_id = c.client_id
LEFT JOIN credit_risk_data cr ON lb.facility_id = cr.facility_id
WHERE lb.status = 'ACTIVE'
  AND DATEDIFF(DAY, GETDATE(), lb.maturity_date) <= 180
ORDER BY lb.maturity_date;

-- ===== RWA BY FACILITY TYPE =====
SELECT
    lb.facility_type,
    COUNT(*) AS facility_count,
    SUM(lb.outstanding_m) AS total_outstanding_m,
    SUM(cr.ead_m) AS total_ead_m,
    AVG(cr.lgd_pct) AS avg_lgd_pct,
    AVG(cr.pd_pct) AS avg_pd_pct,
    SUM(cr.rwa_m) AS total_rwa_m,
    SUM(cr.rwa_m) / NULLIF(SUM(cr.ead_m), 0) * 100 AS avg_risk_weight_pct
FROM loan_bookings lb
JOIN credit_risk_data cr ON lb.facility_id = cr.facility_id
WHERE lb.status = 'ACTIVE'
GROUP BY lb.facility_type
ORDER BY total_rwa_m DESC;
```

## 10. Python Implementation

```python
import pandas as pd
import numpy as np
from dataclasses import dataclass, field
from typing import List, Optional, Tuple
from datetime import date, timedelta
from scipy.optimize import brentq


# ===== LOAN BOOKING RECORD =====

@dataclass
class LoanBookingRecord:
    """Complete loan booking record for a single facility."""

    # Identity
    obligor_id: str
    group_id: str
    facility_id: str
    client_name: str

    # Facility terms
    facility_type: str          # 'TL', 'RCF', 'OD', 'LC'
    approved_limit_m: float
    currency: str
    drawdown_date: date
    maturity_date: date

    # Pricing
    margin_pct: float
    reference_rate_pct: float
    arrangement_fee_pct: float
    commitment_fee_pct: float = 0.0

    # Outstanding
    outstanding_m: float = 0.0

    # Risk parameters (from CMS)
    internal_rating: int = 5
    ifrs9_stage: int = 1
    pd_pct: float = 0.50
    lgd_pct: float = 45.0
    ccf_pct: float = 75.0      # credit conversion factor for undrawn

    # References
    security_reference: str = ""
    approval_reference: str = ""
    gl_account: str = ""
    rm_name: str = ""

    # Status
    status: str = "ACTIVE"

    @property
    def available_m(self) -> float:
        return max(self.approved_limit_m - self.outstanding_m, 0)

    @property
    def utilisation_pct(self) -> float:
        return (self.outstanding_m / self.approved_limit_m * 100
                if self.approved_limit_m > 0 else 0)

    @property
    def all_in_rate_pct(self) -> float:
        return self.margin_pct + self.reference_rate_pct

    @property
    def days_to_maturity(self) -> int:
        return (self.maturity_date - date.today()).days

    @property
    def tenor_years(self) -> float:
        return (self.maturity_date - self.drawdown_date).days / 365.25

    @property
    def arrangement_fee_m(self) -> float:
        return self.approved_limit_m * self.arrangement_fee_pct / 100

    @property
    def net_initial_carrying_amount_m(self) -> float:
        """Initial carrying amount net of arrangement fee (for amortised cost)."""
        return self.outstanding_m - self.arrangement_fee_m

    @property
    def ead_m(self) -> float:
        """Exposure at default = drawn + CCF * undrawn."""
        return self.outstanding_m + (self.ccf_pct / 100) * self.available_m

    @property
    def ecl_m(self) -> float:
        """Expected credit loss = PD * LGD * EAD."""
        multiplier = 1.0 if self.ifrs9_stage == 1 else self.tenor_years
        return (self.ead_m * self.pd_pct / 100
                * self.lgd_pct / 100 * multiplier)

    def calculate_eir(self) -> float:
        """
        Calculate effective interest rate using Newton-Raphson via brentq.
        EIR is the rate that discounts all future cash flows (interest + fees + principal)
        to the net initial carrying amount.
        """
        net_proceeds = self.net_initial_carrying_amount_m
        if net_proceeds <= 0 or self.tenor_years <= 0:
            return self.all_in_rate_pct / 100

        # Approximate: quarterly cash flows
        periods = int(self.tenor_years * 4)
        quarterly_principal = self.outstanding_m / periods if periods > 0 else self.outstanding_m

        def pv_diff(r):
            # r = quarterly rate
            balance = self.outstanding_m
            pv = 0.0
            for t in range(1, periods + 1):
                interest = balance * r
                principal = quarterly_principal if t < periods else balance
                cash_flow = interest + principal
                pv += cash_flow / (1 + r) ** t
                balance -= quarterly_principal
            return pv - net_proceeds

        try:
            quarterly_eir = brentq(pv_diff, 0.0001, 0.2)
            return (1 + quarterly_eir) ** 4 - 1  # annualise
        except ValueError:
            return self.all_in_rate_pct / 100

    def daily_interest_accrual_m(self) -> float:
        return self.outstanding_m * self.all_in_rate_pct / 100 / 365

    def daily_commitment_fee_accrual_m(self) -> float:
        return self.available_m * self.commitment_fee_pct / 100 / 365

    def maturity_status(self) -> str:
        d = self.days_to_maturity
        if d < 0: return "OVERDUE"
        if d <= 30: return "MATURING THIS MONTH"
        if d <= 90: return "MATURING IN 90 DAYS"
        if d <= 180: return "MATURING IN 6 MONTHS"
        return "CURRENT"

    def booking_validation_flags(self) -> List[str]:
        flags = []
        if self.outstanding_m > self.approved_limit_m:
            flags.append(f"EXCESS: Outstanding {self.outstanding_m}m > Limit {self.approved_limit_m}m")
        if self.maturity_date <= self.drawdown_date:
            flags.append("MATURITY before or equal to drawdown date")
        if self.margin_pct <= 0:
            flags.append("Margin must be positive")
        if not self.security_reference and self.outstanding_m > 0:
            flags.append("No security reference — verify if unsecured lending is approved")
        if not self.approval_reference:
            flags.append("No credit approval reference — booking cannot proceed")
        if self.ifrs9_stage not in (1, 2, 3):
            flags.append(f"Invalid IFRS9 stage: {self.ifrs9_stage}")
        if self.ifrs9_stage == 1 and self.internal_rating >= 8:
            flags.append(f"Stage 1 with rating {self.internal_rating} — review staging")
        if self.pd_pct <= 0 or self.lgd_pct <= 0:
            flags.append("PD and LGD must be positive for ECL calculation")
        return flags


# ===== LOAN PORTFOLIO OPERATIONS MANAGER =====

class LoanOperationsManager:
    """Portfolio-level operations: limit monitoring, accruals, maturity diary."""

    def __init__(self, bookings: List[LoanBookingRecord]):
        self.bookings = [b for b in bookings if b.status == 'ACTIVE']

    def to_dataframe(self) -> pd.DataFrame:
        rows = [{
            'Facility ID': b.facility_id,
            'Client': b.client_name,
            'Type': b.facility_type,
            'Limit (£m)': b.approved_limit_m,
            'Outstanding (£m)': b.outstanding_m,
            'Available (£m)': b.available_m,
            'Utilisation %': round(b.utilisation_pct, 1),
            'Margin %': b.margin_pct,
            'All-in Rate %': b.all_in_rate_pct,
            'Maturity': b.maturity_date,
            'Maturity Status': b.maturity_status(),
            'Rating': b.internal_rating,
            'IFRS9 Stage': b.ifrs9_stage,
            'ECL (£m)': round(b.ecl_m, 4),
            'EAD (£m)': round(b.ead_m, 4),
            'RM': b.rm_name
        } for b in self.bookings]
        return pd.DataFrame(rows)

    def maturity_diary(self, horizon_days: int = 180) -> pd.DataFrame:
        due = [b for b in self.bookings
               if b.days_to_maturity <= horizon_days]
        if not due:
            return pd.DataFrame()
        rows = [{
            'Client': b.client_name,
            'Facility ID': b.facility_id,
            'Outstanding (£m)': b.outstanding_m,
            'Maturity Date': b.maturity_date,
            'Days to Maturity': b.days_to_maturity,
            'Status': b.maturity_status(),
            'RM': b.rm_name
        } for b in due]
        return pd.DataFrame(rows).sort_values('Days to Maturity')

    def excess_utilisation_report(self) -> pd.DataFrame:
        excesses = [b for b in self.bookings
                    if b.outstanding_m > b.approved_limit_m + 0.001]
        if not excesses:
            return pd.DataFrame(columns=['Client', 'Limit (£m)', 'Outstanding (£m)', 'Excess (£m)'])
        rows = [{
            'Client': b.client_name,
            'Limit (£m)': b.approved_limit_m,
            'Outstanding (£m)': b.outstanding_m,
            'Excess (£m)': round(b.outstanding_m - b.approved_limit_m, 4),
            'RM': b.rm_name
        } for b in excesses]
        return pd.DataFrame(rows)

    def daily_income_summary(self) -> dict:
        total_interest = sum(b.daily_interest_accrual_m() for b in self.bookings)
        total_commitment_fee = sum(b.daily_commitment_fee_accrual_m() for b in self.bookings)
        return {
            'Total Outstanding (£m)': sum(b.outstanding_m for b in self.bookings),
            'Total Daily Interest Accrual (£m)': round(total_interest, 6),
            'Total Daily Commitment Fee (£m)': round(total_commitment_fee, 6),
            'Total Daily Income (£m)': round(total_interest + total_commitment_fee, 6),
            'Annualised Income Estimate (£m)': round((total_interest + total_commitment_fee) * 365, 4)
        }

    def ecl_summary_by_stage(self) -> pd.DataFrame:
        df = self.to_dataframe()
        return (df.groupby('IFRS9 Stage')
                .agg(
                    facility_count=('Facility ID', 'count'),
                    total_outstanding=('Outstanding (£m)', 'sum'),
                    total_ead=('EAD (£m)', 'sum'),
                    total_ecl=('ECL (£m)', 'sum')
                )
                .assign(ecl_coverage_pct=lambda x:
                        x['total_ecl'] / x['total_outstanding'] * 100))

    def validate_portfolio(self) -> pd.DataFrame:
        issues = []
        for b in self.bookings:
            flags = b.booking_validation_flags()
            for flag in flags:
                issues.append({
                    'Facility ID': b.facility_id,
                    'Client': b.client_name,
                    'Issue': flag,
                    'RM': b.rm_name
                })
        return pd.DataFrame(issues)


# ===== AMORTISATION SCHEDULE GENERATOR =====

def generate_amortisation_schedule(
    principal_m: float,
    drawdown_date: date,
    maturity_date: date,
    margin_pct: float,
    reference_rate_pct: float,
    payment_frequency: str = 'QUARTERLY',
    repayment_type: str = 'EQUAL_INSTALMENTS'  # or 'BULLET'
) -> pd.DataFrame:
    """Generate a loan amortisation schedule."""
    freq_days = {'MONTHLY': 30, 'QUARTERLY': 91, 'SEMI-ANNUAL': 183, 'ANNUAL': 365}
    period_days = freq_days.get(payment_frequency, 91)
    all_in_rate = (margin_pct + reference_rate_pct) / 100

    dates = []
    d = drawdown_date + timedelta(days=period_days)
    while d <= maturity_date:
        dates.append(d)
        d += timedelta(days=period_days)
    if not dates or dates[-1] < maturity_date:
        dates.append(maturity_date)

    n = len(dates)
    schedule = []
    balance = principal_m

    for i, pmt_date in enumerate(dates):
        days_in_period = (pmt_date - (dates[i-1] if i > 0 else drawdown_date)).days
        interest = balance * all_in_rate * days_in_period / 365

        if repayment_type == 'BULLET':
            principal = principal_m if i == n - 1 else 0.0
        else:
            principal = principal_m / n

        closing = balance - principal
        schedule.append({
            'Period': i + 1,
            'Payment Date': pmt_date,
            'Days': days_in_period,
            'Opening Balance (£m)': round(balance, 6),
            'Interest (£m)': round(interest, 6),
            'Principal (£m)': round(principal, 6),
            'Total Payment (£m)': round(interest + principal, 6),
            'Closing Balance (£m)': round(closing, 6)
        })
        balance = closing

    return pd.DataFrame(schedule)


# ===== EXAMPLE USAGE =====
if __name__ == '__main__':
    booking = LoanBookingRecord(
        obligor_id="OBL001", group_id="GRP001",
        facility_id="FAC001", client_name="Alpha Manufacturing Ltd",
        facility_type="TL", approved_limit_m=15.0, currency="GBP",
        drawdown_date=date(2025, 7, 1), maturity_date=date(2030, 7, 1),
        margin_pct=2.25, reference_rate_pct=4.75,
        arrangement_fee_pct=1.50, commitment_fee_pct=0.0,
        outstanding_m=15.0, internal_rating=5, ifrs9_stage=1,
        pd_pct=0.50, lgd_pct=45.0, ccf_pct=0.0,
        security_reference="SEC001", approval_reference="CR2025/001",
        gl_account="4000-01", rm_name="J. Smith"
    )

    print("=== BOOKING RECORD SUMMARY ===")
    print(f"  Utilisation: {booking.utilisation_pct:.1f}%")
    print(f"  EAD: £{booking.ead_m:.2f}m")
    print(f"  ECL: £{booking.ecl_m:.4f}m")
    print(f"  Daily interest accrual: £{booking.daily_interest_accrual_m()*1e6:,.0f}")
    print(f"  Days to maturity: {booking.days_to_maturity}")
    print(f"  Maturity status: {booking.maturity_status()}")
    print(f"\nValidation flags: {booking.booking_validation_flags()}")

    print("\n=== AMORTISATION SCHEDULE (first 4 periods) ===")
    schedule = generate_amortisation_schedule(
        15.0, date(2025, 7, 1), date(2030, 7, 1),
        2.25, 4.75, 'QUARTERLY', 'EQUAL_INSTALMENTS'
    )
    print(schedule.head(4).to_string(index=False))
```

## 11. Interview Questions

**Q1: What is the difference between the Credit Management System and the Loan Servicing System, and why must they be reconciled?**
A: The CMS is the system of record for credit risk: ratings, IFRS 9 stages, ECL amounts, credit limits, and approval history — owned by the credit risk function. The LSS is the operational system of record: drawdowns, repayments, interest accruals, and current outstanding balances — owned by operations. They must be reconciled because downstream reporting systems (regulatory capital, management information, IFRS 9 provisioning) join these two data sources at the Facility ID level. If the outstanding in the LSS differs from what the CMS believes is outstanding, the ECL and RWA calculations will be incorrect.

**Q2: Why is IFRS 9 Stage classification important at loan booking, and what are the implications of an incorrect initial stage?**
A: Stage classification determines whether 12-month ECL (Stage 1) or lifetime ECL (Stage 2/3) is recognised. An incorrect Stage 1 classification on a loan that should be Stage 2 understates the provision and overstates profit. Conversely, an incorrect Stage 2 classification on a healthy new loan overstates provisions. The initial stage classification also serves as the baseline against which "significant increase in credit risk" is measured over the loan's life — if the baseline is wrong, the SICR triggers will fire at the wrong time.

**Q3: What is the credit conversion factor and why does it matter at loan booking?**
A: The CCF converts undrawn commitments into a credit equivalent exposure for RWA calculation. For a revolving credit facility with original maturity greater than one year (Basel standardised approach), the CCF is 75% — meaning 75% of the undrawn commitment is included in EAD and therefore in RWA, even though no money has been lent. Booking the facility type incorrectly (e.g., booking a 3-year RCF as an overdraft) would apply the wrong CCF and understate regulatory capital requirements.

**Q4: What controls should prevent a drawdown being processed when a condition precedent has not been satisfied?**
A: The drawdown processing workflow should include a mandatory CP checklist that must be fully checked off before the drawdown instruction is submitted to the booking system. The system should enforce a hard block — not just a warning — if the CP flag is not confirmed as satisfied. Additionally, the credit team must provide a drawdown approval sign-off, and the legal team must confirm the FA is executed and security is perfected. The operations system should not be able to process the drawdown without all three confirmations. The dual-entry control (second operator verifies) adds a final check.

**Q5: Describe how loan booking data flows to the regulatory reporting system.**
A: The LSS provides daily outstanding balances, facility types, maturity bands, and currency data. The CMS provides internal ratings, IFRS 9 stages, PD, LGD, and ECL parameters. The RWA engine calculates risk weights using PD, LGD, EAD, and maturity from the CMS and LSS. A regulatory data warehouse aggregates this data by the COREP taxonomy categories — counterparty type (corporate, bank, sovereign), geographic region, facility type, and credit quality. The COREP/FINREP submissions are generated from the warehouse and submitted to the PRA quarterly. Any error in loan booking propagates through all these layers.

## 12. Common Mistakes

**Mistake 1: Processing a drawdown before all CPs are satisfied.** The most serious loan operations error. It can result in the bank having no enforceable security if the borrower subsequently defaults. Operations must never process a drawdown without confirmed CP satisfaction.

**Mistake 2: Booking the wrong facility type.** A revolving credit booked as a term loan, or an overdraft booked as a committed RCF, will have the wrong CCF applied and incorrect fee accrual. Facility type must be verified against the signed Facility Agreement.

**Mistake 3: Entering the wrong margin or maturity date.** These errors affect interest accrual (margin) and the maturity diary (maturity date). A 0.25% margin error on a £50m outstanding generates a £125,000 per annum income misstatement. Dual-entry verification and automated cross-check against the signed FA data are essential controls.

**Mistake 4: Failing to link the booking to the correct Group ID.** Large Exposures monitoring is done at group level, not entity level. If a subsidiary's facility is not linked to the parent group's Group ID, the group exposure aggregation will be incomplete and the Large Exposures limit may be breached without detection.

**Mistake 5: Not updating the IFRS 9 stage when a credit deteriorates.** The IFRS 9 stage on the booking record must be updated whenever the credit risk team reclassifies the credit. A Stage 1 classification that is not updated to Stage 2 after a significant rating downgrade results in understated provisions. Stage updates must be communicated from the CMS to the LSS through the system interface within the same day.

## 13. Case Studies

**Case Study 1: The CP Failure and Its Consequences**
A UK mid-market lender processes a £12m term loan drawdown on the last business day before the month-end deadline. Under time pressure, the operations team confirms the drawdown before receiving the legal confirmation that the fixed charge has been registered at Companies House. The borrower defaults nine months later. The administrator discovers the charge is unregistered (registration was filed late due to the solicitor's error, which was only identified after the fact). The bank's charge is void; they rank as an unsecured creditor. Estimated recovery falls from 75% to 22%. Root cause: the drawdown was processed without confirmed security perfection. Remediation: hard system block implemented requiring registration confirmation before drawdown processing.

**Case Study 2: The IFRS 9 Stage Lag**
A large corporate's credit rating is downgraded from 5 to 7 (speculative/watch) at the quarterly credit review. The CMS is updated by the credit analyst, but the interface to the IFRS 9 provisioning engine fails that night due to a technical error. The provisioning engine continues to calculate 12-month ECL (Stage 1) rather than lifetime ECL (Stage 2) for the following quarter. The provision is understated by £480,000 for the quarter. The error is identified at the semi-annual audit. The bank restates the prior quarter's provision. Remediation: automated reconciliation check between CMS stage and provisioning engine stage runs nightly, with morning exception report to the credit risk team.

## 14. Iterative Reinforcement

**Week 1 — System Familiarisation:** Shadow the loan operations team for two days. Observe the drawdown processing workflow from notice receipt to system booking. Map each step to the controls described in this module.

**Week 2 — Data Quality Exercise:** Pull the CMS-LSS reconciliation report for the current month. Investigate each break: is it a timing difference, a genuine mismatch, or a system interface failure? Document your findings.

**Week 3 — Amortisation and Accrual:** For a sample portfolio of 10 facilities, build the amortisation schedule for the term loans and the commitment fee accrual model for the revolving facilities. Verify that total annual income calculated matches the management accounts.

**Week 4 — Booking Checklist:** Complete a mock loan booking for a hypothetical new term loan, using the 20-field checklist in Section 8. Identify two fields where errors could have downstream consequences for regulatory reporting.

## 15. Source Material

- **IFRS 9 Financial Instruments (IASB, 2014):** Sections 5.4 (amortised cost and EIR), 5.5 (impairment and ECL), and Application Guidance B5.4 (EIR calculation).
- **EBA Guidelines on Loan Origination and Monitoring (EBA/GL/2020/06):** Chapter 6 (loan agreement management) and Chapter 7 (monitoring of credit facilities) — regulatory requirements for loan servicing processes.
- **Basel III: Finalising Post-Crisis Reforms (BIS, 2017):** Chapter 7 — credit conversion factors for off-balance-sheet commitments.
- **PRA Policy Statement PS17/23:** "Implementation of the Basel 3.1 standards" — including revisions to CCF for revolving credit facilities.
- **Bank of England COREP/FINREP Reporting Framework:** Technical standards for regulatory capital and financial reporting submissions.
- **"Loan Operations Manual" (Institution-specific):** Each bank maintains an internal operations manual; this module provides the generic framework. Practitioners should supplement with their institution's specific procedures.
- **LMA Operations Group Guidance:** Practical guidance on loan settlement, reconciliation, and operational standards for the European loan market.
- **"Bank Operations Management" by David Cox:** Practitioner reference for banking operations processes including loan servicing.
- **KPMG / PwC / Deloitte IFRS 9 Implementation Guides:** "IFRS 9 for Banks" publications from each Big Four firm provide detailed implementation guidance including EIR, staging criteria, and ECL modelling.
- **Moody's Analytics Loan IQ Documentation:** Loan IQ is the most widely used loan management system in UK corporate banking. The product documentation illustrates how loan booking fields are structured and how they flow to downstream systems.
