# M40 — Legal Documentation

## 1. Business Purpose

Legal documentation is the formal contractual record of the bank's agreed terms with a borrower. A credit approval by itself creates no legal rights — only a properly executed Facility Agreement (and associated security documents) creates enforceable obligations on the borrower and enforceable rights for the bank.

From a credit risk perspective, legal documentation is critical because it defines: what the borrower is permitted to do (positive covenants), what the borrower is prohibited from doing (negative covenants), the events that allow the bank to accelerate repayment (events of default), the security the bank can enforce if the borrower defaults, and the mechanisms available to the bank to monitor the borrower's condition on an ongoing basis.

Poor or inadequate documentation is itself a credit risk. A bank that has approved a credit on the basis of a fixed charge over property but has failed to perfect (register) the charge has no enforceable security interest. A bank whose event of default clause is imprecisely worded may be unable to enforce in a default scenario. A cross-default clause that is too narrowly drawn may fail to trigger when a material default occurs at a related entity.

The Loan Market Association (LMA) was established in 1996 to promote liquidity and efficiency in the European loan market by standardising loan documentation. The LMA publishes recommended form Facility Agreements for use in investment-grade, leveraged, and real estate finance transactions. These templates, regularly updated to reflect legal developments, are the starting point for virtually all UK corporate loan documentation. The LMA also publishes standard intercreditor agreements, term sheet templates, and guidance on secondary market trading.

The bank's legal team (internal or external solicitors instructed by the bank) is responsible for preparing and reviewing documentation. The RM and credit team ensure that the agreed commercial terms are accurately reflected in the documentation and that all conditions precedent to the credit approval are satisfied before drawdown is permitted.

## 2. Accounting Concepts

**On-Balance-Sheet vs Off-Balance-Sheet Commitments:** The signed Facility Agreement creates an on-balance-sheet commitment for the bank (an undrawn revolving credit facility is a contingent liability that attracts capital under Basel III). For the borrower, drawings create financial liabilities under IFRS 9. Covenants and conditions in the Facility Agreement may restrict the borrower's ability to create additional financial liabilities, distribute cash, or undertake transactions affecting their balance sheet.

**Lease Obligations under IFRS 16:** IFRS 16 requires borrowers to capitalise operating lease obligations as right-of-use assets and lease liabilities. This significantly increases reported debt, potentially triggering leverage covenants. Facility Agreements negotiated before IFRS 16 implementation may need to be reviewed for covenant impact. Modern LMA-based agreements typically include specific IFRS 16 carve-outs in leverage covenant definitions.

**Security and Collateral Accounting:** When security is enforced, the accounting treatment for both the bank (realising the security asset, releasing the provision) and the borrower (recognising disposal of secured assets) has P&L implications. The credit analyst must understand the security structure to properly model recovery scenarios.

**Goodwill and Intangibles in Tangible Net Worth Covenants:** Many Facility Agreements include a minimum Tangible Net Worth (TNW) covenant, defined as total equity minus intangible assets. The definition of "intangible assets" in the agreement must be consistent with the financial statements. Changes in accounting standards affecting intangible asset recognition (e.g., IFRS 3 goodwill treatment on acquisitions) can affect covenant compliance.

## 3. Financial Concepts

**The Facility Agreement Structure:** A standard LMA Facility Agreement contains: (1) Parties and Definitions; (2) The Facility (amount, type, availability, purpose); (3) Utilisation; (4) Repayment, Prepayment, and Cancellation; (5) Interest; (6) Fees; (7) Tax; (8) Increased Costs; (9) Representations; (10) Information Undertakings; (11) Financial Covenants; (12) General Undertakings; (13) Events of Default; (14) Changes to Lenders; (15) Administration; (16) Governing Law and Enforcement.

**Key Clauses in Detail:**

*Representations and Warranties:* Statements made by the borrower at signing and (for "repeating representations") at each drawdown. Include: legal status, authorisation, no breach of other agreements, no material adverse change, accurate financial information, no litigation, no Event of Default. A false representation is itself an Event of Default.

*Undertakings:* Ongoing obligations of the borrower. Positive undertakings (things the borrower must do): maintain corporate existence, keep financial records, obtain necessary licences, provide financial information to the bank. Negative undertakings (things the borrower may not do without lender consent): create additional security (negative pledge), dispose of material assets, make acquisitions above a threshold, pay dividends in breach of a dividend stopper, incur additional financial indebtedness above a carve-out.

