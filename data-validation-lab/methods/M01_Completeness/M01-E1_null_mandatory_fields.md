# M01 — Completeness | Example 1: NULL in Mandatory Fields

## The Question
> You have just received a fresh load of customer data into the `Customers` table.
> Before any downstream process can use it, your manager asks:
> **"Which records are missing critical contact information?"**
> Write a query that finds every row where Email, Phone, or DOB is NULL,
> and produce a summary count by field so the data team can prioritise the fix.

---

## Table Reference
**Customers** — `schemas/01_Customers.csv`

Key columns for this check:

| Column | Business Rule |
|---|---|
| Email | Mandatory — needed for all marketing and account comms |
| Phone | Optional but flagged if missing |
| DOB | Mandatory — needed for age verification |

---

## Solution Query

```sql
-- Part A: Row-level detail — who has a missing field?
SELECT
    CustomerID,
    FirstName + ' ' + LastName        AS CustomerName,
    CASE WHEN Email IS NULL THEN 'MISSING' ELSE 'OK' END AS Email_Status,
    CASE WHEN Phone IS NULL THEN 'MISSING' ELSE 'OK' END AS Phone_Status,
    CASE WHEN DOB   IS NULL THEN 'MISSING' ELSE 'OK' END AS DOB_Status,
    CreatedDate
FROM Customers
WHERE Email IS NULL
   OR Phone IS NULL
   OR DOB   IS NULL
ORDER BY CreatedDate;

-- Part B: Summary count by field — how bad is the problem?
SELECT
    'Email' AS FieldName,
    COUNT(*) AS NullCount,
    CAST(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM Customers) AS DECIMAL(5,2)) AS NullPct
FROM Customers WHERE Email IS NULL
UNION ALL
SELECT 'Phone', COUNT(*),
    CAST(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM Customers) AS DECIMAL(5,2))
FROM Customers WHERE Phone IS NULL
UNION ALL
SELECT 'DOB', COUNT(*),
    CAST(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM Customers) AS DECIMAL(5,2))
FROM Customers WHERE DOB IS NULL;
```

---

## Expected Output

**Part A (row detail):**

| CustomerID | CustomerName | Email_Status | Phone_Status | DOB_Status |
|---|---|---|---|---|
| 3 | Mohammed Al-Rashid | MISSING | OK | OK |
| 4 | Sara O'Brien | OK | MISSING | OK |
| 5 | Chen Wei | OK | OK | MISSING |
| 12 | Ravi Kumar | MISSING | OK | OK |
| 14 | Carlos Ruiz | OK | OK | MISSING |

**Part B (field summary):**

| FieldName | NullCount | NullPct |
|---|---|---|
| Email | 2 | 10.00% |
| Phone | 2 | 10.00% |
| DOB | 2 | 10.00% |

---

## Explanation

### Why `IS NULL` and not `= NULL`
`IS NULL` is the correct T-SQL check for a missing value. You cannot use `= NULL` because
NULL is not equal to anything — not even itself. Any comparison involving NULL evaluates
to UNKNOWN, not TRUE or FALSE, so `WHERE Email = NULL` will never return rows.

### Reading the field-level summary with UNION ALL
The `UNION ALL` pattern in Part B stacks three separate count queries into one result set.
This produces a field-level completeness report in a single query without repeating
a full table scan per field. Each SELECT block counts NULLs for one column; UNION ALL
appends the rows without removing duplicates (using UNION instead would add overhead and
could merge identical counts incorrectly).

### Forcing decimal in the percentage
The percentage calculation uses `COUNT(*) * 100.0` (note the `.0`) to force decimal
division. Without it, SQL Server performs integer division and rounds everything to 0%
— so 2 NULLs out of 20 rows would show as 0% instead of 10%.

---

## Interview Angle
*"How do you measure completeness in a data load?"*
Answer: you check for NULLs in mandatory fields. You should also check for blank strings
(see M01-E2) because systems sometimes write an empty string instead of a true NULL.

---

## Severity: **Critical**
Missing mandatory fields block downstream processes — invoicing, communications, age-gating.
