# Context of Use, Personas & User Requirements (ISO 9241-210 & CPUX-F / CPUX-UR)

Use this reference whenever planning or designing a new feature, workflow, or application from scratch, or when creating reusable project personas.

---

## 1. Official UXQB (CPUX) & ISO 9241 Terminology (DE ↔ EN Glossary)

| German Term (CPUX) | English Term (ISO / CPUX) | Practical Engineering Meaning |
| :--- | :--- | :--- |
| **Nutzungskontext** | **Context of Use** | Combination of users, goals, tasks, resources (hardware, software, materials), and the physical, social, and technical environment (ISO 9241-11). |
| **Benutzergruppe** | **User Group** | Subset of users who share common characteristics, tasks, and context conditions relative to the interactive system. |
| **Persona** | **Persona** | Realistic, concrete archetype of a User Group with specific goals, capabilities, pain points, and environmental constraints. |
| **Ist-Szenario** | **As-Is Scenario** | Narrative description of how the Persona currently performs the task, highlighting media breaks, workarounds, delays, and error traps. |
| **Erfordernis** | **User Need** | A prerequisite identified in the Context of Use that a user needs in order to achieve their goal. **Strictly in the Problem Space (Zero UI widgets!).** |
| **Nutzungsanforderung** | **User Requirement** | Requirement for use that forms the basis for design and evaluation. Split into **Qualitative** (what must be recognizable/executable on the system) and **Quantitative** (measurable ISO 9241-11 targets for Effectiveness, Efficiency, and Satisfaction). |
| **Soll-Szenario** | **To-Be Scenario** | Narrative step-by-step walkthrough of how the Persona achieves their goal in the future interactive system before/alongside concrete UI controls. |

---

## 2. Strict Separation: Problem Space vs. Solution Space

Keep problem analysis independent from UI widget selection so requirements remain testable and solution-neutral.

| Artifact | Space | ❌ Anti-Pattern (Leaking UI Widgets Early) | ✅ CPUX Best Practice (Solution-Neutral) |
| :--- | :--- | :--- | :--- |
| **User Need (*Erfordernis*)** | **Problem Space** | *"Als Monteur benötige ich ein Dropdown-Menü und einen Barcode-Button im Modal, um Artikel nachzubestellen."* | *"Als Monteur benötige ich während der Arbeit auf der Baustelle die Gewissheit, den exakt passenden Ersatzartikel ohne Kenntnis der Artikelnummer zu identifizieren, um Fehlbestellungen zu vermeiden."* |
| **Qualitative User Requirement (*Qualitative Nutzungsanforderung*)** | **Solution Constraints** | *"Das System muss einen grünen Submit-Button und einen Toast oben rechts anzeigen."* | *"Am System muss für den Benutzer jederzeit erkennbar sein, ob eine aufgegebene Bestellung erfolgreich übermittelt oder mangels Mobilfunknetz lokal vorgemerkt wurde."* |
| **Quantitative User Requirement (*Quantitative Nutzungsanforderung*)** | **Measurable ISO 9241-11 Target** | *"Die App soll modern, schnell und intuitiv bedienbar sein."* | *"Mindestens 90 % der erprobten Benutzer können eine Nachbestellung eines Standardartikels mit Arbeitshandschuhen in ≤ 30 Sekunden fehlerfrei abschließen."* |

---

## 3. The 4-Phase Human-Centered Design Blueprint (ISO 9241-210)

Structure every feature or workflow concept into these four clearly separated sections:

### Phase 1: Context of Use, Personas & As-Is Scenario (*Nutzungskontext, Persona & Ist-Szenario*)
1. **User Group & Primary Context Persona:**
   - **Profile & Task Profile:** Frequency of use, domain expertise, mental state (e.g., time pressure, fatigue).
   - **Physical Environment:** Lighting (glare/sunlight, dark cellar), noise (alarms/audio muted), posture (standing, one-handed), protective gear (nitrile/work gloves, wet hands).
   - **Social Environment:** Interruptions, customer watching, four-eyes verification, shared device.
   - **Technical Environment:** Screen size, input modality (touchscreen, keyboard-only, scanner), network reliability (offline/EDGE spots), battery constraints.
2. **Accessibility / Edge-Case Persona:**
   - Include a secondary persona with specific accessibility or situational constraints (e.g., screen-reader user, 200% font scaling, red-green color blindness, left-handed thumb reach).
3. **As-Is Scenario (*Ist-Szenario*):**
   - Write a realistic narrative showing how the Persona currently attempts to solve the task (e.g., paper notes, phone calls, Excel sheets, error-prone legacy inputs) and pinpoint the exact friction points.

