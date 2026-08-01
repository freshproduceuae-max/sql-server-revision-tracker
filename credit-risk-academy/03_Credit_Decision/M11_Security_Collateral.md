# M11 — Security and Collateral Evaluation

> **Academy Track:** Commercial & Corporate Credit Risk | Module 11 of 20
> **Prerequisite Modules:** M09 (Credit Memo), M10 (Facility Structuring)
> **Estimated Study Time:** 8–10 hours

---

## 1. Business Purpose

Security is the bank's second way out. The first way out is repayment from cash flow. If the borrower cannot repay from cash flow, the bank looks to enforce its security — taking possession of or selling the assets pledged as collateral, and using the proceeds to repay the debt.

**The fundamental principle:**

Security does not make a bad credit good. A borrower who cannot generate sufficient cash flow to service the debt is a bad credit, regardless of the quality of the collateral. Security reduces Loss Given Default (LGD) but does not reduce Probability of Default (PD). The credit must be approved on the strength of the cash flow; security provides additional comfort and reduces the severity of loss in a default scenario.

**Why this matters to the analyst:**

1. **LGD reduction:** Well-secured facilities have lower LGD, which reduces Expected Loss (EL = PD × LGD × EAD) and the required provision under IFRS 9.
2. **Capital efficiency:** Under Basel IRB, recognised collateral reduces Risk-Weighted Assets, reducing the capital the bank must hold against the exposure.
3. **Covenant trigger:** Security valuation provides an additional early warning mechanism — falling LTV breaches give the bank the right to demand additional collateral or repayment.
4. **Commercial negotiation:** The quality and quantity of security is a key lever in pricing negotiations — better security justifies a lower margin.

**The three questions of security analysis:**

1. **Does the bank have a valid legal claim?** — Is the security properly created and perfected?
2. **What is the security worth?** — What will the bank actually recover if it enforces?
3. **Can the bank actually enforce?** — Are there legal, practical, or timing obstacles to enforcement?

---

## 2. Accounting Concepts

**Asset values in the financial statements:**

Assets on the balance sheet are recorded at historical cost less accumulated depreciation (under IFRS, with the option to revalue to fair value for some asset classes). Book value is often very different from market value and even further from forced sale value.

**Tangible fixed assets (IAS 16 — Property, Plant and Equipment):**
- Recorded at cost less accumulated depreciation and impairment
- Can be revalued to fair value if the entity adopts the revaluation model
- Revaluation surpluses go to Other Comprehensive Income (OCI), not P&L
- A property on the balance sheet at £2m (historic cost, purchased 30 years ago) might have a current market value of £8m. Conversely, a specialised piece of manufacturing equipment at £5m (net book value) might have a forced sale value of £500k.

**Intangible assets (IAS 38):**
- Goodwill, brand names, customer lists, software
- Generally have little or no value as security — these are not assets a bank can sell in enforcement
- The analyst must exclude intangibles when assessing net asset value for security purposes

**Inventory (IAS 2):**
- Recorded at lower of cost and net realisable value
- The credit analyst should assess whether net realisable value would hold in a distress/liquidation scenario
- Perishable inventory, fashion goods, or work-in-progress have very limited security value

**Receivables:**
- Trade debtors are a valid security class (via assignment of receivables or invoice discounting)
- The analyst must assess collectability: Are debtors concentrated in a few customers? Are there disputes? What is the age profile?

**IFRS 13 — Fair Value Measurement:**
- Defines three levels of fair value: Level 1 (quoted market prices), Level 2 (observable inputs), Level 3 (unobservable/model-based inputs)
- Security valuations should ideally be based on Level 1 or Level 2 inputs; Level 3 valuations are less reliable and require greater scrutiny

---

## 3. Financial Concepts

**Loan-to-Value (LTV):**

The central ratio in security analysis:

```
LTV = Total Secured Debt / Security Value

Example:
Mortgage: £3.5m
Commercial property value: £5.0m
LTV = 3.5 / 5.0 = 70%
```

LTV covenants are common in property-backed lending: "LTV shall not exceed 70% tested semi-annually." A breach of the LTV covenant gives the bank the right to require repayment or additional collateral.

**Market Value (MV) vs Forced Sale Value (FSV) vs Mortgage Lending Value (MLV):**

| Valuation Basis | Definition | Typical Discount vs MV | Use Case |
|----------------|-----------|----------------------|----------|
| Market Value (MV) | Price achievable in a normal arms-length transaction between willing buyer and seller | 0% (the benchmark) | General reference |
| Forced Sale Value (FSV) | Price achievable under time pressure (e.g., liquidation, administrator sale) | 20–40% below MV | Conservative credit assessment; LGD modelling |
| Mortgage Lending Value (MLV) | Sustainable long-term value, ignoring speculative elements; used in German Pfandbrief market | 10–20% below MV | Covered bond calculations; some regulatory contexts |
| Desktop Valuation | Estimate based on comparables without physical inspection | Less reliable than full survey | Monitoring; small exposures |

For credit purposes, the analyst typically applies the FSV — not the full MV — when assessing security cover, because enforcement occurs in circumstances that are likely distressed (hence the "forced" element).

**Haircuts:**

A haircut is the reduction applied to the face value or market value of an asset to arrive at the credit value:

