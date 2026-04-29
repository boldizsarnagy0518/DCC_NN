import argparse
import json
from datetime import datetime, timezone

from geo_demo.data import RESULTS_DIR
from geo_demo.env import load_dotenv
from geo_demo.providers import PROVIDERS
from geo_demo.server import results_to_csv, run_benchmark, summarize_results


def parse_args():
    parser = argparse.ArgumentParser(description="Generate NN GEO benchmark responses for the dashboard.")
    parser.add_argument("--live", action="store_true", help="Use provider APIs when keys are configured.")
    parser.add_argument("--models", default=",".join(PROVIDERS), help="Comma-separated model ids.")
    parser.add_argument("--output", default=str(RESULTS_DIR / "latest_results.json"))
    parser.add_argument("--csv-output", default=str(RESULTS_DIR / "latest_results.csv"))
    return parser.parse_args()


def main():
    load_dotenv()
    args = parse_args()
    models = [item.strip() for item in args.models.split(",") if item.strip()]
    results = run_benchmark(models=models, use_live=args.live)
    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "use_live": args.live,
        "models": models,
        "results": results,
        "summary": summarize_results(results),
    }

    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    with open(args.output, "w", encoding="utf-8") as handle:
        json.dump(payload, handle, ensure_ascii=False, indent=2)
    with open(args.csv_output, "w", encoding="utf-8", newline="") as handle:
        handle.write(results_to_csv(results))

    summary = payload["summary"]
    print(f"Wrote {len(results)} results to {args.output}")
    print(f"Wrote CSV export to {args.csv_output}")
    print(f"GEO score: {summary['current_avg']} -> {summary['improved_avg']} ({summary['delta']:+})")
    print(
        "NN mentioned prompts: "
        f"{summary['current_prompts_with_nn_mentions']} -> {summary['improved_prompts_with_nn_mentions']}"
    )
    print(
        "NN linked prompts: "
        f"{summary['current_prompts_with_nn_links']} -> {summary['improved_prompts_with_nn_links']}"
    )


if __name__ == "__main__":
    main()
