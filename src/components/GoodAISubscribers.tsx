import { Link } from "react-router-dom";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { subscriberFormulas, subscriberWeeks } from "../data/subscribers";
import type { SubscriberWeek } from "../data/subscribers";

const COLORS = {
  entering: "#10b981",
  exiting: "#ef4444",
  net: "#2563eb",
  active: "#d97706",
};

function fmtCount(n: number): string {
  return n.toLocaleString("en-CA");
}

function fmtSigned(n: number): string {
  const abs = Math.abs(n).toLocaleString("en-CA");
  if (n > 0) return `+${abs}`;
  if (n < 0) return `−${abs}`;
  return "0";
}

function fmtPct(n: number, digits = 2): string {
  return `${n.toFixed(digits)}%`;
}

const totals = subscriberWeeks.reduce(
  (acc, w) => {
    acc.entering += w.entering;
    acc.exiting += w.exiting;
    acc.netFlow += w.netFlow;
    acc.lapses += w.lapses;
    acc.activeNet += w.activeNet;
    return acc;
  },
  { entering: 0, exiting: 0, netFlow: 0, lapses: 0, activeNet: 0 },
);

const first = subscriberWeeks[0];
const last = subscriberWeeks.at(-1);
const allEnteringGtExiting = subscriberWeeks.every((w) => w.entering > w.exiting);
const allNetPositive = subscriberWeeks.every((w) => w.netFlow > 0);
const allChurnPositive = subscriberWeeks.every((w) => w.churnRatePct > 0);
const allActiveNetNegative = subscriberWeeks.every((w) => w.activeNet < 0);

interface FlowTooltipProps {
  active?: boolean;
  payload?: Array<{ dataKey?: string; value?: number; color?: string; payload?: SubscriberWeek }>;
  label?: string;
}

function FlowTooltip({ active, payload, label }: FlowTooltipProps) {
  const row = payload?.[0]?.payload;
  if (!active || !row) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-md">
      <p className="mb-1 font-semibold text-gray-800">Week of {label}</p>
      <p style={{ color: COLORS.entering }}>Entering: {fmtCount(row.entering)}</p>
      <p style={{ color: COLORS.exiting }}>Exiting: {fmtCount(row.exiting)}</p>
      <p style={{ color: COLORS.net }}>
        Net flow (entering − exiting): {fmtSigned(row.netFlow)}
      </p>
      <p className="text-gray-600">Logo churn: {fmtPct(row.churnRatePct)}</p>
      <p style={{ color: COLORS.active }}>
        Active-customer net: {fmtSigned(row.activeNet)}
      </p>
    </div>
  );
}

