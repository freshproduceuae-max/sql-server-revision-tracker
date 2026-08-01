# M31 — Portfolio Risk Management

## 1. Business Purpose

Portfolio risk management is the discipline of understanding and controlling credit risk at the aggregate level — across all obligors, sectors, geographies, and products — rather than managing individual loans in isolation. A bank may have hundreds of individually sound credit decisions that collectively create dangerous concentrations or correlations.

The central insight is that **diversification reduces unexpected loss**. A portfolio of 1,000 loans to uncorrelated borrowers in different sectors and geographies will experience far more predictable, stable losses than a concentrated portfolio of 10 large loans in a single sector. The bank can price risk more accurately, hold less capital, and survive economic shocks more comfortably with a diversified portfolio.

**Why portfolio management matters:**

*Concentration risk* is the primary credit portfolio risk. A bank with 40% of its corporate loan book in commercial real estate (CRE) is highly vulnerable to a property market downturn. If CRE prices fall 30%, that bank faces a crisis while a more diversified bank survives comfortably. The 2008 financial crisis created catastrophic losses in banks with concentrated mortgage and CRE exposures.

*Correlation* amplifies losses. In a recession, borrowers in related industries default simultaneously — automotive manufacturers, auto parts suppliers, and car dealerships all fail together. A portfolio that looked diversified by obligor count was actually highly correlated through supply chain linkages.

*Unexpected loss management* is the core function of economic capital. The Expected Loss (EL) is the average annual loss the bank expects — it is priced into interest rates and provisioned through ECL. The Unexpected Loss (UL) is the deviation around that average — it requires capital. Portfolio management's job is to minimise UL for a given level of EL, or equivalently to maximise return on economic capital.

*Limit frameworks* translate risk appetite into operational constraints. The Board approves a risk appetite statement that includes portfolio limits: "No more than 25% of corporate EAD in CRE," "No single obligor exposure >10% of CET1 capital," "Commercial property concentration not to exceed 15% of total lending." The Portfolio Risk team monitors these limits and gates new business.

*Senior management and Board reporting* requires aggregation of individual credit decisions into portfolio metrics: total EAD, EL, UL, economic capital consumption, concentration metrics, limit utilisation, pipeline credit quality. This reporting enables strategic decisions about growing or shrinking sectors.

---

## 2. Accounting Concepts

**Expected Credit Loss (ECL) — Portfolio Perspective**

Under IFRS 9, ECL is calculated facility-by-facility, but it is reported at the portfolio level in financial statements. The total ECL provision on the balance sheet represents the probability-weighted future credit losses across the entire portfolio. The P&L charge is the movement in this provision.

Portfolio ECL monitoring requires tracking:
- **Stage distribution**: What proportion of the book is Stage 1 / 2 / 3? A deteriorating portfolio shows migration from Stage 1 to Stage 2 before defaults appear in Stage 3.
- **Coverage ratio**: ECL allowance / Gross carrying amount. Low coverage ratios in deteriorating economic environments are a warning sign.
- **ECL by segment**: Which sectors/products carry the most ECL? This highlights where the bank has the most credit risk.

**Large Exposure Reporting (FINREP/COREP)**

Under EU CRR and UK CRR (retained EU law), banks must report large exposures — any single counterparty or group of connected counterparties where the exposure exceeds 10% of Tier 1 capital. The regulatory limit is 25% of Tier 1 capital. These are reported quarterly in the COREP LE (Large Exposures) templates submitted to the PRA.

**Accounting for Sector Concentration in Disclosures**

IFRS 7 para 34 requires banks to disclose credit risk concentrations — typically by sector, geography, and product. Annual Reports include tables of gross carrying amounts by Basel asset class and geographic region. Analysts use these disclosures to assess portfolio concentration risk independently.

---

## 3. Financial Concepts

**Expected Loss (EL)**

EL = EAD × PD × LGD

EL is the average annual loss the bank expects from its portfolio. It is the "cost of doing business" in credit and is incorporated into loan pricing (the credit spread covers the EL). Banks provision for EL under IFRS 9.

**Unexpected Loss (UL) and Economic Capital**

UL = Standard deviation of portfolio losses around EL. Unlike EL, UL cannot be diversified away at the portfolio level (systematic risk remains). Economic capital = the capital needed to absorb UL at a chosen confidence level (typically 99.9% — the same confidence level used in the Basel IRB formula).

