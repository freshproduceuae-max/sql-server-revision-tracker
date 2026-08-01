# M16 — IFRS 9 and Expected Credit Loss: The Three-Stage Model

---

## 1. Business Purpose

IFRS 9 "Financial Instruments", effective 1 January 2018, replaced the IAS 39 "incurred loss" model with an "expected credit loss" (ECL) model. The change was a direct regulatory response to the criticism that IAS 39 caused banks to recognise credit losses "too little, too late" during the 2008 financial crisis — provisions remained low in the boom years and then exploded precisely when banks were most stressed.

For a credit analyst in a commercial or corporate banking environment, IFRS 9 is not merely an accounting standard — it fundamentally changes how you originate loans, monitor portfolios, and explain P&L to stakeholders. Every lending decision has an immediate P&L impact on day of drawdown (day-1 provision), and every credit deterioration event triggers a provision increase before any actual loss is incurred.

### The IAS 39 Problem: Incurred Loss

Under IAS 39, a bank could only recognise a credit loss provision when there was "objective evidence of impairment" — a specific trigger event such as a missed payment, breach of covenant, or borrower distress. This meant:

1. During credit expansions, provisions were minimal (no trigger events)
2. When borrowers began to struggle, trigger events arrived in clusters during recessions
3. Provisions spiked just as the economy deteriorated — amplifying the credit cycle
4. Banks appeared well-capitalised until they were suddenly undercapitalised

The G20 Pittsburgh Summit (2009) explicitly instructed accounting standard setters to improve provisioning standards. IASB and FASB both developed forward-looking expected loss models, though they diverged: IFRS 9 uses a three-stage model; US GAAP adopted CECL (Current Expected Credit Loss) with a simpler full-lifetime ECL approach.

### Business Relevance

IFRS 9 affects credit analysts directly:

1. **Origination**: Every new loan triggers an immediate Stage 1 provision (12-month ECL). This reduces profit on day 1 and must be embedded in deal pricing.

2. **Monitoring**: Credit analysts must identify SICR (Significant Increase in Credit Risk) to trigger Stage 2 migration. This requires ongoing monitoring of rating grades, market indicators, and qualitative factors.

3. **Staging**: Stage 3 migration (credit-impaired) triggers lifetime ECL — often a step-change increase in provisions. Timing of staging decisions significantly affects P&L.

4. **Forward-looking**: ECL incorporates macroeconomic scenarios. An analyst who understands the economic inputs to ECL can explain why provisions change even for a performing portfolio during a recession.

5. **Regulatory interface**: IFRS 9 ECL interacts with Basel regulatory capital through the CET1 deduction for IRB EL shortfall. Understanding both frameworks prevents confusion between accounting provisions and regulatory capital.

---

## 2. Accounting Concepts

### Financial Instruments Scope Under IFRS 9

IFRS 9 impairment applies to:
- Financial assets measured at amortised cost (loans and advances, trade receivables, debt securities held to collect)
- Financial assets measured at fair value through other comprehensive income (FVOCI — debt instruments)
- Lease receivables (IFRS 16 cross-reference)
- Contract assets under IFRS 15 (revenue recognition)
- Loan commitments not measured at fair value through P&L
- Financial guarantee contracts (issued, not held)

Not in scope: equity instruments, derivatives, assets at FVTPL.

### The Three Business Model Tests

Before applying ECL, IFRS 9 requires classification based on:
1. **Business model test**: Hold to collect? Hold to collect and sell? Sell?
2. **Contractual cash flow test**: Are cash flows "solely payments of principal and interest" (SPPI)?

Only "hold to collect" SPPI instruments are measured at amortised cost with full ECL. Other classifications affect whether the ECL is presented in OCI or P&L.

### Amortised Cost and Effective Interest Rate

Loans at amortised cost are carried at:
```
Carrying Amount = Principal − Cumulative Repayments + Accrued Interest − Provision
```

The Effective Interest Rate (EIR) is the rate that exactly discounts estimated future cash flows to the gross carrying amount at initial recognition. EIR includes origination fees and transaction costs.

Under IFRS 9 Stage 3, interest income is calculated on the net carrying amount (after provision) rather than gross — this is the "unwinding of discount" on ECL, creating a different income recognition pattern from Stage 1/2.

### Provision Accounting Entries

**Day 1 — New loan originated (Stage 1)**:
```
Dr. Loans and Advances (amortised cost)        £10,000,000
    Cr. Cash / Deposit Account                                £10,000,000

Dr. ECL Provision Charge (P&L — Impairment)       £15,750
    Cr. Allowance for ECL (Balance Sheet)                         £15,750
```

**Stage 2 migration (performing, SICR triggered)**:
```
Dr. ECL Provision Charge (additional Stage 2 − Stage 1)     £X
    Cr. Allowance for ECL                                          £X
```

**Stage 3 migration (credit-impaired)**:
```
Dr. ECL Provision Charge (full lifetime ECL)       £Y
    Cr. Allowance for ECL                                    £Y
```

**Write-off (loss crystallised)**:
```
Dr. Allowance for ECL                        £Z
    Cr. Loans and Advances                          £Z
```

**Recovery post write-off**:
```
Dr. Cash                                     £W
    Cr. Recovery Income (P&L)                       £W
```

### Modified Financial Assets

When loan terms are renegotiated, IFRS 9 requires:
- Assess whether modification results in derecognition
- If retained: compute modification gain/loss = difference between new EIR cash flows and old carrying amount
- A borrower whose terms are modified to avoid default is presumed to be in Stage 2 unless evidence of cure

---

## 3. Financial Concepts

### The Three-Stage Model — Architecture

IFRS 9 paragraph 5.5.3 establishes:

**Stage 1 — Performing, No Significant Increase in Credit Risk Since Origination**
- Recognition: 12-month ECL
- Interest income: Based on gross carrying amount × EIR
- Definition: Instruments where credit risk has not significantly increased since initial recognition, or where credit risk is low at reporting date
- Default assumption: PD × LGD × EAD discounted over 12 months only

**Stage 2 — Performing, Significant Increase in Credit Risk (SICR) Since Origination**
- Recognition: Lifetime ECL
- Interest income: Based on gross carrying amount × EIR (not yet credit-impaired)
- SICR: The key judgement — has the PD increased significantly since origination?
- ECL covers all expected credit losses over the remaining contractual life of the instrument

**Stage 3 — Credit-Impaired (Objective Evidence of Impairment)**
- Recognition: Lifetime ECL
- Interest income: Based on NET carrying amount (gross − allowance) × EIR
- Triggers: 90 days past due (rebuttable presumption — IFRS 9 §5.5.11), distressed restructuring, bankruptcy, observable data indicating impairment

Retail portfolios may use a simplified approach for trade receivables < 12 months: always lifetime ECL without staging.

### SICR — The Stage 1 to Stage 2 Trigger

This is the most judgemental element of IFRS 9. IFRS 9 §5.5.9–5.5.10 requires assessment based on:

1. **Quantitative criteria**: Change in PD since origination exceeds a threshold
   - Absolute threshold: PD has increased by more than X percentage points (e.g., 0.5%)
   - Relative threshold: PD has more than doubled (e.g., 100% relative increase)
   - Industry practice: Use a combination — SICR if (PD_current > PD_origination × 2) AND (PD_current − PD_origination > 0.3%)

2. **Rating grade migration**: Internal credit rating has downgraded by a specified number of notches from origination (e.g., 2+ notches on a 10-notch scale)

3. **Qualitative criteria** (backstop triggers):
   - Facility placed on watch list or credit watch
   - Covenant breach (even if waived)
   - Forbearance measures applied
   - Significant adverse change in business, financial, or economic conditions of the borrower
   - Early warning indicators triggered (e.g., sector stress)

4. **30-days past due backstop**: IFRS 9 §5.5.11 creates a rebuttable presumption that SICR has occurred when payments are 30 days past due — a crude but hard floor.

**Low credit risk exemption** (IFRS 9 §5.5.10): If the instrument has low credit risk (broadly equivalent to investment grade, BBB- equivalent or above), the entity may assume no SICR has occurred. This is an entity-wide policy choice.

### ECL Measurement Framework

IFRS 9 §5.5.17 defines ECL as the probability-weighted estimate of credit losses (expected present value of loss) over the relevant horizon, using a range of possible outcomes.