```
Credit Value of Security = Market Value × (1 - Haircut %)

Common haircut rates:
- Prime residential property: 20–25%
- Commercial office property: 25–35%
- Secondary/retail property: 35–50%
- Plant & machinery (specialised): 50–80%
- Inventory (commodities): 20–30%
- Inventory (fashion/perishable): 60–90%
- Trade receivables (good quality): 20–25%
- Personal guarantee (creditworthy guarantor): 50–70% (or assessed separately)
- Listed equity: 30–50% (volatility-dependent)
- Unlisted equity: 50–80%
```

**Security Cover Ratio:**

```
Security Cover Ratio = Credit Value of Security / Loan Exposure

Example:
Loan: £10m
Commercial property MV: £18m
Haircut: 30%
Credit Value = £18m × (1 - 30%) = £12.6m
Security Cover = £12.6m / £10m = 1.26x

Bank's "skin in the game" is protected up to a 26% decline in property value
```

**LGD calculation from security:**

```
LGD = 1 - Recovery Rate
Recovery Rate = (Security Value at Default - Enforcement Costs) / EAD at Default

Enforcement costs typically include:
- Legal costs (receiver, solicitors): 5–15% of property value
- Time value (enforcement takes 12–24 months): Discount at cost of funds
- Maintenance/insurance during enforcement period

Illustrative LGD calculation:
EAD: £10m
Security value at default (assuming 20% decline from current MV): £14.4m
FSV of security (60% of MV): £8.64m
Less enforcement costs (10%): £0.864m
Net recovery: £7.776m
LGD = 1 - (7.776 / 10) = 22.2%
```

---

## 4. Statistical Concepts

**LGD estimation methodologies:**

Under Basel IRB Advanced Approach, banks estimate their own LGDs. This requires:

1. **Historical loss data:** At least 7 years of default and recovery data for each asset class. The bank tracks what happened to every defaulted loan: What was the security? What was recovered? How long did enforcement take?

2. **Downturn LGD:** Basel requires LGDs to reflect conditions observed during periods of high default rates (economic downturns). When many borrowers default simultaneously (a systemic event), collateral values also fall — property prices drop precisely when banks are trying to enforce against multiple properties at once. Downturn LGD is therefore higher than average LGD.

3. **Collateral type segmentation:** LGDs differ significantly by collateral type. Banks must maintain separate LGD estimates for:
   - Unsecured corporate
   - Secured against residential property
   - Secured against commercial property
   - Secured against financial collateral (cash, bonds)
   - Secured against receivables
   - Secured against plant and machinery

**Correlation between PD and LGD (the "wrong-way risk"):**

In a downturn, PD increases (more borrowers default) AND LGD increases (collateral values fall). This correlation is unfavourable for the bank — the worst outcomes coincide. Statistical models that assume PD and LGD are independent underestimate true credit risk.

For commercial real estate, this correlation is particularly strong: a property developer defaults precisely when property prices are falling and the bank is trying to sell multiple repossessed properties simultaneously, pushing prices even lower.

**Confidence intervals for valuation:**

Property valuations are inherently uncertain. An RICS valuation comes with a "valuation uncertainty" disclosure if the market is thin or comparable evidence is limited. The analyst should treat valuations as point estimates within a range, and stress-test: "If the valuation is 20% too high, what is the LTV and security cover?"

---

## 5. Regulatory Framework

**Companies Act 2006 — Charge Registration:**

In England and Wales, a charge (security interest) granted by a company must be registered at Companies House within 21 days of creation. Failure to register renders the charge void against a liquidator or administrator and against other creditors. This is "security perfection" — the legal step that makes the bank's claim enforceable.

An analyst reviewing existing security must check the Companies House register to confirm:
- All charges are registered
- The bank's charge is correctly described
- There are no prior-ranking charges that were not disclosed

**Land Registry:**

For security over land and property in England and Wales, a legal mortgage must also be registered at the Land Registry. The priority of competing charges over the same property is determined by the date of registration, not the date of creation.

**Personal Property Securities Register (PPSR — Australia/New Zealand):**

For cross-border transactions or international borrowers, the analyst must understand the equivalent registration regimes in the relevant jurisdiction. Many jurisdictions have moved to unified personal property registers following the UNCITRAL Model Law.

**Basel III/IV — Recognised Credit Risk Mitigation (CRR Part Three, Title II):**

The CRR sets out the conditions under which collateral may be "recognised" for capital purposes (i.e., reduces RWA):

**Eligible financial collateral (Standardised Approach):**
- Cash deposited with the bank
- Debt securities rated BBB- or above
- Equity securities in a main index
- Gold

**Eligible IPRE collateral (Immovable Property — Real Estate):**
- Residential property — LTV-based risk weights
- Commercial real estate — LTV-based risk weights; more restrictive treatment

**Conditions for recognition:**
- Legal certainty: The bank must be able to liquidate the collateral promptly
- Low correlation with the obligor's creditworthiness
- Proper documentation and valuation

**IFRS 9 — Impact on provisions:**

Collateral reduces LGD, which reduces ECL provision:
- Stage 1 (12-month ECL): Lower LGD → lower provision
- Stage 2/3 (lifetime ECL): Quality of collateral is a key driver of provision size
- Post-model overlays: If collateral valuations are stale or uncertain, the analyst should recommend a management overlay to the model-generated provision

---

## 6. Data Required

**Security file checklist — what must be in the credit file:**

