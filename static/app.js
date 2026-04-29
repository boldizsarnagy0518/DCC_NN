const state = {
  config: null,
  results: [],
  summary: null,
  selectedPromptId: null,
};

const scoreLabels = {
  mention_quality: "Mention",
  product_specificity: "Product",
  credibility: "Credibility",
  actionability: "Action",
};

function byId(id) {
  return document.getElementById(id);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setStatus(message, isError = false) {
  const el = byId("statusText");
  el.textContent = message;
  el.classList.toggle("error", isError);
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || `Request failed: ${response.status}`);
  }
  return payload;
}

function selectedModels() {
  return [...document.querySelectorAll("[data-model-check]")]
    .filter((input) => input.checked)
    .map((input) => input.value);
}

function renderConfig() {
  const promptSelect = byId("promptSelect");
  promptSelect.innerHTML = state.config.prompts
    .map((item) => `<option value="${item.id}">${item.id.toUpperCase()} - ${escapeHtml(item.category)}</option>`)
    .join("");
  promptSelect.value = state.selectedPromptId;
  promptSelect.addEventListener("change", () => {
    state.selectedPromptId = promptSelect.value;
    renderResults();
  });

  byId("modelChecks").innerHTML = Object.entries(state.config.providers)
    .map(([id, provider]) => {
      return `<label class="check"><input data-model-check type="checkbox" value="${id}" checked> ${escapeHtml(provider.label)}</label>`;
    })
    .join("");

  renderProviderStatus();
}

function renderProviderStatus() {
  const items = Object.entries(state.config.providers).map(([id, provider]) => {
    const cls = provider.configured ? "dot on" : "dot";
    const label = `${provider.label}: ${provider.configured ? provider.model : "mock fallback"}`;
    return `<span class="pill"><span class="${cls}"></span>${escapeHtml(label)}</span>`;
  });
  byId("providerStatus").innerHTML = items.join("");
}

function renderSummary() {
  const summary = state.summary || {};
  byId("currentAvg").textContent = summary.current_avg ?? 0;
  byId("improvedAvg").textContent = summary.improved_avg ?? 0;
  byId("deltaAvg").textContent = `+${summary.delta ?? 0}`;
  byId("nnLinks").textContent = `${summary.current_nn_link_recommendations ?? 0} → ${
    summary.improved_nn_link_recommendations ?? 0
  }`;

  byId("currentMentionPrompts").textContent = `${summary.current_prompts_with_nn_mentions ?? 0}/${
    summary.current_total_prompts ?? 0
  }`;
  byId("improvedMentionPrompts").textContent = `${summary.improved_prompts_with_nn_mentions ?? 0}/${
    summary.improved_total_prompts ?? 0
  }`;
  byId("currentMentions").textContent = summary.current_nn_mentions ?? 0;
  byId("improvedMentions").textContent = summary.improved_nn_mentions ?? 0;
  byId("currentLinkedPrompts").textContent = `${summary.current_prompts_with_nn_links ?? 0}/${
    summary.current_total_prompts ?? 0
  }`;
  byId("improvedLinkedPrompts").textContent = `${summary.improved_prompts_with_nn_links ?? 0}/${
    summary.improved_total_prompts ?? 0
  }`;
  byId("currentLinks").textContent = summary.current_nn_link_recommendations ?? 0;
  byId("improvedLinks").textContent = summary.improved_nn_link_recommendations ?? 0;

  const modelSummary = summary.model_summary || {};
  byId("modelSummary").innerHTML = Object.entries(modelSummary)
    .map(([model, values]) => {
      const label = state.config.providers[model]?.label || model;
      const delta = values.delta >= 0 ? `+${values.delta}` : values.delta;
      return `
        <tr>
          <td>${escapeHtml(label)}</td>
          <td>${values.current}</td>
          <td>${values.improved}</td>
          <td><strong>${delta}</strong></td>
        </tr>
      `;
    })
    .join("");

  byId("impactBars").innerHTML = Object.entries(modelSummary)
    .map(([model, values]) => {
      const label = state.config.providers[model]?.label || model;
      return `
        <div class="impact-row">
          <span>${escapeHtml(label.split(" ")[0])}</span>
          <div class="bar-track"><div class="bar-fill" style="width:${Math.min(values.current, 100)}%"></div></div>
          <strong>${values.current}</strong>
        </div>
        <div class="impact-row">
          <span>Improved</span>
          <div class="bar-track"><div class="bar-fill improved" style="width:${Math.min(values.improved, 100)}%"></div></div>
          <strong>${values.improved}</strong>
        </div>
        <div class="impact-row">
          <span>Lift</span>
          <div class="bar-track"><div class="bar-fill delta" style="width:${Math.min(Math.max(values.delta, 0), 100)}%"></div></div>
          <strong>+${values.delta}</strong>
        </div>
      `;
    })
    .join("");

  renderPillarBreakdown(summary.score_breakdown || {});
  renderNextStepMix(summary.next_step_mix || {});
  renderPromptCoverage(summary.prompt_summary || []);
  renderRecommendationCoverage();
}

