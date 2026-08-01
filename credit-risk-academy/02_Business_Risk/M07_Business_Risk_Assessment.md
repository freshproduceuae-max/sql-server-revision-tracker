# M07 — Business Risk Assessment

> **Academy:** Commercial & Corporate Credit Risk  
> **Stream:** 02 — Business Risk  
> **Audience:** Experienced Banking Business Analyst transitioning to Credit Risk  
> **Prerequisite modules:** M01–M06

---

## 1. Business Purpose

Industry analysis (M06) tells you what the sector does to credit risk. Business risk assessment tells you what this specific company does to credit risk, relative to its sector peers. Two companies in the same industry with identical financial ratios can have radically different credit profiles if one has a diversified customer base, long-term contracts, strong brand, and high barriers to entry, while the other depends on a single customer, operates on spot contracts, and competes on price alone.

This distinction — **systematic risk** (industry) versus **idiosyncratic risk** (company-specific) — is fundamental. Business risk assessment is the analysis of idiosyncratic risk: the factors specific to this borrower that make it better or worse than the industry average.

In practice, a bank's internal rating model combines a financial risk score (derived from financial ratios) with a business risk score (derived from qualitative assessments). The business risk score has two components: an industry risk component (covered in M06) and a company-specific business risk component (this module). The company-specific component typically accounts for 20–40% of the final internal rating. It is not a tick-box exercise — a strong qualitative assessment can improve a borderline credit, and a weak one can prevent approval of an apparently strong financial case.

For a business analyst transitioning to credit risk, this module develops the analytical discipline to go beyond the numbers: to read a business rather than just read a spreadsheet, and to articulate qualitative risk factors in language that will survive scrutiny in a credit committee.

---

## 2. Accounting Concepts

Business risk assessment requires understanding how the qualitative characteristics of a business manifest in, or are obscured by, the financial statements.

**Revenue quality and revenue recognition:**
Not all revenue is equal from a credit perspective. Revenue from long-term contracts (e.g., a 5-year framework agreement with a government body) is more valuable than spot market revenue, because it is predictable and provides a backlog. But the accounting treatment may look identical: both appear as revenue in the income statement when earned. The analyst must go beyond the revenue line to understand its composition.

Questions to ask: What percentage of revenue is contracted vs discretionary? What is the contract duration? What are the termination provisions? Revenue that looks stable because a single customer keeps buying may actually be highly fragile — if that customer leaves, revenue collapses.

**Deferred revenue and contract liabilities (IFRS 15):**
A large deferred revenue balance (amounts billed to customers but not yet earned) is generally positive for credit — it means customers have paid in advance, providing a cash buffer. Conversely, contract assets (revenue recognised but not yet billed) represent a receivable that depends on the customer actually paying. For businesses with long project cycles (IT systems integrators, engineering firms), the ratio of contract assets to contract liabilities is a useful indicator of cash collection health.

**Customer concentration and receivables concentration:**
If 40% of revenue comes from one customer, then 40% of the receivables balance is from that customer. The ageing analysis and the creditworthiness of that single customer become critical. An analyst should request an aged receivables analysis by customer and cross-reference it against the revenue concentration. Slow-paying concentrated customers create both credit risk (the debtor default risk) and liquidity risk (cash conversion delay).

**Goodwill and acquisition history:**
A balance sheet with large goodwill (often 30–50% of total assets in acquisition-driven businesses) tells the analyst that the company has grown by acquisition. This is not inherently negative but requires analysis. Was goodwill impaired? Goodwill impairment is an accounting signal that management overpaid for an acquisition or that the acquired business is not performing as expected. Repeated goodwill impairments are a red flag about management's capital allocation discipline.

**Off-balance-sheet commitments:**
Operating leases (now on-balance sheet under IFRS 16, but many older credit files may show legacy operating lease adjustments), take-or-pay contracts, and purchase commitments represent fixed financial obligations that do not appear in Net Debt but affect cash flow. A business with £10m in annual take-or-pay purchase commitments (e.g., a manufacturer with a long-term energy supply contract) has a fixed obligation comparable to interest expense. Credit analysts should read the Notes to the financial statements section on commitments and contingencies.

---

## 3. Financial Concepts

**Market position and its relationship to financial performance:**

Market position — measured by revenue market share relative to competitors — has a direct causal relationship with financial outcomes. Companies with dominant market positions typically:
- Achieve higher margins (pricing power, scale efficiencies)
- Have lower revenue volatility (stickier customer relationships)
- Can access capital markets on better terms (creditworthiness benefits reinforce themselves)

The credit implication: all else equal, a market leader in a niche is a better credit than a subscale follower, even if their current financial ratios are similar. The market leader can sustain margins through a downturn; the follower faces the existential risk of being squeezed out when competition intensifies.

Quantifying market position requires knowing the total addressable market (TAM) and the borrower's share. For listed companies, analyst reports provide this. For private mid-market companies, the analyst must estimate using IBISWorld data (total market size), competitors' Companies House filings (approximate revenue), and management discussion.

**Customer concentration — the 20% rule:**

The informal "20% rule" in commercial credit: if any single customer accounts for more than 20% of revenue, it is automatically a significant risk factor requiring explicit analysis and disclosure in the credit paper. Above 30%, it typically requires specific mitigants (long-term contracts, specific insurance, concentration covenant) to justify approval. Above 50%, it is a fundamental structural weakness that limits the borrower's debt capacity.

Why 20%? The logic: at 20% customer concentration, losing that customer reduces revenue by 20%. For a business with a 15% EBITDA margin, that revenue loss may eliminate all profit and flip the business into loss. At 30% concentration, a single customer departure creates a crisis. The 20% threshold is a heuristic, not a hard rule, but it is widely used and understood by credit committees.

**Order book analysis:**

For companies that operate on contracts (construction, engineering, defence, IT services), the order book (backlog) is one of the most important credit metrics. It represents contracted future revenue and provides visibility into near-term financial performance.

Key metrics:
- **Order book coverage ratio:** Backlog / Annual Revenue. A ratio of 1.5x means 18 months of contracted revenue is in hand. Below 0.5x (6 months) creates significant revenue visibility risk.
- **Order book quality:** What type of contracts are in the backlog? Cost-plus contracts (where the customer pays actual costs plus a margin) are lower risk. Fixed-price contracts carry margin risk if costs overrun. Lump-sum turnkey contracts carry the highest risk — the contractor bears all cost overrun risk.
- **Customer diversification within the order book:** Is the backlog concentrated in one or two large contracts? The loss of one contract can devastate the backlog.

**Supplier concentration and supply chain resilience:**

Post-COVID supply chain disruptions have elevated supplier concentration as a credit risk factor. A manufacturer that sources a critical component from a single supplier faces a risk that is structurally similar to customer concentration, but on the cost side: a supplier failure, price increase, or delivery disruption can halt production and destroy revenue.

For credit analysis, the relevant questions are: What is the single-source dependency? What are the lead times and switching costs for key inputs? Does the company hold strategic inventory buffers? Are key supplier contracts long-term or spot? A company with 100% single-source dependency for a critical component, no inventory buffer, and spot purchasing has a supply chain risk profile that should reduce its debt capacity.

**ESG as a financial risk factor:**

ESG (Environmental, Social, Governance) is not a compliance exercise for credit analysts — it is a financial risk assessment. The EU taxonomy and SFDR regulations have created mandatory ESG disclosures for large companies, but even for private mid-market borrowers, ESG factors translate directly into financial risks:

- **Transition risk:** A manufacturer with a carbon-intensive process faces rising carbon costs (UK ETS), potential regulatory prohibition, and supply chain pressure (large customers requiring suppliers to meet scope 3 emissions targets). These are costs and revenue risks.
- **Physical risk:** A coastal industrial site faces flood risk from sea level rise. Higher insurance costs, potential disruption, long-term asset value impairment.
- **Social licence to operate:** A company that depends on public goodwill (extractive industries, water companies) faces the risk that community opposition or regulatory revocation destroys the business. Thames Water's 2024 near-collapse is an example of governance and social licence failure translating into financial crisis.
- **Governance:** Poor governance (weak boards, related-party transactions, founder control without accountability) is a direct credit risk driver and is covered in detail in M08.

---

## 4. Statistical Concepts

**Ordinal scoring and the scorecard methodology:**

