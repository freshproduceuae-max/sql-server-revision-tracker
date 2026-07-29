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

### The classic duplicate pattern: GROUP BY with HAVING
`GROUP BY ... HAVING COUNT(*) > 1` groups rows by the natural business key (Email here)
and filters to only the groups where more than one row shares that key. This is the
fastest and most readable duplicate detection pattern in SQL — you will use it in
almost every data quality engagement.

### Ranking duplicates to decide which one to keep
`ROW_NUMBER() OVER (PARTITION BY Email ORDER BY CustomerID)` assigns a sequential
number within each group of duplicates, restarting at 1 for each unique Email.
The row ranked 1 (the lowest CustomerID, meaning earliest created) becomes the
designated "master" record. All rows with RowRank > 1 are candidates for deletion
or archiving. This numbered ranking is the standard preparation step before running
a deduplication DELETE or MERGE operation.

### Full-row duplicate vs key-only duplicate
Step 3 checks for rows where every business column is identical, even if the
surrogate key (CustomerID) is different. This catches re-loaded records where the
ETL assigned a new ID but the actual content was already in the table — a common
bug when source files are re-processed without a deduplication guard.

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