function renderPillarBreakdown(scoreBreakdown) {
  const labels = {
    mention_quality: "Mention",
    product_specificity: "Product specificity",
    credibility: "Credibility",
    actionability: "Actionability",
  };
  byId("pillarBreakdown").innerHTML = Object.entries(labels)
    .map(([key, label]) => {
      const item = scoreBreakdown[key] || {current: 0, improved: 0, delta: 0};
      return `
        <div class="pillar-row">
          <span class="pillar-label">${escapeHtml(label)}</span>
          <div class="dual-track">
            <div class="bar-track"><div class="bar-fill" style="width:${Math.min(item.current * 4, 100)}%"></div></div>
            <div class="bar-track"><div class="bar-fill improved" style="width:${Math.min(item.improved * 4, 100)}%"></div></div>
          </div>
          <span class="delta-text">${item.delta >= 0 ? "+" : ""}${item.delta}</span>
        </div>
      `;
    })
    .join("");
}

function renderNextStepMix(nextStepMix) {
  const current = nextStepMix.current || {};
  const improved = nextStepMix.improved || {};
  const keys = [...new Set([...Object.keys(current), ...Object.keys(improved)])].sort();
  if (!keys.length) {
    byId("nextStepMix").innerHTML = `<p class="muted-text">No explicit NN next-step links found.</p>`;
    return;
  }
  const maxValue = Math.max(...keys.map((key) => Math.max(current[key] || 0, improved[key] || 0)), 1);
  byId("nextStepMix").innerHTML = keys
    .map((key) => {
      const before = current[key] || 0;
      const after = improved[key] || 0;
      return `
        <div class="mix-row">
          <span class="mix-label">${escapeHtml(key.replaceAll("_", " "))}</span>
          <div class="dual-track">
            <div class="bar-track"><div class="bar-fill" style="width:${(before / maxValue) * 100}%"></div></div>
            <div class="bar-track"><div class="bar-fill improved" style="width:${(after / maxValue) * 100}%"></div></div>
          </div>
          <span class="delta-text">${before} → ${after}</span>
        </div>
      `;
    })
    .join("");
}

function renderPromptCoverage(promptRows) {
  byId("promptCoverage").innerHTML = promptRows
    .map((row) => {
      const mentionText = `${row.current_mentions} → ${row.improved_mentions}`;
      const linkClass = row.improved_links > row.current_links ? "status-good" : "status-weak";
      const mentionClass = row.improved_mentions >= row.current_mentions ? "status-good" : "status-weak";
      return `
        <tr>
          <td>${escapeHtml(row.prompt)}</td>
          <td>${escapeHtml(row.category)}</td>
          <td><strong>${row.current_avg} → ${row.improved_avg}</strong></td>
          <td class="${mentionClass}">${mentionText}</td>
          <td class="${linkClass}">${row.current_links} → ${row.improved_links}</td>
        </tr>
      `;
    })
    .join("");
}

function renderRecommendationCoverage() {
  const recommendations = state.config?.recommendations || [];
  byId("recommendationCoverage").innerHTML = recommendations
    .map((rec) => {
      return `
        <article class="coverage-card">
          <span class="rec-id">${escapeHtml(rec.id)}</span>
          <strong>${escapeHtml(rec.title)}</strong>
          <p>${escapeHtml(rec.horizon)} · ${escapeHtml(rec.pillar)} · ${escapeHtml(rec.priority)}</p>
          <p><span class="status-good">${rec.demo_asset_count || 0}</span> demo asset signal(s)</p>
          <p>${escapeHtml(rec.demo_signal)}</p>
        </article>
      `;
    })
    .join("");
}

function resultFor(promptId, model, mode) {
  return state.results.find(
    (item) => item.prompt_id === promptId && item.model === model && item.corpus_mode === mode,
  );
}

function breakdownHtml(scores) {
  return Object.entries(scoreLabels)
    .map(([key, label]) => {
      const value = scores?.[key] ?? 0;
      return `
        <div class="breakdown-row">
          <span>${label}</span>
          <div class="mini-track"><div class="mini-fill" style="width:${Math.min(value * 4, 100)}%"></div></div>
          <strong>${value}</strong>
        </div>
      `;
    })
    .join("");
}

