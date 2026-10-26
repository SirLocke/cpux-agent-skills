# Real-World Eval Example: `eval-06-holdout-b2b-lab-touchscreen`
> Automatically generated with `nvidia/nemotron-3.5-lightning:free` (Autonomously loaded reference: `references/context-and-requirements.md`)

## 💬 User Prompt
```text
Wir entwickeln die Touchscreen-Oberfläche für eine medizinische Labor-Zentrifuge. Laboranten tragen Nitrilhandschuhe, stehen unter Zeitdruck und müssen oft mehrere Probenläufe hintereinander starten. Manchmal geben sie versehentlich 15.000 RPM statt 1.500 RPM ein, was die Blutproben zerstört. Wie sollten wir die UX für die Lauf-Konfiguration gestalten?
```

---

## 📊 Assertion Scorecard
| Assertion | Without Skill (Baseline) | With `ux-review-walkthrough` |
| :--- | :---: | :---: |
| Analysiert zuerst den Nutzungskontext (Laborumgebung, Handschuhbedienung, Sicherheitsrisiko bei Fehleingabe) und leitet daraus lösungsneutrale Erfordernisse und Nutzungsanforderungen ab. | ❌ FAIL | ✅ PASS |
| Adressiert das 15.000 vs. 1.500 RPM Problem gezielt über das Prinzip 'Robuste Verwendung' (Use error robustness) und 'Aufgabenangemessenheit' (z. B. erprobte Programm-Presets für Blutproben statt freier Zifferneingabe, Plausibilitätsgrenzen/Warnung bei extremen Werten). | ✅ PASS | ✅ PASS |
| Berücksichtigt die physische Umgebung im Interaktionskonzept (große Touch-Targets für Nitrilhandschuhe, klare visuelle Status-Rückmeldung aus der Distanz). | ✅ PASS | ✅ PASS |

---

## ✅ Output WITH `ux-review-walkthrough` (3/3 Passed)

**UX-Design für die Lauf-Konfiguration einer medizinischen Labor-Zentrifuge**  
*(nach ISO 9241‑210 / CPUX-F – Route B: Neues Feature von Grund auf planen)*  

Ich erarbeite die vier Phasen des Human‑Centered‑Design‑Blueprints und perspektivisch die Artefakte in `docs/ux/`. Da in diesem Chat‑Kontext keine bestehende Repository‑Struktur vorliegt, liefere ich hier den vollständigen Inhalt, den du unter den genannten Pfaden ablegen kannst, um sie team‑weit wiederzuverwenden.

---
## 📁 Zu speichernde Artefakte (nach Abschluss)

| Datei | Zweck |
|---|---|
| `docs/ux/personas.md` | Projekt‑weiter Kontext von Use, Primary‑ und Accessibility‑Persona |
| `docs/ux/requirements-rpm-config.md` | User Needs, Qualitative & Quantitative User Requirements, To‑Be Walkthrough |
| (optional) `docs/ux/usability-test-rpm-config.md` | Testaufgaben, Moderator‑Guide, Schwere‑Log (Route C) |

Ich empfehle, nach dieser Antwort die Dateien `docs/ux/personas.md` und `docs/ux/requirements-rpm-config.md` gemäß der Struktur unten anzulegen bzw. falls `docs/ux/personas.md` bereits existiert, die dort hinterlegten Personen zu übernehmen und um die hier neu definierten Aspekte zu erweitern.

---
## ✅ Phase 1: Context of Use, Personas & As‑Is Scenario (*Nutzungskontext, Persona & Ist‑Szenario*)

