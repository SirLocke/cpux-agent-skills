# Real-World Eval Example: `eval-04-destructive-action-flow`
> Automatically generated with `nvidia/nemotron-3.5-lightning:free` (Autonomously loaded reference: `references/interaction-principles-110.md`)

## 💬 User Prompt
```text
Verbessere die UX: In unserer Mitgliederverwaltung gibt es in jeder Tabellenzeile ein Mülltonnen-Icon. Wenn der Vereinsvorstand darauf klickt, wird das Mitglied sofort per DELETE-Request aus der Datenbank gelöscht.
```

---

## 📊 Assertion Scorecard
| Assertion | Without Skill (Baseline) | With `ux-review-walkthrough` |
| :--- | :---: | :---: |
| Stuft das sofortige Löschen ohne Schutzmechanismus als kritischen Verstoß gegen 'Robuste Verwendung' (Use error robustness) ein. | ✅ PASS | ✅ PASS |
| Schlägt als Lösung entweder ein Undo-Pattern (Soft-Delete mit zeitlich begrenztem Rückgängig-Toast) oder einen Bestätigungsdialog vor. | ✅ PASS | ✅ PASS |
| Achtet beim Bestätigungsdialog auf eindeutige, aktionsspezifische Button-Beschriftungen (z. B. 'Mitglied löschen' vs. 'Abbrechen') statt unklarer Labels wie 'Ja/Nein' oder 'OK'. | ✅ PASS | ✅ PASS |

---

## ✅ Output WITH `ux-review-walkthrough` (3/3 Passed)

### UX-Verbesserung: Sofort-Löschung über Mülltonnen-Icon

Das sofortige Löschen per Klick auf ein Icon ist ein klassisches Risiko fürversehentliche Datenlöschung und verletzt mehrere Prinzipien der ISO 9241-110:2020. Im Folgenden analysiere ich das Szenario anhand von Personas, ISO-Prinzipien und einem konkreten Verbesserungsvorschlag – und zeige, wie du das direkt in deinem Frontend umsetzt.

---

## 1. Persona-basierter Cognitive Walkthrough

| Schritt | Primary Persona: *Vorstandsmitglied* | Accessibility Persona: *Keyboard-/Screenreader-Nutzer* |
|---------|--------------------------------------|--------------------------------------------------------|
| **Entry & Orientation** | Sie sieht die Tabelle, das Icon ist sichtbar beschriftet als „Löschen“. | Fokus landet via `Tab` auf dem Icon. Screenreader verkündet „Löschen, Button“. |
| **Goal-Action Mapping** | Sie erkennt: „Icon = Mitglied entfernen.“ | Aria-label stimmt überein, aber Aktion ist nicht eindeutig genug abgefragt. |
| **Execution & Error Friction** | Klickt drauf – Mitglied ist weg. Kein Zurück. | Drückt `Enter` oder `Space` – sofortiger Request, keine Bestätigung. Bei versehentlichem Klick kein Weg zur Rückgängig-Machung. |
| **Feedback & State Transition** | Toast: „Mitglied wurde gelöscht.“ Kein Hinweis auf Undo. | Kein Fokus-Rückkehr, keine Live-Region für Assistivtechnologien, Status nicht programmatisch bekannt. |

**Sofort erkennbares Problem:** Die Aktion ist *unwiderruflich* und *nicht differenziert* nach Absicht. Das verletzt das Prinzip „Robuste Verwendung“ und „Steuerbarkeit“.

---

## 2. 5-State / Action-State Audit (angepasst)

Das Delete-Icon ist eine interaktive Aktion statt einer Datenanzeige. Ich prüfe sie gegen die logischen Zustände einer destruktiven Aktion:

| Zustand | Audit-Kriterien | ISO 9241-110 Prinzip |
|---------|-----------------|----------------------|
| **Idle** | Icon ist klickbar, aber nicht aktiv. Tooltip oder `aria-label` erklärt die Wirkung. | *Aufgabenangemessenheit* |
| **Confirming** | Klick löst Bestätigungs-Dialog oder Soft‑Delete mit Undo‑Toast aus. Button ist währenddessen deaktiviert. | *Selbstbeschreibungsfähigkeit*, *Steuerbarkeit* |
| **Loading** | Async‑Request läuft, Icon zeigt Spinner oder wird deaktiviert, `aria-busy="true"`. | *Robuste Verwendung* |
| **Success** | Non‑intrusive Bestätigung (`role="status"`, `aria-live="polite"`). Optional: „Undo“ in 5‑10 s. | *Selbstbeschreibungsfähigkeit* |
| **Error** | Request fehlgeschlagen → Fehlermeldung inline, gültige Daten bleiben erhalten, Fokus auf Fehlerstelle. | *Robuste Verwendung* |

