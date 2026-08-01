# M32 — Regulatory Capital for Credit Risk

## 1. Business Purpose

Regulatory capital is the buffer that protects depositors, creditors, and the financial system from the risk that a bank's loans go bad. Credit risk — the risk that borrowers cannot repay — is the single largest driver of bank capital requirements, typically representing 70-85% of total Risk-Weighted Assets (RWA) at a commercial bank.

Understanding the regulatory capital framework is essential for every credit professional because:

**Pricing and profitability:** Loans are priced to generate a target Return on Equity (ROE) or Return on Risk-Weighted Assets (RORWA). A loan that consumes high capital requires a higher spread to be profitable. Understanding what drives RWA enables credit teams to structure transactions efficiently and price them correctly. A secured real estate loan with a good quality borrower might attract 40% RWA density; an unsecured working capital facility to a speculative-grade borrower might attract 120% RWA density.

**Capital allocation:** Senior management allocates risk appetite across business units partly through RWA budgets. A business line that generates £100m of RWA must generate sufficient profit to justify that capital consumption. Portfolio decisions — grow CRE, reduce unsecured corporate — are partly driven by RWA efficiency considerations.

**Regulatory compliance:** Breaching minimum CET1 ratios has severe consequences including mandatory Pillar 1 deductions, restrictions on dividends, AT1 coupon payments, and variable compensation. In extremis, the PRA can restrict new business or require capital raise. Credit teams must understand the capital implications of their decisions.

**ICAAP and Pillar 2:** The bank must demonstrate to the PRA that it holds sufficient capital above the minimum to cover all material risks, including those not captured in Pillar 1 (concentration risk, model risk, etc.). The credit risk section of the ICAAP depends directly on understanding how Pillar 1 capital is calculated and what it leaves uncovered.

**Structuring for capital efficiency:** Certain structuring choices reduce regulatory capital: taking collateral (reduces LGD), using credit risk mitigation (CRM) such as guarantees (substitutes lower-risk counterparty), syndication (reduces EAD), shorter maturity (reduces maturity adjustment). Credit teams with capital knowledge can structure loans to achieve the same risk transfer at lower capital cost.

---

## 2. Accounting Concepts

**Risk-Weighted Assets (RWA) and Capital Ratios**

RWA is the accounting/regulatory concept that translates the economic riskiness of each asset into a common unit for capital measurement. A government bond has 0% RWA; an unsecured corporate loan to a BB-rated borrower might have 100% RWA; a retail mortgage with high LTV might have 75% RWA under standardised approach.

The core capital adequacy ratios (CRR/Basel III):
```
CET1 Ratio    = CET1 Capital / Total RWA           ≥ 4.5% (minimum)
Tier 1 Ratio  = Tier 1 Capital / Total RWA          ≥ 6.0%
Total Capital = Total Capital / Total RWA            ≥ 8.0%
```

**CET1 Capital (Common Equity Tier 1)** is the highest quality capital: ordinary share capital + retained earnings - regulatory deductions (goodwill, DTAs above threshold, defined benefit pension deficit, shortfall of provisions to expected loss).

**AT1 Capital (Additional Tier 1)** is contingent convertible bonds (CoCos) that convert to equity when CET1 falls below a trigger (typically 5.125% or 7%). AT1 absorbs losses without the bank entering insolvency.

**Tier 2 Capital** includes subordinated debt with maturity >5 years and eligible general provisions.

**Capital Buffers (on top of minimums)**
- Capital Conservation Buffer (CCB): 2.5% of RWA in CET1 (mandatory)
- Countercyclical Capital Buffer (CCyB): 0-2.5% of RWA, set by FPC (varies with credit cycle)
- G-SII/O-SII buffer: 1-3% for systemically important banks
- Total "combined buffer requirement" = CCB + CCyB + GSII buffer

**Shortfall of Provisions to EL (IRB Banks)**

Under IRB, if the IFRS 9 provision (ECL) is less than the regulatory Expected Loss (EL = EAD × PD × LGD), the shortfall is deducted from CET1 capital. If ECL exceeds EL, the excess (up to 0.6% of credit RWA) can be added to Tier 2 capital. This creates a direct accounting link between provisioning adequacy and capital.

---

## 3. Financial Concepts

**The Basel IRB Formula**

The IRB (Internal Ratings-Based) formula derives the capital requirement K for each exposure. This is the most important formula in credit risk capital:

```
K = LGD × N[ (1-ρ)^(-0.5) × G(PD) + (ρ/(1-ρ))^0.5 × G(0.999) ] - PD × LGD × MA
```

Where:
- K = capital requirement per unit of EAD (as a decimal)
- N[x] = cumulative standard normal distribution
- G(x) = inverse cumulative standard normal (= NORM.S.INV in Excel)
- PD = probability of default
- LGD = loss given default
- ρ = asset correlation parameter (see below)
- MA = maturity adjustment (1 + (M-2.5) × b) / (1 - 1.5 × b)
- M = effective maturity (years)
- b = (0.11852 - 0.05478 × ln(PD))²

