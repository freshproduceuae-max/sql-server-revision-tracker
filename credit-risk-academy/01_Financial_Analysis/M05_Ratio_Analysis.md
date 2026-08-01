# M05 — Ratio Analysis

> **Academy:** Commercial & Corporate Credit Risk  
> **Track:** 01 Financial Analysis  
> **Audience:** Experienced Banking Business Analyst transitioning to Credit Risk  
> **Prerequisite:** M03 (Financial Statement Analysis), M04 (Cash Flow Analysis)  
> **Estimated Study Time:** 16–20 hours  

---

## 1. Business Purpose

### Why Ratio Analysis Exists in Credit

Credit analysis deals with complexity — no two borrowers are the same, no two sets of financial statements are presented identically, and no two industries have the same economic characteristics. Ratio analysis is the standardisation tool that allows the credit analyst to:

1. **Compare across time:** Is the borrower stronger or weaker than three years ago?
2. **Compare across entities:** Is this borrower stronger or weaker than its peer group?
3. **Monitor against covenants:** Has the borrower breached a financial maintenance covenant?
4. **Screen a portfolio:** Which borrowers in a portfolio of 200 companies require urgent review?
5. **Feed into rating models:** PD models use financial ratios as key explanatory variables

A ratio converts an absolute number (£45 million EBITDA) into a relative number (Net Debt/EBITDA of 3.2x) that is meaningful in context. Without ratios, you cannot compare a £100 million turnover SME with a £5 billion turnover conglomerate. With ratios, you can identify that both companies have similar leverage profiles.

### The Limits of Ratio Analysis

Ratios are powerful but must be interpreted, not read mechanically:

- **A ratio is a snapshot.** One year's ratios are almost meaningless. Trend analysis across three to five years reveals far more than any single observation.
- **A ratio requires context.** A current ratio of 0.8x is alarming for a manufacturer but normal for a supermarket (which relies on trade credit). Ratios without sector benchmarks mislead.
- **Ratios can be manipulated.** A company nearing a covenant breach may time asset disposals, change working capital payment timing, or restructure leases to improve year-end ratio measurements. The analyst must understand the business behind the ratios.
- **Different definitions.** "EBITDA" can be calculated in dozens of ways. "Net Debt" may or may not include lease liabilities, pension deficits, or off-balance sheet items. When using published ratios from any source, always establish the definition.

### Marks & Spencer as the Illustrative Case

Marks & Spencer Group plc (M&S) is an excellent teaching vehicle because:
- It operates in both retail (food and clothing) and financial services (M&S Bank)
- It has substantial leased property (post-IFRS 16 balance sheet is complex)
- It has undergone significant strategic transformation (clothing, online joint venture with Ocado)
- Its ratio profile reflects the structural characteristics of British retailing (negative working capital, thin margins, high lease obligations)

Throughout this module, M&S ratios illustrate how each metric works in a real company context.

---

## 2. Accounting Concepts

### Ratio Numerators and Denominators: What Lies Beneath

Every ratio depends on the correct identification of its numerator and denominator. Errors here invalidate the entire analysis. The most common definitional issues:

**EBITDA:** The most important denominator in credit ratios, yet it has no standard definition. At minimum, EBITDA = Revenue – Cost of Sales – Operating Expenses + Depreciation + Amortisation. But which adjustments are made above the EBITDA line? Share-based payments, restructuring costs, IFRS 16 adjustments — each affects the EBITDA number. Always define which EBITDA you are using.

**Net Debt:** Gross debt minus cash. But what is included in "gross debt"?
- Standard: Bank borrowings + bonds + notes
- Credit-adjusted: + lease liabilities (IFRS 16) + pension deficit (on an after-tax basis) + off-balance sheet items
- Rating agency: May also include preferred equity, hybrid instruments
The difference between a Net Debt/EBITDA of 3.0x (excluding leases) and 4.5x (including leases) is not an accounting detail — it is a fundamental difference in leverage assessment.

**Equity (for Gearing and TNW ratios):** Total equity per the balance sheet includes intangible assets funded by equity. When assessing solvency from a credit perspective, Tangible Net Worth (TNW = Equity – Goodwill – Other Intangibles) is the appropriate measure because intangibles have no realisable value in a default scenario.

### The Accounting Policies That Distort Ratios

Any accounting policy that affects asset values, liability values, or profit affects ratios. Key areas:

**Depreciation policy:** A company with an aggressive depreciation policy (short asset lives, low residual values) will have lower net asset values and higher annual depreciation charges than a conservative peer. Its EBITDA will be the same as a peer but its book equity will be lower — affecting Debt/Equity ratios. Its ROA will also be distorted by the lower asset base.

**Inventory valuation:** In an inflationary environment, FIFO-based inventory is higher than AVCO-based inventory. This affects the Current Ratio and Quick Ratio. When comparing companies across jurisdictions, check inventory valuation methods.

**Capitalisation vs expensing of costs:** A company that capitalises significant costs (software development, exploration costs, customer acquisition costs) has higher assets and lower expenses than a comparable company that expenses those costs. Their EBITDA margin will differ, as will their asset-based ratios.

---

## 3. Financial Concepts

### Category 1: Leverage Ratios

Leverage ratios measure how much debt a company carries relative to its earnings or equity. They are the most important category for credit analysis.

---

**Net Debt / EBITDA**

Formula: (Total Debt – Cash) ÷ Normalised EBITDA

What it measures: How many years of EBITDA would be required to repay all net debt. The lower the number, the lower the leverage.

Typical ranges:
- 0–1.5x: Low leverage — strong investment grade
- 1.5–3.0x: Moderate leverage — investment grade
- 3.0–4.0x: Elevated leverage — sub-investment grade / leveraged loans
- 4.0–5.5x: High leverage — leveraged buyout territory
- >5.5x: Very high leverage — often unsustainable without growth or asset sales

Sector differences:
- Utilities: 4–7x (stable, regulated cash flows support higher leverage)
- Retail: 1–3x excluding leases; 3–6x including leases
- Healthcare: 2–4x
- Cyclical manufacturing: 1–2x at the top of cycle; can spike in a downturn
- Leveraged buyouts: 5–7x at inception; target to deleverage over hold period

Credit covenant levels: Most investment-grade revolving credit facilities have a Net Debt/EBITDA covenant of 3.5–4.5x. Leveraged loan facilities often have covenant-lite structures or a springing covenant at 7–9x.

**IFRS 16 note:** Whether lease liabilities are included in the numerator, and whether EBITDA is pre- or post-IFRS 16, must always be specified. For M&S with a large leased estate, post-IFRS 16 Net Debt/EBITDA is materially higher than pre-IFRS 16.

---

**Gross Gearing (Debt / Equity)**

Formula: Total Debt ÷ Total Equity × 100% (expressed as a percentage)

What it measures: For every £1 of equity, how much debt does the company carry? A ratio of 100% means debt equals equity.

Typical ranges:
- <50%: Conservative
- 50–100%: Moderate
- 100–200%: Elevated
- >200%: High gearing

Limitations: Uses book value of equity (historical cost basis), which may significantly understate (for old assets) or overstate (post-goodwill impairment) the economic value of equity. For credit, this is less informative than Net Debt/EBITDA.

---

**Net Gearing**

Formula: (Total Debt – Cash) ÷ Total Equity × 100%

Net gearing offsets gross debt by available cash, which is more relevant for credit assessment since cash can be used to repay debt.

---

**Debt / Tangible Net Worth (Debt / TNW)**

Formula: Total Debt ÷ (Equity – Goodwill – Other Intangibles)

This is the credit analyst's preferred leverage ratio against equity because it uses TNW, which represents the realisable equity base. Companies with large goodwill and intangible balances may have positive reported equity but negative TNW — an important signal of structural weakness.

Typical covenant level: Debt ≤ 2.0x–3.0x TNW for investment-grade borrowers.

---

### Category 2: Liquidity Ratios

Liquidity ratios assess the borrower's ability to meet short-term obligations. They are most useful for stress scenarios and early warning monitoring.

---

**Current Ratio**

Formula: Current Assets ÷ Current Liabilities

What it measures: For every £1 of short-term obligations, how much is covered by short-term assets?

Typical ranges:
- >2.0x: Strong liquidity
- 1.5–2.0x: Comfortable
- 1.0–1.5x: Adequate
- <1.0x: Potentially stressed (though common and acceptable in some sectors)

Sector context: Supermarkets and retailers routinely have current ratios below 1.0 because their business model generates cash before bills are paid (negative CCC). For these companies, a current ratio below 1.0 is a structural feature, not a distress signal. For a manufacturer, a current ratio of 0.9 would be concerning.

---

**Quick Ratio (Acid Test)**

Formula: (Current Assets – Inventory) ÷ Current Liabilities

Why it matters: Inventory may not be quickly convertible to cash (especially for slow-moving goods, specialist materials, or work-in-progress). The Quick Ratio strips out inventory to show liquidity from near-cash assets only.

Typical minimum: 1.0x for most industries; 0.5–0.7x is acceptable for retailers where inventory turns quickly.

---

**Cash Ratio**

Formula: Cash and Cash Equivalents ÷ Current Liabilities

The most conservative liquidity measure: only includes immediately available cash. Rarely used as a standalone covenant metric but useful for stress analysis. A cash ratio below 0.1 means almost no liquidity buffer.

---

**Cash Runway**

