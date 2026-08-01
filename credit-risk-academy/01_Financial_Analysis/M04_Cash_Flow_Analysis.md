# M04 — Cash Flow Analysis

> **Academy:** Commercial & Corporate Credit Risk  
> **Track:** 01 Financial Analysis  
> **Audience:** Experienced Banking Business Analyst transitioning to Credit Risk  
> **Prerequisite:** M03 (Financial Statement Analysis)  
> **Estimated Study Time:** 14–18 hours  

---

## 1. Business Purpose

### The Central Truth of Corporate Credit

Credit analysis rests on a single foundational principle: **debt is repaid with cash, not profit**. A business can report strong profits while simultaneously running out of cash. Conversely, a loss-making business can generate substantial cash flow. Neither profit alone nor asset values alone determine a borrower's capacity to service and repay debt — only sustainable cash generation does.

This is not an abstract concept. It has destroyed banks. The UK bank failures and near-failures of 2008–2012 were not primarily caused by borrowers with bad P&Ls — many failed borrowers were profitable on paper. They were caused by businesses that could not convert profit into cash (because cash was trapped in working capital or consumed by debt service), and by banks that had not built rigorous cash flow models.

### Why Cash Flow Analysis is the Centrepiece of Credit

Consider two companies, both reporting £10 million EBITDA:

- **Company A:** EBITDA £10m, Capex £2m, Tax £1.5m, Working capital improvement £0.5m → Free Cash Flow **£7m**
- **Company B:** EBITDA £10m, Capex £6m, Tax £1.5m, Working capital deterioration £3m → Free Cash Flow **-£0.5m**

Company A can comfortably service debt. Company B cannot — despite identical EBITDA. The difference is entirely in the cash flow waterfall below EBITDA. Any credit analyst who stops their analysis at EBITDA will approve Company B's loan on the basis of apparent strength, and write a default note two years later.

Cash flow analysis is where financial analysis becomes credit analysis. The ability to build, interrogate, and stress-test a cash flow waterfall from first principles is the single most important technical skill for a corporate credit analyst.

### Rolls-Royce as the Illustrative Case

Rolls-Royce Holdings plc is one of the most analytically complex companies in the FTSE 100 — making it an excellent teaching vehicle. Its cash flow characteristics include:
- Long-cycle aerospace manufacturing (revenue recognised over multi-year contracts)
- High and volatile capital expenditure (R&D capitalisation and engine development)
- Significant pension obligations (legacy defined benefit schemes)
- Free cash flow that diverges substantially from EBITDA
- Post-COVID recovery trajectory from deeply negative FCF to positive generation

Throughout this module, Rolls-Royce examples illustrate the concepts in a real-world context.

---

## 2. Accounting Concepts

### The Indirect Method Cash Flow Statement

The Cash Flow Statement (under IAS 7 / IFRS) presents cash flows under three headings:
1. **Operating activities** — cash generated from trading
2. **Investing activities** — capex, acquisitions, disposals
3. **Financing activities** — debt drawdown/repayment, equity issuance, dividends, lease payments

