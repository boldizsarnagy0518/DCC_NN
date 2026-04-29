import json

from .data import RESULTS_DIR


LATEST_RESULTS_PATH = RESULTS_DIR / "latest_results.json"


def load_latest_results():
    if not LATEST_RESULTS_PATH.exists():
        return None
    with LATEST_RESULTS_PATH.open("r", encoding="utf-8") as handle:
        return json.load(handle)