Not a traditional ratio but a practical metric: Cash ÷ Monthly Operating Cash Burn. Used for stressed or pre-insolvency situations to estimate how many months of cash remain without additional funding.

---

### Category 3: Profitability Ratios

Profitability ratios assess operational efficiency and margin quality.

---

**EBITDA Margin**

Formula: EBITDA ÷ Revenue × 100%

The primary operating margin metric in credit analysis (preferred over net margin because it is pre-interest and pre-tax, making it capital structure neutral).

Sector benchmarks:
- Supermarkets / food retail: 4–8%
- General retail (clothing, homeware): 8–15%
- Manufacturing: 8–15%
- Professional services: 20–35%
- Software / technology: 25–45%
- Aerospace / defence: 10–18%
- Utilities: 30–50%

Trend matters more than level: a compressing EBITDA margin is a leading indicator of future credit deterioration.

---

**Gross Margin**

Formula: (Revenue – Cost of Sales) ÷ Revenue × 100%

Measures the pricing power and cost of production efficiency. Useful for comparing companies within the same industry. A declining gross margin indicates either pricing pressure (competitors forcing price cuts) or input cost inflation that cannot be passed on to customers.

---

**ROCE (Return on Capital Employed)**

Formula: EBIT ÷ (Total Assets – Current Liabilities) × 100%

Capital Employed = Total Assets – Current Liabilities (i.e., the long-term capital base).

ROCE measures how efficiently the company generates earnings from its capital base. A ROCE consistently below the Weighted Average Cost of Capital (WACC) means the business is destroying value — relevant for assessing whether the company is a sustainable going concern.

---

**ROE (Return on Equity)**

Formula: Net Profit (PAT) ÷ Total Equity × 100%

ROE is the return generated for shareholders. For credit analysts, ROE is less directly useful than ROCE (it is affected by financial leverage), but a very low or negative ROE sustained over multiple years indicates a business struggling to create value.

---

**ROA (Return on Assets)**

Formula: Net Profit (PAT) ÷ Total Assets × 100%

Asset efficiency measure. Capital-intensive businesses (manufacturing, property) will have lower ROA than asset-light businesses (consulting, software). ROA below 1–2% for multiple consecutive years suggests the asset base is not generating adequate returns.

---

### Category 4: Efficiency Ratios (Working Capital)

These measure how efficiently the company manages its working capital and asset base.

---

**Receivables Days (DSO — Days Sales Outstanding)**

Formula: Trade Receivables ÷ (Revenue ÷ 365)

How many days, on average, does the company take to collect cash from customers?

Typical ranges:
- B2C retail: 0–10 days (customers pay immediately)
- B2B services: 30–60 days
- Manufacturing: 40–70 days
- Construction: 60–90 days
- Public sector contracts: 60–120+ days (slow payment)

Trend: Rising DSO (customers paying more slowly) is an early warning signal. It may indicate customers in financial difficulty, or sales team accepting poorer credit quality customers to meet revenue targets.

---

**Payables Days (DPO — Days Payable Outstanding)**

Formula: Trade Payables ÷ (Cost of Sales ÷ 365)

How many days does the company take to pay its suppliers? Higher DPO = more supplier financing = better liquidity. But excessive DPO may indicate the company cannot pay on time — a distress signal rather than a strength.

---

**Inventory Days (DIO — Days Inventory Outstanding)**

Formula: Inventory ÷ (Cost of Sales ÷ 365)

How many days of inventory does the company hold? Lower is generally better (faster turnover, less capital tied up, lower obsolescence risk). Rising inventory days are a warning sign: the company may be building unsold stock, or inventory may be obsolete.

---

**Asset Turnover**

Formula: Revenue ÷ Total Assets

How efficiently does the company generate revenue from its asset base? A high asset turnover (retailers: 1.5–2.5x) with thin margins can generate adequate returns. A low asset turnover (capital-intensive industry: 0.3–0.7x) requires higher margins to justify the asset investment.

The DuPont decomposition: ROE = Net Margin × Asset Turnover × Financial Leverage. This shows that a company can improve ROE through three levers: better margins, more efficient assets, or more leverage. Credit analysts are wary of ROE improvements driven by leverage increases.

---

### Category 5: Coverage Ratios

Coverage ratios measure the ability to service financial obligations. See M04 for DSCR detail.

---

**Interest Cover (ICR)**

Formula: EBITDA ÷ Cash Interest Paid (or EBIT ÷ Interest Expense)

Typical credit covenant: 3.0–4.0x for investment grade; 2.0–2.5x for sub-investment grade. Below 2.0x is a warning signal; below 1.0x means the company cannot service interest from earnings.

---

**Fixed Charge Cover Ratio (FCCR)**

Formula: (EBITDA – Capex – Tax) ÷ (Interest + Principal + Lease Payments)

A more comprehensive coverage measure than DSCR in some definitions. "Fixed charges" include all committed financial obligations: interest, principal, tax, and lease payments. This is sometimes used in covenant documentation, particularly for leveraged buyouts.

---

**Net Worth Coverage**

Formula: Total Assets ÷ Total Debt

The crude measure of asset cover for debt. Values above 1.0 mean total assets exceed total debt (though asset values are at book, not liquidation). More useful versions use specific collateral values (e.g., Loan-to-Value for property lending).

---

### Category 6: Solvency Ratios

Solvency ratios assess whether the borrower's asset base is sufficient to cover its liabilities in a liquidation scenario.

---

**Tangible Net Worth (TNW)**

Formula: Total Equity – Goodwill – Other Intangible Assets

Not technically a ratio but a monetary value used in covenant documentation. TNW represents the realisable equity base — equity stripped of non-realisable intangibles.

TNW minimum covenant: Typically set 20–30% below the TNW at the time of facility signing, to give headroom for normal business fluctuations while protecting against significant deterioration.

**Why credit analysts use TNW instead of equity:**
- Goodwill impairment reduces equity without any cash impact but indicates real business deterioration
- Intangible assets (customer relationships, brand values) cannot be sold in a wind-down to repay creditors
- TNW is what creditors can actually recover if the business fails

---

**Debt / TNW**

Formula: Total Debt ÷ Tangible Net Worth

The primary solvency covenant for many corporate lending facilities. For a company with large intangibles (post-acquisition), this ratio can be multiples higher than Debt/Equity.

---

## 4. Statistical Concepts

### Ratio Trending and Moving Averages

A single ratio observation is weak evidence. Trend analysis across five years is the minimum for reliable credit assessment. Analytical techniques:

**Linear regression on ratio trends:** Fit a linear trend to five years of EBITDA margin data. The slope tells you: is margin expanding or contracting? By how much per year? The R-squared tells you how consistent the trend is.

```
Margin trend: if R² > 0.7 and slope < 0, this is a systematic margin compression problem
If R² < 0.3, the margin is volatile with no clear trend — cyclicality is the likely explanation
```

**Cycle adjustment:** For cyclical industries, mid-cycle normalisation is essential. If you are analysing a mining company at the top of a commodity price cycle, its current Net Debt/EBITDA may look strong (1.5x) but mid-cycle (at average commodity prices) might be 3.5x. Always calculate ratios at mid-cycle for cyclical borrowers.

### Peer Percentile Ranking

Individual ratios are most meaningful when placed in the context of peer performance. Standard approach:

1. Identify 8–12 peer companies in the same sector and broadly similar size
2. Calculate the same ratio for all peers
3. Rank the borrower: what percentile is it in the peer distribution?
4. Track whether its percentile position is improving or deteriorating

A borrower at the 30th percentile of leverage (lower leverage than 70% of peers) may be acceptable even with a high absolute leverage ratio, if all peers are highly leveraged.

### Ratio Correlation and Multivariate Analysis

Individual ratios do not exist in isolation — they are correlated. High-leverage companies tend to have thin interest cover, low current ratios, and low profitability margins. This correlation is why credit rating models use multiple ratios together rather than any single metric.

For portfolio analysis, factor analysis or principal component analysis (PCA) can identify the underlying dimensions of credit risk that multiple ratios proxy for. In practice, most banks organise their ratio analysis into the categories above (leverage, liquidity, profitability, efficiency, coverage, solvency) because those categories represent genuinely different dimensions of credit risk.

---

## 5. Regulatory Framework

### Ratio-Based Covenant Requirements

The EBA Guidelines on Loan Origination and Monitoring (EBA/GL/2020/06) do not prescribe specific ratio thresholds but require banks to:
- Define clear financial covenants based on the borrower's risk profile
- Monitor covenants at least annually (quarterly for higher-risk exposures)
- Establish early warning indicators (EWIs) based on ratio movements before formal covenant breach
- Document the covenant definition and calculation methodology unambiguously

### Covenant Definition Precision

A covenant breach triggers legal rights for the lender (acceleration, cross-default). The covenant must therefore be defined with complete precision in the facility agreement:

- Which EBITDA? Normalised? Trailing 12 months? How are acquisitions treated?
- Which debt? Including or excluding leases? Including or excluding drawn revolver?
- What is the test date? Year-end only? Quarterly?
- Is there a cure period? A cure right (equity injection to cure a breach)?
- Are there any "free and clear" baskets or builder baskets?

As a credit analyst, you must read the covenant definition in the facility agreement — not apply a generic formula. The financial model should replicate the covenant calculation exactly.

### CRD IV / CRR2: Leverage Ratios for Banks vs Borrowers

