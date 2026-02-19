import { marketSize, segmentGrowth } from '../data/market';
import { brandMetrics } from '../data/brand';
import { kpis } from '../data/roadmap';
import './Section.css';

export function ExecutiveSummary() {
  const rteGrowth = segmentGrowth.find(s => s.segment === 'Ready-to-eat');
  return (
    <section id="summary" className="section Section">
      <h1 className="section-title">Executive summary</h1>
      <p className="section-lead">
        GoodFood is at an inflection point: meal kits are declining in Canada while ready-to-eat (RTE) is growing fast.
        This dashboard outlines market reality, competitive gaps, recipe and brand insights, and a focused roadmap to grow EBITDA,
        improve product and CX, and establish GoodFood as the Canadian leader in ready-to-eat meals.
      </p>

      <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
        <div className="card summary-card">
          <div className="summary-label">Canadian meal solutions TAM</div>
          <div className="metric metric--positive" style={{ fontSize: '1.5rem' }}>${marketSize.totalCAD}B CAD</div>
          <div className="summary-sublabel">Meal kits ~$0.7B · RTE ~$1.0B</div>
        </div>
        <div className="card summary-card">
          <div className="summary-label">RTE segment (indexed growth)</div>
          <div className="metric metric--positive" style={{ fontSize: '1.5rem' }}>+{rteGrowth ? rteGrowth.y2026e - 100 : 98}%</div>
          <div className="summary-sublabel">vs meal kits declining</div>
        </div>
        <div className="card summary-card">
          <div className="summary-label">GoodFood NPS vs benchmark</div>
          <div className="metric metric--positive" style={{ fontSize: '1.5rem' }}>{brandMetrics.nps} vs {brandMetrics.npsBenchmark}</div>
          <div className="summary-sublabel">Above category; room to grow</div>
        </div>
      </div>

      <div className="card">
        <h3>Strategic imperative</h3>
        <ul className="bullet-list">
          <li><strong>Pivot to RTE:</strong> Shift mix to 60% RTE revenue by end of FY26; meal kit becomes supporting offer.</li>
          <li><strong>Win on trust & convenience:</strong> Double down on Canadian sourcing, reliable delivery, and clear “heat & eat” value.</li>
          <li><strong>Fix what hurts:</strong> Packaging, portion options, delivery reliability, and value perception.</li>
          <li><strong>EBITDA path:</strong> Gross margin and fulfilment efficiency + scale on RTE to reach target margin.</li>
        </ul>
      </div>

      <div className="card">
        <h3>Key targets (dashboard reference)</h3>
        <div className="kpi-grid">
          {kpis.slice(0, 6).map((k) => (
            <div key={k.name} className="kpi-item">
              <span className="kpi-name">{k.name}</span>
              <span className="metric metric--positive">{k.current}{k.unit} → {k.target}{k.unit}</span>
              <span className="kpi-horizon">{k.horizon}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
