# M15 — Basel III: Post-GFC Reforms and the New Capital Landscape

---

## 1. Business Purpose

Basel III is not a single document but an evolving package of reforms introduced by the Basel Committee on Banking Supervision (BCBS) between 2010 and 2017 in response to the catastrophic failures exposed by the 2008 Global Financial Crisis. For a credit risk analyst in a commercial or corporate bank, Basel III is the regulatory environment you operate within every day. It determines how much capital a bank must hold, how that capital must be composed, what liquidity buffers must be maintained, and — since 2023 — how internal models interact with standardised approaches through the output floor.

### Why Basel III Was Necessary

Basel II failed on multiple dimensions simultaneously during the GFC:

1. **Capital quality**: Banks held capital that appeared adequate on paper but was composed of hybrid instruments that could not absorb losses during stress. Preference shares and subordinated debt counted as capital but banks remained reluctant to use it.

2. **Capital quantity**: Tier 1 ratios of 8–10% at major banks proved insufficient when asset values fell 20–40% during the crisis. Simple leverage (assets/equity) exceeded 30:1 at several major institutions.

3. **No liquidity standard**: Basel II had no quantitative minimum liquidity requirement. The failure of Northern Rock (2007), Bear Stearns (2008), and Lehman Brothers (2008) was fundamentally a liquidity crisis that became a solvency crisis.

4. **Procyclicality**: Capital requirements fell during booms (improving PDs) and rose during busts (deteriorating PDs), amplifying the cycle.

5. **Interconnectedness**: Counterparty credit risk in over-the-counter derivatives was severely under-capitalised. When Lehman failed, derivative counterparties faced simultaneous mark-to-market losses and collateral calls.

Basel III addressed each of these with targeted reforms. The complete framework consists of two core BIS publications and numerous subsequent amendments.

### Business Relevance: How Basel III Changes Commercial Banking

Basel III directly affects:
- **Loan pricing**: Higher capital requirements mean higher returns are needed; this raises the hurdle rate for new lending
- **Product availability**: Products that consume high capital (long-dated loans, revolvers with high CCF, complex structured products) become less attractive or more expensive
- **Capital allocation**: Banks manage lending volumes by sector, geography, and product through the lens of capital efficiency (RWA return)
- **Funding costs**: Higher capital and liquidity requirements increase the cost of a bank's liabilities, which flows through to borrower pricing
- **Balance sheet structure**: The leverage ratio creates a non-risk-sensitive backstop that constrains low-risk-weight lending (e.g., government bonds, AAA supranational) at high volumes

---

## 2. Accounting Concepts

### Capital Quality — The CET1 Revolution

Basel III fundamentally redefined regulatory capital. The key insight from the GFC was that quantity is meaningless if quality is insufficient. Basel III created a strict hierarchy:

**Common Equity Tier 1 (CET1) — Highest Quality**
- Ordinary shares (and equivalent for non-joint-stock entities)
- Share premium accounts arising from CET1 instruments
- Retained earnings
- Accumulated Other Comprehensive Income (AOCI — includes unrealised gains/losses on AFS securities)
- Other disclosed reserves
- Minority interests (subject to restrictions)

*CET1 Deductions*:
- Goodwill and other intangible assets (net of deferred tax)
- Deferred tax assets that rely on future profitability
- Defined benefit pension fund deficits
- Investments in own CET1 instruments
- Reciprocal cross-holdings in other banks' CET1
- Significant investments in financial institutions (above 10% threshold)
- IRB shortfall of provisions to EL (50% deducted from CET1 under Basel III vs. 50/50 split under Basel II)

**Additional Tier 1 (AT1) — Going-Concern Absorbers**
- Perpetual, non-cumulative instruments
- Must include full discretion to cancel distributions
- Must have principal loss absorption (write-down or conversion to equity) triggered at CET1 < 5.125%
- Examples: AT1 contingent convertible bonds (CoCos)

**Tier 2 (T2) — Gone-Concern Capital**
- Subordinated debt, minimum original maturity 5 years
- Cannot have credit-sensitive coupons or step-ups that incentivise redemption
- Amortised out of capital at straight-line over final 5 years
- General provisions (SA banks only, up to 1.25% of credit RWA)

### Profit and Loss Impact of Basel III Capital Rules

Higher capital requirements have direct P&L implications:
- CET1 deductions reduce distributable profits (higher dividend hurdle)
- AT1 coupon payments are distributions, not tax-deductible interest (most jurisdictions)
- Capital buffers must be met with CET1 — during stress when buffers are breached, banks face automatic dividend/bonus restrictions (maximum distributable amount, MDA)

### Leverage Ratio Accounting

The leverage ratio uses balance sheet exposure, not risk-weighted assets:
```
Leverage Ratio = Tier 1 Capital / Total Exposure Measure
```

Total Exposure = On-balance-sheet assets + Derivative exposures (replacement cost + PFE add-on) + Securities Financing Transaction exposures + Off-balance-sheet items × 100% CCF (no exemption for low-risk off-BS items).

This means the accounting consolidation boundary matters — SPEs and off-balance-sheet vehicles that were deconsolidated under Basel II are included in the leverage ratio exposure measure where the bank retains the economic exposure.

---

## 3. Financial Concepts

### The Capital Stack and Minimum Ratios

Basel III minimum requirements (fully phased in from 2019):

| Capital Tier | Minimum Ratio | Composition |
|---|---|---|
| CET1 | 4.5% of RWA | Common equity only |
| Tier 1 | 6.0% of RWA | CET1 + AT1 |
| Total Capital | 8.0% of RWA | T1 + T2 |

These are minimums. Buffers are layered on top:

### Capital Buffers

**Capital Conservation Buffer (CCB): +2.5% CET1**
- Permanently required above the 4.5% minimum
- When breached, automatic restrictions on dividends, bonus payments, and AT1 coupon payments (MDA trigger)
- Effective combined CET1 minimum with CCB: 7.0%
- Reference: BCBS "Basel III: A global regulatory framework", December 2010, §122–142

**Countercyclical Capital Buffer (CCyB): 0%–2.5% CET1 (national discretion)**
- Set by national macroprudential authorities (e.g., PRA/FPC in UK, ESRB/NCAs in EU)
- Applied to credit exposures in each jurisdiction — a UK bank with 60% UK exposures faces 60% of UK CCyB rate
- Activated when credit-to-GDP ratio is above trend (Basel indicator) or other systemic risk signals
- The UK CCyB was: 0% from 2020 (COVID), rising to 2.0% by July 2023, maintained at 2.0% as of 2025
- Reference: BCBS "Guidance for national authorities operating the countercyclical capital buffer", December 2010

**G-SIB Surcharge: 1.0%–3.5% CET1 (additional loss absorbency)**
- Global Systemically Important Banks, determined by annual scoring methodology
- Five indicators: size, cross-jurisdictional activity, interconnectedness, substitutability, complexity
- 2024 G-SIB surcharge buckets: JPMorgan (2.5%), HSBC, Citi (2.0%), BNP Paribas, Deutsche Bank (1.5%), many others (1.0%)
- Reference: BCBS "Global systemically important banks: updated assessment methodology and the higher loss absorbency requirement", July 2013

**D-SIB Surcharge: Set by national supervisors (typically 0.5%–3.0%)**
- Domestic Systemically Important Banks
- UK: PRA identifies 5 D-SIBs with surcharges of 1.0%–3.0%
- EU: NCAs set D-SIB buffers, typically 0.25%–2.0%
- Also known as O-SII (Other Systemically Important Institutions) in EU CRD terminology

