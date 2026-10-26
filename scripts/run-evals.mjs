import fs from 'node:fs';
import path from 'node:path';

if (fs.existsSync('.env')) {
  const lines = fs.readFileSync('.env', 'utf8').replace(/\r/g, '').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const k = trimmed.slice(0, eqIdx).trim();
      const v = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
      if (v && !process.env[k]) process.env[k] = v;
    }
  }
}

const apiKey = (
  process.env.OPENROUTER_API_KEY ||
  process.env.GROQ_API_KEY ||
  process.env.OPENAI_API_KEY ||
  ''
).replace(/[\r\n\s'"]/g, '');

const BASE_URL = (process.env.OPENAI_BASE_URL || 'https://openrouter.ai/api/v1').replace(/\/$/, '');
const MODEL = process.env.EVAL_MODEL || 'nvidia/nemotron-3-ultra-550b-a55b:free';
const isLocalEndpoint = /localhost|127\.0\.0\.1|0\.0\.0\.0/.test(BASE_URL);

if (!apiKey && !isLocalEndpoint) {
  console.error('Error: Missing API key. Set OPENROUTER_API_KEY, GROQ_API_KEY, or OPENAI_API_KEY.');
  process.exit(1);
}

const skillDir = path.resolve('./skills/ux-review-walkthrough');
const examplesDir = path.resolve('./examples');
fs.mkdirSync(examplesDir, { recursive: true });

const evalsData = JSON.parse(fs.readFileSync(path.join(skillDir, 'evals/evals.json'), 'utf8'));
const skillMd = fs.readFileSync(path.join(skillDir, 'SKILL.md'), 'utf8');
const refsDir = path.join(skillDir, 'references');
const availableRefFiles = fs.readdirSync(refsDir).filter(f => f.endsWith('.md'));

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function callLLM(systemPrompt, userPrompt, retries = 5) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'HTTP-Referer': 'https://github.com/SirLocke/cpux-agent-skills',
    'X-Title': 'CPUX Agent Skills Eval'
  });
  if (apiKey) headers.set('Authorization', `Bearer ${apiKey}`);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(`${BASE_URL}/chat/completions`, {
        method: 'POST',
        headers,
        signal: AbortSignal.timeout(240_000),
        body: JSON.stringify({
          model: MODEL,
          temperature: 0.1,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ]
        })
      });

      if ((res.status === 429 || res.status >= 500) && attempt < retries) {
        const waitSec = attempt * 8;
        console.log(`      [HTTP ${res.status}] Retrying in ${waitSec}s (${attempt}/${retries})...`);
        await sleep(waitSec * 1000);
        continue;
      }

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} (${BASE_URL}): ${await res.text()}`);
      }

      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content;
      if (!content) {
        if (attempt < retries) {
          await sleep(5000);
          continue;
        }
        throw new Error(`Empty response payload: ${JSON.stringify(data)}`);
      }
      return content;
    } catch (err) {
      if (attempt < retries) {
        console.log(`      [${err.name}] Retrying in 6s (${attempt}/${retries})...`);
        await sleep(6000);
        continue;
      }
      throw err;
    }
  }
  throw new Error(`Exhausted ${retries} retries (${BASE_URL}).`);
}

async function selectReferenceFile(userPrompt) {
  const routerSystem = `${skillMd}\n\nYou are an autonomous agent selecting which reference file to load before answering. Available files in references/: ${availableRefFiles.join(', ')}. Reply ONLY with the exact filename (e.g. interaction-principles-110.md).`;
  const rawChoice = await callLLM(routerSystem, userPrompt);
  const matched = availableRefFiles.find(f => rawChoice.includes(f));
  return matched || availableRefFiles[0];
}

async function gradeOutput(output, assertions) {
  const judgeSystem = `You are a fair, precise QA Evaluator for ISO 9241 and UXQB (CPUX) standards.
Evaluate the assistant response against each assertion.
Important: When an assertion checks whether 'Erfordernisse (User Needs)' are free of UI widgets, only check the User Needs section itself—proposing concrete UI widgets later in the 'Interaction Concept' section is expected and valid!
Respond ONLY with a valid JSON object in this exact structure:
{
  "results": [
    { "assertion": "exact assertion text", "passed": true, "reason": "1 short sentence why it passed or failed" }
  ]
}`;

  const judgePrompt = `### Assistant Response to Evaluate:\n${output}\n\n### Assertions to Check:\n${JSON.stringify(assertions, null, 2)}`;
  const raw = await callLLM(judgeSystem, judgePrompt);

  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error(`Judge returned invalid JSON:\n${raw}`);
  return JSON.parse(jsonMatch[0]).results;
}

console.log(`Starting CPUX Evaluation Suite`);
console.log(`Endpoint: ${BASE_URL}`);
console.log(`Model:    ${MODEL}\n`);

