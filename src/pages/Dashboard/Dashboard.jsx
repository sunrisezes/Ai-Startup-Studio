import React, { Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import ErrorBanner from '../../components/ErrorBanner/ErrorBanner';
import Skeleton from '../../components/Skeleton/Skeleton';
import './Dashboard.css';

const OverviewView = lazy(() => import('./components/OverviewView'));
const MarketView = lazy(() => import('./components/MarketView'));
const BrandingView = lazy(() => import('./components/BrandingView'));
const MarketingView = lazy(() => import('./components/MarketingView'));
const BusinessView = lazy(() => import('./components/BusinessView'));
const LaunchView = lazy(() => import('./components/LaunchView'));
const AIBuilderToolsView = lazy(() => import('./components/AIBuilderToolsView'));

const FallbackSkeleton = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem' }}>
    <Skeleton height="140px" borderRadius="16px" />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
      <Skeleton height="200px" borderRadius="16px" />
      <Skeleton height="200px" borderRadius="16px" />
    </div>
  </div>
);

export const DashboardSection = () => {
  const location = useLocation();

  const renderView = () => {
    switch (location.pathname) {
      case '/dashboard/overview':
        return <OverviewView />;
      case '/dashboard/market':
        return <MarketView />;
      case '/dashboard/branding':
        return <BrandingView />;
      case '/dashboard/marketing':
        return <MarketingView />;
      case '/dashboard/strategy':
        return <BusinessView />;
      case '/dashboard/launch':
        return <LaunchView />;
      case '/dashboard/tools':
        return <AIBuilderToolsView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="dashboard-content-wrapper" id="dashboard-root">
      {/* Top Fixed Error Banner */}
      <ErrorBanner />

      {/* Code-Split Dynamic Engine View */}
      <Suspense fallback={<FallbackSkeleton />}>
        {renderView()}
      </Suspense>
    </div>
  );
};

export default DashboardSection;