**Maximum Illustrative Total CET1 Requirement (large international bank)**:
```
4.5% (min) + 2.5% (CCB) + 2.0% (CCyB) + 2.0% (G-SIB) + Pillar 2A 
≈ 11%–13% CET1 required
```

Actual large UK banks target 13–15% CET1 to maintain management buffers above regulatory minima.

### Leverage Ratio

```
Leverage Ratio = Tier 1 Capital / Exposure Measure ≥ 3%
```

The 3% minimum (BCBS) is a non-risk-based backstop. Key features:
- No risk-weighted denominator — all exposures treated equally
- Off-balance-sheet exposures included at 100% CCF (unlike SA/IRB)
- On-balance-sheet netting limited: only master netting agreements for derivatives; no general balance sheet netting
- Derivatives: SA-CCR (Standardised Approach for Counterparty Credit Risk) exposure measure
- Securities financing transactions: gross accounting value + haircut add-on

For corporate lending, the leverage ratio is usually non-binding for credit-intensive banks (who have high RWA per pound of exposure). It binds most tightly for trading-book-heavy banks or those with large low-RW portfolios (government bonds, covered bonds, mortgage portfolios).

UK additional requirement: G-SIBs must maintain leverage ratio 3.25% (PLAC component) plus leverage CCyB.

### Liquidity Requirements

**Liquidity Coverage Ratio (LCR)**
```
LCR = High-Quality Liquid Assets (HQLA) / Net Cash Outflows over 30 days ≥ 100%
```

HQLA composition:
- Level 1: Cash, central bank reserves, 0% risk weight sovereign debt — no haircut, unlimited
- Level 2A: 20% risk weight sovereign, covered bonds AAA rated — 15% haircut, max 40% of HQLA
- Level 2B: Certain equity, non-financial corporate bonds, certain RMBS — 25–50% haircut, max 15% of HQLA

Net Cash Outflows = Stressed outflows − min(Inflows, 75% × Outflows)

Key stressed outflow rates for commercial banks:
- Retail deposits (insured): 3–5% run-off
- Retail deposits (less stable): 10% run-off
- Operational wholesale deposits: 25%
- Non-operational wholesale deposits: 40%
- Committed credit facilities to corporates: 10% drawdown
- Committed liquidity facilities to corporates: 30% drawdown
- Secured funding (repo): varies by collateral quality

Reference: BCBS "Basel III: The Liquidity Coverage Ratio and liquidity risk monitoring tools", January 2013

**Net Stable Funding Ratio (NSFR)**
```
NSFR = Available Stable Funding (ASF) / Required Stable Funding (RSF) ≥ 100%
```

ASF: Liabilities weighted by stability (T1 capital = 100%, retail deposits = 90–95%, wholesale > 1yr = 50–100%)
RSF: Assets weighted by liquidity need (HQLA = 0–15%, retail loans < 1yr = 50–85%, corporate loans > 1yr = 100%)

NSFR constrains maturity transformation — funding long-term assets with short-term liabilities is penalised.

Reference: BCBS "Basel III: The Net Stable Funding Ratio", October 2014

### The Output Floor — Basel III Finalisation (Basel IV)

**BCBS "Basel III: Finalising post-crisis reforms", December 2017** introduced the most consequential reform for IRB banks: the output floor.

```
RWA_floor = max(RWA_internal, 72.5% × RWA_SA)
```

Where RWA_SA is computed using the revised Basel III standardised approaches (not the original Basel II SA). The floor means no IRB bank can hold less than 72.5% of the capital that SA would produce.

Phase-in schedule:
- 2025: 50% floor
- 2026: 55%
- 2027: 60%
- 2028: 65%
- 2029: 70%
- 2030: 72.5% (final)

**Why does this matter?** Banks with sophisticated AIRB models often produce IRB RWA well below SA RWA — sometimes 40–50% of SA. The output floor directly limits this advantage. For corporate lending portfolios where IRB RWA is 40–60% of SA RWA, the floor could increase required capital by 20–40%.

**European Implementation: CRR3 (Capital Requirements Regulation 3)**
- EU published CRR3 in November 2023, effective January 2025
- Includes output floor, revised SA for credit risk, new market risk framework (FRTB)
- Some EU-specific adjustments: SME supporting factor retained, infrastructure lending factor

**UK Implementation: PRA Near-Final Rules (CP16/22 and PS17/23)**
- PRA published near-final rules in December 2023
- Implementation from January 2026 (one year behind EU)
- UK maintained national discretions on some elements

---

## 4. Statistical Concepts

### RWA Variability and the Motivation for the Output Floor

Academic and regulatory studies (BCBS QIS studies 2012–2017) found dramatic variability in IRB RWA for identical portfolios across banks. The BCBS Regulatory Consistency Assessment Programme (RCAP) revealed:

- For a standardised hypothetical portfolio of 50 corporate exposures, RWA varied by ±50% across banks using AIRB
- Banks with lower RWA were not necessarily taking less risk — they had more optimistic model assumptions
- Correlation between IRB RWA density (RWA/EAD) and realised loss rates was weak

This motivated the output floor: if internal models can produce RWA 40% below SA for the same portfolio, the floor captures the minimum defensible capital level.

### Countercyclical Buffer Calibration

The CCyB is calibrated using the credit-to-GDP gap (the difference between the actual credit-to-GDP ratio and its long-run trend, estimated by HP filter with lambda = 400,000 for quarterly data). The BCBS "buffer guide" maps:

```
Buffer guide = 0%    if gap < 2%
Buffer guide = 2.5% × (gap − 2%) / 8%  if 2% ≤ gap ≤ 10%
Buffer guide = 2.5%  if gap > 10%
```

National authorities use this as a guide, not a mechanical rule. The UK FPC uses a broader set of indicators including household debt service ratios, corporate leverage, bank funding spreads, and macroeconomic forecasts.

### Stress Testing and Capital Distribution

Pillar 2 under Basel III requires banks to conduct Internal Capital Adequacy Assessment Process (ICAAP) stress tests. Typical approach:

1. **Baseline scenario**: Central economic forecast (e.g., 2% GDP growth, 4% unemployment)
2. **Stress scenario 1**: Severe UK recession (GDP −5%, unemployment 9%, house prices −30%)
3. **Stress scenario 3**: Global trade war / stagflation
4. **Reverse stress test**: Find the scenario that causes capital to fall below regulatory minimum

Capital depletion is modelled via:
- PD migration (ratings downgrade across portfolio)
- LGD shock (collateral values fall)
- EAD shock (borrowers draw on committed lines)
- Operating leverage (revenues fall faster than costs in stress)
- Market risk losses (trading book and AFS portfolio marks)

Banks model the CET1 ratio at each quarter over a 3-year horizon. The PRA uses its own stress test (Annual Cyclical Scenario) to validate.

### Leverage Ratio as a Distribution Tail Risk Measure

The leverage ratio is not risk-sensitive, but it functions as a hard cap on balance sheet expansion financed by debt. For a bank with 5% CET1 leverage ratio, maximum assets = 20× equity. During the GFC, leverage ratios for European banks implicitly exceeded 40:1 (when off-balance-sheet vehicles were included). The 3% minimum implies maximum 33:1 leverage on Tier 1 capital — a significant constraint on wholesale-funded institutions.

---

## 5. Regulatory Framework

### Core BIS Publications

1. **BCBS. "Basel III: A global regulatory framework for more resilient banks and banking systems." December 2010, revised June 2011.** https://www.bis.org/publ/bcbs189.htm
   - Capital quality (CET1/AT1/T2 definitions), quantity (minimum ratios), capital buffers (CCB, CCyB, G-SIB), leverage ratio

2. **BCBS. "Basel III: International framework for liquidity risk measurement, standards and monitoring." December 2010.** https://www.bis.org/publ/bcbs188.htm
   - LCR and NSFR framework, monitoring tools

