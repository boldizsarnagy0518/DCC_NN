# Project Feedback — NN GEO Recommendation Impact POC

## 1. Executive summary

The project should be positioned primarily as a **recommendation validation proof-of-concept**, not as a real-time public web visibility tracker.

NN's strategic goal is to increase its relevance and visibility in the GenAI search era: when users ask ChatGPT, Gemini, Claude, Perplexity or AI Overviews about insurance, NN should be easier to find, understand, trust, cite and recommend as a next step.

The team created actionable recommendations for this goal. The dashboard should validate these recommendations through a controlled before/after mockup:

1. **Without recommendation mockups**  
   The model receives a current-like NN/public source environment with weaker Q&A, credibility and next-step signals.

2. **With recommendation mockups**  
   The model receives additional mocked GEO assets based on the recommendations: conversational Q&A pages, decision guides, calculators, original research, entity signals and third-party proof.

The key validation question is:

> If NN implemented the recommended GEO assets, would GenAI-style answers become more specific, more credible and more actionable for users?

This is the strongest framing for the current project.

The project does **not need paid websearch APIs** for this use case. Live websearch would be useful for a future monitoring product, but the current POC is about isolating the impact of the recommended assets. A controlled setup is therefore a feature, not a weakness.

---

## 2. Correct use-case framing

### Primary use case

The dashboard validates whether the team's actionable recommendations could improve GenAI answer quality.

It does this by keeping the prompt and model constant while changing the available source environment:

```text
Same user prompt
+ same model / model label
+ current-like source environment
= baseline answer

Same user prompt
+ same model / model label
+ current-like source environment + recommendation mockup assets
= improved answer
```

Then the dashboard compares the two answers across:

- mention quality;
- product specificity;
- credibility;
- actionability;
- explicit NN next-step links;
- prompt-level coverage;
- source/domain mix;
- competitor mentions.

### What this validates

The POC validates whether the proposed assets make NN easier for GenAI systems to use in answers.

It is especially useful for validating recommendations such as:

- rebuilding product pages around conversational search;
- creating structured Q&A blocks;
- strengthening machine-readable identity;
- building third-party credibility signals;
- publishing original AI-finance research;
- creating decision-guide pages;
- launching public calculators;
- making NN links and next steps easier to recommend.

### What this does not try to prove

The POC does not claim that public ChatGPT, Gemini or Claude will immediately rank NN higher on the live web.

It does not try to reproduce the full public GenAI ecosystem.

It does not need to crawl the entire web.

The point is narrower and more defensible:

> Under controlled conditions, the recommended GEO assets improve the quality and actionability of AI-style answers.

---

## 3. Why websearch is not necessary for the current POC

Paid websearch APIs are not required for the current recommendation validation use case.

The reason is methodological: the POC should isolate the effect of the recommendation mockups.

If live websearch is added too early, several uncontrolled factors enter the test:

- changing search results;
- changing model retrieval behavior;
- ranking noise;
- competitor page changes;
- inconsistent citations;
- API-specific search behavior;
- cost and rate limits.

That would make it harder to show whether the improvement came from NN's recommended assets or from random live-web variation.

For this project, the better logic is:

```text
Controlled source environment
→ controlled before/after comparison
→ recommendation impact validation
```

Future websearch can be mentioned as a possible extension, but it should not be the core requirement for the POC.

---

## 4. Recommended project positioning

### Best title options

Recommended titles:

- NN GEO Recommendation Impact POC
- NN GEO Recommendation Validation Dashboard
- Before / After GEO Asset Impact Simulator
- GenAI Recommendation Impact Simulator
- NN GenAI Answer Quality Improvement Demo

Best option:

> NN GEO Recommendation Impact Simulator

This title clearly communicates that the dashboard validates the expected impact of the recommendations, rather than claiming to measure the entire live web.

### Recommended one-sentence description

> This POC validates the potential impact of NN's actionable GEO recommendations by comparing GenAI-style answers before and after adding mocked recommendation assets.

### Recommended methodology statement

Add this near the top of the dashboard and README:

> This dashboard validates the potential impact of NN's actionable GEO recommendations through a controlled before/after mockup. The same prompts are tested without and with mocked recommendation assets, while model settings and scoring logic remain constant. The goal is to isolate whether the proposed assets can make GenAI-style answers more specific, credible and actionable.

Hungarian version:

> Ez a dashboard az NN-nek javasolt actionable GEO ajánlások potenciális hatását validálja kontrollált before/after mockup segítségével. Ugyanazokat a promptokat futtatjuk le mockup assetek nélkül és mockup assetekkel, miközben a modell és a scoring logika változatlan. A cél annak izolált bemutatása, hogy az ajánlott assetek konkrétabbá, hitelesebbé és actionable-bbé tehetik-e a GenAI válaszokat.

