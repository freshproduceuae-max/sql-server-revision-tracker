# M30 — Stress Testing

## 1. Business Purpose

Stress testing is the process of evaluating how a credit portfolio performs under hypothetical adverse economic conditions. Its core purpose is to ensure that a bank holds sufficient capital and provisions to survive a severe but plausible economic downturn without becoming insolvent or breaching regulatory minimums.

From a business standpoint, stress testing serves four distinct audiences:

**Regulators** require banks to demonstrate capital adequacy under stressed conditions. The Bank of England's Annual Cyclical Scenario (ACS) and the EBA/ECB stress test are mandatory exercises that directly influence Pillar 2 capital add-ons and supervisory assessments. Failure to pass the stress test — or producing implausible results — can trigger immediate supervisory action including forced recapitalisation.

**Senior management and the Board** use stress tests to understand portfolio vulnerabilities and set risk appetite. A well-designed stress test answers the question: "Which parts of our portfolio would hurt us most in a recession, and do we have enough capital and provisions to absorb those losses?" This informs strategic decisions such as sector limits, geographic diversification, and whether to grow or shrink specific portfolios.

**Treasury and Capital Management** use stressed capital ratios to plan capital issuance, dividend payments, and AT1/Tier 2 instrument structuring. If the stress test shows the CET1 ratio falling below the regulatory minimum plus buffer, Treasury must plan remediation actions.

**Credit risk officers** use internal stress tests to validate that individual obligor PD/LGD estimates are plausible under adverse conditions and to test the sensitivity of the ECL provision to macroeconomic assumptions. The IFRS 9 standard explicitly requires forward-looking information, making stress scenario incorporation a regulatory accounting requirement as well as a risk management tool.

Historically, the 2008 global financial crisis exposed the inadequacy of institution-level stress testing. Banks held insufficient capital because their internal stress tests were insufficiently severe. The regulatory response — through Basel III, the Dodd-Frank Act in the US, and the EBA stress test framework in Europe — mandated more rigorous, standardised, and transparent stress testing. The Bank of England introduced the ACS in 2014 following the FPC's assessment that UK banks were under-capitalised against severe but plausible tail events.

---

## 2. Accounting Concepts

**ECL Under IFRS 9 in Stress Scenarios**

IFRS 9 requires banks to incorporate forward-looking information and multiple economic scenarios into ECL measurement. Under paragraph 5.5.17, the ECL must reflect an "unbiased and probability-weighted amount determined by evaluating a range of possible outcomes." In practice, this means banks typically define three to five economic scenarios (base, upside, mild downside, severe downside, and sometimes a tail scenario) and weight them by probability.

The accounting entry for a stressed ECL calculation mirrors the standard ECL calculation:
- Dr. Impairment loss (P&L)
- Cr. Loan loss allowance (Balance Sheet)

Under stress testing for financial reporting purposes (e.g., IFRS 9 sensitivity disclosures in the Annual Report), banks must disclose the ECL sensitivity to changes in key assumptions. IFRS 7 paragraph 35G requires disclosure of the inputs, assumptions, and estimation techniques used in ECL calculations, including the quantitative effect of changing those assumptions.

**Stressed ECL vs. Base ECL**

The difference between stressed ECL and base ECL is sometimes called the "ECL sensitivity" or "downside ECL." This is a key disclosure in bank Annual Reports and a focus of auditor attention. If the severe downside scenario generates a stressed ECL 3x the base ECL, that signals significant model sensitivity and may prompt auditor or regulator scrutiny.

**Provision Coverage Ratio Under Stress**

Provision coverage ratio = Loan Loss Allowance / Non-Performing Loans. Under stress, both the numerator (provisions) and denominator (NPLs) change. Stress testing models must capture both dynamics: the flow of loans from Stage 1 to Stage 2 to Stage 3 (increasing NPLs) and the required ECL at each stage (increasing provisions). A bank whose coverage ratio deteriorates significantly under stress may be flagged by regulators as having inadequate provisioning conservatism.

**Deferred Tax Assets (DTAs)**

Under stress, banks often recognise DTAs on losses that can be carried forward for tax purposes. However, CET1 capital deductions apply to DTAs above certain thresholds (CRR Art. 36). In a severe stress scenario, large DTAs may be deducted from capital, compounding the capital impact. Stress testing models should account for this second-order effect.

---

## 3. Financial Concepts

**Satellite Models**