For a single instrument:
```
ECL = PD × LGD × EAD × Discount Factor
```

For lifetime ECL, this must be computed period-by-period over the expected life:
```
Lifetime ECL = Σ(t=1 to T) [PD_t × Survival(t-1) × LGD_t × EAD_t × DF_t]
```

Where:
- PD_t = Marginal PD in period t (probability of defaulting in period t, conditional on surviving to period t)
- Survival(t-1) = Probability of surviving (not defaulting) through period t-1
- LGD_t = Expected loss rate given default in period t
- EAD_t = Expected exposure at period t
- DF_t = Discount factor for period t (typically EIR of the instrument)

### Forward-Looking Information (FLI)

IFRS 9 §5.5.17(c) explicitly requires forward-looking macroeconomic information to be incorporated in ECL estimates. This is a fundamental departure from IAS 39 (backward-looking) and Basel II (through-the-cycle).

**Scenario approach** (most common in practice):
1. Define 3–5 macroeconomic scenarios (base, upside, downside, severe downside)
2. Assign probability weights to each scenario: must sum to 1.0 and be unbiased (expected value = current market consensus)
3. Compute ECL under each scenario using scenario-specific PD and LGD curves
4. Probability-weighted ECL = Σ(weight_i × ECL_i)

Typical scenario structure (illustrative, UK commercial bank, 2026):
| Scenario | GDP 2027 | Unemployment | House Prices | Weight |
|---|---|---|---|---|
| Upside | +3.5% | 3.8% | +8% | 15% |
| Base | +1.8% | 4.5% | +2% | 55% |
| Downside | −1.0% | 6.2% | −10% | 20% |
| Severe downside | −4.5% | 9.0% | −25% | 10% |

Non-linearity: Because the ECL function is non-linear in PD (the relationship between macro shocks and defaults is convex — small downturns cause small default increases, large downturns cause disproportionately large increases), probability-weighted ECL > ECL at expected macro scenario. This difference is called the "non-linearity uplift" and is an important model component.

### IFRS 9 ECL vs. Basel Regulatory ECL (ELBE)

This distinction is frequently tested in interviews and critical for capital ratio analysis:

| Feature | IFRS 9 ECL | Basel ELBE (Expected Loss Best Estimate) |
|---|---|---|
| Horizon | 12M (S1) or Lifetime (S2/S3) | 12 months only |
| PD | Point-in-time (PiT), forward-looking | Through-the-cycle (TTC) for RWA; PiT for ELBE |
| LGD | Cycle-adjusted, forward-looking | Downturn LGD |
| Discount | Yes (at EIR) | No discounting in EL = PD × LGD × EAD |
| Scenarios | Probability-weighted scenarios | Single regulatory estimate |
| Purpose | P&L and balance sheet (accounting) | Regulatory capital: EL vs. provision comparison |
| Standard | IASB IFRS 9 (2014) | BCBS Basel II/III (BIS) |

The key regulatory interface: Under IRB, the bank computes regulatory EL = PD_TTC × LGD_downturn × EAD. This is compared to the accounting allowance (IFRS 9 ECL). If regulatory EL > accounting ECL (shortfall), 100% of shortfall is deducted from CET1 under Basel III (50/50 T1/T2 deduction under Basel II). If accounting ECL > regulatory EL (surplus), up to 0.6% of credit RWA may be added to T2 (IRB banks only).

---

## 4. Statistical Concepts

### Point-in-Time vs. Through-the-Cycle PD

**Through-the-Cycle (TTC) PD**: Long-run average default rate for a rating grade, estimated across a full economic cycle. Appropriate for Basel II/III capital (stable capital requirements). Does not react to current economic conditions.

**Point-in-Time (PiT) PD**: Current best estimate of default probability, conditioned on current macroeconomic state. Rises in recessions, falls in booms. Required for IFRS 9.

Converting TTC to PiT PD:
```
PD_PiT(t) = N[N^{−1}(PD_TTC) × √(1−ρ) + Z(t) × √ρ] / √(1−ρ)
```

Where Z(t) is the standardised economic cycle factor at time t (negative in recessions). This uses the Vasicek single-factor model framework from Basel II.

### Marginal PD and Survival Probability

For lifetime ECL, you need marginal PDs by period, not cumulative PDs.

Given cumulative PD at time t: CPD(t):
```
Marginal PD(t) = CPD(t) − CPD(t−1)     [simplified]
Survival(t) = 1 − CPD(t)
```

More precisely:
```
Marginal PD(t) = [CPD(t) − CPD(t−1)] / [1 − CPD(t−1)]
```
This is the hazard rate approach: probability of defaulting in period t, given survival to t-1.

### Lifetime PD Curves Under IFRS 9

Generating lifetime PD term structure:
1. Start with 12-month PiT PD
2. Apply transition matrices or survival model to extend to lifetime
3. Mean-revert toward TTC PD at long horizons (economic cycles normalise)

For a 5-year corporate loan:
```
PD_PiT_year1 = 1.2%  (current conditions, recession)
PD_PiT_year2 = 1.0%  (conditions improving)
PD_PiT_year3 = 0.8%  (approaching TTC)
PD_PiT_year4 = 0.7%  (near TTC)
PD_PiT_year5 = 0.6%  (TTC = 0.6%)
```

Cumulative PD (accounting for survival):
```
CPD(1) = 1.2%
CPD(2) = CPD(1) + (1−CPD(1)) × PD_2 = 1.2% + 98.8% × 1.0% = 2.188%
CPD(3) = 2.188% + 97.812% × 0.8% = 2.970%
...
```

### Probability-Weighted Scenario Blending

IFRS 9 requires the ECL estimate to reflect "a range of possible outcomes":
```
ECL_weighted = Σ_i [w_i × ECL_i(scenario_i)]
```

Due to non-linearity:
```
ECL_weighted > ECL(weighted average scenario inputs)
```

The non-linearity uplift is larger when:
- Scenarios are more spread out (wider dispersion)
- The exposure has higher credit sensitivity (higher PD, longer maturity)
- Collateral values are more volatile in stress

Statistical methods for IFRS 9 include:
- Monte Carlo simulation over macro factor paths
- Semi-analytical integration over the PD-to-macro mapping function
- Satellite models: separate regression equations linking GDP/unemployment to sector-level PDs

### Backtesting IFRS 9 ECL Models

Key validation exercises:
- Compare predicted 12-month PD (Stage 1 ECL) to realised defaults: Hosmer-Lemeshow statistic
- Compare lifetime ECL (Stage 2 vintage) to realised losses for same cohort over remaining life
- Monitor actual-vs-model staging rate: are SICR triggers firing appropriately?
- Benchmark: ECL/EAD ratio (coverage ratio) by segment vs. peers and rating agency expected loss

---

## 5. Regulatory Framework

### IFRS 9 Standard Reference

**IASB. "IFRS 9 Financial Instruments." International Accounting Standards Board, July 2014.** Effective date: 1 January 2018 (early adoption permitted from 2014).
Key sections:
- Section 5.5: Impairment (the ECL model — all core provisions)
- Section B5.5: Application guidance on ECL measurement
- Appendix A: Defined terms (including "credit loss", "expected credit losses", "credit-impaired financial asset", "default")

IASB also issued: "IFRS 9 Financial Instruments (Hedging and amendments)" — but hedging provisions are separate from ECL.

### EBA Guidelines on ECL

**EBA/GL/2017/06: "Guidelines on credit institutions' credit risk management practices and accounting for expected credit losses."** 20 September 2017.
- Sets supervisory expectations for ECL model governance, data, validation, and management overlay
- Key expectations: SICR criteria must be documented and portfolio-appropriate; forward-looking information must be used meaningfully; management overlays must be transparent
- Section 6: Specific requirements for retail, corporate, sovereign, and bank exposures

**EBA/GL/2020/06: "Guidelines on legislative and non-legislative moratoria on loan repayments applied in the light of the COVID-19 crisis."**
- COVID-19 specific guidance on staging: public moratoria do not automatically trigger SICR
- Important precedent for how SICR criteria interact with forbearance

**ECB Guidance on Non-Performing Loans (2017) and Addendum (2018):**
- Sets supervisory expectations for Stage 3 (non-performing) provisioning
- Provisioning backstop for newly non-performing exposures: 100% cover within 2–3 years (unsecured) or 7 years (secured)

### UK FRC and PRA Guidance