The CRR2 leverage ratio (Tier 1 capital / Total Exposure) applies to banks themselves, not to their borrowers. However, a borrower's leverage affects:
- The bank's risk-weighted assets (RWA) — higher borrower leverage means higher RWA and more capital required
- The bank's credit appetite — credit risk frameworks often include maximum Net Debt/EBITDA limits per sector or borrower type

---

## 6. Data Required

### Data Inputs for Full Ratio Suite

All ratio inputs flow from the spreading template built in M03. With a complete spread, all ratios are computed automatically. Data needed:

**From P&L (Income Statement tab):**
- Revenue (for margin ratios, DSO, asset turnover)
- Cost of Sales / COGS (for gross margin, DIO, DPO)
- EBITDA (normalised) (for leverage and coverage ratios)
- EBIT (for ROCE, interest cover alternative)
- PAT (for ROE, ROA)
- Interest expense / cash interest paid (for interest cover, DSCR)
- Tax paid (for FCCR)

**From Balance Sheet:**
- Total Assets (for ROA, current ratio, asset turnover)
- Current Assets and Current Liabilities (for current ratio, quick ratio)
- Inventory (for inventory days, quick ratio)
- Trade Receivables (for DSO)
- Trade Payables (for DPO)
- Cash (for net debt, cash ratio)
- Total Debt (for leverage ratios)
- Lease Liabilities (for leverage ratios — IFRS 16)
- Total Equity (for gearing, ROE)
- Goodwill and Intangibles (for TNW)
- Pension Deficit (for adjusted net debt)

**From Cash Flow Statement:**
- Capital Expenditure (for FCF, DSCR)
- Cash interest paid (for interest cover — cash basis)
- Principal repayments (for DSCR)

**From the Facility Agreement:**
- Covenant definitions (exact calculation methodology)
- Covenant thresholds and test dates

### Peer Data Sources

- Bloomberg Terminal: Financial data for listed comparators (BICS sector classification)
- S&P Global Market Intelligence: Ratio data for listed and private companies
- Refinitiv (LSEG Workspace): Consensus financials and ratios
- Companies House / Bureau van Dijk Orbis: UK private company data
- Industry trade associations: Sector-specific benchmarks and median ratios

---

## 7. How Analysts Actually Work

### The Ratio Analysis Workflow on the Credit Desk

**Step 1: Calculate ratios from the spread**
With a completed spreading template (M03), the ratio tab calculates automatically. The analyst reviews the calculated ratios and immediately flags any that look anomalous (very high, very low, sharp year-on-year movements). Anomalies require investigation — either there is a spreading error, an accounting change, or a real business development.

**Step 2: Apply sector context**
Compare each ratio against sector benchmarks. Identify where the borrower sits in the peer distribution. Is this company better or worse than typical for its sector? Is the gap widening or narrowing?

**Step 3: Trend analysis**
Chart the 5-year trend for the primary ratios: Net Debt/EBITDA, EBITDA margin, interest cover, current ratio. The chart tells the story of the company's credit trajectory in a way that tables cannot.

**Step 4: Covenant testing**
Re-calculate each ratio using the covenant definition from the facility agreement. This is often different from the analytical ratio. Compare against the covenant threshold. Calculate headroom (how far is the ratio from breach?). Calculate the implied revenue/EBITDA level at which the covenant would breach.

**Step 5: Identify the top 3–5 ratios that matter for this borrower**
Not all ratios are equally relevant for every borrower. For a capital-light professional services firm, leverage and interest cover dominate. For a retailer, working capital ratios and the current ratio matter most. For a construction company, net worth and work-in-progress valuation are critical. Identify which ratios are the key credit drivers and lead with those in the credit paper.

**Step 6: Write the ratio narrative**
Ratios do not speak for themselves in a credit paper. The analyst must explain: what does this ratio tell us, why has it moved, is this a concern, and what does it imply for the credit decision? A credit paper that simply lists ratios without explanation is analytically useless.

### Practical Ratio Interpretation: Marks & Spencer

For M&S, the key ratios to monitor:
- **Net Debt/EBITDA (post-IFRS 16):** High due to large leased store estate; must compare pre- and post-IFRS 16 to understand the trend
- **EBITDA Margin:** Has improved through clothing transformation and food growth; trend is the key question
- **Current Ratio:** Typically below 1.0 (retail characteristic — negative CCC); not concerning but must be stable
- **DSO:** Very low (near-zero for food; low for clothing); rising DSO would be anomalous and concerning
- **DPO:** Trend important — squeeze on suppliers increases DPO (good for M&S liquidity) but may strain supplier relationships
- **TNW:** Affected by the Ocado joint venture accounting and lease liabilities; important for covenant analysis
- **Interest Cover:** EBITDA must cover interest on all borrowings including lease interest

---

## 8. Excel Implementation

### Ratio Dashboard: 5-Year Trend, RAG Status, Peer Comparison

```excel
=== TAB: RATIOS ===
[Links to P&L, Balance Sheet, Cash Flow tabs from M03]
Columns: B=FY2019, C=FY2020, D=FY2021, E=FY2022, F=FY2023

=== SECTION 1: LEVERAGE ===
Row 5:  EBITDA (Normalised)            [link to P&L!A33]
Row 6:  Cash                           [link to BS!A18]
Row 7:  Total Debt (incl. leases)      [link to BS!A50]
Row 8:  Net Debt (incl. leases)        [=B7-B6]
Row 9:  Net Debt (excl. leases)        [link to BS!A54]
Row 10: Total Equity                   [link to BS!A42]
Row 11: Tangible Net Worth             [link to BS!A55]

Row 13: NET DEBT / EBITDA (post-IFRS 16)  [=B8/B5]
Row 14: NET DEBT / EBITDA (pre-IFRS 16)   [=BS!A54/P&L!A39]  [using pre-IFRS 16 EBITDA]
Row 15: GROSS GEARING (Debt/Equity %)      [=B7/B10*100]
Row 16: NET GEARING (Net Debt/Equity %)    [=B8/B10*100]
Row 17: DEBT / TNW                         [=B7/B11]

=== SECTION 2: LIQUIDITY ===
Row 20: Current Assets                 [link to BS!A19]
Row 21: Current Liabilities            [link to BS!A28]
Row 22: Inventory                      [link to BS!A15]
Row 23: Cash                           [link to BS!A18]

Row 25: CURRENT RATIO                  [=B20/B21]
Row 26: QUICK RATIO                    [=(B20-B22)/B21]
Row 27: CASH RATIO                     [=B23/B21]

=== SECTION 3: PROFITABILITY ===
Row 30: Revenue                        [link to P&L!A5]
Row 31: Gross Profit                   [link to P&L!A7]
Row 32: EBITDA Normalised              [link to P&L!A33]
Row 33: EBIT                           [link to P&L!A14]
Row 34: PAT                            [link to P&L!A22]
Row 35: Total Assets                   [link to BS!A21]
Row 36: Capital Employed               [=B35-B21]

Row 38: GROSS MARGIN %                 [=B31/B30*100]
Row 39: EBITDA MARGIN % (Normalised)   [=B32/B30*100]
Row 40: EBIT MARGIN %                  [=B33/B30*100]
Row 41: NET PROFIT MARGIN %            [=B34/B30*100]
Row 42: ROCE %                         [=B33/B36*100]
Row 43: ROE %                          [=B34/B10*100]
Row 44: ROA %                          [=B34/B35*100]

=== SECTION 4: EFFICIENCY ===
Row 47: Trade Receivables              [link to BS!A16]
Row 48: Inventory                      [link to BS!A15]
Row 49: Trade Payables                 [link to BS!A24]
Row 50: Cost of Sales                  [link to P&L!A6]

Row 52: DSO (days)                     [=B47/(B30/365)]
Row 53: DIO (days)                     [=B48/(B50/365)]
Row 54: DPO (days)                     [=B49/(B50/365)]
Row 55: CASH CONVERSION CYCLE          [=B52+B53-B54]
Row 56: ASSET TURNOVER                 [=B30/B35]

=== SECTION 5: COVERAGE ===
Row 59: EBITDA Normalised              [=B32]
Row 60: Interest Expense (P&L)         [link to P&L!A15]
Row 61: Cash Interest Paid             [link to CF!A19]
Row 62: Free Cash Flow                 [link to CF!A28]
Row 63: Total Debt Service             [link to CF!A50]

Row 65: INTEREST COVER (EBITDA/P&L Interest)  [=B59/B60]
Row 66: INTEREST COVER (EBITDA/Cash Interest)  [=B59/B61]
Row 67: DSCR                                   [=B62/B63]

=== SECTION 6: COVENANT TRACKING ===
Row 70: NET DEBT/EBITDA — Actual        [=B13]
Row 71: NET DEBT/EBITDA — Covenant      [hard-code, e.g. 4.50]
Row 72: NET DEBT/EBITDA — Headroom      [=B71-B70]
Row 73: BREACH STATUS                   [=IF(B70>B71,"BREACH","PASS")]
        [Format: Red if BREACH, Green if PASS]

Row 76: INTEREST COVER — Actual        [=B65]
Row 77: INTEREST COVER — Covenant      [hard-code, e.g. 3.00]
Row 78: IC Headroom                    [=B76-B77]
Row 79: IC BREACH STATUS               [=IF(B76<B77,"BREACH","PASS")]

Row 82: TNW — Actual (£m)              [=B11]
Row 83: TNW — Covenant minimum (£m)    [hard-code]
Row 84: TNW Headroom (£m)              [=B82-B83]
Row 85: TNW BREACH STATUS              [=IF(B82<B83,"BREACH","PASS")]

=== SECTION 7: RAG SCORING ===
[Traffic light system: each ratio scores 1 (Green), 2 (Amber), or 3 (Red)
 based on distance from sector benchmarks and year-on-year trend]

Row 88: Net Debt/EBITDA Score     [=IF(B13<2.5,1,IF(B13<4.0,2,3))]
Row 89: EBITDA Margin Score       [=IF(B39>10,1,IF(B39>6,2,3))]  [M&S specific]
Row 90: Interest Cover Score      [=IF(B65>4,1,IF(B65>2,2,3))]
Row 91: Current Ratio Score       [=IF(B25>1.2,1,IF(B25>0.8,2,3))]
Row 92: DSO Trend Score           [=IF(B52<C52,1,IF(B52<=C52*1.1,2,3))]
Row 93: OVERALL RAG               [=IF(MAX(B88:B92)=3,"RED",IF(AVERAGE(B88:B92)>2,"AMBER","GREEN"))]

=== SECTION 8: PEER COMPARISON ===
[Separate mini-table: Company vs Peer Median vs Peer Q3 (worst quartile)]
Peers:         M&S    Next    JD Sports  Primark  Peer Median
Net Debt/EBITDA: [value] [value] [value]  [value]  [MEDIAN formula]
EBITDA Margin:   [value] ...
Current Ratio:   [value] ...
DSO:             [value] ...
[Use PERCENTRANK function to show where M&S sits in peer distribution]
```

