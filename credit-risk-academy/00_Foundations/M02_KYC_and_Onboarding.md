# M02 — KYC and Onboarding

> **Academy Level:** Foundations | **Prerequisite:** M01 — Commercial Lending Overview | **Estimated Study Time:** 6–8 hours
>
> **Who this is for:** A Banking Business Analyst building credit risk expertise. This module treats KYC not as a box-ticking exercise but as the foundation of credit analysis: you cannot assess the creditworthiness of a borrower you do not understand. KYC failures are simultaneously compliance failures, credit failures, and risk management failures.

---

## 1. Business Purpose

### Why KYC Exists in Commercial Banking

Know Your Customer (KYC) is the process by which a bank establishes and verifies the identity of a customer, understands the nature of their business, assesses their risk profile, and ensures that the banking relationship does not facilitate financial crime. In corporate banking, KYC is simultaneously:

1. **A Legal Obligation:** Banks are required by law to verify customer identity and conduct ongoing due diligence. Failure to comply results in criminal prosecution of the bank and its officers, regulatory fines that can reach billions of dollars (HSBC paid US$1.9bn to US regulators in 2012 for AML failures; Standard Chartered paid US$1.1bn in 2019), and in extreme cases, loss of the banking licence.

2. **A Credit Risk Function:** You cannot lend safely to someone you do not understand. KYC tells you: Who are you actually dealing with? What does the business really do? Who controls it? Where does the money come from? Without this information, you are making a credit decision in the dark.

3. **A Commercial Anchor:** KYC documentation — the legal entity, the group structure, the financial accounts, the business description — forms the starting point of the credit file. The credit application cannot be completed, and the loan cannot be approved, until KYC is complete and satisfactory.

### The Relationship Between KYC and Credit Risk

The connection is subtle but critical. Consider these scenarios:

**Scenario A: The Opaque Holding Company.** A bank receives a loan application from "UK HoldCo Ltd", a company incorporated in England 18 months ago with minimal assets. The loan purpose is to fund "general corporate purposes." Without KYC, the bank does not know that UK HoldCo is controlled by individuals on an OFAC sanctions list through a chain of holding companies in the British Virgin Islands, Cyprus, and Luxembourg. Lending to UK HoldCo is both a criminal sanctions violation and a credit risk disaster (the loan will be frozen and unrecoverable).

**Scenario B: The Nominee Director Structure.** A company presents audited accounts showing strong EBITDA and reasonable leverage. KYC reveals that the "directors" on Companies House are professional nominee directors paid £500/year. The real beneficial owners are unknown. Without understanding who controls the business, the bank cannot assess management quality — a key credit risk factor — and cannot determine whether the audited accounts reflect the true financial position or have been prepared to support a lending request.

**Scenario C: The Over-Leveraged Group.** A subsidiary applies for a £20m facility. The subsidiary's own accounts look adequate. KYC and group structure analysis reveal that the subsidiary is one of 47 group entities, all cross-guaranteed to a parent company carrying £800m of debt. The subsidiary's standalone financial position is meaningless — the effective borrower is the group, and the group is deeply distressed. Without KYC and group structure mapping, the analyst would have made a severe underwriting error.

### KYC as a Revenue Gate

KYC is not a bureaucratic delay imposed by compliance teams. It is the gate through which a customer must pass before any credit facility can be booked. In a major bank, the KYC process involves:

- **Client Onboarding Team (COT):** Collects and validates documents
- **Financial Crime Compliance (FCC) / AML Team:** Screens against sanctions lists, PEP databases, adverse news databases
- **Credit Team:** Uses KYC outputs as inputs to the credit application
- **Legal Team:** Confirms legal entity structure for documentation purposes
- **Operations / Account Opening:** Sets up accounts once KYC is approved

From a Business Analyst perspective, the KYC process is a major workflow management challenge. Complex customers (multinational groups, private equity-owned businesses, customers in high-risk jurisdictions) can require 60–120+ days to onboard. Any missing document or unresolved risk flag pauses the process. Banks that execute KYC efficiently gain a competitive advantage — they can onboard and start earning revenue faster than competitors.

---

## 2. Accounting Concepts

### Financial Statements Required in KYC and What They Prove

KYC documentation has an accounting dimension that is often underappreciated. The financial accounts collected during KYC serve both compliance and credit purposes:

**Audited Annual Accounts**

For most corporate borrowers, the bank requires audited financial statements for the most recent 2–3 years. "Audited" means independently verified by a registered auditor to a statutory standard (ISAs — International Standards on Auditing, issued by the IAASB). The audit provides:

- **Reasonable assurance** (not absolute certainty) that the financial statements are free from material misstatement, whether due to fraud or error
- An independent verification of asset values, liabilities, and revenue recognition policies
- The **audit opinion** type: Unqualified (clean), Qualified (reservations noted), Adverse (materially misstated), or Disclaimer (auditor unable to form an opinion)

**Credit implication:** A qualified or adverse audit opinion is a serious red flag. If the auditor has reservations about going concern, revenue recognition, or asset valuations, those reservations must be understood and resolved before a credit decision.

**Management Accounts**

Unaudited interim financial statements produced by the company's own finance team. These cover recent periods (typically monthly or quarterly) that fall between annual audits. Management accounts are required because:

1. Annual audited accounts may be 12–18 months old by the time a credit decision is made
2. The credit analyst needs to understand recent trading performance
3. Significant deterioration since the last audit (falling revenue, rising debt, covenant breach) may not be visible without management accounts

**Credit caution:** Management accounts are unaudited and prepared by the borrower's own team. They may be presented selectively — including favourable items, excluding unfavourable ones. Experienced credit analysts interrogate management accounts closely: Does the profit trend match the cash flow trend? Are receivables growing faster than revenue (suggesting collection problems or premature revenue recognition)?

**Consolidated vs. Entity-Level Accounts**

A critical accounting concept for KYC: the bank often receives both group-consolidated accounts (covering all subsidiaries as one economic unit) and entity-level accounts (the standalone accounts of the specific legal entity borrowing from the bank). These may tell very different stories:

- **Consolidated accounts** show the true economic picture of the group: total revenues, total debt, total assets across all entities
- **Entity-level accounts** may show a subsidiary with minimal assets and no independent revenues, entirely dependent on inter-company support from the parent

For credit risk purposes, the credit analyst must assess both:
- **Entity credit risk:** Can this specific legal entity repay if the bank has no recourse to the group?
- **Group credit risk:** Is the group itself creditworthy, and would it support the subsidiary if needed?

**Accounting Policies and Comparability**

During KYC, if the bank is comparing a potential borrower to peers, or comparing accounts across multiple years, accounting policy differences can distort comparisons:

- **IFRS vs UK GAAP vs US GAAP:** Multinational groups may prepare different accounts under different standards for different jurisdictions. IFRS 16 (leases) requires all operating leases to be recognised on the balance sheet, inflating both assets and liabilities and affecting EBITDA. A bank analysing an IFRS 16 adopter alongside a UK GAAP company needs to adjust for this difference.
- **Revenue recognition timing:** Construction, long-term contracts, and subscription businesses can recognise revenue over very different timeframes
- **Capitalisation vs. expensing:** Technology companies may capitalise development costs, improving reported profit; others expense them, reducing profit

These accounting considerations flow directly into the KYC/credit analysis: the bank must understand what accounting standard the customer uses and adjust analysis accordingly.

---

## 3. Financial Concepts

### The KYC Documentation Framework: What the Bank Needs and Why

**Category 1: Legal Identity Documents**

| Document | Purpose | Source |
|---|---|---|
| Certificate of Incorporation | Confirms legal entity exists, date of incorporation, registered number | Companies House (UK) / Local registry |
| Certificate of Good Standing | Confirms company is active and current with filings | Companies House / Registrar |
| Memorandum and Articles of Association (M&A) | Defines company's purpose, powers, rules for operation | Companies House (UK) / Registered at incorporation |
| Register of Shareholders | Lists share ownership — critical for UBO identification | Companies House (if PSC register filed) / Company records |
| Register of Directors | Lists current directors; cross-referenced for PEP screening | Companies House / Company records |

**Category 2: Financial Documentation**

| Document | Purpose | Minimum Period |
|---|---|---|
| Audited Financial Statements | Primary financial evidence; confirms P&L, balance sheet, cashflows | 2–3 years |
| Auditor's Report | Confirms audit scope and opinion type | Same as accounts |
| Management Accounts (YTD) | Current trading; updates the picture between audits | Latest period available |
| Cash Flow Forecast / Business Plan | Demonstrates ability to service debt from future operations | 3–5 year projection |
| List of Group Entities and Intercompany Balances | Maps economic reality of the group | Current |

**Category 3: Ownership and Control**

| Document | Purpose |
|---|---|
| Group Structure Chart | Visual map of all entities in the group, ownership percentages, jurisdictions |
| Persons with Significant Control (PSC) Register | UK statutory register of individuals with > 25% control |
| UBO Declaration (certified) | Statement from the company identifying all Ultimate Beneficial Owners above the threshold |
| Trust Deeds (if applicable) | Where shares are held in trust, identifies the beneficial owner of the trust |
| Shareholder Agreement | May reveal veto rights, call options, or control arrangements not visible from share registers |

**Category 4: Business Understanding**

| Document | Purpose |
|---|---|
| Company Profile / Business Plan | Describes what the business does, markets served, competitive position |
| Audited Accounts of Parent / Group | Reveals group-level financial position and intercompany obligations |
| Material Contracts (key customers, suppliers) | Validates revenue sustainability |
| Regulatory Licences / Permissions | Confirms the business is legally authorised to operate (FCA licence, environmental permits, etc.) |

### The Ultimate Beneficial Owner (UBO): The 25% Threshold

**Definition:** A UBO (Ultimate Beneficial Owner) is the natural person (individual human being) who ultimately owns or controls the company — the person for whose benefit the company ultimately operates.

**The 25% Threshold:** Under FATF Recommendations and EU AML Directives (and UK MLR 2017), a person is presumed to be a UBO if they hold > 25% of the shares, voting rights, or other ownership interest in the entity. This is an internationally agreed threshold, though some banks apply a 10% threshold for higher-risk customers.

**Why 25%, not 100%?** A person with 25.1% of shares has effective minority blocking power in many governance frameworks, and is large enough to materially benefit from the company's activities. The threshold balances practicality (going below 25% would require identifying thousands of small shareholders in publicly listed companies) with effectiveness (anyone with more than 25% is economically meaningful).