*Events of Default:* Triggers that allow the bank to accelerate repayment (demand immediate repayment of the outstanding amount). Standard events of default include: non-payment of principal or interest, breach of financial covenant (after a cure period if provided), misrepresentation, breach of undertaking, insolvency, cessation of business, change of control, and cross-default.

*Material Adverse Change (MAC) Clause:* A broadly drafted event of default triggered by a "material adverse change in the financial condition, business or prospects" of the borrower. MAC clauses are difficult to enforce (courts set a high bar) and are typically the last resort, used when no more specific event of default is available.

*Cross-Default Clause:* An event of default triggered when the borrower (or connected entities, depending on drafting) defaults under any other financial indebtedness above a threshold amount. The key negotiation is whether cross-default is triggered by: (a) failure to pay when due (cross-payment default) — narrower, or (b) acceleration by any other lender (cross-acceleration) — even narrower. Banks prefer cross-default; borrowers prefer cross-acceleration.

**Conditions Precedent (CPs):** Documents and conditions that must be satisfied before the facility is available for drawdown. Typical CPs to first utilisation include: certified copy of corporate constitutional documents, resolution of the borrower's board authorising the facility, legal opinion (capacity and enforceability), executed security documents with evidence of registration, evidence of insurance, and satisfaction of KYC requirements. Ongoing CPs (conditions to each drawdown) typically include: no Event of Default, repeating representations true, and drawdown notice received within the required notice period.

## 4. Statistical Concepts

**Loan Pricing and Documentation Margin Ratchets:** Many LMA Facility Agreements include margin ratchets — provisions that adjust the interest margin based on a financial ratio (typically leverage). As leverage improves (falls), the margin reduces; as leverage worsens (rises), the margin increases. This creates a self-adjusting risk-reward mechanism. Analysts must model the margin ratchet alongside leverage projections to accurately forecast interest cost.

**LGD and Documentation Quality:** Recovery rates (and therefore LGD) are materially influenced by documentation quality. Research shows that syndicated loans with comprehensive covenant packages, cross-default clauses, and perfected security consistently achieve higher recovery rates in default than poorly documented bilateral loans. Documentation quality is therefore directly relevant to the LGD assumption used in ECL calculations.

**Covenant Headroom Analysis:** The credit analyst must calculate headroom on each financial covenant in the Facility Agreement and model the trajectory of that headroom under base, upside, and downside scenarios. The probability of a covenant breach under the downside scenario informs the Stage 1/Stage 2 IFRS 9 classification.

## 5. Regulatory Framework

**Law of Property Act 1925 (LPA 1925):** The primary statute governing the creation and enforcement of mortgages and charges over English real property. Fixed charges over property must comply with LPA formality requirements. The LPA Receiver — a receiver appointed under the LPA rather than under the security document — has limited powers compared to an administrative receiver.

**Companies Act 2006 — Charges Register:** Fixed and floating charges over company assets must be registered at Companies House within 21 days of creation. An unregistered charge is void against a liquidator or administrator. The priority of registered charges is determined by date of registration, subject to actual notice provisions.

**Insolvency Act 1986:** The statutory framework for administration, receivership, and liquidation in the UK. Relevant to enforcement: a fixed charge holder can enforce outside of administration; a floating charge holder holding a "qualifying floating charge" (QFC) over substantially all the company's assets can appoint an Administrator. Administrators take priority over unsecured creditors but must act in the interests of all creditors.

**Financial Collateral Arrangements Regulations 2003 (FCARs):** Provides a simplified enforcement regime for financial collateral (cash, securities). Particularly relevant for FX and derivatives credit support documentation and for security over deposit accounts.

**LMA Recommended Form Documents:** While not statutory, LMA recommended forms represent market standard and are treated by English courts as evidence of market practice. Deviations from LMA standard terms are noted and may be challenged in litigation.

**Legal Opinions:** The bank's solicitors obtain a legal opinion from the borrower's solicitors (and, for overseas entities, from local counsel) confirming: the borrower's capacity to enter the transaction, due authorisation, no conflict with constitutional documents, enforceability of the agreement under the governing law, and (for security) the validity and perfection of the security interest.

## 6. Data Required

**Pre-documentation data requirements:**
- Board resolution of the borrower authorising the facility
- Certificate of incorporation and constitutional documents
- Structure chart of the borrower group
- Confirmation of beneficial ownership
- Valuation of any property security (RICS-registered valuer, typically bank-appointed)
- Search results: Companies House, Land Registry, local authority, bankruptcy register
- Insurance certificates (for secured property)
- Details of existing charges (from Companies House charges register)
- Existing facility agreements (to check negative pledge, cross-default, and pari passu provisions)