### Chart Specifications

Build five embedded charts in the Ratios tab:

1. **Line chart:** Net Debt/EBITDA (5-year trend) with covenant level as a horizontal dashed reference line
2. **Bar chart:** EBITDA Margin % (5-year trend) with peer median overlay
3. **Stacked bar chart:** Revenue, Gross Profit, EBITDA waterfall (5-year)
4. **Line chart:** Current Ratio and Quick Ratio (5-year trend)
5. **Radar chart:** Borrower vs Peer Median across 6 ratio categories (leverage, liquidity, profitability, efficiency, coverage, solvency)

---

## 9. SQL Implementation

```sql
-- Ratio calculation view: computes full ratio suite from spread tables
CREATE OR ALTER VIEW vw_credit_ratios AS
WITH ratio_base AS (
    SELECT
        c.company_id,
        c.company_name,
        c.sector,
        fp.period_id,
        fp.period_end,
        -- P&L
        is_.revenue,
        is_.cost_of_sales,
        is_.gross_profit,
        is_.ebitda_normalised,
        is_.ebit,
        is_.pat,
        is_.interest_expense,
        is_.dividends,
        -- Balance sheet
        bs.inventory,
        bs.trade_receivables,
        bs.cash,
        bs.trade_payables,
        bs.total_current_assets,
        bs.total_current_liabilities,
        bs.total_assets,
        bs.total_equity,
        bs.goodwill,
        bs.other_intangibles,
        bs.total_debt_incl_leases,
        bs.total_debt_excl_leases,
        bs.net_debt_incl_leases,
        bs.net_debt_excl_leases,
        bs.tangible_net_worth,
        -- Cash flow
        cfw.free_cash_flow,
        cfw.cash_interest_paid,
        cfw.total_debt_service,
        cfw.dso_days AS dso_reported,
        cfw.dio_days AS dio_reported,
        cfw.dpo_days AS dpo_reported
    FROM companies c
    JOIN financial_periods fp ON c.company_id = fp.company_id
    JOIN income_statement is_ ON fp.period_id = is_.period_id
    JOIN balance_sheet bs ON fp.period_id = bs.period_id
    LEFT JOIN cash_flow_waterfall cfw ON fp.period_id = cfw.period_id
)
SELECT
    company_id,
    company_name,
    sector,
    period_end,

    -- ─── LEVERAGE ───
    ROUND(net_debt_incl_leases / NULLIF(ebitda_normalised, 0), 2)   AS net_debt_ebitda_post_ifrs16,
    ROUND(net_debt_excl_leases / NULLIF(ebitda_normalised, 0), 2)   AS net_debt_ebitda_pre_ifrs16,
    ROUND(total_debt_incl_leases / NULLIF(total_equity, 0) * 100, 1) AS gross_gearing_pct,
    ROUND(net_debt_incl_leases / NULLIF(total_equity, 0) * 100, 1)  AS net_gearing_pct,
    ROUND(total_debt_incl_leases / NULLIF(tangible_net_worth, 0), 2) AS debt_tnw,
    tangible_net_worth,

    -- ─── LIQUIDITY ───
    ROUND(total_current_assets / NULLIF(total_current_liabilities, 0), 2) AS current_ratio,
    ROUND((total_current_assets - inventory) / NULLIF(total_current_liabilities, 0), 2) AS quick_ratio,
    ROUND(cash / NULLIF(total_current_liabilities, 0), 2)            AS cash_ratio,

    -- ─── PROFITABILITY ───
    ROUND(gross_profit / NULLIF(revenue, 0) * 100, 1)               AS gross_margin_pct,
    ROUND(ebitda_normalised / NULLIF(revenue, 0) * 100, 1)          AS ebitda_margin_pct,
    ROUND(ebit / NULLIF(revenue, 0) * 100, 1)                       AS ebit_margin_pct,
    ROUND(pat / NULLIF(revenue, 0) * 100, 1)                        AS net_margin_pct,
    ROUND(ebit / NULLIF(total_assets - total_current_liabilities, 0) * 100, 1) AS roce_pct,
    ROUND(pat / NULLIF(total_equity, 0) * 100, 1)                   AS roe_pct,
    ROUND(pat / NULLIF(total_assets, 0) * 100, 1)                   AS roa_pct,

    -- ─── EFFICIENCY ───
    ROUND(trade_receivables / NULLIF(revenue / 365, 0), 1)          AS dso_days,
    ROUND(inventory / NULLIF(cost_of_sales / 365, 0), 1)            AS dio_days,
    ROUND(trade_payables / NULLIF(cost_of_sales / 365, 0), 1)       AS dpo_days,
    ROUND(
        trade_receivables / NULLIF(revenue / 365, 0)
        + inventory / NULLIF(cost_of_sales / 365, 0)
        - trade_payables / NULLIF(cost_of_sales / 365, 0)
    , 1)                                                              AS cash_conversion_cycle,
    ROUND(revenue / NULLIF(total_assets, 0), 2)                     AS asset_turnover,

    -- ─── COVERAGE ───
    ROUND(ebitda_normalised / NULLIF(interest_expense, 0), 2)       AS interest_cover_ebitda,
    ROUND(ebitda_normalised / NULLIF(cash_interest_paid, 0), 2)     AS interest_cover_cash,
    ROUND(free_cash_flow / NULLIF(total_debt_service, 0), 2)        AS dscr

FROM ratio_base;

-- Portfolio screening: flag any ratio in breach of typical thresholds
SELECT
    company_name,
    sector,
    period_end,
    net_debt_ebitda_post_ifrs16,
    ebitda_margin_pct,
    interest_cover_cash,
    current_ratio,
    dscr,
    -- RAG flag
    CASE
        WHEN net_debt_ebitda_post_ifrs16 > 5.0 THEN 'LEVERAGED-HIGH'
        WHEN net_debt_ebitda_post_ifrs16 > 3.5 THEN 'LEVERAGED-MOD'
        ELSE 'OK'
    END AS leverage_rag,
    CASE
        WHEN interest_cover_cash < 2.0 THEN 'IC-LOW'
        WHEN interest_cover_cash < 3.0 THEN 'IC-MARGINAL'
        ELSE 'IC-OK'
    END AS ic_rag,
    CASE
        WHEN dscr < 1.0 THEN 'DSCR-BREACH'
        WHEN dscr < 1.25 THEN 'DSCR-MARGINAL'
        ELSE 'DSCR-OK'
    END AS dscr_rag
FROM vw_credit_ratios
WHERE period_end >= DATEADD(YEAR, -1, GETDATE())
ORDER BY net_debt_ebitda_post_ifrs16 DESC;

-- Trend analysis: year-on-year ratio movements for a single borrower
SELECT
    company_name,
    period_end,
    net_debt_ebitda_post_ifrs16,
    ebitda_margin_pct,
    dso_days,
    current_ratio,
    dscr,
    -- Year-on-year changes
    net_debt_ebitda_post_ifrs16 - LAG(net_debt_ebitda_post_ifrs16) OVER (PARTITION BY company_id ORDER BY period_end) AS nd_ebitda_change,
    ebitda_margin_pct - LAG(ebitda_margin_pct) OVER (PARTITION BY company_id ORDER BY period_end) AS margin_change_bps,
    dso_days - LAG(dso_days) OVER (PARTITION BY company_id ORDER BY period_end) AS dso_change_days
FROM vw_credit_ratios
WHERE company_name = 'Marks & Spencer Group plc'
ORDER BY period_end;

-- Peer benchmarking: sector percentile ranking
WITH sector_ratios AS (
    SELECT
        company_name,
        sector,
        period_end,
        net_debt_ebitda_post_ifrs16,
        ebitda_margin_pct,
        current_ratio,
        dso_days,
        ROW_NUMBER() OVER (PARTITION BY company_id ORDER BY period_end DESC) AS rn
    FROM vw_credit_ratios
),
latest_ratios AS (
    SELECT * FROM sector_ratios WHERE rn = 1
)
SELECT
    company_name,
    sector,
    net_debt_ebitda_post_ifrs16,
    PERCENT_RANK() OVER (PARTITION BY sector ORDER BY net_debt_ebitda_post_ifrs16 DESC) AS leverage_percentile,
    ebitda_margin_pct,
    PERCENT_RANK() OVER (PARTITION BY sector ORDER BY ebitda_margin_pct ASC) AS margin_percentile,
    COUNT(*) OVER (PARTITION BY sector) AS peers_in_sector
FROM latest_ratios
WHERE sector = 'General Retail'
ORDER BY net_debt_ebitda_post_ifrs16;
```