### 1. User Group & Primary Context Persona
| Attribut | Beschreibung |
|---|---|
| **Benutzergruppe** | Laboranten/innen in klinischen und Forschungslaboren, vorwiegend right‑/left‑händig, arbeiten in Schichten, häufig unter Zeitdruck, tragen Nitrilhandschuhe, müssen mehrere Probenläufe nacheinander starten. |
| **Primary Persona – “Anna, 32”** | Senior Medical Technician, routiniert im Umgang mit der Zentrifuge, verantwortlich für die Qualitätssicherung von Blutproben. Häufige Aufgaben: Vorbereitung von Proben‑trenn‑läufen, Dokumentation, Koordination mit Kollegen. **Situative Constraints:** Nitrilhandschuhe, stehende Position, Zeitlimit von ≤ 2 Min pro Einstellungs‑schritt, häufige Unterbrechungen durch Kollegen, Hintergrundlärm, touchscreen‑Gerät, das nur Glove‑Input unterstützt. **Kern‑Goal:** “Blutproben schonend trennen, ohne Proben zu zerstören.” |
| **Accessibility / Edge‑Case Persona – “Bruno, 48”** | Junior Technician, red‑green color‑blind, unsicher im Umgang mit komplexen Menüs, bevorzugt klare numerische Eingaben. **Constraints:** Same glove‑situation, additionally: *prefers‑reduced‑motion: reduce*, target‑size sensitivity, relies on high‑contrast feedback. **Critical UI Barriers to avoid:** `<div onClick>` ohne `<button>`, farb‑only Status‑Indikatoren, kleine Touch‑Targets (< 44 px). |

### 2. Physical Environment
- Lab‑Beleuchtung: teils blendend, teils diffus; Bildschirm manchmal bei geöffnetem Deckel ablesbar.
- Körperhaltung: stehend, oft seitlich zum Screen geneigt, freie Hand hält Proben‑Racks.
- Protective Gear: Nitrilhandschuhe (reduzierte Tastempfindlichkeit, erhöhte Finger‑Dicke).

### 3. Social Environment
- “Four‑eyes‑Principle” wird oft umgangen, wenn “schnell” gehen soll.
- Peer‑Druck: “Mach mal schnell den Lauf fertig, ich muss weiter.”
- Keine formale Validierung durch zweiten Mitarbeiter bei Routine‑läufen.

### 4. Technical Environment
- Capacitive Touchscreen, explizit für Glove‑betrieb ausgelegt, aber ohne haptisches Feedback.
- Firmware erlaubt jede numerische RPM‑Eingabe ohne Ober‑/Untergrenze.
- Keine Verknüpfung mit Proben‑ID oder Protokoll‑Historie auf dem Gerät.
- Netzwerk: teilweise offline (Lokal‑Speicherung von Einstellungen).

### 5. As‑Is Scenario (*Ist‑Szenario*)
> Anna steht am Labor‑Bench, Nitrilhandschuhe an, eilige Stimmung. Sie muss einen Blut‑trenn‑Lauf mit 1.500 RPM einstellen. Der Touchscreen zeigt eine grosse numerische Eingabebox und einen “Start“-Button. Sie tippt “15000” ein – das ist ihr Fehler unter Zeitdruck, sie meint “1.500”. Die Eingabe wird akzeptiert, der Countdown startet. Nach 30 Sekunden bemerkt sie, dass der Rotor zu schnell läuft; die Blutproben sind hemolysiert. Sie startet neu, korrigiert auf “1500”, aber der Schaden ist angerichtet. Beim nächsten Lauf (nach 4 Stunden) passiert ihr dasselbe, weil die vorherige Eingabe nicht markiert oder verwarn wurde.

**Friction Points identifiziert:**
- Freitext‑ähnliche RPM‑Eingabe ohne Validierung.
- Kein Standard‑/Default‑Wert für häufigste Probenart.
- Keine physische/ logische Ober‑/Untergrenze.
- Keine Bestätigung vor Start, keine “Undo/Redo”‑Möglichkeit.
- Touch‑Targets zu klein für Handschuhe, keine haptische Rückmeldung.

---
## ✅ Phase 2: User Needs (*Erfordernisse* – Problem Space)
*Formel: “Als **[Persona]**, ich brauche **[Voraussetzung/Information/Gewissheit]**, um **[Ziel zu erreichen]**.”*

