import React, { useEffect } from 'react';
import { RefreshCw, Check, Shield, Rocket, BarChart } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import useAnalytics from '../../../hooks/useAnalytics';
import useDebounce from '../../../hooks/useDebounce';
import Card from '../../../components/Card/Card';
import Button from '../../../components/Button/Button';
import Badge from '../../../components/Badge/Badge';
import Skeleton from '../../../components/Skeleton/Skeleton';
import CopyButton from '../../../components/CopyButton/CopyButton';
import Reveal from '../../../components/Reveal/Reveal';
import './BusinessView.css';

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

export const BusinessView = () => {
  const { concept, isGenerating, generatingSection, regenerateSection } = useApp();
  const { logEvent } = useAnalytics();

  useEffect(() => {
    logEvent('page_view', { page: 'BusinessView' });
    if (concept && !concept.business && !isGenerating) {
      regenerateSection('business');
    }
  }, [concept?.id, concept?.name]);

  const handleRegenerateDebounced = useDebounce(() => {
    regenerateSection('business');
  }, 500);

  const isLoading = isGenerating && (generatingSection === 'business' || (!concept?.business && generatingSection === null));

  if (isLoading) {
    return (
      <div className="business-view animate-fade-in" aria-live="polite" role="region" aria-labelledby="business-heading">
        <div className="grid-3-col">
          <Skeleton height="320px" borderRadius="16px" />
          <Skeleton height="340px" borderRadius="16px" />
          <Skeleton height="320px" borderRadius="16px" />
        </div>
      </div>
    );
  }

  const bizData = concept?.business || {};
  const conceptName = concept?.concept?.startupName || concept?.name || 'Startup';

  const pricingTiers = Array.isArray(bizData.pricingTiers) ? bizData.pricingTiers : [
    {
      name: 'Starter',
      price: '$29',
      billingCycle: 'month',
      features: ['Essential AI engine access', 'Core analytics dashboard', 'Standard support'],
      highlighted: false
    },
    {
      name: 'Pro (Recommended)',
      price: '$79',
      billingCycle: 'month',
      features: [`Full ${conceptName} automation`, 'Advanced team collaboration', 'Unlimited processing', 'Priority support'],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: '$199',
      billingCycle: 'month',
      features: ['Dedicated AI model tuning', 'Custom integrations', 'SOC2 Compliance & SLA'],
      highlighted: false
    }
  ];

  const unitEcon = bizData.unitEconomics || {
    cac: '$180',
    ltv: '$1,450',
    grossMargin: '85%',
    paybackPeriod: '5.2 Months'
  };

  const moatText = renderText(
    bizData.moatAnalysis,
    `Data Telemetry Flywheel: The more users interact with ${conceptName}, the smarter its adaptive AI model becomes.`
  );

  const gtmText = renderText(
    bizData.gtmStrategy,
    `Product-Led Growth (PLG): Free self-serve tier converts organic users into enterprise advocates for ${conceptName}.`
  );

  return (
    <div className="business-view" role="region" aria-labelledby="business-heading">
      <Reveal delay={0}>
        <div className="view-header-row">
          <div>
            <h2 id="business-heading">Business Strategy & Monetization</h2>
            <p>Pricing tier architecture, unit economics, moat analysis, and GTM strategy.</p>
          </div>
          <Button variant="secondary" size="sm" icon={RefreshCw} loading={isLoading} onClick={handleRegenerateDebounced}>
            Regenerate Strategy
          </Button>
        </div>
      </Reveal>

      {/* 3 Pricing Tier Cards */}
      <Reveal delay={0.1}>
        <div className="pricing-grid">
          {pricingTiers.map((tier, idx) => (
            <Reveal key={idx} delay={0.08 * idx}>
              <Card
                variant={tier.highlighted ? 'glass' : 'surface'}
                className={`pricing-card ${tier.highlighted ? 'pricing-card--recommended' : ''}`}
              >
                {tier.highlighted && <Badge variant="primary" className="recommended-badge">Most Popular</Badge>}
                <h3 className="tier-name">{renderText(tier.name, 'Plan')}</h3>
                <div className="tier-price-row">
                  <span className="tier-price">{renderText(tier.price, '$0')}</span>
                  <span className="tier-period">/ {renderText(tier.billingCycle, 'month')}</span>
                </div>
                <ul className="tier-features">
                  {(Array.isArray(tier.features) ? tier.features : [renderText(tier.features)]).map((feat, fIdx) => (
                    <li key={fIdx}>
                      <Check size={16} className="text-emerald" /> {renderText(feat)}
                    </li>
                  ))}
                </ul>
                <Button variant={tier.highlighted ? 'primary' : 'secondary'} className="tier-cta">
                  Select Plan
                </Button>
              </Card>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* Unit Economics Table */}
      <Reveal delay={0.2}>
        <Card variant="glass" className="economics-card">
          <div className="card-title-row">
            <BarChart size={20} className="text-cyan" />
            <h3>Unit Economics & Financial Projections</h3>
            <CopyButton textToCopy={JSON.stringify(unitEcon, null, 2)} size="sm" label="Copy Economics" />
          </div>
          <div className="table-wrapper">
            <table className="economics-table">
              <thead>
                <tr>
                  <th>CAC</th>
                  <th>LTV</th>
                  <th>Gross Margin</th>
                  <th>Payback Period</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="metric-value">{renderText(unitEcon.cac, '$180')}</td>
                  <td className="metric-value">{renderText(unitEcon.ltv, '$1,450')}</td>
                  <td className="metric-value">{renderText(unitEcon.grossMargin, '85%')}</td>
                  <td className="metric-value">{renderText(unitEcon.paybackPeriod, '5.2 Months')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </Reveal>

      <Reveal delay={0.25}>
        <div className="business-grid-2">
          {/* Moat Analysis Card */}
          <Card variant="surface" className="moat-card">
            <div className="card-title-row">
              <Shield size={20} className="text-purple" />
              <h3>Competitive Moat Analysis</h3>
            </div>
            <div className="moat-content">
              <p>{moatText}</p>
            </div>
          </Card>

          {/* GTM Strategy Card */}
          <Card variant="surface" className="gtm-card">
            <div className="card-title-row">
              <Rocket size={20} className="text-emerald" />
              <h3>Go-To-Market (GTM) Strategy</h3>
            </div>
            <div className="gtm-content">
              <p>{gtmText}</p>
            </div>
          </Card>
        </div>
      </Reveal>
    </div>
  );
};

export default BusinessView;