---

## 10. Python Implementation

### Automated Ratio Calculator, Chart Generator, and Peer Percentile Ranking

```python
"""
M05 — Ratio Analysis: Automated Calculator, Visualisation, and Peer Benchmarking
Case study: Marks & Spencer Group plc (illustrative data)
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.gridspec import GridSpec
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple
import warnings

warnings.filterwarnings("ignore")


# ─────────────────────────────────────────────
# RATIO CALCULATOR
# ─────────────────────────────────────────────

class RatioCalculator:
    """
    Calculates the complete suite of credit ratios from spread financial data.
    Input: pandas DataFrames for income statement, balance sheet, and cash flows.
    """

    def __init__(self, company_name: str, sector: str, currency: str = "GBP"):
        self.company_name = company_name
        self.sector = sector
        self.currency = currency

    def calculate(self, is_df: pd.DataFrame, bs_df: pd.DataFrame,
                  cf_df: pd.DataFrame) -> pd.DataFrame:
        """
        Calculate all ratios. Input DataFrames must have 'period' as index
        and financial line items as columns (in £millions).
        Returns a DataFrame with all ratios, indexed by period.
        """
        r = pd.DataFrame(index=is_df.index)

        # ─── LEVERAGE ───
        r["Net Debt (incl leases) £m"] = bs_df["total_debt_incl_leases"] - bs_df["cash"]
        r["Net Debt (excl leases) £m"] = bs_df["total_debt_excl_leases"] - bs_df["cash"]
        r["Net Debt/EBITDA (post-IFRS16)"] = (r["Net Debt (incl leases) £m"]
                                               / is_df["ebitda_normalised"]).round(2)
        r["Net Debt/EBITDA (pre-IFRS16)"] = (r["Net Debt (excl leases) £m"]
                                              / is_df["ebitda_pre_ifrs16"]).round(2)
        r["Gross Gearing %"] = (bs_df["total_debt_incl_leases"]
                                / bs_df["total_equity"] * 100).round(1)
        r["Net Gearing %"] = (r["Net Debt (incl leases) £m"]
                              / bs_df["total_equity"] * 100).round(1)
        r["Tangible Net Worth £m"] = (bs_df["total_equity"]
                                      - bs_df["goodwill"]
                                      - bs_df["other_intangibles"]).round(1)
        r["Debt / TNW"] = (bs_df["total_debt_incl_leases"]
                           / r["Tangible Net Worth £m"].replace(0, np.nan)).round(2)

        # ─── LIQUIDITY ───
        r["Current Ratio"] = (bs_df["total_current_assets"]
                              / bs_df["total_current_liabilities"]).round(2)
        r["Quick Ratio"] = ((bs_df["total_current_assets"] - bs_df["inventory"])
                            / bs_df["total_current_liabilities"]).round(2)
        r["Cash Ratio"] = (bs_df["cash"]
                           / bs_df["total_current_liabilities"]).round(2)

        # ─── PROFITABILITY ───
        r["Gross Margin %"] = (is_df["gross_profit"] / is_df["revenue"] * 100).round(1)
        r["EBITDA Margin % (Norm)"] = (is_df["ebitda_normalised"] / is_df["revenue"] * 100).round(1)
        r["EBIT Margin %"] = (is_df["ebit"] / is_df["revenue"] * 100).round(1)
        r["Net Margin %"] = (is_df["pat"] / is_df["revenue"] * 100).round(1)
        capital_employed = bs_df["total_assets"] - bs_df["total_current_liabilities"]
        r["ROCE %"] = (is_df["ebit"] / capital_employed * 100).round(1)
        r["ROE %"] = (is_df["pat"] / bs_df["total_equity"] * 100).round(1)
        r["ROA %"] = (is_df["pat"] / bs_df["total_assets"] * 100).round(1)

        # ─── EFFICIENCY ───
        r["DSO (days)"] = (bs_df["trade_receivables"] / (is_df["revenue"] / 365)).round(1)
        r["DIO (days)"] = (bs_df["inventory"] / (is_df["cost_of_sales"] / 365)).round(1)
        r["DPO (days)"] = (bs_df["trade_payables"] / (is_df["cost_of_sales"] / 365)).round(1)
        r["Cash Conversion Cycle"] = (r["DSO (days)"] + r["DIO (days)"] - r["DPO (days)"]).round(1)
        r["Asset Turnover"] = (is_df["revenue"] / bs_df["total_assets"]).round(2)

        # ─── COVERAGE ───
        r["Interest Cover (EBITDA/Int)"] = (is_df["ebitda_normalised"]
                                             / is_df["interest_expense"].replace(0, np.nan)).round(2)
        r["Interest Cover (Cash)"] = (is_df["ebitda_normalised"]
                                      / cf_df["cash_interest_paid"].replace(0, np.nan)).round(2)
        r["DSCR"] = (cf_df["free_cash_flow"]
                     / cf_df["total_debt_service"].replace(0, np.nan)).round(2)

        return r

    def rag_score(self, ratios: pd.DataFrame,
                  sector_thresholds: Optional[Dict] = None) -> pd.DataFrame:
        """
        Apply RAG (Red/Amber/Green) scoring to each ratio for the latest period.
        sector_thresholds: override default thresholds for specific sectors.
        """
        defaults = {
            "Net Debt/EBITDA (post-IFRS16)": {"green": 2.5, "amber": 4.0},
            "EBITDA Margin % (Norm)": {"green": 10.0, "amber": 6.0},  # above green = green
            "Interest Cover (Cash)": {"green": 4.0, "amber": 2.0},
            "Current Ratio": {"green": 1.2, "amber": 0.8},
            "DSCR": {"green": 1.5, "amber": 1.1},
        }
        thresholds = {**defaults, **(sector_thresholds or {})}

        latest = ratios.iloc[-1]
        scores = {}
        for ratio, t in thresholds.items():
            if ratio not in latest.index:
                continue
            val = latest[ratio]
            if pd.isna(val):
                scores[ratio] = "N/A"
                continue
            # For ratios where higher is better (margin, cover, DSCR)
            if ratio in ["EBITDA Margin % (Norm)", "Interest Cover (Cash)", "DSCR",
                         "Interest Cover (EBITDA/Int)", "Current Ratio", "Quick Ratio"]:
                if val >= t["green"]:
                    scores[ratio] = "GREEN"
                elif val >= t["amber"]:
                    scores[ratio] = "AMBER"
                else:
                    scores[ratio] = "RED"
            else:  # For ratios where lower is better (leverage)
                if val <= t["green"]:
                    scores[ratio] = "GREEN"
                elif val <= t["amber"]:
                    scores[ratio] = "AMBER"
                else:
                    scores[ratio] = "RED"

        return pd.Series(scores, name="RAG Status")


# ─────────────────────────────────────────────
# PEER BENCHMARKING
# ─────────────────────────────────────────────

class PeerBenchmark:
    """Computes peer percentile rankings for key ratios."""

    def __init__(self, peers: Dict[str, pd.Series]):
        """
        peers: dict of {company_name: Series of latest ratios}
        """
        self.peers = peers

    def percentile_rank(self, target_company: str,
                        metrics: List[str],
                        higher_is_better: Dict[str, bool]) -> pd.DataFrame:
        """
        Rank target company against peers on selected metrics.
        higher_is_better: True if higher ratio = better credit (e.g. margin, cover)
                          False if lower ratio = better credit (e.g. leverage)
        """
        peer_data = pd.DataFrame(self.peers).T
        results = []

        for metric in metrics:
            if metric not in peer_data.columns:
                continue
            vals = peer_data[metric].dropna()
            target_val = self.peers.get(target_company, {}).get(metric, np.nan)
            if pd.isna(target_val):
                continue

            if higher_is_better.get(metric, True):
                # Percentile = what fraction of peers the target is BETTER than
                pct = (vals < target_val).mean() * 100
            else:
                # Lower is better: target is better than peers with HIGHER values
                pct = (vals > target_val).mean() * 100

            results.append({
                "Metric": metric,
                "Target Value": target_val,
                "Peer Median": round(vals.median(), 2),
                "Peer Min": round(vals.min(), 2),
                "Peer Max": round(vals.max(), 2),
                "Percentile Rank": round(pct, 0),
                "Interpretation": "Top quartile" if pct >= 75 else (
                    "Above median" if pct >= 50 else (
                    "Below median" if pct >= 25 else "Bottom quartile"))
            })

        return pd.DataFrame(results)


# ─────────────────────────────────────────────
# VISUALISATION
# ─────────────────────────────────────────────

def plot_ratio_dashboard(company_name: str, ratios: pd.DataFrame,
                         rag_scores: pd.Series,
                         peer_benchmark: Optional[pd.DataFrame] = None):
    """
    Generate a 3x2 ratio dashboard with trend charts and RAG status.
    """
    fig = plt.figure(figsize=(18, 12))
    fig.suptitle(f"Credit Ratio Dashboard — {company_name}", fontsize=14, fontweight="bold", y=0.98)
    gs = GridSpec(3, 3, figure=fig, hspace=0.45, wspace=0.35)

    color_map = {"GREEN": "#27ae60", "AMBER": "#f39c12", "RED": "#e74c3c", "N/A": "#95a5a6"}

    def _add_rag_badge(ax, ratio_name, scores):
        color = color_map.get(scores.get(ratio_name, "N/A"), "#95a5a6")
        ax.set_facecolor("#f8f9fa")
        bbox = dict(boxstyle="round,pad=0.3", facecolor=color, alpha=0.8)
        rag_text = scores.get(ratio_name, "N/A")
        ax.text(0.98, 0.95, rag_text, transform=ax.transAxes,
                fontsize=8, va="top", ha="right", bbox=bbox, color="white", fontweight="bold")

    periods = ratios.index.tolist()
    rag_dict = rag_scores.to_dict() if not rag_scores.empty else {}

    # Chart 1: Net Debt/EBITDA trend
    ax1 = fig.add_subplot(gs[0, 0])
    if "Net Debt/EBITDA (post-IFRS16)" in ratios.columns:
        vals = ratios["Net Debt/EBITDA (post-IFRS16)"]
        ax1.plot(periods, vals, "o-", color="#2980b9", linewidth=2, markersize=5)
        ax1.axhline(y=3.5, color="red", linestyle="--", linewidth=1, alpha=0.7, label="Typical covenant (3.5x)")
        ax1.set_title("Net Debt / EBITDA", fontweight="bold", fontsize=10)
        ax1.set_ylabel("x")
        ax1.legend(fontsize=7)
        _add_rag_badge(ax1, "Net Debt/EBITDA (post-IFRS16)", rag_dict)
    ax1.tick_params(axis="x", rotation=45, labelsize=8)

    # Chart 2: EBITDA Margin trend
    ax2 = fig.add_subplot(gs[0, 1])
    if "EBITDA Margin % (Norm)" in ratios.columns:
        vals = ratios["EBITDA Margin % (Norm)"]
        ax2.bar(periods, vals, color="#27ae60", alpha=0.7)
        ax2.set_title("EBITDA Margin % (Normalised)", fontweight="bold", fontsize=10)
        ax2.set_ylabel("%")
        _add_rag_badge(ax2, "EBITDA Margin % (Norm)", rag_dict)
    ax2.tick_params(axis="x", rotation=45, labelsize=8)

    # Chart 3: Interest Cover
    ax3 = fig.add_subplot(gs[0, 2])
    if "Interest Cover (Cash)" in ratios.columns:
        vals = ratios["Interest Cover (Cash)"]
        ax3.plot(periods, vals, "s-", color="#8e44ad", linewidth=2, markersize=5)
        ax3.axhline(y=3.0, color="red", linestyle="--", linewidth=1, alpha=0.7, label="Typical covenant (3.0x)")
        ax3.set_title("Interest Cover (Cash Basis)", fontweight="bold", fontsize=10)
        ax3.set_ylabel("x")
        ax3.legend(fontsize=7)
        _add_rag_badge(ax3, "Interest Cover (Cash)", rag_dict)
    ax3.tick_params(axis="x", rotation=45, labelsize=8)

    # Chart 4: Liquidity (Current and Quick Ratio)
    ax4 = fig.add_subplot(gs[1, 0])
    if "Current Ratio" in ratios.columns and "Quick Ratio" in ratios.columns:
        ax4.plot(periods, ratios["Current Ratio"], "o-", color="#2980b9", linewidth=2, label="Current Ratio")
        ax4.plot(periods, ratios["Quick Ratio"], "s--", color="#e67e22", linewidth=2, label="Quick Ratio")
        ax4.axhline(y=1.0, color="red", linestyle=":", linewidth=1, alpha=0.5)
        ax4.set_title("Liquidity Ratios", fontweight="bold", fontsize=10)
        ax4.legend(fontsize=7)
    ax4.tick_params(axis="x", rotation=45, labelsize=8)

    # Chart 5: Working capital days (DSO, DIO, DPO, CCC)
    ax5 = fig.add_subplot(gs[1, 1])
    wc_cols = ["DSO (days)", "DIO (days)", "DPO (days)", "Cash Conversion Cycle"]
    wc_avail = [c for c in wc_cols if c in ratios.columns]
    colors5 = ["#3498db", "#2ecc71", "#e74c3c", "#9b59b6"]
    for i, col in enumerate(wc_avail):
        ax5.plot(periods, ratios[col], "o-", color=colors5[i], linewidth=2, label=col, markersize=4)
    ax5.axhline(y=0, color="black", linewidth=0.5)
    ax5.set_title("Working Capital Days", fontweight="bold", fontsize=10)
    ax5.set_ylabel("Days")
    ax5.legend(fontsize=6)
    ax5.tick_params(axis="x", rotation=45, labelsize=8)

    # Chart 6: Peer percentile (radar substitute — horizontal bar)
    ax6 = fig.add_subplot(gs[1, 2])
    if peer_benchmark is not None and not peer_benchmark.empty:
        metrics_short = [m[:20] + "..." if len(m) > 20 else m for m in peer_benchmark["Metric"]]
        percentiles = peer_benchmark["Percentile Rank"].tolist()
        bar_colors = ["#27ae60" if p >= 50 else "#e74c3c" for p in percentiles]
        bars = ax6.barh(metrics_short, percentiles, color=bar_colors, alpha=0.75)
        ax6.axvline(x=50, color="black", linestyle="--", linewidth=1)
        ax6.set_xlim(0, 100)
        ax6.set_xlabel("Percentile Rank (vs Peers)")
        ax6.set_title("Peer Benchmarking", fontweight="bold", fontsize=10)
        ax6.tick_params(axis="y", labelsize=7)

    # Chart 7: DSCR trend
    ax7 = fig.add_subplot(gs[2, 0])
    if "DSCR" in ratios.columns:
        vals = ratios["DSCR"]
        bar_colors7 = ["#27ae60" if v >= 1.25 else ("#f39c12" if v >= 1.0 else "#e74c3c")
                       for v in vals]
        ax7.bar(periods, vals, color=bar_colors7, alpha=0.8)
        ax7.axhline(y=1.25, color="red", linestyle="--", linewidth=1, label="Covenant 1.25x")
        ax7.axhline(y=1.0, color="darkred", linestyle="-", linewidth=1, label="Break-even 1.0x")
        ax7.set_title("DSCR", fontweight="bold", fontsize=10)
        ax7.set_ylabel("x")
        ax7.legend(fontsize=7)
    ax7.tick_params(axis="x", rotation=45, labelsize=8)

    # Chart 8: ROE and ROCE
    ax8 = fig.add_subplot(gs[2, 1])
    if "ROE %" in ratios.columns and "ROCE %" in ratios.columns:
        ax8.plot(periods, ratios["ROCE %"], "o-", color="#2980b9", linewidth=2, label="ROCE %")
        ax8.plot(periods, ratios["ROE %"], "s--", color="#e67e22", linewidth=2, label="ROE %")
        ax8.axhline(y=0, color="black", linewidth=0.5)
        ax8.set_title("Returns", fontweight="bold", fontsize=10)
        ax8.set_ylabel("%")
        ax8.legend(fontsize=8)
    ax8.tick_params(axis="x", rotation=45, labelsize=8)

    # Chart 9: Summary RAG table
    ax9 = fig.add_subplot(gs[2, 2])
    ax9.axis("off")
    if rag_dict:
        rag_items = [(k, v) for k, v in rag_dict.items()]
        y_start = 0.95
        ax9.set_title("Latest Period RAG Summary", fontweight="bold", fontsize=10, pad=10)
        for key, rag in rag_items:
            color = color_map.get(rag, "#95a5a6")
            ax9.text(0.05, y_start, f"  {key[:28]}", transform=ax9.transAxes,
                     fontsize=7, va="top")
            ax9.add_patch(mpatches.FancyBboxPatch((0.75, y_start - 0.04), 0.2, 0.07,
                boxstyle="round,pad=0.01", facecolor=color, transform=ax9.transAxes, alpha=0.9))
            ax9.text(0.855, y_start - 0.005, rag, transform=ax9.transAxes,
                     fontsize=7, va="top", ha="center", color="white", fontweight="bold")
            y_start -= 0.14

    plt.savefig(f"/tmp/ratio_dashboard_{company_name.replace(' ', '_')}.png",
                dpi=150, bbox_inches="tight", facecolor="white")
    print(f"Dashboard saved: /tmp/ratio_dashboard_{company_name.replace(' ', '_')}.png")
    return fig


# ─────────────────────────────────────────────
# M&S ILLUSTRATIVE DATA AND RUN
# ─────────────────────────────────────────────

def build_ms_data():
    """Illustrative Marks & Spencer financial data for ratio analysis."""
    periods = ["FY2019", "FY2020", "FY2021", "FY2022", "FY2023"]

    is_data = pd.DataFrame({
        "revenue":           [10_377, 9_979, 9_015, 11_021, 12_965],
        "cost_of_sales":     [6_389,  6_293, 5_632, 6_864,  8_003],
        "gross_profit":      [3_988,  3_686, 3_383, 4_157,  4_962],
        "ebitda_normalised": [947,    713,   717,   1_098,  1_388],
        "ebitda_pre_ifrs16": [564,    412,   430,   718,    982],
        "ebit":              [519,    278,   259,   580,    756],
        "interest_expense":  [182,    280,   297,   294,    313],
        "pat":               [84,     -201,  -79,   309,    482],
    }, index=periods)

    bs_data = pd.DataFrame({
        "total_current_assets":       [1_424, 1_285, 1_440, 1_640, 1_921],
        "total_current_liabilities":  [2_274, 2_089, 2_053, 2_530, 2_763],
        "inventory":                  [583,   502,   498,   570,   663],
        "trade_receivables":          [228,   188,   219,   253,   301],
        "cash":                       [297,   338,   481,   524,   602],
        "trade_payables":             [897,   829,   884,   1_082, 1_237],
        "total_assets":               [8_654, 8_701, 8_739, 10_203, 11_015],
        "total_equity":               [2_013, 1_679, 1_600, 1_975, 2_448],
        "goodwill":                   [198,   194,   194,   194,   194],
        "other_intangibles":          [387,   368,   356,   371,   424],
        "total_debt_incl_leases":     [3_918, 4_226, 4_134, 4_481, 4_216],
        "total_debt_excl_leases":     [2_070, 2_384, 2_152, 2_195, 1_853],
    }, index=periods)

    cf_data = pd.DataFrame({
        "free_cash_flow":      [420, 162, 345, 685, 892],
        "cash_interest_paid":  [168, 262, 270, 281, 298],
        "total_debt_service":  [348, 412, 390, 451, 478],
    }, index=periods)

    return is_data, bs_data, cf_data, periods


def run_ms_analysis():
    is_df, bs_df, cf_df, periods = build_ms_data()

    calc = RatioCalculator("Marks & Spencer Group plc", "General Retail", "GBP")
    ratios = calc.calculate(is_df, bs_df, cf_df)

    print(f"\n{'='*80}")
    print("RATIO ANALYSIS — Marks & Spencer Group plc (Illustrative Data)")
    print(f"{'='*80}")

    # Display key ratios
    key_ratios = [
        "Net Debt/EBITDA (post-IFRS16)", "Net Debt/EBITDA (pre-IFRS16)",
        "Gross Gearing %", "Tangible Net Worth £m",
        "Current Ratio", "Quick Ratio",
        "EBITDA Margin % (Norm)", "ROCE %", "ROE %",
        "DSO (days)", "DIO (days)", "DPO (days)", "Cash Conversion Cycle",
        "Interest Cover (Cash)", "DSCR",
    ]
    display_cols = [r for r in key_ratios if r in ratios.columns]
    print("\n--- KEY RATIOS (5-year) ---")
    print(ratios[display_cols].T.to_string())

    # RAG scoring (M&S sector-specific thresholds)
    ms_thresholds = {
        "Net Debt/EBITDA (post-IFRS16)": {"green": 3.0, "amber": 4.5},  # Retail: lease-heavy
        "EBITDA Margin % (Norm)": {"green": 8.0, "amber": 5.0},
        "Current Ratio": {"green": 0.9, "amber": 0.6},  # Retail norm < 1.0
        "Interest Cover (Cash)": {"green": 3.5, "amber": 2.0},
        "DSCR": {"green": 1.5, "amber": 1.1},
    }
    rag = calc.rag_score(ratios[display_cols], ms_thresholds)
    print("\n--- RAG SCORES (Latest Period) ---")
    print(rag.to_string())

    # Peer benchmarking (illustrative peer ratios — latest period)
    peer_latest = {
        "Marks & Spencer": ratios.iloc[-1],
        "Next plc": pd.Series({
            "Net Debt/EBITDA (post-IFRS16)": 2.1, "EBITDA Margin % (Norm)": 21.3,
            "Current Ratio": 0.75, "Interest Cover (Cash)": 8.4, "DSCR": 2.1,
        }),
        "JD Sports Fashion": pd.Series({
            "Net Debt/EBITDA (post-IFRS16)": 1.6, "EBITDA Margin % (Norm)": 12.1,
            "Current Ratio": 1.1, "Interest Cover (Cash)": 6.2, "DSCR": 1.8,
        }),
        "B&M European Value": pd.Series({
            "Net Debt/EBITDA (post-IFRS16)": 2.8, "EBITDA Margin % (Norm)": 11.8,
            "Current Ratio": 0.68, "Interest Cover (Cash)": 5.1, "DSCR": 1.6,
        }),
        "Dunelm Group": pd.Series({
            "Net Debt/EBITDA (post-IFRS16)": 0.8, "EBITDA Margin % (Norm)": 16.2,
            "Current Ratio": 1.05, "Interest Cover (Cash)": 11.2, "DSCR": 3.2,
        }),
    }

    benchmark = PeerBenchmark(peer_latest)
    peer_result = benchmark.percentile_rank(
        target_company="Marks & Spencer",
        metrics=["Net Debt/EBITDA (post-IFRS16)", "EBITDA Margin % (Norm)",
                 "Current Ratio", "Interest Cover (Cash)", "DSCR"],
        higher_is_better={
            "Net Debt/EBITDA (post-IFRS16)": False,
            "EBITDA Margin % (Norm)": True,
            "Current Ratio": True,
            "Interest Cover (Cash)": True,
            "DSCR": True,
        }
    )
    print("\n--- PEER BENCHMARKING (M&S vs General Retail Peers) ---")
    print(peer_result.to_string(index=False))

    # Generate dashboard
    plot_ratio_dashboard("Marks & Spencer Group plc", ratios, rag, peer_result)

    print("\n--- KEY CREDIT OBSERVATIONS ---")
    latest = ratios.iloc[-1]
    print(f"  Net Debt/EBITDA (post-IFRS 16): {latest['Net Debt/EBITDA (post-IFRS16)']:.1f}x")
    print(f"  Net Debt/EBITDA (pre-IFRS 16):  {latest['Net Debt/EBITDA (pre-IFRS16)']:.1f}x")
    print(f"  — IFRS 16 adds ~{latest['Net Debt/EBITDA (post-IFRS16)'] - latest['Net Debt/EBITDA (pre-IFRS16)']:.1f}x to leverage (significant leased estate)")
    print(f"  CCC: {latest['Cash Conversion Cycle']:.0f} days — negative WC is a structural advantage")
    print(f"  TNW: £{latest['Tangible Net Worth £m']:.0f}m — limited goodwill/intangibles → credit-friendly equity base")
    print(f"  DSCR: {latest['DSCR']:.2f}x — comfortable coverage in latest period")

    return ratios, rag, peer_result


if __name__ == "__main__":
    ratios, rag, peer_result = run_ms_analysis()
```