3. **BCBS. "Basel III: The Liquidity Coverage Ratio and liquidity risk monitoring tools." January 2013.** https://www.bis.org/publ/bcbs238.htm
   - Revised and finalised LCR (supersedes December 2010 liquidity text for LCR)

4. **BCBS. "Basel III: The Net Stable Funding Ratio." October 2014.** https://www.bis.org/publ/bcbs295.htm
   - Finalised NSFR

5. **BCBS. "Basel III: Finalising post-crisis reforms." December 2017.** https://www.bis.org/publ/d424.htm
   - Output floor (72.5%), revised SA for credit risk, new operational risk framework, FRTB (market risk), revised CVA framework, revised securitisation framework, leverage ratio final rule
   - Known informally as "Basel IV" though the BCBS does not use this term

### EU Implementation: CRR3 / CRD VI

Regulation (EU) 2024/1623 (CRR3) and Directive (EU) 2024/1619 (CRD VI) published June 2024, applicable from January 2025:
- Implements output floor at EU level
- Revised standardised approach for credit risk (new corporate risk weights, due diligence requirements)
- FRTB: new market risk capital framework replacing VaR
- Removes Basel II-era IRB concessions (removal of IRB for high-default portfolios)
- Retains SME supporting factor (0.7619× for SME < €1.5M exposure; for larger SMEs, risk weight reduction)

### UK PRA Implementation

PRA Consultation Paper CP16/22 (November 2022) and Policy Statement PS17/23 (December 2023):
- Implementation date: January 2026
- Near-final rules across: credit risk (SA and IRB), operational risk, CVA, market risk (FRTB), output floor
- PRA retained Pillar 2A for bank-specific add-ons above Pillar 1
- UK SME supporting factor: retained as in EU

### TLAC and MREL — Resolution Capital

Total Loss Absorbing Capacity (TLAC): BCBS/FSB requirement for G-SIBs to hold minimum 16% of RWA (rising to 18%) and 6% of leverage exposure in instruments that can absorb losses in resolution.

Minimum Requirement for Eligible Liabilities (MREL): EU/UK implementation of TLAC for resolution-relevant banks. Typically 2× P1 + P2A RWA requirement for large banks.

MREL-eligible instruments: CET1, AT1, T2, senior non-preferred debt (HoldCo MREL), senior preferred debt (limited eligibility).

This affects credit risk analysts because MREL costs are allocated back to business lines — adding to the hurdle rate for new lending.

---

## 6. Data Required

### Capital Reporting Data Requirements

| Data Element | Purpose | System Source | Frequency |
|---|---|---|---|
| CET1 instruments details | Capital eligibility verification | Capital management system | Monthly |
| Intangible assets by category | CET1 deduction | General ledger / finance | Monthly |
| DTA amount and type | Threshold deduction calculation | Tax / finance | Quarterly |
| AT1/T2 instrument terms | Eligibility and maturity amortisation | Treasury/capital system | Monthly |
| RWA by exposure class and approach (SA/IRB) | Capital ratio denominator | Credit risk engine | Daily/monthly |
| Country-level credit exposures | CCyB calculation | Exposure management | Monthly |
| G-SIB scoring indicators | G-SIB bucket assignment | Finance / group reporting | Annual (Dec) |

### LCR Data Requirements

| Data Element | Outflow Rate | System Source |
|---|---|---|
| Retail deposit balance by account type (insured/uninsured) | 3%–10% | Retail banking platform |
| Wholesale deposit balance by client type and tenor | 25%–100% | Treasury management system |
| Committed credit facility undrawn by borrower type | 10%–40% | Loan origination system |
| Securities in HQLA portfolio (Level 1, 2A, 2B) | Inflow | Treasury / collateral management |
| Repo maturity profile | Outflow if maturing | Securities finance system |
| Collateral inflows from repo/lending | Inflow | Securities finance system |

### NSFR Data Requirements

| Data Element | ASF/RSF Weight | System Source |
|---|---|---|
| Customer deposit balance by residual maturity | 90%–100% ASF | Core banking |
| Wholesale funding by maturity bucket (< 6m, 6–12m, > 1yr) | 0%–100% ASF | Treasury |
| Loan portfolio by residual maturity and asset class | 50%–100% RSF | Loan management |
| HQLA portfolio balance | 0%–15% RSF | Treasury |
| Off-balance-sheet commitments | 5%–10% RSF | Loan origination |

---

## 7. How Analysts Actually Work

### Capital Planning Cycle (Annual)

Each October–December, banks run a capital planning exercise for the following year:

1. **Business forecast**: Lines of business submit balance sheet growth plans (lending volumes by product and geography, trading book budgets)

2. **RWA forecast**: Capital team translates balance sheet plans into RWA using current risk weights / IRB parameters. Key driver: estimated average risk weight per product

3. **Capital generation forecast**: Finance projects retained earnings, dividend policy, AT1 issuance plans, MREL refinancing

4. **Buffer management**: Target capital ratio = regulatory minimum + CCyB + G-SIB + Pillar 2A + management buffer (typically 100–200bps above regulatory minimum)

5. **Stress test**: Apply supervisory stress scenarios to forecast P&L and RWA. Check if capital ratio remains above hurdle throughout 3-year horizon

6. **ICAAP / ILAAP**: Formal documents submitted to regulator (PRA, ECB) annually

### Credit Risk Analyst — Basel III Day-to-Day Tasks

**Facility Approval Support**
- Compute facility RWA under post-output-floor framework: max(IRB RWA, 72.5% × SA RWA)
- Calculate Return on RWA after MREL and liquidity costs:
  ```
  RAROC = (Margin − Funding − Expected Loss − Operating Cost − MREL cost) 
          / (RWA × CET1 target)
  ```
- Flag if facility breaches leverage ratio (for low-risk-weight exposures)
- Check LCR impact: undrawn corporate commitments use 10% outflow rate

**Monthly Capital Monitoring**
- Track CET1 ratio vs. all regulatory requirements (MDA trigger buffer especially)
- Produce RWA waterfall: new originations, repayments, rating migrations, model changes, FX
- Monitor CCyB changes in jurisdictions where bank is active
- Produce leverage ratio and LCR/NSFR reporting

**Output Floor Impact Assessment**
- Compare IRB RWA vs. 72.5% × revised SA RWA by portfolio segment
- Identify "floor-constrained" portfolios (low-risk, low-PD lending where IRB < 72.5% SA)
- Advise on pricing adjustments: if output floor becomes binding, effective capital increases → repricing required

---

## 8. Excel Implementation

### Capital Ratio Dashboard

