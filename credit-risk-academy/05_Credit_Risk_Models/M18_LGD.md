# M18 — Loss Given Default (LGD)

---

## 1. Business Purpose

Loss Given Default (LGD) answers: *if a borrower defaults, what fraction of the exposure will the bank actually lose?* It is defined as:

```
LGD = 1 - Recovery Rate
```

Or more precisely, accounting for the time value of money, workout costs, and foregone interest:

```
LGD = (EAD - PV[Recoveries] + PV[Workout Costs]) / EAD
```

LGD matters enormously for three reasons:

**Capital Requirement:** Under the IRB formula, Expected Loss = PD × LGD × EAD. A facility with LGD = 60% generates three times the expected loss of an otherwise identical facility with LGD = 20%. For senior secured loans to corporates, LGD might be 25%–35%; for unsecured subordinated bonds, it can exceed 80%. Getting LGD wrong by 10 percentage points has a direct and roughly proportional impact on RWA and capital.

**IFRS 9 Provisioning:** ECL = PD × LGD × EAD (simplified for Stage 1). LGD is the hardest of the three parameters to estimate because recoveries depend on collateral values, legal processes, and economic conditions at the time of workout — all of which are difficult to predict.

**Pricing and Structuring:** A banker structuring a leveraged buyout (LBO) loan will assess whether a first-lien senior secured position justifies a materially lower spread than the second-lien. The answer is driven by LGD differential. Understanding LGD by seniority is core structuring knowledge.

**Why a BA needs this:** You will be asked to explain why two facilities to the same obligor have very different ECL allocations. Almost always, it is the LGD — one is senior secured with property collateral (low LGD), the other is an unsecured revolving credit facility (high LGD).

---

## 2. Accounting Concepts

### Specific Provisions and LGD

When a corporate loan is identified as credit-impaired (Stage 3 under IFRS 9), the bank raises a specific provision:

```
Specific Provision = EAD - PV(Expected Recoveries)

where PV(Expected Recoveries) = Σ [Recovery_t / (1 + discount_rate)^t]
```

The discount rate used must be the original Effective Interest Rate (EIR) of the loan — per IFRS 9 para B5.5.44. This is critical: if a £10M loan carries a 7% coupon, you discount all expected cash flows at 7%, not the current market rate or risk-free rate.

### Effective Interest Rate (EIR) Discounting

For a defaulted loan where the bank expects to recover £6M in 2 years and £1M in 4 years:

```
EIR = 7% (original loan rate)

PV(Recoveries) = £6M / 1.07² + £1M / 1.07⁴
               = £5.238M + £0.763M
               = £6.001M

LGD (economic) = (£10M - £6.001M) / £10M = 40.0%
```

Without discounting, the nominal recovery would be £7M → LGD = 30%. The difference (10 percentage points) represents the cost of time — interest foregone during the workout period.

### Impaired Loan Write-off vs Provision

Banks may write off a loan (reduce gross book value to zero and release the associated provision) when they have no reasonable expectation of recovery. Post write-off, any recoveries are credited directly to P&L. For LGD measurement purposes, both the provision and any post-write-off recoveries must be tracked.

### Troubled Debt Restructuring (TDR) / Modification

Under IFRS 9, if a bank grants concessions on a defaulted loan (restructuring), it calculates the ECL on the modified terms. The modification gain/loss = difference between carrying amount and PV of modified cash flows at the original EIR. A modification does not automatically cure the Stage 3 classification — the borrower must demonstrate performance for a "probationary period" (often 12 months of non-missing payments).

---

## 3. Financial Concepts

### Components of LGD

A complete LGD decomposition:

```
LGD = 1 - Recovery Rate

where:

Recovery Rate = [Principal Recovered + Interest Recovered - Workout Costs] / EAD
                ─────────────────────────────────────────────────────────
                               All cash flows discounted to default date

Key components:

1. Principal loss = EAD - Principal_recovered
2. Interest foregone = Contractual interest accrued during workout not recovered
3. Workout costs = Legal fees + enforcement costs + administrative overheads
4. Time discount = Effect of discounting late cash flows at EIR
```

Typical workout timelines by asset class:

| Asset Class | Average Workout Duration | Key Driver |
|-------------|------------------------|------------|
| Commercial real estate (secured) | 18–36 months | Property sale process |
| Corporate (unsecured) | 24–48 months | Insolvency proceedings |
| SME (secured) | 12–24 months | Fixed charge enforcement |
| Trade finance | 3–12 months | Short original tenor |
| LBO (1st lien) | 12–24 months | Pre-pack administration |

### LGD by Facility Type and Seniority

