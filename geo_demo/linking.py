import re
from urllib.parse import urlparse


URL_PATTERN = re.compile(r"https?://[^\s),;]+", re.IGNORECASE)
ACTION_TERMS = (
    "menj",
    "kattints",
    "nézd meg",
    "használd",
    "számold",
    "kalkulátor",
    "ajánlatkérés",
    "tovább",
    "következő lépés",
    "javasolt link",
)


def extract_urls(answer):
    return [match.group(0).rstrip(".") for match in URL_PATTERN.finditer(answer or "")]


def is_nn_url(url):
    hostname = urlparse(url).hostname or ""
    return hostname == "nn.hu" or hostname.endswith(".nn.hu")


def has_action_language(answer):
    lower = (answer or "").lower()
    return any(term in lower for term in ACTION_TERMS)


def extract_link_recommendations(answer, sources):
    urls_in_answer = extract_urls(answer)
    source_by_url = {source.get("source_url"): source for source in sources}
    recommendations = []

    for url in urls_in_answer:
        if not is_nn_url(url):
            continue
        source = source_by_url.get(url, {})
        recommendations.append(
            {
                "url": url,
                "source_id": source.get("id"),
                "title": source.get("title", url),
                "type": source.get("type", "nn_link"),
                "action_language": has_action_language(answer),
            }
        )

    return recommendations


def count_nn_mentions(answer):
    return len(re.findall(r"\bNN\b|NN Biztosító", answer or "", flags=re.IGNORECASE))
