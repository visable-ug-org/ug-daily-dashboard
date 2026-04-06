# UG Daily Dashboard

Auto-generated daily report for the UG team. Hosted on GitHub Pages with date switching, D-AB2 target tracking, and anomaly alerts.

**Live URL**: <https://visable-ug-org.github.io/ug-daily-dashboard/>

## Quick Start

```bash
git clone https://github.com/visable-ug-org/ug-daily-dashboard.git
cd ug-daily-dashboard
cp .env.example .env
# Edit .env with your Redash API key
```

### Generate Data (requires VPN)

```bash
node scripts/generate.js                    # auto-detect latest date
node scripts/generate.js --date 2026-04-06  # specific date
```

### View Locally

```bash
npx serve .
# or
python3 -m http.server 8000
```

Open <http://localhost:8000> (or the port shown).

### Deploy

```bash
git add data/ && git commit -m "chore: update daily data" && git push
```

GitHub Pages auto-deploys within ~1 minute.

## Architecture

```
Muke's Machine (VPN)          GitHub              Browser
┌─────────────────┐     ┌──────────────┐    ┌─────────────────┐
│  generate.js    │────>│ data/*.json   │───>│ index.html SPA  │
│  (Redash SQL)   │     │ manifest.json │    │ (Chart.js)      │
└─────────────────┘     └──────────────┘    └─────────────────┘
```

- `index.html` — SPA with date picker, Chart.js charts, D-AB2 progress bar, anomaly table
- `scripts/generate.js` — Fetches data from Redash (7 parallel SQL queries), computes metrics, outputs JSON
- `data/` — One JSON file per day + `manifest.json` listing available dates

## Data Sources

All queries target Redash → Redshift with these tables:

| Table | Schema | Purpose |
|---|---|---|
| `ga_user_metrics` | metrics_layer | Web UV |
| `app_user_lt_retention` | metrics_layer | App UV |
| `active_buyers` | metrics_layer | AB / AB2 |

## Daily Workflow

```
Muke: "更新日报"
  → Agent runs: node scripts/generate.js
  → Agent runs: git add data/ && git commit -m "chore: update daily data" && git push
  → GitHub Pages auto-deploys (~1 min)
  → Anyone opens the URL to view
```
