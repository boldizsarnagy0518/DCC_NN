# Project Feedback — NN GenAI Visibility / GEO Dashboard

## 1. Executive summary

The project is directionally strong and fits the NN GenAI Visibility / GEO case well. It already has a clear strategic logic: NN should move from simply being mentioned by GenAI systems toward being easier to find, understand, cite and recommend as the next step.

However, the current implementation should not be positioned as a full real-world web-based AI visibility measurement tool yet. In its current form, it is primarily a **controlled GEO / RAG simulation dashboard**.

The most important point:

> The current dashboard demonstrates how better structured NN source assets can improve model answer quality in a controlled source environment. It does not yet measure how public AI systems search, retrieve and cite NN from the live web.

This is not a failure. It is a good proof-of-concept. But the positioning, UI labels, methodology note and future roadmap should make the distinction clear.

---

## 2. Current project positioning

### What the project currently does well

The project compares two source environments:

1. **Current corpus**  
   A today-like set of NN/public content with weaker Q&A, link and credibility signals.

2. **Improved corpus**  
   Mocked future GEO assets based on the recommendations: product Q&A pages, decision guides, original research, entity/schema improvements, third-party proof and calculators.

The dashboard then runs prompts against these two source environments and measures whether answers become more specific, more credible and more actionable.

This fits the strategic message:

> NN is already visible in AI answers. The opportunity is to make that visibility more product-specific, trusted and actionable.

### What the project does not yet do

The current project does **not** yet perform true real-time web visibility measurement.

It does not currently answer questions such as:

- Does ChatGPT browse the live web and find NN?
- Does Gemini use Google Search grounding and cite NN?
- Does Claude retrieve NN from public web sources?
- Which live third-party sources are currently influencing AI answers?
- Where does NN appear compared with competitors in real web-grounded outputs?

The current model API calls receive a controlled prompt and controlled source package. They do not independently browse the public web.

---

## 3. Main methodological risk

The biggest risk is that the dashboard can look like a real public AI visibility benchmark even though the current implementation is a controlled simulation.

This could create a credibility issue if a reviewer, client or evaluator asks:

> Are these answers based on real ChatGPT/Gemini/Claude web search behavior?

The honest answer today is:

> Not fully. The dashboard uses model APIs with controlled source inputs. It measures controlled answer quality, not live public web visibility.

This should be handled proactively in the UI and presentation.

---

## 4. Recommended positioning

### Better title options

Avoid titles that overclaim real-world measurement, such as:

- AI Visibility Benchmark
- Real GenAI Ranking Dashboard
- Public AI Visibility Tracker

Better title options:

- Controlled GEO Simulation Dashboard
- NN GenAI Source Readiness Demo
- AI Visibility Improvement Simulator
- Controlled AI Answer Quality Benchmark
- From Visibility Baseline to Actionable AI Presence

### Recommended methodology statement

Add this near the top of the dashboard and possibly into the README:

> This dashboard compares model responses using controlled source corpora. In live mode, provider APIs receive the same controlled source package. The models do not browse the web in this demo. The results show how better structured NN assets can improve answer specificity, credibility and actionability.

Hungarian version:

> Ez a dashboard kontrollált forráskörnyezetben hasonlítja össze a modellválaszokat. Live módban az API-n meghívott modellek ugyanazt a kontrollált forráscsomagot kapják meg. A modellek ebben a demóban nem végeznek webes keresést. Az eredmények azt mutatják meg, hogy a jobb struktúrájú NN assetek hogyan javíthatják a válaszok konkrétságát, hitelességét és actionability értékét.

---

## 5. What is good in the current implementation

### 5.1 Strong strategic alignment

The code reflects the core consulting framework well:

- Discoverability
- Clarity
- Credibility
- Actionability

The scoring system uses dimensions that are aligned with the case logic:

- mention quality
- product specificity
- credibility
- actionability

This is good because the project does not only count mentions. It tries to evaluate whether NN is mentioned in a useful, specific and business-relevant way.

### 5.2 Good before/after storytelling

The current vs improved corpus structure is useful for presentation.

It helps show:

- where NN is today;
- what improved GEO assets could look like;
- how better source material can lead to stronger AI-generated answers;
- why actionability matters beyond simple visibility.

### 5.3 Simple and explainable technical design

The retrieval logic is simple enough to explain in a business presentation. It does not rely on complex vector databases, LangChain chains or hidden infrastructure.

This is good for a Deloitte Consulting Course project because the audience likely cares more about strategic interpretation than deep technical implementation.

### 5.4 Useful fallback behavior

The API fallback to mock output is useful for demo stability.

If an API key is missing or a provider call fails, the dashboard still works. This reduces presentation risk.

However, the fallback behavior should be clearly shown in the UI.