**Post-execution data recorded in the credit system:**
- Agreement date and parties
- Facility type, amount, and purpose
- Tenor (availability period end date, final maturity date)
- Pricing (margin, base rate, fees)
- Repayment schedule
- Security type, description, valuation, and registration number
- Financial covenant set and test frequency
- Information undertaking schedule (due dates for management accounts, audited accounts, compliance certificates)
- CP satisfaction dates

## 7. How Analysts Actually Work

**Documentation Review by the Credit Analyst:** Before documentation is finalised, the credit analyst or a documentation specialist reviews the draft Facility Agreement to verify that the agreed credit terms are accurately reflected. The key check is that: the facility amount and type match the approval, financial covenants match the approved terms, negative pledge and restriction provisions are consistent with the credit paper's assumptions, and MAC/cross-default provisions are present and appropriately drafted.

**The RM's Role in Documentation:** The RM drives the commercial negotiation with the borrower's management. The RM must understand which documentation terms are negotiable (e.g., financial covenant levels, reporting periods, materiality thresholds in undertakings) and which are non-negotiable from a credit policy perspective (e.g., negative pledge for secured facilities, minimum financial covenant set).

**CP Satisfaction:** The RM and operations team track CP satisfaction. A CP checklist is produced at signing, and each CP is checked off as the relevant document is received and approved by the bank's solicitors. Only when all CPs are satisfied (or waived with appropriate authority) can the borrower make the first drawdown. A common delay in loan drawdowns is missing or defective CPs.

**Security Registration:** The bank's solicitors file the charge registration at Companies House within 21 days of creation. A certificate of registration is obtained and filed on the credit system. The RM must not permit drawdown until security registration is confirmed.

**Intercreditor Agreement in Syndicated Deals:** When multiple banks lend to the same borrower, an intercreditor agreement governs the relationship between lenders. Key intercreditor provisions include: payment waterfall (who gets paid first from enforcement proceeds), standstill obligations (restrictions on individual lenders taking enforcement action), voting and consent mechanics, and the role of the facility agent.

**Waiver Requests:** When a borrower breaches a covenant or wants to take an action restricted by an undertaking, they must request a waiver or amendment from the bank. The RM receives the waiver request, assesses it commercially, and submits a formal waiver approval request to the credit team. Waivers must be approved at the appropriate authority level, and any waiver that reflects underlying deterioration should result in enhanced monitoring.

## 8. Excel Implementation

```excel
' ===== DOCUMENTATION CP CHECKLIST =====
' Sheet: CP_Tracker
' Columns: A=CP#, B=Description, C=Responsible Party, D=Due Date,
'          E=Received Date, F=Status, G=Notes

' Status formula
=IF(E2<>"","COMPLETE",IF(D2<TODAY(),"OVERDUE","PENDING"))

' CP completion %
=COUNTIF(F:F,"COMPLETE")/COUNTA(A2:A50)

' ===== COVENANT DEFINITION MAPPING =====
' Sheet: Covenant_Definitions
' This sheet maps the Facility Agreement covenant definitions to the
' corresponding lines in the financial spread

' Example: EBITDA definition from the Facility Agreement
' "Consolidated EBITDA" = Operating Profit
'                       + Depreciation and Amortisation
'                       - Exceptional items (as agreed at signing)
'                       + Share-based payments (non-cash)

' Cell B5: FA Definition           [text]
' Cell B6: Spread Row Reference    [text mapping to financial spread]
' Cell B7: Adjustment Required?    [Yes/No]
' Cell B8: Adjustment Detail       [text]

' ===== MARGIN RATCHET CALCULATOR =====
' Sheet: Margin_Ratchet

' Ratchet table (from Facility Agreement):
' Leverage < 1.5x  → Margin = 1.75%
' Leverage < 2.5x  → Margin = 2.00%
' Leverage < 3.5x  → Margin = 2.25%
' Leverage >= 3.5x → Margin = 2.50%

B5: Current Leverage (x)     [input from financial model]
B6: Applicable Margin (%)    =IF(B5<1.5,1.75%,IF(B5<2.5,2.0%,IF(B5<3.5,2.25%,2.50%)))

' Forecast margin under different leverage scenarios
=IF(leverage_forecast_year1<1.5,1.75%,IF(leverage_forecast_year1<2.5,2.0%,
   IF(leverage_forecast_year1<3.5,2.25%,2.50%)))

' ===== SECURITY REGISTER =====
' Sheet: Security_Register
' Columns: A=Security Type, B=Asset Description, C=Valuation (£m),
'          D=Valuation Date, E=LTV %, F=Registration#, G=Reg Date, H=Status

' LTV calculation
=Drawn_Balance/C2   ' Loan outstanding / Security valuation

' Security coverage ratio
=SUM(C:C)/Total_drawn  ' Total security value / Total drawn
```