---

## 11. Interview Questions

**Q1: What is the most important leverage ratio in corporate credit and what are typical thresholds?**
Net Debt/EBITDA is the primary leverage ratio. It measures how many years of EBITDA would be needed to repay net debt. Typical thresholds: below 2.0x is conservative/investment grade; 2–4x is moderate leverage; 4–6x is leveraged buyout territory; above 6x is usually unsustainable without growth or asset sales. Context matters: a utility with stable regulated revenues can comfortably sustain 5–7x leverage; a cyclical manufacturer at 4x would be concerning. Always state whether leases are included and which EBITDA definition is used.

**Q2: A company has positive equity but negative TNW. What does that tell you?**
It means the company's equity is almost entirely composed of goodwill and other intangible assets. Strip those out and there is nothing — or less than nothing — of realisable value in the equity base. In a default scenario, creditors would recover from tangible assets; goodwill has no liquidation value. Negative TNW is a significant credit concern because it means, in a wind-down, unsecured creditors may have no equity buffer between them and a loss. I would look for a TNW minimum covenant in the facility documentation.

**Q3: Why is a current ratio below 1.0 not always a problem?**
For companies with negative working capital business models — primarily supermarkets and fast-moving consumer goods retailers — customers pay at the till while suppliers are paid 30–60 days later. The structural cash inflow from operations is large and predictable, making the current ratio misleading as a standalone metric. The current ratio must be interpreted in sector context. A supermarket with a current ratio of 0.7 has a perfectly normal, healthy business model. A manufacturer with a current ratio of 0.7 may be in difficulty.

