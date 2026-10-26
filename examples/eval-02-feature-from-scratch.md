# Real-World Eval Example: `eval-02-feature-from-scratch`
> Automatically generated with `nvidia/nemotron-3.5-lightning:free` (Autonomously loaded reference: `references/context-and-requirements.md`)

## 💬 User Prompt
```text
Wir bauen eine Web-App für unseren Handwerksbetrieb. Die Monteure brauchen unterwegs auf der Baustelle eine Funktion, um schnell Material nachzubestellen, wenn im Lieferwagen etwas leer geht. Wie würdest du die UX dafür aufbauen?
```

---

## 📊 Assertion Scorecard
| Assertion | Without Skill (Baseline) | With `ux-review-walkthrough` |
| :--- | :---: | :---: |
| Beginnt mit der Analyse des Nutzungskontexts, einer konkreten Persona und einem Ist-Szenario (As-Is Scenario), bevor konkrete UI-Lösungen vorgeschlagen werden. | ❌ FAIL | ✅ PASS |
| Trennt den Problemraum vom Lösungsraum: Der Abschnitt 'Erfordernisse (User Needs)' beschreibt nur das fachliche Bedürfnis des Nutzers und schreibt dort noch keine konkreten UI-Steuerelemente (wie Dropdowns, Modals oder Buttons) vor (im späteren Abschnitt 'Interaktionskonzept' dürfen und sollen natürlich konkrete UI-Elemente genannt werden). | ✅ PASS | ✅ PASS |
| Beinhaltet konkrete Nutzungsanforderungen (inkl. messbarer quantitativer Kriterien nach ISO 9241-11) sowie ein abschließendes Soll-Szenario / Interaktionskonzept, das auf die physischen Einschränkungen vor Ort eingeht. | ✅ PASS | ✅ PASS |

---

## ✅ Output WITH `ux-review-walkthrough` (3/3 Passed)

**UX-Entwurf für "Schnelle Material-Nachbestellung" im Handwerks-Web-App-Kontext**

Ich strukturiere das nach ISO 9241‑210 / CPUX (Human‑Centered Design) in vier klar getrennten Phasen. Unten findest du das vollständige Blaupause‑Design, das du später in `docs/ux/` persistieren kannst (Personas nach `../assets/personas-template.md`, Anforderungen nach `docs/ux/requirements-<slug>.md`).

---
## Phase 1: Context of Use, Personas & As‑Is Szenario
*(Nutzungskontext, Persona & Ist‑Szenario)*

| **User Group / Benutzergruppe** | Monteure (Dachdecker, Maler, Elektriker etc.), oft 25‑60 Jahre, varying tech‑affinity, arbeiten überwiegend draußen auf Baustellen |
|---|---|
| **Physical Environment** | Starkes Sonnenlicht/Glare, Staub, manchmal nasse/hands‑schweißige Hände, stehend/beweglich, häufig Handschuhe (Arbeitshandschuhe) |
| **Social Environment** | Oft allein unterwegs, bei größeren Teams „Vier‑Augen‑Prinzip“ für Bestellungen, gelegentliche Rücksprache mit Büro/Leitung |
| **Technical Environment** | Rugged Smartphone oder Tablet (iOS/Android), mobile Browser oder PWA, Netzwerk: meist 4G/5G, aber häufig Edge‑Zonen oder kurze Offline-Phasen, GPS verfügbar, Kamera für Barcode/QR‑Scan |
| **Primary Persona** | **Rolf**, 38, Dachdecker<br>• Kernziel: Material auf der Baustelle nachbestellen, ohne Zeit zu verlieren<br>• Aufgabenhäufigkeit: täglich 1‑3x<br>• Expertise: routiniert im Umgang mit Material, aber Hass auf langes Tippen auf dem Handy mit Handschuhen<br>• Schmerzpunkte: Büro erreichen, Artikelnummer parat haben, unsichere Lieferzeit, Papierlisten veralten schnell |
| **Accessibility / Edge‑Case Persona** | **Sabine**, 55, Malerin<br>• Nutzt Tablet mit 200 % Zoom<br>• Rote‑Grün‑Sehschwäche<br>• Tastatur‑/Nur‑Tab‑Navigation (kein Maus‑Use‑Case)<br>• „prefers‑reduced‑motion: reduce“<br>• Kritische UI‑Barrieren: `<div onClick>` ohne `<button>`, farb‑only Status‑Indikatoren, kleine Touch‑Targets |

