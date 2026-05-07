# Water-in-Salt Zn Electrolyte Atlas

Interactive research companion for the ICEMEE 2026 manuscript:
**Machine-learning analysis of organic co-solvents for water-in-salt zinc-ion battery electrolytes**.

This repository packages the curated dataset, site data-generation pipeline, and a static web app for inspecting model outcomes, SHAP-based interpretation, and Pareto solvent recommendations.

## Project scope

The atlas is designed to make cross-study comparison explicit and reproducible:

- **Dataset curation** across reported formulations and solvent descriptors
- **Model result reporting** for cycle lifespan and ionic conductivity (plus negative controls for CE and ESW)
- **Interpretability surfaces** using SHAP-derived feature importance summaries
- **Decision support views** with multi-objective (lifespan vs. conductivity) candidate ranking

The current generated payload reports:

- 108 formulations
- 63 source papers
- 23 engineered features
- 29 tracked co-solvents

## Repository layout

```text
.
├── data/
│   ├── formulations_curated.csv
│   ├── solvent_descriptors.csv
│   └── source_registry.csv
├── public/
│   └── paper/                               # manuscript PDF
├── scripts/
│   └── build_site_data.py                   # CSV -> src/data/generated/siteData.json
├── src/
│   ├── components/                          # dataset/model/shap/pareto/reference panels
│   ├── data/generated/siteData.json         # generated app payload
│   └── App.tsx
└── .github/workflows/deploy-pages.yml       # GitHub Pages build and deploy
```

## Data and methodology summary

### Input datasets

1. `data/formulations_curated.csv`  
   Row-level electrolyte formulations with performance fields (e.g., lifespan, conductivity, CE, ESW), chemistry descriptors, and extraction provenance.
2. `data/source_registry.csv`  
   Bibliographic/source registry used by the references panel.
3. `data/solvent_descriptors.csv`  
   Solvent-level descriptor table (DN, AN, LogP, TPSA, viscosity, dielectric constant, boiling point, etc.).

### Site data generation

`scripts/build_site_data.py` composes a single JSON payload consumed by the frontend (`src/data/generated/siteData.json`).  
The script aggregates:

- Year/salt/status distributions
- Feature group definitions (23 total)
- Benchmark model summary tables
- SHAP feature summaries
- Pareto candidate lists and recommendation text
- Formulation/source/descriptor records for interactive views

## Development

### Requirements

- Node.js 22 (aligned with CI workflow)
- npm
- Python 3.10+ (for `scripts/build_site_data.py`)

### Local setup

```bash
npm install
python scripts/build_site_data.py
npm run dev
```

### Production build

```bash
python scripts/build_site_data.py
npm run build
npm run preview
```

## Deployment

GitHub Pages deployment is defined in `.github/workflows/deploy-pages.yml` and triggers on pushes to `main`.  
The workflow installs dependencies, regenerates `siteData.json`, builds the Vite app, uploads `dist/`, and deploys via `actions/deploy-pages`.

## Reproducibility and limitations

- The site intentionally keeps **cross-paper transfer realism** as a central constraint.
- Current signals are strongest for **lifespan** and **ionic conductivity**; CE and ESW are included for transparency but remain weakly learnable in the present corpus.
- Recommendation outputs are intended as **screening guidance**, not standalone experimental validation.