**Aktueller Stand:** Du hast Zustand 1 (Idle) teilweise abgedeckt. Die Zustände 2–5 fehlen oder sind fehleranfällig.

---

## 3. ISO 9241-110:2020 – Prinzipien-Check & Anti-Patterns

| Prinzip | Verstoß (Current) | Geforderte Umsetzung |
|---------|-------------------|----------------------|
| **Aufgabenangemessenheit** | Löschen steht allein neben der Tabelle, kein Kontext, ob Mitglied noch aktiv ist, ob Abhängungen bestehen. | Kontext vor Aktion zeigen (z.B. „Wirklich löschen? Mitglied XY mit 3 Verträgen.“) |
| **Selbstbeschreibungsfähigkeit** | Icon ohne klaren Text, keine Erklärung bei Fokus, keine Rückmeldung nach Aktion. | Persistenter `<label>`-ähnliche Beschriftung via `aria-label`, nachgelagerte Status-Meldung via `aria-live`. |
| **Erwartungskonformität** | Klick = sofortige Löschung, entspricht nicht dem mentalen Modell „Ich will bestätigen, bevor ich etwas zerstöre.“ | Bestätigungsdialog oder Soft‑Delete mit sichtbarer Undo-Option. |
| **Steuerbarkeit** | Nutzerin hat nach Klick keine Kontrolle mehr (Daten weg). | Undo‑Toast (5‑10 s) oder expliziter Dialog mit „Abbrechen“ / „Löschen“. |
| **Robuste Verwendung** | Keine Validierung vor Request, keine Fehlerbehandlung, die UI bleibt inkonsistent. | Request nur nach Bestätigung, `form.reset()` vermeiden, gültige Eingaben erhalten bleiben. |
| **Benutzerbindung** | Keine motivationierende oder vertrauensbildende Rückmeldung; Risiko von „Confirmshaming“ bei schlechtem Design. | Klare, neutrale Sprache („Mitglied endgültig löschen“), sofortiges taktiles Feedback. |

---

## 4. Accessibility Cross-Mapping (ISO 9241-110 ↔ WCAG / BITV / BFSG)

| ISO-Prinzip | WCAG/EN 301 549 Kriterium | Technische Kontrolle |
|-------------|---------------------------|----------------------|
| *Selbstbeschreibungsfähigkeit* | 1.3.1 Info & Relationships, 3.3.2 Labels | `<button aria-label="Mitglied XY endgültig löschen">`, `aria-describedby` für Hinweise |
| *Erwartungskonformität* | 2.4.3 Focus Order, 4.1.2 Name, Role, Value | Logischer Tab-Reihenfolge, sichtbares `:focus-visible`, native `<button>` |
| *Steuerbarkeit* | 2.1.1 Keyboard, 2.2.2 Pause, Stop, Hide | `Enter`/`Space` öffnet Dialog, nicht sofort löschen; `Escape` schließt Dialog |
| *Robuste Verwendung* | 3.3.1 Error Identification, 3.3.4 Error Prevention | Sanitized Inputs, Bestätigung vor DELETE, `Undo` als Recovery |
| *Aufgabenangemessenheit* | 1.3.5 Identify Input Purpose, 2.5.8 Target Size | `inputmode`, Touch‑Target mindestens `44×44px` (mobile) |

---

## 5. Refactored Solution (Code & UX Flow)

### UX-Flow (Ersetze den direkten DELETE-Request):

1. **Klick auf Icon** → Öffnet einen **nicht‑modalen Bestätigungs-Dialog** (oder ein inline‑Toast‑Konzept) mit:
   - Überschrift: `Mitglied XY endgültig löschen?`
   - Primärer Button: `Löschen` (exakt diese Wörter, nie „OK“)
   - Sekundärer Button: `Abbrechen`
   - Optional: `Grund wählen` (falls Compliance nötig)
