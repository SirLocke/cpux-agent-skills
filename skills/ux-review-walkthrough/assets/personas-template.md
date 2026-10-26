# Project Context of Use & Personas (`docs/ux/personas.md`)

> Automatically referenced by `ux-review-walkthrough` during UI reviews, feature planning, and usability test generation.

---

## 1. Context of Use (*Nutzungskontext* — ISO 9241-11)

| Dimension | Project Constraints & Reality |
| :--- | :--- |
| **User Groups (*Benutzergruppen*)** | _e.g., Field Technicians, Backoffice Clerks, B2C Customers_ |
| **Physical Environment** | _e.g., Bright sunlight outdoors, noisy workshop, one-handed mobile operation, work gloves_ |
| **Social Environment** | _e.g., High time pressure, frequent phone interruptions, customer standing nearby_ |
| **Technical Environment** | _e.g., Mid-range Android smartphones, unstable 3G/offline spots, desktop browsers at 1920×1080_ |

---

## 2. Primary Context Persona

### **[Name], [Age] — [Role / User Group]**
- **Core Goal:** _What are they trying to accomplish as quickly and reliably as possible?_
- **Task Frequency & Expertise:** _e.g., Daily routine user (20+ times/day), moderate digital literacy._
- **Situational Constraints:** _e.g., Uses the interface while multitasking; cannot read long instructions._
- **Typical Pain Points & Error Traps:**
  - _Pain point 1 (e.g., losing entered form data when switching apps)_
  - _Pain point 2 (e.g., unclear status whether an action already succeeded)_

---

## 3. Accessibility & Edge-Case Persona

### **[Name], [Age] — [Role / Specific Constraint]**
- **Assistive Technology / Modality:** _e.g., Keyboard-only (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Esc`), Screen Reader (NVDA / VoiceOver), or 200% browser zoom._
- **Visual / Motor Constraints:** _e.g., Red-green color vision deficiency (Deuteranopia), tremors requiring touch targets ≥ 48×48px, sensitivity to motion (`prefers-reduced-motion: reduce`)._
- **Critical Barriers to Avoid:**
  - Non-semantic click handlers (`<div onClick>`), missing `:focus-visible` outlines, placeholder-only inputs without `<label>`, status changes communicated by color alone.

---

## 4. Core Domain & Terminology Conventions

| Internal / Technical Term | User-Facing Term (Mental Model) | Formatting / Validation Rule |
| :--- | :--- | :--- |
| _e.g., `iban_normalized`_ | _IBAN_ | _Accept spaces freely; strip whitespace automatically in code_ |
| _e.g., `soft_deleted_at`_ | _Archiviert / Gelöscht_ | _Provide 10s inline Undo toast or explicit verb confirmation_ |
