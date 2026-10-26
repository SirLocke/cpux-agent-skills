# Real-World Eval Example: `eval-01-broken-code-audit`
> Automatically generated with `nvidia/nemotron-3.5-lightning:free` (Autonomously loaded reference: `references/interaction-principles-110.md`)

## 💬 User Prompt
```text
Mach mal ein kurzes UX Review von unserem Vereins-Beitrittsformular und verbessere den Code:
<form id="joinForm" onsubmit="handleSubmit(event)">
  <input type="text" placeholder="Vor- und Nachname">
  <input type="text" placeholder="IBAN (ohne Leerzeichen!)">
  <div class="btn" onclick="submitForm()">Absenden</div>
  <div id="err" style="color:red;display:none">Ungültige Eingabe!</div>
</form>
<script>
function submitForm() {
  const iban = document.querySelectorAll('input')[1].value;
  if (iban.includes(' ') || iban.length !== 22) {
    document.getElementById('joinForm').reset();
    document.getElementById('err').style.display = 'block';
  }
}
</script>
```

---

## 📊 Assertion Scorecard
| Assertion | Without Skill (Baseline) | With `ux-review-walkthrough` |
| :--- | :---: | :---: |
| Simuliert einen kurzen Persona-Walkthrough (inkl. Tastatur- oder Mobile-Nutzung) durch den Code. | ❌ FAIL | ✅ PASS |
| Markiert document.getElementById('joinForm').reset() und das Verbot von Leerzeichen in der IBAN als Verstoß gegen 'Robuste Verwendung' (Use error robustness / ISO 9241-110:2020) und strippt Leerzeichen im Fix automatisch per Code. | ❌ FAIL | ✅ PASS |
| Ersetzt <div class="btn" onclick=...> durch einen echten <button type="submit"> für Tastatur-Zugänglichkeit (Erwartungskonformität / Steuerbarkeit). | ✅ PASS | ✅ PASS |
| Ersetzt die reinen Placeholder durch persistente <label for=...>-Elemente und verknüpft spezifische Fehlermeldungen via aria-invalid und aria-describedby (Selbstbeschreibungsfähigkeit). | ❌ FAIL | ✅ PASS |

---

## ✅ Output WITH `ux-review-walkthrough` (4/4 Passed)

### Kurzes UX-Review & Verbesserung des Beitrittsformulars

#### 🔍 UX-Review Highlights (ISO 9241-110:2020)

| Issue | ISO-Prinzip betroffen | Impact |
|-------|----------------------|--------|
| **Kein `<label>` zu den Eingaben** | *Selbstbeschreibungsfähigkeit* | Screenreader-Nutzer erfahren keinen Zusammenhang zwischen Beschriftung und Feld; Klickbereich fehlt. |
| **`placeholder` verschwindet beim Tippen** | *Selbstbeschreibungsfähigkeit, Erwartungskonformität* | Anleitung verschwindet, Nutzer vergisst Format, besonders bei IBAN problematisch. |
| **`<div onclick="...">` als Button** | *Erwartungskonformität, Steuerbarkeit* | Nicht tastaturbedienbar (Enter/Space nicht nutzbar), Fokus geht verloren, für Tastaturnutzer unzugänglich. |
| **`form.reset()` bei Validierungsfehler** | *Robuste Verwendung* | Alle gültigen Eingaben werden gelöscht → extreme Frustration, besonders bei langen Namen oder IBAN. |
| **IBAN-Validierung nur auf Länge & Leerzeichen** | *Aufgabenangemessenheit, Robuste Verwendung* | Akzeptiert keine formatierten IBANs (mit Leerräumen), gibt keine Hinweise zur Korrektur, keine Auto‑Formatierung. |
| **Kein Success/Confirmation State** | *Selbstbeschreibungsfähigkeit, Benutzerbindung* | Nutzer erfährt nicht, ob der Beitritt erfolgreich war. |
| **Fehlermeldung nicht programmatisch verknüpft** | *Robuste Verwendung* | `aria-describedby` fehlt, Fokus wird nicht zu Fehler gelenkt. |

