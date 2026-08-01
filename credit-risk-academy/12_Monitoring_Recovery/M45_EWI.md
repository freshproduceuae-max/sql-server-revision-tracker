# M45 — Early Warning Indicators (EWI)

## 1. Business Purpose

Early Warning Indicators (EWI) are the set of quantitative and qualitative signals that alert a bank to deteriorating credit quality before a formal default or covenant breach occurs. The fundamental premise is that credit deterioration follows a trajectory: distress signals appear weeks or months before a borrower misses a payment. A bank that identifies these signals early can take protective action — reducing exposure, requiring additional security, insisting on management changes, or initiating a restructuring — that significantly improves recovery outcomes.

The economic case for EWI is compelling. Studies by the Bank of England and commercial banks consistently show that recovery rates are materially higher when distress is identified early and the bank engages proactively. A borrower who approaches a bank six months before a crisis is far more likely to be viable with bank support than one whose bank only becomes aware of problems when a payment is missed.

EWI systems serve multiple functions:

1. **Portfolio management:** Identifying deteriorating names before they appear in the formal default or Stage 3 statistics allows portfolio managers to take proactive decisions.
2. **IFRS 9 SICR triggers:** SICR (Significant Increase in Credit Risk) under IFRS 9 must be identified promptly. EWI alerts feed the monthly staging assessment.
3. **Watch list management:** The watch list (sometimes called the "sensitive list" or "names of concern") is populated by EWI alerts. Enhanced monitoring and early escalation to Restructuring follow.
4. **Regulatory compliance:** EBA/GL/2020/06 requires banks to implement early warning indicator frameworks as part of their monitoring obligations.
5. **Capital management:** Stage 2 classification (SICR) increases provisioning from 12-month to lifetime ECL, impacting reported capital ratios. EWI management affects the timing and magnitude of provision charges.

False positives are a significant concern. An EWI system that generates excessive alerts creates alert fatigue, causes relationship stress with borrowers, and diverts credit officer time from genuine cases. Calibrating thresholds to minimise false positives while maintaining sensitivity is a key design challenge.

## 2. Accounting Concepts

**IFRS 9 SICR and EWI integration.** IFRS 9 paragraph 5.5.4 requires entities to assess whether credit risk has increased significantly at each reporting date. Paragraph B5.5.17 provides a non-exhaustive list of indicators of SICR, many of which align directly with EWI categories:
- Actual or expected significant changes in the financial instrument's external credit rating
- An actual or expected significant change in operating results of the borrower
- Significant changes in the value of the collateral
- Significant increase in credit risk on other financial instruments of the same borrower

Banks typically translate these principles into a specific list of EWI triggers that, if observed, automatically flag a facility for Stage 2 reclassification review.

**Forbearance accounting.** When a bank takes action in response to an EWI alert — such as granting a temporary covenant waiver or deferring a principal repayment — this constitutes forbearance under IFRS 9. Forborne exposures are classified as Stage 2 at minimum for the duration of the forbearance period plus a 12-month probation period.

**ECL model overlays.** Banks with sophisticated IFRS 9 models use EWI scores as inputs to ECL calculation overlays. A borrower with multiple EWI alerts receives a higher-than-model PD through a management overlay, increasing the Stage 1 or Stage 2 provision even before a formal stage migration.

**Loss emergence period.** EWI systems are calibrated to identify signals during the loss emergence period — the time between a borrower entering financial distress and the bank recognising a credit loss. Shortening the loss emergence period through better EWI reduces the surprise element of credit losses.

**Accounting for EWI-triggered provisions.** When a credit officer responds to an EWI alert by performing an individual assessment (typically for Stage 3 or large Stage 2 exposures), the resulting provision is calculated as the difference between the gross carrying amount and the present value of estimated future cash flows. The EWI assessment provides the basis for revising the cash flow estimates.

## 3. Financial Concepts

**Trend analysis vs threshold analysis.** EWI can be triggered either by crossing an absolute threshold (DSCR drops below 1.00x) or by a trend metric (DSCR has fallen by more than 20% over 4 quarters). Trend-based triggers are often more valuable because they identify deterioration earlier, before absolute thresholds are breached.

**Behavioural score drivers.** Behavioural scores (commonly used for consumer and SME portfolios) are statistical models that predict default probability based on transactional behaviour: average balance relative to limit, payment amounts, number of missed payments, reversal of direct debits. The EWI framework for larger corporate lending adapts this concept using facility utilisation, payment pattern analysis, and changes in current account behaviour.

**Working capital signals.** Changes in working capital metrics are often the first financial signal of deteriorating credit quality:
- Debtor days increasing (customers taking longer to pay)
- Creditor days decreasing (suppliers demanding earlier payment)
- Inventory buildup (stock not being sold)
- Increasing cash cycle (cash tied up in working capital for longer)

These signals can be extracted from quarterly management accounts before they reach the level of a covenant breach.

**Z-score and distress models.** Altman's Z-score (1968, updated for non-public firms) is a discriminant analysis model that uses 5 financial ratios to classify firms into distress, grey zone, and safe zone:
- Z' = 0.717(X1) + 0.847(X2) + 3.107(X3) + 0.420(X4) + 0.998(X5)
- Where X1 = Working Capital/Total Assets, X2 = Retained Earnings/Total Assets, X3 = EBIT/Total Assets, X4 = Book Value of Equity/Total Liabilities, X5 = Revenue/Total Assets
- Z' < 1.23: Distress zone; 1.23 < Z' < 2.90: Grey zone; Z' > 2.90: Safe zone

Many banks use the Z-score as one EWI component for manufacturing firms.

**CDS spread widening.** For larger, publicly-traded borrowers, widening credit default swap spreads are a market-based EWI. CDS spreads incorporate market participants' collective assessment of default risk and react faster than rating agency changes. A CDS spread wider than 300bps is generally considered a significant distress signal.

**Equity price decline.** For listed companies, a stock price decline of 30-50% over 6-12 months is a strong EWI. The equity option model of credit risk (Merton model) directly links equity volatility and price to credit risk: as equity value falls and volatility rises, the probability of the firm's assets falling below its debt obligations increases.

## 4. Statistical Concepts

**Logistic regression for EWI scoring.** Many banks build EWI scoring models using logistic regression:

P(EWI alert within 12 months) = 1 / (1 + e^-(β₀ + β₁X₁ + β₂X₂ + ... + βₙXₙ))

Where X₁...Xₙ are EWI variables (DSCR, leverage, utilisation, etc.). The model is trained on historical data where the outcome variable is whether the borrower defaulted within 12 months.

