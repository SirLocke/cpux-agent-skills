# Real-World Eval Example: `eval-07-reusable-project-personas`
> Automatically generated with `nvidia/nemotron-3.5-lightning:free` (Autonomously loaded reference: `references/context-and-requirements.md`)

## 💬 User Prompt
```text
Wir starten ein neues Projekt für eine kommunale Bürgeramt-Terminbuchung (Web & Mobile). Erstelle bitte wiederverwendbare Projekt-Personas und den Nutzungskontext für unser Repo, damit unser Team sie bei künftigen UX-Reviews nutzen kann.
```

---

## 📊 Assertion Scorecard
| Assertion | Without Skill (Baseline) | With `ux-review-walkthrough` |
| :--- | :---: | :---: |
| Analysiert strukturiert den Nutzungskontext nach ISO 9241-11 (Benutzergruppen sowie physische, soziale und technische Umgebung) und bereitet das Artefakt für die Ablage unter docs/ux/personas.md auf. | ✅ PASS | ✅ PASS |
| Definiert sowohl eine realistische Primary Context Persona (mit Kernzielen, Nutzungshäufigkeit, situativen Einschränkungen und typischen Schmerzpunkten) als auch eine dedizierte Accessibility / Edge-Case Persona. | ✅ PASS | ✅ PASS |
| Spezifiziert bei der Accessibility-Persona konkrete assistierende Technologien bzw. Barrieren (z. B. reine Tastaturbedienung, Screenreader, 200 % Zoom, Farbfehlsichtigkeit oder reduzierte Bewegung) sowie projektweite Domänen- und Formatierungsregeln (z. B. fehlertolerante Eingaben). | ✅ PASS | ✅ PASS |

---

## ✅ Output WITH `ux-review-walkthrough` (3/3 Passed)

# `docs/ux/personas.md` — Reusable Project Personas & Context of Use
**Municipal Citizen's Office Appointment Booking (Web & Mobile)**  
*Generated for team-wide reuse in future UX reviews, walkthroughs, and usability tests. Follows ISO 9241-11, ISO 9241-110:2020, and CPUX (ISO 9241-210) methodology.*

---

## 1. Context of Use (*Nutzungskontext* — ISO 9241-11)

| Dimension | Details |
|-----------|---------|
| **User Groups (Benutzergruppen)** | 1. **Elderly citizens (65+)** – Rare users, low‑medium digital literacy, may need assistance, often book on desktop or ask family.<br>2. **Young families (parents 25‑40)** – Mobile‑first, time‑pressed, expect quick confirmation, often book during lunch breaks or evenings.<br>3. **People with disabilities** – Motor, visual, or cognitive impairments; use screen readers, keyboard‑only navigation, high‑contrast, enlarged touch targets.<br>4. **Non‑native German speakers** – Need plain‑language UI, multilingual support, clear icons.<br>5. **Rural/residents with limited connectivity** – May experience slow networks, intermittent offline use, older device hardware. |
| **Physical Environment** | • **Office visits:** Fluorescent lighting, shared desktop kiosks, waiting‑room info screens.<br>• **Home:** Wide variety – old tablets, smartphones, varying lighting, possible background noise, one‑handed use while holding a child.<br>• **On‑the‑go:** Smartphones in bright sunlight, commuting, possible glove use (winter), limited bandwidth on public transport. |
| **Social Environment** | • Often visited with family members, advisors, or caregivers (four‑eyes principle for official matters).<br>• Language assistance may be required; cultural sensitivity for diverse backgrounds.<br>• Trust in government systems is a factor; fear of making mistakes online is common. |
| **Technical Environment** | • **Web app:** React/Vue/Svelte + Tailwind, responsive from 320px to 1600px+.<br>• **Mobile:** PWA / native‑like, iOS 13+ / Android 10+.<br>• **Browsers:** Latest Chrome, Edge, Safari; fallback for older Android WebView if needed.<br>• **Network:** Municipal Wi‑Fi may be slow/unstable; partial offline support (cache last visited page, queue appointment request for sync).<br>• **Devices:** Desktop monitors (1920×1080+), laptops, iOS smartphones, Android smartphones, tablets (iPad/mini).<br>• **Accessibility:** Screen readers (NVDA, VoiceOver), keyboard‑only navigation (`Tab`/`Enter`/`Esc`), 200 % zoom, `prefers‑reduced‑motion`, high‑contrast modes. |

