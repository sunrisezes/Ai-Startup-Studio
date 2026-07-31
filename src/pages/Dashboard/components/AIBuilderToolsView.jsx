import React, { useEffect } from 'react';
import { Cpu, RefreshCw, ExternalLink } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import useAnalytics from '../../../hooks/useAnalytics';
import useDebounce from '../../../hooks/useDebounce';
import Card from '../../../components/Card/Card';
import Button from '../../../components/Button/Button';
import Badge from '../../../components/Badge/Badge';
import Skeleton from '../../../components/Skeleton/Skeleton';
import './AIBuilderToolsView.css';

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

const getToolsArray = (toolsData) => {
  if (Array.isArray(toolsData)) return toolsData;
  if (Array.isArray(toolsData?.tools)) return toolsData.tools;
  if (Array.isArray(toolsData?.recommendations)) return toolsData.recommendations;
  if (Array.isArray(toolsData?.items)) return toolsData.items;
  if (typeof toolsData === 'object' && toolsData !== null) {
    const arrayVal = Object.values(toolsData).find(val => Array.isArray(val));
    if (arrayVal) return arrayVal;
  }
  return null;
};

export const AIBuilderToolsView = () => {
  const { concept, isGenerating, generatingSection, regenerateSection } = useApp();
  const { logEvent } = useAnalytics();

  useEffect(() => {
    logEvent('page_view', { page: 'AIBuilderToolsView' });
    if (concept && !concept.tools && !isGenerating) {
      regenerateSection('tools');
    }
  }, [concept?.id, concept?.name]);

  const handleRegenerateDebounced = useDebounce(() => {
    regenerateSection('tools');
  }, 500);

  const isLoading = isGenerating && (generatingSection === 'tools' || (!concept?.tools && generatingSection === null));

  if (isLoading) {
    return (
      <div className="tools-view animate-fade-in" aria-live="polite" role="region" aria-labelledby="tools-heading">
        <div className="tools-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} height="160px" borderRadius="16px" />
          ))}
        </div>
      </div>
    );
  }

  const toolsData = concept?.tools || {};
  const conceptName = concept?.concept?.startupName || concept?.name || 'Startup';
  const extractedTools = getToolsArray(toolsData);

  const tools = extractedTools || [
    { name: 'v0.dev by Vercel', category: 'Design', reason: `UI component generation tailored for ${conceptName}`, url: 'https://v0.dev' },
    { name: 'Copy.ai / Jasper', category: 'Marketing', reason: `High-converting ad copy and growth content for ${conceptName}`, url: 'https://copy.ai' },
    { name: 'Cursor & Claude 3.5', category: 'Dev', reason: `Full-stack AI co-pilot for building ${conceptName} features`, url: 'https://cursor.com' },
    { name: 'PostHog AI', category: 'Analytics', reason: 'Product analytics, event telemetry, and session replays', url: 'https://posthog.com' },
    { name: 'Resend Email API', category: 'Comms', reason: 'Transactional and onboarding email delivery', url: 'https://resend.com' },
    { name: 'Stripe Billing', category: 'Finance', reason: 'SaaS subscription billing and tier management', url: 'https://stripe.com' },
    { name: 'Termly / Clerky', category: 'Legal', reason: 'Automated legal terms and company formation', url: 'https://clerky.com' },
    { name: 'Groq API Engine', category: 'Growth', reason: 'Ultra-fast Llama 3 inference engine for AI features', url: 'https://groq.com' },
  ];

  return (
    <div className="tools-view animate-fade-in" role="region" aria-labelledby="tools-heading">
      <div className="animate-slide-up" style={{ animationDelay: '0ms' }}>
        <div className="view-header-row">
          <div>
            <h2 id="tools-heading">AI Builder Tools & Stack Recommendations</h2>
            <p>Curated AI tools across key dimensions to accelerate execution for {conceptName}.</p>
          </div>
          <Button variant="secondary" size="sm" icon={RefreshCw} loading={isLoading} onClick={handleRegenerateDebounced}>
            Regenerate Tool Stack
          </Button>
        </div>
      </div>

      {/* Tool Cards Grid */}
      <div className="animate-slide-up" style={{ animationDelay: '80ms' }}>
        <div className="tools-grid">
          {tools.map((tool, idx) => (
            <Card key={idx} variant="glass" className="tool-card">
              <div className="tool-card-header">
                <div className="tool-title-group">
                  <div className="tool-icon-wrap">
                    <Cpu size={18} />
                  </div>
                  <h3 className="tool-name">{renderText(tool.name || tool.toolName || 'AI Tool')}</h3>
                </div>
                <Badge variant="cyan">{renderText(tool.category || 'Tech')}</Badge>
              </div>
              <p className="tool-reason">{renderText(tool.reason || tool.description || tool.useCase)}</p>
              <div className="tool-card-footer">
                <span className="recommended-tag">Recommended for {conceptName}</span>
                {tool.url && (
                  <a href={tool.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', color: 'inherit' }}>
                    <ExternalLink size={14} className="tool-link-icon" />
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIBuilderToolsView;
