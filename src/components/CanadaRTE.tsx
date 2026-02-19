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
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";

// ─── PALETTE ────────────────────────────────────────────────────────────────
const P = ["#6366f1", "#e07b39", "#3db87a", "#e04c7b", "#f59e0b", "#7c5cbf", "#06b6d4", "#64748b"];

// ─── MARKET DATA ────────────────────────────────────────────────────────────
const marketGrowth = [
  { year: "2021", actual: 0.31 },
  { year: "2022", actual: 0.44 },
  { year: "2023", actual: 0.58 },
  { year: "2024", actual: 0.72 },
  { year: "2025", forecast: 0.92 },
  { year: "2026", forecast: 1.14 },
  { year: "2027", forecast: 1.41 },
  { year: "2028", forecast: 1.72 },
  { year: "2029", forecast: 2.07 },
];

const segmentShare = [
  { name: "High-Protein / Fitness", value: 31, color: "#6366f1" },
  { name: "Keto / Low-Carb", value: 22, color: "#e07b39" },
  { name: "Calorie Smart / Weight Loss", value: 19, color: "#3db87a" },
  { name: "Vegetarian / Vegan", value: 14, color: "#e04c7b" },
  { name: "General / Comfort", value: 14, color: "#94a3b8" },
];

const brandComparison = [
  { brand: "Factor", priceMin: 12, priceMax: 15, reach: 95, dietOptions: 6, weeklyMenu: 40 },
  { brand: "Goodfood RTE", priceMin: 13, priceMax: 16, reach: 85, dietOptions: 5, weeklyMenu: 18 },
  { brand: "LiveFitFood", priceMin: 9, priceMax: 13, reach: 75, dietOptions: 7, weeklyMenu: 30 },
  { brand: "Power Kitchen", priceMin: 11, priceMax: 14, reach: 40, dietOptions: 5, weeklyMenu: 20 },
  { brand: "Athlete's Kitchen", priceMin: 12, priceMax: 16, reach: 60, dietOptions: 4, weeklyMenu: 25 },
  { brand: "FED", priceMin: 12, priceMax: 15, reach: 35, dietOptions: 6, weeklyMenu: 22 },
];

// ─── PERSONAS ───────────────────────────────────────────────────────────────
interface RtePersona {
  id: string;
  name: string;
  emoji: string;
  color: string;
  bg: string;
  age: string;
  gender: string;
  income: string;
  household: string;
  volume: number;
  drivers: string[];
  avoids: string[];
  planPref: string;
  topDiets: string[];
}

const rtePersonas: RtePersona[] = [
  {
    id: "time-strapped-pro",
    name: "Time-Strapped Professional",
    emoji: "⚡",
    color: "#6366f1",
    bg: "#eef2ff",
    age: "28–42",
    gender: "Balanced; slight female skew",
    income: "$75K–$110K",
    household: "Singles & DINKs (dual income, no kids)",
    volume: 35,
    drivers: ["Zero cooking time", "Portion control", "Macro transparency"],
    avoids: ["Complicated packaging", "Frozen food texture", "Repetitive menu"],
    planPref: "6–10 meals/week",
    topDiets: ["Balanced / Chef's Choice", "High-Protein", "Calorie Smart"],
  },
  {
    id: "fitness-athlete",
    name: "Fitness & Athlete",
    emoji: "💪",
    color: "#e07b39",
    bg: "#fff7ed",
    age: "22–40",
    gender: "Male-skewed (~60/40)",
    income: "$55K–$90K",
    household: "Singles, gym-goers, active couples",
    volume: 27,
    drivers: ["30g+ protein per meal", "Macro tracking", "Post-workout recovery"],
    avoids: ["Hidden carbs/sugars", "Small portions", "Vague nutrition labels"],
    planPref: "8–14 meals/week",
    topDiets: ["Protein Plus (30g+)", "Keto", "Clean Bulk"],
  },
  {
    id: "health-optimizer",
    name: "Health Optimizer",
    emoji: "🌿",
    color: "#3db87a",
    bg: "#f0fdf4",
    age: "30–52",
    gender: "Slightly female-skewed",
    income: "$65K–$100K",
    household: "Couples, remote workers, wellness-conscious",
    volume: 22,
    drivers: ["Dietitian-approved", "Clean labels", "Weight management"],
    avoids: ["Additives / preservatives", "Ultra-processed proteins", "Inconsistent portions"],
    planPref: "5–8 meals/week",
    topDiets: ["Calorie Smart (≤550 cal)", "Vegetarian", "Mediterranean-style"],
  },
  {
    id: "convenience-seeker",
    name: "Convenience Seeker",
    emoji: "🏠",
    color: "#e04c7b",
    bg: "#fdf2f8",
    age: "35–55",
    gender: "Female-skewed (~58/42)",
    income: "$50K–$80K",
    household: "Families, new parents, caregivers",
    volume: 16,
    drivers: ["No cooking stress", "Family-size options", "Comfort flavours"],
    avoids: ["Exotic ingredients kids won't eat", "Premium price without value", "Too spicy / adventurous"],
    planPref: "4–6 meals/week",
    topDiets: ["General / Comfort", "Family-size builds", "Low-effort classics"],
  },
];

