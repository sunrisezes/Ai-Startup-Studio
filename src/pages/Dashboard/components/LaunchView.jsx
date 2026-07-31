import React, { useEffect, memo } from 'react';
import { RefreshCw, CheckSquare, Rocket, Mail, Calendar } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import useAnalytics from '../../../hooks/useAnalytics';
import useDebounce from '../../../hooks/useDebounce';
import Card from '../../../components/Card/Card';
import Button from '../../../components/Button/Button';
import Badge from '../../../components/Badge/Badge';
import Skeleton from '../../../components/Skeleton/Skeleton';
import CopyButton from '../../../components/CopyButton/CopyButton';
import AnimateOnScroll from '../../../components/AnimateOnScroll/AnimateOnScroll';
import Reveal from '../../../components/Reveal/Reveal';
import './LaunchView.css';

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

const ChecklistItem = memo(({ item }) => (
  <div className={`checklist-item ${item.done ? 'checklist-item--done' : ''}`}>
    <div className="checklist-badge-row">
      <Badge variant="cyan">{renderText(item.day, 'Day 01')}</Badge>
      <Badge variant="secondary">{renderText(item.category, 'Milestone')}</Badge>
    </div>
    <h4 className="checklist-title">{renderText(item.task || item.title, 'Task')}</h4>
  </div>
));

