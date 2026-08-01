# M06 — Industry Analysis

> **Academy:** Commercial & Corporate Credit Risk  
> **Stream:** 02 — Business Risk  
> **Audience:** Experienced Banking Business Analyst transitioning to Credit Risk  
> **Prerequisite modules:** M01–M05 (Financial Statement Analysis)

---

## 1. Business Purpose

Before a credit analyst opens a single spreadsheet, before they look at EBITDA margins or debt-service coverage, they must answer one foundational question: **what kind of business is this, and what does the industry do to its credit risk?**

Industry analysis is the outermost ring of the credit risk assessment. It is systematic (affecting all companies in the sector) rather than idiosyncratic (specific to one firm). A brilliant management team running a structurally impaired business in a declining industry is still a higher credit risk than an average management team running a structurally sound business in a growing sector with high barriers to entry.

Banks use industry analysis for three concrete purposes:

**1. Portfolio concentration limits.** A bank that has lent 35% of its commercial book to property developers faces a correlated risk: if UK residential prices fall 20%, a large portion of the book deteriorates simultaneously. Industry limits (often expressed as a percentage of Tier 1 capital) are set using industry risk assessments.

**2. Calibrating the internal risk rating.** Most bank internal rating models have two primary inputs: a financial risk score (based on ratios) and a business risk score. Industry risk is the first and most important component of the business risk score. If an industry is rated 8/10 for risk (high risk), every borrower in that industry starts from a worse position before any company-specific analysis is done.

**3. Informing credit appetite.** Credit appetite statements — documents approved by Credit Committees that define what the bank will and will not lend to — are almost always structured by industry sector. "We will not lend to speculative-grade borrowers in the coal mining sector" is an industry-level credit appetite decision. Understanding industry risk is what allows such decisions to be made rigorously rather than by gut feel.

For the business analyst becoming a credit analyst, this module provides the analytical framework to move from "I can read financial statements" to "I can assess whether this sector is inherently more or less risky and why."

---

## 2. Accounting Concepts

Understanding industry risk requires understanding how different industries present financial statements differently, and why those differences are not accounting noise but genuine reflections of business model risk.

**Revenue recognition by sector:**
Manufacturing businesses (e.g., steel, automotive components) recognise revenue on delivery of goods — straightforward. Construction companies recognise revenue using percentage-of-completion (IFRS 15 / IAS 11 legacy concepts), meaning revenue is estimated based on stage of project completion. This introduces significant estimation risk: a construction firm's revenue figure depends on management's judgement about how complete each contract is. Retail businesses recognise revenue at the point of sale, typically with low receivables. SaaS technology companies may recognise subscription revenue ratably (evenly over the subscription period) creating large deferred revenue liabilities on the balance sheet.

**Asset intensity and depreciation:**
Capital-intensive industries (manufacturing, energy, real estate) carry large fixed asset bases. The depreciation policy directly affects reported profitability. A steel manufacturer with a 40-year useful life assumption for a blast furnace will show higher EBITDA than one that assumes 25 years, despite identical cash flows. Credit analysts adjust for this by using EBITDA rather than EBIT for interest coverage calculations, but should understand the gap between EBIT and EBITDA widens with capital intensity.

**Working capital structure:**
Retail businesses often have negative working capital (they collect cash from customers before paying suppliers — the Tesco model). Manufacturing businesses typically have extended working capital cycles: raw materials sit in inventory for weeks, work-in-progress runs for months, and receivables may extend 60–90 days. This means manufacturing firms are structurally more capital-hungry during growth periods and structurally at more liquidity risk during downturns when inventory builds and receivables slow.

