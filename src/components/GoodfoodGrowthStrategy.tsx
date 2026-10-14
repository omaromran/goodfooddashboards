import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const COLORS = {
  primary: "#3db87a",
  danger: "#ef4444",
  warning: "#f59e0b",
  success: "#10b981",
  purple: "#8b5cf6",
  blue: "#3b82f6",
  pink: "#ec4899",
};

// CURRENT STATE DATA
const revenueDeclineData = [
  { quarter: "Q1 2024", revenue: 39.8, customers: 117 },
  { quarter: "Q2 2024", revenue: 38.4, customers: 113 },
  { quarter: "Q3 2024", revenue: 38.3, customers: 105 },
  { quarter: "Q4 2024", revenue: 36.2, customers: 101 },
  { quarter: "Q1 2025", revenue: 31.5, customers: 84 },
  { quarter: "Q2 2025", revenue: 30.5, customers: 84 },
  { quarter: "Q3 2025", revenue: 30.7, customers: 76 },
  { quarter: "Q4 2025", revenue: 28.0, customers: 66 },
  { quarter: "Q1 2026", revenue: 28.0, customers: 65 },
];

const profitabilityData = [
  { metric: "Gross Margin", current: 42.3, target: 45, status: "improving" },
  { metric: "Adj. EBITDA Margin", current: 8.6, target: 12, status: "stable" },
  { metric: "CAC Reduction YoY", current: 15, target: 25, status: "improving" },
  { metric: "Basket Size Growth", current: 25, target: 30, status: "strong" },
];

// GROWTH LEVERS
interface GrowthInitiative {
  id: string;
  name: string;
  icon: string;
  color: string;
  currentRevenue: number;
  targetRevenue: number;
  timeline: string;
  confidence: string;
  priority: number;
  description: string;
  kpis: { name: string; value: string; status: string }[];
  actions: string[];
}