---

## 2. Primary Context Persona

| Attribute | Value |
|-----------|-------|
| **Name** | Erika Müller |
| **Age** | 72 |
| **Role** | Retired citizen |
| **Core Goal** | Book a passport appointment at the local Bürgeramt without needing help from family. |
| **Task Frequency** | Rare (once every 3–5 years) |
| **Digital Literacy** | Low‑medium; comfortable with basic web forms but anxious about errors. |
| **Preferred Device** | Desktop at home; occasionally asks grandchildren to help on their phones. |
| **Situational Constraints** | • Moderate vision impairment (wears reading glasses, sometimes 150 % system zoom)<br>• Arthritis in hands → fine‑motor difficulty, prefers larger touch targets & keyboard shortcuts<br>• Cautious about online data entry; fears submitting wrong information<br>• Prefers plain language; technical jargon causes confusion<br>• Often has family nearby but wants to be independent |
| **Primary Pain Points (Current “As‑Is”)** | - Forms that clear entirely on error → must re‑enter all data<br>- Tiny error messages hidden below the fold<br>- Unclear which documents are actually required<br>- No visual confirmation after submission<br>- Language that feels “official” and distant<br>- Having to remember appointment numbers or reference codes without a way to retrieve them |

---

## 3. Accessibility / Edge‑Case Persona

| Attribute | Value |
|-----------|-------|
| **Name** | Karim Al‑Hadi |
| **Age** | 34 |
| **Role** | Mobile‑first user, uses wheelchair |
| **Core Goal** | Book a citizenship certificate appointment quickly while commuting, using only a smartphone. |
| **Assistive Technology / Modality** | • Screen reader: VoiceOver (iOS) / NVDA (Windows)<br>• Keyboard‑only navigation (no mouse)<br>• 300 % font scaling<br>• High‑contrast mode enabled<br>• Reduced‑motion preference (`prefers-reduced-motion: reduce`) |
| **Visual/Motor Constraints** | • Moderate red‑green color blindness → cannot rely on color‑only status indicators<br>• Touch targets must be ≥ 48 × 48 px (ideally 48 px minimum, 64 px with surrounding padding)<br>• Limited dexterity → prefers large tap areas, avoids tiny links/buttons<br>• May use a stylus or adaptive input device |
| **Critical UI Barriers to Avoid** | - `<div onClick>` without `role="button"` or keyboard focusability<br>- Color‑only error/success states (e.g., “red field = error” without text)<br>- Auto‑timed modals or page overlays that trap focus<br>- Missing `<label>` associations for form controls<br>- `placeholder` used as `<label>` replacement<br>- Links or buttons with ambiguous text (“Submit”, “Click here”)<br>- Content that moves or animates without a way to pause/reduce motion |
| **Expected Support** | - Clear, descriptive error messages that announce via screen reader<br>- Focus visible outline on every interactive element<br>- Logical tab order that follows visual flow<br>- Inline validation that does **not** wipe the form on failure<br>- “Undo” action for critical submissions (e.g., “Appointment booked – Undo” banner)<br>- All interactive elements reachable via `Tab` and activatable via `Enter` or `Space` |

---

## 4. Core Domain & Terminology Conventions

| Technical Term (Internal) | User‑Facing Mental Model | Input / Validation Rules |
|---------------------------|------------------------|--------------------------|
| `appointmentDate` | “Termin wählen” | Auto‑format: `TT.MM.JJJJ`. Disable past dates. Show calendar overlay. |
| `postalCode` | “PLZ” | Auto‑strip spaces, validate 5‑digit German format, suggest city after entry. |
| `city` | “Ort” | Case‑insensitive search, auto‑complete from official list, do **not** require exact spelling. |
| `documentUpload` | “Unterlagen hochladen” | Accept PDF, JPG, PNG max 10 MB. Show preview. Preserve uploaded files on validation error (do not clear). |
| `formSubmit` | “Termin anfragen” | Inline validation only; on error, highlight invalid fields, keep entered data, announce error count via screen reader. |
| `confirmationNumber` | “Bestätigungsnummer” | Shown immediately after successful submission; offer “E‑Mail senden” option; never require memorization (provide QR code / barcode for mobile). |
| `undoAction` | „Ändern / Abbrechen“ | Inline “Appointment geändert” banner with “Rückgängig” button for 5 min after submission. |

