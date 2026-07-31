import React from 'react';
import Button from '../Button/Button';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  handleResetState = () => {
    localStorage.removeItem('aiStartupConcept');
    sessionStorage.clear();
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            background: '#0A0A0A',
            color: '#F9FAFB',
          }}
        >
          <h2 style={{ marginBottom: '0.75rem', color: '#7C3AED' }}>
            Navigation Error Recovered
          </h2>
          <p style={{ color: '#9CA3AF', marginBottom: '0.5rem', maxWidth: '540px' }}>
            {this.state.error?.message || 'A temporary loading error occurred during page navigation.'}
          </p>
          <p style={{ color: '#6B7280', fontSize: '0.85rem', marginBottom: '1.5rem', maxWidth: '480px' }}>
            Click reload to refresh the workspace or reset session state if the issue persists.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button variant="primary" onClick={this.handleReload}>
              Reload Studio
            </Button>
            <Button variant="secondary" onClick={this.handleResetState}>
              Reset Session State
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
