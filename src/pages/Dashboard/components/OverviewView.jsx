import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Globe,
  Target,
  Eye,
  Zap,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
  Plus
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import useAnalytics from '../../../hooks/useAnalytics';
import useDebounce from '../../../hooks/useDebounce';
import Card from '../../../components/Card/Card';
import Badge from '../../../components/Badge/Badge';
import Button from '../../../components/Button/Button';
import CopyButton from '../../../components/CopyButton/CopyButton';
import Skeleton from '../../../components/Skeleton/Skeleton';
import Reveal from '../../../components/Reveal/Reveal';
import './OverviewView.css';

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

export const OverviewView = () => {
  const navigate = useNavigate();
  const { concept, isGenerating, generatingSection, regenerateSection } = useApp();
  const { logEvent } = useAnalytics();

  useEffect(() => {
    logEvent('page_view', { page: 'OverviewView' });
  }, [logEvent]);

  const handleRegenerateDebounced = useDebounce(() => {
    regenerateSection('concept');
  }, 500);

  const isLoading = isGenerating && (generatingSection === 'overview' || generatingSection === 'concept');

  if (isLoading) {
    return (
      <div className="overview-view animate-fade-in" aria-live="polite" role="region" aria-labelledby="overview-heading">
        <Skeleton height="140px" borderRadius="16px" />
        <div className="grid-2-col" style={{ marginTop: '1.5rem' }}>
          <Skeleton height="180px" borderRadius="16px" />
          <Skeleton height="180px" borderRadius="16px" />
        </div>
        <Skeleton height="120px" borderRadius="16px" style={{ marginTop: '1.5rem' }} />
      </div>
    );
  }

  // Support both concept.concept (from structured AI prompt) and top-level concept object
  const conceptObj = concept?.concept || concept || {};

  const name = conceptObj.startupName || concept?.name || 'AI Startup';
  const tagline = conceptObj.tagline || concept?.tagline || 'Next-gen AI solution';
  const category = conceptObj.category || concept?.category || 'AI SaaS';

  const cleanSlug = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  const rawDomains = (Array.isArray(conceptObj.domainNames) && conceptObj.domainNames.length > 0)
    ? conceptObj.domainNames
    : (Array.isArray(concept?.domains) && concept.domains.length > 0)
      ? concept.domains
      : null;

  const domainNames = rawDomains || [
    { name: `${cleanSlug || 'startup'}.ai`, tldType: 'AI Premium' },
    { name: `get${cleanSlug || 'startup'}.com`, tldType: 'Standard .com' },
    { name: `${cleanSlug || 'startup'}.io`, tldType: 'Tech .io' },
    { name: `${cleanSlug || 'startup'}.app`, tldType: 'App Domain' },
  ];

  const missionStatement = renderText(
    conceptObj.missionStatement || concept?.mission,
    `To eliminate friction and empower users by automating core workflows for ${name}.`
  );

  const visionStatement = renderText(
    conceptObj.visionStatement || concept?.vision,
    `To define the future of productivity and AI computing in the ${category} space.`
  );

  const elevatorPitch = renderText(
    conceptObj.elevatorPitch || concept?.elevatorPitch,
    `${name} is an intelligent workspace platform designed to streamline ${tagline}, enabling high-velocity execution.`
  );

  const rawInvestorSummary = conceptObj.investorSummary || {};
  const investorSummary = {
    coreProblem: renderText(
      rawInvestorSummary.coreProblem || concept?.problem,
      `Users lose hours daily to manual tasks, fragmented tools, and inefficient processes in ${category}.`
    ),
    proprietarySolution: renderText(
      rawInvestorSummary.proprietarySolution || concept?.solution,
      `An autonomous AI context engine (${name}) that automates complex tasks in real time.`
    ),
    marketOpportunity: renderText(
      rawInvestorSummary.marketOpportunity || concept?.marketOpportunity,
      `Multi-billion dollar global market growing rapidly at over 20% CAGR.`
    ),
  };

  return (
    <div className="overview-view" role="region" aria-labelledby="overview-heading">
      {/* Top Banner Card */}
      <Reveal delay={0}>
        <Card variant="glass" className="overview-hero-card">
          <div className="overview-hero-header">
            <div className="overview-hero-info">
              <div className="overview-badges">
                <Badge variant="primary" icon={Sparkles}>AI Co-Founder Active</Badge>
                <Badge variant="emerald" dot>Groq Llama 3.3 70B ✓</Badge>
                <Badge variant="cyan">{category}</Badge>
              </div>
              <h1 id="overview-heading" className="overview-title">{name}</h1>
              <p className="overview-tagline">{tagline}</p>
            </div>
            <div className="overview-hero-cta">
              <Button
                variant="primary"
                icon={Plus}
                loading={isLoading}
                onClick={handleRegenerateDebounced}
              >
                Synthesize New Concept
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={RefreshCw}
                loading={isLoading}
                onClick={() => navigate('/')}
                data-tour-id="regenerate-btn"
              >
                New Idea
              </Button>
            </div>
          </div>
        </Card>
      </Reveal>

      {/* Domain Names Grid Section */}
      <Reveal delay={0.1}>
        <div className="overview-section">
          <div className="section-title-row">
            <Globe size={18} className="section-icon" />
            <h3>Recommended Available Domains</h3>
          </div>
          <div className="domains-grid">
            {domainNames.map((dom, i) => {
              const domName = typeof dom === 'string' ? dom : (dom?.name || `${cleanSlug}.com`);
              const domType = typeof dom === 'object' ? (dom?.tldType || dom?.type || '.ai') : '.ai';
              return (
                <Reveal key={i} delay={0.05 * i}>
                  <Card variant="surface" className="domain-card">
                    <div className="domain-card-header">
                      <strong className="domain-name">{domName}</strong>
                      <CopyButton textToCopy={domName} label="" size="sm" />
                    </div>
                    <div className="domain-card-footer">
                      <Badge variant="emerald" dot>Available</Badge>
                      <span className="domain-type">{domType}</span>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Mission & Vision Statements */}
      <Reveal delay={0.2}>
        <div className="overview-grid-2">
          <Card variant="glass" className="mission-card">
            <div className="card-title-row">
              <Target className="card-icon card-icon--primary" size={20} />
              <h4>Mission Statement</h4>
              <CopyButton textToCopy={missionStatement} size="sm" />
            </div>
            <div className="dark-inner-box">
              <p className="statement-text">{missionStatement}</p>
            </div>
          </Card>

          <Card variant="glass" className="vision-card">
            <div className="card-title-row">
              <Eye className="card-icon card-icon--cyan" size={20} />
              <h4>Vision Statement</h4>
              <CopyButton textToCopy={visionStatement} size="sm" />
            </div>
            <div className="dark-inner-box">
              <p className="statement-text">{visionStatement}</p>
            </div>
          </Card>
        </div>
      </Reveal>

      {/* Elevator Pitch */}
      <Reveal delay={0.25}>
        <Card variant="gradient" className="elevator-pitch-card">
          <div className="card-title-row">
            <Zap className="card-icon card-icon--amber" size={22} />
            <h4>30-Second Elevator Pitch</h4>
            <CopyButton textToCopy={elevatorPitch} size="sm" />
          </div>
          <p className="pitch-text">{elevatorPitch}</p>
        </Card>
      </Reveal>

      {/* Investor Pitch Deck Executive Summary */}
      <Reveal delay={0.3}>
        <div className="overview-section">
          <div className="section-title-row">
            <TrendingUp size={18} className="section-icon" />
            <h3>Investor Pitch Deck Executive Summary</h3>
          </div>
          <div className="overview-grid-3">
            <Card variant="surface" className="summary-card summary-card--red">
              <div className="summary-card-header">
                <AlertTriangle className="summary-icon text-rose" size={20} />
                <h4>1. The Core Problem</h4>
              </div>
              <p>{investorSummary.coreProblem}</p>
            </Card>

            <Card variant="surface" className="summary-card summary-card--teal">
              <div className="summary-card-header">
                <CheckCircle2 className="summary-icon text-emerald" size={20} />
                <h4>2. Proprietary Solution</h4>
              </div>
              <p>{investorSummary.proprietarySolution}</p>
            </Card>

            <Card variant="surface" className="summary-card summary-card--purple">
              <div className="summary-card-header">
                <TrendingUp className="summary-icon text-purple" size={20} />
                <h4>3. Market Opportunity</h4>
              </div>
              <p>{investorSummary.marketOpportunity}</p>
            </Card>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default OverviewView;