export const LaunchView = () => {
  const { concept, isGenerating, generatingSection, regenerateSection } = useApp();
  const { logEvent } = useAnalytics();

  useEffect(() => {
    logEvent('page_view', { page: 'LaunchView' });
    if (concept && !concept.launch && !isGenerating) {
      regenerateSection('launch');
    }
  }, [concept?.id, concept?.name]);

  const handleRegenerateDebounced = useDebounce(() => {
    regenerateSection('launch');
  }, 500);

  const isLoading = isGenerating && (generatingSection === 'launch' || (!concept?.launch && generatingSection === null));

  if (isLoading) {
    return (
      <div className="launch-view animate-fade-in" aria-live="polite" role="region" aria-labelledby="launch-heading">
        <Skeleton height="220px" borderRadius="16px" />
      </div>
    );
  }

  const launchData = concept?.launch || {};
  const conceptName = concept?.concept?.startupName || concept?.name || 'Startup';
  const conceptTagline = concept?.concept?.tagline || concept?.tagline || 'AI platform';

  const checklist = Array.isArray(launchData.checklist) ? launchData.checklist : [
    { day: 'Day 01–05', task: 'Landing Page & Domain Setup', category: 'Infrastructure', done: true },
    { day: 'Day 06–10', task: `${conceptName} Beta Architecture`, category: 'Product Dev', done: true },
    { day: 'Day 11–15', task: 'ProductHunt Hunter Outreach', category: 'Marketing', done: false },
    { day: 'Day 16–20', task: 'Community Teaser & Early Access', category: 'Distribution', done: false },
    { day: 'Day 21–25', task: 'Official Public Launch Campaign', category: 'Launch', done: false },
    { day: 'Day 26–30', task: 'Post-Launch Feedback & Iteration', category: 'Growth', done: false },
  ];

  const mvpPhases = Array.isArray(launchData.mvpPhases) ? launchData.mvpPhases : [
    { phase: 'Phase 1', title: 'Core MVP Foundation', duration: 'Weeks 1–2', status: 'Complete', tasks: [`${conceptName} primary engine`, 'Authentication & setup'] },
    { phase: 'Phase 2', title: 'AI Automation Layer', duration: 'Weeks 3–4', status: 'In Progress', tasks: ['Real-time processing workflow', 'User dashboard UI'] },
    { phase: 'Phase 3', title: 'Distribution & Integration', duration: 'Weeks 5–6', status: 'Planning', tasks: ['Third-party API connections', 'Notification alerts'] },
    { phase: 'Phase 4', title: 'Growth Analytics', duration: 'Weeks 7–8', status: 'Planning', tasks: ['User activity tracking', 'Feedback loop'] },
    { phase: 'Phase 5', title: 'Enterprise Scaling', duration: 'Weeks 9–12', status: 'Planning', tasks: ['Custom deployment options', 'Security compliance'] },
  ];

  const getStatusBadgeVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'complete':
        return 'emerald';
      case 'in progress':
        return 'cyan';
      default:
        return 'secondary';
    }
  };

  const phStrategy = renderText(launchData.productHuntStrategy, `Tagline: ${conceptName} — ${conceptTagline}`);
  const outreachSubject = renderText(launchData.outreachTemplates?.[0]?.subject, `Exclusive Preview: ${conceptName}`);
  const outreachBody = renderText(launchData.outreachTemplates?.[0]?.body, `Hi Tech Editor, We are launching ${conceptName} next Tuesday... ${conceptTagline}.`);

  return (
    <div className="launch-view" role="region" aria-labelledby="launch-heading">
      <Reveal delay={0}>
        <div className="view-header-row">
          <div>
            <h2 id="launch-heading">Launch Playbook & Execution Roadmap</h2>
            <p>Day 1-30 launch checklist, ProductHunt strategy, outreach templates, and MVP timeline.</p>
          </div>
          <Button variant="secondary" size="sm" icon={RefreshCw} loading={isLoading} onClick={handleRegenerateDebounced}>
            Regenerate Launch Plan
          </Button>
        </div>
      </Reveal>

      {/* Day 1–30 Checklist wrapped with AnimateOnScroll */}
      <Reveal delay={0.1}>
        <Card variant="glass" className="checklist-card">
          <div className="card-title-row">
            <CheckSquare size={20} className="text-emerald" />
            <h3>Day 1–30 Launch Execution Checklist</h3>
            <CopyButton textToCopy={JSON.stringify(checklist, null, 2)} size="sm" label="Copy Checklist" />
          </div>
          <div className="checklist-grid">
            {checklist.map((item, idx) => (
              <AnimateOnScroll key={idx} delay={50 * idx}>
                <ChecklistItem item={item} />
              </AnimateOnScroll>
            ))}
          </div>
        </Card>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="launch-grid-2">
          {/* ProductHunt Strategy Card */}
          <Card variant="surface" className="ph-card">
            <div className="card-title-row">
              <Rocket size={20} className="text-amber" />
              <h3>ProductHunt Launch Strategy</h3>
            </div>
            <div className="ph-content">
              <div className="ph-item">
                {phStrategy}
              </div>
              <CopyButton
                textToCopy={phStrategy}
                size="sm"
                label="Copy Strategy"
              />
            </div>
          </Card>

          {/* Cold Outreach Templates */}
          <Card variant="surface" className="outreach-card">
            <div className="card-title-row">
              <Mail size={20} className="text-cyan" />
              <h3>Press & Influencer Outreach Template</h3>
            </div>
            <div className="outreach-box">
              <strong>{outreachSubject}</strong>
              <p>{outreachBody}</p>
              <CopyButton
                textToCopy={`${outreachSubject}\n\n${outreachBody}`}
                size="sm"
                label="Copy Email Draft"
              />
            </div>
          </Card>
        </div>
      </Reveal>

      {/* Vertical MVP Timeline */}
      <Reveal delay={0.25}>
        <Card variant="glass" className="timeline-card">
          <div className="card-title-row">
            <Calendar size={20} className="text-purple" />
            <h3>5-Phase Vertical MVP Roadmap</h3>
          </div>
          <div className="timeline-container">
            {mvpPhases.map((phase, idx) => (
              <Reveal key={idx} delay={0.08 * idx}>
                <div className="timeline-step">
                  <div className="timeline-marker">
                    <span className="timeline-number">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="timeline-body">
                    <div className="timeline-header">
                      <span className="timeline-phase">{renderText(phase.phase)}</span>
                      <h4 className="timeline-title">{renderText(phase.title)}</h4>
                      <Badge variant="primary" className="timeline-badge">{renderText(phase.duration)}</Badge>
                      <Badge variant={getStatusBadgeVariant(phase.status)} dot className="status-badge">
                        {renderText(phase.status, 'Planning')}
                      </Badge>
                    </div>
                    {phase.desc && <p className="timeline-desc">{renderText(phase.desc)}</p>}
                    {phase.tasks && (
                      <ul className="timeline-tasks">
                        {(Array.isArray(phase.tasks) ? phase.tasks : [renderText(phase.tasks)]).map((task, tIdx) => (
                          <li key={tIdx}>{renderText(task)}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Card>
      </Reveal>
    </div>
  );
};

export default LaunchView;
