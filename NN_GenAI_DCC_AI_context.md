# Context file — NN GenAI Visibility / DCC Case Study

## 1. Role and expected output style

You are supporting a Deloitte Consulting Course case study team working on NN Hungary.

Act as a senior strategy consultant. Your task is to help refine, explain, and present the **actionable recommendations** section of a PowerPoint deck about how NN can increase its visibility and effectiveness in the GenAI search era.

The style should be:
- consulting-style, executive, structured;
- clear and business-focused;
- not overly technical;
- aligned with a 0–3 year roadmap;
- focused on overview-level recommendations, not detailed implementation specs;
- suitable for a client presentation to NN.

Use Hungarian when helping the team prepare speaking notes. Use English when drafting slide titles, slide text, or recommendation labels, unless explicitly asked otherwise.

Avoid an “AI-generated” tone. Prefer natural, presentation-ready language.

---

## 2. Case situation

The case is about how NN Hungary can increase its reach and relevance in a world where users increasingly use Generative AI tools for search, comparison, and decision support.

The core idea is **GEO — Generative Engine Optimization**.

This is not traditional SEO only. The question is not just whether NN appears in Google search results, but whether GenAI systems such as ChatGPT, Gemini, Claude, Perplexity or AI Overviews:
- mention NN;
- explain NN correctly;
- connect NN to specific products;
- cite or rely on credible sources about NN;
- guide the user toward a clear next step, such as a calculator, guide, quote request, or product page.

The client, NN, expects an overview-level recommendation roadmap over a 0–3 year horizon. They do not expect detailed implementation specs such as exact HTML box sizes or fully specified technical architecture.

The team has:
1. a current PPT deck;
2. a GenAI visibility benchmark;
3. a technical GEO audit of nn.hu;
4. research about AI, trust and financial decision-making.

The actionable recommendation section must connect to all of these.

---

## 3. Key message of the overall analysis

NN does **not** start from zero.

The benchmark suggests that NN already appears frequently in GenAI insurance-related answers. However, visibility alone is not enough. The next challenge is to improve the **quality** of that visibility.

The main strategic message:

> NN is already visible in AI answers. The opportunity is to convert this visibility into a more product-specific, trusted and actionable presence that supports real customer journeys and potential lead generation.

A strong one-sentence version:

> NN should shift from simply being mentioned by GenAI to becoming a brand that AI systems can easily find, understand, cite and recommend as the next step.

---

## 4. Benchmark context

The team tested:
- 48 Hungarian life-insurance-related prompts;
- 3 AI models;
- 144 total model outputs.

Observed benchmark results:
- NN received 223 mentions, the strongest result in the tested set.
- Competitors such as UNIQA, Generali and Allianz were still close, so this should be framed as a competitive field, not a fully dominant NN position.
- Google produced the richest NN context, including more product-specific mentions and more price/fee references.
- OpenAI tended to mention NN in a more generic, list-based way.
- Anthropic generated many NN mentions but often in neutral tables with less product detail.
- Ranking, comparison, structured table and product/price prompts generated the strongest brand visibility.

Interpretation:
- NN has a strong starting position.
- The issue is not only “more mentions”.
- The issue is better mentions: more concrete, more credible, more useful, more connected to user actions.

---

## 5. Technical audit context

The audit of nn.hu suggested that NN is not actively harming its AI visibility, but several GEO levers are still missing or underdeveloped.

Current positives:
- robots.txt is partially open / not actively blocking AI crawlers;
- sitemap exists;
- basic Organization schema exists in minimal form.

Current gaps:
- IndexNow is not implemented;
- Organization schema is minimal;
- sameAs entity links are missing;
- Wikidata entry is missing;
- Wikipedia article is missing;
- FAQPage / structured Q&A is missing or weak;
- H1/H2 headings are generic and promotional rather than question-based;
- Trustpilot / review ecosystem appears not actively managed;
- meta descriptions may be weak or empty;
- llms.txt is missing, but should be treated only as a low-priority pilot, not a core dependency.

Important caveat:
Do not overclaim that FAQ schema or llms.txt directly guarantees AI citation. Treat them as supporting technical hygiene, not as the core strategy.

---

## 6. Strategic framework

Use this four-part GEO logic:

1. **Discoverability:** NN must be easy to find.
2. **Clarity:** NN must be easy to understand.
3. **Credibility:** NN must be easy to cite.
4. **Actionability:** NN must give users a clear next step.

The deck originally framed GEO around findable, understandable and citable. The team added **Actionability** because GenAI visibility only creates business value if users know what to do next.

Suggested explanation of actionability:

> Actionability matters because visibility only creates business value if users know what to do next. It is not enough for AI to mention NN in a list. The stronger outcome is when AI can guide users toward an NN calculator, guide, quote request or product page.

---

## 7. Transition from analysis to recommendations

GenAI platforms do not recommend brands randomly. They interpret the user’s query, retrieve relevant content, identify credible sources and synthesize an answer.

For NN, this means the brand must strengthen its presence across:
- owned platforms;
- review and comparison platforms;
- trusted third-party sources;
- decision-support tools.

The recommendation section should therefore answer:

How can NN turn current AI visibility into a higher-quality, more trusted and more actionable presence?

---

# 8. Actionable recommendations

## Recommendation 1 — Rebuild key product pages around conversational search

**Time horizon:** Short term, 0–3 months  
**Pillar:** Clarity  
**Priority:** High impact

### What it means

NN should redesign the most important product pages around natural-language questions that users would realistically ask an AI system.

Current headings are often generic or promotional, for example:
- “Miért válassza életbiztosításainkat?”
- “Milyen esetekre készülhet fel?”
- “Életbiztosítás 3 lépésben”
- “További információk”

These are understandable for humans, but weaker for AI retrieval because they do not directly match natural user queries.

Recommended heading examples:
- “Mi az életbiztosítás és mire nyújt védelmet?”
- “Mennyi életbiztosítást érdemes kötni?”
- “Milyen adókedvezmény jár nyugdíjbiztosítás után?”
- “Miben különbözik a kockázati és a megtakarításos életbiztosítás?”

### Why it matters

AI systems often retrieve and chunk content around headings. If the heading itself mirrors a real user question, the answer block is easier to retrieve, extract and synthesize into an AI response.

### Concrete roadmap output

Rewrite the 3 priority product pages first:
1. life insurance;
2. pension insurance;
3. health insurance.

Each page should have:
- 5–8 natural-language questions;
- 40–60 word visible answer blocks;
- clear product links;
- quote/contact CTA;
- structured markup where appropriate.

### Speaking note in Hungarian

„Az első konkrét ajánlásunk az, hogy NN rövid távon építse át a legfontosabb termékoldalait conversational search logika szerint. Ez azt jelenti, hogy a termékoldalak ne csak klasszikus marketinges struktúrában működjenek, hanem olyan kérdésekre adjanak választ, amelyeket egy felhasználó ténylegesen feltenne egy AI rendszernek. A cél az, hogy NN válaszai könnyen megtalálhatók, könnyen értelmezhetők és könnyen beemelhetők legyenek egy generatív AI válaszba.”

---

## Recommendation 2 — Strengthen NN’s machine-readable identity

**Time horizon:** Short term, 0–3 months  
**Pillar:** Discoverability + Credibility  
**Priority:** High impact

### What it means

NN should make its brand identity easier for machines to understand and verify.

Build an entity chain:

**nn.hu → sameAs links → Wikidata → third-party proof**

Key elements:
- complete Organization JSON-LD on nn.hu;
- name, description, parent organization and product areas;
- sameAs links to official and trusted external profiles;
- Wikidata entry for NN Biztosító Zrt.;
- consistent naming across NN owned channels and third-party profiles.

### Why it matters

AI systems need to understand which entity “NN Biztosító” refers to and how it connects to trusted sources. If the machine-readable identity is weak, the model has fewer signals to corroborate NN’s brand, ownership, market presence and product relevance.

### Concrete roadmap output

- Add complete Organization JSON-LD block.
- Add sameAs links.
- Create Wikidata entry.
- Align naming across owned and external channels.

### Speaking note in Hungarian

„Ez elsőre technikai témának tűnhet, de GenAI szempontból nagyon fontos. Az AI rendszereknek nemcsak azt kell felismerniük, hogy az oldalon szerepel az NN név, hanem azt is, hogy pontosan melyik entitásról van szó: NN Biztosító Zrt.-ről, Magyarországon, az NN Group részeként. A cél, hogy NN ne csak emberi szemmel legyen felismerhető márka, hanem az AI rendszerek számára is egyértelmű, ellenőrizhető és összekapcsolható entitás legyen.”