function answerBoxHtml(result, mode) {
  if (!result) {
    return `
      <article class="answer-box ${mode}">
        <header><strong>${mode === "current" ? "Current" : "Improved"}</strong><span class="score-chip">N/A</span></header>
        <div class="answer-text">No result loaded.</div>
      </article>
    `;
  }
  const error = result.error ? `<p class="error">Provider fallback: ${escapeHtml(result.error)}</p>` : "";
  const links = result.link_recommendations?.length
    ? `<div class="breakdown"><strong>NN link recommendations</strong>${result.link_recommendations
        .map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.title)}</a>`)
        .join("")}</div>`
    : `<div class="breakdown"><span class="small">No explicit NN link recommendation.</span></div>`;
  return `
    <article class="answer-box ${mode}">
      <header>
        <strong>${mode === "current" ? "Current corpus" : "Improved corpus"}</strong>
        <span class="score-chip">${result.scores.total}</span>
      </header>
      <div class="answer-text">${escapeHtml(result.answer)}${error}</div>
      ${links}
      <div class="breakdown">${breakdownHtml(result.scores)}</div>
    </article>
  `;
}

function renderResults() {
  if (!state.config || !state.results.length) {
    return;
  }
  const promptId = state.selectedPromptId;
  const prompt = state.config.prompts.find((item) => item.id === promptId);
  byId("selectedPromptText").textContent = prompt ? prompt.prompt : "";

  const models = [...new Set(state.results.filter((item) => item.prompt_id === promptId).map((item) => item.model))];
  byId("resultCount").textContent = `${models.length} model comparison${models.length === 1 ? "" : "s"}`;

  byId("answerGrid").innerHTML = models
    .map((model) => {
      const current = resultFor(promptId, model, "current");
      const improved = resultFor(promptId, model, "improved");
      const label = state.config.providers[model]?.label || model;
      const delta = current && improved ? improved.scores.total - current.scores.total : 0;
      return `
        <div class="model-result">
          <div class="model-title">
            <h3>${escapeHtml(label)}</h3>
            <span class="pill">Score lift: ${delta >= 0 ? "+" : ""}${delta}</span>
          </div>
          <div class="answer-columns">
            ${answerBoxHtml(current, "current")}
            ${answerBoxHtml(improved, "improved")}
          </div>
        </div>
      `;
    })
    .join("");

  renderSources(promptId);
}

function renderSources(promptId) {
  const seen = new Map();
  state.results
    .filter((item) => item.prompt_id === promptId)
    .forEach((item) => {
      item.retrieved_sources.forEach((source) => {
        seen.set(source.id, source);
      });
    });

  byId("sourceEvidence").innerHTML = [...seen.values()]
    .map((source) => {
      return `
        <article class="source-item">
          <h3>${escapeHtml(source.title)}</h3>
          <div class="source-meta">
            <span class="pill">${escapeHtml(source.type)}</span>
            <span class="pill">${escapeHtml(source.pillar)}</span>
          </div>
          <p>${escapeHtml(source.body)}</p>
        </article>
      `;
    })
    .join("");
}

async function loadCached() {
  setStatus("Loading generated benchmark results...");
  const payload = await fetchJson("/api/cached");
  state.results = payload.results;
  state.summary = payload.summary;
  renderSummary();
  renderResults();
  const source = payload.source === "results/latest_results.json" ? "generated response file" : "on-demand fallback";
  byId("runMeta").textContent = payload.generated_at
    ? `Loaded ${source}, generated at ${payload.generated_at}.`
    : `Loaded ${source}. Use uv run python generate_responses.py to refresh.`;
  setStatus("Benchmark results loaded.");
}

async function runBenchmark(full = false) {
  const useLive = byId("liveToggle").checked;
  const body = {
    corpus_mode: "both",
    models: selectedModels(),
    use_live: useLive,
  };
  if (!full) {
    body.prompt_id = state.selectedPromptId;
  }

  setStatus(useLive ? "Running provider APIs..." : "Running local mock benchmark...");
  const payload = await fetchJson("/api/run", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body),
  });

  if (full) {
    state.results = payload.results;
  } else {
    const replacementKeys = new Set(payload.results.map((item) => `${item.prompt_id}:${item.model}:${item.corpus_mode}`));
    state.results = state.results.filter(
      (item) => !replacementKeys.has(`${item.prompt_id}:${item.model}:${item.corpus_mode}`),
    );
    state.results.push(...payload.results);
  }
  state.summary = payload.summary;
  if (payload.provider_status) {
    state.config.providers = payload.provider_status;
    renderProviderStatus();
  }
  renderSummary();
  renderResults();
  setStatus(payload.cached ? "Local controlled benchmark completed." : "Provider API run completed.");
}

async function init() {
  try {
    state.config = await fetchJson("/api/config");
    state.selectedPromptId = state.config.prompts[0]?.id;
    renderConfig();
    await loadCached();
  } catch (error) {
    setStatus(error.message, true);
  }

  byId("cachedButton").addEventListener("click", () => loadCached().catch((error) => setStatus(error.message, true)));
  byId("runPromptButton").addEventListener("click", () =>
    runBenchmark(false).catch((error) => setStatus(error.message, true)),
  );
  byId("runFullButton").addEventListener("click", () =>
    runBenchmark(true).catch((error) => setStatus(error.message, true)),
  );
}

init();
