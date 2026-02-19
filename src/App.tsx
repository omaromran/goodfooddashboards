import { Layout } from './components/Layout';
import { ErrorBoundary } from './ErrorBoundary';
import { MarketAnalysis } from './components/MarketAnalysis';
import CompetitiveAnalysis from './components/CompetitiveAnalysis';
import { RecipeDemographics } from './components/RecipeDemographics';
import { BrandReputation } from './components/BrandReputation';
import { WhatWorks } from './components/WhatWorks';

function SectionFallback({ name }: { name: string }) {
  return (
    <section style={{ padding: '2rem', color: 'var(--text-muted)' }}>
      <p>{name} could not be loaded.</p>
    </section>
  );
}

function App() {
  return (
    <Layout>
      <ErrorBoundary fallback={<SectionFallback name="Market analysis" />}>
        <MarketAnalysis />
      </ErrorBoundary>
      <ErrorBoundary fallback={<SectionFallback name="Competitive landscape" />}>
        <CompetitiveAnalysis />
      </ErrorBoundary>
      <ErrorBoundary fallback={<SectionFallback name="Recipes & demographics" />}>
        <RecipeDemographics />
      </ErrorBoundary>
      <ErrorBoundary fallback={<SectionFallback name="Brand reputation" />}>
        <BrandReputation />
      </ErrorBoundary>
      <ErrorBoundary fallback={<SectionFallback name="What works" />}>
        <WhatWorks />
      </ErrorBoundary>
    </Layout>
  );
}

export default App;