## 9. SQL Implementation

```sql
-- ===== DOCUMENTATION STATUS BY FACILITY =====
SELECT
    c.client_name,
    f.facility_id,
    f.facility_type,
    f.approved_limit,
    d.agreement_date,
    d.first_drawdown_available,
    d.all_cps_satisfied,
    d.cp_satisfaction_date,
    d.facility_agreement_status,  -- 'DRAFT', 'EXECUTED', 'CPs_SATISFIED'
    DATEDIFF(DAY, d.agreement_date, d.cp_satisfaction_date) AS days_from_signing_to_cp
FROM facilities f
JOIN clients c ON f.client_id = c.client_id
LEFT JOIN facility_documentation d ON f.facility_id = d.facility_id
WHERE f.status IN ('APPROVED', 'DOCUMENTING', 'ACTIVE')
ORDER BY d.first_drawdown_available ASC;

-- ===== CP TRACKER =====
SELECT
    c.client_name,
    f.facility_id,
    cp.cp_number,
    cp.cp_description,
    cp.responsible_party,
    cp.due_date,
    cp.received_date,
    CASE
        WHEN cp.received_date IS NOT NULL THEN 'COMPLETE'
        WHEN cp.due_date < GETDATE() THEN 'OVERDUE'
        ELSE 'PENDING'
    END AS cp_status
FROM conditions_precedent cp
JOIN facilities f ON cp.facility_id = f.facility_id
JOIN clients c ON f.client_id = c.client_id
WHERE cp.received_date IS NULL
ORDER BY cp.due_date;

-- ===== SECURITY REGISTER =====
SELECT
    c.client_name,
    f.facility_id,
    f.current_drawn,
    s.security_type,
    s.asset_description,
    s.valuation_amount,
    s.valuation_date,
    s.valuer_name,
    s.companies_house_reg_number,
    s.registration_date,
    ROUND(f.current_drawn / NULLIF(s.valuation_amount, 0) * 100, 1) AS ltv_pct,
    DATEDIFF(MONTH, s.valuation_date, GETDATE()) AS months_since_valuation,
    CASE
        WHEN DATEDIFF(MONTH, s.valuation_date, GETDATE()) > 12 THEN 'REVALUATION REQUIRED'
        WHEN DATEDIFF(MONTH, s.valuation_date, GETDATE()) > 9 THEN 'REVALUATION DUE SOON'
        ELSE 'CURRENT'
    END AS valuation_status
FROM security s
JOIN facilities f ON s.facility_id = f.facility_id
JOIN clients c ON f.client_id = c.client_id
WHERE s.is_active = 1
ORDER BY months_since_valuation DESC;

-- ===== WAIVER REGISTER =====
SELECT
    c.client_name,
    c.rm_name,
    w.waiver_date,
    w.waiver_type,        -- 'COVENANT_BREACH', 'UNDERTAKING_CONSENT', 'AMENDMENT'
    w.waiver_description,
    w.approved_by,
    w.expiry_date,
    w.recurring,
    COUNT(*) OVER (PARTITION BY c.client_id) AS total_waivers_this_client,
    DATEDIFF(DAY, LAG(w.waiver_date) OVER (
        PARTITION BY c.client_id ORDER BY w.waiver_date
    ), w.waiver_date) AS days_since_last_waiver
FROM waivers w
JOIN clients c ON w.client_id = c.client_id
WHERE w.waiver_date >= DATEADD(YEAR, -2, GETDATE())
ORDER BY c.client_name, w.waiver_date;

-- ===== CROSS-DEFAULT EXPOSURE ANALYSIS =====
-- Identify clients with existing debt at other institutions
-- that could trigger cross-default in our facility
SELECT
    c.client_name,
    c.rm_name,
    f.facility_id AS our_facility,
    f.current_drawn AS our_exposure,
    fa.cross_default_threshold,
    ed.external_lender,
    ed.external_facility_amount,
    ed.external_facility_status,  -- 'PERFORMING', 'STRESSED', 'DEFAULT'
    CASE
        WHEN ed.external_facility_status = 'DEFAULT'
         AND ed.external_facility_amount > fa.cross_default_threshold
        THEN 'CROSS-DEFAULT TRIGGERED'
        WHEN ed.external_facility_status = 'STRESSED'
        THEN 'MONITOR'
        ELSE 'OK'
    END AS cross_default_status
FROM facilities f
JOIN clients c ON f.client_id = c.client_id
JOIN facility_agreement_terms fa ON f.facility_id = fa.facility_id
LEFT JOIN external_debt ed ON c.client_id = ed.client_id
WHERE f.status = 'ACTIVE'
ORDER BY cross_default_status DESC;
```

