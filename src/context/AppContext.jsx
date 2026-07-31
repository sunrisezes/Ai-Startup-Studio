import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateSection, generateStartupConcept as generateConceptApi } from '../services/generatorEngine';
import useAnalytics from '../hooks/useAnalytics';
import { useToast } from './ToastContext';

const AppContext = createContext();

const MOCK_CONCEPT = {
  id: 'concept-1',
  name: 'NeuroFlow AI',
  tagline: 'Deep focus & mental clarity for remote software engineers',
  category: 'Developer Tools & Productivity',
  createdAt: new Date().toISOString(),
  concept: {
    startupName: 'NeuroFlow AI',
    tagline: 'Deep focus & mental clarity for remote software engineers',
    category: 'Developer Tools & Productivity',
    domainNames: [
      { name: 'neuroflow.ai', tldType: 'AI Premium' },
      { name: 'getneuroflow.com', tldType: 'Standard .com' },
      { name: 'neuroflow.io', tldType: 'Tech .io' },
      { name: 'neuroflow.app', tldType: 'App Domain' },
    ],
    missionStatement: 'To eliminate cognitive fatigue and context-switching friction for 10 million knowledge workers by providing adaptive, real-time AI focus environments.',
    visionStatement: 'To redefine personal productivity in the spatial and AI computing era, empowering developers to achieve uninterrupted flow state effortlessly.',
    elevatorPitch: 'NeuroFlow AI is an intelligent workspace co-pilot that monitors real-time biometric and digital telemetry to block distractions, summarize context switches, and automatically schedule high-cognitive-load coding sessions when developers are at peak focus capacity.',
    investorSummary: {
      coreProblem: 'Software engineers lose 3.5 hours daily to context switching, notification overload, and mental fatigue across fragmented dev tools.',
      proprietarySolution: 'An autonomous AI context-engine that dynamically shields focus, automates status updates, and predicts optimal deep-work windows.',
      marketOpportunity: '$42B Global Productivity & Developer Tools Market, growing at 22% CAGR with massive remote-work adoption.'
    }
  },
  mission: 'To eliminate cognitive fatigue and context-switching friction for 10 million knowledge workers by providing adaptive, real-time AI focus environments.',
  vision: 'To redefine personal productivity in the spatial and AI computing era, empowering developers to achieve uninterrupted flow state effortlessly.',
  elevatorPitch: 'NeuroFlow AI is an intelligent workspace co-pilot that monitors real-time biometric and digital telemetry to block distractions, summarize context switches, and automatically schedule high-cognitive-load coding sessions when developers are at peak focus capacity.',
  problem: 'Software engineers lose 3.5 hours daily to context switching, notification overload, and mental fatigue across fragmented dev tools.',
  solution: 'An autonomous AI context-engine that dynamically shields focus, automates status updates, and predicts optimal deep-work windows.',
  marketOpportunity: '$42B Global Productivity & Developer Tools Market, growing at 22% CAGR with massive remote-work adoption.',
};

