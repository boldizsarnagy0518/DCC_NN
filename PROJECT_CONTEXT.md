# Project Context — NN GEO Recommendation Impact Simulator

## 1. One-sentence summary

This repository contains a proof-of-concept dashboard for the NN Hungary GenAI visibility / GEO case. It validates whether the team's actionable GEO recommendations could help NN move from being merely mentioned in AI answers to being cited, linked and recommended as an actionable next step.

---

## 2. Business context

### Client / case setting

The project is built for a Deloitte Consulting Course case about **NN Hungary** and its visibility in the emerging GenAI search environment.

The core business problem is that consumer search behaviour is shifting from traditional keyword-based search toward conversational AI-driven search. Users increasingly ask tools like ChatGPT, Gemini, Claude, Perplexity or AI Overviews questions such as:

- "What is the best life insurance in Hungary?"
- "How much life insurance does my family need?"
- "Which pension insurance offers tax benefits?"
- "Which insurer should I compare before making a decision?"

In this new search environment, being ranked on a traditional search results page is no longer sufficient. NN needs to be present inside the AI-generated answer itself, ideally as a credible, cited and actionable recommendation.

### Strategic problem

The case is not simply about increasing website traffic or generic brand awareness. The key issue is that AI systems may reduce the user's need to browse multiple pages manually. If NN is not included in the AI answer, NN may not even enter the user's consideration set.

The strategic shift is:

```text
From SEO: ranking in search results
To GEO: being retrieved, cited and recommended by generative AI systems
```

The strategic objective is:

> Make NN the most trusted, AI-citable insurance source in Hungary, then convert that visibility into measurable business results.

---

## 3. What the project is about

This project is a **GEO recommendation impact simulator**.

It does not attempt to fully recreate the live public web or claim that it measures real-time public ChatGPT/Gemini/Claude ranking. Instead, it validates the potential impact of the team's proposed NN GEO assets under controlled conditions.

The project combines two layers:

1. **Observed pre-mockup AI visibility baseline**  
   A manually collected benchmark from 48 Hungarian insurance prompts across three major AI model families.

2. **Controlled recommendation mockup validation**  
   A dashboard that compares GenAI-style answers with and without mocked recommendation assets.

The central question is:

```text
Can the recommended NN GEO assets increase NN's GenAI presence, explicit citations/links and answer actionability?
```

---

## 4. Observed baseline

Before creating the mockup assets, the team ran a manual benchmark.

### Benchmark setup

- 48 Hungarian insurance-related prompts were tested.
- 3 major model families were queried:
  - OpenAI / ChatGPT
  - Google / Gemini
  - Anthropic / Claude
- Total model-prompt outputs: 144

### Baseline metrics

| Metric | Observed baseline |
|---|---:|
| Prompts tested | 48 |
| Model outputs | 144 |
| NN prompt-level presence | 64 / 144 |
| NN unique prompt coverage | 32 / 48 |
| NN vs competitor average | 2.0× |
| Explicit NN cite/link references | 5 / 144 |

### Strategic interpretation

NN already has a relatively strong baseline in AI-generated answers. It is not invisible. However, the current presence is often not actionable enough.

The key insight is:

> NN is already mentioned, but it is not cited, linked and recommended often enough.

Therefore, the project should not only aim to increase mentions. It should help NN turn brand visibility into actionable visibility:

```text
NN is mentioned
→ NN is cited
→ NN is linked
→ NN is chosen as the next step
```

---

## 5. Project goal

The goal of the project is to validate the potential impact of the actionable GEO recommendations by testing whether mocked recommendation assets improve AI-style answers.

### Primary goal

Validate whether NN's proposed GEO assets can:

- increase NN prompt-level presence;
- increase explicit `nn.hu` citations and links;
- improve product specificity;
- improve credibility;
- improve actionability;
- direct users toward calculators, product pages, decision guides, research assets and advisor handoff paths.

### Not the primary goal

The current project is **not** a full live web monitoring platform.

It does not claim to answer:

- how public ChatGPT ranks NN today in all possible user contexts;
- whether Gemini's live Google Search grounding currently cites NN;
- whether Claude's web search currently prefers NN over all competitors;
- whether NN has guaranteed future public AI ranking improvement.