// ─── RECIPE DATA ─────────────────────────────────────────────────────────────
interface RteRecipe {
  name: string;
  diet: string;
  protein: number;
  cal: number;
  heat: number;
  demand: number;
  tag: string;
}

const rteRecipes: Record<string, RteRecipe[]> = {
  "time-strapped-pro": [
    { name: "Lemon Herb Chicken & Ancient Grain Bowl", diet: "Chef's Choice", protein: 42, cal: 520, heat: 3, demand: 94, tag: "Top Pick" },
    { name: "Thai Basil Beef & Jasmine Rice", diet: "Chef's Choice", protein: 38, cal: 580, heat: 3, demand: 91, tag: "High Volume" },
    { name: "Cajun Shrimp & Cauliflower Grits", diet: "Calorie Smart", protein: 36, cal: 440, heat: 3, demand: 88, tag: "Trending" },
    { name: "Miso-Glazed Salmon with Edamame Rice", diet: "Chef's Choice", protein: 40, cal: 510, heat: 4, demand: 86, tag: "Premium" },
    { name: "Roasted Veggie & Feta Quinoa Bowl", diet: "Vegetarian", protein: 28, cal: 480, heat: 3, demand: 81, tag: "Clean" },
  ],
  "fitness-athlete": [
    { name: "Grilled Chicken Thighs & Sweet Potato Mash", diet: "Protein Plus", protein: 52, cal: 620, heat: 3, demand: 97, tag: "Top Pick" },
    { name: "Grass-Fed Beef Stir-Fry & Brown Rice", diet: "Protein Plus", protein: 48, cal: 680, heat: 4, demand: 94, tag: "High Volume" },
    { name: "Turkey Meatballs & Zucchini Noodles", diet: "Keto", protein: 44, cal: 390, heat: 3, demand: 91, tag: "Keto" },
    { name: "Baked Salmon & Asparagus with Quinoa", diet: "Protein Plus", protein: 46, cal: 560, heat: 4, demand: 89, tag: "Clean" },
    { name: "Chipotle Chicken Power Bowl", diet: "Protein Plus", protein: 50, cal: 640, heat: 3, demand: 87, tag: "Trending" },
  ],
  "health-optimizer": [
    { name: "Turmeric Chicken & Roasted Veg (550 cal)", diet: "Calorie Smart", protein: 36, cal: 540, heat: 3, demand: 92, tag: "Top Pick" },
    { name: "Mediterranean Baked Cod & Lentils", diet: "Calorie Smart", protein: 34, cal: 490, heat: 4, demand: 89, tag: "Clean" },
    { name: "Spinach & Chickpea Masala", diet: "Vegetarian", protein: 22, cal: 460, heat: 3, demand: 85, tag: "Plant-Based" },
    { name: "Chicken Tikka with Cauliflower Rice", diet: "Keto", protein: 38, cal: 420, heat: 3, demand: 83, tag: "Low-Carb" },
    { name: "Smoked Salmon & Dill Frittata", diet: "Calorie Smart", protein: 32, cal: 380, heat: 4, demand: 80, tag: "Premium" },
  ],
  "convenience-seeker": [
    { name: "Beef Shepherd's Pie (Single Serve)", diet: "Comfort", protein: 30, cal: 620, heat: 5, demand: 93, tag: "Top Pick" },
    { name: "Butter Chicken with Basmati Rice", diet: "Comfort", protein: 34, cal: 650, heat: 3, demand: 90, tag: "High Volume" },
    { name: "Mac & Cheese with Pulled Pork", diet: "Comfort", protein: 28, cal: 710, heat: 4, demand: 87, tag: "Comfort" },
    { name: "Chicken Pot Pie Filling & Biscuit Top", diet: "Comfort", protein: 32, cal: 680, heat: 5, demand: 84, tag: "Family Fav" },
    { name: "Teriyaki Salmon & Steamed Broccoli", diet: "Balanced", protein: 38, cal: 520, heat: 3, demand: 79, tag: "Healthy-ish" },
  ],
};