## 10. Python Implementation

```python
import pandas as pd
from dataclasses import dataclass, field
from typing import List, Optional, Dict
from datetime import date, timedelta
from enum import Enum


class ChargeType(Enum):
    FIXED = "Fixed Charge"
    FLOATING = "Floating Charge"
    FIXED_AND_FLOATING = "Fixed and Floating Charge Debenture"
    MORTGAGE = "Legal Mortgage"
    PLEDGE = "Pledge"
    GUARANTEE = "Personal Guarantee"


class CPStatus(Enum):
    PENDING = "PENDING"
    RECEIVED = "RECEIVED"
    OVERDUE = "OVERDUE"
    WAIVED = "WAIVED"


@dataclass
class ConditionPrecedent:
    cp_number: int
    description: str
    responsible_party: str
    due_date: date
    received_date: Optional[date] = None
    waived: bool = False
    notes: str = ""

    @property
    def status(self) -> CPStatus:
        if self.received_date:
            return CPStatus.RECEIVED
        if self.waived:
            return CPStatus.WAIVED
        if date.today() > self.due_date:
            return CPStatus.OVERDUE
        return CPStatus.PENDING


@dataclass
class SecurityItem:
    security_type: ChargeType
    asset_description: str
    valuation_amount_m: float
    valuation_date: date
    valuer_name: str
    ch_registration_number: Optional[str] = None
    registration_date: Optional[date] = None

    @property
    def months_since_valuation(self) -> int:
        delta = date.today() - self.valuation_date
        return delta.days // 30

    @property
    def valuation_status(self) -> str:
        m = self.months_since_valuation
        if m > 12:
            return "REVALUATION REQUIRED"
        if m > 9:
            return "REVALUATION DUE SOON"
        return "CURRENT"

    @property
    def is_registered(self) -> bool:
        if self.security_type in (ChargeType.PLEDGE, ChargeType.GUARANTEE):
            return True  # registration not applicable
        return self.ch_registration_number is not None


@dataclass
class FinancialCovenant:
    name: str
    description: str
    threshold: float
    test_frequency: str   # 'QUARTERLY', 'SEMI-ANNUAL', 'ANNUAL'
    cure_period_days: int = 0
    last_test_date: Optional[date] = None
    last_actual: Optional[float] = None

    @property
    def headroom(self) -> Optional[float]:
        if self.last_actual is None:
            return None
        return self.last_actual - self.threshold

    @property
    def compliance_status(self) -> str:
        if self.last_actual is None:
            return "NOT YET TESTED"
        h = self.headroom
        if h < 0:
            return "BREACH"
        if h / abs(self.threshold) < 0.15:
            return "TIGHT"
        return "COMPLIANT"


@dataclass
class FacilityAgreement:
    client_name: str
    facility_amount_m: float
    facility_type: str
    purpose: str
    margin_pct: float
    tenor_years: float
    agreement_date: date
    maturity_date: date
    conditions_precedent: List[ConditionPrecedent] = field(default_factory=list)
    security: List[SecurityItem] = field(default_factory=list)
    financial_covenants: List[FinancialCovenant] = field(default_factory=list)
    cross_default_threshold_m: float = 1.0
    governing_law: str = "English Law"

    def cp_summary(self) -> pd.DataFrame:
        rows = [{
            'CP#': cp.cp_number,
            'Description': cp.description[:60] + '...' if len(cp.description) > 60
                           else cp.description,
            'Responsible': cp.responsible_party,
            'Due Date': cp.due_date,
            'Status': cp.status.value
        } for cp in self.conditions_precedent]
        return pd.DataFrame(rows)

    def all_cps_satisfied(self) -> bool:
        return all(
            cp.status in (CPStatus.RECEIVED, CPStatus.WAIVED)
            for cp in self.conditions_precedent
        )

    def security_summary(self) -> pd.DataFrame:
        rows = [{
            'Security Type': s.security_type.value,
            'Asset': s.asset_description,
            'Valuation (£m)': s.valuation_amount_m,
            'Val Date': s.valuation_date,
            'Val Status': s.valuation_status,
            'Registered': 'YES' if s.is_registered else 'NO — ACTION REQUIRED'
        } for s in self.security]
        return pd.DataFrame(rows)

    def total_security_value_m(self) -> float:
        return sum(s.valuation_amount_m for s in self.security)

    def security_cover_ratio(self, drawn_m: float) -> float:
        return self.total_security_value_m() / drawn_m if drawn_m > 0 else float('inf')

    def covenant_compliance_summary(self) -> pd.DataFrame:
        rows = [{
            'Covenant': cv.name,
            'Description': cv.description,
            'Threshold': cv.threshold,
            'Actual': cv.last_actual,
            'Headroom': cv.headroom,
            'Status': cv.compliance_status,
            'Test Frequency': cv.test_frequency,
            'Last Test': cv.last_test_date
        } for cv in self.financial_covenants]
        return pd.DataFrame(rows)

    def documentation_risk_flags(self) -> List[str]:
        flags = []
        # Unregistered security
        for s in self.security:
            if not s.is_registered:
                flags.append(f"UNREGISTERED SECURITY: {s.asset_description} — register at Companies House immediately")
        # Stale valuations
        for s in self.security:
            if s.valuation_status != "CURRENT":
                flags.append(f"STALE VALUATION: {s.asset_description} — {s.months_since_valuation} months old")
        # Outstanding CPs
        overdue_cps = [cp for cp in self.conditions_precedent
                       if cp.status == CPStatus.OVERDUE]
        if overdue_cps:
            flags.append(f"{len(overdue_cps)} OVERDUE CPs — drawdown must not proceed")
        # Covenant breaches
        for cv in self.financial_covenants:
            if cv.compliance_status == "BREACH":
                flags.append(f"COVENANT BREACH: {cv.name} — enforce cure period or obtain waiver")
        return flags


# ===== LMA COVENANT PACKAGE BUILDER =====

def standard_lma_covenant_package(
    dscr_threshold: float = 1.25,
    leverage_threshold: float = 3.5,
    interest_cover_threshold: float = 2.5,
    min_tnw_m: float = 10.0
) -> List[FinancialCovenant]:
    """Generate a standard LMA-aligned covenant package."""
    return [
        FinancialCovenant(
            name="Debt Service Cover Ratio",
            description=f"DSCR >= {dscr_threshold}x tested quarterly",
            threshold=dscr_threshold,
            test_frequency="QUARTERLY",
            cure_period_days=20
        ),
        FinancialCovenant(
            name="Net Leverage",
            description=f"Net Debt / EBITDA <= {leverage_threshold}x tested quarterly",
            threshold=leverage_threshold,
            test_frequency="QUARTERLY",
            cure_period_days=20
        ),
        FinancialCovenant(
            name="Interest Cover",
            description=f"EBITDA / Net Interest >= {interest_cover_threshold}x",
            threshold=interest_cover_threshold,
            test_frequency="SEMI-ANNUAL",
            cure_period_days=20
        ),
        FinancialCovenant(
            name="Minimum Tangible Net Worth",
            description=f"TNW >= £{min_tnw_m}m tested annually",
            threshold=min_tnw_m,
            test_frequency="ANNUAL",
            cure_period_days=0
        )
    ]


# ===== EXAMPLE USAGE =====
if __name__ == '__main__':
    fa = FacilityAgreement(
        client_name="Alpha Manufacturing Ltd",
        facility_amount_m=15.0,
        facility_type="Term Loan",
        purpose="Acquisition of Beta Components Ltd",
        margin_pct=2.25,
        tenor_years=5.0,
        agreement_date=date(2025, 1, 15),
        maturity_date=date(2030, 1, 15),
        cross_default_threshold_m=1.0
    )

    # Add CPs
    fa.conditions_precedent = [
        ConditionPrecedent(1, "Certified copy of board resolution", "Borrower's solicitors",
                           date(2025, 1, 22), received_date=date(2025, 1, 21)),
        ConditionPrecedent(2, "Legal opinion from borrower's counsel", "Borrower's solicitors",
                           date(2025, 1, 22), received_date=date(2025, 1, 22)),
        ConditionPrecedent(3, "RICS valuation of Midlands factory", "Borrower",
                           date(2025, 1, 20), received_date=None),  # OVERDUE
        ConditionPrecedent(4, "Companies House charge registration", "Bank's solicitors",
                           date(2025, 1, 29))
    ]

    # Add security
    fa.security = [
        SecurityItem(ChargeType.FIXED_AND_FLOATING, "Debenture over all assets",
                     22.0, date(2025, 1, 10), "Knight Frank LLP",
                     "CH12345678", date(2025, 1, 22)),
        SecurityItem(ChargeType.MORTGAGE, "Freehold property — Midlands factory",
                     8.5, date(2024, 6, 1), "CBRE Ltd")  # No registration yet
    ]

    # Add covenants
    fa.financial_covenants = standard_lma_covenant_package(
        dscr_threshold=1.25, leverage_threshold=3.5,
        interest_cover_threshold=2.5, min_tnw_m=8.0
    )
    # Set actuals for most recent test
    fa.financial_covenants[0].last_actual = 1.42
    fa.financial_covenants[0].last_test_date = date(2025, 3, 31)
    fa.financial_covenants[1].last_actual = 3.1
    fa.financial_covenants[1].last_test_date = date(2025, 3, 31)

    print("=== CP SUMMARY ===")
    print(fa.cp_summary().to_string())
    print(f"\nAll CPs satisfied: {fa.all_cps_satisfied()}")
    print("\n=== SECURITY ===")
    print(fa.security_summary().to_string())
    print(f"\nSecurity cover ratio (£15m drawn): {fa.security_cover_ratio(15.0):.2f}x")
    print("\n=== COVENANT COMPLIANCE ===")
    print(fa.covenant_compliance_summary().to_string())
    print("\n=== RISK FLAGS ===")
    for flag in fa.documentation_risk_flags():
        print(f"  !! {flag}")
```

