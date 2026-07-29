# M02 — Uniqueness | Example 1: Duplicate Primary Key / Exact Row Duplicates

## The Question
> During a data load audit, your team suspects that the `Customers` table has received
> duplicate records from two source systems that were merged without deduplication.
> **"Find all duplicate customer records — first by exact key match, then by full-row
> match — and return them ranked so we can identify which one to keep."**

---

## Table Reference
**Customers** — `schemas/01_Customers.csv`

CustomerID 11 (James Carter) is an exact copy of CustomerID 1 — same name, email, phone, DOB.

---

## Solution Query

```sql
-- Step 1: Find duplicate emails (the natural business key)
SELECT
    Email,
    COUNT(*) AS Occurrences,
    MIN(CustomerID) AS FirstID,
    MAX(CustomerID) AS LastID
FROM Customers
WHERE Email IS NOT NULL
GROUP BY Email
HAVING COUNT(*) > 1;

-- Step 2: Show the full duplicate rows side-by-side using ROW_NUMBER
WITH Ranked AS (
    SELECT *,
        ROW_NUMBER() OVER (
            PARTITION BY Email
            ORDER BY CustomerID ASC
        ) AS RowRank
    FROM Customers
    WHERE Email IS NOT NULL
)
SELECT
    CustomerID,
    FirstName,
    LastName,
    Email,
    CreatedDate,
    RowRank,
    CASE WHEN RowRank = 1 THEN 'KEEP' ELSE 'REVIEW/DELETE' END AS Action
FROM Ranked
WHERE Email IN (
    SELECT Email FROM Customers
    WHERE Email IS NOT NULL
    GROUP BY Email HAVING COUNT(*) > 1
)
ORDER BY Email, RowRank;

-- Step 3: Count exact full-row duplicates (every column matches)
SELECT
    FirstName, LastName, Email, Phone, DOB, Country,
    COUNT(*) AS DuplicateCount
FROM Customers
GROUP BY FirstName, LastName, Email, Phone, DOB, Country
HAVING COUNT(*) > 1;
```

---

## Expected Output

**Step 1:**
| Email | Occurrences | FirstID | LastID |
|---|---|---|---|
| james.carter@email.com | 2 | 1 | 11 |

**Step 2:**
| CustomerID | FullName | Email | RowRank | Action |
|---|---|---|---|---|
| 1 | James Carter | james.carter@email.com | 1 | KEEP |
| 11 | James Carter | james.carter@email.com | 2 | REVIEW/DELETE |

---

## Explanation

`GROUP BY ... HAVING COUNT(*) > 1` is the classic duplicate detection pattern.
It groups by the natural key (Email here) and returns only groups where more than
one row exists.

`ROW_NUMBER() OVER (PARTITION BY Email ORDER BY CustomerID)` numbers each duplicate
group starting from 1. The first row (RowRank = 1) is typically designated the
"master" record. This is the standard pattern before a deduplication DELETE or MERGE.

The "full-row duplicate" check in Step 3 catches cases where even the CustomerID differs
but every other column is identical — common when two ETL jobs load the same source file.

---

## Interview Angle
*"How would you remove duplicates while keeping one row?"*
```sql
DELETE FROM Customers
WHERE CustomerID NOT IN (
    SELECT MIN(CustomerID)
    FROM Customers
    GROUP BY Email
);
```
Always SELECT before DELETE to verify what will be removed.

---

## Severity: **Critical**
Duplicate customer records cause double-billing, inflated marketing lists, and broken
one-to-many relationships with Orders.