---

## Recommendation 3 — Fix technical discoverability hygiene

**Time horizon:** Short term, 0–6 months  
**Pillar:** Discoverability  
**Priority:** Medium to high impact

### What it means

NN should fix technical GEO hygiene so AI and search systems can discover and process NN content reliably.

Key actions:
- sitemap freshness audit;
- IndexNow implementation;
- crawler access policy review;
- structured data validation;
- meta description cleanup;
- optional llms.txt pilot.

### Why it matters

This is not the main strategy, but it is an enabling layer. If NN’s content is not discoverable or fresh, even strong product content will not perform well in AI answers.

### Important caveat

Do not present llms.txt as a core requirement. It can be a low-effort pilot, but not a strategic dependency.

### Speaking note in Hungarian

„Ez önmagában nem egy látványos marketingkampány, de szükséges alap ahhoz, hogy NN tartalmai jól működjenek a GenAI környezetben. Ha az AI rendszerek nem találják meg gyorsan és megbízhatóan a friss tartalmakat, akkor a jó tartalom sem fog megfelelően megjelenni a válaszokban.”

---

## Recommendation 4 — Build an AI visibility dashboard

**Time horizon:** Short term, 0–3 months  
**Pillar:** Measurement / governance  
**Priority:** Medium impact

### What it means

NN should turn the current benchmark into recurring AI visibility tracking.

Track:
- AI share of voice;
- prompt coverage;
- product-specific mentions;
- price/fee references;
- citation sources;
- competitor visibility;
- model-level differences across OpenAI, Google, Anthropic and other relevant AI platforms.

### Why it matters

The current benchmark gives NN a baseline. But GenAI visibility changes quickly. A dashboard helps NN see whether its visibility is improving, where competitors are gaining ground and which prompts create the strongest or weakest NN presence.

### Concrete roadmap output

Monthly or quarterly visibility tracker with a stable prompt set and a dashboard for leadership.

### Speaking note in Hungarian

„A mostani benchmarkot NN-nek nem egyszeri kutatásként érdemes kezelnie, hanem rendszeres mérési keretrendszerként. Így láthatóvá válik, hogy melyik AI modellben erős vagy gyenge NN, melyik versenytárs erősödik, és milyen prompttípusokra kell optimalizálni.”

---

## Recommendation 5 — Build a third-party credibility ecosystem

**Time horizon:** Mid-term, 3–12 months  
**Pillar:** Credibility  
**Priority:** High impact

### What it means

NN should strengthen its presence in trusted external sources.

Priority sources:
- Google Business Profile;
- Trustpilot or other review platforms;
- Netrisk.hu;
- Biztositas.hu;
- independent financial media;
- industry reports;
- MNB/industry references.

### Why it matters

GenAI systems do not rely only on a brand’s own website. In comparison and ranking prompts, external validation matters. Third-party sources help AI systems treat NN as a credible and corroborated insurer.

### Concrete roadmap output

- Review profile audit.
- Comparison site audit.
- External source cleanup.
- PR plan around independent, useful insurance and financial decision-making content.

### Speaking note in Hungarian

„A GenAI válaszok különösen összehasonlító kérdéseknél nem csak a márka saját weboldalára támaszkodnak. Fontos szerepe van a külső forrásoknak is: review oldalaknak, összehasonlító platformoknak, szakmai médiának és más trusted third-party source-oknak. Ezért NN-nek érdemes tudatosan építenie a jelenlétét ezeken a felületeken.”

---

## Recommendation 6 — Publish original Hungarian AI-finance research

**Time horizon:** Mid-term, 3–12 months  
**Pillar:** Credibility + Authority  
**Priority:** High impact

### What it means

NN should publish its own Hungarian research report on AI and financial decision-making.

Possible title:
**“Magyarok és az AI: pénzügyi döntéshozatal a mesterséges intelligencia korában”**

Potential topics:
- how Hungarians use AI for financial questions;
- trust in AI-generated financial recommendations;
- differences by age group;
- when people still want human validation;
- whether AI is used for research, comparison or final decision-making.

### Why it matters

