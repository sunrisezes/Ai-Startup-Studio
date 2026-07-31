import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Presentation, Download, Share2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { exportDashboardPdf } from '../../utils/exportPdf';
import Button from '../Button/Button';
import './PresentationModal.css';

export const PresentationModal = () => {
  const { isPresentationOpen, setIsPresentationOpen, concept } = useApp();
  const { showToast } = useToast();
  const [slide, setSlide] = useState(0);

  if (!isPresentationOpen) return null;

  const conceptName = concept?.concept?.startupName || concept?.name || 'NeuroFlow AI';
  const conceptTagline = concept?.concept?.tagline || concept?.tagline || 'Deep focus & mental clarity for software engineers';

  const slides = [
    {
      tag: 'Slide 01 — Vision & Brand',
      title: conceptName,
      subtitle: conceptTagline,
      body: concept?.concept?.elevatorPitch || concept?.elevatorPitch || 'Intelligent co-pilot shielding remote developers from cognitive fatigue.',
    },
    {
      tag: 'Slide 02 — Problem & Solution',
      title: 'The Core Opportunity',
      subtitle: 'Eliminating Context Switching & Mental Fatigue',
      body: `PROBLEM: ${concept?.concept?.investorSummary?.coreProblem || concept?.problem || 'Software engineers lose 3.5 hrs daily to context switching.'}\n\nSOLUTION: ${concept?.concept?.investorSummary?.proprietarySolution || concept?.solution || 'Autonomous AI context engine shielding focus.'}`,
    },
    {
      tag: 'Slide 03 — Market & Monetization',
      title: 'Business Engine & GTM',
      subtitle: '$42B Total Addressable Market',
      body: concept?.concept?.investorSummary?.marketOpportunity || concept?.marketOpportunity || '$42B Global Productivity & DevTools Market growing at 22% CAGR.',
    },
  ];

  const handleExportPdf = () => {
    exportDashboardPdf('presentation-slide-box', `${conceptName.toLowerCase().replace(/\s+/g, '-')}-pitch-deck.pdf`);
  };

  const handleCopyShareableLink = () => {
    try {
      const jsonStr = JSON.stringify(concept);
      const encoded = btoa(encodeURIComponent(jsonStr));
      const shareUrl = `${window.location.origin}/dashboard/overview?data=${encoded}`;
      navigator.clipboard.writeText(shareUrl);
      showToast('Shareable link copied to clipboard!', 'success');
    } catch (err) {
      console.error('Failed to create shareable link:', err);
      showToast('Failed to copy shareable link', 'error');
    }
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={() => setIsPresentationOpen(false)}>
      <div className="presentation-card animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="presentation-header">
          <div className="presentation-badge">
            <Presentation size={18} /> Pitch Deck Presentation Mode
          </div>
          <div className="presentation-header-actions">
            <Button variant="secondary" size="sm" icon={Share2} onClick={handleCopyShareableLink}>
              Copy Shareable Link
            </Button>
            <Button variant="secondary" size="sm" icon={Download} onClick={handleExportPdf}>
              Export as PDF
            </Button>
            <button className="modal-close" onClick={() => setIsPresentationOpen(false)}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="presentation-slide" id="presentation-slide-box">
          <span className="slide-tag">{slides[slide].tag}</span>
          <h2 className="slide-title">{slides[slide].title}</h2>
          <p className="slide-subtitle">{slides[slide].subtitle}</p>
          <div className="slide-body-box">{slides[slide].body}</div>
        </div>

        <div className="presentation-controls">
          <Button
            variant="ghost"
            icon={ChevronLeft}
            disabled={slide === 0}
            onClick={() => setSlide(prev => Math.max(0, prev - 1))}
          >
            Previous
          </Button>

          <span className="slide-indicator">
            Slide {slide + 1} of {slides.length}
          </span>

          <Button
            variant="primary"
            icon={ChevronRight}
            iconPosition="right"
            disabled={slide === slides.length - 1}
            onClick={() => setSlide(prev => Math.min(slides.length - 1, prev + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PresentationModal;