1. **Als Anna**, brauche ich **sofortige Rückmeldung, wenn die eingegebene RPM die sichere Grenze für Blutproben überschreitet**, um versehentliche Probenzerstörung zu vermeiden.  
2. **Als Anna mit Nitrilhandschuhen**, brauche ich **große, leicht treffbare Eingabebereiche**, um fehlerhafte Eingaben zu vermeiden und die Bedienbarkeit unter Handschuh‑Bedingungen zu gewährleisten.  
3. **Als Anna unter Zeitdruck**, brauche ich **standardmäßige Voreinstellungen für die häufigste Probenart (Bluttrennung)**, um Zeit zu sparen und das Risiko von Tipp‑Fehlern zu reduzieren.  
4. **Als Anna, die mehrere Probenläufe hintereinander startet**, brauche ich **eine explizite Bestätigung und die Möglichkeit, die letzte RPM‑Eingabe vor dem Start zu korrigieren oder rückgängig zu machen**, um versehentliche Extremwerte zu verhindern.

*Kein einziges Mal wurde ein UI‑Widget (Button, Feld, Screen, etc.) genannt. Die Bedürfnisse bleiben lösungsneutral.*

---
## ✅ Phase 3: User Requirements (*Nutzungsanforderungen* – Solution Constraints)

### 3.1 Qualitative User Requirements (cross‑referenziert an ISO 9241‑110:2020)

| Anforderung | ISO 9241‑110 Prinzip | Begründung |
|---|---|---|
| **Q1:** Am System muss jederzeit erkennbar sein, ob die eingegebene RPM den biologischen/physikalischen Grenzen für Blutproben entspricht. | **Aufgabenangemessenheit** | Der Anwender muss erkennen können, ob die Unterstützung der Aufgabe (Proben­trennung) gewährleistet ist. |
| **Q2:** Am System darf die RPM‑Eingabe Werte unter 500 oder über 5 000 nicht akzeptieren, es sei denn, es liegt eine explizite, bestätigte Ausnahme vor. | **Robuste Verwendung** | Das System nimmt dem Anwender die Möglichkeit, einen Fehler zu machen, der das System (Proben) gefährdet. |
| **Q3:** Am System muss für die RPM‑Eingabe eine voreingestellte Standard‑RPM für “Bluttrennung” verfügbar sein, die bei Bedarf überschrieben werden kann. | **Selbstbeschreibungsfähigkeit** | Der Zustand des Systems ist ohne weitere Erklärungen sofort erkennbar und nachvollziehbar. |
| **Q4:** Am muss der Anwender in der Lage sein, die RPM‑Eingabe vor dem Start des Laufs zu bearbeiten, zu bestätigen oder zu verwerfen. | **Steuerbarkeit** | Der Anwender behält die Kontrolle über den Eingabe‑Prozess, bevor eine irreversible Aktion ausgelöst wird. |

### 3.2 Quantitative User Requirements (ISO 9241‑11 Messgrössen)

| Messgrösse | Anforderung | Begründung |
|---|---|---|
| **Effectiveness** (Genauigkeit) | Mindestens **95 %** der Probanden (mit Nitrilhandschuhen, unter Zeitdruck) dürfen bei einem standardisierten “Bluttrennung‑Szenario” keine RPM‑Eingabe außerhalb von 500–5 000 vornehmen, die einen Lauf starten könnte. | Vermeidung von Probenzerstörung als Erfolgs‑Kriterium. |
| **Efficiency** (Ressourcen‑Aufwand) | Die RPM‑Eingabe inklusive Validierung und Standard‑Default muss für den 80‑%‑Fall in **≤ 10 Sekunden** erledigt sein. | Zeitersparnis bei gleichzeitiger Fehlerprävention. |
| **Satisfaction** (Zufriedenheit) | SUS‑Score ≥ **80** für die Konfigurations‑Spezifisch‑RPM‑Ansicht, speziell bezogen auf “Sicherheit unter Handschuh‑Bedingungen” und “Schleunigungs‑Wahrnehmung”. | Akzeptanz der Lösung bei den Anwender‑innen. |

---
## ✅ Phase 4: To‑Be Walkthrough (*Soll‑Szenario*) & Konkrete Interaktions‑Konzeption

