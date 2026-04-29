# NN GEO Recommendation Impact Simulator

Recommendation impact POC for the NN GenAI visibility / GEO case.

The dashboard validates whether NN's actionable GEO recommendations could improve GenAI-style answer quality. It compares two controlled source environments:

- **Without recommendation mockups:** a current-like NN/public source environment with weaker Q&A, credibility and next-step signals.
- **With recommendation mockups:** the same environment enriched with mocked GEO assets based on the recommendations: Q&A product pages, decision guides, original research, third-party proof, calculators, entity signals and explicit next-step links.

The key question is:

```text
If NN implemented the recommended GEO assets, would GenAI-style answers become more specific, more credible and more actionable for users?
```

## Methodology Note

This dashboard is a recommendation impact POC for NN's GenAI / GEO strategy.

The goal is to validate whether the actionable recommendations could improve GenAI-style answer quality. The dashboard compares two controlled source environments:

1. **Without recommendation mockups**  
   A current-like NN/public source environment with weaker Q&A, credibility and next-step signals.

2. **With recommendation mockups**  
   The same environment enriched with mocked GEO assets based on the recommendations, such as product Q&A pages, decision guides, calculators, original research, entity signals and third-party proof.

The same prompts and model labels are used in both runs. This isolates the effect of the recommendation assets.

The dashboard does not claim to measure live public ChatGPT, Gemini or Claude rankings. Websearch is intentionally not required for the core POC, because the goal is recommendation validation under controlled conditions. A future version could add live web visibility monitoring as a separate extension.

In live API mode, provider models receive the same controlled source package. They do not browse the public web in this version.

## Recommended Workflow With UV

UV is the project runner. No external Python packages are required.

Use the demo in two steps:

1. Generate benchmark responses.
2. Start the dashboard that displays those responses.

### 1. Generate responses

Mock/local mode:

```powershell
uv run python generate_responses.py
```

Live API mode, after filling `.env`:

```powershell
uv run python generate_responses.py --live
```

This writes:

```text
results/latest_results.json
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

The dashboard works without external API calls through the cached/local mock benchmark.

To run live provider calls, copy `.env.example` to `.env` and fill in the relevant keys:

```powershell
Copy-Item .env.example .env
notepad .env
```

Example `.env` content:

```text
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-4.1-mini

GEMINI_API_KEY=...
GEMINI_MODEL=gemini-2.5-flash

ANTHROPIC_API_KEY=...
ANTHROPIC_MODEL=claude-3-5-haiku-latest
```

Then start the server:

```powershell
uv run python generate_responses.py --live
uv run python dashboard.py --host 127.0.0.1 --port 8765
```

In the UI, enable **Use provider APIs with controlled sources** to call the real providers. If a key is missing or an API call fails, the app falls back to local mock output for that provider.

You can also set keys directly in PowerShell instead of using `.env`:

```powershell
$env:OPENAI_API_KEY="..."
$env:GEMINI_API_KEY="..."
$env:ANTHROPIC_API_KEY="..."
uv run python generate_responses.py --live
uv run python dashboard.py --host 127.0.0.1 --port 8765
```

## What The Dashboard Measures

The dashboard runs the same Hungarian insurance prompts against three model labels:

- ChatGPT / OpenAI
- Gemini
- Claude

For each answer it scores:

- **Mention quality:** whether NN is mentioned clearly and usefully.
- **Product specificity:** whether the answer connects NN to concrete insurance products or decision situations.
- **Credibility:** whether the answer uses controlled citations and credible source types.
- **Actionability:** whether the answer gives a concrete next step.
- **NN link recommendations:** how often the answer gives an explicit `nn.hu` URL as a next step.
- **Prompt coverage:** how many of the tested prompts mention NN and how many link NN.

The link metric is intentionally separate from mentions. An NN mention is awareness. An NN link recommendation is a stronger acquisition proxy, because the answer sends the user to a product page, calculator, guide, quote path or advisor handoff.

The main score is an **answer quality / recommendation impact score**, not a live public AI ranking score.

## What You See On The Dashboard

The dashboard is split into two clear views:

- **Without recommendation mockups:** results using the current-like source corpus.
- **With recommendation mockups:** results using the mocked GEO recommendation assets.

The top of the dashboard shows executive KPIs:

- Recommendation impact score without and with recommendation mockups.
- Answer quality lift.
- NN next-step recommendations before vs after.
- How many prompts mention NN.
- How many prompts link to NN.
- Total NN mentions and total explicit NN links.

Below that, the dashboard explains why the after-state improves:

- **GEO Pillar Breakdown:** mention quality, product specificity, credibility and actionability.
- **Next-step Destination Mix:** what kind of NN asset gets linked, such as calculator, product Q&A, guide, research or entity page.
- **Source Domain Mix:** which domains or local source groups appear in the retrieved evidence.
- **Competitor Mention Check:** controlled-answer mentions of UNIQA, Generali, Allianz and Groupama.
- **Actionable Recommendation Coverage:** how the mocked assets map to the 10 recommendations in the context file, including validation hypothesis and expected signal.
- **Prompt-level Coverage:** which prompts mention NN and which prompts include explicit NN links.
- **How to Read the KPIs:** short definitions for the scoring categories.

The final test section lets you inspect individual prompts, compare model outputs, and see which local sources were retrieved.

The dashboard also exposes a CSV export:

```text
GET /api/export.csv
```

The generator writes the same export to:

```text
results/latest_results.csv
```

Each answer shows whether it came from:

- `API - controlled sources`
- `Mock output`
- `Mock fallback`

Each source also shows a status label:

- `current-like source`
- `existing NN asset`
- `recommendation mockup asset`
- `third-party example`
- `technical audit signal`
- `current market context`

## Current Demo Assets

The current corpus includes NN's existing directionally relevant assets, including:

- NN life insurance product page.
- NN pension product context.
- NN pension calculator.
- NN Egészség Útlevél health insurance context.
- A current technical GEO gap summary.

The improved corpus adds mocked recommendation assets:

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

- Conversational product pages should improve product specificity.
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
GET  /api/sources?mode=current
GET  /api/sources?mode=improved
GET  /api/export.csv
POST /api/run
```

Example `POST /api/run` body:

```json
{
  "prompt_id": "p01",
  "corpus_mode": "both",
  "models": ["openai", "gemini", "claude"],
  "use_live": false
}
```

## Suggested Presentation Line

This POC validates whether NN's actionable GEO recommendations could improve GenAI-style answers. It compares the same prompts without and with recommendation mockup assets, then measures whether answers become more specific, credible and actionable.

Short Hungarian version:

```text
Nem a teljes publikus webet próbáljuk újramodellezni. Azt validáljuk, hogy az ajánlott NN assetek kontrollált környezetben javítanák-e a GenAI válaszokat.
```