This is an original, citable asset. It positions NN not only as an insurer, but as a thought leader in the Hungarian AI + financial decision-making conversation.

Original research is stronger than a generic blog post because AI systems and media can cite it as a source.

### Concrete roadmap output

- Publish research report.
- Create landing page.
- Create PR package for financial media.
- Repeat annually or semi-annually.

### Speaking note in Hungarian

„Ez nem sima blogcikk, hanem egy saját adatforrás. Ha később egy AI rendszer azt a kérdést kapja, hogy mennyire bíznak a magyarok az AI-ban pénzügyi döntéseknél, NN lehet az idézhető forrás.”

---

## Recommendation 7 — Build decision-guide pages

**Time horizon:** Mid-term, 3–12 months  
**Pillar:** Clarity + Actionability  
**Priority:** Medium impact

### What it means

NN should create decision-oriented guide pages that help users compare options and understand insurance decisions.

Example guide pages:
- “Mikor érdemes életbiztosítást kötni?”
- “Nyugdíjbiztosítás vagy önkéntes nyugdíjpénztár?”
- “Mekkora életbiztosítási fedezet kell egy családnak?”
- “Hogyan gondolkodjak biztosításról 30/40/50 évesen?”

### Why it matters

The benchmark showed that structured comparison and decision-style prompts create strong visibility. Decision-guide pages provide clear, extractable material for those AI answers.

### Concrete roadmap output

10–15 guide pages with:
- short Q&A blocks;
- comparison tables;
- product links;
- CTA to calculator, quote or advisor.

### Speaking note in Hungarian

„A decision-guide oldalak azt segítik, hogy NN ne csak termékeket mutasson be, hanem döntési helyzetekben is támogassa a felhasználót. Ez jól illeszkedik ahhoz, ahogy az emberek AI-t használnak: kérdeznek, összehasonlítanak, és döntési segítséget várnak.”

---

## Recommendation 8 — Build toward Wikipedia authority path

**Time horizon:** Long term, 12–36 months  
**Pillar:** Credibility / Authority  
**Priority:** Medium impact

### What it means

NN should build the conditions for long-term Wikipedia authority, but should not treat Wikipedia as a quick marketing tactic.

This requires:
- independent media coverage;
- market and industry references;
- MNB or industry data;
- neutral, third-party sources;
- notability evidence.

### Why it matters

Wikipedia and Wikidata can act as strong entity and credibility sources for AI systems. However, Wikipedia presence has to be earned through independent sources, not created from NN marketing material.

### Concrete roadmap output

- Build independent coverage.
- Collect notability evidence.
- Later consider a neutral Wikipedia draft if conditions are met.

### Speaking note in Hungarian

„A Wikipedia-út hosszú távú reputációs és citation cél. Ezt nem lehet gyors marketingfeladatként kezelni. Ehhez független sajtóforrásokra, iparági adatokra és semleges hivatkozásokra van szükség.”

---

## Recommendation 9 — Launch public financial calculators

**Time horizon:** Long term, 12–36 months  
**Pillar:** Actionability  
**Priority:** High impact

### What it means

NN should launch public decision-support tools for high-intent questions.

Recommended tools:
1. Pension gap calculator  
   Question: “How much should I save for retirement?”
2. Tax benefit calculator  
   Question: “How much SZJA refund can I receive?”
3. Life insurance need estimator  
   Question: “How much cover does my family need?”

### Why it matters

Calculators connect AI visibility to measurable business outcomes. AI answers should not only mention NN as an insurer, but also point users to NN as a place where they can calculate, compare and take the next step.

### Why this is long-term

Calculators require:
- UX design;
- compliance review;
- legal review;
- product logic;
- lead attribution;
- integration with quote/advisor flows.

### Concrete roadmap output

- Build 1 pilot calculator first.
- Connect it to relevant product pages and guide pages.
- Add CTA and attribution.
- Expand into a broader tool ecosystem.

### Speaking note in Hungarian

„Ez közvetlenül az actionability pillérhez kapcsolódik. Az AI válaszokban nem az lenne az ideális végállapot, hogy NN csak megjelenik egy biztosítói listában, hanem az, hogy az AI konkrét következő lépésként is NN-hez tudja irányítani a felhasználót.”

---

## Recommendation 10 — Advanced personalization

