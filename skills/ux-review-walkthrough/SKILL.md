---
name: ux-review-walkthrough
description: Improve user experience, conduct UX/UI reviews, simulate Persona Walkthroughs (Cognitive Walkthroughs), create and persist reusable project personas, plan new features, and fix usability or accessibility issues in frontend code (HTML, Twig, React, Vue, Svelte, Tailwind, Vaadin). Trigger whenever the user asks to "improve UX", "make this more user-friendly", "do a UX review", "walk through my app/flow", "check usability", "create/save personas", "review my form/component/page", "plan a user flow", or "write usability test tasks" - even if they never mention ISO or UXQB standards. Internally applies ISO 9241 (11, 110:2020, 210) and UXQB (CPUX) methodology.
---
# UX Review & Persona Walkthrough (CPUX / ISO 9241)

Translates everyday UX requests into rigorous, standards-based UX engineering grounded in ISO 9241 and UXQB (CPUX). The agent automatically reuses or derives realistic **Personas**, simulates their journey step-by-step (**Cognitive Walkthrough**), checks the **5 UI States**, and evaluates interfaces against ISO 9241-110:2020 without requiring the user to know ISO terminology.

## Reference Files (Select Based on Task Intent)

Before answering, load the reference file that matches the user's primary goal:

- **`references/interaction-principles-110.md`:** Select when the user provides or describes an **existing UI, component, form, or interaction mechanism** and wants a UX review, critique, or code improvement.
- **`references/context-and-requirements.md`:** Select when the user wants to **conceptually plan or design a new feature, workflow, or application from scratch**, or **create and persist project personas / context of use**.
- **`references/usability-evaluation.md`:** Select when the user wants to **plan a usability test, write test tasks for participants, or rate existing usability findings**.

## Reusable Project Personas & UX Artifacts (`docs/ux/`)

1. **Discover Existing Personas First:** When working in a codebase, check whether `docs/ux/personas.md` (or `docs/ux/context-of-use.md`) already exists. If found, reuse the project's established personas and domain constraints across all reviews and walkthroughs instead of inventing throwaway personas.
2. **Persist Personas & UX Specs on Request:** When the user asks to create, save, or document personas, requirements, or test tasks for the project, write them to `docs/ux/` for team-wide reuse:
   - `docs/ux/personas.md` — Project Context of Use, Primary Persona & Accessibility Persona (follow [`assets/personas-template.md`](./assets/personas-template.md)).
   - `docs/ux/requirements-<feature>.md` — As-Is Scenario, User Needs (*Erfordernisse*), User Requirements (*Nutzungsanforderungen*), and To-Be Walkthrough.
   - `docs/ux/usability-test-<feature>.md` — Non-leading test tasks (*Testaufgaben*), moderator guide, and severity log.

## Task-Based Routing Workflow

### Route A: Reviewing or Improving an Existing UI / Code Snippet

When reviewing existing code, components, or interaction patterns:

1. **Persona Setup & Cognitive Walkthrough:** Load existing personas from `docs/ux/personas.md` if available, or define 1 Primary Persona and 1 Accessibility/Edge-Case Persona (e.g., keyboard-only or mobile user) and trace their chronological steps through the UI.
2. **5-State Completeness Check:** Verify whether `Empty`, `Loading` (`aria-busy="true"`), `Error` (preserve valid inputs; never wipe state on failure), `Overflow`, and `Success` states are handled.
3. **Prioritized Findings (ISO 9241-110:2020):** Group issues by severity (`Critical`, `Major`, `Minor`), name the violated ISO 9241-110:2020 principle (*Aufgabenangemessenheit, Selbstbeschreibungsfähigkeit, Erwartungskonformität, Erlernbarkeit, Steuerbarkeit, Robuste Verwendung, Benutzerbindung*), and explain the impact on effectiveness, efficiency, or satisfaction.
4. **Refactored Solution:** Provide the improved, accessible code or interaction flow.

### Route B: Planning a New Feature, Workflow, or Project Personas from Scratch

When asked how to design or structure the UX for a new feature, follow the Human-Centered Design (ISO 9241-210) sequence using four clearly separated sections:

1. **Context of Use, Persona & As-Is Scenario (*Nutzungskontext, Persona & Ist-Szenario*):**
   - Describe the User Group, a task-focused Primary Persona + Accessibility Persona (including physical, social, and technical environment constraints), and a brief narrative **As-Is Scenario (*Ist-Szenario*)** showing how the task is currently performed and where friction occurs.
2. **User Needs (*Erfordernisse* — Problem Space):**
   - Derive prerequisites the Persona needs during the task to achieve their goal (`"Als [Persona] benötige ich [Voraussetzung], um [Ziel zu erreichen]."`).
   - Keep this section strictly in the problem space: do not mention the interactive system or any UI controls/widgets here.
3. **User Requirements (*Nutzungsanforderungen* — Solution Constraints):**
   - Formulate **Qualitative User Requirements** (what the user must be able to recognize or accomplish on the system, still without prescribing specific UI widgets) and **Quantitative User Requirements** (measurable ISO 9241-11 targets for Effectiveness, Efficiency, and Satisfaction).
4. **To-Be Walkthrough (*Soll-Szenario*) & Interaction Concept:**
   - Walk the Persona step-by-step through the future flow (*Soll-Szenario*) and propose the concrete UI architecture, controls, and 5 UI states.

### Route C: Writing Usability Test Tasks (*Testaufgaben*)

When writing tasks for usability test participants:

1. Frame each task as a realistic scenario with concrete data and an objectively verifiable end state.
2. **Non-Leading Rule:** Never use the exact wording of menu items, buttons, or links from the interface inside the task text given to participants. In your accompanying explanation for the test moderator, explain this principle generically without quoting the forbidden UI labels.