2. **Bestätigung** → `DELETE` Request wird gesendet.
3. **Loading** → Icon/Button zeigt `aria-busy="true"` und deaktiviert.
4. **Success** → Toast: `Mitglied wurde gelöscht. Undo Rückgängig (5 s)`.
   - Toast hat `role="status"`, `aria-live="polite"`.
   - Klick auf „Undo“ setzt den Lösch‑Request zurück und stellt die Zeile wieder her.
5. **Error** → Fehlermeldung inline, Fokus auf Fehlerelement, gelöschte Daten bleiben erhalten.

### Beispiel-Implementierung (React + Tailwind + Fetch):

```tsx
interface MemberRowProps {
  id: number;
  name: string;
  onRowAction?: (action: 'delete' | 'undo', id: number) => void;
}

export function MemberRow({ id, name, onRowAction }: MemberRowProps) {
  const [deleting, setDeleting] = useState(false);
  const [undid, setUndid] = useState(false);

  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);

    // 1. Bestätigungs-Dialog (hier vereinfacht durch Funktion)
    if (!window.confirm(`Mitglied "${name}" endgültig löschen?`)) {
      setDeleting(false);
      return;
    }

    // 2. Request
    try {
      await fetch(`/api/members/${id}`, { method: 'DELETE' });
      setUndid(true); // Undo-Flag setzen
      // Toast via deiner Library (z.B. react-hot-toast)
      toast(`Mitglied "${name}" gelöscht.`, {
        action: {
          label: 'Undo',
          onClick: () => onRowAction?.('undo', id),
        },
        duration: 5000,
        autoClose: false,
      });
    } catch (err) {
      // 3. Error State – niemals state löschen
      toast.error('Löschen fehlgeschlagen. Bitte erneut versuchen.');
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <tr>
      <td>{name}</td>
      <td>
        <button
          onClick={handleDelete}
          disabled={deleting}
          aria-label={deleting ? 'Löschvorgang läuft' : `Mitglied "${name}" löschen`}
          aria-busy={deleting}
          className="flex items-center gap-1 hover:underline"
        >
          {deleting ? (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          )}
        </button>
      </td>
    </tr>
  );
}

// Eltern‑Komponente: Undo-Logik + Toast-Management
function MembersTable() {
  const [members, setMembers] = useState<Member[]>([]);

  const onRowAction = useCallback((action: 'delete' | 'undo', id: number) => {
    if (action === 'undo') {
      // Mitglied wiederherstellen (aus Cache oder neu laden)
      setMembers(prev => [...prev, /* wiederhergestelltes Mitglied */]);
      return;
    }
    setMembers(prev => prev.filter(m => m.id !== id));
  }, []);

  return <Table data={members} onRowAction={onRowAction} />;
}
```

### Wichtige Code‑Qualitäts‑Checks:

- **Nie `form.reset()` nach Klick** – die Form/Table‑Row‑State bleibt erhalten.
- **`aria-busy="true"`** während des Requests, `disabled` am Button.
- **Fehlerbehebung**: Never wipe valid inputs; if the delete fails, the member is still in the table.
- **Focus management**: Nach erfolgreichem Request den Fokus nicht verlieren oder gezielt zum nächsten Element setzen (je nach Flow).
- **Responsive**: Touch‑Target mindestens `44×44px` (SVG-Icons via `viewBox` und ausreichend Padding).
- **Reduced motion**: Wenn du Animationen für den Undo‑Toast nutzt, respektiere `@media (prefers-reduced-motion: reduce)` und blende diese aus.

---

## 6. Nächste Schritte & Persistenz

Möchtest du:
- Die **Personas** für deine Mitgliederverwaltung in `docs/ux/personas.md` speichern/überprüfen?
- Eine **requirements-Datei** (`requirements-delete-member.md`) mit Ist-Szenario, Nutzer‑Erfordernissen und Soll‑Walkthrough erstellen?
- **Usability‑Test‑Aufgaben** für diesen Flow schreiben (non‑leading, konkret, objektiv verifizierbar)?

Ich kann dir dabei helfen, die Artefakte nach der ISO‑9241‑210‑Vorlage (`assets/personas-template.md`) zu erstellen und in `docs/ux/` abzulegen – für wiederverwendbares UX‑Wissen im Team. Sag einfach Bescheid!

---

<details>
<summary>❌ Click to view Baseline Output WITHOUT Skill (3/3 Passed)</summary>