**Tracing Through Layers:** The key challenge in UBO identification is that ownership is often indirect:

```
Natural Person A (50% → HoldCo A)
Natural Person B (50% → HoldCo A)

HoldCo A (100% → MidCo Ltd, Jersey)
MidCo Ltd (75% → OpCo UK Ltd)
Third Party (25% → OpCo UK Ltd)

Borrower: OpCo UK Ltd
```

In this structure, UBOs of OpCo UK Ltd are:
- Natural Person A: 50% × 75% = 37.5% → UBO (above 25%)
- Natural Person B: 50% × 75% = 37.5% → UBO (above 25%)
- Third Party: 25% → UBO if a natural person; if a corporate, trace further

The UBO register must record Natural Person A and Natural Person B, with their identification (passport, proof of address) and certified share percentages at each layer.

### Enhanced Due Diligence (EDD) Triggers

Standard due diligence (SDD) applies to most corporate customers. EDD is required when one or more risk factors elevate the money laundering or sanctions risk:

**Trigger 1: Politically Exposed Person (PEP)**

A PEP is an individual who holds or has held a prominent public function. The definition under UK MLR 2017 includes:

- Heads of state, government, cabinet ministers
- Members of parliament / congress / senate
- Members of supreme/constitutional courts
- Senior central bank officials
- Ambassadors and high commissioners
- Senior military officers
- Directors or board members of state-owned enterprises
- **Close associates and family members** of the above (RCAs — Relatives and Close Associates)

Why PEPs matter for credit: PEPs may have access to public funds and political influence that creates corruption risk. Their source of wealth may not be fully legitimate. International PEPs (from countries with high corruption perception indices) carry particularly elevated risk.

EDD for PEPs requires: senior management approval, source of wealth documentation, source of funds verification, enhanced monitoring.

**Trigger 2: High-Risk Jurisdiction**

FATF maintains a list of jurisdictions with strategic AML/CFT deficiencies — the "blacklist" (currently countries like Myanmar, Iran, North Korea) and the "grey list" (jurisdictions under increased monitoring). The EU also maintains its own list. UK MLR 2017 requires EDD for customers in FATF-listed jurisdictions.

Practical impact on credit: lending to entities in sanctioned or high-risk jurisdictions may be prohibited, extremely restricted, or require regulatory approval. Even if technically permissible, the reputational risk must be assessed.

**Trigger 3: Complex or Opaque Ownership Structure**

Structures involving:
- Multiple jurisdictions (particularly offshore financial centres: BVI, Cayman Islands, Panama, Liechtenstein, Marshall Islands)
- Trust arrangements where the beneficiary is obscured
- Nominee directors and shareholders
- Bearer shares (unregistered — increasingly prohibited but still exist in some jurisdictions)
- Multiple layers of holding companies with no apparent business purpose

EDD in these cases requires: explanation of why the structure exists, independent verification of ownership claims, senior management approval, legal opinions on enforceability.

**Trigger 4: Transaction Monitoring Red Flags**

For existing customers, EDD may be triggered by:
- Unexplained changes in transaction patterns
- Payments to or from high-risk jurisdictions inconsistent with stated business
- Round-number transactions
- Rapid movement of large sums through accounts
- Use of multiple currency accounts without apparent commercial reason

---

## 4. Statistical Concepts

### Risk Scoring and the KYC Risk Assessment

Banks assign a **Customer Risk Rating (CRR)** or KYC Risk Score to each customer at onboarding and update it periodically. This is distinct from the **Credit Risk Rating** (which measures probability of default). The KYC Risk Score measures **AML/financial crime risk**, not creditworthiness.

A typical KYC Risk Score model uses weighted factors:

| Factor | Risk Indicators (Low → High) | Weight |
|---|---|---|
| Customer Type | Public listed company → Private SME → Shell company | 20% |
| Jurisdiction of Incorporation | UK/EU/US → Emerging market → FATF grey list → FATF blacklist | 25% |
| Ownership Transparency | Clear beneficial ownership → Indirect but traceable → Opaque/untraceable | 20% |
| Business Activity | Low-risk sector (manufacturing) → Higher risk (money services, crypto) | 15% |
| PEP Status | No PEP → Domestic PEP → International PEP | 10% |
| Adverse News | No findings → Historical concerns → Recent adverse findings | 10% |

**Scoring:**
- Low Risk (Score 0–30): Standard Due Diligence; refresh every 3 years
- Medium Risk (Score 31–60): Standard Due Diligence with enhanced monitoring; refresh every 2 years
- High Risk (Score 61–100): Enhanced Due Diligence; senior approval required; refresh annually

**Statistical considerations:**
- The weights above are illustrative and are typically calibrated using logistic regression against historical cases of financial crime or regulatory findings
- Banks with large AML teams use machine learning models (random forest, gradient boosting) to predict which customers are most likely to trigger SARs (Suspicious Activity Reports) — but these must be explainable for regulatory purposes
- The risk score interacts with the credit risk rating: a high-AML-risk customer with a low credit risk rating still requires EDD — credit quality does not compensate for financial crime risk

### Document Completeness Rate — Operational Metric

Banks track KYC completion rates as an operational KPI:

**Document Completeness Rate** = Documents Received / Documents Required × 100%

**KYC Cycle Time** = Days from KYC Request Initiated to KYC Approved

**Refresh Compliance Rate** = Customers with Current (non-expired) KYC / Total Customers × 100%

A refresh compliance rate below 90% typically triggers regulatory concern. Banks with large legacy portfolios (customers onboarded before modern KYC standards) often run KYC remediation programmes, re-collecting documentation for thousands of customers simultaneously — a major operational and data management challenge.

---

## 5. Regulatory Framework

### FATF — The Global Standard-Setter

The Financial Action Task Force (FATF) is the inter-governmental body that sets international AML/CFT standards. FATF's 40 Recommendations form the basis for AML laws in all major jurisdictions.

Key FATF recommendations relevant to corporate KYC:

**Recommendation 10 — Customer Due Diligence:**
Financial institutions must identify and verify customer identity; identify and verify beneficial owners (> 25%); understand the purpose and intended nature of the business relationship; conduct ongoing due diligence.

**Recommendation 12 — Politically Exposed Persons:**
Institutions must apply EDD to PEPs, including obtaining senior management approval, establishing source of wealth and funds.

**Recommendation 15 — New Technologies:**
Institutions must assess ML/TF risks of new products and technology (including crypto-assets).

**Recommendation 24 — Transparency of Legal Persons:**
Countries must ensure adequate transparency of beneficial ownership of legal persons — the basis for UBO registers worldwide.

### UK Regulatory Framework

**Money Laundering, Terrorist Financing and Transfer of Funds (Information on the Payer) Regulations 2017 (MLR 2017)**

MLR 2017 is the primary UK legislation implementing the EU's 4th AML Directive. Key provisions:

- **Regulation 28:** CDD requirements — identification and verification of customer, beneficial owner, and understanding of business relationship purpose
- **Regulation 33:** EDD requirements — circumstances requiring enhanced due diligence (PEPs, high-risk jurisdictions, complex structures)
- **Regulation 40:** Reliance on third parties — banks can rely on CDD conducted by other regulated entities under specified conditions
- **Regulation 41:** Record keeping — CDD records must be kept for 5 years after the business relationship ends
- **Schedule 3A:** High-risk third country list

**Companies House — UK Person of Significant Control (PSC) Register**

Since April 2016, UK companies must maintain and file a PSC register disclosing individuals with:
- > 25% of shares or voting rights
- Power to appoint or remove a majority of directors
- Significant influence or control over the company

PSC registers are publicly searchable on the Companies House website. For credit and KYC analysts, the PSC register is the first stop in UBO identification for UK entities.

**Proceeds of Crime Act 2002 (POCA 2002)**

POCA defines money laundering offences and the obligations of the "regulated sector" (which includes banks). The obligation to report suspicions of money laundering to the National Crime Agency (NCA) via a Suspicious Activity Report (SAR) is a criminal obligation — failure to report when there are reasonable grounds for suspicion is itself a criminal offence.

### EU AML Framework: 4th and 5th AML Directives

**4th AMLD (2015/849/EU):** Introduced the risk-based approach; required EU member states to establish UBO registers for companies; required enhanced CDD for PEPs; extended AML obligations to virtual currency exchanges (partially).

**5th AMLD (2018/843/EU):** Made UBO registers publicly accessible; lowered the PEP threshold for virtual currency services; introduced stricter rules on high-risk third countries; extended AML requirements to crypto-asset service providers.

**6th AMLD (2021/1332/EU) — Criminal Sanctions:**
Harmonised criminal offences for money laundering across EU member states; introduced criminal liability for legal entities (companies can be prosecuted, not just individuals); expanded predicate offences.

**Post-Brexit UK position:** MLR 2017 and subsequent amendments have retained the 5th AMLD requirements. The UK is no longer bound by future EU AML directives but has been developing its own AML/CFT regime through the Economic Crime and Corporate Transparency Act 2023.

### US Regulatory Framework

**Bank Secrecy Act (BSA) 1970 and FinCEN (Financial Crimes Enforcement Network)**

The BSA requires US financial institutions to maintain records and file reports (Currency Transaction Reports for cash transactions > US$10,000; SARs for suspicious activity). FinCEN administers the BSA and issues guidance.

**FinCEN Customer Due Diligence Rule (2016):**
Requires banks, broker-dealers, and other covered institutions to:
1. Identify and verify the identity of customers
2. Identify and verify the identity of beneficial owners of legal entity customers (> 25% ownership threshold or a single individual with effective control)
3. Understand the nature and purpose of customer relationships
4. Conduct ongoing monitoring

**OFAC — Office of Foreign Assets Control:**
OFAC administers US economic sanctions. Banks must screen all customers and transactions against OFAC's Specially Designated Nationals (SDN) list. Violating OFAC sanctions carries severe penalties — BNP Paribas was fined US$8.9bn in 2014 for sanctions violations. Even a bank outside the US can face US dollar clearing restrictions and exclusion from the US financial system for OFAC violations.

---

## 6. Data Required

### The KYC Data Model in the Credit Management System

