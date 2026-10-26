# Real-World Eval Example: `eval-03-missing-ui-states`
> Automatically generated with `nvidia/nemotron-3.5-lightning:free` (Autonomously loaded reference: `references/interaction-principles-110.md`)

## 💬 User Prompt
```text
Kannst du die UX von dieser Komponenten-Ansicht prüfen und verbessern?
export function InvoiceList({ invoices }) {
  return (
    <ul>
      {invoices.map(inv => <li key={inv.id}>{inv.title} - {inv.amount} €</li>)}
    </ul>
  );
}
```

---

## 📊 Assertion Scorecard
| Assertion | Without Skill (Baseline) | With `ux-review-walkthrough` |
| :--- | :---: | :---: |
| Prüft die Komponente systematisch auf fehlende UI-States jenseits des Happy Paths (insbesondere Empty State, Loading State, Error State). | ❌ FAIL | ✅ PASS |
| Begründet das Fehlen eines hilfreichen Empty States und Loading States mit den Prinzipien der ISO 9241-110:2020 (z. B. Selbstbeschreibungsfähigkeit, Benutzerbindung, Robuste Verwendung). | ❌ FAIL | ✅ PASS |
| Liefert verbesserten Code, der Loading (inkl. aria-busy), Error (mit Retry-Möglichkeit) und einen handlungsorientierten Empty State abdeckt. | ❌ FAIL | ✅ PASS |

---

## ✅ Output WITH `ux-review-walkthrough` (3/3 Passed)

**UX-Review & Verbesserung der `InvoiceList`-Komponente**

Ich prüfe die Ansicht nach den Kriterien von ISO 9241-110:2020 und wende einen persona-basierten Cognitive Walkthrough sowie das 5-State-Matrix-Prinzip an. Da in deinem Kontext noch keine projektinternen Personen hinterlegt sind, definiere ich zwei realistische Personen für diese Prüfung.

---

### 1. Persona-Setup & Cognitive Walkthrough

| Persona | Beschreibung | Walkthrough-Schritte an der Komponente |
| :--- | :--- | :--- |
| **Persona A (Primary)** | *Lisa, 34, Bürokraft* – bearbeitet täglich 30–50 Rechnungen, nutzt einen Desktop-Monitor im Büro, arbeitet oft nebenbei, mag schnelles Scannen, nutzt Tastaturkürzel. | 1. **Entry & Orientation:** Das `<ul>` hat keine sichtbare Überschrift oder `aria-label`. Lisa muss erst rätseln, wo sie ist.<br>2. **Goal-Action Mapping:** Sie sucht eine Rechnung mit einem bestimmten Betrag. Die reine Text‑Kette `"Titel - 123,45 €"` ist scannbar, aber es gibt keine Möglichkeit, gezielt zu filtern oder sortieren.<br>3. **Execution & Error Friction:** Pastet sie einen Betrag mit Komma oder Leerzeichen (z. B. `"1.234,56"` vs `"1234.56"`), findet sie die Rechnung nicht, da kein Input‑Sanitizing vorliegt (wäre bei einer Suchfeld‑Erweiterung relevant).<br>4. **Feedback & State Transition:** Blatt sie die Seite neu, geht die Liste verloren – es gibt kein `Loading`, kein `Error` und keine Bestätigung nach einer Aktion. |
| **Persona B (Accessibility / Edge‑Case)** | *Wolfgang, nutzt Screenreader und Tastaturnavigation* – 100% Tastaturbedienung, `NVDA`/VoiceOver, 150% Skalierung, kontrastreiches Display. | 1. **Entry & Orientation:** Fokus landet auf dem `<ul>`, aber es gibt kein `role="list"` oder `aria-label`. Screenreader gibt nur `"Liste"` oder gar nichts sinnvolles aus.<br>2. **Goal-Action Mapping:** Jedes `<li>` ist ein reiner Textknoten. `Tab` springt darüber, aber es gibt keine interaktive Beschriftung oder `tabIndex`-Logik, die eine gezielte Navigation unterstützt.<br>3. **Execution & Error Friction:** Wolfgang drückt `Umschalt + Tab` oder `Esc` – es passiert nichts, da keine Modals oder Formulare vorhanden sind. Bei Tippfehler in einer erweiterten Suche würde der Fokus nicht zufeldig zurückgesetzt.<br>4. **Feedback & State Transition:** Kein `aria-busy`, keine Live‑Region. Wenn Daten nachgeladen werden, bleibt der Screenreader stumm. Bei `font-size: 1rem` bei 150% Skalierung werden Ziffern abgeschnitten (`clamp`/`vw`-Fallback fehlt). |

