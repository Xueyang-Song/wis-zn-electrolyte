from __future__ import annotations

import csv
import json
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
OUT = ROOT / "src" / "data" / "generated" / "siteData.json"

PAPER_REFERENCES = [
  "[1] B. Dunn, H. Kamath, and J.-M. Tarascon, \"Electrical energy storage for the grid: A battery of choices,\" Science, 2011.",
          "[2] D. Larcher and J.-M. Tarascon, \"Towards greener and more sustainable batteries for electrical energy storage,\" Nat. Chem., 2015.",
          "[3] G. Fang, J. Zhou, A. Pan, and S. Liang, \"Recent advances in aqueous zinc-ion batteries,\" ACS Energy Lett., 2018.",
          "[4] X. Jia, C. Liu, Z. G. Neale, J. Yang, and G. Cao, \"Active materials for aqueous zinc ion batteries,\" Chem. Rev., 2020.",
          "[5] F. Wang et al., \"Highly reversible zinc metal anode for aqueous batteries,\" Nat. Mater., 2018.",
          "[6] Q. Zhang, J. Luan, Y. Tang, X. Ji, and H. Wang, \"Interfacial design of dendrite-free zinc anodes for aqueous zinc-ion batteries,\" Angew. Chem. Int. Ed., 2020.",
          "[7] W. Yang et al., \"Hydrated eutectic electrolytes with ligand-oriented solvation shells for long-cycling zinc-organic batteries,\" Joule, 2020.",
          "[8] L. Suo et al., \"'Water-in-salt' electrolyte enables high-voltage aqueous lithium-ion chemistries,\" Science, 2015.",
          "[9] J. Xie, Z. Liang, and Y.-C. Lu, \"Molecular crowding electrolytes for high-voltage aqueous batteries,\" Nat. Mater., 2020.",
          "[10] X. Song, L. Bai, L. Wang, D. Zeng, and J. Liu, \"Enhanced reversibility and electrochemical window of Zn-ion batteries with an acetonitrile/water-in-salt electrolyte,\" Chem. Commun., 2021.",
          "[11] L. Cao et al., \"Fluorinated interphase enables reversible aqueous zinc battery chemistries,\" Nat. Nanotechnol., 2021.",
          "[12] W. Sun et al., \"A rechargeable zinc-air battery based on zinc peroxide chemistry,\" Science, 2021.",
          "[13] S. Liu et al., \"Tuning the electrolyte solvation structure to suppress cathode dissolution, water reactivity, and Zn dendrite growth in zinc-ion batteries,\" Adv. Funct. Mater., 2021.",
          "[14] Y. Luo, X. Chen, H. Zhang, L. Wang, and J. Li, \"Machine learning-guided screening of electrolyte additives for dendrite-free zinc anodes,\" ACS Nano, 2025.",
          "[15] J. Zhang, \"Research on image representation learning method based on self-supervised learning,\" Int. Sci. Tech. Econ. Res., 2026.",
          "[16] Y. Qin, \"Research on long sequence learning behavior modeling based on Transformer-XL,\" Int. Sci. Tech. Econ. Res., 2026.",
          "[17] X. Zeng, \"Cross-border trade fraud detection via integrated heterogeneous graph neural network and XGBoost,\" Int. Sci. Tech. Econ. Res., 2026.",
          "[18] G. Landrum, \"RDKit: Open-source cheminformatics,\" [Online]. Accessed Apr. 2026.",
          "[19] C. Reichardt and T. Welton, Solvents and Solvent Effects in Organic Chemistry, 4th ed., Wiley-VCH, 2011.",
          "[20] T. Chen and C. Guestrin, \"XGBoost: A scalable tree boosting system,\" KDD, 2016.",
          "[21] L. Breiman, \"Random forests,\" Mach. Learn., 2001.",
          "[22] S. M. Lundberg and S.-I. Lee, \"A unified approach to interpreting model predictions,\" NeurIPS 2017.",
          "[23] K. Deb, A. Pratap, S. Agarwal, and T. Meyarivan, \"A fast and elitist multiobjective genetic algorithm: NSGA-II,\" IEEE Trans. Evol. Comput., 2002.",
          "[24] C. Feng, \"Personalized recommendation algorithm of piano practice scheme based on multiobjective optimization,\" Int. Sci. Tech. Econ. Res., 2026.",
          "[25] Y. Ding and G. Chen, \"Joint prediction model of reservoir parameters based on multimodal transformer graph neural operator physical constraint network,\" Int. Sci. Tech. Econ. Res., 2026."
]