**ROC curve and AUC.** The performance of an EWI model is measured by its ROC (Receiver Operating Characteristic) curve and AUC (Area Under Curve). An AUC of 0.70 means the model correctly ranks a defaulting borrower above a non-defaulting one 70% of the time. A good EWI model should achieve AUC > 0.75.

**Precision and Recall trade-off.** For EWI systems, the choice of threshold determines the precision-recall trade-off:
- High threshold (only trigger on strong signals): high precision (fewer false positives), low recall (miss more true positives)
- Low threshold (trigger on weak signals): low precision (many false positives), high recall (catch more true positives)

Banks must calibrate this threshold based on the relative costs of false positives (relationship damage, credit officer time) and false negatives (missed defaults, higher losses).

**Survival analysis.** Time-to-default modelling uses survival analysis (Kaplan-Meier estimator, Cox proportional hazard model) to estimate the probability of surviving beyond time t given that the borrower is alive at time 0. EWI variables are covariates in the Cox model, and their coefficients reveal their predictive power for time-to-default.

**Confusion matrix for EWI calibration:**
```
                  Actually Defaults   Actually Performs
EWI Alert (Positive)   TP             FP (false positive)
No EWI Alert (Neg.)    FN (missed)    TN

Precision = TP / (TP + FP)  — of alerts raised, % that are correct
Recall    = TP / (TP + FN)  — of defaults, % that were caught
F1 Score  = 2 × (Precision × Recall) / (Precision + Recall)
```

**Feature importance.** Machine learning models (random forest, gradient boosting) can rank EWI variables by predictive importance. This allows banks to focus monitoring resources on the most informative signals.

## 5. Regulatory Framework

**EBA/GL/2020/06 — Section 7: Monitoring Framework.** Paragraph 191 specifies that institutions shall implement effective systems and procedures to monitor credit facilities and the creditworthiness of borrowers on an ongoing basis, including an early warning system with defined triggers. Key requirements:
- EWI framework must be documented
- EWI thresholds must be set using historical performance data
- EWI alerts must be escalated through a defined process
- The EWI system must feed into the watch list / sensitive list process
- EWI must cover both quantitative (financial) and qualitative signals

**EBA/GL/2018/06 — NPE and Forbearance Management.** Banks must maintain an Early Warning System that identifies borrowers at risk of becoming non-performing. The EWS must be tested annually for effectiveness and the results used to calibrate thresholds.

**IFRS 9 — Paragraph B5.5.17.** Lists indicators of significant increase in credit risk, which serve as the regulatory foundation for IFRS 9-aligned EWI systems.

**PRA Supervisory Statement SS3/17.** Expectations for banks regarding forbearance identification, which includes early identification of borrowers likely to require forbearance — the role of EWI.

**Financial Policy Committee (FPC) stress tests.** The Bank of England's annual stress tests define severe macroeconomic scenarios (GDP fall, unemployment rise, property price decline). Banks must show that their EWI systems would have generated alerts during the stress scenario.

**Anti-Money Laundering EWI.** The Money Laundering Regulations 2017 require ongoing monitoring that includes transaction monitoring. EWI systems must integrate AML alerts: unusual transaction patterns, transactions inconsistent with stated business purpose, and large cash transactions are all EWI signals relevant to both credit risk and AML.

## 6. Data Required

**Financial EWI data (from management accounts and compliance certificates):**
- DSCR (quarterly, LTM basis)
- Net Leverage ratio (quarterly)
- ICR (quarterly)
- Revenue growth rate (quarterly)
- Gross margin trend
- Net working capital and changes
- Cash and cash equivalents balance
- Debtors days, creditors days, inventory days (where available)
- Altman Z-score components (for manufacturing borrowers)

**Behavioural EWI data (from core banking systems — daily):**
- Current account / facility utilisation (drawn / limit)
- Days outstanding on current account (days in excess of limit)
- Payment history: on time, late, partial
- Returned items (direct debits, standing orders returned unpaid)
- Manual intervention items (transactions requiring manual override)
- Average monthly credit turnover (revenue flowing through account) — declining credit turnover signals revenue decline
- Average balance trends
- Pattern of payments: time of month (distressed borrowers often pay late in the month)