```
Economic Capital (EC) = Value at Risk (VaR) at 99.9% - EL
```

The bank must hold sufficient regulatory capital to absorb unexpected losses. Economic capital is the internal estimate of this need; regulatory capital (RWA-based) is the regulatory minimum.

**Vasicek Single-Factor Model**

The Vasicek (2002) model is the foundation of the Basel IRB capital formula and is widely used in portfolio credit risk. Key assumptions:
- Each borrower's asset value follows a standard normal distribution
- Defaults occur when asset value falls below a threshold (PD-based)
- A single common factor (ρ^0.5 × M) drives correlation across borrowers (M = systematic risk factor)
- Idiosyncratic risk (firm-specific) is diversified away in large portfolios

The loss distribution in the Vasicek model is:

```
VaR(q) = LGD × N[ (G(PD) - √ρ × G(q)) / √(1-ρ) ]
```

Where:
- G() = inverse standard normal CDF
- ρ = asset correlation (systematic risk fraction)
- q = confidence level (0.999 for Basel)
- N[] = standard normal CDF

This formula is exactly what Basel uses to derive IRB risk weights. A higher ρ means obligors are more correlated (driven more by the common economic factor), resulting in higher UL and higher capital requirements.

**CreditMetrics**

CreditMetrics (JP Morgan, 1997) extends Vasicek by modelling the full distribution of portfolio value changes due to both defaults and credit migration (upgrades/downgrades). Key inputs: transition matrix (probability of moving between rating grades), credit spreads by rating grade (to mark-to-market migration events), and correlations. CreditMetrics generates the full credit VaR distribution, not just the 99.9th percentile.

**KMV Model (Merton-based)**

