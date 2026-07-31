import React from 'react';
import { AlertCircle, RefreshCw, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Button from '../Button/Button';
import './ErrorBanner.css';

export const ErrorBanner = () => {
  const { error, setError, failedSection, regenerateSection } = useApp();

  if (!error) return null;

  const handleRetry = () => {
    if (failedSection) {
      regenerateSection(failedSection);
    } else {
      setError(null);
    }
  };

  return (
    <div className="error-banner animate-slide-up">
      <div className="error-banner__content">
        <AlertCircle size={20} className="error-banner__icon" />
        <span className="error-banner__message">{error}</span>
      </div>
      <div className="error-banner__actions">
        <Button variant="secondary" size="sm" icon={RefreshCw} onClick={handleRetry}>
          Retry
        </Button>
        <button
          type="button"
          className="error-banner__close"
          onClick={() => setError(null)}
          aria-label="Dismiss error"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default ErrorBanner;
