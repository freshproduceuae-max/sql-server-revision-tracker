# M14 — Basel II: The Three Pillars Framework and Credit Risk Capital

---

## 1. Business Purpose

Basel II, formally titled "International Convergence of Capital Measurement and Capital Standards: A Revised Framework" (BIS, June 2006), replaced the blunt 1988 Basel I Accord with a risk-sensitive framework for determining how much regulatory capital banks must hold against credit, market, and operational risk. For a Banking Business Analyst transitioning into credit risk, understanding Basel II is not merely historical — it remains the foundation upon which Basel III, IFRS 9, and current internal rating systems are built.

### Why Basel II Was Created

Basel I (1988) assigned risk weights in five crude buckets: 0% (sovereigns), 20% (banks and AAA-rated securities), 50% (residential mortgages), 100% (all corporate exposures regardless of creditworthiness), and 0% for off-balance-sheet items with a conversion factor applied. This created severe distortions. A loan to Apple Inc. consumed the same capital as a loan to a deeply sub-investment-grade borrower. Banks responded rationally: they shed high-quality assets (low economic risk, high regulatory capital) and retained sub-investment-grade assets (high economic risk, same regulatory capital). This is regulatory capital arbitrage — and Basel I actively encouraged it.

Basel II attempted to align regulatory capital more closely with economic capital by:

1. Introducing credit risk sensitivity into minimum capital calculations (Pillar 1)
2. Requiring supervisors to assess whether banks' own capital models were adequate (Pillar 2)
3. Mandating public disclosure so market participants could discipline banks (Pillar 3)

### Business Relevance to a Credit Analyst

Every commercial banking decision about pricing, deal structuring, and portfolio management traces back to regulatory capital consumption. A relationship manager pricing a revolving credit facility to a BBB-rated corporate borrower must understand that under the Standardised Approach, that facility attracts a 100% risk weight, requiring 8% × 100% = 8 cents of minimum capital per pound lent. Under Advanced IRB, the same facility might attract 60–70 cents of capital per pound if the bank's internal PD and LGD estimates are sufficiently low. The difference determines whether the deal is profitable.

Understanding Basel II also makes you a better counterparty. Corporate treasury teams at large companies actively manage how their financing structures are perceived by bank capital models. Understanding what drives a bank's capital consumption enables you to structure deals that reduce costs for both parties.

---

## 2. Accounting Concepts

### Capital Components Under Basel II

Basel II defines regulatory capital across two tiers:

**Tier 1 Capital (Going-Concern Capital)**
- Core Tier 1 / Common Equity: Ordinary share capital, share premium, retained earnings, other comprehensive income (net of deductions)
- Hybrid Tier 1 instruments: Perpetual non-cumulative preference shares, certain innovative capital instruments (up to 15% of Tier 1)
- Deductions: Goodwill, intangible assets, deferred tax assets above threshold, investments in own shares

**Tier 2 Capital (Gone-Concern Capital)**
- Upper Tier 2: Perpetual cumulative preference shares, perpetual subordinated debt, revaluation reserves (at 45% haircut)
- Lower Tier 2: Term subordinated debt with original maturity ≥ 5 years, limited to 50% of Tier 1

Total Capital = Tier 1 + Tier 2, where Tier 2 ≤ Tier 1.

### Risk-Weighted Assets and the Capital Ratio

The Capital Adequacy Ratio (CAR):

```
CAR = Total Capital / Risk-Weighted Assets ≥ 8%
```

Risk-Weighted Assets (RWA) aggregate credit risk, market risk, and operational risk capital charges into a common currency. For credit risk:

```
RWA_credit = Σ (Exposure × Risk Weight)
```

Operational risk adds a capital charge calculated under Basic Indicator Approach (15% of average annual gross income), Standardised Approach (8–18% by business line), or Advanced Measurement Approach (internal model).

### Expected Loss vs. Unexpected Loss

This is a crucial accounting-regulatory interface. Basel II distinguishes between:

- **Expected Loss (EL)**: The average loss over a credit cycle. EL = PD × LGD × EAD. This is a cost of doing business — it should be priced into the loan margin and provisioned for in the income statement.
- **Unexpected Loss (UL)**: The deviation of actual losses from expected losses, at a 99.9% confidence interval over a one-year horizon. This is what regulatory capital covers.

Under IRB, regulatory capital covers only unexpected loss. Expected loss is supposed to be covered by provisions (accounting) or loan pricing. The comparison of regulatory EL against actual accounting provisions creates the ECL shortfall/surplus — a direct deduction from or addition to capital.

---

## 3. Financial Concepts

### The Three Pillars Architecture

**Pillar 1 — Minimum Capital Requirements**
Banks must maintain total capital ≥ 8% of RWA, with Tier 1 ≥ 4%. Credit risk RWA is computed under one of two overarching approaches: the Standardised Approach (SA) or the Internal Ratings-Based (IRB) Approach.

**Pillar 2 — Supervisory Review Process**
Four key principles (Basel II §721–758):
- Principle 1: Banks should have a process for assessing overall capital adequacy relative to their risk profile (ICAAP — Internal Capital Adequacy Assessment Process)
- Principle 2: Supervisors should review and evaluate the ICAAP and intervene where appropriate
- Principle 3: Supervisors should expect banks to operate above minimum regulatory ratios and have the ability to require higher ratios
- Principle 4: Supervisors should seek to intervene at an early stage

**Pillar 3 — Market Discipline**
Mandatory public disclosure requirements on capital structure, risk exposures, capital adequacy, and risk assessment processes. Quarterly or semi-annual disclosure on capital ratios and significant risk metrics.

### Standardised Approach (SA) — Risk Weights