KMV (now Moody's Analytics) applies the Merton (1974) structural model to market data. It uses equity prices and market capitalisation to estimate the market value of assets and asset volatility, then derives the "Distance to Default" (DD) and maps it to an "Expected Default Frequency" (EDF). KMV is a market-based, real-time PD model used primarily for traded corporates.

**Credit VaR**

Credit VaR = Portfolio loss at confidence level q minus Expected Loss.
```
Credit VaR(q) = L(q) - EL
```
Credit VaR measures the unexpected credit loss at a given confidence level. At 99.9%, it represents the loss level that would only be exceeded once in 1,000 years — the level that regulatory capital must be able to absorb.

**Diversification Benefit**

The sum of individual economic capitals exceeds the portfolio-level economic capital because individual EC calculations assume no diversification. The diversification benefit is:

```
Diversification Benefit = Σ(Individual ECs) - Portfolio EC
```

For a well-diversified portfolio, the diversification benefit can reduce capital requirements by 20-40%. Concentration increases this benefit (or reduces it), making the portfolio more "stand-alone" risky.

---

## 4. Statistical Concepts

**Asset Correlation**

Asset correlation (ρ) is the correlation between the standardised asset returns of two borrowers. In the Vasicek model, all pairwise correlations are equal (equicorrelation). In practice, correlations are higher within industries and geographies. Basel uses prescribed asset correlations by asset class (corporate: 12-24%, retail: 3-16%).

Empirical estimation of asset correlation is difficult because asset values are not directly observable (firms are not all publicly traded). Proxy methods include:
- Equity return correlation (observable but noisier than asset correlation)
- Default rate correlation across industries/geographies (aggregated data)
- Distance-to-default correlation from KMV

**Monte Carlo Simulation for Credit Portfolio**

Since the credit loss distribution is non-normal (fat left tail, high skewness), Monte Carlo simulation is the most flexible approach:
1. Simulate the common factor M ~ N(0,1) (macro environment)
2. For each obligor i: simulate idiosyncratic factor εi ~ N(0,1)
3. Asset return: Ai = √ρ × M + √(1-ρ) × εi
4. Obligor defaults if Ai < G(PDi) (threshold)
5. Loss from defaults: Σ EADi × LGDi [summed over defaulters]
6. Repeat 100,000+ times to build loss distribution
7. Read off VaR(99.9%) and CVaR/ES as capital metrics

**Expected Shortfall (ES) / CVaR**

CVaR (Conditional Value at Risk) = Expected loss conditional on loss exceeding VaR:
```
CVaR(q) = E[L | L > VaR(q)]
```
ES is preferred to VaR for capital measurement because it is sub-additive (respects diversification) and captures the shape of the tail beyond VaR, not just the threshold. Basel IV (FRTB) moved market risk capital from VaR to ES; credit risk capital has not yet formally moved, but internal models often use ES.

**Granularity Adjustment**

The Vasicek model assumes an infinitely granular portfolio (no obligor is large enough to matter individually). In practice, large single-name exposures add idiosyncratic risk that is not diversified away. The granularity adjustment adds capital for large concentration risk:

```
GA = (1/2n) × Σ [ wi² × σ²i / VaR ]
```

Where wi = EAD weight of obligor i, n = number of obligors, σi = individual loss standard deviation.

---

## 5. Regulatory Framework

**Large Exposure Limits — EU CRR Art. 395 (retained in UK CRR)**

Article 395 of CRR states that an institution shall not incur exposure to a client or group of connected clients if the value exceeds 25% of Tier 1 capital (previously eligible capital). This applies after credit risk mitigation. The 25% limit reflects the regulatory view that no single failure should threaten the institution's solvency.

Key points:
- "Group of connected clients" means two or more entities where one controls the other, or both are controlled by the same party, or financial difficulty of one would cause financial difficulty of the other (contagion test)
- Intra-group exposures between prudentially consolidated entities are exempt
- Exposures to central governments, central banks, and EU institutions are generally exempt
- Breaches must be reported immediately to the PRA/NCA and remediation plan submitted

**CRR Art. 400 — Exemptions**

Certain exposures are exempt from the 25% limit or are given preferential treatment: covered bonds, exposures to recognised exchanges, trade finance exposures with short maturities.

**PRA Supervisory Statement SS8/13 — Intra-Group Large Exposure Limits**

Covers the treatment of intra-group exposures and expectations for large exposure governance.

**EBA Guidelines on Connected Clients (EBA/GL/2017/15)**

Defines how to identify groups of connected clients for large exposure purposes, including the "contagion test" that can link economically dependent borrowers (e.g., a supplier that derives 90%+ revenue from one customer).

**Concentration Risk — ICAAP**

The PRA expects banks to assess concentration risk explicitly in their ICAAP. The assessment should cover: single-name concentration (Herfindahl-Hirschman Index or top-10 exposure analysis), sector concentration, geographic concentration, and product concentration. Capital add-ons under Pillar 2A are often set partly in response to concentration risk not captured in Pillar 1.

---

## 6. Data Required

**Portfolio-Level Credit Data**
- EAD by obligor, facility, segment, sector (SIC/NACE code), geography (country, region), product type
- PD, LGD, maturity for each facility (from rating models or Basel IRB system)
- Current stage (IFRS 9) and rating grade
- Collateral type and value (for LGD and large exposure calculation)
- Group/connected client linkages (for large exposure aggregation)

**Historical Data for Model Calibration**
- Default rate time series by segment (minimum 5-7 years; ideally a full credit cycle)
- Recovery rate time series (for LGD calibration)
- Asset/equity return correlations (from Bloomberg/Refinitiv for listed obligors)

**Limit and Threshold Data**
- Approved portfolio limits by sector, geography, product (from risk appetite statement)
- Single-name large exposure limits
- Pipeline data (approved but not yet drawn commitments)

**Market Data (for KMV/CreditMetrics)**
- Equity prices and market caps (Bloomberg)
- Bond spreads by rating grade (ICE BofA, Markit iBoxx)
- CDS spreads for large single-name exposures

---

## 7. How Analysts Actually Work

**Portfolio Monitoring and Reporting**

Each month, the Portfolio Risk team produces a portfolio risk report for the Credit Risk Committee (CRC) and quarterly for the Board Risk Committee. This report typically covers:
- Total EAD and movement from prior month (growth/shrinkage by sector)
- Top 10/20/50 single-name exposures and their ratings
- Sector concentration heatmap (EAD and EL by sector vs. limits)
- Stage 2 and Stage 3 migration trends
- Large exposure limit utilisation
- Pipeline quality (average PD of new business approved in the month)

**New Business Pipeline Management**

Every new credit approved contributes to portfolio limits. Before a credit committee approves a large new facility, the Portfolio Risk team checks: Does this breach any sector limit? Does this push the large exposure over 25% of Tier 1? Does this worsen geographic concentration? If limits are close to breach, the portfolio team may recommend declining the credit or requiring risk transfer (syndication, credit insurance) as a condition.

**Concentration Risk Management in Practice**

When a sector limit is approaching, the Portfolio Risk team alerts the credit team: "CRE exposure is at 92% of the sector limit. All new CRE credits above £5m require sign-off from the Chief Risk Officer." This creates a natural gating mechanism that slows new business in concentrated sectors before limits are breached.

**Risk Transfer Tools**

When concentration limits are breached or imminent, banks use risk transfer: credit default swaps (CDS) to hedge single-name risk, synthetic securitisation (portfolio CDS) to transfer portfolio tail risk, traditional syndication (sell down participations), or loan sales in the secondary market.

---

## 8. Excel Implementation

**Portfolio Risk Dashboard**

**Sheet 1: Portfolio EAD by Sector**
```
Sector              EAD (£m)   % of Total  EL (£m)   EL Rate   Limit(£m)  Util%
CRE                 1,200        18%          48        4.0%      1,500      80%
Manufacturing         850        13%          25        2.9%      1,000      85%
Retail Trade          620         9%          31        5.0%        750      83%
TMT                   580         9%          12        2.1%        800      73%
Healthcare            420         6%          8         1.9%        600      70%
Other                2,830        45%          71        2.5%          -        -
TOTAL               6,500       100%         195        3.0%          -        -
```

**Sheet 2: HHI Concentration Calculation**
```
HHI = Σ (Si²)   where Si = EAD_sector / EAD_total

For 10 sectors with EAD shares [18%, 13%, 9%, 9%, 6%, 6%, 5%, 5%, 5%, 24%]:
HHI = 0.18² + 0.13² + 0.09² + ... = 0.0324 + 0.0169 + ... = 0.1042

Interpretation:
HHI < 0.15   = reasonably diversified
HHI 0.15-0.25 = moderate concentration
HHI > 0.25   = high concentration

Equivalent number of equal-sized exposures = 1/HHI = 9.6 sectors
```

**Sheet 3: Economic Capital Calculation (Vasicek)**
```
For each segment:
  Input PD, LGD, EAD, asset correlation ρ
  EC = EAD × LGD × [N((G(PD) + √ρ × G(0.999)) / √(1-ρ)) - PD]

=EAD * LGD * (NORM.S.DIST(
    (NORM.S.INV(PD) + SQRT(rho)*NORM.S.INV(0.999)) / SQRT(1-rho),
    TRUE) - PD)
```

**Sheet 4: Diversification Benefit**
```
Stand-alone EC (sum): £XXXm   [sum of segment ECs]
Portfolio EC:         £XXXm   [from correlated simulation]
Diversification:      £XXXm   [difference]
Diversification %:     XX%
```

---

## 9. SQL Implementation

```sql
-- =================================================================
-- Portfolio Risk: Concentration Metrics, EL, and Limit Monitoring
-- =================================================================

-- 1. HHI Concentration Index by Sector
WITH sector_ead AS (
    SELECT
        sector_code,
        sector_name,
        SUM(ead)           AS sector_ead,
        SUM(ead * pd * lgd) AS sector_el
    FROM portfolio_facilities
    WHERE facility_status = 'ACTIVE'
    GROUP BY sector_code, sector_name
),
total_ead AS (
    SELECT SUM(sector_ead) AS total FROM sector_ead
),
hhi_components AS (
    SELECT
        s.sector_code,
        s.sector_name,
        s.sector_ead,
        s.sector_el,
        t.total,
        s.sector_ead / t.total                    AS share,
        POWER(s.sector_ead / t.total, 2)          AS share_squared
    FROM sector_ead s
    CROSS JOIN total_ead t
)
SELECT
    sector_code,
    sector_name,
    ROUND(sector_ead / 1e6, 1)            AS ead_mm,
    ROUND(share * 100, 1)                  AS pct_of_total,
    ROUND(sector_el / 1e6, 2)             AS el_mm,
    ROUND(sector_el / sector_ead * 100, 2) AS el_rate_pct,
    ROUND(share_squared, 6)               AS hhi_component,
    (SELECT ROUND(SUM(share_squared), 4) FROM hhi_components) AS portfolio_hhi
FROM hhi_components
ORDER BY sector_ead DESC;


-- 2. Large Exposure Monitoring
WITH tier1_capital AS (
    SELECT capital_amount AS tier1
    FROM regulatory_capital
    WHERE capital_tier = 'CET1_T1'
      AND report_date = (SELECT MAX(report_date) FROM regulatory_capital)
),
connected_client_groups AS (
    -- Aggregate exposures by connected group
    SELECT
        g.group_id,
        g.group_name,
        SUM(f.ead_post_crm)               AS group_ead,  -- post credit risk mitigation
        COUNT(DISTINCT f.obligor_id)       AS entity_count,
        MAX(f.pd)                          AS max_pd,
        STRING_AGG(f.obligor_name, ', ')   AS members
    FROM portfolio_facilities f
    JOIN connected_client_mapping g ON g.obligor_id = f.obligor_id
    WHERE f.facility_status = 'ACTIVE'
    GROUP BY g.group_id, g.group_name
),
large_exposure_check AS (
    SELECT
        ccg.group_id,
        ccg.group_name,
        ccg.group_ead,
        ccg.entity_count,
        ccg.max_pd,
        t.tier1,
        ccg.group_ead / t.tier1                   AS tier1_pct,
        CASE
            WHEN ccg.group_ead / t.tier1 >= 0.25  THEN 'BREACH — REMEDIATE IMMEDIATELY'
            WHEN ccg.group_ead / t.tier1 >= 0.20  THEN 'WARNING — approaching limit'
            WHEN ccg.group_ead / t.tier1 >= 0.10  THEN 'REPORTABLE — large exposure'
            ELSE 'OK'
        END AS limit_status
    FROM connected_client_groups ccg
    CROSS JOIN tier1_capital t
)
SELECT
    group_name,
    ROUND(group_ead / 1e6, 1)       AS ead_mm,
    ROUND(tier1_pct * 100, 1)        AS pct_of_tier1,
    entity_count,
    ROUND(max_pd * 100, 2)           AS max_pd_pct,
    limit_status
FROM large_exposure_check
WHERE tier1_pct >= 0.10  -- only reportable large exposures
ORDER BY tier1_pct DESC;


-- 3. Portfolio EL, UL, and Economic Capital (Vasicek-based)
-- Note: SQL lacks NORM.S.INV; these are approximate or use stored proc
WITH vasicek_calc AS (
    SELECT
        segment,
        SUM(ead)              AS total_ead,
        -- EL
        SUM(ead * pd * lgd)   AS expected_loss,
        -- Simplified EC approximation (actual needs NORM.S.INV function)
        -- EC = EAD × LGD × (VaR_99.9_loss_rate - PD)
        -- Using Basel IRB K formula approximation:
        SUM(
            ead * lgd * (
                0.999 * pd  -- simplified; replace with proper Vasicek formula in prod
            )
        )                     AS ec_approx
    FROM portfolio_facilities
    WHERE facility_status = 'ACTIVE'
    GROUP BY segment
)
SELECT
    segment,
    ROUND(total_ead / 1e6, 0)         AS ead_mm,
    ROUND(expected_loss / 1e6, 1)     AS el_mm,
    ROUND(expected_loss / total_ead * 100, 2) AS el_rate_pct,
    ROUND(ec_approx / 1e6, 1)         AS ec_approx_mm,
    ROUND(ec_approx / total_ead * 100, 2)     AS ec_density_pct
FROM vasicek_calc
ORDER BY ec_approx DESC;
```

---

## 10. Python Implementation

```python
"""
M31 Portfolio Risk — Monte Carlo Credit Portfolio Simulation
Simulates the credit loss distribution for a diversified corporate portfolio
using the Vasicek single-factor model.
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy.stats import norm
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)


# ─────────────────────────────────────────────────────────────
# 1. DEFINE PORTFOLIO
# ─────────────────────────────────────────────────────────────
# Simulate a portfolio of 500 corporate loans across 5 sectors
N_OBLIGORS = 500
N_SIMULATIONS = 100_000

# Obligor parameters (normally these come from IRB rating system)
sectors = {
    'CRE':          {'pd': 0.025, 'lgd': 0.35, 'rho': 0.20, 'share': 0.20},
    'Manufacturing':{'pd': 0.015, 'lgd': 0.40, 'rho': 0.18, 'share': 0.18},
    'Retail':       {'pd': 0.030, 'lgd': 0.45, 'rho': 0.15, 'share': 0.15},
    'TMT':          {'pd': 0.012, 'lgd': 0.55, 'rho': 0.16, 'share': 0.15},
    'Healthcare':   {'pd': 0.008, 'lgd': 0.30, 'rho': 0.12, 'share': 0.12},
    'Other':        {'pd': 0.018, 'lgd': 0.40, 'rho': 0.15, 'share': 0.20},
}

# Build obligor list
portfolio = []
obligor_id = 0
for sector_name, params in sectors.items():
    n_sec = int(N_OBLIGORS * params['share'])
    for _ in range(n_sec):
        # Random EAD between £0.5m and £50m (log-normal)
        ead = np.exp(np.random.normal(np.log(5), 0.8)) * 1e6
        portfolio.append({
            'obligor_id': obligor_id,
            'sector': sector_name,
            'ead': ead,
            'pd': params['pd'],
            'lgd': params['lgd'],
            'rho': params['rho'],
        })
        obligor_id += 1

df = pd.DataFrame(portfolio)
total_ead = df['ead'].sum()

print(f"Portfolio: {len(df)} obligors, Total EAD: £{total_ead/1e9:.2f}bn")
print(df.groupby('sector').agg(
    n=('obligor_id', 'count'),
    ead_m=('ead', lambda x: f"£{x.sum()/1e6:.0f}m"),
    avg_pd=('pd', lambda x: f"{x.mean()*100:.2f}%"),
).to_string())


# ─────────────────────────────────────────────────────────────
# 2. EXPECTED LOSS (ANALYTICAL)
# ─────────────────────────────────────────────────────────────
df['el'] = df['ead'] * df['pd'] * df['lgd']
total_el = df['el'].sum()
print(f"\nExpected Loss: £{total_el/1e6:.1f}m ({total_el/total_ead*100:.2f}%)")


# ─────────────────────────────────────────────────────────────
# 3. VASICEK ANALYTICAL VaR (per obligor, then sum — conservative)
# ─────────────────────────────────────────────────────────────
def vasicek_var(pd, lgd, ead, rho, q=0.999):
    """Single-obligor Vasicek VaR — used for stand-alone EC calculation."""
    if pd <= 0 or pd >= 1:
        return 0
    threshold = norm.ppf(pd)
    conditional_pd = norm.cdf(
        (threshold - np.sqrt(rho) * norm.ppf(q)) / np.sqrt(1 - rho)
    )
    return ead * lgd * conditional_pd

df['stand_alone_ec'] = df.apply(
    lambda r: vasicek_var(r['pd'], r['lgd'], r['ead'], r['rho']) - r['el'],
    axis=1
)
sum_stand_alone_ec = df['stand_alone_ec'].sum()


# ─────────────────────────────────────────────────────────────
# 4. MONTE CARLO SIMULATION (portfolio-level, captures diversification)
# ─────────────────────────────────────────────────────────────
print(f"\nRunning Monte Carlo: {N_SIMULATIONS:,} simulations...")

obligors = df.to_dict('records')
n = len(obligors)
pds  = np.array([o['pd']  for o in obligors])
lgds = np.array([o['lgd'] for o in obligors])
eads = np.array([o['ead'] for o in obligors])
rhos = np.array([o['rho'] for o in obligors])

default_thresholds = norm.ppf(pds)  # pre-compute

portfolio_losses = np.zeros(N_SIMULATIONS)

# Vectorised simulation
# Shape: (N_SIMS, N_OBLIGORS) — but this requires ~500M entries, use chunked approach
CHUNK = 1000
for chunk_start in range(0, N_SIMULATIONS, CHUNK):
    chunk_size = min(CHUNK, N_SIMULATIONS - chunk_start)

    # Common factor M ~ N(0,1) for each simulation in chunk
    M = np.random.standard_normal((chunk_size, 1))

    # Idiosyncratic factor Z ~ N(0,1) for each obligor in each simulation
    Z = np.random.standard_normal((chunk_size, n))

    # Asset return A = sqrt(rho)*M + sqrt(1-rho)*Z
    A = np.sqrt(rhos) * M + np.sqrt(1 - rhos) * Z  # (chunk_size, n)

    # Default indicator: A < threshold
    defaults = (A < default_thresholds).astype(float)  # (chunk_size, n)

    # Portfolio loss = sum of EAD × LGD for defaulters
    losses = defaults @ (eads * lgds)  # (chunk_size,)
    portfolio_losses[chunk_start:chunk_start + chunk_size] = losses

print("Simulation complete.")


# ─────────────────────────────────────────────────────────────
# 5. LOSS DISTRIBUTION METRICS
# ─────────────────────────────────────────────────────────────
quantiles = [0.950, 0.990, 0.995, 0.999, 0.9999]
portfolio_var = {q: np.quantile(portfolio_losses, q) for q in quantiles}

# CVaR / ES at 99.9%
q999_threshold = portfolio_var[0.999]
cvar_999 = portfolio_losses[portfolio_losses > q999_threshold].mean()

portfolio_ec = portfolio_var[0.999] - total_el
diversification_benefit = sum_stand_alone_ec - portfolio_ec

print("\n" + "=" * 60)
print("CREDIT PORTFOLIO LOSS DISTRIBUTION")
print("=" * 60)
print(f"Total EAD:                    £{total_ead/1e9:.2f}bn")
print(f"Expected Loss (EL):           £{total_el/1e6:.1f}m  ({total_el/total_ead*100:.2f}%)")
print(f"Loss Std Dev:                 £{portfolio_losses.std()/1e6:.1f}m")
print(f"VaR 95%:                      £{portfolio_var[0.950]/1e6:.1f}m")
print(f"VaR 99%:                      £{portfolio_var[0.990]/1e6:.1f}m")
print(f"VaR 99.5%:                    £{portfolio_var[0.995]/1e6:.1f}m")
print(f"VaR 99.9% (Basel level):      £{portfolio_var[0.999]/1e6:.1f}m")
print(f"CVaR/ES 99.9%:                £{cvar_999/1e6:.1f}m")
print(f"Portfolio EC (VaR-EL):        £{portfolio_ec/1e6:.1f}m")
print(f"")
print(f"Sum of Stand-alone ECs:       £{sum_stand_alone_ec/1e6:.1f}m")
print(f"Portfolio EC:                 £{portfolio_ec/1e6:.1f}m")
print(f"Diversification Benefit:      £{diversification_benefit/1e6:.1f}m  "
      f"({diversification_benefit/sum_stand_alone_ec*100:.0f}%)")
print(f"")
print(f"EC as % of EAD:               {portfolio_ec/total_ead*100:.2f}%")


# ─────────────────────────────────────────────────────────────
# 6. CONCENTRATION ANALYSIS
# ─────────────────────────────────────────────────────────────
sector_summary = df.groupby('sector').agg(
    ead=('ead', 'sum'),
    el=('el', 'sum'),
    ec=('stand_alone_ec', 'sum'),
).reset_index()
sector_summary['ead_share'] = sector_summary['ead'] / total_ead
hhi = (sector_summary['ead_share'] ** 2).sum()
print(f"\nHerfindahl-Hirschman Index (sector): {hhi:.4f}")
print(f"Equivalent equal-size sectors: {1/hhi:.1f}")
print(sector_summary.to_string(index=False))
```

---

## 11. Interview Questions

1. **"What is the difference between Expected Loss and Unexpected Loss?"**
   EL = average annual loss (EAD × PD × LGD), covered by pricing and provisions. UL = variability around EL (standard deviation of portfolio losses), covered by capital. Capital exists to absorb UL, not EL.

2. **"Explain the Vasicek single-factor model in plain English."**
   Every borrower's financial health is driven partly by a common economic factor (the business cycle) and partly by their own idiosyncratic circumstances. The correlation parameter ρ determines how much of the risk comes from the common factor. High ρ means borrowers move together (more tail risk); low ρ means they're more independent (more diversification).

3. **"What is Credit VaR and how does it differ from market risk VaR?"**
   Credit VaR is the unexpected portfolio credit loss at a chosen confidence level (typically 99.9%), measured over a 1-year horizon. Market risk VaR is typically at 99% confidence over 10 days. Credit losses are non-normally distributed (skewed, fat-tailed), making simulation approaches necessary rather than parametric VaR.

4. **"What is the large exposure limit under CRR, and what counts toward it?"**
   25% of Tier 1 capital. EAD post-CRM (after netting, collateral, guarantees) to a single counterparty or group of connected clients. Exceeding 10% of Tier 1 requires reporting; exceeding 25% requires immediate remediation.

5. **"What is a diversification benefit and why might a regulator not give you full credit for it?"**
   Diversification benefit = reduction in portfolio capital below sum of stand-alone capitals. Regulators may haircut diversification benefit because: (1) correlations increase in stress (diversification evaporates exactly when needed), (2) model uncertainty in estimated correlations, (3) systemic risk means you cannot diversify away all macro risk.

---

## 12. Common Mistakes

**Mistake 1: Treating EL as a risk metric**
EL is a cost, not a risk. It is known (on average) and priced into the margin. Risk is about UL — the deviation around EL. Portfolio management focuses on controlling UL through diversification and limits.

**Mistake 2: Ignoring intra-group concentration**
A bank might have 20 individual loans to companies that are all subsidiaries of the same parent group. Each looks fine individually, but the group exposure breaches the large exposure limit. CRR's connected clients definition (Art. 4(1)(39)) must be applied systematically.

**Mistake 3: Using equity correlations as asset correlations**
Equity correlations overstate asset correlations because equity is levered — small changes in asset values produce large changes in equity values. Merton's framework shows that asset correlations are systematically lower than equity correlations. Using equity correlations inflates UL and EC estimates.

**Mistake 4: Static portfolio assumption**
Portfolio models often freeze the portfolio at the assessment date. In practice, banks actively manage their portfolios (new lending, maturities, sales). Treating a 5-year stress scenario with a static balance sheet overstates loss because some loans would naturally mature or be repaid.

**Mistake 5: Not capturing sector-within-sector correlation**
A bank with 20% CRE exposure that is split 50/50 between prime London offices and secondary retail parks is less concentrated than one entirely in secondary retail parks. Sub-sector granularity in concentration analysis matters.

---

## 13. Case Studies

**Case Study 1: RBS and Single-Sector Concentration**
By 2007, RBS had built a CRE portfolio that represented roughly 30% of its corporate lending book. When CRE prices collapsed 40%+ in 2008-2009, the losses were catastrophic. A functioning portfolio limit framework would have capped CRE exposure at 15-20% of the book, preventing the build-up. The lesson: concentration limits must be enforced even when a sector is performing well, because concentrations are most dangerous when the sector looks healthy.

**Case Study 2: CreditMetrics Development at JP Morgan**
JP Morgan developed CreditMetrics in 1997 partly as an internal portfolio management tool. By quantifying credit migration risk (not just default risk), they could measure the economic cost of holding BBB credits that might be downgraded to BB. This enabled more sophisticated portfolio allocation decisions, hedging of migration risk through CDS, and better risk-adjusted pricing.

**Case Study 3: Granularity Risk — Syndicated Loans**
A mid-sized UK bank concentrated 35% of its wholesale portfolio in 8 large syndicated loans (each £50-100m). Despite apparent "diversification" across 8 different sectors, the idiosyncratic risk of each £80m loan was material — a single default would consume 15% of annual profits. The Basel granularity adjustment would add significant capital above the Vasicek diversification assumption. The lesson: obligor count matters for diversification; 8 large loans is NOT a diversified portfolio.

---

## 14. Iterative Reinforcement

**Week 1:** Calculate HHI for your bank's sector distribution using publicly available Annual Report data. Compare to peers.

**Week 2:** Download the Basel large exposures reporting template (COREP LE01-LE5). Map its fields to portfolio data you have access to.

**Week 3:** Implement the Vasicek VaR formula in Excel for a 5-segment portfolio. Vary ρ from 0.12 to 0.24 and observe the capital impact.

**Week 4:** Extend the Python Monte Carlo to add a "concentration test": what happens to VaR(99.9%) if the top 5 obligors default simultaneously regardless of the macro factor? Compare to diversified result.

---

## 15. Source Material

- Vasicek, O.: *Loan Portfolio Value* (Risk Magazine, December 2002) — the original single-factor model paper
- JP Morgan: *CreditMetrics Technical Document* (1997, freely available)
- Gupton, G., Finger, C., Bhatia, M.: *CreditMetrics™ — Technical Document* (J.P. Morgan, 1997)
- Basel Committee: *Studies on Credit Risk Concentration* (BCBS WP No. 15, 2006, bis.org)
- EU CRR Articles 387-403 (Large Exposures framework)
- EBA/GL/2017/15: Guidelines on connected clients (eba.europa.eu)
- McNeil, A., Frey, R., Embrechts, P.: *Quantitative Risk Management* (Princeton University Press, 2015) — Chapter 8 (Credit Risk)
- Bluhm, C., Overbeck, L., Wagner, C.: *Introduction to Credit Risk Modeling* (Chapman & Hall, 2010)
