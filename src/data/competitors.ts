// Competitive landscape — Canada meal kits & RTE

export interface Competitor {
  name: string;
  segment: 'meal_kit' | 'rte' | 'both';
  marketSharePct: number;
  strength: string[];
  weakness: string[];
  pricePosition: 'premium' | 'mid' | 'value';
  rteGrowthYoY?: number;
}

export const competitors: Competitor[] = [
  {
    name: 'HelloFresh / Chefs Plate',
    segment: 'both',
    marketSharePct: 28,
    strength: ['Brand awareness', 'Recipe variety', 'Scale'],
    weakness: ['Meal kit focus', 'RTE late entrant', 'Packaging criticism'],
    pricePosition: 'mid',
    rteGrowthYoY: 15,
  },
  {
    name: 'Factor',
    segment: 'rte',
    marketSharePct: 12,
    strength: ['Keto/health positioning', 'Subscription model', 'US brand'],
    weakness: ['Limited Canadian footprint', 'Premium only'],
    pricePosition: 'premium',
    rteGrowthYoY: 22,
  },
  {
    name: 'FreshPrep',
    segment: 'meal_kit',
    marketSharePct: 8,
    strength: ['BC focus', 'Local sourcing'],
    weakness: ['No RTE', 'Regional only'],
    pricePosition: 'mid',
  },
  {
    name: 'Cook it',
    segment: 'meal_kit',
    marketSharePct: 6,
    strength: ['Quebec strong', 'French recipes'],
    weakness: ['No RTE', 'Limited scale'],
    pricePosition: 'mid',
  },
  {
    name: 'GoodFood (us)',
    segment: 'both',
    marketSharePct: 11,
    strength: ['Canadian heritage', 'RTE pipeline', 'Operational base'],
    weakness: ['Meal kit drag', 'Brand clarity', 'RTE scale'],
    pricePosition: 'mid',
    rteGrowthYoY: 35,
  },
  {
    name: 'Retail RTE (Loblaws, Sobeys, etc.)',
    segment: 'rte',
    marketSharePct: 18,
    strength: ['Foot traffic', 'Impulse', 'Private label'],
    weakness: ['Quality perception', 'Cold chain'],
    pricePosition: 'value',
    rteGrowthYoY: 8,
  },
  {
    name: 'Other D2C / local',
    segment: 'both',
    marketSharePct: 17,
    strength: ['Local loyalty', 'Niche diets'],
    weakness: ['Fragmented', 'Scale'],
    pricePosition: 'mid',
    rteGrowthYoY: 12,
  },
];

export const competitiveGaps = [
  { gap: 'Canadian-first RTE at scale', opportunity: 'High', ourFit: 'Strong' },
  { gap: 'Health-forward without premium-only', opportunity: 'High', ourFit: 'Strong' },
  { gap: 'Sustainability (packaging, carbon)', opportunity: 'Medium', ourFit: 'Improving' },
  { gap: 'Family & bulk options', opportunity: 'Medium', ourFit: 'Moderate' },
  { gap: 'Quick commerce (same-day)', opportunity: 'Growing', ourFit: 'To build' },
];
