// Canadian meal solutions market — TAM, segments, growth

export const marketSize = {
  totalCAD: 2.8,
  mealKits: 0.72,
  readyToEat: 0.95,
  preparedMeals: 0.58,
  other: 0.55,
};

export const segmentGrowth = [
  { segment: 'Meal kits', y2022: 100, y2023: 92, y2024: 85, y2025: 78, y2026e: 72, trend: 'declining' },
  { segment: 'Ready-to-eat', y2022: 100, y2023: 118, y2024: 142, y2025: 168, y2026e: 198, trend: 'growing' },
  { segment: 'Prepared meals (retail)', y2022: 100, y2023: 108, y2024: 115, y2025: 122, y2026e: 128, trend: 'stable' },
];

export const regionalOpportunity = [
  { region: 'Ontario', populationShare: 38.5, rtePenetration: 12, growthIndex: 1.22 },
  { region: 'Quebec', populationShare: 22.9, rtePenetration: 8, growthIndex: 1.18 },
  { region: 'BC', populationShare: 13.5, rtePenetration: 15, growthIndex: 1.35 },
  { region: 'Alberta', populationShare: 11.5, rtePenetration: 10, growthIndex: 1.15 },
  { region: 'Prairies', populationShare: 6.8, rtePenetration: 6, growthIndex: 0.95 },
  { region: 'Atlantic', populationShare: 6.8, rtePenetration: 7, growthIndex: 1.05 },
];

export const marketDrivers = [
  { driver: 'Convenience & time scarcity', impact: 95, certainty: 'high' },
  { driver: 'Health & nutrition focus', impact: 88, certainty: 'high' },
  { driver: 'Sustainability / packaging', impact: 72, certainty: 'medium' },
  { driver: 'Price sensitivity (inflation)', impact: 90, certainty: 'high' },
  { driver: 'Variety & discovery', impact: 78, certainty: 'medium' },
];
