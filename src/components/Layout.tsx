import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const SECTIONS = [
  { id: 'market', label: 'Market analysis' },
  { id: 'competitors', label: 'Competitive landscape' },
  { id: 'recipes', label: 'Recipes & demographics' },
  { id: 'brand', label: 'Brand reputation' },
  { id: 'what-works', label: "What works / doesn't" },
];

export function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('layout-menu-open');
    } else {
      document.body.classList.remove('layout-menu-open');
    }
    return () => document.body.classList.remove('layout-menu-open');
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className={`layout ${menuOpen ? 'layout--menu-open' : ''}`}>
      <header className="layout-header">
        <div className="layout-header-inner">
          <button
            type="button"
            className="layout-menu-btn"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span className="layout-menu-icon" aria-hidden />
          </button>
          <span className="logo">GoodFood</span>
          <span className="tagline">Canada — Growth & Strategy Dashboard</span>
          <>
            <Link to="/canada-meal-kit-demographics" className="layout-demographics-link">
              Meal kit demographics
            </Link>
            <Link to="/canada-rte" className="layout-demographics-link">
              Ready-to-eat (RTE)
            </Link>
            <Link to="/goodai/subscribers" className="layout-demographics-link">
              GoodAI subscribers
            </Link>
          </>
        </div>
      </header>
      <div
        className="layout-overlay"
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />
      <aside className="layout-nav">
        <div className="layout-nav-header">
          <span className="layout-nav-title">Sections</span>
          <button
            type="button"
            className="layout-nav-close"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
        </div>
        <nav>
          {SECTIONS.map(({ id, label }) => (
            <button key={id} type="button" className="nav-link" onClick={() => scrollTo(id)}>
              {label}
            </button>
          ))}
          <Link to="/canada-meal-kit-demographics" className="nav-link layout-nav-page-link">
            Canada meal kit demographics
          </Link>
          <Link to="/canada-rte" className="nav-link layout-nav-page-link">
            Ready-to-eat (RTE)
          </Link>
          <Link to="/goodai/subscribers" className="nav-link layout-nav-page-link">
            GoodAI subscribers
          </Link>
        </nav>
      </aside>
      <main className="layout-main">
        {children}
      </main>
    </div>
  );
}