```excel
'=== CAPITAL RATIO CALCULATOR ===

'--- Capital Components (£M) ---
B2: CET1_instruments        = 5,200
B3: Retained_earnings       = 3,100
B4: AOCI                    =   150
B5: Less_Goodwill           =  (800)
B6: Less_DTA_deduction      =  (200)
B7: Less_IRB_shortfall_50pct=  (150)
B8: CET1_Total              = =SUM(B2:B7)   ' = 7,300

B10: AT1_instruments        =   500
B11: Tier1_Total            = =B8+B10        ' = 7,800

B13: T2_instruments         =   900
B14: Total_Capital          = =B11+B13       ' = 8,700

'--- RWA ---
B17: RWA_credit_risk        = 65,000
B18: RWA_market_risk        = 3,500
B19: RWA_operational_risk   = 8,000
B20: RWA_CVA                = 1,200
B21: Total_RWA              = =SUM(B17:B20)  ' = 77,700

'--- Capital Ratios ---
B24: CET1_ratio             = =B8/B21        ' = 9.40%
B25: Tier1_ratio            = =B11/B21       ' = 10.04%
B26: Total_Capital_ratio    = =B14/B21       ' = 11.20%

'--- Regulatory Minima and Buffers ---
B29: CET1_minimum           = 0.045
B30: CCB                    = 0.025
B31: CCyB_rate              = 0.020          ' current UK rate
B32: GSIB_surcharge         = 0.015
B33: Pillar2A               = 0.018          ' bank-specific
B34: Total_CET1_requirement = =SUM(B29:B33)  ' = 12.3%

'--- Headroom / Shortfall ---
B37: CET1_headroom          = =B24-B34       ' = 9.40% - 12.3% = DEFICIT
'In this example the bank is below its total buffer stack
'MDA trigger: check which buffers are breached

'--- MDA (Maximum Distributable Amount) Trigger ---
'CET1 must exceed: minimum + CCB + CCyB (Pillar 2A is separate)
B40: MDA_trigger            = =B29+B30+B31   ' = 9.0%
B41: Is_MDA_restricted      = =IF(B24<B40,"YES - RESTRICT DISTRIBUTIONS","NO")

'--- Leverage Ratio ---
B44: Tier1_capital          = =B11
B45: On_BS_exposures        = 125,000
B46: Derivative_exposures   =  15,000        ' SA-CCR
B47: SFT_exposures          =  12,000
B48: OBS_exposures          =   8,000        ' CCF = 100%
B49: Total_exposure         = =SUM(B45:B48)  ' = 160,000
B50: Leverage_ratio         = =B44/B49       ' = 4.88% (above 3% min)

'--- LCR Simplified ---
B53: Level1_HQLA            = 12,000
B54: Level2A_HQLA_net       =  2,000         ' after 15% haircut
B55: Level2B_HQLA_net       =    800         ' after 25-50% haircut
B56: Total_HQLA             = =B53+B54+B55

B59: Gross_outflows_30d     = 18,500
B60: Capped_inflows         = =MIN(0.75*B59, 5000)
B61: Net_outflows           = =B59-B60       ' = 13,500

B64: LCR                    = =B56/B61       ' = 113.3% (above 100%)
```

### Output Floor Calculator

```excel
'=== OUTPUT FLOOR IMPACT ANALYSIS ===

'Per portfolio segment:
Column A: Segment name
Column B: IRB_RWA
Column C: SA_RWA (revised Basel III SA)
Column D: Floor_RWA = =MAX(B2, 0.725*C2)
Column E: Floor_binding = =IF(D2>B2,"YES","NO")
Column F: Incremental_RWA = =MAX(D2-B2,0)
Column G: Additional_capital = =F2*0.08      ' at 8% total capital ratio

'Portfolio totals:
B_total: =SUM(B:B)
D_total: =SUM(D:D)
F_total: =SUM(F:F)
G_total: =SUM(G:G)

'Floor impact ratio:
Floor_uplift_pct: =(D_total - B_total)/B_total
```

---

## 9. SQL Implementation

```sql
-- ============================================================
-- Basel III Capital Ratio and Buffer Stack Calculator
-- SQL Server Implementation
-- ============================================================

-- Table: capital_components
-- Columns: report_date, component_name, component_type (CET1/AT1/T2/DEDUCTION), 
--          amount_gbp_m, eligibility_flag

-- Table: rwa_components
-- Columns: report_date, risk_type (credit/market/operational/CVA/other),
--          approach (SA/IRB/IMA/BIA), rwa_gbp_m

-- Table: regulatory_requirements
-- Columns: report_date, bank_id, cet1_minimum, ccb, ccyb, gsib_surcharge,
--          dsib_surcharge, pillar2a_cet1

-- ============================================================
-- STEP 1: Capital Stack
-- ============================================================

WITH capital_stack AS (
    SELECT
        report_date,
        SUM(CASE WHEN component_type = 'CET1' AND eligibility_flag = 1
                 THEN amount_gbp_m ELSE 0 END)
        - SUM(CASE WHEN component_type = 'DEDUCTION_CET1'
                   THEN amount_gbp_m ELSE 0 END)
            AS cet1_gbp_m,

        SUM(CASE WHEN component_type = 'AT1' AND eligibility_flag = 1
                 THEN amount_gbp_m ELSE 0 END) AS at1_gbp_m,

        SUM(CASE WHEN component_type = 'T2' AND eligibility_flag = 1
                 THEN amount_gbp_m ELSE 0 END) AS t2_gbp_m
    FROM capital_components
    GROUP BY report_date
),

-- ============================================================
-- STEP 2: Total RWA
-- ============================================================

total_rwa AS (
    SELECT
        report_date,
        SUM(rwa_gbp_m) AS total_rwa_gbp_m,
        SUM(CASE WHEN risk_type = 'credit' THEN rwa_gbp_m ELSE 0 END) AS credit_rwa,
        SUM(CASE WHEN risk_type = 'market' THEN rwa_gbp_m ELSE 0 END) AS market_rwa,
        SUM(CASE WHEN risk_type = 'operational' THEN rwa_gbp_m ELSE 0 END) AS opri_rwa,
        SUM(CASE WHEN risk_type = 'cva' THEN rwa_gbp_m ELSE 0 END) AS cva_rwa
    FROM rwa_components
    GROUP BY report_date
),

-- ============================================================
-- STEP 3: Capital Ratios
-- ============================================================

capital_ratios AS (
    SELECT
        cs.report_date,
        cs.cet1_gbp_m,
        cs.at1_gbp_m,
        cs.t2_gbp_m,
        cs.cet1_gbp_m + cs.at1_gbp_m          AS tier1_gbp_m,
        cs.cet1_gbp_m + cs.at1_gbp_m
            + cs.t2_gbp_m                      AS total_capital_gbp_m,
        rw.total_rwa_gbp_m,
        rw.credit_rwa,
        rw.market_rwa,
        rw.opri_rwa,
        rw.cva_rwa,

        cs.cet1_gbp_m / rw.total_rwa_gbp_m           AS cet1_ratio,
        (cs.cet1_gbp_m + cs.at1_gbp_m)
            / rw.total_rwa_gbp_m                       AS tier1_ratio,
        (cs.cet1_gbp_m + cs.at1_gbp_m + cs.t2_gbp_m)
            / rw.total_rwa_gbp_m                       AS total_capital_ratio
    FROM capital_stack cs
    JOIN total_rwa rw ON cs.report_date = rw.report_date
),

-- ============================================================
-- STEP 4: Buffer Stack and Headroom
-- ============================================================

buffer_analysis AS (
    SELECT
        cr.*,
        rr.cet1_minimum,
        rr.ccb,
        rr.ccyb,
        rr.gsib_surcharge,
        rr.dsib_surcharge,
        rr.pillar2a_cet1,

        -- Total CET1 requirement (all buffers)
        rr.cet1_minimum + rr.ccb + rr.ccyb
            + rr.gsib_surcharge + rr.dsib_surcharge
            + rr.pillar2a_cet1                   AS total_cet1_requirement,

        -- MDA trigger (minimum + CCB + CCyB only)
        rr.cet1_minimum + rr.ccb + rr.ccyb       AS mda_trigger_ratio,

        -- Headroom
        cr.cet1_ratio - (rr.cet1_minimum + rr.ccb + rr.ccyb
                         + rr.gsib_surcharge + rr.dsib_surcharge
                         + rr.pillar2a_cet1)     AS cet1_headroom,

        -- MDA restriction flag
        CASE WHEN cr.cet1_ratio < (rr.cet1_minimum + rr.ccb + rr.ccyb)
             THEN 'MDA RESTRICTED'
             ELSE 'UNRESTRICTED' END              AS distribution_status
    FROM capital_ratios cr
    JOIN regulatory_requirements rr
        ON cr.report_date = rr.report_date
)

-- ============================================================
-- STEP 5: Final Output
-- ============================================================

SELECT
    report_date,
    ROUND(cet1_gbp_m, 0)                    AS cet1_m,
    ROUND(tier1_gbp_m, 0)                   AS tier1_m,
    ROUND(total_capital_gbp_m, 0)           AS total_cap_m,
    ROUND(total_rwa_gbp_m, 0)               AS total_rwa_m,
    ROUND(cet1_ratio * 100, 2)              AS cet1_pct,
    ROUND(tier1_ratio * 100, 2)             AS tier1_pct,
    ROUND(total_capital_ratio * 100, 2)     AS total_cap_pct,
    ROUND(total_cet1_requirement * 100, 2)  AS cet1_requirement_pct,
    ROUND(cet1_headroom * 100, 2)           AS cet1_headroom_pct,
    ROUND(mda_trigger_ratio * 100, 2)       AS mda_trigger_pct,
    distribution_status
FROM buffer_analysis
ORDER BY report_date DESC;

-- ============================================================
-- Output Floor Analysis by Portfolio
-- ============================================================

-- Table: portfolio_rwa
-- Columns: report_date, segment, irb_rwa, sa_rwa_revised, ead

SELECT
    report_date,
    segment,
    ROUND(ead / 1e6, 1)                                 AS ead_m,
    ROUND(irb_rwa / 1e6, 1)                             AS irb_rwa_m,
    ROUND(sa_rwa_revised / 1e6, 1)                      AS sa_rwa_m,
    ROUND(sa_rwa_revised * 0.725 / 1e6, 1)              AS floor_threshold_m,
    ROUND(GREATEST(irb_rwa, sa_rwa_revised * 0.725)
          / 1e6, 1)                                      AS effective_rwa_m,
    CASE WHEN irb_rwa < sa_rwa_revised * 0.725
         THEN 'FLOOR BINDING'
         ELSE 'IRB LOWER' END                            AS floor_status,
    ROUND((GREATEST(irb_rwa, sa_rwa_revised * 0.725)
           - irb_rwa) / 1e6, 1)                          AS incremental_rwa_m,
    ROUND(irb_rwa / ead * 100, 1)                        AS irb_rw_density_pct,
    ROUND(sa_rwa_revised / ead * 100, 1)                 AS sa_rw_density_pct
FROM portfolio_rwa
WHERE report_date = (SELECT MAX(report_date) FROM portfolio_rwa)
ORDER BY incremental_rwa_m DESC;
```

