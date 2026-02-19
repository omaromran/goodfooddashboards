# GoodFood Canada — Growth & Strategy Dashboard

Board-ready dashboard for **GoodFood** (Canada): market analysis, competitive landscape, recipe & demographic insights, brand reputation, what works / doesn’t, growth roadmap, and EBITDA levers. Use it as a **growth roadmap** and to align the company roadmap.

## What’s inside

- **Executive summary** — Strategic imperative, TAM, RTE vs meal kit growth, key targets  
- **Market analysis** — Canadian meal solutions TAM by segment, segment growth (meal kits ↓, RTE ↑), regional opportunity, market drivers  
- **Competitive landscape** — Share by player, strengths/weaknesses, gaps and GoodFood fit  
- **Recipes & demographics** — Top recipes by segment (millennials, families, 45+, health-focused), cuisine preferences, trend scores  
- **Brand reputation** — NPS, CSAT, sentiment over time, reputation drivers, brand perception  
- **What works / what doesn’t** — Evidence-based list + customer pain points  
- **Growth roadmap** — Prioritized initiatives by theme (RTE pivot, product, CX, EBITDA, visibility), KPIs and targets  
- **EBITDA levers** — Margin impact potential, timeline, confidence  

## Run locally

```bash
npm install
npm run dev
```

Open **http://localhost:5173**. Use the sidebar to jump to any section.

## Build for production

```bash
npm run build
npm run preview   # optional: serve dist/
```

## Data

All data lives in `src/data/` (TypeScript). Replace with real metrics from your analytics, CRM, and surveys when ready:

- `market.ts` — TAM, segment growth, regional opportunity, drivers  
- `competitors.ts` — Competitor list, gaps  
- `recipes.ts` — Recipe insights by demographic  
- `brand.ts` — NPS, sentiment, reputation drivers, perception  
- `whatWorks.ts` — What works / doesn’t, pain points  
- `roadmap.ts` — Roadmap initiatives, EBITDA levers, KPIs  

---

Built for the GoodFood CEO and board to drive visibility, EBITDA, product, and customer experience.