### 4.1 Step‑by‑Step To‑Be Scenario (*Soll‑Szenario*) für “Anna”

1. **Trigger:** Anna tippt “Bluttrennung” in das Proben‑Typ‑Feld (oder das System schlägt basierend auf Historie den häufigsten Typ vor).  
2. **Smart Default:** Das RPM‑Feld zeigt automatisch **1 500 RPM** als voreingestellten Wert an (letzter gültiger Wert für diesen Proben‑Typ, gespeichert in der Geräte‑Historie).  
3. **Inline Validation (während der Eingabe):**  
   - Tippt Anna “15 000” ein, **schwingt das Feld rot**, es erscheint ein Tooltip (hochkontrast, textbasiert, nicht farb‑only):  
     > “Warnung: 15 000 RPM überschreitet die sichere Grenze für Blutproben. Der Rotor würde die Proben zerstören. Möchten Sie trotzdem fortfahren?”  
   - Tippt Anna “1 500” ein, **schwingt das Feld grün**, die Meldung verschwindet.  
4. **Touch‑Target‑Compliance:** Das RPM‑Feld und der “Start“-Button haben mindestens **48 × 48 px** (idealer 60 × 60 px) klickbare Fläche, ausreichend für Nitril‑Handschuhe, mit dezentem Taptic‑Feedback bei Bestätigung.  
5. **Bestätigung vor Start:** Sobald Anna auf “Start” tippt, erscheint ein **nicht‑weggleitendes** Modal:  
   - Überschrift: “Lauf starten – 1 500 RPM?”  
   - Zwei Buttons: “Bestätigen” (rot/hochkontrast) und “Ändern” (grau).  
   - Unten steht in kleinerem Font: “Letzte Eingabe war 15 000 RPM – ändern empfohlen.”  
6. **Start:** Bestätigt Anna, beginnt der Countdown. Ändert sie, kehrt sie zum RPM‑Feld zurück, korrigiert auf 1 500 und der Zyklus beginnt von Schritt 3 erneut.  
7. **Erfolg:** Nach erfolgreichem Start blendet das System kurz “Lauf läuft – 1 500 RPM” ein, kehrt dann zur Übersicht zurück und protokolliert den Einstellungs‑Verlauf.

### 4.2 Konkrete UI‑Architektur & Controls (Lösungsspace)

| Element | Umsetzung (zugänglich, glove‑friendly) |
|---|---|
| **RPM‑Eingabefeld** | Numerisches Tastatur‑Overlay, das nur Ziffern & Backspace zulässt. Inline‑Validierung in Echtzeit. Standard‑Default wird als leicht ausgeprägte Zahl (“1 500”) angezeigt, nicht als Platzhalter‑Text, der verschwindet. |
| **Range‑Guard** | System‑seitige harte Grenze: Werte < 500 oder > 5 000 werden **nicht** in das Feld akzeptiert, es sei denn, Anna aktiviert explizit einen “Schnell‑Modus” (der extra bestätigt werden will). |
| **Smart Default** | Letzter gültiger RPM‑Wert für den aktuellen Proben‑Typ wird aus der Geräte‑Historie geladen. Bei erstmaliger Nutzung: 1 500 RPM voreingestellt. |
| **Bestätigungs‑Modal** | Fokus‑gefangen (focus‑trapped), Hintergrund‑Dimmen, Buttons groß, beschriftet mit expliziten Handlungs‑Verben (“Bestätigen”, “Abbrechen”). Erscheint **niemals** automatisch ohne vorherige inline‑Warnung. |
| **Fehler‑/Offline‑State** | Siehe 5‑UI‑States unten. |
| **Erfolgs‑State** | Kurze Snackbar: “Lauf erfolgreich gestartet – 1 500 RPM” mit Option, direkt zum Protokoll zu navigieren. |

### 4.3 Die 5 UI‑States (explicit specified)

