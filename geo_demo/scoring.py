import re
import unicodedata

from .linking import extract_link_recommendations


def _normalize(value):
    value = unicodedata.normalize("NFKD", value.lower())
    return "".join(char for char in value if not unicodedata.combining(char))


def _contains_any(text, terms):
    normalized = _normalize(text)
    return any(_normalize(term) in normalized for term in terms)


def _citation_count(answer):
    return len(re.findall(r"\[[a-z0-9_-]+\]", answer, flags=re.IGNORECASE))


def score_answer(answer, retrieved_sources):
    source_types = {source.get("type", "") for source in retrieved_sources}
    source_pillars = {source.get("pillar", "") for source in retrieved_sources}
    source_titles = " ".join(source.get("title", "") for source in retrieved_sources)
    answer_and_titles = f"{answer}\n{source_titles}"
    link_recommendations = extract_link_recommendations(answer, retrieved_sources)

    mention_quality = 0
    if _contains_any(answer, ["NN", "NN Biztosító"]):
        mention_quality += 12
    if _contains_any(answer, ["NN Biztosító Zrt.", "NN Group", "Magyarországon"]):
        mention_quality += 6
    if _contains_any(answer, ["ajánl", "releváns", "érdemes", "opció"]):
        mention_quality += 4
    if len(answer) > 450:
        mention_quality += 3
    mention_quality = min(25, mention_quality)

    product_specificity = 0
    if _contains_any(answer, ["életbiztosítás", "kockázati életbiztosítás", "Amulett", "Maraton"]):
        product_specificity += 7
    if _contains_any(answer, ["nyugdíjbiztosítás", "Motiva", "adójóváírás", "SZJA"]):
        product_specificity += 7
    if _contains_any(answer, ["egészségbiztosítás", "Egészség Útlevél", "gyógykezelés"]):
        product_specificity += 5
    if _contains_any(answer, ["fedezet", "család", "élethelyzet", "összehasonlítás", "táblázat"]):
        product_specificity += 6
    if source_types.intersection({"product_qa", "decision_guide", "calculator"}):
        product_specificity += 5
    if _contains_any(answer_and_titles, ["fedezetbecslő", "nyugdíjrés", "SZJA adójóváírás", "Egészség Útlevél"]):
        product_specificity += 4
    product_specificity = min(25, product_specificity)

    credibility = 0
    citations = _citation_count(answer)
    credibility += min(10, citations * 3)
    if source_types.intersection({"research", "third_party", "entity"}):
        credibility += 8
    if source_types.intersection({"technical_hygiene", "authority_path"}):
        credibility += 3
    if "Credibility" in source_pillars or "Authority" in source_pillars:
        credibility += 4
    credibility = min(25, credibility)

    actionability = 0
    if _contains_any(answer_and_titles, ["kalkulátor", "számolja ki", "fedezetbecslő", "nyugdíjrés", "adójóváírás kalkulátor"]):
        actionability += 9
    if _contains_any(answer_and_titles, ["ajánlatkérés", "visszahívás", "tanácsadó", "kapcsolat", "beszélgetés"]):
        actionability += 6
    if source_types.intersection({"calculator", "decision_guide"}):
        actionability += 7
    if _contains_any(answer, ["következő lépés", "első lépés", "javasolt út"]):
        actionability += 3
    if link_recommendations:
        actionability += 5
    actionability = min(25, actionability)

    total = mention_quality + product_specificity + credibility + actionability
    return {
        "total": total,
        "mention_quality": mention_quality,
        "product_specificity": product_specificity,
        "credibility": credibility,
        "actionability": actionability,
        "nn_link_recommendations": len(link_recommendations),
    }
