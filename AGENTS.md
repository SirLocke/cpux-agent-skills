# CPUX Agent Skills — UX Review, Persona Walkthrough & ISO 9241 Engineering

Whenever you are asked to review UX/UI, improve usability, create or refactor frontend components (`*.html`, `*.twig`, `*.vue`, `*.tsx`, `*.jsx`, `*.svelte`, `*View.java`), create project personas, plan a new user flow, or design usability test tasks, apply the [`ux-review-walkthrough`](./skills/ux-review-walkthrough/SKILL.md) skill methodology grounded in **ISO 9241 (11, 110:2020, 210)** and **UXQB® (CPUX)**.

---

## 1. Task-Based Routing (Progressive Disclosure)

Select the workflow that matches the user's intent and consult the corresponding reference module in [`skills/ux-review-walkthrough/references/`](./skills/ux-review-walkthrough/references/):

- **Route A — Reviewing or Improving Existing UI / Code:**  
  Load [`skills/ux-review-walkthrough/references/interaction-principles-110.md`](./skills/ux-review-walkthrough/references/interaction-principles-110.md)
- **Route B — Planning a New Feature or Creating Project Personas:**  
  Load [`skills/ux-review-walkthrough/references/context-and-requirements.md`](./skills/ux-review-walkthrough/references/context-and-requirements.md)
- **Route C — Planning Usability Tests & Writing Test Tasks:**  
  Load [`skills/ux-review-walkthrough/references/usability-evaluation.md`](./skills/ux-review-walkthrough/references/usability-evaluation.md)

---

## 2. Reusable Project Personas & UX Artifacts (`docs/ux/`)

1. **Discover Existing Personas First:** Check whether `docs/ux/personas.md` (or `docs/ux/context-of-use.md`) exists in the project. If present, reuse those established personas and domain constraints across all reviews and walkthroughs.
2. **Persist UX Artifacts on Request:** When asked to create/save personas, UX requirements, or test tasks for reuse across the repository, write them to `docs/ux/`:
   - `docs/ux/personas.md` (using [`skills/ux-review-walkthrough/assets/personas-template.md`](./skills/ux-review-walkthrough/assets/personas-template.md))
   - `docs/ux/requirements-<feature>.md`
   - `docs/ux/usability-test-<feature>.md`

---

## 3. Core UX Engineering Rules

### Route A: Existing UI / Component Review & Refactoring
1. **Persona Setup & Cognitive Walkthrough:** Reuse `docs/ux/personas.md` or define **1 Primary Context Persona** (e.g., mobile user in bright sunlight, hurried clerk) and **1 Accessibility / Edge-Case Persona** (e.g., keyboard-only `Tab`/`Enter`/`Esc` user, screen-reader user) and step chronologically through the component.
2. **5-State Completeness Check:** Never output Happy-Path-only UI. Verify and implement:
   - **`Empty State`:** Motivating explanation + direct primary Call-to-Action (CTA).
   - **`Loading State`:** `aria-busy="true"`, disabled/locked submit trigger to prevent double submissions, layout-stable skeleton/spinner.
   - **`Error / Offline State`:** **Never clear valid user inputs on failure** (`form.reset()` on validation error is strictly forbidden). Mark invalid fields with `aria-invalid="true"`, link recovery hints via `aria-describedby`, and focus the first invalid field or `role="alert"` summary.
   - **`Partial / Overflow State`:** Gracefully handle long compound words, 100+ list items, and missing optional properties.
   - **`Success State`:** Non-intrusive confirmation (`role="status"`, `aria-live="polite"`); offer inline **Undo** or verb-specific confirmation dialogs for destructive actions.
3. **ISO 9241-110:2020 Diagnosis & Code Fix:** Group findings by severity (`Critical`, `Major`, `Minor`), cite the violated ISO 9241-110:2020 principle (*Aufgabenangemessenheit, Selbstbeschreibungsfähigkeit, Erwartungskonformität, Erlernbarkeit, Steuerbarkeit, Robuste Verwendung, Benutzerbindung*), and provide production-ready refactored code:
   - Replace `<div onclick="...">` with semantic `<button type="button|submit">`.
   - Replace standalone `placeholder` attributes with persistent `<label for="...">` elements.
   - Sanitize formatted user input forgivingly in code (e.g., automatically strip spaces in IBANs or phone numbers via `.replace(/\s+/g, '')` instead of rejecting them).

### Route B: Planning New Features from Scratch (ISO 9241-210)
Follow four strictly separated phases:
1. **Context of Use, Personas & As-Is Scenario (*Nutzungskontext, Persona & Ist-Szenario*):** Analyze physical, social, and technical environment constraints (e.g., work gloves, bad network, noise) and current friction points.
2. **User Needs (*Erfordernisse* — Problem Space):** Formulate `"Als [Persona] benötige ich [Voraussetzung], um [Ziel zu erreichen]."` Do not mention the interactive system or any concrete UI widgets (*Button, Dropdown, Modal, Tab*) in this section.
3. **User Requirements (*Nutzungsanforderungen*):** Define solution-neutral Qualitative Requirements and measurable Quantitative Requirements (ISO 9241-11 targets for Effectiveness, Efficiency, and Satisfaction).
4. **To-Be Walkthrough (*Soll-Szenario*) & Interaction Concept:** Walk the Persona through the new flow and design the concrete UI controls and all 5 UI states.

### Route C: Usability Test Tasks (*Testaufgaben*)
1. Embed tasks into a realistic scenario with concrete sample data and an objectively verifiable end state.
2. **Non-Leading Rule:** Never leak the navigation path or quote literal UI labels (menu items, button texts) inside the task prompt given to test participants.
