# M09 — Credit Memo Preparation

> **Academy Track:** Commercial & Corporate Credit Risk | Module 9 of 20
> **Prerequisite Modules:** M01–M08 (Financial Statement Analysis, Ratio Analysis, Cash Flow, Industry Risk)
> **Estimated Study Time:** 8–10 hours

---

## 1. Business Purpose

The credit memorandum — variously called a credit paper, credit application, credit proposal, or deal memo — is the single most important document in the credit approval process. It is the written argument that justifies lending money to a specific borrower at specific terms, and it goes before the Credit Committee (or Delegated Credit Authority) for formal approval.

**Why the credit memo exists:**

Banks are in the business of controlled risk-taking. Every loan represents a decision to deploy capital at risk. The credit memo externalises the analyst's thinking, makes the risk assessment auditable, and creates a paper trail that satisfies both internal governance and external regulators (PRA, FCA in the UK; OCC, Federal Reserve in the US; ECB/SSM in the eurozone).

**What a credit memo must achieve:**

1. **Tell a complete story** — A committee member who has never met the borrower should be able to read the memo and fully understand the business, the risk, and the rationale for lending.
2. **Demonstrate analytical rigour** — The memo must show that the analyst has stress-tested assumptions, challenged management, and considered downside scenarios.
3. **Provide a clear recommendation** — Not "we could lend" but "we recommend approval subject to the following conditions."
4. **Create accountability** — The analyst's name, the approver's name, and the date are recorded. This matters when a loan goes wrong three years later.
5. **Satisfy regulatory requirements** — Under Basel III/IV and IFRS 9, banks must demonstrate that credit decisions are evidence-based and well-documented.

**New facility memo vs annual review memo:**

| Dimension | New Facility Memo | Annual Review Memo |
|-----------|------------------|--------------------|
| Starting point | No relationship — must establish everything from scratch | Existing relationship — can reference prior approval and focus on changes |
| Financial analysis depth | Full 3–5 year historical plus 2–3 year projections | Year-on-year performance vs prior memo projections; focus on covenant compliance |
| Risk rating | First assignment of Internal Risk Rating | Confirmation or change of existing rating with explanation of migration |
| Security | Full description and valuation | Reconfirmation of existing security; note any changes in collateral value |
| Typical length | 15–30 pages | 8–15 pages |
| Committee focus | Is this a borrower we want? | Should we continue/expand/reduce? |

---

## 2. Accounting Concepts

**Financial statements as the evidentiary base:**

The credit memo is anchored in the borrower's audited financial statements. Understanding what the accounts are actually saying — not just the numbers — is the analyst's core skill.

**Key accounting concepts embedded in the credit memo:**

**Revenue recognition (IFRS 15 / ASC 606):** Has management chosen aggressive revenue recognition policies? A construction company that recognises revenue on percentage-of-completion may show strong profits that have not yet converted to cash. Always compare revenue recognition policy year-over-year and flag any changes.

**Capitalisation vs expensing:** A company that capitalises software development costs or maintenance capex will show higher profits and higher assets than one that expenses them. When comparing borrowers in the same sector, ensure accounting policies are consistent.

**Goodwill and intangibles (IFRS 3, IAS 36, IAS 38):** Goodwill is only created on acquisition and must be tested for impairment annually. A balance sheet heavy with goodwill and intangibles is a sign of an acquisition-driven growth strategy. If those acquisitions underperform, impairment charges will hit profits. The credit analyst must understand what the goodwill represents and whether there is any impairment risk.

**Lease accounting (IFRS 16):** Post-IFRS 16, operating leases are on-balance-sheet as right-of-use assets and lease liabilities. This increases leverage ratios. Many credit agreements were written pre-IFRS 16; covenant calculations may need to specify whether they are measured on a pre- or post-IFRS 16 basis.

**Provisions and contingent liabilities (IAS 37):** Has the company adequately provided for known liabilities (warranty, legal, restructuring)? Under-provisioning inflates profits. A note disclosure of a £50m litigation that has not been provided for is a material risk.

**Off-balance-sheet arrangements:** Special purpose vehicles, operating lease commitments pre-IFRS 16, purchase commitments, performance bonds. These are real obligations that do not appear as liabilities on the balance sheet.

**Audit opinion:** The credit memo should reference whether the accounts received an unqualified audit opinion. A qualified opinion, emphasis of matter, or material uncertainty about going concern is a serious red flag that must be discussed.

---

## 3. Financial Concepts

**The credit memo's financial analysis section must address four questions:**

**Question 1: Can the borrower generate enough cash to service the debt?**

Debt service capacity is assessed through the Debt Service Coverage Ratio (DSCR) and Interest Coverage Ratio:

```
DSCR = EBITDA / (Interest + Principal Repayment)
Interest Coverage = EBITDA / Net Interest Expense
```

A DSCR below 1.0x means the business cannot service its debt from operating cash flow alone — it must use reserves, raise equity, or sell assets. Most banks require a minimum DSCR of 1.20x–1.50x with meaningful headroom above covenant levels.

**Question 2: What is the leverage profile and is it sustainable?**

```
Net Leverage = (Total Debt - Cash) / EBITDA
Gross Leverage = Total Debt / EBITDA
Net Debt / Equity (Gearing)
```

Industry context matters enormously here. A 4.0x leveraged buyout in the private equity world might be acceptable for a stable, cash-generative business; the same leverage on a cyclical manufacturer would be alarming.