const growthInitiatives: GrowthInitiative[] = [
  {
    id: "heat-eat",
    name: "Heat & Eat Expansion",
    icon: "⚡",
    color: "#8b5cf6",
    currentRevenue: 1.0,
    targetRevenue: 15.0,
    timeline: "12-18 months",
    confidence: "High",
    priority: 1,
    description: "Scale ready-to-eat meals from Quebec to rest of Canada",
    kpis: [
      { name: "Current ARR", value: "$1M", status: "✓" },
      { name: "Customer Rating", value: "4.6/5", status: "✓" },
      { name: "Zero Ad Spend", value: "Organic", status: "✓" },
      { name: "Market Expansion", value: "QC only → National", status: "→" },
    ],
    actions: [
      "Expand delivery zones westward (ON, AB, BC)",
      "Build recipe library to 20+ meals",
      "Launch limited marketing campaigns in new markets",
      "Partner with corporate clients for B2B",
    ],
  },
  {
    id: "value-plan",
    name: "Value Plan Optimization",
    icon: "💰",
    color: "#f59e0b",
    currentRevenue: 8.0,
    targetRevenue: 18.0,
    timeline: "6-12 months",
    confidence: "High",
    priority: 2,
    description: "Drive customer acquisition & upsell through entry-level pricing",
    kpis: [
      { name: "Conversion Rate", value: "High", status: "✓" },
      { name: "Upsell to Premium", value: "Strong", status: "✓" },
      { name: "CAC Efficiency", value: "-15% YoY", status: "✓" },
      { name: "Penetration", value: "~25% new customers", status: "→" },
    ],
    actions: [
      "Increase Value Plan visibility in marketing",
      "Create automated upsell flows (first 30 days)",
      "Bundle Value Plan with Heat & Eat trials",
      "Target price-sensitive segments (students, seniors)",
    ],
  },
  {
    id: "genuine-tea",
    name: "M&A Platform (Genuine Tea + Pipeline)",
    icon: "🍵",
    color: "#10b981",
    currentRevenue: 2.2,
    targetRevenue: 12.0,
    timeline: "18-24 months",
    confidence: "Medium",
    priority: 3,
    description: "Roll up next-gen DTC brands to diversify revenue",
    kpis: [
      { name: "Genuine Tea Growth", value: "+30-40% YoY", status: "✓" },
      { name: "Genuine Tea EBITDA", value: "Positive", status: "✓" },
      { name: "Pipeline Size", value: "~$10M targets", status: "→" },
      { name: "Integration Cost", value: "Low", status: "✓" },
    ],
    actions: [
      "Complete 2-3 acquisitions in 2026 ($10M revenue targets)",
      "Cross-sell Genuine Tea through Goodfood platform",
      "Leverage shared logistics & customer base",
      "Focus on margin-accretive brands with positive EBITDA",
    ],
  },
  {
    id: "basket-size",
    name: "Basket Size & Add-Ons",
    icon: "🛒",
    color: "#3b82f6",
    currentRevenue: 5.0,
    targetRevenue: 12.0,
    timeline: "6-9 months",
    confidence: "High",
    priority: 4,
    description: "Increase revenue per customer through add-ons & personalization",
    kpis: [
      { name: "Avg Basket Size", value: "$431 (record)", status: "✓" },
      { name: "Add-On Attach Rate", value: "Growing", status: "→" },
      { name: "Global Cuisine Demand", value: "High", status: "✓" },
      { name: "Customization Usage", value: "Increasing", status: "→" },
    ],
    actions: [
      "Expand grocery add-ons (breakfast, snacks, pantry)",
      "Create curated bundles (e.g., 'Date Night', 'Family Feast')",
      "Personalize recommendations using AI/ML",
      "Launch subscription tiers (Basic, Premium, Ultimate)",
    ],
  },
  {
    id: "reactivation",
    name: "Customer Reactivation & Retention",
    icon: "🔁",
    color: "#ec4899",
    currentRevenue: 0,
    targetRevenue: 8.0,
    timeline: "9-12 months",
    confidence: "Medium",
    priority: 5,
    description: "Win back lapsed customers & reduce churn",
    kpis: [
      { name: "Churn Rate", value: "High", status: "⚠" },
      { name: "Lapsed Database", value: "~500K+", status: "→" },
      { name: "Reactivation Cost", value: "Lower than CAC", status: "✓" },
      { name: "Retention Past 8 Weeks", value: "Improving", status: "→" },
    ],
    actions: [
      "Build win-back campaigns with exclusive offers",
      "Introduce 'Pause' option to reduce full cancellations",
      "Segment lapsed users by churn reason",
      "Create loyalty rewards program (points, free meals)",
    ],
  },
  {
    id: "b2b",
    name: "B2B Corporate Partnerships",
    icon: "🏢",
    color: "#6366f1",
    currentRevenue: 0.5,
    targetRevenue: 5.0,
    timeline: "12-18 months",
    confidence: "Medium",
    priority: 6,
    description: "Sell meal kits & Genuine Tea to corporate clients",
    kpis: [
      { name: "Active Corporate Clients", value: "Growing", status: "→" },
      { name: "Contract Value", value: "Recurring", status: "✓" },
      { name: "Cross-Sell Potential", value: "High", status: "→" },
      { name: "Margin Profile", value: "Better than D2C", status: "✓" },
    ],
    actions: [
      "Build dedicated B2B sales team",
      "Create corporate gifting & employee perks packages",
      "Partner with HR platforms (Perkopolis, Venngo)",
      "Target tech companies & remote-first orgs",
    ],
  },
];

// SCENARIO PLANNING
interface Scenario {
  name: string;
  revenue2026: number;
  revenue2027: number;
  customers2026: number;
  customers2027: number;
  assumptions: string[];
}

const scenarioData: Record<string, Scenario> = {
  conservative: {
    name: "Conservative (Base Case)",
    revenue2026: 140,
    revenue2027: 160,
    customers2026: 75,
    customers2027: 88,
    assumptions: [
      "Heat & Eat reaches $5M ARR by end of 2026",
      "1-2 M&A deals completed ($8M total revenue)",
      "Value Plan drives 10K net new customers",
      "Basket size grows 10% YoY",
      "Core meal kit stabilizes (no further decline)",
    ],
  },
  moderate: {
    name: "Moderate (Growth Case)",
    revenue2026: 165,
    revenue2027: 200,
    customers2026: 90,
    customers2027: 110,
    assumptions: [
      "Heat & Eat reaches $10M ARR by end of 2026",
      "2-3 M&A deals completed ($12M total revenue)",
      "Value Plan + reactivation drives 20K net new customers",
      "Basket size grows 18% YoY",
      "Core meal kit grows 5% YoY",
    ],
  },
  aggressive: {
    name: "Aggressive (Bull Case)",
    revenue2026: 190,
    revenue2027: 240,
    customers2026: 110,
    customers2027: 140,
    assumptions: [
      "Heat & Eat reaches $15M ARR by end of 2026",
      "3-4 M&A deals completed ($18M total revenue)",
      "Multi-channel growth drives 35K net new customers",
      "Basket size grows 25% YoY",
      "Core meal kit grows 10% YoY from product innovation",
    ],
  },
};