---

## 5. Recommended before/after terminology

The current `current` vs `improved` corpus terminology is technically fine, but the UI and presentation should use more business-friendly wording.

Recommended wording:

| Technical term | Presentation term |
|---|---|
| Current corpus | Without recommendation mockups |
| Improved corpus | With recommendation mockups |
| Controlled GEO Readiness Score | Recommendation impact / answer quality score |
| Source environment | Available GenAI source assets |
| Mocked future asset | Recommendation mockup asset |

Suggested dashboard labels:

- **Without recommendation mockups**
- **With recommendation mockups**
- **Answer quality lift**
- **Recommendation impact score**
- **NN next-step recommendations**

This makes the POC logic clearer for a consulting audience.

---

## 6. What is strong in the current implementation

### 6.1 The current vs improved corpus logic matches the POC goal

The dashboard already compares a current-like source environment against a source environment enriched with mocked recommendation assets.

This is exactly what is needed to validate the recommendations.

### 6.2 The scoring dimensions fit the strategy

The scoring categories align well with the GenAI visibility strategy:

- **Mention quality:** Is NN mentioned clearly and usefully?
- **Product specificity:** Is NN connected to concrete products or decision situations?
- **Credibility:** Is the answer supported by citations, credible source types or entity signals?
- **Actionability:** Does the answer guide the user toward a next step?

This supports the key message that NN should not only be mentioned by AI systems, but become easier to cite and recommend.

### 6.3 The dashboard already shows business-relevant outputs

Useful elements already present or recently added:

- before/after score comparison;
- NN mention and link counts;
- prompt-level coverage;
- actionability / next-step destination mix;
- recommendation coverage;
- source domain mix;
- competitor mention check;
- API vs mock fallback labels;
- CSV export.

These make the POC more credible and easier to explain.

### 6.4 The controlled setup is useful

For this POC, controlled sources are an advantage because they isolate the effect of the recommendation assets.

The question is not whether the whole internet currently supports NN well. The question is whether the recommended assets would be useful if NN created them.

---

## 7. Key clarifications still needed

### 7.1 The primary goal should be recommendation validation, not future web tracking

The README currently mentions future real web visibility measurement. This can remain as a future extension, but it should not dominate the methodology section.

Recommended hierarchy:

1. Primary: recommendation impact validation POC.
2. Secondary: future real web visibility monitoring extension.

### 7.2 The dashboard should explain why no websearch is used

Instead of apologizing for not using websearch, explain the design choice:

> Websearch is intentionally not used in the core POC because the goal is to isolate the effect of the recommendation mockup assets.

This turns a potential weakness into a methodological strength.

### 7.3 The improved corpus should be explicitly tied to recommendations

Each mocked asset should map to one or more recommendations.

Example mapping:

| Recommendation | Mockup asset | Expected validation signal |
|---|---|---|
| Conversational product pages | Product Q&A mock pages | Higher product specificity |
| Machine-readable identity | Entity/schema mock | Higher credibility |
| Technical hygiene | Technical audit signal | Better discoverability explanation |
| AI visibility dashboard | Dashboard itself | Measurement/governance signal |
| Third-party credibility | Review/comparison/media mock | Higher credibility |
| Original research | AI-finance research mock | Higher citation potential |
| Decision-guide pages | Decision guide mock | Higher clarity and actionability |
| Calculators | Calculator mock assets | More next-step links |
| Personalization | Future next-best-action mock | Higher actionability/conversion narrative |

### 7.4 The result should be presented as validation evidence, not proof

Use words like:

- indicates;
- suggests;
- demonstrates under controlled conditions;
- validates the direction of the recommendation;
- supports the business case.

Avoid:

- proves public AI ranking improvement;
- guarantees citation;
- guarantees conversion;
- measures live AI search share-of-voice.

---

## 8. Recommended UI changes

### Must-have wording updates

Change the dashboard framing from:

```text
Controlled GEO Simulation Dashboard
```

To one of:

```text
NN GEO Recommendation Impact POC
NN GEO Recommendation Validation Dashboard
NN GEO Recommendation Impact Simulator
```

Recommended:

```text
NN GEO Recommendation Impact Simulator
```

### Change methodology box

Current style is mostly correct, but should focus more on recommendation validation.

Suggested copy:

```text
This POC validates NN's actionable GEO recommendations through a controlled before/after mockup. The same prompts are tested without and with recommendation mockup assets. The goal is to isolate whether these assets can make GenAI-style answers more specific, credible and actionable.
```

Add a second sentence:

```text
Websearch is intentionally not used in the core POC, because the purpose is to isolate the impact of the proposed NN assets rather than measure live public ranking noise.
```

