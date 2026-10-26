# Claude Code Instructions — CPUX Agent Skills (ISO 9241 & UXQB)

This project provides task-driven UX review, Persona Cognitive Walkthrough, and ISO 9241 / UXQB (CPUX) engineering capabilities via [`skills/ux-review-walkthrough/SKILL.md`](./skills/ux-review-walkthrough/SKILL.md).

## Automatic Task Routing

Whenever the user asks to review a UI/component, improve UX/usability, build or refactor frontend templates (`HTML`, `Twig`, `React/JSX/TSX`, `Vue`, `Svelte`, `Tailwind`, `Vaadin`), create/save project personas, design a new user flow, or write usability test tasks, read and apply [`skills/ux-review-walkthrough/SKILL.md`](./skills/ux-review-walkthrough/SKILL.md) and load the matching reference file:

1. **Existing UI / Code Review & Refactoring:**  
   Read [`skills/ux-review-walkthrough/references/interaction-principles-110.md`](./skills/ux-review-walkthrough/references/interaction-principles-110.md)
   - Check if `docs/ux/personas.md` exists and reuse those personas; otherwise define 1 Primary Context Persona + 1 Accessibility/Keyboard Persona and simulate a chronological **Persona Cognitive Walkthrough**.
   - Audit all **5 UI States** (`Empty`, `Loading` with `aria-busy="true"`, `Error` without wiping user input via `form.reset()`, `Overflow`, `Success`).
   - Diagnose issues against the **7 Principles of ISO 9241-110:2020** (*Aufgabenangemessenheit, Selbstbeschreibungsfähigkeit, Erwartungskonformität, Erlernbarkeit, Steuerbarkeit, Robuste Verwendung, Benutzerbindung*) and WCAG 2.2 AA.
   - Output refactored, accessible code (persistent `<label>`, semantic `<button>`, forgiving input sanitization such as stripping spaces from IBAN/phone inputs, destructive action Undo/confirmation guardrails).

2. **New Feature / Workflow Conception & Project Personas:**  
   Read [`skills/ux-review-walkthrough/references/context-and-requirements.md`](./skills/ux-review-walkthrough/references/context-and-requirements.md)
   - Follow ISO 9241-210 in 4 strictly separated phases:
     1. *Nutzungskontext, Persona & Ist-Szenario* (physical, social, technical constraints)
     2. *Erfordernisse / User Needs* (**Problem Space only** — zero UI widgets like dropdowns, buttons, or modals!)
     3. *Nutzungsanforderungen / User Requirements* (Qualitative + measurable ISO 9241-11 Quantitative targets)
     4. *Soll-Szenario & Interaktionskonzept* (step-by-step walkthrough, concrete UI architecture, and 5 UI states)
   - When asked to persist personas or UX specs for project-wide reuse, save them to `docs/ux/personas.md` (using [`skills/ux-review-walkthrough/assets/personas-template.md`](./skills/ux-review-walkthrough/assets/personas-template.md)) or `docs/ux/requirements-<feature>.md`.

3. **Usability Evaluation & Test Tasks (*Testaufgaben*):**  
   Read [`skills/ux-review-walkthrough/references/usability-evaluation.md`](./skills/ux-review-walkthrough/references/usability-evaluation.md)
   - Write realistic, scenario-based test tasks with concrete data and an objectively verifiable end state.
   - **Never leak literal UI labels** (menu items or button names) inside the participant task text.

## Running the Benchmark Suite

- Execute `npm run eval` (runs [`scripts/run-evals.mjs`](./scripts/run-evals.mjs) against [`skills/ux-review-walkthrough/evals/evals.json`](./skills/ux-review-walkthrough/evals/evals.json)).
