# M01 — Commercial Lending Overview

> **Academy Level:** Foundations | **Prerequisite:** None | **Estimated Study Time:** 6–8 hours
>
> **Who this is for:** A Banking Business Analyst who understands how banks operate but needs to build genuine credit risk expertise from first principles. This module gives you the economic, regulatory, and operational framework that underpins every credit decision you will encounter.

---

## 1. Business Purpose

### Why Commercial Lending Exists

Banks are intermediaries. They borrow money cheaply from depositors and wholesale markets, then lend it at a higher rate to businesses and individuals. The spread between what the bank pays to fund itself and what it charges borrowers is the engine of banking profitability. Commercial lending — loans and credit facilities extended to businesses rather than individuals — has historically been the largest and most profitable part of this intermediation activity.

For a large universal bank like HSBC, commercial and corporate lending generates several distinct revenue streams simultaneously:

**Net Interest Income (NII):** The bank earns the loan margin (the spread above the bank's funding cost) for every day the loan is outstanding. On a £50 million revolving credit facility priced at SONIA + 175bps, if the bank funds itself at SONIA + 25bps, it earns 150bps per annum on any drawn balance, and a lower commitment fee (typically 30–50% of the margin) on the undrawn portion.

**Fee Income:** Arrangement fees (typically 0.25%–1.5% of facility size), annual agency fees in syndicated deals, amendment fees when terms are renegotiated, and utilisation fees for high drawdown levels. These are often recognised upfront (or amortised over the facility life under IFRS 9), and are material for large transactions.

**Ancillary Revenue:** The relationship a commercial lending mandate creates enables the bank to cross-sell treasury products (FX hedging, interest rate swaps), cash management, trade finance, capital markets services (bonds, equity), and transaction banking. The lending relationship is frequently the anchor that makes a corporate banking relationship commercially viable even when the standalone loan return is modest.

**Risk Transfer Income:** Banks that originate-to-distribute — arranging syndicated loans and selling down the majority — earn arrangement and underwriting fees without retaining the full credit risk.

### The Bank's Economic Model in Three Numbers

To understand why credit risk management matters, you need to understand how the bank measures profitability on a loan book:

**1. Net Interest Margin (NIM)**

NIM = Net Interest Income / Average Interest-Earning Assets

For HSBC Group in 2023, NIM was approximately 1.66% across the entire balance sheet (HSBC Annual Report 2023). On the commercial banking segment specifically, margins are higher — typically 2.0%–2.8% in developed markets — because commercial loans carry more credit risk than government securities and require more margin to compensate.

NIM sounds small, but applied to a £200 billion corporate loan book, a 2% NIM generates £4 billion of net interest income per year. The problem: losses and costs must be deducted from that £4 billion before reaching profit.

**2. Return on Risk-Weighted Assets (RoRWA)**

Banks do not simply divide profit by total assets. Under Basel III/IV, every asset is assigned a risk weight — government bonds might be 0%, prime mortgages 35%, unsecured corporate loans 100% or more under the standardised approach, or a model-derived percentage under the Internal Ratings-Based (IRB) approach.

RoRWA = Net Profit After Tax / Risk-Weighted Assets

A well-run commercial banking book targets RoRWA of 2.0%–3.5%. This is the core metric credit risk teams use to evaluate whether adding a new exposure improves or dilutes portfolio returns. A loan that generates high NIM but sits on a very high-risk-weight borrower may have a poor RoRWA. A low-margin loan to an investment-grade corporate with a 50% risk weight may be more RoRWA-efficient.

**3. Return on Equity (RoE) and RAROC**

The ultimate measure of value creation is whether the return earned on a loan exceeds the cost of the equity capital the bank must hold against potential losses on that loan.

Risk-Adjusted Return on Capital (RAROC) is defined as:

```
RAROC = (Revenue − Funding Cost − Operating Costs − Expected Loss) / Economic Capital
```

Where:
- **Revenue** = Interest income + fee income
- **Funding Cost** = Transfer price the lending desk pays the treasury to fund the loan
- **Operating Costs** = Allocated overhead (relationship manager time, credit analyst time, systems)
- **Expected Loss** = PD × LGD × EAD (the average annual loss the bank statistically expects from this borrower)
- **Economic Capital** = The amount of capital the bank holds to absorb unexpected losses at the chosen confidence level (typically 99.9% over one year)

If RAROC > Hurdle Rate (typically 10%–15% for a major bank), the loan creates shareholder value. If RAROC < Hurdle Rate, the bank is destroying value by making that loan, unless the relationship compensates through ancillary revenue.

This is why credit risk and pricing are inseparable. Credit risk quantifies EL and Economic Capital; without these numbers, the bank cannot know whether it is making or destroying value on any individual loan.

### The Scale of Corporate Lending

To ground this in reality, HSBC's 2023 Annual Report provides the following reference points:

- Gross loans and advances to customers: approximately US$1.04 trillion
- Commercial Banking and Global Banking loans: approximately US$430–450 billion
- Expected credit loss (ECL) charges in 2023: approximately US$3.4 billion
- Net Interest Margin (Group): 1.66% (up from 1.18% in 2021, driven by rate rises)
- Credit cost of risk (Corporate/Commercial): approximately 30–45bps of average gross loans

These numbers tell a critical story: the bank lends enormous sums, earns a narrow margin, and must manage credit losses that can consume a significant fraction of that margin in a bad year. In 2009, major banks saw credit costs exceed 100bps on corporate books, wiping out years of accumulated NIM.

---

## 2. Accounting Concepts

### IFRS 9: Expected Credit Loss — The Foundation of Modern Credit Accounting

Prior to 2018, banks used IAS 39, an "incurred loss" model: you only recognised a loan loss when there was objective evidence of impairment (a missed payment, covenant breach, or bankruptcy filing). This created the infamous "too little, too late" problem: banks had massive unrecognised losses accumulating in their portfolios during the 2006–2008 credit boom, which then crystallised suddenly during the crisis.

IFRS 9 (effective 1 January 2018 in the UK and EU) replaced this with an **Expected Credit Loss** model:

**Stage 1:** The loan is performing. The bank recognises a 12-month ECL — the expected loss from default events that might occur in the next 12 months, even if there is no current evidence of stress.

**Stage 2:** There has been a "Significant Increase in Credit Risk" (SICR) since origination. The bank must now recognise a **lifetime ECL** — the expected loss over the remaining life of the loan. This is a much larger provision and a major P&L impact.

**Stage 3:** The loan is credit-impaired (equivalent to "defaulted" under Basel). Lifetime ECL continues, but interest income is calculated on the net carrying amount rather than the gross balance.

**Why this matters for credit analysts:** IFRS 9 has made SICR triggers — the criteria that move a loan from Stage 1 to Stage 2 — enormously commercially important. A mass migration of a corporate portfolio from Stage 1 to Stage 2 can destroy quarterly profits. The credit risk function defines SICR triggers (e.g., a 2-notch internal rating downgrade, a watch-list designation, an observable market signal), and those definitions directly affect reported earnings.

### Loan Accounting on the Balance Sheet

When a bank makes a commercial loan, the accounting entries are:

**At origination:**
```
Dr  Loans and Advances to Customers    £50,000,000
Cr  Customer Deposit Account / Nostro  £50,000,000
```

Simultaneously:
```
Dr  Upfront Fee Income (deferred)      £500,000  (arrangement fee received)
Cr  Loans and Advances (net of fees)   £500,000
```

The arrangement fee is not recognised as immediate income under IFRS 9/IFRS 15; it is deducted from the loan balance and amortised over the facility life using the Effective Interest Rate (EIR) method.

**The Effective Interest Rate** recalculates all contractual cashflows (interest, fees, repayments) to derive a constant yield over the loan's life. This EIR is used to accrue interest income each period:

```
Interest Income = EIR × Opening Loan Balance (net of deferred fees/costs)
```

**At each reporting date (ECL provision):**
```
Dr  Impairment Loss (P&L)             £X
Cr  Allowance for Credit Losses (B/S) £X
```

**On write-off (after recovery efforts exhausted):**
```
Dr  Allowance for Credit Losses       £X
Cr  Loans and Advances                £X
```

### Income Statement Recognition

For a standard term loan, the bank's P&L shows:
- **Interest and similar income:** Gross interest at EIR
- **Interest expense:** Cost of funding (interbank borrowing, deposits, bond issuance)
- **Net interest income:** The spread
- **Fees and commissions:** Non-EIR fees (agency fees, amendment fees)
- **Impairment charges:** ECL movements
- **Operating expenses:** Allocated credit/relationship costs
- **Profit before tax from lending**

---

## 3. Financial Concepts

### Loan Pricing Components

A commercial loan is priced by adding several components to the base rate (SONIA in sterling, SOFR in dollars, EURIBOR in euros):

| Component | Typical Range | What It Covers |
|---|---|---|
| Credit Spread / Margin | 50bps – 500bps | Compensation for credit risk (EL + risk premium) |
| Liquidity Premium | 10bps – 50bps | Cost of maintaining liquid assets against the commitment |
| Funding Cost | 15bps – 40bps above base | Treasury's internal cost of funds |
| Capital Charge | Embedded in margin | Required return on regulatory capital allocated |
| Operating Cost | Embedded in margin | Relationship and credit staff costs |

**Worked example:** Suppose a bank is pricing a £100 million 5-year term loan to a mid-market manufacturing company rated BB (internal). The loan is secured on the company's assets with 50% LGD:

- PD (5-year cumulative): 8.2% → Annual PD: ~1.7%
- Annual EL = PD × LGD × EAD = 1.7% × 50% × £100m = £850,000 per year = 85bps
- Regulatory Capital (standardised, 100% risk weight) = £100m × 8% = £8m
- Capital hurdle (15% RoE target) = £8m × 15% = £1.2m = 120bps on £100m
- Funding cost = SONIA + 30bps
- Operating costs = approximately 20bps allocated
- Required margin above SONIA = 85bps (EL) + 120bps (capital) + 20bps (costs) + 25bps (profit margin) = **250bps minimum**

This is the floor for pricing. The bank might negotiate to 200bps if the relationship has high ancillary revenue, or push to 300bps if the market allows. But below 200bps, the loan almost certainly destroys shareholder value on a standalone basis.

### Types of Credit Facilities

**Committed vs Uncommitted:**

A **committed facility** is a binding legal obligation: once the conditions precedent are met and the facility is signed, the bank must lend if the borrower draws within the agreed terms. Revolving credit facilities (RCFs) and term loans are committed.

An **uncommitted facility** — overdrafts in their pure form, certain trade finance lines — can be withdrawn at the bank's discretion without notice. This is important for credit risk: uncommitted lines are not counted in "committed" exposure, and some regulatory frameworks treat them differently for capital purposes.

**Term Loan vs Revolver:**

A **term loan** is drawn at closing and repaid according to a fixed amortisation schedule (or as a bullet). The exposure is declining (for amortising loans) and predictable. Credit risk monitoring is simpler.

A **Revolving Credit Facility (RCF)** allows the borrower to draw, repay, and redraw up to the committed limit, on a rolling basis. This creates **utilisation uncertainty** — the bank does not know how much will be drawn at any time. At the onset of a borrower's financial stress, utilisation typically spikes as the company draws on available lines to build cash. This is called the **credit conversion factor (CCF) problem**, and it is why regulators require banks to hold capital against undrawn revolver commitments.

**Overdraft:** A demand facility allowing the borrower to draw their account into a negative balance up to the overdraft limit. Legally repayable on demand but in practice used as a short-term working capital tool.

**Trade Finance Facilities:**
- **Letter of Credit (LC):** The bank guarantees payment to a seller on behalf of its buyer customer, against compliant shipping documents. Credit risk is the buyer's ability to reimburse the bank.
- **Import/Export Finance:** Finance against trade receivables or inventory; often shorter tenor (30–180 days) and self-liquidating.
- **Bank Guarantees / Standby LCs:** Contingent liabilities — the bank will only pay if the customer fails to perform an obligation. Credit risk is real but exposure is contingent.

**Bilateral vs Syndicated:**

A **bilateral loan** is between one bank and one borrower. Simple to document, execute, and manage.

A **syndicated loan** involves multiple banks (the "syndicate") sharing a single credit facility under a common set of loan documentation. One bank acts as the Mandated Lead Arranger (MLA) and Agent. Syndicated loans are used for large exposures (>£50–100m typically) where no single bank wants full concentration risk.

In a syndication, the credit risk is shared pro-rata. If the borrower defaults, each bank in the syndicate takes its share of the loss. The Agent bank coordinates payments and waivers but does not take disproportionate risk.

**Secured vs Unsecured:**

**Unsecured loans** rely solely on the borrower's promise to repay (general creditworthiness). LGD is typically high — 45%–65% or more on unsecured corporate exposures under the Basel Foundation IRB approach.

**Secured loans** are backed by collateral — property, plant, equipment, receivables, inventory, or financial assets. The collateral reduces LGD by providing a recovery source in default. A first-charge mortgage over commercial property might bring LGD down to 25%–35%, depending on the loan-to-value ratio and market conditions.

Security structures in commercial lending include:
- **Fixed charge:** Over a specific identified asset (land, building, specific equipment)
- **Floating charge:** Over a class of assets that changes over time (stock, debtors) — crystallises into a fixed charge on insolvency
- **Personal guarantee:** The directors/owners personally guarantee the company's debt — crucial for SME lending
- **Debenture:** An instrument granting both fixed and floating charges over all company assets

### The Lending Lifecycle

```
[1. ORIGINATION] → [2. UNDERWRITING] → [3. APPROVAL] → [4. BOOKING] → [5. MONITORING] → [6. EXIT]
```

**1. Origination:** The Relationship Manager (RM) identifies a lending opportunity — new client acquisition or an existing client's new requirement. The RM prepares a preliminary credit proposal ("credit memo" or "term sheet") setting out the borrower's profile, proposed facility terms, and initial view of risk.

**2. Underwriting:** The credit analyst (and/or RM) prepares the full credit application. This involves financial analysis (ratio analysis, cash flow modelling, peer benchmarking), risk assessment (industry risk, management quality, leverage, liquidity), facility structuring (covenants, security), and pricing. The internal risk rating is assigned.

**3. Approval:** The credit application goes to the Credit Committee (or individual Credit Officer with the requisite sanctioning authority). Approval authorities are tiered by exposure size and risk grade — a £1m loan to an investment-grade borrower might be approved by a single Senior Credit Officer, while a £200m leveraged buyout requires a senior Credit Committee with board-level sign-off.

**4. Booking:** On approval, legal documentation is finalised (facility agreement, security documents, conditions precedent). Once conditions are satisfied (legal opinions, insurance certificates, account opening), the loan is "booked" in the core banking system. ECL is calculated and a Day 1 provision is recognised.

**5. Monitoring:** The credit team monitors the loan throughout its life:
- Financial covenant testing (quarterly or semi-annually)
- Annual credit review / renewal
- Management accounts and audited financial review
- Industry and news monitoring
- Early Warning Indicators (EWI) — behavioural signals suggesting stress (missed payments on other obligations, covenant headroom shrinking, utilisation spikes)

**6. Exit:** The loan exits the portfolio by:
- **Scheduled maturity** (repaid in full)
- **Early repayment** (refinanced by borrower or competitor)
- **Default and recovery** (restructuring, administration, receivership, write-off)
- **Sale** (secondary loan market or securitisation)

---

## 4. Statistical Concepts

### Probability of Default (PD)

PD is the probability that a borrower will fail to meet its contractual obligations within a defined time horizon (typically one year for regulatory capital, lifetime for IFRS 9 ECL). PD is estimated using:

**Rating-Based PD:** Internal credit ratings are mapped to empirical default rates observed historically for borrowers in that rating category. For example, Moody's observational data shows that Baa3-rated bonds have historically defaulted at ~0.2%–0.5% per year, while B2-rated borrowers default at ~4%–6% per year.

**Through-the-Cycle (TtC) vs Point-in-Time (PiT):**
- **TtC PD** represents the average PD across a full economic cycle. Used for regulatory capital under the IRB approach. More stable, less sensitive to economic conditions.
- **PiT PD** represents the best current estimate of the borrower's default risk given current economic conditions. Used for IFRS 9 ECL. More volatile — PiT PDs rise sharply in recessions.

**Transition Matrices:** The probability of moving from one rating grade to another over one year. A Baa3 borrower might have a 70% chance of staying Baa3, 10% chance of upgrading to Baa2, 15% chance of downgrading to Ba1, and 5% chance of going directly to default.

### Loss Given Default (LGD)

LGD is the fraction of Exposure at Default that is lost when a borrower defaults. It equals 1 − Recovery Rate.

LGD depends on:
- **Seniority:** Senior secured debt typically has lower LGD (20%–40%) than subordinated debt (50%–80%) or equity (effectively 100% in bankruptcy).
- **Collateral quality and enforceability:** First-charge real estate with LTV < 60% supports very low LGD. Floating charge over stock in a distressed retailer may recover very little.
- **Industry:** Capital-intensive industries (energy, shipping) often have higher recovery rates on secured debt because assets can be sold. Service businesses with mostly intangible assets often have poor recoveries.
- **Legal jurisdiction:** UK administration/receivership processes and US Chapter 11 processes tend to support better recoveries than some civil law jurisdictions.

### Exposure at Default (EAD)

EAD is the bank's exposure at the moment of default. For a fully drawn term loan, EAD ≈ outstanding balance. For a revolver, EAD is uncertain — borrowers typically draw more heavily on available lines as they approach financial distress.

EAD for revolving facilities = Drawn Balance + (Undrawn Commitment × Credit Conversion Factor)

The Credit Conversion Factor (CCF) under Basel standardised approach is 40% for committed undrawn revolvers (i.e., assume 40% of the undrawn amount will be drawn before default). Under IRB, banks estimate CCF empirically from observed default data.

### Expected Loss (EL) and Unexpected Loss (UL)

```
Expected Loss = PD × LGD × EAD
```

EL is the mean loss the bank statistically expects from a loan over a given period. It is NOT a reason not to make the loan — it is the long-run average cost of credit, which must be priced into the loan margin. If the bank charges a margin that exceeds EL + funding cost + operating cost, it makes a sustainable profit.

**Unexpected Loss (UL)** is the variability of losses around the expected value. In a bad year, losses might be 3× the expected level. UL is what capital is held against. The bank holds capital to cover losses at a high confidence level (99.9% VaR), ensuring that even in very adverse scenarios, the bank can absorb losses without becoming insolvent.

Capital ≈ (Loss at 99.9th Percentile) − Expected Loss

This is why economic capital is the denominator in RAROC: capital absorbs the tail risk, not the average risk.

### Correlation and Portfolio Risk

A critical insight: the risk of a portfolio of loans is not simply the sum of individual ELs. If loans are correlated — tend to default together in the same economic scenario — the portfolio has higher tail risk than if defaults were independent.

During the 2008–2009 crisis, correlations that had been estimated as low during benign years spiked. Loans that appeared diversified (geographically, by sector) defaulted together because they shared exposure to the same macro factor: a global credit crunch and recession. This is the systemic risk that drives the correlation assumptions in Basel's IRB formula.

Portfolio managers use correlation to calculate **portfolio Unexpected Loss** and to set concentration limits — the maximum exposure to any single name, industry, or geography — to avoid over-correlated portfolios.

---

## 5. Regulatory Framework

### Basel III / Basel IV Capital Framework

The Basel Accords (issued by the Basel Committee on Banking Supervision, BCBS) set international minimum standards for bank capital. The current framework is Basel III, being implemented through CRR II/CRR III in Europe and through PRA rules in the UK, with the Basel IV revisions scheduled for phased implementation from 2025–2028.

**Three Pillars:**

**Pillar 1 — Minimum Capital Requirements**

Banks must hold capital at least equal to:
- **Credit Risk Capital:** 8% × Risk-Weighted Assets (with a minimum Tier 1 ratio of 6%)
- **Market Risk Capital:** For trading book positions
- **Operational Risk Capital:** For operational failures

For commercial loans under the **Standardised Approach (SA):**
- Risk weight depends on external credit rating (if available for the counterparty or the sovereign)
- Unrated corporates: 100% risk weight under Basel III SA (Basel IV introduces a 65% weight for "investment grade" unrated corporates)
- Capital requirement per £1 of unrated corporate loan = £1 × 100% × 8% = 8 pence

Under the **Internal Ratings-Based (IRB) Approach** (requires regulatory approval):
- Banks use their own PD estimates (Foundation IRB) or PD, LGD, and EAD estimates (Advanced IRB) to calculate risk weights using the Basel supervisory formula
- Risk weights are more sensitive to actual credit quality — a AAA-rated corporate has a much lower IRB risk weight than a CCC-rated one
- This creates strong incentives to improve internal credit rating quality

**Pillar 2 — Supervisory Review Process (SREP)**

The PRA/ECB/Fed conducts the Supervisory Review and Evaluation Process annually. Regulators assess whether the bank's capital model, governance, and risk management are adequate. They can impose additional capital requirements above Pillar 1 minimums ("Pillar 2A") or capital guidance ("Pillar 2B").

**Pillar 3 — Market Disclosure**

Banks must publish detailed disclosures about their risk exposures, capital ratios, and risk management frameworks, enabling market discipline through informed investor decisions.

### Capital Buffers

Above the minimum 8% RWA capital requirement, banks must hold additional buffers:
- **Capital Conservation Buffer:** 2.5% of RWA — restricts dividends and bonuses if breached
- **Countercyclical Capital Buffer (CCyB):** Set by national authorities, currently 1%–2% in the UK — released during crises to support lending
- **G-SIB/D-SIB Buffer:** Additional buffer for systemically important banks (HSBC holds a 3.5% G-SIB surcharge)
- **Total Capital Requirement (HSBC example 2023):** ~18%–20% of RWA total

### Large Exposure Limits

A bank cannot have a single counterparty exposure exceeding 25% of Tier 1 capital. For a bank with £50bn Tier 1, this means no single group exposure above £12.5bn. This drives syndication (spreading large loans across multiple banks) and portfolio concentration management.

### IFRS 9 Interaction with Capital

Banks must deduct a portion of IFRS 9 ECL provisions from regulatory capital (specifically, the difference between IFRS 9 provisions and the "regulatory expected loss" under IRB). This creates a direct link between the accounting provisions calculated by the credit risk team and the bank's regulatory capital position — another reason why IFRS 9 modelling accuracy matters enormously to CFOs and Capital Officers.

---

## 6. Data Required

### Data at Origination

| Category | Data Element | Source |
|---|---|---|
| Borrower Identity | Legal name, registered number, LEI, jurisdiction | Companies House / registry |
| Financial | Audited P&L, balance sheet, cash flow (3 years minimum) | Audited accounts |
| Financial | Management accounts (YTD) | Customer / RM |
| Financial | Financial projections / base case model | Customer / RM |
| Ownership | Group structure chart, UBO identification | KYC pack |
| Credit History | Credit bureau enquiries, existing bank relationships, payment history | Credit agency, RM |
| Industry | SIC/NACE code, industry risk assessment, market position | Analyst research |
| Security | Asset valuations (property, equipment), legal title searches | Valuers, solicitors |
| Pricing | Internal transfer price, risk-free rate, target margin | Treasury system |
| Rating | Internal credit risk rating | Credit rating model output |

### Data Throughout the Life of the Loan

- Quarterly management accounts (covenant testing)
- Annual audited financial statements
- Monthly bank statement analysis (utilisation, cashflows)
- Annual credit review documentation
- Covenant compliance certificates
- Early Warning Indicator flags (behavioural, financial, market)
- Collateral revaluations (typically annual for property)
- PD/LGD updates from rating model

### Systems That Hold This Data

- **Core Banking System (CBS):** Live loan positions, payment records, balances
- **Credit Management System (CMS):** Credit application, approval, conditions
- **Risk Data Warehouse:** ECL calculations, RWA, portfolio reporting
- **Customer Relationship Management (CRM):** Relationship history, contacts, cross-sell
- **Document Management System (DMS):** KYC documents, facility agreements, valuations
- **Early Warning System (EWS):** Automated monitoring triggers

---

## 7. How Analysts Actually Work

### The Credit Memo / Credit Application

The primary deliverable of a credit analyst is the **Credit Application** (sometimes called a Credit Memo, Credit Paper, or Credit Proposal). This document — typically 15–50 pages for a mid-market lending decision — must tell a complete story:

1. **Executive Summary:** Borrower, facility, amount, tenor, purpose, pricing, risk rating, approval recommendation
2. **Borrower Overview:** Business description, management, history, market position
3. **Industry Analysis:** Sector risks, competitive dynamics, regulatory environment
4. **Financial Analysis:** Historical performance (3–5 years), trend analysis, key ratios, covenant headroom
5. **Financial Projections:** Base case and stress case; how does the borrower perform if revenues fall 15%? If interest rates rise 200bps?
6. **Facility Structure:** Terms, conditions, security, covenants, pricing rationale
7. **Risk Summary:** Key risks, mitigants, and why the bank is comfortable lending
8. **Conditions and Recommendations**

### Financial Ratio Analysis in Practice

Credit analysts focus on ratios that measure debt serviceability, leverage, and liquidity:

**Leverage:**
- Net Debt / EBITDA: The primary leverage metric. ≤ 3.0× considered moderate; 4.0–6.0× for leveraged buyouts; >6.0× triggers heightened scrutiny
- Total Debt / Equity: Used for balance sheet leverage assessment
- Debt / EBITDA (gross): When cash holdings are not ring-fenced

**Debt Service Coverage:**
- DSCR = EBITDA / (Interest + Current Portion of Long-Term Debt): Should be > 1.25× for comfortable coverage; < 1.0× means the borrower cannot service debt from operations
- Interest Coverage Ratio = EBIT / Interest Expense: Should be > 2.5×–3.0× for investment-grade borrowers

**Liquidity:**
- Current Ratio = Current Assets / Current Liabilities: > 1.0× indicates positive working capital
- Quick Ratio = (Cash + Receivables) / Current Liabilities: Strips out inventory
- Free Cash Flow = Operating Cash Flow − Capex: The ultimate measure of debt repayment capacity

**Quality of Earnings:**
Analysts interrogate EBITDA quality. Common adjustments:
- Add back one-time restructuring charges (genuine non-recurring)
- Remove EBITDA from discontinued operations
- Adjust for capitalised vs expensed costs (some companies expense R&D, others capitalise)
- Look at cash conversion: EBITDA − ΔWorking Capital − Capex = Free Cash Flow; companies with poor working capital management or high maintenance capex have lower cash conversion despite strong reported EBITDA

### Covenant Structuring

Financial covenants create contractual early warning systems. If a borrower's financial performance deteriorates past agreed thresholds, a covenant breach gives the bank:
- The right to call an event of default (accelerate the loan)
- More practically: the right to renegotiate terms (repricing, additional security, equity injection)

Common financial covenants:
- **Maximum Leverage:** Net Debt / EBITDA ≤ 3.5× tested quarterly
- **Minimum Interest Cover:** EBIT / Net Finance Charges ≥ 3.0× tested semi-annually
- **Minimum Liquidity:** Minimum cash balance ≥ £X million at all times
- **Capital Expenditure Limit:** Annual capex ≤ £Y million (prevents excessive cash consumption)

**Covenant headroom** — the buffer between actual performance and the covenant threshold — is a key monitoring metric. Credit analysts typically want to see > 15%–20% headroom under base case projections. A company currently at 3.0× leverage with a 3.5× covenant has 17% headroom. If EBITDA declines 10%, it will be at 3.33× — still compliant, but with thin headroom.

---

## 8. Excel Implementation

### RAROC Calculator — Step-by-Step Build

This model allows a credit analyst to price a loan by working backwards from a target RAROC.

**Sheet 1: Inputs**

```
Cell B2:  Loan Amount (£)                    100,000,000
Cell B3:  Facility Tenor (years)             5
Cell B4:  Facility Type                      Term Loan
Cell B5:  Drawn Amount (£)                   100,000,000
Cell B6:  Undrawn Amount (£)                 0
Cell B7:  Loan Margin (bps above SONIA)      225
Cell B8:  SONIA (current, %)                 5.20%
Cell B9:  Arrangement Fee (%)                1.00%
Cell B10: Annual Commitment Fee (bps)        40
Cell B11: Internal Transfer Price (bps)      30
Cell B12: Operating Cost Allocation (bps)    25
Cell B13: PD (annual, %)                     1.70%
Cell B14: LGD (%)                            50%
Cell B15: Risk Weight (%)                    100%
Cell B16: Core Capital Ratio (%)             8%
Cell B17: Capital Surcharge (%)              2%
Cell B18: Target RAROC (%)                   15%
```

**Sheet 2: Calculations**

```
Row 2: Header labels in column A, Formulae in column B

Annual Gross Interest Income (£):
= B5 * (B8/100 + B7/10000)
→ £100m × (5.20% + 2.25%) = £7,450,000

Annual Arrangement Fee Amortised (£):
= (B2 * B9/100) / B3
→ (£100m × 1%) / 5 = £200,000

Annual Commitment Fee (£):
= B6 * B10/10000
→ £0 (fully drawn)

Total Annual Revenue (£):
= Sum of above three items
→ £7,650,000

Annual Funding Cost (£):
= B5 * (B8/100 + B11/10000)
→ £100m × (5.20% + 0.30%) = £5,500,000

Net Interest Income (£):
= Revenue - Funding Cost
→ £7,650,000 - £5,500,000 = £2,150,000

Annual Operating Costs (£):
= B5 * B12/10000
→ £100m × 0.25% = £250,000

Annual Expected Loss (£):
= B5 * (B13/100) * (B14/100)
→ £100m × 1.70% × 50% = £850,000

Risk-Adjusted Net Revenue (£):
= NII - Operating Costs - Expected Loss
→ £2,150,000 - £250,000 - £850,000 = £1,050,000

Regulatory Capital Required (£):
= B5 * (B15/100) * ((B16+B17)/100)
→ £100m × 100% × 10% = £10,000,000

RAROC (%):
= Risk-Adjusted Net Revenue / Regulatory Capital
→ £1,050,000 / £10,000,000 = 10.5%

RAROC vs Target:
= IF(RAROC >= B18, "ACCEPT", "BELOW HURDLE — REPRICE OR DECLINE")
→ "BELOW HURDLE — REPRICE OR DECLINE" (10.5% < 15%)
```

**Sheet 3: Sensitivity Table**

Use Excel Data Table (What-If Analysis) to show RAROC across a matrix of Loan Margin (rows: 150bps to 350bps in 25bps steps) and PD (columns: 0.5% to 3.0% in 0.5% steps).

```
Data Table setup:
- Row input cell: B7 (Loan Margin)
- Column input cell: B13 (PD)
- Result cell: RAROC formula cell

Conditional formatting: Red for RAROC < 10%, Amber for 10-15%, Green for > 15%
```

This tells the analyst: "For a borrower with 1.7% PD, we need a minimum margin of 275bps to achieve 15% RAROC."

**Sheet 4: Minimum Margin Calculator**

Use Goal Seek (or an algebraic solve) to find the minimum margin at which RAROC = Target RAROC:

```
Required Risk-Adjusted Revenue = Target RAROC × Capital = 15% × £10m = £1,500,000

Required NII = Required Risk-Adjusted Revenue + Operating Costs + Expected Loss
             = £1,500,000 + £250,000 + £850,000 = £2,600,000

Required Gross Revenue = Required NII + Funding Cost
                       = £2,600,000 + £5,500,000 = £8,100,000

Required All-in Rate = £8,100,000 / £100,000,000 = 8.10%

Minimum Margin = All-in Rate - SONIA = 8.10% - 5.20% = 2.90% = 290bps
```

---

## 9. SQL Implementation

### Schema Assumptions

```sql
-- Key tables assumed in a bank's Risk Data Warehouse:
-- LOANS: loan-level attributes and balances
-- CUSTOMERS: borrower master data
-- ECL_PARAMETERS: PD, LGD, EAD by loan and reporting period
-- SEGMENTS: segment master (SME, Mid-Market, Large Corporate, etc.)
-- RISK_RATINGS: internal credit ratings history
```

### Query 1: Portfolio-Level NIM by Segment

```sql
/*
 * Purpose: Calculate Net Interest Margin and Expected Loss Cost of Risk
 *          by customer segment for the current quarter.
 * Context: Used in monthly Portfolio Management Committee reporting.
 */

WITH loan_revenue AS (
    SELECT
        l.loan_id,
        s.segment_name,
        l.drawn_balance_gbp,
        l.undrawn_commitment_gbp,
        -- Gross interest income: margin + base rate on drawn balance
        l.drawn_balance_gbp
            * (l.loan_margin_bps + l.base_rate_bps)
            / 10000.0 / 4.0                             AS quarterly_interest_income,

        -- Commitment fee income on undrawn portion
        l.undrawn_commitment_gbp
            * l.commitment_fee_bps
            / 10000.0 / 4.0                             AS quarterly_commitment_fee,

        -- Funding cost: internal transfer price on drawn balance
        l.drawn_balance_gbp
            * (l.itp_bps + l.base_rate_bps)
            / 10000.0 / 4.0                             AS quarterly_funding_cost,

        -- Expected Loss (annualised, divided by 4 for quarter)
        ep.pd_annual * ep.lgd * ep.ead_gbp / 4.0        AS quarterly_expected_loss,

        ep.ead_gbp,
        l.reporting_date
    FROM loans l
    INNER JOIN segments s
        ON l.segment_code = s.segment_code
    INNER JOIN ecl_parameters ep
        ON l.loan_id = ep.loan_id
        AND l.reporting_date = ep.reporting_date
    WHERE
        l.reporting_date = '2023-12-31'
        AND l.loan_status = 'ACTIVE'
),

portfolio_summary AS (
    SELECT
        segment_name,
        COUNT(loan_id)                                  AS loan_count,
        SUM(drawn_balance_gbp) / 1e6                    AS drawn_balance_gbpm,
        SUM(ead_gbp) / 1e6                              AS ead_gbpm,

        -- NII = Interest Income + Fee Income - Funding Cost
        SUM(quarterly_interest_income
            + quarterly_commitment_fee
            - quarterly_funding_cost) / 1e6             AS quarterly_nii_gbpm,

        -- Annualised NIM = (4 × Quarterly NII) / Average EAD
        (SUM(quarterly_interest_income
             + quarterly_commitment_fee
             - quarterly_funding_cost) * 4.0)
        / NULLIF(SUM(ead_gbp), 0) * 100.0              AS nim_percent,

        -- Expected Loss Cost of Risk (annualised, in bps of EAD)
        (SUM(quarterly_expected_loss) * 4.0)
        / NULLIF(SUM(ead_gbp), 0) * 10000.0            AS el_cost_of_risk_bps,

        -- Net Risk-Adjusted NIM after EL
        (SUM(quarterly_interest_income
             + quarterly_commitment_fee
             - quarterly_funding_cost
             - quarterly_expected_loss) * 4.0)
        / NULLIF(SUM(ead_gbp), 0) * 100.0              AS risk_adj_nim_percent

    FROM loan_revenue
    GROUP BY segment_name
)

SELECT
    segment_name,
    loan_count,
    ROUND(drawn_balance_gbpm, 1)                        AS drawn_balance_gbpm,
    ROUND(ead_gbpm, 1)                                  AS ead_gbpm,
    ROUND(quarterly_nii_gbpm, 2)                        AS quarterly_nii_gbpm,
    ROUND(nim_percent, 2)                               AS nim_pct,
    ROUND(el_cost_of_risk_bps, 1)                       AS el_cor_bps,
    ROUND(risk_adj_nim_percent, 2)                      AS risk_adj_nim_pct,

    -- Margin adequacy flag
    CASE
        WHEN risk_adj_nim_percent >= 1.50               THEN 'ADEQUATE'
        WHEN risk_adj_nim_percent >= 0.75               THEN 'MARGINAL'
        ELSE 'INADEQUATE — REVIEW PRICING'
    END                                                 AS margin_adequacy_flag

FROM portfolio_summary
ORDER BY ead_gbpm DESC;
```

### Query 2: RAROC by Individual Loan

```sql
/*
 * Purpose: Calculate loan-level RAROC for the current portfolio.
 * Used by: Credit Portfolio Management for pricing adequacy reviews.
 */

SELECT
    l.loan_id,
    c.customer_name,
    s.segment_name,
    r.internal_rating,
    l.drawn_balance_gbp / 1e6                           AS drawn_gbpm,
    l.loan_margin_bps,
    ep.pd_annual * 100.0                                AS pd_pct,
    ep.lgd * 100.0                                      AS lgd_pct,

    -- Annual Expected Loss (£)
    ep.pd_annual * ep.lgd * ep.ead_gbp                  AS annual_el_gbp,

    -- Annual Risk-Adjusted Revenue (£)
    (l.drawn_balance_gbp * l.loan_margin_bps / 10000.0)     -- NII
    + (l.drawn_balance_gbp * l.arrangement_fee_pct / 100.0
        / NULLIF(l.original_tenor_years, 0))                -- Amortised fee
    - (l.drawn_balance_gbp * l.operating_cost_bps / 10000.0) -- Opex
    - (ep.pd_annual * ep.lgd * ep.ead_gbp)                  -- EL
                                                        AS risk_adj_revenue_gbp,

    -- Regulatory Capital (£)
    ep.ead_gbp * (l.risk_weight_pct / 100.0) * 0.10    AS reg_capital_gbp,

    -- RAROC (%)
    CASE
        WHEN ep.ead_gbp * (l.risk_weight_pct / 100.0) * 0.10 > 0 THEN
            (
                (l.drawn_balance_gbp * l.loan_margin_bps / 10000.0)
                + (l.drawn_balance_gbp * l.arrangement_fee_pct / 100.0
                    / NULLIF(l.original_tenor_years, 0))
                - (l.drawn_balance_gbp * l.operating_cost_bps / 10000.0)
                - (ep.pd_annual * ep.lgd * ep.ead_gbp)
            )
            / (ep.ead_gbp * (l.risk_weight_pct / 100.0) * 0.10)
            * 100.0
        ELSE NULL
    END                                                 AS raroc_pct,

    CASE
        WHEN (
            (l.drawn_balance_gbp * l.loan_margin_bps / 10000.0
             - ep.pd_annual * ep.lgd * ep.ead_gbp)
             / NULLIF(ep.ead_gbp * l.risk_weight_pct / 100.0 * 0.10, 0)
             * 100.0
        ) >= 15.0                                       THEN 'VALUE CREATING'
        WHEN (
            (l.drawn_balance_gbp * l.loan_margin_bps / 10000.0
             - ep.pd_annual * ep.lgd * ep.ead_gbp)
             / NULLIF(ep.ead_gbp * l.risk_weight_pct / 100.0 * 0.10, 0)
             * 100.0
        ) >= 10.0                                       THEN 'BORDERLINE'
        ELSE 'BELOW HURDLE'
    END                                                 AS raroc_category

FROM loans l
INNER JOIN customers c       ON l.customer_id    = c.customer_id
INNER JOIN segments s        ON l.segment_code   = s.segment_code
INNER JOIN risk_ratings r    ON l.loan_id        = r.loan_id
    AND r.rating_date        = (
        SELECT MAX(rating_date)
        FROM risk_ratings r2
        WHERE r2.loan_id = l.loan_id
        AND r2.rating_date <= l.reporting_date
    )
INNER JOIN ecl_parameters ep ON l.loan_id        = ep.loan_id
    AND ep.reporting_date    = l.reporting_date
WHERE
    l.reporting_date         = '2023-12-31'
    AND l.loan_status        = 'ACTIVE'
ORDER BY raroc_pct ASC;  -- Most value-destroying loans first
```

---

## 10. Python Implementation

### RAROC Sensitivity Model

```python
"""
RAROC Sensitivity Model for Commercial Lending
==============================================
Calculates RAROC across ranges of PD, LGD, and Loan Margin.
Produces a heatmap and identifies minimum margin requirements.

Author: Credit Risk Academy — Module 01
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
from itertools import product


# ─────────────────────────────────────────────
# 1. Loan Parameters (Base Case)
# ─────────────────────────────────────────────

class LoanParameters:
    """Encapsulates all inputs needed to calculate RAROC on a single loan."""

    def __init__(
        self,
        loan_amount: float = 100_000_000,   # £100m
        drawn_pct: float = 1.0,             # 100% drawn
        margin_bps: float = 225,            # 225bps over base rate
        base_rate_pct: float = 5.20,        # SONIA
        arrangement_fee_pct: float = 1.0,   # 1% upfront, amortised
        tenor_years: int = 5,
        commitment_fee_bps: float = 40,     # On undrawn
        itp_bps: float = 30,                # Internal Transfer Price (funding cost spread)
        operating_cost_bps: float = 25,     # Allocated overhead
        pd_annual: float = 0.017,           # 1.7% annual PD
        lgd: float = 0.50,                  # 50% LGD
        risk_weight_pct: float = 100.0,     # 100% standardised RW
        capital_ratio: float = 0.10,        # 8% min + 2% buffer = 10%
        hurdle_rate: float = 0.15,          # 15% target RAROC
    ):
        self.loan_amount = loan_amount
        self.drawn_pct = drawn_pct
        self.margin_bps = margin_bps
        self.base_rate_pct = base_rate_pct
        self.arrangement_fee_pct = arrangement_fee_pct
        self.tenor_years = tenor_years
        self.commitment_fee_bps = commitment_fee_bps
        self.itp_bps = itp_bps
        self.operating_cost_bps = operating_cost_bps
        self.pd_annual = pd_annual
        self.lgd = lgd
        self.risk_weight_pct = risk_weight_pct
        self.capital_ratio = capital_ratio
        self.hurdle_rate = hurdle_rate

    @property
    def drawn_balance(self) -> float:
        return self.loan_amount * self.drawn_pct

    @property
    def undrawn_balance(self) -> float:
        return self.loan_amount * (1 - self.drawn_pct)

    @property
    def ead(self) -> float:
        """EAD = Drawn + (Undrawn × CCF); CCF assumed 40% for revolvers."""
        ccf = 0.40
        return self.drawn_balance + self.undrawn_balance * ccf


# ─────────────────────────────────────────────
# 2. RAROC Calculator
# ─────────────────────────────────────────────

def calculate_raroc(params: LoanParameters, margin_bps: float = None,
                    pd: float = None, lgd: float = None) -> dict:
    """
    Calculate RAROC for a loan given optional parameter overrides.
    Returns a dictionary of all intermediate calculations.
    """
    # Allow overrides for sensitivity analysis
    effective_margin = margin_bps if margin_bps is not None else params.margin_bps
    effective_pd     = pd        if pd        is not None else params.pd_annual
    effective_lgd    = lgd       if lgd       is not None else params.lgd

    # Revenue
    all_in_rate         = (params.base_rate_pct / 100) + (effective_margin / 10000)
    gross_interest      = params.drawn_balance * all_in_rate
    amortised_fee       = (params.loan_amount * params.arrangement_fee_pct / 100) \
                          / params.tenor_years
    commitment_fee      = params.undrawn_balance * params.commitment_fee_bps / 10000
    total_revenue       = gross_interest + amortised_fee + commitment_fee

    # Costs
    funding_rate        = (params.base_rate_pct / 100) + (params.itp_bps / 10000)
    funding_cost        = params.drawn_balance * funding_rate
    operating_cost      = params.drawn_balance * params.operating_cost_bps / 10000

    # Net Interest Income
    nii                 = total_revenue - funding_cost

    # Expected Loss
    expected_loss       = effective_pd * effective_lgd * params.ead

    # Risk-Adjusted Revenue
    risk_adj_revenue    = nii - operating_cost - expected_loss

    # Regulatory Capital
    reg_capital         = params.ead * (params.risk_weight_pct / 100) * params.capital_ratio

    # RAROC
    raroc               = risk_adj_revenue / reg_capital if reg_capital > 0 else np.nan

    return {
        "margin_bps":        effective_margin,
        "pd_pct":            effective_pd * 100,
        "lgd_pct":           effective_lgd * 100,
        "gross_interest":    gross_interest,
        "amortised_fee":     amortised_fee,
        "total_revenue":     total_revenue,
        "funding_cost":      funding_cost,
        "nii":               nii,
        "operating_cost":    operating_cost,
        "expected_loss":     expected_loss,
        "risk_adj_revenue":  risk_adj_revenue,
        "reg_capital":       reg_capital,
        "raroc":             raroc,
        "above_hurdle":      raroc >= params.hurdle_rate if not np.isnan(raroc) else False,
        "nim_bps":           (nii / params.drawn_balance) * 10000,
        "el_bps":            (expected_loss / params.ead) * 10000,
    }


# ─────────────────────────────────────────────
# 3. Base Case Output
# ─────────────────────────────────────────────

def print_raroc_report(result: dict, params: LoanParameters) -> None:
    """Print a formatted RAROC summary report."""
    fmt_m = lambda x: f"£{x/1e6:,.2f}m"
    fmt_p = lambda x: f"{x:.2f}%"
    fmt_b = lambda x: f"{x:.0f}bps"

    print("=" * 60)
    print("  COMMERCIAL LOAN — RAROC ANALYSIS")
    print("=" * 60)
    print(f"  Loan Amount:          {fmt_m(params.loan_amount)}")
    print(f"  Margin:               {fmt_b(result['margin_bps'])}")
    print(f"  PD (Annual):          {fmt_p(result['pd_pct'])}")
    print(f"  LGD:                  {fmt_p(result['lgd_pct'])}")
    print("-" * 60)
    print(f"  Gross Interest:       {fmt_m(result['gross_interest'])}")
    print(f"  Amortised Fee:        {fmt_m(result['amortised_fee'])}")
    print(f"  Total Revenue:        {fmt_m(result['total_revenue'])}")
    print(f"  Funding Cost:         {fmt_m(result['funding_cost'])}")
    print(f"  NII:                  {fmt_m(result['nii'])}  ({fmt_b(result['nim_bps'])})")
    print(f"  Operating Cost:       {fmt_m(result['operating_cost'])}")
    print(f"  Expected Loss:        {fmt_m(result['expected_loss'])}  ({fmt_b(result['el_bps'])})")
    print(f"  Risk-Adj Revenue:     {fmt_m(result['risk_adj_revenue'])}")
    print(f"  Regulatory Capital:   {fmt_m(result['reg_capital'])}")
    print(f"  RAROC:                {fmt_p(result['raroc'] * 100)}")
    print(f"  Hurdle Rate:          {fmt_p(params.hurdle_rate * 100)}")
    print(f"  Decision:             {'✓ ABOVE HURDLE' if result['above_hurdle'] else '✗ BELOW HURDLE'}")
    print("=" * 60)


# ─────────────────────────────────────────────
# 4. Minimum Margin Calculator
# ─────────────────────────────────────────────

def find_minimum_margin(params: LoanParameters, pd: float = None,
                        lgd: float = None, precision_bps: float = 1.0) -> float:
    """
    Binary search to find the minimum loan margin (in bps) at which
    RAROC equals the hurdle rate.
    """
    low, high = 0.0, 1000.0  # Search range: 0–1000bps
    while (high - low) > precision_bps:
        mid = (low + high) / 2
        result = calculate_raroc(params, margin_bps=mid, pd=pd, lgd=lgd)
        if result["raroc"] >= params.hurdle_rate:
            high = mid
        else:
            low = mid
    return round((low + high) / 2, 1)


# ─────────────────────────────────────────────
# 5. Sensitivity Analysis — Heatmap
# ─────────────────────────────────────────────

def build_raroc_heatmap(
    params: LoanParameters,
    margins: list = None,
    pds: list = None,
    save_path: str = "raroc_heatmap.png"
) -> pd.DataFrame:
    """
    Build a RAROC heatmap showing RAROC% across margin (rows)
    and PD (columns). Highlights cells meeting the hurdle rate.
    """
    if margins is None:
        margins = list(range(100, 401, 25))   # 100bps to 400bps
    if pds is None:
        pds = [0.25, 0.50, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0]  # % PD

    # Build matrix
    data = {}
    for pd_val in pds:
        col = {}
        for margin in margins:
            result = calculate_raroc(params, margin_bps=margin, pd=pd_val / 100)
            col[margin] = round(result["raroc"] * 100, 1)
        data[f"PD={pd_val:.2f}%"] = col

    df = pd.DataFrame(data)
    df.index.name = "Margin (bps)"

    # Plot heatmap
    fig, ax = plt.subplots(figsize=(14, 9))
    cmap = plt.cm.RdYlGn
    im = ax.imshow(df.values, cmap=cmap, aspect="auto", vmin=0, vmax=30)

    ax.set_xticks(range(len(df.columns)))
    ax.set_xticklabels(df.columns, rotation=45, ha="right", fontsize=9)
    ax.set_yticks(range(len(df.index)))
    ax.set_yticklabels([f"{m}bps" for m in df.index], fontsize=9)

    # Annotate cells
    for i in range(len(df.index)):
        for j in range(len(df.columns)):
            val = df.values[i, j]
            colour = "white" if val < 8 or val > 22 else "black"
            text = f"{val:.1f}%"
            if val >= params.hurdle_rate * 100:
                text = f"✓{val:.1f}%"
            ax.text(j, i, text, ha="center", va="center",
                    fontsize=7.5, color=colour, fontweight="bold"
                    if val >= params.hurdle_rate * 100 else "normal")

    plt.colorbar(im, ax=ax, label="RAROC (%)")
    ax.set_title(
        f"RAROC Sensitivity: Margin vs PD  |  "
        f"Hurdle = {params.hurdle_rate*100:.0f}%  |  LGD = {params.lgd*100:.0f}%  |  "
        f"RW = {params.risk_weight_pct:.0f}%",
        fontsize=12, fontweight="bold", pad=15
    )
    ax.set_xlabel("Annual PD", fontsize=11)
    ax.set_ylabel("Loan Margin (bps above base rate)", fontsize=11)

    plt.tight_layout()
    plt.savefig(save_path, dpi=150, bbox_inches="tight")
    plt.close()
    print(f"Heatmap saved to: {save_path}")

    return df


# ─────────────────────────────────────────────
# 6. Minimum Margin Schedule
# ─────────────────────────────────────────────

def minimum_margin_schedule(
    params: LoanParameters,
    pds: list = None,
    lgds: list = None
) -> pd.DataFrame:
    """
    Build a table showing the minimum margin required to hit the hurdle rate
    for every PD × LGD combination. Used for pricing floors in credit policy.
    """
    if pds is None:
        pds = [0.25, 0.50, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0]
    if lgds is None:
        lgds = [0.25, 0.35, 0.45, 0.55, 0.65, 0.75]

    rows = []
    for pd_val, lgd_val in product(pds, lgds):
        min_margin = find_minimum_margin(params, pd=pd_val / 100, lgd=lgd_val)
        rows.append({
            "PD (%)": pd_val,
            "LGD (%)": lgd_val * 100,
            "Min Margin (bps)": min_margin,
            "Min All-In Rate (%)": round(
                params.base_rate_pct + min_margin / 100, 2
            ),
        })

    df = pd.DataFrame(rows)
    pivot = df.pivot(index="PD (%)", columns="LGD (%)", values="Min Margin (bps)")
    return pivot


# ─────────────────────────────────────────────
# 7. Main — Run All Analysis
# ─────────────────────────────────────────────

if __name__ == "__main__":

    # Base case loan
    params = LoanParameters(
        loan_amount=100_000_000,
        margin_bps=225,
        pd_annual=0.017,
        lgd=0.50,
        risk_weight_pct=100.0,
    )

    # Base case RAROC
    result = calculate_raroc(params)
    print_raroc_report(result, params)

    # Minimum margin at base case PD/LGD
    min_margin = find_minimum_margin(params)
    print(f"\nMinimum margin to achieve {params.hurdle_rate*100:.0f}% RAROC: {min_margin}bps")
    print(f"Current margin ({params.margin_bps}bps) is "
          f"{'ABOVE' if params.margin_bps >= min_margin else 'BELOW'} minimum.\n")

    # Minimum margin schedule
    print("Minimum Margin Schedule (bps) — PD × LGD:\n")
    schedule = minimum_margin_schedule(params)
    print(schedule.to_string())

    # RAROC heatmap (saves to file)
    df_heatmap = build_raroc_heatmap(params)
```

---

## 11. Interview Questions

### Technical Questions

**Q1: "Explain RAROC and how it differs from simple return on assets."**

*What a strong answer covers:* RAROC adjusts the numerator for expected losses (giving the risk-adjusted return, not the accounting return) and uses economic capital in the denominator rather than total assets. Unlike ROA, RAROC reflects the fact that riskier loans require more capital to support them — two loans with identical NIM but different PDs will have very different RARoCs because the riskier one requires more capital. RAROC enables apples-to-apples comparison of returns across the risk spectrum, and underpins pricing decisions, deal approval, and portfolio management.

**Q2: "A loan has a 2% PD, 50% LGD, and costs 150bps in NIM after funding costs. Is it profitable?"**

*Strong answer:* Expected Loss = 2% × 50% = 100bps. Net risk-adjusted margin after EL = 150bps − 100bps = 50bps. But you also need to deduct operating costs (~20–25bps) and compare the residual against the return required on economic capital. At 100% risk weight and 10% capital ratio, capital requirement = 10% of EAD. If the remaining 25–30bps gives a return of say 25–30bps / 10% = 2.5–3.0% on capital, this is far below a 15% hurdle rate. The loan is almost certainly unprofitable on a standalone basis. Mitigation: ancillary revenue from the wider relationship, or repricing to achieve minimum margin.

**Q3: "What is the difference between a committed and uncommitted facility, and why does it matter for credit risk?"**

*Strong answer:* A committed facility legally obligates the bank to lend when requested (within agreed terms); the bank cannot refuse a drawdown without triggering a breach. An uncommitted facility (e.g., demand overdraft) can be withdrawn at any time. From a credit risk perspective: (1) committed facilities require capital to be held against the undrawn commitment (CCF applies); uncommitted facilities have lower capital treatment; (2) in a borrower stress scenario, the bank can withdraw uncommitted lines — providing an escape valve — but cannot refuse drawdown on committed lines, which is when the credit risk materialises at its worst (the "loan commitment paradox": borrowers draw maximum on committed lines exactly when the bank least wants to lend).

**Q4: "Walk me through what happens to a bank's P&L when a performing loan moves from IFRS 9 Stage 1 to Stage 2."**

*Strong answer:* In Stage 1, the bank holds a 12-month ECL provision — for a £100m loan with 1.7% PD and 50% LGD, this is approximately £100m × 1.7% × 50% = £850,000. On migration to Stage 2, the bank must hold a **lifetime** ECL — for a 5-year remaining life, this might be cumulative 5-year PD of 8% × 50% × £100m = £4m. The movement from £850k to £4m (£3.15m increase) is recognised as an impairment charge in the P&L immediately. Revenue does not increase. This is why SICR triggers — the criteria the bank uses to move loans between stages — are fiercely debated: aggressive SICR definitions cause volatile earnings even when no loans have actually defaulted.

**Q5: "What is a credit conversion factor and why is 40% the standardised Basel rate for revolvers?"**

*Strong answer:* The CCF converts undrawn commitments into a credit equivalent exposure for capital calculation purposes. The 40% figure reflects historical observation that, on average, borrowers utilise approximately 40% of their undrawn revolving commitments at the point of default. This is an upward-sloping draw: as a borrower approaches financial distress, it draws on available lines (building cash, buying time), so undrawn commitments at origination become largely drawn by default. The 40% is a conservative average; empirical studies show the figure is often higher for large borrowers with urgent liquidity needs. Under Advanced IRB, banks estimate CCF from their own default data.

### Behavioural/Analytical Questions

**Q6: "Tell me about a time when you had to communicate a complex financial concept to a non-technical stakeholder."**

*(No model answer — this tests communication skill, not credit knowledge. Prepare an example involving ratio analysis, ECL methodology, or risk rating.)*

**Q7: "How do you ensure the quality of a large credit dataset before using it for portfolio analysis?"**

*What to cover:* Completeness checks (null rates on key fields), consistency checks (drawn balance ≤ facility limit), range checks (PD between 0 and 100%), referential integrity (every loan has a valid customer_id in the customer table), date logic (origination date ≤ maturity date), and cross-system reconciliation (loan balances in the risk data warehouse must tie to the core banking system to within an agreed tolerance). Also: understanding why data might be missing (system migrations, legacy loan books entered manually) and how to handle missing data in analysis (imputation vs exclusion vs flagging).

---

## 12. Common Mistakes

### Mistake 1: Confusing Gross and Net Margin

Analysts frequently quote the loan margin (e.g., "225bps over SONIA") as the bank's profitability. In reality:
- The funding cost must be deducted (30–40bps ITP)
- The operating cost must be deducted (20–30bps)
- The expected loss must be deducted (50–150bps depending on credit quality)

A 225bps margin to an average-risk borrower may leave only 50–70bps of pre-capital risk-adjusted return — which, divided by 10% capital, gives RAROC of only 5–7%. Always work to RAROC, not gross margin.

### Mistake 2: Ignoring Commitment Risk on Revolvers

When modelling a revolver, the temptation is to use current utilisation as the exposure. This understates risk in two ways: (1) the borrower can draw more tomorrow; (2) at the point of default, they almost certainly will have drawn more. Always use EAD (drawn + undrawn × CCF) for capital and ECL calculations.

### Mistake 3: Using Accounting Net Debt Rather Than Adjusted Net Debt for Leverage Analysis

Companies often hold cash offshore, in restricted accounts, or in entities not fully consolidated. "Net Debt" from the balance sheet may include cash that is not freely available for debt repayment (e.g., cash in a 51%-owned subsidiary that cannot be upstreamed, or regulatory minimum cash requirements). Credit analysts should always verify the composition of cash before netting it against gross debt.

### Mistake 4: Treating EBITDA as Cash Flow

EBITDA is not cash. EBITDA ignores: (1) changes in working capital — a growing company may consume significant cash in receivables and inventory growth; (2) maintenance capex — a manufacturing business may require £5m/year of capex just to maintain existing equipment; (3) tax payments; (4) debt repayments. Free Cash Flow to Debt is always calculated from operating cash flow, not EBITDA. Many levered borrowers have comfortable EBITDA/Debt ratios but poor FCF after capex and working capital.

### Mistake 5: Applying a Single PD to All Tenors Without Thinking About PD Term Structure

A borrower with a 1.7% annual PD does not have an 8.5% 5-year PD simply by multiplying. PD term structures are concave (not linear): default probability is typically higher in near-term years for stressed borrowers (who either default quickly or recover), and the cumulative default curve flattens over longer horizons for investment-grade borrowers. Using the wrong PD for a long-dated facility significantly misstates ECL.

---

## 13. Case Studies

### Case Study 1: The Leveraged Buyout — Does the Price Work?

**Scenario:** A private equity sponsor is acquiring a UK manufacturing company for £300m (7× EBITDA of £42.8m). The sponsor wants the bank to provide a £200m leveraged term loan (4.7× EBITDA) at SONIA + 400bps, secured on all assets with 40% LGD.

**Analysis:**

| Metric | Value |
|---|---|
| EBITDA | £42.8m |
| Net Debt | £200m |
| Leverage (Gross Debt / EBITDA) | 4.67× |
| Interest Cost (at 5.20% + 4.00%) | £18.4m/year |
| Interest Cover (EBITDA / Interest) | 2.33× |
| Minimum for typical covenant | > 2.25× |

RAROC Calculation:
- PD: LBO companies historically show 3.5%–5.0% annual PD in the first 3 years; use 4.0%
- LGD: 40% (asset-backed; manufacturing assets have reasonable secondary market value)
- EAD: £200m (term loan, fully drawn)
- EL = 4.0% × 40% × £200m = £3.2m = 160bps
- NII at 400bps margin: £200m × (5.20% + 4.00%) = £18.4m total, funding cost £200m × (5.20% + 0.30%) = £11m; NII = £7.4m = 370bps
- Operating cost: 25bps = £500k
- Risk-Adj Revenue = £7.4m − £0.5m − £3.2m = £3.7m
- Capital (100% RW): £200m × 10% = £20m
- RAROC = £3.7m / £20m = 18.5% ✓ Above 15% hurdle

**Conclusion:** The loan achieves the return hurdle at 400bps. However, the interest cover at 2.33× is thin. The credit team would structure a 2.25× minimum interest cover covenant with quarterly testing. If EBITDA falls 10% (to £38.5m), coverage drops to 2.09× — a breach. Covenant headroom is dangerously thin. The credit recommendation might be: approve with tighter covenant structure (minimum 2.50× giving 7% headroom), or negotiate a smaller loan.

### Case Study 2: The Working Capital Crisis

**Scenario:** An existing customer, a food retailer with a £50m overdraft facility, has drawn £48m of its £50m overdraft (96% utilisation, up from 40% three months ago). Audited accounts show £120m revenue and £4.2m EBITDA; management accounts for the latest quarter show EBITDA has fallen to an annualised £2.1m.

**Red Flags:**
- Utilisation spike from 40% to 96% in 3 months without explanation
- EBITDA has halved year-over-year
- Management accounts not provided on schedule (one month late)
- Supplier payment terms lengthening (creditor days rising from 45 to 67)

**Credit Risk Response:**
1. Immediately flag as Early Warning Indicator (EWI) — "watch-list" designation
2. IFRS 9 SICR trigger may be met (significant deterioration in PD) — consider Stage 2 migration and lifetime ECL
3. Convene an emergency credit review — request management meeting, monthly management accounts, and cash flow forecast
4. Assess security position: are debtors/stock sufficient to recover the £48m if facility is called?
5. If the overdraft is uncommitted, consider whether to reduce the limit (and legal implications)
6. Escalate to Special Situations / Restructuring if EBITDA deterioration is structural

**Lesson:** The overdraft utilisation spike was an Early Warning Indicator of a real credit deterioration that eventually led to a restructuring. Banks that monitor utilisation behaviorally catch problems before they become terminal.

---

## 14. Iterative Reinforcement

### Self-Test Questions (answer before checking your own knowledge)

1. A bank has £400bn of corporate loans earning 2.1% NIM. ECL charges run at 35bps of average loans. Operating costs are 70bps. What is the net return before tax and before capital charge?

2. A borrower has EBITDA of £25m, Net Debt of £100m, and Annual Interest of £7.5m. Calculate Leverage and Interest Cover. Would you be comfortable with a 3.5× leverage covenant and 2.5× interest cover covenant?

3. Construct the RAROC of a £200m 3-year revolving credit facility, 60% drawn, margin 180bps, PD 0.8%, LGD 40%, RW 75%. Does it meet a 12% hurdle?

4. What happens to the RAROC of a loan if the borrower is downgraded and the bank must increase its IFRS 9 provision by £3m on a £100m loan?

5. A bank is considering a syndicated loan: joining a £500m deal for a £75m hold. The deal was originated by another bank. What additional credit risk considerations apply that would not apply in a bilateral loan?

### Spaced Repetition Schedule

- **Day 1:** Read Sections 1–3. Build the RAROC calculator in Excel.
- **Day 3:** Without referring to notes, reconstruct the loan pricing components and RAROC formula from memory. Check your work.
- **Day 7:** Complete the SQL queries on a test dataset. Verify your portfolio NIM query against manually calculated figures for 3–5 individual loans.
- **Day 14:** Run the Python model. Extend it to include a stress scenario where PD doubles and LGD increases by 10 percentage points. What happens to the minimum required margin?
- **Day 30:** Answer the interview questions without notes. Record yourself if possible. Focus on Q1 and Q4 — these are the most common credit risk interview questions in UK banking.

---

## 15. Source Material

### Primary Regulatory Sources

- **Basel Committee on Banking Supervision (BCBS):** *Basel III: A global regulatory framework for more resilient banks and banking systems* (rev. June 2011); *Basel III: Finalising post-crisis reforms* (December 2017 — "Basel IV"). Available at: https://www.bis.org/bcbs/publ/
- **UK Prudential Regulation Authority (PRA):** SS1/23 — *Implementation of the Basel 3.1 standards*; PRA Rulebook — Credit Risk Chapter
- **European Banking Authority (EBA):** *EBA Single Rulebook* — CRR/CRD IV; Guidelines on PD estimation, LGD estimation, and treatment of defaulted assets (EBA/GL/2017/16)
- **IFRS Foundation:** *IFRS 9 Financial Instruments* (2014) — available at https://www.ifrs.org; particularly the Basis for Conclusions on the Expected Credit Loss model
- **IASB:** *IFRS 9 — Implementation Guidance* (December 2014)

### Market Data and Reference Points

- **HSBC Group Annual Report and Accounts 2023** — Group NIM (1.66%), ECL charge (US$3.4bn), Group loan book composition. Available at: https://www.hsbc.com/investors/results-and-announcements/annual-report
- **Bank of England:** *Financial Stability Report* (bi-annual) — aggregate UK banking credit metrics
- **Moody's:** *Annual Default Study: Corporate Default and Recovery Rates* (published annually) — the primary reference for historical PD data by rating category
- **S&P Global:** *Default, Transition, and Recovery* annual study
- **LPC (Loan Pricing Corporation) / Refinitiv LPC:** Primary source for syndicated loan market pricing data, margin benchmarks, and league tables

### Textbooks

- Bessis, J. (2015). *Risk Management in Banking* (4th ed.). Wiley. — Chapters 3–8 (RAROC, PD/LGD/EAD, portfolio models)
- Bluhm, C., Overbeck, L., & Wagner, C. (2010). *Introduction to Credit Risk Modeling* (2nd ed.). CRC Press. — Definitive technical reference for IRB modelling
- McNeil, A., Frey, R., & Embrechts, P. (2015). *Quantitative Risk Management: Concepts, Techniques and Tools* (2nd ed.). Princeton University Press. — Chapters 8–9 (credit risk)
- de Servigny, A., & Renault, O. (2004). *Measuring and Managing Credit Risk*. McGraw-Hill.

### Articles and Papers

- Altman, E.I. (1968). "Financial Ratios, Discriminant Analysis and the Prediction of Corporate Bankruptcy." *Journal of Finance*, 23(4), 589–609. — Original Z-Score paper; still referenced in credit analysis
- Gordy, M. (2003). "A risk-factor model foundation for ratings-based bank capital rules." *Journal of Financial Intermediation*, 12(3), 199–232. — Technical foundation of Basel IRB formula
- Brunnermeier, M., & Pedersen, L. (2009). "Market Liquidity and Funding Liquidity." *Review of Financial Studies*, 22(6), 2201–2238. — Explains why liquidity crises and credit crises interact

---

*End of M01 — Commercial Lending Overview*
*Next Module: M02 — Customer Onboarding and KYC*