**As‑Is Szenario (Ist‑Szenario):**
Rolf merkt, dass ein Spezial‑Schraub‑Set zur Neige geht. Er ruft im Büro an, wird weitergegeben, muss die Artikelnummer nennen, das Büro prüft das Lager, gibt Rückmeldung – bei schlechtem Empfang bricht das Gespräch ab. Alternativ schreibt er sich Zettel Zettel, die er später im Büro vergisst. Ergebnis: Verzögerung von 30‑90 Min, mögliche Fehllieferung, administrativer Aufwand.

---
## Phase 2: User Needs (Erfordernisse) – Problem Space
*(Strictly solution‑neutral. No UI widgets mentioned.)*

Als **Rolf** benötige ich während der Arbeit auf der Baustelle die **Gewissheit, das exakt richtige Ersatzmaterial zu identifizieren, ohne die Artikelnummer kennen zu müssen**, um Fehlbestellungen zu vermeiden.

Als **Rolf** benötige ich auch bei **schlechter Netzabdeckung oder unterbrochenem Internetzugriff** jederzeit Zugriff auf die Bestellfunktion und dass lokale Eingaben **zwischengespeichert** werden, sobald die Verbindung wieder da ist.

Als **Rolf** mit **Arbeitshandschuhen** benötige ich eine Oberfläche mit **großen Touch‑Zielen** und **minimalen Eingabeschritten**, damit ich die Bedienung nicht abnehmen muss.

Als **Sabine** (Sehschwäche, 200 % Zoom) benötige ich, dass alle Status‑ und Fehler‑Meldungen **hinreichend kontrastreich** und **nicht‑nur‑farbabhängig** sind.

Als **Monteur‑Team** benötige ich eine **nachvollziehbare Bestellhistorie**, die im Büro eingesehen werden kann, um das Vier‑Augen‑Prinzip zu unterstützen.

---
## Phase 3: User Requirements (Nutzungsanforderungen) – Solution Constraints

### Qualitative Nutzungsanforderungen
- **Erkennbarkeit:** Am System muss jederzeit erkennbar sein, ob eine nachbestellte Charge erfolgreich übermittelt wurde oder lokal für später gespeichert wurde.
- **Auswählbarkeit:** Am System muss der Benutzer in der Lage sein, ein Material aus einer **vorgeschlagenen, validierten Liste** auszuwählen (keine freien Texteingaben für Artikelnummern).
- **Rückgängigmachbarkeit:** Am System muss jede offene Bestellung vor dem endgültigen Absenden **rückgängig gemacht werden können** mit expliziter Bestätigungs‑Aktion („Bestellung widerrufen“).
- **Offline‑Fähigkeit:** Am System müssen Eingaben auch ohne aktive Netzwerkverbindung akzeptiert und **synchronisiert** werden, sobald eine Verbindung besteht.

### Quantitative Nutzungsanforderungen (ISO 9241‑11)
- **Effektivität:** Mindestens **95 %** der erprobten Monteure können eine Standard‑Nachbestellung eines regulären Artikels **fehlerfrei in ≤ 45 Sekunden** abschließen. Critical input error rate = 0 %.
- **Effizienz:** Median Time‑on‑Task für den 80 %‑Standardfall ≤ **3 Interaktionen** (Tippen/Selektion) von der Erkenntnis „Material ist leer“ bis zur Bestellbestätigung.
- **Zufriedenheit:** SUS‑Score ≥ **80** bei der Zielgruppe; zudem dürfen **0 %** der Tester „sehr schwierig“ oder „frustrierend“ bei der Bestellung bewerten.