| State | Beschreibung & Verhalten |
|---|---|
| **`Empty`** | Kein Proben‑Typ ausgewählt, RPM‑Feld zeigt “--‑” oder “Standard laden…”. Keine Eingabe möglich, “Start” ist deaktiviert (disabled), bis ein gültiger Proben‑Typ gewählt ist. |
| **`Loading`** | Wird angezeigt, während die Geräte‑Historie geladen wird oder eine neue Firmware‑Validierung läuft. Spinner oder Pulse‑Animation, die **tastatur‑ und screen‑reader‑zugänglich** ist (`aria-live="polite"`). |
| **`Error / Offline`** | Falls die RPM‑Validierung fehlschlägt oder keine Verbindung zur Geräte‑Firmware besteht: Vollbild‑Modal mit Handlungs‑Option: “Einstellungen offline – Letzten gespeicherten Wert verwenden?”. Wichtige Infos sind **nicht** farb‑only; es gibt Text + Icon. |
| **`Partial / Overflow`** | Wenn Anna einen Proben‑Typ wählt, der RPM‑Bereich für diese Probenart spezifiziert (z.B. “Plasma‑Separation” mit 3 000 RPM), passt sich der Default an. Überschreitet der manuelle Wert den für den Typ erlaubten Maximalwert, wird inline gewarnt, aber die Eingabe kann nach Bestätigung dennoch erfolgen (ähnlich wie bei “Schnell‑Modus”). |
| **`Success`** | Nach Bestätigung des Starts: Snackbar “Lauf läuft – 1 500 RPM”, Rückkehr zur Übersicht. Das RPM‑Feld bleibt sichtbar und zeigt den aktuellen Wert an, ist aber nicht mehr bearbeitbar, bis der Lauf abgeschlossen ist (oder pausiert wird). |

---
## 📦 Wie du die Dateien in deinem Repository anlegst

Falls du die Artefakte persistieren möchtest, erstelle bitte folgende Markdown‑Dateien im Verzeichnis `docs/ux/`:

### `docs/ux/personas.md`
*(Inhaltliche Zusammenfassung aus Phase 1 – an deine Projekt‑Kontext‑Anpassungen anpassbar)*

```markdown
# Kontext von Use & Personas (ISO 9241‑11 / CPUX)

## User Groups
- Laboranten/innen in Klinik‑ und Forschungslaboren, vorwiegend 20‑50 Jahre, stehend, Nitrilhandschuhe, Zeitdruck, Mehrfach‑Läufe.

## Primary Context Persona – Anna, 32
- Siehe Phase 1‑Tabelle oben.

## Accessibility / Edge‑Case Persona – Bruno, 48
- Siehe Phase 1‑Tabelle oben.

## Core Domain & Terminology Conventions
- RPM‑Werte: Intern „Rotations‑Pro‑Minute“, user‑facing: “Geschwindigkeit für die Trennung”.
- Automatisches Strippen von führenden Nullen, aber Warnung bei > 5 000.
- “Standard‑RPM für Bluttrennung” = 1 500 RPM (voreingestellt, überschreibbar).
```

### `docs/ux/requirements-rpm-config.md`
*(Phasen 2 + 3 + 4 kompakt abgelegt, für Team‑Weitergabe)*