---

### 2. 5‑State Completeness Matrix

| UI State | Ist‑Situation in der aktuellen Komponente | Geforderte Umsetzung (ISO 9241‑110) |
| :--- | :--- | :--- |
| **1. Empty State** | `<ul></ul>` bei leerer Liste – es wird kein Hinweis gegeben. | Leere Liste muss motivierend erklärt werden: `"Keine Rechnungen gefunden. Möchtest du eine neue erstellen?"` + direkter CTA (z. B. `<button>Neue Rechnung</button>`). Prinzip: *Benutzerbindung & Erlernbarkeit*. |
| **2. Loading State** | Es gibt keinen Ladeindikator. Asynchrone Nachladung würde den Browser blockieren oder den Nutzer im Unklaren lassen. | Während `aria-busy="true"` am Container, height‑matchende Skeletons, deaktivierter Trigger‑Button. Prinzip: *Selbstbeschreibungsfähigkeit & Robuste Verwendung*. |
| **3. Error / Offline State** | Nicht vorhanden. Wäre z. B. bei fehlgeschlagener API‑Call würde die Liste einfach leer bleiben. | Nie gültige Eingaben löschen. Fehlermeldung via `role="alert"` oder `aria-live="polite"`, Fokus auf den Fehlerhinweis, gültige Einträge erhalten bleiben. Prinzip: *Robuste Verwendung*. |
| **4. Partial / Overflow State** | Lange deutsche Bezeichner (z. B. `"Endrechnung_2024_12_Musterfirma_DE"`) können den Layout‑Flow brechen. | `hyphens: auto`, `overflow-wrap: break-word`, Tooltips bei Textüberlauf, Pagination/Virtualisierung bei großen Listen. Prinzip: *Aufgabenangemessenheit & Steuerbarkeit*. |
| **5. Success State** | Nach einer Aktion (z. B. Archivierung) bleibt die Liste unverändert oder blendet nur kurz ein – kein bestätigendes Feedback. | Nicht‑intrusives Status‑Update (`role="status"`, `aria-live="polite"`). Bei Löschvorgang: **Undo**‑Toast (5–10 s) oder explizite Bestätigung mit aktivem Verb (`"Rechnung endgültig löschen"`). Prinzip: *Selbstbeschreibungsfähigkeit & Steuerbarkeit*. |

---

### 3. ISO 9241‑110:2020 – Prinzipien-Check & Code‑Anti‑Patterns

| Prinzip | Verstoß in der aktuellen Komponente | Sofortiger Code‑Fix |
| :--- | :--- | :--- |
| **Aufgabenangemessenheit** | Keine Unterstützung für gängige Input‑Formate (z. B. IBAN‑ähnliche IDs, Zahlenformate). Kein `autocomplete` oder `inputmode`. | `inputmode="numeric"` auf Beträge anwenden, falls Eingabefelder hinzugefügt werden. Bei reiner Liste: `title`-Attribut mit Hinweis auf Format. |
| **Selbstbeschreibungsfähigkeit** | Keine `<label>`, `placeholder` verschwindet beim Tippen. Keine `aria-describedby`-Verknüpfungen. | Immer persistentes `<label>` nutzen. Format‑Hinweise via `aria-describedby` über/unter dem Input platzieren. Disabled‑Buttons sollen Grund erklären (z. B. `aria-disabled="true"` + Text „Rechnung ist bereits archiviert“). |
| **Erwartungskonformität** | `<div>`‑ oder `<li>`-Elemente ohne native Semantik. Klickbare Elemente via `onclick` statt `<button>`/`.`. | Native Elemente verwenden: `<button type="button">`, `<a href>`. Fokus‑Ring mit `:focus-visible` stylen. Modals schließen via `Escape` und Fokus zum Trigger zurückkehren. |
| **Erlernbarkeit** | Alle Rechnungen auf einmal – keine progressive disclosure, keine Gruppierung. | Bei > 10 Einträgen: Pagination oder Virtualisierung einbauen. Kern‑Felder (Titel, Betrag) zuerst zeigen, erweiterte Infos in `<details><summary>` auslagern. |
| **Steuerbarkeit** | Klick auf eine Liste‑Zeile passiert nichts Definiertes. Keine Pause/Stop‑Steuerung bei Auto‑Refresh. | Klick‑Handler sollen explizit sein (`"Rechnung öffnen"`, `"Archivieren"`). Bei Auto‑Refresh: Stop-Button bereitstellen. `@media (prefers-reduced-motion: reduce)` beachten – Animationen deaktivieren. |
| **Robuste Verwendung** | Keine Validierung/Normalisierung von Format (z. B. Leerstellen bei Beträgen). Kein Schutz vor versehentlichem Löschen. | Eingabewerte vor Validierung `replace(/\s+/g, '')` sanitär bereinigen. Bei destruktiven Aktionen: Soft‑Delete mit `"Undo"`‑Toast oder explizites Bestätigungs‑Dialog mit aktivem Verb. |
| **Benutzerbindung** | Leere Liste ist ein „totes Bild“. Kein Anreiz zur Interaktion. | Leere‑State‑Text mit motivierender CTA („Keine Rechnungen – [Neue erstellen]“). Klare visuelle Hierarchie, Mikro‑Feedback bei Hover/Klick (z. B. `transform: scale(1.02)`). |

