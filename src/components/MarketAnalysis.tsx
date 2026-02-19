import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  Cell,
} from 'recharts';
import { marketSize, regionalOpportunity, marketDrivers } from '../data/market';
import './Section.css';

export function MarketAnalysis() {
  const sizeData = [
    { name: 'Meal kits', value: marketSize.mealKits, fill: '#7d8c7d' },
    { name: 'Ready-to-eat', value: marketSize.readyToEat, fill: '#2d6a4f' },
    { name: 'Prepared (retail)', value: marketSize.preparedMeals, fill: '#40916c' },
    { name: 'Other', value: marketSize.other, fill: '#b0bdb0' },
  ];

  return (
    <section id="market" className="section Section">
      <h1 className="section-title">Market analysis — Canada</h1>
      <p className="section-lead">
        Total addressable meal solutions market ~$2.8B CAD. Meal kits are shrinking; ready-to-eat is the growth engine.
      </p>

      <div className="grid-2">
        <div className="card">
          <h3>Market size by segment ($B CAD)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sizeData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d4e0d4" style={{}} />
                <XAxis type="number" tick={{ fill: '#5c6b5c', fontSize: 11 }} />
                <YAxis type="category" dataKey="name" width={120} tick={{ fill: '#5c6b5c', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ background: '#ffffff', border: '1px solid #d4e0d4', color: '#1a2e1a' }}
                  formatter={(value: number | undefined) => [`$${value ?? 0}B`, '']}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} isAnimationActive={false}>
                  {sizeData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3>Segment growth (indexed, 2022 = 100)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { year: '2022', 'Meal kits': 100, 'Ready-to-eat': 100, 'Prepared (retail)': 100 },
                { year: '2023', 'Meal kits': 92, 'Ready-to-eat': 118, 'Prepared (retail)': 108 },
                { year: '2024', 'Meal kits': 85, 'Ready-to-eat': 142, 'Prepared (retail)': 115 },
                { year: '2025', 'Meal kits': 78, 'Ready-to-eat': 168, 'Prepared (retail)': 122 },
                { year: '2026e', 'Meal kits': 72, 'Ready-to-eat': 198, 'Prepared (retail)': 128 },
              ]} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d4e0d4" style={{}} />
                <XAxis dataKey="year" tick={{ fill: '#5c6b5c', fontSize: 11 }} />
                <YAxis tick={{ fill: '#5c6b5c', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d4e0d4', color: '#1a2e1a' }} />
                <Legend />
                <Line type="monotone" dataKey="Meal kits" stroke="#7d8c7d" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false} />
                <Line type="monotone" dataKey="Ready-to-eat" stroke="#2d6a4f" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false} />
                <Line type="monotone" dataKey="Prepared (retail)" stroke="#40916c" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Regional opportunity (population share vs RTE penetration & growth index)</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={regionalOpportunity}
              margin={{ top: 5, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#d4e0d4" style={{}} />
              <XAxis dataKey="region" tick={{ fill: '#5c6b5c', fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fill: '#5c6b5c', fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#5c6b5c', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d4e0d4', color: '#1a2e1a' }} />
              <Legend />
              <Bar yAxisId="left" dataKey="populationShare" name="Pop. share %" fill="#40916c" radius={[4, 4, 0, 0]} isAnimationActive={false} />
              <Bar yAxisId="left" dataKey="rtePenetration" name="RTE penetration %" fill="#2d6a4f" radius={[4, 4, 0, 0]} isAnimationActive={false} />
              <Bar yAxisId="right" dataKey="growthIndex" name="Growth index" fill="#d4732f" radius={[4, 4, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3>Market drivers (impact vs certainty)</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Driver</th>
                <th>Impact (0–100)</th>
                <th>Certainty</th>
              </tr>
            </thead>
            <tbody>
              {marketDrivers.map((d) => (
                <tr key={d.driver}>
                  <td>{d.driver}</td>
                  <td><span className="metric metric--positive">{d.impact}</span></td>
                  <td><span className={`badge badge--${d.certainty === 'high' ? 'high' : 'medium'}`}>{d.certainty}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