At customer onboarding, the KYC process populates a defined set of data fields in the Credit Management System (CMS) or Customer Due Diligence (CDD) platform. Understanding these data fields is essential for Business Analysts building or maintaining these systems.

**Entity Master Data:**

| Field | Data Type | Validation Rule | Notes |
|---|---|---|---|
| Customer_ID | VARCHAR(20) | NOT NULL, UNIQUE | System-generated at onboarding |
| Legal_Entity_Name | VARCHAR(255) | NOT NULL | Must match incorporation document |
| Registration_Number | VARCHAR(50) | NOT NULL | Companies House number for UK |
| LEI (Legal Entity Identifier) | CHAR(20) | Format: 18 alphanumeric + 2 check digits | Mandatory for regulated entities; recommended for all corporates |
| Date_of_Incorporation | DATE | Must be ≤ TODAY() | Cross-check against incorporation certificate |
| Jurisdiction_of_Incorporation | VARCHAR(100) | Valid country code (ISO 3166-1) | |
| Registered_Address | VARCHAR(500) | NOT NULL | Full address, postcode |
| Business_Activity_Code | VARCHAR(10) | SIC/NACE code | Drives ML risk scoring |
| KYC_Risk_Score | DECIMAL(5,2) | 0.00 – 100.00 | Calculated from risk model |
| KYC_Risk_Category | VARCHAR(10) | LOW / MEDIUM / HIGH | Derived from score |
| Customer_Type | VARCHAR(50) | Limited Co / PLC / Partnership / LLP / Sole Trader / Trust / Other | |
| Relationship_Manager_ID | VARCHAR(20) | FK to Employee table | |
| Onboarding_Date | DATE | NOT NULL | Date KYC approved and customer active |
| Next_KYC_Review_Date | DATE | Based on risk category | Auto-calculated from risk category + policy |

**UBO/Beneficial Owner Data:**

| Field | Data Type | Validation Rule |
|---|---|---|
| UBO_ID | VARCHAR(20) | System-generated |
| Customer_ID | VARCHAR(20) | FK to Entity Master; NOT NULL |
| UBO_Full_Name | VARCHAR(255) | NOT NULL |
| UBO_DOB | DATE | NOT NULL |
| UBO_Nationality | VARCHAR(100) | ISO country code |
| UBO_Country_of_Residence | VARCHAR(100) | ISO country code |
| Ownership_Percentage_Direct | DECIMAL(5,2) | 0.00 – 100.00 |
| Ownership_Percentage_Effective | DECIMAL(5,2) | 0.00 – 100.00 | Calculated through layers |
| Ownership_Basis | VARCHAR(50) | SHARES / VOTING_RIGHTS / CONTROL / TRUST | |
| PEP_Status | VARCHAR(20) | NOT_PEP / DOMESTIC_PEP / INTERNATIONAL_PEP / RCA | |
| PEP_Position | VARCHAR(255) | NULL if not PEP | |
| Sanctions_Match | BOOLEAN | DEFAULT FALSE | Output of screening |
| ID_Document_Type | VARCHAR(50) | PASSPORT / NATIONAL_ID / DRIVING_LICENCE | |
| ID_Document_Number | VARCHAR(100) | NOT NULL | |
| ID_Expiry_Date | DATE | Must be > TODAY() | |
| ID_Verified_Date | DATE | NOT NULL | When bank verified the document |

**Document Registry:**

| Field | Description |
|---|---|
| Document_ID | Unique identifier |
| Customer_ID | FK |
| Document_Type | Certificate of Incorporation / Audited Accounts / Management Accounts / M&A / UBO Declaration / Passport / etc. |
| Document_Date | Date the document was issued/dated |
| Document_Period_End | For financial statements: financial year-end date |
| Date_Received | When the bank received the document |
| Date_Verified | When a CDD officer confirmed authenticity |
| Expiry_Date | When the document expires (if applicable — e.g., passport) |
| Document_Status | RECEIVED / VERIFIED / EXPIRED / OUTSTANDING / REJECTED |
| Stored_Reference | Location in Document Management System |

---

## 7. How Analysts Actually Work

### The Onboarding Process: Step by Step

**Step 1: Pre-Screening (Before Formal Onboarding)**

Before the bank invests in a full KYC process, the Relationship Manager conducts a quick pre-screening to identify obvious blockers:

- Is the customer on the OFAC SDN list or UK HM Treasury financial sanctions list? (Quick check takes minutes)
- Is the customer in a prohibited sector or jurisdiction? (Every bank maintains a "prohibited/restricted activities" list)
- Does the customer appear in any recent adverse news that would prevent onboarding? (Basic internet search)

If pre-screening is clear, the formal KYC process begins.

**Step 2: KYC Document Request**

The RM or Client Onboarding Team (COT) sends the customer a formal "Document Request List" — a checklist of all documents required. The specific list depends on customer risk profile:

- **Standard (Low Risk):** Certificate of Incorporation, M&A, latest audited accounts, PSC register, two forms of ID for each director and UBO
- **Enhanced (Medium Risk):** All above + group structure chart, audited group accounts, explanation of group purpose, additional director/UBO documents
- **EDD (High Risk):** All above + source of wealth documentation, source of funds documentation, senior management approval, legal opinions (for complex structures), government registry searches in relevant jurisdictions

**Step 3: Document Collection and Verification**

The COT collects documents and verifies them:

- **Incorporation documents:** Cross-check legal entity name, registration number, and registered address against Companies House (or relevant registry). Confirm the entity is active (not dissolved or subject to insolvency proceedings).
- **Financial documents:** Confirm the auditor is a recognised firm (registered with FRC in the UK), check audit opinion type, verify period covers the required years.
- **Identity documents:** Verify passport/ID against a certified copy or digital verification tool (e.g., Onfido, Jumio). Check document has not expired. Confirm the individual's name matches the legal documents.

**Step 4: Screening**

All identified individuals and entities are screened against:
- **Sanctions lists:** OFAC SDN, UK HM Treasury Consolidated List, EU Consolidated List, UN Security Council list
- **PEP databases:** Commercial providers (e.g., Dow Jones, Refinitiv World-Check, Acuris)
- **Adverse news databases:** Negative news screening (money laundering, fraud, corruption, bribery, tax evasion, regulatory sanctions)

Screening produces **matches** (definite hits — must be reviewed) and **false positives** (similar names, different individuals). The analyst must adjudicate each match:
- Is this the same person/entity? (Name, date of birth, nationality, registered number)
- If yes: what is the finding? Does it prevent onboarding, require EDD, or can it be explained and mitigated?
- If no: document the false positive rationale and clear the alert

**Step 5: Risk Assessment and Scoring**

With all information collected and verified, the COT or AML analyst calculates the KYC Risk Score and documents the risk assessment:
- What risk factors were identified?
- What mitigants exist?
- What monitoring is required?
- Is the risk acceptable at the bank's risk appetite?

**Step 6: Approval**

- Low/Medium Risk: Approved by COT Manager or AML Analyst
- High Risk: Requires sign-off from Head of Financial Crime Compliance and typically a senior Business sponsor (the relevant sector head, regional head, or country head)
- EDD (PEPs, highest-risk): Requires written approval from senior management (VP level or above, documented in the KYC file)

**Step 7: Periodic Refresh**

KYC is not a one-time event. The bank must maintain current, accurate KYC information throughout the relationship:
- Annual review for High Risk customers
- Biennial review for Medium Risk
- Triennial review for Low Risk
- Triggered review if risk factors change (new UBO identified, PEP status change, adverse news alert, change of business activity)

### The Credit File: KYC as the Foundation

Once KYC is approved, the credit analyst can begin building the credit file. The KYC pack provides the following direct inputs to credit analysis:

1. **Legal entity and group structure:** Confirms who the borrower is and who stands behind them
2. **Financial accounts:** The starting point for financial analysis
3. **Business description:** Informs industry analysis and management assessment
4. **UBO/ownership:** Enables assessment of management quality, succession risk, and alignment of interests (do the owners have "skin in the game"?)
5. **PSC/control structure:** Identifies who makes decisions — relevant if control could change (e.g., PE owner planning to exit)

A credit application cannot proceed without an approved KYC file. Any outstanding KYC item is a **Condition Precedent to Drawdown** — the loan cannot be drawn until KYC is complete.

---

## 8. Excel Implementation

### KYC Checklist with RAG Tracker and Auto-Escalation Logic

This Excel tool enables a Relationship Manager or COT officer to track KYC document collection, auto-calculate completion, and flag high-risk cases requiring escalation.

**Sheet 1: Customer Master Input**

```
Cell B2:  Customer Legal Name         [Input]
Cell B3:  Registration Number         [Input]
Cell B4:  Jurisdiction                [Input - dropdown: UK / EU / US / Offshore / High-Risk]
Cell B5:  Customer Type               [Input - dropdown: PLC / Limited Co / LLP / Trust / Other]
Cell B6:  Business Sector             [Input - SIC Code]
Cell B7:  Estimated Annual Turnover   [Input - £]
Cell B8:  PEP Identified?             [Input - dropdown: YES / NO / PENDING]
Cell B9:  Sanctions Match?            [Input - dropdown: YES - CONFIRMED / YES - FALSE POSITIVE / NO / PENDING]
Cell B10: High Risk Jurisdiction?     [Input - dropdown: YES / NO]
Cell B11: Complex Structure?          [Input - dropdown: YES / NO]
```

**Sheet 2: Document Checklist**

| Column A | Column B | Column C | Column D | Column E | Column F |
|---|---|---|---|---|---|
| Document | Required For | Status | Date Received | Date Verified | Days Outstanding |

```
Row 3: Certificate of Incorporation | ALL | [DROPDOWN] | [Date] | [Date] | =IF(C3="RECEIVED",0,TODAY()-B2)
Row 4: Articles of Association       | ALL | [DROPDOWN] | [Date] | [Date] | ...
Row 5: Companies House Search        | ALL | [DROPDOWN] | ...
Row 6: Latest Audited Accounts (Y-1) | ALL | ...
Row 7: Audited Accounts (Y-2)        | ALL | ...
Row 8: Audited Accounts (Y-3)        | Loan > £5m | ...
Row 9: Management Accounts (YTD)     | ALL | ...
Row 10: Group Structure Chart        | ALL | ...
Row 11: Group Consolidated Accounts  | If group structure exists | ...
Row 12: PSC Register / UBO Declaration | ALL | ...
Row 13: UBO Passport - UBO 1         | ALL | ...
Row 14: UBO Proof of Address - UBO 1 | ALL | ...
Row 15: UBO Passport - UBO 2         | If 2nd UBO identified | ...
Row 16: Source of Wealth Declaration | If PEP = YES or High Risk | ...
Row 17: Source of Funds Documentation | If transaction > £1m | ...
Row 18: Senior Management Approval   | If High Risk or PEP | ...

Status dropdown options: OUTSTANDING / RECEIVED / VERIFIED / NOT REQUIRED / WAIVED (with approval)
```