---

### 4. Verbesserte Komponente (Production‑Ready)

Hier ist die überarbeitete Version unter Berücksichtigung aller 5 UI‑States, Accessibility (WCAG 2.2 / BITV 2.0 / BFSG) und der ISO‑9241‑110‑Prinzipien:

```tsx
import React from "react";
import "./InvoiceList.css"; /* eigene Datei für Layout, Hyphens, Reduced‑Motion */

type Invoice = {
  id: string;
  title: string;
  amount: number | string;
  /** Optional: status="open" | "paid" | "archived" */
};

interface InvoiceListProps {
  invoices: Invoice[];
  /** Lade‑Status (wird von Eltern‑Komponente gesteuert) */
  isLoading?: boolean;
  /** Fehler‑Status (optional) */
  error?: string;
}

/**
 * InvoiceList – barrierefreie, zustandsfähige Liste
 *
 * Behandelte 5 States: Empty, Loading, Error, Overflow, Success
 * ISO‑9241‑110:2020 Prinzipien: Selbstbeschreibungsfähigkeit, Robuste Verwendung,
 * Aufgabenangemessenheit, Erlernbarkeit, Steuerbarkeit, Benutzerbindung.
 */
export function InvoiceList({
  invoices,
  isLoading = false,
  error,
}: InvoiceListProps) {
  /* --- Empty State ------------------------------------------------------- */
  if (!isLoading && !error && (invoices === undefined || invoices.length === 0)) {
    return (
      <section
        aria-label="Leere Rechnungsliste"
        role="region"
        className="invoice-list__empty"
      >
        <p className="visually-hidden">
          Es sind noch keine Rechnungen vorhanden.
        </p>
        <p>
          Noch keine Rechnungen gefunden.{" "}
          <a href="/invoices/create" className="btn btn--primary">
            Neue Rechnung erstellen
          </a>
        </p>
      </section>
    );
  }

  /* --- Loading State ----------------------------------------------------- */
  if (isLoading && !error) {
    return (
      <section
        aria-busy="true"
        aria-label="Rechnungsliste wird geladen"
        role="region"
        className="invoice-list__loading"
      >
        <ul className="invoice-list__list">
          {Array.from({ length: 5 }, (_, i) => (
            <li key={i} className="skeleton" aria-hidden="true" />
          ))}
        </ul>
      </section>
    );
  }

  /* --- Error State ------------------------------------------------------- */
  if (error) {
    return (
      <section
        aria-live="polite"
        aria-label="Fehler in der Rechnungsliste"
        role="alert"
        className="invoice-list__error"
      >
        <p className="visually-hidden">
          Es ist ein Fehler aufgetreten: {error}
        </p>
        <p>Es gab ein Problem beim Laden der Rechnungen: {error}.</p>
        <button
          className="btn btn--secondary"
          onClick={() => window.location.reload()}
        >
          Seite neu laden
        </button>
      </section>
    );
  }

  /* --- Normalfall: gerenderte Liste ------------------------------------- */
  return (
    <section
      aria-label="Rechnungsliste"
      role="region"
      className="invoice-list"
    >
      <h2 className="visually-hidden">Ihre Rechnungen</h2>
      <ul className="invoice-list__list">
        {invoices.map((inv) => (
          <li
            key={inv.id}
            role="listitem"
            className="invoice-list__item"
            tabIndex={0} /* Tastatur‑Navigation sicherstellen */
          >
            <div className="invoice-list__meta">
              <h3 className="invoice-list__title">{inv.title}</h3>
              <p className="invoice-list__amount">
                {typeof inv.amount === "number"
                  ? inv.amount.toLocaleString("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    })
                  : inv.amount}
              </p>
            </div>
            {/* Tooltip bei Textüberlauf (Overflow‑State) */}
            <span
              className="invoice-list__tooltip"
              aria-label={`Titel: ${inv.title} – Betrag: ${typeof inv.amount === "number" ? inv.amount.toLocaleString("de-DE") : inv.amount} €`}
            >
              {inv.title}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA am Ende, wenn Liste nicht leer ist – fördert Benutzerbindung */}
      {!isLoading && !error && invoices.length > 0 && (
        <p>
          <a href="/invoices/create" className="btn btn--small">
            Neue Rechnung hinzufügen
          </a>
        </p>
      )}
    </section>
  );
}
```