## 11. Interview Questions

**Q1: What is the difference between a fixed charge and a floating charge?**
A: A fixed charge attaches to a specific, identified asset (e.g., a specific property, a piece of plant and machinery) and prevents the borrower from dealing with that asset without the chargeholder's consent. A floating charge is a charge over a class of assets (e.g., all book debts, all inventory) that "floats" over the assets as they change — the borrower can continue to deal with those assets in the ordinary course of business. The floating charge "crystallises" into a fixed charge on the occurrence of certain events (typically appointment of a receiver or administrator). In insolvency, fixed charge holders have priority over preferential creditors; floating charge holders rank behind preferential creditors.

**Q2: What is the MAC clause and why is it difficult to enforce?**
A: The Material Adverse Change clause is an event of default triggered by a material adverse change in the borrower's financial condition, business, or prospects. It is difficult to enforce because courts set a very high bar: the change must be material, significant, and long-lasting — not temporary or cyclical. Most attempts by banks to enforce MAC clauses are unsuccessful because judges are reluctant to allow banks to exit lending commitments on the basis of broad, judgment-based clauses. The most famous example is Grupo Hotelero Uberoi v Carey Value Added SL [2013], where the court rejected the bank's MAC argument even in the context of a struggling business.

**Q3: What happens if a charge is not registered at Companies House within 21 days?**
A: Under the Companies Act 2006, an unregistered charge is void against a liquidator, administrator, or other creditors of the company. This means that in an insolvency, the bank loses its priority as a secured creditor and is treated as an unsecured creditor. Late registration may be permitted by court order in limited circumstances. This is why the bank's solicitors must file the charge registration on the day of execution or shortly thereafter, never waiting close to the 21-day deadline.