Those could become future extensions, but they are not the core POC.

---

## 6. Core methodology

The dashboard uses a controlled before/after structure.

### Without recommendation mockups

This run uses a current-like source environment. It represents NN/public content as it exists directionally today, with weaker Q&A structure, weaker citation paths and weaker next-step signals.

### With recommendation mockups

This run uses the same prompt/model setup but adds mocked GEO assets based on the recommendations.

Examples of mocked assets:

- conversational product Q&A pages;
- life insurance need estimator;
- pension gap and SZJA benefit calculators;
- health insurance decision-support calculator;
- Hungarian AI-finance research report;
- third-party credibility snippets;
- entity/schema and Wikidata-style identity mock;
- decision-guide pages;
- competitor benchmark snippets.

### Why this is controlled

The same prompt and model label are used in both conditions. Only the available source environment changes.

This isolates the effect of the proposed recommendation assets.

```text
Same prompt
+ same model / model label
+ current-like source environment
= baseline answer

Same prompt
+ same model / model label
+ current-like source environment + recommendation mockup assets
= improved answer
```

This makes the POC defensible because the goal is recommendation validation, not live web ranking measurement.

---

## 7. Why websearch is intentionally not required

The project intentionally does not require paid websearch APIs for the core POC.

Reason:

> The purpose is to isolate the impact of the proposed NN assets, not to introduce live web ranking noise.

If live websearch were added too early, the test would depend on:

- changing search results;
- crawler behaviour;
- search index freshness;
- competitor page updates;
- provider-specific grounding behaviour;
- API cost and rate limits;
- inconsistent citations.

For this POC, the stronger logic is:

```text
Observed baseline
→ recommended mockup assets
→ controlled LLM answer comparison
→ measurable uplift in mentions, links and actionability
```

A future version can add search-grounded APIs and live monitoring, but this is separate from the current recommendation impact simulator.

---

## 8. Mock mode vs live API mode

This distinction is very important.

### Mock/local mode

Mock mode uses deterministic local fallback answers generated by the project code. It is useful for:

- testing the dashboard;
- testing scoring logic;
- checking UI behaviour;
- running the demo without API keys;
- presentation backup if live API calls fail.

Mock mode is **not** strong evidence of actual LLM behaviour.

### Live API controlled-source mode

Live API mode calls actual LLM provider APIs, but still passes the controlled source package to them. The models do not browse the public web in this version.

This is the proper recommendation-impact validation mode, because the answers are generated by a real LLM.

Recommended low-cost validation setup:

```powershell
uv run python generate_responses.py --live --models gemini
uv run python dashboard.py --host 127.0.0.1 --port 8765
```

In the dashboard, the answer badge should show:

```text
API - controlled sources
```

If the badge shows:

```text
Mock fallback
```

then the provider call failed and the result should not be treated as LLM validation evidence.

---

## 9. Strategic pillars

The full GEO agenda is structured around four pillars.

### 1. Discoverability

AI systems must be able to discover NN content quickly and reliably.

Examples:

- robots.txt hygiene;
- sitemap freshness;
- IndexNow;
- llms.txt pilot;
- structured discoverability signals.

### 2. Clarity

NN pages need to answer real user questions in extractable blocks.

Examples:

- conversational headings;
- FAQ-style content;
- 40-60 word direct answers;
- structured Q&A pages;
- FAQPage schema where appropriate.

### 3. Credibility

NN needs trusted corroboration beyond its own website.

Examples:

- comparison platforms;
- financial media;
- regulatory / industry proof;
- independent citations;
- original research;
- entity records.

### 4. Actionability

AI answers should lead users to an NN-owned next step.

Examples:

- calculators;
- guides;
- quote flows;
- product pages;
- advisor handoff;
- personalized next-best-action.

---

## 10. Actionable recommendations

The current recommendation set contains ten actions.

### R1 — Rebuild key product pages around conversational search

Horizon: 0-3 months  
Pillar: Clarity  
Priority: High

Objective:

Make NN's answer blocks easier for AI systems to retrieve, extract and cite.