---
## Phase 4: To‑Be Walkthrough (Soll‑Szenario) & Interaktionskonzept
*(Step‑by‑step flow + 5 UI States)*

### Schritt‑für‑Schritt To‑Be Szenario (Soll‑Szenario)
1. **Trigger:** Rolf bemerkt auf der Baustelle, dass ein Material zur Neige geht. Er öffnet die App auf seinem Smartphone (Schlüssel‑Icon oder „Nachbestellen“ CTA auf dem Start‑Bildschirm).
2. **Material‑Auswahl:** Die App zeigt eine **kategorisierte, alphabetisch sortierte Liste** der häufig nachbestellten Artikel (Smart‑Defaults: zuletzt bestellte oben). Rolf tippt einmal auf den Eintrag – die Liste wurde vorher anhand seiner Standort‑/Profil‑Daten gefiltert.
3. **Menge & Bestätigung:** Er gibt die benötigte Menge ein (großes Touch‑Target, Eingabebereich automatisch aktiviert). Die App prüft plausibilität (z. B. max. Paket‑Anzahl) und zeigt eine **inline‑Bestätigung** („3 × Dachschrauben‑Set – passend für Profil X“).
4. **Bestätigung mit Verb:** Er tippt auf „Nachbestellen“ (Button mit expliziter Aktion). Es erscheint ein **nicht‑wegklickbares Dialog‑Fenster** mit den Worten „Bestellung absenden?“ und zwei Buttons: „Bestätigen“ und „Abbrechen“.
5. **Abschluss:** Er tippt „Bestätigen“. Die App zeigt einen **grünen Status‑Banner**: „Nachbestellung aufgegeben – erwartet Lieferung bis Donnerstag, 14:00. An Büro weitergeleitet.“
6. **Offline‑Fall:** Wäre kein Netzwerk da, würde der Banner lauten: „Bestellung lokal gespeichert. Sobald das Netz verfügbar ist, wird sie automatisch gesendet. Du kannst sie jetzt schon im Büro einsehen.“
7. **Synchronisation:** Im Hintergrund läuft ein stiller Sync‑Indikator (kein störender Spinner bei jedem Blick). Bei Rückkehr ins Büro erscheint eine Push‑Notification oder ein Banner im Admin‑Dashboard.

### Concrete UI Architecture & Controls
- **Smart Defaults & Presets:** Letzte 5 bestellte Artikel werden oben angezeigt („Smart Defaults“ nach Aufgabenangemessenheit). Freitext‑Eingabe wird komplett vermieden; Auswahl aus einer validierten Material‑Liste.
- **Error Prevention & Plausibility Guards:** Inline‑Validierung bei der Mengen‑Eingabe (oberer/unterer Grenzwert, Paket‑Größe). Bestätigungs‑Dialog mit expliziten Verben („Bestellen“, „Abbrechen“).
- **Physical & Accessibility Ergonomie:** Touch‑Targets mindestens **48 × 48 px** (bzw. 64 × 64 px bei Handschuh‑Use‑Case). Kontrast‑verhältnis ≥ 4.5:1 für alle Texte; Status‑Farben zusätzlich mit Icon/Text gekennzeichnet (nicht‑nur‑rot/grün).
- **Offline‑Resilienz:** IndexedDB / Cache‑First‑Strategy. Lokale Speicherung der Bestellung, automatischer Hochladen bei Verbindungs‑Wiederherstellung.

