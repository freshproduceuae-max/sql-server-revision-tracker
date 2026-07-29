# M04 — Format & Pattern | Example 1: Email Address Validation

## The Question
> The marketing team is about to send a campaign to the entire Customers table.
> Before the send, compliance asks:
> **"Validate that every email address in our system is properly formatted.
> Give us a breakdown of the types of format issues found, not just a yes/no flag."**

---

## Table Reference
**Customers** — `schemas/01_Customers.csv`

Known issues: Row 7 has "tom.brooks" (no @domain). Row 6 has "ANJALI.SHARMA@EMAIL.COM"
(all caps — valid format but inconsistent casing). Row 16 has "N/A".

---

## Solution Query

```sql
-- Classify every email by its format issue
SELECT
    CustomerID,
    FirstName + ' ' + LastName AS CustomerName,
    Email,
    CASE
        WHEN Email IS NULL
            THEN 'NULL — missing'
        WHEN LTRIM(RTRIM(Email)) = ''
            THEN 'Blank string'
        WHEN UPPER(Email) IN ('N/A','NA','NONE','UNKNOWN')
            THEN 'Placeholder value'
        WHEN Email NOT LIKE '%@%'
            THEN 'No @ symbol'
        WHEN Email LIKE '@%'
            THEN 'Starts with @ — no local part'
        WHEN Email LIKE '%@'
            THEN 'Ends with @ — no domain'
        WHEN Email NOT LIKE '%@%.%'
            THEN 'No dot in domain'
        WHEN Email LIKE '% %'
            THEN 'Contains a space'
        WHEN LEN(Email) - LEN(REPLACE(Email,'@','')) > 1
            THEN 'More than one @ symbol'
        WHEN Email <> LOWER(Email)
            THEN 'Mixed/upper case — normalise before send'
        ELSE 'Valid format'
    END AS EmailFormatStatus
FROM Customers
ORDER BY EmailFormatStatus, CustomerID;

-- Summary count by status
SELECT
    CASE
        WHEN Email IS NULL                          THEN 'NULL'
        WHEN LTRIM(RTRIM(Email)) = ''               THEN 'Blank'
        WHEN UPPER(Email) IN ('N/A','NA','NONE')    THEN 'Placeholder'
        WHEN Email NOT LIKE '%@%.%'                 THEN 'Invalid format'
        WHEN Email <> LOWER(Email)                  THEN 'Casing issue'
        ELSE 'Valid'
    END AS Status,
    COUNT(*) AS RecordCount
FROM Customers
GROUP BY
    CASE
        WHEN Email IS NULL                          THEN 'NULL'
        WHEN LTRIM(RTRIM(Email)) = ''               THEN 'Blank'
        WHEN UPPER(Email) IN ('N/A','NA','NONE')    THEN 'Placeholder'
        WHEN Email NOT LIKE '%@%.%'                 THEN 'Invalid format'
        WHEN Email <> LOWER(Email)                  THEN 'Casing issue'
        ELSE 'Valid'
    END
ORDER BY RecordCount DESC;
```

---

## Expected Output

| CustomerID | CustomerName | Email | EmailFormatStatus |
|---|---|---|---|
| 3 | Mohammed Al-Rashid | NULL | NULL — missing |
| 7 | Tom Brooks | tom.brooks | No dot in domain |
| 16 | N/A N/A | N/A | Placeholder value |
| 6 | Anjali Sharma | ANJALI.SHARMA@EMAIL.COM | Mixed/upper case — normalise before send |
| 12 | Ravi Kumar | NULL | NULL — missing |

---

## Explanation

SQL `LIKE` patterns use `%` as "match any sequence of characters" and `_` as
"match exactly one character." The chain of CASE WHEN conditions works top-down —
the first matching condition wins. Order matters: check for NULL first (because
NULL comparisons always return UNKNOWN, not TRUE or FALSE), then blanks, then
progressively more specific format rules.

**Why the `LEN(Email) - LEN(REPLACE(Email,'@','')) > 1` trick works:**
`REPLACE` removes all @ symbols. If the length after removing @ is less than
the original by more than 1, there were multiple @ signs.

**Casing normalisation:** `LOWER(Email)` before storing is a best practice.
An email `ANJALI@EMAIL.COM` is technically valid but leads to lookup mismatches
when compared case-sensitively.

---

## Interview Angle
*"Can you fully validate an email address in SQL with LIKE?"*
No. LIKE can catch obvious structural failures (missing @, no domain) but cannot
validate that the domain actually exists or that the mailbox accepts mail.
For full validation you need a regex (available in SQL Server via CLR or
CHECK constraint with LIKE) or an external email verification API.

---

## Severity: **High**
Invalid emails cause bounce rates that can get your sending domain blacklisted.