Under SA, exposures are assigned risk weights based on external credit assessments (S&P, Moody's, Fitch) or regulatory classifications. Key risk weights for corporate credit:

| External Rating | Risk Weight |
|-----------------|-------------|
| AAA to AA−      | 20%         |
| A+ to A−        | 50%         |
| BBB+ to BB−     | 100%        |
| Below BB−       | 150%        |
| Unrated         | 100%        |

Retail exposures qualifying as "regulatory retail" (individual, exposure < €1M, granular portfolio): 75%
Residential mortgages: 35% (where property values are not declining)
Past-due loans: 150% (where specific provisions < 20% of outstanding)

Off-balance-sheet items are converted to credit equivalents via Credit Conversion Factors (CCF):
- Unconditional cancellable commitments: 0%
- Commitments with original maturity ≤ 1 year: 20%
- Commitments with original maturity > 1 year: 50%
- Direct credit substitutes (guarantees, standby LCs): 100%

### Internal Ratings-Based (IRB) Approach — Core Framework

Under IRB, a bank estimates risk parameters and applies the Basel supervisory formula to compute RWA. IRB exposures are divided into asset classes:
- Corporate (including SME corporate, specialised lending)
- Sovereign
- Bank
- Retail (residential mortgage, qualifying revolving retail, other retail)
- Equity

For each exposure, the bank estimates or uses supervisory values for four risk parameters:

| Parameter | Symbol | Definition |
|-----------|--------|------------|
| Probability of Default | PD | Likelihood of default within 12 months; minimum floor 0.03% for corporate |
| Loss Given Default | LGD | Economic loss as % of EAD if default occurs |
| Exposure at Default | EAD | Expected drawn balance at time of default |
| Effective Maturity | M | Effective remaining maturity of the exposure; default 2.5 years for FIRB |

**Foundation IRB (FIRB)**: Bank estimates PD internally; LGD, EAD, and M use supervisory values specified in the framework.
- Senior unsecured LGD: 45%
- Subordinated unsecured LGD: 75%
- EAD for drawn revolvers: outstanding balance; for undrawn: outstanding + CCF × undrawn

**Advanced IRB (AIRB)**: Bank estimates all four parameters (PD, LGD, EAD, M) using internal models validated by the supervisor.

### The Basel II Corporate Credit Risk Weight Formula

The IRB capital formula for corporate exposures (Basel II §272):

**Step 1: Asset Correlation (ρ)**
```
ρ = 0.12 × [1 − exp(−50 × PD)] / [1 − exp(−50)] 
  + 0.24 × [1 − (1 − exp(−50 × PD)) / (1 − exp(−50))]
```

This produces correlation ranging from 12% (high PD) to 24% (low PD). Intuition: higher-quality borrowers are more correlated with the economic cycle; their defaults tend to cluster during downturns.

**Step 2: Capital Requirement (K)**
```
K = LGD × [N(G(PD)/√(1−ρ) + √(ρ/(1−ρ)) × G(0.999)) − PD]
  × (1 − 1.5 × b)^(−1) × (1 + (M − 2.5) × b)
```

Where:
- N(·) = cumulative standard normal distribution function
- G(·) = inverse standard normal distribution function (quantile function)
- b = (0.11852 − 0.05478 × ln(PD))² — maturity adjustment factor

**Step 3: Risk-Weighted Assets**
```
RWA = K × 12.5 × EAD
```

(12.5 is the reciprocal of 8%, the minimum CAR — it converts a capital requirement K into equivalent RWA)

**Step 4: Expected Loss**
```
EL = PD × LGD × EAD
```

The regulatory EL is compared to accounting provisions. If EL > Provisions, the shortfall is deducted 50% from Tier 1 and 50% from Tier 2. If Provisions > EL, the excess (up to 0.6% of credit RWA) is added to Tier 2.

### SME Supporting Factor

For SME corporate exposures (annual turnover < €50M), the firm-size adjustment reduces the correlation:

```
ρ_SME = ρ_corporate − 0.04 × [1 − (S − 5) / 45]
```

where S = annual sales (€M), floored at 5 and capped at 50.

### Specialised Lending

Five categories of specialised lending receive supervisory slot criteria (Strong/Good/Satisfactory/Weak) rather than PD-based formula where banks cannot estimate PD reliably:
1. Project Finance
2. Object Finance
3. Commodities Finance
4. Income-Producing Real Estate
5. High-Volatility Commercial Real Estate (HVCRE) — higher risk weights

---

## 4. Statistical Concepts

### The Vasicek Single-Factor Model

The Basel II IRB formula is derived from the Vasicek (2002) asymptotic single-factor credit risk model. Each borrower's asset return follows:

```
A_i = √ρ × Z + √(1−ρ) × ε_i
```

Where:
- Z = systematic factor (state of the economy), Z ~ N(0,1)
- ε_i = idiosyncratic factor for borrower i, ε_i ~ N(0,1)
- ρ = asset correlation (sensitivity to the systematic factor)

Default occurs when A_i < threshold, where the threshold is calibrated to PD:
```
threshold_i = N^{−1}(PD_i)
```

The worst-case scenario at confidence level 99.9% gives conditional PD:

```
PD_conditional = N[(G(PD) + √ρ × G(0.999)) / √(1−ρ)]
```

Capital must cover losses in this worst-case scenario. This is the foundation of the K formula.

### Properties of the Correlation Parameter

The correlation ρ ranges from 12% to 24% for corporate exposures. Key implications:
- Low PD borrowers (investment grade) have high ρ: their defaults are macro-driven, systemic, and clustered — more dangerous for portfolio concentration
- High PD borrowers (sub-investment grade) have low ρ: their defaults are more idiosyncratic — diversification helps

This is a counter-intuitive regulatory feature: the formula assigns higher capital per unit of EL for investment-grade borrowers than for sub-investment-grade borrowers when viewed on a portfolio diversification basis. However, since PD is so much lower for investment grade, absolute capital requirements are still lower.

### Maturity Adjustment

The maturity adjustment factor b and the maturity scaling term account for the mark-to-market effect of credit deterioration (migration risk):

```
Maturity scaling = (1 − 1.5b)^{−1} × (1 + (M − 2.5) × b)
```

This is anchored at M = 2.5 years (the supervisory default for FIRB). Longer maturity → higher capital, because there is more time for credit quality to deteriorate.

### Confidence Interval and Procyclicality

The 99.9% confidence interval over one year is a deliberate design choice. It means the formula is calibrated to losses that would be exceeded in 1 year out of 1,000. However, this creates procyclicality: during a downturn, PDs rise across the portfolio, triggering higher capital requirements precisely when banks are least able to raise capital — forcing deleveraging and credit contraction. Basel II's through-the-cycle (TTC) PD estimation was intended to dampen this effect, but practical implementation varied widely.

---

## 5. Regulatory Framework

### BIS Publication Reference

The definitive source is: **"International Convergence of Capital Measurement and Capital Standards: A Revised Framework — Comprehensive Version" (Basel Committee on Banking Supervision, June 2006)**. Known informally as "the Basel II text" or "CP3 final". Available at: https://www.bis.org/publ/bcbs128.htm

Key paragraphs for credit risk analysts:
- §§50–89: Standardised Approach
- §§211–537: IRB Approach (including corporate formula §§272–279)
- §§538–643: Credit Risk Mitigation
- §§644–718: Securitisation Framework

### Implementation Timeline and National Transposition

- G10 countries committed to implementation from year-end 2006 (SA and FIRB) and year-end 2007 (AIRB)
- EU: Capital Requirements Directive (CRD) — Directive 2006/48/EC and 2006/49/EC
- UK: FSA implemented via its BIPRU sourcebook
- US: SA applied to non-advanced banks; AIRB for ~10 largest banks (parallel run 2007–2008, never fully completed due to GFC)

### Credit Risk Mitigation (CRM) Under Basel II

Basel II provided two approaches to recognising CRM:

**Simple Approach (SA only)**: Substitute the risk weight of the collateral for the borrower risk weight for the collateralised portion.

**Comprehensive Approach**: Adjust EAD downward for eligible financial collateral using supervisory or own-estimate haircuts:

```
E* = max[0, E × (1 + He) − C × (1 − Hc − Hfx)]
```

Where:
- E* = collateral-adjusted exposure
- He = haircut on exposure (for repo-style transactions)
- C = value of collateral
- Hc = haircut on collateral
- Hfx = haircut for currency mismatch

Eligible collateral under the comprehensive approach includes: cash, gold, investment-grade debt securities, equities in main indices, UCITS/mutual funds.

Guarantees and credit derivatives reduce EAD (or substitute risk weight) via substitution approach. Double default formula available for guaranteed exposures.

### Securitisation Framework

Securitisation tranches receive risk weights based on ratings:
- AAA to AA−: 20% (SA) / formula-based (IRB)
- A+ to A−: 50%
- BBB+ to BBB−: 100%
- BB+ to BB−: 350%
- Below BB− or unrated: 1,250% (deducted from capital)

The rating-based approach, internal assessment approach, and supervisory formula approach were available under IRB. The supervisory formula required inputs including KIRB (the IRB capital requirement for the underlying pool) and seniority characteristics of the tranche.

This is where Basel II was most severely criticised: it relied on external ratings, and AAA-rated CDO tranches received 20% risk weights even when they were backed by US subprime mortgages with dramatically higher systemic risk than the ratings reflected.

---

## 6. Data Required

### For Standardised Approach

| Data Element | Source | Frequency |
|--------------|--------|-----------|
| External credit ratings (S&P, Moody's, Fitch) | Rating agency / Bloomberg | On change |
| Nominated ECAI mapping to CRD scale | Regulatory mapping tables | Annual review |
| Exposure values by counterparty | Core banking / lending system | Daily |
| Collateral valuations and eligible collateral flags | Collateral management system | Daily/monthly |
| Off-balance-sheet notional and product type | Deal capture system | Daily |
| CCF assignment by product type | Regulatory classification tables | On policy change |

### For IRB Approach

| Data Element | Source | Minimum History Required |
|--------------|--------|--------------------------|
| Internal PD by rating grade (TTC estimate) | Rating model / credit scoring system | 5 years (7 years preferred for LGD/EAD) |
| Realised default rates by rating vintage | Default tracking database | 5 years minimum |
| LGD estimates by collateral type and seniority | Workout/recovery database | 7 years |
| EAD: drawn balances and undrawn commitments | Loan management system | 7 years |
| Obligor financials for rating model inputs | Financial spreading tool (e.g., Moody's RiskCalc, Fitch Solutions) | Annual |
| Effective maturity by facility | Deal documentation / amortisation schedules | Per facility |
| Annual turnover of SME borrowers | Financial spreading / CRM | Annual |

### Data Quality Requirements (Basel II §388–396)

Basel II mandates that banks demonstrate:
- PD estimates are long-run averages of one-year default rates for each grade
- LGD estimates reflect economic downturn conditions
- Estimates are based on historical experience and empirical evidence, not purely judgmental
- Data used for rating models must be representative of the current portfolio
- Separate tracking of defaults and losses for each rating grade

---

## 7. How Analysts Actually Work

### Day-to-Day Basel II Tasks in a Commercial Bank

**Credit Risk Analyst — Rating and RWA Calculation**

The core workflow for a new credit application:

1. **Gather obligor financials**: Most banks use a financial spreading tool (Moody's RiskCalc, Fitch CreditView, or proprietary). You input last 3 years of P&L, balance sheet, cash flow statement.

2. **Run the internal rating model**: The model produces a PD (e.g., PD = 0.45% for a BBB-equivalent borrower). Rating scale is mapped to the master scale (typically 1–10 or 1–25 with notches).

3. **Apply the IRB formula (AIRB example)**:
   - PD = 0.45%, LGD = 35% (senior secured, real estate collateral), EAD = £10M, M = 3.5 years
   - Compute ρ, K, RWA
   - Compute EL = 0.0045 × 0.35 × £10M = £15,750

4. **Compute Return on Regulatory Capital (RoRC)**:
   ```
   RoRC = (Margin − Operating Costs − EL) / (RWA × 8%)
   ```
   A target RoRC of 15% with RWA = £5M requires after-cost margin of ~£60,000/year.

5. **Compare to hurdle rate**: If RoRC < hurdle (typically 12–15%), analyst must escalate, reprice, or decline.

**Portfolio Risk Analyst — RWA Monitoring and Reporting**

- Monthly RWA reporting to CFO and regulators (PRA in UK, ECB/NCAs in EU)
- Track RWA migration: changes in PD grades, LGD model updates, new drawdowns, repayments, FX movements
- Produce RWA waterfall decomposition (volumes, grades, parameters, methodology, FX, model changes)
- Stress testing: shift PD grades down by 1–2 notches; compute RWA impact
- Compare to SA floor (and post-Basel IV output floor)

**Model Validation Analyst**

- Backtesting: Compare realised default rates to predicted PD by grade annually
- Discriminatory power: Gini coefficient, AUROC on hold-out sample (target: Gini > 50% for corporate models)
- Calibration testing: Hosmer-Lemeshow test, traffic light tests per EBA GL/2017/16
- Benchmarking: Internal PD vs. external agency-implied PD vs. market CDS spreads
- Document findings in Model Validation Report; escalate breaches to Model Risk Committee

---

## 8. Excel Implementation

### Template 1: IRB Corporate RWA Calculator

```excel
'--- INPUTS (cells B2:B7) ---
B2: PD              = 0.0045    ' 0.45%
B3: LGD             = 0.35      ' 35%
B4: EAD             = 10000000  ' £10,000,000
B5: M               = 3.5       ' years
B6: SalesEUR_M      = 150       ' Annual sales €150M (for SME test)
B7: IsSME           = FALSE     ' TRUE if Sales < €50M

'--- STEP 1: Asset Correlation ---
'Standard corporate correlation
B10: =0.12*(1-EXP(-50*B2))/(1-EXP(-50)) + 0.24*(1-(1-EXP(-50*B2))/(1-EXP(-50)))

'SME adjustment (if applicable)
B11: =IF(B7, B10 - 0.04*(1-MAX(MIN(B6,50)-5,0)/45), B10)
'Use B11 as effective rho

'--- STEP 2: Maturity Adjustment Factor b ---
B14: =(0.11852-0.05478*LN(B2))^2

'--- STEP 3: Capital Requirement K ---
'Components:
B17: =NORM.INV(B2,0,1)                  ' G(PD)
B18: =NORM.INV(0.999,0,1)               ' G(0.999) = 3.0902
B19: =(B17+SQRT(B11/(1-B11))*B18)/SQRT(1-B11)/(SQRT(1)+0)
'Correction: proper formula:
B19: =(B17/SQRT(1-B11)) + (SQRT(B11/(1-B11))*B18)
B20: =NORM.DIST(B19,0,1,TRUE)           ' N(combined)
B21: =B3*(B20-B2)                       ' LGD × (conditional PD − unconditional PD)
B22: =(1+(B5-2.5)*B14)/(1-1.5*B14)    ' Maturity scaling
B23: =B21*B22                           ' K = capital ratio

'--- STEP 4: RWA ---
B26: =B23*12.5*B4                       ' RWA = K × 12.5 × EAD

'--- STEP 5: Minimum Capital ---
B29: =B26*0.08                          ' 8% × RWA

'--- STEP 6: Expected Loss ---
B32: =B2*B3*B4                          ' PD × LGD × EAD

'--- STEP 7: Return on RWA ---
B35: (Margin input)
B36: (Operating cost input)
B37: =(B35-B36-B32)/B29                 ' RoRC = (Margin-Cost-EL)/Capital
```

### Template 2: SA Risk Weight Lookup

```excel
'Rating-to-Risk-Weight mapping table (columns E:F)
E2:F8 =
Rating          RW%
AAA to AA-      20%
A+ to A-        50%
BBB+ to BB-     100%
Below BB-       150%
Unrated         100%
Retail (<1M)    75%
Residential Mtg 35%

'Lookup formula (D2 = rating input as text)
B42: =VLOOKUP(D2,E2:F8,2,FALSE)*B4       ' Risk-weighted exposure
B43: =B42*0.08                            ' Minimum capital
```

### Template 3: EL vs. Provision Comparison

```excel
'Portfolio-level comparison
Column A: Facility ID
Column B: PD
Column C: LGD
Column D: EAD
Column E: =B2*C2*D2              ' EL per facility
Column F: Accounting provision
Column G: =E2-F2                 ' Shortfall (+) / Surplus (-)

'Portfolio totals
B_total: =SUM(E:E)               ' Total EL
F_total: =SUM(F:F)               ' Total provisions
G_total: =SUM(G:G)               ' Net shortfall / surplus

'Capital deduction (shortfall only)
Deduction_T1: =MAX(G_total,0)*0.5
Deduction_T2: =MAX(G_total,0)*0.5

'Tier 2 add-back (surplus, capped at 0.6% of credit RWA)
T2_addition: =MIN(MAX(-G_total,0), 0.006*Total_Credit_RWA)
```

---

## 9. SQL Implementation

```sql
-- ============================================================
-- Basel II IRB RWA Calculation Engine
-- SQL Server Implementation
-- ============================================================

-- Supporting scalar functions must be pre-defined (or use inline approximations)
-- Normal distribution approximations for SQL Server

-- Table: credit_exposures
-- Columns: facility_id, obligor_id, pd, lgd, ead, maturity_years, 
--          annual_sales_eur_m, is_sme, asset_class, collateral_type,
--          accounting_provision, drawn_balance, undrawn_commitment

-- ============================================================
-- STEP 1: Compute IRB Risk Parameters
-- ============================================================

WITH base_params AS (
    SELECT
        facility_id,
        obligor_id,
        pd,
        lgd,
        ead,
        maturity_years AS m,
        annual_sales_eur_m,
        is_sme,
        accounting_provision,

        -- Asset correlation (corporate formula)
        0.12 * (1 - EXP(-50 * pd)) / (1 - EXP(-50))
        + 0.24 * (1 - (1 - EXP(-50 * pd)) / (1 - EXP(-50)))
        AS rho_corporate,

        -- SME firm-size adjustment
        CASE
            WHEN is_sme = 1 AND annual_sales_eur_m BETWEEN 5 AND 50
            THEN 0.04 * (1 - (LEAST(annual_sales_eur_m, 50) - 5) / 45.0)
            WHEN is_sme = 1 AND annual_sales_eur_m < 5
            THEN 0.04
            ELSE 0
        END AS rho_sme_reduction,

        -- Maturity adjustment factor b
        POWER(0.11852 - 0.05478 * LOG(pd), 2) AS b_factor

    FROM credit_exposures
    WHERE asset_class = 'Corporate'
      AND pd > 0
      AND lgd > 0
      AND ead > 0
),

-- ============================================================
-- STEP 2: Compute effective rho and maturity scaling
-- ============================================================

rho_calc AS (
    SELECT
        *,
        rho_corporate - rho_sme_reduction AS rho,
        (1 + (m - 2.5) * b_factor) / (1 - 1.5 * b_factor) AS maturity_scalar
    FROM base_params
),

-- ============================================================
-- STEP 3: Apply Vasicek formula
-- Note: SQL Server lacks native normal distribution functions.
-- Use the dbo.fn_norm_inv and dbo.fn_norm_cdf approximations below,
-- or compute in a Python/R step and join back.
-- For illustration, we use placeholder function calls.
-- ============================================================

capital_calc AS (
    SELECT
        facility_id,
        obligor_id,
        pd,
        lgd,
        ead,
        m,
        rho,
        maturity_scalar,
        accounting_provision,

        -- G(PD): inverse normal of PD
        dbo.fn_norm_inv(pd)            AS g_pd,
        -- G(0.999): inverse normal of 99.9th percentile
        dbo.fn_norm_inv(0.999)         AS g_999,

        -- Conditional PD component
        dbo.fn_norm_cdf(
            (dbo.fn_norm_inv(pd) / SQRT(1 - rho))
            + SQRT(rho / (1 - rho)) * dbo.fn_norm_inv(0.999)
        ) AS conditional_pd,

        -- Capital requirement K
        lgd * (
            dbo.fn_norm_cdf(
                (dbo.fn_norm_inv(pd) / SQRT(1 - rho))
                + SQRT(rho / (1 - rho)) * dbo.fn_norm_inv(0.999)
            ) - pd
        ) * maturity_scalar AS k_capital,

        -- Expected Loss
        pd * lgd * ead AS el

    FROM rho_calc
),

-- ============================================================
-- STEP 4: RWA and Capital
-- ============================================================

rwa_calc AS (
    SELECT
        facility_id,
        obligor_id,
        pd,
        lgd,
        ead,
        k_capital,
        k_capital * 12.5 * ead AS rwa,
        k_capital * 12.5 * ead * 0.08 AS minimum_capital,
        el,
        accounting_provision,
        el - accounting_provision AS el_shortfall  -- positive = shortfall
    FROM capital_calc
)

-- ============================================================
-- STEP 5: Final Output
-- ============================================================

SELECT
    facility_id,
    obligor_id,
    ROUND(pd * 100, 4)              AS pd_pct,
    ROUND(lgd * 100, 2)             AS lgd_pct,
    ROUND(ead / 1e6, 3)             AS ead_m,
    ROUND(k_capital * 100, 4)       AS k_capital_pct,
    ROUND(rwa / 1e6, 3)             AS rwa_m,
    ROUND(minimum_capital / 1e6, 3) AS min_capital_m,
    ROUND(el / 1e3, 1)              AS el_k,
    ROUND(el_shortfall / 1e3, 1)    AS el_shortfall_k
FROM rwa_calc
ORDER BY rwa DESC;

-- ============================================================
-- Portfolio Summary: EL Shortfall and Capital Deductions
-- ============================================================

WITH portfolio AS (
    -- (embed rwa_calc CTE here)
    SELECT SUM(el) AS total_el,
           SUM(accounting_provision) AS total_provisions,
           SUM(rwa) AS total_rwa
    FROM rwa_calc
)
SELECT
    total_el / 1e6                                    AS total_el_m,
    total_provisions / 1e6                            AS total_provisions_m,
    (total_el - total_provisions) / 1e6               AS net_shortfall_m,
    CASE WHEN total_el > total_provisions
         THEN (total_el - total_provisions) * 0.5 / 1e6
         ELSE 0 END                                    AS t1_deduction_m,
    CASE WHEN total_el > total_provisions
         THEN (total_el - total_provisions) * 0.5 / 1e6
         ELSE 0 END                                    AS t2_deduction_m,
    CASE WHEN total_provisions > total_el
         THEN LEAST(total_provisions - total_el, 0.006 * total_rwa) / 1e6
         ELSE 0 END                                    AS t2_addition_m
FROM portfolio;
```

---

## 10. Python Implementation

```python
"""
Basel II IRB Corporate RWA Calculator
Reference: BIS BCBS June 2006, paragraphs 272-279

Author: Credit Risk Academy — M14
"""

import numpy as np
from scipy.stats import norm
import pandas as pd
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class IRBExposure:
    """Represents a single Basel II IRB exposure."""
    facility_id: str
    obligor_id: str
    pd: float               # Annual PD, e.g. 0.0045 = 0.45%
    lgd: float              # LGD, e.g. 0.35 = 35%
    ead: float              # Exposure at default in currency units
    maturity: float         # Effective maturity in years
    annual_sales_eur_m: Optional[float] = None  # SME: annual sales €M
    is_sme: bool = False
    accounting_provision: float = 0.0
    asset_class: str = "Corporate"


class BaselIIIRBCalculator:
    """
    Computes Basel II IRB capital requirements per BIS BCBS June 2006.

    Key BIS paragraphs implemented:
        §272: Asset correlation formula
        §273: SME supporting factor
        §274: Capital requirement formula
        §275: Expected loss
        §276: Maturity adjustment
    """

    PD_FLOOR = 0.0003        # 0.03% floor for corporate (§285)
    CONFIDENCE_LEVEL = 0.999  # 99.9% (§272)
    TARGET_CAR = 0.08         # 8% minimum CAR
    RWA_SCALAR = 12.5         # 1 / 0.08

    def asset_correlation(self, pd: float, is_sme: bool = False,
                          annual_sales_eur_m: Optional[float] = None) -> float:
        """
        Corporate asset correlation per §272 and SME adjustment per §273.
        Range: 12% (high PD) to 24% (low PD).
        """
        pd = max(pd, self.PD_FLOOR)

        # Base corporate correlation
        exp_term = np.exp(-50 * pd)
        base = 1 - np.exp(-50)
        rho = (0.12 * (1 - exp_term) / base +
               0.24 * (1 - (1 - exp_term) / base))

        # SME firm-size adjustment (§273)
        if is_sme and annual_sales_eur_m is not None:
            s = np.clip(annual_sales_eur_m, 5, 50)
            rho -= 0.04 * (1 - (s - 5) / 45)

        return rho

    def maturity_adjustment(self, pd: float, maturity: float) -> float:
        """
        Maturity scaling factor per §276.
        Anchored at M=2.5 years.
        """
        pd = max(pd, self.PD_FLOOR)
        b = (0.11852 - 0.05478 * np.log(pd)) ** 2
        scalar = (1 + (maturity - 2.5) * b) / (1 - 1.5 * b)
        return scalar

    def capital_requirement(self, exposure: IRBExposure) -> dict:
        """
        Full IRB capital calculation per BIS §272–279.
        Returns dictionary of all intermediate and final values.
        """
        pd = max(exposure.pd, self.PD_FLOOR)
        lgd = exposure.lgd
        ead = exposure.ead
        m = exposure.maturity

        # Step 1: Asset correlation
        rho = self.asset_correlation(
            pd, exposure.is_sme, exposure.annual_sales_eur_m
        )

        # Step 2: Maturity adjustment
        mat_scalar = self.maturity_adjustment(pd, m)

        # Step 3: Vasicek conditional PD components
        g_pd = norm.ppf(pd)
        g_999 = norm.ppf(self.CONFIDENCE_LEVEL)  # ≈ 3.0902

        conditional_pd = norm.cdf(
            g_pd / np.sqrt(1 - rho) +
            np.sqrt(rho / (1 - rho)) * g_999
        )

        # Step 4: Capital requirement K
        k = lgd * (conditional_pd - pd) * mat_scalar

        # Step 5: RWA
        rwa = k * self.RWA_SCALAR * ead

        # Step 6: Minimum capital
        min_capital = rwa * self.TARGET_CAR

        # Step 7: Expected Loss
        el = pd * lgd * ead

        # Step 8: EL shortfall vs provisions
        el_shortfall = el - exposure.accounting_provision

        return {
            "facility_id": exposure.facility_id,
            "pd": pd,
            "lgd": lgd,
            "ead": ead,
            "maturity": m,
            "rho": rho,
            "g_pd": g_pd,
            "g_999": g_999,
            "conditional_pd": conditional_pd,
            "maturity_scalar": mat_scalar,
            "k_capital": k,
            "rwa": rwa,
            "minimum_capital": min_capital,
            "el": el,
            "accounting_provision": exposure.accounting_provision,
            "el_shortfall": el_shortfall,
            "t1_deduction": max(el_shortfall, 0) * 0.5,
            "t2_deduction": max(el_shortfall, 0) * 0.5,
        }

    def portfolio_rwa(self, exposures: list[IRBExposure]) -> pd.DataFrame:
        """Compute RWA for a portfolio of exposures."""
        results = [self.capital_requirement(e) for e in exposures]
        df = pd.DataFrame(results)

        # Portfolio-level EL vs provision comparison
        total_el = df["el"].sum()
        total_prov = df["accounting_provision"].sum()
        total_rwa = df["rwa"].sum()
        net_shortfall = total_el - total_prov

        summary = {
            "Total EAD": df["ead"].sum(),
            "Total RWA": total_rwa,
            "Avg Risk Weight %": total_rwa / df["ead"].sum() * 100,
            "Total Min Capital": df["minimum_capital"].sum(),
            "Total EL": total_el,
            "Total Provisions": total_prov,
            "EL Shortfall": max(net_shortfall, 0),
            "EL Surplus (T2 add, capped 0.6%)": min(
                max(-net_shortfall, 0), 0.006 * total_rwa
            ),
        }

        print("\n=== Portfolio Summary ===")
        for k, v in summary.items():
            print(f"  {k:35s}: {v:,.0f}")

        return df


# ============================================================
# Demonstration: worked example
# ============================================================

def worked_example():
    """
    Worked example for BIS BCBS June 2006 §272 formula validation.
    Inputs: PD=0.45%, LGD=35%, EAD=£10M, M=3.5yr
    """
    calc = BaselIIIRBCalculator()

    exposure = IRBExposure(
        facility_id="FAC-001",
        obligor_id="OBL-XYZ-001",
        pd=0.0045,        # 0.45% — BBB- equivalent
        lgd=0.35,         # 35% — senior secured with real estate
        ead=10_000_000,   # £10M
        maturity=3.5,     # 3.5 years
        is_sme=False,
        accounting_provision=12_000,
    )

    result = calc.capital_requirement(exposure)

    print("=" * 60)
    print("Basel II IRB Corporate Worked Example")
    print("BIS BCBS June 2006 — Paragraphs 272-279")
    print("=" * 60)
    print(f"  PD:                    {result['pd']*100:.4f}%")
    print(f"  LGD:                   {result['lgd']*100:.2f}%")
    print(f"  EAD:                   £{result['ead']:,.0f}")
    print(f"  Effective Maturity:    {result['maturity']:.1f} years")
    print(f"  Asset Correlation ρ:   {result['rho']*100:.4f}%")
    print(f"  G(PD):                 {result['g_pd']:.6f}")
    print(f"  G(0.999):              {result['g_999']:.6f}")
    print(f"  Conditional PD:        {result['conditional_pd']*100:.4f}%")
    print(f"  Maturity Scalar:       {result['maturity_scalar']:.6f}")
    print(f"  K (capital ratio):     {result['k_capital']*100:.4f}%")
    print(f"  RWA:                   £{result['rwa']:,.0f}")
    print(f"  Effective Risk Weight: {result['rwa']/result['ead']*100:.2f}%")
    print(f"  Min Capital (8%×RWA):  £{result['minimum_capital']:,.0f}")
    print(f"  Expected Loss:         £{result['el']:,.0f}")
    print(f"  EL Shortfall:          £{result['el_shortfall']:,.0f}")
    print(f"  T1 Capital Deduction:  £{result['t1_deduction']:,.0f}")


if __name__ == "__main__":
    worked_example()
```

---

## 11. Interview Questions

### Conceptual / Qualitative

**Q1: What are the three pillars of Basel II and what does each achieve?**
Expected answer: Pillar 1 (minimum capital: SA and IRB credit risk, market risk, operational risk), Pillar 2 (ICAAP and supervisory review), Pillar 3 (public disclosure for market discipline). Strong candidates explain why all three are needed together and give examples of how they interact.

**Q2: Why does asset correlation ρ decrease as PD increases in the Basel II formula?**
Expected answer: The Vasicek model assumes high-PD borrowers (sub-investment grade) are driven more by idiosyncratic factors — their defaults are less correlated with the macroeconomic cycle. High-quality borrowers (investment grade) tend to default in recessions — their failures are more systematic. This reflects empirical credit portfolio behaviour. Strong candidates note this creates counter-intuitive capital implications.

**Q3: What is the difference between Foundation IRB and Advanced IRB?**
Expected answer: FIRB: bank estimates PD; LGD, EAD, M use supervisory values (LGD: 45% unsecured, 75% sub). AIRB: bank estimates all four parameters using validated internal models with minimum data history requirements (5–7 years). AIRB produces lower capital for well-collateralised borrowers as internal LGD estimates (e.g., 20–30% for secured lending) beat the supervisory floors.

**Q4: Why did Basel II fail during the 2008 financial crisis?**
Expected answer: Five key failures:
1. Heavy reliance on external credit ratings — rating agencies assigned AAA to toxic CDO tranches
2. Procyclicality — rising PDs during the crisis triggered capital requirements precisely when capital was scarce
3. Trading book was severely under-capitalised (VaR models failed to capture tail risk)
4. Interconnectedness and systemic risk were not captured (no macroprudential dimension)
5. Off-balance-sheet vehicles (SIVs, conduits) escaped the framework — 0% CCF on liquidity lines allowed massive leverage

**Q5: Explain the EL shortfall / surplus mechanism.**
Expected answer: IRB capital covers unexpected loss. Regulatory EL = PD × LGD × EAD. If EL > accounting provisions (shortfall), the bank has under-provided — deduct 50% from T1, 50% from T2. If provisions > EL (surplus), the bank has over-provisioned — add the surplus to T2 capital, capped at 0.6% of credit RWA. This mechanism aligns accounting and regulatory capital frameworks.

### Technical / Quantitative

**Q6: Walk me through the calculation of K for PD=1%, LGD=45%, M=2.5 years.**
Expected: Compute ρ = ~19.5%, b factor, maturity scalar = 1.0 (anchored at 2.5yr), G(0.01), G(0.999) = 3.09, conditional PD ≈ 9.9%, K = 0.45 × (9.9% - 1%) × 1.0 ≈ 4.0%, RWA = 4% × 12.5 × EAD = 50% × EAD. Effective risk weight ≈ 50%.

**Q7: A £50M revolving credit facility is undrawn. How is EAD calculated under FIRB?**
Expected: FIRB CCF for commitments with maturity > 1 year = 75%. EAD = drawn amount + 75% × undrawn amount. If fully undrawn: EAD = 0 + 75% × £50M = £37.5M.

---

## 12. Common Mistakes

### Mistake 1: Confusing PD Floor Application
**Wrong**: Applying 0.03% floor only to unrated borrowers.
**Correct**: The 0.03% floor (§285) applies to all corporate exposures under IRB regardless of rating. Even AAA borrowers must have PD ≥ 0.0003.

### Mistake 2: Maturity Adjustment Anchoring
**Wrong**: Thinking longer maturity always means proportionally higher capital.
**Correct**: The maturity scaling is approximately linear around 2.5 years but flattens for high-PD borrowers (where b is large). For very high PD, the denominator (1 − 1.5b) approaches zero — the formula becomes numerically unstable.

### Mistake 3: Off-Balance-Sheet CCF Under SA
**Wrong**: Applying 0% CCF to all undrawn facilities.
**Correct**: Only unconditionally cancellable commitments get 0%. Legally committed undrawn facilities get 20% (original maturity ≤ 1yr) or 50% (> 1yr). Guarantees and standby LCs are 100% regardless.

### Mistake 4: SA Risk Weight for Unrated Corporates
**Wrong**: Assigning 0% risk weight to unrated corporates ("they're good companies we know").
**Correct**: Unrated corporates receive 100% risk weight under Basel II SA (same as BBB+ to BB−). Banks cannot apply judgment to override this.

### Mistake 5: AIRB LGD Not Reflecting Downturn Conditions
**Wrong**: Using mean recovery rates observed over the full economic cycle.
**Correct**: Basel II §468 requires LGD to reflect a "downturn LGD" — estimated loss rates during periods when credit losses are substantially higher than average. Practically: LGD in 2008–2009 conditions, not the 10-year average.

### Mistake 6: Ignoring Double-Counting in Securitisation
**Wrong**: Treating retained tranches of own securitisations at 0% RWA because "it's already capitalised in the underlying pool."
**Correct**: Retained securitisation positions receive the prescribed risk weights or 1,250% deduction. There is no offset for the capital the originator freed up by transferring assets — significant risk transfer tests must be passed.

---

## 13. Case Studies

### Case Study 1: The Capital Arbitrage Trade

**Situation**: In 2005, a major European bank held a £2Bn portfolio of BBB-rated corporate loans. Under Basel II SA (not yet on IRB), each loan attracted 100% risk weight. Total RWA = £2Bn; minimum capital = £160M.

The bank securitised the portfolio into a CLO. It retained the AAA-rated senior tranche (£1.8Bn, risk weight 20%) and the equity tranche (£50M, deducted from capital). The mezzanine tranches (£150M) were sold to investors.

**Pre-securitisation capital**: £160M
**Post-securitisation capital**: £1.8Bn × 20% × 8% + £50M deduction = £28.8M + £50M = £78.8M

Capital released: £81.2M — used to originate £1Bn of new corporate loans at the same risk appetite. Total balance sheet grew without increasing regulatory capital.

**Lesson**: This trade was legitimate under Basel II. The framework explicitly permitted it. The problem emerged when AAA-rated ABS were backed by US subprime mortgages with far higher true default probability than ratings implied. Basel II trusted the ratings; the ratings were wrong.

### Case Study 2: AIRB vs. FIRB for Secured Lending

**Situation**: A mid-sized regional bank held a £500M portfolio of senior secured term loans to UK mid-market companies. Collateral: first-charge real estate. Average LTV: 65%.

Under FIRB: LGD = 45% (supervisory value for unsecured senior). This ignores the collateral entirely.

The bank applied for AIRB approval. Internal recovery data (2,000 historical defaults over 15 years) showed average post-collateral LGD = 22%. Downturn LGD (2008–2009 cohort) = 31%.

**FIRB capital**: Total K × 12.5 × £500M using LGD = 45%
**AIRB capital** (using LGD = 31% downturn): ~31/45 ratio reduction in K × EAD

Capital saving: ~25–30%. At a 15% RoRC hurdle, this allowed a 25bps margin reduction — making the bank more competitive while maintaining the same economic return on capital.

**Lesson**: AIRB approval requires 7+ years of data, robust model governance, and supervisor approval. The capital benefit is real but the investment in data infrastructure and model validation is substantial.

---

## 14. Iterative Reinforcement

### Level 1 — Recall (Week 1)
- Sketch the three pillars from memory
- State the SA risk weights for: AAA corporate, unrated corporate, retail
- Define PD, LGD, EAD, M
- State the minimum capital ratios

### Level 2 — Application (Week 2)
- Compute K for PD=0.5%, LGD=40%, M=3yr without a calculator (rough estimate)
- Identify FIRB vs. AIRB parameter ownership
- Explain EL shortfall capital deduction in one paragraph
- Calculate EAD for a partially drawn revolver with a 75% CCF

### Level 3 — Synthesis (Week 3)
- Build the complete Excel IRB calculator from scratch
- Run the Python `worked_example()` and verify G(PD), ρ, K, RWA
- Write a one-page critique of why Basel II failed in 2008
- Design a data collection plan for AIRB model development

### Level 4 — Expert (Week 4)
- Explain procyclicality in Basel II and how TTC PD estimation was supposed to address it
- Compare Basel II SA vs. Basel III SA (revised) risk weights for corporates
- Derive the Vasicek model conditional PD formula from first principles
- Explain how the SME supporting factor affects pricing for a £30M revenue company

### Connections to Other Modules
- M15 (Basel III): How Basel III addressed every Basel II failure enumerated in §12
- M16 (IFRS 9): How EL under IFRS 9 relates to regulatory EL and the EL shortfall mechanism
- M12 (PD Models): How through-the-cycle PD calibration differs from point-in-time PD
- M13 (LGD/EAD): Downturn LGD estimation methods and regulatory requirements

---

## 15. Source Material

### Primary BIS Publications

1. **Basel Committee on Banking Supervision (BCBS). "International Convergence of Capital Measurement and Capital Standards: A Revised Framework — Comprehensive Version." Bank for International Settlements, June 2006.** ISBN: 92-9131-720-9. Available: https://www.bis.org/publ/bcbs128.htm
   - The definitive Basel II text. All formula references in this module trace to this document.
   - Critical sections: §§50–89 (SA), §§211–537 (IRB), §§538–643 (CRM), §§644–718 (Securitisation)

2. **BCBS. "Basel II: International Convergence of Capital Measurement and Capital Standards — A Revised Framework." June 2004 (first published version, CP3).** https://www.bis.org/publ/bcbs107.htm

3. **BCBS. "Studies on the Validation of Internal Rating Systems." Working Paper No. 14, May 2005.** https://www.bis.org/publ/bcbs_wp14.htm

4. **BCBS. "An Explanatory Note on the Basel II IRB Risk Weight Functions." July 2005.** https://www.bis.org/bcbs/irbriskweight.htm
   - Essential reading: explains the Vasicek model derivation and design choices.

5. **Vasicek, O.A. "Loan Portfolio Value." Risk, December 2002.**
   - The theoretical foundation for the IRB formula's single-factor model.

### Academic and Practitioner References

6. **Gordy, M.B. "A Risk-Factor Model Foundation for Ratings-Based Bank Capital Rules." Journal of Financial Intermediation, 2003.**
   - Shows how the IRB formula is derived from the Vasicek single-factor model.

7. **Roncalli, T. "Credit Risk Management." Wiley, 2020.**
   - Chapter 4 provides rigorous derivation of Basel II IRB formula.

8. **Basel Committee on Banking Supervision. "Findings on the Interaction of Market and Credit Risk." Working Paper No. 16, May 2009.**
   - Post-GFC analysis of Basel II limitations.

### Regulatory Implementation Documents

9. **European Parliament. "Capital Requirements Directive." Directives 2006/48/EC and 2006/49/EC.**
   - EU transposition of Basel II. Annex I–IX contain implementation details.

10. **Financial Services Authority (UK). "BIPRU Sourcebook." 2007–2013.**
    - UK implementation; now replaced by PRA Rulebook. Historical context for UK IRB firms.

11. **BCBS. "Findings on the Interaction of Market and Credit Risk." May 2009.** https://www.bis.org/publ/bcbs_wp16.htm
    - Documents Basel II's failure to capture correlation between market and credit risk during GFC.