const cuisineDemand = [
  { name: "North American Comfort", score: 88 },
  { name: "Asian (Thai/Japanese/Korean)", score: 85 },
  { name: "Mediterranean / Middle Eastern", score: 82 },
  { name: "Mexican / Latin", score: 79 },
  { name: "Indian / S. Asian", score: 76 },
  { name: "Italian / Pasta", score: 74 },
  { name: "Moroccan / N. African", score: 62 },
];

const dietTrendGrowth = [
  { tag: "Protein Plus (30g+)", growth: "+41%" },
  { tag: "GLP-1 Compatible Meals", growth: "+38%" },
  { tag: "Keto / Low-Carb (<15g net)", growth: "+29%" },
  { tag: "Calorie Smart (≤550 cal)", growth: "+24%" },
  { tag: "Gut Health / Whole Foods", growth: "+21%" },
  { tag: "Vegan High-Protein", growth: "+18%" },
];

const radarData = [
  { metric: "Protein Content", "time-strapped-pro": 70, "fitness-athlete": 100, "health-optimizer": 75, "convenience-seeker": 50 },
  { metric: "Flavour Boldness", "time-strapped-pro": 75, "fitness-athlete": 70, "health-optimizer": 60, "convenience-seeker": 85 },
  { metric: "Portion Size", "time-strapped-pro": 65, "fitness-athlete": 95, "health-optimizer": 55, "convenience-seeker": 80 },
  { metric: "Macro Precision", "time-strapped-pro": 80, "fitness-athlete": 100, "health-optimizer": 90, "convenience-seeker": 40 },
  { metric: "Comfort Factor", "time-strapped-pro": 55, "fitness-athlete": 40, "health-optimizer": 50, "convenience-seeker": 95 },
  { metric: "Price Sensitivity", "time-strapped-pro": 50, "fitness-athlete": 60, "health-optimizer": 65, "convenience-seeker": 80 },
];

// ─── TOOLTIP ─────────────────────────────────────────────────────────────────
interface TipPayload { name?: string; value?: number | string; color?: string; fill?: string }
function Tip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TipPayload[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg text-sm">
      <p className="font-semibold text-gray-800 mb-1">{label}</p>
      {payload.map((e, i) => e.value != null && (
        <p key={i} style={{ color: e.color ?? e.fill }}>
          {e.name}: {typeof e.value === "number" && e.value < 10 ? `$${e.value}B` : String(e.value)}
        </p>
      ))}
    </div>
  );
}

