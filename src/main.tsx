import { createRoot } from 'react-dom/client';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { ErrorBoundary } from './ErrorBoundary.tsx';

const GoodfoodGrowthStrategy = lazy(() => import('./components/GoodfoodGrowthStrategy.tsx'));
const CanadaMealKitDemographics = lazy(() => import('./components/CanadaMealKitDemographics.tsx'));
const CanadaRTE = lazy(() => import('./components/CanadaRTE.tsx'));

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element #root not found');

const root = createRoot(rootEl);
root.render(
  <ErrorBoundary
    fallback={
      <div style={{ padding: '2rem', fontFamily: 'system-ui', color: '#c53030' }}>
        <h1>Dashboard failed to load</h1>
        <p>Open the browser Console (F12 → Console) to see the error.</p>
      </div>
    }
  >
    <BrowserRouter>
      <Suspense
        fallback={
          <div style={{ padding: '2rem', fontFamily: 'system-ui', color: 'var(--text-muted)' }}>
            Loading…
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<GoodfoodGrowthStrategy />} />
          <Route path="/canada-meal-kit-demographics" element={<CanadaMealKitDemographics />} />
          <Route path="/canada-rte" element={<CanadaRTE />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </ErrorBoundary>,
);