---

## 10. Python Implementation

```python
"""
Basel III Capital Framework Calculator
References:
  - BCBS "Basel III: A global regulatory framework" (Dec 2010, rev Jun 2011)
  - BCBS "Basel III: Finalising post-crisis reforms" (Dec 2017)
  - CRR3 Regulation (EU) 2024/1623

Author: Credit Risk Academy — M15
"""

from dataclasses import dataclass, field
from typing import Optional
import pandas as pd
import numpy as np


@dataclass
class CapitalComponents:
    """Regulatory capital components under Basel III."""
    # CET1 items
    ordinary_shares: float = 0.0
    retained_earnings: float = 0.0
    aoci: float = 0.0
    other_reserves: float = 0.0
    minority_interests: float = 0.0
    # CET1 deductions
    goodwill_and_intangibles: float = 0.0
    dta_above_threshold: float = 0.0
    irb_el_shortfall: float = 0.0          # 100% deducted from CET1 in Basel III
    other_cet1_deductions: float = 0.0
    # AT1 items
    at1_instruments: float = 0.0
    # T2 items
    t2_instruments: float = 0.0
    general_provisions_sa: float = 0.0     # SA banks only, max 1.25% credit RWA


@dataclass
class RWAComponents:
    """Risk-Weighted Asset components."""
    credit_risk_irb: float = 0.0
    credit_risk_sa: float = 0.0
    market_risk: float = 0.0
    operational_risk: float = 0.0
    cva: float = 0.0
    other: float = 0.0


@dataclass
class RegulatoryRequirements:
    """Regulatory capital requirements for a specific bank."""
    cet1_minimum: float = 0.045           # §52 of Dec 2010 text
    tier1_minimum: float = 0.060
    total_capital_minimum: float = 0.080
    ccb: float = 0.025                    # Capital Conservation Buffer
    ccyb: float = 0.020                   # Countercyclical (jurisdiction-weighted)
    gsib_surcharge: float = 0.0           # G-SIB additional loss absorbency
    dsib_surcharge: float = 0.0           # D-SIB surcharge
    pillar2a_cet1: float = 0.0            # Pillar 2A CET1 component


@dataclass
class LiquidityData:
    """LCR and NSFR input data."""
    # HQLA
    level1_hqla: float = 0.0
    level2a_hqla_gross: float = 0.0       # before 15% haircut
    level2b_hqla_gross: float = 0.0       # before 25-50% haircut
    # LCR outflows (30-day stress)
    insured_retail_deposits: float = 0.0
    less_stable_retail_deposits: float = 0.0
    operational_wholesale: float = 0.0
    non_operational_wholesale: float = 0.0
    committed_credit_facilities_corp: float = 0.0
    committed_liquidity_facilities: float = 0.0
    # LCR inflows
    retail_loan_inflows: float = 0.0
    wholesale_inflows: float = 0.0


class BaselIIICapitalCalculator:
    """
    Basel III capital adequacy framework.
    References: BCBS December 2010 (capital) and December 2017 (finalisation).
    """

    # LCR outflow rates per BCBS Jan 2013 (bcbs238)
    LCR_OUTFLOW_RATES = {
        "insured_retail": 0.03,
        "less_stable_retail": 0.10,
        "operational_wholesale": 0.25,
        "non_operational_wholesale": 0.40,
        "committed_credit_corp": 0.10,
        "committed_liquidity": 0.30,
    }

    # HQLA haircuts per BCBS Jan 2013
    HQLA_HAIRCUTS = {
        "level1": 0.00,
        "level2a": 0.15,
        "level2b_corporate_bond": 0.50,
        "level2b_equity": 0.50,
        "level2b_rmbs": 0.25,
    }

    # Output floor (72.5% final; phase-in per Dec 2017)
    OUTPUT_FLOOR_FINAL = 0.725
    OUTPUT_FLOOR_PHASE_IN = {
        2025: 0.50, 2026: 0.55, 2027: 0.60,
        2028: 0.65, 2029: 0.70, 2030: 0.725
    }

    def compute_capital(self, components: CapitalComponents) -> dict:
        """Compute CET1, Tier 1, Total Capital."""
        cet1 = (
            components.ordinary_shares
            + components.retained_earnings
            + components.aoci
            + components.other_reserves
            + components.minority_interests
            - components.goodwill_and_intangibles
            - components.dta_above_threshold
            - components.irb_el_shortfall
            - components.other_cet1_deductions
        )

        tier1 = cet1 + components.at1_instruments
        # T2 cap: T2 ≤ Tier 1 (Basel III §63)
        t2_eligible = min(
            components.t2_instruments + components.general_provisions_sa,
            tier1
        )
        total_capital = tier1 + t2_eligible

        return {
            "cet1": cet1,
            "at1": components.at1_instruments,
            "tier1": tier1,
            "t2": t2_eligible,
            "total_capital": total_capital,
        }

    def compute_rwa(self, rwa: RWAComponents) -> dict:
        """Total RWA across all risk types."""
        total = (rwa.credit_risk_irb + rwa.credit_risk_sa +
                 rwa.market_risk + rwa.operational_risk +
                 rwa.cva + rwa.other)
        return {
            "credit_rwa": rwa.credit_risk_irb + rwa.credit_risk_sa,
            "market_rwa": rwa.market_risk,
            "opri_rwa": rwa.operational_risk,
            "cva_rwa": rwa.cva,
            "total_rwa": total,
        }

    def compute_ratios(self, capital: dict, rwa: dict) -> dict:
        """Capital ratios."""
        total_rwa = rwa["total_rwa"]
        if total_rwa == 0:
            raise ValueError("Total RWA cannot be zero")
        return {
            "cet1_ratio": capital["cet1"] / total_rwa,
            "tier1_ratio": capital["tier1"] / total_rwa,
            "total_capital_ratio": capital["total_capital"] / total_rwa,
        }

    def buffer_analysis(self, ratios: dict, req: RegulatoryRequirements) -> dict:
        """
        Assess capital against full buffer stack.
        Returns headroom and MDA restriction status.
        """
        cet1 = ratios["cet1_ratio"]

        total_cet1_req = (
            req.cet1_minimum + req.ccb + req.ccyb +
            req.gsib_surcharge + req.dsib_surcharge + req.pillar2a_cet1
        )
        mda_trigger = req.cet1_minimum + req.ccb + req.ccyb

        # MDA: fraction of CET1 above minimum but within buffer stack
        # Simplification: full MDA calculation requires buffer-specific fractions
        cet1_above_min = cet1 - req.cet1_minimum
        buffer_stack = req.ccb + req.ccyb + req.gsib_surcharge + req.dsib_surcharge

        if cet1_above_min <= 0:
            mda_pct = 0.0
        elif cet1_above_min >= buffer_stack:
            mda_pct = 1.0  # No restriction
        else:
            # Linear restriction per Basel III §131
            fraction_of_buffer = cet1_above_min / buffer_stack
            if fraction_of_buffer < 0.25:
                mda_pct = 0.0
            elif fraction_of_buffer < 0.50:
                mda_pct = 0.20
            elif fraction_of_buffer < 0.75:
                mda_pct = 0.40
            else:
                mda_pct = 0.60

        return {
            "total_cet1_requirement": total_cet1_req,
            "mda_trigger": mda_trigger,
            "cet1_headroom": cet1 - total_cet1_req,
            "is_mda_restricted": cet1 < mda_trigger,
            "max_distributable_amount_pct": mda_pct,
        }

    def lcr(self, liq: LiquidityData) -> dict:
        """Liquidity Coverage Ratio per BCBS bcbs238 (Jan 2013)."""
        rates = self.LCR_OUTFLOW_RATES

        # HQLA (after haircuts)
        hqla = (
            liq.level1_hqla * (1 - self.HQLA_HAIRCUTS["level1"])
            + liq.level2a_hqla_gross * (1 - self.HQLA_HAIRCUTS["level2a"])
            + liq.level2b_hqla_gross * (1 - self.HQLA_HAIRCUTS["level2b_corporate_bond"])
        )

        # Gross outflows
        gross_outflows = (
            liq.insured_retail_deposits * rates["insured_retail"]
            + liq.less_stable_retail_deposits * rates["less_stable_retail"]
            + liq.operational_wholesale * rates["operational_wholesale"]
            + liq.non_operational_wholesale * rates["non_operational_wholesale"]
            + liq.committed_credit_facilities_corp * rates["committed_credit_corp"]
            + liq.committed_liquidity_facilities * rates["committed_liquidity"]
        )

        # Inflows capped at 75% of outflows
        total_inflows = liq.retail_loan_inflows + liq.wholesale_inflows
        capped_inflows = min(total_inflows, 0.75 * gross_outflows)
        net_outflows = gross_outflows - capped_inflows

        lcr_ratio = hqla / net_outflows if net_outflows > 0 else float("inf")

        return {
            "hqla": hqla,
            "gross_outflows": gross_outflows,
            "total_inflows": total_inflows,
            "capped_inflows": capped_inflows,
            "net_outflows": net_outflows,
            "lcr": lcr_ratio,
            "lcr_pct": lcr_ratio * 100,
            "passes": lcr_ratio >= 1.0,
        }

    def output_floor_analysis(self, irb_rwa: float, sa_rwa_revised: float,
                              year: int = 2030) -> dict:
        """
        Output floor calculation per BCBS Dec 2017 §21.
        floor = max(IRB RWA, floor_rate × SA RWA)
        """
        floor_rate = self.OUTPUT_FLOOR_PHASE_IN.get(year, self.OUTPUT_FLOOR_FINAL)
        floor_threshold = sa_rwa_revised * floor_rate
        effective_rwa = max(irb_rwa, floor_threshold)
        floor_binding = irb_rwa < floor_threshold

        return {
            "year": year,
            "floor_rate": floor_rate,
            "irb_rwa": irb_rwa,
            "sa_rwa_revised": sa_rwa_revised,
            "floor_threshold": floor_threshold,
            "effective_rwa": effective_rwa,
            "floor_binding": floor_binding,
            "rwa_uplift": max(floor_threshold - irb_rwa, 0),
            "uplift_pct": max((floor_threshold - irb_rwa) / irb_rwa * 100, 0),
        }

    def full_analysis(self, components: CapitalComponents, rwa: RWAComponents,
                      req: RegulatoryRequirements, liq: LiquidityData,
                      irb_rwa_total: float, sa_rwa_revised_total: float) -> None:
        """Run and print complete Basel III capital analysis."""
        cap = self.compute_capital(components)
        rwa_dict = self.compute_rwa(rwa)
        ratios = self.compute_ratios(cap, rwa_dict)
        buffers = self.buffer_analysis(ratios, req)
        lcr_result = self.lcr(liq)
        floor = self.output_floor_analysis(irb_rwa_total, sa_rwa_revised_total, 2030)

        print("=" * 65)
        print("BASEL III CAPITAL & LIQUIDITY FRAMEWORK ANALYSIS")
        print("=" * 65)

        print(f"\n--- CAPITAL STACK ---")
        print(f"  CET1:                  £{cap['cet1']:>10,.0f}M")
        print(f"  AT1:                   £{cap['at1']:>10,.0f}M")
        print(f"  Tier 1:                £{cap['tier1']:>10,.0f}M")
        print(f"  T2:                    £{cap['t2']:>10,.0f}M")
        print(f"  Total Capital:         £{cap['total_capital']:>10,.0f}M")

        print(f"\n--- RWA ---")
        print(f"  Credit RWA:            £{rwa_dict['credit_rwa']:>10,.0f}M")
        print(f"  Market RWA:            £{rwa_dict['market_rwa']:>10,.0f}M")
        print(f"  Operational RWA:       £{rwa_dict['opri_rwa']:>10,.0f}M")
        print(f"  CVA RWA:               £{rwa_dict['cva_rwa']:>10,.0f}M")
        print(f"  Total RWA:             £{rwa_dict['total_rwa']:>10,.0f}M")

        print(f"\n--- CAPITAL RATIOS ---")
        print(f"  CET1 Ratio:            {ratios['cet1_ratio']*100:>8.2f}%"
              f"  (min + CCB + CCyB = {(req.cet1_minimum+req.ccb+req.ccyb)*100:.1f}%)")
        print(f"  Tier 1 Ratio:          {ratios['tier1_ratio']*100:>8.2f}%"
              f"  (minimum = {req.tier1_minimum*100:.1f}%)")
        print(f"  Total Capital Ratio:   {ratios['total_capital_ratio']*100:>8.2f}%"
              f"  (minimum = {req.total_capital_minimum*100:.1f}%)")
        print(f"  Total CET1 Requirement:{buffers['total_cet1_requirement']*100:>8.2f}%")
        print(f"  CET1 Headroom:         {buffers['cet1_headroom']*100:>8.2f}%")
        print(f"  MDA Status:            {'RESTRICTED' if buffers['is_mda_restricted'] else 'UNRESTRICTED'}")

        print(f"\n--- LCR ---")
        print(f"  HQLA:                  £{lcr_result['hqla']:>10,.0f}M")
        print(f"  Net 30d Outflows:      £{lcr_result['net_outflows']:>10,.0f}M")
        print(f"  LCR:                   {lcr_result['lcr_pct']:>8.1f}%"
              f"  ({'PASS' if lcr_result['passes'] else 'FAIL'} — min 100%)")

        print(f"\n--- OUTPUT FLOOR (72.5%, fully phased 2030) ---")
        print(f"  IRB RWA:               £{floor['irb_rwa']:>10,.0f}M")
        print(f"  Revised SA RWA:        £{floor['sa_rwa_revised']:>10,.0f}M")
        print(f"  Floor Threshold:       £{floor['floor_threshold']:>10,.0f}M")
        print(f"  Effective RWA:         £{floor['effective_rwa']:>10,.0f}M")
        print(f"  Floor Binding:         {'YES — RWA uplift of '
                                          + f'£{floor[\"rwa_uplift\"]:,.0f}M'
                                          if floor['floor_binding'] else 'NO'}")
```