A satellite model is an econometric model that links macroeconomic variables (GDP growth, unemployment, property prices, interest rates) to credit risk parameters (PD, LGD). The term "satellite" reflects that these models orbit around the core macroeconomic model (e.g., Oxford Economics or Moody's Analytics) — they take macro outputs as inputs and translate them into credit risk metrics.

A typical corporate credit satellite model might specify:

```
log(PDt / (1 - PDt)) = α + β1 × GDP_growtht + β2 × Unemploymentt + β3 × Corporate_spread_indext + εt
```

Where PDt is the portfolio-level annual default rate, GDP growth and unemployment are contemporaneous or lagged macroeconomic variables, and the corporate spread index (e.g., iBoxx € High Yield Index spread) captures market credit conditions.

**Key stress testing financial concepts:**

*Stressed PD:* The through-the-cycle (TTC) PD used for regulatory capital is replaced or supplemented by a point-in-time (PIT) stressed PD that reflects the specific macro scenario. In a severe recession scenario (GDP -5%, unemployment +8%), the stressed PD for corporate exposures might be 3-5x the TTC PD.

*Stressed LGD:* LGD increases in stress because: (1) collateral values fall (property prices down 30-40%); (2) recovery rates from insolvency processes deteriorate as distressed asset sales saturate the market; (3) time to recovery lengthens, increasing the discounting effect. Stressed LGD for secured real estate exposures might increase from 25% (base) to 45% (severe stress).

*Stressed EAD:* Credit lines are drawn down as borrowers face liquidity stress. The Credit Conversion Factor (CCF) for undrawn commitments increases under stress. Regulatory CCFs (75% for revolving facilities under IRB) may understate actual drawdown in a recession.

*Net Interest Income (NII) Impact:* Stress testing also affects P&L through NII. In a rate-cut stress scenario, NII compresses. In a default stress scenario, non-accrual income (interest on NPLs stops accruing) reduces NII further.

**Reverse Stress Testing**

Reverse stress testing inverts the conventional approach: instead of asking "what happens to capital under scenario X?", it asks "what scenario would cause the bank to fail (breach regulatory minimum capital or become illiquid)?" The PRA requires all banks to conduct reverse stress testing under SYSC 20.

A reverse stress test might identify that the bank would breach its CET1 minimum if: GDP falls >8%, unemployment rises >12%, commercial real estate prices fall >45%, and the bank simultaneously loses access to wholesale funding. This scenario is deliberately extreme but the exercise forces management to think about combinations of risks, not just single-factor shocks.

---

## 4. Statistical Concepts

**Satellite Model Estimation**

Satellite models are typically estimated using OLS or logistic regression on historical data. A key challenge is the limited number of credit cycles in available data: UK banks may have reliable data back to the early 1990s recession, providing only 2-3 complete credit cycles. This limited sample creates model uncertainty (wide confidence intervals) that must be reflected in conservatism adjustments.

*Autocorrelation:* Default rates are serially correlated (a high default rate this year predicts a high default rate next year). OLS on time series data with autocorrelated residuals produces biased standard errors. Solutions include: HAC (Heteroskedasticity and Autocorrelation Consistent) standard errors (Newey-West), ARMA error structures, or panel data models that exploit cross-sectional variation.

*Multicollinearity:* GDP growth, unemployment, and credit spreads are highly correlated, especially in recessions. Including all three in a single regression produces inflated standard errors and unstable coefficient estimates. Solutions include: principal component analysis (PCA) to create uncorrelated macro factors, ridge regression, or stepwise model selection.

*Non-linearity:* The relationship between macro variables and default rates is non-linear. Default rates spike sharply in severe recessions but decline only gradually in recoveries (asymmetric cycle). Logistic transformation of PD (log-odds) partially addresses this, but threshold effects and regime-switching models may be appropriate for capturing tail behaviour.

**Scenario Probability Weighting**

IFRS 9 requires probability-weighted ECL. The weights assigned to stress scenarios are judgement-based but should be grounded in historical frequency analysis and forward-looking assessment. Common practice:
- Base scenario: 50-60% weight
- Upside scenario: 10-15% weight
- Mild downside: 20-25% weight
- Severe downside: 5-10% weight

The weighted average ECL = Σ(ECLi × wi), where wi are the scenario probabilities summing to 100%.

**Model Uncertainty and Conservatism**

EBA Guidelines on PD estimation (EBA/GL/2017/16) require that model uncertainty be addressed through conservative adjustments (MoC — Margin of Conservatism). In stress testing, additional MoC should be applied to satellite models to reflect: estimation uncertainty (limited data), structural breaks (the economy may behave differently in the stress scenario than historically), and model uncertainty (the satellite model structure may be misspecified).

---

## 5. Regulatory Framework

**Bank of England Annual Cyclical Scenario (ACS)**

The ACS is the Bank of England's main macroprudential stress test, run annually for major UK banks (the "ring of 7" plus additional firms). Key features:
- Scenario designed by the FPC/PRA to be "severe but plausible" — historically set at roughly 1-in-100-year severity
- Scenarios include: GDP shock, unemployment spike, property price falls (residential and commercial), global trade shock, and financial market stress (equity and bond price falls, FX moves, interest rate changes)
- 2023 ACS scenario: UK GDP -5%, unemployment +6.1pp to 8.5%, house prices -31%, CRE prices -45%
- Banks submit projected capital ratios, RWA, ECL, and NII over a 5-year stress horizon
- Results published publicly — a "pass/fail" based on whether projected CET1 stays above hurdle rate (4.5% minimum + 3.5% conversion trigger for AT1 bail-in)
- Outputs inform Pillar 2A capital add-on setting

**EBA/ECB Stress Test**

The EBA coordinates an EU-wide stress test every two years, covering the largest EU banks. Key differences from the ACS:
- Methodological constraints: Banks must apply EBA's prescribed methodology (static balance sheet assumption — no management actions)
- EBA prescribes the macro scenario; national competent authorities (NCAs) apply it
- No explicit pass/fail threshold published, but results inform SSM SREP and Pillar 2 Guidance (P2G)
- 2023 EBA stress test baseline: aligned to EU winter 2022 economic forecast; adverse: severe recession with simultaneous energy price spike and financial market disruption

**ICAAP (Internal Capital Adequacy Assessment Process)**

The ICAAP is the bank's own assessment of its capital adequacy, submitted to the PRA annually. It includes:
- Internal stress testing using bank-designed scenarios (must be at least as severe as regulatory scenarios)
- Capital planning over a 3-5 year horizon
- Assessment of all material risks (credit, market, liquidity, operational, conduct)
- Management actions under stress (capital raise, RWA reduction, dividend cut)
- The PRA reviews the ICAAP and sets Pillar 2A capital add-ons based on its assessment of adequacy

**PRA Supervisory Statement SS3/19 — Stress Testing**

SS3/19 sets out PRA expectations for internal stress testing, including: scenario design, model governance, results review and challenge, board oversight, and documentation standards.

---

## 6. Data Required

**Macroeconomic Data (Historical for model calibration)**
- GDP growth (quarterly, UK National Accounts — ONS series ABMI)
- Unemployment rate (quarterly, Labour Force Survey — ONS series MGSX)
- House Price Index (Halifax, Nationwide, or ONS UK HPI)
- Commercial Real Estate price index (MSCI/IPD UK Annual Property Index)
- Bank of England Base Rate
- IG and HY corporate bond spreads (ICE BofA indices)
- 3-month/10-year gilt yields (BoE Statistical Interactive Database)

**Portfolio Credit Data (Historical for model calibration)**
- Annual portfolio default rate by segment (corporate, SME, retail)
- Migration matrices (quarterly transitions between rating grades)
- LGD realisations (completed workout cases with recovery timeline)
- EAD at time of default (for CCF calibration)

**Stress Scenario Data (Provided by economists/Oxford Economics)**
- Forward projections of GDP, unemployment, HPI, CRE, rates under each scenario
- Typically 5-year projections at quarterly frequency
- May be sourced from Oxford Economics, Moody's Analytics, or BoE published ACS scenarios

**Credit Portfolio Data (Current, for stressed ECL calculation)**
- Current EAD by segment, geography, sector
- Current PD, LGD ratings for each facility
- Stage classification (Stage 1, 2, 3)
- Maturity profile
- Collateral type and value by facility

---

## 7. How Analysts Actually Work

Credit analysts typically contribute to stress testing in the following ways:

**Bottom-up portfolio inputs:** For large single-name exposures (typically >£25m), the credit analyst produces a bespoke stressed assessment: what happens to this specific obligor under the severe scenario? If the scenario involves a 30% fall in UK house prices, what is the LTV on the CRE loan to the shopping centre developer? Does this breach covenants? Could the borrower service debt with stressed revenue? This bottom-up analysis feeds into the Group Stress Testing function alongside top-down satellite model outputs.

**Sector stress analysis:** Credit analysts own specific sector portfolios. During stress test season (typically Q3-Q4 for the ACS submission), analysts produce sector stress memos: "Under the severe ACS scenario, the retail property sector faces [x]% increase in defaults, driven by [specific vulnerability]. Our 3 largest exposures total £Xm and are assessed as follows..."

**Collaboration with the Stress Testing Team:** The Group Stress Testing function (typically in Group Risk or Group Finance) runs the satellite models and aggregates results. Credit analysts provide qualitative overlays and challenge: "The model shows corporate default rates doubling, but in this sector we think they'd triple because of the specific supply chain dynamics." These management overlays must be documented and justified.

**ICAAP Credit Input:** Each year, credit risk produces a credit risk section for the ICAAP, including: current portfolio quality, sector concentrations, stress test results, ECL sensitivity, and management actions that would be available (tightening new business criteria, withdrawing credit lines, increasing pricing).

**Practical timeline:** The ACS typically runs January-June with submission to the BoE in late summer. Banks start scenario translation (macro to credit parameters) in Q1, run models in Q2, produce overlays and management review in late Q2/early Q3.

---

## 8. Excel Implementation

**Stressed ECL Calculator**

Structure the workbook with these sheets:

**Sheet 1: Macro Scenarios**
```
         Base    Mild Down  Severe Down
GDP Yr1   1.5%    -1.0%       -5.0%
GDP Yr2   1.8%    -0.5%       -3.5%
Unemp Y1  4.2%     5.5%        8.5%
Unemp Y2  4.1%     6.0%        9.5%
HPI Yr1   2.0%    -5.0%      -20.0%
HPI Yr2   2.5%    -8.0%      -15.0%
Prob      55%      30%         15%
```

**Sheet 2: Satellite Model Coefficients**
```
Segment: Corporate Mid-Market
Intercept (α):          -3.200
GDP coefficient (β1):   -0.180   [per 1% GDP growth]
Unemp coefficient (β2):  0.120   [per 1% unemployment]
Spread coefficient (β3): 0.004   [per 1bp spread widening]
```

**Sheet 3: Stressed PD Calculation**
```
=IFERROR(
  EXP(α + β1×GDP_Yr1 + β2×Unemp_Yr1) /
  (1 + EXP(α + β1×GDP_Yr1 + β2×Unemp_Yr1)),
  "ERROR")
```

**Sheet 4: Stressed LGD**
```
LGD_stressed = LGD_base × (1 + LGD_uplift_factor)
LGD_uplift_factor (CRE):
  Base:         0%
  Mild down:   20%   [property fall of 10%]
  Severe down: 60%   [property fall of 35%]
```

**Sheet 5: Stressed ECL Aggregation**
```
For each segment and scenario:
Stressed ECL = EAD × Stressed PD × Stressed LGD × Discount Factor

Weighted ECL = Σ (ECL_scenario × Probability_scenario)
ECL Sensitivity = Weighted ECL - Base ECL
```

**Sheet 6: Capital Ratio Under Stress**
```
CET1 Capital (start):     £10,000m
Less: Stressed ECL:       (£X,XXXm)
Less: Stressed NII loss:  (£X,XXXm)
Plus: Tax credit (28%):    £X,XXXm
Stressed CET1 Capital:    £X,XXXm

RWA (base):               £75,000m
RWA (stressed):           £XX,XXXm  [PD increase drives RWA up]
Stressed CET1 Ratio:      XX.X%
Minimum hurdle:            8.0%
Buffer above hurdle:       X.X%
```

---

## 9. SQL Implementation

```sql
-- =================================================================
-- Stressed ECL Calculation
-- =================================================================

-- Step 1: Macro scenario parameter table
CREATE TABLE stress_scenarios (
    scenario_id     VARCHAR(20) PRIMARY KEY,  -- 'BASE','MILD_DOWN','SEVERE_DOWN'
    scenario_name   VARCHAR(100),
    gdp_yr1         DECIMAL(6,3),
    gdp_yr2         DECIMAL(6,3),
    unemp_yr1       DECIMAL(6,3),
    unemp_yr2       DECIMAL(6,3),
    hpi_yr1         DECIMAL(6,3),
    hpi_yr2         DECIMAL(6,3),
    probability     DECIMAL(5,4)
);

-- Step 2: Satellite model coefficients by segment
CREATE TABLE satellite_model_params (
    segment         VARCHAR(50),
    intercept_alpha DECIMAL(10,6),
    beta_gdp        DECIMAL(10,6),
    beta_unemp      DECIMAL(10,6),
    beta_spread     DECIMAL(10,6),
    lgd_uplift_mild DECIMAL(5,4),
    lgd_uplift_sev  DECIMAL(5,4)
);

-- Step 3: Calculate stressed PD using satellite model
WITH scenario_pd AS (
    SELECT
        p.facility_id,
        p.segment,
        p.ead,
        p.current_pd,
        p.current_lgd,
        p.stage,
        s.scenario_id,
        s.probability,
        -- Logistic satellite model: PD = exp(α + β1*GDP + β2*Unemp) / (1 + exp(...))
        1.0 / (1.0 + EXP(-(
            m.intercept_alpha
            + m.beta_gdp    * s.gdp_yr1
            + m.beta_unemp  * s.unemp_yr1
        ))) AS stressed_pd,
        -- Stressed LGD: apply uplift based on scenario
        CASE s.scenario_id
            WHEN 'BASE'       THEN p.current_lgd
            WHEN 'MILD_DOWN'  THEN p.current_lgd * (1 + m.lgd_uplift_mild)
            WHEN 'SEVERE_DOWN'THEN p.current_lgd * (1 + m.lgd_uplift_sev)
        END AS stressed_lgd
    FROM portfolio p
    CROSS JOIN stress_scenarios s
    JOIN satellite_model_params m ON m.segment = p.segment
),

-- Step 4: Calculate ECL per facility per scenario
scenario_ecl AS (
    SELECT
        facility_id,
        scenario_id,
        probability,
        ead,
        stressed_pd,
        stressed_lgd,
        -- ECL = EAD × PD × LGD (simplified: 12-month for Stage 1, lifetime for Stage 2/3)
        ead * stressed_pd * stressed_lgd AS stressed_ecl_12m,
        ead * (1 - POWER(1 - stressed_pd, remaining_life)) * stressed_lgd
                                          AS stressed_ecl_lifetime
    FROM scenario_pd sp
    JOIN portfolio p ON p.facility_id = sp.facility_id
),

-- Step 5: Probability-weighted ECL
weighted_ecl AS (
    SELECT
        facility_id,
        SUM(
            CASE WHEN stage IN (2,3) THEN stressed_ecl_lifetime
                 ELSE stressed_ecl_12m END
            * probability
        ) AS weighted_ecl
    FROM scenario_ecl
    GROUP BY facility_id
),

-- Step 6: Portfolio-level aggregation by scenario for management reporting
portfolio_stress_summary AS (
    SELECT
        scenario_id,
        segment,
        SUM(ead)            AS total_ead,
        AVG(stressed_pd)    AS avg_stressed_pd,
        AVG(stressed_lgd)   AS avg_stressed_lgd,
        SUM(
            CASE WHEN stage IN (2,3) THEN stressed_ecl_lifetime
                 ELSE stressed_ecl_12m END
        )                   AS total_stressed_ecl
    FROM scenario_ecl se
    JOIN portfolio p ON p.facility_id = se.facility_id
    GROUP BY scenario_id, segment
)

SELECT
    scenario_id,
    segment,
    total_ead,
    ROUND(avg_stressed_pd * 100, 2)  AS stressed_pd_pct,
    ROUND(avg_stressed_lgd * 100, 2) AS stressed_lgd_pct,
    total_stressed_ecl,
    ROUND(total_stressed_ecl / total_ead * 100, 2) AS stressed_ecl_rate_pct
FROM portfolio_stress_summary
ORDER BY scenario_id, stressed_ecl_rate_pct DESC;
```

---

## 10. Python Implementation

```python
"""
M30 Stress Testing — Satellite Model & Stressed ECL Calculator
Builds a logistic satellite model linking GDP/unemployment to default rates.
"""

import numpy as np
import pandas as pd
from scipy.optimize import minimize
from scipy.special import expit  # logistic function
import matplotlib.pyplot as plt
import warnings
warnings.filterwarnings('ignore')


# ─────────────────────────────────────────────────────────────
# 1. SIMULATE HISTORICAL DATA (replace with actual data in prod)
# ─────────────────────────────────────────────────────────────
np.random.seed(42)
n_quarters = 80  # ~20 years of quarterly data

# Simulate macro variables (rough UK-like dynamics)
gdp_growth = np.concatenate([
    np.random.normal(0.4, 0.3, 60),   # normal times
    np.random.normal(-1.5, 0.8, 8),   # recession (2008-09)
    np.random.normal(0.3, 0.3, 12),   # recovery
])

unemployment = np.cumsum(np.where(gdp_growth < 0, 0.3, -0.1)) + 5.0
unemployment = np.clip(unemployment, 3.0, 12.0)

# True satellite model coefficients (to be estimated)
TRUE_ALPHA  = -3.5
TRUE_B_GDP  = -0.20
TRUE_B_UNEMP = 0.15
TRUE_NOISE  = 0.15

log_odds = TRUE_ALPHA + TRUE_B_GDP * gdp_growth + TRUE_B_UNEMP * unemployment
true_pd   = expit(log_odds)
observed_dr = np.clip(true_pd + np.random.normal(0, TRUE_NOISE, n_quarters), 0.001, 0.5)

hist_data = pd.DataFrame({
    'quarter':       pd.date_range('2005-01', periods=n_quarters, freq='QS'),
    'gdp_growth':    gdp_growth,
    'unemployment':  unemployment,
    'default_rate':  observed_dr,
})

print("Historical data sample:")
print(hist_data.tail())


# ─────────────────────────────────────────────────────────────
# 2. ESTIMATE SATELLITE MODEL (logistic regression via MLE)
# ─────────────────────────────────────────────────────────────
def negative_log_likelihood(params, X, y):
    """Bernoulli log-likelihood for logistic regression on continuous proportions."""
    alpha, b_gdp, b_unemp = params
    log_odds = alpha + b_gdp * X[:, 0] + b_unemp * X[:, 1]
    p = expit(log_odds)
    p = np.clip(p, 1e-8, 1 - 1e-8)
    # Use beta-distributed likelihood as proxy: L ≈ y*log(p) + (1-y)*log(1-p)
    ll = y * np.log(p) + (1 - y) * np.log(1 - p)
    return -np.sum(ll)


X = hist_data[['gdp_growth', 'unemployment']].values
y = hist_data['default_rate'].values

result = minimize(
    negative_log_likelihood,
    x0=[-3.0, -0.1, 0.1],
    args=(X, y),
    method='Nelder-Mead',
    options={'maxiter': 10000}
)

alpha_hat, b_gdp_hat, b_unemp_hat = result.x
print(f"\nSatellite Model Estimates:")
print(f"  Intercept (α):       {alpha_hat:.4f}  [true: {TRUE_ALPHA}]")
print(f"  GDP coefficient:     {b_gdp_hat:.4f}  [true: {TRUE_B_GDP}]")
print(f"  Unemployment coeff:  {b_unemp_hat:.4f}  [true: {TRUE_B_UNEMP}]")


def satellite_pd(gdp, unemp, alpha=alpha_hat, b_gdp=b_gdp_hat, b_unemp=b_unemp_hat):
    """Predict portfolio default rate given macro variables."""
    return expit(alpha + b_gdp * gdp + b_unemp * unemp)


# ─────────────────────────────────────────────────────────────
# 3. DEFINE STRESS SCENARIOS (5-year projection, annual)
# ─────────────────────────────────────────────────────────────
scenarios = {
    'Base': {
        'gdp':   [1.5, 1.8, 2.0, 2.0, 2.0],
        'unemp': [4.2, 4.1, 4.0, 4.0, 4.0],
        'hpi':   [2.0, 2.5, 3.0, 3.0, 3.0],
        'prob':  0.55,
        'color': 'green',
    },
    'Mild Downside': {
        'gdp':   [-1.0, -0.5, 0.5, 1.2, 1.5],
        'unemp': [5.5, 6.0, 5.8, 5.5, 5.2],
        'hpi':   [-5.0, -8.0, -4.0, 0.0, 1.0],
        'prob':  0.30,
        'color': 'orange',
    },
    'Severe Downside': {
        'gdp':   [-5.0, -3.5, 0.0, 1.0, 1.5],
        'unemp': [8.5, 9.5, 9.0, 8.5, 7.5],
        'hpi':   [-20.0, -15.0, -5.0, 0.0, 2.0],
        'prob':  0.15,
        'color': 'red',
    },
}

years = [1, 2, 3, 4, 5]

# ─────────────────────────────────────────────────────────────
# 4. COMPUTE STRESSED PD AND LGD FOR EACH SCENARIO/YEAR
# ─────────────────────────────────────────────────────────────
BASE_LGD         = 0.35
LGD_UPLIFT_MILD  = 0.20
LGD_UPLIFT_SEV   = 0.60
PORTFOLIO_EAD    = 5_000_000_000  # £5bn portfolio

results = {}
for sc_name, sc in scenarios.items():
    pds, lgds, ecls = [], [], []
    cumulative_hpi = 1.0
    for i in range(5):
        pd_yr = satellite_pd(sc['gdp'][i], sc['unemp'][i])
        cumulative_hpi *= (1 + sc['hpi'][i] / 100)
        hpi_fall = max(0, 1 - cumulative_hpi)

        if sc_name == 'Base':
            lgd_yr = BASE_LGD
        elif sc_name == 'Mild Downside':
            lgd_yr = BASE_LGD * (1 + LGD_UPLIFT_MILD * hpi_fall / 0.15)
        else:
            lgd_yr = BASE_LGD * (1 + LGD_UPLIFT_SEV * hpi_fall / 0.40)

        lgd_yr = min(lgd_yr, 0.90)
        ecl_yr = PORTFOLIO_EAD * pd_yr * lgd_yr

        pds.append(pd_yr)
        lgds.append(lgd_yr)
        ecls.append(ecl_yr)

    results[sc_name] = {'pds': pds, 'lgds': lgds, 'ecls': ecls, 'prob': sc['prob']}

# ─────────────────────────────────────────────────────────────
# 5. PROBABILITY-WEIGHTED ECL
# ─────────────────────────────────────────────────────────────
print("\n" + "=" * 65)
print("STRESS TEST RESULTS — 5-YEAR CUMULATIVE ECL")
print("=" * 65)

weighted_ecl_total = 0
for sc_name, res in results.items():
    cumulative_ecl = sum(res['ecls'])
    weighted_contribution = cumulative_ecl * res['prob']
    weighted_ecl_total += weighted_contribution

    print(f"\nScenario: {sc_name} (weight: {res['prob']*100:.0f}%)")
    print(f"  Yr1 PD: {res['pds'][0]*100:.2f}%  |  Yr1 LGD: {res['lgds'][0]*100:.1f}%")
    print(f"  Yr2 PD: {res['pds'][1]*100:.2f}%  |  Yr2 LGD: {res['lgds'][1]*100:.1f}%")
    print(f"  5-yr cumulative ECL: £{cumulative_ecl/1e6:,.0f}m")
    print(f"  ECL rate: {cumulative_ecl/PORTFOLIO_EAD*100:.2f}%")

print(f"\nProbability-weighted 5yr ECL: £{weighted_ecl_total/1e6:,.0f}m")
print(f"Weighted ECL rate:            {weighted_ecl_total/PORTFOLIO_EAD*100:.2f}%")

# ─────────────────────────────────────────────────────────────
# 6. CAPITAL IMPACT ANALYSIS
# ─────────────────────────────────────────────────────────────
CET1_START   = 600_000_000   # £600m starting CET1
RWA_BASE     = 4_000_000_000 # £4bn base RWA
TAX_RATE     = 0.25

print("\n" + "=" * 65)
print("CAPITAL IMPACT — SEVERE DOWNSIDE SCENARIO")
print("=" * 65)

severe = results['Severe Downside']
stressed_ecl_yr1 = severe['ecls'][0]
tax_benefit      = stressed_ecl_yr1 * TAX_RATE
# RWA increases as stressed PD increases (IRB formula sensitivity)
rwa_increase_factor = severe['pds'][0] / results['Base']['pds'][0]
stressed_rwa = RWA_BASE * rwa_increase_factor

stressed_cet1 = CET1_START - stressed_ecl_yr1 + tax_benefit
stressed_cet1_ratio = stressed_cet1 / stressed_rwa * 100
base_cet1_ratio     = CET1_START / RWA_BASE * 100

print(f"  Base CET1 ratio:      {base_cet1_ratio:.1f}%")
print(f"  Stressed ECL (Yr1):   £{stressed_ecl_yr1/1e6:,.0f}m")
print(f"  Tax benefit:          £{tax_benefit/1e6:,.0f}m")
print(f"  Stressed RWA:         £{stressed_rwa/1e9:,.1f}bn")
print(f"  Stressed CET1:        £{stressed_cet1/1e6:,.0f}m")
print(f"  Stressed CET1 ratio:  {stressed_cet1_ratio:.1f}%")
print(f"  Regulatory hurdle:    8.0%")
print(f"  Buffer / (breach):    {stressed_cet1_ratio - 8.0:+.1f}pp")
```

---

## 11. Interview Questions

**Technical questions:**

1. **"Walk me through how a satellite model works."**
   Expected answer: Explain the link from macro variables (GDP, unemployment) to credit risk parameters (PD, LGD) via an econometric model (typically logistic regression). Discuss calibration using historical data, and how the model is applied to forward-looking stress scenarios to produce stressed PD/LGD.

2. **"What is the difference between the ACS and the EBA stress test?"**
   Key differences: ACS is UK-only, annual, pass/fail with published results, dynamic balance sheet allowed. EBA is EU-wide, biennial, no explicit pass/fail, static balance sheet. Both inform Pillar 2 capital setting but through different mechanisms.

3. **"How does IFRS 9 require stress scenarios to be incorporated?"**
   Answer: Para 5.5.17 requires probability-weighted, forward-looking ECL. Banks must define multiple scenarios (base, upside, downside), assign probabilities, calculate ECL under each, and take the weighted average. Scenario weights and assumptions must be disclosed under IFRS 7.

4. **"What is reverse stress testing?"**
   Answer: Identifying the scenario that would cause the bank to fail (breach minimum capital or become illiquid), rather than asking what a given scenario does to capital. Required by PRA under SYSC 20. Forces management to think about combined risk events.

**Conceptual questions:**

5. **"Why is LGD higher in a stress scenario than in normal times?"**
   Answer: Collateral values fall (property prices down 30-40%), distressed asset markets become saturated depressing recovery rates, insolvency processes take longer (longer time to recovery increases discounting effect), and competition for buyers at forced sale is reduced.

6. **"What challenges arise in estimating satellite models?"**
   Answer: Limited credit cycles in historical data (model uncertainty), autocorrelation of default rates (biased standard errors if OLS used), multicollinearity of macro variables, non-linearity (default spikes asymmetrically in recessions), and the possibility of structural breaks.

---

## 12. Common Mistakes

**Mistake 1: Using TTC PD in stressed ECL calculations**
TTC (through-the-cycle) PD is designed to be stable across the cycle — it is appropriate for regulatory capital but NOT for stressed ECL. Stressed ECL requires a stressed PIT (point-in-time) PD reflecting the specific scenario. Using TTC PD understates stressed ECL.

**Mistake 2: Ignoring LGD stress**
Analysts focus on PD stress but forget that LGD also deteriorates in stress. In a severe recession with 40% CRE price falls, an LGD of 25% might increase to 45-50%. Ignoring LGD stress materially understates stressed ECL.

**Mistake 3: Double-counting management actions**
The EBA stress test uses a static balance sheet — no management actions assumed. In internal stress tests, management actions (reducing new lending, drawing capital) may be included, but they must be realistic and documented. Assuming aggressive management actions to inflate stressed capital ratios is a common audit finding.

**Mistake 4: Scenario that is too mild**
Regulators and auditors challenge whether internal stress scenarios are sufficiently severe. "Severe but plausible" should reflect at minimum a 1-in-25-year event. Using 2008 as the benchmark is now considered insufficient — regulators expect scenarios that combine multiple simultaneous stresses.

**Mistake 5: Not disclosing IFRS 9 scenario weights**
IFRS 7 requires disclosure of the scenarios used, their weights, and the ECL sensitivity. Failing to provide this disclosure, or providing it in insufficient detail, is a common audit finding.

---

## 13. Case Studies

**Case Study 1: 2008 GFC and Inadequate Stress Testing**
Pre-2008, major UK banks ran stress tests that assumed house price falls of 10-15%. Actual falls reached 20-25%, and in combination with a global liquidity crisis, several banks required government bailouts (RBS, HBOS). Post-crisis analysis showed that stress tests had used correlated scenarios from the same historical data period, understating tail correlations. The lesson: stress scenarios must be designed for unprecedented combinations of risks, not just a repeat of the last crisis.

**Case Study 2: ECB TRIM and LGD Underestimation**
During the ECB's Targeted Review of Internal Models (TRIM, 2016-2019), inspectors found systematic underestimation of LGD in stressed conditions. Several eurozone banks had calibrated LGD using data from 2010-2015 (a recovery period with rising collateral values) and applied insufficient downturn LGD adjustments. The ECB required banks to add conservatism overlays and increase LGD estimates, resulting in RWA increases averaging 15-20% for affected portfolios.

**Case Study 3: Silicon Valley Bank — Inadequate Stress Testing for Rate Risk**
SVB's 2023 collapse highlighted the interaction between stress testing and interest rate risk. SVB's credit stress tests were reasonably robust, but the bank had not adequately stress-tested the combination of rising interest rates (which eroded bond portfolio values) and concentrated depositor base (venture-backed tech companies) vulnerability. Reverse stress testing would have identified this scenario earlier.

---

## 14. Iterative Reinforcement

**Week 1 — Foundation**
1. Read the BoE's 2023 ACS results document (publicly available on bankofengland.co.uk)
2. Identify the three banks that came closest to the capital hurdle and understand why
3. Build the Excel stressed ECL calculator for a 3-segment portfolio (corporate, SME, retail)

**Week 2 — Satellite Model**
1. Download ONS GDP and unemployment data (Fred or ONS website)
2. Obtain historical bank default rates (BoE Credit Conditions Survey or SEC filings of US banks)
3. Estimate a simple OLS satellite model in Excel (scatter plot, trendline, R²)
4. Compare OLS coefficients to your Python logistic regression results

**Week 3 — Regulatory**
1. Read EBA/GL/2018/04 (Guidelines on stress testing)
2. Summarise the 5 key differences between ACS and EBA stress test
3. Draft a one-page "stress test results memo" for a hypothetical bank Board

**Week 4 — Mastery**
1. Add a reverse stress test module to your Python code: find the GDP/unemployment combination that reduces the stressed CET1 ratio below 8%
2. Critique a published bank's IFRS 9 scenario disclosures (e.g., Lloyds, Barclays Annual Report)
3. Role-play a Board presentation: explain the stressed ECL sensitivity and capital impact in plain English

---

## 15. Source Material

**Regulatory Publications**
- Bank of England: *Annual Cyclical Scenario* (published annually, bankofengland.co.uk)
- EBA: *EU-Wide Stress Test Methodology* (eba.europa.eu)
- PRA: *Supervisory Statement SS3/19 — Stress Testing* (bankofengland.co.uk/prudential-regulation)
- BCBS: *Principles for Sound Stress Testing Practices and Supervision* (2009, bis.org)
- EBA: *Guidelines on institutions' stress testing* (EBA/GL/2018/04)

**Accounting Standards**
- IFRS 9: *Financial Instruments* — Section 5.5 (Impairment), especially paras 5.5.17-5.5.20
- IFRS 7: *Financial Instruments: Disclosures* — paras 35F-35N

**Academic and Technical**
- Quagliariello, M. (ed.): *Stress-Testing the Banking System* (Cambridge University Press, 2009)
- Drehmann, M.: *Stress Tests: Objectives, Challenges and Modelling Choices* (BIS Quarterly Review, 2008)
- Peura, S. & Jokivuolle, E.: *Simulation Based Stress Tests of Banks' Regulatory Capital Adequacy* (Journal of Banking & Finance, 2004)

**Market Data Sources**
- Oxford Economics: Global Economic Model (subscription)
- Moody's Analytics: CreditCycle model
- BoE Statistical Interactive Database (FRED equivalent for UK): bankofengland.co.uk/statistics
- ONS: GDP (ABMI), Unemployment (MGSX), HPI (UK HPI)