### Problemanalyse
Ein direktes Löschen per Klick auf ein Mülltonnen-Icon ist technisch schnell umgesetzt, aber UX-technisch riskant. Vereinsvorstände arbeiten oft schnell, und ein versehentlicher Klick kann wichtige Mitgliederdaten unwiederbringlich löschen. Zudem gibt es keine Rückmeldung, ob die Aktion erfolgreich war.

---

### Konkrete UX-Verbesserungen

#### 1. Bestätigungs-Dialog (Modal) mit klarer Sprache
Ersetze den direkten Lösch-Action durch ein Bestätigungs-Fenster. Vermeide Formulierungen wie „Soll dieses Mitglied wirklich gelöscht werden?“ – nutze stattdessen handlungsorientierte Texte und trenne „Abbrechen“ vs. „Löschen“.

```html
<button 
  class="delete-btn" 
  data-id="123" 
  data-name="Max Mustermann"
  aria-label="Mitglied Max Mustermann löschen">
  <svg>...</svg> <!-- Mülltonne -->
  <span class="sr-only">Max Mustermann löschen</span>
</button>
```

Im JS:
```js
const btns = document.querySelectorAll('.delete-btn');
btns.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const name = btn.dataset.name;
    if (confirm(`Wirklich Mitglied "${name}" löschen? Diese Aktion kann nicht rückgängig gemacht werden.`)) {
      // DELETE-Request starten
    }
  });
});
```

#### 2. Visuelles Feedback nach Löschung (Toast / Snackbar)
Nach erfolgreichem Löschen verschwindet die Zeile nicht einfach, sondern gleitet aus oder wird ausgeblendet – und es erscheint eine Meldung oben/ unten, z. B.:
- „Mitglied Max Mustermann wurde gelöscht.“
- „Die Liste wurde aktualisiert.“

Das gibt Sicherheit und bestätigt die Aktion.

#### 3. „Undo“-Funktion (Snackbar mit Aktion)
Besonders bei Listen ist ein „Undo“-Button in der Meldung sehr stark: „Löschen Rückgängig machen“ – klickbar für ca. 5 Sekunden. Das nimmt die Angst vor versehentlichen Klicks.

#### 4. Bessere Affordance (Interaktions-Hinweise)
- **Hover-Zustand**: Icon leicht vergrößern oder Hintergrund färben.
- **Tooltipp**: Bei Hover „Mitglied löschen (WICHTIG: kann nicht rückgängig gemacht werden)“.
- **Textlabel**: Auch ohne Icon sollte der Zweck klar sein (Screenreader, mobile Langdrück).

#### 5. Barrierefreiheit (Accessibility)
- `aria-label` oder `aria-labelledby` am Button nutzen.
- Fokus-Management im Modal (nach Öffnen Fokus in den ersten Button legen).
- `Esc`-Key schließt den Dialog ohne Löschen.
- Farbkontrast des Icons sicherstellen (nicht nur „rot“ als einzige Bedeutung).

#### 6. Alternative: „Archivieren“ statt „Löschen“
Überlege, ob Mitglieder nicht einfach in einen „inaktiv“-Status versetzt werden statt sie komplett zu löschen. Das ist:
- Sicherer (versehentliches Wiederherstellen möglich).
- DSGVO-freundlicher (Daten bleiben erhalten, aber aus der aktiven Liste).
- UX-besser („Wiederherstellen“-Button statt neu anlegen).

---

### Zusammenfassung & Empfehlung

| Maßnahme | Effekt |
|----------|--------|
| Bestätigungs-Dialog mit klarer Sprache | Verhindert versehentliche Klicks |
| Toast / Snackbar mit „Undo“-Option | Bestätigt Erfolg und bietet Rückgängig-Möglichkeit |
| Hover-State + Tooltipp | Machte die Action sichtbarer und erklärter |
| Barrierefreie Attribute (`aria-label`) | Erfüllt WCAG-Richtlinien |
| „Archivieren“ statt „Löschen“ | Bietet Sicherheit und Datenintegrität |

**Schnell umsetzbar:** Kombiniere einen bestätigenden Dialog mit einem Toast, der nach 3 Sekunden „Undo“ anbietet. Das kostet nur wenige Zeilen Code, senkt das Risiko massiv und wirkt professionell.

Möchtest du ein konkretes HTML/JS- oder React-Beispiel sehen, das diese Punkte kombiniert?

</details>
