# M01 — Completeness | Example 2: Blank Strings and Placeholder Values

## The Question
> After fixing the NULLs from Example 1, your QA lead points out something worse:
> **"Some rows have values, but those values are meaningless — they're placeholders like
> 'N/A', 'Unknown', or empty strings."**
> Write a query that detects blank strings AND common placeholder patterns across
> the Customers table, and returns a cleaned flag column explaining what is wrong.

---

## Table Reference
**Customers** — `schemas/01_Customers.csv`

Row 16 has all fields set to "N/A".
Row 19 has Phone = "99999999999" — clearly a fake placeholder.
Row 7 has Email = "tom.brooks" — no domain, likely a partial placeholder.

---

## Solution Query

```sql
-- Detect blank strings AND common placeholder values
SELECT
    CustomerID,
    FirstName,
    LastName,
    Email,
    Phone,
    CASE
        WHEN Email IS NULL                       THEN 'NULL value'
        WHEN LTRIM(RTRIM(Email)) = ''            THEN 'Blank string'
        WHEN UPPER(Email) IN ('N/A','NA','NONE','UNKNOWN','NULL','TBC','TBD')
                                                 THEN 'Placeholder text'
        WHEN Email NOT LIKE '%@%.%'              THEN 'Invalid format (no @ or domain)'
        ELSE 'OK'
    END AS Email_Issue,
    CASE
        WHEN Phone IS NULL                       THEN 'NULL value'
        WHEN LTRIM(RTRIM(Phone)) = ''            THEN 'Blank string'
        WHEN UPPER(Phone) IN ('N/A','NA','NONE','UNKNOWN','NULL','TBC','TBD')
                                                 THEN 'Placeholder text'
        WHEN Phone LIKE '9999%'                  THEN 'Suspicious repeated digits'
        ELSE 'OK'
    END AS Phone_Issue
FROM Customers
WHERE
    LTRIM(RTRIM(ISNULL(Email,''))) = ''
    OR UPPER(ISNULL(Email,'')) IN ('N/A','NA','NONE','UNKNOWN','NULL')
    OR Email NOT LIKE '%@%.%'
    OR LTRIM(RTRIM(ISNULL(Phone,''))) = ''
    OR UPPER(ISNULL(Phone,'')) IN ('N/A','NA','NONE','UNKNOWN','NULL')
    OR Phone LIKE '9999%';
```

---

## Expected Output

| CustomerID | FirstName | Email | Email_Issue | Phone_Issue |
|---|---|---|---|---|
| 7 | Tom | tom.brooks | Invalid format (no @ or domain) | OK |
| 16 | N/A | N/A | Placeholder text | Placeholder text |
| 19 | Ahmed | ahmed.khan@email.com | OK | Suspicious repeated digits |

---

## Explanation

`LTRIM(RTRIM(value))` strips leading and trailing whitespace before checking for an
empty string. Without this, a value like `"   "` (spaces only) would pass an `= ''` check
on some databases but not others.

`ISNULL(column, '')` converts a NULL to an empty string before calling LTRIM/RTRIM,
which lets you chain both checks without a separate `IS NULL` branch.

The `IN ('N/A','NA', ...)` list should be agreed with the business — different source
systems use different placeholder conventions. Build a shared reference list and reuse it.

---

## Interview Angle
*"What is the difference between a NULL and a blank string in SQL?"*
A NULL means the value is unknown or absent. A blank string means the field was
populated with nothing — it EXISTS as a value, just an empty one. `IS NULL` will not
catch blank strings; `= ''` will not catch NULLs. You must check for both.

---

## Severity: **High**
Placeholder data silently passes NULL checks and corrupts downstream aggregations,
email sends, and customer lookups.
