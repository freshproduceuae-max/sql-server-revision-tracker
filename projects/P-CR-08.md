# Checkpoint 8: Validate the Model

*Independent validation of the Checkpoint-7 model, end to end*

**Consolidates:** [M25](#lesson/M25) · [M26](#lesson/M26) · [M27](#lesson/M27) · [M28](#lesson/M28) · [M29](#lesson/M29)

---

## Scenario

Swap chairs: you are now the independent validator receiving the Checkpoint-7 model. Produce the validation report a second line would actually write.


## Tasks

1. **[M25]** Audit the development file: list what documentation Checkpoint 7 should have produced (reference dataset definition, exclusions, transformations, assumptions log) and note every gap.
2. **[M26]** Run the three-pillar challenge: discriminatory power (recompute AUC/Gini yourself), calibration (predicted vs observed by score band), stability (split the 60 loans oldest/newest half by YearsTrading as a proxy and compare score distributions — a rough PSI).
3. **[M27]** Backtest the grade-level PDs from Checkpoint 6 with a Basel traffic-light approach: with n this small, compute a Jeffreys interval per grade and state which grades are meaningfully testable at all.
4. **[M28]** Benchmark: compare grade default rates against any external reference (e.g. published speculative-grade DR tables) and against the logistic model as challenger. Where do they disagree and why?
5. **[M29]** Sensitivity: shock LGD ±10pts and PD ±30% relative in the Checkpoint-5 IRB formula; tabulate RWA impact; identify which parameter the capital number is most sensitive to.

## Deliverables

- A validation report with a findings table (severity-rated)
- Backtest + benchmark evidence
- A sensitivity grid and one-paragraph model-risk rating recommendation

## Definition of done

- Every task references numbers or evidence, not opinions
- A colleague could follow your workings without asking questions
- You can defend each recommendation in one sentence

---

*Complete all covered lessons, work the checkpoint, then mark it done to bank the milestone.*