**FRC (Financial Reporting Council). "Review of IFRS 9 Impairment Requirements." March 2023.**
- UK-specific observations on implementation quality; common weaknesses in SICR and scenario design

**PRA SS11/13 (updated): "Internal Ratings Based approaches."**
- Interaction between IFRS 9 ECL and IRB capital: EL shortfall calculation methodology

### FASB CECL (US GAAP — Contrast)

US GAAP adopted CECL (Current Expected Credit Loss) under ASC 326, effective for large public banks 2020:
- No staging — always lifetime ECL from day 1
- Results in higher day-1 provisions than IFRS 9 (12M ECL for Stage 1)
- Significant one-time CET1 impact at adoption: major US banks recognised $10–30Bn provision increases

---

## 6. Data Required

### Data Architecture for IFRS 9 ECL

| Data Category | Specific Elements | System Source | Update Frequency |
|---|---|---|---|
| Exposure data | Facility ID, product type, drawn/undrawn, contractual maturity, repricing dates | Loan management system | Daily |
| Credit rating | Current internal rating, rating at origination, rating history | Credit rating system | On change / monthly |
| PD parameters | 12-month PiT PD, lifetime PD curve by rating grade | ECL model engine | Monthly |
| LGD parameters | Cycle-adjusted LGD by collateral type and seniority | Recovery model | Monthly |
| EAD parameters | Drawn balance, CCF for undrawn, attrition curve for revolving | Loan management | Monthly |
| Collateral data | Current collateral value, collateral type, LTV | Collateral management | Monthly (or on revaluation) |
| Payment history | Days past due, missed payment history | Core banking | Daily |
| Staging flags | Current stage, stage at last reporting date, SICR triggers fired | ECL staging engine | Monthly |
| Macro scenarios | GDP, unemployment, house price, CRE price — all scenarios | Economics team / vendor (e.g., Oxford Economics) | Monthly |
| Scenario weights | Probability weight per scenario | Risk governance committee | Quarterly |
| Origination data | Origination date, origination PD, origination terms | Loan origination system | Historical — static |

### Minimum Data History Requirements

- PD model calibration: 5+ years of default data across a cycle
- LGD model calibration: 7+ years (must include 2008–2009 downturn)
- EAD (CCF) estimation: 5+ years
- Macro-to-PD satellite models: 10+ years of macro and credit data

### Management Overlay Documentation

IFRS 9 allows — and EBA/GL/2017/06 requires — management overlays to adjust model ECL for known limitations, forward-looking information not captured in models, and expert judgment. Overlays must be:
- Documented with rationale
- Reviewed by model risk function
- Disclosed in Pillar 3 and financial statements (qualitatively)

---

## 7. How Analysts Actually Work

### IFRS 9 Monthly Reporting Cycle

The monthly ECL cycle in a typical commercial bank:

**Week 1 (Data Collection and Validation)**
- Pull exposure data from loan management system as of month-end
- Validate against general ledger (E&Y / KPMG shadow reconciliation)
- Refresh internal rating grades for any borrowers that have been re-rated
- Run early warning indicator scans (covenant checks, payment delays, sector stress flags)
- Update collateral valuations (particularly commercial real estate — monthly desk valuations; residential — monthly index update)

**Week 2 (Staging and ECL Calculation)**
- Run staging engine: compare current PD to origination PD for each facility
- Apply SICR criteria: flag Stage 2 migrations and cures (Stage 2 → Stage 1)
- Apply Stage 3 criteria: identify new non-performing exposures
- Run ECL engine using updated PDs, LGDs, EADs, and macro scenario set
- Produce ECL output by facility, segment, and stage

**Week 3 (Management Overlay and Review)**
- Review model output vs. prior month — produce ECL movement analysis (opening balance, new originations, repayments, SICR migrations, Stage 3 migrations, model parameter changes, macro scenario changes, overlays, FX, write-offs)
- Apply management overlays for known model limitations (post-model adjustments)
- Credit committee review of new Stage 3 cases: individual impairment assessment
- Reconcile ECL to accounting provisions in the general ledger

**Week 4 (Reporting and Disclosure)**
- Produce P&L impairment charge: total provision charge = Stage 1 movement + Stage 2 movement + Stage 3 movement − Releases + Write-offs net of recoveries
- Reconcile to balance sheet allowance account
- Prepare financial reporting note disclosures (movement table, stage distribution, coverage ratio by segment)
- Compare to regulatory ECL (ELBE) — compute EL shortfall for CET1 deduction

### Individual Impairment Assessment for Stage 3 Cases

For large Stage 3 exposures (typically > £1–5M threshold), a credit analyst conducts a case-level impairment assessment:

1. **Recovery scenario analysis**: What are the realistic recovery outcomes?
   - Going concern: if borrower restructures, what recoveries are achievable?
   - Enforcement: if collateral is taken and sold, what is realised value?
   - Insolvency: what is estimated return to creditors in administration?

2. **Probability-weighted recovery**: Assign probabilities to scenarios; compute weighted recovery rate

3. **Timing of recoveries**: When will cash flows be received? Apply EIR discounting.

4. **LGD = 1 − NPV(recoveries) / EAD**

5. **ECL = LGD × EAD** (PD = 1.0 for Stage 3)

Example: £5M loan, Stage 3. Recoveries: 80% probability of restructuring with 60% recovery in 2 years; 20% probability of enforcement with 40% recovery in 18 months. EIR = 5%.

```
Restructuring: PV = £5M × 60% / (1.05)^2 = £2.721M
Enforcement:   PV = £5M × 40% / (1.05)^1.5 = £1.858M
Weighted:      £2.721M × 0.8 + £1.858M × 0.2 = £2.549M
LGD = 1 − £2.549M/£5M = 49%
ECL = 49% × £5M = £2.45M
```

---

## 8. Excel Implementation

### ECL Three-Stage Calculator for a Revolving Credit Facility

This worked example computes Stage 1, 2, and 3 ECL for a £10M revolving credit facility.

**Facility Parameters:**
```excel
'=== FACILITY PARAMETERS ===
B2: Facility_Limit          = 10,000,000  ' £10M
B3: Drawn_Balance           = 6,000,000   ' £6M currently drawn
B4: Undrawn_Commitment      = 4,000,000   ' £4M undrawn
B5: CCF_Stage1              = 0.35        ' 35% CCF for revolvers (AIRB)
B6: CCF_Stage2_3            = 0.65        ' Higher CCF — stressed drawdown
B7: EIR                     = 0.055       ' 5.5% EIR
B8: Remaining_Life_yrs      = 4.5         ' Contractual remaining life
B9: Origination_PD          = 0.0030      ' 0.30% PD at origination

'=== CURRENT MACRO SCENARIO SET ===
'Columns: Scenario / GDP / PD_multiplier / LGD_multiplier / Weight
E2:I6 =
Scenario        GDP     PD_mult  LGD_mult  Weight
Upside          3.5%    0.70     0.85      0.15
Base            1.8%    1.00     1.00      0.55
Downside        -1.0%   1.60     1.15      0.20
Severe          -4.5%   2.50     1.35      0.10

'=== STAGE 1 ECL PARAMETERS ===
'12-month PiT PD (Base scenario)
B12: PD_12m_base            = 0.0045      ' 0.45% — PiT, up from 0.30% TTC

'12-month PD by scenario:
B13: PD_12m_upside          = =B12*I3     ' = 0.45% × 0.70 = 0.315%  [I3 = PD_mult upside]
B14: PD_12m_base_scenario   = =B12*I4     ' = 0.45% × 1.00 = 0.450%
B15: PD_12m_downside        = =B12*I5     ' = 0.45% × 1.60 = 0.720%
B16: PD_12m_severe          = =B12*I6     ' = 0.45% × 2.50 = 1.125%

'LGD (Base scenario):
B18: LGD_base               = 0.35        ' 35%
B19: LGD_upside             = =B18*J3     ' 35% × 0.85 = 29.75%  [J3 = LGD_mult]
B20: LGD_base_scen          = =B18*J4     ' 35% × 1.00 = 35.00%
B21: LGD_downside           = =B18*J5     ' 35% × 1.15 = 40.25%
B22: LGD_severe             = =B18*J6     ' 35% × 1.35 = 47.25%

'EAD Stage 1:
B24: EAD_Stage1             = =B3 + B5*B4   ' = £6M + 35%×£4M = £7,400,000

'Stage 1 ECL by scenario (12M, no discounting for simplicity — or discount at EIR):
B26: ECL1_upside            = =B13*B19*B24   ' 0.315% × 29.75% × £7.4M = £6,930
B27: ECL1_base              = =B14*B20*B24   ' 0.450% × 35.00% × £7.4M = £11,655
B28: ECL1_downside          = =B15*B21*B24   ' 0.720% × 40.25% × £7.4M = £21,445
B29: ECL1_severe            = =B16*B22*B24   ' 1.125% × 47.25% × £7.4M = £39,343

'Stage 1 Probability-Weighted ECL:
B31: ECL1_weighted = =H3*B26 + H4*B27 + H5*B28 + H6*B29
' = 15%×£6,930 + 55%×£11,655 + 20%×£21,445 + 10%×£39,343
' = £1,040 + £6,410 + £4,289 + £3,934 = £15,673
```

