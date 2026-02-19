import { useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";
import "./CanadaMealKitDemographics.css";

const COLORS = {
  hellofresh: "#e07b39",
  goodfood: "#3db87a",
  factor: "#5c6bc0",
  chefsplate: "#e04c7b",
  industry: "#7c5cbf",
  neutral: "#64748b",
};

const PALETTE = ["#e07b39", "#3db87a", "#5c6bc0", "#e04c7b", "#7c5cbf", "#64748b", "#f59e0b"];

const marketShareData = [
  { name: "HelloFresh", value: 32, color: COLORS.hellofresh },
  { name: "Goodfood", value: 24.6, color: COLORS.goodfood },
  { name: "Chef's Plate", value: 14.9, color: COLORS.chefsplate },
  { name: "Others", value: 28.5, color: "#94a3b8" },
];

const generationData = [
  { gen: "Gen Z", usage: 14.5, label: "18–27" },
  { gen: "Millennials", usage: 12.1, label: "28–43" },
  { gen: "Gen X", usage: 7.9, label: "44–59" },
  { gen: "Boomers", usage: 3.2, label: "60+" },
];

const provinceData = [
  { province: "BC", rate: 10.4 },
  { province: "QC", rate: 9.3 },
  { province: "AB", rate: 9.0 },
  { province: "ON", rate: 8.4 },
  { province: "MB", rate: 4.5 },
];

const genderHelloFreshData = [
  { name: "Female", value: 56.32, color: "#e879a9" },
  { name: "Male", value: 43.68, color: "#6366f1" },
];

const motivationData = [
  { reason: "Convenience", pct: 57.7 },
  { reason: "Saves Time", pct: 30.4 },
  { reason: "Avoid Planning", pct: 15.4 },
  { reason: "Health Goals", pct: 12.0 },
  { reason: "Try New Recipes", pct: 9.0 },
];

const canadaMarketGrowth = [
  { year: "2020", value: 0.75, forecast: null as number | null },
  { year: "2021", value: 1.02, forecast: null },
  { year: "2022", value: 1.21, forecast: null },
  { year: "2023", value: 1.38, forecast: null },
  { year: "2024", value: 1.4, forecast: null },
  { year: "2025", value: null, forecast: 1.6 },
  { year: "2026", value: null, forecast: 1.88 },
  { year: "2027", value: null, forecast: 2.28 },
  { year: "2028", value: null, forecast: 2.61 },
  { year: "2029", value: null, forecast: 2.96 },
  { year: "2030", value: null, forecast: 3.26 },
];

const tamFunnelData = [
  { layer: "Total Addressable Market (TAM)", value: 3260, desc: "All Canadians who could theoretically buy", color: "#6366f1" },
  { layer: "Serviceable Addressable Market (SAM)", value: 1850, desc: "Urban, internet-connected households with income $55K+", color: "#8b5cf6" },
  { layer: "Serviceable Obtainable Market (SOM)", value: 1100, desc: "Realistically capturable by existing players today", color: "#a78bfa" },
  { layer: "Current Revenue (2024)", value: 1400, desc: "Actual Canada meal kit/delivery revenue", color: "#c4b5fd" },
];

const segmentBreakdown = [
  { name: "Cook & Eat Kits", share: 58.6, color: "#e07b39" },
  { name: "Heat & Eat / RTE", share: 30.4, color: "#5c6bc0" },
  { name: "Other / Specialty", share: 11.0, color: "#94a3b8" },
];

const recipePersonas = [
  {
    id: "urban-pro",
    name: "Urban Professional",
    emoji: "💼",
    color: "#6366f1",
    bg: "#eef2ff",
    age: "25–35",
    size: "Singles & couples",
    priority: "Speed + global flavours",
    cookTime: "≤ 20 min",
    volume: 32,
    tags: ["Quick", "Global", "Protein-rich"],
    topRecipes: [
      { name: "Sweet Chili Pork Banh Mi Baguettes", cuisine: "Vietnamese", time: 20, demand: 95, tag: "Trending" },
      { name: "Korean Bulgogi Beef Bowls", cuisine: "Korean", time: 20, demand: 91, tag: "High Volume" },
      { name: "Spicy Shrimp Tacos with Mango Slaw", cuisine: "Mexican", time: 20, demand: 88, tag: "High Volume" },
      { name: "Japanese Teriyaki Salmon Rice Bowl", cuisine: "Japanese", time: 20, demand: 85, tag: "Health" },
      { name: "Creamy Pesto Chicken Pasta", cuisine: "Italian", time: 25, demand: 82, tag: "Comfort" },
    ],
  },
  {
    id: "family",
    name: "Family Planner",
    emoji: "👨‍👩‍👧",
    color: "#e07b39",
    bg: "#fff7ed",
    age: "30–45",
    size: "Families with kids",
    priority: "Picky-eater friendly, budget value",
    cookTime: "25–35 min",
    volume: 28,
    tags: ["Kid-Friendly", "Budget", "Comfort"],
    topRecipes: [
      { name: "Kids' Pepperoni Pita Pizzas", cuisine: "Italian", time: 20, demand: 97, tag: "Top Rated" },
      { name: "Saucy BBQ Beef Meatballs & Mash", cuisine: "American", time: 30, demand: 93, tag: "Top Rated" },
      { name: "Zesty Beef Quesadillas", cuisine: "Mexican", time: 20, demand: 89, tag: "High Volume" },
      { name: "Almond-Crusted Chicken & Veg", cuisine: "Canadian", time: 30, demand: 84, tag: "Family Fav" },
      { name: "Caramelized Onion Smash Burgers", cuisine: "American", time: 25, demand: 80, tag: "Weekend" },
    ],
  },
  {
    id: "health",
    name: "Health-Focused",
    emoji: "🥗",
    color: "#3db87a",
    bg: "#f0fdf4",
    age: "28–45",
    size: "Singles, couples, fitness-oriented",
    priority: "Macros, clean labels, high protein",
    cookTime: "20–30 min",
    volume: 22,
    tags: ["High-Protein", "Low-Carb", "Clean"],
    topRecipes: [
      { name: "Loaded Mashed Potato Bar (Protein Build)", cuisine: "American", time: 30, demand: 90, tag: "Top Rated" },
      { name: "Italian-Spiced Pork Chops & Carrot Fries", cuisine: "Italian", time: 25, demand: 88, tag: "Clean15" },
      { name: "Chicken Balsamic & Burst Tomato Skillet", cuisine: "Mediterranean", time: 25, demand: 87, tag: "High-Protein" },
      { name: "Harissa Squash Bowls with Halloumi", cuisine: "N. African", time: 30, demand: 84, tag: "Vegetarian" },
      { name: "Golden Turmeric Salmon & Greens", cuisine: "Fusion", time: 20, demand: 82, tag: "Clean" },
    ],
  },
  {
    id: "explorer",
    name: "Culinary Explorer",
    emoji: "🌍",
    color: "#e04c7b",
    bg: "#fdf2f8",
    age: "22–38",
    size: "Gen Z & younger Millennials",
    priority: "Novel cuisines, Instagrammable, bold flavours",
    cookTime: "30–40 min",
    volume: 18,
    tags: ["Global", "Adventurous", "Trending"],
    topRecipes: [
      { name: "Chickpea & Eggplant Tagine-Style Stew", cuisine: "Moroccan", time: 35, demand: 86, tag: "Trending" },
      { name: "Indian Tikka Masala Chicken", cuisine: "Indian", time: 35, demand: 85, tag: "Global" },
      { name: "Sheet Pan Piri Piri Chicken", cuisine: "Portuguese", time: 35, demand: 83, tag: "Trending" },
      { name: "Spice-Crusted Tuna Steaks & Scallion Sauce", cuisine: "Fusion", time: 30, demand: 80, tag: "Premium" },
      { name: "Wild Mushroom Truffled Risotto", cuisine: "Italian", time: 40, demand: 77, tag: "Premium" },
    ],
  },
];

const cuisineVolumeData = [
  { cuisine: "Italian / Pasta", demand: 94, personas: "Family, Health, Explorer" },
  { cuisine: "Asian (Korean/Japanese)", demand: 91, personas: "Urban Pro, Explorer" },
  { cuisine: "Mexican / Tex-Mex", demand: 89, personas: "Family, Urban Pro" },
  { cuisine: "North American Comfort", demand: 87, personas: "Family" },
  { cuisine: "Mediterranean", demand: 83, personas: "Health, Explorer" },
  { cuisine: "Vietnamese / SE Asian", demand: 80, personas: "Urban Pro, Explorer" },
  { cuisine: "Indian / S. Asian", demand: 76, personas: "Explorer, Urban Pro" },
  { cuisine: "Moroccan / N. African", demand: 68, personas: "Explorer" },
];

const cookTimeVolumeData = [
  { time: "≤ 15 min", pct: 18 },
  { time: "20 min", pct: 34 },
  { time: "25–30 min", pct: 31 },
  { time: "35–40 min", pct: 12 },
  { time: "45+ min", pct: 5 },
];

const trendingTagsData = [
  { tag: "High-Protein / 30g+", growth: "+38%", color: "#6366f1" },
  { tag: "20-Min Meals", growth: "+27%", color: "#e07b39" },
  { tag: "Korean / Asian Fusion", growth: "+24%", color: "#e04c7b" },
  { tag: "Clean Label / No Additives", growth: "+21%", color: "#3db87a" },
  { tag: "Build-Your-Own / Bowls", growth: "+19%", color: "#f59e0b" },
  { tag: "Global Cuisines", growth: "+17%", color: "#7c5cbf" },
];

const rtePersonas = [
  {
    id: "fitness",
    name: "Fitness-Focused",
    emoji: "💪",
    color: "#6366f1",
    bg: "#eef2ff",
    age: "25–40",
    priority: "30g+ protein, macro tracking",
    volume: 38,
    tags: ["High-Protein", "Keto", "Macro-Friendly"],
    topMeals: [
      { name: "Protein Plus Grilled Chicken Bowl", protein: "42g", carbs: "12g", demand: 96, tag: "Top Seller" },
      { name: "Jalapeño Lime Cheddar Chicken & Cauliflower Rice", protein: "35g", carbs: "10g", demand: 94, tag: "Keto" },
      { name: "Green Chile Chicken with Black Beans", protein: "38g", carbs: "15g", demand: 92, tag: "Trending" },
      { name: "Louisiana Blackened Shrimp & Cauliflower", protein: "32g", carbs: "9g", demand: 89, tag: "Keto" },
      { name: "Korean BBQ Beef Bowl (High-Protein)", protein: "36g", carbs: "18g", demand: 87, tag: "Global" },
    ],
  },
  {
    id: "time-poor",
    name: "Ultra-Busy Professional",
    emoji: "⏰",
    color: "#e07b39",
    bg: "#fff7ed",
    age: "28–45",
    priority: "< 3 min heat, balanced, variety",
    volume: 29,
    tags: ["Fast", "Balanced", "No-Prep"],
    topMeals: [
      { name: "Tuscan-Style Chicken with Sun-Dried Tomatoes", protein: "28g", carbs: "22g", demand: 93, tag: "Top Rated" },
      { name: "Herb-Crusted Salmon with Quinoa", protein: "30g", carbs: "28g", demand: 91, tag: "Premium" },
      { name: "Shredded Chicken Taco Bowl", protein: "26g", carbs: "32g", demand: 89, tag: "Comfort" },
      { name: "Nonna's Sunday Beef Bolognese", protein: "24g", carbs: "35g", demand: 86, tag: "Comfort" },
      { name: "Indian Butter Chicken with Basmati", protein: "27g", carbs: "38g", demand: 84, tag: "Global" },
    ],
  },
  {
    id: "calorie-smart",
    name: "Calorie-Conscious",
    emoji: "🥗",
    color: "#3db87a",
    bg: "#f0fdf4",
    age: "30–50",
    priority: "≤ 550 cal, satisfying portions",
    volume: 21,
    tags: ["Low-Cal", "Portion-Control", "Weight Management"],
    topMeals: [
      { name: "Chicken Pesto with Zucchini Noodles", protein: "28g", carbs: "15g", demand: 90, tag: "Calorie Smart" },
      { name: "Mediterranean Salmon & Roasted Veg", protein: "29g", carbs: "18g", demand: 88, tag: "Heart-Healthy" },
      { name: "Lemon Herb Tilapia with Green Beans", protein: "25g", carbs: "12g", demand: 85, tag: "Calorie Smart" },
      { name: "Turkey Meatballs in Marinara", protein: "27g", carbs: "20g", demand: 82, tag: "Comfort" },
      { name: "Asian-Inspired Veggie Stir-Fry", protein: "14g", carbs: "28g", demand: 79, tag: "Plant-Based" },
    ],
  },
  {
    id: "plant-forward",
    name: "Plant-Based / Flexitarian",
    emoji: "🌱",
    color: "#e04c7b",
    bg: "#fdf2f8",
    age: "24–38",
    priority: "Vegan-friendly, clean label, sustainability",
    volume: 12,
    tags: ["Vegan", "Vegetarian", "Sustainable"],
    topMeals: [
      { name: "Thai Coconut Curry Tofu Bowl", protein: "18g", carbs: "42g", demand: 86, tag: "Vegan" },
      { name: "Mediterranean Chickpea & Falafel Bowl", protein: "16g", carbs: "45g", demand: 84, tag: "Vegan" },
      { name: "Korean BBQ Cauliflower & Edamame", protein: "15g", carbs: "38g", demand: 81, tag: "Vegan" },
      { name: "Italian Penne with Plant-Based Sausage", protein: "20g", carbs: "48g", demand: 78, tag: "Vegetarian" },
      { name: "Moroccan-Spiced Lentil Stew", protein: "14g", carbs: "40g", demand: 75, tag: "Vegan" },
    ],
  },
];

const rteProteinVolumeData = [
  { protein: "Chicken", share: 42, personas: "Fitness, Time-Poor, Cal-Smart" },
  { protein: "Beef", share: 18, personas: "Fitness, Time-Poor" },
  { protein: "Seafood (Salmon/Shrimp)", share: 16, personas: "Cal-Smart, Time-Poor" },
  { protein: "Plant-Based", share: 12, personas: "Plant-Forward" },
  { protein: "Pork", share: 8, personas: "Fitness, Time-Poor" },
  { protein: "Turkey", share: 4, personas: "Cal-Smart" },
];

const rteCuisineStyleData = [
  { style: "American Comfort", pct: 28 },
  { style: "Asian Fusion (Korean/Japanese)", pct: 22 },
  { style: "Mediterranean / Italian", pct: 19 },
  { style: "Mexican / Tex-Mex", pct: 15 },
  { style: "Indian / S. Asian", pct: 9 },
  { style: "Other Global", pct: 7 },
];

const rteTrendingFeaturesData = [
  { feature: "30g+ Protein", growth: "+42%", color: "#6366f1" },
  { feature: "Keto / <15g Net Carbs", growth: "+35%", color: "#e07b39" },
  { feature: "Clean Label / No Preservatives", growth: "+28%", color: "#3db87a" },
  { feature: "Bowl Format", growth: "+25%", color: "#f59e0b" },
  { feature: "Plant-Based Proteins", growth: "+22%", color: "#e04c7b" },
  { feature: "Calorie Smart (≤550 cal)", growth: "+18%", color: "#7c5cbf" },
];

const brandProfiles: Record<
  string,
  {
    color: string;
    emoji: string;
    target: string;
    age: string;
    gender: string;
    income: string;
    household: string;
    geography: string;
    market: string;
    notes: string;
    price: string;
  }
> = {
  HelloFresh: {
    color: COLORS.hellofresh,
    emoji: "🟠",
    target: "Broad urban audience; young professionals & couples",
    age: "Primary: 25–34 (largest web visitor group)",
    gender: "56% Female / 44% Male",
    income: "Middle-to-upper income ($60K+)",
    household: "Singles, couples, small families",
    geography: "Available across 95% of Canada",
    market: "32% market share in Canada",
    notes: "Largest global meal kit brand; acquired Chef's Plate",
    price: "$8–$12/meal",
  },
  "Goodfood (Good Food)": {
    color: COLORS.goodfood,
    emoji: "🟢",
    target: "Millennial-first brand; digitally engaged Canadians",
    age: "Core: Millennials & Gen Z (25–40)",
    gender: "Slight female skew",
    income: "Middle-upper income; pivoting to value-seekers (2024–25)",
    household: "Urban couples & young families; ~101K active customers (2024)",
    geography: "Coast-to-coast; hubs in Montreal & Calgary",
    market: "24.6% market share; Canada's largest independent online grocer",
    notes: "Originally Canada's 'millennial food brand'; added Heat & Eat meals & Value Plan in 2024–25",
    price: "$9–$13/meal",
  },
  "Factor (factormeals.ca)": {
    color: COLORS.factor,
    emoji: "🔵",
    target: "Busy health-focused professionals; fitness community",
    age: "25–45, skews slightly older than meal kits",
    gender: "Broad; strong fitness/health-conscious segment",
    income: "Upper-middle income ($70K+); premium price point",
    household: "Singles & couples; no cooking required appeals to time-poor",
    geography: "ON, QC, BC, AB, MB + Atlantic; expanding",
    market: "Part of HelloFresh Group; Canada's #1 ready-to-eat delivery (self-reported)",
    notes: "Ready-to-eat (not a kit); dietitian-approved; keto/high-protein focus",
    price: "$12–$15/meal",
  },
  "Chef's Plate": {
    color: COLORS.chefsplate,
    emoji: "🩷",
    target: "Budget-conscious families; everyday home cooks",
    age: "Broad; strong family segment (parents 28–45)",
    gender: "Slight female skew (family meal planning)",
    income: "Lower-middle to middle income; most affordable kit",
    household: "Families with children; 2–4 person households",
    geography: "95% of Canada",
    market: "14.9% market share; owned by HelloFresh since 2018",
    notes: "Canada's most affordable mainstream meal kit; federally CFIA-registered",
    price: "$8–$10/meal (lowest of the majors)",
  },
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number; color?: string; payload?: { fill?: string } }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="canada-demo-tooltip">
        <p className="canada-demo-tooltip-label">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.color ?? entry.payload?.fill }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function CanadaMealKitDemographics() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedBrand, setSelectedBrand] = useState("HelloFresh");
  const [recipeType, setRecipeType] = useState<"meal-kits" | "rte">("meal-kits");

  const tabs = [
    { id: "overview", label: "📊 Market Overview" },
    { id: "tam", label: "💰 TAM / Market Size" },
    { id: "demographics", label: "👥 Demographics" },
    { id: "brands", label: "🏷️ Brand Profiles" },
    { id: "behavior", label: "🛒 Consumer Behavior" },
    { id: "recipes", label: "🍽️ Recipe Strategy" },
  ];

  return (
    <div className="canada-meal-kit-demographics">
      <header className="canada-demo-header">
        <div className="canada-demo-header-inner">
          <h1 className="canada-demo-title">Canadian Meal Kit & Food Delivery</h1>
          <p className="canada-demo-subtitle">Customer Demographics & Market Intelligence · Data as of 2023–2025</p>
        </div>
      </header>

      <div className="canada-demo-tabs py-3 px-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-[44px] min-w-[44px] px-5 py-3 rounded-lg text-sm font-semibold border-2 transition-all cursor-pointer select-none ${
                activeTab === tab.id
                  ? "border-indigo-500 bg-indigo-500 text-white shadow-md hover:bg-indigo-600 hover:border-indigo-600"
                  : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="canada-demo-content">
        {activeTab === "overview" && (
          <div className="canada-demo-section">
            <div className="canada-demo-grid canada-demo-grid--3">
              {[
                { label: "Canadians Currently Subscribed", value: "8.4%", sub: "Down from 12.8% at pandemic peak (2020)" },
                { label: "Market Size (Canada)", value: "~$1.1B", sub: "CAD — tripled in 5 years before peak" },
                { label: "Never Tried a Meal Kit", value: "69%", sub: "Of Canadians have never subscribed" },
              ].map((stat) => (
                <div key={stat.label} className="canada-demo-card">
                  <p className="canada-demo-card-label">{stat.label}</p>
                  <p className="canada-demo-card-value">{stat.value}</p>
                  <p className="canada-demo-card-sub">{stat.sub}</p>
                </div>
              ))}
            </div>

            <div className="canada-demo-grid canada-demo-grid--2">
              <div className="canada-demo-card">
                <h2 className="canada-demo-card-title">Canadian Market Share</h2>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={marketShareData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={95}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {marketShareData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => `${val}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <p className="canada-demo-source">Source: Dalhousie University Agri-Food Analytics Lab / Caddle</p>
              </div>

              <div className="canada-demo-card">
                <h2 className="canada-demo-card-title">Usage Rate by Province</h2>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={provinceData} layout="vertical" margin={{ left: 10, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 12]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="province" tick={{ fontSize: 12 }} width={30} />
                    <Tooltip formatter={(val) => `${val}%`} />
                    <Bar dataKey="rate" fill="#6366f1" radius={[0, 4, 4, 0]} name="Subscribers" isAnimationActive={false} />
                  </BarChart>
                </ResponsiveContainer>
                <p className="canada-demo-source">BC leads; Manitoba lowest. Atlantic region highest for regular use (28%)</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tam" && (
          <div className="canada-demo-section canada-demo-section--stack">
            <div className="canada-demo-grid canada-demo-grid--4">
              {[
                { label: "Canada TAM (2030 forecast)", value: "US$3.26B", sub: "CAGR 16.5% (2024–2030)" },
                { label: "Canada Market Now (2024)", value: "US$1.4B", sub: "~4.3% of global market" },
                { label: "Canada Statista (2025E)", value: "US$1.99B", sub: "10.44% CAGR to 2029" },
                { label: "Global Market (2024)", value: "US$22.8B", sub: "North America = 45.5% share" },
              ].map((stat) => (
                <div key={stat.label} className="canada-demo-card">
                  <p className="canada-demo-card-label">{stat.label}</p>
                  <p className="canada-demo-card-value canada-demo-card-value--sm">{stat.value}</p>
                  <p className="canada-demo-card-sub">{stat.sub}</p>
                </div>
              ))}
            </div>

            <div className="canada-demo-card">
              <h2 className="canada-demo-card-title">Canada Meal Kit Market — Historical & Forecast</h2>
              <p className="canada-demo-card-desc">Revenue in USD billions · Solid = actual, dashed = forecast</p>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={canadaMarketGrowth} margin={{ right: 20 }}>
                  <defs>
                    <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => `$${v}B`} tick={{ fontSize: 11 }} domain={[0, 4]} />
                  <Tooltip
                    formatter={(val, name) =>
                      val != null ? [`$${val}B`, name === "value" ? "Actual Revenue" : "Forecast Revenue"] : [null]
                    }
                  />
                  <ReferenceLine
                    x="2024"
                    stroke="#94a3b8"
                    strokeDasharray="4 4"
                    label={{ value: "Now", position: "top", fontSize: 11, fill: "#94a3b8", style: {} }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    fill="url(#actualGrad)"
                    name="Actual Revenue"
                    connectNulls={false}
                    dot={{ r: 4, fill: "#6366f1" }}
                    isAnimationActive={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="forecast"
                    stroke="#a78bfa"
                    strokeWidth={2}
                    strokeDasharray="6 3"
                    fill="url(#forecastGrad)"
                    name="Forecast Revenue"
                    connectNulls={false}
                    dot={{ r: 4, fill: "#a78bfa" }}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
              <p className="canada-demo-source">Sources: Grand View Research, Statista, GM Insights</p>
            </div>

            <div className="canada-demo-grid canada-demo-grid--2">
              <div className="canada-demo-card">
                <h2 className="canada-demo-card-title">TAM → SAM → SOM (Canada, 2030)</h2>
                <div className="canada-demo-funnel">
                  {tamFunnelData.map((item) => (
                    <div key={item.layer}>
                      <div className="canada-demo-funnel-row">
                        <span className="canada-demo-funnel-label">{item.layer}</span>
                        <span className="canada-demo-funnel-value" style={{ color: item.color }}>
                          US${item.value >= 1000 ? (item.value / 1000).toFixed(2) + "B" : item.value + "M"}
                        </span>
                      </div>
                      <div className="canada-demo-funnel-bar">
                        <div
                          className="canada-demo-funnel-fill"
                          style={{
                            width: `${(item.value / 3260) * 100}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                      <p className="canada-demo-funnel-desc">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="canada-demo-card">
                <h2 className="canada-demo-card-title">Canada Revenue by Segment (2023)</h2>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={segmentBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={75}
                      dataKey="share"
                      label={(props: { name?: string; share?: number }) => `${props.name ?? ""}: ${props.share ?? 0}%`}
                      labelLine={false}
                    >
                      {segmentBreakdown.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => `${val}%`} />
                  </PieChart>
                </ResponsiveContainer>
                <p className="canada-demo-source">Heat & Eat (Factor-style) is fastest-growing segment at 9.2%+ CAGR</p>
              </div>
            </div>

            <div className="canada-demo-card">
              <h2 className="canada-demo-card-title">Canada vs. Global Market Context</h2>
              <div className="canada-demo-grid canada-demo-grid--3">
                {[
                  {
                    title: "Canada's Position",
                    icon: "🍁",
                    items: [
                      "4.3% of global market in 2023",
                      "Fastest-growing in North America",
                      "CAGR 16.5% (2024–2030) — higher than global avg",
                      "User penetration: 3.7% (2025E) → 4.2% (2029E)",
                      "ARPU: ~US$1,350/year",
                    ],
                  },
                  {
                    title: "Growth Drivers",
                    icon: "📈",
                    items: [
                      "Rising dual-income household count",
                      "Urban millennial population growth",
                      "Expansion of heat & eat / RTE segment",
                      "Grocery inflation pushing kit value",
                      "Broadened geographic delivery coverage",
                    ],
                  },
                  {
                    title: "TAM Risks / Headwinds",
                    icon: "⚠️",
                    items: [
                      "High subscriber churn (post-pandemic reset)",
                      "Cost-of-living pressures in 2024–25",
                      "Competition from online grocers (Instacart, etc.)",
                      "Packaging / sustainability backlash",
                      "Goodfood subscriber base still declining",
                    ],
                  },
                ].map((section) => (
                  <div key={section.title} className="canada-demo-context-block">
                    <h3 className="canada-demo-context-title">
                      {section.icon} {section.title}
                    </h3>
                    <ul className="canada-demo-context-list">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="canada-demo-note canada-demo-note--indigo">
              <strong>📌 Analyst range note:</strong> TAM estimates vary significantly across research firms. Grand View Research puts Canada at US$3.26B by 2030 (16.5% CAGR); Statista projects US$2.96B by 2029 (10.4% CAGR); GM Insights sees US$1.6B by 2025. Use the midpoint of ~US$2.5–3.0B by 2029/2030 as a reasonable planning estimate.
            </div>
          </div>
        )}

        {activeTab === "demographics" && (
          <div className="canada-demo-section canada-demo-section--stack">
            <div className="canada-demo-grid canada-demo-grid--2">
              <div className="canada-demo-card">
                <h2 className="canada-demo-card-title">Usage Rate by Generation</h2>
                <p className="canada-demo-card-desc">% of each generation currently subscribed to meal kits</p>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={generationData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="gen" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} domain={[0, 18]} />
                    <Tooltip content={<CustomTooltip />} formatter={(val) => `${val}%`} />
                    <Bar dataKey="usage" radius={[6, 6, 0, 0]} name="Usage Rate" isAnimationActive={false}>
                      {generationData.map((_, i) => (
                        <Cell key={i} fill={PALETTE[i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <p className="canada-demo-source">Source: Dalhousie University / Caddle Survey</p>
              </div>

              <div className="canada-demo-card">
                <h2 className="canada-demo-card-title">Gender Split (HelloFresh.ca Visitors)</h2>
                <p className="canada-demo-card-desc">Web audience proxy for the industry's gender skew</p>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={genderHelloFreshData}
                      cx="50%"
                      cy="50%"
                      outerRadius={85}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                      labelLine={false}
                    >
                      {genderHelloFreshData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => `${val}%`} />
                  </PieChart>
                </ResponsiveContainer>
                <p className="canada-demo-source">Source: SimilarWeb audience data (Oct 2025)</p>
              </div>
            </div>

            <div className="canada-demo-card">
              <h2 className="canada-demo-card-title">Key Demographic Characteristics</h2>
              <div className="canada-demo-grid canada-demo-grid--4">
                {[
                  {
                    icon: "🎂",
                    label: "Age",
                    headline: "25–44 core",
                    detail:
                      "Millennials + Gen Z drive 80%+ of subscriptions. Under-34s are 2× more likely to use meal kits than older Canadians.",
                  },
                  {
                    icon: "💰",
                    label: "Income",
                    headline: "$60K–$100K+",
                    detail:
                      "Higher-income households dominate. Households earning $75K+ are most likely to order food online. Meal kits cost $8–$15/meal.",
                  },
                  {
                    icon: "🏙️",
                    label: "Location",
                    headline: "Urban-skewed",
                    detail:
                      "Urban dwellers in BC, QC, and AB lead. BC has 10.4% subscription rate vs. national 8.4%. Atlantic Canada highest for regular use.",
                  },
                  {
                    icon: "🏠",
                    label: "Household",
                    headline: "Couples & families",
                    detail:
                      "Families with children spend more per order. Singles drawn to Factor (ready-to-eat). Couples are core meal-kit buyers.",
                  },
                ].map((item) => (
                  <div key={item.label} className="canada-demo-context-block">
                    <div className="canada-demo-char-emoji">{item.icon}</div>
                    <p className="canada-demo-card-label">{item.label}</p>
                    <p className="canada-demo-char-headline">{item.headline}</p>
                    <p className="canada-demo-char-detail">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="canada-demo-note canada-demo-note--indigo">
              <strong>💡 Industry-wide insight:</strong> Meal kit subscribers are broadly described as young (Gen X + Millennials), overwhelmingly urban, skewing slightly female, and upper-income — consistent across Canadian and global research.
            </div>
          </div>
        )}

        {activeTab === "brands" && (
          <div className="canada-demo-section canada-demo-section--stack">
            <div className="canada-demo-brand-pills">
              {Object.keys(brandProfiles).map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => setSelectedBrand(brand)}
                  className={`canada-demo-brand-pill ${selectedBrand === brand ? "canada-demo-brand-pill--active" : ""}`}
                  style={
                    selectedBrand === brand
                      ? { backgroundColor: brandProfiles[brand].color, borderColor: brandProfiles[brand].color }
                      : undefined
                  }
                >
                  {brandProfiles[brand].emoji} {brand}
                </button>
              ))}
            </div>

            {selectedBrand && (
              <div className="canada-demo-card">
                <div className="canada-demo-brand-header">
                  <div
                    className="canada-demo-brand-avatar"
                    style={{ backgroundColor: brandProfiles[selectedBrand].color + "22" }}
                  >
                    {brandProfiles[selectedBrand].emoji}
                  </div>
                  <div>
                    <h2 className="canada-demo-brand-name">{selectedBrand}</h2>
                    <p className="canada-demo-brand-target">{brandProfiles[selectedBrand].target}</p>
                  </div>
                  <div className="canada-demo-brand-price-wrap">
                    <p className="canada-demo-card-label">Price per meal</p>
                    <p className="canada-demo-brand-price">{brandProfiles[selectedBrand].price}</p>
                  </div>
                </div>

                <div className="canada-demo-grid canada-demo-grid--2">
                  {[
                    { label: "Age Profile", value: brandProfiles[selectedBrand].age, icon: "🎂" },
                    { label: "Gender", value: brandProfiles[selectedBrand].gender, icon: "⚧" },
                    { label: "Income", value: brandProfiles[selectedBrand].income, icon: "💰" },
                    { label: "Household Type", value: brandProfiles[selectedBrand].household, icon: "🏠" },
                    { label: "Geography", value: brandProfiles[selectedBrand].geography, icon: "🗺️" },
                    { label: "Market Position", value: brandProfiles[selectedBrand].market, icon: "📈" },
                  ].map((item) => (
                    <div key={item.label} className="canada-demo-meta-row">
                      <span className="canada-demo-meta-icon">{item.icon}</span>
                      <div>
                        <p className="canada-demo-card-label">{item.label}</p>
                        <p className="canada-demo-meta-value">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="canada-demo-note canada-demo-note--yellow">
                  <strong>📌 Notable:</strong> {brandProfiles[selectedBrand].notes}
                </div>
              </div>
            )}

            <div className="canada-demo-card canada-demo-card--table-wrap">
              <h3 className="canada-demo-table-caption">Side-by-Side Comparison</h3>
              <div className="canada-demo-table-scroll">
                <table className="canada-demo-table">
                  <thead>
                    <tr>
                      <th>Brand</th>
                      <th>Core Age</th>
                      <th>Income</th>
                      <th>Mkt Share</th>
                      <th>Price/Meal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "HelloFresh", age: "25–34", income: "$60K–$90K+", share: "32%", price: "$8–$12", color: COLORS.hellofresh },
                      { name: "Goodfood", age: "25–40", income: "$55K–$85K+", share: "24.6%", price: "$9–$13", color: COLORS.goodfood },
                      { name: "Factor", age: "25–45", income: "$70K–$100K+", share: "Growing", price: "$12–$15", color: COLORS.factor },
                      { name: "Chef's Plate", age: "28–45", income: "$45K–$75K", share: "14.9%", price: "$8–$10", color: COLORS.chefsplate },
                    ].map((row) => (
                      <tr key={row.name}>
                        <td>
                          <span style={{ color: row.color, fontWeight: 600 }}>{row.name}</span>
                        </td>
                        <td>{row.age}</td>
                        <td>{row.income}</td>
                        <td>{row.share}</td>
                        <td>{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "behavior" && (
          <div className="canada-demo-section canada-demo-section--stack">
            <div className="canada-demo-card">
              <h2 className="canada-demo-card-title">Why Canadians Use Meal Kits</h2>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={motivationData} layout="vertical" margin={{ left: 20, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 70]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="reason" tick={{ fontSize: 12 }} width={110} />
                  <Tooltip formatter={(val) => `${val}%`} />
                  <Bar dataKey="pct" radius={[0, 6, 6, 0]} name="% of Users" isAnimationActive={false}>
                    {motivationData.map((_, i) => (
                      <Cell key={i} fill={PALETTE[i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="canada-demo-grid canada-demo-grid--3">
              {[
                {
                  title: "Why People Leave",
                  icon: "❌",
                  items: [
                    "78% say prices too high",
                    "67.5% cite excessive packaging",
                    "Post-pandemic lifestyle return",
                    "Repetitive recipes",
                    "Low retention past 5–8 weeks",
                  ],
                },
                {
                  title: "What They Look For",
                  icon: "✅",
                  items: [
                    "Fresh, quality ingredients",
                    "Dietary customization (keto, vegan…)",
                    "30-min or less recipes",
                    "Flexible skip/cancel policies",
                    "Locally sourced ingredients",
                  ],
                },
                {
                  title: "Trends Shaping Demand",
                  icon: "📈",
                  items: [
                    "Shift toward ready-to-eat (Factor)",
                    "Value plans / budget options",
                    "Health & sustainability focus",
                    "Single-person household growth",
                    "Digital-first subscriptions",
                  ],
                },
              ].map((section) => (
                <div key={section.title} className="canada-demo-card">
                  <h3 className="canada-demo-context-title">
                    {section.icon} {section.title}
                  </h3>
                  <ul className="canada-demo-context-list canada-demo-context-list--spaced">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="canada-demo-card">
              <h3 className="canada-demo-card-title">📍 Retention Reality Check</h3>
              <div className="canada-demo-retention-grid">
                {[
                  { label: "Never tried any kit", value: "69%", className: "canada-demo-retention--gray" },
                  { label: "Tried but stopped", value: "22.5%", className: "canada-demo-retention--red" },
                  { label: "Fully committed", value: "3%", className: "canada-demo-retention--green" },
                  { label: "May try in future", value: "9.8%", className: "canada-demo-retention--blue" },
                ].map((stat) => (
                  <div key={stat.label} className={`canada-demo-retention-cell ${stat.className}`}>
                    <p className="canada-demo-retention-value">{stat.value}</p>
                    <p className="canada-demo-retention-label">{stat.label}</p>
                  </div>
                ))}
              </div>
              <p className="canada-demo-source">Source: Dalhousie University Agri-Food Analytics Lab & Caddle Survey</p>
            </div>
          </div>
        )}

        {activeTab === "recipes" && (
          <div className="canada-demo-section canada-demo-section--stack">
            <div className="canada-demo-recipe-toggle">
              <button
                type="button"
                onClick={() => setRecipeType("meal-kits")}
                className={`canada-demo-toggle-btn ${recipeType === "meal-kits" ? "canada-demo-toggle-btn--active" : ""}`}
              >
                🍽️ Meal Kits (Cook-at-Home)
              </button>
              <button
                type="button"
                onClick={() => setRecipeType("rte")}
                className={`canada-demo-toggle-btn canada-demo-toggle-btn--purple ${recipeType === "rte" ? "canada-demo-toggle-btn--active" : ""}`}
              >
                ⚡ Ready-to-Eat (Heat & Serve)
              </button>
            </div>

            {recipeType === "meal-kits" && (
              <>
                <div className="canada-demo-banner canada-demo-banner--indigo">
                  <h2 className="canada-demo-banner-title">🍽️ Meal Kit Recipe Curation Strategy</h2>
                  <p className="canada-demo-banner-text">
                    Based on persona volume, demand signals, trending cuisines, and competitor top-rated data. Prioritize by the estimated % of your subscriber base each persona represents.
                  </p>
                </div>

                <div className="canada-demo-grid canada-demo-grid--4">
                  {recipePersonas.map((p) => (
                    <div key={p.id} className="canada-demo-card canada-demo-card--persona">
                      <div className="canada-demo-persona-emoji">{p.emoji}</div>
                      <p className="canada-demo-persona-name">{p.name}</p>
                      <p className="canada-demo-persona-meta">
                        {p.age} · {p.size}
                      </p>
                      <span className="canada-demo-persona-badge" style={{ backgroundColor: p.bg, color: p.color }}>
                        ~{p.volume}% of subscribers
                      </span>
                      <p className="canada-demo-persona-time">{p.cookTime} cook time</p>
                    </div>
                  ))}
                </div>

                <div className="canada-demo-card canada-demo-card--no-pad-bottom">
                  <div className="canada-demo-card-head">
                    <h3 className="canada-demo-card-title">Top Recipes to Curate by Persona</h3>
                    <p className="canada-demo-card-desc">
                      Ranked by demand score (1–100) derived from competitor ratings, search volume & trend data
                    </p>
                  </div>
                  {recipePersonas.map((persona) => (
                    <div key={persona.id} className="canada-demo-persona-block">
                      <div className="canada-demo-persona-block-header" style={{ backgroundColor: persona.bg }}>
                        <span className="canada-demo-persona-block-emoji">{persona.emoji}</span>
                        <div className="canada-demo-persona-block-info">
                          <span className="canada-demo-persona-block-name" style={{ color: persona.color }}>
                            {persona.name}
                          </span>
                          <span className="canada-demo-persona-block-priority">· Priority: {persona.priority}</span>
                        </div>
                        <div className="canada-demo-persona-tags">
                          {persona.tags.map((t) => (
                            <span
                              key={t}
                              className="canada-demo-tag"
                              style={{ color: persona.color, borderColor: persona.color + "44" }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="canada-demo-table-scroll">
                        <table className="canada-demo-table">
                          <thead>
                            <tr>
                              <th>Recipe</th>
                              <th>Cuisine</th>
                              <th>Cook Time</th>
                              <th>Demand Score</th>
                              <th>Tag</th>
                            </tr>
                          </thead>
                          <tbody>
                            {persona.topRecipes.map((r, i) => (
                              <tr key={r.name}>
                                <td>
                                  <span className="canada-demo-table-num">{i + 1}</span>
                                  {r.name}
                                </td>
                                <td>{r.cuisine}</td>
                                <td>{r.time} min</td>
                                <td>
                                  <div className="canada-demo-demand-cell">
                                    <div className="canada-demo-demand-bar">
                                      <div
                                        className="canada-demo-demand-fill"
                                        style={{ width: `${r.demand}%`, backgroundColor: persona.color }}
                                      />
                                    </div>
                                    <span className="canada-demo-demand-value" style={{ color: persona.color }}>
                                      {r.demand}
                                    </span>
                                  </div>
                                </td>
                                <td>
                                  <span className="canada-demo-tag canada-demo-tag--gray">{r.tag}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="canada-demo-grid canada-demo-grid--2">
                  <div className="canada-demo-card">
                    <h3 className="canada-demo-card-title">Cuisine Category Demand Score</h3>
                    <p className="canada-demo-card-desc">Cross-persona demand, out of 100</p>
                    <ResponsiveContainer width="100%" height={260}>
                      <BarChart data={cuisineVolumeData} layout="vertical" margin={{ left: 10, right: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                        <YAxis type="category" dataKey="cuisine" tick={{ fontSize: 11 }} width={145} />
                        <Tooltip
                          formatter={(val, _name, props) => [
                            `Score: ${val}`,
                            (props?.payload as { personas?: string })?.personas,
                          ]}
                        />
                        <Bar dataKey="demand" radius={[0, 5, 5, 0]} name="Demand Score" isAnimationActive={false}>
                          {cuisineVolumeData.map((_, i) => (
                            <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="canada-demo-card">
                    <h3 className="canada-demo-card-title">Preferred Cook Time Distribution</h3>
                    <p className="canada-demo-card-desc">% of subscribers who prefer each cook time window</p>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={cookTimeVolumeData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                        <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
                        <Tooltip formatter={(val) => `${val}%`} />
                        <Bar dataKey="pct" radius={[6, 6, 0, 0]} name="% Subscribers" isAnimationActive={false}>
                          {cookTimeVolumeData.map((_, i) => (
                            <Cell key={i} fill={PALETTE[i]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                    <p className="canada-demo-source">65% want meals done in 20 min or less — build your core catalogue here</p>
                  </div>
                </div>

                <div className="canada-demo-card">
                  <h3 className="canada-demo-card-title">📈 Fastest-Growing Recipe Tags (YoY Search & Order Growth)</h3>
                  <div className="canada-demo-tags-grid">
                    {trendingTagsData.map((t) => (
                      <div key={t.tag} className="canada-demo-tag-cell">
                        <span className="canada-demo-tag-label">{t.tag}</span>
                        <span className="canada-demo-tag-growth" style={{ color: t.color }}>
                          {t.growth}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="canada-demo-card">
                  <h3 className="canada-demo-card-title">🗺️ Strategic Curation Guide</h3>
                  <div className="canada-demo-grid canada-demo-grid--3">
                    {[
                      {
                        tier: "Tier 1 — Must-Have (60% of menu)",
                        icon: "🔴",
                        color: "canada-demo-tier--red",
                        items: [
                          "3–4 chicken dishes (universal protein leader)",
                          "2 pasta / Italian staples",
                          "1–2 Mexican / taco / burrito bowl",
                          "1 comfort protein (beef burger, meatballs)",
                          "1 fast Asian (Korean or Japanese bowl)",
                          "All ≤ 25 min cook time",
                        ],
                      },
                      {
                        tier: "Tier 2 — Growth (30% of menu)",
                        icon: "🟡",
                        color: "canada-demo-tier--yellow",
                        items: [
                          "2 high-protein / macro-friendly builds",
                          "1–2 Vietnamese / SE Asian",
                          "1 Mediterranean sheet pan",
                          "1 Indian / S. Asian (tikka, curry)",
                          "1–2 vegetarian with protein anchor",
                          "Cook time 20–30 min",
                        ],
                      },
                      {
                        tier: "Tier 3 — Delight (10% of menu)",
                        icon: "🟢",
                        color: "canada-demo-tier--green",
                        items: [
                          "1 premium / special occasion (steak, salmon)",
                          "1 Moroccan / N. African adventure",
                          "1 seasonal Build-Your-Own format",
                          "1 kids/family interactive meal",
                          "Rotate every 4–6 weeks to test retention",
                          "Cook time 30–40 min OK for premium",
                        ],
                      },
                    ].map((tier) => (
                      <div key={tier.tier} className={`canada-demo-tier-block ${tier.color}`}>
                        <h4 className="canada-demo-tier-title">
                          {tier.icon} {tier.tier}
                        </h4>
                        <ul className="canada-demo-context-list">
                          {tier.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="canada-demo-note canada-demo-note--indigo">
                  <strong>📌 Key insight:</strong> HelloFresh's top 3 rated Canadian recipes in 2024 were all from <em>non-standard formats</em> — a kids' interactive pizza, a fast Vietnamese sandwich, and a build-your-own bar. Format innovation (BYO, sheet pan, build-your-plate) drives outsized satisfaction scores even on familiar cuisines.
                </div>
              </>
            )}

            {recipeType === "rte" && (
              <>
                <div className="canada-demo-banner canada-demo-banner--purple">
                  <h2 className="canada-demo-banner-title">⚡ Ready-to-Eat (RTE) Meal Curation Strategy</h2>
                  <p className="canada-demo-banner-text">
                    For Factor-style services: Heat & eat in &lt;3 min, fresh (never frozen), macro-focused. Based on Factor Canada/US top performers & RTE market trends.
                  </p>
                </div>

                <div className="canada-demo-grid canada-demo-grid--4">
                  {rtePersonas.map((p) => (
                    <div key={p.id} className="canada-demo-card canada-demo-card--persona">
                      <div className="canada-demo-persona-emoji">{p.emoji}</div>
                      <p className="canada-demo-persona-name">{p.name}</p>
                      <p className="canada-demo-persona-meta">{p.age}</p>
                      <span className="canada-demo-persona-badge" style={{ backgroundColor: p.bg, color: p.color }}>
                        ~{p.volume}% of RTE subscribers
                      </span>
                      <p className="canada-demo-persona-time">{p.priority}</p>
                    </div>
                  ))}
                </div>

                <div className="canada-demo-card canada-demo-card--no-pad-bottom">
                  <div className="canada-demo-card-head">
                    <h3 className="canada-demo-card-title">Top RTE Meals to Curate by Persona</h3>
                    <p className="canada-demo-card-desc">Ranked by demand score · Macros shown for reference</p>
                  </div>
                  {rtePersonas.map((persona) => (
                    <div key={persona.id} className="canada-demo-persona-block">
                      <div className="canada-demo-persona-block-header" style={{ backgroundColor: persona.bg }}>
                        <span className="canada-demo-persona-block-emoji">{persona.emoji}</span>
                        <div className="canada-demo-persona-block-info">
                          <span className="canada-demo-persona-block-name" style={{ color: persona.color }}>
                            {persona.name}
                          </span>
                          <span className="canada-demo-persona-block-priority">· {persona.priority}</span>
                        </div>
                        <div className="canada-demo-persona-tags">
                          {persona.tags.map((t) => (
                            <span
                              key={t}
                              className="canada-demo-tag"
                              style={{ color: persona.color, borderColor: persona.color + "44" }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="canada-demo-table-scroll">
                        <table className="canada-demo-table">
                          <thead>
                            <tr>
                              <th>Meal</th>
                              <th>Protein</th>
                              <th>Net Carbs</th>
                              <th>Demand</th>
                              <th>Tag</th>
                            </tr>
                          </thead>
                          <tbody>
                            {persona.topMeals.map((m, i) => (
                              <tr key={m.name}>
                                <td>
                                  <span className="canada-demo-table-num">{i + 1}</span>
                                  {m.name}
                                </td>
                                <td>{m.protein}</td>
                                <td>{m.carbs}</td>
                                <td>
                                  <div className="canada-demo-demand-cell">
                                    <div className="canada-demo-demand-bar">
                                      <div
                                        className="canada-demo-demand-fill"
                                        style={{ width: `${m.demand}%`, backgroundColor: persona.color }}
                                      />
                                    </div>
                                    <span className="canada-demo-demand-value" style={{ color: persona.color }}>
                                      {m.demand}
                                    </span>
                                  </div>
                                </td>
                                <td>
                                  <span className="canada-demo-tag canada-demo-tag--gray">{m.tag}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="canada-demo-grid canada-demo-grid--2">
                  <div className="canada-demo-card">
                    <h3 className="canada-demo-card-title">Protein Distribution (RTE Category)</h3>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={rteProteinVolumeData} layout="vertical" margin={{ left: 10, right: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" domain={[0, 50]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
                        <YAxis type="category" dataKey="protein" tick={{ fontSize: 11 }} width={120} />
                        <Tooltip formatter={(val) => `${val}%`} />
                        <Bar dataKey="share" radius={[0, 5, 5, 0]} name="% Share" isAnimationActive={false}>
                          {rteProteinVolumeData.map((_, i) => (
                            <Cell key={i} fill={PALETTE[i]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                    <p className="canada-demo-source">Chicken dominates RTE at 42% — universal, high-protein, versatile</p>
                  </div>

                  <div className="canada-demo-card">
                    <h3 className="canada-demo-card-title">Cuisine Style Preference (RTE)</h3>
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={rteCuisineStyleData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="style" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={70} />
                        <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
                        <Tooltip formatter={(val) => `${val}%`} />
                        <Bar dataKey="pct" radius={[6, 6, 0, 0]} name="% Preference" isAnimationActive={false}>
                          {rteCuisineStyleData.map((_, i) => (
                            <Cell key={i} fill={PALETTE[i]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                    <p className="canada-demo-source">American comfort + Asian fusion account for 50% of RTE demand</p>
                  </div>
                </div>

                <div className="canada-demo-card">
                  <h3 className="canada-demo-card-title">📈 Fastest-Growing RTE Features (YoY)</h3>
                  <div className="canada-demo-tags-grid">
                    {rteTrendingFeaturesData.map((t) => (
                      <div key={t.feature} className="canada-demo-tag-cell">
                        <span className="canada-demo-tag-label">{t.feature}</span>
                        <span className="canada-demo-tag-growth" style={{ color: t.color }}>
                          {t.growth}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="canada-demo-card">
                  <h3 className="canada-demo-card-title">🗺️ RTE Curation Framework</h3>
                  <div className="canada-demo-grid canada-demo-grid--3">
                    {[
                      {
                        tier: "Core Menu (60%)",
                        icon: "🔵",
                        color: "canada-demo-tier--blue",
                        items: [
                          "5–6 chicken meals (grilled, baked, sauced)",
                          "2–3 keto-friendly (<15g net carbs)",
                          "2 beef options (ground beef bowls, steak)",
                          "2 high-protein (30g+) builds",
                          "1–2 seafood (salmon, shrimp)",
                          "All with clear macros displayed",
                        ],
                      },
                      {
                        tier: "Variety & Health (30%)",
                        icon: "🟢",
                        color: "canada-demo-tier--green",
                        items: [
                          "3–4 calorie-smart (≤550 cal)",
                          "2 plant-based / vegan options",
                          "1–2 global/fusion (Indian, Korean, Med)",
                          "1 pork or turkey option",
                          "Focus on bowl format for portability",
                          "Clean label emphasized",
                        ],
                      },
                      {
                        tier: "Premium & Seasonal (10%)",
                        icon: "🟣",
                        color: "canada-demo-tier--purple",
                        items: [
                          "1 gourmet/premium protein (ribeye, scallops)",
                          "1 seasonal special",
                          "1 test/innovation meal",
                          "Higher price point (+$2–3/meal)",
                          "Rotate every 2–3 weeks",
                          "Drive brand perception & retention",
                        ],
                      },
                    ].map((tier) => (
                      <div key={tier.tier} className={`canada-demo-tier-block ${tier.color}`}>
                        <h4 className="canada-demo-tier-title">
                          {tier.icon} {tier.tier}
                        </h4>
                        <ul className="canada-demo-context-list">
                          {tier.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="canada-demo-note canada-demo-note--purple">
                  <strong>📌 RTE vs. Meal Kit distinction:</strong> RTE customers prioritize protein (30g+ is the #1 filter), convenience (truly &lt;3 min), and macro transparency over cooking experience. Chicken is 42% of protein demand (vs. ~30% in meal kits). Keto/high-protein tags drive 2x the conversion of "global cuisine" tags. Bowl format beats plated meals 3:1 for portability.
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <footer className="canada-demo-footer">
        Sources: Dalhousie University / Caddle Survey · SimilarWeb · Canadian Grocer · Retail Insider · Company Filings (Goodfood TSX:FOOD) · Statista · Grand View Research · Made in CA
      </footer>
    </div>
  );
}
