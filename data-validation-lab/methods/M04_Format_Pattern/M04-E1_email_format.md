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

### How LIKE pattern matching works in T-SQL
SQL `LIKE` patterns use `%` to mean "any sequence of zero or more characters" and
`_` to mean "exactly one character." So `'%@%.%'` means: something, then @, then
something, then a dot, then something — the minimum structure of a valid email address.
These patterns are not as powerful as regular expressions but cover most common
format rules without needing CLR extensions.

### Why CASE WHEN order matters
The CASE WHEN chain evaluates top-down and stops at the first matching condition.
This means you must order from broadest to most specific: check for NULL first
(because any comparison involving NULL returns UNKNOWN, not TRUE, so putting NULL
last would cause it to fall through every condition silently), then blanks,
then structural rules. Getting the order wrong causes conditions to never fire.

### Counting @ symbols without a loop
The expression `LEN(Email) - LEN(REPLACE(Email, '@', ''))` counts the number of @
symbols in a string. REPLACE removes every @, then the length difference tells you
how many were removed. If the difference is greater than 1, there are multiple @
signs — an immediate format failure.

### Casing normalisation — valid but inconsistent
An email like `ANJALI@EMAIL.COM` is technically RFC-valid, but storing mixed-case
emails causes lookup mismatches in systems that compare case-sensitively. The best
practice is to store all emails as `LOWER(Email)` at the point of data entry or
during the ETL load, before they reach the main table.

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
