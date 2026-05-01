# NN GEO Recommendation Impact Simulator

Recommendation impact POC for the NN GenAI visibility / GEO case.

The project now combines two layers:

1. **Observed pre-mockup AI visibility baseline**  
   48 Hungarian insurance prompts were tested across OpenAI / ChatGPT, Google / Gemini and Anthropic / Claude. This created the baseline view of how often NN appears today and how often answers include explicit NN links/citations.

2. **Mockup-only recommendation validation**  
   The dashboard uses the observed baseline as the before-state, then runs only the improved/mockup source environment to test whether the actionable recommendations can increase NN mentions, explicit citations/links and answer actionability.

The key business question is:

```text
Can the recommended NN GEO assets increase NN's GenAI presence, explicit citations/links and answer actionability?
```

## Observed Baseline

The uploaded pre-mockup dashboard showed that NN already has a strong baseline, but the visibility is not yet actionable enough.

| Metric | Observed baseline |
|---|---:|
| Prompts tested | 48 |
| Model outputs | 144 |
| NN prompt-level presence | 64 / 144 |
| NN unique prompt coverage | 32 / 48 |
| NN vs competitor average | 2.0× |
| Explicit NN cite/link references | 5 / 144 |

Strategic interpretation:

> NN is already visible in GenAI answers, but the opportunity is to move from being mentioned to being cited, linked and recommended as the next step.

Therefore, the mockup validation should not only improve answer quality. It should specifically aim to:

- increase NN prompt-level presence where NN is currently absent;
- increase explicit `nn.hu` citations and links;
- make NN mentions more product-specific;
- direct users toward calculators, product Q&A pages, decision guides, research assets and advisor handoff paths.

## Methodology Note

This dashboard is a recommendation impact POC for NN's GenAI / GEO strategy.

The current workflow uses:

1. **Observed baseline**  
   The already collected Excel/HTML benchmark from 48 prompts and 3 AI model families.

2. **Mockup validation run**  
   The improved source environment enriched with mocked GEO assets based on the recommendations.

This means the live API run does **not** need to regenerate the pre-mockup state. It only tests the recommendation mockup assets.

Request count for the cheapest full validation run:

```text
48 prompts × 1 corpus mode × 1 model = 48 requests
```

The dashboard does not claim to measure live public ChatGPT, Gemini or Claude rankings. Websearch is intentionally not required for the core POC, because the goal is recommendation validation under controlled conditions. A future version could add live web visibility monitoring as a separate extension.

In live API mode, provider models receive the controlled mockup source package. They do not browse the public web in this version.

## Recommended Validation Mode

Mock/local mode is useful for technical testing, UI stability and backup demos.

However, the real recommendation-impact validation should be run with at least one live LLM provider using controlled mockup sources. Gemini is enough for a low-cost POC run.

```powershell
uv run python generate_responses.py --live --models gemini
uv run python dashboard.py --host 127.0.0.1 --port 8765
```

In the dashboard, check that the answer badges show:

```text
API - controlled sources
```

If the badge shows `Mock fallback`, the provider call failed and the result should not be treated as LLM validation evidence.

## Recommended Workflow With UV

UV is the project runner. No external Python packages are required.

Use the demo in two steps:

1. Generate mockup validation responses.
2. Start the dashboard that displays the observed baseline and mockup results.

### 1. Generate responses

Mock/local mode:

```powershell
uv run python generate_responses.py
```

Live API mode, after filling `.env`:

```powershell
uv run python generate_responses.py --live
```

Gemini-only live validation:

```powershell
uv run python generate_responses.py --live --models gemini
```

By default, `generate_responses.py` now runs:

```text
--corpus-mode improved
```

because the pre-mockup baseline is already imported from the uploaded Excel/HTML benchmark.

If you explicitly want the old controlled A/B run, use:

```powershell
uv run python generate_responses.py --live --models gemini --corpus-mode both
```

This writes:

```text
results/latest_results.json
results/latest_results.csv
```

### 2. Start dashboard

```powershell
uv run python dashboard.py --host 127.0.0.1 --port 8765
```

Then open:

```text
http://127.0.0.1:8765
```

If port `8765` is already in use, choose another port:

```powershell
uv run python dashboard.py --host 127.0.0.1 --port 8766
```

`app.py` still works as a compatibility entrypoint, but `dashboard.py` is the preferred command.

## Test With UV

```powershell
uv run python -m compileall -q .
uv run python -m unittest discover -s tests
```

## API Keys

The dashboard works without external API calls through the cached/local mock benchmark. This is useful for checking the dashboard, but it is not the strongest validation evidence.

To run live provider calls, copy `.env.example` to `.env` and fill in the relevant keys:

```powershell
Copy-Item .env.example .env
notepad .env
```

Example `.env` content:

```text
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini

GEMINI_API_KEY=...
GEMINI_MODEL=gemini-2.5-flash

ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=claude-3-5-haiku-latest
```

Then run:

```powershell
uv run python generate_responses.py --live --models gemini
uv run python dashboard.py --host 127.0.0.1 --port 8765
```

You can also set keys directly in PowerShell instead of using `.env`:

```powershell
$env:GEMINI_API_KEY="..."
uv run python generate_responses.py --live --models gemini
uv run python dashboard.py --host 127.0.0.1 --port 8765
```

## What The Dashboard Measures

The dashboard now compares:

- the **observed pre-mockup baseline** from the uploaded Excel/HTML dashboard;
- the **mockup validation run** using the improved recommendation assets.

For each mockup answer it scores:

- **Mention quality:** whether NN is mentioned clearly and usefully.
- **Product specificity:** whether the answer connects NN to concrete insurance products or decision situations.
- **Credibility:** whether the answer uses controlled citations and credible source types.
- **Actionability:** whether the answer gives a concrete next step.
- **NN link recommendations:** how often the answer gives an explicit `nn.hu` URL as a next step.
- **Prompt coverage:** how many of the tested prompts mention NN and how many link NN.

The link metric is intentionally separate from mentions. An NN mention is awareness. An NN link recommendation is a stronger acquisition proxy, because the answer sends the user to a product page, calculator, guide, quote path or advisor handoff.

The main score is an **answer quality / recommendation impact score**, not a live public AI ranking score.

## What You See On The Dashboard

The dashboard includes:

- **Observed pre-mockup AI visibility baseline:** 48 prompts, 144 outputs, 64 NN prompt-level presences and 5 explicit NN cite/link references.
- **Mockup answer quality:** recommendation impact score from the improved/mockup corpus.
- **Link/cite uplift vs observed:** mockup explicit NN links minus the observed baseline of 5 explicit NN link/cite references.
- **NN next-step recommendations:** observed explicit links -> mockup explicit links.

Below that, the dashboard explains why the mockup run improves:

- **GEO Pillar Breakdown:** mention quality, product specificity, credibility and actionability.
- **Next-step Destination Mix:** what kind of NN asset gets linked, such as calculator, product Q&A, guide, research or entity page.
- **Source Domain Mix:** which domains or local source groups appear in the retrieved evidence.
- **Competitor Mention Check:** mockup-answer mentions of UNIQA, Generali, Allianz and Groupama.
- **Actionable Recommendation Coverage:** how the mocked assets map to the recommendations, including validation hypothesis and expected signal.
- **Prompt-level Mockup Coverage:** which prompts mention NN and which prompts include explicit NN links in the mockup run.
- **How to Read the KPIs:** short definitions for the scoring categories.

The dashboard also exposes a CSV export:

```text
GET /api/export.csv
```

## Current Demo Assets

The current corpus is kept for optional controlled A/B testing only.

The improved corpus is the main validation corpus and adds mocked recommendation assets:

- Conversational product Q&A pages.
- Life insurance cover estimator.
- Pension gap and SZJA benefit calculators.
- Health insurance decision-support calculator.
- Original Hungarian AI-finance research report.
- Third-party credibility ecosystem.
- Entity/schema and Wikidata-style identity mock.
- International and Hungarian competitor benchmark snippets.

## What This POC Validates

The POC validates whether the proposed assets make NN easier for GenAI systems to use in answers:

- Conversational product pages should improve product specificity and prompt-level NN presence.
- Entity/schema mockups should improve credibility and source clarity.
- Third-party proof should improve comparison and trust signals.
- Original research should create a citable authority asset.
- Decision guides should improve clarity and next-step relevance.
- Calculators should increase explicit NN link recommendations.
- Personalization and advisor handoff should improve actionability.

This is validation evidence, not a guarantee of live public ranking improvement.

## Future Extension

A later version could add real web visibility monitoring, search-grounded APIs, public citation tracking and time-series reporting. Those are useful extensions, but they are separate from the current recommendation impact POC.

## API Endpoints

```text
GET  /api/config
GET  /api/cached
GET  /api/sources?mode=improved
GET  /api/sources?mode=current
GET  /api/export.csv
POST /api/run
```

Example `POST /api/run` body for mockup-only validation:

```json
{
  "prompt_id": "p01",
  "corpus_mode": "improved",
  "models": ["gemini"],
  "use_live": true
}
```

## Suggested Presentation Line

This POC starts from an observed 48-prompt GenAI visibility baseline. NN is already present in 64 out of 144 model-prompt outputs, but explicit NN links/citations are rare. The mockup-only validation run tests whether the recommended GEO assets can turn NN from a mentioned brand into a cited and actionable next step — without paying for a second pre-mockup API run.

Short Hungarian version:

```text
A kiinduló 48 promptos baseline alapján NN már erősen jelen van a GenAI válaszokban, de kevés az explicit NN link/cite. Ezért az API-val már csak a mockup asseteket futtatjuk, és azt validáljuk, hogy ezek képesek-e az NN jelenlétet konkrétabb, hivatkozhatóbb és actionable irányba vinni.
```
