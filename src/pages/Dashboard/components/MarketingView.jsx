import React, { useEffect } from 'react';
import { RefreshCw, Sparkles, Mail, Target, Megaphone } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import useAnalytics from '../../../hooks/useAnalytics';
import useDebounce from '../../../hooks/useDebounce';
import Card from '../../../components/Card/Card';
import Button from '../../../components/Button/Button';
import Badge from '../../../components/Badge/Badge';
import Skeleton from '../../../components/Skeleton/Skeleton';
import CopyButton from '../../../components/CopyButton/CopyButton';
import './MarketingView.css';

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

export const MarketingView = () => {
  const { concept, isGenerating, generatingSection, regenerateSection } = useApp();
  const { logEvent } = useAnalytics();

  useEffect(() => {
    logEvent('page_view', { page: 'MarketingView' });
    if (concept && !concept.marketing && !isGenerating) {
      regenerateSection('marketing');
    }
  }, [concept?.id, concept?.name]);

  const handleRegenerateDebounced = useDebounce(() => {
    regenerateSection('marketing');
  }, 500);

  const isLoading = isGenerating && (generatingSection === 'marketing' || (!concept?.marketing && generatingSection === null));

  if (isLoading) {
    return (
      <div className="marketing-view animate-fade-in" aria-live="polite" role="region" aria-labelledby="marketing-heading">
        <Skeleton height="180px" borderRadius="16px" />
      </div>
    );
  }

  const mktData = concept?.marketing || {};
  const conceptName = concept?.concept?.startupName || concept?.name || 'Startup';
  const conceptTagline = concept?.concept?.tagline || concept?.tagline || 'AI Solution';

  const headlines = Array.isArray(mktData.heroHeadlines) ? mktData.heroHeadlines : [
    `Transform how you manage workflows with ${conceptName}.`,
    `The AI-powered platform for ${conceptTagline}.`,
    `Automate tasks and unlock 3x higher productivity with ${conceptName}.`,
  ];

  const adHooks = Array.isArray(mktData.adHooks) ? mktData.adHooks : [
    `POV: You just discovered ${conceptName} and automated 5 hours of work.`,
    `Why modern teams are switching to ${conceptName} this year.`,
    `The secret AI toolkit for ${conceptTagline}.`,
  ];

  const valueProps = Array.isArray(mktData.valuePropositions) ? mktData.valuePropositions : [
    `Autonomous AI Engine: Purpose-built for ${conceptTagline}.`,
    `3x Efficiency Boost: Automates manual tasks with zero setup friction.`,
    `Seamless Integration: Fits directly into existing team workflows.`
  ];

  const emailSubject = renderText(mktData.emailCampaign?.subject, `Quick question regarding ${conceptName}`);
  const emailBody = renderText(mktData.emailCampaign?.body, `Hi {{FirstName}}, I noticed your team is focusing on ${conceptTagline}. Most leaders struggle with efficiency... ${conceptName} simplifies this completely.`);

  return (
    <div className="marketing-view animate-fade-in" role="region" aria-labelledby="marketing-heading">
      <div className="animate-slide-up" style={{ animationDelay: '0ms' }}>
        <div className="view-header-row">
          <div>
            <h2 id="marketing-heading">Marketing & Copywriting Pack</h2>
            <p>High-converting hero headlines, value props, ad hooks, and email drips.</p>
          </div>
          <Button variant="secondary" size="sm" icon={RefreshCw} loading={isLoading} onClick={handleRegenerateDebounced}>
            Regenerate Copy Assets
          </Button>
        </div>
      </div>

      {/* Hero Headlines List */}
      <div className="animate-slide-up" style={{ animationDelay: '80ms' }}>
        <Card variant="glass" className="headlines-card">
          <div className="card-title-row">
            <Sparkles size={20} className="text-purple" />
            <h3>High-Converting Hero Headlines</h3>
          </div>
          <div className="headlines-list">
            {headlines.map((hl, idx) => {
              const text = renderText(hl);
              return (
                <div key={idx} className="headline-item">
                  <span className="headline-text">"{text}"</span>
                  <CopyButton textToCopy={text} size="sm" />
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="animate-slide-up" style={{ animationDelay: '160ms' }}>
        <div className="marketing-grid-2">
          {/* Value Propositions Cards */}
          <Card variant="surface" className="value-props-card">
            <div className="card-title-row">
              <Target size={20} className="text-cyan" />
              <h3>Core Value Propositions</h3>
            </div>
            <div className="props-list">
              {valueProps.map((prop, i) => (
                <div key={i} className="prop-item">
                  <Badge variant="cyan">Value Prop 0{i + 1}</Badge>
                  <p>{renderText(prop)}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Ad Hooks Grid */}
          <Card variant="surface" className="ad-hooks-card">
            <div className="card-title-row">
              <Megaphone size={20} className="text-amber" />
              <h3>Social & Performance Ad Hooks</h3>
            </div>
            <div className="ad-hooks-grid">
              {adHooks.map((hook, idx) => {
                const hookText = renderText(hook);
                return (
                  <div key={idx} className="ad-hook-item">
                    <p>"{hookText}"</p>
                    <CopyButton textToCopy={hookText} size="sm" label="Copy Hook" />
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Email Campaign Preview */}
      <div className="animate-slide-up" style={{ animationDelay: '240ms' }}>
        <Card variant="glass" className="email-preview-card">
          <div className="card-title-row">
            <Mail size={20} className="text-emerald" />
            <h3>Cold Outreach Email Campaign Preview</h3>
            <CopyButton
              textToCopy={`Subject: ${emailSubject}\n\n${emailBody}`}
              size="sm"
              label="Copy Email Draft"
            />
          </div>
          <div className="email-box">
            <div className="email-header">
              <strong>Subject:</strong> {emailSubject}
            </div>
            <div className="email-body">
              <p>{emailBody}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MarketingView;
