# Checkpoint 2: Broken Links

*Referential and hierarchy integrity across Orders and Employees*

**Consolidates:** **G03 Referential Integrity** (9 techniques) + **G13 Hierarchical & Structural** (6 techniques)

**Warm-ups (worked exercises):** [M03-E1](#lesson/M03-E1) · [M03-E2](#lesson/M03-E2)

---

## Scenario

A dashboard shows orders for customers who do not exist and a manager chain that loops. Audit every relationship: [Orders](data-validation-lab/schemas/02_Orders.csv) → Customers/Products, and the Employees self-reference ([Employees](data-validation-lab/schemas/04_Employees.csv)).

## Tasks

1. Find every orphan: Orders with no matching Customer or Product — write it twice, LEFT JOIN…IS NULL and NOT EXISTS, and confirm identical results.
2. Find managers that do not exist (Employees.ManagerID → EmployeeID) and employees who manage themselves.
3. Walk the hierarchy with a recursive CTE: output each employee's depth and full path; detect any cycle and cap with MAXRECURSION safely.
4. Validate the tree shape (G13): exactly how many roots exist? Should there be one? Flag orphaned subtrees and compute max depth.
5. Propose the constraint set that would have prevented each finding (FK, CHECK, trigger) and note which are enforceable given the dirty rows.

## Deliverables

- Orphan report for all three relationships
- Hierarchy query with depth, path and cycle detection
- A constraint proposal mapped to findings

## Definition of done

- Every check is a runnable query, not a description of one
- Each finding names the exact rows (IDs), not just counts
- Your .sql re-runs cleanly top-to-bottom on a fresh load

---

*Complete all techniques in the covered groups, work the checkpoint, then mark it done to bank the milestone.*
