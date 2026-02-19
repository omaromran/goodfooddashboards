import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ebitdaLevers } from '../data/roadmap';
import './Section.css';

const CONFIDENCE_COLOR: Record<string, string> = { High: '#2d6a4f', Medium: '#d4732f', Low: '#c53030' };

export function EBITDALevers() {
  const barData = ebitdaLevers.map((l) => {
    const match = l.potential.match(/[\d.]+/);
    const value = match ? parseFloat(match[0]) : 0;
    return {
      name: l.lever.length > 45 ? l.lever.slice(0, 45) + '…' : l.lever,
      fullName: l.lever,
      potential: l.potential,
      value: value,
      timeline: l.timeline,
      confidence: l.confidence,
    };
  });

  return (
    <section id="ebitda" className="section Section">
      <h1 className="section-title">EBITDA levers</h1>
      <p className="section-lead">
        Where to drive margin improvement: gross margin, fulfilment, marketing efficiency, packaging, and scale.
      </p>

      <div className="card">
        <h3>EBITDA impact potential (margin pts) & confidence</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} layout="vertical" margin={{ top: 0, right: 80, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d4e0d4" style={{}} />
              <XAxis type="number" tick={{ fill: '#5c6b5c', fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={220} tick={{ fill: '#5c6b5c', fontSize: 10 }} />
              <Tooltip
                contentStyle={{ background: '#ffffff', border: '1px solid #d4e0d4', color: '#1a2e1a' }}
                content={({ active, payload }) =>
                  active && payload?.[0] ? (
                    <div style={{ padding: '0.25rem 0' }}>
                      <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{(payload[0].payload as (typeof barData)[0]).fullName}</div>
                      <div>{(payload[0].payload as (typeof barData)[0]).potential} · {(payload[0].payload as (typeof barData)[0]).timeline} · {(payload[0].payload as (typeof barData)[0]).confidence}</div>
                    </div>
                  ) : null
                }
              />
              <Bar dataKey="value" name="Potential (pts)" radius={[0, 4, 4, 0]} isAnimationActive={false}>
                {barData.map((entry, i) => (
                  <Cell key={i} fill={CONFIDENCE_COLOR[entry.confidence] || '#7d8c7d'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="legend-inline">
          <span><span className="dot" style={{ background: '#2d6a4f' }} /> High confidence</span>
          <span><span className="dot" style={{ background: '#d4732f' }} /> Medium</span>
          <span><span className="dot" style={{ background: '#c53030' }} /> Low</span>
        </div>
      </div>

      <div className="card">
        <h3>Lever summary</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Lever</th>
                <th>Potential</th>
                <th>Timeline</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              {ebitdaLevers.map((l) => (
                <tr key={l.lever}>
                  <td>{l.lever}</td>
                  <td className="metric metric--positive">{l.potential}</td>
                  <td>{l.timeline}</td>
                  <td><span className="badge badge--high" style={l.confidence === 'Medium' ? { background: 'var(--accent-warm-soft)', color: '#d4732f' } : l.confidence === 'Low' ? { background: 'rgba(197,48,48,0.12)', color: '#c53030' } : undefined}>{l.confidence}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
