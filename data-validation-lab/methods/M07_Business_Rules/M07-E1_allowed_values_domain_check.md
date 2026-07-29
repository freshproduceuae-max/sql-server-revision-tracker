# M07 — Business Rules | Example 1: Allowed Values (Domain / Lookup Validation)

## The Question
> The data governance team has defined a list of valid values for categorical fields —
> called a **reference data domain**. Any value outside this approved list is invalid.
> **"Check the Employees table for department names that don't match the approved list,
> and check the Orders table for unrecognised Status values.
> Return the bad values so we can decide whether to map or reject them."**

---

## Table References
**Employees** — `schemas/04_Employees.csv` — Department must be one of: Sales, Technology, HR, Finance, Marketing
**Orders** — `schemas/02_Orders.csv` — Status must be one of: Pending, Processing, Shipped, Delivered, Returned, Cancelled

---

## Solution Query

```sql
-- Method A: Hard-coded allowed list (good for small, stable domains)
SELECT
    EmployeeID,
    FullName,
    Department,
    'Department not in approved list' AS Violation
FROM Employees
WHERE Department NOT IN ('Sales', 'Technology', 'HR', 'Finance', 'Marketing')
   OR Department IS NULL;

-- Method B: Reference table lookup (better for larger or changing domains)
-- (Imagine a table: DomainValues (DomainName, AllowedValue))
-- SELECT e.EmployeeID, e.FullName, e.Department
-- FROM Employees e
-- LEFT JOIN DomainValues d
--     ON d.DomainName = 'Department' AND d.AllowedValue = e.Department
-- WHERE d.AllowedValue IS NULL;

-- Orders: Status domain check with frequency count of bad values
SELECT
    Status,
    COUNT(*) AS Occurrences,
    'Invalid status value' AS Violation
FROM Orders
WHERE Status NOT IN ('Pending','Processing','Shipped','Delivered','Returned','Cancelled')
GROUP BY Status
ORDER BY Occurrences DESC;

-- Combined domain health summary
SELECT 'Employees.Department' AS TableField,
    COUNT(*) AS TotalRows,
    SUM(CASE WHEN Department NOT IN ('Sales','Technology','HR','Finance','Marketing')
             OR Department IS NULL THEN 1 ELSE 0 END) AS InvalidCount,
    CAST(
        SUM(CASE WHEN Department NOT IN ('Sales','Technology','HR','Finance','Marketing')
                  OR Department IS NULL THEN 1 ELSE 0 END) * 100.0 / COUNT(*)
    AS DECIMAL(5,2)) AS InvalidPct
FROM Employees
UNION ALL
SELECT 'Orders.Status',
    COUNT(*),
    SUM(CASE WHEN Status NOT IN ('Pending','Processing','Shipped','Delivered','Returned','Cancelled')
             THEN 1 ELSE 0 END),
    CAST(
        SUM(CASE WHEN Status NOT IN ('Pending','Processing','Shipped','Delivered','Returned','Cancelled')
                 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)
    AS DECIMAL(5,2))
FROM Orders;
```

---

## Expected Output

**Employees — Dept violations:**
(No violations in our sample data — all departments are valid.)

**Domain health summary:**
| TableField | TotalRows | InvalidCount | InvalidPct |
|---|---|---|---|
| Employees.Department | 18 | 0 | 0.00% |
| Orders.Status | 20 | 0 | 0.00% |

---

## Explanation

### Domain validation vs format and range validation
It helps to distinguish three similar-sounding checks. **Format validation** asks:
"is the shape of this value correct?" (does the email have an @ sign?). **Range
validation** asks: "is this number within acceptable bounds?" (is quantity > 0?).
**Domain validation** asks: "does this value appear on the approved list?" (is this
department one of the five we recognise?). All three are needed; none of them replaces
the others.

### The NULL trap inside NOT IN
`NULL NOT IN ('Sales', 'Technology', ...)` does not return TRUE — it evaluates to
UNKNOWN, because SQL cannot confirm that NULL is different from any list member.
This means a row with a NULL department silently passes the NOT IN check without
being flagged. The fix is explicit: always add `OR Department IS NULL` as a separate
condition alongside the NOT IN check.

### Why a reference table beats a hard-coded list
A hard-coded `NOT IN ('Sales', 'Technology', ...)` list must be updated manually in
every script that uses it whenever the business adds or renames a department. A
`DomainValues` reference table externalises the approved list into data. You update
one table row and every validation query that joins to it automatically reflects the
change. This is the production-grade approach — it also allows non-technical users
to maintain the reference data without touching SQL code.

---

## Interview Angle
*"How would you design a reusable domain validation system in SQL?"*
Create a `DomainValues` reference table with `(DomainName, AllowedValue)`.
Validate with a LEFT JOIN: rows where `AllowedValue IS NULL` after the join have invalid values.
This pattern scales to hundreds of domains without touching validation queries.

---

## Severity: **High**
Invalid domain values break GROUP BY reports (unexpected groups appear),
Power BI slicers (unknown categories), and ETL LOOKUP transformations (no match = row dropped or errored).