**Q4: In a syndicated loan, what is the role of the facility agent and the security agent?**
A: The facility agent administers the loan on behalf of the lending syndicate: it receives drawdown requests, makes payments to and from lenders, distributes information to the syndicate, and coordinates consents and waivers. The security agent holds security on trust for all lenders and acts as the enforcement agent if the security must be enforced. The security agent's role separates the administration of security (which must be held centrally) from the commercial administration of the loan. In intercreditor arrangements with multiple creditor classes (senior, mezzanine, equity), a separate intercreditor agent manages the enforcement waterfall.

**Q5: What are repeating representations in a Facility Agreement?**
A: Repeating representations are a subset of the borrower's representations that are deemed to be made at each drawdown and (in some agreements) at each interest payment date, not just at signing. Typical repeating representations include: legal capacity, due authorisation, no material adverse change, accuracy of financial information, and no event of default. If a repeating representation is false at a drawdown date, the bank can refuse the drawdown and (subject to the grace period) call an event of default.

## 12. Common Mistakes

**Mistake 1: Permitting drawdown before all CPs are satisfied.** Operations teams under commercial pressure sometimes release funds before all CPs are formally satisfied. This is a procedural control failure that can leave the bank without perfected security or legal opinions confirming enforceability. CPs must be fully satisfied before first drawdown, with no exceptions without formal credit authority approval.