**Sheet 2: Status Logic (Column C Formula)**

```excel
Conditional Formatting for Status column:
- OUTSTANDING:   Red fill (#FF0000)
- RECEIVED:      Amber fill (#FFA500)
- VERIFIED:      Green fill (#00B050)
- NOT REQUIRED:  Grey fill (#808080)
- WAIVED:        Blue fill (#0070C0)
```

**Sheet 2: Completion Tracker**

```excel
=== COMPLETION METRICS (Row 2 Summary) ===

B2: Total Documents Required
= COUNTIF(C3:C30, "<>NOT REQUIRED")

B3: Documents Verified
= COUNTIF(C3:C30, "VERIFIED")

B4: Completion Rate (%)
= B3/B2 * 100

B5: Documents Outstanding
= COUNTIF(C3:C30, "OUTSTANDING")

B6: Days Since Oldest Outstanding
= MAXIFS(F3:F30, C3:C30, "OUTSTANDING")

B7: KYC Status
= IF(B4=100, "COMPLETE",
   IF(B4>=80, "NEAR COMPLETE - " & B5 & " ITEMS OUTSTANDING",
   IF(B4>=50, "IN PROGRESS - ACTION REQUIRED",
   "INCOMPLETE - ESCALATE")))
```

**Sheet 3: Risk Escalation Logic**

```excel
=== AUTO-ESCALATION FLAGS ===

Escalation_Required:
= IF(
    OR(
        Sheet1!B8 = "YES",                     -- PEP identified
        Sheet1!B9 = "YES - CONFIRMED",         -- Confirmed sanctions match
        Sheet1!B10 = "YES",                    -- High risk jurisdiction
        AND(Sheet1!B11 = "YES",
            Sheet2!B4 < 100)                  -- Complex structure + incomplete docs
    ),
    "ESCALATION REQUIRED — DO NOT PROCEED WITHOUT SENIOR APPROVAL",
    IF(Sheet2!B4 = 100, "CLEAR TO PROCEED", "PENDING — CHASE OUTSTANDING DOCUMENTS")
  )

Conditional formatting: Red cell if "ESCALATION REQUIRED", Green if "CLEAR TO PROCEED"
```

**Sheet 3: UBO Ownership Calculator**

For complex ownership chains, use this nested structure to calculate effective ownership:

```excel
=== UBO EFFECTIVE OWNERSHIP CALCULATOR ===

A         B           C                D                 E
Layer     Entity      Ownership %      Cumulative %      UBO?
         (Top)        to Next Layer
1         HoldCo A    [Input: 80%]     80%               =IF(E2>=25%,"YES","NO")
2         MidCo Ltd   [Input: 75%]     =B2*B3/100        =IF(D3>=25%,"YES","NO")
3         OpCo UK     [Input: 100%]    =D3*B4/100        =IF(D4>=25%,"YES","NO")

Effective UBO ownership of named person in HoldCo A:
= Person's Share in HoldCo A × HoldCo A's share in MidCo × MidCo's share in OpCo
= (Person_Pct / 100) × (B3/100) × (B4/100) × 100
```

---

## 9. SQL Implementation

### Schema Assumptions

```sql
-- Tables assumed in a Credit Management System / KYC Platform:
-- CUSTOMERS: Legal entity master data
-- UBOS: Beneficial owner records per customer
-- KYC_DOCUMENTS: Document tracking per customer
-- SCREENING_RESULTS: Sanctions/PEP screening outputs
-- KYC_REVIEWS: History of KYC review events
-- RISK_RATINGS_KYC: KYC risk score history
```

### Query 1: Identify Customers with Expired or Missing KYC Documents

```sql
/*
 * Purpose: Identify customers whose KYC documents are expired, missing, or
 *          due for refresh, ranked by criticality.
 * Used by: Client Onboarding Team for KYC remediation reporting.
 *          Compliance reporting to regulators.
 * Run:     Monthly before the Compliance MI pack is produced.
 */

WITH document_status AS (
    SELECT
        c.customer_id,
        c.legal_entity_name,
        c.kyc_risk_category,
        c.next_kyc_review_date,
        c.onboarding_date,
        c.relationship_manager_id,

        -- Certificate of Incorporation: must always be present and verified
        MAX(CASE
            WHEN kd.document_type = 'CERTIFICATE_OF_INCORPORATION'
             AND kd.document_status = 'VERIFIED'
            THEN 1 ELSE 0
        END)                                                AS has_incorp_cert,

        -- Latest audited accounts: document_period_end within last 18 months
        MAX(CASE
            WHEN kd.document_type = 'AUDITED_ACCOUNTS'
             AND kd.document_status = 'VERIFIED'
             AND kd.document_period_end >= DATEADD(MONTH, -18, GETDATE())
            THEN 1 ELSE 0
        END)                                                AS has_current_accounts,

        -- PSC/UBO declaration: must be present and verified
        MAX(CASE
            WHEN kd.document_type IN ('PSC_REGISTER', 'UBO_DECLARATION')
             AND kd.document_status = 'VERIFIED'
            THEN 1 ELSE 0
        END)                                                AS has_ubo_declaration,

        -- Overall document completeness (simplified — expand for full checklist)
        COUNT(CASE WHEN kd.document_status = 'OUTSTANDING' THEN 1 END)
                                                            AS outstanding_docs,
        COUNT(CASE WHEN kd.document_status = 'EXPIRED' THEN 1 END)
                                                            AS expired_docs,
        COUNT(CASE WHEN kd.document_status = 'VERIFIED' THEN 1 END)
                                                            AS verified_docs

    FROM customers c
    LEFT JOIN kyc_documents kd
        ON c.customer_id = kd.customer_id

    WHERE c.customer_status = 'ACTIVE'

    GROUP BY
        c.customer_id,
        c.legal_entity_name,
        c.kyc_risk_category,
        c.next_kyc_review_date,
        c.onboarding_date,
        c.relationship_manager_id
),

ubo_status AS (
    -- Check that all UBOs have current (non-expired) identity documents
    SELECT
        u.customer_id,
        COUNT(*)                                            AS total_ubos,
        SUM(CASE WHEN u.id_expiry_date < GETDATE()
                 OR u.id_expiry_date IS NULL
                 THEN 1 ELSE 0 END)                         AS ubos_with_expired_id,
        SUM(CASE WHEN u.sanctions_match = 1 THEN 1 ELSE 0 END)
                                                            AS ubos_with_sanctions_match
    FROM ubos u
    WHERE u.ubo_status = 'ACTIVE'
    GROUP BY u.customer_id
)

SELECT
    ds.customer_id,
    ds.legal_entity_name,
    ds.kyc_risk_category,
    DATEDIFF(DAY, GETDATE(), ds.next_kyc_review_date)      AS days_to_kyc_expiry,

    -- Document issues
    ds.outstanding_docs,
    ds.expired_docs,
    ds.has_incorp_cert,
    ds.has_current_accounts,
    ds.has_ubo_declaration,

    -- UBO issues
    COALESCE(us.total_ubos, 0)                             AS total_ubos,
    COALESCE(us.ubos_with_expired_id, 0)                   AS ubos_expired_id,
    COALESCE(us.ubos_with_sanctions_match, 0)              AS ubos_sanctions_match,

    -- Criticality assessment
    CASE
        WHEN us.ubos_with_sanctions_match > 0
            THEN 'CRITICAL — SANCTIONS MATCH: IMMEDIATE ESCALATION'
        WHEN DATEDIFF(DAY, GETDATE(), ds.next_kyc_review_date) < 0
         AND ds.kyc_risk_category = 'HIGH'
            THEN 'CRITICAL — HIGH RISK KYC OVERDUE'
        WHEN ds.has_incorp_cert = 0
            THEN 'HIGH — MISSING INCORPORATION CERTIFICATE'
        WHEN ds.has_ubo_declaration = 0
            THEN 'HIGH — MISSING UBO DOCUMENTATION'
        WHEN ds.has_current_accounts = 0
            THEN 'HIGH — AUDITED ACCOUNTS STALE OR MISSING'
        WHEN DATEDIFF(DAY, GETDATE(), ds.next_kyc_review_date) < 0
            THEN 'MEDIUM — KYC REFRESH OVERDUE'
        WHEN DATEDIFF(DAY, GETDATE(), ds.next_kyc_review_date) <= 30
            THEN 'MEDIUM — KYC REFRESH DUE IN 30 DAYS'
        WHEN us.ubos_with_expired_id > 0
            THEN 'LOW — UBO ID DOCUMENTS EXPIRING'
        ELSE 'OK'
    END                                                     AS kyc_status_flag

FROM document_status ds
LEFT JOIN ubo_status us
    ON ds.customer_id = us.customer_id

WHERE
    -- Show only customers with an issue
    (
        ds.outstanding_docs > 0
        OR ds.expired_docs > 0
        OR ds.has_incorp_cert = 0
        OR ds.has_current_accounts = 0
        OR ds.has_ubo_declaration = 0
        OR DATEDIFF(DAY, GETDATE(), ds.next_kyc_review_date) <= 30
        OR COALESCE(us.ubos_with_expired_id, 0) > 0
        OR COALESCE(us.ubos_with_sanctions_match, 0) > 0
    )

ORDER BY
    -- Prioritise most critical issues
    CASE
        WHEN us.ubos_with_sanctions_match > 0 THEN 1
        WHEN DATEDIFF(DAY, GETDATE(), ds.next_kyc_review_date) < 0
         AND ds.kyc_risk_category = 'HIGH' THEN 2
        WHEN ds.has_incorp_cert = 0 THEN 3
        WHEN ds.has_ubo_declaration = 0 THEN 4
        WHEN DATEDIFF(DAY, GETDATE(), ds.next_kyc_review_date) < 0 THEN 5
        ELSE 6
    END,
    ds.kyc_risk_category DESC,
    days_to_kyc_expiry ASC;
```