```markdown
# User Needs & Requirements – RPM‑Konfiguration (Bluttrennung)

## Phase 2 – User Needs (Erfordernisse)
1. Als Anna, brauche ich sofortige Rückmeldung, wenn die eingegebene RPM die sichere Grenze für Blutproben überschreitet, um versehentliche Probenzerstörung zu vermeiden.
2. Als Anna mit Nitrilhandschuhen, brauche ich große, leicht treffbare Eingabebereiche, um fehlerhafte Eingaben zu vermeiden und die Bedienbarkeit unter Handschuh‑Bedingungen zu gewährleisten.
3. Als Anna unter Zeitdruck, brauche ich standardmäßige Voreinstellungen für die häufigste Probenart, um Zeit zu sparen und das Risiko von Tipp‑Fehlern zu reduzieren.
4. Als Anna, die mehrere Probenläufe hintereinander startet, brauche ich eine explizite Bestätigung und die Möglichkeit, die letzte RPM‑Eingabe vor dem Start zu korrigieren oder rückgängig zu machen, um versehentliche Extremwerte zu verhindern.

## Phase 3 – Qualitative User Requirements (ISO 9241‑110)
| Anforderung | Prinzip |
|---|---|
| Am System muss jederzeit erkennbar sein, ob die eingegebene RPM den biologischen/physikalischen Grenzen für Blutproben entspricht. | Aufgabenangemessenheit |
| Am System darf die RPM‑Eingabe Werte unter 500 oder über 5 000 nicht akzeptieren, es sei denn, es liegt eine explizite, bestätigte Ausnahme vor. | Robuste Verwendung |
| Am System muss für die RPM‑Eingabe eine voreingestellte Standard‑RPM für “Bluttrennung” verfügbar sein, die bei Bedarf überschrieben werden kann. | Selbstbeschreibungsfähigkeit |
| Am System muss der Anwender in der Lage sein, die RPM‑Eingabe vor dem Start des Laufs zu bearbeiten, zu bestätigen oder zu verwerfen. | Steuerbarkeit |

## Phase 3 – Quantitative User Requirements (ISO 9241‑11)
- **Effectiveness:** ≥ 95 % der Probanden (mit Nitrilhandschuhen, unter Zeitdruck) dürfen bei standardisiertem Szenario keine RPM‑Eingabe außerhalb 500‑5 000 vornehmen, die einen Lauf starten könnte.
- **Efficiency:** RPM‑Eingabe inklusive Validierung & Standard‑Default muss im 80‑%‑Fall ≤ 10 Sekunden erledigt sein.
- **Satisfaction:** SUS‑Score ≥ 80 für die Konfigurations‑Sicht, speziell Sicherheit unter Handschuh‑Bedingungen.

## Phase 4 – To‑Be Walkthrough (Soll‑Szenario)
1. Trigger: Proben‑Typ “Bluttrennung” auswählen.
2. Smart Default: RPM‑Feld zeigt 1 500 RPM an.
3. Inline Validation: Tipp “15 000” → rotes Feld + Tooltip‑Warnung, Bestätigungs‑Modal vor Start.
4. Touch‑Target: min. 48 × 48 px, Taptic‑Feedback.
5. Bestätigungs‑Modal vor Start mit “Bestätigen” / “Ändern”.
6. Start: Countdown, Snackbar “Lauf läuft – 1 500 RPM”.
7. 5 UI‑States: Empty, Loading, Error/Offline, Partial/Overflow, Success (s. Tabelle Phase 4‑3).

## 5 UI‑States (Spezifikation)
- **Empty:** Kein Typ ausgewählt, Start deaktiviert.
- **Loading:** Historie‑Laden, screen‑reader‑zugänglicher Spinner.
- **Error/Offline:** Modal “Letzten gespeicherten Wert verwenden?”, Text + Icon.
- **Partial/Overflow:** Anpassung an Proben‑Typ‑Bereich, Warn‑Override‑Option.
- **Success:** Snackbar, RPM‑Feld zeigt aktuellen Wert, nicht bearbeitbar bis Lauf beendet.
```
---
**Hinweis:** Die obigen Dateien entsprechen der Struktur aus `references/context-and-requirements.md` und können direkt in deinem Projekt übernommen bzw. um projektspezifische Details erweitert werden. Bei bestehender `docs/ux/personas.md` prüfe bitte, ob Anna/Bruno dort bereits hinterlegt sind – falls ja, erweitere diese um die hier beschriebenen labor‑spezifischen Constraints, anstatt neue zu duplizieren.

---

<details>
<summary>❌ Click to view Baseline Output WITHOUT Skill (2/3 Passed)</summary>

# UX Design for Centrifuge Run Configuration
## Core Problem
A 10× difference between 1,500 RPM and 15,000 RPM can hemolyze blood samples. With gloved hands, time pressure, and repetitive batch workflows, free-text or unconstrained numeric entry is a high-risk pattern.

Below are concrete, standards-aligned UX strategies to eliminate this class of error.

---

