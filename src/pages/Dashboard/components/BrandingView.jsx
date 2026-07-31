import React, { useEffect, memo } from 'react';
import { Palette, RefreshCw, Type, Sparkles, Volume2 } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import useAnalytics from '../../../hooks/useAnalytics';
import useDebounce from '../../../hooks/useDebounce';
import Card from '../../../components/Card/Card';
import Button from '../../../components/Button/Button';
import Badge from '../../../components/Badge/Badge';
import Skeleton from '../../../components/Skeleton/Skeleton';
import CopyButton from '../../../components/CopyButton/CopyButton';
import Reveal from '../../../components/Reveal/Reveal';
import './BrandingView.css';

const renderText = (val, fallback = '') => {
  if (!val) return fallback;
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (Array.isArray(val)) return val.map(item => renderText(item)).join(' ');
  if (typeof val === 'object') {
    return Object.entries(val)
      .map(([k, v]) => `${k.replace(/([A-Z])/g, ' $1')}: ${renderText(v)}`)
      .join(' • ');
  }
  return fallback;
};

const SwatchItem = memo(({ color }) => (
  <div className="swatch-item">
    <span className="swatch-name">{renderText(color.name, 'Accent Color')}</span>
    <div
      className="swatch-circle"
      style={{
        backgroundColor: color.hex || '#7C3AED',
        boxShadow: color.hex === '#0A0A0A' ? '0 0 0 1px #333' : '0 4px 12px rgba(0, 0, 0, 0.25)',
      }}
    />
    <div className="swatch-details">
      <span className="swatch-hex">{renderText(color.hex, '#7C3AED')}</span>
      <span className="swatch-usage">{renderText(color.role || color.usage, 'Brand Accent')}</span>
    </div>
    <CopyButton textToCopy={color.hex || '#7C3AED'} label="" size="sm" />
  </div>
));

