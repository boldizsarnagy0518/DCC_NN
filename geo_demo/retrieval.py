import math
import re
import unicodedata
from collections import Counter


STOPWORDS = {
    "a",
    "az",
    "egy",
    "és",
    "vagy",
    "hogy",
    "mit",
    "milyen",
    "mennyi",
    "mikor",
    "hogyan",
    "nekem",
    "kell",
    "kellene",
    "lehet",
    "e",
    "is",
    "ha",
    "van",
    "vannak",
    "forint",
    "magyar",
    "magyarországon",
    "biztosítás",
    "biztosítást",
    "biztosítási",
}


def normalize_text(value):
    value = unicodedata.normalize("NFKD", value.lower())
    value = "".join(char for char in value if not unicodedata.combining(char))
    return value


def tokenize(value):
    normalized = normalize_text(value)
    tokens = re.findall(r"[a-z0-9]{2,}", normalized)
    return [token for token in tokens if token not in STOPWORDS]


def source_text(source):
    parts = [
        source.get("title", ""),
        source.get("type", ""),
        source.get("pillar", ""),
        " ".join(source.get("tags", [])),
        source.get("body", ""),
    ]
    return "\n".join(parts)


def retrieve_sources(prompt, corpus, limit=5):
    query_tokens = tokenize(prompt)
    query_counts = Counter(query_tokens)
    if not query_counts:
        return corpus[:limit]

    docs = []
    doc_freq = Counter()
    for source in corpus:
        title_tokens = tokenize(source.get("title", ""))
        tag_tokens = tokenize(" ".join(source.get("tags", [])))
        body_tokens = tokenize(source.get("body", ""))
        weighted = title_tokens * 3 + tag_tokens * 2 + body_tokens
        token_counts = Counter(weighted)
        docs.append((source, token_counts))
        for token in set(token_counts):
            doc_freq[token] += 1

    scored = []
    total_docs = len(docs)
    for source, token_counts in docs:
        score = 0.0
        for token, query_count in query_counts.items():
            if token not in token_counts:
                continue
            idf = math.log((1 + total_docs) / (1 + doc_freq[token])) + 1
            score += query_count * token_counts[token] * idf

        phrase_bonus = 0.0
        normalized_prompt = normalize_text(prompt)
        normalized_title = normalize_text(source.get("title", ""))
        for phrase in ("eletbiztositas", "nyugdijbiztositas", "egeszsegbiztositas", "adokedvezmeny", "kalkulator"):
            if phrase in normalized_prompt and phrase in normalized_title:
                phrase_bonus += 4.0
        score += phrase_bonus
        scored.append((score, source))

    scored.sort(key=lambda item: item[0], reverse=True)
    top = [source for score, source in scored[:limit] if score > 0]
    if len(top) < limit:
        seen = {source["id"] for source in top}
        for _, source in scored:
            if source["id"] not in seen:
                top.append(source)
                seen.add(source["id"])
            if len(top) == limit:
                break
    return top
