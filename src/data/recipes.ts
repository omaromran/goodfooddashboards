// Recipe & demographic insights — what resonates by segment

export interface RecipeInsight {
  name: string;
  category: string;
  demographics: string[];
  appealScore: number;
  trend: 'up' | 'stable' | 'down';
  tags: string[];
}

export const topRecipesByDemographic: Record<string, RecipeInsight[]> = {
  'Millennials (25–44)': [
    { name: 'Buddha bowls', category: 'Bowls', demographics: ['Millennials (25–44)'], appealScore: 92, trend: 'up', tags: ['plant-forward', 'Instagrammable', 'customizable'] },
    { name: 'Global flavours (Thai, Indian)', category: 'International', demographics: ['Millennials (25–44)'], appealScore: 88, trend: 'up', tags: ['spicy', 'adventurous'] },
    { name: 'Protein-forward (chicken, salmon)', category: 'Protein', demographics: ['Millennials (25–44)'], appealScore: 85, trend: 'stable', tags: ['fitness', 'high-protein'] },
  ],
  'Families (kids at home)': [
    { name: 'Pasta & comfort', category: 'Comfort', demographics: ['Families (kids at home)'], appealScore: 94, trend: 'stable', tags: ['kid-friendly', 'crowd-pleaser'] },
    { name: 'Sheet-pan meals', category: 'Easy', demographics: ['Families (kids at home)'], appealScore: 89, trend: 'up', tags: ['minimal cleanup', 'one-pan'] },
    { name: 'Mild global (butter chicken, tacos)', category: 'International', demographics: ['Families (kids at home)'], appealScore: 87, trend: 'stable', tags: ['mild', 'familiar'] },
  ],
  'Gen X / 45+': [
    { name: 'Classic comfort (meatloaf, roast)', category: 'Comfort', demographics: ['Gen X / 45+'], appealScore: 90, trend: 'stable', tags: ['nostalgic', 'hearty'] },
    { name: 'Salads & lighter', category: 'Light', demographics: ['Gen X / 45+'], appealScore: 86, trend: 'up', tags: ['health', 'portion control'] },
    { name: 'Mediterranean', category: 'International', demographics: ['Gen X / 45+'], appealScore: 84, trend: 'up', tags: ['heart-healthy', 'olive oil'] },
  ],
  'Health-focused': [
    { name: 'Keto / low-carb', category: 'Diet', demographics: ['Health-focused'], appealScore: 91, trend: 'stable', tags: ['keto', 'low-carb'] },
    { name: 'Plant-based', category: 'Plant-based', demographics: ['Health-focused'], appealScore: 88, trend: 'up', tags: ['vegan', 'vegetarian'] },
    { name: 'Clean label / minimal processing', category: 'Clean', demographics: ['Health-focused'], appealScore: 89, trend: 'up', tags: ['clean label', 'simple'] },
  ],
};

export const recipeTrends = [
  { name: 'Buddha bowls', score: 92, change: 12 },
  { name: 'Global flavours', score: 88, change: 8 },
  { name: 'Sheet-pan meals', score: 86, change: 15 },
  { name: 'Plant-based options', score: 84, change: 10 },
  { name: 'Classic comfort', score: 82, change: -2 },
  { name: 'Keto / low-carb', score: 80, change: 3 },
];

export const cuisinePreferences = [
  { cuisine: 'Italian', share: 24 },
  { cuisine: 'Mexican', share: 18 },
  { cuisine: 'Asian (Thai/Indian)', share: 16 },
  { cuisine: 'American comfort', share: 14 },
  { cuisine: 'Mediterranean', share: 12 },
  { cuisine: 'Other', share: 16 },
];