let baselinePassed = 0, skillPassed = 0, totalAssertions = 0;
const reportLines = [
  `# 📊 CPUX Agent Skill — Automated Eval Benchmark`,
  ``,
  `- **Model evaluated:** \`${MODEL}\``,
  `- **Date:** ${new Date().toISOString().split('T')[0]}`,
  ``
];

for (const item of evalsData.evals) {
  console.log(`----------------------------------------------------------------`);
  console.log(`Task: ${item.id}`);
  console.log(`----------------------------------------------------------------`);

  console.log(`  [1/5] Generating baseline output...`);
  const baselineOut = await callLLM('You are a helpful web developer and UI assistant.', item.prompt);
  await sleep(2500);

  console.log(`  [2/5] Grading baseline output...`);
  const baselineGrades = await gradeOutput(baselineOut, item.assertions);
  await sleep(2500);

  console.log(`  [3/5] Selecting reference module via SKILL.md router...`);
  const chosenRef = await selectReferenceFile(item.prompt);
  console.log(`        Selected: references/${chosenRef}`);
  await sleep(2000);

  console.log(`  [4/5] Generating skill-guided output...`);
  const refContent = fs.readFileSync(path.join(refsDir, chosenRef), 'utf8');
  const skillOut = await callLLM(`${skillMd}\n\n--- LOADED REFERENCE: ${chosenRef} ---\n${refContent}`, item.prompt);
  await sleep(2500);

  console.log(`  [5/5] Grading skill-guided output...`);
  const skillGrades = await gradeOutput(skillOut, item.assertions);
  await sleep(2500);

  const bPass = baselineGrades.filter(r => r.passed).length;
  const sPass = skillGrades.filter(r => r.passed).length;
  totalAssertions += item.assertions.length;
  baselinePassed += bPass;
  skillPassed += sPass;

  console.log(`\n  Without Skill: ${bPass}/${item.assertions.length}`);
  baselineGrades.forEach(g => console.log(`    ${g.passed ? 'PASS' : 'FAIL'}: ${g.assertion} (${g.reason})`));

  console.log(`\n  With Skill:    ${sPass}/${item.assertions.length}`);
  skillGrades.forEach(g => console.log(`    ${g.passed ? 'PASS' : 'FAIL'}: ${g.assertion} (${g.reason})\n`));

  const exampleMd = `# Real-World Eval Example: \`${item.id}\`
> Automatically generated with \`${MODEL}\` (Autonomously loaded reference: \`references/${chosenRef}\`)

## 💬 User Prompt
\`\`\`text
${item.prompt}
\`\`\`

---

## 📊 Assertion Scorecard
| Assertion | Without Skill (Baseline) | With \`ux-review-walkthrough\` |
| :--- | :---: | :---: |
${item.assertions.map((a, idx) => `| ${a} | ${baselineGrades[idx]?.passed ? '✅ PASS' : '❌ FAIL'} | ${skillGrades[idx]?.passed ? '✅ PASS' : '❌ FAIL'} |`).join('\n')}

---

## ✅ Output WITH \`ux-review-walkthrough\` (${sPass}/${item.assertions.length} Passed)

${skillOut}

---

<details>
<summary>❌ Click to view Baseline Output WITHOUT Skill (${bPass}/${item.assertions.length} Passed)</summary>

${baselineOut}

</details>
`;

  const examplePath = path.join(examplesDir, `${item.id}.md`);
  fs.writeFileSync(examplePath, exampleMd, 'utf8');

  reportLines.push(`### \`${item.id}\` ([View Full Output](./examples/${item.id}.md))`);
  reportLines.push(`- **Autonomously selected reference:** \`references/${chosenRef}\``);
  reportLines.push(`- **Without Skill:** ${bPass}/${item.assertions.length}`);
  reportLines.push(`- **With Skill:** **${sPass}/${item.assertions.length}**\n`);
}

const bPct = Math.round((baselinePassed / totalAssertions) * 100);
const sPct = Math.round((skillPassed / totalAssertions) * 100);

reportLines.splice(4, 0,
  `## 🏆 Summary: Baseline Lift`,
  `| Mode | Passed Assertions | Score |`,
  `| :--- | :---: | :---: |`,
  `| ❌ **Without Skill (Baseline)** | ${baselinePassed} / ${totalAssertions} | **${bPct}%** |`,
  `| ✅ **With \`ux-review-walkthrough\`** | ${skillPassed} / ${totalAssertions} | **${sPct}%** |`,
  ``
);

fs.writeFileSync('./EVAL_REPORT.md', reportLines.join('\n'), 'utf8');
console.log(`Completed. Baseline: ${bPct}% -> With Skill: ${sPct}%`);