---

#### 🧍‍♀️ Persona‑basierter Cognitive Walkthrough

**Persona A – “Eilige Erika”**  
Häufige Vereinsmitgliedschaft per Handy, kopiert IBAN aus einem Lastschriftmandat. Sie tippt schnell, nutzt die Tastatur des Handys.  
- *Entry & Orientation:* Sie sieht das Formular, erkennt aber nicht sofort, wo sie hin muss, weil kein sichtbares Label da ist.  
- *Goal‑Action Mapping:* Sie sieht `placeholder="IBAN (ohne Leerzeichen!)"`, tippt den IBAN mit Leerzeichen (Kopier‑/Einfüge‑Routine), die Validierung schlägt fehl, das Formular wird gelöscht → sie muss von vorne beginnen.  
- *Execution Friction:* Tastatur‑Tab‑Reihenfolge ist willkürlich, Fokus springt nach Reset an den Anfang.  
- *Feedback:* Sie sieht nur “Ungültige Eingabe!” – keine Ahnung, was genau falsch ist oder wie sie es korrigiert.

**Persona B – “Barriere‑nutzer”**  
Nutzt Screenreader und Tastatur ausschließlich.  
- *Entry & Orientation:* Keine programmatische Beschriftung → Screenreader liest “Edit”, “Edit”, “Div” – keine Orientierung.  
- *Goal‑Action Mapping:* Button ist `<div>`, für Tastatur nicht aktivierbar (Enter/Space tut nichts).  
- *Execution Friction:* Kann Formular nicht abschicken, auch nicht per `Enter` im Fokus der Felder (kein `<form>`-Submit‑Verhalten, weil `onsubmit` und `onclick` widersprüchlich sind).  
- *Feedback:* Keine Ansage von Fehlern, keine Fokus‑Steuerung.

---

#### 📊 5‑State Completeness Matrix

| UI State | Current Status | Required Fix |
|----------|----------------|------------|
| **1. Empty** | Not applicable (fields always present) | Add motivating CTA if form is reset completely, or show “Willkommen – gib deine Daten ein” |
| **2. Loading** | None | Disable button during submit, show `aria-busy`, optional spinner |
| **3. Error** | ❌ Form resets, all data lost, generic “Ungültige Eingabe!” | Keep valid inputs, pinpoint failing field, add `aria-invalid`, `aria-describedby`, scroll/focus to error |
| **4. Overflow/Partial** | German names may be long, IBAN formatting not helped | `hyphens: auto`, input mask or auto‑strip spaces, tooltip for format |
| **5. Success** | None | Confirmation toast/inline message, optional “Undo” for destructive actions (hier: Beitritt) |

---

#### 🛠 Verbessertes Code‑Refactoring

```html
<!-- HTML -->
<form id="joinForm" novalidate>
  <div class="form-group">
    <label for="name">Vor- und Nachname</label>
    <input
      type="text"
      id="name"
      name="name"
      required
      autocomplete="name"
      placeholder="Vor- und Nachname"
    />
  </div>

  <div class="form-group">
    <label for="iban">IBAN</label>
    <input
      type="text"
      id="iban"
      name="iban"
      pattern="[A-Z]{2}[0-9]{2}[A-Z]{4}[0-9]{14}"
      inputmode="text"
      placeholder="IBAN (mit oder ohne Leerzeichen)"
      aria-describedby="iban-help"
    />
    <p id="iban-help" class="hint">Format: DE89 3704 0044 0532 0130 00 (Leerzeichen werden automatisch entfernt)</p>
  </div>

  <button type="submit" class="btn">Absenden</button>
</form>

<p id="err" class="error" role="alert" style="color:red;display:none"></p>
```

