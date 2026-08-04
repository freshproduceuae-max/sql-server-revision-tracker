# Checkpoint 5: Does It Add Up?

*Cross-field consistency and business-rule enforcement*

**Consolidates:** **G06 Consistency** (16 techniques) + **G07 Business Rules** (16 techniques)

**Warm-ups (worked exercises):** [M06-E1](#lesson/M06-E1) · [M06-E2](#lesson/M06-E2) · [M07-E1](#lesson/M07-E1)

---

## Scenario

Rows can be individually clean and still nonsense together: a delivered order with no ship date, a product selling below cost, a salary that insults the org chart. Encode the business rules for [Orders](data-validation-lab/schemas/02_Orders.csv), [Products](data-validation-lab/schemas/03_Products.csv) and [Employees](data-validation-lab/schemas/04_Employees.csv) and hunt violations.

## Tasks

1. Status–date consistency: every Status value must imply the right date fields (Delivered ⇒ ShipDate present and ≥ OrderDate).
2. Derived-field consistency: recompute every derivable value (order totals, any margin) and diff against stored.
3. Product economics rule: SellingPrice ≥ UnitCost×1.05 minimum margin — list violators with implied margin.
4. Employee rules: salary within grade-plausible bounds (define bands yourself from the data), no negative salary, hire date after 16th birthday, manager's tenure ≥ report's tenure? (test it — is that rule even true here?).
5. Domain checks (G07): Status, Country, Category values against reference lists built with a CTE; report unknown codes.

## Deliverables

- A rules catalogue: rule id, plain-English statement, SQL, violations found
- The violations report
- Three rules you'd propose adding as database constraints vs three that must stay application-level — with reasons

## Definition of done

- Every check is a runnable query, not a description of one
- Each finding names the exact rows (IDs), not just counts
- Your .sql re-runs cleanly top-to-bottom on a fresh load

---

*Complete all techniques in the covered groups, work the checkpoint, then mark it done to bank the milestone.*
