function observedBaseline() {
  return state.config?.baseline_visibility || {};
}

function applyMockupOnlyLabels() {
  const baseline = observedBaseline();
  const currentAvg = byId("currentAvg");
  const deltaAvg = byId("deltaAvg");
  const nnLinks = byId("nnLinks");

  if (currentAvg) {
    currentAvg.textContent = baseline.nn_presence_total ?? 0;
    const card = currentAvg.closest(".kpi-card");
    if (card) {
      card.querySelector("span").textContent = "Observed baseline presence";
      card.querySelector("p").textContent = "From uploaded Excel / HTML benchmark";
    }
  }
  if (deltaAvg) {
    const linkDelta = state.summary?.mockup_vs_observed_link_delta;
    deltaAvg.textContent = linkDelta == null ? "-" : `${linkDelta >= 0 ? "+" : ""}${linkDelta}`;
    const card = deltaAvg.closest(".kpi-card");
    if (card) {
      card.querySelector("span").textContent = "Link / cite uplift vs observed";
      card.querySelector("p").textContent = "Mockup explicit NN links minus observed baseline";
    }
  }
  if (nnLinks) {
    const baselineLinks = baseline.baseline_explicit_nn_link_references ?? 0;
    const mockupLinks = state.summary?.improved_nn_link_recommendations ?? 0;
    nnLinks.textContent = `${baselineLinks} -> ${mockupLinks}`;
  }

  const baselineCard = document.querySelector(".state-card.before .state-head h2");
  if (baselineCard) baselineCard.textContent = "Observed pre-mockup baseline";
  const baselineLabel = document.querySelector(".state-card.before .state-label");
  if (baselineLabel) baselineLabel.textContent = "Uploaded dashboard";

  const currentMentionPrompts = byId("currentMentionPrompts");
  if (currentMentionPrompts) currentMentionPrompts.textContent = `${baseline.nn_presence_unique_prompts ?? 0}/${baseline.prompts_tested ?? 0}`;
  const currentMentions = byId("currentMentions");
  if (currentMentions) currentMentions.textContent = baseline.nn_presence_total ?? 0;
  const currentLinkedPrompts = byId("currentLinkedPrompts");
  if (currentLinkedPrompts) currentLinkedPrompts.textContent = `${baseline.baseline_explicit_nn_link_prompt_coverage ?? 0}/${baseline.prompts_tested ?? 0}`;
  const currentLinks = byId("currentLinks");
  if (currentLinks) currentLinks.textContent = baseline.baseline_explicit_nn_link_references ?? 0;
}

const originalRenderSummary = renderSummary;
renderSummary = function patchedRenderSummary() {
  originalRenderSummary();
  applyMockupOnlyLabels();
};

const originalRunBenchmark = runBenchmark;
runBenchmark = async function patchedRunBenchmark(full = false) {
  const useLive = byId("liveToggle").checked;
  const body = {
    corpus_mode: "improved",
    models: selectedModels(),
    use_live: useLive,
  };
  if (!full) {
    body.prompt_id = state.selectedPromptId;
  }

  setStatus(useLive ? "Running mockup-only provider validation..." : "Running mockup-only local benchmark...");
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
  setStatus(
    payload.cached
      ? "Mockup-only local benchmark completed."
      : "Mockup-only provider validation completed. Check answer badges for API vs mock fallback."
  );
};