```js
// JavaScript
function submitForm(event) {
  event.preventDefault(); // ← war vorher missing!

  const name = document.getElementById('name').value.trim();
  let iban = document.getElementById('iban').value.trim()
    .replace(/\s+/g, ''); // ← Leerzeichen automatisch entfernen

  // IBAN-Länge prüfen (22 Zeichen für deutsche IBAN)
  const validLength = iban.length === 22;
  const validPattern = /^[A-Z]{2}[0-9]{2}[A-Z]{4}[0-9]{14}$/.test(iban);

  const errEl = document.getElementById('err');
  const formEl = document.getElementById('joinForm');

  if (!validLength || !validPattern) {
    // Fehler spezifisch, aber gültige Daten erhalten
    errEl.style.display = 'block';
    errEl.textContent = 'Bitte eine gültige 22‑stellige IBAN eingeben (z. B. DE89 3704 0044 0532 0130 00).';

    // Fokus zum IBAN-Feld lenken (ohne gültige Eingabe)
    document.getElementById('iban').focus();
    document.getElementById('iban').ariaInvalid = 'true';

    // Form nicht zurücksetzen → gültige Eingaben (z. B. Name) bleiben erhalten
    return;
  }

  // ✅ Erfolgreicher Weg
  errEl.style.display = 'none';

  // Hier würde echte Submit-Logik stehen (AJAX, etc.)
  // Beispiel:
  // fetch('/api/verein/beitritt', { method: 'POST', body: new FormData(formEl) })
  //   .then(() => showSuccess('Dein Beitritt wurde erfolgreich aufgenommen!'));

  // Fürs Demo‑Beispiel:
  alert('Vielen Dank! Dein Beitritt wurde aufgenommen.');
}
```

---

#### ✅ Key Fixes & Mapping

| Fix | ISO‑Prinzips |
|-----|--------------|
| `inputmode="text"` + `pattern` + auto‑strip spaces | *Aufgabenangemessenheit* – unterstützt korrekten Eingabetyp ohne manuelle Vorgaben |
| `<label>` + `for` + `aria-describedby` | *Selbstbeschreibungsfähigkeit* – persistente Beschriftung, Hilfetext bleibt sichtbar |
| `button type="submit"` statt `<div onclick>` | *Erwartungskonformität, Steuerbarkeit* – native Tastatur‑Unterstützung (Enter/Space), Fokus‑Management |
| `event.preventDefault()` + `form.reset()` entfernt | *Robuste Verwendung* – Formularzustand wird nicht willkürlich gelöscht |
| Fehler‑Nachricht per `role="alert"` + Fokus‑Lenkung | *Robuste Verwendung* – Nutzer wird sofort und programmatisch über Fehler informiert |
| IBAN mit/ohne Leerzeichen akzeptiert, automatisch bereinigt | *Fehlertoleranz / Robuste Verwendung* – Nutzerfreundlicher, keine Blockade durch Formatierungs‑Kleinigkeiten |
| Success‑State (Alert/Toast) geplant | *Selbstbeschreibungsfähigkeit, Benutzerbindung* – Bestätigung, dass Aktion abgeschlossen ist |

---

#### 📦 Persistenz‑Tipp

Wenn dieses Formular Teil eines größeren Vereins‑Portals ist, würde ich empfehle, die **Persona** und **Anforderungen** in `docs/ux/personas.md` und `docs/ux/requirements-beitritt.md` zu speichern – so kann das Team die Validierungs‑Logik und die 5‑State‑Matrix wiederverwenden und muss nicht jedes Mal von vorne beginnen.

Möchtest du, dass ich die Test‑Aufgaben (`usability-test-beitritt.md`) nach CPUX‑Regeln schreibe oder eine vollständige **To‑Be‑Walkthrough** für den gesamten Beitritts‑Flow entwerfe?

---

<details>
<summary>❌ Click to view Baseline Output WITHOUT Skill (1/4 Passed)</summary>

### 🔍 UX Review