export const BrandingView = () => {
  const { concept, isGenerating, generatingSection, regenerateSection } = useApp();
  const { logEvent } = useAnalytics();

  useEffect(() => {
    logEvent('page_view', { page: 'BrandingView' });
    if (concept && !concept.branding && !isGenerating) {
      regenerateSection('branding');
    }
  }, [concept?.id, concept?.name]);

  const handleRegenerateDebounced = useDebounce(() => {
    regenerateSection('branding');
  }, 500);

  const isLoading = isGenerating && (generatingSection === 'branding' || (!concept?.branding && generatingSection === null));

  if (isLoading) {
    return (
      <div className="branding-view animate-fade-in" aria-live="polite" role="region" aria-labelledby="branding-heading">
        <Skeleton height="140px" borderRadius="16px" />
        <Skeleton height="160px" borderRadius="16px" style={{ marginTop: '1.5rem' }} />
      </div>
    );
  }

  const brandingData = concept?.branding || {};
  const conceptName = concept?.concept?.startupName || concept?.name || 'Startup';
  const conceptTagline = concept?.concept?.tagline || concept?.tagline || 'AI Powered Solution';

  const palette = Array.isArray(brandingData.colorPalette) ? brandingData.colorPalette : [
    { name: 'Deep Onyx', hex: '#0A0A0A', role: 'Primary Background' },
    { name: 'Electric Violet', hex: '#7C3AED', role: 'Brand Primary Accent' },
    { name: 'Neon Indigo', hex: '#4F46E5', role: 'Gradient Secondary' },
    { name: 'Cyan Glow', hex: '#06B6D4', role: 'Highlights & Badges' },
    { name: 'Pure Quartz', hex: '#F9FAFB', role: 'Display Headings' },
  ];

  const headingFont = renderText(brandingData.typography?.heading, 'Plus Jakarta Sans');
  const bodyFont = renderText(brandingData.typography?.body, 'Inter');

  return (
    <div className="branding-view" role="region" aria-labelledby="branding-heading">
      <Reveal delay={0}>
        <div className="view-header-row">
          <div>
            <h2 id="branding-heading">Branding & Visual Identity</h2>
            <p>Brand naming options, color palettes, typography pairs, and logo concepts.</p>
          </div>
          <Button variant="secondary" size="sm" icon={RefreshCw} loading={isLoading} onClick={handleRegenerateDebounced}>
            Regenerate Brand System
          </Button>
        </div>
      </Reveal>

      {/* Brand Hero Card */}
      <Reveal delay={0.1}>
        <Card variant="glass" className="brand-hero-card">
          <div className="brand-hero-content">
            <Badge variant="primary" icon={Sparkles}>Brand Core</Badge>
            <h1 className="brand-name-display">{conceptName}</h1>
            <p className="brand-tagline-display">"{conceptTagline}"</p>
          </div>
          <CopyButton textToCopy={`${conceptName}: ${conceptTagline}`} label="Copy Brand Info" />
        </Card>
      </Reveal>

      {/* 5 Color Palette Swatches */}
      <Reveal delay={0.15}>
        <Card variant="surface" className="palette-card">
          <div className="card-title-row">
            <Palette size={20} className="text-purple" />
            <h3>Curated Color Palette</h3>
          </div>
          <div className="swatches-grid">
            {palette.map((color, idx) => (
              <Reveal key={idx} delay={0.05 * idx}>
                <SwatchItem color={color} />
              </Reveal>
            ))}
          </div>
        </Card>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="branding-grid-2">
          {/* Typography Pair */}
          <Card variant="glass" className="typography-card">
            <div className="card-title-row">
              <Type size={20} className="text-cyan" />
              <h3>Typography Pairing</h3>
            </div>
            <div className="type-specimen">
              <div className="type-group">
                <span className="type-role">Display / Headings Font:</span>
                <h3 className="font-preview font-display" style={{ fontFamily: headingFont }}>
                  {headingFont} — 800 ExtraBold
                </h3>
              </div>
              <div className="type-group">
                <span className="type-role">Body Text Font:</span>
                <p className="font-preview font-body" style={{ fontFamily: bodyFont }}>
                  {bodyFont} — 400 Regular
                </p>
              </div>
            </div>
          </Card>

          {/* Logo Concept Description */}
          <Card variant="glass" className="logo-concept-card">
            <div className="card-title-row">
              <Sparkles size={20} className="text-amber" />
              <h3>Logo Concept & Iconography</h3>
            </div>
            <p className="concept-desc">
              {renderText(brandingData.logoConceptDescription, `A stylized modern geometric logo combining precision, innovation, and brand identity for ${conceptName}.`)}
            </p>
            <div className="logo-prompt-box">
              <strong>Midjourney Prompt:</strong>
              <code>/imagine prompt: logo of {conceptName}, futuristic neon, minimalist dark background, 8k --v 6.0</code>
              <CopyButton textToCopy={`logo of ${conceptName}, futuristic neon, minimalist dark background, 8k`} size="sm" label="Copy Prompt" />
            </div>
          </Card>
        </div>
      </Reveal>

      {/* Brand Voice & Tone */}
      <Reveal delay={0.25}>
        <Card variant="surface" className="voice-card">
          <div className="card-title-row">
            <Volume2 size={20} className="text-emerald" />
            <h3>Brand Voice & Tone Guidelines</h3>
          </div>
          <div className="voice-pillars-grid">
            <div className="voice-pillar">
              <h4>Voice</h4>
              <p>{renderText(brandingData.brandVoice, 'Empowering, authoritative, modern, and user-centric.')}</p>
            </div>
            <div className="voice-pillar">
              <h4>Tone</h4>
              <p>{renderText(brandingData.brandTone, 'Calm, clear, precise, and data-driven.')}</p>
            </div>
          </div>
        </Card>
      </Reveal>
    </div>
  );
};

export default BrandingView;