**Q4: How does the DuPont analysis connect profitability and leverage to ROE?**
ROE = Net Margin × Asset Turnover × Equity Multiplier. The Equity Multiplier = Total Assets / Equity — it is a leverage measure. This decomposition shows that a company can improve ROE through three routes: better margins, more efficient asset use, or more leverage. For credit analysis, the important question is which driver is improving ROE. Improving ROE through higher leverage without margin improvement or better asset use is a credit risk — it means the return metric looks better but the company has actually become riskier.

**Q5: A company's DSO has increased from 45 to 65 days over three years. What are the possible explanations and what would you investigate?**
Possible explanations: (1) Customer base has shifted to larger, slower-paying customers; (2) Sales team is extending credit terms to win business — potential credit quality deterioration in the receivables book; (3) Customers are experiencing financial difficulty and are stretching their payment terms; (4) The company is recognising revenue before it is earned or collectible (aggressive revenue recognition); (5) Deliberate change in commercial payment terms. I would request an aged receivables analysis (what % is 90+ days overdue?), ask about bad debt write-offs, compare DSO against industry peers, and review the revenue recognition accounting policy. A 20-day DSO increase is material — it would warrant direct discussion with management.

**Q6: How do you benchmark ratios when the borrower is the only company in its niche?**
First, identify the broadest reasonable peer group — companies in adjacent sectors, similar size, similar business model characteristics. Second, use historical benchmarks for the company itself — its own 5-year trend is a form of self-benchmarking. Third, reference rating agency published median ratios by credit category for the relevant industry sector — Moody's and S&P publish these annually. Fourth, use macro industry data from trade associations. Fifth, be explicit in the credit paper that peer data is limited and the analysis relies primarily on trend analysis and absolute level assessment.

