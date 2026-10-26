# 📊 CPUX Agent Skill — Automated Eval Benchmark

- **Model evaluated:** `nvidia/nemotron-3.5-lightning:free`
- **Date:** 2026-10-26
## 🏆 Summary: Baseline Lift
| Mode | Passed Assertions | Score |
| :--- | :---: | :---: |
| ❌ **Without Skill (Baseline)** | 13 / 22 | **59%** |
| ✅ **With `ux-review-walkthrough`** | 22 / 22 | **100%** |


### `eval-01-broken-code-audit` ([View Full Output](./examples/eval-01-broken-code-audit.md))
- **Autonomously selected reference:** `references/interaction-principles-110.md`
- **Without Skill:** 1/4
- **With Skill:** **4/4**

### `eval-02-feature-from-scratch` ([View Full Output](./examples/eval-02-feature-from-scratch.md))
- **Autonomously selected reference:** `references/context-and-requirements.md`
- **Without Skill:** 2/3
- **With Skill:** **3/3**

### `eval-03-missing-ui-states` ([View Full Output](./examples/eval-03-missing-ui-states.md))
- **Autonomously selected reference:** `references/interaction-principles-110.md`
- **Without Skill:** 0/3
- **With Skill:** **3/3**

### `eval-04-destructive-action-flow` ([View Full Output](./examples/eval-04-destructive-action-flow.md))
- **Autonomously selected reference:** `references/interaction-principles-110.md`
- **Without Skill:** 3/3
- **With Skill:** **3/3**

### `eval-05-non-leading-test-task` ([View Full Output](./examples/eval-05-non-leading-test-task.md))
- **Autonomously selected reference:** `references/usability-evaluation.md`
- **Without Skill:** 2/3
- **With Skill:** **3/3**

### `eval-06-holdout-b2b-lab-touchscreen` ([View Full Output](./examples/eval-06-holdout-b2b-lab-touchscreen.md))
- **Autonomously selected reference:** `references/context-and-requirements.md`
- **Without Skill:** 2/3
- **With Skill:** **3/3**

### `eval-07-reusable-project-personas` ([View Full Output](./examples/eval-07-reusable-project-personas.md))
- **Autonomously selected reference:** `references/context-and-requirements.md`
- **Without Skill:** 3/3
- **With Skill:** **3/3**