### Change before/after labels

Recommended UI labels:

```text
Without recommendation mockups
With recommendation mockups
```

Instead of only:

```text
Before mockup
After mockup
```

### Change KPI labels

Recommended KPI labels:

- Recommendation impact score
- Answer quality lift
- NN next-step recommendations
- Prompt coverage with NN mention
- Prompt coverage with NN link

Avoid overly broad labels like:

- real AI ranking;
- public AI visibility score;
- guaranteed GEO lift.

---

## 9. Recommended README update

Replace the current methodology emphasis with this:

```markdown
## Methodology note

This dashboard is a recommendation impact POC for NN's GenAI / GEO strategy.

The goal is to validate whether the actionable recommendations could improve GenAI-style answer quality. The dashboard compares two controlled source environments:

1. **Without recommendation mockups**  
   A current-like NN/public source environment with weaker Q&A, credibility and next-step signals.

2. **With recommendation mockups**  
   The same environment enriched with mocked GEO assets based on the recommendations, such as product Q&A pages, decision guides, calculators, original research, entity signals and third-party proof.

The same prompts and model labels are used in both runs. This isolates the effect of the recommendation assets.

The dashboard does not claim to measure live public ChatGPT/Gemini/Claude rankings. Websearch is intentionally not required for the core POC, because the goal is recommendation validation under controlled conditions. A future version could add live web visibility monitoring as a separate extension.
```

---

## 10. Suggested presentation explanation

### English version

> We built this POC to validate our actionable recommendations. The baseline run uses a current-like NN source environment. The mockup run adds the GEO assets we recommend NN should build, such as conversational Q&A pages, calculators, decision guides, entity signals and third-party proof. By keeping the prompts and model setup constant, we isolate whether these recommendations improve answer quality, credibility and actionability.

### Hungarian version

> A POC célja az ajánlásaink validálása. Az első futás egy jelenlegi NN-szerű forráskörnyezetet használ. A második futás hozzáadja azokat a GEO mockup asseteket, amelyeket NN-nek javaslunk megépíteni: például Q&A oldalakat, kalkulátorokat, decision guide-okat, entity signalokat és külső hitelességi forrásokat. Mivel a promptok és a modellsetup ugyanaz marad, izoláltan tudjuk megmutatni, hogy ezek az ajánlások javítják-e a válaszok minőségét, hitelességét és actionability-jét.

### Short version for slide narration

> We are not trying to recreate the whole public web. We are validating whether the recommended NN assets would make GenAI answers better under controlled conditions.

Hungarian:

> Nem a teljes publikus webet próbáljuk újramodellezni. Azt validáljuk, hogy az ajánlott NN assetek kontrollált környezetben javítanák-e a GenAI válaszokat.

---

## 11. Recommended backlog

### Must-have before presentation

- [ ] Reframe the README around `recommendation impact POC` as the primary use case.
- [ ] Rename the dashboard title to `NN GEO Recommendation Impact Simulator` or similar.
- [ ] Change before/after labels to `Without recommendation mockups` and `With recommendation mockups`.
- [ ] Add one explicit sentence explaining that websearch is intentionally not used because the goal is to isolate mockup asset impact.
- [ ] Make the recommendation-to-mockup-asset mapping visible in the dashboard.
- [ ] Keep API vs mock fallback badges.
- [ ] Keep source status labels.
- [ ] Keep CSV export.

### Should-have

- [ ] Add `Validation hypothesis` text for each recommendation.
- [ ] Add `Expected signal` for each recommendation, for example product specificity, credibility or actionability.
- [ ] Rename `Average GEO lift` to `Answer quality lift` or `Recommendation impact lift`.
- [ ] Rename live toggle to `Use provider APIs with controlled sources`.
- [ ] Add a short `What this POC validates` section near the top of the UI.

### Future extension only

- [ ] Add real web visibility monitoring mode.
- [ ] Add websearch or search-grounded APIs.
- [ ] Add recurring public AI visibility tracking.
- [ ] Add live citation/source monitoring.
- [ ] Add time-series tracking.

These future items are useful, but they are not required for the current recommendation validation POC.

---

## 12. Final recommendation

The project should be presented as a **GEO recommendation impact simulator**.

Best framing:

> This POC validates whether NN's actionable GEO recommendations could improve GenAI-style answers. It compares the same prompts without and with recommendation mockup assets, then measures whether answers become more specific, credible and actionable.

This is honest, defensible and directly aligned with the business problem.

The strategic story remains strong:

> NN should not only aim to be mentioned by AI systems. NN should build the assets that make it easier for AI systems to find, understand, trust, cite and recommend NN as the next step.