export default function GoodAISubscribers() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-6 text-white shadow-lg">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
            GoodAI · Subscribers
          </p>
          <h1 className="mt-1 text-3xl font-bold">Weekly subscriber flows</h1>
          <p className="mt-1 text-sm text-emerald-100">
            Entering, exiting, net flow, and churn — with the sign convention made explicit
          </p>
          <div className="mt-3 flex flex-wrap gap-4">
            <Link to="/" className="text-sm font-medium text-emerald-100 underline hover:text-white">
              Growth strategy
            </Link>
            <Link
              to="/canada-meal-kit-demographics"
              className="text-sm font-medium text-emerald-100 underline hover:text-white"
            >
              Meal kit demographics
            </Link>
            <Link to="/canada-rte" className="text-sm font-medium text-emerald-100 underline hover:text-white">
              Ready-to-eat (RTE)
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 p-6">
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <h2 className="text-lg font-bold text-amber-950">Why the bars and the net looked contradictory</h2>
          <p className="mt-2 text-sm leading-relaxed text-amber-950">
            Your reading of the signs is right: <strong>negative net flow means more people exited than entered</strong>.
            If every week’s entering bar is taller than the exiting bar, net subscription flow{" "}
            <strong>cannot</strong> also be negative — that would be a sign error (net computed as exiting − entering)
            or a mix-up of two different populations on the same chart.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-amber-950">
            Logo <strong>churn rate is never negative</strong>. It is exits / starting subscribers, always ≥ 0. A
            negative “churn” number is usually either inverted net flow, or the week-over-week change in{" "}
            <strong>active customers</strong> (ordered in the last 90 days) — which can fall even while more people
            subscribe than cancel, because skips and inactivity are not cancellations.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Kpi
            label="Weeks where entering > exiting"
            value={allEnteringGtExiting ? `${subscriberWeeks.length} / ${subscriberWeeks.length}` : "Mixed"}
            hint="Adds beat cancels every week"
            tone="good"
          />
          <Kpi
            label="Net subscription flow"
            value={fmtSigned(totals.netFlow)}
            hint={allNetPositive ? "Positive every week (entering − exiting)" : "Check signs"}
            tone="good"
          />
          <Kpi
            label="Logo churn rate"
            value="Always ≥ 0"
            hint={allChurnPositive ? "Weekly rate = exits / that week's starting base" : "Unexpected non-positive week"}
            tone="neutral"
          />
          <Kpi
            label="Active-customer net"
            value={fmtSigned(totals.activeNet)}
            hint={
              allActiveNetNegative
                ? "Negative every week — lapses, not extra cancels"
                : "Active stock not uniformly down"
            }
            tone="warn"
          />
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <h2 className="font-bold text-gray-800">Subscription flow (counts)</h2>
          <p className="mb-4 text-sm text-gray-500">
            Green up = entering. Red down = exiting (same count, plotted below zero so the two can be compared). The
            blue line is <span className="font-medium">entering − exiting</span> — above zero whenever the green bar is
            taller than the red bar.
          </p>
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={subscriberWeeks} barGap={2} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => fmtCount(v)} />
              <ReferenceLine y={0} stroke="#94a3b8" />
              <Tooltip content={<FlowTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar
                dataKey="entering"
                name="Entering"
                fill={COLORS.entering}
                radius={[4, 4, 0, 0]}
                isAnimationActive={false}
              />
              <Bar
                dataKey="exitingBar"
                name="Exiting"
                fill={COLORS.exiting}
                radius={[0, 0, 4, 4]}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="netFlow"
                name="Net flow (entering − exiting)"
                stroke={COLORS.net}
                strokeWidth={2.5}
                dot={{ r: 3 }}
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <h2 className="font-bold text-gray-800">Active-customer net vs subscription net</h2>
          <p className="mb-4 text-sm text-gray-500">
            Same weeks. Subscription net stays positive. Active-customer net (90-day orderers) is negative because
            lapses — members who skip or stop ordering without cancelling — outnumber the surplus of new subscribers.
            That is the Goodfood pattern from recent earnings: cancellations improved, new customers still arrive, and
            the active count still fell on order rate.
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={subscriberWeeks} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => fmtCount(v)} />
              <ReferenceLine y={0} stroke="#94a3b8" />
              <Tooltip content={<FlowTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar
                dataKey="netFlow"
                name="Net subscription flow"
                fill={COLORS.net}
                radius={[4, 4, 4, 4]}
                isAnimationActive={false}
              />
              <Bar
                dataKey="activeNet"
                name="Active-customer net"
                fill={COLORS.active}
                radius={[4, 4, 4, 4]}
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
          <p className="mt-3 text-center text-xs text-gray-400">
            Active customers {fmtCount(first?.startingActive ?? 0)} → {fmtCount(last?.endingActive ?? 0)} · Subscribed
            accounts {fmtCount(first?.startingSubscribers ?? 0)} → {fmtCount(last?.endingSubscribers ?? 0)}
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <h2 className="mb-3 font-bold text-gray-800">How each series is defined</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="py-2 pr-4 font-medium">Metric</th>
                  <th className="py-2 pr-4 font-medium">Formula</th>
                  <th className="py-2 font-medium">Sign</th>
                </tr>
              </thead>
              <tbody>
                {subscriberFormulas.map((row) => (
                  <tr key={row.name} className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-semibold text-gray-800">{row.name}</td>
                    <td className="py-2 pr-4 text-gray-600">{row.formula}</td>
                    <td className="py-2 text-gray-600">{row.sign}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <h2 className="mb-1 font-bold text-gray-800">Week-by-week audit</h2>
          <p className="mb-4 text-sm text-gray-500">
            Every row has entering &gt; exiting, net flow &gt; 0, churn rate &gt; 0, and active-customer net &lt; 0.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
                  <th className="py-2 pr-3 font-medium">Week</th>
                  <th className="py-2 pr-3 font-medium text-right">Entering</th>
                  <th className="py-2 pr-3 font-medium text-right">Exiting</th>
                  <th className="py-2 pr-3 font-medium text-right">Net flow</th>
                  <th className="py-2 pr-3 font-medium text-right">Churn %</th>
                  <th className="py-2 pr-3 font-medium text-right">Lapses</th>
                  <th className="py-2 font-medium text-right">Active net</th>
                </tr>
              </thead>
              <tbody>
                {subscriberWeeks.map((w) => (
                  <tr key={w.week} className="border-b border-gray-100">
                    <td className="py-2 pr-3 font-medium text-gray-800">{w.week}</td>
                    <td className="py-2 pr-3 text-right tabular-nums text-emerald-700">{fmtCount(w.entering)}</td>
                    <td className="py-2 pr-3 text-right tabular-nums text-red-600">{fmtCount(w.exiting)}</td>
                    <td className="py-2 pr-3 text-right tabular-nums font-semibold text-blue-700">
                      {fmtSigned(w.netFlow)}
                    </td>
                    <td className="py-2 pr-3 text-right tabular-nums text-gray-700">{fmtPct(w.churnRatePct)}</td>
                    <td className="py-2 pr-3 text-right tabular-nums text-gray-600">{fmtCount(w.lapses)}</td>
                    <td className="py-2 text-right tabular-nums font-semibold text-amber-700">
                      {fmtSigned(w.activeNet)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="text-sm font-semibold">
                  <td className="py-2 pr-3">Period</td>
                  <td className="py-2 pr-3 text-right tabular-nums text-emerald-700">{fmtCount(totals.entering)}</td>
                  <td className="py-2 pr-3 text-right tabular-nums text-red-600">{fmtCount(totals.exiting)}</td>
                  <td className="py-2 pr-3 text-right tabular-nums text-blue-700">{fmtSigned(totals.netFlow)}</td>
                  <td className="py-2 pr-3 text-right tabular-nums text-gray-500">—</td>
                  <td className="py-2 pr-3 text-right tabular-nums text-gray-600">{fmtCount(totals.lapses)}</td>
                  <td className="py-2 text-right tabular-nums text-amber-700">{fmtSigned(totals.activeNet)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

function Kpi({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  tone: "good" | "warn" | "neutral";
}) {
  const toneClass =
    tone === "good"
      ? "border-emerald-200 bg-emerald-50"
      : tone === "warn"
        ? "border-amber-200 bg-amber-50"
        : "border-gray-200 bg-white";

  return (
    <div className={`rounded-xl border p-4 shadow-sm ${toneClass}`}>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-gray-900">{value}</p>
      <p className="mt-1 text-xs text-gray-600">{hint}</p>
    </div>
  );
}
