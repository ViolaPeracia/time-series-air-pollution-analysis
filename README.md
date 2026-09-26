# Time-Series Air Pollution Analysis

> **Course:** INFO3020 – Introduction to Data Science  
> **Institution:** CMC University – Faculty of Information Technology & Communication  
> **Instructor:** M.Sc. Pham Ngoc Dong

## Project Overview

This project analyzes multi-year temporal variations of urban fine particulate matter (PM₂.₅) in Hanoi, Vietnam, following the CRISP-DM methodology. Using 2-year hourly observations (2023–2024) from the US Embassy reference monitor (OpenAQ) combined with ERA5 surface weather data (Open-Meteo), the analysis investigates:

1. **Temporal Patterns** – Diurnal, weekly, and seasonal cycles of PM₂.₅ concentration.
2. **Statistical Inference** – Whether observed pollution differences between weekdays vs. weekends and winter vs. summer are statistically significant.
3. **Meteorological Drivers** – How temperature, humidity, wind speed, precipitation, and pressure associate with PM₂.₅ via OLS regression (with LINE diagnostics).
4. **Early Alert Classification** – A binary classifier to predict hazardous pollution days (PM₂.₅ > 50 µg/m³), optimized for Recall and PR-AUC.

## Repository Structure

```
air-pollution-analysis/
├── .gitignore               # Excludes raw data, caches, credentials
├── README.md                # This file
├── requirements.txt         # Pinned Python dependencies
├── data/
│   ├── raw/                 # IMMUTABLE raw API responses (not committed)
│   ├── interim/             # Intermediate cleaned data
│   └── processed/           # Final clean Parquet files
├── docs/
│   └── roadmap.md           # Detailed project roadmap
├── notebooks/
│   └── 00_environment_test.ipynb  # Environment verification notebook
├── src/
│   └── __init__.py          # Reusable Python modules
├── figures/                 # Publication-quality charts (300 DPI)
└── reports/                 # Midterm and final reports
```

## Quick Start

### Prerequisites

- Python 3.10 or later
- Git

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/doctor-cato/air-pollution-analysis.git
cd air-pollution-analysis

# 2. Create and activate a virtual environment
python -m venv .venv

# On Windows:
.venv\Scripts\activate

# On macOS/Linux:
source .venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Verify the environment
jupyter nbconvert --to notebook --execute notebooks/00_environment_test.ipynb
```

If the notebook executes without errors, your environment is ready.

## Data Governance

- **`data/raw/` is immutable.** Raw data downloaded from APIs must never be edited manually. All transformations are performed via reproducible code and saved to `data/interim/` or `data/processed/`.
- **Reproducibility.** All notebooks use `random_state=42` for deterministic results and must run cleanly via **Restart Kernel & Run All**.
- **Temporal integrity.** Train/test splits follow chronological order. Random splitting is strictly prohibited to prevent temporal data leakage.

## Academic Integrity Statement

This project strictly adheres to the academic integrity standards of CMC University and the INFO3020 course:

- All data is sourced from verified public APIs (OpenAQ, Open-Meteo) and Vietnamese national standards (QCVN 05:2023/BTNMT, WHO 2021 Air Quality Guidelines).
- No data, metrics, statistical results, or model outputs are fabricated or falsified.
- All analytical decisions (cleaning, transformations, model selection) are documented with explicit rationale in `docs/cleaning_log.md`.
- AI assistance usage is transparently declared below.

### AI Usage Declaration

This project uses AI-assisted tools (GitHub Copilot, Gemini) for:
- Code scaffolding and boilerplate generation
- Documentation drafting and formatting
- Debugging assistance

All AI-generated content is reviewed, validated, and adapted by the project authors. The analytical methodology, statistical interpretations, and scientific conclusions are the authors' own work.

## License

This project is developed for academic purposes as part of the INFO3020 course at CMC University.
