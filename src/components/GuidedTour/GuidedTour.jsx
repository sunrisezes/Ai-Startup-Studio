import React, { useState, useEffect } from 'react';
import { ChevronRight, X, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Button from '../Button/Button';
import './GuidedTour.css';

const TOUR_STEPS = [
  {
    targetId: 'sidebar',
    title: '1. Sidebar Engine Navigation',
    content: 'Switch between 7 AI engine modules: Overview, Market, Branding, Copywriting, Strategy, Launch Kit, and AI Builder Tools.',
  },
  {
    targetId: 'theme-toggle',
    title: '2. Dynamic Dark / Light Themes',
    content: 'Toggle your preferred workspace color theme anytime. Theme settings persist across sessions.',
  },
  {
    targetId: 'regenerate-btn',
    title: '3. Real-Time Section Regenerate',
    content: 'Re-run Groq Llama AI engine to synthesize fresh data, domain names, or copy for any specific module.',
  },
  {
    targetId: 'copy-button',
    title: '4. One-Click Copy Buttons',
    content: 'Quickly copy elevator pitches, mission statements, headlines, or complete concept documentation.',
  },
  {
    targetId: 'pdf-export-btn',
    title: '5. Instant PDF Pack Export',
    content: 'Generate and download a high-res investor PDF pack with custom headers and page numbering.',
  },
];

export const GuidedTour = () => {
  const { isGuidedTourOpen, setIsGuidedTourOpen } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenTour');
    if (!hasSeen && !isGuidedTourOpen) {
      // Auto-trigger tour on first visit
      setIsGuidedTourOpen(true);
    }
  }, [isGuidedTourOpen, setIsGuidedTourOpen]);

  if (!isGuidedTourOpen) return null;

  const currentStepData = TOUR_STEPS[currentStep];

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      localStorage.setItem('hasSeenTour', 'true');
      setIsGuidedTourOpen(false);
      setCurrentStep(0);
    }
  };

  const handleClose = () => {
    localStorage.setItem('hasSeenTour', 'true');
    setIsGuidedTourOpen(false);
    setCurrentStep(0);
  };

  return (
    <div className="tour-overlay animate-fade-in" onClick={handleClose}>
      <div className="tour-card animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="tour-header">
          <div className="tour-title-group">
            <Sparkles className="tour-icon" size={18} />
            <span>Interactive Guided Tour ({currentStep + 1}/{TOUR_STEPS.length})</span>
          </div>
          <button className="modal-close" onClick={handleClose}>
            <X size={18} />
          </button>
        </div>

        <div className="tour-body">
          <h3>{currentStepData.title}</h3>
          <p>{currentStepData.content}</p>
        </div>

        <div className="tour-footer">
          <div className="tour-dots">
            {TOUR_STEPS.map((_, i) => (
              <span key={i} className={`tour-dot ${i === currentStep ? 'tour-dot--active' : ''}`} />
            ))}
          </div>
          <Button variant="primary" icon={ChevronRight} iconPosition="right" onClick={handleNext}>
            {currentStep === TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next Step'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GuidedTour;
