// Growth roadmap & EBITDA levers

export interface RoadmapItem {
  id: string;
  theme: string;
  initiative: string;
  timeframe: string;
  impact: 'ebitda' | 'revenue' | 'customer' | 'brand';
  priority: 1 | 2 | 3;
  status: 'now' | 'next' | 'later';
}

export const roadmap: RoadmapItem[] = [
  { id: '1', theme: 'Pivot to RTE', initiative: 'Shift marketing & assortment to 60% RTE by end of FY26', timeframe: 'Q2–Q4 FY26', impact: 'revenue', priority: 1, status: 'now' },
  { id: '2', theme: 'Pivot to RTE', initiative: 'Expand RTE SKUs: breakfast, lunch, snacks; family sizes', timeframe: 'Q2 FY26 onwards', impact: 'revenue', priority: 1, status: 'now' },
  { id: '3', theme: 'Product', initiative: 'Portion options: single, 2-person, family (reduce waste & complaints)', timeframe: 'Q3 FY26', impact: 'customer', priority: 1, status: 'now' },
  { id: '4', theme: 'Product', initiative: 'Packaging redesign: recyclable, less plastic, clear instructions', timeframe: 'Q3–Q4 FY26', impact: 'brand', priority: 1, status: 'now' },
  { id: '5', theme: 'Customer experience', initiative: 'Reliable delivery windows & cold chain; delivery NPS target +15', timeframe: 'Q2 FY26', impact: 'customer', priority: 1, status: 'now' },
  { id: '6', theme: 'Customer experience', initiative: 'Post-purchase journey: tips, recipes, reorder prompts', timeframe: 'Q3 FY26', impact: 'revenue', priority: 2, status: 'next' },
  { id: '7', theme: 'EBITDA', initiative: 'Optimize fulfilment: consolidate facilities, reduce last-mile cost', timeframe: 'Q2–Q4 FY26', impact: 'ebitda', priority: 1, status: 'now' },
  { id: '8', theme: 'EBITDA', initiative: 'Ingredient & sourcing efficiency; strategic supplier agreements', timeframe: 'Ongoing', impact: 'ebitda', priority: 1, status: 'now' },
  { id: '9', theme: 'Visibility & brand', initiative: 'Canadian-first campaign: “Real food, real simple” — RTE-led', timeframe: 'Q2 FY26', impact: 'brand', priority: 1, status: 'now' },
  { id: '10', theme: 'Visibility & brand', initiative: 'Partnerships: fitness, wellness, corporate gifting', timeframe: 'Q3 FY26', impact: 'revenue', priority: 2, status: 'next' },
  { id: '11', theme: 'Visibility & brand', initiative: 'Retail pilot: RTE in select grocery (Ontario, BC)', timeframe: 'Q4 FY26', impact: 'revenue', priority: 2, status: 'next' },
  { id: '12', theme: 'Data & personalization', initiative: 'Recommendation engine & dietary filters to improve AOV & retention', timeframe: 'Q4 FY26', impact: 'revenue', priority: 2, status: 'later' },
];

export const ebitdaLevers = [
  { lever: 'Gross margin improvement (sourcing, RTE mix)', potential: '2–3 pts', timeline: '12–18 mo', confidence: 'High' },
  { lever: 'Fulfilment & logistics efficiency', potential: '1–2 pts', timeline: '12 mo', confidence: 'High' },
  { lever: 'Marketing efficiency (shift to RTE, digital)', potential: '0.5–1 pt', timeline: '6–12 mo', confidence: 'Medium' },
  { lever: 'Reduced packaging cost (redesign)', potential: '0.3–0.5 pt', timeline: '12 mo', confidence: 'Medium' },
  { lever: 'Scale (volume) on fixed cost base', potential: '1–2 pts', timeline: '18–24 mo', confidence: 'High' },
];

export const kpis = [
  { name: 'RTE revenue share', current: 28, target: 60, unit: '%', horizon: 'FY26' },
  { name: 'RTE repeat rate (6mo)', current: 2.4, target: 3.2, unit: 'orders', horizon: 'FY26' },
  { name: 'NPS', current: 34, target: 45, unit: '', horizon: 'FY26' },
  { name: 'Delivery NPS', current: 42, target: 55, unit: '', horizon: 'FY26' },
  { name: 'Gross margin', current: 32, target: 36, unit: '%', horizon: 'FY27' },
  { name: 'Adjusted EBITDA margin', current: -2, target: 4, unit: '%', horizon: 'FY27' },
];
