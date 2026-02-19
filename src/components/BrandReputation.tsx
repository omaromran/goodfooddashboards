import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  AreaChart,
  Area,
  ComposedChart,
} from 'recharts';
import { brandMetrics, sentimentOverTime, reputationDrivers, brandPerception } from '../data/brand';
import './Section.css';

export function BrandReputation() {
  return (
    <section id="brand" className="section Section">
      <h1 className="section-title">Brand reputation</h1>
      <p className="section-lead">
        NPS and trust above benchmark; value and eco perception are levers. Sentiment trend improving.
      </p>

      <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
        <div className="card summary-card">
          <div className="summary-label">NPS</div>
          <div className="metric metric--positive" style={{ fontSize: '1.5rem' }}>{brandMetrics.nps}</div>
          <div className="summary-sublabel">Benchmark {brandMetrics.npsBenchmark}</div>
        </div>
        <div className="card summary-card">
          <div className="summary-label">CSAT (out of 5)</div>
          <div className="metric metric--positive" style={{ fontSize: '1.5rem' }}>{brandMetrics.csat}</div>
          <div className="summary-sublabel">Target 4.3+</div>
        </div>
        <div className="card summary-card">
          <div className="summary-label">Consideration %</div>
          <div className="metric metric--positive" style={{ fontSize: '1.5rem' }}>{brandMetrics.consideration}%</div>
          <div className="summary-sublabel">Benchmark {brandMetrics.considerationBenchmark}%</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Sentiment over time (% positive / neutral / negative)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sentimentOverTime} stackOffset="expand" margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d4e0d4" style={{}} />
                <XAxis dataKey="month" tick={{ fill: '#5c6b5c', fontSize: 11 }} />
                <YAxis tick={{ fill: '#5c6b5c', fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d4e0d4', color: '#1a2e1a' }} formatter={(v: number | undefined) => [`${v ?? 0}%`, '']} />
                <Legend />
                <Area type="monotone" dataKey="positive" stackId="1" fill="#2d6a4f" stroke="#2d6a4f" name="Positive" isAnimationActive={false} />
                <Area type="monotone" dataKey="neutral" stackId="1" fill="#40916c" stroke="#40916c" name="Neutral" isAnimationActive={false} />
                <Area type="monotone" dataKey="negative" stackId="1" fill="#c53030" stroke="#c53030" name="Negative" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3>Brand perception (score 0–100)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={brandPerception} layout="vertical" margin={{ top: 0, right: 30, left: 90, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d4e0d4" style={{}} />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#5c6b5c', fontSize: 11 }} />
                <YAxis type="category" dataKey="attribute" tick={{ fill: '#5c6b5c', fontSize: 11 }} width={90} />
                <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d4e0d4', color: '#1a2e1a' }} />
                <Bar dataKey="score" fill="#2d6a4f" radius={[0, 4, 4, 0]} name="Score" isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Reputation drivers (score vs importance)</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={reputationDrivers} margin={{ top: 5, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d4e0d4" style={{}} />
              <XAxis dataKey="driver" tick={{ fill: '#5c6b5c', fontSize: 10 }} angle={-15} textAnchor="end" height={70} />
              <YAxis yAxisId="left" tick={{ fill: '#5c6b5c', fontSize: 11 }} domain={[0, 100]} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#5c6b5c', fontSize: 11 }} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d4e0d4', color: '#1a2e1a' }} />
              <Legend />
              <Bar yAxisId="left" dataKey="score" fill="#2d6a4f" radius={[4, 4, 0, 0]} name="Score" isAnimationActive={false} />
              <Line yAxisId="right" type="monotone" dataKey="importance" stroke="#d4732f" strokeWidth={2} dot={{ r: 3 }} name="Importance" isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