**Then: RWA = K × 12.5 × EAD** (the 12.5 is the reciprocal of the 8% minimum capital ratio)

**The Asset Correlation Parameter ρ**

For corporate exposures (CRR Art. 153):
```
ρ = 0.12 × (1 - exp(-50 × PD)) / (1 - exp(-50)) + 0.24 × [1 - (1 - exp(-50×PD)) / (1 - exp(-50))]
```

This simplifies to: ρ ranges between 0.12 (high PD obligors) and 0.24 (low PD obligors). The regulatory logic: low-PD obligors are more sensitive to the common economic factor (systematic risk), so they have higher asset correlation. This is counterintuitive but reflects the empirical observation that the default rates of investment-grade firms move more with the economic cycle.

**SME Supporting Factor and Correlation Adjustment**

For SME exposures (annual turnover <€50m), CRR Art. 153(4) applies a firm-size adjustment:

```
ρ_SME = ρ_corporate - 0.04 × (1 - (S - 5) / 45)
```

Where S is the annual turnover in millions (between 5 and 50). This reduces ρ for SMEs, reducing their capital requirement. Additionally, CRR Art. 501 provides an SME supporting factor of 0.7619 applied to the capital requirement for SMEs meeting certain criteria — effectively reducing SME RWA by ~24%.

**The Maturity Adjustment**

Longer-term exposures have higher capital requirements because there is more time for a borrower to deteriorate and default. The maturity adjustment MA increases K for M > 2.5 years and decreases it for M < 2.5 years. The effective maturity M is the weighted average time to cash flows, subject to a floor of 1 year and cap of 5 years.

**The Output Floor (Basel IV / CRR3)**

Under CRR3 (implementing Basel IV, applying from 1 January 2025 in the EU; delayed in UK), the output floor requires that IRB-based RWA cannot fall below 72.5% of the Standardised Approach RWA. This is a major constraint for sophisticated IRB banks whose internal models generate low RWA. The floor reduces the capital benefit of IRB models, particularly for low-PD portfolios (mortgages, investment-grade corporate).

**RWA Density**

RWA density = RWA / EAD. This metric benchmarks capital intensity across portfolios and between banks. Published in Pillar 3 disclosures, it allows analysts to compare how efficiently banks use capital. Low density (30-50%) = low-risk collateralised/investment-grade exposures. High density (80-130%) = unsecured/speculative-grade exposures.

Regulators benchmarked RWA density across IRB banks during TRIM and the PRA's internal model review, identifying outliers that appeared to have unjustifiably low RWA density and requiring increases.

---

## 4. Statistical Concepts

**The Vasicek Foundation of the IRB Formula**

The Basel IRB formula is derived directly from the Vasicek (2002) asymptotic single risk factor (ASRF) model. The key statistical assumption is that in a large, granular portfolio, idiosyncratic (borrower-specific) risk is diversified away. Only the systematic risk (common factor driving all defaults) remains. The 99.9th percentile conditional default rate — given the worst 1-in-1,000-year realisation of the common factor — drives the capital charge.

**Conditional Default Rate**

Under the ASRF model, given the common factor M = m, the conditional default probability for all obligors of type i is:

```
PD(M=m) = N[ (G(PD) - √ρ × m) / √(1-ρ) ]
```

At the 99.9th percentile, M = G(0.001) = -3.09 (a severe adverse macroeconomic environment). Plugging this in:

```
PD_conditional(99.9%) = N[ (G(PD) + √ρ × 3.09) / √(1-ρ) ]
```

This is the PD in the worst 1-in-1,000 economic year. Capital must absorb the loss at this conditional default rate: K = LGD × PD_conditional(99.9%) - EL.

**Model Uncertainty and Conservatism in IRB Estimates**

EBA guidelines (EBA/GL/2017/16 and GL/2020/05) require that PD and LGD estimates include Margins of Conservatism (MoC) to account for:
- Model uncertainty (imperfect models)
- Data uncertainty (limited historical data, representativeness)
- Parameter uncertainty (sampling error in estimated coefficients)

MoC effectively increases IRB estimates above the raw model output, increasing RWA. The magnitude of MoC is a key regulatory focus — too little conservatism leads to RWA underestimation.

**Through-the-Cycle vs. Point-in-Time**

IRB capital requires **through-the-cycle (TTC) PD** — an average PD over a complete credit cycle, not sensitive to current economic conditions. This is different from IFRS 9, which requires **point-in-time (PIT) PD** that reflects current and forward-looking conditions. The difference creates a natural divergence between regulatory capital (stable) and accounting provisions (cyclical) — provisions rise in recessions when PIT PDs increase, but regulatory capital based on TTC PDs moves less dramatically.

---

## 5. Regulatory Framework

**Basel III and CRR/CRR2 (Pillar 1)**

