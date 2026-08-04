# Checkpoint 6: Build the Scorecard

*PD, LGD, EAD, CCF and a scorecard from a 60-loan portfolio*

**Consolidates:** [M17](#lesson/M17) · [M18](#lesson/M18) · [M19](#lesson/M19) · [M20](#lesson/M20) · [M21](#lesson/M21)

---

## Scenario

The SME credit team wants a simple application scorecard and parameter estimates built from the attached 60-loan portfolio ([portfolio_loans.csv](projects/data/portfolio_loans.csv)). Every task below runs off that file — Excel or SQL both work.

## Data

### Portfolio summary

| Field | Meaning |
| --- | --- |
| Grade | Internal grade at origination (BB+ … B-) |
| DSCR / LeverageX / YearsTrading / PriorArrears | Candidate scorecard drivers |
| DefaultFlag | 1 = defaulted within observation window |
| ObservedLGD | Loss rate on defaulted loans only |

## Tasks

1. **[M17]** Estimate PD per grade: default rate by Grade, then discuss TTC vs PiT — is one year of data enough, and what would a central-tendency adjustment do?
2. **[M18]** Estimate LGD: average ObservedLGD, then segment it by anything predictive you can find. Propose a downturn add-on and justify it.
3. **[M19]** Estimate EAD behaviour: compare Drawn/Limit for defaulted vs non-defaulted loans. What does that imply for undrawn-line risk?
4. **[M20]** Derive a CCF: for defaulted loans, assume EAD = Limit × 0.9; back out the implied CCF on the undrawn portion and compare with the 40% regulatory assumption used in Checkpoint 5.
5. **[M21]** Build the scorecard: band DSCR, LeverageX, YearsTrading and PriorArrears; compute default rate per band; assign points (WoE-style, approximation fine); score every loan; report the separation (default rate in top vs bottom score tercile).

## Deliverables

- A parameter sheet: PD by grade, LGD (with downturn), EAD/CCF findings
- The scorecard: bands, points, and score distribution
- A 10-line model note: what this scorecard can and cannot be used for

## Definition of done

- Every task references numbers or evidence, not opinions
- A colleague could follow your workings without asking questions
- You can defend each recommendation in one sentence

---

*Complete all covered lessons, work the checkpoint, then mark it done to bank the milestone.*
