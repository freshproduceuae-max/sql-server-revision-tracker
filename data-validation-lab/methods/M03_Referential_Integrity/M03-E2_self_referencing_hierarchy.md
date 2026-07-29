# M03 — Referential Integrity | Example 2: Self-Referencing Hierarchy Validation

## The Question
> The `Employees` table uses a self-referencing foreign key: `ManagerID` points back
> to `EmployeeID` in the same table to represent the org hierarchy.
> Your HR team asks:
> **"Validate the manager hierarchy — find anyone whose ManagerID points to
> an employee that doesn't exist, anyone reporting to themselves,
> and any circular loops where A reports to B and B reports to A."**

---

## Table Reference
**Employees** — `schemas/04_Employees.csv`

Known issue: E017 has ManagerID = E099, which does not exist.
Top-level managers (E010–E013) have NULL ManagerID — this is valid.

---

## Solution Query

```sql
-- Check 1: ManagerID references a non-existent EmployeeID
SELECT
    e.EmployeeID,
    e.FullName,
    e.ManagerID,
    'Manager does not exist' AS Issue
FROM Employees e
WHERE e.ManagerID IS NOT NULL
  AND NOT EXISTS (
      SELECT 1 FROM Employees m WHERE m.EmployeeID = e.ManagerID
  );

-- Check 2: Employee reporting to themselves (self-loop)
SELECT
    EmployeeID,
    FullName,
    ManagerID,
    'Self-referencing — reports to themselves' AS Issue
FROM Employees
WHERE ManagerID = EmployeeID;

-- Check 3: Circular loop — A is manager of B, B is manager of A
SELECT
    A.EmployeeID  AS EmpA,
    A.FullName    AS NameA,
    B.EmployeeID  AS EmpB,
    B.FullName    AS NameB,
    'Circular reporting loop' AS Issue
FROM Employees A
JOIN Employees B
    ON  A.ManagerID = B.EmployeeID
    AND B.ManagerID = A.EmployeeID;

-- Check 4: Full hierarchy validation using Recursive CTE
-- Shows every employee with their chain up to the root
WITH OrgHierarchy AS (
    -- Anchor: top-level managers (no manager)
    SELECT
        EmployeeID,
        FullName,
        ManagerID,
        0 AS Level,
        CAST(EmployeeID AS VARCHAR(500)) AS Path
    FROM Employees
    WHERE ManagerID IS NULL

    UNION ALL

    -- Recursive: employees with a manager
    SELECT
        e.EmployeeID,
        e.FullName,
        e.ManagerID,
        oh.Level + 1,
        CAST(oh.Path + ' > ' + e.EmployeeID AS VARCHAR(500))
    FROM Employees e
    JOIN OrgHierarchy oh ON e.ManagerID = oh.EmployeeID
)
SELECT
    EmployeeID,
    FullName,
    ManagerID,
    Level,
    Path
FROM OrgHierarchy
ORDER BY Path;
```

---

## Expected Output

**Check 1 (non-existent manager):**
| EmployeeID | FullName | ManagerID | Issue |
|---|---|---|---|
| E017 | John Smith | E099 | Manager does not exist |

**Check 4 (hierarchy):**
| EmployeeID | FullName | Level | Path |
|---|---|---|---|
| E010 | Robert Blake | 0 | E010 |
| E001 | Sarah Thompson | 1 | E010 > E001 |
| E005 | Nadia Costa | 1 | E010 > E005 |
| E011 | Claire Fontaine | 0 | E011 |
| E002 | Rajiv Menon | 1 | E011 > E002 |

---

## Explanation

The **self-referencing FK check** (Check 1) is a standard NOT EXISTS against the same
table with a different alias. This is how you validate any hierarchy — org charts,
product categories, geographic regions.

The **Recursive CTE** (Check 4) is the standard SQL pattern for walking a hierarchy.
The anchor member starts at the root (ManagerID IS NULL). The recursive member joins
each level back to the previous result. SQL Server limits recursion depth to 100 by
default — you can override with `OPTION (MAXRECURSION 0)`.

Circular loops crash a recursive CTE with an infinite loop error — always check for
circles (Check 3) before running Check 4.

---

## Interview Angle
*"How do you validate a hierarchical dataset like an org chart?"*
Three-step process: (1) check FK exists, (2) check for self-loops, (3) check for circles.
Then use a Recursive CTE to traverse the valid hierarchy and verify depth/path makes sense.

---

## Severity: **High**
Broken hierarchies corrupt roll-up reporting (e.g., regional revenue aggregation),
access control inheritance, and org-chart visualisations.