---

## 6. Key limitations to fix or clarify

### 6.1 No live web search in provider calls

The current OpenAI, Gemini and Claude calls are standard text generation calls. They do not include web search tools, browser tools or search grounding.

This means the models answer based on the prompt and controlled sources passed into them.

Impact:

- Good for controlled source simulation.
- Not enough for real web-based AI visibility measurement.

Recommended fix:

Add a separate **real web check mode** or clearly label the existing mode as controlled simulation.

---

### 6.2 Mock answers can be confused with real model answers

The mock output currently imitates model-specific styles:

- OpenAI-style short answer
- Gemini-style comparison answer
- Claude-style cautious decision-support answer

This is useful for demo stability, but it can be misleading if the UI does not clearly mark these as mock outputs.

Recommended fix:

Display a visible badge for every answer:

- `Mode: API`
- `Mode: Mock fallback`
- `Mode: Cached result`

If mock mode is used, the model label should be phrased carefully:

- `OpenAI-style mock`
- `Gemini-style mock`
- `Claude-style mock`

Instead of suggesting they are actual live provider outputs.

---

### 6.3 The score favors the improved corpus by design

The scoring system gives points for source types such as:

- product Q&A
- decision guide
- calculator
- research
- third-party source
- entity source

This is logical because these are exactly the types of assets the recommendations propose. However, it means the improved corpus is structurally designed to score better.

This is acceptable if framed as:

> A controlled demonstration of how improved GEO assets affect answer quality.

It is less acceptable if framed as:

> Proof that public AI systems will rank NN higher.

Recommended fix:

Rename the score from something like `GEO score` to one of the following:

- Controlled GEO Readiness Score
- Answer Quality Score
- Source Readiness Score
- Controlled GEO Asset Impact Score

---

### 6.4 Provider API run message may be misleading

The UI currently communicates provider runs as completed when live mode is used. But if some providers fail, the system can fall back to mock output.

Recommended fix:

Show provider-level run status:

| Provider | Status |
|---|---|
| OpenAI | API |
| Gemini | API |
| Claude | Mock fallback |

Also update the status message:

> Provider run completed. Some answers may use mock fallback.

---

### 6.5 The dashboard should distinguish current, improved and simulated future assets

The improved corpus includes mocked future assets. This is fine, but it should be clear that they are not necessarily live NN assets today.

Recommended fix:

Add source status metadata:

- `current_live_like`
- `mocked_future_asset`
- `third_party_example`
- `technical_audit_signal`

Then display this in the source evidence cards.

---

## 7. Recommended improvement roadmap

## Phase 1 — Clarify positioning and avoid overclaiming

Priority: High  
Effort: Low  
Recommended timing: Immediately

### Tasks

- Add methodology note to the dashboard.
- Rename dashboard title to reflect controlled simulation.
- Rename `GEO score` to `Controlled GEO Readiness Score` or `Answer Quality Score`.
- Add answer mode badges: API / mock fallback / cached.
- Add source status labels: current-like vs mocked future asset.
- Update README to clearly explain what the dashboard measures and what it does not measure.

### Why this matters

This protects the credibility of the project. The current dashboard is valuable, but only if its methodology is transparent.

---

## Phase 2 — Improve the dashboard UX and interpretation

Priority: Medium to high  
Effort: Medium  
Recommended timing: Before final presentation if possible

### Tasks

- Add a small methodology box at the top of the UI.
- Add a section called `How to read this dashboard`.
- Add clearer KPI definitions:
  - Mention quality
  - Product specificity
  - Credibility
  - Actionability
  - NN link recommendation
- Show provider status per model.
- Show whether each answer came from API or fallback.
- Add a short explanation below the current vs improved score.

### Suggested UI copy

> Current corpus represents today-like available NN/public content. Improved corpus represents mocked future GEO assets based on the recommendations. The score shows answer quality in a controlled source environment, not real-time public web ranking.

---

## Phase 3 — Add real web visibility check mode

Priority: High if the goal is real AI visibility measurement  
Effort: Medium to high  
Recommended timing: Next development step

### Goal

Add a new mode that uses live web search or search-grounded APIs.

### Recommended architecture

```text
Prompt
→ Web Search API
→ Top results / snippets / URLs
→ Optional page content extraction
→ LLM synthesis
→ NN mention/link/citation scoring
→ Dashboard output
```

### Possible search options

- Serper API
- Tavily API
- Bing Web Search API
- Google Custom Search API
- Gemini with Google Search grounding
- OpenAI Responses API with web search tool, if available and configured
- Claude with external search API + tool-use wrapper

### What to measure

For each prompt:

- Is NN mentioned?
- Is NN linked?
- Which NN page is linked?
- Is the answer product-specific?
- Are competitors mentioned?
- Which third-party sources appear?
- Does the answer recommend a next step?
- Does it cite or rely on NN-owned sources or external sources?

### Why this matters

This would move the project from a controlled simulation toward a more realistic GenAI visibility monitoring tool.

---

## Phase 4 — Add competitor and source-level benchmarking

Priority: Medium  
Effort: Medium

### Tasks

- Track competitors such as UNIQA, Generali, Allianz and Groupama.
- Count competitor mentions.
- Track whether NN is mentioned before or after competitors.
- Track source domains:
  - nn.hu
  - competitor domains
  - comparison sites
  - review platforms
  - financial media
  - regulatory / MNB sources
- Add share-of-voice metrics.

### Suggested metrics

- NN mention rate
- NN link rate
- NN first-mentioned rate
- competitor mention count
- owned-source citation rate
- third-party-source citation rate
- actionability rate

---

## Phase 5 — Make the scoring more transparent and robust

Priority: Medium  
Effort: Medium

### Current issue

The scoring is heuristic and keyword-based. This is fine for a demo, but it should be transparent.

### Recommended improvements

- Add a scoring methodology section to the README.
- Display score breakdown definitions in the UI.
- Add optional manual review fields.
- Export results to CSV/JSON for auditability.
- Save prompt, provider, source list, response, score and timestamp.
- Consider a human validation step for final benchmark results.

### Recommended scoring categories

Keep the current four categories, but explain them clearly:

1. **Mention quality**  
   Does the answer mention NN clearly and usefully?

2. **Product specificity**  
   Does the answer connect NN to actual products, customer needs or decision contexts?

3. **Credibility**  
   Does the answer rely on source evidence, citations or trusted external proof?

4. **Actionability**  
   Does the answer guide the user toward a clear next step such as a calculator, guide, quote request or advisor contact?

---

## 8. Recommended README addition

Add a section like this:

```markdown
## Methodology note

This dashboard has two intended use cases:

1. Controlled GEO simulation  
   The current implementation compares model responses using controlled source corpora. It shows how improved NN assets can make answers more specific, credible and actionable.

2. Future real web visibility measurement  
   A future version can add web search or search-grounded APIs to measure how AI systems retrieve, cite and recommend NN from live public web sources.

The current implementation should not be interpreted as a direct measurement of public ChatGPT, Gemini or Claude rankings. It is a controlled source-readiness and answer-quality demo.
```

---

## 9. Recommended dashboard copy

### Top methodology box

```text
Methodology note: This dashboard is a controlled GEO simulation. The current and improved corpora are predefined source environments. Provider APIs, when enabled, receive these controlled sources and do not browse the public web in this version. The score measures controlled answer quality, not live public AI ranking.
```

### Live mode note

```text
Live API mode calls provider models with the controlled source package. It does not automatically enable web search or browsing.
```

### Mock mode note

```text
Mock mode uses deterministic local fallback responses for demo stability. These are not real provider outputs.
```

### Improved corpus note

```text
The improved corpus represents mocked future GEO assets based on the recommended roadmap, not necessarily assets that are already live today.
```

---

## 10. Suggested backlog

### Must-have before presenting

- [ ] Add methodology note to dashboard.
- [ ] Rename score to `Controlled GEO Readiness Score` or `Answer Quality Score`.
- [ ] Show API vs mock fallback for each answer.
- [ ] Clarify that provider APIs do not browse the web.
- [ ] Clarify that improved assets are simulated future assets.
- [ ] Update README with methodology note.

### Should-have

- [ ] Add provider-level status table.
- [ ] Add source status labels.
- [ ] Add KPI definitions.
- [ ] Export benchmark results to CSV.
- [ ] Add competitor mention tracking.
- [ ] Add domain/source-type breakdown.

### Future development

- [ ] Add real web search mode.
- [ ] Integrate Serper/Tavily/Bing/Google Custom Search.
- [ ] Add Gemini Google Search grounding if available.
- [ ] Add OpenAI web search tool integration if available.
- [ ] Add source extraction from live pages.
- [ ] Add recurring benchmark runs.
- [ ] Add trend tracking over time.

---

## 11. Final recommendation

The current project should be presented as a **strong controlled demo**, not as a full real-world AI visibility tracker.

Best framing:

> This dashboard demonstrates how improved GEO assets can make AI-generated answers more specific, credible and actionable in a controlled source environment. It is a practical simulation of the strategic recommendation logic. A future version can extend this into real web-based AI visibility tracking by adding search-grounded APIs and live source retrieval.

This framing is honest, defensible and still valuable for the NN case.

The strategic story remains strong:

> NN should not only aim to be mentioned by AI systems. NN should become easier for AI systems to find, understand, trust, cite and recommend as the next step.