---

## 11. Interview Questions

**Q1: What are the minimum CET1 requirements under Basel III, including all buffers?**
Minimum CET1: 4.5%. CCB: +2.5% = effective floor 7.0%. CCyB (UK, July 2023): +2.0% = 9.0%. G-SIB surcharge (if applicable): +1.0%–3.5%. Pillar 2A (bank-specific): typically +1.5%–3.0%. Large UK G-SIB: combined CET1 requirement of ~12–13%.

**Q2: What is the Maximum Distributable Amount (MDA) and when does it trigger?**
MDA restricts dividends, AT1 coupons, and bonus payments when a bank's CET1 falls below the minimum plus combined buffer requirement (CCB + CCyB). The restriction is graded: 0% MDA (all restricted) in the bottom quartile of the buffer, up to 60% in the third quartile, 100% (unrestricted) above the buffer.

**Q3: What is the output floor and why was it introduced?**
The output floor requires total RWA = max(IRB RWA, 72.5% × Revised SA RWA). It was introduced because BCBS QIS studies showed IRB RWA varied by ±50% across banks for identical portfolios, undermining comparability and creating arbitrage incentives. The floor ensures no bank benefits from model optimism to hold less than 72.5% of what the standardised approach would require.

**Q4: Explain the LCR in plain English to a corporate treasurer.**
The LCR requires that a bank holds enough high-quality liquid assets (cash, government bonds) to survive a 30-day stress scenario — a period where retail customers start withdrawing deposits, wholesale funding markets close, and corporate clients draw on committed facilities. Banks must hold enough liquid buffer to cover predicted outflows. This indirectly affects the cost of committed revolving credit facilities because banks must hold capital against the drawdown risk.

