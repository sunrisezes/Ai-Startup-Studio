import React, { useState, lazy, Suspense } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import {
  Search,
  Zap,
  Download,
  Presentation,
  ChevronRight,
  Home as HomeIcon,
  Menu
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Sidebar from '../Sidebar/Sidebar';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import CopyButton from '../../components/CopyButton/CopyButton';
import ApiKeyModal from '../../components/ApiKeyModal/ApiKeyModal';
import PresentationModal from '../../components/PresentationModal/PresentationModal';
import { exportDashboardPdf } from '../../utils/exportPdf';
import './DashboardLayout.css';

// Lazy load GuidedTour and CommandPalette for optimized bundle performance
const GuidedTour = lazy(() => import('../../components/GuidedTour/GuidedTour'));
const CommandPalette = lazy(() => import('../../components/CommandPalette/CommandPalette'));

const SECTION_NAMES = {
  '/dashboard/overview': 'Overview',
  '/dashboard/market': 'Market & Competitors',
  '/dashboard/branding': 'Branding & Identity',
  '/dashboard/marketing': 'Marketing & Copy',
  '/dashboard/strategy': 'Business Strategy',
  '/dashboard/launch': 'Launch Kit',
  '/dashboard/tools': 'AI Builder Tools',
};

export const DashboardLayout = () => {
  const location = useLocation();
  const {
    concept,
    activeConcept,
    setIsCommandPaletteOpen,
    setIsPresentationOpen
  } = useApp();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const currentConcept = concept || activeConcept;
  const currentSectionName = SECTION_NAMES[location.pathname] || 'Overview';

  const handlePdfExport = () => {
    exportDashboardPdf('dashboard-root', `${currentConcept?.name || 'startup'}-pack.pdf`);
  };

  return (
    <div className={`dashboard-grid ${isMobileOpen ? 'sidebar-open' : ''}`}>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div className="mobile-overlay-backdrop" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* 300px Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} onCloseMobile={() => setIsMobileOpen(false)} />

      {/* Main Content Area */}
      <div className="dashboard-main">
        {/* Header Bar */}
        <header className="dashboard-header" role="banner">
          <div className="dashboard-header__left">
            {/* Hamburger Button for Mobile */}
            <button
              className="dashboard-header__hamburger"
              onClick={() => setIsMobileOpen(prev => !prev)}
              aria-label="Toggle mobile navigation menu"
            >
              <Menu size={20} />
            </button>

            {/* Breadcrumb */}
            <div className="dashboard-header__breadcrumb">
              <Link to="/" className="breadcrumb-item">
                <HomeIcon size={14} /> Home
              </Link>
              <ChevronRight size={14} className="breadcrumb-separator" />
              <span className="breadcrumb-item">Dashboard</span>
              <ChevronRight size={14} className="breadcrumb-separator" />
              <span className="breadcrumb-item breadcrumb-item--active">
                {currentSectionName}
              </span>
            </div>
          </div>

          {/* Search Pill */}
          <button
            className="dashboard-header__search-pill"
            onClick={() => setIsCommandPaletteOpen(true)}
          >
            <Search size={14} />
            <span>Search or command...</span>
            <kbd>⌘K</kbd>
          </button>

          {/* Actions & Badges Group */}
          <div className="dashboard-header__actions">
            {/* Groq AI Active green badge */}
            <Badge variant="emerald" dot icon={Zap}>
              Groq Llama 3.3 70B ✓
            </Badge>

            {/* Copy All Button */}
            <CopyButton
              textToCopy={`Startup Concept: ${currentConcept?.name}\nTagline: ${currentConcept?.tagline}`}
              label="Copy All"
            />

            {/* PDF Export Button */}
            <Button
              variant="secondary"
              size="sm"
              icon={Download}
              onClick={handlePdfExport}
              data-tour-id="pdf-export-btn"
            >
              PDF Export
            </Button>

            {/* Pitch Deck Purple Button */}
            <Button
              variant="primary"
              size="sm"
              icon={Presentation}
              onClick={() => setIsPresentationOpen(true)}
            >
              Pitch Deck
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </header>

        {/* Dashboard Dynamic Viewport */}
        <main className="dashboard-body" id="dashboard-content-area" role="main">
          <Outlet />
        </main>
      </div>

      {/* Global Dashboard Modals */}
      <ApiKeyModal />
      <PresentationModal />

      <Suspense fallback={null}>
        <GuidedTour />
        <CommandPalette />
      </Suspense>
    </div>
  );
};

export default DashboardLayout;
