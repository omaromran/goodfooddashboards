// Brand reputation, NPS, sentiment

export const brandMetrics = {
  nps: 34,
  npsBenchmark: 28,
  csat: 4.1,
  csatMax: 5,
  trustScore: 72,
  trustBenchmark: 68,
  consideration: 41,
  considerationBenchmark: 38,
};

export const sentimentOverTime = [
  { month: 'Aug', positive: 62, neutral: 28, negative: 10 },
  { month: 'Sep', positive: 61, neutral: 29, negative: 10 },
  { month: 'Oct', positive: 59, neutral: 31, negative: 10 },
  { month: 'Nov', positive: 63, neutral: 27, negative: 10 },
  { month: 'Dec', positive: 65, neutral: 25, negative: 10 },
  { month: 'Jan', positive: 64, neutral: 26, negative: 10 },
];

export const reputationDrivers = [
  { driver: 'Taste / quality', score: 78, importance: 95 },
  { driver: 'Value for money', score: 68, importance: 92 },
  { driver: 'Convenience', score: 82, importance: 88 },
  { driver: 'Packaging / eco', score: 58, importance: 72 },
  { driver: 'Customer service', score: 71, importance: 85 },
  { driver: 'Brand trust / Canadian', score: 75, importance: 80 },
];

export const brandPerception = [
  { attribute: 'Canadian', score: 85 },
  { attribute: 'Convenient', score: 80 },
  { attribute: 'Good value', score: 65 },
  { attribute: 'Innovative', score: 55 },
  { attribute: 'Premium quality', score: 58 },
  { attribute: 'Eco-friendly', score: 48 },
];