**Q5: How does the countercyclical capital buffer work and who sets it?**
The CCyB is set by national macroprudential authorities (UK: FPC; Eurozone: national NCAs coordinated by ESRB). It activates when credit grows faster than the economy (credit-to-GDP gap). When the CCyB is raised (e.g., from 1% to 2%), banks must build CET1 within 12 months. When it is released (as in March 2020), banks can immediately use the freed capital to absorb losses or maintain lending.

**Q6: What is TLAC and how does it differ from standard capital requirements?**
TLAC (Total Loss-Absorbing Capacity) is a resolution standard for G-SIBs, set by the FSB. It requires G-SIBs to hold minimum 16–18% of RWA in instruments eligible for bail-in in resolution — including senior non-preferred debt that does not count as regulatory capital. Capital counts toward TLAC, but additional TLAC-eligible liabilities (HoldCo senior debt) are also required. The purpose is to ensure resolution authorities have sufficient bail-in-able liabilities to recapitalise a failing bank without taxpayer money.

**Q7: Technical: If a bank's CET1 ratio is 10.5% and the MDA trigger is 9.0%, what fraction of profits can be distributed?**
CET1 headroom above minimum (4.5%) = 6.0%. Buffer stack (CCB 2.5% + CCyB 2.0%) = 4.5%. Fraction within buffer = (10.5% − 4.5%) / 4.5% = 133% > 100%. The bank is above the full buffer stack — MDA is 100% (no restriction). If CET1 were 8.0% (within the buffer): fraction = (8.0% − 4.5%) / 4.5% = 77.8%, in the third quartile → 60% MDA.

---

## 12. Common Mistakes

### Mistake 1: Confusing CET1 Minimum with Effective Minimum
**Wrong**: Treating 4.5% CET1 as the operative floor.
**Correct**: The operative floor is 4.5% + 2.5% (CCB) + CCyB + G-SIB + P2A. Breaching the CCB triggers MDA restrictions. The 4.5% minimum triggers supervisory action. Most banks target 200–300bps above their total requirement to maintain a management buffer.

### Mistake 2: Applying CCyB at Home Country Rate
**Wrong**: Applying the UK CCyB rate (2.0%) to all exposures.
**Correct**: CCyB is jurisdiction-weighted. A bank with 60% UK exposures and 40% EU exposures applies 60% × UK CCyB + 40% × weighted EU CCyB. Each jurisdiction's CCyB applies only to exposures in that jurisdiction.

### Mistake 3: Output Floor Against Original Basel II SA
**Wrong**: Comparing IRB RWA against the Basel II Standardised Approach for the output floor.
**Correct**: The output floor per BCBS December 2017 uses the revised standardised approaches introduced in that document — specifically the new SA for credit risk (with risk-sensitive corporate risk weights based on investment grade/non-investment grade/unrated, and the new SFT, CVA, and operational risk SA). The revised SA produces different (often higher) numbers than Basel II SA.

### Mistake 4: LCR — Not Capping Inflows at 75%
**Wrong**: Including all cash inflows in the LCR calculation.
**Correct**: Cash inflows are capped at 75% of gross outflows. This prevents banks from "netting off" outflows with inflows unless they are near-certain and contractual. Net outflows = Gross outflows − min(Inflows, 75% × Gross outflows).

### Mistake 5: AT1 Coupon Tax Treatment
**Wrong**: Modelling AT1 coupons as tax-deductible interest expense.
**Correct**: AT1 instruments are equity-like distributions, not debt interest. In most jurisdictions (UK, EU), AT1 coupons are not tax-deductible. They are paid out of after-tax profits, making AT1 significantly more expensive than Tier 2 subordinated debt after tax adjustment.

### Mistake 6: Leverage Ratio CCF vs. Credit RWA CCF
**Wrong**: Using IRB or SA credit conversion factors for off-balance-sheet items in leverage ratio.
**Correct**: The leverage ratio uses 100% CCF for off-balance-sheet commitments (with limited exceptions for unconditional cancellable commitments at 10% in some jurisdictions). This is far higher than the 20–75% CCFs used in credit RWA, creating a separate constraint for banks with large committed undrawn facilities.

---

## 13. Case Studies

### Case Study 1: The Countercyclical Buffer Release — COVID-19 (March 2020)

**Context**: The UK FPC had built the UK CCyB to 1.0% over 2019–2020. In March 2020, as COVID-19 lockdowns began, the FPC cut the CCyB from 1.0% to 0% with immediate effect.

**Capital released**: For a UK bank with £80Bn credit RWA and 60% UK exposure: UK-weighted RWA = £48Bn. CET1 released = £48Bn × 1.0% = £480M.

