# M10 — Facility Structuring

> **Academy Track:** Commercial & Corporate Credit Risk | Module 10 of 20
> **Prerequisite Modules:** M09 (Credit Memo), M01–M08 (Financial Analysis)
> **Estimated Study Time:** 8–10 hours

---

## 1. Business Purpose

Facility structuring is the discipline of designing a credit product that matches the borrower's economic need while protecting the bank's repayment risk. It sits at the intersection of credit risk, product knowledge, and commercial judgement.

**Why structuring matters:**

A bank can lend the right amount to the right borrower and still lose money if the facility is structured incorrectly. Poor structuring creates:
- **Liquidity mismatch:** Short-term facilities used for long-term assets
- **Refinancing risk:** Bullet repayment due when the borrower is unable to refinance
- **Over-leverage:** Committed facilities that the borrower cannot afford to repay
- **Hidden optionality:** Revolving facilities that behave like term debt in stress

Good structuring means the bank is repaid in the normal course of business — it does not need enforcement of security to get its money back. The second way out (security) should be a contingency, not the primary repayment source.

**The structuring conversation:**

Structuring starts with understanding the borrower's purpose. The analyst must challenge the Relationship Manager's proposed terms:
1. What is the money actually being used for?
2. What is the source of repayment?
3. What is the timing mismatch between cash outflow and expected cash inflow?
4. What are the risks to that repayment timeline?

**The four structuring parameters:**

Every credit facility is defined by four parameters that must be consistent with each other:
1. **Amount** — how much?
2. **Tenor** — for how long?
3. **Repayment profile** — how does the bank get its money back?
4. **Price** — what is the bank paid for taking the risk?

Getting any one of these wrong undermines the credit.

---

## 2. Accounting Concepts

**How accounting drives facility type selection:**

**Balance sheet composition determines appropriate tenor:**
- Long-term assets (property, plant, equipment) should be funded by long-term debt. A borrower who funds a 20-year industrial property with a 3-year overdraft has created refinancing risk.
- Short-term assets (receivables, inventory) should be funded by short-term revolving facilities. The facility reverts to zero as the working capital cycle completes.