| Issue | Why it matters | Fix |
|------|----------------|-----|
| **Missing `<label>` elements** | Screen readers can’t associate inputs with their descriptions. Clicking a label focuses the input. | Wrap each input in a `<label for="…">` |
| **Form resets on error** | User loses their name/IBAN if they mistype one field. | Only show the error, keep values in the form |
| **Validation only on submit** | User doesn’t know something’s wrong until they click “Absenden”. Add inline feedback or at least a gentle `onsubmit` check. | Validate in the `submit` event, show message, don’t reset |
| **`<div onclick="…">` as button** | Not keyboard-focusable, not accessible via `Enter` key, no `type="submit"` semantics. | Use `<button type="submit">` |
| **“IBAN ohne Leerzeichen!” placeholder** | Users will type spaces anyway. The check then fails even though the IBAN is valid. | Strip spaces on submit, allow paste with spaces, or use input masking |
| **Naive IBAN check (`length !== 22`)** | Only works for German IBANs, and doesn’t account for formatting, country codes, or the MOD-97 checksum. | Keep the length check as a start, but strip spaces first, and note that full IBAN validation requires a checksum algorithm. |
| **Vague error message** | “Ungültige Eingabe!” tells the user nothing. | Be specific: “IBAN muss 22-stellig sein” / “Bitte Namen eingeben” |
| **No `inputmode` or `pattern`** | Mobile keyboards default to QWERTZ/QWERTY. IBAN should bring up a numeric/symbol keyboard. | Add `inputmode="numeric"` and a `pattern` that accepts spaces/digits |

---

### ✅ Improved Code

I kept the spirit of your form but fixed accessibility, UX flow, and robustness. I also added a simple DE-IBAN length check that tolerates spaces, and kept the form data intact on error.

```html
<form id="joinForm" novalidate>
  <label for="name">Vor- und Nachname</label>
  <input
    type="text"
    id="name"
    name="name"
    placeholder="Vor- und Nachname"
    required
    autocomplete="name"
  />

  <label for="iban">IBAN</label>
  <input
    type="text"
    id="iban"
    name="iban"
    placeholder="DE89 3704 0044 0532 0130 00"
    inputmode="numeric"
    pattern="[0-9\s]{22}"
    maxlength="34"
    required
    autocomplete="iban"
    />
    <!-- pattern accepts spaces & digits; maxlength covers international IBANs -->

  <button type="submit" class="btn">Absenden</button>

  <div id="err" style="color:red;display:none"></div>
</form>

<script>
  const form = document.getElementById('joinForm');
  const err = document.getElementById('err');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const iban = document.getElementById('iban').value.replace(/\s+/g, ''); // remove all spaces
    const name = document.getElementById('name').value.trim();

    let ok = true;
    if (iban.length !== 22) {
      err.textContent = 'IBAN muss genau 22 Stellen haben (DE-IBAN).';
      ok = false;
    }
    if (!name) {
      err.textContent = 'Bitte deinen Namen angeben.';
      ok = false;
    }

    if (!ok) {
      err.style.display = 'block';
      return;
    }

    err.style.display = 'none';
    // form.submit(); // entfällt, wenn du später wirklich absenden willst
    alert('Mitgliedschaft erfolgreich beantragt!');
  });
</script>
```

### 📦 What changed & why

- **`<label>` + `for`** → Accessibility + click-to-focus
- **`<button type="submit">`** → Proper form semantics, works with `Enter` key
- **`e.preventDefault()` + manual check** → No page reload, no reset, errors stay visible
- **`iban.replace(/\s+/g, '')`** → Accepts spaces, strips them before the length check
- **`inputmode="numeric"` + `pattern`** → Better mobile UX (numeric keyboard, browser validation)
- **Specific error messages** → User knows exactly what to fix
- **`required` on both fields** → Browser-level enforcement + clearer default state
- **`maxlength="34"`** → Covers all IBAN formats internationally, while your check still targets 22-char DE IBANs
- **No `form.reset()`** → User keeps their input if they only got one field wrong

If you want full IBAN checksum validation (mod-97), let me know — I can add a tiny `iban-validate.js` helper. Otherwise, this is a solid, accessible, and user-friendly starting point.

</details>
