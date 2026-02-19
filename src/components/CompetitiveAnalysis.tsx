import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { competitors, competitiveGaps } from '../data/competitors';
import './Section.css';

const COLORS = ['#7d8c7d', '#40916c', '#2d6a4f', '#d4732f', '#c53030', '#6b8e6b', '#9bad9b'];

function CompetitiveAnalysis() {
  const barData = competitors.map((c) => ({
    name: c.name.replace(' (us)', ''),
    share: c.marketSharePct,
    isUs: c.name.includes('GoodFood'),
  }));

  return (
    <section id="competitors" className="section Section">
      <h1 className="section-title">Competitive landscape</h1>
      <p className="section-lead">
        GoodFood holds ~11% share with strength in Canadian heritage and RTE pipeline; opportunity to lead Canadian-first RTE at scale.
      </p>

      <div className="card">
        <h3>Market share (est. %)</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} layout="vertical" margin={{ top: 0, right: 20, left: 100, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d4e0d4" style={{}} />
              <XAxis type="number" domain={[0, 35]} tick={{ fill: '#5c6b5c', fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#5c6b5c', fontSize: 11 }} width={100} />
              <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d4e0d4', color: '#1a2e1a' }} formatter={(v: number | undefined) => [`${v ?? 0}%`, 'Share']} />
              <Bar dataKey="share" radius={[0, 4, 4, 0]} name="Share" isAnimationActive={false}>
                {barData.map((entry, i) => (
                  <Cell key={i} fill={entry.isUs ? '#2d6a4f' : COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3>Competitor snapshot (strengths & weaknesses)</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Segment</th>
                <th>Price</th>
                <th>Strengths</th>
                <th>Weaknesses</th>
                <th>RTE growth YoY</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c) => (
                <tr key={c.name}>
                  <td><strong>{c.name.replace(' (us)', '')}</strong></td>
                  <td>{c.segment === 'both' ? 'Meal kit + RTE' : c.segment === 'rte' ? 'RTE' : 'Meal kit'}</td>
                  <td>{c.pricePosition}</td>
                  <td>{c.strength.join(' · ')}</td>
                  <td>{c.weakness.join(' · ')}</td>
                  <td>{c.rteGrowthYoY != null ? `${c.rteGrowthYoY}%` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3>Competitive gaps & GoodFood fit</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Gap</th>
                <th>Opportunity</th>
                <th>Our fit</th>
              </tr>
            </thead>
            <tbody>
              {competitiveGaps.map((g) => (
                <tr key={g.gap}>
                  <td>{g.gap}</td>
                  <td><span className={`badge badge--${g.opportunity === 'High' ? 'high' : g.opportunity === 'Growing' ? 'medium' : 'low'}`}>{g.opportunity}</span></td>
                  <td>{g.ourFit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export { CompetitiveAnalysis };
export default CompetitiveAnalysis;