MODEL_BENCHMARKS = {
  "lifespan": [
    {"model": "Random Forest", "cv_r2": 0.51, "cv_band": "±0.20", "lopo_r2": 0.477, "p_value": 0.01, "note": "Best generalization for cycle life."},
    {"model": "Gaussian Process", "cv_r2": 0.43, "cv_band": "±0.24", "lopo_r2": 0.401, "p_value": 0.02, "note": "Smooth small-data baseline."},
    {"model": "XGBoost", "cv_r2": 0.37, "cv_band": "±0.27", "lopo_r2": 0.312, "p_value": 0.04, "note": "Competitive but less stable than RF."},
    {"model": "Ridge", "cv_r2": -0.20, "cv_band": "±0.41", "lopo_r2": -0.121, "p_value": 0.19, "note": "Linear baseline underfits the cross-study data."},
  ],
  "conductivity": [
    {"model": "XGBoost", "cv_r2": 0.30, "cv_band": "±0.40", "lopo_r2": 0.453, "p_value": 0.01, "note": "Best for conductivity across papers."},
    {"model": "Random Forest", "cv_r2": 0.22, "cv_band": "±0.38", "lopo_r2": 0.281, "p_value": 0.04, "note": "Reasonable but less sharp than XGBoost."},
    {"model": "Gaussian Process", "cv_r2": 0.18, "cv_band": "±0.33", "lopo_r2": 0.194, "p_value": 0.07, "note": "Useful uncertainty-aware comparison model."},
    {"model": "Ridge", "cv_r2": -0.11, "cv_band": "±0.29", "lopo_r2": -0.053, "p_value": 0.22, "note": "Too rigid for the mixed-literature feature space."},
  ],
  "ce": [
    {"model": "Gaussian Process", "cv_r2": -0.38, "cv_band": "±0.67", "lopo_r2": 0.021, "p_value": 0.33, "note": "CE reporting was too inconsistent to generalize."},
    {"model": "Random Forest", "cv_r2": -0.41, "cv_band": "±0.52", "lopo_r2": -0.044, "p_value": 0.29, "note": "No stable cross-study signal."},
  ],
  "esw": [
    {"model": "Random Forest", "cv_r2": -0.29, "cv_band": "±0.42", "lopo_r2": -0.456, "p_value": 0.13, "note": "Electrochemical stability windows were too unevenly reported."},
    {"model": "Gaussian Process", "cv_r2": -0.33, "cv_band": "±0.47", "lopo_r2": -0.381, "p_value": 0.18, "note": "Still below the mean-baseline despite flexible kernels."},
  ],
}

SHAP_SUMMARY = {
  "lifespan": [
    {"feature": "co_solvent_fraction", "importance": 0.34},
    {"feature": "salt_molality", "importance": 0.18},
    {"feature": "DN_x_fraction", "importance": 0.16},
    {"feature": "MolWt", "importance": 0.09},
    {"feature": "viscosity_cP", "importance": 0.08},
    {"feature": "boiling_point_c", "importance": 0.07},
    {"feature": "dielectric_x_salt", "importance": 0.05},
  ],
  "conductivity": [
    {"feature": "co_solvent_fraction", "importance": 0.30},
    {"feature": "salt_molality", "importance": 0.21},
    {"feature": "DN_x_fraction", "importance": 0.15},
    {"feature": "boiling_point_c", "importance": 0.10},
    {"feature": "dielectric_constant", "importance": 0.09},
    {"feature": "viscosity_cP", "importance": 0.07},
    {"feature": "LogP_x_dielectric", "importance": 0.05},
  ],
}

PARETO_CANDIDATES = [
  {"name": "DMSO", "predicted_lifespan_h": 2450, "predicted_conductivity_mS_cm": 31.2, "bp_c": 189, "dn": 29.8, "in_dataset": True, "status": "internal check", "note": "Strong donor and repeatedly favorable across the curated set."},
  {"name": "DMF", "predicted_lifespan_h": 2140, "predicted_conductivity_mS_cm": 34.8, "bp_c": 153, "dn": 26.6, "in_dataset": True, "status": "low-viscosity analogue", "note": "Maintains conductivity better than heavier glycol-rich systems."},
  {"name": "TEP", "predicted_lifespan_h": 2250, "predicted_conductivity_mS_cm": 24.9, "bp_c": 215, "dn": 24.5, "in_dataset": True, "status": "safety-leaning pick", "note": "High boiling point and repeated Pareto presence support follow-up testing."},
  {"name": "NMP", "predicted_lifespan_h": 2030, "predicted_conductivity_mS_cm": 28.6, "bp_c": 202, "dn": 27.3, "in_dataset": False, "status": "extrapolative", "note": "Interesting chemical neighborhood match, but still outside the training manifold."},
  {"name": "Sulfolane", "predicted_lifespan_h": 1720, "predicted_conductivity_mS_cm": 15.4, "bp_c": 285, "dn": 14.8, "in_dataset": True, "status": "viscosity-limited", "note": "Excellent thermal safety, but mobility penalties remain visible."},
  {"name": "Ethylene glycol", "predicted_lifespan_h": 1560, "predicted_conductivity_mS_cm": 10.2, "bp_c": 197, "dn": 19.0, "in_dataset": True, "status": "common literature anchor", "note": "Frequent in the dataset and useful as a benchmark co-solvent."},
]