### The 5 UI States (explicitly specified)
| **State** | **Beschreibung** | **Beispiel‑UI** |
|---|---|---|
| **`Empty`** | Keine aktive Bestellung im Fokus. Start‑Bildschirm zeigt CTA „Nachbestellen“ und kurze Hilfestellung („Tippe auf Material, das du nachbestellen möchtest“). | Leere Karte mit „Nachbestellen“-Button, leicht erhöhtem Kontrast. |
| **`Loading`** | Nach Tippen auf einen Artikel lädt die Bestätigungs‑UI. Button ist disabled, zeigt kleinen Spinner. | „Bestellen…“ mit Kreis‑Spinner rechts neben dem Artikel‑Namen. |
| **`Error / Offline`** | Kein Netzwerk vorhanden oder Validierungs‑Fehler. Meldung erscheint inline oder als Banner. Aktion: „Lokal speichern & später senden“ oder „Eingabe korrigieren“. | Roter Banner: „Kein Netzwerk. Bestellung gespeichert. Sobald Verbindung da ist, wird gesendet.“ |
| **`Partial / Overflow`** | Mehrere Artikel wurden ausgewählt oder Liste ist lang. Scroll‑Bereich, „X“ zum Entfernen einzelner Artikel, „Alle entfernen“-Button. | Liste mit je einem Remove‑Icon pro Zeile, oben „3 von 5 Artikeln ausgewählt“. |
| **`Success`** | Bestellung abgeschickt. Grüner Banner mit Liefer‑Schätzdatum, Option „Teilen mit Büro“ und „Neue Bestellung“. | Grün‑weißer Banner: „Nachbestellung aufgegeben – Lieferung bis Do, 14:00. Büro informiert.“ |

---
### Persistenz‑Hinweis
Alle oben genannten Artefakte (Personas, Erfordernisse, To‑Be‑Walkthrough) können Sie für das Projekt in `docs/ux/` ablegen:
- `docs/ux/personas.md` (nach `../assets/personas-template.md`)
- `docs/ux/requirements-materials-order.md`
- `docs/ux/to-be-walkthrough-materials-order.md`

Soll ich dir helfen, diese Dateien direkt in deinem Repository zu erstellen oder die Personas an bestehende Kontexte anzupassen?

---

<details>
<summary>❌ Click to view Baseline Output WITHOUT Skill (2/3 Passed)</summary>

### UX Design for "Quick Reorder from the Field"

This is a classic **mobile-first, context-driven e-commerce** problem. Your users are wearing work gloves, often in bright sunlight or rain, carrying tools, and under time pressure. Every extra tap or screen second costs productivity.

Here’s how I’d structure the UX from research to interface to flow.

---
#### 1. User & Context Profile
| Need | Why it matters |
|------|----------------|
| **One-handed, gloved interaction** | Large touch targets (48px+), high contrast, minimal precision required |
| **Low attention span / interrupted workflow** | They’re between tasks, on a ladder, or driving |
| **Unstable connectivity** | Offline-first design, local cache, sync when back in range |
| **Urgent, not browsing** | They know what’s missing, don’t want to catalog or compare |
| **Supplier trust** | They need to know *who* is supplying and *when* it arrives |

---
#### 2. Information Architecture & Shortcuts
Don’t start with a search bar. Give them a **fast lane**.

**Home/dashboard widget (iOS/Android/Progressive Web App):**
- `"Last ordered"` card: Shows the 3 most-recently depleted items with a `Reorder 1×` button.
- `"Low stock"` alert: If the van’s inventory DB (synced last night/at refuel) flags < 2 units, show a red badge.
- `"Quick scan"`: Opens camera → barcode/QR → instantly maps to catalog item.

**Navigation shortcut:** A persistent bottom nav or home-screen icon labeled `Nachbestellen` (Reorder) that opens directly to the "last item" screen, not a catalog browser.

---
#### 3. Core Flow (3-tap max from widget to confirmation)