**Question 3: What does the liquidity position look like?**

Current ratio, quick ratio, cash conversion cycle. But also: what are the committed undrawn facilities? A company with a £10m overdraft fully drawn and no headroom is in a very different position than one with a £10m overdraft undrawn.

**Question 4: What is the trajectory — is the business improving or deteriorating?**

Trend analysis across 3–5 years of financials. Key trends to call out: revenue growth rate, EBITDA margin trend, working capital days (DSO, DIO, DPO), capex intensity, free cash flow generation.

**Projections and base/downside cases:**

The credit memo must include forward-looking financial projections, typically covering the term of the facility plus one year. The memo should show:
- **Base case:** Management's plan, which the analyst has sense-checked
- **Downside case:** A stress scenario (revenue down 10–20%, margin compression) that tests whether the borrower can still service the debt
- **Break-even analysis:** At what revenue level does the borrower stop being able to service the debt?

---

## 4. Statistical Concepts

**Probability of Default (PD):**

The credit memo implicitly or explicitly assigns a PD to the borrower through the Internal Risk Rating (see M13). PD is the probability that the borrower will default within a 12-month horizon (or sometimes a through-the-cycle basis). It is the most fundamental credit risk parameter.

**Loss Given Default (LGD):**

Even if a borrower defaults, the bank may recover some of its money through enforcement of security or insolvency proceedings. LGD measures the proportion of exposure that would be lost:

```
LGD = 1 - Recovery Rate
```

A well-secured loan against commercial property might have an LGD of 25–35% (high recovery). An unsecured loan to a distressed corporate might have LGD of 60–80%.

**Exposure at Default (EAD):**

For a revolving facility, the EAD is not necessarily the committed limit — it is the expected drawn amount at the time of default. Research shows that borrowers draw down more on revolving facilities as their credit quality deteriorates (the "loan commitment paradox").

**Expected Loss (EL):**

```
EL = PD × LGD × EAD
```

This is the statistical average loss the bank expects to incur. The credit memo should make the analyst think about whether the risk-adjusted return (pricing) is sufficient to cover EL and generate an acceptable return on capital.

**Concentration risk:**

Is this borrower a significant concentration in the bank's portfolio? Single-name concentration (one borrower representing >5–10% of the portfolio) increases unexpected loss. Sector concentration (e.g., 40% of the portfolio in commercial real estate) creates correlated default risk.

---

## 5. Regulatory Framework

**PRA Supervisory Statement SS3/17 (UK):** Sets out expectations for credit risk management in UK banks, including documentation standards for credit decisions. Specifically references the need for complete, accurate credit files.

**EBA Guidelines on Loan Origination and Monitoring (EBA/GL/2020/06):** European standard requiring banks to assess borrower creditworthiness comprehensively, including environmental, social, and governance (ESG) factors for large exposures.

**Basel III/IV — Credit Risk Standardised Approach and IRB Approach:**
- Under the Standardised Approach, risk weights are assigned based on external credit ratings or asset class
- Under the Internal Ratings-Based (IRB) Approach, banks use their own PD, LGD, and EAD estimates, which flow directly from the credit memo's risk assessment
- The credit memo is the primary source document for IRB data capture

**IFRS 9 — Financial Instruments:**
- Stage 1: Performing loans — 12-month expected credit loss provision
- Stage 2: Significant increase in credit risk since origination — lifetime expected credit loss
- Stage 3: Credit-impaired (defaulted) — lifetime expected credit loss
- The credit memo's risk rating determines initial staging; subsequent monitoring determines stage migration
- Documentation in the credit memo that a facility is high risk at origination may require immediate Stage 2 booking ("Day 1 Stage 2")

**Capital Requirements Regulation (CRR) — Article 178 (Default Definition):**
Defines default as: (a) the obligor is past due more than 90 days on a material obligation, or (b) the bank judges that the obligor is unlikely to pay in full. The credit memo's risk assessment should consider proximity to this threshold.

**Financial Conduct Authority (FCA) — Consumer Credit:**
For smaller commercial loans that may also involve personal guarantees from individuals, consumer credit regulations may apply to the guarantor assessment.

---

## 6. Data Required

**External data sources:**

| Data Type | Source | Use in Memo |
|-----------|--------|-------------|
| Audited financial statements | Companies House filings, direct from borrower | Core financial analysis |
| Management accounts | Direct from borrower (typically monthly) | Current year trading |
| Company search | Companies House, Dun & Bradstreet | Directors, charges, filings history |
| Credit bureau report | Experian, Equifax, Creditsafe | Existing debt, payment history, CCJs |
| Property valuation | RICS-qualified surveyor | Collateral value |
| Sector intelligence | IBISWorld, Mintel, trade associations | Industry risk context |
| News/press search | Factiva, Nexis, Google | Reputational risk, litigation, adverse news |
| KYC/AML checks | Internal KYC system, sanctions databases | Regulatory compliance |
| External credit rating | Moody's, S&P, Fitch (if applicable) | Benchmarking |
| Bank references | Existing bankers | Payment history, existing facilities |

**Internal data sources:**