### Query 2: UBO Records with Missing or Incomplete Data

```sql
/*
 * Purpose: Identify all UBO records with data quality issues.
 *          Used for KYC remediation targeting and regulatory reporting.
 */

SELECT
    u.customer_id,
    c.legal_entity_name,
    c.kyc_risk_category,
    u.ubo_id,
    u.ubo_full_name,
    u.ownership_percentage_effective,

    -- Completeness flags
    CASE WHEN u.ubo_dob IS NULL              THEN 'MISSING' ELSE 'OK' END AS dob_status,
    CASE WHEN u.ubo_nationality IS NULL      THEN 'MISSING' ELSE 'OK' END AS nationality_status,
    CASE WHEN u.id_document_number IS NULL   THEN 'MISSING' ELSE 'OK' END AS id_doc_status,
    CASE WHEN u.id_expiry_date < GETDATE()
          OR u.id_expiry_date IS NULL        THEN 'EXPIRED/MISSING'
                                             ELSE 'OK'
    END                                                     AS id_expiry_status,

    -- PEP handling completeness
    CASE
        WHEN u.pep_status IN ('DOMESTIC_PEP', 'INTERNATIONAL_PEP', 'RCA')
         AND NOT EXISTS (
            SELECT 1
            FROM kyc_reviews kr
            WHERE kr.customer_id = u.customer_id
              AND kr.review_type = 'EDD_PEP_APPROVAL'
              AND kr.review_status = 'APPROVED'
              AND kr.review_date > DATEADD(YEAR, -1, GETDATE())
         )
        THEN 'PEP — EDD APPROVAL OVERDUE'
        WHEN u.pep_status IN ('DOMESTIC_PEP', 'INTERNATIONAL_PEP', 'RCA')
        THEN 'PEP — EDD IN PLACE'
        ELSE 'NOT PEP'
    END                                                     AS pep_edd_status,

    -- Sanctions
    CASE
        WHEN u.sanctions_match = 1 THEN 'SANCTIONS MATCH — ESCALATE'
        ELSE 'CLEAR'
    END                                                     AS sanctions_status,

    -- Overall UBO data quality score
    (
        CASE WHEN u.ubo_dob IS NOT NULL          THEN 1 ELSE 0 END
      + CASE WHEN u.ubo_nationality IS NOT NULL  THEN 1 ELSE 0 END
      + CASE WHEN u.id_document_number IS NOT NULL THEN 1 ELSE 0 END
      + CASE WHEN u.id_expiry_date > GETDATE()   THEN 1 ELSE 0 END
      + CASE WHEN u.id_verified_date IS NOT NULL  THEN 1 ELSE 0 END
    ) * 20                                                  AS data_quality_pct

FROM ubos u
INNER JOIN customers c
    ON u.customer_id = c.customer_id
WHERE
    c.customer_status = 'ACTIVE'
    AND u.ubo_status = 'ACTIVE'
    AND (
        u.ubo_dob IS NULL
        OR u.ubo_nationality IS NULL
        OR u.id_document_number IS NULL
        OR u.id_expiry_date < GETDATE()
        OR u.id_expiry_date IS NULL
        OR u.sanctions_match = 1
    )
ORDER BY
    CASE WHEN u.sanctions_match = 1 THEN 1 ELSE 2 END,
    c.kyc_risk_category DESC,
    u.ownership_percentage_effective DESC;
```

### Query 3: KYC Refresh Compliance Dashboard

```sql
/*
 * Purpose: Senior management KYC compliance summary.
 *          Shows refresh rates by risk category and relationship manager.
 */

SELECT
    c.kyc_risk_category,
    c.relationship_manager_id,
    COUNT(*)                                                AS total_customers,

    -- Compliant: next review date is in the future
    SUM(CASE WHEN c.next_kyc_review_date > GETDATE()
             THEN 1 ELSE 0 END)                             AS kyc_current,

    -- Overdue: next review date has passed
    SUM(CASE WHEN c.next_kyc_review_date <= GETDATE()
             THEN 1 ELSE 0 END)                             AS kyc_overdue,

    -- Overdue by > 90 days (regulatory risk)
    SUM(CASE WHEN c.next_kyc_review_date <= DATEADD(DAY, -90, GETDATE())
             THEN 1 ELSE 0 END)                             AS kyc_overdue_90days,

    -- Compliance rate
    CAST(
        SUM(CASE WHEN c.next_kyc_review_date > GETDATE() THEN 1 ELSE 0 END)
        AS FLOAT
    ) / COUNT(*) * 100                                      AS kyc_compliance_rate_pct,

    -- Average days overdue (for overdue customers only)
    AVG(CASE
        WHEN c.next_kyc_review_date <= GETDATE()
        THEN DATEDIFF(DAY, c.next_kyc_review_date, GETDATE())
        ELSE NULL
    END)                                                    AS avg_days_overdue

FROM customers c
WHERE c.customer_status = 'ACTIVE'
GROUP BY
    c.kyc_risk_category,
    c.relationship_manager_id
ORDER BY
    kyc_compliance_rate_pct ASC,   -- Worst compliance first
    kyc_risk_category DESC;         -- High risk first within compliance rate
```

---

## 10. Python Implementation

### Automated UBO Graph Traversal Using NetworkX

