# Persona Walkthrough, 5-State Matrix & The 7 Interaction Principles (ISO 9241-110:2020)

Use this reference whenever reviewing, critiquing, walking through, or improving existing UI concepts, wireframes, or frontend code (HTML, CSS/Tailwind, JS/TS, Twig, Vaadin Flow, Vue, React).

---

## 1. Phase 1: Persona-Based Cognitive Walkthrough

Before listing isolated findings, put yourself in the shoes of **2 realistic Personas** and step through the interface chronologically:

- **Persona A (Primary Context Persona):** Defined by realistic environment constraints (e.g., hurried user on mobile in bright sunlight, distracted office clerk switching between windows, domain novice).
- **Persona B (Accessibility / Edge-Case Persona):** Defined by interaction constraints (e.g., keyboard-only power user navigating via `Tab`/`Enter`/`Esc`, screen-reader user relying on ARIA landmarks, user with 200% font scaling).

### The 4 Walkthrough Questions at Every Step:
1. **Entry & Orientation:** Where does the Persona's eye or keyboard focus land first? Do they immediately recognize the purpose of this view?
2. **Goal-Action Mapping:** Will the Persona notice that the correct action is available, and does the label match their mental vocabulary?
3. **Execution & Error Friction:** What happens if the Persona mistypes a character, pastes formatted text (e.g., IBAN with spaces), presses "Back", or double-clicks?
4. **Feedback & State Transition:** Does the Persona immediately perceive whether the action succeeded, is still loading, or failed—and how to recover?

---

## 2. Phase 2: The 5-State Completeness Matrix

Never accept or output UI code that only handles the *Happy Path*. Audit every data-driven or interactive component against all 5 states:

| UI State | Audit Criteria & Required Implementation | ISO 9241-110:2020 Principle |
| :--- | :--- | :--- |
| **1. Empty State** | Avoid blank screens or raw `"No data"` text. Explain *why* it is empty and provide a direct, motivating Call-to-Action (CTA) to create the first item or reset active filters. | *Benutzerbindung* & *Erlernbarkeit* |
| **2. Loading State** | Disable or lock trigger buttons during async calls to prevent duplicate submissions. Set `aria-busy="true"` on the container. Use height-matched skeletons to prevent Cumulative Layout Shift (CLS). | *Selbstbeschreibungsfähigkeit* & *Robuste Verwendung* |
| **3. Error / Offline State** | **CRITICAL:** Never clear valid form inputs on validation failure (`form.reset()` is forbidden). Highlight the specific failing field (`aria-invalid="true"`), bind recovery instructions via `aria-describedby`, and move focus to the first invalid input or error summary (`role="alert"`). | *Robuste Verwendung* |
| **4. Partial / Overflow State** | Handle long German compound words (`hyphens: auto`, `break-words`, `truncate` with tooltip), large lists (pagination/virtualization), and missing optional properties gracefully. | *Aufgabenangemessenheit* & *Steuerbarkeit* |
| **5. Success State** | Provide non-intrusive confirmation (`role="status"`, `aria-live="polite"`). For destructive actions (delete/archive), provide an inline **Undo** action or explicit verb-based confirmation dialog. | *Selbstbeschreibungsfähigkeit* & *Steuerbarkeit* |

---

## 3. Phase 3: The 7 Principles of ISO 9241-110:2020 — Code Anti-Patterns vs. Fixes

### 1. Suitability for the User's Tasks (*Aufgabenangemessenheit*)
Support the user in completing their task effectively and efficiently without unnecessary cognitive or physical steps.
- **Anti-Pattern:** Asking users to select "Salutation", "Country", and "City" manually when postal code is already entered, or showing a default text keyboard for numeric/phone inputs on mobile.
- **Code Fix:**
  - Add `autocomplete="name"`, `autocomplete="email"`, `autocomplete="postal-code"`.
  - Add `inputmode="numeric"` or `inputmode="tel"` for number-heavy inputs.
  - Pre-select sensible defaults (*Standardwerte*) for the 80% use case.

### 2. Self-Descriptiveness (*Selbstbeschreibungsfähigkeit*)
Make it immediately obvious where the user is, what actions are possible, and what format is required without external help.
- **Anti-Pattern:** Relying on `placeholder="E-Mail-Adresse"` without a `<label>` (disappears as soon as the user types), or hiding password/format rules until after submission fails.
- **Code Fix:**
  - Always render a persistent `<label for="field-id">`.
  - Place format hints (e.g., `"Format: TT.MM.JJJJ"`) persistently above or below the input linked via `aria-describedby`.
  - When a button is disabled, explain *why* (avoid silent disabled buttons).