FEATURE_GROUPS = [
  {"group": "Molecular descriptors", "count": 11, "items": ["MolWt", "LogP", "TPSA", "H-bond donor", "H-bond acceptor", "rotatable bonds", "aromatic ring count", "fraction sp3", "MolMR", "heteroatom count", "total ring count"]},
  {"group": "Physicochemical properties", "count": 6, "items": ["DN", "AN", "dielectric constant", "viscosity", "boiling point", "dipole moment"]},
  {"group": "Formulation and interactions", "count": 6, "items": ["salt molality", "co-solvent fraction", "DN × fraction", "dielectric × salt", "viscosity × salt", "LogP × dielectric"]},
]


def read_csv(name: str):
    with (DATA_DIR / name).open("r", encoding="utf-8") as fh:
        return list(csv.DictReader(fh))


def to_number(value: str):
    try:
        return int(value)
    except ValueError:
        try:
            return float(value)
        except ValueError:
            return value


def coerce_rows(rows):
    return [{key: to_number(value) for key, value in row.items()} for row in rows]


def build():
    formulations = coerce_rows(read_csv("formulations_curated.csv"))
    sources = coerce_rows(read_csv("source_registry.csv"))
    solvents = coerce_rows(read_csv("solvent_descriptors.csv"))
    solvent_counts = Counter(row["co_solvent_name"] for row in formulations)
    salt_counts = Counter(row["salt_name"] for row in formulations)
    year_counts = Counter(str(row["year"]) for row in formulations)
    status_counts = Counter(row["extraction_status"] for row in formulations)

    top_solvents = [
        {"name": name, "count": count}
        for name, count in sorted(solvent_counts.items(), key=lambda item: (-item[1], item[0]))[:8]
    ]
    payload = {
        "meta": {
            "title": "Water-in-Salt Zinc Electrolyte Atlas",
            "subtitle": "An interactive research microsite built around the ICEMEE 2026 manuscript on organic co-solvents for WIS zinc-ion battery electrolytes.",
            "author": "Xueyang Song",
            "counts": {
                "formulations": len(formulations),
                "papers": len(sources),
                "features": 23,
                "coSolvents": len({row["co_solvent_name"] for row in formulations}),
            },
            "dateRange": "2018 to early 2026",
            "paperPath": "./paper/D-3B_ICEMEE2026_manuscript_2026_04_30.pdf",
        },
        "heroMetrics": [
            {"label": "Formulations", "value": str(len(formulations))},
            {"label": "Open-access papers", "value": str(len(sources))},
            {"label": "Features", "value": "23"},
            {"label": "Tracked co-solvents", "value": str(len({row["co_solvent_name"] for row in formulations}))},
        ],
        "narrative": {
            "whyItMatters": "Aqueous zinc batteries promise lower cost and higher intrinsic safety than lithium-ion systems, but water activity, hydrogen evolution, and plating instability still limit practical deployment.",
            "wisFrame": "Water-in-salt and co-solvent-rich electrolytes reshape Zn2+ solvation, suppress water reactivity, and can trade off stability against conductivity in ways that are difficult to compare across papers without a shared dataset.",
            "honestLimit": "Only lifespan and ionic conductivity produced useful cross-study signal. CE and ESW remain important experimentally, but the literature still reports them too unevenly for robust transfer learning.",
        },
        "yearCounts": [{"year": year, "count": year_counts[year]} for year in sorted(year_counts.keys())],
        "saltCounts": [{"name": name, "count": count} for name, count in sorted(salt_counts.items(), key=lambda item: (-item[1], item[0]))],
        "topSolvents": top_solvents,
        "statusCounts": [{"name": name, "count": count} for name, count in sorted(status_counts.items(), key=lambda item: (-item[1], item[0]))],
        "featureGroups": FEATURE_GROUPS,
        "formulations": formulations,
        "sources": sources,
        "solvents": solvents,
        "modelBenchmarks": MODEL_BENCHMARKS,
        "shapSummary": SHAP_SUMMARY,
        "paretoCandidates": PARETO_CANDIDATES,
        "recommendations": [
            {"title": "Start with DMSO as the internal check", "body": "It is already present in the curated literature and lands inside the favorable Pareto region with strong donor character."},
            {"title": "Use DMF when conductivity needs to stay high", "body": "Its lower viscosity preserves transport better than many heavier donor-rich solvents."},
            {"title": "Carry TEP when safety and boiling point matter", "body": "TEP trades some conductivity for a safer thermal profile and still remains competitively ranked."},
            {"title": "Treat NMP as a hypothesis, not a result", "body": "NMP sits in an attractive descriptor neighborhood but remains extrapolative relative to the training corpus."},
        ],
        "references": [{"key": f"[{idx}]", "text": text} for idx, text in enumerate(PAPER_REFERENCES, start=1)],
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"wrote {OUT}")


if __name__ == "__main__":
    build()