**Purpose**: Enable banks to absorb losses from the COVID shock and continue lending to businesses without breaching capital constraints. Signalling function: supervisors explicitly told banks to use the released buffer rather than hoard it.

**Lesson for analysts**: The CCyB is a policy tool, not just a mathematical add-on. Understanding when supervisors will release it (they designed it specifically for systemic shocks) affects how you model capital constraints in stress scenarios. Banks that understood the CCyB mechanism were less likely to panic-restrict lending in March 2020.

### Case Study 2: Output Floor Impact on UK Mortgage Portfolio

**Context**: A large UK bank held £150Bn of residential mortgage RWA under AIRB. Average AIRB risk weight: 11% (£16.5Bn RWA). Revised Basel III SA risk weight for UK residential mortgages (LTV 65%): 20%. Revised SA RWA: £30Bn.

**Output floor (72.5%)**: Floor threshold = £30Bn × 72.5% = £21.75Bn.
**IRB RWA**: £16.5Bn.
**Floor binding**: Yes. Effective RWA: £21.75Bn. RWA uplift: £5.25Bn.

**Capital impact**: At 13% CET1 target → additional capital required = £5.25Bn × 13% = £682M.

**Pricing impact**: £5.25Bn additional RWA × 13% CET1 × 15% RoE target = £102M additional annual return required. Spread across £150Bn portfolio: ~7bps additional margin required. This is why UK mortgage rates ticked up in 2024–2026 as banks began modelling the PRA Basel 3.1 impact.

**Lesson**: The output floor is not abstract — it has direct, quantifiable pricing and product implications. Credit analysts must understand which portfolios are floor-constrained and how floor uplift flows through to relationship pricing.

### Case Study 3: AT1 Writedown — Credit Suisse (March 2023)

**Context**: FINMA, the Swiss regulator, supervised Credit Suisse's rescue acquisition by UBS in March 2023. Unusually, FINMA ordered CHF 16Bn of AT1 (CoCo) bonds written down to zero while equity holders received a small residual consideration from UBS.

**Basel III intent**: AT1 was designed to absorb losses at or before the point of non-viability. Basel III §55 requires AT1 instruments to include a principal write-down or conversion trigger. Credit Suisse's AT1 prospectuses included a PONV (Point of Non-Viability) clause allowing FINMA to trigger write-down.

**Market reaction**: AT1 spreads across European banks widened 100–200bps. Investors had assumed equity would be wiped before AT1 — the Credit Suisse action demonstrated that national authorities can invert the usual creditor hierarchy.

**Lesson for credit analysts**: AT1 instruments sit in a regulatory grey zone between debt and equity. Their behaviour in stress is governed by prospectus terms and national authority discretion — not purely by Basel III hierarchy expectations.

---

## 14. Iterative Reinforcement

### Level 1 — Recall (Week 1)
- State the three Basel III minimum ratios and their thresholds
- Name the four capital buffers and who sets each
- Define LCR and NSFR in one sentence each
- State the output floor final rate and implementation year

### Level 2 — Application (Week 2)
- Calculate the total CET1 requirement for a UK G-SIB (G-SIB bucket 2.0%, P2A 1.8%, UK CCyB 2.0%)
- Determine if MDA is triggered with CET1 = 10.2% and MDA trigger = 9.5%
- Compute HQLA after haircuts: £5Bn Level 1, £2Bn Level 2A, £500M Level 2B (25% haircut)
- Apply the output floor: IRB RWA = £40Bn, revised SA RWA = £65Bn

### Level 3 — Synthesis (Week 3)
- Build the full Python capital calculator and run `full_analysis()` with realistic inputs
- Model a 1% increase in CCyB: what is the CET1 impact and minimum capital increase for your bank?
- Explain to a CFO why the output floor will require repricing the mortgage portfolio
- Design a Pillar 2 stress test for a commercial real estate-heavy portfolio

### Level 4 — Expert (Week 4)
- Compare CRR3 (EU) and PRA Basel 3.1 (UK) implementations: five key differences
- Explain the MREL/TLAC waterfall and how bail-in would work in resolution
- Model the P&L impact of AT1 coupon cancellation vs. common equity dilution
- Analyse whether the leverage ratio or RWA requirement is binding for a low-risk-weight sovereign bond portfolio

### Module Connections
- M14 (Basel II): How Basel III addressed each Basel II failure; where IRB formulas remain the same
- M16 (IFRS 9): CET1 deduction for IRB EL shortfall; IFRS 9 Day 1 provision impact on CET1
- M12 (PD Models): TTC vs. PiT PD in context of capital planning and stress testing
- M17 (Stress Testing): ICAAP methodology, PRA ACS scenarios, reverse stress testing

---

## 15. Source Material

### Primary BIS Publications

1. **BCBS. "Basel III: A global regulatory framework for more resilient banks and banking systems." December 2010, revised June 2011.** https://www.bis.org/publ/bcbs189.htm
   - Capital definitions (§§1–98), capital buffers (§§99–187), leverage ratio (§§150–164)
   - The foundational Basel III capital text

2. **BCBS. "Basel III: International framework for liquidity risk measurement, standards and monitoring." December 2010.** https://www.bis.org/publ/bcbs188.htm
   - Original LCR and NSFR framework

3. **BCBS. "Basel III: The Liquidity Coverage Ratio and liquidity risk monitoring tools." January 2013.** https://www.bis.org/publ/bcbs238.htm
   - Revised and final LCR (outflow/inflow rates, HQLA definition)

4. **BCBS. "Basel III: The Net Stable Funding Ratio." October 2014.** https://www.bis.org/publ/bcbs295.htm
   - Final NSFR

5. **BCBS. "Global systemically important banks: updated assessment methodology and the higher loss absorbency requirement." July 2013.** https://www.bis.org/publ/bcbs255.htm
   - G-SIB scoring and surcharge buckets

6. **BCBS. "Basel III: Finalising post-crisis reforms." December 2017.** https://www.bis.org/publ/d424.htm
   - Output floor (§21), revised SA for credit risk, new operational risk framework, FRTB, revised CVA
   - "Basel IV" reference document

7. **BCBS. "Guidance for national authorities operating the countercyclical capital buffer." December 2010.** https://www.bis.org/publ/bcbs187.htm
   - CCyB calibration methodology and credit-to-GDP gap indicator

### EU Regulatory Texts

8. **European Parliament / Council. "Regulation (EU) 2024/1623 (CRR3)." June 2024.**
   - EU transposition of Basel III finalisation. Full text: OJ L 2024/1623

9. **European Parliament / Council. "Directive (EU) 2024/1619 (CRD VI)." June 2024.**
   - Governance, pillar 2, and supervisory convergence provisions

### UK Regulatory Documents

10. **Prudential Regulation Authority. "Implementation of the Basel 3.1 standards — Near-final part 1 and 2." PS17/23, December 2023.**
    - PRA near-final rules; credit risk SA and IRB, output floor, leverage ratio

11. **Prudential Regulation Authority. "The PRA's methodologies for setting Pillar 2 capital." Statement of Policy, April 2023.**
    - Pillar 2A methodology for UK banks

### Academic References

12. **Goodhart, C. (ed). "The Basel Committee on Banking Supervision: A History of the Early Years, 1974–1997." Cambridge University Press, 2011.**

13. **Elliott, D. "Bank Capital Buffers in a Dynamic Model." Brookings Institution Working Paper, 2010.**
    - Empirical analysis of buffer calibration

14. **Financial Stability Board. "Key Attributes of Effective Resolution Regimes for Financial Institutions." October 2011.**
    - TLAC/resolution framework underpinning AT1 and MREL design