```python
"""
UBO Ownership Graph Traversal
==============================
Uses the networkx library to traverse complex ownership structures,
identify Ultimate Beneficial Owners, calculate effective ownership percentages,
and flag PEP or incomplete data issues.

This is the kind of tool used by KYC analysts and compliance teams
to automate UBO identification in large, complex corporate groups.

Author: Credit Risk Academy — Module 02
"""

import networkx as nx
import pandas as pd
from dataclasses import dataclass, field
from typing import Optional
import json


# ─────────────────────────────────────────────
# 1. Data Structures
# ─────────────────────────────────────────────

@dataclass
class Entity:
    """
    Represents any node in the ownership graph.
    Could be a natural person (UBO candidate) or a legal entity.
    """
    entity_id: str
    name: str
    entity_type: str          # 'NATURAL_PERSON' | 'COMPANY' | 'TRUST' | 'PARTNERSHIP'
    jurisdiction: str
    is_pep: bool = False
    pep_detail: str = ""
    sanctions_match: bool = False
    id_verified: bool = False
    dob: Optional[str] = None
    nationality: Optional[str] = None
    adverse_news: bool = False

    def is_natural_person(self) -> bool:
        return self.entity_type == 'NATURAL_PERSON'

    def data_quality_score(self) -> int:
        """Return 0–100 completeness score for this entity's KYC data."""
        if not self.is_natural_person():
            return 100  # Not a person — document completeness tracked elsewhere

        score = 0
        if self.dob:           score += 25
        if self.nationality:   score += 25
        if self.id_verified:   score += 35
        if not self.is_pep or (self.is_pep and self.pep_detail):
                               score += 15
        return score


@dataclass
class OwnershipEdge:
    """Represents an ownership relationship between two entities."""
    owner_id: str    # The entity that owns
    owned_id: str    # The entity being owned
    ownership_pct: float   # Direct ownership percentage (0–100)
    ownership_basis: str   # 'SHARES' | 'VOTING_RIGHTS' | 'CONTROL'


# ─────────────────────────────────────────────
# 2. Ownership Graph Builder
# ─────────────────────────────────────────────

class OwnershipGraph:
    """
    Directed acyclic graph representing corporate ownership structure.
    Edges go FROM owner TO owned entity.
    """

    def __init__(self):
        self.graph = nx.DiGraph()
        self.entities: dict[str, Entity] = {}

    def add_entity(self, entity: Entity) -> None:
        """Add a node (entity) to the graph."""
        self.entities[entity.entity_id] = entity
        self.graph.add_node(
            entity.entity_id,
            name=entity.name,
            entity_type=entity.entity_type,
            jurisdiction=entity.jurisdiction,
            is_pep=entity.is_pep,
            sanctions_match=entity.sanctions_match
        )

    def add_ownership(self, edge: OwnershipEdge) -> None:
        """Add an ownership edge to the graph."""
        self.graph.add_edge(
            edge.owner_id,
            edge.owned_id,
            ownership_pct=edge.ownership_pct,
            ownership_basis=edge.ownership_basis
        )

    def validate(self) -> list[str]:
        """
        Validate the ownership graph for data quality issues.
        Returns a list of validation errors.
        """
        errors = []

        # Check for cycles (circular ownership — should not exist)
        try:
            cycles = list(nx.find_cycle(self.graph))
            if cycles:
                errors.append(f"CIRCULAR OWNERSHIP DETECTED: {cycles}")
        except nx.NetworkXNoCycle:
            pass  # No cycles — good

        # Check that ownership percentages sum correctly per owned entity
        for node in self.graph.nodes():
            in_edges = self.graph.in_edges(node, data=True)
            total_pct = sum(d['ownership_pct'] for _, _, d in in_edges)
            if total_pct > 0 and not (99.0 <= total_pct <= 100.5):
                errors.append(
                    f"WARNING: Ownership of {node} ({self.entities[node].name}) "
                    f"sums to {total_pct:.1f}% — expected ~100%"
                )

        return errors


# ─────────────────────────────────────────────
# 3. UBO Identification Engine
# ─────────────────────────────────────────────

class UBOAnalyser:
    """
    Traverses the ownership graph to identify Ultimate Beneficial Owners
    and calculate their effective ownership in the target entity.
    """

    def __init__(
        self,
        graph: OwnershipGraph,
        ubo_threshold_pct: float = 25.0   # Regulatory threshold
    ):
        self.graph = graph
        self.threshold = ubo_threshold_pct

    def get_all_ancestors(self, target_entity_id: str) -> dict[str, float]:
        """
        Find all ancestors of target_entity_id in the ownership graph
        and calculate their effective ownership percentage.
        Uses recursive DFS (Depth-First Search).

        Returns: dict of {entity_id: effective_ownership_pct}
        """
        effective_ownership: dict[str, float] = {}

        def dfs(current_id: str, cumulative_pct: float) -> None:
            """Recursive DFS from target entity upwards."""
            in_edges = self.graph.graph.in_edges(current_id, data=True)

            for owner_id, _, edge_data in in_edges:
                direct_pct = edge_data['ownership_pct']
                effective_pct = cumulative_pct * (direct_pct / 100.0)

                # Accumulate (an entity may own through multiple paths)
                if owner_id in effective_ownership:
                    effective_ownership[owner_id] += effective_pct
                else:
                    effective_ownership[owner_id] = effective_pct

                # Recurse upwards
                dfs(owner_id, effective_pct)

        # Initialise DFS from the target entity (100% ownership of itself)
        dfs(target_entity_id, 100.0)
        return effective_ownership

    def identify_ubos(self, target_entity_id: str) -> list[dict]:
        """
        Identify all UBOs for the target entity above the threshold.
        Returns a list of UBO records with risk flags.
        """
        all_owners = self.get_all_ancestors(target_entity_id)

        ubos = []
        for entity_id, effective_pct in all_owners.items():
            entity = self.graph.entities.get(entity_id)
            if entity is None:
                continue

            # Only natural persons qualify as UBOs
            if not entity.is_natural_person():
                continue

            # Apply UBO threshold
            if effective_pct < self.threshold:
                continue

            ubo_record = {
                "entity_id":              entity_id,
                "name":                   entity.name,
                "jurisdiction":           entity.jurisdiction,
                "effective_ownership_pct": round(effective_pct, 4),
                "is_pep":                 entity.is_pep,
                "pep_detail":             entity.pep_detail if entity.is_pep else "N/A",
                "sanctions_match":        entity.sanctions_match,
                "id_verified":            entity.id_verified,
                "dob":                    entity.dob,
                "nationality":            entity.nationality,
                "adverse_news":           entity.adverse_news,
                "data_quality_score":     entity.data_quality_score(),

                # Risk flags
                "flags": self._generate_flags(entity, effective_pct),
                "edd_required": (
                    entity.is_pep
                    or entity.sanctions_match
                    or entity.adverse_news
                    or entity.jurisdiction in FATF_HIGH_RISK_JURISDICTIONS
                ),
            }
            ubos.append(ubo_record)

        # Sort by effective ownership descending
        return sorted(ubos, key=lambda x: x['effective_ownership_pct'], reverse=True)

    def _generate_flags(self, entity: Entity, effective_pct: float) -> list[str]:
        """Generate risk flags for a UBO."""
        flags = []
        if entity.sanctions_match:
            flags.append("SANCTIONS MATCH — DO NOT PROCEED")
        if entity.is_pep:
            flags.append(f"PEP — EDD REQUIRED: {entity.pep_detail}")
        if entity.adverse_news:
            flags.append("ADVERSE NEWS IDENTIFIED — REVIEW REQUIRED")
        if not entity.id_verified:
            flags.append("ID NOT VERIFIED — OBTAIN AND VERIFY PASSPORT/ID")
        if entity.data_quality_score() < 75:
            flags.append(f"DATA QUALITY LOW ({entity.data_quality_score()}%) — SUPPLEMENT KYC DATA")
        if entity.jurisdiction in FATF_HIGH_RISK_JURISDICTIONS:
            flags.append(f"HIGH-RISK JURISDICTION: {entity.jurisdiction} — EDD REQUIRED")
        if effective_pct > 50:
            flags.append(f"MAJORITY OWNER ({effective_pct:.1f}%) — KEY CONTROL PERSON")
        return flags

    def identify_non_ubo_controllers(self, target_entity_id: str) -> list[dict]:
        """
        Identify legal entities (not natural persons) that own > 25% of the
        target but whose own UBOs could not be identified.
        These require further investigation.
        """
        all_owners = self.get_all_ancestors(target_entity_id)
        opaque_controllers = []

        for entity_id, effective_pct in all_owners.items():
            entity = self.graph.entities.get(entity_id)
            if entity is None or entity.is_natural_person():
                continue

            if effective_pct >= self.threshold:
                # Check if this entity's own ownership is traceable
                entity_owners = self.get_all_ancestors(entity_id)
                natural_person_owners = {
                    eid: pct for eid, pct in entity_owners.items()
                    if self.graph.entities.get(eid, None) is not None
                    and self.graph.entities[eid].is_natural_person()
                }

                if not natural_person_owners:
                    opaque_controllers.append({
                        "entity_id": entity_id,
                        "name": entity.name,
                        "entity_type": entity.entity_type,
                        "jurisdiction": entity.jurisdiction,
                        "effective_pct_in_target": round(effective_pct, 4),
                        "issue": "OPAQUE — NO NATURAL PERSON OWNERS IDENTIFIED — FURTHER INVESTIGATION REQUIRED"
                    })

        return opaque_controllers

    def generate_report(self, target_entity_id: str) -> None:
        """Print a complete UBO analysis report for the target entity."""
        target = self.graph.entities.get(target_entity_id)
        print("=" * 70)
        print(f"  UBO ANALYSIS REPORT")
        print(f"  Target Entity: {target.name} ({target_entity_id})")
        print(f"  Jurisdiction: {target.jurisdiction}")
        print(f"  UBO Threshold: {self.threshold}%")
        print("=" * 70)

        # Validation
        errors = self.graph.validate()
        if errors:
            print("\n  ⚠ GRAPH VALIDATION ISSUES:")
            for err in errors:
                print(f"    - {err}")

        # UBOs
        ubos = self.identify_ubos(target_entity_id)
        print(f"\n  IDENTIFIED UBOs ({len(ubos)} above {self.threshold}% threshold):\n")
        for i, ubo in enumerate(ubos, 1):
            print(f"  [{i}] {ubo['name']} — {ubo['effective_ownership_pct']:.2f}%")
            print(f"      Jurisdiction: {ubo['jurisdiction']}")
            print(f"      DOB: {ubo['dob'] or 'NOT RECORDED'}")
            print(f"      ID Verified: {'YES' if ubo['id_verified'] else 'NO'}")
            print(f"      Data Quality: {ubo['data_quality_score']}%")
            print(f"      EDD Required: {'YES' if ubo['edd_required'] else 'NO'}")
            if ubo['flags']:
                print(f"      Flags:")
                for flag in ubo['flags']:
                    print(f"        • {flag}")
            print()

        # Opaque controllers
        opaque = self.identify_non_ubo_controllers(target_entity_id)
        if opaque:
            print(f"\n  OPAQUE CONTROLLERS (legal entities with untraceable ownership):\n")
            for oc in opaque:
                print(f"    - {oc['name']} ({oc['entity_id']}): "
                      f"{oc['effective_pct_in_target']:.2f}% ownership")
                print(f"      Jurisdiction: {oc['jurisdiction']}")
                print(f"      Issue: {oc['issue']}")
                print()

        # Overall KYC recommendation
        has_sanctions = any(u['sanctions_match'] for u in ubos)
        has_pep = any(u['is_pep'] for u in ubos)
        has_opaque = len(opaque) > 0
        has_data_quality = any(u['data_quality_score'] < 75 for u in ubos)

        print("\n  OVERALL KYC RECOMMENDATION:")
        if has_sanctions:
            print("  STATUS: DO NOT PROCEED — SANCTIONS MATCH IDENTIFIED")
        elif has_opaque:
            print("  STATUS: HOLD — OPAQUE OWNERSHIP STRUCTURES REQUIRE RESOLUTION")
        elif has_pep:
            print("  STATUS: EDD REQUIRED — SENIOR MANAGEMENT APPROVAL NEEDED")
        elif has_data_quality:
            print("  STATUS: RETURN FOR SUPPLEMENTARY DOCUMENTATION")
        else:
            print("  STATUS: KYC STRUCTURALLY COMPLETE — PROCEED WITH STANDARD REVIEW")
        print("=" * 70)


# ─────────────────────────────────────────────
# 4. Reference Data
# ─────────────────────────────────────────────

FATF_HIGH_RISK_JURISDICTIONS = {
    "MMR",  # Myanmar
    "IRN",  # Iran
    "PRK",  # North Korea
    "SYR",  # Syria
    "YEM",  # Yemen (illustration only — check current FATF lists)
}


# ─────────────────────────────────────────────
# 5. Worked Example: Complex Group Structure
# ─────────────────────────────────────────────

def build_example_ownership_structure() -> tuple[OwnershipGraph, str]:
    """
    Build the ownership structure from the M02 documentation example:

    Natural Person A (50%) ─┐
    Natural Person B (50%) ─┴─> HoldCo A → MidCo Ltd (75%) → OpCo UK Ltd
                                                Third Party (25%) → OpCo UK Ltd
    """
    graph = OwnershipGraph()

    # Define entities
    entities = [
        Entity("NP_A",    "Jonathan Ashworth",  "NATURAL_PERSON", "GBR",
               is_pep=False, id_verified=True,
               dob="1975-03-12", nationality="GBR"),

        Entity("NP_B",    "Marina Volkov",       "NATURAL_PERSON", "RUS",
               is_pep=True, pep_detail="Former Deputy Finance Minister, Russia",
               id_verified=True,
               dob="1968-09-22", nationality="RUS"),

        Entity("NP_C",    "Third Party Investor", "NATURAL_PERSON", "USA",
               is_pep=False, id_verified=False,    # Note: ID not yet verified
               dob="1982-11-05", nationality="USA"),

        Entity("HOLDCO_A",  "HoldCo Alpha Ltd",    "COMPANY",        "CYM"),  # Cayman Islands
        Entity("MIDCO",     "MidCo Investments Ltd","COMPANY",        "JEY"),  # Jersey
        Entity("OPCO",      "OpCo UK Ltd",          "COMPANY",        "GBR"),  # Target borrower
    ]
    for entity in entities:
        graph.add_entity(entity)

    # Define ownership structure
    edges = [
        OwnershipEdge("NP_A",     "HOLDCO_A",  50.0, "SHARES"),
        OwnershipEdge("NP_B",     "HOLDCO_A",  50.0, "SHARES"),
        OwnershipEdge("HOLDCO_A", "MIDCO",    100.0, "SHARES"),
        OwnershipEdge("MIDCO",    "OPCO",      75.0, "SHARES"),
        OwnershipEdge("NP_C",     "OPCO",      25.0, "SHARES"),
    ]
    for edge in edges:
        graph.add_ownership(edge)

    return graph, "OPCO"


if __name__ == "__main__":

    # Build example structure
    graph, target_id = build_example_ownership_structure()

    # Run UBO analysis
    analyser = UBOAnalyser(graph, ubo_threshold_pct=25.0)
    analyser.generate_report(target_id)

    # Show effective ownership table
    print("\n  FULL EFFECTIVE OWNERSHIP TABLE (all owners, all %s):\n")
    all_owners = analyser.get_all_ancestors(target_id)
    rows = []
    for eid, pct in sorted(all_owners.items(), key=lambda x: x[1], reverse=True):
        entity = graph.entities.get(eid)
        if entity:
            rows.append({
                "Entity": entity.name,
                "Type": entity.entity_type,
                "Jurisdiction": entity.jurisdiction,
                "Effective % in OpCo": round(pct, 2),
                "Qualifies as UBO?": "YES" if entity.is_natural_person() and pct >= 25.0 else "NO",
            })
    df = pd.DataFrame(rows)
    print(df.to_string(index=False))
```

