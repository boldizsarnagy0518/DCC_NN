# DCC_NN

Local controlled RAG demo for the NN GenAI visibility / GEO case.

The dashboard compares two controlled source environments:

- **Current corpus:** today-like NN/public content with weaker Q&A, link and credibility signals.
- **Improved corpus:** mocked GEO assets based on the actionable recommendations: Q&A product pages, decision guides, original research, third-party proof, calculators and explicit next-step links.

The point of the demo is not to prove that public ChatGPT/Gemini/Claude rankings immediately change. It shows that when better source assets are available to retrieval, model answers become more specific, more citable and more actionable.

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

In the UI, enable **Use provider APIs** to call the real providers. If a key is missing or an API call fails, the app falls back to local mock output for that provider.

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

## What You See On The Dashboard

The dashboard is split into two clear views:

- **Before mockup:** results using the current-like source corpus.
- **After mockup:** results using the mocked GEO recommendation assets.

The top of the dashboard shows executive KPIs:

- Current vs improved GEO score.
- Average score lift.
- NN link recommendations before vs after.
- How many prompts mention NN.
- How many prompts link to NN.
- Total NN mentions and total explicit NN links.

Below that, the dashboard explains why the after-state improves:

- **GEO Pillar Breakdown:** mention quality, product specificity, credibility and actionability.
- **Next-step Destination Mix:** what kind of NN asset gets linked, such as calculator, product Q&A, guide, research or entity page.
- **Actionable Recommendation Coverage:** how the mocked assets map to the 10 recommendations in the context file.
- **Prompt-level Coverage:** which prompts mention NN and which prompts include explicit NN links.

The final test section lets you inspect individual prompts, compare model outputs, and see which local sources were retrieved.

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

## API Endpoints

```text
GET  /api/config
GET  /api/cached
GET  /api/sources?mode=current
GET  /api/sources?mode=improved
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

NN is already visible in GenAI answers. The opportunity is to make that visibility more actionable: not only being mentioned, but being linked as the next step through calculators, guides, quote paths and advisor handoff.