| Data Type | Internal System | Use in Memo |
|-----------|----------------|-------------|
| Existing exposure | Credit risk system (e.g., Moody's RiskCalc, Algorithmics) | Total exposure calculation |
| Prior credit approvals | Credit file / document management system | Historical performance vs projections |
| Relationship profitability | Revenue management system | Income justification for risk taken |
| Internal risk rating | Rating tool / scorecard | Risk grade |
| Covenant monitoring | Covenant tracking system | Historical compliance |

---

## 7. How Analysts Actually Work

**The workflow from mandate to approval:**

**Step 1 — Information gathering (Week 1–2)**
The Relationship Manager (RM) has already met the client and scoped the deal. The analyst now requests the "information pack" from the borrower, typically via an Information Request List (IRL). This includes: 3 years of audited accounts, latest management accounts, a business plan, details of the proposed transaction, list of existing banking facilities, details of any material contracts, and property valuations if security is involved.

**Step 2 — Initial screening (Day 1–3 of analysis)**
Before writing a single word of the memo, the analyst does a "fatal flaw" check:
- Is the borrower on the sanctions list?
- Does the purpose of the borrowing violate credit policy (e.g., lending to fund a regulated activity the bank doesn't support)?
- Is there an obvious KYC problem?
- Does the initial leverage look wildly outside appetite?
If any fatal flaw is found, the deal is killed before significant time is invested.

**Step 3 — Financial model build (Days 3–7)**
The analyst builds a financial model in Excel (see Section 8). This model is the analytical engine that underlies the financial narrative in the credit memo. Every number in the financial analysis section of the memo should be traceable back to the model.

**Step 4 — Drafting the memo (Days 5–10)**
The memo is written simultaneously with the model — the analyst iterates between the two. The draft goes through multiple rounds of review:
- First review by a senior analyst or associate
- Second review by the RM (who checks the commercial narrative)
- Third review by the Credit Manager

**Step 5 — Credit Committee preparation**
For complex or large deals, the analyst may be required to present the memo verbally to the Credit Committee. This means the analyst must know every number, have thought through every challenge, and be able to defend the recommendation.

**Common internal process checkpoints:**
- **Deal acceptance meeting:** RM and Credit agree in principle whether to proceed with analysis — avoids wasted effort
- **Early-bird review:** For complex transactions, an informal "heads-up" discussion with senior credit before the formal submission
- **Credit submission deadline:** Formal submission to Credit Committee secretary with minimum turnaround time (typically 5 business days)

**The unwritten rules:**
1. Never surprise the credit committee — if there is a problem, flag it early
2. The analyst is credit's representative, not the RM's advocate
3. If you are uncomfortable with a deal, say so clearly in the memo — do not bury your concerns
4. Numbers in the memo must match the model exactly — any discrepancy destroys credibility
5. The recommendation must follow logically from the analysis — you cannot recommend approval if the financial analysis shows the debt is unserviceable

---

## 8. Excel Implementation

**Annotated Credit Memo Excel Model Structure:**

The Excel workbook that supports a credit memo typically has the following sheets:

```
Sheet 1: Cover / Index
Sheet 2: Historic P&L (3-5 years, reformatted from statutory accounts)
Sheet 3: Historic Balance Sheet (3-5 years)
Sheet 4: Historic Cash Flow (3-5 years)
Sheet 5: Working Capital Analysis
Sheet 6: Debt Schedule (existing and proposed)
Sheet 7: Projections — Base Case (3 years)
Sheet 8: Projections — Downside Case
Sheet 9: Key Ratios and Metrics
Sheet 10: Covenant Compliance
Sheet 11: Security Summary
Sheet 12: Returns Analysis (Risk-Adjusted Return on Capital)
```

**Sheet 9 — Key Ratios Calculation (formula-level detail):**

```excel
-- Assuming financials are in columns C (Year -2), D (Year -1), E (Current Year), F (Base +1), G (Base +2)
-- Row references are illustrative

-- Revenue Growth
=IF(C5=0,"N/A",(D5-C5)/ABS(C5))     [formatted as percentage]

-- EBITDA Margin
=D20/D5                               [EBITDA / Revenue]

-- Interest Coverage
=D20/D30                              [EBITDA / Net Interest Expense]

-- Net Leverage
=(D50-D55)/D20                        [Net Debt / EBITDA]
-- where D50 = Total Debt, D55 = Cash and Cash Equivalents

-- DSCR
=D20/(D30+D60)                        [EBITDA / (Interest + Scheduled Principal)]

-- Current Ratio
=D70/D80                              [Current Assets / Current Liabilities]

-- Quick Ratio
=(D70-D75)/D80                        [Current Assets less Inventory / Current Liabilities]

-- DSO (Days Sales Outstanding)
=(D85/D5)*365                         [Trade Receivables / Revenue * 365]

-- DIO (Days Inventory Outstanding)
=(D90/D95)*365                        [Inventory / Cost of Goods Sold * 365]

-- DPO (Days Payable Outstanding)
=(D100/D95)*365                       [Trade Payables / Cost of Goods Sold * 365]

-- Cash Conversion Cycle
=DSO + DIO - DPO
```

**Covenant compliance check (Sheet 10):**

```excel
-- Covenant: Interest Cover >= 3.0x
=IF(E_InterestCover>=3.0,"PASS","BREACH")

-- Covenant: Net Leverage <= 3.5x
=IF(E_NetLeverage<=3.5,"PASS","BREACH")

-- Headroom calculation
=E_InterestCover - 3.0                [Absolute headroom]
=(E_InterestCover - 3.0)/3.0         [Percentage headroom]

-- Sensitivity: Revenue decline at which covenant is breached
-- Use Goal Seek or Data Table to find the revenue level where:
-- EBITDA / Net Interest = 3.0 (the covenant threshold)
```

**Downside case toggle (using named ranges and data validation):**

```excel
-- In a cell with data validation (dropdown): CELL_SCENARIO = "Base" or "Downside"
-- Revenue growth driver:
=IF(CELL_SCENARIO="Base", BASE_REVENUE_GROWTH, DOWNSIDE_REVENUE_GROWTH)

-- EBITDA margin driver:
=IF(CELL_SCENARIO="Base", BASE_EBITDA_MARGIN, DOWNSIDE_EBITDA_MARGIN)
```

---

## 9. SQL Implementation

**Context:** Banks store credit data in relational databases (Oracle, SQL Server, DB2). The analyst may need to query:
- Historical financial data submitted by borrowers
- Existing exposure across all facilities for a borrower group
- Covenant compliance history
- Rating history

```sql
-- ============================================================
-- QUERY 1: Pull all active facilities for a borrower group
-- ============================================================
SELECT
    c.customer_id,
    c.customer_name,
    c.customer_group_name,
    f.facility_id,
    f.facility_type,          -- RCF, TERM_LOAN, OVERDRAFT, etc.
    f.committed_limit,
    f.current_drawn,
    f.undrawn_headroom,
    f.maturity_date,
    f.interest_rate_margin,
    f.base_rate_type,         -- SONIA, SOFR, FIXED, etc.
    f.security_type,
    f.facility_status,        -- ACTIVE, EXPIRED, CANCELLED
    ra.risk_grade,
    ra.rating_date,
    ra.pd_bps                 -- PD in basis points (100 bps = 1%)
FROM customers c
JOIN facilities f ON c.customer_id = f.customer_id
JOIN risk_assessments ra ON c.customer_id = ra.customer_id
    AND ra.rating_date = (
        SELECT MAX(ra2.rating_date)
        FROM risk_assessments ra2
        WHERE ra2.customer_id = c.customer_id
    )
WHERE c.customer_group_id = @GroupID
    AND f.facility_status = 'ACTIVE'
ORDER BY f.committed_limit DESC;


-- ============================================================
-- QUERY 2: Total Group Exposure (for single obligor limit check)
-- ============================================================
SELECT
    c.customer_group_id,
    c.customer_group_name,
    SUM(f.committed_limit)       AS total_committed_limit,
    SUM(f.current_drawn)         AS total_drawn_exposure,
    SUM(f.contingent_liability)  AS total_contingent,       -- LCs, guarantees
    SUM(f.committed_limit) + SUM(f.contingent_liability) AS total_exposure,
    -- As % of bank's Tier 1 Capital (large exposure check — must be < 25% per CRR)
    (SUM(f.committed_limit) + SUM(f.contingent_liability)) 
        / (SELECT tier1_capital FROM bank_capital WHERE report_date = CAST(GETDATE() AS DATE))
        * 100 AS pct_of_tier1_capital
FROM customers c
JOIN facilities f ON c.customer_id = f.customer_id
WHERE c.customer_group_id = @GroupID
    AND f.facility_status = 'ACTIVE';


-- ============================================================
-- QUERY 3: Covenant compliance history (last 8 quarters)
-- ============================================================
SELECT
    ct.test_date,
    ct.covenant_name,
    ct.covenant_type,           -- FINANCIAL, INFORMATION, POSITIVE, NEGATIVE
    ct.threshold_value,
    ct.actual_value,
    ct.headroom_value,
    ct.headroom_pct,
    ct.test_result,             -- PASS, BREACH, WAIVER
    ct.waiver_granted_date,
    ct.waiver_expiry_date,
    ct.waiver_conditions
FROM covenant_tests ct
JOIN facilities f ON ct.facility_id = f.facility_id
WHERE f.customer_id = @CustomerID
    AND ct.test_date >= DATEADD(QUARTER, -8, GETDATE())
ORDER BY ct.test_date DESC, ct.covenant_name;


-- ============================================================
-- QUERY 4: Financial data submitted over last 5 years
-- ============================================================
SELECT
    fd.period_end_date,
    fd.accounts_type,           -- AUDITED, MANAGEMENT, INTERIM
    fd.revenue,
    fd.ebitda,
    fd.ebit,
    fd.interest_expense,
    fd.pbt,
    fd.total_debt,
    fd.cash_and_equivalents,
    fd.net_debt,
    -- Calculated ratios
    fd.ebitda / NULLIF(fd.interest_expense, 0)          AS interest_cover,
    fd.net_debt / NULLIF(fd.ebitda, 0)                  AS net_leverage,
    fd.revenue - LAG(fd.revenue) OVER (ORDER BY fd.period_end_date)
        / NULLIF(LAG(fd.revenue) OVER (ORDER BY fd.period_end_date), 0)
        AS revenue_growth_pct
FROM financial_data fd
WHERE fd.customer_id = @CustomerID
    AND fd.period_end_date >= DATEADD(YEAR, -5, GETDATE())
ORDER BY fd.period_end_date DESC;


-- ============================================================
-- QUERY 5: Risk rating history and migration
-- ============================================================
SELECT
    ra.rating_date,
    ra.risk_grade,
    ra.pd_bps,
    ra.rating_rationale_summary,
    ra.financial_risk_score,
    ra.business_risk_score,
    ra.composite_score,
    ra.rated_by_user_id,
    ra.approved_by_user_id,
    -- Flag rating migrations
    LAG(ra.risk_grade) OVER (ORDER BY ra.rating_date) AS prior_grade,
    CASE 
        WHEN ra.risk_grade < LAG(ra.risk_grade) OVER (ORDER BY ra.rating_date) 
        THEN 'UPGRADE'
        WHEN ra.risk_grade > LAG(ra.risk_grade) OVER (ORDER BY ra.rating_date) 
        THEN 'DOWNGRADE'
        ELSE 'UNCHANGED'
    END AS rating_migration
FROM risk_assessments ra
WHERE ra.customer_id = @CustomerID
ORDER BY ra.rating_date DESC;
```

---

## 10. Python Implementation

```python
"""
credit_memo_analyzer.py
Automates key analytical components of credit memo preparation.
Requires: pandas, numpy, matplotlib, openpyxl, python-docx
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.ticker as mtick
from dataclasses import dataclass, field
from typing import Optional
import warnings
warnings.filterwarnings('ignore')


# ─────────────────────────────────────────────────────────────
# DATA STRUCTURES
# ─────────────────────────────────────────────────────────────

@dataclass
class FinancialPeriod:
    year: int
    period_type: str          # 'AUDITED', 'MANAGEMENT', 'PROJECTED'
    revenue: float
    gross_profit: float
    ebitda: float
    ebit: float
    interest_expense: float
    pbt: float
    pat: float
    total_assets: float
    total_debt: float
    cash: float
    trade_receivables: float
    inventory: float
    trade_payables: float
    cogs: float
    capex: float

    @property
    def net_debt(self) -> float:
        return self.total_debt - self.cash

    @property
    def ebitda_margin(self) -> float:
        return self.ebitda / self.revenue if self.revenue else 0

    @property
    def interest_cover(self) -> float:
        return self.ebitda / self.interest_expense if self.interest_expense else float('inf')

    @property
    def net_leverage(self) -> float:
        return self.net_debt / self.ebitda if self.ebitda else float('inf')

    @property
    def dso(self) -> float:
        return (self.trade_receivables / self.revenue) * 365 if self.revenue else 0

    @property
    def dio(self) -> float:
        return (self.inventory / self.cogs) * 365 if self.cogs else 0

    @property
    def dpo(self) -> float:
        return (self.trade_payables / self.cogs) * 365 if self.cogs else 0

    @property
    def cash_conversion_cycle(self) -> float:
        return self.dso + self.dio - self.dpo

    @property
    def free_cash_flow(self) -> float:
        # Simplified: EBITDA - Interest - Tax - Capex
        estimated_tax = max(0, self.pbt * 0.25)
        return self.ebitda - self.interest_expense - estimated_tax - self.capex


@dataclass
class FacilityTerms:
    facility_type: str
    committed_amount: float
    tenor_years: float
    margin_bps: int
    arrangement_fee_bps: int
    commitment_fee_bps: int
    repayment_type: str       # 'BULLET' or 'AMORTISING'
    amortisation_schedule: Optional[list] = None


@dataclass
class CreditMemoInputs:
    borrower_name: str
    borrower_id: str
    sector: str
    country: str
    purpose: str
    financials: list[FinancialPeriod] = field(default_factory=list)
    proposed_facilities: list[FacilityTerms] = field(default_factory=list)
    existing_debt: float = 0.0
    security_value: float = 0.0
    security_type: str = ""


# ─────────────────────────────────────────────────────────────
# RATIO ANALYSIS ENGINE
# ─────────────────────────────────────────────────────────────

class CreditMemoAnalyzer:

    def __init__(self, inputs: CreditMemoInputs):
        self.inputs = inputs
        self.financials = sorted(inputs.financials, key=lambda x: x.year)

    def build_ratio_table(self) -> pd.DataFrame:
        """Generate a comprehensive ratio table across all periods."""
        rows = []
        for p in self.financials:
            rows.append({
                'Year': p.year,
                'Type': p.period_type,
                'Revenue (£m)': round(p.revenue / 1e6, 2),
                'EBITDA (£m)': round(p.ebitda / 1e6, 2),
                'EBITDA Margin (%)': round(p.ebitda_margin * 100, 1),
                'Interest Cover (x)': round(p.interest_cover, 2),
                'Net Leverage (x)': round(p.net_leverage, 2),
                'Net Debt (£m)': round(p.net_debt / 1e6, 2),
                'DSO (days)': round(p.dso, 1),
                'DIO (days)': round(p.dio, 1),
                'DPO (days)': round(p.dpo, 1),
                'CCC (days)': round(p.cash_conversion_cycle, 1),
                'FCF (£m)': round(p.free_cash_flow / 1e6, 2),
            })
        df = pd.DataFrame(rows).set_index('Year')
        return df

    def revenue_growth_analysis(self) -> dict:
        """Calculate CAGR and year-on-year growth rates."""
        revs = [(p.year, p.revenue) for p in self.financials]
        yoy = {}
        for i in range(1, len(revs)):
            yr, rev = revs[i]
            _, prior_rev = revs[i - 1]
            yoy[yr] = (rev - prior_rev) / prior_rev if prior_rev else 0
        if len(revs) >= 2:
            first_year, first_rev = revs[0]
            last_year, last_rev = revs[-1]
            n = last_year - first_year
            cagr = (last_rev / first_rev) ** (1 / n) - 1 if n > 0 and first_rev > 0 else 0
        else:
            cagr = 0
        return {'yoy_growth': yoy, 'cagr': round(cagr * 100, 2)}

    def debt_service_capacity(self, new_debt_amount: float, 
                               new_interest_rate: float,
                               annual_repayment: float) -> pd.DataFrame:
        """
        Assess debt service capacity incorporating new facilities.
        Uses the most recent actual period as base.
        """
        base = self.financials[-1]
        total_interest = base.interest_expense + (new_debt_amount * new_interest_rate)
        total_debt_service = total_interest + annual_repayment

        scenarios = {
            'Base Case': base.ebitda,
            'Revenue -10%': base.ebitda * 0.85,   # 10% revenue decline, margin compression
            'Revenue -20%': base.ebitda * 0.70,
            'Revenue -30%': base.ebitda * 0.55,
        }

        rows = []
        for label, ebitda in scenarios.items():
            dscr = ebitda / total_debt_service if total_debt_service else 0
            icr = ebitda / total_interest if total_interest else 0
            net_lev = (base.net_debt + new_debt_amount) / ebitda if ebitda else 99
            rows.append({
                'Scenario': label,
                'EBITDA (£m)': round(ebitda / 1e6, 2),
                'Total Interest (£m)': round(total_interest / 1e6, 2),
                'Debt Service (£m)': round(total_debt_service / 1e6, 2),
                'DSCR (x)': round(dscr, 2),
                'Interest Cover (x)': round(icr, 2),
                'Net Leverage (x)': round(net_lev, 2),
                'DSCR >= 1.20x': 'PASS' if dscr >= 1.20 else 'FAIL',
                'ICR >= 3.0x': 'PASS' if icr >= 3.0 else 'FAIL',
            })
        return pd.DataFrame(rows)

    def ltv_analysis(self) -> dict:
        """Calculate Loan-to-Value for security assessment."""
        total_new_debt = sum(f.committed_amount for f in self.inputs.proposed_facilities)
        total_exposure = self.inputs.existing_debt + total_new_debt
        ltv = total_exposure / self.inputs.security_value if self.inputs.security_value else None
        return {
            'security_value': self.inputs.security_value,
            'security_type': self.inputs.security_type,
            'total_exposure': total_exposure,
            'ltv_pct': round(ltv * 100, 1) if ltv else None,
            'headroom': self.inputs.security_value - total_exposure if self.inputs.security_value else None,
        }

    def generate_waterfall_chart(self, save_path: str = None):
        """Visualise EBITDA to FCF bridge for the most recent actual period."""
        base = self.financials[-1]
        items = {
            'EBITDA': base.ebitda,
            'Less: Interest': -base.interest_expense,
            'Less: Tax': -max(0, base.pbt * 0.25),
            'Less: Capex': -base.capex,
            'FCF': base.free_cash_flow,
        }
        labels = list(items.keys())
        values = list(items.values())

        fig, ax = plt.subplots(figsize=(10, 6))
        running = 0
        bottoms = []
        bar_values = []
        for i, (label, val) in enumerate(zip(labels, values)):
            if label == 'FCF':
                bottoms.append(0)
                bar_values.append(val)
            else:
                bottoms.append(running if val > 0 else running + val)
                bar_values.append(abs(val))
                running += val

        colors = ['#2196F3' if v >= 0 else '#F44336' for v in values]
        bars = ax.bar(labels, bar_values, bottom=bottoms, color=colors, width=0.5, edgecolor='white')

        for bar, val in zip(bars, values):
            y_pos = bar.get_y() + bar.get_height() / 2
            ax.text(bar.get_x() + bar.get_width() / 2, y_pos,
                    f'£{val/1e6:.1f}m', ha='center', va='center',
                    color='white', fontweight='bold', fontsize=9)

        ax.set_title(f'EBITDA to FCF Bridge — {self.inputs.borrower_name} ({base.year})',
                     fontsize=12, fontweight='bold')
        ax.set_ylabel('£ million')
        ax.yaxis.set_major_formatter(mtick.FuncFormatter(lambda x, _: f'£{x/1e6:.1f}m'))
        ax.grid(axis='y', alpha=0.3)
        plt.tight_layout()

        if save_path:
            plt.savefig(save_path, dpi=150)
        return fig

    def print_executive_summary(self):
        """Print a structured executive summary for credit memo drafting."""
        rt = self.build_ratio_table()
        growth = self.revenue_growth_analysis()
        ltv = self.ltv_analysis()
        base = self.financials[-1]

        print("=" * 70)
        print(f"CREDIT MEMO EXECUTIVE SUMMARY: {self.inputs.borrower_name}")
        print("=" * 70)
        print(f"Sector:          {self.inputs.sector}")
        print(f"Country:         {self.inputs.country}")
        print(f"Purpose:         {self.inputs.purpose}")
        print()
        print("── FINANCIAL SNAPSHOT ──────────────────────────────────────────")
        print(rt.to_string())
        print()
        print("── REVENUE GROWTH ──────────────────────────────────────────────")
        print(f"  Historical CAGR: {growth['cagr']}%")
        for yr, g in growth['yoy_growth'].items():
            print(f"  {yr}: {g*100:.1f}%")
        print()
        print("── SECURITY / LTV ──────────────────────────────────────────────")
        for k, v in ltv.items():
            print(f"  {k}: {v}")
        print()
        print("── DEBT SERVICE CAPACITY (post new facilities) ─────────────────")
        total_new = sum(f.committed_amount for f in self.inputs.proposed_facilities)
        avg_margin = np.mean([f.margin_bps for f in self.inputs.proposed_facilities]) / 10000
        base_rate = 0.0525   # SONIA + 0 (illustration)
        interest_rate = base_rate + avg_margin
        annual_repayment = total_new / 5  # simplistic 5-year amortisation
        dsc = self.debt_service_capacity(total_new, interest_rate, annual_repayment)
        print(dsc.to_string(index=False))


# ─────────────────────────────────────────────────────────────
# EXAMPLE USAGE
# ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    # Illustrative data for "Acme Manufacturing Ltd"
    periods = [
        FinancialPeriod(2021, 'AUDITED', 85e6, 22e6, 12e6, 9e6, 2.5e6, 6.5e6, 5.2e6,
                        65e6, 20e6, 3e6, 14e6, 8e6, 18e6, 63e6, 3e6),
        FinancialPeriod(2022, 'AUDITED', 92e6, 25e6, 14e6, 11e6, 2.8e6, 8.2e6, 6.5e6,
                        70e6, 22e6, 4e6, 15e6, 9e6, 19e6, 67e6, 3.5e6),
        FinancialPeriod(2023, 'AUDITED', 98e6, 28e6, 16e6, 12.5e6, 3.0e6, 9.5e6, 7.6e6,
                        74e6, 24e6, 5e6, 16e6, 9.5e6, 20e6, 70e6, 4e6),
    ]
    facilities = [
        FacilityTerms('RCF', 15e6, 3, 225, 100, 75, 'BULLET'),
        FacilityTerms('TERM_LOAN_A', 20e6, 5, 250, 150, 0, 'AMORTISING'),
    ]
    inputs = CreditMemoInputs(
        borrower_name='Acme Manufacturing Ltd',
        borrower_id='CUST-12345',
        sector='Industrial Manufacturing',
        country='United Kingdom',
        purpose='Refinancing of existing debt and working capital facility',
        financials=periods,
        proposed_facilities=facilities,
        existing_debt=24e6,
        security_value=35e6,
        security_type='First fixed charge over property and assets',
    )
    analyzer = CreditMemoAnalyzer(inputs)
    analyzer.print_executive_summary()
```

---

## 11. Interview Questions

**Technical questions:**

**Q1: Walk me through the structure of a credit memo for a new £50m term loan to a mid-market manufacturer.**

*Expected answer:* Should cover: executive summary, borrower background, ownership and management, industry analysis, financial analysis (3 years historical + projections), proposed facility terms, security analysis, risk assessment (including IRR), covenants, conditions precedent, recommendation.

**Q2: How does an annual review memo differ from a new facility memo, and what are the key things you focus on in a review?**

*Expected answer:* Review focuses on performance vs prior memo projections, covenant compliance history, rating migration, any material changes in the business, and whether the facility terms are still appropriate. New facility memo must establish the full credit case from scratch.

**Q3: A company shows EBITDA of £20m and net debt of £60m (3.0x leverage). The proposed new term loan will add £15m of debt. Is this credit acceptable?**

*Expected answer:* Cannot answer without more context. Need to know: the sector (3.0x might be fine for a utility, concerning for a retailer), the interest coverage ratio, the free cash flow conversion, the security, the maturity profile of existing debt, the purpose of the new debt, and the trajectory. Would then look at pro-forma leverage post-new debt (75/20 = 3.75x) and stress test.

**Q4: What is the difference between EBITDA and free cash flow, and why does the distinction matter for credit analysis?**

*Expected answer:* FCF = EBITDA minus interest, tax, capex, and working capital movements. EBITDA is often overstated as a proxy for cash flow because it ignores capex (which may be necessary maintenance, not growth), working capital movements (a growing business consumes cash), and tax. A capex-intensive business with 4.0x EBITDA leverage might have much higher effective leverage when viewed through an FCF lens.

**Q5: A borrower's audit opinion contains an "emphasis of matter" regarding going concern. How do you handle this in the credit memo?**

*Expected answer:* This is a serious red flag. The credit memo must explicitly discuss this, explain the nature of the going concern risk, present the borrower's plan to resolve it, assess the credibility of that plan, and either recommend declining (if going concern risk is material) or explaining why lending despite the going concern note is appropriate (which would be unusual for a new facility).

**Behavioural questions:**

**Q6: Tell me about a time when you disagreed with the Relationship Manager's view on a credit and how you handled it.**

**Q7: Describe the most complex credit you have analysed. What were the key risks and how did you address them in the memo?**

---

## 12. Common Mistakes

**Mistake 1: Leading with numbers, not the story**
The credit memo is a narrative document supported by numbers. A common junior analyst error is to present tables of ratios without explaining what they mean. The committee needs to understand *why* the leverage is 3.5x, not just that it is 3.5x.

**Mistake 2: Using management's projections uncritically**
Management is inherently optimistic. Projections submitted by the borrower must be stress-tested. The analyst must show: (a) what assumptions management has made, (b) whether those assumptions are reasonable based on historical performance and industry benchmarks, and (c) what happens if management falls short.

**Mistake 3: Inconsistency between the model and the memo**
If the memo says "EBITDA of £16.2m" and the model shows £16.5m, this destroys credibility with the credit committee. Every number must be reconciled.

**Mistake 4: Ignoring the purpose of the borrowing**
The "purpose" section is not just administrative. The bank must know what the money is being used for. Money is fungible — if a company borrows for "working capital" but the reality is to fund a dividend, that is a materially different risk profile. The source and use of funds must be explicit.

**Mistake 5: Underselling the security**
Security is the second way out. Analysts sometimes fail to properly value security or explain the enforcement mechanism. A personal guarantee from a director worth £100k provides very limited comfort against a £5m loan. The quality of security must be realistic.

**Mistake 6: Burying the risks**
A credit memo that presents a uniformly positive picture and then mentions in a footnote that the company has three ongoing material litigation claims has failed its purpose. All material risks must be clearly identified and assessed, even if the recommendation is still to approve.

**Mistake 7: Not considering the group structure**
Many borrowers are part of corporate groups. The credit must consider the entire group: Who is the borrower (the subsidiary or the holding company)? Is there a parent guarantee? What is the group's total indebtedness? Is cash trapped at subsidiary level?

---

## 13. Case Studies

**Case Study A: The Overlooked Working Capital Drag**

*Situation:* A retail distribution company with £80m revenue and £8m EBITDA (10% margin) sought a £15m working capital facility. The financial analysis showed interest cover of 4.0x — seemingly comfortable.

*The problem the analyst nearly missed:* A deep dive into the working capital showed DSO of 75 days and DPO of 30 days, with a CCC of 85 days. The company was effectively financing 85 days of its revenue base. When revenue grew, working capital consumed cash at an accelerating rate. In a growth scenario, the £15m facility would be fully utilised immediately and there would be no headroom.

*Resolution:* The analyst rebuilt the model to include a detailed working capital flow. The memo recommended the facility but also recommended that the company's payment terms be renegotiated as a condition of drawdown, and that a seasoned trade receivables reserve be maintained.

*Lesson:* EBITDA coverage ratios are not sufficient for working capital-intensive businesses. The cash conversion cycle must be modelled explicitly.

---

**Case Study B: The Acquisition That Changed Everything**

*Situation:* An annual review of an existing £25m facility to a professional services firm. The prior year's memo had approved the facility on the basis of 2.5x leverage and 5.0x interest cover. Review time: leverage had moved to 4.2x.

*The reason:* The company had made a bolt-on acquisition for £18m, funded by a separate acquisition loan from a different bank that the RM had not been informed of. The covenant in the existing facility prohibited additional financial indebtedness above £5m without consent — this had been clearly breached.

*Resolution:* A technical default had occurred. The credit memo for the review became a restructuring memo: document the breach, assess the credit on the combined basis (including the acquisition), determine whether to waive or enforce, and set new covenants appropriate to the higher leverage.

*Lesson:* Information covenants (requirement to notify the bank of material events) exist precisely to prevent this. Analysts must check that information covenants are being complied with, not just financial covenants.

---

## 14. Iterative Reinforcement

**Week 1 — Foundation:**
Read one real credit memo from your institution's archive (ask your manager). Identify each of the 15 sections in the actual document. Note where the real memo diverges from the template and ask why.

**Week 2 — Financial model:**
Build the financial model for the Case Study A borrower from scratch using only the ratios given. Then introduce the working capital overlay. Present your findings as a one-page financial summary.

**Week 3 — Memo drafting:**
Take the financial model from Week 2 and draft the financial analysis section of a credit memo. Write in full prose, not bullet points. Show it to a senior analyst for critique.

**Week 4 — Stress testing:**
For any approved credit at your institution, build a downside scenario. At what point does DSCR fall below 1.0x? Is there a covenant that would trigger before the bank runs out of debt service capacity? Present your findings in a "risk quantification" table.

**Month 2 — Shadow a credit committee:**
Ask to attend a Credit Committee meeting as an observer. Note which questions the committee asks that the memo does not answer. These are the gaps you need to eliminate from your own memos.

**Spaced repetition prompts:**
- What are the six things that must be in the executive summary of a credit memo?
- Explain the difference between DSCR and interest coverage ratio and when you would use each.
- What is an "emphasis of matter" in an audit report and what does it mean for a credit decision?
- How does an annual review differ from a new facility memo in terms of financial analysis depth?

---

## 15. Source Material

**Primary regulatory sources:**
- EBA Guidelines on Loan Origination and Monitoring (EBA/GL/2020/06) — definitive standard for credit file requirements in Europe
- PRA Supervisory Statement SS3/17 — Credit Risk: Internal Ratings Based Approaches
- Basel Committee on Banking Supervision: "Sound Credit Risk Assessment and Valuation for Loans" (2006, still current)
- CRR Article 178 — Definition of Default

**Accounting standards:**
- IFRS 9: Financial Instruments (2014, effective 2018) — provisioning and classification
- IFRS 16: Leases (2016, effective 2019) — operating leases on-balance-sheet
- IAS 36: Impairment of Assets — goodwill impairment
- IAS 37: Provisions, Contingent Liabilities and Contingent Assets

**Practitioner references:**
- Golin, J. and Delhaise, P.: *The Bank Credit Analysis Handbook* (2nd ed., Wiley, 2013) — the closest thing to a definitive practitioner guide
- Brealey, Myers & Allen: *Principles of Corporate Finance* (14th ed., McGraw-Hill) — theoretical underpinnings
- Association of Corporate Treasurers (ACT): *The Treasurer's Handbook* — borrower perspective useful for understanding what counterparties care about
- Loan Market Association (LMA): Standard form facility agreements — the legal template from which most UK/European loan documentation is derived; understanding the LMA template is essential for structuring sections of the credit memo

**Internal resources (institution-specific):**
- Your bank's Credit Policy Manual
- Your bank's Risk Appetite Statement
- Historical credit memos from your own institution (the best learning resource available)
- Your institution's rating methodology and scorecard documentation