### 3. Conformity with User Expectations (*Erwartungskonformität*)
Behave consistently across the application and align with platform conventions and the user's mental model.
- **Anti-Pattern:** Using `<div class="btn" onclick="...">` (breaks `Tab` focus, `Enter`/`Space` activation, and screen readers), closing modals without restoring focus to the trigger button, or displaying raw backend errors (`"ERR_SQL_CONSTRAINT_23"`).
- **Code Fix:**
  - Use native `<button type="button|submit">`, `<a href="...">`, and `<dialog>`.
  - Trap focus inside active modals and allow closing via `Escape`.
  - Translate technical states into user-domain language.

### 4. Learnability (*Erlernbarkeit*)
Enable users to discover capabilities and build a mental model with minimal cognitive load.
- **Anti-Pattern:** Dumping 25 advanced configuration fields onto a single screen for first-time users.
- **Code Fix:**
  - Apply **Progressive Disclosure**: Show the 3-5 core fields required for the primary task; group advanced/expert settings inside an expandable `<details><summary>` or secondary step.

### 5. Controllability (*Steuerbarkeit*)
Keep the user in control of pace, direction, and presentation. *(Note: Since ISO 9241-110:2020, this includes the former principle of Individualisierbarkeit / Customizability).*
- **Anti-Pattern:** Multi-step wizards where clicking "Back" wipes out entered data, auto-advancing carousels without pause controls, or hardcoded `px` font sizes that break browser zoom.
- **Code Fix:**
  - Persist wizard/form state in memory or `sessionStorage` across step navigation.
  - Respect `@media (prefers-reduced-motion: reduce)` (disable GSAP/CSS scroll-jacking or heavy animations when active) and `@media (prefers-color-scheme: dark)`.
  - Use `rem` units for typography and spacing.

### 6. Use Error Robustness (*Robuste Verwendung / Nutzung* — formerly *Fehlertoleranz*)
Prevent use errors proactively, tolerate minor deviations forgivingly, and support effortless recovery.
- **Anti-Pattern:** Rejecting an IBAN (`DE89 3704 ...`) or phone number because the user typed spaces, or immediately executing a `DELETE` request when a trash icon is clicked.
- **Code Fix:**
  - **Forgiving Input Sanitization:** Strip whitespace and formatting characters silently (`value.replace(/\s+/g, '')`) before validating length/pattern, or format automatically via input masks.
  - **Destructive Action Guardrails:** Either offer a soft-delete with an `"Undo / Rückgängig"` toast (5-10s) or require a confirmation dialog with explicit verb labels (`"Mitglied endgültig löschen"` vs. `"Abbrechen"` — never `"OK / Cancel"`).

### 7. User Engagement (*Benutzerbindung* — new in ISO 9241-110:2020)
Invite interaction through trustworthy, respectful, and motivating design.
- **Anti-Pattern:** Confirmshaming dark patterns, dead-end empty states, or jarring layout shifts.
- **Code Fix:** Clear visual hierarchy, immediate tactile micro-feedback on interaction, and transparent privacy/data micro-copy near sensitive inputs.

---

## 4. Accessibility Cross-Mapping (ISO 9241-110 ↔ WCAG 2.2 / BITV 2.0 / BFSG)

| ISO 9241-110:2020 Principle | Matching WCAG 2.2 / EN 301 549 Criterion | Technical Check |
| :--- | :--- | :--- |
| *Selbstbeschreibungsfähigkeit* | **1.3.1 Info & Relationships / 3.3.2 Labels** | Programmatic `<label>`, `aria-labelledby`, `aria-live` status updates |
| *Erwartungskonformität* | **2.4.3 Focus Order / 4.1.2 Name, Role, Value** | Logical DOM order, native interactive elements, visible `:focus-visible` ring |
| *Steuerbarkeit* | **2.1.1 Keyboard / 2.2.2 Pause, Stop, Hide / 1.4.4 Resize Text** | Full keyboard operability, `prefers-reduced-motion`, `rem` scaling up to 200% |
| *Robuste Verwendung* | **3.3.1 Error Identification / 3.3.3 Error Suggestion / 3.3.4 Error Prevention** | `aria-invalid`, specific recovery text via `aria-describedby`, Undo/Confirmation |
| *Aufgabenangemessenheit* | **1.3.5 Identify Input Purpose / 2.5.8 Target Size (Minimum)** | `autocomplete` tokens, touch targets at least `44x44px` (mobile) / `24x24px` (WCAG AA) |