---

## 11. Interview Questions

### Technical Questions

**Q1: "What is a UBO and how do you determine who qualifies?"**

*Strong answer:* A UBO is the natural person who ultimately owns or controls a legal entity — the human being for whose benefit the entity ultimately operates. The standard qualification threshold is 25% ownership of shares, voting rights, or other control rights. To determine UBOs in a complex structure, you must trace ownership through every intermediate layer: if Person A owns 60% of Holding Company B, and Holding Company B owns 50% of OpCo, then Person A's effective ownership in OpCo is 30% — above the threshold. If the ownership chain passes through a trust, you identify the beneficial owners of the trust, not the trustees (who hold legal title). The process continues until you reach natural persons at every ownership layer above 25%.

**Q2: "What triggers Enhanced Due Diligence?"**

*Strong answer:* EDD is triggered by one or more elevated risk factors:
(1) **PEP status** — any UBO, director, or controlling person who holds or has held a prominent public function, or is a close associate or family member of such a person;
(2) **High-risk jurisdiction** — the customer is incorporated, resident, or has significant operations in a jurisdiction on the FATF blacklist or greylist;
(3) **Complex or opaque ownership structure** — multiple layers of holding companies, offshore entities, trusts with concealed beneficiaries, nominee arrangements;
(4) **Specific business activity** — money service businesses, crypto-asset firms, arms dealers, cash-intensive businesses;
(5) **Adverse news** — regulatory sanctions, criminal investigations, media reports of financial crime.
EDD involves more detailed source of wealth and funds documentation, more frequent reviews, and senior management approval.

**Q3: "Why does KYC matter for credit risk, not just compliance?"**

*Strong answer:* Three reasons: First, you cannot assess creditworthiness without understanding who you're dealing with. If UBO analysis reveals that the "borrower" is controlled by individuals with undisclosed financial problems or criminal records, the credit assessment of the legal entity alone is meaningless. Second, the group structure revealed by KYC changes the entire credit analysis — a subsidiary's standalone accounts may look fine, but KYC and group structure analysis might reveal that it cross-guarantees a heavily indebted parent, making the subsidiary effectively un-creditworthy. Third, incomplete KYC creates legal and financial risk: if the borrower turns out to be subject to sanctions, the loan becomes unenforceable and potentially criminal. The bank cannot recover money from a sanctioned entity, turning a credit exposure into an outright loss.

**Q4: "What is the difference between KYC and AML?"**

*Strong answer:* KYC (Know Your Customer) is the process of identifying, verifying, and understanding customers. It is one component of an AML (Anti-Money Laundering) programme. AML encompasses the full range of controls banks use to prevent, detect, and report money laundering: transaction monitoring, sanctions screening, suspicious activity reporting, staff training, and governance. KYC provides the static customer intelligence (who is this person? what do they do? what is their expected transaction behaviour?). Transaction monitoring uses that baseline to detect unusual activity (dynamic, ongoing). Suspicious Activity Reports (SARs) are filed with the NCA when monitoring or KYC reveals activities that give rise to knowledge or suspicion of money laundering. For credit: the credit analyst needs to understand the AML context because a high-AML-risk customer affects the bank's ability to maintain the relationship — if the customer triggers constant AML alerts, the reputational and regulatory risk may outweigh the credit returns.

**Q5: "A customer presents audited accounts with a clean opinion, but the accounts are 16 months old. How do you handle this?"**

*Strong answer:* Accounts that are 16 months old leave a significant information gap — a business can change materially in 16 months (new contracts won or lost, new borrowings, market downturns). The approach: First, request the most recent management accounts (at minimum the last 3–6 months), which update the picture without requiring a full audit. Second, request a management commentary explaining performance since the last audit date. Third, cross-check what is available publicly — Companies House filings, credit bureau data, news — for any indication of material deterioration. Fourth, if the customer says accounts are delayed because of an auditor change, late filing, or a complex transaction, verify this explanation. Late audited accounts are a yellow flag — companies in financial distress often delay their audits because the auditor is raising going concern or qualification issues. The credit analyst should note this as a risk factor, include the information gap in the credit risk assessment, and may require more frequent financial reporting as a covenant until current audited accounts are available.

### Behavioural Questions

**Q6: "Tell me about a time you identified a gap in a process that created risk for the business."**

*(Prepare an example involving data quality, documentation gaps, or process failures.)*

**Q7: "How would you explain to a Relationship Manager why their client's KYC is blocking a deal?"**

*What to cover:* Empathy with the commercial pressure; clear explanation of the specific gap and the legal obligation creating it; practical steps to resolve it as quickly as possible; escalation path if a pragmatic solution exists; the point that the KYC is protecting the bank, the RM, and ultimately the client from being involved in financial crime — even inadvertently.

---

## 12. Common Mistakes

### Mistake 1: Accepting the Legal Entity Accounts Without Understanding the Group

This is the most serious credit risk mistake related to KYC. An analyst reviews strong standalone accounts for OpCo Ltd, a profitable subsidiary. KYC should have included a group structure chart and group-level consolidated accounts, but these were not obtained. The analyst does not know that OpCo Ltd is 100%-owned by a holding company carrying £300m of external debt, cross-guaranteed by OpCo. At default of the holding company, OpCo's assets are swept into the group insolvency and the bank's security is subordinate to the holding company's lenders.

**Prevention:** Always obtain and review group structure chart and group consolidated accounts. Ask: "Who owns this entity? Who else in the group has debt? Are there inter-company guarantees?" Never rely solely on subsidiary standalone accounts for entities that are part of a larger group.

### Mistake 2: Missing Intermediate Holding Companies in the UBO Chain

An analyst traces ownership from the borrower to a Hong Kong holding company that owns 80%, and records the Hong Kong company as the "owner" — not tracing further to find that the Hong Kong company is owned by individuals on a US sanctions list.

**Prevention:** UBO tracing must continue until natural persons are reached at every layer. The fact that an intermediate holding company is in a reputable jurisdiction (Hong Kong, Luxembourg, the Netherlands) does not mean the individuals behind it are unproblematic. Every layer must be traced.

### Mistake 3: Treating PEP Status as a Compliance Issue, Not a Credit Issue

When a PEP is identified, some analysts treat it as "compliance's problem" and continue the credit assessment in parallel. The commercial pressure to onboard a large client can create incentives to minimise the PEP issue. In reality:

- The bank cannot onboard or lend to the customer until EDD is complete and senior management has approved
- EDD may take weeks or months, creating pipeline slippage
- If EDD reveals that the PEP's source of wealth is politically compromised (corruption proceeds), the bank must decline the relationship — no credit analysis is relevant
- PEPs who use bank relationships for financial crime can create regulatory, legal, and reputational catastrophe for the bank

**Prevention:** PEP identification immediately freezes the onboarding process. Credit analysis should not proceed until PEP EDD is complete. This is not a procedural nicety — it is a legal requirement under MLR 2017.

### Mistake 4: Accepting Unaudited Management Accounts as Primary Financials

When audited accounts are unavailable or very old, the temptation is to use management accounts as the basis for credit approval. Management accounts are prepared by the borrower's own finance team, without independent verification. Companies in financial distress have been known to present management accounts that selectively:
- Include one-off favourable items as revenue
- Exclude one-off charges
- Inflate asset values or understate liabilities
- Present optimistic revenue accruals

Management accounts should always be supplementary to audited accounts, not a replacement. If only management accounts are available, the credit risk rating must reflect this uncertainty (governance risk premium), and covenants requiring timely delivery of audited accounts should be included in the facility agreement.

### Mistake 5: Confusing Registered Address with Place of Business

Companies can be registered in one jurisdiction (for tax or legal reasons) but operate in another. A company registered in Luxembourg but with all operations, staff, and customers in Ukraine faces the legal, regulatory, and credit risks of Ukraine, not Luxembourg. Credit analysis must assess the jurisdiction of actual economic operations, not the jurisdiction of incorporation.

This matters particularly for:
- Security law (which law governs enforcement of security over assets?)
- Insolvency law (which insolvency regime applies at default?)
- Sanctions risk (a Luxembourg-registered company owned by sanctioned Russian nationals is still subject to sanctions)

---

## 13. Case Studies

### Case Study 1: The Beneficial Owner Hidden in a Trust Structure

**Scenario:** A private banking client introduces a corporate banking prospect: a UK limited company operating in the waste management sector. The company presents audited accounts showing £40m revenue and £6m EBITDA, requesting a £15m facility to acquire a competitor. KYC documentation lists a Jersey trust as the 100% shareholder.

**Initial Red Flags:**
- 100% owned by a trust in Jersey (offshore financial centre)
- Trust structure — who are the beneficiaries?
- Why is a waste management business owned through a Jersey trust?