Basel III (BCBS, 2010, fully implemented) introduced:
- CET1 minimum 4.5% (increased from 2%)
- Tier 1 minimum 6%
- Capital buffers (CCB, CCyB, G-SII)
- Leverage ratio (Tier 1 / Total Exposures ≥ 3%)
- Liquidity requirements (LCR, NSFR)

CRR (EU Capital Requirements Regulation, No. 575/2013) and CRD IV implemented Basel III in the EU. CRR2 (2019) implemented Basel reforms including SA-CCR for derivatives. UK retained CRR post-Brexit as "UK CRR."

**Basel IV / CRR3 / PRA Near-Final Rules**

Basel IV (BCBS, December 2017) includes:
- Output floor of 72.5% of SA RWA
- Revised standardised approach (new SA risk weights, more granular)
- Revised IRB: removal of A-IRB for large corporates and banks (must use F-IRB)
- Leverage ratio finalisations

CRR3 implements Basel IV in the EU from 1 January 2025. The PRA's near-final rules (CP16/22, PS17/23) implement for UK banks.

**IRB Permission and Governance**

To use IRB, a bank must obtain PRA permission. Requirements include:
- Minimum 5 years of internal default data (7 years preferred)
- Use test (models must be used in decision-making, not just regulatory capital)
- Annual model validation by an independent validation function
- Model inventory and documentation meeting SR 11-7/SS1/23 standards
- Regular benchmarking of IRB estimates against external data

**Pillar 2 Framework**

Pillar 2A add-ons are set by the PRA through the SREP and cover risks not in Pillar 1 (concentration risk, interest rate risk in the banking book, model risk, etc.). P2A is a fixed add-on. Pillar 2B (formerly the P2B buffer / formerly the "CRD IV combined buffer") covers stress-test-derived capital needs and is now overlaid by the PRA Buffer (the buffer above P2A minimum that must be maintained).

**ICAAP — Internal Capital Adequacy Assessment Process**

ICAAP is the bank's own assessment of capital needs, submitted to the PRA annually. For credit risk, it must cover: adequacy of Pillar 1, concentration risk add-on, stress testing impact, and management actions. The PRA uses the ICAAP to set the Pillar 2 capital requirement and may challenge assumptions or require increases.

---

## 6. Data Required

**For IRB Calculation**
- EAD: Current drawn balance + CCF × undrawn commitment
- PD: From IRB rating model (TTC, 12-month), floored at 0.03% for corporate
- LGD: From IRB LGD model (downturn LGD), floored at 0% for secured, no floor for unsecured
- M: Effective maturity in years, typically contractual maturity, floor 1yr, cap 5yr
- S: Annual turnover (for SME supporting factor)
- Asset class classification: corporate, retail, sovereign, bank, specialised lending
- CRM: Collateral type and value, guarantor PD, netting agreements

