# Checkpoint 10: Location & Privacy

*Geospatial sanity and a PII/compliance sweep to close the lab*

**Consolidates:** **G16 Geospatial** (6 techniques) + **G17 Security & Compliance** (8 techniques)

---

## Scenario

Legal asks two questions the day before launch: "Is location data sane?" and "Where exactly does PII live, and who could see it?" Answer both across all six tables.

## Tasks

1. Geo sanity (G16): Country vs PostalCode coherence (reusing Checkpoint-3 patterns as a scored rule), the UAE "00000" placeholder problem, and — assuming a lat/long column existed — write the range checks (±90/±180) and precision checks you would apply.
2. PII inventory (G17): scan column names and content for PII (names, emails, phones, DOB); classify each as direct / quasi / non-identifier; note where DOB enables age discrimination risk.
3. Exposure test: write the masking view: full table for privileged users, masked (email → a***@domain, phone last-4, DOB → year only) for everyone else.
4. Retention: customers inactive since 2021 with no orders — which rows would a GDPR retention policy delete, and what FK order must the deletion run in (Checkpoint-2 knowledge)?
5. Compliance close-out: one page — the five highest data-protection risks in this lab dataset and the control for each.

## Deliverables

- Geo findings + the lat/long check pack (ready for real coordinates)
- PII inventory with classification
- Masking view DDL + retention deletion plan in FK-safe order

## Definition of done

- Every check is a runnable query, not a description of one
- Each finding names the exact rows (IDs), not just counts
- Your .sql re-runs cleanly top-to-bottom on a fresh load

---

*Complete all techniques in the covered groups, work the checkpoint, then mark it done to bank the milestone.*
