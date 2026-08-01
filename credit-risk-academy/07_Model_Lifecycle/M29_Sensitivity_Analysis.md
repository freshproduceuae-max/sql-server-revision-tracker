# M29 — Sensitivity Analysis

> Testing how model outputs and capital/ECL change in response to changes in inputs and assumptions. Covers single-factor and multi-factor sensitivity, parameter uncertainty, Basel IRB formula sensitivities, IFRS 9 scenario weight sensitivities, tornado charts, stress testing distinctions, and the role of sensitivity analysis in model risk ratings.

---

## 1. Business Purpose

Sensitivity analysis answers: "If this assumption were wrong by X%, how much would the output change?" It is a fundamental tool for:

**1. Model Risk Quantification**
A model with parameters estimated on limited data will have uncertainty around those estimates. Sensitivity analysis translates that uncertainty into output uncertainty — e.g., "our PD estimate for Grade 5 has a 95% confidence interval of [0.8%, 2.1%], and this drives a RWA range of £2.1bn to £3.8bn." This range is the quantification of model risk.

**2. IFRS 9 Sensitivity Disclosure (IFRS 7)**
IFRS 7 paragraph 35G requires disclosure of "reasonably possible changes in assumptions" and their effect on ECL. Banks compute ECL sensitivities to:
- Macroeconomic scenario weights
- Key macroeconomic variables (GDP growth, unemployment, house prices)
- PD/LGD model parameters

**3. Capital Planning**
The Treasury and Capital Management function needs to understand how capital requirements would change under different model assumptions (e.g., if PDs increased 30% due to model recalibration). Sensitivity analysis drives ICAAP (Internal Capital Adequacy Assessment Process) calculations.

**4. Model Validation Input**
Validators use sensitivity analysis to assess model risk rating. A model whose RWA output barely changes when PD is varied ±30% is less risky than one where the same variation causes RWA to swing by ±50%.

**5. Regulatory Expectation**
Under SR 11-7 and PRA SS1/23, banks must demonstrate understanding of model sensitivity. The PRA's ICAAP questionnaire explicitly asks for RWA sensitivity to key parameters. ECB/SREP assessments include review of sensitivity analysis in ICAAP documentation.

**Sensitivity Analysis vs. Stress Testing — The Critical Distinction**

| Dimension | Sensitivity Analysis | Stress Testing |
|-----------|---------------------|----------------|
| Purpose | Understand model mechanics | Assess capital under adverse scenarios |
| Input change | Small, incremental variations | Large, scenario-driven shocks |
| Economic narrative | Not required | Required (scenario story) |
| Output use | Model risk quantification, IFRS 7 disclosure | Capital adequacy, ICAAP, regulatory stress test |
| Regulatory framework | SR 11-7, IFRS 7 | EBA stress test, PRA ACS/DFAST |
| Scope | Single model or parameter | Whole balance sheet |

A sensitivity analysis might show: "if LGD increases by 5pp, ECL increases by £120m." A stress test says: "under a severe recession scenario (GDP -5%, unemployment +6pp), LGD increases from 35% to 55% and ECL increases from £450m to £1.1bn."

---

## 2. Accounting Concepts

**IFRS 7 Sensitivity Disclosure Requirements**
IFRS 7.35G requires: "For each stage of the impairment model, a description of the key assumptions, and how sensitive the estimation of ECL is to changes in those assumptions."

In practice, banks publish a sensitivity table in their annual report showing:
```
If unemployment increases by +2pp:  ECL +£Xm
If GDP growth decreases by -2pp:    ECL +£Xm
If house prices decrease by -10%:   ECL +£Xm
If scenario weights shift:          ECL +/- £Xm
```

These disclosures are reviewed by:
- External auditors (materiality of ECL movements)
- Analysts (to understand provision adequacy risk)
- Regulators (to assess IFRS 9 model robustness)

**Management Overlay Sizing**
When a model has been identified as having material limitations (through validation or backtesting), management overlay must be sized. Sensitivity analysis provides the basis: "the model's parameter uncertainty translates to a potential underestimation of ECL of up to £X, of which we are provisioning £Y as a management overlay."

**Pro-cyclicality and IFRS 9**
IFRS 9 ECL is designed to be forward-looking, which means ECL will rise sharply as macro conditions deteriorate. Sensitivity analysis of ECL to macro scenarios quantifies this pro-cyclicality — an issue for bank earnings volatility and capital planning. Sensitivity analysis informs when and how much management overlay should be applied to smooth accounting earnings while maintaining appropriate provision coverage.

**Effective Interest Rate Sensitivity**
ECL must be discounted at the EIR. If interest rates change, EIR changes, which affects the NPV of future cash flows in LGD and therefore ECL. Sensitivity of ECL to EIR is a relevant secondary disclosure, particularly in the current rising rate environment.

---

## 3. Financial Concepts

**The Basel IRB Capital Formula — Sensitivity Mechanics**

The IRB RWA formula for corporate exposures:
```
K = LGD × [N(√(1/(1-R)) × G(PD) + √(R/(1-R)) × G(0.999)) − PD]
  × (1 + (M − 2.5) × b) / (1 − 1.5 × b)

RWA = K × 12.5 × EAD

Where:
  R = asset correlation = 0.12 × (1 − e^(-50×PD)) / (1 − e^(-50)) + 0.24 × (1 − (1−e^(-50×PD))/(1-e^(-50)))
  b = (0.11852 − 0.05478 × ln(PD))²
  G() = inverse standard normal CDF
  N() = standard normal CDF
  M = effective maturity (2.5 years default)
```

This formula is highly non-linear, which means sensitivity varies across PD ranges:
- At PD = 0.1% (investment grade): 10bp increase in PD → ~25% increase in K
- At PD = 2% (sub-investment grade): 10bp increase in PD → ~8% increase in K
- At PD = 10% (distressed): 10bp increase in PD → ~3% increase in K

This convexity means that model calibration errors are most damaging for investment-grade exposures.

**PD Sensitivity**
```
dRWA/dPD = 12.5 × LGD × EAD × d(K)/d(PD)
```

Analytically complex due to the normal distribution terms. Practically: compute K at PD and K at PD+δ; ΔK/δ is the numerical sensitivity.

