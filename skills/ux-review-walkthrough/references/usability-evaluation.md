# Usability Evaluation & Testing (ISO 9241-11 & CPUX-F)

Use this reference when planning usability tests, formulating test tasks (*Testaufgaben*) for participants, or classifying findings from usability inspections and cognitive walkthroughs.

---

## 1. Writing Non-Leading Usability Test Tasks (*Testaufgaben*)

A valid CPUX usability test task embeds the objective into a realistic everyday scenario with concrete data and an objectively verifiable end state—**without leaking the click path or literal UI labels**.

### The 4 Golden Rules for Test Tasks:
1. **No UI Label Leaking (Non-Leading Rule):** Never use the exact wording of menu items, buttons, tabs, or links from the interface inside the task text read by participants. Otherwise, a usability test degrades into a visual word-matching game (*Buchstabensuppe*). When explaining this methodological principle to the moderator, describe it generically without quoting the forbidden UI strings.
2. **Realistic Motivation & Concrete Data:** Provide a plausible life/work reason and concrete sample data (e.g., a timeframe, budget, or item) so the participant does not have to invent artificial data.
3. **Objectively Verifiable Goal:** Define the desired outcome clearly enough that the moderator can objectively verify when the task is solved.
4. **Clear Stopping Signal:** Tell the participant how to signal completion (e.g., *"Sag mir Bescheid, sobald du sicher bist, dass…"*).

### Contrast Example: Leading vs. Non-Leading Task

- **Context:** An e-commerce subscription portal has a menu item labeled `"Mitgliedschaft verwalten"` and a button labeled `"Pausieren"`.
- ❌ **Leading Anti-Pattern (Invalid in CPUX):**
  > *"Gehe im Menü auf 'Mitgliedschaft verwalten' und klicke auf den Button 'Pausieren', um dein Abo für 3 Monate zu pausieren."*  
  *(Flaw: Dictates the navigation path and quotes the exact UI labels verbatim.)*
- ✅ **Non-Leading CPUX Best Practice:**
  > **Szenario & Aufgabe für die Testperson:** *"Du gehst ab nächster Woche für drei Monate ins Ausland. In dieser Zeit möchtest du den Service nicht nutzen und auch kein Geld dafür bezahlen, dein Konto samt bisherigen Daten aber für deine Rückkehr behalten. Bitte nimm die nötigen Einstellungen vor und gib kurz Bescheid, sobald du fertig bist."*  
  > **Verifizierbarer Endzustand (für den Moderator):** Abo-Status steht auf dem entsprechenden Ruhe-Status für 3 Monate; nächste Abbuchung ist entsprechend verschoben.

---

## 2. Moderator Guidelines (*Testleitung & Thinking Aloud*)

- **Pre-Session Briefing:** Emphasize clearly: *"Wir testen heute die Software, nicht dich. Wenn etwas unklar ist oder nicht klappt, liegt der Fehler beim System—nicht bei dir."*
- **Thinking Aloud (*Lautes Denken*):** Ask participants to continuously verbalize their expectations, thoughts, and confusion (*"Was denkst du gerade?", "Was erwartest du, wenn du dort tippst?"*).
- **Neutral Boomerang Prompts:** When a participant asks *"Soll ich hier klicken?"*, never answer Yes/No. Reply neutrally: *"Was würdest du denn tun, wenn du jetzt alleine zu Hause vor dem Bildschirm säßest?"*

---

## 3. Official CPUX Severity Rating Scale (*Schweregrade von Usability-Befunden*)

When documenting usability problems from a test or inspection, classify each finding using this 4-tier scale:

| Severity Level | Criteria & Impact on ISO 9241-11 | Action Priority |
| :--- | :--- | :--- |
| **1. Critical (*Kritisch*)** | Causes complete task failure (*Abbruch*), unrecoverable data loss, financial/safety damage, or blocks an entire user group (e.g., keyboard trap). | **Mandatory fix before release.** |
| **2. Major (*Schwerwiegend*)** | Causes substantial delay, repeated detours, high cognitive load, or severe frustration, though the user eventually recovers. | **High priority fix.** |
| **3. Minor (*Geringfügig*)** | Causes brief hesitation, minor irritation, or cosmetic friction without threatening task success. | **Low priority / polish.** |
| **4. Good Practice (*Positiver Befund*)** | Interaction patterns that noticeably boost effectiveness, efficiency, or user engagement (*Benutzerbindung*). Must be preserved during refactoring! | **Preserve & standardize.** |