---

## 12. Common Mistakes

**Mistake 1: Using ratio X without defining it**
The most common mistake in credit papers is presenting "Net Debt/EBITDA of 3.5x" without specifying: (a) does net debt include leases? (b) which EBITDA definition? (c) normalised or reported? An undefined ratio is worse than no ratio — it gives false precision. Every ratio in a credit paper must have a definition footnote.

**Mistake 2: Looking at one year of ratios and drawing conclusions**
One year is a snapshot, not a trend. A company with Net Debt/EBITDA of 4.0x might be deleveraging rapidly from 6.0x (positive trend) or leveraging up from 2.0x (negative trend). Always present and discuss the trend. Directional movement is often more credit-significant than the absolute level.

**Mistake 3: Ignoring sector context for liquidity ratios**
Applying a universal "current ratio must be > 1.0" standard without sector calibration will cause you to misidentify every major retailer as distressed and fail to flag genuine liquidity problems in sectors where current ratio > 1.0 is the norm. Always apply sector-specific benchmarks.

**Mistake 4: Confusing the covenant ratio with the analytical ratio**
Facility agreements define ratios precisely and differently from standard analytical definitions. A covenant may define EBITDA to include or exclude specific items, define debt to exclude the revolving credit facility, or use a 12-month average rather than year-end. The covenant compliance calculation must use the contract definition, not your analytical definition.

**Mistake 5: Using P&L interest for interest cover instead of cash interest paid**
The P&L interest charge includes non-cash items (amortisation of debt issuance costs, PIK interest accrual, fair value hedging adjustments). Cash interest paid is the real cash burden. Using the P&L charge will overstate interest cover for PIK or complex capital structures.

**Mistake 6: Forgetting to adjust M&S-type ratios for IFRS 16**
For lease-intensive businesses, post-IFRS 16 ratios are materially different from pre-IFRS 16. A credit analyst who compares M&S's 2023 leverage ratio to its 2018 ratio without adjusting for IFRS 16 is comparing incompatible numbers. Always flag the IFRS 16 adoption date and present ratios both pre and post where relevant.

---

## 13. Case Studies

### Case Study 1: Marks & Spencer — Tracking Credit Recovery Through Ratios

M&S provides an excellent case study in ratio-based credit monitoring across a transformation period. Key milestones and ratio implications:

**FY2019 (pre-transformation):** Net Debt/EBITDA of approximately 4.1x (post-IFRS 16), EBITDA margin around 9.1%. The clothing business was underperforming; the food business was growing but EBITDA margin was compressed by wage inflation and supply chain costs.

**FY2020-2021 (COVID impact):** PAT turned negative in both years (exceptional charges, store closure costs). EBITDA margins compressed. However, the food business showed resilience — a classic defensive characteristic of grocery retail. Cash generation remained positive because the negative CCC meant working capital released cash as revenue fell.

**FY2022-2023 (recovery):** Revenue recovered strongly, particularly in food (Ocado partnership adding volume). EBITDA margins improved as exceptional charges reduced. Net Debt/EBITDA improved materially. DSCR recovered to comfortable levels.

**Credit lesson:** Ratio trend analysis tracked this recovery precisely. A credit analyst monitoring M&S through the cycle would have:
- FY2020: Flagged EBITDA margin compression and negative PAT as early warning indicators
- FY2021: Noted that while PAT remained negative, cash generation and EBITDA remained positive — distinguishing an accounting issue from a genuine cash flow crisis
- FY2023: Identified the improving leverage trajectory as a positive credit signal

The ratios told the story in real time, ahead of narrative management commentary.

### Case Study 2: The Asset Turnover / Margin Trade-Off

Two companies in the same sector (general retail), both with ROCE of 12%:

**Company A:** EBITDA Margin 4% × Asset Turnover 3.0x = 12% ROCE (simplified)
**Company B:** EBITDA Margin 12% × Asset Turnover 1.0x = 12% ROCE (simplified)

Same ROCE, very different credit profiles:
- Company A is a high-volume, low-margin discounter (similar to a value retailer). EBITDA margin is thin — any margin compression immediately threatens DSCR. But asset turnover is high — limited fixed asset investment, faster capital recycling.
- Company B is a premium retailer with higher margins but heavier asset investment. EBITDA margin has more headroom, but capex intensity is higher.

For credit analysis: Company A requires close EBITDA margin monitoring; a 2% margin compression (from 4% to 2%) halves operating profit. Company B requires close capex monitoring; if asset investment increases without proportionate revenue growth, leverage rises quickly.

The DuPont decomposition is not just an academic exercise — it pinpoints which ratio to watch most closely for each borrower type.

---

## 14. Iterative Reinforcement

### Week 1: Ratio Construction
- Download M&S FY2023 Annual Report from marksandspencer.com/investors
- Build the Ratio tab in your spreading template (from the Excel structure in Section 8)
- Calculate all six categories of ratios manually for FY2023
- Cross-check: can you get to the same EBITDA margin and Net Debt/EBITDA as published by M&S in their financial highlights?

### Week 2: Trend Analysis
- Extend the spreadsheet to cover FY2019–FY2023 (five years)
- Chart Net Debt/EBITDA, EBITDA Margin, and DSCR trends
- Write a three-paragraph narrative explaining what the trend tells you about M&S's credit trajectory

### Week 3: Peer Benchmarking
- Identify four UK retail peers (Next, JD Sports, B&M, Dunelm — all publicly available from their investor relations pages)
- Spread their FY2023 key ratios (Net Debt/EBITDA, EBITDA Margin, Interest Cover minimum)
- Rank M&S against these peers on each metric
- Write one sentence on each metric: "M&S is in the Xth percentile of its peer group on this metric because..."

### Week 4: Covenant Stress Test
- Assume M&S has a Net Debt/EBITDA covenant of 4.5x and an Interest Cover covenant of 3.0x
- Calculate: what revenue decline would cause M&S to breach each covenant?
- Present your answer as: "A revenue decline of X% with constant margins would breach the Net Debt/EBITDA covenant in Year 1 of a downside scenario."

### Long-Term Practice
- Build a personal database of ratio benchmarks by sector. Whenever you spread a new annual report, add its ratios to your database. After 12 months, you will have genuine empirical sector benchmarks built from your own analytical work — more valuable than any published table.

---

## 15. Source Material

### Primary Sources
- **Marks & Spencer Group plc Annual Report 2023** — available at marksandspencer.com/investors. Read the Primary Statements (consolidated income statement, balance sheet, cash flow statement) and Note 19 (debt and financing) and Note 25 (leases) in detail.
- **Next plc Annual Report 2023** — excellent peer for ratio comparison; Next has outstanding investor reporting with detailed financial analysis
- **IAS 1 — Presentation of Financial Statements** — defines the minimum line items required in the primary statements; understanding this helps you know what must be disclosed vs what is supplementary

### Credit-Specific References
- **Standard & Poor's: Key Credit Factors for the Retail Industry** — S&P's sector-specific ratio benchmarks and rating methodology; available via S&P Global Ratings website
- **Moody's Rating Methodology: Retail Industry** — Moody's ratio grids showing which ratios correspond to which rating categories; available via moodys.com (registration required)
- **LPC (Loan Pricing Corporation) Covenant Review** — quarterly publication reviewing covenant trends in the leveraged loan market; useful for current-market covenant benchmarks

### Academic and Practitioner Texts
- **Financial Statement Analysis and Security Valuation, Penman (5th Edition)** — academic treatment of ratio analysis with focus on intrinsic value; Chapters 11–13 cover ratio construction and interpretation
- **The Art of Credit Analysis (Barclays Capital)** — internal practitioner guide; extracts circulate in the credit community and provide practitioner perspective on ratio interpretation
- **Beaver, W.H. (1966) "Financial Ratios as Predictors of Failure"** — foundational academic paper establishing which ratios have statistically significant predictive power for default; available via JSTOR

### Data Sources for Peer Benchmarks
- **Bloomberg BICS (Bloomberg Industry Classification System)** — terminal access; Financial Analysis function provides sector median ratios
- **Bureau van Dijk Orbis** — private company financial data for UK mid-market benchmarking
- **ONS Business Surveys** — sector-level financial statistics for UK companies
- **ICC (Institute of Credit Management) Sector Reports** — sector-specific payment and financial health data

---

*End of M05 — Ratio Analysis*  
*Next module: M06 — Credit Structuring and Security*