### Stage 2 Lifetime ECL (SICR triggered — loan is now Stage 2)

```excel
'=== STAGE 2 LIFETIME ECL ===
'Assumption: SICR triggered (PD has doubled since origination)
'Must compute ECL over full remaining life (4.5 years)

'EAD Stage 2 (higher CCF):
B35: EAD_Stage2 = =B3 + B6*B4  ' = £6M + 65%×£4M = £8,600,000

'Annual marginal PDs (Base scenario only for illustration):
'PD_PiT_year1 = 0.9%, mean-reverting to TTC 0.6% by year 4
C38:G38 = Year        1       2       3       4       4.5(stub)
C39:G39 = Marginal_PD 0.90%   0.75%   0.65%   0.60%   0.30%  [half-year]

'Survival probability:
C40: Survival_start  = 1.0000
D40: =C40*(1-C39)               ' 0.9910
E40: =D40*(1-D39)               ' 0.9836
F40: =E40*(1-E39)               ' 0.9772
G40: =F40*(1-F39)               ' 0.9713

'Discount factors (EIR = 5.5%):
C41: DF_1    = 1/(1+B7)^1       ' 0.9479
D41: DF_2    = 1/(1+B7)^2       ' 0.8985
E41: DF_3    = 1/(1+B7)^3       ' 0.8516
F41: DF_4    = 1/(1+B7)^4       ' 0.8072
G41: DF_4_5  = 1/(1+B7)^4.5    ' 0.7845

'Period ECL contribution (Base scenario):
C42: =C39*C40*B18*B35*C41      ' Year 1: 0.9% × 1.0 × 35% × £8.6M × 0.9479 = £25,449
D42: =D39*D40*B18*B35*D41      ' Year 2: 0.75% × 0.9910 × 35% × £8.6M × 0.8985 = £20,088
E42: =E39*E40*B18*B35*E41      ' Year 3: ~£16,200
F42: =F39*F40*B18*B35*F41      ' Year 4: ~£14,240
G42: =G39*G40*B18*B35*G41      ' Stub: ~£6,800

'Total lifetime ECL (Base):
B44: ECL2_base = =SUM(C42:G42)  ' ≈ £82,777

'For full Stage 2, apply scenario weights to scenario-specific lifetime ECLs
'(upside/downside/severe computed similarly with scenario PD and LGD adjustments)
'Stage 2 probability-weighted ECL ≈ £95,000–£105,000 (non-linearity uplift)
```

### Stage 3 ECL (Credit-Impaired)

```excel
'=== STAGE 3 ECL (Individual Impairment Assessment) ===
B48: EAD_Stage3             = =B3 + 1.0*B4  ' 100% CCF = £10,000,000

'Recovery Scenarios:
'                            Weight  Recovery%  Timing(yrs)
B51: Restructure             0.60    55%        2.0
B52: Enforcement_collateral  0.30    35%        1.5
B53: Insolvency              0.10    15%        3.0

'Present value of recoveries (discounted at EIR = 5.5%):
D51: =0.55*B48/(1+B7)^2     ' £3,011,848
D52: =0.35*B48/(1+B7)^1.5   ' £1,780,256
D53: =0.15*B48/(1+B7)^3     ' £1,282,561

'Weighted PV of recoveries:
B56: WPV_recovery = =B51*D51 + B52*D52 + B53*D53
' = 60%×£3,011,848 + 30%×£1,780,256 + 10%×£1,282,561
' = £1,807,109 + £534,077 + £128,256 = £2,469,442

'ECL Stage 3:
B57: ECL3 = =B48 - B56      ' £10M − £2.469M = £7,530,558

'Equivalent LGD:
B58: LGD_implied = =B57/B48  ' = 75.3%

'Provision charge increase from Stage 2 → Stage 3:
B59: Additional_charge = =B57 - B44  ' = £7,530,558 − £82,777 = £7,447,781
```

---

## 9. SQL Implementation