The **indirect method** — used by most companies in their statutory accounts — starts with profit (EBIT, PBT, or PAT depending on the preparer's choice) and adjusts for non-cash items and working capital movements to arrive at operating cash flow.

The **direct method** — preferred by analysts but rarely used in statutory accounts — shows actual cash receipts and payments. It is more informative but requires more data. As a credit analyst, you will be building an approximate direct-method waterfall from the indirect-method statutory statement.

### Non-Cash Items in the P&L

When reconciling profit to cash, add back non-cash charges:

| Non-cash item | Why it is added back |
|---------------|---------------------|
| Depreciation | Asset write-down — cash was spent when the asset was purchased, not when it depreciates |
| Amortisation | Same principle as depreciation |
| Goodwill impairment | Non-cash write-down of an accounting asset |
| Share-based payment charges | P&L charge for equity awards; no cash leaves the company |
| Unrealised FX losses | Mark-to-market loss on translation; reverses when position closes |
| Unwinding of discount on provisions | Finance charge (non-cash interest on provisions at time value of money) |

### Accruals vs Cash: The Working Capital Reconciliation

The P&L is prepared on an accruals basis — revenue is recognised when earned, costs when incurred, regardless of when cash moves. The difference between accruals-based profit and cash is accounted for by working capital movements:

**Revenue recognised but not yet collected → increases trade receivables → cash is lower than profit**
**Cash collected before revenue recognised → reduces trade receivables → cash is higher than profit**
**Costs accrued but not yet paid → increases trade payables → cash is higher than profit**

Working capital movement on the Cash Flow Statement = (Opening working capital – Closing working capital)
An increase in working capital is a **use of cash** (shown as negative on the cash flow statement).
A decrease in working capital is a **source of cash** (shown as positive).

### Capital Expenditure: Two Types

Capital expenditure (capex) is the cash spent on acquiring or improving long-term assets. For credit analysis, the critical distinction is:

**Maintenance capex:** The minimum capital investment required to keep the existing asset base operational and competitive. This is a genuine constraint on free cash flow — without it, the asset base deteriorates and revenue generation capacity falls. In credit analysis, maintenance capex is treated as a committed outflow analogous to a fixed cost.

**Growth capex:** Investment beyond maintenance — in new capacity, new markets, new products. This is discretionary in the sense that it can be deferred in a stress scenario, but deferral has long-term competitive consequences. In a base case projection, growth capex should reflect the borrower's strategy. In a stress case, it is the first item to cut.

**The challenge:** Companies do not always separately report maintenance and growth capex. The analyst must estimate or ask management. Common proxies:
- Reported depreciation ≈ maintenance capex (reasonable for mature assets; may understate for ageing capital-intensive plant)
- Ask management directly: "What is your view of annual maintenance capex requirement?"
- Compare with peer company capex intensity ratios

For Rolls-Royce, the split is particularly important: total capex including R&D capitalisation is high, but a significant portion relates to engine programme development (growth capex) that can be moderated in a downturn.

---

## 3. Financial Concepts

### The Cash Flow Hierarchy: From EBITDA to Excess Cash

The cash flow waterfall is the analytical framework that takes normalised EBITDA and derives the cash available for debt service. Every step in the waterfall represents a real cash outflow that stands between EBITDA and lenders' debt repayment:

```
EBITDA (Normalised)
  Less: Cash tax paid                          [not the P&L tax charge — actual tax payments]
  Less: Maintenance Capex                      [cash spent on keeping assets operational]
  Less: Working Capital Movement               [cash consumed/released by WC changes]
═══════════════════════════════════════════════
= OPERATING FREE CASH FLOW                     [cash from operations net of maintenance needs]

  Less: Growth Capex                           [discretionary investment in expansion]
  Less: Acquisitions (net of disposals)        [M&A activity]
═══════════════════════════════════════════════
= FREE CASH FLOW (FCF)                         [total cash generated after all investment]

  Less: Interest Payments                      [cash interest, which may differ from P&L charge]
  Less: Principal Repayments                   [scheduled debt amortisation]
  Less: Lease Payments (pre-IFRS 16 basis)     [if analysing pre-IFRS 16]
═══════════════════════════════════════════════
= CASH AVAILABLE FOR DEBT SERVICE (CADS)       [residual after all mandatory payments]

  DSCR = (Interest + Principal) / CADS        [coverage of total debt service from cash flow]
  — OR —
  DSCR = (FCF + Interest + Principal) / (Interest + Principal)
```

Each item in the waterfall requires careful assessment:
- Tax paid may differ from the P&L tax charge (deferred tax movements, tax losses, timing)
- Cash interest may differ from the P&L interest charge (amortisation of debt issuance costs, PIK interest, hedging settlements)
- Principal repayments are from the debt maturity schedule, not the P&L

### DSCR: The Primary Coverage Metric

**Debt Service Coverage Ratio (DSCR)** = Free Cash Flow ÷ (Interest + Principal Due)

Or equivalently: DSCR = (EBITDA – Tax – Maintenance Capex – WC Movement) ÷ (Interest + Principal)

DSCR answers the question: for every £1 of debt service (interest plus scheduled principal), how much cash does the business generate?

- **DSCR < 1.0x:** Cash generation is insufficient to meet debt service — the borrower must refinance, raise equity, or sell assets to repay. This is a default risk signal.
- **DSCR 1.0–1.25x:** Thin coverage — any adverse development pushes below 1.0x
- **DSCR 1.25–1.5x:** Adequate for investment-grade quality assets
- **DSCR > 1.5x:** Comfortable coverage
- **DSCR > 2.0x:** Strong coverage; typical for high-quality investment-grade borrowers

**Sector DSCR benchmarks:**

| Sector | Typical Minimum Covenant | Commentary |
|--------|-------------------------|------------|
| Commercial Real Estate | 1.20–1.25x | Asset-backed; income relatively stable |
| Infrastructure (utilities, toll roads) | 1.30–1.40x | Stable cash flows; long-dated debt |
| Manufacturing | 1.25–1.50x | Cyclical; higher buffer required |
| Retail | 1.25–1.35x | Thin margins; volatile working capital |
| Healthcare / Pharma | 1.50–2.0x | High R&D capex; patent cliff risk |
| Aerospace / Defence | 1.25–1.75x | Long-cycle; backlog visibility |
| Leveraged Buyouts | 1.10–1.20x | Maximum leverage; minimal buffer |

### Interest Cover Ratio vs DSCR

**Interest Cover** = EBITDA ÷ Interest Expense

This is simpler than DSCR and is frequently used as a covenant metric, but it is inferior to DSCR for assessing true repayment capacity because:
1. It ignores principal repayment
2. It uses EBITDA rather than cash flow (does not capture capex or working capital)
3. It uses the P&L interest charge rather than cash interest paid

Use interest cover as a quick screening metric and covenant check. Use DSCR for substantive credit assessment.

**Typical Interest Cover thresholds:**
- Investment grade: 4.0x+
- Sub-investment grade: 2.0–4.0x
- Stressed / watch list: below 2.0x

### The Cash Conversion Cycle (CCC)

The Cash Conversion Cycle measures the number of days between a company paying for its inputs and collecting cash from its customers. It is the primary metric for working capital efficiency.

**CCC = DIO + DSO – DPO**

Where:
- **DIO** (Days Inventory Outstanding) = Inventory ÷ (Cost of Sales / 365)
- **DSO** (Days Sales Outstanding) = Trade Receivables ÷ (Revenue / 365)
- **DPO** (Days Payable Outstanding) = Trade Payables ÷ (Cost of Sales / 365)

**Interpretation:**
- A **positive CCC** means the business must fund the gap between paying for inputs and collecting from customers. As revenue grows, more working capital is required — growth consumes cash.
- A **negative CCC** means the business collects cash before paying its suppliers. Supermarkets are the classic example: customers pay at the till; suppliers are paid 45–60 days later. Negative working capital businesses generate cash as they grow.
- **CCC deterioration** (DIO rising, DSO rising, DPO falling) signals cash flow pressure and potential liquidity problems.

**Rolls-Royce CCC dynamics:** Rolls-Royce has a complex CCC because it manufactures engines over multi-year production cycles, receives advances from airline customers, and recognises revenue using long-term contract accounting. The working capital position is substantially affected by movements in contract assets and liabilities (the new balance sheet categories introduced by IFRS 15) rather than simple trade receivables.

### Maintenance vs Growth Capex: Why the Distinction Defines Your Free Cash Flow

This is one of the most judgement-intensive aspects of cash flow analysis. Two businesses can report identical total capex but have very different free cash flow profiles if the maintenance/growth split differs:

**Business A:** Total capex £50m, Maintenance capex £15m, Growth capex £35m
- Maintenance-adjusted FCF: EBITDA – Tax – £15m – WC
- Growth capex is discretionary and would fall to zero in a stress scenario
- In a downturn, FCF could increase (less growth investment)

**Business B:** Total capex £50m, Maintenance capex £45m, Growth capex £5m
- Maintenance-adjusted FCF: EBITDA – Tax – £45m – WC
- Virtually all capex is non-discretionary
- In a downturn, FCF cannot improve materially by cutting capex

Airlines and industrial manufacturers tend to have high maintenance capex ratios. Technology companies, with low physical assets, tend to have low maintenance capex (though they may have high R&D spending, which is a different category in the cash flow waterfall).

---

## 4. Statistical Concepts

### Sensitivity Analysis: The Core Stress-Testing Tool

The DSCR in the base case is useful but insufficient for credit decision-making. Credit analysts must understand how sensitive the DSCR is to adverse changes in key assumptions. The minimum set of sensitivities for a corporate credit analysis:

1. **Revenue sensitivity:** -10%, -20%, -30% from base case (sector-calibrated)
2. **EBITDA margin sensitivity:** -200bps, -400bps (input cost inflation, pricing pressure)
3. **Working capital sensitivity:** WC deterioration of £Xm (DSO +15 days, DIO +10 days)
4. **Interest rate sensitivity:** +100bps, +200bps on floating rate debt
5. **Capex overrun:** Maintenance capex 20–30% above estimate

For each sensitivity, calculate the resulting DSCR and flag if it falls below 1.0x, 1.1x, or the covenant threshold.

### Scenario Analysis: Combining Sensitivities

Scenario analysis combines multiple simultaneous adverse movements. Three scenarios are standard:

- **Base case:** Management's plan, lightly risk-adjusted by the analyst
- **Downside case:** Revenue –15%, margin –200bps, WC deterioration, capex +15%. This should be a plausible adverse outcome, not an extreme scenario.
- **Severe downside:** Revenue –25–30%, margin –400bps, WC deterioration, capex +20%. Should represent a severe but not catastrophic outcome.

Present all three DSCR calculations. The question is: does the borrower breach covenants or fall below 1.0x DSCR even in the severe downside? If yes, the risk appetite decision must be made with full awareness of that potential outcome.

### Monte Carlo Simulation (Advanced)

For larger facilities or portfolio analytics, Monte Carlo simulation can estimate the probability distribution of free cash flow and DSCR. Each key driver (revenue growth, margin, WC days, capex) is modelled as a distribution rather than a point estimate. Thousands of simulations generate a distribution of outcomes, allowing the analyst to say: "There is a 5% probability that DSCR falls below 1.0x in Year 3."

This is more sophisticated than standard sensitivity analysis and is increasingly used in investment-grade credit analytics at tier-1 banks. The Python implementation in Section 10 includes a Monte Carlo approach.

### Regression Analysis: Identifying EBITDA Drivers

For cyclical borrowers, historical regression of EBITDA against macro drivers (GDP growth, commodity prices, FX rates) helps quantify sensitivities and build more robust downside scenarios. For example: "A 1% fall in UK GDP is associated with a 3% reduction in this company's EBITDA, based on a 10-year regression."

---

## 5. Regulatory Framework

### EBA Guidelines on Loan Origination and Monitoring

EBA/GL/2020/06, effective June 2021, requires EU/UK banks to:
- Assess borrowers' cash flow-based debt service capacity as the primary repayment analysis
- Build forward-looking cash flow projections for the duration of the facility
- Conduct stress testing of debt service capacity under adverse scenarios
- Document the methodology for maintenance vs growth capex distinction

The EBA guidelines specifically warn against asset-value-based lending that does not consider primary repayment capacity. The cash flow waterfall is the regulatory standard for repayment assessment.

### PRA Supervisory Statement SS1/21 — Leverage Ratio Requirements

For financial institutions, leverage ratio requirements interact with the cash flow analysis of their borrowers. When a bank lends to a highly-leveraged company (high Net Debt/EBITDA), the regulatory capital treatment (risk weight) is higher, making the loan more expensive for the bank to hold. This creates an economic incentive to price highly-leveraged loans at wider spreads — the DSCR and leverage metrics directly feed into the economics of the lending relationship.

### IFRS 9 and Expected Credit Loss (ECL)

Under IFRS 9, banks must estimate Expected Credit Loss (ECL) on all loans. The cash flow projection that the credit analyst builds directly informs the ECL model:
- **Stage 1 (performing):** 12-month ECL — DSCR in Year 1 is the key metric
- **Stage 2 (significant increase in credit risk):** Lifetime ECL — the full projection period DSCR matters
- **Stage 3 (credit-impaired):** ECL based on recoveries — asset values and security take over from cash flow

A deteriorating DSCR trend triggers Stage 2 classification, which significantly increases the bank's ECL provision. Credit analysts who identify DSCR deterioration early allow the bank to reclassify loans in a timely manner, meeting their IFRS 9 obligations.

---

## 6. Data Required

### Data Inputs for Cash Flow Waterfall Construction

**From the audited Cash Flow Statement:**
- Cash generated from operations (before or after interest and tax — check what the company reports)
- Interest paid (actual cash, may differ from P&L interest expense)
- Tax paid (actual cash, may differ from P&L tax charge)
- Capital expenditure (separately: purchase of PP&E, purchase of intangibles)
- Proceeds from disposal of assets
- Cash paid for acquisitions
- Proceeds from new borrowings
- Repayment of borrowings
- Lease principal payments (post-IFRS 16, shown under financing)
- Dividends paid

**From the Notes:**
- Debt maturity schedule (which tranches mature when — critical for building the debt service schedule)
- Capex commitments (contracted but not yet spent)
- Operating lease commitments (pre-IFRS 16 or supplementary disclosures)
- Pension contribution schedule (regular contributions plus any deficit repair payments)

**From Management / Information Memorandum:**
- Maintenance vs growth capex split (ask management; verify against asset register and depreciation)
- Revenue and EBITDA forecast (management's view — to be risk-adjusted)
- Committed capex projects and their expected cash outflow timing

**From the Facility Agreement:**
- Definition of DSCR (exactly how the covenant calculates — which items are included/excluded)
- Definition of Debt Service (some agreements define it differently — include/exclude revolving credit facilities)
- Testing dates and cure periods

---

## 7. How Analysts Actually Work

### Building the Cash Flow Waterfall: The Process

**Step 1: Start with normalised EBITDA from the spread**
Carry over from the M03 spreading exercise. Use normalised EBITDA, not reported EBITDA. Clearly document any adjustments.

**Step 2: Reconstruct the tax cash flow**
The P&L tax charge ≠ tax paid. Tax paid is disclosed in the Cash Flow Statement (under operating or financing, depending on presentation). Reconcile the P&L charge to cash paid via deferred tax movements. For forward projections, estimate the effective cash tax rate (historical average is a starting point, adjusted for deferred tax assets/liabilities).

**Step 3: Separate maintenance capex from growth capex**
This requires either management disclosure or estimation. Common approaches:
- Use reported depreciation as a proxy for maintenance capex (with documented rationale)
- Ask the CFO or IR team in the information-gathering process
- Use industry maintenance capex percentages (e.g., 3–5% of revenue for manufacturers)

**Step 4: Calculate working capital movement**
From the Cash Flow Statement or from balance sheet movements. Understand the drivers: is working capital deteriorating because of growth (naturally consuming cash) or because of inefficiency (DSO lengthening, inventory building)?

**Step 5: Build the debt service schedule**
Extract from the notes: when does each debt tranche mature? What are the scheduled amortisation payments? What is the current interest rate (fixed or floating)? Include a floating rate sensitivity (+100bps).

**Step 6: Calculate DSCR for each year of the projection**
Base case, downside, severe downside. Present all three.

**Step 7: Identify the critical year**
Which year is the lowest DSCR? Why? Is it a capex peak? A debt maturity? A working capital trough? The critical year determines the point of maximum stress and should receive the most scrutiny.

**Step 8: Identify the covenant headroom**
If DSCR covenant is 1.25x and base case DSCR is 1.45x, what revenue decline would trigger a breach? Calculate explicitly: "A revenue decline of 14% from base case would reduce DSCR to 1.24x, triggering a breach."

### Practical Observations from the Credit Desk

- **Never accept management's FCF as your starting point.** Recalculate it from the statutory cash flow statement. Managements define FCF differently — some exclude capex, some exclude working capital, some add back "exceptional" cash outflows. There is no standard definition. Build your own from the statutory statements.

- **Watch out for the pension:** For industrial companies with defined benefit pension schemes (Rolls-Royce is a prime example), annual cash contributions to the pension fund are a significant debt-service-like cash outflow. They are not debt in the legal sense but they are a committed, regular cash outflow that must be deducted from EBITDA before you reach free cash flow. Many analysts forget this.

- **Distinguish between cash interest and P&L interest:** Post-IFRS 9, certain instruments are measured at amortised cost, meaning debt issuance costs are amortised as interest income/expense. The amortisation is non-cash. Cash interest paid may be lower than P&L interest expense.

- **Seasonality in working capital:** A retailer's working capital position in September (pre-Christmas build) looks very different from its position in January (post-Christmas sell-down). If you are assessing a retailer against September management accounts, the working capital is at its most stretched. Adjust your analysis accordingly.

- **Ask about the capex pipeline:** For capital-intensive borrowers, the current year's capex is not a reliable guide to future capex if there is a major capital programme in planning. Always ask: "What is your 3-year capex plan, and how much of that is committed vs discretionary?"

---

## 8. Excel Implementation

### Full Cash Flow Waterfall Model with DSCR Covenant Tracking

Build this as a separate tab in the spreading template from M03, or as a standalone model for projection work.

```excel
=== TAB: CASH FLOW WATERFALL ===
Columns: B=Historical FY21, C=Historical FY22, D=Historical FY23, E=Proj FY24, F=Proj FY25, G=Proj FY26

--- SECTION 1: EBITDA BUILD ---
Row 5:  Revenue                         [hard-code historical; formula for projection]
Row 6:  Revenue Growth %                [=(C5-B5)/B5]
Row 7:  EBITDA Margin % (assumption)    [hard-code or link to assumptions tab]
Row 8:  EBITDA (Normalised)             [=B5*B7 for projection; hard-code historical]
Row 9:  D&A (from spread)               [link to IS tab]

--- SECTION 2: CASH TAX ---
Row 12: PBT (from spread)              [link to IS tab]
Row 13: Effective Tax Rate (cash)       [hard-code assumption, e.g. 22%]
Row 14: Cash Tax                        [=B12*B13 — use actual cash tax for historical]

--- SECTION 3: WORKING CAPITAL ---
Row 17: DSO (Days Sales Outstanding)   [assumption]
Row 18: DIO (Days Inventory Outstanding) [assumption]
Row 19: DPO (Days Payable Outstanding) [assumption]
Row 20: Trade Receivables (implied)    [=B5/365*B17]
Row 21: Inventory (implied)            [=B6/365*B18]  -- use COGS for DIO
Row 22: Trade Payables (implied)       [=B6/365*B19]
Row 23: Net Working Capital            [=B20+B21-B22]
Row 24: WC Movement (positive=source)  [=B23-C23 — i.e., prior year NWC minus current year NWC]

--- SECTION 4: CAPEX ---
Row 27: Total Capex (historical: from CF statement; projection: assumption)
Row 28: Maintenance Capex             [=B9 as proxy — i.e., assume D&A ≈ maintenance capex]
Row 29: Growth Capex                  [=B27-B28]
Row 30: Capex as % Revenue            [=B27/B5]

--- SECTION 5: CASH FLOW WATERFALL ---
Row 33: EBITDA (Normalised)           [=B8]
Row 34: Less: Cash Tax                [=-B14]
Row 35: Less: Maintenance Capex       [=-B28]
Row 36: Add/(Less): WC Movement       [=B24]
Row 37: OPERATING FREE CASH FLOW      [=SUM(B33:B36)]
Row 38: Less: Growth Capex            [=-B29]
Row 39: Less: Net Acquisitions        [=from CF statement]
Row 40: FREE CASH FLOW                [=B37+B38+B39]

--- SECTION 6: DEBT SERVICE SCHEDULE ---
Row 43: [Build from debt maturity note in annual report]
Row 44: Facility A — Interest         [=B48*InterestRate_A]
Row 45: Facility A — Principal        [from amortisation schedule]
Row 46: Facility B — Interest         [=B49*InterestRate_B]
Row 47: Facility B — Principal        [from amortisation schedule]
Row 48: Total Interest (Cash)         [=B44+B46]
Row 49: Total Principal Repayments    [=B45+B47]
Row 50: TOTAL DEBT SERVICE            [=B48+B49]

--- SECTION 7: DSCR AND COVENANT ---
Row 53: CASH AVAILABLE FOR DEBT SERVICE  [=B40]
Row 54: Total Debt Service              [=B50]
Row 55: DSCR                           [=B53/B54]
Row 56: Covenant DSCR Threshold         [hard-code, e.g. 1.25]
Row 57: DSCR Headroom                  [=B55-B56]
Row 58: COVENANT STATUS                [=IF(B55>=B56,"PASS","BREACH")]
        [Format: Green if PASS, Red if BREACH]

--- SECTION 8: INTEREST COVER ---
Row 61: EBITDA / Interest Expense (P&L)  [=B8/B48]
Row 62: Interest Cover Covenant          [hard-code]
Row 63: IC Status                        [=IF(B61>=B62,"PASS","BREACH")]

--- SECTION 9: SENSITIVITY TABLE ---
[Build using Excel Data Table (What-If Analysis → Data Table)]

Revenue Growth Sensitivity:
         -30%    -20%    -10%    Base    +5%    +10%
DSCR:   [auto-calculated via 2D data table varying row 6]

EBITDA Margin Sensitivity:
         -400bp  -300bp  -200bp  Base   +100bp  +200bp
DSCR:   [auto-calculated via 2D data table varying row 7]

=== TAB: ASSUMPTIONS ===
Row 5:  Revenue growth rate (Year 1/2/3)
Row 8:  EBITDA margin %
Row 11: Cash tax rate %
Row 14: Maintenance capex (as % revenue or £m fixed)
Row 17: Growth capex (£m per year)
Row 20: DSO days
Row 23: DIO days
Row 26: DPO days
Row 29: Interest rate (floating rate debt)
Row 32: Interest rate sensitivity (+bps)
```

### Key Excel Functions for Cash Flow Modelling

```excel
-- CAGR calculation (for revenue/EBITDA trend)
=((D5/B5)^(1/(COLUMNS(B5:D5)-1)))-1

-- Interest calculation with floating rate sensitivity
=(SOFR_Rate + Margin + Sensitivity_bps/10000) * Outstanding_Debt

-- Weighted average cost of debt
=SUMPRODUCT(Debt_Amounts, Interest_Rates) / SUM(Debt_Amounts)

-- Days Outstanding calculation
=Receivables / (Revenue / 365)

-- DSCR with minimum (floor at 0 to avoid division by zero issues in charts)
=MAX(FCF, 0) / MAX(DebtService, 0.001)

-- Traffic light for DSCR
=IFS(B55>=1.5, "GREEN", B55>=1.25, "AMBER", B55>=1.0, "RED", TRUE, "CRITICAL")
```

---

## 9. SQL Implementation

```sql
-- Schema extension: cash flow waterfall storage
CREATE TABLE cash_flow_waterfall (
    cf_id               INT PRIMARY KEY IDENTITY(1,1),
    period_id           INT REFERENCES financial_periods(period_id),
    -- Operating cash flow components
    ebitda_normalised   DECIMAL(18,3),
    cash_tax_paid       DECIMAL(18,3),
    maintenance_capex   DECIMAL(18,3),
    wc_movement         DECIMAL(18,3),  -- positive = source of cash
    -- Derived: operating free cash flow
    operating_fcf       AS (ebitda_normalised - cash_tax_paid - maintenance_capex + wc_movement) PERSISTED,
    -- Investing
    growth_capex        DECIMAL(18,3),
    net_acquisitions    DECIMAL(18,3),
    -- Free cash flow
    free_cash_flow      AS (ebitda_normalised - cash_tax_paid - maintenance_capex + wc_movement
                            - growth_capex - net_acquisitions) PERSISTED,
    -- Debt service
    cash_interest_paid  DECIMAL(18,3),
    principal_repaid    DECIMAL(18,3),
    lease_payments      DECIMAL(18,3),
    total_debt_service  AS (cash_interest_paid + principal_repaid + lease_payments) PERSISTED,
    -- Working capital days
    dso_days            DECIMAL(8,2),
    dio_days            DECIMAL(8,2),
    dpo_days            DECIMAL(8,2),
    -- Pension
    pension_contributions DECIMAL(18,3)
);

-- Compute DSCR, Interest Cover, and Cash Conversion Cycle
SELECT
    c.company_name,
    fp.period_end,
    cfw.ebitda_normalised,
    cfw.free_cash_flow,
    cfw.total_debt_service,
    -- DSCR
    CASE WHEN cfw.total_debt_service > 0
         THEN ROUND(cfw.free_cash_flow / cfw.total_debt_service, 2)
         ELSE NULL END                                          AS dscr,
    -- Interest Cover (EBITDA / Cash Interest)
    CASE WHEN cfw.cash_interest_paid > 0
         THEN ROUND(cfw.ebitda_normalised / cfw.cash_interest_paid, 2)
         ELSE NULL END                                          AS interest_cover,
    -- Cash Conversion Cycle
    ROUND(cfw.dso_days + cfw.dio_days - cfw.dpo_days, 1)      AS cash_conversion_cycle,
    -- Operating FCF Margin
    ROUND(cfw.operating_fcf / NULLIF(is_.revenue, 0) * 100, 1) AS op_fcf_margin_pct,
    -- Capex intensity
    ROUND((cfw.maintenance_capex + cfw.growth_capex) / NULLIF(is_.revenue, 0) * 100, 1) AS total_capex_pct_rev
FROM companies c
JOIN financial_periods fp ON c.company_id = fp.company_id
JOIN cash_flow_waterfall cfw ON fp.period_id = cfw.period_id
JOIN income_statement is_ ON fp.period_id = is_.period_id
ORDER BY c.company_name, fp.period_end;

-- Portfolio screening: flag companies with DSCR below threshold
WITH dscr_calc AS (
    SELECT
        c.company_id,
        c.company_name,
        c.sector,
        fp.period_end,
        cfw.free_cash_flow,
        cfw.total_debt_service,
        CASE WHEN cfw.total_debt_service > 0
             THEN cfw.free_cash_flow / cfw.total_debt_service
             ELSE NULL END AS dscr,
        ROW_NUMBER() OVER (PARTITION BY c.company_id ORDER BY fp.period_end DESC) AS rn
    FROM companies c
    JOIN financial_periods fp ON c.company_id = fp.company_id
    JOIN cash_flow_waterfall cfw ON fp.period_id = cfw.period_id
)
SELECT
    company_name,
    sector,
    period_end AS latest_period,
    ROUND(dscr, 2) AS latest_dscr,
    CASE
        WHEN dscr >= 1.5 THEN 'STRONG'
        WHEN dscr >= 1.25 THEN 'ADEQUATE'
        WHEN dscr >= 1.0 THEN 'MARGINAL'
        ELSE 'BREACH'
    END AS dscr_rating
FROM dscr_calc
WHERE rn = 1
ORDER BY dscr ASC;

-- Working capital trend analysis: flag deteriorating DSO
SELECT
    c.company_name,
    fp.period_end,
    cfw.dso_days,
    LAG(cfw.dso_days) OVER (PARTITION BY c.company_id ORDER BY fp.period_end) AS prior_dso,
    cfw.dso_days - LAG(cfw.dso_days) OVER (PARTITION BY c.company_id ORDER BY fp.period_end) AS dso_change,
    cfw.dpo_days,
    LAG(cfw.dpo_days) OVER (PARTITION BY c.company_id ORDER BY fp.period_end) AS prior_dpo,
    cfw.dpo_days - LAG(cfw.dpo_days) OVER (PARTITION BY c.company_id ORDER BY fp.period_end) AS dpo_change,
    ROUND(cfw.dso_days + cfw.dio_days - cfw.dpo_days, 1) AS ccc
FROM companies c
JOIN financial_periods fp ON c.company_id = fp.company_id
JOIN cash_flow_waterfall cfw ON fp.period_id = cfw.period_id
WHERE c.company_name = 'Rolls-Royce Holdings'
ORDER BY fp.period_end;

-- Year-on-year FCF bridge: decompose FCF change into components
WITH fcf_bridge AS (
    SELECT
        c.company_name,
        fp.period_end,
        cfw.ebitda_normalised,
        cfw.cash_tax_paid,
        cfw.maintenance_capex,
        cfw.growth_capex,
        cfw.wc_movement,
        cfw.free_cash_flow,
        LAG(cfw.ebitda_normalised) OVER (PARTITION BY c.company_id ORDER BY fp.period_end) AS prior_ebitda,
        LAG(cfw.free_cash_flow) OVER (PARTITION BY c.company_id ORDER BY fp.period_end) AS prior_fcf
    FROM companies c
    JOIN financial_periods fp ON c.company_id = fp.company_id
    JOIN cash_flow_waterfall cfw ON fp.period_id = cfw.period_id
)
SELECT
    company_name,
    period_end,
    ROUND(ebitda_normalised - prior_ebitda, 1) AS ebitda_movement,
    ROUND(free_cash_flow - prior_fcf, 1) AS total_fcf_movement,
    ROUND(free_cash_flow, 1) AS current_fcf,
    ROUND(prior_fcf, 1) AS prior_fcf
FROM fcf_bridge
WHERE prior_fcf IS NOT NULL
ORDER BY company_name, period_end;
```

---

## 10. Python Implementation

### Cash Flow Sensitivity Model: Stress-Testing DSCR

```python
"""
M04 — Cash Flow Analysis and DSCR Sensitivity Model
Builds the cash flow waterfall from first principles and stress-tests
DSCR across revenue and margin sensitivities.
Case study: Rolls-Royce Holdings plc (simplified/illustrative).
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
from dataclasses import dataclass, field
from typing import List, Tuple, Dict, Optional
import warnings

warnings.filterwarnings("ignore")


# ─────────────────────────────────────────────
# DATA STRUCTURES
# ─────────────────────────────────────────────

@dataclass
class DebtTranche:
    name: str
    outstanding: float        # £m
    interest_rate: float      # decimal, e.g. 0.055 for 5.5%
    annual_principal: float   # scheduled amortisation per year
    maturity_year: int        # calendar year of maturity

@dataclass
class CashFlowAssumptions:
    """Projection assumptions for one year."""
    year: int
    revenue: float
    ebitda_margin: float      # decimal
    cash_tax_rate: float      # decimal
    maintenance_capex: float  # £m
    growth_capex: float       # £m
    dso_days: float
    dio_days: float
    dpo_days: float
    prior_revenue: float      # for WC calculation
    prior_dso: float
    prior_dio: float
    prior_dpo: float
    pension_contributions: float = 0.0


class CashFlowWaterfall:
    """
    Builds the full cash flow waterfall and computes DSCR.
    Designed to work with a list of CashFlowAssumptions and DebtTranches.
    """

    def __init__(self, company_name: str, base_revenue: float,
                 base_cogs_pct: float, debt_tranches: List[DebtTranche]):
        self.company_name = company_name
        self.base_revenue = base_revenue
        self.base_cogs_pct = base_cogs_pct
        self.debt_tranches = debt_tranches
        self.results: List[Dict] = []

    def _calc_wc_movement(self, assumptions: CashFlowAssumptions) -> float:
        """
        Calculate working capital movement from DSO/DIO/DPO changes.
        Positive value = source of cash (WC decreased).
        """
        cogs = assumptions.revenue * self.base_cogs_pct

        current_receivables = assumptions.revenue / 365 * assumptions.dso_days
        current_inventory = cogs / 365 * assumptions.dio_days
        current_payables = cogs / 365 * assumptions.dpo_days
        current_nwc = current_receivables + current_inventory - current_payables

        prior_cogs = assumptions.prior_revenue * self.base_cogs_pct
        prior_receivables = assumptions.prior_revenue / 365 * assumptions.prior_dso
        prior_inventory = prior_cogs / 365 * assumptions.prior_dio
        prior_payables = prior_cogs / 365 * assumptions.prior_dpo
        prior_nwc = prior_receivables + prior_inventory - prior_payables

        return prior_nwc - current_nwc  # positive if NWC decreased (source of cash)

    def _calc_debt_service(self, year: int) -> Tuple[float, float]:
        """Calculate interest and principal due in a given year."""
        total_interest = 0.0
        total_principal = 0.0
        for tranche in self.debt_tranches:
            if year <= tranche.maturity_year:
                total_interest += tranche.outstanding * tranche.interest_rate
                total_principal += tranche.annual_principal
        return total_interest, total_principal

    def run_projection(self, assumptions_list: List[CashFlowAssumptions]) -> pd.DataFrame:
        """Run the full cash flow waterfall for a list of annual assumptions."""
        rows = []
        for a in assumptions_list:
            ebitda = a.revenue * a.ebitda_margin
            cash_tax = ebitda * a.cash_tax_rate  # simplified; use PBT-based in practice
            wc_movement = self._calc_wc_movement(a)
            operating_fcf = ebitda - cash_tax - a.maintenance_capex + wc_movement - a.pension_contributions
            fcf = operating_fcf - a.growth_capex
            interest, principal = self._calc_debt_service(a.year)
            total_ds = interest + principal
            dscr = fcf / total_ds if total_ds > 0 else np.nan
            ccc = a.dso_days + a.dio_days - a.dpo_days

            rows.append({
                "Year": a.year,
                "Revenue (£m)": round(a.revenue, 1),
                "EBITDA (£m)": round(ebitda, 1),
                "EBITDA Margin": f"{a.ebitda_margin:.1%}",
                "Cash Tax (£m)": round(cash_tax, 1),
                "Maintenance Capex (£m)": round(a.maintenance_capex, 1),
                "Growth Capex (£m)": round(a.growth_capex, 1),
                "WC Movement (£m)": round(wc_movement, 1),
                "Pension Contributions (£m)": round(a.pension_contributions, 1),
                "Operating FCF (£m)": round(operating_fcf, 1),
                "Free Cash Flow (£m)": round(fcf, 1),
                "Interest (£m)": round(interest, 1),
                "Principal (£m)": round(principal, 1),
                "Total Debt Service (£m)": round(total_ds, 1),
                "DSCR": round(dscr, 2) if not np.isnan(dscr) else "N/A",
                "Cash Conv. Cycle (days)": round(ccc, 1),
            })
        self.results = rows
        return pd.DataFrame(rows)

    def sensitivity_table(self, base_assumptions: List[CashFlowAssumptions],
                          revenue_shocks: List[float],
                          margin_shocks: List[float],
                          target_year: int = 1) -> pd.DataFrame:
        """
        Build a 2D DSCR sensitivity table.
        revenue_shocks: list of multipliers applied to base revenue (e.g. [0.7, 0.8, 0.9, 1.0, 1.05, 1.10])
        margin_shocks: list of margin adjustments in decimal (e.g. [-0.04, -0.02, 0.00, 0.02])
        """
        base_a = base_assumptions[target_year - 1]
        interest, principal = self._calc_debt_service(base_a.year)
        total_ds = interest + principal

        index_labels = [f"{(m*100):+.0f}% Rev" for m in [r - 1 for r in revenue_shocks]]
        col_labels = [f"Margin {(ms*100):+.0f}bps" for ms in [s * 100 for s in margin_shocks]]

        table = pd.DataFrame(index=index_labels, columns=col_labels, dtype=float)

        for i, rev_mult in enumerate(revenue_shocks):
            for j, margin_adj in enumerate(margin_shocks):
                stressed_rev = base_a.revenue * rev_mult
                stressed_margin = base_a.ebitda_margin + margin_adj
                stressed_ebitda = stressed_rev * stressed_margin
                stressed_tax = stressed_ebitda * base_a.cash_tax_rate
                wc_a = CashFlowAssumptions(
                    year=base_a.year,
                    revenue=stressed_rev,
                    ebitda_margin=stressed_margin,
                    cash_tax_rate=base_a.cash_tax_rate,
                    maintenance_capex=base_a.maintenance_capex,
                    growth_capex=base_a.growth_capex,
                    dso_days=base_a.dso_days,
                    dio_days=base_a.dio_days,
                    dpo_days=base_a.dpo_days,
                    prior_revenue=base_a.prior_revenue,
                    prior_dso=base_a.prior_dso,
                    prior_dio=base_a.prior_dio,
                    prior_dpo=base_a.prior_dpo,
                    pension_contributions=base_a.pension_contributions,
                )
                wc_mv = self._calc_wc_movement(wc_a)
                stressed_op_fcf = (stressed_ebitda - stressed_tax
                                   - base_a.maintenance_capex + wc_mv
                                   - base_a.pension_contributions)
                stressed_fcf = stressed_op_fcf - base_a.growth_capex
                stressed_dscr = stressed_fcf / total_ds if total_ds > 0 else np.nan
                table.iloc[i, j] = round(stressed_dscr, 2)

        return table

    def monte_carlo_dscr(self, base_a: CashFlowAssumptions,
                         n_simulations: int = 10_000,
                         rev_std: float = 0.10,
                         margin_std: float = 0.02) -> Dict:
        """
        Monte Carlo simulation of Year 1 DSCR.
        Assumes normally distributed revenue and margin around base case.
        """
        np.random.seed(42)
        interest, principal = self._calc_debt_service(base_a.year)
        total_ds = interest + principal

        sim_revenues = np.random.normal(base_a.revenue, base_a.revenue * rev_std, n_simulations)
        sim_margins = np.random.normal(base_a.ebitda_margin, margin_std, n_simulations)
        sim_margins = np.clip(sim_margins, 0.01, 0.50)  # reasonable bounds

        sim_ebitda = sim_revenues * sim_margins
        sim_tax = sim_ebitda * base_a.cash_tax_rate
        sim_fcf = (sim_ebitda - sim_tax
                   - base_a.maintenance_capex
                   - base_a.growth_capex
                   - base_a.pension_contributions)
        sim_dscr = sim_fcf / total_ds

        return {
            "mean_dscr": round(np.mean(sim_dscr), 2),
            "median_dscr": round(np.median(sim_dscr), 2),
            "p5_dscr": round(np.percentile(sim_dscr, 5), 2),
            "p25_dscr": round(np.percentile(sim_dscr, 25), 2),
            "prob_below_1x": round(np.mean(sim_dscr < 1.0) * 100, 1),
            "prob_below_125x": round(np.mean(sim_dscr < 1.25) * 100, 1),
            "sim_dscr": sim_dscr,
        }


# ─────────────────────────────────────────────
# ROLLS-ROYCE ILLUSTRATIVE CASE
# ─────────────────────────────────────────────

def build_rolls_royce_model():
    """
    Illustrative cash flow model for Rolls-Royce Holdings plc.
    Figures approximate and simplified for educational purposes.
    FY2023: post-COVID recovery; strong FCF generation.
    All figures in £millions.
    """
    # Debt structure (illustrative)
    debt = [
        DebtTranche("Senior Notes 2024", outstanding=500, interest_rate=0.036, annual_principal=250, maturity_year=2024),
        DebtTranche("Senior Notes 2027", outstanding=750, interest_rate=0.045, annual_principal=0, maturity_year=2027),
        DebtTranche("Senior Notes 2032", outstanding=1_000, interest_rate=0.055, annual_principal=0, maturity_year=2032),
        DebtTranche("RCF (undrawn)", outstanding=0, interest_rate=0.06, annual_principal=0, maturity_year=2028),
    ]

    model = CashFlowWaterfall(
        company_name="Rolls-Royce Holdings plc (Illustrative)",
        base_revenue=15_400,
        base_cogs_pct=0.72,
        debt_tranches=debt,
    )

    # Base case projection (FY2024–FY2026)
    scenarios = {
        "Base Case": [
            CashFlowAssumptions(year=2024, revenue=16_200, ebitda_margin=0.115,
                                cash_tax_rate=0.20, maintenance_capex=650, growth_capex=400,
                                dso_days=55, dio_days=70, dpo_days=65,
                                prior_revenue=15_400, prior_dso=58, prior_dio=72, prior_dpo=63,
                                pension_contributions=120),
            CashFlowAssumptions(year=2025, revenue=17_100, ebitda_margin=0.120,
                                cash_tax_rate=0.21, maintenance_capex=680, growth_capex=380,
                                dso_days=53, dio_days=68, dpo_days=66,
                                prior_revenue=16_200, prior_dso=55, prior_dio=70, prior_dpo=65,
                                pension_contributions=110),
            CashFlowAssumptions(year=2026, revenue=17_800, ebitda_margin=0.125,
                                cash_tax_rate=0.22, maintenance_capex=710, growth_capex=350,
                                dso_days=52, dio_days=67, dpo_days=67,
                                prior_revenue=17_100, prior_dso=53, prior_dio=68, prior_dpo=66,
                                pension_contributions=100),
        ],
        "Downside (-15% Rev, -200bp Margin)": [
            CashFlowAssumptions(year=2024, revenue=16_200*0.85, ebitda_margin=0.095,
                                cash_tax_rate=0.20, maintenance_capex=650, growth_capex=200,
                                dso_days=62, dio_days=78, dpo_days=60,
                                prior_revenue=15_400, prior_dso=58, prior_dio=72, prior_dpo=63,
                                pension_contributions=120),
            CashFlowAssumptions(year=2025, revenue=17_100*0.85, ebitda_margin=0.100,
                                cash_tax_rate=0.20, maintenance_capex=680, growth_capex=180,
                                dso_days=60, dio_days=76, dpo_days=61,
                                prior_revenue=16_200*0.85, prior_dso=62, prior_dio=78, prior_dpo=60,
                                pension_contributions=120),
            CashFlowAssumptions(year=2026, revenue=17_800*0.85, ebitda_margin=0.105,
                                cash_tax_rate=0.21, maintenance_capex=710, growth_capex=160,
                                dso_days=58, dio_days=74, dpo_days=62,
                                prior_revenue=17_100*0.85, prior_dso=60, prior_dio=76, prior_dpo=61,
                                pension_contributions=120),
        ],
    }
    return model, scenarios


def run_rolls_royce_analysis():
    model, scenarios = build_rolls_royce_model()

    print(f"\n{'='*80}")
    print(f"CASH FLOW ANALYSIS — {model.company_name}")
    print(f"{'='*80}")

    for scenario_name, assumptions in scenarios.items():
        print(f"\n--- {scenario_name.upper()} ---")
        df = model.run_projection(assumptions)
        cols_to_show = ["Year", "Revenue (£m)", "EBITDA (£m)", "EBITDA Margin",
                        "Operating FCF (£m)", "Free Cash Flow (£m)",
                        "Total Debt Service (£m)", "DSCR", "Cash Conv. Cycle (days)"]
        print(df[cols_to_show].to_string(index=False))

    # Sensitivity table (base case, Year 1)
    print("\n--- DSCR SENSITIVITY TABLE (Year 1 — Revenue vs EBITDA Margin) ---")
    base_assumptions = scenarios["Base Case"]
    sens = model.sensitivity_table(
        base_assumptions=base_assumptions,
        revenue_shocks=[0.70, 0.80, 0.90, 1.00, 1.05, 1.10],
        margin_shocks=[-0.04, -0.02, -0.01, 0.00, 0.01, 0.02],
        target_year=1
    )
    print(sens.to_string())
    print("\nNote: Values below 1.00x represent a DSCR breach (cash flow < debt service)")
    print("      Values below 1.25x may breach typical covenant threshold")

    # Monte Carlo
    print("\n--- MONTE CARLO SIMULATION (10,000 iterations — Base Case Year 1) ---")
    mc = model.monte_carlo_dscr(base_assumptions[0], n_simulations=10_000,
                                 rev_std=0.08, margin_std=0.015)
    print(f"  Mean DSCR:                {mc['mean_dscr']:.2f}x")
    print(f"  Median DSCR:              {mc['median_dscr']:.2f}x")
    print(f"  5th Percentile DSCR:      {mc['p5_dscr']:.2f}x")
    print(f"  Probability DSCR < 1.0x:  {mc['prob_below_1x']:.1f}%")
    print(f"  Probability DSCR < 1.25x: {mc['prob_below_125x']:.1f}%")

    # Cash Conversion Cycle analysis
    print("\n--- CASH CONVERSION CYCLE ANALYSIS ---")
    print("  DIO + DSO - DPO = CCC")
    for a in base_assumptions:
        ccc = a.dso_days + a.dio_days - a.dpo_days
        print(f"  {a.year}: {a.dio_days:.0f} + {a.dso_days:.0f} - {a.dpo_days:.0f} = {ccc:.0f} days")
    print("\n  A shortening CCC indicates improving working capital efficiency.")
    print("  For Rolls-Royce, WC is complex: customer advances and contract liabilities")
    print("  (IFRS 15) create timing differences not captured by simple DIO/DSO/DPO.")

    return model, scenarios


if __name__ == "__main__":
    model, scenarios = run_rolls_royce_analysis()
```

---

## 11. Interview Questions

**Q1: What is the difference between EBITDA and Free Cash Flow?**
EBITDA is a proxy for operating cash generation before tax, capex, and working capital movements. Free Cash Flow is the actual cash remaining after tax, all capital expenditure, and working capital changes. A business with EBITDA of £50m but £30m of annual capex and £10m working capital consumption has FCF of approximately £10m (less tax). The gap between EBITDA and FCF is the critical credit analytical step — EBITDA alone tells you almost nothing about a company's ability to repay debt.

**Q2: How would you calculate DSCR and what does a DSCR of 1.3x mean?**
DSCR = Free Cash Flow ÷ (Interest + Scheduled Principal Due). A DSCR of 1.3x means the company generates £1.30 of free cash flow for every £1.00 of debt service. It means there is a 30% buffer before cash flow is insufficient to service debt. Whether 1.3x is adequate depends on the sector (1.3x is typical for real estate; somewhat thin for a cyclical manufacturer) and the volatility of cash flows. I would stress-test to understand what revenue decline would take DSCR to 1.0x.

**Q3: Why might a highly profitable company have negative free cash flow?**
Several reasons: (1) High capital expenditure — a profitable manufacturer investing heavily in new capacity consumes significant cash; (2) Working capital growth — a rapidly growing business funds more inventory and receivables, consuming cash; (3) Acquisitions — cash paid for businesses reduces FCF; (4) Debt service on heavily leveraged deals may exceed operating FCF. A company in a high-growth phase might simultaneously be profitable and cash-negative, which is fine if the growth investment generates future returns — but it requires careful credit assessment of how the cash deficit is funded during the investment period.

**Q4: What is the Cash Conversion Cycle and what does it tell you?**
The CCC = DSO + DIO – DPO. It measures how many days elapse between paying for inputs and collecting cash from customers. A long CCC means the business must fund a large working capital gap — growth consumes cash. A negative CCC (supermarkets, online retailers with advance payments) means the business receives cash before paying suppliers — working capital is a source of cash as the business grows. As a credit analyst, I monitor CCC trends: rising DSO (customers paying more slowly) or rising DIO (inventory building) are early warning signs of cash flow deterioration.

**Q5: How does maintenance capex differ from growth capex and why does it matter for credit analysis?**
Maintenance capex is the non-discretionary investment required to keep existing assets operational. Growth capex is discretionary investment in expansion. In a stress scenario, growth capex can be cut (reducing cash outflow and improving DSCR), but maintenance capex cannot — failing to maintain assets causes them to deteriorate and reduces revenue generation. For credit analysis, free cash flow should always deduct maintenance capex, even in a downside scenario. Growth capex is then layered in for the base case but removed in the stress case to show the minimum DSCR.

**Q6: Why might DSCR look healthy today but represent a credit risk in three years?**
The debt maturity profile. A company generating strong DSCR on current interest costs may face a large bullet repayment in Year 3 that its FCF cannot cover — it must refinance. This is refinancing risk. I always look at the debt maturity schedule and model the DSCR in the year of the bullet maturity. Additionally, a company may have fixed-rate debt today that refinances to higher rates in Year 3 — I would run an interest rate sensitivity to show the DSCR impact.

---

## 12. Common Mistakes

**Mistake 1: Treating EBITDA as cash flow**
This is the most common mistake of junior analysts. EBITDA ignores tax, capex, and working capital. A company with £50m EBITDA but £45m of capex and working capital outflows has almost no free cash flow. Always build the full waterfall.

**Mistake 2: Using P&L interest instead of cash interest paid**
The P&L interest charge includes non-cash items (amortisation of debt issuance costs, fair value adjustments). Cash interest paid is in the Cash Flow Statement. Use cash interest paid for DSCR. The difference is usually small but can be material for leveraged loans with complex fee structures.

**Mistake 3: Forgetting pension contributions**
For industrial companies with defined benefit pension schemes, annual pension contributions are a real cash outflow. They are not interest, not principal, not tax — but they are as committed as any of those. Including them in the cash flow waterfall between EBITDA and FCF is correct practice. Forgetting them overstates FCF and understates the cash burden on the business.

**Mistake 4: Assuming management's capex split between maintenance and growth is accurate**
Management has an incentive to classify as much capex as possible as "growth" (discretionary, can be cut in a downside) rather than "maintenance" (committed). Challenge the split. Use depreciation as a cross-check. For capital-intensive businesses, maintenance capex is often higher than management states.

**Mistake 5: Static DSCR — not building a multi-year projection**
A single DSCR calculation is nearly useless. DSCR must be projected over the life of the facility to identify the critical year (lowest DSCR) and to model debt maturities. A loan with a 5-year tenor requires a 5-year projection with year-by-year DSCR.

**Mistake 6: Not stress-testing**
A base case DSCR of 1.8x sounds very strong. But if a 15% revenue decline takes it to 0.9x (breach), the credit quality is much weaker than the base case implies. Every credit analysis must include at least a downside scenario. For cyclical sectors, the downside should be calibrated to the actual historical trough, not an arbitrary haircut.

---

## 13. Case Studies

### Case Study 1: Rolls-Royce — The Disconnect Between Profit and Cash Flow

Rolls-Royce's financial history illustrates several key cash flow analytical concepts simultaneously.

**Long-Term Service Agreements (LTSAs):** Rolls-Royce earns revenue from engine servicing contracts over the life of an aircraft engine (20–30 years). Under IFRS 15, this revenue is recognised on a percentage-of-completion basis as flying hours accumulate. This creates substantial timing differences: cash may be received in advance (creating contract liabilities) or in arrears (creating contract assets). The credit analyst must look through the P&L to understand actual cash flows.

**R&D Capitalisation vs Expensing:** Rolls-Royce capitalises significant development costs on its engine programmes (particularly the Trent XWB for the Airbus A350 and the UltraFan). These capitalised costs appear as intangible assets, reducing reported capex relative to total cash spent on development. The credit analyst must add back capitalised R&D to get total investment spending, and assess the risk of impairment if an engine programme is delayed or cancelled.

**Pension Obligations:** Rolls-Royce has substantial defined benefit pension obligations inherited from its long history. In years of market stress, the deficit can widen significantly, triggering increased contribution requirements. During 2020-2022, pension contributions were a meaningful drain on free cash flow that needed to be modelled explicitly.

**Credit lesson:** For complex industrial companies, FCF from the statutory accounts may not reflect the true cash burden on the business. The analyst must build a waterfall that goes beyond the statutory presentation to capture all economic cash outflows.

### Case Study 2: Negative Working Capital as a Cash Flow Advantage

A UK grocery retailer (similar profile to a mid-sized supermarket chain) has the following working capital characteristics:
- Customers pay at point of sale (DSO = 0 days)
- Perishable inventory turns in 10 days (DIO = 10 days)
- Suppliers are paid in 35 days (DPO = 35 days)
- CCC = 0 + 10 – 35 = **–25 days**

This means for every £1 of sales, the retailer holds the cash for 25 days before paying its suppliers. As the business grows from £500m to £600m revenue, the working capital position actually improves (more supplier credit) — working capital is a **source** of cash during growth, not a use.

This is the structural advantage that makes grocery retailing less risky from a cash flow perspective despite its thin margins. Understanding negative working capital explains why retailers like Tesco can carry substantial lease liabilities and still generate healthy FCF.

**Credit lesson:** Working capital dynamics are industry-specific and must be understood before building projections. A model that assumes "working capital is neutral" for a grocery retailer understates FCF; a model that applies the same assumption to a construction company (positive CCC of 90+ days) understates the working capital drag.

---

## 14. Iterative Reinforcement

### Week 1: Conceptual Foundation
- Read the Rolls-Royce 2023 Annual Report Cash Flow Statement (find it at rolls-royce.com/investors). Identify every line item and categorise it: Operating/Investing/Financing.
- For each line item, write one sentence explaining what it represents economically.
- Identify the IFRS 16 lease components (where are lease principal payments? Where is lease interest?).

### Week 2: Build the Waterfall
- Using the M03 spreading template, add the Cash Flow Waterfall tab.
- Build the waterfall for Rolls-Royce FY2023 using the statutory Cash Flow Statement as your source.
- Note where you have to make judgement calls (maintenance vs growth capex split). Document your assumptions.

### Week 3: Projection and Stress Testing
- Extend the waterfall two years forward using simple assumptions.
- Build a sensitivity table showing DSCR across revenue growth and margin scenarios.
- Identify the "break-even" revenue level at which DSCR falls to 1.0x.

### Week 4: Sector Comparison
- Repeat the waterfall exercise for a retailer (e.g., J Sainsbury plc, publicly available annual report).
- Compare the CCC and working capital dynamics to Rolls-Royce.
- Write a one-page comparison: which company has the more predictable FCF, and why?

### Ongoing
- Practice the DSCR stress test calculation mentally: given EBITDA, capex, tax rate, and debt service, calculate FCF and DSCR without a spreadsheet. Credit analysts are expected to do this in discussions.

---

## 15. Source Material

### Primary Sources
- **Rolls-Royce Holdings plc Annual Report 2023** — available at rolls-royce.com/investors. Focus on the Consolidated Cash Flow Statement, Note on Financing Liabilities, Note on Pensions, and CFO's financial review section discussing FCF.
- **IAS 7 — Statement of Cash Flows** — IFRS Foundation. Understanding the distinction between direct and indirect methods, and the three-way classification.
- **IFRS 15 — Revenue from Contracts with Customers** — particularly relevant for long-cycle manufacturing companies like Rolls-Royce; explains contract assets and liabilities.

### Secondary Sources
- **Corporate Treasury and Cash Management (GTM Consortium)** — practical guide to working capital management from a corporate treasury perspective
- **Credit Analysis of Financial Institutions, 2nd Edition (Euromoney)** — Chapter 8 covers corporate cash flow analysis in depth
- **Moody's Rating Methodology — Manufacturing Industry** — defines EBITDA, FCF, and DSCR as used in public credit ratings; available via moodys.com

### Regulatory
- **EBA/GL/2020/06 — Guidelines on Loan Origination and Monitoring** — Section 5.1 on assessment of borrower's financial position and debt service capacity
- **IFRS 16 — Leases (IFRS Foundation)** — essential for understanding the reclassification of lease payments from operating to financing cash flows, and the DSCR implications

### Industry Benchmarks
- **KPMG Corporate Finance: Sector DSCR Benchmarks** (published periodically)
- **S&P Global Ratings Criteria: Key Credit Factors for the Aerospace and Defense Industry**

---

*End of M04 — Cash Flow Analysis*  
*Next module: M05 — Ratio Analysis*
