import { roadmap, kpis } from '../data/roadmap';
import './Section.css';

const STATUS_ORDER = { now: 0, next: 1, later: 2 };
const themeOrder = ['Pivot to RTE', 'Product', 'Customer experience', 'EBITDA', 'Visibility & brand', 'Data & personalization'];

export function GrowthRoadmap() {
  const byTheme = themeOrder.map((theme) => ({
    theme,
    items: roadmap.filter((r) => r.theme === theme).sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]),
  })).filter((g) => g.items.length > 0);

  return (
    <section id="roadmap" className="section Section">
      <h1 className="section-title">Growth roadmap</h1>
      <p className="section-lead">
        Prioritized initiatives to fix the company roadmap: RTE pivot, product & CX improvements, EBITDA levers, and visibility.
      </p>

      <div className="card">
        <h3>Key performance targets</h3>
        <div className="kpi-grid">
          {kpis.map((k) => (
            <div key={k.name} className="kpi-item">
              <span className="kpi-name">{k.name}</span>
              <span className="metric metric--positive">{k.current}{k.unit} → {k.target}{k.unit}</span>
              <span className="kpi-horizon">{k.horizon}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Initiatives by theme</h3>
        <div className="roadmap-themes">
          {byTheme.map(({ theme, items }) => (
            <div key={theme} className="roadmap-theme">
              <h4 className="roadmap-theme-title">{theme}</h4>
              <ul className="roadmap-list">
                {items.map((r) => (
                  <li key={r.id} className="roadmap-item">
                    <span className={`badge badge--${r.status === 'now' ? 'high' : r.status === 'next' ? 'medium' : 'low'}`}>{r.status}</span>
                    <span className="roadmap-initiative">{r.initiative}</span>
                    <span className="roadmap-meta">{r.timeframe} · {r.impact}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