**LGD Sensitivity**
LGD enters the formula linearly (once in K's formula):
```
dRWA/dLGD = 12.5 × EAD × [N(√(1/(1-R)) × G(PD) + √(R/(1-R)) × G(0.999)) − PD]
           × maturity_adjustment
```
For a BB-rated corporate (PD=2%, R=16%): a 10pp increase in LGD (e.g., 45% → 55%) increases K by approximately 22%, and RWA by the same proportion.

**Maturity Sensitivity**
M enters through the maturity adjustment factor. At PD = 2%:
- M = 1 year: b ≈ 0.0490; maturity adjustment ≈ 0.877
- M = 2.5 years (default): adjustment = 1.000 (reference point)
- M = 5 years: adjustment ≈ 1.279

A portfolio with 5-year average maturity has ~46% higher capital requirements than one with 1-year maturity, all else equal.

**IFRS 9 Scenario Weight Sensitivity**
ECL = Σᵢ wᵢ × ECL(Scenarioᵢ)

Where w₁ + w₂ + w₃ = 1 (typically: Upside, Base, Downside)

Sensitivity to scenario weights:
```
dECL/dw_downside = ECL(Downside) − ECL(Base)
```

If Downside ECL = £600m and Base ECL = £200m, a 10% shift from Base to Downside adds £40m to ECL. Understanding this allows management to quantify the ECL impact of changing their macroeconomic view.

---

## 4. Statistical Concepts

**Single-Factor Sensitivity (Ceteris Paribus)**
Vary one parameter, hold all others constant, compute output:
```
S(x₀, δ) = [f(x₀ + δ) − f(x₀)] / f(x₀)    (percentage change)
```

For discrete parameters, this is the numerical partial derivative. For continuous parameters (e.g., LGD), it can be computed analytically.

**Multi-Factor Sensitivity (Interaction Effects)**
When parameters interact (as they do in the IRB formula through the correlation R and the normality assumption), multi-factor sensitivity reveals interaction effects:
```
S₂(PD, LGD, δ_PD, δ_LGD) = f(PD+δ_PD, LGD+δ_LGD) − f(PD, LGD) − S₁(PD,δ_PD) − S₁(LGD,δ_LGD)
```

In practice: compute RWA on a grid of (PD × LGD) values and plot the surface.

**Monte Carlo Sensitivity / Parameter Uncertainty**
When PD is estimated with uncertainty (confidence interval [PD_lo, PD_hi]):
1. Sample PD from its posterior distribution (e.g., Beta distribution calibrated to observed default rate)
2. Compute RWA for each sampled PD
3. The distribution of simulated RWA is the parameter uncertainty distribution
4. Report: P5 RWA, median RWA, P95 RWA, to quantify the range

**Variance Decomposition**
For a model with multiple uncertain inputs {x₁, ..., xₙ}:
```
Var(Y) ≈ Σᵢ (∂f/∂xᵢ)² × Var(xᵢ)   [first-order Taylor approximation]
```

This decomposes total output variance into contributions from each input. The input contributing the most to Var(Y) is the parameter that most needs to be estimated precisely.

**Tornado Chart Construction**
For n parameters:
1. For each parameter i: compute Y_hi (output at high value) and Y_lo (output at low value) while holding all others at base
2. Range = Y_hi − Y_lo
3. Sort by range descending
4. Plot horizontal bars: left end = Y_lo, right end = Y_hi, centre = Y_base
5. The widest bar = most influential parameter

**Sobol Sensitivity Indices (Global Sensitivity)**
Sobol indices decompose variance more rigorously than the Taylor approximation:
- S₁ᵢ: First-order index — fraction of output variance due to xᵢ alone
- Sᵢⱼ: Second-order index — fraction due to interaction between xᵢ and xⱼ
- STᵢ: Total-order index — all effects involving xᵢ

For credit risk models, Sobol analysis is typically overkill but can be valuable for complex multi-factor ECL models with nonlinear scenario conditioning.

---

## 5. Regulatory Framework

**SR 11-7 — Sensitivity Analysis as Part of Model Risk**
SR 11-7 requires banks to understand "the impact of model limitations and assumptions on model output." Sensitivity analysis is the quantitative tool for this. Banks must document:
- What parameters were varied
- The range of variation chosen (and why)
- The resulting output range
- Whether this range is material (i.e., would change decisions)

**PRA ICAAP Requirements (SS31/15 and related)**
The PRA ICAAP requires sensitivity analysis of capital requirements to key assumptions. Specifically:
- RWA sensitivity to ±10%, ±20% changes in PD
- RWA sensitivity to ±5pp, ±10pp changes in LGD
- Maturity sensitivity
- The results feed into Pillar 2A capital add-on sizing

**EBA IFRS 9 Guidelines (EBA/GL/2017/06)**
Paragraph 48: "Institutions should perform sensitivity analysis on the key assumptions, including the effect of changes in macroeconomic scenarios on ECL estimates, and disclose this information."

**ECB SREP — Sensitivity Testing**
The ECB's annual SREP review includes assessment of whether the bank's sensitivity analysis is:
- Comprehensive (covering all material parameters)
- Quantitative (not just qualitative "high/medium/low")
- Used in decision-making (not just a compliance exercise)
- Consistent with IFRS 7 disclosures

**BCBS 239 — Risk Data Aggregation**
The ability to run sensitivity analysis "on demand" requires flexible data infrastructure. BCBS 239 requires banks to be able to produce risk reports (including sensitivities) at short notice. A bank that takes 3 weeks to compute ECL sensitivity to a scenario change fails BCBS 239 principles.

---

## 6. Data Required

**For IRB RWA Sensitivity**
- Current PD, LGD, M, EAD by obligor/grade/segment
- The Basel IRB formula (programmed — see Python section)
- Sensitivity grid dimensions: PD range (×0.5 to ×3), LGD range (−15pp to +20pp), M range (0.5yr to 5yr)
- No external data required — purely model mechanics

**For IFRS 9 ECL Sensitivity**
- Base case ECL by segment (Stage 1, 2, 3; by sector, geography)
- Alternative scenario ECL estimates (Upside, Base, Downside, Severe Downside)
- Scenario weight alternatives
- Current scenario macroeconomic variable values and alternative values
- Macro-conditional PD term structures for each scenario

**For Parameter Uncertainty Analysis**
- PD uncertainty: posterior distribution calibrated from observed default counts and predicted PD (Beta distribution)
- LGD uncertainty: empirical distribution from realised LGD observations (or bootstrapped)
- Maturity uncertainty: distribution of contracted maturities in the portfolio

**For Scenario Weight Sensitivity**
- ECL under each scenario (minimum: base, downside, severe downside)
- Current weights
- Alternative weight sets to test
- IFRS 7 disclosure template

---

## 7. How Analysts Actually Work

**The IRB RWA Sensitivity Workflow**

Typically run quarterly, more intensively around MRC model reviews and ICAAP submissions:

1. **Build the formula engine**: Implement the Basel IRB formula in Python/R/Excel — parameterised by PD, LGD, M, EAD. Validate against known results.

2. **Define the sensitivity grid**: For each parameter, define the range and step:
   - PD: 50% to 300% of base (0.5×, 0.75×, 1×, 1.25×, 1.5×, 2×, 3× multiples)
   - LGD: −20pp to +20pp in 5pp steps
   - M: 0.5, 1, 2, 2.5, 3, 4, 5 years

3. **Run the grid**: For each parameter combination, compute K and RWA. Store results in a 3D array.

4. **Extract summary**: Identify the parameter with the greatest RWA impact. Build the tornado chart.

5. **Report**: Present to ALCO/MRC as a one-page table with: base RWA, RWA at stress, % change, key drivers.

**The IFRS 9 ECL Sensitivity Workflow**

This is more complex because it involves running the full ECL model under alternative assumptions, not just computing from a formula:

1. **Identify key sensitivities**: In advance of the quarter-end reporting cycle, the IFRS 9 model team identifies the 3–5 most influential parameters based on prior sensitivity analysis.

2. **Define alternative scenarios**: For each key variable (unemployment, GDP, property prices), define ±1 standard deviation from the base case.

3. **Re-run the ECL model**: The ECL calculation engine must accept parameterised inputs and produce ECL by stage/segment for each alternative assumption.

4. **Aggregate and present**: Build the sensitivity table for the IFRS 7 disclosure. Present to Audit Committee (who must approve the disclosure before publication).

5. **Governance**: Sensitivities are reviewed by the CFO and CRO before publication. Any change from prior period in the direction or magnitude of sensitivity must be explained.

**Practical Time Constraints**
ECL sensitivity is computationally intensive. For a large bank with millions of accounts, running the full ECL model 10–15 times (once per scenario variant) takes hours. Banks use:
- Portfolio-level approximations (representative portfolios)
- Parallel computing (run scenarios simultaneously)
- Pre-computed lookup tables for common sensitivity combinations

---

## 8. Excel Implementation

**IRB RWA Sensitivity Grid**

```
Sheet: IRB_Sensitivity_Grid
Row headers: LGD values (30%, 35%, 40%, 45%, 50%, 55%, 60%)
Column headers: PD values (0.1%, 0.25%, 0.5%, 1%, 2%, 5%, 10%, 15%)

Cell formula (K calculation for corporate exposure, M=2.5):
= LGD_val * (NORM.S.DIST(SQRT(1/(1-R)) * NORM.S.INV(PD_val)
             + SQRT(R/(1-R)) * NORM.S.INV(0.999), TRUE) - PD_val)
* mat_adj / (1 - 1.5 * b) * 12.5 * EAD_total

Where:
  R = 0.12 * (1-EXP(-50*PD_val)) / (1-EXP(-50))
    + 0.24 * (1 - (1-EXP(-50*PD_val))/(1-EXP(-50)))
  b = (0.11852 - 0.05478 * LN(PD_val))^2
  mat_adj = (1 + (M - 2.5) * b) [using M=2.5 → mat_adj = 1.0]

Conditional formatting: heat map (green=low RWA, red=high RWA)
Highlight base case cell with thick border
```

**Tornado Chart Data Table**

```
Sheet: Tornado_Chart
Column A: Parameter_Name
Column B: Parameter_Base_Value
Column C: Parameter_Low_Value
Column D: Parameter_High_Value
Column E: RWA_at_Low (model output when parameter = C)
Column F: RWA_at_High (model output when parameter = D)
Column G: RWA_Base (= central value)
Column H: Impact_Low = E - G  (negative number)
Column I: Impact_High = F - G  (positive number)
Column J: Total_Range = I - H

Sort by J descending (widest range first)

Chart construction:
1. Insert horizontal bar chart of H and I
2. X-axis: RWA change (£m)
3. Y-axis: Parameter_Name (sorted)
4. Add vertical line at x=0 (base case)
5. Negative bars (parameter lowered) extend left; positive extend right
```

**IFRS 9 ECL Sensitivity Table (For IFRS 7 Disclosure)**

```
Sheet: ECL_Sensitivity
Section: Macroeconomic Variable Sensitivities
Row headers: GDP_Growth, Unemployment, House_Price_Index, Commercial_RE_Price
Column headers: -2SD, -1SD, Base, +1SD, +2SD (of the macro variable)

For each cell: ECL_total_£m

Summary row: Delta_ECL vs Base (amount and %)

Section: Scenario Weight Sensitivities  
Row: Weight_Downside varied from 0% to 100%
Column: ECL at each weight

Section: Stage Migration Sensitivity
Row: SICR threshold varied (trigger more/fewer Stage 2 migrations)
Column: Stage 2 EAD and Stage 2 ECL at each threshold
```

---

## 9. SQL Implementation

```sql
-- ============================================================
-- M29: SENSITIVITY ANALYSIS
-- ============================================================

-- Step 1: Base case RWA computation per obligor
-- (Implement Basel IRB formula in SQL using scalar UDF)

-- First, create the scalar function for IRB capital calculation
CREATE OR ALTER FUNCTION dbo.IRB_Capital_Requirement
(
    @PD    FLOAT,
    @LGD   FLOAT,
    @M     FLOAT,
    @Size  FLOAT   -- Annual turnover in EUR m (for SME adjustment)
)
RETURNS FLOAT
AS
BEGIN
    DECLARE @R FLOAT, @b FLOAT, @K FLOAT, @mat_adj FLOAT, @SME_adj FLOAT

    -- Asset correlation R (corporate formula)
    SET @R = 0.12 * (1 - EXP(-50 * @PD)) / (1 - EXP(-50))
           + 0.24 * (1 - (1 - EXP(-50 * @PD)) / (1 - EXP(-50)))

    -- SME adjustment (reduces R for SMEs)
    IF @Size < 50
        SET @R = @R - 0.04 * (1 - (@Size - 5) / 45)

    -- Maturity adjustment
    SET @b = POWER(0.11852 - 0.05478 * LOG(@PD), 2)
    SET @mat_adj = (1 + (@M - 2.5) * @b) / (1 - 1.5 * @b)

    -- Capital requirement K
    -- (Using pre-computed normal distribution values as SQL lacks NORM.S.INV directly)
    -- In practice, implement using a lookup table or CLR function
    -- Placeholder: approximate formula
    SET @K = @LGD * @mat_adj * 0.05  -- Simplified placeholder; use CLR for accuracy

    RETURN @K * 12.5
END;

-- Step 2: Generate sensitivity grid using parameter variations
-- (Demonstrates the pattern; actual IRB formula requires CLR or application-side calculation)
WITH ParameterGrid AS (
    -- PD variations: 50%, 75%, 100%, 125%, 150%, 200% of base
    SELECT p.pd_multiplier, l.lgd_delta, m.maturity
    FROM (VALUES (0.5), (0.75), (1.0), (1.25), (1.5), (2.0), (3.0)) AS p(pd_multiplier)
    CROSS JOIN (VALUES (-0.15), (-0.10), (-0.05), (0), (0.05), (0.10), (0.15), (0.20)) AS l(lgd_delta)
    CROSS JOIN (VALUES (1.0), (2.5), (3.0), (4.0), (5.0)) AS m(maturity)
),
BasePortfolio AS (
    SELECT
        SUM(r.predicted_pd * f.ead)     / SUM(f.ead) AS portfolio_avg_pd,
        SUM(r.predicted_lgd * f.ead)    / SUM(f.ead) AS portfolio_avg_lgd,
        AVG(f.maturity_years)                         AS portfolio_avg_maturity,
        SUM(f.ead)                                    AS total_ead,
        SUM(f.rwa)                                    AS base_rwa
    FROM dbo.RatingHistory r
    JOIN dbo.FacilityRWA f ON f.obligor_id = r.obligor_id
    WHERE r.rating_date = '2023-12-31'
)
SELECT
    g.pd_multiplier,
    g.lgd_delta,
    g.maturity,
    b.portfolio_avg_pd * g.pd_multiplier    AS stressed_pd,
    LEAST(b.portfolio_avg_lgd + g.lgd_delta, 1.0) AS stressed_lgd,
    g.maturity                              AS stressed_m,
    b.base_rwa,
    -- Approximate stressed RWA (would use dbo.IRB_Capital_Requirement in practice)
    b.base_rwa * g.pd_multiplier * (1 + g.lgd_delta / b.portfolio_avg_lgd)
        * (g.maturity / b.portfolio_avg_maturity)  AS approx_stressed_rwa,
    b.base_rwa * g.pd_multiplier * (1 + g.lgd_delta / b.portfolio_avg_lgd)
        * (g.maturity / b.portfolio_avg_maturity) - b.base_rwa AS rwa_change
FROM ParameterGrid g
CROSS JOIN BasePortfolio b;

-- Step 3: Single-factor tornado analysis
-- Compute RWA impact of each parameter varied independently
WITH BaseCase AS (
    SELECT
        SUM(f.rwa)              AS base_rwa,
        SUM(f.ead)              AS total_ead,
        AVG(r.predicted_pd)     AS avg_pd,
        AVG(r.predicted_lgd)    AS avg_lgd,
        AVG(f.maturity_years)   AS avg_m
    FROM dbo.FacilityRWA f
    JOIN dbo.RatingHistory r ON r.obligor_id = f.obligor_id
    WHERE f.snapshot_date = '2023-12-31'
),
TornadoResults AS (
    SELECT 'PD + 30%'  AS scenario, base_rwa * 1.30 AS stressed_rwa, base_rwa FROM BaseCase
    UNION ALL
    SELECT 'PD − 30%'  AS scenario, base_rwa * 0.70 AS stressed_rwa, base_rwa FROM BaseCase
    UNION ALL
    SELECT 'LGD + 10pp' AS scenario, base_rwa * (1 + 0.10/avg_lgd) AS stressed_rwa, base_rwa FROM BaseCase
    UNION ALL
    SELECT 'LGD − 10pp' AS scenario, base_rwa * (1 - 0.10/avg_lgd) AS stressed_rwa, base_rwa FROM BaseCase
    UNION ALL
    SELECT 'Maturity 5yr' AS scenario, base_rwa * (5 / avg_m) AS stressed_rwa, base_rwa FROM BaseCase
    UNION ALL
    SELECT 'Maturity 1yr' AS scenario, base_rwa * (1 / avg_m) AS stressed_rwa, base_rwa FROM BaseCase
)
SELECT
    scenario,
    base_rwa,
    stressed_rwa,
    stressed_rwa - base_rwa                         AS rwa_impact_abs,
    (stressed_rwa - base_rwa) / base_rwa * 100      AS rwa_impact_pct,
    ABS(stressed_rwa - base_rwa)                    AS abs_impact
FROM TornadoResults
ORDER BY abs_impact DESC;

-- Step 4: IFRS 9 ECL scenario weight sensitivity
WITH ScenarioECL AS (
    -- Base ECL estimates by scenario (pre-computed and loaded)
    SELECT 'UPSIDE'   AS scenario, SUM(ecl_upside)   AS total_ecl FROM dbo.ECL_Estimates
    UNION ALL
    SELECT 'BASE'     AS scenario, SUM(ecl_base)     AS total_ecl FROM dbo.ECL_Estimates
    UNION ALL
    SELECT 'DOWNSIDE' AS scenario, SUM(ecl_downside) AS total_ecl FROM dbo.ECL_Estimates
    UNION ALL
    SELECT 'SEVERE'   AS scenario, SUM(ecl_severe)   AS total_ecl FROM dbo.ECL_Estimates
),
BaseWeights AS (
    SELECT
        0.10 AS w_upside,
        0.55 AS w_base,
        0.25 AS w_downside,
        0.10 AS w_severe
),
BaseWeightedECL AS (
    SELECT
        SUM(CASE WHEN e.scenario = 'UPSIDE'   THEN e.total_ecl * b.w_upside
                 WHEN e.scenario = 'BASE'     THEN e.total_ecl * b.w_base
                 WHEN e.scenario = 'DOWNSIDE' THEN e.total_ecl * b.w_downside
                 WHEN e.scenario = 'SEVERE'   THEN e.total_ecl * b.w_severe
                 ELSE 0 END) AS base_weighted_ecl
    FROM ScenarioECL e
    CROSS JOIN BaseWeights b
)
-- Test alternative weight configurations
SELECT
    weight_scenario,
    w_upside, w_base, w_downside, w_severe,
    -- Compute weighted ECL for each alternative weight set
    (
        SELECT SUM(CASE WHEN e.scenario = 'UPSIDE'   THEN e.total_ecl * alt.w_upside
                        WHEN e.scenario = 'BASE'     THEN e.total_ecl * alt.w_base
                        WHEN e.scenario = 'DOWNSIDE' THEN e.total_ecl * alt.w_downside
                        WHEN e.scenario = 'SEVERE'   THEN e.total_ecl * alt.w_severe
                        ELSE 0 END)
        FROM ScenarioECL e
    ) AS weighted_ecl,
    (
        SELECT SUM(CASE WHEN e.scenario = 'UPSIDE'   THEN e.total_ecl * alt.w_upside
                        WHEN e.scenario = 'BASE'     THEN e.total_ecl * alt.w_base
                        WHEN e.scenario = 'DOWNSIDE' THEN e.total_ecl * alt.w_downside
                        WHEN e.scenario = 'SEVERE'   THEN e.total_ecl * alt.w_severe
                        ELSE 0 END)
        FROM ScenarioECL e
    ) - (SELECT base_weighted_ecl FROM BaseWeightedECL) AS ecl_vs_base
FROM (
    VALUES
    ('Base case',               0.10, 0.55, 0.25, 0.10),
    ('More pessimistic',        0.05, 0.40, 0.40, 0.15),
    ('Very pessimistic',        0.00, 0.25, 0.50, 0.25),
    ('More optimistic',         0.20, 0.60, 0.15, 0.05),
    ('Downside only baseline',  0.00, 0.00, 1.00, 0.00),
    ('All base',                0.00, 1.00, 0.00, 0.00)
) AS alt(weight_scenario, w_upside, w_base, w_downside, w_severe)
ORDER BY ecl_vs_base;
```

---

## 10. Python Implementation

```python
# ============================================================
# M29: SENSITIVITY ANALYSIS — PYTHON IMPLEMENTATION
# ============================================================
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.cm as cm
from scipy.stats import norm, beta as beta_dist
from scipy.optimize import brentq
from itertools import product
import warnings
warnings.filterwarnings('ignore')

# ============================================================
# Basel IRB Formula Engine
# ============================================================
def irb_asset_correlation(pd: float, is_sme: bool = False,
                            turnover_eur_m: float = None) -> float:
    """
    Basel III corporate asset correlation R.
    SME adjustment applies for turnover 5–50m EUR.
    """
    base_r = (0.12 * (1 - np.exp(-50 * pd)) / (1 - np.exp(-50))
              + 0.24 * (1 - (1 - np.exp(-50 * pd)) / (1 - np.exp(-50))))

    if is_sme and turnover_eur_m is not None:
        sme_adj = 0.04 * (1 - max(0, min(turnover_eur_m - 5, 45)) / 45)
        base_r -= sme_adj

    return base_r

def irb_maturity_adjustment(pd: float, maturity: float) -> float:
    """Maturity adjustment factor for corporate IRB."""
    b = (0.11852 - 0.05478 * np.log(max(pd, 1e-6)))**2
    return (1 + (maturity - 2.5) * b) / (1 - 1.5 * b)

def irb_capital_requirement(pd: float, lgd: float, maturity: float = 2.5,
                              is_sme: bool = False,
                              turnover_eur_m: float = None) -> float:
    """
    Basel III IRB capital requirement K for corporate exposures.
    Returns K as a decimal (multiply by EAD × 12.5 for RWA).
    """
    pd = max(pd, 0.0003)  # Basel floor: min PD = 0.03%
    lgd = min(max(lgd, 0), 1)
    maturity = min(max(maturity, 1), 5)

    R = irb_asset_correlation(pd, is_sme, turnover_eur_m)
    mat_adj = irb_maturity_adjustment(pd, maturity)

    # Capital formula
    K = lgd * (
        norm.cdf(
            np.sqrt(1 / (1 - R)) * norm.ppf(pd)
            + np.sqrt(R / (1 - R)) * norm.ppf(0.999)
        ) - pd
    ) * mat_adj

    return K

def irb_rwa(pd: float, lgd: float, ead: float, maturity: float = 2.5,
             is_sme: bool = False) -> float:
    """Compute RWA for a single exposure."""
    K = irb_capital_requirement(pd, lgd, maturity, is_sme)
    return K * 12.5 * ead


# ============================================================
# Single-Factor Sensitivity Analysis
# ============================================================
class SingleFactorSensitivity:
    """
    Compute sensitivity of RWA/ECL to single parameter changes.
    """

    def __init__(self, base_pd: float, base_lgd: float,
                 base_maturity: float, total_ead: float):
        self.base_pd = base_pd
        self.base_lgd = base_lgd
        self.base_m = base_maturity
        self.ead = total_ead
        self.base_rwa = irb_rwa(base_pd, base_lgd, total_ead, base_maturity)

    def pd_sensitivity(self, pd_multipliers: list = None) -> pd.DataFrame:
        """Compute RWA across PD multiplier range."""
        if pd_multipliers is None:
            pd_multipliers = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0, 2.5, 3.0]

        results = []
        for mult in pd_multipliers:
            stressed_pd = self.base_pd * mult
            rwa = irb_rwa(stressed_pd, self.base_lgd, self.ead, self.base_m)
            results.append({
                'PD_Multiplier': mult,
                'Stressed_PD_%': round(stressed_pd * 100, 4),
                'RWA_£m': round(rwa / 1e6, 1),
                'RWA_Change_£m': round((rwa - self.base_rwa) / 1e6, 1),
                'RWA_Change_%': round((rwa - self.base_rwa) / self.base_rwa * 100, 2)
            })

        df = pd.DataFrame(results)
        df.set_index('PD_Multiplier', inplace=True)
        return df

    def lgd_sensitivity(self, lgd_deltas_pp: list = None) -> pd.DataFrame:
        """Compute RWA across LGD additive delta range (in percentage points)."""
        if lgd_deltas_pp is None:
            lgd_deltas_pp = [-15, -10, -5, 0, 5, 10, 15, 20]

        results = []
        for delta in lgd_deltas_pp:
            stressed_lgd = max(0.01, min(self.base_lgd + delta / 100, 0.99))
            rwa = irb_rwa(self.base_pd, stressed_lgd, self.ead, self.base_m)
            results.append({
                'LGD_Delta_pp': delta,
                'Stressed_LGD_%': round(stressed_lgd * 100, 1),
                'RWA_£m': round(rwa / 1e6, 1),
                'RWA_Change_£m': round((rwa - self.base_rwa) / 1e6, 1),
                'RWA_Change_%': round((rwa - self.base_rwa) / self.base_rwa * 100, 2)
            })

        return pd.DataFrame(results)

    def maturity_sensitivity(self, maturities: list = None) -> pd.DataFrame:
        """Compute RWA across maturity range."""
        if maturities is None:
            maturities = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0]

        results = []
        for m in maturities:
            rwa = irb_rwa(self.base_pd, self.base_lgd, self.ead, m)
            results.append({
                'Maturity_Years': m,
                'RWA_£m': round(rwa / 1e6, 1),
                'RWA_Change_£m': round((rwa - self.base_rwa) / 1e6, 1),
                'RWA_Change_%': round((rwa - self.base_rwa) / self.base_rwa * 100, 2)
            })

        return pd.DataFrame(results)


# ============================================================
# Tornado Chart Generator
# ============================================================
class TornadoChart:
    """
    Generate tornado chart from single-factor sensitivity results.
    Shows which parameters drive the most RWA uncertainty.
    """

    def __init__(self, base_output: float, unit: str = '£m'):
        self.base_output = base_output
        self.unit = unit
        self.factors = []

    def add_factor(self, name: str, low_output: float,
                    high_output: float, low_label: str = '',
                    high_label: str = '') -> None:
        """Add a factor with its low and high output values."""
        self.factors.append({
            'name': name,
            'low': low_output,
            'high': high_output,
            'range': abs(high_output - low_output),
            'low_label': low_label,
            'high_label': high_label
        })

    def _sort_factors(self):
        self.factors.sort(key=lambda x: x['range'], reverse=True)

    def plot(self, title: str = 'Sensitivity Analysis — Tornado Chart',
              figsize: tuple = (12, 6)) -> plt.Figure:
        """Generate tornado chart."""
        self._sort_factors()
        n = len(self.factors)

        fig, ax = plt.subplots(figsize=figsize)

        y_positions = np.arange(n)
        colours_low = '#3498db'   # Blue for low value
        colours_high = '#e74c3c'  # Red for high value

        for i, factor in enumerate(self.factors):
            y = y_positions[i]
            low_val = factor['low'] - self.base_output
            high_val = factor['high'] - self.base_output

            # Draw bars from base (0) to low and high
            if low_val < 0:
                ax.barh(y, low_val, left=0, height=0.6,
                         color=colours_low, alpha=0.8)
            else:
                ax.barh(y, low_val, left=0, height=0.6,
                         color=colours_high, alpha=0.8)

            if high_val > 0:
                ax.barh(y, high_val, left=0, height=0.6,
                         color=colours_high, alpha=0.8)
            else:
                ax.barh(y, high_val, left=0, height=0.6,
                         color=colours_low, alpha=0.8)

            # Labels
            offset = (factor['range']) * 0.02
            if factor['low_label']:
                ax.text(low_val - offset, y, factor['low_label'],
                         ha='right', va='center', fontsize=8, color='navy')
            if factor['high_label']:
                ax.text(high_val + offset, y, factor['high_label'],
                         ha='left', va='center', fontsize=8, color='darkred')

        # Formatting
        ax.set_yticks(y_positions)
        ax.set_yticklabels([f['name'] for f in self.factors], fontsize=10)
        ax.axvline(x=0, color='black', linewidth=1.5, linestyle='-')
        ax.set_xlabel(f'RWA Change from Base ({self.unit})', fontsize=11)
        ax.set_title(title, fontsize=13, fontweight='bold')
        ax.grid(axis='x', alpha=0.3)

        # Annotate base
        ax.text(0, -0.7, f'Base: {self.base_output:.0f} {self.unit}',
                 ha='center', fontsize=9, style='italic',
                 transform=ax.get_xaxis_transform())

        plt.tight_layout()
        return fig


# ============================================================
# Multi-Factor Sensitivity Grid (2D Surface)
# ============================================================
class MultiFactorSensitivity:
    """
    Compute and visualise 2D sensitivity grid (e.g., PD vs LGD).
    """

    def __init__(self, base_pd, base_lgd, base_maturity, total_ead):
        self.base_pd = base_pd
        self.base_lgd = base_lgd
        self.base_m = base_maturity
        self.ead = total_ead
        self.base_rwa = irb_rwa(base_pd, base_lgd, total_ead, base_maturity)

    def pd_lgd_surface(self, pd_multipliers=None,
                        lgd_deltas_pp=None) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
        """Compute RWA on a PD × LGD grid."""
        if pd_multipliers is None:
            pd_multipliers = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0, 3.0]
        if lgd_deltas_pp is None:
            lgd_deltas_pp = [-15, -10, -5, 0, 5, 10, 15, 20]

        pd_vals = [self.base_pd * m for m in pd_multipliers]
        lgd_vals = [max(0.01, min(self.base_lgd + d/100, 0.99)) for d in lgd_deltas_pp]

        RWA_grid = np.zeros((len(lgd_vals), len(pd_vals)))
        for j, pd in enumerate(pd_vals):
            for i, lgd in enumerate(lgd_vals):
                RWA_grid[i, j] = irb_rwa(pd, lgd, self.ead, self.base_m) / 1e6

        return np.array(pd_vals), np.array(lgd_vals), RWA_grid

    def plot_surface(self) -> None:
        """Plot 2D heat map of RWA sensitivity."""
        pd_vals, lgd_vals, RWA_grid = self.pd_lgd_surface()

        fig, ax = plt.subplots(figsize=(10, 7))
        im = ax.imshow(RWA_grid, cmap='RdYlGn_r', aspect='auto',
                        interpolation='bilinear')
        plt.colorbar(im, ax=ax, label='RWA (£m)')

        # Axis labels
        ax.set_xticks(range(len(pd_vals)))
        ax.set_xticklabels([f'{p*100:.2f}%' for p in pd_vals], rotation=45)
        ax.set_yticks(range(len(lgd_vals)))
        ax.set_yticklabels([f'{l*100:.0f}%' for l in lgd_vals])
        ax.set_xlabel('PD', fontsize=12)
        ax.set_ylabel('LGD', fontsize=12)
        ax.set_title('RWA Sensitivity — PD × LGD Grid (£m)', fontsize=13)

        # Annotate each cell with RWA value
        for i in range(len(lgd_vals)):
            for j in range(len(pd_vals)):
                val = RWA_grid[i, j]
                ax.text(j, i, f'{val:.0f}', ha='center', va='center',
                         fontsize=7,
                         color='white' if val > np.median(RWA_grid) else 'black')

        # Highlight base case
        base_pd_idx = int(len(pd_vals) / 2)  # Approximation; find exact index
        base_lgd_idx = int(len(lgd_vals) / 2)
        ax.add_patch(plt.Rectangle((base_pd_idx - 0.5, base_lgd_idx - 0.5),
                                    1, 1, fill=False, edgecolor='blue',
                                    linewidth=3, label='Base case'))

        plt.tight_layout()
        plt.savefig('rwa_sensitivity_grid.png', dpi=150, bbox_inches='tight')
        plt.show()


# ============================================================
# Parameter Uncertainty Analysis (Monte Carlo)
# ============================================================
class ParameterUncertaintyAnalysis:
    """
    Quantify RWA uncertainty from estimation uncertainty in PD and LGD.
    Uses Monte Carlo simulation drawing from parameter posteriors.
    """

    def __init__(self, observed_defaults: int, n_obligors: int,
                 lgd_observations: np.ndarray, total_ead: float,
                 base_maturity: float = 2.5, n_simulations: int = 10_000):
        self.n_obs = observed_defaults
        self.n_obl = n_obligors
        self.lgd_obs = lgd_observations
        self.ead = total_ead
        self.base_m = base_maturity
        self.n_sim = n_simulations

    def simulate(self) -> dict:
        """
        Monte Carlo simulation of RWA distribution:
        - PD drawn from Jeffreys posterior: Beta(d+0.5, n-d+0.5)
        - LGD drawn from empirical bootstrap of realised LGD
        """
        np.random.seed(42)

        # PD samples from Jeffreys posterior
        pd_samples = beta_dist.rvs(
            self.n_obs + 0.5,
            self.n_obl - self.n_obs + 0.5,
            size=self.n_sim
        )

        # LGD samples from bootstrap of realised LGD
        lgd_samples = np.random.choice(
            self.lgd_obs, size=self.n_sim, replace=True
        )

        # Compute RWA for each simulation
        rwa_samples = np.array([
            irb_rwa(pd, lgd, self.ead, self.base_m)
            for pd, lgd in zip(pd_samples, lgd_samples)
        ]) / 1e6

        results = {
            'RWA_P5': round(np.percentile(rwa_samples, 5), 1),
            'RWA_P25': round(np.percentile(rwa_samples, 25), 1),
            'RWA_P50': round(np.percentile(rwa_samples, 50), 1),
            'RWA_Mean': round(np.mean(rwa_samples), 1),
            'RWA_P75': round(np.percentile(rwa_samples, 75), 1),
            'RWA_P95': round(np.percentile(rwa_samples, 95), 1),
            'RWA_Std': round(np.std(rwa_samples), 1),
            'Base_RWA': round(irb_rwa(
                self.n_obs / self.n_obl, np.mean(self.lgd_obs),
                self.ead, self.base_m
            ) / 1e6, 1)
        }

        print("\nPARAMETER UNCERTAINTY ANALYSIS — RWA Distribution (£m)")
        print(f"{'='*50}")
        for k, v in results.items():
            print(f"  {k}: {v}")
        print(f"\n  Uncertainty range (P5–P95): £{results['RWA_P5']}m – £{results['RWA_P95']}m")
        print(f"  Coefficient of Variation: {results['RWA_Std']/results['RWA_Mean']:.2%}")

        self._plot_distribution(rwa_samples, results)

        return results, rwa_samples

    def _plot_distribution(self, rwa_samples: np.ndarray, results: dict) -> None:
        fig, ax = plt.subplots(figsize=(10, 5))
        ax.hist(rwa_samples, bins=80, color='#3498db', alpha=0.7,
                 edgecolor='white', linewidth=0.5)

        for percentile, label, colour in [
            (results['RWA_P5'], 'P5', '#e74c3c'),
            (results['Base_RWA'], 'Base\n(point est.)', 'black'),
            (results['RWA_P95'], 'P95', '#e74c3c')
        ]:
            ax.axvline(percentile, color=colour, linewidth=2,
                        linestyle='--' if label != 'Base\n(point est.)' else '-')
            ax.text(percentile, ax.get_ylim()[1] * 0.85, label,
                     ha='center', fontsize=9, color=colour)

        ax.fill_betweenx([0, ax.get_ylim()[1] * 0.8],
                          results['RWA_P5'], results['RWA_P95'],
                          alpha=0.15, color='#e74c3c', label='P5–P95 range')

        ax.set_xlabel('RWA (£m)', fontsize=12)
        ax.set_ylabel('Frequency', fontsize=12)
        ax.set_title('RWA Distribution from Parameter Uncertainty (Monte Carlo)', fontsize=13)
        ax.legend()
        ax.grid(alpha=0.3)
        plt.tight_layout()
        plt.savefig('rwa_parameter_uncertainty.png', dpi=150, bbox_inches='tight')
        plt.show()


# ============================================================
# IFRS 9 ECL Scenario Weight Sensitivity
# ============================================================
class IFRS9_SensitivityAnalyzer:
    """Sensitivity analysis for IFRS 9 ECL to scenario weights and macro inputs."""

    def __init__(self, ecl_by_scenario: dict):
        """
        ecl_by_scenario : dict with keys 'upside', 'base', 'downside', 'severe'
                          and values = ECL in £m
        """
        self.ecl = ecl_by_scenario
        self.base_weights = {'upside': 0.10, 'base': 0.55,
                              'downside': 0.25, 'severe': 0.10}
        self.base_ecl = self._weighted_ecl(self.base_weights)

    def _weighted_ecl(self, weights: dict) -> float:
        return sum(self.ecl[s] * w for s, w in weights.items())

    def weight_sensitivity_table(self) -> pd.DataFrame:
        """Compute ECL across range of scenario weight alternatives."""
        alternatives = [
            ('Base weights',        0.10, 0.55, 0.25, 0.10),
            ('More pessimistic',    0.05, 0.40, 0.40, 0.15),
            ('Significantly more pessimistic', 0.00, 0.25, 0.50, 0.25),
            ('Severe downside emphasis', 0.00, 0.20, 0.40, 0.40),
            ('More optimistic',     0.20, 0.60, 0.15, 0.05),
            ('Pure downside',       0.00, 0.00, 1.00, 0.00),
            ('Pure base',           0.00, 1.00, 0.00, 0.00),
            ('Pure severe',         0.00, 0.00, 0.00, 1.00),
        ]

        results = []
        for label, w_u, w_b, w_d, w_s in alternatives:
            weights = {'upside': w_u, 'base': w_b, 'downside': w_d, 'severe': w_s}
            ecl = self._weighted_ecl(weights)
            results.append({
                'Scenario': label,
                'w_Upside': f'{w_u:.0%}',
                'w_Base': f'{w_b:.0%}',
                'w_Downside': f'{w_d:.0%}',
                'w_Severe': f'{w_s:.0%}',
                'ECL_£m': round(ecl, 1),
                'Delta_vs_Base_£m': round(ecl - self.base_ecl, 1),
                'Delta_pct': round((ecl - self.base_ecl) / self.base_ecl * 100, 1)
            })

        return pd.DataFrame(results)

    def plot_scenario_sensitivity(self) -> None:
        """Waterfall-style chart of ECL by scenario."""
        scenarios = ['Upside', 'Base', 'Downside', 'Severe']
        ecl_vals = [self.ecl.get(s.lower(), 0) for s in scenarios]
        weights_base = [self.base_weights.get(s.lower(), 0) for s in scenarios]
        colours = ['#2ecc71', '#3498db', '#f39c12', '#e74c3c']

        fig, axes = plt.subplots(1, 2, figsize=(14, 5))

        # Chart 1: ECL by scenario
        ax = axes[0]
        bars = ax.bar(scenarios, ecl_vals, color=colours, alpha=0.8, edgecolor='white')
        ax.axhline(self.base_ecl, color='navy', linewidth=2,
                    linestyle='--', label=f'Weighted ECL: £{self.base_ecl:.0f}m')
        ax.set_ylabel('ECL (£m)', fontsize=11)
        ax.set_title('ECL by Macro Scenario', fontsize=12)
        ax.legend()
        ax.grid(axis='y', alpha=0.3)
        for bar, val in zip(bars, ecl_vals):
            ax.text(bar.get_x() + bar.get_width()/2, val * 1.01,
                     f'£{val:.0f}m', ha='center', fontsize=9)

        # Chart 2: ECL sensitivity to downside weight
        ax2 = axes[1]
        w_ds = np.linspace(0, 1, 101)
        ecl_curve = []
        for w_d in w_ds:
            w_remaining = 1 - w_d
            weights = {'upside': w_remaining * 0.15, 'base': w_remaining * 0.73,
                        'downside': w_d, 'severe': w_remaining * 0.12}
            ecl_curve.append(self._weighted_ecl(weights))

        ax2.plot(w_ds * 100, ecl_curve, color='#e74c3c', linewidth=2.5)
        ax2.axvline(self.base_weights['downside'] * 100, color='navy',
                     linewidth=1.5, linestyle='--',
                     label=f"Base weight: {self.base_weights['downside']:.0%}")
        ax2.axhline(self.base_ecl, color='navy', linewidth=1,
                     linestyle=':', label=f'Base ECL: £{self.base_ecl:.0f}m')
        ax2.set_xlabel('Downside Scenario Weight (%)', fontsize=11)
        ax2.set_ylabel('Weighted ECL (£m)', fontsize=11)
        ax2.set_title('ECL Sensitivity to Downside Scenario Weight', fontsize=12)
        ax2.legend(fontsize=9)
        ax2.grid(alpha=0.3)

        plt.tight_layout()
        plt.savefig('ifrs9_ecl_sensitivity.png', dpi=150, bbox_inches='tight')
        plt.show()


# ============================================================
# MAIN DEMO
# ============================================================
def run_sensitivity_suite():
    """Demonstrate full sensitivity analysis suite."""

    print("=" * 60)
    print("M29: SENSITIVITY ANALYSIS SUITE")
    print("=" * 60)

    # Base portfolio parameters
    BASE_PD = 0.015    # 1.5% average PD
    BASE_LGD = 0.40    # 40% LGD
    BASE_M = 2.5       # 2.5 year average maturity
    TOTAL_EAD = 5e9    # £5bn EAD

    base_rwa = irb_rwa(BASE_PD, BASE_LGD, TOTAL_EAD, BASE_M)
    print(f"\nBase RWA: £{base_rwa/1e6:.0f}m")
    print(f"Base RWA Density: {base_rwa/TOTAL_EAD:.1%}")

    # Single-factor sensitivity
    sf = SingleFactorSensitivity(BASE_PD, BASE_LGD, BASE_M, TOTAL_EAD)

    print("\nPD Sensitivity:")
    pd_sens = sf.pd_sensitivity()
    print(pd_sens.to_string())

    print("\nLGD Sensitivity:")
    lgd_sens = sf.lgd_sensitivity()
    print(lgd_sens.to_string())

    # Tornado chart
    tornado = TornadoChart(base_output=base_rwa/1e6, unit='£m')

    pd_lo = irb_rwa(BASE_PD * 0.7, BASE_LGD, TOTAL_EAD, BASE_M) / 1e6
    pd_hi = irb_rwa(BASE_PD * 1.5, BASE_LGD, TOTAL_EAD, BASE_M) / 1e6
    tornado.add_factor('PD (±30%)', pd_lo, pd_hi, 'PD -30%', 'PD +50%')

    lgd_lo = irb_rwa(BASE_PD, max(0.01, BASE_LGD - 0.10), TOTAL_EAD, BASE_M) / 1e6
    lgd_hi = irb_rwa(BASE_PD, min(0.99, BASE_LGD + 0.10), TOTAL_EAD, BASE_M) / 1e6
    tornado.add_factor('LGD (±10pp)', lgd_lo, lgd_hi, 'LGD -10pp', 'LGD +10pp')

    m_lo = irb_rwa(BASE_PD, BASE_LGD, TOTAL_EAD, 1.0) / 1e6
    m_hi = irb_rwa(BASE_PD, BASE_LGD, TOTAL_EAD, 5.0) / 1e6
    tornado.add_factor('Maturity (1yr vs 5yr)', m_lo, m_hi, 'M=1yr', 'M=5yr')

    fig = tornado.plot(title='RWA Sensitivity — Corporate IRB Portfolio (£5bn EAD)')

    # Monte Carlo parameter uncertainty
    np.random.seed(42)
    lgd_obs = np.clip(np.random.beta(2, 3, 150) + np.random.choice([0, 0.4], 150, p=[0.7, 0.3]), 0, 1)
    pu = ParameterUncertaintyAnalysis(
        observed_defaults=23, n_obligors=1500,
        lgd_observations=lgd_obs,
        total_ead=TOTAL_EAD, n_simulations=10_000
    )
    mc_results, rwa_samples = pu.simulate()

    # IFRS 9 sensitivity
    ecl_scenarios = {'upside': 150, 'base': 320, 'downside': 620, 'severe': 1100}
    ifrs9 = IFRS9_SensitivityAnalyzer(ecl_scenarios)
    weight_table = ifrs9.weight_sensitivity_table()
    print("\nIFRS 9 ECL Weight Sensitivity:")
    print(weight_table.to_string(index=False))
    ifrs9.plot_scenario_sensitivity()

if __name__ == '__main__':
    run_sensitivity_suite()
```

---

## 11. Interview Questions

**Junior/Mid Level**

1. **What is the difference between sensitivity analysis and stress testing?**
   Sensitivity analysis tests small, incremental changes in one or more model parameters to understand model mechanics and quantify model risk. Stress testing applies large, scenario-driven shocks (typically with a macroeconomic narrative) to assess capital adequacy and resilience. Sensitivity: "what if PD increases 30%?" Stress: "what if we enter a severe recession where GDP falls 5% and unemployment rises 6 percentage points, causing PD to increase 80% and LGD to widen by 15pp?"

2. **Why does a 10bp increase in PD cause a larger percentage increase in K for investment-grade obligors than for high-yield?**
   The IRB formula is convex in PD. At very low PDs, the normal distribution term in the formula is in the flat tail region, and small changes in PD drive large changes in K. At higher PDs, the formula is in the steeper part of the normal distribution curve, and additional defaults are already partially priced in through higher correlation. Quantitatively: at PD=0.1%, moving to 0.2% doubles K. At PD=10%, moving to 10.1% barely changes K.

3. **What should a tornado chart look like for a well-understood model?**
   A narrow tornado chart (few bars, all relatively short) indicates a model with low sensitivity to individual parameters — robust and well-constrained. A wide tornado chart (many bars, some very long) indicates a model that is highly sensitive to parameter choices — higher model risk. For regulatory purposes, a model whose RWA can swing ±40% based on reasonable parameter uncertainty should be rated higher model risk than one that swings ±10%.

**Senior Level**

4. **How do you use sensitivity analysis to size a Pillar 2A capital add-on for model risk?**
   The Pillar 2A add-on for model risk should at minimum cover the expected model error (mean bias × EAD × 8%) plus a component for parameter uncertainty. From Monte Carlo simulation: the difference between the P95 RWA and the base RWA is the plausible upside from parameter uncertainty. If the model's P95 RWA is £500m but the base is £350m, the £150m difference represents 99th-percentile parameter uncertainty. The bank should discuss with its regulator whether a Pillar 2A add-on of 8% × £150m / 12.5 = £0.96m capital is appropriate, or whether a more direct capital deduction is preferred.

5. **IFRS 7 requires disclosure of ECL sensitivity to "reasonably possible" macro changes. How do you define "reasonably possible" and what are the audit committee implications?**
   "Reasonably possible" is typically interpreted as ±1 standard deviation of the macroeconomic variable's forecast distribution, or the range between the base and downside scenario. The audit committee must approve these ranges. If the sensitivity disclosure is too narrow (small changes, small ECL impact), it may mislead users about ECL uncertainty. If too wide, it may unnecessarily alarm investors. Best practice: disclose sensitivity to ±1σ, ±2σ, and scenario-specific movements, with a clear explanation of the methodology.

---

## 12. Common Mistakes

1. **Varying Parameters Independently When They Are Correlated**: PD and LGD are both driven by economic conditions — they tend to increase together in downturns. Varying them independently understates the combined sensitivity. Multi-factor scenarios should reflect realistic joint distributions.

2. **Using Linear Approximations for a Nonlinear Formula**: The IRB formula is highly nonlinear. "RWA sensitivity to PD = 8% per 10bp" computed at the base PD will be wrong at stressed PD. Always compute sensitivities numerically rather than assuming linearity.

3. **Reporting Only the Absolute RWA Change, Not the Capital Requirement**: A £100m increase in RWA is a capital increase of £100m × 8% = £8m. The capital impact is what is relevant for Pillar 2 and ICAAP. Always translate RWA sensitivity to capital sensitivity.

4. **Sensitivity Ranges That Are Too Narrow**: "What if PD increases by 1%?" If the PD has a 95% CI of ±50%, testing only ±1% is misleading. The sensitivity range should reflect the actual estimation uncertainty, not an arbitrary small number.

5. **Not Connecting Sensitivity Analysis to Model Risk Rating**: Sensitivity analysis is not useful if it just fills a document section. The output should explicitly inform the model risk rating: a model with high sensitivity to uncertain parameters receives a higher model risk rating, which drives Pillar 2A capital add-ons.

---

## 13. Case Studies

**Case Study 1: The Investment Grade Sensitivity Surprise**

A bank ran sensitivity analysis on its corporate IRB model and found that a 20% increase in PD (from 0.05% to 0.06%) for its AAA/AA grade obligors increased capital by 28%. The business was surprised — they assumed investment grade was not risky. The sensitivity arose because at PD = 0.05%, the IRB formula is in the highly convex region: small PD changes cause large K changes. The bank used this to justify investment in data quality for its investment-grade ratings — a 10bp PD estimation error had 10x the capital impact for an IG obligor compared to a BB obligor.

**Case Study 2: The IFRS 7 Disclosure That Caused Market Concern**

A bank published its IFRS 7 sensitivity disclosure showing that a 2pp increase in unemployment would increase ECL by £450m. Analysts noted that their scenario for a "moderate recession" implied unemployment rising by 3pp — implying ECL could increase by £675m. The bank's published sensitivity was based on ±1pp — insufficient to capture the range that analysts were modelling. The following quarter, the bank expanded its sensitivity disclosure to ±2pp and ±3pp, providing more complete information. Lesson: sensitivity ranges must cover the range investors and analysts actually care about, not just a technical minimum.

**Case Study 3: The Monte Carlo That Revealed a Capital Gap**

A validation team ran Monte Carlo sensitivity for an SME PD model with only 45 observed defaults over the calibration period. The posterior PD distribution (Beta(45.5, 1455.5) for Grade 4) had a 95% CI of [0.9%, 3.6%] against a point estimate of 2.0%. Running 10,000 Monte Carlo RWA simulations showed a P95 RWA of £1.8bn against a base RWA of £1.1bn — a £700m range. The bank's Pillar 2A model risk add-on of £30m was clearly inadequate. The validation team recommended a Pillar 2A increase of £150m (approximately 8% × £700m × 0.27, reflecting the probability the true RWA was above base). The PRA agreed this was a more robust basis for the capital add-on.

---

## 14. Iterative Reinforcement

**Week 1**: Implement the Basel IRB formula in Python. Verify against the Basel Committee's published worked examples. Plot K vs PD for LGD = 40%, M = 2.5 years.

**Week 2**: Build a full single-factor sensitivity table for a £1bn EAD portfolio (base PD=2%, LGD=40%, M=2.5y). Compute RWA at PD multiples from 0.5× to 3×. Build the tornado chart.

**Week 3**: Simulate IFRS 9 ECL sensitivity to scenario weights using the four-scenario framework. Identify the weight allocation that produces ECL matching the accounting provision.

**Exam Questions**:
1. For a corporate obligor with PD=1.5%, LGD=45%, M=3 years, EAD=£100m: compute IRB RWA. Then compute RWA if PD doubles to 3.0%. What is the % increase in RWA, and why is it not 100%?
2. Describe the difference between single-factor and multi-factor sensitivity. Give an example where the multi-factor sensitivity is more than the sum of individual single-factor sensitivities.
3. A bank's IFRS 9 model has base ECL = £500m, downside ECL = £900m, severe ECL = £1.6bn. Current weights: Base 60%, Downside 30%, Severe 10%. Compute current weighted ECL. If the bank shifts to weights 40%/40%/20%, what is the new ECL and the change?

---

## 15. Source Material

**Regulatory References**
- Basel BCBS 128 (2006): Annex 2 — Mathematical derivation of IRB capital formulas; Annex 9 — Supervisory formula
- CRR Articles 153–154 (2013): IRB risk weight functions for corporate, sovereign, institution, retail exposures
- PRA SS31/15 (2015): *The Internal Capital Adequacy Assessment Process (ICAAP) and the Supervisory Review and Evaluation Process (SREP)* — sensitivity analysis requirements
- IFRS 7 Paragraphs 35A–35N: Credit risk disclosure requirements including ECL sensitivity
- EBA/GL/2017/06: *IFRS 9 and incurred loss models provisioning* — sensitivity analysis expectations
- SR 11-7 (2011): Section on model limitations and assumption sensitivity

**Books**
- Basel Committee on Banking Supervision: *An Explanatory Note on the Basel II IRB Risk Weight Functions* (July 2005) — detailed derivation of the formula and its non-linearity
- Lütkebohmert, E. (2009). *Concentration Risk in Credit Portfolios*. Springer — mathematical treatment of credit risk sensitivity
- Anderson, R. (2007). *The Credit Scoring Toolkit*. Oxford — sensitivity in scorecard context

**Technical Papers**
- Gordy, M.B. (2003). "A risk-factor model foundation for ratings-based bank capital rules." *Journal of Financial Intermediation* — derivation of the ASRF model underlying Basel IRB
- Tasche, D. (2008). "Capital allocation to business units and sub-portfolios: the Euler principle." *Risk Books* — sensitivity-based capital allocation
- Saltelli, A. et al. (2008). *Global Sensitivity Analysis: The Primer*. Wiley — Sobol indices and advanced sensitivity methods
- Iooss, B. & Lemaître, P. (2015). "A review on global sensitivity analysis methods." *Uncertainty Management in Simulation-Optimization* — comprehensive review of sensitivity methods

**Practitioner Resources**
- Risk.net: Articles on model risk quantification and capital add-ons
- PRA Consultation Papers on ICAAP: Annex on sensitivity analysis expectations
- Moody's Analytics: Technical documentation on Expected Loss and economic capital sensitivity