**Market and external data:**
- Stock price change (%) — for listed companies
- CDS spread — for publicly-traded companies
- External credit rating and rating watches (S&P, Moody's, Fitch)
- News monitoring: litigation, regulatory action, key management changes, product recalls
- Companies House: late filing of accounts, director resignations, new charges registered
- County Court Judgments (CCJs) — via Dun & Bradstreet or Experian
- HMRC alerts: HMRC debt registered as a preferential creditor is a very late-stage EWI

**Qualitative EWI data:**
- RM site visit report notes
- Auditor report qualifications or going concern opinions
- Auditor or legal adviser resignation
- Failed or delayed acquisition attempts
- Sector-specific intelligence (competitor failures, sector downturn)
- Management team changes (CEO, CFO departure without clear succession)

## 7. How Analysts Actually Work

**EWI process flow:**

1. **Automated data ingestion.** Core banking systems, financial data feeds, and external data providers push data into the EWI platform daily or weekly. The system flags exceptions automatically when predefined thresholds are crossed.

2. **EWI scorecard.** For each facility, the EWI system calculates a composite score from all available signals. Each signal is weighted by its predictive importance (derived from historical analysis). The composite score maps to a RAG status.

3. **Alert generation.** When a facility's EWI score crosses a threshold, an alert is generated and sent to the responsible RM and credit officer. The alert specifies which signal(s) triggered it and the magnitude of the signal.

4. **RM triage.** The RM reviews the alert and classifies it:
   - False positive (explain why the signal is not indicative of genuine distress)
   - Genuine concern — standard enhanced monitoring applied
   - Serious concern — escalate to Watch List

5. **Watch list placement.** The Watch List is a formal register of exposures under enhanced monitoring. Placement on the Watch List requires a credit officer's approval and triggers:
   - Monthly reporting instead of quarterly
   - RM to contact the borrower more frequently
   - Credit officer review of the file
   - IFRS 9 Stage 2 classification (if not already)
   - Automatic review at the next credit committee

6. **Escalation to Restructuring.** If the EWI signals persist or worsen, the watch list name is escalated to the Restructuring & Recovery team (see M46). The escalation trigger may be: further financial deterioration, missed or late payment, covenant breach, or management request for debt relief.

7. **False positive management.** All false positive alerts are logged. The EWI model is re-calibrated quarterly using false positive data. Thresholds are adjusted sector-by-sector to reduce noise while maintaining sensitivity.

**RM behavioural monitoring.** Experienced RMs develop informal EWI instincts: a normally responsive client who is slow to return calls, a management team that seems stressed during site visits, a business whose invoices are being paid more slowly by its customers. These qualitative signals should be captured in the RM's monitoring notes and fed into the formal EWI system.

**Watch list meetings.** A weekly or fortnightly Watch List meeting, attended by the Head of Credit, RMs, and the Restructuring team, reviews all flagged names. Each name is assigned a "probability of loss" and an action plan. This meeting is a critical risk governance forum.

## 8. Excel Implementation

```excel
=== SHEET: EWI_Scorecard ===

HEADER:
Customer: [name]
Facility Ref: [ref]
Date: =TODAY()
Analyst: [name]
Prior Score: [from previous period]

=== SECTION 1: FINANCIAL INDICATORS (max 40 points) ===

Indicator | Value | Change | Score | Max | Notes
A: DSCR (LTM)
  Value:    [from management accounts]
  Covenant: [from facility agreement]
  Headroom: =(Value-Covenant)/Covenant*100
  Score:    =IF(B_DSCR<1.0, 10,
             IF(B_DSCR<1.1, 7,
             IF(B_DSCR<1.2, 4,
             IF(B_DSCR<1.4, 2, 0))))
  Max: 10

B: Net Leverage (x)
  Score:    =IF(B_Lev>B_LevCov, 10,
             IF(B_Lev>B_LevCov*0.95, 7,
             IF(B_Lev>B_LevCov*0.85, 4,
             IF(B_Lev>B_LevCov*0.70, 2, 0))))
  Max: 10

C: Revenue Growth (YoY)
  Score:    =IF(B_RevGrowth<-0.20, 8,
             IF(B_RevGrowth<-0.10, 5,
             IF(B_RevGrowth<-0.05, 3,
             IF(B_RevGrowth<0,     1, 0))))
  Max: 8

D: EBITDA Margin Trend
  [Current margin vs prior year]
  Score:    =IF(B_MarginDelta<-0.05, 7,
             IF(B_MarginDelta<-0.02, 4,
             IF(B_MarginDelta<0,     2, 0))))
  Max: 7

E: Altman Z-Score (where applicable)
  Z' = 0.717*X1 + 0.847*X2 + 3.107*X3 + 0.420*X4 + 0.998*X5
  X1: =Working_Capital/Total_Assets
  X2: =Retained_Earnings/Total_Assets
  X3: =EBIT/Total_Assets
  X4: =Book_Equity/Total_Liabilities
  X5: =Revenue/Total_Assets
  Z_Score: =(0.717*X1)+(0.847*X2)+(3.107*X3)+(0.420*X4)+(0.998*X5)
  Score:    =IF(Z_Score<1.23, 5, IF(Z_Score<2.90, 3, 0))
  Max: 5

Financial Sub-Total: =SUM(ScoreA:ScoreE)

=== SECTION 2: BEHAVIOURAL INDICATORS (max 30 points) ===

F: RCF/Overdraft Utilisation
  Current:  [from system]
  30d avg:  [from system]
  Trend:    =(Current-30d_avg)/30d_avg*100
  Score:    =IF(B_Util>95, 10,
             IF(B_Util>85, 7,
             IF(B_Util>75, 4,
             IF(B_Util>60, 2, 0))))
  Max: 10

G: Late Payments (count in last 6 months)
  [From payment history table]
  Score: =IF(B_LatePay>3, 10, IF(B_LatePay>1, 5, IF(B_LatePay>0, 2, 0)))
  Max: 10

H: Returned Items (direct debits, etc.)
  Count in last 3 months: [from system]
  Score: =IF(B_Returns>2, 10, IF(B_Returns>0, 5, 0))
  Max: 10

Behavioural Sub-Total: =SUM(ScoreF:ScoreH)

=== SECTION 3: MARKET & EXTERNAL INDICATORS (max 20 points) ===

I: External Credit Rating
  Agency rating: [manual input]
  Change: [manual — upgrade/downgrade/negative watch]
  Score: =IF(B_Rating="DOWNGRADE",7,IF(B_Rating="NEG_WATCH",4,0))
  Max: 7

J: Stock Price Change (listed cos only)
  6-month change: [from market data]
  Score: =IF(B_PriceChg<-0.50,8,IF(B_PriceChg<-0.30,5,IF(B_PriceChg<-0.15,2,0)))
  Max: 8

K: CDS Spread (bps)
  Current CDS: [from Bloomberg/Refinitiv]
  Change in bps: [current minus 3 months ago]
  Score: =IF(B_CDS>500,5,IF(B_CDS>300,3,IF(B_CDSChange>100,2,0)))
  Max: 5

Market Sub-Total: =SUM(ScoreI:ScoreK)

=== SECTION 4: QUALITATIVE INDICATORS (max 10 points) ===

L: Qualitative Flags (each flag = 2 points, max 10)
  [ ] Auditor resignation or change
  [ ] Going concern qualification in audit report
  [ ] Senior management departure (CEO/CFO)
  [ ] Late filing of accounts at Companies House
  [ ] Material litigation or regulatory investigation
  [ ] Key customer or supplier loss

Qualitative Sub-Total: =SUM(checked items × 2)

=== COMPOSITE EWI SCORE ===

Total Score: =Financial + Behavioural + Market + Qualitative
Max: 100

RAG Status:
  =IF(Total>60,"RED",IF(Total>30,"AMBER",IF(Total>10,"MONITOR","GREEN")))

Watch List Trigger:
  =IF(Total>=40,"WATCH LIST RECOMMENDED","")

IFRS 9 SICR Flag:
  =IF(Total>=30,"REVIEW STAGING","")

Score Change from Prior Period: =Total - Prior_Score
```

## 9. SQL Implementation

```sql
-- ============================================================
-- M45: Early Warning Indicator SQL Queries
-- ============================================================

-- ------------------------------------------------------------
-- Query 1: Calculate EWI scores for all active facilities
-- Run monthly as part of monitoring cycle
-- ------------------------------------------------------------
WITH LatestFinancials AS (
    SELECT
        facility_id,
        period_end,
        dscr_ltm,
        net_leverage,
        revenue_yoy_growth,
        ebitda_margin_current,
        ebitda_margin_prior_year,
        altman_z_score,
        ROW_NUMBER() OVER (
            PARTITION BY facility_id ORDER BY period_end DESC
        ) AS rn
    FROM FinancialMetrics
),
LatestBehavioural AS (
    SELECT
        facility_id,
        AVG(utilisation_pct) AS avg_util_30d,
        MAX(utilisation_pct) AS max_util_30d,
        COUNT(CASE WHEN is_late_payment = 1 THEN 1 END) AS late_payments_6m,
        COUNT(CASE WHEN is_returned_item = 1 THEN 1 END) AS returned_items_3m
    FROM BehaviouralData
    WHERE observation_date >= DATEADD(MONTH, -6, GETDATE())
    GROUP BY facility_id
),
LatestMarket AS (
    SELECT
        facility_id,
        latest_rating_action,
        stock_price_6m_change_pct,
        cds_spread_bps,
        cds_spread_change_90d
    FROM MarketIndicators
    WHERE observation_date = (
        SELECT MAX(observation_date) FROM MarketIndicators AS m2
        WHERE m2.facility_id = MarketIndicators.facility_id
    )
),
QualitativeFlags AS (
    SELECT
        facility_id,
        SUM(CASE WHEN flag_type = 'AUDITOR_CHANGE'       THEN 1 ELSE 0 END) AS auditor_flag,
        SUM(CASE WHEN flag_type = 'GOING_CONCERN'        THEN 1 ELSE 0 END) AS going_concern_flag,
        SUM(CASE WHEN flag_type = 'MGMT_DEPARTURE'       THEN 1 ELSE 0 END) AS mgmt_flag,
        SUM(CASE WHEN flag_type = 'LATE_FILING'          THEN 1 ELSE 0 END) AS filing_flag,
        SUM(CASE WHEN flag_type = 'LITIGATION'           THEN 1 ELSE 0 END) AS litigation_flag,
        SUM(CASE WHEN flag_type = 'KEY_CUSTOMER_LOSS'    THEN 1 ELSE 0 END) AS customer_flag
    FROM QualitativeAlerts
    WHERE alert_date >= DATEADD(MONTH, -12, GETDATE())
        AND is_active = 1
    GROUP BY facility_id
),
EWIComponents AS (
    SELECT
        f.facility_id,
        f.facility_reference,
        c.customer_name,
        c.sector_code,
        r.risk_grade,
        s.ifrs9_stage,
        f.drawn_balance,

        -- Financial scores
        CASE
            WHEN lf.dscr_ltm < 1.00 THEN 10
            WHEN lf.dscr_ltm < 1.10 THEN 7
            WHEN lf.dscr_ltm < 1.20 THEN 4
            WHEN lf.dscr_ltm < 1.40 THEN 2
            ELSE 0
        END AS score_dscr,

        CASE
            WHEN lf.net_leverage > cd.leverage_covenant             THEN 10
            WHEN lf.net_leverage > cd.leverage_covenant * 0.95      THEN 7
            WHEN lf.net_leverage > cd.leverage_covenant * 0.85      THEN 4
            WHEN lf.net_leverage > cd.leverage_covenant * 0.70      THEN 2
            ELSE 0
        END AS score_leverage,

        CASE
            WHEN lf.revenue_yoy_growth < -0.20 THEN 8
            WHEN lf.revenue_yoy_growth < -0.10 THEN 5
            WHEN lf.revenue_yoy_growth < -0.05 THEN 3
            WHEN lf.revenue_yoy_growth < 0     THEN 1
            ELSE 0
        END AS score_revenue,

        ISNULL(
            CASE
                WHEN lf.altman_z_score < 1.23 THEN 5
                WHEN lf.altman_z_score < 2.90 THEN 3
                ELSE 0
            END, 0
        ) AS score_zscore,

        -- Behavioural scores
        CASE
            WHEN lb.max_util_30d >= 95 THEN 10
            WHEN lb.max_util_30d >= 85 THEN 7
            WHEN lb.max_util_30d >= 75 THEN 4
            WHEN lb.avg_util_30d >= 60 THEN 2
            ELSE 0
        END AS score_utilisation,

        CASE
            WHEN lb.late_payments_6m > 3 THEN 10
            WHEN lb.late_payments_6m > 1 THEN 5
            WHEN lb.late_payments_6m > 0 THEN 2
            ELSE 0
        END AS score_late_payments,

        CASE
            WHEN lb.returned_items_3m > 2 THEN 10
            WHEN lb.returned_items_3m > 0 THEN 5
            ELSE 0
        END AS score_returned,

        -- Market scores
        ISNULL(
            CASE lm.latest_rating_action
                WHEN 'DOWNGRADE'    THEN 7
                WHEN 'NEG_WATCH'    THEN 4
                WHEN 'NEG_OUTLOOK'  THEN 2
                ELSE 0
            END, 0
        ) AS score_rating,

        ISNULL(
            CASE
                WHEN lm.stock_price_6m_change_pct < -0.50 THEN 8
                WHEN lm.stock_price_6m_change_pct < -0.30 THEN 5
                WHEN lm.stock_price_6m_change_pct < -0.15 THEN 2
                ELSE 0
            END, 0
        ) AS score_equity,

        -- Qualitative scores (2 points each, max 10)
        LEAST(
            (ISNULL(qf.auditor_flag,0) +
             ISNULL(qf.going_concern_flag,0) +
             ISNULL(qf.mgmt_flag,0) +
             ISNULL(qf.filing_flag,0) +
             ISNULL(qf.litigation_flag,0) +
             ISNULL(qf.customer_flag,0)) * 2,
            10
        ) AS score_qualitative

    FROM Facilities f
    JOIN Customers c ON f.customer_id = c.customer_id
    JOIN RiskRatings r ON f.facility_id = r.facility_id
        AND r.effective_to IS NULL
    JOIN IFRS9Staging s ON f.facility_id = s.facility_id
        AND s.staging_date = EOMONTH(GETDATE(), -1)
    LEFT JOIN LatestFinancials lf ON f.facility_id = lf.facility_id AND lf.rn = 1
    LEFT JOIN LatestBehavioural lb ON f.facility_id = lb.facility_id
    LEFT JOIN LatestMarket lm ON f.facility_id = lm.facility_id
    LEFT JOIN QualitativeFlags qf ON f.facility_id = qf.facility_id
    LEFT JOIN (
        SELECT facility_id, MAX(threshold_value) AS leverage_covenant
        FROM CovenantDefinitions
        WHERE covenant_type = 'NET_LEVERAGE'
        GROUP BY facility_id
    ) cd ON f.facility_id = cd.facility_id
    WHERE f.facility_status = 'ACTIVE'
)
SELECT
    facility_id,
    facility_reference,
    customer_name,
    sector_code,
    risk_grade,
    ifrs9_stage,
    drawn_balance,
    score_dscr,
    score_leverage,
    score_revenue,
    score_zscore,
    score_utilisation,
    score_late_payments,
    score_returned,
    score_rating,
    score_equity,
    score_qualitative,
    -- Composite score
    (score_dscr + score_leverage + score_revenue + score_zscore +
     score_utilisation + score_late_payments + score_returned +
     score_rating + score_equity + score_qualitative) AS ewi_total_score,
    -- RAG status
    CASE
        WHEN (score_dscr + score_leverage + score_revenue + score_zscore +
              score_utilisation + score_late_payments + score_returned +
              score_rating + score_equity + score_qualitative) >= 60 THEN 'RED'
        WHEN (score_dscr + score_leverage + score_revenue + score_zscore +
              score_utilisation + score_late_payments + score_returned +
              score_rating + score_equity + score_qualitative) >= 30 THEN 'AMBER'
        WHEN (score_dscr + score_leverage + score_revenue + score_zscore +
              score_utilisation + score_late_payments + score_returned +
              score_rating + score_equity + score_qualitative) >= 10 THEN 'MONITOR'
        ELSE 'GREEN'
    END AS ewi_rag_status
INTO #EWIResults
FROM EWIComponents
ORDER BY ewi_total_score DESC;

-- Return results with watch list flag
SELECT
    *,
    CASE WHEN ewi_total_score >= 40 THEN 'YES' ELSE 'NO' END AS watch_list_recommended,
    CASE WHEN ewi_total_score >= 30 AND ifrs9_stage = 1 THEN 'REVIEW_STAGING' ELSE '' END AS sicr_flag
FROM #EWIResults
ORDER BY ewi_total_score DESC;


-- ------------------------------------------------------------
-- Query 2: EWI Score Trend — Trailing 6 Months
-- For a specific facility
-- ------------------------------------------------------------
SELECT
    e.score_date,
    e.ewi_total_score,
    e.ewi_rag_status,
    e.score_dscr,
    e.score_leverage,
    e.score_utilisation,
    e.score_late_payments,
    e.score_qualitative,
    -- Month-over-month change
    e.ewi_total_score - LAG(e.ewi_total_score, 1) OVER (ORDER BY e.score_date) AS mom_change
FROM EWIScoreHistory e
WHERE e.facility_id = @facility_id
    AND e.score_date >= DATEADD(MONTH, -6, GETDATE())
ORDER BY e.score_date DESC;


-- ------------------------------------------------------------
-- Query 3: Watch List Report
-- Current watch list with trigger reasons
-- ------------------------------------------------------------
SELECT
    wl.watch_list_date,
    wl.watch_list_reason,
    f.facility_reference,
    c.customer_name,
    c.sector_code,
    f.drawn_balance,
    r.risk_grade,
    s.ifrs9_stage,
    s.ecl_provision,
    e.ewi_total_score,
    e.ewi_rag_status,
    wl.action_plan,
    wl.next_review_date,
    wl.assigned_restructuring_officer,
    rm.rm_name
FROM WatchList wl
JOIN Facilities f ON wl.facility_id = f.facility_id
JOIN Customers c ON f.customer_id = c.customer_id
JOIN RiskRatings r ON f.facility_id = r.facility_id
    AND r.effective_to IS NULL
JOIN IFRS9Staging s ON f.facility_id = s.facility_id
    AND s.staging_date = EOMONTH(GETDATE(), -1)
LEFT JOIN EWIScoreHistory e ON f.facility_id = e.facility_id
    AND e.score_date = (
        SELECT MAX(score_date)
        FROM EWIScoreHistory
        WHERE facility_id = f.facility_id
    )
JOIN RelationshipManagers rm ON f.rm_id = rm.rm_id
WHERE wl.watch_list_status = 'ACTIVE'
ORDER BY e.ewi_total_score DESC, f.drawn_balance DESC;
```

## 10. Python Implementation

```python
"""
M45: Early Warning Indicators — Python Implementation
ML-based EWI alert model using payment behaviour data
"""

import pandas as pd
import numpy as np
import pyodbc
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import (
    roc_auc_score, classification_report,
    roc_curve, confusion_matrix
)
from sklearn.pipeline import Pipeline
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import joblib
import warnings
warnings.filterwarnings('ignore')


# ============================================================
# 1. FEATURE ENGINEERING
# ============================================================

def build_ewi_features(
    financials_df: pd.DataFrame,
    behavioural_df: pd.DataFrame,
    market_df: pd.DataFrame,
    qualitative_df: pd.DataFrame
) -> pd.DataFrame:
    """
    Combine all data sources into a single feature matrix
    for the EWI ML model.

    Parameters:
    - financials_df: DSCR, leverage, revenue growth, margins, Z-score
    - behavioural_df: utilisation, late payments, returned items
    - market_df: stock price change, CDS spread, rating actions
    - qualitative_df: flag counts (auditor change, management departure, etc.)

    Returns:
    - Feature matrix with facility_id, feature columns, and outcome variable
    """
    # Merge all data sources
    df = financials_df.merge(
        behavioural_df, on=['facility_id', 'period_end'], how='left'
    ).merge(
        market_df, on=['facility_id', 'period_end'], how='left'
    ).merge(
        qualitative_df, on=['facility_id', 'period_end'], how='left'
    )

    # Financial features
    df['dscr_ltm'] = df['dscr_ltm'].fillna(df['dscr_ltm'].median())
    df['net_leverage'] = df['net_leverage'].fillna(df['net_leverage'].median())
    df['revenue_growth_yoy'] = df['revenue_growth_yoy'].fillna(0)
    df['ebitda_margin'] = df['ebitda_margin'].fillna(df['ebitda_margin'].median())
    df['altman_z'] = df['altman_z'].fillna(df['altman_z'].median())

    # Quarter-over-quarter changes (trend features)
    df = df.sort_values(['facility_id', 'period_end'])
    df['dscr_qoq'] = df.groupby('facility_id')['dscr_ltm'].pct_change()
    df['leverage_qoq'] = df.groupby('facility_id')['net_leverage'].pct_change()
    df['margin_qoq'] = df.groupby('facility_id')['ebitda_margin'].pct_change()

    # 4-quarter trend (slope of linear regression over last 4 quarters)
    def compute_trend(series, n=4):
        if len(series) < n:
            return np.nan
        x = np.arange(n)
        y = series.values[-n:]
        if np.all(np.isnan(y)):
            return np.nan
        try:
            return np.polyfit(x, y, 1)[0]
        except Exception:
            return np.nan

    df['dscr_trend_4q'] = (
        df.groupby('facility_id')['dscr_ltm']
        .transform(lambda s: s.rolling(4).apply(
            lambda x: np.polyfit(range(4), x, 1)[0] if len(x) == 4 else np.nan,
            raw=True
        ))
    )

    df['leverage_trend_4q'] = (
        df.groupby('facility_id')['net_leverage']
        .transform(lambda s: s.rolling(4).apply(
            lambda x: np.polyfit(range(4), x, 1)[0] if len(x) == 4 else np.nan,
            raw=True
        ))
    )

    # Behavioural features
    df['util_avg_30d'] = df['util_avg_30d'].fillna(0)
    df['util_max_30d'] = df['util_max_30d'].fillna(0)
    df['util_trend'] = df['util_max_30d'] - df['util_avg_30d']
    df['late_payments_6m'] = df['late_payments_6m'].fillna(0)
    df['returned_items_3m'] = df['returned_items_3m'].fillna(0)

    # Qualitative features (binary flags)
    qual_cols = [
        'auditor_flag', 'going_concern_flag', 'mgmt_flag',
        'filing_flag', 'litigation_flag', 'customer_flag'
    ]
    for col in qual_cols:
        df[col] = df.get(col, pd.Series(0, index=df.index)).fillna(0).astype(int)

    df['total_qual_flags'] = df[qual_cols].sum(axis=1)

    # Market features
    df['stock_price_6m_chg'] = df.get(
        'stock_price_6m_chg', pd.Series(0, index=df.index)
    ).fillna(0)
    df['cds_spread_bps'] = df.get(
        'cds_spread_bps', pd.Series(0, index=df.index)
    ).fillna(0)
    df['rating_downgrade'] = (
        df.get('rating_action', pd.Series('', index=df.index)) == 'DOWNGRADE'
    ).astype(int)

    return df


# ============================================================
# 2. MODEL TRAINING
# ============================================================

FEATURE_COLS = [
    # Financial
    'dscr_ltm', 'net_leverage', 'revenue_growth_yoy',
    'ebitda_margin', 'altman_z',
    'dscr_qoq', 'leverage_qoq', 'margin_qoq',
    'dscr_trend_4q', 'leverage_trend_4q',
    # Behavioural
    'util_avg_30d', 'util_max_30d', 'util_trend',
    'late_payments_6m', 'returned_items_3m',
    # Qualitative
    'total_qual_flags', 'going_concern_flag', 'mgmt_flag',
    # Market
    'stock_price_6m_chg', 'cds_spread_bps', 'rating_downgrade'
]


def train_ewi_model(
    features_df: pd.DataFrame,
    target_col: str = 'default_within_12m',
    model_type: str = 'gradient_boosting'
) -> tuple:
    """
    Train EWI classification model.

    Parameters:
    - features_df: DataFrame with FEATURE_COLS and target_col
    - target_col: binary outcome (1 = defaulted within 12 months)
    - model_type: 'gradient_boosting', 'random_forest', 'logistic'

    Returns:
    - Fitted pipeline, feature importances, test metrics
    """
    df = features_df.dropna(subset=[target_col] + FEATURE_COLS)
    X = df[FEATURE_COLS]
    y = df[target_col].astype(int)

    print(f"Training set: {len(df)} observations")
    print(f"Default rate: {y.mean():.1%}")
    print(f"Feature count: {len(FEATURE_COLS)}")

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    if model_type == 'gradient_boosting':
        model = GradientBoostingClassifier(
            n_estimators=200, max_depth=4,
            learning_rate=0.05, subsample=0.8,
            random_state=42
        )
    elif model_type == 'random_forest':
        model = RandomForestClassifier(
            n_estimators=200, max_depth=6,
            min_samples_leaf=5, random_state=42,
            class_weight='balanced'
        )
    else:
        model = LogisticRegression(
            C=0.1, max_iter=500, class_weight='balanced'
        )

    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('model', model)
    ])

    pipeline.fit(X_train, y_train)

    # Evaluate
    y_pred_proba = pipeline.predict_proba(X_test)[:, 1]
    auc = roc_auc_score(y_test, y_pred_proba)

    # Cross-validation
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    cv_auc = cross_val_score(pipeline, X, y, cv=cv, scoring='roc_auc')

    print(f"\nTest AUC: {auc:.4f}")
    print(f"CV AUC:  {cv_auc.mean():.4f} ± {cv_auc.std():.4f}")

    # Feature importance (for tree-based models)
    if model_type in ['gradient_boosting', 'random_forest']:
        importances = pd.DataFrame({
            'feature': FEATURE_COLS,
            'importance': pipeline.named_steps['model'].feature_importances_
        }).sort_values('importance', ascending=False)
        print("\nTop 10 EWI Features by Importance:")
        print(importances.head(10).to_string(index=False))
    else:
        importances = None

    return pipeline, importances, {'test_auc': auc, 'cv_auc_mean': cv_auc.mean()}


# ============================================================
# 3. SCORING AND ALERT GENERATION
# ============================================================

def score_portfolio(
    pipeline,
    features_df: pd.DataFrame,
    alert_threshold: float = 0.20
) -> pd.DataFrame:
    """
    Apply trained EWI model to current portfolio.

    Returns DataFrame with EWI probability score and alert status.
    """
    df = features_df.copy()
    available_features = [c for c in FEATURE_COLS if c in df.columns]
    X = df[available_features].fillna(0)

    df['ewi_probability'] = pipeline.predict_proba(X)[:, 1]

    df['ewi_alert'] = df['ewi_probability'] >= alert_threshold
    df['ewi_rag'] = pd.cut(
        df['ewi_probability'],
        bins=[0, 0.10, 0.20, 0.40, 1.01],
        labels=['GREEN', 'MONITOR', 'AMBER', 'RED']
    )

    df['watch_list_recommend'] = df['ewi_probability'] >= 0.30
    df['sicr_flag'] = df['ewi_probability'] >= 0.20

    return df.sort_values('ewi_probability', ascending=False)


# ============================================================
# 4. MODEL PERFORMANCE VISUALISATION
# ============================================================

def plot_roc_curve(
    pipeline,
    X_test: pd.DataFrame,
    y_test: pd.Series,
    model_name: str = 'EWI Model'
):
    """Plot ROC curve for the EWI model."""
    y_pred_proba = pipeline.predict_proba(X_test)[:, 1]
    fpr, tpr, thresholds = roc_curve(y_test, y_pred_proba)
    auc = roc_auc_score(y_test, y_pred_proba)

    fig, ax = plt.subplots(figsize=(8, 6))
    ax.plot(fpr, tpr, 'b-', linewidth=2,
            label=f'{model_name} (AUC = {auc:.3f})')
    ax.plot([0, 1], [0, 1], 'r--', label='Random classifier')
    ax.set_xlabel('False Positive Rate', fontsize=12)
    ax.set_ylabel('True Positive Rate (Sensitivity)', fontsize=12)
    ax.set_title('EWI Model — ROC Curve', fontsize=14, fontweight='bold')
    ax.legend(loc='lower right')
    ax.grid(True, alpha=0.3)

    # Mark operating threshold
    idx = np.argmin(np.abs(thresholds - 0.20))
    ax.scatter(fpr[idx], tpr[idx], color='red', s=100, zorder=5,
               label=f'Threshold=0.20 (FPR={fpr[idx]:.2f}, TPR={tpr[idx]:.2f})')
    ax.legend(loc='lower right')
    plt.tight_layout()
    plt.show()


def calibration_analysis(
    scored_df: pd.DataFrame,
    n_buckets: int = 10
) -> pd.DataFrame:
    """
    Assess model calibration: compare predicted probability
    to actual default rate in each probability bucket.
    """
    scored_df['prob_bucket'] = pd.cut(
        scored_df['ewi_probability'], bins=n_buckets
    )
    cal = scored_df.groupby('prob_bucket').agg(
        count=('ewi_probability', 'count'),
        avg_predicted_prob=('ewi_probability', 'mean'),
        actual_default_rate=('default_within_12m', 'mean')
    ).reset_index()
    cal['calibration_error'] = (
        cal['avg_predicted_prob'] - cal['actual_default_rate']
    ).abs()
    return cal


# ============================================================
# 5. WATCH LIST REPORT GENERATOR
# ============================================================

def generate_watch_list_report(scored_df: pd.DataFrame) -> str:
    """
    Generate a formatted watch list report from EWI scores.
    """
    watch_list = scored_df[scored_df['watch_list_recommend']].copy()
    watch_list = watch_list.sort_values('ewi_probability', ascending=False)

    lines = [
        "=" * 70,
        "CREDIT EWI — WATCH LIST REPORT",
        f"Date: {pd.Timestamp.today().date()}",
        f"Facilities on Watch List: {len(watch_list)}",
        "=" * 70, ""
    ]

    for _, row in watch_list.iterrows():
        lines.append(f"Customer:       {row.get('customer_name', 'N/A')}")
        lines.append(f"Facility Ref:   {row.get('facility_reference', 'N/A')}")
        lines.append(f"EWI Prob:       {row['ewi_probability']:.1%}")
        lines.append(f"EWI RAG:        {row['ewi_rag']}")
        lines.append(f"Drawn Balance:  £{row.get('drawn_balance', 0):,.0f}")
        lines.append(f"IFRS 9 Stage:   {row.get('ifrs9_stage', 'N/A')}")
        lines.append(f"SICR Flag:      {'YES' if row['sicr_flag'] else 'NO'}")

        # Key drivers
        drivers = []
        if row.get('dscr_ltm', 99) < 1.20:
            drivers.append(f"Low DSCR: {row.get('dscr_ltm', 0):.2f}x")
        if row.get('util_max_30d', 0) > 80:
            drivers.append(f"High utilisation: {row.get('util_max_30d', 0):.0f}%")
        if row.get('late_payments_6m', 0) > 0:
            drivers.append(f"Late payments: {row.get('late_payments_6m', 0):.0f}")
        if row.get('total_qual_flags', 0) > 0:
            drivers.append(f"Qualitative flags: {row.get('total_qual_flags', 0):.0f}")
        if drivers:
            lines.append(f"Key Drivers:    {'; '.join(drivers)}")
        lines.append("-" * 70)

    return "\n".join(lines)


if __name__ == '__main__':
    # Example usage
    print("EWI Model — Loading and scoring portfolio...")
    # conn = get_connection('CREDITDB01', 'CreditRiskDB')
    # features_df = build_ewi_features(...)
    # pipeline, importances, metrics = train_ewi_model(features_df)
    # scored_df = score_portfolio(pipeline, current_features_df)
    # print(generate_watch_list_report(scored_df))
    print("Done.")
```

## 11. Interview Questions

**Q1: What is the difference between an EWI system and a covenant monitoring system?**
A: Covenant monitoring is a lagging indicator system — it identifies a breach after a financial threshold has been crossed. EWI is a leading indicator system — it identifies signals of deterioration before a breach occurs. A covenant monitoring system looks at quarterly financial metrics against contractual thresholds. An EWI system looks at a much broader set of data, including daily behavioural signals, market data, and qualitative information, and aims to generate alerts weeks or months before a covenant breach. The two systems complement each other: EWI catches early signals, covenant monitoring enforces contractual rights.

**Q2: What are the most predictive EWI signals in your view, and why?**
A: Behavioural signals are often the most timely: consistently high utilisation of an overdraft facility (above 90% for 2+ weeks), returned direct debits, and late payments typically precede financial deterioration by several months. Financial signals like declining DSCR are valuable but lag because they are based on quarterly management accounts. Market signals (equity price, CDS spreads) are timely for listed companies but not available for private borrowers, who represent most commercial lending portfolios. Qualitative signals — auditor resignation, CFO departure, late filing of Companies House accounts — are often leading indicators that financial information is being delayed or manipulated.

**Q3: How do you manage false positives in an EWI system?**
A: False positives are managed through: (a) threshold calibration — set thresholds using historical data to achieve an acceptable precision/recall trade-off; (b) sector-specific thresholds — a construction company is expected to have higher seasonal overdraft utilisation than a retailer; (c) multi-signal requirement — requiring 2+ signals to fire an alert reduces false positives; (d) RM override process — allow RMs to suppress individual alerts with documented justification; (e) regular backtesting — compare alerts generated to actual defaults, recalibrate where false positive rates are unacceptably high.

**Q4: How does an EWI alert translate into an IFRS 9 staging decision?**
A: An EWI alert triggers a review of IFRS 9 staging. If the alert is confirmed (genuine concern, not a false positive), the credit officer assesses whether it represents a Significant Increase in Credit Risk (SICR) under IFRS 9. If SICR is confirmed, the facility moves from Stage 1 to Stage 2, and the provision increases from 12-month ECL to lifetime ECL. The specific SICR trigger and rationale must be documented. If the EWI alert is subsequently resolved (borrower recovers), a return from Stage 2 to Stage 1 is possible but requires a formal credit assessment showing SICR has been remedied.

**Q5: Describe the Watch List process from initial EWI alert to escalation.**
A: (1) EWI system generates alert when composite score crosses threshold. (2) Alert is sent to RM and credit officer. (3) RM triages within 2 business days: false positive (document and close) or genuine concern (escalate). (4) If genuine, credit officer approves Watch List placement. (5) Placement on Watch List triggers enhanced monitoring: monthly management accounts, more frequent RM contact, credit officer involvement in all material decisions. (6) IFRS 9 Stage 2 classification applied. (7) An action plan is documented: what needs to happen to return the borrower to standard monitoring. (8) If the situation deteriorates further (missed payment, covenant breach, material news), escalate to Restructuring & Recovery team.

## 12. Common Mistakes

**Mistake 1: Designing EWI in isolation from the IFRS 9 staging framework.** EWI alerts should map directly to IFRS 9 SICR criteria. Banks that build separate EWI and IFRS 9 systems find that a borrower can be on the watch list under EWI but still in Stage 1 for IFRS 9 — an inconsistency that regulators will challenge.

**Mistake 2: Relying exclusively on financial EWI.** Financial metrics from management accounts are inherently backward-looking and arrive with a 45-day lag after quarter end. A business can collapse very quickly (major contract loss, supplier failure). Behavioural and qualitative signals are faster-moving.

**Mistake 3: Not integrating Companies House data.** Companies House is a rich, freely available source of EWI. Late filing of accounts (a Companies House filing is overdue) is a strong signal: distressed businesses often fail to file on time. New charges registered by a trade creditor (indicating a supplier has converted credit terms to a secured charge) is a very strong distress signal. Director resignations without replacement are also significant.

**Mistake 4: Alert fatigue.** If the EWI system generates too many alerts, credit officers stop acting on them. Calibrate to minimise false positives and prioritise alerts by severity and exposure size.

**Mistake 5: Not documenting the EWI basis for IFRS 9 staging.** The basis for every Stage 2 classification must be documented, including the specific EWI triggers that indicated SICR. Regulators and auditors will ask.

**Mistake 6: Failing to sector-adjust EWI thresholds.** A hospitality borrower with 70% overdraft utilisation in the pre-Christmas season may be entirely normal. A manufacturing firm with the same utilisation in mid-year is alarming. EWI systems that apply universal thresholds generate high false positive rates in seasonal industries.

## 13. Case Studies

**Case Study 1: The Behavioural EWI Success Story**

A regional bank's EWI system flagged a £8m overdraft facility to a food distribution company in March 2022. The triggers were: (a) overdraft utilisation had been above 90% for 22 consecutive days (threshold: 10 days); (b) three direct debits had been returned in the prior month; (c) the RM's call report noted that the company had lost its third-largest customer. The EWI alert was not suppressed. The credit officer contacted the RM, who arranged an urgent meeting with the borrower. The borrower's cash flow model showed insolvency within 90 days without additional support. The bank worked with the borrower to restructure the facility, introduce a new equity investor, and replace the lost customer with a new contract. The business survived. Without the EWI alert, the bank would not have become aware of the situation until the first missed interest payment, 6 weeks later, at which point the recovery outcome would have been significantly worse.

**Case Study 2: The Qualitative Signal — Late Filing**

An EWI system flagged a £15m term loan to a recruitment firm when Companies House showed the annual accounts were 30 days overdue. The borrower was a strong performer with clean financial covenants and no behavioural alerts. The RM investigated and discovered the CFO had resigned 3 months earlier (not reported to the bank as required) and the new CFO had identified a historic accounting error that was delaying the audit sign-off. The accounting error had overstated EBITDA by £1.2m in the prior year. With the restatement, the leverage covenant was retroactively in breach. Lesson: qualitative EWI signals (late filing) led to discovery of a concealed accounting misstatement and covenant breach.

## 14. Iterative Reinforcement

**Week 1:** Map all 4 EWI categories (financial, behavioural, market, qualitative) to specific data items available in your institution's systems. Identify which are automated and which require manual input.

**Week 2:** Build the Excel EWI scorecard in Section 8. Populate with 5 test cases. Calculate composite scores and identify which signals are driving the score in each case.

**Week 3:** Review the IFRS 9 policy at your institution. Identify the specific SICR triggers that relate to EWI signals. Map each EWI category to the corresponding IFRS 9 paragraph.

**Week 4:** Obtain (or construct) a sample of historical EWI data. Calculate precision, recall, and F1 score for the existing threshold. Would a different threshold have improved performance?

**Week 5:** Run the Python EWI model on a simulated dataset. Experiment with different model types (logistic, random forest, gradient boosting). Compare AUC scores. Plot the ROC curve. Identify the top 5 features by importance.

**Week 6:** Design a sector-specific EWI threshold adjustment for one sector (e.g., construction, retail, hospitality). What are the sector-specific signals that are most predictive? How would you adjust the standard threshold?

## 15. Source Material

**Regulatory:**
- EBA/GL/2020/06 Loan Origination and Monitoring — Section 7 (monitoring and EWI)
- EBA/GL/2018/06 Management of Non-Performing and Forborne Exposures — EWS requirements
- IFRS 9 Financial Instruments — paragraphs 5.5.4 and B5.5.17 (SICR indicators)
- Bank of England Financial Stability Report — credit risk sections
- PRA Supervisory Statement SS17/13 — Credit risk management

**Academic:**
- Altman, E.I. (1968): "Financial Ratios, Discriminant Analysis and the Prediction of Corporate Bankruptcy", Journal of Finance
- Altman, E.I., Haldeman, R., Narayanan, P. (1977): "ZETA Analysis", Journal of Banking and Finance
- Beaver, W. (1966): "Financial Ratios as Predictors of Failure", Journal of Accounting Research
- Lennox, C. (1999): "Identifying Failing Companies: A Re-evaluation of the Logit, Probit and DA Approaches", Journal of Economics and Business

**Practitioner:**
- Basel Committee on Banking Supervision: "Sound Credit Risk Assessment and Valuation for Loans" (2006)
- Moody's Analytics: "Early Warning System for Credit Risk" white paper
- S&P Global: "Corporate Default and Rating Transition Study" — annual publication
- Risk.net: "Machine Learning in Credit Risk Early Warning Systems" (various)

**Data providers:**
- Companies House API (companieshouse.gov.uk/developer) — company events and filings
- Dun & Bradstreet: Commercial Credit Scores and PAYDEX payment behaviour data
- Creditsafe: UK company monitoring alerts
- Bloomberg/Refinitiv: CDS spreads, equity prices, credit ratings
