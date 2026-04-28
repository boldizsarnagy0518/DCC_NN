import unittest

from geo_demo.data import load_corpus, load_prompts
from geo_demo.linking import extract_link_recommendations
from geo_demo.retrieval import retrieve_sources
from geo_demo.scoring import score_answer
from geo_demo.server import run_benchmark, summarize_results


class DemoContractTests(unittest.TestCase):
    def test_data_contract(self):
        prompts = load_prompts()
        self.assertEqual(len(prompts), 10)
        for mode in ("current", "improved"):
            corpus = load_corpus(mode)
            self.assertGreaterEqual(len(corpus), 8)
            for source in corpus:
                for key in ("id", "title", "type", "pillar", "source_url", "body"):
                    self.assertIn(key, source)

    def test_retrieval_returns_ranked_sources(self):
        corpus = load_corpus("improved")
        sources = retrieve_sources("Mekkora életbiztosítási fedezet kell egy családnak?", corpus, limit=3)
        self.assertEqual(len(sources), 3)
        self.assertIn("fedezet", " ".join(source["title"].lower() for source in sources))

    def test_mock_benchmark_improves_scores(self):
        results = run_benchmark(prompt_ids=["p01"], models=["openai"], use_live=False)
        summary = summarize_results(results)
        self.assertEqual(len(results), 2)
        self.assertGreater(summary["improved_avg"], summary["current_avg"])

    def test_scoring_has_expected_breakdown(self):
        sources = load_corpus("improved")[:3]
        answer = (
            "Az NN Biztosító Zrt. konkrét következő lépést ad: kalkulátor és tanácsadó. "
            "Javasolt link: https://www.nn.hu/mock/eletbiztositas-kalkulator. [improved-life-calculator]"
        )
        scores = score_answer(answer, sources)
        self.assertIn("total", scores)
        self.assertGreaterEqual(scores["actionability"], 6)
        self.assertGreaterEqual(scores["nn_link_recommendations"], 1)

    def test_link_recommendation_extraction(self):
        sources = load_corpus("improved")[:3]
        answer = "Menj ide: https://www.nn.hu/mock/eletbiztositas-kalkulator"
        links = extract_link_recommendations(answer, sources)
        self.assertEqual(len(links), 1)
        self.assertTrue(links[0]["url"].startswith("https://www.nn.hu"))


if __name__ == "__main__":
    unittest.main()