**For Standardised Approach**
- Obligor type and external credit rating (Moody's/S&P/Fitch)
- Exposure type (residential mortgage, commercial mortgage, retail, corporate, etc.)
- Collateral type and LTV (for residential and CRE)

**Capital Data**
- CET1, AT1, T2 capital components (from Finance/Treasury)
- Total RWA (credit, market, operational) for ratio calculation
- Shortfall/excess of provisions to EL

---

## 7. How Analysts Actually Work

**RWA Calculation Flow**

In a typical IRB bank, the RWA calculation is automated: the loan system feeds EAD, maturity, and collateral to the credit risk data warehouse. The rating system assigns PD and LGD. A regulatory capital engine (often built in-house or from vendors like Moody's REMA or Fermat) applies the Basel IRB formula and produces RWA by facility.

The credit analyst's role is to ensure the **inputs** are correct:
- Is the maturity correct (reflecting extensions, refinancings)?
- Is collateral properly recorded (type, value, legal enforceability)?
- Has the CCF been applied to undrawn commitments?
- Is the borrower classified in the right asset class (corporate vs. retail vs. specialised lending)?

**RORWA Pricing Analysis**

Before recommending a credit, the analyst (or credit team with pricing tools) calculates:
```
Net interest income                    = EAD × (spread + base rate) × funding cost
Less: operating costs                  = EAD × cost allocation rate
Less: expected loss                    = EAD × PD × LGD
Return before tax                      = NII - OpEx - EL
Return after tax                       = Pre-tax × (1 - tax rate)
RWA                                    = EAD × K × 12.5
RORWA (Return on RWA)                  = Return after tax / RWA
CET1 allocated                         = RWA × CET1 target ratio
ROCE (Return on Allocated CET1)        = Return after tax / CET1 allocated
```

If RORWA < hurdle rate (typically 10-15% for commercial banks), the credit is unprofitable and either declined or repriced.

**Concentration Risk and Pillar 2A**

Portfolio risk teams analyse whether the Pillar 1 capital covers concentration risk. If the bank has 25% of its portfolio in a single sector, a concentration risk add-on is estimated (using Herfindahl index or stressed portfolio models) and included in the ICAAP. The PRA reviews this and may require a larger add-on than the bank's internal estimate.

---

## 8. Excel Implementation

**Full IRB RWA Calculator**

```
INPUTS:
  PD:         0.0150   (1.50% — BB+ equivalent)
  LGD:        0.4500   (45% — unsecured corporate)
  EAD:        £10,000,000
  M (years):  3.0      (3-year term loan)
  Turnover:   £75m     (SME? No — above €50m threshold)

STEP 1 — ASSET CORRELATION (ρ)
  exp_term       = EXP(-50 × PD)                = EXP(-50×0.015) = 0.4724
  denom          = 1 - EXP(-50)                 = 0.99999...     ≈ 1.000
  rho = 0.12 × (1-exp_term)/denom + 0.24 × (1-(1-exp_term)/denom)
  rho = 0.12 × 0.5276 + 0.24 × 0.4724          = 0.0633 + 0.1134 = 0.1767

STEP 2 — MATURITY ADJUSTMENT (b and MA)
  b  = (0.11852 - 0.05478 × LN(PD))²
     = (0.11852 - 0.05478 × LN(0.015))²
     = (0.11852 - 0.05478 × (-4.1997))²
     = (0.11852 + 0.23007)²
     = (0.34859)² = 0.1215

  MA = (1 + (M - 2.5) × b) / (1 - 1.5 × b)
     = (1 + (3.0 - 2.5) × 0.1215) / (1 - 1.5 × 0.1215)
     = (1 + 0.0608) / (1 - 0.1823)
     = 1.0608 / 0.8177 = 1.2971

STEP 3 — CAPITAL REQUIREMENT K
  G(PD)   = NORM.S.INV(0.015)   = -2.1701
  G(0.999)= NORM.S.INV(0.999)   =  3.0902

  inner_term = ((1-rho)^(-0.5)) × G(PD) + (rho/(1-rho))^0.5 × G(0.999)
             = (1/SQRT(0.8233)) × (-2.1701) + SQRT(0.1767/0.8233) × 3.0902
             = 1.1016 × (-2.1701) + 0.4631 × 3.0902
             = -2.3907 + 1.4310 = -0.9597

  K_before_MA = LGD × N(inner_term) - PD × LGD
              = 0.45 × NORM.S.DIST(-0.9597, TRUE) - 0.015 × 0.45
              = 0.45 × 0.1686 - 0.00675
              = 0.07587 - 0.00675 = 0.06912

  K_final = K_before_MA × MA
           = 0.06912 × 1.2971 = 0.08966    (= 8.97% capital per unit EAD)

STEP 4 — RWA
  RWA = K × 12.5 × EAD
      = 0.08966 × 12.5 × £10,000,000
      = £11,207,500

  RWA density = RWA / EAD = 112.1%

STEP 5 — OUTPUT FLOOR CHECK (CRR3)
  SA Risk Weight for BB+ unsecured corporate = 100%
  SA RWA = 100% × EAD = £10,000,000
  Floor RWA = 72.5% × SA RWA = £7,250,000
  IRB RWA (£11,207,500) > Floor RWA (£7,250,000) → Floor does not bind

STEP 6 — CAPITAL ALLOCATION
  Capital requirement = K × EAD = 0.08966 × £10m = £896,600
  At 13% CET1 target: CET1 allocated = 13% × £11,207,500 = £1,456,975
```

---

## 9. SQL Implementation

```sql
-- =================================================================
-- IRB RWA Calculator — SQL Server Implementation
-- =================================================================

-- Step 1: Create the IRB calculation as a scalar function
-- (SQL Server syntax — adjust for PostgreSQL/Oracle as needed)

CREATE OR ALTER FUNCTION dbo.fn_IRB_RWA (
    @pd     FLOAT,   -- Probability of Default (decimal, e.g. 0.015)
    @lgd    FLOAT,   -- Loss Given Default (decimal, e.g. 0.45)
    @ead    FLOAT,   -- Exposure at Default (£)
    @m      FLOAT,   -- Effective Maturity (years, 1-5)
    @sme    BIT,     -- 1 if SME (turnover 5-50m)
    @s      FLOAT    -- Annual turnover (£m, for SME adjustment)
)
RETURNS FLOAT
AS BEGIN
    DECLARE
        @rho    FLOAT,
        @b      FLOAT,
        @ma     FLOAT,
        @gPD    FLOAT,
        @g999   FLOAT,
        @inner  FLOAT,
        @k      FLOAT,
        @rwa    FLOAT

    -- Floor PD at 0.0003 (Basel minimum for corporate)
    SET @pd = CASE WHEN @pd < 0.0003 THEN 0.0003 ELSE @pd END

    -- Cap maturity at 5, floor at 1
    SET @m = CASE WHEN @m > 5 THEN 5 WHEN @m < 1 THEN 1 ELSE @m END

    -- Asset correlation (corporate formula)
    DECLARE @exp50pd FLOAT = EXP(-50.0 * @pd)
    SET @rho = 0.12 * (1 - @exp50pd) + 0.24 * (1 - (1 - @exp50pd))
    -- Simplified: rho = 0.12 + 0.12 * (1 - exp(-50*PD)) / (1 - exp(-50))
    -- Full formula:
    SET @rho = 0.12 * (1.0 - @exp50pd) / (1.0 - EXP(-50.0))
             + 0.24 * (1.0 - (1.0 - @exp50pd) / (1.0 - EXP(-50.0)))

    -- SME firm-size adjustment
    IF @sme = 1 AND @s BETWEEN 5 AND 50
        SET @rho = @rho - 0.04 * (1.0 - (@s - 5.0) / 45.0)

    -- Maturity adjustment
    SET @b  = POWER(0.11852 - 0.05478 * LOG(@pd), 2)
    SET @ma = (1.0 + (@m - 2.5) * @b) / (1.0 - 1.5 * @b)

    -- Inverse normal: SQL Server lacks NORM.S.INV; use approximation or CLR
    -- Here we reference a pre-computed lookup or CLR function
    -- Placeholder: dbo.fn_NormSInv(@pd)
    SET @gPD  = dbo.fn_NormSInv(@pd)
    SET @g999 = 3.09023  -- NORM.S.INV(0.999) = 3.09023

    -- IRB inner term
    SET @inner = (1.0 / SQRT(1.0 - @rho)) * @gPD
               + SQRT(@rho / (1.0 - @rho)) * @g999

    -- K = LGD × N(inner) − PD × LGD × MA
    SET @k = @lgd * dbo.fn_NormCDF(@inner) - @pd * @lgd
    SET @k = @k * @ma

    -- RWA = K × 12.5 × EAD
    SET @rwa = @k * 12.5 * @ead

    RETURN @rwa
END
GO


-- Step 2: Apply to portfolio and calculate capital ratios
WITH irb_rwa AS (
    SELECT
        f.facility_id,
        f.obligor_name,
        f.segment,
        f.sector,
        f.ead,
        f.pd,
        f.lgd,
        f.effective_maturity,
        f.is_sme,
        f.annual_turnover_m,
        dbo.fn_IRB_RWA(f.pd, f.lgd, f.ead, f.effective_maturity,
                        f.is_sme, f.annual_turnover_m)    AS rwa_irb,
        f.ead * f.sa_risk_weight                          AS rwa_sa
    FROM portfolio_facilities f
    WHERE f.facility_status = 'ACTIVE'
),

output_floor AS (
    SELECT
        *,
        -- Output floor: RWA_floor = max(RWA_IRB, 72.5% × RWA_SA)
        CASE
            WHEN rwa_irb < 0.725 * rwa_sa THEN 0.725 * rwa_sa
            ELSE rwa_irb
        END                                               AS rwa_floored,
        rwa_irb / NULLIF(ead, 0) * 100                   AS rwa_density_pct,
        pd * lgd * ead                                    AS el
    FROM irb_rwa
),

portfolio_summary AS (
    SELECT
        segment,
        SUM(ead)          AS total_ead,
        SUM(el)           AS total_el,
        SUM(rwa_irb)      AS total_rwa_irb,
        SUM(rwa_sa)       AS total_rwa_sa,
        SUM(rwa_floored)  AS total_rwa_floored
    FROM output_floor
    GROUP BY segment
),

capital_ratio AS (
    SELECT
        'PORTFOLIO'     AS level,
        SUM(total_ead)  AS total_ead,
        SUM(total_rwa_floored)  AS total_rwa,
        (SELECT capital_amount FROM regulatory_capital WHERE capital_tier = 'CET1') AS cet1,
        SUM(total_rwa_floored) * 0.725 / NULLIF(SUM(total_rwa_sa), 0) AS floor_bind_ratio
    FROM portfolio_summary
)

SELECT
    cr.total_ead / 1e9          AS ead_bn,
    cr.total_rwa / 1e9          AS rwa_bn,
    cr.cet1 / 1e9               AS cet1_bn,
    cr.cet1 / cr.total_rwa * 100 AS cet1_ratio_pct,
    cr.floor_bind_ratio * 100   AS floor_utilisation_pct
FROM capital_ratio cr;
```

---

## 10. Python Implementation

```python
"""
M32 Regulatory Capital — Full IRB RWA Calculator
Implements the Basel IRB formula with all adjustments.
"""

import numpy as np
import pandas as pd
from scipy.stats import norm

# ─────────────────────────────────────────────────────────────
# CORE IRB FORMULA FUNCTIONS
# ─────────────────────────────────────────────────────────────

def asset_correlation(pd: float, is_sme: bool = False,
                      turnover_m: float = None) -> float:
    """
    Corporate asset correlation ρ per Basel/CRR Art. 153.
    Includes SME firm-size adjustment.
    """
    pd = max(pd, 0.0003)  # PD floor 0.03%
    exp_term = np.exp(-50.0 * pd)
    rho = (0.12 * (1 - exp_term) / (1 - np.exp(-50.0))
           + 0.24 * (1 - (1 - exp_term) / (1 - np.exp(-50.0))))
    # SME adjustment: subtract up to 0.04 based on size
    if is_sme and turnover_m is not None:
        s = np.clip(turnover_m, 5.0, 50.0)
        rho -= 0.04 * (1.0 - (s - 5.0) / 45.0)
    return rho


def maturity_adjustment(pd: float, m: float) -> float:
    """Maturity adjustment MA per Basel/CRR Art. 153."""
    pd = max(pd, 0.0003)
    m  = np.clip(m, 1.0, 5.0)
    b  = (0.11852 - 0.05478 * np.log(pd)) ** 2
    ma = (1 + (m - 2.5) * b) / (1 - 1.5 * b)
    return ma


def irb_k(pd: float, lgd: float, rho: float, ma: float) -> float:
    """
    Capital requirement K per unit EAD.
    K = LGD × N[(G(PD) + sqrt(rho/(1-rho)) × G(0.999)) / sqrt(1-rho)] − PD×LGD, ×MA
    """
    pd  = max(pd,  0.0003)
    lgd = np.clip(lgd, 0.0, 1.0)
    g_pd  = norm.ppf(pd)
    g_999 = norm.ppf(0.999)
    inner = (g_pd / np.sqrt(1 - rho)) + (np.sqrt(rho / (1 - rho)) * g_999)
    k_raw = lgd * norm.cdf(inner) - pd * lgd
    return k_raw * ma


def irb_rwa(pd: float, lgd: float, ead: float, m: float = 2.5,
            is_sme: bool = False, turnover_m: float = None) -> dict:
    """
    Full IRB RWA calculation.
    Returns dict with all intermediate values.
    """
    rho = asset_correlation(pd, is_sme, turnover_m)
    ma  = maturity_adjustment(pd, m)
    k   = irb_k(pd, lgd, rho, ma)
    rwa = k * 12.5 * ead
    el  = pd * lgd * ead
    return {
        'pd':            pd,
        'lgd':           lgd,
        'ead':           ead,
        'rho':           rho,
        'ma':            ma,
        'k':             k,
        'rwa':           rwa,
        'rwa_density':   rwa / ead if ead > 0 else 0,
        'el':            el,
        'capital_req':   k * ead,
    }


# ─────────────────────────────────────────────────────────────
# WORKED EXAMPLE — SINGLE LOAN
# ─────────────────────────────────────────────────────────────
print("=" * 60)
print("IRB RWA CALCULATION — SINGLE FACILITY")
print("=" * 60)
result = irb_rwa(pd=0.015, lgd=0.45, ead=10_000_000, m=3.0)
for k, v in result.items():
    if k in ('ead', 'rwa', 'el', 'capital_req'):
        print(f"  {k:20s}: £{v:,.0f}")
    elif k in ('pd', 'lgd', 'k', 'rwa_density'):
        print(f"  {k:20s}: {v*100:.3f}%")
    else:
        print(f"  {k:20s}: {v:.6f}")


# ─────────────────────────────────────────────────────────────
# PORTFOLIO-LEVEL CALCULATION WITH OUTPUT FLOOR
# ─────────────────────────────────────────────────────────────

# Simulate a portfolio
np.random.seed(42)
n = 200
df = pd.DataFrame({
    'facility_id':   range(n),
    'pd':            np.random.beta(1.5, 50, n).clip(0.0003, 0.30),
    'lgd':           np.random.beta(4, 8, n).clip(0.05, 0.95),
    'ead':           np.random.lognormal(np.log(5e6), 0.8, n),
    'm':             np.random.choice([1, 2, 3, 5], n),
    'is_sme':        np.random.choice([True, False], n, p=[0.4, 0.6]),
    'sa_rw':         np.random.choice([0.75, 1.00, 1.50], n, p=[0.3, 0.5, 0.2]),
})
df.loc[df['is_sme'], 'turnover_m'] = np.random.uniform(5, 50, df['is_sme'].sum())
df['turnover_m'] = df['turnover_m'].fillna(200)

# Calculate IRB RWA for each facility
irb_results = df.apply(
    lambda r: irb_rwa(r['pd'], r['lgd'], r['ead'], r['m'],
                      r['is_sme'], r['turnover_m']),
    axis=1
)
irb_df = pd.DataFrame(irb_results.tolist())
df = pd.concat([df.reset_index(drop=True), irb_df[['rho','ma','k','rwa','el','rwa_density']]], axis=1)

# SA RWA for output floor
df['rwa_sa'] = df['ead'] * df['sa_rw']

# Output floor: floored RWA = max(IRB RWA, 72.5% × SA RWA)
df['rwa_floor'] = 0.725 * df['rwa_sa']
df['rwa_final'] = np.maximum(df['rwa'], df['rwa_floor'])
df['floor_binding'] = df['rwa'] < df['rwa_floor']

# Portfolio summary
PORTFOLIO_CET1 = 120_000_000  # £120m CET1

print("\n" + "=" * 60)
print("PORTFOLIO CAPITAL METRICS")
print("=" * 60)
print(f"  Total EAD:                £{df['ead'].sum()/1e6:,.0f}m")
print(f"  Total EL:                 £{df['el'].sum()/1e6:,.0f}m")
print(f"  Total IRB RWA:            £{df['rwa'].sum()/1e6:,.0f}m")
print(f"  Total SA RWA:             £{df['rwa_sa'].sum()/1e6:,.0f}m")
print(f"  Total RWA (floored):      £{df['rwa_final'].sum()/1e6:,.0f}m")
print(f"  Output floor binding:     {df['floor_binding'].sum()} facilities "
      f"({df['floor_binding'].sum()/n*100:.0f}%)")
print(f"  CET1 Capital:             £{PORTFOLIO_CET1/1e6:,.0f}m")
print(f"  CET1 Ratio (IRB):         {PORTFOLIO_CET1/df['rwa'].sum()*100:.1f}%")
print(f"  CET1 Ratio (floored):     {PORTFOLIO_CET1/df['rwa_final'].sum()*100:.1f}%")
print(f"  Avg RWA density (IRB):    {df['rwa'].sum()/df['ead'].sum()*100:.1f}%")


# ─────────────────────────────────────────────────────────────
# SENSITIVITY: PD IMPACT ON RWA DENSITY
# ─────────────────────────────────────────────────────────────
pd_range = np.linspace(0.0005, 0.30, 100)
lgd_fixed = 0.45
m_fixed   = 3.0

rwa_densities = []
for pd_val in pd_range:
    res = irb_rwa(pd_val, lgd_fixed, 1.0, m_fixed)
    rwa_densities.append(res['rwa_density'])

print("\nPD → RWA Density Sensitivity (LGD=45%, M=3yr):")
for pd_val, density in zip([0.001, 0.005, 0.01, 0.02, 0.05, 0.10, 0.20],
                             [irb_rwa(p, 0.45, 1.0, 3.0)['rwa_density']
                              for p in [0.001, 0.005, 0.01, 0.02, 0.05, 0.10, 0.20]]):
    grade = ('AAA' if pd_val < 0.002 else 'A' if pd_val < 0.006 else
             'BBB' if pd_val < 0.015 else 'BB' if pd_val < 0.05 else
             'B' if pd_val < 0.12 else 'CCC')
    print(f"  PD={pd_val*100:.2f}% (~{grade:3s})  →  RWA density = {density*100:.0f}%")
```

---

## 11. Interview Questions

1. **"Walk me through the Basel IRB formula."**
   Cover: K = LGD × N[...] − PD×LGD, then RWA = K × 12.5 × EAD. Explain ρ (asset correlation, driven by systematic risk), MA (longer maturity = more capital). Mention that the 99.9th percentile worst-case PD drives the capital charge.

2. **"What is the output floor and why was it introduced?"**
   The output floor (72.5% of SA RWA) prevents IRB banks from generating implausibly low RWA through aggressive model assumptions. It was a key Basel IV reform introduced because of wide dispersion in RWA across banks for similar portfolios — the 2013 BCBS benchmarking study found IRB RWA for identical loan portfolios varied by up to 100%. The floor restores consistency.

3. **"Why does the asset correlation (ρ) decrease as PD increases?"**
   Low-PD obligors are typically large investment-grade companies whose fortunes are more tied to the macro cycle (systematic risk). High-PD obligors are typically smaller or weaker companies affected more by idiosyncratic factors. Hence higher-quality obligors have higher systematic risk (ρ) and paradoxically higher capital concentration charges per unit of RWA.

4. **"What is the difference between Pillar 1 and Pillar 2A capital?"**
   Pillar 1 is the standardised minimum based on Basel formula (credit, market, operational RWA). Pillar 2A is the PRA's add-on for risks not captured or undercaptured in Pillar 1 — concentration risk, model risk, pension risk, etc. Pillar 2A is firm-specific and set through the SREP.

5. **"How does IFRS 9 ECL interact with regulatory capital?"**
   If ECL (accounting provision) < regulatory EL, the shortfall is deducted from CET1. If ECL > EL, the excess (up to 0.6% of IRB credit RWA) can be added to Tier 2. This creates an incentive to provision adequately — underprovision reduces capital.

---

## 12. Common Mistakes

**Mistake 1: Confusing TTC PD (for capital) with PIT PD (for ECL)**
IRB capital uses TTC PD — stable across the cycle. IFRS 9 ECL uses PIT PD — forward-looking, sensitive to economic conditions. Using PIT PD in the IRB formula understates capital in benign conditions and overstates it in recessions. The two are different inputs for different purposes.

**Mistake 2: Applying the SME supporting factor incorrectly**
The SME supporting factor (0.7619 RWA reduction under CRR Art. 501) applies to SMEs meeting specific criteria — turnover <€50m AND the exposure must be to the SME in the retail or corporate asset class. It does NOT apply to all loans to companies <€50m turnover; it requires additional eligibility conditions.

**Mistake 3: Forgetting the maturity cap of 5 years**
Loans longer than 5 years receive the same maturity adjustment as a 5-year loan — the BA for maturity is capped. Many analysts assume 10-year loans get a higher MA than 5-year loans; they don't.

**Mistake 4: Using EAD before CRM for large exposure limits**
The 25% large exposure limit applies to EAD AFTER credit risk mitigation (CRM) — netting, eligible collateral, eligible guarantees. EAD before CRM (gross exposure) will always be larger. Always confirm whether a large exposure figure is gross or net of CRM.

**Mistake 5: Ignoring the floor RWA in output floor analysis**
Post-CRR3/Basel IV, every IRB exposure must have its IRB RWA compared to 72.5% × SA RWA. Many analysts calculate only the IRB RWA and fail to check whether the floor binds. For well-collateralised or investment-grade portfolios, the floor may significantly increase RWA.

---

## 13. Case Studies

**Case Study 1: BCBS 2013 RWA Benchmarking Study**
The Basel Committee's 2013 study of 32 banks found that, for an identical hypothetical portfolio of 106 corporate loans, IRB RWA ranged from approximately 50% to 150% of EAD — a 3x variation despite identical inputs. The primary driver was different interpretations of PD and LGD estimation methodologies. This study was the key motivation for Basel IV's output floor — ensuring a minimum capital floor regardless of how aggressively banks modelled their IRB inputs.

**Case Study 2: PRA Model Risk Finding — LGD Underestimation**
During a 2019 PRA model risk review of a UK IRB bank, inspectors found that the LGD model for unsecured corporate loans used recovery rates from 2010-2016 (a period of relatively high recoveries) without adequate downturn adjustment. The PRA required an add-on to LGD estimates, increasing RWA by approximately £2bn on the affected portfolio. The lesson: downturn LGD must reflect a stressed recovery environment, not average conditions.

**Case Study 3: SME Supporting Factor — Impact on Business Strategy**
A mid-sized UK bank discovered in 2020 that 40% of its SME portfolio was ineligible for the SME supporting factor due to operational process failures (turnover not being captured at origination). By implementing proper turnover data capture, they qualified an additional £800m of SME exposures for the 0.7619 factor, reducing SME RWA by approximately £150m — freeing up CET1 capital that enabled £1bn of additional SME lending without breaching capital limits.

---

## 14. Iterative Reinforcement

**Week 1 — Mechanics**
1. Build the IRB formula in Excel for a single loan. Vary PD from 0.1% to 20% and plot RWA density.
2. Observe the non-linear relationship: RWA density increases sharply at high PD but the ρ effect means it plateaus less than you'd expect.

**Week 2 — Portfolio Application**
1. Apply the formula to a 10-loan portfolio. Sum RWA and calculate CET1 ratio.
2. Add the output floor: calculate SA RWA (use 100% for corporate) and apply 72.5% floor. Which loans are floor-binding?

**Week 3 — Regulatory Context**
1. Read CRR Art. 153 (IRB for corporate exposures) in full — it's 3 pages
2. Read the BCBS 2013 benchmarking study (freely available at bis.org, 36 pages)
3. Identify which 3 factors drove most of the dispersion in the 2013 study

**Week 4 — Pricing Integration**
1. Add RORWA calculation to your Excel model: assume 13% CET1 target, 200bps spread, 1% operating costs
2. At what PD does the loan become unprofitable (RORWA < 10%)?
3. What minimum spread is required to achieve 10% RORWA at PD=3%, LGD=45%, M=3yr?

---

## 15. Source Material

**Regulatory**
- BCBS: *Basel III: A Global Regulatory Framework* (June 2011, bis.org) — Annex 2 (IRB formula)
- BCBS: *Basel III: Finalising Post-Crisis Reforms* (December 2017, bis.org) — output floor
- EU CRR Art. 153 (IRB for corporate, sovereign, institutional exposures)
- EU CRR Art. 395-403 (Large exposures)
- EU CRR Art. 501 (SME supporting factor)
- EBA/GL/2017/16: *Guidelines on PD estimation, LGD estimation, treatment of defaulted assets*
- EBA/GL/2020/05: *Guidelines on credit risk mitigation for IRB banks*
- PRA SS1/23: *Model Risk Management Principles for Banks*

**Academic and Technical**
- Vasicek, O.: *Loan Portfolio Value* (Risk Magazine, December 2002)
- Gordy, M.: *A Risk-Factor Model Foundation for Ratings-Based Bank Capital Rules* (Journal of Financial Intermediation, 2003) — theoretical derivation of Basel IRB formula
- BCBS: *An Explanatory Note on the Basel II IRB Risk Weight Functions* (July 2005, bis.org) — excellent primer

**Market Data**
- Moody's/S&P annual default studies: historical PD by rating grade (subscription)
- BoE Capital Requirements Directive Data: quarterly CRR submissions (bankofengland.co.uk)
- EBA Pillar 3 Data Hub: European bank RWA density data (eba.europa.eu)