// ─── HEAT INDICATOR ──────────────────────────────────────────────────────────
function HeatDots({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={`w-2.5 h-2.5 rounded-full ${i <= n ? "bg-orange-400" : "bg-gray-200"}`} />
      ))}
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function CanadaRTE() {
  const [tab, setTab] = useState("overview");
  const [activePersona, setActivePersona] = useState("time-strapped-pro");

  const tabs = [
    { id: "overview", label: "📊 Market Overview" },
    { id: "demographics", label: "👥 Demographics" },
    { id: "brands", label: "🏷️ Brand Landscape" },
    { id: "recipes", label: "🍽️ Recipe Curation" },
  ];

  const persona = rtePersonas.find((p) => p.id === activePersona);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ready-to-Eat Meal Delivery — Canada</h1>
            <p className="text-gray-500 text-sm mt-1">Demographics, TAM, Brand Landscape & Recipe Curation · 2024–2025</p>
          </div>
          <span className="text-xs bg-indigo-100 text-indigo-700 font-semibold px-3 py-1 rounded-full mt-1">Heat & Eat Focus</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`min-h-[44px] min-w-[44px] px-5 py-3 rounded-lg text-sm font-semibold border-2 transition-all cursor-pointer select-none ${
                tab === t.id
                  ? "border-indigo-500 bg-indigo-500 text-white shadow-md hover:bg-indigo-600 hover:border-indigo-600"
                  : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto space-y-6">
        {/* ── OVERVIEW ── */}
        {tab === "overview" && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Canada RTE Delivery (2024)", value: "US$0.72B", sub: "9.2% CAGR — fastest-growing food delivery segment" },
                { label: "Forecast by 2029", value: "US$2.07B", sub: "~3× growth in 5 years" },
                { label: "Global RTE Market (2025)", value: "US$12.2B", sub: "North America = 40.4% share" },
                { label: "RTE vs. Meal Kit Growth", value: "+9.2%", sub: "vs. 6.1% for cook-and-eat kits (CAGR)" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium leading-tight">{s.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{s.sub}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Growth chart */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h2 className="text-base font-semibold text-gray-800 mb-1">Canada RTE Market — Actual & Forecast</h2>
                <p className="text-xs text-gray-400 mb-4">Revenue in USD billions · Dashed = forecast</p>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={marketGrowth} margin={{ right: 20 }}>
                    <defs>
                      <linearGradient id="aG" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="fG" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                    <YAxis tickFormatter={(v: number) => `$${v}B`} tick={{ fontSize: 11 }} domain={[0, 2.5]} />
                    <Tooltip content={<Tip />} />
                    <Area type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={2.5} fill="url(#aG)" name="Actual" dot={{ r: 4, fill: "#6366f1" }} connectNulls={false} isAnimationActive={false} />
                    <Area type="monotone" dataKey="forecast" stroke="#a78bfa" strokeWidth={2} strokeDasharray="5 3" fill="url(#fG)" name="Forecast" dot={{ r: 4, fill: "#a78bfa" }} connectNulls={false} isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
                <p className="text-xs text-gray-400 text-center mt-1">Sources: Grand View Research, Coherent Market Insights, Statista</p>
              </div>

              {/* Segment share */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h2 className="text-base font-semibold text-gray-800 mb-1">Revenue by Diet Segment (Canada RTE)</h2>
                <p className="text-xs text-gray-400 mb-3">Share of RTE subscription orders by plan type</p>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={segmentShare} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} dataKey="value">
                      {segmentShare.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number | undefined) => v != null ? `${v}%` : ""} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 justify-center">
                  {segmentShare.map((s) => (
                    <span key={s.name} className="text-xs flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: s.color }} />
                      {s.name}: {s.value}%
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Why RTE is winning */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">Why RTE is Outpacing Meal Kits</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: "⏱️", stat: "~2 min", label: "Avg. heat time", detail: "vs. 25–35 min for meal kits" },
                  { icon: "🧠", stat: "0", label: "Decisions at dinner", detail: "No recipe, no prep, no cleanup" },
                  { icon: "📦", stat: "6–10 days", label: "Fridge shelf life", detail: "Fresh, never frozen (Factor model)" },
                  { icon: "📈", stat: "9.2%", label: "CAGR 2025–2033", detail: "Fastest sub-segment globally" },
                ].map((s) => (
                  <div key={s.label} className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-center">
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <p className="text-xl font-bold text-gray-900">{s.stat}</p>
                    <p className="text-xs font-semibold text-gray-600 mt-0.5">{s.label}</p>
                    <p className="text-xs text-gray-400 mt-1">{s.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm text-indigo-800">
              <strong>📌 Structural tailwind:</strong> The RTE segment is growing faster than cook-and-eat kits because it maps perfectly to three mega-trends simultaneously — urban densification, dual-income households, and the explosion of fitness/macro tracking culture. Factor Canada self-reports as Canada&apos;s #1 ready-to-eat service and is backed by HelloFresh&apos;s distribution scale.
            </div>
          </>
        )}

        {/* ── DEMOGRAPHICS ── */}
        {tab === "demographics" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { icon: "🎂", label: "Core Age", value: "28–45", detail: "Skews slightly older than meal kit buyers. Peak adoption 30–40." },
                { icon: "💰", label: "Income", value: "$75K–$110K", detail: "Higher than meal kit avg. Premium price point ($12–$16/meal) filters for upper-income." },
                { icon: "🏙️", label: "Location", value: "Dense Urban", detail: "ON, BC, QC lead. GTA, Vancouver, Montreal are core. Factor ships to 95% of Canada." },
                { icon: "⚧", label: "Gender Split", value: "52% F / 48% M", detail: "More balanced than most food delivery. Fitness segment skews male; wellness/convenience segments skew female." },
              ].map((c) => (
                <div key={c.label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <div className="text-2xl mb-1">{c.icon}</div>
                  <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">{c.label}</p>
                  <p className="text-lg font-bold text-gray-900 mt-0.5">{c.value}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{c.detail}</p>
                </div>
              ))}
            </div>

            {/* Persona cards */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">RTE Customer Personas — Size & Profile</h3>
              <div className="space-y-4">
                {rtePersonas.map((p) => (
                  <div key={p.id} className="rounded-lg border overflow-hidden" style={{ borderColor: p.color + "33" }}>
                    <div className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor: p.bg }}>
                      <span className="text-2xl">{p.emoji}</span>
                      <div className="flex-1">
                        <span className="font-semibold text-sm" style={{ color: p.color }}>{p.name}</span>
                        <span className="text-xs text-gray-500 ml-2">· {p.age} · {p.income} · {p.gender}</span>
                      </div>
                      <span className="text-sm font-bold rounded-full px-3 py-1" style={{ backgroundColor: p.color + "22", color: p.color }}>~{p.volume}%</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white text-xs">
                      <div>
                        <p className="text-gray-400 font-semibold uppercase mb-1">Household</p>
                        <p className="text-gray-700">{p.household}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 font-semibold uppercase mb-1">Orders / Week</p>
                        <p className="text-gray-700">{p.planPref}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 font-semibold uppercase mb-1">Top Diet Plans</p>
                        <p className="text-gray-700">{p.topDiets.join(", ")}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 font-semibold uppercase mb-1">Key Drivers</p>
                        <p className="text-gray-700">{p.drivers.slice(0, 2).join(" · ")}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Radar chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-1">Persona Preference Radar</h3>
              <p className="text-xs text-gray-400 mb-4">What each persona values most in an RTE meal</p>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
                  {rtePersonas.map((p) => (
                    <Radar key={p.id} name={p.name} dataKey={p.id} stroke={p.color} fill={p.color} fillOpacity={0.1} strokeWidth={2} />
                  ))}
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-4 justify-center mt-2">
                {rtePersonas.map((p) => (
                  <span key={p.id} className="text-xs flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full" style={{ background: p.color }} />
                    {p.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Diet trend growth */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">📈 Fastest-Growing Diet Plan Tags in RTE (YoY)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {dietTrendGrowth.map((t, i) => (
                  <div key={t.tag} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
                    <span className="text-sm font-medium text-gray-700">{t.tag}</span>
                    <span className="text-sm font-bold ml-2 shrink-0" style={{ color: P[i] }}>{t.growth}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">Note: GLP-1 compatible meals (for Ozempic/Wegovy users) is the single fastest-emerging new diet category in 2024–25</p>
            </div>
          </>
        )}

        {/* ── BRANDS ── */}
        {tab === "brands" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Factor Canada", emoji: "🔵", color: "#6366f1", pos: "Canada's #1 RTE delivery · HelloFresh-owned · Mississauga kitchen", price: "$12–$15/meal", reach: "95% of Canada", diet: "6 plan types · 40+ weekly meals", note: "Fresh never frozen. Dietitian-approved. Protein Plus hero." },
                { name: "Goodfood Heat & Eat", emoji: "🟢", color: "#3db87a", pos: "Hybrid kit + RTE. Added in 2023 to stem kit churn.", price: "$13–$16/meal", reach: "85% of Canada", diet: "5 plan types · ~18 RTE options/week", note: "RTE added to retain subscribers leaving the kit plan. Premium positioning." },
                { name: "LiveFitFood", emoji: "🟡", color: "#f59e0b", pos: "Canada-wide. Most affordable RTE. All goals covered.", price: "$9–$13/meal", reach: "75% of Canada", diet: "7 goal types · 30+ meals/week", note: "Best value per meal in the RTE segment. 2.5M+ meals delivered." },
                { name: "Power Kitchen", emoji: "🟠", color: "#e07b39", pos: "Toronto's #1 voted meal prep. Fitness-community brand.", price: "$11–$14/meal", reach: "GTA + select ON", diet: "5 plans incl. GLP-1 meals & clean bulk", note: "First Canadian brand to launch GLP-1 specific meals (2024)." },
                { name: "Athlete's Kitchen", emoji: "🔴", color: "#e04c7b", pos: "Healthiest RTE in Canada. Gluten/dairy/soy-free.", price: "$12–$16/meal", reach: "ON, QC, BC + shipping", diet: "4 plans · strict clean-label", note: "Premium niche. High loyalty. Attracts allergy-conscious athletes." },
                { name: "FED", emoji: "🟣", color: "#7c5cbf", pos: "Dietitian-first. Office delivery speciality.", price: "$12–$15/meal", reach: "ON, BC, AB", diet: "6 streams · full breakfast/lunch/dinner", note: "Only brand offering full-day plans (breakfast + lunch + dinner + snacks)." },
              ].map((b) => (
                <div key={b.name} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{b.emoji}</span>
                    <span className="font-bold text-gray-900">{b.name}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{b.pos}</p>
                  <div className="space-y-1.5 text-xs">
                    {[["💰 Price", b.price], ["🗺️ Reach", b.reach], ["🥗 Plans", b.diet]].map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-gray-400">{k}</span>
                        <span className="text-gray-700 font-medium text-right ml-2 max-w-[60%]">{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 bg-gray-50 rounded p-2 text-xs text-gray-600 border border-gray-100">📌 {b.note}</div>
                </div>
              ))}
            </div>

            {/* Price comparison bar */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">Price per Meal — Brand Comparison (CAD equiv.)</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={brandComparison} layout="vertical" margin={{ left: 20, right: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 20]} tickFormatter={(v: number) => `$${v}`} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="brand" tick={{ fontSize: 11 }} width={120} />
                  <Tooltip formatter={(v: number | undefined, n?: string) => [v != null ? `$${v}` : "", n ?? ""]} />
                  <Bar dataKey="priceMin" name="Min Price" stackId="a" fill="#c7d2fe" radius={[0, 0, 0, 0]} isAnimationActive={false} />
                  <Bar dataKey="priceMax" name="Max Price" stackId="a" fill="#6366f1" radius={[0, 5, 5, 0]} isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-400 text-center mt-2">Stacked = price range (min + max span). LiveFitFood most affordable; Athlete&apos;s Kitchen most premium.</p>
            </div>
          </>
        )}

        {/* ── RECIPES ── */}
        {tab === "recipes" && (
          <>
            <div className="bg-gradient-to-r from-orange-50 to-indigo-50 border border-orange-100 rounded-xl p-5">
              <h2 className="font-bold text-gray-800 mb-1">🍽️ RTE Recipe Curation Strategy</h2>
              <p className="text-sm text-gray-600">Unlike meal kits, RTE menus must win on <strong>first look</strong> — name, protein count, and calorie figure are the three things subscribers read before selecting. Every recipe must communicate its diet-plan benefit in the title.</p>
            </div>

            {/* Persona selector */}
            <div className="flex gap-2 flex-wrap">
              {rtePersonas.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePersona(p.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${activePersona === p.id ? "text-white shadow-sm" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}
                  style={activePersona === p.id ? { backgroundColor: p.color, borderColor: p.color } : {}}
                >
                  {p.emoji} {p.name} <span className="ml-1 opacity-70">({p.volume}%)</span>
                </button>
              ))}
            </div>

            {/* Recipe table for active persona */}
            {persona && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 flex items-center gap-3" style={{ backgroundColor: persona.bg }}>
                  <span className="text-2xl">{persona.emoji}</span>
                  <div>
                    <p className="font-bold" style={{ color: persona.color }}>{persona.name}</p>
                    <p className="text-xs text-gray-500">~{persona.volume}% of RTE subscribers · {persona.planPref} · Prefers: {persona.topDiets.join(", ")}</p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-t border-gray-100">
                        <th className="text-left px-5 py-2.5 text-xs text-gray-400 font-semibold uppercase">#</th>
                        <th className="text-left px-4 py-2.5 text-xs text-gray-400 font-semibold uppercase">Meal Name</th>
                        <th className="text-left px-4 py-2.5 text-xs text-gray-400 font-semibold uppercase">Diet Plan</th>
                        <th className="text-left px-4 py-2.5 text-xs text-gray-400 font-semibold uppercase">Protein</th>
                        <th className="text-left px-4 py-2.5 text-xs text-gray-400 font-semibold uppercase">Calories</th>
                        <th className="text-left px-4 py-2.5 text-xs text-gray-400 font-semibold uppercase">Heat Effort</th>
                        <th className="text-left px-4 py-2.5 text-xs text-gray-400 font-semibold uppercase">Demand</th>
                        <th className="text-left px-4 py-2.5 text-xs text-gray-400 font-semibold uppercase">Tag</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rteRecipes[activePersona].map((r, i) => (
                        <tr key={r.name} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="px-5 py-3 text-gray-400 text-xs">{i + 1}</td>
                          <td className="px-4 py-3 font-medium text-gray-800">{r.name}</td>
                          <td className="px-4 py-3">
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: persona.bg, color: persona.color }}>{r.diet}</span>
                          </td>
                          <td className="px-4 py-3 font-bold text-indigo-700">{r.protein}g</td>
                          <td className="px-4 py-3 text-gray-600">{r.cal} kcal</td>
                          <td className="px-4 py-3"><HeatDots n={r.heat} /></td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-100 rounded-full h-2 overflow-hidden">
                                <div className="h-2 rounded-full" style={{ width: `${r.demand}%`, backgroundColor: persona.color }} />
                              </div>
                              <span className="text-xs font-bold" style={{ color: persona.color }}>{r.demand}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3"><span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{r.tag}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    <strong>Turn-offs for this persona:</strong> {persona.avoids.join(" · ")}
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cuisine demand */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-1">Cuisine Demand Score (RTE Context)</h3>
                <p className="text-xs text-gray-400 mb-4">RTE buyers favour comfort & familiar proteins over adventurous cuisines</p>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={cuisineDemand} layout="vertical" margin={{ left: 10, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={170} />
                    <Tooltip formatter={(v: number | undefined) => [v != null ? `Score: ${v}` : ""]} />
                    <Bar dataKey="score" radius={[0, 5, 5, 0]} name="Demand Score" isAnimationActive={false}>
                      {cuisineDemand.map((_, i) => <Cell key={i} fill={P[i % P.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Strategic tiers */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4">🗺️ RTE Menu Build Strategy</h3>
                <div className="space-y-3">
                  {[
                    { tier: "Tier 1 — Core (55% of menu)", color: "bg-red-50 border-red-100", icon: "🔴", items: ["Chicken in 3+ formats (grilled, roasted, sauced)", "Beef bowl / ground protein", "Salmon or white fish", "All with clear macro labels on meal name"] },
                    { tier: "Tier 2 — Diet Plan (35%)", color: "bg-yellow-50 border-yellow-100", icon: "🟡", items: ["2–3 dedicated Keto meals (≤15g net carbs)", "2 Calorie Smart (≤550 cal)", "1–2 Protein Plus (≥40g protein)", "1 Vegan high-protein (lentil, tofu, tempeh)"] },
                    { tier: "Tier 3 — Delight (10%)", color: "bg-green-50 border-green-100", icon: "🟢", items: ["1 premium protein (steak, duck, seafood)", "1 GLP-1 compatible build", "1 global adventure (Thai, Moroccan)", "Rotate every 3–4 weeks"] },
                  ].map((t) => (
                    <div key={t.tier} className={`rounded-lg p-3 border ${t.color}`}>
                      <p className="font-semibold text-xs text-gray-800 mb-2">{t.icon} {t.tier}</p>
                      <ul className="space-y-1">
                        {t.items.map((item) => (
                          <li key={item} className="text-xs text-gray-600 flex gap-1.5"><span className="text-gray-300 shrink-0">•</span>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-sm text-orange-900">
              <strong>🔑 RTE-specific naming rule:</strong> Unlike meal kits where recipe names can be evocative, RTE meal names must lead with the <em>protein + diet signal</em>. e.g. <strong>&quot;Grilled Chicken Thighs (52g Protein)&quot;</strong> converts 2× better than <strong>&quot;Golden Herb Chicken.&quot;</strong> Factor and Power Kitchen both follow this pattern on their top-performing meals.
            </div>
          </>
        )}
      </div>

      <div className="text-center text-xs text-gray-400 py-6 px-4">
        Sources: Factor Canada · Goodfood · LiveFitFood · Power Kitchen · Athlete&apos;s Kitchen · FED · Grand View Research · Coherent Market Insights · Statista · Mintel Canada Prepared Meals 2024 · Dalhousie University
      </div>
    </div>
  );
}