**The accounting treatment of different facility types (borrower's perspective):**

| Facility Type | Balance Sheet Treatment (Borrower) |
|--------------|-----------------------------------|
| Term loan | Long-term liability (or split current/non-current by repayment schedule) |
| RCF — drawn | Short-term liability if tenor < 12 months; long-term if > 12 months and committed |
| RCF — undrawn | Off-balance-sheet commitment; disclosed in notes |
| Finance lease | Right-of-use asset and lease liability under IFRS 16 |
| Trade finance (LC) | Contingent liability until drawn |
| Performance bond/guarantee | Contingent liability; provided for if likely to be called |

**Off-balance-sheet vs on-balance-sheet:**

Pre-IFRS 16, operating leases were off-balance-sheet. Post-IFRS 16, all leases > 12 months are on-balance-sheet. This means a retailer with 200 store leases now has a materially larger balance sheet than it did under pre-IFRS 16 standards. Facility structuring must account for this: if a covenant uses Net Debt/EBITDA, it must specify whether IFRS 16 lease liabilities are included in "Net Debt."

**Capitalisation and EBITDA adjustments:**

Some borrowers capitalise costs that peers expense. This inflates EBITDA (the denominator in leverage ratios) and therefore flatters leverage. The structure of leverage covenants must define EBITDA precisely — typically as the EBITDA per the accounts, adjusted for:
- Non-recurring items (restructuring, one-off costs)
- Non-cash items (share-based compensation)
- Annualisation of acquisitions ("run-rate EBITDA")

This adjusted EBITDA definition is drafted into the facility agreement and must be explicitly stated.

---

## 3. Financial Concepts

**Facility types and their financial logic:**

**1. Revolving Credit Facility (RCF)**

An RCF allows the borrower to draw, repay, and redraw up to a committed limit during the availability period. It mirrors the working capital cycle: the borrower draws to fund receivables or inventory buildup, then repays as those assets convert to cash.

Key financial characteristics:
- **Evergreen nature:** The total debt level doesn't decrease unless the borrower actively repays and doesn't redraw
- **Average utilisation:** Banks typically model 30–50% average utilisation for commitment fee/EAD purposes (borrowers rarely use 100% at all times)
- **Self-liquidating quality:** In theory, an RCF should be periodically at or near zero — if it is always fully drawn, it may be functioning as disguised term debt

**2. Term Loan A (TLA) — Amortising**

A term loan with scheduled principal repayments throughout the life. Financial logic: the borrower's cash flow is strong enough to make regular principal payments. The bank's exposure reduces over time. Common for acquisition finance and capex finance where cash flows are predictable.

```
Amortising Term Loan — Annual Repayment Schedule:
Year 0: Drawdown £50m
Year 1: Repay £10m → Outstanding £40m
Year 2: Repay £10m → Outstanding £30m
Year 3: Repay £10m → Outstanding £20m
Year 4: Repay £10m → Outstanding £10m
Year 5: Repay £10m → Outstanding £0
```

**3. Term Loan B (TLB) — Bullet**

A term loan with minimal amortisation (typically 1% per annum) and a large bullet payment at maturity. Common in leveraged buyouts (LBOs) where the sponsor's strategy is to grow EBITDA and refinance rather than delever through cash flow. Carries higher refinancing risk; usually carries a higher margin.

**4. Overdraft**

A demand facility (repayable on demand) allowing the borrower's bank account to go negative up to an agreed limit. The shortest and most flexible facility type. Appropriate only for very short-term needs (payroll, unexpected cash timing mismatches). Should not be used for structural funding needs.

**5. Capital Expenditure (Capex) Facility**

A term facility specifically for purchasing assets. Availability period is the construction/purchase period; once committed expenditure is complete, the facility is fully drawn and amortises. The amortisation schedule should be calibrated to the useful life of the asset being financed.

**6. Acquisition Finance**

A facility to fund the purchase of another company. Typically structured as:
- RCF for working capital of the combined group
- Term Loan A (amortising) representing the senior secured portion
- Possibly Term Loan B or PIK (payment-in-kind) for more leveraged structures
- Bridge loan covering the period between signing and closing of the acquisition

**7. Trade Finance**

Sub-products:
- **Letter of Credit (LC):** A bank commitment to pay a seller on behalf of a buyer upon presentation of specified documents. The bank's risk is that the buyer cannot reimburse it.
- **Documentary Collection:** Bank facilitates document exchange but does not guarantee payment. Lower bank risk.
- **Guarantee / Performance Bond:** Bank guarantees that the borrower will perform a contractual obligation (e.g., complete a construction project). If the borrower fails, the bank pays out.
- **Import/Export Finance:** Short-term funding of the trading cycle.

**Pricing components:**

```
All-In Cost of a Loan =
    Base Rate (SONIA/SOFR/Fixed)
  + Credit Margin
  + (Arrangement Fee amortised over life of facility)
  + Commitment Fee (on undrawn portion)
  + Agency / Administration Fee
  + Utilisation Fee (if drawn above a trigger threshold)
```

Example pricing for a BBB-equivalent borrower (RCF, 3-year, £50m):
- SONIA: 5.25%
- Margin: 1.75% (175 bps)
- Arrangement fee: 0.75% (75 bps) upfront, amortised over 3 years = ~25 bps p.a.
- Commitment fee: 35% of margin on undrawn = ~61 bps on undrawn
- All-in cost to borrower on drawn portion: approximately 7.00% + fees

**Material Adverse Change (MAC) clause:**

A MAC clause allows the bank to cancel undrawn commitments or call an event of default if there has been a "material adverse change" in the borrower's financial condition, business, or prospects. MAC clauses are contentious:
- They are rarely invoked because they are hard to prove in court (the burden of proof is high)
- Their primary value is informational — they give the bank a negotiating tool
- Post-pandemic, borrowers have pushed back hard on broad MAC definitions
- Analysts should not rely on MAC as a primary mitigant; it is a backstop

---

## 4. Statistical Concepts

**Utilisation rate modelling (EAD for RCFs):**

Under Basel IRB, the EAD for an undrawn commitment is calculated as:
```
EAD = Current Drawn Amount + CCF × Undrawn Amount

Where CCF (Credit Conversion Factor) is the proportion of the undrawn
commitment expected to be drawn at default.
```

Empirically, borrowers increase drawdowns on revolving facilities as their credit quality deteriorates. This "adverse selection" effect means CCFs are typically 50–75% under the IRB approach for corporate RCFs. Structuring implication: the bank's real risk on a £50m RCF is not £50m × utilisation today — it is closer to £50m × 60–75% in a default scenario even if today's utilisation is 30%.

**Tenor and default probability:**

The PD for a 5-year facility is higher than for a 1-year facility, holding all else equal. This is because:
1. There are more opportunities for the borrower's credit quality to deteriorate
2. The uncertainty about future performance increases with time horizon

The term structure of credit risk (analogous to the yield curve in interest rate markets) is typically upward-sloping: longer tenor = higher PD = higher required margin.

```
Illustrative PD term structure (BB-rated borrower):
1-year PD: 1.5%
3-year cumulative PD: 5.2%
5-year cumulative PD: 9.8%
```

**Break-even analysis — minimum EBITDA to service debt:**

```
Break-even EBITDA = Total Debt Service / DSCR_Minimum

Example:
Annual interest: £3.5m
Annual principal repayment: £5.0m
Total debt service: £8.5m
Minimum DSCR covenant: 1.20x
Break-even EBITDA = £8.5m × 1.20 = £10.2m

If current EBITDA is £16m, headroom = £16m - £10.2m = £5.8m
Margin of safety = 36%
```

---

## 5. Regulatory Framework

**Large Exposures (CRR, Part Four):**

A "large exposure" is any exposure to a single counterparty or connected group that equals or exceeds 10% of the bank's Tier 1 Capital. Banks must:
- Report all large exposures to the regulator
- Ensure no single exposure exceeds 25% of Tier 1 Capital (the hard limit)
- Factor large exposure limits into facility structuring

Structuring implication: a proposed £200m facility to a borrower may exceed the bank's large exposure limit. The bank may need to syndicate the facility to other banks and retain only a portion, or decline to be sole lender.

**Leveraged Lending Guidelines:**

The ECB Leveraged Finance Guidance (2017, updated 2022) sets supervisory expectations for highly leveraged transactions:
- Transactions where total leverage exceeds 6.0x EBITDA are "particularly aggressive" and will attract supervisory scrutiny
- Banks are expected to assess whether the borrower can repay or refinance at least 50% of its total debt within 7 years
- These guidelines apply to acquisition finance and LBO transactions

The PRA has equivalent expectations in the UK context.

**Concentration limits:**

Beyond single-name large exposures, banks have internal concentration limits by:
- Sector (e.g., max 15% of portfolio in commercial real estate)
- Geography (e.g., max 10% in a single non-UK country)
- Product type (e.g., max 20% in leveraged loans)

Structuring must check all three against the bank's Risk Appetite Statement.

**Loan-to-Value requirements:**

For property-backed lending, the CRR sets specific risk weights based on LTV:
- Residential mortgages: preferential risk weight for LTV ≤ 80%
- Commercial real estate: 100% risk weight for the portion exceeding the lower of 50% of market value or 60% of mortgage lending value

**IFRS 9 — Day 1 Staging:**

If a facility is structured with characteristics that indicate high credit risk at origination (e.g., deep subordination, very high leverage, PIK interest), it may need to be booked at Stage 2 on day 1, requiring a lifetime ECL provision immediately. This has a P&L impact that must be considered in the commercial case for the transaction.

---

## 6. Data Required

**Structuring-specific data requirements:**

| Data Point | Why Needed for Structuring | Source |
|-----------|--------------------------|--------|
| Asset life of capex being funded | Sets maximum appropriate tenor | Management / surveyor |
| Working capital cycle length | Sets appropriate RCF size and tenor | Management accounts, DSO/DIO/DPO analysis |
| Free cash flow generation | Sets maximum sustainable amortisation rate | Financial model |
| Existing debt maturity profile | Avoids structuring a new facility that matures at the same time as existing refinancing needs ("maturity walls") | Credit file, Companies House |
| Group structure diagram | Identifies where security should be taken; ensures correct obligor | Management |
| Intercompany loan documentation | May represent hidden liabilities; affects where cash sits | Management |
| Material contracts (customer, supplier) | Revenue concentration; change of control provisions | Management |
| Capex programme detail | Validates capex facility amount and drawdown profile | Management / business plan |
| Market comparables (comparable transactions) | Validates pricing and terms | Bloomberg, Refinitiv, market intelligence |

---

## 7. How Analysts Actually Work

**The structuring dialogue:**

Structuring is not purely a credit function — it is a collaborative process between the Relationship Manager (RM), the credit analyst, the product team (e.g., transaction banking for trade finance), and legal. The analyst's role is to ensure that the proposed structure does not create credit risks that the pricing doesn't compensate for.

**Common structuring conversations the analyst drives:**

*"The RM wants a 5-year bullet RCF for working capital"*
- Analyst challenge: An RCF should theoretically be periodically repaid as the working capital cycle completes. A 5-year bullet means the bank has no repayment mechanism other than the borrower's willingness to pay. This is more like a term loan in credit terms. Can we add a periodic clean-down covenant (e.g., the facility must be zero for 30 consecutive days once per year)? This tests whether the facility is being used for genuine working capital or is providing structural funding.

*"The borrower wants a £30m capex facility for a new plant"*
- Analyst challenge: What is the useful life of the plant? 20 years? Then why is the facility tenored at 5 years? The borrower will need to refinance when the plant is only 5 years old and still being ramped up. Can we extend the tenor to 7–10 years to reduce refinancing risk? Or require significant equity co-investment so the bank is not funding the entire capex?

*"The borrower wants a bullet repayment on the term loan"*
- Analyst challenge: What is the source of the bullet repayment? Refinancing? Asset sale? IPO? These are all uncertain. An amortising structure is lower risk for the bank. If the borrower insists on bullet, can we add mandatory prepayment clauses triggered by cash sweeps (excess cash flow) that progressively reduce the outstanding?

**Amortisation schedule design:**

The amortisation schedule should be designed so that the outstanding balance at any point in time does not exceed the supportable debt level given the borrower's projected EBITDA. In practice:

```
Year 1 outstanding ≤ Projected Year 1 EBITDA × Maximum Leverage Covenant
Year 2 outstanding ≤ Projected Year 2 EBITDA × Maximum Leverage Covenant
...
```

If EBITDA is growing, the loan can be structured with back-loaded amortisation. If EBITDA is declining or uncertain, front-loaded amortisation protects the bank.

**Mandatory prepayment events:**

Standard mandatory prepayment triggers in a well-structured facility:
1. **Excess cash flow sweep:** 50% of "excess cash flow" (defined in the agreement) must prepay the term loan. Ensures the bank benefits from outperformance.
2. **Asset disposal proceeds:** Proceeds from sale of material assets must prepay debt.
3. **Insurance proceeds:** Material insurance receipts (e.g., from destruction of a major asset) must prepay.
4. **Change of control:** If the borrower is sold, the new owners must refinance the bank's debt (the bank may not want to lend to the new owners).
5. **Equity issuance proceeds:** IPO or capital raise proceeds prepay debt.

---

## 8. Excel Implementation

**Facility structuring model — core sheets:**

```excel
==============================================================
SHEET: Facility_Terms
==============================================================
-- Input table for all proposed facilities

   A               B              C         D        E       F        G
   Facility_Name   Facility_Type  Amount    Tenor    Margin  Base     Repayment
   RCF             RCF            15000000  3        225     SONIA    BULLET
   Term Loan A     TERM_LOAN      25000000  5        250     SONIA    AMORTISING

==============================================================
SHEET: Amortisation_Schedule
==============================================================
-- Calculates outstanding balance and interest for each period

Row 1: Header — Period | Date | Opening Balance | Drawdown | Repayment | Closing Balance | Interest | Commitment Fee

-- Opening balance: Prior period closing balance
=IF(B3="",0, F2)

-- Repayment (amortising):
=IF(repayment_type="AMORTISING", original_amount/tenor_periods, 0)

-- Interest calculation:
=(opening_balance) * (SONIA + margin) / 12   [monthly]
-- OR for annual:
=(opening_balance + closing_balance) / 2 * (SONIA + margin)  [using average balance]

-- Commitment fee on undrawn RCF:
=(committed_limit - drawn_amount) * commitment_fee_rate / 12

==============================================================
SHEET: RAROC_Calculation (Risk-Adjusted Return on Capital)
==============================================================
-- Revenue
Annual_Interest_Income      = avg_drawn * (SONIA + margin)
Arrangement_Fee_Income      = arrangement_fee * committed_limit / tenor_years
Commitment_Fee_Income       = avg_undrawn * commitment_fee_rate
Other_Fee_Income            = agency_fee + other_fees
Total_Revenue               = SUM(above)

-- Costs
Funding_Cost                = avg_drawn * cost_of_funds
Overhead_Allocation         = avg_drawn * overhead_rate     [e.g., 0.50%]
Expected_Credit_Loss        = avg_drawn * PD * LGD          [ECL charge]
Total_Cost                  = SUM(above)

-- Net Income
Net_Income_Pre_Tax          = Total_Revenue - Total_Cost
Net_Income_Post_Tax         = Net_Income_Pre_Tax * (1 - tax_rate)

-- Capital Requirement (simplified)
RWA                         = avg_drawn * risk_weight        [e.g., 100% for corporate]
Capital_Required            = RWA * capital_ratio            [e.g., 10.5% total capital ratio]

-- Return on Capital
RAROC                       = Net_Income_Post_Tax / Capital_Required
-- Target RAROC is typically 10-15% (bank's cost of equity threshold)

==============================================================
SHEET: Sensitivity — Margin vs Leverage
==============================================================
-- Two-way data table showing RAROC at different margin levels (rows)
-- and different average utilisation assumptions (columns)

-- Row headers: Margin 150bps, 175, 200, 225, 250, 275, 300bps
-- Column headers: Utilisation 30%, 40%, 50%, 60%, 70%, 80%
-- Formula in each cell references RAROC_Calculation sheet

-- Use Excel Data Table (What-If Analysis > Data Table)
-- Row input cell: Margin cell in Facility_Terms sheet
-- Column input cell: Utilisation cell
```

---

## 9. SQL Implementation

```sql
-- ============================================================
-- QUERY 1: Facility type mix across the portfolio
-- ============================================================
SELECT
    f.facility_type,
    COUNT(*)                                        AS facility_count,
    SUM(f.committed_limit) / 1e6                   AS total_committed_gbpm,
    SUM(f.current_drawn) / 1e6                     AS total_drawn_gbpm,
    AVG(f.current_drawn / NULLIF(f.committed_limit,0)) * 100 AS avg_utilisation_pct,
    AVG(DATEDIFF(MONTH, f.start_date, f.maturity_date))      AS avg_tenor_months,
    AVG(f.interest_rate_margin)                    AS avg_margin_bps
FROM facilities f
WHERE f.facility_status = 'ACTIVE'
    AND f.start_date >= '2020-01-01'
GROUP BY f.facility_type
ORDER BY total_committed_gbpm DESC;


-- ============================================================
-- QUERY 2: Detect facilities acting as disguised term debt
-- (RCFs that have never been at or near zero)
-- ============================================================
WITH utilisation_history AS (
    SELECT
        fu.facility_id,
        fu.snapshot_date,
        fu.drawn_amount,
        f.committed_limit,
        fu.drawn_amount / NULLIF(f.committed_limit, 0) AS utilisation_rate,
        MIN(fu.drawn_amount / NULLIF(f.committed_limit, 0)) 
            OVER (PARTITION BY fu.facility_id 
                  ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS min_utilisation_ever
    FROM facility_utilisation fu
    JOIN facilities f ON fu.facility_id = f.facility_id
    WHERE f.facility_type = 'RCF'
        AND f.facility_status = 'ACTIVE'
        AND fu.snapshot_date >= DATEADD(YEAR, -1, GETDATE())
)
SELECT
    f.facility_id,
    c.customer_name,
    f.committed_limit / 1e6                         AS limit_gbpm,
    AVG(uh.utilisation_rate) * 100                  AS avg_utilisation_pct,
    MIN(uh.utilisation_rate) * 100                  AS min_utilisation_pct,
    -- Flag facilities that have never dipped below 80% utilisation
    CASE 
        WHEN MIN(uh.min_utilisation_ever) > 0.80 
        THEN 'REVIEW NEEDED - Never below 80% - possible term debt'
        ELSE 'OK'
    END AS structuring_flag
FROM utilisation_history uh
JOIN facilities f ON uh.facility_id = f.facility_id
JOIN customers c ON f.customer_id = c.customer_id
GROUP BY f.facility_id, c.customer_name, f.committed_limit
ORDER BY avg_utilisation_pct DESC;


-- ============================================================
-- QUERY 3: Maturity wall analysis — upcoming refinancing cliff
-- ============================================================
SELECT
    YEAR(f.maturity_date)                           AS maturity_year,
    MONTH(f.maturity_date)                          AS maturity_month,
    f.facility_type,
    SUM(f.committed_limit) / 1e6                   AS maturing_committed_gbpm,
    SUM(f.current_drawn) / 1e6                     AS maturing_drawn_gbpm,
    COUNT(*)                                        AS facility_count,
    COUNT(DISTINCT f.customer_id)                  AS borrower_count
FROM facilities f
WHERE f.facility_status = 'ACTIVE'
    AND f.maturity_date BETWEEN GETDATE() AND DATEADD(YEAR, 3, GETDATE())
GROUP BY YEAR(f.maturity_date), MONTH(f.maturity_date), f.facility_type
ORDER BY maturity_year, maturity_month, f.facility_type;


-- ============================================================
-- QUERY 4: Pricing vs risk rating — check for mispriced facilities
-- ============================================================
SELECT
    ra.risk_grade,
    ra.pd_bps,
    f.facility_type,
    COUNT(*)                            AS facility_count,
    AVG(f.interest_rate_margin)         AS avg_margin_bps,
    MIN(f.interest_rate_margin)         AS min_margin_bps,
    MAX(f.interest_rate_margin)         AS max_margin_bps,
    -- Expected minimum margin = PD * LGD * 10000 (convert to bps, assume 45% LGD)
    ra.pd_bps * 0.45                    AS theoretical_min_margin_bps,
    -- Flag facilities priced below theoretical minimum
    SUM(CASE 
        WHEN f.interest_rate_margin < ra.pd_bps * 0.45 
        THEN 1 ELSE 0 
    END)                               AS count_below_min_margin
FROM facilities f
JOIN risk_assessments ra ON f.customer_id = ra.customer_id
    AND ra.rating_date = (
        SELECT MAX(ra2.rating_date) FROM risk_assessments ra2 
        WHERE ra2.customer_id = ra.customer_id
    )
WHERE f.facility_status = 'ACTIVE'
GROUP BY ra.risk_grade, ra.pd_bps, f.facility_type
ORDER BY ra.risk_grade, f.facility_type;


-- ============================================================
-- QUERY 5: Amortisation schedule for a specific facility
-- ============================================================
WITH RECURSIVE amort_schedule AS (
    -- Base case: period 0 (drawdown)
    SELECT
        f.facility_id,
        0                                       AS period_number,
        f.start_date                            AS period_date,
        f.committed_limit                       AS opening_balance,
        f.committed_limit                       AS drawdown,
        0                                       AS repayment,
        f.committed_limit                       AS closing_balance,
        0                                       AS interest_charge,
        f.interest_rate_margin,
        f.committed_limit / f.tenor_months      AS monthly_repayment
    FROM facilities f
    WHERE f.facility_id = @FacilityID
        AND f.repayment_type = 'AMORTISING'

    UNION ALL

    -- Recursive case: each subsequent month
    SELECT
        a.facility_id,
        a.period_number + 1,
        DATEADD(MONTH, 1, a.period_date),
        a.closing_balance,
        0,
        a.monthly_repayment,
        a.closing_balance - a.monthly_repayment,
        a.closing_balance * (a.interest_rate_margin / 10000 + 0.0525) / 12,
        a.interest_rate_margin,
        a.monthly_repayment
    FROM amort_schedule a
    WHERE a.closing_balance > 0
        AND a.period_number < 120    -- Safety cap at 10 years
)
SELECT
    period_number,
    period_date,
    ROUND(opening_balance / 1e6, 3)     AS opening_balance_gbpm,
    ROUND(drawdown / 1e6, 3)            AS drawdown_gbpm,
    ROUND(repayment / 1e6, 3)           AS repayment_gbpm,
    ROUND(closing_balance / 1e6, 3)     AS closing_balance_gbpm,
    ROUND(interest_charge / 1e6, 4)     AS interest_gbpm
FROM amort_schedule
ORDER BY period_number;
```

---

## 10. Python Implementation

```python
"""
facility_structuring.py
Models credit facility structures: amortisation schedules,
pricing analysis, RAROC, and structuring scenario comparison.
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from dataclasses import dataclass, field
from typing import Optional
from datetime import date
from dateutil.relativedelta import relativedelta


# ─────────────────────────────────────────────────────────────
# DATA STRUCTURES
# ─────────────────────────────────────────────────────────────

@dataclass
class Facility:
    name: str
    facility_type: str          # RCF, TERM_LOAN_A, TERM_LOAN_B, OVERDRAFT, CAPEX
    committed_amount: float     # £
    tenor_years: float
    margin_bps: int
    base_rate: float            # e.g., 0.0525 for SONIA 5.25%
    repayment_type: str         # BULLET or AMORTISING
    arrangement_fee_bps: int = 100
    commitment_fee_bps: int = 75   # % of margin on undrawn
    start_date: date = field(default_factory=date.today)
    grace_period_months: int = 0   # Interest-only period before amortisation starts
    avg_utilisation_pct: float = 0.5  # Expected average utilisation for RCF

    @property
    def all_in_rate(self) -> float:
        return self.base_rate + self.margin_bps / 10000

    @property
    def tenor_months(self) -> int:
        return int(self.tenor_years * 12)


@dataclass
class BorrowerProfile:
    name: str
    risk_grade: str
    pd_bps: int             # Probability of Default in basis points
    lgd_pct: float          # Loss Given Default as decimal (e.g., 0.45)
    current_ebitda: float
    ebitda_growth_pa: float = 0.03
    current_net_debt: float = 0.0
    cost_of_funds: float = 0.045   # Bank's cost of funds
    overhead_rate: float = 0.005   # 50 bps overhead allocation
    tax_rate: float = 0.25
    cost_of_equity: float = 0.12   # Target RAROC threshold
    risk_weight_pct: float = 1.0   # IRB or standardised risk weight
    capital_ratio: float = 0.105   # Bank's total capital requirement


# ─────────────────────────────────────────────────────────────
# AMORTISATION ENGINE
# ─────────────────────────────────────────────────────────────

class AmortisationSchedule:

    def __init__(self, facility: Facility):
        self.f = facility

    def generate(self) -> pd.DataFrame:
        """Generate a monthly amortisation schedule."""
        months = self.f.tenor_months
        amount = self.f.committed_amount
        monthly_rate = self.f.all_in_rate / 12

        records = []
        balance = amount

        for m in range(months + 1):
            period_date = self.f.start_date + relativedelta(months=m)

            if m == 0:
                records.append({
                    'Period': 0, 'Date': period_date,
                    'Opening': 0, 'Drawdown': amount, 'Repayment': 0,
                    'Closing': amount, 'Interest': 0, 'Commitment_Fee': 0,
                })
                balance = amount
                continue

            opening = balance

            # Repayment logic
            if self.f.repayment_type == 'AMORTISING':
                amort_months = months - self.f.grace_period_months
                if m <= self.f.grace_period_months:
                    repayment = 0
                elif m == months:
                    repayment = opening  # Final payment clears balance
                else:
                    repayment = amount / amort_months
            elif self.f.repayment_type == 'BULLET':
                repayment = amount if m == months else 0
            else:
                repayment = 0

            interest = opening * monthly_rate
            closing = max(0, opening - repayment)

            # Commitment fee (RCF — on undrawn portion)
            if self.f.facility_type == 'RCF':
                avg_drawn = amount * self.f.avg_utilisation_pct
                undrawn = max(0, amount - avg_drawn)
                commitment_fee = undrawn * (self.f.commitment_fee_bps / 10000) / 12
            else:
                commitment_fee = 0

            records.append({
                'Period': m, 'Date': period_date,
                'Opening': round(opening, 2),
                'Drawdown': 0,
                'Repayment': round(repayment, 2),
                'Closing': round(closing, 2),
                'Interest': round(interest, 2),
                'Commitment_Fee': round(commitment_fee, 2),
            })
            balance = closing

        df = pd.DataFrame(records)
        df['Cumulative_Interest'] = df['Interest'].cumsum()
        df['Cumulative_Fees'] = df['Commitment_Fee'].cumsum()
        df['Total_Cost_to_Borrower'] = df['Cumulative_Interest'] + df['Cumulative_Fees']
        return df

    def summary(self) -> dict:
        """Summarise key schedule metrics."""
        schedule = self.generate()
        return {
            'facility_name': self.f.name,
            'committed_amount_gbpm': self.f.committed_amount / 1e6,
            'all_in_rate_pct': round(self.f.all_in_rate * 100, 3),
            'total_interest_gbpm': round(schedule['Interest'].sum() / 1e6, 3),
            'total_fees_gbpm': round(schedule['Commitment_Fee'].sum() / 1e6, 3),
            'total_cost_to_borrower_gbpm': round(
                (schedule['Interest'].sum() + schedule['Commitment_Fee'].sum()) / 1e6, 3),
            'peak_exposure_gbpm': round(schedule['Closing'].max() / 1e6, 3),
        }


# ─────────────────────────────────────────────────────────────
# RAROC CALCULATOR
# ─────────────────────────────────────────────────────────────

class RAROCAnalyzer:

    def __init__(self, facility: Facility, borrower: BorrowerProfile):
        self.f = facility
        self.b = borrower

    def calculate(self) -> dict:
        """Calculate Risk-Adjusted Return on Capital."""
        if self.f.facility_type == 'RCF':
            avg_drawn = self.f.committed_amount * self.f.avg_utilisation_pct
            avg_undrawn = self.f.committed_amount * (1 - self.f.avg_utilisation_pct)
        else:
            avg_drawn = self.f.committed_amount * 0.85  # Allow for partial draw-down period
            avg_undrawn = 0

        # Revenue
        interest_income = avg_drawn * self.f.all_in_rate
        arrangement_fee_pa = (self.f.arrangement_fee_bps / 10000) * self.f.committed_amount / self.f.tenor_years
        commitment_fee_income = avg_undrawn * (self.f.commitment_fee_bps / 10000)
        total_revenue = interest_income + arrangement_fee_pa + commitment_fee_income

        # Costs
        funding_cost = avg_drawn * self.b.cost_of_funds
        overhead = avg_drawn * self.b.overhead_rate
        ecl_charge = avg_drawn * (self.b.pd_bps / 10000) * self.b.lgd_pct
        total_cost = funding_cost + overhead + ecl_charge

        # Net Income
        net_income_pre_tax = total_revenue - total_cost
        net_income_post_tax = net_income_pre_tax * (1 - self.b.tax_rate)

        # Capital
        rwa = avg_drawn * self.b.risk_weight_pct
        capital_required = rwa * self.b.capital_ratio

        # RAROC
        raroc = net_income_post_tax / capital_required if capital_required > 0 else 0
        eva = net_income_post_tax - capital_required * self.b.cost_of_equity

        return {
            'facility': self.f.name,
            'avg_drawn_gbpm': round(avg_drawn / 1e6, 2),
            'interest_income_gbpm': round(interest_income / 1e6, 3),
            'arrangement_fee_pa_gbpm': round(arrangement_fee_pa / 1e6, 3),
            'commitment_fee_gbpm': round(commitment_fee_income / 1e6, 3),
            'total_revenue_gbpm': round(total_revenue / 1e6, 3),
            'funding_cost_gbpm': round(funding_cost / 1e6, 3),
            'overhead_gbpm': round(overhead / 1e6, 3),
            'ecl_charge_gbpm': round(ecl_charge / 1e6, 3),
            'total_cost_gbpm': round(total_cost / 1e6, 3),
            'net_income_post_tax_gbpm': round(net_income_post_tax / 1e6, 3),
            'rwa_gbpm': round(rwa / 1e6, 2),
            'capital_required_gbpm': round(capital_required / 1e6, 3),
            'raroc_pct': round(raroc * 100, 2),
            'eva_gbpm': round(eva / 1e6, 3),
            'above_hurdle': raroc >= self.b.cost_of_equity,
        }


# ─────────────────────────────────────────────────────────────
# SCENARIO COMPARISON
# ─────────────────────────────────────────────────────────────

def compare_structuring_scenarios(borrower: BorrowerProfile,
                                   scenarios: list[Facility]) -> pd.DataFrame:
    """Compare RAROC and key metrics across structuring alternatives."""
    rows = []
    for f in scenarios:
        sched = AmortisationSchedule(f)
        raroc_calc = RAROCAnalyzer(f, borrower)
        summ = sched.summary()
        raroc = raroc_calc.calculate()
        rows.append({
            'Scenario': f.name,
            'Type': f.facility_type,
            'Amount (£m)': f.committed_amount / 1e6,
            'Tenor (yrs)': f.tenor_years,
            'Margin (bps)': f.margin_bps,
            'All-in Rate (%)': round(f.all_in_rate * 100, 2),
            'Repayment': f.repayment_type,
            'Total Cost to Borrower (£m)': summ['total_cost_to_borrower_gbpm'],
            'RAROC (%)': raroc['raroc_pct'],
            'EVA (£m)': raroc['eva_gbpm'],
            'Above Hurdle?': 'YES' if raroc['above_hurdle'] else 'NO',
        })
    return pd.DataFrame(rows)


# ─────────────────────────────────────────────────────────────
# EXAMPLE USAGE
# ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    from datetime import date

    borrower = BorrowerProfile(
        name='Acme Manufacturing Ltd',
        risk_grade='BB+',
        pd_bps=120,
        lgd_pct=0.40,
        current_ebitda=16e6,
        cost_of_funds=0.045,
    )

    scenarios = [
        Facility('Option A: 3yr Bullet RCF', 'RCF', 35e6, 3, 200, 0.0525, 'BULLET',
                 arrangement_fee_bps=75, commitment_fee_bps=70, avg_utilisation_pct=0.55),
        Facility('Option B: 5yr Amortising TL + RCF', 'TERM_LOAN_A', 25e6, 5, 225, 0.0525,
                 'AMORTISING', arrangement_fee_bps=125, commitment_fee_bps=0),
        Facility('Option C: 7yr TLB Bullet', 'TERM_LOAN_B', 35e6, 7, 300, 0.0525, 'BULLET',
                 arrangement_fee_bps=200, commitment_fee_bps=0, avg_utilisation_pct=0.9),
    ]

    print("=" * 80)
    print("STRUCTURING SCENARIO COMPARISON")
    print("=" * 80)
    comparison = compare_structuring_scenarios(borrower, scenarios)
    print(comparison.to_string(index=False))
    print()

    print("AMORTISATION SCHEDULE — Option B (first 12 months):")
    sched = AmortisationSchedule(scenarios[1])
    df = sched.generate()
    print(df.head(13)[['Period','Date','Opening','Repayment','Closing','Interest']].to_string(index=False))
```

---

## 11. Interview Questions

**Q1: A borrower wants a 5-year bullet RCF to fund working capital. What are your concerns and how would you mitigate them?**

*Expected:* An RCF should ideally be periodically clean (zero balance) to demonstrate it is being used for genuine working capital, not structural funding. Bullet repayment at year 5 creates refinancing risk. Mitigation: (a) annual clean-down requirement; (b) amortisation trigger if leverage exceeds threshold; (c) shorter initial tenor of 2–3 years with review; (d) mandatory prepayment from excess cash flow.

**Q2: Explain the difference between a Term Loan A and a Term Loan B. When would you recommend each?**

*Expected:* TLA is amortising — principal reduces through regular payments. TLB is effectively bullet (1% p.a. amortisation with a large final payment). TLA is appropriate when cash flows are strong and predictable. TLB is appropriate for leveraged buyouts where the strategy is to grow EBITDA and refinance rather than delever through cash flow. TLB carries higher refinancing risk and is therefore priced at a higher margin.

**Q3: How does IFRS 16 affect facility structuring and covenant drafting?**

*Expected:* IFRS 16 brings operating leases onto the balance sheet as lease liabilities, increasing reported Net Debt and reducing EBITDA (depreciation replaces operating lease charge, but EBITDA is pre-depreciation so the lease charge disappears from EBITDA). This improves EBITDA margins but increases leverage ratios if lease liabilities are included in Net Debt. Covenant drafting must specify whether lease liabilities are included in "Debt" and whether EBITDA is calculated pre- or post-IFRS 16.

**Q4: What is a MAC clause and why is it rarely invoked?**

*Expected:* Material Adverse Change allows the bank to refuse drawdown or call an event of default if there has been a material adverse change in the borrower's condition. Rarely invoked because: (a) the legal burden of proof is very high; (b) invoking MAC destroys the banking relationship; (c) courts have set a high bar in cases like Grupo Hotelero Uberior. MAC is primarily a negotiating tool and last resort.

**Q5: A £50m facility to a single borrower represents 30% of the bank's Tier 1 Capital. Can you approve it?**

*Expected:* No. CRR Part Four limits single-name exposures to 25% of Tier 1 Capital. Options: (a) syndicate the facility and retain only the bank's proportion within limits; (b) reduce the facility size; (c) obtain a guarantee from a third party that reduces the net exposure. The analyst must flag this in the credit memo as a large exposure constraint.

---

## 12. Common Mistakes

**Mistake 1: Matching tenor to the borrower's preference, not the credit risk**
Borrowers always want longer tenor (more certainty) and lower pricing. The analyst must set tenor based on the repayment risk profile, not what the borrower asks for.

**Mistake 2: Ignoring the amortisation vs free cash flow relationship**
An amortising schedule that requires £8m of annual repayment when FCF is £6m will result in default. The amortisation schedule must be sized to free cash flow, not just to "get the money back in 5 years."

**Mistake 3: Treating a fully-drawn RCF as short-term**
An RCF that is consistently 100% drawn should be reclassified as term debt for credit analysis purposes. It does not behave like a working capital facility.

**Mistake 4: Not defining EBITDA in the covenant**
A covenant of "Net Leverage ≤ 3.5x" is meaningless without a precise definition of what goes in the numerator and denominator. EBITDA can be calculated many ways; the credit memo must specify the exact definition that will appear in the facility agreement.

**Mistake 5: Forgetting the interplay between facilities**
A borrower with an RCF from Bank A and a term loan from Bank B may have cross-default provisions — a default under one triggers a default under the other. The structuring must consider the full capital structure, not just the bank's own facility.

---

## 13. Case Studies

**Case Study A: The Working Capital Facility That Was Actually Term Debt**

*Situation:* A food manufacturer had a £20m RCF used for "working capital." Annual review revealed the facility had never dropped below £16m (80% utilisation) over 3 years. The analyst flagged this in the review memo.

*Investigation:* The working capital analysis showed DSO of 35 days and DPO of 45 days — the company was actually receiving cash from customers faster than it was paying suppliers. There was no structural working capital funding need. The RCF was being used to fund accumulated trading losses that had not been disclosed.

*Resolution:* The review memo recommended reclassifying the facility as an amortising term loan with a 3-year repayment schedule, requiring quarterly financial reporting, and engaging management to agree a remediation plan for the trading performance.

---

**Case Study B: The Acquisition Bridge That Got Stuck**

*Situation:* A £30m acquisition bridge loan was approved to fund the purchase of a competitor, with the expectation that it would be refinanced with permanent facilities within 6 months post-completion of the acquisition.

*What went wrong:* The acquisition closed, but the target's financial performance was worse than anticipated. The pro-forma leverage of the combined group was 5.2x, making permanent debt refinancing on acceptable terms impossible. The bridge loan was extended twice, with fees, but remained outstanding at month 14.

*Structuring lesson:* Bridge loans must have a clearly identifiable and realistic take-out strategy. The credit memo for a bridge should include an analysis of: (a) what the permanent structure will look like, (b) whether the combined group can support that structure, and (c) what happens if the bridge cannot be refinanced (exit strategy for the bank).

---

## 14. Iterative Reinforcement

**Week 1:** For three existing facilities in your portfolio, identify the facility type and map the repayment source. Is the tenor appropriate for the purpose?

**Week 2:** Build an amortisation schedule from scratch in Excel for a £25m 5-year term loan at SONIA + 225bps. Calculate total interest cost and effective annual cost to the borrower.

**Week 3:** For the same facility, build a RAROC calculation. At what margin does RAROC equal the bank's cost of equity?

**Week 4:** Download and read an LMA standard form revolving credit facility agreement. Identify: (a) the definition of EBITDA, (b) the MAC clause, (c) the mandatory prepayment events, (d) the financial covenant definitions.

**Spaced repetition prompts:**
- What is the Credit Conversion Factor and why does it matter for RCF structuring?
- What is the difference between TLA and TLB? Give a real-world context where each is appropriate.
- Name five mandatory prepayment triggers typically included in a well-structured term facility.
- What CRR Article governs large exposure limits and what is the hard cap?

---

## 15. Source Material

**Regulatory:**
- CRR (EU) No 575/2013 — Part Four: Large Exposures; Part Three: Capital Requirements for Credit Risk
- ECB Guidance on Leveraged Transactions (2017, updated 2022)
- PRA Policy Statement PS5/17: Credit Risk: Internal Ratings Based Approaches
- Basel Committee: "Prudential treatment of problem assets" (2017)

**Legal/documentation:**
- Loan Market Association (LMA): Standard form investment-grade facility agreement — the definitive template for UK/European corporate lending; free access at lma.eu.com for registered members
- LMA: Guide to syndicated loans
- APLMA (Asia Pacific Loan Market Association): equivalent for APAC

**Technical:**
- Caselli, S.: *Leveraged Finance: Concepts, Methods and Trading of High-Yield Bonds, Loans and Derivatives* (Wiley, 2011)
- Lütolf-Carroll, C. and Pirnes, A.: *From Innovation to Cash Flows* (Wiley, 2009) — excellent on structuring for growth companies
- AFME: "European High Yield and Leveraged Loan Report" (annual) — benchmark data for leveraged finance pricing

**Market data:**
- Refinitiv LPC (Loan Pricing Corporation): European loan pricing database
- S&P LCD: Leveraged Commentary & Data — pricing and structuring trends
- Bloomberg LEAG: League tables showing comparable transaction terms