Regulatory and empirical data (Moody's Default Research, S&P recovery studies) consistently show:

| Facility Type / Seniority | Historical Average LGD | Basel FIRB LGD |
|--------------------------|----------------------|----------------|
| Senior secured (1st lien, property) | 20%–35% | 45%* |
| Senior secured (1st lien, other) | 30%–45% | 45%* |
| Senior unsecured | 55%–65% | 45%* |
| Senior subordinated | 65%–75% | 75% |
| Junior subordinated | 75%–85% | 75% |
| Equity/preference shares | 85%–100% | N/A |

*Basel FIRB assigns 45% LGD for most senior corporate claims, 75% for subordinated. These are conservative relative to historical averages for secured lending — one reason banks seek AIRB approval.

### Downturn LGD

Basel III requires that LGD estimates reflect **economic downturn conditions** (CRR Art. 181(1)(b)):

> "LGD estimates shall reflect economic downturn conditions where necessary to capture relevant risks."

Empirical finding: recovery rates are significantly lower during downturns. This is because:
1. Collateral values (particularly commercial property) fall during recessions
2. Multiple borrowers default simultaneously, flooding the secondary market with distressed assets
3. Buyer appetite for distressed assets decreases
4. Workout timelines extend as courts and insolvency practitioners are overwhelmed

**Downturn LGD Methodology:**

Step 1: Identify downturn periods from historical data (e.g., UK: 1990–1992, 2008–2009)
Step 2: Calculate average LGD during downturn periods vs normal periods
Step 3: Downturn LGD = MAX(long-run average LGD, average LGD in downturn periods)
Step 4: Alternatively, apply an add-on to the long-run average LGD

A typical approach:
```
Downturn_LGD = Long_Run_Avg_LGD + Downturn_Add_On

where Downturn_Add_On = Long_Run_Avg_LGD * (Downturn_Avg_LGD / LR_Avg_LGD - 1)
                      = Downturn_Avg_LGD - Long_Run_Avg_LGD
```

For UK commercial real estate: LR average LGD ≈ 30%; 2008–2009 downturn LGD ≈ 55%; Downturn add-on = 25 percentage points.

### LGD and Collateral

Collateral coverage ratio (CCR) is the primary driver of LGD variation for secured facilities:

```
CCR = Collateral_Value / EAD

For an RCF with £100M EAD and £70M property collateral:
CCR = 0.70 (70% coverage)

Estimated LGD = Unsecured_LGD * (1 - CCR * Haircut_Recovery_Rate)

Example: Unsecured_LGD = 65%, Haircut = 80% (bank expects to recover 80p per £1 of collateral value)
LGD_secured = 65% * (1 - 0.70 * 0.80) = 65% * (1 - 0.56) = 65% * 0.44 = 28.6%
```

**Haircuts by collateral type (illustrative Basel / internal estimates):**

| Collateral Type | Typical Recovery Rate on Collateral | Implied Haircut |
|----------------|-----------------------------------|----------------|
| UK residential property | 85%–95% | 5%–15% |
| UK commercial property | 55%–75% | 25%–45% |
| Listed equities | 70%–90% | 10%–30% |
| Receivables | 60%–80% | 20%–40% |
| Plant & equipment | 30%–60% | 40%–70% |
| Inventory | 20%–50% | 50%–80% |

---

## 4. Statistical Concepts

### LGD Estimation Methods

Three main approaches:

**1. Workout LGD (most common for banks):**
Uses historical workout data from the bank's own resolved defaults. For each defaulted facility:
```
LGD_i = 1 - [Σ CF_t / (1 + EIR)^t] / EAD_i
```
Average across all resolved cases = empirical LGD estimate.

**2. Market LGD:**
For traded bonds, market LGD is observed from post-default bond prices:
```
Market LGD ≈ 1 - P_post_default / P_pre_default
```
Bond prices typically drop to 30–50 cents on the dollar immediately post-default, implying market LGD of 50%–70%. Advantage: market-implied and forward-looking. Disadvantage: only available for large issuers with traded debt.

**3. Implied Market LGD from CDS Spreads:**
For entities with liquid CDS:
```
CDS_spread ≈ PD * LGD (under risk-neutral, simplified)
LGD ≈ CDS_spread / PD
```
If 5yr CDS spread = 250bps and Merton PD (risk-neutral) = 5%, then implied LGD ≈ 50%. This is the risk-neutral LGD, not the real-world LGD.

### Distribution of LGD

Unlike PD (bounded 0–1 with a large mass at 0), LGD is bimodal:
- Large mass at 0% (full recovery, often for senior secured)
- Large mass at 100% (total loss, often for unsecured subordinated)
- Intermediate cases form a roughly beta distribution

This bimodality means OLS regression is inappropriate. Standard approaches:
- **Beta regression** (for 0–1 outcome, excluding boundary cases)
- **Tobit regression** (censored at 0 and 1)
- **Two-stage model:** First stage = logistic (zero recovery vs non-zero), Second stage = beta/OLS on non-zero cases
- **Regression trees / Random Forests** (no distributional assumptions)

### Beta Regression

The beta distribution has support (0, 1):
```
E[LGD] = μ = g⁻¹(Xβ)   where g is the logit link function

Var[LGD] = μ(1-μ) / (1 + φ)   where φ is a precision parameter
```

### Model Performance Metrics for LGD

Unlike PD (AUC/Gini), LGD models are evaluated on:
- **Mean Absolute Error (MAE):** Average absolute difference between predicted and realised LGD
- **Root Mean Squared Error (RMSE):** Penalises large errors more heavily
- **Calibration plot:** Predicted vs realised LGD in deciles
- **Spearman rank correlation:** Does the model correctly rank-order cases by severity?

---

## 5. Regulatory Framework

### Basel III IRB LGD Requirements (CRR Art. 181)

- **FIRB (Foundation IRB):** LGD is set by the regulator. Senior unsecured corporate: 45%; Subordinated: 75%.
- **AIRB (Advanced IRB):** Banks estimate own LGD. Requirements:
  - Based on economic loss, including workout costs and time discount
  - Must reflect downturn conditions
  - Minimum observation period: 7 years
  - LGD floors under Basel III finalisation:
    - Senior unsecured corporate: **25%** (previously no floor; CRR3 introduces this)
    - Senior secured: varies by collateral (CRE: 15%; residential: 10%; other: 20%)

### Basel III Finalisation — LGD Input Floors (CRR3)

New LGD floors effective under CRR3 (from January 2025):

| Exposure Class | Collateral Type | LGD Floor |
|----------------|----------------|-----------|
| Corporate — secured by financial collateral | Listed equities / gov bonds | 0% |
| Corporate — secured by CRE | Commercial property | 15% |
| Corporate — secured by other physical collateral | Plant, equipment | 20% |
| Corporate — unsecured | N/A | 25% |
| Subordinated | N/A | 50% |

These floors apply at the exposure level under the IRB output floor calculation. Banks with AIRB estimates below these floors must use the floor for the output floor calculation.

### IFRS 9 LGD Requirements

IFRS 9 does not specify LGD floors. LGD must be:
- Unbiased and probability-weighted
- Based on historical experience adjusted for current conditions
- Forward-looking (LGD during a future downturn may differ from historical average)
- Consistent with the expected timing and amount of recoveries

EBA/GL/2017/16 provides detailed guidance:
- Incomplete workouts must be treated carefully (open cases introduce selection bias)
- Cure rates (cases that return to performing from default) must be measured and modelled

---

## 6. Data Required

### Workout Data Elements

| Field | Description | Key Issues |
|-------|------------|-----------|
| FACILITY_ID | Unique identifier for each defaulted facility | Cross-facility netting rules |
| DEFAULT_DATE | Date Basel Art. 178 definition triggered | Multiple default episodes |
| EAD_AT_DEFAULT | Exposure at default date (£) | Must include accrued interest |
| RECOVERY_DATE_n | Date of each recovery cash flow | Match to accounting records |
| RECOVERY_AMOUNT_n | Amount of each recovery (£) | Gross vs net of workout costs |
| WORKOUT_COSTS | Total legal, admin, enforcement costs (£) | Often allocated rather than direct |
| RESOLUTION_DATE | Date workout completed (closed) | Open cases → incomplete data |
| COLLATERAL_VALUE_AT_DEFAULT | Valuation of pledged collateral | Independent valuation required |
| COLLATERAL_TYPE | Property / equipment / receivables / other | FINREP categorisation |
| WORKOUT_STATUS | Resolved / ongoing / partial | Exclude ongoing from LGD calc |
| CURE_FLAG | 1 if obligor returned to performing | Impacts LGD measurement |

### Minimum Dataset Size

For statistically reliable LGD estimates by segment (EBA guidance):
- Minimum 20 resolved default observations per segment
- Preferably including at least one downturn period
- For LDP portfolios, supplement with external data (Moody's, S&P recovery database)

### Collateral Data

- Valuations must be conducted by independent qualified valuers
- Frequency: annually for standard monitoring; immediately upon default
- Indexed valuations (using published property indices) acceptable between formal valuations for Basel purposes (EBA/GL/2020/04)

---

## 7. How Analysts Actually Work

**Step 1 — Resolve the workout database.** The most painful step. Gather all historically defaulted facilities, their cash flow histories, and resolution status. Many banks have poor data quality here — costs are in one system, recoveries in another, and the mapping between facilities and credit events in a third.

**Step 2 — Calculate economic LGD for each resolved case.** For each defaulted facility with complete cash flows:
```
LGD_i = 1 - [Σ CF_t * discount_factor(t, EIR)] / EAD_i
```
where discount_factor(t, EIR) = 1 / (1 + EIR)^(t - t_default).

**Step 3 — Segment the portfolio.** LGD varies significantly by: facility type (secured vs unsecured), collateral type, industry, geography, seniority. Build separate models or LGD tables for each material segment.

**Step 4 — Model LGD.** For a corporate AIRB model, regress LGD against: collateral coverage ratio, collateral type dummies, seniority dummies, industry dummies, LTV at default. Use beta regression or regression tree.

**Step 5 — Downturn adjustment.** Identify downturn periods. Calculate average LGD during those periods. Apply the higher of long-run average and downturn period estimate.

**Step 6 — Calibration check.** Compare average predicted LGD against realised LGD by segment. Error within ±5% absolute is generally acceptable. Material underestimation requires upward adjustment.

**Practical frustrations:**
- Incomplete workout data: many workouts take 3–5 years to resolve; banks must handle censored/incomplete observations
- Cost allocation: workout costs are often allocated to pools of defaulted exposures rather than tracked at facility level; this introduces noise
- Business line resistance to high LGD estimates on secured lending ("our security is good quality")
- Data aggregation issues: historical M&A activity means acquiring banks inherit incomplete workout records from acquired portfolios

---

## 8. Excel Implementation

### Economic LGD Calculation for a Single Defaulted Loan

```excel
Sheet: "LGD_Workout"

Inputs:
B2: EAD at Default = £2,500,000
B3: Default Date = 01/01/2021
B4: EIR (Original Loan Rate) = 6.5% (0.065)

Recovery Cash Flows:
      Col A            Col B            Col C           Col D
Row   Recovery_Date    Days_Since_Def   Recovery_£      PV_Factor
7     15/06/2021       165              200,000         =1/(1+$B$4)^(C7/365)
8     01/03/2022       424              800,000         =1/(1+$B$4)^(C8/365)
9     30/09/2022       637              600,000         =1/(1+$B$4)^(C9/365)
10    15/01/2023       744              150,000         =1/(1+$B$4)^(C10/365)

Workout Costs (direct):
B12: £45,000

PV of Gross Recoveries: =SUMPRODUCT(D7:D10, B7:B10)   [PV_Factor * Recovery_£]
PV of Workout Costs: =B12 / (1+B4)^(AVERAGE(C7:C10)/365)

Net PV Recovery: =PV_Gross_Recovery - PV_Workout_Costs

Economic LGD: =1 - Net_PV_Recovery / B2
```

### LGD by Collateral Coverage Ratio (Look-up Table)

```excel
Sheet: "LGD_Matrix"

CCR Bands   | Unsecured | Property-Secured | Equipment-Secured | Receivables
0%          | 65%       | 65%              | 65%               | 65%
0–25%       | 55%       | 50%              | 57%               | 58%
25–50%      | 45%       | 38%              | 46%               | 48%
50–75%      | 40%       | 28%              | 38%               | 40%
75–100%     | 35%       | 20%              | 30%               | 32%
100%+       | 30%       | 15%              | 22%               | 25%

Formula to lookup LGD:
=INDEX(LGD_Matrix, MATCH(TRUE, CCR_Bands > Actual_CCR, 0), MATCH(Collateral_Type, Headers, 0))

With floor applied:
=MAX(0.25, INDEX(LGD_Matrix, ...))    [CRR3 25% floor for unsecured]
```

### Downturn LGD Calculation

```excel
Sheet: "Downturn"

Normal period average LGD  (2010-2007, 2013-2019):  =AVERAGEIF(period_col,"Normal",lgd_col)
Downturn period average LGD (2008-2009):             =AVERAGEIF(period_col,"Downturn",lgd_col)
Downturn add-on:  =MAX(0, Downturn_Avg - Normal_Avg)
Regulatory downturn LGD:  =MAX(Normal_Avg, Downturn_Avg)
```

---

## 9. SQL Implementation

```sql
-- ============================================================
-- M18: LGD ECONOMIC CALCULATION FROM WORKOUT DATA
-- ============================================================

-- Step 1: For each resolved default, calculate PV of recoveries
WITH recovery_pv AS (
    SELECT
        wh.FACILITY_ID,
        wh.DEFAULT_DATE,
        wh.EAD_AT_DEFAULT,
        wh.ORIGINAL_EIR,
        -- Sum all discounted recovery cash flows
        SUM(
            rcf.RECOVERY_AMOUNT
            * POWER(1.0 / (1.0 + wh.ORIGINAL_EIR),
                    DATEDIFF(DAY, wh.DEFAULT_DATE, rcf.RECOVERY_DATE) / 365.25)
        ) AS pv_gross_recoveries,
        -- Workout costs discounted to default date at EIR
        -- (using midpoint of workout as timing proxy)
        SUM(rcf.ALLOCATED_WORKOUT_COST
            * POWER(1.0 / (1.0 + wh.ORIGINAL_EIR),
                    DATEDIFF(DAY, wh.DEFAULT_DATE, rcf.RECOVERY_DATE) / 365.25)
        ) AS pv_workout_costs,
        wh.COLLATERAL_TYPE,
        wh.COLLATERAL_VALUE_AT_DEFAULT,
        wh.SENIORITY,
        wh.INDUSTRY_CODE,
        wh.RESOLUTION_DATE,
        wh.CURE_FLAG
    FROM workout_history wh
    INNER JOIN recovery_cashflows rcf
        ON wh.FACILITY_ID = rcf.FACILITY_ID
    WHERE wh.WORKOUT_STATUS = 'RESOLVED'          -- Exclude open cases
      AND wh.DEFAULT_DATE >= '2010-01-01'
      AND wh.CURE_FLAG = 0                        -- Exclude cured defaults
    GROUP BY
        wh.FACILITY_ID, wh.DEFAULT_DATE, wh.EAD_AT_DEFAULT,
        wh.ORIGINAL_EIR, wh.COLLATERAL_TYPE, wh.COLLATERAL_VALUE_AT_DEFAULT,
        wh.SENIORITY, wh.INDUSTRY_CODE, wh.RESOLUTION_DATE, wh.CURE_FLAG
),

-- Step 2: Calculate economic LGD per facility
lgd_calc AS (
    SELECT
        FACILITY_ID,
        DEFAULT_DATE,
        EAD_AT_DEFAULT,
        pv_gross_recoveries,
        pv_workout_costs,
        pv_gross_recoveries - pv_workout_costs  AS net_pv_recovery,
        -- LGD capped at [0, 1] — negative recovery (costs > recoveries) → LGD = 1
        CASE
            WHEN EAD_AT_DEFAULT = 0 THEN NULL
            ELSE GREATEST(0.0,
                 LEAST(1.0,
                     1.0 - (pv_gross_recoveries - pv_workout_costs) / EAD_AT_DEFAULT
                 ))
        END                                     AS economic_lgd,
        COLLATERAL_VALUE_AT_DEFAULT / NULLIF(EAD_AT_DEFAULT, 0)
                                                AS collateral_coverage_ratio,
        COLLATERAL_TYPE,
        SENIORITY,
        INDUSTRY_CODE,
        DATEDIFF(MONTH, DEFAULT_DATE, RESOLUTION_DATE) AS workout_months,
        -- Flag whether default occurred in a regulatory downturn period
        CASE
            WHEN DEFAULT_DATE BETWEEN '2008-01-01' AND '2009-12-31' THEN 'DOWNTURN_2008'
            WHEN DEFAULT_DATE BETWEEN '2020-01-01' AND '2020-12-31' THEN 'DOWNTURN_2020'
            ELSE 'NORMAL'
        END                                     AS economic_period
    FROM recovery_pv
),

-- Step 3: Segment averages and downturn LGD
lgd_segments AS (
    SELECT
        COLLATERAL_TYPE,
        SENIORITY,
        economic_period,
        COUNT(*)                    AS n_observations,
        AVG(economic_lgd)           AS avg_lgd,
        STDEV(economic_lgd)         AS std_lgd,
        PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY economic_lgd) AS lgd_p25,
        PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY economic_lgd) AS lgd_p75,
        AVG(collateral_coverage_ratio) AS avg_ccr,
        AVG(workout_months)         AS avg_workout_months
    FROM lgd_calc
    GROUP BY COLLATERAL_TYPE, SENIORITY, economic_period
),

-- Step 4: Compute downturn LGD
downturn_lgd AS (
    SELECT
        COLLATERAL_TYPE,
        SENIORITY,
        -- Long-run average (all periods)
        AVG(CASE WHEN economic_period != 'DOWNTURN_2008' THEN avg_lgd END)
                                    AS lr_avg_lgd_normal,
        -- Downturn period average
        MAX(CASE WHEN economic_period = 'DOWNTURN_2008' THEN avg_lgd END)
                                    AS downturn_2008_lgd,
        -- Basel requirement: MAX(long-run, downturn)
        GREATEST(
            AVG(avg_lgd),
            COALESCE(MAX(CASE WHEN economic_period = 'DOWNTURN_2008' THEN avg_lgd END), 0)
        )                           AS regulatory_downturn_lgd,
        -- Apply CRR3 LGD floors
        GREATEST(
            CASE
                WHEN SENIORITY = 'SENIOR_UNSECURED' THEN 0.25
                WHEN COLLATERAL_TYPE = 'COMMERCIAL_PROPERTY' THEN 0.15
                WHEN COLLATERAL_TYPE IN ('EQUIPMENT','PLANT') THEN 0.20
                ELSE 0.25
            END,
            GREATEST(
                AVG(avg_lgd),
                COALESCE(MAX(CASE WHEN economic_period = 'DOWNTURN_2008' THEN avg_lgd END), 0)
            )
        )                           AS crr3_floored_lgd
    FROM lgd_segments
    GROUP BY COLLATERAL_TYPE, SENIORITY
)

SELECT
    COLLATERAL_TYPE,
    SENIORITY,
    ROUND(lr_avg_lgd_normal * 100, 2)       AS lr_avg_lgd_normal_pct,
    ROUND(downturn_2008_lgd * 100, 2)       AS downturn_2008_lgd_pct,
    ROUND(regulatory_downturn_lgd * 100, 2) AS reg_downturn_lgd_pct,
    ROUND(crr3_floored_lgd * 100, 2)        AS crr3_final_lgd_pct
FROM downturn_lgd
ORDER BY COLLATERAL_TYPE, SENIORITY;

-- ============================================================
-- IFRS 9: LGD by Stage and Macro Scenario
-- ============================================================
SELECT
    f.FACILITY_ID,
    f.STAGE,
    f.COLLATERAL_TYPE,
    f.SENIORITY,
    -- Base scenario LGD
    dl.crr3_floored_lgd                    AS lgd_base,
    -- Downturn scenario LGD (stressed collateral values)
    dl.crr3_floored_lgd * 1.25             AS lgd_downside,
    -- Upside scenario LGD
    dl.crr3_floored_lgd * 0.85             AS lgd_upside,
    -- IFRS 9 probability-weighted LGD (3 scenarios)
    (0.55 * dl.crr3_floored_lgd
     + 0.30 * dl.crr3_floored_lgd * 1.25
     + 0.15 * dl.crr3_floored_lgd * 0.85) AS lgd_ifrs9_weighted
FROM facilities f
JOIN downturn_lgd dl
    ON f.COLLATERAL_TYPE = dl.COLLATERAL_TYPE
   AND f.SENIORITY = dl.SENIORITY
WHERE f.PORTFOLIO = 'CORPORATE';
```

---

## 10. Python Implementation

```python
"""
M18_LGD_Model.py
Loss Given Default — Economic LGD Calculation + Regression Tree Model
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import cross_val_score, KFold
from sklearn.metrics import mean_absolute_error, mean_squared_error
from scipy.stats import spearmanr
import matplotlib.pyplot as plt

# ============================================================
# 1. ECONOMIC LGD CALCULATION FROM WORKOUT CASH FLOWS
# ============================================================

def calculate_economic_lgd(ead: float,
                             default_date: pd.Timestamp,
                             cash_flows: list,  # list of (date, amount, cost)
                             eir: float) -> dict:
    """
    Calculate economic LGD for a single defaulted facility.

    Parameters:
    -----------
    ead         : Exposure At Default (£)
    default_date: Date Basel default occurred
    cash_flows  : List of (recovery_date, gross_recovery, workout_cost)
    eir         : Original Effective Interest Rate (e.g., 0.065 for 6.5%)

    Returns:
    --------
    dict with LGD components
    """
    pv_gross = 0.0
    pv_costs = 0.0

    for rec_date, gross_amount, cost in cash_flows:
        days = (rec_date - default_date).days
        years = days / 365.25
        discount = 1.0 / (1.0 + eir) ** years
        pv_gross += gross_amount * discount
        pv_costs += cost * discount

    net_pv = pv_gross - pv_costs
    economic_lgd = 1.0 - net_pv / ead if ead > 0 else 1.0
    economic_lgd = np.clip(economic_lgd, 0.0, 1.0)

    return {
        'ead': ead,
        'pv_gross_recoveries': pv_gross,
        'pv_workout_costs': pv_costs,
        'net_pv_recovery': net_pv,
        'recovery_rate': net_pv / ead if ead > 0 else 0.0,
        'economic_lgd': economic_lgd,
        'time_discount_impact': (pv_gross - sum(cf[1] for cf in cash_flows)) / ead
    }


# Example workout: £2.5M senior secured loan, 6.5% EIR
example = calculate_economic_lgd(
    ead=2_500_000,
    default_date=pd.Timestamp('2021-01-01'),
    cash_flows=[
        (pd.Timestamp('2021-06-15'), 200_000, 5_000),
        (pd.Timestamp('2022-03-01'), 800_000, 15_000),
        (pd.Timestamp('2022-09-30'), 600_000, 12_000),
        (pd.Timestamp('2023-01-15'), 150_000, 8_000),
    ],
    eir=0.065
)

print("Economic LGD Calculation:")
for k, v in example.items():
    if k not in ['ead']:
        print(f"  {k:30s}: {v*100:.2f}%" if 'lgd' in k or 'rate' in k or 'impact' in k
              else f"  {k:30s}: £{v:,.0f}")
print(f"  Economic LGD:                   {example['economic_lgd']*100:.2f}%")

# ============================================================
# 2. SYNTHETIC LGD DATASET
# ============================================================

np.random.seed(42)
n = 1500

# Collateral type encoding
collateral_map = {0: 'Unsecured', 1: 'Residential', 2: 'Commercial_RE',
                  3: 'Equipment', 4: 'Receivables'}
collateral_codes = np.random.choice([0, 1, 2, 3, 4], size=n,
                                     p=[0.30, 0.15, 0.20, 0.20, 0.15])

# Seniority encoding
seniority_map = {0: 'Senior_Secured', 1: 'Senior_Unsecured', 2: 'Subordinated'}
seniority_codes = np.random.choice([0, 1, 2], size=n, p=[0.45, 0.40, 0.15])

# Collateral coverage ratio (0 for unsecured)
ccr = np.where(
    collateral_codes == 0,
    0.0,
    np.random.beta(a=3, b=2, size=n).clip(0.05, 1.50)
)

# Industry (cyclical = higher LGD)
cyclical = np.random.binomial(1, 0.35, size=n)

# Workout duration (months)
workout_months = np.random.lognormal(mean=3.0, sigma=0.5, size=n).clip(3, 72)

# True LGD model (economic LGD function of collateral, seniority, CCR)
# Base LGD by collateral type
base_lgd = np.array([0.65, 0.22, 0.35, 0.45, 0.40])[collateral_codes]
# CCR reduction
ccr_benefit = np.where(collateral_codes == 0, 0.0, ccr * 0.35)
# Seniority adjustment
seniority_adj = np.array([0.0, 0.10, 0.25])[seniority_codes]
# Cyclical uplift
cyclical_adj = cyclical * 0.08
# Workout duration adjustment (longer = higher LGD due to discounting)
duration_adj = (workout_months / 36) * 0.05
# Add noise
noise = np.random.normal(0, 0.08, size=n)

true_lgd = (base_lgd - ccr_benefit + seniority_adj + cyclical_adj
            + duration_adj + noise).clip(0.0, 1.0)

df = pd.DataFrame({
    'collateral_code': collateral_codes,
    'seniority_code': seniority_codes,
    'ccr': ccr,
    'cyclical_industry': cyclical,
    'workout_months': workout_months,
    'is_unsecured': (collateral_codes == 0).astype(int),
    'is_commercial_re': (collateral_codes == 2).astype(int),
    'is_subordinated': (seniority_codes == 2).astype(int),
    'lgd': true_lgd
})

print(f"\nLGD Dataset: {n} resolved defaults")
print(f"Mean LGD: {df['lgd'].mean()*100:.1f}%")
print(f"Median LGD: {df['lgd'].median()*100:.1f}%")
print(f"\nLGD by Collateral Type:")
for code, name in collateral_map.items():
    subset = df[df['collateral_code'] == code]['lgd']
    print(f"  {name:20s}: mean={subset.mean()*100:.1f}%  "
          f"median={subset.median()*100:.1f}%  n={len(subset)}")

# ============================================================
# 3. LGD MODEL — GRADIENT BOOSTING REGRESSION TREE
# ============================================================

features = ['collateral_code', 'seniority_code', 'ccr', 'cyclical_industry',
            'workout_months', 'is_unsecured', 'is_commercial_re', 'is_subordinated']

X = df[features]
y = df['lgd']

# Gradient Boosting (handles non-linear relationships, bimodal outcomes)
model = GradientBoostingRegressor(
    n_estimators=200,
    learning_rate=0.05,
    max_depth=4,
    min_samples_leaf=20,   # Prevent overfitting on small segments
    subsample=0.8,
    random_state=42
)

# 5-fold CV
kf = KFold(n_splits=5, shuffle=True, random_state=42)
oof_preds = np.zeros(n)

for fold, (train_idx, val_idx) in enumerate(kf.split(X)):
    X_tr, X_val = X.iloc[train_idx], X.iloc[val_idx]
    y_tr, y_val = y.iloc[train_idx], y.iloc[val_idx]
    model.fit(X_tr, y_tr)
    oof_preds[val_idx] = model.predict(X_val).clip(0.0, 1.0)

print("\nLGD Model Performance (5-fold OOF):")
print(f"  MAE:  {mean_absolute_error(y, oof_preds)*100:.2f}%")
print(f"  RMSE: {np.sqrt(mean_squared_error(y, oof_preds))*100:.2f}%")
spearman_corr, _ = spearmanr(y, oof_preds)
print(f"  Spearman Rank Correlation: {spearman_corr:.4f}")

# ============================================================
# 4. CALIBRATION TABLE
# ============================================================

print("\nLGD Calibration Table (Deciles of Predicted LGD):")
print(f"{'Decile':>8} {'N':>6} {'Pred_LGD':>10} {'Realised_LGD':>14} {'Ratio':>8}")
print("-" * 50)

sorted_idx = np.argsort(oof_preds)
groups = np.array_split(sorted_idx, 10)
for i, grp in enumerate(groups):
    pred = oof_preds[grp].mean()
    actual = y.iloc[grp].mean()
    ratio = pred / actual if actual > 0 else np.inf
    print(f"{i+1:>8} {len(grp):>6} {pred*100:>9.1f}% {actual*100:>13.1f}% {ratio:>8.3f}x")

# ============================================================
# 5. DOWNTURN LGD ESTIMATION
# ============================================================

# Simulate which defaults occurred during downturn (2008–2009, 2020)
np.random.seed(99)
df['downturn_flag'] = np.random.binomial(1, 0.18, size=n)  # 18% during downturn

print("\nDownturn LGD Analysis:")
for coll_code, coll_name in collateral_map.items():
    subset = df[df['collateral_code'] == coll_code]
    lr_lgd = subset['lgd'].mean()
    dt_lgd = subset[subset['downturn_flag']==1]['lgd'].mean()
    reg_lgd = max(lr_lgd, dt_lgd) if not np.isnan(dt_lgd) else lr_lgd
    print(f"\n  {coll_name}:")
    print(f"    Long-run avg LGD:   {lr_lgd*100:.1f}%")
    print(f"    Downturn avg LGD:   {dt_lgd*100:.1f}%" if not np.isnan(dt_lgd) else "    No downturn obs")
    print(f"    Regulatory (MAX):   {reg_lgd*100:.1f}%")

# ============================================================
# 6. IMPLIED MARKET LGD FROM CDS (for reference)
# ============================================================

def implied_lgd_from_cds(cds_spread_bps: float,
                          risk_neutral_pd: float) -> float:
    """
    Simplified CDS-implied LGD.
    CDS_spread ≈ PD * LGD (simplified, ignoring accrual and timing)
    """
    cds_decimal = cds_spread_bps / 10_000
    return cds_decimal / risk_neutral_pd if risk_neutral_pd > 0 else np.nan

print("\nMarket-Implied LGD Examples:")
cds_examples = [
    ("BBB senior unsecured", 120, 0.0028 * 5),   # 5yr PD
    ("BB senior secured", 300, 0.0115 * 5),
    ("B unsecured", 650, 0.0550 * 5),
]
for name, spread, pd_rn in cds_examples:
    lgd = implied_lgd_from_cds(spread, pd_rn)
    print(f"  {name:30s}: CDS={spread}bps, RN_PD={pd_rn*100:.1f}%, "
          f"Implied_LGD={lgd*100:.1f}%")

# ============================================================
# 7. LGD SENSITIVITY TO COLLATERAL VALUE STRESS
# ============================================================

def lgd_collateral_stress(base_ltv: float,
                            collateral_haircut: float,
                            unsecured_lgd: float = 0.65,
                            recovery_rate_on_collateral: float = 0.80) -> float:
    """
    LGD given LTV and collateral haircut.
    base_ltv: loan-to-value ratio at origination
    collateral_haircut: stress reduction in collateral value (e.g., 0.30 = 30% fall)
    """
    # Stressed collateral value per unit of EAD
    stressed_collateral = (1 / base_ltv) * (1 - collateral_haircut)
    # Recovery from collateral (capped at EAD)
    coll_recovery = min(1.0, stressed_collateral * recovery_rate_on_collateral)
    # LGD = unsecured LGD reduced by collateral recovery
    lgd = max(0.0, unsecured_lgd * (1 - coll_recovery / unsecured_lgd) if coll_recovery < unsecured_lgd else 0.0)
    return lgd

print("\nLGD Sensitivity to Commercial Property Stress (Senior Secured):")
print(f"{'LTV':>6} {'Base':>10} {'Stress 20%':>12} {'Stress 40%':>12} {'Stress 60%':>12}")
for ltv in [0.5, 0.6, 0.7, 0.8, 0.9]:
    lgd_base = lgd_collateral_stress(ltv, 0.0)
    lgd_20 = lgd_collateral_stress(ltv, 0.20)
    lgd_40 = lgd_collateral_stress(ltv, 0.40)
    lgd_60 = lgd_collateral_stress(ltv, 0.60)
    print(f"{ltv*100:>5.0f}% {lgd_base*100:>9.1f}% {lgd_20*100:>11.1f}% "
          f"{lgd_40*100:>11.1f}% {lgd_60*100:>11.1f}%")
```

---

## 11. Interview Questions

**Q1: What is the difference between economic LGD and regulatory LGD?**

*Answer:* Economic LGD is the actual loss experienced on a defaulted exposure, measured as 1 minus the present value of all net recoveries (gross recoveries minus workout costs, discounted at the original EIR). Regulatory LGD under Basel AIRB must be at least as high as economic LGD and must additionally reflect downturn conditions. Under FIRB, LGD is prescribed by the regulator (45% for senior corporate, 75% for subordinated), which is often more conservative than the economic LGD on secured portfolios. CRR3 also introduces LGD input floors (e.g., 25% for senior unsecured corporate) that may be higher than bank estimates.

**Q2: A bank has £100M senior secured corporate loans. LGD = 40% (its own estimate). The regulator says use the FIRB LGD of 45%. Why might the bank prefer AIRB?**

*Answer:* Under AIRB with well-collateralised loans (e.g., property-backed), the bank's empirical LGD might be 25%–35%, significantly below the FIRB prescribed 45%. Lower LGD directly reduces Expected Loss = PD × LGD × EAD, reducing provisions and RWA. This frees capital for other uses. The catch: AIRB requires extensive data (7 years of resolved workouts), model validation, regulatory approval, and ongoing governance. The cost-benefit of AIRB investment depends on portfolio size; for a £1Bn+ portfolio, even a 10pp LGD reduction on a 45% → 35% basis saves significant capital.

**Q3: Why is the EIR used to discount recovery cash flows, and not the risk-free rate or the current market rate?**

*Answer:* IFRS 9 para B5.5.44 specifies the original EIR. The logic: the carrying value of the loan was accreting interest at the EIR pre-default. Discounting post-default cash flows at the same rate maintains consistency with the pre-default amortised cost measurement. Using the current market rate would introduce a market-value element, blurring the distinction between IFRS 9 amortised cost and IFRS 9 FVTOCI/FVTPL measurements. Using the risk-free rate would underestimate the cost of delay (the foregone credit spread is a real economic cost).

**Q4: What is downturn LGD and why does Basel require it?**

*Answer:* Downturn LGD reflects the severity of loss during periods of economic stress, when collateral values are depressed and secondary markets are illiquid. Historical evidence (particularly from CRE portfolios in 2008–2009) shows average LGDs can be 15–25 percentage points higher in downturns than in normal periods. Basel requires banks to estimate LGD under downturn conditions so that IRB capital is sufficient not just on average, but in scenarios where losses cluster — precisely the scenario where the bank needs its capital buffer. The regulatory capital framework is designed for tail events, not average outcomes.

**Q5: For a £50M revolving credit facility with £30M drawn and £20M undrawn, what is the EAD and how does LGD apply?**

*Answer:* EAD = £30M drawn + CCF × £20M undrawn. If CCF = 75%, EAD = £30M + £15M = £45M. LGD is then applied to this £45M EAD. The LGD for the drawn portion (unsecured RCF) might be 60%–65%. But note: the undrawn portion that converts into EAD is treated the same way — you do not apply a different LGD to the undrawn versus drawn. Some banks do model a facility-level LGD that blends the seniority, collateral, and drawdown characteristics, but the standard approach applies one LGD to the total EAD.

---

## 12. Common Mistakes

**Mistake 1 — Not discounting recovery cash flows.**
Adding up nominal recovery cash flows without discounting gives nominal recovery rate, not economic recovery rate. On a workout that takes 3 years to resolve at a 6% original loan rate, the discounting effect can reduce the recovery rate by 5–10 percentage points. This is a material understatement of LGD.

**Mistake 2 — Excluding workout costs.**
Banks often exclude or underestimate workout costs because they are challenging to track at facility level. Legal fees, valuer fees, internal staff time, and enforcement costs are real economic losses. EBA/GL/2017/16 explicitly requires their inclusion. Excluding them understates LGD by 3%–8% typically.

**Mistake 3 — Survivorship bias from open workouts.**
If you only include resolved defaults in your LGD dataset, you exclude cases that are still in workout. Open workouts tend to be the most complex and worst-performing cases. Excluding them creates a downward bias in LGD. EBA guidance requires a treatment approach for incomplete observations (either impute a floor LGD or use survival analysis).

**Mistake 4 — Applying FIRB LGD to subordinated exposure that looks secured.**
A common structuring error: a bank lends at the second-lien level (legally subordinated) but has collateral. The collateral is only accessed after the first-lien is fully satisfied. In a stress scenario where EAD > first-lien outstanding, the second-lien effectively has unsecured loss characteristics. Using a secured LGD here understates risk.

**Mistake 5 — Treating LGD as constant over the credit cycle for IFRS 9.**
Under IFRS 9, LGD should incorporate forward-looking information. During a macro downturn scenario, LGD should increase (collateral values stressed). Banks that apply a static historical average LGD to all three IFRS 9 scenarios are not compliant with the forward-looking requirement and are likely to understate provisions in downside scenarios.

---

## 13. Case Studies

### Case Study A: UK CRE Portfolio Downturn LGD (2007–2012)

In 2007, a UK bank's commercial real estate portfolio had average LTV of 75% and estimated LGD of 25% based on 2004–2007 historical data (property prices were rising). By 2009, prime UK commercial property had fallen 44% peak-to-trough (IPF data). For a loan with original LTV 75%, the stressed LTV reached 133% — fully underwater. Average LGD on defaulted CRE loans peaked at 55%–65% in 2009–2010. The lesson: LGD models calibrated in benign conditions dramatically underestimate downturn LGD. Banks that recognised this early (and applied conservative LGD estimates from 2007 onward) held sufficient provisions. Those that did not faced regulatory pressure to raise provisions retroactively.

### Case Study B: Altice/Numericable Restructuring — Seniority Impact on LGD

Altice Group entered distress in 2023 with complex capital structures across multiple subsidiaries. The 1st lien debt (senior secured, EURIBOR+425bps) recovered approximately 85 cents on the dollar in restructuring. The 2nd lien and PIK notes recovered approximately 15–30 cents. This real-world example demonstrates that seniority drives LGD outcomes far more than the headline credit quality of the borrower: both tranches belonged to the same obligor group, yet LGD ranged from 15% (1st lien) to 70–85% (2nd lien). Credit structuring teams use exactly this LGD differential to argue for tighter pricing on junior tranches.

### Case Study C: Building an LGD Model for SME Secured Portfolio

A regional UK bank has 800 resolved SME defaults (2014–2023), 60% secured by business premises or equipment. Development process:
1. Workout database assembled from 3 legacy systems (acquisition history)
2. 180 cases excluded: incomplete cash flow data, technical defaults, cures
3. 620 usable observations (mean LGD = 38%, range 0%–100%)
4. Bimodal distribution confirmed: 22% of cases at <5% LGD (full recovery), 18% at >90% LGD (total loss)
5. Gradient Boosting model: features = CCR, collateral type, LTV, workout duration, sector
6. Out-of-fold MAE = 11.5%, Spearman correlation = 0.71
7. Downturn period (2008–2010) LGD = 52% vs normal period 31% → 21pp downturn add-on applied
8. Final regulatory LGD by segment ranges from 20% (residential secured) to 55% (unsecured)

---

## 14. Iterative Reinforcement

### Week 1 Exercises

1. Build the economic LGD calculation in Excel for the following case: £5M unsecured corporate loan, EIR = 8%, cash flows: £500K at month 6, £1.2M at month 18, £800K at month 30, £200K at month 42, workout costs = £150K paid at months 6 and 18. Calculate nominal recovery rate and economic recovery rate. What is the LGD impact of discounting?

2. In the Python code, modify the `lgd_collateral_stress` function to incorporate a 6-month workout delay before collateral proceeds are received. How does this affect LGD for a 70% LTV commercial property loan at a 40% collateral stress?

3. Reproduce the SQL downturn LGD query on a spreadsheet with 50 fake default observations (assign random LGDs and downturn flags). Verify the MAX(long-run, downturn) logic gives you the correct downturn LGD.

### Week 2 Exercises

4. Calculate the LGD implication of the following CRR3 floors: a bank's AIRB estimates are: Senior unsecured 22%, CRE secured 13%, Equipment secured 18%. Which segments need flooring? What is the impact on RWA if the affected portfolio = £200M with average PD = 1%?

5. Implement a two-stage LGD model in Python: Stage 1 = logistic regression (P(full recovery) vs P(partial/total loss)); Stage 2 = gradient boosting on non-zero LGD cases. Compare MAE to the single-stage model.

### Self-Test Questions

- Why is LGD bimodally distributed rather than normally distributed?
- What is the formula for LGD when discounting is applied? Why does a longer workout period increase LGD even if nominal recovery is unchanged?
- Under Basel III finalisation, what is the LGD floor for a senior secured CRE loan? What does this mean for a bank with a 10% empirical LGD on a well-secured portfolio?
- Distinguish between market LGD, workout LGD, and implied market LGD from CDS spreads. When would you use each?

---

## 15. Source Material

**Primary Regulatory Documents**
- BCBS, *Basel III: Finalising Post-Crisis Reforms* (December 2017) — Section on LGD floors and AIRB constraints
- European Banking Authority, *EBA/GL/2017/16: Guidelines on PD estimation, LGD estimation and the treatment of defaulted exposures* (2017) — Sections 5–7 (LGD requirements in detail)
- CRR Article 181 — Requirements for own-estimates of LGD (AIRB)
- CRR Article 183 — Requirements for estimates of guarantees and credit derivatives (LGD adjustment)
- IASB, *IFRS 9 Financial Instruments* (2014) — Paragraphs B5.5.29–B5.5.35 (LGD in ECL estimation)
- EBA/GL/2020/04 — Guidelines on the application of the definition of default under CRR

**Academic Papers**
- Schuermann, T. (2004). "What Do We Know About Loss Given Default?" Federal Reserve Bank of New York Staff Report No. 168
- Altman, E.I., Brady, B., Resti, A., & Sironi, A. (2005). "The Link between Default and Recovery Rates: Theory, Empirical Evidence and Implications." *Journal of Business*, 78(6), 2203–2228
- Bellotti, T., & Crook, J. (2012). "Loss Given Default Models Incorporating Macroeconomic Variables for Credit Cards." *International Journal of Forecasting*, 28(1), 171–182
- Calabrese, R., & Zenga, M. (2010). "Bank Loan Recovery Rates: Measuring and Nonparametric Density Estimation." *Journal of Banking & Finance*, 34(5), 903–911

**Industry Data Sources**
- Moody's Analytics, *Annual Default Study: Corporate Default and Recovery Rates* — Table of average recovery rates by seniority and collateral
- S&P Global Ratings, *Default, Transition, and Recovery* studies (annual)
- Bank of England, *Financial Stability Report* — UK property price indices, downturn indicators

**Books**
- Bluhm, C., Overbeck, L., & Wagner, C. (2010). *Introduction to Credit Risk Modeling* (2nd Ed.). CRC Press — Chapter 5 (LGD)
- Resti, A., & Sironi, A. (2007). *Risk Management and Shareholders' Value in Banking*. Wiley — Chapter 6 (Recovery rates and LGD)
- De Laurentis, G., Maino, R., & Molteni, L. (2010). *Developing, Validating and Using Internal Ratings*. Wiley — Chapter 9 (LGD modelling)