const strategicPrioritiesData = [
  { priority: "Stabilize Core", score: 85, color: "#3db87a" },
  { priority: "Expand Heat & Eat", score: 95, color: "#8b5cf6" },
  { priority: "M&A Execution", score: 70, color: "#10b981" },
  { priority: "Customer Growth", score: 60, color: "#f59e0b" },
  { priority: "Margin Improvement", score: 80, color: "#3b82f6" },
  { priority: "Tech & Personalization", score: 50, color: "#ec4899" },
];

const scenarioChartData = [
  { year: "2024", actual: 153, conservative: null, moderate: null, aggressive: null },
  { year: "2025 Est", actual: 137, conservative: null, moderate: null, aggressive: null },
  { year: "2026", actual: null, conservative: 140, moderate: 165, aggressive: 190 },
  { year: "2027", actual: null, conservative: 160, moderate: 200, aggressive: 240 },
];

const radarChartData = [
  { axis: "Price Value", Goodfood: 75, HelloFresh: 70, Factor: 50 },
  { axis: "Product Quality", Goodfood: 85, HelloFresh: 80, Factor: 90 },
  { axis: "Convenience", Goodfood: 70, HelloFresh: 75, Factor: 95 },
  { axis: "Innovation", Goodfood: 75, HelloFresh: 65, Factor: 80 },
  { axis: "Sustainability", Goodfood: 90, HelloFresh: 60, Factor: 70 },
];

