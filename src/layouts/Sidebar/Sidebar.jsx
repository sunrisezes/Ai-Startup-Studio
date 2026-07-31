import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Rocket,
  BarChart3,
  Palette,
  FileText,
  Target,
  Box,
  Cpu,
  Plus,
  Key,
  HelpCircle,
  Command,
  ChevronRight,
  FolderKanban,
  Check,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Logo from '../../components/Logo/Logo';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import './Sidebar.css';

const NAV_ITEMS = [
  { path: '/dashboard/overview', label: 'Overview', icon: Rocket },
  { path: '/dashboard/market', label: 'Market & Competitors', icon: BarChart3 },
  { path: '/dashboard/branding', label: 'Branding & Identity', icon: Palette },
  { path: '/dashboard/marketing', label: 'Marketing & Copy', icon: FileText },
  { path: '/dashboard/strategy', label: 'Business Strategy', icon: Target },
  { path: '/dashboard/launch', label: 'Launch Kit', icon: Box },
  { path: '/dashboard/tools', label: 'AI Builder Tools', icon: Cpu },
];

export const Sidebar = ({ isMobileOpen, onCloseMobile }) => {
  const {
    concept,
    activeConcept,
    savedConcepts,
    loadSavedConcept,
    saveConceptToLibrary,
    setIsApiKeyModalOpen,
    setIsGuidedTourOpen,
    setIsCommandPaletteOpen,
  } = useApp();

  const navigate = useNavigate();

  const handleNewConcept = () => {
    if (concept) {
      saveConceptToLibrary(concept);
    }
    navigate('/');
    if (onCloseMobile) onCloseMobile();
  };

  const handleTourStart = () => {
    localStorage.removeItem('hasSeenTour');
    setIsGuidedTourOpen(true);
    if (onCloseMobile) onCloseMobile();
  };

  const handlePrefetch = (path) => {
    if (!document.querySelector(`link[rel="prefetch"][data-path="${path}"]`)) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.setAttribute('data-path', path);
      link.href = path;
      document.head.appendChild(link);
    }
  };

  const currentConcept = concept || activeConcept;
  const currentName = currentConcept?.concept?.startupName || currentConcept?.name || 'Untitled Concept';

  return (
    <aside className={`sidebar ${isMobileOpen ? 'sidebar--mobile-open' : ''}`} data-tour-id="sidebar">
      {/* Mobile Close Button */}
      <button className="sidebar__mobile-close" onClick={onCloseMobile} aria-label="Close sidebar">
        <X size={20} />
      </button>

      {/* Brand Header */}
      <div className="sidebar__header" onClick={() => { navigate('/'); if (onCloseMobile) onCloseMobile(); }} style={{ cursor: 'pointer' }}>
        <Logo size="md" />
      </div>

      {/* Active Concept Card */}
      <div className="sidebar__concept-card">
        <div className="sidebar__concept-label">Active Concept</div>
        <div className="sidebar__concept-title">{currentName}</div>
        <button className="sidebar__new-btn" onClick={handleNewConcept}>
          <Plus size={14} /> New Concept
        </button>
      </div>

      {/* Main Navigation Links with Dynamic Link Prefetch */}
      <nav className="sidebar__nav" role="navigation" aria-label="Main Engine Modules">
        <div className="sidebar__section-label">Engine Modules</div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onMouseEnter={() => handlePrefetch(item.path)}
              onClick={() => { if (onCloseMobile) onCloseMobile(); }}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="sidebarActivePill"
                      className="sidebar__link-pill"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon className="sidebar__link-icon" size={18} />
                  <span className="sidebar__link-text">{item.label}</span>
                  <ChevronRight className="sidebar__link-arrow" size={14} />
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Saved Library Section (Up to 10 saved concepts) */}
      <div className="sidebar__library">
        <div className="sidebar__section-label">
          <FolderKanban size={13} style={{ marginRight: '4px' }} /> Saved Library ({savedConcepts.length}/10)
        </div>
        <div className="sidebar__library-list">
          {savedConcepts.slice(0, 10).map((sc, idx) => {
            const scName = sc.name || sc.data?.concept?.startupName || sc.data?.name || 'Untitled';
            const isActive = currentName === scName;

            return (
              <div
                key={sc.savedAt || idx}
                className={`sidebar__library-item ${isActive ? 'sidebar__library-item--active' : ''}`}
                onClick={() => {
                  loadSavedConcept(sc);
                  if (onCloseMobile) onCloseMobile();
                }}
              >
                <span className="sidebar__library-name">{scName}</span>
                {isActive && <Check size={14} className="text-emerald" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Actions & Footer */}
      <div className="sidebar__footer">
        <div className="sidebar__action-row">
          <button
            className="sidebar__footer-btn"
            onClick={() => { setIsApiKeyModalOpen(true); if (onCloseMobile) onCloseMobile(); }}
            title="Configure Groq API Key"
          >
            <Key size={16} /> API Key
          </button>

          <button
            className="sidebar__footer-btn"
            onClick={handleTourStart}
            title="Start Guided Tour"
          >
            <HelpCircle size={16} /> Tour
          </button>
        </div>

        <div className="sidebar__cmd-row" onClick={() => { setIsCommandPaletteOpen(true); if (onCloseMobile) onCloseMobile(); }}>
          <span className="sidebar__cmd-text"><Command size={12} /> Quick Search</span>
          <kbd className="sidebar__kbd">⌘K</kbd>
        </div>

        <div className="sidebar__theme-row">
          <span className="sidebar__theme-label">Appearance</span>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