```sql
-- ============================================================
-- IFRS 9 ECL Three-Stage Calculator
-- SQL Server Implementation
-- ============================================================

-- Table: facilities
-- Columns: facility_id, obligor_id, product_type, drawn_balance, 
--          undrawn_commitment, eir, remaining_life_years, 
--          origination_pd, current_pd_12m, lgd_base, ccf,
--          days_past_due, current_stage, prior_stage,
--          origination_date, report_date, accounting_provision

-- Table: macro_scenarios
-- Columns: report_date, scenario_name, weight, pd_multiplier, lgd_multiplier

-- Table: lifetime_pd_curves
-- Columns: facility_id, report_date, scenario_name, year_number, 
--          marginal_pd, cumulative_pd, survival_probability, discount_factor

-- ============================================================
-- STEP 1: Apply Staging Logic
-- ============================================================

WITH staging_assessment AS (
    SELECT
        f.facility_id,
        f.obligor_id,
        f.current_pd_12m,
        f.origination_pd,
        f.days_past_due,
        f.current_stage AS prior_stage,

        -- SICR quantitative test
        CASE
            WHEN f.current_pd_12m > f.origination_pd * 2
              OR f.current_pd_12m - f.origination_pd > 0.003   -- 0.3% absolute threshold
            THEN 1 ELSE 0
        END AS sicr_quant_flag,

        -- 30-day past due backstop
        CASE WHEN f.days_past_due >= 30 THEN 1 ELSE 0 END AS dpe_30_flag,

        -- 90-day past due (Stage 3 rebuttable presumption)
        CASE WHEN f.days_past_due >= 90 THEN 1 ELSE 0 END AS dpe_90_flag,

        -- Determine new stage
        CASE
            WHEN f.days_past_due >= 90 THEN 3
            WHEN (f.current_pd_12m > f.origination_pd * 2
                  OR f.current_pd_12m - f.origination_pd > 0.003
                  OR f.days_past_due >= 30) THEN 2
            ELSE 1
        END AS new_stage

    FROM facilities f
    WHERE f.report_date = '2026-07-31'
),

-- ============================================================
-- STEP 2: EAD by Stage
-- ============================================================

ead_calc AS (
    SELECT
        sa.*,
        f.drawn_balance,
        f.undrawn_commitment,
        f.eir,
        f.remaining_life_years,
        f.lgd_base,
        f.accounting_provision,

        -- EAD varies by stage (higher CCF in stress)
        CASE
            WHEN sa.new_stage = 1
                THEN f.drawn_balance + 0.35 * f.undrawn_commitment
            WHEN sa.new_stage = 2
                THEN f.drawn_balance + 0.65 * f.undrawn_commitment
            WHEN sa.new_stage = 3
                THEN f.drawn_balance + 1.00 * f.undrawn_commitment
        END AS ead

    FROM staging_assessment sa
    JOIN facilities f ON sa.facility_id = f.facility_id
    WHERE f.report_date = '2026-07-31'
),

-- ============================================================
-- STEP 3: Stage 1 ECL (12-Month, Probability-Weighted)
-- ============================================================

stage1_ecl AS (
    SELECT
        e.facility_id,
        e.new_stage,
        e.ead,
        e.lgd_base,
        e.accounting_provision,
        SUM(
            ms.weight
            * (e.ead * (f.current_pd_12m * ms.pd_multiplier)
               * (e.lgd_base * ms.lgd_multiplier))
            / (1 + e.eir)    -- 1-year discount
        ) AS ecl_stage1_pw

    FROM ead_calc e
    JOIN facilities f ON e.facility_id = f.facility_id
                      AND f.report_date = '2026-07-31'
    JOIN macro_scenarios ms ON ms.report_date = '2026-07-31'
    WHERE e.new_stage = 1
    GROUP BY e.facility_id, e.new_stage, e.ead, e.lgd_base, e.accounting_provision
),

-- ============================================================
-- STEP 4: Stage 2 and Stage 3 ECL (Lifetime, from PD Curves)
-- ============================================================

-- Stage 2: sum over lifetime PD curve
stage2_ecl AS (
    SELECT
        e.facility_id,
        e.new_stage,
        e.ead,
        e.lgd_base,
        e.accounting_provision,
        SUM(
            ms.weight
            * lc.marginal_pd
            * lc.survival_probability
            * (e.lgd_base * ms.lgd_multiplier)
            * e.ead
            * lc.discount_factor
        ) AS ecl_lifetime_pw

    FROM ead_calc e
    JOIN facilities f ON e.facility_id = f.facility_id
                      AND f.report_date = '2026-07-31'
    JOIN macro_scenarios ms ON ms.report_date = '2026-07-31'
    JOIN lifetime_pd_curves lc
        ON lc.facility_id = e.facility_id
       AND lc.report_date = '2026-07-31'
       AND lc.scenario_name = ms.scenario_name
    WHERE e.new_stage = 2
    GROUP BY e.facility_id, e.new_stage, e.ead, e.lgd_base, e.accounting_provision
),

-- Stage 3: individual assessment (simplified — PD = 1, LGD from individual model)
stage3_ecl AS (
    SELECT
        e.facility_id,
        e.new_stage,
        e.ead,
        e.lgd_base,
        e.accounting_provision,
        -- Individual impairment: use LGD from case-by-case assessment
        -- Stored in separate individual_assessments table
        ia.ecl_individual AS ecl_lifetime_pw

    FROM ead_calc e
    JOIN individual_assessments ia
        ON ia.facility_id = e.facility_id
       AND ia.report_date = '2026-07-31'
    WHERE e.new_stage = 3
),

-- ============================================================
-- STEP 5: Union All Stages and Compute Provision Movement
-- ============================================================

all_ecl AS (
    SELECT facility_id, new_stage, ead, ecl_stage1_pw AS ecl_required,
           accounting_provision FROM stage1_ecl
    UNION ALL
    SELECT facility_id, new_stage, ead, ecl_lifetime_pw, accounting_provision
    FROM stage2_ecl
    UNION ALL
    SELECT facility_id, new_stage, ead, ecl_lifetime_pw, accounting_provision
    FROM stage3_ecl
)

-- ============================================================
-- STEP 6: Final Output with Provision Movement
-- ============================================================

SELECT
    facility_id,
    new_stage,
    ROUND(ead / 1e6, 3)                        AS ead_m,
    ROUND(ecl_required / 1e3, 1)               AS ecl_required_k,
    ROUND(accounting_provision / 1e3, 1)       AS prior_provision_k,
    ROUND((ecl_required - accounting_provision)
          / 1e3, 1)                             AS provision_movement_k,
    CASE WHEN ecl_required > accounting_provision
         THEN 'CHARGE' ELSE 'RELEASE' END       AS movement_type,
    ROUND(ecl_required / ead * 100, 2)         AS coverage_ratio_pct
FROM all_ecl
ORDER BY new_stage, ecl_required DESC;

-- Portfolio Summary
SELECT
    new_stage,
    COUNT(*) AS facility_count,
    ROUND(SUM(ead) / 1e6, 1)                   AS total_ead_m,
    ROUND(SUM(ecl_required) / 1e6, 3)          AS total_ecl_m,
    ROUND(SUM(ecl_required) / SUM(ead) * 100, 2) AS coverage_pct,
    ROUND(SUM(ecl_required - accounting_provision) / 1e6, 3) AS net_movement_m
FROM all_ecl
GROUP BY new_stage
ORDER BY new_stage;
```

---

## 10. Python Implementation

