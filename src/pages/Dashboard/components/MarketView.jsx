import React, { useEffect } from 'react';
import { RefreshCw, TrendingUp, Users, ShieldAlert } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import useAnalytics from '../../../hooks/useAnalytics';
import useDebounce from '../../../hooks/useDebounce';
import Card from '../../../components/Card/Card';
import Button from '../../../components/Button/Button';
import Badge from '../../../components/Badge/Badge';
import Skeleton from '../../../components/Skeleton/Skeleton';
import CopyButton from '../../../components/CopyButton/CopyButton';
import Reveal from '../../../components/Reveal/Reveal';
import './MarketView.css';

const renderText = (val, fallback = '') => {
  if (!val) return fallback;
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (Array.isArray(val)) return val.map(item => renderText(item)).join(', ');
  if (typeof val === 'object') {
    return Object.entries(val)
      .map(([k, v]) => `${k.replace(/([A-Z])/g, ' $1')}: ${renderText(v)}`)
      .join(' • ');
  }
  return fallback;
};

export const MarketView = () => {
  const { concept, isGenerating, generatingSection, regenerateSection } = useApp();
  const { logEvent } = useAnalytics();

  useEffect(() => {
    logEvent('page_view', { page: 'MarketView' });
    if (concept && !concept.market && !isGenerating) {
      regenerateSection('market');
    }
  }, [concept?.id, concept?.name]);

  const handleRegenerateDebounced = useDebounce(() => {
    regenerateSection('market');
  }, 500);

  const isLoading = isGenerating && (generatingSection === 'market' || (!concept?.market && generatingSection === null));

  if (isLoading) {
    return (
      <div className="market-view animate-fade-in" aria-live="polite" role="region" aria-labelledby="market-heading">
        <div className="grid-3-col">
          <Skeleton height="140px" borderRadius="16px" />
          <Skeleton height="140px" borderRadius="16px" />
          <Skeleton height="140px" borderRadius="16px" />
        </div>
      </div>
    );
  }

  const marketData = concept?.market || {};
  const conceptName = concept?.concept?.startupName || concept?.name || 'Startup';
  const conceptCategory = concept?.category || concept?.concept?.category || 'SaaS';

  const competitors = Array.isArray(marketData.competitors) ? marketData.competitors : [
    { name: 'Legacy Alternatives', strengths: ['Established brand presence', 'Existing user base'], weaknesses: ['Outdated UI', 'Lack of real-time AI automation'] },
    { name: 'Niche Solutions', strengths: ['Basic targeted functionality'], weaknesses: ['High cost', 'Complex onboarding friction'] },
  ];

  const targetAudience = Array.isArray(marketData.targetAudience) ? marketData.targetAudience : [
    { segment: `Primary ${conceptCategory} Users`, description: `Core audience seeking modern solutions for ${concept?.tagline || 'efficiency'}` },
    { segment: 'Growth Teams', description: 'Early adopters looking to streamline workflows' },
  ];

  return (
    <div className="market-view" role="region" aria-labelledby="market-heading">
      <Reveal delay={0}>
        <div className="view-header-row">
          <div>
            <h2 id="market-heading">Market & Competitive Landscape</h2>
            <p>TAM/SAM/SOM breakdown, competitor matrices, and target audience segments.</p>
          </div>
          <Button variant="secondary" size="sm" icon={RefreshCw} loading={isLoading} onClick={handleRegenerateDebounced}>
            Regenerate Market Analysis
          </Button>
        </div>
      </Reveal>

      {/* TAM / SAM / SOM Stat Cards */}
      <Reveal delay={0.1}>
        <div className="tam-sam-som-grid">
          <Reveal delay={0.05}>
            <Card variant="glass" className="stat-card">
              <span className="stat-label">TAM (Total Addressable)</span>
              <div className="stat-number">{renderText(marketData.tam?.value, '$10B+')}</div>
              <p className="stat-desc">{renderText(marketData.tam?.narrative, `Global ${conceptCategory} market growth.`)}</p>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card variant="glass" className="stat-card stat-card--highlight">
              <span className="stat-label">SAM (Serviceable Addressable)</span>
              <div className="stat-number text-cyan">{renderText(marketData.sam?.value, '$2.5B')}</div>
              <p className="stat-desc">{renderText(marketData.sam?.narrative, `Serviceable market segment for ${conceptName}.`)}</p>
            </Card>
          </Reveal>

          <Reveal delay={0.15}>
            <Card variant="glass" className="stat-card">
              <span className="stat-label">SOM (Serviceable Obtainable)</span>
              <div className="stat-number text-emerald">{renderText(marketData.som?.value, '$50M')}</div>
              <p className="stat-desc">{renderText(marketData.som?.narrative, `Target capture for ${conceptName} in Year 1-3.`)}</p>
            </Card>
          </Reveal>
        </div>
      </Reveal>

      {/* Industry Trends List */}
      <Reveal delay={0.2}>
        <Card variant="surface" className="trends-card">
          <div className="card-title-row">
            <TrendingUp size={20} className="text-purple" />
            <h3>Macro Industry Trends</h3>
          </div>
          <ul className="trends-list">
            {(Array.isArray(marketData.trends) ? marketData.trends : [
              `Rapid adoption of AI automation in ${conceptCategory}`,
              `Increased demand for personalized, real-time user experiences`,
              `Shift towards unified workflow tools`
            ]).map((trend, i) => (
              <li key={i}>{renderText(trend)}</li>
            ))}
          </ul>
        </Card>
      </Reveal>

      {/* Competitor Comparison Table */}
      <Reveal delay={0.25}>
        <Card variant="glass" className="table-card">
          <div className="card-title-row">
            <ShieldAlert size={20} className="text-cyan" />
            <h3>Competitive Matrix & Differentiation</h3>
            <CopyButton textToCopy={JSON.stringify(competitors, null, 2)} size="sm" label="Copy Matrix" />
          </div>
          <div className="table-wrapper">
            <table className="competitor-table">
              <thead>
                <tr>
                  <th>Competitor</th>
                  <th>Core Strengths</th>
                  <th>Weaknesses & Gaps</th>
                  <th>Our Advantage</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((comp, idx) => (
                  <tr key={idx}>
                    <td className="comp-name">{renderText(comp.name)}</td>
                    <td>{renderText(comp.strengths)}</td>
                    <td className="text-rose">{renderText(comp.weaknesses)}</td>
                    <td className="text-emerald"><strong>{renderText(comp.ourAdvantage || `Proprietary AI automation for ${conceptName}`)}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Reveal>

      {/* Target Audience Segments */}
      <Reveal delay={0.3}>
        <div className="audience-section">
          <div className="section-title-row">
            <Users size={18} className="section-icon" />
            <h3>Ideal Customer Segments (ICP)</h3>
          </div>
          <div className="audience-grid">
            {targetAudience.map((seg, idx) => (
              <Reveal key={idx} delay={0.05 * idx}>
                <Card variant="surface" className="audience-card">
                  <Badge variant="primary">{renderText(seg.segment)}</Badge>
                  <p>{renderText(seg.description)}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default MarketView;