export default function GoodfoodGrowthStrategy() {
  const [activeTab, setActiveTab] = useState("situation");
  const [selectedLever, setSelectedLever] = useState<GrowthInitiative>(growthInitiatives[0]);
  const [selectedScenario, setSelectedScenario] = useState<keyof typeof scenarioData>("moderate");

  const tabs = [
    { id: "situation", label: "📉 Current Situation", icon: "📊" },
    { id: "strategy", label: "🎯 Growth Levers", icon: "🚀" },
    { id: "roadmap", label: "🗺️ Strategic Roadmap", icon: "📅" },
    { id: "scenarios", label: "📈 Scenarios & Targets", icon: "🎲" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-3xl shadow-md">
              🟢
            </div>
            <div>
              <h1 className="text-3xl font-bold">Goodfood Growth Strategy Dashboard</h1>
              <p className="text-emerald-100 text-sm mt-1">Turnaround Strategy 2026-2027 · Built on Q1 FY2026 Results</p>
              <div className="flex gap-4 mt-2">
                <Link to="/canada-meal-kit-demographics" className="text-emerald-100 hover:text-white text-sm font-medium underline">
                  Meal kit demographics
                </Link>
                <Link to="/canada-rte" className="text-emerald-100 hover:text-white text-sm font-medium underline">
                  Ready-to-eat (RTE)
                </Link>
                <Link to="/goodai/subscribers" className="text-emerald-100 hover:text-white text-sm font-medium underline">
                  GoodAI subscribers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[44px] min-w-[44px] px-5 py-3 rounded-lg text-sm font-semibold border-2 transition-all cursor-pointer select-none ${
                  activeTab === tab.id
                    ? "border-emerald-500 bg-emerald-500 text-white shadow-md hover:bg-emerald-600 hover:border-emerald-600"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                <span className="mr-2" aria-hidden>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* CURRENT SITUATION TAB */}
        {activeTab === "situation" && (
          <div className="space-y-6">
            {/* Key Challenges Banner */}
            <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div className="flex-1">
                  <h2 className="font-bold text-red-900 text-lg mb-2">Critical Challenges (As of Q1 FY2026)</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-red-800">Revenue Decline</p>
                      <p className="text-red-700">$28M in Q1 2026 (down from $39.8M in Q1 2024) — **30% decline in 8 quarters**</p>
                    </div>
                    <div>
                      <p className="font-semibold text-red-800">Customer Erosion</p>
                      <p className="text-red-700">65K active customers (down from 117K in Q2 2024) — **44% decline**</p>
                    </div>
                    <div>
                      <p className="font-semibold text-red-800">High Leverage</p>
                      <p className="text-red-700">Net Debt/EBITDA: 4.92x (up from 2.59x) — **Increasing financial risk**</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue & Customer Trends */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
                <h3 className="font-bold text-gray-800 mb-4">📉 Revenue Decline (Quarterly)</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={revenueDeclineData}>
                    <defs>
                      <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.danger} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={COLORS.danger} stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="quarter" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" height={60} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `$${v}M`} domain={[20, 45]} />
                    <Tooltip formatter={(val: number | undefined) => (val != null ? `$${val}M` : "")} />
                    <Area type="monotone" dataKey="revenue" stroke={COLORS.danger} strokeWidth={2.5} fill="url(#revenueGrad)" name="Net Sales (CAD M)" isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
                <p className="text-xs text-gray-400 mt-2 text-center">Macro headwinds + reduced marketing + meal kit market contraction</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
                <h3 className="font-bold text-gray-800 mb-4">👥 Active Customer Base (000s)</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={revenueDeclineData}>
                    <defs>
                      <linearGradient id="customersGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.warning} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={COLORS.warning} stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="quarter" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" height={60} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `${v}K`} domain={[50, 125]} />
                    <Tooltip formatter={(val: number | undefined) => (val != null ? `${val}K customers` : "")} />
                    <Area type="monotone" dataKey="customers" stroke={COLORS.warning} strokeWidth={2.5} fill="url(#customersGrad)" name="Active Customers" isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
                <p className="text-xs text-gray-400 mt-2 text-center">Focus shift from volume to value — prioritizing profitable cohorts</p>
              </div>
            </div>

            {/* Bright Spots */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl">✅</span>
                <h2 className="font-bold text-emerald-900 text-lg">Bright Spots & Operational Wins</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: "Consecutive Profitable Quarters", value: "12+", sub: "Positive Adj. EBITDA since Q2 2023" },
                  { label: "Gross Margin", value: "42.3%", sub: "Stable despite revenue decline" },
                  { label: "Avg Basket Size", value: "$431", sub: "Record high (up 27% YoY)" },
                  { label: "CAC Reduction", value: "-15%", sub: "YoY efficiency gains" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-lg p-4 border border-emerald-100 shadow-sm">
                    <p className="text-xs text-emerald-600 uppercase tracking-wide font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold text-emerald-900 mt-1">{stat.value}</p>
                    <p className="text-xs text-emerald-700 mt-1">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Profitability Metrics */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
              <h3 className="font-bold text-gray-800 mb-4">📊 Key Performance Indicators vs. Targets</h3>
              <div className="space-y-4">
                {profitabilityData.map((metric) => (
                  <div key={metric.metric}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{metric.metric}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">Current: <strong className="text-gray-900">{metric.current}%</strong></span>
                        <span className="text-sm text-gray-500">Target: <strong className="text-emerald-600">{metric.target}%</strong></span>
                      </div>
                    </div>
                    <div className="relative w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className="absolute h-3 rounded-full transition-all"
                        style={{
                          width: `${(metric.current / metric.target) * 100}%`,
                          backgroundColor: metric.status === "strong" ? COLORS.success : metric.status === "improving" ? COLORS.warning : COLORS.primary,
                        }}
                      />
                      <div className="absolute right-0 w-1 h-3 bg-emerald-600" style={{ right: `${100 - (metric.target / metric.target) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitive Position */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
              <h3 className="font-bold text-gray-800 mb-4">🎯 Competitive Positioning Matrix</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarChartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar name="Goodfood" dataKey="Goodfood" stroke={COLORS.primary} fill={COLORS.primary} fillOpacity={0.3} strokeWidth={2} />
                  <Radar name="HelloFresh" dataKey="HelloFresh" stroke={COLORS.warning} fill={COLORS.warning} fillOpacity={0.2} strokeWidth={2} />
                  <Radar name="Factor" dataKey="Factor" stroke={COLORS.purple} fill={COLORS.purple} fillOpacity={0.2} strokeWidth={2} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-400 mt-2 text-center">Goodfood leads on sustainability (B Corp) and value; trails on convenience vs. Factor</p>
            </div>
          </div>
        )}

        {/* GROWTH LEVERS TAB */}
        {activeTab === "strategy" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {growthInitiatives.map((lever) => (
                <button
                  key={lever.id}
                  onClick={() => setSelectedLever(lever)}
                  className={`bg-white rounded-xl border-2 p-5 text-left transition-all hover:shadow-lg ${
                    selectedLever.id === lever.id ? "border-emerald-500 shadow-md" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl">{lever.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-sm">{lever.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Priority #{lever.priority}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-bold ${lever.confidence === "High" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {lever.confidence}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">{lever.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Current: <strong className="text-gray-900">${lever.currentRevenue}M</strong></span>
                    <span className="text-emerald-600">→</span>
                    <span className="text-emerald-600">Target: <strong>${lever.targetRevenue}M</strong></span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-400">Timeline: {lever.timeline}</span>
                  </div>
                </button>
              ))}
            </div>

            {selectedLever && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl" style={{ backgroundColor: selectedLever.color + "22" }}>
                    {selectedLever.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedLever.name}</h2>
                    <p className="text-gray-600 mt-1">{selectedLever.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase">Revenue Potential</p>
                    <p className="text-3xl font-bold" style={{ color: selectedLever.color }}>${selectedLever.targetRevenue}M</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">📊 Key Performance Indicators</h3>
                    <div className="space-y-2">
                      {selectedLever.kpis.map((kpi) => (
                        <div key={kpi.name} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{kpi.status}</span>
                            <span className="text-sm font-medium text-gray-700">{kpi.name}</span>
                          </div>
                          <span className="text-sm font-bold text-gray-900">{kpi.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">🎯 Action Plan</h3>
                    <ul className="space-y-3">
                      {selectedLever.actions.map((action, i) => (
                        <li key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg px-4 py-3">
                          <span className="text-emerald-600 font-bold shrink-0">{i + 1}.</span>
                          <span className="text-sm text-gray-700">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
              <h3 className="font-bold text-gray-800 mb-4">💰 Total Revenue Opportunity Breakdown (Target State)</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={growthInitiatives} layout="vertical" margin={{ left: 150, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v: number) => `$${v}M`} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={140} />
                  <Tooltip formatter={(val: number | undefined) => (val != null ? `$${val}M` : "")} />
                  <Bar dataKey="currentRevenue" fill="#94a3b8" name="Current" radius={[0, 4, 4, 0]} isAnimationActive={false} />
                  <Bar dataKey="targetRevenue" fill={COLORS.primary} name="Target" radius={[0, 4, 4, 0]} isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-400 mt-2 text-center">Combined opportunity: ~$70M incremental revenue if all levers execute successfully</p>
            </div>
          </div>
        )}

        {/* STRATEGIC ROADMAP TAB */}
        {activeTab === "roadmap" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
              <h3 className="font-bold text-gray-800 mb-6">📅 18-Month Execution Roadmap</h3>
              <div className="space-y-6">
                {[
                  {
                    phase: "Phase 1: Stabilization (Q1-Q2 2026)",
                    color: "#3b82f6",
                    milestones: [
                      "Launch Heat & Eat in Ontario (Q1)",
                      "Scale Value Plan to 30% of new customer mix (Q2)",
                      "Complete 1st acquisition (~$10M revenue target) (Q2)",
                      "Launch loyalty rewards program (Q2)",
                      "Expand add-ons catalog by 30% (Q1-Q2)",
                    ],
                  },
                  {
                    phase: "Phase 2: Growth (Q3-Q4 2026)",
                    color: "#8b5cf6",
                    milestones: [
                      "Expand Heat & Eat to Alberta & BC (Q3)",
                      "Launch subscription tiers (Basic/Premium/Ultimate) (Q3)",
                      "Complete 2nd acquisition (Q4)",
                      "Build B2B sales team + first 10 corporate clients (Q3-Q4)",
                      "Deploy AI-powered personalization engine (Q4)",
                    ],
                  },
                  {
                    phase: "Phase 3: Scale (Q1-Q2 2027)",
                    color: "#10b981",
                    milestones: [
                      "Heat & Eat achieves $15M ARR (Q1)",
                      "Complete 3rd acquisition (Q1)",
                      "Launch Heat & Eat national marketing campaign (Q1)",
                      "Achieve 100K active customers milestone (Q2)",
                      "Expand B2B to 25+ corporate clients (Q2)",
                    ],
                  },
                ].map((phase) => (
                  <div key={phase.phase} className="relative">
                    <div className="flex items-start gap-4">
                      <div className="w-4 h-4 rounded-full shrink-0 mt-1" style={{ backgroundColor: phase.color }} />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-3">{phase.phase}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {phase.milestones.map((milestone, i) => (
                            <div key={i} className="flex items-start gap-2 bg-gray-50 rounded-lg px-3 py-2">
                              <span className="text-gray-400 text-xs mt-0.5">→</span>
                              <span className="text-sm text-gray-700">{milestone}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
              <h3 className="font-bold text-gray-800 mb-4">🎯 Strategic Priority Scorecard (0-100)</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={strategicPrioritiesData} layout="vertical" margin={{ left: 120, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="priority" tick={{ fontSize: 11 }} width={110} />
                  <Tooltip />
                  <Bar dataKey="score" radius={[0, 6, 6, 0]} name="Readiness Score" isAnimationActive={false}>
                    {strategicPrioritiesData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-400 mt-2 text-center">Highest priority: Heat & Eat expansion (95) · Biggest gap: Tech & Personalization (50)</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
              <h3 className="font-bold text-gray-800 mb-4">💵 Estimated Investment Requirements (2026)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { category: "Heat & Eat Expansion", amount: "$2-3M", items: ["Recipe development", "Regional marketing", "Logistics setup"] },
                  { category: "M&A (2-3 deals)", amount: "$20-30M", items: ["Acquisition costs", "Integration", "Working capital"] },
                  { category: "Tech & Product", amount: "$1.5-2M", items: ["AI personalization", "Platform upgrades", "B2B tools"] },
                ].map((invest) => (
                  <div key={invest.category} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-800 mb-1">{invest.category}</h4>
                    <p className="text-2xl font-bold text-emerald-600 mb-3">{invest.amount}</p>
                    <ul className="space-y-1">
                      {invest.items.map((item) => (
                        <li key={item} className="text-xs text-gray-600 flex items-start gap-1.5">
                          <span className="text-gray-300">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl">⚡</span>
                <h3 className="font-bold text-amber-900 text-lg">Key Risks & Mitigation Strategies</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { risk: "Continued customer decline", mitigation: "Aggressive Value Plan marketing + loyalty program to stem churn + focus on reactivation" },
                  { risk: "Heat & Eat cannibalization", mitigation: "Position as complementary (convenience vs. cooking experience) + test bundling" },
                  { risk: "M&A integration challenges", mitigation: "Start with smaller targets ($10M) + maintain operational independence + shared services only" },
                  { risk: "Macro environment worsens", mitigation: "Double down on value proposition + B2B diversification + maintain cost discipline" },
                ].map((item) => (
                  <div key={item.risk} className="bg-white rounded-lg p-4 border border-amber-100">
                    <p className="font-semibold text-amber-900 text-sm mb-2">⚠️ {item.risk}</p>
                    <p className="text-xs text-amber-800">
                      <strong>Mitigation:</strong> {item.mitigation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SCENARIOS TAB */}
        {activeTab === "scenarios" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-1 flex gap-1 shadow-sm">
              {(Object.keys(scenarioData) as (keyof typeof scenarioData)[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedScenario(key)}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                    selectedScenario === key
                      ? key === "conservative"
                        ? "bg-blue-500 text-white"
                        : key === "moderate"
                          ? "bg-emerald-500 text-white"
                          : "bg-purple-500 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {scenarioData[key].name}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                    selectedScenario === "conservative"
                      ? "bg-blue-100 text-blue-600"
                      : selectedScenario === "moderate"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-purple-100 text-purple-600"
                  }`}
                >
                  {selectedScenario === "conservative" ? "📊" : selectedScenario === "moderate" ? "📈" : "🚀"}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{scenarioData[selectedScenario].name}</h2>
                  <p className="text-gray-500 text-sm mt-1">2-year revenue & customer projections</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  {
                    label: "2026 Revenue",
                    value: `$${scenarioData[selectedScenario].revenue2026}M`,
                    change: `+${(((scenarioData[selectedScenario].revenue2026 - 137) / 137) * 100).toFixed(0)}%`,
                  },
                  {
                    label: "2027 Revenue",
                    value: `$${scenarioData[selectedScenario].revenue2027}M`,
                    change: `+${(((scenarioData[selectedScenario].revenue2027 - scenarioData[selectedScenario].revenue2026) / scenarioData[selectedScenario].revenue2026) * 100).toFixed(0)}%`,
                  },
                  {
                    label: "2026 Customers",
                    value: `${scenarioData[selectedScenario].customers2026}K`,
                    change: `+${(((scenarioData[selectedScenario].customers2026 - 65) / 65) * 100).toFixed(0)}%`,
                  },
                  {
                    label: "2027 Customers",
                    value: `${scenarioData[selectedScenario].customers2027}K`,
                    change: `+${(((scenarioData[selectedScenario].customers2027 - scenarioData[selectedScenario].customers2026) / scenarioData[selectedScenario].customers2026) * 100).toFixed(0)}%`,
                  },
                ].map((metric) => (
                  <div key={metric.label} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{metric.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                    <p className="text-xs text-emerald-600 font-semibold mt-1">{metric.change}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Key Assumptions</h3>
                <ul className="space-y-2">
                  {scenarioData[selectedScenario].assumptions.map((assumption, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      {assumption}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
              <h3 className="font-bold text-gray-800 mb-4">📊 Revenue Trajectory Comparison (2024-2027)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={scenarioChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `$${v}M`} domain={[100, 250]} />
                  <Tooltip formatter={(val: unknown) => (typeof val === "number" && !Number.isNaN(val) ? `$${val}M` : "N/A")} />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#64748b" strokeWidth={3} name="Historical" dot={{ r: 5 }} isAnimationActive={false} />
                  <Line type="monotone" dataKey="conservative" stroke="#3b82f6" strokeWidth={2.5} strokeDasharray="5 5" name="Conservative" dot={{ r: 5 }} isAnimationActive={false} />
                  <Line type="monotone" dataKey="moderate" stroke="#10b981" strokeWidth={2.5} strokeDasharray="5 5" name="Moderate" dot={{ r: 5 }} isAnimationActive={false} />
                  <Line type="monotone" dataKey="aggressive" stroke="#8b5cf6" strokeWidth={2.5} strokeDasharray="5 5" name="Aggressive" dot={{ r: 5 }} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
              <h3 className="font-bold text-emerald-900 mb-4">🎯 2027 Target State (Moderate Scenario)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { metric: "Revenue", value: "$200M", desc: "46% growth from FY2025" },
                  { metric: "Active Customers", value: "110K", desc: "69% recovery from current" },
                  { metric: "Adj. EBITDA Margin", value: "12-14%", desc: "From current 8.6%" },
                  { metric: "Heat & Eat ARR", value: "$10M+", desc: "New revenue stream" },
                  { metric: "M&A Portfolio", value: "3-4 brands", desc: "$12M+ revenue contribution" },
                  { metric: "Avg Basket Size", value: "$500+", desc: "From current $431" },
                ].map((item) => (
                  <div key={item.metric} className="bg-white rounded-lg p-4 border border-emerald-100 shadow-sm">
                    <p className="text-xs text-emerald-600 uppercase tracking-wide font-medium">{item.metric}</p>
                    <p className="text-2xl font-bold text-emerald-900 mt-1">{item.value}</p>
                    <p className="text-xs text-emerald-700 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="text-center text-xs text-gray-400 py-6 px-4 border-t border-gray-200">
        Sources: Goodfood Q1-Q4 FY2025 & Q1 FY2026 Financial Statements · Investor Presentations · Genuine Tea Acquisition Filing · Market Analysis
      </div>
    </div>
  );
}