```python
"""
IFRS 9 Expected Credit Loss Model — Three Stage Framework
Reference: IASB IFRS 9 (July 2014), §5.5; EBA/GL/2017/06

Author: Credit Risk Academy — M16
"""

import numpy as np
import pandas as pd
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class MacroScenario:
    name: str
    weight: float
    pd_multiplier: float       # Multiplies base PD
    lgd_multiplier: float      # Multiplies base LGD
    description: str = ""


@dataclass
class Facility:
    facility_id: str
    obligor_id: str
    drawn_balance: float
    undrawn_commitment: float
    eir: float                  # Effective Interest Rate
    origination_pd: float       # PD at origination (PiT)
    current_pd_12m: float       # Current 12-month PiT PD
    lgd_base: float             # Base (central scenario) LGD
    remaining_life_years: float
    origination_date: str
    days_past_due: int = 0
    on_watch_list: bool = False
    covenant_breach: bool = False
    accounting_provision: float = 0.0
    # Stage 3 specific
    individual_ecl: Optional[float] = None  # Set for individual cases


@dataclass
class LifetimePDCurve:
    """Period-by-period PD term structure for lifetime ECL."""
    periods: list[float]                    # Year fractions [0.5, 1.0, 1.5, ...]
    marginal_pds: list[float]              # Marginal PD each period
    survival_probs: list[float]            # Survival probability to start of period
    discount_factors: list[float]          # EIR discount factor for each period


class IFRS9SICREngine:
    """
    Implements SICR (Significant Increase in Credit Risk) assessment.
    IFRS 9 §5.5.9 and EBA/GL/2017/06 §§68-84.
    """

    def __init__(self,
                 pd_relative_threshold: float = 2.0,   # 2× relative increase
                 pd_absolute_threshold: float = 0.003,  # 0.3% absolute increase
                 dpe_30_backstop: bool = True,
                 dpe_90_default: bool = True):
        self.pd_relative_threshold = pd_relative_threshold
        self.pd_absolute_threshold = pd_absolute_threshold
        self.dpe_30_backstop = dpe_30_backstop
        self.dpe_90_default = dpe_90_default

    def assess_stage(self, facility: Facility) -> tuple[int, list[str]]:
        """
        Returns (stage, [list of trigger reasons]).
        IFRS 9 §5.5.3, §5.5.11.
        """
        triggers = []

        # Stage 3: 90-day past due (rebuttable presumption — §5.5.11)
        if self.dpe_90_default and facility.days_past_due >= 90:
            triggers.append(f"90+ DPD backstop (DPD={facility.days_past_due})")
            return 3, triggers

        # Stage 3: individual indicators (non-exhaustive list)
        if facility.individual_ecl is not None:
            triggers.append("Individual impairment assessment present")
            return 3, triggers

        # SICR — Stage 2 assessment

        # Quantitative PD test
        if facility.origination_pd > 0:
            relative_increase = facility.current_pd_12m / facility.origination_pd
            absolute_increase = facility.current_pd_12m - facility.origination_pd

            if (relative_increase >= self.pd_relative_threshold and
                    absolute_increase >= self.pd_absolute_threshold):
                triggers.append(
                    f"SICR: PD increased {relative_increase:.1f}× "
                    f"({facility.origination_pd*100:.3f}% → "
                    f"{facility.current_pd_12m*100:.3f}%)"
                )

        # Qualitative triggers
        if facility.on_watch_list:
            triggers.append("Watch list / credit monitoring")
        if facility.covenant_breach:
            triggers.append("Covenant breach")

        # 30-day past due backstop
        if self.dpe_30_backstop and facility.days_past_due >= 30:
            triggers.append(f"30+ DPD backstop (DPD={facility.days_past_due})")

        if triggers:
            return 2, triggers

        return 1, []


class IFRS9ECLCalculator:
    """
    Computes ECL across all three stages per IFRS 9 §5.5.17.
    Incorporates forward-looking macroeconomic scenarios (§5.5.17(c)).
    """

    # CCF assumptions by stage (illustrative for revolving credit)
    CCF_BY_STAGE = {1: 0.35, 2: 0.65, 3: 1.00}

    def __init__(self, scenarios: list[MacroScenario],
                 sicr_engine: Optional[IFRS9SICREngine] = None):
        self.scenarios = scenarios
        self.sicr_engine = sicr_engine or IFRS9SICREngine()

        # Validate scenario weights
        total_weight = sum(s.weight for s in scenarios)
        assert abs(total_weight - 1.0) < 1e-6, \
            f"Scenario weights must sum to 1.0, got {total_weight}"

    def compute_ead(self, facility: Facility, stage: int) -> float:
        """EAD = drawn + CCF × undrawn (stage-dependent CCF)."""
        ccf = self.CCF_BY_STAGE[stage]
        return facility.drawn_balance + ccf * facility.undrawn_commitment

    def stage1_ecl(self, facility: Facility, ead: float) -> dict:
        """
        12-month ECL, probability-weighted across scenarios.
        IFRS 9 §5.5.5.
        """
        ecl_by_scenario = {}
        weighted_ecl = 0.0

        for scen in self.scenarios:
            pd = facility.current_pd_12m * scen.pd_multiplier
            lgd = facility.lgd_base * scen.lgd_multiplier
            # Discount for 0.5yr average default timing within year
            df = 1 / (1 + facility.eir) ** 0.5
            ecl = pd * lgd * ead * df

            ecl_by_scenario[scen.name] = ecl
            weighted_ecl += scen.weight * ecl

        return {
            "stage": 1,
            "ead": ead,
            "ecl_by_scenario": ecl_by_scenario,
            "ecl_weighted": weighted_ecl,
        }

    def stage2_ecl(self, facility: Facility, ead: float,
                   pd_curve: LifetimePDCurve) -> dict:
        """
        Lifetime ECL, probability-weighted, using period-by-period PD curve.
        IFRS 9 §5.5.3.
        """
        ecl_by_scenario = {}
        weighted_ecl = 0.0

        for scen in self.scenarios:
            lgd_scen = facility.lgd_base * scen.lgd_multiplier
            ecl = 0.0

            for i, period in enumerate(pd_curve.periods):
                marginal_pd = pd_curve.marginal_pds[i] * scen.pd_multiplier
                survival = pd_curve.survival_probs[i]
                df = pd_curve.discount_factors[i]
                ecl += marginal_pd * survival * lgd_scen * ead * df

            ecl_by_scenario[scen.name] = ecl
            weighted_ecl += scen.weight * ecl

        return {
            "stage": 2,
            "ead": ead,
            "ecl_by_scenario": ecl_by_scenario,
            "ecl_weighted": weighted_ecl,
        }

    def stage3_ecl(self, facility: Facility, ead: float) -> dict:
        """
        Lifetime ECL for credit-impaired instruments.
        PD = 1.0; LGD from individual impairment assessment.
        IFRS 9 §5.5.3, §B5.5.24-B5.5.26.
        """
        if facility.individual_ecl is not None:
            ecl = facility.individual_ecl
        else:
            # Collective model fallback for small Stage 3
            ecl = ead * facility.lgd_base  # Simplified; no discounting shown here

        return {
            "stage": 3,
            "ead": ead,
            "ecl_weighted": ecl,
            "note": "Individual assessment" if facility.individual_ecl
                    else "Collective model",
        }

    def assess_and_compute(self, facility: Facility,
                           pd_curve: Optional[LifetimePDCurve] = None) -> dict:
        """Full IFRS 9 ECL assessment for a single facility."""
        stage, triggers = self.sicr_engine.assess_stage(facility)
        ead = self.compute_ead(facility, stage)

        if stage == 1:
            ecl_result = self.stage1_ecl(facility, ead)
        elif stage == 2:
            if pd_curve is None:
                raise ValueError(f"Lifetime PD curve required for Stage 2 ({facility.facility_id})")
            ecl_result = self.stage2_ecl(facility, ead, pd_curve)
        else:
            ecl_result = self.stage3_ecl(facility, ead)

        provision_movement = ecl_result["ecl_weighted"] - facility.accounting_provision
        coverage_ratio = ecl_result["ecl_weighted"] / ead if ead > 0 else 0

        return {
            "facility_id": facility.facility_id,
            "stage": stage,
            "stage_triggers": triggers,
            "ead": ead,
            "ecl_required": ecl_result["ecl_weighted"],
            "prior_provision": facility.accounting_provision,
            "provision_movement": provision_movement,
            "movement_type": "CHARGE" if provision_movement > 0 else "RELEASE",
            "coverage_ratio": coverage_ratio,
            "ecl_by_scenario": ecl_result.get("ecl_by_scenario", {}),
        }

    def portfolio_ecl(self, facilities: list[Facility],
                      pd_curves: dict[str, LifetimePDCurve]) -> pd.DataFrame:
        """
        Portfolio-level ECL with full stage analysis.
        pd_curves: {facility_id: LifetimePDCurve}
        """
        results = []
        for f in facilities:
            curve = pd_curves.get(f.facility_id)
            result = self.assess_and_compute(f, curve)
            results.append(result)

        df = pd.DataFrame(results)

        print("\n=== IFRS 9 Portfolio ECL Summary ===")
        summary = df.groupby("stage").agg(
            count=("facility_id", "count"),
            total_ead=("ead", "sum"),
            total_ecl=("ecl_required", "sum"),
            total_movement=("provision_movement", "sum"),
        ).reset_index()

        for _, row in summary.iterrows():
            print(f"\n  Stage {int(row['stage'])}:")
            print(f"    Facilities:   {row['count']:>5,.0f}")
            print(f"    EAD:          £{row['total_ead']:>12,.0f}")
            print(f"    ECL Required: £{row['total_ecl']:>12,.0f}")
            print(f"    Coverage:     {row['total_ecl']/row['total_ead']*100:>8.2f}%"
                  if row['total_ead'] > 0 else "")
            print(f"    P&L Movement: £{row['total_movement']:>12,.0f}")

        return df


# ============================================================
# Worked Example: £10M Revolving Credit Facility
# ============================================================

def worked_example():
    """
    Three-stage ECL demonstration for a £10M revolving credit facility.
    Shows Stage 1, 2, and 3 computation with four macro scenarios.
    """

    scenarios = [
        MacroScenario("Upside",        weight=0.15, pd_multiplier=0.70, lgd_multiplier=0.85),
        MacroScenario("Base",          weight=0.55, pd_multiplier=1.00, lgd_multiplier=1.00),
        MacroScenario("Downside",      weight=0.20, pd_multiplier=1.60, lgd_multiplier=1.15),
        MacroScenario("Severe",        weight=0.10, pd_multiplier=2.50, lgd_multiplier=1.35),
    ]

    calc = IFRS9ECLCalculator(scenarios=scenarios)

    facility = Facility(
        facility_id="RCF-001",
        obligor_id="OBL-CORP-001",
        drawn_balance=6_000_000,
        undrawn_commitment=4_000_000,
        eir=0.055,
        origination_pd=0.003,     # 0.30% at origination
        current_pd_12m=0.0045,    # 0.45% now — PD has risen
        lgd_base=0.35,
        remaining_life_years=4.5,
        origination_date="2022-01-15",
        days_past_due=0,
        accounting_provision=12_000,
    )

    # Lifetime PD curve (base scenario; multipliers applied per scenario)
    pd_curve = LifetimePDCurve(
        periods=[1.0, 2.0, 3.0, 4.0, 4.5],
        marginal_pds=[0.0090, 0.0075, 0.0065, 0.0060, 0.0030],
        survival_probs=[1.0000, 0.9910, 0.9836, 0.9772, 0.9713],
        discount_factors=[
            1/(1+0.055)**1,
            1/(1+0.055)**2,
            1/(1+0.055)**3,
            1/(1+0.055)**4,
            1/(1+0.055)**4.5,
        ]
    )

    print("=" * 65)
    print("IFRS 9 ECL WORKED EXAMPLE — £10M REVOLVING CREDIT FACILITY")
    print("IASB IFRS 9 (July 2014) §5.5 | EBA/GL/2017/06")
    print("=" * 65)

    # Run all three stages (simulating the facility in each state)
    for scenario_stage, dpd, indiv_ecl, provision in [
        (1, 0, None, 12_000),      # Stage 1: performing, no SICR
        (2, 0, None, 12_000),      # Stage 2: SICR triggered (PD doubled)
        (3, 95, None, 82_000),     # Stage 3: 90+ DPD
    ]:
        test_facility = Facility(
            facility_id=f"RCF-001-S{scenario_stage}",
            obligor_id="OBL-CORP-001",
            drawn_balance=6_000_000,
            undrawn_commitment=4_000_000,
            eir=0.055,
            origination_pd=0.003,
            current_pd_12m=0.0045 if scenario_stage <= 2 else 0.0045,
            lgd_base=0.35,
            remaining_life_years=4.5,
            origination_date="2022-01-15",
            days_past_due=dpd,
            on_watch_list=(scenario_stage == 2),
            accounting_provision=provision,
            individual_ecl=(7_530_558 if scenario_stage == 3 else None),
        )

        result = calc.assess_and_compute(
            test_facility,
            pd_curves={f"RCF-001-S{scenario_stage}": pd_curve}
        )

        print(f"\n{'—'*55}")
        print(f"STAGE {result['stage']} ASSESSMENT")
        print(f"  Stage Triggers: {result['stage_triggers'] or ['No SICR — Stage 1']}")
        print(f"  EAD:            £{result['ead']:>12,.0f}")
        print(f"  ECL Required:   £{result['ecl_required']:>12,.0f}")
        print(f"  Coverage Ratio: {result['coverage_ratio']*100:>8.2f}%")
        print(f"  Prior Provision:£{result['prior_provision']:>12,.0f}")
        print(f"  P&L Movement:   £{result['provision_movement']:>12,.0f} ({result['movement_type']})")
        if result["ecl_by_scenario"]:
            print(f"  ECL by Scenario:")
            for sc, val in result["ecl_by_scenario"].items():
                print(f"    {sc:15s}: £{val:>10,.0f}")


if __name__ == "__main__":
    worked_example()
```