---

### How to Use These Artifacts
- **Future UX Reviews / Cognitive Walkthroughs:** Reference Erika (Primary) and Karim (Accessibility) to trace step‑by‑step through any new flow, form, or component.
- **New Feature Planning:** Use the Context of Use table to ground assumptions about user groups, environments, and constraints before writing requirements or designing UI.
- **Usability Test Tasks:** Frame scenarios using the personas’ goals and pain points (e.g., “Erika wants to book a passport appointment without help. She opens the page on her desktop…”).
- **Persisting:** Copy this file to `docs/ux/personas.md` in your repository. Future team members can reuse, extend, or version‑control it alongside `docs/ux/requirements-<feature>.md` and `docs/ux/usability-test-<feature>.md`.

*Generated following ISO 9241‑11, ISO 9241‑110:2020, and CPUX (ISO 9241‑210) methodology. All personas are realistic, reusable, and designed to keep user‑centered decision‑making consistent across the project.*

---

<details>
<summary>❌ Click to view Baseline Output WITHOUT Skill (3/3 Passed)</summary>

# 👥 Wiederverwendbare Projekt-Personas & Nutzungskontext für das Bürgeramt-Terminbuchungssystem

Hier sind strukturierte, wiederverwendbare Personas und ein Nutzungskontext, die du direkt in deinem Repository ablegen kannst (z. B. als `docs/personas.md` oder `ux/context.md`). Sie sind so gestaltet, dass sie flexibel für Web- und Mobile-Design, Usability-Tests und Feature-Priorisierungen eingesetzt werden können.

---

## 1. Wiederverwendbare Personas

Jede Persona enthält die Kernfelder: **Demografie, Technologie-Literacy, Ziele, Schmerzpunkte, bevorzugte Geräte & Kontext.** Du kannst diese Vorlage erweitern, ohne das Format zu ändern.

### 🧓 Persona A: "Seniorin Margarete"
- **Alter:** 72 Jahre
- **Wohnort:** Wohngebiet mit guter Anbindung, aber eher geringes mobiles Internet
- **Technologie-Literacy:** Grundlegend bis intermediär. Nutzt Smartphone hauptsächlich für Anrufe und Fotos. Tablet oder PC nur für einfache Webseiten.
- **Ziele:** Termin beim Bürgeramt vereinbaren, ohne sich in neue Technologien einarbeiten zu müssen. Klare Anweisungen, große Buttons.
- **Schmerzpunkte:** Kleine Schrift, komplexe Navigation, Angst, etwas "falsch zu machen". Präferiert telefonische oder persönliche Kontaktmöglichkeit.
- **Bevorzugte Geräte:** Großes Smartphone (max. 6 Zoll), eventuell Tablet. Kein Interesse an App-Downloads.
- **Kontext:** Termin für Rentenversicherung oder Führerscheinverlängerung. Oft begleitet von einer Enkelin oder Nachbarin.

### 💼 Persona B: "Berufstätige/r Florian"
- **Alter:** 34 Jahre
- **Wohnort:** Stadtzentrum, gut vernetzt
- **Technologie-Literacy:** Hoch. Gewohnt, Apps und Web-Oberflächen täglich zu nutzen.
- **Ziele:** Termin in der Mittagspause oder nach Feierabend schnell buchen. Bestätigung per Kalender-App (Google/Outlook).
- **Schmerzpunkte:** Langer Ladevorgang, zu viele Klicks, keine Integration in eigene Kalender. Erwartet "One-Click"- oder "Autofill"-Erfahrung.
- **Bevorzugte Geräte:** Smartphone (primär), gelegentlich Desktop am Arbeitsplatz.
- **Kontext:** Termin für Meldebescheinigung oder Kfz-Zulassung. Muss oft zwischen mehreren Terminen wählen (Arzt, Behörde, Behörde).