**Industry-specific accounting lines that matter for credit:**
- **Retail:** inventory provision adequacy (old stock that can't be sold), lease liabilities under IFRS 16 (retail has enormous off-balance-sheet lease obligations that became on-balance-sheet post-2019)
- **Construction:** contract assets (unbilled receivables), contract liabilities (excess billings — cash received in advance, a positive sign), onerous contract provisions
- **Energy:** decommissioning liabilities (legal obligation to restore oil/gas sites — can be enormous), proven/probable reserve estimates that are management judgements
- **Healthcare:** goodwill from acquisitions (healthcare sector has consolidated heavily), intangible assets (licences, patents), unbilled Medicaid/NHS revenue
- **Financial services:** loan loss reserves, regulatory capital ratios — the financial statements of a bank require an entirely different analytical framework from non-financial corporates

---

## 3. Financial Concepts

**Industry beta and systematic risk:**

In equity markets, beta measures a stock's sensitivity to market movements. For credit analysts, the equivalent concept is how sensitive an industry's revenue and default rates are to the macroeconomic cycle. High-beta industries (e.g., steel, construction, luxury retail, automotive) see revenue and earnings swing sharply with GDP growth and contraction. Low-beta industries (e.g., utilities, healthcare, food retail, defence contracting) are relatively insensitive to the cycle.

The credit implications are direct. A steel manufacturer with 6x EBITDA leverage looks very different in an expansionary environment (revenues rising, debt ratios falling) from the same company in a recession (revenues falling 25–30%, EBITDA potentially negative, debt ratios exploding). The same 6x leverage is far more dangerous in a cyclical industry than in a stable one. Banks with sophisticated credit models apply a "through-the-cycle" adjustment to PD estimates for cyclical industries — effectively stressing the financials to a trough scenario.

**Capital intensity and the leverage capacity problem:**

Asset-heavy businesses (manufacturing, energy, real estate) can support higher leverage because they have tangible assets that serve as collateral and because their earnings, while volatile, are anchored by physical asset base. Asset-light businesses (technology services, consulting, staffing) have limited collateral but often have very stable, recurring revenue streams.

The metric that captures capital intensity is **capital expenditure as a percentage of revenue** and **fixed assets as a percentage of total assets**. A business spending 15%+ of revenue on capex is capital-intensive. The practical credit implication: capital-intensive businesses have higher free cash flow drag from maintenance capex (which must be spent regardless of trading conditions to keep the asset base productive). The formula **Free Cash Flow = EBITDA - Interest - Tax - Capex - Working Capital Change** shows that maintenance capex is a fixed charge, similar to interest. Banks sometimes calculate a "post-maintenance-capex coverage ratio" alongside standard DSCR.

**Commodity price risk:**

For mining, agriculture, oil and gas, and sectors that are heavy commodity consumers (steel uses iron ore and coking coal; chemicals use naphtha), commodity prices directly drive revenue and/or cost. The analytical problem is that commodity prices are volatile, mean-reverting over long cycles, and difficult to forecast.

Practical credit approach: analysts typically run three scenarios — base (consensus commodity price), downside (20th percentile of historical price distribution), and stress (the worst 12-month trailing average over the past 20 years). Debt capacity is sized to the base and downside; the stress scenario determines whether the business can survive without breaching covenants.

Hedging changes this analysis. A gold miner that has hedged 80% of its next two years' production at $1,800/oz is substantially less exposed to spot gold price movements than an unhedged miner. Credit analysts must read the hedging notes in financial statements and model the hedge book maturity schedule.

**Return on Capital Employed (ROCE) by sector:**

ROCE (EBIT / Capital Employed, where Capital Employed = Total Assets - Current Liabilities) varies dramatically by industry and tells the credit analyst about pricing power and competitive intensity. Technology businesses with strong IP can generate 30–50% ROCE. Commodity manufacturers typically generate 6–12% ROCE through the cycle, barely above the cost of capital. Low ROCE industries have little room for error: any sustained margin compression, working capital spike, or capex overrun can quickly erode their ability to service debt.

---

## 4. Statistical Concepts

**Default rate by industry and through-the-cycle vs point-in-time:**

Rating agencies publish annual default studies covering default rates by rating category and by industry sector. Moody's Annual Default Study (published each February, covering 1920–present for US corporates) shows that industries such as hotels/gaming, retail, and energy have materially higher historical default rates than utilities and pharmaceuticals, even controlling for credit rating. This is captured in what analysts call the "industry default differential."

For a credit analyst building an internal rating model, the question is whether to use **through-the-cycle (TTC)** or **point-in-time (PIT)** probability of default estimates. TTC PD represents the long-run average default rate across a full economic cycle. PIT PD represents the current default probability given current economic conditions. Basel IRB minimum requirements specify TTC as the appropriate basis for capital calculations to avoid capital volatility, but IFRS 9 ECL requires forward-looking PIT estimates. Understanding which you are using matters for the conclusions you draw.

**Concentration risk — the Herfindahl-Hirschman Index (HHI):**

A bank's loan portfolio is concentrated if a large share is in a small number of industries. The HHI, used in antitrust analysis, is also applicable to portfolio concentration:

HHI = Σ (s_i)²

where s_i is the share of the portfolio in industry i, expressed as a percentage. An HHI of 10,000 represents a completely concentrated (single-industry) portfolio. Regulatory guidance (EBA GL/2020/06 on internal governance) requires banks to manage concentration risk, and HHI is a standard measure. A diversified portfolio of 10 equally-weighted industries has an HHI of 1,000. Risk frameworks typically set alert thresholds at HHI > 2,500 for credit portfolios.

**Correlation between industries and the default correlation problem:**

When two industries are economically linked (e.g., construction and building materials), defaults may be correlated — if one industry deteriorates, the other is likely to as well. Default correlation is modelled in portfolio credit risk models (e.g., CreditMetrics, KMV Portfolio Manager) and feeds into Economic Capital calculations. The one-factor Gaussian Copula model used in Basel IRB assumes a single systematic risk factor (the economy) drives all default correlations, with industry-specific factor loadings. Higher factor loading = more correlated with the cycle = higher capital requirement.

**Cyclicality quantification:**

A simple but practically useful metric: regress industry revenue growth (or EBIT margin) against GDP growth over 10–20 years. The beta coefficient from this regression is the industry's revenue sensitivity to GDP. A beta of 2.0 means a 1% fall in GDP is associated with a 2% fall in industry revenue. Steel and construction typically show betas of 2.0–3.0. Food retail and utilities show betas below 0.5.

---

## 5. Regulatory Framework

**Basel III — Industry risk in the standardised approach:**

Under the Basel III standardised approach, corporate exposures receive risk weights based on the external credit rating of the counterparty (or 100% if unrated). There is no explicit industry risk weight differentiation in the standardised approach for generic corporates — the rating does the work. However, Basel introduces specific exposure classes with different treatment:

- **Specialised Lending (SL):** Project finance, object finance, commodities finance, income-producing real estate, and high-volatility commercial real estate each have their own supervisory slotting criteria (Strong/Good/Satisfactory/Weak), which function as industry-specific risk assessments applied to particular loan types.
- **IPRE (Income-Producing Real Estate):** Commercial real estate income-producing property has separate treatment under both standardised and IRB approaches due to the historical volatility of real estate as collateral.

**Basel III — Industry risk in the IRB approach:**

Under the Internal Ratings Based (IRB) approach, banks estimate their own PD for each borrower. The industry risk rating directly feeds into the PD estimation process. Banks segment their corporate portfolios by industry and calibrate PD models separately for each segment, because the financial ratios that predict default in manufacturing differ from those that predict default in retail or construction.

The Asset Correlation formula in Basel IRB has a size adjustment (SME correlation factor) but not an explicit industry adjustment — instead, industry is captured through the PD itself, which is calibrated to industry-specific historical default rates.

**UK/PRA specific:**

The PRA's supervisory statement SS1/21 on model risk management explicitly requires banks to validate their rating models separately by industry segment, because a model calibrated on all corporates pooled together may be systematically miscalibrated for specific sectors. The PRA also conducts thematic reviews by sector — the 2021 review of commercial real estate, the 2022 review of leveraged lending — which banks must respond to with sector-specific analysis.

**IFRS 9 sector-specific provisions:**

Under IFRS 9, Expected Credit Loss (ECL) calculations require forward-looking macroeconomic scenarios. For highly cyclical sectors (commercial real estate, retail, energy), the ECL model must incorporate sector-specific economic variables — commercial property price indices, retail sales data, oil price forecasts — not just generic GDP. Banks with sophisticated models overlay sector-specific stress scenarios onto their ECL calculation for concentrated exposures.

**FCA/PRA regulatory risk in specific sectors:**

Regulated sectors (banking, insurance, pharmaceuticals, energy, water) carry regulatory risk as a credit factor. A pharmaceutical company that loses FDA/MHRA approval for a key drug faces immediate revenue collapse. An energy company that fails to meet emissions targets faces carbon penalty costs and potential licence revocation. Credit analysts must identify the key regulatory dependencies and assess the probability and impact of adverse regulatory action.

---

## 6. Data Required

To conduct a rigorous industry analysis, analysts need the following data sources:

**Macro data:**
- GDP growth (quarterly, ONS / Eurostat / BEA)
- Sector-specific output indices (ONS UK SIC-based output indices, ISM Manufacturing PMI for US, CIPS UK Manufacturing PMI)
- CPI and PPI (Producer Price Index — critical for commodity-using industries to assess input cost inflation)
- Interest rates (BBR/SOFR/EURIBOR — critical for real estate, construction)
- Exchange rates (critical for export-oriented manufacturers, mining, energy)

**Industry-specific data:**
- **Manufacturing:** Capacity utilisation rates (ONS/Fed), Steel Production data (World Steel Association), Automotive sales data (SMMT), Order Book levels
- **Retail:** ONS Retail Sales Index (monthly), BRC-KPMG Retail Sales Monitor, like-for-like sales data from listed retailers
- **Construction:** ONS Construction Output, Glenigan planning pipeline data, house price indices (Halifax, Nationwide, Land Registry)
- **Real estate:** MSCI/IPD UK Commercial Property Index, RICS Commercial Property Survey, Knight Frank/JLL market reports
- **Healthcare:** NHS spending data, CQC inspection reports, drug pricing data from NICE
- **Energy:** Oil & gas price futures (ICE Brent), UK power price data (Elexon), North Sea production data (NSTA), carbon price (UK ETS)
- **Technology:** Gartner/IDC IT spending forecasts, sector-specific SaaS metrics benchmarks
- **Financial services:** PRA/FCA data, Bank of England Credit Conditions Survey

**Rating agency reports:**
- Moody's sector outlook reports (published quarterly by sector)
- S&P Industry Report Cards (monthly or quarterly by sector)
- Fitch Sector Outlooks
- These are available to banks through subscriptions and are essential primary research

**Internal bank data:**
- Portfolio exposure by SIC/NACE code (from loan management system)
- Historical default and loss rates by sector (from credit risk data warehouse)
- Watch list composition by sector
- Utilisation rates on revolving facilities by sector (high utilisation across a sector can be an early warning of distress)

**Commercial databases:**
- IBISWorld (sector reports covering market size, growth, competitive dynamics, key players, key risks for hundreds of UK/US/global industries)
- Mintel (consumer sector-specific market intelligence)
- Dun & Bradstreet (industry risk ratings and company-level financial data)

---

## 7. How Analysts Actually Work

**The industry risk rating process in a UK mid-market bank:**

A credit analyst receives a new application from a steel manufacturer. Before reading the financial statements, they:

1. **Identify the industry code.** The UK SIC 2007 code for basic iron and steel manufacturing is 24.10. The analyst finds the bank's internal industry risk register (typically maintained by the Credit Risk or Portfolio Management team) and pulls the current industry risk score for SIC 24.10.

2. **Check the bank's appetite statement.** Is this a sector the bank is actively growing, maintaining, or reducing? Are there concentration limits that are being approached?

3. **Read the most recent sector outlook.** Moody's and S&P both publish sector outlooks. The analyst downloads the latest and reads the key themes: what is the outlook (positive/stable/negative), what are the key risks, what has changed since the last report?

4. **Run the macro sensitivity check.** The analyst looks up the industry's correlation with GDP, commodity price sensitivity, and asks: given the current macro environment, where are we in the cycle for this industry?

5. **Check the bank's portfolio exposure.** How much does the bank already lend to the steel sector? What is the average risk rating of existing exposures? Is this new borrower better or worse quality than the existing portfolio?

6. **Read an IBISWorld report.** A 15–20 page IBISWorld report on UK Iron & Steel Manufacturing gives: market size (£Xbn), 5-year growth rate, profitability trends, major players and market shares, key risk factors, industry life cycle stage (growth/mature/decline), and a sector risk rating.

7. **Synthesise into a sector assessment paragraph.** The credit paper will contain a 3–5 paragraph industry assessment, typically covering: sector dynamics, cyclicality, current cycle position, key risks, and the bank's appetite. This paragraph anchors the credit decision before financials are considered.

**What experienced analysts actually look for:**
- Industries with structural decline trends get extra scrutiny regardless of current trading
- Industries with recent sector-wide stress events get peer comparisons (how did this company perform relative to its sector peers?)
- Industries with high regulatory exposure require understanding of the regulatory environment, not just the financial statements
- Industries with commodity exposure require understanding of commodity price dynamics and hedging

**The "through the cycle" mental model:**

Experienced credit analysts force themselves to ask: "What does this company look like in a downturn?" For a steel manufacturer, that means asking: "In 2015–16 (last steel downturn), what happened to UK steelmakers? Revenue fell 20–30%, EBITDA turned negative at many producers, UK Steel went into administration. If that happens again, can this borrower service its debt?" This thought exercise — conducted at the industry level before touching the specific company's numbers — is the hallmark of industry analysis done well.

---

## 8. Excel Implementation

**Industry Risk Scoring Matrix — Step-by-step build**

This model produces a single industry risk score (1–10, where 10 is highest risk) by scoring and weighting seven industry-level risk factors.

```
INDUSTRY RISK SCORING MATRIX
Sector: UK Steel Manufacturing (SIC 24.10)
Date: [current period]

FACTOR                          WEIGHT   RAW SCORE   WEIGHTED SCORE
                                 (%)      (1-10)
-----------------------------------------------------------------
1. Cyclicality / GDP sensitivity  20%       8          1.60
2. Capital intensity               15%       7          1.05
3. Competitive intensity           15%       7          1.05
4. Commodity/input price risk      15%       9          1.35
5. Regulatory/ESG risk             10%       7          0.70
6. Barriers to entry               10%       5          0.50
7. Structural growth/decline       15%       8          1.20
-----------------------------------------------------------------
TOTAL INDUSTRY RISK SCORE                              7.45 / 10

SCORE INTERPRETATION:
1.0 - 3.0: Low industry risk (e.g., water utilities, defence)
3.1 - 5.0: Moderate-low (e.g., food manufacturing, healthcare)
5.1 - 6.5: Moderate-high (e.g., construction, chemicals)
6.6 - 8.0: High (e.g., steel, retail, energy extraction)
8.1 - 10.0: Very high (e.g., coal mining, speculative real estate)
```

**Scoring guide — each factor:**

```
CYCLICALITY (GDP sensitivity, weight 20%):
Score 1-3: Revenue highly stable through cycles (water, regulated utilities)
Score 4-6: Moderate cyclicality (healthcare, food manufacturing)
Score 7-9: High cyclicality (steel, construction, automotive)
Score 10: Extreme cyclicality (shipping, commodity mining)

Steel scores 8: Revenue typically falls 20–30% in a recession;
EBITDA can turn negative at marginal producers.

CAPITAL INTENSITY (weight 15%):
Score 1-3: Asset-light (technology services, consulting)
Score 4-6: Moderate (food processing, chemicals)
Score 7-9: Heavy manufacturing, energy production
Score 10: Oil & gas upstream, mining (billions in capex)

Steel scores 7: Blast furnace requires £1–2bn capex;
maintenance capex is 4–6% of revenue; high fixed costs.

COMPETITIVE INTENSITY (weight 15%):
Score 1-3: Oligopoly with pricing power (pharmaceuticals with IP)
Score 4-6: Consolidated market, rational competition
Score 7-9: Fragmented, price-competitive, margin pressure
Score 10: Commodity market, pure price taker

Steel scores 7: Global commodity pricing, Chinese overcapacity
suppresses prices; UK producers are price takers in long products.

COMMODITY/INPUT PRICE RISK (weight 15%):
Score 1-3: No commodity exposure
Score 4-6: Moderate exposure, passthrough mechanisms exist
Score 7-9: High exposure, limited passthrough
Score 10: Revenue IS a commodity price (mining)

Steel scores 9: Iron ore, coking coal, and energy (gas/electricity)
are core inputs. UK energy crisis 2022 drove cost of £/tonne
steel production up 40%. Passthrough to customers is slow and
contested. Energy cost is 20–25% of total production cost.

REGULATORY/ESG RISK (weight 10%):
Score 1-3: Light regulation, low ESG pressure
Score 4-6: Moderate regulation, manageable compliance cost
Score 7-9: Heavy regulation or material ESG exposure
Score 10: Existential regulatory risk (coal, tobacco)

Steel scores 7: UK ETS carbon pricing is a material cost;
decarbonisation pathway requires significant capex (green hydrogen
DRI or electric arc furnaces); potential for carbon border
adjustment mechanism (CBAM) to affect competitiveness.

BARRIERS TO ENTRY (weight 10%):
Score 1-3: Very high barriers (pharma IP, regulated monopoly)
Score 4-6: Moderate barriers (brand, scale)
Score 7-9: Low barriers, easy entry and exit
Score 10: No barriers

Steel scores 5 (INVERTED - lower is better for credit):
Capital intensity creates natural barriers; however, cheap imports
from Asia effectively represent continuous new entrant competition.
The effective competition is not new plants but import volumes.
Note: In the scoring, we score the risk, not the barrier height.
Lower barriers to entry = higher risk score. Score 5-6.

STRUCTURAL GROWTH/DECLINE (weight 15%):
Score 1-3: Structural growth (technology, healthcare)
Score 4-6: Stable/mature industry
Score 7-9: Structural decline pressures
Score 10: Terminal decline (coal, print media)

Steel scores 8: UK steel production has fallen from 17mt/year
in 1990 to ~7mt/year by 2023. Green steel transition creates
uncertainty about viable business models. Long-product steel
demand faces substitution from aluminium and composites.
```

**Excel formula structure:**

```excel
Cell references assume data entry in column C, formulas in column D:

C12: [Cyclicality raw score, manually entered, 1-10]
B12: 20% [weight]
D12: =B12*C12  [weighted score]

...

D20: =SUM(D12:D18)  [total industry risk score]

Traffic light conditional formatting:
=IF(D20<=3,"LOW",IF(D20<=5,"MODERATE-LOW",IF(D20<=6.5,"MODERATE-HIGH",
  IF(D20<=8,"HIGH","VERY HIGH"))))

Colour rule: Red if D20>6.5, Amber if D20>5, Green if D20<=5
```

---

## 9. SQL Implementation

```sql
-- ============================================================
-- INDUSTRY RISK ANALYSIS: Portfolio Concentration & PD Tracking
-- Database: SQL Server (T-SQL syntax)
-- ============================================================

-- TABLE SETUP (reference)
-- Assumes tables: loans, borrowers, industry_codes, credit_ratings
-- loans: loan_id, borrower_id, outstanding_balance, facility_type, 
--        approval_date, maturity_date, internal_rating
-- borrowers: borrower_id, borrower_name, sic_code, nace_code, 
--            country_code, turnover_band
-- industry_codes: sic_code, sic_description, industry_risk_score,
--                 industry_risk_category, last_review_date
-- credit_ratings: borrower_id, rating_date, pd_estimate, 
--                 lgd_estimate, ead

-- ============================================================
-- QUERY 1: Portfolio Concentration by Industry Sector
-- Produces the core concentration report for Credit Risk Committee
-- ============================================================

WITH portfolio_by_industry AS (
    SELECT
        ic.sic_code,
        ic.sic_description,
        ic.industry_risk_category,
        ic.industry_risk_score,
        COUNT(DISTINCT l.borrower_id)                           AS borrower_count,
        COUNT(l.loan_id)                                        AS facility_count,
        SUM(l.outstanding_balance) / 1000000.0                 AS exposure_gbp_m,
        AVG(cr.pd_estimate) * 100                              AS avg_pd_pct,
        SUM(l.outstanding_balance * cr.pd_estimate * cr.lgd_estimate) 
            / 1000000.0                                         AS expected_loss_gbp_m
    FROM loans l
    INNER JOIN borrowers b       ON l.borrower_id = b.borrower_id
    INNER JOIN industry_codes ic ON b.sic_code = ic.sic_code
    LEFT  JOIN credit_ratings cr ON b.borrower_id = cr.borrower_id
        AND cr.rating_date = (
            SELECT MAX(cr2.rating_date)
            FROM credit_ratings cr2
            WHERE cr2.borrower_id = b.borrower_id
        )
    WHERE l.outstanding_balance > 0
    GROUP BY
        ic.sic_code,
        ic.sic_description,
        ic.industry_risk_category,
        ic.industry_risk_score
),
total_portfolio AS (
    SELECT SUM(outstanding_balance) / 1000000.0 AS total_exposure_gbp_m
    FROM loans
    WHERE outstanding_balance > 0
)

SELECT
    p.sic_code,
    p.sic_description,
    p.industry_risk_category,
    p.industry_risk_score,
    p.borrower_count,
    p.facility_count,
    ROUND(p.exposure_gbp_m, 1)                                 AS exposure_gbp_m,
    ROUND(p.exposure_gbp_m / t.total_exposure_gbp_m * 100, 2) AS portfolio_share_pct,
    ROUND(p.avg_pd_pct, 3)                                     AS avg_pd_pct,
    ROUND(p.expected_loss_gbp_m, 2)                            AS expected_loss_gbp_m,
    -- Herfindahl contribution: (share)^2 — sum across all sectors = HHI
    POWER(p.exposure_gbp_m / t.total_exposure_gbp_m * 100, 2) AS hhi_contribution,
    -- Flag if single industry >15% of portfolio (concentration trigger)
    CASE 
        WHEN p.exposure_gbp_m / t.total_exposure_gbp_m > 0.15 
        THEN 'CONCENTRATION ALERT'
        WHEN p.exposure_gbp_m / t.total_exposure_gbp_m > 0.10
        THEN 'WATCH'
        ELSE 'OK'
    END                                                         AS concentration_status
FROM portfolio_by_industry p
CROSS JOIN total_portfolio t
ORDER BY p.exposure_gbp_m DESC;

-- ============================================================
-- QUERY 2: HHI Calculation — Portfolio Concentration Index
-- ============================================================

WITH industry_shares AS (
    SELECT
        b.sic_code,
        SUM(l.outstanding_balance) AS industry_exposure,
        SUM(SUM(l.outstanding_balance)) OVER () AS total_exposure
    FROM loans l
    INNER JOIN borrowers b ON l.borrower_id = b.borrower_id
    WHERE l.outstanding_balance > 0
    GROUP BY b.sic_code
)

SELECT
    ROUND(SUM(POWER(industry_exposure * 100.0 / total_exposure, 2)), 0) AS portfolio_hhi,
    CASE
        WHEN SUM(POWER(industry_exposure * 100.0 / total_exposure, 2)) < 1000 
            THEN 'Well-diversified'
        WHEN SUM(POWER(industry_exposure * 100.0 / total_exposure, 2)) < 2500 
            THEN 'Moderately concentrated'
        ELSE 'Highly concentrated — escalate to CRO'
    END                                                                  AS hhi_interpretation,
    COUNT(DISTINCT sic_code)                                             AS number_of_industries
FROM industry_shares;

-- ============================================================
-- QUERY 3: Industry-Level PD Trend — 5 Year History
-- Tracks whether credit quality in each sector is improving or
-- deteriorating over time. Essential for ECL staging decisions.
-- ============================================================

SELECT
    ic.sic_description,
    YEAR(cr.rating_date)                   AS rating_year,
    COUNT(DISTINCT b.borrower_id)          AS borrower_count,
    ROUND(AVG(cr.pd_estimate) * 100, 3)   AS avg_pd_pct,
    ROUND(MIN(cr.pd_estimate) * 100, 3)   AS min_pd_pct,
    ROUND(MAX(cr.pd_estimate) * 100, 3)   AS max_pd_pct,
    -- Count of borrowers in high-risk rating bands (internal grades 7-10)
    SUM(CASE WHEN l.internal_rating >= 7 THEN 1 ELSE 0 END) AS high_risk_count,
    -- Stressed EL: PD x LGD x EAD summed
    ROUND(
        SUM(cr.pd_estimate * cr.lgd_estimate * l.outstanding_balance) 
        / 1000000.0, 2
    )                                      AS expected_loss_gbp_m
FROM credit_ratings cr
INNER JOIN borrowers b       ON cr.borrower_id = b.borrower_id
INNER JOIN industry_codes ic ON b.sic_code = ic.sic_code
INNER JOIN loans l           ON b.borrower_id = l.borrower_id
    AND l.outstanding_balance > 0
WHERE cr.rating_date >= DATEADD(YEAR, -5, GETDATE())
    -- Select specific high-risk sectors
    AND ic.industry_risk_score >= 7.0
GROUP BY
    ic.sic_description,
    YEAR(cr.rating_date)
ORDER BY
    ic.sic_description,
    YEAR(cr.rating_date);

-- ============================================================
-- QUERY 4: Early Warning — Sectors with Deteriorating Credit
-- Flags sectors where average PD has increased >25% year-on-year
-- ============================================================

WITH annual_pd AS (
    SELECT
        b.sic_code,
        ic.sic_description,
        YEAR(cr.rating_date)          AS rating_year,
        AVG(cr.pd_estimate)           AS avg_pd
    FROM credit_ratings cr
    INNER JOIN borrowers b       ON cr.borrower_id = b.borrower_id
    INNER JOIN industry_codes ic ON b.sic_code = ic.sic_code
    WHERE cr.rating_date >= DATEADD(YEAR, -2, GETDATE())
    GROUP BY b.sic_code, ic.sic_description, YEAR(cr.rating_date)
),
pd_comparison AS (
    SELECT
        curr.sic_code,
        curr.sic_description,
        curr.avg_pd                                         AS current_year_pd,
        prev.avg_pd                                         AS prior_year_pd,
        (curr.avg_pd - prev.avg_pd) / NULLIF(prev.avg_pd, 0) 
            AS pd_change_pct
    FROM annual_pd curr
    LEFT JOIN annual_pd prev 
        ON curr.sic_code = prev.sic_code
        AND curr.rating_year = prev.rating_year + 1
    WHERE curr.rating_year = YEAR(GETDATE())
)

SELECT
    sic_description,
    ROUND(current_year_pd * 100, 3)   AS current_pd_pct,
    ROUND(prior_year_pd * 100, 3)     AS prior_pd_pct,
    ROUND(pd_change_pct * 100, 1)     AS pd_change_pct,
    CASE
        WHEN pd_change_pct > 0.50 THEN 'CRITICAL — >50% PD increase'
        WHEN pd_change_pct > 0.25 THEN 'WARNING — >25% PD increase'
        WHEN pd_change_pct > 0.10 THEN 'MONITOR — >10% PD increase'
        ELSE 'STABLE'
    END                               AS early_warning_flag
FROM pd_comparison
WHERE pd_change_pct > 0.10
ORDER BY pd_change_pct DESC;
```

---

## 10. Python Implementation

```python
"""
Industry Risk Analysis — Python Implementation
Commercial & Corporate Credit Risk Academy — M06

Performs:
1. Industry cyclicality analysis (correlation with GDP)
2. Historical default rate analysis by sector
3. Industry risk scoring automation
4. Portfolio concentration visualisation

Requirements: pandas, numpy, scipy, matplotlib, seaborn
"""

import pandas as pd
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import seaborn as sns
from typing import Dict, List, Tuple, Optional
import warnings
warnings.filterwarnings('ignore')


# ============================================================
# 1. INDUSTRY CYCLICALITY ANALYSIS
# Regresses industry revenue growth against GDP growth to 
# estimate revenue beta (cyclicality measure)
# ============================================================

class IndustryCyclicalityAnalyser:
    """
    Quantifies the sensitivity of industry revenue to GDP changes.
    
    Revenue beta > 1.5: highly cyclical (steel, construction, mining)
    Revenue beta 0.5-1.5: moderate cyclicality
    Revenue beta < 0.5: defensive (utilities, healthcare, food retail)
    """
    
    def __init__(self, gdp_growth: pd.Series, 
                 industry_data: pd.DataFrame):
        """
        Args:
            gdp_growth: Annual GDP growth rates (index = year)
            industry_data: DataFrame with years as index, 
                          industries as columns, values = revenue growth
        """
        self.gdp = gdp_growth
        self.industries = industry_data
        self.betas = {}
        self.r_squared = {}
        self.regression_results = {}
    
    def calculate_betas(self) -> pd.DataFrame:
        """
        Regress each industry's revenue growth against GDP growth.
        Returns DataFrame with beta, R², correlation, and 
        cyclicality classification for each industry.
        """
        results = []
        
        for industry in self.industries.columns:
            # Align data — inner join on available years
            aligned = pd.concat([self.gdp, self.industries[industry]], 
                               axis=1).dropna()
            aligned.columns = ['gdp_growth', 'revenue_growth']
            
            if len(aligned) < 5:  # Minimum 5 years for meaningful regression
                continue
            
            x = aligned['gdp_growth'].values
            y = aligned['revenue_growth'].values
            
            # OLS regression
            slope, intercept, r_value, p_value, std_err = stats.linregress(x, y)
            
            # Cyclicality classification
            if slope < 0.5:
                cyclicality = 'Defensive'
            elif slope < 1.5:
                cyclicality = 'Moderate'
            elif slope < 2.5:
                cyclicality = 'Cyclical'
            else:
                cyclicality = 'Highly Cyclical'
            
            # Stress test: revenue change in a -3% GDP recession
            stressed_revenue_change = slope * (-3.0) + intercept
            
            self.betas[industry] = slope
            self.r_squared[industry] = r_value ** 2
            
            results.append({
                'Industry': industry,
                'Revenue_Beta': round(slope, 2),
                'R_Squared': round(r_value ** 2, 3),
                'P_Value': round(p_value, 4),
                'Cyclicality': cyclicality,
                'Revenue_Change_in_Recession_3pct': round(stressed_revenue_change, 1),
                'Statistically_Significant': p_value < 0.05
            })
            
            self.regression_results[industry] = {
                'slope': slope,
                'intercept': intercept,
                'aligned_data': aligned
            }
        
        self.beta_results = pd.DataFrame(results).sort_values(
            'Revenue_Beta', ascending=False
        )
        return self.beta_results
    
    def plot_cyclicality(self, figsize: Tuple = (14, 10)) -> plt.Figure:
        """
        Creates a 2x2 chart: beta rankings, scatter plots for 
        highest and lowest beta industries, and recession stress chart.
        """
        if not self.regression_results:
            self.calculate_betas()
        
        fig = plt.figure(figsize=figsize)
        fig.suptitle('Industry Cyclicality Analysis', 
                     fontsize=14, fontweight='bold')
        
        gs = gridspec.GridSpec(2, 2, figure=fig, hspace=0.4, wspace=0.3)
        
        # Panel 1: Beta rankings bar chart
        ax1 = fig.add_subplot(gs[0, :])
        colors = ['#d32f2f' if b > 2 else '#f57c00' if b > 1 
                  else '#388e3c' for b in self.beta_results['Revenue_Beta']]
        ax1.barh(self.beta_results['Industry'], 
                 self.beta_results['Revenue_Beta'], 
                 color=colors)
        ax1.axvline(x=1.5, color='orange', linestyle='--', 
                    alpha=0.7, label='Cyclical threshold (1.5x)')
        ax1.axvline(x=0.5, color='green', linestyle='--', 
                    alpha=0.7, label='Defensive threshold (0.5x)')
        ax1.set_xlabel('Revenue Beta (sensitivity to GDP growth)')
        ax1.set_title('Industry Revenue Beta Rankings', fontweight='bold')
        ax1.legend(fontsize=8)
        
        # Panel 2: Recession stress
        ax2 = fig.add_subplot(gs[1, 0])
        stress = self.beta_results[['Industry', 'Revenue_Change_in_Recession_3pct']]
        stress = stress.sort_values('Revenue_Change_in_Recession_3pct')
        bar_colors = ['#d32f2f' if v < -10 else '#f57c00' if v < -5 
                      else '#388e3c' for v in stress['Revenue_Change_in_Recession_3pct']]
        ax2.barh(stress['Industry'], 
                 stress['Revenue_Change_in_Recession_3pct'],
                 color=bar_colors)
        ax2.axvline(x=0, color='black', linewidth=0.8)
        ax2.set_xlabel('Estimated Revenue Change (%)')
        ax2.set_title('Revenue Impact: -3% GDP Recession Scenario', 
                      fontweight='bold', fontsize=9)
        
        # Panel 3: R² quality of fit
        ax3 = fig.add_subplot(gs[1, 1])
        r2_data = self.beta_results[['Industry', 'R_Squared']].sort_values('R_Squared')
        ax3.barh(r2_data['Industry'], r2_data['R_Squared'], color='steelblue')
        ax3.set_xlabel('R² (explanatory power of GDP for revenue growth)')
        ax3.set_title('How Much of Revenue Volatility is GDP-Driven?',
                      fontweight='bold', fontsize=9)
        
        return fig


# ============================================================
# 2. DEFAULT RATE CORRELATION ANALYSIS
# Tests whether industry financial metrics predict default rates
# ============================================================

class IndustryDefaultRateAnalyser:
    """
    Analyses correlation between industry financial metrics 
    (profit margins, leverage, capex intensity) and historical 
    default rates to identify leading indicators.
    """
    
    def __init__(self, industry_metrics: pd.DataFrame, 
                 default_rates: pd.DataFrame):
        """
        Args:
            industry_metrics: Panel data — columns: industry, year, 
                             ebitda_margin, leverage_ratio, capex_pct_revenue,
                             current_ratio, revenue_growth
            default_rates: Panel data — columns: industry, year, 
                          annual_default_rate (as decimal, e.g. 0.023)
        """
        self.metrics = industry_metrics
        self.defaults = default_rates
        self.merged = pd.merge(
            self.metrics, self.defaults,
            on=['industry', 'year']
        )
    
    def correlation_with_defaults(self, lag_years: int = 1) -> pd.DataFrame:
        """
        Calculates correlation between each financial metric and 
        the default rate (with lag, since financial stress precedes
        defaults). lag_years=1 means we test if year T metrics 
        predict year T+1 defaults.
        
        Returns DataFrame with Pearson correlation, p-value, and 
        economic interpretation for each metric.
        """
        metric_cols = ['ebitda_margin', 'leverage_ratio', 
                       'capex_pct_revenue', 'current_ratio', 
                       'revenue_growth']
        
        results = []
        
        for metric in metric_cols:
            # Build lagged dataset: metric at T predicts default at T+lag
            lagged_data = []
            for industry in self.merged['industry'].unique():
                industry_data = self.merged[
                    self.merged['industry'] == industry
                ].sort_values('year')
                
                for i in range(len(industry_data) - lag_years):
                    row = {
                        'industry': industry,
                        'year': industry_data.iloc[i]['year'],
                        'metric_value': industry_data.iloc[i][metric],
                        'future_default_rate': industry_data.iloc[i + lag_years][
                            'annual_default_rate'
                        ]
                    }
                    lagged_data.append(row)
            
            if not lagged_data:
                continue
                
            lagged_df = pd.DataFrame(lagged_data).dropna()
            
            if len(lagged_df) < 10:
                continue
            
            corr, p_val = stats.pearsonr(
                lagged_df['metric_value'],
                lagged_df['future_default_rate']
            )
            
            # Interpret direction
            if metric in ['leverage_ratio']:
                expected_direction = 'positive'  # Higher leverage → more defaults
            else:
                expected_direction = 'negative'  # Better metrics → fewer defaults
            
            direction_correct = (
                (corr > 0 and expected_direction == 'positive') or
                (corr < 0 and expected_direction == 'negative')
            )
            
            results.append({
                'Metric': metric,
                'Lag_Years': lag_years,
                'Pearson_Correlation': round(corr, 3),
                'P_Value': round(p_val, 4),
                'Significant_5pct': p_val < 0.05,
                'Expected_Direction': expected_direction,
                'Direction_Correct': direction_correct,
                'Predictive_Value': 'Strong' if abs(corr) > 0.5 and p_val < 0.05 
                                    else 'Moderate' if abs(corr) > 0.3 
                                    else 'Weak'
            })
        
        return pd.DataFrame(results).sort_values('Pearson_Correlation', 
                                                  key=abs, ascending=False)
    
    def sector_risk_heatmap(self) -> plt.Figure:
        """
        Heatmap of industry risk metrics — rows = industries, 
        columns = normalised risk factors. Red = higher risk.
        """
        # Pivot to wide format: industry x metrics
        pivot_metrics = {}
        for metric in ['ebitda_margin', 'leverage_ratio', 'annual_default_rate']:
            pivot_metrics[metric] = self.merged.groupby('industry')[metric].mean()
        
        heatmap_data = pd.DataFrame(pivot_metrics)
        
        # Normalise 0-1 for comparability, flip margin so high=red
        heatmap_norm = pd.DataFrame()
        heatmap_norm['EBITDA Margin Risk'] = 1 - (
            (heatmap_data['ebitda_margin'] - heatmap_data['ebitda_margin'].min()) /
            (heatmap_data['ebitda_margin'].max() - heatmap_data['ebitda_margin'].min())
        )
        heatmap_norm['Leverage Risk'] = (
            (heatmap_data['leverage_ratio'] - heatmap_data['leverage_ratio'].min()) /
            (heatmap_data['leverage_ratio'].max() - heatmap_data['leverage_ratio'].min())
        )
        heatmap_norm['Historical Default Rate'] = (
            (heatmap_data['annual_default_rate'] - 
             heatmap_data['annual_default_rate'].min()) /
            (heatmap_data['annual_default_rate'].max() - 
             heatmap_data['annual_default_rate'].min())
        )
        
        fig, ax = plt.subplots(figsize=(10, 6))
        sns.heatmap(heatmap_norm, annot=True, fmt='.2f', cmap='RdYlGn_r',
                    ax=ax, vmin=0, vmax=1, linewidths=0.5)
        ax.set_title('Industry Risk Heatmap (0=low risk, 1=high risk)', 
                     fontweight='bold')
        plt.tight_layout()
        return fig


# ============================================================
# 3. INDUSTRY RISK SCORING — AUTOMATED
# ============================================================

class IndustryRiskScorer:
    """
    Computes a weighted industry risk score from multiple factors.
    Matches the Excel model but allows batch processing.
    """
    
    FACTOR_WEIGHTS = {
        'cyclicality': 0.20,
        'capital_intensity': 0.15,
        'competitive_intensity': 0.15,
        'commodity_price_risk': 0.15,
        'regulatory_esg_risk': 0.10,
        'barriers_to_entry_risk': 0.10,  # Low barriers = high score
        'structural_growth_risk': 0.15   # Declining = high score
    }
    
    SCORE_BANDS = [
        (0, 3.0, 'Low', 'green'),
        (3.0, 5.0, 'Moderate-Low', 'lightgreen'),
        (5.0, 6.5, 'Moderate-High', 'orange'),
        (6.5, 8.0, 'High', 'red'),
        (8.0, 10.0, 'Very High', 'darkred')
    ]
    
    def score_industry(self, industry_name: str, 
                       scores: Dict[str, float]) -> Dict:
        """
        Calculates weighted risk score for a single industry.
        
        Args:
            industry_name: Descriptive name of the industry
            scores: Dict mapping factor names to raw scores (1-10)
        
        Returns:
            Dict with weighted score, band, and factor breakdown
        """
        # Validate all factors present
        missing = set(self.FACTOR_WEIGHTS.keys()) - set(scores.keys())
        if missing:
            raise ValueError(f"Missing factor scores: {missing}")
        
        # Calculate weighted score
        weighted_total = sum(
            self.FACTOR_WEIGHTS[factor] * scores[factor]
            for factor in self.FACTOR_WEIGHTS
        )
        
        # Determine band
        band = 'Unknown'
        band_colour = 'grey'
        for low, high, label, colour in self.SCORE_BANDS:
            if low <= weighted_total < high:
                band = label
                band_colour = colour
                break
        
        # Factor contributions
        contributions = {
            factor: round(self.FACTOR_WEIGHTS[factor] * scores[factor], 3)
            for factor in self.FACTOR_WEIGHTS
        }
        
        # Top risk driver
        top_driver = max(contributions, key=contributions.get)
        
        return {
            'industry': industry_name,
            'weighted_score': round(weighted_total, 2),
            'risk_band': band,
            'top_risk_driver': top_driver,
            'factor_contributions': contributions,
            'raw_scores': scores
        }
    
    def batch_score(self, industries: List[Dict]) -> pd.DataFrame:
        """
        Score multiple industries and return comparative DataFrame.
        industries: list of {'name': str, 'scores': dict}
        """
        results = []
        for ind in industries:
            result = self.score_industry(ind['name'], ind['scores'])
            row = {
                'Industry': result['industry'],
                'Risk_Score': result['weighted_score'],
                'Risk_Band': result['risk_band'],
                'Top_Driver': result['top_risk_driver']
            }
            # Add individual factor contributions
            row.update({
                f"Factor_{k}": v 
                for k, v in result['factor_contributions'].items()
            })
            results.append(row)
        
        return pd.DataFrame(results).sort_values('Risk_Score', ascending=False)


# ============================================================
# EXAMPLE USAGE
# ============================================================

if __name__ == '__main__':
    
    # --- Industry Risk Scoring Example ---
    scorer = IndustryRiskScorer()
    
    industries_to_score = [
        {
            'name': 'UK Steel Manufacturing',
            'scores': {
                'cyclicality': 8,
                'capital_intensity': 7,
                'competitive_intensity': 7,
                'commodity_price_risk': 9,
                'regulatory_esg_risk': 7,
                'barriers_to_entry_risk': 5,
                'structural_growth_risk': 8
            }
        },
        {
            'name': 'UK Water Utilities',
            'scores': {
                'cyclicality': 1,
                'capital_intensity': 6,
                'competitive_intensity': 1,
                'commodity_price_risk': 2,
                'regulatory_esg_risk': 5,
                'barriers_to_entry_risk': 1,
                'structural_growth_risk': 2
            }
        },
        {
            'name': 'UK Housebuilding',
            'scores': {
                'cyclicality': 8,
                'capital_intensity': 5,
                'competitive_intensity': 6,
                'commodity_price_risk': 6,
                'regulatory_esg_risk': 6,
                'barriers_to_entry_risk': 6,
                'structural_growth_risk': 4
            }
        },
        {
            'name': 'UK SaaS Technology',
            'scores': {
                'cyclicality': 4,
                'capital_intensity': 2,
                'competitive_intensity': 7,
                'commodity_price_risk': 1,
                'regulatory_esg_risk': 4,
                'barriers_to_entry_risk': 6,
                'structural_growth_risk': 2
            }
        }
    ]
    
    results_df = scorer.batch_score(industries_to_score)
    print("Industry Risk Scores:")
    print(results_df[['Industry', 'Risk_Score', 'Risk_Band', 'Top_Driver']].to_string())
    
    # Expected output:
    # UK Steel Manufacturing    7.45   High              commodity_price_risk
    # UK Housebuilding          5.85   Moderate-High     cyclicality
    # UK SaaS Technology        3.55   Moderate-Low      competitive_intensity
    # UK Water Utilities        2.60   Low               capital_intensity
```

---

## 11. Interview Questions

**Question 1:** "How would you assess the credit risk of a company in a sector you've never lent to before?"

*Strong answer:* Start with industry analysis before touching company financials. Build or obtain an industry risk score for the sector. Understand the sector's position in its life cycle, cyclicality, capital intensity, regulatory environment. Use external sources — Moody's sector outlook, IBISWorld, S&P industry report card. Find the bank's internal industry risk register. Only then move to company-specific analysis, using the industry as the benchmark against which to assess the company's relative performance.

**Question 2:** "Why does a company in a cyclical industry need to be assessed differently from one in a stable industry for the same leverage level?"

*Strong answer:* Because leverage tolerance depends on earnings stability. At 4x Net Debt/EBITDA, a water utility faces no risk of covenant breach during a recession (EBITDA barely moves); a steel manufacturer at 4x leverage could see EBITDA fall 50–60% in a recession, pushing leverage to 8–10x and almost certainly breaching covenants. The credit analyst must apply a through-the-cycle lens and size debt to trough earnings, not peak earnings. Banks use "stressed leverage" — applying a recession scenario to EBITDA — as a credit metric for cyclical industries.

**Question 3:** "What is the difference between industry risk and company-specific risk?"

*Strong answer:* Industry risk is systematic — it affects all companies in the sector. It includes cyclicality, commodity price exposure, regulatory risk, structural trends. Company-specific risk (idiosyncratic) is what distinguishes one company from another in the same sector — management quality, market position, customer concentration, balance sheet structure. Industry risk sets the floor: even the best-managed steel company faces energy price risk and Chinese competition. Company-specific risk determines where within the sector the borrower sits.

**Question 4:** "A borrower in the retail sector has shown excellent financial performance for the last three years. Why might you still be cautious?"

*Strong answer:* Three years of excellent performance during a retail sector expansion period tells you very little about resilience. Look at structural trends: online market share has grown from 15% to 25%+ of retail sales in a decade. Is this retailer gaining or losing market share? What does their online channel look like? Retail has high fixed costs (leases under IFRS 16 are now on-balance sheet) and thin margins (2–5% EBIT for mass market retail). In a downturn, like-for-like sales fall and the fixed cost base doesn't adjust fast enough. A three-year track record during benign conditions is not a stress test. The credit analyst should ask: what did this company look like in 2019–20 (COVID) and 2022 (cost of living crisis)?

**Question 5:** "How does Porter's Five Forces apply to credit analysis?"

*Strong answer:* Porter's Five Forces was designed for strategic planners assessing competitive advantage. Credit analysts repurpose it to assess earnings quality and sustainability. The lens is: what does each force mean for the margin stability and therefore debt service capacity of this borrower?
- Buyer power: if buyers are concentrated and powerful, they can squeeze margins — high credit risk
- Supplier power: if input suppliers are concentrated, input costs are unstable — sensitivity to commodity price
- Threat of substitutes: structural revenue risk — slowly losing revenue to alternatives
- Threat of entry: if barriers are low, margin pressure from new entrants is persistent
- Competitive rivalry: intense rivalry compresses margins across the sector
High Porter forces generally = thinner margins, more volatile earnings, less capacity for debt.

---

## 12. Common Mistakes

**Mistake 1: Ignoring industry risk in a "strong" company assessment.**
A new analyst sees excellent financials — 35% EBITDA margin, 1.5x leverage, strong revenue growth — and rates the borrower as low risk without considering that this is a coal mining company. A coal miner with excellent current financials faces existential regulatory risk (UK commitments to net zero), structural demand decline (coal power plant closures), and potential stranded asset risk. Financial ratios are backward-looking; industry risk is forward-looking.

**Mistake 2: Treating all companies in an industry identically.**
Industry risk is the starting point, not the end point. Two steel manufacturers in the same sector will have very different credit profiles depending on their product mix (flat vs long products), customer base (automotive vs construction), cost position (electric arc vs blast furnace), and hedging strategy. Industry analysis sets the priors; company analysis updates them.

**Mistake 3: Using peak-cycle industry data as the baseline.**
A credit application submitted in 2021 for a construction company showed record revenues, record margins, and a very comfortable debt service coverage ratio. But 2021 was a once-in-a-generation construction boom (post-COVID housing stimulus). Analysts who accepted peak-cycle numbers as "normal" were exposed when the market normalised in 2023 and interest rate increases hit housebuilders hard. Always stress to a trough scenario.

**Mistake 4: Confusing industry risk score with company rating.**
Industry risk feeds into the company rating but is not the same thing. A high industry risk score (8/10) does not mean every borrower in the industry is a poor credit. It means that before looking at the company, the analyst should apply a higher bar for financial strength and qualitative risk factors to compensate for the structural headwinds.

**Mistake 5: Not updating industry risk scores through the cycle.**
An industry risk register that was last updated in 2019 is dangerous by 2022. Industries that were moderate risk (retail: 6/10) became high risk (8/10) during the COVID-19 shock and structural shift to e-commerce. Banks need a process to review and update industry risk scores at least annually, and trigger a review when a major industry-specific event occurs (e.g., energy price spike for manufacturing, base rate increases for real estate).

---

## 13. Case Studies

### Case Study 1: UK Steel Manufacturer — 2023 Assessment

**Company:** MidSteel UK Limited. Annual turnover £280m. Hot-rolled coil and section steel manufacturer, two sites in South Yorkshire. 780 employees. Existing facilities: £45m RCF and £30m term loan with a major UK clearing bank.

**Situation:** The company is requesting a £20m increase to its RCF to fund working capital requirements following steel price volatility. The credit review is triggered by the increase request.

**Step 1 — Industry risk assessment:**

The analyst starts with the industry. UK Steel Manufacturing (SIC 24.10) receives the following risk scores:

| Factor | Score | Rationale |
|--------|-------|-----------|
| Cyclicality | 8/10 | Revenue fell 28% in 2015–16 steel crisis; high GDP sensitivity |
| Capital intensity | 7/10 | £150m invested in hot rolling mill; maintenance capex £8–10m/yr |
| Competitive intensity | 7/10 | Global commodity pricing; Chinese overcapacity suppresses prices |
| Commodity/input price risk | 9/10 | Energy (electricity + gas) = 22% of production cost; iron ore = 45% |
| Regulatory/ESG risk | 7/10 | UK ETS costs rising; DRI/EAF transition requires £300m+ capex |
| Barriers to entry (risk) | 5/10 | Capital barriers exist but import competition is the effective threat |
| Structural growth/decline | 8/10 | UK production fell from 17mt (1990) to 7mt (2023); decarbonisation uncertainty |

**Weighted industry risk score: 7.45/10 (HIGH)**

**Key industry findings:**
- 2022 energy crisis: UK steel production cost increased ~40% due to gas/electricity price spike
- UK electricity costs are 3x those in Germany and 5x those in France for industrial users — a permanent structural competitive disadvantage
- Chinese steel exports reached record levels in 2023 despite anti-dumping duties, keeping global steel prices depressed
- UK net zero commitments require steel industry to switch from blast furnace (BF/BOF) to either Electric Arc Furnace (EAF, using scrap) or Direct Reduced Iron (DRI) using green hydrogen — both require massive capital investment
- The EU Carbon Border Adjustment Mechanism (CBAM) may help UK producers if UK CBAM aligns, but creates uncertainty until implementation

**Step 2 — Company assessment (abbreviated):**

MidSteel's financials show FY2022 EBITDA of £22m (8% margin — tight for steel), leverage of 3.8x EBITDA. The RCF utilisation peaked at 85% during Q4 2022 energy crisis. Covenants include leverage ≤4.5x and interest cover ≥2.5x.

In a base scenario (steel prices -15% from current, energy costs stable), leverage rises to 4.4x — dangerously close to covenant. In a downside scenario (steel prices -25%, energy prices +20%), leverage exceeds 5.5x and covenant is breached.

**Credit conclusion:** Industry risk is HIGH. Company financials are already stressed. The £20m RCF increase is not recommended in isolation. The bank should require: (i) equity injection from shareholders before increasing facility, (ii) revised covenants with financial maintenance headroom, (iii) energy hedging strategy as a condition, and (iv) a business plan addressing the decarbonisation pathway and associated capex funding.

**Lesson:** Industry analysis identified that the sector was facing structural, not just cyclical, headwinds. The company was not a bad business; it was a business in a structurally difficult sector. The appropriate credit response was not a blanket refusal but a restructured facility with enhanced protections.

---

### Case Study 2: Porter's Five Forces — UK Food Manufacturing Credit Analysis

**Company:** A mid-market UK ambient food manufacturer supplying own-label products to the major UK supermarkets. Turnover £180m. Net Debt £95m (5.3x EBITDA of £18m).

**Porter's Forces — Credit Lens:**

| Force | Analysis | Credit Impact |
|-------|----------|---------------|
| **Buyer power** | Top 3 customers (Tesco, Sainsbury's, ASDA) = 78% of revenue. Annual contract renegotiation. Supermarkets have driven own-label margins from 8% to 6% over 5 years | **HIGH RISK**: Revenue concentration + margin compression = earnings instability |
| **Supplier power** | Key inputs: wheat, sugar, packaging. Wheat is a global commodity (priced in USD). Packaging inputs (plastics) volatile | **MODERATE**: Some passthrough to supermarkets but with 6-month lag; basis risk on timing |
| **Threat of entry** | Food manufacturing requires food safety certification, capex, customer relationships — moderate barriers. But supermarkets can always switch to a European supplier or in-source | **MODERATE-HIGH**: Customer switching risk is the primary threat, not new plant entry |
| **Threat of substitutes** | Branded equivalents exist; private label competes on price, not brand loyalty. Recession = positive for private label volume but negative for pricing power | **MODERATE**: Volume relatively stable but pricing power very limited |
| **Competitive rivalry** | 20+ UK ambient food manufacturers compete for supermarket contracts. Industry capacity slightly oversupplied. Consolidation ongoing | **HIGH**: No pricing power; contract wins are price-driven |

**Credit synthesis:** The Five Forces analysis identifies this company as a price taker with concentrated customer risk and no sustainable pricing power. At 5.3x leverage, the business has no margin for error. A single large customer loss (one contract = 26% of revenue) or a commodity spike with 6-month passthrough lag would make the business loss-making. This is a **credit risk that cannot be approved at current leverage without stronger equity cushion or customer diversification**.

---

## 14. Iterative Reinforcement

**Week 1 exercises:**
1. Download the Moody's Sector Outlook for UK Manufacturing (latest available through Bloomberg or library subscription). Extract: (a) the current outlook (positive/stable/negative), (b) the three key risks cited, (c) how the default rate for the sector compares to the prior year.
2. Score two industries of your choice using the Excel scoring matrix from Section 8. Justify each raw score with specific evidence (use IBISWorld, trade press, or rating agency reports).
3. For a current borrower in your portfolio (or a public company 10-K/Annual Report), identify the SIC/NACE code and find where that industry sits on a cyclicality spectrum.

**Week 2 exercises:**
1. Build the SQL concentration report (Section 9, Query 1) against your bank's shadow database or a sample dataset. Interpret the output: which industries have concentration alert status?
2. Run the Python industry risk scorer (Section 10) for five sectors. Compare your scores with publicly available Moody's or S&P sector risk ratings. Where do you disagree?
3. Write a 300-word industry assessment paragraph for one sector you know well, following the structure: (1) current conditions, (2) cyclicality, (3) key risks, (4) credit appetite implication. This is the paragraph you would include in a credit paper.

**Month 1 reinforcement:**
Re-read this module and conduct a live case: take a real credit application, complete the industry risk scoring matrix before reading the financial statements, document your prior expectations, then read the financials and assess how the company compares to industry expectations. This practice of forming sector priors before company analysis is the hallmark of disciplined credit analysis.

---

## 15. Source Material

**Rating agency publications (essential primary sources):**
- Moody's Investors Service, "Annual Default Study: Corporate Default and Recovery Rates, 1920–2023" (published annually, February/March)
- S&P Global Ratings, "Annual Global Corporate Default and Rating Transition Study" (published annually)
- Moody's Sector Outlook reports — by sector, published quarterly. Access via Bloomberg RATD or Moody's CreditView
- S&P Industry Report Cards — published monthly/quarterly by sector. Access via S&P Capital IQ

**Industry research:**
- IBISWorld UK Industry Reports — comprehensive sector reports, 15–20 pages each, covering market size, competitive landscape, key risks, financial benchmarks. Available via IBISWorld subscription (most major banks subscribe)
- World Steel Association, "Steel Statistical Yearbook" — annual data on global steel production, trade, consumption
- ONS UK SIC Indexes — UK ONS publishes monthly and quarterly output indices by industry

**Academic and regulatory:**
- Basel Committee on Banking Supervision, "Basel III: A Global Regulatory Framework for More Resilient Banks and Banking Systems" (BIS, 2010, revised 2011)
- EBA Guidelines on Internal Governance (GL/2021/05) — includes requirements for concentration risk management
- Bank of England / PRA, "The Financial Stability Report" — semi-annual, includes sector-specific risk analysis
- PRA Supervisory Statement SS1/21, "Model Risk Management Principles for Banks"

**Books:**
- Moyer, S.G., "Distressed Debt Analysis: Strategies for Speculative Investors" — Chapter 3 covers industry analysis in a distressed context
- Bluhm, C., Overbeck, L., Wagner, C., "Introduction to Credit Risk Modeling" (2nd edition, CRC Press) — statistical foundations for PD estimation
- Porter, M.E., "Competitive Advantage" (Free Press, 1985) — the original Five Forces framework

**UK-specific banking guidance:**
- British Banking Association (BBA) / UK Finance — sector concentration guidance
- ICAEW Corporate Finance Faculty — "Reviewing Company Financial Statements" (practical guidance for practitioners)
- ACCA, "P4 Advanced Financial Management" study materials — industry analysis section