---

## 11. Interview Questions

**Q1: Describe the three-stage model under IFRS 9.**
Stage 1: 12-month ECL for performing assets with no significant credit risk increase since origination. Stage 2: Lifetime ECL triggered by SICR — instrument is still performing but credit risk has increased significantly since origination. Stage 3: Lifetime ECL for credit-impaired instruments — objective evidence of impairment (typically 90 DPD or significant financial difficulty). Key distinction: Stage 2 vs. Stage 3 affects whether interest is accrued on gross or net carrying amount.

**Q2: What is SICR and how is it practically implemented?**
SICR = Significant Increase in Credit Risk since origination. Implementation typically combines: (1) quantitative test — PD has doubled and increased by > 0.3% in absolute terms; (2) qualitative test — watch list, covenant breach, forbearance; (3) backstop — 30 days past due. The 30-day DPD backstop is a floor — banks cannot rebutt the SICR presumption at 30 DPD. Banks may also use rating grade migration (e.g., ≥2 notches downgrade) as a proxy.

**Q3: Why does IFRS 9 use multiple macroeconomic scenarios rather than a single base case?**
IFRS 9 §5.5.17(c) requires a range of possible outcomes because ECL is non-linear: the relationship between macro shocks and credit losses is convex. The probability-weighted ECL across scenarios exceeds the ECL computed using the weighted-average scenario inputs, because severe downturns cause disproportionately large losses. Using only the base case would systematically under-provide.

**Q4: Explain how IFRS 9 ECL and Basel regulatory capital interact.**
Under IRB, regulatory EL = PD_TTC × LGD_downturn × EAD (12-month, no discounting). IFRS 9 ECL = probability-weighted, discounted, PiT, lifetime (S2/S3). These are different numbers from different frameworks. The Basel CET1 deduction mechanism compares them: if regulatory EL > accounting allowance (IFRS 9 ECL), the shortfall is a CET1 deduction (100% under Basel III). If accounting ECL > regulatory EL, surplus up to 0.6% of credit RWA may be added to T2.

**Q5: What is the day-1 P&L impact of a new £50M corporate loan under IFRS 9?**
On origination, a Stage 1 provision must be recognised immediately. If PD = 0.5%, LGD = 40%, EAD = £52M (including CCF on undrawn), 12-month ECL = 0.5% × 40% × £52M = £104,000. This £104,000 is charged to the income statement on day 1 of the loan, before any revenue is earned. It must be embedded in deal pricing. Strong candidates note this is why bank pricing models include "ECL cost" as an explicit line item in the margin waterfall.

**Q6: Technical: A facility has PD at origination = 0.2% and current PD = 0.55%. Using a 2× relative and 0.3% absolute SICR threshold, has SICR been triggered?**
Relative: 0.55% / 0.2% = 2.75× ≥ 2× — YES.
Absolute: 0.55% − 0.2% = 0.35% ≥ 0.30% — YES.
Both tests triggered — SICR has occurred, facility moves to Stage 2 (lifetime ECL).

**Q7: What is the difference between IFRS 9 and US GAAP CECL?**
IFRS 9: Three-stage model. Stage 1 = 12-month ECL; Stage 2/3 = lifetime ECL. CECL (ASC 326): Single-stage — always lifetime ECL from day 1 of origination. CECL results in higher day-1 provisions (no 12M shortcut). However, CECL avoids the SICR judgement requirement that creates model complexity and P&L volatility in IFRS 9 when assets migrate between stages.

---

## 12. Common Mistakes

### Mistake 1: Treating Stage 3 Interest Income Incorrectly
**Wrong**: Calculating interest on gross balance for Stage 3 instruments.
**Correct**: IFRS 9 §5.4.2 requires that for credit-impaired instruments (Stage 3), the effective interest rate is applied to the amortised cost net of the impairment allowance. This "unwinding of discount" approach produces lower interest income and is a key accounting difference from Stages 1 and 2.

### Mistake 2: Using TTC PD for IFRS 9 ECL
**Wrong**: Plugging the Basel regulatory TTC PD directly into the IFRS 9 ECL formula.
**Correct**: IFRS 9 requires Point-in-Time (PiT) PD that reflects current and forward-looking economic conditions. TTC PD is a through-the-cycle average — it does not respond to the current economic environment. Using TTC PD systematically under-provisions in downturns and over-provisions in upturns.

### Mistake 3: Single-Scenario ECL
**Wrong**: Running ECL on a single base scenario and calling it "IFRS 9 compliant."
**Correct**: IFRS 9 §5.5.17 explicitly requires "a range of possible outcomes." Single-scenario ECL systematically under-provides due to non-linearity. EBA/GL/2017/06 §§136–155 explicitly requires probability-weighted scenarios and documents the non-linearity requirement.

### Mistake 4: Ignoring the SICR 30-Day DPD Backstop
**Wrong**: Keeping a facility in Stage 1 despite it being 35 days past due because the PD hasn't met the SICR quantitative threshold.
**Correct**: IFRS 9 §5.5.11 creates a rebuttable presumption of SICR at 30 days past due. To rebut it, the bank must have reasonable and supportable information showing that the risk has not significantly increased. This is a high bar. EBA expects banks to rebut it only in clearly documented exceptional circumstances.

### Mistake 5: Write-Off Policy Misalignment
**Wrong**: Maintaining Stage 3 provisions indefinitely without writing off irrecoverable balances.
**Correct**: IFRS 9 §5.4.4 requires write-off when the entity has no reasonable expectation of recovery. Write-off is an accounting event (reduces gross balance and allowance simultaneously) — it does not necessarily mean the bank stops collection. Failure to write off inflates gross loan balances and understates coverage ratios.

### Mistake 6: Confusing ECL Provision with Capital
**Wrong**: Telling management "our Stage 3 provision is our capital against this loan."
**Correct**: Provisions reduce the carrying value of the loan on the balance sheet and reduce pre-tax profits. Regulatory capital is a separate calculation. Under IRB, the EL shortfall creates a CET1 deduction — not the provisions themselves. The interaction is: if IFRS 9 provisions < regulatory EL, the shortfall reduces CET1. Provisions above regulatory EL add to T2 (with cap).

---

## 13. Case Studies

### Case Study 1: Staged Provision Increase — A Commercial Real Estate Borrower

**Context**: In December 2025, a UK commercial bank holds a £25M term loan to a commercial real estate developer. Origination PD (2022): 0.35%, LGD: 40%, Stage 1 ECL at origination = 0.35% × 40% × £25M = £35,000.

**Q4 2025**: Commercial property values fall 18% in London. The bank's internal model shows current PiT PD = 0.85%, LTV has risen from 60% to 73%. SICR test: PD ratio = 0.85%/0.35% = 2.43× (≥2×); absolute = 0.50% (≥0.3%). Both thresholds breached. Facility moves to Stage 2.