export const AppProvider = ({ children }) => {
  const { showToast } = useToast();
  const { logEvent } = useAnalytics();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const [concept, setConcept] = useState(MOCK_CONCEPT);
  const [activeConcept, setActiveConcept] = useState(MOCK_CONCEPT);

  // Saved concepts list (max 10 items)
  const [savedConcepts, setSavedConcepts] = useState(() => {
    const stored = localStorage.getItem('savedConcepts');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse savedConcepts:', e);
      }
    }
    return [{ name: 'NeuroFlow AI', data: MOCK_CONCEPT, savedAt: new Date().toISOString() }];
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingSection, setGeneratingSection] = useState(null);
  const [error, setError] = useState(null);
  const [failedSection, setFailedSection] = useState(null);

  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isGuidedTourOpen, setIsGuidedTourOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);

  // URL parameter check on mount (?data=ENCODED)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dataParam = params.get('data');
    if (dataParam) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(dataParam)));
        setConcept(decoded);
        setActiveConcept(decoded);
        showToast('Loaded concept from shareable link!', 'success');
        return; // Skip localStorage hydration when URL data is present
      } catch (err) {
        console.error('Failed to decode shareable URL data:', err);
      }
    }

    // Fallback to localStorage hydration
    const saved = localStorage.getItem('aiStartupConcept');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConcept(parsed);
        setActiveConcept(parsed);
      } catch (e) {
        console.error('Failed to parse saved concept from localStorage:', e);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.dataset.theme = theme;
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Helper to save concept to savedConcepts array (max 10 items)
  const saveConceptToLibrary = (conceptData) => {
    const startupName = conceptData.concept?.startupName || conceptData.name || 'Untitled Startup';
    const newItem = {
      name: startupName,
      data: conceptData,
      savedAt: new Date().toISOString(),
    };

    setSavedConcepts(prev => {
      const filtered = prev.filter(c => (c.name !== startupName && c.data?.id !== conceptData.id));
      const updated = [newItem, ...filtered].slice(0, 10);
      localStorage.setItem('savedConcepts', JSON.stringify(updated));
      return updated;
    });
  };

  const createNewConcept = async (ideaText) => {
    setIsGenerating(true);
    setError(null);
    try {
      const generated = await generateConceptApi(ideaText);
      setConcept(generated);
      setActiveConcept(generated);
      saveConceptToLibrary(generated);
      localStorage.setItem('aiStartupConcept', JSON.stringify(generated));
      showToast('New startup concept synthesized successfully!', 'success');
      logEvent('section_generated', { sectionKey: 'concept', startupName: generated.name || generated.concept?.startupName });
      return generated;
    } catch (err) {
      setError(err.message || 'Generation failed');
      showToast(err.message || 'Failed to synthesize concept', 'error');
      logEvent('api_error', { sectionKey: 'concept', error: err.message });
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  const regenerateSection = async (sectionKey) => {
    setIsGenerating(true);
    setGeneratingSection(sectionKey);
    setError(null);
    setFailedSection(null);
    try {
      const result = await generateSection(sectionKey, concept);
      const updated = { ...concept, [sectionKey]: result };
      setConcept(updated);
      setActiveConcept(updated);
      saveConceptToLibrary(updated);
      localStorage.setItem('aiStartupConcept', JSON.stringify(updated));
      showToast('Section updated successfully', 'success');
      logEvent('section_generated', { sectionKey, startupName: updated.name || updated.concept?.startupName });
    } catch (err) {
      setError(err.message || 'Generation failed');
      setFailedSection(sectionKey);
      showToast(err.message || 'Generation failed', 'error');
      logEvent('api_error', { sectionKey, error: err.message });
    } finally {
      setIsGenerating(false);
      setGeneratingSection(null);
    }
  };

  const loadSavedConcept = (savedItem) => {
    const conceptData = savedItem.data || savedItem;
    setConcept(conceptData);
    setActiveConcept(conceptData);
    localStorage.setItem('aiStartupConcept', JSON.stringify(conceptData));
    showToast(`Loaded ${savedItem.name || 'concept'}`, 'success');
    logEvent('concept_loaded', { startupName: savedItem.name });
  };

  const value = {
    theme,
    toggleTheme,
    concept: concept || activeConcept,
    setConcept,
    activeConcept,
    setActiveConcept,
    savedConcepts,
    createNewConcept,
    loadSavedConcept,
    saveConceptToLibrary,
    isGenerating,
    setGenerating: setIsGenerating,
    generatingSection,
    setGeneratingSection,
    error,
    setError,
    failedSection,
    setFailedSection,
    regenerateSection,
    isApiKeyModalOpen,
    setIsApiKeyModalOpen,
    isGuidedTourOpen,
    setIsGuidedTourOpen,
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    isPresentationOpen,
    setIsPresentationOpen
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
