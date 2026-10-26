# 🧭 CPUX Agent Skills — Task-Driven UX Reviews, Persona Walkthroughs & ISO 9241 Engineering

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Standard: ISO 9241-110:2020](https://img.shields.io/badge/Standard-ISO_9241--110%3A2020_%7C_210-success.svg)](#)
[![Methodology: UXQB / CPUX](https://img.shields.io/badge/Methodology-UXQB_%2F_CPUX-informational.svg)](#)
[![Eval Score: 100%](https://img.shields.io/badge/Benchmark_Lift-59%25_%E2%86%92_100%25-brightgreen.svg)](./EVAL_REPORT.md)
[![Agent Skills Compatible](https://img.shields.io/badge/npx_skills-compatible-purple.svg)](#installation--usage)

> **Stop letting AI generate pretty pixels with broken usability.**  
> `cpux-agent-skills` translates everyday developer prompts (*"do a UX review"*, *"improve this form"*, *"create personas for our app"*, *"how should we build the flow for X?"*) into rigorous **Persona Cognitive Walkthroughs**, **5-State UI Audits**, and **ISO 9241 / UXQB (CPUX)** engineering—without requiring you to write academic prompts.

---

## 💡 The Problem With Standard AI UI/UX Output

Most AI prompts and skills focus entirely on visual surface styling: Tailwind presets, drop shadows, and trendy SaaS layouts. When asked to review a component or plan a feature, standard LLMs:
1. **Jump straight into solution space:** Inventing dropdowns, modals, and tables before analyzing the physical/technical **Context of Use (*Nutzungskontext*)** or **User Needs (*Erfordernisse*)**.
2. **Code only the Happy Path:** Forgetting `Empty`, `Loading`, `Error`, and `Overflow` states.
3. **Introduce severe interaction anti-patterns:** Using `<div onClick>` instead of keyboard-focusable `<button>` elements, relying on disappearing `placeholder` attributes instead of persistent `<label>` tags, or wiping out user input via `form.reset()` upon validation failure.

This repository solves that by equipping AI coding agents (Claude Code, Cursor, Windsurf, OpenCode, Codex, Antigravity/Gemini, GitHub Copilot, Cline) with an autonomous, task-routed UX engineering engine grounded in **ISO 9241-110:2020**, **ISO 9241-210**, and **UXQB® (CPUX-F)**.

---

## 📊 Empirical Benchmark (Baseline vs. With Skill)

Evaluated across 7 real-world UX engineering tasks (broken code audits, missing UI states, destructive action flows, reusable project personas, and an unseen B2B medical touchscreen holdout task) using `nvidia/nemotron-3.5-lightning` (and verified on `nvidia/nemotron-3-ultra-550b-a55b`) via our zero-dependency runner [`scripts/run-evals.mjs`](./scripts/run-evals.mjs):

| Evaluation Mode | Passed Assertions | Score |
| :--- | :---: | :---: |
| ❌ **Without Skill (Baseline LLM)** | 13 / 22 | **59%** |
| ✅ **With `ux-review-walkthrough`** | **22 / 22** | **100%** |

### Task-by-Task Breakdown & Generated Examples

In all 7 benchmark tasks, the agent **autonomously selected the correct reference module** based solely on a casual user prompt:

| Eval Task | Autonomously Loaded Reference | Without Skill | With Skill | Side-by-Side Output |
| :--- | :--- | :---: | :---: | :--- |
| **`eval-01-broken-code-audit`** | `interaction-principles-110.md` | 1 / 4 | **4 / 4** | [View Output](./examples/eval-01-broken-code-audit.md) |
| **`eval-02-feature-from-scratch`** | `context-and-requirements.md` | 2 / 3 | **3 / 3** | [View Output](./examples/eval-02-feature-from-scratch.md) |
| **`eval-03-missing-ui-states`** | `interaction-principles-110.md` | 0 / 3 | **3 / 3** | [View Output](./examples/eval-03-missing-ui-states.md) |
| **`eval-04-destructive-action-flow`** | `interaction-principles-110.md` | 3 / 3 | **3 / 3** | [View Output](./examples/eval-04-destructive-action-flow.md) |
| **`eval-05-non-leading-test-task`** | `usability-evaluation.md` | 2 / 3 | **3 / 3** | [View Output](./examples/eval-05-non-leading-test-task.md) |
| **`eval-06-holdout-b2b-lab-touchscreen`** | `context-and-requirements.md` | 2 / 3 | **3 / 3** | [View Output](./examples/eval-06-holdout-b2b-lab-touchscreen.md) |
| **`eval-07-reusable-project-personas`** | `context-and-requirements.md` | 3 / 3 | **3 / 3** | [View Output](./examples/eval-07-reusable-project-personas.md) |

👉 **[Read the full `EVAL_REPORT.md`](./EVAL_REPORT.md)**

---

## ✨ How It Works: Task-Based Routing & Reusable Project Personas

You never need to ask for *"ISO 9241-110"* in your prompt. The main [`SKILL.md`](./skills/ux-review-walkthrough/SKILL.md) acts as a lightweight router (< 100 lines) that detects your practical intent, checks for existing project personas in `docs/ux/personas.md`, and loads only the required reference module into the context window:

```text
User Prompt ("Review this form" / "Plan feature X" / "Create & save personas" / "Write test tasks")
   │
   ▼
SKILL.md (Task Router & Project Persona Discovery in docs/ux/personas.md)
   ├─► Route A: Existing UI / Code Review
   │     └─► Loads references/interaction-principles-110.md
   │         • Reuses docs/ux/personas.md or simulates Primary + Accessibility Personas
   │         • Audits the 5 UI States (Empty, Loading, Error, Overflow, Success)
   │         • Diagnoses violations against the 7 Principles of ISO 9241-110:2020 + WCAG 2.2
   │         • Outputs refactored, production-ready code (HTML/React/Vue/Svelte/Twig/Vaadin)
   │
   ├─► Route B: New Feature Planning & Reusable Persona Creation
   │     └─► Loads references/context-and-requirements.md (+ assets/personas-template.md)
   │         • Defines Context of Use (Nutzungskontext), Persona & As-Is Scenario (Ist-Szenario)
   │         • Enforces strict Problem vs. Solution Space separation:
   │           Widget-free User Needs (Erfordernisse) & User Requirements (Nutzungsanforderungen)
   │         • Walks the Persona through the To-Be Scenario (Soll-Szenario) & UI Concept
   │         • Optionally persists reusable specs to docs/ux/personas.md & docs/ux/requirements-*.md
   │
   └─► Route C: Usability Evaluation & Testing
         └─► Loads references/usability-evaluation.md
             • Formulates realistic, non-leading Test Tasks (never leaking UI labels!)
             • Classifies usability defects by official CPUX severity levels
```

---

## 🚀 Installation & Usage

### 1. Universal Agent Skills CLI (Claude Code, Cursor, Windsurf, OpenCode, Codex, Antigravity/Gemini, Copilot, Cline)
Install directly into your current project or globally (`-g`) via the [`skills`](https://skills.sh) CLI:

```bash
# Install into the current project (auto-detects your active coding agents):
npx skills add SirLocke/cpux-agent-skills

# Or install globally across all your projects:
npx skills add SirLocke/cpux-agent-skills -g

# Or target specific agents explicitly:
npx skills add SirLocke/cpux-agent-skills --agent claude-code cursor opencode antigravity
```

### 2. Claude Code Native Plugin Marketplace
Add this repository directly inside Claude Code (validated with both `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`):

```bash
/plugin marketplace add SirLocke/cpux-agent-skills
/plugin install ux-review-walkthrough@cpux-agent-skills
```

### 3. Cursor Rules (`.cursor/rules/ux-review-walkthrough.mdc`)
For automatic activation on frontend files (`*.html`, `*.twig`, `*.vue`, `*.tsx`, `*.jsx`, `*.svelte`, `*View.java`), copy the modern `.mdc` rule or `.cursorrules`:

```bash
cp -r .cursor/rules/ /path/to/your-project/.cursor/
```

### 4. OpenCode, Codex, Jules & Gemini (`AGENTS.md` / `CLAUDE.md`)
Copy [`AGENTS.md`](./AGENTS.md) or [`CLAUDE.md`](./CLAUDE.md) to your project root for automatic repo-level context.

---

## 🧪 Running the Evaluation Suite Locally

This repository includes a zero-dependency Node.js evaluation & example generator ([`scripts/run-evals.mjs`](./scripts/run-evals.mjs)) compatible with OpenRouter (Free Tier), Groq, OpenAI, or local Ollama / `llama.cpp` instances:

```bash
# Run with OpenRouter Free Tier (0.00 €):
export OPENROUTER_API_KEY="sk-or-v1-..."
export EVAL_MODEL="nvidia/nemotron-3-ultra-550b-a55b:free"
npm run eval

# Or run with a local Ollama instance (no API key required):
OPENAI_BASE_URL="http://localhost:11434/v1" EVAL_MODEL="qwen2.5-coder:7b" npm run eval
```

Running `npm run eval` automatically executes all test cases in [`skills/ux-review-walkthrough/evals/evals.json`](./skills/ux-review-walkthrough/evals/evals.json), updates [`EVAL_REPORT.md`](./EVAL_REPORT.md), and regenerates all side-by-side comparison files in [`/examples`](./examples/).

---

## 📁 Repository Structure

```text
cpux-agent-skills/
├── .claude-plugin/
│   ├── marketplace.json                        # Claude Code Plugin Marketplace catalog
│   └── plugin.json                             # Native Claude Code Plugin manifest
├── .cursor/
│   └── rules/
│       └── ux-review-walkthrough.mdc           # Auto-glob Cursor rule for frontend files
├── examples/                                   # Real side-by-side benchmark outputs
│   ├── eval-01-broken-code-audit.md
│   ├── eval-02-feature-from-scratch.md
│   ├── eval-03-missing-ui-states.md
│   ├── eval-04-destructive-action-flow.md
│   ├── eval-05-non-leading-test-task.md
│   ├── eval-06-holdout-b2b-lab-touchscreen.md
│   └── eval-07-reusable-project-personas.md
├── scripts/
│   └── run-evals.mjs                           # Zero-dependency LLM-as-a-Judge eval runner
├── skills/
│   └── ux-review-walkthrough/
│       ├── SKILL.md                            # Task-based router & scope triage
│       ├── assets/
│       │   └── personas-template.md            # Reusable template for docs/ux/personas.md
│       ├── evals/
│       │   └── evals.json                      # 7 benchmark tasks & 22 assertions
│       └── references/
│           ├── context-and-requirements.md     # ISO 9241-210, Personas & DE↔EN Glossary
│           ├── interaction-principles-110.md   # Walkthrough, 5-State Matrix, ISO 9241-110:2020 & WCAG
│           └── usability-evaluation.md         # Non-leading test tasks & severity scale
├── .cursorrules                                # Legacy Cursor rules fallback
├── AGENTS.md                                   # OpenCode / Codex / Jules / Gemini instructions
├── CLAUDE.md                                   # Claude Code project instructions
├── EVAL_REPORT.md                              # Latest automated benchmark scorecard
├── LICENSE                                     # Apache-2.0 License
├── package.json
└── README.md
```

---

## ⚖️ Legal Notice & Attribution

This is an independent, community-driven open-source project.

It is **not** affiliated with, endorsed by, or officially certified by the **International Usability and User Experience Qualification Board (UXQB® e.V.)** or the **International Organization for Standardization (ISO)**.

All prompt instructions, cognitive walkthrough heuristics, and code checklists are original formulations engineered for LLM execution, aligned with the publicly established terminology of the ISO 9241 series and UXQB glossary.

---

## 📄 License

Licensed under the [Apache License 2.0](./LICENSE) — free for personal and commercial use.