**Time horizon:** Long term, 12–36 months  
**Pillar:** Actionability / conversion  
**Priority:** Lower to medium impact initially, higher later

### What it means

After NN builds stronger content, tracking and tool foundations, it can move toward personalized decision support.

Possible examples:
- personalized guides by age group;
- calculator output with next best action;
- life-stage-based recommendations;
- advisor handoff;
- CRM or lead scoring integration.

### Why it matters

This is where AI visibility can become a stronger digital acquisition funnel. However, it should come later because it requires stronger data, compliance and product logic.

### Concrete roadmap output

- Personalization pilot after calculators and guide pages are live.
- Connect to advisor or quote request flows.
- Track lead quality and conversion.

### Speaking note in Hungarian

„Ez már nem az első lépés, mert komolyabb adat-, compliance-, UX- és terméklogikát igényel. De hosszú távon ez teheti igazán üzletileg értékessé az AI-ból érkező érdeklődést.”

---

# 9. Impact × time prioritization

## 0–3 months

High priority:
- conversational pages + FAQ;
- entity schema + Wikidata;
- AI visibility dashboard.

Support / hygiene:
- robots;
- sitemap;
- IndexNow;
- optional llms.txt.

Main objective:
Make NN easier to find, understand and measure.

## 3–12 months

High priority:
- original research report;
- third-party credibility ecosystem.

Medium priority:
- decision-guide pages.

Main objective:
Build credibility and create citable external proof.

## 12–36 months

High priority:
- public calculators.

Medium priority:
- Wikipedia authority path;
- advanced personalization.

Main objective:
Turn AI visibility into action, lead generation and long-term authority.

---

# 10. Recommended presentation storyline

## Analysis close

GenAI platforms do not recommend brands randomly. They interpret the user’s query, retrieve relevant content, identify credible sources and synthesize an answer.

For NN, this means visibility depends on:
- Discoverability: easy to find;
- Clarity: easy to understand;
- Credibility: easy to cite;
- Actionability: clear next step.

## Recommendation opening

NN already appears in AI answers. The next step is to make this presence more specific, trusted and actionable.

## Recommendation body

1. Fix clarity on owned product pages.
2. Strengthen machine-readable identity.
3. Improve technical discovery hygiene.
4. Track visibility continuously.
5. Build external credibility.
6. Publish original research.
7. Create decision guides.
8. Build long-term authority.
9. Launch calculators.
10. Later add personalization.

## Closing

The goal is not simply more AI mentions.

The goal is for NN to become one of the easiest insurers for AI systems to:
- find;
- understand;
- trust;
- cite;
- and recommend as the next step.

---

# 11. Important do-not-overclaim notes

Do not claim:
- FAQ schema guarantees AI citation.
- llms.txt is required for AI Overviews or GenAI visibility.
- Wikipedia can be created quickly as a marketing action.
- Robots.txt changes alone will create visibility.
- AI mentions directly equal customer conversion.

Do claim:
- structured, visible Q&A content improves extractability;
- technical hygiene supports discoverability;
- third-party sources support credibility;
- original research can become a citable authority asset;
- calculators can connect AI visibility to lead generation;
- recurring measurement is needed because AI outputs change over time.

---

# 12. Short Hungarian summary

„A teljes recommendation logika abból indul ki, hogy NN már most is látható a generatív AI válaszokban, tehát nem nulláról kell építkeznie. A probléma inkább az, hogy ez a visibility még nem mindig elég konkrét, nem mindig elég hitelesen alátámasztott, és nem mindig vezet világos következő lépéshez.

Ezért az ajánlások négy dolgot céloznak. Először NN tartalmai legyenek könnyen megtalálhatók. Másodszor legyenek könnyen érthetők, kérdésalapú, AI által jól feldolgozható formában. Harmadszor NN jelenjen meg külső, megbízható forrásokban is. Negyedszer az AI válasz után legyen egy konkrét ügyfélút, például kalkulátor, guide vagy ajánlatkérés.

Rövid távon ezért a termékoldalak, schema, Wikidata és technical hygiene a prioritás. Középtávon a third-party credibility, original research és decision-guide oldalak építik a hitelességet. Hosszú távon pedig a kalkulátorok, Wikipedia authority path és personalization alakítják át az AI visibilityt valódi lead generationné.”