| Document | Purpose | Source |
|----------|---------|--------|
| RICS valuation report | External, independent valuation of property | RICS-qualified surveyor (bank panel) |
| Companies House search | Confirms all charges; identifies prior-ranking charges | Companies House (direct search) |
| Land Registry title search | Confirms property ownership; identifies registered mortgages | Land Registry (direct) |
| Office copy entries | Official copy of the title register — definitive proof of ownership and incumbrances | Land Registry |
| Legal due diligence report | Solicitor's confirmation that security documents are enforceable | Panel solicitor |
| Environmental report (Phase 1) | Identifies contamination that would reduce property value | Environmental consultant |
| Insurance certificate | Confirms adequate insurance cover on secured assets | Borrower / insurance broker |
| Guarantor financial statement | For personal guarantees — financial position of guarantor | Guarantor (personal bank statements, tax returns) |
| Stock/inventory inspection report | Confirms existence and value of inventory pledged | Independent inspector |
| Debtors' ledger aging report | For receivables finance — age profile and concentration | Borrower management accounts |

---

## 7. How Analysts Actually Work

**The security review process:**

**Step 1 — Identify what security is available**
Work with the RM to understand what assets the borrower can offer. The conversation with management: "What assets do you own free and clear?" The analyst then maps these to suitable security types.

**Step 2 — Value the security**
Commission an independent valuation from an approved RICS surveyor (for property) or other specialist (for plant, inventory, receivables). The bank will have a panel of approved valuers. The analyst briefs the valuer on the purpose (credit valuation) and confirms they need both MV and FSV.

