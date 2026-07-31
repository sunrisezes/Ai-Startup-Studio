import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import useSmoothScroll from './hooks/useSmoothScroll';
import GradientMesh from './components/GradientMesh/GradientMesh';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Skeleton from './components/Skeleton/Skeleton';
import Home from './pages/Home/Home';
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout';
import DashboardSection from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';

function GlobalFallback() {
  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: '#0A0A0A', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Skeleton height="60px" borderRadius="12px" />
      <Skeleton height="200px" borderRadius="16px" />
      <Skeleton height="300px" borderRadius="16px" />
    </div>
  );
}

function AppContent() {
  useSmoothScroll();

  return (
    <ErrorBoundary>
      <GradientMesh />
      <Suspense fallback={<GlobalFallback />}>
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={<Home />} />

          {/* Dashboard Layout with Nested Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard/overview" replace />} />
            <Route path="overview" element={<DashboardSection />} />
            <Route path="market" element={<DashboardSection />} />
            <Route path="branding" element={<DashboardSection />} />
            <Route path="marketing" element={<DashboardSection />} />
            <Route path="strategy" element={<DashboardSection />} />
            <Route path="launch" element={<DashboardSection />} />
            <Route path="tools" element={<DashboardSection />} />
          </Route>

          {/* 404 Catch All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <AppProvider>
          <Router>
            <AppContent />
          </Router>
        </AppProvider>
      </ToastProvider>
    </MotionConfig>
  );
}

export default App;