**Mistake 2: Using covenant definitions that do not match the financial spread.** If the covenant definition of "EBITDA" differs from the definition used in the financial model (e.g., the covenant includes share-based payment add-backs, but the model does not), the credit analysis is measuring the wrong thing. Covenant definitions must be mapped explicitly to the financial spreading template.

**Mistake 3: Underestimating the importance of the negative pledge.** A negative pledge clause prohibits the borrower from creating additional security over assets without the bank's consent. If the borrower raises additional secured debt without the bank's knowledge (in breach of the negative pledge), the bank's ranking is undermined. The negative pledge must be clearly drafted and monitored.

**Mistake 4: Ignoring the Companies House charges register before lending.** Existing charges on the borrower's assets affect the bank's security ranking. The bank's solicitors should search the charges register before finalising security documentation. A bank that lends secured against an asset already subject to a first-ranking fixed charge may find itself with a second-ranking charge that provides little protection.

**Mistake 5: Treating the Facility Offer Letter as equivalent to the Facility Agreement.** The FOL is a commercial summary that, once accepted, commits the bank to document the deal. The FOL is not the legal agreement — it is pre-contractual documentation. Only the executed Facility Agreement creates binding legal rights. The bank must ensure that the FOL terms are accurately reflected in the final agreement.

## 13. Case Studies

**Case Study 1: The Unregistered Charge**
A regional bank lends £8m to a property company, secured on a commercial property. The bank's internal solicitors are used (rather than external specialists), and due to an administrative error, the charge is not registered at Companies House until day 25 — four days after the 21-day window. The borrower defaults 18 months later. In administration, the administrator argues the charge is void under the Companies Act 2006. The court agrees. The bank becomes an unsecured creditor, recovering approximately 15p in the pound instead of the expected 80p. The bank implements a new control requiring external solicitors to file charge registration on the day of execution and report confirmation to the credit team within 24 hours.

**Case Study 2: The MAC Clause Failure**
A bank attempts to invoke the MAC clause when a retail borrower's like-for-like sales fall 18% in a single quarter. The borrower is still meeting all financial covenants and is current on all interest payments. The bank argues that the sales decline represents a material adverse change in the borrower's business prospects. The borrower disputes this and, in subsequent litigation, the court rules that a single-quarter performance decline (even if significant) does not constitute a material and long-lasting MAC. The bank's MAC argument fails. The lesson: MAC clauses are a last resort, not a substitute for properly structured financial covenants.

## 14. Iterative Reinforcement

**Week 1 — Document Familiarisation:** Obtain an anonymised or published LMA Facility Agreement. Read sections: Definitions, Events of Default, Undertakings, and Financial Covenants. Identify and summarise five key provisions in each section.

**Week 2 — Covenant Mapping:** For a real or hypothetical borrower, map the Facility Agreement covenant definitions to the relevant lines in the financial spread. Identify any definition mismatches.

**Week 3 — CP Checklist:** Build a CP checklist for a standard bilateral term loan. Include all typical CPs and assign responsibility and due dates.

**Week 4 — Security Analysis:** For a given portfolio of security (fixed and floating charge, property mortgage, personal guarantee), calculate security cover ratio at current drawn levels and model the cover ratio under a 20% property value decline.

## 15. Source Material

- **LMA (Loan Market Association):** www.lma.eu.com — recommended form Facility Agreements, intercreditor agreements, term sheets, and educational resources. The definitive market standard reference for UK and European loan documentation.
- **Companies Act 2006 (legislation.gov.uk):** Parts 25 and 26 — charge registration requirements and formalities.
- **Insolvency Act 1986 (legislation.gov.uk):** Administration, receivership, and liquidation — enforcement context for security documentation.
- **Financial Collateral Arrangements (No. 2) Regulations 2003 (SI 2003/3226):** Relevant to security over financial assets.
- **"Penn, Shea and Arora: The Law Relating to Domestic Banking" (Butterworths):** Authoritative UK banking law textbook covering security, lending contracts, and enforcement.
- **"Wood: Law and Practice of International Finance" (Sweet & Maxwell):** International standard reference for comparative credit documentation across jurisdictions.
- **Cranston, "Principles of Banking Law" (OUP):** Oxford academic reference on the legal principles underpinning banking relationships and credit documentation.
- **Practical Law Finance (Thomson Reuters):** Practitioner resource for standard clauses, precedents, and commentary on loan documentation.
- **"The Law of Security and Title-Based Financing" by Sarah Worthington (OUP):** Academic reference on the nature and priority of security interests in English law.
- **EBA Guidelines on Loan Origination and Monitoring (EBA/GL/2020/06):** Regulatory guidance on documentation and monitoring standards for loan origination.