Mockup validation signal:

- Q&A product pages;
- extractable answer blocks;
- higher product specificity;
- clearer cited answer blocks.

### R2 — Strengthen NN's machine-readable identity

Horizon: 0-3 months  
Pillar: Discoverability + Credibility  
Priority: High

Objective:

Make it easier for AI systems to understand which entity "NN Biztosító" refers to and how it connects to trusted sources.

Mockup validation signal:

- entity profile;
- sameAs / Wikidata-style proof;
- higher credibility score;
- entity-source evidence.

### R3 — Fix technical discoverability hygiene

Horizon: 0-6 months  
Pillar: Discoverability  
Priority: Medium-high

Objective:

Improve technical readiness so AI systems and search crawlers can discover fresh, structured NN content more reliably.

Mockup validation signal:

- sitemap hygiene;
- IndexNow readiness;
- structured-data pilot;
- llms.txt pilot.

### R4 — Build an AI visibility dashboard

Horizon: 0-3 months  
Pillar: Measurement  
Priority: Medium

Objective:

Make prompt-level visibility, model differences and recommendation impact measurable instead of anecdotal.

The current repository itself acts as the POC for this recommendation.

### R5 — Build a third-party credibility ecosystem

Horizon: 3-12 months  
Pillar: Credibility  
Priority: High

Objective:

Make NN citable through sources AI systems already trust in Hungarian insurance research.

Examples:

- Google Business Profile;
- comparison platforms;
- financial media;
- review platforms;
- regulatory / industry references.

### R6 — Publish original Hungarian AI-finance research

Horizon: 3-12 months  
Pillar: Credibility + Authority  
Priority: High

Objective:

Create a recurring, citable Hungarian insight asset about how consumers use and trust AI in financial and insurance decisions.

Expected impact:

- citable authority asset;
- independent media citation potential;
- recurring source for AI answers about Hungarian consumer behaviour.

### R7 — Build decision-guide pages

Horizon: 3-12 months  
Pillar: Clarity + Actionability  
Priority: Medium

Objective:

Help models answer decision-oriented user questions more concretely.

Examples:

- life-stage guides;
- comparison guides;
- "which insurance is right for me" pages;
- product-selection support.

### R8 — Build toward Wikipedia authority path

Horizon: 12-36 months  
Pillar: Authority  
Priority: Medium

Objective:

Support long-term entity credibility if enough independent sources exist.

Important caveat:

This should not be framed as a quick marketing action. It requires neutral notability and independent sources.

### R9 — Launch public financial calculators

Horizon: 12-36 months  
Pillar: Actionability  
Priority: High

Objective:

Turn AI visibility into concrete next-step recommendations on `nn.hu`.

Examples:

- pension gap calculator;
- SZJA tax benefit calculator;
- life insurance cover estimator;
- health insurance decision-support calculator.

Expected impact:

- more explicit NN links;
- stronger actionability;
- more measurable AI-assisted demand.

### R10 — Advanced personalization

Horizon: 12-36 months  
Pillar: Actionability / conversion  
Priority: Lower-medium

Objective:

After the foundation is built, use personalization and advisor handoff to increase conversion relevance.

Expected impact:

- higher actionability;
- stronger next-best-action logic;
- better lead conversion narrative.

---

## 11. Dashboard KPIs

The dashboard separates answer quality from actual explicit link/citation behaviour.

### Answer quality / recommendation impact score

Composite heuristic score based on:

- mention quality;
- product specificity;
- credibility;
- actionability.

### Prompt-level NN presence

How many model-prompt outputs mention NN.

Baseline:

```text
64 / 144 outputs
```

### Unique prompt coverage

How many of the 48 prompts included at least one NN presence.

Baseline:

```text
32 / 48 prompts
```

### Explicit NN citation / link references

How many model-prompt outputs include an explicit `nn.hu` citation/link.

Baseline:

```text
5 / 144 outputs
```

This is the key gap. NN is already mentioned, but explicit links/citations are rare.

### NN next-step recommendations

The number of explicit `nn.hu` links to:

- product pages;
- calculators;
- decision guides;
- research pages;
- quote paths;
- advisor handoff pages.

### Source/domain mix

Shows where retrieved evidence comes from:

- current-like NN sources;
- mocked future assets;
- third-party examples;
- technical audit signals;
- local demo sources.

### Competitor mention check

Tracks competitor mentions in controlled answers for:

- UNIQA;
- Generali;
- Allianz;
- Groupama.

---

## 12. Dashboard UX / slide logic

The impact slide and dashboard messaging are aligned around the funnel:

```text
Be present
→ Be cited
→ Be chosen
```

### Be present

Goal:

Increase prompt-level AI presence.

KPI:

```text
AI answers mentioning NN / total model-prompt outputs
```

Baseline:

```text
64 / 144 model-prompt outputs
```

### Be cited

Goal:

Turn mentions into citations and links.

KPI:

```text
AI answers with explicit nn.hu links / total model-prompt outputs
```

Baseline:

```text
5 / 144 outputs
```

### Be chosen

Goal:

Convert AI visibility into lead potential.

KPI:

```text
AI-assisted leads = AI-referred visits × quote / calculator conversion rate
```

Track:

- AI referrals;
- calculator starts;
- quote clicks;
- advisor handoffs;
- qualified leads.

---

## 13. Repository structure

Important files and folders:

```text
README.md
PROJECT_CONTEXT.md
PROJECT_FEEDBACK.md
.env.example
app.py
dashboard.py
generate_responses.py

geo_demo/
  data.py
  env.py
  providers.py
  retrieval.py
  scoring.py
  linking.py
  results.py
  server.py

data/
  prompts.json
  corpus_current.json
  corpus_improved.json
  recommendations.json
  baseline_visibility.json

static/
  index.html
  app.js
  styles.css
  baseline.css

results/
  latest_results.json      # generated, ignored by git
  latest_results.csv       # generated, ignored by git

tests/
```

### `README.md`

Main user-facing project documentation. Explains purpose, methodology, baseline, API usage and run commands.

### `PROJECT_CONTEXT.md`

This file. Full project context for developers, reviewers and future AI assistants.

### `PROJECT_FEEDBACK.md`

Feedback and improvement roadmap created during project refinement.

### `data/prompts.json`

The prompt set used for testing Hungarian insurance-related user questions.

### `data/baseline_visibility.json`

The observed pre-mockup baseline metrics from the manual benchmark.

### `data/corpus_current.json`

Current-like NN/public source environment.

### `data/corpus_improved.json`

Mocked future GEO asset environment based on the recommendations.

### `data/recommendations.json`

The actionable recommendation set with:

- id;
- title;
- horizon;
- pillar;
- priority;
- demo signal;
- validation hypothesis;
- expected signal;
- asset types.

### `geo_demo/providers.py`

Defines provider integrations and mock fallback logic for:

- OpenAI;
- Gemini;
- Claude.

Also builds the grounded prompt that sends controlled source context to the model.

### `geo_demo/retrieval.py`

Simple local retrieval over the controlled corpus.

### `geo_demo/scoring.py`

Heuristic scoring logic for answer quality.

### `geo_demo/linking.py`

Counts NN mentions and extracts explicit `nn.hu` link recommendations.

### `geo_demo/server.py`

HTTP server and API layer for the dashboard.

### `static/index.html`, `static/app.js`, `static/styles.css`, `static/baseline.css`

Frontend dashboard implementation.

---

## 14. API endpoints

The dashboard server exposes:

```text
GET  /api/config
GET  /api/cached
GET  /api/sources?mode=current
GET  /api/sources?mode=improved
GET  /api/export.csv
POST /api/run
```

### `GET /api/config`

Returns:

- prompts;
- recommendations;
- baseline visibility data;
- provider status;
- corpus modes.

### `GET /api/cached`

Loads generated results from `results/latest_results.json`, or generates fallback mock results if no latest file exists.

### `POST /api/run`

Runs the benchmark for selected prompts/models.

Example:

```json
{
  "prompt_id": "p01",
  "corpus_mode": "both",
  "models": ["openai", "gemini", "claude"],
  "use_live": false
}
```

