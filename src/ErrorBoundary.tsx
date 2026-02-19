import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Dashboard error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div style={{
          padding: '2rem',
          fontFamily: 'system-ui, sans-serif',
          maxWidth: '600px',
          margin: '2rem auto',
        }}>
          <h1 style={{ color: '#c53030', marginBottom: '0.5rem' }}>Something went wrong</h1>
          <p style={{ color: '#5c6b5c', marginBottom: '1rem' }}>
            The dashboard failed to load. Try refreshing the page.
          </p>
          <pre style={{
            padding: '1rem',
            background: '#f5f8f5',
            borderRadius: '8px',
            fontSize: '0.85rem',
            overflow: 'auto',
          }}>
            {this.state.error.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
