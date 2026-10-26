# Real-World Eval Example: `eval-05-non-leading-test-task`
> Automatically generated with `nvidia/nemotron-3.5-lightning:free` (Autonomously loaded reference: `references/usability-evaluation.md`)

## 💬 User Prompt
```text
Ich will morgen mit 5 Leuten testen, ob unser neuer Abo-Bereich verständlich ist. Im Menü heißt der Punkt 'Mitgliedschaft verwalten' und dort gibt es den Button 'Pausieren'. Schreib mir mal zwei gute Testaufgaben für die Testpersonen.
```

---

## 📊 Assertion Scorecard
| Assertion | Without Skill (Baseline) | With `ux-review-walkthrough` |
| :--- | :---: | :---: |
| Die für die Testpersonen ausformulierten Aufgabentexte verraten NICHT den Klickpfad und enthalten nicht die wörtlichen UI-Begriffe 'Mitgliedschaft verwalten' oder 'Pausieren'. | ❌ FAIL | ✅ PASS |
| Verpackt die Aufgaben in realistische Alltagsszenarien (z. B. längerer Auslandsaufenthalt / vorübergehende Unterbrechung) mit objektiv überprüfbarem Endzustand. | ✅ PASS | ✅ PASS |
| Erklärt für den Testleiter kurz das methodische Prinzip nicht-leitender Testaufgaben. | ✅ PASS | ✅ PASS |

---

## ✅ Output WITH `ux-review-walkthrough` (3/3 Passed)

Beide Aufgaben sind so formuliert, dass sie die **non-leading rule** (keine UI-Label im Aufgaben-Text) einhalten, realistische Szenarien mit konkreten Daten nutzen und einen objektiv verifizierbaren Endzustand für dich als Moderator definieren.

---

### 📋 Testaufgabe 1
**Szenario & Aufgabe für die Testperson:**
> „Du planst eine dreimonatige Reise ins Ausland und wirst in dieser Zeit den Service nicht nutzen. Du möchtest jedoch sicherstellen, dass dein bestehendes Konto, deine Einstellungen und deine Historie vollständig erhalten bleiben und nach deiner Rückkehr automatisch reaktiviert werden. Bitte nimm die notwendigen Einstellungen vor, um das Abo für diese Zeit auszusetzen, und gib mir Bescheid, sobald du sicher bist, dass alles korrekt eingerichtet ist.“

**Verifizierbarer Endzustand (für dich als Moderator):**
- Keine fällige Abbuchung für die nächsten 3 Monate
- Abo-Status zeigt „Pausiert“ / „Ruhephase“
- Alle Nutzerdaten sind vorhanden und unverändert

---

### 📋 Testaufgabe 2
**Szenario & Aufgabe für die Testperson:**
> „Du möchtest den Service für den nächsten Monat aussetzen, weil du beruflich unterwegs bist und keine Nutzung erwartest. Du möchtest jedoch nicht, dass dein Konto gelöscht wird oder du bei Rückkehr ein neues abschließen musst. Bitte richte die Pausierung ein und signalisiere mir, wenn du bestätigt hast, dass das Abo in den Ruhemodus versetzt wurde und keine Zahlungen mehr fällig sind.“

**Verifizierbarer Endzustand (für dich als Moderator):**
- Nächste Zahlung ist verschoben/ausgesetzt
- Kontostatus zeigt an, dass es „gehalten“ wird
- Profil- und Settings-Daten sind intakt

---

**Hinweis zur Methodik:**  
Diese Aufgaben verzichten bewusst auf Formulierungen wie *„Gehe im Menü auf 'Mitgliedschaft verwalten'“* oder *„Klicke auf 'Pausieren'“*. Stattdessen beschreiben sie das **Ziel** und den **Kontext** aus Sicht der Person. Das verhindert, dass die Testpersonen nur noch UI-Elemente abklappern, statt zu prüfen, ob der Zweck (Abo unterbrechen, Daten behalten) wirklich verständlich und erreichbar ist. 

Viel Erfolg beim Test morgen! Wenn du die Ergebnisse auswerten willst, kannst du die Ergebnisse gerne nach der CPUX-Schweregrad-Skala (kritisch / schwerwiegend / geringfügig) klassifizieren.

---

<details>
<summary>❌ Click to view Baseline Output WITHOUT Skill (2/3 Passed)</summary>

Hier sind zwei praxisnahe Testaufgaben, die sich gut für 5 Testpersonen eignen. Sie sind so formuliert, dass sie echte Nutzerhandlungen simulieren, ohne zu sehr vorzugeben, was genau geklickt werden muss – das beobachtest du dann ja später.

### Testaufgabe 1 (Fokus: Auffindbarkeit & Navigation)
> “Stell dir vor, du hast in den nächsten Monaten weniger Zeit für das Angebot und möchtest dein Abo vorübergehend pausieren. Bitte suche über das Menü den Weg dorthin und pausiere dein Abo, damit du später wieder problemlos weitermachen kannst. Nimm dir so viel Zeit, wie du brauchst, und sag uns laut, was du tust und worauf du klickst.”

### Testaufgabe 2 (Fokus: Verständlichkeit & Bestätigung)
> “Du bist nun im Bereich ‘Mitgliedschaft verwalten’. Wir möchten wissen, ob der Button ‘Pausieren’ klar erkennbar ist und was er bewirkt. Klicke bitte auf ‘Pausieren’, um dein Abo zu pausieren. Anschließend: Was passiert als Nächstes? Wie stehst du zu dem, was auf dem Bildschirm erscheint?”

---

### Kleiner Tipp für die Durchführung:
- Lass die Personen **laut denken** („Think aloud“).
- Notiere dir, ob sie den Menüpunkt sofort finden, ob sie ‘Pausieren’ als Button erkennen und ob sie verstehen, was passiert (z. B. Rückmeldung, Bestätigung, Rückkehr auf Startseite).
- Bei Aufgabe 2 kannst du zusätzlich fragen: “Würdest du Freunden erklären, wie man das macht?” – das zeigt, ob der Prozess wirklich intuitiv ist.

Viel Erfolg beim Test morgen! Wenn du später die Ergebnisse auswertest und merkst, dass sich viele verhaken, lassen sich die Aufgaben auch leicht anpassen.

</details>