```text
[Widget: "Drill bits low – Reorder"] 
    ↓ (tap)
[Item pre-filled: "Masonry drill 5mm"]
    ↓ (tap "Add 1×" or adjust quantity with big +/- buttons)
[Confirm supplier & delivery site]
    ↓ (tap "Bestellen")
[Confirmation: "Bestellt bei Müller Holz- & Baustoffe – Lieferung bis 16 Uhr"]
```

**Optional accelerators:**
- **"Reorder last item"** → one tap, no selection needed.
- **"Voice reorder"** → `"Hey app, bestell mehr Dämmstoff"` (integrated with OS voice assistants).
- **"NFC/RFID tag on material boxes"** → Tap phone to box → auto-fills item + supplier.

---
#### 4. Interface Patterns (Glove-Friendly & Offline-Ready)

| Pattern | Implementation Tip |
|---------|-------------------|
| **Large tap zones** | Minimum 48–56px height, spacing > 8px between buttons |
| **High contrast / dark mode** | Construction sites have glare; offer forced-dark or auto-adjust |
| **Quantities via +/- steppers** | No keyboard input. One thumb can increment/decrement. |
| **Supplier badge** | Small icon + name (e.g., `Müller`, `Hoffmann`) builds trust instantly. |
| **Status indicator** | Live sync icon: `⏳ offline` / `✓ synced` / `🛒 ordered` |
| **Progressive disclosure** | Show quantity/supplier first; swipe up for notes, delivery address, history. |
| **Error-states** | `"Kein Netz – lokale Bestellung speichern und bei nächster Verbindung senden"` |

---
#### 5. Technical Backbone (What makes it reliable)

- **Offline-first local DB** (Realm, SQLite, or Firestore offline cache). The app stores the last 30 orders/items locally. If there’s no signal, the order is queued and sent automatically when connectivity returns.
- **Barcode/QR scanning** (ML Kit or ZXing) → maps directly to your internal SKU or supplier catalog.
- **Supplier API integration** (REST/GraphQL) or Zapier/Make.com connector if you use a separate ERP (like HandwerkerOffice, WaWi, etc.).
- **Push notifications** for: order received, supplier accepted, shipment dispatched, delivery ETA.
- **User profile / default delivery site** → so they don’t re-enter the address every time.

---
#### 6. Quick-Start MVP (Don't boil the ocean)

1. **Screen 1:** Widget on home screen → `"Letzte Artikel nachbestellen"` → shows last 3 items with `+1×` button.
2. **Screen 2:** Item pre-filled → quantity stepper → `Lieferadresse: Baustelle XY` (pre-filled from profile).
3. **Screen 3:** `"Bestellen"` → shows `"Wird gesendet..."` → immediately queues locally → shows `"Bestätigung: Bestellung an Müller versendet – Lieferung bis 14:30"`.
4. **Backend:** Simple order table (item, qty, supplier, status, created_at). No complex catalog needed for v1.

---
#### 7. Testing & Refinement

- **Field test:** Give 2–3 monitors the prototype for a day. Measure time from "noticing shortage" to "order confirmed." Target: < 30 seconds.
- **Glove test:** Can they tap the right button with thick work gloves? Can they read the screen in noon sun?
- **Offline test:** Turn off cellular/WiFi. Try to place an order. Verify it queues and sends automatically when back online.
- **Heatmaps/analytics:** Track which items are reordered most, peak times, abandonment points.

---
### TL;DR UX Summary

- **Start from the widget/home screen** – never make them browse a catalog first.
- **Pre-fill the last item** – one tap to reorder, or scan a barcode/QR on the box.
- **Big stepper buttons, no keyboard** – glove-friendly quantity adjustment.
- **Offline-first + auto-sync** – works in tunnels, on remote sites, in bad weather.
- **Clear supplier + delivery ETA** – builds trust fast.
- **Goal: 1–3 taps from "it's empty" to "order sent."**

Would you like a sketched workflow, a low-fidelity mockup structure, or a quick spec sheet I can hand to a developer?

</details>