### 👨‍👧 Persona C: "Elternteil Sabine"
- **Alter:** 39 Jahre
- **Wohnort:** Vorort, Familie
- **Technologie-Literacy:** Hoch. Nutzt Familie-Apps und Terminmanager.
- **Ziele:** Termine für Kind(er) und sich selbst in einem Rutsch buchen. Mehrere Personen/Termine pro Tag. Bestätigung per E-Mail an Partner/in.
- **Schmerzpunkte:** Keine Möglichkeit, mehrere Termine pro Buchungsvorgang zu verknüpfen. Kein "Gruppentermin"-Modus. Kompliziertes Auswählen von Angehörigen.
- **Bevorzugte Geräte:** Smartphone (unterwegs), Tablet zu Hause.
- **Kontext:** Impftermin, KiTa-Anmeldung, Schulamt. Begleitpersonen (Partner, Großeltern) sollen ebenfalls informiert werden.

### ♿ Persona D: "Person mit Einschränkungen / Accessibility-Focus"
- **Alter:** variabel (25–60 Jahre)
- **Wohnort:** Stadt oder Land
- **Technologie-Literacy:** Individuell, nutzt Assistenztechnologien.
- **Ziele:** Barrierefreien Zugang gewährleistet. Termin ohne fremde Hilfe buchen. Screenreader-kompatibel.
- **Schmerzpunkte:** Nicht kompatibel mit Screenreadern, fehlende Tastaturnavigation, kontrastarme Oberflächen, automatische Wiedergabe von Audio, nicht-respektierte Sprachpräferenzen.
- **Bevorzugte Geräte:** Jedes Gerät, das Accessibility-Features unterstützt (iOS VoiceOver, Android TalkBack).
- **Kontext:** Termin für Behindertenausweis, Schwerbehinderten-Ausgleichsleistung oder Arzttermin. Präferiert klare Sprachführung und logische Struktur.

### 📱 Persona E: "Digital-native Lena"
- **Alter:** 22 Jahre
- **Wohnort:** Stadt, mobil-first Aufwachsen
- **Technologie-Literacy:** Sehr hoch. Erwartet moderne UI/UX-Muster, Dark Mode, Progressive Web App Verhalten.
- **Ziele:** Schnelle Terminfindung, visuelle Bestätigung (Kalender-Icon), Teilen per Social Media oder Link.
- **Schmerzpunkte:** Veraltete Optik, keine Offline-Funktion, lange Bestätigungsseiten ohne Share-Option. Langweilige Fehlervalidierung.
- **Bevorzugte Geräte:** Smartphone (always), bevorzugt responsive Web-App statt native App Download.
- **Kontext:** Erster Kontakt mit der Stadtverwaltung (z. B. Führerschein-Umschreibung, Meldezettel). Nutzt die Seite oft "nebenbei" beim Fernsehen oder Warten.

---

## 2. Nutzungskontext (Usage Context)

Dieser Block definiert die Rahmenbedingungen, unter denen alle Personas das System nutzen. Er hilft dem Team, design- und entwicklungstechnische Entscheidungen schnell zu begründen.

### 🌍 Allgemeine Rahmenbedingungen
- **Ziel der Seite:** Termine für alle gängigen Bürgeramt-Leistungen (Meldewesen, Kfz, Soziales, Schule/KiTa) buchen, ändern oder stornieren.
- **Zielgruppe:** Alle Einwohner der Gemeinde, unabhängig Alter, Herkunft oder Fähigkeit.
- **Erfolgsmetriken:** Abschlussrate der Buchung (< 3 Klicks bis Bestätigung), Abbruchquote bei bestimmten Personas, Zufriedenheit (SUS Score), Barrierefreiheits-Konformität (WCAG 2.1 AA).
- **Sprache:** Deutsch (Standard). Optionale Sprachauswahl für häufige Fremdsprachen (z. B. Englisch, Türkisch, Arabisch) – muss in den Personas berücksichtigt werden.

