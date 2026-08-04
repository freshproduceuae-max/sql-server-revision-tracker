# Checkpoint 7: Regress the Portfolio

*Statistical foundations and a logistic PD model on the same 60 loans*

**Consolidates:** [M22](#lesson/M22) · [M23](#lesson/M23) · [M24](#lesson/M24)

---

## Scenario

Model risk asked you to redo Checkpoint 6 "properly": a logistic regression PD model on [portfolio_loans.csv](projects/data/portfolio_loans.csv), with the statistics understood rather than assumed. Python (pandas + sklearn/statsmodels) or Excel's Solver both work.


## Tasks

1. **[M22]** Foundations first: compute the portfolio default rate and its 95% confidence interval (binomial). Then compute WoE and IV for PriorArrears and for banded DSCR — which carries more information?
2. **[M23]** Fit logit(default) ~ DSCR + LeverageX + PriorArrears + YearsTrading. Report coefficients as odds ratios, check the signs against credit intuition, and compute AUC/Gini. Calibrate: mean predicted PD vs observed default rate.
3. **[M23]** Convert the model to scorecard points (pick a PDO scaling) and compare rank-ordering with your Checkpoint-6 heuristic scorecard.
4. **[M24]** Challenger view: fit any tree-based model on the same features, compare AUC, then write the governance paragraph — with 60 rows, what does SR 11-7 / the EU AI Act mindset say about deploying either model?

## Deliverables

- WoE/IV table with interpretation
- Model output: odds ratios, AUC, calibration check
- A one-page "challenger vs champion" recommendation with governance caveats

## Definition of done

- Every task references numbers or evidence, not opinions
- A colleague could follow your workings without asking questions
- You can defend each recommendation in one sentence

---

*Complete all covered lessons, work the checkpoint, then mark it done to bank the milestone.*