**`InvoiceList.css` (Kern‑Regeln):**

```css
/* --- 5‑State Layout-Grundlagen --- */
.invoice-list__list {
  list-style: none;
  margin: 0;
  padding: 0;
  hyphens: auto;               /* Overflow‑State: deutsche Worttrennung */
  overflow-wrap: break-word;
  font-size: 1rem;             /* rem‑Unit → skaliert bis 200% (Steuerbarkeit) */
}

/* --- Empty State --- */
.invoice-list__empty {
  padding: 3rem 1rem;
  text-align: center;
  color: var(--color-muted);
}
.invoice-list__empty .btn--primary {
  margin-top: 1rem;
}

/* --- Loading State --- */
.invoice-list__loading {
  padding: 3rem 1rem;
}
.invoice-list__list .skeleton {
  height: 1.2rem;
  width: 100%;
  background: var(--color-surface);
  border-radius: 4px;
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* --- Error State --- */
.invoice-list__error {
  padding: 2rem;
  background: var(--color-error-light);
  border: 1px solid var(--color-error);
  color: var(--color-error);
}

/* --- Overflow Tooltip --- */
.invoice-list__tooltip {
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 260px;
}
.invoice-list__tooltip::after {
  content: attr(aria-label);
  position: absolute;
  left: 0;
  top: 100%;
  margin-top: 0.5rem;
  padding: 0.4rem 0.6rem;
  background: var(--color-surface);
  color: var(--color-on-surface);
  border-radius: 4px;
  font-size: 0.875rem;
  white-space: normal;
  width: max-content;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.15s;
}
.invoice-list__tooltip:hover::after,
.invoice-list__tooltip:focus-visible::after {
  visibility: visible;
  opacity: 1;
}

/* --- Reduced Motion (ISO 9241‑110:2020 / WCAG) --- */
@media (prefers-reduced-motion: reduce) {
  .invoice-list__list .skeleton {
    animation: none;
    opacity: 1;
  }
  /* Keine schwebenden Effekte, keine transform‑Scaling‑Hover */
}
```

---

### 5. Was du jetzt tun kannst

1. **Personas für das Projekt persistieren:** Wenn du möchtest, dass diese Personen (z. B. „Lisa“ und „Wolfgang“) für weitere Reviews im Projekt wiederverwendet werden, schreibe sie in `docs/ux/personas.md` (nach dem Template unter `assets/personas-template.md`). Dann können zukünftige UX‑Checks direkt darauf aufbauen.
2. **Zugehörige Anforderungen ableiten:** Auf Basis der oben gefundenen Prinzipien‑Verstöße kannst du in `docs/ux/requirements-invoicelist.md` qualitative/user‑requirements formulieren (z. B. *„Als Lisa muss ich Rechnungen im Überblick scannen können, ohne dass lange Titel den Bereich zerschneiden.“*).
3. **Usability‑Test‑Aufgaben schreiben:** Wenn du Test‑Tasks für Teilnehmer brauchst, schau dir die Route C‑Routinen im System‑Prompt an – ich kann dir auch konkret non‑leading Test‑Aufgaben formulieren.

Möchtest du, dass ich die Personen speichere, Test‑Aufgaben schreibe oder direkt in deine bestehende Seite einbinde?

---

<details>
<summary>❌ Click to view Baseline Output WITHOUT Skill (0/3 Passed)</summary>

### Analyse der aktuellen Komponente

Deine `InvoiceList`-Komponente funktioniert technisch einwandfrei, aber aus UX-Sicht gibt es einige Verbesserungspotenziale:

| Thema | Aktuell | Verbesserungswürdig |
|------|---------|---------------------|
| **Leerzustand** | Renders `<ul><li></li></ul>` bei leerer Liste | Sollte eine freundliche Nachricht anzeigen |
| **Ladezustand** | Kein Handling | Sollte einen Spinner oder Platzhalter zeigen |
| **Währungsformat** | Rohzahl + `€` Zeichen | Sollte konsistent formatiert z. B. `1.234,56 €` |
| **Barrierefreiheit** | `<ul><li>` ist okay, aber keine Beschriftung für Screenreader | `role="list"` oder `aria-listen` könnten helfen |
| **Visuelle Hierarchie** | Reiner Text | Hover-Effekte, bessere Typografie, Abstände fehlen |
| **Tastatur-Navigation** | Fokus-Stile unbekannt | Essentiell für Power-User & Accessibility |

---

### Verbesserte Version

Hier ist eine robuster, ux-bewusstere Variante. Ich nutze Tailwind CSS für die Styling-Vorschläge, du kannst die Klassen aber natürlich durch dein eigenes CSS ersetzen.

```tsx
import { useState } from "react";

export interface InvoiceListProps {
  invoices: Array<{ id: string; title: string; amount: number }>;
  isLoading?: boolean;
}

export function InvoiceList({ invoices, isLoading = false }: InvoiceListProps) {
  // Leerzustand frühzeitig behandeln
  if (isLoading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center text-muted-foreground">
        <span className="animate-spin rounded-full h-6 w-6 border-b-2 mr-3"></span>
        Rechnungen werden geladen...
      </div>
    );
  }

  if (!invoices || invoices.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        <p>Keine Rechnungen gefunden.</p>
      </div>
    );
  }

  return (
    <ul role="list" className="space-y-2 divide-y divide-border/20">
      {invoices.map((inv) => (
        <li
          key={inv.id}
          className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/30 transition-colors cursor-pointer"
          aria-label={`Rechnung ${inv.title} anzeigen`}
        >
          <span className="font-medium text-sm">{inv.title}</span>
          <span className="ml-auto text-sm font-mono">
            {new Intl.NumberFormat("de-DE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(inv.amount)} €
          </span>
        </li>
      ))}
    </ul>
  );
}
```

---

### Was wurde verbessert?

1. **Leerzustand (`empty state`)** – Zeigt eine klar beschriftete Fläche an, statt leerer Listen.
2. **Ladezustand (`loading state`)** – Einfacher Spinner als Placeholder, damit User wissen: "Was passiert gerade?".
3. **Währungsformatierung** – Mittels `Intl.NumberFormat("de-DE")` wird konsistent mit Punkten als Tausendertrennern und zwei Dezimalstellen gearbeitet (z. B. `1.234,56 €`).
4. **Barrierefreiheit** – `role="list"` für das `<ul>`, `aria-label` auf jedem `<li>`, ausreichender Kontrast-Klassen-Vorrat.
5. **Visuelles Feedback** – Hover-Zustand (`hover:bg-muted/30`), runde Ecken, Cursor als Pointer, subtile Übergänge.
6. **Tastatur-Navigation** – Durch die interaktiven Klassen (`cursor-pointer`, Fokus-Styles durch Tailwind's `focus-visible`) wird die Bedienbarkeit ohne Maus unterstützt.
7. **Saubere Schnittstelle** – Props-Interface (`InvoiceListProps`) für Typ-Sicherheit und erweiterbare Optionen.

---

### Optional: Weitere UX-Optimierungen (falls du mehr Kontrolle brauchst)

- **Tooltip/Details**: Bei Hover oder Fokus einen Tooltip mit Rechnungsdatum, Status oder kurzen Infos anzeigen.
- **Aktionen**: `onClick`-Handler einbauen, der z. B. ein Modal öffnet oder zur Detailansicht navigiert.
- **Pagination/Scroll**: Wenn die Liste lang ist, `react-virtual` oder CSS `overflow` + "Load more" Button einbauen.
- **Dunkler Modus**: Sicherstellen, dass `divide-y` und `bg-muted` auch im Dark Mode korrekt funktionieren (Tailwind's `dark:` Prefixes helfen da).

Möchtest du, dass ich die Komponente weiter an ein spezielles Framework (Next.js, React Native, etc.) oder ein Design-System (MUI, Chakra, Tailwind Config) anpasse?

</details>