### 📍 Szenarien & Touchpoints
| Szenario | Wer ist beteiligt? | Gerät | Wichtigste KPIs |
|----------|-------------------|-------|----------------|
| **Morgens vor der Arbeit** | Berufstätige/r Florian | Smartphone | Schnelle Buchung (< 2 min), Kalender-Integration |
| **Mittagspause – Kind im KiTa-Notfall** | Elternteil Sabine | Tablet/Smartphone | Mehrere Termine buchen, E-Mail-Bestätigung an Partner |
| **Nachmittags – Senior besucht Amt** | Seniorin Margarete | Großes Smartphone/PC | Große Schrift, einfache Navigation, "Termin anfordern per Post/Telefon" Button |
| **Abends – Barrierefreier Zugang** | Person mit Einschränkungen | Jedes Gerät (getestet mit Screenreader) | Vollständige Tastaturnavigation, ARIA-Labels, Kontrast |
| **Erstmaliger Kontakt – Young Adult** | Digital-native Lena | Smartphone | Visuelle Ansprache, Share-Link, Dark Mode |

### 🔁 Wiederkehrende Nutzer-Flows
1. **Termin finden & auswählen** – Filter nach Dienstleistung, Datum, Uhrzeit, Standort.
2. **Kontaktdaten erfassen** – Minimal necessary fields (Name, Telefon, E-Mail, Wohnanschrift optional).
3. **Bestätigung wählen** – E-Mail/SMS, Kalender-Export (.ics), Reminder-Termin.
4. **Ändern/Stornieren** – Ein-Klick-Zugang zu bestehenden Terminen per Bestätigungslink.

### ♿ Accessibility & Inklusion Baseline
- Tastaturnavigation vollständig möglich (Tab-Order logisch).
- Kontrastverhältnis ≥ 4.5:1 für Text und UI-Elemente.
- Alle Funktionen per Screenreader nutzbar (VoiceOver, TalkBack).
- Sprachwahl am Anfang des Prozesses (Deutsch/Englisch/Weitere).
- Fehlermeldungen klar formuliert und mit Vorschlag zur Korrektur.

### 📦 Wie das Team die Vorlagen nutzt
- **UX-Reviews:** Jede Designentscheidung wird gegen die Personas geprüft ("Löst das das Problem von Persona C?"). Notizen direkt in den Kommentaren der Figma/Adobe-XD-Dateien.
- **Priorisierung:** Wenn ein Schmerzpunkt z. B. "zu viele Klicks für Seniorin Margarete" auftritt, hat das höhere Priorität als visuelle Effekte für Persona E.
- **Testskripte:** Personas werden als Basis für Moderation von Usability-Tests genommen ("Bitte stellen Sie sich vor, Sie wären Margarete...").
- **Entwickler-Dokumentation:** Kontext-Felder helfen bei der Definition von Acceptance Criteria im Backlog (z. B. "Terminbestätigung muss .ics-Format unterstützen für Persona B").

---

## 📂 Vorschlag für die Repository-Struktur

```
/docs/
  personas.md          ← Inhalte aus diesem Chat (abgespeichert)
  usage-context.md     ← Obiger "Nutzungskontext"-Block
  persona-template.md  ← Leere Vorlage für neue Personas (siehe unten)
/ux/
  research/
    interview-guides/
      persona-a-senior.md
      persona-b-professional.md
    test-scripts/
  designs/
    figma/
      citizen-booking/
        flows/
        components/
```

### Leere Persona-Vorlage (kann im Repo abgelegt werden):
```markdown
# Persona: [Name]

## Demografie
- Alter: _
- Wohnort: _
- Haushaltsstruktur: _

## Technologie-Literacy
- Selbstbewertung: (Low / Medium / High)
- Geräte: _

## Ziele bei dieser Buchung
- _

## Schmerzpunkte (Current Pain)
- _

## Präferierte Geräte & Kanäle
- _

## Kontext & Besonderheiten
- _

## Akzeptanzkriterien für Design/Entwicklung
- _
```

---

### 💡 Tipp für das Team
Speichere diese Dateien als **Markdown** im Repo, damit sie in GitHub/GitLab direkt lesbar sind und von jedem Teammitglied ohne spezielles Tool eingesehen werden können. Du kannst sie auch als **YAML** speichern, wenn du sie automatisiert in Design-Tools oder Prototypen laden möchtest.

Viel Erfolg beim Projekt! Wenn du noch spezifische lokale Gegebenheiten (z. B. Mehrsprachigkeit, bestimmte Bevormundungs-Regeln, Öffnungszeiten) einbauen willst, sag einfach Bescheid – dann passe ich die Vorlagen an.

</details>