Business risk assessment is inherently qualitative, but banks convert qualitative assessments to numerical scores to enable systematic comparison, averaging, and aggregation into a rating. This is done using an ordinal scorecard — each factor is scored on a defined scale (e.g., 1–5 or 1–10), with anchored descriptions at each level to ensure consistency across analysts.

The critical statistical concern is **inter-rater reliability**: do different analysts score the same factor the same way? Without anchor descriptions and calibration training, two analysts assessing the same customer concentration risk may assign scores of 3 and 7. Banks address this through:
- Defined scoring anchors (each score point has a written description)
- Annual calibration workshops where analysts score the same case and compare results
- Model validation reviews where scores are backtested against actual performance

**Weighting schemes and sensitivity analysis:**

A weighted scorecard assigns different importance to each factor (e.g., customer concentration gets 25% weight, management gets 20%). The weights are typically derived from empirical analysis (which factors best predicted historical defaults in the bank's portfolio?) or from expert judgement calibrated against ratings agency methodologies.

Sensitivity analysis on the weights is important: if the credit decision changes when the weight of "customer concentration" moves from 20% to 25%, the decision is at the margin and requires more detailed analysis of that specific factor.

**Migration analysis:**

Business risk scores should be tracked over time. **Score migration** — the movement of a borrower's business risk score from one band to another — is a leading indicator. A borrower whose business risk score has deteriorated from 3 to 5 (on a 10-point scale) over three years may be on a path to credit deterioration even if their financial ratios remain stable (because business risk deterioration precedes financial deterioration by one to three years).

Banks should track score migration rates as part of credit portfolio analytics: what percentage of borrowers have experienced a business risk score downgrade in the past 12 months? Is this rate accelerating in specific sectors?

**Correlation between qualitative and quantitative risk factors:**

Empirical studies (using bank credit data) consistently show that qualitative risk factors are incrementally predictive of default beyond what financial ratios alone capture. Academic research (Grunert, Norden, Weber, 2005; Hasan, Hoi, Wu, Zhang, 2014) demonstrates that including qualitative factors in rating models reduces both Type I errors (failing to catch bad credits) and Type II errors (incorrectly rejecting good credits).

The implication: business risk scoring is not a formality. It genuinely improves the accuracy of credit assessment. Analysts who treat qualitative scoring as a box-ticking exercise are accepting a materially worse model.

---

## 5. Regulatory Framework

**Basel III — qualitative factors in IRB models:**

Under Basel IRB, banks must demonstrate that their PD rating models are appropriately discriminating — that is, that higher-rated borrowers default less frequently than lower-rated borrowers. Regulators (PRA, ECB SSM) require that qualitative factors are incorporated into rating models where they have demonstrated discriminatory power. This means that business risk scoring is not just a bank practice — it is a regulatory requirement for IRB banks.

The PRA's model validation guidelines (SS1/21) require that banks test whether qualitative factors in their rating models are independently predictive of default, controlling for financial factors. Where they are, their inclusion is required. Where they are not, their weight should be reduced. This creates a discipline: every factor in the business risk scorecard must have an empirical rationale.

**IFRS 9 — qualitative factors in staging decisions:**

Under IFRS 9, a loan must move from Stage 1 (12-month ECL) to Stage 2 (lifetime ECL) when there is a significant increase in credit risk (SICR) since origination. The IFRS 9 standard explicitly requires banks to consider qualitative indicators of SICR, not just quantitative triggers. Examples of qualitative SICR indicators include:
- Loss of a major customer (customer concentration risk materialising)
- Key management departure or governance concern
- Adverse change in the competitive environment (new entrant taking market share)
- Supply chain disruption event

These are precisely the factors assessed in the business risk scorecard. An annual business risk review that produces a score deterioration is therefore a potential SICR trigger under IFRS 9, which has implications for provisioning. The credit analyst must ensure the business risk review process is connected to the IFRS 9 staging process.

**FCA/PRA regulatory requirements for SME lending:**

The PRA's supervisory expectations for mid-market corporate lending require that credit assessments are based on a full understanding of the borrower's business model, not just financial ratios. The Prudential Sourcebook (BIPRU and CRR) does not specify a business risk scoring methodology, but the expectation of a complete credit assessment is clear. In practice, PRA supervisors review credit files during thematic reviews and expect to see evidence of qualitative analysis alongside financial analysis.

---

## 6. Data Required

**Primary data — from the borrower:**

- **Management accounts:** Monthly or quarterly P&L, balance sheet, cash flow. Management accounts reveal operating trends before they appear in annual audited accounts. The quality of management accounts (are they GAAP-compliant? Are they produced promptly? Are variances explained?) is itself a qualitative indicator.
- **Customer list and revenue split:** Revenue by customer, by product/service line, and by geography. This is the foundation of concentration analysis. Many private companies resist providing this, and resistance itself is a qualitative flag.
- **Order book / pipeline report:** Contracted backlog by customer, contract type, completion date, and value. For construction and project-based businesses, this is critical.
- **Supplier list and purchasing data:** Key suppliers, single-source dependencies, contract terms. Post-COVID, banks increasingly request supply chain risk assessments.
- **Organisational chart:** Understanding the corporate structure, key personnel, and ownership. Reveals related-party relationships, ownership complexity, and key-man dependencies.
- **Details of material contracts:** Long-term customer contracts, take-or-pay supply agreements, licence agreements, regulatory permits.

**Secondary data — from external sources:**

- **Companies House:** Filed accounts for the borrower and its directors' other directorships. Directors who have been involved in prior insolvencies appear in the Companies House director disqualification list.
- **Credit reference agencies:** Experian, Equifax, Creditsafe — trade payment data showing how promptly the company pays its suppliers. Slow-paying suppliers often become slow-paying borrowers.
- **Court judgements:** County Court Judgements (CCJs) against the company. CCJs for unpaid debts are significant credit warning signs.
- **Press monitoring:** News searches (Google News, Nexis, Factiva) for recent adverse developments — major customer losses, product recalls, regulatory investigations, management departures.
- **Social media / Glassdoor:** Employee reviews can provide insight into internal culture, management quality, and operational issues. A company with 120 Glassdoor reviews averaging 1.8/5.0 and consistent complaints about poor management is exhibiting a qualitative risk signal.
- **Industry associations and trade press:** Trade body reports, trade press articles, customer/competitor commentary.

---

## 7. How Analysts Actually Work

**The business risk assessment process in practice:**

A typical mid-market credit assessment at a UK clearing bank follows this sequence:

1. **Pre-meeting research (1–2 hours):** The analyst reviews Companies House filings, runs a Creditsafe or Experian business credit report, searches Nexis/Factiva for recent news, reviews the industry risk score (from M06 process), and reviews the prior credit file if this is a renewal.

2. **Management meeting (2–3 hours, typically on-site):** The credit analyst accompanies the Relationship Manager to meet the management team. This is where qualitative assessment is done. The analyst observes: Who attends? How do they present? Do they know their numbers? How do they respond to challenging questions? Are they forthcoming or evasive? The site visit also provides physical evidence: what does the factory/office/site look like? Is it well-maintained? Is inventory well-organised? Is the workforce engaged?

3. **Post-meeting analysis (2–4 hours):** The analyst completes the business risk scorecard, documents observations from the management meeting, and identifies the key risk themes. This is where the 300–500 word business risk narrative is drafted.

4. **Document request and follow-up:** Based on the assessment, the analyst requests additional information: aged receivables schedules, customer contracts for the top three customers, order book report, details of the key-man insurance policy.

5. **Scorecard completion and rating:**The business risk score is formalised, reviewed by the Senior Credit Officer, and combined with the financial risk score to produce the internal rating.

**What experienced analysts actually look for in qualitative assessment:**

*In the management meeting:*
- Can the CFO explain working capital movements without looking at notes? A CFO who cannot explain their cash conversion cycle does not understand their business.
- Does the CEO/MD know the top 5 customers by name, revenue contribution, and relationship history? Good management knows their customer base intimately.
- When asked about risks, does management acknowledge them or dismiss them? Management that presents only positives and brushes off risks is a governance concern.
- Has the company performed through previous downturns? Ask directly: "What happened in 2020? How did you manage the business through it?"

*In the documents:*
- Are management accounts timely (produced within 10 business days of month end) and consistent with the narrative management provides?
- Does the customer concentration in the receivables match the stated revenue concentration?
- Are there related-party balances that are large, growing, or unexplained?

---

## 8. Excel Implementation

**Business Risk Scorecard — Complete Build**

```
BUSINESS RISK ASSESSMENT SCORECARD
Company: [Borrower Name]
Analyst: [Name]
Date: [DD/MM/YYYY]
Review Type: [Annual Review / New Application / Amendment]

SECTION A: MARKET POSITION & COMPETITIVE STRENGTH        Weight  Score  Wtd Score
---------------------------------------------------------------------------
A1. Market position / market share in primary market      10%     [1-10]  
A2. Competitive differentiation (product/brand/IP)        10%     [1-10]  
A3. Barriers to entry protecting the business             8%      [1-10]  
A4. Pricing power (ability to pass through cost increases) 7%     [1-10]  

SECTION B: CUSTOMER RISK                                  Weight  Score  Wtd Score
---------------------------------------------------------------------------
B1. Customer concentration (largest single customer %)     15%    [1-10]  
B2. Customer diversification (spread across customers)     8%     [1-10]  
B3. Quality / stability of customer relationships          7%     [1-10]  
B4. Contract quality (long-term vs spot; terms)            7%     [1-10]  

SECTION C: SUPPLIER & SUPPLY CHAIN RISK                  Weight  Score  Wtd Score
---------------------------------------------------------------------------
C1. Supplier concentration (single-source dependencies)    5%     [1-10]  
C2. Supply chain resilience (geographic diversification)   5%     [1-10]  

SECTION D: DIVERSIFICATION                               Weight  Score  Wtd Score
---------------------------------------------------------------------------
D1. Product/service diversification                        5%     [1-10]  
D2. Geographic diversification                             4%     [1-10]  

SECTION E: ESG & STRUCTURAL RISK                         Weight  Score  Wtd Score
---------------------------------------------------------------------------
E1. Environmental/transition risk                          5%     [1-10]  
E2. Technology disruption risk                             5%     [1-10]  

TOTAL BUSINESS RISK SCORE                                100%           [Sum]

SCORING ANCHORS — CUSTOMER CONCENTRATION (Factor B1):
Score 1-2: No single customer >10% of revenue; >20 active customers
Score 3-4: Largest customer 10-20%; well spread remainder
Score 5-6: Largest customer 20-30%; moderate concentration
Score 7-8: Largest customer 30-40%; OR top 3 customers >60%
Score 9-10: Largest customer >40% of revenue; extreme dependency

SCORING ANCHORS — MARKET POSITION (Factor A1):
Score 1-2: Dominant market leader (>40% market share in defined niche)
Score 3-4: Strong #2 or #3 position (15-40% share); recognised brand
Score 5-6: Mid-tier participant; some differentiation; 5-15% share
Score 7-8: Subscale follower; <5% share; limited differentiation
Score 9-10: No meaningful market position; pure price competitor

SCORING ANCHORS — CONTRACT QUALITY (Factor B4):
Score 1-2: Multi-year contracts with creditworthy counterparties; 
           cost escalation clauses; limited termination rights
Score 3-4: Mix of annual and multi-year contracts; some protections
Score 5-6: Predominantly annual or rolling contracts; limited backlog
Score 7-8: Spot market sales; no contracted revenue; price-sensitive customers
Score 9-10: Pure commodity spot; all sales at market price; no backlog

BUSINESS RISK BAND:
Score 1.0-2.5:  STRONG    — outperforms sector; minimal company-specific risk
Score 2.6-4.0:  GOOD      — above-average position; manageable risks
Score 4.1-5.5:  AVERAGE   — in-line with sector; standard risk profile
Score 5.6-7.0:  WEAK      — below-sector performance; specific risks identified
Score 7.1-10.0: VERY WEAK — significant company-specific vulnerabilities
```

**Excel formula structure:**

```excel
Assume: Section scores in cells D8:D11 (Section A), D15:D18 (Section B), etc.
        Weights in cells C8:C11, etc.

Weighted scores in column E:
E8: =C8*D8
E9: =C9*D9
[...continue for each row...]

Total score:
E30 (total): =SUMPRODUCT(C8:C27, D8:D27)
[where C column = weights as decimals, D column = raw scores]

Band interpretation:
E32: =IF(E30<=2.5,"STRONG",IF(E30<=4.0,"GOOD",IF(E30<=5.5,"AVERAGE",
         IF(E30<=7.0,"WEAK","VERY WEAK"))))

Conditional formatting on E32:
Green if value = "STRONG" or "GOOD"
Amber if value = "AVERAGE"
Red if value = "WEAK" or "VERY WEAK"

CONCENTRATION FLAG (Helper cell):
F16: =IF(D15>=7,"WARNING: Single customer concentration is extreme — 
           requires escalation to Senior Credit Officer","")

ORDER BOOK COVERAGE (if applicable):
In a separate section:
H8: Order book value (£m)    [manual input]
H9: Annual revenue (£m)      [manual input]
H10: Coverage ratio          =H8/H9
H11: Interpretation          =IF(H10>=1.5,"Strong visibility (>18 months)",
                                IF(H10>=1.0,"Adequate (12+ months)",
                                IF(H10>=0.5,"Limited (6-12 months)",
                                "Poor (<6 months) — revenue visibility risk")))
```

---

## 9. SQL Implementation

```sql
-- ============================================================
-- BUSINESS RISK ASSESSMENT: Storage and Tracking
-- Database: SQL Server (T-SQL syntax)
-- ============================================================

-- TABLE DEFINITIONS
-- business_risk_assessments: tracks each formal assessment
-- bra_factor_scores: individual factor scores per assessment
-- customer_concentration: borrower customer revenue split
-- contract_data: key contracts by borrower

-- ============================================================
-- TABLE CREATION (run once)
-- ============================================================

CREATE TABLE business_risk_assessments (
    assessment_id         INT IDENTITY(1,1) PRIMARY KEY,
    borrower_id           INT NOT NULL,
    assessment_date       DATE NOT NULL,
    analyst_id            INT NOT NULL,
    review_type           VARCHAR(50),   -- Annual/NewApp/Amendment
    total_bra_score       DECIMAL(4,2),  -- 1.00-10.00
    bra_band              VARCHAR(20),   -- Strong/Good/Average/Weak/Very Weak
    customer_concentration_pct DECIMAL(5,2), -- Largest single customer %
    order_book_coverage   DECIMAL(4,2),  -- Months of contracted revenue
    key_risks_narrative   NVARCHAR(2000),
    mitigants_narrative   NVARCHAR(1000),
    approved_by           INT,
    created_date          DATETIME DEFAULT GETDATE()
);

CREATE TABLE bra_factor_scores (
    score_id              INT IDENTITY(1,1) PRIMARY KEY,
    assessment_id         INT NOT NULL REFERENCES business_risk_assessments(assessment_id),
    factor_code           VARCHAR(10),   -- e.g. 'A1', 'B1', 'C1'
    factor_description    VARCHAR(200),
    raw_score             DECIMAL(3,1),  -- 1.0 to 10.0
    weight_pct            DECIMAL(5,4),  -- e.g. 0.1500 for 15%
    weighted_score        AS (raw_score * weight_pct) PERSISTED
);

-- ============================================================
-- QUERY 1: Business Risk Score Migration Report
-- Tracks how each borrower's business risk score has changed 
-- over time — key early warning indicator
-- ============================================================

WITH latest_two_assessments AS (
    SELECT
        bra.borrower_id,
        b.borrower_name,
        b.sic_code,
        bra.assessment_date,
        bra.total_bra_score,
        bra.bra_band,
        bra.customer_concentration_pct,
        ROW_NUMBER() OVER (
            PARTITION BY bra.borrower_id 
            ORDER BY bra.assessment_date DESC
        ) AS rn
    FROM business_risk_assessments bra
    INNER JOIN borrowers b ON bra.borrower_id = b.borrower_id
    WHERE bra.assessment_date >= DATEADD(YEAR, -3, GETDATE())
),
current_vs_prior AS (
    SELECT
        curr.borrower_id,
        curr.borrower_name,
        curr.sic_code,
        curr.total_bra_score                    AS current_score,
        curr.bra_band                           AS current_band,
        prior.total_bra_score                   AS prior_score,
        prior.bra_band                          AS prior_band,
        curr.customer_concentration_pct         AS current_concentration,
        curr.assessment_date                    AS current_date,
        prior.assessment_date                   AS prior_date
    FROM latest_two_assessments curr
    LEFT JOIN latest_two_assessments prior
        ON curr.borrower_id = prior.borrower_id
        AND prior.rn = 2
    WHERE curr.rn = 1
)

SELECT
    borrower_id,
    borrower_name,
    sic_code,
    current_date,
    ROUND(current_score, 2)                     AS current_bra_score,
    current_band,
    prior_date,
    ROUND(prior_score, 2)                       AS prior_bra_score,
    prior_band,
    ROUND(current_score - prior_score, 2)       AS score_change,
    CASE
        WHEN (current_score - prior_score) > 1.5 
            THEN 'SIGNIFICANT DETERIORATION — review required'
        WHEN (current_score - prior_score) > 0.5 
            THEN 'MODERATE DETERIORATION — monitor'
        WHEN (current_score - prior_score) < -0.5 
            THEN 'IMPROVEMENT'
        ELSE 'STABLE'
    END                                         AS migration_flag,
    -- Trigger IFRS 9 SICR consideration if score deteriorated materially
    CASE
        WHEN (current_score - prior_score) > 2.0 
            THEN 'POTENTIAL SICR — refer to IFRS 9 staging team'
        ELSE NULL
    END                                         AS ifrs9_sicr_flag
FROM current_vs_prior
WHERE prior_score IS NOT NULL  -- Only borrowers with two assessments
ORDER BY score_change DESC;    -- Most deteriorated at top

-- ============================================================
-- QUERY 2: Customer Concentration Risk by Portfolio
-- Identifies all borrowers with high customer concentration
-- and their associated credit exposure
-- ============================================================

WITH concentration_analysis AS (
    SELECT
        bra.borrower_id,
        b.borrower_name,
        ic.sic_description,
        bra.customer_concentration_pct,
        bra.total_bra_score,
        bra.assessment_date,
        SUM(l.outstanding_balance) / 1000000.0  AS exposure_gbp_m,
        AVG(cr.pd_estimate) * 100               AS pd_pct
    FROM business_risk_assessments bra
    INNER JOIN borrowers b       ON bra.borrower_id = b.borrower_id
    INNER JOIN industry_codes ic ON b.sic_code = ic.sic_code
    INNER JOIN loans l           ON b.borrower_id = l.borrower_id
    LEFT  JOIN credit_ratings cr ON b.borrower_id = cr.borrower_id
        AND cr.rating_date = (
            SELECT MAX(rating_date) FROM credit_ratings cr2 
            WHERE cr2.borrower_id = b.borrower_id
        )
    WHERE bra.assessment_date = (
        SELECT MAX(bra2.assessment_date) 
        FROM business_risk_assessments bra2 
        WHERE bra2.borrower_id = bra.borrower_id
    )
    AND l.outstanding_balance > 0
    GROUP BY
        bra.borrower_id, b.borrower_name, ic.sic_description,
        bra.customer_concentration_pct, bra.total_bra_score,
        bra.assessment_date
)

SELECT
    borrower_name,
    sic_description,
    ROUND(customer_concentration_pct, 1)    AS top_customer_pct,
    ROUND(total_bra_score, 2)               AS bra_score,
    ROUND(exposure_gbp_m, 1)               AS exposure_gbp_m,
    ROUND(pd_pct, 3)                        AS pd_pct,
    ROUND(exposure_gbp_m * pd_pct / 100, 3) AS expected_loss_gbp_m,
    CASE
        WHEN customer_concentration_pct >= 50 
            THEN 'EXTREME — mandatory mitigant review'
        WHEN customer_concentration_pct >= 30 
            THEN 'HIGH — key risk factor, explicit credit approval note'
        WHEN customer_concentration_pct >= 20 
            THEN 'ELEVATED — 20% rule triggered, document assessment'
        ELSE 'ACCEPTABLE'
    END                                     AS concentration_flag
FROM concentration_analysis
WHERE customer_concentration_pct >= 20
ORDER BY customer_concentration_pct DESC;

-- ============================================================
-- QUERY 3: Business Risk Factor Score Analysis
-- Identifies which specific risk factors are driving poor scores
-- across the portfolio — used for thematic portfolio reviews
-- ============================================================

SELECT
    fs.factor_code,
    fs.factor_description,
    COUNT(DISTINCT bra.borrower_id)            AS borrower_count,
    ROUND(AVG(fs.raw_score), 2)               AS avg_raw_score,
    ROUND(MAX(fs.raw_score), 1)               AS max_raw_score,
    -- Count of borrowers scoring 7+ on this factor (high risk)
    SUM(CASE WHEN fs.raw_score >= 7 THEN 1 ELSE 0 END) AS high_risk_count,
    ROUND(
        SUM(CASE WHEN fs.raw_score >= 7 THEN 1.0 ELSE 0 END) * 100.0 /
        COUNT(DISTINCT bra.borrower_id), 1
    )                                          AS high_risk_pct
FROM bra_factor_scores fs
INNER JOIN business_risk_assessments bra 
    ON fs.assessment_id = bra.assessment_id
WHERE bra.assessment_date >= DATEADD(YEAR, -1, GETDATE())
    -- Most recent assessment per borrower only
    AND bra.assessment_id IN (
        SELECT MAX(assessment_id)
        FROM business_risk_assessments
        GROUP BY borrower_id
    )
GROUP BY fs.factor_code, fs.factor_description
ORDER BY avg_raw_score DESC;

-- ============================================================
-- QUERY 4: ESG Risk Concentration in Portfolio
-- Tracks environmental/transition risk exposure
-- ============================================================

SELECT
    ic.sic_description,
    ic.industry_risk_score,
    COUNT(DISTINCT b.borrower_id)              AS borrower_count,
    SUM(l.outstanding_balance) / 1000000.0    AS exposure_gbp_m,
    ROUND(AVG(
        CAST(fs.raw_score AS DECIMAL(4,2))
    ), 2)                                      AS avg_esg_risk_score,
    -- Flag sectors with high transition risk
    CASE
        WHEN ic.sic_code IN (
            '05.10',  -- Coal mining
            '19.20',  -- Petroleum refining
            '24.10',  -- Steel manufacturing
            '23.20',  -- Cement
            '35.11'   -- Electricity generation (fossil)
        ) THEN 'HIGH TRANSITION RISK — apply additional ESG stress'
        ELSE 'STANDARD'
    END                                        AS transition_risk_flag
FROM business_risk_assessments bra
INNER JOIN bra_factor_scores fs   ON bra.assessment_id = fs.assessment_id
    AND fs.factor_code = 'E1'     -- Environmental risk factor
INNER JOIN borrowers b            ON bra.borrower_id = b.borrower_id
INNER JOIN industry_codes ic      ON b.sic_code = ic.sic_code
INNER JOIN loans l                ON b.borrower_id = l.borrower_id
WHERE bra.assessment_date = (
    SELECT MAX(bra2.assessment_date) 
    FROM business_risk_assessments bra2 
    WHERE bra2.borrower_id = bra.borrower_id
)
AND l.outstanding_balance > 0
GROUP BY ic.sic_description, ic.industry_risk_score, ic.sic_code
HAVING SUM(l.outstanding_balance) / 1000000.0 > 5  -- Sectors with >£5m exposure
ORDER BY avg_esg_risk_score DESC;
```

---

## 10. Python Implementation

```python
"""
Business Risk Assessment — Python Implementation
Commercial & Corporate Credit Risk Academy — M07

1. Business Risk Scorecard automation and validation
2. Customer concentration analysis and visualisation
3. NLP-based news sentiment analysis for business risk events
4. Score migration analysis

Requirements: pandas, numpy, matplotlib, seaborn, 
              transformers (for NLP), requests
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import seaborn as sns
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple
from datetime import datetime, date
import warnings
warnings.filterwarnings('ignore')


# ============================================================
# 1. BUSINESS RISK SCORECARD CLASS
# ============================================================

@dataclass
class BRAFactor:
    """A single factor in the Business Risk Assessment scorecard."""
    code: str
    description: str
    weight: float        # As decimal, e.g. 0.15
    raw_score: float     # 1.0 to 10.0
    evidence: str = ""   # Analyst's evidence/rationale
    
    @property
    def weighted_score(self) -> float:
        return self.weight * self.raw_score
    
    def validate(self):
        if not 1.0 <= self.raw_score <= 10.0:
            raise ValueError(
                f"Factor {self.code}: score {self.raw_score} out of range (1-10)"
            )
        if not 0.0 < self.weight <= 1.0:
            raise ValueError(
                f"Factor {self.code}: weight {self.weight} invalid"
            )


class BusinessRiskScorecard:
    """
    Complete Business Risk Assessment scorecard implementation.
    
    Mirrors the Excel scorecard from Section 8 but adds:
    - Validation
    - Automatic flag generation
    - Narrative output formatting
    - Historical comparison
    """
    
    # Default factor structure: (code, description, weight)
    DEFAULT_FACTORS = [
        ('A1', 'Market position / market share in primary market', 0.10),
        ('A2', 'Competitive differentiation (product/brand/IP)', 0.10),
        ('A3', 'Barriers to entry protecting the business', 0.08),
        ('A4', 'Pricing power (ability to pass through cost increases)', 0.07),
        ('B1', 'Customer concentration (largest single customer %)', 0.15),
        ('B2', 'Customer diversification (spread across customers)', 0.08),
        ('B3', 'Quality / stability of customer relationships', 0.07),
        ('B4', 'Contract quality (long-term vs spot; terms)', 0.07),
        ('C1', 'Supplier concentration (single-source dependencies)', 0.05),
        ('C2', 'Supply chain resilience (geographic diversification)', 0.05),
        ('D1', 'Product/service diversification', 0.05),
        ('D2', 'Geographic diversification', 0.04),
        ('E1', 'Environmental/transition risk', 0.05),
        ('E2', 'Technology disruption risk', 0.05),
    ]
    
    BANDS = [
        (0.0, 2.5, 'STRONG', 'green', 
         'Outperforms sector; minimal company-specific risk'),
        (2.5, 4.0, 'GOOD', 'lightgreen',
         'Above-average position; manageable risks'),
        (4.0, 5.5, 'AVERAGE', 'gold',
         'In-line with sector; standard risk profile'),
        (5.5, 7.0, 'WEAK', 'orange',
         'Below-sector performance; specific risks identified'),
        (7.0, 10.1, 'VERY WEAK', 'red',
         'Significant company-specific vulnerabilities'),
    ]
    
    def __init__(self, borrower_name: str, assessment_date: date,
                 analyst: str, review_type: str = 'Annual Review'):
        self.borrower_name = borrower_name
        self.assessment_date = assessment_date
        self.analyst = analyst
        self.review_type = review_type
        self.factors: Dict[str, BRAFactor] = {}
        self.customer_concentration_pct: Optional[float] = None
        self.order_book_months: Optional[float] = None
        self.key_risks: List[str] = []
        self.mitigants: List[str] = []
    
    def add_factor_score(self, factor_code: str, raw_score: float,
                         evidence: str = "") -> None:
        """Add or update a factor score."""
        factor_def = next(
            (f for f in self.DEFAULT_FACTORS if f[0] == factor_code), None
        )
        if not factor_def:
            raise ValueError(f"Unknown factor code: {factor_code}")
        
        factor = BRAFactor(
            code=factor_code,
            description=factor_def[1],
            weight=factor_def[2],
            raw_score=raw_score,
            evidence=evidence
        )
        factor.validate()
        self.factors[factor_code] = factor
    
    def load_all_scores(self, scores: Dict[str, float],
                        evidence: Optional[Dict[str, str]] = None) -> None:
        """Load all factor scores at once from a dict."""
        for code, score in scores.items():
            ev = evidence.get(code, '') if evidence else ''
            self.add_factor_score(code, score, ev)
    
    @property
    def total_score(self) -> float:
        """Total weighted BRA score."""
        if len(self.factors) < len(self.DEFAULT_FACTORS):
            missing = [f[0] for f in self.DEFAULT_FACTORS 
                      if f[0] not in self.factors]
            raise ValueError(f"Incomplete scorecard — missing: {missing}")
        return sum(f.weighted_score for f in self.factors.values())
    
    @property
    def band(self) -> Tuple[str, str, str]:
        """Returns (band_label, colour, description) for current score."""
        score = self.total_score
        for low, high, label, colour, desc in self.BANDS:
            if low <= score < high:
                return label, colour, desc
        return 'UNKNOWN', 'grey', ''
    
    def get_top_risk_factors(self, n: int = 3) -> List[BRAFactor]:
        """Returns the n factors with highest weighted scores (= biggest risk contributors)."""
        return sorted(self.factors.values(), 
                     key=lambda f: f.weighted_score, reverse=True)[:n]
    
    def generate_flags(self) -> List[str]:
        """Auto-generates risk flags based on scores and metadata."""
        flags = []
        
        # Customer concentration flag
        if self.customer_concentration_pct is not None:
            if self.customer_concentration_pct >= 50:
                flags.append(
                    f"EXTREME customer concentration: {self.customer_concentration_pct:.0f}% "
                    f"in single customer — mandatory mitigant review"
                )
            elif self.customer_concentration_pct >= 30:
                flags.append(
                    f"HIGH customer concentration: {self.customer_concentration_pct:.0f}% "
                    f"in single customer — explicit approval note required"
                )
            elif self.customer_concentration_pct >= 20:
                flags.append(
                    f"ELEVATED customer concentration: {self.customer_concentration_pct:.0f}% "
                    f"— 20% rule triggered, document full assessment"
                )
        
        # Order book flag
        if self.order_book_months is not None and self.order_book_months < 6:
            flags.append(
                f"LOW order book coverage: {self.order_book_months:.1f} months "
                f"— revenue visibility risk"
            )
        
        # High individual factor flags
        for factor in self.factors.values():
            if factor.raw_score >= 8.0:
                flags.append(
                    f"HIGH RISK factor {factor.code} "
                    f"({factor.description}): score {factor.raw_score:.0f}/10"
                )
        
        # Total score flag
        band_label, _, _ = self.band
        if band_label in ('WEAK', 'VERY WEAK'):
            flags.append(
                f"Overall BRA score {self.total_score:.2f}/10 ({band_label}) "
                f"— requires Senior Credit Officer sign-off"
            )
        
        return flags
    
    def to_dataframe(self) -> pd.DataFrame:
        """Returns factor scores as a DataFrame for export."""
        rows = []
        for factor in self.factors.values():
            rows.append({
                'Factor Code': factor.code,
                'Description': factor.description,
                'Weight': f"{factor.weight:.0%}",
                'Raw Score': factor.raw_score,
                'Weighted Score': round(factor.weighted_score, 3),
                'Evidence': factor.evidence
            })
        
        df = pd.DataFrame(rows)
        # Add total row
        total_row = pd.DataFrame([{
            'Factor Code': 'TOTAL',
            'Description': 'Total Business Risk Score',
            'Weight': '100%',
            'Raw Score': '',
            'Weighted Score': round(self.total_score, 2),
            'Evidence': ''
        }])
        return pd.concat([df, total_row], ignore_index=True)
    
    def print_summary(self) -> None:
        """Prints formatted scorecard summary to console."""
        band_label, colour, band_desc = self.band
        separator = "=" * 70
        
        print(separator)
        print(f"BUSINESS RISK ASSESSMENT — {self.borrower_name.upper()}")
        print(f"Date: {self.assessment_date} | Analyst: {self.analyst}")
        print(f"Review Type: {self.review_type}")
        print(separator)
        print(f"\nTOTAL BUSINESS RISK SCORE: {self.total_score:.2f} / 10.00")
        print(f"RISK BAND: {band_label} — {band_desc}")
        print()
        
        print("TOP RISK FACTORS:")
        for i, factor in enumerate(self.get_top_risk_factors(3), 1):
            print(f"  {i}. {factor.code} — {factor.description}")
            print(f"     Score: {factor.raw_score:.1f}/10 | "
                  f"Weighted contribution: {factor.weighted_score:.3f}")
        
        flags = self.generate_flags()
        if flags:
            print("\nRISK FLAGS:")
            for flag in flags:
                print(f"  !! {flag}")
        
        print(separator)


# ============================================================
# 2. CUSTOMER CONCENTRATION ANALYSIS
# ============================================================

class CustomerConcentrationAnalyser:
    """
    Analyses customer revenue concentration and calculates
    concentration risk metrics.
    """
    
    def __init__(self, revenue_by_customer: Dict[str, float]):
        """
        Args:
            revenue_by_customer: {'Customer Name': revenue_amount}
        """
        self.data = pd.DataFrame(
            list(revenue_by_customer.items()),
            columns=['customer', 'revenue']
        ).sort_values('revenue', ascending=False)
        
        self.total_revenue = self.data['revenue'].sum()
        self.data['revenue_share'] = (
            self.data['revenue'] / self.total_revenue * 100
        )
        self.data['cumulative_share'] = self.data['revenue_share'].cumsum()
    
    @property
    def top_customer_pct(self) -> float:
        return self.data.iloc[0]['revenue_share']
    
    @property
    def top3_customer_pct(self) -> float:
        return self.data.head(3)['revenue_share'].sum()
    
    @property
    def herfindahl_index(self) -> float:
        """Customer HHI — higher = more concentrated."""
        return sum((s/100)**2 * 10000 for s in self.data['revenue_share'])
    
    def customers_above_threshold(self, threshold_pct: float) -> pd.DataFrame:
        """Returns customers above a given revenue share threshold."""
        return self.data[self.data['revenue_share'] >= threshold_pct]
    
    def concentration_risk_score(self) -> float:
        """
        Maps customer concentration to a BRA factor score (1-10).
        Aligns with the scoring anchors from Section 8.
        """
        top = self.top_customer_pct
        if top < 10:
            return 1.5
        elif top < 20:
            return 3.5
        elif top < 30:
            return 5.5
        elif top < 40:
            return 7.5
        else:
            return 9.0
    
    def plot_concentration(self, company_name: str = '') -> plt.Figure:
        """
        Creates a two-panel chart: waterfall by customer and 
        cumulative concentration curve.
        """
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))
        fig.suptitle(
            f'Customer Revenue Concentration — {company_name}',
            fontweight='bold', fontsize=13
        )
        
        # Panel 1: Bar chart by customer (top 10)
        top10 = self.data.head(10)
        colours = [
            '#d32f2f' if s >= 30 else 
            '#f57c00' if s >= 20 else 
            '#fbc02d' if s >= 10 else 
            '#388e3c'
            for s in top10['revenue_share']
        ]
        ax1.bar(range(len(top10)), top10['revenue_share'], color=colours)
        ax1.set_xticks(range(len(top10)))
        ax1.set_xticklabels(
            [c[:15] + '...' if len(c) > 15 else c 
             for c in top10['customer']],
            rotation=45, ha='right', fontsize=8
        )
        ax1.axhline(y=20, color='orange', linestyle='--', 
                    label='20% rule threshold')
        ax1.axhline(y=30, color='red', linestyle='--', 
                    label='30% high-risk threshold')
        ax1.set_ylabel('Revenue Share (%)')
        ax1.set_title('Revenue by Customer (Top 10)')
        ax1.legend(fontsize=8)
        
        # Panel 2: Cumulative concentration curve
        x = range(1, len(self.data) + 1)
        ax2.plot(x, self.data['cumulative_share'], 
                 color='navy', linewidth=2)
        ax2.fill_between(x, self.data['cumulative_share'],
                         alpha=0.2, color='navy')
        ax2.axhline(y=80, color='red', linestyle='--', alpha=0.7,
                    label='80% concentration line')
        ax2.set_xlabel('Number of Customers (ranked by revenue)')
        ax2.set_ylabel('Cumulative Revenue Share (%)')
        ax2.set_title('Concentration Curve')
        ax2.legend(fontsize=8)
        
        # Annotate HHI
        fig.text(0.5, 0.02, 
                 f'Customer HHI: {self.herfindahl_index:.0f} | '
                 f'Top customer: {self.top_customer_pct:.1f}% | '
                 f'Top 3: {self.top3_customer_pct:.1f}%',
                 ha='center', fontsize=10, 
                 bbox=dict(boxstyle='round', facecolor='lightyellow'))
        
        plt.tight_layout(rect=[0, 0.05, 1, 1])
        return fig


# ============================================================
# 3. NLP NEWS SENTIMENT FOR BUSINESS RISK MONITORING
# Uses a lightweight approach suitable for bank environments
# ============================================================

class BusinessRiskNewsSentimentAnalyser:
    """
    Scans news headlines/summaries for business risk-relevant events.
    Uses keyword matching as a practical first-pass (banks may not
    have transformer model access in production environments).
    For transformer-based sentiment, use HuggingFace finBERT.
    """
    
    # Risk event keywords by category
    RISK_KEYWORDS = {
        'customer_loss': [
            'contract lost', 'loses contract', 'customer departs',
            'major client', 'ends relationship', 'contract terminated',
            'loss of contract', 'cancelled contract'
        ],
        'management_issue': [
            'CEO resigns', 'CFO leaves', 'management departure',
            'boardroom dispute', 'director fired', 'management shake',
            'chief executive steps down', 'finance director departure'
        ],
        'regulatory': [
            'fine', 'investigation', 'regulatory action', 'FCA action',
            'HSE prosecution', 'environmental violation', 'trading standards',
            'HMRC investigation', 'fraud investigation', 'probe'
        ],
        'financial_stress': [
            'profit warning', 'cash flow concerns', 'losses widened',
            'refinancing', 'covenant breach', 'liquidity concerns',
            'restructuring', 'job cuts', 'redundancies', 'administration',
            'insolvency', 'creditor deal'
        ],
        'supply_chain': [
            'supply disruption', 'supplier failure', 'shortage',
            'component shortage', 'logistics issues', 'port delays'
        ],
        'esg': [
            'pollution', 'environmental breach', 'carbon fine',
            'ESG failure', 'greenwashing', 'safety incident',
            'worker injury', 'industrial accident'
        ]
    }
    
    def __init__(self, company_name: str):
        self.company_name = company_name
        self.alerts = []
    
    def scan_news_items(self, 
                        news_items: List[Dict]) -> pd.DataFrame:
        """
        Scans a list of news items for risk keywords.
        
        Args:
            news_items: list of {'date': str, 'headline': str, 
                                 'summary': str, 'source': str}
        
        Returns:
            DataFrame of flagged items with risk category and severity
        """
        flagged = []
        
        for item in news_items:
            text = (item.get('headline', '') + ' ' + 
                   item.get('summary', '')).lower()
            
            # Check if this news item is about our company
            if self.company_name.lower() not in text:
                continue
            
            matched_categories = []
            for category, keywords in self.RISK_KEYWORDS.items():
                if any(kw.lower() in text for kw in keywords):
                    matched_keywords = [
                        kw for kw in keywords if kw.lower() in text
                    ]
                    matched_categories.append({
                        'category': category,
                        'matched_keywords': matched_keywords
                    })
            
            if matched_categories:
                # Severity based on categories: financial_stress = highest
                severity_map = {
                    'financial_stress': 'CRITICAL',
                    'management_issue': 'HIGH',
                    'customer_loss': 'HIGH',
                    'regulatory': 'HIGH',
                    'supply_chain': 'MEDIUM',
                    'esg': 'MEDIUM'
                }
                
                categories = [m['category'] for m in matched_categories]
                severity = max(
                    (severity_map.get(c, 'LOW') for c in categories),
                    key=lambda s: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].index(s)
                )
                
                flagged.append({
                    'date': item.get('date', ''),
                    'headline': item.get('headline', ''),
                    'source': item.get('source', ''),
                    'risk_categories': ', '.join(categories),
                    'severity': severity,
                    'requires_review': severity in ('HIGH', 'CRITICAL')
                })
        
        alerts_df = pd.DataFrame(flagged) if flagged else pd.DataFrame(
            columns=['date', 'headline', 'source', 
                    'risk_categories', 'severity', 'requires_review']
        )
        
        if not alerts_df.empty:
            alerts_df = alerts_df.sort_values(
                'severity',
                key=lambda col: col.map(
                    {'CRITICAL': 3, 'HIGH': 2, 'MEDIUM': 1, 'LOW': 0}
                ),
                ascending=False
            )
        
        self.alerts = alerts_df
        return alerts_df


# ============================================================
# EXAMPLE USAGE
# ============================================================

if __name__ == '__main__':
    
    # Case Study 2: Two construction companies — same financials
    # Company A: Government contracts, Company B: Spot residential
    
    # --- Company A: GovBuild Limited ---
    scorer_a = BusinessRiskScorecard(
        borrower_name='GovBuild Limited',
        assessment_date=date(2024, 6, 30),
        analyst='J. Smith',
        review_type='Annual Review'
    )
    
    scores_a = {
        'A1': 4.0,   # Good market position in government frameworks
        'A2': 5.0,   # Moderate — not highly differentiated
        'A3': 4.0,   # Some barriers (framework qualification)
        'A4': 5.0,   # Limited pricing power — public sector cost-plus
        'B1': 3.5,   # Top customer (DWP) = 22% but stable relationship
        'B2': 4.0,   # 8 government departments; good spread
        'B3': 2.5,   # Long-standing relationships, 3+ year frameworks
        'B4': 2.0,   # Predominantly multi-year framework contracts
        'C1': 5.0,   # Some materials single-source dependency
        'C2': 4.5,   # UK-centric supply chain
        'D1': 4.0,   # Mix of build types (education, healthcare, office)
        'D2': 5.0,   # England-based, limited geographic spread
        'E1': 5.0,   # Moderate transition risk (construction emissions)
        'E2': 4.0,   # Some tech disruption risk (offsite manufacturing)
    }
    scorer_a.load_all_scores(scores_a)
    scorer_a.customer_concentration_pct = 22.0
    scorer_a.order_book_months = 22.0
    
    # --- Company B: SpotBuild Limited ---
    scorer_b = BusinessRiskScorecard(
        borrower_name='SpotBuild Limited',
        assessment_date=date(2024, 6, 30),
        analyst='J. Smith',
        review_type='Annual Review'
    )
    
    scores_b = {
        'A1': 7.0,   # Weak position — subscale residential builder
        'A2': 7.5,   # No differentiation; price competition
        'A3': 6.5,   # Low barriers in residential spot market
        'A4': 8.0,   # No pricing power — price taker in local market
        'B1': 7.5,   # Main developer (Taylor Wimpey subcontract) = 45%
        'B2': 7.0,   # Effectively 3 customers; high concentration
        'B3': 7.0,   # Spot relationships; no loyalty or preference
        'B4': 8.5,   # Spot contracts; no backlog; order-by-order
        'C1': 6.0,   # Some single-source risk on specialist subcontractors
        'C2': 5.5,   # Regional supply chain; limited alternatives
        'D1': 7.0,   # Residential only; no commercial/public sector
        'D2': 8.0,   # Single region only; highly localised
        'E1': 5.5,   # Transition risk (embodied carbon in residential)
        'E2': 5.0,   # Moderate tech risk (offsite/MMC disruption)
    }
    scorer_b.load_all_scores(scores_b)
    scorer_b.customer_concentration_pct = 45.0
    scorer_b.order_book_months = 2.5
    
    # Print summaries
    scorer_a.print_summary()
    print()
    scorer_b.print_summary()
    
    print("\n--- COMPARISON ---")
    print(f"GovBuild BRA Score:  {scorer_a.total_score:.2f}/10 ({scorer_a.band[0]})")
    print(f"SpotBuild BRA Score: {scorer_b.total_score:.2f}/10 ({scorer_b.band[0]})")
    print(f"\nDespite IDENTICAL financial ratios, SpotBuild carries")
    print(f"materially higher business risk due to customer concentration,")
    print(f"spot contract exposure, and geographic/product concentration.")
```

---

## 11. Interview Questions

**Question 1:** "How would you assess the business risk of a £50m turnover manufacturer with 35% of revenue from one customer?"

*Strong answer:* Customer concentration at 35% is a major risk factor — it breaches the 20% rule and approaches the threshold requiring mandatory mitigant analysis. I would: (1) identify who the customer is — a blue-chip investment-grade corporate versus a smaller private company are very different risks; (2) understand the contractual relationship — multi-year contract with volume commitments, or purely spot purchasing? (3) understand switching barriers — how easy is it for the customer to switch to an alternative supplier? (4) examine the historical relationship — how long has it existed, has it grown or declined, are there any relationship threats? (5) identify available mitigants — trade credit insurance on that debtor, collateral assignment of the contract. The concentration does not preclude lending, but it caps the debt I would approve and requires explicit credit committee commentary.

**Question 2:** "Explain the difference between industry risk and business risk, and give an example where they diverge significantly."

*Strong answer:* Industry risk is systematic — it affects all companies in the sector. Business risk is idiosyncratic — it's specific to this company within the sector. They can diverge significantly. Example: UK retail sector (high industry risk — structural decline, e-commerce threat, IFRS 16 lease burden). Within that sector, a specialist outdoor clothing retailer like Alpkit may have a STRONG business risk profile because: dominant market position in a defensible niche (outdoor enthusiasts), differentiated product, loyal direct-to-consumer customer base, no customer concentration, multi-channel presence with strong online capability, and no structural threat from Amazon (customers seek specialist advice). Industry risk: 7/10. Business risk: 3/10. The combination gives a very different credit outcome than a mid-market department store in the same sector.

**Question 3:** "What is the 'order book coverage ratio' and why does it matter?"

*Strong answer:* Order book coverage = contracted backlog / annual revenue. It expresses how many months (or years) of contracted revenue the company has locked in. A ratio of 1.5x means 18 months of work is in the book. Why it matters for credit: a company with 18 months of backlog has revenue visibility that allows the analyst to stress test near-term debt service capacity with high confidence. A company with 2 months of backlog depends entirely on winning new work every quarter to generate revenue. During a downturn, backlogs shrink. A company with strong backlog at cycle peak has a buffer; a company with thin backlog hits cash flow stress immediately. The quality of the backlog matters too: fixed-price contracts in the backlog carry more risk than cost-plus, and a backlog dominated by one customer is almost as risky as no backlog at all.

**Question 4:** "How does ESG analysis fit into a credit risk assessment of a manufacturing company?"

*Strong answer:* ESG in credit is not about ethics or compliance — it is about identifying financial risks. For a manufacturer: (1) Transition risk: if the company is a heavy energy user or high-carbon emitter, rising UK ETS carbon prices are a direct cost increase. If scope 3 emissions reporting requirements force the company's customers to demand lower-carbon suppliers, the company faces revenue risk. (2) Physical risk: is a key manufacturing site in a flood plain? Rising insurance costs and potential production interruption. (3) Social: are there ongoing labour disputes, health and safety prosecutions, or community opposition that could disrupt operations? (4) Governance: are there related-party transactions, board independence issues, or transparency concerns that indicate agency risk? I score ESG explicitly in the business risk scorecard and flag material ESG risks in the credit narrative.

---

## 12. Common Mistakes

**Mistake 1: Treating qualitative assessment as a box-ticking exercise.**
The most common failure mode for analysts transitioning from a financial analysis background: they spend 95% of their time on the financial model and complete the business risk scorecard in 10 minutes by assigning scores without evidence. Business risk scoring without evidence is not analysis — it is guessing dressed up in a spreadsheet. Every score must have a specific, factual justification. "Market position score: 6/10 because IBISWorld reports the company holds approximately 3–5% of the UK specialist packaging market, with three larger domestic competitors, and no proprietary products." That is analysis.

**Mistake 2: Failing to push back on management's narrative.**
In management meetings, the borrower will present the best possible version of their business. Experienced analysts probe the narrative: "You say you have long-term relationships with your top customers — can you show me the contract terms?" "You say your supply chain is diversified — what is your single-source exposure for component X?" Accepting the management narrative at face value is not analysis.

**Mistake 3: Ignoring order book quality in favour of order book size.**
A company that presents an "order book of £200m" looks impressive against £80m annual revenue (2.5x coverage). But if £150m of that order book is a single fixed-price infrastructure contract with a challenging specification and a tight margin, the coverage is illusory — one cost overrun event turns that single contract into a loss and eliminates the apparent cushion. Always ask: what type of contracts? What are the margin assumptions? What are the contingency provisions?

**Mistake 4: Not connecting business risk to financial projections.**
Business risk analysis should directly inform the financial model. If customer concentration is 35% in a single customer, the downside financial scenario should model the loss of that customer. If supply chain risk is high, the downside scenario should model a cost spike from supply disruption. Many analysts treat business risk assessment and financial modelling as separate exercises. They should be integrated: the business risk flags generate the stress scenarios.

**Mistake 5: Overweighting recent good performance.**
A business that has grown strongly for three years may have excellent financials but a business risk profile that is deteriorating: a new competitor has entered their market, a key customer has been acquired by a company known to in-source, the founding MD who built all the customer relationships is 67 and has no succession plan. These are LEADING indicators of future deterioration; the financial ratios are LAGGING indicators of past performance. Business risk assessment must be forward-looking.

---

## 13. Case Studies

### Case Study 1: Identical Financials, Opposite Business Risk Profiles

**Setup:** Two construction companies in the same sector (UK civil engineering), assessed in 2024. Financial ratios identical: Revenue £120m, EBITDA margin 10%, Net Debt/EBITDA 3.0x, DSCR 2.1x.

**Company A: GovBuild Limited**
- Revenue split: 22% MOD defence contracts (5-year framework), 19% NHS infrastructure (3-year framework), 15% local authority education (rolling framework), 44% diversified public sector projects
- Top customer: 22% (MOD) — triggers 20% rule but counterparty is UK government (AAA equivalent)
- Order book: £264m (22 months coverage at £144m annual revenue — assumes some growth)
- Contracts: 85% cost-plus-fixed-fee framework agreements; 15% lump sum for smaller works
- Supply chain: Diversified; multiple approved subcontractors per trade; maintains buffer stock of key materials
- ESG: Active net-zero roadmap; already measuring embodied carbon; preferred supplier status with carbon-conscious clients
- BRA Score: 3.4/10 (GOOD)

**Company B: SpotBuild Limited**
- Revenue split: 45% single housebuilder (Taylor Wimpey subcontract), 30% three smaller regional developers, 25% spot residential
- Top customer: 45% — extreme concentration
- Order book: £25m (2.5 months coverage) — almost entirely dependent on winning new work
- Contracts: 100% spot; no framework agreements; all fixed-price by project
- Supply chain: Primary groundworks subcontractor (60% of cost) is single-source; no alternatives qualified
- ESG: No ESG reporting; recent HSE improvement notice (minor)
- BRA Score: 7.2/10 (VERY WEAK)

**Credit decision:** Both companies have identical financials. Both present a 3.0x leverage ratio. But the credit analyst's conclusion is fundamentally different:

- GovBuild: Approve requested facilities at the base rate; standard covenant package; medium credit grade
- SpotBuild: Significant concerns. The 45% customer concentration means that a decision by Taylor Wimpey to in-source or switch contractor eliminates £54m of revenue. In that scenario, EBITDA turns negative within 12 months, and the loan is impaired. Even without customer loss, the absence of backlog means SpotBuild has no visibility through a recession. The thin order book combined with fixed-price residential contracts in a market facing planning delays and material cost inflation represents a crystallisation risk. Cannot approve at current leverage without: (a) trade credit insurance on Taylor Wimpey receivables, (b) personal guarantee from the director, (c) lower leverage ceiling (2.0x), (d) more frequent financial reporting.

**Lesson:** Business risk assessment overrode the apparent financial equivalence. The credit analyst who only looked at the numbers would have approved both credits at the same terms. The analyst who did proper business risk assessment saw two completely different risks underneath identical financial ratios.

---

### Case Study 2: ESG Business Risk — Textile Manufacturer

**Company:** FabricCo UK Limited. A UK-based textile manufacturer supplying fast-fashion retailers. £95m revenue, 12% EBITDA margin, 2.2x leverage. On current financials, a good quality credit.

**Business risk flags identified:**
1. Top 3 customers are all fast-fashion retailers (Primark, Boohoo, ASOS) — 78% revenue concentration in a sector facing regulatory and reputational pressure on fast fashion
2. Manufacturing in Bangladesh (50%) and Vietnam (30%) via sub-contracted factories — supply chain opacity; two of the contracted factories were cited in a Guardian investigation in 2022 for labour standard violations
3. ASOS (22% of FabricCo revenue) has announced a public commitment to reduce fast-fashion sourcing by 30% by 2026 as part of their ESG strategy
4. EU Corporate Sustainability Due Diligence Directive (CS3D) will require FabricCo's EU customers to audit their suppliers' supply chains for labour standards

**Credit implications:**
- The stated financial position (2.2x leverage) is very different from the stressed position (ASOS reduces purchasing by 30% per their commitment: revenue falls £7m; compounded with other fast-fashion sector pressure, EBITDA could fall from £11.4m to £7m; leverage rises to 3.6x)
- Supply chain regulatory risk: CS3D could require FabricCo to conduct and publicly disclose supply chain audits. Non-compliance by their sub-contracted factories exposes FabricCo to contract termination by EU customers
- Social licence risk: the reputational risk from the Guardian investigation creates counterparty relationship risk — a second adverse press event could accelerate customer departures

**Decision:** The business risk score for FabricCo is 6.8/10 (WEAK), despite the strong headline financials. Credit terms offered: (a) facilities at 2.0x maximum leverage (lower than the standard 3.0x for this financial profile), (b) covenant requiring annual supply chain audit of all tier-1 suppliers, (c) quarterly financial reporting, (d) material adverse change clause specifically referencing loss of 15%+ revenue from any single customer.

---

## 14. Iterative Reinforcement

**Week 1:**
1. Complete a business risk scorecard for a public company of your choice. Use the Companies House annual report, an IBISWorld report, and news search. Score every factor with evidence. Discuss with a colleague and identify where your scores diverge and why.
2. Calculate the customer concentration score from the "major customers" disclosure in a public company's annual report (most UK listed companies disclose customers accounting for more than 10% of revenue). Map this to the B1 factor score.
3. Draft the "business risk" section of a credit paper for the same company — 300 words covering market position, key risks, and mitigants.

**Week 2:**
1. Run the Python business risk scorecard for the two construction company case study. Print the comparison output and identify the specific factors driving the divergence.
2. Load the SQL business risk score migration query against a sample dataset. Identify which borrowers have shown the most significant score deterioration in the past 12 months.
3. Identify a real-world company that has defaulted in the past five years. Search for historical news coverage. Could the NLP sentiment scanner have flagged the risk 6–12 months before default? What were the early warning keywords?

**Month 1 consolidation:**
Review three credit files from your portfolio (or case study files provided by your manager). For each, score the business risk in arrears using this module's scorecard. Compare your scores to the original analyst's assessment. Where there are divergences, identify whether the divergence was due to: (a) missing information, (b) different interpretation of the same information, or (c) information that was available but not sought. This retrospective exercise is the fastest way to calibrate your business risk assessment judgement.

---

## 15. Source Material

**Banks' own methodologies:**
- Barclays Credit Risk Assessment Framework (internal, referenced in PRA supervisory discussions)
- Lloyds Banking Group "Credit Risk Appetite and Policy" documentation (disclosed in Annual Report risk section)
- HSBC "Credit and Market Risk Management" (HSBC Annual Report, Risk section)

**Rating agency frameworks:**
- S&P Global Ratings, "Corporate Methodology" (November 2013, updated periodically) — the definitive public statement of how S&P incorporates competitive position, management, and governance into corporate ratings. Business risk profile analysis begins on page 8.
- Moody's Investors Service, "Rating Methodology: Manufacturing Industry" — covers how competitive position and customer risk affect Moody's corporate ratings
- Fitch Ratings, "Corporate Rating Criteria" — covers business profile assessment

**Academic research:**
- Grunert, J., Norden, L., & Weber, M. (2005). "The role of non-financial factors in internal credit ratings." *Journal of Banking & Finance*, 29(2), 509–531. — Empirical proof that qualitative factors predict default beyond financial ratios
- Berger, A.N., & Frame, W.S. (2007). "Small business credit scoring and credit availability." *Journal of Small Business Management*, 45(1), 5–22
- Hasan, I., Hoi, C.K.S., Wu, Q., & Zhang, H. (2014). "Beauty is in the eye of the beholder: The effect of corporate tax avoidance on the cost of bank loans." *Journal of Financial Economics*, 113(1), 109–130

**Regulatory:**
- EBA Guidelines on loan origination and monitoring (EBA/GL/2020/06) — Part 5 covers the credit assessment framework including qualitative factors
- PRA SS1/21 "Model Risk Management Principles for Banks" — requires validation of qualitative factors in rating models
- IFRS 9 "Financial Instruments" (IASB, 2014) — paragraphs B5.5.17 and B5.5.18 discuss qualitative SICR indicators

**Practical guides:**
- Richards, J., & Sherrat, N. (2018). *Credit Analysis and Lending Management* (Chartered Banker Institute, Edinburgh) — the most comprehensive UK-specific credit analysis textbook, Chapter 6 covers business risk assessment
- Caouette, J., Altman, E., Narayanan, P., & Nimmo, R. (2008). *Managing Credit Risk: The Great Challenge for Global Financial Markets* (2nd ed., Wiley)
- ICAEW Financial Reporting Faculty, "Understanding Financial Statements" — useful for the accounting concepts section