## 1. Replace Free-Text RPM Entry with a Constrained Spinner
| Why | Design Pattern |
|-----|----------------|
| Gloves reduce precision; users may fat-finger adjacent digits | Use a **wheel/spinner component** with discrete steps (e.g., 100 RPM increments) rather than an open keyboard |
| Unconstrained input allows impossible/unsafe values | Set **hard min/max bounds** matching the device’s certified range and the lab’s protocol envelope |
| Quick scanning of values | Show the value large and centrally; label units clearly (`RPM`) below or beside it |

**Implementation:**
- Vertical spinner with visible increment/decrement buttons (large hit targets: ≥48dp/10mm)
- Default to the most frequently used protocol value (e.g., 1,500 RPM)
- Programmatically disable values that violate the current rotor/Tube-type configuration

---

## 2. Visual & Contextual Safeguards
- **Color/Warning on Out-of-Range:** If the user spins above the protocol-defined maximum for the selected tube/rotor, the value turns amber/red and a concise inline message appears:  
  > “⚠️ Exceeds max RPM for this rotor. Sample integrity may be compromised.”
- **RCF ↔ RPM Toggle (Optional but Recommended):** Many labs think in RCF (relative centrifugal force). Offer a locked conversion so users can’t accidentally switch units mid-protocol.
- **Last-Used/Recalled Protocol Banner:** When a saved protocol is loaded, the RPM field is pre-filled and **read-only** unless the user explicitly unlocks “expert mode.” This prevents accidental overrides.

---

## 3. Workflow for Multiple Batch Runs
| Pain Point | UX Solution |
|------------|-------------|
| Starting 10+ runs per shift | **Protocol carousel/shelf**: Users drag/drop or tap a saved protocol tile. The RPM, time, and rotor are already configured. |
| Repetitive manual entry | **“Duplicate Last Run”** button on the home screen. Pre-fills all parameters; user only confirms or adjusts count. |
| Fear of missing a step | **Linear wizard with “Back” protection**: Each screen (Sample → Parameters → Start) is discrete. The RPM screen cannot be skipped or bypassed without a value. |
| Time pressure | **Keyboard shortcuts** (if the screen also accepts a hardware keypad) or **voice-assisted confirmation** (where permitted by the facility’s infection control policy). |

---

## 4. Glove-Friendly Touch Design
- Minimum touch target: **48–50 dp vertically/horizontally**, with at least **10–15 dp spacing** between numeric spinners.
- Avoid sliders for precise RPM entry—they’re difficult to control with nitrile gloves and lack tactile stops.
- Provide **subtle haptic or audio feedback** on each spinner tap (confirming registration without being disruptive).
- Use high-contrast text/background (≥4.5:1 AA) and avoid glossy finishes that create glare under operating lights.

---

## 5. Error Recovery & Undo
- **Immediate undo prompt** after any parameter change: “↩️ Change saved. Tap to revert.”
- **Last-5-runs carousel** at the bottom of the parameter screen, showing the last selected RPM/time so users can quickly spot a mistake.
- **Clear, distinct “Reset”** button (not next to “Start”) that reverts all fields to protocol defaults.

---

## 6. Compliance & Usability Engineering
- Follow **IEC 62366-1** (usability engineering of medical devices) and **IEC 60601-1** (general safety).
- Conduct **gloved-hand usability testing** with at least 5–7 technicians under simulated time pressure.
- Document the risk control: *“Input validation prevents RPM entry outside certified/ protocol-defined range.”*
- Log configuration changes in the device audit trail (helps trace if an error did occur).

---

## Quick Design Checklist
- [ ] Spinner or stepper for RPM, not free-text
- [ ] Hard min/max bounds tied to rotor/tube type
- [ ] Default to standard protocol value
- [ ] Inline warning if value exceeds safe range
- [ ] ≥48dp touch targets, 10+dp spacing
- [ ] “Duplicate last run” or protocol tiles for batch workflows
- [ ] Undo/revert on parameter change
- [ ] Audit trail for configuration changes
- [ ] Tested with gloved users under time pressure

Would you like a low-fidelity wireframe concept, a component spec sheet, or a usability test script template for this scenario?

</details>