**Step 3 — Legal review**
The bank's solicitors review the proposed security documents and confirm that:
- The borrower has legal title to the assets it is pledging
- The security document is valid under the relevant law
- There are no prior-ranking interests (or, if there are, the bank's position within the priority structure is acceptable)
- The security can be properly registered

**Step 4 — Assess the security in the context of the credit**
The analyst calculates:
- LTV (ideally using FSV, not MV)
- Security Cover Ratio
- Estimated LGD
- What happens to LTV if property values fall 20%?

**Step 5 — Document in the credit memo**
The security section of the credit memo should include:
- A description of each security item
- The valuation (MV, FSV, and basis)
- The haircut applied and rationale
- The resulting security cover and LTV
- The registration status and any legal caveats
- The ongoing monitoring plan (revaluation frequency, LTV covenant)

**Practical nuances:**

*Fixed vs floating charge:* A fixed charge over a specific asset (e.g., the Basildon warehouse) gives the bank priority claim on that specific asset. A floating charge "floats" over the company's changing assets (stock, receivables) and only "crystallises" into a fixed charge on certain trigger events (e.g., appointment of an administrator). Fixed charges are generally superior to floating charges in enforcement.

*Debenture:* In UK practice, a debenture typically grants both a fixed charge over specified fixed assets and a floating charge over all other assets. It is the most comprehensive security document.

*Personal guarantee:* A personal guarantee from a director or individual shareholder commits their personal assets if the company defaults. The analyst must assess the net worth of the guarantor independently. A guarantee from a director who owns 100% of the borrower company's shares provides limited comfort — if the company defaults, the director's main asset (the shares) is worthless.

---

## 8. Excel Implementation

```excel
==============================================================
SHEET: Security_Register
==============================================================
-- Master register of all security items for a borrower

Columns:
A: Security_ID            -- Internal reference
B: Security_Type          -- PROPERTY_FIXED, PROPERTY_FLOATING, DEBENTURE,
                          -- GUARANTEE, RECEIVABLES_ASSIGNMENT, PLEDGE_SHARES
C: Description            -- e.g., "Freehold commercial warehouse, Basildon"
D: Registered_At          -- Companies House, Land Registry, etc.
E: Registration_Date
F: Registration_Number
G: Ranking                -- FIRST, SECOND, THIRD, PARI_PASSU
H: Prior_Ranking_Amt      -- Amount of any prior-ranking charge on same asset
I: MV_Date                -- Date of most recent MV valuation
J: Market_Value_GBP       -- Current MV
K: FSV_GBP                -- Forced sale value (or MV × (1 - FSV_haircut))
L: FSV_Haircut_Pct        -- e.g., 30% for commercial property
M: Credit_Value_GBP       -- = FSV_GBP - Prior_Ranking_Amt

-- Auto-calculations:
N: Months_Since_Valuation -- = (TODAY() - I) / 30.44
O: Revaluation_Flag       -- = IF(N>12, "REVALUE NOW", IF(N>9, "DUE SOON", "OK"))


==============================================================
SHEET: LTV_Calculation
==============================================================
-- Aggregates security values and calculates LTV and cover ratio

-- Total facilities (secured):
B5: Total_Drawn_Exposure        [manual input or link from facility sheet]
B6: Total_Committed_Exposure    [manual input or link]
B7: Contingent_Liabilities      [LCs, guarantees outstanding]
B8: Total_Exposure              = SUM(B5:B7)

-- Security aggregation:
B12: Sum_Market_Values          = SUMIF(Security_Register[Ranking],"FIRST",
                                    Security_Register[Market_Value_GBP])
B13: Sum_FSV                    = SUMIF(Security_Register[Ranking],"FIRST",
                                    Security_Register[FSV_GBP])
B14: Sum_Credit_Values          = SUMIF(Security_Register[Ranking],"FIRST",
                                    Security_Register[Credit_Value_GBP])

-- LTV metrics:
B18: LTV_on_MV                  = B8 / B12
B19: LTV_on_FSV                 = B8 / B13
B20: LTV_on_Credit_Value        = B8 / B14

-- Security Cover:
B24: Cover_on_MV                = B12 / B8
B25: Cover_on_FSV               = B13 / B8
B26: Cover_on_Credit_Value      = B14 / B8

-- Sensitivity: LTV at different property value declines:
-- [Use Data Table with one-way sensitivity on property value decline %]
E30: Property_Decline_Pct       [data validation dropdown: 0%, 5%, 10%, 15%, 20%, 25%, 30%]
E31: Adjusted_MV                = B12 * (1 - E30)
E32: Adjusted_FSV               = E31 * (1 - B13_haircut_assumption)
E33: Stressed_LTV               = B8 / E32
E34: LTV_Covenant_Threshold     [manual input: e.g., 75%]
E35: Covenant_Breach_Flag       = IF(E33 > E34, "BREACH AT THIS STRESS LEVEL", "OK")


==============================================================
SHEET: LGD_Calculation
==============================================================
-- Estimate LGD for internal rating and IFRS 9 provisioning purposes

-- Inputs:
B5: EAD                         [=Total committed exposure or drawn amount]
B6: Security_CV                 [Credit value from LTV sheet]
B7: Enforcement_Cost_Pct        [e.g., 10%]
B8: Time_to_Enforce_Months      [e.g., 18]
B9: Cost_of_Funds               [e.g., 5.25%]

-- Calculations:
B13: Net_Security_After_Costs   = B6 * (1 - B7)
B14: Time_Value_Discount        = B13 / (1 + B9) ^ (B8/12)
B15: Estimated_Recovery         = MIN(B14, B5)    -- Can't recover more than EAD
B16: Estimated_Loss             = B5 - B15
B17: LGD_Pct                    = B16 / B5
```

---

## 9. SQL Implementation

```sql
-- ============================================================
-- QUERY 1: Security register with valuation staleness flag
-- ============================================================
SELECT
    s.security_id,
    c.customer_name,
    f.facility_id,
    s.security_type,
    s.description,
    s.market_value,
    s.forced_sale_value,
    s.fsv_haircut_pct,
    s.credit_value,
    s.valuation_date,
    DATEDIFF(MONTH, s.valuation_date, GETDATE())    AS months_since_valuation,
    s.ranking,
    s.prior_ranking_amount,
    s.credit_value - ISNULL(s.prior_ranking_amount, 0) AS net_credit_value,
    CASE
        WHEN DATEDIFF(MONTH, s.valuation_date, GETDATE()) > 24 
             AND s.security_type LIKE '%PROPERTY%' THEN 'OVERDUE - REVALUE IMMEDIATELY'
        WHEN DATEDIFF(MONTH, s.valuation_date, GETDATE()) > 12 
             AND s.security_type LIKE '%PROPERTY%' THEN 'DUE FOR REVALUATION'
        WHEN DATEDIFF(MONTH, s.valuation_date, GETDATE()) > 18 
             AND s.security_type = 'PLANT_MACHINERY' THEN 'DUE FOR REVALUATION'
        ELSE 'CURRENT'
    END AS revaluation_status
FROM security s
JOIN facilities f ON s.facility_id = f.facility_id
JOIN customers c ON f.customer_id = c.customer_id
WHERE f.facility_status = 'ACTIVE'
ORDER BY revaluation_status DESC, months_since_valuation DESC;


-- ============================================================
-- QUERY 2: LTV calculation and covenant monitoring by facility
-- ============================================================
SELECT
    f.facility_id,
    c.customer_name,
    f.facility_type,
    f.committed_limit,
    f.current_drawn,
    -- Aggregate security values
    SUM(CASE WHEN s.ranking = 'FIRST' THEN s.market_value ELSE 0 END) 
        AS first_ranking_mv,
    SUM(CASE WHEN s.ranking = 'FIRST' THEN s.forced_sale_value ELSE 0 END) 
        AS first_ranking_fsv,
    SUM(CASE WHEN s.ranking = 'FIRST' THEN s.credit_value ELSE 0 END) 
        AS first_ranking_cv,
    -- LTV on different bases
    f.current_drawn / NULLIF(
        SUM(CASE WHEN s.ranking = 'FIRST' THEN s.forced_sale_value ELSE 0 END), 0)
        * 100 AS ltv_on_fsv_pct,
    f.committed_limit / NULLIF(
        SUM(CASE WHEN s.ranking = 'FIRST' THEN s.forced_sale_value ELSE 0 END), 0)
        * 100 AS ltv_on_fsv_committed_pct,
    -- Covenant threshold (stored on facility record)
    f.ltv_covenant_threshold_pct,
    -- Breach flag
    CASE 
        WHEN f.current_drawn / NULLIF(
            SUM(CASE WHEN s.ranking = 'FIRST' THEN s.forced_sale_value ELSE 0 END), 0) 
            * 100 > f.ltv_covenant_threshold_pct 
        THEN 'LTV COVENANT BREACH'
        ELSE 'WITHIN COVENANT'
    END AS ltv_covenant_status
FROM facilities f
JOIN customers c ON f.customer_id = c.customer_id
LEFT JOIN security s ON s.facility_id = f.facility_id
WHERE f.facility_status = 'ACTIVE'
    AND f.ltv_covenant_threshold_pct IS NOT NULL
GROUP BY f.facility_id, c.customer_name, f.facility_type,
         f.committed_limit, f.current_drawn, f.ltv_covenant_threshold_pct
ORDER BY ltv_on_fsv_committed_pct DESC;


-- ============================================================
-- QUERY 3: Companies House charge registration check
-- ============================================================
-- Compare security register against Companies House data
-- (assuming CH data is loaded into a staging table)
SELECT
    s.security_id,
    s.facility_id,
    s.description,
    s.security_type,
    ch.charge_number          AS ch_charge_number,
    ch.charge_created_date    AS ch_creation_date,
    ch.charge_registered_date AS ch_registration_date,
    DATEDIFF(DAY, ch.charge_created_date, ch.charge_registered_date) 
        AS days_to_register,
    ch.charge_status          AS ch_status,
    -- Flag if not found at Companies House
    CASE 
        WHEN ch.charge_number IS NULL THEN 'NOT FOUND AT CH - LEGAL REVIEW REQUIRED'
        WHEN ch.charge_status = 'SATISFIED' THEN 'CHARGE SATISFIED - SECURITY RELEASED'
        WHEN DATEDIFF(DAY, ch.charge_created_date, ch.charge_registered_date) > 21 
        THEN 'LATE REGISTRATION - VALIDITY RISK'
        ELSE 'OK'
    END AS registration_flag
FROM security s
LEFT JOIN companies_house_charges ch 
    ON s.ch_charge_reference = ch.charge_number
    AND s.company_number = ch.company_number
WHERE s.security_type IN ('FIXED_CHARGE','FLOATING_CHARGE','DEBENTURE')
ORDER BY registration_flag DESC;


-- ============================================================
-- QUERY 4: LGD estimation by security type (portfolio view)
-- ============================================================
WITH recovery_data AS (
    SELECT
        d.default_id,
        d.customer_id,
        d.default_date,
        d.ead_at_default,
        s.security_type,
        SUM(r.cash_recovered) AS total_recovered,
        MAX(r.recovery_date)  AS final_recovery_date,
        DATEDIFF(MONTH, d.default_date, MAX(r.recovery_date)) AS recovery_months
    FROM defaults d
    JOIN security s ON s.facility_id = d.facility_id
    LEFT JOIN recoveries r ON r.default_id = d.default_id
    WHERE d.default_date >= DATEADD(YEAR, -10, GETDATE())
    GROUP BY d.default_id, d.customer_id, d.default_date, d.ead_at_default, s.security_type
)
SELECT
    security_type,
    COUNT(*)                                    AS default_count,
    AVG(ead_at_default) / 1e6                  AS avg_ead_gbpm,
    AVG(total_recovered / NULLIF(ead_at_default, 0)) * 100 
        AS avg_recovery_rate_pct,
    100 - AVG(total_recovered / NULLIF(ead_at_default, 0)) * 100 
        AS avg_lgd_pct,
    -- Downturn LGD: 90th percentile worst loss
    PERCENTILE_CONT(0.9) WITHIN GROUP (
        ORDER BY 1 - total_recovered / NULLIF(ead_at_default, 0)
    ) OVER (PARTITION BY security_type) * 100 AS downturn_lgd_pct,
    AVG(recovery_months)                        AS avg_months_to_recover
FROM recovery_data
GROUP BY security_type
ORDER BY avg_lgd_pct DESC;
```

---

## 10. Python Implementation

```python
"""
security_analysis.py
Tools for security valuation, LTV monitoring, LGD estimation,
and portfolio security quality assessment.
"""

import pandas as pd
import numpy as np
from dataclasses import dataclass, field
from typing import Optional
from datetime import date
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches


# ─────────────────────────────────────────────────────────────
# SECURITY ITEM DEFINITIONS
# ─────────────────────────────────────────────────────────────

# Standard haircut table — bank's internal policy
SECURITY_HAIRCUTS = {
    'RESIDENTIAL_PROPERTY':        {'mv_to_fsv': 0.20, 'enforcement_cost': 0.07},
    'PRIME_COMMERCIAL_PROPERTY':   {'mv_to_fsv': 0.30, 'enforcement_cost': 0.10},
    'SECONDARY_COMMERCIAL':        {'mv_to_fsv': 0.40, 'enforcement_cost': 0.12},
    'RETAIL_PROPERTY':             {'mv_to_fsv': 0.45, 'enforcement_cost': 0.12},
    'INDUSTRIAL_PROPERTY':         {'mv_to_fsv': 0.30, 'enforcement_cost': 0.10},
    'PLANT_MACHINERY_GENERAL':     {'mv_to_fsv': 0.50, 'enforcement_cost': 0.15},
    'PLANT_MACHINERY_SPECIALISED': {'mv_to_fsv': 0.75, 'enforcement_cost': 0.20},
    'TRADE_RECEIVABLES':           {'mv_to_fsv': 0.20, 'enforcement_cost': 0.10},
    'INVENTORY_COMMODITY':         {'mv_to_fsv': 0.25, 'enforcement_cost': 0.10},
    'INVENTORY_FINISHED_GOODS':    {'mv_to_fsv': 0.35, 'enforcement_cost': 0.12},
    'INVENTORY_FASHION':           {'mv_to_fsv': 0.70, 'enforcement_cost': 0.15},
    'LISTED_EQUITY':               {'mv_to_fsv': 0.35, 'enforcement_cost': 0.05},
    'UNLISTED_EQUITY':             {'mv_to_fsv': 0.65, 'enforcement_cost': 0.15},
    'PERSONAL_GUARANTEE':          {'mv_to_fsv': 0.50, 'enforcement_cost': 0.20},
    'CASH_DEPOSIT':                {'mv_to_fsv': 0.00, 'enforcement_cost': 0.01},
}


@dataclass
class SecurityItem:
    security_id: str
    security_type: str
    description: str
    ranking: str                       # FIRST, SECOND, PARI_PASSU
    market_value: float
    valuation_date: date
    prior_ranking_debt: float = 0.0    # Debt ranking ahead of this security
    registered: bool = True
    custom_fsv_haircut: Optional[float] = None  # Override default haircut

    @property
    def fsv_haircut(self) -> float:
        if self.custom_fsv_haircut is not None:
            return self.custom_fsv_haircut
        defaults = SECURITY_HAIRCUTS.get(self.security_type, {'mv_to_fsv': 0.50})
        return defaults['mv_to_fsv']

    @property
    def forced_sale_value(self) -> float:
        return self.market_value * (1 - self.fsv_haircut)

    @property
    def enforcement_cost_rate(self) -> float:
        return SECURITY_HAIRCUTS.get(self.security_type, {'enforcement_cost': 0.15})['enforcement_cost']

    @property
    def credit_value(self) -> float:
        """Net credit value after FSV haircut and enforcement costs, net of prior-ranking debt."""
        gross = self.forced_sale_value * (1 - self.enforcement_cost_rate)
        return max(0, gross - self.prior_ranking_debt)

    @property
    def months_since_valuation(self) -> int:
        delta = date.today() - self.valuation_date
        return int(delta.days / 30.44)

    @property
    def revaluation_flag(self) -> str:
        m = self.months_since_valuation
        prop_types = ['PROPERTY', 'RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'RETAIL']
        is_property = any(p in self.security_type for p in prop_types)
        if is_property and m > 24:
            return 'OVERDUE'
        elif is_property and m > 12:
            return 'DUE_SOON'
        elif not is_property and m > 18:
            return 'DUE_SOON'
        return 'CURRENT'


# ─────────────────────────────────────────────────────────────
# SECURITY PACKAGE ANALYSIS
# ─────────────────────────────────────────────────────────────

class SecurityPackage:

    def __init__(self, borrower_name: str, total_exposure: float,
                 items: list[SecurityItem]):
        self.borrower = borrower_name
        self.exposure = total_exposure
        self.items = items

    def summary_table(self) -> pd.DataFrame:
        rows = []
        for s in self.items:
            rows.append({
                'ID': s.security_id,
                'Type': s.security_type,
                'Description': s.description[:50],
                'Ranking': s.ranking,
                'MV (£m)': round(s.market_value / 1e6, 3),
                'FSV Haircut (%)': round(s.fsv_haircut * 100, 1),
                'FSV (£m)': round(s.forced_sale_value / 1e6, 3),
                'Enforcement Cost (%)': round(s.enforcement_cost_rate * 100, 1),
                'Prior Ranking (£m)': round(s.prior_ranking_debt / 1e6, 3),
                'Net Credit Value (£m)': round(s.credit_value / 1e6, 3),
                'Val Date': s.valuation_date,
                'Months Old': s.months_since_valuation,
                'Revaluation Flag': s.revaluation_flag,
                'Registered': 'YES' if s.registered else 'NO - ACTION REQUIRED',
            })
        return pd.DataFrame(rows)

    @property
    def total_market_value(self) -> float:
        return sum(s.market_value for s in self.items if s.ranking == 'FIRST')

    @property
    def total_fsv(self) -> float:
        return sum(s.forced_sale_value for s in self.items if s.ranking == 'FIRST')

    @property
    def total_credit_value(self) -> float:
        return sum(s.credit_value for s in self.items if s.ranking == 'FIRST')

    @property
    def ltv_on_fsv(self) -> float:
        return self.exposure / self.total_fsv if self.total_fsv else float('inf')

    @property
    def cover_ratio(self) -> float:
        return self.total_credit_value / self.exposure if self.exposure else 0

    def lgd_estimate(self, cost_of_funds: float = 0.0525,
                     enforcement_months: int = 18) -> dict:
        """Estimate LGD from security package."""
        # Time-value discount on recovery
        gross_recovery = self.total_credit_value
        discounted_recovery = gross_recovery / (1 + cost_of_funds) ** (enforcement_months / 12)
        capped_recovery = min(discounted_recovery, self.exposure)
        loss = max(0, self.exposure - capped_recovery)
        lgd = loss / self.exposure if self.exposure else 1.0
        return {
            'exposure': self.exposure,
            'gross_credit_value': round(gross_recovery, 0),
            'time_discounted_recovery': round(discounted_recovery, 0),
            'capped_recovery': round(capped_recovery, 0),
            'estimated_loss': round(loss, 0),
            'lgd_pct': round(lgd * 100, 1),
            'recovery_rate_pct': round((1 - lgd) * 100, 1),
        }

    def stress_test(self, value_declines: list[float] = None) -> pd.DataFrame:
        """Stress-test security at various value decline scenarios."""
        if value_declines is None:
            value_declines = [0.0, 0.10, 0.20, 0.30, 0.40, 0.50]
        rows = []
        for d in value_declines:
            stressed_items = [
                SecurityItem(
                    s.security_id, s.security_type, s.description, s.ranking,
                    s.market_value * (1 - d),  # Stressed MV
                    s.valuation_date, s.prior_ranking_debt, s.registered
                )
                for s in self.items
            ]
            stressed_pkg = SecurityPackage(self.borrower, self.exposure, stressed_items)
            rows.append({
                'Value Decline (%)': f'{int(d*100)}%',
                'Stressed MV (£m)': round(stressed_pkg.total_market_value / 1e6, 2),
                'Stressed FSV (£m)': round(stressed_pkg.total_fsv / 1e6, 2),
                'Stressed CV (£m)': round(stressed_pkg.total_credit_value / 1e6, 2),
                'LTV on FSV (%)': round(stressed_pkg.ltv_on_fsv * 100, 1),
                'Cover Ratio (x)': round(stressed_pkg.cover_ratio, 2),
                'LGD (%)': round(stressed_pkg.lgd_estimate()['lgd_pct'], 1),
            })
        return pd.DataFrame(rows)

    def print_report(self):
        """Print a full security analysis report."""
        print("=" * 70)
        print(f"SECURITY ANALYSIS: {self.borrower}")
        print("=" * 70)
        print(f"Total Exposure:           £{self.exposure/1e6:.2f}m")
        print(f"Total MV (first charge):  £{self.total_market_value/1e6:.2f}m")
        print(f"Total FSV (first charge): £{self.total_fsv/1e6:.2f}m")
        print(f"Total Credit Value:       £{self.total_credit_value/1e6:.2f}m")
        print(f"LTV on FSV:               {self.ltv_on_fsv*100:.1f}%")
        print(f"Security Cover (x):       {self.cover_ratio:.2f}x")
        print()
        lgd = self.lgd_estimate()
        print("── LGD ESTIMATE ─────────────────────────────────────────────────")
        for k, v in lgd.items():
            print(f"  {k}: {v}")
        print()
        print("── SECURITY DETAIL ──────────────────────────────────────────────")
        print(self.summary_table().to_string(index=False))
        print()
        print("── STRESS TEST ──────────────────────────────────────────────────")
        print(self.stress_test().to_string(index=False))


# ─────────────────────────────────────────────────────────────
# EXAMPLE USAGE
# ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    items = [
        SecurityItem('S001', 'PRIME_COMMERCIAL_PROPERTY',
                     'Freehold warehouse, Basildon, Essex',
                     'FIRST', 8_500_000, date(2024, 3, 15), prior_ranking_debt=0),
        SecurityItem('S002', 'INDUSTRIAL_PROPERTY',
                     'Leasehold factory, Coventry',
                     'FIRST', 4_200_000, date(2024, 3, 15), prior_ranking_debt=0),
        SecurityItem('S003', 'PLANT_MACHINERY_GENERAL',
                     'Production line equipment',
                     'FIRST', 2_000_000, date(2023, 9, 1), prior_ranking_debt=0),
        SecurityItem('S004', 'TRADE_RECEIVABLES',
                     'Assignment of trade receivables',
                     'FIRST', 3_500_000, date(2024, 6, 30), prior_ranking_debt=0),
        SecurityItem('S005', 'PERSONAL_GUARANTEE',
                     'Personal guarantee — J. Smith (Director)',
                     'FIRST', 1_200_000, date(2024, 1, 10), prior_ranking_debt=0),
    ]

    pkg = SecurityPackage('Acme Manufacturing Ltd', total_exposure=12_000_000, items=items)
    pkg.print_report()
```

---

## 11. Interview Questions

**Q1: What is the difference between a fixed charge and a floating charge, and which gives the bank more protection?**

*Expected:* A fixed charge attaches to a specific identifiable asset and prevents the borrower from dealing with that asset without the bank's consent. A floating charge "floats" over a class of changing assets (stock, debtors) until crystallisation. Fixed charge gives priority over preferential creditors (e.g., employees); floating charge ranks below preferential creditors. A debenture typically combines both.

**Q2: A borrower offers you a second-ranking charge over their main property, which is already subject to a first-ranking mortgage of £3m. The property MV is £5m and the loan you are making is £1.5m. Assess this security.**

*Expected:* FSV ≈ £3.5m (30% haircut). After deducting the first-ranking mortgage of £3m, remaining equity = £0.5m. This gives very thin security cover for a £1.5m loan. The bank would be largely unsecured. Further, in an enforcement scenario, the first-ranking mortgagee controls the sale process. LGD would be very high. The security is inadequate as the primary mitigant; the credit must stand on its own cash flow merits.

**Q3: What is "security perfection" and why does it matter?**

*Expected:* Perfection is the legal process of making security enforceable against third parties. For charges over company assets, this means registration at Companies House within 21 days. For property mortgages, registration at the Land Registry. An unperfected charge may be void against a liquidator or administrator — the bank would be an unsecured creditor in insolvency, not a secured creditor. This is a fundamental legal risk that the analyst must verify.

**Q4: Why is forced sale value more appropriate than market value for credit analysis?**

*Expected:* When a bank enforces, it is acting under distress conditions — the borrower has defaulted, there is time pressure, and the bank may not be optimally positioned to market the asset. FSV reflects a realistic recovery in enforcement, which typically occurs in adverse market conditions. Using MV would overstate the protection the security provides.

**Q5: How does collateral quality affect IFRS 9 provisions?**

*Expected:* Collateral reduces LGD. IFRS 9 ECL = PD × LGD × EAD. Better collateral → lower LGD → lower provision requirement. In Stage 3 (credit-impaired), the provision is effectively calculated as EAD minus the present value of expected cash recoveries (including security enforcement proceeds). The quality, enforceability, and current valuation of security therefore directly drives the Stage 3 provision amount.

---

## 12. Common Mistakes

**Mistake 1: Relying on book value instead of market/forced sale value**
The balance sheet shows assets at depreciated cost. This is irrelevant for security analysis. Always use an independent current valuation.

**Mistake 2: Not checking for prior-ranking charges**
A borrower may have a debenture in favour of a prior lender that covers all their assets. A "first charge" offered to the bank might actually be a second or third charge if the company's existing debenture holder has a prior claim. Always do a Companies House search before accepting security.

**Mistake 3: Treating a personal guarantee from the sole director as meaningful when it is not**
If a director owns 100% of the company and the company fails, the director's main asset (the shares) is worthless. Unless the director has significant personal assets independent of the company (property, savings), the guarantee adds little.

**Mistake 4: Not considering correlation between the borrower and the security**
A company's own factory has correlated value with the company. If the company fails because its industry is in distress, the factory in that sector may also be hard to sell. Security over assets that are closely tied to the borrower's business provides less true diversification benefit.

**Mistake 5: Stale valuations**
Using a 3-year-old valuation for a commercial property in a market that has moved 25% since then. Valuation policy must be followed: typically annual revaluation for primary security above a materiality threshold, desktop revaluation more frequently if market conditions have changed.

**Mistake 6: Ignoring enforcement costs and time**
The LGD calculation must net enforcement costs (receiver's fees, solicitors, insurance, maintenance, time value of money during the enforcement period). A property worth £10m might yield only £7m–8m after an 18–24 month enforcement process.

---

## 13. Case Studies

**Case Study A: The Missing Registration**

*Situation:* A property development company defaulted on a £8m term loan. The bank believed it held a first-ranking charge over a commercial site valued at £12m. The Relationship Manager had confirmed security was "in place."

*What actually happened:* On reviewing the Companies House register as part of the default management process, it emerged that the charge had been created but never registered. Under s.859H of the Companies Act 2006, the charge was void against the administrator, who had been appointed that day. The bank became an unsecured creditor in the administration — effectively at the back of the queue.

*Recovery:* The bank recovered approximately 30% of its loan through the unsecured creditor distribution. Had the charge been registered, recovery would have been approximately 85%.

*Lesson:* Security registration must be confirmed by the bank's solicitors before any funds are drawn. A pre-drawdown legal condition precedent should include: "Receipt of evidence satisfactory to the bank that all security documents have been duly executed and registered."

---

**Case Study B: The Guarantor Who Wasn't Worth What He Claimed**

*Situation:* A £2.5m business loan was supported by a personal guarantee from the owner-director who declared personal net worth of £4m (primarily his house). The credit memo noted the guarantee as providing "comfortable security cover."

*Reality:* The director's house was mortgaged to 85% LTV with another bank. His effective equity was approximately £600k, not £4m. Additionally, his wife was a joint owner — the bank could only enforce against the director's 50% share in insolvency, subject to his wife's right of occupation (Family Law Act 1996).

*Effective guarantee value:* Approximately £200k–£250k on a £2.5m loan — de minimis.

*Lesson:* Personal guarantee assessments must include: (a) independent verification of asset values, (b) check for incumbrances (mortgages) on those assets, (c) consideration of joint ownership and third-party rights, (d) realistic assessment of the guarantor's liquidity (selling a house takes time and costs money).

---

## 14. Iterative Reinforcement

**Week 1:** Do a Companies House search on three of your borrowers. Map the registered charges. Does the bank's position match what is in the credit file?

**Week 2:** Obtain the most recent property valuation for a secured property in your portfolio. Identify: (a) the MV, (b) the FSV (does the valuer provide both?), (c) the valuer's assumptions about the market, (d) the "special assumptions" or caveats.

**Week 3:** Calculate the LGD for a secured facility in your portfolio using the FSV and your estimate of enforcement costs. How does this compare to the LGD in the bank's risk system?

**Week 4:** Stress the security on a property-backed loan by assuming property values decline 25%. Does the LTV covenant breach? Is the security still sufficient to repay the loan?

**Spaced repetition prompts:**
- What is the difference between MV, FSV, and MLV?
- What is the consequence of failing to register a charge at Companies House within 21 days?
- Why does LGD increase in a systemic downturn, even if individual security valuations are unchanged?
- Name four items that must be considered when assessing the value of a personal guarantee.

---

## 15. Source Material

**Legal:**
- Companies Act 2006, Part 25 — Company Charges: registration requirements
- Land Registration Act 2002 — property registration and priority
- Insolvency Act 1986 — ranking of creditors; effect of floating charges on insolvency
- Law of Property Act 1925 — legal mortgages over land

**Regulatory:**
- CRR (EU) 575/2013, Part Three, Title II, Chapter 4: Credit Risk Mitigation — eligible collateral and recognition conditions
- EBA Guidelines on Loan Origination and Monitoring (EBA/GL/2020/06), Section 5: Collateral valuation

**Valuation standards:**
- RICS Valuation — Professional Standards (the "Red Book"), 2022 edition — the authoritative UK standard for property valuations
- RICS Guidance Note: Valuation of Individual New-Build Homes
- International Valuation Standards (IVS) — global framework for all asset valuation

**Practitioner:**
- Wood, P.: *Comparative Law of Security Interests and Title Finance* (Sweet & Maxwell) — comprehensive legal reference for security law across jurisdictions
- Goode, R.: *Commercial Law* (5th ed., Penguin) — excellent on charges, receivables, and personal property security
- Penn, G., Shea, A. and Arora, A.: *The Law Relating to Domestic Banking* — practical UK banking law reference
