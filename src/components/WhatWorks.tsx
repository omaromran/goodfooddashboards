import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { whatWorks, whatDoesntWork, customerPainPoints } from '../data/whatWorks';
import './Section.css';

export function WhatWorks() {
  return (
    <section id="what-works" className="section Section">
      <h1 className="section-title">What works & what doesn't</h1>
      <p className="section-lead">
        Evidence-based view of product, CX, and operations to double down on vs fix.
      </p>

      <div className="grid-2">
        <div className="card">
          <h3>What works — keep doing</h3>
          <ul className="works-list">
            {whatWorks.map((w) => (
              <li key={w.area}>
                <span className="badge badge--high">{w.impact}</span>
                <strong>{w.area}</strong>
                <span className="works-evidence">{w.evidence}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>What doesn't work — fix or stop</h3>
          <ul className="works-list">
            {whatDoesntWork.map((w) => (
              <li key={w.area}>
                <span className="badge badge--medium">{w.impact}</span>
                <strong>{w.area}</strong>
                <span className="works-evidence">{w.evidence}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card">
        <h3>Customer pain points (% of complaints)</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={customerPainPoints} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d4e0d4" style={{}} />
              <XAxis type="number" tick={{ fill: '#5c6b5c', fontSize: 11 }} />
              <YAxis type="category" dataKey="pain" width={180} tick={{ fill: '#5c6b5c', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d4e0d4', color: '#1a2e1a' }} formatter={(v: number | undefined) => [`${v ?? 0}%`, '']} />
              <Bar dataKey="frequency" fill="#c53030" radius={[0, 4, 4, 0]} name="% of complaints" isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