### Phase 2: User Needs (*Erfordernisse* — Problem Space)
- Derive 3–6 solution-neutral User Needs directly from the friction points in the As-Is Scenario.
- Use the official CPUX syntax:
  > **DE:** *"Als **[Persona]** benötige ich **[Voraussetzung / Information / Gewissheit]**, um **[Ziel zu erreichen]**."*  
  > **EN:** *"As **[Persona]**, I need **[prerequisite / information / certainty]** in order to **[achieve goal]**."*
- Keep this section free of references to the interactive system or concrete UI controls (do not use terms like *Button, Dropdown, Modal, Dialog, Checkbox, Toggle, Toast, Screen, Tab, Input field* in this section).

### Phase 3: User Requirements (*Nutzungsanforderungen* — Solution Constraints)
1. **Qualitative User Requirements (*Qualitative Nutzungsanforderungen*):**
   - Describe what the user must be able to **recognize** (*erkennen*), **select** (*auswählen*), **input** (*eingeben*), or **undo** (*rückgängig machen*) on the system—still without prescribing specific widget types.
   - Cross-reference the relevant **ISO 9241-110:2020** interaction principles (*Aufgabenangemessenheit, Selbstbeschreibungsfähigkeit, Erwartungskonformität, Erlernbarkeit, Steuerbarkeit, Robuste Verwendung, Benutzerbindung*).
2. **Quantitative User Requirements (*Quantitative Nutzungsanforderungen* — ISO 9241-11):**
   - **Effectiveness (*Effektivität*):** Accuracy and completeness (e.g., `Task Completion Rate ≥ 95%`, `Critical input error rate = 0%`).
   - **Efficiency (*Effizienz*):** Resources expended in relation to results (e.g., `Median Time-on-Task ≤ 30 seconds`, `≤ 3 interactions for the 80% standard case`).
   - **Satisfaction (*Zufriedenheit*):** Freedom from discomfort and positive attitudes towards use (e.g., `SUS score ≥ 80`).

### Phase 4: To-Be Walkthrough (*Soll-Szenario*) & Concrete Interaction Concept
1. **Step-by-Step To-Be Scenario (*Soll-Szenario*):**
   - Trace the Persona chronologically through the future flow from trigger to completion, explicitly showing how the previous pain points are eliminated.
2. **Concrete UI Architecture & Controls (Solution Space):**
   - Translate the requirements into concrete, accessible UI patterns:
     - **Smart Defaults & Presets (*Aufgabenangemessenheit*):** Pre-fill the 80% use case; prefer validated domain presets over raw free-text/number entry when errors have severe consequences.
     - **Error Prevention & Plausibility Guards (*Robuste Verwendung*):** Forgiving input parsing, soft/hard range limits, confirmation dialogs with explicit action verbs, or inline Undo.
     - **Physical & Accessibility Ergonomics:** Touch targets (`≥ 44×44px` mobile / `≥ 48–64px` with gloves), keyboard navigation, high-contrast status indicators, and offline/sync resilience.
3. **The 5 UI States:**
   - Explicitly specify how the new view behaves in all 5 states: **`Empty`**, **`Loading`**, **`Error / Offline`**, **`Partial / Overflow`**, and **`Success`**.

---

## 4. Persisting Reusable UX Artifacts (`docs/ux/`)

When working inside a repository and the user asks to create, save, or document Personas or UX specifications for future reuse across the project:
- Save project-wide Personas and Context of Use to **`docs/ux/personas.md`** (using [`../assets/personas-template.md`](../assets/personas-template.md)).
- Save feature-specific requirements and To-Be Walkthroughs to **`docs/ux/requirements-<feature-slug>.md`**.
- Always check `docs/ux/personas.md` before starting a new review or walkthrough so existing project personas are reused consistently.

### Required Structure for `docs/ux/personas.md`:
1. **Context of Use (*Nutzungskontext* — ISO 9241-11):** Table covering *User Groups (Benutzergruppen)*, *Physical Environment*, *Social Environment*, and *Technical Environment*.
2. **Primary Context Persona:** Name, age, role, core goal, task frequency/expertise, situational constraints (e.g., mobile on the go, time pressure, interruptions), and typical pain points/error traps.
3. **Accessibility & Edge-Case Persona:** Name, age, role, assistive technology/modality (keyboard-only `Tab`/`Enter`/`Esc`, screen reader NVDA/VoiceOver, 200% zoom), visual/motor constraints (color vision deficiency, touch targets `≥ 48×48px`, `prefers-reduced-motion: reduce`), and critical UI barriers to avoid (`<div onClick>`, missing `<label>`, color-only states).
4. **Core Domain & Terminology Conventions:** Table mapping internal/technical terms to user-facing mental model terms and forgiving input/validation rules (e.g., stripping spaces automatically in IBANs, phone numbers, or case numbers; Undo/confirmation guardrails).