**Stage 2 Lifetime ECL** (4.5 years remaining, Base scenario):
Annual marginal PDs (macro-conditioned): [1.8%, 1.4%, 1.0%, 0.8%, 0.4%]
Scenario-weighted ECL ≈ £380,000 (including downside scenarios)

**Provision charge**: £380,000 − £35,000 = £345,000 P&L charge in Q4 2025.

**Q2 2026**: Developer misses January interest payment (15 DPD → 45 DPD by February). 30-day DPD backstop fires in Stage 2 (already there). February: missed second interest payment — 75 DPD. March: 95 DPD → Stage 3 trigger.

**Stage 3 individual assessment**:
- Scenario 1 (40%): Orderly sale of completed units, 2yr realisation, recovery = 65% → PV = £25M × 65% / 1.055² = £14.6M
- Scenario 2 (35%): Distressed sale, 1yr, recovery = 45% → PV = £25M × 45% / 1.055 = £10.7M
- Scenario 3 (25%): Receivership, 3yr, recovery = 30% → PV = £25M × 30% / 1.055³ = £6.5M
- Weighted PV = 40%×£14.6M + 35%×£10.7M + 25%×£6.5M = £5.84M + £3.75M + £1.63M = £11.22M
- ECL Stage 3 = £25M − £11.22M = £13.78M

**Additional charge at Stage 3 migration**: £13,780,000 − £380,000 = £13,400,000 P&L charge.

**Lesson**: Stage migrations from 2→3 create step-change provision charges. Credit analysts must identify Stage 2 exposures at highest risk of further deterioration and communicate the potential P&L impact to management before year-end.

### Case Study 2: COVID-19 Macro Scenario Overlay (March 2020)

**Context**: On 23 March 2020, the UK entered lockdown. Banks had to update IFRS 9 ECL models immediately for Q1 2020 reporting.

**Challenge**: Models had been calibrated on historic data through 2019 — a prolonged period of low defaults. The satellite models linking GDP to PD had never been tested in a pandemic scenario. GDP forecasts were collapsing by 15–20% (annual equivalent) — far outside model training ranges.

**Industry response**: Banks could not simply run models forward with extreme macro inputs (extrapolation risk — models not designed for this). Instead:
1. **Mechanistic model run**: Plug in revised macro scenarios (GDP −15% Q2 2020, rebound in 2021) — this produced large but uncertain ECL increases
2. **Management overlays**: Sector-by-sector qualitative overlays for hardest-hit sectors (airlines, hospitality, retail, oil & gas)
3. **Government support**: Model could not capture furlough, CBILS/CLBILS loans, rate cuts — overlays reduced model output to account for support
4. **Final provisions**: Most major UK banks increased provisions by £1–3Bn in Q1 2020

**Lesson**: IFRS 9 is not a purely mechanical model — management overlay is structurally embedded. The analyst's role includes articulating model limitations and ensuring overlays are: documented, proportional, directionally correct, and approved through governance. EBA/GL/2017/06 §§156–165 sets out overlay governance requirements.

---

## 14. Iterative Reinforcement

### Level 1 — Recall (Week 1)
- Draw the three-stage model and define what changes between stages (ECL horizon, interest income basis)
- State three SICR triggers (one quantitative, one qualitative, one backstop)
- Define PiT PD vs. TTC PD in one sentence each
- State why multiple macro scenarios are required under IFRS 9

### Level 2 — Application (Week 2)
- Calculate Stage 1 ECL for a £5M facility: PD=0.6%, LGD=40%, CCF=35%, undrawn=£2M
- Run the SICR test: origination PD 0.4%, current PD 0.95%, no DPD
- Compute the P&L impact of Stage 1→Stage 2 migration using the above parameters
- Explain the provision accounting entries for a new origination, a Stage 2 migration, and a write-off

### Level 3 — Synthesis (Week 3)
- Run the full Python `worked_example()` and verify Stage 1, 2, 3 ECL outputs
- Build the Excel three-stage model from scratch and validate all cells
- Explain the IFRS 9 ECL vs. Basel ELBE comparison to a new colleague
- Calculate the CET1 deduction if regulatory EL = £50M and IFRS 9 ECL = £35M

### Level 4 — Expert (Week 4)
- Design a SICR framework for a commercial real estate portfolio (what quantitative thresholds? what qualitative triggers? what sector overlays?)
- Model the non-linearity uplift: compute ECL at base scenario vs. probability-weighted ECL for your scenario set — explain the difference
- Analyse a Stage 3 case from a recent annual report: are the recovery scenarios plausible?
- Connect IFRS 9 provisioning to RoE: how does a 20bp increase in coverage ratio affect return on equity for a £100Bn loan book?

### Module Connections
- M14 (Basel II): Regulatory EL formula (PD × LGD × EAD); EL shortfall mechanism
- M15 (Basel III): CET1 deduction for EL shortfall; IFRS 9 Day 1 provision impact on capital at adoption
- M12 (PD Models): PiT vs. TTC PD; satellite models linking macro to PD
- M13 (LGD Models): Cycle-adjusted LGD; downturn LGD for IFRS 9 and Basel
- M17 (Stress Testing): ICAAP stress tests use similar (but distinct) macro scenarios to IFRS 9

---

## 15. Source Material

### Primary Standard

1. **IASB. "IFRS 9 Financial Instruments." International Accounting Standards Board, July 2014.** Effective 1 January 2018.
   - The definitive standard. Section 5.5 (Impairment) and Application Guidance B5.5 contain the ECL model.
   - Available: https://www.ifrs.org/issued-standards/list-of-standards/ifrs-9-financial-instruments/

2. **IASB. "IFRS 9 — Basis for Conclusions." 2014.**
   - Explains the reasoning behind three-stage design, SICR concept, and FLI requirements

3. **IASB. "Financial Instruments: Impairment — Supplement to Exposure Draft ED/2009/12." 2011.**
   - Transitional thinking from incurred loss to expected loss framework

### EBA and Supervisory Guidance

4. **EBA/GL/2017/06. "Guidelines on credit institutions' credit risk management practices and accounting for expected credit losses." European Banking Authority, 20 September 2017.**
   - The key supervisory implementation guide. Sets expectations for SICR, FLI, collective assessment, and overlays.
   - Available: https://www.eba.europa.eu/regulation-and-policy/credit-risk/guidelines-on-credit-institutions-credit-risk-management-practices-and-accounting-for-expected-credit-losses

5. **EBA/GL/2020/06. "Guidelines on legislative and non-legislative moratoria on loan repayments applied in the light of the COVID-19 crisis." EBA, April 2020 (rev. December 2020).**
   - Moratorium guidance: COVID moratoria do not automatically trigger SICR

6. **ECB. "Guidance to banks on non-performing loans." European Central Bank, March 2017.**
   - Stage 3 provisioning expectations; vintage provisioning backstop

7. **ECB. "Addendum to the ECB Guidance to banks on non-performing loans." March 2018.**
   - Quantitative backstop for Stage 3 provisions: 100% for unsecured NPLs > 2yr; secured NPLs > 7yr

### BIS / BCBS

8. **BCBS. "Guidance on credit risk and accounting for expected credit losses." December 2015.**
   - Supervisory expectations for IFRS 9/CECL implementation at internationally active banks
   - Available: https://www.bis.org/publ/bcbs350.htm

9. **BCBS. "The interaction of regulatory frameworks with IFRS 9." 2018.**
   - Interaction between IFRS 9 provisions and Basel regulatory capital; EL shortfall treatment

### Academic and Practitioner References

10. **Bellini, T. "IFRS 9 and CECL Credit Risk Modelling and Validation." Academic Press / Elsevier, 2019.**
    - Comprehensive practitioner guide to ECL model development; PD curve construction, LGD estimation, scenario design

11. **PwC. "In Depth: First Impressions IFRS 9 Financial Instruments." 2014 and updates.**
    - Detailed worked examples of staging, SICR, and measurement

12. **KPMG. "First Impressions: IFRS 9 Financial Instruments." 2014.**
    - Alternative interpretation guide with numerical illustrations

### UK Specific

13. **Financial Reporting Council. "Review of IFRS 9 Impairment Requirements." FRC, March 2023.**
    - UK supervisor's observations on IFRS 9 implementation quality; common weaknesses

14. **Prudential Regulation Authority. "SS11/13: Internal Ratings Based (IRB) approaches — Interaction with IFRS 9." Updated 2018.**
    - EL shortfall deduction methodology for IRB banks under Basel III