**KYC Investigation:**
The trust deed (obtained after significant requests through the RM) reveals:
- **Trustees:** A Jersey-incorporated professional trustee company
- **Settlor:** A named individual (let's call him Mr. X)
- **Beneficiaries:** Mr. X and his family members

PSC register confirms no individual has > 25% shares (because the trust holds them). However, under MLR 2017, the beneficial owners of a trust are:
- The settlor (Mr. X)
- The beneficiaries (Mr. X and family)
- Potentially the trustees, if they exercise discretion

Further KYC on Mr. X reveals:
- He is listed as a former Chairman of a state-owned enterprise in a high-risk jurisdiction
- He qualifies as a Politically Exposed Person (International PEP — former senior official of a state-owned enterprise)
- Adverse news search returns references to investigations by that jurisdiction's anti-corruption authority (though no formal charges)

**Outcome:**
The case is escalated to EDD. The bank's Financial Crime Compliance team reviews source of wealth documentation — Mr. X's declared source of wealth is business income from the same jurisdiction, but the amounts are inconsistent with the declared wealth at the time of trust creation.

After six weeks of EDD, the senior KYC committee declines to onboard the customer. The waste management business, while legitimately operating, cannot be separated from its opaque beneficial owner structure and the concerns about the UBO's source of wealth.

**Credit lesson:** The credit analyst who reviewed the financial accounts saw a profitable business with reasonable leverage and a plausible acquisition purpose. But the business was unlendable — not because of credit risk, but because KYC failures would have exposed the bank to AML liability. Credit analysis cannot be separated from KYC.

---

### Case Study 2: The Subsidiary Trap

**Scenario:** A manufacturing company — let's call it ManufactureCo UK Ltd — approaches a bank for a £30m revolving credit facility for working capital. ManufactureCo UK Ltd's own audited accounts show:
- Revenue: £85m
- EBITDA: £12m
- Total Debt: £8m
- Net Debt / EBITDA: 0.67× (very low leverage — appears conservative)

KYC is initiated. ManufactureCo UK Ltd is 100% owned by ManufactureCo Holdings GmbH (Germany), which is 100% owned by ManufactureCo International SA (Luxembourg), which is 55% owned by a UK-listed private equity fund and 45% owned by a German family office.

**Group Structure Analysis (enabled by KYC):**
The bank requests consolidated group accounts. These reveal:
- Group Revenue: £420m (ManufactureCo UK Ltd is 20% of the group)
- Group EBITDA: £38m
- **Group External Debt: £280m** (mostly at holding company level)
- **Group Net Debt / EBITDA: 7.4×** (highly leveraged at group level)
- ManufactureCo UK Ltd has provided an **inter-company guarantee** to ManufactureCo International SA for up to £250m — this guarantee is not visible in the subsidiary standalone accounts

**Credit Reassessment:**
The standalone subsidiary credit analysis was entirely misleading. The real exposure is:
- ManufactureCo UK Ltd's £30m facility
- Plus the £250m guarantee exposure to the holding company

At group insolvency, the guarantee crystallises and ManufactureCo UK Ltd's assets are swept into the group insolvency process. The bank's £30m loan ranks alongside £280m of group external lenders — recovery would depend on the group's total asset value.

**Credit decision:** Approve the £30m facility only if: (a) the guarantee to the holding company is waived or capped below £30m, (b) the facility is secured by a first-charge floating debenture over ManufactureCo UK Ltd's assets, and (c) financial covenants test the group (not just subsidiary) leverage. This is a completely different credit structure than the standalone entity analysis would have suggested.

**Lesson:** KYC that reveals the group structure is not a compliance formality — it fundamentally changes the credit risk assessment. Never approve a loan to a subsidiary of a leveraged group without reviewing group-level financials and inter-company obligations.

---

## 14. Iterative Reinforcement

### Self-Test Questions

1. A company has three shareholders: Individual A (30%), Company B (50%), and Individual C (20%). Company B is 60% owned by Individual D and 40% owned by Company E (whose UBOs are unknown). What are the UBOs of your borrower? Show your calculations.

2. You receive a KYC pack for a corporate client. The pack includes audited accounts for the year ended December 2022 (signed off March 2023). Today's date is August 2026. What documents would you request to fill the 3+ year information gap?

3. A new prospect is a UK company owned 100% by a British Virgin Islands (BVI) holding company. The RM says "the BVI is just a tax structure, the real owner is a UK family." What KYC steps do you take and why can't you take the RM's word for it?

4. What is the difference between Standard Due Diligence (SDD) and Enhanced Due Diligence (EDD) in terms of: (a) documents required, (b) approval authority, (c) monitoring frequency?

5. Write three SQL conditions you would use to flag customers requiring urgent KYC action in a monthly remediation report.

### Spaced Repetition Schedule

- **Day 1:** Read Sections 1–5. Without referring to your notes, draw the UBO tracing diagram from Case Study 1 (the trust structure) and calculate effective ownership percentages.
- **Day 3:** Run the Python UBO graph traversal code. Add a new entity — a Liechtenstein foundation — to the ownership chain, and trace the UBOs through it. What additional KYC steps does this structure require?
- **Day 7:** Build the KYC Checklist spreadsheet in Excel from scratch using only the field descriptions in Section 8. Test the escalation logic with a PEP scenario.
- **Day 14:** Execute the SQL queries against a sample dataset. Verify that the KYC document expiry query correctly flags a customer whose passport expires in 30 days.
- **Day 30:** Answer all five interview questions in Section 11 without notes. Particular focus on Q3 ("Why does KYC matter for credit risk?") — this question is asked in almost every corporate credit interview because it tests whether you understand the integration between compliance and credit functions.

### Connections to Other Modules

- **M01 (Commercial Lending Overview):** KYC is a prerequisite to any lending relationship. The group structure analysis enabled by KYC directly feeds the credit analysis in M01.
- **M03 (Financial Statement Analysis):** KYC determines which financial statements (entity vs group, audited vs management) are available and credible for analysis.
- **M04 (Credit Risk Rating):** The borrower's transparency, governance quality, and ownership structure are explicit factors in most internal credit risk rating models.
- **M08 (Credit Monitoring):** KYC refresh requirements create an ongoing monitoring obligation parallel to financial covenant monitoring.

---

## 15. Source Material

### Primary Regulatory Sources

**UK and EU:**
- **Money Laundering, Terrorist Financing and Transfer of Funds (Information on the Payer) Regulations 2017 (SI 2017/692):** Primary UK AML legislation; available at legislation.gov.uk
- **Economic Crime and Corporate Transparency Act 2023:** Reforms to Companies House powers, UBO verification, and corporate transparency; significant amendments to MLR 2017
- **FCA Financial Crime Guide (FCG):** The FCA's consolidated guidance on financial crime, AML systems and controls; available at handbook.fca.org.uk
- **EU 4th AML Directive (2015/849/EU):** Risk-based approach, UBO registers
- **EU 5th AML Directive (2018/843/EU):** Public access to UBO registers, crypto-asset extension
- **EU 6th AML Directive (2021/1332/EU):** Harmonised criminal offences, corporate liability

**FATF:**
- **FATF 40 Recommendations (updated 2012, amended 2022):** Available at fatf-gafi.org — the global standard that all major jurisdictions have implemented
- **FATF Guidance on Beneficial Ownership of Legal Persons (March 2023):** Detailed guidance on UBO identification and verification
- **FATF High-Risk Jurisdictions and Jurisdictions Under Increased Monitoring:** Updated quarterly at fatf-gafi.org — essential reference for jurisdiction risk assessment

**US:**
- **Bank Secrecy Act (1970) and FinCEN implementing rules:** 31 CFR Chapter X
- **FinCEN Customer Due Diligence Rule (2016):** 31 CFR § 1010.230; Beneficial Ownership requirements
- **OFAC Sanctions Lists and Guidance:** Available at home.treasury.gov/policy-issues/office-of-foreign-assets-control-sanctions-programs-and-information

### Industry Standards and Guidance

- **WOLFSBERG GROUP:** *Wolfsberg Anti-Money Laundering Principles for Private Banking* (2012); *Wolfsberg Group Guidance on Risk Based Approach for Managing Money Laundering Risks* — the Wolfsberg Group is a consortium of 13 global banks; their guidance represents current market best practice and is widely referenced by regulators
- **JMLSG (Joint Money Laundering Steering Group):** *Prevention of Money Laundering / Combating Terrorist Financing — Guidance for the UK Financial Sector* — the principal industry guidance for UK banks; updated periodically; available at jmlsg.org.uk. **Section 5 covers corporate customers and UBO identification in detail and should be read in full.**
- **BBA/UK Finance:** Industry guidance papers on PEP identification and treatment

### Textbooks and Reference Material

- Lester, R. (2018). *Correspondent Banking: A Handbook for Financial Crime Compliance.* This practical guide covers KYC, correspondent banking due diligence, and sanctions compliance in a format directly useful to practitioners.
- Stokes, P. (2012). *The Handbook of Anti-Money Laundering.* Wiley. Comprehensive reference on AML frameworks, KYC processes, and reporting obligations.
- Financial Action Task Force. (2014). *Guidance on Transparency and Beneficial Ownership.* FATF, Paris. Essential reading for UBO identification in complex structures.
- Deloitte / PwC / KPMG annual AML and financial crime enforcement reports: Good sources for current regulatory trends and enforcement actions.

### Data Sources for Screening and Research

- **Companies House (UK):** companieshouse.gov.uk — free access to incorporation documents, accounts, PSC registers, director histories
- **OpenCorporates:** opencorporates.com — global company registry aggregator covering 140+ jurisdictions
- **Dow Jones Risk and Compliance / Refinitiv World-Check:** Commercial PEP and sanctions screening databases (bank procurement)
- **Acuris (formerly Mergermarket):** Adverse news screening
- **OFAC SDN List:** home.treasury.gov — searchable online
- **HM Treasury UK Financial Sanctions List:** gov.uk/government/financial-sanctions

### Enforcement Actions (Learning from Failures)

Understanding real failures illuminates why the requirements exist:

- **HSBC Holdings PLC (2012):** US$1.9bn deferred prosecution agreement with US DOJ and FINCEN — failure to maintain effective AML controls on Mexican and other cartel-linked transactions. *Senate Permanent Subcommittee on Investigations Report (July 2012)* is essential reading.
- **Standard Chartered PLC (2019):** US$1.1bn fine — sanctions violations involving Iran, Syria, and Sudan. Illustrates how even a sophisticated bank can have material control failures.
- **Deutsche Bank AG (2020):** US$150m fine (New York DFS) for correspondent banking control failures linked to Jeffrey Epstein's accounts — KYC failures on an existing client relationship.
- **Danske Bank Estonia Branch (2018–2020):** €200bn in suspicious transactions through the Estonia branch — the largest known money laundering case in European banking history. Illustrates catastrophic KYC and transaction monitoring failures in a branch with inadequate oversight.

These enforcement actions are publicly available and provide more practical insight into what goes wrong — and why regulators take KYC so seriously — than any textbook.

---

*End of M02 — KYC and Onboarding*
*Next Module: M03 — Financial Statement Analysis for Credit*