### `GET /api/export.csv`

Exports benchmark results in CSV format.

---

## 15. How to run the project

### Mock/local mode

Useful for UI testing and fallback demo.

```powershell
uv run python generate_responses.py
uv run python dashboard.py --host 127.0.0.1 --port 8765
```

Open:

```text
http://127.0.0.1:8765
```

### Recommended live validation mode

Use at least one real LLM provider. Gemini is recommended for a low-cost POC.

Create `.env`:

```powershell
Copy-Item .env.example .env
notepad .env
```

Set:

```text
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-2.5-flash
```

Run:

```powershell
uv run python generate_responses.py --live --models gemini
uv run python dashboard.py --host 127.0.0.1 --port 8765
```

### Tests

```powershell
uv run python -m compileall -q .
uv run python -m unittest discover -s tests
```

---

## 16. Important interpretation rules

### Do not overclaim

Do not say:

```text
This proves NN will rank higher in public ChatGPT/Gemini/Claude.
```

Say:

```text
This validates under controlled conditions that the recommended NN assets can improve GenAI-style answer quality, citations and actionability.
```

### Distinguish mentions from links

An NN mention is awareness.

An explicit NN link/citation is stronger because it directs the user toward an NN-owned source or action.

The key business gap is:

```text
NN has strong mention baseline but weak explicit link/citation baseline.
```

### Treat mock results carefully

Mock results are for demo stability, not strong evidence.

Live API controlled-source results are stronger evidence because a real model generates the answer.

### Websearch is future, not core

The core POC does not need websearch. Future versions may add:

- live web visibility monitoring;
- search-grounded provider calls;
- public citation tracking;
- time-series prompt monitoring;
- real AI referral attribution.

---

## 17. Suggested presentation narrative

### Full version

This POC starts from an observed 48-prompt GenAI visibility baseline. NN is already present in 64 out of 144 model-prompt outputs, but explicit NN links and citations are rare. The controlled mockup run validates whether the recommended GEO assets can turn NN from a mentioned brand into a cited, linked and actionable next step.

### Short version

NN is already visible, but not actionable enough. The POC tests whether the recommended GEO assets can increase citations, links and AI-assisted lead potential.

### Hungarian version

A kiinduló 48 promptos baseline alapján NN már erősen jelen van a GenAI válaszokban, de kevés az explicit NN link/cite. A POC azt validálja, hogy az ajánlott GEO mockup assetek képesek-e az NN jelenlétet konkrétabb, hivatkozhatóbb és actionable irányba vinni.

---

## 18. Current best framing

Best project title:

```text
NN GEO Recommendation Impact Simulator
```

Best core claim:

```text
The roadmap should not only increase AI mentions — it should make NN cited, linked and chosen as the next step.
```

Best impact logic:

```text
From "NN is mentioned" to "NN is cited, linked and chosen."
```

Best KPI funnel:

```text
Be present → Be cited → Be chosen
```

---

## 19. Future improvement ideas

Possible next steps after the current POC:

1. Add real web visibility monitoring as a separate mode.
2. Add search-grounded Gemini or OpenAI web search integration.
3. Add manual import of real AI outputs from Excel/CSV.
4. Add longitudinal prompt tracking over time.
5. Add source-level citation tracking.
6. Add competitor dashboards for UNIQA, Generali, Allianz and Groupama.
7. Add AI referral analytics if NN can tag sessions from AI platforms.
8. Add conversion attribution from calculator starts, quote clicks and advisor handoff.
9. Add slide/PPT export for executive reporting.
10. Add a more robust human review workflow for prompt outputs.

---

## 20. Final project interpretation

This is a strategic and technical POC that supports the NN GEO roadmap.

Its value is not that it perfectly recreates the entire GenAI ecosystem. Its value is that it connects:

- a real observed baseline;
- a clear strategic gap;
- actionable recommendations;
- mocked future assets;
- controlled answer generation;
- measurable KPIs;
- and a business-facing impact story.

The core message is:

> NN should not only aim to appear in GenAI answers. NN should build the assets that make it easier for AI systems to find, understand, trust, cite, link and recommend NN as the next step.
