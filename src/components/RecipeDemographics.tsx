import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { topRecipesByDemographic, recipeTrends, cuisinePreferences } from '../data/recipes';
import './Section.css';

const TREND_COLOR = { up: '#2d6a4f', stable: '#7d8c7d', down: '#c53030' };

export function RecipeDemographics() {
  const demographicKeys = Object.keys(topRecipesByDemographic);

  return (
    <section id="recipes" className="section Section">
      <h1 className="section-title">Recipes & demographics</h1>
      <p className="section-lead">
        What resonates by segment: millennials favour bowls and global flavours; families want comfort and sheet-pan; health-focused want keto and plant-based.
      </p>

      <div className="card">
        <h3>Recipe trends (appeal score & YoY change)</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={recipeTrends} layout="vertical" margin={{ top: 0, right: 50, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d4e0d4" style={{}} />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: '#5c6b5c', fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={140} tick={{ fill: '#5c6b5c', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d4e0d4', color: '#1a2e1a' }} />
              <Bar dataKey="score" name="Appeal" fill="#2d6a4f" radius={[0, 4, 4, 0]} isAnimationActive={false} />
              <Bar dataKey="change" name="YoY Δ" fill="#40916c" radius={[0, 4, 4, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3>Cuisine preferences (share of preference %)</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cuisinePreferences} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d4e0d4" style={{}} />
              <XAxis dataKey="cuisine" tick={{ fill: '#5c6b5c', fontSize: 11 }} />
              <YAxis tick={{ fill: '#5c6b5c', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d4e0d4', color: '#1a2e1a' }} formatter={(v: number | undefined) => [`${v ?? 0}%`, 'Share']} />
              <Bar dataKey="share" fill="#40916c" radius={[4, 4, 0, 0]} name="Share" isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3>Top recipes by demographic</h3>
        <div className="demographic-grid">
          {demographicKeys.map((demo) => (
            <div key={demo} className="demographic-block">
              <h4 style={{ marginBottom: '0.75rem', fontSize: '1rem' }}>{demo}</h4>
              <ul className="recipe-list">
                {topRecipesByDemographic[demo].map((r) => (
                  <li key={r.name}>
                    <span className="recipe-name">{r.name}</span>
                    <span className="metric metric--positive">{r.appealScore}</span>
                    <span className="badge badge--high" style={{ background: TREND_COLOR[r.trend] ? `${TREND_COLOR[r.trend]}22` : undefined, color: TREND_COLOR[r.trend] || '#7d8c7d' }}>{r.trend}</span>
                    <span className="recipe-tags">{r.tags.join(', ')}</span>
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
